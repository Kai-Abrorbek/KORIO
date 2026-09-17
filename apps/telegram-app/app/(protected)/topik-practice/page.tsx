import { Suspense } from "react";

import { TopikPracticeScreen } from "../../../src/features/topik/ui/topik-practice-screen";

export default function TopikPracticePage() {
  return (
    <Suspense fallback={null}>
      <TopikPracticeScreen />
    </Suspense>
  );
}
