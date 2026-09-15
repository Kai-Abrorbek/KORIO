import { Suspense } from "react";

import { CourseCategoriesScreen } from "../../../src/features/learning/ui/course-categories-screen";

export default function CourseCategoriesPage() {
  return (
    <Suspense fallback={null}>
      <CourseCategoriesScreen />
    </Suspense>
  );
}
