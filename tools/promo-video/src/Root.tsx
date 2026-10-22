import { Composition } from "remotion";
import { KorioIntro } from "./KorioIntro";
import { FPS, TOTAL } from "./timeline";

export function Root() {
  return (
    <Composition
      component={KorioIntro}
      durationInFrames={TOTAL}
      fps={FPS}
      height={1920}
      id="KorioIntroUz"
      width={1080}
    />
  );
}
