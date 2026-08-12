/**
 * 섹션 1 시드 규칙 검사.
 *
 * 문제 하나가 문법적으로 맞는지가 아니라, 레슨으로 앉혔을 때
 * 실제로 풀 수 있고 지루하지 않은지를 본다. 조립형에서 정답 어절이
 * options 에 없으면 화면은 멀쩡한데 정답을 만들 수가 없고, 같은 타입이
 * 연달아 나오면 같은 문제를 두 번 푸는 느낌이 든다.
 *
 * 실행: pnpm --filter api seed:validate-section1
 */

import * as section1 from './data/section1';

/**
 * 유닛별로 언제 무엇이 열리는지.
 * 타이핑은 자판을 못 치는 구간이 지나야 하고, reply_builder 는 상대 발화를
 * 알아들을 수 있어야 성립한다.
 */
const TYPING_TYPES = ['type_answer', 'translate_type', 'listen_type', 'listen_fill'];
const TYPING_FROM_UNIT = 5;
const REPLY_BUILDER_FROM_UNIT = 2;

/**
 * 새 규칙으로 다시 쓴 유닛. 여기 적힌 것만 검사한다.
 *
 * 나머지는 예전 시드라 지금 기준에 전부 걸린다. 한 번에 고칠 수 없으므로
 * 유닛을 다시 쓸 때마다 여기에 번호를 추가한다. 그래야 통과한 유닛이
 * 다시 깨지는 걸 잡을 수 있다.
 */
const STRICT_UNITS = [1, 2];

const S = section1 as Record<string, any>;
const ALL_UNITS = Object.keys(S)
  .map((k) => k.match(/^UNIT(\d+)_NODES$/)?.[1])
  .filter((n): n is string => !!n)
  .map(Number)
  .sort((a, b) => a - b);
const UNITS = ALL_UNITS.filter((n) => STRICT_UNITS.includes(n));
const SKIPPED = ALL_UNITS.filter((n) => !STRICT_UNITS.includes(n));

const Q: Record<string, any> = {};
const NODES: any[] = [];
for (const n of UNITS) {
  Object.assign(Q, S[`UNIT${n}_QUESTIONS`] ?? {});
  NODES.push(...(S[`UNIT${n}_NODES`] ?? []));
}

const err: string[] = [];
const warn: string[] = [];
const L4 = (v: any) => v && ['ko','uz','en','ru'].every(l => typeof v[l] === 'string' && v[l].length > 0);

for (const node of NODES) {
  for (const les of node.lessons) {
    const keys: string[] = les.questions;
    const tag = `u${node.unit}n${node.order}l${les.order}`;

    if (keys.length < 17 || keys.length > 20)
      err.push(`${tag}: 문제 ${keys.length}개 (17~20이어야 함)`);

    // 같은 타입 연속 금지
    for (let i = 1; i < keys.length; i++) {
      const a = Q[keys[i-1]]?.type, b = Q[keys[i]]?.type;
      if (a && a === b) err.push(`${tag}: ${keys[i-1]} → ${keys[i]} 같은 타입(${a}) 연속`);
    }

    const cnt: Record<string, number> = {};
    for (const k of keys) {
      const q = Q[k];
      if (!q) { err.push(`${tag}: 없는 키 ${k}`); continue; }
      cnt[q.type] = (cnt[q.type] ?? 0) + 1;

      // 유닛에 따라 열리는 타입
      if (TYPING_TYPES.includes(q.type) && node.unit < TYPING_FROM_UNIT)
        err.push(`${k}: 타이핑 타입(${q.type})은 유닛 ${TYPING_FROM_UNIT}부터 — 아직 자판을 못 친다`);
      if (q.type === 'reply_builder' && node.unit < REPLY_BUILDER_FROM_UNIT)
        err.push(`${k}: reply_builder 는 유닛 ${REPLY_BUILDER_FROM_UNIT}부터 — 상대 발화를 못 알아듣는다`);

      // 4개 언어
      if (!L4(q.instruction)) err.push(`${k}: instruction 4개 언어 누락`);
      if (!L4(q.hint)) err.push(`${k}: hint 4개 언어 누락`);
      if (q.explanation && !L4(q.explanation)) err.push(`${k}: explanation 4개 언어 누락`);
      const needsTr = !['word_matching','audio_match'].includes(q.type);
      if (needsTr && !L4(q.answerTranslation)) err.push(`${k}: answerTranslation 4개 언어 누락`);

      // 매칭류: 단어만 + 5쌍
      if (['word_matching','audio_match'].includes(q.type)) {
        if (q.pairs?.length !== 5) err.push(`${k}: pairs ${q.pairs?.length}쌍 (5쌍이어야 함)`);
        for (const p of q.pairs ?? []) {
          if (p.korean.includes(' ')) err.push(`${k}: pairs 에 띄어쓰기 있는 '${p.korean}' — 단어만`);
          if ([...p.korean].length > 5) err.push(`${k}: '${p.korean}' 너무 길다 (5자 이하)`);
        }
      }

      // 선택형: 정답이 options 안에 있어야
      if (['fill_in_blank'].includes(q.type)) {
        if (!q.options?.includes(q.answer)) err.push(`${k}: answer '${q.answer}' 가 options 에 없다`);
        if ((q.options?.length ?? 0) < q.answer.split(' ').length + 2)
          warn.push(`${k}: 오답 distractor 가 적다 (options ${q.options?.length})`);
        if (q.sentenceTemplate) err.push(`${k}: 유닛1은 단일 빈칸만 (sentenceTemplate 금지)`);
      }
      if (q.type === 'dialog_complete') {
        if (!q.options?.includes(q.answer)) err.push(`${k}: answer 가 options 에 없다`);
        for (const [i, l] of (q.dialogLines ?? []).entries()) {
          if (!['npc','user'].includes(l.speaker)) err.push(`${k}: dialogLines[${i}].speaker 이상`);
          if (/^[가-힣A-Za-z]+\s*:/.test(l.text)) err.push(`${k}: dialogLines[${i}] 에 화자 이름이 박혀 있다 — 화면이 배지를 그린다`);
        }
        const last = q.dialogLines?.[q.dialogLines.length - 1];
        if (last?.speaker !== 'npc') err.push(`${k}: 마지막 줄이 npc 여야 한다 (빈 자리가 user 차례)`);
      }
      if (q.type === 'image_choice') {
        if (!q.choices?.some((c: any) => c.text === q.answer)) err.push(`${k}: answer 가 choices 에 없다`);
        if (q.choices?.[0]?.text === q.answer) warn.push(`${k}: 정답이 첫 번째 — 순서 섞어라`);
      }
      // 조립형: 정답 어절이 전부 options 에 있어야
      if (['sentence_builder','word_arrange','translate_builder','reply_builder'].includes(q.type)) {
        const need = q.answer.split(' ');
        // 칩 하나를 눌러 끝나는 문제는 조립이 아니라 객관식이다.
        // 어순을 배우게 하려면 최소 두 덩어리여야 한다.
        if (need.length < 2) err.push(`${k}: 정답이 한 덩어리다 — 조립할 게 없다`);
        const miss = need.filter((w: string) => !q.options?.includes(w));
        if (miss.length) err.push(`${k}: options 에 [${miss}] 없어 '${q.answer}' 조립 불가`);
        // 칩은 options 항목 하나당 하나만 생긴다. 정답에 같은 어절이 두 번
        // 나오면 options 에도 두 번 적어야 조립이 된다.
        const needCnt: Record<string, number> = {};
        for (const w of need) needCnt[w] = (needCnt[w] ?? 0) + 1;
        for (const [w, n] of Object.entries(needCnt)) {
          const have = (q.options ?? []).filter((o: string) => o === w).length;
          if (have < n) err.push(`${k}: '${w}' 가 정답에 ${n}번 나오는데 options 엔 ${have}개뿐 — 칩이 모자란다`);
        }
        if ((q.options?.length ?? 0) <= need.length) err.push(`${k}: 오답 어절이 없다`);
        if (q.options?.slice(0, need.length).join(' ') === q.answer) err.push(`${k}: options 가 정답 순서 그대로다`);
      }
      // translate_builder 는 제목에 고정 문구를 쓰고 말풍선에 instruction 을
      // 띄운다. 그래서 instruction 이 "옮겨야 할 문장"이어야 하고, 공용 지시문을
      // 그대로 쓰면 뭘 만들지 알 수가 없다. npcText 는 이제 렌더되지 않는다.
      if (q.type === 'translate_builder') {
        if (q.npcText) err.push(`${k}: translate_builder 의 npcText 는 화면에 안 나온다 — instruction 으로 옮겨라`);
        const shared = keys.some(
          (o) => o !== k && Q[o]?.type !== 'translate_builder' && Q[o]?.instruction?.ko === q.instruction?.ko,
        );
        if (shared) err.push(`${k}: instruction 이 공용 지시문이다 — 옮길 문장을 4개 언어로 적어야 한다`);
        if (q.instruction?.ko?.includes(q.answer)) {
          err.push(`${k}: instruction.ko 에 정답이 그대로 들어 있다 — 베끼게 된다`);
        }
      }

      // reply_builder 는 말풍선에 npcText 를 띄우고 스피커로 읽어 준다.
      // 없으면 아무 말도 안 한 상대에게 대답하는 꼴이 된다.
      if (q.type === 'reply_builder' && !q.npcText) {
        err.push(`${k}: reply_builder 에 npcText 가 없다 — 대답할 상대 발화가 있어야 한다`);
      }

      // word_arrange 는 speakAuto(npcText ?? answer) 로 읽는다. npcText 를 두면
      // 정답 대신 상황 설명이 음성으로 나가고, 섹션 1 학습자는 그걸 들어도
      // 알아듣지 못한다. 정답을 들려주고 배열하게 두는 게 맞다.
      if (q.type === 'word_arrange' && q.npcText) {
        err.push(`${k}: word_arrange 에 npcText 를 두면 정답 대신 이게 읽힌다 — 지워라`);
      }

      // speaking: 한 사람, 짧게
      if (q.type === 'speaking') {
        if (q.answer.includes('\n')) err.push(`${k}: speaking 에 줄바꿈(대화문) 금지`);
        if ([...q.answer].length > 16) err.push(`${k}: speaking 문장이 길다 (${[...q.answer].length}자)`);
        if (!q.audioText) err.push(`${k}: speaking 에 audioText 없음`);
      }
    }
    const types = Object.entries(cnt).map(([t,n]) => `${t}:${n}`).join('  ');
    console.log(`${tag}  ${keys.length}문제 | ${types}`);
  }
}

// 레슨에 안 걸린 문제는 시딩돼도 아무도 못 푼다
const used = new Set(NODES.flatMap((n) => n.lessons.flatMap((l: any) => l.questions)));
const orphans = Object.keys(Q).filter((k) => !used.has(k));
if (orphans.length) err.push(`레슨에 안 들어간 문제 ${orphans.length}개: ${orphans.slice(0, 5)}...`);

// 노드/레슨 구조는 유닛 단위로 본다 — 노드 4~6개, 노드당 레슨 4개 고정
console.log('');
for (const unit of UNITS) {
  const nodes = NODES.filter((n) => n.unit === unit);
  if (nodes.length < 4 || nodes.length > 6) {
    err.push(`유닛 ${unit}: 노드가 ${nodes.length}개 (4~6개)`);
  }
  for (const n of nodes) {
    if (n.lessons.length !== 4) {
      err.push(`유닛 ${unit} 노드 ${n.order}: 레슨 ${n.lessons.length}개 (4개 고정)`);
    }
  }
  const lessons = nodes.reduce((a, n) => a + n.lessons.length, 0);
  const qs = nodes.reduce(
    (a, n) => a + n.lessons.reduce((b: number, l: any) => b + l.questions.length, 0),
    0,
  );
  console.log(`유닛 ${unit}  노드 ${nodes.length} · 레슨 ${lessons} · 문제 ${qs}`);
}

console.log(`\n합계 문제 ${Object.keys(Q).length}개`);
if (SKIPPED.length) {
  console.log(`(아직 안 고친 유닛 ${SKIPPED.join(', ')} 는 검사에서 뺐다)`);
}
for (const w of warn) console.log(`⚠️  ${w}`);
if (err.length) { console.log(`\n❌ ${err.length}건`); err.forEach(e => console.log('- ' + e)); process.exit(1); }
console.log('\n🎉 규칙 검사 통과');
