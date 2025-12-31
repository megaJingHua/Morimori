import React from 'react';
import { Sparkles, Layout } from 'lucide-react';

export interface TechArticle {
  id: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  readTime: string;
  content: React.ReactNode | null;
  author: string;
  image: string; // Added image field for consistency with parenting articles
  category: string; // Added category for consistency
}

// Vue3 30-Day Challenge Data
export const VUE3_ARTICLES: TechArticle[] = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  let title = `Day ${day}: `;
  let summary = "";
  
  if (day === 1) { title += "Vue3 環境建置與 Vite 初體驗"; summary = "工欲善其事，必先利其器。從零開始搭建 Vue3 開發環境，感受 Vite 的閃電速度。"; }
  else if (day === 2) { title += "了解 Composition API 的革命"; summary = "告別 Options API，擁抱更靈活的邏輯復用模式。setup() 語法糖真香。"; }
  else if (day === 3) { title += "Vue3 的響應式核心：Ref vs Reactive"; summary = "到底什麼時候用 ref？什麼時候用 reactive？一次搞懂 Vue3 的響應式原理。"; }
  else if (day === 4) { title += "模板語法與指令 (Directives)"; summary = "v-if, v-for, v-bind... 這些老朋友在 Vue3 中有什麼不一樣？"; }
  else if (day === 5) { title += "計算屬性 Computed 與 監聽器 Watch"; summary = "讓你的數據會思考。深入理解依賴追蹤與副作用處理。"; }
  else if (day === 6) { title += "元件溝通：Props 與 Emits"; summary = "父子元件如何優雅地傳遞資料？單向數據流的最佳實踐。"; }
  else if (day === 7) { title += "生命週期 Hooks 的改變"; summary = "從 onMounted 到 onUnmounted，掌握元件的生老病死。"; }
  else if (day === 8) { title += "依賴注入：Provide / Inject"; summary = "跨層級元件溝通的救星，避免 Props Drilling 的夢魘。"; }
  else if (day === 9) { title += "Template Refs 與 DOM 操作"; summary = "如何在 Vue 中優雅地操作 DOM 元素？"; }
  else if (day === 10) { title += "自定義 Hook (Composables)"; summary = "Vue3 的精髓！封裝邏輯，讓程式碼更乾淨、更好維護。"; }
  else if (day === 11) { title += "Teleport：傳送門"; summary = "Modal、Toast 這些全域組件的最佳歸宿。"; }
  else if (day === 12) { title += "Suspense 與異步組件"; summary = "優雅地處理異步資料加載與 Loading 狀態。"; }
  else if (day === 13) { title += "Vue Router 4 基礎設定"; summary = "單頁應用程式 (SPA) 的靈魂，路由管理入門。"; }
  else if (day === 14) { title += "Vue Router 進階：導航守衛"; summary = "保護你的路由，權限管理的基礎。"; }
  else if (day === 15) { title += "狀態管理：Pinia 入門"; summary = "再見了 Vuex！擁抱更輕量、更直觀的 Pinia。"; }
  else if (day === 16) { title += "Pinia 進階實戰"; summary = "Store 的拆分與組織，大型專案的狀態管理策略。"; }
  else if (day === 17) { title += "Slot 插槽的魔術"; summary = "讓元件更具彈性，打造高復用性的 UI 庫。"; }
  else if (day === 18) { title += "動態組件與 KeepAlive"; summary = "緩存組件狀態，提升使用者體驗的利器。"; }
  else if (day === 19) { title += "Transition 動畫效果"; summary = "讓你的應用程式動起來！Vue 內建的過場動畫。"; }
  else if (day === 20) { title += "TransitionGroup 列表動畫"; summary = "處理列表增刪的平滑過渡效果。"; }
  else if (day === 21) { title += "Vue3 + TypeScript：完美搭檔"; summary = "為什麼要用 TS？類型檢查帶來的開發信心。"; }
  else if (day === 22) { title += "定義 Props 與 Emits 的類型"; summary = "讓 TS 幫你檢查元件介面，減少執行時期錯誤。"; }
  else if (day === 23) { title += "API 整合與 Axios 封裝"; summary = "優雅地處理 HTTP 請求，攔截器與錯誤處理。"; }
  else if (day === 24) { title += "表單處理與驗證"; summary = "使用 VeeValidate 處理複雜表單邏輯。"; }
  else if (day === 25) { title += "單元測試入門：Vitest"; summary = "寫測試不再痛苦，Vitest 帶來的極速體驗。"; }
  else if (day === 26) { title += "元件測試：Vue Test Utils"; summary = "確保你的 UI 元件行為如預期運作。"; }
  else if (day === 27) { title += "效能優化技巧"; summary = "分析 Bundle Size，懶加載與程式碼分割。"; }
  else if (day === 28) { title += "SSR 服務端渲染概念"; summary = "SEO 的救星，Nuxt.js 的前導知識。"; }
  else if (day === 29) { title += "實戰專案：To-Do List 重構"; summary = "綜合運用這 29 天學到的知識，打造一個完整應用。"; }
  else { title += "完賽心得與未來展望"; summary = "30 天的旅程結束了，但前端之路才剛剛開始。"; }

  return {
    id: `vue-${day}`,
    title,
    summary,
    date: `2024.11.${day.toString().padStart(2, '0')}`,
    tags: ["Vue3", "Frontend", "Challenge"],
    readTime: "5 min",
    content: null,
    author: "工程師媽媽 Mega",
    image: "/Morimori/assets/article-image-default.png", // Default image
    category: "Vue3 Challenge"
  };
});

// UiPath Data
export const UIPATH_ARTICLES: TechArticle[] = [
  {
    id: "ui-new-3",
    title: "UiPath Orchestrator（OC）Management 帳號權限管理",
    summary: "Host 與 Tenant 兩種 Management 有何不同？一次搞懂身份管理與平台控管架構。UiPath Orchestrator 除了流程管理外，還包含關鍵元件 Management（Identity Hub）。本文將帶你完整了解 Host Management 與 Tenant Management 的差異、功能與使用情境。",
    date: "2025.12.31",
    tags: ["UiPath", "Host", "Tenant", "Management", "Security"],
    readTime: "8 min",
    author: "工程師媽媽 Mega",
    image: "/Morimori/assets/article-image-default.png",
    category: "UiPath",
    content: (
        <div className="space-y-8 text-stone-700">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 text-stone-700">
                <p className="mb-4 font-bold text-blue-900 text-lg">
                    Host 與 Tenant 兩種 Management 有何不同？
                </p>
                <p className="mb-4">許多人在第一次接觸 UiPath Orchestrator (OC) 時會困惑：為什麼 OC 裡有兩個 Management？一個在 Host，一個在 Tenant 裡？</p>
                <p>簡單來說，其邏輯類似「母公司」與「子公司」：</p>
                <ul className="space-y-2 list-none pl-2 mt-4">
                    <li className="flex items-start gap-3">
                         <div className="min-w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 text-xs font-bold mt-0.5">H</div>
                         <div><strong>Host Management：</strong>最高層平台控管（母公司），管平台級的使用者政策與登入設定。</div>
                    </li>
                    <li className="flex items-start gap-3">
                         <div className="min-w-6 h-6 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700 text-xs font-bold mt-0.5">T</div>
                         <div><strong>Tenant Management：</strong>租戶層使用者控管（子公司），管該租戶內可用的帳號、群組、機器人帳號等。</div>
                    </li>
                </ul>
            </div>

            <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-l-4 border-blue-500 pl-4">
                    一、OC 的兩層 Management 架構
                </h3>
                <div className="bg-stone-800 text-stone-200 p-6 rounded-xl font-mono text-sm mb-6 shadow-lg">
                    <p className="text-blue-300 font-bold mb-2">Host（平台級）</p>
                    <div className="pl-6 border-l border-stone-600 space-y-3">
                         <div className="flex items-center gap-2">
                            <span className="text-stone-500">└──</span>
                            <span className="text-emerald-300 font-bold">Tenant A</span>
                            <span className="text-stone-500 text-xs">(獨立的 Management)</span>
                         </div>
                         <div className="flex items-center gap-2">
                            <span className="text-stone-500">└──</span>
                            <span className="text-emerald-300 font-bold">Tenant B</span>
                            <span className="text-stone-500 text-xs">(獨立的 Management)</span>
                         </div>
                         <div className="flex items-center gap-2">
                            <span className="text-stone-500">└──</span>
                            <span className="text-emerald-300 font-bold">Tenant C</span>
                            <span className="text-stone-500 text-xs">(獨立的 Management)</span>
                         </div>
                    </div>
                </div>
                <p className="text-stone-600">
                    Host 是整個 Orchestrator 的最上層，負責平台級（全域）管理；而 Tenant 則是個別租戶的獨立管理區域。每層都有自己的 Identity Hub (Management)。
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Host Section */}
                <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
                    <div className="bg-blue-50 p-4 border-b border-blue-100 flex items-center gap-2">
                        <div className="p-2 bg-blue-500 rounded-lg text-white">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-lg text-blue-800">Host Management</h3>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="text-sm text-stone-500 bg-stone-50 p-3 rounded">
                            <span className="font-bold text-stone-700 block mb-1">🔑 如何進入？</span>
                            以 Host 身份登入 → 右上角「Go to Identity Hub」→ 左側點擊 Management
                        </div>
                        <ul className="space-y-4">
                             <li className="flex gap-3">
                                <div className="mt-1 min-w-5"><div className="w-2 h-2 rounded-full bg-blue-400"></div></div>
                                <div>
                                    <strong className="block text-stone-800">Users (平台級使用者)</strong>
                                    <span className="text-sm text-stone-500">建立 Platform Admin，不屬於任何 Tenant，專門管理 Tenants。</span>
                                </div>
                             </li>
                             <li className="flex gap-3">
                                <div className="mt-1 min-w-5"><div className="w-2 h-2 rounded-full bg-blue-400"></div></div>
                                <div>
                                    <strong className="block text-stone-800">Security (全域安全)</strong>
                                    <span className="text-sm text-stone-500">設定密碼複雜度、有效期限、登入鎖定、全域 MFA 政策。</span>
                                </div>
                             </li>
                             <li className="flex gap-3">
                                <div className="mt-1 min-w-5"><div className="w-2 h-2 rounded-full bg-blue-400"></div></div>
                                <div>
                                    <strong className="block text-stone-800">Audit Logs (稽核)</strong>
                                    <span className="text-sm text-stone-500">查看 Host 層級操作（如新增 Tenant、License 變更）。</span>
                                </div>
                             </li>
                             <li className="flex gap-3">
                                <div className="mt-1 min-w-5"><div className="w-2 h-2 rounded-full bg-blue-400"></div></div>
                                <div>
                                    <strong className="block text-stone-800">Mail Settings (SMTP)</strong>
                                    <span className="text-sm text-stone-500">設定平台的郵件伺服器，接收 Host 系統告警。</span>
                                </div>
                             </li>
                        </ul>
                    </div>
                </div>

                {/* Tenant Section */}
                <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
                    <div className="bg-emerald-50 p-4 border-b border-emerald-100 flex items-center gap-2">
                        <div className="p-2 bg-emerald-500 rounded-lg text-white">
                            <Layout className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-lg text-emerald-800">Tenant Management</h3>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="text-sm text-stone-500 bg-stone-50 p-3 rounded">
                            <span className="font-bold text-stone-700 block mb-1">🔑 如何進入？</span>
                            以 Tenant 身份登入 → 右上角「Go to Identity Hub」→ 左側點擊 Management
                        </div>
                        <ul className="space-y-4">
                             <li className="flex gap-3">
                                <div className="mt-1 min-w-5"><div className="w-2 h-2 rounded-full bg-emerald-400"></div></div>
                                <div>
                                    <strong className="block text-stone-800">Accounts & Groups</strong>
                                    <span className="text-sm text-stone-500">建立使用者帳號、機器人帳號 (Robot Accounts)、設定群組權限。</span>
                                </div>
                             </li>
                             <li className="flex gap-3">
                                <div className="mt-1 min-w-5"><div className="w-2 h-2 rounded-full bg-emerald-400"></div></div>
                                <div>
                                    <strong className="block text-stone-800">Security (租戶安全)</strong>
                                    <span className="text-sm text-stone-500">可調整該租戶的登入安全策略（若 Host 未強制鎖定）。</span>
                                </div>
                             </li>
                             <li className="flex gap-3">
                                <div className="mt-1 min-w-5"><div className="w-2 h-2 rounded-full bg-emerald-400"></div></div>
                                <div>
                                    <strong className="block text-stone-800">External Apps</strong>
                                    <span className="text-sm text-stone-500">註冊外部應用與第三方 API (OAuth/OpenID Connect)。</span>
                                </div>
                             </li>
                             <li className="flex gap-3">
                                <div className="mt-1 min-w-5"><div className="w-2 h-2 rounded-full bg-emerald-400"></div></div>
                                <div>
                                    <strong className="block text-stone-800">Mail Settings</strong>
                                    <span className="text-sm text-stone-500">設定該 Tenant 專用的 SMTP，用於發送業務流程通知。</span>
                                </div>
                             </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-l-4 border-amber-500 pl-4">
                    Host vs Tenant Management 差異總表
                </h3>
                <div className="overflow-hidden rounded-xl border border-stone-200">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-stone-50 text-stone-700 font-bold uppercase">
                            <tr>
                                <th className="px-6 py-4">功能項目</th>
                                <th className="px-6 py-4 text-blue-700">Host Management</th>
                                <th className="px-6 py-4 text-emerald-700">Tenant Management</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 bg-white">
                            <tr className="hover:bg-stone-50/50">
                                <td className="px-6 py-4 font-bold text-stone-800">管理範圍</td>
                                <td className="px-6 py-4 text-stone-600">全平台 (Platform Level)</td>
                                <td className="px-6 py-4 text-stone-600">單一租戶 (Tenant Level)</td>
                            </tr>
                            <tr className="hover:bg-stone-50/50">
                                <td className="px-6 py-4 font-bold text-stone-800">使用者管理</td>
                                <td className="px-6 py-4 text-stone-600">Host Admin (平台管理員)</td>
                                <td className="px-6 py-4 text-stone-600">一般使用者、機器人帳號</td>
                            </tr>
                            <tr className="hover:bg-stone-50/50">
                                <td className="px-6 py-4 font-bold text-stone-800">群組 (Groups)</td>
                                <td className="px-6 py-4 text-stone-400">❌ 無此功能</td>
                                <td className="px-6 py-4 text-emerald-600 font-bold">✔ 核心功能</td>
                            </tr>
                            <tr className="hover:bg-stone-50/50">
                                <td className="px-6 py-4 font-bold text-stone-800">機器人帳號</td>
                                <td className="px-6 py-4 text-stone-400">❌ 無此功能</td>
                                <td className="px-6 py-4 text-emerald-600 font-bold">✔ 核心功能</td>
                            </tr>
                            <tr className="hover:bg-stone-50/50">
                                <td className="px-6 py-4 font-bold text-stone-800">外部應用整合</td>
                                <td className="px-6 py-4 text-stone-400">❌ 無此功能</td>
                                <td className="px-6 py-4 text-emerald-600 font-bold">✔ External Applications</td>
                            </tr>
                            <tr className="hover:bg-stone-50/50">
                                <td className="px-6 py-4 font-bold text-stone-800">SMTP 郵件</td>
                                <td className="px-6 py-4 text-stone-600">Host 系統級通知</td>
                                <td className="px-6 py-4 text-stone-600">Tenant 業務級通知</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-stone-800 text-stone-200 p-8 rounded-2xl mt-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    工程師媽媽的總結
                </h3>
                <p className="mb-4 leading-relaxed text-stone-300">
                    分清楚這兩層 Management 是掌握企業級 RPA 架構的第一步。
                    Host 是房東，負責把大樓蓋好、確保大門安全；Tenant 是租客公司，負責管理自己的員工進出、辦公室內的規矩。
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-stone-700/50 p-4 rounded-lg border border-stone-600">
                        <strong className="text-blue-300 block mb-1">📌 Host Management</strong>
                        <span className="text-sm text-stone-400">控管全域安全、登入策略與平台預設值。不管理機器人與業務流程。</span>
                    </div>
                    <div className="bg-stone-700/50 p-4 rounded-lg border border-stone-600">
                        <strong className="text-emerald-300 block mb-1">📌 Tenant Management</strong>
                        <span className="text-sm text-stone-400">企業最常用的管理區。管理帳號、群組、Robot Accounts、與外部系統串接。</span>
                    </div>
                </div>
            </div>
        </div>
    )
  },
  {
    id: "ui-new-2",
    title: "UiPath Orchestrator（OC）Host 最高管理員：Tenant 建立、授權分配、License 更新全流程",
    summary: "在企業自架（On-Prem）或雲端企業方案的 UiPath Orchestrator 中，「Host」是整個平台的最高層級管理區域。本文將帶你掌握 Tenant 建立、授權分配到 License 更新全流程。",
    date: "2025.12.30",
    tags: ["UiPath", "Host", "License", "Orchestrator"],
    readTime: "12 min",
    author: "工程師媽媽 Mega",
    image: "/Morimori/assets/article-image-default.png",
    category: "UiPath",
    content: (
        <div className="space-y-8 text-stone-700">
            <div className="bg-amber-50 p-6 rounded-xl border border-amber-100 text-stone-700">
                <p className="mb-4 font-bold text-amber-900">
                    在企業自架（On-Prem）或雲端企業方案的 UiPath Orchestrator 中，「Host」是整個平台的最高層級管理區域。
                </p>
                <p className="mb-4">Host 管理員所能操作的範圍，遠高於一般 Tenant Admin，包含：</p>
                <ul className="space-y-2 list-none pl-2">
                    {["建立與管理 Tenant", "分配整體授權池（Licenses）", "管理最高層級的套件 Libraries", "查看 Host 層級操作紀錄（Audit）", "設定全平台預設參數（Settings）"].map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                             <div className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center text-amber-700 text-xs font-bold">✓</div>
                             {item}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-4 flex items-center gap-2 border-l-4 border-indigo-500 pl-4">
                    一、Host 平台的角色與功能介紹
                </h3>
                <p className="mb-6 leading-relaxed">
                    Host 是整個 Orchestrator 的「最上層控管區」，可以視為平台系統管理者（Platform Admin）的專屬後台。
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {[
                        { title: "1. Tenants", desc: "建立與管理 Tenant，分配各 Tenant 的授權數量。" },
                        { title: "2. License", desc: "授權池管理，查看所有授權狀態與分配。" },
                        { title: "3. Libraries", desc: "全局流程套件庫，供 Tenant 下載通用元件。" },
                        { title: "4. Audit", desc: "操作紀錄，方便之後進行稽核或問題追查。" },
                        { title: "5. Settings", desc: "全平台預設設定，調整安全性等平台級參數。" }
                    ].map((feature, i) => (
                        <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-stone-100">
                            <h4 className="font-bold text-indigo-700 mb-2">{feature.title}</h4>
                            <p className="text-sm text-stone-600">{feature.desc}</p>
                        </div>
                    ))}
                </div>
                
                <div className="bg-indigo-50 p-4 rounded-lg text-sm text-indigo-800 flex items-center gap-3">
                    <span className="font-bold whitespace-nowrap">如何進入？</span>
                    <span>登入 Orchestrator 後切換為 Host： <code className="bg-white px-2 py-0.5 rounded border border-indigo-200">You are logging in on organization host. Change ←</code></span>
                </div>
            </div>

            <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-4 flex items-center gap-2 border-l-4 border-indigo-500 pl-4">
                    CH1｜新增 Tenant 並分配 License 授權
                </h3>
                
                <div className="space-y-6">
                    <div className="relative pl-8 border-l-2 border-indigo-100 pb-2">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500 border-4 border-white shadow-sm"></div>
                        <h4 className="font-bold text-lg text-stone-800 mb-2">Step 1. 在 Tenants 功能頁新增 Tenant</h4>
                        <p className="text-stone-600">進入 Host → Tenants → 點選 Add Tenant。填寫 Tenant 名稱（例如：Finance、HR）。</p>
                    </div>
                    
                    <div className="relative pl-8 border-l-2 border-indigo-100 pb-2">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500 border-4 border-white shadow-sm"></div>
                        <h4 className="font-bold text-lg text-stone-800 mb-2">Step 2. 進行授權分配（Allocate Licenses）</h4>
                        <p className="text-stone-600 mb-2">在 Tenant 列表右側點擊 「…」→ 選擇 Allocate Licenses。分配所需的授權：</p>
                        <ul className="list-disc pl-5 text-sm text-stone-500 space-y-1 bg-stone-50 p-3 rounded">
                            <li>Unattended Robot</li>
                            <li>Attended Robot</li>
                            <li>User License (Automation Developer / Business Analyst)</li>
                        </ul>
                    </div>
                    
                    <div className="relative pl-8 border-l-2 border-indigo-100">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500 border-4 border-white shadow-sm"></div>
                        <h4 className="font-bold text-lg text-stone-800 mb-2">Step 3. 查看 Host 授權狀況</h4>
                        <p className="text-stone-600">進入 License 頁面，可查看 Host 擁有的總數、已分配數量與剩餘額度。</p>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-4 flex items-center gap-2 border-l-4 border-indigo-500 pl-4">
                    CH2｜更新 License（Online / Offline）
                </h3>
                
                <div className="bg-rose-50 border border-rose-100 p-4 rounded-lg mb-6">
                     <h4 className="font-bold text-rose-700 mb-2 flex items-center gap-2">
                        <span className="text-xl">🔥</span> 
                        授權變更時的注意事項 (例如 10 → 8)
                     </h4>
                     <p className="text-rose-800 text-sm">
                        若 Tenant 正在使用 10 個授權，需先把 2 個授權「收回」到 Host，才能進行授權更新。
                        若未調整，系統會報「授權超額」錯誤。
                     </p>
                </div>

                <div className="space-y-4">
                    <div>
                        <h4 className="font-bold text-lg text-stone-800 mb-2">🛠 Step 1. 進入 License 頁面 → 點擊 Update</h4>
                        <p className="text-stone-600">進入 Host → License，右上角 Update 按鈕可選擇 Online 或 Offline。</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                            <h5 className="font-bold text-slate-800 mb-3 flex items-center gap-2">📡 Online 線上更新</h5>
                            <p className="text-sm text-slate-600 mb-2">若伺服器可以連外：</p>
                            <ol className="list-decimal pl-5 text-sm text-slate-600 space-y-1">
                                <li>點 Update → 選 Online</li>
                                <li>直接輸入 License Key</li>
                                <li>系統自動驗證</li>
                            </ol>
                        </div>
                         <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                            <h5 className="font-bold text-slate-800 mb-3 flex items-center gap-2">🗝 Offline 離線更新</h5>
                            <p className="text-sm text-slate-600 mb-2">用於無法連外的企業環境：</p>
                            <ol className="list-decimal pl-5 text-sm text-slate-600 space-y-1">
                                <li>產生 Offline Request Key</li>
                                <li>到外網登入 UiPath 網站上傳 Key</li>
                                <li>下載 Response 檔並回傳 Host</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-stone-800 text-stone-200 p-8 rounded-2xl mt-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    文章總結
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-bold text-stone-100 mb-2">🎯 Host 的五大功能</h4>
                        <ul className="list-disc pl-5 text-stone-400 space-y-1 text-sm">
                            <li>建立/管理 Tenants</li>
                            <li>授權池（License）管理與分配</li>
                            <li>Libraries 套件最高層管理</li>
                            <li>Audit 操作軌跡</li>
                            <li>Host-Level Settings 平台全局設定</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-stone-100 mb-2">🎯 兩大實務操作技巧</h4>
                        <ul className="list-disc pl-5 text-stone-400 space-y-1 text-sm">
                             <li>CH1：新增 Tenant & 分配授權</li>
                             <li>CH2：正確更新 License（含 Online / Offline 流程）</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
  },
  {
    id: "ui-new-1",
    title: "🧩 UiPath 全貌：從開發流程、平台架構到 Host / Tenant / Folder 管理全解析",
    summary: "從開發流程、平台架構到 Host / Tenant / Folder 管理全解析。UiPath 的自動化不是只有單純在本機跑流程，而是一套完整的 開發 → 管理 → 派送 → 執行 → 監控的生命週期。",
    date: "2025.12.30",
    tags: ["UiPath", "Architecture", "Orchestrator"],
    readTime: "10 min",
    author: "工程師媽媽 Mega",
    image: "/Morimori/assets/article-image-default.png",
    category: "UiPath",
    content: (
        <div className="space-y-6 text-stone-700">
          <p>UiPath 的自動化不是只有單純在本機跑流程，而是一套完整的 <strong>開發 → 管理 → 派送 → 執行 → 監控</strong> 的生命週期。</p>
          
          <div className="bg-slate-50 p-4 rounded-lg font-mono text-xs md:text-sm text-slate-700 border border-slate-100">
            <p className="font-bold">標準流程：</p>
            <div className="pl-4 mt-2 space-y-1">
                <p>Studio（開發）</p>
                <p>   │ Publish 套件</p>
                <p>   ▼</p>
                <p>Orchestrator（管理平台）</p>
                <p>   │ 派送流程 & 控管資源</p>
                <p>   ▼</p>
                <p>Robots（執行端）</p>
            </div>
          </div>

          <div>
              <h3 className="text-xl font-bold text-stone-900 mb-3 flex items-center gap-2">🚀 一、UiPath 開發流程全貌</h3>
              <ul className="list-none space-y-3">
                <li className="bg-white p-3 rounded-lg border border-stone-100 shadow-sm">
                    <strong className="text-indigo-600 block mb-1">✔ 1. Studio（流程設計）</strong>
                    開發者在這裡設計自動化流程（Workflows），支援調試、版本管理、Activity 套件擴充。最後會 Publish 成為一個流程包（Package）。
                </li>
                <li className="bg-white p-3 rounded-lg border border-stone-100 shadow-sm">
                    <strong className="text-indigo-600 block mb-1">✔ 2. Orchestrator（管控平台）</strong>
                    這是整個 UiPath 生態系的「大腦」。功能涵蓋：流程派送、排程、資源管理、監控、機器人授權、Exception log。
                </li>
                <li className="bg-white p-3 rounded-lg border border-stone-100 shadow-sm">
                    <strong className="text-indigo-600 block mb-1">✔ 3. Robots（機器人執行端）</strong>
                    真正執行流程的端點。分為 Attended / Unattended。
                </li>
              </ul>
              <p className="font-bold text-emerald-600 mt-4 bg-emerald-50 p-3 rounded-lg text-center border border-emerald-100">
                  一句話總結：Studio 做流程 → Orchestrator 管理流程 → Robot 執行流程。
              </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-stone-900 mb-3 flex items-center gap-2">🤖 二、UiPath AI 功能簡介（雲端方案才有）</h3>
            <p className="mb-3">如果企業使用 UiPath Automation Cloud，就能啟用官方提供的一系列 AI 能力：</p>
            <ul className="grid sm:grid-cols-2 gap-3">
                <li className="flex items-start gap-2 text-sm bg-slate-50 p-2 rounded">
                    <span className="text-blue-500 font-bold">•</span>
                    <span><strong>異常診斷：</strong>RPA 執行過程遇到異常可呼叫 AI。</span>
                </li>
                <li className="flex items-start gap-2 text-sm bg-slate-50 p-2 rounded">
                    <span className="text-blue-500 font-bold">•</span>
                    <span><strong>文件處理：</strong>Document Understanding + AI 模型做 OCR。</span>
                </li>
                <li className="flex items-start gap-2 text-sm bg-slate-50 p-2 rounded">
                    <span className="text-blue-500 font-bold">•</span>
                    <span><strong>AI Helper：</strong>聊天式 AI Helper 協助判斷流程分支邏輯。</span>
                </li>
                <li className="flex items-start gap-2 text-sm bg-slate-50 p-2 rounded">
                    <span className="text-blue-500 font-bold">•</span>
                    <span><strong>AI Center：</strong>訓練自有 ML 模型並整合到流程中。</span>
                </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-stone-900 mb-3 flex items-center gap-2">🏢 三、Orchestrator 平台（OC）的核心組成</h3>
            <p className="mb-3">UiPath Orchestrator 的資源架構是階層式的。下圖可視為 OC 的「土地 → 建物 → 部門 → 流程」概念：</p>
            <div className="bg-slate-800 text-slate-200 p-4 rounded-lg font-mono text-xs md:text-sm mb-4 overflow-x-auto">
                <p>Host（地主：控管授權、建 Tenant）</p>
                <p>   └── Tenant（大樓：環境、使用者、資源）</p>
                <p>        └── Folder（部門：流程分組）</p>
                <p>             └── Process（流程套件）</p>
            </div>
            <ul className="space-y-4">
                <li>
                    <strong className="text-lg text-stone-800 block mb-1">1️⃣ Host（最高權限層級）</strong>
                    只存在於 on-prem 版。管理整個伺服器，用來建立 Tenants、控管授權、監看系統狀態。Host 是平台級管理員。
                </li>
                <li>
                    <strong className="text-lg text-stone-800 block mb-1">2️⃣ Tenant（租戶層級）</strong>
                    每個 Tenant 就像一個獨立的 OC 世界。管理使用者、機器人、流程、資產、排程等。一個 Tenant 是一個完整功能的 OC「分區」。
                </li>
                <li>
                    <strong className="text-lg text-stone-800 block mb-1">3️⃣ Folder（資料夾/部門）</strong>
                    用於將流程、使用者、資源組織化。常見以部門或專案建立。Folder 是運行流程的最小單位。
                </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-stone-900 mb-3 flex items-center gap-2">🧱 四、Orchestrator 建議階層架構</h3>
            <p className="mb-3">建議的層級設計如下：</p>
            <div className="bg-amber-50 p-4 rounded-lg font-mono text-xs md:text-sm text-amber-900 border border-amber-100 mb-4">
                <p>Host（Admin）</p>
                <p>  └── Tenant（default / 企業主要租戶）</p>
                <p>        └── Folder（依部門）</p>
                <p>               └── Process（各部門自動化流程）</p>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-stone-600">
                <li>Host 不給一般使用者，只給 infra team</li>
                <li>Tenant 代表企業整體資源池</li>
                <li>Folder 讓每個部門的流程隔離、獨立</li>
                <li>Process 落在 Folder 裡，方便控管排程與權限</li>
            </ul>
          </div>

          <div className="bg-stone-100 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">🎯 五、核心觀念總結</h3>
            <ol className="list-decimal pl-5 space-y-3 font-bold text-stone-700">
                <li>Studio 是設計流程的地方，OC 是管理流程的地方。</li>
                <li>Host 管 Tenant，Tenant 管 Folder，Folder 管 Process。</li>
                <li>OC = 派送流程 + 授權控管 + 資源管理 + 執行監控。</li>
            </ol>
          </div>
        </div>
    )
  }
];

export const ALL_TECH_ARTICLES = [...VUE3_ARTICLES, ...UIPATH_ARTICLES];