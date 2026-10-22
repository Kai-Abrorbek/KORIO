import { Composition } from "remotion";
import { KorioIntro } from "./KorioIntro";
import { LaunchVideo } from "./launch/LaunchVideo";
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
    </>
  );
}
