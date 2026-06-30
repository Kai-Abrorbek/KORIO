import { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
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

export default function FriendSearchScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { t } = useTranslation();
  const s = styles(theme);

  const [q, setQ] = useState("");
  const [results, setResults] = useState<SuggestionItem[]>([]);
  const [followedIds, setFollowedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);

  useFocusEffect(
    useCallback(() => {
      UserService.getSuggestions()
        .then((data) =>
          setSuggestions(
            data.map((u: any) => ({
              id: u.id,
              name: u.nickname,
              avatarUri: u.profileImage,
              username: u.username,
              reasonName: u.reasonName,
            })),
          ),
        )
        .catch((e) => console.error("추천 로드 실패:", e));
    }, []),
  );

  useEffect(() => {
    if (debounce.current) clearTimeout(debounce.current);
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    debounce.current = setTimeout(async () => {
      try {
        const data = await UserService.searchUsers(q.trim());
        setResults(
          data.map((u: any) => ({
            id: u.id,
            name: u.nickname,
            avatarUri: u.profileImage,
            username: u.username,
          })),
        );
        setFollowedIds(
          data.filter((u: any) => u.isFollowing).map((u: any) => u.id),
        );
      } catch (e) {
        console.error("검색 실패:", e);
      } finally {
        setLoading(false);
      }
    }, 350); // 디바운스
  }, [q]);

  return (
    <View style={s.container}>
      <View style={s.header}>
        <TouchableOpacity
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace("/profile");
            }
          }}
          hitSlop={8}
        >
          <Ionicons name="arrow-back" size={28} color={theme.text} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>{t("friends.findFriendsTitle")}</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={s.searchBox}>
        <Ionicons name="search" size={22} color={theme.textSecondary} />
        <TextInput
          style={[s.input, { color: theme.text }]}
          value={q}
          onChangeText={setQ}
          placeholder={t("friends.nameOrId")}
          placeholderTextColor={theme.textSecondary}
          autoFocus
        />
        {q.length > 0 && (
          <TouchableOpacity onPress={() => setQ("")} hitSlop={8}>
            <Ionicons
              name="close-circle"
              size={20}
              color={theme.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        contentContainerStyle={s.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {loading && (
          <ActivityIndicator color={theme.primary} style={{ marginTop: 20 }} />
        )}

        {q.trim().length > 0 ? (
          <SuggestionList
            items={results}
            initialFollowed={followedIds}
            dismissable={false}
          />
        ) : (
          <>
            <Text style={s.section}>{t("friends.suggestions")}</Text>
            <SuggestionList items={suggestions} />
          </>
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
      paddingBottom: 8,
    },
    headerTitle: { fontSize: 20, fontWeight: "800", color: theme.text },
    searchBox: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginHorizontal: 20,
      marginVertical: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 16,
      borderWidth: 2,
      borderColor: "#1CB0F6",
      backgroundColor: theme.surface,
    },
    input: { flex: 1, fontSize: 17, fontWeight: "600", padding: 0 },
    content: { paddingHorizontal: 20, paddingBottom: 40 },
    section: {
      fontSize: 22,
      fontWeight: "800",
      color: theme.text,
      marginTop: 8,
      marginBottom: 8,
    },
  });
