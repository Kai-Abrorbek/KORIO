import type { Ionicons } from "@expo/vector-icons";
import type { TFunction } from "i18next";
import type { GemTx } from "@/services/gem.service";

type IconName = keyof typeof Ionicons.glyphMap;

/** 출처마다 아이콘·색 (텔레그램 features/misc/model/gems.ts 의 GEM_LOOK 과 같다) */
export const GEM_LOOK: Record<string, { icon: IconName; color: string }> = {
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
export const GEM_LOOK_FALLBACK = { icon: "diamond" as IconName, color: "#3BB6E5" };

const has = (value: unknown) => value !== undefined && value !== null && value !== "";
const GRADES = ["wood", "silver", "gold"];
const FROMS = ["lesson", "grammar", "roadmap"];

/** 한 줄의 제목·설명 조각들. 모르는 출처는 "보석 변동" */
export function describeGemTx(item: GemTx, t: TFunction): { title: string; details: string[] } {
  const p = item.params ?? {};
  let title = t(
    item.source in GEM_LOOK ? `gemHistory.sources.${item.source}` : "gemHistory.sources.unknown",
  );
  const details: string[] = [];
  switch (item.source) {
    case "chest":
      if (GRADES.includes(String(p.grade))) title = t(`gemHistory.chestGrade.${p.grade}`);
      if (FROMS.includes(String(p.from))) details.push(t(`gemHistory.chestFrom.${p.from}`));
      break;
    case "streak_chest":
      if (GRADES.includes(String(p.grade))) details.push(t(`gemHistory.chestGrade.${p.grade}`));
      break;
    case "grammar_section":
      if (has(p.section)) details.push(t("gemHistory.details.section", { n: p.section }));
      break;
    case "level_exam":
      if (has(p.level)) details.push(t("gemHistory.details.level", { n: p.level }));
      break;
    case "monthly_challenge":
      if (has(p.at)) details.push(t("gemHistory.details.monthly", { n: p.at }));
      break;
    case "checkin":
      if (has(p.day)) details.push(t("gemHistory.details.checkin", { n: p.day }));
      break;
    case "streak_goal":
    case "streak_goal_lost":
      if (has(p.days)) details.push(t("gemHistory.details.goal", { n: p.days }));
      break;
    case "league":
      if (has(p.tier)) details.push(t(`league.tiers.${p.tier}`, { defaultValue: String(p.tier) }));
      if (has(p.rank)) details.push(t("gemHistory.details.rank", { n: p.rank }));
      break;
    case "referral":
      if (has(p.nickname)) details.push(String(p.nickname));
      break;
    case "referral_milestone":
      if (has(p.count)) details.push(t("gemHistory.details.referralCount", { n: p.count }));
      break;
    case "gem_pass":
      if (has(p.days)) details.push(t("gemHistory.details.days", { n: p.days }));
      break;
    case "payout":
    case "payout_refund":
      if (has(p.last4)) details.push(t("gemHistory.details.card", { last4: p.last4 }));
      if (item.source === "payout_refund" && (p.reason === "rejected" || p.reason === "cancelled")) {
        details.push(t(`gemHistory.payoutReason.${p.reason}`));
      }
      break;
    case "admin":
      if (item.amount < 0) title = t("gemHistory.sources.admin_out");
      break;
    case "cosmetic":
      // 어떤 오라를 샀는지
      if (typeof p.item === "string" && p.item.startsWith("aura_")) {
        details.push(t(`avatarEditor.aura.items.${p.item}.name`));
      }
      break;
  }
  return { title, details };
}

/** 2026.10.12 — 날짜 묶음의 이름 (오늘·어제는 화면이 바꾼다) */
export function dayKeyOf(date: Date | string) {
  const d = new Date(date);
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
