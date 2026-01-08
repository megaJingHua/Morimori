import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, RefreshCw, Star, Check, Lightbulb, User, Sparkles, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { useGameTime } from '../../context/GameTimeContext';
import { toast } from 'sonner';
import { TimeUpOverlay } from './TimeUpOverlay';
import { playCorrectSound, playWrongSound, speakText } from '../../utils/gameAudio';

// Animal data for the game
const ANIMALS = [
    { emoji: "🐶", name: "狗狗", en: "Dog" }, { emoji: "🐱", name: "貓咪", en: "Cat" }, { emoji: "🐭", name: "老鼠", en: "Mouse" },
    { emoji: "🐹", name: "倉鼠", en: "Hamster" }, { emoji: "🐰", name: "兔子", en: "Rabbit" }, { emoji: "🦊", name: "狐狸", en: "Fox" },
    { emoji: "🐻", name: "熊熊", en: "Bear" }, { emoji: "🐼", name: "熊貓", en: "Panda" }, { emoji: "🐨", name: "無尾熊", en: "Koala" },
    { emoji: "🐯", name: "老虎", en: "Tiger" }, { emoji: "🦁", name: "獅子", en: "Lion" }, { emoji: "🐮", name: "牛牛", en: "Cow" },
    { emoji: "🐷", name: "豬豬", en: "Pig" }, { emoji: "🐸", name: "青蛙", en: "Frog" }, { emoji: "🐵", name: "猴子", en: "Monkey" },
    { emoji: "🐔", name: "公雞", en: "Rooster" }, { emoji: "🐧", name: "企鵝", en: "Penguin" }, { emoji: "🐦", name: "小鳥", en: "Bird" },
    { emoji: "🦆", name: "鴨子", en: "Duck" }, { emoji: "🦉", name: "貓頭鷹", en: "Owl" }, { emoji: "🐘", name: "大象", en: "Elephant" },
    { emoji: "🐙", name: "章魚", en: "Octopus" }, { emoji: "🐢", name: "烏龜", en: "Turtle" }, { emoji: "🐝", name: "蜜蜂", en: "Bee" },
    { emoji: "🦋", name: "蝴蝶", en: "Butterfly" }, { emoji: "🐌", name: "蝸牛", en: "Snail" }, { emoji: "🦒", name: "長頸鹿", en: "Giraffe" },
    { emoji: "🦓", name: "斑馬", en: "Zebra" }, { emoji: "🐊", name: "鱷魚", en: "Crocodile" }, { emoji: "🦈", name: "鯊魚", en: "Shark" }
];

interface Question {
    target: typeof ANIMALS[0];
    options: typeof ANIMALS[0][];
}

export function ShadowGame({ onExit }: { onExit: () => void }) {
    const [question, setQuestion] = useState<Question | null>(null);
    const [score, setScore] = useState(0);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null); // null = answering, true = correct, false = wrong
    const [streak, setStreak] = useState(0);
    const [wrongSelection, setWrongSelection] = useState<number | null>(null); // Index of wrong selection
    const { startTimer, stopTimer, recordGame, isTimeUp } = useGameTime();
    const startTimeRef = useRef(Date.now());

    useEffect(() => {
        startTimer();
        generateQuestion();
        return () => stopTimer();
    }, []);

    const generateQuestion = () => {
        // Pick a target
        const targetIndex = Math.floor(Math.random() * ANIMALS.length);
        const target = ANIMALS[targetIndex];

        // Pick 2 or 3 distractors (Total 3 or 4 options)
        const numOptions = 3; // Keep it simple for toddlers
        const options = [target];
        
        while (options.length < numOptions) {
            const random = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
            if (!options.find(o => o.emoji === random.emoji)) {
                options.push(random);
            }
        }

        // Shuffle options
        const shuffledOptions = options.sort(() => Math.random() - 0.5);

        setQuestion({
            target,
            options: shuffledOptions
        });
        setIsCorrect(null);
        setWrongSelection(null);
    };

    const handleOptionClick = (selected: typeof ANIMALS[0], index: number) => {
        if (!question || isCorrect !== null) return;

        if (selected.emoji === question.target.emoji) {
            // Correct
            setIsCorrect(true);
            setScore(s => s + 10);
            setStreak(s => s + 1);
            playCorrectSound();
            speakText(question.target.en);
            
            // Wait then next question
            setTimeout(() => {
                generateQuestion();
            }, 1500);
        } else {
            // Wrong
            playWrongSound();
            setIsCorrect(false);
            setWrongSelection(index);
            setStreak(0);
            
            // Reset error state
            setTimeout(() => {
                setIsCorrect(null);
                setWrongSelection(null);
            }, 500);
        }
    };

    const handleFinish = () => {
        const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
        recordGame({
            gameId: 'shadow-guess',
            gameType: '影子猜猜看',
            score: `得分: ${score} / 連對: ${streak}`,
            timePlayed: duration
        });
        onExit();
    };

    if (isTimeUp) {
        return <TimeUpOverlay onExit={onExit} />;
    }

    if (!question) return null;

    return (
        <div className="fixed inset-0 z-50 bg-[#FFF8E7] flex flex-col select-none overflow-hidden touch-none font-sans">
             {/* Background Decoration */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" 
                 style={{ 
                     backgroundImage: `radial-gradient(#FDBA74 2px, transparent 0)`,
                     backgroundSize: '30px 30px' 
                 }} 
            />

            {/* Header */}
            <div className="flex-none px-4 py-3 bg-white/80 backdrop-blur-md shadow-sm flex justify-between items-center z-20">
                <Button variant="ghost" onClick={handleFinish} className="text-stone-500 hover:bg-stone-100 rounded-xl">
                    <ArrowLeft className="w-5 h-5 mr-1" /> 結束
                </Button>
                
                <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-100 text-base px-3 py-1 gap-1">
                        <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                        {score}
                    </Badge>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-4 w-full max-w-lg mx-auto relative gap-8">
                
                {/* Question Area - The Shadow */}
                <div className="relative">
                    <Card className="w-64 h-64 md:w-80 md:h-80 bg-white/90 backdrop-blur-sm border-4 border-orange-100 shadow-xl rounded-[2rem] flex items-center justify-center relative overflow-hidden">
                        {isCorrect === true && (
                            <motion.div 
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="absolute top-2 right-2 z-20 bg-white rounded-full p-2 shadow-md"
                            >
                                <Check className="w-8 h-8 text-emerald-500 stroke-[4]" />
                            </motion.div>
                        )}

                        <motion.div
                            animate={isCorrect === true ? { 
                                filter: "brightness(1) blur(0px)",
                                scale: [1, 1.1, 1],
                                rotate: [0, -10, 10, 0]
                            } : { 
                                filter: "brightness(0) blur(0px)", // The Shadow Effect
                                scale: 1,
                                rotate: 0
                            }}
                            transition={{ duration: 0.5 }}
                            className="text-[10rem] md:text-[12rem] leading-none select-none transition-all duration-700 ease-in-out"
                            role="img"
                        >
                            {question.target.emoji}
                        </motion.div>

                        {isCorrect === true && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute bottom-4 bg-orange-100 text-orange-800 px-6 py-2 rounded-full font-bold text-lg flex flex-col items-center"
                            >
                                <span>{question.target.name}</span>
                                <span className="text-base font-medium font-sans">{question.target.en}</span>
                            </motion.div>
                        )}
                    </Card>
                    
                    {/* Floating hint text */}
                    <div className="absolute -top-12 left-0 right-0 text-center">
                        <span className="bg-white/80 px-4 py-2 rounded-full text-stone-600 font-bold shadow-sm border border-stone-100">
                            這是誰的影子呢？
                        </span>
                    </div>
                </div>

                {/* Options Area */}
                <div className="w-full grid grid-cols-3 gap-4">
                    {question.options.map((option, index) => (
                        <motion.button
                            key={index}
                            onClick={() => handleOptionClick(option, index)}
                            disabled={isCorrect === true}
                            whileTap={{ scale: 0.9 }}
                            animate={wrongSelection === index ? { x: [-10, 10, -10, 10, 0] } : {}}
                            className={`
                                aspect-square rounded-2xl border-b-4 transition-all shadow-sm flex flex-col items-center justify-center gap-2
                                ${isCorrect === true && option.emoji !== question.target.emoji ? 'opacity-50 grayscale' : ''}
                                ${wrongSelection === index ? 'border-red-300 bg-[#fee2e2]' : 'border-stone-200 hover:bg-orange-50 hover:border-orange-200 bg-white'}
                            `}
                        >
                            <span className="text-5xl md:text-6xl">{option.emoji}</span>
                        </motion.button>
                    ))}
                </div>

                {/* Parent Tip */}
                 <div className="mt-2">
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
                                    觀察形狀是閱讀文字的基礎。可以引導孩子觀察特徵：「你看，這個影子有長長的耳朵，是誰呢？」
                                </DialogDescription>
                                </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>

            </div>
        </div>
    );
}
