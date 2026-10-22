/**
 * 60초 구성표 — 우즈벡어 자막. 시각은 프레임(30fps).
 * clip.trim = 촬영 클립(public/clips/<name>.mp4)의 몇 번째 프레임부터 쓰나.
 * 자막의 *별표* 안은 노란 띠로 강조한다.
 */
export const FPS = 30;
export const TOTAL = 60 * FPS;

export type Caption = { at?: number; title: string; sub?: string };

export type Section = {
  id: string;
  from: number;
  dur: number;
  /** 같은 장면 안에서 자막이 바뀌면 여러 개 (at = 장면 시작부터 프레임) */
  captions: Caption[];
  clip?: { name: string; trim: number };
  colors: [string, string];
};

const plan: Omit<Section, "from">[] = [
  {
    id: "hook",
    dur: 90,
    captions: [],
    colors: ["#7C5CFF", "#B884FF"],
  },
  {
    id: "tutor",
    dur: 300,
    clip: { name: "tutor", trim: 0 },
    captions: [
      { title: "Jonli *AI ustoz*", sub: "Ovozli suhbat · o‘zbekcha tushuntiradi" },
      { at: 45, title: "Xato qilsangiz —\n*hazil bilan* tuzatadi" },
    ],
    colors: ["#6A46FF", "#2B1680"],
  },
  {
    id: "lesson",
    dur: 90,
    clip: { name: "lesson", trim: 12 },
    captions: [{ title: "Qisqa va *qiziqarli* darslar", sub: "Rasm, ovoz va o‘yinlar bilan" }],
    colors: ["#2FBF71", "#0E7A52"],
  },
  {
    id: "speaking",
    dur: 105,
    clip: { name: "speaking", trim: 12 },
    captions: [{ title: "*Talaffuzingizni*\nAI baholaydi", sub: "Gapiring — darhol ball oling" }],
    colors: ["#1CB0F6", "#1259C3"],
  },
  {
    id: "stamp",
    dur: 90,
    clip: { name: "stamp", trim: 6 },
    captions: [{ title: "Har bir dars —\n*kichik g‘alaba*" }],
    colors: ["#FF8A3D", "#E2457A"],
  },
  {
    id: "hangul",
    dur: 75,
    clip: { name: "hangul", trim: 0 },
    captions: [{ title: "*Hangul* alifbosini\nnoldan", sub: "Harfma-harf, oson" }],
    colors: ["#7C5CFF", "#4529D1"],
  },
  {
    id: "topik",
    dur: 90,
    clip: { name: "topik", trim: 6 },
    captions: [{ title: "*TOPIK* imtihoniga\ntayyorgarlik", sub: "Haqiqiy imtihon uslubidagi savollar" }],
    colors: ["#1E66B0", "#0C2F5C"],
  },
  {
    id: "streak",
    dur: 75,
    clip: { name: "streak", trim: 30 },
    captions: [{ title: "Har kuni o‘rganing,\n*olovni* o‘chirmang!" }],
    colors: ["#FFA41C", "#FF4D2E"],
  },
  {
    id: "league",
    dur: 75,
    clip: { name: "league", trim: 6 },
    captions: [{ title: "Haftalik *liga*", sub: "20 kishi bilan bellashing" }],
    colors: ["#F4B400", "#C26A00"],
  },
  {
    id: "leagueResult",
    dur: 66,
    clip: { name: "leagueResult", trim: 40 },
    captions: [{ title: "Yuqori ligaga\n*ko‘tariling!*" }],
    colors: ["#F4B400", "#7C5CFF"],
  },
  {
    id: "jackpot",
    dur: 75,
    clip: { name: "jackpot", trim: 14 },
    captions: [{ title: "*Sovg‘alar* va\nkutilmagan bonuslar" }],
    colors: ["#FF4DB8", "#7C3AED"],
  },
  {
    id: "avatar",
    dur: 96,
    clip: { name: "avatar", trim: 6 },
    captions: [{ title: "O‘z *qahramoningizni*\nyarating", sub: "Kiyim, soch, uy hayvoni…" }],
    colors: ["#C084FC", "#7C3AED"],
  },
  {
    id: "stickers",
    dur: 99,
    clip: { name: "stickers", trim: 0 },
    captions: [{ title: "…va undan\n*Telegram stikerlari!*", sub: "Koreyscha so‘zlar bilan, faqat sizniki" }],
    colors: ["#8B7CF6", "#E58BC9"],
  },
  {
    id: "rocket",
    dur: 84,
    clip: { name: "rocket", trim: 66 },
    captions: [{ title: "Darajangiz\n*o‘sib boradi*" }],
    colors: ["#3B82F6", "#1E1B4B"],
  },
  {
    id: "telegram",
    dur: 180,
    clip: { name: "courses", trim: 0 },
    captions: [
      { title: "*Telegramda* ham ishlaydi", sub: "Hech narsa yuklamasdan" },
      { at: 105, title: "*Koreys* va *ingliz* tili —\nbitta ilovada" },
    ],
    colors: ["#2AABEE", "#1A78C2"],
  },
  {
    id: "cta",
    dur: 210,
    captions: [],
    colors: ["#7C5CFF", "#B884FF"],
  },
];

export const SECTIONS: Section[] = plan.reduce<Section[]>((list, section) => {
  const prev = list.at(-1);
  list.push({ ...section, from: prev ? prev.from + prev.dur : 0 });
  return list;
}, []);

export const section = (id: string) => {
  const found = SECTIONS.find((s) => s.id === id);
  if (!found) throw new Error(`no section ${id}`);
  return found;
};

const last = SECTIONS.at(-1)!;
if (last.from + last.dur !== TOTAL) {
  throw new Error(`timeline is ${last.from + last.dur} frames, expected ${TOTAL}`);
}
