import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";
import { useVoiceTutor, type VoiceTutorPhase } from "../hooks/useVoiceTutor";
import type { MascotState } from "../components/TutorMascot";
import { VoiceTutorCallScreen } from "./VoiceTutorCallScreen";
import { VoiceTutorSetupScreen } from "./VoiceTutorSetupScreen";
import { VoiceTutorResultScreen } from "./VoiceTutorResultScreen";
import type {
  VoiceTutorSettings,
  VoiceTutorTopicCard,
} from "../services/voice-tutor.api";

const CALL_STATE: Record<VoiceTutorPhase, MascotState> = {
  setup: "idle",
  starting: "connecting",
  connecting: "connecting",
  ready: "listening",
  recording: "listening",
  thinking: "thinking",
  speaking: "speaking",
  ending: "idle",
  finished: "idle",
};

/**
 * 새 Voice Tutor — 설정 → 통화 → 정리.
 *
 * 설정·통화 화면은 옛 튜터 화면을 복사해 온 것이다 (VoiceTutorSetupScreen /
 * VoiceTutorCallScreen 머리 주석 참고). 옛 튜터 파일은 건드리지 않는다.
 */
export default function VoiceTutorScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = useMemo(() => styles(theme), [theme]);
  const tutor = useVoiceTutor();
  const endSession = tutor.end;
  /** 이번 수업 주제. 통화 화면 진도 카드용 */
  const [topic, setTopic] = useState<VoiceTutorTopicCard | null>(null);

  useFocusEffect(useCallback(() => {
    return () => { void endSession(false); };
  }, [endSession]));

  const update = (key: keyof VoiceTutorSettings, value: string) => {
    tutor.setSettings((current) => current ? { ...current, [key]: value } : current);
  };

  const inCall = ["connecting", "ready", "recording", "thinking", "speaking"].includes(tutor.phase);

  const close = () => {
    if (inCall || tutor.phase === "ending") void tutor.end(false);
    router.back();
  };

  // 지금 자막: 말하는 중이면 실시간 글자, 아니면 마지막 선생님 말
  const teacherMessages = tutor.messages.filter((m) => m.role === "teacher");
  const lastTeacher = teacherMessages.at(-1);
  const prevTeacher = teacherMessages.at(-2);
  const lastUser = [...tutor.messages].reverse().find((m) => m.role === "user");
  const caption = tutor.liveTeacherText || lastTeacher?.displayText?.trim() || lastTeacher?.text || "";
  const captionPrev = tutor.liveTeacherText
    ? (lastTeacher?.displayText?.trim() || lastTeacher?.text || "")
    : (prevTeacher?.displayText?.trim() || prevTeacher?.text || "");
  const userSaid = tutor.liveUserText || (lastUser?.text.startsWith("[[button") ? "" : lastUser?.text) || "";
  const voices = tutor.options?.voices.filter((v) => v.enabled !== false) ?? [];
  const voice = voices.find((v) => v.id === tutor.settings?.voiceId);

  if (tutor.loading) {
    return <View style={[s.root, s.center]}><ActivityIndicator color={theme.primary} /></View>;
  }

  if (!tutor.options || !tutor.settings) {
    return (
      <View style={[s.root, s.center, { paddingTop: insets.top }]}>
        <Text style={s.error}>{t("voiceTutor.error.load")}</Text>
        <Pressable style={s.primaryButton} onPress={() => void tutor.load()}>
          <Text style={s.primaryText}>{t("voiceTutor.retry")}</Text>
        </Pressable>
      </View>
    );
  }

  if (tutor.phase === "setup" || tutor.phase === "starting") {
    return (
      <VoiceTutorSetupScreen
        options={tutor.options}
        settings={tutor.settings}
        onChange={update}
        previewVoiceId={tutor.previewVoiceId}
        onPreview={(v) => void tutor.previewVoice(v)}
        busy={tutor.phase === "starting"}
        error={tutor.error ? errorText(tutor.error, t) : null}
        quota={tutor.quota}
        onUpsell={() => router.push("/premium")}
        onClose={close}
        onStart={(picked) => {
          setTopic(picked);
          void tutor.start(picked?.id ?? null);
        }}
      />
    );
  }

  if (tutor.phase === "finished") {
    return (
      <VoiceTutorResultScreen
        plan={tutor.plan}
        progress={tutor.progress}
        messages={tutor.messages}
        elapsedSec={tutor.elapsedSec}
        topicTitle={topic?.title}
        onAgain={() => { setTopic(null); tutor.restart(); }}
        onClose={() => router.back()}
      />
    );
  }

  return (
    <VoiceTutorCallScreen
      state={tutor.error && tutor.phase === "ending" ? "error" : CALL_STATE[tutor.phase]}
      emotion={tutor.phase === "speaking" ? lastTeacher?.emotion : undefined}
      caption={caption}
      captionPrev={captionPrev === caption ? "" : captionPrev}
      userSaid={userSaid}
      focusHint={lastTeacher?.correction?.correct ?? ""}
      targets={topic ? (tutor.plan?.targetVocabulary ?? []) : []}
      teacherName={voice?.name}
      teacherPersonality={t(`voiceTutor.personality.${tutor.settings.personality}.name`)}
      teacherColor="#776ee2"
      topicTitle={topic?.title}
      elapsedSec={tutor.elapsedSec}
      limitSec={tutor.limitSec}
      active={inCall || (tutor.phase === "ending" && !!tutor.error)}
      analyzing={tutor.phase === "ending" && !tutor.error}
      micOn={tutor.micOn}
      error={tutor.error ? errorText(tutor.error, t) : null}
      toggleMic={tutor.toggleMic}
      withMicMuted={tutor.withMicMuted}
      onSlower={() => void tutor.request("slower")}
      onReplay={() => { if (lastTeacher) void tutor.playMessage(lastTeacher); }}
      onExplain={() => void tutor.request("explain")}
      canReplay={!!lastTeacher && tutor.phase !== "connecting"}
      onEnd={() => void tutor.end()}
      onClose={close}
    />
  );
}

function errorText(code: string, t: ReturnType<typeof useTranslation>["t"]): string {
  const known = new Set(["VOICE_TUTOR_TRIAL_USED", "VOICE_TUTOR_DAILY_LIMIT_REACHED", "VOICE_TUTOR_MONTHLY_LIMIT_REACHED", "MIC_PERMISSION_DENIED", "NETWORK_ERROR", "UNAUTHORIZED", "AUDIO_PLAYBACK_FAILED", "INVALID_AUDIO_URL", "VOICE_TUTOR_TTS_UNAVAILABLE", "VOICE_TUTOR_LESSON_UNAVAILABLE", "VOICE_TUTOR_AGENT_UNAVAILABLE", "CONNECTION_LOST", "CONNECTION_ERROR"]);
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
