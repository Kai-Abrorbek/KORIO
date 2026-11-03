import { Composition } from "remotion";
import { AnMotCover } from "./AnMotCover";
import { AN_MOT_FRAMES, AnMotReel } from "./AnMotReel";

export function AnMotRoot() {
  return <>
    <Composition id="AnMotReel" component={AnMotReel} durationInFrames={AN_MOT_FRAMES} fps={30} width={1080} height={1920} />
    <Composition id="AnMotCover" component={AnMotCover} defaultProps={{ guides: false }} durationInFrames={1} fps={30} width={1080} height={1920} />
  </>;
}
