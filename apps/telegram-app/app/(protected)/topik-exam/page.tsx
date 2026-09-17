import { Suspense } from "react";

import { TopikExamScreen } from "../../../src/features/topik/ui/topik-exam-screen";

export default function TopikExamPage() {
  return (
    <Suspense fallback={null}>
      <TopikExamScreen />
    </Suspense>
  );
}
