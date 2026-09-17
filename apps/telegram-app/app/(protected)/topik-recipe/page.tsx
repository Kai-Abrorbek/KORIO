import { Suspense } from "react";

import { TopikRecipeScreen } from "../../../src/features/topik/ui/topik-recipe-screen";

export default function TopikRecipePage() {
  return (
    <Suspense fallback={null}>
      <TopikRecipeScreen />
    </Suspense>
  );
}
