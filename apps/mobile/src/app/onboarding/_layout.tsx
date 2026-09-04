import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="survey" />
      <Stack.Screen name="level-test" />
      <Stack.Screen name="result" />
      {/* 가입 전 요금제 — 무료체험 시작하기를 눌러야 로그인으로 간다 */}
      <Stack.Screen name="plan" />
    </Stack>
  );
}
