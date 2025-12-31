import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Clock, User, Check, RefreshCw, Star, Trophy, Moon, Home, Hourglass, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useGameTime } from '../../context/GameTimeContext';
import forestMatchingImageFigma from 'figma:asset/547c0c08904dbc199c976f126cb140b91d0d3e42.png';

// Helper to switch between Figma asset (preview) and GitHub Pages asset (production)
const getAssetPath = (figmaAsset: string, githubFilename: string) => {
    if (typeof window !== 'undefined' && window.location.pathname.includes('/Morimori/')) {
        return `/Morimori/assets/${githubFilename}`;
    }
    return figmaAsset;
};

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
    image: getAssetPath(forestMatchingImageFigma, 'forest-matching.png'),
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

  useEffect(() => {
    startTimer();
    return () => {
        stopTimer();
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
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
          <div className="fixed inset-0 z-50 bg-stone-900/95 backdrop-blur-sm flex items-center justify-center p-4">
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
    <div className="max-w-4xl mx-auto py-8 text-center">
      <FloatingTimer />
      <div className="flex justify-between items-center mb-8">
        <Button variant="ghost" onClick={onExit} className="text-stone-500">
          <ArrowLeft className="w-4 h-4 mr-2" /> 離開遊戲
        </Button>
        <div className="flex gap-4">
             <Badge variant="outline" className="px-4 py-2 text-lg bg-white border-stone-200 font-mono">
                <Clock className="w-4 h-4 mr-2 text-stone-400" />
                {formatTime(elapsedTime)}
             </Badge>
             <Badge variant="outline" className="px-4 py-2 text-lg bg-white border-stone-200">
                步數: {moves}
             </Badge>
             <Button variant="outline" size="icon" onClick={shuffleCards} className="rounded-full" title="重新開始">
                <RefreshCw className="w-4 h-4" />
             </Button>
        </div>
      </div>

      <div className="bg-emerald-50/50 rounded-3xl p-8 shadow-inner min-h-[500px] flex flex-col justify-center">
         {!isWon ? (
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 max-w-2xl mx-auto w-full">
                {cards.map(card => (
                <div 
                    key={card.id}
                    className="aspect-square cursor-pointer [perspective:1000px]"
                    onClick={() => handleCardClick(card.id)}
                >
                    <motion.div
                        className="relative w-full h-full text-center transition-all [transform-style:preserve-3d]"
                        animate={{ rotateY: card.isFlipped ? 180 : 0 }}
                        transition={{ duration: 0.3 }} // Faster flip
                    >
                        {/* Front (Hidden) */}
                        <div 
                            className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl shadow-sm flex items-center justify-center text-4xl bg-white border-2 border-emerald-100"
                        >
                            <span className="opacity-50 text-emerald-200 text-6xl">?</span>
                        </div>
                        
                        {/* Back (Revealed) */}
                        <div 
                            className={`absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl shadow-md flex items-center justify-center overflow-hidden border-4
                            ${card.isMatched ? 'bg-yellow-50 border-yellow-200' : 'bg-white border-emerald-400'}
                            `}
                            style={{ transform: "rotateY(180deg)" }}
                        >
                            <span className="text-6xl select-none" role="img" aria-label="animal">
                                {ANIMAL_EMOJIS[card.animalIndex]}
                            </span>
                        </div>
                    </motion.div>
                </div>
                ))}
            </div>
         ) : (
             <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center space-y-6 relative"
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
                        className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full"
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
                 
                 <div className="relative z-10">
                    <h2 className="text-4xl font-bold text-stone-800 mb-2">太棒了！挑戰成功！</h2>
                    <div className="flex justify-center gap-4 text-stone-500 mb-4 font-mono text-lg">
                        <span className="flex items-center gap-1"><Clock className="w-5 h-5"/> {formatTime(elapsedTime)}</span>
                        <span>|</span>
                        <span>{moves} 步</span>
                    </div>
                    <p className="text-xl text-stone-500">現在，轉身給爸爸媽媽一個大大的擊掌！✋</p>
                 </div>

                 <Button onClick={shuffleCards} size="lg" className="relative z-10 rounded-full bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-6 mt-8 shadow-xl shadow-emerald-200">
                    <RefreshCw className="w-5 h-5 mr-2" /> 再玩一次
                 </Button>
             </motion.div>
         )}
      </div>

      <div className="mt-8 bg-orange-50 p-6 rounded-2xl flex items-start gap-4 text-left max-w-2xl mx-auto">
        <div className="bg-white p-2 rounded-full shrink-0">
            <User className="w-6 h-6 text-orange-400" />
        </div>
        <div>
            <h4 className="font-bold text-stone-800 mb-1">給爸媽的陪玩建議</h4>
            <p className="text-sm text-stone-600">
                這不只是記憶遊戲。試著問孩子：「這是什麼動物？」「獅子怎麼叫？」增加語言互動，比輸贏更重要喔。
            </p>
        </div>
      </div>
    </div>
  );
}