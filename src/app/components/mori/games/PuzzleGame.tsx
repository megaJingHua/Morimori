import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Clock, RefreshCw, Trophy, Sparkles, User, Lightbulb, Grid3X3, Grid2X2 } from 'lucide-react';
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

const ANIMAL_EMOJIS = ['🐶', '🐱', '🦁', '🐯', '🐻', '🐼', '🦊', '🐨', '🐰', '🐸', '🐷', '🐵'];

const PieceView = ({ pieceId, gridSize, emoji }: { pieceId: number, gridSize: number, emoji: string }) => {
    const pieceWidth = 100 / gridSize;
    const pieceHeight = 100 / gridSize;
    const col = pieceId % gridSize;
    const row = Math.floor(pieceId / gridSize);
    const x = col * pieceWidth;
    const y = row * pieceHeight;
    const viewBox = `${x} ${y} ${pieceWidth} ${pieceHeight}`;

    return (
        <svg viewBox={viewBox} className="w-full h-full drop-shadow-sm">
            <text x="50" y="50" fontSize="80" textAnchor="middle" dominantBaseline="central">{emoji}</text>
        </svg>
    );
};

export function PuzzleGame({ onExit }: { onExit: () => void }) {
  const [gridSize, setGridSize] = useState(2); // Start with 2x2 for 3-5yo
  const [board, setBoard] = useState<(number | null)[]>([]);
  const [tray, setTray] = useState<number[]>([]);
  const [selectedTrayPiece, setSelectedTrayPiece] = useState<number | null>(null);
  const [puzzleEmoji, setPuzzleEmoji] = useState('🐶');
  
  const [isWon, setIsWon] = useState(false);
  const [moves, setMoves] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  const { startTimer, stopTimer, isTimeUp, recordGame } = useGameTime();
  const startTimeRef = useRef(Date.now());
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Lock body scroll and prevent touch gestures to improve mobile experience
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;

    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.touchAction = originalTouchAction;
        stopTimer();
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    startTimer();
  }, []);

  useEffect(() => {
    initializeGame(gridSize);
  }, [gridSize]);

  // Update elapsed time
  useEffect(() => {
      if (isWon) {
          if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
          return;
      }
      
      timerIntervalRef.current = setInterval(() => {
          setElapsedTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }, 1000);

      return () => {
          if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      };
  }, [isWon]);

  const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const initializeGame = (size: number) => {
    const total = size * size;
    const pieces = Array.from({ length: total }, (_, i) => i);
    const shuffled = [...pieces].sort(() => Math.random() - 0.5);
    
    setBoard(Array(total).fill(null));
    setTray(shuffled);
    setSelectedTrayPiece(null);
    setIsWon(false);
    setMoves(0);
    setElapsedTime(0);
    startTimeRef.current = Date.now();
    setPuzzleEmoji(ANIMAL_EMOJIS[Math.floor(Math.random() * ANIMAL_EMOJIS.length)]);
  };

  const handleTrayClick = (pieceId: number) => {
    if (isWon) return;
    if (selectedTrayPiece === pieceId) {
        setSelectedTrayPiece(null);
    } else {
        setSelectedTrayPiece(pieceId);
        playCorrectSound();
    }
  };

  const handleBoardClick = (index: number) => {
    if (isWon) return;

    const newBoard = [...board];
    const newTray = [...tray];

    if (newBoard[index] !== null) {
        // Slot is occupied
        if (selectedTrayPiece !== null) {
            // Replace piece
            const pieceToReturn = newBoard[index]!;
            newBoard[index] = selectedTrayPiece;
            const trayIndex = newTray.indexOf(selectedTrayPiece);
            if (trayIndex > -1) {
                newTray.splice(trayIndex, 1);
            }
            newTray.push(pieceToReturn);
            setBoard(newBoard);
            setTray(newTray);
            setSelectedTrayPiece(null);
            setMoves(m => m + 1);
            playCorrectSound();
            checkWin(newBoard);
        } else {
            // Return piece to tray
            const pieceToReturn = newBoard[index]!;
            newBoard[index] = null;
            newTray.push(pieceToReturn);
            setBoard(newBoard);
            setTray(newTray);
            setMoves(m => m + 1);
            playCorrectSound();
        }
    } else if (selectedTrayPiece !== null) {
        // Slot is empty and a piece is selected
        newBoard[index] = selectedTrayPiece;
        const trayIndex = newTray.indexOf(selectedTrayPiece);
        if (trayIndex > -1) {
            newTray.splice(trayIndex, 1);
        }
        setBoard(newBoard);
        setTray(newTray);
        setSelectedTrayPiece(null);
        setMoves(m => m + 1);
        playCorrectSound();
        checkWin(newBoard);
    }
  };

  const checkWin = (currentBoard: (number | null)[]) => {
      if (currentBoard.every((p, i) => p === i)) {
          handleWin();
      }
  };

  const handleWin = () => {
      setIsWon(true);
      playCorrectSound();
      const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setElapsedTime(duration);
      recordGame({
          gameId: 'puzzle',
          gameType: '拼圖遊戲',
          score: `難度: ${gridSize}x${gridSize} / 步數: ${moves + 1}`,
          timePlayed: duration
      });
  };

  if (isTimeUp) {
      return <TimeUpOverlay onExit={onExit} />;
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col select-none overflow-hidden touch-none bg-sky-50">
      {/* Header */}
      <div className="flex-none px-4 py-3 bg-white/90 backdrop-blur-md shadow-sm flex justify-between items-center z-20">
        <Button variant="ghost" onClick={onExit} className="text-stone-500 hover:bg-stone-100 -ml-2">
          <ArrowLeft className="w-5 h-5 mr-1" /> 離開
        </Button>
        <div className="flex gap-2">
             <Badge variant="outline" className="px-3 py-1.5 text-base bg-white border-stone-200 font-mono shadow-sm hidden md:flex items-center">
                <Clock className="w-4 h-4 mr-1.5 text-stone-400" />
                {formatTime(elapsedTime)}
             </Badge>
             <Badge variant="outline" className="px-3 py-1.5 text-base bg-white border-stone-200 shadow-sm">
                步數: {moves}
             </Badge>
             <Button variant="outline" size="icon" onClick={() => initializeGame(gridSize)} className="rounded-full w-9 h-9" title="重新開始">
                <RefreshCw className="w-4 h-4" />
             </Button>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex-1 w-full flex flex-col items-center justify-start pt-6 p-4 overflow-hidden relative">
         {!isWon ? (
            <div className="w-full h-full max-w-md flex flex-col items-center gap-6">
                
                {/* Level Toggle */}
                <div className="flex bg-white/60 p-1 rounded-full shadow-sm">
                    <Button 
                        variant={gridSize === 2 ? 'default' : 'ghost'} 
                        size="sm" 
                        onClick={() => setGridSize(2)}
                        className={`rounded-full px-4 ${gridSize === 2 ? 'bg-sky-500 hover:bg-sky-600 text-white' : 'text-stone-500'}`}
                    >
                        <Grid2X2 className="w-4 h-4 mr-1.5" /> 簡單 (2x2)
                    </Button>
                    <Button 
                        variant={gridSize === 3 ? 'default' : 'ghost'} 
                        size="sm" 
                        onClick={() => setGridSize(3)}
                        className={`rounded-full px-4 ${gridSize === 3 ? 'bg-sky-500 hover:bg-sky-600 text-white' : 'text-stone-500'}`}
                    >
                        <Grid3X3 className="w-4 h-4 mr-1.5" /> 挑戰 (3x3)
                    </Button>
                </div>

                {/* Puzzle Board */}
                <div 
                    className="relative w-full aspect-square max-w-[280px] md:max-w-[360px] bg-stone-200/50 rounded-2xl shadow-inner border-4 border-stone-300 p-2 gap-2 mx-auto grid"
                    style={{
                        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                        gridTemplateRows: `repeat(${gridSize}, 1fr)`,
                    }}
                >
                    {/* Background Hint - Full Image */}
                    <div className="absolute inset-0 opacity-[0.08] pointer-events-none flex items-center justify-center z-0">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            <text x="50" y="50" fontSize="80" textAnchor="middle" dominantBaseline="central">{puzzleEmoji}</text>
                        </svg>
                    </div>
                    
                    {/* Board Slots */}
                    {board.map((pieceId, index) => (
                        <div 
                            key={`slot-${index}`}
                            onClick={() => handleBoardClick(index)}
                            className={`relative rounded-xl overflow-hidden cursor-pointer transition-colors duration-200 z-10 flex items-center justify-center
                                ${pieceId === null 
                                    ? (selectedTrayPiece !== null ? 'bg-sky-100 hover:bg-sky-200 border-2 border-dashed border-sky-300' : 'bg-stone-100/50 border-2 border-dashed border-stone-300') 
                                    : 'bg-white shadow-sm border-2 border-transparent hover:border-red-300'}
                            `}
                        >
                            {pieceId !== null && (
                                <motion.div 
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="w-full h-full bg-white"
                                >
                                    <PieceView pieceId={pieceId} gridSize={gridSize} emoji={puzzleEmoji} />
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Tray */}
                <div className="w-full max-w-md mx-auto bg-white/60 p-4 rounded-3xl shadow-sm border border-white">
                    <div className="text-center text-stone-500 font-medium mb-3 text-sm">
                        {tray.length > 0 ? '請選擇下方拼圖，然後點擊上方空格' : '拼圖都放上去了！'}
                    </div>
                    <div className="flex flex-wrap justify-center gap-3 min-h-[80px]">
                        <AnimatePresence>
                            {tray.map(pieceId => (
                                <motion.div
                                    key={`tray-${pieceId}`}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    onClick={() => handleTrayClick(pieceId)}
                                    className={`w-[60px] h-[60px] md:w-[72px] md:h-[72px] bg-white rounded-xl shadow-sm cursor-pointer overflow-hidden transition-all duration-200 border-4 shrink-0
                                        ${selectedTrayPiece === pieceId ? 'border-amber-400 ring-4 ring-amber-400/30 scale-110' : 'border-stone-100 hover:border-amber-200 hover:scale-105'}
                                    `}
                                >
                                    <PieceView pieceId={pieceId} gridSize={gridSize} emoji={puzzleEmoji} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
                
                {/* Advice Tip Trigger */}
                <div className="flex justify-center mt-auto pb-4">
                    <Dialog>
                        <DialogTrigger asChild>
                             <Button variant="ghost" size="sm" className="text-stone-400 hover:text-stone-600 gap-1 rounded-full text-xs">
                                <Lightbulb className="w-3 h-3" />
                                爸媽陪玩小撇步
                             </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-sm rounded-2xl">
                             <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                    <User className="w-5 h-5 text-sky-400" />
                                    給爸媽的陪玩建議
                                </DialogTitle>
                                <DialogDescription className="pt-2 text-stone-600 leading-relaxed text-left">
                                    將拼圖從「置換」改為「點選放置」，更符合3歲孩子的直覺。先引導孩子點選下方的動物拼圖，再點擊上方的空格。您可以引導他們觀察動物的眼睛、耳朵特徵，建立空間對應的概念！
                                </DialogDescription>
                             </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
         ) : (
             <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center space-y-6 relative w-full max-w-sm mx-auto bg-white/90 p-8 rounded-3xl shadow-xl backdrop-blur-sm mt-10"
             >
                 {/* Celebration Particles */}
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
                        style={{ backgroundColor: ['#FFD700', '#38BDF8', '#40E0D0', '#A78BFA', '#10B981'][Math.floor(Math.random() * 5)] }}
                    />
                 ))}

                 <div className="w-48 h-48 mx-auto relative rounded-2xl overflow-hidden border-4 border-white shadow-lg z-10 bg-amber-50 flex items-center justify-center">
                     <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
                        <text x="50" y="50" fontSize="80" textAnchor="middle" dominantBaseline="central">{puzzleEmoji}</text>
                     </svg>
                     <motion.div 
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ delay: 0.5 }}
                         className="absolute inset-0 bg-yellow-400/20 mix-blend-overlay"
                     />
                 </div>
                 
                 <div className="relative z-10 space-y-4 pt-2">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 text-yellow-500 mb-2 shadow-sm">
                        <Trophy className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-bold text-stone-800">太棒了！</h2>
                    <p className="text-stone-500">
                        你用了 {moves} 步完成<br/>
                        花了 {formatTime(elapsedTime)} 的時間
                    </p>
                    
                    <div className="pt-4 flex gap-3 justify-center">
                        <Button 
                            onClick={onExit}
                            variant="outline" 
                            className="rounded-full px-6"
                        >
                            回大廳
                        </Button>
                        <Button 
                            onClick={() => initializeGame(gridSize)}
                            className="rounded-full px-6 bg-sky-500 hover:bg-sky-600 text-white shadow-sm hover:shadow"
                        >
                            <RefreshCw className="w-4 h-4 mr-2" /> 再玩一次
                        </Button>
                    </div>
                 </div>
             </motion.div>
         )}
      </div>
    </div>
  );
}
