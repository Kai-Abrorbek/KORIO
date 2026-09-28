import { HomeScreen } from "../../../src/features/home/ui/home-screen";
import { ContentLanguagePrompt } from "../../../src/features/settings/ui/content-language-prompt";

export default function HomePage() {
  return (
    <>
      <HomeScreen />
      {/* 한국어 UI 를 쓰던 사람에게 한 번 묻는다 */}
      <ContentLanguagePrompt />
    </>
  );
}
