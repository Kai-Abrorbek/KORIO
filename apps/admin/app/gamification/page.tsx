import { GamificationPage } from "@/features/gamification/gamification-page";
import { LiveGamificationPage } from "@/features/gamification/live-gamification-page";
import { isMockMode } from "@/shared/config/data-mode";

export default function Page() { return isMockMode ? <GamificationPage/> : <LiveGamificationPage/>; }
