import { View } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { useLeagueChallenge } from "@/hooks/useLeagueChallenge";
import MatchGame from "@/components/match-game/MatchGame";

/**
 * 짝 맞추기.
 *
 * 두 경로에서 들어온다.
 *  · 게임 목록 → 끝나면 그냥 뒤로
 *  · 리그 챌린지 (`mode=challenge`) → 점수를 서버에 제출하고 challenge-result 로
 *
 * 제출·라우팅은 useLeagueChallenge 가 전부 한다. 게임 7종이 같은 훅을 쓰므로
 * 한 곳만 고치면 전부 같이 고쳐진다 — 화면마다 따로 짜면 한 군데만 빠져도
 * 그 리그의 챌린지가 조용히 XP 0 이 된다.
 */
export default function MatchGameScreen() {
  const theme = useTheme();
  const { isChallenge, finish, goBack } = useLeagueChallenge();

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <MatchGame
        // 중간에 X 로 나가도 챌린지면 결과 화면으로 보낸다. 뒤로 가면
        // challenge-intro 가 다시 떠서 무한히 되돌아온다.
        onExit={() => (isChallenge ? void finish(0) : goBack())}
        onFinish={(result) =>
          isChallenge ? void finish(result.matched) : goBack()
        }
      />
    </View>
  );
}
