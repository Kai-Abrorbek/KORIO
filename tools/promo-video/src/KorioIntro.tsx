import { AbsoluteFill, Sequence } from "remotion";
import { Background } from "./Background";
import { Captions } from "./Captions";
import { Cta } from "./Cta";
import { Hook } from "./Hook";
import { Phone } from "./Phone";
import { Soundtrack } from "./Soundtrack";
import { section, TUTOR_LEAD } from "./timeline";
import { TutorDialogue } from "./TutorDialogue";
import { useIconFont } from "./theme";

/** KORIO 소개 영상 (우즈벡어 자막+내레이션 · 9:16 · 길이는 내레이션에 맞춰 timeline 이 정한다) */
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
      <Sequence
        durationInFrames={tutor.dur - TUTOR_LEAD}
        from={tutor.from + TUTOR_LEAD}
        name="tutor dialogue"
      >
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
