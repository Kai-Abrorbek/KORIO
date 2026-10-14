import { useEffect, useMemo } from "react";
import { Modal, Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  SlideInDown,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AvatarPreview from "@/components/avatar/AvatarPreview";
import { AURA_LOOK, AURA_ORDER, RARITY_COLOR, isAura, type AuraId } from "@/components/avatar/AvatarAura";
import Button3D from "@/features/retention/components/Button3D";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";
import type { AvatarConfig } from "@/types/avatar";
import type { CosmeticsState } from "@/services/cosmetics.service";
import * as Haptics from "@/utils/haptics";

/**
 * 캐릭터 에디터의 "Aura" 탭 — 텔레그램 aura-picker 와 같다.
 * 카드를 누르면 바로 입어본다(위 큰 캐릭터에 오라가 뜬다). 사는 건 아래 버튼 → 시트.
 */
const fmt = (n: number) => n.toLocaleString("en-US");
const GEM = "#1899D6";

export function auraPrice(state: CosmeticsState | null, id: string) {
  return state?.items.find((item) => item.id === id)?.price ?? null;
}

/** 오라가 전부 무료인가 — 에디터 위 배지를 보석 잔액 대신 "전부 무료" 로 */
export function aurasAllFree(state: CosmeticsState | null) {
  return !!state && state.items.length > 0 && state.items.every((item) => item.price <= 0);
}

export function ownsAura(state: CosmeticsState | null, id: string | undefined) {
  if (!id || id === "aura_none") return true;
  return !!state?.owned.includes(id);
}

export function AuraGrid({
  draft,
  equipped,
  onPick,
  onRetry,
  state,
  status,
}: {
  draft: AvatarConfig;
  equipped: string;
  onPick: (id: AuraId) => void;
  onRetry: () => void;
  state: CosmeticsState | null;
  status: "loading" | "ready" | "failed";
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = useMemo(() => getStyles(theme), [theme]);
  const { width } = useWindowDimensions();
  const cardW = (Math.min(width, 520) - 16 * 2 - 12) / 2;

  if (status === "failed") {
    return (
      <View style={s.failed}>
        <Ionicons name="cloud-offline" size={26} color={theme.textSecondary} />
        <Text style={s.failedText}>{t("avatarEditor.aura.loadFailed")}</Text>
        <Button3D label={t("avatarEditor.aura.retry")} onPress={onRetry} compact />
      </View>
    );
  }

  return (
    <Animated.View entering={FadeInDown.duration(280)} style={{ paddingHorizontal: 16 }}>
      <Text style={s.headTitle}>{t("avatarEditor.aura.title")}</Text>
      <Text style={s.headSub}>{t("avatarEditor.aura.subtitle")}</Text>
      <View style={s.grid}>
        {(["aura_none", ...AURA_ORDER] as AuraId[]).map((id) => (
          <AuraCard
            key={id}
            id={id}
            width={cardW}
            draft={draft}
            selected={(draft.aura ?? "aura_none") === id}
            wearing={equipped === id}
            owned={ownsAura(state, id)}
            price={status === "loading" ? null : auraPrice(state, id)}
            onPress={() => onPick(id)}
            s={s}
          />
        ))}
      </View>
    </Animated.View>
  );
}

function AuraCard({
  id,
  width,
  draft,
  selected,
  wearing,
  owned,
  price,
  onPress,
  s,
}: {
  id: AuraId;
  width: number;
  draft: AvatarConfig;
  selected: boolean;
  wearing: boolean;
  owned: boolean;
  price: number | null;
  onPress: () => void;
  s: ReturnType<typeof getStyles>;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const look = isAura(id) ? AURA_LOOK[id] : null;
  const rarity = look ? RARITY_COLOR[look.rarity] : theme.border;
  const previewH = width * 0.86;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        s.card,
        { width, borderBottomColor: selected ? "#554CB5" : rarity + "8C" },
        selected && s.cardSelected,
        pressed && { transform: [{ scale: 0.96 }] },
      ]}
    >
      <LinearGradient
        colors={[rarity + "1A", rarity + "38"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[s.preview, { height: previewH }]}
      >
        <AvatarPreview
          avatar={{ ...draft, aura: id }}
          size={previewH * 0.9}
          showBackground={false}
          aura
          auraLite
        />
        {look && (
          <View style={[s.rarity, { backgroundColor: rarity }]}>
            <Text style={s.rarityText}>{t(`avatarEditor.aura.rarity.${look.rarity}`)}</Text>
          </View>
        )}
        {selected && (
          <View style={s.check}>
            <Ionicons name="checkmark" size={14} color="#FFFFFF" />
          </View>
        )}
      </LinearGradient>
      <View style={s.info}>
        <Text style={s.name} numberOfLines={2}>
          {id === "aura_none" ? t("avatarEditor.aura.none") : t(`avatarEditor.aura.items.${id}.name`)}
        </Text>
        {id === "aura_none" ? null : wearing ? (
          <View style={[s.pill, { backgroundColor: theme.primary }]}>
            <Text style={[s.pillText, { color: "#FFFFFF" }]}>{t("avatarEditor.aura.wearing")}</Text>
          </View>
        ) : price === 0 ? (
          <View style={[s.pill, { backgroundColor: "#776EE224" }]}>
            <Ionicons name="sparkles" size={11} color="#776EE2" />
            <Text style={[s.pillText, { color: "#776EE2" }]}>{t("avatarEditor.aura.free")}</Text>
          </View>
        ) : owned ? (
          <View style={s.ownedRow}>
            <Ionicons name="checkmark-circle" size={13} color="#1DBB7F" />
            <Text style={[s.pillText, { color: "#1DBB7F" }]}>{t("avatarEditor.aura.owned")}</Text>
          </View>
        ) : (
          <View style={[s.pill, { backgroundColor: "#3BB6E524" }]}>
            <Ionicons name="diamond" size={11} color={GEM} />
            <Text style={[s.pillText, { color: GEM }]}>{price === null ? "…" : fmt(price)}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

/** 사기 전 확인 — 크게 입어보고, 값·내 보석·모자란 만큼 */
export function AuraBuySheet({
  visible,
  avatar,
  id,
  price,
  gems,
  buying,
  error,
  onBuy,
  onClose,
}: {
  visible: boolean;
  avatar: AvatarConfig;
  id: AuraId | null;
  price: number;
  gems: number;
  buying: boolean;
  error: boolean;
  onBuy: () => void;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = useMemo(() => getStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  if (!isAura(id)) return null;
  const look = AURA_LOOK[id];
  const rarity = RARITY_COLOR[look.rarity];
  const short = Math.max(0, price - gems);

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent onRequestClose={buying ? undefined : onClose}>
      <View style={s.sheetRoot}>
        <Pressable style={StyleSheet.absoluteFill} onPress={buying ? undefined : onClose} />
        <Animated.View
          entering={SlideInDown.duration(320).easing(Easing.out(Easing.cubic))}
          style={[s.sheet, { paddingBottom: Math.max(insets.bottom, 14) + 4 }]}
        >
          <View style={s.grabber} />
          <LinearGradient colors={["#241F4A", "#3B2F7A"]} style={s.stage}>
            <View style={[s.stageGlow, { backgroundColor: look.color + "40" }]} />
            <AvatarPreview avatar={{ ...avatar, aura: id }} size={180} showBackground={false} aura />
          </LinearGradient>
          <View style={[s.sheetRarity, { backgroundColor: rarity }]}>
            <Text style={s.rarityText}>{t(`avatarEditor.aura.rarity.${look.rarity}`)}</Text>
          </View>
          <Text style={s.sheetTitle}>{t(`avatarEditor.aura.items.${id}.name`)}</Text>
          <Text style={s.sheetDesc}>{t(`avatarEditor.aura.items.${id}.desc`)}</Text>

          <View style={s.rows}>
            <View style={s.row}>
              <Text style={s.rowLabel}>{t("avatarEditor.aura.price")}</Text>
              <View style={s.rowValue}>
                <Ionicons name="diamond" size={14} color={GEM} />
                <Text style={[s.rowNum, { color: GEM }]}>{fmt(price)}</Text>
              </View>
            </View>
            <View style={s.row}>
              <Text style={s.rowLabel}>{t("avatarEditor.aura.balance")}</Text>
              <View style={s.rowValue}>
                <Ionicons name="diamond" size={14} color={short ? "#E5379B" : GEM} />
                <Text style={[s.rowNum, { color: short ? "#E5379B" : GEM }]}>{fmt(gems)}</Text>
              </View>
            </View>
          </View>

          {short > 0 && <Text style={s.need}>{t("avatarEditor.aura.needMore", { n: fmt(short) })}</Text>}
          {error && <Text style={s.error}>{t("avatarEditor.aura.failed")}</Text>}

          <Button3D
            label={t("avatarEditor.aura.buyWear")}
            color="#1FA4DC"
            depthColor="#157FAE"
            disabled={short > 0}
            loading={buying}
            onPress={onBuy}
            icon={<Ionicons name="diamond" size={18} color="#FFFFFF" />}
          />
          <Pressable onPress={onClose} disabled={buying} hitSlop={6} style={s.later}>
            <Text style={s.laterText}>{t("avatarEditor.aura.later")}</Text>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
}

/** 산 직후 — 빛이 터지는 축하 한 번 */
export function AuraBought({ avatar, id, onClose }: { avatar: AvatarConfig; id: AuraId | null; onClose: () => void }) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = useMemo(() => getStyles(theme), [theme]);
  useEffect(() => {
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, []);
  if (!isAura(id)) return null;
  const look = AURA_LOOK[id];
  return (
    <Modal visible transparent animationType="fade" statusBarTranslucent onRequestClose={onClose}>
      <View style={s.center}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <Animated.View entering={FadeIn.duration(260)} style={s.bought}>
          <View style={s.burst} pointerEvents="none">
            {Array.from({ length: 12 }, (_, i) => (
              <BurstRay key={i} angle={i * 30} index={i} color={look.color} />
            ))}
          </View>
          <View style={[s.boughtGlow, { backgroundColor: look.color + "33" }]} />
          <AvatarPreview avatar={{ ...avatar, aura: id }} size={170} showBackground={false} aura />
          <Text style={s.sheetTitle}>{t("avatarEditor.aura.boughtTitle")}</Text>
          <Text style={[s.sheetDesc, { marginBottom: 16 }]}>{t("avatarEditor.aura.boughtBody")}</Text>
          <Button3D label={t("avatarEditor.aura.great")} color="#1FA4DC" depthColor="#157FAE" onPress={onClose} style={{ alignSelf: "stretch" }} />
        </Animated.View>
      </View>
    </Modal>
  );
}

function BurstRay({ angle, index, color }: { angle: number; index: number; color: string }) {
  const v = useSharedValue(0);
  useEffect(() => {
    v.value = withDelay(index * 18, withTiming(1, { duration: 900, easing: Easing.out(Easing.cubic) }));
  }, [v, index]);
  const style = useAnimatedStyle(() => ({
    opacity: 1 - v.value,
    transform: [{ rotate: `${angle}deg` }, { translateY: -30 - 78 * v.value }, { scaleY: 0.4 + 0.6 * v.value }],
  }));
  return <Animated.View style={[{ position: "absolute", left: 108, top: 103, width: 4, height: 14, borderRadius: 2, backgroundColor: color }, style]} />;
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    headTitle: { color: theme.text, fontSize: 14.5, fontWeight: "900", marginHorizontal: 4 },
    headSub: { color: theme.textSecondary, fontSize: 12, fontWeight: "700", marginHorizontal: 4, marginTop: 2, marginBottom: 12 },
    grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
    card: {
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.border,
      borderBottomWidth: 5,
      borderRadius: 20,
      overflow: "hidden",
    },
    cardSelected: { borderColor: theme.primary },
    preview: { alignItems: "center", justifyContent: "flex-end", overflow: "hidden" },
    rarity: { position: "absolute", left: 8, top: 8, borderRadius: 999, paddingHorizontal: 8, paddingVertical: 3 },
    rarityText: { color: "#FFFFFF", fontSize: 10, fontWeight: "900", letterSpacing: 0.3, textTransform: "uppercase" },
    check: {
      position: "absolute",
      right: 8,
      top: 8,
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: "#FFFFFF",
      backgroundColor: theme.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    info: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 6, minHeight: 44, paddingVertical: 8, paddingLeft: 12, paddingRight: 10 },
    name: { flex: 1, color: theme.text, fontSize: 13.5, lineHeight: 17, fontWeight: "900" },
    pill: { flexDirection: "row", alignItems: "center", gap: 3, borderRadius: 999, paddingHorizontal: 8, paddingVertical: 4 },
    pillText: { fontSize: 12, fontWeight: "900" },
    ownedRow: { flexDirection: "row", alignItems: "center", gap: 3 },
    failed: { alignItems: "center", gap: 8, paddingVertical: 30, paddingHorizontal: 20 },
    failedText: { color: theme.textSecondary, fontSize: 13, fontWeight: "700", textAlign: "center" },

    sheetRoot: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(20,16,40,0.52)" },
    sheet: {
      backgroundColor: theme.surface,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      paddingTop: 8,
      paddingHorizontal: 20,
      alignItems: "stretch",
    },
    grabber: { alignSelf: "center", width: 42, height: 5, borderRadius: 3, backgroundColor: theme.border, marginBottom: 10 },
    stage: { height: 200, borderRadius: 22, alignItems: "center", justifyContent: "flex-end", overflow: "hidden", paddingBottom: 6 },
    stageGlow: { position: "absolute", width: 220, height: 220, borderRadius: 110, top: 10 },
    sheetRarity: { alignSelf: "center", marginTop: 14, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
    sheetTitle: { color: theme.text, fontSize: 22, fontWeight: "900", textAlign: "center", marginTop: 8, marginBottom: 4 },
    sheetDesc: { color: theme.textSecondary, fontSize: 13.5, lineHeight: 19, fontWeight: "700", textAlign: "center" },
    rows: { flexDirection: "row", gap: 8, marginTop: 16, marginBottom: 10 },
    row: {
      flex: 1,
      alignItems: "center",
      gap: 2,
      paddingVertical: 9,
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: theme.border,
      backgroundColor: theme.bg,
    },
    rowLabel: { color: theme.textSecondary, fontSize: 11.5, fontWeight: "800" },
    rowValue: { flexDirection: "row", alignItems: "center", gap: 4 },
    rowNum: { fontSize: 18, fontWeight: "900", fontVariant: ["tabular-nums"] },
    need: { color: "#E5379B", fontSize: 12.5, lineHeight: 17, fontWeight: "800", textAlign: "center", marginBottom: 10 },
    error: { color: "#FF4B4B", fontSize: 12.5, fontWeight: "800", textAlign: "center", marginBottom: 10 },
    later: { alignSelf: "center", paddingVertical: 10, paddingHorizontal: 16, marginTop: 4 },
    laterText: { color: theme.textSecondary, fontSize: 14.5, fontWeight: "800" },

    center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, backgroundColor: "rgba(20,16,40,0.52)" },
    bought: {
      width: "100%",
      maxWidth: 340,
      backgroundColor: theme.surface,
      borderRadius: 28,
      paddingTop: 18,
      paddingBottom: 18,
      paddingHorizontal: 20,
      alignItems: "center",
      overflow: "hidden",
    },
    burst: { position: "absolute", top: 0, width: 220, height: 220, alignSelf: "center" },
    boughtGlow: { position: "absolute", top: 20, width: 190, height: 190, borderRadius: 95 },
  });
