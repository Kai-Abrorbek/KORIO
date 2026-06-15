import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  FadeInUp,
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

const QUICK_REPLIES = [
  "저는 학생이에요",
  "한국 음식을 좋아해요",
  "다시 말해 주세요",
  "무슨 뜻이에요?",
];

function nowTime() {
  const d = new Date();
  const hh = d.getHours();
  const mm = d.getMinutes();
  return `${hh}:${mm.toString().padStart(2, "0")}`;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "init-1",
    who: "ai",
    text: "안녕하세요! 오늘은 자기소개를 연습해 볼까요? 😊",
    translation: "Salom! Bugun o'zini tanishtirishni mashq qilamizmi?",
    time: nowTime(),
  },
  {
    id: "init-2",
    who: "ai",
    text: "먼저, 어디에서 왔는지 말해 보세요.",
    translation: "Avval, qayerdan kelganingizni ayting.",
    time: nowTime(),
  },
];

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

  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [draft, setDraft] = useState(prefill);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const inputRef = useRef<TextInput>(null);

  // prefill 들어오면 반영
  useEffect(() => {
    if (prefill) setDraft(prefill);
  }, [prefill]);

  // 메시지 추가될 때마다 맨 아래로 스크롤
  useEffect(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    });
  }, [messages, isTyping]);

  // 키보드 뜰 때 맨 아래로
  useEffect(() => {
    const sub = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => {
        setTimeout(
          () => scrollRef.current?.scrollToEnd({ animated: true }),
          100,
        );
      },
    );
    return () => sub.remove();
  }, []);

  const send = (text?: string) => {
    const content = (text ?? draft).trim();
    if (!content) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    setDraft("");
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      who: "user",
      text: content,
      time: nowTime(),
    };
    setMessages((prev) => [...prev, userMsg]);

    // AI "타이핑 중" → 답변
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          who: "ai",
          text: "좋아요! 계속 이어서 말해 볼까요?",
          translation: "Zo'r! Davom etamizmi?",
          time: nowTime(),
        },
      ]);
    }, 1200);
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
        {/* ─── 헤더 (KeyboardAvoidingView 밖 - 고정) ─── */}
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
              <Text style={styles.headerName}>보리 선생님</Text>
              <View style={styles.onlineRow}>
                <View style={styles.onlineDotSmall} />
                <Text style={styles.onlineText}>온라인 · AI 회화 선생님</Text>
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

        {/* ─── KeyboardAvoidingView 안: 메시지 + 입력바 ─── */}
        <KeyboardAvoidingView
          style={styles.kbWrap}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={0}
        >
          {/* 메시지 리스트 */}
          <ScrollView
            ref={scrollRef}
            style={styles.messageList}
            contentContainerStyle={styles.messageListContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
          >
            <View style={styles.dateBadge}>
              <Text style={styles.dateBadgeText}>오늘</Text>
            </View>

            {messages.map((msg) =>
              msg.who === "ai" ? (
                <Animated.View
                  key={msg.id}
                  entering={FadeInUp.duration(300).springify().damping(16)}
                  style={styles.aiRow}
                >
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
                          <Text style={styles.correctionTitle}>문법 교정</Text>
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
                </Animated.View>
              ) : (
                <Animated.View
                  key={msg.id}
                  entering={FadeInUp.duration(300).springify().damping(16)}
                  style={styles.userRow}
                >
                  <View style={styles.userBubble}>
                    <Text style={styles.userBubbleText}>{msg.text}</Text>
                  </View>
                  <Text style={styles.timeStampRight}>{msg.time}</Text>
                </Animated.View>
              ),
            )}

            {/* 타이핑 인디케이터 */}
            {isTyping && (
              <Animated.View
                entering={FadeInUp.duration(200)}
                style={styles.aiRow}
              >
                <AIAvatar />
                <View style={styles.typingBubble}>
                  <TypingIndicator theme={theme} />
                </View>
              </Animated.View>
            )}
          </ScrollView>

          {/* 빠른 답변 */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickRepliesContent}
            style={styles.quickReplies}
            keyboardShouldPersistTaps="handled"
          >
            {QUICK_REPLIES.map((q) => (
              <TouchableOpacity
                key={q}
                style={styles.quickChip}
                onPress={() => send(q)}
                activeOpacity={0.7}
              >
                <Text style={styles.quickChipText}>{q}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* 입력바 */}
          <View
            style={[
              styles.inputBar,
              { paddingBottom: Math.max(insets.bottom, 10) },
            ]}
          >
            <TouchableOpacity style={styles.attachBtn} hitSlop={6}>
              <Ionicons name="add" size={22} color={theme.primary} />
            </TouchableOpacity>

            <View style={styles.inputWrap}>
              <TextInput
                ref={inputRef}
                style={styles.input}
                placeholder="한국어로 메시지 입력..."
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
        </KeyboardAvoidingView>
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
