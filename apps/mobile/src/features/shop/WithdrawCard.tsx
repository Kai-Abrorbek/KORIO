import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";

/**
 * 보석 출금 — **UI 만**. 로직은 아직 없다.
 *
 * 결제 금액에서 보석을 뺄 수 없으니(구글 플레이 고정 가격), 모은 보석을 카드로
 * 돌려주는 경로를 따로 둔다. 실제 송금·본인확인·한도·수수료·세금은 아직 정해지지
 * 않았다.
 *
 * ⚠️ 지금은 아무것도 전송하지 않는다. 눌러도 "준비 중" 배너만 뜬다 — 입력만 받고
 *    아무 데도 안 보내면 유저는 신청이 접수됐다고 믿는다. 그래서 버튼 문구도
 *    "신청" 이 아니라 준비 중임을 먼저 말한다.
 *
 * ⚠️ WITHDRAW_MIN_GEMS 는 **임시값**이다. 최소 출금액이 없으면 100보석짜리 요청이
 *    송금 수수료보다 비싸진다. 실제 정책이 정해지면 서버 상수로 옮겨야 한다.
 */
const WITHDRAW_MIN_GEMS = 50_000;

const CARD_BRANDS = [
  { id: "uzcard", label: "UZCARD", color: "#1B5FAA", icon: "card" },
  { id: "humo", label: "HUMO", color: "#0FA36B", icon: "card" },
  { id: "visa", label: "VISA", color: "#1A1F71", icon: "card-outline" },
  { id: "mastercard", label: "Mastercard", color: "#EB001B", icon: "card-outline" },
] as const;

interface Props {
  gems: number;
  /** 입력에 포커스가 가면 호출부가 스크롤을 끝으로 내린다 (키보드 가림 방지) */
  onInputFocus?: () => void;
}

export default function WithdrawCard({ gems, onInputFocus }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = styles(theme);

  const [brand, setBrand] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [notice, setNotice] = useState(false);

  /** 4자리씩 끊어 보여준다 — 16자리를 붙여 쓰면 오타를 못 잡는다 */
  const onCardChange = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, 16);
    setCardNumber(digits.replace(/(.{4})/g, "$1 ").trim());
  };

  const amountNum = Number(amount.replace(/\D/g, "")) || 0;
  const digits = cardNumber.replace(/\s/g, "").length;
  const tooSmall = amountNum > 0 && amountNum < WITHDRAW_MIN_GEMS;
  const tooBig = amountNum > gems;
  const ready =
    !!brand && digits === 16 && amountNum > 0 && !tooSmall && !tooBig;

  const selected = CARD_BRANDS.find((b) => b.id === brand);

  return (
    <>
      <Text style={s.sectionLabel}>{t("shop.withdrawSection")}</Text>

      <View style={s.card}>
        <View style={s.head}>
          <View style={s.headIcon}>
            <Ionicons name="arrow-up" size={16} color="#0FA36B" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.title}>{t("shop.withdrawTitle")}</Text>
            <Text style={s.desc}>{t("shop.withdrawDesc")}</Text>
          </View>
        </View>

        {/* 카드 종류 */}
        <View style={s.brandRow}>
          {CARD_BRANDS.map((b) => {
            const on = brand === b.id;
            return (
              <Pressable
                key={b.id}
                onPress={() => {
                  void Haptics.selectionAsync();
                  setBrand(b.id);
                }}
                style={({ pressed }) => [
                  s.brand,
                  on && { borderColor: b.color, backgroundColor: b.color + "1A" },
                  pressed && { transform: [{ translateY: 2 }] },
                ]}
              >
                <Ionicons
                  name={b.icon}
                  size={15}
                  color={on ? b.color : theme.textSecondary}
                />
                <Text
                  style={[s.brandText, on && { color: b.color }]}
                  numberOfLines={1}
                >
                  {b.label}
                </Text>
                {on && (
                  <Ionicons name="checkmark-circle" size={15} color={b.color} />
                )}
              </Pressable>
            );
          })}
        </View>

        {/* 카드 번호 */}
        <View>
          <Text style={s.fieldLabel}>{t("shop.withdrawCardNumber")}</Text>
          <View
            style={[
              s.field,
              digits === 16 && { borderColor: selected?.color ?? "#58CC02" },
            ]}
          >
            <Ionicons
              name="card"
              size={17}
              color={selected?.color ?? theme.textSecondary}
            />
            <TextInput
              style={s.input}
              value={cardNumber}
              onChangeText={onCardChange}
              onFocus={onInputFocus}
              keyboardType="number-pad"
              placeholder="0000 0000 0000 0000"
              placeholderTextColor={theme.textSecondary}
              maxLength={19}
            />
            {digits === 16 && (
              <Ionicons name="checkmark-circle" size={17} color="#58CC02" />
            )}
          </View>
        </View>

        {/* 금액 */}
        <View>
          <Text style={s.fieldLabel}>{t("shop.withdrawAmount")}</Text>
          <View style={s.amountRow}>
            <View
              style={[
                s.field,
                { flex: 1 },
                (tooSmall || tooBig) && { borderColor: "#E5379B" },
              ]}
            >
              <Ionicons name="diamond" size={17} color="#3BB6E5" />
              <TextInput
                style={s.input}
                value={amount}
                onChangeText={(v) => setAmount(v.replace(/\D/g, "").slice(0, 9))}
                onFocus={onInputFocus}
                keyboardType="number-pad"
                placeholder="0"
                placeholderTextColor={theme.textSecondary}
              />
            </View>
            <Pressable
              onPress={() => setAmount(String(gems))}
              style={({ pressed }) => [
                s.maxBtn,
                pressed && { transform: [{ translateY: 2 }] },
              ]}
            >
              <Text style={s.maxText}>{t("shop.withdrawMax")}</Text>
            </Pressable>
          </View>

          {/* 1 보석 = 1 so'm — 얼마를 받는지 바로 보이게 */}
          <Text style={[s.helper, (tooSmall || tooBig) && s.helperBad]}>
            {tooBig
              ? t("shop.withdrawTooBig", { n: gems.toLocaleString("en-US") })
              : tooSmall
                ? t("shop.withdrawMin", {
                    n: WITHDRAW_MIN_GEMS.toLocaleString("en-US"),
                  })
                : t("shop.withdrawPayout", {
                    n: amountNum.toLocaleString("en-US"),
                  })}
          </Text>
        </View>

        <Pressable
          disabled={!ready}
          onPress={() => {
            void Haptics.notificationAsync(
              Haptics.NotificationFeedbackType.Warning,
            );
            setNotice(true);
          }}
          style={({ pressed }) => [
            s.submit,
            !ready && s.submitOff,
            pressed && ready && { transform: [{ translateY: 3 }], borderBottomWidth: 1 },
          ]}
        >
          <Text style={s.submitText}>{t("shop.withdrawSubmit")}</Text>
        </Pressable>

        {notice && (
          <View style={s.notice}>
            <Ionicons name="construct" size={15} color="#D97706" />
            <Text style={s.noticeText}>{t("shop.withdrawSoon")}</Text>
          </View>
        )}
      </View>
    </>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    sectionLabel: {
      fontSize: 13,
      fontWeight: "900",
      letterSpacing: 0.6,
      color: theme.textSecondary,
      textTransform: "uppercase",
      paddingHorizontal: 20,
      marginTop: 22,
      marginBottom: 10,
    },
    card: {
      marginHorizontal: 20,
      marginBottom: 16,
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
      borderBottomWidth: 5,
      borderRadius: 20,
      padding: 16,
      gap: 14,
    },
    head: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
    headIcon: {
      width: 30,
      height: 30,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#0FA36B1A",
    },
    title: { fontSize: 16, fontWeight: "900", color: theme.text },
    desc: {
      fontSize: 12,
      lineHeight: 17,
      color: theme.textSecondary,
      marginTop: 2,
    },
    brandRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    brand: {
      flexGrow: 1,
      flexBasis: "46%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      paddingVertical: 11,
      borderRadius: 13,
      borderWidth: 2,
      borderColor: theme.border,
    },
    brandText: { fontSize: 12, fontWeight: "900", color: theme.textSecondary },
    fieldLabel: {
      fontSize: 11,
      fontWeight: "800",
      color: theme.textSecondary,
      marginBottom: 6,
      marginLeft: 2,
    },
    field: {
      flexDirection: "row",
      alignItems: "center",
      gap: 9,
      borderWidth: 2,
      borderColor: theme.border,
      borderRadius: 13,
      paddingHorizontal: 13,
      backgroundColor: theme.bg === "#ffffff" ? "#FAFAFD" : "#1D1D26",
    },
    input: {
      flex: 1,
      paddingVertical: 12,
      fontSize: 16,
      fontWeight: "800",
      color: theme.text,
      letterSpacing: 0.8,
    },
    amountRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    maxBtn: {
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderRadius: 13,
      backgroundColor: theme.border,
      borderBottomWidth: 3,
      borderBottomColor: theme.bg === "#ffffff" ? "#D9D6EA" : "#2A2A33",
    },
    maxText: { fontSize: 12, fontWeight: "900", color: theme.text },
    helper: {
      fontSize: 11,
      fontWeight: "700",
      color: theme.textSecondary,
      marginTop: 7,
      marginLeft: 2,
    },
    helperBad: { color: "#E5379B" },
    submit: {
      minHeight: 52,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 16,
      backgroundColor: "#776ee2",
      borderBottomWidth: 4,
      borderBottomColor: "#5448E0",
    },
    submitOff: {
      backgroundColor: theme.border,
      borderBottomColor: theme.border,
    },
    submitText: {
      color: "#fff",
      fontSize: 15,
      fontWeight: "900",
      letterSpacing: 0.3,
    },
    notice: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      padding: 11,
      borderRadius: 13,
      backgroundColor: "#F59E0B1A",
    },
    noticeText: {
      flex: 1,
      fontSize: 12,
      lineHeight: 17,
      fontWeight: "700",
      color: "#B45309",
    },
  });
