import { Suspense } from "react";
import { UsersPage } from "@/features/users/users-page";

export default function Page() {
  return <Suspense fallback={<div className="admin-empty">사용자를 불러오는 중…</div>}><UsersPage /></Suspense>;
}
