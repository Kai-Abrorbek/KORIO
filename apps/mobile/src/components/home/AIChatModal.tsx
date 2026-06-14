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
  Platform,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import BoriMascot from "./BoriMascot";

interface Message {
  who: "ai" | "user";
  text: string;
  translation?: string;
  correction?: { wrong: string; right: string; note: string };
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

const INITIAL_MESSAGES: Message[] = [
  {
    who: "ai",
    text: "안녕하세요! 오늘은 자기소개를 연습해 볼까요? 😊",
    translation: "Salom! Bugun o'zini tanishtirishni mashq qilamizmi?",
  },
  {
    who: "ai",
    text: "먼저, 어디에서 왔는지 말해 보세요.",
    translation: "Avval, qayerdan kelganingizni ayting.",
  },
];

function AIAvatar() {
  return (
    <View
      style={{
        width: 30,
        height: 30,
        borderRadius: 15,
        overflow: "hidden",
        flexShrink: 0,
        marginBottom: 2,
      }}
    >
      <BoriMascot size={30} />
    </View>
  );
}

export default function AIChatModal({
  visible,
  onClose,
  prefill = "",
}: AIChatModalProps) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [draft, setDraft] = useState(prefill);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (prefill) setDraft(prefill);
  }, [prefill]);

  useEffect(() => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  }, [messages]);

  const send = (text?: string) => {
    const content = (text ?? draft).trim();
    if (!content) return;
    setDraft("");
    setMessages((prev) => [...prev, { who: "user", text: content }]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          who: "ai",
          text: "좋아요! 계속 이어서 말해 볼까요?",
          translation: "Zo'r! Davom etamizmi?",
        },
      ]);
    }, 650);
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="chevron-back" size={26} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <View style={styles.avatarContainer}>
              <BoriMascot size={38} />
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
          <TouchableOpacity>
            <Ionicons
              name="settings-outline"
              size={22}
              color="rgba(255,255,255,0.7)"
            />
          </TouchableOpacity>
        </View>

        {/* 메시지 */}
        <ScrollView
          ref={scrollRef}
          style={styles.messageList}
          contentContainerStyle={styles.messageListContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.dateBadge}>
            <Text style={styles.dateBadgeText}>오늘</Text>
          </View>

          {messages.map((msg, i) =>
            msg.who === "ai" ? (
              <View key={i} style={styles.aiRow}>
                <AIAvatar />
                <View style={styles.aiContent}>
                  <View style={styles.aiBubble}>
                    <View style={styles.aiBubbleTop}>
                      <Text style={styles.aiBubbleText}>{msg.text}</Text>
                      <TouchableOpacity style={styles.listenBtn}>
                        <Ionicons
                          name="volume-medium"
                          size={16}
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
                </View>
              </View>
            ) : (
              <View key={i} style={styles.userBubble}>
                <Text style={styles.userBubbleText}>{msg.text}</Text>
              </View>
            ),
          )}
        </ScrollView>

        {/* 빠른 답변 */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickRepliesContent}
          style={styles.quickReplies}
        >
          {QUICK_REPLIES.map((q) => (
            <TouchableOpacity
              key={q}
              style={styles.quickChip}
              onPress={() => send(q)}
            >
              <Text style={styles.quickChipText}>{q}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 입력 바 */}
        <View style={styles.inputBar}>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.input}
              placeholder="한국어로 메시지 입력..."
              placeholderTextColor={theme.textSecondary}
              value={draft}
              onChangeText={setDraft}
              onSubmitEditing={() => send()}
            />
            <TouchableOpacity style={styles.micBtn}>
              <Ionicons name="mic" size={20} color={theme.primary} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[
              styles.sendBtn,
              { backgroundColor: draft.trim() ? theme.primary : theme.border },
            ]}
            onPress={() => send()}
          >
            <Ionicons name="send" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
    },
    header: {
      backgroundColor: "#1A1A2E",
      paddingTop: 56,
      paddingHorizontal: 16,
      paddingBottom: 14,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    headerCenter: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    avatarContainer: {
      width: 42,
      height: 42,
      position: "relative",
    },
    onlineDot: {
      position: "absolute",
      right: -1,
      bottom: -1,
      width: 11,
      height: 11,
      borderRadius: 6,
      backgroundColor: "#1D9E75",
      borderWidth: 2,
      borderColor: "#1A1A2E",
    },
    headerName: {
      fontSize: 16,
      fontWeight: "800",
      color: "#fff",
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
      backgroundColor: "#1D9E75",
    },
    onlineText: {
      fontSize: 12,
      fontWeight: "600",
      color: "rgba(255,255,255,0.65)",
    },
    messageList: {
      flex: 1,
    },
    messageListContent: {
      padding: 16,
      paddingBottom: 8,
      gap: 10,
    },
    dateBadge: {
      alignSelf: "center",
      backgroundColor: theme.border,
      borderRadius: 999,
      paddingHorizontal: 12,
      paddingVertical: 4,
      marginBottom: 8,
    },
    dateBadgeText: {
      fontSize: 12,
      fontWeight: "700",
      color: theme.textSecondary,
    },
    aiRow: {
      flexDirection: "row",
      alignItems: "flex-end",
      gap: 8,
      maxWidth: "85%",
    },
    aiContent: {
      flex: 1,
      gap: 6,
    },
    aiBubble: {
      backgroundColor: theme.surface,
      borderRadius: 18,
      borderBottomLeftRadius: 5,
      padding: 12,
      shadowColor: "#1A1A2E",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
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
      width: 28,
      height: 28,
      borderRadius: 999,
      backgroundColor: theme.primary + "20",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    translationText: {
      fontSize: 13,
      color: theme.textSecondary,
      fontWeight: "500",
      marginTop: 5,
      lineHeight: 18,
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
    userBubble: {
      alignSelf: "flex-end",
      maxWidth: "80%",
      backgroundColor: theme.primary,
      borderRadius: 18,
      borderBottomRightRadius: 5,
      paddingVertical: 11,
      paddingHorizontal: 15,
      shadowColor: theme.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
    userBubbleText: {
      fontSize: 15,
      fontWeight: "600",
      color: "#fff",
      lineHeight: 22,
    },
    quickReplies: {
      flexGrow: 0,
      flexShrink: 0,
    },
    quickRepliesContent: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      gap: 8,
    },
    quickChip: {
      borderWidth: 1.5,
      borderColor: theme.primary + "50",
      backgroundColor: theme.surface,
      borderRadius: 999,
      paddingHorizontal: 14,
      paddingVertical: 8,
    },
    quickChipText: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.primary,
      whiteSpace: "nowrap",
    } as any,
    inputBar: {
      backgroundColor: theme.surface,
      borderTopWidth: 1,
      borderTopColor: theme.border,
      paddingHorizontal: 12,
      paddingVertical: 10,
      paddingBottom: Platform.OS === "ios" ? 28 : 10,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    inputWrap: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.bg,
      borderRadius: 999,
      paddingLeft: 16,
      paddingRight: 6,
      paddingVertical: 4,
      minHeight: 44,
    },
    input: {
      flex: 1,
      fontSize: 15,
      fontWeight: "500",
      color: theme.text,
    },
    micBtn: {
      width: 34,
      height: 34,
      borderRadius: 999,
      backgroundColor: theme.primary + "20",
      alignItems: "center",
      justifyContent: "center",
    },
    sendBtn: {
      width: 44,
      height: 44,
      borderRadius: 999,
      alignItems: "center",
      justifyContent: "center",
    },
  });
