import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useAuthStore } from "../store/auth.store";
import KorioLogo from "../components/home/KorioLogo";

export default function SplashScreen() {
  const { isLoggedIn, user } = useAuthStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoggedIn) {
        router.replace("/(tabs)"); // 온보딩 완료 → 메인
        // if (user?.isOnboardingCompleted) {
        //   router.replace("/(tabs)"); // 온보딩 완료 → 메인
        // } else {
        //   router.replace("/onboarding/survey"); // 첫 접속 → 온보딩
        // }
      } else {
        router.replace("/welcome"); // 비로그인 → 웰컴
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
