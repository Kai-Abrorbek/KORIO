/**
 * "12 000 $ yoki 28 $?" 표지 — 대각선 반 갈라 그림(k17)을 아래로 내리고 위 빈자리에 큰 숫자 두 줄과 출처 배지.
 *   remotion still src/index.ts TanishCover social/covers/tanish-cover.png
 */
import { Img, staticFile } from "remotion";
import { COVER_SAFE, CoverFrame, type CoverProps } from "../social/ReelCover";

const HEAVY = '"Segoe UI Black", "Segoe UI", sans-serif';
const OUTLINE = "0 0 4px rgba(0,0,0,0.95), 0 6px 0 rgba(0,0,0,0.55), 0 12px 30px rgba(0,0,0,0.7)";
const DROP = 230; // 얼굴이 제목 밑으로 가게 그림을 내린다 (그림 위쪽은 비어 있는 어두운 하늘)

export function TanishCover({ guides = false }: CoverProps) {
  return (
    <CoverFrame background="rgb(24,27,33)" guides={guides}>
      <Img src={staticFile("ai/tanish/k17.webp")} style={{ position: "absolute", left: 0, top: DROP, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, rgb(24,27,33) 0%, rgb(24,27,33) ${(DROP / 1920) * 100}%, transparent 48%, rgba(10,6,4,0.4) 100%)` }} />
      <div style={{ position: "absolute", top: COVER_SAFE.top + 10, left: 40, right: 40, textAlign: "center", fontFamily: HEAVY, textShadow: OUTLINE }}>
        <div style={{ fontSize: 58, color: "#fff", letterSpacing: 4 }}>TANISH ORQALI</div>
        <div style={{ fontSize: 186, color: "#FF4B4B", lineHeight: 1, transform: "rotate(-3deg)", whiteSpace: "nowrap" }}>12 000 $</div>
        <div style={{ fontSize: 186, color: "#3DDC84", lineHeight: 1, transform: "rotate(2deg)", whiteSpace: "nowrap", marginTop: 8 }}>
          <span style={{ fontSize: 70, color: "#fff", verticalAlign: "middle", marginRight: 22 }}>yoki</span>28 $?
        </div>
      </div>
      <div style={{ position: "absolute", top: 1500, left: 0, right: 0, display: "flex", justifyContent: "center", fontFamily: HEAVY }}>
        <div style={{ background: "#FFD23F", color: "#16121F", fontSize: 46, padding: "12px 28px", borderRadius: 20, transform: "rotate(-2deg)", boxShadow: "0 12px 26px rgba(0,0,0,0.5)" }}>Bosh prokuratura maʼlumoti</div>
      </div>
    </CoverFrame>
  );
}
