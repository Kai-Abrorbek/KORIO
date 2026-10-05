import { syncMockUserSubscription } from "@/features/users/repository";
import { mockAuditSource } from "@/shared/data/mock-audit";

export type SubscriptionStatus = "active" | "cancelled" | "grace_period" | "on_hold" | "expired";
export type SubscriptionTier = "super" | "max";
export type SubscriptionPlan = "monthly" | "three_months" | "six_months" | "yearly" | "gem_pass";
export type SubscriptionProvider = "google_play" | "toss" | "uzum" | "click" | "payme" | "gems";

export interface AdminSubscription {
  id: string;
  userId: string;
  email: string;
  nickname: string;
  provider: SubscriptionProvider;
  platform: "android" | "ios" | "web" | "internal";
  country: "KR" | "UZ" | "OTHER";
  tier: SubscriptionTier;
  plan: SubscriptionPlan;
  productId: string;
  status: SubscriptionStatus;
  startedAt: string;
  expiresAt: string;
  autoRenew: boolean;
  lastVerifiedAt: string | null;
  revokedAt: string | null;
  priceMicros: null;
  currency: "";
  trialStartedAt: string | null;
}

export interface SubscriptionQuery {
  search?: string;
  status?: SubscriptionStatus | "all";
  tier?: SubscriptionTier | "all";
  provider?: SubscriptionProvider | "all";
  page?: number;
  pageSize?: number;
}

export interface SubscriptionPage { items: AdminSubscription[]; total: number; page: number; pageSize: number }
export interface SubscriptionEvent { date: string; type: "new" | "churn"; subscriptionId: string }
export interface SubscriptionOverride { subscriptionId: string; status: SubscriptionStatus; tier: SubscriptionTier; reason: string }

/** Replace this adapter when admin list/detail/override endpoints exist. Server must enforce permissions and audit. */
export interface SubscriptionRepository {
  list(query: SubscriptionQuery): Promise<SubscriptionPage>;
  get(id: string): Promise<AdminSubscription | null>;
  events(from: string, to: string): Promise<SubscriptionEvent[]>;
  override(input: SubscriptionOverride): Promise<AdminSubscription>;
}

const names = ["김하나", "박지민", "이서윤", "최민준", "정유나", "오지후", "강소라", "조현우", "윤다은", "한예린", "Nozima", "Aziza", "Javohir", "Malika", "Sevara", "Dilshod"];
const statuses: SubscriptionStatus[] = ["active", "active", "active", "active", "cancelled", "grace_period", "on_hold", "expired"];
const providers: SubscriptionProvider[] = ["google_play", "google_play", "google_play", "toss", "uzum", "click", "payme", "gems"];
const start = Date.UTC(2026, 9, 6);
let subscriptions: AdminSubscription[] = Array.from({ length: 56 }, (_, index) => {
  const tier: SubscriptionTier = index % 5 === 0 ? "max" : "super";
  const provider = providers[index % providers.length]!;
  const plan: SubscriptionPlan = provider === "gems" ? "gem_pass" : index % 6 === 0 ? "yearly" : index % 4 === 0 ? "three_months" : "monthly";
  const status = statuses[index % statuses.length]!;
  const startedAt = new Date(start - (index * 5 + 3) * 86_400_000).toISOString();
  return {
    id: `sub_${String(index + 1).padStart(4, "0")}`,
    userId: `usr_${String(index + 1).padStart(4, "0")}`,
    email: `learner${index + 1}@example.com`,
    nickname: names[index % names.length]!,
    provider,
    platform: provider === "google_play" ? "android" : provider === "gems" ? "internal" : "web",
    country: provider === "uzum" || provider === "click" || provider === "payme" ? "UZ" : provider === "toss" ? "KR" : "OTHER",
    tier,
    plan,
    productId: provider === "google_play" ? `korio_${tier}_${plan}` : `${provider}_${tier}_${plan}`,
    status,
    startedAt,
    expiresAt: new Date(start + (index % 11 - 2) * 86_400_000 + (status === "active" ? 35 * 86_400_000 : 0)).toISOString(),
    autoRenew: status === "active" || status === "grace_period",
    lastVerifiedAt: provider === "google_play" ? new Date(start - index % 7 * 86_400_000).toISOString() : null,
    revokedAt: null,
    priceMicros: null,
    currency: "",
    trialStartedAt: index % 6 === 0 ? startedAt : null,
  };
});

const events: SubscriptionEvent[] = subscriptions.flatMap((subscription, index) => {
  const rows: SubscriptionEvent[] = [{ date: subscription.startedAt.slice(0, 10), type: "new", subscriptionId: subscription.id }];
  if (["expired", "on_hold"].includes(subscription.status)) rows.push({ date: new Date(start - (index % 25) * 86_400_000).toISOString().slice(0, 10), type: "churn", subscriptionId: subscription.id });
  return rows;
});

export const mockSubscriptionRepository: SubscriptionRepository = {
  async list(query) {
    const needle = query.search?.trim().toLocaleLowerCase() ?? "";
    const filtered = subscriptions.filter(item =>
      (!needle || `${item.email} ${item.nickname} ${item.id} ${item.userId}`.toLocaleLowerCase().includes(needle)) &&
      (!query.status || query.status === "all" || item.status === query.status) &&
      (!query.tier || query.tier === "all" || item.tier === query.tier) &&
      (!query.provider || query.provider === "all" || item.provider === query.provider),
    ).sort((a, b) => b.startedAt.localeCompare(a.startedAt));
    const pageSize = Math.max(1, query.pageSize ?? 12);
    const page = Math.max(1, Math.min(query.page ?? 1, Math.ceil(filtered.length / pageSize) || 1));
    return { items: filtered.slice((page - 1) * pageSize, page * pageSize).map(item => ({ ...item })), total: filtered.length, page, pageSize };
  },
  async get(id) { const found = subscriptions.find(item => item.id === id); return found ? { ...found } : null; },
  async events(from, to) { return events.filter(event => event.date >= from && event.date <= to).map(event => ({ ...event })); },
  async override(input) {
    if (!input.reason.trim()) throw new Error("변경 사유를 입력하세요.");
    const current = subscriptions.find(item => item.id === input.subscriptionId);
    if (!current) throw new Error("구독을 찾을 수 없습니다.");
    if (current.status === input.status && current.tier === input.tier) throw new Error("변경된 값이 없습니다.");
    const updated = { ...current, status: input.status, tier: input.tier };
    const changes: Record<string, { from: unknown; to: unknown }> = {};
    if (current.status !== updated.status) changes.status = { from: current.status, to: updated.status };
    if (current.tier !== updated.tier) changes.tier = { from: current.tier, to: updated.tier };
    subscriptions = subscriptions.map(item => item.id === updated.id ? updated : item);
    const wasEntitled = ["active", "cancelled", "grace_period"].includes(current.status);
    const isEntitled = ["active", "cancelled", "grace_period"].includes(updated.status);
    if (wasEntitled !== isEntitled) events.push({
      date: new Date().toISOString().slice(0, 10),
      type: isEntitled ? "new" : "churn",
      subscriptionId: updated.id,
    });
    syncMockUserSubscription(updated.userId, { tier: updated.tier, plan: updated.plan, expiresAt: updated.expiresAt, status: updated.status });
    await mockAuditSource.record({
      action: "subscription.override",
      targetType: "subscription",
      targetId: updated.id,
      targetLabel: updated.email,
      changes,
      reason: input.reason.trim(),
    });
    return { ...updated };
  },
};
