import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { MOCK_FRIENDS } from "@/mocks/friends.mock";
import { FriendTab } from "@/types/friend";
import FriendsTabs from "@/components/friends/FriendsTabs";
import FriendListItem from "@/components/friends/FriendListItem";

export default function FriendsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  const styles = getStyles(theme);

  const [tab, setTab] = useState<FriendTab>("following");
  const list = MOCK_FRIENDS[tab];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={10}
          activeOpacity={0.7}
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back" size={26} color={theme.text} />
        </TouchableOpacity>
        <Text style={styles.title}>{t("friends.title")}</Text>
        <View style={styles.backBtn} />
      </View>

      <FriendsTabs value={tab} onChange={setTab} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          {list.map((friend, i) => (
            <FriendListItem
              key={friend.id}
              friend={friend}
              isLast={i === list.length - 1}
              onPress={() => router.push("/friend-profile")}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: 54,
      paddingHorizontal: 16,
      paddingBottom: 12,
    },
    backBtn: {
      width: 32,
      height: 32,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 18,
      fontWeight: "800",
      color: theme.text,
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      paddingTop: 20,
      paddingHorizontal: 16,
      paddingBottom: 40,
    },
    card: {
      backgroundColor: theme.surface,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: theme.border,
      overflow: "hidden",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.04,
      shadowRadius: 8,
      elevation: 1,
    },
  });
