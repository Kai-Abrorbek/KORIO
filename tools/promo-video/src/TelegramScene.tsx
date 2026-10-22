import type { ReactNode } from "react";
import { AbsoluteFill, Img, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Icon } from "./theme";

/**
 * 텔레그램 대화창 → 봇 메시지의 "Ilovani ochish" 를 누르면 미니앱이 아래에서 올라온다.
 * 좌표는 앱 화면과 같은 390×844 로 그리고 휴대폰 화면(680)에 맞춰 키운다.
 */
const W = 390;
const H = 844;
const SCALE = 680 / W;
export const TAP_AT = 46;
export const SHEET_AT = 54;
const UI = '-apple-system, "Segoe UI", Roboto, sans-serif';

function usePop(at: number) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - at, fps, config: { damping: 13, stiffness: 190, mass: 0.6 } });
}

function Bubble({ at, side, children }: { at: number; side: "in" | "out"; children: ReactNode }) {
  const pop = usePop(at);
  return (
    <div
      style={{
        alignSelf: side === "out" ? "flex-end" : "flex-start",
        maxWidth: 290,
        background: side === "out" ? "#E1FFC7" : "white",
        borderRadius: 18,
        borderBottomRightRadius: side === "out" ? 6 : 18,
        borderBottomLeftRadius: side === "in" ? 6 : 18,
        padding: "8px 12px",
        fontFamily: UI,
        fontSize: 16,
        lineHeight: 1.35,
        color: "#111",
        boxShadow: "0 1px 1px rgba(0,0,0,0.12)",
        opacity: pop,
        transform: `scale(${0.6 + pop * 0.4})`,
        transformOrigin: side === "out" ? "100% 100%" : "0% 100%",
      }}
    >
      {children}
    </div>
  );
}

export function TelegramScene({ children }: { children: ReactNode }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sheet = spring({ frame: frame - SHEET_AT, fps, config: { damping: 18, stiffness: 120 } });
  const tap = frame - TAP_AT;
  const button = usePop(22);

  return (
    <AbsoluteFill style={{ background: "#0E1621" }}>
      <div style={{ width: W, height: H, transform: `scale(${SCALE})`, transformOrigin: "0 0", position: "relative", overflow: "hidden" }}>
        {/* 대화창 */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, #A8D59A 0%, #7CBF8E 45%, #5FA9A0 100%)" }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.18,
            backgroundImage: "radial-gradient(circle at 10px 10px, white 2px, transparent 2.5px)",
            backgroundSize: "34px 34px",
          }}
        />
        <header
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 64,
            background: "white",
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "0 12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            fontFamily: UI,
          }}
        >
          <Icon color="#3390EC" name="back" size={24} />
          <div style={{ width: 42, height: 42, borderRadius: 21, background: "#EDE7FF", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile("brand/hangulmon_default_float.png")} style={{ width: 44 }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 17, color: "#111" }}>KORIO</div>
            <div style={{ fontSize: 13, color: "#8A8A8E" }}>bot</div>
          </div>
          <Icon color="#8A8A8E" name="dots" size={22} />
        </header>

        <div style={{ position: "absolute", left: 10, right: 10, bottom: 70, display: "flex", flexDirection: "column", gap: 8 }}>
          <Bubble at={4} side="out">
            /start <span style={{ fontSize: 11, color: "#4FAE4E", marginLeft: 6 }}>10:00 ✓✓</span>
          </Bubble>
          <Bubble at={14} side="in">
            <Img src={staticFile("brand/hangulmon_celebrating.png")} style={{ width: 230, display: "block", margin: "0 auto 4px" }} />
            <b>Salom, Aziz!</b> Bugun koreyscha nima o‘rganamiz?
          </Bubble>
          <div
            style={{
              alignSelf: "flex-start",
              width: 290,
              height: 44,
              borderRadius: 12,
              background: "rgba(40,80,60,0.45)",
              color: "white",
              fontFamily: UI,
              fontWeight: 700,
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              position: "relative",
              overflow: "hidden",
              opacity: button,
              transform: `scale(${(0.7 + button * 0.3) * (tap >= 0 && tap < 8 ? 0.95 : 1)})`,
            }}
          >
            <Icon name="rocket" size={18} />
            Ilovani ochish
            {tap >= 0 && tap < 16 ? (
              <span
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: 30 + tap * 22,
                  height: 30 + tap * 22,
                  marginLeft: -(15 + tap * 11),
                  marginTop: -(15 + tap * 11),
                  borderRadius: "50%",
                  background: "white",
                  opacity: interpolate(tap, [0, 16], [0.55, 0]),
                }}
              />
            ) : null}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 56,
            background: "white",
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "0 14px",
            fontFamily: UI,
            color: "#9A9A9F",
            fontSize: 16,
          }}
        >
          <Icon name="happy" size={24} />
          <span style={{ flex: 1 }}>Xabar</span>
          <Icon name="attach" size={24} />
          <Icon name="mic" size={24} />
        </div>

        {/* 손가락 탭 */}
        {tap >= -10 && tap < 10 ? (
          <div
            style={{
              position: "absolute",
              left: 120,
              top: 760 - 70 + 8,
              width: 48,
              height: 48,
              borderRadius: 24,
              background: "rgba(255,255,255,0.85)",
              border: "3px solid rgba(0,0,0,0.15)",
              opacity: interpolate(tap, [-10, -4, 4, 10], [0, 1, 1, 0]),
              transform: `scale(${tap < 0 ? 1.2 : 0.85})`,
            }}
          />
        ) : null}

        {/* 미니앱 */}
        {frame >= SHEET_AT ? (
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: H,
              transform: `translateY(${(1 - sheet) * H}px)`,
              background: "white",
              borderTopLeftRadius: 14,
              borderTopRightRadius: 14,
              overflow: "hidden",
              boxShadow: "0 -10px 40px rgba(0,0,0,0.3)",
            }}
          >
            <div
              style={{
                height: 52,
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "0 14px",
                borderBottom: "1px solid #EEE",
                fontFamily: UI,
                background: "white",
                position: "relative",
                zIndex: 1,
              }}
            >
              <Icon color="#3390EC" name="close" size={24} />
              <div style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: "#111" }}>KORIO</div>
                <div style={{ fontSize: 12, color: "#8A8A8E" }}>mini ilova</div>
              </div>
              <Icon color="#3390EC" name="dots" size={22} />
            </div>
            <div style={{ position: "absolute", top: 52, left: 0, width: W, height: H }}>
              <Sequence from={SHEET_AT} layout="none">
                {children}
              </Sequence>
            </div>
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
}
