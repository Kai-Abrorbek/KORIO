import { LessonSession } from "@/types/lesson";

export const MOCK_LESSON: LessonSession = {
  lessonId: "lesson-001",
  lessonTitle: "O'z kelib chiqishingiz haqida gapiring",
  category: "vocabulary",
  totalXp: 100,
  questions: [
    {
      id: "adv1",
      type: "reading_quiz",
      level: "3",
      passageTitle: "지호의 주말",
      passage:
        "지호는 지난 주말에 부산에 다녀왔다. 원래는 기차표를 미리 예매하려고 했는데 깜빡하는 바람에 입석으로 갈 수밖에 없었다. 세 시간 동안 서서 갔지만 바다를 보자마자 피곤함이 싹 사라졌다.",
      question: "지호는 왜 서서 갔습니까?",
      options: [
        "기차표 예매를 잊어버려서",
        "돈을 아끼고 싶어서",
        "자리가 불편해서",
        "친구에게 자리를 양보해서",
      ],
      answer: "기차표 예매를 잊어버려서",
      explanation: "'깜빡하는 바람에' = 잊어버려서",
      xpReward: 20,
    },
    {
      id: "adv2",
      type: "error_hunt",
      level: "3",
      question: "",
      npcText: "저는 어제 친구를 만나고 영화가 봤어요",
      wrongWord: "영화가",
      options: ["영화를", "영화는", "영화에", "영화도"],
      answer: "영화를",
      explanation: "'보다'의 목적어이므로 목적격 조사 '를'",
      xpReward: 20,
    },
    {
      id: "adv3",
      type: "cloze_passage",
      level: "3",
      question: "",
      passage:
        "저는 한국에 온 ___ 벌써 일 년이 되었어요. 처음에는 말이 안 통해서 힘들었지만 ___ 익숙해졌어요. 요즘은 한국 친구들과 ___ 이야기할 수 있어요.",
      options: ["지", "점점", "자유롭게", "만큼", "갑자기", "심하게"],
      answer: "지|점점|자유롭게",
      explanation: "-(으)ㄴ 지 + 시간: 경과 표현",
      xpReward: 25,
    },
    {
      id: "adv4",
      type: "dialog_order",
      level: "3",
      question: "",
      dialogLines: [
        { speaker: "npc", text: "서연 씨, 이번 회식 갈 거예요?" },
        { speaker: "user", text: "글쎄요, 아직 못 정했어요. 왜요?" },
        { speaker: "npc", text: "장소를 예약해야 해서 인원을 세고 있거든요." },
        { speaker: "user", text: "아, 그럼 저도 간다고 해 주세요!" },
      ],
      answer: "all_correct",
      explanation: "'-거든요': 이유를 설명할 때 쓰는 표현",
      xpReward: 25,
    },
    {
      id: "adv5",
      type: "verb_transform",
      level: "3",
      question: "",
      baseWord: "듣다",
      targetForm: "과거 · 존댓말",
      options: ["들", "었", "어", "요", "듣", "습"],
      answer: "들었어요",
      explanation: "ㄷ 불규칙: 듣다 → 들어요/들었어요",
      xpReward: 20,
    },
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
