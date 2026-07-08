import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export const ENERGY_COLORS = {
  pink: "#fb6ca3",
  pinkSoft: "#FFD4E2",
  gem: "#5CD0F0",
  gemText: "#3BB6E5",
  blue: "#1CB0F6",
  blueDark: "#1899D6",
  magenta: "#E5379B",
  superA: "#A35BF0",
  superB: "#2FB8E6",
  superC: "#FF5BA0",
  bodyGray: "#E9E9EF",
  numGray: "#9A9AA5",
};

interface BatteryProps {
  value: number | string;
  fill?: "pink" | "gray";
  fillFraction?: number; // pink 채움 비율 0~1
  size?: number; // 높이
}

export function BatteryBadge({
  value,
  fill = "gray",
  fillFraction = 0.42,
  size = 54,
}: BatteryProps) {
  const w = size * 1.16;
  const isPink = fill === "pink";
  return (
    <View style={[bStyles.wrap, { width: w + 6, height: size }]}>
      <View
        style={[
          bStyles.body,
          { width: w, height: size, borderRadius: size * 0.28 },
        ]}
      >
        {isPink && (
          <View
            style={[
              bStyles.fill,
              {
                width: `${fillFraction * 100}%`,
                borderRadius: size * 0.22,
                backgroundColor: ENERGY_COLORS.pink,
              },
            ]}
          />
        )}
        <Text style={[bStyles.value, { fontSize: size * 0.42 }]}>{value}</Text>
      </View>
      <View
        style={[
          bStyles.nub,
          {
            height: size * 0.36,
            backgroundColor: isPink ? ENERGY_COLORS.pink : "#CFCFD8",
          },
        ]}
      />
    </View>
  );
}

interface SuperProps {
  size?: number;
}

export function SuperInfinityBadge({ size = 54 }: SuperProps) {
  const w = size * 1.16;
  return (
    <View style={[bStyles.wrap, { width: w + 6, height: size }]}>
      <LinearGradient
        colors={[
          ENERGY_COLORS.superA,
          ENERGY_COLORS.superB,
          ENERGY_COLORS.superC,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          bStyles.body,
          { width: w, height: size, borderRadius: size * 0.28 },
        ]}
      >
        <MaterialCommunityIcons
          name="infinity"
          size={size * 0.5}
          color="#fff"
        />
      </LinearGradient>
      <View
        style={[
          bStyles.nub,
          { height: size * 0.36, backgroundColor: ENERGY_COLORS.superC },
        ]}
      />
    </View>
  );
}

const bStyles = StyleSheet.create({
  wrap: { flexDirection: "row", alignItems: "center" },
  body: {
    backgroundColor: ENERGY_COLORS.bodyGray,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  fill: { position: "absolute", left: 0, top: 0, bottom: 0 },
  value: { fontWeight: "800", color: ENERGY_COLORS.numGray },
  nub: {
    width: 5,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    marginLeft: 2,
  },
});
