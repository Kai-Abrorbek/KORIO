/**
 * 조사 러시 문제. 모바일 앱(mocks/arcade.mock.ts PARTICLE_QUESTIONS)과 같은 데이터 —
 * 힌트 문장은 설명 언어(uz/en/ru)로 보여 준다. 예전엔 우즈벡어만 있었다.
 */
export interface ParticleQuestion {
  /** ___ 자리에 조사 */
  sentence: string;
  options: string[];
  answer: string;
  uz: string;
  en: string;
  ru: string;
}

export const PARTICLE_QUESTIONS: ParticleQuestion[] = [
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
