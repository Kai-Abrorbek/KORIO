import { StrokePoint } from "@/types/hangul";

function dist(a: StrokePoint, b: StrokePoint): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function pathLength(points: StrokePoint[]): number {
  let total = 0;
  for (let i = 1; i < points.length; i++)
    total += dist(points[i - 1], points[i]);
  return total;
}

// polyline을 정확히 N개 균일 점으로 리샘플
export function resample(points: StrokePoint[], N: number): StrokePoint[] {
  if (points.length < 2)
    return points.length ? new Array(N).fill(points[0]) : [];
  const total = pathLength(points);
  if (total === 0) return new Array(N).fill(points[0]);

  const step = total / (N - 1);
  const result: StrokePoint[] = [points[0]];
  let acc = 0;
  let prev = points[0];
  let i = 1;

  while (i < points.length && result.length < N) {
    const cur = points[i];
    const d = dist(prev, cur);
    if (acc + d >= step) {
      const t = (step - acc) / d;
      const np = {
        x: prev.x + (cur.x - prev.x) * t,
        y: prev.y + (cur.y - prev.y) * t,
      };
      result.push(np);
      prev = np;
      acc = 0;
    } else {
      acc += d;
      prev = cur;
      i++;
    }
  }
  while (result.length < N) result.push(points[points.length - 1]);
  return result.slice(0, N);
}

// 바운딩 박스 (산만함/위치 체크용)
function bbox(points: StrokePoint[]) {
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  for (const p of points) {
    if (p.x < minX) minX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.x > maxX) maxX = p.x;
    if (p.y > maxY) maxY = p.y;
  }
  return {
    minX,
    minY,
    maxX,
    maxY,
    cx: (minX + maxX) / 2,
    cy: (minY + maxY) / 2,
    w: maxX - minX,
    h: maxY - minY,
  };
}

export type StrokeScore = "perfect" | "good" | "okay" | "fail";

export interface StrokeResult {
  score: StrokeScore;
  points: number;
  avgDist: number;
}

/**
 * 엄격한 양방향 채점:
 *  1. 길이 비율 (0.65~1.6 벗어나면 fail)
 *  2. 중심 위치 (target과 user 중심이 너무 멀면 fail — 엉뚱한 곳에 그림)
 *  3. 양방향 점대점 정렬 거리 (정/역방향 작은 쪽) — 둘 다 N점 리샘플
 *  4. canvasSize(=VIEWBOX 300)로 정규화
 */
export function scoreStroke(
  target: StrokePoint[],
  user: StrokePoint[],
  canvasSize = 300,
): StrokeResult {
  if (user.length < 4) return { score: "fail", points: 0, avgDist: 999 };

  const targetLen = pathLength(target);
  const userLen = pathLength(user);
  if (targetLen === 0) return { score: "fail", points: 0, avgDist: 999 };

  // 1) 길이 비율 — 엄격
  const ratio = userLen / targetLen;
  if (ratio < 0.65 || ratio > 1.6) {
    return { score: "fail", points: 0, avgDist: 999 };
  }

  // 2) 중심 위치 체크 — 엉뚱한 위치에 그리면 컷
  const tb = bbox(target);
  const ub = bbox(user);
  const centerGap = Math.hypot(tb.cx - ub.cx, tb.cy - ub.cy) / canvasSize;
  if (centerGap > 0.22) {
    return { score: "fail", points: 0, avgDist: 999 };
  }

  // 3) 양방향 점대점 정렬
  const N = 20;
  const T = resample(target, N);
  const U = resample(user, N);

  let fwd = 0,
    bwd = 0;
  for (let i = 0; i < N; i++) {
    fwd += dist(T[i], U[i]);
    bwd += dist(T[i], U[N - 1 - i]);
  }
  fwd /= N;
  bwd /= N;
  const aligned = Math.min(fwd, bwd);

  // 4) 정규화 (대각선 기준) + 길이 패널티
  const diag = canvasSize * Math.SQRT2;
  const norm = aligned / diag;
  const ratioPenalty = Math.abs(1 - ratio) * 0.12;
  const finalNorm = norm + ratioPenalty;

  // 엄격한 임계값
  if (finalNorm < 0.05)
    return { score: "perfect", points: 100, avgDist: finalNorm };
  if (finalNorm < 0.085)
    return { score: "good", points: 75, avgDist: finalNorm };
  if (finalNorm < 0.13)
    return { score: "okay", points: 45, avgDist: finalNorm };
  return { score: "fail", points: 0, avgDist: finalNorm };
}
