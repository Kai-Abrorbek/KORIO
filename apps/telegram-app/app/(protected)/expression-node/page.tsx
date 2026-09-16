import { Suspense } from "react";

import { ExpressionLearningScreen } from "../../../src/features/expressions/ui/expression-learning-screen";

export default function ExpressionNodePage() {
  return <Suspense fallback={null}><ExpressionLearningScreen /></Suspense>;
}
