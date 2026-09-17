import { Suspense } from "react";

import { TopikHomeScreen } from "../../../src/features/topik/ui/topik-home-screen";

export default function TopikPage() {
  return (
    <Suspense fallback={null}>
      <TopikHomeScreen />
    </Suspense>
  );
}
