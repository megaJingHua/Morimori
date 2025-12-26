import React from 'react';
import { motion } from 'motion/react';
import { User, Settings, Clock, Award, Star, Shield, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export function MemberSection() {
  return (
    <div className="max-w-4xl mx-auto py-8">
       <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-stone-800">家長設定中心</h2>
            <p className="text-stone-500 mt-2">守護孩子的數位健康，從這裡開始。</p>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar / Profile Card */}
            <div className="lg:col-span-1 space-y-6">
                <Card className="border-none shadow-md overflow-hidden bg-white">
                    <div className="h-24 bg-gradient-to-r from-emerald-100 to-teal-100"></div>
                    <CardContent className="relative pt-0 pb-8 px-6 text-center">
                        <Avatar className="w-24 h-24 border-4 border-white shadow-sm mx-auto -mt-12 mb-4">
                            <AvatarImage src="https://api.dicebear.com/7.x/micah/svg?seed=MoriMom" />
                            <AvatarFallback>M</AvatarFallback>
                        </Avatar>
                        <h3 className="text-xl font-bold text-stone-800">寶哥媽媽</h3>
                        <p className="text-sm text-stone-500 mb-6">加入森森邏輯第 128 天</p>
                        
                        <div className="flex justify-center gap-4 text-sm">
                            <div className="text-center p-3 bg-stone-50 rounded-xl flex-1">
                                <div className="font-bold text-stone-800 text-lg">12</div>
                                <div className="text-stone-400 text-xs">文章收藏</div>
                            </div>
                            <div className="text-center p-3 bg-stone-50 rounded-xl flex-1">
                                <div className="font-bold text-emerald-600 text-lg">5h</div>
                                <div className="text-stone-400 text-xs">本週陪伴</div>
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
                <Tabs defaultValue="settings" className="w-full">
                    <TabsList className="w-full justify-start bg-transparent p-0 border-b border-stone-200 mb-6 rounded-none h-auto">
                        <TabsTrigger 
                            value="settings" 
                            className="rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3"
                        >
                            遊戲管理
                        </TabsTrigger>
                        <TabsTrigger 
                            value="records" 
                            className="rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3"
                        >
                            遊玩紀錄
                        </TabsTrigger>
                    </TabsList>

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
                                            <Label>平日 (週一至週五)</Label>
                                            <span className="text-emerald-600 font-bold">20 分鐘</span>
                                        </div>
                                        <Slider defaultValue={[20]} max={60} step={5} className="py-4" />
                                        <p className="text-xs text-stone-400">建議幼兒每日接觸螢幕時間不超過 30 分鐘</p>
                                    </div>
                                    
                                    <div className="space-y-4 pt-4 border-t border-stone-100">
                                        <div className="flex justify-between">
                                            <Label>假日 (週六、日)</Label>
                                            <span className="text-emerald-600 font-bold">40 分鐘</span>
                                        </div>
                                        <Slider defaultValue={[40]} max={90} step={5} className="py-4" />
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
                            <Card className="bg-stone-50 border-none">
                                <CardContent className="p-8 text-center space-y-4">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                                        <Lock className="w-8 h-8 text-stone-300" />
                                    </div>
                                    <h3 className="text-lg font-bold text-stone-600">會員專屬功能</h3>
                                    <p className="text-stone-500 text-sm max-w-xs mx-auto">
                                        此功能為會員限定。在這裡，您可以查看孩子最喜歡玩哪類遊戲，以及專注力的變化曲線。
                                    </p>
                                    <Button variant="outline" className="mt-4">
                                        升級完整會員
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </TabsContent>
                </Tabs>
            </div>
       </div>
    </div>
  );
}
