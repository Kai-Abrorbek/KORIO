import { Suspense } from "react";
import { ContentPage } from "@/features/content/content-page";

export default function Page() {
  return <Suspense fallback={<div className="admin-card admin-empty">콘텐츠를 불러오는 중…</div>}><ContentPage /></Suspense>;
}
