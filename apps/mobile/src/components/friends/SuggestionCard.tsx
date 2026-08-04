import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeColors } from "@/constants/theme";
import { FriendSuggestion } from "@/types/friend-suggestion";
import FriendAvatar from "@/components/friends/FriendAvatar";
import FollowPill from "@/components/friends/FollowPill";
import { useRouter } from "expo-router";

interface Props {
  item: FriendSuggestion;
  onDismiss: () => void;
  theme: ThemeColors;
}

export default function SuggestionCard({ item, onDismiss, theme }: Props) {
  const s = styles(theme);
  const router = useRouter();

  return (
    <TouchableOpacity
      style={s.card}
      onPress={() => router.push(`/friend-profile?id=${item.id}`)}
    >
      <TouchableOpacity style={s.close} onPress={onDismiss} hitSlop={8}>
        <Ionicons name="close" size={20} color={theme.textSecondary} />
      </TouchableOpacity>

      <FriendAvatar name={item.name} avatarUri={item.avatarUri} size={64} />
      <Text style={s.name} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={s.reason} numberOfLines={2}>
        {item.reason}
      </Text>

      <FollowPill
        userId={item.id}
        isFollowing={!!item.isFollowing}
        isFollowedBy={item.isFollowedBy}
      />
    </TouchableOpacity>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    card: {
      width: 160,
      backgroundColor: theme.surface,
      borderRadius: 18,
      borderWidth: 2,
      borderColor: theme.border,
      paddingVertical: 18,
      paddingHorizontal: 12,
      alignItems: "center",
      gap: 8,
    },
    close: { position: "absolute", top: 8, right: 8, zIndex: 2 },
    name: { fontSize: 17, fontWeight: "800", color: theme.text, marginTop: 4 },
    reason: {
      fontSize: 13,
      color: theme.textSecondary,
      textAlign: "center",
      lineHeight: 18,
      minHeight: 36,
    },
  });
