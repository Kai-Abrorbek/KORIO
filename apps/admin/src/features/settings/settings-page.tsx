"use client";

import { useMemo, useState } from "react";
import { api } from "@/shared/api/client";
import { useQuery } from "@/shared/api/use-query";
import { useSession } from "@/features/auth/session";
import { ErrorState } from "@/shared/ui/primitives";

type Setting = { key: string; label: string; group: string; unit: string; defaultValue: number; min: number; max: number; integer: boolean; value: number; overridden: boolean };
type SettingsResponse = { refreshSeconds: number; items: Setting[] };

export function SettingsPage() {
  const { can } = useSession();
  const settings = useQuery<SettingsResponse>("/admin/settings");
  const [selected, setSelected] = useState<Setting | null>(null);
  const [value, setValue] = useState("");
  const [reason, setReason] = useState("");
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const grouped = useMemo(() => {
    const groups = new Map<string, Setting[]>();
    for (const item of settings.data?.items ?? []) groups.set(item.group, [...(groups.get(item.group) ?? []), item]);
    return [...groups];
  }, [settings.data]);

  const open = (item: Setting) => { setSelected(item); setValue(String(item.value)); setReason(""); setNotice(""); };
  const save = async () => {
    if (!selected || saving || !can("operations:write")) return;
    const next = Number(value);
    if (!Number.isFinite(next) || next < selected.min || next > selected.max || (selected.integer && !Number.isInteger(next)) || reason.trim().length < 5) return;
    if (!window.confirm(`${selected.label}: ${selected.value} → ${next} ${selected.unit}\n모든 사용자에게 적용할까요?`)) return;
    setSaving(true); setNotice("");
    try {
      await api.patch(`/admin/settings/${encodeURIComponent(selected.key)}`, { value: next, reason: reason.trim() });
      setNotice("설정을 저장했어요. 현재 서버에 즉시 적용되고 다른 서버에는 최대 5초 후 반영됩니다.");
      setSelected(null); settings.reload();
    } catch (error) { setNotice(`저장 실패: ${error instanceof Error ? error.message : "알 수 없는 오류"}`); }
    finally { setSaving(false); }
  };

  if (!can("analytics:read")) return <div className="admin-card admin-empty">설정 조회 권한이 없습니다.</div>;
  return <div className="admin-page">
    <div className="admin-page-head"><div><h2>앱 숫자 설정</h2><p>학습 보상·에너지·이용권 가격을 한 곳에서 관리합니다. 서버 실행 경로에 반영되며 변경 사유가 감사 로그에 남습니다.</p></div><span className="admin-pill blue">실시간 운영 설정</span></div>
    <section className="admin-card admin-card-body"><strong>적용 범위</strong><p className="page-sub">여기에는 안전하게 변경 가능한 숫자만 표시합니다. 새 값은 현재 API 인스턴스에 즉시, 다른 인스턴스에 최대 {settings.data?.refreshSeconds ?? 5}초 후 적용됩니다. 이미 지급된 보상은 소급 변경되지 않습니다. 앱에서 보이는 에너지·퀘스트·이용권 수치는 다음 API 조회 때 갱신됩니다.</p></section>
    {notice && <p role="status" className="page-sub">{notice}</p>}
    {settings.error ? <section className="admin-card"><ErrorState code={settings.error} onRetry={settings.reload}/></section> : settings.loading && !settings.data ? <div className="admin-card skeleton" style={{ height: 320 }}/> : grouped.map(([group, items]) => <section className="admin-card" key={group}><div className="admin-card-head"><h3>{group}</h3><span className="page-sub">{items.length}개 항목</span></div><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>항목</th><th className="right">현재 값</th><th className="right">기본값</th><th>허용 범위</th><th>변경</th></tr></thead><tbody>{items.map(item => <tr key={item.key}><td><strong>{item.label}</strong><br/><small><code>{item.key}</code></small></td><td className="right">{item.value.toLocaleString("ko-KR")} {item.unit} {item.overridden && <span className="admin-pill blue">변경됨</span>}</td><td className="right">{item.defaultValue.toLocaleString("ko-KR")}</td><td>{item.min}–{item.max} {item.unit}</td><td>{can("operations:write") ? <button type="button" className="btn btn-ghost" onClick={() => open(item)}>수정</button> : <span className="page-sub">조회만 가능</span>}</td></tr>)}</tbody></table></div></section>)}
    {selected && <div className="admin-drawer-backdrop" onMouseDown={() => setSelected(null)}><aside className="admin-drawer" onMouseDown={event => event.stopPropagation()}><button type="button" className="btn btn-ghost" onClick={() => setSelected(null)}>← 닫기</button><h3 style={{ marginTop: 20 }}>{selected.label}</h3><p className="page-sub"><code>{selected.key}</code></p><div className="admin-detail-grid"><div><small>현재 값</small><strong>{selected.value} {selected.unit}</strong></div><div><small>코드 기본값</small><strong>{selected.defaultValue} {selected.unit}</strong></div></div><p className="page-sub">허용 범위: {selected.min}–{selected.max} {selected.unit}{selected.integer ? " · 정수만" : ""}</p><label className="page-sub" htmlFor="setting-value">새 값</label><input id="setting-value" type="number" min={selected.min} max={selected.max} step={selected.integer ? 1 : "any"} value={value} onChange={event => setValue(event.target.value)} style={{ width: "100%" }}/><label className="page-sub" htmlFor="setting-reason">변경 사유</label><textarea id="setting-reason" value={reason} onChange={event => setReason(event.target.value)} maxLength={500} placeholder="운영 변경 이유를 5자 이상 입력하세요" style={{ width: "100%", minHeight: 110 }}/><button type="button" className="btn btn-primary" style={{ marginTop: 12 }} onClick={() => void save()} disabled={saving || !Number.isFinite(Number(value)) || reason.trim().length < 5}>{saving ? "저장 중…" : "변경 적용"}</button>{notice && <p role="status" className="page-sub">{notice}</p>}</aside></div>}
  </div>;
}
