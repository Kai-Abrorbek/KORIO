import { View, Text, StyleSheet } from "react-native";
import Svg, { Rect, Circle } from "react-native-svg";

interface KorioLogoProps {
  dark?: boolean;
  iconSize?: number;
}

export default function KorioLogo({
  dark = false,
  iconSize = 80,
}: KorioLogoProps) {
  const textColor = dark ? "#1A1A2E" : "#FFFFFF";

  return (
    <View style={styles.container}>
      <Svg width={iconSize} height={iconSize} viewBox="0 0 64 64" fill="none">
        <Rect x="2" y="2" width="60" height="60" rx="18" fill="#7F77DD" />
        <Rect x="20" y="14" width="24" height="4.5" rx="2.25" fill="#FFFFFF" />
        <Rect
          x="29.75"
          y="18"
          width="4.5"
          height="8"
          rx="2.25"
          fill="#FFFFFF"
        />
        <Circle cx="32" cy="40" r="12" stroke="#FFFFFF" strokeWidth="4.5" />
        <Circle cx="38" cy="36" r="2" fill="#FAC775" />
      </Svg>
      <Text style={[styles.text, { color: textColor }]}>Korio</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    fontSize: 59,
    fontWeight: "800",
    letterSpacing: -1,
  },
});
