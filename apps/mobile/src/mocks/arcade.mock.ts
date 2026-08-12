import { WORD_POOL, WordPair } from "@/mocks/match-game.mock";

// 나중에 DB 교체. match-game 풀 재사용 + 확장
export const ARCADE_WORDS: WordPair[] = [
  ...WORD_POOL,
  { id: "time", ko: "시간", uz: "vaqt", en: "time", ru: "время" },
  { id: "money", ko: "돈", uz: "pul", en: "money", ru: "деньги" },
  { id: "weather", ko: "날씨", uz: "ob-havo", en: "weather", ru: "погода" },
  { id: "movie", ko: "영화", uz: "kino", en: "movie", ru: "фильм" },
  { id: "music", ko: "음악", uz: "musiqa", en: "music", ru: "музыка" },
  { id: "family", ko: "가족", uz: "oila", en: "family", ru: "семья" },
  { id: "morning", ko: "아침", uz: "ertalab", en: "morning", ru: "утро" },
  { id: "evening", ko: "저녁", uz: "kechqurun", en: "evening", ru: "вечер" },
  { id: "food", ko: "음식", uz: "ovqat", en: "food", ru: "еда" },
  { id: "travel", ko: "여행", uz: "sayohat", en: "travel", ru: "путешествие" },
  {
    id: "hospital",
    ko: "병원",
    uz: "shifoxona",
    en: "hospital",
    ru: "больница",
  },
  {
    id: "weekend",
    ko: "주말",
    uz: "dam olish kuni",
    en: "weekend",
    ru: "выходные",
  },
  { id: "exercise", ko: "운동", uz: "sport", en: "exercise", ru: "спорт" },
  { id: "phone", ko: "전화", uz: "telefon", en: "phone", ru: "телефон" },
  { id: "market", ko: "시장", uz: "bozor", en: "market", ru: "рынок" },
  {
    id: "teacher",
    ko: "선생님",
    uz: "o'qituvchi",
    en: "teacher",
    ru: "учитель",
  },
  { id: "question", ko: "질문", uz: "savol", en: "question", ru: "вопрос" },
  { id: "answer", ko: "대답", uz: "javob", en: "answer", ru: "ответ" },
  {
    id: "birthday",
    ko: "생일",
    uz: "tug'ilgan kun",
    en: "birthday",
    ru: "день рождения",
  },
  { id: "promise", ko: "약속", uz: "va'da", en: "promise", ru: "обещание" },
];

/** 유저 언어로 뜻 뽑기 (ko UI면 en으로) */
export function meaningOf(w: WordPair, lang: string): string {
  const l = (lang ?? "uz").slice(0, 2);
  if (l === "uz") return w.uz;
  if (l === "ru") return w.ru;
  if (l === "en") return w.en;
  return w.en;
}

export interface ParticleQ {
  /** ___ 자리에 조사 */
  sentence: string;
  options: string[];
  answer: string;
  uz: string;
  en: string;
  ru: string;
}

export const PARTICLE_QUESTIONS: ParticleQ[] = [
  {
    sentence: "저는 학교___ 가요",
    options: ["에", "에서", "을"],
    answer: "에",
    uz: "Men maktabga boraman",
    en: "I go to school",
    ru: "Я иду в школу",
  },
  {
    sentence: "도서관___ 공부해요",
    options: ["에", "에서", "가"],
    answer: "에서",
    uz: "Kutubxonada o'qiyman",
    en: "I study at the library",
    ru: "Я учусь в библиотеке",
  },
  {
    sentence: "친구___ 만나요",
    options: ["를", "가", "에"],
    answer: "를",
    uz: "Do'stimni uchrataman",
    en: "I meet a friend",
    ru: "Я встречаю друга",
  },
  {
    sentence: "동생___ 밥을 먹어요",
    options: ["이", "을", "에"],
    answer: "이",
    uz: "Ukam ovqat yeydi",
    en: "My younger sibling eats",
    ru: "Младший брат ест",
  },
  {
    sentence: "책___ 읽어요",
    options: ["을", "이", "에서"],
    answer: "을",
    uz: "Kitob o'qiyman",
    en: "I read a book",
    ru: "Я читаю книгу",
  },
  {
    sentence: "버스___ 타요",
    options: ["를", "에서", "은"],
    answer: "를",
    uz: "Avtobusga chiqaman",
    en: "I take the bus",
    ru: "Я сажусь в автобус",
  },
  {
    sentence: "한국___ 살아요",
    options: ["에서", "를", "이"],
    answer: "에서",
    uz: "Koreyada yashayman",
    en: "I live in Korea",
    ru: "Я живу в Корее",
  },
  {
    sentence: "커피___ 마셔요",
    options: ["를", "가", "에"],
    answer: "를",
    uz: "Qahva ichaman",
    en: "I drink coffee",
    ru: "Я пью кофе",
  },
  {
    sentence: "저___ 학생이에요",
    options: ["는", "를", "에"],
    answer: "는",
    uz: "Men talabaman",
    en: "I am a student",
    ru: "Я студент",
  },
  {
    sentence: "날씨___ 좋아요",
    options: ["가", "를", "에"],
    answer: "가",
    uz: "Ob-havo yaxshi",
    en: "The weather is nice",
    ru: "Погода хорошая",
  },
  {
    sentence: "아침___ 운동해요",
    options: ["에", "를", "가"],
    answer: "에",
    uz: "Ertalab sport qilaman",
    en: "I exercise in the morning",
    ru: "Я занимаюсь спортом утром",
  },
  {
    sentence: "엄마___ 요리해요",
    options: ["가", "를", "에서"],
    answer: "가",
    uz: "Onam ovqat pishiradi",
    en: "Mom cooks",
    ru: "Мама готовит",
  },
  {
    sentence: "음악___ 들어요",
    options: ["을", "이", "에"],
    answer: "을",
    uz: "Musiqa tinglayman",
    en: "I listen to music",
    ru: "Я слушаю музыку",
  },
  {
    sentence: "회사___ 일해요",
    options: ["에서", "을", "가"],
    answer: "에서",
    uz: "Kompaniyada ishlayman",
    en: "I work at a company",
    ru: "Я работаю в компании",
  },
  {
    sentence: "형___ 키가 커요",
    options: ["은", "을", "에"],
    answer: "은",
    uz: "Akam bo'yi baland",
    en: "My older brother is tall",
    ru: "Старший брат высокий",
  },
  {
    sentence: "주말___ 영화를 봐요",
    options: ["에", "에서", "가"],
    answer: "에",
    uz: "Dam olish kuni kino ko'raman",
    en: "I watch movies on weekends",
    ru: "По выходным смотрю фильмы",
  },
  {
    sentence: "물___ 주세요",
    options: ["을", "이", "은"],
    answer: "을",
    uz: "Suv bering",
    en: "Please give me water",
    ru: "Дайте воды, пожалуйста",
  },
  {
    sentence: "고양이___ 귀여워요",
    options: ["가", "를", "에서"],
    answer: "가",
    uz: "Mushuk yoqimtoy",
    en: "The cat is cute",
    ru: "Кошка милая",
  },
  {
    sentence: "지하철역___ 기다려요",
    options: ["에서", "를", "은"],
    answer: "에서",
    uz: "Metro bekatida kutaman",
    en: "I wait at the subway station",
    ru: "Я жду на станции метро",
  },
  {
    sentence: "선물___ 받았어요",
    options: ["을", "가", "에"],
    answer: "을",
    uz: "Sovg'a oldim",
    en: "I received a gift",
    ru: "Я получил подарок",
  },
];
