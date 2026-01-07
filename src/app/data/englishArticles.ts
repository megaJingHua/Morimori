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
  imageCredit?: string;
  imageSourceUrl?: string;
  fullText: string; // The complete article text
  sentenceTranslations?: Record<string, string>;
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
    image: "/Morimori/assets/202601066_tcm12-14622_w616_h411_n.png",
    imageCredit: "Image Source: STARLUX Airlines Media Center",
    imageSourceUrl: "https://www.starlux-airlines.com/en-JP/about-us/media-center/news/2026/202601061",
    fullText: `STARLUX Airlines of Taiwan has taken delivery of its first of 18 A350-1000s, becoming the 11th global operator of the largest version of the A350. The new A350-1000 will join a fleet of 10 A350-900s already in service with the airline, deployed on premier long-haul services from Taipei to Europe and North America, as well as selected destinations within the Asia-Pacific region.

To mark the arrival of its newest fleet member, STARLUX has unveiled a striking livery that reflects both innovation and identity. The design integrates the airline’s signature visual elements with a carbon-fibre motif, representing the advanced composite materials integral to the aircraft’s construction. The prominent ‘1000’ emblazoned on the fuselage highlights the aircraft’s designation as the largest in-production Airbus model, now serving as the airline’s new flagship.

STARLUX currently operates an all-Airbus fleet comprising the A321neo, the A330-900, and the A350-900 aircraft. The new A350-1000 will seamlessly complement the airline’s existing fleet. Furthermore, the airline has ordered 10 A350F freighters to develop its future cargo network.

The A350 is the world’s most modern widebody aircraft and has set new standards for intercontinental travel. The A350’s all-new design includes state-of-the-art technologies and aerodynamics delivering unmatched standards of operational efficiency and passenger comfort. Its new generation engines and use of lightweight materials bring a 25 per cent advantage in fuel burn, operating costs and carbon dioxide (CO₂) emissions, compared to previous generation competitor aircraft.

The A350 is equipped with a comfortable and spacious Airspace cabin, wide seats, high ceilings and alluring ambient lighting. As with all Airbus aircraft, the A350 aircraft is already able to operate with up to 50% Sustainable Aviation Fuel (SAF). Airbus is targeting to have its aircraft up to 100% SAF capable by 2030. At the end of November 2025, the A350 had won nearly 1,500 orders from 66 customers worldwide.`,
    sentenceTranslations: {
      "STARLUX Airlines of Taiwan has taken delivery of its first of 18 A350-1000s, becoming the 11th global operator of the largest version of the A350.": "台灣的星宇航空已接收其訂購的 18 架 A350-1000 中的首架，成為全球第 11 家營運 A350 最大機型的航空公司。",
      "The new A350-1000 will join a fleet of 10 A350-900s already in service with the airline, deployed on premier long-haul services from Taipei to Europe and North America, as well as selected destinations within the Asia-Pacific region.": "這架全新的 A350-1000 將加入星宇航空現有的 10 架 A350-900 機隊，主要執飛自台北飛往歐洲、北美的頂級長程航線，以及亞太地區的部分精選航點。",
      "To mark the arrival of its newest fleet member, STARLUX has unveiled a striking livery that reflects both innovation and identity.": "為了紀念最新機隊成員的加入，星宇航空推出了一款極具視覺衝擊力的全新塗裝，展現創新精神與品牌識別。",
      "The design integrates the airline’s signature visual elements with a carbon-fibre motif, representing the advanced composite materials integral to the aircraft’s construction.": "該設計結合了星宇航空的標誌性視覺元素與碳纖維紋理，象徵飛機結構中不可或缺的先進複合材料技術。",
      "The prominent ‘1000’ emblazoned on the fuselage highlights the aircraft’s designation as the largest in-production Airbus model, now serving as the airline’s new flagship.": "機身上醒目的「1000」字樣突顯了該機型作為目前量產中最大空中巴士客機的地位，並正式成為星宇航空的新旗艦機型。",
      "STARLUX currently operates an all-Airbus fleet comprising the A321neo, the A330-900, and the A350-900 aircraft.": "目前星宇航空全機隊皆為空中巴士機型，包含 A321neo、A330-900 與 A350-900。",
      "The new A350-1000 will seamlessly complement the airline’s existing fleet.": "全新的 A350-1000 將與星宇航空現有機隊無縫銜接，進一步強化整體營運布局。",
      "Furthermore, the airline has ordered 10 A350F freighters to develop its future cargo network.": "此外，星宇航空也訂購了 10 架 A350F 貨機，以發展其未來的航空貨運網絡。",
      "The A350 is the world’s most modern widebody aircraft and has set new standards for intercontinental travel.": "A350 是全球最先進的廣體客機，並為洲際飛行樹立了全新標準。",
      "The A350’s all-new design includes state-of-the-art technologies and aerodynamics delivering unmatched standards of operational efficiency and passenger comfort.": "A350 的全新設計結合了最先進的科技與空氣動力學，帶來無與倫比的營運效率與乘客舒適度。",
      "Its new generation engines and use of lightweight materials bring a 25 per cent advantage in fuel burn, operating costs and carbon dioxide (CO₂) emissions, compared to previous generation competitor aircraft.": "相較於前一代競爭機型，其新世代引擎與輕量化材料的運用，在燃油消耗、營運成本與二氧化碳（CO₂）排放方面可降低約 25%。",
      "The A350 is equipped with a comfortable and spacious Airspace cabin, wide seats, high ceilings and alluring ambient lighting.": "A350 配備舒適寬敞的 Airspace 客艙，擁有寬大座椅、高挑天花板與迷人的環境燈光設計。",
      "As with all Airbus aircraft, the A350 aircraft is already able to operate with up to 50% Sustainable Aviation Fuel (SAF).": "與所有空中巴士飛機相同，A350 目前已可使用最高達 50% 的永續航空燃料（SAF）進行飛行。",
      "Airbus is targeting to have its aircraft up to 100% SAF capable by 2030.": "空中巴士的目標是在 2030 年前，讓旗下飛機全面具備使用 100% 永續航空燃料的能力。",
      "At the end of November 2025, the A350 had won nearly 1,500 orders from 66 customers worldwide.": "截至 2025 年 11 月底，A350 已獲得來自全球 66 家客戶、近 1,500 架的訂單。"
    },
    segments: [
      {
        id: 'seg-1',
        originalText: "STARLUX Airlines has taken delivery of its first of 18 A350-1000s, becoming the 11th global operator of the largest version of the A350.",
        highlightedPhrase: "has taken delivery of",
        chineseExplanation: "星宇航空已接收其 18 架 A350-1000 中的首架，成為全球第 11 家營運 A350 最大型號的航空公司。",
        keyVocabulary: [
          { word: "has taken delivery of", definition: "已正式接收（交機完成）" },
          { word: "its first of 18", definition: "18 架中的第一架" },
          { word: "becoming + 身分", definition: "表示「因此成為……」" }
        ]
      },
      {
        id: 'seg-2',
        originalText: "The new A350-1000 will join a fleet of 10 A350-900s already in service with the airline.",
        highlightedPhrase: "will join a fleet of",
        chineseExplanation: "這架新的 A350-1000 將加入該航空公司目前已投入營運的 10 架 A350-900 機隊。",
        keyVocabulary: [
          { word: "will join a fleet of…", definition: "將加入某機隊" },
          { word: "already in service", definition: "已在營運中" }
        ]
      },
      {
        id: 'seg-3',
        originalText: "STARLUX has unveiled a striking livery that reflects both innovation and identity.",
        highlightedPhrase: "has unveiled",
        chineseExplanation: "星宇航空公開了一款引人注目的新塗裝，展現創新與品牌識別。",
        keyVocabulary: [
          { word: "has unveiled", definition: "正式公開（常用於產品／設計）" },
          { word: "reflects both A and B", definition: "同時展現 A 與 B" }
        ]
      },
      {
        id: 'seg-4',
        originalText: "The design integrates the airline’s signature visual elements with a carbon-fibre motif.",
        highlightedPhrase: "integrates",
        chineseExplanation: "此設計結合了航空公司的標誌性視覺元素與碳纖維主題圖樣。",
        keyVocabulary: [
          { word: "integrates A with B", definition: "將 A 與 B 結合" },
          { word: "signature", definition: "代表性的（不是簽名）" }
        ]
      },
      {
        id: 'seg-5',
        originalText: "STARLUX currently operates an all-Airbus fleet.",
        highlightedPhrase: "currently operates",
        chineseExplanation: "星宇航空目前營運一支全 Airbus 機隊。",
        keyVocabulary: [
          { word: "currently operates", definition: "目前營運中" },
          { word: "all-Airbus fleet", definition: "全 Airbus 機隊" }
        ]
      },
      {
        id: 'seg-6',
        originalText: "Furthermore, the airline has ordered 10 A350F freighters to develop its future cargo network.",
        highlightedPhrase: "Furthermore",
        chineseExplanation: "此外，該航空公司已訂購 10 架 A350F 貨機，以發展其未來的貨運網絡。",
        keyVocabulary: [
          { word: "Furthermore", definition: "此外（正式銜接詞）" },
          { word: "has ordered", definition: "已下訂（尚未交付）" },
          { word: "freighters", definition: "貨機" }
        ]
      },
      {
        id: 'seg-7',
        originalText: "The A350 is the world’s most modern widebody aircraft.",
        highlightedPhrase: "world’s most modern",
        chineseExplanation: "A350 是全球最現代化的廣體客機。",
        keyVocabulary: [
          { word: "the world’s most…", definition: "全球最……" },
          { word: "widebody aircraft", definition: "廣體客機" }
        ]
      },
      {
        id: 'seg-8',
        originalText: "Its new generation engines and use of lightweight materials bring a 25 per cent advantage in fuel burn, operating costs and carbon dioxide emissions.",
        highlightedPhrase: "bring a ... advantage",
        chineseExplanation: "其新世代引擎與輕量化材料的使用，在燃油消耗、營運成本與二氧化碳排放方面帶來 25% 的優勢。",
        keyVocabulary: [
          { word: "bring a … advantage", definition: "帶來……優勢" },
          { word: "fuel burn", definition: "燃油消耗（航空專用語）" }
        ]
      },
      {
        id: 'seg-9',
        originalText: "The A350 aircraft is already able to operate with up to 50% Sustainable Aviation Fuel (SAF).",
        highlightedPhrase: "is already able to",
        chineseExplanation: "A350 已可使用最高 50% 的永續航空燃料（SAF）進行飛行。",
        keyVocabulary: [
          { word: "is already able to", definition: "已具備能力" },
          { word: "Sustainable Aviation Fuel (SAF)", definition: "永續航空燃料" }
        ]
      },
      {
        id: 'seg-10',
        originalText: "The A350 had won nearly 1,500 orders from 66 customers worldwide.",
        highlightedPhrase: "had won",
        chineseExplanation: "A350 已獲得來自全球 66 家客戶、近 1,500 架的訂單。",
        keyVocabulary: [
          { word: "had won orders", definition: "已獲得訂單" },
          { word: "worldwide", definition: "全球範圍" }
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
