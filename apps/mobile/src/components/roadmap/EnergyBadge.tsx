import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PINK = "#FF4B82";

interface Props {
  energy: number;
  size?: number;
}

export default function EnergyBadge({ energy, size = 15 }: Props) {
  const w = size * 1.16;
  return (
    <View style={styles.wrap}>
      <View
        style={[styles.body, { width: w, height: 18, borderRadius: 18 * 0.28 }]}
      >
        {/* 왼쪽 절반 진한 분홍 */}
        <View
          style={[styles.fill, { width: "100%", borderRadius: 18 * 0.22 }]}
        />
        <MaterialCommunityIcons
          name="lightning-bolt"
          size={size * 0.5}
          color="#fff"
        />
      </View>
      <View style={[styles.nub, { height: size * 0.36 }]} />
      <Text style={[styles.value, { fontSize: size * 0.62 }]}>{energy}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: "row", alignItems: "center" },
  body: {
    backgroundColor: "#FFD4E2",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  fill: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: PINK,
  },
  nub: {
    width: 3,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    marginLeft: 2,
    backgroundColor: PINK,
  },
  value: { fontWeight: "900", color: PINK, marginLeft: 8 },
});
