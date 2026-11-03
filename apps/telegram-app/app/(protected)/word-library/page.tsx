import { Suspense } from "react";

import { WordLibraryScreen } from "../../../src/features/words/ui/word-library-screen";

export default function WordLibraryPage() {
  return (
    <Suspense fallback={null}>
      <WordLibraryScreen />
    </Suspense>
  );
}
