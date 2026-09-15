import { Suspense } from "react";

import { LessonCompleteScreen } from "../../../src/features/lesson/ui/lesson-complete-screen";

export default function LessonCompletePage() {
  return <Suspense fallback={null}><LessonCompleteScreen /></Suspense>;
}
