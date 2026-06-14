import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Achievement } from "@/types/friend-profile";
import { darken } from "@/utils/color";

interface Props {
  achievement: Achievement;
}

export default function AchievementBadge({ achievement }: Props) {
  return (
    <View style={styles.wrap}>
      <View
        style={[styles.iconCircle, { backgroundColor: achievement.bgColor }]}
      >
        <Ionicons name={achievement.iconName} size={36} color="#fff" />
      </View>
      <View
        style={[
          styles.numberBanner,
          { backgroundColor: darken(achievement.bgColor, 25) },
        ]}
      >
        <Text style={styles.numberText}>{achievement.value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 90,
    alignItems: "center",
    paddingTop: 4,
  },
  iconCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 5,
    elevation: 4,
  },
  numberBanner: {
    marginTop: -12,
    paddingHorizontal: 14,
    paddingVertical: 3,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 3,
  },
  numberText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "900",
  },
});
