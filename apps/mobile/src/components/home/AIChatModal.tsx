import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Keyboard,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import BoriMascot from "./BoriMascot";
import { AiService } from "@/services/ai.service";

interface Message {
  id: string;
  who: "ai" | "user";
  text: string;
  translation?: string;
  correction?: { wrong: string; right: string; note?: string };
  time: string;
}

interface AIChatModalProps {
  visible: boolean;
  onClose: () => void;
  prefill?: string;
}

function nowTime() {
  const d = new Date();
  const hh = d.getHours();
  const mm = d.getMinutes();
  return `${hh}:${mm.toString().padStart(2, "0")}`;
}

function timeOf(iso?: string) {
  const d = iso ? new Date(iso) : new Date();
  return `${d.getHours()}:${d.getMinutes().toString().padStart(2, "0")}`;
}

/** 서버 DTO → 화면 메시지 */
function toMessage(m: {
  id: string;
  who: "ai" | "user";
  text: string;
  translation?: string;
  correction?: { wrong: string; right: string; note?: string };
  createdAt?: string;
}): Message {
  return {
    id: m.id,
    who: m.who,
    text: m.text,
    translation: m.translation,
    correction: m.correction,
    time: timeOf(m.createdAt),
  };
}

// ─── 타이핑 인디케이터 (점 3개 통통) ───
function TypingIndicator({ theme }: { theme: ThemeColors }) {
  const d1 = useSharedValue(0.4);
  const d2 = useSharedValue(0.4);
  const d3 = useSharedValue(0.4);

  useEffect(() => {
    const make = (sv: any, delay: number) => {
      sv.value = withDelay(
        delay,
        withRepeat(
          withSequence(
            withTiming(1, { duration: 360, easing: Easing.inOut(Easing.ease) }),
            withTiming(0.4, {
              duration: 360,
              easing: Easing.inOut(Easing.ease),
            }),
          ),
          -1,
          false,
        ),
      );
    };
    make(d1, 0);
    make(d2, 120);
    make(d3, 240);
  }, []);

  const s1 = useAnimatedStyle(() => ({
    opacity: d1.value,
    transform: [{ scale: 0.7 + d1.value * 0.3 }],
  }));
  const s2 = useAnimatedStyle(() => ({
    opacity: d2.value,
    transform: [{ scale: 0.7 + d2.value * 0.3 }],
  }));
  const s3 = useAnimatedStyle(() => ({
    opacity: d3.value,
    transform: [{ scale: 0.7 + d3.value * 0.3 }],
  }));

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 4,
        paddingVertical: 6,
        paddingHorizontal: 4,
      }}
    >
      <Animated.View
        style={[
          {
            width: 7,
            height: 7,
            borderRadius: 4,
            backgroundColor: theme.primary,
          },
          s1,
        ]}
      />
      <Animated.View
        style={[
          {
            width: 7,
            height: 7,
            borderRadius: 4,
            backgroundColor: theme.primary,
          },
          s2,
        ]}
      />
      <Animated.View
        style={[
          {
            width: 7,
            height: 7,
            borderRadius: 4,
            backgroundColor: theme.primary,
          },
          s3,
        ]}
      />
    </View>
  );
}

// ─── AI 아바타 (작은 동그라미) ───
function AIAvatar() {
  return (
    <View
      style={{
        width: 32,
        height: 32,
        borderRadius: 16,
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <BoriMascot size={32} />
    </View>
  );
}

export default function AIChatModal({
  visible,
  onClose,
  prefill = "",
}: AIChatModalProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = getStyles(theme);

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState(prefill);
  const [isTyping, setIsTyping] = useState(false);
  const [kbHeight, setKbHeight] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const inputRef = useRef<TextInput>(null);

  // prefill 들어오면 반영
  useEffect(() => {
    if (prefill) setDraft(prefill);
  }, [prefill]);

  // 열릴 때 대화 기록 로드
  useEffect(() => {
    if (!visible) return;
    setLoading(true);
    AiService.getHistory()
      .then((d: any) => setMessages((d.messages ?? []).map(toMessage)))
      .catch((err: any) => console.error("대화 기록 로드 실패:", err))
      .finally(() => setLoading(false));
  }, [visible]);

  // 메시지 추가될 때마다 맨 아래로 스크롤
  useEffect(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    });
  }, [messages, isTyping]);

  // 키보드 높이 직접 추적.
  // RN Modal 은 Android 에서 별도 윈도우라 adjustResize 가 안 먹고,
  // statusBarTranslucent 까지 겹쳐 창이 줄지 않는다. 그래서 패딩으로 직접 밀어준다.
  useEffect(() => {
    const showEvt =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvt =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSub = Keyboard.addListener(showEvt, (e) => {
      // height 대신 화면 기준 위치로 계산한다.
      // 삼성 등 일부 키보드는 상단 툴바 높이를 height 에 포함하지 않아서
      // height 만 쓰면 툴바만큼 덜 밀려 입력창이 가려진다.
      // screen(= 네비게이션 바 포함) 높이에서 키보드 상단 Y 를 빼면 실제 가려지는 높이.
      const screenH = Dimensions.get("screen").height;
      const kbTop = e.endCoordinates?.screenY ?? screenH;
      const occluded = Math.max(0, Math.round(screenH - kbTop));
      setKbHeight(occluded || e.endCoordinates?.height || 0);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 60);
    });
    const hideSub = Keyboard.addListener(hideEvt, () => setKbHeight(0));

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const send = async (text?: string) => {
    const content = (text ?? draft).trim();
    if (!content || isTyping) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    setDraft("");

    // 낙관적 렌더 — 서버 왕복을 기다리지 않고 바로 보여준다
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, who: "user", text: content, time: nowTime() },
    ]);

    setIsTyping(true);
    try {
      const { reply } = await AiService.sendMessage(content);
      if (reply) setMessages((prev) => [...prev, toMessage(reply)]);
    } catch (err) {
      console.error("메시지 전송 실패:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          who: "ai",
          text: t("aiChat.errorReply"),
          time: nowTime(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const canSend = draft.trim().length > 0;
  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      presentationStyle="fullScreen"
      statusBarTranslucent
    >
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* ─── 헤더 (고정) ─── */}
        <LinearGradient
          colors={["#8B7BFF", "#776ee2", "#5448E0"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <TouchableOpacity
            onPress={onClose}
            hitSlop={10}
            style={styles.headerBtn}
          >
            <Ionicons name="chevron-back" size={26} color="#fff" />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <View style={styles.avatarLarge}>
              <BoriMascot size={42} />
              <View style={styles.onlineDot} />
            </View>
            <View>
              <Text style={styles.headerName}>{t("aiChat.teacherName")}</Text>
              <View style={styles.onlineRow}>
                <View style={styles.onlineDotSmall} />
                <Text style={styles.onlineText}>{t("aiChat.online")}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity hitSlop={10} style={styles.headerBtn}>
            <Ionicons
              name="ellipsis-vertical"
              size={20}
              color="rgba(255,255,255,0.85)"
            />
          </TouchableOpacity>
        </LinearGradient>

        {/* ─── 메시지 + 입력바 (키보드 높이만큼 밀림) ─── */}
        <View style={[styles.kbWrap, { paddingBottom: kbHeight }]}>
          {/* 메시지 리스트 */}
          <ScrollView
            ref={scrollRef}
            style={styles.messageList}
            contentContainerStyle={styles.messageListContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
          >
            {loading ? (
              <View style={styles.centerState}>
                <ActivityIndicator color={theme.primary} />
              </View>
            ) : messages.length === 0 ? (
              <View style={styles.centerState}>
                <Text style={styles.emptyText}>{t("aiChat.emptyHint")}</Text>
              </View>
            ) : (
              <View style={styles.dateBadge}>
                <Text style={styles.dateBadgeText}>{t("aiChat.today")}</Text>
              </View>
            )}

            {messages.map((msg) =>
              msg.who === "ai" ? (
                <View key={msg.id} style={styles.aiRow}>
                  <AIAvatar />
                  <View style={styles.aiContent}>
                    <View style={styles.aiBubble}>
                      <View style={styles.aiBubbleTop}>
                        <Text style={styles.aiBubbleText}>{msg.text}</Text>
                        <TouchableOpacity style={styles.listenBtn} hitSlop={6}>
                          <Ionicons
                            name="volume-medium"
                            size={15}
                            color={theme.primary}
                          />
                        </TouchableOpacity>
                      </View>
                      {msg.translation && (
                        <Text style={styles.translationText}>
                          {msg.translation}
                        </Text>
                      )}
                    </View>
                    {msg.correction && (
                      <View style={styles.correctionCard}>
                        <View style={styles.correctionHeader}>
                          <Ionicons
                            name="sparkles"
                            size={13}
                            color={theme.primary}
                          />
                          <Text style={styles.correctionTitle}>
                            {t("aiChat.correctionTitle")}
                          </Text>
                        </View>
                        <View style={styles.correctionBody}>
                          <Text style={styles.correctionWrong}>
                            {msg.correction.wrong}
                          </Text>
                          <Ionicons
                            name="arrow-forward"
                            size={14}
                            color={theme.textSecondary}
                          />
                          <Text style={styles.correctionRight}>
                            {msg.correction.right}
                          </Text>
                        </View>
                        {msg.correction.note && (
                          <Text style={styles.correctionNote}>
                            {msg.correction.note}
                          </Text>
                        )}
                      </View>
                    )}
                    <Text style={styles.timeStampLeft}>{msg.time}</Text>
                  </View>
                </View>
              ) : (
                <View key={msg.id} style={styles.userRow}>
                  <View style={styles.userBubble}>
                    <Text style={styles.userBubbleText}>{msg.text}</Text>
                  </View>
                  <Text style={styles.timeStampRight}>{msg.time}</Text>
                </View>
              ),
            )}

            {/* 타이핑 인디케이터 */}
            {isTyping && (
              <View style={styles.aiRow}>
                <AIAvatar />
                <View style={styles.typingBubble}>
                  <TypingIndicator theme={theme} />
                </View>
              </View>
            )}
          </ScrollView>

          {/* 입력바 */}
          <View
            style={[
              styles.inputBar,
              {
                paddingBottom: kbHeight > 0 ? 10 : Math.max(insets.bottom, 10),
              },
            ]}
          >
            <TouchableOpacity style={styles.attachBtn} hitSlop={6}>
              <Ionicons name="add" size={22} color={theme.primary} />
            </TouchableOpacity>

            <View style={styles.inputWrap}>
              <TextInput
                ref={inputRef}
                style={styles.input}
                placeholder={t("aiChat.inputPlaceholder")}
                placeholderTextColor={theme.textSecondary}
                value={draft}
                onChangeText={setDraft}
                onSubmitEditing={() => send()}
                multiline
                maxLength={500}
              />
              <TouchableOpacity style={styles.micBtn} hitSlop={6}>
                <Ionicons name="mic" size={18} color={theme.primary} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[
                styles.sendBtn,
                {
                  backgroundColor: canSend ? theme.primary : theme.border,
                  transform: [{ scale: canSend ? 1 : 0.92 }],
                },
              ]}
              onPress={() => send()}
              activeOpacity={0.85}
              disabled={!canSend}
            >
              <Ionicons name="arrow-up" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
    },
    kbWrap: {
      flex: 1,
    },
    // ─── 헤더 ───
    header: {
      paddingHorizontal: 14,
      paddingTop: 12,
      paddingBottom: 14,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    headerBtn: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
    },
    headerCenter: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    avatarLarge: {
      width: 42,
      height: 42,
      borderRadius: 21,
      backgroundColor: "rgba(255,255,255,0.2)",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "visible",
    },
    onlineDot: {
      position: "absolute",
      right: -1,
      bottom: -1,
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: "#1FE090",
      borderWidth: 2.5,
      borderColor: "#776ee2",
    },
    headerName: {
      fontSize: 16,
      fontWeight: "900",
      color: "#fff",
      letterSpacing: -0.3,
    },
    onlineRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      marginTop: 2,
    },
    onlineDotSmall: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: "#1FE090",
    },
    onlineText: {
      fontSize: 12,
      fontWeight: "600",
      color: "rgba(255,255,255,0.85)",
    },
    // ─── 메시지 ───
    messageList: {
      flex: 1,
    },
    messageListContent: {
      padding: 14,
      paddingBottom: 8,
      gap: 8,
    },
    dateBadge: {
      alignSelf: "center",
      backgroundColor: theme.surface,
      borderRadius: 999,
      paddingHorizontal: 14,
      paddingVertical: 5,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: theme.border,
    },
    centerState: {
      paddingVertical: 48,
      alignItems: "center",
      justifyContent: "center",
    },
    emptyText: {
      fontSize: 14,
      lineHeight: 21,
      textAlign: "center",
      color: theme.textSecondary,
      paddingHorizontal: 32,
    },
    dateBadgeText: {
      fontSize: 11,
      fontWeight: "800",
      color: theme.textSecondary,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    aiRow: {
      flexDirection: "row",
      alignItems: "flex-end",
      gap: 8,
      maxWidth: "88%",
      marginBottom: 2,
    },
    aiContent: {
      flex: 1,
      gap: 4,
    },
    aiBubble: {
      backgroundColor: theme.surface,
      borderRadius: 20,
      borderBottomLeftRadius: 6,
      paddingHorizontal: 14,
      paddingVertical: 11,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 4,
      elevation: 2,
      borderWidth: 1,
      borderColor: theme.border,
    },
    aiBubbleTop: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 8,
    },
    aiBubbleText: {
      flex: 1,
      fontSize: 15,
      fontWeight: "600",
      color: theme.text,
      lineHeight: 22,
    },
    listenBtn: {
      width: 26,
      height: 26,
      borderRadius: 13,
      backgroundColor: theme.primary + "18",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      marginTop: 1,
    },
    translationText: {
      fontSize: 13,
      color: theme.textSecondary,
      fontWeight: "500",
      marginTop: 6,
      lineHeight: 18,
      fontStyle: "italic",
    },
    timeStampLeft: {
      fontSize: 10,
      color: theme.textSecondary,
      fontWeight: "600",
      marginLeft: 4,
      marginTop: 2,
    },
    correctionCard: {
      backgroundColor: theme.surface,
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: theme.border,
      overflow: "hidden",
    },
    correctionHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      paddingHorizontal: 12,
      paddingVertical: 8,
      backgroundColor: theme.primary + "15",
    },
    correctionTitle: {
      fontSize: 12,
      fontWeight: "800",
      color: theme.primary,
    },
    correctionBody: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      flexWrap: "wrap",
    },
    correctionWrong: {
      fontSize: 14,
      fontWeight: "600",
      color: "#E24B4A",
      textDecorationLine: "line-through",
    },
    correctionRight: {
      fontSize: 14,
      fontWeight: "800",
      color: "#1D9E75",
    },
    correctionNote: {
      fontSize: 12,
      color: theme.textSecondary,
      fontWeight: "500",
      paddingHorizontal: 12,
      paddingBottom: 10,
      lineHeight: 17,
    },
    // ─── 유저 메시지 ───
    userRow: {
      alignSelf: "flex-end",
      maxWidth: "82%",
      alignItems: "flex-end",
      marginBottom: 2,
    },
    userBubble: {
      backgroundColor: theme.primary,
      borderRadius: 20,
      borderBottomRightRadius: 6,
      paddingVertical: 11,
      paddingHorizontal: 15,
      shadowColor: theme.primary,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 4,
    },
    userBubbleText: {
      fontSize: 15,
      fontWeight: "600",
      color: "#fff",
      lineHeight: 22,
    },
    timeStampRight: {
      fontSize: 10,
      color: theme.textSecondary,
      fontWeight: "600",
      marginRight: 4,
      marginTop: 2,
    },
    // ─── 타이핑 ───
    typingBubble: {
      backgroundColor: theme.surface,
      borderRadius: 20,
      borderBottomLeftRadius: 6,
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderWidth: 1,
      borderColor: theme.border,
    },
    // ─── 빠른 답변 ───
    quickReplies: {
      flexGrow: 0,
      flexShrink: 0,
      maxHeight: 50,
    },
    quickRepliesContent: {
      paddingHorizontal: 14,
      paddingVertical: 8,
      gap: 8,
    },
    quickChip: {
      borderWidth: 1.5,
      borderColor: theme.primary + "55",
      backgroundColor: theme.surface,
      borderRadius: 999,
      paddingHorizontal: 14,
      paddingVertical: 8,
    },
    quickChipText: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.primary,
    },
    // ─── 입력바 ───
    inputBar: {
      backgroundColor: theme.surface,
      borderTopWidth: 1,
      borderTopColor: theme.border,
      paddingHorizontal: 10,
      paddingTop: 10,
      flexDirection: "row",
      alignItems: "flex-end",
      gap: 8,
    },
    attachBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.primary + "18",
      alignItems: "center",
      justifyContent: "center",
    },
    inputWrap: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.bg,
      borderRadius: 22,
      paddingLeft: 16,
      paddingRight: 6,
      paddingVertical: 4,
      minHeight: 44,
      maxHeight: 120,
      borderWidth: 1.5,
      borderColor: theme.border,
    },
    input: {
      flex: 1,
      fontSize: 15,
      fontWeight: "500",
      color: theme.text,
      paddingVertical: 8,
      maxHeight: 100,
    },
    micBtn: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: theme.primary + "15",
      alignItems: "center",
      justifyContent: "center",
    },
    sendBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: theme.primary,
      shadowOpacity: 0.3,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
    },
  });
