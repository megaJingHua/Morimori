import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, RefreshCw, Star, Delete, Check, Lightbulb, User, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
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

// Emojis for counting
const COUNTING_EMOJIS = ["🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🍒", "🍑", "🍍", "🥥", "🥝", "🍅", "🥑"];

interface MathProblem {
    num1: number;
    num2: number;
    operator: '+' | '-';
    answer: number;
    emoji: string;
}

export function MathGarden({ onExit }: { onExit: () => void }) {
    const [problem, setProblem] = useState<MathProblem | null>(null);
    const [userAnswer, setUserAnswer] = useState<string>("");
    const [score, setScore] = useState(0);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null); // null = answering, true = correct, false = wrong
    const [streak, setStreak] = useState(0);
    const { startTimer, stopTimer, recordGame } = useGameTime();
    const startTimeRef = useRef(Date.now());

    useEffect(() => {
        startTimer();
        generateProblem();
        return () => stopTimer();
    }, []);

    const generateProblem = () => {
        const isAddition = Math.random() > 0.5;
        let n1, n2, ans;
        const emoji = COUNTING_EMOJIS[Math.floor(Math.random() * COUNTING_EMOJIS.length)];

        if (isAddition) {
            // Addition: two single digits (0-9). Max sum 18.
            n1 = Math.floor(Math.random() * 10);
            n2 = Math.floor(Math.random() * 10);
            ans = n1 + n2;
        } else {
            // Subtraction: Answer must be >= 0.
            n1 = Math.floor(Math.random() * 10); // 0-9
            n2 = Math.floor(Math.random() * (n1 + 1)); // 0 to n1
            ans = n1 - n2;
        }

        setProblem({
            num1: n1,
            num2: n2,
            operator: isAddition ? '+' : '-',
            answer: ans,
            emoji: emoji
        });
        setUserAnswer("");
        setIsCorrect(null);
    };

    const handleNumberClick = (num: number) => {
        if (isCorrect === true) return; // Don't allow input during success animation
        if (userAnswer.length >= 2) return; // Max 2 digits
        setUserAnswer(prev => prev + num.toString());
    };

    const handleDelete = () => {
        setUserAnswer(prev => prev.slice(0, -1));
    };

    const checkAnswer = () => {
        if (!problem) return;
        const val = parseInt(userAnswer);
        
        if (isNaN(val)) return;

        if (val === problem.answer) {
            // Correct
            setIsCorrect(true);
            setScore(s => s + 10);
            setStreak(s => s + 1);
            
            // Audio feedback could go here
            
            // Wait then next problem
            setTimeout(() => {
                generateProblem();
            }, 1500);
        } else {
            // Wrong
            setIsCorrect(false);
            setStreak(0);
            toast.error("再試試看喔！加油！");
            setUserAnswer("");
            
            // Reset error state after shake
            setTimeout(() => {
                setIsCorrect(null);
            }, 1000);
        }
    };

    const handleFinish = () => {
        const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
        recordGame({
            gameId: 'math-garden',
            gameType: '森森數學園',
            score: `得分: ${score} / 連對: ${streak}`,
            timePlayed: duration
        });
        onExit();
    };

    if (!problem) return null;

    // Helper to render emoji groups
    const renderEmojis = (count: number, emoji: string, isSubtractionTarget: boolean = false) => {
        return (
            <div className="flex flex-wrap gap-1 justify-center max-w-[120px]">
                {Array.from({ length: count }).map((_, i) => (
                    <motion.span 
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`text-2xl md:text-3xl select-none ${isSubtractionTarget ? 'opacity-30 grayscale' : ''}`}
                    >
                        {emoji}
                    </motion.span>
                ))}
                {count === 0 && <span className="w-8 h-8 md:w-10 md:h-10 border-2 border-dashed border-stone-200 rounded-full flex items-center justify-center text-stone-300 text-xs">0</span>}
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-50 bg-[#F2FCE2] flex flex-col select-none overflow-hidden touch-none font-sans">
             {/* Background Decoration */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ 
                     backgroundImage: `radial-gradient(circle at 20px 20px, #10b981 2px, transparent 0)`,
                     backgroundSize: '40px 40px' 
                 }} 
            />

            {/* Header */}
            <div className="flex-none px-4 py-3 bg-white/80 backdrop-blur-md shadow-sm flex justify-between items-center z-20">
                <Button variant="ghost" onClick={handleFinish} className="text-stone-500 hover:bg-stone-100 rounded-xl">
                    <ArrowLeft className="w-5 h-5 mr-1" /> 結束
                </Button>
                
                <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 text-base px-3 py-1 gap-1">
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        {score}
                    </Badge>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-4 w-full max-w-lg mx-auto relative">
                
                {/* Question Area */}
                <Card className="w-full bg-white/90 backdrop-blur-sm border-2 border-emerald-100 shadow-xl rounded-[2rem] overflow-hidden relative">
                    {isCorrect === true && (
                         <div className="absolute inset-0 z-10 bg-emerald-500/10 flex items-center justify-center backdrop-blur-[2px]">
                            <motion.div 
                                initial={{ scale: 0, rotate: -45 }}
                                animate={{ scale: 1.5, rotate: 0 }}
                                className="bg-white rounded-full p-6 shadow-2xl"
                            >
                                <Check className="w-20 h-20 text-emerald-500 stroke-[4]" />
                            </motion.div>
                         </div>
                    )}

                    <div className="p-6 md:p-8 space-y-6">
                        {/* Visual Representation */}
                        <div className="min-h-[100px] flex items-center justify-center gap-2 md:gap-4 bg-emerald-50/50 rounded-2xl p-4">
                            {problem.operator === '+' ? (
                                <>
                                    {renderEmojis(problem.num1, problem.emoji)}
                                    <span className="text-stone-400 font-bold text-xl">+</span>
                                    {renderEmojis(problem.num2, problem.emoji)}
                                </>
                            ) : (
                                <>
                                    {/* Subtraction: Show Total items, but fade out the ones being taken away? 
                                        Or Show Group 1 - Group 2. 
                                        Let's do Group 1, and visually dim 'num2' amount of them?
                                        Actually, strictly showing "Group 1 - Group 2" is clearer for the equation format.
                                    */}
                                    {renderEmojis(problem.num1, problem.emoji)}
                                    <span className="text-stone-400 font-bold text-xl">-</span>
                                    {renderEmojis(problem.num2, problem.emoji, true)}
                                </>
                            )}
                        </div>

                        {/* Numerical Equation */}
                        <div className="flex items-center justify-center text-5xl md:text-7xl font-bold text-stone-700 gap-4 md:gap-6 font-mono">
                            <motion.span 
                                key={`n1-${problem.num1}`}
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                            >
                                {problem.num1}
                            </motion.span>
                            <span className="text-emerald-500">{problem.operator}</span>
                            <motion.span 
                                key={`n2-${problem.num2}`}
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                {problem.num2}
                            </motion.span>
                            <span className="text-stone-300">=</span>
                            <div className={`
                                min-w-[1.5em] h-[1.2em] border-b-4 border-dashed text-center flex items-center justify-center
                                ${isCorrect === false ? 'border-red-400 text-red-500 animate-shake' : 'border-stone-300 text-emerald-600'}
                                ${isCorrect === true ? 'border-emerald-500' : ''}
                            `}>
                                {userAnswer}
                                {userAnswer === "" && <span className="opacity-0">?</span>}
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Keypad */}
                <div className="mt-8 w-full max-w-sm grid grid-cols-3 gap-3">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <Button
                            key={num}
                            onClick={() => handleNumberClick(num)}
                            className="h-16 md:h-20 text-3xl font-bold rounded-2xl bg-white text-stone-700 hover:bg-emerald-50 hover:text-emerald-600 border-b-4 border-stone-200 active:border-b-0 active:translate-y-1 transition-all shadow-sm"
                        >
                            {num}
                        </Button>
                    ))}
                    
                    <Button
                        onClick={handleDelete}
                        className="h-16 md:h-20 rounded-2xl bg-rose-50 text-rose-500 hover:bg-rose-100 border-b-4 border-rose-200 active:border-b-0 active:translate-y-1 transition-all shadow-sm"
                    >
                        <Delete className="w-8 h-8" />
                    </Button>
                    
                    <Button
                        onClick={() => handleNumberClick(0)}
                        className="h-16 md:h-20 text-3xl font-bold rounded-2xl bg-white text-stone-700 hover:bg-emerald-50 hover:text-emerald-600 border-b-4 border-stone-200 active:border-b-0 active:translate-y-1 transition-all shadow-sm"
                    >
                        0
                    </Button>

                    <Button
                        onClick={checkAnswer}
                        disabled={userAnswer === "" || isCorrect === true}
                        className={`h-16 md:h-20 rounded-2xl border-b-4 active:border-b-0 active:translate-y-1 transition-all shadow-sm
                            ${userAnswer === "" 
                                ? 'bg-stone-100 text-stone-300 border-stone-200' 
                                : 'bg-emerald-500 text-white border-emerald-700 hover:bg-emerald-600'}
                        `}
                    >
                        {isCorrect === true ? <Check className="w-8 h-8" /> : "OK"}
                    </Button>
                </div>

                {/* Parent Tip */}
                 <div className="mt-6">
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
                                    引導孩子數數看上面的水果。如果是減法，可以說：「本來有5顆蘋果，吃掉了2顆（變灰色），還剩下幾顆呢？」
                                    <br/><br/>
                                    不用急著算對，建立數量的感覺比較重要喔！
                                </DialogDescription>
                                </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>

            </div>
        </div>
    );
}
