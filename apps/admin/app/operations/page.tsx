import { OperationsPage } from "@/features/operations/operations-page";
import { LiveOperationsPage } from "@/features/operations/live-operations-page";
import { isMockMode } from "@/features/auth/session";

export default function Page(){return isMockMode ? <OperationsPage/> : <LiveOperationsPage/>;}
