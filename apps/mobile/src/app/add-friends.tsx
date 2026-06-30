import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Share,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { MOCK_SUGGESTIONS } from "@/mocks/friend-suggestions.mock";
import SuggestionCard from "@/components/friends/SuggestionCard";

export default function AddFriendsScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { t } = useTranslation();
  const s = styles(theme);

  const [followed, setFollowed] = useState<Set<string>>(new Set());
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const toggleFollow = (id: string) =>
    setFollowed((p) => {
      const n = new Set(p);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  const dismiss = (id: string) => setDismissed((p) => new Set(p).add(id));

  const list = MOCK_SUGGESTIONS.filter((x) => !dismissed.has(x.id));

  const actions = [
    {
      icon: "book",
      color: "#F4B400",
      label: t("friends.fromContacts"),
      onPress: () => router.push("/contacts-friends"),
    },
    {
      icon: "search",
      color: "#1CB0F6",
      label: t("friends.searchByName"),
      onPress: () => router.push("/friend-search"),
    },
    {
      icon: "share-social",
      color: "#58CC02",
      label: t("friends.shareLink"),
      onPress: () => router.push("/follow-link"),
    },
  ];

  return (
    <ScrollView
      style={s.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity
        onPress={() => {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace("/profile");
          }
        }}
        style={s.back}
        hitSlop={8}
      >
        <Ionicons name="arrow-back" size={28} color={theme.text} />
      </TouchableOpacity>

      <Text style={s.title}>{t("friends.findFriends")}</Text>

      <View style={s.actions}>
        {actions.map((a) => (
          <TouchableOpacity
            key={a.label}
            style={s.actionRow}
            onPress={a.onPress}
            activeOpacity={0.8}
          >
            <View style={[s.actionIcon, { backgroundColor: a.color + "22" }]}>
              <Ionicons name={a.icon as any} size={26} color={a.color} />
            </View>
            <Text style={s.actionLabel}>{a.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={s.sectionHead}>
        <Text style={s.sectionTitle}>{t("friends.suggestions")}</Text>
        <TouchableOpacity onPress={() => router.push("/friend-suggestions")}>
          <Text style={s.seeAll}>{t("friends.seeAll")}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.hScroll}
      >
        {list.map((item) => (
          <SuggestionCard
            key={item.id}
            item={item}
            followed={followed.has(item.id)}
            onFollow={() => toggleFollow(item.id)}
            onDismiss={() => dismiss(item.id)}
            theme={theme}
          />
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
      paddingTop: 56,
      paddingHorizontal: 20,
    },
    back: { marginBottom: 16 },
    title: {
      fontSize: 30,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 24,
    },
    actions: { gap: 14, marginBottom: 36 },
    actionRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
      borderWidth: 2,
      borderColor: theme.border,
      borderRadius: 16,
      padding: 16,
    },
    actionIcon: {
      width: 52,
      height: 52,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    actionLabel: { fontSize: 18, fontWeight: "700", color: theme.text },
    sectionHead: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    sectionTitle: { fontSize: 24, fontWeight: "800", color: theme.text },
    seeAll: { fontSize: 16, fontWeight: "700", color: "#1CB0F6" },
    hScroll: { gap: 12, paddingRight: 8 },
  });
