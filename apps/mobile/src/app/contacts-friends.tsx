import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import * as Contacts from "expo-contacts";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { UserService } from "@/services/user.service";
import SuggestionList from "@/components/friends/SuggestionList";
import { SuggestionItem } from "@/components/friends/SuggestionRow";

export default function ContactsFriendsScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { t } = useTranslation();
  const s = styles(theme);

  const [matched, setMatched] = useState<SuggestionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status !== "granted") {
        setDenied(true);
        setLoading(false);
        return;
      }

      const { data } = await Contacts.getContactsAsync({
        fields: [
          Contacts.Fields.Name,
          Contacts.Fields.PhoneNumbers,
          Contacts.Fields.Emails,
        ],
      });

      const names = [...new Set(data.map((c) => c.name).filter(Boolean))].slice(
        0,
        100,
      );
      try {
        const res = await UserService.matchContacts(names as string[]);
        setMatched(
          res.map((u: any) => ({
            id: u.id,
            name: u.nickname,
            avatarUri: u.profileImage,
            username: u.username,
          })),
        );
      } catch (e) {
        console.error("연락처 매칭 실패:", e);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <View style={s.container}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="arrow-back" size={28} color={theme.text} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>{t("friends.contactsTitle")}</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView
        contentContainerStyle={s.content}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <ActivityIndicator color={theme.primary} style={{ marginTop: 40 }} />
        ) : denied ? (
          <Text style={s.empty}>{t("friends.contactsDenied")}</Text>
        ) : matched.length === 0 ? (
          <Text style={s.empty}>{t("friends.contactsNoMatch")}</Text>
        ) : (
          <>
            <Text style={s.count}>
              {t("friends.contactsCount", { count: matched.length })}
            </Text>
            <SuggestionList items={matched} dismissable={false} />
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
      paddingBottom: 12,
    },
    headerTitle: { fontSize: 18, fontWeight: "800", color: theme.text },
    content: { paddingHorizontal: 20, paddingBottom: 40 },
    count: {
      fontSize: 22,
      fontWeight: "800",
      color: theme.text,
      marginVertical: 12,
    },
    empty: {
      fontSize: 16,
      color: theme.textSecondary,
      textAlign: "center",
      marginTop: 40,
    },
  });
