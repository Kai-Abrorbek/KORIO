import { useEffect, useMemo } from "react";
import { Modal, Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import Animated, { FadeIn } from "react-native-reanimated";
import AvatarPreview from "@/components/avatar/AvatarPreview";
import { AURA_LOOK, AURA_ORDER, RARITY_COLOR, isAura, type AuraId } from "@/components/avatar/AvatarAura";
import { SCENE_LOOK, SceneBackdrop, isScene, type PaidScene } from "@/components/avatar/AvatarScene";
import AvatarPet, { PET_LOOK, isPet, type PaidPet } from "@/components/avatar/AvatarPet";
import PetGrowth from "@/components/avatar/PetGrowth";
import { WEAR_LOOK, isWearItem, wearSlotOf, type WearItemId } from "@/components/avatar/avatarWearables";
import { TITLE_LOOK, isTitle, type PaidTitle } from "@/components/avatar/avatarTitles";
import NameTitle from "@/components/avatar/NameTitle";
import Button3D from "@/features/retention/components/Button3D";
import SwipeSheet from "@/components/common/SwipeSheet";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";
import type { AvatarConfig } from "@/types/avatar";
import type { CosmeticsState } from "@/services/cosmetics.service";
import * as Haptics from "@/utils/haptics";

/**
 * 캐릭터 에디터의 "Aura" 탭 — 텔레그램 aura-picker 와 같다.
 * 카드를 누르면 바로 입어본다(위 큰 캐릭터에 오라가 뜬다). 사는 건 아래 버튼 → 시트.
 * 사는 시트·산 직후 창은 배경 장면(ScenePicker)과 같이 쓴다.
 */
const fmt = (n: number) => n.toLocaleString("en-US");
const GEM = "#1899D6";

/** 상점 꾸미기 아이템 (오라 · 배경 장면 · 펫 · 의상 · 모자 · 손 · 칭호) */
export type ShopItemId = Exclude<AuraId, "aura_none"> | PaidScene | PaidPet | WearItemId | PaidTitle;
export type ShopSlot = "aura" | "scene" | "pet" | "costume" | "hand" | "hat" | "title";

export const slotOf = (id: ShopItemId): ShopSlot =>
  isScene(id) ? "scene" : isPet(id) ? "pet" : isWearItem(id) ? wearSlotOf(id) : isTitle(id) ? "title" : "aura";

/** 칭호 등급 색 (시트 강조) */
const TITLE_COLOR = { common: "#776EE2", rare: "#1899D6", epic: "#A946DA", legendary: "#E2A83A" } as const;

export function cosmeticPrice(state: CosmeticsState | null, id: string) {
  return state?.items.find((item) => item.id === id)?.price ?? null;
}

/** 이 칸 아이템이 전부 무료인가 — 에디터 위 배지를 보석 잔액 대신 "전부 무료" 로 */
export function slotAllFree(state: CosmeticsState | null, slot: ShopSlot) {
  const items = state?.items.filter((item) => item.slot === slot) ?? [];
  return items.length > 0 && items.every((item) => item.price <= 0);
}

/** 가격 0 = 무료 (서버는 무료 아이템을 owned 에도 넣어 준다). 없음(_none)은 늘 가진 것 */
export function ownsCosmetic(state: CosmeticsState | null, id: string | undefined) {
  if (!id || id.endsWith("_none")) return true;
  return !!state?.owned.includes(id);
}

const isShopItem = (id: unknown): id is ShopItemId =>
  isAura(id) || isScene(id) || isPet(id) || isWearItem(id) || isTitle(id);

/** 사는 시트·산 직후 창의 색 — 오라는 오라 빛, 장면·펫은 강조색 */
function shopLook(id: ShopItemId) {
  if (isScene(id)) return { rarity: SCENE_LOOK[id].rarity, color: SCENE_LOOK[id].accent, keys: "avatarEditor.scene" };
  if (isPet(id)) return { rarity: PET_LOOK[id].rarity, color: PET_LOOK[id].accent, keys: "avatarEditor.pet" };
  if (isWearItem(id)) return { rarity: WEAR_LOOK[id].rarity, color: WEAR_LOOK[id].accent, keys: "avatarEditor.wear" };
  if (isTitle(id)) return { rarity: TITLE_LOOK[id].rarity, color: TITLE_COLOR[TITLE_LOOK[id].rarity], keys: "avatarEditor.nameTitle" };
  return { rarity: AURA_LOOK[id].rarity, color: AURA_LOOK[id].color, keys: "avatarEditor.aura" };
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
    <Animated.View entering={FadeIn.duration(220)} style={{ paddingHorizontal: 16 }}>
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
            owned={ownsCosmetic(state, id)}
            price={status === "loading" ? null : cosmeticPrice(state, id)}
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

/** 시트·산 직후 창 위 그림 — 오라는 오라 두른 캐릭터, 장면은 그 장면 앞에, 펫은 캐릭터 옆에(크게) */
function ShopStage({
  avatar,
  id,
  height,
  s,
  streak = 0,
}: {
  avatar: AvatarConfig;
  id: ShopItemId;
  height: number;
  s: ReturnType<typeof getStyles>;
  streak?: number;
}) {
  if (isTitle(id)) {
    // 칭호 — 캐릭터 밑 이름표
    const color = TITLE_COLOR[TITLE_LOOK[id].rarity];
    return (
      <LinearGradient
        colors={[color + "1F", color + "47"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[s.sceneStage, { height, paddingBottom: 12 }]}
      >
        <SceneBackdrop scene={avatar.scene} />
        <AvatarPreview avatar={avatar} size={height * 0.7} showBackground={false} aura />
        <NameTitle title={id} style={{ alignSelf: "center", marginTop: -6 }} />
      </LinearGradient>
    );
  }
  if (isWearItem(id)) {
    // 의상·모자·손 — 그 아이템을 입은 캐릭터 (장면이 있으면 그 앞에)
    const look = WEAR_LOOK[id];
    const worn = { ...avatar, [wearSlotOf(id)]: id } as AvatarConfig;
    return (
      <LinearGradient
        colors={[look.accent + "1F", look.accent + "47"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[s.sceneStage, { height }]}
      >
        <SceneBackdrop scene={avatar.scene} />
        <AvatarPreview avatar={worn} size={height * 0.84} showBackground={false} aura />
      </LinearGradient>
    );
  }
  if (isPet(id)) {
    const look = PET_LOOK[id];
    const size = height * 0.84;
    return (
      <LinearGradient
        colors={[look.accent + "1F", look.accent + "47"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[s.sceneStage, { height }]}
      >
        <SceneBackdrop scene={avatar.scene} />
        {/* 캐릭터를 오른쪽으로 비켜 세워 펫 자리를 낸다 */}
        <View style={{ width: size, height: size, marginLeft: size * 0.36 }}>
          <AvatarPreview avatar={avatar} size={size} showBackground={false} aura />
          <AvatarPet pet={id} streak={streak} avatarSize={size} share={0.64} />
        </View>
      </LinearGradient>
    );
  }
  if (isScene(id)) {
    return (
      <View style={[s.sceneStage, { height }]}>
        <SceneBackdrop scene={id} />
        <AvatarPreview avatar={{ ...avatar, scene: id }} size={height * 0.84} showBackground={false} aura />
      </View>
    );
  }
  const look = AURA_LOOK[id];
  return (
    <LinearGradient colors={["#241F4A", "#3B2F7A"]} style={[s.stage, { height }]}>
      <View style={[s.stageGlow, { backgroundColor: look.color + "40" }]} />
      <AvatarPreview avatar={{ ...avatar, aura: id }} size={height * 0.9} showBackground={false} aura />
    </LinearGradient>
  );
}

/** 사기 전 확인 — 크게 입어보고, 값·내 보석·모자란 만큼 (오라 · 배경 장면) */
export function CosmeticBuySheet({
  visible,
  avatar,
  id,
  price,
  gems,
  buying,
  error,
  onBuy,
  onClose,
  streak = 0,
}: {
  visible: boolean;
  avatar: AvatarConfig;
  id: ShopItemId | null;
  price: number;
  gems: number;
  buying: boolean;
  error: boolean;
  onBuy: () => void;
  onClose: () => void;
  /** 펫이면 지금 단계 모습·자라는 단계를 보여 준다 */
  streak?: number;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = useMemo(() => getStyles(theme), [theme]);
  if (!isShopItem(id)) return null;
  const look = shopLook(id);
  const rarity = RARITY_COLOR[look.rarity];
  const short = Math.max(0, price - gems);

  return (
    // 바닥에 붙고 아래로 끌어 닫는 시트, 페이드로만 열린다 (사는 중엔 못 닫음)
    <SwipeSheet dismissible={!buying} onClose={onClose} visible={visible}>
      {/* 펫은 아래에 자라는 단계 표가 더 붙어서 무대를 조금 낮춘다 (작은 폰에서도 시트가 넘치지 않게) */}
      <ShopStage avatar={avatar} id={id} height={isPet(id) ? 168 : 200} s={s} streak={streak} />
      <View style={[s.sheetRarity, { backgroundColor: rarity }]}>
        <Text style={s.rarityText}>{t(`avatarEditor.aura.rarity.${look.rarity}`)}</Text>
      </View>
      {/* 칭호는 문구 자체가 이름 — 설명 자리에 안내 */}
      <Text style={s.sheetTitle}>{t(isTitle(id) ? `${look.keys}.items.${id}` : `${look.keys}.items.${id}.name`)}</Text>
      <Text style={s.sheetDesc}>{t(isTitle(id) ? `${look.keys}.subtitle` : `${look.keys}.items.${id}.desc`)}</Text>
      {isPet(id) && (
        <View style={{ marginTop: 12 }}>
          <PetGrowth pet={id} streak={streak} />
        </View>
      )}

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
        label={t(`${look.keys}.buyWear`)}
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
    </SwipeSheet>
  );
}

/** 산 직후 — 페이드로만 뜬다 (빛 터짐·튕김 없음) */
export function CosmeticBought({
  avatar,
  id,
  onClose,
  streak = 0,
}: {
  avatar: AvatarConfig;
  id: ShopItemId | null;
  onClose: () => void;
  streak?: number;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = useMemo(() => getStyles(theme), [theme]);
  useEffect(() => {
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, []);
  if (!isShopItem(id)) return null;
  const look = shopLook(id);
  return (
    <Modal visible transparent animationType="fade" statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
      <View style={s.center}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={s.bought}>
          {isScene(id) || isPet(id) || isWearItem(id) || isTitle(id) ? (
            <ShopStage avatar={avatar} id={id} height={170} s={s} streak={streak} />
          ) : (
            <>
              <View style={[s.boughtGlow, { backgroundColor: look.color + "33" }]} />
              <AvatarPreview avatar={{ ...avatar, aura: id }} size={170} showBackground={false} aura />
            </>
          )}
          <Text style={s.sheetTitle}>{t(`${look.keys}.boughtTitle`)}</Text>
          <Text style={[s.sheetDesc, { marginBottom: 16 }]}>{t(`${look.keys}.boughtBody`)}</Text>
          <Button3D label={t("avatarEditor.aura.great")} color="#1FA4DC" depthColor="#157FAE" onPress={onClose} style={{ alignSelf: "stretch" }} />
        </View>
      </View>
    </Modal>
  );
}

/** ScenePicker 가 같은 카드 모양을 쓴다 */
export const getShopPickerStyles = (theme: ThemeColors) => getStyles(theme);

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

    stage: { height: 200, borderRadius: 22, alignItems: "center", justifyContent: "flex-end", overflow: "hidden", paddingBottom: 6 },
    // 배경 장면 — 그림 앞에 캐릭터 (발이 그림의 땅에 닿게 아래에 붙인다)
    sceneStage: { alignSelf: "stretch", borderRadius: 22, alignItems: "center", justifyContent: "flex-end", overflow: "hidden", paddingBottom: 4 },
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
    boughtGlow: { position: "absolute", top: 20, width: 190, height: 190, borderRadius: 95 },
  });
