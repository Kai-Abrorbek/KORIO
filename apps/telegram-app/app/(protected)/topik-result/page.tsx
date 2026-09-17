import { Suspense } from "react";

import { TopikResultScreen } from "../../../src/features/topik/ui/topik-result-screen";

export default function TopikResultPage() {
  return (
    <Suspense fallback={null}>
      <TopikResultScreen />
    </Suspense>
  );
}
