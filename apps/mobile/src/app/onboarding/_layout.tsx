import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="survey" />
      <Stack.Screen name="level-test" />
      <Stack.Screen name="result" />
    </Stack>
  );
}
