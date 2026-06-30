import { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { UserService } from "@/services/user.service";
import SuggestionList from "@/components/friends/SuggestionList";
import { SuggestionItem } from "@/components/friends/SuggestionRow";

export default function FriendSuggestionsScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { t } = useTranslation();
  const s = styles(theme);
  const [items, setItems] = useState<SuggestionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      UserService.getSuggestions()
        .then((data) =>
          setItems(
            data.map((u: any) => ({
              id: u.id,
              name: u.nickname,
              avatarUri: u.profileImage,
              username: u.username,
              reasonName: u.reasonName,
            })),
          ),
        )
        .catch((e) => console.error("추천 로드 실패:", e))
        .finally(() => setLoading(false));
    }, []),
  );

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
        {loading ? (
          <ActivityIndicator color={theme.primary} style={{ marginTop: 40 }} />
        ) : (
          <SuggestionList items={items} />
        )}
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
