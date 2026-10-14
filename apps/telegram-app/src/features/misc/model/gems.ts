import type { IoniconName } from "../../../shared/ui/mobile-icon";

/** 보석 내역 — api gem-ledger 와 같은 모양. 모바일 services/gem.service.ts 와 같다 */
export type GemHistoryType = "all" | "in" | "out";
export const GEM_HISTORY_TYPES: GemHistoryType[] = ["all", "in", "out"];

export interface GemTx {
  id: string;
  /** 들어오면 +, 나가면 − */
  amount: number;
  /** api GEM_SOURCES (chest, league, energy_refill …) */
  source: string;
  params: Record<string, string | number | undefined>;
  createdAt: string;
}

export interface GemHistoryPage {
  items: GemTx[];
  nextCursor: string | null;
}

export interface GemSummary {
  balance: number;
  monthIn: number;
  monthOut: number;
  since: string | null;
}

/** 문구 한 조각 — 키 + 값. 번역기가 통째로 맞추게 조각마다 따로 그린다 */
export interface GemText {
  key: string;
  vars?: Record<string, string | number>;
  /** 번역하지 않는 값 (닉네임 등) */
  raw?: string;
}

/** 출처마다 아이콘·색 (모바일 GemHistoryScreen 의 LOOK 과 같다) */
export const GEM_LOOK: Record<string, { icon: IoniconName; color: string }> = {
  chest: { icon: "gift", color: "#E2A83A" },
  streak_chest: { icon: "flame", color: "#FF7A00" },
  grammar_section: { icon: "book", color: "#776ee2" },
  level_exam: { icon: "school", color: "#776ee2" },
  quest: { icon: "checkmark-done-circle", color: "#1DBB7F" },
  quest_chest: { icon: "gift", color: "#1DBB7F" },
  monthly_challenge: { icon: "ribbon", color: "#1899D6" },
  checkin: { icon: "calendar", color: "#1899D6" },
  streak_goal: { icon: "flag", color: "#FF7A00" },
  streak_goal_lost: { icon: "flag", color: "#E5379B" },
  streak_freeze: { icon: "create", color: "#3BB6E5" },
  league: { icon: "trophy", color: "#1DBB7F" },
  referral_welcome: { icon: "person-add", color: "#776ee2" },
  referral: { icon: "person-add", color: "#776ee2" },
  referral_milestone: { icon: "people", color: "#776ee2" },
  energy_refill: { icon: "flash", color: "#E5379B" },
  gem_pass: { icon: "star", color: "#A946DA" },
  cosmetic: { icon: "sparkles", color: "#E2A83A" },
  sticker_pack: { icon: "paper-plane", color: "#2AABEE" },
  subscription_bonus: { icon: "sparkles", color: "#A946DA" },
  payout: { icon: "card", color: "#0FA36B" },
  payout_refund: { icon: "arrow-undo", color: "#0FA36B" },
  admin: { icon: "shield-checkmark", color: "#8C82F0" },
};
export const GEM_LOOK_FALLBACK = { icon: "diamond" as IoniconName, color: "#3BB6E5" };

const has = (value: unknown) => value !== undefined && value !== null && value !== "";

/** 한 줄의 제목·설명. 모르는 출처는 "보석 변동" */
export function describeGemTx(item: GemTx): { title: GemText; details: GemText[] } {
  const p = item.params ?? {};
  const known = item.source in GEM_LOOK;
  let title: GemText = { key: known ? `gemHistory.sources.${item.source}` : "gemHistory.sources.unknown" };
  const details: GemText[] = [];
  switch (item.source) {
    case "chest":
      if (p.grade === "wood" || p.grade === "silver" || p.grade === "gold") {
        title = { key: `gemHistory.chestGrade.${p.grade}` };
      }
      if (p.from === "lesson" || p.from === "grammar" || p.from === "roadmap") {
        details.push({ key: `gemHistory.chestFrom.${p.from}` });
      }
      break;
    case "streak_chest":
      if (p.grade === "wood" || p.grade === "silver" || p.grade === "gold") {
        details.push({ key: `gemHistory.chestGrade.${p.grade}` });
      }
      break;
    case "grammar_section":
      if (has(p.section)) details.push({ key: "gemHistory.details.section", vars: { n: p.section! } });
      break;
    case "level_exam":
      if (has(p.level)) details.push({ key: "gemHistory.details.level", vars: { n: p.level! } });
      break;
    case "monthly_challenge":
      if (has(p.at)) details.push({ key: "gemHistory.details.monthly", vars: { n: p.at! } });
      break;
    case "checkin":
      if (has(p.day)) details.push({ key: "gemHistory.details.checkin", vars: { n: p.day! } });
      break;
    case "streak_goal":
    case "streak_goal_lost":
      if (has(p.days)) details.push({ key: "gemHistory.details.goal", vars: { n: p.days! } });
      break;
    case "league":
      if (has(p.tier)) details.push({ key: `league.tiers.${p.tier}` });
      if (has(p.rank)) details.push({ key: "gemHistory.details.rank", vars: { n: p.rank! } });
      break;
    case "referral":
      if (has(p.nickname)) details.push({ key: "", raw: String(p.nickname) });
      break;
    case "referral_milestone":
      if (has(p.count)) details.push({ key: "gemHistory.details.referralCount", vars: { n: p.count! } });
      break;
    case "gem_pass":
      if (has(p.days)) details.push({ key: "gemHistory.details.days", vars: { n: p.days! } });
      break;
    case "payout":
    case "payout_refund":
      if (has(p.last4)) details.push({ key: "gemHistory.details.card", vars: { last4: p.last4! } });
      if (item.source === "payout_refund" && (p.reason === "rejected" || p.reason === "cancelled")) {
        details.push({ key: `gemHistory.payoutReason.${p.reason}` });
      }
      break;
    case "admin":
      if (item.amount < 0) title = { key: "gemHistory.sources.admin_out" };
      break;
    case "cosmetic":
      // 어떤 오라를 샀는지 (avatarEditor.aura.items.<id>.name)
      if (typeof p.item === "string" && p.item.startsWith("aura_")) {
        details.push({ key: `avatarEditor.aura.items.${p.item}.name` });
      }
      break;
  }
  return { title, details };
}

/** 2026.10.12 — 날짜 묶음의 이름 (오늘·어제는 화면이 바꾼다) */
export function dayKeyOf(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export function timeOf(iso: string) {
  const d = new Date(iso);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

/** 같은 날끼리 묶는다 (최근 것부터 와 있다 — 처음 나온 날 순서를 지킨다) */
export function groupByDay(items: GemTx[]) {
  const groups = new Map<string, GemTx[]>();
  for (const item of items) {
    const day = dayKeyOf(item.createdAt);
    const list = groups.get(day);
    if (list) list.push(item);
    else groups.set(day, [item]);
  }
  return [...groups].map(([day, list]) => ({ day, items: list }));
}
