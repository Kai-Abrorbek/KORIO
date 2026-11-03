"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import {
  filterWordCollections,
  getDefaultWordCollectionGroup,
  getMyWordCollections,
  getWordCollectionCoverMark,
  getWordCollectionSections,
  WORD_COLLECTION_KINDS,
  WORD_COLLECTION_LEVELS,
  type WordCollectionDetail,
  type WordCollectionGroup,
  type WordCollectionKind,
  type WordCollectionLevel,
  type WordCollectionSummary,
} from "../../../../../../shared/word-library";
import { getWordLibraryCssVariables } from "../../../../../../shared/word-library-theme";
import { useAppTheme } from "../../../shared/theme/theme-context";
import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { saveLearnMode } from "../../learning/api/learning-preferences";
import {
  DEFAULT_LEARNING_COURSES,
  learnCourseOf,
  type LearnCourse,
} from "../../learning/model/learning-options";
import {
  useAppLanguage,
  useContentLanguage,
} from "../../../shared/i18n/language-context";
import { uzt } from "../../../shared/i18n/uz-text";
import { safeBack } from "../../../shared/telegram/back-button";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import {
  getWordCollection,
  getWordCollections,
  getWordCollectionWords,
  setWordCollectionSaved,
} from "../api/word-collections";
import { readWordAutoPlay, saveWordAutoPlay } from "../model/word-preferences";
import type { StudyWord } from "../model/word";
import styles from "./word-library.module.css";

const KIND_KEYS: Record<WordCollectionKind, string> = {
  course: "kindCourse",
  textbook: "kindTextbook",
  exam: "kindExam",
  level: "kindLevel",
  topic: "kindTopic",
};
const LEVEL_KEYS: Record<WordCollectionLevel, string> = {
  beginner: "levelBeginner",
  intermediate: "levelIntermediate",
  advanced: "levelAdvanced",
  mixed: "levelMixed",
};

function copy(key: string, values?: Record<string, string | number>) {
  return uzt(`wordLibrary.${key}`, values);
}

function BookCover({
  book,
  small = false,
}: {
  book: WordCollectionSummary;
  small?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={[
        styles.cover,
        book.cover === "violet" ? styles.coverAlternate : "",
        book.cover === "ink" ? styles.coverInk : "",
        book.cover === "mist" ? styles.coverMist : "",
        small ? styles.smallCover : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className={styles.publisher} data-no-translate>
        KORIO
      </span>
      {book.saved && <span className={styles.coverBookmark} />}
      <span>
        <span className={styles.coverMark} data-no-translate>
          {getWordCollectionCoverMark(book)}
        </span>
        <span className={styles.coverLabel} data-no-translate>
          {book.title}
        </span>
      </span>
      <span
        className={styles.coverFooter}
        data-i18n={`wordLibrary.${KIND_KEYS[book.kind]}`}
      >
        {copy(KIND_KEYS[book.kind])}
      </span>
    </span>
  );
}

function BookProgress({
  book,
}: {
  book: Pick<WordCollectionSummary, "mastered" | "words">;
}) {
  return (
    <span
      aria-label={copy("masteredCount", {
        mastered: book.mastered,
        total: book.words,
      })}
      aria-valuemax={book.words || 1}
      aria-valuemin={0}
      aria-valuenow={Math.min(book.mastered, book.words)}
      className={styles.progress}
      role="progressbar"
    >
      <span
        style={{
          width: `${book.words ? Math.min(1, book.mastered / book.words) * 100 : 0}%`,
        }}
      />
    </span>
  );
}

function BookRow({
  book,
  onOpen,
}: {
  book: WordCollectionSummary;
  onOpen: () => void;
}) {
  return (
    <button className={styles.bookRow} onClick={onOpen} type="button">
      <BookCover book={book} small />
      <span className={styles.bookCopy}>
        <strong data-no-translate>{book.title}</strong>
        <span className={styles.bookMeta}>
          <span data-i18n={`wordLibrary.${KIND_KEYS[book.kind]}`}>
            {copy(KIND_KEYS[book.kind])}
          </span>
          {" · "}
          <span data-i18n="wordLibrary.masteredCount">
            {copy("masteredCount", {
              mastered: book.mastered,
              total: book.words,
            })}
          </span>
        </span>
        <BookProgress book={book} />
      </span>
      <MobileIcon name="chevron-forward" size={18} />
    </button>
  );
}

function groupTitle(group: WordCollectionGroup) {
  return (
    group.title ||
    (group.section && group.unit
      ? copy("sectionUnit", { section: group.section, unit: group.unit })
      : copy("groupTitle", { n: group.order + 1 }))
  );
}

export function WordLibraryScreen() {
  const { resolvedTheme } = useAppTheme();
  const router = useRouter();
  const params = useSearchParams();
  const { request, updateUser, user } = useTelegramAuth();
  const { language } = useAppLanguage();
  const contentLanguage = useContentLanguage();
  const course = learnCourseOf(user?.learnCourse);
  const scope = `${user?.id ?? ""}:${course}:${language}`;
  const collectionId =
    params.get("collectionId") ||
    (params.get("section")
      ? `course-${DEFAULT_LEARNING_COURSES[course].courseId}`
      : "");
  const preferredGroupId =
    params.get("groupId") ||
    (params.get("section") && params.get("unit")
      ? `s${params.get("section")}-u${params.get("unit")}`
      : undefined);
  const tab = params.get("tab") === "find" ? "find" : "mine";
  const pageRef = useRef<HTMLElement>(null);
  const [catalog, setCatalog] = useState<{
    scope: string;
    items: WordCollectionSummary[];
  } | null>(null);
  const [catalogFailed, setCatalogFailed] = useState(false);
  const [detail, setDetail] = useState<{
    scope: string;
    value: WordCollectionDetail;
  } | null>(null);
  const [detailFailed, setDetailFailed] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [sectionPickerOpen, setSectionPickerOpen] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<WordCollectionKind | "all">("all");
  const [level, setLevel] = useState<WordCollectionLevel | "all">("all");
  const [refresh, setRefresh] = useState(0);
  const [saving, setSaving] = useState(false);
  const [launching, setLaunching] = useState(false);
  const launchRef = useRef(false);
  const [switchingCourse, setSwitchingCourse] = useState(false);
  const [languageFailed, setLanguageFailed] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);
  const [preview, setPreview] = useState<{
    key: string;
    words: StudyWord[];
  } | null>(null);
  const [previewFailed, setPreviewFailed] = useState(false);
  const currentScope = useRef(scope);
  currentScope.current = scope;

  const items = useMemo(
    () => (catalog?.scope === scope ? catalog.items : []),
    [catalog, scope],
  );
  const book =
    detail?.scope === scope && detail.value.id === collectionId
      ? detail.value
      : null;
  const selectedGroup =
    book?.groups.find((group) => group.id === selectedGroupId) ?? null;
  const sections = useMemo(
    () => (book ? getWordCollectionSections(book) : []),
    [book],
  );
  const selectedSection =
    sections.find((section) =>
      section.groups.some((group) => group.id === selectedGroup?.id),
    ) ?? sections[0];
  const visibleGroups = selectedSection?.groups ?? book?.groups ?? [];
  const previewKey = `${scope}:${book?.id ?? ""}:${selectedGroup?.id ?? ""}:${contentLanguage}`;
  const previewWords = preview?.key === previewKey ? preview.words : [];

  useEffect(() => {
    let active = true;
    setCatalogFailed(false);
    void getWordCollections(request, course, language)
      .then((result) => {
        if (active) setCatalog({ scope, items: result });
      })
      .catch(() => {
        if (active) setCatalogFailed(true);
      });
    return () => {
      active = false;
    };
  }, [course, language, refresh, request, scope]);

  useEffect(() => {
    setAutoPlay(readWordAutoPlay(course, user?.id));
    setSaving(false);
    setSaveFailed(false);
    setLaunching(false);
    launchRef.current = false;
    setSwitchingCourse(false);
    setLanguageFailed(false);
    setQuery("");
    setKind("all");
    setLevel("all");
  }, [course, user?.id]);

  useEffect(() => {
    if (!collectionId) return;
    let active = true;
    setDetail(null);
    setDetailFailed(false);
    setSaveFailed(false);
    setExpanded(false);
    setSectionPickerOpen(false);
    void getWordCollection(request, course, language, collectionId)
      .then((result) => {
        if (!active) return;
        setDetail({ scope, value: result });
        setSelectedGroupId(
          getDefaultWordCollectionGroup(result, preferredGroupId)?.id ?? "",
        );
      })
      .catch(() => {
        if (active) setDetailFailed(true);
      });
    return () => {
      active = false;
    };
  }, [
    collectionId,
    course,
    language,
    preferredGroupId,
    refresh,
    request,
    scope,
  ]);

  useEffect(() => {
    if (!book || !selectedGroup) return;
    const controller = new AbortController();
    let active = true;
    setPreviewFailed(false);
    void getWordCollectionWords(
      request,
      course,
      contentLanguage,
      book.id,
      selectedGroup.id,
      { limit: 3, preview: true, signal: controller.signal },
    )
      .then((words) => {
        if (active) setPreview({ key: previewKey, words });
      })
      .catch(() => {
        if (active) setPreviewFailed(true);
      });
    return () => {
      active = false;
      controller.abort();
    };
  }, [book, contentLanguage, course, previewKey, request, selectedGroup]);

  useEffect(() => {
    pageRef.current?.scrollTo({ top: 0 });
  }, [collectionId, tab]);

  const mine = useMemo(() => getMyWordCollections(items), [items]);
  const recent = mine.find((item) => item.lastPosition) ?? mine[0];
  const otherBooks = mine.filter((item) => item.id !== recent?.id);
  const shown = useMemo(
    () => filterWordCollections(items, { query, kind, level }),
    [items, query, kind, level],
  );

  const catalogURL = useCallback(
    (nextTab = tab) => `/word-library?tab=${nextTab}`,
    [tab],
  );
  const openBook = (item: WordCollectionSummary) => {
    window.Telegram?.WebApp.HapticFeedback?.selectionChanged();
    router.push(`${catalogURL()}&collectionId=${encodeURIComponent(item.id)}`);
  };
  const startGroup = (
    collection: WordCollectionSummary,
    groupId: string,
    resume: boolean,
  ) => {
    saveWordAutoPlay(course, user?.id, autoPlay);
    const query = new URLSearchParams({ collectionId: collection.id, groupId });
    if (resume) query.set("resume", "1");
    router.push(`/word-study?${query.toString()}`);
  };
  const continueBook = async (item: WordCollectionSummary) => {
    if (launchRef.current) return;
    launchRef.current = true;
    setLaunching(true);
    const requestScope = scope;
    try {
      const result = await getWordCollection(
        request,
        course,
        language,
        item.id,
      );
      if (currentScope.current !== requestScope) return;
      const group = getDefaultWordCollectionGroup(result);
      if (group) startGroup(result, group.id, true);
      else openBook(result);
    } catch {
      if (currentScope.current === requestScope) openBook(item);
    } finally {
      if (currentScope.current === requestScope) {
        launchRef.current = false;
        setLaunching(false);
      }
    }
  };
  const switchCourse = async (nextCourse: LearnCourse) => {
    if (nextCourse === course || switchingCourse) return;
    const requestScope = scope;
    setSwitchingCourse(true);
    setLanguageFailed(false);
    try {
      const result = await saveLearnMode(
        request,
        "vocabulary",
        undefined,
        nextCourse,
      );
      if (currentScope.current !== requestScope) return;
      updateUser({
        ...result,
        learnMode: "vocabulary",
        learnCourse: nextCourse,
      });
      router.replace("/word-library");
    } catch {
      if (currentScope.current === requestScope) setLanguageFailed(true);
    } finally {
      if (currentScope.current === requestScope) setSwitchingCourse(false);
    }
  };
  const toggleSaved = async () => {
    if (!book || saving) return;
    const requestScope = scope;
    setSaving(true);
    setSaveFailed(false);
    try {
      await setWordCollectionSaved(
        request,
        course,
        language,
        book.id,
        !book.saved,
      );
      if (currentScope.current !== requestScope) return;
      const saved = !book.saved;
      setDetail({ scope, value: { ...book, saved } });
      setCatalog((current) =>
        current?.scope === scope
          ? {
              ...current,
              items: current.items.map((item) =>
                item.id === book.id ? { ...item, saved } : item,
              ),
            }
          : current,
      );
    } catch {
      if (currentScope.current === requestScope) setSaveFailed(true);
    } finally {
      if (currentScope.current === requestScope) setSaving(false);
    }
  };

  const renderState = (error: boolean, empty = false) => (
    <section aria-live="polite" className={styles.state}>
      {error ? (
        <MobileIcon name="cloud-offline-outline" size={30} />
      ) : empty ? (
        <MobileIcon name="book-outline" size={30} />
      ) : (
        <span className={styles.spinner} />
      )}
      <h2
        data-i18n={`wordLibrary.${error ? "error" : empty ? "empty" : "loading"}`}
      >
        {copy(error ? "error" : empty ? "empty" : "loading")}
      </h2>
      {error || empty ? (
        <p data-i18n={`wordLibrary.${error ? "errorSub" : "emptySub"}`}>
          {copy(error ? "errorSub" : "emptySub")}
        </p>
      ) : null}
      {error ? (
        <button
          className={styles.primary}
          data-i18n="wordLibrary.retry"
          onClick={() => setRefresh((value) => value + 1)}
          type="button"
        >
          {copy("retry")}
        </button>
      ) : null}
      {empty && tab === "mine" ? (
        <button
          className={styles.primary}
          data-i18n="wordLibrary.discover"
          onClick={() => router.replace(catalogURL("find"))}
          type="button"
        >
          {copy("discover")}
        </button>
      ) : null}
    </section>
  );

  return (
    <main
      className={styles.page}
      ref={pageRef}
      style={
        getWordLibraryCssVariables(resolvedTheme === "dark") as CSSProperties
      }
    >
      {collectionId ? (
        <>
          <header className={styles.detailHeader}>
            <button
              className={styles.detailBack}
              onClick={() => router.replace(catalogURL())}
              type="button"
            >
              <MobileIcon name="arrow-back" size={20} />
              <span data-i18n="wordLibrary.back">{copy("back")}</span>
            </button>
            {book ? (
              <button
                aria-label={copy(
                  book.saved ? "removeCollection" : "saveCollection",
                )}
                aria-pressed={book.saved}
                className={styles.bookmark}
                disabled={saving}
                onClick={() => void toggleSaved()}
                type="button"
              >
                <MobileIcon
                  name={book.saved ? "bookmark" : "bookmark-outline"}
                  size={23}
                />
              </button>
            ) : null}
          </header>
          {detailFailed ? (
            renderState(true)
          ) : !book ? (
            renderState(false)
          ) : (
            <>
              <section className={styles.detailBook}>
                <BookCover book={book} />
                <div>
                  <h1 className={styles.detailTitle} data-no-translate>
                    {book.title}
                  </h1>
                  <p className={styles.detailMeta}>
                    <span data-i18n={`wordLibrary.${KIND_KEYS[book.kind]}`}>
                      {copy(KIND_KEYS[book.kind])}
                    </span>
                    {" · "}
                    <span data-i18n={`wordLibrary.${LEVEL_KEYS[book.level]}`}>
                      {copy(LEVEL_KEYS[book.level])}
                    </span>
                    <br />
                    <span data-i18n="wordLibrary.wordsCount">
                      {copy("wordsCount", { count: book.words })}
                    </span>
                    {" · "}
                    <span
                      data-i18n={
                        sections.length
                          ? "wordLibrary.sectionCount"
                          : "wordLibrary.groupCount"
                      }
                    >
                      {copy(sections.length ? "sectionCount" : "groupCount", {
                        count: sections.length || book.groupCount,
                      })}
                    </span>
                  </p>
                </div>
              </section>
              {book.description ? (
                <p className={styles.description} data-no-translate>
                  {book.description}
                </p>
              ) : null}
              {saveFailed ? (
                <p
                  className={styles.inlineError}
                  data-i18n="wordLibrary.saveFailed"
                  role="alert"
                >
                  {copy("saveFailed")}
                </p>
              ) : null}
              <section className={styles.detailProgress}>
                <div className={styles.progressLabel}>
                  <span data-i18n="wordLibrary.mastered">
                    {copy("mastered")}
                  </span>
                  <strong data-i18n="wordLibrary.masteredCount">
                    {copy("masteredCount", {
                      mastered: book.mastered,
                      total: book.words,
                    })}
                  </strong>
                </div>
                <BookProgress book={book} />
                <p data-i18n="wordLibrary.sharedProgress">
                  {copy("sharedProgress")}
                </p>
              </section>
              {selectedSection && (
                <section className={styles.sectionSelector}>
                  <div className={styles.sectionHeading}>
                    <h2 data-i18n="wordLibrary.sectionPicker">
                      {copy("sectionPicker")}
                    </h2>
                    <small data-i18n="wordLibrary.sectionCount">
                      {copy("sectionCount", { count: sections.length })}
                    </small>
                  </div>
                  <button
                    className={styles.selectedSection}
                    type="button"
                    aria-expanded={sectionPickerOpen}
                    aria-label={copy("changeSection")}
                    onClick={() => setSectionPickerOpen((open) => !open)}
                  >
                    <span className={styles.sectionNumber} data-no-translate>
                      {selectedSection.section}
                    </span>
                    <span className={styles.unitCopy}>
                      <strong data-i18n="wordLibrary.sectionTitle">
                        {copy("sectionTitle", { n: selectedSection.section })}
                      </strong>
                      <small data-i18n="wordLibrary.unitsCount">
                        {copy("unitsCount", {
                          count: selectedSection.groups.length,
                        })}
                      </small>
                    </span>
                    <MobileIcon
                      name={sectionPickerOpen ? "chevron-up" : "chevron-down"}
                      size={20}
                    />
                  </button>
                  {sectionPickerOpen && (
                    <div className={styles.sectionGrid}>
                      {sections.map((section) => (
                        <button
                          className={styles.sectionOption}
                          key={section.section}
                          type="button"
                          aria-pressed={
                            section.section === selectedSection.section
                          }
                          onClick={() => {
                            const next = getDefaultWordCollectionGroup({
                              ...book,
                              groups: section.groups,
                            });
                            if (next) setSelectedGroupId(next.id);
                            setExpanded(false);
                            setSectionPickerOpen(false);
                            window.Telegram?.WebApp.HapticFeedback?.selectionChanged();
                          }}
                        >
                          <strong data-i18n="wordLibrary.sectionTitle">
                            {copy("sectionTitle", { n: section.section })}
                          </strong>
                          <small data-i18n="wordLibrary.unitsCount">
                            {copy("unitsCount", {
                              count: section.groups.length,
                            })}
                          </small>
                        </button>
                      ))}
                    </div>
                  )}
                </section>
              )}
              <div className={styles.sectionHeading}>
                <h2
                  data-i18n={
                    selectedSection
                      ? "wordLibrary.unitsInSection"
                      : "wordLibrary.studyRange"
                  }
                >
                  {copy(selectedSection ? "unitsInSection" : "studyRange")}
                </h2>
                <small
                  data-i18n={
                    selectedSection
                      ? "wordLibrary.unitsCount"
                      : "wordLibrary.groupCount"
                  }
                >
                  {copy(selectedSection ? "unitsCount" : "groupCount", {
                    count: visibleGroups.length,
                  })}
                </small>
              </div>
              {book.groups.length === 0 ? (
                <section className={styles.state}>
                  <h2 data-i18n="wordLibrary.noGroups">{copy("noGroups")}</h2>
                  <p data-i18n="wordLibrary.noGroupsSub">
                    {copy("noGroupsSub")}
                  </p>
                </section>
              ) : (
                <>
                  <div>
                    {visibleGroups
                      .filter(
                        (group, index) =>
                          expanded || index < 3 || group.id === selectedGroupId,
                      )
                      .map((group) => (
                        <button
                          aria-pressed={group.id === selectedGroupId}
                          className={styles.unitRow}
                          key={group.id}
                          onClick={() => setSelectedGroupId(group.id)}
                          type="button"
                        >
                          <span className={styles.unitIndex} data-no-translate>
                            {group.words > 0 &&
                            group.mastered === group.words ? (
                              <MobileIcon name="checkmark" size={18} />
                            ) : (
                              String(
                                selectedSection ? group.unit : group.order + 1,
                              ).padStart(2, "0")
                            )}
                          </span>
                          <span className={styles.unitCopy}>
                            <strong
                              data-no-translate={
                                (!selectedSection && Boolean(group.title)) ||
                                undefined
                              }
                              data-i18n={
                                selectedSection
                                  ? "wordLibrary.unitNumber"
                                  : undefined
                              }
                            >
                              {selectedSection
                                ? copy("unitNumber", {
                                    n: group.unit ?? group.order + 1,
                                  })
                                : groupTitle(group)}
                            </strong>
                            <small>
                              <span data-i18n="wordLibrary.unitProgress">
                                {copy("unitProgress", {
                                  mastered: group.mastered,
                                  total: group.words,
                                })}
                              </span>
                              {group.due > 0 ? (
                                <>
                                  {" · "}
                                  <span data-i18n="wordLibrary.unitDue">
                                    {copy("unitDue", { count: group.due })}
                                  </span>
                                </>
                              ) : null}
                            </small>
                          </span>
                          <span
                            className={styles.unitState}
                            data-i18n={`wordLibrary.${group.words > 0 && group.mastered === group.words ? "completed" : group.learning + group.review + group.mastered > 0 ? "learning" : "new"}`}
                          >
                            {copy(
                              group.words > 0 && group.mastered === group.words
                                ? "completed"
                                : group.learning +
                                      group.review +
                                      group.mastered >
                                    0
                                  ? "learning"
                                  : "new",
                            )}
                          </span>
                        </button>
                      ))}
                  </div>
                  {visibleGroups.length > 3 ? (
                    <button
                      aria-expanded={expanded}
                      className={styles.textButton}
                      onClick={() => setExpanded((value) => !value)}
                      type="button"
                    >
                      <span
                        data-i18n={`wordLibrary.${expanded ? "collapseGroups" : "allGroups"}`}
                      >
                        {copy(expanded ? "collapseGroups" : "allGroups", {
                          count: visibleGroups.length,
                        })}
                      </span>
                      <MobileIcon
                        name={expanded ? "chevron-up" : "chevron-down"}
                        size={16}
                      />
                    </button>
                  ) : null}
                  <fieldset className={styles.playback}>
                    <legend data-i18n="wordLibrary.playback">
                      {copy("playback")}
                    </legend>
                    {[true, false].map((enabled) => (
                      <label
                        className={styles.playbackChoice}
                        key={String(enabled)}
                      >
                        <input
                          checked={autoPlay === enabled}
                          name="word-playback"
                          onChange={() => {
                            setAutoPlay(enabled);
                            saveWordAutoPlay(course, user?.id, enabled);
                          }}
                          type="radio"
                        />
                        <span>
                          <strong
                            data-i18n={`wordLibrary.${enabled ? "playbackAuto" : "playbackManual"}`}
                          >
                            {copy(enabled ? "playbackAuto" : "playbackManual")}
                          </strong>
                          <small
                            data-i18n={`wordLibrary.${enabled ? "playbackAutoSub" : "playbackManualSub"}`}
                          >
                            {copy(
                              enabled ? "playbackAutoSub" : "playbackManualSub",
                              {
                                language: uzt(
                                  `courses.languages.${course === "en" ? "english" : "korean"}`,
                                ),
                              },
                            )}
                          </small>
                        </span>
                      </label>
                    ))}
                  </fieldset>
                  <button
                    className={`${styles.primary} ${styles.start}`}
                    disabled={!selectedGroup || selectedGroup.words < 1}
                    onClick={() =>
                      selectedGroup &&
                      startGroup(
                        book,
                        selectedGroup.id,
                        book.lastPosition?.groupId === selectedGroup.id,
                      )
                    }
                    type="button"
                  >
                    <span data-i18n="wordLibrary.start">{copy("start")}</span>
                    <MobileIcon name="arrow-forward" size={20} />
                  </button>
                </>
              )}
              <section className={styles.preview}>
                <div className={styles.sectionHeading}>
                  <h2 data-i18n="wordLibrary.preview">{copy("preview")}</h2>
                </div>
                {previewFailed ? (
                  <p
                    className={styles.inlineError}
                    data-i18n="wordLibrary.loadCollectionFailed"
                  >
                    {copy("loadCollectionFailed")}
                  </p>
                ) : selectedGroup && preview?.key !== previewKey ? (
                  <p className={styles.note} data-i18n="wordLibrary.loading">
                    {copy("loading")}
                  </p>
                ) : previewWords.length ? (
                  previewWords.map((word) => (
                    <div
                      className={styles.previewWord}
                      data-no-translate
                      key={word.id}
                    >
                      <strong>{word.headword}</strong>
                      <span>{word.meaning}</span>
                    </div>
                  ))
                ) : (
                  <p
                    className={styles.note}
                    data-i18n="wordLibrary.previewEmpty"
                  >
                    {copy("previewEmpty")}
                  </p>
                )}
              </section>
            </>
          )}
        </>
      ) : (
        <>
          <header className={styles.header}>
            <button
              aria-label={copy("back")}
              className={styles.backButton}
              onClick={() => safeBack(router, "/practice")}
              type="button"
            >
              <MobileIcon name="arrow-back" size={22} />
            </button>
            <div className={styles.heading}>
              <h1 data-i18n="wordLibrary.title">{copy("title")}</h1>
            </div>
            <select
              aria-label={copy("language")}
              className={styles.language}
              disabled={switchingCourse}
              onChange={(event) =>
                void switchCourse(event.target.value as LearnCourse)
              }
              value={course}
            >
              <option value="ko" data-i18n="courses.languages.korean">
                {uzt("courses.languages.korean")}
              </option>
              <option value="en" data-i18n="courses.languages.english">
                {uzt("courses.languages.english")}
              </option>
            </select>
          </header>
          {languageFailed ? (
            <p
              className={styles.inlineError}
              data-i18n="wordLibrary.languageFailed"
              role="alert"
            >
              {copy("languageFailed")}
            </p>
          ) : null}
          <nav
            aria-label={copy("title")}
            className={styles.tabs}
            role="tablist"
          >
            {(["mine", "find"] as const).map((value) => (
              <button
                aria-controls="word-library-panel"
                aria-selected={tab === value}
                data-i18n={`wordLibrary.${value === "mine" ? "mine" : "discover"}`}
                id={`word-library-tab-${value}`}
                key={value}
                onClick={() => router.replace(catalogURL(value))}
                onKeyDown={(event) => {
                  if (
                    !["ArrowLeft", "ArrowRight", "Home", "End"].includes(
                      event.key,
                    )
                  )
                    return;
                  event.preventDefault();
                  const next =
                    event.key === "Home"
                      ? "mine"
                      : event.key === "End"
                        ? "find"
                        : value === "mine"
                          ? "find"
                          : "mine";
                  router.replace(catalogURL(next));
                  window.requestAnimationFrame(() =>
                    document
                      .getElementById(`word-library-tab-${next}`)
                      ?.focus(),
                  );
                }}
                role="tab"
                tabIndex={tab === value ? 0 : -1}
                type="button"
              >
                {copy(value === "mine" ? "mine" : "discover")}
              </button>
            ))}
          </nav>
          <div
            aria-labelledby={`word-library-tab-${tab}`}
            id="word-library-panel"
            role="tabpanel"
          >
            {catalogFailed ? (
              renderState(true)
            ) : catalog?.scope !== scope ? (
              renderState(false)
            ) : tab === "mine" ? (
              mine.length ? (
                <>
                  {recent ? (
                    <>
                      <div className={styles.sectionHeading}>
                        <h2 data-i18n="wordLibrary.continueLearning">
                          {copy("continueLearning")}
                        </h2>
                        <small
                          data-i18n={`wordLibrary.${KIND_KEYS[recent.kind]}`}
                        >
                          {copy(KIND_KEYS[recent.kind])}
                        </small>
                      </div>
                      <section className={styles.current}>
                        <button
                          aria-label={recent.title}
                          className={styles.coverButton}
                          onClick={() => openBook(recent)}
                          type="button"
                        >
                          <BookCover book={recent} />
                        </button>
                        <div className={styles.currentCopy}>
                          <h3 data-no-translate>{recent.title}</h3>
                          <p data-i18n="wordLibrary.masteredCount">
                            {copy("masteredCount", {
                              mastered: recent.mastered,
                              total: recent.words,
                            })}
                          </p>
                          <button
                            className={styles.primary}
                            aria-busy={launching}
                            disabled={launching || switchingCourse}
                            onClick={() => void continueBook(recent)}
                            type="button"
                          >
                            <span data-i18n="wordLibrary.continueAction">
                              {copy("continueAction")}
                            </span>
                            <MobileIcon name="arrow-forward" size={18} />
                          </button>
                        </div>
                      </section>
                    </>
                  ) : null}
                  {otherBooks.length ? (
                    <>
                      <div className={styles.sectionHeading}>
                        <h2 data-i18n="wordLibrary.studying">
                          {copy("studying")}
                        </h2>
                        <small data-i18n="wordLibrary.allBooksCount">
                          {copy("allBooksCount", { count: mine.length })}
                        </small>
                      </div>
                      <div className={styles.bookList}>
                        {otherBooks.map((item) => (
                          <BookRow
                            book={item}
                            key={item.id}
                            onOpen={() => openBook(item)}
                          />
                        ))}
                      </div>
                    </>
                  ) : null}
                  <footer className={styles.footer}>
                    <p data-i18n="wordLibrary.allCollections">
                      {copy("allCollections")}
                    </p>
                    <button
                      className={styles.textButton}
                      onClick={() => router.replace(catalogURL("find"))}
                      type="button"
                    >
                      <span data-i18n="wordLibrary.discover">
                        {copy("discover")}
                      </span>
                      <MobileIcon name="arrow-forward" size={16} />
                    </button>
                  </footer>
                </>
              ) : (
                renderState(false, true)
              )
            ) : (
              <>
                <label className={styles.search}>
                  <MobileIcon name="search" size={19} />
                  <input
                    aria-label={copy("searchPlaceholder")}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={copy("searchPlaceholder")}
                    type="search"
                    value={query}
                  />
                  {query ? (
                    <button
                      aria-label={copy("searchClear")}
                      className={styles.backButton}
                      onClick={() => setQuery("")}
                      type="button"
                    >
                      <MobileIcon name="close" size={18} />
                    </button>
                  ) : null}
                </label>
                <div className={styles.filters}>
                  <label>
                    <span data-i18n="wordLibrary.collectionType">
                      {copy("collectionType")}
                    </span>
                    <select
                      onChange={(event) =>
                        setKind(
                          event.target.value as WordCollectionKind | "all",
                        )
                      }
                      value={kind}
                    >
                      <option value="all">{copy("allKinds")}</option>
                      {WORD_COLLECTION_KINDS.map((value) => (
                        <option key={value} value={value}>
                          {copy(KIND_KEYS[value])}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span data-i18n="wordLibrary.level">{copy("level")}</span>
                    <select
                      onChange={(event) =>
                        setLevel(
                          event.target.value as WordCollectionLevel | "all",
                        )
                      }
                      value={level}
                    >
                      <option value="all">{copy("allLevels")}</option>
                      {WORD_COLLECTION_LEVELS.map((value) => (
                        <option key={value} value={value}>
                          {copy(LEVEL_KEYS[value])}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className={styles.catalogHeading}>
                  <p data-i18n="wordLibrary.collectionCount">
                    {copy("collectionCount", { count: shown.length })}
                  </p>
                </div>
                {shown.length ? (
                  <div className={styles.bookList}>
                    {shown.map((item) => (
                      <BookRow
                        book={item}
                        key={item.id}
                        onOpen={() => openBook(item)}
                      />
                    ))}
                  </div>
                ) : (
                  <section className={styles.state}>
                    <h2 data-i18n="wordLibrary.noResults">
                      {copy("noResults")}
                    </h2>
                    <p data-i18n="wordLibrary.noResultsSub">
                      {copy("noResultsSub")}
                    </p>
                    <button
                      className={styles.textButton}
                      onClick={() => {
                        setQuery("");
                        setKind("all");
                        setLevel("all");
                      }}
                      type="button"
                    >
                      <span data-i18n="wordLibrary.refresh">
                        {copy("refresh")}
                      </span>
                    </button>
                  </section>
                )}
              </>
            )}
          </div>
        </>
      )}
    </main>
  );
}
