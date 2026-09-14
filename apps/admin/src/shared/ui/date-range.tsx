"use client";

import { useMemo, useState } from "react";

export interface Range {
  from: string;
  to: string;
  days: number;
}

/**
 * 기간 필터.
 *
 * 달력 대신 프리셋 한 줄이다 — 운영자가 실제로 고르는 건 "최근 며칠" 이고,
 * 날짜를 두 번 찍게 만들면 그만큼 느려진다. 임의 구간이 필요해지면 그때
 * 뒤에 붙인다.
 *
 * ⚠️ 서버는 이 값을 **UTC 기준**으로 자른다. UserStats 는 유저 각자의
 *    시간대로 잘린 날짜라 하루 경계가 사람마다 조금씩 다르다 — 추이를 보는 데는
 *    문제없지만 "정확히 이 24시간" 을 묻는 값은 아니다.
 */
const PRESETS = [
  { days: 7, label: "7일" },
  { days: 14, label: "14일" },
  { days: 30, label: "30일" },
  { days: 90, label: "90일" },
] as const;

const DAY_MS = 86_400_000;
const iso = (d: Date) => d.toISOString().slice(0, 10);

export function useDateRange(initial = 30) {
  const [days, setDays] = useState<number>(initial);
  const range = useMemo<Range>(() => {
    const to = new Date();
    return { from: iso(new Date(to.getTime() - (days - 1) * DAY_MS)), to: iso(to), days };
  }, [days]);
  return { range, days, setDays };
}

export function RangePicker({
  days,
  onChange,
}: {
  days: number;
  onChange: (days: number) => void;
}) {
  return (
    <div className="segmented" role="group" aria-label="기간">
      {PRESETS.map((p) => (
        <button
          key={p.days}
          className={days === p.days ? "is-on" : ""}
          aria-pressed={days === p.days}
          onClick={() => onChange(p.days)}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
