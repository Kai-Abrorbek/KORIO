import { Suspense } from "react";

import { WordStudyScreen } from "../../../src/features/words/ui/word-study-screen";

export default function WordStudyPage() {
  return <Suspense fallback={null}><WordStudyScreen /></Suspense>;
}
