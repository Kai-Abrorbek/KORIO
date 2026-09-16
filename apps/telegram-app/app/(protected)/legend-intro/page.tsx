import { Suspense } from "react";

import { LegendIntroScreen } from "../../../src/features/legend/ui/legend-intro-screen";

export default function LegendIntroPage() {
  return <Suspense fallback={null}><LegendIntroScreen /></Suspense>;
}
