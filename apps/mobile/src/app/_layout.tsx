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

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const energyModalVisible = useEnergyStore((s) => s.modalVisible);
  const closeEnergyModal = useEnergyStore((s) => s.closeEnergyModal);
  const gems = useAuthStore((s) => s.user?.gems ?? 0);
  const router = useRouter();

  return (
    <SoundProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="welcome" />
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="auth" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="roadmap" />
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
            name="hangul-drawing"
            options={{ animation: "fade", gestureEnabled: false }}
          />
          <Stack.Screen
            name="speed-round"
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
        </Stack>

        {/* 전역 에너지 부족 모달 — 어느 화면에서든 뜸 */}
        <EnergyModal
          visible={energyModalVisible}
          gems={gems}
          onClose={closeEnergyModal}
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
  );
}
