import { View, Text, StyleSheet, ViewStyle } from "react-native";

interface Props {
  style?: ViewStyle;
}

export default function SuperBadge({ style }: Props) {
  return (
    <View style={[styles.badge, style]}>
      <Text style={styles.text}>SUPER</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: "#A56EFF",
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 8,
    transform: [{ skewX: "-10deg" }],
    shadowColor: "#A56EFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  text: {
    fontSize: 14,
    fontWeight: "900",
    color: "#fff",
    letterSpacing: 1,
    transform: [{ skewX: "10deg" }],
  },
});
