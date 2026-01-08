import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Clock, RefreshCw, Trophy, Sparkles, Star, User, Lightbulb, Music } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useGameTime } from '../../context/GameTimeContext';
import { TimeUpOverlay } from './TimeUpOverlay';
import { playCorrectSound, playWrongSound, startBackgroundMusic, stopBackgroundMusic } from '../../utils/gameAudio';

// Color definitions
const COLORS = [
  { id: 'red', name: '紅色', class: 'bg-red-500', text: 'text-red-500', border: 'border-red-500', bgLight: 'bg-red-50' },
  { id: 'blue', name: '藍色', class: 'bg-blue-500', text: 'text-blue-500', border: 'border-blue-500', bgLight: 'bg-blue-50' },
  { id: 'green', name: '綠色', class: 'bg-green-500', text: 'text-green-500', border: 'border-green-500', bgLight: 'bg-green-50' },
  { id: 'yellow', name: '黃色', class: 'bg-yellow-400', text: 'text-yellow-400', border: 'border-yellow-400', bgLight: 'bg-yellow-50' },
  { id: 'orange', name: '橘色', class: 'bg-orange-500', text: 'text-orange-500', border: 'border-orange-500', bgLight: 'bg-orange-50' },
  { id: 'purple', name: '紫色', class: 'bg-purple-500', text: 'text-purple-500', border: 'border-purple-500', bgLight: 'bg-purple-50' },
];

// Shapes/Icons could be added later, for now we stick to "Balloons" (Circles)

export function ColorGame({ onExit }: { onExit: () => void }) {
  const [targetColor, setTargetColor] = useState(COLORS[0]);
  const [options, setOptions] = useState<typeof COLORS>([]);
  const [score, setScore] = useState(0);
  const [isWrong, setIsWrong] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [bgmEnabled, setBgmEnabled] = useState(true);
  
  const { startTimer, stopTimer, isTimeUp, recordGame } = useGameTime();
  const startTimeRef = useRef(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initial Setup
  useEffect(() => {
    startTimer();
    startNewRound();
    startBackgroundMusic(); // Start BGM automatically

    // Timer logic
    timerIntervalRef.current = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);

    return () => {
      stopTimer();
      stopBackgroundMusic(); // Stop BGM on exit
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  // Toggle BGM
  const toggleBgm = () => {
    if (bgmEnabled) {
      stopBackgroundMusic();
      setBgmEnabled(false);
    } else {
      startBackgroundMusic();
      setBgmEnabled(true);
    }
  };

  const startNewRound = () => {
    // Pick 3 or 4 random colors
    const shuffled = [...COLORS].sort(() => Math.random() - 0.5);
    const roundOptions = shuffled.slice(0, 3); // Start with 3 options
    
    // Pick one as target
    const target = roundOptions[Math.floor(Math.random() * roundOptions.length)];
    
    setOptions(roundOptions);
    setTargetColor(target);
    setIsWrong(false);
  };

  const handleOptionClick = (color: typeof COLORS[0]) => {
    if (color.id === targetColor.id) {
      // Correct
      playCorrectSound();
      setScore(s => s + 1);
      
      // Celebrate every 5 points
      if ((score + 1) % 5 === 0) {
        setShowCelebration(true);
        setTimeout(() => {
            setShowCelebration(false);
            startNewRound();
        }, 2000);
      } else {
        startNewRound();
      }
    } else {
      // Wrong
      playWrongSound();
      setIsWrong(true);
      setTimeout(() => setIsWrong(false), 500); // Shake animation reset
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (isTimeUp) {
    return <TimeUpOverlay onExit={onExit} />;
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#FDFBF7] flex flex-col font-sans select-none">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-yellow-200 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-green-200 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-100 blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="flex-none px-4 py-3 bg-white/80 backdrop-blur-md shadow-sm flex justify-between items-center z-20">
        <Button variant="ghost" onClick={onExit} className="text-stone-500 hover:bg-stone-100 -ml-2 rounded-full">
          <ArrowLeft className="w-5 h-5 mr-1" /> 離開
        </Button>
        <div className="flex gap-2">
             <Button variant="ghost" size="icon" onClick={toggleBgm} className={`rounded-full w-9 h-9 ${bgmEnabled ? 'text-emerald-500 bg-emerald-50' : 'text-stone-300'}`}>
                <Music className="w-4 h-4" />
             </Button>
             <Badge variant="outline" className="px-3 py-1.5 text-base bg-white border-stone-200 font-mono shadow-sm">
                <Clock className="w-4 h-4 mr-1.5 text-stone-400" />
                {formatTime(elapsedTime)}
             </Badge>
             <Badge variant="outline" className="px-3 py-1.5 text-base bg-white border-stone-200 shadow-sm text-emerald-600">
                <Star className="w-4 h-4 mr-1.5 fill-emerald-600 text-emerald-600" />
                {score} 分
             </Badge>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 max-w-4xl mx-auto w-full">
        
        {/* Question */}
        <div className="text-center mb-12 space-y-4">
            <h2 className="text-2xl md:text-3xl text-stone-600 font-medium">
                請找出
                <span className={`mx-3 px-4 py-1 rounded-full text-white font-bold inline-block transform hover:scale-105 transition-transform ${targetColor.class} shadow-lg shadow-${targetColor.id}-200`}>
                    {targetColor.name}
                </span>
                的氣球！
            </h2>
            <p className="text-stone-400 text-sm">點擊正確的顏色氣球</p>
        </div>

        {/* Balloon Options */}
        <div className="grid grid-cols-3 gap-4 md:gap-12 w-full max-w-2xl">
            <AnimatePresence mode="popLayout">
                {options.map((color) => (
                    <motion.button
                        key={color.id}
                        layout
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1, y: -10 }}
                        whileTap={{ scale: 0.9 }}
                        className={`
                            relative aspect-[3/4] rounded-full flex items-center justify-center
                            shadow-xl hover:shadow-2xl transition-all duration-300
                            ${color.class}
                            ${isWrong ? 'animate-shake' : ''}
                        `}
                        onClick={() => handleOptionClick(color)}
                    >
                        {/* Balloon Reflection */}
                        <div className="absolute top-[15%] right-[20%] w-[15%] h-[10%] bg-white/40 rounded-full rotate-[-45deg]"></div>
                        
                        {/* String (Bottom) */}
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-1 h-12 bg-stone-300 origin-top"></div>
                    </motion.button>
                ))}
            </AnimatePresence>
        </div>

        {/* Celebration Overlay */}
        <AnimatePresence>
            {showCelebration && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
                >
                    <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl text-center space-y-4 border-4 border-yellow-200">
                        <Trophy className="w-16 h-16 mx-auto text-yellow-400 animate-bounce" />
                        <h3 className="text-3xl font-bold text-stone-700">太棒了！</h3>
                        <p className="text-stone-500">繼續加油！</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Parent Advice */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
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
                            <User className="w-5 h-5 text-orange-400" />
                            給爸媽的陪玩建議
                        </DialogTitle>
                        <DialogDescription className="pt-2 text-stone-600 leading-relaxed">
                            生活中充滿了顏色！試著指著家裡的物品問孩子：「這是什麼顏色的？」或「找找看家裡有沒有紅色的東西？」
                            這能將遊戲延伸到現實生活中喔。
                        </DialogDescription>
                        </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>

      </div>
    </div>
  );
}
