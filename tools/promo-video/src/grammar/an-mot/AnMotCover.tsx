import { AbsoluteFill } from "remotion";

const BG = "#11182B";
const WHITE = "#F8F7F2";
const TEAL = "#47D6C2";
const RED = "#FF6C73";
const LIME = "#D8F64B";
const LATIN = '"Segoe UI Black", "Segoe UI", sans-serif';
const KOREAN = '"Malgun Gothic", "Noto Sans KR", sans-serif';

export function AnMotCover({ guides = false }: { guides?: boolean }) {
  return (
    <AbsoluteFill style={{ background: BG, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: -280, top: 220, width: 730, height: 730, borderRadius: "50%", background: TEAL, opacity: 0.13, filter: "blur(90px)" }} />
      <div style={{ position: "absolute", right: -250, bottom: 90, width: 700, height: 700, borderRadius: "50%", background: RED, opacity: 0.12, filter: "blur(95px)" }} />
      <div style={{ position: "absolute", left: 65, right: 65, top: 329, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: LATIN, fontWeight: 900, fontSize: 55, color: WHITE, letterSpacing: -2 }}>KORIO<span style={{ color: LIME }}>.</span></div>
        <div style={{ padding: "11px 24px", background: LIME, color: BG, borderRadius: 40, fontFamily: LATIN, fontWeight: 900, fontSize: 27, letterSpacing: 1 }}>KOREYS GRAMMATIKASI</div>
      </div>
      <div style={{ position: "absolute", left: 55, right: 55, top: 488, display: "flex", alignItems: "center", justifyContent: "space-around" }}>
        <span style={{ fontFamily: KOREAN, fontSize: 310, fontWeight: 900, lineHeight: 1, letterSpacing: -17, color: TEAL, textShadow: "0 24px 0 #0005" }}>안</span>
        <span style={{ fontFamily: LATIN, fontSize: 70, fontWeight: 900, color: LIME, transform: "rotate(-12deg)" }}>VS</span>
        <span style={{ fontFamily: KOREAN, fontSize: 310, fontWeight: 900, lineHeight: 1, letterSpacing: -17, color: RED, textShadow: "0 24px 0 #0005" }}>못</span>
      </div>
      <div style={{ position: "absolute", left: 73, right: 73, top: 841, height: 6, borderRadius: 6, background: "#40516B" }} />
      <div style={{ position: "absolute", left: 73, right: 73, top: 933, height: 214, borderRadius: 35, background: TEAL, display: "flex", alignItems: "center", gap: 25, padding: "25px 38px", boxShadow: "0 16px 0 #07101F" }}>
        <span style={{ fontFamily: KOREAN, fontWeight: 900, fontSize: 123, lineHeight: 1, color: BG }}>안</span>
        <div style={{ width: 4, height: 105, background: BG, opacity: 0.4 }} />
        <span style={{ fontFamily: LATIN, fontWeight: 900, fontSize: 83, lineHeight: 1.04, color: BG }}>QILMAYMAN</span>
      </div>
      <div style={{ position: "absolute", left: 73, right: 73, top: 1204, height: 214, borderRadius: 35, background: RED, display: "flex", alignItems: "center", gap: 25, padding: "25px 38px", boxShadow: "0 16px 0 #07101F" }}>
        <span style={{ fontFamily: KOREAN, fontWeight: 900, fontSize: 123, lineHeight: 1, color: BG }}>못</span>
        <div style={{ width: 4, height: 105, background: BG, opacity: 0.4 }} />
        <span style={{ fontFamily: LATIN, fontWeight: 900, fontSize: 70, lineHeight: 1.04, color: BG }}>QILA OLMAYMAN</span>
      </div>
      <div style={{ position: "absolute", left: 82, top: 1490, fontFamily: LATIN, fontWeight: 800, color: WHITE, fontSize: 41 }}>Ikkisi ham inkor. Farqi nimada?</div>
      {guides ? (
        <>
          <div style={{ position: "absolute", left: 0, right: 0, top: 240, height: 1440, border: "6px dashed #FF355E" }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 285, height: 1350, border: "6px dashed #60BFFF" }} />
        </>
      ) : null}
    </AbsoluteFill>
  );
}
