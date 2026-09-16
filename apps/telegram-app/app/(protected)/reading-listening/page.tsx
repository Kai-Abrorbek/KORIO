import { Suspense } from "react";

import { ReadingListeningScreen } from "../../../src/features/reading-listening/ui/reading-listening-screen";

export default function ReadingListeningPage() {
  return <Suspense fallback={null}><ReadingListeningScreen /></Suspense>;
}
