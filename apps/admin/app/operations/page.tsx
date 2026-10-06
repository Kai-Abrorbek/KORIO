import { OperationsPage } from "@/features/operations/operations-page";
import { BackendUnavailable } from "@/shared/ui/backend-unavailable";

export default function Page(){return <BackendUnavailable title="운영" reason="점검 모드·공지·캠페인을 저장하고 감사할 관리자 API가 아직 없습니다."><OperationsPage/></BackendUnavailable>;}
