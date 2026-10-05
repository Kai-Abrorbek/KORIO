"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isMockAuthMode, isMockMode, useSession, type AdminPermission } from "@/features/auth/session";
import { ThemeToggle } from "@/shared/ui/theme";
import { ConsoleProvider, useConsole } from "./console-context";

interface NavGroup {
  href: string;
  label: string;
  icon: string;
  color: string;
  permission: AdminPermission;
  children: { label: string; href: string }[];
}

const NAV: NavGroup[] = [
  { href: "/", label: "Control Center", icon: "grid", color: "blue", permission: "analytics:read", children: [{ label: "개요", href: "/" }, { label: "지표 상세", href: "/metrics" }] },
  { href: "/users", label: "사용자", icon: "users", color: "pink", permission: "users:read", children: [{ label: "사용자 목록", href: "/users" }, { label: "사용자 세그먼트", href: "/users?tab=segments" }] },
  { href: "/content", label: "콘텐츠", icon: "layers", color: "violet", permission: "content:read", children: [{ label: "학습 경로", href: "/content" }, { label: "문제 관리", href: "/content?tab=questions" }, { label: "문제 품질", href: "/content?tab=quality" }, { label: "Grammar · Expressions · Hangul", href: "/content?tab=library" }, { label: "번역 상태", href: "/content?tab=localization" }] },
  { href: "/analytics", label: "분석", icon: "chart", color: "cyan", permission: "analytics:read", children: [{ label: "학습 분석", href: "/analytics" }, { label: "레슨 퍼널", href: "/analytics?tab=funnel" }, { label: "문제 분석", href: "/analytics?tab=questions" }, { label: "리텐션", href: "/analytics?tab=retention" }] },
  { href: "/subscriptions", label: "구독", icon: "card", color: "amber", permission: "subscription:read", children: [{ label: "구독 현황", href: "/subscriptions" }, { label: "구독자 관리", href: "/subscriptions?tab=customers" }] },
  { href: "/gamification", label: "게이미피케이션", icon: "spark", color: "orange", permission: "analytics:read", children: [{ label: "활동 분석", href: "/gamification" }, { label: "설정", href: "/gamification?tab=settings" }] },
  { href: "/operations", label: "운영", icon: "bolt", color: "purple", permission: "operations:write", children: [{ label: "서비스 제어", href: "/operations" }, { label: "공지 · 이벤트", href: "/operations?tab=announcements" }] },
  { href: "/admin", label: "관리자 · 감사", icon: "shield", color: "slate", permission: "audit:read", children: [{ label: "감사 로그", href: "/admin" }, { label: "권한", href: "/admin?tab=roles" }] },
];

const ROLE_LABEL: Record<string, string> = { super_admin: "최고 관리자", content_admin: "콘텐츠 관리자", support: "지원", analyst: "분석가" };
const isCurrent = (href: string, path: string) => href === "/" ? path === "/" || path === "/metrics" : path.startsWith(href);

function NavIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>,
    users: <><circle cx="9" cy="8" r="3"/><path d="M3 20v-2a5 5 0 0 1 10 0v2M16 5a3 3 0 0 1 0 6M16 15a5 5 0 0 1 5 5"/></>,
    layers: <><path d="m12 2 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 17l9 5 9-5"/></>,
    chart: <><path d="M3 3v18h18M6 16l4-5 4 2 5-7"/></>,
    card: <><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></>,
    spark: <><path d="m12 2 2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2L12 2Z"/></>,
    bolt: <><path d="m13 2-9 12h7l-1 8 10-12h-7l0-8Z"/></>,
    shield: <><path d="m12 2 8 4v6c0 5-3 8-8 10-5-2-8-5-8-10V6l8-4Z"/><path d="m9 12 2 2 4-4"/></>,
  };
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{paths[name]}</svg>;
}

export function ConsoleShell({ children }: { children: React.ReactNode }) {
  return <ConsoleProvider><ShellContent>{children}</ShellContent></ConsoleProvider>;
}

function ShellContent({ children }: { children: React.ReactNode }) {
  const { me, can, logout } = useSession();
  const { range, preset, setPreset, setCustom } = useConsole();
  const path = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState<string | null>(null);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [customOpen, setCustomOpen] = useState(false);
  const [from, setFrom] = useState(range.from);
  const [to, setTo] = useState(range.to);
  const permitted = NAV.filter(item => can(item.permission));
  const active = permitted.find(item => isCurrent(item.href, path)) ?? permitted[0];
  const flyout = permitted.find(item => item.href === open);
  const results = permitted.flatMap(group => group.children.map(child => ({ ...child, section: group.label }))).filter(item => `${item.label} ${item.section}`.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearch(true);
      }
      if (event.key === "Escape") { setSearch(false); setOpen(null); setCustomOpen(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="console-shell">
      <aside className="icon-rail" aria-label="주 메뉴">
        <Link href="/" className="rail-logo" aria-label="KORIO 홈" onClick={() => setOpen(null)}>K</Link>
        <div className="rail-links">
          {permitted.map(item => (
            <div className="rail-wrap" key={item.href}>
              <button className={`rail-button rail-${item.color}${active?.href === item.href ? " is-current" : ""}${open === item.href ? " is-open" : ""}`} type="button" aria-label={item.label} aria-expanded={open === item.href} onClick={() => setOpen(open === item.href ? null : item.href)}><NavIcon name={item.icon}/></button>
              <span className="rail-tooltip" role="tooltip">{item.label}</span>
            </div>
          ))}
        </div>
        <button type="button" className="rail-avatar" title={me?.email} onClick={() => setOpen(open === "account" ? null : "account")}>{me?.nickname?.slice(0,1) ?? "A"}</button>
      </aside>

      {flyout && <div className="nav-flyout" aria-label={`${flyout.label} 하위 메뉴`}>
        <div className="flyout-head"><span>{flyout.label}</span><button type="button" onClick={() => setOpen(null)} aria-label="메뉴 닫기">‹</button></div>
        <div className="flyout-group-label">{flyout.label === "Control Center" ? "OVERVIEW" : flyout.label.toUpperCase()}</div>
        {flyout.children.map(child => <Link key={child.href} href={child.href} className={`flyout-link${child.href === (typeof window === "undefined" ? path : path + window.location.search) ? " is-active" : ""}`} onClick={() => setOpen(null)}>{child.label}</Link>)}
      </div>}
      {open === "account" && <div className="account-popover"><strong>{me?.email}</strong><span>{ROLE_LABEL[me?.role ?? ""] ?? me?.role}</span><ThemeToggle/>{!isMockAuthMode && <button className="btn btn-ghost" onClick={logout}>로그아웃</button>}</div>}
      {open && <button className="flyout-scrim" aria-label="메뉴 닫기" onClick={() => setOpen(null)}/>}

      <div className="console-main">
        <header className="console-topbar">
          <div className="console-title"><span className="title-avatar">K</span><div><span className="title-eyebrow">KORIO ADMIN</span><h1>{active?.label ?? "Control Center"}</h1></div>{isMockMode && <span className="mock-tag">MOCK DATA</span>}</div>
          <div className="console-actions">
            <button className="top-control search-control" type="button" onClick={() => setSearch(true)}><span aria-hidden>⌕</span> 검색 <kbd>Ctrl K</kbd></button>
            <select className="top-control view-control" aria-label="보기 선택" value={active?.href ?? "/"} onChange={e => router.push(e.target.value)}>{permitted.map(item => <option key={item.href} value={item.href}>{item.label}</option>)}</select>
            <div className="date-control-wrap"><button className="top-control" type="button" onClick={() => {setFrom(range.from);setTo(range.to);setCustomOpen(!customOpen);}}>▦ <span>{range.from} — {range.to}</span>⌄</button>
              {customOpen && <div className="date-popover"><div className="date-presets">{[1,7,30,90].map(days => <button key={days} className={preset === days ? "is-active" : ""} onClick={() => {setPreset(days);setCustomOpen(false);}}>{days === 1 ? "오늘" : `${days}일`}</button>)}</div><label>시작일<input type="date" value={from} max={to} onChange={e => setFrom(e.target.value)}/></label><label>종료일<input type="date" value={to} min={from} onChange={e => setTo(e.target.value)}/></label><button className="btn btn-primary" onClick={() => {setCustom(from,to);setCustomOpen(false);}}>적용</button></div>}
            </div>
            <ThemeToggle/>
          </div>
        </header>
        <main className="console-content">{children}</main>
      </div>

      {search && <div className="search-overlay" onMouseDown={() => setSearch(false)}><div className="search-dialog" role="dialog" aria-modal="true" aria-label="메뉴 검색" onMouseDown={e => e.stopPropagation()}><div className="search-input-row"><span>⌕</span><input autoFocus placeholder="페이지 검색…" value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => {if(e.key === "Escape")setSearch(false);if(e.key === "Enter" && results[0]){router.push(results[0].href);setSearch(false);}}}/><button type="button" onClick={() => setSearch(false)}>ESC</button></div><div className="search-results">{results.length ? results.map(item => <button type="button" key={item.href} onClick={() => {router.push(item.href);setSearch(false);setQuery("");}}><span>{item.label}</span><small>{item.section}</small></button>) : <p>검색 결과가 없습니다.</p>}</div></div></div>}
    </div>
  );
}
