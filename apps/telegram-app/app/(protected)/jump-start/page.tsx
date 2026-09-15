import { Suspense } from "react";

import { JumpStartScreen } from "../../../src/features/lesson/ui/jump-flow";

export default function JumpStartPage() {
  return <Suspense fallback={null}><JumpStartScreen /></Suspense>;
}
