import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Keyboard,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { type TopikPalette, useTopikTheme } from "./topikTheme";

const COLUMN_COUNT = 20;
const ROW_HEIGHT = 29;
const VIEWPORT_HEIGHT = 304;

interface TopikManuscriptInputProps {
  accessibilityLabel: string;
  maxLength: number;
  readOnly: boolean;
  value: string;
  onChangeText: (text: string) => void;
}

interface ManuscriptLayout {
  cells: string[];
  compactCells: boolean[];
  textToCellIndex: number[];
  cursorCell: number;
}

function createManuscriptLayout(value: string, maxLength: number) {
  const characters = value.split("");
  const cells = Array.from({ length: maxLength }, () => "");
  const compactCells = Array.from({ length: maxLength }, () => false);
  const textToCellIndex = Array.from(
    { length: characters.length + 1 },
    () => 0,
  );
  let cursorCell = 0;

  for (let textIndex = 0; textIndex < characters.length; textIndex += 1) {
    const character = characters[textIndex];
    textToCellIndex[textIndex] = Math.min(cursorCell, maxLength - 1);
    if (character === "\n") {
      const currentColumn = cursorCell % COLUMN_COUNT;
      const cellsUntilNextLine = currentColumn
        ? COLUMN_COUNT - currentColumn
        : 0;
      cursorCell = Math.min(maxLength, cursorCell + cellsUntilNextLine);
      textToCellIndex[textIndex + 1] = Math.min(cursorCell, maxLength - 1);
      continue;
    }
    if (cursorCell >= maxLength) continue;

    const nextCharacter = characters[textIndex + 1];
    const isDigitPair = /[0-9]/.test(character) && /[0-9]/.test(nextCharacter);
    cells[cursorCell] = isDigitPair
      ? `${character}${nextCharacter}`
      : character;
    compactCells[cursorCell] = isDigitPair;
    if (isDigitPair) {
      textToCellIndex[textIndex + 1] = cursorCell;
      textIndex += 1;
    }
    cursorCell += 1;
    textToCellIndex[textIndex + 1] = Math.min(cursorCell, maxLength - 1);
  }

  return {
    cells,
    compactCells,
    textToCellIndex,
    cursorCell: Math.min(cursorCell, maxLength - 1),
  } satisfies ManuscriptLayout;
}

export function TopikManuscriptInput({
  accessibilityLabel,
  maxLength,
  readOnly,
  value,
  onChangeText,
}: TopikManuscriptInputProps) {
  const { t } = useTranslation();
  const palette = useTopikTheme();
  const styles = useMemo(() => getStyles(palette), [palette]);
  const inputRef = useRef<TextInput>(null);
  const scrollRef = useRef<ScrollView>(null);
  const focusTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const keyboardVisibleRef = useRef(false);
  const [focused, setFocused] = useState(false);
  const [selection, setSelection] = useState({
    start: value.length,
    end: value.length,
  });
  const manuscript = useMemo(
    () => createManuscriptLayout(value, maxLength),
    [maxLength, value],
  );
  const rowCount = Math.ceil(maxLength / COLUMN_COUNT);
  const selectedCell =
    manuscript.textToCellIndex[Math.min(selection.end, value.length)] ??
    manuscript.cursorCell;

  useEffect(() => {
    setSelection({ start: value.length, end: value.length });
  }, [value.length]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      keyboardVisibleRef.current = true;
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      keyboardVisibleRef.current = false;
    });

    return () => {
      if (focusTimeoutRef.current) clearTimeout(focusTimeoutRef.current);
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    const activeRow = Math.floor(selectedCell / COLUMN_COUNT);
    const scrollToActiveRow = () =>
      scrollRef.current?.scrollTo({
        y: Math.max(0, activeRow * ROW_HEIGHT - ROW_HEIGHT * 4),
        animated: focused,
      });

    scrollToActiveRow();
    if (!focused) return;

    const keyboardSubscription = Keyboard.addListener(
      "keyboardDidShow",
      scrollToActiveRow,
    );
    const keyboardLayoutTimeout = setTimeout(
      scrollToActiveRow,
      Platform.OS === "android" ? 320 : 220,
    );

    return () => {
      keyboardSubscription.remove();
      clearTimeout(keyboardLayoutTimeout);
    };
  }, [focused, selectedCell]);

  const focusAtAnswerEnd = () => {
    if (readOnly) return;
    const input = inputRef.current;
    const nextSelection = { start: value.length, end: value.length };
    setSelection(nextSelection);
    if (!input) return;

    if (input.isFocused() && keyboardVisibleRef.current) {
      input.setNativeProps({ selection: nextSelection });
      return;
    }

    if (focusTimeoutRef.current) clearTimeout(focusTimeoutRef.current);
    if (input.isFocused()) input.blur();
    focusTimeoutRef.current = setTimeout(
      () => {
        input.focus();
        input.setNativeProps({ selection: nextSelection });
        focusTimeoutRef.current = null;
      },
      Platform.OS === "android" ? 60 : 0,
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.ruleCard}>
        <View style={styles.ruleHeader}>
          <View style={styles.ruleIcon}>
            <Ionicons name="grid-outline" size={16} color={palette.purple} />
          </View>
          <View style={styles.ruleHeading}>
            <Text style={styles.ruleTitle}>
              {t("topik.writingExam.manuscriptTitle")}
            </Text>
            <Text style={styles.ruleDescription}>
              {t("topik.writingExam.manuscriptDescription")}
            </Text>
          </View>
        </View>
        <View style={styles.rules}>
          {[1, 2, 3, 4, 5].map((ruleNumber) => (
            <View key={ruleNumber} style={styles.ruleRow}>
              <View style={styles.ruleDot} />
              <Text style={styles.ruleText}>
                {t(`topik.writingExam.manuscriptRule${ruleNumber}`)}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.paperFrame, focused && styles.paperFrameFocused]}>
        <View style={styles.paperToolbar}>
          <View style={styles.paperStatus}>
            <View
              style={[styles.statusDot, focused && styles.statusDotFocused]}
            />
            <Text style={styles.paperStatusText}>
              {focused
                ? t("topik.writingExam.manuscriptTyping")
                : t("topik.writingExam.manuscriptTap")}
            </Text>
          </View>
          <Text style={styles.paperScale}>
            {t("topik.writingExam.manuscriptScale", {
              columns: COLUMN_COUNT,
            })}
          </Text>
        </View>

        <ScrollView
          ref={scrollRef}
          keyboardShouldPersistTaps="always"
          nestedScrollEnabled
          showsVerticalScrollIndicator
          style={styles.paperViewport}
        >
          <Pressable
            accessibilityLabel={accessibilityLabel}
            accessibilityRole="button"
            onPressIn={focusAtAnswerEnd}
            style={styles.paper}
          >
            {Array.from({ length: rowCount }, (_, rowIndex) => {
              const completedCharacters = (rowIndex + 1) * COLUMN_COUNT;
              return (
                <View key={rowIndex} style={styles.paperRow}>
                  <View style={styles.cellRow}>
                    {Array.from({ length: COLUMN_COUNT }, (_, columnIndex) => {
                      const cellIndex = rowIndex * COLUMN_COUNT + columnIndex;
                      const character = manuscript.cells[cellIndex] ?? "";
                      const isCompact = manuscript.compactCells[cellIndex];
                      const isActive =
                        focused && !readOnly && cellIndex === selectedCell;
                      return (
                        <View
                          key={cellIndex}
                          style={[
                            styles.cell,
                            columnIndex === 0 && styles.firstCell,
                            rowIndex === 0 && styles.firstRowCell,
                            isActive && styles.activeCell,
                          ]}
                        >
                          <Text
                            style={[
                              styles.cellText,
                              isCompact && styles.compactCellText,
                            ]}
                          >
                            {character}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                  <View style={styles.rowCounter}>
                    {completedCharacters % 100 === 0 && (
                      <Text style={styles.rowCounterText}>
                        {completedCharacters}
                      </Text>
                    )}
                  </View>
                </View>
              );
            })}
          </Pressable>
        </ScrollView>

        {!readOnly && (
          <TextInput
            ref={inputRef}
            accessibilityElementsHidden
            autoCapitalize="none"
            caretHidden
            editable
            keyboardAppearance={palette.isDark ? "dark" : "light"}
            maxLength={maxLength}
            multiline
            onBlur={() => setFocused(false)}
            onChangeText={onChangeText}
            onFocus={() => {
              const endSelection = { start: value.length, end: value.length };
              setSelection(endSelection);
              inputRef.current?.setNativeProps({ selection: endSelection });
              setFocused(true);
            }}
            scrollEnabled={false}
            selection={selection}
            showSoftInputOnFocus
            style={styles.keyboardInput}
            value={value}
          />
        )}
      </View>
    </View>
  );
}

const getStyles = (palette: TopikPalette) => {
  const gridColor = palette.isDark ? "#775B65" : "#D8A0A0";
  const gridStrong = palette.isDark ? "#A47A86" : "#BD6F73";
  const paperColor = palette.isDark ? "#282327" : "#FFFDFC";

  return StyleSheet.create({
    container: { gap: 10 },
    ruleCard: {
      gap: 10,
      borderWidth: 1,
      borderColor: palette.border,
      borderRadius: 16,
      backgroundColor: palette.surfaceMuted,
      padding: 13,
    },
    ruleHeader: { flexDirection: "row", alignItems: "center", gap: 10 },
    ruleIcon: {
      width: 34,
      height: 34,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 11,
      backgroundColor: palette.purpleSoft,
    },
    ruleHeading: { flex: 1, gap: 2 },
    ruleTitle: { color: palette.text, fontSize: 12, fontWeight: "900" },
    ruleDescription: {
      color: palette.textMuted,
      fontSize: 10,
      lineHeight: 15,
    },
    rules: { gap: 5 },
    ruleRow: { flexDirection: "row", alignItems: "flex-start", gap: 7 },
    ruleDot: {
      width: 4,
      height: 4,
      marginTop: 6,
      borderRadius: 2,
      backgroundColor: palette.purple,
    },
    ruleText: {
      flex: 1,
      color: palette.textSecondary,
      fontSize: 10,
      lineHeight: 15,
    },
    paperFrame: {
      overflow: "hidden",
      borderWidth: 1.5,
      borderColor: gridStrong,
      borderRadius: 15,
      backgroundColor: paperColor,
    },
    paperFrameFocused: {
      borderColor: palette.purple,
      shadowColor: palette.purple,
      shadowOpacity: Platform.OS === "ios" ? 0.18 : 0,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 3 },
      elevation: 2,
    },
    paperToolbar: {
      minHeight: 39,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8,
      borderBottomWidth: 1,
      borderBottomColor: gridStrong,
      backgroundColor: palette.isDark ? "#342B30" : "#FFF4F3",
      paddingHorizontal: 11,
    },
    paperStatus: { flexDirection: "row", alignItems: "center", gap: 6 },
    statusDot: {
      width: 7,
      height: 7,
      borderRadius: 4,
      backgroundColor: palette.textSubtle,
    },
    statusDotFocused: { backgroundColor: palette.success },
    paperStatusText: {
      color: palette.textSecondary,
      fontSize: 10,
      fontWeight: "800",
    },
    paperScale: { color: palette.textMuted, fontSize: 9, fontWeight: "700" },
    paperViewport: { height: VIEWPORT_HEIGHT, backgroundColor: paperColor },
    paper: { minHeight: VIEWPORT_HEIGHT },
    paperRow: { height: ROW_HEIGHT, flexDirection: "row" },
    cellRow: { flex: 1, flexDirection: "row" },
    cell: {
      flex: 1,
      height: ROW_HEIGHT,
      alignItems: "center",
      justifyContent: "center",
      borderRightWidth: StyleSheet.hairlineWidth,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: gridColor,
    },
    firstCell: { borderLeftWidth: StyleSheet.hairlineWidth },
    firstRowCell: { borderTopWidth: StyleSheet.hairlineWidth },
    activeCell: { backgroundColor: palette.purpleSoft },
    cellText: {
      color: palette.text,
      fontSize: 13,
      lineHeight: 18,
      fontWeight: "600",
      textAlign: "center",
    },
    compactCellText: { fontSize: 10, letterSpacing: 0.3 },
    rowCounter: {
      width: 29,
      height: ROW_HEIGHT,
      alignItems: "center",
      justifyContent: "center",
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderLeftWidth: 1,
      borderColor: gridStrong,
      backgroundColor: palette.isDark ? "#30282C" : "#FFF4F3",
    },
    rowCounterText: {
      color: gridStrong,
      fontSize: 8,
      fontWeight: "900",
      transform: [{ rotate: "-90deg" }],
    },
    keyboardInput: {
      position: "absolute",
      left: 8,
      top: 45,
      width: 1,
      height: 1,
      opacity: 0.01,
    },
  });
};
