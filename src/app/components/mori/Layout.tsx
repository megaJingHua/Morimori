import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TreePine, BookOpen, Gamepad2, Code, User, Menu, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Toaster } from 'sonner';

// Let's assume standard shadcn utils are at src/app/components/ui/utils.ts or src/lib/utils.ts. 
// Based on file list: /src/app/components/ui/utils.ts exists. So path is ../ui/utils
import { cn } from '../ui/utils';

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  setView: (view: string) => void;
}

export function Layout({ children, currentView, setView }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'parenting', label: '親子文章', icon: BookOpen, color: 'text-orange-600' },
    { id: 'games', label: '親子遊戲', icon: Gamepad2, color: 'text-emerald-600' },
    { id: 'tech', label: '技術文章', icon: Code, color: 'text-slate-600' },
    { id: 'member', label: '會員中心', icon: User, color: 'text-indigo-600' },
  ];

  const handleNavClick = (id: string) => {
    setView(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 selection:bg-emerald-200">
      {/* Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200/50 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setView('landing')}
          >
            <div className="bg-emerald-100 p-2 rounded-xl group-hover:bg-emerald-200 transition-colors">
              <TreePine className="w-6 h-6 text-emerald-700" />
            </div>
            <span className="text-xl font-bold tracking-tight text-emerald-900">森森邏輯</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  "flex items-center gap-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100/50 rounded-full px-4 transition-all",
                  currentView === item.id && "bg-stone-100 font-medium text-stone-900"
                )}
                onClick={() => handleNavClick(item.id)}
              >
                <item.icon className={cn("w-4 h-4", currentView === item.id ? item.color : "text-stone-400")} />
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="w-6 h-6 text-stone-600" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-stone-50 border-stone-200">
                <div className="flex flex-col gap-6 mt-8">
                  <div className="flex items-center gap-2 px-2" onClick={() => handleNavClick('landing')}>
                    <div className="bg-emerald-100 p-2 rounded-xl">
                      <TreePine className="w-6 h-6 text-emerald-700" />
                    </div>
                    <span className="text-xl font-bold text-emerald-900">森森邏輯</span>
                  </div>
                  <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                      <Button
                        key={item.id}
                        variant="ghost"
                        className={cn(
                          "justify-start text-lg h-12 rounded-xl",
                          currentView === item.id ? "bg-white shadow-sm" : "hover:bg-stone-100"
                        )}
                        onClick={() => handleNavClick(item.id)}
                      >
                        <item.icon className={cn("w-5 h-5 mr-3", item.color)} />
                        {item.label}
                      </Button>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-12 min-h-screen">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-100 py-12 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <TreePine className="w-5 h-5 text-emerald-700/50" />
            <span className="font-semibold text-stone-600">森森邏輯</span>
          </div>
          <p className="text-stone-400 text-sm">陪伴孩子，也陪伴你的邏輯森林。</p>
          <div className="mt-8 flex justify-center gap-6 text-sm text-stone-400">
            <button onClick={() => setView('parenting')} className="hover:text-emerald-600 transition-colors">親子文章</button>
            <button onClick={() => setView('games')} className="hover:text-emerald-600 transition-colors">親子遊戲</button>
            <button onClick={() => setView('tech')} className="hover:text-emerald-600 transition-colors">技術心得</button>
          </div>
          <p className="text-stone-300 text-xs mt-8">© 2024 Mori Mori Logic. All rights reserved.</p>
        </div>
      </footer>
      <Toaster />
    </div>
  );
}
