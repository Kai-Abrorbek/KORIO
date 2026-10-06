import { GamificationPage } from "@/features/gamification/gamification-page";
import { BackendUnavailable } from "@/shared/ui/backend-unavailable";

export default function Page() { return <BackendUnavailable title="게이미피케이션" reason="XP·리그·스트릭 관리자 집계 API가 아직 없습니다."><GamificationPage/></BackendUnavailable>; }
