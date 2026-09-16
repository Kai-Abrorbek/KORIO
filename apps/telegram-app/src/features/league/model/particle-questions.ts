export interface ParticleQuestion {
  sentence: string;
  options: string[];
  answer: string;
  uz: string;
}

export const PARTICLE_QUESTIONS: ParticleQuestion[] = [
  { sentence: "저는 학교___ 가요", options: ["에", "에서", "을"], answer: "에", uz: "Men maktabga boraman" },
  { sentence: "도서관___ 공부해요", options: ["에", "에서", "가"], answer: "에서", uz: "Kutubxonada o'qiyman" },
  { sentence: "친구___ 만나요", options: ["를", "가", "에"], answer: "를", uz: "Do'stimni uchrataman" },
  { sentence: "동생___ 밥을 먹어요", options: ["이", "을", "에"], answer: "이", uz: "Ukam ovqat yeydi" },
  { sentence: "책___ 읽어요", options: ["을", "이", "에서"], answer: "을", uz: "Kitob o'qiyman" },
  { sentence: "버스___ 타요", options: ["를", "에서", "은"], answer: "를", uz: "Avtobusga chiqaman" },
  { sentence: "한국___ 살아요", options: ["에서", "를", "이"], answer: "에서", uz: "Koreyada yashayman" },
  { sentence: "커피___ 마셔요", options: ["를", "가", "에"], answer: "를", uz: "Qahva ichaman" },
  { sentence: "저___ 학생이에요", options: ["는", "를", "에"], answer: "는", uz: "Men talabaman" },
  { sentence: "날씨___ 좋아요", options: ["가", "를", "에"], answer: "가", uz: "Ob-havo yaxshi" },
  { sentence: "아침___ 운동해요", options: ["에", "를", "가"], answer: "에", uz: "Ertalab sport qilaman" },
  { sentence: "엄마___ 요리해요", options: ["가", "를", "에서"], answer: "가", uz: "Onam ovqat pishiradi" },
  { sentence: "음악___ 들어요", options: ["을", "이", "에"], answer: "을", uz: "Musiqa tinglayman" },
  { sentence: "회사___ 일해요", options: ["에서", "을", "가"], answer: "에서", uz: "Kompaniyada ishlayman" },
  { sentence: "형___ 키가 커요", options: ["은", "을", "에"], answer: "은", uz: "Akam bo'yi baland" },
  { sentence: "주말___ 영화를 봐요", options: ["에", "에서", "가"], answer: "에", uz: "Dam olish kuni kino ko'raman" },
  { sentence: "물___ 주세요", options: ["을", "이", "은"], answer: "을", uz: "Suv bering" },
  { sentence: "고양이___ 귀여워요", options: ["가", "를", "에서"], answer: "가", uz: "Mushuk yoqimtoy" },
  { sentence: "지하철역___ 기다려요", options: ["에서", "를", "은"], answer: "에서", uz: "Metro bekatida kutaman" },
  { sentence: "선물___ 받았어요", options: ["을", "가", "에"], answer: "을", uz: "Sovg'a oldim" },
];
