import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calculator, PiggyBank, CalendarRange, Lock, ArrowLeft, Plus, Trash2, X, Loader2, Cloud, Calendar, ChevronLeft, ChevronRight, Edit2, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../../../../utils/supabase/info';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";

interface ToolkitSectionProps {
  setView: (view: string) => void;
}

const SERVER_URL = `https://${projectId}.supabase.co/functions/v1/make-server-92f3175c`;

export function ToolkitSection({ setView }: ToolkitSectionProps) {
  const { user } = useAuth();
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    if (activeTool) {
        document.body.style.overflow = 'hidden';
        if (activeTool === 'calculator') {
             document.body.style.touchAction = 'none';
        } else {
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

  const handleToolClick = (tool: string) => {
      if (!user) {
          setShowLoginPrompt(true);
      } else {
          setActiveTool(tool);
      }
  };

  // Only show the active tool view if user is logged in and a tool is selected
  // (Though handleToolClick prevents selection if not logged in, this is a double check)
  if (user && activeTool) {
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
                    {activeTool === 'calendar' && <><Calendar className="w-5 h-5 text-purple-500" /> 心情行事曆</>}
                </div>
            </div>

            {/* Tool Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 overscroll-none scroll-smooth">
                <div className="max-w-3xl mx-auto min-h-full flex flex-col">
                    {activeTool === 'calculator' && <KidCalculator />}
                    {activeTool === 'allowance' && <AllowanceTracker />}
                    {activeTool === 'schedule' && <ClassSchedule />}
                    {activeTool === 'calendar' && <EmojiCalendar />}
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
                  登入會員即可免費使用所有工具，還能將資料儲存在雲端喔！
              </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ToolCard 
                  title="快樂計算機" 
                  description="色彩繽紛的大按鈕，幫你算算術！" 
                  icon={Calculator} 
                  color="bg-blue-50 text-blue-600"
                  onClick={() => handleToolClick('calculator')}
                  isLocked={!user}
              />
              <ToolCard 
                  title="零用錢小帳本" 
                  description="記下每一筆收入與支出，成為理財小達人。" 
                  icon={PiggyBank} 
                  color="bg-pink-50 text-pink-600"
                  onClick={() => handleToolClick('allowance')}
                  isLocked={!user}
              />
              <ToolCard 
                  title="我的課表" 
                  description="清楚記錄每天的課程，不再忘記帶課本。" 
                  icon={CalendarRange} 
                  color="bg-amber-50 text-amber-600"
                  onClick={() => handleToolClick('schedule')}
                  isLocked={!user}
              />
              <ToolCard 
                  title="心情行事曆" 
                  description="用可愛的圖案記錄每一天的心情與計畫！" 
                  icon={Calendar} 
                  color="bg-purple-50 text-purple-600"
                  onClick={() => handleToolClick('calendar')}
                  isLocked={!user}
              />
          </div>
      </div>

      <Dialog open={showLoginPrompt} onOpenChange={setShowLoginPrompt}>
        <DialogContent className="sm:max-w-md rounded-3xl">
            <DialogHeader>
                <DialogTitle className="text-center text-xl flex flex-col items-center gap-4 pt-4">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                        <Lock className="w-8 h-8 text-emerald-600" />
                    </div>
                    這是會員專屬功能
                </DialogTitle>
                <DialogDescription className="text-center text-stone-500 text-base pt-2">
                    為了幫你保存零用錢紀錄、課表和心情日記，<br/>
                    需要先登入或註冊會員才能使用喔！
                </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3 py-4">
                <Button 
                    onClick={() => {
                        setShowLoginPrompt(false);
                        setView('member');
                    }} 
                    className="w-full h-12 text-lg font-bold bg-emerald-500 hover:bg-emerald-600 rounded-xl"
                >
                    <LogIn className="w-5 h-5 mr-2" />
                    馬上登入 / 註冊
                </Button>
                <Button 
                    variant="ghost" 
                    onClick={() => setShowLoginPrompt(false)}
                    className="text-stone-400 hover:text-stone-600"
                >
                    先看看別的
                </Button>
            </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ToolCard({ title, description, icon: Icon, color, onClick, isLocked }: any) {
    return (
        <Card 
            className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 border-stone-100 overflow-hidden group h-full relative"
            onClick={onClick}
        >
            {isLocked && (
                <div className="absolute top-3 right-3 z-10">
                    <div className="bg-stone-100/80 backdrop-blur-sm p-1.5 rounded-full border border-stone-200">
                        <Lock className="w-4 h-4 text-stone-400" />
                    </div>
                </div>
            )}
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4 h-full relative">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${color} mb-2 group-hover:scale-110 transition-transform ${isLocked ? 'grayscale opacity-70' : ''}`}>
                    <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-stone-800">{title}</h3>
                <p className="text-stone-500 text-sm">{description}</p>
                {isLocked && (
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
                )}
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
    const [isSyncing, setIsSyncing] = useState(false);

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
        if (!session?.access_token) return;
        try {
            const res = await fetch(`${SERVER_URL}/allowance/records`, {
                headers: { 
                    'Authorization': `Bearer ${publicAnonKey}`,
                    'X-Access-Token': session.access_token
                }
            });
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            if (Array.isArray(data.records)) {
                setItems(data.records);
            }
        } catch (error) {
            console.error('Failed to fetch records', error);
        } finally {
            setIsLoading(false);
        }
    };

    const syncRecords = async (newRecords: typeof items) => {
        if (!session?.access_token) return;
        setIsSyncing(true);
        try {
            const res = await fetch(`${SERVER_URL}/allowance/records`, {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${publicAnonKey}`,
                    'X-Access-Token': session.access_token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ records: newRecords })
            });
            
            if (!res.ok) {
                const errText = await res.text();
                throw new Error(`Server error: ${res.status} ${errText}`);
            }
        } catch (error) {
            console.error('Failed to sync records', error);
            toast.error('儲存失敗，請檢查網路連線');
        } finally {
            setIsSyncing(false);
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
                    <div className="text-sm font-medium opacity-90 mb-1 flex items-center justify-center gap-2">
                        我的小豬撲滿
                        {isSyncing && <Loader2 className="w-3 h-3 animate-spin" />}
                    </div>
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
                    <div className="flex flex-col items-center justify-center py-12 text-stone-300 gap-3">
                        <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
                        <span className="text-sm">正在讀取小豬撲滿...</span>
                    </div>
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
    const { session } = useAuth();
    const days = ['週一', '週二', '週三', '週四', '週五'];
    const defaultPeriods = [
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

    const [schedule, setSchedule] = useState<Record<string, string>>({});
    const [periods, setPeriods] = useState(defaultPeriods);
    const [selectedCell, setSelectedCell] = useState<{day: string, periodId: string | number} | null>(null);
    const [isSyncing, setIsSyncing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (session?.access_token) {
            fetchSchedule();
        }
    }, [session]);

    const fetchSchedule = async () => {
        if (!session?.access_token) return;
        try {
            const res = await fetch(`${SERVER_URL}/schedule`, {
                headers: { 
                    'Authorization': `Bearer ${publicAnonKey}`,
                    'X-Access-Token': session.access_token
                }
            });
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            if (data.schedule) setSchedule(data.schedule);
            if (data.periods && Array.isArray(data.periods) && data.periods.length > 0) setPeriods(data.periods);
        } catch (error) {
            console.error('Failed to fetch schedule', error);
        } finally {
            setIsLoading(false);
        }
    };

    const syncSchedule = async (newSchedule: typeof schedule, newPeriods: typeof periods) => {
        if (!session?.access_token) return;
        setIsSyncing(true);
        try {
            await fetch(`${SERVER_URL}/schedule`, {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${publicAnonKey}`,
                    'X-Access-Token': session.access_token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ schedule: newSchedule, periods: newPeriods })
            });
        } catch (error) {
            console.error('Failed to sync schedule', error);
            toast.error('儲存失敗');
        } finally {
            setIsSyncing(false);
        }
    };

    const handleCellClick = (day: string, periodId: string | number) => {
        setSelectedCell({ day, periodId });
    };

    const handleSelectSubject = (emoji: string) => {
        if (!selectedCell) return;
        const key = `${selectedCell.day}-${selectedCell.periodId}`;
        const newSchedule = { ...schedule, [key]: emoji };
        setSchedule(newSchedule);
        setSelectedCell(null);
        syncSchedule(newSchedule, periods);
    };

    const handleClearCell = () => {
        if (!selectedCell) return;
        const key = `${selectedCell.day}-${selectedCell.periodId}`;
        const newSchedule = { ...schedule };
        delete newSchedule[key];
        setSchedule(newSchedule);
        setSelectedCell(null);
        syncSchedule(newSchedule, periods);
    };

    const handleTimeChange = (id: string | number, newTime: string) => {
        const newPeriods = periods.map(p => p.id === id ? { ...p, time: newTime } : p);
        setPeriods(newPeriods);
        syncSchedule(schedule, newPeriods);
    };

    return (
        <div className="max-w-4xl mx-auto overflow-x-auto pb-10">
            <div className="flex justify-between items-center mb-4 px-2">
                <h3 className="font-bold text-stone-700 flex items-center gap-2">
                    {isSyncing ? <Loader2 className="w-4 h-4 animate-spin text-amber-500" /> : <CalendarRange className="w-5 h-5 text-amber-500" />}
                    每週課表
                </h3>
                <div className="text-xs text-stone-400">點擊時間可以修改喔！</div>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 text-stone-300">
                    <Loader2 className="w-8 h-8 animate-spin text-amber-400 mb-2" />
                    讀取課表中...
                </div>
            ) : (
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
                            <div className="p-1 border-r border-stone-100 flex items-center justify-center bg-stone-50/30 group relative">
                                <Input
                                    value={period.time}
                                    onChange={(e) => handleTimeChange(period.id, e.target.value)}
                                    className="text-center text-xs font-mono text-stone-400 border-none bg-transparent h-full w-full focus:bg-white focus:text-stone-800 p-0 shadow-none focus-visible:ring-0 cursor-pointer hover:bg-white/80"
                                />
                                <Edit2 className="w-2 h-2 text-stone-300 absolute top-1 right-1 opacity-0 group-hover:opacity-100 pointer-events-none" />
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
            )}

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

function EmojiCalendar() {
    const { session } = useAuth();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState<{date: string, emoji: string}[]>([]);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSyncing, setIsSyncing] = useState(false);

    const eventEmojis = [
        '🎂', '🎉', '🏖️', '🏥', '🦷', '💇', '🎨', '🎹', 
        '🏊', '⚽', '🎬', '✈️', '🚗', '⛺', '🏠', '📅',
        '❤️', '⭐', '❗', '❓'
    ];

    useEffect(() => {
        if (session?.access_token) {
            fetchEvents();
        }
    }, [session]);

    const fetchEvents = async () => {
        if (!session?.access_token) return;
        try {
            const res = await fetch(`${SERVER_URL}/calendar/events`, {
                headers: { 
                    'Authorization': `Bearer ${publicAnonKey}`,
                    'X-Access-Token': session.access_token
                }
            });
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            if (Array.isArray(data.events)) setEvents(data.events);
        } catch (error) {
            console.error('Failed to fetch events', error);
        } finally {
            setIsLoading(false);
        }
    };

    const syncEvents = async (newEvents: typeof events) => {
        if (!session?.access_token) return;
        setIsSyncing(true);
        try {
            await fetch(`${SERVER_URL}/calendar/events`, {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${publicAnonKey}`,
                    'X-Access-Token': session.access_token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ events: newEvents })
            });
        } catch (error) {
            console.error('Failed to sync events', error);
            toast.error('儲存失敗');
        } finally {
            setIsSyncing(false);
        }
    };

    const handleMonthChange = (offset: number) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + offset);
        setCurrentDate(newDate);
    };

    const handleDateClick = (dateStr: string) => {
        setSelectedDate(dateStr);
    };

    const handleSelectEmoji = (emoji: string) => {
        if (!selectedDate) return;
        // Check if event already exists
        const existingIndex = events.findIndex(e => e.date === selectedDate);
        let newEvents;
        if (existingIndex >= 0) {
            newEvents = [...events];
            newEvents[existingIndex] = { date: selectedDate, emoji };
        } else {
            newEvents = [...events, { date: selectedDate, emoji }];
        }
        setEvents(newEvents);
        setSelectedDate(null);
        syncEvents(newEvents);
    };

    const handleClearEvent = () => {
        if (!selectedDate) return;
        const newEvents = events.filter(e => e.date !== selectedDate);
        setEvents(newEvents);
        setSelectedDate(null);
        syncEvents(newEvents);
    };

    // Calendar Grid Logic
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 = Sunday
        
        const days = [];
        // Add empty slots for previous month
        for (let i = 0; i < firstDayOfWeek; i++) {
            days.push(null);
        }
        // Add days
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }
        return days;
    };

    const days = getDaysInMonth(currentDate);
    const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
    const currentMonthStr = `${currentDate.getFullYear()}年 ${currentDate.getMonth() + 1}月`;

    return (
        <div className="max-w-2xl mx-auto pb-10">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-2xl shadow-sm border border-stone-100">
                <Button variant="ghost" onClick={() => handleMonthChange(-1)}>
                    <ChevronLeft className="w-5 h-5" />
                </Button>
                <div className="text-xl font-bold text-stone-800 flex items-center gap-2">
                    {currentMonthStr}
                    {isSyncing && <Loader2 className="w-4 h-4 animate-spin text-purple-400" />}
                </div>
                <Button variant="ghost" onClick={() => handleMonthChange(1)}>
                    <ChevronRight className="w-5 h-5" />
                </Button>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
                </div>
            ) : (
                <div className="bg-white rounded-3xl p-4 shadow-sm border border-stone-100">
                    <div className="grid grid-cols-7 mb-2">
                        {weekDays.map(d => (
                            <div key={d} className="text-center text-xs font-bold text-stone-400 py-2">
                                {d}
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1 md:gap-2">
                        {days.map((date, idx) => {
                            if (!date) return <div key={`empty-${idx}`} />;
                            
                            const dateStr = date.toLocaleDateString('zh-TW'); // Use locale format for storage key matching simplicty? No, better use consistent format.
                            // Let's use ISO date string YYYY-MM-DD for storage to be safe
                            const y = date.getFullYear();
                            const m = String(date.getMonth() + 1).padStart(2, '0');
                            const d = String(date.getDate()).padStart(2, '0');
                            const isoDate = `${y}-${m}-${d}`;

                            const event = events.find(e => e.date === isoDate);
                            const isToday = new Date().toDateString() === date.toDateString();

                            return (
                                <div 
                                    key={isoDate}
                                    onClick={() => handleDateClick(isoDate)}
                                    className={`
                                        aspect-square rounded-xl border flex flex-col items-center justify-start pt-2 cursor-pointer transition-all hover:bg-purple-50 hover:border-purple-200 relative
                                        ${isToday ? 'bg-purple-50 border-purple-200' : 'bg-white border-stone-100'}
                                    `}
                                >
                                    <span className={`text-xs font-bold ${isToday ? 'text-purple-600' : 'text-stone-600'}`}>
                                        {date.getDate()}
                                    </span>
                                    {event && (
                                        <div className="mt-1 text-2xl md:text-3xl animate-in zoom-in duration-200">
                                            {event.emoji}
                                        </div>
                                    )}
                                    {!event && (
                                        <Plus className="w-4 h-4 text-stone-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 hover:opacity-100" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <Dialog open={!!selectedDate} onOpenChange={(open) => !open && setSelectedDate(null)}>
                <DialogContent className="sm:max-w-sm rounded-3xl">
                    <DialogHeader>
                        <DialogTitle className="text-center text-xl">
                            {selectedDate && new Date(selectedDate).toLocaleDateString()}
                        </DialogTitle>
                        <DialogDescription className="text-center text-stone-500 text-sm">
                            今天有什麼特別的事情嗎？
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-5 gap-3 py-4">
                        {eventEmojis.map(emoji => (
                            <button
                                key={emoji}
                                onClick={() => handleSelectEmoji(emoji)}
                                className="aspect-square flex items-center justify-center text-3xl hover:bg-stone-50 rounded-xl transition-colors"
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                    <div className="flex justify-center border-t border-stone-100 pt-4 mt-2">
                        <Button variant="ghost" className="text-red-400 hover:text-red-500 hover:bg-red-50" onClick={handleClearEvent}>
                            <Trash2 className="w-4 h-4 mr-2" /> 清除標記
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
