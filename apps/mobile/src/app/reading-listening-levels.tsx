import ReadingListeningLevelScreen from "@/features/reading-listening/ReadingListeningLevelScreen";
import { withPremiumScreen } from "@/features/subscription/usePremiumScreen";

/** 읽기·듣기는 구독 전용 */
export default withPremiumScreen(ReadingListeningLevelScreen, "listening");
