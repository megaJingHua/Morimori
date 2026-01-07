import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Moon, Home, Lock, Unlock, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useGameTime } from '../../context/GameTimeContext';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

interface TimeUpOverlayProps {
    onExit: () => void;
}

export function TimeUpOverlay({ onExit }: TimeUpOverlayProps) {
    const { dailyLimit, setDailyLimit } = useGameTime();
    const { user, supabase } = useAuth();
    const [showUnlock, setShowUnlock] = useState(false);
    const [password, setPassword] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);

    const handleUnlock = async () => {
        if (!password) return;

        // If guest, use default code
        if (!user || !user.email) {
             if (password === '8888') {
                setDailyLimit(dailyLimit + 15);
                toast.success("已延長 15 分鐘遊戲時間！");
                setPassword('');
                setShowUnlock(false);
            } else {
                toast.error("密碼錯誤 (訪客預設: 8888)");
                setPassword('');
            }
            return;
        }

        setIsVerifying(true);
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: user.email,
                password: password
            });

            if (error) {
                console.error("Unlock failed:", error.message);
                toast.error("密碼錯誤，請重試");
                setPassword('');
            } else {
                setDailyLimit(dailyLimit + 15);
                toast.success("驗證成功！已延長 15 分鐘遊戲時間");
                setPassword('');
                setShowUnlock(false);
            }
        } catch (err) {
            console.error("Unlock error:", err);
            toast.error("驗證發生錯誤");
        } finally {
            setIsVerifying(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleUnlock();
        }
    };

    return (
        <div className="fixed inset-0 z-[100] bg-stone-900/95 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="max-w-md w-full bg-white rounded-3xl p-8 text-center space-y-6 shadow-2xl relative overflow-hidden"
            >
                {!showUnlock ? (
                    <>
                        <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
                            <Moon className="w-12 h-12 text-indigo-500" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold text-stone-800">眼睛該休息囉！</h2>
                            <p className="text-stone-500 leading-relaxed">
                                今天的遊戲時間結束了。<br/>
                                讓我們一起去喝杯水、看看遠方，休息一下吧！
                            </p>
                        </div>
                        <div className="pt-4 space-y-3">
                            <Button onClick={onExit} size="lg" className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 h-12 text-lg">
                                <Home className="w-5 h-5 mr-2" />
                                回到大廳
                            </Button>
                            
                            <Button 
                                variant="ghost" 
                                onClick={() => setShowUnlock(true)}
                                className="w-full text-stone-400 hover:text-stone-600 text-sm"
                            >
                                <Lock className="w-4 h-4 mr-2" />
                                家長專區：延長時間
                            </Button>
                        </div>
                    </>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto">
                            <Lock className="w-8 h-8 text-stone-400" />
                        </div>
                        
                        <div>
                            <h2 className="text-xl font-bold text-stone-800 mb-2">家長驗證</h2>
                            <p className="text-sm text-stone-500">
                                {user ? "請輸入您的登入密碼以解鎖" : "請輸入管理密碼 (訪客: 8888)"}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <Input 
                                type="password" 
                                placeholder="請輸入密碼" 
                                className="text-center text-lg tracking-widest"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={handleKeyDown}
                                autoFocus
                                disabled={isVerifying}
                            />
                            
                            <div className="flex gap-3">
                                <Button 
                                    variant="outline" 
                                    className="flex-1 rounded-xl"
                                    onClick={() => setShowUnlock(false)}
                                    disabled={isVerifying}
                                >
                                    取消
                                </Button>
                                <Button 
                                    className="flex-1 rounded-xl bg-indigo-600 hover:bg-indigo-700"
                                    onClick={handleUnlock}
                                    disabled={isVerifying || !password}
                                >
                                    {isVerifying ? (
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    ) : (
                                        <Unlock className="w-4 h-4 mr-2" />
                                    )}
                                    {isVerifying ? "驗證中..." : "解鎖"}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
