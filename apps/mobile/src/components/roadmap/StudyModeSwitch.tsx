import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import type { ThemeColors } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { useSettingsStore, type StudyMode } from "@/store/settings.store";
import { commitStudyMode } from "@/utils/learn-mode";

const OPTIONS: {
  mode: StudyMode;
  labelKey: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  { mode: "guided", labelKey: "studyMode.guided", icon: "footsteps" },
  { mode: "free", labelKey: "studyMode.free", icon: "compass" },
];

/**
 * 학습 로드(순서대로) ↔ 자율(마음대로) 전환.
 *
 * 두 로드맵 화면이 같은 자리에서 이걸 쓴다. 모드는 계정 데이터라 로컬 스토어를
 * 먼저 바꾸고(화면이 기다리지 않게) 서버에는 뒤따라 보낸다.
 */
export default function StudyModeSwitch() {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);
  const router = useRouter();
  const studyMode = useSettingsStore((s) => s.studyMode);
  const index = studyMode === "guided" ? 0 : 1;
  const slide = useSharedValue(index);

  useEffect(() => {
    slide.value = withTiming(index, {
      duration: 240,
      easing: Easing.out(Easing.cubic),
    });
  }, [index, slide]);

  const thumbStyle = useAnimatedStyle(() => ({
    left: `${slide.value * 50}%`,
  }));

  const select = (mode: StudyMode) => {
    if (mode === studyMode) return;
    commitStudyMode(mode);
    router.replace(mode === "guided" ? "/study-path" : "/roadmap");
  };

  return (
    <View style={styles.track}>
      <Animated.View style={[styles.thumb, thumbStyle]}>
        <View style={styles.thumbShine} pointerEvents="none" />
      </Animated.View>

      {OPTIONS.map((option) => {
        const active = option.mode === studyMode;
        return (
          <Pressable
            key={option.mode}
            style={styles.option}
            onPress={() => select(option.mode)}
            hitSlop={4}
          >
            <Ionicons
              name={option.icon}
              size={15}
              color={active ? "#FFFFFF" : theme.textSecondary}
            />
            <Text
              style={[styles.label, active && styles.labelActive]}
              numberOfLines={1}
            >
              {t(option.labelKey)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    track: {
      flexDirection: "row",
      marginHorizontal: 14,
      marginBottom: 10,
      height: 40,
      borderRadius: 14,
      padding: 3,
      backgroundColor: theme.surface,
      borderWidth: 1.5,
      borderColor: theme.border,
      position: "relative",
      overflow: "hidden",
    },
    thumb: {
      position: "absolute",
      top: 3,
      bottom: 3,
      width: "50%",
      marginLeft: 3,
      marginRight: 3,
      borderRadius: 11,
      backgroundColor: theme.primary,
    },
    thumbShine: {
      position: "absolute",
      top: 2.5,
      left: 10,
      right: 10,
      height: 2,
      borderRadius: 999,
      backgroundColor: "rgba(255,255,255,0.45)",
    },
    option: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
    },
    label: {
      fontSize: 13,
      fontWeight: "800",
      color: theme.textSecondary,
    },
    labelActive: { color: "#FFFFFF" },
  });
