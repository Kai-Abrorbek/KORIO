import { AnalyticsPage } from "@/features/analytics/analytics-page";
import { BackendUnavailable } from "@/shared/ui/backend-unavailable";

export default function Page() { return <BackendUnavailable title="학습 분석" reason="Section·Unit·Lesson 및 문제별 상세 분석 API가 아직 없습니다. 기본 학습 퍼널·활성·리텐션은 Control Center에서 실제 데이터로 볼 수 있습니다."><AnalyticsPage/></BackendUnavailable>; }
