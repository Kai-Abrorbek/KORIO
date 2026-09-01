import "../locales/i18n";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { SoundProvider } from "@/hooks/useSound";
import EnergyModal from "@/components/energy/EnergyModal";
import { useEnergyStore } from "@/store/energy.store";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "expo-router";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ErrorModal from "@/components/common/ErrorModal";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const energyModalVisible = useEnergyStore((s) => s.modalVisible);
  const closeEnergyModal = useEnergyStore((s) => s.closeEnergyModal);
  const gems = useAuthStore((s) => s.user?.gems ?? 0);
  const router = useRouter();

  // 화면 접근 규칙은 useAuthGuard 한 곳에 있다
  useAuthGuard();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SoundProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="welcome" />
            <Stack.Screen name="index" />
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="auth" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="roadmap" />
            {/* 학습 로드 모드의 하루치 로드맵. 자율 로드맵과 같은 층위다 */}
            <Stack.Screen name="study-path" />
            <Stack.Screen
              name="study-level"
              options={{ animation: "slide_from_bottom" }}
            />
            <Stack.Screen
              name="level-exam-result"
              options={{ animation: "fade", gestureEnabled: false }}
            />
            <Stack.Screen
              name="courses"
              options={{
                presentation: "modal",
                animation: "slide_from_bottom",
              }}
            />
            <Stack.Screen name="profile" />
            <Stack.Screen name="friend-profile" />
            <Stack.Screen name="friends" />
            <Stack.Screen name="user-courses" />
            <Stack.Screen name="settings" />
            <Stack.Screen
              name="lesson-complete"
              options={{
                animation: "fade",
                gestureEnabled: false, // 뒤로가기 막기
              }}
            />
            <Stack.Screen
              name="chest-reward"
              options={{
                animation: "fade",
                gestureEnabled: false,
              }}
            />
            <Stack.Screen
              name="hangul"
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="hangul-game"
              options={{ animation: "fade", gestureEnabled: false }}
            />
            <Stack.Screen
              name="word-chain"
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="match-game"
              options={{ animation: "fade", gestureEnabled: false }}
            />
            <Stack.Screen
              name="memory-game"
              options={{ animation: "fade", gestureEnabled: false }}
            />
            <Stack.Screen
              name="hangul-drawing"
              options={{ animation: "fade", gestureEnabled: false }}
            />
            <Stack.Screen
              name="speed-round"
              options={{ animation: "fade", gestureEnabled: false }}
            />
            <Stack.Screen
              name="jamo-slot"
              options={{ animation: "fade", gestureEnabled: false }}
            />
            <Stack.Screen
              name="follow-link"
              options={{
                presentation: "transparentModal",
                animation: "fade",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="practice"
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="word-study"
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="reading-listening-levels"
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="reading-listening"
              options={{ animation: "slide_from_right", gestureEnabled: false }}
            />
            <Stack.Screen
              name="jump-result"
              options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen
              name="score-up"
              options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen
              name="jump-start"
              options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen
              name="jump-intro"
              options={{
                headerShown: false,
                gestureEnabled: false,
                animation: "slide_from_right",
              }}
            />
            <Stack.Screen
              name="display"
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="language"
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="notifications"
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="sound"
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="account"
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="help"
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="update"
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="course-categories"
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="games"
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="coming-soon"
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="tutor"
              options={{
                animation: "slide_from_bottom",
                // 대화 중에 스와이프로 실수로 나가면 연결이 끊긴다.
                // 종료 버튼으로만 나가게 한다.
                gestureEnabled: false,
              }}
            />
            <Stack.Screen
              name="expressions"
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="expression-pack"
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="expression-node"
              options={{ animation: "slide_from_right", gestureEnabled: false }}
            />
            <Stack.Screen
              name="grammar-study"
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="grammar-list"
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="topik"
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="topik-sections"
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="topik-exam"
              options={{ animation: "fade", gestureEnabled: false }}
            />
            <Stack.Screen
              name="topik-writing"
              options={{ animation: "fade", gestureEnabled: false }}
            />
            <Stack.Screen
              name="topik-result"
              options={{ animation: "fade", gestureEnabled: false }}
            />
            <Stack.Screen
              name="topik-stats"
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="pronunciation-practice"
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="pronunciation-quiz"
              options={{ animation: "fade", gestureEnabled: false }}
            />
            <Stack.Screen
              name="league-result"
              options={{ animation: "fade", gestureEnabled: false }}
            />
            <Stack.Screen
              name="score"
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="avatar-editor"
              options={{
                animation: "slide_from_bottom",
                gestureEnabled: false,
              }}
            />
            <Stack.Screen
              name="word-rain"
              options={{ animation: "fade", gestureEnabled: false }}
            />
            <Stack.Screen
              name="swipe-judge"
              options={{ animation: "fade", gestureEnabled: false }}
            />
            <Stack.Screen
              name="particle-rush"
              options={{ animation: "fade", gestureEnabled: false }}
            />
            <Stack.Screen
              name="echo-chain"
              options={{ animation: "fade", gestureEnabled: false }}
            />
          </Stack>

          {/* 전역 에러 처리 모달*/}
          <ErrorModal />
          {/* 전역 에너지 부족 모달 — 어느 화면에서든 뜸 */}
          <EnergyModal
            visible={energyModalVisible}
            gems={gems}
            onClose={closeEnergyModal}
            onDismissToHome={() => {
              closeEnergyModal();
              router.replace("/roadmap");
            }}
            onTrySuper={() => {
              closeEnergyModal();
              router.push("/premium");
            }}
            onRefill={() => {
              closeEnergyModal();
              // TODO: 보석으로 충전 (백엔드 연동)
            }}
            onWatchAd={() => {
              closeEnergyModal();
              // TODO: 광고 보고 +5 (광고 SDK)
            }}
          />
        </ThemeProvider>
      </SoundProvider>
    </GestureHandlerRootView>
  );
}
