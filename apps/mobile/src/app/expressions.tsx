import ExpressionRoadmapScreen from "@/features/expressions/screens/ExpressionRoadmapScreen";
import { withPremiumScreen } from "@/features/subscription/usePremiumScreen";

/** 표현 학습은 에너지를 안 쓰는 기능 → 구독 전용 */
export default withPremiumScreen(ExpressionRoadmapScreen, "expression");
