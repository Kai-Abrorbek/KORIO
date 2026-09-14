"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, type AdminPermission } from "@/features/auth/session";
import { ThemeToggle } from "@/shared/ui/theme";

/**
 * 좌측 고정 내비 + 상단 바.
 *
 * 메뉴는 **권한으로 거른다.** 못 누르는 메뉴를 보여주고 눌렀을 때 거절하는 건
 * 운영 도구에서 가장 짜증나는 패턴이다. (서버가 다시 검사하므로 이건 편의이지
 * 보안 장치가 아니다 — 여기서 숨긴다고 엔드포인트가 막히는 게 아니다)
 */
interface NavItem {
  href: string;
  label: string;
  permission: AdminPermission;
  icon: React.ReactNode;
  /** 아직 안 만든 화면. 눌러서 빈 화면을 보는 것보다 낫다 */
  soon?: boolean;
}

const NAV: NavItem[] = [
  { href: "/", label: "대시보드", permission: "analytics:read", icon: <IconGrid /> },
  { href: "/users", label: "사용자", permission: "users:read", icon: <IconUsers />, soon: true },
  { href: "/content", label: "콘텐츠", permission: "content:read", icon: <IconLayers />, soon: true },
  { href: "/analytics", label: "분석", permission: "analytics:read", icon: <IconChart />, soon: true },
  { href: "/subscriptions", label: "구독", permission: "subscription:read", icon: <IconCard />, soon: true },
  { href: "/audit", label: "감사 로그", permission: "audit:read", icon: <IconShield />, soon: true },
];

const ROLE_LABEL: Record<string, string> = {
  super_admin: "최고 관리자",
  content_admin: "콘텐츠 관리자",
  support: "지원",
  analyst: "분석가",
};

const isActive = (href: string, pathname: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

export function AppShell({ children }: { children: React.ReactNode }) {
  const { me, can, logout } = useSession();
  const pathname = usePathname();

  return (
    <div className="shell">
      {/* ── 사이드바 ── */}
      <aside className="sidebar">
        <div className="sidebar-head">
          <div className="logo-mark">K</div>
          <span className="sidebar-title">KORIO Admin</span>
        </div>

        <nav className="sidebar-nav">
          {NAV.filter((item) => can(item.permission)).map((item) => {
            const active = isActive(item.href, pathname);
            return (
              <Link
                key={item.href}
                href={item.soon ? "#" : item.href}
                aria-disabled={item.soon}
                aria-current={active ? "page" : undefined}
                onClick={item.soon ? (e) => e.preventDefault() : undefined}
                className={[
                  "nav-item",
                  active ? "is-active" : "",
                  item.soon ? "is-soon" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
                {item.soon && <span className="nav-soon">준비 중</span>}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-foot">
          <div className="sidebar-email truncate">{me?.email}</div>
          <div className="sidebar-role">{ROLE_LABEL[me?.role ?? ""] ?? me?.role}</div>
          <button className="btn btn-ghost btn-block" onClick={logout}>
            로그아웃
          </button>
        </div>
      </aside>

      {/* ── 본문 ── */}
      <div className="main">
        <header className="topbar">
          <h1>{NAV.find((n) => isActive(n.href, pathname))?.label ?? "대시보드"}</h1>
          <ThemeToggle />
        </header>

        <main className="content">
          <div className="content-inner">{children}</div>
        </main>
      </div>
    </div>
  );
}

/* ── 아이콘 ── 라이브러리를 하나 더 붙일 만큼의 일이 아니다 */
const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
function IconGrid() {
  return <svg width="14" height="14" viewBox="0 0 24 24" {...S}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>;
}
function IconUsers() {
  return <svg width="14" height="14" viewBox="0 0 24 24" {...S}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/></svg>;
}
function IconLayers() {
  return <svg width="14" height="14" viewBox="0 0 24 24" {...S}><path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>;
}
function IconChart() {
  return <svg width="14" height="14" viewBox="0 0 24 24" {...S}><path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/></svg>;
}
function IconCard() {
  return <svg width="14" height="14" viewBox="0 0 24 24" {...S}><rect x="2" y="5" width="20" height="14" rx="2.5"/><path d="M2 10h20"/></svg>;
}
function IconShield() {
  return <svg width="14" height="14" viewBox="0 0 24 24" {...S}><path d="M12 2l8 4v6c0 5-3.4 8.9-8 10-4.6-1.1-8-5-8-10V6l8-4z"/></svg>;
}
