import { mockAuditSource } from "@/shared/data/mock-audit";

export interface FeatureFlag { id:string; label:string; description:string; enabled:boolean; }
export interface Announcement { id:string; title:string; body:string; audience:string; status:"draft"|"active"; }
export interface Campaign { id:string; name:string; kind:"event"|"promotion"; starts:string; ends:string; status:"draft"|"active"; }
export interface OperationsState { maintenance:boolean; minimumVersion:string; forceUpdate:boolean; flags:FeatureFlag[]; announcements:Announcement[]; campaigns:Campaign[]; }
export interface OperationsSource { load():Promise<OperationsState>; update(patch:Partial<OperationsState>,reason:string):Promise<OperationsState>; }

const KEY="korio_admin_mock_operations";
const INITIAL:OperationsState={
  maintenance:false,minimumVersion:"1.8.0",forceUpdate:false,
  flags:[{id:"voice-tutor",label:"Voice Tutor",description:"음성 튜터 진입점",enabled:true},{id:"daily-challenge",label:"Daily Challenge",description:"일일 챌린지 노출",enabled:true},{id:"new-placement",label:"새 배치고사",description:"신규 레벨 테스트 흐름",enabled:false}],
  announcements:[{id:"notice-1",title:"10월 학습 이벤트",body:"매일 학습하고 보상을 받으세요.",audience:"전체 사용자",status:"active"},{id:"notice-2",title:"앱 업데이트 안내",body:"최신 버전에서 안정성이 개선됐습니다.",audience:"Android",status:"draft"}],
  campaigns:[{id:"event-1",name:"가을 학습 챌린지",kind:"event",starts:"2026-10-10",ends:"2026-10-31",status:"draft"},{id:"promo-1",name:"첫 달 프로모션",kind:"promotion",starts:"2026-10-01",ends:"2026-10-20",status:"active"}],
};
function read():OperationsState { if(typeof window==="undefined")return INITIAL;try{const value=window.localStorage.getItem(KEY);return value?JSON.parse(value) as OperationsState:INITIAL;}catch{return INITIAL;} }
export const mockOperationsSource:OperationsSource={
  async load(){return read();},
  async update(patch,reason){const before=read();const next={...before,...patch};if(typeof window!=="undefined")try{window.localStorage.setItem(KEY,JSON.stringify(next));}catch{/* demo storage unavailable */}
    await mockAuditSource.record({action:"operations.mock_update",targetType:"operations",targetId:"console",targetLabel:"운영 설정",changes:Object.fromEntries(Object.keys(patch).map(key=>[key,{from:before[key as keyof OperationsState],to:next[key as keyof OperationsState]}])),reason});return next;},
};
