import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Calendar, Heart, Share2, Eye, Bookmark, Printer } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { toast } from 'sonner';

interface Article {
  id: number;
  title: string;
  summary: string;
  author: string;
  authorImage?: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  content: React.ReactNode;
}

interface ArticleDetailProps {
  article: Article;
  readCount: number;
  likeCount: number;
  collectionCount: number;
  isLiked: boolean;
  isCollected: boolean;
  onToggleLike: () => void;
  onToggleCollection: () => void;
  onBack: () => void;
}

export function ArticleDetail({ 
    article, 
    readCount, 
    likeCount, 
    collectionCount,
    isLiked, 
    isCollected,
    onToggleLike, 
    onToggleCollection, 
    onBack 
}: ArticleDetailProps) {
    
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('連結已複製到剪貼簿');
  };

  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="max-w-3xl mx-auto py-8 bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden"
    >
        {/* Header Image */}
        <div className="relative h-64 md:h-80 w-full">
            <ImageWithFallback src={article.image} alt={article.title} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4">
                <Button 
                    variant="secondary" 
                    onClick={onBack} 
                    className="bg-white/90 backdrop-blur-sm text-stone-600 hover:bg-white shadow-sm rounded-full"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    返回列表
                </Button>
            </div>
        </div>

        <div className="p-8 md:p-12 space-y-8">
            {/* Meta Info */}
            <div className="space-y-4 text-center">
                <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200 px-3 py-1 text-sm">
                    {article.category}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-stone-900 leading-tight">
                    {article.title}
                </h1>
                
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-stone-500">
                    <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {article.date}</span>
                    <span className="hidden md:inline">•</span>
                    <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {article.readTime}</span>
                    <span className="hidden md:inline">•</span>
                    <span className="flex items-center"><Eye className="w-4 h-4 mr-1" /> {readCount} 次閱讀</span>
                </div>
            </div>

            {/* Author */}
            <div className="flex items-center justify-center gap-3 py-6 border-y border-stone-100">
                <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                    <AvatarImage src={article.authorImage || `https://api.dicebear.com/7.x/micah/svg?seed=${article.author}`} />
                    <AvatarFallback>{article.author[0]}</AvatarFallback>
                </Avatar>
                <div className="text-left">
                    <p className="font-bold text-stone-800">{article.author}</p>
                    <p className="text-xs text-stone-400">工程師媽媽 / 育兒觀察者</p>
                </div>
            </div>

            {/* Content */}
            <div className="prose prose-stone prose-lg max-w-none leading-loose">
                {article.content}
            </div>

            {/* Actions */}
            <div className="pt-12 border-t border-stone-100">
                <div className="flex flex-col items-center gap-6">
                    <p className="text-stone-400 text-sm">喜歡這篇文章嗎？給個鼓勵吧！</p>
                    <div className="flex items-center gap-4">
                        <Button 
                            variant="outline" 
                            size="lg" 
                            className={`rounded-full h-12 px-6 gap-2 transition-all ${isLiked ? 'bg-pink-50 border-pink-200 text-pink-600' : 'hover:bg-pink-50 hover:text-pink-600'}`}
                            onClick={onToggleLike}
                        >
                            <Heart className={`w-5 h-5 ${isLiked ? 'fill-pink-600' : ''}`} />
                            <span>{likeCount}</span>
                        </Button>

                        <Button 
                            variant="outline" 
                            size="lg" 
                            className={`rounded-full h-12 px-6 gap-2 transition-all ${isCollected ? 'bg-amber-50 border-amber-200 text-amber-600' : 'hover:bg-amber-50 hover:text-amber-600'}`}
                            onClick={onToggleCollection}
                        >
                            <Bookmark className={`w-5 h-5 ${isCollected ? 'fill-amber-600' : ''}`} />
                            <span>收藏</span>
                        </Button>

                        <Button 
                            variant="outline" 
                            size="lg" 
                            className="rounded-full h-12 w-12 p-0 border-stone-200 text-stone-500 hover:bg-stone-50 hover:text-stone-800"
                            onClick={handleShare}
                        >
                            <Share2 className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
  );
}