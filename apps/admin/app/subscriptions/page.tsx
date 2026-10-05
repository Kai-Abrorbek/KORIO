import { Suspense } from "react";
import { SubscriptionsPage } from "@/features/subscriptions/subscriptions-page";

export default function Page() {
  return <Suspense fallback={<div className="admin-empty">구독을 불러오는 중…</div>}><SubscriptionsPage /></Suspense>;
}
