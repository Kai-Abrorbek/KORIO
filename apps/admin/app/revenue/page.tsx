import { RevenuePage } from "@/features/revenue/revenue-page";
import { isMockMode } from "@/features/auth/session";
import { LiveRevenuePage } from "@/features/revenue/live-revenue-page";

export default function Page() {
  return isMockMode ? <RevenuePage /> : <LiveRevenuePage />;
}
