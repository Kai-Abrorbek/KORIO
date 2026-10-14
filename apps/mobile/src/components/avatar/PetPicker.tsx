import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import Animated, { FadeIn } from "react-native-reanimated";
import { RARITY_COLOR } from "@/components/avatar/AvatarAura";
import { PET_LOOK, PET_ORDER, PetImage, isPet, petStage, type PetId } from "@/components/avatar/AvatarPet";
import PetGrowth from "@/components/avatar/PetGrowth";
import { cosmeticPrice, getShopPickerStyles, ownsCosmetic } from "@/components/avatar/AuraPicker";
import Button3D from "@/features/retention/components/Button3D";
import { useTheme } from "@/hooks/useTheme";
import type { AvatarConfig } from "@/types/avatar";
import type { CosmeticsState } from "@/services/cosmetics.service";
import { useAuthStore } from "@/store/auth.store";
import { useAvatarStudyStore } from "@/store/avatar-study.store";

/**
 * 캐릭터 에디터의 "펫" 탭 — 텔레그램 pet-picker 와 같다.
 * 위: 고른 펫이 자라는 세 단계 + 지금 연속 학습일. 아래: 펫 카드 (지금 단계 모습).
 * 카드를 누르면 위 큰 캐릭터 옆에 바로 선다. 안 산 것이면 아래 버튼 → 시트 (오라와 같은 흐름).
 */
const fmt = (n: number) => n.toLocaleString("en-US");
const GEM = "#1899D6";

export function PetGrid({
  draft,
  equipped,
  onPick,
  onRetry,
  state,
  status,
  streak,
}: {
  draft: AvatarConfig;
  /** 지금 저장돼 있는 펫 */
  equipped: string;
  onPick: (id: PetId) => void;
  onRetry: () => void;
  state: CosmeticsState | null;
  status: "loading" | "ready" | "failed";
  streak: number;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = useMemo(() => getShopPickerStyles(theme), [theme]);
  const { width } = useWindowDimensions();
  const userId = useAuthStore((current) => current.user?.id);
  const starCount = useAvatarStudyStore((current) => userId ? (current.petStars?.[userId] ?? 0) : 0);
  const cardW = (Math.min(width, 520) - 16 * 2 - 12) / 2;

  if (status === "failed") {
    return (
      <View style={s.failed}>
        <Ionicons name="cloud-offline" size={26} color={theme.textSecondary} />
        <Text style={s.failedText}>{t("avatarEditor.pet.loadFailed")}</Text>
        <Button3D label={t("avatarEditor.aura.retry")} onPress={onRetry} compact />
      </View>
    );
  }

  return (
    <Animated.View entering={FadeIn.duration(220)} style={{ paddingHorizontal: 16 }}>
      <Text style={s.headTitle}>{t("avatarEditor.pet.title")}</Text>
      <Text style={s.headSub}>{t("avatarEditor.pet.subtitle")}</Text>
      {isPet(draft.pet) ? (
        <View style={local.starBadge}>
          <Ionicons name="star" size={14} color="#9E6A00" />
          <Text style={local.starText}>{t("avatarEditor.pet.reviewStars", { n: starCount })}</Text>
        </View>
      ) : null}
      <View style={local.growth}>
        <PetGrowth pet={isPet(draft.pet) ? draft.pet : "pet_jindo"} streak={streak} />
      </View>
      <View style={s.grid}>
        {(["pet_none", ...PET_ORDER] as PetId[]).map((id) => (
          <PetCard
            key={id}
            id={id}
            width={cardW}
            streak={streak}
            selected={(draft.pet ?? "pet_none") === id}
            wearing={equipped === id}
            owned={ownsCosmetic(state, id)}
            price={status === "loading" ? null : cosmeticPrice(state, id)}
            onPress={() => onPick(id)}
          />
        ))}
      </View>
    </Animated.View>
  );
}

function PetCard({
  id,
  width,
  streak,
  selected,
  wearing,
  owned,
  price,
  onPress,
}: {
  id: PetId;
  width: number;
  streak: number;
  selected: boolean;
  wearing: boolean;
  owned: boolean;
  price: number | null;
  onPress: () => void;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = useMemo(() => getShopPickerStyles(theme), [theme]);
  const look = isPet(id) ? PET_LOOK[id] : null;
  const rarity = look ? RARITY_COLOR[look.rarity] : theme.border;
  const previewH = width / 1.2;
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
        colors={[rarity + "14", rarity + "2E"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[s.preview, local.preview, { height: previewH }]}
      >
        {isPet(id) ? (
          <PetImage pet={id} stage={petStage(streak)} size={previewH * 0.86} />
        ) : (
          <View style={local.none}>
            <Ionicons name="paw-outline" size={34} color={theme.textSecondary} />
          </View>
        )}
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
      <View style={[s.info, local.info]}>
        <Text style={[s.name, local.name]} numberOfLines={2}>
          {id === "pet_none" ? t("avatarEditor.pet.none") : t(`avatarEditor.pet.items.${id}.name`)}
        </Text>
        {id === "pet_none" ? null : wearing ? (
          <View style={[s.pill, { backgroundColor: theme.primary }]}>
            <Text style={[s.pillText, { color: "#FFFFFF" }]}>{t("avatarEditor.pet.inUse")}</Text>
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

const local = StyleSheet.create({
  starBadge: { alignSelf: "flex-start", flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#FFF2BD", borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6, marginBottom: 10 },
  starText: { color: "#77520A", fontSize: 12, fontWeight: "800" },
  growth: { marginBottom: 12 },
  preview: { justifyContent: "flex-end", paddingBottom: 2 },
  none: { flex: 1, alignSelf: "stretch", alignItems: "center", justifyContent: "center", opacity: 0.55 },
  info: { flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: 5, flexGrow: 1 },
  name: { flex: 0 },
});
