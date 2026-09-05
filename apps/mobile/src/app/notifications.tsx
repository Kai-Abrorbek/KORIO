import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Switch,
  ScrollView,
  Modal,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import * as Haptics from "@/utils/haptics";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import {
  useSettingsStore,
  type NotificationPrefs,
} from "@/store/settings.store";
import { PushApi } from "@/services/push.service";

const fmtHour = (h: number) => `${String(h).padStart(2, "0")}:00`;

function ToggleRow({
  icon,
  iconColor,
  iconBg,
  label,
  desc,
  value,
  onValueChange,
  disabled,
  theme,
  s,
}: {
  icon: string;
  iconColor: string;
  iconBg: string;
  label: string;
  desc?: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
  disabled?: boolean;
  theme: ThemeColors;
  s: ReturnType<typeof getStyles>;
}) {
  return (
    <View style={[s.row, disabled && { opacity: 0.4 }]}>
      <View style={[s.iconSq, { backgroundColor: iconBg }]}>
        <Ionicons name={icon as any} size={20} color={iconColor} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={s.rowLabel}>{label}</Text>
        {desc ? <Text style={s.rowDesc}>{desc}</Text> : null}
      </View>
      <Switch
        value={value}
        disabled={disabled}
        onValueChange={(v) => {
          Haptics.selectionAsync();
          onValueChange(v);
        }}
        trackColor={{ false: theme.border, true: theme.primary }}
        thumbColor="#fff"
        ios_backgroundColor={theme.border}
      />
    </View>
  );
}

export default function NotificationSettings() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = getStyles(theme);
  const { notifications: n, setNotifications } = useSettingsStore();
  const [pickerOpen, setPickerOpen] = useState(false);

  /**
   * 스위치 하나 = 로컬 저장 + 서버 저장.
   *
   * ⚠️ 로컬에만 저장하면 알림은 계속 온다. 보낼지 말지를 정하는 건 앱이 아니라
   * 서버 크론이라서, 서버가 이 값을 모르면 꺼도 소용이 없다.
   * 서버 저장이 실패해도 화면은 그대로 둔다 — 다음에 열 때 다시 보낸다.
   */
  const patch = (p: Partial<NotificationPrefs>) => {
    setNotifications(p);
    PushApi.updateSettings(p).catch(() => {});
  };

  const off = !n.master;

  return (
    <View style={[s.container, { paddingTop: insets.top + 4 }]}>
      <View style={s.header}>
        <TouchableOpacity
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/")
          }
          hitSlop={10}
        >
          <Ionicons name="chevron-back" size={28} color={theme.text} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>
          {t("settings.items.notifications.title")}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 마스터 */}
        <View style={[s.card, { marginTop: 8 }]}>
          <ToggleRow
            icon="notifications"
            iconColor="#45B7D1"
            iconBg="#D5F0F5"
            label={t("settings.notifications.master")}
            desc={t("settings.notifications.masterDesc")}
            value={n.master}
            onValueChange={(v) => patch({ master: v })}
            theme={theme}
            s={s}
          />
        </View>

        {/* 학습 */}
        <Text style={s.sectionLabel}>
          {t("settings.notifications.learningSection")}
        </Text>
        <View style={s.card}>
          <ToggleRow
            icon="alarm"
            iconColor="#F4B860"
            iconBg="#FFF4D6"
            label={t("settings.notifications.daily")}
            desc={t("settings.notifications.dailyDesc")}
            value={n.daily}
            disabled={off}
            onValueChange={(v) => patch({ daily: v })}
            theme={theme}
            s={s}
          />
          {n.master && n.daily && (
            <Animated.View entering={FadeIn.duration(200)}>
              <View style={s.rowDivider} />
              <TouchableOpacity
                style={s.timeRow}
                activeOpacity={0.6}
                onPress={() => setPickerOpen(true)}
              >
                <Text style={s.timeLabel}>
                  {t("settings.notifications.time")}
                </Text>
                <View style={s.timeRight}>
                  <Text style={s.timeValue}>{fmtHour(n.dailyHour)}</Text>
                  <Ionicons
                    name="chevron-forward"
                    size={18}
                    color={theme.textSecondary}
                  />
                </View>
              </TouchableOpacity>
            </Animated.View>
          )}
          <View style={s.rowDivider} />
          <ToggleRow
            icon="flame"
            iconColor="#FF7043"
            iconBg="#FFE3D6"
            label={t("settings.notifications.streak")}
            desc={t("settings.notifications.streakDesc")}
            value={n.streak}
            disabled={off}
            onValueChange={(v) => patch({ streak: v })}
            theme={theme}
            s={s}
          />
        </View>

        {/* 경쟁·소셜 */}
        <Text style={s.sectionLabel}>
          {t("settings.notifications.socialSection")}
        </Text>
        <View style={s.card}>
          <ToggleRow
            icon="trophy"
            iconColor="#1DBB7F"
            iconBg="#D7F5E5"
            label={t("settings.notifications.league")}
            value={n.league}
            disabled={off}
            onValueChange={(v) => patch({ league: v })}
            theme={theme}
            s={s}
          />
          <View style={s.rowDivider} />
          <ToggleRow
            icon="people"
            iconColor="#A78BFA"
            iconBg="#EBE5FA"
            label={t("settings.notifications.friends")}
            value={n.friends}
            disabled={off}
            onValueChange={(v) => patch({ friends: v })}
            theme={theme}
            s={s}
          />
        </View>

        {/* 기타 */}
        <Text style={s.sectionLabel}>
          {t("settings.notifications.otherSection")}
        </Text>
        <View style={s.card}>
          <ToggleRow
            icon="sparkles"
            iconColor="#FF7AAD"
            iconBg="#FFE0EC"
            label={t("settings.notifications.events")}
            value={n.events}
            disabled={off}
            onValueChange={(v) => patch({ events: v })}
            theme={theme}
            s={s}
          />
        </View>
      </ScrollView>

      {/* 시간 선택 시트 */}
      <Modal
        visible={pickerOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setPickerOpen(false)}
      >
        <View style={s.modalWrap}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setPickerOpen(false)}
          />
          <View style={[s.sheet, { paddingBottom: insets.bottom + 16 }]}>
            <View style={s.grabber} />
            <Text style={s.sheetTitle}>
              {t("settings.notifications.pickTime")}
            </Text>
            <ScrollView style={{ maxHeight: 340 }}>
              {Array.from({ length: 24 }).map((_, h) => {
                const active = n.dailyHour === h;
                return (
                  <TouchableOpacity
                    key={h}
                    style={s.hourRow}
                    activeOpacity={0.6}
                    onPress={() => {
                      Haptics.selectionAsync();
                      patch({ dailyHour: h });
                      setPickerOpen(false);
                    }}
                  >
                    <Text
                      style={[
                        s.hourText,
                        active && { color: theme.primary, fontWeight: "800" },
                      ]}
                    >
                      {fmtHour(h)}
                    </Text>
                    {active && (
                      <Ionicons
                        name="checkmark"
                        size={20}
                        color={theme.primary}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
      paddingBottom: 12,
    },
    headerTitle: { fontSize: 22, fontWeight: "700", color: theme.text },
    sectionLabel: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.textSecondary,
      marginLeft: 32,
      marginBottom: 8,
      marginTop: 22,
    },
    card: {
      backgroundColor: theme.surface,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: theme.border,
      marginHorizontal: 20,
      overflow: "hidden",
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
    rowDivider: {
      height: 1,
      backgroundColor: theme.border,
      marginLeft: 68,
    },
    timeRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 14,
      paddingHorizontal: 16,
      paddingLeft: 68,
    },
    timeLabel: { fontSize: 15, fontWeight: "600", color: theme.text },
    timeRight: { flexDirection: "row", alignItems: "center", gap: 4 },
    timeValue: { fontSize: 16, fontWeight: "700", color: theme.primary },
    modalWrap: { flex: 1, justifyContent: "flex-end" },
    sheet: {
      backgroundColor: theme.surface,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingHorizontal: 20,
      paddingTop: 12,
    },
    grabber: {
      alignSelf: "center",
      width: 40,
      height: 5,
      borderRadius: 99,
      backgroundColor: theme.border,
      marginBottom: 14,
    },
    sheetTitle: {
      fontSize: 18,
      fontWeight: "800",
      color: theme.text,
      marginBottom: 8,
    },
    hourRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 14,
      paddingHorizontal: 4,
    },
    hourText: { fontSize: 17, fontWeight: "600", color: theme.text },
  });
