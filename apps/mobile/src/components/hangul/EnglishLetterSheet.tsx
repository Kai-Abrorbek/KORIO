import { useEffect, useRef, useState } from "react";
import { Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Pressable, TouchableOpacity } from "@/components/ui/Pressables";
import { useSpeech } from "@/hooks/useSpeech";
import { useTheme } from "@/hooks/useTheme";
import { useSettingsStore } from "@/store/settings.store";
import type { ThemeColors } from "@/constants/theme";
import {
  ENGLISH_PHONICS,
  getEnglishPhonics,
  phonicsSegments,
  phonicsText,
  type PhonicsExample,
} from "../../../../../shared/english-phonics";
import { PHONICS_COPY } from "../../../../../shared/english-phonics-copy";

interface Props {
  letter: string | null;
  visible: boolean;
  onClose: () => void;
  onSelectLetter: (letter: string) => void;
}

export default function EnglishLetterSheet({
  letter,
  visible,
  onClose,
  onSelectLetter,
}: Props) {
  const { i18n } = useTranslation();
  const base = i18n.language.toLowerCase().replace(/_/g, "-").split("-")[0];
  const locale = base === "ko" || base === "uz" || base === "ru" ? base : "en";
  const copy = PHONICS_COPY[locale];
  const guide = getEnglishPhonics(letter ?? "");
  const theme = useTheme();
  const s = styles(theme);
  const insets = useSafeAreaInsets();
  const { speak, speakSlow, stop, isSpeaking } = useSpeech("en-US");
  const muted = useSettingsStore((state) => state.muted);
  const speechVolume = useSettingsStore((state) => state.sound.speechVolume);
  const [tab, setTab] = useState<"rules" | "practice">("rules");
  const [openRule, setOpenRule] = useState<string | null>(null);
  const [answer, setAnswer] = useState<0 | 1 | null>(null);
  const [audioFailed, setAudioFailed] = useState(false);
  const [activeAudio, setActiveAudio] = useState<string | null>(null);
  const playback = useRef(0);
  const scroll = useRef<ScrollView>(null);
  const translateY = useSharedValue(0);
  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  useEffect(() => {
    playback.current += 1;
    stop();
    setAudioFailed(false);
    setActiveAudio(null);
    setTab("rules");
    setAnswer(null);
    setOpenRule(guide?.rules[0]?.id ?? null);
    translateY.value = 0;
    scroll.current?.scrollTo({ y: 0, animated: false });
    return () => {
      playback.current += 1;
      stop();
    };
  }, [guide, visible, stop, translateY]);

  const close = () => {
    playback.current += 1;
    stop();
    onClose();
  };

  const drag = Gesture.Pan()
    .onUpdate((event) => {
      translateY.value = Math.max(0, event.translationY);
    })
    .onEnd((event) => {
      if (event.translationY > 90 || event.velocityY > 800) runOnJS(close)();
      else translateY.value = withSpring(0, { damping: 24 });
    });

  if (!guide) return null;

  const letterIndex = ENGLISH_PHONICS.indexOf(guide);
  const soundOff = muted || speechVolume <= 0;
  const playing = (key: string) => isSpeaking && activeAudio === key;
  const play = (text: string, key: string, slow = false) => {
    setAudioFailed(false);
    if (soundOff) return;
    if (playing(key)) {
      playback.current += 1;
      stop();
      setActiveAudio(null);
      return;
    }
    const request = ++playback.current;
    setActiveAudio(key);
    const clear = () => {
      if (request === playback.current) setActiveAudio(null);
    };
    (slow ? speakSlow : speak)(text, "en-US", {
      onDone: clear,
      onStopped: clear,
      onError: () => {
        if (request !== playback.current) return;
        setActiveAudio(null);
        setAudioFailed(true);
      },
    });
  };

  const wordText = (example: PhonicsExample) => (
    <Text style={s.word}>
      {phonicsSegments(example).map((segment, index) => (
        <Text key={index} style={segment.highlighted ? s.focus : undefined}>
          {segment.text}
        </Text>
      ))}
    </Text>
  );

  const exampleCard = (example: PhonicsExample, key: string) => (
    <View key={key} style={s.example}>
      <TouchableOpacity
        style={[s.wordButton, playing(key) && s.playing]}
        onPress={() => play(example.word, key)}
        accessibilityRole="button"
        accessibilityLabel={`${playing(key) ? copy.stop : copy.listen}: ${example.word}`}
      >
        <View style={s.wordInfo}>
          {wordText(example)}
          <Text style={s.ipa}>{example.ipa}</Text>
          <Text style={s.meaning}>{phonicsText(example.meaning, locale)}</Text>
        </View>
        <Ionicons
          name={playing(key) ? "stop-circle" : "volume-high-outline"}
          size={21}
          color={theme.primary}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[s.slowButton, playing(`${key}:slow`) && s.playing]}
        onPress={() => play(example.word, `${key}:slow`, true)}
        accessibilityRole="button"
        accessibilityLabel={`${playing(`${key}:slow`) ? copy.stop : copy.slow}: ${example.word}`}
      >
        <Ionicons
          name={playing(`${key}:slow`) ? "stop" : "speedometer-outline"}
          size={15}
          color={theme.primary}
        />
        <Text style={s.slowText}>{copy.slow}</Text>
      </TouchableOpacity>
    </View>
  );

  const selectTab = (next: "rules" | "practice") => {
    setTab(next);
    scroll.current?.scrollTo({ y: 0, animated: false });
  };

  const navigate = (offset: number) => {
    const next = ENGLISH_PHONICS[letterIndex + offset];
    if (!next) return;
    playback.current += 1;
    stop();
    onSelectLetter(next.letter);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={close}
    >
      <GestureHandlerRootView style={s.root}>
        <Pressable
          style={s.backdrop}
          onPress={close}
          accessibilityLabel={copy.close}
        />
        <Animated.View
          style={[s.sheet, sheetStyle, { paddingBottom: insets.bottom + 8 }]}
        >
          <GestureDetector gesture={drag}>
            <View style={s.handleZone}>
              <View style={s.handle} />
            </View>
          </GestureDetector>
          <View style={s.topRow}>
            <Text style={s.kicker}>{copy.title}</Text>
            <TouchableOpacity
              onPress={close}
              style={s.iconButton}
              accessibilityRole="button"
              accessibilityLabel={copy.close}
            >
              <Ionicons name="close" size={22} color={theme.text} />
            </TouchableOpacity>
          </View>
          <View style={s.hero}>
            <View style={s.glyph}>
              <Text style={s.letter}>
                {guide.letter}
                {guide.letter.toLowerCase()}
              </Text>
            </View>
            <View style={s.nameInfo}>
              <Text style={s.nameLabel}>{copy.nameLabel}</Text>
              <Text style={s.name}>
                {locale === "ko" ? guide.koreanName : guide.name}{" "}
                <Text style={s.nameIpa}>{guide.nameIpa}</Text>
              </Text>
            </View>
            <TouchableOpacity
              style={[s.iconButton, s.nameAudio, playing("name") && s.playing]}
              onPress={() => play(guide.name, "name")}
              accessibilityRole="button"
              accessibilityLabel={`${playing("name") ? copy.stop : copy.listen}: ${copy.nameLabel} ${guide.letter}`}
            >
              <Ionicons
                name={playing("name") ? "stop-circle" : "volume-high"}
                size={24}
                color={theme.primary}
              />
            </TouchableOpacity>
          </View>
          <Text style={s.nameVsSound}>{copy.nameVsSound}</Text>
          <View style={s.tabs} accessibilityRole="tablist">
            {(["rules", "practice"] as const).map((value) => (
              <TouchableOpacity
                key={value}
                style={[s.tab, tab === value && s.tabSelected]}
                onPress={() => selectTab(value)}
                accessibilityRole="tab"
                accessibilityState={{ selected: tab === value }}
              >
                <Text style={[s.tabText, tab === value && s.tabTextSelected]}>
                  {value === "rules" ? copy.rulesTab : copy.practiceTab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {(audioFailed || soundOff) && (
            <Text
              accessibilityRole={audioFailed ? "alert" : undefined}
              style={s.audioNotice}
            >
              {audioFailed ? copy.audioError : copy.mutedHint}
            </Text>
          )}
          <ScrollView
            ref={scroll}
            style={s.scroll}
            contentContainerStyle={s.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {tab === "rules" ? (
              <>
                {guide.contrast && (
                  <View style={s.contrast}>
                    <View style={s.sectionHeading}>
                      <Ionicons
                        name="swap-horizontal"
                        size={20}
                        color={theme.primary}
                      />
                      <Text style={s.sectionTitle}>
                        {phonicsText(guide.contrast.title, locale)}
                      </Text>
                    </View>
                    <Text style={s.body}>
                      {phonicsText(guide.contrast.explanation, locale)}
                    </Text>
                    <View style={s.exampleRow}>
                      {guide.contrast.examples.map((example, index) =>
                        exampleCard(example, `contrast:${index}`),
                      )}
                    </View>
                  </View>
                )}
                <Text style={s.sectionTitle}>
                  {copy.rulesTab}{" "}
                  <Text style={s.ipa}>
                    {copy.patternCount.replace(
                      "{{count}}",
                      String(guide.rules.length),
                    )}
                  </Text>
                </Text>
                {guide.rules.map((rule, index) => {
                  const expanded = openRule === rule.id;
                  return (
                    <View
                      key={rule.id}
                      style={[s.rule, expanded && s.ruleExpanded]}
                    >
                      <TouchableOpacity
                        style={s.ruleHeader}
                        onPress={() => setOpenRule(expanded ? null : rule.id)}
                        accessibilityRole="button"
                        accessibilityState={{ expanded }}
                        accessibilityLabel={`${rule.pattern}: ${phonicsText(rule.title, locale)} ${rule.sound}`}
                      >
                        <View style={s.ruleNumber}>
                          <Text style={s.ruleNumberText}>{index + 1}</Text>
                        </View>
                        <View style={s.ruleHeading}>
                          <Text style={s.ruleTitle}>
                            {phonicsText(rule.title, locale)}
                          </Text>
                          <Text style={s.pattern}>
                            {rule.pattern}{" "}
                            <Text style={s.ipa}>→ {rule.sound}</Text>
                          </Text>
                        </View>
                        <Ionicons
                          name={expanded ? "chevron-up" : "chevron-down"}
                          size={18}
                          color={theme.textSecondary}
                        />
                      </TouchableOpacity>
                      {expanded && (
                        <View style={s.ruleBody}>
                          <Text style={s.label}>{copy.whenLabel}</Text>
                          <Text style={s.body}>
                            {phonicsText(rule.explanation, locale)}
                          </Text>
                          <View style={s.exampleRow}>
                            {rule.examples.map((example, exampleIndex) =>
                              exampleCard(
                                example,
                                `${rule.id}:${exampleIndex}`,
                              ),
                            )}
                          </View>
                          {rule.caution && (
                            <View style={s.caution}>
                              <Text style={s.cautionTitle}>
                                {copy.exceptionsLabel}
                              </Text>
                              <Text style={s.cautionText}>
                                {phonicsText(rule.caution, locale)}
                              </Text>
                            </View>
                          )}
                        </View>
                      )}
                    </View>
                  );
                })}
                <View style={s.tip}>
                  <Ionicons
                    name="bulb-outline"
                    size={21}
                    color={theme.primary}
                  />
                  <Text style={[s.body, s.tipText]}>
                    {phonicsText(guide.tip, locale)}
                  </Text>
                </View>
                <TouchableOpacity
                  style={s.primaryButton}
                  onPress={() => selectTab("practice")}
                  accessibilityRole="button"
                >
                  <Text style={s.primaryText}>{copy.practiceTitle}</Text>
                  <Ionicons name="arrow-forward" size={18} color="#fff" />
                </TouchableOpacity>
              </>
            ) : (
              <View style={s.practice}>
                <Text style={s.sectionTitle}>{copy.practiceTitle}</Text>
                <Text style={s.body}>{copy.practiceIntro}</Text>
                <Text style={s.question}>
                  {phonicsText(guide.check.prompt, locale)}
                </Text>
                {guide.check.options.map((option, index) => {
                  const selected = answer === index;
                  const correct =
                    answer !== null && guide.check.correctIndex === index;
                  return (
                    <View key={option.word} style={s.practiceOption}>
                      <TouchableOpacity
                        style={[
                          s.answer,
                          selected && s.answerSelected,
                          correct && s.answerCorrect,
                        ]}
                        disabled={answer !== null}
                        onPress={() => setAnswer(index as 0 | 1)}
                        accessibilityRole="button"
                        accessibilityState={{
                          disabled: answer !== null,
                          selected,
                        }}
                        accessibilityLabel={`${option.word}, ${phonicsText(option.meaning, locale)}`}
                      >
                        <Text style={s.answerLetter}>
                          {String.fromCharCode(65 + index)}
                        </Text>
                        <View style={s.wordInfo}>
                          {wordText(option)}
                          <Text style={s.meaning}>
                            {phonicsText(option.meaning, locale)}
                          </Text>
                        </View>
                        {correct && (
                          <Ionicons
                            name="checkmark-circle"
                            size={24}
                            color="#16836C"
                          />
                        )}
                        {selected && !correct && (
                          <Ionicons
                            name="close-circle"
                            size={24}
                            color="#CE6841"
                          />
                        )}
                      </TouchableOpacity>
                      <View style={s.practiceAudio}>
                        <TouchableOpacity
                          style={[
                            s.practiceAudioButton,
                            playing(`prompt:${index}`) && s.playing,
                          ]}
                          onPress={() => play(option.word, `prompt:${index}`)}
                          accessibilityRole="button"
                          accessibilityLabel={`${copy.listen}: ${option.word}`}
                        >
                          <Ionicons
                            name={
                              playing(`prompt:${index}`)
                                ? "stop-circle"
                                : "volume-high-outline"
                            }
                            size={17}
                            color={theme.primary}
                          />
                          <Text style={s.slowText}>{copy.listen}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            s.practiceAudioButton,
                            playing(`prompt:${index}:slow`) && s.playing,
                          ]}
                          onPress={() =>
                            play(option.word, `prompt:${index}:slow`, true)
                          }
                          accessibilityRole="button"
                          accessibilityLabel={`${copy.slow}: ${option.word}`}
                        >
                          <Ionicons
                            name={
                              playing(`prompt:${index}:slow`)
                                ? "stop"
                                : "speedometer-outline"
                            }
                            size={17}
                            color={theme.primary}
                          />
                          <Text style={s.slowText}>{copy.slow}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
                {answer !== null && (
                  <View style={s.feedback} accessibilityLiveRegion="polite">
                    <Text style={s.feedbackTitle}>
                      {answer === guide.check.correctIndex
                        ? copy.correct
                        : copy.tryAgain}
                    </Text>
                    <Text style={s.body}>
                      {phonicsText(guide.check.explanation, locale)}
                    </Text>
                    <View style={s.exampleRow}>
                      {guide.check.options.map((example, index) =>
                        exampleCard(example, `check:${index}`),
                      )}
                    </View>
                    <TouchableOpacity
                      style={s.retryButton}
                      onPress={() => setAnswer(null)}
                      accessibilityRole="button"
                    >
                      <Ionicons
                        name="refresh"
                        size={17}
                        color={theme.primary}
                      />
                      <Text style={s.slowText}>{copy.resetPractice}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
            <View style={s.footnotes}>
              <Text style={s.footnote}>{copy.ipaHint}</Text>
              <Text style={s.footnote}>{copy.disclaimer}</Text>
            </View>
          </ScrollView>
          <View style={s.footer}>
            <TouchableOpacity
              style={[s.navButton, letterIndex === 0 && s.disabled]}
              disabled={letterIndex === 0}
              onPress={() => navigate(-1)}
              accessibilityRole="button"
              accessibilityLabel={`${copy.previousLetter}: ${ENGLISH_PHONICS[letterIndex - 1]?.letter ?? ""}`}
              accessibilityState={{ disabled: letterIndex === 0 }}
            >
              <Ionicons name="chevron-back" size={19} color={theme.text} />
              <Text style={s.navText}>
                {ENGLISH_PHONICS[letterIndex - 1]?.letter ?? "—"}
              </Text>
            </TouchableOpacity>
            <Text style={s.position}>
              {copy.letterPosition
                .replace("{{current}}", String(letterIndex + 1))
                .replace("{{total}}", String(ENGLISH_PHONICS.length))}
            </Text>
            <TouchableOpacity
              style={[
                s.navButton,
                letterIndex === ENGLISH_PHONICS.length - 1 && s.disabled,
              ]}
              disabled={letterIndex === ENGLISH_PHONICS.length - 1}
              onPress={() => navigate(1)}
              accessibilityRole="button"
              accessibilityLabel={`${copy.nextLetter}: ${ENGLISH_PHONICS[letterIndex + 1]?.letter ?? ""}`}
              accessibilityState={{
                disabled: letterIndex === ENGLISH_PHONICS.length - 1,
              }}
            >
              <Text style={s.navText}>
                {ENGLISH_PHONICS[letterIndex + 1]?.letter ?? "—"}
              </Text>
              <Ionicons name="chevron-forward" size={19} color={theme.text} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </GestureHandlerRootView>
    </Modal>
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    root: { flex: 1, justifyContent: "flex-end" },
    backdrop: {
      ...StyleSheet.absoluteFill,
      backgroundColor: "rgba(12,14,30,0.5)",
    },
    sheet: {
      maxHeight: "94%",
      backgroundColor: theme.bg,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      paddingHorizontal: 20,
    },
    handleZone: { alignItems: "center", paddingTop: 10, paddingBottom: 6 },
    handle: {
      width: 44,
      height: 5,
      borderRadius: 3,
      backgroundColor: theme.border,
    },
    topRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
    },
    kicker: {
      flex: 1,
      fontSize: 12,
      fontWeight: "800",
      color: theme.textSecondary,
    },
    iconButton: {
      minWidth: 44,
      minHeight: 44,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 14,
    },
    hero: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      paddingBottom: 12,
    },
    glyph: {
      minWidth: 82,
      height: 82,
      paddingHorizontal: 8,
      backgroundColor: "#776EE2",
      borderRadius: 25,
      alignItems: "center",
      justifyContent: "center",
    },
    letter: { fontSize: 40, fontWeight: "900", color: "#fff" },
    nameInfo: { flex: 1, gap: 5 },
    nameLabel: { fontSize: 12, color: theme.textSecondary, fontWeight: "600" },
    name: { fontSize: 22, color: theme.text, fontWeight: "900" },
    nameIpa: { fontSize: 15, color: theme.primary, fontWeight: "500" },
    nameAudio: {
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
    },
    nameVsSound: {
      fontSize: 12,
      lineHeight: 18,
      color: theme.textSecondary,
      marginBottom: 12,
    },
    tabs: {
      flexDirection: "row",
      padding: 4,
      borderRadius: 14,
      backgroundColor: theme.surface,
      marginBottom: 8,
    },
    tab: {
      flex: 1,
      minHeight: 44,
      borderRadius: 11,
      alignItems: "center",
      justifyContent: "center",
      padding: 8,
    },
    tabSelected: { backgroundColor: theme.primary + "18" },
    tabText: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.textSecondary,
      textAlign: "center",
    },
    tabTextSelected: { color: theme.primary },
    scroll: { flexShrink: 1 },
    scrollContent: { gap: 12, paddingTop: 8, paddingBottom: 12 },
    audioNotice: {
      fontSize: 12,
      lineHeight: 18,
      color: theme.textSecondary,
      paddingBottom: 8,
    },
    contrast: {
      backgroundColor: theme.primary + "0C",
      borderWidth: 1,
      borderColor: theme.primary + "28",
      padding: 14,
      borderRadius: 20,
      gap: 10,
    },
    sectionHeading: { flexDirection: "row", alignItems: "center", gap: 7 },
    sectionTitle: {
      flexShrink: 1,
      fontSize: 16,
      lineHeight: 23,
      fontWeight: "800",
      color: theme.text,
    },
    body: { fontSize: 13, lineHeight: 21, color: theme.textSecondary },
    exampleRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    example: {
      flexGrow: 1,
      flexBasis: 125,
      minWidth: 0,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 14,
      backgroundColor: theme.surface,
      overflow: "hidden",
    },
    wordButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      padding: 12,
      minHeight: 80,
    },
    wordInfo: { flex: 1, gap: 4 },
    word: {
      fontSize: 21,
      lineHeight: 29,
      fontWeight: "700",
      color: theme.text,
    },
    focus: {
      color: theme.primary,
      fontWeight: "900",
      backgroundColor: theme.primary + "16",
    },
    ipa: { fontSize: 12, color: theme.textSecondary, fontWeight: "500" },
    meaning: { fontSize: 12, lineHeight: 17, color: theme.textSecondary },
    slowButton: {
      minHeight: 44,
      borderTopWidth: 1,
      borderColor: theme.border,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      padding: 8,
    },
    slowText: { fontSize: 12, color: theme.primary, fontWeight: "700" },
    playing: { backgroundColor: theme.primary + "16" },
    rule: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 18,
      backgroundColor: theme.surface,
      overflow: "hidden",
    },
    ruleExpanded: { borderColor: theme.primary + "66" },
    ruleHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      padding: 14,
      minHeight: 72,
    },
    ruleNumber: {
      height: 27,
      width: 27,
      borderRadius: 9,
      backgroundColor: theme.primary + "12",
      alignItems: "center",
      justifyContent: "center",
    },
    ruleNumberText: { fontSize: 12, fontWeight: "800", color: theme.primary },
    ruleHeading: { flex: 1, gap: 4 },
    ruleTitle: {
      fontSize: 14,
      lineHeight: 21,
      color: theme.text,
      fontWeight: "700",
    },
    pattern: { fontSize: 13, fontWeight: "700", color: theme.primary },
    ruleBody: { paddingHorizontal: 14, paddingBottom: 14, gap: 10 },
    label: { fontSize: 11, color: theme.primary, fontWeight: "800" },
    caution: {
      backgroundColor: theme.bg,
      borderLeftWidth: 3,
      borderLeftColor: "#DB9A32",
      borderRadius: 8,
      padding: 10,
      gap: 4,
    },
    cautionTitle: { color: theme.text, fontSize: 11, fontWeight: "800" },
    cautionText: { color: theme.textSecondary, fontSize: 12, lineHeight: 19 },
    tip: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 8,
      padding: 12,
    },
    tipText: { flex: 1 },
    primaryButton: {
      minHeight: 48,
      borderRadius: 14,
      backgroundColor: theme.primary,
      padding: 13,
      flexDirection: "row",
      gap: 8,
      alignItems: "center",
      justifyContent: "center",
    },
    primaryText: {
      fontSize: 14,
      fontWeight: "800",
      color: "#fff",
      flexShrink: 1,
    },
    practice: { gap: 12 },
    practiceOption: { gap: 4 },
    practiceAudio: { flexDirection: "row", gap: 8 },
    practiceAudioButton: {
      flex: 1,
      minHeight: 44,
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      backgroundColor: theme.surface,
    },
    question: {
      fontSize: 19,
      fontWeight: "800",
      lineHeight: 29,
      color: theme.text,
      marginVertical: 10,
    },
    answer: {
      flexDirection: "row",
      gap: 12,
      alignItems: "center",
      padding: 16,
      borderRadius: 16,
      borderWidth: 1.5,
      borderColor: theme.border,
      backgroundColor: theme.surface,
      minHeight: 80,
    },
    answerSelected: { borderColor: "#CE6841" },
    answerCorrect: { borderColor: "#16836C", backgroundColor: "#16836C12" },
    answerLetter: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.textSecondary,
    },
    feedback: {
      padding: 14,
      borderRadius: 18,
      backgroundColor: theme.primary + "0C",
      gap: 12,
    },
    feedbackTitle: { fontSize: 16, fontWeight: "800", color: theme.text },
    retryButton: {
      minHeight: 44,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 7,
    },
    footnotes: { gap: 6, paddingTop: 10 },
    footnote: { fontSize: 11, lineHeight: 17, color: theme.textSecondary },
    footer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderTopWidth: 1,
      borderTopColor: theme.border,
      paddingTop: 8,
      gap: 10,
    },
    navButton: {
      flexDirection: "row",
      gap: 8,
      alignItems: "center",
      justifyContent: "center",
      minWidth: 64,
      minHeight: 44,
      borderRadius: 12,
      backgroundColor: theme.surface,
    },
    navText: { fontSize: 16, fontWeight: "800", color: theme.text },
    position: { fontSize: 12, color: theme.textSecondary },
    disabled: { opacity: 0.3 },
  });
