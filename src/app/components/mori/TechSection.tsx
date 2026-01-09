import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { Terminal, Code, Cpu, ArrowRight, ArrowLeft, Layers, Box, Database, Layout, Sparkles, BookOpen, User, Eye, Heart, Share2, Bookmark, Check } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import { toast } from 'sonner';
import { useAuth } from '../../context/AuthContext';
import { projectId, publicAnonKey } from "../../../../utils/supabase/info";
import { VUE3_ARTICLES, UIPATH_ARTICLES, TechArticle } from '../../data/techArticles';

export function TechSection() {
  return (
    <Routes>
      <Route index element={<TechLobby />} />
      <Route path=":articleId" element={<TechArticleWrapper />} />
    </Routes>
  );
}

function TechArticleWrapper() {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const { user, session } = useAuth();

  const selectedArticle = 
    UIPATH_ARTICLES.find(a => a.id === articleId) || 
    VUE3_ARTICLES.find(a => a.id === articleId);

  const [readCount, setReadCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [collectionCount, setCollectionCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isCollected, setIsCollected] = useState(false);

  useEffect(() => {
    if (selectedArticle) {
       window.scrollTo({ top: 0, behavior: 'smooth' });
       
       const fetchCounts = async () => {
           try {
               // Record View
               const viewRes = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-92f3175c/articles/${articleId}/view`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${publicAnonKey}` }
               });
               if (viewRes.ok) {
                   const data = await viewRes.json();
                   setReadCount(data.count);
               }

               // Counts (Bulk or specific, let's use bulk for simplicity as per previous pattern if specific endpoints aren't handy for single get)
               // Actually we can just use the toggle response or similar, but for initial load let's fetch all or assume 0
               // Better to fetch fresh data.
               // Re-using the logic from Lobby for consistency
               const likeRes = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-92f3175c/articles/likes`, {
                    headers: { 'Authorization': `Bearer ${publicAnonKey}` }
               });
               if (likeRes.ok) {
                   const data = await likeRes.json();
                   setLikeCount(data.counts[articleId!] || 0);
               }
               
               const collRes = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-92f3175c/articles/collection-counts`, {
                    headers: { 'Authorization': `Bearer ${publicAnonKey}` }
               });
               if (collRes.ok) {
                   const data = await collRes.json();
                   setCollectionCount(data.counts[articleId!] || 0);
               }

               if (session?.access_token) {
                    const userLikesRes = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-92f3175c/articles/user-likes`, {
                        headers: { 'Authorization': `Bearer ${publicAnonKey}`, 'X-Access-Token': session.access_token }
                    });
                    if (userLikesRes.ok) {
                        const data = await userLikesRes.json();
                        setIsLiked(data.likes.includes(articleId));
                    }
                    
                    const userCollRes = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-92f3175c/articles/user-collections`, {
                        headers: { 'Authorization': `Bearer ${publicAnonKey}`, 'X-Access-Token': session.access_token }
                    });
                    if (userCollRes.ok) {
                        const data = await userCollRes.json();
                        setIsCollected(data.collections.includes(articleId));
                    }
               }

           } catch (e) { console.error(e); }
       };
       fetchCounts();
    }
  }, [articleId, selectedArticle, session]);

  const handleToggleLike = async () => {
    if (!user || !session) {
        toast.error("請先登入會員才能按讚喔！");
        return;
    }
    try {
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-92f3175c/articles/${articleId}/like`, {
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
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-92f3175c/articles/${articleId}/collect`, {
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

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("已複製文章連結到剪貼簿！");
  };

  if (!selectedArticle) {
      return (
        <div className="max-w-5xl mx-auto py-12 px-4 text-center">
            <h2 className="text-2xl font-bold text-stone-800">找不到文章</h2>
            <Button onClick={() => navigate('/tech')} className="mt-4">返回列表</Button>
        </div>
      );
  }

  const isVue = selectedArticle.tags.includes('Vue3');

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6">
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:bg-white md:rounded-3xl md:p-8 md:shadow-sm md:border md:border-stone-100"
        >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
                <Button 
                    variant="ghost" 
                    onClick={() => navigate('/tech')}
                    className="pl-0 hover:pl-2 transition-all text-stone-500 hover:text-stone-800 hover:bg-transparent"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    返回列表
                </Button>
                <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
                        <Button 
                        variant="outline" 
                        size="sm" 
                        className={`gap-2 flex-1 sm:flex-none ${isCollected ? "text-yellow-600 border-yellow-200 bg-yellow-50" : ""}`} 
                        onClick={handleToggleCollection}
                        >
                        <Bookmark className={`w-4 h-4 ${isCollected ? "fill-yellow-600" : ""}`} />
                        <span className="whitespace-nowrap">{isCollected ? "已收藏" : "收藏"}</span>
                    </Button>
                    <Button 
                        variant="outline" 
                        size="sm" 
                        className={`gap-2 flex-1 sm:flex-none ${isLiked ? "text-rose-500 border-rose-200 bg-rose-50" : ""}`}
                        onClick={handleToggleLike}
                    >
                        <Heart className={`w-4 h-4 ${isLiked ? "fill-rose-500" : ""}`} />
                        {likeCount}
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 flex-1 sm:flex-none" onClick={handleShare}>
                        <Share2 className="w-4 h-4" />
                        分享
                    </Button>
                </div>
            </div>
            
            <div className="max-w-3xl mx-auto">
                <div className="mb-8 border-b border-stone-100 pb-8">
                    <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
                        <Badge className={`${!isVue ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                            {!isVue ? 'UiPath' : 'Vue3'}
                        </Badge>
                        <div className="flex items-center gap-1 text-stone-500">
                            <User className="w-3.5 h-3.5" />
                            <span>{selectedArticle.author}</span>
                        </div>
                        <span className="text-stone-300">•</span>
                        <span className="text-stone-400 font-mono">{selectedArticle.date}</span>
                        <span className="text-stone-300">•</span>
                        <div className="flex items-center gap-1 text-stone-500">
                            <Eye className="w-3.5 h-3.5" />
                            <span>{readCount.toLocaleString()} 次閱讀</span>
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-stone-800 leading-tight">
                        {selectedArticle.title}
                    </h1>
                </div>
                
                <div className="prose prose-stone max-w-none prose-lg">
                    {selectedArticle.content || (
                        <div className="text-center py-20 text-stone-400 bg-stone-50 rounded-xl">
                            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-20" />
                            <p>本文內容建置中...</p>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    </div>
  );
}

function TechLobby() {
  const { user, session } = useAuth();
  const [activeTab, setActiveTab] = useState("vue");
  
  // States for dynamic data
  const [readCounts, setReadCounts] = useState<Record<string, number>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});
  const [userLikes, setUserLikes] = useState<string[]>([]);
  const [userCollections, setUserCollections] = useState<string[]>([]);

  // Fetch counts on mount
  useEffect(() => {
    const fetchCounts = async () => {
        try {
            // Read Counts
            const readRes = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-92f3175c/articles/counts`, {
                 headers: { 'Authorization': `Bearer ${publicAnonKey}` }
            });
            if (readRes.ok) {
                const data = await readRes.json();
                setReadCounts(data.counts);
            }

            // Like Counts
            const likeRes = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-92f3175c/articles/likes`, {
                headers: { 'Authorization': `Bearer ${publicAnonKey}` }
            });
            if (likeRes.ok) {
                const data = await likeRes.json();
                setLikeCounts(data.counts);
            }
        } catch (e) {
            console.error(e);
        }
    }
    fetchCounts();
  }, []);

  // Fetch user data on login
  useEffect(() => {
      const fetchUserData = async () => {
          if (!session?.access_token) return;
          try {
              // Likes
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
              
              // Collections
              const collectionsRes = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-92f3175c/articles/user-collections`, {
                  headers: { 
                      'Authorization': `Bearer ${publicAnonKey}`,
                      'X-Access-Token': session.access_token
                  }
              });
              if (collectionsRes.ok) {
                  const data = await collectionsRes.json();
                  setUserCollections(data.collections);
              }
          } catch (e) {
              console.error(e);
          }
      };
      if (user) {
          fetchUserData();
      } else {
          setUserLikes([]);
          setUserCollections([]);
      }
  }, [user, session]);

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-stone-200 pb-8">
        <div>
            <h2 className="text-4xl font-bold text-stone-800 flex items-center gap-3 tracking-tight">
                <div className="p-2 bg-slate-800 rounded-xl">
                    <Terminal className="w-8 h-8 text-white" />
                </div>
                技術筆記
            </h2>
            <p className="text-stone-500 mt-4 text-lg max-w-2xl leading-relaxed">
                <span className="text-2xl mr-2">👩‍💻</span> 
                工程師媽媽的實戰紀錄。白天寫 Code，晚上帶娃。
                <br className="hidden md:block"/>
                這裡沒有艱澀的理論，只有解決問題的過程與心得。
            </p>
        </div>
        <div className="hidden md:block text-right">
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 rounded-full text-stone-500 text-sm font-mono">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Keep Learning, Keep Growing</span>
             </div>
        </div>
      </div>

      <Tabs defaultValue="vue" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 max-w-[400px] mb-8 bg-stone-100 p-1 rounded-xl">
            <TabsTrigger 
                value="vue" 
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm font-medium py-2 transition-all"
            >
                <div className="flex items-center gap-2">
                    <Layout className="w-4 h-4" />
                    Vue3 30日日記
                </div>
            </TabsTrigger>
            <TabsTrigger 
                value="uipath" 
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm font-medium py-2 transition-all"
            >
                <div className="flex items-center gap-2">
                    <Box className="w-4 h-4" />
                    UiPath 自動化
                </div>
            </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
            <motion.div
                key="lists-container"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
            >
                <TabsContent value="vue" className="mt-0">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-xl font-bold text-stone-700 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-emerald-500" />
                            30 Days of Vue3
                        </h3>
                        <Badge variant="outline" className="text-stone-400 font-mono">30 Posts</Badge>
                    </div>
                    
                    <ScrollArea className="h-[800px] pr-4 rounded-3xl">
                        <div className="grid grid-cols-1 gap-4 pb-10">
                            {VUE3_ARTICLES.map((article, index) => (
                                <motion.div
                                    key={article.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link to={`/tech/${article.id}`} className="block">
                                        <Card className="group border-stone-100 bg-white hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-100/50 transition-all cursor-pointer overflow-hidden">
                                            <CardContent className="p-0 flex flex-col sm:flex-row">
                                                <div className="bg-stone-50 w-full sm:w-24 flex items-center justify-center p-4 sm:p-0 border-b sm:border-b-0 sm:border-r border-stone-100 group-hover:bg-emerald-50/50 transition-colors">
                                                    <span className="text-2xl font-black text-stone-300 group-hover:text-emerald-500 font-mono transition-colors">
                                                        {(index + 1).toString().padStart(2, '0')}
                                                    </span>
                                                </div>
                                                <div className="p-5 flex-1">
                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                                        <h4 className="font-bold text-stone-800 text-lg group-hover:text-emerald-700 transition-colors">
                                                            {article.title.replace(/Day \d+: /, '')}
                                                        </h4>
                                                        <div className="flex items-center gap-3 text-xs text-stone-400">
                                                            <span className="font-mono">{article.date}</span>
                                                            <div className="flex items-center gap-1">
                                                                <Eye className="w-3 h-3" /> {readCounts[article.id]?.toLocaleString() || 0}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="text-stone-500 text-sm leading-relaxed mb-3">
                                                        {article.summary}
                                                    </p>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            {article.tags.map(tag => (
                                                                <Badge key={tag} variant="secondary" className="bg-stone-50 text-stone-500 text-[10px] px-2 h-5 hover:bg-stone-100">
                                                                    #{tag}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                                <div className="flex items-center gap-1 text-stone-400 text-xs">
                                                                <Heart className={`w-3 h-3 ${userLikes.includes(article.id) ? "fill-rose-500 text-rose-500" : ""}`} />
                                                                {likeCounts[article.id] || 0}
                                                            </div>
                                                            <div className="flex items-center gap-1 text-stone-400 text-xs">
                                                                <User className="w-3 h-3" /> {article.author}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="hidden sm:flex w-12 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">
                                                    <ArrowRight className="w-5 h-5 text-emerald-400" />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </ScrollArea>
                </TabsContent>

                <TabsContent value="uipath" className="mt-0">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-xl font-bold text-stone-700 flex items-center gap-2">
                            <Box className="w-5 h-5 text-blue-500" />
                            UiPath Automation Sharing
                        </h3>
                        <Badge variant="outline" className="text-stone-400 font-mono">{UIPATH_ARTICLES.length} Posts</Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6">
                        {UIPATH_ARTICLES.map((article, index) => (
                            <motion.div
                                key={article.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link to={`/tech/${article.id}`} className="block h-full">
                                    <Card 
                                        className="h-full border-stone-100 bg-white hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50 transition-all cursor-pointer group flex flex-col"
                                    >
                                        <div className="h-2 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
                                        <CardContent className="p-6 flex-1 flex flex-col">
                                            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-400 font-mono mb-4">
                                                <Badge variant="outline" className="text-blue-600 bg-blue-50 border-blue-100">UiPath</Badge>
                                                <span>{article.date}</span>
                                                <span>•</span>
                                                <span>{article.readTime}</span>
                                                <span className="flex items-center gap-1 ml-auto">
                                                    <Eye className="w-3 h-3"/> {readCounts[article.id]?.toLocaleString() || 0}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-stone-800 mb-3 group-hover:text-blue-700 transition-colors">
                                                {article.title}
                                            </h3>
                                            <p className="text-stone-500 text-sm leading-relaxed mb-6 flex-1">
                                                {article.summary}
                                            </p>
                                            
                                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-50">
                                                <div className="flex items-center gap-2 text-xs text-stone-500">
                                                    <User className="w-3 h-3" />
                                                    {article.author}
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-1 text-stone-400 text-xs">
                                                        <Heart className={`w-3 h-3 ${userLikes.includes(article.id) ? "fill-rose-500 text-rose-500" : ""}`} />
                                                        {likeCounts[article.id] || 0}
                                                    </div>
                                                    <Button variant="ghost" size="sm" className="hover:bg-blue-50 hover:text-blue-700 text-stone-400 group/btn">
                                                        閱讀更多
                                                        <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </TabsContent>
            </motion.div>
        </AnimatePresence>
      </Tabs>
    </div>
  );
}