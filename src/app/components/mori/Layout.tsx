import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, User, BookOpen, Gamepad2, Code, Menu, X, Briefcase, LogOut, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth } from '../../context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "../ui/sheet";
import { getZodiac } from '../../utils/zodiac';

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  setView: (view: string) => void;
}

export function Layout({ children, currentView, setView }: LayoutProps) {
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'landing', label: '首頁', icon: Home },
    { id: 'parenting', label: '親子文章', icon: BookOpen },
    { id: 'games', label: '遊戲區', icon: Gamepad2 },
    { id: 'toolkit', label: '工具包', icon: Briefcase },
    { id: 'tech', label: '技術筆記', icon: Code },
  ];

  const handleNavClick = (view: string) => {
    setView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const zodiac = user ? getZodiac(user.user_metadata?.birthday) : null;

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100 h-16">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => handleNavClick('landing')}
          >
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
                M
            </div>
            <span className="text-xl font-bold text-emerald-950 tracking-tight hidden sm:block">
                森森邏輯
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-stone-100/50 p-1 rounded-full border border-stone-200/50">
            {navItems.map(item => (
                <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`
                        relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300
                        ${currentView === item.id 
                            ? 'text-emerald-700 bg-white shadow-sm' 
                            : 'text-stone-500 hover:text-stone-800 hover:bg-stone-200/50'}
                    `}
                >
                    <span className="relative z-10 flex items-center gap-1.5">
                        <item.icon className="w-4 h-4" />
                        {item.label}
                    </span>
                </button>
            ))}
          </nav>

          {/* User & Mobile Menu */}
          <div className="flex items-center gap-3">
             {user ? (
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-11 w-11 rounded-full p-0 hover:bg-transparent">
                             <Avatar className="h-10 w-10 border-2 border-white shadow-md bg-white transition-transform hover:scale-105">
                                {zodiac ? (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-50 to-amber-100 text-2xl">
                                        {zodiac.emoji}
                                    </div>
                                ) : (
                                    <>
                                        <AvatarImage src={`https://api.dicebear.com/7.x/micah/svg?seed=${user.id}`} alt={user.email || ''} />
                                        <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                                    </>
                                )}
                             </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 p-2 rounded-2xl shadow-xl border-stone-100/50 bg-white/95 backdrop-blur-sm" align="end" forceMount>
                        <DropdownMenuItem onClick={() => handleNavClick('member')} className="rounded-lg p-2.5 cursor-pointer focus:bg-emerald-50 focus:text-emerald-700 text-stone-600">
                            <User className="mr-3 h-4 w-4" />
                            <span className="font-medium">會員中心</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-stone-100 my-1" />
                         <DropdownMenuItem onClick={() => signOut()} className="rounded-lg p-2.5 cursor-pointer text-red-500 focus:bg-red-50 focus:text-red-600">
                            <LogOut className="mr-3 h-4 w-4" />
                            <span className="font-medium">登出</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                 </DropdownMenu>
             ) : (
                <Button 
                    variant="outline" 
                    className="rounded-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
                    onClick={() => handleNavClick('member')}
                >
                    <User className="w-4 h-4 mr-1.5" />
                    <span className="hidden sm:inline">登入 / 註冊</span>
                    <span className="sm:hidden">登入</span>
                </Button>
             )}

             {/* Mobile Menu Trigger */}
             <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="w-6 h-6 text-stone-600" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                    <SheetHeader className="sr-only">
                        <SheetTitle>導覽選單</SheetTitle>
                        <SheetDescription>網站導覽連結</SheetDescription>
                    </SheetHeader>
                    <div className="flex flex-col h-full pt-10 space-y-6">
                        {navItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item.id)}
                                className={`
                                    flex items-center gap-4 px-4 py-3 rounded-xl text-lg font-medium transition-colors
                                    ${currentView === item.id 
                                        ? 'bg-emerald-50 text-emerald-700' 
                                        : 'text-stone-600 hover:bg-stone-50'}
                                `}
                            >
                                <item.icon className="w-6 h-6" />
                                {item.label}
                            </button>
                        ))}
                    </div>
                </SheetContent>
             </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 px-4 md:px-8 pb-16 max-w-7xl mx-auto min-h-[calc(100vh-4rem)]">
         <AnimatePresence mode="wait">
            <motion.div
                key={currentView}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
            >
                {children}
            </motion.div>
         </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-100 py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
                 <div className="w-6 h-6 bg-stone-200 rounded flex items-center justify-center text-white text-xs font-bold">M</div>
                 <span className="font-bold text-stone-400">森森邏輯</span>
            </div>
            <p className="text-stone-400 text-sm">
                &copy; {new Date().getFullYear()} Mori Logic. All rights reserved.
            </p>
            <p className="text-stone-300 text-xs">
                Built with love by Engineer Mom Mega.
            </p>
        </div>
      </footer>
    </div>
  );
}