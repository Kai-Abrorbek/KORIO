import { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import BoriMascot from "@/components/BoriMascot";

interface Props {
  name: string;
  onProfilePress?: () => void;
  onSubscribePress?: () => void;
}

export default function SettingsUserCard({
  name,
  onProfilePress,
  onSubscribePress,
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);
  const isPremium = false;
  // 툴팁 둥둥 애니메이션
  const bob = useSharedValue(0);
  useEffect(() => {
    bob.value = withRepeat(
      withSequence(
        withTiming(-3, { duration: 900, easing: Easing.inOut(Easing.ease) }),
        withTiming(3, { duration: 900, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
  }, [bob]);

  const tooltipStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bob.value }],
  }));

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.userRow}
        onPress={onProfilePress}
        activeOpacity={0.7}
      >
        <View style={styles.avatarBg}>
          <BoriMascot size={56} />
        </View>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Ionicons
          name="chevron-forward"
          size={22}
          color={theme.textSecondary}
        />
      </TouchableOpacity>
      {!isPremium && (
        <Animated.View style={[styles.tooltipWrap, tooltipStyle]}>
          <View style={styles.tooltip}>
            <Text style={styles.tooltipText}>
              <Text style={styles.tooltipFree}>FREE</Text>{" "}
              {t("settings.user.freeTooltip")}
            </Text>
            <Text style={styles.tooltipDesc}>
              {t("settings.user.freeTooltipDesc")}
            </Text>
          </View>
          <View style={styles.tooltipArrow} />
        </Animated.View>
      )}

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onSubscribePress}
        style={styles.subscribeWrap}
      >
        <LinearGradient
          colors={["#9990EE", "#776ee2", "#6557D9"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.subscribeBtn}
        >
          <View style={styles.pBadge}>
            <Text style={styles.pBadgeText}>P</Text>
          </View>
          <Text style={styles.subscribeText}>
            {t("settings.user.subscribe")}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.surface,
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 22,
    },
    userRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
    },
    avatarBg: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: theme.border,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    name: {
      flex: 1,
      fontSize: 22,
      fontWeight: "800",
      color: theme.text,
    },
    tooltipWrap: {
      alignSelf: "center",
      alignItems: "center",
      marginTop: 12,
      marginBottom: 0,
    },
    tooltip: {
      backgroundColor: "#2C2C36",
      paddingHorizontal: 18,
      paddingVertical: 10,
      borderRadius: 12,
      alignItems: "center",
    },
    tooltipText: {
      fontSize: 14,
      fontWeight: "700",
      color: "#fff",
    },
    tooltipFree: {
      color: "#FFCC00",
      fontWeight: "900",
    },
    tooltipDesc: {
      fontSize: 13,
      fontWeight: "600",
      color: "#fff",
      marginTop: 2,
    },
    tooltipArrow: {
      width: 0,
      height: 0,
      borderLeftWidth: 8,
      borderRightWidth: 8,
      borderTopWidth: 9,
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderTopColor: "#2C2C36",
      marginTop: -1,
    },
    subscribeWrap: {
      marginTop: 4,
      borderRadius: 14,
      overflow: "hidden",
      shadowColor: "#776ee2",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 6,
    },
    subscribeBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 16,
      gap: 12,
    },
    pBadge: {
      width: 26,
      height: 26,
      borderRadius: 13,
      backgroundColor: "rgba(255,255,255,0.25)",
      alignItems: "center",
      justifyContent: "center",
    },
    pBadgeText: {
      fontSize: 15,
      fontWeight: "900",
      color: "#fff",
    },
    subscribeText: {
      fontSize: 16,
      fontWeight: "800",
      color: "#fff",
      letterSpacing: 0.3,
    },
  });
