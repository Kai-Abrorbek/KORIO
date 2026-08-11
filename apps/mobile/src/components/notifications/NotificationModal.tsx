import { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  SectionList,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HaneulmonMascot from "@/components/home/HaneulmonMascot";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import {
  NotificationService,
  AppNotification,
  NotificationType,
} from "@/services/notification.service";

/** 카드와 화면 가장자리 사이 여백 */
const GAP = 16;
/** 벨 아이콘 아래에서 카드가 시작되도록 하는 오프셋 */
const BELL_DROP = 52;

// 펼침이 시작되는 지점 = 홈 헤더의 벨 아이콘 (우상단)
const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");
const ORIGIN_X = SCREEN_W - 40;
const ORIGIN_Y = 0;

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
  const s = getStyles(theme);
  const insets = useSafeAreaInsets();
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

  // 우상단 벨 아이콘에서 펼쳐지듯 열린다.
  // transformOrigin 이 없으므로 (이동 → 축소 → 되돌리기) 순서로 흉내낸다.
  const open = useSharedValue(0);

  useEffect(() => {
    open.value = withTiming(visible ? 1 : 0, {
      duration: visible ? 240 : 160,
      easing: visible ? Easing.out(Easing.cubic) : Easing.in(Easing.quad),
    });
  }, [visible]);

  const cardStyle = useAnimatedStyle(() => {
    const s = 0.55 + open.value * 0.45; // 0.55 → 1
    return {
      opacity: open.value,
      transform: [
        { translateX: ORIGIN_X },
        { translateY: ORIGIN_Y },
        { scale: s },
        { translateX: -ORIGIN_X },
        { translateY: -ORIGIN_Y },
      ],
    };
  });

  const backdropStyle = useAnimatedStyle(() => ({ opacity: open.value }));

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={s.root}>
        <Animated.View style={[s.backdropFill, backdropStyle]}>
          <Pressable style={{ flex: 1 }} onPress={onClose} />
        </Animated.View>

        <Animated.View
          style={[
            s.card,
            cardStyle,
            {
              // 벨 아이콘 바로 아래에서 시작
              marginTop: insets.top + BELL_DROP,
              minHeight: SCREEN_H * 0.4,
              maxHeight: SCREEN_H * 0.74,
            },
          ]}
        >
          <View style={s.header}>
            <View style={s.titleRow}>
              <Text style={s.headTitle} numberOfLines={1}>
                {t("notifs.title")}
              </Text>
              {unread > 0 && (
                <View style={s.headBadge}>
                  <Text style={s.headBadgeText}>{unread}</Text>
                </View>
              )}
            </View>
            <View style={s.headActions}>
              {/* 텍스트로 두면 어떤 언어에서든 헤더를 밀어낸다 → 아이콘으로 */}
              {unread > 0 && (
                <Pressable
                  onPress={readAll}
                  hitSlop={12}
                  accessibilityLabel={t("notifs.readAll")}
                  style={({ pressed }) => [
                    s.iconBtn,
                    s.readAllBtn,
                    pressed && s.iconBtnPressed,
                  ]}
                >
                  <Ionicons
                    name="checkmark-done"
                    size={18}
                    color={theme.primary}
                  />
                </Pressable>
              )}
              <Pressable
                onPress={onClose}
                hitSlop={12}
                style={({ pressed }) => [
                  s.iconBtn,
                  pressed && s.iconBtnPressed,
                ]}
              >
                <Ionicons name="close" size={17} color={theme.textSecondary} />
              </Pressable>
            </View>
          </View>

          {loading ? (
            <View style={s.center}>
              <ActivityIndicator color={theme.primary} />
            </View>
          ) : items.length === 0 ? (
            <View style={s.center}>
              {/* 새 소식이 없는 조용한 상태 */}
              <HaneulmonMascot size={96} mood="sleepy" />
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
                <Row item={item} theme={theme} onPress={() => openItem(item)} />
              )}
              contentContainerStyle={{ paddingBottom: 12 }}
            />
          )}
        </Animated.View>
      </View>
    </Modal>
  );
}

const getStyles = (theme: ThemeColors) => {
  const isDark = theme.bg === "#15151D";
  const unreadBg = isDark ? "rgba(119,110,226,0.09)" : "rgba(119,110,226,0.07)";

  return StyleSheet.create({
    // 가운데가 아니라 벨 아이콘 높이에서 시작해 아래로 펼쳐진다
    root: { flex: 1 },
    backdropFill: {
      ...StyleSheet.absoluteFill,
      backgroundColor: "rgba(0,0,0,0.45)",
    },
    // 내용만큼만 커지고, 길면 화면의 78% 에서 멈춘다.
    // flex:1 로 두면 알림이 하나도 없어도 카드가 꽉 차버린다.
    card: {
      marginHorizontal: GAP,
      backgroundColor: theme.bg,
      borderRadius: 24,
      overflow: "hidden",
      borderWidth: isDark ? 1 : 0,
      borderColor: theme.border,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: isDark ? 0.5 : 0.22,
      shadowRadius: 26,
      elevation: 16,
    },
    headActions: { flexDirection: "row", alignItems: "center", gap: 8 },
    iconBtn: {
      width: 32,
      height: 32,
      borderRadius: 999,
      backgroundColor: isDark ? "rgba(255,255,255,0.07)" : "#F0EEF9",
      alignItems: "center",
      justifyContent: "center",
    },
    readAllBtn: {
      backgroundColor: isDark
        ? "rgba(119,110,226,0.20)"
        : "rgba(119,110,226,0.12)",
    },
    iconBtnPressed: {
      backgroundColor: isDark ? "rgba(255,255,255,0.14)" : "#E2DEF3",
      transform: [{ scale: 0.92 }],
    },

    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 18,
      paddingTop: 20, // 위에 딱 붙지 않게
      paddingBottom: 10,
    },
    titleRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      flexShrink: 1,
    },
    headTitle: { fontSize: 19, fontWeight: "900", color: theme.text },
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

    center: {
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 26,
      paddingBottom: 40,
    },
    emptyIcon: {
      width: 64,
      height: 64,
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
