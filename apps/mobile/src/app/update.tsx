/**
 * 업데이트 히스토리.
 *
 * 맨 위에 지금 쓰고 있는 버전을 크게 보여주고(최신인지 아닌지 한눈에),
 * 아래로 버전별 변경 내역을 타임라인으로 쌓는다.
 */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { CHANGELOG, TAG_LOOK, parseItem } from "@/constants/changelog";
import { APP_VERSION } from "@/mocks/settings.mock";

type Styles = ReturnType<typeof getStyles>;

/**
 * 실제로 돌고 있는 버전. app.json 의 version 이 진짜라서 그걸 먼저 본다.
 * (개발 빌드에서 비어 있을 수 있어 상수로 폴백)
 */
const runningVersion = Constants.expoConfig?.version ?? APP_VERSION;

/** "1.2.10" 같은 걸 숫자로 비교. 문자열 비교하면 1.2.10 < 1.2.9 가 된다 */
const cmp = (a: string, b: string) => {
  const pa = a.split(".").map((n) => parseInt(n, 10) || 0);
  const pb = b.split(".").map((n) => parseInt(n, 10) || 0);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (d !== 0) return d;
  }
  return 0;
};

export default function UpdateScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = getStyles(theme);

  const latest = CHANGELOG[0]?.version ?? runningVersion;
  const upToDate = cmp(runningVersion, latest) >= 0;

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
        <Text style={s.headerTitle}>{t("settings.items.update.title")}</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 지금 버전 */}
        <View style={s.hero}>
          <Image
            source={require("../../assets/images/icon.png")}
            style={s.logo}
          />
          <Text style={s.heroVersion}>v{runningVersion}</Text>
          <View
            style={[
              s.statusPill,
              upToDate
                ? { backgroundColor: "#D7F5E5" }
                : { backgroundColor: "#FFF4D6" },
            ]}
          >
            <Ionicons
              name={upToDate ? "checkmark-circle" : "arrow-up-circle"}
              size={15}
              color={upToDate ? "#1DBB7F" : "#E2A83A"}
            />
            <Text
              style={[
                s.statusText,
                { color: upToDate ? "#1DBB7F" : "#B4820F" },
              ]}
            >
              {upToDate
                ? t("update.upToDate")
                : t("update.outdated", { version: latest })}
            </Text>
          </View>
        </View>

        {/* 타임라인 */}
        {CHANGELOG.map((entry, idx) => {
          const items = t(`update.notes.${entry.key}.items`, {
            returnObjects: true,
          }) as unknown;
          const list = Array.isArray(items) ? (items as string[]) : [];
          const isCurrent = cmp(entry.version, runningVersion) === 0;

          return (
            <View key={entry.key} style={s.entry}>
              {/* 왼쪽 타임라인 축 */}
              <View style={s.rail}>
                <View
                  style={[
                    s.dot,
                    isCurrent && { backgroundColor: theme.primary },
                  ]}
                />
                {idx < CHANGELOG.length - 1 && <View style={s.line} />}
              </View>

              <View style={s.entryBody}>
                <View style={s.entryHead}>
                  <Text style={s.version}>v{entry.version}</Text>
                  {isCurrent && (
                    <View style={s.currentBadge}>
                      <Text style={s.currentBadgeText}>
                        {t("update.current")}
                      </Text>
                    </View>
                  )}
                  <Text style={s.date}>{entry.date}</Text>
                </View>

                <View style={s.card}>
                  {list.length === 0 ? (
                    <Text style={s.itemText}>{t("update.noNotes")}</Text>
                  ) : (
                    list.map((raw, i) => {
                      const { tag, text } = parseItem(raw);
                      const look = TAG_LOOK[tag];
                      return (
                        <View
                          key={i}
                          style={[s.item, i > 0 && { marginTop: 12 }]}
                        >
                          <View style={[s.tag, { backgroundColor: look.bg }]}>
                            <Text style={[s.tagText, { color: look.color }]}>
                              {t(`update.tags.${tag}`)}
                            </Text>
                          </View>
                          <Text style={s.itemText}>{text}</Text>
                        </View>
                      );
                    })
                  )}
                </View>
              </View>
            </View>
          );
        })}

        <Text style={s.footer}>{t("update.footer")}</Text>
      </ScrollView>
    </View>
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
      paddingBottom: 8,
    },
    headerTitle: { fontSize: 22, fontWeight: "700", color: theme.text },

    hero: { alignItems: "center", paddingTop: 18, paddingBottom: 26 },
    logo: {
      width: 86,
      height: 86,
      borderRadius: 26,
      marginBottom: 14,
    },
    heroVersion: { fontSize: 24, fontWeight: "900", color: theme.text },
    statusPill: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 99,
      marginTop: 10,
    },
    statusText: { fontSize: 13, fontWeight: "800" },

    entry: { flexDirection: "row", paddingHorizontal: 20 },
    rail: { width: 26, alignItems: "center" },
    dot: {
      width: 11,
      height: 11,
      borderRadius: 6,
      backgroundColor: theme.border,
      marginTop: 6,
    },
    // 축이 카드 아래까지 이어져야 끊긴 것처럼 안 보인다
    line: { flex: 1, width: 2, backgroundColor: theme.border, marginTop: 4 },

    entryBody: { flex: 1, paddingBottom: 20 },
    entryHead: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 10,
    },
    version: { fontSize: 17, fontWeight: "800", color: theme.text },
    currentBadge: {
      backgroundColor: theme.primary,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 7,
    },
    currentBadgeText: { fontSize: 11, fontWeight: "800", color: "#fff" },
    date: {
      flex: 1,
      textAlign: "right",
      fontSize: 12,
      fontWeight: "600",
      color: theme.textSecondary,
    },

    card: {
      backgroundColor: theme.surface,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: theme.border,
      padding: 16,
    },
    item: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
    tag: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 7,
      minWidth: 46,
      alignItems: "center",
    },
    tagText: { fontSize: 11, fontWeight: "800" },
    itemText: {
      flex: 1,
      fontSize: 14,
      lineHeight: 21,
      color: theme.text,
      fontWeight: "500",
    },

    footer: {
      fontSize: 12,
      color: theme.textSecondary,
      textAlign: "center",
      marginTop: 8,
      fontWeight: "500",
    },
  });
