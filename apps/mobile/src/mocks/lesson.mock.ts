import { LessonSession } from "@/types/lesson";

export const MOCK_LESSON: LessonSession = {
  lessonId: "lesson-001",
  lessonTitle: "O'z kelib chiqishingiz haqida gapiring",
  category: "vocabulary",
  totalXp: 100,
  questions: [
    {
      // NPC: 한국어 문장 보여줌 → 유저: 한국어로 조합
      id: "q1",
      type: "sentence_builder",
      level: "1",
      question: "Gapni to'g'ri tartiblang", // 우즈벡어: 문장을 올바르게 배열하세요
      npcText: "저는 파리 출신이에요", // 한국어 보여줌 (근데 섞인 상태로)
      options: ["저는", "파리", "출신이에요", "런던", "도쿄", "당신은요"],
      answer: "저는 파리 출신이에요",
      explanation: "Men Parijdanman.",
      xpReward: 15,
    },
    {
      // NPC: 한국어 → 유저: 우즈벡어로 번역 조합
      id: "q2",
      type: "translate_builder",
      level: "1",
      question: "Quyidagi gapni tarjima qiling", // 우즈벡어: 다음 문장을 번역하세요
      npcText: "저는 파리 출신이에요", // 한국어
      options: ["Men", "Parijdanman", "Moskvadan", "siz-chi", "u", "biz"],
      answer: "Men Parijdanman",
      explanation: "저는 파리 출신이에요",
      xpReward: 15,
    },
    {
      // NPC: 한국어 오디오 → 유저: 들은 한국어 조합
      id: "q3",
      type: "word_arrange",
      level: "1",
      question: "Eshitgan gapni tartiblang", // 우즈벡어: 들은 문장을 배열하세요
      npcText: "저는 멕시코 출신이에요",
      options: ["저는", "멕시코", "출신이에요", "당신은요", "파리", "런던"],
      answer: "저는 멕시코 출신이에요",
      explanation: "Men Meksikodanman.",
      xpReward: 15,
    },
    {
      // NPC: 이미지 + 한국어 → 유저: 한국어 단어 선택
      id: "q4",
      type: "image_choice",
      level: "1",
      question: "Gapni yakunlang", // 우즈벡어: 문장을 완성하세요
      npcText: "저는 ___ 출신이에요",
      sentencePrefix: "저는",
      sentenceSuffix: "출신이에요.",
      options: ["우유", "파리", "커피", "런던"],
      answer: "파리",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Smiley.svg/320px-Smiley.svg.png",
      explanation: "Men Parijdanman.",
      xpReward: 10,
    },
    {
      // NPC: 한국어 대화 → 유저: 한국어로 답 선택
      id: "q5",
      type: "dialog_complete",
      level: "1",
      question: "Suhbatni yakunlang", // 우즈벡어: 대화를 완성하세요
      dialogLines: [
        { speaker: "npc", text: "저는 브라질 출신이에요, 당신은요?" },
      ],
      options: ["저도 브라질 출신이에요!", "감사합니다!"],
      answer: "저도 브라질 출신이에요!",
      explanation: "Men ham Braziliyadanman!",
      xpReward: 15,
    },
    {
      // NPC: 우즈벡어 문장 → 유저: 한국어로 타이핑
      id: "q6",
      type: "type_answer",
      level: "1",
      question: "Koreys tilida yozing", // 우즈벡어: 한국어로 쓰세요
      npcText: "Men Xitoydan kelganman", // 우즈벡어로 보여줌
      sentencePrefix: "저는",
      sentenceSuffix: "출신이에요.",
      answer: "중국",
      explanation: "Men Xitoydan kelganman = 저는 중국 출신이에요",
      xpReward: 15,
    },
    {
      // 한국어 ↔ 우즈벡어 매칭
      id: "q7",
      type: "word_matching",
      level: "1",
      question: "Mos so'zlarni juftlang", // 우즈벡어: 단어를 짝지으세요
      answer: "",
      xpReward: 10,
      pairs: [
        { korean: "고양이", native: "mushuk" },
        { korean: "강아지", native: "it" },
        { korean: "사과", native: "olma" },
        { korean: "물", native: "suv" },
      ],
    },
  ],
};
