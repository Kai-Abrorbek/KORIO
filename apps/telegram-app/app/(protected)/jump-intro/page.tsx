import { Suspense } from "react";

import { JumpIntroScreen } from "../../../src/features/lesson/ui/jump-flow";

export default function JumpIntroPage() {
  return <Suspense fallback={null}><JumpIntroScreen /></Suspense>;
}
