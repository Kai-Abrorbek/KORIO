import { Grammar } from "@/types/grammar";

// 실제 전환: GrammarService.getGrammar(id) 로 교체 (백엔드가 lang으로 현지화된 문자열 반환)
export const MOCK_GRAMMAR: Grammar = {
  id: "prog-goitda",
  pattern: "-고 있다",
  summary: "지금 진행 중인 동작을 나타내요. 영어의 be ~ing 와 같아요.",
  tags: ["중급", "동사", "진행"],
  explanation:
    "동사 어간에 -고 있다를 붙이면 그 동작이 지금 이 순간 벌어지고 있다는 뜻이 돼요. '먹다'는 먹는다는 사실이지만, 먹고 있다는 \"지금 먹는 중\"이라는 진행의 의미예요. 존댓말은 -고 있어요 / -고 있습니다, 과거 진행은 -고 있었어요로 써요.",
  conjugationRule: "동사 어간 + -고 있다 · 받침 상관없이 항상 같아서 쉬워요",
  conjugations: [
    { base: "먹다", result: "먹고 있다" },
    { base: "가다", result: "가고 있다" },
    { base: "읽다", result: "읽고 있다" },
    { base: "기다리다", result: "기다리고 있다" },
  ],
  examples: [
    {
      ko: "지금 밥을 먹고 있어요.",
      gloss: "I'm eating now.",
      highlight: "먹고 있어요",
    },
    {
      ko: "친구를 기다리고 있어요.",
      gloss: "I'm waiting for a friend.",
      highlight: "기다리고 있어요",
    },
    {
      ko: "도서관에서 책을 읽고 있어요.",
      gloss: "I'm reading at the library.",
      highlight: "읽고 있어요",
    },
    {
      ko: "밖에 비가 오고 있어요.",
      gloss: "It's raining outside.",
      highlight: "오고 있어요",
    },
    {
      ko: "그때 저는 자고 있었어요.",
      gloss: "I was sleeping then. (과거 진행)",
      highlight: "자고 있었어요",
    },
  ],
  dialogue: [
    {
      speaker: "A",
      side: "left",
      ko: "지금 뭐 하고 있어요?",
      gloss: "What are you doing now?",
      highlight: "하고 있어요",
    },
    {
      speaker: "B",
      side: "right",
      ko: "숙제를 하고 있어요.",
      gloss: "I'm doing my homework.",
      highlight: "하고 있어요",
    },
    {
      speaker: "A",
      side: "left",
      ko: "저는 커피를 마시고 있어요. 같이 쉴래요?",
      gloss: "I'm drinking coffee. Wanna take a break?",
      highlight: "마시고 있어요",
    },
  ],
  similar: {
    pattern: "-는 중이다",
    note: '"밥을 먹고 있다" = "밥을 먹는 중이다" — 뜻은 거의 같아요. 다만 -고 있다가 더 일상적이고 폭넓게 쓰여요.',
  },
  cautions: [
    "띄어쓰기: 먹고있다 (X) → 먹고 있다 (O)",
    "과거는 -고 있었어요. 먹고 있었다요 (X)",
    "순간적 동작('죽다','도착하다')엔 어색할 수 있어요.",
  ],
  quiz: [
    {
      question: '"지금 뭐 해요?" — 밥을 ____',
      options: [
        { text: "먹고 있어요", correct: true },
        { text: "먹었어요", correct: false },
        { text: "먹을 거예요", correct: false },
      ],
    },
    {
      question: "빈칸: 동생이 게임을 ____ 있어요.",
      options: [
        { text: "하고", correct: true },
        { text: "해서", correct: false },
        { text: "하러", correct: false },
      ],
    },
    {
      question: '"비가 와요"를 진행형으로?',
      options: [
        { text: "비가 오고 있어요", correct: true },
        { text: "비가 왔어요", correct: false },
        { text: "비가 올 거예요", correct: false },
      ],
    },
  ],
  nextId: "future-lgeoye",
  nextPattern: "-(으)ㄹ 거예요",
};
