import { Suspense } from "react";

import { JumpResultScreen } from "../../../src/features/lesson/ui/jump-flow";

export default function JumpResultPage() {
  return <Suspense fallback={null}><JumpResultScreen /></Suspense>;
}
