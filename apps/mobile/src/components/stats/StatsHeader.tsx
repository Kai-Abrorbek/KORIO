import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";

interface Props {
  onMenu?: () => void;
  onNotifications?: () => void;
  hasUnread?: boolean;
}

export default function StatsHeader({
  onMenu,
  onNotifications,
  hasUnread,
}: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onMenu}
        style={styles.left}
        activeOpacity={0.7}
      >
        <Ionicons name="menu" size={26} color={theme.text} />
        <Text style={styles.title}>me</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onNotifications} activeOpacity={0.7}>
        <View>
          <Ionicons name="notifications" size={24} color="#F4B860" />
          {hasUnread && <View style={styles.badge} />}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingTop: 54,
      paddingBottom: 12,
      backgroundColor: theme.bg,
    },
    left: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    title: {
      fontSize: 18,
      fontWeight: "800",
      color: theme.text,
    },
    badge: {
      position: "absolute",
      top: 0,
      right: 0,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: "#FF4B4B",
    },
  });
