import { AbsoluteFill, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SECTIONS, type Caption } from "./timeline";
import { FONT, Rich } from "./theme";

/** 휴대폰 위 자막 — 장면마다 튀어 들어오고, 다음 자막 직전에 빠진다 */
function CaptionCard({ caption, length }: { caption: Caption; length: number }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 12, stiffness: 180, mass: 0.7 } });
  const subPop = spring({ frame: frame - 6, fps, config: { damping: 14, stiffness: 160 } });
  const out = interpolate(frame, [length - 5, length], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 70, opacity: out }}>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 76,
          lineHeight: 1.12,
          color: "white",
          textAlign: "center",
          letterSpacing: -1,
          textShadow: "0 6px 0 rgba(20,8,60,0.28), 0 14px 40px rgba(20,8,60,0.35)",
          transform: `translateY(${(1 - pop) * 50}px) scale(${0.7 + pop * 0.3})`,
          maxWidth: 1000,
        }}
      >
        <Rich text={caption.title} />
      </div>
      {caption.sub ? (
        <div
          style={{
            marginTop: 22,
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 38,
            color: "white",
            background: "rgba(20,8,60,0.28)",
            border: "2px solid rgba(255,255,255,0.28)",
            borderRadius: 999,
            padding: "10px 30px 14px",
            opacity: subPop,
            transform: `translateY(${(1 - subPop) * 24}px)`,
          }}
        >
          {caption.sub}
        </div>
      ) : null}
    </AbsoluteFill>
  );
}

export function Captions() {
  return (
    <>
      {SECTIONS.flatMap((section) =>
        section.captions.map((caption, i) => {
          const start = section.from + (caption.at ?? 0);
          const next = section.captions[i + 1];
          const end = next ? section.from + (next.at ?? 0) : section.from + section.dur;
          return (
            <Sequence durationInFrames={end - start} from={start} key={`${section.id}-${i}`} name={`caption ${section.id}`}>
              <CaptionCard caption={caption} length={end - start} />
            </Sequence>
          );
        }),
      )}
    </>
  );
}
