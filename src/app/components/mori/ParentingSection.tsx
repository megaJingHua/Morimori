import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Clock, Calendar, Heart, Share2, MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';

// Mock Data
const ARTICLES = [
  {
    id: 1,
    title: "為什麼孩子總是講不聽？其實他只是想被理解",
    summary: "當我們急著說教時，往往忽略了孩子眼中的世界。試著蹲下來，用他的高度看世界，你會發現...",
    author: "寶哥媽媽",
    date: "2024.12.26",
    readTime: "5 min",
    category: "情緒教養",
    image: "https://images.unsplash.com/photo-1659184619594-ef7e655b843e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJlbnQlMjBhbmQlMjBjaGlsZCUyMHJlYWRpbmclMjBib29rJTIwaGFwcHklMjB3YXJtfGVufDF8fHx8MTc2NjcxOTYzOXww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 2,
    title: "放下手機 10 分鐘，換來孩子一整天的笑臉",
    summary: "高品質的陪伴不在於時間長短，而在於「全心全意」。分享三個不需要道具的簡單親子互動...",
    author: "寶哥媽媽",
    date: "2024.12.20",
    readTime: "3 min",
    category: "親子互動",
    image: "https://images.unsplash.com/photo-1670234794408-030a53941f87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwcGxheWluZyUyMG1hdGNoaW5nJTIwZ2FtZSUyMGNhcmRzJTIwaGFwcHl8ZW58MXx8fHwxNzY2NzE5NjM4fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 3,
    title: "工程師爸爸的觀察：孩子的邏輯其實比我們強",
    summary: "別小看孩子的「為什麼」，那是最純粹的邏輯思考。如何保護孩子的好奇心，而不是用標準答案扼殺它...",
    author: "森森爸",
    date: "2024.12.15",
    readTime: "8 min",
    category: "邏輯思考",
    image: "https://images.unsplash.com/photo-1608682285597-156feb50eb4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwaG9tZSUyMG9mZmljZSUyMHdvcmtzcGFjZSUyMGNsZWFufGVufDF8fHx8MTc2NjcxOTYzOXww&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

export function ParentingSection() {
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);

  const selectedArticle = ARTICLES.find(a => a.id === selectedArticleId);

  if (selectedArticleId && selectedArticle) {
    return (
      <ArticleDetail 
        article={selectedArticle} 
        onBack={() => setSelectedArticleId(null)} 
      />
    );
  }

  return (
    <div className="space-y-8 py-8">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl font-bold text-stone-800">親子文章</h2>
        <p className="text-stone-500 max-w-2xl mx-auto">
          這裡不教你如何成為完美父母，只分享那些讓我們心頭一暖的時刻。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ARTICLES.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className="h-full cursor-pointer hover:shadow-xl transition-all duration-300 group border-stone-100 overflow-hidden bg-white"
              onClick={() => setSelectedArticleId(article.id)}
            >
              <div className="aspect-video relative overflow-hidden">
                <ImageWithFallback 
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-stone-700 hover:bg-white backdrop-blur-sm">
                    {article.category}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center text-xs text-stone-400 space-x-4">
                    <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {article.date}</span>
                    <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {article.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-stone-800 leading-snug group-hover:text-emerald-700 transition-colors">
                  {article.title}
                </h3>
                <p className="text-stone-500 text-sm line-clamp-2 leading-relaxed">
                  {article.summary}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-stone-50">
                    <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                            <AvatarImage src={`https://api.dicebear.com/7.x/micah/svg?seed=${article.author}`} />
                            <AvatarFallback>{article.author[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium text-stone-600">{article.author}</span>
                    </div>
                    <span className="text-xs text-emerald-600 font-medium">閱讀更多</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ArticleDetail({ article, onBack }: { article: typeof ARTICLES[0], onBack: () => void }) {
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

      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-stone-100">
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
            <div className="flex items-center justify-between text-stone-500 text-sm border-b border-stone-100 pb-8">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                            <AvatarImage src={`https://api.dicebear.com/7.x/micah/svg?seed=${article.author}`} />
                            <AvatarFallback>{article.author[0]}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-stone-700">{article.author}</span>
                    </div>
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                </div>
                <div className="flex gap-4">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-pink-50 hover:text-pink-500">
                        <Heart className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-emerald-50 hover:text-emerald-500">
                        <Share2 className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </header>

        {/* Content */}
        <article className="prose prose-stone prose-lg max-w-none mb-12">
            <p className="lead text-xl text-stone-600 italic border-l-4 border-emerald-200 pl-4 py-2 bg-emerald-50/50 rounded-r-lg mb-8">
                「{article.summary}」
            </p>
            
            <p>
                那天，孩子在客廳裡大哭大鬧，玩具散落一地。我原本想大聲喝斥：「為什麼又不收玩具！」，但話到嘴邊，我深呼吸了一口氣。我看著他脹紅的小臉，突然意識到，他不是不想收，他是累了，或者是挫折了。
            </p>
            <p>
                我們常常以大人的邏輯去判斷孩子的行為：「玩完就要收」這是效率，是規矩。但在孩子的世界裡，那個剛蓋好的城堡是他心血的結晶，拆掉它等於否定了他的努力。
            </p>
            
            <h3 className="text-xl font-bold text-stone-800 mt-8 mb-4">試著蹲下來</h3>
            <p>
                當我蹲下來，視線與他平行時，整個世界變得不一樣了。那些巨大的家具、高聳的大人，真的會讓人感到壓迫。我輕輕抱住他，說：「我知道你不想拆掉城堡，因為它很漂亮，對不對？」
            </p>
            <p>
                神奇的是，哭聲漸漸小了。他點點頭，眼淚還掛在睫毛上。
            </p>

            <h3 className="text-xl font-bold text-stone-800 mt-8 mb-4">邏輯是冰冷的，愛是溫暖的</h3>
            <p>
                森森邏輯的核心，不只是訓練孩子的思考邏輯，更是要訓練父母「理解」的邏輯。當我們理解了行為背後的原因，教養就不再是角力，而是引導。
            </p>
        </article>

        {/* Author's Note */}
        <div className="bg-orange-50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
            <div className="shrink-0">
                 <Avatar className="w-16 h-16 border-4 border-white shadow-sm">
                    <AvatarImage src={`https://api.dicebear.com/7.x/micah/svg?seed=${article.author}`} />
                    <AvatarFallback>{article.author[0]}</AvatarFallback>
                </Avatar>
            </div>
            <div className="space-y-2">
                <h4 className="font-bold text-stone-800 flex items-center gap-2">
                    作者心情小語 <MessageCircle className="w-4 h-4 text-orange-400" />
                </h4>
                <p className="text-stone-600 leading-relaxed italic">
                    寫這篇的時候，其實我自己昨天才剛吼完小孩（笑）。育兒就是這樣，我們都在跌跌撞撞中學習。你不孤單，我們一起慢慢來。
                </p>
            </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center p-8 border-t border-dashed border-stone-200">
            <p className="text-stone-500 mb-6">喜歡這篇文章嗎？也許你的朋友也需要一點溫柔的安慰。</p>
            <Button className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg shadow-lg shadow-emerald-200/50 transition-all hover:scale-105">
                分享給也在育兒森林迷路的朋友
            </Button>
        </div>
      </div>
    </motion.div>
  );
}
