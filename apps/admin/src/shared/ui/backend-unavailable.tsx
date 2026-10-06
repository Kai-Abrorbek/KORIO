"use client";

import Link from "next/link";
import { isMockMode } from "@/features/auth/session";

/** Prevent demo records and local-only mutations from appearing as real backend data. */
export function BackendUnavailable({ title, reason, children }: { title: string; reason: string; children: React.ReactNode }) {
  if (isMockMode) return <>{children}</>;
  return <div className="admin-page"><div className="admin-page-head"><div><h2>{title}</h2><p>실데이터 모드</p></div></div><section className="admin-card admin-empty"><h3>아직 연결되지 않은 화면</h3><p>{reason}</p><p>실제 API가 준비되기 전까지 데모 숫자나 브라우저 저장 작업을 운영 데이터처럼 표시하지 않습니다.</p><Link className="btn btn-primary" href="/">연결된 Control Center로 이동</Link></section></div>;
}
