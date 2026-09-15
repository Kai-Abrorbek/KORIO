import { Suspense } from "react";

import { LessonScreen } from "../../../src/features/lesson/ui/lesson-screen";

export default function LessonPage() {
  return <Suspense fallback={null}><LessonScreen /></Suspense>;
}
