import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";
import { useVoiceTutor } from "../hooks/useVoiceTutor";
import { TutorCharacter, preloadTutorCharacter } from "../character/TutorCharacter";
import { useVoiceTutorCharacter } from "../character/use-character-controller";
import type {
  VoiceTutorMessage,
  VoiceTutorPlan,
  VoiceTutorPersonality,
  VoiceTutorProgress,
  VoiceTutorSettings,
} from "../services/voice-tutor.api";

const LANGUAGE_NAMES: Record<string, string> = {
  uz: "O‘zbekcha",
  ru: "Русский",
  en: "English",
  ko: "한국어",
};

const PERSONALITIES: VoiceTutorPersonality[] = [
  "friendly",
  "close_friend",
  "savage",
  "chaotic_savage",
];

export default function VoiceTutorScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = useMemo(() => styles(theme), [theme]);
  const scrollRef = useRef<ScrollView>(null);
  const tutor = useVoiceTutor();
  const endSession = tutor.end;
  const active = !["setup", "starting", "finished"].includes(tutor.phase);
  const canToggleMic = !["connecting", "ending"].includes(tutor.phase);
  const voiceAvailable = tutor.options?.voices.some((voice) => voice.enabled !== false) ?? false;
  const spokenMessage = tutor.spokenMessage;
  const characterId = tutor.settings?.characterId ?? "female_01";
  const characterFrame = useVoiceTutorCharacter({
    phase: tutor.phase,
    isAudioPlaying: tutor.isPlaying,
    audioAmplitude: tutor.audioAmplitude,
    reactionKey: spokenMessage?.id,
    gesture: spokenMessage?.gesture,
    reactionIntensity: spokenMessage?.intensity,
    personality: tutor.settings?.personality,
  });

  useEffect(() => { void preloadTutorCharacter(characterId); }, [characterId]);

  useFocusEffect(useCallback(() => {
    return () => { void endSession(false); };
  }, [endSession]));

  const update = (key: keyof VoiceTutorSettings, value: string) => {
    tutor.setSettings((current) => current ? { ...current, [key]: value } : current);
  };

  const close = () => {
    if (active) void tutor.end(false);
    router.back();
  };

  const canReplay = !["connecting", "ending"].includes(tutor.phase);

  return (
    <View style={[s.root, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={s.header}>
        <Pressable accessibilityRole="button" accessibilityLabel={t("voiceTutor.close")} onPress={close} style={s.iconButton}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </Pressable>
        <View style={s.headerText}>
          <Text style={s.headerTitle}>{t("voiceTutor.title")}</Text>
          <Text style={s.headerSubtitle}>{t("voiceTutor.subtitle")}</Text>
        </View>
        {active ? (
          <Pressable accessibilityRole="button" disabled={tutor.phase === "ending" && !tutor.error} onPress={() => void tutor.end()} style={[s.endButton, tutor.phase === "ending" && !tutor.error && s.disabled]}>
            <Text style={s.endText}>{t("voiceTutor.end")}</Text>
          </Pressable>
        ) : <View style={s.endSpace} />}
      </View>

      {tutor.loading ? (
        <View style={s.center}><ActivityIndicator color={theme.primary} /></View>
      ) : !tutor.options || !tutor.settings ? (
        <View style={s.center}>
          <Text style={s.error}>{t("voiceTutor.error.load")}</Text>
          <Pressable style={s.primaryButton} onPress={() => void tutor.load()}>
            <Text style={s.primaryText}>{t("voiceTutor.retry")}</Text>
          </Pressable>
        </View>
      ) : tutor.phase === "finished" ? (
        <ScrollView contentContainerStyle={s.setupContent}>
          <View style={s.hero}>
            <View style={s.character}><Text style={s.characterText}>✓</Text></View>
            <Text style={s.heroTitle}>{t("voiceTutor.finishedTitle")}</Text>
            <Text style={s.heroHint}>{t("voiceTutor.finishedHint")}</Text>
          </View>
          <SessionSummary plan={tutor.plan} progress={tutor.progress} s={s} />
          <Pressable style={s.primaryButton} onPress={tutor.restart}>
            <Text style={s.primaryText}>{t("voiceTutor.again")}</Text>
          </Pressable>
          <Pressable style={s.secondaryButton} onPress={() => router.back()}>
            <Text style={s.secondaryText}>{t("voiceTutor.close")}</Text>
          </Pressable>
        </ScrollView>
      ) : tutor.phase === "setup" || tutor.phase === "starting" ? (
        <ScrollView contentContainerStyle={s.setupContent}>
          <View style={s.hero}>
            <TutorCharacter characterId={characterId} frame={characterFrame} size={96} />
            <Text style={s.heroTitle}>{t("voiceTutor.setupTitle")}</Text>
            <Text style={s.heroHint}>{t("voiceTutor.setupHint")}</Text>
          </View>

          <Text style={s.sectionTitle}>{t("voiceTutor.characterTitle")}</Text>
          <View style={s.choiceList}>
            {(tutor.options.characters?.length ? tutor.options.characters : [
              { id: "female_01" as const, name: "Female Tutor", enabled: true },
              { id: "male_01" as const, name: "Male Tutor", enabled: true },
            ]).filter((character) => character.enabled !== false).map((character) => (
              <Choice
                key={character.id}
                title={t(`voiceTutor.character.${character.id}`, { defaultValue: character.name })}
                selected={characterId === character.id}
                onPress={() => update("characterId", character.id)}
                s={s}
              />
            ))}
          </View>

          <Text style={s.sectionTitle}>{t("voiceTutor.voice")}</Text>
          <View style={s.choiceList}>
            {tutor.options.voices.filter((voice) => voice.enabled !== false).map((voice) => (
              <View key={voice.id} style={s.voiceRow}>
                <View style={s.voiceChoice}>
                  <Choice
                    title={voice.name}
                    subtitle={voice.description}
                    selected={tutor.settings?.voiceId === voice.id}
                    onPress={() => update("voiceId", voice.id)}
                    s={s}
                  />
                </View>
                {voice.previewUrl && (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={t("voiceTutor.preview")}
                    onPress={() => void tutor.previewVoice(voice)}
                    style={s.previewButton}
                  >
                    <Ionicons name={tutor.previewVoiceId === voice.id ? "stop" : "play"} size={20} color={theme.primary} />
                  </Pressable>
                )}
              </View>
            ))}
          </View>

          <Text style={s.sectionTitle}>{t("voiceTutor.explanationLanguage")}</Text>
          <View style={s.choiceRow}>
            {tutor.options.explanationLanguages.filter((language) => language.enabled !== false).map((language) => (
              <Chip key={language.id} label={language.name || LANGUAGE_NAMES[language.id] || language.id} selected={tutor.settings?.explanationLanguage === language.id} onPress={() => update("explanationLanguage", language.id)} s={s} />
            ))}
          </View>

          <Text style={s.sectionTitle}>{t("voiceTutor.speechStyle")}</Text>
          <View style={s.choiceRow}>
            {tutor.options.speechStyles.map((style) => (
              <Chip key={style} label={t(`voiceTutor.style.${style}`, { defaultValue: style })} selected={tutor.settings?.speechStyle === style} onPress={() => update("speechStyle", style)} s={s} />
            ))}
          </View>

          <Text style={s.sectionTitle}>{t("voiceTutor.personalityTitle")}</Text>
          <Text style={s.sectionHint}>{t("voiceTutor.personalityHint")}</Text>
          <View style={s.choiceList}>
            {(tutor.options.personalities?.length ? tutor.options.personalities : PERSONALITIES).map((personality) => (
              <Choice
                key={personality}
                title={t(`voiceTutor.personality.${personality}.name`)}
                subtitle={t(`voiceTutor.personality.${personality}.description`)}
                selected={tutor.settings?.personality === personality}
                onPress={() => update("personality", personality)}
                s={s}
              />
            ))}
          </View>

          <Text style={s.sectionTitle}>{t("voiceTutor.koreanLevel")}</Text>
          <View style={s.choiceRow}>
            {(tutor.options.koreanLevels ?? ["beginner", "intermediate", "advanced"]).map((level) => (
              <Chip key={level} label={t(`voiceTutor.level.${level}`, { defaultValue: level })} selected={tutor.settings?.koreanLevel === level} onPress={() => update("koreanLevel", level)} s={s} />
            ))}
          </View>

          {tutor.progress !== null && <Text style={s.savedHint}>{t("voiceTutor.lastSessionSaved")}</Text>}
          {!voiceAvailable && <Text style={s.error}>{t("voiceTutor.voiceUnavailable")}</Text>}
          {tutor.error && <Text style={s.error}>{errorText(tutor.error, t)}</Text>}
          <Pressable disabled={tutor.phase === "starting" || !voiceAvailable} style={[s.primaryButton, (tutor.phase === "starting" || !voiceAvailable) && s.disabled]} onPress={() => void tutor.start()}>
            {tutor.phase === "starting" ? <ActivityIndicator color="#fff" /> : <Text style={s.primaryText}>{t("voiceTutor.start")}</Text>}
          </Pressable>
        </ScrollView>
      ) : (
        <>
          <View style={s.callHero}>
            <TutorCharacter characterId={characterId} frame={characterFrame} size={100} />
            <Text style={s.phaseText}>{t(`voiceTutor.phase.${tutor.phase}`)}</Text>
          </View>
          <ScrollView
            ref={scrollRef}
            style={s.conversation}
            contentContainerStyle={s.conversationContent}
            onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
          >
            {tutor.messages.map((message) => (
              <MessageBubble key={message.id} message={message} canReplay={canReplay} onReplay={() => void tutor.playMessage(message)} s={s} />
            ))}
            {!!tutor.liveUserText && <View style={[s.message, s.userMessage]}><Text style={s.messageRole}>{t("voiceTutor.you")}</Text><Text style={s.messageText}>{tutor.liveUserText}</Text></View>}
            {!!tutor.liveTeacherText && <View style={[s.message, s.teacherMessage]}><Text style={s.messageRole}>{t("voiceTutor.teacher")}</Text><Text style={s.messageText}>{tutor.liveTeacherText}</Text></View>}
            {(tutor.phase === "connecting" || tutor.phase === "thinking") && (
              <View style={s.waiting}><ActivityIndicator size="small" color={theme.primary} /><Text style={s.waitingText}>{t(`voiceTutor.phase.${tutor.phase}`)}</Text></View>
            )}
          </ScrollView>
          {tutor.error && <Text style={s.inlineError}>{errorText(tutor.error, t)}</Text>}
          <View style={s.controls}>
            {tutor.phase === "speaking" && (
              <Pressable accessibilityRole="button" onPress={() => void tutor.interrupt()} style={s.secondaryButton}>
                <Ionicons name="stop" size={18} color={theme.text} />
                <Text style={s.secondaryText}>{t("voiceTutor.interrupt")}</Text>
              </Pressable>
            )}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={tutor.micOn ? t("voiceTutor.muteMic") : t("voiceTutor.unmuteMic")}
              disabled={!canToggleMic}
              onPress={tutor.toggleMic}
              style={[s.micButton, !tutor.micOn && s.micRecording, !canToggleMic && s.disabled]}
            >
              <Ionicons name={tutor.micOn ? "mic" : "mic-off"} size={28} color="#fff" />
              <Text style={s.micText}>{tutor.micOn ? t("voiceTutor.muteMic") : t("voiceTutor.unmuteMic")}</Text>
            </Pressable>
            <Text style={s.recordHint}>{t("voiceTutor.liveHint")}</Text>
          </View>
        </>
      )}
    </View>
  );
}

function Choice({ title, subtitle, selected, onPress, s }: {
  title: string; subtitle?: string; selected: boolean; onPress: () => void; s: ReturnType<typeof styles>;
}) {
  return <Pressable onPress={onPress} style={[s.choice, selected && s.choiceSelected]}>
    <View style={s.choiceText}><Text style={s.choiceTitle}>{title}</Text>{subtitle && <Text style={s.choiceSubtitle}>{subtitle}</Text>}</View>
    <Ionicons name={selected ? "radio-button-on" : "radio-button-off"} size={23} color={selected ? "#776ee2" : "#999"} />
  </Pressable>;
}

function Chip({ label, selected, onPress, s }: {
  label: string; selected: boolean; onPress: () => void; s: ReturnType<typeof styles>;
}) {
  return <Pressable onPress={onPress} style={[s.chip, selected && s.chipSelected]}><Text style={[s.chipText, selected && s.chipTextSelected]}>{label}</Text></Pressable>;
}

function MessageBubble({ message, canReplay, onReplay, s }: {
  message: VoiceTutorMessage; canReplay: boolean; onReplay: () => void; s: ReturnType<typeof styles>;
}) {
  const { t } = useTranslation();
  const teacher = message.role === "teacher";
  return <View style={[s.message, teacher ? s.teacherMessage : s.userMessage]}>
    <Text style={s.messageRole}>{teacher ? t("voiceTutor.teacher") : t("voiceTutor.you")}</Text>
    <Text style={s.messageText}>{message.displayText?.trim() || message.text}</Text>
    {message.correction?.correct && <Text style={s.correctionText}>{message.correction.wrong ? `${message.correction.wrong} → ` : ""}{message.correction.correct}</Text>}
    {teacher && <Pressable accessibilityRole="button" disabled={!canReplay} onPress={onReplay} style={[s.replayButton, !canReplay && s.disabled]}>
      <Ionicons name="volume-high" size={16} color="#776ee2" />
      <Text style={s.replayText}>{t("voiceTutor.replay")}</Text>
    </Pressable>}
  </View>;
}

function SessionSummary({ plan, progress, s }: {
  plan: VoiceTutorPlan | null;
  progress: VoiceTutorProgress | null;
  s: ReturnType<typeof styles>;
}) {
  const { t } = useTranslation();
  const sections: { title: string; lines: string[] }[] = [
    { title: t("voiceTutor.summary.goal"), lines: plan?.lessonGoal ? [plan.lessonGoal] : [] },
    { title: t("voiceTutor.summary.review"), lines: plan?.reviewTopics ?? [] },
    { title: t("voiceTutor.summary.next"), lines: plan?.newTopics ?? [] },
    { title: t("voiceTutor.summary.strong"), lines: progress?.strongPoints ?? [] },
    { title: t("voiceTutor.summary.weak"), lines: progress?.weakPoints ?? [] },
    { title: t("voiceTutor.summary.notes"), lines: progress?.notes ? [progress.notes] : [] },
  ];
  return <View style={s.summaryList}>
    {sections.filter((section) => section.lines.length > 0).map((section) => (
      <View key={section.title} style={s.summaryCard}>
        <Text style={s.sectionTitle}>{section.title}</Text>
        {section.lines.map((line, index) => <Text key={`${index}-${line}`} style={s.summaryLine}>• {line}</Text>)}
      </View>
    ))}
  </View>;
}

function errorText(code: string, t: ReturnType<typeof useTranslation>["t"]): string {
  const known = new Set(["MIC_PERMISSION_DENIED", "NETWORK_ERROR", "UNAUTHORIZED", "AUDIO_PLAYBACK_FAILED", "INVALID_AUDIO_URL", "VOICE_TUTOR_TTS_UNAVAILABLE", "VOICE_TUTOR_LESSON_UNAVAILABLE", "VOICE_TUTOR_AGENT_UNAVAILABLE", "CONNECTION_LOST", "CONNECTION_ERROR"]);
  return known.has(code) ? t(`voiceTutor.error.${code}`) : t("voiceTutor.error.generic");
}

function styles(theme: ThemeColors) {
  return StyleSheet.create({
    root: { flex: 1, backgroundColor: theme.bg },
    header: { minHeight: 62, paddingHorizontal: 16, flexDirection: "row", alignItems: "center", borderBottomWidth: 1, borderBottomColor: theme.border },
    iconButton: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
    headerText: { flex: 1, marginLeft: 8 },
    headerTitle: { fontSize: 18, fontWeight: "800", color: theme.text },
    headerSubtitle: { fontSize: 12, color: theme.textSecondary, marginTop: 2 },
    endButton: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 16, backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.border },
    endText: { color: theme.text, fontSize: 13, fontWeight: "700" },
    endSpace: { width: 48 },
    center: { flex: 1, justifyContent: "center", alignItems: "center", gap: 14, padding: 24 },
    setupContent: { paddingHorizontal: 22, paddingBottom: 34 },
    hero: { alignItems: "center", paddingVertical: 24 },
    character: { width: 108, height: 108, borderRadius: 54, backgroundColor: "#E9E6FF", alignItems: "center", justifyContent: "center" },
    characterText: { fontSize: 52, color: theme.primary },
    heroTitle: { fontSize: 23, fontWeight: "800", color: theme.text, marginTop: 17 },
    heroHint: { fontSize: 14, color: theme.textSecondary, marginTop: 7, textAlign: "center", lineHeight: 20 },
    sectionTitle: { fontSize: 15, fontWeight: "800", color: theme.text, marginTop: 24, marginBottom: 10 },
    sectionHint: { fontSize: 12, color: theme.textSecondary, lineHeight: 18, marginTop: -4, marginBottom: 12 },
    choiceList: { gap: 8 },
    voiceRow: { flexDirection: "row", alignItems: "stretch", gap: 8 },
    voiceChoice: { flex: 1 },
    previewButton: { width: 54, borderRadius: 16, borderWidth: 1, borderColor: theme.border, backgroundColor: theme.surface, alignItems: "center", justifyContent: "center" },
    choice: { minHeight: 60, paddingHorizontal: 15, paddingVertical: 10, borderRadius: 16, borderWidth: 1, borderColor: theme.border, backgroundColor: theme.surface, flexDirection: "row", alignItems: "center" },
    choiceSelected: { borderColor: theme.primary, borderWidth: 2 },
    choiceText: { flex: 1 },
    choiceTitle: { fontSize: 15, color: theme.text, fontWeight: "700" },
    choiceSubtitle: { color: theme.textSecondary, fontSize: 12, marginTop: 3 },
    choiceRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    chip: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 999, backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.border },
    chipSelected: { backgroundColor: theme.primary, borderColor: theme.primary },
    chipText: { fontSize: 13, color: theme.text, fontWeight: "700" },
    chipTextSelected: { color: "#fff" },
    savedHint: { marginTop: 18, color: theme.textSecondary, fontSize: 12 },
    primaryButton: { marginTop: 26, minHeight: 54, borderRadius: 18, backgroundColor: theme.primary, alignItems: "center", justifyContent: "center", paddingHorizontal: 20 },
    primaryText: { color: "#fff", fontSize: 16, fontWeight: "800" },
    disabled: { opacity: 0.5 },
    error: { color: "#D64C4C", fontSize: 13, textAlign: "center", marginTop: 16 },
    inlineError: { color: "#D64C4C", fontSize: 12, textAlign: "center", marginHorizontal: 18, marginBottom: 8 },
    callHero: { alignItems: "center", paddingVertical: 14, gap: 8 },
    callCharacter: { width: 90, height: 90, borderRadius: 45, backgroundColor: "#E9E6FF", alignItems: "center", justifyContent: "center" },
    callCharacterText: { fontSize: 42, color: theme.primary },
    phaseText: { fontSize: 13, color: theme.textSecondary, fontWeight: "700" },
    conversation: { flex: 1 },
    conversationContent: { padding: 18, gap: 12 },
    message: { maxWidth: "90%", paddingHorizontal: 16, paddingVertical: 12, borderRadius: 18 },
    teacherMessage: { alignSelf: "flex-start", backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.border },
    userMessage: { alignSelf: "flex-end", backgroundColor: "#E9E6FF" },
    messageRole: { fontSize: 11, fontWeight: "800", color: theme.primary, marginBottom: 5 },
    messageText: { fontSize: 15, lineHeight: 22, color: theme.text },
    correctionText: { fontSize: 13, fontWeight: "700", color: theme.primary, marginTop: 8 },
    replayButton: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 8, alignSelf: "flex-start" },
    replayText: { color: theme.primary, fontSize: 12, fontWeight: "700" },
    waiting: { flexDirection: "row", gap: 8, alignItems: "center", padding: 10 },
    waitingText: { color: theme.textSecondary, fontSize: 13 },
    controls: { alignItems: "center", paddingTop: 12, paddingBottom: 16, borderTopWidth: 1, borderTopColor: theme.border },
    secondaryButton: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 14, paddingVertical: 7, marginBottom: 10, borderRadius: 15, backgroundColor: theme.surface },
    secondaryText: { color: theme.text, fontSize: 12, fontWeight: "700" },
    micButton: { backgroundColor: theme.primary, minWidth: 130, height: 55, borderRadius: 28, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8 },
    micRecording: { backgroundColor: "#E05A65" },
    micText: { color: "#fff", fontSize: 15, fontWeight: "800" },
    recordHint: { color: theme.textSecondary, fontSize: 12, marginTop: 8 },
    summaryList: { gap: 12 },
    summaryCard: { paddingHorizontal: 18, paddingBottom: 16, borderRadius: 18, backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.border },
    summaryLine: { color: theme.text, fontSize: 14, lineHeight: 21, marginTop: 5 },
  });
}
