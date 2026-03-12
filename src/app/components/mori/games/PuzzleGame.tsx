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

const PUZZLE_IMAGE = "https://images.unsplash.com/photo-1769490314520-9adb1f4912a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwZG9nJTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc3MzE5MTE5NHww&ixlib=rb-4.1.0&q=80&w=1080";

export function PuzzleGame({ onExit }: { onExit: () => void }) {
  const [gridSize, setGridSize] = useState(2); // Start with 2x2 for 3-5yo
  const [board, setBoard] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  
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
    
    let shuffled = [...pieces].sort(() => Math.random() - 0.5);
    // Ensure the puzzle is not already solved
    while (shuffled.every((p, i) => p === i)) {
      shuffled = [...pieces].sort(() => Math.random() - 0.5);
    }

    setBoard(shuffled);
    setSelectedIndex(null);
    setIsWon(false);
    setMoves(0);
    setElapsedTime(0);
    startTimeRef.current = Date.now();
  };

  const handlePieceClick = (index: number) => {
    if (isWon) return;

    if (selectedIndex === null) {
      setSelectedIndex(index);
      playCorrectSound(); // Small sound for feedback
    } else {
      if (selectedIndex === index) {
        // Deselect
        setSelectedIndex(null);
      } else {
        // Swap
        const newBoard = [...board];
        [newBoard[selectedIndex], newBoard[index]] = [newBoard[index], newBoard[selectedIndex]];
        setBoard(newBoard);
        setSelectedIndex(null);
        setMoves(m => m + 1);
        
        if (newBoard.every((p, i) => p === i)) {
          handleWin();
        } else {
          // Play a small tick/swap sound (using correct sound as a generic pop)
          playCorrectSound();
        }
      }
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

  const getBackgroundPosition = (id: number, size: number) => {
    if (size <= 1) return '0% 0%';
    const row = Math.floor(id / size);
    const col = id % size;
    const x = (col / (size - 1)) * 100;
    const y = (row / (size - 1)) * 100;
    return `${x}% ${y}%`;
  };

  if (isTimeUp) {
      return <TimeUpOverlay onExit={onExit} />;
  }

  return (
    <div className="fixed inset-0 z-50 bg-stone-50 flex flex-col select-none overflow-hidden touch-none bg-sky-50">
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
      <div className="flex-1 w-full flex flex-col items-center justify-center p-4 overflow-hidden relative">
         {!isWon ? (
            <div className="w-full h-full max-w-md max-h-[80vh] flex flex-col justify-center items-center gap-6">
                
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

                <div className="relative w-full aspect-square max-w-[320px] md:max-w-[400px] bg-white rounded-2xl shadow-lg border-4 border-white overflow-hidden">
                    {/* Background Hint */}
                    <div 
                        className="absolute inset-0 opacity-20 pointer-events-none"
                        style={{
                            backgroundImage: `url(${PUZZLE_IMAGE})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    
                    {/* Puzzle Grid */}
                    <div 
                        className="absolute inset-0 grid gap-1"
                        style={{
                            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                            gridTemplateRows: `repeat(${gridSize}, 1fr)`,
                            padding: '4px',
                            backgroundColor: '#f3f4f6'
                        }}
                    >
                        {board.map((pieceId, index) => {
                            const isSelected = selectedIndex === index;
                            return (
                                <motion.div
                                    key={index}
                                    layout
                                    onClick={() => handlePieceClick(index)}
                                    className={`relative cursor-pointer rounded-lg overflow-hidden shadow-sm transition-all duration-200
                                        ${isSelected ? 'ring-4 ring-yellow-400 z-10 scale-[0.95]' : 'hover:scale-[0.98] z-0'}
                                    `}
                                    style={{
                                        backgroundImage: `url(${PUZZLE_IMAGE})`,
                                        backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                                        backgroundPosition: getBackgroundPosition(pieceId, gridSize),
                                    }}
                                >
                                    {isSelected && (
                                        <div className="absolute inset-0 bg-yellow-400/20" />
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
                
                {/* Advice Tip Trigger */}
                <div className="flex justify-center">
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
                                <DialogDescription className="pt-2 text-stone-600 leading-relaxed">
                                    拼圖能訓練孩子的空間邏輯與觀察力。先從「簡單(2x2)」開始，引導孩子觀察狗狗的眼睛、耳朵等特徵，讓他們建立自信後再挑戰3x3喔！
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
                className="text-center space-y-6 relative max-w-sm mx-auto bg-white/90 p-8 rounded-3xl shadow-xl backdrop-blur-sm"
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

                 <div className="w-48 h-48 mx-auto relative rounded-2xl overflow-hidden border-4 border-white shadow-lg z-10">
                     <img src={PUZZLE_IMAGE} alt="Completed Puzzle" className="w-full h-full object-cover" />
                     <motion.div 
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ delay: 0.5 }}
                         className="absolute inset-0 bg-yellow-400/20 mix-blend-overlay"
                     />
                 </div>
                 
                 <div className="relative z-10 space-y-4 pt-2">
                    <h2 className="text-3xl font-bold text-stone-800">拼圖完成！</h2>
                    <div className="flex justify-center gap-4 text-stone-500 font-mono text-lg bg-stone-50 py-2 rounded-xl">
                        <span className="flex items-center gap-1"><Clock className="w-5 h-5 text-stone-400"/> {formatTime(elapsedTime)}</span>
                        <span className="text-stone-300">|</span>
                        <span>{moves + 1} 步</span>
                    </div>
                    <p className="text-lg text-sky-600 font-medium pt-2">好棒的觀察力！🌟</p>
                 </div>

                 <Button onClick={() => initializeGame(gridSize)} size="lg" className="relative z-10 rounded-full bg-sky-500 hover:bg-sky-600 text-white text-lg px-8 py-6 w-full shadow-lg shadow-sky-200">
                    <RefreshCw className="w-5 h-5 mr-2" /> 再玩一次
                 </Button>
             </motion.div>
         )}
      </div>
    </div>
  );
}