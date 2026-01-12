import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Star, Heart, MessageCircle, Eye, Brain, Volume2, ShieldCheck, Info } from 'lucide-react';
import { Button } from '../../ui/button';
import { Link } from 'react-router-dom';
import missionImage from "figma:asset/190fcfe4838a8353b6efa738ad820f9db6ff29a8.png";
import { Badge } from '../../ui/badge';

export const OkinawaIceCreamMission = () => {
  // Sticker state for Blue Seal
  const [blueSealRating, setBlueSealRating] = useState<number>(0);
  // Sticker state for Shioya
  const [shioyaRating, setShioyaRating] = useState<number>(0);

  return (
    <div className="max-w-4xl mx-auto pb-20">
      {/* Navigation */}
      <div className="mb-6">
        <Link to="/travel">
          <Button variant="ghost" className="text-stone-500 hover:text-stone-800 -ml-2">
            <ArrowLeft className="w-4 h-4 mr-1" />
            回到旅遊手冊
          </Button>
        </Link>
      </div>

      {/* Header Section */}
      <header className="mb-8 text-center space-y-4">
        <div className="inline-flex items-center justify-center p-2 bg-pink-100 text-pink-600 rounded-full mb-2">
           <span className="text-sm font-bold px-3">沖繩大冒險 Vol.1</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-stone-800">
          🍦 小小美食家 <span className="text-stone-400">×</span> 冰淇淋
        </h1>
        <p className="text-stone-600 max-w-2xl mx-auto leading-relaxed">
          本頁透過孩子熟悉、喜愛的「冰淇淋」情境，引導孩子進行 <span className="font-bold text-pink-500">觀察、比較與感受表達</span> 的練習。
          <br className="hidden md:block" />
          活動設計不以「答對」為目標，而是讓孩子在真實體驗中，<span className="font-bold text-pink-500">說出自己的感覺，並被大人理解與接住。</span>
        </p>
      </header>

      {/* Main Image */}
      <div className="bg-white p-4 rounded-3xl shadow-sm border border-stone-100 mb-10 rotate-1 hover:rotate-0 transition-transform duration-500">
        <img 
          src={missionImage} 
          alt="Ice Cream Mission Guide" 
          className="w-full h-auto rounded-2xl"
        />
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        {/* Main Content Column */}
        <div className="md:col-span-8 space-y-12">
          
          {/* Section 1: Goals */}
          <section className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-50 rounded-bl-full -mr-10 -mt-10" />
            <h2 className="text-xl font-bold text-stone-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600">🎯</span>
              學習目標
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-xl">
                <Eye className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <strong className="block text-stone-800 text-sm mb-1">觀察差異</strong>
                  <span className="text-stone-500 text-xs">顏色、形狀、口味、招牌文字</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-xl">
                <Brain className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <strong className="block text-stone-800 text-sm mb-1">比較與選擇</strong>
                  <span className="text-stone-500 text-xs">不同冰淇淋帶來的不同感受</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-xl">
                <MessageCircle className="w-5 h-5 text-pink-500 mt-0.5 shrink-0" />
                <div>
                  <strong className="block text-stone-800 text-sm mb-1">表達感覺</strong>
                  <span className="text-stone-500 text-xs">喜歡、不那麼喜歡、或兩個都喜歡</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-xl">
                <Heart className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                <div>
                  <strong className="block text-stone-800 text-sm mb-1">建立自我感受</strong>
                  <span className="text-stone-500 text-xs">我的感覺是重要的</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Steps */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
               <span className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 font-bold text-xl">🧩</span>
               <h2 className="text-2xl font-bold text-stone-800">活動操作方式</h2>
            </div>

            {/* Step 1 */}
            <div className="bg-white p-6 rounded-2xl border-l-4 border-indigo-200 shadow-sm">
               <h3 className="text-lg font-bold text-indigo-900 mb-3 flex items-center gap-2">
                 <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-sm">Step 1</span>
                 觀察招牌與文字
               </h3>
               <p className="text-stone-600 mb-4">請家長與孩子一起找找看：</p>
               <div className="flex gap-4">
                 <div className="flex-1 bg-stone-50 p-4 rounded-xl text-center border border-dashed border-stone-300">
                    <span className="block text-xs text-stone-400 mb-1">英文</span>
                    <strong className="text-xl text-blue-600 font-serif">Blue Seal</strong>
                 </div>
                 <div className="flex-1 bg-stone-50 p-4 rounded-xl text-center border border-dashed border-stone-300">
                    <span className="block text-xs text-stone-400 mb-1">日文</span>
                    <strong className="text-xl text-pink-600 font-serif">まーすやー</strong>
                 </div>
               </div>
            </div>

            {/* Step 2 */}
            <div className="bg-indigo-50 p-6 rounded-2xl border-l-4 border-indigo-400 shadow-sm">
               <h3 className="text-lg font-bold text-indigo-900 mb-3 flex items-center gap-2">
                 <span className="bg-indigo-200 text-indigo-800 px-2 py-0.5 rounded text-sm">Step 2</span>
                 任務提示與期待建立
               </h3>
               <div className="bg-white/80 p-4 rounded-xl mb-4">
                 <p className="text-stone-700 leading-relaxed font-medium">
                   「等一下我們會用這張券，去換一份冰淇淋。<br/>
                   吃完之後，你可以用貼貼紙告訴我你的感覺。」
                 </p>
               </div>
               <ul className="space-y-2 text-sm text-indigo-800">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                    請孩子親手把兌換券交給大人或店員
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                    看著冰淇淋被製作、拿到手
                  </li>
               </ul>
            </div>

             {/* Interactive Sticker Section */}
            <div className="bg-gradient-to-br from-pink-50 to-blue-50 p-6 rounded-2xl border border-stone-200 shadow-sm">
                <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                  <span className="bg-pink-200 text-pink-800 px-2 py-0.5 rounded text-sm">Step 3</span>
                  貼貼紙：告訴我你有多喜歡？
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Blue Seal */}
                    <div className="bg-white p-4 rounded-xl border border-blue-100 text-center">
                        <div className="text-blue-600 font-bold text-lg mb-4">Blue Seal</div>
                        <div className="flex justify-center gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <motion.button
                                    key={star}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setBlueSealRating(star)}
                                    className="focus:outline-none"
                                >
                                    {star <= blueSealRating ? (
                                        <div className="w-10 h-10 rounded-full bg-blue-400 border-2 border-white shadow-md flex items-center justify-center">
                                            <span className="text-white font-bold">貼</span>
                                        </div>
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-stone-100 border-2 border-stone-200 flex items-center justify-center text-stone-300">
                                            {star}
                                        </div>
                                    )}
                                </motion.button>
                            ))}
                        </div>
                        <p className="text-xs text-stone-400 mt-2">點擊圈圈貼貼紙</p>
                    </div>

                    {/* Shioya */}
                    <div className="bg-white p-4 rounded-xl border border-pink-100 text-center">
                        <div className="text-pink-600 font-bold text-lg mb-4">塩屋 まーすやー</div>
                        <div className="flex justify-center gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <motion.button
                                    key={star}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setShioyaRating(star)}
                                    className="focus:outline-none"
                                >
                                    {star <= shioyaRating ? (
                                        <div className="w-10 h-10 rounded-full bg-pink-400 border-2 border-white shadow-md flex items-center justify-center">
                                            <span className="text-white font-bold">貼</span>
                                        </div>
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-stone-100 border-2 border-stone-200 flex items-center justify-center text-stone-300">
                                            {star}
                                        </div>
                                    )}
                                </motion.button>
                            ))}
                        </div>
                        <p className="text-xs text-stone-400 mt-2">點擊圈圈貼貼紙</p>
                    </div>
                </div>
            </div>
          </section>

          {/* Section: Capabilities */}
          <section className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
             <h3 className="text-lg font-bold text-emerald-900 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-emerald-200 rounded-full flex items-center justify-center text-emerald-700 text-sm">🌱</span>
                這一頁在培養什麼能力？
             </h3>
             <div className="flex flex-wrap gap-2 mb-4">
                {['感官覺察', '語言表達', '情緒辨識', '自主選擇', '被理解的安全感'].map(tag => (
                    <Badge key={tag} className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200">
                        {tag}
                    </Badge>
                ))}
             </div>
             <p className="text-sm text-emerald-800 leading-relaxed">
                 這些能力，會在未來延伸到：<span className="font-bold underline decoration-emerald-300 decoration-2 underline-offset-2">表達喜好、描述感受、做出選擇、與他人分享想法</span>。
             </p>
          </section>

        </div>

        {/* Sidebar Column */}
        <div className="md:col-span-4 space-y-6">
          
          {/* Parent Tips Card */}
          <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 sticky top-24">
             <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🧷</span>
                家長引導小提醒
             </h3>
             
             <div className="space-y-4">
                 <div className="bg-white/60 p-3 rounded-lg text-sm text-amber-900">
                    <p className="mb-2 font-bold">❌ 避免說</p>
                    <p>「我覺得那個比較好吃」、「你怎麼只貼兩個？」</p>
                 </div>
                 
                 <div className="bg-white p-3 rounded-lg text-sm text-amber-900 border-l-4 border-amber-400 shadow-sm">
                    <p className="mb-2 font-bold">✔ 建議話術</p>
                    <ul className="space-y-2 list-disc pl-4 marker:text-amber-400">
                        <li>「你想貼幾個都可以喔」</li>
                        <li>「這個冰淇淋讓你想到什麼？」</li>
                        <li>「你覺得哪一個比較像海邊？」</li>
                    </ul>
                 </div>
             </div>

             <div className="mt-6 pt-6 border-t border-amber-200">
                 <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                     <ShieldCheck className="w-4 h-4" />
                     家長安心說明
                 </h4>
                 <p className="text-sm text-amber-800 leading-relaxed mb-4">
                     本頁活動沒有對錯、沒有評分標準。孩子貼的不是「好不好吃」，而是「我現在的感覺」。
                 </p>
                 <blockquote className="text-amber-700 text-sm font-serif italic bg-amber-100/50 p-3 rounded-lg border-l-2 border-amber-500">
                     "孩子的感受，比答案重要。"
                 </blockquote>
             </div>
          </div>
          
           {/* Age Info */}
           <div className="bg-stone-100 rounded-xl p-4 text-stone-600 text-sm flex items-start gap-3">
               <Info className="w-5 h-5 shrink-0 mt-0.5 text-stone-400" />
               <div>
                   <strong className="block text-stone-800 mb-1">適合年齡：3–6 歲</strong>
                   <ul className="space-y-1 text-xs">
                       <li>3–4 歲：以貼貼紙與口語分享為主</li>
                       <li>5–6 歲：可加入更多描述與比較語句</li>
                   </ul>
               </div>
           </div>

        </div>
      </div>
    </div>
  );
};
