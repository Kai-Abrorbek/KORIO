import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { TIER_LABEL, maxBadge, usePremiumTier } from "@/features/subscription/usePremiumTier";
import { ThemeColors } from "@/constants/theme";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import AvatarPreview, {
  AVATAR_BACKGROUNDS,
  getAvatarHeaderContentColor,
} from "@/components/avatar/AvatarPreview";
import { SceneBackdrop, sceneHeroColors } from "@/components/avatar/AvatarScene";
import AvatarPet from "@/components/avatar/AvatarPet";
import { mergeAvatarConfig, type AvatarConfig } from "@/types/avatar";

interface Props {
  name: string;
  isSuper: boolean;
  avatar?: AvatarConfig | null;
  /** 연속 학습일 — 펫이 이만큼 자란 모습으로 보인다 */
  streak?: number;
  onShare?: () => void;
  onSettings?: () => void;
}

export default function ProfileHeader({
  name,
  isSuper,
  avatar,
  streak = 0,
  onShare,
  onSettings,
}: Props) {
  const theme = useTheme();
  const isMax = usePremiumTier() === "max";
  const styles = getStyles(theme);
  const avatarConfig = mergeAvatarConfig(avatar);
  // 배경 장면을 골랐으면 그 그림이 히어로 뒤에 깔린다 (색·글자색도 그림에 맞춤)
  const sceneColors = sceneHeroColors(avatarConfig.scene);
  const headerColors = sceneColors?.colors ?? AVATAR_BACKGROUNDS[avatarConfig.background];
  const headerContentColor = sceneColors?.text ?? getAvatarHeaderContentColor(avatar);
  const router = useRouter();
  const { t } = useTranslation();

  // 캐릭터는 가만히 서 있다 (튀어나오기·둥둥 없음)
  return (
    <LinearGradient
      colors={headerColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.hero}
    >
      <SceneBackdrop scene={avatarConfig.scene} shade />
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
          <Ionicons name="chevron-back" size={28} color={headerContentColor} />
        </TouchableOpacity>
        <Text
          style={[
            styles.name,
            {
              color: headerContentColor,
            },
          ]}
          numberOfLines={1}
        >
          {name}
        </Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={onShare} hitSlop={8} activeOpacity={0.7}>
            <Ionicons
              name="share-outline"
              size={26}
              color={headerContentColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onSettings}
            hitSlop={8}
            activeOpacity={0.7}
          >
            <Ionicons
              name="settings-outline"
              size={26}
              color={headerContentColor}
            />
          </TouchableOpacity>
        </View>
      </View>

      {isSuper && (
        <View style={[styles.superBadge, isMax && maxBadge.badge]}>
          <Text style={[styles.superText, isMax && maxBadge.text]}>
            {TIER_LABEL[isMax ? "max" : "super"]}
          </Text>
        </View>
      )}

      <View style={styles.avatarWrap}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={t("avatarEditor.open")}
          activeOpacity={0.9}
          style={styles.avatarButton}
          onPress={() => router.push("/avatar-editor")}
        >
          <AvatarPreview avatar={avatar} size={230} showBackground={false} aura />
          <AvatarPet pet={avatarConfig.pet} streak={streak} avatarSize={230} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    hero: {
      paddingTop: 54,
      paddingBottom: 32,
      paddingHorizontal: 20,
      position: "relative",
      overflow: "hidden",
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
