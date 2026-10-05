export type RevenueChannel = "google_play" | "toss" | "uzum" | "click" | "payme";
export type PaymentStatus = "paid" | "refunded" | "failed";
export type SettlementStatus = "settled" | "scheduled" | "none";
export type RevenueGrain = "day" | "week" | "month" | "year";
export type ExpenseCategory = "marketing" | "infrastructure" | "content" | "support";

export const CHANNEL_LABEL: Record<RevenueChannel, string> = {
  google_play: "Google Play", toss: "Toss", uzum: "Uzum", click: "Click", payme: "Payme",
};
export const EXPENSE_LABEL: Record<ExpenseCategory, string> = {
  marketing: "마케팅", infrastructure: "인프라", content: "콘텐츠 제작", support: "고객 지원",
};
export const EXPENSE_CATEGORIES: ExpenseCategory[] = ["marketing", "infrastructure", "content", "support"];

export interface RevenueTransaction {
  id: string;
  date: string;
  customer: string;
  product: string;
  channel: RevenueChannel;
  status: PaymentStatus;
  settlement: SettlementStatus;
  gross: number;
  refund: number;
  fee: number;
  payout: number;
}

export interface RevenueDay {
  date: string;
  gross: number;
  refunds: number;
  fees: number;
  operatingExpenses: number;
  payout: number;
  profit: number;
  paidOrders: number;
  refundedOrders: number;
  failedOrders: number;
  costs: Record<ExpenseCategory, number>;
}

export interface RevenueTotals {
  gross: number;
  refunds: number;
  fees: number;
  operatingExpenses: number;
  payout: number;
  profit: number;
  paidOrders: number;
  refundedOrders: number;
  failedOrders: number;
  scheduledPayout: number;
  settledPayout: number;
  costs: Record<ExpenseCategory, number>;
}

export interface RevenueBucket extends RevenueTotals { key: string; label: string }
export interface RevenueReport { through: string; days: RevenueDay[]; transactions: RevenueTransaction[] }

/** 실결제 원장과는 별개인 데모 계약. 실제 연결 시 서버 집계/원장 어댑터로 교체한다. */
export interface RevenueSource { load(through: string): Promise<RevenueReport> }

const DAY = 86_400_000;
const CHANNELS: RevenueChannel[] = ["google_play", "google_play", "toss", "uzum", "click", "payme"];
const PRODUCTS = [
  { label: "SUPER 월간", price: 12_900 },
  { label: "MAX 월간", price: 19_900 },
  { label: "SUPER 3개월", price: 34_900 },
  { label: "SUPER 연간", price: 99_000 },
];
const emptyCosts = (): Record<ExpenseCategory, number> => ({ marketing: 0, infrastructure: 0, content: 0, support: 0 });
export const emptyTotals = (): RevenueTotals => ({
  gross: 0, refunds: 0, fees: 0, operatingExpenses: 0, payout: 0, profit: 0,
  paidOrders: 0, refundedOrders: 0, failedOrders: 0, scheduledPayout: 0, settledPayout: 0,
  costs: emptyCosts(),
});

const iso = (time: number) => new Date(time).toISOString().slice(0, 10);
const mondayOf = (date: string) => {
  const time = Date.parse(`${date}T00:00:00.000Z`);
  const day = new Date(time).getUTCDay();
  return iso(time - ((day + 6) % 7) * DAY);
};

function buildReport(through: string): RevenueReport {
  const first = Date.parse("2023-01-01T00:00:00.000Z");
  const last = Date.parse(`${through}T00:00:00.000Z`);
  const days: RevenueDay[] = [];
  const transactions: RevenueTransaction[] = [];
  if (!Number.isFinite(last) || last < first) return { through, days, transactions };

  for (let time = first, index = 0; time <= last; time += DAY, index++) {
    const date = iso(time);
    const weekday = new Date(time).getUTCDay();
    const count = Math.max(3, Math.round(5 + index / 520 + Math.sin(index * .31) * 1.7 + (weekday === 0 || weekday === 6 ? 1 : 0)));
    const costs: Record<ExpenseCategory, number> = {
      marketing: 24_000 + index % 5 * 1_400,
      infrastructure: 7_000 + index % 3 * 450,
      content: 8_000 + index % 4 * 750,
      support: 4_000 + index % 3 * 520,
    };
    const row: RevenueDay = { date, gross: 0, refunds: 0, fees: 0, operatingExpenses: Object.values(costs).reduce((a, b) => a + b, 0), payout: 0, profit: 0, paidOrders: 0, refundedOrders: 0, failedOrders: 0, costs };

    for (let order = 0; order < count; order++) {
      const selector = index * 17 + order * 11;
      const channel = CHANNELS[selector % CHANNELS.length]!;
      const product = PRODUCTS[(selector + Math.floor(index / 13)) % PRODUCTS.length]!;
      const status: PaymentStatus = selector % 47 === 0 ? "failed" : selector % 31 === 0 ? "refunded" : "paid";
      const gross = status === "failed" ? 0 : product.price;
      const refund = status === "refunded" ? gross : 0;
      const feeRate = channel === "google_play" ? .15 : channel === "toss" ? .055 : .07;
      const fee = status === "paid" ? Math.round(gross * feeRate / 10) * 10 : 0;
      const payout = gross - refund - fee;
      const settlement: SettlementStatus = status !== "paid" ? "none" : last - time < 4 * DAY ? "scheduled" : "settled";
      transactions.push({ id: `pay_${date.replaceAll("-", "")}_${String(order + 1).padStart(2, "0")}`, date, customer: `usr_${String(1000 + selector % 870).padStart(4, "0")}`, product: product.label, channel, status, settlement, gross, refund, fee, payout });
      row.gross += gross;
      row.refunds += refund;
      row.fees += fee;
      row.payout += payout;
      if (status === "paid") row.paidOrders++;
      if (status === "refunded") row.refundedOrders++;
      if (status === "failed") row.failedOrders++;
    }
    row.profit = row.payout - row.operatingExpenses;
    days.push(row);
  }
  return { through, days, transactions };
}

export const mockRevenueSource: RevenueSource = { async load(through) { return buildReport(through); } };

export function summarizeRevenue(report: RevenueReport, from: string, to: string): RevenueTotals {
  const totals = emptyTotals();
  for (const day of report.days) {
    if (day.date < from || day.date > to) continue;
    totals.gross += day.gross;
    totals.refunds += day.refunds;
    totals.fees += day.fees;
    totals.operatingExpenses += day.operatingExpenses;
    totals.payout += day.payout;
    totals.profit += day.profit;
    totals.paidOrders += day.paidOrders;
    totals.refundedOrders += day.refundedOrders;
    totals.failedOrders += day.failedOrders;
    for (const category of EXPENSE_CATEGORIES) totals.costs[category] += day.costs[category];
  }
  for (const transaction of report.transactions) {
    if (transaction.date < from || transaction.date > to) continue;
    if (transaction.settlement === "scheduled") totals.scheduledPayout += transaction.payout;
    if (transaction.settlement === "settled") totals.settledPayout += transaction.payout;
  }
  return totals;
}

export function revenueBuckets(report: RevenueReport, grain: RevenueGrain): RevenueBucket[] {
  const map = new Map<string, RevenueBucket>();
  for (const day of report.days) {
    const key = grain === "day" ? day.date : grain === "week" ? mondayOf(day.date) : grain === "month" ? day.date.slice(0, 7) : day.date.slice(0, 4);
    const label = grain === "day" ? day.date.slice(5).replace("-", ".") : grain === "week" ? `${key.slice(5).replace("-", ".")} 주` : grain === "month" ? key.replace("-", ".") : key;
    const bucket = map.get(key) ?? { key, label, ...emptyTotals() };
    bucket.gross += day.gross;
    bucket.refunds += day.refunds;
    bucket.fees += day.fees;
    bucket.operatingExpenses += day.operatingExpenses;
    bucket.payout += day.payout;
    bucket.profit += day.profit;
    bucket.paidOrders += day.paidOrders;
    bucket.refundedOrders += day.refundedOrders;
    bucket.failedOrders += day.failedOrders;
    for (const category of EXPENSE_CATEGORIES) bucket.costs[category] += day.costs[category];
    map.set(key, bucket);
  }
  return [...map.values()].slice(-(grain === "day" ? 30 : grain === "year" ? 4 : 12));
}

export const formatWon = (value: number) => `₩${Math.round(value).toLocaleString("ko-KR")}`;
export function compactWon(value: number) {
  const abs = Math.abs(value);
  const sign = value < 0 ? "−" : "";
  if (abs >= 100_000_000) return `${sign}₩${(abs / 100_000_000).toFixed(1)}억`;
  if (abs >= 10_000) return `${sign}₩${(abs / 10_000).toFixed(abs >= 1_000_000 ? 0 : 1)}만`;
  return `${sign}₩${Math.round(abs).toLocaleString("ko-KR")}`;
}
