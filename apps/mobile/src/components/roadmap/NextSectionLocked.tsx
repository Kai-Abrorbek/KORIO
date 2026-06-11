import { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";

interface Props {
  sectionNumber: number;
  description: string;
  onJump?: () => void;
}

const JUMP_BTN_COLOR = "#FF4B4B";

export default function NextSectionLocked({
  sectionNumber,
  description,
  onJump,
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

  // 버튼 살짝 위아래 bounce
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-6, { duration: 500, easing: Easing.out(Easing.quad) }),
        withTiming(0, { duration: 500, easing: Easing.in(Easing.quad) }),
      ),
      -1,
      false,
    );
  }, [translateY]);

  const btnStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSequence(
      withTiming(0.92, { duration: 80 }),
      withTiming(1.04, { duration: 100 }),
      withTiming(1, { duration: 80 }),
    );
    onJump?.();
  };

  return (
    <View style={styles.container}>
      {/* 구분선 */}
      <View style={styles.divider} />

      {/* 섹션 타이틀 디바이더 */}
      <View style={styles.titleRow}>
        <View style={styles.titleLine} />
        <Text style={styles.titleText}>{description}</Text>
        <View style={styles.titleLine} />
      </View>

      {/* 말풍선 */}
      <View style={styles.bubbleWrapper}>
        <View style={styles.bubble}>
          <Text style={styles.bubbleText}>{t("roadmap.jumpHere")}</Text>
        </View>
        {/* 말풍선 꼬리 */}
        <View style={styles.bubbleTail} />
      </View>

      {/* 빨간 ▶▶ 버튼 (두올링고 스타일) */}
      <Animated.View style={btnStyle}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handlePress}
          style={styles.jumpBtnOuter}
        >
          {/* 3D 하단 레이어 */}
          <View style={styles.jumpBtnDepth} />
          {/* 상단 face */}
          <View style={styles.jumpBtnFace}>
            <Ionicons name="play-forward" size={32} color="#fff" />
          </View>
        </TouchableOpacity>
      </Animated.View>

      <Text style={styles.sectionLabel}>섹션 {sectionNumber}</Text>
    </View>
  );
}

const BTN_SIZE = 72;

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      paddingHorizontal: 24,
      paddingTop: 8,
      paddingBottom: 40,
      gap: 0,
    },
    divider: {
      width: "90%",
      height: 1.5,
      backgroundColor: theme.border,
      marginBottom: 24,
    },
    titleRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginBottom: 28,
      paddingHorizontal: 8,
    },
    titleLine: {
      flex: 1,
      height: 1,
      backgroundColor: theme.border,
    },
    titleText: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.textSecondary,
      textAlign: "center",
      flexShrink: 1,
    },
    bubbleWrapper: {
      alignItems: "center",
      marginBottom: 18,
    },
    bubble: {
      backgroundColor: "#fff",
      borderRadius: 14,
      paddingVertical: 10,
      paddingHorizontal: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 6,
      elevation: 4,
      borderWidth: 1.5,
      borderColor: theme.border,
    },
    bubbleText: {
      fontSize: 15,
      fontWeight: "800",
      color: JUMP_BTN_COLOR,
    },
    bubbleTail: {
      width: 0,
      height: 0,
      borderLeftWidth: 8,
      borderRightWidth: 8,
      borderTopWidth: 9,
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderTopColor: theme.border,
      marginTop: -1,
    },
    // 3D 버튼
    jumpBtnOuter: {
      width: BTN_SIZE,
      height: BTN_SIZE + 6,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 14,
    },
    jumpBtnDepth: {
      position: "absolute",
      width: BTN_SIZE,
      height: BTN_SIZE,
      borderRadius: BTN_SIZE / 2,
      backgroundColor: "#B91C1C",
      top: 6,
    },
    jumpBtnFace: {
      position: "absolute",
      top: 0,
      width: BTN_SIZE,
      height: BTN_SIZE,
      borderRadius: BTN_SIZE / 2,
      backgroundColor: JUMP_BTN_COLOR,
      alignItems: "center",
      justifyContent: "center",
    },
    sectionLabel: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.textSecondary,
      letterSpacing: 0.3,
    },
  });
