import { AnalyticsPage } from "@/features/analytics/analytics-page";
import { LiveAnalyticsPage } from "@/features/analytics/live-analytics-page";
import { isMockMode } from "@/shared/config/data-mode";

export default function Page() { return isMockMode ? <AnalyticsPage/> : <LiveAnalyticsPage/>; }
