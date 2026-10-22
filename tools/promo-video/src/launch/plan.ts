/**
 * 런치 영상 구성표 (우즈벡어 · 9:16 · 30fps). 장면마다 배경색 하나 · 문구 하나 · 동작 하나.
 * caption.at = 장면 시작부터 자막이 뜨는 프레임, voice = public/audio/launch-<voice>.mp3 (자막을 읽는다)
 */
import { COLOR } from "./kit";

export const LAUNCH_FPS = 30;

export type LaunchScene = {
  id: string;
  dur: number;
  color: string;
  /** 앞 장면 색을 덮는 원이 어디서 퍼지나 */
  wipeFrom?: { x: number; y: number };
  caption?: { at: number; text: string; ink: string; accent: string; accentInk: string };
  voice?: { at: number; name: string };
};

const plan: LaunchScene[] = [
  { id: "hook", dur: 75, color: COLOR.paper, voice: { at: 8, name: "hook" } },
  {
    id: "home",
    dur: 150,
    color: COLOR.purple,
    wipeFrom: { x: 700, y: 980 },
    caption: { at: 10, text: "Hammasi —\n*bitta ilovada*", ink: "#fff", accent: COLOR.yellow, accentInk: COLOR.ink },
    voice: { at: 14, name: "home" },
  },
  {
    id: "langs",
    dur: 135,
    color: COLOR.yellow,
    wipeFrom: { x: 380, y: 1300 },
    caption: { at: 58, text: "*Koreys* va *ingliz* tili", ink: COLOR.ink, accent: COLOR.purple, accentInk: "#fff" },
    voice: { at: 62, name: "langs" },
  },
  {
    id: "modes-ko",
    dur: 200,
    color: COLOR.green,
    wipeFrom: { x: 540, y: 986 },
    caption: { at: 44, text: "Har bir ko‘nikma uchun\n*alohida mashg‘ulot*", ink: "#fff", accent: COLOR.yellow, accentInk: COLOR.ink },
    voice: { at: 48, name: "modes-ko" },
  },
  {
    id: "modes-en",
    dur: 140,
    color: COLOR.blue,
    caption: { at: 26, text: "*Ingliz tilida* ham", ink: "#fff", accent: COLOR.yellow, accentInk: COLOR.ink },
    voice: { at: 30, name: "modes-en" },
  },
  {
    id: "stats",
    dur: 255,
    color: COLOR.night,
    caption: { at: 20, text: "Natijalaringizni\n*kuzating*", ink: "#fff", accent: COLOR.yellow, accentInk: COLOR.ink },
    voice: { at: 24, name: "stats" },
  },
  {
    id: "tutor",
    dur: 120,
    color: COLOR.indigo,
    caption: { at: 6, text: "*Sun’iy intellekt* ustoz\nbilan jonli suhbat", ink: "#fff", accent: "#fff", accentInk: COLOR.indigo },
    voice: { at: 10, name: "tutor" },
  },
  {
    id: "speaking",
    dur: 110,
    color: COLOR.coral,
    caption: { at: 6, text: "Talaffuzingiz *darhol*\nbaholanadi", ink: "#fff", accent: COLOR.ink, accentInk: "#fff" },
    voice: { at: 10, name: "speaking" },
  },
  {
    id: "topik",
    dur: 110,
    color: COLOR.navy,
    caption: { at: 6, text: "*TOPIK* imtihoniga\ntayyorgarlik", ink: "#fff", accent: COLOR.yellow, accentInk: COLOR.ink },
    voice: { at: 10, name: "topik" },
  },
  { id: "storm", dur: 60, color: COLOR.night },
  { id: "punch", dur: 66, color: COLOR.paper, voice: { at: 10, name: "punch" } },
  { id: "mosaic", dur: 60, color: COLOR.night },
  { id: "end", dur: 150, color: COLOR.paper, voice: { at: 36, name: "end" } },
];

export const LAUNCH: (LaunchScene & { from: number })[] = plan.reduce<(LaunchScene & { from: number })[]>((list, scene) => {
  const prev = list.at(-1);
  list.push({ ...scene, from: prev ? prev.from + prev.dur : 0 });
  return list;
}, []);

export const LAUNCH_TOTAL = LAUNCH.at(-1)!.from + LAUNCH.at(-1)!.dur;

export function scene(id: string) {
  const found = LAUNCH.find((s) => s.id === id);
  if (!found) throw new Error(`no launch scene ${id}`);
  return found;
}
