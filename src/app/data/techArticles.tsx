import React from 'react';
import { Sparkles, Layout, Check, Settings, User, Cpu, Link, Shield, Zap, Lightbulb, Layers, Brain, Blocks, ArrowDown, ArrowUp, MessageCircle, FileCode, HelpCircle, Eye, Calculator, Map, Compass, Route, Refrigerator, Database, FunctionSquare, Sigma, FormInput, ListChecks, AlertCircle, ShoppingCart, Clock, Store, PlayCircle, RefreshCw, XCircle, Moon, Sun, Gift, Share2, CornerDownRight, Box, Component, Grip } from 'lucide-react';

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

export const VUE3_ARTICLES: TechArticle[] = [
  {
    id: "vue-1",
    title: "Day 1: Vue3 是什麼？",
    summary: "Vue3 是一個幫助我們快速做互動網站的框架，就像積木工具箱。",
    date: "2024.11.01",
    tags: ["Vue3", "Frontend", "Challenge"],
    readTime: "5 min",
    author: "工程師媽媽 Mega",
    image: "/Morimori/assets/article-image-default.png",
    category: "Vue3 Challenge",
    content: (
        <div className="space-y-8 text-stone-700">
            {/* Intro Card */}
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                <p className="mb-4 font-bold text-lg text-emerald-900">Vue3 是一個幫助我們快速做互動網站的框架，就像積木工具箱。</p>
                <p>你現在看到的網頁畫面，大多是用「前端框架」做出來的。Vue 3 就是其中一個超人氣框架，它就像「做互動網頁的積木工具箱」，讓工程師能快速拼出會動的網頁畫面。</p>
            </div>

            {/* Features Grid */}
            <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-l-4 border-emerald-500 pl-4">
                     🌱 Vue3 最厲害的地方是？
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
                        <div className="bg-yellow-100 w-10 h-10 rounded-full flex items-center justify-center mb-4 text-yellow-600">
                            <Lightbulb className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-stone-800 mb-2">資料變了，畫面就會自動改！</h4>
                        <p className="text-sm text-stone-600">不用自己重畫整個畫面，像是魔法一樣幫你更新。</p>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
                         <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mb-4 text-blue-600">
                            <Layers className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-stone-800 mb-2">組件化設計</h4>
                        <p className="text-sm text-stone-600">可以把畫面拆成一塊塊組件重複用，就像做樂高積木一樣，把按鈕、卡片、清單拆成小單位來組合整頁。</p>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
                         <div className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center mb-4 text-purple-600">
                            <Brain className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-stone-800 mb-2">邏輯集中管理</h4>
                        <p className="text-sm text-stone-600">有清楚的寫法，資料、邏輯、畫面都可以集中管理。工程師看得懂、改得快。</p>
                    </div>
                </div>
            </div>

            {/* Implementation */}
            <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-l-4 border-emerald-500 pl-4">
                     📦 今天的實作是什麼?
                </h3>
                <p className="mb-4 text-stone-600">我們會做一個超級簡單的小畫面：</p>
                <div className="bg-stone-50 rounded-xl border border-stone-200 overflow-hidden">
                     <div className="p-4 border-b border-stone-200 flex items-center justify-between">
                         <div className="flex gap-2">
                             <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-bold flex items-center gap-1"><Check className="w-3 h-3"/> 顯示 "Hello Vue3!"</span>
                             <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-bold flex items-center gap-1"><Check className="w-3 h-3"/> 按鈕計數器</span>
                         </div>
                         <span className="text-stone-400 text-sm font-mono">App.vue</span>
                     </div>
                     <div className="p-4 bg-stone-900 text-stone-300 font-mono text-sm overflow-x-auto">
<pre>{`<!-- HTML 區塊 (畫面呈現的內容)-->
<template>
  <div>
    <h1>{{ message }}</h1>
    <button @click="count++">點我：{{ count }}</button>
  </div>
</template>

<!-- JavaScript 區塊 (內容中的動作設定)-->
<script setup>
import { ref } from 'vue'

const message = ref('Hello Vue 3!')
const count = ref(0)
</script>

<!-- CSS 區塊 (內容顯示的樣式)-->
<style scoped>
h1 {
  color: #42b983;
}
</style>`}</pre>
                     </div>
                </div>
            </div>

            {/* Advanced Concepts */}
            <div className="bg-stone-100 p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-stone-800 mb-4 flex items-center gap-2">
                     🌱 術業有專攻：Vue 3 核心特性
                </h3>
                <p className="mb-4 text-stone-600">Vue 3 是一個漸進式框架（Progressive Framework）。簡單來說可以從小用起（小功能 / 小區塊），需要時再逐步引入更多功能與架構，而非一開始就需要學會整個龐大架構才能使用。</p>
                
                <ul className="space-y-3">
                     <li className="bg-white p-3 rounded-lg border border-stone-200 shadow-sm">
                        <strong className="text-emerald-600 block mb-1">響應式系統（reactivity）</strong>
                        <span className="text-sm text-stone-600">當資料改變時，畫面會自動更新，不需手動更新 DOM。</span>
                    </li>
                    <li className="bg-white p-3 rounded-lg border border-stone-200 shadow-sm">
                        <strong className="text-emerald-600 block mb-1">組件化（component-based）</strong>
                        <span className="text-sm text-stone-600">把畫面拆成可重複使用的小積木，每個積木（組件）管理自己的資料和樣式。</span>
                    </li>
                    <li className="bg-white p-3 rounded-lg border border-stone-200 shadow-sm">
                        <strong className="text-emerald-600 block mb-1">Composition API</strong>
                        <span className="text-sm text-stone-600">（setup、ref、reactive、computed）：Vue 3 新的寫法，讓資料、方法、監聽等能清楚集中管理並更靈活重用。</span>
                    </li>
                     <li className="bg-white p-3 rounded-lg border border-stone-200 shadow-sm">
                        <strong className="text-emerald-600 block mb-1">單文件組件（.vue 檔案）</strong>
                        <span className="text-sm text-stone-600">一個檔案包含：template (HTML 區塊)、script (JavaScript 區塊)、style (CSS 區塊)，在同一個檔案就能看到��組件的畫面、邏輯和樣式。</span>
                    </li>
                </ul>
            </div>
        </div>
    )
  },
  {
    id: "vue-2",
    title: "Day 2: 組件是什麼？為什麼要拆？",
    summary: "組件就像樂高積木，把大頁面拆成小積木，方便重複使用。",
    date: "2024.11.02",
    tags: ["Vue3", "Components", "Props", "Emit"],
    readTime: "8 min",
    author: "工程師媽媽 Mega",
    image: "/Morimori/assets/article-image-default.png",
    category: "Vue3 Challenge",
    content: (
        <div className="space-y-8 text-stone-700">
            {/* Intro Card */}
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600 hidden md:block">
                        <Blocks className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="mb-4 font-bold text-lg text-emerald-900">
                            組件就像樂高積木，把大頁面拆成小積木，方便重複使用。
                        </p>
                        <p className="leading-relaxed">
                            你可以把網頁想像成一個樂高積木城堡。每個「積木」就是一個組件（component）。
                            比如：按鈕是一塊積木、輸入框是一塊積木、待辦清單的每一項也是一塊積木。
                            今天帶你用最簡單的例子 ——「Todo List」來學會：✅組件拆分 ✅父子傳值 ✅用 props 傳資料，用 emit 回報訊息！
                        </p>
                    </div>
                </div>
            </div>

            {/* Concept: Props & Emit */}
            <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-l-4 border-emerald-500 pl-4">
                     📮 組件之間怎麼講話？
                </h3>
                <p className="mb-6 text-stone-600">父組件與子組件之間的溝通，我們常用一個「爸爸和小孩」的故事來比喻：</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Props */}
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 relative overflow-hidden">
                        <ArrowDown className="absolute -right-4 -bottom-4 w-24 h-24 text-blue-100 rotate-45" />
                        <div className="relative z-10">
                            <h4 className="text-xl font-bold text-blue-800 mb-2 flex items-center gap-2">
                                <span className="bg-blue-200 text-blue-700 px-2 py-1 rounded text-sm">Props</span>
                                父 → 子
                            </h4>
                            <p className="text-blue-900 font-bold mb-2">爸爸傳玩具給小孩</p>
                            <p className="text-sm text-blue-700">由外層傳入內層。就像爸爸說：「來，這是你的玩具」。資料是單向流動的。</p>
                        </div>
                    </div>

                    {/* Emit */}
                    <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 relative overflow-hidden">
                        <ArrowUp className="absolute -right-4 -bottom-4 w-24 h-24 text-orange-100 rotate-45" />
                         <div className="relative z-10">
                            <h4 className="text-xl font-bold text-orange-800 mb-2 flex items-center gap-2">
                                <span className="bg-orange-200 text-orange-700 px-2 py-1 rounded text-sm">Emit</span>
                                子 → 父
                            </h4>
                            <p className="text-orange-900 font-bold mb-2">小孩舉手說想喝水</p>
                            <p className="text-sm text-orange-700">由內層回報給外層。就像小孩說：「媽媽，我口渴啦～」。用來觸發外層的事件。</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cold Knowledge */}
            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                <div className="flex items-start gap-3">
                    <HelpCircle className="w-6 h-6 text-indigo-500 mt-1 shrink-0" />
                    <div>
                        <h4 className="font-bold text-indigo-900 mb-2">工程師都不知道的冷知識：為什麼叫 Parent-Child 而不是 Mother-Child？</h4>
                        <ul className="list-disc pl-5 text-sm text-indigo-800 space-y-2">
                            <li><strong>程式傳統：</strong>早期的電腦科學用語（Master/Slave, Father/Son）偏陽性化。</li>
                            <li><strong>邏輯結構：</strong>Parent（父組件）通常擁有控制權與資源，負責管理邏輯；Child（子組件）負責執行與回報。</li>
                            <li><strong>語言習慣：</strong>英文 "Parent" 本意是雙親，但在中文習慣直譯為「父」，所以就成了「父子關係」。</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Implementation */}
            <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-l-4 border-emerald-500 pl-4">
                     📦 實作範例：Todo List
                </h3>
                
                <div className="space-y-6">
                    {/* File 1 */}
                    <div className="bg-stone-50 rounded-xl border border-stone-200 overflow-hidden">
                         <div className="p-3 border-b border-stone-200 flex items-center justify-between bg-white">
                             <div className="flex items-center gap-2">
                                 <FileCode className="w-4 h-4 text-emerald-600" />
                                 <span className="font-bold text-stone-700">TodoItem.vue</span>
                                 <span className="text-xs bg-stone-100 text-stone-500 px-2 py-0.5 rounded">子組件</span>
                             </div>
                         </div>
                         <div className="p-4 bg-stone-900 text-stone-300 font-mono text-sm overflow-x-auto">
<pre>{`<template>
  <li @click="handleDelete">{{ item }}</li>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

// 定義從父組件接收到的參數
const props = defineProps({
  item: String,
  index: Number,
})

// 將傳出的事件定義名稱為 'delete'
const emit = defineEmits(['delete'])

// 將參數 'index' 傳給父組件
function handleDelete() {
  emit('delete', props.index)
}
</script>

<style scoped>
li {
  cursor: pointer;
  margin: 4px 0;
}
li:hover {
  text-decoration: line-through;
  color: gray;
}
</style>`}</pre>
                         </div>
                    </div>

                    {/* File 2 */}
                    <div className="bg-stone-50 rounded-xl border border-stone-200 overflow-hidden">
                         <div className="p-3 border-b border-stone-200 flex items-center justify-between bg-white">
                             <div className="flex items-center gap-2">
                                 <FileCode className="w-4 h-4 text-emerald-600" />
                                 <span className="font-bold text-stone-700">Todo.vue</span>
                                 <span className="text-xs bg-stone-100 text-stone-500 px-2 py-0.5 rounded">父組件</span>
                             </div>
                         </div>
                         <div className="p-4 bg-stone-900 text-stone-300 font-mono text-sm overflow-x-auto">
<pre>{`<template>
  <div class="todo">
    <h2>Todo List Demo</h2>
    
    <!-- 輸入區塊 -->
    <input
      v-model="newTodo"
      placeholder="輸入待辦事項"
      @keyup.enter="addTodo"
    />
    <button @click="addTodo">新增</button>

    <!-- 列表區塊：使用子組件 -->
    <ul>
      <TodoItem
        v-for="(todo, index) in todos"
        :key="index"
        :item="todo"
        :index="index"
        @delete="deleteTodo"
      />
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TodoItem from "@/components/TodoItem.vue";

const newTodo = ref("");
const todos = ref([]);

function addTodo() {
  if (newTodo.value.trim() !== "") {
    todos.value.push(newTodo.value.trim());
    newTodo.value = "";
  }
}

// 接收子組件傳來的 index 並刪除
function deleteTodo(index) {
  todos.value.splice(index, 1);
}
</script>`}</pre>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    )
  },
  {
    id: "vue-3",
    title: "Day 3: computed 和 watch 幫你「看家」",
    summary: "computed 幫你算結果，watch 幫你盯資料，一變就提醒。",
    date: "2024.11.03",
    tags: ["Vue3", "Computed", "Watch", "Reactivity"],
    readTime: "8 min",
    author: "工程師媽媽 Mega",
    image: "/Morimori/assets/article-image-default.png",
    category: "Vue3 Challenge",
    content: (
        <div className="space-y-8 text-stone-700">
            {/* Intro Card */}
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                <p className="mb-4 font-bold text-lg text-emerald-900">
                    computed 幫你算結果，watch 幫你盯資料，一變就提醒。
                </p>
                <p className="leading-relaxed">
                    媽媽每天最怕什麼？就是「重複問問題、重複做事情」。
                    電鍋要煮飯 → 看燈變沒？小孩洗完澡 → 地上濕沒？
                    這些「重複檢查」、「自動反應」的事，Vue 也有喔！今天要認識兩個 Vue 的小幫手：computed 和 watch。
                </p>
            </div>

            {/* Computed vs Watch Comparison */}
            <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-l-4 border-emerald-500 pl-4">
                     🧠 computed vs watch 怎麼選？
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Computed */}
                    <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 relative overflow-hidden">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                                <Calculator className="w-6 h-6" />
                            </div>
                            <h4 className="text-xl font-bold text-purple-800">Computed</h4>
                        </div>
                        <ul className="space-y-3 text-purple-900 text-sm">
                            <li className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-purple-600 mt-0.5" />
                                幫你自動算好東西，像幫你統計今天幾件事完成
                            </li>
                            <li className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-purple-600 mt-0.5" />
                                適合用來 "顯示給使用者看的值"
                            </li>
                            <li className="flex items-start gap-2 bg-purple-100/50 p-2 rounded">
                                <span className="font-bold">✅ 有快取：</span>依賴的資料沒變就不重算
                            </li>
                        </ul>
                    </div>

                    {/* Watch */}
                    <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 relative overflow-hidden">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                                <Eye className="w-6 h-6" />
                            </div>
                            <h4 className="text-xl font-bold text-orange-800">Watch</h4>
                        </div>
                        <ul className="space-y-3 text-orange-900 text-sm">
                            <li className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-orange-600 mt-0.5" />
                                幫你偷偷盯著資料，一變就提醒你
                            </li>
                            <li className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-orange-600 mt-0.5" />
                                常用在 "執行動作、更新資料、debug"
                            </li>
                            <li className="flex items-start gap-2 bg-orange-100/50 p-2 rounded">
                                <span className="font-bold">❌ 沒有快取：</span>每次變都執行
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Implementation */}
            <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-l-4 border-emerald-500 pl-4">
                     📦 實作範例：Todo List 進階版
                </h3>
                <p className="mb-4 text-stone-600">
                    這次我們讓代辦事項可以打勾✔️，完成後畫線，並且使用 <code className="bg-stone-100 px-1 rounded">computed</code> 來過濾未完成的項目。
                </p>
                
                <div className="space-y-6">
                    {/* File 1: TodoItem.vue */}
                    <div className="bg-stone-50 rounded-xl border border-stone-200 overflow-hidden">
                         <div className="p-3 border-b border-stone-200 flex items-center justify-between bg-white">
                             <div className="flex items-center gap-2">
                                 <FileCode className="w-4 h-4 text-emerald-600" />
                                 <span className="font-bold text-stone-700">TodoItem.vue</span>
                                 <span className="text-xs bg-stone-100 text-stone-500 px-2 py-0.5 rounded">子組件</span>
                             </div>
                         </div>
                         <div className="p-4 bg-stone-900 text-stone-300 font-mono text-sm overflow-x-auto">
<pre>{`<template>
  <li>
    <input type="checkbox" v-model="localDone" @change="toggleDone" />
    <span :style="{ textDecoration: localDone ? 'line-through' : 'none' }">
      {{ item.text }}
    </span>
    <button @click="$emit('remove', props.index)">❌</button>
  </li>
</template>

<script setup>
import { ref, watch } from "vue";
const props = defineProps(["item", "index"]);
const emit = defineEmits(["update", "remove"]);

const localDone = ref(props.item.done);

// watch 幫你盯：看著 props 的 done，有變就同步更新 localDone
watch(
  () => props.item.done,
  (newVal) => {
    localDone.value = newVal;
  }
);

// 使用者打勾時，告訴父母「我變好了」
function toggleDone() {
  emit("update", { ...props.item, done: localDone.value });
}
</script>`}</pre>
                         </div>
                    </div>

                    {/* File 2: Todo.vue */}
                    <div className="bg-stone-50 rounded-xl border border-stone-200 overflow-hidden">
                         <div className="p-3 border-b border-stone-200 flex items-center justify-between bg-white">
                             <div className="flex items-center gap-2">
                                 <FileCode className="w-4 h-4 text-emerald-600" />
                                 <span className="font-bold text-stone-700">Todo.vue</span>
                                 <span className="text-xs bg-stone-100 text-stone-500 px-2 py-0.5 rounded">父組件</span>
                             </div>
                         </div>
                         <div className="p-4 bg-stone-900 text-stone-300 font-mono text-sm overflow-x-auto">
<pre>{`<script setup>
import { ref, computed } from "vue";

// ... (省略新增與刪除邏輯) ...

// ✅ computed 幫你算：只顯示未完成的功能
const showOnlyUnfinished = ref(false);

const filteredTodos = computed(() => {
  // 依賴的資料變了 (showOnlyUnfinished 或 todos)，這裡才會重算
  return showOnlyUnfinished.value
    ? todos.value.filter((t) => !t.done)
    : todos.value;
});
</script>

<template>
  <div class="todo">
    <!-- 切換顯示模式 -->
    <label>
        <input type="checkbox" v-model="showOnlyUnfinished"> 只顯示未完成
    </label>

    <ul>
      <!-- 使用 computed 算出來的 filteredTodos -->
      <TodoItem
        v-for="todo in filteredTodos"
        :key="todo.text"
        :item="todo"
        :index="getTodoIndex(todo)"
        @update="updateTodo"
        @remove="removeTodo"
      />
    </ul>
  </div>
</template>`}</pre>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    )
  },
  {
    id: "vue-4",
    title: "Day 4: 從單一房間到多房間 —— Vue Router",
    summary: "Router 就像走廊，帶你從大門走到不同房間。",
    date: "2024.11.04",
    tags: ["Vue3", "Vue Router", "SPA", "Navigation"],
    readTime: "8 min",
    author: "工程師媽媽 Mega",
    image: "/Morimori/assets/article-image-default.png",
    category: "Vue3 Challenge",
    content: (
        <div className="space-y-8 text-stone-700">
            {/* Intro Card */}
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600 hidden md:block">
                        <Map className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="mb-4 font-bold text-lg text-emerald-900">
                            Router 就像走廊，帶你從大門走到不同房間。
                        </p>
                        <p className="leading-relaxed">
                            你可以把「網站」想成一間房子，房子的大門就是你的首頁 (Home)，房間就像每個不同的功能頁面，而走廊就是 Router（路由器），它負責帶你從大門走到不同的房間。
                        </p>
                    </div>
                </div>
            </div>

            {/* Concept: Router as Hallway */}
            <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-l-4 border-emerald-500 pl-4">
                     🚪 Vue Router 是什麼？
                </h3>
                <p className="mb-6 text-stone-600">就像家裡有走廊和門牌號碼，讓你可以走到不同的房間。在網站裡，這個「房間」就是不同的頁面。</p>
                
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white p-5 rounded-xl border border-stone-200 text-center shadow-sm">
                        <div className="bg-stone-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-stone-500 font-mono font-bold">/</div>
                        <h4 className="font-bold text-stone-800">首頁</h4>
                        <p className="text-xs text-stone-500 mt-1">Home</p>
                    </div>
                     <div className="bg-white p-5 rounded-xl border border-stone-200 text-center shadow-sm relative">
                         <div className="absolute top-1/2 -left-3 w-6 h-0.5 bg-stone-300 hidden md:block"></div>
                        <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-blue-600 font-mono font-bold">/about</div>
                        <h4 className="font-bold text-stone-800">關於我們</h4>
                        <p className="text-xs text-stone-500 mt-1">About</p>
                    </div>
                     <div className="bg-white p-5 rounded-xl border border-stone-200 text-center shadow-sm relative">
                         <div className="absolute top-1/2 -left-3 w-6 h-0.5 bg-stone-300 hidden md:block"></div>
                        <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-purple-600 font-mono font-bold">/game</div>
                        <h4 className="font-bold text-stone-800">遊戲區</h4>
                        <p className="text-xs text-stone-500 mt-1">Game</p>
                    </div>
                </div>
            </div>

            {/* Implementation Steps */}
            <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-l-4 border-emerald-500 pl-4">
                     📦 今天的實作是什麼?
                </h3>
                <p className="mb-6 text-stone-600">
                    點擊「首頁」出現首頁內容，點擊「關於」出現介紹內容。就像家裡不用蓋兩間房子，同一個大門進去，走不同走廊就能到不同房間。
                </p>

                <div className="space-y-8">
                    {/* Step 1 */}
                    <div className="relative pl-8 border-l-2 border-emerald-100 pb-2">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow-sm"></div>
                        <h4 className="font-bold text-lg text-stone-800 mb-2 flex items-center gap-2">
                            1. 先裝 Router（走廊建材）
                            <span className="text-xs bg-stone-100 px-2 py-0.5 rounded text-stone-500 font-normal">Terminal</span>
                        </h4>
                        <p className="text-stone-600 mb-2 text-sm">就像先買一條長廊，讓房間可以連起來。</p>
                        <div className="bg-stone-900 p-3 rounded-lg text-stone-300 font-mono text-sm">
                            npm install vue-router
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative pl-8 border-l-2 border-emerald-100 pb-2">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow-sm"></div>
                         <h4 className="font-bold text-lg text-stone-800 mb-2 flex items-center gap-2">
                            2. 畫設計圖（router.js）
                            <span className="text-xs bg-stone-100 px-2 py-0.5 rounded text-stone-500 font-normal">src/router/index.js</span>
                        </h4>
                        <p className="text-stone-600 mb-2 text-sm">告訴 Vue：「有幾個房間？門牌是多少？」</p>
                        <div className="bg-stone-900 p-4 rounded-lg text-stone-300 font-mono text-sm overflow-x-auto">
<pre>{`const routes = [
  { path: '/', component: Home },   // 大門 → 首頁
  { path: '/about', component: About } // ��一個房間 → 關於我們
]`}</pre>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative pl-8 border-l-2 border-emerald-100 pb-2">
                         <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow-sm"></div>
                         <h4 className="font-bold text-lg text-stone-800 mb-2 flex items-center gap-2">
                            3. 把走廊裝到房子裡（main.js）
                            <span className="text-xs bg-stone-100 px-2 py-0.5 rounded text-stone-500 font-normal">src/main.js</span>
                        </h4>
                        <p className="text-stone-600 mb-2 text-sm">就是讓房子知道要用這個走廊來切換房間。</p>
                        <div className="bg-stone-900 p-4 rounded-lg text-stone-300 font-mono text-sm">
                            import router from './router'
                        </div>
                    </div>

                     {/* Step 4 */}
                    <div className="relative pl-8 border-l-2 border-emerald-100">
                         <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow-sm"></div>
                         <h4 className="font-bold text-lg text-stone-800 mb-2 flex items-center gap-2">
                            4. 放一個「導航菜單」(App.vue)
                            <span className="text-xs bg-stone-100 px-2 py-0.5 rounded text-stone-500 font-normal">src/App.vue</span>
                        </h4>
                        <p className="text-stone-600 mb-2 text-sm">就像家裡玄關放了兩個牌子：「去客廳」、「去廚房」。當你點導航的時候，網站會把「顯示的頁面」換掉。</p>
                         <div className="bg-stone-900 p-4 rounded-lg text-stone-300 font-mono text-sm overflow-x-auto">
<pre>{`<template>
  <nav>
    <router-link to="/">首頁</router-link> | 
    <router-link to="/about">關於我們</router-link>
  </nav>
  <!-- 房間的內容會顯示在這裡 -->
  <router-view />
</template>`}</pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  },
  {
    id: "vue-5",
    title: "Day 5: 網站的公共冰箱 —— Pinia 狀態管理",
    summary: "Pinia 是共用冰箱，讓不同頁面隨時能取用相同資料。",
    date: "2024.11.05",
    tags: ["Vue3", "Pinia", "State Management", "Store"],
    readTime: "8 min",
    author: "工程師媽媽 Mega",
    image: "/Morimori/assets/article-image-default.png",
    category: "Vue3 Challenge",
    content: (
        <div className="space-y-8 text-stone-700">
            {/* Intro Card */}
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600 hidden md:block">
                        <Refrigerator className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="mb-4 font-bold text-lg text-emerald-900">
                            Pinia 是共用冰箱，讓不同頁面隨時能取用相同資料。
                        </p>
                        <p className="leading-relaxed">
                            在 Vue 專案中，如果不同頁面或元件都需要同一份資料（像「登入使用者」、「購物車」、「計數器」），光靠 props 與 emit 傳來傳去會變得很複雜。
                            👉 這時候就需要「狀態管理工具」來集中管理。
                        </p>
                    </div>
                </div>
            </div>

            {/* Analogy: Family Fridge */}
            <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-l-4 border-emerald-500 pl-4">
                     👩‍🍼 寶媽角度：為什麼需要冰箱？
                </h3>
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <p className="mb-4 text-blue-900">家裡有很多房間：客廳、廚房、書房。如果每個房間都放一瓶牛奶，不但容易忘記數量，還會浪費空間。</p>
                    
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-white p-4 rounded-lg border border-blue-200 text-center">
                            <span className="text-2xl block mb-2">👶</span>
                            <strong className="text-blue-800 text-sm">客廳</strong>
                            <p className="text-xs text-blue-600">寶寶要喝牛奶</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-blue-200 text-center">
                            <span className="text-2xl block mb-2">👩‍🍳</span>
                            <strong className="text-blue-800 text-sm">廚房</strong>
                            <p className="text-xs text-blue-600">媽媽煮飯要牛奶</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-blue-200 text-center">
                            <span className="text-2xl block mb-2">👨‍💻</span>
                            <strong className="text-blue-800 text-sm">書房</strong>
                            <p className="text-xs text-blue-600">爸爸泡咖啡要牛奶</p>
                        </div>
                    </div>

                    <div className="bg-white/60 p-4 rounded-lg border border-blue-200 flex items-center gap-3">
                         <div className="bg-blue-100 p-2 rounded-full text-blue-600 shrink-0">
                            <Refrigerator className="w-5 h-5" />
                        </div>
                        <div>
                            <strong className="text-blue-900 block">解決辦法：大家共用一台冰箱（Pinia）</strong>
                            <span className="text-sm text-blue-700">牛奶集中放好，誰要喝就直接去拿。</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Concept: Pinia Core */}
            <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-l-4 border-emerald-500 pl-4">
                     💻 工程師角度：Pinia 核心概念
                </h3>
                <p className="mb-6 text-stone-600">Pinia 是 Vue3 官方推薦的狀態管理工具（取代 Vuex）。</p>
                
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm group hover:border-emerald-300 transition-colors">
                        <div className="bg-yellow-100 w-10 h-10 rounded-full flex items-center justify-center mb-4 text-yellow-600 group-hover:scale-110 transition-transform">
                            <Database className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-stone-800 mb-2">State</h4>
                        <p className="text-sm text-stone-600">資料（牛奶、雞蛋）</p>
                    </div>
                     <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm group hover:border-emerald-300 transition-colors">
                        <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mb-4 text-blue-600 group-hover:scale-110 transition-transform">
                            <FunctionSquare className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-stone-800 mb-2">Actions</h4>
                        <p className="text-sm text-stone-600">方法（煮飯、喝牛奶）</p>
                    </div>
                     <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm group hover:border-emerald-300 transition-colors">
                        <div className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center mb-4 text-purple-600 group-hover:scale-110 transition-transform">
                            <Sigma className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-stone-800 mb-2">Getters</h4>
                        <p className="text-sm text-stone-600">計算值（剩幾瓶牛奶）</p>
                    </div>
                </div>
            </div>

            {/* Implementation Steps */}
            <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-l-4 border-emerald-500 pl-4">
                     📦 今天的實作：跨頁面計數器
                </h3>
                <p className="mb-6 text-stone-600">
                    需求：1. 在首頁按「+1」按鈕。2. 切換到關於頁，數字還是一樣（不會重置）。
                </p>

                <div className="space-y-8">
                    {/* Step 1 & 2 */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-stone-50 rounded-xl border border-stone-200 overflow-hidden">
                             <div className="p-3 border-b border-stone-200 bg-white font-bold text-stone-700 text-sm">
                                1. 安裝 Pinia
                             </div>
                             <div className="p-4 bg-stone-900 text-stone-300 font-mono text-sm">
                                npm install pinia
                             </div>
                        </div>
                         <div className="bg-stone-50 rounded-xl border border-stone-200 overflow-hidden">
                             <div className="p-3 border-b border-stone-200 bg-white font-bold text-stone-700 text-sm">
                                2. 在 main.js 掛載
                             </div>
                             <div className="p-4 bg-stone-900 text-stone-300 font-mono text-sm overflow-x-auto">
<pre>{`import { createPinia } from 'pinia'
app.use(createPinia())`}</pre>
                             </div>
                        </div>
                    </div>

                    {/* Step 3: Define Store */}
                    <div className="bg-stone-50 rounded-xl border border-stone-200 overflow-hidden">
                         <div className="p-3 border-b border-stone-200 bg-white flex items-center justify-between">
                             <span className="font-bold text-stone-700 text-sm">3. 建立 store (stores/counter.js)</span>
                             <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">定義公共冰箱</span>
                         </div>
                         <div className="p-4 bg-stone-900 text-stone-300 font-mono text-sm overflow-x-auto">
<pre>{`import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  actions: {
    increment() {
      this.count++
    }
  }
})`}</pre>
                        </div>
                    </div>

                    {/* Step 4: Use Store */}
                     <div className="bg-stone-50 rounded-xl border border-stone-200 overflow-hidden">
                         <div className="p-3 border-b border-stone-200 bg-white flex items-center justify-between">
                             <span className="font-bold text-stone-700 text-sm">4. 在元件中使用 (Home.vue / About.vue)</span>
                             <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">取用牛奶</span>
                         </div>
                         <div className="p-4 bg-stone-900 text-stone-300 font-mono text-sm overflow-x-auto">
<pre>{`<script setup>
import { useCounterStore } from '../stores/counter'
const counter = useCounterStore()
</script>

<template>
  <p>數字：{{ counter.count }}</p>
  <button @click="counter.increment">+1</button>
</template>`}</pre>
                        </div>
                    </div>
                </div>
            </div>

             {/* Key Takeaways */}
            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                <h4 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
                    ✅ 學完重點
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                     <div className="bg-white p-4 rounded-lg border border-indigo-200">
                        <strong className="text-indigo-800 block mb-1">👩‍🍼 寶媽角度</strong>
                        <p className="text-sm text-indigo-600">全家共用一台冰箱，誰需要牛奶都能隨時拿，資料不會亂。</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-indigo-200">
                        <strong className="text-indigo-800 block mb-1">💻 工程師角度</strong>
                        <p className="text-sm text-indigo-600">Pinia 幫你集中管理狀態，不用再 props/emit 傳來傳去，解決跨元件溝通難題。</p>
                    </div>
                </div>
            </div>
        </div>
    )
  },
  {
    id: "vue-6",
    title: "Day 6: 表單驗證 —— v-model 與必填檢查",
    summary: "v-model 綁定表單，並可加必填/格式檢查，避免錯誤。",
    date: "2024.11.06",
    tags: ["Vue3", "Form Validation", "v-model", "Computed"],
    readTime: "8 min",
    author: "工程師媽媽 Mega",
    image: "/Morimori/assets/article-image-default.png",
    category: "Vue3 Challenge",
    content: (
        <div className="space-y-8 text-stone-700">
            {/* Intro Card */}
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600 hidden md:block">
                        <FormInput className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="mb-4 font-bold text-lg text-emerald-900">
                            v-model 綁定表單，並可加必填/格式檢查，避免錯誤。
                        </p>
                        <p className="leading-relaxed">
                            表單是網站和使用者互動最常見的方式（登入、註冊、購物下單）。在 Vue3 裡，我們可以用 <code className="bg-emerald-100 px-1 rounded text-emerald-800">v-model</code> 來綁定輸入框，讓資料與畫面保持同步，再加上驗證條件，避免使用者輸入錯誤或漏填。
                            👉 就像你去餐廳點餐，如果沒有勾選主餐或飲料，服務生會提醒你「這個還沒填哦！」
                        </p>
                    </div>
                </div>
            </div>

            {/* Analogy: Shopping List */}
            <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-l-4 border-emerald-500 pl-4">
                     👩‍🍼 寶媽角度：購物清單檢查
                </h3>
                <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                        <div className="flex-1">
                             <p className="mb-4 text-orange-900">
                                寫購物清單時：如果漏寫「牛奶」，去超市就會買不到。如果數字寫錯，可能買太多或不夠。
                            </p>
                            <div className="bg-white p-4 rounded-lg border border-orange-200 shadow-sm relative">
                                <div className="absolute -top-3 -right-3 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs animate-bounce">!</div>
                                <h4 className="font-bold text-orange-800 mb-2 flex items-center gap-2">
                                    <ShoppingCart className="w-4 h-4" />
                                    購物清單
                                </h4>
                                <ul className="space-y-2 text-sm text-stone-600">
                                    <li className="flex items-center gap-2">
                                        <div className="w-4 h-4 border rounded border-stone-300"></div>
                                        <span>雞蛋 (1盒)</span>
                                    </li>
                                    <li className="flex items-center gap-2 opacity-50">
                                        <div className="w-4 h-4 border rounded border-stone-300 bg-stone-100"></div>
                                        <span>牛奶 (未填寫數量)</span>
                                        <span className="text-red-500 text-xs font-bold">⚠️ 請填寫數量</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                         <div className="flex-1 bg-white/60 p-4 rounded-lg border border-orange-200">
                             <div className="flex items-start gap-3">
                                <ListChecks className="w-8 h-8 text-orange-500 shrink-0" />
                                <div>
                                    <strong className="text-orange-900 block mb-1">解決辦法：出門前的小幫手</strong>
                                    <p className="text-sm text-orange-700">Vue 的表單驗證就是這個小幫手，確保資料正確無誤，提醒你「清單沒寫完整」。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Concept: Engineering Perspective */}
            <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-l-4 border-emerald-500 pl-4">
                     💻 工程師角度：v-model 與驗證
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                        <h4 className="font-bold text-stone-800 mb-4 flex items-center gap-2 text-lg">
                            <span className="bg-blue-100 p-1.5 rounded text-blue-600"><Link className="w-5 h-5" /></span>
                            v-model 雙向綁定
                        </h4>
                        <p className="text-stone-600 text-sm mb-4">輸入框內容會即時反映到變數，反之亦然。</p>
                        <div className="bg-stone-100 p-3 rounded text-xs font-mono text-stone-600">
                            &lt;input v-model="email" /&gt;
                        </div>
                    </div>

                     <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                        <h4 className="font-bold text-stone-800 mb-4 flex items-center gap-2 text-lg">
                            <span className="bg-red-100 p-1.5 rounded text-red-600"><AlertCircle className="w-5 h-5" /></span>
                            常見驗證方式
                        </h4>
                        <ul className="space-y-3 text-sm text-stone-600">
                            <li className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-emerald-500 mt-0.5" />
                                <span><strong>手動檢查：</strong>用 if 判斷是否符合條件</span>
                            </li>
                             <li className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-emerald-500 mt-0.5" />
                                <span><strong>computed：</strong>建立條件判斷，動態檢查</span>
                            </li>
                             <li className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-emerald-500 mt-0.5" />
                                <span><strong>第三方套件：</strong>如 VeeValidate / Yup (適合大型專案)</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Implementation Steps */}
            <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-l-4 border-emerald-500 pl-4">
                     📦 今天的實作：登入表單驗證
                </h3>
                <p className="mb-6 text-stone-600">
                    需求：1. 建立登入表單。2. Email 必填，必須包含 @。3. 密碼必填，至少 6 碼。
                </p>

                <div className="bg-stone-50 rounded-xl border border-stone-200 overflow-hidden">
                     <div className="p-3 border-b border-stone-200 bg-white flex items-center justify-between">
                         <div className="flex items-center gap-2">
                             <FileCode className="w-4 h-4 text-emerald-600" />
                             <span className="font-bold text-stone-700">Login.vue</span>
                         </div>
                     </div>
                     <div className="p-4 bg-stone-900 text-stone-300 font-mono text-sm overflow-x-auto">
<pre>{`<template>
  <div>
    <h2>登入表單</h2>
    <form @submit.prevent="handleSubmit">
      <label>Email:
        <input v-model="email" />
      </label>
      <p v-if="tried && !isEmailValid">⚠️ Email 格式錯誤</p>

      <label>密碼:
        <input type="password" v-model="password" />
      </label>
      <p v-if="tried && password.length < 6">⚠️ 密碼至少 6 碼</p>

      <button type="submit">登入</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const email = ref('')
const password = ref('')
const tried = ref(false) // 是否已經嘗試送出

// computed 動態檢查：只要 email 一變，這裡就會自動重算
const isEmailValid = computed(() => email.value.includes('@'))

function handleSubmit() {
  tried.value = true // 標記已嘗試送出，顯示錯誤訊息
  
  if (isEmailValid.value && password.value.length >= 6) {
    alert('✅ 登入成功！')
  }
}
</script>`}</pre>
                    </div>
                </div>
            </div>

             {/* Key Takeaways */}
            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                <h4 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
                    ✅ 學完重點
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                     <div className="bg-white p-4 rounded-lg border border-indigo-200">
                        <strong className="text-indigo-800 block mb-1">👩‍🍼 寶媽角度</strong>
                        <p className="text-sm text-indigo-600">像寫購物清單，少一項東西就會出錯，驗證幫你提醒「還沒寫」。</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-indigo-200">
                        <strong className="text-indigo-800 block mb-1">💻 工程師角度</strong>
                        <p className="text-sm text-indigo-600">學會用 v-model 綁定輸入，並透過條件檢查完成基礎表單驗證。</p>
                    </div>
                </div>
            </div>
        </div>
    )
  },
  {
    id: "vue-7",
    title: "Day 7: 生命週期鉤子 —— 元件的開店流程",
    summary: "Vue 元件有從建立到銷毀的流程，就像早餐店開店到打烊。",
    date: "2024.11.07",
    tags: ["Vue3", "Lifecycle Hooks", "onMounted", "onUnmounted"],
    readTime: "8 min",
    author: "工程師媽媽 Mega",
    image: "/Morimori/assets/article-image-default.png",
    category: "Vue3 Challenge",
    content: (
        <div className="space-y-8 text-stone-700">
            {/* Intro Card */}
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600 hidden md:block">
                        <Clock className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="mb-4 font-bold text-lg text-emerald-900">
                            Vue 元件有從建立到銷毀的流程，就像早餐店開店到打烊。
                        </p>
                        <p className="leading-relaxed">
                            在 Vue3 中，每個元件都有「生命週期」，也就是它從出生 → 使用 → 消失的過程。
                            👉 就像一間早餐店，會經歷 <span className="font-bold text-emerald-700">備料、開店、更新菜單、打烊</span> 的流程。
                            透過 <span className="bg-emerald-100 px-1 rounded text-emerald-800">生命週期鉤子（Lifecycle Hooks）</span>，我們可以在這些階段插入程式邏輯，做像是：初始化資料、呼叫 API、清除計時器或監聽器。
                        </p>
                    </div>
                </div>
            </div>

            {/* Analogy: Breakfast Shop */}
            <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-l-4 border-emerald-500 pl-4">
                     👩‍🍼 寶媽角度：早餐店營運
                </h3>
                <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
                     <div className="grid md:grid-cols-4 gap-4 mb-4">
                        <div className="bg-white p-4 rounded-lg border border-amber-200 text-center relative overflow-hidden">
                             <div className="absolute top-0 left-0 w-1 h-full bg-stone-300"></div>
                             <div className="mb-2 flex justify-center text-stone-400"><Store className="w-6 h-6" /></div>
                            <strong className="text-stone-700 block text-sm">備料 (Created)</strong>
                            <p className="text-xs text-stone-500 mt-1">準備食材</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-amber-200 text-center relative overflow-hidden">
                             <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                             <div className="mb-2 flex justify-center text-emerald-500"><PlayCircle className="w-6 h-6" /></div>
                            <strong className="text-emerald-800 block text-sm">開店 (Mounted)</strong>
                            <p className="text-xs text-emerald-600 mt-1">迎客、掛招牌</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-amber-200 text-center relative overflow-hidden">
                             <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                             <div className="mb-2 flex justify-center text-blue-500"><RefreshCw className="w-6 h-6" /></div>
                            <strong className="text-blue-800 block text-sm">更新 (Updated)</strong>
                            <p className="text-xs text-blue-600 mt-1">換菜單</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-amber-200 text-center relative overflow-hidden">
                             <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                             <div className="mb-2 flex justify-center text-red-500"><XCircle className="w-6 h-6" /></div>
                            <strong className="text-red-800 block text-sm">打烊 (Unmounted)</strong>
                            <p className="text-xs text-red-600 mt-1">收攤、關燈</p>
                        </div>
                    </div>
                    <div className="bg-white/60 p-4 rounded-lg border border-amber-200 text-center">
                        <p className="text-amber-800 text-sm">👉 每個階段都有不同工作，少做一步會出問題（例如：沒開店就賣餐、打烊沒關燈）。</p>
                    </div>
                </div>
            </div>

            {/* Concept: Engineering Perspective */}
            <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-l-4 border-emerald-500 pl-4">
                     💻 工程師角度：常用鉤子
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600"><PlayCircle className="w-5 h-5" /></div>
                            <h4 className="font-bold text-stone-800">onMounted</h4>
                        </div>
                        <p className="text-stone-600 text-sm">元件載入後執行，適合打 API、初始化操作。</p>
                    </div>

                     <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><RefreshCw className="w-5 h-5" /></div>
                            <h4 className="font-bold text-stone-800">onUpdated</h4>
                        </div>
                        <p className="text-stone-600 text-sm">元件資料或 DOM 更新後觸發。</p>
                    </div>

                     <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="bg-red-100 p-2 rounded-lg text-red-600"><XCircle className="w-5 h-5" /></div>
                            <h4 className="font-bold text-stone-800">onUnmounted</h4>
                        </div>
                        <p className="text-stone-600 text-sm">元件被移除時觸發，清除副作用（計時器、監聽器）。</p>
                    </div>
                </div>
                <p className="mt-4 text-stone-500 text-sm bg-stone-100 p-3 rounded-lg border border-stone-200">
                    💡 提醒：舊版 Vue2 的 created、mounted 等對應到 Vue3 Composition API 的 hook function。
                </p>
            </div>

            {/* Implementation Steps */}
            <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-l-4 border-emerald-500 pl-4">
                     📦 今天的實作：生命週期觀察站
                </h3>
                <p className="mb-6 text-stone-600">
                    需求：建立父子元件，透過 console.log 觀察元件的出生與消滅。
                </p>

                <div className="space-y-6">
                     {/* Child Component */}
                    <div className="bg-stone-50 rounded-xl border border-stone-200 overflow-hidden">
                         <div className="p-3 border-b border-stone-200 bg-white flex items-center justify-between">
                             <div className="flex items-center gap-2">
                                 <FileCode className="w-4 h-4 text-emerald-600" />
                                 <span className="font-bold text-stone-700">Child.vue (子元件)</span>
                             </div>
                             <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">監聽生命週期</span>
                         </div>
                         <div className="p-4 bg-stone-900 text-stone-300 font-mono text-sm overflow-x-auto">
<pre>{`<template>
  <p>現在數字：{{ count }}</p>
</template>

<script setup>
import { onMounted, onUpdated, onUnmounted } from 'vue'

const props = defineProps(['count'])

onMounted(() => console.log('🏪 元件掛載完成 → 餐館開張'))
onUpdated(() => console.log('📋 元件更新 → 菜單更新'))
onUnmounted(() => console.log('🌙 元件卸載 → 餐館打烊'))
</script>`}</pre>
                        </div>
                    </div>

                    {/* App Component */}
                     <div className="bg-stone-50 rounded-xl border border-stone-200 overflow-hidden">
                         <div className="p-3 border-b border-stone-200 bg-white flex items-center justify-between">
                             <div className="flex items-center gap-2">
                                 <FileCode className="w-4 h-4 text-emerald-600" />
                                 <span className="font-bold text-stone-700">App.vue (父元件)</span>
                             </div>
                             <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">控制開關</span>
                         </div>
                         <div className="p-4 bg-stone-900 text-stone-300 font-mono text-sm overflow-x-auto">
<pre>{`<template>
  <div>
    <h2>生命週期示範</h2>
    <button @click="count++">+1</button>
    <button @click="show = false">銷毀子元件</button>
    
    <!-- v-if="false" 時，元件會被 unmounted -->
    <Child v-if="show" :count="count" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Child from './Child.vue'

const count = ref(0)
const show = ref(true)
</script>`}</pre>
                        </div>
                    </div>
                </div>
            </div>

             {/* Key Takeaways */}
            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                <h4 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
                    ✅ 學完重點
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                     <div className="bg-white p-4 rounded-lg border border-indigo-200">
                        <strong className="text-indigo-800 block mb-1">👩‍🍼 寶媽角度</strong>
                        <p className="text-sm text-indigo-600">早餐店有完整的開店流程：準備 → 開門 → 更新 → 打烊。</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-indigo-200">
                        <strong className="text-indigo-800 block mb-1">💻 工程師角度</strong>
                        <p className="text-sm text-indigo-600">熟悉 onMounted、onUpdated、onUnmounted 等 hook，能在正確階段掛上邏輯。</p>
                    </div>
                </div>
            </div>
        </div>
    )
  },
  {
    id: "vue-8",
    title: "Day 8: provide/inject —— 跨層的紅包傳遞",
    summary: "爺爺直接把紅包給孫子，不用父母轉交。",
    date: "2024.11.08",
    tags: ["Vue3", "provide", "inject", "Props Drilling"],
    readTime: "8 min",
    author: "工程師媽媽 Mega",
    image: "/Morimori/assets/article-image-default.png",
    category: "Vue3 Challenge",
    content: (
        <div className="space-y-8 text-stone-700">
            {/* Intro Card */}
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600 hidden md:block">
                        <Gift className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="mb-4 font-bold text-lg text-emerald-900">
                            爺爺直接把紅包給孫子，不用父母轉交。
                        </p>
                        <p className="leading-relaxed">
                            在 Vue 專案裡，元件之間最常見的傳值方式是 props（父傳子）。但如果資料要從「爺爺 → 孫子」跨過好幾層，props 就會變得很長（Props Drilling）。
                            👉 Vue 提供 <code className="bg-emerald-100 px-1 rounded text-emerald-800">provide / inject</code>，讓「祖先元件」直接把資料提供給「後代元件」，中間的父母不用再幫忙轉交。
                        </p>
                    </div>
                </div>
            </div>

            {/* Analogy: Red Envelope */}
            <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-l-4 border-emerald-500 pl-4">
                     👩‍🍼 寶媽角度：過年發紅包
                </h3>
                <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                    <div className="flex flex-col md:flex-row items-center gap-4 justify-between relative">
                        {/* Grandfather */}
                        <div className="bg-white p-4 rounded-lg border border-red-200 text-center relative z-10 w-full md:w-auto">
                            <span className="text-3xl block mb-2">👴</span>
                            <strong className="text-red-900 block">爺爺</strong>
                            <span className="text-xs text-red-600 bg-red-100 px-2 py-0.5 rounded-full">provide</span>
                        </div>

                         {/* Arrow Long */}
                        <div className="hidden md:flex flex-1 flex-col items-center relative h-12 justify-center">
                            <div className="w-full border-t-2 border-dashed border-red-300 absolute top-1/2"></div>
                            <span className="bg-red-50 px-2 text-xs text-red-500 relative z-10">直接給紅包，跳過爸爸</span>
                            <ArrowDown className="w-4 h-4 text-red-300 absolute -bottom-4 md:hidden" />
                            <CornerDownRight className="hidden md:block w-6 h-6 text-red-300 absolute right-0 -top-3 transform rotate-45" />
                        </div>
                        
                         {/* Parent (Skipped) */}
                        <div className="bg-white/50 p-4 rounded-lg border border-red-100 text-center opacity-50 w-full md:w-auto grayscale">
                             <span className="text-3xl block mb-2">👨</span>
                            <strong className="text-stone-500 block">爸爸</strong>
                            <span className="text-xs text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">略過</span>
                        </div>

                        {/* Child */}
                        <div className="bg-white p-4 rounded-lg border border-red-200 text-center relative z-10 w-full md:w-auto">
                             <span className="text-3xl block mb-2">👶</span>
                            <strong className="text-red-900 block">孫子</strong>
                            <span className="text-xs text-red-600 bg-red-100 px-2 py-0.5 rounded-full">inject</span>
                        </div>
                    </div>
                    <div className="mt-6 bg-white/60 p-4 rounded-lg border border-red-200 text-center">
                         <p className="text-red-800 text-sm">👉 這樣就算中間有很多人，也不會搞混。直接傳遞最有效率。</p>
                    </div>
                </div>
            </div>

            {/* Concept: Engineering Perspective */}
            <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-l-4 border-emerald-500 pl-4">
                     💻 工程師角度：provide / inject
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
                        <h4 className="font-bold text-stone-800 mb-3 flex items-center gap-2">
                            <Share2 className="w-5 h-5 text-emerald-600" />
                            基本用法
                        </h4>
                        <ul className="space-y-3 text-sm text-stone-600">
                             <li className="flex flex-col">
                                <code className="bg-stone-100 px-2 py-1 rounded text-emerald-700 font-mono w-fit mb-1">provide(key, value)</code>
                                <span>祖先元件提供資料</span>
                            </li>
                             <li className="flex flex-col">
                                <code className="bg-stone-100 px-2 py-1 rounded text-blue-700 font-mono w-fit mb-1">inject(key)</code>
                                <span>���代元件取得資料</span>
                            </li>
                        </ul>
                    </div>

                     <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
                        <h4 className="font-bold text-stone-800 mb-3 flex items-center gap-2">
                            <Settings className="w-5 h-5 text-emerald-600" />
                            適用場景
                        </h4>
                        <ul className="space-y-2 text-sm text-stone-600">
                            <li className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-emerald-500 mt-0.5" />
                                <span>全域設定（主題顏色、語言切換）</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-emerald-500 mt-0.5" />
                                <span>不常更新、但多層元件都需要用的資料</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Implementation Steps */}
            <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-l-4 border-emerald-500 pl-4">
                     📦 今天的實作：跨層級傳遞主題
                </h3>
                <p className="mb-6 text-stone-600">
                    需求：爺爺提供主題資料，孫子直接取得，爸爸不參與。
                </p>

                <div className="space-y-6">
                    {/* Grandpa */}
                    <div className="bg-stone-50 rounded-xl border border-stone-200 overflow-hidden relative">
                         <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs px-2 py-1 rounded-bl">Provider</div>
                         <div className="p-3 border-b border-stone-200 bg-white flex items-center gap-2">
                             <FileCode className="w-4 h-4 text-emerald-600" />
                             <span className="font-bold text-stone-700">Grandpa.vue (爺爺)</span>
                         </div>
                         <div className="p-4 bg-stone-900 text-stone-300 font-mono text-sm overflow-x-auto">
<pre>{`<script setup>
import { provide, ref } from 'vue'
import Parent from './Parent.vue'

const theme = ref('🌞 Light Mode')
provide('theme', theme) // 提供資料
</script>

<template>
  <div>
    <h2>我是爺爺</h2>
    <Parent />
  </div>
</template>`}</pre>
                        </div>
                    </div>

                     {/* Parent */}
                    <div className="bg-stone-50 rounded-xl border border-stone-200 overflow-hidden opacity-75">
                         <div className="p-3 border-b border-stone-200 bg-white flex items-center gap-2">
                             <FileCode className="w-4 h-4 text-stone-400" />
                             <span className="font-bold text-stone-500">Parent.vue (爸爸)</span>
                             <span className="text-xs bg-stone-100 text-stone-500 px-2 py-0.5 rounded ml-auto">不處理資料</span>
                         </div>
                         <div className="p-4 bg-stone-900 text-stone-400 font-mono text-sm overflow-x-auto">
<pre>{`<template>
  <div>
    <h3>我是爸爸</h3>
    <Child />
  </div>
</template>`}</pre>
                        </div>
                    </div>

                    {/* Child */}
                    <div className="bg-stone-50 rounded-xl border border-stone-200 overflow-hidden relative">
                         <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl">Injector</div>
                         <div className="p-3 border-b border-stone-200 bg-white flex items-center gap-2">
                             <FileCode className="w-4 h-4 text-blue-600" />
                             <span className="font-bold text-stone-700">Child.vue (孫子)</span>
                         </div>
                         <div className="p-4 bg-stone-900 text-stone-300 font-mono text-sm overflow-x-auto">
<pre>{`<script setup>
import { inject } from 'vue'

const theme = inject('theme') // 取得資料
</script>

<template>
  <div>
    <h4>我是孫子，拿到主題：{{ theme }}</h4>
  </div>
</template>`}</pre>
                        </div>
                    </div>

                </div>
            </div>

             {/* Key Takeaways */}
            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                <h4 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
                    ✅ 學完重點
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                     <div className="bg-white p-4 rounded-lg border border-indigo-200">
                        <strong className="text-indigo-800 block mb-1">👩‍🍼 寶媽角度</strong>
                        <p className="text-sm text-indigo-600">爺爺直接把紅包交給孫子，中間的人不用管。</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-indigo-200">
                        <strong className="text-indigo-800 block mb-1">💻 工程師角度</strong>
                        <p className="text-sm text-indigo-600">provide/inject 適合跨層級傳值，避免 props 層層傳遞 (Props Drilling) 的麻煩。</p>
                    </div>
                </div>
            </div>
        </div>
    )
  },
  {
    id: "vue-9",
    title: "Day 9: slot 插槽 —— 元件的萬用櫥櫃",
    summary: "slot 是留白空格，父元件決定放什麼。",
    date: "2024.11.09",
    tags: ["Vue3", "slot", "component", "reusability"],
    readTime: "8 min",
    author: "工程師媽媽 Mega",
    image: "/Morimori/assets/article-image-default.png",
    category: "Vue3 Challenge",
    content: (
        <div className="space-y-8 text-stone-700">
            {/* Intro Card */}
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600 hidden md:block">
                        <Box className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="mb-4 font-bold text-lg text-emerald-900">
                            slot 是留白空格，父元件決定放什麼。
                        </p>
                        <p className="leading-relaxed">
                            在 Vue 中，<code className="bg-emerald-100 px-1 rounded text-emerald-800">slot 插槽</code> 允許父元件把「內容」塞進子元件的指定位置。
                            👉 這讓元件可以更彈性、更多樣化，不只是固定樣式。例如：一個「卡片元件」可能有標題區、內容區，父元件可以自由決定要放什麼內容。
                        </p>
                    </div>
                </div>
            </div>

            {/* Analogy: Cabinet */}
            <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-l-4 border-emerald-500 pl-4">
                     👩‍🍼 寶媽角度：萬用櫥櫃
                </h3>
                <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                        <div>
                             <p className="text-stone-700 leading-relaxed mb-4">
                                就像買了一個 <span className="font-bold text-amber-800">萬用櫥櫃</span>：櫥櫃本身有框架，但裡面留空格。你可以放花瓶、放玩具、放書本。
                                <br/>👉 slot 就是這個「留白空格」，讓你隨意擺放需要的東西。
                            </p>
                            <div className="flex gap-2 text-sm">
                                <span className="bg-white px-2 py-1 rounded border border-amber-200 text-amber-800">🧸 放玩具</span>
                                <span className="bg-white px-2 py-1 rounded border border-amber-200 text-amber-800">📚 放書本</span>
                                <span className="bg-white px-2 py-1 rounded border border-amber-200 text-amber-800">💐 放花瓶</span>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-amber-200 relative">
                             {/* Cabinet Graphic */}
                             <div className="border-4 border-amber-800 rounded h-32 w-full relative bg-amber-100">
                                 {/* Shelves */}
                                 <div className="absolute top-1/3 w-full h-1 bg-amber-800"></div>
                                 <div className="absolute top-2/3 w-full h-1 bg-amber-800"></div>
                                 
                                 {/* Slot Placeholder */}
                                 <div className="absolute top-2 left-1/4 w-1/2 h-8 border-2 border-dashed border-amber-400 bg-white/50 flex items-center justify-center text-xs text-amber-600 rounded">
                                     [Slot: 標題]
                                 </div>
                                  <div className="absolute bottom-2 left-4 right-4 h-16 border-2 border-dashed border-amber-400 bg-white/50 flex items-center justify-center text-xs text-amber-600 rounded">
                                     [Slot: 內容]
                                 </div>
                             </div>
                             <p className="text-center text-xs text-stone-500 mt-2">櫥櫃框架不變，內容物隨意換</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Concept: Engineering Perspective */}
            <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-l-4 border-emerald-500 pl-4">
                     💻 工程師角度：Slot 機制
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
                        <h4 className="font-bold text-stone-800 mb-3 flex items-center gap-2">
                            <Component className="w-5 h-5 text-emerald-600" />
                            核心概念
                        </h4>
                        <ul className="space-y-3 text-sm text-stone-600">
                             <li className="flex items-start gap-2">
                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                                <span><strong>slot：</strong>允許父元件插入內容到子元件。</span>
                            </li>
                             <li className="flex items-start gap-2">
                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                                <span><strong>具名 slot：</strong>可以定義不同區域（例如：標題 slot、內容 slot）。</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                                <span><strong>default slot：</strong>如果父元件沒有提供內容，子元件顯示預設值。</span>
                            </li>
                        </ul>
                    </div>

                     <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
                        <h4 className="font-bold text-stone-800 mb-3 flex items-center gap-2">
                            <Grip className="w-5 h-5 text-emerald-600" />
                            適用場景
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            <span className="bg-stone-100 px-3 py-1.5 rounded-full text-sm text-stone-700">卡片 (Card)</span>
                            <span className="bg-stone-100 px-3 py-1.5 rounded-full text-sm text-stone-700">彈窗 (Modal)</span>
                            <span className="bg-stone-100 px-3 py-1.5 rounded-full text-sm text-stone-700">版面 (Layout)</span>
                            <span className="bg-stone-100 px-3 py-1.5 rounded-full text-sm text-stone-700">按鈕 (Button)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Implementation Steps */}
            <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-l-4 border-emerald-500 pl-4">
                     📦 今天的實作：萬用卡片
                </h3>
                <p className="mb-6 text-stone-600">
                    需求：建立一個 Card 元件，讓父元件決定「標題」和「內容」要顯示什麼。
                </p>

                <div className="space-y-6">
                    {/* Card Component */}
                    <div className="bg-stone-50 rounded-xl border border-stone-200 overflow-hidden">
                         <div className="p-3 border-b border-stone-200 bg-white flex items-center justify-between">
                             <div className="flex items-center gap-2">
                                 <FileCode className="w-4 h-4 text-emerald-600" />
                                 <span className="font-bold text-stone-700">Card.vue (子元件)</span>
                             </div>
                             <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">定義 Slot</span>
                         </div>
                         <div className="p-4 bg-stone-900 text-stone-300 font-mono text-sm overflow-x-auto">
<pre>{`<template>
  <div class="card">
    <header>
      <!-- 具名插槽：title -->
      <slot name="title">預設標題</slot>
    </header>
    <main>
      <!-- 預設插槽 -->
      <slot>這裡是預設內容</slot>
    </main>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 12px;
  margin: 8px;
  border-radius: 6px;
}
</style>`}</pre>
                        </div>
                    </div>

                    {/* App Component */}
                     <div className="bg-stone-50 rounded-xl border border-stone-200 overflow-hidden">
                         <div className="p-3 border-b border-stone-200 bg-white flex items-center justify-between">
                             <div className="flex items-center gap-2">
                                 <FileCode className="w-4 h-4 text-emerald-600" />
                                 <span className="font-bold text-stone-700">App.vue (父元件)</span>
                             </div>
                             <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">使用 Slot</span>
                         </div>
                         <div className="p-4 bg-stone-900 text-stone-300 font-mono text-sm overflow-x-auto">
<pre>{`<template>
  <div>
    <!-- 卡片 1：日記 -->
    <Card>
      <template #title>
        <h2>🐰 兔寶的日記</h2>
      </template>
      <p>今天吃了胡蘿蔔 🥕，還跟媽媽玩遊戲！</p>
    </Card>

    <!-- 卡片 2：待辦清單 -->
    <Card>
      <template #title>
        <h2>📋 待辦清單</h2>
      </template>
      <ul>
        <li>洗衣服</li>
        <li>拖地板</li>
      </ul>
    </Card>
  </div>
</template>

<script setup>
import Card from './Card.vue'
</script>`}</pre>
                        </div>
                    </div>
                </div>
            </div>

             {/* Key Takeaways */}
            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                <h4 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
                    ✅ 學完重點
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                     <div className="bg-white p-4 rounded-lg border border-indigo-200">
                        <strong className="text-indigo-800 block mb-1">👩‍🍼 寶媽角度</strong>
                        <p className="text-sm text-indigo-600">櫥櫃裡留空格，你決定要放什麼。</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-indigo-200">
                        <strong className="text-indigo-800 block mb-1">💻 工程師角度</strong>
                        <p className="text-sm text-indigo-600">slot 讓子元件保持彈性，父元件可以插入自訂內容，增加元件可重用性。</p>
                    </div>
                </div>
            </div>
        </div>
    )
  },
  {
    id: "vue-10",
    title: "Day 10: Teleport —— 元件的瞬間移動",
    summary: "Teleport 讓元素渲染到別處，適合 Modal/Toast。",
    date: "2024.11.10",
    tags: ["Vue3", "Teleport", "Modal"],
    readTime: "6 min",
    author: "工程師媽媽 Mega",
    image: "/Morimori/assets/article-image-default.png",
    category: "Vue3 Challenge",
    content: (
        <div className="space-y-8 text-stone-700">
            {/* Intro Card */}
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                <div className="flex items-start gap-4">
                     <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600 hidden md:block">
                        <Zap className="w-6 h-6" />
                    </div>
                    <div>
                         <p className="mb-4 font-bold text-lg text-emerald-900">
                            Teleport 讓元素渲染到別處，適合 Modal/Toast。
                        </p>
                         <p className="leading-relaxed">
                            在 Vue 中，元件通常會渲染在它被呼叫的地方。但有些情境下，我們希望「元素出現在另一個地方」，例如 Modal 彈窗、Toast 提示。
                            <br/>👉 Teleport 可以把元件的內容「瞬間移動」到指定的 DOM 節點（通常是 body）。
                        </p>
                    </div>
                </div>
            </div>

             {/* Concept */}
            <div className="grid md:grid-cols-2 gap-6">
                 <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
                    <strong className="text-emerald-600 block mb-2 text-lg">👩‍🍼 寶媽角度</strong>
                    <p className="text-stone-600">
                        在客廳按下電燈開關，結果亮的卻是陽台的燈。
                        <br/>👉 這就是「瞬間移動」的效果：按鈕和燈泡不在同一個房間，但可以互相控制。
                    </p>
                </div>
                 <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
                    <strong className="text-emerald-600 block mb-2 text-lg">💻 工程師角度</strong>
                     <p className="text-stone-600 mb-2">Teleport 語法：</p>
                     <div className="bg-stone-900 text-stone-300 p-2 rounded text-sm font-mono mb-2">
                        &lt;teleport to="body"&gt;<br/>
                        &nbsp;&nbsp;&lt;div&gt;這裡的內容會渲染到 body&lt;/div&gt;<br/>
                        &lt;/teleport&gt;
                     </div>
                     <ul className="list-disc pl-5 text-sm text-stone-500">
                         <li>常見應用：Modal 彈窗、Toast 訊息、Tooltip 提示</li>
                         <li>好處：避免 CSS 層級 (z-index) 被其他元件影響，確保 UI 能正確顯示在最上層。</li>
                     </ul>
                </div>
            </div>

            {/* Implementation */}
            <div>
                 <h3 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-l-4 border-emerald-500 pl-4">
                     📦 今天的實作：Modal 彈窗
                </h3>
                 <p className="mb-4 text-stone-600">
                    需求：<br/>
                    ✅ 建立一個 Modal 彈窗元件。<br/>
                    ✅ 點擊按鈕可以開啟/關閉 Modal。<br/>
                    ✅ Modal 的內容實際上被渲染在 body。
                </p>

                <div className="space-y-6">
                     {/* File 1: Modal.vue */}
                    <div className="bg-stone-50 rounded-xl border border-stone-200 overflow-hidden">
                         <div className="p-3 border-b border-stone-200 flex items-center justify-between bg-white">
                             <div className="flex items-center gap-2">
                                 <FileCode className="w-4 h-4 text-emerald-600" />
                                 <span className="font-bold text-stone-700">Modal.vue</span>
                                 <span className="text-xs bg-stone-100 text-stone-500 px-2 py-0.5 rounded">子組件</span>
                             </div>
                         </div>
                         <div className="p-4 bg-stone-900 text-stone-300 font-mono text-sm overflow-x-auto">
<pre>{`<template>
  <teleport to="body">
    <div class="overlay">
      <div class="modal">
        <slot />
        <button @click="$emit('close')">關閉</button>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
}
.modal {
  background: white;
  padding: 20px;
  margin: 100px auto;
  width: 250px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}
</style>`}</pre>
                         </div>
                    </div>

                    {/* File 2: App.vue */}
                    <div className="bg-stone-50 rounded-xl border border-stone-200 overflow-hidden">
                         <div className="p-3 border-b border-stone-200 flex items-center justify-between bg-white">
                             <div className="flex items-center gap-2">
                                 <FileCode className="w-4 h-4 text-emerald-600" />
                                 <span className="font-bold text-stone-700">App.vue</span>
                                 <span className="text-xs bg-stone-100 text-stone-500 px-2 py-0.5 rounded">父組件</span>
                             </div>
                         </div>
                         <div className="p-4 bg-stone-900 text-stone-300 font-mono text-sm overflow-x-auto">
<pre>{`<template>
  <button @click="show = true">打開彈窗</button>

  <Modal v-if="show" @close="show = false">
    <h2>這是彈跳視窗</h2>
    <p>雖然我寫在 App.vue，但實際上渲染在 body！</p>
  </Modal>
</template>

<script setup>
import { ref } from 'vue'
import Modal from './Modal.vue'

const show = ref(false)
</script>`}</pre>
                         </div>
                    </div>
                </div>
            </div>

            {/* Key Takeaways */}
            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                <h4 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
                    ✅ 學完重點
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                     <div className="bg-white p-4 rounded-lg border border-indigo-200">
                        <strong className="text-indigo-800 block mb-1">👩‍🍼 寶媽角度</strong>
                        <p className="text-sm text-indigo-600">客廳的開關可以控制陽台的燈，元件能「瞬間移動」到別處。</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-indigo-200">
                        <strong className="text-indigo-800 block mb-1">💻 工程師角度</strong>
                        <p className="text-sm text-indigo-600">Teleport 把元素渲染到指定節點，適合做 Modal、Toast 等全局提示元件。</p>
                    </div>
                </div>
            </div>
        </div>
    )
  },
  {
    id: "vue-11",
    title: "Day 11: Transition —— 元件的華麗走秀",
    summary: "Transition 幫元素加進出場動畫。",
    date: "2024.11.11",
    tags: ["Vue3", "Transition", "Animation"],
    readTime: "5 min",
    author: "工程師媽媽 Mega",
    image: "/Morimori/assets/article-image-default.png",
    category: "Vue3 Challenge",
    content: (
        <div className="space-y-8 text-stone-700">
             {/* Intro Card */}
             <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                <div className="flex items-start gap-4">
                     <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600 hidden md:block">
                        <PlayCircle className="w-6 h-6" />
                    </div>
                    <div>
                         <p className="mb-4 font-bold text-lg text-emerald-900">
                            Transition 幫元素加進出場動畫。
                        </p>
                         <p className="leading-relaxed">
                            在 Vue 中，當元素進入或離開畫面時，可以加上過場動畫。
                            <br/>👉 這讓使用者感覺畫面更流暢、自然。
                        </p>
                    </div>
                </div>
            </div>

            {/* Concept Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                 <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
                    <strong className="text-emerald-600 block mb-2 text-lg">👩‍🍼 寶媽角度</strong>
                    <p className="text-stone-600 mb-2">兔寶換衣服走出房間：</p>
                     <ul className="list-disc pl-5 text-sm text-stone-500">
                         <li>換衣服（進入動畫）</li>
                         <li>揮手再見（離開動畫）</li>
                     </ul>
                     <p className="mt-2 text-stone-600 text-sm">一個小小的動作，加上過場效果，看起來就很優雅。</p>
                </div>
                 <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
                    <strong className="text-emerald-600 block mb-2 text-lg">💻 工程師角度</strong>
                     <ul className="list-disc pl-5 text-sm text-stone-500 space-y-1">
                         <li>使用 <code className="bg-stone-100 px-1 rounded">&lt;transition&gt;</code> 包裹元素。</li>
                         <li>Vue 會在元素顯示/消失時，自動套上 class：
                            <ul className="pl-4 mt-1 space-y-1 text-xs">
                                <li>v-enter-from、v-enter-active、v-enter-to</li>
                                <li>v-leave-from、v-leave-active、v-leave-to</li>
                            </ul>
                         </li>
                         <li>可以透過 CSS 控制動畫效果。</li>
                     </ul>
                </div>
            </div>

            {/* Implementation */}
            <div>
                 <h3 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-l-4 border-emerald-500 pl-4">
                     📦 今天的實作：淡入淡出按鈕
                </h3>
                 <p className="mb-4 text-stone-600">
                    需求：建立一個按鈕，點擊後顯示/隱藏文字，並附上淡入淡出效果。
                </p>

                <div className="bg-stone-50 rounded-xl border border-stone-200 overflow-hidden">
                     <div className="p-3 border-b border-stone-200 flex items-center justify-between bg-white">
                         <div className="flex items-center gap-2">
                             <FileCode className="w-4 h-4 text-emerald-600" />
                             <span className="font-bold text-stone-700">App.vue</span>
                         </div>
                     </div>
                     <div className="p-4 bg-stone-900 text-stone-300 font-mono text-sm overflow-x-auto">
<pre>{`<template>
  <button @click="show = !show">切換文字</button>
  <transition name="fade">
    <p v-if="show">Hello Vue Transition!</p>
  </transition>
</template>

<script setup>
import { ref } from 'vue'
const show = ref(true)
</script>

<style scoped>
/* 進場起點、離場終點 */
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* 進場過程、離場過程 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

/* 進場終點、離場起點 (通常是預設值，可省略) */
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
</style>`}</pre>
                     </div>
                </div>
            </div>

             {/* Key Takeaways */}
            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                <h4 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
                    ✅ 學完重點
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                     <div className="bg-white p-4 rounded-lg border border-indigo-200">
                        <strong className="text-indigo-800 block mb-1">👩‍🍼 寶媽角度</strong>
                        <p className="text-sm text-indigo-600">加上走秀效果，動作更優雅。</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-indigo-200">
                        <strong className="text-indigo-800 block mb-1">💻 工程師角度</strong>
                        <p className="text-sm text-indigo-600">透過 <code className="bg-indigo-50 px-1 rounded">&lt;transition&gt;</code> 與 CSS class，實現元素的進出場動畫。</p>
                    </div>
                </div>
            </div>
        </div>
    )
  }
];

// UiPath Data
export const UIPATH_ARTICLES: TechArticle[] = [
  {
    id: "ui-new-6",
    title: "UiPath Assistant 連線與授權設定（開發者）",
    summary: "Service URL 與 Machine Key 的差異、使用情境與設定方式總整理。開發者必備的環境建置知識。",
    date: "2026.01.07",
    tags: ["UiPath", "Assistant", "Machine Key", "Service URL", "Developer"],
    readTime: "6 min",
    author: "工程師媽媽 Mega",
    image: "/Morimori/assets/article-image-default.png",
    category: "UiPath",
    content: (
        <div className="space-y-8 text-stone-700">
            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 text-stone-700">
                <p className="mb-4 font-bold text-indigo-900 text-lg">
                    為什麼需要設定 Assistant 連線？
                </p>
                <p className="mb-2">在進行 UiPath 開發時，開發者需要先透過 UiPath Assistant（或 UiPath Robot）與 Orchestrator 進行連線與授權，才能做到以下幾件事：</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-stone-600">
                    <li>啟動 Studio 並取得 License</li>
                    <li>發佈流程（Publish Package）</li>
                    <li>執行 Orchestrator 上的流程</li>
                </ul>
            </div>

            <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-l-4 border-stone-500 pl-4">
                    一、連線設定入口
                </h3>
                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                    <div className="flex flex-wrap items-center gap-2 text-sm md:text-base">
                        <span className="bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200 font-bold text-stone-700">開啟 UiPath Assistant</span>
                        <span className="text-stone-400">→</span>
                        <span className="bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200 font-bold text-stone-700">右上角頭像 / 圖示</span>
                        <span className="text-stone-400">→</span>
                        <span className="bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200 font-bold text-stone-700">Preferences</span>
                        <span className="text-stone-400">→</span>
                        <span className="bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 font-bold text-emerald-700">Orchestrator Settings</span>
                    </div>
                    <div className="mt-6 p-4 bg-stone-50 rounded-lg border border-stone-100 text-sm text-stone-600">
                        <strong className="block text-stone-800 mb-2">你會看到以下關鍵設定：</strong>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2"><Settings className="w-4 h-4" /> Connection Type（連線方式）</li>
                            <li className="flex items-center gap-2"><Link className="w-4 h-4" /> Orchestrator URL</li>
                            <li className="flex items-center gap-2"><Shield className="w-4 h-4" /> Machine Key（使用機器金鑰時需要）</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-l-4 border-blue-500 pl-4">
                    二、兩種連線方式比較
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Service URL Card */}
                    <div className="bg-blue-50 rounded-xl border border-blue-100 overflow-hidden flex flex-col">
                        <div className="p-4 bg-blue-100/50 border-b border-blue-200 flex items-center gap-2">
                            <User className="w-5 h-5 text-blue-700" />
                            <h4 className="font-bold text-lg text-blue-800">1. Service URL（半自動）</h4>
                        </div>
                        <div className="p-6 flex-1 space-y-4">
                            <div className="flex gap-2 text-sm text-blue-900 bg-white/60 p-2 rounded">
                                <span className="font-bold shrink-0">適用角色：</span>
                                <span>開發者（Developer）、測試人員</span>
                            </div>
                            <ul className="space-y-3 text-sm text-stone-700">
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-emerald-500 mt-0.5" />
                                    <span><strong>連線方式：</strong>使用 Tenant / Folder 的 URL 登入</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-emerald-500 mt-0.5" />
                                    <span><strong>設定簡易度：</strong>高（使用 AD / SSO / Email 登入）</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-emerald-500 mt-0.5" />
                                    <span><strong>手動啟動流程：</strong>✔ 可以（Assistant 顯示流程列表）</span>
                                </li>
                            </ul>
                            <div className="mt-auto pt-4 border-t border-blue-200/50">
                                <p className="text-xs text-blue-800 leading-relaxed">
                                    <strong>說明：</strong>Assistant 會自動抓取使用者的 License 與 Folder 權限。適合日常開發，或需要與人互動的流程。
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Machine Key Card */}
                    <div className="bg-stone-100 rounded-xl border border-stone-200 overflow-hidden flex flex-col">
                         <div className="p-4 bg-stone-200/50 border-b border-stone-300 flex items-center gap-2">
                            <Cpu className="w-5 h-5 text-stone-700" />
                            <h4 className="font-bold text-lg text-stone-800">2. Machine Key（全自動）</h4>
                        </div>
                        <div className="p-6 flex-1 space-y-4">
                            <div className="flex gap-2 text-sm text-stone-900 bg-white/60 p-2 rounded">
                                <span className="font-bold shrink-0">適用角色：</span>
                                <span>機器人執行環境（Unattended Robot）</span>
                            </div>
                             <ul className="space-y-3 text-sm text-stone-700">
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-emerald-500 mt-0.5" />
                                    <span><strong>連線方式：</strong>Machine Key ＋ OC URL</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-emerald-500 mt-0.5" />
                                    <span><strong>設定簡易度：</strong>中（需管理員提供 Key）</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-500 text-xs font-bold mt-0.5">✕</span>
                                    <span><strong>手動啟動流程：</strong>❌ 不行（背景靜默執行）</span>
                                </li>
                            </ul>
                            <div className="mt-auto pt-4 border-t border-stone-300/50">
                                <p className="text-xs text-stone-800 leading-relaxed">
                                    <strong>說明：</strong>完全自動化，不需要人工登入。流程由 Orchestrator 的 Triggers 直接下發。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                 <h3 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-l-4 border-stone-500 pl-4">
                    三、Service URL vs Machine Key 比較表
                </h3>
                <div className="overflow-hidden rounded-xl border border-stone-200">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-stone-50 text-stone-700 font-bold uppercase">
                            <tr>
                                <th className="px-6 py-4">項目</th>
                                <th className="px-6 py-4 text-blue-700">Service URL（半自動）</th>
                                <th className="px-6 py-4 text-stone-700">Machine Key（全自動）</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 bg-white">
                            {[
                                { item: "指定方式", v1: "Tenant URL", v2: "Machine Key" },
                                { item: "需要使用者登入", v1: "✔ 是", v2: "❌ 否" },
                                { item: "顯示流程列表", v1: "✔ 可以", v2: "❌ 無" },
                                { item: "可手動啟動", v1: "✔ 可以", v2: "❌ 不行" },
                                { item: "適合開發者", v1: "✔ 最佳", v2: "✔ 可用（較少用）" },
                                { item: "適合無人值守", v1: "❌ 不適合", v2: "✔ 最佳" },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-stone-50/50">
                                    <td className="px-6 py-3 font-bold text-stone-800">{row.item}</td>
                                    <td className="px-6 py-3 text-stone-600">{row.v1}</td>
                                    <td className="px-6 py-3 text-stone-600">{row.v2}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-amber-50 p-6 rounded-xl border border-amber-100 text-amber-900">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-600" />
                    常見問題：同一台機器可以同時做開發與機器人嗎？
                </h3>
                <p className="mb-3 font-bold">可以。只要你使用兩種連線方式之一即可。</p>
                <p className="mb-4 text-sm text-amber-800">但不建議同時並存（會造成權限、流程列表混亂）。</p>
                <div className="bg-white/60 p-4 rounded-lg text-sm space-y-2">
                    <p><strong>情境 A：</strong>想開發 → 使用 <span className="text-blue-600 font-bold">Service URL</span></p>
                    <p><strong>情境 B：</strong>想讓機器人跑排程 → 使用 <span className="text-stone-600 font-bold">Machine Key</span></p>
                    <div className="pt-2 border-t border-amber-200 mt-2">
                        <p className="text-xs">💡 如果是「一台機器兼任開發＋無人值守」，建議用 <strong>Machine Key</strong>，但在 Orchestrator 上分配 <strong>Developer License</strong> 給該機器/帳號，這樣 Studio 也能打開。</p>
                    </div>
                </div>
            </div>

            <div className="bg-stone-800 text-stone-200 p-8 rounded-2xl mt-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    開發者最佳建議設定
                </h3>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between border-b border-stone-600 pb-2">
                       <span className="text-stone-400">本機開發、測試流程</span>
                       <span className="font-bold text-emerald-400">Service URL</span>
                   </div>
                   <div className="flex justify-between border-b border-stone-600 pb-2">
                       <span className="text-stone-400">需要看 Assistant 上流程列表</span>
                       <span className="font-bold text-emerald-400">Service URL</span>
                   </div>
                   <div className="flex justify-between border-b border-stone-600 pb-2">
                       <span className="text-stone-400">無人值守（Unattended）佈署</span>
                       <span className="font-bold text-orange-400">Machine Key</span>
                   </div>
                   <div className="mt-4 pt-2 text-center text-stone-400 text-xs">
                        👉 開發者用 Service URL（可手動可瀏覽），機器人用 Machine Key（全自動）
                   </div>
                </div>
            </div>
        </div>
    )
  },
  {
    id: "ui-new-5",
    title: "UiPath OC Folder 資料夾管理",
    summary: "Folder 是一個部門級、專案級的自動化管理空間，包含 Process, Jobs, Triggers, Queues, Assets 等功能的完整介紹。",
    date: "2026.01.06",
    tags: ["UiPath", "Folder", "Process", "Queue", "Assets"],
    readTime: "8 min",
    author: "工程師媽媽 Mega",
    image: "/Morimori/assets/article-image-default.png",
    category: "UiPath",
    content: (
        <div className="space-y-8 text-stone-700">
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 text-stone-700">
                <p className="mb-4 font-bold text-emerald-900 text-lg">
                    Folder 是一個部門級、專案級的自動化管理空間
                </p>
                <p className="mb-4">在 UiPath Orchestrator 中，Folder（資料夾） 是自動化治理的核心概念之一。 每個 Folder 都是一個獨立的、��給自足的自動化空間，包含流程（Processes）、機器人執行（Jobs）、排程（Triggers）、佇列（Queues）、資產（Assets）、儲存空間（Buckets）與監控功能。</p>
                <p>如果說 Tenant 是企業級空間，那 Folder 就是部門級或專案級空間。</p>
            </div>

            <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-l-4 border-emerald-500 pl-4">
                    一、Folder 主功能總覽
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="bg-stone-100 text-stone-600 px-2 py-1 rounded text-sm font-bold">1️⃣ Home</span>
                        </div>
                        <p className="text-stone-600 text-sm">顯示資料夾的整體概況，例如：已部署的 Process 數量、Queue 與 Asset 數量、機器人 Job 執行狀態、最近警示與 log 摘要。用於快速掌握此 Folder 的整體使用狀況。</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="bg-stone-100 text-stone-600 px-2 py-1 rounded text-sm font-bold">2️⃣ Automations（核心）</span>
                        </div>
                        <ul className="list-disc pl-5 text-stone-600 text-sm space-y-1">
                            <li><strong>Processes：</strong>自動化流程（Studio 發布的 Package）</li>
                            <li><strong>Jobs：</strong>流程執行的實例</li>
                            <li><strong>Triggers：</strong>排程器，定時啟動 Job</li>
                            <li><strong>Logs：</strong>Job 執行時產生的紀錄（Info/Warning/Error）</li>
                        </ul>
                        <p className="text-stone-500 text-xs mt-2">Automations 是 Folder 中「機器人執行」的中心。</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="bg-stone-100 text-stone-600 px-2 py-1 rounded text-sm font-bold">3️⃣ Monitoring（監控）</span>
                        </div>
                        <ul className="list-disc pl-5 text-stone-600 text-sm space-y-1">
                            <li>Overview（整體運行狀況）</li>
                            <li>Machines（機器狀態）</li>
                            <li>Processes（各流程狀態）</li>
                            <li>Queues（佇列處理能力）</li>
                            <li>SLA（服務等級監控）</li>
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="bg-stone-100 text-stone-600 px-2 py-1 rounded text-sm font-bold">4️⃣ Queues（佇列）</span>
                        </div>
                        <ul className="list-disc pl-5 text-stone-600 text-sm space-y-1">
                            <li><strong>Queues：</strong>佇列設定與項目（Queue Items）</li>
                            <li><strong>Review Requests：</strong>需要人工覆核的工作</li>
                        </ul>
                        <p className="text-stone-500 text-xs mt-2">Queues 是大規模處理大量任務時最常用的機制。</p>
                    </div>

                     <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="bg-stone-100 text-stone-600 px-2 py-1 rounded text-sm font-bold">5️⃣ Assets（資產）</span>
                        </div>
                        <p className="text-stone-600 text-sm mb-2">集中管理流程中用到的設定值，例如：Text, Integer, Bool, Credential（加密帳密）。</p>
                        <p className="text-stone-500 text-xs">流程可透過 Studio 的 Get Asset / Set Asset 存取。</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="bg-stone-100 text-stone-600 px-2 py-1 rounded text-sm font-bold">6️⃣ Storage Buckets</span>
                        </div>
                        <p className="text-stone-600 text-sm mb-2">提供資料夾專屬的儲存空間，用來存：PDF、圖片、Excel、JSON 等檔案。</p>
                        <p className="text-stone-500 text-xs">適合文件處理或需要跨流程共享檔案的情境。</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm md:col-span-2">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="bg-stone-100 text-stone-600 px-2 py-1 rounded text-sm font-bold">7️⃣ Settings（設定）</span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <strong className="text-stone-700 text-sm block">Manage Access</strong>
                                <p className="text-stone-600 text-xs">顯示與配置：哪些帳號可以存取此 Folder、他們擁有什麼角色（Role）</p>
                            </div>
                            <div>
                                <strong className="text-stone-700 text-sm block">Machines</strong>
                                <p className="text-stone-600 text-xs">顯示此 Folder 使用的機器（Robot 執行環境）並設定哪些機器可執行此 Folder 的流程。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-l-4 border-emerald-500 pl-4">
                    二、Automations 詳細操作指南
                </h3>
                
                <div className="space-y-6">
                    <div className="relative pl-8 border-l-2 border-emerald-100 pb-2">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow-sm"></div>
                        <h4 className="font-bold text-lg text-stone-800 mb-2">1️⃣ 將 User 與 Machines 加入 Folder</h4>
                        <p className="text-stone-600 mb-2">為了讓機器人可以執行流程，你需要：</p>
                        <ul className="list-disc pl-5 text-sm text-stone-600 mb-2">
                            <li>把帳號加入 Folder (Settings → Manage Access)</li>
                            <li>把機器加入 Folder (Settings → Machines)</li>
                        </ul>
                        <div className="bg-amber-50 p-3 rounded text-sm text-amber-800 border border-amber-100">
                            <strong>⚠️ 重要：</strong>若建立 Job，需要同時指定執行者（User）與執行機器（Machine）。
                        </div>
                    </div>

                    <div className="relative pl-8 border-l-2 border-emerald-100 pb-2">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow-sm"></div>
                        <h4 className="font-bold text-lg text-stone-800 mb-2">2️⃣ 加入 Process（流程）</h4>
                        <p className="text-stone-600 mb-2">Process 是從 Studio 發布（Publish）的 Package，再建立於 Folder 中。</p>
                        <p className="text-sm text-stone-500 mb-2">路徑：Automations → Processes → Add Process</p>
                        <ul className="list-disc pl-5 text-sm text-stone-600">
                            <li>Job Recording 功能可錄製流程畫面</li>
                            <li>一個 Package 可以建立多個 Process（例如手動版與排程版）</li>
                        </ul>
                    </div>

                    <div className="relative pl-8 border-l-2 border-emerald-100 pb-2">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow-sm"></div>
                        <h4 className="font-bold text-lg text-stone-800 mb-2">3️⃣ Process 流程升版（Upgrade）</h4>
                        <p className="text-stone-600 mb-2">當 Package 發布新版本時，OC 會自動偵測並提醒。</p>
                        <p className="text-sm text-stone-500 mb-2">操作：Process → … → Upgrade to latest version / Edit</p>
                        <p className="text-sm text-stone-500">💡 若此 Process 有設排程（Trigger），Trigger 會自動跑新版流程。</p>
                    </div>
                    
                    <div className="relative pl-8 border-l-2 border-emerald-100">
                         <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow-sm"></div>
                        <h4 className="font-bold text-lg text-stone-800 mb-2">4️⃣ Jobs 與 Logs</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-stone-50 p-3 rounded border border-stone-100">
                                <strong className="block text-stone-700 mb-1">Jobs（執行紀錄）</strong>
                                <ul className="list-disc pl-5 text-xs text-stone-600">
                                    <li>追蹤狀態 (Running/Faulted/Successful)</li>
                                    <li>查看 Input / Output</li>
                                    <li>下載 Error Log</li>
                                </ul>
                            </div>
                            <div className="bg-stone-50 p-3 rounded border border-stone-100">
                                <strong className="block text-stone-700 mb-1">Logs（執行日誌）</strong>
                                <ul className="list-disc pl-5 text-xs text-stone-600">
                                    <li>Info / Warning / Error</li>
                                    <li>查錯、分析流程時間、查看每一步的輸出</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-l-4 border-blue-500 pl-4">
                    三、進階管理：Assets, Queues, Triggers
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                        <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                            💎 Assets（資產）
                        </h4>
                        <p className="text-sm text-blue-900 mb-3">集中管理 Token, API Key, 帳號密碼, 設定值。</p>
                        <div className="bg-white p-2 rounded text-xs text-stone-600 border border-blue-100">
                            <strong>Studio 使用：</strong><br/>
                            Get Asset（讀取）<br/>
                            Set Asset（更新）
                        </div>
                        <p className="text-xs text-blue-400 mt-2">優點：不需要硬編碼設定值，方便維護與安全控管。</p>
                    </div>

                    <div className="bg-orange-50 p-5 rounded-xl border border-orange-100">
                         <h4 className="font-bold text-orange-800 mb-3 flex items-center gap-2">
                            📚 Queues（佇列）
                        </h4>
                         <p className="text-sm text-orange-900 mb-3">儲存大量待處理資料，拆成 Queue Item 讓多台 Robot 平行處理。</p>
                         <div className="bg-white p-2 rounded text-xs text-stone-600 border border-orange-100">
                            <strong>Studio 使用：</strong><br/>
                            Get Queue Item<br/>
                            Add Queue Item
                        </div>
                         <p className="text-xs text-orange-400 mt-2">適合：發票處理、匯款作業、大量查詢。</p>
                    </div>

                    <div className="bg-purple-50 p-5 rounded-xl border border-purple-100">
                         <h4 className="font-bold text-purple-800 mb-3 flex items-center gap-2">
                            ⏰ Triggers（排程）
                        </h4>
                         <p className="text-sm text-purple-900 mb-3">自動啟動流程，如每天 09:00 執行報表。</p>
                         <div className="bg-white p-2 rounded text-xs text-stone-600 border border-purple-100">
                            <strong>設定項目：</strong><br/>
                            執行時間 (Time)<br/>
                            使用流程 (Process)<br/>
                            執行機器 (Robot)
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-stone-800 text-stone-200 p-8 rounded-2xl mt-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    總結：Folder 是自動化的最小運作單位
                </h3>
                <p className="mb-4 leading-relaxed text-stone-300">
                    在 UiPath Orchestrator 中：Tenant 管規模，Folder 管工作。掌握 Folder 的每個功能，就能完整控制部門或專案的自動化生命周期。
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
                   <div className="flex justify-between border-b border-stone-600 pb-2">
                       <span className="text-stone-400">Processes / Jobs</span>
                       <span className="font-bold text-emerald-400">流程執行</span>
                   </div>
                   <div className="flex justify-between border-b border-stone-600 pb-2">
                       <span className="text-stone-400">Triggers</span>
                       <span className="font-bold text-emerald-400">排程管理</span>
                   </div>
                   <div className="flex justify-between border-b border-stone-600 pb-2">
                       <span className="text-stone-400">Queues</span>
                       <span className="font-bold text-emerald-400">大量任務</span>
                   </div>
                   <div className="flex justify-between border-b border-stone-600 pb-2">
                       <span className="text-stone-400">Assets</span>
                       <span className="font-bold text-emerald-400">設定管理</span>
                   </div>
                </div>
            </div>
        </div>
    )
  },
  {
    id: "ui-new-4",
    title: "UiPath OC Tenant 功能解析",
    summary: "從 Robots、Folders、Packages、Machines 到安全性與監控，一篇搞懂 Tenant 可以做什麼。",
    date: "2026.01.05",
    tags: ["Tenant", "Robots", "Folders", "Packages"],
    readTime: "10 min",
    author: "工程師媽媽 Mega",
    image: "/Morimori/assets/article-image-default.png",
    category: "UiPath",
    content: (
        <div className="space-y-8 text-stone-700">
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 text-stone-700">
                <p className="mb-4 font-bold text-emerald-900 text-lg">
                    Tenant 是「企業級自動化中心」的重要管理單位
                </p>
                <p className="mb-4">在 UiPath Orchestrator 的整體架構中，所有有效的自動化資源（流程、機器人、帳號、群組、權限、排程等）都在 Tenant 內運作。</p>
                <p>本文將系統性介紹 OC 中 Tenant 的所有主要功能，並補充使用情境、注意事項與企業導入時的最佳實務。</p>
            </div>

            <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-l-4 border-emerald-500 pl-4">
                    一、Tenant 在 OC 中的角色是什麼？
                </h3>
                <p className="mb-4">在 UiPath 架構中，Tenant 是一個「隔離的自動化空間」。 不同 Tenant 之間的資源、使用者、流程、設定皆互不影響。</p>
                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                    <h4 className="font-bold text-stone-800 mb-4 flex items-center gap-2">
                        <span className="bg-emerald-100 text-emerald-600 p-1 rounded">💡</span>
                        主要用途
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {["區分正式／測試環境", "區分不同事業部", "提供權限隔離", "資源控管（Flows, Queues, Robots, Assets）"].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-stone-600">
                                <Check className="w-4 h-4 text-emerald-500" />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-l-4 border-emerald-500 pl-4">
                    二、Tenant 主要功能介紹（詳細版）
                </h3>
                <p className="mb-6 text-stone-500">以下依照 Orchestrator 介面順序與概念架構整理。</p>

                <div className="space-y-8">
                    {/* Robots */}
                    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
                        <div className="bg-stone-50 p-4 border-b border-stone-100 flex items-center gap-2">
                            <span className="font-mono bg-stone-200 px-2 py-0.5 rounded text-stone-600 font-bold">1️⃣</span>
                            <h4 className="font-bold text-lg text-stone-800">Robots（機器人列表）</h4>
                        </div>
                        <div className="p-6">
                            <p className="mb-4 text-stone-600">顯示並管理所有在 Tenant 中的機器人（Robot Accounts）。</p>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <strong className="block text-sm font-bold text-stone-700 mb-2">📋 可查看資訊：</strong>
                                    <ul className="list-disc pl-5 text-sm text-stone-500 space-y-1">
                                        <li>機器人類型（Attended / Unattended）</li>
                                        <li>帳號類型（User / Machine account）</li>
                                        <li>License 類型、網域（Domain）、主機名稱（Machine）</li>
                                        <li>Robot 連線狀態、最後執行時間、版本等</li>
                                    </ul>
                                </div>
                                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 text-sm">
                                    <strong className="block text-amber-700 mb-2">⚠️ 實務提醒</strong>
                                    <p className="text-amber-800">機器人若大量 offline，需要檢查：連線模式（Key / User Mode）、License 是否足夠、 Orchestrator URL、Key 是否過期、Windows 服務是否正在運作</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Folders */}
                    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
                        <div className="bg-stone-50 p-4 border-b border-stone-100 flex items-center gap-2">
                            <span className="font-mono bg-stone-200 px-2 py-0.5 rounded text-stone-600 font-bold">2️⃣</span>
                            <h4 className="font-bold text-lg text-stone-800">Folders（資料夾：流程與資源的邏輯空間）</h4>
                        </div>
                        <div className="p-6 space-y-4">
                            <p className="text-stone-600">Folder 是 OC 中最重要的邏輯隔離工具，可用來管理：流程（Processes）、資產（Assets）、 佇列（Queues）、使用者／機器人的 Folder-Level 權限。</p>
                            
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <strong className="text-blue-700 block mb-2">📌 注意：Classic Folders 已淘汰</strong>
                                <p className="text-sm text-blue-600">新建立的 Folder 一律為 Modern Folder，支援 AD / Robot Account / Role-Based Access 與 per-folder packages feed。</p>
                            </div>

                            <div>
                                <strong className="block text-sm font-bold text-stone-700 mb-2">📌 Folder 的主要功能：</strong>
                                <ul className="space-y-2 text-sm text-stone-600">
                                    <li className="flex gap-2">
                                        <div className="min-w-4 mt-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div></div>
                                        <div><strong>Assign Account / Group / External App</strong> → 設定帳號能否看到此 Folder</div>
                                    </li>
                                    <li className="flex gap-2">
                                        <div className="min-w-4 mt-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div></div>
                                        <div><strong>設定 Process Packages Source</strong> → 建立專屬的 "Folder Packages"，可完全隔離專案，避免跨部門觀察到彼此流程。</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Monitoring */}
                    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
                        <div className="bg-stone-50 p-4 border-b border-stone-100 flex items-center gap-2">
                            <span className="font-mono bg-stone-200 px-2 py-0.5 rounded text-stone-600 font-bold">3️⃣</span>
                            <h4 className="font-bold text-lg text-stone-800">Monitoring（監控儀表板）</h4>
                        </div>
                        <div className="p-6">
                            <p className="mb-4 text-stone-600">Tenant 層級的自動化監控中心，常用於追蹤流程穩定度、查錯（Error / BusinessException）、管理機器人資源利用率。</p>
                            <div className="flex flex-wrap gap-2">
                                {["Robot 狀態", "Logs 數量", "Queue item 統計", "Triggers 成功/失敗", "流程執行分析"].map(tag => (
                                    <span key={tag} className="bg-stone-100 text-stone-600 px-2 py-1 rounded text-xs border border-stone-200">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Manage Access */}
                    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
                        <div className="bg-stone-50 p-4 border-b border-stone-100 flex items-center gap-2">
                            <span className="font-mono bg-stone-200 px-2 py-0.5 rounded text-stone-600 font-bold">4️⃣</span>
                            <h4 className="font-bold text-lg text-stone-800">Manage Access（帳號、角色與權限控管中心）</h4>
                        </div>
                        <div className="p-6 space-y-6">
                            <p className="text-stone-600">此區域用於分配角色（Role）與帳號權限配置。 <br/><code className="bg-stone-100 px-1 rounded text-stone-800">使用者（Accounts）+ 角色（Roles）＝使用者能看到與操作的內容</code></p>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <strong className="text-stone-800 block border-b border-stone-100 pb-2">📌 Add a new Role（角色類型）</strong>
                                    <ul className="space-y-2 text-sm text-stone-600">
                                        <li><strong>Tenant Role：</strong>大層級權限，影響所有 Folder</li>
                                        <li><strong>Folder Role：</strong>只影響某個 Folder</li>
                                    </ul>
                                    <div className="bg-stone-50 p-3 rounded text-xs text-stone-500">
                                        企業常見做法：<br/>
                                        Admin → Tenant Role<br/>
                                        部門承辦 → Folder Role<br/>
                                        機器人 → Folder Role + Robot Permission
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <strong className="text-stone-800 block border-b border-stone-100 pb-2">📌 Robot Setting（非常重要）</strong>
                                    <p className="text-sm text-stone-600">Robot 執行流程的畫面解析度需與開發者電腦解析度、機器人環境解析度保持一致，否則會出現 UI 點不到、按鈕位置錯誤等問題。</p>
                                    <div className="text-emerald-600 font-bold text-sm">💡 企業建議統一設定：1920 × 1080（建議 32 bit color）</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Others Grid */}
                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            { id: "5️⃣", title: "Machines", desc: "定義 OC 與 Robot 的連線橋樑，建立連線 Key、定義執行能力（Capacity）、授權 Unattended Robot。" },
                            { id: "6️⃣", title: "Packages", desc: "流程包管理，顯示所有被發佈到此 Tenant 的流程包，企業可統一控管流程版本。" },
                            { id: "7️⃣", title: "Audit", desc: "稽核紀錄，記錄 Tenant 內所有重要操作，對資訊安全、稽核、故障排查非常重要。" },
                            { id: "8️⃣", title: "Credential Stores", desc: "密碼儲存區，安全儲存敏感資訊，可與 CyberArk、Azure Key Vault 等企業級金鑰系統整合。" },
                            { id: "9️⃣", title: "Webhooks", desc: "事件推送功能，讓外部系統即時接收 Orchestrator 事件，可串接 Slack / Teams。" },
                            { id: "🔟", title: "License", desc: "授權管理，顯示 Tenant 下的 License 使用狀態、到期時間、使用者授權等。" },
                            { id: "1️⃣1️⃣", title: "Alerts", desc: "警報系統，顯示 Tenant 中發生的異常事件，用於快速定位問題。" },
                            { id: "1️⃣2️⃣", title: "Non-Working Days", desc: "排程例外日，設定自動化流程不要執行的日期（國定假日、公司休假日等）。" },
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm flex gap-3">
                                <div className="text-2xl pt-1">{item.id}</div>
                                <div>
                                    <h5 className="font-bold text-stone-800 mb-1">{item.title}</h5>
                                    <p className="text-sm text-stone-500">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            <div className="bg-stone-800 text-stone-200 p-8 rounded-2xl mt-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    總結：Tenant 是企業自動化的核心運作中心
                </h3>
                <p className="mb-4 leading-relaxed text-stone-300">
                    Tenant 功能非常豐富，涵蓋自動化管理的每一個面向。掌握 Tenant 的每個功能，就能完整操作 UiPath 自動化平台，並制定企業級的 RPA 管理規範。
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-sm text-center">
                    <div className="bg-stone-700 p-3 rounded-lg border border-stone-600">
                        <div className="text-stone-400 mb-1">機器人</div>
                        <div className="text-white font-bold">Robots / Machines</div>
                    </div>
                    <div className="bg-stone-700 p-3 rounded-lg border border-stone-600">
                        <div className="text-stone-400 mb-1">權限</div>
                        <div className="text-white font-bold">Manage Access</div>
                    </div>
                    <div className="bg-stone-700 p-3 rounded-lg border border-stone-600">
                        <div className="text-stone-400 mb-1">資源管理</div>
                        <div className="text-white font-bold">Folders / Packages</div>
                    </div>
                    <div className="bg-stone-700 p-3 rounded-lg border border-stone-600">
                        <div className="text-stone-400 mb-1">安全</div>
                        <div className="text-white font-bold">Audit / Credential</div>
                    </div>
                </div>
            </div>
        </div>
    )
  },
  {
    id: "ui-new-3",
    title: "UiPath Orchestrator（OC）Management 帳號��限管理",
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
    summary: "在企業自架（On-Prem）或雲端企業方案的 UiPath Orchestrator 中，「Host」是整個平台的最高層級管理區域。本文將帶你掌握 Tenant 建立、授權分配到 License ���新全流程。",
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
                            <p className="text-sm text-slate-600 mb-2">若��服器可以連外：</p>
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
            <h3 className="text-xl font-bold text-stone-900 mb-3 flex items-center gap-2">�� 三、Orchestrator 平台（OC）的核心組成</h3>
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
                <p>               └── Process（各部門自動化流���）</p>
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