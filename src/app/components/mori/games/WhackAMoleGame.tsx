import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Clock, RefreshCw, Trophy, Sparkles, User, Lightbulb, Target } from 'lucide-react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { useGameTime } from '../../../context/GameTimeContext';
import { TimeUpOverlay } from '../TimeUpOverlay';
import { playCorrectSound } from '../../../utils/gameAudio';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

const GAME_DURATION = 30;

interface MoleNode {
  id: number;
  active: boolean;
  hit: boolean;
}

export function WhackAMoleGame({ onExit }: { onExit: () => void }) {
  const [moles, setMoles] = useState<MoleNode[]>(Array.from({ length: 9 }, (_, i) => ({ id: i, active: false, hit: false })));
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const { startTimer, stopTimer, isTimeUp, recordGame } = useGameTime();
  
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;

    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.touchAction = originalTouchAction;
        stopTimer();
    };
  }, []);

  useEffect(() => {
    startTimer();
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleGameOver();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  useEffect(() => {
    let moleInterval: ReturnType<typeof setInterval>;
    if (isPlaying && timeLeft > 0) {
      moleInterval = setInterval(() => {
        activateRandomMole();
      }, 800);
    }
    return () => clearInterval(moleInterval);
  }, [isPlaying, timeLeft]);

  const activateRandomMole = () => {
    setMoles(current => {
      const inactiveMoles = current.filter(m => !m.active && !m.hit);
      if (inactiveMoles.length === 0) return current;
      
      const numToActivate = Math.random() > 0.8 ? 2 : 1; 
      const shuffled = [...inactiveMoles].sort(() => Math.random() - 0.5).slice(0, numToActivate);
      const idsToActivate = shuffled.map(m => m.id);

      idsToActivate.forEach(id => {
        setTimeout(() => {
          setMoles(latest => latest.map(m => (m.id === id && !m.hit) ? { ...m, active: false } : m));
        }, 1500 + Math.random() * 500);
      });

      return current.map(m => idsToActivate.includes(m.id) ? { ...m, active: true, hit: false } : m);
    });
  };

  const handleGameOver = () => {
    setIsPlaying(false);
    setIsGameOver(true);
    setMoles(prev => prev.map(m => ({ ...m, active: false, hit: false })));
    recordGame({
      gameId: 'whackamole',
      gameType: '打地鼠遊戲',
      score: `得分: ${score}`,
      timePlayed: GAME_DURATION
    });
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setIsPlaying(true);
    setIsGameOver(false);
    setHasStarted(true);
    setMoles(Array.from({ length: 9 }, (_, i) => ({ id: i, active: false, hit: false })));
  };

  const handleMoleClick = (id: number) => {
    if (!isPlaying) return;
    
    setMoles(current => {
      const mole = current.find(m => m.id === id);
      if (mole && mole.active && !mole.hit) {
        playCorrectSound();
        setScore(s => s + 1);
        
        setTimeout(() => {
          setMoles(latest => latest.map(m => m.id === id ? { ...m, hit: false } : m));
        }, 500);

        return current.map(m => m.id === id ? { ...m, active: false, hit: true } : m);
      }
      return current;
    });
  };

  if (isTimeUp) {
      return <TimeUpOverlay onExit={onExit} />;
  }

  return (
    <div className="fixed inset-0 z-50 bg-stone-50 flex flex-col select-none overflow-hidden touch-none bg-[url('https://images.unsplash.com/photo-1547139427-b5aa332ebfd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2FydG9vbiUyMG1vbGUlMjBob2xlJTIwZ2FtZXxlbnwxfHx8fDE3NzMzOTE5NTN8MA&ixlib=rb-4.1.0&q=80&w=1080')] bg-cover bg-center">
      <div className="absolute inset-0 bg-emerald-900/60 backdrop-blur-[2px]" />

      {/* Header */}
      <div className="flex-none px-4 py-3 bg-white/90 backdrop-blur-md shadow-sm flex justify-between items-center z-20">
        <Button variant="ghost" onClick={onExit} className="text-stone-500 hover:bg-stone-100 -ml-2">
          <ArrowLeft className="w-5 h-5 mr-1" /> 離開
        </Button>
        <div className="flex gap-2">
             <Badge variant="outline" className={`px-3 py-1.5 text-base bg-white font-mono shadow-sm flex items-center ${timeLeft <= 10 ? 'border-red-400 text-red-500' : 'border-stone-200 text-stone-700'}`}>
                <Clock className="w-4 h-4 mr-1.5" />
                00:{timeLeft.toString().padStart(2, '0')}
             </Badge>
             <Badge variant="outline" className="px-3 py-1.5 text-base bg-white border-stone-200 shadow-sm text-stone-700 flex items-center">
                <Target className="w-4 h-4 mr-1.5 text-orange-400" />
                得分: {score}
             </Badge>
             {hasStarted && !isGameOver && (
                <Button variant="outline" size="icon" onClick={() => { setIsPlaying(false); setIsGameOver(true); }} className="rounded-full w-9 h-9" title="提早結束">
                    <RefreshCw className="w-4 h-4 text-stone-400" />
                </Button>
             )}
        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex-1 w-full flex flex-col items-center justify-center p-4 overflow-hidden relative z-10">
         {!hasStarted ? (
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white/95 p-8 rounded-3xl shadow-xl backdrop-blur-sm max-w-sm text-center space-y-6"
            >
                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-6xl">🐹</span>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-stone-800 mb-2">打地鼠遊戲</h2>
                    <p className="text-stone-600">小地鼠會隨機出現，看到牠們就輕輕點一下！訓練寶寶的手眼協調與專注力。</p>
                </div>
                <div className="bg-emerald-50 text-emerald-800 text-sm p-3 rounded-xl">
                    限時 {GAME_DURATION} 秒，準備好了嗎？
                </div>
                <Button onClick={startGame} size="lg" className="w-full rounded-full bg-orange-500 hover:bg-orange-600 text-lg py-6 shadow-lg shadow-orange-200">
                    開始遊戲
                </Button>
            </motion.div>
         ) : isGameOver ? (
             <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center space-y-6 relative max-w-sm mx-auto bg-white/95 p-8 rounded-3xl shadow-xl backdrop-blur-sm"
             >
                 {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                        animate={{
                            x: (Math.random() - 0.5) * 600,
                            y: (Math.random() - 0.5) * 600,
                            opacity: 0,
                            scale: Math.random() * 1.5 + 0.5,
                            rotate: Math.random() * 360
                        }}
                        transition={{ duration: 2, ease: "easeOut", repeat: Infinity, repeatDelay: 1 }}
                        className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full pointer-events-none"
                        style={{ backgroundColor: ['#FFD700', '#F97316', '#40E0D0', '#A78BFA', '#10B981'][Math.floor(Math.random() * 5)] }}
                    />
                 ))}

                 <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto relative z-10">
                    <Trophy className="w-12 h-12 text-yellow-500" />
                 </div>
                 
                 <div className="relative z-10 space-y-4">
                    <h2 className="text-3xl font-bold text-stone-800">時間到！</h2>
                    <p className="text-stone-600">
                        哇！你總共找到了 <span className="text-3xl font-bold text-orange-500 mx-1">{score}</span> 隻小地鼠！
                    </p>
                    
                    <div className="pt-4 flex gap-3 justify-center">
                        <Button onClick={onExit} variant="outline" className="rounded-full px-6">
                            回大廳
                        </Button>
                        <Button onClick={startGame} className="rounded-full px-6 bg-orange-500 hover:bg-orange-600 text-white shadow-sm hover:shadow">
                            <RefreshCw className="w-4 h-4 mr-2" /> 再玩一次
                        </Button>
                    </div>
                 </div>
             </motion.div>
         ) : (
            <div className="w-full max-w-md flex flex-col items-center">
                <div className="grid grid-cols-3 gap-3 sm:gap-6 p-4 sm:p-6 bg-emerald-800/40 rounded-3xl backdrop-blur-md shadow-2xl border-4 border-emerald-900/50 w-full aspect-square">
                    {moles.map((mole) => (
                        <div 
                            key={mole.id} 
                            className="relative w-full h-full flex flex-col justify-end"
                            onClick={() => handleMoleClick(mole.id)}
                        >
                            {/* Hole background */}
                            <div className="absolute bottom-0 w-full h-[40%] bg-stone-900/60 rounded-[100%] shadow-inner z-0" />
                            
                            {/* Dirt mound edge */}
                            <div className="absolute bottom-0 w-full h-[45%] rounded-[100%] border-b-8 border-stone-800/80 z-20 pointer-events-none" />

                            {/* Mole Container */}
                            <div className="absolute bottom-[20%] w-full h-[80%] overflow-hidden z-10 flex justify-center items-end">
                                <AnimatePresence>
                                    {(mole.active || mole.hit) && (
                                        <motion.div
                                            initial={{ y: '100%' }}
                                            animate={{ y: mole.hit ? '20%' : '0%' }}
                                            exit={{ y: '100%' }}
                                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                            className="w-[80%] aspect-square pb-2 cursor-pointer touch-manipulation origin-bottom flex items-center justify-center text-5xl sm:text-7xl select-none"
                                        >
                                            {mole.hit ? '💥' : '🐹'}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8">
                    <Dialog>
                        <DialogTrigger asChild>
                             <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/20 gap-1 rounded-full text-sm bg-black/20 backdrop-blur-sm border border-white/10">
                                <Lightbulb className="w-4 h-4" />
                                爸媽陪玩小撇步
                             </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-sm rounded-2xl">
                             <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                    <User className="w-5 h-5 text-orange-400" />
                                    給爸媽的陪玩建議
                                </DialogTitle>
                                <DialogDescription className="pt-2 text-stone-600 leading-relaxed text-left">
                                    這款遊戲能幫助 3-5 歲幼兒練習「專注力」與「手眼協調」。建議爸媽可以在旁邊用語氣給予回饋：「哇！小地鼠出來了！」「敲到了，好棒！」，增添遊戲的趣味與成就感喔！
                                </DialogDescription>
                             </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
         )}
      </div>
    </div>
  );
}
