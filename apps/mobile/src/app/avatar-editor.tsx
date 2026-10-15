import {
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "@/utils/haptics";
import { useRouter, type Href } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import Animated, { FadeIn, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { AVATAR_BACKGROUNDS } from "@/components/avatar/AvatarPreview";
import AvatarComboStage from "@/components/avatar/AvatarComboStage";
import AvatarOptionCard from "@/components/avatar/AvatarOptionCard";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { AVATAR_CATEGORIES } from "@/constants/avatar.catalog";
import { useAvatarEditorStore } from "@/store/avatar-editor.store";
import { useAuthStore } from "@/store/auth.store";
import { useTheme } from "@/hooks/useTheme";
import { useSpeech } from "@/hooks/useSpeech";
import type { ThemeColors } from "@/constants/theme";
import { mergeAvatarConfig } from "@/types/avatar";
import type { AvatarConfig, AvatarOption } from "@/types/avatar";
import { useCallback, useEffect, useRef, useState } from "react";
import { UserService } from "@/services/user.service";
import { CosmeticsService, type CosmeticsState } from "@/services/cosmetics.service";
import { AURA_LOOK, RARITY_COLOR, type AuraId } from "@/components/avatar/AvatarAura";
import { SCENE_LOOK, SceneBackdrop, isScene, sceneHeroColors, type SceneId } from "@/components/avatar/AvatarScene";
import {
  AuraGrid,
  CosmeticBought,
  CosmeticBuySheet,
  cosmeticPrice,
  ownsCosmetic,
  slotAllFree,
  slotOf,
  type ShopItemId,
  type ShopSlot,
} from "@/components/avatar/AuraPicker";
import { WearGrid } from "@/components/avatar/WearPicker";
import { TitleGrid } from "@/components/avatar/TitlePicker";
import NameTitle from "@/components/avatar/NameTitle";
import { TITLE_LOOK, isTitle, type TitleId } from "@/components/avatar/avatarTitles";
import { WEAR_LOOK, isWearItem, type WearItemId, type WearSlot } from "@/components/avatar/avatarWearables";
import { SceneGrid } from "@/components/avatar/ScenePicker";
import { PetGrid } from "@/components/avatar/PetPicker";
import { PET_LOOK, isPet, type PetId } from "@/components/avatar/AvatarPet";
import Button3D from "@/features/retention/components/Button3D";
import ConfirmDialog from "@/components/common/ConfirmDialog";

/** 상점 칸 — 아바타에 장착되는 꾸미기 */
const SHOP_SLOTS: ShopSlot[] = ["aura", "scene", "pet", "costume", "hat", "hand", "title"];
const isShopSlot = (value: string): value is ShopSlot => (SHOP_SLOTS as string[]).includes(value);

/** 산 아이템을 입힌 모양 — 제 칸에 */
function wear(config: AvatarConfig, item: ShopItemId): AvatarConfig {
  return { ...config, [slotOf(item)]: item } as AvatarConfig;
}

/** 등급 · 글 묶음 (시트·배지 문구) */
function rarityOf(item: ShopItemId) {
  if (isScene(item)) return SCENE_LOOK[item].rarity;
  if (isPet(item)) return PET_LOOK[item].rarity;
  if (isWearItem(item)) return WEAR_LOOK[item].rarity;
  if (isTitle(item)) return TITLE_LOOK[item].rarity;
  return AURA_LOOK[item].rarity;
}
function keysOf(item: ShopItemId) {
  const slot = slotOf(item);
  if (slot === "title") return "avatarEditor.nameTitle";
  return `avatarEditor.${slot === "costume" || slot === "hand" || slot === "hat" ? "wear" : slot}`;
}

export default function AvatarEditorScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { t } = useTranslation();
  const theme = useTheme();
  const { speak: speakAvatarWord } = useSpeech();
  const styles = getStyles(theme);
  const [isSaving, setIsSaving] = useState(false);
  const avatar = useAuthStore((state) => state.user?.avatar);
  const userGems = useAuthStore((state) => state.user?.gems);
  // 펫은 연속 학습일만큼 자란 모습으로 보인다
  const streak = useAuthStore((state) => state.user?.streak ?? 0);
  const updateUser = useAuthStore((state) => state.updateUser);

  const draft = useAvatarEditorStore((state) => state.draft);
  const initial = useAvatarEditorStore((state) => state.initial);
  const selectedCategory = useAvatarEditorStore(
    (state) => state.selectedCategory,
  );
  const startEditing = useAvatarEditorStore((state) => state.startEditing);
  const selectCategory = useAvatarEditorStore((state) => state.selectCategory);
  const setPart = useAvatarEditorStore((state) => state.setPart);
  const reset = useAvatarEditorStore((state) => state.reset);
  const randomize = useAvatarEditorStore((state) => state.randomize);
  const patchInitial = useAvatarEditorStore((state) => state.patchInitial);

  // 상점 꾸미기 (오라 · 배경 장면, 보석으로 산다) — 목록 · 가진 것 · 보석
  const [cosmetics, setCosmetics] = useState<CosmeticsState | null>(null);
  const [cosStatus, setCosStatus] = useState<"loading" | "ready" | "failed">("loading");
  const [buyOpen, setBuyOpen] = useState(false);
  const [buying, setBuying] = useState(false);
  const [buyError, setBuyError] = useState(false);
  const [bought, setBought] = useState<ShopItemId | null>(null);
  // 기본 Alert 대신 앱 안 확인창
  const [discardOpen, setDiscardOpen] = useState(false);
  const [saveFailedOpen, setSaveFailedOpen] = useState(false);
  const [headerCollapsed, setHeaderCollapsed] = useState(false);
  const headerVisibility = useSharedValue(1);
  const optionsScrollRef = useRef<ScrollView>(null);
  const scrollAnchor = useRef(0);
  const bottomRevealOffset = useRef<number | null>(null);
  const headerStyle = useAnimatedStyle(() => ({
    height: 60 * headerVisibility.value,
    paddingTop: 8 * headerVisibility.value,
    paddingBottom: 10 * headerVisibility.value,
    opacity: headerVisibility.value,
  }));

  useEffect(() => {
    headerVisibility.value = withTiming(headerCollapsed ? 0 : 1, { duration: 220 });
  }, [headerCollapsed, headerVisibility]);

  const handleOptionsScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const y = Math.max(0, contentOffset.y);
    const maxOffset = Math.max(0, contentSize.height - layoutMeasurement.height);
    const atBottom = maxOffset > 2
      ? y >= maxOffset - 2
      : headerCollapsed;

    if (atBottom) {
      setHeaderCollapsed(false);
      // 펼친 헤더 때문에 스크롤 영역이 줄어도 다시 접히지 않게 유지한다.
      bottomRevealOffset.current = Math.max(bottomRevealOffset.current ?? y, y);
      scrollAnchor.current = y;
      return;
    }

    if (bottomRevealOffset.current !== null) {
      // 목록 끝에서 벗어나 새로 위로 스크롤하기 전까지 펼친 상태를 유지한다.
      if (y < bottomRevealOffset.current - 24) {
        bottomRevealOffset.current = null;
        scrollAnchor.current = y;
      }
      return;
    }

    if (y - scrollAnchor.current > 24) {
      setHeaderCollapsed(true);
      scrollAnchor.current = y;
    } else if (y < scrollAnchor.current) {
      scrollAnchor.current = y;
    }
  }, [headerCollapsed]);

  const category =
    AVATAR_CATEGORIES.find((item) => item.id === selectedCategory) ??
    AVATAR_CATEGORIES[0];

  const heroAvatarSize = Math.min(width * 0.66, 220);
  const cardGap = 10;
  const horizontalPadding = 16;
  const cardSize = Math.min(
    118,
    (width - horizontalPadding * 2 - cardGap * 2) / 3,
  );

  const hasChanges = JSON.stringify(draft) !== JSON.stringify(initial);
  const dirty = useRef(hasChanges);
  dirty.current = hasChanges;

  const draftScene = isScene(draft.scene) ? draft.scene : null;
  const cosReady = cosStatus === "ready";
  // 입어보는 중 — 상점 칸마다 아직 안 산 걸 입고 있나
  const pendingBySlot = Object.fromEntries(
    SHOP_SLOTS.map((slot) => {
      const id: string = draft[slot];
      return [slot, cosReady && !id.endsWith("_none") && !ownsCosmetic(cosmetics, id) ? (id as ShopItemId) : null];
    }),
  ) as Record<ShopSlot, ShopItemId | null>;
  // 보고 있는 탭이 어느 칸인지 (세트 탭 = 의상·손)
  const tabSlots: ShopSlot[] =
    selectedCategory === "costume" ? ["costume", "hat", "hand"] : isShopSlot(selectedCategory) ? [selectedCategory] : [];
  // 살 것 — 보고 있는 탭 쪽 먼저
  const pending: ShopItemId | null =
    [...tabSlots, ...SHOP_SLOTS].map((slot) => pendingBySlot[slot]).find((id) => id !== null) ?? null;
  const tryingOn = pending !== null;
  const tryPrice = pending ? (cosmeticPrice(cosmetics, pending) ?? 0) : 0;
  const gems = cosmetics?.gems ?? userGems ?? 0;
  // "빼고 저장" — 안 산 것만 저장된 것으로 되돌린 모양
  const withoutPending = SHOP_SLOTS.reduce<AvatarConfig>(
    (config, slot) => (pendingBySlot[slot] ? ({ ...config, [slot]: initial[slot] } as AvatarConfig) : config),
    draft,
  );
  const otherChanges = JSON.stringify(withoutPending) !== JSON.stringify(initial);
  // 상점 탭 — 위 배지가 "전부 무료" 또는 보석 잔액
  const shopTab =
    tabSlots.length > 0
      ? selectedCategory === "costume"
        ? "wear"
        : selectedCategory === "title"
          ? "nameTitle"
          : tabSlots[0]
      : null;
  const shopTabFree = tabSlots.length > 0 && tabSlots.every((slot) => slotAllFree(cosmetics, slot));

  // 선택된 캐릭터 배경색으로 hero 전체를 채운다 (이중 배경 제거). 장면을 골랐으면 그림이 깔리고 색은 그 밑
  const heroBg =
    sceneHeroColors(draft.scene)?.colors ??
    AVATAR_BACKGROUNDS[mergeAvatarConfig(draft).background] ??
    AVATAR_BACKGROUNDS.background_cloud;

  // 계정 아바타가 바뀌면 다시 맞춘다 — 단 고치던 게 있으면 덮지 않는다 (오라를 산 직후 등)
  useEffect(() => {
    if (dirty.current) return;
    startEditing(avatar);
  }, [avatar, startEditing]);

  const loadCosmetics = useCallback(async () => {
    setCosStatus("loading");
    try {
      setCosmetics(await CosmeticsService.list());
      setCosStatus("ready");
    } catch {
      setCosStatus("failed");
    }
  }, []);

  useEffect(() => {
    void loadCosmetics();
  }, [loadCosmetics]);

  const handleAuraPick = (id: AuraId) => {
    void Haptics.selectionAsync();
    setPart("aura", id);
  };

  // 세트 — 누르면 입고, 입은 걸 다시 누르면 벗는다
  const handleWearToggle = (slot: WearSlot, id: WearItemId) => {
    void Haptics.selectionAsync();
    setPart(slot, draft[slot] === id ? `${slot}_none` : id);
  };

  // 칭호 — 누르면 달고, 단 걸 다시 누르면 뗀다
  const handleTitleToggle = (id: TitleId) => {
    void Haptics.selectionAsync();
    setPart("title", draft.title === id ? "title_none" : id);
  };

  const handlePetPick = (id: PetId) => {
    void Haptics.selectionAsync();
    setPart("pet", id);
  };

  const handleScenePick = (id: SceneId) => {
    void Haptics.selectionAsync();
    setPart("scene", id);
  };

  const handleBuy = async () => {
    if (!pending || buying) return;
    const item = pending;
    setBuying(true);
    setBuyError(false);
    try {
      const result = await CosmeticsService.purchase(item, true);
      setCosmetics((current) =>
        current
          ? {
              ...current,
              gems: result.gems,
              owned: result.owned,
              equipped: { ...current.equipped, [slotOf(item)]: item },
            }
          : current,
      );
      // 저장된 쪽도 이 아이템으로 — 고치던 다른 부분은 그대로 둔다
      patchInitial({ [slotOf(item)]: item } as Partial<AvatarConfig>);
      updateUser({
        avatar: wear(mergeAvatarConfig(avatar), item),
        gems: result.gems,
      } as any);
      setBuyOpen(false);
      setBought(item);
    } catch {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setBuyError(true);
      void loadCosmetics();
    } finally {
      setBuying(false);
    }
  };

  const makeCandidate = (option: AvatarOption): AvatarConfig =>
    ({
      ...draft,
      [category.id]: option.id,
    }) as AvatarConfig;

  const handleClose = () => {
    if (isSaving) return;

    if (!hasChanges) {
      router.back();
      return;
    }

    setDiscardOpen(true);
  };

  const handleCategoryPress = (id: typeof selectedCategory) => {
    void Haptics.selectionAsync();
    selectCategory(id);
    optionsScrollRef.current?.scrollTo({ y: 0, animated: false });
    scrollAnchor.current = 0;
    bottomRevealOffset.current = null;
    setHeaderCollapsed(false);
  };

  const handleOptionPress = (option: AvatarOption) => {
    void Haptics.selectionAsync();
    setPart(category.id, option.id);
  };

  const handleRandomize = () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    randomize();
  };

  const handleReset = () => {
    void Haptics.selectionAsync();
    reset();
  };

  const handleSave = async (skipPending = false) => {
    if (isSaving) return;

    setIsSaving(true);

    try {
      const result = await UserService.updateAvatar(
        skipPending ? withoutPending : draft,
      );

      updateUser({
        avatar: result.avatar,
      });

      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      router.back();
    } catch {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

      setSaveFailedOpen(true);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ height: insets.top, backgroundColor: theme.bg }} />
      <Animated.View
        style={[
          styles.header,
          headerStyle,
        ]}
        pointerEvents={headerCollapsed ? "none" : "auto"}
      >
        <TouchableOpacity
          accessibilityLabel={t("avatarEditor.close")}
          activeOpacity={0.7}
          hitSlop={10}
          style={styles.headerButton}
          onPress={handleClose}
        >
          <Ionicons name="close" size={27} color={theme.text} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{t("avatarEditor.title")}</Text>

        <TouchableOpacity
          activeOpacity={0.7}
          hitSlop={8}
          style={[styles.headerButton, !hasChanges && styles.disabledButton]}
          disabled={!hasChanges}
          onPress={handleReset}
        >
          <Ionicons
            name="arrow-undo"
            size={22}
            color={hasChanges ? theme.text : theme.textSecondary}
          />
        </TouchableOpacity>
      </Animated.View>

      {/* 고정 영역: 캐릭터 프리뷰 (단일 배경) */}
      <Animated.View entering={FadeIn.duration(350)} style={styles.heroOuter}>
        <LinearGradient
          colors={[heroBg[0], heroBg[1]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          {draftScene ? (
            <SceneBackdrop scene={draftScene} living />
          ) : (
            <>
              <View style={styles.heroOrbLarge} />
              <View style={styles.heroOrbSmall} />
            </>
          )}

          {shopTab && shopTabFree ? (
            <View style={styles.freeBadge}>
              <Ionicons name="sparkles" size={14} color="#6B61D8" />

              <Text style={styles.freeBadgeText}>
                {t(`avatarEditor.${shopTab}.freeAll`)}
              </Text>
            </View>
          ) : shopTab ? (
            <View style={styles.freeBadge}>
              <Ionicons name="diamond" size={14} color="#1899D6" />

              <Text style={[styles.freeBadgeText, { color: "#1899D6" }]}>
                {gems.toLocaleString("en-US")}
              </Text>
            </View>
          ) : (
            <View style={styles.freeBadge}>
              <Ionicons name="sparkles" size={14} color="#6B61D8" />

              <Text style={styles.freeBadgeText}>
                {t("avatarEditor.basicFree")}
              </Text>
            </View>
          )}

          {pending && (
            <View
              style={[
                styles.tryOnBadge,
                {
                  backgroundColor: RARITY_COLOR[rarityOf(pending)],
                },
              ]}
            >
              <Text style={styles.tryOnText}>{t(`${keysOf(pending)}.tryOn`)}</Text>
            </View>
          )}

          <AvatarComboStage
            avatar={draft}
            size={heroAvatarSize}
            streak={streak}
            onWordPress={(word) => speakAvatarWord(word, "ko-KR")}
          />

          {/* 칭호 — 히어로 왼쪽 아래 (오른쪽엔 무작위 버튼) */}
          <NameTitle title={draft.title} style={styles.heroTitle} />

          <TouchableOpacity
            activeOpacity={0.84}
            style={styles.randomButton}
            onPress={handleRandomize}
          >
            <View style={styles.randomDepth} />

            <View style={styles.randomFace}>
              <Ionicons name="dice-outline" size={20} color="#FFFFFF" />

              <Text style={styles.randomText}>
                {t("avatarEditor.randomize")}
              </Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>

      {/* 고정 영역: 카테고리 탭 헤더 */}
      <View style={styles.tabHeader}>
        <Text style={styles.subtitle}>{t("avatarEditor.subtitle")}</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContent}
        >
          {AVATAR_CATEGORIES.map((item) => {
            const selected = item.id === selectedCategory;

            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.82}
                style={[
                  styles.categoryButton,
                  selected && styles.categoryButtonSelected,
                ]}
                onPress={() => handleCategoryPress(item.id)}
              >
                <Ionicons
                  name={item.icon}
                  size={20}
                  color={selected ? "#FFFFFF" : theme.textSecondary}
                />

                <Text
                  style={[
                    styles.categoryText,
                    selected && styles.categoryTextSelected,
                  ]}
                >
                  {t(`avatarEditor.categories.${item.id}`)}
                </Text>

                {item.id === "costume" && !selected && (
                  <LinearGradient
                    colors={["#FF6B9A", "#FF9A3C"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.newBadge}
                  >
                    <Text style={styles.newBadgeText}>
                      {t("avatarEditor.aura.newBadge")}
                    </Text>
                  </LinearGradient>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* 독립 스크롤 영역: 옵션 그리드만 */}
      <ScrollView
        ref={optionsScrollRef}
        style={styles.optionsScroll}
        contentContainerStyle={[
          styles.optionsScrollContent,
          {
            paddingBottom: 118 + insets.bottom,
          },
        ]}
        showsVerticalScrollIndicator={false}
        onScroll={handleOptionsScroll}
        scrollEventThrottle={16}
      >
        {category.id === "aura" ? (
          <AuraGrid
            draft={draft}
            equipped={initial.aura ?? "aura_none"}
            onPick={handleAuraPick}
            onRetry={() => void loadCosmetics()}
            state={cosmetics}
            status={cosStatus}
          />
        ) : category.id === "title" ? (
          <TitleGrid
            draft={draft}
            equipped={initial.title ?? "title_none"}
            onToggle={handleTitleToggle}
            onRetry={() => void loadCosmetics()}
            state={cosmetics}
            status={cosStatus}
          />
        ) : category.id === "costume" ? (
          <WearGrid
            draft={draft}
            equipped={{ costume: initial.costume, hat: initial.hat, hand: initial.hand }}
            onToggle={handleWearToggle}
            onRetry={() => void loadCosmetics()}
            state={cosmetics}
            status={cosStatus}
          />
        ) : category.id === "pet" ? (
          <PetGrid
            draft={draft}
            equipped={initial.pet ?? "pet_none"}
            onPick={handlePetPick}
            onRetry={() => void loadCosmetics()}
            state={cosmetics}
            status={cosStatus}
            streak={streak}
          />
        ) : category.id === "scene" ? (
          <SceneGrid
            draft={draft}
            equipped={initial.scene ?? "scene_none"}
            onPick={handleScenePick}
            onRetry={() => void loadCosmetics()}
            state={cosmetics}
            status={cosStatus}
            onOpenAlbum={() => router.push("/avatar-postcards" as Href)}
          />
        ) : (
        <Animated.View
          key={category.id}
          entering={FadeIn.duration(220)}
          style={[
            styles.optionsGrid,
            {
              columnGap: cardGap,
            },
          ]}
        >
          {category.options.map((option) => (
            <AvatarOptionCard
              key={option.id}
              avatar={makeCandidate(option)}
              selected={draft[category.id] === option.id}
              size={cardSize}
              variant={category.preview}
              swatch={option.swatch}
              showBackground={category.id === "background"}
              onPress={() => handleOptionPress(option)}
            />
          ))}
        </Animated.View>
        )}
      </ScrollView>

      <View
        style={[
          styles.bottomBar,
          {
            paddingBottom: Math.max(insets.bottom, 12),
          },
        ]}
      >
        {tryingOn ? (
          <>
            {/* 입어보는 중 — 아래 버튼이 "사기" 로 바뀐다 */}
            <Button3D
              label={`${tryPrice.toLocaleString("en-US")}  ·  ${t("avatarEditor.aura.buy")}`}
              color="#1FA4DC"
              depthColor="#157FAE"
              icon={<Ionicons name="diamond" size={18} color="#FFFFFF" />}
              onPress={() => {
                setBuyError(false);
                setBuyOpen(true);
              }}
            />
            {otherChanges && (
              <TouchableOpacity
                activeOpacity={0.7}
                disabled={isSaving}
                onPress={() => void handleSave(true)}
                style={styles.saveWithout}
              >
                <Text style={styles.saveWithoutText}>
                  {t(`${pending ? keysOf(pending) : "avatarEditor.aura"}.saveWithout`)}
                </Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <PrimaryButton
            label={isSaving ? t("avatarEditor.saving") : t("avatarEditor.save")}
            onPress={() => void handleSave()}
            disabled={isSaving}
            color={theme.primary}
            darkColor="#554CB5"
            style={styles.saveButton}
          />
        )}
      </View>

      <CosmeticBuySheet
        visible={buyOpen}
        avatar={draft}
        id={pending}
        price={tryPrice}
        gems={gems}
        buying={buying}
        error={buyError}
        onBuy={() => void handleBuy()}
        onClose={() => setBuyOpen(false)}
        streak={streak}
      />
      {bought && (
        <CosmeticBought avatar={draft} id={bought} onClose={() => setBought(null)} streak={streak} />
      )}

      <ConfirmDialog
        visible={discardOpen}
        icon="trash-outline"
        title={t("avatarEditor.unsavedTitle")}
        message={t("avatarEditor.unsavedMessage")}
        confirmLabel={t("avatarEditor.discard")}
        cancelLabel={t("avatarEditor.keepEditing")}
        onConfirm={() => {
          setDiscardOpen(false);
          router.back();
        }}
        onCancel={() => setDiscardOpen(false)}
      />
      <ConfirmDialog
        visible={saveFailedOpen}
        tone="warning"
        icon="cloud-offline-outline"
        title={t("avatarEditor.saveFailedTitle")}
        message={t("avatarEditor.saveFailedMessage")}
        confirmLabel={t("common.close")}
        onConfirm={() => setSaveFailedOpen(false)}
        onCancel={() => setSaveFailedOpen(false)}
      />
    </View>
  );
}

const getStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
    },
    header: {
      paddingHorizontal: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: theme.bg,
      zIndex: 5,
      overflow: "hidden",
    },
    headerButton: {
      width: 42,
      height: 42,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.surface,
      borderWidth: 1.5,
      borderColor: theme.border,
    },
    disabledButton: {
      opacity: 0.45,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "900",
      color: theme.text,
      letterSpacing: -0.3,
    },
    heroOuter: {
      marginHorizontal: 16,
      marginTop: 4,
      marginBottom: 16,
    },
    hero: {
      minHeight: 220,
      borderRadius: 30,
      overflow: "hidden",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 40,
      paddingBottom: 28,
      borderWidth: 1.5,
      borderColor: theme.bg === "#15151D" ? "#3C385D" : "#FFFFFF",
    },
    heroOrbLarge: {
      position: "absolute",
      top: -65,
      right: -50,
      width: 190,
      height: 190,
      borderRadius: 999,
      backgroundColor: "rgba(119,110,226,0.15)",
    },
    heroOrbSmall: {
      position: "absolute",
      left: -38,
      bottom: -52,
      width: 150,
      height: 150,
      borderRadius: 999,
      backgroundColor: "rgba(66,190,218,0.12)",
    },
    freeBadge: {
      position: "absolute",
      top: 16,
      left: 16,
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      borderRadius: 999,
      paddingHorizontal: 12,
      paddingVertical: 8,
      backgroundColor: "rgba(255,255,255,0.84)",
      borderWidth: 1,
      borderColor: "rgba(119,110,226,0.17)",
    },
    freeBadgeText: {
      color: "#5D54C5",
      fontSize: 12,
      fontWeight: "900",
    },
    tryOnBadge: {
      position: "absolute",
      top: 16,
      right: 16,
      borderRadius: 999,
      paddingHorizontal: 11,
      paddingVertical: 7,
      zIndex: 2,
    },
    tryOnText: {
      color: "#FFFFFF",
      fontSize: 11.5,
      fontWeight: "900",
    },
    newBadge: {
      borderRadius: 999,
      paddingHorizontal: 6,
      paddingVertical: 2,
    },
    newBadgeText: {
      color: "#FFFFFF",
      fontSize: 9.5,
      fontWeight: "900",
      letterSpacing: 0.3,
    },
    saveWithout: {
      alignSelf: "center",
      paddingVertical: 8,
      paddingHorizontal: 12,
    },
    saveWithoutText: {
      color: theme.textSecondary,
      fontSize: 13.5,
      fontWeight: "800",
    },
    randomButton: {
      position: "absolute",
      right: 17,
      bottom: 17,
      minWidth: 116,
      height: 47,
    },
    heroTitle: {
      position: "absolute",
      left: 16,
      bottom: 22,
      maxWidth: "52%",
      zIndex: 2,
    },
    randomDepth: {
      position: "absolute",
      top: 5,
      left: 0,
      right: 0,
      height: 42,
      borderRadius: 15,
      backgroundColor: "#554CB5",
    },
    randomFace: {
      height: 42,
      borderRadius: 15,
      backgroundColor: theme.primary,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 7,
      paddingHorizontal: 14,
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.2)",
    },
    randomText: {
      fontSize: 13,
      fontWeight: "900",
      color: "#FFFFFF",
    },
    tabHeader: {
      backgroundColor: theme.bg,
      zIndex: 4,
    },
    subtitle: {
      marginHorizontal: 20,
      marginBottom: 14,
      fontSize: 16,
      lineHeight: 22,
      fontWeight: "800",
      color: theme.text,
    },
    categoriesContent: {
      paddingHorizontal: 16,
      paddingBottom: 16,
      gap: 8,
    },
    categoryButton: {
      minHeight: 43,
      paddingHorizontal: 14,
      borderRadius: 15,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 7,
      backgroundColor: theme.surface,
      borderWidth: 1.5,
      borderColor: theme.border,
    },
    categoryButtonSelected: {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
      shadowColor: theme.primary,
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.22,
      shadowRadius: 8,
      elevation: 5,
    },
    categoryText: {
      color: theme.textSecondary,
      fontSize: 13,
      fontWeight: "800",
    },
    categoryTextSelected: {
      color: "#FFFFFF",
    },
    optionsScroll: {
      flex: 1,
    },
    optionsScrollContent: {
      paddingTop: 4,
    },
    optionsGrid: {
      paddingHorizontal: 16,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "flex-start",
      rowGap: 12,
    },
    bottomBar: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      paddingHorizontal: 16,
      paddingTop: 12,
      backgroundColor: theme.surface,
      borderTopWidth: 1.5,
      borderTopColor: theme.border,
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: -8,
      },
      shadowOpacity: 0.08,
      shadowRadius: 14,
      elevation: 15,
    },
    saveButton: {
      width: "100%",
    },
  });
