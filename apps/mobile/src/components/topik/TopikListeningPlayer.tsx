import { Ionicons } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useMemo, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import type { TopikAttemptMode, TopikAudio } from "@/types/topik";
import { useSettingsStore } from "@/store/settings.store";
import { type TopikPalette, useTopikTheme } from "./topikTheme";

interface TopikListeningPlayerProps {
  audio: TopikAudio;
  mode: TopikAttemptMode;
  showTranscript: boolean;
}

const waveform = [11, 20, 15, 29, 18, 35, 22, 30, 14, 25, 17, 32, 20, 27, 12];

export function TopikListeningPlayer({
  audio,
  mode,
  showTranscript,
}: TopikListeningPlayerProps) {
  const { t } = useTranslation();
  const palette = useTopikTheme();
  const styles = useMemo(() => getStyles(palette), [palette]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const runId = useRef(0);
  const playbackLimit =
    mode === "mock_exam" ? audio.mockPlaybackLimit : audio.guidedPlaybackLimit;
  const canPlay = playCount < playbackLimit;

  const stop = () => {
    runId.current += 1;
    void Speech.stop();
    setIsPlaying(false);
  };

  const play = async () => {
    if (!canPlay || isPlaying || audio.transcript.length === 0) return;
    const { muted, sound } = useSettingsStore.getState();
    if (muted || sound.speechVolume <= 0) return;

    await Speech.stop();
    const activeRun = runId.current + 1;
    runId.current = activeRun;
    setPlayCount((count) => count + 1);
    setIsPlaying(true);

    const speakLine = (index: number) => {
      if (runId.current !== activeRun) return;
      const line = audio.transcript[index];
      if (!line) {
        setIsPlaying(false);
        return;
      }

      const isFemale =
        line.speaker.includes("여자") || line.speaker.includes("여성");
      Speech.speak(line.text, {
        language: "ko-KR",
        rate: sound.speechRate,
        pitch: isFemale ? 1.08 : 0.94,
        volume: sound.speechVolume,
        onDone: () => speakLine(index + 1),
        onError: () => setIsPlaying(false),
        onStopped: () => setIsPlaying(false),
      });
    };

    speakLine(0);
  };

  useEffect(() => {
    return () => {
      runId.current += 1;
      void Speech.stop();
    };
  }, []);

  return (
    <View style={styles.wrap}>
      <LinearGradient
        colors={palette.listeningGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.player}
      >
        <View style={styles.playerGlow} />
        <View style={styles.playerTopRow}>
          <View style={styles.audioBadge}>
            <Ionicons name="headset" size={14} color={palette.white} />
            <Text style={styles.audioBadgeText}>
              {t("topik.listening.audio")}
            </Text>
          </View>
          <Text style={styles.playCount}>
            {t("topik.listening.playCount", {
              current: playCount,
              total: playbackLimit,
            })}
          </Text>
        </View>

        <View style={styles.controls}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={
              isPlaying ? t("topik.listening.stop") : t("topik.listening.play")
            }
            disabled={!isPlaying && !canPlay}
            onPress={isPlaying ? stop : () => void play()}
            style={[
              styles.playButton,
              !isPlaying && !canPlay && styles.playButtonDisabled,
            ]}
          >
            <Ionicons
              name={isPlaying ? "stop" : playCount > 0 ? "refresh" : "play"}
              size={24}
              color={palette.primaryStrong}
            />
          </Pressable>

          <View style={styles.waveform}>
            {waveform.map((height, index) => (
              <View
                key={`${height}-${index}`}
                style={[
                  styles.waveBar,
                  { height },
                  isPlaying &&
                    index % 3 === playCount % 3 &&
                    styles.waveBarActive,
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.playerFooter}>
          <Ionicons
            name="phone-portrait-outline"
            size={13}
            color={palette.heroDescription}
          />
          <Text style={styles.playerFooterText}>
            {audio.audioUrl
              ? t("topik.listening.originalAudio")
              : t("topik.listening.deviceVoice")}
          </Text>
        </View>
      </LinearGradient>

      {showTranscript && (
        <View style={styles.transcript}>
          <View style={styles.transcriptHeader}>
            <View style={styles.transcriptIcon}>
              <Ionicons
                name="document-text-outline"
                size={16}
                color={palette.primary}
              />
            </View>
            <View>
              <Text style={styles.transcriptEyebrow}>
                {t("topik.listening.explanationMode")}
              </Text>
              <Text style={styles.transcriptTitle}>
                {t("topik.listening.transcript")}
              </Text>
            </View>
          </View>
          <View style={styles.transcriptLines}>
            {audio.transcript.map((line, index) => (
              <View
                key={`${line.speaker}-${index}`}
                style={styles.transcriptLine}
              >
                <Text style={styles.speaker}>{line.speaker}</Text>
                <Text style={styles.lineText}>{line.text}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const getStyles = (palette: TopikPalette) =>
  StyleSheet.create({
    wrap: { gap: 12 },
    player: {
      overflow: "hidden",
      borderRadius: 18,
      paddingHorizontal: 17,
      paddingVertical: 15,
      gap: 14,
    },
    playerGlow: {
      position: "absolute",
      right: -30,
      top: -45,
      width: 130,
      height: 130,
      borderRadius: 65,
      backgroundColor: "rgba(255,255,255,0.10)",
    },
    playerTopRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    audioBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      borderRadius: 999,
      paddingHorizontal: 9,
      paddingVertical: 5,
      backgroundColor: "rgba(255,255,255,0.16)",
    },
    audioBadgeText: { color: palette.white, fontSize: 11, fontWeight: "900" },
    playCount: {
      color: palette.heroDescription,
      fontSize: 11,
      fontWeight: "700",
    },
    controls: { flexDirection: "row", alignItems: "center", gap: 15 },
    playButton: {
      width: 52,
      height: 52,
      borderRadius: 26,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: palette.white,
      shadowColor: palette.shadow,
      shadowOpacity: 0.16,
      shadowRadius: 8,
      elevation: 3,
    },
    playButtonDisabled: { opacity: 0.45 },
    waveform: {
      flex: 1,
      height: 40,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    waveBar: {
      width: 3,
      borderRadius: 3,
      backgroundColor: "rgba(255,255,255,0.46)",
    },
    waveBarActive: { backgroundColor: palette.white },
    playerFooter: { flexDirection: "row", alignItems: "center", gap: 5 },
    playerFooterText: { color: palette.heroDescription, fontSize: 10.5 },
    transcript: {
      gap: 14,
      borderWidth: 1,
      borderColor: palette.border,
      borderRadius: 15,
      backgroundColor: palette.surfaceMuted,
      padding: 15,
    },
    transcriptHeader: { flexDirection: "row", alignItems: "center", gap: 10 },
    transcriptIcon: {
      width: 34,
      height: 34,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: palette.primarySoft,
    },
    transcriptEyebrow: {
      color: palette.warning,
      fontSize: 9,
      fontWeight: "900",
    },
    transcriptTitle: { color: palette.text, fontSize: 14, fontWeight: "900" },
    transcriptLines: { gap: 11 },
    transcriptLine: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
    speaker: {
      width: 42,
      color: palette.primary,
      fontSize: 11,
      lineHeight: 19,
      fontWeight: "900",
    },
    lineText: { flex: 1, color: palette.text, fontSize: 13, lineHeight: 21 },
  });
