import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeColors } from "@/constants/theme";
import FriendAvatar from "@/components/friends/FriendAvatar";

export interface SuggestionItem {
  id: string;
  name: string;
  avatarUri?: string;
  reason?: string; // "hanjo kim님이 팔로우 중"
  username?: string; // 검색결과용
}

interface Props {
  item: SuggestionItem;
  followed: boolean;
  onFollow: () => void;
  onDismiss?: () => void;
  onPress?: () => void;
  theme: ThemeColors;
}

export default function SuggestionRow({
  item,
  followed,
  onFollow,
  onDismiss,
  onPress,
  theme,
}: Props) {
  const s = styles(theme);
  const sub = item.reason || (item.username ? `@${item.username}` : "");
  return (
    <TouchableOpacity style={s.row} onPress={onPress} activeOpacity={0.7}>
      <FriendAvatar name={item.name} avatarUri={item.avatarUri} size={56} />
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
      <TouchableOpacity
        style={[s.addBtn, followed && s.addedBtn]}
        onPress={onFollow}
        hitSlop={8}
      >
        <Ionicons
          name={followed ? "checkmark" : "person-add"}
          size={22}
          color="#fff"
        />
      </TouchableOpacity>
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
      gap: 14,
      paddingVertical: 14,
      paddingHorizontal: 4,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    info: { flex: 1 },
    name: { fontSize: 18, fontWeight: "800", color: theme.text },
    sub: { fontSize: 14, color: theme.textSecondary, marginTop: 2 },
    addBtn: {
      width: 56,
      height: 44,
      borderRadius: 12,
      backgroundColor: "#1CB0F6",
      alignItems: "center",
      justifyContent: "center",
    },
    addedBtn: { backgroundColor: "#58CC02" },
    close: { padding: 4 },
  });
