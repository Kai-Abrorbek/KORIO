import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";

/**
 * 보석 출금 — **UI 만**. 로직은 아직 없다.
 *
 * 결제 금액에서 보석을 뺄 수 없으니(구글 플레이 고정 가격), 모은 보석을 카드로
 * 돌려주는 경로를 따로 둔다. 실제 송금·검증·한도·수수료는 정해지지 않았다.
 *
 * ⚠️ 지금은 아무것도 전송하지 않는다. 눌러도 "준비 중" 만 뜬다 — 입력을
 *    받아두고 아무 데도 안 보내면 유저는 신청됐다고 믿는다.
 */
const CARD_BRANDS = [
  { id: "uzcard", label: "UZCARD", color: "#1B5FAA" },
  { id: "humo", label: "HUMO", color: "#0FA36B" },
  { id: "visa", label: "VISA", color: "#1A1F71" },
  { id: "mastercard", label: "Mastercard", color: "#EB001B" },
] as const;

export default function WithdrawCard({ gems }: { gems: number }) {
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
  const ready =
    !!brand && cardNumber.replace(/\s/g, "").length === 16 && amountNum > 0;

  return (
    <View style={s.card}>
      <View style={s.head}>
        <Ionicons name="cash-outline" size={19} color={theme.text} />
        <Text style={s.title}>{t("shop.withdrawTitle")}</Text>
      </View>
      <Text style={s.desc}>{t("shop.withdrawDesc")}</Text>

      {/* 카드 종류 */}
      <View style={s.brandRow}>
        {CARD_BRANDS.map((b) => {
          const on = brand === b.id;
          return (
            <Pressable
              key={b.id}
              onPress={() => setBrand(b.id)}
              style={({ pressed }) => [
                s.brand,
                on && { borderColor: b.color, backgroundColor: b.color + "18" },
                pressed && { opacity: 0.7 },
              ]}
            >
              <Text
                style={[s.brandText, on && { color: b.color }]}
                numberOfLines={1}
              >
                {b.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <TextInput
        style={s.input}
        value={cardNumber}
        onChangeText={onCardChange}
        keyboardType="number-pad"
        placeholder="0000 0000 0000 0000"
        placeholderTextColor={theme.textSecondary}
        maxLength={19}
      />

      <View style={s.amountRow}>
        <TextInput
          style={[s.input, s.amountInput]}
          value={amount}
          onChangeText={(v) => setAmount(v.replace(/\D/g, ""))}
          keyboardType="number-pad"
          placeholder={t("shop.withdrawAmount")}
          placeholderTextColor={theme.textSecondary}
        />
        <Pressable
          onPress={() => setAmount(String(gems))}
          style={({ pressed }) => [s.maxBtn, pressed && { opacity: 0.7 }]}
        >
          <Text style={s.maxText}>{t("shop.withdrawMax")}</Text>
        </Pressable>
      </View>

      <Pressable
        disabled={!ready}
        onPress={() => setNotice(true)}
        style={({ pressed }) => [
          s.submit,
          !ready && { opacity: 0.4 },
          pressed && ready && { transform: [{ translateY: 2 }] },
        ]}
      >
        <Text style={s.submitText}>{t("shop.withdrawSubmit")}</Text>
      </Pressable>

      {notice && <Text style={s.notice}>{t("shop.withdrawSoon")}</Text>}
    </View>
  );
}

const styles = (theme: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
      borderRadius: 20,
      padding: 18,
      gap: 12,
    },
    head: { flexDirection: "row", alignItems: "center", gap: 8 },
    title: { fontSize: 17, fontWeight: "800", color: theme.text },
    desc: { fontSize: 12, lineHeight: 18, color: theme.textSecondary },
    brandRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    brand: {
      flexGrow: 1,
      minWidth: "46%",
      alignItems: "center",
      paddingVertical: 11,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: theme.border,
    },
    brandText: { fontSize: 12, fontWeight: "800", color: theme.textSecondary },
    input: {
      borderWidth: 2,
      borderColor: theme.border,
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 12,
      fontSize: 16,
      fontWeight: "700",
      color: theme.text,
      letterSpacing: 1,
    },
    amountRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    amountInput: { flex: 1, letterSpacing: 0 },
    maxBtn: {
      paddingHorizontal: 14,
      paddingVertical: 13,
      borderRadius: 12,
      backgroundColor: theme.border,
    },
    maxText: { fontSize: 12, fontWeight: "800", color: theme.text },
    submit: {
      minHeight: 52,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 16,
      backgroundColor: "#776ee2",
      borderBottomWidth: 4,
      borderBottomColor: "#5448E0",
    },
    submitText: { color: "#fff", fontSize: 15, fontWeight: "800" },
    notice: {
      fontSize: 12,
      lineHeight: 18,
      color: theme.textSecondary,
      textAlign: "center",
    },
  });
