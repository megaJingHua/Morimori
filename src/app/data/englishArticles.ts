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
  },
  {
    id: 'starlux-busan-flights',
    title: "Taiwan's Starlux Airlines to launch flights to Busan on June 1",
    source: "僑務電子報 / CNA",
    date: "Feb 24, 2026",
    copyright: "Original Content © CNA / 僑務電子報",
    image: "/Morimori/assets/article-busan.png",
    imageCredit: "Image Source: Unsplash",
    fullText: `Taipei, Feb. 23 (CNA) Starlux Airlines will launch direct flights on June 1 between Taoyuan and Busan, as well as the first direct route between Taichung and Busan by a Taiwanese carrier, the company announced Monday.

According to Starlux, the newest international carrier in Taiwan, tickets for both routes will go on sale starting Thursday.

Flights between Taoyuan International Airport and South Korea's Gimhae International Airport in Busan will be offered every day, while flights from Taichung International Airport and Busan will be offered on Tuesday, Friday, and Sunday mornings departing at 8:10 a.m.

For the Taoyuan-Busan route, flights will depart from Taiwan on Monday and Wednesday mornings at 8:15 a.m. and on the other days of the week at 2:45 p.m., according to the tentative schedule released.

According to Tourism Administration statistics, South Korea was the third most popular destination among Taiwanese in 2025, behind Japan and China in first and second.

On the launch of Starlux's Taiwan-Busan route, Starlux Airlines CEO Glenn Chai (翟健華) said the move will not only extend the airline's international service, but also be a milestone marking Starlux's entry into the South Korean market.

In addition, while both routes will be Starlux's first services between Taiwan and South Korea, the Taichung-Busan line will be the first of its kind by a Taiwanese carrier.

Chai said that the Taichung-Busan route also represents an effort by Starlux to bring convenience to Taichung travelers.

The new Taiwan-South Korea routes will be added to Starlux's existing 37 routes to 31 cities in North America and Asia, with Prague currently scheduled as the carrier's first service to Europe, starting Aug. 1 this year.`,
    sentenceTranslations: {
      "Taipei, Feb. 23 (CNA) Starlux Airlines will launch direct flights on June 1 between Taoyuan and Busan, as well as the first direct route between Taichung and Busan by a Taiwanese carrier, the company announced Monday.": "台北 2 月 23 日（中央社）星宇航空週一宣布，將於 6 月 1 日開通桃園與釜山之間的直飛航班，以及國籍航空首條台中直飛釜山的航線。",
      "According to Starlux, the newest international carrier in Taiwan, tickets for both routes will go on sale starting Thursday.": "根據台灣最新的國際航空公司星宇航空表示，兩條航線的機票將於週四起開賣。",
      "Flights between Taoyuan International Airport and South Korea's Gimhae International Airport in Busan will be offered every day, while flights from Taichung International Airport and Busan will be offered on Tuesday, Friday, and Sunday mornings departing at 8:10 a.m.": "桃園國際機場與韓國釜山金海國際機場之間的航班將每天提供，而從台中國際機場飛往釜山的航班則於週二、週五和週日早上 8:10 起飛。",
      "For the Taoyuan-Busan route, flights will depart from Taiwan on Monday and Wednesday mornings at 8:15 a.m. and on the other days of the week at 2:45 p.m., according to the tentative schedule released.": "根據公布的暫定時刻表，桃園-釜山航線的航班將於週一及週三早上 8:15 從台灣起飛，一週的其他日子則於下午 2:45 起飛。",
      "According to Tourism Administration statistics, South Korea was the third most popular destination among Taiwanese in 2025, behind Japan and China in first and second.": "根據觀光署統計，韓國是 2025 年台灣人第三大熱門旅遊目的地，僅次於排名第一及第二的日本與中國。",
      "On the launch of Starlux's Taiwan-Busan route, Starlux Airlines CEO Glenn Chai (翟健華) said the move will not only extend the airline's international service, but also be a milestone marking Starlux's entry into the South Korean market.": "關於星宇航空開通台灣-釜山航線，星宇航空執行長翟健華表示，此舉不僅擴展了該航空公司的國際服務，更是星宇航空進軍韓國市場的一個里程碑。",
      "In addition, while both routes will be Starlux's first services between Taiwan and South Korea, the Taichung-Busan line will be the first of its kind by a Taiwanese carrier.": "此外，這兩條航線都將是星宇航空在台灣與韓國之間的首發服務，其中台中-釜山航線更是國籍航空的首創。",
      "Chai said that the Taichung-Busan route also represents an effort by Starlux to bring convenience to Taichung travelers.": "翟健華表示，台中-釜山航線也代表了星宇航空為台中旅客帶來便利的努力。",
      "The new Taiwan-South Korea routes will be added to Starlux's existing 37 routes to 31 cities in North America and Asia, with Prague currently scheduled as the carrier's first service to Europe, starting Aug. 1 this year.": "新的台韓航線將加入星宇航空現有飛往北美與亞洲 31 個城市的 37 條航線，而目前布拉格預定為該航空公司飛往歐洲的首條航線，將於今年 8 月 1 日首航。"
    },
    segments: [
      {
        id: 'seg-11',
        originalText: "Starlux Airlines will launch direct flights on June 1 between Taoyuan and Busan.",
        highlightedPhrase: "will launch direct flights",
        chineseExplanation: "星宇航空將於 6 月 1 日開通桃園與釜山之間的直飛航班。",
        keyVocabulary: [
          { word: "launch", definition: "開展、推出（新航線、產品等）" },
          { word: "direct flights", definition: "直飛航班" }
        ]
      },
      {
        id: 'seg-12',
        originalText: "tickets for both routes will go on sale starting Thursday.",
        highlightedPhrase: "will go on sale",
        chineseExplanation: "兩條航線的機票將於週四起開賣。",
        keyVocabulary: [
          { word: "go on sale", definition: "開始發售" },
          { word: "route", definition: "航線、路線" }
        ]
      },
      {
        id: 'seg-13',
        originalText: "South Korea was the third most popular destination among Taiwanese in 2025.",
        highlightedPhrase: "the third most popular destination",
        chineseExplanation: "韓國是 2025 年台灣人第三大熱門旅遊目的地。",
        keyVocabulary: [
          { word: "popular", definition: "受歡迎的" },
          { word: "destination", definition: "目的地" }
        ]
      },
      {
        id: 'seg-14',
        originalText: "the move will not only extend the airline's international service, but also be a milestone marking Starlux's entry into the South Korean market.",
        highlightedPhrase: "a milestone marking",
        chineseExplanation: "此舉更是標誌著星宇航空進軍韓國市場的一個里程碑。",
        keyVocabulary: [
          { word: "milestone", definition: "里程碑" },
          { word: "extend", definition: "擴展、延伸" },
          { word: "entry into", definition: "進入（市場等）" }
        ]
      },
      {
        id: 'seg-15',
        originalText: "the Taichung-Busan line will be the first of its kind by a Taiwanese carrier.",
        highlightedPhrase: "the first of its kind",
        chineseExplanation: "台中-釜山航線更是國籍航空的首創（同類中第一個）。",
        keyVocabulary: [
          { word: "the first of its kind", definition: "同類中的第一個/首創" },
          { word: "carrier", definition: "航空公司、運輸公司" }
        ]
      },
      {
        id: 'seg-16',
        originalText: "the Taichung-Busan route also represents an effort by Starlux to bring convenience to Taichung travelers.",
        highlightedPhrase: "bring convenience to",
        chineseExplanation: "台中-釜山航線也代表了星宇航空為台中旅客帶來便利的努力。",
        keyVocabulary: [
          { word: "represent", definition: "代表" },
          { word: "bring convenience to", definition: "為...帶來便利" }
        ]
      }
    ],
    patterns: [
      {
        id: 'pat-4',
        structure: "Subject + will launch + [Product/Service] + on + [Date]",
        example: "The tech company will launch its new smartphone on September 15."
      },
      {
        id: 'pat-5',
        structure: "not only + [Verb/Adjective/Noun], but also + [Verb/Adjective/Noun]",
        example: "The new policy will not only improve efficiency but also reduce costs."
      },
      {
        id: 'pat-6',
        structure: "the first of its kind",
        example: "This solar-powered aircraft is the first of its kind in the world."
      }
    ],
    quiz: [
      {
        id: 'q-3',
        question: "The launch of the new route will be a ________ marking the airline's entry into the new market.",
        answer: "milestone",
        feedback: "答對了！Milestone 是「里程碑」的意思，代表一個重要的發展階段。"
      },
      {
        id: 'q-4',
        question: "Tickets for the new flights will go on ________ starting next week.",
        answer: "sale",
        feedback: "做得好！Go on sale 是一個常見片語，意思是「開始發售」。"
      }
    ]
  }
];
