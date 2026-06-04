import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useAuthStore } from "../store/auth.store";
import KorioLogo from "../components/KorioLogo";

export default function SplashScreen() {
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoggedIn) {
        router.replace("/(tabs)");
      } else {
        router.replace("/welcome");
      }
    }, 2000); // 2초 후 자동 이동

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
