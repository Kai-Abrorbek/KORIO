/**
 * "Xat" 표지 — 편지를 가슴에 안은 아빠(x19) 위에 큰 제목, 위에 숫자 한 줄, 아래 궁금증 띠.
 *   remotion still src/index.ts XatCover social/covers/xat-cover.png
 */
import { Img, staticFile } from "remotion";
import { COVER_SAFE, CoverFrame, type CoverProps } from "../social/ReelCover";

const SERIF = 'Georgia, "Times New Roman", serif';
const WARM = "#FFD98A";
const shadow = "0 4px 24px rgba(0,0,0,0.75), 0 2px 4px rgba(0,0,0,0.8)";

export function XatCover({ guides = false }: CoverProps) {
  return (
    <CoverFrame background="#120B07" guides={guides}>
      <Img src={staticFile("ai/xat/x19.webp")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,6,4,0.7) 0%, rgba(10,6,4,0.25) 38%, transparent 55%, rgba(10,6,4,0.55) 100%)" }} />
      <div style={{ position: "absolute", top: COVER_SAFE.top + 20, left: 0, right: 0, textAlign: "center", fontFamily: SERIF, color: "#fff", textShadow: shadow }}>
        <div style={{ fontSize: 46, letterSpacing: 4, opacity: 0.92 }}>4 yil 10 oy · 3 ta so‘z</div>
        <div style={{ fontSize: 134, fontWeight: 700, lineHeight: 1.0, marginTop: 26 }}>DADAMNING</div>
        <div style={{ fontSize: 190, fontWeight: 700, lineHeight: 1.0, color: WARM }}>XATI</div>
      </div>
      <div style={{ position: "absolute", top: 1500, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <div style={{ background: "rgba(250,238,215,0.95)", color: "#2A1D12", fontFamily: SERIF, fontWeight: 700, fontSize: 52, padding: "14px 30px", borderRadius: 12, transform: "rotate(-2deg)", boxShadow: "0 12px 30px rgba(0,0,0,0.45)" }}>
          Xatda nima yozilgan edi?
        </div>
      </div>
    </CoverFrame>
  );
}
