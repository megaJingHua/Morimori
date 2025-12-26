import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Clock, User, Check, RefreshCw, Star, Trophy } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Dialog, DialogContent } from '../ui/dialog';

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
    image: 'https://images.unsplash.com/photo-1670234794408-030a53941f87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwcGxheWluZyUyMG1hdGNoaW5nJTIwZ2FtZSUyMGNhcmRzJTIwaGFwcHl8ZW58MXx8fHwxNzY2NzE5NjM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
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

export function GameSection() {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  if (activeGame === 'matching') {
    return <MatchingGame onExit={() => setActiveGame(null)} />;
  }

  return (
    <div className="space-y-8 py-8">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl font-bold text-stone-800">親子遊戲大廳</h2>
        <p className="text-stone-500 max-w-2xl mx-auto">
          每天 10 分鐘，把手機放下，我們一起玩。
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

// --- Matching Game Component ---

const EMOJIS = ['🦁', '🐘', '🐰', '🦊', '🐼', '🐨'];

interface CardItem {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

function MatchingGame({ onExit }: { onExit: () => void }) {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [isWon, setIsWon] = useState(false);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    shuffleCards();
  }, []);

  const shuffleCards = () => {
    // Select 4 emojis for 8 cards
    const gameEmojis = EMOJIS.slice(0, 4);
    const duplicated = [...gameEmojis, ...gameEmojis];
    const shuffled = duplicated
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        content: emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setFlippedCards([]);
    setIsWon(false);
    setMoves(0);
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

    if (firstCard?.content === secondCard?.content) {
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
        }
      }, 500);
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
      }, 1000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 text-center">
      <div className="flex justify-between items-center mb-8">
        <Button variant="ghost" onClick={onExit} className="text-stone-500">
          <ArrowLeft className="w-4 h-4 mr-2" /> 離開遊戲
        </Button>
        <div className="flex gap-4">
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-2xl mx-auto w-full">
                {cards.map(card => (
                <motion.div
                    key={card.id}
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: card.isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="aspect-square perspective-1000"
                    onClick={() => handleCardClick(card.id)}
                >
                    <div className="relative w-full h-full text-center transition-transform duration-500 [transform-style:preserve-3d] cursor-pointer">
                        {/* Front (Hidden) */}
                        <div 
                            className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl shadow-sm flex items-center justify-center text-4xl bg-white border-2 border-emerald-100"
                        >
                            <span className="opacity-50 text-emerald-200 text-6xl">?</span>
                        </div>
                        
                        {/* Back (Revealed) */}
                        <div 
                            className={`absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl shadow-md flex items-center justify-center text-6xl border-4
                            ${card.isMatched ? 'bg-yellow-50 border-yellow-200' : 'bg-white border-emerald-400'}
                            `}
                            style={{ transform: "rotateY(180deg)" }}
                        >
                            {card.content}
                        </div>
                    </div>
                </motion.div>
                ))}
            </div>
         ) : (
             <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center space-y-6"
             >
                 <div className="w-32 h-32 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Trophy className="w-16 h-16 text-yellow-500" />
                 </div>
                 <h2 className="text-4xl font-bold text-stone-800">太棒了！挑戰成功！</h2>
                 <p className="text-xl text-stone-500">現在，轉身給爸爸媽媽一個大大的擊掌！✋</p>
                 <Button onClick={shuffleCards} size="lg" className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-6 mt-8">
                    再玩一次
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
                這不只是記憶遊戲。試著問孩子：「獅子在哪裡？」「它是什麼顏色的？」「它怎麼叫？」增加語言互動，比輸贏更重要喔。
            </p>
        </div>
      </div>
    </div>
  );
}
