import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import Animated, { FadeIn } from "react-native-reanimated";
import AvatarPreview from "@/components/avatar/AvatarPreview";
import { RARITY_COLOR } from "@/components/avatar/AvatarAura";
import {
  WEAR_LOOK,
  WEAR_SETS,
  isCostume,
  setProgress,
  type WearItemId,
  type WearSlot,
} from "@/components/avatar/avatarWearables";
import { cosmeticPrice, getShopPickerStyles, ownsCosmetic } from "@/components/avatar/AuraPicker";
import Button3D from "@/features/retention/components/Button3D";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";
import type { AvatarConfig } from "@/types/avatar";
import type { CosmeticsState } from "@/services/cosmetics.service";

/**
 * 캐릭터 에디터의 "세트" 탭 — 의상(costume)·손(hand). 텔레그램 wear-picker 와 같다.
 * 세트마다 묶어서 보여 준다 (K팝: 무대 의상 · 응원봉 · 마이크). 몇 칸 채웠는지 칩.
 * 카드를 누르면 입고, 입은 걸 한 번 더 누르면 벗는다. 안 산 것이면 아래 버튼 → 시트 (오라와 같은 흐름).
 */
const fmt = (n: number) => n.toLocaleString("en-US");
const GEM = "#1899D6";
const SET_ICON: Record<(typeof WEAR_SETS)[number]["id"], keyof typeof Ionicons.glyphMap> = { kpop: "musical-notes" };

const slotOfWear = (id: WearItemId): WearSlot => (isCostume(id) ? "costume" : "hand");

export function WearGrid({
  draft,
  equipped,
  onToggle,
  onRetry,
  state,
  status,
}: {
  draft: AvatarConfig;
  /** 지금 저장돼 있는 칸들 */
  equipped: Partial<Record<WearSlot, string>>;
  onToggle: (slot: WearSlot, id: WearItemId) => void;
  onRetry: () => void;
  state: CosmeticsState | null;
  status: "loading" | "ready" | "failed";
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = useMemo(() => getShopPickerStyles(theme), [theme]);
  const local = useMemo(() => getLocalStyles(theme), [theme]);
  const { width } = useWindowDimensions();
  const cardW = (Math.min(width, 520) - 16 * 2 - 12) / 2;

  if (status === "failed") {
    return (
      <View style={s.failed}>
        <Ionicons name="cloud-offline" size={26} color={theme.textSecondary} />
        <Text style={s.failedText}>{t("avatarEditor.wear.loadFailed")}</Text>
        <Button3D label={t("avatarEditor.aura.retry")} onPress={onRetry} compact />
      </View>
    );
  }

  return (
    <Animated.View entering={FadeIn.duration(220)} style={{ paddingHorizontal: 16 }}>
      <Text style={s.headTitle}>{t("avatarEditor.wear.title")}</Text>
      <Text style={s.headSub}>{t("avatarEditor.wear.subtitle")}</Text>
      {WEAR_SETS.map((set) => {
        const progress = setProgress(set, draft);
        const ids = set.parts.flatMap((part) => part.ids);
        return (
          <View key={set.id} style={local.set}>
            <View style={local.setHead}>
              <View style={local.setIcon}>
                <Ionicons name={SET_ICON[set.id]} size={18} color={theme.primary} />
              </View>
              <View style={local.setText}>
                <Text style={local.setName}>{t(`avatarEditor.wear.sets.${set.id}.name`)}</Text>
                <Text style={local.setDesc}>{t(`avatarEditor.wear.sets.${set.id}.desc`)}</Text>
              </View>
              {progress.complete ? (
                <View style={[local.progress, local.complete]}>
                  <Ionicons name="checkmark-circle" size={14} color="#1DBB7F" />
                  <Text style={[local.progressText, { color: "#1DBB7F" }]}>{t("avatarEditor.wear.done")}</Text>
                </View>
              ) : (
                <View style={local.progress}>
                  <Text style={local.progressText}>
                    {t("avatarEditor.wear.progress", { n: progress.done, total: progress.total })}
                  </Text>
                </View>
              )}
            </View>
            <View style={s.grid}>
              {ids.map((id) => {
                const slot = slotOfWear(id);
                return (
                  <WearCard
                    key={id}
                    id={id}
                    width={cardW}
                    draft={draft}
                    selected={draft[slot] === id}
                    wearing={equipped[slot] === id}
                    owned={ownsCosmetic(state, id)}
                    price={status === "loading" ? null : cosmeticPrice(state, id)}
                    onPress={() => onToggle(slot, id)}
                  />
                );
              })}
            </View>
          </View>
        );
      })}
    </Animated.View>
  );
}

function WearCard({
  id,
  width,
  draft,
  selected,
  wearing,
  owned,
  price,
  onPress,
}: {
  id: WearItemId;
  width: number;
  draft: AvatarConfig;
  selected: boolean;
  wearing: boolean;
  owned: boolean;
  price: number | null;
  onPress: () => void;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = useMemo(() => getShopPickerStyles(theme), [theme]);
  const look = WEAR_LOOK[id];
  const rarity = RARITY_COLOR[look.rarity];
  const previewH = width * 0.86;
  const worn = { ...draft, [slotOfWear(id)]: id } as AvatarConfig;
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
        {/* 카드가 여러 장이라 오라는 안 그린다 */}
        <AvatarPreview avatar={worn} size={previewH * 0.9} showBackground={false} />
        <View style={[s.rarity, { backgroundColor: rarity }]}>
          <Text style={s.rarityText}>{t(`avatarEditor.aura.rarity.${look.rarity}`)}</Text>
        </View>
        {selected && (
          <View style={s.check}>
            <Ionicons name="checkmark" size={14} color="#FFFFFF" />
          </View>
        )}
      </LinearGradient>
      <View style={[s.info, cardInfo.info]}>
        <Text style={[s.name, cardInfo.name]} numberOfLines={2}>
          {t(`avatarEditor.wear.items.${id}.name`)}
        </Text>
        {wearing ? (
          <View style={[s.pill, { backgroundColor: theme.primary }]}>
            <Text style={[s.pillText, { color: "#FFFFFF" }]}>{t("avatarEditor.wear.inUse")}</Text>
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

const cardInfo = StyleSheet.create({
  info: { flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: 5, flexGrow: 1 },
  name: { flex: 0 },
});

const getLocalStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    set: { marginBottom: 18 },
    setHead: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10, marginHorizontal: 2 },
    setIcon: {
      width: 36,
      height: 36,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.primary + "24",
    },
    setText: { flex: 1, minWidth: 0 },
    setName: { color: theme.text, fontSize: 14, fontWeight: "900" },
    setDesc: { color: theme.textSecondary, fontSize: 11.5, lineHeight: 15, fontWeight: "700", marginTop: 1 },
    progress: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      borderRadius: 999,
      borderWidth: 1.5,
      borderColor: theme.border,
      backgroundColor: theme.bg,
      paddingHorizontal: 9,
      paddingVertical: 4,
    },
    complete: { backgroundColor: "#1DBB7F24", borderColor: "transparent" },
    progressText: { color: theme.textSecondary, fontSize: 12, fontWeight: "900", fontVariant: ["tabular-nums"] },
  });
