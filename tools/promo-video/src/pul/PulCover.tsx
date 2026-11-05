/**
 * "O‘qib pul ishlang" 표지 — 큰 제목, 보석이 쏟아지는 카드, "1 gavhar = 1 so‘m" 배지.
 *   remotion still src/index.ts PulCover social/covers/pul-cover.png
 */
import { COVER_SAFE, CoverFrame, type CoverProps } from "../social/ReelCover";

const HEAVY = '"Segoe UI Black", "Segoe UI", sans-serif';
const PURPLE = "#7B5CFF";
const PINK = "#FF5FA2";
const YELLOW = "#FFE14D";
const INK = "#1C1A2E";

function Gem({ size }: { size: number }) {
  return (
    <svg height={size} style={{ filter: "drop-shadow(0 0 16px rgba(120,220,255,0.8))" }} viewBox="0 0 24 24" width={size}>
      <path d="M6 3h12l4 6-10 12L2 9z" fill="#5BD6FF" />
      <path d="M6 3l3 6-7 0zM18 3l-3 6 7 0z" fill="#9BE8FF" />
      <path d="M9 9h6l-3 12z" fill="#2FB4F0" />
      <path d="M6 3h12l-3 6H9z" fill="#C9F4FF" />
    </svg>
  );
}

export function PulCover({ guides = false }: CoverProps) {
  const gems = [
    [640, 330, 110, -14],
    [860, 420, 90, 18],
    [560, 520, 70, 8],
    [930, 600, 120, -6],
    [720, 660, 80, 24],
  ];
  return (
    <CoverFrame background="radial-gradient(ellipse at 50% 35%, #3A2A8C 0%, #1F1655 50%, #0E0A2A 100%)" guides={guides}>
      {gems.map(([x, y, s, r], i) => (
        <div key={i} style={{ position: "absolute", left: x, top: y, transform: `rotate(${r}deg)` }}>
          <Gem size={s} />
        </div>
      ))}
      {/* 카드 */}
      <div style={{ position: "absolute", left: 540, top: COVER_SAFE.top + 440, width: 470, height: 290, borderRadius: 30, background: "linear-gradient(135deg, #1E3A8A, #0EA5E9)", boxShadow: "0 30px 60px rgba(0,0,0,0.5)", transform: "rotate(-8deg)", padding: 30, color: "#fff", fontFamily: HEAVY }}>
        <div style={{ width: 74, height: 54, borderRadius: 10, background: "linear-gradient(135deg, #FDE68A, #D97706)" }} />
        <div style={{ marginTop: 56, fontSize: 40, letterSpacing: 3 }}>•••• •••• 4821</div>
        <div style={{ marginTop: 10, fontSize: 26, opacity: 0.85 }}>UZCARD · HUMO · VISA</div>
      </div>
      <div style={{ position: "absolute", left: 60, top: COVER_SAFE.top + 30, display: "inline-block", padding: "8px 26px", borderRadius: 24, background: "#fff", transform: "rotate(-4deg)", boxShadow: "0 16px 30px rgba(0,0,0,0.35)" }}>
        <span style={{ fontFamily: HEAVY, fontSize: 70, color: PURPLE }}>KORI</span>
        <span style={{ fontFamily: HEAVY, fontSize: 70, color: PINK }}>O</span>
      </div>
      <div style={{ position: "absolute", left: 60, right: 60, top: 1000, fontFamily: HEAVY }}>
        <div style={{ fontSize: 150, lineHeight: 0.95, color: "#fff", textShadow: "0 8px 0 #000" }}>O‘QIB</div>
        <div style={{ fontSize: 150, lineHeight: 0.95, color: YELLOW, textShadow: "0 8px 0 #000", whiteSpace: "nowrap" }}>PUL OLING</div>
      </div>
      <div style={{ position: "absolute", left: 60, top: COVER_SAFE.bottom - 120, display: "flex", gap: 16, fontFamily: HEAVY }}>
        <div style={{ padding: "12px 26px", borderRadius: 999, background: YELLOW, color: INK, fontSize: 46 }}>1 gavhar = 1 so‘m</div>
        <div style={{ padding: "12px 26px", borderRadius: 999, background: "#22C55E", color: "#fff", fontSize: 46 }}>kartaga</div>
      </div>
    </CoverFrame>
  );
}
