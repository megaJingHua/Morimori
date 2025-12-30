import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User, Settings, Clock, Award, Star, Shield, Lock, Mail, Loader2, LogOut, Bookmark, Heart, Calendar, Eye, ArrowLeft, Gamepad2, Save, Edit2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { useAuth } from '../../context/AuthContext';
import { useGameTime } from '../../context/GameTimeContext';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../../../../utils/supabase/info';
import { ARTICLES } from '../../data/articles';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ArticleDetail } from './ArticleDetail';
import { getZodiac } from '../../utils/zodiac';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export function MemberSection() {
  const { user, loading, signOut, session, supabase } = useAuth();
  const { dailyLimit, setDailyLimit, timeUsed, saveDailyLimit } = useGameTime();
  const [authTab, setAuthTab] = useState('login');
  
  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Signup State
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupBirthday, setSignupBirthday] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);

  // Profile Settings State
  const [profileName, setProfileName] = useState('');
  const [profileBirthday, setProfileBirthday] = useState('');
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Collections State
  const [userCollections, setUserCollections] = useState<string[]>([]);
  const [readCounts, setReadCounts] = useState<Record<string, number>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});
  const [collectionCounts, setCollectionCounts] = useState<Record<string, number>>({});
  const [userLikes, setUserLikes] = useState<string[]>([]);
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);

  // Game Records State
  const [gameRecords, setGameRecords] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
        setProfileName(user.user_metadata?.name || '');
        setProfileBirthday(user.user_metadata?.birthday || '');
    }
  }, [user]);

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

              const collectionRes = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-92f3175c/articles/collection-counts`, {
                  headers: { 'Authorization': `Bearer ${publicAnonKey}` }
              });
              if (collectionRes.ok) {
                  const data = await collectionRes.json();
                  setCollectionCounts(data.counts);
              }
          } catch (e) {
              console.error(e);
          }
      }
      fetchCounts();
  }, []);

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

              // Game Records
              const recordsRes = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-92f3175c/game/records`, {
                  headers: { 
                      'Authorization': `Bearer ${publicAnonKey}`,
                      'X-Access-Token': session.access_token
                  }
              });
              if (recordsRes.ok) {
                  const data = await recordsRes.json();
                  setGameRecords(data.records || []);
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
          setGameRecords([]);
      }
  }, [user, session]);

  const handleSaveProfile = async () => {
    setIsSavingProfile(true);
    try {
        const { error } = await supabase.auth.updateUser({
            data: { name: profileName, birthday: profileBirthday }
        });

        if (error) throw error;
        toast.success("個人資料已更新");
        setIsEditingProfile(false);
    } catch (error: any) {
        console.error("Error saving profile:", error);
        toast.error(`更新失敗: ${error.message}`);
    } finally {
        setIsSavingProfile(false);
    }
  };

  const handleToggleLike = async (id: number) => {
      if (!user || !session) return;
      
      if (!session.access_token) {
          toast.error("登入已過期，請重新登入");
          return;
      }

      try {
          const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-92f3175c/articles/${id}/like`, {
              method: 'POST',
              headers: { 
                  'Authorization': `Bearer ${publicAnonKey}`,
                  'X-Access-Token': session.access_token,
                  'Content-Type': 'application/json'
              }
          });
          if (response.ok) {
              const data = await response.json();
              setLikeCounts(prev => ({ ...prev, [id]: data.count }));
              if (data.liked) {
                  setUserLikes(prev => [...prev, id.toString()]);
              } else {
                  setUserLikes(prev => prev.filter(lid => lid !== id.toString()));
              }
          }
      } catch (e) { console.error(e); }
  };

  const handleToggleCollection = async (id: number) => {
      if (!user || !session) return;
      
      if (!session.access_token) {
          toast.error("登入已過期，請重新登入");
          return;
      }

      try {
          const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-92f3175c/articles/${id}/collect`, {
              method: 'POST',
              headers: { 
                  'Authorization': `Bearer ${publicAnonKey}`,
                  'X-Access-Token': session.access_token,
                  'Content-Type': 'application/json'
              }
          });
          if (response.ok) {
              const data = await response.json();
              setCollectionCounts(prev => ({ ...prev, [id]: data.count }));
              if (data.collected) {
                  setUserCollections(prev => [...prev, id.toString()]);
                  toast.success("已加入收藏！");
              } else {
                  setUserCollections(prev => prev.filter(cid => cid !== id.toString()));
                  toast.info("已取消收藏");
              }
          }
      } catch (e) { console.error(e); }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
        const { supabase } = await import('../../context/AuthContext');
        const { error } = await supabase.auth.signInWithPassword({
            email: loginEmail,
            password: loginPassword,
        });
        if (error) throw error;
        toast.success('登入成功！');
    } catch (error: any) {
        toast.error(`登入失敗: ${error.message}`);
    } finally {
        setIsLoggingIn(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSigningUp(true);
    try {
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-92f3175c/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${publicAnonKey}`
            },
            body: JSON.stringify({
                email: signupEmail,
                password: signupPassword,
                name: signupName,
                birthday: signupBirthday
            })
        });
        
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || '註冊失敗');
        }

        toast.success('註冊成功！請直接登入。');
        setAuthTab('login');
        setLoginEmail(signupEmail);
        setLoginPassword(signupPassword);
    } catch (error: any) {
        toast.error(`註冊失敗: ${error.message}`);
    } finally {
        setIsSigningUp(false);
    }
  };

  const handleSignOut = async () => {
      await signOut();
      toast.info('已登出');
  };

  if (loading) {
      return (
          <div className="flex items-center justify-center min-h-[50vh]">
              <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
          </div>
      );
  }

  if (!user) {
      return (
        <div className="max-w-md mx-auto py-16 px-4">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-stone-800">歡迎加入森森邏輯</h2>
                <p className="text-stone-500 mt-2">註冊會員，開啟專屬的親子成長紀錄。</p>
            </div>
            
            <Card className="border-stone-100 shadow-lg">
                <CardHeader>
                    <Tabs value={authTab} onValueChange={setAuthTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="login">登入</TabsTrigger>
                            <TabsTrigger value="signup">註冊</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </CardHeader>
                <CardContent>
                    {authTab === 'login' ? (
                        <form onSubmit={handleLogin} className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input 
                                    id="email" 
                                    type="email" 
                                    placeholder="name@example.com" 
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">密碼</Label>
                                <Input 
                                    id="password" 
                                    type="password" 
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoggingIn}>
                                {isLoggingIn ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                登入
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleSignup} className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">暱稱 (如：寶哥媽媽)</Label>
                                <Input 
                                    id="name" 
                                    placeholder="您的稱呼" 
                                    value={signupName}
                                    onChange={(e) => setSignupName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="birthday">生日 (用於計算生肖)</Label>
                                <Input 
                                    id="birthday" 
                                    type="date"
                                    value={signupBirthday}
                                    onChange={(e) => setSignupBirthday(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="signup-email">Email</Label>
                                <Input 
                                    id="signup-email" 
                                    type="email" 
                                    placeholder="name@example.com" 
                                    value={signupEmail}
                                    onChange={(e) => setSignupEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="signup-password">密碼</Label>
                                <Input 
                                    id="signup-password" 
                                    type="password" 
                                    placeholder="設定您的密碼"
                                    value={signupPassword}
                                    onChange={(e) => setSignupPassword(e.target.value)}
                                    required
                                    minLength={6}
                                />
                            </div>
                            <Button type="submit" className="w-full bg-stone-800 hover:bg-stone-900" disabled={isSigningUp}>
                                {isSigningUp ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                註冊帳號
                            </Button>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
      );
  }

  // If viewing an article detail
  const selectedArticle = ARTICLES.find(a => a.id === selectedArticleId);
  if (selectedArticleId && selectedArticle) {
      return (
          <div className="max-w-4xl mx-auto py-8">
               <div className="mb-6">
                   <Button variant="ghost" onClick={() => setSelectedArticleId(null)} className="pl-0 hover:bg-transparent hover:text-emerald-600 text-stone-500">
                      <ArrowLeft className="w-4 h-4 mr-2" /> 回到會員中心
                   </Button>
               </div>
               <ArticleDetail 
                   article={selectedArticle}
                   readCount={readCounts[selectedArticleId] || 0}
                   likeCount={likeCounts[selectedArticleId] || 0}
                   collectionCount={collectionCounts[selectedArticleId] || 0}
                   isLiked={userLikes.includes(selectedArticleId.toString())}
                   isCollected={userCollections.includes(selectedArticleId.toString())}
                   onToggleLike={() => handleToggleLike(selectedArticleId)}
                   onToggleCollection={() => handleToggleCollection(selectedArticleId)}
                   onBack={() => setSelectedArticleId(null)}
               />
          </div>
      )
  }

  // Logged In View
  const collectedArticles = ARTICLES.filter(a => userCollections.includes(a.id.toString()));
  const zodiac = getZodiac(user.user_metadata?.birthday);

  return (
    <div className="max-w-4xl mx-auto py-8">
       <div className="mb-8 text-center flex items-center justify-between px-4 md:px-0">
            <div>
                <h2 className="text-3xl font-bold text-stone-800 text-left">家長設定中心</h2>
                <p className="text-stone-500 mt-2 text-left">歡迎回來，{user.user_metadata?.name || '家長'}。</p>
            </div>
            <Button variant="outline" onClick={handleSignOut} className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-100">
                <LogOut className="w-4 h-4 mr-2" /> 登出
            </Button>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 md:px-0">
            {/* Sidebar / Profile Card */}
            <div className="lg:col-span-1 space-y-6">
                <Card className="border-none shadow-md overflow-hidden bg-white">
                    <div className="h-24 bg-gradient-to-r from-emerald-100 to-teal-100"></div>
                    <CardContent className="relative pt-0 pb-8 px-6 text-center">
                        <Avatar className="w-24 h-24 border-4 border-white shadow-sm mx-auto -mt-12 mb-4 bg-white">
                            {/* If zodiac exists, show zodiac emoji, else show dicebear */}
                            {zodiac ? (
                                <div className="w-full h-full flex items-center justify-center bg-yellow-50 text-6xl">
                                    {zodiac.emoji}
                                </div>
                            ) : (
                                <AvatarImage src={`https://api.dicebear.com/7.x/micah/svg?seed=${user.id}`} />
                            )}
                            <AvatarFallback>{user.email?.[0]?.toUpperCase()}</AvatarFallback>
                        </Avatar>
                        
                        {!isEditingProfile ? (
                            <div className="mb-6 relative group">
                                <h3 className="text-xl font-bold text-stone-800">{user.user_metadata?.name || user.email}</h3>
                                <p className="text-sm text-stone-500 flex items-center justify-center gap-2 mt-1">
                                    森森邏輯會員 
                                    {zodiac && <Badge variant="outline" className="text-xs font-normal bg-yellow-50 text-yellow-700 border-yellow-200">屬{zodiac.name}</Badge>}
                                </p>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="absolute -right-2 top-0 text-stone-400 hover:text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => setIsEditingProfile(true)}
                                >
                                    <Edit2 className="w-4 h-4" />
                                </Button>
                            </div>
                        ) : (
                            <div className="mb-6 space-y-3 bg-stone-50 p-4 rounded-xl border border-stone-100 animate-in fade-in slide-in-from-top-2">
                                <div className="space-y-1 text-left">
                                    <Label htmlFor="edit-name" className="text-xs text-stone-500">暱稱</Label>
                                    <Input 
                                        id="edit-name"
                                        value={profileName} 
                                        onChange={(e) => setProfileName(e.target.value)} 
                                        className="h-8 text-sm bg-white"
                                    />
                                </div>
                                <div className="space-y-1 text-left">
                                    <Label htmlFor="edit-birthday" className="text-xs text-stone-500">生日</Label>
                                    <Input 
                                        id="edit-birthday"
                                        type="date"
                                        value={profileBirthday} 
                                        onChange={(e) => setProfileBirthday(e.target.value)} 
                                        className="h-8 text-sm bg-white"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <Button 
                                        size="sm" 
                                        variant="outline" 
                                        className="flex-1 h-8 text-xs"
                                        onClick={() => setIsEditingProfile(false)}
                                    >
                                        取消
                                    </Button>
                                    <Button 
                                        size="sm" 
                                        className="flex-1 h-8 text-xs bg-stone-800 hover:bg-stone-900"
                                        onClick={handleSaveProfile}
                                        disabled={isSavingProfile}
                                    >
                                        {isSavingProfile ? <Loader2 className="w-3 h-3 animate-spin" /> : '儲存'}
                                    </Button>
                                </div>
                            </div>
                        )}
                        
                        <div className="flex justify-center gap-4 text-sm">
                            <div className="text-center p-3 bg-stone-50 rounded-xl flex-1 cursor-pointer hover:bg-stone-100 transition-colors" onClick={() => document.getElementById('tab-collections')?.click()}>
                                <div className="font-bold text-stone-800 text-lg">{userCollections.length}</div>
                                <div className="text-stone-400 text-xs">文章收藏</div>
                            </div>
                            <div className="text-center p-3 bg-stone-50 rounded-xl flex-1 cursor-pointer hover:bg-stone-100 transition-colors" onClick={() => document.getElementById('tab-records')?.click()}>
                                <div className="font-bold text-emerald-600 text-lg">{Math.floor(timeUsed / 60)}m</div>
                                <div className="text-stone-400 text-xs">今日遊戲</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-orange-50/50 border-orange-100">
                    <CardContent className="p-6 flex items-start gap-4">
                        <div className="bg-white p-2 rounded-full shadow-sm shrink-0">
                            <Award className="w-6 h-6 text-orange-400" />
                        </div>
                        <div>
                            <h4 className="font-bold text-stone-800">兌換中心 (Coming Soon)</h4>
                            <p className="text-xs text-stone-500 mt-1">累積陪伴時數，未來可兌換獨家 LINE 貼圖或實體繪本喔！</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Settings Area */}
            <div className="lg:col-span-2">
                <Tabs defaultValue="collections" className="w-full">
                    <TabsList className="w-full justify-start bg-transparent p-0 border-b border-stone-200 mb-6 rounded-none h-auto overflow-x-auto">
                         <TabsTrigger 
                            id="tab-collections"
                            value="collections" 
                            className="rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3"
                        >
                            文章收藏
                        </TabsTrigger>
                        <TabsTrigger 
                            value="settings" 
                            className="rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3"
                        >
                            遊戲管理
                        </TabsTrigger>
                        <TabsTrigger 
                            id="tab-records"
                            value="records" 
                            className="rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3"
                        >
                            遊玩紀錄
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="collections">
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4"
                        >
                            {collectedArticles.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4">
                                    {collectedArticles.map(article => (
                                        <div key={article.id} className="flex gap-4 p-4 rounded-2xl bg-white border border-stone-100 hover:shadow-md transition-all cursor-pointer group" onClick={() => setSelectedArticleId(article.id)}>
                                            <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden relative">
                                                <ImageWithFallback src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                            </div>
                                            <div className="flex flex-col justify-between py-1">
                                                <div>
                                                    <Badge variant="secondary" className="mb-2 text-xs">{article.category}</Badge>
                                                    <h4 className="font-bold text-stone-800 line-clamp-2 leading-tight group-hover:text-emerald-700 transition-colors">{article.title}</h4>
                                                </div>
                                                <div className="flex items-center gap-4 text-xs text-stone-400">
                                                    <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {article.date}</span>
                                                    <span className="flex items-center"><Eye className="w-3 h-3 mr-1" /> {readCounts[article.id] || 0}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <Card className="bg-stone-50 border-none">
                                    <CardContent className="p-8 text-center space-y-4">
                                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                                            <Bookmark className="w-8 h-8 text-stone-300" />
                                        </div>
                                        <h3 className="text-lg font-bold text-stone-600">還沒有收藏文章</h3>
                                        <p className="text-stone-500 text-sm max-w-xs mx-auto">
                                            看到喜歡的文章，點擊愛心旁邊的收藏按鈕，就可以在這裡隨時複習喔！
                                        </p>
                                    </CardContent>
                                </Card>
                            )}
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="settings">
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <Card className="border-stone-100 shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-emerald-500" />
                                        每日遊玩時間限制
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-8">
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <Label>每日限制</Label>
                                            <span className="text-emerald-600 font-bold">{dailyLimit} 分鐘</span>
                                        </div>
                                        <Slider 
                                            value={[dailyLimit]} 
                                            onValueChange={(val) => setDailyLimit(val[0])} 
                                            onValueCommit={(val) => saveDailyLimit(val[0])}
                                            max={60} 
                                            step={5} 
                                            className="py-4" 
                                        />
                                        <p className="text-xs text-stone-400">建議幼兒每日接觸螢幕時間不超過 30 分鐘</p>
                                    </div>
                                    
                                    <div className="p-4 bg-amber-50 rounded-lg text-sm text-amber-800 border border-amber-100">
                                        <div className="flex items-center gap-2 mb-1 font-bold">
                                            <Shield className="w-4 h-4" />
                                            家長安心鎖
                                        </div>
                                        設定時間一到，遊戲畫面將自動鎖定，並提醒孩子休息。
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-stone-100 shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-emerald-500" />
                                        護眼模式設定
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <Label>藍光過濾</Label>
                                            <p className="text-xs text-stone-400">自動調節螢幕色溫，減少藍光刺激</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <Label>休息提醒</Label>
                                            <p className="text-xs text-stone-400">每玩 15 分鐘跳出休息提醒動畫</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="records">
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4"
                        >
                           {gameRecords.length > 0 ? (
                               <Card className="border-stone-100 shadow-sm overflow-hidden bg-white">
                                   <Table>
                                       <TableHeader>
                                           <TableRow className="bg-stone-50 hover:bg-stone-50">
                                               <TableHead className="w-[120px]">日期</TableHead>
                                               <TableHead>遊戲種類</TableHead>
                                               <TableHead>分數</TableHead>
                                               <TableHead className="text-right">時間</TableHead>
                                           </TableRow>
                                       </TableHeader>
                                       <TableBody>
                                           {gameRecords.map((record, idx) => (
                                               <TableRow key={idx}>
                                                   <TableCell className="font-medium text-stone-600">
                                                       {new Date(record.date).toLocaleDateString()} <span className="text-xs text-stone-400 ml-1">{new Date(record.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                                   </TableCell>
                                                   <TableCell className="font-medium text-emerald-700">{record.gameType}</TableCell>
                                                   <TableCell>{record.score}</TableCell>
                                                   <TableCell className="text-right font-mono">{record.timePlayed} 秒</TableCell>
                                               </TableRow>
                                           ))}
                                       </TableBody>
                                   </Table>
                               </Card>
                           ) : (
                                <Card className="bg-stone-50 border-none">
                                    <CardContent className="p-8 text-center space-y-4">
                                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                                            <Gamepad2 className="w-8 h-8 text-stone-300" />
                                        </div>
                                        <h3 className="text-lg font-bold text-stone-600">還沒有遊玩紀錄</h3>
                                        <p className="text-stone-500 text-sm max-w-xs mx-auto">
                                            帶孩子去「親子遊戲區」玩一玩，紀錄就會出現在這裡喔！
                                        </p>
                                    </CardContent>
                                </Card>
                           )}
                        </motion.div>
                    </TabsContent>
                </Tabs>
            </div>
       </div>
    </div>
  );
}
