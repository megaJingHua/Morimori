import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calculator, PiggyBank, CalendarRange, Lock, ArrowLeft, Plus, Trash2, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import { projectId } from '../../../../utils/supabase/info';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";

interface ToolkitSectionProps {
  setView: (view: string) => void;
}

const SERVER_URL = `https://${projectId}.supabase.co/functions/v1/make-server-92f3175c`;

export function ToolkitSection({ setView }: ToolkitSectionProps) {
  const { user } = useAuth();
  const [activeTool, setActiveTool] = useState<string | null>(null);

  useEffect(() => {
    if (activeTool) {
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // For calculator, strictly prevent touch actions to avoid zooming/scrolling
        if (activeTool === 'calculator') {
             document.body.style.touchAction = 'none';
        } else {
             // For others, prevent rubber-banding
             document.body.style.overscrollBehavior = 'none';
        }
    } else {
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
        document.body.style.overscrollBehavior = '';
    }
    return () => {
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
        document.body.style.overscrollBehavior = '';
    };
  }, [activeTool]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center">
          <Lock className="w-10 h-10 text-stone-400" />
        </div>
        <div className="space-y-2">
            <h2 className="text-2xl font-bold text-stone-800">會員專屬工具包</h2>
            <p className="text-stone-500 max-w-md mx-auto">
                這裡有專為小朋友設計的實用小工具，包含計算機、零用錢紀錄與課表。<br/>
                請先登入會員即可免費使用！
            </p>
        </div>
        <Button onClick={() => setView('member')} className="bg-emerald-600 hover:bg-emerald-700">
            前往登入
        </Button>
        {/* Hidden button trigger to redirect to member section if needed, 
            but better to just tell user to go to Member section. 
            Actually, I can't easily redirect via ID click if the button is in another component. 
            I'll just guide them to click the user icon or "Member" in menu.
            Or I can accept a prop to change view, but simpler is just a message.
        */}
      </div>
    );
  }

  if (activeTool) {
    return (
        <div className="fixed inset-0 z-50 bg-stone-50 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex-none px-4 py-3 bg-white/90 backdrop-blur-md shadow-sm flex items-center z-20">
                <Button variant="ghost" onClick={() => setActiveTool(null)} className="-ml-2 text-stone-500 hover:bg-stone-100">
                    <ArrowLeft className="w-5 h-5 mr-1" /> 返回
                </Button>
                <div className="flex items-center gap-2 ml-2 font-bold text-stone-700 text-lg">
                    {activeTool === 'calculator' && <><Calculator className="w-5 h-5 text-blue-500" /> 快樂計算機</>}
                    {activeTool === 'allowance' && <><PiggyBank className="w-5 h-5 text-pink-500" /> 零用錢小帳本</>}
                    {activeTool === 'schedule' && <><CalendarRange className="w-5 h-5 text-amber-500" /> 我的課表</>}
                </div>
            </div>

            {/* Tool Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 overscroll-none scroll-smooth">
                <div className="max-w-3xl mx-auto min-h-full flex flex-col">
                    {activeTool === 'calculator' && <KidCalculator />}
                    {activeTool === 'allowance' && <AllowanceTracker />}
                    {activeTool === 'schedule' && <ClassSchedule />}
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-8">
      <div className="space-y-8">
          <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-stone-800">萬能工具包</h2>
              <p className="text-stone-500">
                  選一個你需要的工具，開始練習管理自己的生活吧！
              </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ToolCard 
                  title="快樂計算機" 
                  description="色彩繽紛的大按鈕，幫你算算術！" 
                  icon={Calculator} 
                  color="bg-blue-50 text-blue-600"
                  onClick={() => setActiveTool('calculator')}
              />
              <ToolCard 
                  title="零用錢小帳本" 
                  description="記下每一筆收入與支出，成為理財小達人。" 
                  icon={PiggyBank} 
                  color="bg-pink-50 text-pink-600"
                  onClick={() => setActiveTool('allowance')}
              />
              <ToolCard 
                  title="我的課表" 
                  description="清楚記錄每天的課程，不再忘記帶課本。" 
                  icon={CalendarRange} 
                  color="bg-amber-50 text-amber-600"
                  onClick={() => setActiveTool('schedule')}
              />
          </div>
      </div>
    </div>
  );
}

function ToolCard({ title, description, icon: Icon, color, onClick }: any) {
    return (
        <Card 
            className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 border-stone-100 overflow-hidden group"
            onClick={onClick}
        >
            <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${color} mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-stone-800">{title}</h3>
                <p className="text-stone-500 text-sm">{description}</p>
            </CardContent>
        </Card>
    )
}

// --- Tools Implementation ---

function KidCalculator() {
    const [display, setDisplay] = useState('0');
    const [equation, setEquation] = useState('');

    const handlePress = (val: string) => {
        if (val === 'C') {
            setDisplay('0');
            setEquation('');
        } else if (val === '=') {
            try {
                // eslint-disable-next-line no-eval
                const result = eval(equation + display); 
                setDisplay(String(result));
                setEquation('');
            } catch (e) {
                setDisplay('Error');
            }
        } else if (['+', '-', '*', '/'].includes(val)) {
            setEquation(display + ' ' + val + ' ');
            setDisplay('0');
        } else {
            setDisplay(display === '0' ? val : display + val);
        }
    };

    const buttons = [
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        'C', '0', '=', '+'
    ];

    return (
        <div className="max-w-xs mx-auto w-full h-full flex flex-col justify-center py-4">
            <div className="bg-stone-900 p-4 rounded-3xl shadow-xl border-4 border-stone-800">
                <div className="bg-[#D4D4D2] h-20 mb-4 rounded-xl flex flex-col items-end justify-center px-4 font-mono">
                    <div className="text-stone-500 text-xs h-4">{equation}</div>
                    <div className="text-3xl text-stone-800 font-bold tracking-widest overflow-hidden w-full text-right">{display}</div>
                </div>
                
                <div className="grid grid-cols-4 gap-2">
                    {buttons.map(btn => (
                        <button
                            key={btn}
                            onClick={() => handlePress(btn)}
                            className={`
                                aspect-square rounded-full text-xl md:text-2xl font-bold shadow-[0_3px_0_0_rgba(0,0,0,0.2)] active:translate-y-[2px] active:shadow-none transition-all touch-none select-none flex items-center justify-center
                                ${btn === 'C' ? 'bg-red-400 text-white hover:bg-red-500' : ''}
                                ${btn === '=' ? 'bg-emerald-500 text-white hover:bg-emerald-600' : ''}
                                ${['+', '-', '*', '/'].includes(btn) ? 'bg-amber-400 text-white hover:bg-amber-500' : ''}
                                ${!['C', '=', '+', '-', '*', '/'].includes(btn) ? 'bg-white text-stone-700 hover:bg-stone-100' : ''}
                            `}
                        >
                            {btn === '*' ? '×' : btn === '/' ? '÷' : btn}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

function AllowanceTracker() {
    const { session } = useAuth();
    const [items, setItems] = useState<{id: string, icon: string, amount: number, type: 'income' | 'expense', date: string}[]>([]);
    const [selectedEmoji, setSelectedEmoji] = useState<string>('🍭');
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const emojis = [
        '🧧', '💰', '🍭', '🍦', '🧸', '📚', '✏️', '🎮', 
        '🧹', '🎁', '🌟', '👵', '🍔', '🚌'
    ];

    useEffect(() => {
        if (session?.access_token) {
            fetchRecords();
        }
    }, [session]);

    const fetchRecords = async () => {
        try {
            const res = await fetch(`${SERVER_URL}/allowance/records`, {
                headers: { Authorization: `Bearer ${session?.access_token}` }
            });
            const data = await res.json();
            if (data.records) {
                setItems(data.records);
            }
        } catch (error) {
            console.error('Failed to fetch records', error);
        } finally {
            setIsLoading(false);
        }
    };

    const syncRecords = async (newRecords: typeof items) => {
        try {
            await fetch(`${SERVER_URL}/allowance/records`, {
                method: 'POST',
                headers: { 
                    Authorization: `Bearer ${session?.access_token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ records: newRecords })
            });
        } catch (error) {
            console.error('Failed to sync records', error);
            toast.error('儲存失敗，請檢查網路');
        }
    };

    const handleAdd = (type: 'income' | 'expense') => {
        if (!amount) return;
        const newItem = {
            id: Date.now().toString(),
            icon: selectedEmoji,
            amount: parseInt(amount),
            type,
            date: new Date().toLocaleDateString()
        };
        const newRecords = [...items, newItem];
        setItems(newRecords);
        setAmount('');
        syncRecords(newRecords);
        toast.success(type === 'income' ? '存進去囉！' : '花掉囉！');
    };

    const handleDelete = (id: string) => {
        const newRecords = items.filter(i => i.id !== id);
        setItems(newRecords);
        syncRecords(newRecords);
    };

    const totalIncome = items.filter(i => i.type === 'income').reduce((acc, cur) => acc + cur.amount, 0);
    const totalExpense = items.filter(i => i.type === 'expense').reduce((acc, cur) => acc + cur.amount, 0);
    const balance = totalIncome - totalExpense;

    return (
        <div className="max-w-2xl mx-auto pb-10">
            {/* Balance Card */}
            <div className="bg-gradient-to-br from-yellow-300 to-amber-400 rounded-3xl p-6 text-center text-white shadow-lg mb-8 relative overflow-hidden">
                <div className="relative z-10">
                    <div className="text-sm font-medium opacity-90 mb-1">我的小豬撲滿</div>
                    <div className="text-5xl font-black tracking-tight drop-shadow-md">
                        ${balance}
                    </div>
                </div>
                <div className="absolute -bottom-4 -right-4 opacity-20 rotate-12">
                    <PiggyBank className="w-32 h-32" />
                </div>
            </div>

            {/* Input Area */}
            <div className="bg-white p-6 rounded-3xl mb-8 space-y-6 shadow-sm border border-stone-100">
                {/* 1. Pick Emoji */}
                <div className="space-y-3">
                    <Label className="text-center block text-stone-500 text-xs">這是什麼？</Label>
                    <div className="flex flex-wrap justify-center gap-3">
                        {emojis.map(emoji => (
                            <button
                                key={emoji}
                                onClick={() => setSelectedEmoji(emoji)}
                                className={`w-12 h-12 text-3xl rounded-xl transition-all ${selectedEmoji === emoji ? 'bg-white shadow-md scale-110 border-2 border-emerald-400' : 'bg-stone-50 hover:bg-white hover:scale-105'}`}
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 2. Amount & Action */}
                <div className="flex items-center justify-center gap-4">
                     <div className="w-32">
                         <Label className="text-center block text-stone-500 text-xs mb-2">多少錢？</Label>
                         <Input 
                            type="number" 
                            placeholder="$" 
                            className="text-center text-2xl font-bold h-14 rounded-2xl bg-stone-50 border-stone-200"
                            value={amount} 
                            onChange={e => setAmount(e.target.value)} 
                        />
                     </div>
                     <div className="flex items-end gap-3 pb-1">
                        <Button 
                            onClick={() => handleAdd('income')} 
                            className="h-14 w-14 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-200 shadow-lg text-2xl"
                        >
                            <Plus className="w-8 h-8" />
                        </Button>
                        <Button 
                            onClick={() => handleAdd('expense')} 
                            className="h-14 w-14 rounded-2xl bg-red-400 hover:bg-red-500 text-white shadow-red-200 shadow-lg text-2xl"
                        >
                            <div className="w-6 h-1 bg-white rounded-full"></div>
                        </Button>
                     </div>
                </div>
            </div>

            {/* History List */}
            <div className="space-y-3">
                {isLoading ? (
                    <div className="text-center py-8 text-stone-300">載入中...</div>
                ) : items.length === 0 ? (
                    <div className="text-center py-8 text-stone-300">
                        <PiggyBank className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>還沒有紀錄喔！</p>
                    </div>
                ) : (
                    items.slice().reverse().map(item => (
                        <div key={item.id} className="flex items-center justify-between bg-white border border-stone-100 p-4 rounded-2xl shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="text-3xl">{item.icon}</div>
                                <div className="text-xs text-stone-400">{item.date}</div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className={`text-xl font-bold font-mono ${item.type === 'income' ? 'text-emerald-500' : 'text-red-500'}`}>
                                    {item.type === 'income' ? '+' : '-'}{item.amount}
                                </div>
                                <button onClick={() => handleDelete(item.id)} className="w-8 h-8 flex items-center justify-center rounded-full text-stone-300 hover:bg-red-50 hover:text-red-500 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

function ClassSchedule() {
    const days = ['週一', '週二', '週三', '週四', '週五'];
    const periods = [
        { id: 1, time: '08:00' },
        { id: 2, time: '09:00' },
        { id: 3, time: '10:00' },
        { id: 4, time: '11:00' },
        { id: 'lunch', time: '12:00', label: '午休' },
        { id: 5, time: '13:00' },
        { id: 6, time: '14:00' },
        { id: 7, time: '15:00' },
        { id: 8, time: '16:00' },
    ];

    const subjectEmojis = [
        { emoji: '📖', name: '國語' },
        { emoji: '📐', name: '數學' },
        { emoji: '🅰️', name: '英文' },
        { emoji: '🌿', name: '自然' },
        { emoji: '🌏', name: '社會' },
        { emoji: '🎵', name: '音樂' },
        { emoji: '🏀', name: '體育' },
        { emoji: '🎨', name: '美術' },
        { emoji: '💻', name: '電腦' },
        { emoji: '🧩', name: '綜合' },
        { emoji: '📚', name: '閱讀' },
        { emoji: '🍱', name: '午休' },
        { emoji: '🧹', name: '打掃' },
        { emoji: '💤', name: '休息' },
    ];

    // Simple state for demo. In real app, sync with DB.
    const [schedule, setSchedule] = useState<Record<string, string>>({});
    const [selectedCell, setSelectedCell] = useState<{day: string, periodId: string | number} | null>(null);

    const handleCellClick = (day: string, periodId: string | number) => {
        setSelectedCell({ day, periodId });
    };

    const handleSelectSubject = (emoji: string) => {
        if (!selectedCell) return;
        const key = `${selectedCell.day}-${selectedCell.periodId}`;
        setSchedule(prev => ({ ...prev, [key]: emoji }));
        setSelectedCell(null);
    };

    const handleClearCell = () => {
        if (!selectedCell) return;
        const key = `${selectedCell.day}-${selectedCell.periodId}`;
        const newSchedule = { ...schedule };
        delete newSchedule[key];
        setSchedule(newSchedule);
        setSelectedCell(null);
    };

    return (
        <div className="max-w-4xl mx-auto overflow-x-auto pb-10">
            <div className="min-w-[600px] border border-stone-200 rounded-xl overflow-hidden shadow-sm bg-white">
                <div className="grid grid-cols-6 bg-stone-50 border-b border-stone-200">
                    <div className="p-3 text-center text-sm font-bold text-stone-500 border-r border-stone-200">時間</div>
                    {days.map(day => (
                        <div key={day} className="p-3 text-center text-sm font-bold text-stone-700 border-r border-stone-200 last:border-r-0">
                            {day}
                        </div>
                    ))}
                </div>
                {periods.map(period => (
                    <div key={period.id} className="grid grid-cols-6 border-b border-stone-100 last:border-b-0 hover:bg-stone-50/50 transition-colors">
                        <div className="p-3 text-center text-xs font-mono text-stone-400 border-r border-stone-100 flex items-center justify-center bg-stone-50/30">
                            {period.time}
                        </div>
                        {period.id === 'lunch' ? (
                            <div className="col-span-5 p-2 bg-stone-100/50 text-center text-stone-400 text-sm flex items-center justify-center tracking-widest">
                                --- 午休時間 ---
                            </div>
                        ) : (
                            days.map(day => {
                                const key = `${day}-${period.id}`;
                                const val = schedule[key];
                                return (
                                    <div 
                                        key={day} 
                                        onClick={() => handleCellClick(day, period.id)}
                                        className="p-2 border-r border-stone-100 last:border-r-0 min-h-[60px] cursor-pointer hover:bg-amber-50 transition-colors flex items-center justify-center text-center relative group"
                                    >
                                        {val ? (
                                            <span className="text-3xl filter drop-shadow-sm transition-transform group-hover:scale-110">
                                                {val}
                                            </span>
                                        ) : (
                                            <Plus className="w-4 h-4 text-stone-200 opacity-0 group-hover:opacity-100" />
                                        )}
                                    </div>
                                );
                            })
                        )}
                    </div>
                ))}
            </div>

            <Dialog open={!!selectedCell} onOpenChange={(open) => !open && setSelectedCell(null)}>
                <DialogContent className="sm:max-w-sm rounded-3xl">
                    <DialogHeader>
                        <DialogTitle className="text-center text-xl">選擇課程</DialogTitle>
                        <DialogDescription className="text-center text-stone-500 text-sm">
                            請選擇一個代表課程的圖案
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-4 gap-4 py-4">
                        {subjectEmojis.map(subject => (
                            <button
                                key={subject.name}
                                onClick={() => handleSelectSubject(subject.emoji)}
                                className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl hover:bg-stone-50 transition-colors"
                            >
                                <span className="text-4xl">{subject.emoji}</span>
                                <span className="text-xs text-stone-500">{subject.name}</span>
                            </button>
                        ))}
                    </div>
                    <div className="flex justify-center border-t border-stone-100 pt-4 mt-2">
                        <Button variant="ghost" className="text-red-400 hover:text-red-500 hover:bg-red-50" onClick={handleClearCell}>
                            <Trash2 className="w-4 h-4 mr-2" /> 清除格子
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
