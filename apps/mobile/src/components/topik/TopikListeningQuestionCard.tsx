import type { ReactNode } from "react";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import type { TopikListeningPlaybackStatus } from "@/hooks/useTopikListeningPlayback";
import type { TopikAttemptMode, TopikQuestionWithGroup } from "@/types/topik";
import { TopikChoiceList } from "./TopikChoiceList";
import { TopikListeningExamAudioStatus } from "./TopikListeningExamAudioStatus";
import { TopikListeningPlayer } from "./TopikListeningPlayer";
import { TopikTextBlocks } from "./TopikTextBlocks";
import { type TopikPalette, useTopikTheme } from "./topikTheme";

interface TopikListeningQuestionCardProps {
  questions: TopikQuestionWithGroup[];
  mode: TopikAttemptMode;
  selectedChoiceKeys: Record<string, string | undefined>;
  correctChoiceKeys: Record<string, string | undefined>;
  showTranscript: boolean;
  playbackStatus: TopikListeningPlaybackStatus;
  activeAudioKey: string | null;
  playCount: number;
  onPlayAudio: () => void;
  onStopAudio: () => void;
  onSelect: (questionId: string, choiceKey: string) => void;
  renderSupport?: (question: TopikQuestionWithGroup) => ReactNode;
}

export function TopikListeningQuestionCard({
  questions,
  mode,
  selectedChoiceKeys,
  correctChoiceKeys,
  showTranscript,
  playbackStatus,
  activeAudioKey,
  playCount,
  onPlayAudio,
  onStopAudio,
  onSelect,
  renderSupport,
}: TopikListeningQuestionCardProps) {
  const palette = useTopikTheme();
  const styles = useMemo(() => getStyles(palette), [palette]);
  const firstQuestion = questions[0];
  const audio = firstQuestion?.audio ?? firstQuestion?.group.sharedAudio;
  const repeatCount =
    audio?.guidedAutoRepeatCount ??
    ((firstQuestion?.number ?? 0) >= 21 ? 2 : 1);

  if (!firstQuestion || !audio) return null;

  return (
    <View style={styles.paper}>
      <View style={styles.instructionWrap}>
        <TopikTextBlocks
          blocks={firstQuestion.group.instruction}
          textStyle={styles.instruction}
        />
      </View>

      {mode === "guided" ? (
        <TopikListeningPlayer
          audio={audio}
          showTranscript={showTranscript}
          isPlaying={
            activeAudioKey === audio.key && playbackStatus === "playing"
          }
          playCount={playCount}
          repeatCount={repeatCount}
          onPlay={onPlayAudio}
          onStop={onStopAudio}
        />
      ) : (
        <TopikListeningExamAudioStatus status={playbackStatus} />
      )}

      <View style={styles.questions}>
        {questions.map((question, index) => (
          <View
            key={question.id}
            style={[styles.question, index > 0 && styles.questionDivider]}
          >
            <View style={styles.questionRow}>
              <Text style={styles.questionNumber}>
                {String(question.number).padStart(2, "0")}
              </Text>
              {question.prompt.length > 0 && (
                <View style={styles.prompt}>
                  <TopikTextBlocks
                    blocks={question.prompt}
                    textStyle={styles.promptText}
                  />
                </View>
              )}
            </View>

            <TopikChoiceList
              choices={question.choices}
              layout={question.presentation.choiceLayout}
              selectedChoiceKey={selectedChoiceKeys[question.id]}
              correctChoiceKey={correctChoiceKeys[question.id]}
              disabled={Boolean(correctChoiceKeys[question.id])}
              onSelect={(choiceKey) => onSelect(question.id, choiceKey)}
            />

            {renderSupport?.(question)}
          </View>
        ))}
      </View>
    </View>
  );
}

const getStyles = (palette: TopikPalette) =>
  StyleSheet.create({
    paper: {
      gap: 18,
      borderWidth: 1,
      borderColor: palette.border,
      borderRadius: 18,
      backgroundColor: palette.paper,
      paddingHorizontal: 16,
      paddingTop: 17,
      paddingBottom: 20,
      shadowColor: palette.shadow,
      shadowOpacity: 0.07,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 6 },
      elevation: 2,
    },
    instructionWrap: {
      borderBottomWidth: 1,
      borderBottomColor: palette.divider,
      paddingBottom: 13,
    },
    instruction: {
      color: palette.text,
      fontSize: 14,
      lineHeight: 21,
      fontWeight: "800",
    },
    questions: { gap: 20 },
    question: { gap: 13 },
    questionDivider: {
      borderTopWidth: 1,
      borderTopColor: palette.divider,
      paddingTop: 20,
    },
    questionRow: { flexDirection: "row", alignItems: "flex-start", gap: 13 },
    questionNumber: {
      color: palette.primary,
      fontSize: 21,
      lineHeight: 28,
      fontWeight: "900",
      letterSpacing: -1.5,
    },
    prompt: { flex: 1, paddingTop: 2 },
    promptText: {
      color: palette.text,
      fontSize: 14,
      lineHeight: 23,
      fontWeight: "800",
    },
  });
