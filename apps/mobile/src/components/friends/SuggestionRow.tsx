import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeColors } from "@/constants/theme";
import { FriendSuggestion } from "@/types/friend-suggestion";
import FriendAvatar from "@/components/friends/FriendAvatar";

interface Props {
  item: FriendSuggestion;
  followed: boolean;
  onFollow: () => void;
  onDismiss: () => void;
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
  return (
    <TouchableOpacity style={s.row} onPress={onPress} activeOpacity={0.7}>
      <FriendAvatar name={item.name} avatarUri={item.avatarUri} size={56} />
      <View style={s.info}>
        <Text style={s.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={s.reason} numberOfLines={1}>
          {item.reason}
        </Text>
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
      <TouchableOpacity onPress={onDismiss} hitSlop={8} style={s.close}>
        <Ionicons name="close" size={24} color={theme.textSecondary} />
      </TouchableOpacity>
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
    reason: { fontSize: 14, color: theme.textSecondary, marginTop: 2 },
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
