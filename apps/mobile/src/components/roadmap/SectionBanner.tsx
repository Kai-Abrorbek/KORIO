import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { darken } from "@/utils/color";
import { LinearGradient } from "expo-linear-gradient";
import { t } from "i18next";

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
      <View style={[styles.glow, { backgroundColor: color }]} />
      <View style={[styles.depth, { backgroundColor: darken(color, 42) }]} />

      <LinearGradient
        colors={[color, darken(color, 15)]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <View style={styles.orbLarge} pointerEvents="none" />
        <View style={styles.orbSmall} pointerEvents="none" />
        <View style={styles.shine} pointerEvents="none" />

        <View style={styles.mapBadge}>
          <View style={styles.mapBadgeInner}>
            <Ionicons name="map" size={21} color="#fff" />
          </View>
        </View>

        <View style={styles.left}>
          <Text style={styles.unit}>
            {t("roadmap.sectionUnit", {
              section: sectionNumber,
              unit: unitNumber,
            })}
          </Text>

          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.guideBtn}
          onPress={onGuidePress}
          activeOpacity={0.86}
        >
          <View style={styles.guideDepth} />

          <View style={styles.guideFace}>
            <Ionicons name="reader-outline" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const getStyles = (_theme: ThemeColors) =>
  StyleSheet.create({
    outer: {
      marginHorizontal: 14,
      marginBottom: 12,
      position: "relative",
    },
    glow: {
      position: "absolute",
      left: 14,
      right: 14,
      top: 12,
      bottom: -10,
      borderRadius: 28,
      opacity: 0.2,
    },
    depth: {
      position: "absolute",
      top: 8,
      left: 0,
      right: 0,
      bottom: -1,
      borderRadius: 24,
    },
    container: {
      minHeight: 86,
      flexDirection: "row",
      alignItems: "center",
      overflow: "hidden",
      borderRadius: 24,
      paddingVertical: 14,
      paddingLeft: 14,
      paddingRight: 12,
      borderWidth: 1.5,
      borderColor: "rgba(255,255,255,0.28)",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.17,
      shadowRadius: 16,
      elevation: 9,
    },
    shine: {
      position: "absolute",
      top: 0,
      left: 18,
      right: 82,
      height: 2,
      borderRadius: 999,
      backgroundColor: "rgba(255,255,255,0.52)",
    },
    orbLarge: {
      position: "absolute",
      width: 108,
      height: 108,
      borderRadius: 999,
      right: -35,
      top: -48,
      backgroundColor: "rgba(255,255,255,0.12)",
    },
    orbSmall: {
      position: "absolute",
      width: 46,
      height: 46,
      borderRadius: 999,
      left: 80,
      bottom: -31,
      backgroundColor: "rgba(255,255,255,0.1)",
    },
    mapBadge: {
      width: 52,
      height: 52,
      borderRadius: 18,
      padding: 4,
      marginRight: 12,
      backgroundColor: "rgba(255,255,255,0.2)",
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.26)",
    },
    mapBadgeInner: {
      flex: 1,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(255,255,255,0.15)",
    },
    left: {
      flex: 1,
      minWidth: 0,
      gap: 3,
    },
    unit: {
      fontSize: 12,
      fontWeight: "800",
      color: "rgba(255,255,255,0.82)",
      letterSpacing: 0.35,
    },
    title: {
      fontSize: 18,
      fontWeight: "900",
      color: "#fff",
      letterSpacing: -0.2,
    },
    guideBtn: {
      width: 46,
      height: 51,
      marginLeft: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    guideDepth: {
      position: "absolute",
      top: 6,
      width: 44,
      height: 44,
      borderRadius: 15,
      backgroundColor: "rgba(0,0,0,0.2)",
    },
    guideFace: {
      position: "absolute",
      top: 0,
      width: 44,
      height: 44,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(255,255,255,0.17)",
      borderWidth: 1.5,
      borderColor: "rgba(255,255,255,0.36)",
    },
  });
