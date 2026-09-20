import { useCallback, useState } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import { useSpeech } from "@/hooks/useSpeech";
import { TutorSummary } from "../components/TutorSummary";
import { useRealtimeTutor } from "../hooks/useRealtimeTutor";
import { TutorCallScreen } from "./TutorCallScreen";
import {
  TutorSetupScreen,
  type TutorSetupResult,
} from "./TutorSetupScreen";

/**
 * 튜터 화면의 세 상태.
 *
 *   설정 → 통화 → 정리
 *
 * 예전엔 "선생님 고르기 → 주제 고르기" 두 화면이었고 **주제를 누르는 순간
 * 통화가 시작됐다.** 말투나 설명 언어를 바꿀 자리가 없었고, 주제를 잘못
 * 눌러도 곧바로 과금되는 통화가 열렸다. 지금은 설정이 한 페이지고 시작은
 * 버튼으로만 한다.
 */
export default function TutorScreen() {
  const router = useRouter();
  const { speak } = useSpeech();

  /** 이번 세션에 고른 주제 제목. 통화·정리 화면 머리에 띄운다 */
  const [topicTitle, setTopicTitle] = useState<string | undefined>(undefined);
  /** 이번 세션 선생님 이름. 서버가 이름을 안 주는 통화 화면용 */
  const [teacherName, setTeacherName] = useState<string | undefined>(undefined);
  /** 헤더 부제("Teasing · 한국어 선생님")용. 서버 grant 에는 성격이 없다 */
  const [teacherPersonality, setTeacherPersonality] = useState<
    string | undefined
  >(undefined);

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

  const onStart = useCallback(
    (opts: TutorSetupResult) => {
      // 통화/정리 화면 헤더용. 이번 세션 동안만 들고 있으면 된다
      setTopicTitle(opts.topicTitle);
      setTeacherName(opts.teacherName);
      setTeacherPersonality(opts.teacherPersonality);
      void start("freeTalk", {
        topicId: opts.topicId,
        teacherId: opts.teacherId,
        addressStyle: opts.addressStyle,
        teachingLanguage: opts.teachingLanguage,
      });
    },
    [start],
  );

  // 대화가 끝나면 정리 카드로 덮는다. 그냥 끊기고 끝나면 뭘 했는지 남지 않는다.
  if (summary) {
    return (
      <TutorSummary
        data={summary}
        topicTitle={topicTitle}
        onSpeak={(text) => void speak(text, "ko-KR")}
        onClose={() => {
          clearSummary();
          router.back();
        }}
        onAgain={() => {
          // 선생님·언어·말투는 저장돼 있어서 그대로 고른 채로 돌아온다.
          // 주제만 비운다 — 오늘 뭘 할지는 매번 새로 정하는 게 맞다
          clearSummary();
          setTopicTitle(undefined);
        }}
      />
    );
  }

  /**
   * 통화가 아직 안 붙었으면 설정 화면.
   *
   * ⚠️ analyzing 중에는 설정으로 돌아가면 안 된다 — 요약을 기다리는 중이라
   *    통화 화면이 "정리 중" 오버레이를 띄우고 있다.
   * ⚠️ error 도 여기로 온다. 실패하면 설정 화면에서 이유를 보고 바로 다시
   *    시작할 수 있어야 한다 (예전엔 통화 화면에 갇혔다).
   */
  if (!active && !analyzing) {
    return (
      <TutorSetupScreen
        busy={busy}
        error={error}
        quota={quota}
        onClose={() => router.back()}
        onStart={onStart}
        onUpsell={() => router.push("/premium")}
      />
    );
  }

  return (
    <TutorCallScreen
      state={state}
      caption={caption}
      captionPrev={captionPrev}
      userSaid={userSaid}
      examples={examples}
      targets={targets}
      teacher={teacher}
      teacherName={teacherName}
      teacherPersonality={teacherPersonality}
      topicTitle={topicTitle}
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
      onPickAnother={() => void stop()}
      onUpsell={() => router.push("/premium")}
    />
  );
}
