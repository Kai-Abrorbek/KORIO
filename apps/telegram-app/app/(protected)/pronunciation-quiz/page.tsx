import { Suspense } from "react";

import { PronunciationQuizScreen } from "../../../src/features/pronunciation/ui/pronunciation-quiz-screen";

export default function PronunciationQuizPage() {
  return <Suspense fallback={null}><PronunciationQuizScreen /></Suspense>;
}
