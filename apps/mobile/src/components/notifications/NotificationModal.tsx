import { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  SectionList,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import Animated, {
  SlideInDown,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import {
  NotificationService,
  AppNotification,
  NotificationType,
} from "@/services/notification.service";

interface Props {
  visible: boolean;
  onClose: () => void;
  /** 읽음 처리 후 배지를 갱신하려고 부모에 알려준다 */
  onUnreadChange?: (count: number) => void;
}

/** 타입별 아이콘과 색. 목록을 훑을 때 종류가 바로 구분되게 */
const LOOK: Record<
  NotificationType,
  { icon: keyof typeof Ionicons.glyphMap; color: string }
> = {
  follow: { icon: "person-add", color: "#776ee2" },
  league_promoted: { icon: "trophy", color: "#1DBB7F" },
  league_demoted: { icon: "trending-down", color: "#FF7A8A" },
  league_result: { icon: "trophy", color: "#1DBB7F" },
  chest: { icon: "gift", color: "#E2A83A" },
  streak: { icon: "flame", color: "#FF7A00" },
  streak_risk: { icon: "alert-circle", color: "#FF7A8A" },
  energy_full: { icon: "flash", color: "#45B7D1" },
  level_up: { icon: "arrow-up-circle", color: "#8C82F0" },
  super_expiring: { icon: "star", color: "#E2A83A" },
  system: { icon: "megaphone", color: "#A6A6B3" },
};

/** "방금 · N분 전 · N시간 전 · 어제 · N일 전" */
function useTimeAgo() {
  const { t } = useTranslation();
  return (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const min = Math.floor(diff / 60000);
    if (min < 1) return t("notifs.justNow");
    if (min < 60) return t("notifs.minAgo", { count: min });
    const hr = Math.floor(min / 60);
    if (hr < 24) return t("notifs.hourAgo", { count: hr });
    const day = Math.floor(hr / 24);
    if (day === 1) return t("notifs.yesterday");
    return t("notifs.dayAgo", { count: day });
  };
}

function Row({
  item,
  theme,
  onPress,
}: {
  item: AppNotification;
  theme: ThemeColors;
  onPress: () => void;
}) {
  const { t } = useTranslation();
  const s = getStyles(theme);
  const timeAgo = useTimeAgo();
  const look = LOOK[item.type] ?? LOOK.system;

  // 팔로우는 상대 얼굴이 아이콘보다 알아보기 쉽다
  const isPerson = item.type === "follow";
  const initial = (item.params?.nickname ?? "?").trim().charAt(0);

  const title = t(`notifs.type.${item.type}.title`, {
    ...(item.params ?? {}),
    defaultValue: "",
  }) as string;
  const body = t(`notifs.type.${item.type}.body`, {
    ...(item.params ?? {}),
    defaultValue: "",
  }) as string;

  return (
    <Pressable
      style={[s.row, !item.isRead && s.rowUnread]}
      onPress={onPress}
      android_ripple={{ color: theme.border }}
    >
      {isPerson ? (
        <View style={[s.avatar, { backgroundColor: theme.border }]}>
          <Text style={s.avatarText}>{initial}</Text>
        </View>
      ) : (
        <View style={[s.avatar, { backgroundColor: look.color + "26" }]}>
          <Ionicons name={look.icon} size={21} color={look.color} />
        </View>
      )}

      <View style={s.rowBody}>
        <Text style={[s.title, item.isRead && s.titleRead]} numberOfLines={2}>
          {title}
        </Text>
        {!!body && (
          <Text style={s.body} numberOfLines={2}>
            {body}
          </Text>
        )}
        <Text style={s.time}>{timeAgo(item.createdAt)}</Text>
      </View>

      {!item.isRead && <View style={s.dot} />}
    </Pressable>
  );
}

export default function NotificationModal({
  visible,
  onClose,
  onUnreadChange,
}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = getStyles(theme);
  const router = useRouter();

  const [items, setItems] = useState<AppNotification[]>([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    NotificationService.list()
      .then((r) => {
        setItems(r.notifications ?? []);
        setUnread(r.unreadCount ?? 0);
        onUnreadChange?.(r.unreadCount ?? 0);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [onUnreadChange]);

  useEffect(() => {
    if (visible) load();
  }, [visible]);

  // 오늘 / 이전으로 나눠서 최근 것이 묻히지 않게
  const sections = useMemo(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const today: AppNotification[] = [];
    const older: AppNotification[] = [];
    for (const n of items) {
      (new Date(n.createdAt) >= start ? today : older).push(n);
    }
    return [
      { key: "today", title: t("notifs.today"), data: today },
      { key: "older", title: t("notifs.earlier"), data: older },
    ].filter((sec) => sec.data.length > 0);
  }, [items, t]);

  const openItem = (n: AppNotification) => {
    if (!n.isRead) {
      setItems((prev) =>
        prev.map((x) => (x.id === n.id ? { ...x, isRead: true } : x)),
      );
      const next = Math.max(0, unread - 1);
      setUnread(next);
      onUnreadChange?.(next);
      NotificationService.markRead(n.id).catch(() => {});
    }
    if (n.link) {
      onClose();
      setTimeout(() => router.push(n.link as any), 220);
    }
  };

  const readAll = () => {
    if (!unread) return;
    setItems((prev) => prev.map((x) => ({ ...x, isRead: true })));
    setUnread(0);
    onUnreadChange?.(0);
    NotificationService.markAllRead().catch(() => {});
  };

  // 아래로 끌어서 닫기
  const dy = useSharedValue(0);
  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: dy.value }],
  }));
  const dragClose = Gesture.Pan()
    .onUpdate((e) => {
      dy.value = Math.max(0, e.translationY);
    })
    .onEnd((e) => {
      if (e.translationY > 90 || e.velocityY > 800) {
        runOnJS(onClose)();
        dy.value = 0;
      } else {
        dy.value = withTiming(0, { duration: 160 });
      }
    });

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Pressable style={s.backdrop} onPress={onClose} />

        <Animated.View
          entering={SlideInDown.duration(240)}
          style={[
            s.sheet,
            sheetStyle,
            { paddingBottom: insets.bottom + 8, maxHeight: "82%" },
          ]}
        >
          <GestureDetector gesture={dragClose}>
            <View style={s.grabZone}>
              <View style={s.grab} />
            </View>
          </GestureDetector>

          <View style={s.header}>
            <View style={s.titleRow}>
              <Text style={s.headTitle}>{t("notifs.title")}</Text>
              {unread > 0 && (
                <View style={s.headBadge}>
                  <Text style={s.headBadgeText}>{unread}</Text>
                </View>
              )}
            </View>
            {unread > 0 && (
              <Pressable onPress={readAll} hitSlop={8}>
                <Text style={s.readAll}>{t("notifs.readAll")}</Text>
              </Pressable>
            )}
          </View>

          {loading ? (
            <View style={s.center}>
              <ActivityIndicator color={theme.primary} />
            </View>
          ) : items.length === 0 ? (
            <View style={s.center}>
              <View style={s.emptyIcon}>
                <Ionicons
                  name="notifications-outline"
                  size={34}
                  color={theme.textSecondary}
                />
              </View>
              <Text style={s.emptyTitle}>{t("notifs.emptyTitle")}</Text>
              <Text style={s.emptyDesc}>{t("notifs.emptyDesc")}</Text>
            </View>
          ) : (
            <SectionList
              sections={sections}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              stickySectionHeadersEnabled={false}
              renderSectionHeader={({ section }) => (
                <Text style={s.sectionHead}>{section.title}</Text>
              )}
              renderItem={({ item }) => (
                <Row
                  item={item}
                  theme={theme}
                  onPress={() => openItem(item)}
                />
              )}
              contentContainerStyle={{ paddingBottom: 12 }}
            />
          )}
        </Animated.View>
      </GestureHandlerRootView>
    </Modal>
  );
}

const getStyles = (theme: ThemeColors) => {
  const isDark = theme.bg === "#15151D";
  const unreadBg = isDark
    ? "rgba(119,110,226,0.09)"
    : "rgba(119,110,226,0.07)";

  return StyleSheet.create({
    backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.45)" },
    sheet: {
      backgroundColor: theme.bg,
      borderTopLeftRadius: 26,
      borderTopRightRadius: 26,
    },

    grabZone: { alignItems: "center", paddingTop: 10, paddingBottom: 8 },
    grab: {
      width: 44,
      height: 5,
      borderRadius: 3,
      backgroundColor: isDark ? theme.border : "#C9C2E8",
    },

    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 18,
      paddingBottom: 6,
    },
    titleRow: { flexDirection: "row", alignItems: "center", gap: 9 },
    headTitle: { fontSize: 21, fontWeight: "900", color: theme.text },
    headBadge: {
      backgroundColor: theme.primary,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 999,
      minWidth: 22,
      alignItems: "center",
    },
    headBadgeText: { color: "#fff", fontSize: 11, fontWeight: "900" },
    readAll: { fontSize: 13, fontWeight: "800", color: theme.primary },

    sectionHead: {
      fontSize: 11,
      fontWeight: "800",
      letterSpacing: 1.1,
      color: theme.textSecondary,
      paddingHorizontal: 18,
      paddingTop: 14,
      paddingBottom: 8,
    },

    // 안 읽음은 세로줄 + 배경 + 점, 세 겹으로 표시해서 훑어도 눈에 걸린다
    row: {
      flexDirection: "row",
      gap: 12,
      paddingVertical: 13,
      paddingHorizontal: 18,
      alignItems: "flex-start",
    },
    rowUnread: {
      backgroundColor: unreadBg,
      borderLeftWidth: 3,
      borderLeftColor: theme.primary,
      paddingLeft: 15,
    },
    avatar: {
      width: 42,
      height: 42,
      borderRadius: 13,
      alignItems: "center",
      justifyContent: "center",
    },
    avatarText: { fontSize: 15, fontWeight: "900", color: theme.text },
    rowBody: { flex: 1, minWidth: 0 },
    title: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.text,
      lineHeight: 20,
    },
    titleRead: { fontWeight: "500", color: theme.textSecondary },
    body: {
      fontSize: 12.5,
      color: theme.textSecondary,
      marginTop: 2,
      lineHeight: 17,
    },
    time: { fontSize: 11, color: theme.textSecondary, marginTop: 5 },
    dot: {
      width: 7,
      height: 7,
      borderRadius: 999,
      backgroundColor: theme.primary,
      marginTop: 7,
    },

    center: { alignItems: "center", justifyContent: "center", paddingVertical: 54 },
    emptyIcon: {
      width: 72,
      height: 72,
      borderRadius: 999,
      backgroundColor: theme.surface,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 14,
    },
    emptyTitle: { fontSize: 16, fontWeight: "800", color: theme.text },
    emptyDesc: {
      fontSize: 13,
      color: theme.textSecondary,
      marginTop: 5,
      textAlign: "center",
      paddingHorizontal: 40,
      lineHeight: 19,
    },
  });
};
