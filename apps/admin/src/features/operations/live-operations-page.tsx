"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api, ApiError } from "@/shared/api/client";
import { useQuery } from "@/shared/api/use-query";
import { ErrorState } from "@/shared/ui/primitives";

type Lang = "ko" | "uz" | "en" | "ru";
type Copy = Record<Lang, string>;
type Tab = "controls" | "announcements";
type Status = {
  checkedAt: string;
  version: { latestVersion: string; latestBuild: number | null; minSupportedVersion: string; source: "play" | "file"; playCheckedAt: string | null; storeUrl: string; recentRelease: { date: string; items: string[] } | null };
  push: { eligibleUsers: number; definition: string };
  recentAnnouncements: { key: string; title: string; at: string; adminEmail: string; sent: number; targets: number }[];
  controls: { maintenance: string; featureFlags: string; campaigns: string; versionPolicy: string };
};
type SendResult = { sent: number; targets?: number };
const LANGS: { key: Lang; label: string }[] = [{ key: "ko", label: "한국어" }, { key: "uz", label: "우즈베크어" }, { key: "en", label: "영어" }, { key: "ru", label: "러시아어" }];
const empty = (): Copy => ({ ko: "", uz: "", en: "", ru: "" });
const stamp = (value: string) => new Date(value).toLocaleString("ko-KR");

export function LiveOperationsPage() {
  const [tab, setTab] = useState<Tab>("controls");
  const [title, setTitle] = useState<Copy>(empty);
  const [body, setBody] = useState<Copy>(empty);
  const [reason, setReason] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [pending, setPending] = useState(false);
  const [key, setKey] = useState("");
  const [message, setMessage] = useState("");
  const [sendError, setSendError] = useState("");
  const query = useQuery<Status>("/admin/operations/status");

  useEffect(() => {
    const sync = () => setTab(new URLSearchParams(window.location.search).get("tab") === "announcements" ? "announcements" : "controls");
    sync(); window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  const changeTab = (next: Tab) => {
    setTab(next);
    window.history.pushState(null, "", next === "controls" ? "/operations" : "/operations?tab=announcements");
  };
  const valid = LANGS.every(({ key }) => title[key].trim().length > 0 && title[key].trim().length <= 100 && body[key].trim().length > 0 && body[key].trim().length <= 500) && reason.trim().length > 0 && reason.trim().length <= 500;
  const send = async () => {
    if (!valid || pending) return;
    setPending(true); setSendError("");
    const sendKey = key || `admin_${crypto.randomUUID().replaceAll("-", "")}`;
    setKey(sendKey);
    try {
      const result = await api.post<SendResult>("/admin/operations/announcements/send", { key: sendKey, title, body, reason });
      setMessage(`공지 발송 요청 완료 · ${result.sent.toLocaleString("ko-KR")}명 발송 시도 / ${Number(result.targets ?? 0).toLocaleString("ko-KR")}명 대상. 기기 최종 수신을 뜻하지 않습니다.`);
      setTitle(empty()); setBody(empty()); setReason(""); setKey(""); setConfirm(false); query.reload();
    } catch (error) {
      setSendError(error instanceof ApiError ? error.code : "NETWORK_ERROR");
    } finally { setPending(false); }
  };

  return <div className="admin-page">
    <div className="admin-page-head"><div><h2>운영</h2><p>앱 배포 상태와 공지 푸시를 확인합니다. 실제 앱에 연결되지 않은 제어는 사용할 수 없게 표시합니다.</p></div><span className="admin-pill blue">실데이터 · 30초마다 갱신</span></div>
    <nav className="admin-tabs" aria-label="운영 탭"><button className={tab === "controls" ? "is-active" : ""} onClick={() => changeTab("controls")}>서비스 제어</button><button className={tab === "announcements" ? "is-active" : ""} onClick={() => changeTab("announcements")}>공지 · 이벤트</button></nav>
    {query.error ? <section className="admin-card"><ErrorState code={query.error} onRetry={query.reload}/></section> : !query.data ? <div className="admin-card skeleton" style={{ height: 420 }}/> : <>
      {tab === "controls" && <>
        <div className="admin-grid four"><div className="admin-card admin-kpi"><div className="admin-kpi-label">최신 앱 버전</div><div className="admin-kpi-value">{query.data.version.latestVersion}</div><div className="admin-kpi-note">{query.data.version.source === "play" ? "Google Play 공개 버전" : "서버 파일 예비값"}{query.data.version.latestBuild ? ` · build ${query.data.version.latestBuild}` : ""}</div></div><div className="admin-card admin-kpi"><div className="admin-kpi-label">최소 지원 버전</div><div className="admin-kpi-value">{query.data.version.minSupportedVersion}</div><div className="admin-kpi-note">이전 버전 사용자는 강제 업데이트 대상</div></div><div className="admin-card admin-kpi"><div className="admin-kpi-label">푸시 토큰 보유 사용자</div><div className="admin-kpi-value">{query.data.push.eligibleUsers.toLocaleString("ko-KR")}</div><div className="admin-kpi-note">실제 수신 가능 인원과 다를 수 있음</div></div><div className="admin-card admin-kpi"><div className="admin-kpi-label">상태 조회</div><div className="admin-kpi-value" style={{ fontSize: 19 }}>{stamp(query.data.checkedAt)}</div><div className="admin-kpi-note">{query.data.version.playCheckedAt ? `Play 확인 ${stamp(query.data.version.playCheckedAt)}` : "Play 확인 불가 · 파일값 사용"}</div></div></div>
        <section className="admin-card"><div className="admin-card-head"><h3>앱 버전 정책</h3><span className="admin-pill blue">읽기 전용</span></div><div className="admin-card-body"><p className="page-sub">최소 지원 버전은 서버 코드에서 관리됩니다. 값을 바꾸려면 호환성을 검증한 뒤 API를 배포해야 합니다. 이 화면에서 숫자를 바꿔도 앱에 적용되지 않는 가짜 저장 버튼은 제공하지 않습니다.</p><a className="btn btn-ghost" href={query.data.version.storeUrl} target="_blank" rel="noreferrer">Google Play 보기 ↗</a>{query.data.version.recentRelease && <p className="bm-data-note">최근 릴리스 {query.data.version.recentRelease.date} · {query.data.version.recentRelease.items[0] ?? "내용 없음"}</p>}</div></section>
        <div className="admin-grid"><section className="admin-card"><div className="admin-card-head"><h3>점검 모드</h3><span className="admin-pill warn">미구현</span></div><div className="admin-card-body"><p className="page-sub">모바일 앱과 API에 점검 상태를 읽고 접근을 제한하는 공통 계약이 아직 없습니다. 현재 점검 모드를 켠 것처럼 표시하거나 사용자를 차단할 수 없습니다.</p></div></section><section className="admin-card"><div className="admin-card-head"><h3>기능 플래그</h3><span className="admin-pill warn">미구현</span></div><div className="admin-card-body"><p className="page-sub">Voice Tutor·Challenge 등의 노출은 앱 코드로 결정됩니다. 서버 플래그를 읽는 흐름을 연결하기 전에는 원격에서 끌 수 없습니다.</p></div></section></div>
      </>}
      {tab === "announcements" && <>
        {message && <div className="admin-card admin-card-body"><span className="admin-pill good">{message}</span></div>}
        <div className="admin-grid"><section className="admin-card"><div className="admin-card-head"><h3>전체 공지 푸시</h3><span className="admin-pill warn">발송 후 회수 불가</span></div><div className="admin-card-body"><p className="page-sub">등록된 푸시 토큰을 가진 사용자에게 언어별로 발송합니다. 앱 안의 지속적인 공지 게시물이 아니며, 기기 설정·토큰 상태에 따라 실제 수신은 다를 수 있습니다.</p>{LANGS.map(({ key: lang, label }) => <div key={lang} style={{ marginTop: 14 }}><strong>{label}</strong><label className="admin-field">제목<input maxLength={100} value={title[lang]} onChange={event => setTitle(current => ({ ...current, [lang]: event.target.value }))}/></label><label className="admin-field">내용<textarea maxLength={500} value={body[lang]} onChange={event => setBody(current => ({ ...current, [lang]: event.target.value }))}/></label></div>)}<label className="admin-field">발송 사유<textarea maxLength={500} value={reason} onChange={event => setReason(event.target.value)} placeholder="감사 로그에 남길 발송 사유"/></label><button className="btn btn-primary" disabled={!valid || pending} onClick={() => { setSendError(""); setConfirm(true); }}>발송 내용 확인</button>{sendError && <p className="admin-pill bad" role="alert">발송 확인 필요: {sendError}. 재시도하면 같은 발송 키를 사용합니다.</p>}</div></section><section className="admin-card"><div className="admin-card-head"><h3>이벤트 · 프로모션</h3><span className="admin-pill warn">게시 기능 없음</span></div><div className="admin-card-body"><p className="page-sub">캠페인 시작·종료와 혜택을 앱에 적용하는 서버 계약이 없습니다. 초안을 저장하거나 활성으로 표시해도 사용자 앱에는 반영되지 않으므로 이 화면에서는 게시하지 않습니다.</p><p className="bm-data-note">{query.data.push.definition}</p></div></section></div>
        <section className="admin-card"><div className="admin-card-head"><h3>최근 공지 발송</h3><span className="admin-pill blue">감사 기록 · 최근 10건</span></div><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>시각</th><th>제목</th><th>발송자</th><th className="right">발송 시도 / 대상</th></tr></thead><tbody>{query.data.recentAnnouncements.length ? query.data.recentAnnouncements.map(item => <tr key={item.key}><td>{stamp(item.at)}</td><td><strong>{item.title}</strong></td><td>{item.adminEmail}</td><td className="right">{item.sent.toLocaleString("ko-KR")} / {item.targets.toLocaleString("ko-KR")}</td></tr>) : <tr><td colSpan={4} className="admin-empty">기록된 공지 발송이 없습니다.</td></tr>}</tbody></table></div><div className="admin-card-body"><Link href="/admin">전체 감사 로그 보기 →</Link></div></section>
      </>}
    </>}
    {confirm && <div className="admin-modal-backdrop" onMouseDown={() => !pending && setConfirm(false)}><section className="admin-modal" role="dialog" aria-modal="true" aria-label="전체 공지 발송 확인" onMouseDown={event => event.stopPropagation()}><h3>전체 공지를 지금 발송할까요?</h3><p>현재 푸시 토큰 보유 사용자 {query.data?.push.eligibleUsers.toLocaleString("ko-KR") ?? "—"}명이 잠재 대상입니다. 이 작업은 되돌릴 수 없습니다.</p><div className="page-sub">한국어 미리보기: {title.ko} · {body.ko}</div><p className="page-sub">4개 언어 문구와 사유가 모두 감사 기록에 남지는 않으며, 제목·발송자·사유·발송 수가 기록됩니다.</p>{sendError && <p className="admin-pill bad" role="alert">{sendError}</p>}<div className="admin-modal-actions"><button className="btn btn-ghost" disabled={pending} onClick={() => setConfirm(false)}>취소</button><button className="btn btn-primary" disabled={pending || !valid} onClick={() => void send()}>{pending ? "발송 중…" : "전체 발송 확인"}</button></div></section></div>}
  </div>;
}
