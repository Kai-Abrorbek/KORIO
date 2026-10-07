/**
 * 업데이트 히스토리.
 *
 * 맨 위에 설치된 버전과 스토어 최신 여부(업데이트 버튼), 아래로 날짜별
 * 변경 내역을 타임라인으로 쌓는다. 내용은 서버(GET /app/releases)에서 온다 —
 * 예전엔 앱 안에 박힌 가짜 목록이었다. 앱 업데이트 없이 서버 배포만으로 늘어난다.
 * 버전 배지는 스토어에 새 빌드가 올라간 날에만 붙는다 (나머지는 OTA).
 */
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import PrimaryButton from "@/components/ui/PrimaryButton";
import {
  appReleaseService,
  installedVersion,
  openStore,
  type AppRelease,
  type AppVersionInfo,
  type ReleaseTag,
} from "@/services/app-release.service";

const TAG_LOOK: Record<ReleaseTag, { color: string; bg: string }> = {
  new: { color: "#1DBB7F", bg: "#D7F5E5" },
  improve: { color: "#45B7D1", bg: "#D5F0F5" },
  fix: { color: "#FF7043", bg: "#FFE3D6" },
};

/** "2026-09-30" → 지금 언어의 날짜. 시간대 때문에 하루 밀리지 않게 정오로 읽는다 */
const formatDate = (date: string, lang: string) => {
  const d = new Date(`${date}T12:00:00`);
  if (Number.isNaN(d.getTime())) return date;
  try {
    return d.toLocaleDateString(lang, { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return date;
  }
};

export default function UpdateScreen() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = getStyles(theme);
  const lang = (i18n.language ?? "uz").slice(0, 2);

  const [releases, setReleases] = useState<AppRelease[] | null>(null);
  const [version, setVersion] = useState<AppVersionInfo | null>(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let alive = true;
    setFailed(false);
    Promise.all([
      appReleaseService.releases(lang),
      // 버전 확인이 실패해도 히스토리는 보여준다
      appReleaseService.version().catch(() => null),
    ])
      .then(([r, v]) => {
        if (!alive) return;
        setReleases(r.releases);
        setVersion(v);
      })
      .catch(() => {
        if (alive) setFailed(true);
      });
    return () => {
      alive = false;
    };
  }, [lang, attempt]);

  const outdated = !!version?.updateAvailable;

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
            source={require("../../assets/images/korio-icon.png")}
            style={s.logo}
          />
          <Text style={s.heroVersion}>v{installedVersion}</Text>
          {version ? (
            <View
              style={[
                s.statusPill,
                { backgroundColor: outdated ? "#FFF4D6" : "#D7F5E5" },
              ]}
            >
              <Ionicons
                name={outdated ? "arrow-up-circle" : "checkmark-circle"}
                size={15}
                color={outdated ? "#E2A83A" : "#1DBB7F"}
              />
              <Text
                style={[s.statusText, { color: outdated ? "#B4820F" : "#1DBB7F" }]}
              >
                {outdated
                  ? t("update.outdated", { version: version.latestVersion })
                  : t("update.upToDate")}
              </Text>
            </View>
          ) : null}
          {outdated && version ? (
            <PrimaryButton
              label={t("update.prompt.cta")}
              color={theme.primary}
              darkColor="#5B52C4"
              onPress={() => void openStore(version.storeUrl)}
              style={s.heroCta}
            />
          ) : null}
        </View>

        {failed ? (
          <View style={s.stateBox}>
            <Ionicons name="cloud-offline-outline" size={30} color={theme.textSecondary} />
            <Text style={s.stateText}>{t("update.loadFailed")}</Text>
            <TouchableOpacity style={s.retry} onPress={() => setAttempt((n) => n + 1)}>
              <Text style={s.retryText}>{t("update.retry")}</Text>
            </TouchableOpacity>
          </View>
        ) : !releases ? (
          <ActivityIndicator style={{ marginTop: 30 }} color={theme.primary} />
        ) : (
          releases.map((entry, idx) => (
            <Animated.View
              key={entry.id}
              entering={FadeInDown.delay(Math.min(idx, 6) * 60).duration(260)}
              style={s.entry}
            >
              {/* 왼쪽 타임라인 축 */}
              <View style={s.rail}>
                <View style={[s.dot, idx === 0 && s.dotLatest]} />
                {idx < releases.length - 1 && <View style={s.line} />}
              </View>

              <View style={s.entryBody}>
                <View style={s.entryHead}>
                  <Text style={s.version}>{formatDate(entry.date, lang)}</Text>
                  {entry.storeVersion ? (
                    <View style={s.versionBadge}>
                      <Text style={s.versionBadgeText}>v{entry.storeVersion}</Text>
                    </View>
                  ) : null}
                  {idx === 0 ? (
                    <View style={s.currentBadge}>
                      <Text style={s.currentBadgeText}>{t("update.latest")}</Text>
                    </View>
                  ) : null}
                </View>

                <View style={s.card}>
                  {entry.items.map((item, i) => {
                    const look = TAG_LOOK[item.tag] ?? TAG_LOOK.improve;
                    return (
                      <View key={i} style={[s.item, i > 0 && { marginTop: 12 }]}>
                        <View style={[s.tag, { backgroundColor: look.bg }]}>
                          <Text style={[s.tagText, { color: look.color }]}>
                            {t(`update.tags.${item.tag}`)}
                          </Text>
                        </View>
                        <Text style={s.itemText}>{item.text}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            </Animated.View>
          ))
        )}

        {releases ? <Text style={s.footer}>{t("update.footer")}</Text> : null}
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
    heroCta: { alignSelf: "stretch", marginHorizontal: 40, marginTop: 16 },
    stateBox: { alignItems: "center", gap: 10, paddingTop: 30 },
    stateText: { fontSize: 14, fontWeight: "600", color: theme.textSecondary },
    retry: {
      paddingHorizontal: 18,
      paddingVertical: 9,
      borderRadius: 99,
      backgroundColor: theme.primary,
    },
    retryText: { fontSize: 14, fontWeight: "800", color: "#fff" },

    entry: { flexDirection: "row", paddingHorizontal: 20 },
    rail: { width: 26, alignItems: "center" },
    dot: {
      width: 11,
      height: 11,
      borderRadius: 6,
      backgroundColor: theme.border,
      marginTop: 6,
    },
    dotLatest: { backgroundColor: theme.primary },
    // 축이 카드 아래까지 이어져야 끊긴 것처럼 안 보인다
    line: { flex: 1, width: 2, backgroundColor: theme.border, marginTop: 4 },

    entryBody: { flex: 1, paddingBottom: 20 },
    entryHead: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 10,
    },
    version: { fontSize: 16, fontWeight: "800", color: theme.text },
    currentBadge: {
      backgroundColor: theme.primary,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 7,
    },
    currentBadgeText: { fontSize: 11, fontWeight: "800", color: "#fff" },
    versionBadge: {
      backgroundColor: theme.primary + "1F",
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 7,
    },
    versionBadgeText: { fontSize: 11, fontWeight: "800", color: theme.primary },

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
