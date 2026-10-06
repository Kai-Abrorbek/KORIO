import { Suspense } from "react";
import { ContentPage } from "@/features/content/content-page";
import { BackendUnavailable } from "@/shared/ui/backend-unavailable";

export default function Page() {
  return <BackendUnavailable title="콘텐츠" reason="관리자용 콘텐츠 조회·편집 API가 아직 없습니다."><Suspense fallback={<div className="admin-card admin-empty">콘텐츠를 불러오는 중…</div>}><ContentPage /></Suspense></BackendUnavailable>;
}
