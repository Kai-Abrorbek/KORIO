"use client";

import { useEffect, useMemo, useState } from "react";
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
import { AVATAR_CATEGORIES, type AvatarOption } from "../model/avatar-catalog";
import styles from "./avatar-editor-screen.module.css";

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

  useEffect(() => {
    setDraft(userAvatar);
    setInitial(userAvatar);
    setSelectedCategory("skinTone");
  }, [userAvatar]);

  const category =
    AVATAR_CATEGORIES.find((item) => item.id === selectedCategory) ??
    AVATAR_CATEGORIES[0]!;
  const hasChanges = JSON.stringify(draft) !== JSON.stringify(initial);
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
    setDraft(randomAvatar());
  };

  const save = async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      const result = await updateAvatar(request, draft);
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
        <span className={styles.freeBadge}>
          <MobileIcon name="sparkles" size={14} />
          Hozircha barcha buyumlar bepul
        </span>
        <div className={styles.heroAvatar}>
          <GeneratedAvatar avatar={draft} variant="full" />
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
                key={item.id}
                onClick={() => selectCategory(item.id)}
                type="button"
              >
                <MobileIcon name={item.icon} size={20} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </section>

      <section className={styles.optionsScroll}>
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
      </section>

      <footer className={styles.bottomBar}>
        <button disabled={isSaving} onClick={() => void save()} type="button">
          {isSaving ? "Saqlanmoqda..." : "Qahramonni saqlash"}
        </button>
      </footer>

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
