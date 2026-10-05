/** Mock fixtures follow the existing section/unit/node/lesson/question and attempt concepts. */
export interface StudyRow { id:string; title:string; section:number; unit:number; starts:number; completes:number; accuracy:number; minutes:number; }
export interface QuestionRow { id:string; code:string; type:string; lessonId:string; prompt:string; attempts:number; correctRate:number; skipRate:number; seconds:number; dropRate:number; }
export interface FunnelPoint { id:string; label:string; users:number; questionId?:string; }
export interface CohortRow { week:string; size:number; d1:number|null; d7:number|null; d30:number|null; }

const TITLES=["한글 기초","자기소개","일상과 시간","교통과 장소","학교 생활","건강과 약속","한국 생활","시험 준비"];
const TYPES=["type_answer","translate_builder","sentence_builder","image_choice","grammar_blank","listening","reply_builder","word_matching"];

export interface AnalyticsSource {
  sections(): Promise<StudyRow[]>;
  units(section:number): Promise<StudyRow[]>;
  lessons(section:number,unit:number): Promise<StudyRow[]>;
  questions(lessonId?:string): Promise<QuestionRow[]>;
  lessonFunnel(lessonId:string): Promise<FunnelPoint[]>;
  retention(): Promise<CohortRow[]>;
}

const sections:StudyRow[]=TITLES.slice(0,6).map((title,i)=>({id:`section-${i+1}`,title,section:i+1,unit:0,starts:1780-i*212,completes:1510-i*205,accuracy:Math.max(58,85-i*4),minutes:48+i*9}));
const unitRows=(section:number):StudyRow[]=>Array.from({length:7},(_,i)=>({id:`s${section}-u${i+1}`,title:`Unit ${i+1} · ${TITLES[(section+i)%TITLES.length]}`,section,unit:i+1,starts:540-i*43-section*9,completes:466-i*47-section*8,accuracy:85-i*2-section,minutes:18+i*2}));
const lessonRows=(section:number,unit:number):StudyRow[]=>Array.from({length:5},(_,i)=>({id:`S${section}-U${unit}-L${i+1}`,title:`Lesson ${i+1} · ${["어휘","문법","표현","듣기","복습"][i]}`,section,unit,starts:181-i*17,completes:159-i*18,accuracy:84-i*4,minutes:6+i*2}));
const questions:QuestionRow[]=Array.from({length:32},(_,i)=>({id:`question-${i+1}`,code:`Q-${String(i+1).padStart(3,"0")}`,type:TYPES[i%TYPES.length]!,lessonId:`S${Math.floor(i/12)+1}-U${Math.floor(i/5)%4+1}-L${i%5+1}`,prompt:["알맞은 표현을 완성하세요","문장을 한국어로 번역하세요","그림과 맞는 단어를 고르세요","들은 내용을 입력하세요"][i%4]!,attempts:450-i*9,correctRate:i===5?18:Math.max(28,88-(i*7)%53),skipRate:i===5?34:2+(i*3)%18,seconds:12+(i*5)%38,dropRate:i===5?27:3+(i*4)%21}));

export const mockAnalyticsSource:AnalyticsSource={
  async sections(){return sections;},
  async units(section){return unitRows(section);},
  async lessons(section,unit){return lessonRows(section,unit);},
  async questions(lessonId){return lessonId?questions.filter(q=>q.lessonId===lessonId):questions;},
  async lessonFunnel(lessonId){const selected=questions.filter(q=>q.lessonId===lessonId);const ids=selected.length?selected:questions.slice(0,6);const counts=[190,186,180,171,145,139,129];return [{id:"start",label:"Lesson Start",users:190},...ids.slice(0,5).map((q,i)=>({id:`q${i}`,label:`Question ${i+1} · ${q.type}`,users:counts[i+1]!,questionId:q.id})),{id:"complete",label:"Lesson Complete",users:129}];},
  async retention(){return Array.from({length:10},(_,i)=>({week:`2026-W${String(31+i).padStart(2,"0")}`,size:155+i*12,d1:48+(i*3)%14,d7:i>8?null:28+(i*5)%15,d30:i>5?null:14+(i*3)%13}));},
};
