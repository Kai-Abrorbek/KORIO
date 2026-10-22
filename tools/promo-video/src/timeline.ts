/**
 * 구성표 — 우즈벡어 자막 + 그 자막을 읽는 내레이션. 시각은 프레임(30fps).
 * 장면 길이는 내레이션이 다 읽힐 만큼 늘어난다 (dur 는 화면이 필요로 하는 최소 길이).
 * clip.trim = 촬영 클립(public/clips/<name>.mp4)의 몇 번째 프레임부터 쓰나,
 * clip.lead = 클립을 멈춘 채로 먼저 보여 주는 프레임 (그 동안 내레이션).
 * 자막의 *별표* 안은 노란 띠로 강조한다. voice = public/audio/narr-<voice>.mp3
 */
import media from "./media.generated.json";

export const FPS = 30;
/** 내레이션을 조금 빠르게 (음높이는 그대로) — 릴스 호흡. 첫 문장은 또렷하게 제 속도로 */
const NARRATION_RATE = 1.1;
const RATE_OVERRIDE: Record<string, number> = { hook: 1 };
export const narrationRate = (voice: string) => RATE_OVERRIDE[voice] ?? NARRATION_RATE;
/** 자막이 튀어나온 뒤 목소리가 시작되기까지 */
export const VOICE_DELAY = 2;
const GAP = 7;

export type Caption = { at?: number; title: string; sub?: string; voice?: string; hidden?: boolean };
export type Clip = { name: string; trim: number; lead?: number };

export type Section = {
  id: string;
  from: number;
  dur: number;
  /** 같은 장면 안에서 자막이 바뀌면 여러 개 (at = 장면 시작부터 프레임) */
  captions: Caption[];
  clip?: Clip;
  colors: [string, string];
};

const VOICES = media.voices as Record<string, number>;
export const CLIP_FRAMES = media.clips as Record<string, number>;

/** 내레이션이 말하는 프레임 수 */
export function voiceFrames(voice?: string) {
  if (!voice) return 0;
  const seconds = VOICES[voice];
  if (seconds === undefined) throw new Error(`no narration ${voice} — run audio/make-audio.mjs and prepare.mjs`);
  return Math.ceil((seconds / narrationRate(voice)) * FPS);
}

/**
 * 튜터 통화: 소개 내레이션이 끝나면 대화가 시작되고(TUTOR_LEAD), 대화가 끝나면(+290) 둘째 자막을 읽는다.
 * 촬영본은 대화 전에 질문만 떠 있는 4.5초(TUTOR_IDLE)가 있어서, 그 끝부분을 내레이션 동안 보여 준다.
 */
export const TUTOR_LEAD = VOICE_DELAY + voiceFrames("tutor-1") + GAP;
const TUTOR_IDLE = 135;
export const TUTOR_DIALOGUE_END = 290;

const plan: Omit<Section, "from">[] = [
  {
    id: "hook",
    dur: 90,
    captions: [{ title: "", voice: "hook", hidden: true }],
    colors: ["#7C5CFF", "#B884FF"],
  },
  {
    id: "tutor",
    dur: TUTOR_LEAD + 300,
    clip: { name: "tutor", trim: Math.max(0, TUTOR_IDLE - TUTOR_LEAD), lead: Math.max(0, TUTOR_LEAD - TUTOR_IDLE) },
    captions: [
      { title: "Jonli *AI ustoz*", sub: "Ovozli suhbat · o‘zbekcha tushuntiradi", voice: "tutor-1" },
      { at: TUTOR_LEAD + TUTOR_DIALOGUE_END, title: "Xato qilsangiz —\n*hazil bilan* tuzatadi", voice: "tutor-2" },
    ],
    colors: ["#6A46FF", "#2B1680"],
  },
  {
    id: "lesson",
    dur: 90,
    clip: { name: "lesson", trim: 12 },
    captions: [{ title: "Qisqa va *qiziqarli* darslar", sub: "Rasm, ovoz va o‘yinlar bilan", voice: "lesson" }],
    colors: ["#2FBF71", "#0E7A52"],
  },
  {
    id: "speaking",
    dur: 105,
    clip: { name: "speaking", trim: 12 },
    captions: [{ title: "*Talaffuzingizni*\nAI baholaydi", sub: "Gapiring — darhol ball oling", voice: "speaking" }],
    colors: ["#1CB0F6", "#1259C3"],
  },
  {
    id: "stamp",
    dur: 90,
    clip: { name: "stamp", trim: 6 },
    captions: [{ title: "Har bir dars —\n*kichik g‘alaba*", voice: "stamp" }],
    colors: ["#FF8A3D", "#E2457A"],
  },
  {
    id: "hangul",
    dur: 75,
    clip: { name: "hangul", trim: 0 },
    captions: [{ title: "*Hangul* alifbosini\nnoldan", sub: "Harfma-harf, oson", voice: "hangul" }],
    colors: ["#7C5CFF", "#4529D1"],
  },
  {
    id: "topik",
    dur: 90,
    clip: { name: "topik", trim: 6 },
    captions: [{ title: "*TOPIK* imtihoniga\ntayyorgarlik", sub: "Haqiqiy imtihon uslubidagi savollar", voice: "topik" }],
    colors: ["#1E66B0", "#0C2F5C"],
  },
  {
    id: "streak",
    dur: 75,
    clip: { name: "streak", trim: 30 },
    captions: [{ title: "Har kuni o‘rganing,\n*olovni* o‘chirmang!", voice: "streak" }],
    colors: ["#FFA41C", "#FF4D2E"],
  },
  {
    id: "league",
    dur: 75,
    clip: { name: "league", trim: 6 },
    captions: [{ title: "Haftalik *liga*", sub: "20 kishi bilan bellashing", voice: "league" }],
    colors: ["#F4B400", "#C26A00"],
  },
  {
    id: "leagueResult",
    dur: 66,
    clip: { name: "leagueResult", trim: 40 },
    captions: [{ title: "Yuqori ligaga\n*ko‘tariling!*", voice: "leagueResult" }],
    colors: ["#F4B400", "#7C5CFF"],
  },
  {
    id: "jackpot",
    dur: 75,
    clip: { name: "jackpot", trim: 14 },
    captions: [{ title: "*Sovg‘alar* va\nkutilmagan bonuslar", voice: "jackpot" }],
    colors: ["#FF4DB8", "#7C3AED"],
  },
  {
    id: "avatar",
    dur: 96,
    clip: { name: "avatar", trim: 6 },
    captions: [{ title: "O‘z *qahramoningizni*\nyarating", sub: "Kiyim, soch, uy hayvoni…", voice: "avatar" }],
    colors: ["#C084FC", "#7C3AED"],
  },
  {
    id: "stickers",
    dur: 99,
    clip: { name: "stickers", trim: 0 },
    captions: [{ title: "…va undan\n*Telegram stikerlari!*", sub: "Koreyscha so‘zlar bilan, faqat sizniki", voice: "stickers" }],
    colors: ["#8B7CF6", "#E58BC9"],
  },
  {
    id: "rocket",
    dur: 84,
    clip: { name: "rocket", trim: 66 },
    captions: [{ title: "Darajangiz\n*o‘sib boradi*", voice: "rocket" }],
    colors: ["#3B82F6", "#1E1B4B"],
  },
  {
    id: "telegram",
    dur: 180,
    clip: { name: "courses", trim: 0 },
    captions: [
      { title: "*Telegramda* ham ishlaydi", sub: "Hech narsa yuklamasdan", voice: "telegram-1" },
      { at: 105, title: "*Koreys* va *ingliz* tili —\nbitta ilovada", voice: "telegram-2" },
    ],
    colors: ["#2AABEE", "#1A78C2"],
  },
  {
    id: "cta",
    dur: 186,
    captions: [{ at: 8, title: "", voice: "cta", hidden: true }],
    colors: ["#7C5CFF", "#B884FF"],
  },
];

/** 자막을 차례로 놓고(앞 내레이션이 끝나야 다음), 장면을 내레이션이 다 들어갈 만큼 늘린다 */
function fit(section: Omit<Section, "from">): Omit<Section, "from"> {
  let cursor = 0;
  const captions = section.captions.map((caption) => {
    const at = Math.max(caption.at ?? 0, cursor);
    cursor = at + VOICE_DELAY + voiceFrames(caption.voice) + GAP;
    return { ...caption, at };
  });
  return { ...section, captions, dur: Math.max(section.dur, cursor) };
}

export const SECTIONS: Section[] = plan.map(fit).reduce<Section[]>((list, section) => {
  const prev = list.at(-1);
  list.push({ ...section, from: prev ? prev.from + prev.dur : 0 });
  return list;
}, []);

export const TOTAL = SECTIONS.at(-1)!.from + SECTIONS.at(-1)!.dur;

export const section = (id: string) => {
  const found = SECTIONS.find((s) => s.id === id);
  if (!found) throw new Error(`no section ${id}`);
  return found;
};
