import { Suspense } from "react";

import { HangulMemoryGame } from "../../../src/features/hangul/ui/hangul-memory-game";

export default function HangulGamePage() {
  return (
    <Suspense fallback={null}>
      <HangulMemoryGame />
    </Suspense>
  );
}
