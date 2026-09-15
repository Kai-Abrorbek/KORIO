import { Suspense } from "react";

import { WelcomeScreen } from "../../../src/features/onboarding/ui/welcome-screen";

export default function WelcomePage() {
  return <Suspense fallback={null}><WelcomeScreen /></Suspense>;
}
