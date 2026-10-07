import { useEffect, useMemo, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { SupportService, type SupportCategory, type SupportTicket } from "@/services/support.service";

const categories: SupportCategory[] = ["general", "learning", "billing", "bug", "other"];
const copy = {
  ko: { title: "문의하기", intro: "궁금한 점이나 오류를 알려주세요. 답변은 계정 이메일로 보내드려요.", subject: "제목", message: "문의 내용", send: "문의 보내기", history: "내 문의", empty: "아직 문의가 없습니다.", loading: "불러오는 중…", sent: "문의가 접수됐어요.", failed: "처리하지 못했어요. 잠시 후 다시 시도해 주세요.", open: "답변 대기", sending: "답변 발송 중", answered: "답변 완료", reply: "답변", general: "일반", learning: "학습", billing: "결제", bug: "오류", other: "기타" },
  en: { title: "Contact support", intro: "Tell us your question or issue. We'll reply to your account email.", subject: "Subject", message: "Message", send: "Send request", history: "My requests", empty: "No requests yet.", loading: "Loading…", sent: "Your request was received.", failed: "Couldn't send. Please try again.", open: "Awaiting reply", sending: "Sending reply", answered: "Answered", reply: "Reply", general: "General", learning: "Learning", billing: "Billing", bug: "Bug", other: "Other" },
  uz: { title: "Yordamga murojaat", intro: "Savol yoki muammoni yozing. Javob hisobingizdagi emailga yuboriladi.", subject: "Mavzu", message: "Xabar", send: "Yuborish", history: "Murojaatlarim", empty: "Hali murojaat yo'q.", loading: "Yuklanmoqda…", sent: "Murojaatingiz qabul qilindi.", failed: "Yuborilmadi. Qayta urinib ko'ring.", open: "Javob kutilmoqda", sending: "Javob yuborilmoqda", answered: "Javob berildi", reply: "Javob", general: "Umumiy", learning: "O'qish", billing: "To'lov", bug: "Xatolik", other: "Boshqa" },
  ru: { title: "Поддержка", intro: "Опишите вопрос или проблему. Ответ придёт на почту вашего аккаунта.", subject: "Тема", message: "Сообщение", send: "Отправить", history: "Мои обращения", empty: "Обращений пока нет.", loading: "Загрузка…", sent: "Обращение получено.", failed: "Не удалось отправить. Попробуйте ещё раз.", open: "Ждёт ответа", sending: "Отправка ответа", answered: "Ответ получен", reply: "Ответ", general: "Общее", learning: "Обучение", billing: "Оплата", bug: "Ошибка", other: "Другое" },
} as const;

export default function SupportScreen() {
  const { i18n } = useTranslation();
  const lang = i18n.language.split("-")[0] as keyof typeof copy;
  const c = copy[lang] ?? copy.en;
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const [category, setCategory] = useState<SupportCategory>("general");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const load = async () => {
    try { setTickets((await SupportService.list()).items); }
    catch { /* Keep the form available when history is temporarily unavailable. */ }
    finally { setLoading(false); }
  };
  useEffect(() => { void load(); }, []);

  const submit = async () => {
    if (sending || subject.trim().length < 4 || message.trim().length < 10) return;
    setSending(true);
    try {
      await SupportService.create({ category, subject: subject.trim(), message: message.trim() });
      setSubject(""); setMessage("");
      await load();
      Alert.alert(c.sent);
    } catch { Alert.alert(c.failed); }
    finally { setSending(false); }
  };

  return <View style={[styles.screen, { paddingTop: insets.top + 4 }]}>
    <View style={styles.header}><Pressable onPress={() => router.back()} accessibilityLabel="Back"><Ionicons name="chevron-back" size={28} color={theme.text}/></Pressable><Text style={styles.title}>{c.title}</Text></View>
    <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 40 }} keyboardShouldPersistTaps="handled">
      <Text style={styles.intro}>{c.intro}</Text>
      <View style={styles.categories}>{categories.map(item => <Pressable key={item} onPress={() => setCategory(item)} style={[styles.chip, category === item && styles.chipActive]}><Text style={[styles.chipText, category === item && styles.chipTextActive]}>{c[item]}</Text></Pressable>)}</View>
      <TextInput value={subject} onChangeText={setSubject} placeholder={c.subject} placeholderTextColor={theme.textSecondary} maxLength={120} style={styles.input}/>
      <TextInput value={message} onChangeText={setMessage} placeholder={c.message} placeholderTextColor={theme.textSecondary} maxLength={4000} multiline textAlignVertical="top" style={[styles.input, styles.message]}/>
      <Pressable onPress={() => void submit()} disabled={sending || subject.trim().length < 4 || message.trim().length < 10} style={[styles.button, (sending || subject.trim().length < 4 || message.trim().length < 10) && { opacity: .5 }]}><Text style={styles.buttonText}>{sending ? c.loading : c.send}</Text></Pressable>
      <Text style={styles.heading}>{c.history}</Text>
      {loading ? <Text style={styles.muted}>{c.loading}</Text> : tickets.length === 0 ? <Text style={styles.muted}>{c.empty}</Text> : tickets.map(ticket => <View key={ticket.id} style={styles.ticket}><View style={styles.ticketTop}><Text style={styles.ticketTitle}>{ticket.subject}</Text><Text style={styles.status}>{c[ticket.status]}</Text></View><Text style={styles.muted}>{ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : ""} · {c[ticket.category]}</Text><Text style={styles.ticketBody}>{ticket.message}</Text>{ticket.reply && <View style={styles.reply}><Text style={styles.replyLabel}>{c.reply}</Text><Text style={styles.ticketBody}>{ticket.reply}</Text></View>}</View>)}
    </ScrollView>
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
