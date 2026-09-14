import { useCallback, useRef } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LeagueService } from "@/services/league.service";

/**
 * 게임 화면이 "리그 챌린지로 열렸는지" 를 알고, 끝났을 때 점수를 서버에
 * 보내는 공통 처리.
 *
 * 게임 7종이 전부 같은 모양(점수 + 종료 화면 + exit)이라 각 화면은 이 훅을
 * 쓰고 exit 만 바꾸면 된다. 화면마다 따로 구현하면 한 곳만 빠져도 그 리그의
 * 챌린지는 조용히 XP 가 0 이 된다.
 *
 * 챌린지가 아닐 때(게임 목록에서 들어옴)는 예전처럼 그냥 뒤로 간다.
 */
export function useLeagueChallenge() {
  const params = useLocalSearchParams<{ mode?: string; tier?: string }>();
  const router = useRouter();
  const isChallenge = params.mode === "challenge";
  // 종료 버튼을 두 번 눌러 두 번 제출하는 걸 막는다
  const submitting = useRef(false);

  const goBack = useCallback(() => {
    if (router.canGoBack()) router.back();
    else router.replace("/");
  }, [router]);

  /**
   * 게임을 마쳤거나 나갈 때 부른다.
   * 챌린지면 점수를 제출하고 결과 화면으로, 아니면 그냥 뒤로.
   */
  const finish = useCallback(
    async (score: number) => {
      if (!isChallenge) {
        goBack();
        return;
      }
      if (submitting.current) return;
      submitting.current = true;

      const safeScore = Math.max(0, Math.round(score || 0));
      // 제출이 실패해도 결과 화면은 보여준다. 게임을 했는데 아무 화면도
      // 안 나오는 게 제일 나쁘다 — XP 0 으로 표시된다.
      const result = await LeagueService.completeChallenge(safeScore).catch(
        () => null,
      );

      router.replace({
        pathname: "/challenge-result",
        params: {
          tier: params.tier ?? "bronze",
          xp: String(result?.xpEarned ?? 0),
          score: String(result?.score ?? safeScore),
          counted: result && !result.counted ? "0" : "1",
        },
      });
    },
    [goBack, isChallenge, params.tier, router],
  );

  return { isChallenge, finish, goBack };
}
