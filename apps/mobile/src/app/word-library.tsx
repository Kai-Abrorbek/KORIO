import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Pressable, Switch } from "@/components/ui/Pressables";
import { useTheme } from "@/hooks/useTheme";
import { themes, type ThemeColors } from "@/constants/theme";
import {
  DEFAULT_LEARNING_COURSES,
  type LearnCourse,
} from "@/constants/learnCourses";
import { useSettingsStore, useContentLang } from "@/store/settings.store";
import { useAuthStore } from "@/store/auth.store";
import { WordCollectionsService } from "@/services/word-collections.service";
import type { StudyWord } from "@/types/word-study";
import { commitLearnMode } from "@/utils/learn-mode";
import * as Haptics from "@/utils/haptics";
import {
  filterWordCollections,
  getDefaultWordCollectionGroup,
  getMyWordCollections,
  getWordCollectionCoverMark,
  getWordCollectionSections,
  WORD_COLLECTION_KINDS,
  WORD_COLLECTION_LEVELS,
  WORD_COLLECTION_KIND_KEYS,
  WORD_COLLECTION_LEVEL_KEYS,
  type WordCollectionSummary,
  type WordCollectionDetail,
  type WordCollectionKind,
  type WordCollectionLevel,
} from "../../../../shared/word-library";
import { getWordLibraryPalette } from "../../../../shared/word-library-theme";

function palette(theme: ThemeColors) {
  return {
    ...theme,
    ...getWordLibraryPalette(theme.bg === themes.dark.bg),
  };
}

function BookCover({
  book,
  size = "small",
}: {
  book: WordCollectionSummary;
  size?: "small" | "large";
}) {
  const dark = useTheme().bg === themes.dark.bg;
  const colors = getWordLibraryPalette(dark);
  const cover = colors.covers[book.cover];
  const mark = getWordCollectionCoverMark(book);
  return (
    <View
      accessible={false}
      importantForAccessibility="no-hide-descendants"
      style={[
        styles.cover,
        size === "large" && styles.coverLarge,
        { backgroundColor: cover.bg },
      ]}
    >
      <View style={[styles.spine, { backgroundColor: cover.text }]} />
      {book.saved && (
        <View
          style={[styles.coverBookmark, { backgroundColor: colors.pink }]}
        />
      )}
      <Text
        style={[
          styles.publisher,
          size === "large" && styles.publisherLarge,
          { color: cover.text },
        ]}
      >
        KORIO
      </Text>
      <Text
        style={[
          styles.coverMark,
          size === "large" && styles.coverMarkLarge,
          { color: cover.text },
        ]}
      >
        {mark}
      </Text>
      {size === "large" && (
        <Text
          numberOfLines={3}
          style={[styles.coverName, { color: cover.text }]}
        >
          {book.title}
        </Text>
      )}
    </View>
  );
}

function Progress({
  book,
  color,
  track,
}: {
  book: { mastered: number; words: number };
  color: string;
  track: string;
}) {
  const { t } = useTranslation();
  const value = book.words
    ? Math.max(0, Math.min(100, (book.mastered / book.words) * 100))
    : 0;
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={t("wordLibrary.mastered")}
      accessibilityValue={{ min: 0, max: book.words, now: book.mastered }}
      style={[styles.progress, { backgroundColor: track }]}
    >
      <View
        style={[
          styles.progressFill,
          { backgroundColor: color, width: `${value}%` },
        ]}
      />
    </View>
  );
}

export default function WordLibraryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    collectionId?: string;
    groupId?: string;
    section?: string;
    unit?: string;
  }>();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const colors = palette(useTheme());
  const theme = colors;
  const course = useSettingsStore((s) => s.learnCourse);
  const uiLanguage = useSettingsStore((s) => s.language);
  const contentLanguage = useContentLang();
  const autoPlay = useSettingsStore((s) => s.wordStudyAutoPlay);
  const setAutoPlay = useSettingsStore((s) => s.setWordStudyAutoPlay);
  const storedLegacyPosition = useSettingsStore((s) => s.wordStudyLast);
  const userId = useAuthStore((s) => s.user?.id);
  const legacyPosition =
    userId && storedLegacyPosition?.ownerId === userId
      ? storedLegacyPosition
      : null;
  const scopeKey = `${userId || ""}:${course}:${uiLanguage}`;
  const scopeRef = useRef(scopeKey);
  scopeRef.current = scopeKey;
  const [data, setData] = useState<{
    scope: string;
    items: WordCollectionSummary[];
  }>({ scope: "", items: [] });
  const [detailData, setDetailData] = useState<{
    scope: string;
    item: WordCollectionDetail;
  } | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [groupId, setGroupId] = useState<string | null>(null);
  const [tab, setTab] = useState<"mine" | "discover">("mine");
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<WordCollectionKind | "all">("all");
  const [level, setLevel] = useState<WordCollectionLevel | "all">("all");
  const [languageOpen, setLanguageOpen] = useState(false);
  const [levelOpen, setLevelOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [sectionPickerOpen, setSectionPickerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState(false);
  const [detailError, setDetailError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [detailRefresh, setDetailRefresh] = useState(0);
  const [preview, setPreview] = useState<StudyWord[]>([]);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewFailed, setPreviewFailed] = useState(false);
  const [launching, setLaunching] = useState(false);
  const items = useMemo(
    () => (data.scope === scopeKey ? data.items : []),
    [data, scopeKey],
  );
  const detail =
    detailData?.scope === scopeKey && detailData.item.id === selectedId
      ? detailData.item
      : null;
  const currentGroup = detail
    ? getDefaultWordCollectionGroup(detail, groupId || undefined)
    : undefined;
  const languageName = t(
    course === "en" ? "courses.languages.english" : "courses.languages.korean",
  );
  const myBooks = useMemo(() => getMyWordCollections(items), [items]);
  const recent = myBooks.find((b) => b.lastPosition) || myBooks[0];
  const visible = useMemo(
    () => filterWordCollections(items, { query, kind, level }),
    [items, query, kind, level],
  );

  useEffect(() => {
    setLaunching(false);
    setSaving(false);
    setLanguageOpen(false);
    setLevelOpen(false);
    setSectionPickerOpen(false);
  }, [scopeKey]);

  useEffect(() => {
    setSelectedId(
      params.collectionId ||
        (params.section && params.unit
          ? `course-${DEFAULT_LEARNING_COURSES[course].courseId}`
          : null),
    );
    setGroupId(
      params.groupId ||
        (params.section && params.unit
          ? `s${Number(params.section)}-u${Number(params.unit)}`
          : null),
    );
    setExpanded(false);
    setSaveFailed(false);
    setSectionPickerOpen(false);
    setQuery("");
    setKind("all");
    setLevel("all");
  }, [
    course,
    userId,
    params.collectionId,
    params.groupId,
    params.section,
    params.unit,
  ]);

  useFocusEffect(
    useCallback(() => {
      void refresh; // Explicit retry invalidates this focus load.
      let active = true;
      setLoading(true);
      setError(false);
      WordCollectionsService.list()
        .then((result) => {
          if (active && scopeRef.current === scopeKey)
            setData({ scope: scopeKey, items: result });
        })
        .catch(() => {
          if (active && scopeRef.current === scopeKey) setError(true);
        })
        .finally(() => {
          if (active && scopeRef.current === scopeKey) setLoading(false);
        });
      return () => {
        active = false;
      };
    }, [scopeKey, refresh]),
  );

  useEffect(() => {
    if (!selectedId) return;
    let active = true;
    setDetailLoading(true);
    setDetailError(false);
    setSaveFailed(false);
    WordCollectionsService.get(selectedId)
      .then((result) => {
        if (!active || scopeRef.current !== scopeKey) return;
        setDetailData({ scope: scopeKey, item: result });
        setGroupId((previous) => {
          const legacy =
            result.kind === "course" && !result.lastPosition && legacyPosition
              ? result.groups.find(
                  (g) =>
                    g.section === legacyPosition.section &&
                    g.unit === legacyPosition.unit,
                )?.id
              : undefined;
          return (
            getDefaultWordCollectionGroup(result, previous || legacy)?.id ||
            null
          );
        });
      })
      .catch(() => {
        if (active && scopeRef.current === scopeKey) setDetailError(true);
      })
      .finally(() => {
        if (active && scopeRef.current === scopeKey) setDetailLoading(false);
      });
    return () => {
      active = false;
    };
    // The legacy position is a one-time fallback for the untouched original course.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, scopeKey, detailRefresh]);

  useEffect(() => {
    setPreview([]);
    setPreviewFailed(false);
    if (!detail || !currentGroup) return;
    let active = true;
    setPreviewLoading(true);
    WordCollectionsService.getPreview(detail.id, currentGroup.id)
      .then((result) => {
        if (active && scopeRef.current === scopeKey) setPreview(result);
      })
      .catch(() => {
        if (active && scopeRef.current === scopeKey) setPreviewFailed(true);
      })
      .finally(() => {
        if (active && scopeRef.current === scopeKey) setPreviewLoading(false);
      });
    return () => {
      active = false;
    };
  }, [detail, currentGroup, contentLanguage, scopeKey]);

  const closeDetail = useCallback(() => {
    setSelectedId(null);
    setGroupId(null);
    setDetailData(null);
    setExpanded(false);
    setSectionPickerOpen(false);
    setRefresh((n) => n + 1);
    router.setParams({
      collectionId: undefined,
      groupId: undefined,
      section: undefined,
      unit: undefined,
    });
  }, [router]);

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          if (!selectedId) return false;
          closeDetail();
          return true;
        },
      );
      return () => subscription.remove();
    }, [selectedId, closeDetail]),
  );

  const back = () => {
    if (selectedId) closeDetail();
    else if (router.canGoBack()) router.back();
    else router.replace("/");
  };

  const openBook = (book: WordCollectionSummary) => {
    setSelectedId(book.id);
    setGroupId(null);
    setExpanded(false);
    setSectionPickerOpen(false);
    void Haptics.selectionAsync();
  };

  const launch = async (book: WordCollectionSummary, resume = false) => {
    if (launching) return;
    setLaunching(true);
    const requestedScope = scopeKey;
    try {
      const full =
        detail?.id === book.id
          ? detail
          : await WordCollectionsService.get(book.id);
      if (scopeRef.current !== requestedScope) return;
      const old =
        full.kind === "course" && !full.lastPosition && legacyPosition
          ? full.groups.find(
              (g) =>
                g.section === legacyPosition.section &&
                g.unit === legacyPosition.unit,
            )?.id
          : undefined;
      const group = getDefaultWordCollectionGroup(
        full,
        detail?.id === full.id ? currentGroup?.id : old,
      );
      if (!group) {
        openBook(full);
        return;
      }
      router.push({
        pathname: "/word-study",
        params: {
          collectionId: full.id,
          groupId: group.id,
          ...(resume ? { resume: "1" } : {}),
        },
      });
    } catch {
      if (scopeRef.current === requestedScope) {
        setSelectedId(book.id);
        setDetailError(true);
      }
    } finally {
      if (scopeRef.current === requestedScope) setLaunching(false);
    }
  };

  const toggleSaved = async () => {
    if (!detail || saving) return;
    const activeScope = scopeKey;
    const next = !detail.saved;
    setSaving(true);
    setSaveFailed(false);
    try {
      await WordCollectionsService.setSaved(detail.id, next);
      if (scopeRef.current !== activeScope) return;
      setDetailData({ scope: scopeKey, item: { ...detail, saved: next } });
      setData((previous) => ({
        ...previous,
        items: previous.items.map((book) =>
          book.id === detail.id ? { ...book, saved: next } : book,
        ),
      }));
    } catch {
      if (scopeRef.current === activeScope) setSaveFailed(true);
    } finally {
      if (scopeRef.current === activeScope) setSaving(false);
    }
  };

  const primary = (label: string, onPress: () => void, disabled = false) => (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.primary,
        {
          backgroundColor: pressed ? colors.depth : colors.action,
          transform: [{ scale: pressed ? 0.98 : 1 }],
          opacity: disabled ? 0.5 : 1,
        },
      ]}
    >
      <Text style={[styles.primaryText, { color: colors.onAction }]}>
        {label}
      </Text>
      <Ionicons name="arrow-forward" size={18} color={colors.onAction} />
    </Pressable>
  );

  const bookRow = (book: WordCollectionSummary, showProgress: boolean) => (
    <Pressable
      key={book.id}
      accessibilityRole="button"
      accessibilityLabel={`${book.title}, ${t("wordLibrary.wordsCount", { count: book.words })}`}
      onPress={() => openBook(book)}
      style={({ pressed }) => [
        styles.bookRow,
        { borderBottomColor: theme.border, opacity: pressed ? 0.7 : 1 },
      ]}
    >
      <BookCover book={book} />
      <View style={styles.bookCopy}>
        <Text style={[styles.bookTitle, { color: theme.text }]}>
          {book.title}
        </Text>
        <Text style={[styles.meta, { color: theme.textSecondary }]}>
          {showProgress
            ? t("wordLibrary.masteredCount", {
                mastered: book.mastered,
                total: book.words,
              })
            : `${t(WORD_COLLECTION_KIND_KEYS[book.kind])} · ${t(WORD_COLLECTION_LEVEL_KEYS[book.level])} · ${t("wordLibrary.wordsCount", { count: book.words })}`}
        </Text>
        {showProgress && (
          <View style={styles.rowProgress}>
            <Progress book={book} color={theme.primary} track={theme.border} />
          </View>
        )}
      </View>
      <Ionicons name="chevron-forward" size={17} color={theme.textSecondary} />
    </Pressable>
  );

  const state = (title: string, body: string, action?: () => void) => (
    <View style={styles.state} accessibilityLiveRegion="polite">
      <Ionicons
        name={error || detailError ? "cloud-offline-outline" : "book-outline"}
        size={32}
        color={theme.primary}
      />
      <Text style={[styles.stateTitle, { color: theme.text }]}>{title}</Text>
      <Text style={[styles.stateBody, { color: theme.textSecondary }]}>
        {body}
      </Text>
      {action && (
        <View style={styles.stateAction}>
          {primary(
            t(
              error || detailError
                ? "wordLibrary.retry"
                : "wordLibrary.discover",
            ),
            action,
          )}
        </View>
      )}
    </View>
  );

  const renderHome = () => (
    <>
      <View style={[styles.tabs, { borderBottomColor: theme.border }]}>
        {(["mine", "discover"] as const).map((key) => (
          <Pressable
            key={key}
            accessibilityRole="tab"
            accessibilityState={{ selected: tab === key }}
            onPress={() => setTab(key)}
            style={[
              styles.tab,
              {
                borderBottomColor: tab === key ? theme.primary : "transparent",
              },
            ]}
          >
            <Text
              style={[
                styles.tabText,
                { color: tab === key ? theme.text : theme.textSecondary },
              ]}
            >
              {t(`wordLibrary.${key}`)}
            </Text>
          </Pressable>
        ))}
      </View>
      {!error && (loading || data.scope !== scopeKey) ? (
        <View style={styles.state}>
          <ActivityIndicator color={theme.primary} />
          <Text style={[styles.stateBody, { color: theme.textSecondary }]}>
            {t("wordLibrary.loading")}
          </Text>
        </View>
      ) : error ? (
        state(t("wordLibrary.error"), t("wordLibrary.errorSub"), () =>
          setRefresh((n) => n + 1),
        )
      ) : tab === "mine" ? (
        myBooks.length ? (
          <>
            {recent && (
              <>
                <View style={styles.sectionHeading}>
                  <Text style={[styles.heading, { color: theme.text }]}>
                    {t("wordLibrary.continueLearning")}
                  </Text>
                  <Text style={[styles.meta, { color: theme.textSecondary }]}>
                    {t(WORD_COLLECTION_KIND_KEYS[recent.kind])}
                  </Text>
                </View>
                <View
                  style={[styles.current, { backgroundColor: theme.surface }]}
                >
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={recent.title}
                    onPress={() => openBook(recent)}
                  >
                    <BookCover book={recent} size="large" />
                  </Pressable>
                  <View style={styles.currentCopy}>
                    <Text style={[styles.currentTitle, { color: theme.text }]}>
                      {recent.title}
                    </Text>
                    <Text style={[styles.meta, { color: theme.textSecondary }]}>
                      {t("wordLibrary.masteredCount", {
                        mastered: recent.mastered,
                        total: recent.words,
                      })}
                    </Text>
                    <View style={styles.currentAction}>
                      {primary(
                        t("wordLibrary.continueAction"),
                        () => void launch(recent, true),
                        launching,
                      )}
                    </View>
                  </View>
                </View>
              </>
            )}
            {myBooks.length > 1 && (
              <>
                <View style={styles.sectionHeading}>
                  <Text style={[styles.heading, { color: theme.text }]}>
                    {t("wordLibrary.studying")}
                  </Text>
                  <Text style={[styles.meta, { color: theme.textSecondary }]}>
                    {t("wordLibrary.allBooksCount", { count: myBooks.length })}
                  </Text>
                </View>
                {myBooks
                  .filter((book) => book.id !== recent?.id)
                  .map((book) => bookRow(book, true))}
              </>
            )}
            <View style={[styles.footer, { borderTopColor: theme.border }]}>
              <Text style={[styles.meta, { color: theme.textSecondary }]}>
                {t("wordLibrary.allCollections")}
              </Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => setTab("discover")}
                style={styles.textButton}
              >
                <Text style={[styles.textAction, { color: colors.primary }]}>
                  {t("wordLibrary.discover")}
                </Text>
                <Ionicons
                  name="arrow-forward"
                  size={16}
                  color={colors.primary}
                />
              </Pressable>
            </View>
          </>
        ) : (
          state(t("wordLibrary.empty"), t("wordLibrary.emptySub"), () =>
            setTab("discover"),
          )
        )
      ) : (
        <>
          <View style={[styles.search, { backgroundColor: colors.soft }]}>
            <Ionicons name="search" size={18} color={theme.textSecondary} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              accessibilityLabel={t("wordLibrary.searchPlaceholder")}
              placeholder={t("wordLibrary.searchPlaceholder")}
              placeholderTextColor={theme.textSecondary}
              style={[styles.searchInput, { color: theme.text }]}
              returnKeyType="search"
              autoCorrect={false}
            />
            {!!query && (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={t("wordLibrary.searchClear")}
                onPress={() => setQuery("")}
                style={styles.iconButton}
              >
                <Ionicons name="close" size={18} color={theme.textSecondary} />
              </Pressable>
            )}
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.kindFilters}
            accessibilityLabel={t("wordLibrary.collectionType")}
          >
            {(["all", ...WORD_COLLECTION_KINDS] as const).map((value) => (
              <Pressable
                key={value}
                accessibilityRole="button"
                accessibilityState={{ selected: kind === value }}
                onPress={() => setKind(value)}
                style={[
                  styles.kindButton,
                  {
                    backgroundColor:
                      kind === value ? colors.wash : "transparent",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.kindText,
                    {
                      color:
                        kind === value ? colors.primary : theme.textSecondary,
                    },
                  ]}
                >
                  {t(
                    value === "all"
                      ? "wordLibrary.allKinds"
                      : WORD_COLLECTION_KIND_KEYS[value],
                  )}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
          <View style={styles.resultHeader}>
            <Text
              style={[styles.meta, { color: theme.textSecondary }]}
              accessibilityLiveRegion="polite"
            >
              {t("wordLibrary.collectionCount", { count: visible.length })}
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t("wordLibrary.level")}
              accessibilityState={{ expanded: levelOpen }}
              onPress={() => setLevelOpen((v) => !v)}
              style={styles.textButton}
            >
              <Text style={[styles.meta, { color: theme.textSecondary }]}>
                {t(
                  level === "all"
                    ? "wordLibrary.allLevels"
                    : WORD_COLLECTION_LEVEL_KEYS[level],
                )}
              </Text>
              <Ionicons
                name={levelOpen ? "chevron-up" : "chevron-down"}
                size={14}
                color={theme.textSecondary}
              />
            </Pressable>
          </View>
          {levelOpen && (
            <View style={styles.levelFilters}>
              {(["all", ...WORD_COLLECTION_LEVELS] as const).map((value) => (
                <Pressable
                  key={value}
                  accessibilityRole="button"
                  accessibilityState={{ selected: level === value }}
                  onPress={() => {
                    setLevel(value);
                    setLevelOpen(false);
                  }}
                  style={[
                    styles.kindButton,
                    {
                      backgroundColor:
                        level === value ? colors.wash : colors.soft,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.kindText,
                      {
                        color:
                          level === value
                            ? colors.primary
                            : theme.textSecondary,
                      },
                    ]}
                  >
                    {t(
                      value === "all"
                        ? "wordLibrary.allLevels"
                        : WORD_COLLECTION_LEVEL_KEYS[value],
                    )}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
          {visible.length
            ? visible.map((book) => bookRow(book, false))
            : state(t("wordLibrary.noResults"), t("wordLibrary.noResultsSub"))}
        </>
      )}
    </>
  );

  const renderDetail = () => {
    if (detailLoading || (!detail && !detailError))
      return (
        <View style={styles.state}>
          <ActivityIndicator color={theme.primary} />
          <Text style={[styles.stateBody, { color: theme.textSecondary }]}>
            {t("wordLibrary.loading")}
          </Text>
        </View>
      );
    if (detailError || !detail)
      return state(
        t("wordLibrary.loadCollectionFailed"),
        t("wordLibrary.errorSub"),
        () => setDetailRefresh((n) => n + 1),
      );
    const sections = getWordCollectionSections(detail);
    const selectedSection =
      sections.find((section) =>
        section.groups.some((group) => group.id === currentGroup?.id),
      ) ?? sections[0];
    const groups =
      selectedSection?.groups ??
      detail.groups
        .filter((g) => g.words > 0)
        .sort((a, b) => a.order - b.order);
    const shown = expanded
      ? groups
      : groups.filter((g, i) => i < 3 || g.id === currentGroup?.id);
    const canResume =
      detail.lastPosition?.groupId === currentGroup?.id ||
      (!detail.lastPosition &&
        detail.id.startsWith("course-") &&
        Boolean(legacyPosition) &&
        currentGroup?.section === legacyPosition?.section &&
        currentGroup?.unit === legacyPosition?.unit);
    return (
      <>
        <View style={styles.detailBook}>
          <BookCover book={detail} size="large" />
          <View style={styles.detailCopy}>
            <Text
              accessibilityRole="header"
              style={[styles.detailTitle, { color: theme.text }]}
            >
              {detail.title}
            </Text>
            <Text style={[styles.meta, { color: theme.textSecondary }]}>
              {t(WORD_COLLECTION_KIND_KEYS[detail.kind])} ·{" "}
              {t(WORD_COLLECTION_LEVEL_KEYS[detail.level])}
            </Text>
            <Text style={[styles.meta, { color: theme.textSecondary }]}>
              {t("wordLibrary.wordsCount", { count: detail.words })} ·{" "}
              {sections.length
                ? t("wordLibrary.sectionCount", { count: sections.length })
                : t("wordLibrary.groupCount", { count: detail.groupCount })}
            </Text>
          </View>
        </View>
        {!!detail.description && (
          <Text style={[styles.description, { color: theme.textSecondary }]}>
            {detail.description}
          </Text>
        )}
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ selected: detail.saved, disabled: saving }}
          onPress={() => void toggleSaved()}
          disabled={saving}
          style={[
            styles.saveButton,
            { backgroundColor: detail.saved ? colors.pinkWash : colors.soft },
          ]}
        >
          {saving ? (
            <ActivityIndicator color={colors.primary} size="small" />
          ) : (
            <Ionicons
              name={detail.saved ? "bookmark" : "bookmark-outline"}
              size={17}
              color={detail.saved ? colors.onPink : colors.primary}
            />
          )}
          <Text
            style={[
              styles.textAction,
              { color: detail.saved ? colors.onPink : colors.primary },
            ]}
          >
            {t(
              detail.saved
                ? "wordLibrary.removeCollection"
                : "wordLibrary.saveCollection",
            )}
          </Text>
        </Pressable>
        {saveFailed && (
          <Text
            accessibilityRole="alert"
            style={[styles.message, { color: theme.textSecondary }]}
          >
            {t("wordLibrary.saveFailed")}
          </Text>
        )}
        <View style={styles.detailProgress}>
          <View style={styles.sectionHeading}>
            <Text style={[styles.meta, { color: theme.textSecondary }]}>
              {t("wordLibrary.mastered")}
            </Text>
            <Text style={[styles.progressNumber, { color: theme.text }]}>
              {detail.mastered} / {detail.words}
            </Text>
          </View>
          <Progress book={detail} color={theme.primary} track={theme.border} />
          <Text style={[styles.sharedNote, { color: theme.textSecondary }]}>
            {t("wordLibrary.sharedProgress")}
          </Text>
        </View>
        {selectedSection && (
          <View style={styles.sectionSelector}>
            <View style={styles.sectionHeading}>
              <Text style={[styles.heading, { color: theme.text }]}>
                {t("wordLibrary.sectionPicker")}
              </Text>
              <Text style={[styles.meta, { color: theme.textSecondary }]}>
                {t("wordLibrary.sectionCount", { count: sections.length })}
              </Text>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t("wordLibrary.changeSection")}
              accessibilityState={{ expanded: sectionPickerOpen }}
              onPress={() => setSectionPickerOpen((open) => !open)}
              style={[
                styles.sectionSelected,
                { backgroundColor: theme.surface, borderColor: theme.border },
              ]}
            >
              <View
                style={[
                  styles.sectionNumber,
                  { backgroundColor: colors.yellowWash },
                ]}
              >
                <Text
                  style={[styles.sectionNumberText, { color: colors.onYellow }]}
                >
                  {selectedSection.section}
                </Text>
              </View>
              <View style={styles.groupCopy}>
                <Text style={[styles.heading, { color: theme.text }]}>
                  {t("wordLibrary.sectionTitle", {
                    n: selectedSection.section,
                  })}
                </Text>
                <Text style={[styles.meta, { color: theme.textSecondary }]}>
                  {t("wordLibrary.unitsCount", {
                    count: selectedSection.groups.length,
                  })}
                </Text>
              </View>
              <Ionicons
                name={sectionPickerOpen ? "chevron-up" : "chevron-down"}
                size={20}
                color={colors.primary}
              />
            </Pressable>
            {sectionPickerOpen && (
              <View style={styles.sectionGrid}>
                {sections.map((section) => {
                  const active = section.section === selectedSection.section;
                  return (
                    <Pressable
                      key={section.section}
                      accessibilityRole="button"
                      accessibilityState={{ selected: active }}
                      onPress={() => {
                        const next = getDefaultWordCollectionGroup({
                          ...detail,
                          groups: section.groups,
                        });
                        if (next) setGroupId(next.id);
                        setExpanded(false);
                        setSectionPickerOpen(false);
                        void Haptics.selectionAsync();
                      }}
                      style={[
                        styles.sectionOption,
                        {
                          backgroundColor: active ? colors.wash : theme.surface,
                          borderColor: active ? colors.primary : theme.border,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.groupTitle,
                          { color: active ? colors.primary : theme.text },
                        ]}
                      >
                        {t("wordLibrary.sectionTitle", { n: section.section })}
                      </Text>
                      <Text
                        style={[styles.meta, { color: theme.textSecondary }]}
                      >
                        {t("wordLibrary.unitsCount", {
                          count: section.groups.length,
                        })}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            )}
          </View>
        )}
        <View style={styles.sectionHeading}>
          <Text style={[styles.heading, { color: theme.text }]}>
            {t(
              selectedSection
                ? "wordLibrary.unitsInSection"
                : "wordLibrary.studyRange",
            )}
          </Text>
          <Text style={[styles.meta, { color: theme.textSecondary }]}>
            {t(
              selectedSection
                ? "wordLibrary.unitsCount"
                : "wordLibrary.groupCount",
              { count: groups.length },
            )}
          </Text>
        </View>
        {!groups.length ? (
          state(t("wordLibrary.noGroups"), t("wordLibrary.noGroupsSub"))
        ) : (
          <>
            {shown.map((group) => {
              const completed = group.mastered >= group.words;
              const active = group.id === currentGroup?.id;
              return (
                <Pressable
                  key={group.id}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                  onPress={() => {
                    setGroupId(group.id);
                    void Haptics.selectionAsync();
                  }}
                  style={[
                    styles.group,
                    {
                      backgroundColor: active ? colors.wash : "transparent",
                      borderBottomColor: active ? "transparent" : theme.border,
                    },
                  ]}
                >
                  <View style={styles.groupIndex}>
                    {completed ? (
                      <Ionicons
                        name="checkmark"
                        size={17}
                        color={colors.success}
                      />
                    ) : (
                      <Text
                        style={[styles.meta, { color: theme.textSecondary }]}
                      >
                        {String(
                          selectedSection ? group.unit : group.order + 1,
                        ).padStart(2, "0")}
                      </Text>
                    )}
                  </View>
                  <View style={styles.groupCopy}>
                    <Text style={[styles.groupTitle, { color: theme.text }]}>
                      {selectedSection
                        ? t("wordLibrary.unitNumber", { n: group.unit })
                        : group.title ||
                          t("wordLibrary.groupTitle", { n: group.order + 1 })}
                    </Text>
                    <Text style={[styles.meta, { color: theme.textSecondary }]}>
                      {t("wordLibrary.unitProgress", {
                        mastered: group.mastered,
                        total: group.words,
                      })}
                      {group.due > 0
                        ? ` · ${t("wordLibrary.unitDue", { count: group.due })}`
                        : ""}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.groupState,
                      {
                        color: completed
                          ? colors.success
                          : active
                            ? colors.primary
                            : theme.textSecondary,
                      },
                    ]}
                  >
                    {t(
                      completed
                        ? "wordLibrary.completed"
                        : group.learning + group.review + group.mastered > 0
                          ? "wordLibrary.learning"
                          : "wordLibrary.new",
                    )}
                  </Text>
                </Pressable>
              );
            })}
            {groups.length > 3 && (
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ expanded }}
                onPress={() => setExpanded((v) => !v)}
                style={styles.textButton}
              >
                <Text style={[styles.textAction, { color: colors.primary }]}>
                  {t(
                    expanded
                      ? "wordLibrary.collapseGroups"
                      : "wordLibrary.allGroups",
                    { count: groups.length },
                  )}
                </Text>
                <Ionicons
                  name={expanded ? "chevron-up" : "chevron-down"}
                  size={16}
                  color={colors.primary}
                />
              </Pressable>
            )}
            <View style={styles.playback}>
              <View style={styles.playbackCopy}>
                <Text style={[styles.groupTitle, { color: theme.text }]}>
                  {t("wordLibrary.playbackAuto")}
                </Text>
                <Text style={[styles.meta, { color: theme.textSecondary }]}>
                  {t(
                    autoPlay
                      ? "wordLibrary.playbackAutoSub"
                      : "wordLibrary.playbackManualSub",
                    { language: languageName },
                  )}
                </Text>
              </View>
              <Switch
                accessibilityLabel={t("wordLibrary.playbackAuto")}
                value={autoPlay}
                onValueChange={setAutoPlay}
                trackColor={{ false: theme.border, true: theme.primary }}
              />
            </View>
            <View style={styles.detailStart}>
              {primary(
                t(
                  canResume
                    ? "wordLibrary.continueAction"
                    : "wordLibrary.start",
                ),
                () => void launch(detail, canResume),
                launching || !currentGroup,
              )}
            </View>
            <View style={styles.preview}>
              <Text style={[styles.heading, { color: theme.text }]}>
                {t("wordLibrary.preview")}
              </Text>
              {previewLoading ? (
                <ActivityIndicator
                  color={theme.primary}
                  style={styles.previewSpinner}
                />
              ) : previewFailed ? (
                <Text
                  style={[styles.description, { color: theme.textSecondary }]}
                >
                  {t("wordLibrary.error")}
                </Text>
              ) : preview.length ? (
                preview.map((word) => (
                  <View
                    key={word.id}
                    style={[
                      styles.previewWord,
                      { borderBottomColor: theme.border },
                    ]}
                  >
                    <Text
                      style={[styles.previewHeadword, { color: theme.text }]}
                    >
                      {word.headword}
                    </Text>
                    <Text
                      style={[
                        styles.previewMeaning,
                        { color: theme.textSecondary },
                      ]}
                    >
                      {word.meaning}
                    </Text>
                  </View>
                ))
              ) : (
                <Text
                  style={[styles.description, { color: theme.textSecondary }]}
                >
                  {t("wordLibrary.previewEmpty")}
                </Text>
              )}
            </View>
          </>
        )}
      </>
    );
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.bg }]}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t("wordLibrary.back")}
          onPress={back}
          style={[styles.iconButton, { backgroundColor: theme.surface }]}
        >
          <Ionicons name="arrow-back" size={22} color={theme.text} />
        </Pressable>
        <Text
          accessibilityRole="header"
          style={[styles.title, { color: theme.text }]}
        >
          {t("wordLibrary.title")}
        </Text>
        {!selectedId && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t("wordLibrary.language")}
            accessibilityState={{ expanded: languageOpen }}
            onPress={() => setLanguageOpen((v) => !v)}
            style={styles.languageButton}
          >
            <Text style={[styles.languageText, { color: theme.textSecondary }]}>
              {languageName}
            </Text>
            <Ionicons
              name={languageOpen ? "chevron-up" : "chevron-down"}
              size={14}
              color={theme.textSecondary}
            />
          </Pressable>
        )}
      </View>
      {languageOpen && !selectedId && (
        <View style={styles.languageOptions}>
          {(["ko", "en"] as LearnCourse[]).map((value) => (
            <Pressable
              key={value}
              accessibilityRole="button"
              accessibilityState={{ selected: value === course }}
              onPress={() => {
                setLanguageOpen(false);
                if (value !== course)
                  commitLearnMode("vocabulary", undefined, value);
              }}
              style={[
                styles.kindButton,
                {
                  backgroundColor: value === course ? colors.wash : colors.soft,
                },
              ]}
            >
              <Text
                style={[
                  styles.kindText,
                  {
                    color:
                      value === course ? colors.primary : theme.textSecondary,
                  },
                ]}
              >
                {t(
                  value === "en"
                    ? "courses.languages.english"
                    : "courses.languages.korean",
                )}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
      <ScrollView
        key={selectedId || "library"}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.content,
          { paddingBottom: Math.max(insets.bottom, 20) + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {selectedId ? renderDetail() : renderHome()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingBottom: 8,
  },
  title: { flex: 1, fontSize: 27, fontWeight: "900", letterSpacing: -0.7 },
  iconButton: {
    minWidth: 44,
    minHeight: 44,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  languageButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 6,
    minHeight: 44,
    maxWidth: "40%",
    paddingHorizontal: 6,
  },
  languageText: { fontSize: 13, fontWeight: "800", flexShrink: 1 },
  languageOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  content: {
    paddingHorizontal: 24,
    maxWidth: 560,
    width: "100%",
    alignSelf: "center",
  },
  tabs: {
    flexDirection: "row",
    gap: 24,
    borderBottomWidth: 1,
    marginBottom: 28,
    marginTop: 12,
  },
  tab: {
    flex: 1,
    minHeight: 48,
    paddingBottom: 13,
    justifyContent: "center",
    borderBottomWidth: 3,
  },
  tabText: { fontSize: 15, fontWeight: "800", flexShrink: 1 },
  sectionHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  heading: { fontSize: 17, fontWeight: "900", flexShrink: 1 },
  meta: { fontSize: 12, fontWeight: "600", lineHeight: 18, flexShrink: 1 },
  current: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    marginBottom: 30,
    padding: 16,
    borderRadius: 24,
  },
  currentCopy: { flex: 1, minWidth: 0 },
  currentTitle: {
    fontSize: 19,
    lineHeight: 27,
    fontWeight: "900",
    marginBottom: 8,
  },
  currentAction: { marginTop: 14 },
  primary: {
    minHeight: 52,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  primaryText: {
    fontSize: 15,
    fontWeight: "900",
    textAlign: "center",
    flexShrink: 1,
    lineHeight: 21,
  },
  cover: {
    width: 51,
    height: 73,
    paddingTop: 9,
    paddingHorizontal: 10,
    paddingBottom: 8,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    overflow: "hidden",
    justifyContent: "space-between",
  },
  coverLarge: {
    width: 88,
    height: 136,
    paddingTop: 14,
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexShrink: 0,
  },
  spine: {
    position: "absolute",
    left: 5,
    top: 0,
    bottom: 0,
    width: 1,
    opacity: 0.14,
  },
  coverBookmark: {
    position: "absolute",
    top: 0,
    right: 7,
    width: 9,
    height: 17,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  publisher: { fontSize: 6, fontWeight: "900", letterSpacing: 0.4 },
  publisherLarge: { fontSize: 9, letterSpacing: 1 },
  coverMark: { fontSize: 24, fontWeight: "900", lineHeight: 30 },
  coverMarkLarge: { fontSize: 43, lineHeight: 52, letterSpacing: -1 },
  coverName: { fontSize: 10, lineHeight: 14, fontWeight: "800" },
  bookRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    minHeight: 106,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  bookCopy: { flex: 1, minWidth: 0 },
  bookTitle: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "900",
    marginBottom: 4,
  },
  rowProgress: { width: 108, marginTop: 10 },
  progress: { height: 4, overflow: "hidden", borderRadius: 4 },
  progressFill: { height: "100%", borderRadius: 4 },
  footer: {
    marginTop: 26,
    paddingTop: 14,
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  textButton: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexShrink: 1,
  },
  textAction: {
    fontSize: 13,
    fontWeight: "900",
    flexShrink: 1,
    lineHeight: 19,
  },
  state: { paddingVertical: 52, alignItems: "center", gap: 12 },
  stateTitle: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "900",
    textAlign: "center",
  },
  stateBody: { fontSize: 14, lineHeight: 22, textAlign: "center" },
  stateAction: { marginTop: 8, maxWidth: "100%" },
  search: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    borderRadius: 12,
    paddingLeft: 13,
    paddingRight: 4,
    minHeight: 49,
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    minWidth: 0,
    minHeight: 48,
    fontSize: 16,
    paddingVertical: 10,
  },
  kindFilters: { gap: 5, paddingBottom: 6 },
  kindButton: {
    minHeight: 44,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 10,
    justifyContent: "center",
  },
  kindText: { fontSize: 13, fontWeight: "800", lineHeight: 19 },
  levelFilters: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
    marginBottom: 12,
  },
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 4,
  },
  detailBook: {
    flexDirection: "row",
    alignItems: "center",
    gap: 22,
    marginTop: 16,
  },
  detailCopy: { flex: 1, minWidth: 0, gap: 8 },
  detailTitle: {
    fontSize: 23,
    lineHeight: 32,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  description: { fontSize: 13, lineHeight: 21, marginTop: 18 },
  saveButton: {
    marginTop: 20,
    minHeight: 46,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  message: { fontSize: 12, lineHeight: 19, marginTop: 10 },
  detailProgress: { marginTop: 25, marginBottom: 28 },
  sectionSelector: { marginBottom: 28 },
  sectionSelected: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    minHeight: 80,
    padding: 14,
    borderWidth: 1,
    borderRadius: 22,
  },
  sectionNumber: {
    width: 46,
    height: 46,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionNumberText: { fontSize: 20, fontWeight: "800" },
  sectionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 12,
  },
  sectionOption: {
    width: "48%",
    flexGrow: 1,
    minHeight: 72,
    justifyContent: "center",
    gap: 5,
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
  },
  progressNumber: { fontSize: 15, fontWeight: "900" },
  sharedNote: { fontSize: 12, lineHeight: 18, marginTop: 9 },
  group: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    minHeight: 70,
    borderBottomWidth: 1,
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 8,
  },
  groupIndex: { width: 28, alignItems: "center", justifyContent: "center" },
  groupCopy: { flex: 1, minWidth: 0 },
  groupTitle: { fontSize: 14, fontWeight: "900", lineHeight: 21 },
  groupState: { fontSize: 11, fontWeight: "700", maxWidth: "25%" },
  playback: {
    marginTop: 22,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  playbackCopy: { flex: 1, gap: 4 },
  detailStart: { marginTop: 22 },
  preview: { marginTop: 30 },
  previewSpinner: { marginVertical: 24 },
  previewWord: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  previewHeadword: { fontSize: 16, fontWeight: "800", flex: 1 },
  previewMeaning: { fontSize: 14, lineHeight: 22, flex: 1, textAlign: "right" },
});
