import type { StrokePoint } from "./hangul";

function distance(a: StrokePoint, b: StrokePoint): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function pathLength(points: StrokePoint[]): number {
  let total = 0;
  for (let index = 1; index < points.length; index += 1) {
    total += distance(points[index - 1]!, points[index]!);
  }
  return total;
}

export function resample(points: StrokePoint[], count: number): StrokePoint[] {
  if (points.length < 2) {
    return points.length ? new Array<StrokePoint>(count).fill(points[0]!) : [];
  }
  const total = pathLength(points);
  if (total === 0) return new Array<StrokePoint>(count).fill(points[0]!);

  const step = total / (count - 1);
  const result: StrokePoint[] = [points[0]!];
  let accumulated = 0;
  let previous = points[0]!;
  let index = 1;

  while (index < points.length && result.length < count) {
    const current = points[index]!;
    const gap = distance(previous, current);
    if (accumulated + gap >= step) {
      const ratio = (step - accumulated) / gap;
      const point = {
        x: previous.x + (current.x - previous.x) * ratio,
        y: previous.y + (current.y - previous.y) * ratio,
      };
      result.push(point);
      previous = point;
      accumulated = 0;
    } else {
      accumulated += gap;
      previous = current;
      index += 1;
    }
  }
  while (result.length < count) result.push(points.at(-1)!);
  return result.slice(0, count);
}

function boundingBox(points: StrokePoint[]) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const point of points) {
    if (point.x < minX) minX = point.x;
    if (point.y < minY) minY = point.y;
    if (point.x > maxX) maxX = point.x;
    if (point.y > maxY) maxY = point.y;
  }
  return {
    centerX: (minX + maxX) / 2,
    centerY: (minY + maxY) / 2,
  };
}

export type StrokeScore = "perfect" | "good" | "okay" | "fail";

export interface StrokeResult {
  avgDist: number;
  points: number;
  score: StrokeScore;
}

export function scoreStroke(
  target: StrokePoint[],
  user: StrokePoint[],
  canvasSize = 300,
  referenceScale = canvasSize,
): StrokeResult {
  if (user.length < 4) return { avgDist: 999, points: 0, score: "fail" };

  const targetLength = pathLength(target);
  const userLength = pathLength(user);
  if (targetLength === 0) {
    return { avgDist: 999, points: 0, score: "fail" };
  }

  const lengthRatio = userLength / targetLength;
  if (lengthRatio < 0.65 || lengthRatio > 1.6) {
    return { avgDist: 999, points: 0, score: "fail" };
  }

  const targetBox = boundingBox(target);
  const userBox = boundingBox(user);
  const centerGap =
    Math.hypot(
      targetBox.centerX - userBox.centerX,
      targetBox.centerY - userBox.centerY,
    ) / referenceScale;
  if (centerGap > 0.22) {
    return { avgDist: 999, points: 0, score: "fail" };
  }

  const sampleCount = 20;
  const targetSamples = resample(target, sampleCount);
  const userSamples = resample(user, sampleCount);
  let forward = 0;
  let backward = 0;
  for (let index = 0; index < sampleCount; index += 1) {
    forward += distance(targetSamples[index]!, userSamples[index]!);
    backward += distance(
      targetSamples[index]!,
      userSamples[sampleCount - 1 - index]!,
    );
  }
  forward /= sampleCount;
  backward /= sampleCount;

  const aligned = Math.min(forward, backward);
  const diagonal = referenceScale * Math.SQRT2;
  const normalized = aligned / diagonal;
  const lengthPenalty = Math.abs(1 - lengthRatio) * 0.12;
  const finalDistance = normalized + lengthPenalty;

  if (finalDistance < 0.05) {
    return { avgDist: finalDistance, points: 100, score: "perfect" };
  }
  if (finalDistance < 0.085) {
    return { avgDist: finalDistance, points: 75, score: "good" };
  }
  if (finalDistance < 0.13) {
    return { avgDist: finalDistance, points: 45, score: "okay" };
  }
  return { avgDist: finalDistance, points: 0, score: "fail" };
}
