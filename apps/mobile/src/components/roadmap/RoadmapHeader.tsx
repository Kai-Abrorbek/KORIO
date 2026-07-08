import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { UserRoadmapStats } from "@/types/roadmap";
import { BatteryBadge, ENERGY_COLORS } from "@/components/energy/BatteryBadge";
import EnergyBadge from "./EnergyBadge";

interface Props {
  stats: UserRoadmapStats;
  energy: number;
}

export default function RoadmapHeader({ stats, energy }: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      {/* 언어 */}
      <View style={styles.statBox}>
        <Text style={styles.flag}>{stats.language}</Text>
        <Text style={styles.statText}>{stats.languageLevel}</Text>
      </View>

      {/* 스트릭 */}
      <View style={styles.statBox}>
        <Ionicons name="flame" size={22} color="#FF7A00" />
        <Text style={styles.statText}>{stats.streak}</Text>
      </View>

      {/* 잼 */}
      <View style={styles.statBox}>
        <Ionicons name="diamond" size={20} color="#45B7D1" />
        <Text style={styles.statText}>{stats.gems}</Text>
      </View>

      {/* 에너지 또는 SUPER 뱃지 */}
      {!stats.isSuper ? (
        <View style={styles.superBadge}>
          <Text style={styles.superText}>SUPER</Text>
        </View>
      ) : (
        <TouchableOpacity style={styles.statBox}>
          <EnergyBadge energy={energy} size={26} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingTop: 54,
      paddingBottom: 14,
      backgroundColor: theme.bg,
    },
    statBox: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    statText: {
      fontSize: 16,
      fontWeight: "800",
      color: theme.text,
    },
    flag: {
      fontSize: 22,
    },
    superBadge: {
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
    superText: {
      fontSize: 14,
      fontWeight: "900",
      color: "#fff",
      letterSpacing: 1,
      transform: [{ skewX: "10deg" }],
    },
  });
