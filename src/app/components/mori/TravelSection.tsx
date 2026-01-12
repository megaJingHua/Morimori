import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Map, MapPin, Plane, Calendar } from 'lucide-react';
import { OkinawaIceCreamMission } from './travel/OkinawaIceCreamMission';

const TravelHome = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-4 mb-12 pt-8">
        <h1 className="text-4xl font-bold text-stone-800 tracking-tight flex items-center justify-center gap-3">
          <Plane className="w-8 h-8 text-emerald-600" />
          寶哥的旅遊手冊
        </h1>
        <p className="text-stone-600 max-w-lg mx-auto leading-relaxed">
            這裡收集了專為寶哥設計的旅遊任務書。<br/>
            透過遊戲化的探索，讓旅行不只是走馬看花，而是充滿觀察與發現的冒險！
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Okinawa Trip Card */}
        <motion.div 
            whileHover={{ y: -5 }}
            className="group bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300"
        >
            <div className="h-48 bg-blue-100 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-300 opacity-80" />
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl" />
                <div className="relative z-10 text-white text-center">
                    <span className="block text-4xl mb-2">🏝️</span>
                    <span className="font-bold text-lg tracking-widest uppercase">Okinawa</span>
                </div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-stone-600 flex items-center gap-1 shadow-sm">
                    <Calendar className="w-3 h-3 text-blue-500" />
                    2024.04
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-stone-800 mb-2 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-red-500 fill-red-100" />
                    沖繩大冒險
                </h3>
                <p className="text-sm text-stone-500 mb-6 leading-relaxed">
                    陽光、沙灘、海洋生物！還有好吃的冰淇淋。這次我們要把沖繩的顏色都收集起來。
                </p>
                
                <div className="space-y-3">
                    <div className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-stone-300"></span>
                        Missions
                        <span className="w-full h-px bg-stone-100"></span>
                    </div>
                    
                    <Link to="/travel/okinawa/ice-cream">
                        <div className="group/item flex items-center gap-3 p-3 rounded-2xl bg-stone-50 hover:bg-pink-50 hover:border-pink-200 transition-all border border-stone-100 cursor-pointer">
                             <span className="w-10 h-10 rounded-xl bg-white border border-stone-100 text-pink-500 flex items-center justify-center font-bold text-sm shadow-sm group-hover/item:scale-110 transition-transform">
                                🍦
                             </span>
                             <div>
                                 <div className="font-bold text-stone-700 text-sm group-hover/item:text-pink-700 transition-colors">小小美食家 x 冰淇淋</div>
                                 <div className="text-xs text-stone-400 group-hover/item:text-pink-400">觀察、比較與感受表達</div>
                             </div>
                        </div>
                    </Link>

                     {/* Placeholder for other missions */}
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-stone-50/50 border border-stone-100 opacity-50 grayscale cursor-not-allowed">
                         <span className="w-10 h-10 rounded-xl bg-stone-100 border border-stone-200 text-stone-400 flex items-center justify-center font-bold text-sm">
                            🛫
                         </span>
                         <div>
                             <div className="font-bold text-stone-500 text-sm">機場小偵探</div>
                             <div className="text-xs text-stone-400">籌備中...</div>
                         </div>
                    </div>
                </div>
            </div>
        </motion.div>

        {/* Placeholder Trip */}
         <div className="rounded-3xl border-2 border-dashed border-stone-200 flex flex-col items-center justify-center p-8 text-stone-400 gap-4 min-h-[300px] bg-stone-50/50 hover:bg-stone-50 transition-colors">
            <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center">
                <Map className="w-8 h-8 opacity-20" />
            </div>
            <p className="font-medium">更多冒險準備中...</p>
        </div>
      </div>
    </div>
  )
}

export const TravelSection = () => {
  return (
    <Routes>
      <Route path="/" element={<TravelHome />} />
      <Route path="/okinawa/ice-cream" element={<OkinawaIceCreamMission />} />
    </Routes>
  );
};
