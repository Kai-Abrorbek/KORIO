/**
 * "Oʻzbek ona = koreys ona" 표지 — 영상과 같은 밤 잠금화면 위에 큰 제목 + 엄마 알림 두 개.
 *   remotion still src/index.ts OnaCover social/covers/ona-cover.png
 */
import { HEAVY } from "../tutorial/kit";
import { useIconFont } from "../theme";
import { COVER_SAFE, CoverFrame, type CoverProps } from "../social/ReelCover";
import { Chip, INK, KO, KO_DARK, Note, UZ, UZ_DARK, YELLOW } from "./OnaReel";

export function OnaCover({ guides = false }: CoverProps) {
  useIconFont();
  return (
    <CoverFrame background="linear-gradient(170deg, #12142F 0%, #251F55 50%, #4A2A5C 100%)" guides={guides}>
      <div style={{ position: "absolute", left: -120, top: 260, width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(120,90,255,0.45) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", right: -160, top: 980, width: 760, height: 760, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,90,140,0.35) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", top: COVER_SAFE.top + 10, left: 0, right: 0, textAlign: "center", fontFamily: HEAVY, fontWeight: 900, fontSize: 58, color: "#fff", opacity: 0.9 }}>
        Bu sizning onangizmi?
      </div>
      <div style={{ position: "absolute", top: 410, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <Chip bg={UZ} fg="#fff" size={124} style={{ boxShadow: `0 16px 0 ${UZ_DARK}`, transform: "rotate(-2deg)" }}>
          OʻZBEK ONA
        </Chip>
        <div style={{ fontFamily: HEAVY, fontWeight: 900, fontSize: 120, color: YELLOW, lineHeight: 1, margin: "4px 0" }}>=</div>
        <Chip bg={KO} fg="#fff" size={124} style={{ boxShadow: `0 16px 0 ${KO_DARK}`, transform: "rotate(2deg)" }}>
          KOREYS ONA
        </Chip>
      </div>
      <div style={{ position: "absolute", top: 1010, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
        <div style={{ transform: "rotate(-1.5deg)" }}>
          <Note at={-30} from="Oyijon" lang="uz" size={68} text="Ovqat yedingmi?" />
        </div>
        <div style={{ transform: "rotate(1.5deg)" }}>
          <Note at={-30} from="엄마" lang="ko" size={68} text="밥 먹었어?" />
        </div>
      </div>
      <div style={{ position: "absolute", top: 1470, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <Chip size={60} style={{ color: INK, transform: "rotate(-2deg)" }}>
          3 ta gap · 3-si eng ogʻrigʻi
        </Chip>
      </div>
    </CoverFrame>
  );
}
