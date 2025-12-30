import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, PiggyBank, CalendarRange, Lock, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { toast } from 'sonner';

interface ToolkitSectionProps {
  setView: (view: string) => void;
}

export function ToolkitSection({ setView }: ToolkitSectionProps) {
  const { user } = useAuth();
  const [activeTool, setActiveTool] = useState<string | null>(null);

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

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-8">
      {!activeTool ? (
        <div className="space-y-8">
            <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold text-stone-800">小學生的萬能工具包</h2>
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
      ) : (
        <div className="space-y-6">
            <Button variant="ghost" onClick={() => setActiveTool(null)} className="pl-0 text-stone-500 hover:text-stone-800 hover:bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" /> 返回工具列表
            </Button>
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-stone-100 min-h-[500px]"
            >
                {activeTool === 'calculator' && <KidCalculator />}
                {activeTool === 'allowance' && <AllowanceTracker />}
                {activeTool === 'schedule' && <ClassSchedule />}
            </motion.div>
        </div>
      )}
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
        <div className="max-w-xs mx-auto space-y-6">
            <div className="text-center space-y-2 mb-8">
                <h3 className="text-2xl font-bold text-blue-600 flex items-center justify-center gap-2">
                    <Calculator className="w-6 h-6" /> 快樂計算機
                </h3>
            </div>
            
            <div className="bg-stone-900 p-6 rounded-3xl shadow-xl border-4 border-stone-800">
                <div className="bg-[#D4D4D2] h-24 mb-6 rounded-xl flex flex-col items-end justify-center px-4 font-mono">
                    <div className="text-stone-500 text-sm h-6">{equation}</div>
                    <div className="text-4xl text-stone-800 font-bold tracking-widest overflow-hidden w-full text-right">{display}</div>
                </div>
                
                <div className="grid grid-cols-4 gap-3">
                    {buttons.map(btn => (
                        <button
                            key={btn}
                            onClick={() => handlePress(btn)}
                            className={`
                                h-16 rounded-full text-2xl font-bold shadow-[0_4px_0_0_rgba(0,0,0,0.2)] active:translate-y-[2px] active:shadow-none transition-all
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
    const [items, setItems] = useState<{id: number, icon: string, amount: number, type: 'income' | 'expense', date: string}[]>([]);
    const [selectedEmoji, setSelectedEmoji] = useState<string>('🍭');
    const [amount, setAmount] = useState('');

    const emojis = [
        '🧧', '💰', '🍭', '🍦', '🧸', '📚', '✏️', '🎮', 
        '🧹', '🎁', '🌟', '👵', '🍔', '🚌'
    ];

    const handleAdd = (type: 'income' | 'expense') => {
        if (!amount) return;
        setItems([...items, {
            id: Date.now(),
            icon: selectedEmoji,
            amount: parseInt(amount),
            type,
            date: new Date().toLocaleDateString()
        }]);
        setAmount('');
        toast.success(type === 'income' ? '存進去囉！' : '花掉囉！');
    };

    const handleDelete = (id: number) => {
        setItems(items.filter(i => i.id !== id));
    };

    const totalIncome = items.filter(i => i.type === 'income').reduce((acc, cur) => acc + cur.amount, 0);
    const totalExpense = items.filter(i => i.type === 'expense').reduce((acc, cur) => acc + cur.amount, 0);
    const balance = totalIncome - totalExpense;

    return (
        <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-pink-600 flex items-center justify-center gap-2">
                    <PiggyBank className="w-6 h-6" /> 零用錢小帳本
                </h3>
            </div>

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
            <div className="bg-stone-50 p-6 rounded-3xl mb-8 space-y-6">
                {/* 1. Pick Emoji */}
                <div className="space-y-3">
                    <Label className="text-center block text-stone-500 text-xs">這是什麼？</Label>
                    <div className="flex flex-wrap justify-center gap-3">
                        {emojis.map(emoji => (
                            <button
                                key={emoji}
                                onClick={() => setSelectedEmoji(emoji)}
                                className={`w-12 h-12 text-3xl rounded-xl transition-all ${selectedEmoji === emoji ? 'bg-white shadow-md scale-110 border-2 border-emerald-400' : 'bg-white/50 hover:bg-white hover:scale-105'}`}
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
                            className="text-center text-2xl font-bold h-14 rounded-2xl bg-white border-stone-200"
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
                {items.length === 0 ? (
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

    // Simple state for demo. In real app, sync with DB.
    const [schedule, setSchedule] = useState<Record<string, string>>({});

    const handleCellClick = (day: string, periodId: string | number) => {
        const key = `${day}-${periodId}`;
        const current = schedule[key] || '';
        const input = prompt('請輸入課程名稱：', current);
        if (input !== null) {
            setSchedule(prev => ({ ...prev, [key]: input }));
        }
    };

    return (
        <div className="max-w-4xl mx-auto overflow-x-auto">
             <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-amber-600 flex items-center justify-center gap-2">
                    <CalendarRange className="w-6 h-6" /> 我的課表
                </h3>
                <p className="text-xs text-stone-400 mt-2">點擊格子可以編輯課程喔！</p>
            </div>

            <div className="min-w-[600px] border border-stone-200 rounded-xl overflow-hidden">
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
                                        className="p-2 border-r border-stone-100 last:border-r-0 min-h-[60px] cursor-pointer hover:bg-white transition-colors flex items-center justify-center text-center relative group"
                                    >
                                        {val ? (
                                            <span className="font-bold text-stone-700 text-sm bg-amber-100/50 px-2 py-1 rounded-md w-full block">
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
        </div>
    );
}
