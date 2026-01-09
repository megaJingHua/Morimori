import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Heart, Share2, MessageCircle, Check, Star, Wind, Shield, HeartHandshake, Sparkles, Eye, Facebook, Link as LinkIcon, Instagram, Loader2, Bookmark } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { projectId, publicAnonKey } from "../../../../utils/supabase/info";
import { toast } from "sonner";
import { useAuth } from '../../context/AuthContext';
import { ARTICLES } from '../../data/articles';
import { ArticleDetail } from './ArticleDetail';

const authorAvatar = "/Morimori/assets/author-avatar.png";

export function ParentingSection() {
  return (
    <Routes>
      <Route index element={<ParentingList />} />
      <Route path=":articleId" element={<ParentingArticleWrapper />} />
    </Routes>
  );
}

function ParentingArticleWrapper() {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const { user, session } = useAuth();
  
  const articleIdNum = parseInt(articleId || '0', 10);
  const selectedArticle = ARTICLES.find(a => a.id === articleIdNum);

  const [readCount, setReadCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [collectionCount, setCollectionCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isCollected, setIsCollected] = useState(false);

  useEffect(() => {
    if (selectedArticle) {
       window.scrollTo({ top: 0, behavior: 'smooth' });
       // Fetch specific article data
       const fetchArticleData = async () => {
           try {
               // Record view
               const viewRes = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-92f3175c/articles/${articleIdNum}/view`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${publicAnonKey}` }
               });
               if (viewRes.ok) {
                   const data = await viewRes.json();
                   setReadCount(data.count);
               }

               // Get Like Count
               const likeRes = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-92f3175c/articles/${articleIdNum}/likes`, { // This endpoint might return all likes, need to check API or simpler: assume we got all counts in list and passed them? No, direct link access needs fetch.
                   // Actually the previous implementation fetched ALL counts.
                   // Let's just fetch all counts for simplicity as per previous code, or if possible specific. 
                   // The previous code used /articles/likes which returned a map.
                   // Let's assume we can rely on the previous bulk fetch logic or implement single fetch if available. 
                   // Since I can't easily change backend, I'll use the bulk endpoints to find my count.
                   headers: { 'Authorization': `Bearer ${publicAnonKey}` }
               });
               // Wait, the previous code fetched ALL counts. Let's do that for now.
           } catch (e) { console.error(e); }
       };
       fetchArticleData();
    }
  }, [articleIdNum, selectedArticle]);

  // We need to fetch counts and user status again because we are in a fresh component
  // Or we can lift state up, but Router separates components.
  // Let's re-implement the data fetching for single article or reuse the bulk fetch.
  // Re-using bulk fetch for simplicity.
  useEffect(() => {
      const fetchData = async () => {
          try {
            // Likes count
            const likeRes = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-92f3175c/articles/likes`, {
                headers: { 'Authorization': `Bearer ${publicAnonKey}` }
            });
            if (likeRes.ok) {
                const data = await likeRes.json();
                setLikeCount(data.counts[articleIdNum] || 0);
            }

            // Collection count
            const collRes = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-92f3175c/articles/collection-counts`, {
                headers: { 'Authorization': `Bearer ${publicAnonKey}` }
            });
            if (collRes.ok) {
                const data = await collRes.json();
                setCollectionCount(data.counts[articleIdNum] || 0);
            }

            // User status
            if (session?.access_token) {
                const userLikesRes = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-92f3175c/articles/user-likes`, {
                    headers: { 'Authorization': `Bearer ${publicAnonKey}`, 'X-Access-Token': session.access_token }
                });
                if (userLikesRes.ok) {
                    const data = await userLikesRes.json();
                    setIsLiked(data.likes.includes(articleIdNum.toString()));
                }

                const userCollRes = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-92f3175c/articles/user-collections`, {
                    headers: { 'Authorization': `Bearer ${publicAnonKey}`, 'X-Access-Token': session.access_token }
                });
                if (userCollRes.ok) {
                    const data = await userCollRes.json();
                    setIsCollected(data.collections.includes(articleIdNum.toString()));
                }
            }
          } catch(e) { console.error(e); }
      };
      fetchData();
  }, [articleIdNum, session]);


  const handleToggleLike = async () => {
      if (!user || !session) {
          toast.error("請先登入會員才能按讚喔！");
          return;
      }
      try {
          const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-92f3175c/articles/${articleIdNum}/like`, {
              method: 'POST',
              headers: { 
                  'Authorization': `Bearer ${publicAnonKey}`,
                  'X-Access-Token': session.access_token,
                  'Content-Type': 'application/json'
              }
          });
          if (response.ok) {
              const data = await response.json();
              setLikeCount(data.count);
              setIsLiked(data.liked);
          }
      } catch (e) { console.error(e); }
  };

  const handleToggleCollection = async () => {
      if (!user || !session) {
          toast.error("請先登入會員才能收藏喔！");
          return;
      }
      try {
          const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-92f3175c/articles/${articleIdNum}/collect`, {
              method: 'POST',
              headers: { 
                  'Authorization': `Bearer ${publicAnonKey}`,
                  'X-Access-Token': session.access_token,
                  'Content-Type': 'application/json'
              }
          });
          if (response.ok) {
              const data = await response.json();
              setCollectionCount(data.count);
              setIsCollected(data.collected);
              if (data.collected) toast.success("已加入收藏！");
              else toast.info("已取消收藏");
          }
      } catch (e) { console.error(e); }
  };

  if (!selectedArticle) {
      return <div className="text-center py-20">文章不存在</div>;
  }

  return (
      <ArticleDetail 
        article={selectedArticle} 
        readCount={readCount}
        likeCount={likeCount}
        collectionCount={collectionCount}
        isLiked={isLiked}
        isCollected={isCollected}
        onToggleLike={handleToggleLike}
        onToggleCollection={handleToggleCollection}
        onBack={() => navigate('/parenting')} 
      />
  );
}

function ParentingList() {
  const { user, session } = useAuth();
  const [readCounts, setReadCounts] = useState<Record<string, number>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});
  const [userLikes, setUserLikes] = useState<string[]>([]);

  useEffect(() => {
    const fetchCounts = async () => {
        try {
            const readRes = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-92f3175c/articles/counts`, {
                 headers: { 'Authorization': `Bearer ${publicAnonKey}` }
            });
            if (readRes.ok) {
                const data = await readRes.json();
                setReadCounts(data.counts);
            }

            const likeRes = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-92f3175c/articles/likes`, {
                headers: { 'Authorization': `Bearer ${publicAnonKey}` }
            });
            if (likeRes.ok) {
                const data = await likeRes.json();
                setLikeCounts(data.counts);
            }
        } catch (e) { console.error(e); }
    }
    fetchCounts();
  }, []);

  useEffect(() => {
      const fetchUserLikes = async () => {
          if (!session?.access_token) return;
          try {
              const likesRes = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-92f3175c/articles/user-likes`, {
                  headers: { 
                      'Authorization': `Bearer ${publicAnonKey}`,
                      'X-Access-Token': session.access_token
                  }
              });
              if (likesRes.ok) {
                  const data = await likesRes.json();
                  setUserLikes(data.likes);
              }
          } catch (e) { console.error(e); }
      };
      if (user) fetchUserLikes();
      else setUserLikes([]);
  }, [user, session]);

  const featuredArticle = ARTICLES[0];
  const recentArticles = ARTICLES.slice(1);

  return (
    <div className="space-y-8 py-8">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl font-bold text-stone-800">親子文章</h2>
        <p className="text-stone-500 max-w-2xl mx-auto">
          這裡不教你如何成為完美父母，只分享那些讓我們心頭一暖的時刻。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Author Bio (Left) */}
        <div className="lg:col-span-4 xl:col-span-4 h-full">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-stone-100 h-full flex flex-col items-center text-center">
             <div className="w-48 h-48 relative overflow-hidden rounded-full shadow-inner mb-6">
              <ImageWithFallback 
                src={authorAvatar} 
                alt="森森邏輯工程師媽媽" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <h3 className="text-xl font-bold text-emerald-900 leading-snug mb-2">
               森森邏輯<br/>工程師媽媽 Mega
            </h3>
            <p className="text-xs text-stone-400 font-medium mb-6 uppercase tracking-wider">
              Engineer Mom
            </p>

            <div className="space-y-4 text-stone-600 leading-relaxed text-sm text-justify">
              <p>
                在程式碼與童言童語間來回切換。我不斷思考，如何在育兒路上為孩子建立足夠的安全感與明確的界線。
              </p>
              <p>
                平日熱愛在職場上挑戰與學習；下班後投入陪伴孩子。週末則一家三口盡情投入大自然。
              </p>
              <div className="bg-orange-50/50 p-4 rounded-xl text-stone-600 text-xs italic">
                <p>
                  文章皆由我與 AI 共同激盪，再依實戰經驗調整。不談大道理，只分享育兒生活中的點滴酸甜。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Article (Right) */}
        <div className="lg:col-span-8 xl:col-span-8 h-full">
            <Link to={`/parenting/${featuredArticle.id}`} className="block h-full">
                <Card 
                  className="h-full cursor-pointer hover:shadow-xl transition-all duration-300 group border-stone-100 overflow-hidden bg-white relative flex flex-col md:flex-row"
                >
                  <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
                    <ImageWithFallback 
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 absolute inset-0"
                    />
                    <div className="absolute top-4 left-4 z-10">
                        <Badge className="bg-white/90 text-stone-700 hover:bg-white backdrop-blur-sm shadow-sm text-sm py-1 px-3">
                            {featuredArticle.category}
                        </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center space-y-6 bg-gradient-to-br from-white to-emerald-50/30">
                     <div className="space-y-2">
                        <div className="flex items-center text-xs text-stone-400 space-x-3 mb-2">
                            <span className="flex items-center bg-stone-100 px-2 py-1 rounded-full"><Calendar className="w-3 h-3 mr-1" /> {featuredArticle.date}</span>
                            <span className="flex items-center bg-stone-100 px-2 py-1 rounded-full"><Clock className="w-3 h-3 mr-1" /> {featuredArticle.readTime}</span>
                            <span className="flex items-center bg-stone-100 px-2 py-1 rounded-full"><Eye className="w-3 h-3 mr-1" /> {readCounts[featuredArticle.id]?.toLocaleString() || 0}</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-stone-800 leading-tight group-hover:text-emerald-700 transition-colors">
                          {featuredArticle.title}
                        </h3>
                     </div>
                     
                     <p className="text-stone-500 text-base leading-relaxed">
                        {featuredArticle.summary}
                     </p>
                     
                     <div className="flex items-center justify-between pt-6 border-t border-stone-100">
                        <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8 border-2 border-white shadow-sm">
                                <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-base">
                                    👩‍💻
                                </div>
                            </Avatar>
                            <span className="text-sm font-medium text-stone-600">{featuredArticle.author}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center text-stone-400 text-xs">
                                <Heart className={userLikes.includes(featuredArticle.id.toString()) ? "w-4 h-4 mr-1 text-pink-500 fill-pink-500" : "w-4 h-4 mr-1"} />
                                {likeCounts[featuredArticle.id] || 0}
                            </div>
                            <Button variant="ghost" className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 p-0 h-auto font-medium group-hover:translate-x-1 transition-transform">
                                 閱讀更多 <ArrowLeft className="w-4 h-4 ml-1 rotate-180" />
                            </Button>
                        </div>
                     </div>
                  </CardContent>
                </Card>
            </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recentArticles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={`/parenting/${article.id}`} className="block h-full">
                <Card 
                  className="h-full cursor-pointer hover:shadow-xl transition-all duration-300 group border-stone-100 overflow-hidden bg-white"
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
                        <span className="flex items-center"><Eye className="w-3 h-3 mr-1" /> {readCounts[article.id]?.toLocaleString() || 0}</span>
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
                                <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-xs">
                                    👩‍💻
                                </div>
                            </Avatar>
                            <span className="text-xs font-medium text-stone-600">{article.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center text-stone-400 text-xs">
                                <Heart className={userLikes.includes(article.id.toString()) ? "w-3 h-3 mr-1 text-pink-500 fill-pink-500" : "w-3 h-3 mr-1"} />
                                {likeCounts[article.id] || 0}
                            </div>
                            <span className="text-xs text-emerald-600 font-medium">閱讀更多</span>
                        </div>
                    </div>
                  </CardContent>
                </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}