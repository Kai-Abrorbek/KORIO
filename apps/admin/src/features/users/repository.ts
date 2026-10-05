import { mockAuditSource } from "@/shared/data/mock-audit";

export type UserStatus = "active" | "suspended";
export type PlanTier = "free" | "super" | "max";
export type League = "bronze" | "silver" | "gold" | "sapphire" | "ruby" | "emerald" | "amethyst" | "pearl" | "obsidian" | "diamond";

export interface RecentLearning {
  id: string;
  at: string;
  section: number;
  unit: number;
  lesson: string;
  category: string;
  status: "completed" | "in_progress";
  correctAnswers: number;
  totalAnswers: number;
  xpEarned: number;
}

export interface AdminUser {
  id: string;
  email: string;
  nickname: string;
  username: string;
  country: "KR" | "UZ" | "OTHER";
  provider: "email" | "google" | "apple";
  createdAt: string;
  lastActiveAt: string;
  status: UserStatus;
  isOnboardingCompleted: boolean;
  placementLevel: number;
  learnMode: string;
  currentSection: number;
  currentUnit: number;
  currentLesson: string;
  overallProgressPercent: number;
  recentLearning: RecentLearning[];
  leagueChallengeClaims: string[];
  totalXP: number;
  streak: number;
  longestStreak: number;
  league: League;
  gems: number;
  energy: number;
  studyMinutes: number;
  lessonsCompleted: number;
  accuracy: number;
  tier: PlanTier;
  plan: string | null;
  superExpiresAt: string | null;
  trialStartedAt: string | null;
}

export interface UserQuery {
  search?: string;
  status?: UserStatus | "all";
  tier?: PlanTier | "all";
  country?: AdminUser["country"] | "all";
  section?: number | "all";
  league?: League | "all";
  activity?: "all" | "recent" | "dormant";
  joinedFrom?: string;
  joinedTo?: string;
  sort?: "newest" | "oldest" | "recent" | "xp";
  page?: number;
  pageSize?: number;
}

export interface UserPage {
  items: AdminUser[];
  total: number;
  page: number;
  pageSize: number;
}

export interface UserAction {
  userId: string;
  action: "suspend" | "reinstate" | "resetProgress";
  reason: string;
}

/** Backend adapter seam. The eventual API must authorize and audit these writes server-side. */
export interface UserRepository {
  list(query: UserQuery): Promise<UserPage>;
  get(id: string): Promise<AdminUser | null>;
  act(input: UserAction): Promise<AdminUser>;
}

const names = ["김하나", "박지민", "이서윤", "최민준", "정유나", "오지후", "강소라", "조현우", "윤다은", "한예린", "Nozima", "Aziza", "Javohir", "Malika", "Sevara", "Dilshod"];
export const leagues: League[] = ["bronze", "silver", "gold", "sapphire", "ruby", "emerald", "amethyst", "pearl", "obsidian", "diamond"];
const modes = ["vocabulary", "grammar", "expressions", "topik", "listening"];
const baseTime = Date.UTC(2026, 9, 6);
const DAY = 86_400_000;

let records: AdminUser[] = Array.from({ length: 64 }, (_, index) => {
  const createdAt = new Date(baseTime - (18 + index * 4) * 86_400_000).toISOString();
  const lastActiveAt = new Date(baseTime - (index * 7 % 43) * 86_400_000).toISOString();
  const entitled = index < 56 && index % 8 < 6;
  const tier: PlanTier = entitled ? index % 5 === 0 ? "max" : "super" : "free";
  const plan = tier === "free" ? null : index % 6 === 0 ? "yearly" : index % 4 === 0 ? "three_months" : "monthly";
  const currentSection = index % 6 + 1;
  const currentUnit = index * 3 % 8 + 1;
  const currentLesson = `L${index * 2 % 5 + 1}`;
  const recentLearning: RecentLearning[] = Array.from({ length: 4 }, (_, offset) => ({
    id: `attempt_${index + 1}_${offset + 1}`,
    at: new Date(baseTime - (index * 7 % 43 + offset * 2) * DAY).toISOString(),
    section: currentSection,
    unit: Math.max(1, currentUnit - offset),
    lesson: `L${Math.max(1, Number(currentLesson.slice(1)) - offset)}`,
    category: modes[(index + offset) % modes.length]!,
    status: offset === 0 && index % 4 === 0 ? "in_progress" : "completed",
    correctAnswers: 6 + (index + offset) % 4,
    totalAnswers: 10,
    xpEarned: offset === 0 && index % 4 === 0 ? 0 : 15 + (index + offset) % 12,
  }));
  return {
    id: `usr_${String(index + 1).padStart(4, "0")}`,
    email: `learner${index + 1}@example.com`,
    nickname: names[index % names.length]!,
    username: `korio_${index + 1}`,
    country: index % 4 === 0 ? "KR" : index % 4 === 1 ? "UZ" : "OTHER",
    provider: index % 4 === 0 ? "email" : index % 4 === 1 ? "google" : "apple",
    createdAt,
    lastActiveAt,
    status: index % 19 === 0 ? "suspended" : "active",
    isOnboardingCompleted: index % 9 !== 0,
    placementLevel: index % 6 + 1,
    learnMode: modes[index % modes.length]!,
    currentSection,
    currentUnit,
    currentLesson,
    overallProgressPercent: Math.min(95, 8 + index * 7 % 83),
    recentLearning,
    leagueChallengeClaims: index % 3 === 0 ? [] : [1, 2].map(week => new Date(baseTime - (week * 7 + index % 4) * DAY).toISOString()),
    totalXP: 620 + index * 183,
    streak: index * 3 % 24,
    longestStreak: 12 + index * 2 % 46,
    league: leagues[index % leagues.length]!,
    gems: 80 + index * 17 % 500,
    energy: index % 6,
    studyMinutes: 120 + index * 33,
    lessonsCompleted: 3 + index * 5 % 110,
    accuracy: 61 + index * 7 % 37,
    tier,
    plan,
    superExpiresAt: tier === "free" ? null : new Date(baseTime + (index % 11 - 2 + 35) * 86_400_000).toISOString(),
    trialStartedAt: index % 6 === 0 ? new Date(baseTime - (index * 5 + 3) * 86_400_000).toISOString() : null,
  };
});

export const mockUserRepository: UserRepository = {
  async list(query) {
    const needle = query.search?.trim().toLocaleLowerCase() ?? "";
    const filtered = records.filter(user =>
      (!needle || `${user.nickname} ${user.email} ${user.username} ${user.id}`.toLocaleLowerCase().includes(needle)) &&
      (!query.status || query.status === "all" || user.status === query.status) &&
      (!query.tier || query.tier === "all" || user.tier === query.tier) &&
      (!query.country || query.country === "all" || user.country === query.country) &&
      (!query.section || query.section === "all" || user.currentSection === query.section) &&
      (!query.league || query.league === "all" || user.league === query.league) &&
      (!query.joinedFrom || user.createdAt.slice(0, 10) >= query.joinedFrom) &&
      (!query.joinedTo || user.createdAt.slice(0, 10) <= query.joinedTo) &&
      (!query.activity || query.activity === "all" || (user.status === "active" && (query.activity === "recent"
        ? baseTime - new Date(user.lastActiveAt).getTime() <= 7 * DAY
        : baseTime - new Date(user.lastActiveAt).getTime() >= 30 * DAY))),
    );
    filtered.sort((a, b) => {
      if (query.sort === "oldest") return a.createdAt.localeCompare(b.createdAt);
      if (query.sort === "recent") return b.lastActiveAt.localeCompare(a.lastActiveAt);
      if (query.sort === "xp") return b.totalXP - a.totalXP;
      return b.createdAt.localeCompare(a.createdAt);
    });
    const pageSize = Math.max(1, query.pageSize ?? 12);
    const page = Math.max(1, Math.min(query.page ?? 1, Math.ceil(filtered.length / pageSize) || 1));
    return { items: filtered.slice((page - 1) * pageSize, page * pageSize).map(user => ({ ...user })), total: filtered.length, page, pageSize };
  },
  async get(id) { const found = records.find(user => user.id === id); return found ? { ...found } : null; },
  async act(input) {
    const user = records.find(record => record.id === input.userId);
    if (!user) throw new Error("사용자를 찾을 수 없습니다.");
    if (!input.reason.trim()) throw new Error("변경 사유를 입력하세요.");
    const updated: AdminUser = { ...user };
    if (input.action === "suspend") updated.status = "suspended";
    if (input.action === "reinstate") updated.status = "active";
    if (input.action === "resetProgress") {
      updated.totalXP = 0;
      updated.streak = 0;
      updated.studyMinutes = 0;
      updated.lessonsCompleted = 0;
      updated.accuracy = 0;
      updated.overallProgressPercent = 0;
      updated.currentSection = 1;
      updated.currentUnit = 1;
      updated.currentLesson = "L1";
    }
    const changes: Record<string, { from: unknown; to: unknown }> = {};
    if (user.status !== updated.status) changes.status = { from: user.status, to: updated.status };
    const progressFields = ["totalXP", "streak", "studyMinutes", "lessonsCompleted", "accuracy"] as const;
    for (const field of progressFields) {
      if (user[field] !== updated[field]) changes[field] = { from: user[field], to: updated[field] };
    }
    const positionFields = ["overallProgressPercent", "currentSection", "currentUnit", "currentLesson"] as const;
    for (const field of positionFields) {
      if (user[field] !== updated[field]) changes[field] = { from: user[field], to: updated[field] };
    }
    records = records.map(record => record.id === updated.id ? updated : record);
    await mockAuditSource.record({
      action: input.action === "suspend" ? "user.ban" : input.action === "reinstate" ? "user.unban" : "user.progress_reset",
      targetType: "user",
      targetId: updated.id,
      targetLabel: updated.email,
      changes,
      reason: input.reason.trim(),
    });
    return { ...updated };
  },
};

/** Keep the mock user's entitlement projection in step with a mock subscription override. */
export function syncMockUserSubscription(userId: string, input: { tier: "super" | "max"; plan: string; expiresAt: string; status: string }) {
  const entitled = ["active", "cancelled", "grace_period"].includes(input.status);
  records = records.map(user => user.id === userId ? {
    ...user,
    tier: entitled ? input.tier : "free",
    plan: entitled ? input.plan : null,
    superExpiresAt: entitled ? input.expiresAt : null,
  } : user);
}
