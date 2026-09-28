"use client";

import { useCallback, useEffect, useState } from "react";

import { MobileIcon, type IoniconName } from "../../shared/ui/mobile-icon";
import styles from "./home-tour.module.css";

/**
 * 홈 기능 안내 투어 — 앱 features/tour (TourOverlay·TourTarget·tours·tour-geometry) 의 웹판.
 *
 * 처음 온 사람에게 한 번 돈다. 설정의 "Qo‘llanmani qayta ko‘rish" 는 localStorage 에 요청만 남기고
 * 홈으로 오고, 홈이 자리 잡은 뒤 여기서 꺼내 쓴다 (설정 화면 위에서 켜면 이동 중에 구멍이 따라다닌다).
 * 대상은 화면 요소에 `data-tour="home.continue"` 처럼 표시만 하면 된다.
 */
export const HOME_TOUR = "home.v1";
export const TOUR_REQUEST_KEY = "korio-home-tour-requested";
const SEEN_KEY = "korio-tour-seen";

interface TourStep {
  target: string;
  title: string;
  desc: string;
  icon: IoniconName;
  shape?: "rect" | "circle";
}

/** 처음 온 사람이 궁금해할 순서 — 앱 HOME_STEPS 와 같다 (문구는 uz 원문, DOM 번역기가 옮긴다) */
const HOME_STEPS: TourStep[] = [
  { desc: "Shu tugma yetarli. Qayerda to'xtaganingizni eslab, davom ettiradi.", icon: "book", target: "home.continue", title: "Bugungi darsni shu yerdan boshlang" },
  { desc: "Barcha o'quvchilar orasida nechanchi ekaningizni bosib ko'ring. O'rin tez o'zgaradi, shuning uchun natija 1 daqiqa turadi.", icon: "podium", target: "home.rank", title: "O'rningizni ko'ring" },
  { desc: "Lug'at, grammatika, iboralar, tinglash yoki TOPIK — bugun nima xohlasangiz.", icon: "swap-horizontal", shape: "circle", target: "home.categories", title: "Yo'nalishni almashtirish" },
  { desc: "Qaysi yo'nalishni qancha qilganingiz rangda ko'rinadi. Bosib batafsil ko'ring.", icon: "stats-chart", target: "home.chart", title: "Shu haftagi mashg'ulot" },
  { desc: "Xato qilgan savollaringiz shu yerda. Ikki marta to'g'ri javob bersangiz, ro'yxatdan chiqadi.", icon: "refresh", target: "home.review", title: "Faqat xatolarni takrorlash" },
  { desc: "Olmoslarga energiya va obuna kartalari olinadi. Shu yerdan qarang.", icon: "basket", target: "home.shop", title: "Yig'gan olmoslaringiz shu yerda" },
  { desc: "Koreys tilida qiynalsangiz, istalgan vaqtda shu yerdan so'rang.", icon: "sparkles", shape: "circle", target: "home.ai", title: "Savolingiz bo'lsa — so'rang" },
];

const PAD = 8;
const GAP = 14;
const BUBBLE_MAX_W = 320;
const MIN_BUBBLE_ROOM = 240;

function readSeen(): Record<string, boolean> {
  try {
    return JSON.parse(window.localStorage.getItem(SEEN_KEY) ?? "{}") as Record<string, boolean>;
  } catch {
    return {};
  }
}

function markSeen(id: string) {
  try {
    window.localStorage.setItem(SEEN_KEY, JSON.stringify({ ...readSeen(), [id]: true }));
  } catch {
    // 저장이 막혀도 이번 세션엔 다시 안 뜬다
  }
}

interface Rect { x: number; y: number; width: number; height: number }

function spotlightPath(w: number, h: number, hole: Rect, radius: number) {
  const x = hole.x - PAD;
  const y = hole.y - PAD;
  const rw = hole.width + PAD * 2;
  const rh = hole.height + PAD * 2;
  const r = Math.max(0, Math.min(radius, rw / 2, rh / 2));
  return (
    `M0 0 H${w} V${h} H0 Z ` +
    `M${x + r} ${y} H${x + rw - r} A${r} ${r} 0 0 1 ${x + rw} ${y + r} ` +
    `V${y + rh - r} A${r} ${r} 0 0 1 ${x + rw - r} ${y + rh} ` +
    `H${x + r} A${r} ${r} 0 0 1 ${x} ${y + rh - r} ` +
    `V${y + r} A${r} ${r} 0 0 1 ${x + r} ${y} Z`
  );
}

function placeBubble(hole: Rect, screen: { width: number; height: number }) {
  const width = Math.round(Math.min(BUBBLE_MAX_W, screen.width - 32));
  const holeTop = hole.y - PAD;
  const holeBottom = hole.y + hole.height + PAD;
  const left = Math.round(Math.min(Math.max(16, hole.x + hole.width / 2 - width / 2), Math.max(16, screen.width - width - 16)));
  const roomBelow = screen.height - 12 - (holeBottom + GAP);
  if (roomBelow >= MIN_BUBBLE_ROOM) return { above: false, left, top: Math.round(holeBottom + GAP), width };
  return { above: true, bottom: Math.round(screen.height - holeTop + GAP), left, width };
}

function findTarget(id: string) {
  return document.querySelector<HTMLElement>(`[data-tour="${id}"]`);
}

/** 화면 가운데쯤으로 — 말풍선 자리를 남기고 대상이 보이게 (앱 scrollDeltaFor) */
function bringIntoView(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const safeTop = 110;
  const safeBottom = window.innerHeight - 300;
  if (rect.bottom > safeBottom || rect.top < safeTop) element.scrollIntoView({ behavior: "smooth", block: "center" });
}

export function HomeTour() {
  const [active, setActive] = useState(false);
  const [step, setStep] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);
  const [screen, setScreen] = useState({ height: 0, width: 0 });
  const current = active ? HOME_STEPS[step] : undefined;

  // 처음 오면 한 번 / 설정에서 "다시 보기" 를 누르고 오면 다시
  useEffect(() => {
    let requested = false;
    try {
      requested = window.localStorage.getItem(TOUR_REQUEST_KEY) === "true";
      if (requested) window.localStorage.removeItem(TOUR_REQUEST_KEY);
    } catch {
      requested = false;
    }
    if (!requested && readSeen()[HOME_TOUR]) return;
    // 화면이 다 그려지고(등장 애니메이션까지) 대상 위치가 잡힌 뒤에 켠다
    const timer = window.setTimeout(() => {
      setStep(0);
      setActive(true);
    }, requested ? 450 : 1300);
    return () => window.clearTimeout(timer);
  }, []);

  const finish = useCallback(() => {
    markSeen(HOME_TOUR);
    setActive(false);
    setRect(null);
  }, []);

  // 대상 찾기 → 보이게 스크롤 → 80ms 마다 다시 재서 구멍이 제자리를 따라가게 (앱 TourTarget 폴링)
  useEffect(() => {
    if (!current) return;
    setRect(null);
    let tries = 0;
    let poll: number | undefined;
    let scrolled = false;
    const measure = () => {
      const element = findTarget(current.target);
      if (!element) {
        tries += 1;
        // 대상이 없으면(데이터가 없어 안 그려진 카드 등) 그 단계는 건너뛴다
        if (tries > 12) {
          if (step + 1 >= HOME_STEPS.length) finish();
          else setStep((value) => value + 1);
          return;
        }
        poll = window.setTimeout(measure, 100);
        return;
      }
      if (!scrolled) {
        scrolled = true;
        bringIntoView(element);
      }
      const box = element.getBoundingClientRect();
      const next = { height: Math.round(box.height), width: Math.round(box.width), x: Math.round(box.left), y: Math.round(box.top) };
      setRect((previous) =>
        previous && Math.abs(previous.x - next.x) < 2 && Math.abs(previous.y - next.y) < 2 && Math.abs(previous.width - next.width) < 2 && Math.abs(previous.height - next.height) < 2
          ? previous
          : next,
      );
      setScreen((previous) => (previous.width === window.innerWidth && previous.height === window.innerHeight ? previous : { height: window.innerHeight, width: window.innerWidth }));
      poll = window.setTimeout(measure, 80);
    };
    poll = window.setTimeout(measure, 120);
    return () => window.clearTimeout(poll);
  }, [current, finish, step]);

  if (!current) return null;

  const isLast = step === HOME_STEPS.length - 1;
  const radius = current.shape === "circle" ? 999 : 18;
  const bubble = rect && screen.width > 0 ? placeBubble(rect, screen) : null;
  const haptic = (kind: "light" | "select") =>
    kind === "light" ? window.Telegram?.WebApp.HapticFeedback?.impactOccurred("light") : window.Telegram?.WebApp.HapticFeedback?.selectionChanged();

  return (
    <div aria-live="polite" className={styles.root} role="dialog">
      {/* 어두운 막 + 구멍. 막(구멍 위 포함)을 눌러도 넘어가지 않는다 — 실수로 건너뛰는 걸 막는다 */}
      {rect && screen.width > 0 ? (
        <svg aria-hidden="true" className={styles.dim} height={screen.height} width={screen.width}>
          <path d={spotlightPath(screen.width, screen.height, rect, radius)} fill="rgba(10,8,26,0.82)" fillRule="evenodd" />
        </svg>
      ) : (
        <div className={styles.dimPlain} />
      )}

      {rect ? (
        <span
          aria-hidden="true"
          className={styles.ring}
          style={{ borderRadius: radius, height: rect.height + PAD * 2, left: rect.x - PAD, top: rect.y - PAD, width: rect.width + PAD * 2 }}
        />
      ) : null}

      {bubble ? (
        <section
          className={styles.bubble}
          key={step}
          style={{ left: bubble.left, width: bubble.width, ...(bubble.above ? { bottom: bubble.bottom } : { top: bubble.top }) }}
        >
          <div className={styles.head}>
            <span className={styles.icon}><MobileIcon name={current.icon} size={17} /></span>
            <small>{`${step + 1} / ${HOME_STEPS.length}`}</small>
          </div>
          <h2>{current.title}</h2>
          <p>{current.desc}</p>
          <div className={styles.dots}>
            {HOME_STEPS.map((item, index) => <i className={index === step ? styles.dotOn : undefined} key={item.target} />)}
          </div>
          <div className={styles.actions}>
            <button className={styles.skip} onClick={() => { haptic("select"); finish(); }} type="button">O&apos;tkazib yuborish</button>
            <button className={styles.next} onClick={() => { haptic("light"); if (isLast) finish(); else setStep((value) => value + 1); }} type="button">
              <span>{isLast ? "Boshlash" : "Keyingi"}</span>
              <MobileIcon name={isLast ? "checkmark" : "arrow-forward"} size={15} />
            </button>
          </div>
        </section>
      ) : null}
    </div>
  );
}

/** 대상 표시용 — `<div {...tourTarget("home.chart")}>` */
export function tourTarget(id: string) {
  return { "data-tour": id };
}
