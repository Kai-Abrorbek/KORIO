import { useEffect, useState, type CSSProperties } from "react";
import { continueRender, delayRender, staticFile } from "remotion";

/** 자막 글꼴 — 앱(텔레그램 미니앱)과 같은 굵은 Segoe 계열, 한글은 맑은 고딕으로 */
export const FONT = '"Segoe UI Black", "Segoe UI", Inter, "Malgun Gothic", "Noto Sans KR", sans-serif';
export const INK = "#21124F";
export const HIGHLIGHT = "#FFD43B";

/** Ionicons 글리프 (앱 MobileIcon 과 같은 글꼴) */
export const ICON = {
  apple: 62424,
  play: 62454,
  plane: 62605,
  rocket: 62791,
  close: 62026,
  back: 61735,
  dots: 62164,
  done: 61985,
  attach: 61777,
  happy: 62306,
  mic: 62558,
  sparkles: 62860,
  school: 62812,
  stats: 62875,
  megaphone: 62542,
  chat: 61975,
} as const;

export function Icon({ name, size, color, style }: { name: keyof typeof ICON; size: number; color?: string; style?: CSSProperties }) {
  return (
    <span style={{ fontFamily: "Ionicons", fontSize: size, lineHeight: 1, color, display: "inline-block", ...style }}>
      {String.fromCodePoint(ICON[name])}
    </span>
  );
}

/** Ionicons 글꼴이 다 내려온 뒤에 첫 프레임을 찍는다 */
export function useIconFont() {
  const [handle] = useState(() => delayRender("Ionicons"));
  useEffect(() => {
    const font = new FontFace("Ionicons", `url(${staticFile("fonts/Ionicons.ttf")})`);
    font
      .load()
      .then(() => {
        document.fonts.add(font);
        continueRender(handle);
      })
      .catch(() => continueRender(handle));
  }, [handle]);
}

/** "Jonli *AI ustoz*" → 강조 조각으로 */
export function Rich({ text, tilt = true }: { text: string; tilt?: boolean }) {
  return (
    <>
      {text.split("\n").map((line, li) => (
        <div key={li}>
          {line.split(/(\*[^*]+\*)/).map((part, pi) =>
            part.startsWith("*") ? (
              <span
                key={pi}
                style={{
                  background: HIGHLIGHT,
                  color: INK,
                  borderRadius: 22,
                  padding: "0 18px 4px",
                  margin: "0 4px",
                  display: "inline-block",
                  transform: tilt ? "rotate(-2deg)" : undefined,
                  textShadow: "none",
                  boxShadow: "0 8px 0 rgba(33,18,79,0.25)",
                }}
              >
                {part.slice(1, -1)}
              </span>
            ) : (
              <span key={pi}>{part}</span>
            ),
          )}
        </div>
      ))}
    </>
  );
}
