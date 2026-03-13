import React from "react";
import {
  Sparkles,
  Check,
  Star,
  Wind,
  Shield,
  HeartHandshake,
  Heart,
  MessageCircle,
  Gamepad2,
  Sun,
  Flower2,
  Moon,
  Search,
  Image as ImageIcon,
} from "lucide-react";

const kagawa0 =
  "/Morimori/assets/f1b02335-9690-4a79-8751-cc1ea2a99c5b.png";
const kagawa1 = "/Morimori/assets/k1.jpg";
const kagawa2 = "/Morimori/assets/k22.jpg";
const kagawa3 = "/Morimori/assets/k33.jpg";

const authorAvatar = "/Morimori/assets/author-avatar.png";
const articleImage =
  "/Morimori/assets/article-image-default.png";
const letterImage = "/Morimori/assets/article-letter.png";
const notOnPurposeImage =
  "/Morimori/assets/article-not-on-purpose.png";

export const ARTICLES = [
  {
    id: 7,
    title:
      "當孩子狂問「為什麼」：從香川元太郎的畫像中，看見 3 歲半的觀察力",
    summary:
      "原本我也帶著疑問：「3 歲半的孩子，真的看得懂複雜的迷宮嗎？」但只要換個方式「降維閱讀」，這本大迷宮反而是啟發孩子邏輯與觀察力的絕佳工具。",
    author: "工程師媽媽 Mega",
    authorImage: authorAvatar,
    date: "2026.03.11",
    readTime: "6 min",
    category: "教養觀察",
    image: kagawa0,
    content: (
      <div className="space-y-8">
        <p className="text-lg leading-relaxed text-stone-700">
          最近，家裡那本
          <span className="font-bold">
            香川元太郎的《知識大迷宮》
          </span>
          幾乎沒有闔上過。
        </p>
        <p className="text-stone-700">
          對於標榜「全腦開發」、「高難度解謎」的經典套書，許多家長可能會疑慮：「3
          歲半的孩子，真的看得懂嗎？」、「裡面的路徑這麼複雜，不會有挫折感嗎？」
        </p>
        <p className="text-stone-700">
          原本我也帶著這些疑問，但這陣子陪著 3
          歲半的寶哥每天沉浸其中，我發現我們低估了孩子的觀察力。只要換個方式「降維閱讀」，這本大迷宮，反而是啟發孩子社會邏輯與生活觀察的絕佳工具。
        </p>
        <p className="text-stone-700">
          今天，我想分享我們在「森森邏輯」日常裡，如何用 3
          歲半的視角，玩出這套書的無限可能。
        </p>

        <div className="border-t border-stone-200 my-8"></div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-2">
            <Search className="w-6 h-6 text-sky-500" /> 1.
            非典型玩法：從「視覺捉迷藏」開始訓練專注力
          </h2>
          <p className="text-stone-700">
            對於 3
            歲半的孩子，我們不強求他能精準地從起點走到終點（那往往是
            5-6
            歲以上的空間能力）。我們選擇將焦點縮小，玩「局部觀察」。
          </p>
          <p className="text-stone-700">
            書中每一頁都充滿了令人驚嘆的細節。例如，作者會在迷宮的圖型中排出隱藏的圖案。
          </p>

          <div className="bg-white p-2 rounded-2xl shadow-sm border border-stone-100">
            <img
              src={kagawa1}
              alt="視覺捉迷藏"
              className="w-full rounded-xl"
            />
          </div>
          <p className="text-sm text-stone-500 italic flex items-start gap-2 bg-stone-50 p-4 rounded-xl border border-stone-100">
            <span className="text-sky-500 font-bold shrink-0">
              | 圖案
            </span>
            在複雜的場景中，妳能找到藏在地形裡的番茄嗎？這對 3
            歲的孩子來說，是極致的專注力挑戰。
          </p>

          <p className="text-stone-700">
            「媽媽，我找到了！這裡有番茄！」當寶哥從看似混亂的線條中解構出圖形時，那種成就感是無可比擬的。這種玩法，訓練的是
            <span className="font-bold text-emerald-700">
              「視覺辨識度」與「前景背景的區分能力」
            </span>
            ，這正是邏輯思考的基石。
          </p>
        </div>

        <div className="border-t border-stone-200 my-8"></div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-500" /> 2.
            啟發想像力：「你覺得這個像什麼？」
          </h2>
          <p className="text-stone-700">
            除了「找找看」，我們也玩「形狀聯想」。香川元太郎的畫風細膩，地形豐富。在共讀時，我常會問他：
          </p>
          <p className="text-stone-800 font-bold text-lg bg-amber-50 p-4 rounded-xl">
            「寶哥，妳看這個地形，你覺得像什麼呢？」
          </p>

          <div className="bg-white p-2 rounded-2xl shadow-sm border border-stone-100">
            <img
              src={kagawa2}
              alt="形狀聯想"
              className="w-full rounded-xl"
            />
          </div>
          <p className="text-sm text-stone-500 italic flex items-start gap-2 bg-stone-50 p-4 rounded-xl border border-stone-100">
            <span className="text-amber-500 font-bold shrink-0">
              | 圖案
            </span>
            一個像城堡又像大怪獸的地形，在孩子眼裡會變成什麼？
          </p>

          <p className="text-stone-700">
            有時候他會說像一個大怪獸的肚子，有時候說像是一艘飛船。當孩子開始聯想，迷宮的線條就不再死板，而是有了生命。這是在訓練他的
            <span className="font-bold text-emerald-700">
              「抽象轉化能力」
            </span>
            ，讓邏輯與創意並行。
          </p>
        </div>

        <div className="border-t border-stone-200 my-8"></div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-rose-500" />{" "}
            3. 回應「為什麼」：建立世界的「因果邏輯」
          </h2>
          <p className="text-stone-700">
            隨著閱讀的深入，寶哥的好奇心大爆發，問題從單純的「是什麼」轉向了「為什麼」。看著複雜的地圖，他會突然問：
          </p>
          <p className="text-stone-800 font-bold text-lg bg-rose-50 p-4 rounded-xl">
            「為什麼他們在山頂上？」「他們在這個地圖做什麼？」
          </p>

          <div className="bg-white p-2 rounded-2xl shadow-sm border border-stone-100">
            <img
              src={kagawa3}
              alt="因果邏輯"
              className="w-full rounded-xl"
            />
          </div>
          <p className="text-sm text-stone-500 italic flex items-start gap-2 bg-stone-50 p-4 rounded-xl border border-stone-100">
            <span className="text-rose-500 font-bold shrink-0">
              | 圖案
            </span>
            地圖上小人物們各司其職，這引發了孩子對社會運作的好奇。
          </p>

          <p className="text-stone-700">
            當他問「為什麼在山頂上？」，我不會直接給予科普標準答案。我會引導他觀察：「對耶，山頂很高。你看，如果他們要喝水，要怎麼辦呢？是不是要有人從下面運水上來？所以他們可能在這裡蓋一個很厲害的水塔。」
          </p>
          <p className="text-stone-700">
            當他問「他們在做什麼？」，我會跟著他一起看圖說故事：「你看，這個人手裡拿著鎚子，那個人搬著木頭，他們好像在合力蓋一棟房子喔。」
          </p>
          <p className="text-stone-700">
            透過這樣的對話，我們將平面地圖轉化為一個有因果關係、有社會互動的
            <span className="font-bold text-emerald-700">
              「微縮世界」
            </span>
            。這讓 3 歲半的孩子理解：
            <span className="font-bold text-emerald-700">
              每個人的行為背後都有其目的（動機），而這些行為會產生相對應的結果。
            </span>{" "}
            這就是邏輯在生活中的實踐。
          </p>
        </div>

        <div className="border-t border-stone-200 my-8"></div>

        <div className="bg-emerald-50/50 p-8 rounded-2xl border border-emerald-100 space-y-6">
          <h2 className="text-2xl font-bold text-emerald-900">
            🌿 森森結語：尊重孩子的「閱讀主權」
          </h2>
          <p className="text-stone-700">
            這套書玩法真的很多，有時是求救故事，有時是純粹找圖。每天共讀前貫徹「提供選擇權」的教養風格，問寶哥：
          </p>
          <p className="text-emerald-900 font-bold text-lg bg-emerald-100/50 p-4 rounded-xl text-center">
            「今天我們要在地圖裡找隱藏番茄？還是要看小人物在做什麼故事？」
          </p>
          <p className="text-stone-700">
            讓孩子決定今天閱讀的「重點」，他才會覺得自己是這場冒險的主人。
          </p>
          <p className="text-stone-700">
            如果妳家也有一個求知慾旺盛、邏輯超越同齡的孩子，不妨也試試這種「3歲半讀法」。你會驚訝地發現，在孩子的眼裡，迷宮從來就不只是迷宮，而是一個充滿「道理」與「驚喜」的新世界。
          </p>
        </div>

        <p className="text-xs text-stone-400 mt-8 italic text-right">
          *本文所引用之書本圖片均出自《香川元太郎：知識大迷宮》系列，版權歸原作者及出版社所有。*
        </p>
      </div>
    ),
  },
  {
    id: 5,
    title:
      "寫給疲憊媽媽的一封信：在教養的路上，你真的已經做得很好了",
    summary:
      "成為媽媽後，我才真正明白——原來世界上最累、最甜、最難、最有力量的角色，就是「媽媽」。這十句話送給每一位努力的你。",
    author: "工程師媽媽 Mega",
    authorImage: authorAvatar,
    date: "2025.12.08",
    readTime: "5 min",
    category: "媽媽心語",
    image: letterImage,
    content: (
      <div className="space-y-8">
        <p className="text-lg leading-relaxed text-stone-700">
          成為媽媽後，我才真正明白——原來世界上最累、最甜、最難、最有力量的角色，就是「媽媽」。
        </p>
        <p className="text-stone-700">
          在忙碌又混亂的日常裡，我們常常忘記了自己。忘記我們也會累、會痛、會受傷、會不安。於是，我想把這篇文章獻給每一位努力的媽媽。
        </p>
        <p className="text-stone-700">
          這不是說教，而是一份陪伴。是十句送給你的話，希望你在最累的時候，能重新看見自己的力量。
        </p>

        <div className="bg-stone-50 rounded-2xl p-8 border border-stone-100 space-y-6">
          {[
            {
              title: "1. 你不是沒做好，你只是一直在做。",
              content:
                "別人看不見的那些堅持、忍耐、調整，其實每天都在消耗你。但你仍然持續付出，這本身就非常值得被肯定。",
            },
            {
              title:
                "2. 孩子需要的不是完美媽媽，而是願意陪著他成長的你。",
              content:
                "你已經足夠、已經很好。孩子感受得到你每天微小但真實的努力。",
            },
            {
              title:
                "3. 覺得累，不代表你不愛孩子，只代表你也是人。",
              content:
                "你不是機器，你有情緒、有需求、有界線。允許自己累，是一種勇氣。",
            },
            {
              title:
                "4. 你不是孤單一個人，全世界的媽媽都曾在浴室或車裡悄悄崩潰過。",
              content:
                "只是大家不常說出口。你並不奇怪，你只是太用力愛孩子了。",
            },
            {
              title: "5. 休息不是逃避，而是把自己找回來。",
              content:
                "你休息得越好，越能在明天成為孩子的避風港。",
            },
            {
              title:
                "6. 孩子會忘記吃了什麼、玩了什麼，但永遠記得你擁抱他的方式。",
              content:
                "擁抱、溫柔、陪伴，比完美的教養方式更重要。",
            },
            {
              title:
                "7. 有些日子真的很難，只要撐過今天，就值得驕傲。",
              content:
                "不需要每天都耀眼，有時候「活著」就是勝利。",
            },
            {
              title:
                "8. 不要拿操場邊的媽媽、社群裡的媽媽，跟真實的自己比較。",
              content:
                "每個媽媽的背後都有不眠的夜晚，只是你看不見。",
            },
            {
              title:
                "9. 孩子的情緒不是你的錯，而是他正在學習如何成為人。",
              content:
                "他願意在你面前亂，是因為你對他來說最安全。",
            },
            {
              title: "10. 孩子睡著後，請也抱抱自己：",
              content:
                "「我今天，已經做得很好了。」你不是在勉強自己，你是在深深地愛著孩子。",
            },
          ].map((item, index) => (
            <div key={index} className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                <Heart className="w-4 h-4 fill-emerald-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-emerald-50/50 p-6 rounded-xl text-center space-y-4 border border-emerald-100">
          <h3 className="text-xl font-bold text-emerald-900 mb-4">
            🌿 作者小語｜工程師媽媽 Mega
          </h3>
          <p className="text-stone-700 leading-relaxed text-left">
            寫下這篇文字的時候，是在一個孩子終於睡著、家裡安靜下來的夜晚。
            <br />
            我不是專家，只是一個也會累、也會懷疑自己的媽媽。
          </p>
          <p className="text-stone-700 leading-relaxed text-left">
            身為工程師，我習慣解問題；
            <br />
            成為媽媽後，我才學會——有些時刻不需要答案，只需要被理解。
          </p>
          <p className="text-stone-700 leading-relaxed text-left">
            如果你在閱讀的時候，心裡有那麼一瞬間鬆了一口氣，
            <br />
            那這篇文章就已經完成它的任務了。
          </p>
          <p className="text-stone-700 leading-relaxed text-left">
            願你在教養的路上，能對孩子溫柔，
            <br />
            也能慢慢學會，對自己溫柔。
          </p>
          <p className="text-stone-700 leading-relaxed text-left font-bold text-emerald-800">
            你真的，已經做得很好了。
          </p>
          <div className="text-right text-stone-500 text-sm mt-4">
            — Mega
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: "高敏兒不是問題，是天賦：給父母的一封安心信",
    summary:
      "高敏感不是疾病，而是一種與生俱來的特質。他們就像配備了「超強感測器」，能接收到更多微小的外界刺激。這份敏感，其實是上天給予的禮物...",
    author: "工程師媽媽 Mega",
    authorImage: authorAvatar,
    date: "2025.12.23",
    readTime: "6 min",
    category: "高敏感特質",
    image: articleImage,
    content: (
      <div className="space-y-8">
        <p>
          親愛的爸爸媽媽，當您看著自己的孩子，是否曾感到他們與眾不同？他們可能對微小的聲音特別敏感，在陌生環境中顯得退縮，或是對他人的情緒有著異於常人的洞察力。
        </p>
        <p>
          您或許會擔心：「我的孩子是不是太膽小？」、「他們是不是太愛哭了？」、「為什麼總是這麼容易焦慮？」請您放心，您的孩子很可能擁有一項獨特而美好的特質——他們是{" "}
          <strong>
            「高敏感族（Highly Sensitive Person, HSP）」
          </strong>
          ，而這絕不是問題，而是一種天賦。
        </p>

        <div className="bg-emerald-50/50 rounded-2xl p-6 md:p-8 border border-emerald-100">
          <h3 className="text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />{" "}
            什麼是高敏感？
          </h3>
          <p className="mb-4 text-stone-700">
            「高敏感」並不是一種疾病，也不是性格缺陷，而是一種與生俱來的神經系統特質。高敏感的孩子（簡稱高敏兒）的大腦處理訊息的方式比一般人更深入、更細膩。
          </p>
          <ul className="space-y-3">
            {[
              "感官敏銳：對光線、聲音、氣味、觸感等反應更強烈。",
              "情緒豐富：能深刻感受到自身和他人的情緒，同理心強。",
              "反應更深：對新事物、新環境需要更多時間適應，處理更多細節。",
              "觀察細膩：能注意到旁人忽略的細節，有著豐富的內心世界。",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-stone-700"
              >
                <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Gifts */}
          <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
            <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />{" "}
              高敏兒的超能力
            </h3>
            <ul className="space-y-3">
              {[
                "強大同理心：很好的傾聽者與朋友。",
                "豐富創造力：在藝術、設計展現天賦。",
                "深度思考者：喜歡探索事物的本質。",
                "細膩的覺察力：發現環境中微小的美好。",
                "高道德感：對公平正義有強烈追求。",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-stone-700 text-sm"
                >
                  <span className="text-amber-500 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Challenges */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Wind className="w-5 h-5 text-slate-500" />{" "}
              可能面臨的挑戰
            </h3>
            <ul className="space-y-3">
              {[
                "情緒淹沒：吸收過多情緒導致崩潰。",
                "過度刺激：嘈雜環境中容易疲憊。",
                "過度擔憂：容易陷入焦慮情緒。",
                "社交壓力：需要更多獨處時間。",
                "害怕犯錯：因深度思考而不敢嘗試。",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-stone-700 text-sm"
                >
                  <span className="text-slate-400 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-stone-800 mb-6 text-center">
            給高敏兒父母的安心指南
          </h3>
          <div className="grid gap-4">
            {[
              {
                title: "理解與接納是基石",
                icon: (
                  <HeartHandshake className="w-6 h-6 text-pink-500" />
                ),
                content:
                  "認識到高敏感是天生的一部分，而非缺點。情緒反應激烈通常是因為接收太多訊息，而非故意搗蛋。",
              },
              {
                title: "創造一個「避風港」",
                icon: (
                  <Shield className="w-6 h-6 text-blue-500" />
                ),
                content:
                  "確保家中有獨處角落，減少過度刺激。任何新的活動或變化，都請提前跟孩子溝通。",
              },
              {
                title: "教導情緒調節",
                icon: (
                  <Heart className="w-6 h-6 text-red-500" />
                ),
                content:
                  "幫助孩子命名情緒，並建立平復心情的儀式（如深呼吸、抱玩偶）。",
              },
              {
                title: "發掘與培養天賦",
                icon: (
                  <Star className="w-6 h-6 text-yellow-500" />
                ),
                content:
                  "留意並支持孩子在藝術、閱讀或大自然探索等領域的興趣，欣賞他們的獨特。",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex gap-4 p-4 rounded-xl hover:bg-stone-50 transition-colors border border-transparent hover:border-stone-100"
              >
                <div className="shrink-0 bg-white p-3 rounded-full shadow-sm h-fit">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-stone-800 mb-1">
                    {index + 1}. {item.title}
                  </h4>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <blockquote className="border-l-4 border-emerald-300 pl-6 py-4 italic text-stone-600 text-lg bg-stone-50 rounded-r-lg my-8">
          "您的孩子不是「太脆弱」，而是「太有感」。他們不是「愛找麻煩」，而是「在嘗試理解這個複雜的世界」。"
        </blockquote>

        <p>
          高敏感是一種獨特的天賦，它能讓孩子更深入地體驗生活的美好，擁有更豐富的內心世界。
        </p>
        <p>
          作為父母，您的理解、接納與引導，將是高敏兒成長路上最堅實的後盾，幫助他們將這份與生俱來的敏感，轉化為未來人生中最寶貴的禮物。放鬆心情，與您的孩子一同探索這份美好的天賦吧！
        </p>
      </div>
    ),
  },
  {
    id: 6,
    title:
      "三歲的孩子不是故意的：寫給每一位在教養路上跌跌撞撞的媽媽",
    summary:
      "最近，我和我三歲的孩子——寶哥，經歷了一段「界線攻防期」。孩子不是壞，只是在探索界線。這不是叛逆，他只是第一次面對自己的「我想要」與「不行」。",
    author: "工程師媽媽 Mega",
    authorImage: authorAvatar,
    date: "2025.12.08",
    readTime: "7 min",
    category: "教養觀察",
    image: notOnPurposeImage,
    content: (
      <div className="space-y-8">
        <p className="text-lg leading-relaxed text-stone-700">
          最近，我和我三歲的孩子——寶哥，經歷了一段「界線攻防期」。
        </p>
        <p className="text-stone-700">
          有一天，我在幫他刷牙時，他突然伸腳故意踢我。力道不重，但那種「我故意喔，你會怎樣？」的眼神，很明顯。
        </p>
        <p className="text-stone-700">
          如果你有三歲的孩子，你應該懂這個瞬間。孩子不是壞，只是在探索界線、測試情緒，也在問：
          <br />
          <br />
          <span className="font-bold text-stone-800">
            "媽媽，你會因為我做錯事就不愛我嗎？我做這件事，會發生什麼事？"
          </span>
        </p>
        <p className="text-stone-700">
          那天我沒有大吼。我只是很平靜地說：「這樣我會痛，我不舒服。如果你故意這樣，今天媽媽不會陪你睡喔。」
        </p>
        <p className="text-stone-700">
          他愣住了。他知道媽媽是認真的。而我也在那一刻再次感受到：三歲的孩子並不是在挑戰你，他是在尋找安全的大人。
        </p>

        {/* Section 1 */}
        <div className="bg-emerald-50/50 rounded-2xl p-6 md:p-8 border border-emerald-100">
          <h3 className="text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
            <Flower2 className="w-6 h-6 text-emerald-600" /> 1.
            三歲的孩子，是「一半懂事、一半混亂」的年紀
          </h3>
          <p className="mb-4 text-stone-700">
            很多媽媽以為 3 歲會比較好帶，但其實 3
            歲才是孩子邏輯飛速發展、又最容易情緒混亂的階段。他們會：
          </p>
          <ul className="grid sm:grid-cols-2 gap-3">
            {[
              "明知道不能，還是想試",
              "一秒天使、一秒暴龍",
              "說得出好多話，但情緒還追不上語言",
              "想獨立，卻又還需要人抱",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-stone-700 bg-white/50 p-3 rounded-lg"
              >
                <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-stone-700 font-medium">
            他不是叛逆，他只是第一次面對自己的「我想要」與「不行」。他混亂，不是壞。他需要媽媽，但又想逃離媽媽。這就是三歲。
          </p>
        </div>

        {/* Section 2 */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-stone-800 flex items-center gap-2">
            <Sun className="w-6 h-6 text-amber-500" /> 2.
            孩子的「故意」背後，其實是想確定你愛不愛他
          </h3>
          <p className="text-stone-700">
            寶哥那天踢我，其實不是調皮，也不是挑釁。那是他的方式在問：「如果我做不好，你還會在嗎？」「界線在哪裡？」
          </p>
          <p className="text-stone-700">
            孩子在安全的人面前，才會展現「最真實的混亂」。也許你家孩子會：
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "故意頂嘴",
              "故意弄倒玩具",
              "故意搶你的東西",
              "故意說「我不要」",
              "故意哭給你看",
            ].map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-sm font-medium border border-amber-100"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-stone-700">
            請不要急著覺得他壞、他不乖、你教不好。
          </p>
          <blockquote className="border-l-4 border-amber-400 pl-6 py-4 italic text-stone-600 text-lg bg-amber-50/30 rounded-r-lg my-4">
            "孩子最需要的不是完美媽媽，而是穩定的大人。"
          </blockquote>
          <p className="text-stone-700">
            那天晚上，我讓爸爸陪睡。他雖然失望，但他理解了「行為會有後果」。而第二天，他主動願意用語言說：「媽媽，我不會踢你了。」孩子的學習，就是這樣一點一點的。
          </p>
        </div>

        {/* Section 3 */}
        <div className="bg-sky-50 rounded-2xl p-6 md:p-8 border border-sky-100">
          <h3 className="text-xl font-bold text-sky-900 mb-4 flex items-center gap-2">
            <Gamepad2 className="w-6 h-6 text-sky-600" /> 3.
            教養不是控制，而是引導孩子的邏輯與情緒
          </h3>
          <p className="mb-4 text-stone-700">
            後來我發現，把生活遊戲化對寶哥很有效：「我們來出任務」、「要找到線索喔」、「照順序完成
            Quest」。孩子需要的是情境、任務感、明確流程。當你幫他把生活變成可理解的遊戲，孩子會：
          </p>
          <ul className="space-y-2 mb-4">
            {[
              "更願意配合",
              "更少情緒失控",
              "更能理解「規則」",
              "更容易建立邏輯",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-3 text-stone-700"
              >
                <div className="w-2 h-2 rounded-full bg-sky-400"></div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-stone-700">
            其實每個三歲的孩子都在找：「這個世界怎麼運作？」大人給得越清楚，他越安心。
          </p>
        </div>

        {/* Section 4 */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-stone-800 flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-500" /> 4.
            寫給所有媽媽：你已經做得很好了
          </h3>
          <p className="text-stone-700">
            我知道很多媽媽的心情會像我：生氣後會自責、設界線時怕孩子不愛你、有時候崩潰、有時候累得想躲起來，甚至懷疑自己是不是做不好。但我想說——
          </p>
          <blockquote className="text-center font-medium text-rose-800 text-xl py-6 px-4 bg-rose-50 rounded-xl leading-relaxed">
            "孩子不需要完美媽媽，他需要有界線、有溫度、有耐心，也會犯錯的媽媽。"
          </blockquote>
          <p className="text-stone-700">
            你能溫柔也能堅定；你會累但仍然陪著他；你會失控但隔天早上還是把早餐準備好。孩子每天都看得見。
          </p>
        </div>

        {/* Section 5 */}
        <div className="bg-stone-50 p-6 rounded-xl border border-stone-100">
          <h3 className="text-xl font-bold text-stone-800 mb-4 flex items-center gap-2">
            <Moon className="w-6 h-6 text-indigo-500" /> 5.
            教養不是一天變好的，但孩子會記住你給的方式
          </h3>
          <p className="text-stone-700 mb-4">
            我們陪孩子長大，但其實孩子也在陪我們成為更好的自己。如果今天你覺得很難，不代表你做不好。如果你感到累，也不要覺得羞愧。
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {[
              "被理解",
              "被接住",
              "被引導",
              "被穩定的人陪著",
              "慢慢長大的",
            ].map((item, i) => (
              <div
                key={i}
                className="text-center py-2 bg-white rounded-lg shadow-sm text-stone-600 text-sm font-medium border border-stone-100"
              >
                {item}
              </div>
            ))}
          </div>
          <p className="text-stone-700 font-medium">
            而某一天，你會突然發現——他比昨天更懂事一點；也比昨天更愛你。
          </p>
        </div>

        <div className="text-center py-8">
          <p className="text-2xl font-serif text-emerald-800 italic">
            "這就是教養最溫柔的奇蹟。"
          </p>
        </div>
      </div>
    ),
  },
];