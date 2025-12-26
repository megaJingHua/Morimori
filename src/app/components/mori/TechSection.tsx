import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Code, Cpu, ArrowRight, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

const TECH_ARTICLES = [
  {
    id: 1,
    title: "React 狀態管理：就像整理小孩的玩具箱",
    summary: "Redux 是阿公阿嬤家的大倉庫，Context 是客廳的收納櫃，State 是孩子手上的玩具。怎麼選？看你家多大。",
    date: "2024.12.25",
    tags: ["React", "Frontend", "ParentingLogic"],
    readTime: "6 min"
  },
  {
    id: 2,
    title: "為什麼我選擇 Tailwind：因為工程師也需要美感捷徑",
    summary: "以前寫 CSS 像是在畫油畫，現在寫 Tailwind 像是在玩樂高。對於沒有設計背景的爸爸來說，樂高顯然比較友善。",
    date: "2024.12.18",
    tags: ["CSS", "Tailwind", "DX"],
    readTime: "4 min"
  },
  {
    id: 3,
    title: "用 GitHub Actions 自動化家務？（如果可以的話）",
    summary: "如果倒垃圾也能寫成 CI/CD pipeline... 探討自動化思維如何應用在繁瑣的育兒生活中（雖然失敗率很高）。",
    date: "2024.12.10",
    tags: ["DevOps", "LifeHack"],
    readTime: "5 min"
  }
];

export function TechSection() {
  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      <div className="flex items-center justify-between mb-8 border-b border-stone-200 pb-6">
        <div>
            <h2 className="text-3xl font-bold text-stone-800 flex items-center gap-3">
                <Terminal className="w-8 h-8 text-slate-600" />
                技術心得
            </h2>
            <p className="text-stone-500 mt-2">
                工程師爸爸的實務筆記。用最清楚的邏輯，分享技術路上的風景。
            </p>
        </div>
        <div className="hidden md:block">
            <div className="bg-slate-100 p-4 rounded-xl text-slate-500 text-xs font-mono">
                <div>const vibe = "Professional but Warm";</div>
                <div>return vibe;</div>
            </div>
        </div>
      </div>

      <div className="space-y-6">
        {TECH_ARTICLES.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="group hover:border-slate-300 transition-all duration-300 hover:shadow-md cursor-pointer bg-white">
                <div className="flex flex-col md:flex-row">
                    <div className="p-6 md:p-8 flex-1 space-y-4">
                        <div className="flex items-center gap-3 text-xs text-slate-400 font-mono mb-2">
                            <span>{article.date}</span>
                            <span>•</span>
                            <span>{article.readTime} read</span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                            {article.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                            {article.summary}
                        </p>
                        <div className="flex items-center gap-2 pt-4">
                            {article.tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="bg-slate-100 text-slate-600 font-mono text-xs hover:bg-slate-200">
                                    #{tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <div className="md:w-32 flex items-center justify-center bg-slate-50 border-l border-slate-100 md:group-hover:bg-slate-100 transition-colors">
                        <ArrowRight className="w-6 h-6 text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                    </div>
                </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
