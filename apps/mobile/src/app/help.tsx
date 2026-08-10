/**
 * 고객지원.
 *
 * 대부분의 문의는 같은 몇 가지라서, 사람한테 물어보기 전에 FAQ 로 먼저
 * 해결되게 만든다. 검색 → 카테고리 → 아코디언 순서.
 * 그래도 안 풀리면 아래 문의 카드로.
 */
import { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
  TextInput,
  Linking,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "@/utils/haptics";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { useAuthStore } from "@/store/auth.store";
import {
  HELP_FAQ,
  HELP_CATEGORIES,
  SUPPORT,
  type HelpCategory,
} from "@/constants/help";
import { APP_VERSION } from "@/mocks/settings.mock";

type Styles = ReturnType<typeof getStyles>;

const CAT_COLOR: Record<HelpCategory, string> = {
  learning: "#45B7D1",
  premium: "#E2A83A",
  account: "#FF9F66",
  etc: "#A78BFA",
};

export default function HelpScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = getStyles(theme);
  const user = useAuthStore((st) => st.user);

  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<HelpCategory | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return HELP_FAQ.filter((item) => {
      if (cat && item.category !== cat) return false;
      if (!q) return true;
      // 질문뿐 아니라 답변 본문도 뒤진다. 사용자는 증상으로 검색한다
      const text = (
        t(`help.faq.${item.id}.q`) +
        " " +
        t(`help.faq.${item.id}.a`)
      ).toLowerCase();
      return text.includes(q);
    });
  }, [query, cat, t]);

  /** 문의 메일에 기기·버전을 미리 채워두면 되묻는 왕복이 준다 */
  const mailTo = () => {
    const body = [
      "",
      "",
      "———————————",
      `App: KORIO ${APP_VERSION}`,
      `Platform: ${Platform.OS} ${Platform.Version}`,
      `User: ${user?.email ?? "-"}`,
    ].join("\n");
    const url =
      `mailto:${SUPPORT.email}` +
      `?subject=${encodeURIComponent("[KORIO] " + t("help.contactSubject"))}` +
      `&body=${encodeURIComponent(body)}`;
    Linking.openURL(url).catch(() => {});
  };

  const openUrl = (url: string) => {
    Haptics.selectionAsync();
    Linking.openURL(url).catch(() => {});
  };

  return (
    <View style={[s.container, { paddingTop: insets.top + 4 }]}>
      <View style={s.header}>
        <TouchableOpacity
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/settings")
          }
          hitSlop={10}
        >
          <Ionicons name="chevron-back" size={28} color={theme.text} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>{t("settings.items.help.title")}</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* 검색 */}
        <View style={s.searchWrap}>
          <Ionicons name="search" size={19} color={theme.textSecondary} />
          <TextInput
            style={s.searchInput}
            value={query}
            onChangeText={setQuery}
            placeholder={t("help.searchPlaceholder")}
            placeholderTextColor={theme.textSecondary}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery("")} hitSlop={8}>
              <Ionicons
                name="close-circle"
                size={19}
                color={theme.textSecondary}
              />
            </Pressable>
          )}
        </View>

        {/* 카테고리 */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={s.chips}
        >
          <Chip
            label={t("help.categories.all")}
            active={cat === null}
            color={theme.primary}
            onPress={() => setCat(null)}
            s={s}
          />
          {HELP_CATEGORIES.map((c) => (
            <Chip
              key={c}
              label={t(`help.categories.${c}`)}
              active={cat === c}
              color={CAT_COLOR[c]}
              onPress={() => setCat(cat === c ? null : c)}
              s={s}
            />
          ))}
        </ScrollView>

        {/* FAQ */}
        {list.length === 0 ? (
          <View style={s.empty}>
            <Ionicons
              name="search"
              size={38}
              color={theme.textSecondary}
              style={{ opacity: 0.5 }}
            />
            <Text style={s.emptyTitle}>{t("help.noResult")}</Text>
            <Text style={s.emptyDesc}>{t("help.noResultDesc")}</Text>
          </View>
        ) : (
          <View style={s.card}>
            {list.map((item, i) => {
              const isOpen = open === item.id;
              return (
                <View key={item.id}>
                  {i > 0 && <View style={s.divider} />}
                  <Pressable
                    style={s.qRow}
                    onPress={() => {
                      Haptics.selectionAsync();
                      setOpen(isOpen ? null : item.id);
                    }}
                  >
                    <View
                      style={[
                        s.qIcon,
                        { backgroundColor: CAT_COLOR[item.category] + "22" },
                      ]}
                    >
                      <Ionicons
                        name={item.icon as any}
                        size={17}
                        color={CAT_COLOR[item.category]}
                      />
                    </View>
                    <Text style={s.qText}>{t(`help.faq.${item.id}.q`)}</Text>
                    <Ionicons
                      name={isOpen ? "chevron-up" : "chevron-down"}
                      size={18}
                      color={theme.textSecondary}
                    />
                  </Pressable>
                  {isOpen && (
                    <Text style={s.aText}>{t(`help.faq.${item.id}.a`)}</Text>
                  )}
                </View>
              );
            })}
          </View>
        )}

        {/* 문의 */}
        <Text style={s.sectionLabel}>{t("help.contactSection")}</Text>
        <View style={s.card}>
          <ContactRow
            icon="mail"
            color="#45B7D1"
            bg="#D5F0F5"
            label={t("help.email")}
            desc={SUPPORT.email}
            onPress={mailTo}
            s={s}
            theme={theme}
          />
          <View style={s.divider} />
          <ContactRow
            icon="paper-plane"
            color="#229ED9"
            bg="#DCEDFD"
            label={t("help.telegram")}
            desc={t("help.telegramDesc")}
            onPress={() => openUrl(SUPPORT.telegram)}
            s={s}
            theme={theme}
          />
        </View>
        <Text style={s.replyNote}>{t("help.replyNote")}</Text>

        {/* 약관 · 버전 */}
        <Text style={s.sectionLabel}>{t("help.aboutSection")}</Text>
        <View style={s.card}>
          <ContactRow
            icon="document-text"
            color="#A8A8B0"
            bg="#ECECEE"
            label={t("help.terms")}
            onPress={() => openUrl(SUPPORT.terms)}
            s={s}
            theme={theme}
          />
          <View style={s.divider} />
          <ContactRow
            icon="shield-checkmark"
            color="#1DBB7F"
            bg="#D7F5E5"
            label={t("help.privacy")}
            onPress={() => openUrl(SUPPORT.privacy)}
            s={s}
            theme={theme}
          />
        </View>

        <Text style={s.version}>
          {t("settings.version", { version: APP_VERSION })}
        </Text>
      </ScrollView>
    </View>
  );
}

function Chip({
  label,
  active,
  color,
  onPress,
  s,
}: {
  label: string;
  active: boolean;
  color: string;
  onPress: () => void;
  s: Styles;
}) {
  return (
    <Pressable
      onPress={() => {
        Haptics.selectionAsync();
        onPress();
      }}
      style={[s.chip, active && { backgroundColor: color, borderColor: color }]}
    >
      <Text style={[s.chipText, active && { color: "#fff" }]}>{label}</Text>
    </Pressable>
  );
}

function ContactRow({
  icon,
  color,
  bg,
  label,
  desc,
  onPress,
  s,
  theme,
}: {
  icon: string;
  color: string;
  bg: string;
  label: string;
  desc?: string;
  onPress: () => void;
  s: Styles;
  theme: ThemeColors;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [s.row, pressed && { opacity: 0.55 }]}
    >
      <View style={[s.iconSq, { backgroundColor: bg }]}>
        <Ionicons name={icon as any} size={20} color={color} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={s.rowLabel}>{label}</Text>
        {desc ? <Text style={s.rowDesc}>{desc}</Text> : null}
      </View>
      <Ionicons name="chevron-forward" size={19} color={theme.textSecondary} />
    </Pressable>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingHorizontal: 16,
      paddingBottom: 10,
    },
    headerTitle: { fontSize: 22, fontWeight: "700", color: theme.text },

    searchWrap: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginHorizontal: 20,
      paddingHorizontal: 14,
      height: 46,
      borderRadius: 14,
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
    },
    searchInput: {
      flex: 1,
      fontSize: 15,
      color: theme.text,
      fontWeight: "500",
      padding: 0,
    },

    chips: { paddingHorizontal: 20, paddingVertical: 14, gap: 8 },
    chip: {
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 99,
      borderWidth: 1.5,
      borderColor: theme.border,
      backgroundColor: theme.surface,
    },
    chipText: { fontSize: 13, fontWeight: "700", color: theme.textSecondary },

    sectionLabel: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.textSecondary,
      marginLeft: 32,
      marginBottom: 8,
      marginTop: 24,
    },
    card: {
      backgroundColor: theme.surface,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: theme.border,
      marginHorizontal: 20,
      overflow: "hidden",
    },
    divider: { height: 1, backgroundColor: theme.border, marginLeft: 58 },

    qRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingVertical: 15,
      paddingHorizontal: 16,
    },
    qIcon: {
      width: 30,
      height: 30,
      borderRadius: 9,
      alignItems: "center",
      justifyContent: "center",
    },
    qText: { flex: 1, fontSize: 15, fontWeight: "700", color: theme.text },
    aText: {
      fontSize: 14,
      lineHeight: 22,
      color: theme.textSecondary,
      fontWeight: "500",
      paddingHorizontal: 16,
      paddingLeft: 58,
      paddingBottom: 16,
      marginTop: -4,
    },

    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      paddingVertical: 14,
      paddingHorizontal: 16,
    },
    iconSq: {
      width: 38,
      height: 38,
      borderRadius: 11,
      alignItems: "center",
      justifyContent: "center",
    },
    rowLabel: { fontSize: 16, fontWeight: "700", color: theme.text },
    rowDesc: {
      fontSize: 13,
      color: theme.textSecondary,
      marginTop: 2,
      fontWeight: "500",
    },
    replyNote: {
      fontSize: 12,
      color: theme.textSecondary,
      fontWeight: "500",
      marginTop: 10,
      marginHorizontal: 32,
      lineHeight: 18,
    },

    empty: { alignItems: "center", paddingVertical: 46, gap: 8 },
    emptyTitle: { fontSize: 16, fontWeight: "800", color: theme.text },
    emptyDesc: {
      fontSize: 13,
      color: theme.textSecondary,
      fontWeight: "500",
      textAlign: "center",
      paddingHorizontal: 50,
      lineHeight: 19,
    },

    version: {
      fontSize: 12,
      color: theme.textSecondary,
      textAlign: "center",
      marginTop: 26,
      fontWeight: "600",
    },
  });
