"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/features/auth/session";
import { LiveAuditPage } from "./live-audit-page";
import { LiveRolesPage } from "./live-roles-page";

type Tab = "audit" | "roles";

export function LiveAdminPage() {
  const { can } = useSession();
  const [tab, setTab] = useState<Tab>("audit");
  useEffect(() => {
    const sync = () => setTab(new URLSearchParams(window.location.search).get("tab") === "roles" ? "roles" : "audit");
    sync(); window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  const changeTab = (next: Tab) => {
    setTab(next);
    window.history.pushState(null, "", next === "audit" ? "/admin" : "/admin?tab=roles");
  };
  if (!can("audit:read")) return <div className="admin-card admin-empty">감사 로그 조회 권한이 없습니다.</div>;
  return <div className="admin-page">
    <div className="admin-page-head"><div><h2>관리자 · 감사</h2><p>운영 행동의 감사 기록과 실제 관리자 권한을 확인합니다.</p></div><span className="admin-pill blue">실데이터 · 자동 새로고침</span></div>
    <nav className="admin-tabs" aria-label="관리자·감사 탭"><button className={tab === "audit" ? "is-active" : ""} onClick={() => changeTab("audit")}>감사 로그</button>{can("admin:manage") && <button className={tab === "roles" ? "is-active" : ""} onClick={() => changeTab("roles")}>관리자 권한</button>}</nav>
    {tab === "roles" && can("admin:manage") ? <LiveRolesPage/> : <LiveAuditPage/>}
  </div>;
}
