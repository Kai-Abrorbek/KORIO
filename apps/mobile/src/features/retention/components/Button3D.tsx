import type { ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import * as Haptics from "@/utils/haptics";

interface Props {
  label: string;
  onPress?: () => void;
  color?: string;
  /** 아래 두께(그림자) 색 */
  depthColor?: string;
  textColor?: string;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
  /** 작은 버튼 (카드 안) */
  compact?: boolean;
}

const DEPTH = 4;

/**
 * 입체 버튼 — 아래 두께가 있고 누르면 그만큼 내려앉는다 (듀오링고 톤).
 * 리텐션 화면들이 같이 쓴다.
 */
export default function Button3D({
  label,
  onPress,
  color = "#776ee2",
  depthColor = "#5a52c4",
  textColor = "#FFFFFF",
  disabled,
  loading,
  icon,
  style,
  compact,
}: Props) {
  const press = useSharedValue(0);
  const off = disabled || loading;

  const faceStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: press.value * DEPTH }],
  }));

  return (
    <Pressable
      disabled={off}
      onPressIn={() => {
        press.value = withTiming(1, { duration: 60 });
      }}
      onPressOut={() => {
        press.value = withSpring(0, { damping: 14, stiffness: 320 });
      }}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress?.();
      }}
      style={[styles.wrap, { paddingBottom: DEPTH }, style]}
    >
      <View
        style={[
          styles.depth,
          {
            backgroundColor: off ? "#B9B9C2" : depthColor,
            borderRadius: compact ? 12 : 16,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.face,
          compact ? styles.faceCompact : null,
          {
            backgroundColor: off ? "#D3D3DA" : color,
            borderRadius: compact ? 12 : 16,
          },
          faceStyle,
        ]}
      >
        {/* 윗면 광택 */}
        <View
          pointerEvents="none"
          style={[styles.shine, { borderRadius: compact ? 10 : 14 }]}
        />
        {loading ? (
          <ActivityIndicator color={textColor} />
        ) : (
          <View style={styles.row}>
            {icon}
            <Text
              style={[
                compact ? styles.labelCompact : styles.label,
                { color: textColor },
              ]}
              numberOfLines={1}
            >
              {label}
            </Text>
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { position: "relative" },
  depth: {
    position: "absolute",
    left: 0,
    right: 0,
    top: DEPTH,
    bottom: 0,
  },
  face: {
    minHeight: 54,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  faceCompact: { minHeight: 38, paddingHorizontal: 14 },
  shine: {
    position: "absolute",
    top: 3,
    left: 6,
    right: 6,
    height: "38%",
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  label: { fontSize: 16, fontWeight: "900", letterSpacing: 0.3 },
  labelCompact: { fontSize: 13.5, fontWeight: "900", letterSpacing: 0.2 },
});
