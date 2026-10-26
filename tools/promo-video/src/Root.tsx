import { Composition } from "remotion";
import { IgAvatar, IgHighlight } from "./social/ProfileArt";
import { HANGUL_GUIDE_TOTAL, HangulGuide, HangulGuideCover } from "./tutorial/HangulGuide";

/**
 * 영상은 게시가 끝나면 코드째 지운다 — 새 영상은 여기에 등록하고, 올린 뒤 등록도 함께 뺀다.
 * 남는 것: 프로필 그림 (프로필 사진 · 하이라이트 표지)
 */
export function Root() {
  return (
    <>
      <Composition component={HangulGuide} durationInFrames={HANGUL_GUIDE_TOTAL} fps={30} height={1920} id="HangulGuide" width={1080} />
      <Composition component={HangulGuideCover} durationInFrames={1} fps={30} height={1920} id="HangulGuideCover" width={1080} />
      <Composition component={IgAvatar} durationInFrames={1} fps={30} height={1080} id="IgAvatar" width={1080} />
      <Composition
        component={IgHighlight}
        defaultProps={{ glyph: "school", text: null }}
        durationInFrames={1}
        fps={30}
        height={1920}
        id="IgHighlight"
        width={1080}
      />
    </>
  );
}
