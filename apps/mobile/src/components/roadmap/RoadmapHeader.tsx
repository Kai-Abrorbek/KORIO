import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { UserRoadmapStats } from "@/types/roadmap";
import EnergyBadge from "./EnergyBadge";
import { useRouter } from "expo-router";
import { useState } from "react";
import CourseDropdown from "./CourseDropdown";

interface Props {
  stats: UserRoadmapStats;
  energy: number;
}

export default function RoadmapHeader({ stats, energy }: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const router = useRouter();
  const [courseOpen, setCourseOpen] = useState(false);

  return (
    <View style={styles.container}>
      {/* 언어 */}
      <TouchableOpacity
        style={styles.statBox}
        onPress={() => setCourseOpen(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.flag}>{stats.language}</Text>
        {/* 스코어. 예전에는 코스 개수를 띄우고 있어서 항상 1 이었다 —
            코스가 하나뿐이라 늘 1 이고, 진도를 아무리 내도 안 움직였다.
            누르면 열리는 드롭다운의 스코어 카드와 같은 값이어야 맞는다. */}
        <Text style={styles.statText}>{stats.score ?? 0}</Text>
        <Ionicons
          name="caret-down"
          size={12}
          color={theme.textSecondary}
          style={{ marginLeft: 2 }}
        />
      </TouchableOpacity>

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
      {stats.isSuper ? (
        <View style={styles.superBadge}>
          <Text style={styles.superText}>SUPER</Text>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.statBox}
          onPress={() => router.push("/energy")}
        >
          <EnergyBadge energy={energy} size={26} />
        </TouchableOpacity>
      )}

      <CourseDropdown
        visible={courseOpen}
        onClose={() => setCourseOpen(false)}
      />
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
      backgroundColor: "transparent",
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
