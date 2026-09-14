import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";
import { EnergyService, type EnergyState } from "@/services/energy.service";
import {
  ShopService,
  type GemPass,
  type GemPassList,
} from "@/services/shop.service";
import { ApiError } from "@/services/api";
import { useAuthStore } from "@/store/auth.store";
import GemHero from "./GemHero";
import PassCard from "./PassCard";
import SuperCard from "./SuperCard";
import EnergySection from "./EnergySection";
import WithdrawCard from "./WithdrawCard";

/**
 * 상점 (Do'kon).
 *
 * 화면의 주제는 **보석**이다. 맨 위가 보유 보석, 그다음이 보석의 주 용도인
 * 프리미엄 기간권, 그 아래가 SUPER 유도, 에너지, 출금 순서다.
 *
 * ⚠️ SUPER 유저에게는 에너지 구역을 아예 렌더하지 않는다 — SUPER 는 에너지를
 *    쓰지 않아서 잔량도 충전도 의미가 없다.
 *
 * ⚠️ 키보드: 출금 입력이 화면 맨 아래라 키보드가 덮는다. android 는 app.json 의
 *    softwareKeyboardLayoutMode: "resize" 로 스크롤뷰가 줄어들므로, 포커스가
 *    가면 끝으로 스크롤하고 여분 패딩을 넣어 버튼까지 올린다.
 */
const KEYBOARD_PAD = 260;

export default function ShopScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = styles(theme);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [energy, setEnergy] = useState<EnergyState | null>(null);
  const [passList, setPassList] = useState<GemPassList | null>(null);
  const [passesUnavailable, setPassesUnavailable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [kbPad, setKbPad] = useState(0);

  const scrollRef = useRef<ScrollView>(null);

  const syncUser = (next: { energy?: number; gems?: number }) => {
    const cur = useAuthStore.getState().user;
    if (cur) useAuthStore.getState().setUserData({ ...cur, ...next } as never);
  };

  const load = useCallback(() => {
    void Promise.all([
      EnergyService.getState().catch(() => null),
      ShopService.getGemPasses().catch((e: unknown) => {
        // 서버에 아직 이 엔드포인트가 없으면(미배포) 목록이 빈 채로 뜬다.
        // 조용히 비워두면 "상품이 없다" 로 읽히므로 화면이 이유를 말하고
        // 다시 시도할 수 있게 한다.
        if (e instanceof ApiError) setPassesUnavailable(true);
        return null;
      }),
    ])
      .then(([e, p]) => {
        if (e) {
          setEnergy(e);
          syncUser({ energy: e.energy, gems: e.gems });
        }
        if (p) {
          setPassList(p);
          setPassesUnavailable(false);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  // 키보드가 내려가면 여분 패딩을 거둔다
  useEffect(() => {
    const hide = Keyboard.addListener("keyboardDidHide", () => setKbPad(0));
    return () => hide.remove();
  }, []);

  const onInputFocus = () => {
    setKbPad(KEYBOARD_PAD);
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 140);
  };

  /** 서버는 에러 코드만 준다. 여기서 유저 언어로 바꾼다 */
  const explain = (e: unknown) =>
    t(`shop.errors.${(e as { message?: string })?.message}`, {
      defaultValue: t("shop.errors.UNKNOWN"),
    });

  const run = async (fn: () => Promise<void>) => {
    if (busy) return;
    setBusy(true);
    try {
      await fn();
    } catch (e) {
      Alert.alert("", explain(e));
    } finally {
      setBusy(false);
    }
  };

  const buyPass = (pass: GemPass) =>
    Alert.alert(
      t("shop.confirmTitle"),
      t("shop.confirmBody", {
        days: pass.days,
        gems: pass.gems.toLocaleString("en-US"),
      }),
      [
        { text: t("common.cancel"), style: "cancel" },
        {
          text: t("shop.confirmOk"),
          onPress: () =>
            void run(async () => {
              const res = await ShopService.redeemGemPass(pass.id);
              syncUser({ gems: res.gems });
              Alert.alert("", t("shop.passDone", { n: res.days }));
              load();
            }),
        },
      ],
    );

  const refill = () =>
    run(async () => {
      const next = await EnergyService.refill();
      setEnergy(next);
      syncUser({ energy: next.energy, gems: next.gems });
    });

  const claimFree = () =>
    run(async () => {
      const next = await EnergyService.claimFree();
      setEnergy(next);
      syncUser({ energy: next.energy, gems: next.gems });
    });

  const close = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/");
  };

  if (loading) {
    return (
      <View style={[s.container, s.center]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  const gems = passList?.gems ?? energy?.gems ?? 0;
  const isSuper = energy?.isSuper ?? false;
  const passes = passList?.passes ?? [];
  const basePerDay = passes[0]?.perDay ?? 0;
  const until = passList?.premiumUntil ? new Date(passList.premiumUntil) : null;
  const untilLabel = until
    ? `${until.getFullYear()}.${String(until.getMonth() + 1).padStart(2, "0")}.${String(until.getDate()).padStart(2, "0")}`
    : null;

  return (
    <View style={s.container}>
      {/* 헤더 */}
      <View style={[s.header, { paddingTop: insets.top + 10 }]}>
        <Pressable onPress={close} hitSlop={12} style={s.closeBtn}>
          <Ionicons name="close" size={24} color={theme.textSecondary} />
        </Pressable>
        <Text style={s.headerTitle}>{t("home.shop")}</Text>
        <View style={s.gemChip}>
          <Ionicons name="diamond" size={16} color="#3BB6E5" />
          <Text style={s.gemChipText}>{gems.toLocaleString("en-US")}</Text>
        </View>
      </View>

      <ScrollView
        ref={scrollRef}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
      >
        <GemHero gems={gems} premiumUntilLabel={untilLabel} />

        {/* ── 프리미엄 기간권 ── 보석의 주 용도 */}
        <Text style={s.sectionLabel}>{t("shop.premiumTitle")}</Text>
        <Text style={s.sectionDesc}>{t("shop.premiumDesc")}</Text>

        {passesUnavailable ? (
          <View style={s.retryCard}>
            <Ionicons name="cloud-offline-outline" size={26} color={theme.textSecondary} />
            <Text style={s.retryText}>{t("shop.passesUnavailable")}</Text>
            <Pressable
              onPress={() => {
                setPassesUnavailable(false);
                setLoading(true);
                load();
              }}
              style={({ pressed }) => [
                s.retryBtn,
                pressed && { transform: [{ translateY: 2 }], borderBottomWidth: 1 },
              ]}
            >
              <Ionicons name="refresh" size={15} color="#fff" />
              <Text style={s.retryBtnText}>{t("common.retry")}</Text>
            </Pressable>
          </View>
        ) : (
          passes.map((pass, i) => (
            <Animated.View
              key={pass.id}
              entering={FadeInDown.delay(i * 60).duration(340)}
            >
              <PassCard
                pass={pass}
                index={i}
                basePerDay={basePerDay}
                featured={i === passes.length - 1}
                gems={gems}
                disabled={busy}
                onPress={() => buyPass(pass)}
              />
            </Animated.View>
          ))
        )}

        {/* 스택 상한 안내 — 왜 더 못 사는지 */}
        {passList && passList.stackedDays > 0 && (
          <Text style={s.stackNote}>
            {t("shop.stackNote", {
              now: passList.stackedDays,
              max: passList.maxStackDays,
            })}
          </Text>
        )}

        {/* ── SUPER ── */}
        <Text style={[s.sectionLabel, { marginTop: 22 }]}>
          {t("shop.superTitle")}
        </Text>
        <SuperCard isSuper={isSuper} onPress={() => router.push("/premium")} />

        {/* ── 에너지 ── SUPER 는 에너지를 안 쓴다. 통째로 안 그린다 */}
        {!isSuper && (
          <EnergySection
            energy={energy?.energy ?? 0}
            maxEnergy={energy?.maxEnergy ?? 25}
            etaHours={energy?.etaHours ?? 0}
            etaMinutes={energy?.etaMinutes ?? 0}
            refillCost={energy?.refillCost ?? 350}
            freeRemaining={energy?.freeRemaining ?? 0}
            canRefill={gems >= (energy?.refillCost ?? 350)}
            busy={busy}
            onRefill={refill}
            onFree={claimFree}
          />
        )}

        {/* ── 출금 ── */}
        <WithdrawCard gems={gems} onInputFocus={onInputFocus} />

        <View style={{ height: kbPad }} />
      </ScrollView>
    </View>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    center: { alignItems: "center", justifyContent: "center" },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingBottom: 10,
    },
    closeBtn: { width: 40 },
    headerTitle: { fontSize: 19, fontWeight: "900", color: theme.text },
    gemChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      minWidth: 40,
      justifyContent: "flex-end",
    },
    gemChipText: { fontSize: 16, fontWeight: "900", color: "#3BB6E5" },
    sectionLabel: {
      fontSize: 13,
      fontWeight: "900",
      letterSpacing: 0.6,
      color: theme.textSecondary,
      textTransform: "uppercase",
      paddingHorizontal: 20,
      marginBottom: 4,
    },
    sectionDesc: {
      fontSize: 12,
      lineHeight: 18,
      color: theme.textSecondary,
      paddingHorizontal: 20,
      marginBottom: 12,
    },
    stackNote: {
      fontSize: 11,
      lineHeight: 16,
      fontWeight: "700",
      color: theme.textSecondary,
      paddingHorizontal: 22,
      marginTop: -2,
    },
    retryCard: {
      alignItems: "center",
      gap: 12,
      marginHorizontal: 20,
      paddingVertical: 26,
      paddingHorizontal: 18,
      borderRadius: 20,
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
      borderStyle: "dashed",
    },
    retryText: {
      fontSize: 13,
      lineHeight: 19,
      fontWeight: "700",
      color: theme.textSecondary,
      textAlign: "center",
    },
    retryBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 18,
      paddingVertical: 10,
      borderRadius: 14,
      backgroundColor: theme.primary,
      borderBottomWidth: 3,
      borderBottomColor: "#5448E0",
    },
    retryBtnText: { color: "#fff", fontSize: 13, fontWeight: "900" },
  });
