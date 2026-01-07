import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plane, ArrowLeft, Copy, Check, Lightbulb, GraduationCap, ChevronDown, BookOpen, Quote, Sparkles, HelpCircle, CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ENGLISH_ARTICLES, EnglishArticle, BreakdownSegment } from '../../data/englishArticles';
import { toast } from 'sonner';

export function EnglishSection() {
  const [selectedArticle, setSelectedArticle] = useState<EnglishArticle | null>(null);

  const handleArticleClick = (article: EnglishArticle) => {
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-5xl mx-auto py-8 md:py-12 px-4 sm:px-6">
      <AnimatePresence mode="wait">
        {!selectedArticle ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3 mb-8">
               <div className="p-3 bg-sky-600 rounded-2xl shadow-lg shadow-sky-200">
                  <Plane className="w-8 h-8 text-white" />
               </div>
               <div>
                  <h2 className="text-3xl font-bold text-stone-800 tracking-tight">航空英文</h2>
                  <p className="text-stone-500 text-sm">Aviation English with Mega</p>
               </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {ENGLISH_ARTICLES.map((article) => (
                    <Card 
                        key={article.id}
                        className="group cursor-pointer border-stone-100 hover:border-sky-200 hover:shadow-xl transition-all duration-300 overflow-hidden rounded-3xl"
                        onClick={() => handleArticleClick(article)}
                    >
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3 h-56 md:h-auto relative overflow-hidden">
                                <ImageWithFallback src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-r" />
                            </div>
                            <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                                <div className="flex items-center gap-2 mb-3 text-xs font-bold tracking-wider text-sky-600 uppercase">
                                    <Badge variant="secondary" className="bg-sky-50 text-sky-700 hover:bg-sky-100 border-sky-100">Latest Article</Badge>
                                    <span>•</span>
                                    <span>{article.source}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-stone-800 mb-3 group-hover:text-sky-700 transition-colors leading-tight">
                                    {article.title}
                                </h3>
                                <div className="flex items-center text-stone-400 text-sm mt-auto">
                                    <span>{article.date}</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
          </motion.div>
        ) : (
          <EnglishArticleView key="article-view" article={selectedArticle} onBack={() => setSelectedArticle(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function EnglishArticleView({ article, onBack }: { article: EnglishArticle; onBack: () => void }) {
    const breakdownRefs = useRef<{[key: string]: HTMLDivElement | null}>({});

    const scrollToSegment = (id: string) => {
        const element = breakdownRefs.current[id];
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Add a temporary highlight effect
            element.classList.add('ring-2', 'ring-sky-400', 'ring-offset-4');
            setTimeout(() => {
                element.classList.remove('ring-2', 'ring-sky-400', 'ring-offset-4');
            }, 2000);
        }
    };

    // Helper to render text with interactive highlights
    const renderInteractiveText = () => {
        let text = article.fullText;
        const parts: { text: string; segmentId?: string }[] = [];
        
        // This is a simplified approach. In a real app, we'd need more robust matching 
        // to handle overlapping or identical sentences.
        // We assume segments are unique enough.
        
        let remainingText = text;
        const segmentsToProcess = [...article.segments].sort((a, b) => text.indexOf(a.originalText) - text.indexOf(b.originalText));

        let lastIndex = 0;
        
        segmentsToProcess.forEach(seg => {
            const index = text.indexOf(seg.originalText, lastIndex);
            if (index !== -1) {
                // Add text before the segment
                if (index > lastIndex) {
                    parts.push({ text: text.substring(lastIndex, index) });
                }
                // Add the segment
                parts.push({ text: seg.originalText, segmentId: seg.id });
                lastIndex = index + seg.originalText.length;
            }
        });

        // Add remaining text
        if (lastIndex < text.length) {
             parts.push({ text: text.substring(lastIndex) });
        }

        return (
            <div className="whitespace-pre-wrap leading-loose text-lg text-stone-700 font-serif">
                {parts.map((part, i) => (
                    part.segmentId ? (
                        <span 
                            key={i}
                            onClick={() => part.segmentId && scrollToSegment(part.segmentId)}
                            className="bg-sky-50 text-sky-900 border-b-2 border-sky-200 cursor-pointer hover:bg-sky-100 hover:border-sky-400 transition-colors px-1 rounded-sm"
                            title="點擊查看解說"
                        >
                            {part.text}
                        </span>
                    ) : (
                        <span key={i}>{part.text}</span>
                    )
                ))}
            </div>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-12"
        >
            {/* Nav & Header */}
            <div>
                <Button variant="ghost" onClick={onBack} className="pl-0 hover:bg-transparent text-stone-500 hover:text-stone-900 mb-6">
                    <ArrowLeft className="w-5 h-5 mr-2" /> 返回列表
                </Button>
                
                <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4 leading-tight">
                    {article.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-stone-500">
                    <Badge variant="outline" className="border-stone-200 text-stone-600 font-normal">
                        {article.source}
                    </Badge>
                    <span>{article.date}</span>
                    <span className="text-stone-300">|</span>
                    <span className="italic">{article.copyright}</span>
                </div>
            </div>

            {/* 1. Original Reading Area */}
            <section className="md:bg-white md:rounded-[2rem] md:p-10 md:shadow-sm md:border md:border-stone-100">
                <div className="flex items-center gap-2 mb-6 text-stone-400 text-xs font-bold uppercase tracking-wider">
                    <BookOpen className="w-4 h-4" />
                    Original Article
                </div>
                {renderInteractiveText()}
                <div className="mt-6 text-xs text-center text-stone-400 flex items-center justify-center gap-2">
                    <Lightbulb className="w-3 h-3" />
                    <span>小提示：點擊上方有底線的句子，可以查看詳細解說喔！</span>
                </div>
            </section>

            {/* 2. Breakdown Section */}
            <section className="space-y-8">
                <div className="flex items-center gap-2 text-xl font-bold text-stone-800">
                    <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm">2</span>
                    文章拆解 (Breakdown)
                </div>
                
                <div className="grid gap-8">
                    {article.segments.map((segment) => (
                        <div 
                            key={segment.id} 
                            ref={el => breakdownRefs.current[segment.id] = el}
                            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100 scroll-mt-24 transition-all duration-500"
                        >
                            {/* Original Sentence Card */}
                            <div className="bg-stone-50 p-4 md:p-8 border-b border-stone-100">
                                <div className="flex gap-4">
                                    <div className="shrink-0 mt-1">
                                        <Quote className="w-6 h-6 text-stone-300 fill-stone-100" />
                                    </div>
                                    <p className="text-lg md:text-xl font-serif text-stone-800 leading-relaxed">
                                        {segment.originalText.split(segment.highlightedPhrase || '').map((part, i, arr) => (
                                            <span key={i}>
                                                {part}
                                                {i < arr.length - 1 && (
                                                    <span className="font-bold text-sky-700 bg-sky-50 px-1 rounded mx-0.5 decoration-2 underline decoration-sky-300 underline-offset-4">
                                                        {segment.highlightedPhrase}
                                                    </span>
                                                )}
                                            </span>
                                        ))}
                                    </p>
                                </div>
                            </div>

                            {/* Explanation Card */}
                            <div className="p-4 md:p-8">
                                <div className="mb-6">
                                    <div className="inline-flex items-center gap-2 text-emerald-700 font-bold mb-3 bg-emerald-50 px-3 py-1 rounded-full text-sm">
                                        <span className="text-lg">🐰</span> 森森拆解
                                    </div>
                                    <p className="text-stone-600 leading-loose">
                                        {segment.chineseExplanation}
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    {segment.keyVocabulary.map((vocab, idx) => (
                                        <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 text-sm border-t border-stone-50 pt-3">
                                            <span className="font-bold text-stone-800 text-base">{vocab.word}</span>
                                            <span className="text-stone-500">{vocab.definition}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. Patterns Section */}
            <section className="space-y-6">
                 <div className="flex items-center gap-2 text-xl font-bold text-stone-800">
                    <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-sm">3</span>
                    可套用英文句型 (Patterns)
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                    {article.patterns.map((pattern) => (
                        <PatternCard key={pattern.id} pattern={pattern} />
                    ))}
                </div>
            </section>

            {/* 4. Quiz Section */}
            <section className="bg-gradient-to-br from-indigo-50 to-white rounded-[2.5rem] p-4 md:p-8 border border-indigo-100">
                <div className="flex items-center gap-2 text-xl font-bold text-indigo-900 mb-6">
                    <span className="text-2xl">🐰</span>
                    森森小任務
                </div>
                
                <div className="space-y-6">
                    {article.quiz.map(q => (
                        <QuizCard key={q.id} quiz={q} />
                    ))}
                </div>
            </section>

             <div className="text-center text-xs text-stone-300 pt-8 pb-4">
                This lesson is for educational and non-commercial language learning purposes.
            </div>
        </motion.div>
    );
}

function PatternCard({ pattern }: { pattern: { structure: string, example: string } }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        const textToCopy = `句型：${pattern.structure}\n例句：${pattern.example}`;
        
        try {
            await navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            toast.success("已複製句型！");
        } catch (err) {
            // Fallback for environments where Clipboard API is blocked
            try {
                const textArea = document.createElement("textarea");
                textArea.value = textToCopy;
                textArea.style.position = "fixed";
                textArea.style.left = "-9999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                
                const successful = document.execCommand('copy');
                document.body.removeChild(textArea);
                
                if (successful) {
                    setCopied(true);
                    toast.success("已複製句型！");
                } else {
                    throw new Error("Copy command failed");
                }
            } catch (fallbackErr) {
                console.error("Copy failed:", fallbackErr);
                toast.error("複製失敗，請手動複製");
            }
        }
        
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Card className="border-amber-100 bg-amber-50/30 hover:bg-amber-50 transition-colors">
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">
                        🌰 句型
                    </Badge>
                    <Button 
                        size="sm" 
                        variant="ghost" 
                        className={`h-8 px-2 text-amber-600 hover:text-amber-700 hover:bg-amber-100 ${copied ? 'bg-amber-100' : ''}`}
                        onClick={handleCopy}
                    >
                        {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                        {copied ? 'Copied' : 'Copy'}
                    </Button>
                </div>
                <div className="space-y-4">
                    <div className="font-bold text-stone-800 font-mono text-sm bg-white p-2 rounded border border-amber-100/50">
                        {pattern.structure}
                    </div>
                    <div>
                        <div className="text-xs text-stone-400 mb-1">例句：</div>
                        <p className="text-stone-600 text-sm leading-relaxed">
                            {pattern.example}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function QuizCard({ quiz }: { quiz: { question: string, answer: string, feedback: string } }) {
    const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect' | 'surrender'>('idle');
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const checkAnswer = () => {
        if (!inputValue.trim()) return;
        
        const isCorrect = inputValue.trim().toLowerCase() === quiz.answer.toLowerCase();
        setStatus(isCorrect ? 'correct' : 'incorrect');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    };

    const reset = () => {
        setStatus('idle');
        setInputValue('');
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    return (
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-indigo-100">
            <h4 className="font-medium text-stone-800 text-lg mb-6 leading-relaxed flex flex-wrap items-center gap-2">
                {quiz.question.split(/_+/).map((part, i, arr) => (
                    <span key={i} className="flex items-center">
                        <span>{part}</span>
                        {i < arr.length - 1 && (
                            <span className="relative inline-block mx-1">
                                {status === 'idle' || status === 'incorrect' ? (
                                    <Input 
                                        ref={inputRef}
                                        value={inputValue}
                                        onChange={(e) => {
                                            setInputValue(e.target.value);
                                            if (status === 'incorrect') setStatus('idle');
                                        }}
                                        onKeyDown={handleKeyDown}
                                        className={`w-32 h-8 inline-flex text-center font-bold border-b-2 border-x-0 border-t-0 rounded-none px-1 focus-visible:ring-0 focus-visible:border-indigo-500 bg-indigo-50/50 
                                            ${status === 'incorrect' ? 'border-red-400 text-red-600 bg-red-50' : 'border-indigo-200 text-indigo-700'}`}
                                        placeholder="?"
                                        autoComplete="off"
                                    />
                                ) : (
                                    <span className={`inline-block border-b-2 px-2 font-bold ${status === 'correct' ? 'text-emerald-600 border-emerald-500' : 'text-indigo-600 border-indigo-500'}`}>
                                        {status === 'correct' ? inputValue : quiz.answer}
                                    </span>
                                )}
                            </span>
                        )}
                    </span>
                ))}
            </h4>

            <div className="flex flex-wrap gap-3 items-center">
                {status === 'idle' && (
                    <>
                        <Button 
                            onClick={checkAnswer}
                            disabled={!inputValue.trim()}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-indigo-100 shadow-lg"
                        >
                            送出答案 <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                        <Button 
                            variant="ghost" 
                            onClick={() => setStatus('surrender')}
                            className="text-stone-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl ml-2"
                        >
                            <HelpCircle className="w-4 h-4 mr-2" />
                            直接看答案
                        </Button>
                    </>
                )}

                {status === 'incorrect' && (
                    <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left-2">
                         <span className="text-red-500 flex items-center gap-1 font-medium text-sm bg-red-50 px-3 py-1.5 rounded-full">
                            <XCircle className="w-4 h-4" /> 
                            再試一次，加油！
                        </span>
                        <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setStatus('surrender')}
                            className="text-stone-400 hover:text-indigo-600 text-xs"
                        >
                            <HelpCircle className="w-3 h-3 mr-1" />
                            我看答案好了
                        </Button>
                    </div>
                )}
                
                {(status === 'correct' || status === 'surrender') && (
                    <Button 
                        variant="ghost" 
                        onClick={reset}
                        className="text-stone-400 hover:text-stone-600 rounded-xl"
                    >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        重做題目
                    </Button>
                )}
            </div>

            {/* Feedback Section */}
            {(status === 'correct' || status === 'surrender') && (
                <motion.div 
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                    className={`rounded-xl p-5 border ${status === 'correct' ? 'bg-emerald-50 border-emerald-100' : 'bg-indigo-50 border-indigo-100'}`}
                >
                    <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${status === 'correct' ? 'bg-emerald-100 text-emerald-600' : 'bg-indigo-100 text-indigo-600'}`}>
                            {status === 'correct' ? <CheckCircle2 className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                        </div>
                        <div>
                            <div className={`font-bold mb-1 ${status === 'correct' ? 'text-emerald-800' : 'text-indigo-900'}`}>
                                {status === 'correct' ? '答對了！太棒了！🎉' : `正確答案是：${quiz.answer}`}
                            </div>
                            <p className={`${status === 'correct' ? 'text-emerald-700/80' : 'text-indigo-800/80'} text-sm leading-relaxed`}>
                                {quiz.feedback}
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
