"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

import type { StrokePoint } from "../model/hangul";
import type { GuideMode } from "../model/syllable-levels";
import {
  SYLLABLE_VIEWBOX,
  type PlacedStroke,
} from "../model/syllable-strokes";
import type { StrokeScore } from "../model/stroke-matching";
import styles from "./syllable-drawing.module.css";

const SCORE_COLORS: Record<StrokeScore, string> = {
  fail: "#FF4B4B",
  good: "#58CC02",
  okay: "#1FA9F7",
  perfect: "#FFD000",
};

function toPath(points: StrokePoint[]) {
  return points
    .map((point, index) =>
      index === 0
        ? "M " + point.x + " " + point.y
        : "L " + point.x + " " + point.y,
    )
    .join(" ");
}

export function SyllableCanvas({
  completedScores,
  currentStrokeIndex,
  disabled,
  guide,
  onStrokeFinished,
  strokes,
  userStrokes,
}: {
  completedScores: (StrokeScore | null)[];
  currentStrokeIndex: number;
  disabled: boolean;
  guide: GuideMode;
  onStrokeFinished: (points: StrokePoint[]) => void;
  strokes: PlacedStroke[];
  userStrokes: (StrokePoint[] | null)[];
}) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const points = useRef<StrokePoint[]>([]);
  const pointer = useRef<number | null>(null);
  const [userPath, setUserPath] = useState("");

  useEffect(() => {
    if (!disabled) return;
    pointer.current = null;
    points.current = [];
    setUserPath("");
  }, [disabled]);

  const toSvg = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) * SYLLABLE_VIEWBOX) / rect.width,
      y: ((event.clientY - rect.top) * SYLLABLE_VIEWBOX) / rect.height,
    };
  };

  const begin = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (disabled || pointer.current !== null) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    const point = toSvg(event);
    pointer.current = event.pointerId;
    points.current = [point];
    setUserPath("M " + point.x + " " + point.y);
  };

  const move = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (disabled || pointer.current !== event.pointerId) return;
    event.preventDefault();
    const point = toSvg(event);
    points.current.push(point);
    setUserPath((current) => current + " L " + point.x + " " + point.y);
  };

  const end = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointer.current !== event.pointerId) return;
    event.preventDefault();
    const completed = points.current;
    pointer.current = null;
    points.current = [];
    setUserPath("");
    onStrokeFinished(completed);
  };

  const startPoint = strokes[currentStrokeIndex]?.points[0];

  return (
    <div
      className={styles.canvas}
      onPointerCancel={end}
      onPointerDown={begin}
      onPointerMove={move}
      onPointerUp={end}
      ref={canvasRef}
    >
      <svg
        aria-hidden="true"
        height="100%"
        viewBox="0 0 300 300"
        width="100%"
      >
        <g opacity=".07">
          <path d="M 150 8 L 150 292" stroke="#000" strokeWidth="1" />
          <path d="M 8 150 L 292 150" stroke="#000" strokeWidth="1" />
        </g>

        {strokes.map((stroke, index) => {
          const score = completedScores[index];
          const current = index === currentStrokeIndex;
          let color = "#D8D8E0";
          let opacity = 0;
          let width = 16;
          if (score) {
            color = SCORE_COLORS[score];
            opacity = 1;
            width = 17;
          } else if (guide === "stroke") {
            color = current ? "#776ee2" : "#D8D8E0";
            opacity = current ? 0.34 : 0.5;
            width = current ? 22 : 16;
          } else if (guide === "silhouette") {
            color = "#8E8AA8";
            opacity = 0.14;
            width = 15;
          }
          if (opacity === 0) return null;
          return (
            <polyline
              fill="none"
              key={"target-" + index}
              opacity={opacity}
              points={stroke.points
                .map((point) => point.x + "," + point.y)
                .join(" ")}
              stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={width}
            />
          );
        })}

        {userStrokes.map((stroke, index) =>
          stroke && stroke.length > 1 ? (
            <path
              d={toPath(stroke)}
              fill="none"
              key={"user-" + index}
              opacity=".5"
              stroke="#2B2A45"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="5"
            />
          ) : null,
        )}

        {userPath ? (
          <path
            d={userPath}
            fill="none"
            opacity=".9"
            stroke="#776ee2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="18"
          />
        ) : null}
      </svg>

      {guide === "stroke" && startPoint ? (
        <i
          className={styles.startDot}
          style={{
            left: (startPoint.x / SYLLABLE_VIEWBOX) * 100 + "%",
            top: (startPoint.y / SYLLABLE_VIEWBOX) * 100 + "%",
          }}
        />
      ) : null}
    </div>
  );
}
