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
import BoriMascot from "@/components/BoriMascot";
import SuperBadge from "@/components/ui/SuperBadge";
import { League } from "@/types/profile";
import { LEAGUE_HERO_COLORS } from "@/mocks/friend-profile.mock";

interface Props {
  name: string;
  league: League;
  isSuper: boolean;
  onBack?: () => void;
  onShare?: () => void;
}

export default function FriendProfileHeader({
  name,
  league,
  isSuper,
  onBack,
  onShare,
}: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);

  const bob = useSharedValue(0);
  const scale = useSharedValue(0.7);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 10, stiffness: 160 });
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

  const heroBg = LEAGUE_HERO_COLORS[league];

  return (
    <View style={[styles.hero, { backgroundColor: heroBg }]}>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={onBack} hitSlop={10} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title} numberOfLines={1}>
          {name}
        </Text>
        <TouchableOpacity onPress={onShare} hitSlop={10} activeOpacity={0.7}>
          <Ionicons name="share-outline" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

      {isSuper && (
        <View style={styles.superWrap}>
          <SuperBadge />
        </View>
      )}

      <Animated.View style={[styles.avatarWrap, mascotStyle]}>
        <BoriMascot size={170} />
      </Animated.View>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    hero: {
      paddingTop: 54,
      paddingHorizontal: 20,
      paddingBottom: 0,
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
      marginTop: 16,
      marginBottom: -20, // 캐릭터 하단이 살짝 잘려보이게
    },
  });
