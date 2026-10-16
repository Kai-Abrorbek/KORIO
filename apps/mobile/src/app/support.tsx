import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Pressable } from "@/components/ui/Pressables";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import * as Haptics from "@/utils/haptics";
import { ApiError } from "@/services/api";
import {
  SupportService,
  type SupportCategory,
  type SupportReplyChannel,
  type SupportTicket,
  type SupportTicketList,
} from "@/services/support.service";
import SupportResultModal, { type SupportResult } from "@/components/support/SupportResultModal";
import { SUPPORT_CATEGORY_LOOK as CATEGORY_LOOK, SUPPORT_LIMITS } from "@/components/support/supportLook";

/**
 * 문의하기 — 도움말 "문의하기" 에서 들어온다. 텔레그램 /support 와 같은 화면.
 *
 * - 위: 한글몬 + "답변은 어디로 와요" (이메일 · 텔레그램 봇 · 앱 안)
 * - 분류 · 제목 · 내용 (서버와 같은 최소/최대 글자)
 * - 아래: 내 문의 — 상태, 운영팀 답변
 * - 보내기 버튼은 화면 아래 고정, 결과는 SupportResultModal
 */
const MASCOT = require("../../assets/images/characters/hangulmon_default_float.png");

const categories: SupportCategory[] = ["general", "learning", "billing", "bug", "other"];

const STATUS_LOOK: Record<SupportTicket["status"], { icon: keyof typeof Ionicons.glyphMap; color: string }> = {
  open: { icon: "time", color: "#E2A83A" },
  sending: { icon: "paper-plane", color: "#1899D6" },
  answered: { icon: "checkmark-circle", color: "#1DBB7F" },
};

const REPLY_ICON: Record<SupportReplyChannel, keyof typeof Ionicons.glyphMap> = {
  email: "mail",
  telegram: "paper-plane",
  app: "chatbubble-ellipses",
};

const dateOf = (iso: string | null) => {
  if (!iso) return "";
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
};

export default function SupportScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = useMemo(() => getStyles(theme), [theme]);
  const scrollRef = useRef<ScrollView>(null);
  const historyY = useRef(0);
  const [category, setCategory] = useState<SupportCategory>("general");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [focused, setFocused] = useState<"subject" | "message" | null>(null);
  const [list, setList] = useState<SupportTicketList | null>(null);
  const [listState, setListState] = useState<"loading" | "ready" | "failed">("loading");
  const [sending, setSending] = useState(false);
  // 보낸 결과 — 기본 Alert 대신 SupportResultModal 로 보여준다
  const [result, setResult] = useState<SupportResult | null>(null);

  const load = useCallback(async () => {
    try {
      setList(await SupportService.list());
      setListState("ready");
    } catch {
      // 목록이 안 와도 쓰는 칸은 그대로 쓸 수 있다
      setListState((current) => (current === "ready" ? current : "failed"));
    }
  }, []);
  useEffect(() => {
    void load();
  }, [load]);

  const subjectLen = subject.trim().length;
  const messageLen = message.trim().length;
  const ready = subjectLen >= SUPPORT_LIMITS.subjectMin && messageLen >= SUPPORT_LIMITS.messageMin;

  const submit = async () => {
    if (sending || !ready) return;
    setSending(true);
    const sent = { category, subject: subject.trim(), message: message.trim() };
    try {
      const ticket = await SupportService.create(sent);
      setSubject("");
      setMessage("");
      setList((current) => ({ ...current, items: [ticket, ...(current?.items ?? [])] }));
      setListState("ready");
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setResult({ kind: "sent", category: sent.category, subject: sent.subject });
      void load();
    } catch (e) {
      // 쓴 내용은 지우지 않는다 — 다시 시도하면 그대로 보낸다
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      const limited = e instanceof ApiError && (e.status === 409 || e.status === 429);
      setResult({ kind: limited ? "limit" : "failed" });
    } finally {
      setSending(false);
    }
  };

  const closeResult = () => {
    const wasSent = result?.kind === "sent";
    setResult(null);
    // 방금 보낸 문의가 목록 맨 위에 있다는 걸 보여 준다
    if (wasSent) setTimeout(() => scrollRef.current?.scrollTo({ y: historyY.current - 8, animated: true }), 250);
  };

  const replyTo = list?.replyTo;

  return (
    <KeyboardAvoidingView
      style={[s.screen, { paddingTop: insets.top + 4 }]}
      // 안드로이드는 app.json softwareKeyboardLayoutMode:"resize" 가 창을 줄인다
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={s.header}>
        <Pressable onPress={() => router.back()} hitSlop={10} accessibilityLabel={t("common.back")}>
          <Ionicons name="chevron-back" size={28} color={theme.text} />
        </Pressable>
        <Text style={s.title}>{t("support.title")}</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: 4, paddingBottom: 28 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* 위 카드 */}
        <LinearGradient
          colors={["#7F73EE", "#9A7CF3", "#B48CF5"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={s.hero}
        >
          <View style={s.heroGlow} />
          <View style={s.heroRow}>
            <View style={{ flex: 1 }}>
              <Text style={s.heroTitle}>{t("support.heroTitle")}</Text>
              <Text style={s.heroIntro}>{t("support.intro")}</Text>
            </View>
            <Mascot />
          </View>
          <View style={s.replyTo}>
            <View style={s.replyIcon}>
              <Ionicons
                name={replyTo ? REPLY_ICON[replyTo.channel] : "chatbubble-ellipses"}
                size={16}
                color={theme.primary}
              />
            </View>
            <View style={{ flex: 1 }}>
              {replyTo && <Text style={s.replyText}>{t(`support.replyTo.${replyTo.channel}`)}</Text>}
              {!!replyTo?.email && (
                <Text style={s.replyEmail} numberOfLines={1}>
                  {replyTo.email}
                </Text>
              )}
              <View style={s.replyTime}>
                <Ionicons name="time" size={12} color="rgba(255,255,255,0.8)" />
                <Text style={s.replyTimeText}>{t("support.replyTime")}</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* 분류 */}
        <Text style={s.label}>{t("support.categoryLabel")}</Text>
        <View style={s.cats}>
          {categories.map((item) => {
            const look = CATEGORY_LOOK[item];
            const active = category === item;
            return (
              <Pressable
                key={item}
                onPress={() => {
                  void Haptics.selectionAsync();
                  setCategory(item);
                }}
                accessibilityRole="radio"
                accessibilityState={{ checked: active }}
                style={({ pressed }) => [
                  s.chip,
                  active && { backgroundColor: look.color, borderColor: look.color, borderBottomColor: "rgba(0,0,0,0.22)" },
                  pressed && s.chipPressed,
                ]}
              >
                <Ionicons name={look.icon} size={16} color={active ? "#fff" : look.color} />
                <Text style={[s.chipText, active && { color: "#fff" }]}>{t(`support.category.${item}`)}</Text>
              </Pressable>
            );
          })}
        </View>

        {/* 제목 · 내용 */}
        <View style={s.field}>
          <View style={s.fieldHead}>
            <Text style={s.fieldLabel}>{t("support.subject")}</Text>
            <Text style={s.counter}>{`${subject.length}/${SUPPORT_LIMITS.subjectMax}`}</Text>
          </View>
          <TextInput
            value={subject}
            onChangeText={setSubject}
            onFocus={() => setFocused("subject")}
            onBlur={() => setFocused(null)}
            placeholder={t("support.subjectHint")}
            placeholderTextColor={theme.textSecondary + "B0"}
            maxLength={SUPPORT_LIMITS.subjectMax}
            returnKeyType="next"
            style={[s.input, focused === "subject" && s.inputFocused]}
          />
          <Need len={subjectLen} min={SUPPORT_LIMITS.subjectMin} />
        </View>
        <View style={s.field}>
          <View style={s.fieldHead}>
            <Text style={s.fieldLabel}>{t("support.message")}</Text>
            <Text style={s.counter}>{`${message.length}/${SUPPORT_LIMITS.messageMax}`}</Text>
          </View>
          <TextInput
            value={message}
            onChangeText={setMessage}
            onFocus={() => setFocused("message")}
            onBlur={() => setFocused(null)}
            placeholder={t("support.messageHint")}
            placeholderTextColor={theme.textSecondary + "B0"}
            maxLength={SUPPORT_LIMITS.messageMax}
            multiline
            textAlignVertical="top"
            style={[s.input, s.message, focused === "message" && s.inputFocused]}
          />
          <Need len={messageLen} min={SUPPORT_LIMITS.messageMin} />
        </View>

        {/* 내 문의 */}
        <View style={s.historyHead} onLayout={(e) => (historyY.current = e.nativeEvent.layout.y)}>
          <Text style={s.historyTitle}>{t("support.history")}</Text>
          {!!list?.items.length && (
            <View style={s.count}>
              <Text style={s.countText}>{list.items.length}</Text>
            </View>
          )}
        </View>
        {listState === "loading" ? (
          <View style={s.list}>
            {[0, 1].map((i) => (
              <View key={i} style={[s.skeleton, { opacity: 0.6 }]} />
            ))}
          </View>
        ) : listState === "failed" && !list?.items.length ? (
          <View style={s.emptyBox}>
            <Ionicons name="cloud-offline" size={26} color={theme.textSecondary} />
            <Text style={s.emptyDesc}>{t("support.loadFailed")}</Text>
            <Pressable onPress={() => void load()} style={({ pressed }) => [s.retry, pressed && s.retryPressed]}>
              <Ionicons name="refresh" size={15} color="#fff" />
              <Text style={s.retryText}>{t("common.retry")}</Text>
            </Pressable>
          </View>
        ) : !list?.items.length ? (
          <View style={s.emptyBox}>
            <View style={s.emptyIcon}>
              <Ionicons name="chatbubbles" size={26} color={theme.primary} />
            </View>
            <Text style={s.emptyTitle}>{t("support.empty")}</Text>
            <Text style={s.emptyDesc}>{t("support.emptyDesc")}</Text>
          </View>
        ) : (
          <View style={s.list}>
            {list.items.map((ticket, index) => (
              <TicketCard key={ticket.id} ticket={ticket} index={index} s={s} theme={theme} />
            ))}
          </View>
        )}
      </ScrollView>

      {/* 아래 고정 보내기 */}
      <View style={[s.bottom, { paddingBottom: Math.max(insets.bottom, 12) + 4 }]}>
        <Pressable
          onPress={() => void submit()}
          disabled={!ready || sending}
          style={({ pressed }) => [s.send, ready && s.sendReady, ready && pressed && s.sendPressed]}
        >
          {ready && !sending && <Shine />}
          <Ionicons name={sending ? "hourglass" : "paper-plane"} size={18} color={ready ? "#fff" : theme.textSecondary} />
          <Text style={[s.sendText, ready && { color: "#fff" }]}>
            {sending ? t("support.sending") : t("support.send")}
          </Text>
        </Pressable>
      </View>

      <SupportResultModal
        result={result}
        onClose={closeResult}
        onRetry={() => {
          setResult(null);
          void submit();
        }}
      />
    </KeyboardAvoidingView>
  );
}

/** 최소 글자에 모자라면 몇 자 더인지 (비어 있을 땐 재촉하지 않는다) */
function Need({ len, min }: { len: number; min: number }) {
  const { t } = useTranslation();
  if (len === 0 || len >= min) return null;
  return (
    <Animated.Text entering={FadeIn.duration(180)} style={needStyle}>
      {t("support.minChars", { n: min - len })}
    </Animated.Text>
  );
}
const needStyle = { color: "#E5379B", fontSize: 12, fontWeight: "800" as const, marginTop: 6, marginLeft: 4 };

function Mascot() {
  const reduceMotion = useReducedMotion();
  const bob = useSharedValue(0);
  useEffect(() => {
    if (reduceMotion) return;
    bob.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1400, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1400, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
    );
  }, [bob, reduceMotion]);
  const style = useAnimatedStyle(() => ({ transform: [{ translateY: -6 * bob.value }] }));
  return (
    <Animated.View style={[{ marginRight: -6, marginTop: -6 }, style]}>
      <Image source={MASCOT} style={{ width: 112, height: 100 }} resizeMode="contain" />
    </Animated.View>
  );
}

/** 보내기 버튼 위를 지나가는 빛 */
const shineStyle = { position: "absolute" as const, top: 0, bottom: 0, left: 0, width: 90 };

function Shine() {
  const reduceMotion = useReducedMotion();
  const x = useSharedValue(0);
  useEffect(() => {
    if (reduceMotion) return;
    // 지나가고 → 잠깐 쉬고 → 처음(0)부터 다시 (reverse 없는 withRepeat 는 시작값으로 돌아간다)
    x.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1300, easing: Easing.inOut(Easing.quad) }),
        withTiming(1, { duration: 1300 }),
      ),
      -1,
    );
  }, [x, reduceMotion]);
  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: -120 + x.value * 520 }, { skewX: "-20deg" }],
  }));
  if (reduceMotion) return null;
  return (
    <Animated.View pointerEvents="none" style={[shineStyle, style]}>
      <LinearGradient
        colors={["transparent", "rgba(255,255,255,0.28)", "transparent"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={{ flex: 1 }}
      />
    </Animated.View>
  );
}

function TicketCard({
  ticket,
  index,
  s,
  theme,
}: {
  ticket: SupportTicket;
  index: number;
  s: ReturnType<typeof getStyles>;
  theme: ThemeColors;
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const cat = CATEGORY_LOOK[ticket.category] ?? CATEGORY_LOOK.other;
  const status = STATUS_LOOK[ticket.status] ?? STATUS_LOOK.open;
  const answered = ticket.status === "answered" && !!ticket.reply;
  return (
    <Animated.View
      entering={FadeInDown.duration(320).delay(Math.min(index, 8) * 40)}
      style={[s.ticket, answered && s.ticketAnswered]}
    >
      <Pressable
        onPress={() => {
          void Haptics.selectionAsync();
          setOpen((v) => !v);
        }}
        style={s.ticketMain}
      >
        <View style={s.ticketTop}>
          <View style={[s.catChip, { backgroundColor: cat.color + "24" }]}>
            <Ionicons name={cat.icon} size={12} color={cat.color} />
            <Text style={[s.catChipText, { color: cat.color }]}>{t(`support.category.${ticket.category}`)}</Text>
          </View>
          <View style={s.status}>
            <Ionicons name={status.icon} size={13} color={status.color} />
            <Text style={[s.statusText, { color: status.color }]}>{t(`support.status.${ticket.status}`)}</Text>
          </View>
        </View>
        <Text style={s.ticketSubject}>{ticket.subject}</Text>
        <Text style={s.ticketMessage} numberOfLines={open ? undefined : 2}>
          {ticket.message}
        </Text>
        <View style={s.ticketFoot}>
          <Text style={s.ticketDate}>{dateOf(ticket.createdAt)}</Text>
          <Ionicons name={open ? "chevron-up" : "chevron-down"} size={16} color={theme.textSecondary} />
        </View>
      </Pressable>
      {answered && (
        <View style={s.reply}>
          <View style={s.replyHead}>
            <LinearGradient colors={["#8B7FF0", "#5A50C9"]} style={s.teamAvatar}>
              <Text style={s.teamAvatarText}>K</Text>
            </LinearGradient>
            <Text style={s.teamName}>{t("support.team")}</Text>
            <Text style={s.ticketDate}>{dateOf(ticket.repliedAt)}</Text>
          </View>
          <Text style={s.replyBody}>{ticket.reply}</Text>
        </View>
      )}
    </Animated.View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: theme.bg },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingBottom: 10,
    },
    title: { fontSize: 19, fontWeight: "900", color: theme.text },

    hero: {
      marginHorizontal: 18,
      marginBottom: 22,
      borderRadius: 24,
      paddingTop: 18,
      paddingBottom: 14,
      paddingLeft: 18,
      paddingRight: 12,
      overflow: "hidden",
      borderBottomWidth: 4,
      borderBottomColor: "#5E52D6",
    },
    heroGlow: {
      position: "absolute",
      right: -46,
      top: -40,
      width: 190,
      height: 190,
      borderRadius: 95,
      backgroundColor: "rgba(255,255,255,0.16)",
    },
    heroRow: { flexDirection: "row", alignItems: "center" },
    heroTitle: { color: "#fff", fontSize: 20, lineHeight: 25, fontWeight: "900", marginBottom: 6 },
    heroIntro: { color: "rgba(255,255,255,0.86)", fontSize: 13, lineHeight: 18, fontWeight: "700" },
    replyTo: {
      marginTop: 12,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      backgroundColor: "rgba(255,255,255,0.16)",
      borderRadius: 16,
      paddingVertical: 8,
      paddingLeft: 8,
      paddingRight: 12,
    },
    replyIcon: {
      width: 34,
      height: 34,
      borderRadius: 11,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    replyText: { color: "#fff", fontSize: 13, lineHeight: 17, fontWeight: "900" },
    replyEmail: { color: "#fff", fontSize: 12.5, fontWeight: "800" },
    replyTime: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 1 },
    replyTimeText: { color: "rgba(255,255,255,0.8)", fontSize: 11.5, fontWeight: "700" },

    label: {
      color: theme.textSecondary,
      fontSize: 12.5,
      fontWeight: "900",
      letterSpacing: 0.3,
      marginHorizontal: 22,
      marginBottom: 10,
    },
    cats: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginHorizontal: 18, marginBottom: 20 },
    chip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingVertical: 8,
      paddingLeft: 10,
      paddingRight: 12,
      borderRadius: 14,
      borderWidth: 2,
      borderBottomWidth: 4,
      borderColor: theme.border,
      backgroundColor: theme.surface,
    },
    chipPressed: { borderBottomWidth: 2, transform: [{ translateY: 2 }] },
    chipText: { color: theme.text, fontSize: 13.5, fontWeight: "800" },

    field: { marginHorizontal: 18, marginBottom: 14 },
    fieldHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", marginHorizontal: 4, marginBottom: 7 },
    fieldLabel: { color: theme.text, fontSize: 14, fontWeight: "900" },
    counter: { color: theme.textSecondary, fontSize: 11.5, fontWeight: "700", fontVariant: ["tabular-nums"] },
    input: {
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
      borderRadius: 16,
      paddingHorizontal: 14,
      paddingVertical: 12,
      color: theme.text,
      fontSize: 15,
      fontWeight: "600",
    },
    inputFocused: { borderColor: theme.primary },
    message: { minHeight: 136 },

    historyHead: { flexDirection: "row", alignItems: "center", gap: 8, marginHorizontal: 22, marginTop: 18, marginBottom: 10 },
    historyTitle: { color: theme.text, fontSize: 18, fontWeight: "900" },
    count: { backgroundColor: theme.primary + "29", borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2, minWidth: 24, alignItems: "center" },
    countText: { color: theme.primary, fontSize: 12, fontWeight: "900" },
    list: { marginHorizontal: 18, gap: 12 },
    skeleton: { height: 112, borderRadius: 18, borderWidth: 2, borderColor: theme.border, backgroundColor: theme.surface },

    ticket: {
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderBottomWidth: 4,
      borderColor: theme.border,
      borderRadius: 18,
      overflow: "hidden",
    },
    ticketAnswered: { borderColor: "#1DBB7F66" },
    ticketMain: { paddingTop: 13, paddingHorizontal: 14, paddingBottom: 10 },
    ticketTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 9 },
    catChip: { flexDirection: "row", alignItems: "center", gap: 4, borderRadius: 999, paddingVertical: 4, paddingLeft: 7, paddingRight: 9 },
    catChipText: { fontSize: 11.5, fontWeight: "900" },
    status: { flexDirection: "row", alignItems: "center", gap: 4 },
    statusText: { fontSize: 12, fontWeight: "900" },
    ticketSubject: { color: theme.text, fontSize: 15.5, lineHeight: 21, fontWeight: "900" },
    ticketMessage: { color: theme.textSecondary, fontSize: 13.5, lineHeight: 20, fontWeight: "600", marginTop: 4 },
    ticketFoot: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 8 },
    ticketDate: { color: theme.textSecondary, fontSize: 11.5, fontWeight: "700" },
    reply: {
      backgroundColor: "#1DBB7F17",
      borderTopWidth: 1,
      borderTopColor: "#1DBB7F40",
      paddingTop: 11,
      paddingHorizontal: 14,
      paddingBottom: 13,
    },
    replyHead: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 6 },
    teamAvatar: { width: 24, height: 24, borderRadius: 12, alignItems: "center", justifyContent: "center" },
    teamAvatarText: { color: "#fff", fontSize: 12, fontWeight: "900" },
    teamName: { flex: 1, color: theme.text, fontSize: 13, fontWeight: "900" },
    replyBody: { color: theme.text, fontSize: 14, lineHeight: 21, fontWeight: "600" },

    emptyBox: {
      marginHorizontal: 18,
      borderWidth: 2,
      borderStyle: "dashed",
      borderColor: theme.border,
      borderRadius: 18,
      paddingVertical: 22,
      paddingHorizontal: 26,
      alignItems: "center",
      gap: 4,
    },
    emptyIcon: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: theme.primary + "1F",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 6,
    },
    emptyTitle: { color: theme.text, fontSize: 15, fontWeight: "900" },
    emptyDesc: { color: theme.textSecondary, fontSize: 12.5, lineHeight: 18, fontWeight: "700", textAlign: "center" },
    retry: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginTop: 8,
      backgroundColor: theme.primary,
      borderRadius: 14,
      borderBottomWidth: 3,
      borderBottomColor: "#5A50C9",
      paddingVertical: 9,
      paddingHorizontal: 16,
    },
    retryPressed: { borderBottomWidth: 1, transform: [{ translateY: 2 }] },
    retryText: { color: "#fff", fontSize: 13, fontWeight: "900" },

    bottom: {
      backgroundColor: theme.bg,
      borderTopWidth: 1,
      borderTopColor: theme.border,
      paddingTop: 12,
      paddingHorizontal: 18,
    },
    send: {
      height: 54,
      borderRadius: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: theme.border,
      borderBottomWidth: 4,
      borderBottomColor: "rgba(0,0,0,0.08)",
      overflow: "hidden",
    },
    sendReady: { backgroundColor: theme.primary, borderBottomColor: "#5A50C9" },
    sendPressed: { borderBottomWidth: 2, transform: [{ translateY: 2 }] },
    sendText: { color: theme.textSecondary, fontSize: 16, fontWeight: "900" },
  });
