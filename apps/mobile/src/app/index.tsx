import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import Animated, { Easing, FadeInUp } from "react-native-reanimated";
import { useAuthStore } from "../store/auth.store";
import {
  useOnboardingStore,
  useOnboardingHydrated,
} from "../store/onboarding.store";
import { useAuthHydrated } from "@/hooks/useAuthGuard";
import KorioLogo from "../components/home/KorioLogo";
import HaneulmonMascot from "../components/home/HaneulmonMascot";

export default function SplashScreen() {
  const { isLoggedIn, user } = useAuthStore();
  // 저장된 로그인 정보 복원을 기다린다. 2초 타이머가 대개 덮어주지만
  // 보장은 아니라서, 느린 기기에서는 로그인한 사람이 웰컴으로 떨어졌다.
  const hydrated = useAuthHydrated();
  // 가입 전 설문·진단도 복원을 기다려야 한다. 복원 전에는 guestOnboardingDone
  // 이 무조건 false 라, 진단까지 끝낸 사람을 웰컴으로 되돌려 처음부터 시킨다.
  const onboardingHydrated = useOnboardingHydrated();
  const guestOnboardingDone = useOnboardingStore(
    (state) => state.guestOnboardingDone,
  );

  useEffect(() => {
    if (!hydrated || !onboardingHydrated) return;
    const timer = setTimeout(() => {
      if (isLoggedIn) {
        router.replace(
          user?.isOnboardingCompleted
            ? "/(tabs)" // 온보딩 완료 → 메인
            : "/onboarding/survey", // 온보딩 미완 → 서베이
        );
      } else if (guestOnboardingDone) {
        // 설문 + 진단을 다 해놓고 로그인만 안 한 사람.
        // 다시 처음부터 시키지 않고 곧장 요금제로 보낸다.
        router.replace("/onboarding/plan");
      } else {
        router.replace("/welcome"); // 처음 온 사람 → 웰컴
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [
    hydrated,
    onboardingHydrated,
    isLoggedIn,
    guestOnboardingDone,
    user?.isOnboardingCompleted,
  ]);

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
