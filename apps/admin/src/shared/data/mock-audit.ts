export interface AuditEntry {
  id: string;
  at: string;
  adminEmail: string;
  adminRole: string;
  action: string;
  targetType: string;
  targetId: string;
  targetLabel: string;
  changes: Record<string, { from: unknown; to: unknown }>;
  reason: string;
  success: boolean;
  ip: string;
}

const KEY = "korio_admin_mock_audit";
const INITIAL: AuditEntry[] = [
  { id:"audit-1",at:"2026-10-05T08:22:00.000Z",adminEmail:"admin@korio.demo",adminRole:"super_admin",action:"question.update",targetType:"question",targetId:"Q-124",targetLabel:"문법 질문 Q-124",changes:{answer:{from:"학교에 가요",to:"학교에 갑니다"}},reason:"표현 오류 수정",success:true,ip:"demo" },
  { id:"audit-2",at:"2026-10-04T11:09:00.000Z",adminEmail:"support@korio.demo",adminRole:"support",action:"user.unban",targetType:"user",targetId:"usr_038",targetLabel:"learner38@example.com",changes:{status:{from:"banned",to:"active"}},reason:"고객 문의 확인",success:true,ip:"demo" },
  { id:"audit-3",at:"2026-10-03T02:31:00.000Z",adminEmail:"admin@korio.demo",adminRole:"super_admin",action:"subscription.override",targetType:"subscription",targetId:"sub_011",targetLabel:"usr_011",changes:{status:{from:"free",to:"active"}},reason:"결제 검증 후 복원",success:true,ip:"demo" },
];

function read(): AuditEntry[] {
  if (typeof window === "undefined") return INITIAL;
  try { const raw=window.localStorage.getItem(KEY);return raw?[...JSON.parse(raw) as AuditEntry[],...INITIAL]:INITIAL; } catch { return INITIAL; }
}

export interface AuditSource {
  list(): Promise<AuditEntry[]>;
  record(entry: Omit<AuditEntry,"id"|"at"|"adminEmail"|"adminRole"|"ip"|"success">): Promise<AuditEntry>;
}

export const mockAuditSource: AuditSource = {
  async list(){return read();},
  async record(entry){
    const item:AuditEntry={...entry,id:`audit-${Date.now()}`,at:new Date().toISOString(),adminEmail:"admin@korio.demo",adminRole:"super_admin",ip:"demo",success:true};
    if(typeof window!=="undefined")try{const current=read().filter(row=>!INITIAL.some(seed=>seed.id===row.id));window.localStorage.setItem(KEY,JSON.stringify([item,...current]));}catch{/* demo storage unavailable */}
    return item;
  },
};
