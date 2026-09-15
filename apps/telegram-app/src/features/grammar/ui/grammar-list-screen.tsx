"use client";

import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { HomeIcon } from "../../home/ui/home-icon";
import { LearningIcon } from "../../learning/ui/learning-icon";
import { getGrammarList } from "../api/grammar";
import type { GrammarListItem, GrammarListResponse } from "../model/grammar";
import styles from "./grammar.module.css";

const SECTION_COLORS = ["#a7d8f0", "#bfe8c6", "#fbd24e", "#f7c0d4"];

function GrammarCard({ item, onOpen }: { item: GrammarListItem; onOpen: () => void }) {
  return (
    <button className={styles.grammarListCard} onClick={onOpen} type="button">
      <span className={styles.grammarCardBody}>
        <span className={styles.patternPill}>{item.pattern}</span>
        <strong>{item.summary}</strong>
        {item.tags.length > 0 ? (
          <span className={styles.tagRow}>
            {item.tags.slice(0, 3).map((tag) => <em key={tag}>{tag}</em>)}
          </span>
        ) : null}
      </span>
      <span className={item.completed ? styles.completedMark : styles.cardChevron}>
        <HomeIcon name={item.completed ? "check" : "chevron"} size={21} />
      </span>
    </button>
  );
}

interface SectionBlockProps {
  badge?: string;
  color: string;
  expanded: boolean;
  items: GrammarListItem[];
  locked?: boolean;
  onOpenItem: (item: GrammarListItem) => void;
  onPremium: () => void;
  onToggle: () => void;
  premiumLocked?: boolean;
  section: number;
  title?: string;
}

function SectionBlock({
  badge,
  color,
  expanded,
  items,
  locked = false,
  onOpenItem,
  onPremium,
  onToggle,
  premiumLocked = false,
  section,
  title,
}: SectionBlockProps) {
  const allDone = items.length > 0 && items.every((item) => item.completed);
  const open = expanded && !locked && !premiumLocked;
  return (
    <section className={styles.sectionBlock} style={{ "--section-color": color } as CSSProperties}>
      <button
        className={`${styles.sectionHeader} ${locked ? styles.sectionLocked : ""} ${premiumLocked ? styles.sectionPremium : ""}`}
        onClick={() => premiumLocked ? onPremium() : !locked ? onToggle() : undefined}
        type="button"
      >
        <span className={styles.sectionNumber}>
          {premiumLocked ? "★" : badge ?? section}
        </span>
        <span className={styles.sectionCopy}>
          <strong>{title ?? `${section}-bo'lim`}</strong>
          <small>
            {premiumLocked
              ? "KORIO Premium bilan ochiladi"
              : locked
                ? items.length ? "Hozircha yopiq" : "Tez orada"
                : allDone
                  ? "Tugallandi!"
                  : `${items.length} ta qoida`}
          </small>
        </span>
        <span className={styles.sectionChevron}>
          {premiumLocked || locked ? <LearningIcon name="lock" size={19} /> : <HomeIcon name="chevron" size={21} />}
        </span>
      </button>
      {open ? (
        <div className={styles.grammarCards}>
          {items.length > 0 ? items.map((item) => (
            <GrammarCard item={item} key={item.id} onOpen={() => onOpenItem(item)} />
          )) : <p className={styles.emptySection}>Bu bo&apos;limga grammatika hali qo&apos;shilmagan.</p>}
        </div>
      ) : null}
    </section>
  );
}

export function GrammarListScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const { request } = useTelegramAuth();
  const section = Number(params.get("section")) || 0;
  const unit = Number(params.get("unit")) || 0;
  const from = params.get("from") ?? "";
  const scoped = section > 0 && unit > 0;
  const [data, setData] = useState<GrammarListResponse | null>(null);
  const [expanded, setExpanded] = useState<number | null>(scoped ? section : null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [premiumOpen, setPremiumOpen] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setFailed(false);
    try {
      const result = await getGrammarList(request, scoped ? { section, unit } : undefined);
      setData(result);
      setExpanded(scoped ? section : result.unlockedThrough || 1);
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }, [request, scoped, section, unit]);

  useEffect(() => {
    void load();
  }, [load]);

  const grouped = useMemo(() => {
    const result = new Map<number, GrammarListItem[]>();
    data?.grammars.forEach((item) => result.set(item.section, [...(result.get(item.section) ?? []), item]));
    return result;
  }, [data]);

  const sectionNumbers = useMemo(() => {
    if (scoped) return [section];
    const highestDataSection = Math.max(0, ...Array.from(grouped.keys()));
    return Array.from({ length: Math.max(12, highestDataSection) }, (_, index) => index + 1);
  }, [grouped, scoped, section]);

  const goBack = () => {
    if (window.history.length > 1) router.back();
    else router.replace(from === "studyPath" ? "/study-path" : "/course-categories");
  };

  const openGrammar = (item: GrammarListItem) => {
    const query = new URLSearchParams({ id: item.id });
    if (scoped) {
      query.set("scoped", "1");
      query.set("section", String(section));
      query.set("unit", String(unit));
    }
    if (from) query.set("from", from);
    router.push(`/grammar-study?${query.toString()}`);
  };

  return (
    <main className={styles.grammarPage}>
      <header className={styles.topbar}>
        <button aria-label="Orqaga" onClick={goBack} type="button"><span className={styles.backGlyph}>‹</span></button>
        <strong className={styles.crumb}>Grammatika</strong>
      </header>
      <div className={styles.grammarScroll}>
        <p className={styles.listIntro}>{scoped ? "Bugun o'rganadigan grammatika." : "Grammatikani bo'lim-bo'lim o'rganing."}</p>

        {loading ? (
          <div className={styles.centerState}><span className={styles.spinner} /></div>
        ) : failed ? (
          <div className={styles.centerState}><strong>Grammatikani yuklab bo&apos;lmadi.</strong><button onClick={() => void load()} type="button">Qayta urinish</button></div>
        ) : data ? (
          <div className={styles.sectionList}>
            {scoped ? (
              <SectionBlock
                badge={String(unit)}
                color={SECTION_COLORS[(unit - 1) % SECTION_COLORS.length] ?? "#a7d8f0"}
                expanded
                items={data.grammars}
                onOpenItem={openGrammar}
                onPremium={() => undefined}
                onToggle={() => undefined}
                section={section}
                title={`${unit}-kun grammatikasi`}
              />
            ) : sectionNumbers.map((number) => (
              <SectionBlock
                color={SECTION_COLORS[(number - 1) % SECTION_COLORS.length] ?? "#a7d8f0"}
                expanded={expanded === number}
                items={grouped.get(number) ?? []}
                key={number}
                locked={number > data.unlockedThrough}
                onOpenItem={openGrammar}
                onPremium={() => setPremiumOpen(true)}
                onToggle={() => setExpanded((current) => current === number ? null : number)}
                premiumLocked={number <= data.unlockedThrough && number > data.freeSections && !data.isSuper}
                section={number}
              />
            ))}
          </div>
        ) : null}
      </div>

      {premiumOpen ? (
        <div className={styles.sheetBackdrop} onClick={() => setPremiumOpen(false)} role="presentation">
          <section aria-label="KORIO Premium" aria-modal="true" className={styles.premiumSheet} onClick={(event) => event.stopPropagation()} role="dialog">
            <div className={styles.sheetGrip} />
            <span className={styles.premiumStar}>★</span>
            <h2>SUPER bilan davom eting</h2>
            <p>Bepul bo&apos;limlarni tugatdingiz! KORIO SUPER bilan barcha grammatikani oching.</p>
            <button onClick={() => router.push("/premium")} type="button">SUPER&apos;ni boshlash</button>
            <button className={styles.laterButton} onClick={() => setPremiumOpen(false)} type="button">Keyinroq</button>
          </section>
        </div>
      ) : null}
    </main>
  );
}
