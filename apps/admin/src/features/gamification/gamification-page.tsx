"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useConsole } from "@/widgets/console-context";

type Tab="overview"|"settings";
interface Bucket { label:string; count:number; }
interface Anomaly { userId:string; nickname:string; signal:string; value:string; severity:"warning"|"critical"; }
interface GameSnapshot { totalXp:number; averageStreak:number; activeLeagues:number; challengeRate:number; xp:Bucket[]; streak:Bucket[]; leagues:Bucket[]; anomalies:Anomaly[]; }
interface GameSource { snapshot():Promise<GameSnapshot>; }
const mockGameSource:GameSource={async snapshot(){return {totalXp:2849200,averageStreak:6.8,activeLeagues:1280,challengeRate:42.7,xp:[{label:"0–99",count:1090},{label:"100–499",count:1560},{label:"500–999",count:1210},{label:"1K–5K",count:2160},{label:"5K–10K",count:820},{label:"10K+",count:340}],streak:[{label:"0일",count:740},{label:"1–3일",count:1620},{label:"4–7일",count:1340},{label:"8–14일",count:910},{label:"15–30일",count:480},{label:"31일+",count:180}],leagues:[{label:"Bronze",count:490},{label:"Silver",count:341},{label:"Gold",count:224},{label:"Sapphire",count:126},{label:"Ruby+",count:99}],anomalies:[{userId:"usr_018",nickname:"jiyun.study",signal:"짧은 시간에 XP 급증",value:"25분 · +3,450 XP",severity:"critical"},{userId:"usr_041",nickname:"ko_builder",signal:"일일 XP 상한 근접",value:"4,820 / 5,000 XP",severity:"warning"},{userId:"usr_053",nickname:"happy_learner",signal:"연속 학습 기록 검토",value:"123일 streak",severity:"warning"}]};}};

function Bars({items,color="var(--brand)"}:{items:Bucket[];color?:string}) { const max=Math.max(...items.map(i=>i.count),1);return <div>{items.map(item=><div className="admin-hbar" key={item.label}><span className="admin-hbar-label">{item.label}</span><div className="admin-hbar-track"><span style={{width:`${item.count/max*100}%`,background:color}}/></div><span className="admin-hbar-value">{item.count.toLocaleString("ko-KR")}</span></div>)}</div>; }

const SERVER_CONSTANTS=[
  {label:"시드 XP 지급 배율",value:"÷ 3",source:"XP_AWARD_DIVISOR"},
  {label:"하루 XP 상한",value:"5,000 XP",source:"DAILY_XP_CAP"},
  {label:"요청당 XP 상한",value:"1,000 XP",source:"SINGLE_GRANT_XP_CAP"},
  {label:"콤보 1회 보너스",value:"1 XP",source:"COMBO_XP_PER"},
  {label:"Streak 보상 주기",value:"3일",source:"STREAK_CHEST_EVERY_DAYS"},
  {label:"Streak 보석 보상",value:"200 Gems",source:"STREAK_CHEST_GEMS"},
  {label:"노드 복습 보상",value:"13 XP",source:"PRACTICE_BASE_XP.nodeReview"},
  {label:"유닛 최종 보상",value:"63 XP",source:"PRACTICE_BASE_XP.unitFinal"},
];

export function GamificationPage(){
  const {range}=useConsole();
  const [tab,setTab]=useState<Tab>("overview");
  const [data,setData]=useState<GameSnapshot|null>(null);
  useEffect(()=>{const value=new URLSearchParams(window.location.search).get("tab");if(value==="settings")setTab("settings");mockGameSource.snapshot().then(setData);},[]);
  return <div className="admin-page"><div className="admin-page-head"><div><h2>게이미피케이션</h2><p>XP, Streak, Energy, League와 챌린지의 상태를 봅니다. 수치는 mock 데이터입니다.</p></div><span className="admin-pill blue">{range.label}</span></div><div className="admin-tabs"><button className={tab==="overview"?"is-active":""} onClick={()=>{setTab("overview");window.history.replaceState(null,"","/gamification");}}>활동 분석</button><button className={tab==="settings"?"is-active":""} onClick={()=>{setTab("settings");window.history.replaceState(null,"","/gamification?tab=settings");}}>설정 기준값</button></div>
    {tab==="overview" && data && <><div className="admin-grid four"><div className="admin-card admin-kpi"><div className="admin-kpi-label">누적 XP</div><div className="admin-kpi-value">{data.totalXp.toLocaleString("ko-KR")}</div></div><div className="admin-card admin-kpi"><div className="admin-kpi-label">평균 Streak</div><div className="admin-kpi-value">{data.averageStreak}일</div></div><div className="admin-card admin-kpi"><div className="admin-kpi-label">League 참여자</div><div className="admin-kpi-value">{data.activeLeagues.toLocaleString("ko-KR")}</div></div><div className="admin-card admin-kpi"><div className="admin-kpi-label">Challenge 참여율</div><div className="admin-kpi-value">{data.challengeRate}%</div></div></div><div className="admin-grid"><section className="admin-card"><div className="admin-card-head"><h3>XP 분포</h3></div><div className="admin-card-body"><Bars items={data.xp}/></div></section><section className="admin-card"><div className="admin-card-head"><h3>Streak 분포</h3></div><div className="admin-card-body"><Bars items={data.streak} color="var(--series-4)"/></div></section></div><div className="admin-grid"><section className="admin-card"><div className="admin-card-head"><h3>League 참여</h3></div><div className="admin-card-body"><Bars items={data.leagues} color="var(--series-6)"/></div></section><section className="admin-card"><div className="admin-card-head"><h3>이상 활동 후보</h3><span className="admin-pill warn">검토 필요</span></div><div className="admin-card-body">{data.anomalies.map(item=><div className="admin-alert-row" key={item.userId}><span className={`admin-pill ${item.severity==="critical"?"bad":"warn"}`}>{item.severity}</span><div><strong>{item.nickname}</strong><div className="page-sub">{item.signal} · {item.value}</div></div><Link href="/users">사용자 보기 →</Link></div>)}</div></section></div></>}
    {tab==="settings" && <><div className="admin-card admin-card-body"><strong>현재 서버 상수</strong><p className="page-sub">아래 값은 `apps/api/src/lessons/economy.const.ts`에 존재하는 기준값입니다. 서버 설정 API가 없어 이 화면에서는 변경할 수 없습니다.</p></div><section className="admin-card"><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>항목</th><th>현재 값</th><th>코드 상수</th><th>변경 방법</th></tr></thead><tbody>{SERVER_CONSTANTS.map(item=><tr key={item.source}><td><strong>{item.label}</strong></td><td>{item.value}</td><td><code>{item.source}</code></td><td><span className="admin-pill">코드 변경 · 배포 필요</span></td></tr>)}</tbody></table></div></section></>}
  </div>;
}
