import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { ThemeColors } from "@/constants/theme";
import { FriendSuggestion } from "@/types/friend-suggestion";
import FriendAvatar from "@/components/friends/FriendAvatar";

interface Props {
  item: FriendSuggestion;
  followed: boolean;
  onFollow: () => void;
  onDismiss: () => void;
  theme: ThemeColors;
}

export default function SuggestionCard({
  item,
  followed,
  onFollow,
  onDismiss,
  theme,
}: Props) {
  const { t } = useTranslation();
  const s = styles(theme);
  return (
    <View style={s.card}>
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

      <TouchableOpacity
        style={[s.followBtn, followed && s.followedBtn]}
        onPress={onFollow}
        activeOpacity={0.85}
      >
        <Text style={[s.followText, followed && s.followedText]}>
          {followed ? t("friends.following") : t("friends.follow")}
        </Text>
      </TouchableOpacity>
    </View>
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
    followBtn: {
      width: "100%",
      backgroundColor: "#1CB0F6",
      borderRadius: 12,
      paddingVertical: 10,
      alignItems: "center",
      marginTop: 4,
    },
    followedBtn: { backgroundColor: theme.border },
    followText: { color: "#fff", fontSize: 15, fontWeight: "800" },
    followedText: { color: theme.textSecondary },
  });
