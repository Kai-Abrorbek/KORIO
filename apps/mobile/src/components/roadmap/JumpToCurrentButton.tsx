import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { ThemeColors } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

const SIZE = 52;

interface Props {
  /** 지금 할 곳이 위에 있으면 "up", 아래면 "down" */
  direction: "up" | "down";
  color: string;
  /** 하단 여백. 탭바가 있는 화면과 없는 화면이 다르다 */
  bottom?: number;
  onPress: () => void;
}

/**
 * 지금 할 곳으로 되돌아가는 버튼.
 * 로드맵은 위아래로 길어서 둘러보다 보면 오늘 위치를 잃는다.
 */
export default function JumpToCurrentButton({
  direction,
  color,
  bottom = 110,
  onPress,
}: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <TouchableOpacity
      style={[styles.wrap, { bottom }]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={[styles.glow, { backgroundColor: color }]} />
      <View style={styles.depth} />
      <View style={[styles.face, { borderColor: color }]}>
        <Ionicons
          name={direction === "up" ? "arrow-up" : "arrow-down"}
          size={24}
          color={color}
        />
      </View>
    </TouchableOpacity>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    wrap: {
      position: "absolute",
      right: 18,
      width: SIZE + 8,
      height: SIZE + 11,
      alignItems: "center",
      justifyContent: "center",
    },
    glow: {
      position: "absolute",
      top: -3,
      width: SIZE + 14,
      height: SIZE + 14,
      borderRadius: 999,
      opacity: 0.16,
    },
    depth: {
      position: "absolute",
      top: 7,
      width: SIZE,
      height: SIZE,
      borderRadius: 999,
      backgroundColor: theme.border,
    },
    face: {
      position: "absolute",
      top: 0,
      width: SIZE,
      height: SIZE,
      borderRadius: 999,
      backgroundColor: theme.surface,
      borderWidth: 2.5,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.14,
      shadowRadius: 12,
      elevation: 8,
    },
  });
