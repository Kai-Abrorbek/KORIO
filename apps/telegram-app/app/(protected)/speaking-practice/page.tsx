import { Suspense } from "react";

import { SpeakingPracticeScreen } from "../../../src/features/speaking/ui/speaking-practice-screen";

export default function SpeakingPracticePage() {
  return <Suspense fallback={null}><SpeakingPracticeScreen /></Suspense>;
}
