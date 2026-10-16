/**
 * 홈 아바타의 동작 — 깜빡임 · 고개 돌리기 · 손 흔들기 (+ 그에 따라 머리·몸이 살짝 기울기).
 *
 * ⚠️ 이 파일은 두 앱에 **똑같이** 있다 — 고치면 같이 고친다.
 *   텔레그램 shared/model/avatar-motion.ts · 모바일 components/avatar/avatarMotion.ts
 * 동작을 "채널별 키프레임(시간 ms → 값)" 으로 적고 각 앱이 자기 방식으로 돌린다
 * (텔레그램 Web Animations, 모바일 reanimated). 그래서 두 앱 움직임이 같다.
 *
 * 둥둥 뜨기·통통 튀기 같은 계속 도는 움직임은 넣지 않는다. 가만히 있다가
 *   - 몇 초마다 눈을 깜빡이고
 *   - 홈에 들어오면 한 번 손을 흔들고
 *   - 가끔 고개를 돌려 두리번거린다.
 *
 * 좌표는 아바타 캔버스 320×360 (avatar-wearables 와 같다).
 */

export type MotionChannel = "armL" | "armR" | "look" | "tilt" | "lean";

export type MotionEase = "out" | "inOut" | "linear";

export interface MotionKey {
  /** 동작 시작부터 ms */
  t: number;
  v: number;
  /** 앞 키에서 이 키로 가는 동안의 곡선 */
  ease?: MotionEase;
}

export interface MotionTimeline {
  duration: number;
  keys: Partial<Record<MotionChannel, MotionKey[]>>;
  /** 이 시각에 한 번 깜빡인다 (고개를 돌릴 때 사람은 보통 눈을 깜빡인다) */
  blinkAt?: number[];
}

/** 눈 감은 시간 */
export const BLINK_MS = 120;

/**
 * 고개 돌리기 — look 1 일 때 부위별 가로 이동 (캔버스 단위).
 * 얼굴이 제일 많이, 머리는 조금, 귀·뒷머리는 반대로 → 머리가 돌아가는 것처럼 보인다.
 */
export const LOOK_SHIFT = {
  face: 10,
  front: 6,
  head: 3,
  ears: -5,
  back: -4,
} as const;

/** 머리 기울기 축 (목) · 몸 기울기 축 (발) */
export const NECK = { x: 160, y: 204 } as const;
export const FEET = { x: 160, y: 336 } as const;

export interface MotionBody {
  bodyX: number;
  bodyWidth: number;
  outfit: string;
  costume?: string;
  hand?: string;
}

const isHanbokArms = (body: MotionBody) =>
  !isCostumeId(body.costume) && body.outfit === "outfit_hanbok";

const isCostumeId = (id?: string) =>
  typeof id === "string" && id.startsWith("costume_") && id !== "costume_none";

/** 어깨(팔이 도는 축)와 쉬고 있을 때 손 위치 */
export function armGeometry(side: "L" | "R", body: MotionBody) {
  const right = body.bodyX + body.bodyWidth;
  // 한복은 소매가 몸매와 상관없이 고정 좌표다 (아바타 그림과 같게)
  if (isHanbokArms(body)) {
    return side === "L"
      ? { pivot: { x: 110, y: 199 }, hand: { x: 80, y: 269 } }
      : { pivot: { x: 210, y: 199 }, hand: { x: 240, y: 269 } };
  }
  return side === "L"
    ? { pivot: { x: body.bodyX + 18, y: 201 }, hand: { x: body.bodyX - 20, y: 271 } }
    : { pivot: { x: right - 18, y: 201 }, hand: { x: right + 20, y: 271 } };
}

const deg = (rad: number) => (rad * 180) / Math.PI;

/** 귀 (캔버스) — 든 손이 귀에 붙으면 안 된다 (조금 떨어지게 여유) */
const EAR = { y: 139, rx: 24, ry: 29, left: 84, right: 236 };
const HAND_R = 18;
const EAR_GAP = 8;

function handHitsEar(x: number, y: number) {
  return [EAR.left, EAR.right].some((cx) => {
    const dx = (x - cx) / (EAR.rx + HAND_R + EAR_GAP);
    const dy = (y - EAR.y) / (EAR.ry + HAND_R + EAR_GAP);
    return dx * dx + dy * dy < 1;
  });
}

/**
 * 팔을 들었을 때의 회전각 (도). 손이 어깨 바깥 위로 — 수평에서 30° 쯤 —
 * 올라가되, 귀에 붙지 않고 캔버스 밖으로 나가지 않는 자리를 찾는다.
 * 몸이 넓으면 손이 캔버스 끝에 걸려서 더 위로 든다.
 */
export function raiseAngle(side: "L" | "R", body: MotionBody) {
  const { pivot, hand } = armGeometry(side, body);
  const length = Math.hypot(hand.x - pivot.x, hand.y - pivot.y);
  const rest = Math.atan2(hand.y - pivot.y, hand.x - pivot.x);
  const fits = (up: number) => {
    const a = (side === "R" ? -up : 180 + up) * (Math.PI / 180);
    const x = pivot.x + length * Math.cos(a);
    const y = pivot.y + length * Math.sin(a);
    return x - HAND_R >= 4 && x + HAND_R <= 316 && !handHitsEar(x, y);
  };
  const order = [30, 32, 34, 36, 38, 40, 44, 48, 52, 56, 60, 26, 22, 18];
  const up = order.find(fits) ?? 30;
  const a = (side === "R" ? -up : 180 + up) * (Math.PI / 180);
  let turn = deg(a - rest);
  // 오른팔은 반시계(-), 왼팔은 시계(+) 쪽으로 든다
  if (side === "R" && turn > 0) turn -= 360;
  if (side === "L" && turn < 0) turn += 360;
  return turn;
}

/** 어느 팔로 흔드나 — 오른손에 응원봉·마이크를 들었으면 왼손 */
export function waveSide(body: MotionBody): "L" | "R" {
  return body.hand && body.hand !== "hand_none" ? "L" : "R";
}

/** 손 흔들기 (~2초) */
export function waveTimeline(body: MotionBody): MotionTimeline {
  const side = waveSide(body);
  const channel: MotionChannel = side === "R" ? "armR" : "armL";
  const up = raiseAngle(side, body);
  // 흔드는 폭 — 위쪽으로 조금, 아래쪽으로 조금
  const s = side === "R" ? -1 : 1;
  const hi = up + 12 * s;
  const lo = up - 10 * s;
  const toward = side === "R" ? 1 : -1;
  return {
    duration: 2150,
    keys: {
      [channel]: [
        { t: 0, v: 0 },
        { t: 380, v: up, ease: "out" },
        { t: 600, v: hi, ease: "inOut" },
        { t: 820, v: lo, ease: "inOut" },
        { t: 1040, v: hi, ease: "inOut" },
        { t: 1260, v: lo, ease: "inOut" },
        { t: 1480, v: up, ease: "inOut" },
        { t: 1700, v: up },
        { t: 2150, v: 0, ease: "inOut" },
      ],
      // 흔드는 쪽으로 고개를 살짝 갸웃
      tilt: [
        { t: 0, v: 0 },
        { t: 420, v: 5 * toward, ease: "out" },
        { t: 1700, v: 5 * toward },
        { t: 2150, v: 0, ease: "inOut" },
      ],
      // 몸은 반대쪽으로 아주 살짝 (팔 무게)
      lean: [
        { t: 0, v: 0 },
        { t: 420, v: -1.5 * toward, ease: "out" },
        { t: 1700, v: -1.5 * toward },
        { t: 2150, v: 0, ease: "inOut" },
      ],
    },
    blinkAt: [1580],
  };
}

/** 고개 돌려 보기 (~1.6초). dir -1 왼쪽 / 1 오른쪽 (보는 사람 기준) */
export function lookTimeline(dir: -1 | 1): MotionTimeline {
  return {
    duration: 1650,
    keys: {
      look: [
        { t: 0, v: 0 },
        { t: 320, v: dir, ease: "out" },
        { t: 1250, v: dir },
        { t: 1650, v: 0, ease: "inOut" },
      ],
      tilt: [
        { t: 0, v: 0 },
        { t: 360, v: 2 * dir, ease: "out" },
        { t: 1250, v: 2 * dir },
        { t: 1650, v: 0, ease: "inOut" },
      ],
    },
    blinkAt: [40],
  };
}

/** 양쪽을 다 둘러보기 (~2.6초) */
export function lookAroundTimeline(first: -1 | 1): MotionTimeline {
  const second = -first as -1 | 1;
  return {
    duration: 2650,
    keys: {
      look: [
        { t: 0, v: 0 },
        { t: 320, v: first, ease: "out" },
        { t: 1000, v: first },
        { t: 1500, v: second, ease: "inOut" },
        { t: 2200, v: second },
        { t: 2650, v: 0, ease: "inOut" },
      ],
      tilt: [
        { t: 0, v: 0 },
        { t: 360, v: 2 * first, ease: "out" },
        { t: 1000, v: 2 * first },
        { t: 1500, v: 2 * second, ease: "inOut" },
        { t: 2200, v: 2 * second },
        { t: 2650, v: 0, ease: "inOut" },
      ],
    },
    blinkAt: [40, 1220],
  };
}

/** 다음 깜빡임까지 (2.6~6초). 가끔 두 번 연달아 */
export function nextBlink(random: () => number = Math.random) {
  return { delay: 2600 + random() * 3400, double: random() < 0.2 };
}

/** 다음 두리번거림까지 (9~15초) */
export function nextIdle(random: () => number = Math.random) {
  return 9000 + random() * 6000;
}

/** 홈에 들어올 때 인사 — 너무 자주 들락거리면 매번 흔들지 않게 */
export const GREET_DELAY_MS = 800;
export const GREET_COOLDOWN_MS = 30000;

/** 깜빡일 수 있는 눈인가 — 이미 감은 눈(뿌듯) 표정은 그대로 둔다 */
export function canBlink(expression?: string) {
  return expression !== "expression_proud";
}

/**
 * 키프레임 → t 시점의 값 (테스트·미리보기용. 앱은 각자 엔진으로 보간한다)
 */
export function sampleChannel(keys: MotionKey[] | undefined, t: number) {
  const first = keys?.[0];
  if (!keys || !first) return 0;
  if (t <= first.t) return first.v;
  for (let i = 1; i < keys.length; i++) {
    const a = keys[i - 1];
    const b = keys[i];
    if (!a || !b) continue;
    if (t <= b.t) {
      const p = (t - a.t) / Math.max(1, b.t - a.t);
      const e =
        b.ease === "out"
          ? 1 - (1 - p) * (1 - p) * (1 - p)
          : b.ease === "inOut"
            ? p < 0.5
              ? 4 * p * p * p
              : 1 - Math.pow(-2 * p + 2, 3) / 2
            : p;
      return a.v + (b.v - a.v) * e;
    }
  }
  return keys[keys.length - 1]?.v ?? 0;
}
