import { useCallback, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useSpeech } from "@/hooks/useSpeech";
import { useTheme } from "@/hooks/useTheme";
import { ThemeColors } from "@/constants/theme";
import { TopicPicker } from "../components/TopicPicker";
import { TeacherPicker } from "../components/TeacherPicker";
import { useTutorPrefs } from "../store/tutor-prefs.store";
import { type TutorTeacherCard } from "../services/tutor.api";
import { TutorSummary } from "../components/TutorSummary";
import type { TutorTopicCard } from "../services/tutor.api";
import { useRealtimeTutor } from "../hooks/useRealtimeTutor";
import { TutorCallScreen } from "./TutorCallScreen";

export default function TutorScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const s = styles(theme);
  const router = useRouter();
  const { speak } = useSpeech();
  /** 고른 주제. null 이면 아직 안 골랐다 = 주제 화면을 보여준다 */
  const [topic, setTopic] = useState<TutorTopicCard | null>(null);
  const [picking, setPicking] = useState(true);
  /**
   * 고른 선생님. 주제보다 먼저 고른다 — 목소리와 말투가 대화 전체를
   * 좌우하는데 주제를 먼저 고르면 그게 곁다리처럼 보인다.
   */
  const [pickedTeacher, setPickedTeacher] = useState<TutorTeacherCard | null>(
    null,
  );
  const lastTeacherId = useTutorPrefs((st) => st.teacherId);
  const rememberTeacher = useTutorPrefs((st) => st.setTeacherId);

  const {
    state,
    quota,
    error,
    caption,
    captionPrev,
    userSaid,
    examples,
    targets,
    teacher,
    summary,
    analyzing,
    clearSummary,
    withMicMuted,
    micOn,
    toggleMic,
    elapsedSec,
    maxSec,
    active,
    busy,
    start,
    stop,
  } = useRealtimeTutor();

  // 화면을 벗어나면 반드시 끊는다. 안 끊으면 마이크가 열린 채로 과금이 계속된다.
  useFocusEffect(
    useCallback(() => {
      return () => {
        void stop();
      };
    }, [stop]),
  );

  const idle = picking && !active && !summary && !analyzing;

  // 1단계: 누구와 공부할지. 선생님이 정해져야 목소리·말투가 정해진다
  if (idle && !pickedTeacher) {
    return (
      <View style={[s.container, { paddingTop: insets.top + 6 }]}>
        <View style={s.header}>
          <Pressable onPress={() => router.back()} style={s.iconBtn} hitSlop={8}>
            <Ionicons name="chevron-down" size={26} color={theme.text} />
          </Pressable>
          <Text style={s.title}>{t("tutor.teacher.title")}</Text>
          <View style={s.iconBtn} />
        </View>
        <TeacherPicker
          initialId={lastTeacherId}
          onPick={(picked) => {
            setPickedTeacher(picked);
            rememberTeacher(picked.id);
          }}
        />
      </View>
    );
  }

  // 2단계: 오늘 무슨 이야기를 할지.
  // "무슨 말을 하지?" 로 얼어붙는 걸 막는 장치다.
  if (idle) {
    return (
      <View style={[s.container, { paddingTop: insets.top + 6 }]}>
        <View style={s.header}>
          <Pressable
            onPress={() => setPickedTeacher(null)}
            style={s.iconBtn}
            hitSlop={8}
          >
            <Ionicons name="chevron-back" size={26} color={theme.text} />
          </Pressable>
          <Text style={s.title}>{t("tutor.pickTopic")}</Text>
          <View style={s.iconBtn} />
        </View>
        <TopicPicker
          onPick={(picked) => {
            setTopic(picked);
            setPicking(false);
            void start("freeTalk", {
              topicId: picked.id,
              teacherId: pickedTeacher?.id,
            });
          }}
          onFreeTalk={() => {
            setTopic(null);
            setPicking(false);
            void start("freeTalk", { teacherId: pickedTeacher?.id });
          }}
        />
      </View>
    );
  }

  // 대화가 끝나면 정리 카드로 덮는다. 그냥 끊기고 끝나면 뭘 했는지 남지 않는다.
  if (summary) {
    return (
      <TutorSummary
        data={summary}
        topicTitle={topic?.title}
        onSpeak={(text) => void speak(text, "ko-KR")}
        onClose={() => {
          clearSummary();
          router.back();
        }}
        onAgain={() => {
          clearSummary();
          setPicking(true);
        }}
      />
    );
  }

  // 3단계: 통화 중.
  return (
    <TutorCallScreen
      state={state}
      caption={caption}
      captionPrev={captionPrev}
      userSaid={userSaid}
      examples={examples}
      targets={targets}
      teacher={teacher}
      teacherName={pickedTeacher?.name}
      topicTitle={topic?.title}
      elapsedSec={elapsedSec}
      maxSec={maxSec}
      active={active}
      busy={busy}
      analyzing={analyzing}
      micOn={micOn}
      error={error}
      quota={quota}
      toggleMic={toggleMic}
      withMicMuted={withMicMuted}
      onEnd={() => void stop()}
      onClose={async () => {
        await stop();
        router.back();
      }}
      onPickAnother={() => setPicking(true)}
      onUpsell={() => router.push("/premium")}
    />
  );
}

const styles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 12,
      paddingBottom: 4,
    },
    iconBtn: {
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
    },
    title: { fontSize: 16, fontWeight: "900", color: theme.text },
  });
