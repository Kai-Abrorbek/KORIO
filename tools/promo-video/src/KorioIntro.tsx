import { AbsoluteFill, Sequence } from "remotion";
import { Background } from "./Background";
import { Captions } from "./Captions";
import { Cta } from "./Cta";
import { Hook } from "./Hook";
import { Phone } from "./Phone";
import { Soundtrack } from "./Soundtrack";
import { section } from "./timeline";
import { TutorDialogue } from "./TutorDialogue";
import { useIconFont } from "./theme";

/** KORIO 소개 영상 (우즈벡어 · 9:16 · 60초) */
export function KorioIntro() {
  useIconFont();
  const hook = section("hook");
  const cta = section("cta");
  const tutor = section("tutor");
  return (
    <AbsoluteFill style={{ background: "#7C5CFF" }}>
      <Background />
      <Sequence durationInFrames={hook.dur + 12} from={0} name="hook">
        <Hook exitAt={hook.dur - 10} />
      </Sequence>
      <Phone />
      <Sequence durationInFrames={tutor.dur} from={tutor.from} name="tutor dialogue">
        <TutorDialogue />
      </Sequence>
      <Captions />
      <Sequence from={cta.from} name="cta">
        <Cta />
      </Sequence>
      <Soundtrack />
    </AbsoluteFill>
  );
}
