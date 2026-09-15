import { Suspense } from "react";

import { RoadmapScreen } from "../../../src/features/roadmap/ui/roadmap-screen";

export default function RoadmapPage() {
  return (
    <Suspense fallback={null}>
      <RoadmapScreen />
    </Suspense>
  );
}
