/**
 * "Ingliz tilida nega gapira olmaymiz?" 표지 — 공원에서 길을 묻는 첫 장면 위에 큰 질문, "3 TA XATO" 배지.
 *   remotion still src/index.ts XatoCover social/covers/xato-cover.png
 */
import { Img, staticFile } from "remotion";
import { COVER_SAFE, CoverFrame, type CoverProps } from "../social/ReelCover";

const HEAVY = '"Segoe UI Black", "Segoe UI", sans-serif';
const YELLOW = "#FFE14D";
const RED = "#E5484D";
const INK = "#1C1A2E";

export function XatoCover({ guides = false }: CoverProps) {
  return (
    <CoverFrame background="#1A1426" guides={guides}>
      <Img src={staticFile("ai/xato/k01.webp")} style={{ position: "absolute", inset: 0, width: 1080, height: 1920 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(20,12,30,0) 40%, rgba(20,12,30,0.75) 62%, rgba(20,12,30,0.92) 80%)" }} />
      {/* 두 얼굴을 가리지 않게 제목 바로 위 */}
      <div style={{ position: "absolute", left: 60, top: 930, padding: "12px 28px", borderRadius: 14, background: RED, color: "#fff", fontFamily: HEAVY, fontSize: 58, transform: "rotate(-3deg)", boxShadow: "0 14px 30px rgba(0,0,0,0.35)" }}>3 TA XATO</div>
      <div style={{ position: "absolute", left: 60, right: 60, top: 1060, fontFamily: HEAVY }}>
        <div style={{ fontSize: 76, color: "#fff", textShadow: "0 6px 0 #000" }}>Ingliz tilida</div>
        <div style={{ fontSize: 132, lineHeight: 0.98, color: YELLOW, textShadow: "0 8px 0 #000" }}>NEGA GAPIRA</div>
        <div style={{ fontSize: 132, lineHeight: 0.98, color: YELLOW, textShadow: "0 8px 0 #000" }}>OLMAYMIZ?</div>
      </div>
      <div style={{ position: "absolute", left: 60, top: COVER_SAFE.bottom - 100, padding: "10px 24px", borderRadius: 999, background: "#fff", color: INK, fontFamily: HEAVY, fontSize: 40 }}>2 yil o‘qib, bir og‘iz gapira olmadi</div>
    </CoverFrame>
  );
}
