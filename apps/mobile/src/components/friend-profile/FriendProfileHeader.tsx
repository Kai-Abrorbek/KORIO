import { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withSpring,
  Easing,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import SuperBadge from "@/components/ui/SuperBadge";
import { League } from "@/types/profile";
import { LinearGradient } from "expo-linear-gradient";
import AvatarPreview, {
  AVATAR_BACKGROUNDS,
  getAvatarHeaderContentColor,
} from "@/components/avatar/AvatarPreview";
import { mergeAvatarConfig, type AvatarConfig } from "@/types/avatar";

interface Props {
  name: string;
  league: League;
  isSuper: boolean;
  avatar?: Partial<AvatarConfig> | null;
  onBack?: () => void;
  onShare?: () => void;
}

export default function FriendProfileHeader({
  name,
  league,
  isSuper,
  avatar,
  onBack,
  onShare,
}: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);

  const bob = useSharedValue(0);
  const scale = useSharedValue(0.7);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 0, stiffness: 160 });
    bob.value = withRepeat(
      withSequence(
        withTiming(-3, { duration: 1300, easing: Easing.inOut(Easing.ease) }),
        withTiming(3, { duration: 1300, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
  }, [bob, scale]);

  const mascotStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: bob.value }],
  }));

  const avatarConfig = mergeAvatarConfig(avatar);
  const headerColors = AVATAR_BACKGROUNDS[avatarConfig.background];
  const headerContentColor = getAvatarHeaderContentColor(avatar);

  return (
    <LinearGradient
      colors={headerColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.hero}
    >
      <View style={styles.topRow}>
        <TouchableOpacity onPress={onBack} hitSlop={10} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={26} color={headerContentColor} />
        </TouchableOpacity>
        <Text
          style={[
            styles.title,
            {
              color: headerContentColor,
            },
          ]}
          numberOfLines={1}
        >
          {name}
        </Text>
        <TouchableOpacity onPress={onShare} hitSlop={10} activeOpacity={0.7}>
          <Ionicons name="share-outline" size={26} color={headerContentColor} />
        </TouchableOpacity>
      </View>

      {isSuper && (
        <View style={styles.superWrap}>
          <SuperBadge />
        </View>
      )}

      <Animated.View style={[styles.avatarWrap, mascotStyle]}>
        <AvatarPreview avatar={avatar} size={230} showBackground={false} />
      </Animated.View>
    </LinearGradient>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    hero: {
      minHeight: 390,
      paddingTop: 54,
      paddingHorizontal: 20,
      paddingBottom: 28,
      position: "relative",
      overflow: "hidden",
    },
    topRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 14,
    },
    title: {
      flex: 1,
      textAlign: "center",
      fontSize: 18,
      fontWeight: "800",
      color: "#fff",
    },
    superWrap: {
      position: "absolute",
      right: 20,
      top: 100,
    },
    avatarWrap: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: 18,
      marginBottom: 0,
    },
  });
