"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

import type {
  StrokeDefinition,
  StrokePoint,
} from "../model/hangul";
import type { StrokeScore } from "../model/stroke-matching";
import styles from "./hangul-drawing.module.css";

const VIEWBOX = 300;
const SCORE_COLORS: Record<StrokeScore, string> = {
  fail: "#FF4B4B",
  good: "#58CC02",
  okay: "#1FA9F7",
  perfect: "#FFD000",
};

export function StrokeCanvas({
  completedScores,
  currentStrokeIndex,
  disabled,
  onStrokeFinished,
  strokes,
}: {
  completedScores: (StrokeScore | null)[];
  currentStrokeIndex: number;
  disabled: boolean;
  onStrokeFinished: (points: StrokePoint[]) => void;
  strokes: StrokeDefinition[];
}) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const drawing = useRef(false);
  const activePointer = useRef<number | null>(null);
  const userPoints = useRef<StrokePoint[]>([]);
  const [userPath, setUserPath] = useState("");

  useEffect(() => {
    if (!disabled) return;
    drawing.current = false;
    activePointer.current = null;
    userPoints.current = [];
    setUserPath("");
  }, [disabled]);

  const toSvgPoint = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) * VIEWBOX) / rect.width,
      y: ((event.clientY - rect.top) * VIEWBOX) / rect.height,
    };
  };

  const begin = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (disabled || drawing.current) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    const point = toSvgPoint(event);
    drawing.current = true;
    activePointer.current = event.pointerId;
    userPoints.current = [point];
    setUserPath("M " + point.x + " " + point.y);
  };

  const update = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (
      disabled ||
      !drawing.current ||
      activePointer.current !== event.pointerId
    ) {
      return;
    }
    event.preventDefault();
    const point = toSvgPoint(event);
    userPoints.current.push(point);
    setUserPath((path) => path + " L " + point.x + " " + point.y);
  };

  const end = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!drawing.current || activePointer.current !== event.pointerId) return;
    event.preventDefault();
    const points = userPoints.current;
    drawing.current = false;
    activePointer.current = null;
    userPoints.current = [];
    setUserPath("");
    onStrokeFinished(points);
  };

  const currentStroke = strokes[currentStrokeIndex];
  const startPoint = currentStroke?.points[0];

  return (
    <div
      className={styles.canvas}
      onPointerCancel={end}
      onPointerDown={begin}
      onPointerMove={update}
      onPointerUp={end}
      ref={canvasRef}
    >
      <svg
        aria-hidden="true"
        height="100%"
        viewBox={"0 0 " + VIEWBOX + " " + VIEWBOX}
        width="100%"
      >
        <g opacity=".06">
          <path d="M 150 0 L 150 300" stroke="#000" strokeWidth="1" />
          <path d="M 0 150 L 300 150" stroke="#000" strokeWidth="1" />
        </g>

        {strokes.map((stroke, index) => {
          const isCurrent = index === currentStrokeIndex;
          const score = completedScores[index];
          const color = score
            ? SCORE_COLORS[score]
            : isCurrent
              ? "#776ee2"
              : "#D8D8E0";
          return (
            <polyline
              fill="none"
              key={index}
              opacity={score ? 1 : isCurrent ? 0.35 : 0.5}
              points={stroke.points
                .map((point) => point.x + "," + point.y)
                .join(" ")}
              stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={isCurrent ? 22 : 16}
            />
          );
        })}

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

      {startPoint ? (
        <i
          className={styles.startDot}
          style={{
            left: (startPoint.x / VIEWBOX) * 100 + "%",
            top: (startPoint.y / VIEWBOX) * 100 + "%",
          }}
        />
      ) : null}
    </div>
  );
}
