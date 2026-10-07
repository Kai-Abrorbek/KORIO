import { GamificationPage } from "@/features/gamification/gamification-page";
import { LiveGamificationPage } from "@/features/gamification/live-gamification-page";
import { isMockMode } from "@/features/auth/session";

export default function Page() { return isMockMode ? <GamificationPage/> : <LiveGamificationPage/>; }
