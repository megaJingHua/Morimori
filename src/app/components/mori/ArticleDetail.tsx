import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Eye, Heart, Share2, Facebook, Link, Instagram, Bookmark } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { toast } from "sonner";
import { ARTICLES } from '../../data/articles';

export interface ArticleDetailProps {
    article: typeof ARTICLES[0];
    readCount: number;
    likeCount: number;
    collectionCount: number;
    isLiked: boolean;
    isCollected: boolean;
    onToggleLike: () => void;
    onToggleCollection: () => void;
    onBack: () => void;
}

export function ArticleDetail({ article, readCount, likeCount, collectionCount, isLiked, isCollected, onToggleLike, onToggleCollection, onBack }: ArticleDetailProps) {
  const copyToClipboard = (text: string) => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(() => {
              toast.success("連結已複製到剪貼簿！");
          }).catch((err) => {
              fallbackCopyTextToClipboard(text);
          });
      } else {
          fallbackCopyTextToClipboard(text);
      }
  };

  const fallbackCopyTextToClipboard = (text: string) => {
      try {
          const textArea = document.createElement("textarea");
          textArea.value = text;
          textArea.style.position = "fixed";
          textArea.style.left = "-9999px";
          textArea.style.top = "0";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          const successful = document.execCommand('copy');
          document.body.removeChild(textArea);
          if (successful) {
              toast.success("連結已複製到剪貼簿！");
          } else {
              toast.info(`請手動複製網址：${text}`);
          }
      } catch (err) {
          toast.info(`請手動複製網址：${text}`);
      }
  };

  const handleShare = (platform: 'facebook' | 'instagram' | 'copy') => {
      const url = window.location.href; 
      if (platform === 'facebook') {
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
      } else if (platform === 'copy' || platform === 'instagram') {
          copyToClipboard(url);
          if (platform === 'instagram') {
              setTimeout(() => toast.info("請開啟 Instagram 貼文或限時動態貼上連結"), 500);
          }
      }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-3xl mx-auto py-8"
    >
      <Button variant="ghost" onClick={onBack} className="mb-6 pl-0 hover:bg-transparent hover:text-emerald-600 text-stone-500">
        <ArrowLeft className="w-4 h-4 mr-2" /> 回到列表
      </Button>

      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-stone-100 mb-8">
        {/* Header */}
        <header className="space-y-6 mb-12">
            <div className="flex gap-2 mb-4">
                 <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
                    {article.category}
                  </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-stone-800 leading-tight">
                {article.title}
            </h1>
            <div className="flex items-center justify-between text-stone-500 text-sm border-b border-stone-100 pb-8 flex-wrap gap-4">
                <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                            <AvatarImage src={article.authorImage || `https://api.dicebear.com/7.x/micah/svg?seed=${article.author}`} />
                            <AvatarFallback>{article.author[0]}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-stone-700">{article.author}</span>
                    </div>
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                    <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {readCount.toLocaleString()} 人閱讀</span>
                </div>
                <div className="flex gap-2">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={onToggleLike}
                        className={`rounded-full hover:bg-pink-50 transition-colors ${isLiked ? 'text-pink-500' : 'text-stone-400 hover:text-pink-500'}`}
                        title="按讚"
                    >
                        <Heart className={`w-5 h-5 ${isLiked ? 'fill-pink-500' : ''}`} />
                        {likeCount > 0 && <span className="ml-1 text-xs font-medium">{likeCount}</span>}
                    </Button>

                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={onToggleCollection}
                        className={`rounded-full hover:bg-amber-50 transition-colors ${isCollected ? 'text-amber-500' : 'text-stone-400 hover:text-amber-500'}`}
                        title="收藏文章"
                    >
                        <Bookmark className={`w-5 h-5 ${isCollected ? 'fill-amber-500' : ''}`} />
                    </Button>
                </div>
            </div>
        </header>

        <article className="prose prose-stone max-w-none prose-p:text-stone-600 prose-headings:text-stone-800 prose-img:rounded-xl">
           {article.content}
        </article>
      </div>

      <div className="text-center">
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <Button size="lg" className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200 px-8">
                      <Share2 className="w-4 h-4 mr-2" />
                      分享給也在育兒森林迷路的朋友
                  </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                  <DropdownMenuItem onClick={() => handleShare('facebook')}>
                      <Facebook className="w-4 h-4 mr-2 text-blue-600" /> 分享至 Facebook
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleShare('instagram')}>
                      <Instagram className="w-4 h-4 mr-2 text-pink-600" /> 分享至 Instagram
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleShare('copy')}>
                      <Link className="w-4 h-4 mr-2 text-stone-600" /> 複製連結
                  </DropdownMenuItem>
              </DropdownMenuContent>
          </DropdownMenu>
      </div>
    </motion.div>
  );
}