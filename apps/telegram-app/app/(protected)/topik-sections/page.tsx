import { Suspense } from "react";

import { TopikSectionsScreen } from "../../../src/features/topik/ui/topik-sections-screen";

export default function TopikSectionsPage() {
  return (
    <Suspense fallback={null}>
      <TopikSectionsScreen />
    </Suspense>
  );
}
