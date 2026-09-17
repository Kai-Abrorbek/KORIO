import { Suspense } from "react";

import { TopikWritingScreen } from "../../../src/features/topik/ui/topik-writing-screen";

export default function TopikWritingPage() {
  return (
    <Suspense fallback={null}>
      <TopikWritingScreen />
    </Suspense>
  );
}
