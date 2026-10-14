"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type UIEvent } from "react";
import { useRouter } from "next/navigation";

import {
  mergeAvatarConfig,
  randomAvatar,
  type AvatarConfig,
  type AvatarField,
} from "../../../shared/model/avatar";
import { ConfirmDialog } from "../../../shared/ui/confirm-dialog";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { useKoreanSpeech } from "../../../shared/browser/use-korean-speech";
import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import {
  AVATAR_BACKGROUNDS,
  GeneratedAvatar,
} from "../../league/ui/generated-avatar";
import { updateAvatar } from "../api/profile";
import { getCosmetics, purchaseCosmetic, type CosmeticsState } from "../api/cosmetics";
import { AVATAR_CATEGORIES, type AvatarOption } from "../model/avatar-catalog";
import styles from "./avatar-editor-screen.module.css";
import { playSfx } from "../../../shared/browser/sfx";
import { uzt } from "../../../shared/i18n/uz-text";
import { AURA_LOOK, RARITY_COLOR, type AuraId } from "../../../shared/ui/avatar-aura";
import { SCENE_LOOK, SceneBackdrop, isScene, sceneHeroColors, type SceneId } from "../../../shared/ui/avatar-scene";
import { PET_LOOK, isPet, type PetId } from "../../../shared/ui/avatar-pet";
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
} from "./aura-picker";
import { WEAR_LOOK, isWearItem, type WearItemId, type WearSlot } from "../../../shared/model/avatar-wearables";
import { WearGrid } from "./wear-picker";
import { SceneGrid } from "./scene-picker";
import { PetGrid } from "./pet-picker";
import { AvatarComboStage } from "./avatar-combo-stage";

function hapticSelection() {
  window.Telegram?.WebApp.HapticFeedback?.selectionChanged();
}

/** 상점 칸 — 아바타에 장착되는 꾸미기 */
const SHOP_SLOTS: ShopSlot[] = ["aura", "scene", "pet", "costume", "hat", "hand"];
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
  return AURA_LOOK[item].rarity;
}
function keysOf(item: ShopItemId) {
  const slot = slotOf(item);
  return `avatarEditor.${slot === "costume" || slot === "hand" || slot === "hat" ? "wear" : slot}`;
}

function goBack(router: ReturnType<typeof useRouter>) {
  if (window.history.length > 1) router.back();
  else router.replace("/profile");
}

export function AvatarEditorScreen() {
  const router = useRouter();
  const { request, updateUser, user } = useTelegramAuth();
  const { speak: speakAvatarWord } = useKoreanSpeech(request);
  const userAvatar = useMemo(() => mergeAvatarConfig(user?.avatar), [user?.avatar]);
  const [draft, setDraft] = useState<AvatarConfig>(userAvatar);
  const [initial, setInitial] = useState<AvatarConfig>(userAvatar);
  const [selectedCategory, setSelectedCategory] = useState<AvatarField>("skinTone");
  const [isSaving, setIsSaving] = useState(false);
  const [discardOpen, setDiscardOpen] = useState(false);
  const [saveErrorOpen, setSaveErrorOpen] = useState(false);
  // 상점 꾸미기 (오라 · 배경 장면, 보석으로 산다) — 목록 · 가진 것 · 보석
  const [cosmetics, setCosmetics] = useState<CosmeticsState | null>(null);
  const [cosStatus, setCosStatus] = useState<"loading" | "ready" | "failed">("loading");
  const [buyOpen, setBuyOpen] = useState(false);
  const [buying, setBuying] = useState(false);
  const [buyError, setBuyError] = useState(false);
  const [bought, setBought] = useState<ShopItemId | null>(null);
  const [headerCollapsed, setHeaderCollapsed] = useState(false);
  const optionsScrollRef = useRef<HTMLElement>(null);
  const scrollAnchor = useRef(0);
  const bottomRevealOffset = useRef<number | null>(null);

  const handleOptionsScroll = useCallback((event: UIEvent<HTMLElement>) => {
    const list = event.currentTarget;
    const y = Math.max(0, list.scrollTop);
    const maxOffset = Math.max(0, list.scrollHeight - list.clientHeight);
    const atBottom = maxOffset > 2 ? y >= maxOffset - 2 : headerCollapsed;

    if (atBottom) {
      setHeaderCollapsed(false);
      // The viewport shrinks when the header returns; don't immediately hide it again.
      bottomRevealOffset.current = Math.max(bottomRevealOffset.current ?? y, y);
      scrollAnchor.current = y;
      return;
    }
    if (bottomRevealOffset.current !== null) {
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

  const hasChanges = JSON.stringify(draft) !== JSON.stringify(initial);
  const dirty = useRef(hasChanges);
  dirty.current = hasChanges;

  // 계정 아바타가 바뀌면 다시 맞춘다 — 단 고치던 게 있으면 덮지 않는다 (오라를 산 직후 등)
  useEffect(() => {
    if (dirty.current) return;
    setDraft(userAvatar);
    setInitial(userAvatar);
  }, [userAvatar]);

  const loadCosmetics = useCallback(async () => {
    setCosStatus("loading");
    try {
      setCosmetics(await getCosmetics(request));
      setCosStatus("ready");
    } catch {
      setCosStatus("failed");
    }
  }, [request]);

  useEffect(() => {
    void loadCosmetics();
  }, [loadCosmetics]);

  const draftScene = isScene(draft.scene) ? draft.scene : null;
  const cosReady = cosStatus === "ready";
  const streak = user?.streak ?? 0;
  // 입어보는 중 — 상점 칸마다 아직 안 산 걸 입고 있나
  const pendingBySlot = Object.fromEntries(
    SHOP_SLOTS.map((slot) => {
      const id = draft[slot];
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
  const gems = cosmetics?.gems ?? user?.gems ?? 0;
  // "빼고 저장" — 안 산 것만 저장된 것으로 되돌린 모양
  const withoutPending = SHOP_SLOTS.reduce<AvatarConfig>(
    (config, slot) => (pendingBySlot[slot] ? ({ ...config, [slot]: initial[slot] } as AvatarConfig) : config),
    draft,
  );
  const otherChanges = JSON.stringify(withoutPending) !== JSON.stringify(initial);
  // 상점 탭 — 위 배지가 "전부 무료" 또는 보석 잔액
  const shopTab = tabSlots.length > 0 ? (selectedCategory === "costume" ? "wear" : tabSlots[0]!) : null;
  const shopTabFree = tabSlots.length > 0 && tabSlots.every((slot) => slotAllFree(cosmetics, slot));

  const category =
    AVATAR_CATEGORIES.find((item) => item.id === selectedCategory) ??
    AVATAR_CATEGORIES[0]!;
  // 장면을 골랐으면 그림이 깔리고, 색은 그림이 뜨기 전 잠깐만 보인다
  const sceneColors = sceneHeroColors(draft.scene);
  const heroBackground = sceneColors
    ? [sceneColors.from, sceneColors.to]
    : (AVATAR_BACKGROUNDS[draft.background] ?? AVATAR_BACKGROUNDS.background_cloud);

  const close = () => {
    if (isSaving) return;
    if (hasChanges) setDiscardOpen(true);
    else goBack(router);
  };

  const selectCategory = (id: AvatarField) => {
    hapticSelection();
    setSelectedCategory(id);
    if (optionsScrollRef.current) optionsScrollRef.current.scrollTop = 0;
    scrollAnchor.current = 0;
    bottomRevealOffset.current = null;
    setHeaderCollapsed(false);
  };

  const selectOption = (option: AvatarOption) => {
    hapticSelection();
    setDraft((current) => ({
      ...current,
      [category.id]: option.id,
    }) as AvatarConfig);
  };

  const candidateFor = (option: AvatarOption) => ({
    ...draft,
    [category.id]: option.id,
  }) as AvatarConfig;

  const reset = () => {
    hapticSelection();
    setDraft(initial);
  };

  const randomize = () => {
    window.Telegram?.WebApp.HapticFeedback?.impactOccurred("medium");
    // 오라·장면·펫은 상점 아이템이라 그대로 둔다
    setDraft((current) =>
      randomAvatar({
        aura: current.aura,
        scene: current.scene,
        pet: current.pet,
        costume: current.costume,
        hand: current.hand,
        hat: current.hat,
      }),
    );
  };

  const pickAura = (id: AuraId) => {
    hapticSelection();
    setDraft((current) => ({ ...current, aura: id }));
  };

  const pickScene = (id: SceneId) => {
    hapticSelection();
    setDraft((current) => ({ ...current, scene: id }));
  };

  const pickPet = (id: PetId) => {
    hapticSelection();
    setDraft((current) => ({ ...current, pet: id }));
  };

  // 세트 — 누르면 입고, 입은 걸 다시 누르면 벗는다
  const toggleWear = (slot: WearSlot, id: WearItemId) => {
    hapticSelection();
    setDraft((current) =>
      ({ ...current, [slot]: current[slot] === id ? `${slot}_none` : id }) as AvatarConfig,
    );
  };

  const buy = async () => {
    if (!pending || buying) return;
    const item = pending;
    setBuying(true);
    setBuyError(false);
    try {
      const result = await purchaseCosmetic(request, item, true);
      setCosmetics((current) =>
        current
          ? { ...current, gems: result.gems, owned: result.owned, equipped: { ...current.equipped, [slotOf(item)]: item } }
          : current,
      );
      // 저장된 쪽도 이 아이템으로 — 고치던 다른 부분은 그대로 둔다
      setInitial((current) => wear(current, item));
      updateUser({ avatar: wear(mergeAvatarConfig(user?.avatar), item), gems: result.gems });
      window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("success");
      playSfx("combo");
      setBuyOpen(false);
      setBought(item);
    } catch {
      window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("error");
      setBuyError(true);
      void loadCosmetics();
    } finally {
      setBuying(false);
    }
  };

  const save = async (skipPending = false) => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      const result = await updateAvatar(request, skipPending ? withoutPending : draft);
      updateUser({ avatar: result.avatar });
      window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("success");
      goBack(router);
    } catch {
      window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("error");
      setSaveErrorOpen(true);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className={styles.screen}>
      <header className={`${styles.header} ${headerCollapsed ? styles.headerCollapsed : ""}`}>
        <button aria-label="Yopish" onClick={close} type="button">
          <MobileIcon name="close" size={27} />
        </button>
        <h1>Mening qahramonim</h1>
        <button
          aria-label="O‘zgarishlarni qaytarish"
          disabled={!hasChanges}
          onClick={reset}
          type="button"
        >
          <MobileIcon name="arrow-undo" size={22} />
        </button>
      </header>

      <section
        className={styles.hero}
        style={{
          "--hero-from": heroBackground[0],
          "--hero-to": heroBackground[1],
        } as React.CSSProperties}
      >
        {draftScene ? (
          <SceneBackdrop scene={draftScene} living />
        ) : (
          <>
            <i className={styles.heroOrbLarge} />
            <i className={styles.heroOrbSmall} />
          </>
        )}
        {shopTab && shopTabFree ? (
          <span className={styles.freeBadge}>
            <MobileIcon name="sparkles" size={14} />
            <span data-i18n={`avatarEditor.${shopTab}.freeAll`}>{uzt(`avatarEditor.${shopTab}.freeAll`)}</span>
          </span>
        ) : shopTab ? (
          <span className={`${styles.freeBadge} ${styles.gemBadge}`} data-no-translate>
            <MobileIcon name="diamond" size={14} />
            {gems.toLocaleString("en-US")}
          </span>
        ) : (
          <span className={styles.freeBadge}>
            <MobileIcon name="sparkles" size={14} />
            <span data-i18n="avatarEditor.basicFree">{uzt("avatarEditor.basicFree")}</span>
          </span>
        )}
        {pending ? (
          <span
            className={styles.tryOnBadge}
            style={{ "--rarity": RARITY_COLOR[rarityOf(pending)] } as React.CSSProperties}
          >
            <span data-i18n={`${keysOf(pending)}.tryOn`}>{uzt(`${keysOf(pending)}.tryOn`)}</span>
          </span>
        ) : null}
        <div className={styles.heroAvatar}>
          <AvatarComboStage
            avatar={draft}
            onWordPress={(word) => speakAvatarWord(word)}
            streak={streak}
            userId={user?.id}
          />
        </div>
        <button className={styles.randomButton} onClick={randomize} type="button">
          <span>
            <MobileIcon name="dice-outline" size={20} />
            Tasodifiy
          </span>
        </button>
      </section>

      <section className={styles.tabHeader}>
        <h2>O‘zingga xos KORIO qahramonini yarat</h2>
        <nav aria-label="Avatar bo‘limlari" className={styles.categories}>
          {AVATAR_CATEGORIES.map((item) => {
            const selected = item.id === selectedCategory;
            return (
              <button
                aria-current={selected ? "true" : undefined}
                className={selected ? styles.selectedCategory : undefined}
                data-i18n={`avatarEditor.categories.${item.id}`}
                key={item.id}
                onClick={() => selectCategory(item.id)}
                type="button"
              >
                <MobileIcon name={item.icon} size={20} />
                {item.label}
                {item.id === "costume" && !selected ? (
                  <em className={styles.newBadge} data-i18n="avatarEditor.aura.newBadge">
                    {uzt("avatarEditor.aura.newBadge")}
                  </em>
                ) : null}
              </button>
            );
          })}
        </nav>
      </section>

      <section className={styles.optionsScroll} onScroll={handleOptionsScroll} ref={optionsScrollRef}>
        {category.id === "aura" ? (
          <AuraGrid
            draft={draft}
            equipped={initial.aura ?? "aura_none"}
            onPick={pickAura}
            onRetry={() => void loadCosmetics()}
            state={cosmetics}
            status={cosStatus}
          />
        ) : category.id === "costume" ? (
          <WearGrid
            draft={draft}
            equipped={{ costume: initial.costume, hat: initial.hat, hand: initial.hand }}
            onRetry={() => void loadCosmetics()}
            onToggle={toggleWear}
            state={cosmetics}
            status={cosStatus}
          />
        ) : category.id === "pet" ? (
          <PetGrid
            draft={draft}
            equipped={initial.pet ?? "pet_none"}
            onPick={pickPet}
            onRetry={() => void loadCosmetics()}
            state={cosmetics}
            status={cosStatus}
            streak={streak}
          />
        ) : category.id === "scene" ? (
          <SceneGrid
            draft={draft}
            equipped={initial.scene ?? "scene_none"}
            onOpenAlbum={() => router.push("/avatar-postcards")}
            onPick={pickScene}
            onRetry={() => void loadCosmetics()}
            state={cosmetics}
            status={cosStatus}
          />
        ) : (
        <div className={styles.optionsGrid} key={category.id}>
          {category.options.map((option) => {
            const selected = draft[category.id] === option.id;
            return (
              <button
                aria-label={option.id}
                aria-pressed={selected}
                className={selected ? styles.selectedOption : undefined}
                key={option.id}
                onClick={() => selectOption(option)}
                type="button"
              >
                <span className={styles.optionFace}>
                  <span className={styles.optionAvatar}>
                    <GeneratedAvatar
                      avatar={candidateFor(option)}
                      showBackground={category.id === "background"}
                      variant={category.preview}
                    />
                  </span>
                  {option.swatch ? (
                    <i
                      className={styles.swatch}
                      style={{ backgroundColor: option.swatch }}
                    />
                  ) : null}
                  {selected ? (
                    <i className={styles.check}>
                      <MobileIcon name="checkmark" size={15} />
                    </i>
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>
        )}
      </section>

      <footer className={styles.bottomBar}>
        {tryingOn ? (
          <>
            <button
              className={styles.buyButton}
              onClick={() => {
                playSfx("click");
                setBuyError(false);
                setBuyOpen(true);
              }}
              type="button"
            >
              <span className={styles.buyPrice} data-no-translate>
                <MobileIcon name="diamond" size={16} />
                {tryPrice.toLocaleString("en-US")}
              </span>
              <span data-i18n="avatarEditor.aura.buy">{uzt("avatarEditor.aura.buy")}</span>
            </button>
            {otherChanges ? (
              <button className={styles.saveWithout} disabled={isSaving} onClick={() => void save(true)} type="button">
                <span data-i18n={`${pending ? keysOf(pending) : "avatarEditor.aura"}.saveWithout`}>
                  {uzt(`${pending ? keysOf(pending) : "avatarEditor.aura"}.saveWithout`)}
                </span>
              </button>
            ) : null}
          </>
        ) : (
          <button disabled={isSaving} onClick={() => { playSfx("click"); void save(); }} type="button">
            {isSaving ? "Saqlanmoqda..." : "Qahramonni saqlash"}
          </button>
        )}
      </footer>

      {buyOpen && pending ? (
        <CosmeticBuySheet
          avatar={draft}
          buying={buying}
          error={buyError}
          gems={gems}
          id={pending}
          onBuy={() => void buy()}
          onClose={() => setBuyOpen(false)}
          price={tryPrice}
          streak={streak}
        />
      ) : null}
      {bought ? <CosmeticBought avatar={draft} id={bought} onClose={() => setBought(null)} streak={streak} /> : null}

      {/* 앱 안 확인창 — 페이드로만 열린다 */}
      <ConfirmDialog
        cancelKey="avatarEditor.keepEditing"
        confirmKey="avatarEditor.discard"
        icon="trash-outline"
        messageKey="avatarEditor.unsavedMessage"
        onCancel={() => setDiscardOpen(false)}
        onConfirm={() => goBack(router)}
        open={discardOpen}
        titleKey="avatarEditor.unsavedTitle"
      />
      <ConfirmDialog
        confirmKey="common.close"
        icon="cloud-offline-outline"
        messageKey="avatarEditor.saveFailedMessage"
        onCancel={() => setSaveErrorOpen(false)}
        onConfirm={() => setSaveErrorOpen(false)}
        open={saveErrorOpen}
        titleKey="avatarEditor.saveFailedTitle"
        tone="warning"
      />
    </main>
  );
}
