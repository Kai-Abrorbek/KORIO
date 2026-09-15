import { Suspense } from "react";

import { OnboardingResultScreen } from "../../../src/features/onboarding/ui/onboarding-result-screen";

export default function OnboardingResultPage() {
  return <Suspense fallback={null}><OnboardingResultScreen /></Suspense>;
}
