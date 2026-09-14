"use client";

import { full, percent } from "@/shared/ui/format";
import { EmptyState } from "@/shared/ui/primitives";
import type { RetentionResponse } from "./types";

/**
 * 주차별 코호트 리텐션.
 *
 * 색은 **순차 램프 한 색상**이다 (연함→진함). 무지개를 쓰면 값의 순서가 색에서
 * 읽히지 않는다.
 *
 * ⚠️ 아직 그 날짜에 도달하지 않은 코호트는 `null` 로 내려온다 — 0% 가 아니다.
 *    분모에서 빼지 않으면 이번 주 가입자의 D30 이 항상 0% 로 보인다.
 */
const STEPS = [
  { at: 10, bg: "var(--seq-100)", ink: "#0b0b0b" },
  { at: 20, bg: "var(--seq-200)", ink: "#0b0b0b" },
  { at: 30, bg: "var(--seq-300)", ink: "#0b0b0b" },
  { at: 45, bg: "var(--seq-400)", ink: "#ffffff" },
  { at: 60, bg: "var(--seq-500)", ink: "#ffffff" },
  { at: 80, bg: "var(--seq-600)", ink: "#ffffff" },
  { at: Infinity, bg: "var(--seq-700)", ink: "#ffffff" },
];

function cell(v: number | null) {
  if (v === null) return null;
  if (v <= 0) return null;
  return STEPS.find((s) => v < s.at) ?? STEPS[STEPS.length - 1]!;
}

export function CohortTable({ cohorts }: { cohorts: RetentionResponse["cohorts"] }) {
  if (!cohorts.length) {
    return <EmptyState title="코호트가 없다" body="최근 주차에 가입한 사용자가 아직 없다." />;
  }

  // 최근이 위로. 운영자가 먼저 보는 건 이번 주다
  const rows = [...cohorts].reverse();

  return (
    <div style={{ overflowX: "auto" }}>
      <table className="cohort">
        <thead>
          <tr>
            <th>가입 주차</th>
            <th>인원</th>
            <th>D1</th>
            <th>D7</th>
            <th>D30</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((c) => (
            <tr key={c.week}>
              <td>{c.week}</td>
              <td className="size tnum">{full(c.size)}</td>
              {([c.d1, c.d7, c.d30] as (number | null)[]).map((v, i) => {
                const s = cell(v);
                return (
                  <td
                    key={i}
                    className={v === null ? "na" : undefined}
                    style={s ? { background: s.bg, color: s.ink } : undefined}
                    title={v === null ? "아직 그 날짜에 도달하지 않은 코호트다" : undefined}
                  >
                    {v === null ? "—" : percent(v, 0)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
