import { useCallback, useRef } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "@/components/ui/Pressables";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeColors } from "@/constants/theme";
import { TutorMascot, type MascotState } from "@/features/voice-tutor/components/TutorMascot";
import { VoiceTutorCallScreen } from "@/features/voice-tutor/screens/VoiceTutorCallScreen";
import { useGrokPromoAccess } from "./useGrokPromoAccess";
import { useGrokPromoTutor } from "./useGrokPromoTutor";

/** A separate screen and session: no ordinary tutor preferences or lesson credit. */
export default function GrokPromoTutorScreen() {
  const access = useGrokPromoAccess();
  // An account switch must discard all captions, mic state and call phase before
  // the new account's capability response can make this content visible.
  return <GrokPromoTutorContent key={access.userId ?? "guest"} access={access} />;
}

function GrokPromoTutorContent({ access }: { access: ReturnType<typeof useGrokPromoAccess> }) {
  const router = useRouter();
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = styles(theme);
  const tutor = useGrokPromoTutor(access.userId, !!access.options?.available);
  const navigating = useRef(false);
  const end = tutor.end;
  useFocusEffect(useCallback(() => () => { void end(); }, [end]));
  const close = async () => {
    if (navigating.current) return;
    navigating.current = true;
    await end();
    if (router.canGoBack()) router.back();
    else router.replace("/courses");
  };
  const errorText = tutor.error
    ? t(tutor.error === "MIC_PERMISSION_DENIED" ? "voiceTutor.error.MIC_PERMISSION_DENIED" : "grokPromoTutor.connectionError")
    : null;

  if (access.options && tutor.phase === "call") {
    const state: MascotState = tutor.agentState === "initializing" ? "connecting"
      : tutor.agentState === "idle" ? "listening" : tutor.agentState;
    return (
      <VoiceTutorCallScreen
        state={state}
        emotion={tutor.emotion}
        caption={tutor.caption}
        captionPrev={tutor.captionPrev}
        userSaid={tutor.userSaid}
        focusHint=""
        targets={[]}
        teacherName={t("grokPromoTutor.title")}
        teacherPersonality={t("grokPromoTutor.adminOnly")}
        teacherColor={theme.primary}
        elapsedSec={tutor.elapsedSec}
        limitSec={tutor.limitSec}
        active
        analyzing={false}
        micOn={tutor.micOn}
        error={errorText}
        toggleMic={tutor.toggleMic}
        withMicMuted={async (play) => { await play(); }}
        onSlower={() => void tutor.request("slower")}
        onReplay={() => undefined}
        canReplay={false}
        onExplain={() => void tutor.request("explain")}
        onEnd={() => void tutor.end()}
        onClose={close}
      />
    );
  }

  const busy = tutor.phase === "starting" || tutor.phase === "ending";
  const finished = tutor.phase === "finished";
  const ready = !!access.options?.available && !access.loading;
  return (
    <View style={[s.root, { paddingTop: insets.top }]}>
      <View style={s.header}>
        <Pressable onPress={close} style={s.back} accessibilityLabel={t("grokPromoTutor.close")}>
          <Ionicons name="chevron-back" size={28} color={theme.text} />
        </Pressable>
        <Text style={s.headerTitle}>{t("grokPromoTutor.title")}</Text>
      </View>
      <ScrollView contentContainerStyle={[s.content, { paddingBottom: insets.bottom + 24 }]}>
        <View style={s.hero}>
          <TutorMascot state={busy ? "connecting" : "idle"} size={160} />
          <Text style={s.title}>{t(finished ? "grokPromoTutor.finished" : "grokPromoTutor.title")}</Text>
          <Text style={s.description}>{t("grokPromoTutor.description")}</Text>
        </View>
        {access.loading ? (
          <View style={s.status}>
            <ActivityIndicator color={theme.primary} />
            <Text style={s.hint}>{t("grokPromoTutor.loading")}</Text>
          </View>
        ) : !access.options ? (
          <View style={s.status}>
            <Text style={s.hint}>{t(access.error === "forbidden" ? "grokPromoTutor.forbidden" : "grokPromoTutor.loadError")}</Text>
            {access.error !== "forbidden" && <PrimaryButton label={t("voiceTutor.retry")} onPress={access.retry} color={theme.primary} darkColor="#5B4DD4" />}
          </View>
        ) : (
          <>
            <View style={s.info}>
              <View style={s.infoRow}>
                <Ionicons name="shield-checkmark-outline" size={21} color={theme.primary} />
                <Text style={s.infoText}>{t("grokPromoTutor.adminOnly")}</Text>
              </View>
              <View style={s.infoRow}>
                <Ionicons name="mic-outline" size={21} color={theme.primary} />
                <Text style={s.infoText}>{t("grokPromoTutor.spontaneous")}</Text>
              </View>
              <View style={s.infoRow}>
                <Ionicons name="time-outline" size={21} color={theme.primary} />
                <Text style={s.infoText}>{t("grokPromoTutor.limit", { min: Math.floor(access.options.maxDurationSec / 60) })}</Text>
              </View>
            </View>
            {!ready && <Text style={s.hint}>{t("grokPromoTutor.notConfigured")}</Text>}
            {!!errorText && <Text accessibilityRole="alert" style={s.error}>{errorText}</Text>}
            {busy && <ActivityIndicator style={s.spinner} color={theme.primary} />}
            <PrimaryButton
              label={t(tutor.phase === "ending" ? "grokPromoTutor.stopping" : busy ? "grokPromoTutor.connecting" : finished ? "grokPromoTutor.again" : "grokPromoTutor.start")}
              onPress={() => void tutor.start()}
              disabled={!ready || busy}
              color={theme.primary}
              darkColor="#5B4DD4"
            />
            {tutor.phase === "starting" && <Pressable style={s.cancel} onPress={() => void tutor.end()}><Text style={s.cancelText}>{t("grokPromoTutor.cancel")}</Text></Pressable>}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = (theme: ThemeColors) => StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.bg },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 12, gap: 8 },
  back: { width: 44, height: 48, alignItems: "center", justifyContent: "center" },
  headerTitle: { flex: 1, color: theme.text, fontSize: 18, fontWeight: "800" },
  content: { paddingHorizontal: 24, gap: 24, flexGrow: 1 },
  hero: { alignItems: "center", paddingTop: 28, gap: 16 },
  title: { color: theme.text, fontSize: 24, fontWeight: "900", textAlign: "center" },
  description: { color: theme.textSecondary, fontSize: 15, fontWeight: "700", textAlign: "center", lineHeight: 23, maxWidth: 420 },
  status: { gap: 20, paddingVertical: 20 },
  info: { gap: 18, paddingVertical: 12 },
  infoRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  infoText: { flex: 1, color: theme.text, fontSize: 14, fontWeight: "700", lineHeight: 21 },
  hint: { color: theme.textSecondary, fontSize: 14, fontWeight: "700", textAlign: "center", lineHeight: 22 },
  error: { color: "#D33B3B", fontSize: 14, fontWeight: "700", textAlign: "center", lineHeight: 22 },
  spinner: { alignSelf: "center" },
  cancel: { minHeight: 48, alignItems: "center", justifyContent: "center" },
  cancelText: { color: theme.textSecondary, fontWeight: "800", fontSize: 15 },
});
