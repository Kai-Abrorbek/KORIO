import { OperationsPage } from "@/features/operations/operations-page";
import { LiveOperationsPage } from "@/features/operations/live-operations-page";
import { isMockMode } from "@/shared/config/data-mode";

export default function Page(){return isMockMode ? <OperationsPage/> : <LiveOperationsPage/>;}
