import { AnalyticsPage } from "@/features/analytics/analytics-page";
import { LiveAnalyticsPage } from "@/features/analytics/live-analytics-page";
import { isMockMode } from "@/features/auth/session";

export default function Page() { return isMockMode ? <AnalyticsPage/> : <LiveAnalyticsPage/>; }
