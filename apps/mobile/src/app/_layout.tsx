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

export default function RootLayout() {
  const colorScheme = useColorScheme();

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
        </Stack>
      </ThemeProvider>
    </SoundProvider>
  );
}
