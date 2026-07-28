import { use, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useAuthStore } from "../store/auth.store";
import KorioLogo from "../components/home/KorioLogo";

export default function SplashScreen() {
  const { isLoggedIn, user } = useAuthStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoggedIn) {
        router.replace("/welcome"); // 비로그인 → 웰컴
      } else if (user?.isOnboardingCompleted) {
        router.replace("/(tabs)"); // 온보딩 완료 → 메인
      } else {
        router.replace("/onboarding/survey"); // 온보딩 미완 → 서베이
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isLoggedIn, user?.isOnboardingCompleted]);

  return (
    <View style={styles.container}>
      <KorioLogo dark={false} iconSize={80} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7F77DD",
    alignItems: "center",
    justifyContent: "center",
  },
});
