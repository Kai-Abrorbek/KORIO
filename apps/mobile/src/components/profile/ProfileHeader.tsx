import { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
  withSpring,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { useRouter } from "expo-router";
import AvatarPreview from "@/components/avatar/AvatarPreview";
import type { AvatarConfig } from "@/types/avatar";
import { useTranslation } from "react-i18next";

interface Props {
  name: string;
  isSuper: boolean;
  avatar?: AvatarConfig | null;
  onShare?: () => void;
  onSettings?: () => void;
}

export default function ProfileHeader({
  name,
  isSuper,
  avatar,
  onShare,
  onSettings,
}: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const bob = useSharedValue(0);
  const scale = useSharedValue(0.7);
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    scale.value = withSpring(1, { damping: 1, stiffness: 160 });
    bob.value = withRepeat(
      withSequence(
        withTiming(-1, { duration: 1300, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1300, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
  }, [bob, scale]);

  const mascotStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: bob.value }],
  }));

  return (
    <View style={styles.hero}>
      <View style={styles.topRow}>
        <TouchableOpacity
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace("/");
            }
          }}
          hitSlop={10}
          activeOpacity={0.7}
          style={styles.backBtn}
        >
          <Ionicons name="chevron-back" size={28} color={theme.text} />
        </TouchableOpacity>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={onShare} hitSlop={8} activeOpacity={0.7}>
            <Ionicons name="share-outline" size={26} color={theme.text} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onSettings}
            hitSlop={8}
            activeOpacity={0.7}
          >
            <Ionicons name="settings-outline" size={26} color={theme.text} />
          </TouchableOpacity>
        </View>
      </View>

      {isSuper && (
        <View style={styles.superBadge}>
          <Text style={styles.superText}>SUPER</Text>
        </View>
      )}

      <Animated.View style={[styles.avatarWrap, mascotStyle]}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={t("avatarEditor.open")}
          activeOpacity={0.9}
          style={styles.avatarButton}
          onPress={() => router.push("/avatar-editor")}
        >
          <AvatarPreview avatar={avatar} size={220} />

          <View style={styles.editBadgeDepth} />

          <View style={styles.editBadge}>
            <Ionicons name="pencil" size={18} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    hero: {
      backgroundColor: theme.border,
      paddingTop: 54,
      paddingBottom: 32,
      paddingHorizontal: 20,
      position: "relative",
    },
    topRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10,
    },
    backBtn: {
      width: 32,
      height: 32,
      alignItems: "center",
      justifyContent: "center",
    },
    name: {
      flex: 1,
      fontSize: 22,
      fontWeight: "800",
      color: theme.text,
      marginRight: 12,
    },
    actions: {
      flexDirection: "row",
      gap: 16,
      alignItems: "center",
    },
    superBadge: {
      position: "absolute",
      right: 20,
      top: 120,
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
    avatarWrap: {
      alignItems: "center",
      marginTop: 20,
    },
    avatarButton: {
      position: "relative",
      alignItems: "center",
      justifyContent: "center",
    },
    editBadgeDepth: {
      position: "absolute",
      right: 18,
      bottom: 17,
      width: 45,
      height: 45,
      borderRadius: 16,
      backgroundColor: "#554CB5",
    },
    editBadge: {
      position: "absolute",
      right: 18,
      bottom: 22,
      width: 45,
      height: 45,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.primary,
      borderWidth: 2,
      borderColor: "#FFFFFF",
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.15,
      shadowRadius: 7,
      elevation: 7,
    },
  });
