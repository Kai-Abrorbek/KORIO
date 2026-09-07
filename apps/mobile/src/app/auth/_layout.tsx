import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="verify-code" />
      {/* 뒤로 밀어서 나가면 토큰만 날아가고 화면은 남는다 — 제스처를 막는다 */}
      <Stack.Screen name="reset-password" options={{ gestureEnabled: false }} />
      <Stack.Screen
        name="social-callback"
        options={{ gestureEnabled: false }}
      />
    </Stack>
  );
}
