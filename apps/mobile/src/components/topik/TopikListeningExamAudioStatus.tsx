import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import type { TopikListeningPlaybackStatus } from "@/hooks/useTopikListeningPlayback";
import { type TopikPalette, useTopikTheme } from "./topikTheme";

interface TopikListeningExamAudioStatusProps {
  status: TopikListeningPlaybackStatus;
}

export function TopikListeningExamAudioStatus({
  status,
}: TopikListeningExamAudioStatusProps) {
  const { t } = useTranslation();
  const palette = useTopikTheme();
  const styles = useMemo(() => getStyles(palette), [palette]);
  const failed = status === "error" || status === "unavailable";
  const completed = status === "completed";

  return (
    <LinearGradient
      colors={palette.listeningGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.wrap}
    >
      <View style={styles.iconWrap}>
        <Ionicons
          name={
            failed
              ? "alert-circle-outline"
              : completed
                ? "checkmark-circle-outline"
                : "headset"
          }
          size={23}
          color={palette.primaryStrong}
        />
      </View>
      <View style={styles.copy}>
        <Text style={styles.eyebrow}>{t("topik.listening.examAudio")}</Text>
        <Text style={styles.title}>
          {failed
            ? t("topik.listening.examAudioUnavailable")
            : completed
              ? t("topik.listening.examAudioComplete")
              : t("topik.listening.examAudioPlaying")}
        </Text>
        {!failed && !completed && (
          <Text style={styles.description}>
            {t("topik.listening.examAudioLocked")}
          </Text>
        )}
      </View>
      {!failed && !completed && (
        <View style={styles.lockBadge}>
          <Ionicons name="lock-closed" size={13} color={palette.white} />
        </View>
      )}
    </LinearGradient>
  );
}

const getStyles = (palette: TopikPalette) =>
  StyleSheet.create({
    wrap: {
      overflow: "hidden",
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      borderRadius: 18,
      paddingHorizontal: 16,
      paddingVertical: 15,
    },
    iconWrap: {
      width: 46,
      height: 46,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 23,
      backgroundColor: palette.white,
    },
    copy: { flex: 1, gap: 3 },
    eyebrow: {
      color: palette.heroDescription,
      fontSize: 9.5,
      fontWeight: "900",
      letterSpacing: 0.5,
    },
    title: { color: palette.white, fontSize: 14, fontWeight: "900" },
    description: {
      color: palette.heroDescription,
      fontSize: 10.5,
      lineHeight: 16,
    },
    lockBadge: {
      width: 29,
      height: 29,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 15,
      backgroundColor: "rgba(255,255,255,0.15)",
    },
  });
