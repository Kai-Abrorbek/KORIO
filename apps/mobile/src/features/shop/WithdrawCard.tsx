import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Pressable } from "@/components/ui/Pressables";
import { useSoundAlert } from "@/hooks/useSoundAlert";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useTranslation } from "react-i18next";
import Animated, {
  Easing,
  FadeInDown,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import * as Haptics from "@/utils/haptics";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";
import {
  PayoutService,
  type GemPayout,
  type PayoutOverview,
  type PayoutStatus,
} from "@/services/payout.service";
import {
  PAYOUT_BRANDS,
  brandLabel,
  cardDigits,
  detectPayoutBrand,
  formatCardInput,
  formatHolderInput,
  normalizeHolder,
  payoutCardProblem,
  type PayoutBrand,
} from "./payoutCard";

/**
 * 보석 출금 — 카드로 받기.
 *
 * 신청하면 서버가 보석을 바로 빼고 요청을 남긴다. 돈은 운영자가 어드민(출금 요청)에서 보고
 * 직접 보낸 뒤 "송금 완료"를 누르면 앱 알림·푸시가 온다. 반려하면 보석이 돌아온다.
 *
 * - 최소 수량은 서버(어드민 숫자 설정)가 정한다 — 앱에 박지 않는다.
 * - 진행 중인 신청은 하나뿐이라, 있으면 입력 칸 대신 진행 카드를 보여 준다.
 * - 카드 번호는 서버와 같은 규칙(payoutCard.ts)으로 입력하는 순간 검사한다.
 */
const fmt = (n: number) => n.toLocaleString("en-US");
const dateLabel = (iso: string | null) => {
  if (!iso) return "";
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
};

const STATUS_COLOR: Record<PayoutStatus, string> = {
  pending: "#E2A83A",
  processing: "#776ee2",
  completed: "#1DBB7F",
  rejected: "#E5379B",
  cancelled: "#A6A6B3",
};
const STATUS_ICON: Record<PayoutStatus, keyof typeof Ionicons.glyphMap> = {
  pending: "time",
  processing: "paper-plane",
  completed: "checkmark",
  rejected: "arrow-undo",
  cancelled: "close",
};

interface Props {
  gems: number;
  /** 입력에 포커스가 가면 호출부가 스크롤을 끝으로 내린다 (키보드 가림 방지) */
  onInputFocus?: () => void;
  /** 신청·취소로 보석이 바뀌면 상점 숫자와 스토어를 맞춘다 */
  onGemsChange?: (gems: number) => void;
}

export default function WithdrawCard({ gems, onInputFocus, onGemsChange }: Props) {
  const Alert = useSoundAlert();
  const { t } = useTranslation();
  const theme = useTheme();
  const s = styles(theme);

  const [overview, setOverview] = useState<PayoutOverview | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [brand, setBrand] = useState<PayoutBrand | null>(null);
  const [card, setCard] = useState("");
  const [holder, setHolder] = useState("");
  const [holderDone, setHolderDone] = useState(false);
  const [amount, setAmount] = useState("");

  const load = useCallback(() => {
    PayoutService.overview()
      .then((next) => {
        setOverview(next);
        setLoadFailed(false);
      })
      .catch(() => setLoadFailed(true));
  }, []);

  // 상점에 들어올 때마다 — 운영자가 그 사이 처리했을 수 있다
  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  /** 서버는 에러 코드만 준다 */
  const explain = (e: unknown) => {
    const code = (e as { message?: string })?.message ?? "";
    return t(`shop.errors.${code}`, {
      n: fmt(overview?.minGems ?? 0),
      defaultValue: t("shop.errors.UNKNOWN"),
    });
  };

  // ── 입력 검사 ──
  const digits = cardDigits(card);
  const detected = detectPayoutBrand(digits);
  const cardProblem = payoutCardProblem(digits, brand);
  const cardError =
    digits.length === 16 && cardProblem
      ? cardProblem
      : detected && brand && detected !== brand
        ? "BRAND_MISMATCH"
        : null;
  const cardOk = !!brand && !cardProblem;

  const holderName = normalizeHolder(holder);
  // 라틴이 아닌 글자는 바로, 짧은 이름은 입력을 마친 뒤에 알린다
  const holderBad =
    holder.trim().length > 0 &&
    !holderName &&
    (holderDone || /[^A-Z '.-]/.test(holder));

  const minGems = overview?.minGems ?? null;
  const somPerGem = overview?.somPerGem ?? 1;
  const amountNum = Number(amount) || 0;
  const tooSmall = minGems !== null && amountNum > 0 && amountNum < minGems;
  const tooBig = amountNum > gems;
  const ready =
    !!overview &&
    !busy &&
    cardOk &&
    !!holderName &&
    amountNum > 0 &&
    !tooSmall &&
    !tooBig;

  const onCardChange = (raw: string) => {
    const next = formatCardInput(raw);
    setCard(next);
    // 앞자리로 카드 종류를 알면 칩을 대신 골라 준다
    const found = detectPayoutBrand(cardDigits(next));
    if (found && found !== brand) {
      setBrand(found);
      void Haptics.selectionAsync();
    }
  };

  const send = async (name: string) => {
    if (!brand) return;
    setBusy(true);
    try {
      const res = await PayoutService.create({
        brand,
        cardNumber: digits,
        cardHolder: name,
        gems: amountNum,
      });
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setOverview((cur) =>
        cur
          ? {
              ...cur,
              gems: res.gems,
              open: res.request,
              recent: [res.request, ...cur.recent].slice(0, 5),
            }
          : cur,
      );
      setCard("");
      setHolder("");
      setHolderDone(false);
      setAmount("");
      setBrand(null);
      onGemsChange?.(res.gems);
    } catch (e) {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert("", explain(e));
      load();
    } finally {
      setBusy(false);
    }
  };

  const submit = () => {
    if (!ready || !brand || !holderName) return;
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      t("shop.payout.confirmTitle"),
      t("shop.payout.confirmBody", {
        gems: fmt(amountNum),
        amount: fmt(amountNum * somPerGem),
        brand: brandLabel(brand),
        last4: digits.slice(-4),
        holder: holderName,
      }),
      [
        { text: t("common.cancel"), style: "cancel" },
        { text: t("shop.payout.confirmOk"), onPress: () => void send(holderName) },
      ],
    );
  };

  const cancelRequest = (request: GemPayout) =>
    Alert.alert(
      t("shop.payout.cancelTitle"),
      t("shop.payout.cancelBody", { gems: fmt(request.gems) }),
      [
        { text: t("common.close"), style: "cancel" },
        {
          text: t("shop.payout.cancel"),
          style: "destructive",
          onPress: () =>
            void (async () => {
              setBusy(true);
              try {
                const res = await PayoutService.cancel(request.id);
                void Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Success,
                );
                setOverview((cur) =>
                  cur
                    ? {
                        ...cur,
                        gems: res.gems,
                        open: null,
                        recent: cur.recent.map((r) =>
                          r.id === res.request.id ? res.request : r,
                        ),
                      }
                    : cur,
                );
                onGemsChange?.(res.gems);
              } catch (e) {
                Alert.alert("", explain(e));
                load();
              } finally {
                setBusy(false);
              }
            })(),
        },
      ],
    );

  const open = overview?.open ?? null;
  const history = (overview?.recent ?? []).filter((r) => r.id !== open?.id).slice(0, 3);
  const selected = PAYOUT_BRANDS.find((b) => b.id === brand);

  const recent = history.length > 0 && (
    <View style={s.recentCard}>
      <Text style={s.recentTitle}>{t("shop.payout.recent")}</Text>
      {history.map((item) => (
        <RecentRow key={item.id} item={item} theme={theme} />
      ))}
    </View>
  );

  return (
    <>
      <Text style={s.sectionLabel}>{t("shop.withdrawSection")}</Text>

      {open ? (
        <>
          <OpenPayoutCard
            request={open}
            busy={busy}
            theme={theme}
            onCancel={() => cancelRequest(open)}
          />
          {recent}
        </>
      ) : (
        <>
          {/* 입력 칸이 아래에 있어야 키보드가 올라와도 끝으로 스크롤해서 보인다 */}
          {recent}
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

            {loadFailed && !overview && (
              <Pressable onPress={load} style={s.loadFail}>
                <Ionicons name="refresh" size={14} color="#B45309" />
                <Text style={s.loadFailText}>{t("shop.payout.loadFailed")}</Text>
              </Pressable>
            )}

            {/* 카드 종류 — 번호를 넣으면 알아서 골라진다 */}
            <View style={s.brandRow}>
              {PAYOUT_BRANDS.map((b) => {
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
                      name={b.id === "visa" || b.id === "mastercard" ? "card-outline" : "card"}
                      size={15}
                      color={on ? b.color : theme.textSecondary}
                    />
                    <Text style={[s.brandText, on && { color: b.color }]} numberOfLines={1}>
                      {b.label}
                    </Text>
                    {on && <Ionicons name="checkmark-circle" size={15} color={b.color} />}
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
                  cardOk && { borderColor: selected?.color ?? "#58CC02" },
                  !!cardError && s.fieldBad,
                ]}
              >
                <Ionicons
                  name="card"
                  size={17}
                  color={cardError ? "#E5379B" : (selected?.color ?? theme.textSecondary)}
                />
                <TextInput
                  style={s.input}
                  value={card}
                  onChangeText={onCardChange}
                  onFocus={onInputFocus}
                  keyboardType="number-pad"
                  placeholder="0000 0000 0000 0000"
                  placeholderTextColor={theme.textSecondary}
                  maxLength={19}
                  editable={!busy}
                />
                {cardOk && <Ionicons name="checkmark-circle" size={17} color="#58CC02" />}
                {!!cardError && <Ionicons name="alert-circle" size={17} color="#E5379B" />}
              </View>
              {!!cardError && (
                <Text style={[s.helper, s.helperBad]}>
                  {cardError === "BRAND"
                    ? t("shop.payout.cardUnknown")
                    : cardError === "BRAND_MISMATCH"
                      ? t("shop.payout.cardMismatch", { brand: brandLabel(detected ?? "") })
                      : t("shop.payout.cardInvalid")}
                </Text>
              )}
            </View>

            {/* 카드 주인 이름 — 운영자가 송금할 때 받는 사람과 맞춰 본다 */}
            <View>
              <Text style={s.fieldLabel}>{t("shop.payout.holder")}</Text>
              <View
                style={[
                  s.field,
                  !!holderName && { borderColor: "#58CC02" },
                  holderBad && s.fieldBad,
                ]}
              >
                <Ionicons
                  name="person"
                  size={17}
                  color={holderBad ? "#E5379B" : theme.textSecondary}
                />
                <TextInput
                  style={[s.input, s.holderInput]}
                  value={holder}
                  onChangeText={(v) => {
                    setHolder(formatHolderInput(v));
                    setHolderDone(false);
                  }}
                  onFocus={onInputFocus}
                  onBlur={() => setHolderDone(true)}
                  autoCapitalize="characters"
                  autoCorrect={false}
                  autoComplete="name"
                  placeholder={t("shop.payout.holderPlaceholder")}
                  placeholderTextColor={theme.textSecondary}
                  maxLength={40}
                  editable={!busy}
                />
                {!!holderName && <Ionicons name="checkmark-circle" size={17} color="#58CC02" />}
              </View>
              <Text style={[s.helper, holderBad && s.helperBad]}>
                {holderBad ? t("shop.payout.holderInvalid") : t("shop.payout.holderHint")}
              </Text>
            </View>

            {/* 금액 */}
            <View>
              <Text style={s.fieldLabel}>{t("shop.withdrawAmount")}</Text>
              <View style={s.amountRow}>
                <View style={[s.field, { flex: 1 }, (tooSmall || tooBig) && s.fieldBad]}>
                  <Ionicons name="diamond" size={17} color="#3BB6E5" />
                  <TextInput
                    style={s.input}
                    value={amount}
                    onChangeText={(v) => setAmount(v.replace(/\D/g, "").replace(/^0+/, "").slice(0, 9))}
                    onFocus={onInputFocus}
                    keyboardType="number-pad"
                    placeholder="0"
                    placeholderTextColor={theme.textSecondary}
                    editable={!busy}
                  />
                </View>
                <Pressable
                  onPress={() => {
                    void Haptics.selectionAsync();
                    setAmount(gems > 0 ? String(gems) : "");
                  }}
                  style={({ pressed }) => [s.maxBtn, pressed && { transform: [{ translateY: 2 }] }]}
                >
                  <Text style={s.maxText}>{t("shop.withdrawMax")}</Text>
                </Pressable>
              </View>

              {/* 1 보석 = 1 so'm — 얼마를 받는지 바로 보이게 */}
              <Text style={[s.helper, (tooSmall || tooBig) && s.helperBad]}>
                {tooBig
                  ? t("shop.withdrawTooBig", { n: fmt(gems) })
                  : tooSmall || (amountNum === 0 && minGems !== null)
                    ? t("shop.withdrawMin", { n: fmt(minGems ?? 0) })
                    : t("shop.withdrawPayout", { n: fmt(amountNum * somPerGem) })}
              </Text>
            </View>

            <Pressable
              disabled={!ready}
              onPress={submit}
              style={({ pressed }) => [
                s.submit,
                !ready && s.submitOff,
                pressed && ready && { transform: [{ translateY: 3 }], borderBottomWidth: 1 },
              ]}
            >
              {busy ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={s.submitText}>{t("shop.withdrawSubmit")}</Text>
              )}
            </Pressable>
          </View>
        </>
      )}
    </>
  );
}

/** 진행 중인 신청 — 접수 → 송금 중 → 완료 */
function OpenPayoutCard({
  request,
  busy,
  theme,
  onCancel,
}: {
  request: GemPayout;
  busy: boolean;
  theme: ThemeColors;
  onCancel: () => void;
}) {
  const { t } = useTranslation();
  const s = styles(theme);
  const color = STATUS_COLOR[request.status];
  const step = request.status === "processing" ? 1 : 0;
  const steps = [
    t("shop.payout.steps.requested"),
    t("shop.payout.steps.sending"),
    t("shop.payout.steps.done"),
  ];

  return (
    <Animated.View entering={FadeInDown.duration(360)} style={s.card}>
      <View style={s.head}>
        <View style={[s.headIcon, { backgroundColor: color + "1F" }]}>
          <Ionicons name={STATUS_ICON[request.status]} size={16} color={color} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={s.title}>{t("shop.payout.openTitle")}</Text>
          <Text style={s.desc}>{t("shop.payout.openDesc")}</Text>
        </View>
      </View>

      <View style={s.amountBox}>
        <View style={{ flex: 1 }}>
          <Text style={s.amountBig}>{t("shop.payout.amount", { n: fmt(request.amountUzs) })}</Text>
          <Text style={s.amountSub} numberOfLines={1}>
            {`${brandLabel(request.brand)} •••• ${request.cardLast4}`}
          </Text>
          <Text style={[s.amountSub, s.amountHolder]} numberOfLines={1}>
            {request.cardHolder}
          </Text>
        </View>
        <View style={s.gemPill}>
          <Ionicons name="diamond" size={12} color="#3BB6E5" />
          <Text style={s.gemPillText}>{fmt(request.gems)}</Text>
        </View>
      </View>

      <View style={s.steps}>
        {steps.map((label, i) => (
          <View key={label} style={s.stepCol}>
            <View style={s.stepTrack}>
              <View style={[s.stepLine, i === 0 && s.hidden, i <= step && { backgroundColor: color }]} />
              <StepDot state={i < step ? "done" : i === step ? "active" : "todo"} color={color} theme={theme} />
              <View style={[s.stepLine, i === steps.length - 1 && s.hidden, i < step && { backgroundColor: color }]} />
            </View>
            <Text style={[s.stepText, i <= step && { color: theme.text }]} numberOfLines={1}>
              {label}
            </Text>
          </View>
        ))}
      </View>

      {request.status === "pending" ? (
        <Pressable
          disabled={busy}
          onPress={onCancel}
          style={({ pressed }) => [s.cancelBtn, pressed && { transform: [{ translateY: 2 }], borderBottomWidth: 1 }]}
        >
          {busy ? (
            <ActivityIndicator color="#E5379B" />
          ) : (
            <Text style={s.cancelText}>{t("shop.payout.cancel")}</Text>
          )}
        </Pressable>
      ) : (
        <View style={s.notice}>
          <Ionicons name="lock-closed" size={14} color={theme.textSecondary} />
          <Text style={s.noticeText}>{t("shop.payout.processingNote")}</Text>
        </View>
      )}
    </Animated.View>
  );
}

/** 지금 단계는 숨 쉬듯 퍼지는 링 — 멈춘 화면이 아니라 처리 중이라는 느낌 */
function StepDot({
  state,
  color,
  theme,
}: {
  state: "done" | "active" | "todo";
  color: string;
  theme: ThemeColors;
}) {
  const s = styles(theme);
  const pulse = useSharedValue(0);
  useEffect(() => {
    if (state !== "active") return;
    pulse.value = withRepeat(
      withTiming(1, { duration: 1400, easing: Easing.out(Easing.quad) }),
      -1,
      false,
    );
    return () => cancelAnimation(pulse);
  }, [state, pulse]);
  const ring = useAnimatedStyle(() => ({
    opacity: 0.45 * (1 - pulse.value),
    transform: [{ scale: 1 + pulse.value * 0.9 }],
  }));

  return (
    <View style={s.dotWrap}>
      {state === "active" && <Animated.View style={[s.dotRing, { backgroundColor: color }, ring]} />}
      <View
        style={[
          s.dot,
          state === "todo" && { backgroundColor: theme.border },
          state !== "todo" && { backgroundColor: color },
        ]}
      >
        {state === "done" && <Ionicons name="checkmark" size={12} color="#fff" />}
        {state === "active" && <View style={s.dotCore} />}
      </View>
    </View>
  );
}

function RecentRow({ item, theme }: { item: GemPayout; theme: ThemeColors }) {
  const { t } = useTranslation();
  const s = styles(theme);
  const color = STATUS_COLOR[item.status];
  const when = item.completedAt ?? item.rejectedAt ?? item.createdAt;
  return (
    <View style={s.recentRow}>
      <View style={[s.recentIcon, { backgroundColor: color + "1F" }]}>
        <Ionicons name={STATUS_ICON[item.status]} size={15} color={color} />
      </View>
      <View style={{ flex: 1, minWidth: 0 }}>
        <View style={s.recentTop}>
          <Text style={s.recentAmount} numberOfLines={1}>
            {t("shop.payout.amount", { n: fmt(item.amountUzs) })}
          </Text>
          <Text style={[s.recentStatus, { color }]}>{t(`shop.payout.status.${item.status}`)}</Text>
        </View>
        <Text style={s.recentMeta} numberOfLines={1}>
          {brandLabel(item.brand)} •••• {item.cardLast4} · {dateLabel(when)}
        </Text>
        {item.status === "rejected" && (
          <Text style={s.recentReason}>
            {t(`shop.payout.reasons.${item.rejectReason ?? "other"}`)} ·{" "}
            {t("shop.payout.refunded", { gems: fmt(item.gems) })}
          </Text>
        )}
      </View>
    </View>
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
    loadFail: {
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
      padding: 10,
      borderRadius: 12,
      backgroundColor: "#F59E0B1A",
    },
    loadFailText: { flex: 1, fontSize: 12, fontWeight: "700", color: "#B45309" },
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
    fieldBad: { borderColor: "#E5379B" },
    input: {
      flex: 1,
      paddingVertical: 12,
      fontSize: 16,
      fontWeight: "800",
      color: theme.text,
      letterSpacing: 0.8,
    },
    holderInput: { fontSize: 15, letterSpacing: 0.4 },
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
    // ── 진행 중 ──
    amountBox: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      padding: 14,
      borderRadius: 16,
      backgroundColor: theme.bg === "#ffffff" ? "#F6F5FD" : "#1D1D26",
    },
    amountBig: { fontSize: 24, fontWeight: "900", color: theme.text, letterSpacing: -0.3 },
    amountSub: { fontSize: 12, fontWeight: "700", color: theme.textSecondary, marginTop: 3 },
    amountHolder: { marginTop: 1, letterSpacing: 0.3 },
    gemPill: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingHorizontal: 9,
      paddingVertical: 5,
      borderRadius: 999,
      backgroundColor: "#3BB6E51F",
    },
    gemPillText: { fontSize: 12, fontWeight: "900", color: "#2A94BC" },
    steps: { flexDirection: "row" },
    stepCol: { flex: 1, alignItems: "center", gap: 7 },
    stepTrack: { flexDirection: "row", alignItems: "center", alignSelf: "stretch" },
    stepLine: { flex: 1, height: 3, borderRadius: 2, backgroundColor: theme.border },
    hidden: { opacity: 0 },
    stepText: { fontSize: 11, fontWeight: "800", color: theme.textSecondary },
    dotWrap: { width: 22, height: 22, alignItems: "center", justifyContent: "center" },
    dotRing: { position: "absolute", width: 22, height: 22, borderRadius: 11 },
    dot: { width: 22, height: 22, borderRadius: 11, alignItems: "center", justifyContent: "center" },
    dotCore: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#fff" },
    cancelBtn: {
      minHeight: 46,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 14,
      borderWidth: 2,
      borderColor: "#E5379B55",
      borderBottomWidth: 4,
      backgroundColor: theme.surface,
    },
    cancelText: { fontSize: 14, fontWeight: "900", color: "#E5379B" },
    notice: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      padding: 11,
      borderRadius: 13,
      backgroundColor: theme.bg === "#ffffff" ? "#F4F4F8" : "#1D1D26",
    },
    noticeText: {
      flex: 1,
      fontSize: 12,
      lineHeight: 17,
      fontWeight: "700",
      color: theme.textSecondary,
    },
    // ── 최근 결과 ──
    recentCard: {
      marginHorizontal: 20,
      marginBottom: 12,
      paddingHorizontal: 14,
      paddingVertical: 12,
      borderRadius: 18,
      borderWidth: 2,
      borderColor: theme.border,
      backgroundColor: theme.surface,
      gap: 10,
    },
    recentTitle: { fontSize: 12, fontWeight: "900", color: theme.textSecondary },
    recentRow: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
    recentIcon: {
      width: 30,
      height: 30,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
    },
    recentTop: { flexDirection: "row", alignItems: "center", gap: 8 },
    recentAmount: { flex: 1, fontSize: 14, fontWeight: "900", color: theme.text },
    recentStatus: { fontSize: 11, fontWeight: "900" },
    recentMeta: { fontSize: 11, fontWeight: "700", color: theme.textSecondary, marginTop: 2 },
    recentReason: { fontSize: 11, lineHeight: 16, fontWeight: "700", color: "#E5379B", marginTop: 4 },
  });
