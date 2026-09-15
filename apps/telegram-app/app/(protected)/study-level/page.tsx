import { Suspense } from "react";

import { StudyLevelScreen } from "../../../src/features/study-path/ui/study-level-screen";

export default function StudyLevelPage() {
  return (
    <Suspense fallback={null}>
      <StudyLevelScreen />
    </Suspense>
  );
}
