import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ThemeColors } from "@/constants/theme";

/** 로드맵 배경(그라데이션 + 장식). 상태를 갖지 않아 Day 뷰에서도 그대로 쓴다. */
export default function RoadmapBackdrop({ theme }: { theme: ThemeColors }) {
  const isDark = theme.bg === "#15151D";

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <LinearGradient
        colors={
          isDark
            ? ["#171522", "#211F36", "#15151D"]
            : ["#F8F6FF", "#F2FAFF", "#FFF9EE"]
        }
        locations={[0, 0.55, 1]}
        style={StyleSheet.absoluteFill}
      />

      <View
        style={[
          backdropStyles.orbTop,
          { backgroundColor: isDark ? "#776EE2" : "#BEB7FF" },
        ]}
      />

      <View
        style={[
          backdropStyles.orbSide,
          { backgroundColor: isDark ? "#45B7D1" : "#BFEFFF" },
        ]}
      />

      <View style={[backdropStyles.cloud, backdropStyles.cloudLeft]}>
        <View
          style={[
            backdropStyles.cloudBase,
            { backgroundColor: isDark ? "#3B3850" : "#FFFFFF" },
          ]}
        />
        <View
          style={[
            backdropStyles.cloudPuffSmall,
            { backgroundColor: isDark ? "#3B3850" : "#FFFFFF" },
          ]}
        />
        <View
          style={[
            backdropStyles.cloudPuffLarge,
            { backgroundColor: isDark ? "#3B3850" : "#FFFFFF" },
          ]}
        />
      </View>

      <View
        style={[
          backdropStyles.hillLeft,
          { backgroundColor: isDark ? "#393456" : "#DCD7FF" },
        ]}
      />

      <View
        style={[
          backdropStyles.hillRight,
          { backgroundColor: isDark ? "#2D2945" : "#CFEFFF" },
        ]}
      />

      <View style={[backdropStyles.sparkle, backdropStyles.sparkleOne]} />
      <View style={[backdropStyles.sparkle, backdropStyles.sparkleTwo]} />
      <View style={[backdropStyles.sparkle, backdropStyles.sparkleThree]} />
    </View>
  );
}

const backdropStyles = StyleSheet.create({
  orbTop: {
    position: "absolute",
    top: 122,
    right: -52,
    width: 176,
    height: 176,
    borderRadius: 999,
    opacity: 0.14,
  },
  orbSide: {
    position: "absolute",
    top: "52%",
    left: -82,
    width: 210,
    height: 210,
    borderRadius: 999,
    opacity: 0.12,
  },
  cloud: {
    position: "absolute",
    width: 86,
    height: 42,
    opacity: 0.58,
  },
  cloudLeft: {
    top: 206,
    left: 14,
  },
  cloudBase: {
    position: "absolute",
    left: 4,
    bottom: 2,
    width: 76,
    height: 24,
    borderRadius: 999,
  },
  cloudPuffSmall: {
    position: "absolute",
    left: 16,
    bottom: 13,
    width: 28,
    height: 28,
    borderRadius: 999,
  },
  cloudPuffLarge: {
    position: "absolute",
    right: 13,
    bottom: 10,
    width: 36,
    height: 36,
    borderRadius: 999,
  },
  hillLeft: {
    position: "absolute",
    left: -118,
    bottom: -126,
    width: 330,
    height: 235,
    borderRadius: 999,
    opacity: 0.22,
    transform: [{ rotate: "-8deg" }],
  },
  hillRight: {
    position: "absolute",
    right: -154,
    bottom: -96,
    width: 350,
    height: 205,
    borderRadius: 999,
    opacity: 0.17,
    transform: [{ rotate: "9deg" }],
  },
  sparkle: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: "#8C82E8",
    opacity: 0.42,
    transform: [{ rotate: "45deg" }],
  },
  sparkleOne: {
    top: 324,
    left: 32,
  },
  sparkleTwo: {
    top: "39%",
    right: 34,
    width: 7,
    height: 7,
  },
  sparkleThree: {
    top: "68%",
    left: 68,
    width: 6,
    height: 6,
  },
});
