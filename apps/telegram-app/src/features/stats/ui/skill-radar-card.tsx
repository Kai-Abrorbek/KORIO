"use client";

import { useEffect, useState } from "react";

import {
  CATEGORY_LABELS,
  type SkillRadar,
  type SkillScore,
} from "../model/stats";
import {
  MobileIcon,
  type IoniconName,
} from "../../../shared/ui/mobile-icon";
import {
  Spinner,
  StatsCard,
  type AuthenticatedRequest,
} from "./stats-screen";
import styles from "./skill-radar-card.module.css";

const DIAG_STYLE: Record<
  SkillRadar["diagnosis"]["key"],
  { color: string; icon: IoniconName }
> = {
  noData: { icon: "hourglass-outline", color: "#9AA0A6" },
  balanced: { icon: "checkmark-circle", color: "#1D9E75" },
  weakSpot: { icon: "alert-circle", color: "#E2A83A" },
  untouched: { icon: "add-circle", color: "#45B7D1" },
  accuracyDrop: { icon: "trending-down", color: "#FF6B6B" },
};

function getSkills(request: AuthenticatedRequest): Promise<SkillRadar> {
  return request<SkillRadar>("/users/me/stats/skills?days=90");
}

function diagnosisText(data: SkillRadar) {
  const diagnosis = data.diagnosis;
  const category = diagnosis.category
    ? CATEGORY_LABELS[diagnosis.category]
    : "";
  const weakest = diagnosis.weakest
    ? CATEGORY_LABELS[diagnosis.weakest]
    : "";
  if (diagnosis.key === "noData") {
    return "Yana bir oz mashq qiling — kuchli va zaif tomonlaringizni aytaman.";
  }
  if (diagnosis.key === "balanced") {
    return "Hamma yo'nalishni bir tekis olib boryapsiz. Shunday davom eting!";
  }
  if (diagnosis.key === "weakSpot") {
    return weakest + " boshqa yo'nalishlardan ancha orqada.";
  }
  if (diagnosis.key === "untouched") {
    return category + " hali boshlanmagan. Sinab ko'rasizmi?";
  }
  return (
    category +
    " bo'yicha ko'p ishlayapsiz, lekin to'g'ri javob kam. Takrorlash kerak."
  );
}

function pointAt(index: number, count: number, radius: number, ratio: number) {
  const angle = (Math.PI * 2 * index) / count - Math.PI / 2;
  return {
    x: 150 + Math.cos(angle) * radius * ratio,
    y: 150 + Math.sin(angle) * radius * ratio,
  };
}

function polygonPoints(
  skills: SkillScore[],
  radius: number,
  value: (skill: SkillScore) => number,
) {
  return skills
    .map((skill, index) => {
      const point = pointAt(index, skills.length, radius, value(skill));
      return point.x + "," + point.y;
    })
    .join(" ");
}

export function SkillRadarCard({
  request,
}: {
  request: AuthenticatedRequest;
}) {
  const [data, setData] = useState<SkillRadar | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    void getSkills(request)
      .then((result) => {
        if (active) setData(result);
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [request]);

  if (loading && !data) {
    return (
      <StatsCard className={styles.loading}>
        <Spinner />
      </StatsCard>
    );
  }
  if (!data || data.skills.length === 0) return null;

  const diagnosis = data.diagnosis;
  const diagnosisStyle = DIAG_STYLE[diagnosis.key];
  const radius = 108;
  const ordered = [...data.skills].sort((a, b) => b.score - a.score);

  return (
    <StatsCard>
      <div className={styles.header}>
        <strong>O&apos;quv balansi</strong>
        <span>Oxirgi {data.rangeDays} kun</span>
      </div>
      <div
        className={styles.diagnosis}
        style={{ borderLeftColor: diagnosisStyle.color }}
      >
        <MobileIcon
          name={diagnosisStyle.icon}
          size={18}
          style={{ color: diagnosisStyle.color }}
        />
        <span>{diagnosisText(data)}</span>
      </div>
      <div className={styles.chart}>
        <svg aria-label="O'quv balansi" viewBox="0 0 300 300">
          <defs>
            <linearGradient id="stats-radar-fill" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#8E85F0" stopOpacity=".55" />
              <stop offset="1" stopColor="#5F4FD8" stopOpacity=".3" />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75, 1].map((ring) => (
            <polygon
              fill="none"
              key={ring}
              points={polygonPoints(data.skills, radius, () => ring)}
              stroke="#ECEAF6"
              strokeWidth="1"
            />
          ))}
          {data.skills.map((skill, index) => {
            const outer = pointAt(index, data.skills.length, radius, 1);
            return (
              <line
                key={skill.category}
                stroke="#ECEAF6"
                strokeWidth="1"
                x1="150"
                x2={outer.x}
                y1="150"
                y2={outer.y}
              />
            );
          })}
          <polygon
            className={styles.value}
            fill="url(#stats-radar-fill)"
            points={polygonPoints(
              data.skills,
              radius,
              (skill) => skill.score / 100,
            )}
            stroke="#776ee2"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />
          {data.skills.map((skill, index) => {
            const point = pointAt(
              index,
              data.skills.length,
              radius,
              skill.score / 100,
            );
            const weak = diagnosis.weakest === skill.category;
            const label = pointAt(index, data.skills.length, radius, 1.2);
            return (
              <g key={skill.category}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  fill={weak ? "#FF6B6B" : "#776ee2"}
                  r={weak ? 5.5 : 4}
                  stroke="#fff"
                  strokeWidth="2"
                />
                <text
                  fill={weak ? "#FF6B6B" : "#55555F"}
                  fontSize="11"
                  fontWeight={weak ? "800" : "700"}
                  textAnchor="middle"
                  x={label.x}
                  y={label.y + 4}
                >
                  {CATEGORY_LABELS[skill.category]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className={styles.list}>
        {ordered.map((skill, index) => {
          const weak =
            diagnosis.weakest === skill.category &&
            diagnosis.key !== "noData";
          const strong =
            diagnosis.strongest === skill.category && index === 0;
          return (
            <div key={skill.category}>
              <span>{CATEGORY_LABELS[skill.category]}</span>
              <span>
                <i
                  style={{
                    backgroundColor: weak
                      ? "#FF6B6B"
                      : strong
                        ? "#1D9E75"
                        : "#776ee2",
                    width: Math.max(3, skill.score) + "%",
                  }}
                />
              </span>
              <strong>
                {skill.attempted === 0
                  ? "Boshlanmagan"
                  : skill.accuracy === null
                    ? skill.attempted
                    : Math.round(skill.accuracy * 100) + "%"}
              </strong>
            </div>
          );
        })}
      </div>
      <p className={styles.foot}>
        Oxirgi {data.totalAttempted} ta savol asosida hisoblandi
      </p>
    </StatsCard>
  );
}
