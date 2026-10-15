import OnlineBadge from "@/components/common/OnlineBadge";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import SuperBadge from "@/components/ui/SuperBadge";
import { League } from "@/types/profile";
import { LinearGradient } from "expo-linear-gradient";
import AvatarPreview, {
  AVATAR_BACKGROUNDS,
  getAvatarHeaderContentColor,
} from "@/components/avatar/AvatarPreview";
import { SceneBackdrop, sceneHeroColors } from "@/components/avatar/AvatarScene";
import AvatarPet from "@/components/avatar/AvatarPet";
import { NameTitleRow } from "@/components/avatar/NameTitle";
import { mergeAvatarConfig, type AvatarConfig } from "@/types/avatar";

interface Props {
  name: string;
  league: League;
  isSuper: boolean;
  superTier?: "super" | "max" | null;
  /** 지금 접속 중인지 (서버가 lastActiveAt 으로 판단) */
  isOnline?: boolean;
  avatar?: Partial<AvatarConfig> | null;
  /** 연속 학습일 — 펫이 이만큼 자란 모습으로 보인다 */
  streak?: number;
  onBack?: () => void;
  onShare?: () => void;
}

export default function FriendProfileHeader({
  name,
  league,
  isSuper,
  superTier,
  isOnline = false,
  avatar,
  streak = 0,
  onBack,
  onShare,
}: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);

  const avatarConfig = mergeAvatarConfig(avatar);
  // 배경 장면을 골랐으면 그 그림이 히어로 뒤에 깔린다
  const sceneColors = sceneHeroColors(avatarConfig.scene);
  const headerColors = sceneColors?.colors ?? AVATAR_BACKGROUNDS[avatarConfig.background];
  const headerContentColor = sceneColors?.text ?? getAvatarHeaderContentColor(avatar);

  // 캐릭터는 가만히 서 있다 (튀어나오기·둥둥 없음)
  return (
    <LinearGradient
      colors={headerColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.hero}
    >
      <SceneBackdrop scene={avatarConfig.scene} shade living />
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
          <SuperBadge tier={superTier} />
        </View>
      )}

      {isOnline && (
        <View style={styles.onlineWrap}>
          <OnlineBadge />
        </View>
      )}

      <View style={styles.avatarWrap}>
        <View style={{ width: 230, height: 230 }}>
          <AvatarPreview avatar={avatar} size={230} showBackground={false} aura />
          <AvatarPet pet={avatarConfig.pet} streak={streak} avatarSize={230} />
        </View>
      </View>
      {/* 칭호 — 캐릭터 발 밑 이름표 */}
      <NameTitleRow title={avatarConfig.title} style={{ marginTop: -10 }} />
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
    onlineWrap: {
      alignSelf: "center",
      marginTop: 10,
    },
    avatarWrap: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: 18,
      marginBottom: 0,
    },
  });
