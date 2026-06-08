import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  useSharedValue,
  FadeInDown,
  FadeOutUp,
} from "react-native-reanimated";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { ThemeColors } from "@/constants/theme";

interface Props {
  current: number;
  total: number;
  hearts: number;
  combo: number;
  onClose: () => void;
  theme: ThemeColors;
}

export default function LessonHeader({
  current,
  total,
  hearts,
  combo,
  onClose,
  theme,
}: Props) {
  const progress = current / total;
  const progressWidth = useSharedValue(0);
  const comboScale = useSharedValue(1);
  const prevCombo = useRef(0);
  const s = styles(theme);

  const marker1 = Math.round(total * 0.5);
  const marker2 = total - 1;

  useEffect(() => {
    progressWidth.value = withTiming(progress, { duration: 500 });
  }, [progress]);

  // 콤보 바뀔 때 애니메이션
  useEffect(() => {
    if (combo > prevCombo.current && combo >= 2) {
      comboScale.value = withSequence(
        withSpring(1.5, { damping: 4, stiffness: 400 }),
        withSpring(0.9, { damping: 6 }),
        withSpring(1.2, { damping: 6 }),
        withSpring(1, { damping: 8 }),
      );
    }
    prevCombo.current = combo;
  }, [combo]);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value * 100}%` as any,
  }));

  const comboStyle = useAnimatedStyle(() => ({
    transform: [{ scale: comboScale.value }],
  }));

  // 콤보별 색상
  const getComboColor = () => {
    if (combo >= 10) return "#FFD700";
    if (combo >= 7) return "#776ee2";
    if (combo >= 5) return "#FF4B4B";
    return "#FF9500";
  };

  return (
    <View style={s.wrapper}>
      {/* 콤보 텍스트 - 헤더 위에 독립적으로 */}
      {combo >= 2 && (
        <Animated.View
          entering={FadeInDown.springify().damping(12)}
          style={s.comboWrap}
        >
          <Animated.Text
            style={[s.comboText, { color: getComboColor() }, comboStyle]}
          >
            🔥 콤보 x{combo}
          </Animated.Text>
        </Animated.View>
      )}

      {/* 헤더 행 */}
      <View style={s.container}>
        <TouchableOpacity
          onPress={onClose}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="close" size={28} color="#AFAFAF" />
        </TouchableOpacity>

        {/* 프로그레스바 */}
        <View style={s.progressWrap}>
          <View style={s.track}>
            <Animated.View style={[s.fill, progressStyle]} />
            <View
              style={[
                s.markerWrap,
                { left: `${(marker1 / total) * 100}%` as any },
              ]}
            >
              <Text style={s.markerText}>{marker1}</Text>
            </View>
            <View
              style={[
                s.markerWrap,
                { left: `${(marker2 / total) * 100}%` as any },
              ]}
            >
              <Text style={s.markerText}>{marker2}</Text>
            </View>
          </View>
        </View>

        {/* 오른쪽 배지 */}
        <View style={s.right}>
          <View style={s.lightningBadge}>
            <MaterialCommunityIcons
              name="lightning-bolt"
              size={18}
              color="#fff"
            />
            <View style={s.lightningDot} />
          </View>
          <View style={s.infinityBadge}>
            <MaterialCommunityIcons name="infinity" size={20} color="#fff" />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    wrapper: {
      backgroundColor: theme.bg,
      paddingTop: 52,
    },
    comboWrap: {
      alignItems: "center",
      paddingBottom: 4,
    },
    comboText: {
      fontSize: 14,
      fontWeight: "800",
    },
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingBottom: 12,
      gap: 12,
    },
    progressWrap: { flex: 1 },
    track: {
      height: 20,
      backgroundColor: "#E5E5EA",
      borderRadius: 99,
      overflow: "visible",
      position: "relative",
      justifyContent: "center",
    },
    fill: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      backgroundColor: "#FFD000",
      borderRadius: 99,
    },
    markerWrap: {
      position: "absolute",
      alignItems: "center",
      transform: [{ translateX: -8 }],
    },
    markerText: {
      fontSize: 12,
      fontWeight: "700",
      color: "#AFAFAF",
    },
    right: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    lightningBadge: {
      width: 36,
      height: 28,
      borderRadius: 8,
      backgroundColor: "#7B5CF0",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      shadowColor: "#5B8DEF",
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 3,
    },
    lightningDot: {
      position: "absolute",
      top: 3,
      right: 3,
      width: 7,
      height: 7,
      borderRadius: 99,
      backgroundColor: "#B388FF",
    },
    infinityBadge: {
      width: 44,
      height: 28,
      borderRadius: 8,
      backgroundColor: "#1A9BE6",
      alignItems: "center",
      justifyContent: "center",
    },
  });
