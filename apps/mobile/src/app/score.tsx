import ScoreUpScreen from "@/components/score/ScoreUpScreen";
import { useRouter } from "expo-router";

export default function Score() {
  const router = useRouter();

  return <ScoreUpScreen score={10} flag={"EN"} />;
}
