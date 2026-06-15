import { StrokePoint } from "@/types/hangul";

/** 두 점 사이 거리 */
function dist(a: StrokePoint, b: StrokePoint): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

/** polyline 의 총 길이 */
export function pathLength(points: StrokePoint[]): number {
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    total += dist(points[i - 1], points[i]);
  }
  return total;
}

/** polyline 을 N 개의 균일 간격 점으로 리샘플 */
export function resample(points: StrokePoint[], N: number): StrokePoint[] {
  if (points.length < 2) return points;
  const total = pathLength(points);
  if (total === 0) return [points[0]];

  const step = total / (N - 1);
  const result: StrokePoint[] = [points[0]];
  let acc = 0;
  let prev = points[0];

  for (let i = 1; i < points.length; i++) {
    const cur = points[i];
    const d = dist(prev, cur);
    while (acc + d >= step && result.length < N) {
      const t = (step - acc) / d;
      const np = {
        x: prev.x + (cur.x - prev.x) * t,
        y: prev.y + (cur.y - prev.y) * t,
      };
      result.push(np);
      prev = np;
      acc = 0;
      const remain = dist(prev, cur);
      if (remain === 0) break;
      // continue loop with remaining
    }
    acc += dist(prev, cur);
    prev = cur;
  }
  while (result.length < N) result.push(points[points.length - 1]);
  return result;
}

export type StrokeScore = "perfect" | "good" | "okay" | "fail";

/** 채점 결과 */
export interface StrokeResult {
  score: StrokeScore;
  points: number; // 0-100
  avgDist: number;
}

/**
 * 사용자 획을 채점:
 *  - 길이 비율 (너무 짧거나 너무 길면 감점)
 *  - 평균 거리 (각 target 샘플 점과의 최근접 거리 평균)
 *  - 시작/끝 점 거리
 */
export function scoreStroke(
  target: StrokePoint[],
  user: StrokePoint[],
): StrokeResult {
  if (user.length < 3) {
    return { score: "fail", points: 0, avgDist: 999 };
  }

  const targetLen = pathLength(target);
  const userLen = pathLength(user);
  const ratio = userLen / targetLen;

  // 너무 짧거나 너무 길면 실패
  if (ratio < 0.55 || ratio > 2.5) {
    return { score: "fail", points: 0, avgDist: 999 };
  }

  const N = 12;
  const targetSamples = resample(target, N);

  let totalDist = 0;
  for (const tp of targetSamples) {
    let minD = Infinity;
    for (const up of user) {
      const d = dist(tp, up);
      if (d < minD) minD = d;
    }
    totalDist += minD;
  }
  const avgDist = totalDist / N;

  // 시작/끝 점 보너스 (방향 체크 효과)
  const startDist = dist(target[0], user[0]);
  const endDist = dist(target[target.length - 1], user[user.length - 1]);
  const endpointAvg = (startDist + endDist) / 2;

  // 점수화
  // avgDist 0~25 = perfect, 25~50 = good, 50~80 = okay, > = fail
  // endpointAvg 도 가중치
  const combined = avgDist * 0.7 + endpointAvg * 0.3;

  if (combined < 22)
    return { score: "perfect", points: 100, avgDist: combined };
  if (combined < 42) return { score: "good", points: 75, avgDist: combined };
  if (combined < 70) return { score: "okay", points: 45, avgDist: combined };
  return { score: "fail", points: 0, avgDist: combined };
}
