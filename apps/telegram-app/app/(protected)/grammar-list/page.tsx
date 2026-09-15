import { Suspense } from "react";

import { GrammarListScreen } from "../../../src/features/grammar/ui/grammar-list-screen";

export default function GrammarListPage() {
  return <Suspense fallback={null}><GrammarListScreen /></Suspense>;
}
