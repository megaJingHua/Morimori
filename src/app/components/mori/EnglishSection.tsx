import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { Plane, ArrowLeft, Copy, Check, Lightbulb, GraduationCap, ChevronDown, BookOpen, Quote, Sparkles, HelpCircle, CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ENGLISH_ARTICLES, EnglishArticle, BreakdownSegment } from '../../data/englishArticles';
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { toast } from 'sonner';

export function EnglishSection() {
  return (
    <div className="max-w-5xl mx-auto py-8 md:py-12 px-4 sm:px-6">
      <Routes>
        <Route index element={<EnglishList />} />
        <Route path=":articleId" element={<EnglishArticleWrapper />} />
      </Routes>
    </div>
  );
}

function EnglishList() {
  return (
    <motion.div
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
              <Link to={article.id} key={article.id} className="block group">
                <Card 
                    className="border-stone-100 hover:border-sky-200 hover:shadow-xl transition-all duration-300 overflow-hidden rounded-3xl"
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
              </Link>
          ))}
      </div>
    </motion.div>
  );
}

function EnglishArticleWrapper() {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const article = ENGLISH_ARTICLES.find(a => a.id === articleId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!article) {
    return (
      <div className="text-center py-20">
        <h3 className="text-xl font-bold text-stone-800">Article not found</h3>
        <Button onClick={() => navigate('/english')} className="mt-4">Back to List</Button>
      </div>
    );
  }

  return <EnglishArticleView article={article} onBack={() => navigate('/english')} />;
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
        // If no sentence translations, fallback to old segment-only logic or just return text
        if (!article.sentenceTranslations) {
             return <div className="whitespace-pre-wrap leading-loose text-lg text-stone-700 font-serif">{text}</div>;
        }

        const matches: { start: number; end: number; text: string; segmentId?: string; translation: string }[] = [];
        
        // Helper to find matching segment for a sentence using loose matching
        const findSegmentId = (sentence: string) => {
            const cleanSentence = sentence.trim();
            
            // Pre-process: remove trailing punctuation from segment text for matching
            // Also normalize spaces to avoid issues with multiple spaces or newlines
            const normalize = (str: string) => str.trim().replace(/[.,;!?]+$/, '').replace(/\s+/g, ' ');

            // 1. Try exact or substring match with normalized text
            const exactOrSubstring = article.segments.find(s => {
                const segText = normalize(s.originalText);
                return cleanSentence.includes(segText) || segText.includes(cleanSentence);
            });
            if (exactOrSubstring) return exactOrSubstring.id;

            // 2. Fuzzy regex match
            for (const seg of article.segments) {
                try {
                    // Remove trailing punctuation before building regex
                    const segText = normalize(seg.originalText);
                    
                    // Escape special regex chars
                    const escapedSeg = segText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    
                    // Allow loose matching for spaces/insertions
                    // Replace spaces with pattern allowing for any content (up to 50 chars)
                    const patternStr = escapedSeg.replace(/\s+/g, '[\\s\\S]{1,50}'); 
                    const regex = new RegExp(patternStr, 'i');
                    
                    if (regex.test(cleanSentence)) {
                        return seg.id;
                    }
                } catch (e) {
                    console.warn('Regex matching failed for segment:', seg.id);
                }
            }
            
            return undefined;
        };
        
        // 2. Identify all sentences to be highlighted
        const sentences = Object.keys(article.sentenceTranslations);
        
        sentences.forEach(sentenceText => {
            const cleanSentence = sentenceText.trim();
            if (!cleanSentence) return;

            let searchPos = 0;
            // Find all occurrences
            while (true) {
                const idx = text.indexOf(cleanSentence, searchPos);
                if (idx === -1) break;
                
                // Check if this range is already covered
                const isOverlapping = matches.some(m => 
                    (idx >= m.start && idx < m.end) || 
                    (idx + cleanSentence.length > m.start && idx + cleanSentence.length <= m.end)
                );

                if (!isOverlapping) {
                    matches.push({
                        start: idx,
                        end: idx + cleanSentence.length,
                        text: cleanSentence,
                        segmentId: findSegmentId(cleanSentence),
                        translation: article.sentenceTranslations?.[sentenceText] || ''
                    });
                }
                
                searchPos = idx + cleanSentence.length;
            }
        });

        // 3. Sort matches by position
        matches.sort((a, b) => a.start - b.start);

        // 4. Build the result array
        const elements: React.ReactNode[] = [];
        let lastIndex = 0;

        matches.forEach((match, i) => {
            // Add text before the match
            if (match.start > lastIndex) {
                elements.push(<span key={`text-${i}`}>{text.substring(lastIndex, match.start)}</span>);
            }

            // Add the interactive sentence
            const isSegment = !!match.segmentId;
            
            elements.push(
                <Tooltip key={`tooltip-${i}`} delayDuration={0}>
                    <TooltipTrigger asChild>
                        <span 
                            onClick={(e) => {
                                if (isSegment && match.segmentId) {
                                    scrollToSegment(match.segmentId);
                                }
                            }}
                            className={`
                                cursor-pointer rounded-sm px-0.5 transition-all duration-200 decoration-clone
                                ${isSegment 
                                    ? 'bg-sky-50 text-sky-900 border-b-2 border-sky-200 hover:bg-sky-100 hover:border-sky-400' 
                                    : 'hover:bg-amber-50 hover:text-amber-900 border-b border-transparent hover:border-amber-200'}
                            `}
                        >
                            {match.text}
                        </span>
                    </TooltipTrigger>
                    <TooltipContent 
                        side="top" 
                        className="max-w-sm bg-stone-900/95 backdrop-blur-sm text-stone-50 p-4 rounded-xl shadow-xl border-none text-base z-50 animate-in fade-in zoom-in-95 duration-200"
                        sideOffset={8}
                    >
                        <p className="leading-relaxed font-sans tracking-wide">
                            {match.translation}
                        </p>
                        {isSegment && (
                            <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-sky-300 font-bold uppercase tracking-wider">
                                <span className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                                    重點解說
                                </span>
                                <span className="opacity-70">點擊查看詳情 ↓</span>
                            </div>
                        )}
                    </TooltipContent>
                </Tooltip>
            );

            lastIndex = match.end;
        });

        // Add remaining text
        if (lastIndex < text.length) {
            elements.push(<span key="text-end">{text.substring(lastIndex)}</span>);
        }

        return (
            <div className="whitespace-pre-wrap leading-loose text-lg text-stone-700 font-serif">
                {elements}
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

            {/* Featured Image */}
            <div className="rounded-[2rem] overflow-hidden shadow-sm border border-stone-100 bg-stone-50">
                <div className="relative">
                     <ImageWithFallback src={article.image} alt={article.title} className="w-full h-auto" />
                </div>
                {(article.imageCredit || article.imageSourceUrl) && (
                    <div className="px-6 py-3 text-xs text-stone-500 flex flex-wrap items-center justify-between gap-2 border-t border-stone-100">
                         <span className="flex items-center gap-2">
                            <span className="font-semibold text-stone-400">©</span>
                            {article.imageCredit}
                         </span>
                         {article.imageSourceUrl && (
                             <a href={article.imageSourceUrl} target="_blank" rel="noreferrer" className="text-sky-600 hover:text-sky-700 hover:underline flex items-center gap-1">
                                Source <ArrowRight className="w-3 h-3" />
                             </a>
                         )}
                    </div>
                )}
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
                    <span>小提示：電腦版懸停、手機版輕觸句子即可查看中文翻譯；有底線的句子可點擊查看詳細解說！</span>
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
