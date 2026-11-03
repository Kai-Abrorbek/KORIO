/**
 * 릴스 표지(썸네일) 틀 — 편마다 표지는 이 틀 위에 따로 그린다 (게시 후에도 남기는 도구).
 *
 *   remotion still src/index.ts <편>Cover social/covers/<편>.png          # 올릴 표지
 *   remotion still src/index.ts <편>Cover out/cover-check.png --props='{"guides":true}'   # 잘리는 선 확인
 *   node social/zernio.mjs post <영상> <캡션> --cover social/covers/<편>.png
 *
 * 인스타그램은 1080×1920 표지를 프로필 격자에서 가운데 3:4(1080×1440, y 240–1680)로, 피드에서는 4:5(y 285–1635)로 자른다.
 * 그래서 글자 · 그림은 SAFE(y 300–1600) 안에만 둔다. 격자에서 1/3 크기로 보이므로 제목은 110px 이상, 2~3줄, 단어 3~6개.
 */
import type { ReactNode } from "react";
import { AbsoluteFill } from "remotion";

export const COVER_SAFE = { top: 300, bottom: 1600 } as const;

export type CoverProps = { guides?: boolean };

export function CoverFrame({ background, guides = false, children }: { background: string; guides?: boolean; children: ReactNode }) {
  return (
    <AbsoluteFill style={{ background, overflow: "hidden" }}>
      {children}
      {guides ? (
        <>
          {/* 프로필 격자 3:4 */}
          <div style={{ position: "absolute", left: 0, right: 0, top: 240, height: 1440, border: "6px dashed rgba(255,80,80,0.9)" }} />
          {/* 피드 4:5 */}
          <div style={{ position: "absolute", left: 0, right: 0, top: 285, height: 1350, border: "6px dashed rgba(80,200,255,0.9)" }} />
        </>
      ) : null}
    </AbsoluteFill>
  );
}
