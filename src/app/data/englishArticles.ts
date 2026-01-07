import React from 'react';

export interface BreakdownSegment {
  id: string;
  originalText: string; // The specific sentence(s) being analyzed
  highlightedPhrase?: string;
  chineseExplanation: string;
  keyVocabulary: {
    word: string;
    definition: string;
    example?: string;
  }[];
  toneNote?: string;
}

export interface Pattern {
  id: string;
  structure: string;
  example: string;
}

export interface Quiz {
  id: string;
  question: string;
  options?: string[]; // For future multiple choice support
  answer: string;
  feedback: string;
}

export interface EnglishArticle {
  id: string;
  title: string;
  source: string;
  date: string;
  copyright: string;
  image: string;
  fullText: string; // The complete article text
  segments: BreakdownSegment[];
  patterns: Pattern[];
  quiz: Quiz[];
}

export const ENGLISH_ARTICLES: EnglishArticle[] = [
  {
    id: 'starlux-a350-1000',
    title: "STARLUX's First A350-1000 Makes Carrier 11th Global Operator",
    source: "Asian Aviation",
    date: "Jan 07, 2026",
    copyright: "Original Content © Asian Aviation",
    image: "https://images.unsplash.com/photo-1724600821008-c843ccb41f40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg",
    fullText: `STARLUX Airlines of Taiwan has taken delivery of its first of 18 A350-1000s, becoming the 11th global operator of the largest version of the A350. The new A350-1000 will join a fleet of 10 A350-900s already in service with the airline, deployed on premier long-haul services from Taipei to Europe and North America, as well as selected destinations within the Asia-Pacific region.

To mark the arrival of its newest fleet member, STARLUX has unveiled a striking livery that reflects both innovation and identity. The design integrates the airline’s signature visual elements with a carbon-fibre motif, representing the advanced composite materials integral to the aircraft’s construction. The prominent ‘1000’ emblazoned on the fuselage highlights the aircraft’s designation as the largest in-production Airbus model, now serving as the airline’s new flagship.

STARLUX currently operates an all-Airbus fleet comprising the A321neo, the A330-900, and the A350-900 aircraft. The new A350-1000 will seamlessly complement the airline’s existing fleet. Furthermore, the airline has ordered 10 A350F freighters to develop its future cargo network.

The A350 is the world’s most modern widebody aircraft and has set new standards for intercontinental travel. The A350’s all-new design includes state-of-the-art technologies and aerodynamics delivering unmatched standards of operational efficiency and passenger comfort. Its new generation engines and use of lightweight materials bring a 25 per cent advantage in fuel burn, operating costs and carbon dioxide (CO₂) emissions, compared to previous generation competitor aircraft.

The A350 is equipped with a comfortable and spacious Airspace cabin, wide seats, high ceilings and alluring ambient lighting. As with all Airbus aircraft, the A350 aircraft is already able to operate with up to 50% Sustainable Aviation Fuel (SAF). Airbus is targeting to have its aircraft up to 100% SAF capable by 2030. At the end of November 2025, the A350 had won nearly 1,500 orders from 66 customers worldwide.`,
    segments: [
      {
        id: 'seg-1',
        originalText: "STARLUX Airlines of Taiwan has taken delivery of its first of 18 A350-1000s, becoming the 11th global operator of the largest version of the A350.",
        highlightedPhrase: "has taken delivery of",
        chineseExplanation: "星宇航空接收了他們的第一架 A350-1000 客機。這是一個重要的里程碑，讓星宇成為全球第 11 家營運這款「巨無霸」客機的航空公司喔！這就像是買新車交車一樣，在航空業我們用 'take delivery of' 來表示正式接收飛機。",
        keyVocabulary: [
          { word: "take delivery of", definition: "接收（貨物、新購物品等）；交機" },
          { word: "operator", definition: "營運商；操作者" }
        ]
      },
      {
        id: 'seg-2',
        originalText: "To mark the arrival of its newest fleet member, STARLUX has unveiled a striking livery that reflects both innovation and identity.",
        highlightedPhrase: "unveiled a striking livery",
        chineseExplanation: "為了慶祝（mark the arrival）這位機隊新成員的加入，星宇展示了很酷的新塗裝（Livery）。這不僅代表了他們的創新精神，也展現了獨特的品牌識別。Livery 就是指飛機外面的彩繪圖案喔！",
        keyVocabulary: [
          { word: "unveil", definition: "揭幕；展示；推出" },
          { word: "livery", definition: "（飛機、車輛的）塗裝；標誌色" },
          { word: "striking", definition: "引人注目的；醒目的" }
        ]
      },
      {
        id: 'seg-3',
        originalText: "Its new generation engines and use of lightweight materials bring a 25 per cent advantage in fuel burn, operating costs and carbon dioxide (CO₂) emissions.",
        highlightedPhrase: "bring a ... advantage",
        chineseExplanation: "A350 是非常現代化的寬體客機。因為用了新一代的引擎和輕量化材料，它比舊款飛機更省油、更環保，帶來了 25% 的優勢（advantage）。這就是為什麼現在航空公司都喜歡用它的原因。",
        keyVocabulary: [
          { word: "fuel burn", definition: "燃油消耗" },
          { word: "advantage", definition: "優勢；有利條件" },
          { word: "emission", definition: "排放（物）" }
        ]
      },
       {
        id: 'seg-4',
        originalText: "The A350 is equipped with a comfortable and spacious Airspace cabin, wide seats, high ceilings and alluring ambient lighting.",
        highlightedPhrase: "is equipped with",
        chineseExplanation: "這架飛機「配備有」（is equipped with）非常舒適寬敞的座艙空間、寬大的座椅、挑高的天花板，還有迷人的氛圍燈光。搭飛機也能像住飯店一樣舒服呢！",
        keyVocabulary: [
          { word: "be equipped with", definition: "配備有...；裝備有..." },
          { word: "spacious", definition: "寬敞的" },
          { word: "ambient lighting", definition: "環境照明；氛圍燈" }
        ]
      }
    ],
    patterns: [
      {
        id: 'pat-1',
        structure: "Subject + has taken delivery of + Object",
        example: "The logistics company has taken delivery of a new fleet of electric trucks."
      },
      {
        id: 'pat-2',
        structure: "To mark + [Event], Subject + Verb...",
        example: "To mark the company's 10th anniversary, we held a grand celebration."
      },
      {
        id: 'pat-3',
        structure: "Subject + is/are equipped with + Object",
        example: "The new office is equipped with state-of-the-art video conferencing systems."
      }
    ],
    quiz: [
      {
        id: 'q-1',
        question: "The new A350-1000 will seamlessly ________ the airline’s existing fleet.",
        answer: "complement",
        feedback: "做得好！Complement 是「補充、互補」的意思，表示新飛機與現有機隊搭配得很完美。"
      },
       {
        id: 'q-2',
        question: "The prominent ‘1000’ emblazoned on the ________ highlights the aircraft’s designation.",
        answer: "fuselage",
        feedback: "答對了！Fuselage 是指「機身」。"
      }
    ]
  }
];
