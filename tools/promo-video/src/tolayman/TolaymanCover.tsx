/**
 * "Men toʻlayman!" 표지 — 대각선 반 갈라 그림(t18) 위에 큰 제목 두 줄과 가격 두 개.
 *   remotion still src/index.ts TolaymanCover social/covers/tolayman-cover.png
 */
import { Img, staticFile } from "remotion";
import { COVER_SAFE, CoverFrame, type CoverProps } from "../social/ReelCover";

const HEAVY = '"Segoe UI Black", "Segoe UI", sans-serif';
const OUTLINE = "0 0 4px rgba(0,0,0,0.95), 0 6px 0 rgba(0,0,0,0.55), 0 12px 30px rgba(0,0,0,0.7)";

export function TolaymanCover({ guides = false }: CoverProps) {
  return (
    <CoverFrame background="#120c08" guides={guides}>
      <Img src={staticFile("ai/tolayman/t18.webp")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,6,4,0.75) 0%, rgba(10,6,4,0.35) 30%, transparent 48%, rgba(10,6,4,0.35) 100%)" }} />
      <div style={{ position: "absolute", top: COVER_SAFE.top + 10, left: 50, right: 50, textAlign: "center", fontFamily: HEAVY, textShadow: OUTLINE }}>
        <div style={{ fontSize: 94, color: "#FFD23F", lineHeight: 1, transform: "rotate(-3deg)", whiteSpace: "nowrap" }}>MEN TOʻLAYMAN!</div>
        <div style={{ fontSize: 50, color: "#fff", margin: "10px 0 6px" }}>…oʻziga esa</div>
        <div style={{ fontSize: 118, color: "#FF4B4B", lineHeight: 1, transform: "rotate(2deg)" }}>QIMMAT-KU!</div>
      </div>
      <div style={{ position: "absolute", top: 1420, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 26, fontFamily: HEAVY }}>
        <div style={{ background: "#3DDC84", color: "#16121F", fontSize: 56, padding: "12px 26px", borderRadius: 20, transform: "rotate(-3deg)", boxShadow: "0 12px 26px rgba(0,0,0,0.5)" }}>210 000</div>
        <div style={{ background: "#FF4B4B", color: "#fff", fontSize: 56, padding: "12px 26px", borderRadius: 20, transform: "rotate(3deg)", boxShadow: "0 12px 26px rgba(0,0,0,0.5)" }}>59 000?</div>
      </div>
    </CoverFrame>
  );
}
