/**
 * 문장 자르기.
 *
 * 하이브리드 튜터의 지연은 대부분 여기서 정해진다.
 *  - 너무 늦게 자르면 유저가 답변 내내 침묵을 듣는다
 *  - 너무 일찍 자르면 "오늘" "은" 이 따로 읽혀서 말이 끊긴다
 *
 * 실행: npx tsx src/__scratch/sentence-chunker.test.ts
 *       (또는 node --experimental-strip-types)
 */
import { takeChunks } from "../features/tutor/services/sentence-chunker";

let fail = 0;
const say = (ok: boolean, msg: string) => {
  if (!ok) fail++;
  console.log(`${ok ? "✅" : "❌"} ${msg}`);
};

/** 델타를 한 조각씩 흘려 넣어 실제 스트리밍처럼 돌린다 */
function stream(deltas: string[]): string[] {
  let buf = "";
  const out: string[] = [];
  for (const d of deltas) {
    buf += d;
    const r = takeChunks(buf);
    buf = r.rest;
    out.push(...r.chunks);
  }
  out.push(...takeChunks(buf, true).chunks);
  return out;
}

// ── 기본 ─────────────────────────────────────────────────────
{
  const r = takeChunks("오늘 뭐 했어요? 재밌었어요?");
  say(r.chunks.length === 1, "문장 끝이 확정된 것만 내보낸다");
  say(r.chunks[0] === "오늘 뭐 했어요?", "첫 문장이 통째로 나온다");
  say(r.rest === " 재밌었어요?", "마지막은 더 올 수 있어서 남겨둔다");
}
{
  // flush = 응답이 끝났다. 남은 꼬리를 내보내야 끝말이 안 잘린다
  const r = takeChunks("재밌었어요?", true);
  say(r.chunks[0] === "재밌었어요?" && r.rest === "", "flush 면 꼬리도 나간다");
}
{
  const r = takeChunks("아직 문장이 안 끝났는데");
  say(r.chunks.length === 0, "경계가 없으면 아무것도 안 내보낸다");
}

// ── 스트리밍 ─────────────────────────────────────────────────
{
  const out = stream(["오늘", "은 ", "뭐 ", "했", "어요?"]);
  say(out.length === 1, "토큰이 쪼개져 와도 한 문장으로 합친다");
  say(out[0] === "오늘은 뭐 했어요?", `합쳐진 결과: ${out[0]}`);
}
{
  const out = stream(["어제 친구랑 영화관에 갔어요? ", "무슨 영화 봤어요?"]);
  say(out.length === 2, "두 문장이면 두 번 읽는다");
  say(out[0] === "어제 친구랑 영화관에 갔어요?", "첫 문장 경계가 맞다");
}
{
  // 이게 하이브리드의 이유다: 첫 문장이 끝나는 즉시 소리를 낼 수 있어야 한다
  let buf = "";
  let firstAt = -1;
  const deltas = ["안녕하세요! ", "저는 서연이에요. ", "오늘 뭐 했어요?"];
  deltas.forEach((d, i) => {
    buf += d;
    const r = takeChunks(buf);
    buf = r.rest;
    if (r.chunks.length && firstAt < 0) firstAt = i;
  });
  say(firstAt === 0, "첫 문장은 첫 델타에서 바로 나간다 (답변을 안 기다린다)");
}

// ── 자르면 안 되는 자리 ───────────────────────────────────────
{
  const r = takeChunks("가격은 3.5 달러예요.", true);
  say(r.chunks.length === 1, "소수점 가운데를 자르지 않는다");
  say(r.chunks[0] === "가격은 3.5 달러예요.", `결과: ${r.chunks[0]}`);
}
{
  const out = stream(['"안녕하세요!" ', "라고 해요."]);
  say(out[0] === '"안녕하세요!"', "닫는 따옴표까지 같이 가져간다");
}
{
  const out = stream(["정말요?! ", "대단해요."]);
  say(out[0] === "정말요?!", "연속 문장부호를 쪼개지 않는다");
}

// ── 길어질 때 ────────────────────────────────────────────────
{
  // 모델이 마침표 없이 길게 이어가는 경우. 다 기다리면 자른 의미가 없다
  const long =
    "그러니까 저는 어제 친구를 만나서 같이 밥을 먹고 영화를 보고 그다음에 카페에 가서 이야기를 아주 오래 했는데 정말 즐거웠고 다음에도 또 만나기로 했고 그래서 오늘은 조금 피곤하지만 기분은 아주 좋은 그런 하루였어요";
  const out = stream([long]);
  say(out.length >= 2, `경계가 없어도 잘라서 내보낸다 (${out.length}조각)`);
  say(
    out.every((c) => c.length <= 95),
    "한 조각이 지나치게 길지 않다",
  );
  say(out.join("").replace(/\s/g, "") === long.replace(/\s/g, ""), "글자를 잃지 않는다");
}

// ── 안 깨져야 하는 것 ─────────────────────────────────────────
{
  const r = takeChunks("", true);
  say(r.chunks.length === 0 && r.rest === "", "빈 입력도 안전");
}
{
  const r = takeChunks("   ", true);
  say(r.chunks.length === 0, "공백만 있으면 아무것도 안 내보낸다");
}
{
  const out = stream(["...", "그래서요?"]);
  say(out.join("").includes("그래서요?"), "줄임표가 있어도 내용을 잃지 않는다");
}

console.log(fail ? `\n❌ ${fail}건 실패` : "\n🎉 전부 통과");
process.exit(fail ? 1 : 0);
