import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { ThemeColors } from "@/constants/theme";
import FriendAvatar from "@/components/friends/FriendAvatar";
import FollowPill from "@/components/friends/FollowPill";
import type { AvatarConfig } from "@/types/avatar";

export interface SuggestionItem {
  id: string;
  name: string;
  avatar?: AvatarConfig;
  avatarUri?: string;
  username?: string;
  reasonName?: string; // "OO님이 팔로우 중"의 OO
  isFollowing?: boolean;
  isFollowedBy?: boolean;
}

interface Props {
  item: SuggestionItem;
  onDismiss?: () => void;
  onPress?: () => void;
  theme: ThemeColors;
}

export default function SuggestionRow({
  item,
  onDismiss,
  onPress,
  theme,
}: Props) {
  const { t } = useTranslation();
  const sub = item.reasonName
    ? t("friends.followedBy", { name: item.reasonName })
    : item.username
      ? `@${item.username}`
      : "";
  const s = styles(theme);
  return (
    <TouchableOpacity style={s.row} onPress={onPress} activeOpacity={0.7}>
      <FriendAvatar
        name={item.name}
        avatar={item.avatar}
        avatarUri={item.avatarUri}
        size={56}
      />
      <View style={s.info}>
        <Text style={s.name} numberOfLines={1}>
          {item.name}
        </Text>
        {!!sub && (
          <Text style={s.sub} numberOfLines={1}>
            {sub}
          </Text>
        )}
      </View>
      <FollowPill
        userId={item.id}
        isFollowing={!!item.isFollowing}
        isFollowedBy={item.isFollowedBy}
      />
      {onDismiss && (
        <TouchableOpacity onPress={onDismiss} hitSlop={8} style={s.close}>
          <Ionicons name="close" size={24} color={theme.textSecondary} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingVertical: 14,
      paddingHorizontal: 4,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    info: { flex: 1 },
    name: { fontSize: 18, fontWeight: "800", color: theme.text },
    sub: { fontSize: 14, color: theme.textSecondary, marginTop: 2 },
    close: { padding: 4 },
  });
