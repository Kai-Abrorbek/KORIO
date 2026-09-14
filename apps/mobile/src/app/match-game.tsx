import { View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import MatchGame from "@/components/match-game/MatchGame";

/**
 * 짝 맞추기 게임 화면.
 *
 * 두 경로에서 들어온다.
 *  · 게임 목록 → 끝나면 그냥 뒤로
 *  · 리그 XP 챌린지 (`mode=challenge`) → 끝나면 challenge-result 로
 *
 * 예전에는 challenge-intro 가 /lesson?mode=challenge 로 보냈는데 lesson.tsx 에
 * challenge 분기가 없어서 `NO_LESSON_ID` 로 죽었다. challenge-result 가 기대하는
 * 파라미터(matched·combo·level)가 전부 짝 맞추기 용어라, 원래 의도는 이 화면이었다.
 */
export default function MatchGameScreen() {
  const router = useRouter();
  const theme = useTheme();
  const p = useLocalSearchParams<{
    mode?: string;
    tier?: string;
    xp?: string;
  }>();
  const isChallenge = p.mode === "challenge";

  const leave = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <MatchGame
        onExit={() => {
          // 챌린지를 중간에 닫으면 리그로 돌려보낸다. 뒤로 가면
          // challenge-intro 가 다시 떠서 무한히 되돌아온다.
          if (isChallenge) {
            router.replace("/(tabs)/league");
            return;
          }
          leave();
        }}
        onFinish={
          isChallenge
            ? (result) =>
                router.replace({
                  pathname: "/challenge-result",
                  params: {
                    tier: p.tier ?? "bronze",
                    // 실제로 번 XP. p.xp 는 "최대 획득 가능" 이라 결과에 쓰면 안 된다.
                    xp: String(result.xp),
                    matched: String(result.matched),
                    combo: String(result.bestCombo),
                  },
                })
            : undefined
        }
      />
    </View>
  );
}
