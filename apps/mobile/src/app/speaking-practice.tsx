import SpeakingPracticeScreen from "@/features/speaking/SpeakingPracticeScreen";
import { withPremiumScreen } from "@/features/subscription/usePremiumScreen";

/** 딥링크로 바로 들어와도 구독 확인을 거치게 한다 */
export default withPremiumScreen(SpeakingPracticeScreen, "expression");
