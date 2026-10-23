import { Composition } from "remotion";
import { KorioIntro } from "./KorioIntro";
import { LaunchVideo } from "./launch/LaunchVideo";
import { IgAvatar, IgHighlight } from "./social/ProfileArt";
import { IgCover } from "./social/ReelCovers";
import { LAUNCH_FPS, LAUNCH_TOTAL } from "./launch/plan";
import { FPS, TOTAL } from "./timeline";

export function Root() {
  return (
    <>
      <Composition
        component={KorioIntro}
        durationInFrames={TOTAL}
        fps={FPS}
        height={1920}
        id="KorioIntroUz"
        width={1080}
      />
      <Composition
        component={LaunchVideo}
        durationInFrames={LAUNCH_TOTAL}
        fps={LAUNCH_FPS}
        height={1920}
        id="KorioLaunchUz"
        width={1080}
      />
      <Composition component={IgAvatar} durationInFrames={1} fps={30} height={1080} id="IgAvatar" width={1080} />
      <Composition
        component={IgCover}
        defaultProps={{ variant: "launch" as const }}
        durationInFrames={1}
        fps={30}
        height={1920}
        id="IgCover"
        width={1080}
      />
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
