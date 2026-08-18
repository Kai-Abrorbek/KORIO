import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown, ZoomIn } from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import TopikSuccessConfetti from "@/components/topik/TopikSuccessConfetti";

export default function JumpResultScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  const s = styles(theme);
  const { passed, unit, wrong } = useLocalSearchParams<{
    passed?: string;
    unit?: string;
    wrong?: string;
  }>();
  const isPass = passed === "1";

  return (
    <View style={s.container}>
      <View style={s.center}>
        {isPass ? (
          <View pointerEvents="none" style={s.successArtwork}>
            <TopikSuccessConfetti
              playOnce
              dom={{
                scrollEnabled: false,
                showsHorizontalScrollIndicator: false,
                showsVerticalScrollIndicator: false,
                style: s.successArtworkFill,
              }}
            />
          </View>
        ) : (
          <Animated.View
            entering={ZoomIn.duration(400)}
            style={[s.iconCircle, { backgroundColor: "#FF4B4B" }]}
          >
            <Ionicons name="close" size={64} color="#fff" />
          </Animated.View>
        )}

        <Animated.Text entering={FadeInDown.delay(200)} style={s.title}>
          {isPass ? t("jump.passTitle", { unit }) : t("jump.failTitle")}
        </Animated.Text>

        <Animated.Text entering={FadeInDown.delay(320)} style={s.sub}>
          {isPass ? t("jump.passSub") : t("jump.failSub")}
        </Animated.Text>
      </View>

      <View style={s.bottom}>
        <Animated.View
          entering={FadeInDown.delay(440)}
          style={{ width: "100%" }}
        >
          <View
            style={[s.btn, { backgroundColor: isPass ? "#58CC02" : "#1CB0F6" }]}
            onTouchEnd={() => router.replace("/roadmap")}
          >
            <Text style={s.btnText}>{t("jump.continue")}</Text>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
      paddingHorizontal: 20,
      marginBottom: 25,
    },
    center: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 20,
    },
    iconCircle: {
      width: 130,
      height: 130,
      borderRadius: 65,
      alignItems: "center",
      justifyContent: "center",
    },
    successArtwork: {
      width: 280,
      height: 280,
      marginVertical: -55,
      overflow: "hidden",
    },
    successArtworkFill: {
      width: "100%",
      height: "100%",
    },
    title: {
      fontSize: 26,
      fontWeight: "900",
      color: theme.text,
      textAlign: "center",
      paddingHorizontal: 20,
    },
    sub: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.textSecondary,
      textAlign: "center",
      paddingHorizontal: 30,
      lineHeight: 24,
    },
    bottom: { paddingBottom: 34 },
    btn: {
      borderRadius: 16,
      paddingVertical: 17,
      alignItems: "center",
      width: "100%",
    },
    btnText: { color: "#fff", fontSize: 17, fontWeight: "900" },
  });
