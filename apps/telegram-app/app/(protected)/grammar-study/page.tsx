import { Suspense } from "react";

import { GrammarStudyScreen } from "../../../src/features/grammar/ui/grammar-study-screen";

export default function GrammarStudyPage() {
  return <Suspense fallback={null}><GrammarStudyScreen /></Suspense>;
}
