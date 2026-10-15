import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import Animated, { FadeIn } from "react-native-reanimated";
import { TITLE_LOOK, TITLE_ORDER, type PaidTitle, type TitleId } from "@/components/avatar/avatarTitles";
import NameTitle from "@/components/avatar/NameTitle";
import { cosmeticPrice, getShopPickerStyles, ownsCosmetic } from "@/components/avatar/AuraPicker";
import Button3D from "@/features/retention/components/Button3D";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";
import type { AvatarConfig } from "@/types/avatar";
import type { CosmeticsState } from "@/services/cosmetics.service";

/**
 * 캐릭터 에디터의 "칭호" 탭 — 텔레그램 title-picker 와 같다.
 * 이름표를 줄로 보여 주고, 누르면 위 히어로에 바로 달린다. 다시 누르면 뗀다.
 * 세트 칭호는 그 세트를 입어 본 사람만 — 지금 입고 있는 것(draft)까지 쳐서 잠금을 푼다
 * (서버도 같은 저장에서 세트를 처음 입으며 칭호를 다는 걸 허락한다).
 */
const fmt = (n: number) => n.toLocaleString("en-US");
const GEM = "#1899D6";

/**
 * 세트 칭호 잠금.
 * - 서버가 owned 에 넣어 줬으면(세트를 받아 둠) 열림
 * - 아니면 지금 입고 있는 것(draft)으로 세트를 다 채웠을 때만 열림.
 *   owned 에는 무료라 "모두의 것"인 아이템도 들어 있어서, 입지 않은 건 치지 않는다
 */
export function titleLocked(state: CosmeticsState | null, id: PaidTitle, draft: AvatarConfig) {
  if (!TITLE_LOOK[id].set) return false;
  if (state?.owned.includes(id)) return false;
  const requires = state?.items.find((item) => item.id === id)?.requires;
  if (!requires) return true; // 목록을 아직 못 받았으면 잠가 둔다
  const worn = new Set<string>([draft.costume, draft.hat, draft.hand]);
  return !requires.every((group) => group.some((itemId) => worn.has(itemId) && ownsCosmetic(state, itemId)));
}

export function TitleGrid({
  draft,
  equipped,
  onToggle,
  onRetry,
  state,
  status,
}: {
  draft: AvatarConfig;
  /** 지금 저장돼 있는 칭호 */
  equipped: string;
  onToggle: (id: TitleId) => void;
  onRetry: () => void;
  state: CosmeticsState | null;
  status: "loading" | "ready" | "failed";
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = useMemo(() => getShopPickerStyles(theme), [theme]);
  const local = useMemo(() => getLocalStyles(theme), [theme]);

  if (status === "failed") {
    return (
      <View style={s.failed}>
        <Ionicons name="cloud-offline" size={26} color={theme.textSecondary} />
        <Text style={s.failedText}>{t("avatarEditor.nameTitle.loadFailed")}</Text>
        <Button3D label={t("avatarEditor.aura.retry")} onPress={onRetry} compact />
      </View>
    );
  }

  const row = (id: PaidTitle) => (
    <TitleRow
      key={id}
      id={id}
      draft={draft}
      selected={draft.title === id}
      wearing={equipped === id}
      locked={titleLocked(state, id, draft)}
      owned={ownsCosmetic(state, id)}
      price={status === "loading" ? null : cosmeticPrice(state, id)}
      onPress={() => onToggle(id)}
    />
  );

  return (
    <Animated.View entering={FadeIn.duration(220)} style={{ paddingHorizontal: 16 }}>
      <Text style={s.headTitle}>{t("avatarEditor.nameTitle.title")}</Text>
      <Text style={s.headSub}>{t("avatarEditor.nameTitle.subtitle")}</Text>
      <View style={local.list}>{TITLE_ORDER.filter((id) => !TITLE_LOOK[id].set).map(row)}</View>
      <View style={local.groupHead}>
        <Text style={local.groupTitle}>{t("avatarEditor.nameTitle.setGroup")}</Text>
        <Text style={local.groupHint}>{t("avatarEditor.nameTitle.setHint")}</Text>
      </View>
      <View style={local.list}>{TITLE_ORDER.filter((id) => TITLE_LOOK[id].set).map(row)}</View>
    </Animated.View>
  );
}

function TitleRow({
  id,
  selected,
  wearing,
  locked,
  owned,
  price,
  onPress,
}: {
  id: PaidTitle;
  draft: AvatarConfig;
  selected: boolean;
  wearing: boolean;
  locked: boolean;
  owned: boolean;
  price: number | null;
  onPress: () => void;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const s = useMemo(() => getShopPickerStyles(theme), [theme]);
  const local = useMemo(() => getLocalStyles(theme), [theme]);
  const set = TITLE_LOOK[id].set;
  return (
    <Pressable
      disabled={locked}
      onPress={onPress}
      style={({ pressed }) => [
        local.row,
        selected && local.selected,
        pressed && !locked && { transform: [{ scale: 0.98 }] },
      ]}
    >
      <View style={local.plateWrap}>
        <View style={locked ? local.lockedPlate : null}>
          <NameTitle title={id} />
        </View>
        {locked && set && <Text style={local.hint}>{t(`avatarEditor.nameTitle.lockedBy.${set}`)}</Text>}
      </View>
      {locked ? (
        <View style={local.lockChip}>
          <Ionicons name="lock-closed" size={12} color={theme.textSecondary} />
          <Text style={local.lockText}>{t("avatarEditor.nameTitle.locked")}</Text>
        </View>
      ) : wearing ? (
        <View style={[s.pill, { backgroundColor: theme.primary }]}>
          <Text style={[s.pillText, { color: "#FFFFFF" }]}>{t("avatarEditor.nameTitle.inUse")}</Text>
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
      {selected && (
        <View style={local.check}>
          <Ionicons name="checkmark" size={13} color="#FFFFFF" />
        </View>
      )}
    </Pressable>
  );
}

const getLocalStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    list: { gap: 8 },
    groupHead: { marginTop: 18, marginBottom: 10, marginHorizontal: 4, gap: 2 },
    groupTitle: { color: theme.text, fontSize: 14, fontWeight: "900" },
    groupHint: { color: theme.textSecondary, fontSize: 12, fontWeight: "700" },
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      minHeight: 56,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 16,
      borderWidth: 2,
      borderBottomWidth: 4,
      borderColor: theme.border,
      backgroundColor: theme.surface,
    },
    selected: { borderColor: theme.primary, borderBottomColor: "#554CB5" },
    plateWrap: { flex: 1, minWidth: 0, alignItems: "flex-start", gap: 4 },
    lockedPlate: { opacity: 0.45 },
    hint: { color: theme.textSecondary, fontSize: 11.5, fontWeight: "700" },
    lockChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 3,
      borderRadius: 999,
      borderWidth: 1.5,
      borderColor: theme.border,
      backgroundColor: theme.bg,
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    lockText: { color: theme.textSecondary, fontSize: 12, fontWeight: "900" },
    check: {
      position: "absolute",
      right: -6,
      top: -8,
      width: 22,
      height: 22,
      borderRadius: 11,
      borderWidth: 2,
      borderColor: "#FFFFFF",
      backgroundColor: theme.primary,
      alignItems: "center",
      justifyContent: "center",
    },
  });
