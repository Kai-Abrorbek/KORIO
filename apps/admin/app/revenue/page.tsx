import { RevenuePage } from "@/features/revenue/revenue-page";
import { isMockMode } from "@/shared/config/data-mode";
import { LiveRevenuePage } from "@/features/revenue/live-revenue-page";

export default function Page() {
  return isMockMode ? <RevenuePage /> : <LiveRevenuePage />;
}
