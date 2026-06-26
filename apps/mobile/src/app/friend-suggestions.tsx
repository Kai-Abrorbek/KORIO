import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { MOCK_SUGGESTIONS } from "@/mocks/friend-suggestions.mock";
import SuggestionRow from "@/components/friends/SuggestionRow";

export default function FriendSuggestionsScreen() {
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

  return (
    <View style={s.container}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="arrow-back" size={28} color={theme.text} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>{t("friends.suggestions")}</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView
        contentContainerStyle={s.content}
        showsVerticalScrollIndicator={false}
      >
        {list.map((item) => (
          <SuggestionRow
            key={item.id}
            item={item}
            followed={followed.has(item.id)}
            onFollow={() => toggleFollow(item.id)}
            onDismiss={() => dismiss(item.id)}
            onPress={() => router.push(`/friend-profile?id=${item.id}`)}
            theme={theme}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg, paddingTop: 56 },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingBottom: 12,
    },
    headerTitle: { fontSize: 20, fontWeight: "800", color: theme.text },
    content: { paddingHorizontal: 20, paddingBottom: 40 },
  });
