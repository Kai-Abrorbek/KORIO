import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { Friend } from "@/types/friend";
import FriendAvatar from "./FriendAvatar";

interface Props {
  friend: Friend;
  onPress?: () => void;
  isLast?: boolean;
}

export default function FriendListItem({ friend, onPress, isLast }: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <TouchableOpacity
      style={[styles.row, !isLast && styles.divider]}
      onPress={onPress}
      activeOpacity={0.6}
    >
      <FriendAvatar name={friend.name} avatarUri={friend.avatarUri} />

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {friend.name}
        </Text>
        {friend.primaryFlag && friend.level != null && (
          <View style={styles.metaRow}>
            <Text style={styles.flag}>{friend.primaryFlag}</Text>
            <Text style={styles.level}>{friend.level}</Text>
          </View>
        )}
      </View>

      <Ionicons name="chevron-forward" size={22} color={theme.textSecondary} />
    </TouchableOpacity>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 14,
      gap: 14,
    },
    divider: {
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    info: {
      flex: 1,
      gap: 4,
    },
    name: {
      fontSize: 17,
      fontWeight: "800",
      color: theme.text,
    },
    metaRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    flag: {
      fontSize: 16,
    },
    level: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.textSecondary,
    },
  });
