import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import Animated, { Easing, FadeInUp } from "react-native-reanimated";
import { useAuthStore } from "../store/auth.store";
import KorioLogo from "../components/home/KorioLogo";
import HaneulmonMascot from "../components/home/HaneulmonMascot";

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
      <Animated.View
        entering={FadeInUp.duration(560).easing(Easing.out(Easing.cubic))}
        style={styles.mascot}
      >
        <HaneulmonMascot mood="confident" size={270} />
      </Animated.View>

      <KorioLogo dark={false} iconSize={86} textSize={74} animated />
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
  mascot: {
    position: "absolute",
    bottom: "50%",
    marginBottom: 34,
  },
});
