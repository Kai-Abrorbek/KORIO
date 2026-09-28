import { Suspense } from "react";

import { WelcomeScreen } from "../../../src/features/onboarding/ui/welcome-screen";
import { ContentLanguagePrompt } from "../../../src/features/settings/ui/content-language-prompt";

export default function WelcomePage() {
  return (
    <>
      <Suspense fallback={null}><WelcomeScreen /></Suspense>
      {/* 한국어로 처음 연 사람 — 뜻·설명 언어를 설문 전에 정한다 */}
      <ContentLanguagePrompt />
    </>
  );
}
