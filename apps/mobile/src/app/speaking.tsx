import SpeakingTopicsScreen from "@/features/speaking/SpeakingTopicsScreen";
import { withPremiumScreen } from "@/features/subscription/usePremiumScreen";

/** 말하기 스튜디오는 표현 콘텐츠를 그대로 쓴다 → 표현과 같은 구독 게이트 */
export default withPremiumScreen(SpeakingTopicsScreen, "expression");
