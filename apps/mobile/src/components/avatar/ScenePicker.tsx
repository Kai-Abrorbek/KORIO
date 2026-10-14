import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import Animated, { FadeIn } from "react-native-reanimated";
import AvatarPreview, { AVATAR_BACKGROUNDS } from "@/components/avatar/AvatarPreview";
import { RARITY_COLOR } from "@/components/avatar/AvatarAura";
import { SCENE_LOOK, SCENE_ORDER, SceneBackdrop, isScene, type SceneId } from "@/components/avatar/AvatarScene";
import { cosmeticPrice, getShopPickerStyles, ownsCosmetic } from "@/components/avatar/AuraPicker";
import Button3D from "@/features/retention/components/Button3D";
import { useTheme } from "@/hooks/useTheme";
import type { AvatarConfig } from "@/types/avatar";
import type { CosmeticsState } from "@/services/cosmetics.service";

/**
 * 캐릭터 에디터의 "장면" 탭 — 서울 여행 배경 그림. 텔레그램 scene-picker 와 같다.
 * 카드를 누르면 위 큰 캐릭터 뒤에 바로 깔린다. 안 산 것이면 아래 버튼 → 시트 (오라와 같은 흐름).
 * 그림은 움직이지 않는다.
 */
const fmt = (n: number) => n.toLocaleString("en-US");
const GEM = "#1899D6";

export function SceneGrid({
  draft,
  equipped,
  onPick,
  onRetry,
  state,
  status,
}: {
  draft: AvatarConfig;
  /** 지금 저장돼 있는 장면 */
  equipped: string;
  onPick: (id: SceneId) => void;
  onRetry: () => void;
  state: CosmeticsState | null;
  status: "loading" | "ready" | "failed";
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = useMemo(() => getShopPickerStyles(theme), [theme]);
  const { width } = useWindowDimensions();
  const cardW = (Math.min(width, 520) - 16 * 2 - 12) / 2;

  if (status === "failed") {
    return (
      <View style={s.failed}>
        <Ionicons name="cloud-offline" size={26} color={theme.textSecondary} />
        <Text style={s.failedText}>{t("avatarEditor.scene.loadFailed")}</Text>
        <Button3D label={t("avatarEditor.aura.retry")} onPress={onRetry} compact />
      </View>
    );
  }

  return (
    <Animated.View entering={FadeIn.duration(220)} style={{ paddingHorizontal: 16 }}>
      <Text style={s.headTitle}>{t("avatarEditor.scene.title")}</Text>
      <Text style={s.headSub}>{t("avatarEditor.scene.subtitle")}</Text>
      <View style={s.grid}>
        {(["scene_none", ...SCENE_ORDER] as SceneId[]).map((id) => (
          <SceneCard
            key={id}
            id={id}
            width={cardW}
            draft={draft}
            selected={(draft.scene ?? "scene_none") === id}
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

function SceneCard({
  id,
  width,
  draft,
  selected,
  wearing,
  owned,
  price,
  onPress,
}: {
  id: SceneId;
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
  const look = isScene(id) ? SCENE_LOOK[id] : null;
  const rarity = look ? RARITY_COLOR[look.rarity] : theme.border;
  const previewH = width / 1.2;
  // 장면 없음 = 내가 고른 색 배경
  const plain = AVATAR_BACKGROUNDS[draft.background] ?? AVATAR_BACKGROUNDS.background_lilac;
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
      <View style={[s.preview, local.preview, { height: previewH, paddingBottom: previewH * 0.06 }]}>
        {isScene(id) ? (
          <SceneBackdrop scene={id} />
        ) : (
          <LinearGradient colors={plain} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
        )}
        {/* 그림이 보이게 캐릭터를 조금 작게 (카드가 여러 장이라 오라는 안 그린다) */}
        <AvatarPreview avatar={draft} size={previewH * 0.78} showBackground={false} />
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
      </View>
      {/* 장면 이름이 길어서 — 이름 아래에 무료·가격 알약 */}
      <View style={[s.info, local.info]}>
        <Text style={[s.name, local.name]} numberOfLines={2}>
          {id === "scene_none" ? t("avatarEditor.scene.none") : t(`avatarEditor.scene.items.${id}.name`)}
        </Text>
        {id === "scene_none" ? null : wearing ? (
          <View style={[s.pill, { backgroundColor: theme.primary }]}>
            <Text style={[s.pillText, { color: "#FFFFFF" }]}>{t("avatarEditor.scene.inUse")}</Text>
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
  preview: { justifyContent: "flex-end" },
  info: { flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: 5, flexGrow: 1 },
  name: { flex: 0 },
});
