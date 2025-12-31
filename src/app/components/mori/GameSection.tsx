import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Clock, User, Check, RefreshCw, Star, Trophy, Moon, Home, Hourglass, Sparkles, Lightbulb } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useGameTime } from '../../context/GameTimeContext';
const gameBg = '/Morimori/assets/forest-game-bg.png';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

// Game Types
interface Game {
  id: string;
  title: string;
  description: string;
  age: string;
  time: string;
  image: string;
  color: string;
}

const GAMES: Game[] = [
  {
    id: 'matching',
    title: '森林配對樂',
    description: '找出相同的動物好朋友！訓練記憶力與專注力。',
    age: '3-5 歲',
    time: '5-10 分',
    image: '/Morimori/assets/forest-matching.png',
    color: 'bg-emerald-100 text-emerald-800'
  },
  {
    id: 'sorting',
    title: '顏色分類家 (即將推出)',
    description: '幫助小松鼠把果實分類。',
    age: '3-4 歲',
    time: '5 分',
    image: 'https://images.unsplash.com/photo-1659184619594-ef7e655b843e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJlbnQlMjBhbmQlMjBjaGlsZCUyMHJlYWRpbmclMjBib29rJTIwaGFwcHklMjB3YXJtfGVufDF8fHx8MTc2NjcxOTYzOXww&ixlib=rb-4.1.0&q=80&w=1080',
    color: 'bg-orange-100 text-orange-800'
  }
];

function FloatingTimer() {
  const { dailyLimit, timeUsed, isPlaying } = useGameTime();
  const remainingSeconds = Math.max(0, dailyLimit * 60 - timeUsed);
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const isLow = remainingSeconds < 300; // Less than 5 mins

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3 px-5 py-3 rounded-full shadow-xl bg-white border border-stone-100 animate-in fade-in slide-in-from-bottom-4">
      <div className={`p-2 rounded-full ${isLow ? 'bg-orange-100 text-orange-500' : 'bg-emerald-100 text-emerald-500'}`}>
         <Hourglass className={`w-5 h-5 ${isPlaying ? 'animate-pulse' : ''}`} />
      </div>
      <div className="flex flex-col items-start">
         <span className="text-xs text-stone-400 font-medium">剩餘時間</span>
         <span className={`text-xl font-bold font-mono leading-none ${isLow ? 'text-orange-500' : 'text-stone-700'}`}>
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
         </span>
      </div>
    </div>
  );
}

export function GameSection() {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  if (activeGame === 'matching') {
    return <MatchingGame onExit={() => setActiveGame(null)} />;
  }

  return (
    <div className="space-y-8 py-8">
      <FloatingTimer />
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl font-bold text-stone-800">親子遊戲大廳</h2>
        <p className="text-stone-500 max-w-2xl mx-auto">
          陪伴孩子也可以是一起玩遊戲。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {GAMES.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full border-none shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/3] relative">
                <ImageWithFallback 
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={`${game.color} hover:${game.color}`}>
                    {game.age}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-stone-800">{game.title}</h3>
                    <div className="flex items-center text-xs text-stone-400">
                        <Clock className="w-3 h-3 mr-1" /> {game.time}
                    </div>
                </div>
                <p className="text-stone-500 text-sm">
                    {game.description}
                </p>
                <div className="pt-4">
                    <Button 
                        className={`w-full rounded-xl ${game.id === 'sorting' ? 'bg-stone-200 text-stone-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'}`}
                        disabled={game.id === 'sorting'}
                        onClick={() => setActiveGame(game.id)}
                    >
                        {game.id === 'sorting' ? '敬請期待' : '開始遊玩'}
                    </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Animal Emojis for 3x4 grid (6 pairs = 12 cards)
const ANIMAL_EMOJIS = ["🐶", "🐱", "🐻", "🐼", "🦁", "🐸"];

interface CardItem {
  id: number;
  animalIndex: number; // Index in ANIMAL_EMOJIS
  isFlipped: boolean;
  isMatched: boolean;
}

function MatchingGame({ onExit }: { onExit: () => void }) {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [isWon, setIsWon] = useState(false);
  const [moves, setMoves] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const { startTimer, stopTimer, isTimeUp, recordGame } = useGameTime();
  const startTimeRef = useRef(Date.now());
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Lock body scroll and prevent touch gestures to improve mobile experience
  useEffect(() => {
    // Save original styles
    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;

    // Apply lock
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    return () => {
        // Restore styles
        document.body.style.overflow = originalOverflow;
        document.body.style.touchAction = originalTouchAction;
        
        stopTimer();
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    startTimer();
    // Cleanup handled in main useEffect
  }, []);

  useEffect(() => {
    shuffleCards();
  }, []);

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

  if (isTimeUp) {
      return (
          <div className="fixed inset-0 z-[100] bg-stone-900/95 backdrop-blur-sm flex items-center justify-center p-4">
              <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="max-w-md w-full bg-white rounded-3xl p-8 text-center space-y-6 shadow-2xl"
              >
                  <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
                      <Moon className="w-12 h-12 text-indigo-500" />
                  </div>
                  <div className="space-y-2">
                      <h2 className="text-2xl font-bold text-stone-800">鎖定! 眼睛該休息囉!!</h2>
                      <p className="text-stone-500 leading-relaxed">
                          今天的眼睛運動時間結束了。<br/>
                          爸爸媽媽，我們一起去喝杯水、看看遠方吧！
                      </p>
                  </div>
                  <div className="pt-4">
                      <Button onClick={onExit} size="lg" className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 h-12 text-lg">
                          <Home className="w-5 h-5 mr-2" />
                          回到大廳
                      </Button>
                  </div>
              </motion.div>
          </div>
      );
  }

  const shuffleCards = () => {
    // 6 animals * 2 = 12 cards
    const indices = [0, 1, 2, 3, 4, 5];
    const duplicated = [...indices, ...indices];
    const shuffled = duplicated
      .sort(() => Math.random() - 0.5)
      .map((animalIndex, index) => ({
        id: index,
        animalIndex: animalIndex,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setFlippedCards([]);
    setIsWon(false);
    setMoves(0);
    setElapsedTime(0);
    startTimeRef.current = Date.now();
  };

  const handleCardClick = (id: number) => {
    // Prevent clicking if 2 cards already flipped or card is already matched/flipped
    if (flippedCards.length === 2 || cards.find(c => c.id === id)?.isFlipped || cards.find(c => c.id === id)?.isMatched) return;

    // Flip card
    const newCards = cards.map(c => c.id === id ? { ...c, isFlipped: true } : c);
    setCards(newCards);
    
    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      checkForMatch(newFlipped, newCards);
    }
  };

  const checkForMatch = (flippedIds: number[], currentCards: CardItem[]) => {
    const [firstId, secondId] = flippedIds;
    const firstCard = currentCards.find(c => c.id === firstId);
    const secondCard = currentCards.find(c => c.id === secondId);

    if (firstCard?.animalIndex === secondCard?.animalIndex) {
      // Match!
      setTimeout(() => {
        const matchedCards = currentCards.map(c => 
          c.id === firstId || c.id === secondId 
            ? { ...c, isMatched: true, isFlipped: true } 
            : c
        );
        setCards(matchedCards);
        setFlippedCards([]);
        
        // Check win
        if (matchedCards.every(c => c.isMatched)) {
          setIsWon(true);
          const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
          setElapsedTime(duration); // Ensure final time is accurate
          recordGame({
             gameId: 'matching',
             gameType: '森林配對樂',
             score: `步數: ${moves + 1} / 時間: ${formatTime(duration)}`,
             timePlayed: duration
          });
        }
      }, 300); // Faster match animation
    } else {
      // No match
      setTimeout(() => {
        const resetCards = currentCards.map(c => 
          c.id === firstId || c.id === secondId 
            ? { ...c, isFlipped: false } 
            : c
        );
        setCards(resetCards);
        setFlippedCards([]);
      }, 600); // Faster mismatch reset (was 1000)
    }
  };

  return (
    <div 
        className="fixed inset-0 z-50 bg-stone-50 flex flex-col select-none overflow-hidden touch-none bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${gameBg})` }}
    >
      {/* Header */}
      <div className="flex-none px-4 py-3 bg-white/90 backdrop-blur-md shadow-sm flex justify-between items-center z-20">
        <Button variant="ghost" onClick={onExit} className="text-stone-500 hover:bg-stone-100 -ml-2">
          <ArrowLeft className="w-5 h-5 mr-1" /> 離開
        </Button>
        <div className="flex gap-2">
             <Badge variant="outline" className="px-3 py-1.5 text-base bg-white border-stone-200 font-mono shadow-sm">
                <Clock className="w-4 h-4 mr-1.5 text-stone-400" />
                {formatTime(elapsedTime)}
             </Badge>
             <Badge variant="outline" className="px-3 py-1.5 text-base bg-white border-stone-200 shadow-sm">
                步數: {moves}
             </Badge>
             <Button variant="outline" size="icon" onClick={shuffleCards} className="rounded-full w-9 h-9" title="重新開始">
                <RefreshCw className="w-4 h-4" />
             </Button>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex-1 w-full flex flex-col items-center justify-center p-4 overflow-hidden relative">
         {!isWon ? (
            <div className="w-full h-full max-w-md max-h-[80vh] flex flex-col justify-center">
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3 w-full aspect-[3/4] md:aspect-square">
                    {cards.map(card => (
                    <div 
                        key={card.id}
                        className="relative w-full h-full cursor-pointer [perspective:1000px]"
                        onClick={() => handleCardClick(card.id)}
                    >
                        <motion.div
                            className="w-full h-full transition-all [transform-style:preserve-3d]"
                            animate={{ rotateY: card.isFlipped ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Front (Hidden) */}
                            <div 
                                className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-xl shadow-sm flex items-center justify-center bg-white border-2 border-emerald-100"
                            >
                                <span className="opacity-40 text-emerald-200 text-4xl md:text-5xl font-bold">?</span>
                            </div>
                            
                            {/* Back (Revealed) */}
                            <div 
                                className={`absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-xl shadow-md flex items-center justify-center overflow-hidden border-4
                                ${card.isMatched ? 'bg-yellow-50 border-yellow-200' : 'bg-white border-emerald-400'}
                                `}
                                style={{ transform: "rotateY(180deg)" }}
                            >
                                <span className="text-4xl md:text-5xl select-none" role="img" aria-label="animal">
                                    {ANIMAL_EMOJIS[card.animalIndex]}
                                </span>
                            </div>
                        </motion.div>
                    </div>
                    ))}
                </div>
                
                {/* Advice Tip Trigger - Only visible during game */}
                <div className="mt-4 flex justify-center">
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
                                    這不只是記憶遊戲。試著問孩子：「這是什麼動物？」「獅子怎麼叫？」增加語言互動，比輸贏更重要喔。
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
                className="text-center space-y-6 relative max-w-sm mx-auto bg-white/80 p-8 rounded-3xl shadow-xl backdrop-blur-sm"
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
                        style={{ backgroundColor: ['#FFD700', '#FF6347', '#40E0D0', '#FF69B4', '#10B981'][Math.floor(Math.random() * 5)] }}
                    />
                 ))}

                 <div className="w-32 h-32 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10 animate-bounce">
                    <Trophy className="w-16 h-16 text-yellow-500" />
                    <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-4 -right-4 text-yellow-400"
                    >
                        <Sparkles className="w-10 h-10 fill-yellow-400" />
                    </motion.div>
                 </div>
                 
                 <div className="relative z-10 space-y-4">
                    <h2 className="text-3xl font-bold text-stone-800">太棒了！挑戰成功！</h2>
                    <div className="flex justify-center gap-4 text-stone-500 font-mono text-lg bg-stone-50 py-2 rounded-xl">
                        <span className="flex items-center gap-1"><Clock className="w-5 h-5 text-stone-400"/> {formatTime(elapsedTime)}</span>
                        <span className="text-stone-300">|</span>
                        <span>{moves} 步</span>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-xl text-left text-sm text-stone-600 flex gap-3">
                         <div className="bg-white p-1.5 rounded-full shrink-0 h-fit">
                             <User className="w-4 h-4 text-orange-400" />
                         </div>
                         <p>試著問孩子：「這是什麼動物？」「獅子怎麼叫？」增加語言互動，比輸贏更重要喔。</p>
                    </div>
                    <p className="text-lg text-emerald-600 font-medium pt-2">現在，給爸媽一個大大的擊掌！✋</p>
                 </div>

                 <Button onClick={shuffleCards} size="lg" className="relative z-10 rounded-full bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-6 w-full shadow-lg shadow-emerald-200">
                    <RefreshCw className="w-5 h-5 mr-2" /> 再玩一次
                 </Button>
             </motion.div>
         )}
      </div>
    </div>
  );
}