"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  mergeAvatarConfig,
  randomAvatar,
  type AvatarConfig,
  type AvatarField,
} from "../../../shared/model/avatar";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
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
import { AvatarAura, AURA_LOOK, RARITY_COLOR, isAura, type AuraId } from "../../../shared/ui/avatar-aura";
import { AuraBought, AuraBuySheet, AuraGrid, auraPrice, ownsAura } from "./aura-picker";

function hapticSelection() {
  window.Telegram?.WebApp.HapticFeedback?.selectionChanged();
}

function goBack(router: ReturnType<typeof useRouter>) {
  if (window.history.length > 1) router.back();
  else router.replace("/profile");
}

export function AvatarEditorScreen() {
  const router = useRouter();
  const { request, updateUser, user } = useTelegramAuth();
  const userAvatar = useMemo(() => mergeAvatarConfig(user?.avatar), [user?.avatar]);
  const [draft, setDraft] = useState<AvatarConfig>(userAvatar);
  const [initial, setInitial] = useState<AvatarConfig>(userAvatar);
  const [selectedCategory, setSelectedCategory] = useState<AvatarField>("skinTone");
  const [isSaving, setIsSaving] = useState(false);
  const [discardOpen, setDiscardOpen] = useState(false);
  const [saveErrorOpen, setSaveErrorOpen] = useState(false);
  // 오라 (보석으로 산다) — 목록 · 가진 것 · 보석
  const [cosmetics, setCosmetics] = useState<CosmeticsState | null>(null);
  const [cosStatus, setCosStatus] = useState<"loading" | "ready" | "failed">("loading");
  const [buyOpen, setBuyOpen] = useState(false);
  const [buying, setBuying] = useState(false);
  const [buyError, setBuyError] = useState(false);
  const [bought, setBought] = useState<Exclude<AuraId, "aura_none"> | null>(null);

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

  const draftAura = isAura(draft.aura) ? draft.aura : null;
  // 입어보는 중 (아직 안 산 오라)
  const tryingOn = draftAura !== null && cosStatus === "ready" && !ownsAura(cosmetics, draftAura);
  const tryPrice = draftAura ? (auraPrice(cosmetics, draftAura) ?? 0) : 0;
  const gems = cosmetics?.gems ?? user?.gems ?? 0;
  const otherChanges =
    JSON.stringify({ ...draft, aura: initial.aura }) !== JSON.stringify(initial);

  const category =
    AVATAR_CATEGORIES.find((item) => item.id === selectedCategory) ??
    AVATAR_CATEGORIES[0]!;
  const heroBackground =
    AVATAR_BACKGROUNDS[draft.background] ??
    AVATAR_BACKGROUNDS.background_cloud;

  const close = () => {
    if (isSaving) return;
    if (hasChanges) setDiscardOpen(true);
    else goBack(router);
  };

  const selectCategory = (id: AvatarField) => {
    hapticSelection();
    setSelectedCategory(id);
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
    // 오라는 산 것이라 그대로 둔다
    setDraft((current) => randomAvatar({ aura: current.aura }));
  };

  const pickAura = (id: AuraId) => {
    hapticSelection();
    setDraft((current) => ({ ...current, aura: id }));
  };

  const buy = async () => {
    if (!draftAura || buying) return;
    setBuying(true);
    setBuyError(false);
    try {
      const result = await purchaseCosmetic(request, draftAura, true);
      setCosmetics((current) => (current ? { ...current, gems: result.gems, owned: result.owned, equipped: { aura: draftAura } } : current));
      // 저장된 쪽도 이 오라로 — 고치던 다른 부분은 그대로 둔다
      setInitial((current) => ({ ...current, aura: draftAura }));
      updateUser({ avatar: mergeAvatarConfig({ ...user?.avatar, aura: draftAura }), gems: result.gems });
      window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("success");
      playSfx("combo");
      setBuyOpen(false);
      setBought(draftAura);
    } catch {
      window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("error");
      setBuyError(true);
      void loadCosmetics();
    } finally {
      setBuying(false);
    }
  };

  const save = async (withoutAura = false) => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      const result = await updateAvatar(request, withoutAura ? { ...draft, aura: initial.aura } : draft);
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
      <header className={styles.header}>
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
        <i className={styles.heroOrbLarge} />
        <i className={styles.heroOrbSmall} />
        {selectedCategory === "aura" ? (
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
        {tryingOn && draftAura ? (
          <span
            className={styles.tryOnBadge}
            style={{ "--rarity": RARITY_COLOR[AURA_LOOK[draftAura].rarity] } as React.CSSProperties}
          >
            <span data-i18n="avatarEditor.aura.tryOn">{uzt("avatarEditor.aura.tryOn")}</span>
          </span>
        ) : null}
        <div className={styles.heroAvatar}>
          <AvatarAura aura={draft.aura}>
            <GeneratedAvatar avatar={draft} variant="full" />
          </AvatarAura>
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
                {item.id === "aura" && !selected ? (
                  <em className={styles.newBadge} data-i18n="avatarEditor.aura.newBadge">
                    {uzt("avatarEditor.aura.newBadge")}
                  </em>
                ) : null}
              </button>
            );
          })}
        </nav>
      </section>

      <section className={styles.optionsScroll}>
        {category.id === "aura" ? (
          <AuraGrid
            draft={draft}
            equipped={initial.aura ?? "aura_none"}
            onPick={pickAura}
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
                <span data-i18n="avatarEditor.aura.saveWithout">{uzt("avatarEditor.aura.saveWithout")}</span>
              </button>
            ) : null}
          </>
        ) : (
          <button disabled={isSaving} onClick={() => { playSfx("click"); void save(); }} type="button">
            {isSaving ? "Saqlanmoqda..." : "Qahramonni saqlash"}
          </button>
        )}
      </footer>

      {buyOpen && draftAura ? (
        <AuraBuySheet
          avatar={draft}
          buying={buying}
          error={buyError}
          gems={gems}
          id={draftAura}
          onBuy={() => void buy()}
          onClose={() => setBuyOpen(false)}
          price={tryPrice}
        />
      ) : null}
      {bought ? <AuraBought avatar={draft} id={bought} onClose={() => setBought(null)} /> : null}

      {discardOpen ? (
        <div aria-modal="true" className={styles.dialog} role="dialog">
          <button
            aria-label="Bekor qilish"
            className={styles.dialogBackdrop}
            onClick={() => setDiscardOpen(false)}
            type="button"
          />
          <section>
            <h2>O‘zgarishlar bekor qilinsinmi?</h2>
            <p>Saqlanmagan avatar o‘zgarishlari yo‘qoladi.</p>
            <div>
              <button onClick={() => setDiscardOpen(false)} type="button">
                Bekor qilish
              </button>
              <button
                className={styles.destructive}
                onClick={() => goBack(router)}
                type="button"
              >
                Tashlab ketish
              </button>
            </div>
          </section>
        </div>
      ) : null}

      {saveErrorOpen ? (
        <div aria-modal="true" className={styles.dialog} role="alertdialog">
          <button
            aria-label="Yopish"
            className={styles.dialogBackdrop}
            onClick={() => setSaveErrorOpen(false)}
            type="button"
          />
          <section>
            <h2>Saqlab bo‘lmadi</h2>
            <p>Qaytadan urinib ko‘ring.</p>
            <div>
              <button onClick={() => setSaveErrorOpen(false)} type="button">
                OK
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </main>
  );
}
