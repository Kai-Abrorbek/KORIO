import { Composition } from "remotion";
import { EP1_TOTAL, Ep1, Ep1Cover } from "./ep1/Ep1";
import { EP2_TOTAL, Ep2, Ep2Cover } from "./ep2/Ep2";
import { KorioIntro } from "./KorioIntro";
import { LaunchVideo } from "./launch/LaunchVideo";
import { IgAvatar, IgHighlight } from "./social/ProfileArt";
import { IgCover } from "./social/ReelCovers";
import { STORY_FPS, STORY_TOTAL } from "./story/plan";
import { StoryVideo } from "./story/StoryVideo";
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
      <Composition
        component={StoryVideo}
        durationInFrames={STORY_TOTAL}
        fps={STORY_FPS}
        height={1920}
        id="KorioStoryUz"
        width={1080}
      />
      <Composition
        component={Ep1}
        durationInFrames={EP1_TOTAL}
        fps={30}
        height={1920}
        id="BittaTovushEp1"
        width={1080}
      />
      <Composition component={Ep1Cover} durationInFrames={1} fps={30} height={1920} id="BittaTovushEp1Cover" width={1080} />
      <Composition component={Ep2} durationInFrames={EP2_TOTAL} fps={30} height={1920} id="TelefonLugati" width={1080} />
      <Composition component={Ep2Cover} durationInFrames={1} fps={30} height={1920} id="TelefonLugatiCover" width={1080} />
      <Composition component={IgAvatar}durationInFrames={1} fps={30} height={1080} id="IgAvatar" width={1080} />
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
