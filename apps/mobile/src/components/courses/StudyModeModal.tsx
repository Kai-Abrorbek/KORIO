import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import type { ThemeColors } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import type { StudyMode } from "@/store/settings.store";
import { darken } from "@/utils/color";

interface Props {
  visible: boolean;
  /** 어떤 코스를 고르는 중인지. 제목에 보여준다 */
  courseLabel: string;
  onClose: () => void;
  onSelect: (mode: StudyMode) => void;
}

const OPTIONS: {
  mode: StudyMode;
  icon: keyof typeof Ionicons.glyphMap;
  colors: [string, string];
}[] = [
  { mode: "guided", icon: "footsteps", colors: ["#8b7ff0", "#6a5de0"] },
  { mode: "free", icon: "compass", colors: ["#3fb9d6", "#2e93b8"] },
];

/**
 * 코스를 고른 직후 "어떻게 배울지"를 정한다.
 *
 * 학습 방식은 화면 구석의 토글이 아니라 시작하는 순간의 선택이어야 한다 —
 * 뭘 해야 할지 모르는 사람이 정확히 여기서 갈린다.
 */
export default function StudyModeModal({
  visible,
  courseLabel,
  onClose,
  onSelect,
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Animated.View entering={FadeIn.duration(180)} style={styles.fill} />
      </Pressable>

      <View style={styles.center} pointerEvents="box-none">
        <Animated.View
          entering={FadeInDown.duration(260).springify().damping(16)}
          style={styles.sheet}
        >
          <View style={styles.grip} />

          <Text style={styles.title}>{t("studyModeModal.title")}</Text>
          <Text style={styles.subtitle}>
            {t("studyModeModal.subtitle", { course: courseLabel })}
          </Text>

          <View style={styles.options}>
            {OPTIONS.map((option, index) => (
              <Animated.View
                key={option.mode}
                entering={FadeInDown.delay(80 + index * 70).duration(300)}
              >
                <Pressable
                  onPress={() => onSelect(option.mode)}
                  style={({ pressed }) => [
                    styles.optionWrap,
                    pressed && styles.optionPressed,
                  ]}
                >
                  <View
                    style={[
                      styles.optionDepth,
                      { backgroundColor: darken(option.colors[1], 35) },
                    ]}
                  />
                  <LinearGradient
                    colors={option.colors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.option}
                  >
                    <View style={styles.optionShine} pointerEvents="none" />
                    <View style={styles.optionOrb} pointerEvents="none" />

                    <View style={styles.optionIcon}>
                      <Ionicons name={option.icon} size={24} color="#fff" />
                    </View>
                    <View style={styles.optionTexts}>
                      <Text style={styles.optionTitle}>
                        {t(`studyModeModal.${option.mode}.title`)}
                      </Text>
                      <Text style={styles.optionDesc}>
                        {t(`studyModeModal.${option.mode}.desc`)}
                      </Text>
                    </View>
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color="rgba(255,255,255,0.85)"
                    />
                  </LinearGradient>
                </Pressable>
              </Animated.View>
            ))}
          </View>

          <Text style={styles.hint}>{t("studyModeModal.hint")}</Text>
        </Animated.View>
      </View>
    </Modal>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    backdrop: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    fill: { flex: 1, backgroundColor: "rgba(12,12,24,0.55)" },
    center: {
      flex: 1,
      justifyContent: "flex-end",
    },
    sheet: {
      backgroundColor: theme.surface,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 34,
      gap: 6,
    },
    grip: {
      alignSelf: "center",
      width: 44,
      height: 5,
      borderRadius: 99,
      backgroundColor: theme.border,
      marginBottom: 14,
    },
    title: {
      fontSize: 22,
      fontWeight: "900",
      color: theme.text,
      letterSpacing: -0.3,
    },
    subtitle: {
      fontSize: 13.5,
      fontWeight: "600",
      color: theme.textSecondary,
      lineHeight: 19,
    },
    options: { marginTop: 16, gap: 12 },
    optionWrap: { position: "relative" },
    optionPressed: { transform: [{ translateY: 2 }] },
    optionDepth: {
      position: "absolute",
      top: 5,
      left: 0,
      right: 0,
      bottom: -3,
      borderRadius: 20,
    },
    option: {
      flexDirection: "row",
      alignItems: "center",
      gap: 13,
      borderRadius: 20,
      paddingVertical: 16,
      paddingHorizontal: 16,
      overflow: "hidden",
      borderWidth: 1.5,
      borderColor: "rgba(255,255,255,0.26)",
    },
    optionShine: {
      position: "absolute",
      top: 0,
      left: 16,
      right: 16,
      height: 2,
      borderRadius: 999,
      backgroundColor: "rgba(255,255,255,0.5)",
    },
    optionOrb: {
      position: "absolute",
      width: 96,
      height: 96,
      borderRadius: 999,
      right: -30,
      top: -44,
      backgroundColor: "rgba(255,255,255,0.12)",
    },
    optionIcon: {
      width: 46,
      height: 46,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(255,255,255,0.18)",
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.24)",
    },
    optionTexts: { flex: 1, gap: 3 },
    optionTitle: { fontSize: 17, fontWeight: "900", color: "#fff" },
    optionDesc: {
      fontSize: 12.5,
      fontWeight: "600",
      color: "rgba(255,255,255,0.86)",
      lineHeight: 17,
    },
    hint: {
      marginTop: 14,
      fontSize: 12,
      fontWeight: "600",
      color: theme.textSecondary,
      textAlign: "center",
    },
  });
