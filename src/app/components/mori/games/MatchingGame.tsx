import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Clock, RefreshCw, Trophy, User, Sparkles, Lightbulb, Rabbit, Squirrel, TreeDeciduous, Flower2, Bird, Snail, Nut } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useGameTime } from '../../context/GameTimeContext';
import { TimeUpOverlay } from '../TimeUpOverlay';
import { playCorrectSound, playWrongSound } from '../../utils/gameAudio';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

// --- Game Assets (Lucide Icons) ---
const CARD_ICONS = [
  { id: 'rabbit', icon: Rabbit, color: 'text-pink-500', bg: 'bg-pink-100' },
  { id: 'squirrel', icon: Squirrel, color: 'text-orange-500', bg: 'bg-orange-100' },
  { id: 'tree', icon: TreeDeciduous, color: 'text-emerald-500', bg: 'bg-emerald-100' },
  { id: 'flower', icon: Flower2, color: 'text-rose-500', bg: 'bg-rose-100' },
  { id: 'bird', icon: Bird, color: 'text-sky-500', bg: 'bg-sky-100' },
  { id: 'snail', icon: Snail, color: 'text-lime-500', bg: 'bg-lime-100' },
];

// --- Types ---
interface CardItem {
  uniqueId: number;
  iconId: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export function MatchingGame({ onExit }: { onExit: () => void }) {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]); // stores uniqueIds
  const [isWon, setIsWon] = useState(false);
  const [moves, setMoves] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [matchesCount, setMatchesCount] = useState(0); // For pinecone feedback (0-6)
  
  // "Forest Logic Bunny" emotion state
  const [bunnyEmotion, setBunnyEmotion] = useState<'happy' | 'neutral' | 'worried' | 'excited'>('neutral');

  const { startTimer, stopTimer, isTimeUp, recordGame } = useGameTime();
  const startTimeRef = useRef(Date.now());
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // --- Initialization & Lifecycle ---

  useEffect(() => {
    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    startTimer();
    shuffleCards();

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
      stopTimer();
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

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

  // --- Game Logic ---

  const shuffleCards = () => {
    const indices = [0, 1, 2, 3, 4, 5]; // Indices of CARD_ICONS
    const duplicated = [...indices, ...indices];
    const shuffled = duplicated
      .sort(() => Math.random() - 0.5)
      .map((iconIndex, index) => ({
        uniqueId: index,
        iconId: CARD_ICONS[iconIndex].id,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setFlippedCards([]);
    setIsWon(false);
    setMoves(0);
    setElapsedTime(0);
    setMatchesCount(0);
    setBunnyEmotion('neutral');
    startTimeRef.current = Date.now();
  };

  const handleCardClick = (uniqueId: number) => {
    // Block input if 2 cards flipped, or card is already flipped/matched
    if (flippedCards.length === 2) return;
    const card = cards.find(c => c.uniqueId === uniqueId);
    if (!card || card.isFlipped || card.isMatched) return;

    // Flip logic
    const newCards = cards.map(c => c.uniqueId === uniqueId ? { ...c, isFlipped: true } : c);
    setCards(newCards);
    
    const newFlipped = [...flippedCards, uniqueId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      checkForMatch(newFlipped, newCards);
    } else {
        // Just one card flipped, bunny is curious/neutral
        setBunnyEmotion('neutral');
    }
  };

  const checkForMatch = (flippedIds: number[], currentCards: CardItem[]) => {
    const [id1, id2] = flippedIds;
    const card1 = currentCards.find(c => c.uniqueId === id1);
    const card2 = currentCards.find(c => c.uniqueId === id2);

    if (card1?.iconId === card2?.iconId) {
      // --- Match ---
      playCorrectSound();
      setBunnyEmotion('happy');
      
      setTimeout(() => {
        const matchedCards = currentCards.map(c => 
          c.uniqueId === id1 || c.uniqueId === id2 
            ? { ...c, isMatched: true, isFlipped: true } 
            : c
        );
        setCards(matchedCards);
        setFlippedCards([]);
        setMatchesCount(prev => prev + 1); // Eat pinecone
        
        // Check Win
        if (matchedCards.every(c => c.isMatched)) {
          handleWin();
        }
      }, 500);
    } else {
      // --- No Match ---
      // Emotion guide: Safe failure (no negative sound in requirements, but we have playWrongSound helper - user said "no negative sound effects", but context has playWrongSound. 
      // User prompt: "emphasizing 'emotional safety' when matching errors (no negative sound effects)". 
      // So I should NOT play wrong sound, or play a very gentle one. The user said "Game sound effects are generated via Web Audio API...". 
      // I will comment out playWrongSound() to respect "no negative sound effects".
      // playWrongSound(); 
      setBunnyEmotion('worried'); // "Oh no, try again!" look

      setTimeout(() => {
        const resetCards = currentCards.map(c => 
          c.uniqueId === id1 || c.uniqueId === id2 
            ? { ...c, isFlipped: false } 
            : c
        );
        setCards(resetCards);
        setFlippedCards([]);
        setBunnyEmotion('neutral');
      }, 1000);
    }
  };

  const handleWin = () => {
    setIsWon(true);
    setBunnyEmotion('excited');
    const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
    setElapsedTime(duration);
    recordGame({
        gameId: 'matching',
        gameType: '森林配對樂',
        score: `步數: ${moves + 1} / 時間: ${formatTime(duration)}`,
        timePlayed: duration
    });
  };

  const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (isTimeUp) {
      return <TimeUpOverlay onExit={onExit} />;
  }

  // Helper to get Icon Component
  const getCardIcon = (iconId: string) => {
      const item = CARD_ICONS.find(i => i.id === iconId);
      if (!item) return null;
      const Icon = item.icon;
      return <Icon className={`w-10 h-10 md:w-14 md:h-14 ${item.color}`} />;
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-50 flex flex-col select-none overflow-hidden touch-none">
      {/* Header */}
      <div className="flex-none px-4 py-4 flex justify-between items-center z-20">
        <Button variant="ghost" onClick={onExit} className="text-stone-500 hover:bg-stone-100 -ml-2 rounded-full">
          <ArrowLeft className="w-5 h-5 mr-1" /> 離開
        </Button>
        <div className="flex gap-2">
             <Badge variant="secondary" className="px-3 py-1.5 text-base font-mono bg-white shadow-sm text-stone-600">
                <Clock className="w-4 h-4 mr-1.5 text-stone-400" />
                {formatTime(elapsedTime)}
             </Badge>
             <Button variant="outline" size="icon" onClick={shuffleCards} className="rounded-full w-9 h-9 bg-white shadow-sm" title="重新開始">
                <RefreshCw className="w-4 h-4 text-stone-500" />
             </Button>
        </div>
      </div>

      {/* Main Game Area - Scrollable */}
      <div className="flex-1 w-full flex flex-col items-center justify-start pt-4 px-4 overflow-y-auto relative">
         {!isWon ? (
            <div className="w-full max-w-md flex flex-col items-center min-h-[500px] pb-8">
                {/* Cards Grid */}
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3 w-full aspect-[3/4] md:aspect-square mb-6">
                    {cards.map(card => {
                        const iconData = CARD_ICONS.find(i => i.id === card.iconId);
                        return (
                        <div 
                            key={card.uniqueId}
                            className="relative w-full h-full cursor-pointer [perspective:1000px]"
                            onClick={() => handleCardClick(card.uniqueId)}
                        >
                            <motion.div
                                className="w-full h-full transition-all [transform-style:preserve-3d]"
                                animate={{ rotateY: card.isFlipped ? 180 : 0 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            >
                                {/* Front (Hidden/Cover) */}
                                <div 
                                    className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl shadow-sm flex items-center justify-center bg-white border-b-4 border-stone-200 hover:border-b-4 hover:-translate-y-0.5 active:border-b-0 active:translate-y-1 transition-all"
                                >
                                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                                        <TreeDeciduous className="w-5 h-5 text-emerald-300 opacity-50" />
                                    </div>
                                </div>
                                
                                {/* Back (Revealed) */}
                                <div 
                                    className={`absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl shadow-sm flex items-center justify-center border-2
                                    ${card.isMatched ? 'bg-amber-50 border-amber-200' : 'bg-white border-stone-100'}
                                    `}
                                    style={{ transform: "rotateY(180deg)" }}
                                >
                                    <div className={`p-3 rounded-full ${iconData?.bg}`}>
                                        {getCardIcon(card.iconId)}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )})}
                </div>
                
                {/* Feedback Area: Squirrel & Pinecones */}
                <div className="w-full bg-white/80 backdrop-blur-sm rounded-3xl p-4 border border-stone-200 shadow-lg flex flex-col gap-3 relative overflow-hidden">
                    <div className="flex justify-between items-center px-1">
                        <span className="text-sm font-bold text-stone-600 flex items-center gap-2">
                            <Squirrel className="w-4 h-4 text-orange-500" />
                            幫松鼠找午餐
                        </span>
                        <span className="text-xs text-stone-400 font-mono">
                            {matchesCount} / 6
                        </span>
                    </div>

                    {/* Emotion Bunny Guide */}
                    <div className="absolute top-0 right-0 p-2 opacity-20 pointer-events-none">
                         {/* Subtle background decoration */}
                    </div>

                    <div className="flex items-center justify-between gap-4 z-10 w-full">
                         {/* Squirrel Character */}
                         <motion.div 
                            animate={bunnyEmotion === 'happy' ? { y: -5, scale: 1.1 } : { y: 0, scale: 1 }}
                            className="relative shrink-0"
                         >
                             <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center border-4 border-white shadow-md">
                                 <Squirrel className={`w-9 h-9 text-orange-600 ${bunnyEmotion === 'happy' ? 'animate-bounce' : ''}`} />
                             </div>
                             {/* Speech Bubble / Emotion Indicator */}
                             <AnimatePresence>
                                {bunnyEmotion === 'worried' && (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                                        className="absolute -top-6 -right-6 bg-white px-2 py-1 rounded-lg text-xs font-bold text-stone-500 shadow-sm border border-stone-100 whitespace-nowrap"
                                    >
                                        再試試看！
                                    </motion.div>
                                )}
                                {bunnyEmotion === 'happy' && (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                                        className="absolute -top-6 -right-6 bg-white px-2 py-1 rounded-lg text-xs font-bold text-emerald-500 shadow-sm border border-stone-100 whitespace-nowrap"
                                    >
                                        好棒！
                                    </motion.div>
                                )}
                             </AnimatePresence>
                         </motion.div>

                         {/* Pinecones Progress */}
                         <div className="flex flex-1 justify-center gap-2 md:gap-3 items-center bg-stone-100/80 px-4 py-3 rounded-2xl shadow-inner">
                            {Array.from({ length: 6 }).map((_, i) => {
                                const isEaten = i < matchesCount;
                                return (
                                    <div key={i} className="relative w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
                                        {/* Placeholder dot */}
                                        <div className="w-2 h-2 rounded-full bg-stone-300/50 absolute" /> 
                                        
                                        <AnimatePresence>
                                            {!isEaten && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    exit={{ scale: 0, x: -50, y: 10, opacity: 0 }}
                                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                                    className="absolute inset-0"
                                                >
                                                   <Nut className="w-full h-full text-amber-700 fill-amber-700 drop-shadow-sm" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )
                            })}
                         </div>
                    </div>

                    {/* Tip Button */}
                    <div className="absolute top-2 right-2">
                    <Dialog>
                        <DialogTrigger asChild>
                             <Button variant="ghost" size="icon" className="h-8 w-8 text-stone-300 hover:text-stone-500 rounded-full hover:bg-stone-100">
                                <Lightbulb className="w-4 h-4" />
                             </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-sm rounded-2xl">
                             <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                    <User className="w-5 h-5 text-orange-400" />
                                    給爸媽的陪玩建議
                                </DialogTitle>
                                <DialogDescription className="pt-2 text-stone-600 leading-relaxed">
                                    當孩子配對錯誤時，小松鼠會說「再試試看」，不會有失敗的音效。您可以鼓勵孩子：「沒關係，我們再找找看！」建立情緒安全感。
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
                className="text-center space-y-6 relative max-w-sm mx-auto bg-white p-8 rounded-3xl shadow-xl border border-stone-100 mt-10"
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
                    <h2 className="text-3xl font-bold text-stone-800">松果都收集到了！</h2>
                    <div className="flex justify-center gap-4 text-stone-500 font-mono text-lg bg-stone-50 py-2 rounded-xl">
                        <span className="flex items-center gap-1"><Clock className="w-5 h-5 text-stone-400"/> {formatTime(elapsedTime)}</span>
                        <span className="text-stone-300">|</span>
                        <span>{moves} 步</span>
                    </div>
                    <p className="text-lg text-emerald-600 font-medium pt-2">小松鼠吃得好飽，謝謝你！</p>
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
