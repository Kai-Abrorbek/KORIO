import { Suspense } from "react";

import { TopikStatsScreen } from "../../../src/features/topik/ui/topik-stats-screen";

export default function TopikStatsPage() {
  return (
    <Suspense fallback={null}>
      <TopikStatsScreen />
    </Suspense>
  );
}
