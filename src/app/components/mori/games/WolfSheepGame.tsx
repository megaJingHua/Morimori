import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Clock, Shield, Trophy, User, Sparkles } from 'lucide-react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { useGameTime } from '../../../context/GameTimeContext';
import { playCorrectSound, playWrongSound } from '../../../utils/gameAudio';
import { TimeUpOverlay } from '../TimeUpOverlay';

type Role = 'wolf' | 'sheep' | null;
type GameStatus = 'playing' | 'won' | 'lost';

const ARENA_RADIUS = 100;
const SAFE_ZONE_RADIUS = 75; // inner danger circle radius
const CHAR_SIZE = 16;
const GRASS_SIZE = 12;

interface Point {
  x: number;
  y: number;
}

interface GameState {
  player: Point;
  enemy: Point;
  grass: Point | null;
  targetPos: Point | null;
  score: number;
  timeLeft: number;
  status: GameStatus;
  playerMovingRight?: boolean;
  enemyMovingRight?: boolean;
  lastAteTime?: number;
  lastHitTime?: number;
}

export function WolfSheepGame({ onExit }: { onExit: () => void }) {
  const [role, setRole] = useState<Role>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  
  const { startTimer, stopTimer, isTimeUp, recordGame } = useGameTime();

  // Reference for mutable state used in animation frame
  const stateRef = useRef<GameState | null>(null);
  const reqRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  // Constants
  const GAME_DURATION = 60; // seconds
  const SPEED_PLAYER = 250; // units per second (increased for drag-like responsiveness)
  const SPEED_AI = 65; // slightly faster AI to compensate


  // Sync state to ref
  useEffect(() => {
    stateRef.current = gameState;
  }, [gameState]);

  // Handle body lock
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;
    
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
      stopTimer();
      cancelAnimationFrame(reqRef.current);
    };
  }, []);

  const startGame = (selectedRole: Role) => {
    setRole(selectedRole);
    startTimer();
    
    // Initial positions
    const pPos = selectedRole === 'sheep' ? { x: 0, y: 85 } : { x: 0, y: 0 };
    const ePos = selectedRole === 'sheep' ? { x: 0, y: 0 } : { x: 0, y: 85 };
    
    const initialState: GameState = {
      player: pPos,
      enemy: ePos,
      grass: selectedRole === 'sheep' ? getRandomDangerPos() : null,
      targetPos: pPos,
      score: 0,
      timeLeft: GAME_DURATION,
      status: 'playing'
    };
    
    setGameState(initialState);
    stateRef.current = initialState;
    lastTimeRef.current = performance.now();
    reqRef.current = requestAnimationFrame(gameLoop);
  };

  const getRandomDangerPos = (): Point => {
    const r = Math.random() * (SAFE_ZONE_RADIUS - CHAR_SIZE);
    const theta = Math.random() * 2 * Math.PI;
    return { x: r * Math.cos(theta), y: r * Math.sin(theta) };
  };

  const getDistance = (p1: Point, p2: Point) => {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  };

  const moveTowards = (current: Point, target: Point, maxDist: number): Point => {
    const dist = getDistance(current, target);
    if (dist <= maxDist) return target;
    const ratio = maxDist / dist;
    return {
      x: current.x + (target.x - current.x) * ratio,
      y: current.y + (target.y - current.y) * ratio
    };
  };

  const clampToArena = (pos: Point): Point => {
    const dist = getDistance({ x: 0, y: 0 }, pos);
    const maxR = ARENA_RADIUS - CHAR_SIZE / 2;
    if (dist <= maxR) return pos;
    return {
      x: pos.x * (maxR / dist),
      y: pos.y * (maxR / dist)
    };
  };

  const gameLoop = (time: number) => {
    if (!stateRef.current || stateRef.current.status !== 'playing') return;
    
    const dt = (time - lastTimeRef.current) / 1000;
    lastTimeRef.current = time;

    let { player, enemy, grass, targetPos, score, timeLeft, playerMovingRight = true, enemyMovingRight = true } = stateRef.current;
    let newStatus: GameStatus = 'playing';

    // Update time
    timeLeft = Math.max(0, timeLeft - dt);
    if (timeLeft === 0) {
       // Time's up
       if (role === 'sheep') {
           // Sheep wins by surviving
           newStatus = 'won';
       } else {
           // Wolf loses by not catching sheep
           newStatus = 'lost';
       }
    }

    // Move Player
    if (targetPos) {
      const prevX = player.x;
      player = moveTowards(player, targetPos, SPEED_PLAYER * dt);
      player = clampToArena(player);
      if (player.x !== prevX) {
          playerMovingRight = player.x > prevX;
      }
    }

    const isSheepInSafeZone = (p: Point) => getDistance({x:0, y:0}, p) >= SAFE_ZONE_RADIUS;

    // AI Logic
    if (role === 'sheep') {
       // AI is Wolf
       const sheepSafe = isSheepInSafeZone(player);
       const prevEX = enemy.x;
       if (!sheepSafe) {
           // Chase sheep
           enemy = moveTowards(enemy, player, SPEED_AI * dt);
       } else {
           // Wander in middle
           const distToCenter = getDistance(enemy, {x:0, y:0});
           if (distToCenter > 10) {
              enemy = moveTowards(enemy, {x:0, y:0}, SPEED_AI * dt * 0.5);
           }
       }
       if (enemy.x !== prevEX) enemyMovingRight = enemy.x > prevEX;
       
       // Sheep eats grass
       if (grass && getDistance(player, grass) < CHAR_SIZE) {
           score += 1;
           playCorrectSound();
           if (score >= 5) {
               newStatus = 'won';
           } else {
               grass = getRandomDangerPos();
               stateRef.current.lastAteTime = time;
           }
       }
       
       // Wolf catches sheep
       if (!sheepSafe && getDistance(player, enemy) < CHAR_SIZE) {
           newStatus = 'lost';
           playWrongSound();
           stateRef.current.lastHitTime = time;
       }
       
    } else {
       // AI is Sheep
       // Sheep tries to get grass if exists
       if (!grass && Math.random() < 0.01) {
           grass = getRandomDangerPos();
       }
       
       const distToWolf = getDistance(enemy, player);
       const sheepSafe = isSheepInSafeZone(enemy);
       const prevEX = enemy.x;
       
       if (distToWolf < 40 && !sheepSafe) {
           // Run away from wolf towards safe zone
           // Simple flee: move in opposite direction
           const fleeTarget = {
               x: enemy.x + (enemy.x - player.x),
               y: enemy.y + (enemy.y - player.y)
           };
           // Bias towards outside
           const distToCenter = getDistance(enemy, {x:0,y:0}) || 1;
           fleeTarget.x += enemy.x / distToCenter * 50;
           fleeTarget.y += enemy.y / distToCenter * 50;
           
           enemy = moveTowards(enemy, fleeTarget, SPEED_AI * dt);
       } else if (grass) {
           // Go for grass
           enemy = moveTowards(enemy, grass, SPEED_AI * dt);
           if (getDistance(enemy, grass) < CHAR_SIZE) {
               grass = null; // Sheep ate grass
           }
       } else if (sheepSafe) {
           // Wander in safe zone slightly
       } else {
           // Move to safe zone
           const distToCenter = getDistance(enemy, {x:0,y:0}) || 1;
           const safeTarget = {
               x: enemy.x / distToCenter * SAFE_ZONE_RADIUS * 1.1,
               y: enemy.y / distToCenter * SAFE_ZONE_RADIUS * 1.1
           };
           enemy = moveTowards(enemy, safeTarget, SPEED_AI * dt);
       }
       
       enemy = clampToArena(enemy);
       if (enemy.x !== prevEX) enemyMovingRight = enemy.x > prevEX;
       
       // Wolf catches sheep
       if (!isSheepInSafeZone(enemy) && getDistance(player, enemy) < CHAR_SIZE) {
           newStatus = 'won';
           playCorrectSound();
           stateRef.current.lastHitTime = time;
       }
    }

    const newState = { 
        player, enemy, grass, targetPos, score, timeLeft, status: newStatus, 
        playerMovingRight, enemyMovingRight, 
        lastAteTime: stateRef.current.lastAteTime, 
        lastHitTime: stateRef.current.lastHitTime 
    };
    setGameState(newState);

    if (newStatus === 'playing') {
       reqRef.current = requestAnimationFrame(gameLoop);
    } else {
       // Game Over
       const timePlayed = GAME_DURATION - timeLeft;
       recordGame({
           gameId: 'wolfsheep',
           gameType: '大野狼抓小綿羊',
           score: newStatus === 'won' ? '勝利' : '失敗',
           timePlayed: Math.floor(timePlayed)
       });
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    updateTargetPos(e);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only update if pointer is down (buttons > 0) or it's touch device where pointerdown triggers move
    if (e.buttons > 0 || e.pointerType === 'touch') {
      updateTargetPos(e);
    }
  };

  const updateTargetPos = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    
    // Map to -100 to 100 range
    const x = ((px / rect.width) * 2 - 1) * ARENA_RADIUS;
    const y = ((py / rect.height) * 2 - 1) * ARENA_RADIUS;
    
    if (stateRef.current && stateRef.current.status === 'playing') {
       setGameState(prev => prev ? { ...prev, targetPos: { x, y } } : null);
    }
  };

  const formatTime = (seconds: number) => {
    const s = Math.ceil(seconds);
    return `00:${s.toString().padStart(2, '0')}`;
  };

  if (isTimeUp) {
    return <TimeUpOverlay onExit={onExit} />;
  }

  if (!role) {
    return (
      <div className="fixed inset-0 z-50 bg-amber-50 flex flex-col items-center justify-center p-6">
        <Button variant="ghost" onClick={onExit} className="absolute top-4 left-4 text-stone-500">
          <ArrowLeft className="w-5 h-5 mr-1" /> 離開
        </Button>
        
        <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-8 text-center">
          大野狼抓小綿羊
        </h2>
        
        <p className="text-amber-700 mb-8 max-w-md text-center bg-white/50 p-4 rounded-xl">
          這是一個貓捉老鼠的遊戲！
          外圍的深綠色圈圈是「安全區」，小綿羊躲在裡面就不會被抓走喔。
        </p>

        <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
            <CardButton 
               title="扮演小綿羊"
               icon="🐑"
               desc="在中心危險區吃掉 5 棵草，或是躲避大野狼 60 秒！"
               onClick={() => startGame('sheep')}
               color="bg-emerald-100 hover:bg-emerald-200 border-emerald-300 text-emerald-900"
            />
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
            <CardButton 
               title="扮演大野狼"
               icon="🐺"
               desc="在 60 秒內，趁小綿羊離開安全區時抓到牠！"
               onClick={() => startGame('wolf')}
               color="bg-rose-100 hover:bg-rose-200 border-rose-300 text-rose-900"
            />
          </motion.div>
        </div>
      </div>
    );
  }

  if (gameState && gameState.status !== 'playing') {
     return (
        <div className="fixed inset-0 z-50 bg-amber-50 flex flex-col items-center justify-center p-6">
            <motion.div 
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full text-center space-y-6"
            >
                <div className="text-6xl mb-4">
                   {gameState.status === 'won' ? '🎉' : '🥺'}
                </div>
                <h2 className="text-3xl font-bold text-stone-800">
                   {gameState.status === 'won' ? '太棒了！你贏了！' : '哎呀！遊戲結束'}
                </h2>
                
                <p className="text-stone-600">
                   {role === 'sheep' 
                      ? (gameState.status === 'won' ? '你成功躲開了大野狼！' : '小綿羊被抓到了！下次跑快一點喔。')
                      : (gameState.status === 'won' ? '大野狼抓到小綿羊了！' : '小綿羊跑掉了！大野狼肚子餓。')
                   }
                </p>

                <div className="pt-4 flex flex-col gap-3">
                    <Button onClick={() => startGame(role)} className="w-full bg-emerald-600 hover:bg-emerald-700 rounded-full py-6 text-lg">
                        再玩一次
                    </Button>
                    <Button variant="outline" onClick={() => setRole(null)} className="w-full rounded-full py-6 text-lg">
                        換個角色
                    </Button>
                    <Button variant="ghost" onClick={onExit} className="w-full text-stone-500">
                        離開遊戲
                    </Button>
                </div>
            </motion.div>
        </div>
     );
  }

  // Render Game Board
  return (
    <div className="fixed inset-0 z-50 bg-stone-100 flex flex-col select-none overflow-hidden touch-none">
       {/* Header */}
       <div className="flex-none px-4 py-3 bg-white/90 backdrop-blur-md shadow-sm flex justify-between items-center z-20">
         <Button variant="ghost" onClick={onExit} className="text-stone-500 hover:bg-stone-100 -ml-2">
           <ArrowLeft className="w-5 h-5 mr-1" /> 離開
         </Button>
         <div className="flex gap-2 items-center">
              {role === 'sheep' && (
                 <Badge variant="outline" className="px-3 py-1.5 text-base bg-emerald-50 border-emerald-200 text-emerald-700 font-bold shadow-sm">
                    吃草: {gameState?.score} / 5
                 </Badge>
              )}
              <Badge variant="outline" className="px-3 py-1.5 text-base bg-white border-stone-200 font-mono shadow-sm flex items-center">
                 <Clock className={`w-4 h-4 mr-1.5 ${(gameState?.timeLeft || 0) <= 10 ? 'text-rose-500 animate-pulse' : 'text-stone-400'}`} />
                 <span className={(gameState?.timeLeft || 0) <= 10 ? 'text-rose-600 font-bold' : ''}>
                    {formatTime(gameState?.timeLeft || 0)}
                 </span>
              </Badge>
         </div>
       </div>

       {/* Arena Area */}
       <div className="flex-1 w-full flex items-center justify-center p-4">
           {/* Responsive square container */}
           <div 
              className={`relative w-full max-w-[500px] aspect-square bg-emerald-700 rounded-full shadow-inner overflow-hidden border-8 border-emerald-800 transition-colors duration-150 ${gameState?.lastAteTime && performance.now() - gameState.lastAteTime < 300 ? 'bg-emerald-500 border-emerald-400 scale-[1.02]' : ''} ${gameState?.lastHitTime && performance.now() - gameState.lastHitTime < 300 ? 'bg-rose-700 border-rose-800 scale-[0.98]' : ''}`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
           >
               {/* Safe Zone indicator (outer ring is safe, so inner is danger) */}
               <div 
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-100/90 rounded-full border-4 border-yellow-300/50 pointer-events-none"
                  style={{ width: `${(SAFE_ZONE_RADIUS / ARENA_RADIUS) * 100}%`, height: `${(SAFE_ZONE_RADIUS / ARENA_RADIUS) * 100}%` }}
               >
                   <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                      <span className="text-amber-700 font-bold tracking-widest text-xl whitespace-nowrap opacity-50">危險區</span>
                   </div>
               </div>

               {/* Instruction overlay briefly at start */}
               <AnimatePresence>
                  {(gameState?.timeLeft || 0) > GAME_DURATION - 3 && (
                      <motion.div 
                         initial={{ opacity: 0, scale: 0.8 }}
                         animate={{ opacity: 1, scale: 1 }}
                         exit={{ opacity: 0, scale: 1.1 }}
                         className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
                      >
                          <div className="bg-black/60 text-white px-6 py-3 rounded-full font-bold text-lg backdrop-blur-sm">
                              在畫面中拖拉來移動！
                          </div>
                      </motion.div>
                  )}
               </AnimatePresence>

               {/* Entities */}
               {gameState && (
                   <>
                       {/* Grass */}
                       {gameState.grass && (
                           <Entity pos={gameState.grass} size={GRASS_SIZE} emoji="🍀" isPulse />
                       )}
                       
                       {/* Sheep */}
                       <Entity 
                          pos={role === 'sheep' ? gameState.player : gameState.enemy} 
                          size={CHAR_SIZE} 
                          emoji="🐑" 
                          isPlayer={role === 'sheep'}
                          flip={role === 'sheep' ? gameState.playerMovingRight : gameState.enemyMovingRight}
                       />

                       {/* Wolf */}
                       <Entity 
                          pos={role === 'wolf' ? gameState.player : gameState.enemy} 
                          size={CHAR_SIZE} 
                          emoji="🐺" 
                          isPlayer={role === 'wolf'}
                          flip={role === 'wolf' ? gameState.playerMovingRight : gameState.enemyMovingRight}
                       />
                   </>
               )}
           </div>
       </div>
       
       <div className="p-4 text-center text-stone-500 text-sm">
           外圍深綠色是安全區，裡面淺黃色是危險區！
       </div>
    </div>
  );
}

function Entity({ pos, size, emoji, isPlayer, isPulse, flip }: { pos: Point, size: number, emoji: string, isPlayer?: boolean, isPulse?: boolean, flip?: boolean }) {
    // Map -100..100 to 0..100%
    const left = `${(pos.x / ARENA_RADIUS) * 50 + 50}%`;
    const top = `${(pos.y / ARENA_RADIUS) * 50 + 50}%`;
    
    return (
        <div 
           className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-75 pointer-events-none"
           style={{ 
               left, 
               top, 
               width: `${(size / (ARENA_RADIUS * 2)) * 100}%`, 
               height: `${(size / (ARENA_RADIUS * 2)) * 100}%` 
           }}
        >
            <div className={`relative flex items-center justify-center w-full h-full text-3xl md:text-5xl drop-shadow-md ${isPulse ? 'animate-pulse' : ''} ${flip ? 'scale-x-[-1]' : ''}`}>
                {isPlayer && (
                    <div className="absolute inset-0 bg-white/30 rounded-full scale-150 animate-ping" />
                )}
                <span className="relative z-10">{emoji}</span>
            </div>
        </div>
    );
}

function CardButton({ title, icon, desc, onClick, color }: { title: string, icon: string, desc: string, onClick: () => void, color: string }) {
    return (
        <button 
           onClick={onClick}
           className={`w-full h-full p-6 rounded-3xl border-2 flex flex-col items-center text-center transition-colors ${color}`}
        >
            <div className="text-6xl mb-4 bg-white/50 w-24 h-24 rounded-full flex items-center justify-center shadow-sm">
                {icon}
            </div>
            <h3 className="text-2xl font-bold mb-2">{title}</h3>
            <p className="text-sm opacity-80 font-medium leading-relaxed">{desc}</p>
        </button>
    );
}
