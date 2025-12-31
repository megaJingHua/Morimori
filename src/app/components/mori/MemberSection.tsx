import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User, Settings, Clock, Award, Star, Shield, Lock, Mail, Loader2, LogOut, Bookmark, Heart, Calendar, Eye, ArrowLeft, Gamepad2, Save, Edit2, Check, X, Unlock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { useAuth } from '../../context/AuthContext';
import { useGameTime } from '../../context/GameTimeContext';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../../../../utils/supabase/info';
import { ARTICLES } from '../../data/articles';
import { ALL_TECH_ARTICLES } from '../../data/techArticles';
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
  const { dailyLimit, setDailyLimit, timeUsed, saveSettings } = useGameTime();
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
  const [isLoadingCollections, setIsLoadingCollections] = useState(false);
  const [readCounts, setReadCounts] = useState<Record<string, number>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});
  const [collectionCounts, setCollectionCounts] = useState<Record<string, number>>({});
  const [userLikes, setUserLikes] = useState<string[]>([]);
  const [selectedArticleId, setSelectedArticleId] = useState<string | number | null>(null);

  // Game Records State
  const [gameRecords, setGameRecords] = useState<any[]>([]);

  // Settings Unlock State
  const [isSettingsUnlocked, setIsSettingsUnlocked] = useState(false);
  const [verifyPassword, setVerifyPassword] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);

  // Combine all articles
  const allArticles = [...ARTICLES, ...ALL_TECH_ARTICLES];

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
          setIsLoadingCollections(true);
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
          } finally {
              setIsLoadingCollections(false);
          }
      };
      if (user) {
          fetchUserData();
      } else {
          setUserLikes([]);
          setUserCollections([]);
          setGameRecords([]);
          setIsLoadingCollections(false);
      }
  }, [user, session]);

  const handleVerifyPassword = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!user?.email) return;
      
      setIsVerifying(true);
      try {
          const { error } = await supabase.auth.signInWithPassword({
              email: user.email,
              password: verifyPassword
          });

          if (error) {
             throw error;
          }
          
          setIsSettingsUnlocked(true);
          setShowPasswordDialog(false);
          setVerifyPassword('');
          toast.success("驗證成功，您可以調整設定了");
      } catch (error: any) {
          console.error("Password verification failed:", error);
          toast.error("密碼錯誤，請重試");
      } finally {
          setIsVerifying(false);
      }
  };

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

  const handleToggleLike = async (id: number | string) => {
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

  const handleToggleCollection = async (id: number | string) => {
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
        console.error("Login error:", error);
        if (error.message === "Invalid login credentials") {
            toast.error("帳號或密碼錯誤，請再試一次");
        } else if (error.message.includes("Email not confirmed")) {
            toast.error("信箱尚未驗證，請檢查您的信箱");
        } else {
            toast.error(`登入失敗: ${error.message}`);
        }
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
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl mx-auto flex items-center justify-center shadow-lg shadow-emerald-200 mb-6">
                    <User className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-stone-800 tracking-tight">歡迎加入森森邏輯</h2>
                <p className="text-stone-500 mt-2">註冊會員，開啟專屬的親子成長紀錄。</p>
            </div>
            
            <Card className="border-0 shadow-2xl shadow-stone-200 bg-white/80 backdrop-blur overflow-hidden rounded-3xl">
                <CardHeader className="bg-stone-50/50 border-b border-stone-100/50 pb-0 pt-6">
                    <Tabs value={authTab} onValueChange={setAuthTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-2 bg-stone-100/50 p-1 h-auto rounded-xl">
                            <TabsTrigger 
                                value="login" 
                                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm py-2"
                            >
                                登入
                            </TabsTrigger>
                            <TabsTrigger 
                                value="signup" 
                                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm py-2"
                            >
                                註冊
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </CardHeader>
                <CardContent className="pt-6">
                    {authTab === 'login' ? (
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input 
                                    id="email" 
                                    type="email" 
                                    placeholder="name@example.com" 
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    required
                                    className="rounded-xl bg-stone-50 border-stone-200 focus:border-emerald-500 focus:ring-emerald-500 h-11"
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
                                    className="rounded-xl bg-stone-50 border-stone-200 focus:border-emerald-500 focus:ring-emerald-500 h-11"
                                />
                            </div>
                            <Button type="submit" className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-lg shadow-lg shadow-emerald-200" disabled={isLoggingIn}>
                                {isLoggingIn ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                               登入
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleSignup} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">暱稱 (如：寶哥媽媽)</Label>
                                <Input 
                                    id="name" 
                                    placeholder="您的稱呼" 
                                    value={signupName}
                                    onChange={(e) => setSignupName(e.target.value)}
                                    required
                                    className="rounded-xl bg-stone-50 border-stone-200 h-10"
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
                                    className="rounded-xl bg-stone-50 border-stone-200 h-10"
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
                                    className="rounded-xl bg-stone-50 border-stone-200 h-10"
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
                                    className="rounded-xl bg-stone-50 border-stone-200 h-10"
                                />
                            </div>
                            <Button type="submit" className="w-full h-11 rounded-xl bg-stone-800 hover:bg-stone-900 shadow-lg" disabled={isSigningUp}>
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
  const selectedArticle = allArticles.find(a => a.id === selectedArticleId);
  if (selectedArticleId && selectedArticle) {
      return (
          <div className="max-w-5xl mx-auto py-8">
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
  const collectedArticles = allArticles.filter(a => userCollections.includes(a.id.toString()));
  const zodiac = getZodiac(user.user_metadata?.birthday);

  return (
    <div className="max-w-6xl mx-auto py-8">
       {/* Header with improved styling */}
       <div className="mb-8 px-4 md:px-0 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
                <h2 className="text-4xl font-bold text-stone-800 tracking-tight">家長設定中心</h2>
                <p className="text-stone-500 mt-2 text-lg">歡迎回來，今天想為孩子紀錄什麼呢？</p>
            </div>
            <Button variant="outline" onClick={handleSignOut} className="rounded-full px-6 text-stone-500 hover:text-red-600 hover:bg-red-50 border-stone-200">
                <LogOut className="w-4 h-4 mr-2" /> 登出
            </Button>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 md:px-0">
            {/* Sidebar (Left 4 cols) */}
            <div className="lg:col-span-4 space-y-6">
                
                {/* Profile Card */}
                <Card className="border-0 shadow-xl shadow-stone-200/50 overflow-hidden bg-white rounded-[2rem] relative group">
                    {/* Decorative Header */}
                    <div className="h-32 bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    
                    <CardContent className="relative pt-0 pb-8 px-6 text-center -mt-16">
                        {/* Avatar */}
                        <div className="relative inline-block">
                             <Avatar className="w-32 h-32 border-4 border-white shadow-lg mx-auto bg-white">
                                {zodiac ? (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-50 to-amber-100 text-7xl">
                                        {zodiac.emoji}
                                    </div>
                                ) : (
                                    <>
                                        <AvatarImage src={`https://api.dicebear.com/7.x/micah/svg?seed=${user.id}`} />
                                        <AvatarFallback>{user.email?.[0]?.toUpperCase()}</AvatarFallback>
                                    </>
                                )}
                            </Avatar>
                            {!isEditingProfile && (
                                <button 
                                    onClick={() => setIsEditingProfile(true)}
                                    className="absolute bottom-1 right-1 w-8 h-8 bg-stone-800 text-white rounded-full flex items-center justify-center shadow-md hover:bg-stone-900 transition-colors"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                        
                        {/* Profile Info or Edit Form */}
                        {!isEditingProfile ? (
                            <div className="mt-4 mb-8">
                                <h3 className="text-2xl font-bold text-stone-800 tracking-tight">{user.user_metadata?.name || '親愛的家長'}</h3>
                                <div className="flex items-center justify-center gap-2 mt-2">
                                    <span className="text-stone-400 text-sm">{user.email}</span>
                                </div>
                                {user.user_metadata?.birthday && (
                                    <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-stone-50 rounded-full text-stone-500 text-xs border border-stone-100">
                                        <Calendar className="w-3 h-3" />
                                        {user.user_metadata.birthday}
                                    </div>
                                )}
                            </div>
                        ) : (
                             <div className="mt-6 mb-8 space-y-4 bg-stone-50/80 p-5 rounded-2xl border border-stone-100 animate-in fade-in zoom-in-95 duration-200">
                                <div className="space-y-1 text-left">
                                    <Label className="text-xs text-stone-500 ml-1">暱稱</Label>
                                    <Input 
                                        value={profileName} 
                                        onChange={(e) => setProfileName(e.target.value)} 
                                        className="h-9 text-sm bg-white rounded-xl"
                                    />
                                </div>
                                <div className="space-y-1 text-left">
                                    <Label className="text-xs text-stone-500 ml-1">生日</Label>
                                    <Input 
                                        type="date"
                                        value={profileBirthday} 
                                        onChange={(e) => setProfileBirthday(e.target.value)} 
                                        className="h-9 text-sm bg-white rounded-xl"
                                    />
                                </div>
                                <div className="flex gap-2 pt-2">
                                    <Button 
                                        size="sm" 
                                        variant="outline" 
                                        className="flex-1 rounded-lg"
                                        onClick={() => setIsEditingProfile(false)}
                                    >
                                        <X className="w-4 h-4 mr-1" /> 取消
                                    </Button>
                                    <Button 
                                        size="sm" 
                                        className="flex-1 bg-stone-800 hover:bg-stone-900 rounded-lg"
                                        onClick={handleSaveProfile}
                                        disabled={isSavingProfile}
                                    >
                                        {isSavingProfile ? <Loader2 className="w-3 h-3 animate-spin" /> : <><Check className="w-4 h-4 mr-1" /> 儲存</>}
                                    </Button>
                                </div>
                            </div>
                        )}
                        
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            <div 
                                className="bg-stone-50 p-4 rounded-2xl border border-stone-100 cursor-pointer hover:bg-stone-100 hover:scale-[1.02] transition-all duration-200"
                                onClick={() => document.getElementById('tab-collections')?.click()}
                            >
                                <div className="text-2xl font-black text-stone-800 mb-1">{userCollections.length}</div>
                                <div className="text-xs text-stone-500 font-medium">文章收藏</div>
                            </div>
                            <div 
                                className="bg-stone-50 p-4 rounded-2xl border border-stone-100 cursor-pointer hover:bg-stone-100 hover:scale-[1.02] transition-all duration-200"
                                onClick={() => document.getElementById('tab-records')?.click()}
                            >
                                <div className="text-2xl font-black text-emerald-600 mb-1">{Math.floor(timeUsed / 60)}<span className="text-sm font-normal text-emerald-500 ml-0.5">m</span></div>
                                <div className="text-xs text-stone-500 font-medium">今日遊玩</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Redemption Card (Placeholder) */}
                <Card className="border-0 shadow-lg shadow-orange-100 bg-gradient-to-br from-orange-50 to-amber-50 rounded-[2rem] overflow-hidden">
                    <CardContent className="p-6 relative">
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0">
                                <Award className="w-6 h-6 text-orange-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-stone-800 text-lg">兌換中心 (Coming Soon)</h4>
                                <p className="text-xs text-stone-500 mt-1 leading-relaxed">累積陪伴時數，未來可兌換 LINE 貼圖或實體貼紙、桌遊...等喔！</p>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full blur-3xl -mr-16 -mt-16 opacity-50"></div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content (Right 8 cols) */}
            <div className="lg:col-span-8">
                <Tabs defaultValue="collections" className="w-full">
                    {/* Stylish Tabs */}
                    <TabsList className="w-full justify-start bg-white/50 backdrop-blur p-1.5 border border-stone-200 rounded-full h-auto mb-8 sticky top-20 z-10 shadow-sm">
                         <TabsTrigger 
                            id="tab-collections"
                            value="collections" 
                            className="rounded-full data-[state=active]:bg-stone-800 data-[state=active]:text-white px-6 py-2.5 transition-all duration-300"
                        >
                            文章收藏
                        </TabsTrigger>
                        <TabsTrigger 
                            value="settings" 
                            className="rounded-full data-[state=active]:bg-stone-800 data-[state=active]:text-white px-6 py-2.5 transition-all duration-300"
                        >
                            遊戲管理
                        </TabsTrigger>
                        <TabsTrigger 
                            id="tab-records"
                            value="records" 
                            className="rounded-full data-[state=active]:bg-stone-800 data-[state=active]:text-white px-6 py-2.5 transition-all duration-300"
                        >
                            遊玩紀錄
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="collections" className="mt-0">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4"
                        >
                            {isLoadingCollections ? (
                                <div className="flex flex-col items-center justify-center py-20 bg-white/50 rounded-3xl border border-stone-100">
                                    <Loader2 className="w-8 h-8 text-emerald-500 animate-spin mb-4" />
                                    <p className="text-stone-400 font-medium">正在讀取收藏文章...</p>
                                </div>
                            ) : collectedArticles.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4">
                                    {collectedArticles.map(article => {
                                        const isTechArticle = ALL_TECH_ARTICLES.some(t => t.id === article.id);
                                        return (
                                        <div 
                                            key={article.id} 
                                            className="group flex gap-5 p-4 rounded-3xl bg-white border border-stone-100 hover:border-emerald-100 hover:shadow-lg hover:shadow-emerald-100/50 transition-all cursor-pointer" 
                                            onClick={() => setSelectedArticleId(article.id)}
                                        >
                                            {!isTechArticle && (
                                                <div className="w-28 h-28 shrink-0 rounded-2xl overflow-hidden relative shadow-inner">
                                                    <ImageWithFallback src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                </div>
                                            )}
                                            <div className="flex flex-col justify-center py-1 flex-1">
                                                <div className="mb-auto">
                                                    <Badge variant="secondary" className="mb-2 text-xs bg-emerald-50 text-emerald-700 hover:bg-emerald-100">{article.category}</Badge>
                                                    <h4 className="font-bold text-lg text-stone-800 line-clamp-2 leading-tight group-hover:text-emerald-700 transition-colors">{article.title}</h4>
                                                </div>
                                                <div className="flex items-center gap-4 text-xs text-stone-400 mt-2">
                                                    <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1.5" /> {article.date}</span>
                                                    <span className="flex items-center"><Eye className="w-3.5 h-3.5 mr-1.5" /> {readCounts[article.id] || 0}</span>
                                                </div>
                                            </div>
                                            <div className="self-center pr-2 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                                                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                                    <ArrowLeft className="w-5 h-5 rotate-180" />
                                                </div>
                                            </div>
                                        </div>
                                    )})}
                                </div>
                            ) : (
                                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-200">
                                    <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Bookmark className="w-8 h-8 text-stone-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-stone-600">還沒有收藏文章</h3>
                                    <p className="text-stone-400 mt-2">看到喜歡的文章，記得點擊愛心收藏喔！</p>
                                </div>
                            )}
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="settings" className="mt-0">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <Card className="border-0 shadow-lg shadow-stone-100 bg-white rounded-[2rem] overflow-hidden">
                                <CardHeader className="bg-gradient-to-r from-emerald-50 to-white pb-6 pt-6">
                                    <CardTitle className="text-xl flex items-center gap-3 text-stone-800">
                                        <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        每日遊玩時間限制
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-8 pt-6">
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-end">
                                            <div className="space-y-1">
                                                <Label className="text-base text-stone-600 flex items-center gap-2">
                                                    設定每日上限
                                                    {!isSettingsUnlocked && <Lock className="w-3.5 h-3.5 text-stone-400" />}
                                                </Label>
                                                <p className="text-xs text-stone-400">建議幼兒每日接觸螢幕時間不超過 30 分鐘</p>
                                            </div>
                                            <span className="text-3xl font-black text-emerald-500 font-mono tracking-tight">{dailyLimit}<span className="text-sm text-stone-400 font-sans ml-1 font-bold">分鐘</span></span>
                                        </div>
                                        
                                        <div className="relative py-2">
                                            {!isSettingsUnlocked && (
                                                <div 
                                                    className="absolute inset-0 z-20 cursor-pointer"
                                                    onClick={() => setShowPasswordDialog(true)}
                                                >
                                                    {/* Tooltip hint could go here */}
                                                </div>
                                            )}
                                            <div className={!isSettingsUnlocked ? "opacity-60 pointer-events-none" : ""}>
                                                <Slider 
                                                    value={[dailyLimit]} 
                                                    onValueChange={(val) => setDailyLimit(val[0])} 
                                                    onValueCommit={(val) => saveSettings({ dailyLimit: val[0] })}
                                                    max={60} 
                                                    step={5} 
                                                    className="py-4" 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-5 bg-amber-50 rounded-2xl text-sm text-amber-800 border border-amber-100/50 flex gap-4 items-start">
                                        <Shield className="w-5 h-5 shrink-0 mt-0.5" />
                                        <div>
                                            <div className="font-bold mb-1">家長安心鎖已啟用</div>
                                            <span className="opacity-80">設定時間一到，遊戲畫面將自動鎖定，並提醒孩子休息。這能有效幫助孩子建立良好的時間觀念。</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-lg shadow-stone-100 bg-white rounded-[2rem] overflow-hidden">
                                <CardHeader className="bg-gradient-to-r from-blue-50 to-white pb-6 pt-6">
                                    <CardTitle className="text-xl flex items-center gap-3 text-stone-800">
                                        <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                                            <Eye className="w-5 h-5" />
                                        </div>
                                        健康護眼模式
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6 pt-6">
                                    <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl">
                                        <div className="space-y-1">
                                            <Label className="text-base text-stone-700">藍光過濾</Label>
                                            <p className="text-xs text-stone-400">自動調節螢幕色溫，減少藍光刺激</p>
                                        </div>
                                        <Switch defaultChecked className="data-[state=checked]:bg-blue-500" />
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl">
                                        <div className="space-y-1">
                                            <Label className="text-base text-stone-700">休息提醒</Label>
                                            <p className="text-xs text-stone-400">每玩 15 分鐘跳出休息提醒動畫</p>
                                        </div>
                                        <Switch defaultChecked className="data-[state=checked]:bg-blue-500" />
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="records" className="mt-0">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4"
                        >
                           {gameRecords.length > 0 ? (
                               <Card className="border-0 shadow-lg shadow-stone-100 bg-white rounded-[2rem] overflow-hidden">
                                   <div className="overflow-x-auto">
                                       <Table>
                                           <TableHeader>
                                               <TableRow className="bg-stone-50/50 hover:bg-stone-50/50 border-stone-100">
                                                   <TableHead className="w-[150px] pl-6">日期</TableHead>
                                                   <TableHead>遊戲種類</TableHead>
                                                   <TableHead>分數</TableHead>
                                                   <TableHead className="text-right pr-6">遊玩時間</TableHead>
                                               </TableRow>
                                           </TableHeader>
                                           <TableBody>
                                               {gameRecords.map((record, idx) => (
                                                   <TableRow key={idx} className="hover:bg-stone-50/50 border-stone-100">
                                                       <TableCell className="font-medium text-stone-600 pl-6 py-4">
                                                           <div className="flex flex-col">
                                                               <span className="font-bold text-stone-700">{new Date(record.date).toLocaleDateString()}</span>
                                                               <span className="text-xs text-stone-400">{new Date(record.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                                           </div>
                                                       </TableCell>
                                                       <TableCell>
                                                            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100">
                                                                {record.gameType}
                                                            </Badge>
                                                       </TableCell>
                                                       <TableCell>
                                                           <span className="font-mono font-bold text-lg text-amber-500">{record.score}</span>
                                                       </TableCell>
                                                       <TableCell className="text-right font-mono pr-6 text-stone-500">{record.timePlayed} 秒</TableCell>
                                                   </TableRow>
                                               ))}
                                           </TableBody>
                                       </Table>
                                   </div>
                               </Card>
                           ) : (
                                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-200">
                                    <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Gamepad2 className="w-8 h-8 text-stone-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-stone-600">還沒有遊玩紀錄</h3>
                                    <p className="text-stone-400 mt-2">帶孩子去「親子遊戲區」玩一玩，紀錄就���出現在這裡喔！</p>
                                </div>
                           )}
                        </motion.div>
                    </TabsContent>
                </Tabs>
            </div>
       </div>

       <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
            <DialogContent className="sm:max-w-md rounded-3xl p-0 overflow-hidden border-0 shadow-2xl">
                <DialogHeader className="bg-stone-50 p-6 pb-4 border-b border-stone-100">
                    <DialogTitle className="text-xl font-bold text-stone-800 flex items-center gap-2">
                        <Lock className="w-5 h-5 text-emerald-600" />
                        家長驗證
                    </DialogTitle>
                    <DialogDescription className="text-stone-500">
                        為了避免孩子誤觸設定，請輸入您的會員密碼以解鎖。
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleVerifyPassword}>
                    <div className="p-6 space-y-4 bg-white">
                        <div className="space-y-2">
                            <Label htmlFor="verify-password">會員密碼</Label>
                            <Input
                                id="verify-password"
                                type="password"
                                placeholder="請輸入密碼"
                                value={verifyPassword}
                                onChange={(e) => setVerifyPassword(e.target.value)}
                                className="rounded-xl h-11 bg-stone-50"
                                autoFocus
                            />
                        </div>
                    </div>
                    <DialogFooter className="p-6 pt-2 bg-white flex gap-2">
                        <Button type="submit" className="rounded-xl bg-emerald-600 hover:bg-emerald-700 flex-1" disabled={isVerifying || !verifyPassword}>
                            {isVerifying ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Unlock className="w-4 h-4 mr-2" />}
                            驗證解鎖
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </div>
  );
}