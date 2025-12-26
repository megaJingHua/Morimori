import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { projectId, publicAnonKey } from "../../../../utils/supabase/info";
import {
  BookOpen,
  Gamepad2,
  Code,
  ArrowRight,
  Heart,
  Sparkles,
  User,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import heroBackground from "figma:asset/a41565d229b93ac7f93d417944180fbbb5e805e0.png";
import parentingImage from "figma:asset/b803e547aecb3c070801f0296790f71bfd2e84e6.png";
import parentingGamesImage from "figma:asset/3a8f0f48e24c2cab1407dbd993d75ebd041c2123.png";
import technicalImage from "figma:asset/a2e2ff1fcf8ffa0e08683bfc79e7372882b549b3.png";

interface LandingPageProps {
  setView: (view: string) => void;
}

export function LandingPage({ setView }: LandingPageProps) {
  const [visitCount, setVisitCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
        try {
            const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-92f3175c/visit-count`, {
                headers: {
                    'Authorization': `Bearer ${publicAnonKey}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setVisitCount(data.count);
            }
        } catch (error) {
            console.error('Failed to fetch visit count:', error);
        }
    };
    fetchCount();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-emerald-50 aspect-[16/9] md:aspect-[21/9] flex items-center justify-center text-center p-8 md:p-16">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={heroBackground}
            alt="Forest Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-sm text-emerald-800 text-sm font-medium mb-4 shadow-sm border border-white/50">
              給 3-6 歲孩子家長的溫柔陪伴
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-bold text-emerald-950 tracking-tight leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            森森邏輯
            <br />
            <span className="text-2xl md:text-3xl font-normal text-emerald-800 mt-2 block">
              陪你在育兒森林裡深呼吸
            </span>
          </motion.h1>

          <motion.p
            className="text-stone-600 text-lg md:text-xl leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            這裡沒有完美的教養SOP，只有被理解的溫暖、好玩的親子遊戲，還有一點點工程師媽媽的邏輯思考。
          </motion.p>

          {visitCount !== null && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-center gap-2 pt-4"
            >
                <div className="flex items-center gap-2 bg-white/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/50 shadow-sm hover:bg-white/50 transition-colors cursor-default">
                    <User className="w-4 h-4 text-emerald-700" />
                    <span className="text-sm text-emerald-900 font-medium">
                        已有 <span className="font-bold text-emerald-700">{visitCount.toLocaleString()}</span> 位家長造訪
                    </span>
                </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Feature Cards */}
      <motion.section
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {/* Parenting Articles */}
        <motion.div variants={item} className="h-full">
          <Card 
            className="h-full border-none shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group bg-orange-50/50 cursor-pointer"
            onClick={() => setView("parenting")}
          >
            <div className="h-48 overflow-hidden relative">
              <ImageWithFallback
                src={parentingImage}
                alt="Reading together"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-white/90 p-2 rounded-xl shadow-sm">
                <BookOpen className="w-6 h-6 text-orange-500" />
              </div>
            </div>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-2xl font-bold text-stone-800">
                親子文章
              </h3>
              <p className="text-stone-600 leading-relaxed">
                被理解、被安慰的溫柔文字。這裡不談大道理，只談我們共同經歷的育兒酸甜。
              </p>
              <Button
                variant="ghost"
                className="text-orange-600 hover:text-orange-700 hover:bg-orange-100 p-0 h-auto font-medium"
                onClick={() => setView("parenting")}
              >
                開始閱讀 <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Parenting Games */}
        <motion.div variants={item} className="h-full">
          <Card 
            className="h-full border-none shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group bg-emerald-50/50 cursor-pointer"
            onClick={() => setView("games")}
          >
            <div className="h-48 overflow-hidden relative">
              <ImageWithFallback
                src={parentingGamesImage}
                alt="Playing games"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-white/90 p-2 rounded-xl shadow-sm">
                <Gamepad2 className="w-6 h-6 text-emerald-500" />
              </div>
            </div>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-2xl font-bold text-stone-800">
                親子遊戲區
              </h3>
              <p className="text-stone-600 leading-relaxed">
                把邏輯變成好玩的遊戲。適合 3-6 歲孩子，每天 10
                分鐘，高品質的陪伴時光。
              </p>
              <Button
                variant="ghost"
                className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100 p-0 h-auto font-medium"
                onClick={() => setView("games")}
              >
                去玩遊戲 <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Technical Blog */}
        <motion.div variants={item} className="h-full">
          <Card 
            className="h-full border-none shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group bg-slate-50/50 cursor-pointer"
            onClick={() => setView("tech")}
          >
            <div className="h-48 overflow-hidden relative">
              <ImageWithFallback
                src={technicalImage}
                alt="Tech workspace"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-white/90 p-2 rounded-xl shadow-sm">
                <Code className="w-6 h-6 text-slate-500" />
              </div>
            </div>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-2xl font-bold text-stone-800">
                技術心得
              </h3>
              <p className="text-stone-600 leading-relaxed">
                工程師媽媽的實務筆記。用最清楚的邏輯，分享技術路上的風景。
              </p>
              <Button
                variant="ghost"
                className="text-slate-600 hover:text-slate-700 hover:bg-slate-100 p-0 h-auto font-medium"
                onClick={() => setView("tech")}
              >
                查看技術文{" "}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </motion.section>

      {/* Brand Values */}
      <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-stone-100">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-emerald-900 mb-4">
            森森邏輯的三個約定
          </h2>
          <p className="text-stone-500">
            我們相信，好的陪伴不需要很完美，只要很真心。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-2">
              <Heart className="w-8 h-8 text-orange-400" />
            </div>
            <h4 className="text-lg font-bold text-stone-800">
              溫馨安心
            </h4>
            <p className="text-sm text-stone-500 leading-relaxed">
              提供讓父母放心的內容，沒有焦慮行銷，只有溫暖支持。
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
              <Sparkles className="w-8 h-8 text-emerald-500" />
            </div>
            <h4 className="text-lg font-bold text-stone-800">
              有趣互動
            </h4>
            <p className="text-sm text-stone-500 leading-relaxed">
              把學習變成好玩的遊戲，讓親子時光充滿笑聲。
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-2">
              <User className="w-8 h-8 text-indigo-500" />
            </div>
            <h4 className="text-lg font-bold text-stone-800">
              專業清楚
            </h4>
            <p className="text-sm text-stone-500 leading-relaxed">
              無論是育兒還是技術，都用最清晰的邏輯讓你看懂。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}