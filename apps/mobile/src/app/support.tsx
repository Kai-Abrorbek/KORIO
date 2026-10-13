import { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import * as Haptics from "@/utils/haptics";
import { SupportService, type SupportCategory, type SupportTicket } from "@/services/support.service";
import SupportResultModal, { type SupportResult } from "@/components/support/SupportResultModal";

const categories: SupportCategory[] = ["general", "learning", "billing", "bug", "other"];

export default function SupportScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const [category, setCategory] = useState<SupportCategory>("general");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  // 보낸 결과 — 기본 Alert 대신 SupportResultModal 로 보여준다
  const [result, setResult] = useState<SupportResult | null>(null);

  const load = async () => {
    try { setTickets((await SupportService.list()).items); }
    catch { /* Keep the form available when history is temporarily unavailable. */ }
    finally { setLoading(false); }
  };
  useEffect(() => { void load(); }, []);

  const submit = async () => {
    if (sending || subject.trim().length < 4 || message.trim().length < 10) return;
    setSending(true);
    const sentSubject = subject.trim();
    try {
      await SupportService.create({ category, subject: sentSubject, message: message.trim() });
      setSubject(""); setMessage("");
      await load();
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setResult({ kind: "sent", category, subject: sentSubject });
    } catch {
      // 쓴 내용은 지우지 않는다 — 다시 시도하면 그대로 보낸다
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setResult({ kind: "failed" });
    }
    finally { setSending(false); }
  };

  return <View style={[styles.screen, { paddingTop: insets.top + 4 }]}>
    <View style={styles.header}><Pressable onPress={() => router.back()} accessibilityLabel={t("common.back")}><Ionicons name="chevron-back" size={28} color={theme.text}/></Pressable><Text style={styles.title}>{t("support.title")}</Text></View>
    <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 40 }} keyboardShouldPersistTaps="handled">
      <Text style={styles.intro}>{t("support.intro")}</Text>
      <View style={styles.categories}>{categories.map(item => <Pressable key={item} onPress={() => setCategory(item)} style={[styles.chip, category === item && styles.chipActive]}><Text style={[styles.chipText, category === item && styles.chipTextActive]}>{t(`support.category.${item}`)}</Text></Pressable>)}</View>
      <TextInput value={subject} onChangeText={setSubject} placeholder={t("support.subject")} placeholderTextColor={theme.textSecondary} maxLength={120} style={styles.input}/>
      <TextInput value={message} onChangeText={setMessage} placeholder={t("support.message")} placeholderTextColor={theme.textSecondary} maxLength={4000} multiline textAlignVertical="top" style={[styles.input, styles.message]}/>
      <Pressable onPress={() => void submit()} disabled={sending || subject.trim().length < 4 || message.trim().length < 10} style={[styles.button, (sending || subject.trim().length < 4 || message.trim().length < 10) && { opacity: .5 }]}><Text style={styles.buttonText}>{sending ? t("support.loading") : t("support.send")}</Text></Pressable>
      <Text style={styles.heading}>{t("support.history")}</Text>
      {loading ? <Text style={styles.muted}>{t("support.loading")}</Text> : tickets.length === 0 ? <Text style={styles.muted}>{t("support.empty")}</Text> : tickets.map(ticket => <View key={ticket.id} style={styles.ticket}><View style={styles.ticketTop}><Text style={styles.ticketTitle}>{ticket.subject}</Text><Text style={styles.status}>{t(`support.status.${ticket.status}`)}</Text></View><Text style={styles.muted}>{ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : ""} · {t(`support.category.${ticket.category}`)}</Text><Text style={styles.ticketBody}>{ticket.message}</Text>{ticket.reply && <View style={styles.reply}><Text style={styles.replyLabel}>{t("support.reply")}</Text><Text style={styles.ticketBody}>{ticket.reply}</Text></View>}</View>)}
    </ScrollView>
    <SupportResultModal
      result={result}
      onClose={() => setResult(null)}
      onRetry={() => { setResult(null); void submit(); }}
    />
  </View>;
}

const getStyles = (theme: ThemeColors) => StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.bg },
  header: { flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 18, paddingBottom: 12 },
  title: { fontSize: 22, fontWeight: "800", color: theme.text },
  intro: { color: theme.textSecondary, lineHeight: 21, marginBottom: 18 },
  categories: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 18 },
  chip: { backgroundColor: theme.surface, borderColor: theme.border, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20 },
  chipActive: { backgroundColor: theme.primary, borderColor: theme.primary },
  chipText: { color: theme.text, fontSize: 13, fontWeight: "600" },
  chipTextActive: { color: "#fff" },
  input: { backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.border, borderRadius: 13, paddingHorizontal: 14, paddingVertical: 12, color: theme.text, fontSize: 15, marginBottom: 10 },
  message: { minHeight: 140 },
  button: { alignItems: "center", backgroundColor: theme.primary, borderRadius: 13, paddingVertical: 15 },
  buttonText: { color: "#fff", fontWeight: "800", fontSize: 15 },
  heading: { color: theme.text, fontSize: 19, fontWeight: "800", marginTop: 34, marginBottom: 12 },
  muted: { color: theme.textSecondary, fontSize: 13, marginTop: 5 },
  ticket: { backgroundColor: theme.surface, borderColor: theme.border, borderWidth: 1, borderRadius: 16, padding: 16, marginBottom: 12 },
  ticketTop: { flexDirection: "row", justifyContent: "space-between", gap: 10 },
  ticketTitle: { color: theme.text, fontWeight: "800", fontSize: 15, flex: 1 },
  status: { color: theme.primary, fontWeight: "700", fontSize: 12 },
  ticketBody: { color: theme.text, lineHeight: 21, marginTop: 10 },
  reply: { marginTop: 14, paddingTop: 12, borderTopWidth: 1, borderTopColor: theme.border },
  replyLabel: { color: theme.primary, fontWeight: "800" },
});
