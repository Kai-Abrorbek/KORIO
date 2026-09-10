/**
 * 노드 완주 상자.
 *
 * XP 계산은 여기 없다 — `economy.const.ts` 한 곳에 있다.
 * 예전에는 이 파일에도 `calcLessonXp` 라는 같은 이름의 함수와 문제 타입별
 * XP 표가 있었는데, 아무도 import 하지 않는 죽은 코드였다. 그런데도 새 문제
 * 타입이 생길 때마다 그 표에 추가되고 있었다 — 고쳐도 아무 일도 안 일어나는
 * 곳을 계속 고치고 있었던 것이다. 표는 economy.const 의 QUESTION_XP_BY_TYPE
 * 으로 옮겼고, 여기는 상자만 남긴다.
 */

// 노드 완주 상자 — 등급 미지수(랜덤), 보석 짜게
export function rollChest(): {
  grade: 'wood' | 'silver' | 'gold';
  gems: number;
} {
  const rand = (a: number, b: number) =>
    a + Math.floor(Math.random() * (b - a + 1));
  const r = Math.random();
  if (r < 0.6) return { grade: 'wood', gems: rand(10, 15) };
  if (r < 0.9) return { grade: 'silver', gems: rand(16, 25) };
  return { grade: 'gold', gems: rand(26, 40) };
}

// 상자 보석 = 등급 랜덤 + 진도 보너스(섹션) + 완벽 보너스, 트랙 배율 적용
export function rollChestReward(params: {
  section: number; // 노드 섹션 (진도)
  perfect: boolean; // 노드 전체 무실수 여부
  /**
   * 트랙별 배율. 기본 1 (어휘).
   *
   * 문법은 0.5 다. 문법 노드는 어휘보다 노드당 문제 수가 적어서, 같은 값을
   * 주면 **문법만 돌면서 보석을 캐는 쪽이 이득**이 된다. 배율은 등급이
   * 아니라 보석에만 건다 — 금 상자가 안 나오면 여는 재미가 없다.
   */
  gemScale?: number;
}): { grade: 'wood' | 'silver' | 'gold'; gems: number } {
  const base = rollChest(); // 등급 + 기본 보석 (랜덤)

  const progressBonus = Math.max(0, params.section - 1) * 3; // 섹션1=+0, 섹션2=+3...
  const perfectBonus = params.perfect ? 15 : 0;
  const gems =
    (base.gems + progressBonus + perfectBonus) * (params.gemScale ?? 1);

  return {
    grade: base.grade,
    // 배율을 곱해도 0 은 안 나오게 한다. 빈 상자는 보상이 아니라 실망이다
    gems: Math.max(1, Math.round(gems)),
  };
}
