import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { darken } from "@/utils/color";

interface Props {
  sectionNumber: number;
  unitNumber: number;
  title: string;
  color: string;
  onGuidePress?: () => void;
}

export default function SectionBanner({
  sectionNumber,
  unitNumber,
  title,
  color,
  onGuidePress,
}: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.outer}>
      {/* 3D 그림자 (밑단) */}
      <View style={[styles.shadow, { backgroundColor: darken(color, 40) }]} />
      {/* 메인 배너 */}
      <View style={[styles.container, { backgroundColor: color }]}>
        <View style={styles.left}>
          <Text style={styles.unit}>
            섹션 {sectionNumber}, 유닛 {unitNumber}
          </Text>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.divider} />
        <TouchableOpacity
          style={styles.guideBtn}
          onPress={onGuidePress}
          activeOpacity={0.7}
        >
          <Ionicons name="reader-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    outer: {
      marginHorizontal: 16,
      marginBottom: 12,
    },
    shadow: {
      position: "absolute",
      top: 5,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: 14,
    },
    container: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 14,
      paddingVertical: 14,
      paddingHorizontal: 18,
    },
    left: {
      flex: 1,
      gap: 2,
    },
    unit: {
      fontSize: 13,
      fontWeight: "700",
      color: "rgba(255,255,255,0.85)",
    },
    title: {
      fontSize: 17,
      fontWeight: "800",
      color: "#fff",
    },
    divider: {
      width: 1.5,
      height: 36,
      backgroundColor: "rgba(255,255,255,0.35)",
      marginHorizontal: 14,
    },
    guideBtn: {
      width: 36,
      height: 36,
      alignItems: "center",
      justifyContent: "center",
    },
  });
