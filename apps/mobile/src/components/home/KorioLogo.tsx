import { View, Text, StyleSheet } from "react-native";
import Animated, { Easing, FadeInDown } from "react-native-reanimated";
import Svg, { Rect, Circle } from "react-native-svg";

interface KorioLogoProps {
  dark?: boolean;
  iconSize?: number;
  textSize?: number;
  animated?: boolean;
}

const BRAND_NAME = "Korio";

export default function KorioLogo({
  dark = false,
  iconSize = 80,
  textSize = 59,
  animated = false,
}: KorioLogoProps) {
  const textColor = dark ? "#1A1A2E" : "#FFFFFF";
  const icon = (
    <Svg width={iconSize} height={iconSize} viewBox="0 0 64 64" fill="none">
      <Rect x="2" y="2" width="60" height="60" rx="18" fill="#7F77DD" />
      <Rect x="20" y="14" width="24" height="4.5" rx="2.25" fill="#FFFFFF" />
      <Rect x="29.75" y="18" width="4.5" height="8" rx="2.25" fill="#FFFFFF" />
      <Circle cx="32" cy="40" r="12" stroke="#FFFFFF" strokeWidth="4.5" />
      <Circle cx="38" cy="36" r="2" fill="#FAC775" />
    </Svg>
  );

  return (
    <View
      style={styles.container}
      accessible
      accessibilityRole="image"
      accessibilityLabel={BRAND_NAME}
    >
      {animated ? (
        <Animated.View
          entering={FadeInDown.delay(260)
            .duration(420)
            .easing(Easing.out(Easing.cubic))}
        >
          {icon}
        </Animated.View>
      ) : (
        icon
      )}

      {animated ? (
        <View style={styles.animatedText} accessibilityElementsHidden>
          {BRAND_NAME.split("").map((letter, index) => (
            <Animated.Text
              key={`${letter}-${index}`}
              entering={FadeInDown.delay(480 + index * 75)
                .duration(320)
                .easing(Easing.out(Easing.cubic))}
              style={[
                styles.text,
                styles.animatedLetter,
                { color: textColor, fontSize: textSize },
              ]}
            >
              {letter}
            </Animated.Text>
          ))}
        </View>
      ) : (
        <Text style={[styles.text, { color: textColor, fontSize: textSize }]}>
          Korio
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
  },
  animatedText: {
    alignItems: "center",
    flexDirection: "row",
  },
  animatedLetter: {
    marginRight: -1,
  },
  text: {
    fontWeight: "800",
    letterSpacing: -1,
  },
});
