import { Suspense } from "react";
import { LiveContentPage } from "@/features/content/live-content-page";
import { isMockMode } from "@/shared/config/data-mode";

export default function Page() {
  return <Suspense fallback={<div className="admin-card admin-empty">콘텐츠를 불러오는 중…</div>}>
    {isMockMode ? <div className="admin-card admin-empty"><h2>실제 문제 데이터 연결이 필요합니다</h2><p>문제 관리·문제 품질은 읽기 전용 진단 화면입니다. API와 DB를 실행한 뒤 <code>NEXT_PUBLIC_ADMIN_DATA_MODE=api</code>로 관리자 앱을 시작해 주세요. 예전 mock 편집 화면은 이 메뉴에서 열리지 않습니다.</p></div> : <LiveContentPage />}
  </Suspense>;
}
