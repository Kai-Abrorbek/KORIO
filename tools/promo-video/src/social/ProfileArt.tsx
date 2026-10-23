/**
 * 인스타그램 프로필 그림 — 프로필 사진(1080×1080, 원으로 잘린다)과 하이라이트 표지(1080×1920, 가운데 원만 보인다).
 *   remotion still src/index.ts IgAvatar social/profile/avatar.png
 *   remotion still src/index.ts IgHighlight social/profile/highlight-topik.png --props='{"glyph":"school"}'
 */
import { AbsoluteFill, Img, staticFile } from "remotion";
import { ICON, useIconFont } from "../theme";

const PURPLE_DEEP = "#4F3BD9";
const PURPLE = "#6A55F5";
const PURPLE_LIGHT = "#8C7BFF";
const SANS = '"Segoe UI", Inter, "Malgun Gothic", sans-serif';

export function IgAvatar() {
  return (
    <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 38%, ${PURPLE_LIGHT} 0%, ${PURPLE} 45%, ${PURPLE_DEEP} 100%)` }}>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 120,
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 65%)",
        }}
      />
      <Img src={staticFile("brand/hangulmon_default.png")} style={{ position: "absolute", left: 130, top: 150, width: 820 }} />
    </AbsoluteFill>
  );
}

export type HighlightProps = { glyph?: keyof typeof ICON | null; text?: string | null };

export function IgHighlight({ glyph = null, text = null }: HighlightProps) {
  useIconFont();
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 46%, ${PURPLE_LIGHT} 0%, ${PURPLE} 40%, ${PURPLE_DEEP} 100%)`,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {glyph ? (
        <span style={{ fontFamily: "Ionicons", fontSize: 380, lineHeight: 1, color: "#fff" }}>{String.fromCodePoint(ICON[glyph])}</span>
      ) : (
        <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: 340, letterSpacing: -10, lineHeight: 1, color: "#fff" }}>{text}</span>
      )}
    </AbsoluteFill>
  );
}
