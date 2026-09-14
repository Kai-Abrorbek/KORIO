"use client";

import { full, percent } from "@/shared/ui/format";
import { EmptyState } from "@/shared/ui/primitives";
import type { FunnelStep } from "./types";

const LABEL: Record<string, string> = {
  signup: "가입",
  onboarding: "온보딩 완료",
  placement: "레벨 확정",
  firstLessonStart: "첫 레슨 시작",
  firstLessonComplete: "첫 레슨 완료",
  return7d: "7일 뒤에도 학습",
  premium: "프리미엄 전환",
};

/** 전환율이 이보다 낮은 단계는 빨갛게 — 여기가 구멍이다 */
const DROP_THRESHOLD = 50;

/**
 * 가입 → 프리미엄 퍼널.
 *
 * 가로 막대를 쓴다. 사다리꼴 퍼널은 예쁘지만 **면적이 값에 비례하지 않아서**
 * 눈이 속는다. 길이는 안 속는다.
 */
export function Funnel({ steps }: { steps: FunnelStep[] }) {
  if (!steps.length) return <EmptyState title="아직 데이터가 없다" />;
  const top = Math.max(1, steps[0]?.users ?? 1);

  return (
    <div className="funnel">
      {steps.map((s, i) => {
        const conv = s.conversionFromPrev;
        const leaking = conv !== null && conv < DROP_THRESHOLD;
        return (
          <div className="funnel-step" key={s.key}>
            <div
              className="funnel-fill"
              style={{
                width: `${Math.max(2, (s.users / top) * 100)}%`,
                background: "var(--series-1)",
              }}
            />
            <span className="funnel-name">
              {LABEL[s.key] ?? s.key}
              {s.partial && (
                <span
                  className="dim"
                  style={{ marginLeft: 6, fontWeight: 500, fontSize: 11 }}
                  title={
                    s.since
                      ? `이 단계는 계측을 배포한 ${new Date(s.since).toLocaleDateString("ko-KR")} 이후만 셀 수 있다. 그 전 유저는 빠져 있어서 전환율이 실제보다 낮게 나온다.`
                      : "계측 이후만 셀 수 있는 단계다"
                  }
                >
                  계측 이후만
                </span>
              )}
            </span>
            <span className="funnel-users tnum">{full(s.users)}</span>
            <span className={`funnel-conv${leaking ? " funnel-drop" : ""}`}>
              {i === 0 ? "—" : percent(conv)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
