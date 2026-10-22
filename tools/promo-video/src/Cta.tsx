import { AbsoluteFill, Img, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Wordmark } from "./Hook";
import { FONT, Icon, Rich } from "./theme";

/** 마지막 8초 — 로고 · "Hoziroq yuklab oling!" · 앱스토어 / 구글플레이 / 텔레그램 */
export const TELEGRAM_BOT = "@KorioLoginBot";

const STORES = [
  { icon: "apple", small: "Yuklab oling", big: "App Store", bg: "#111", fg: "white" },
  { icon: "play", small: "Yuklab oling", big: "Google Play", bg: "#111", fg: "white" },
  { icon: "plane", small: "Telegram mini ilova", big: TELEGRAM_BOT, bg: "#2AABEE", fg: "white" },
] as const;

export function Cta() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const mascot = spring({ frame: frame - 4, fps, config: { damping: 10, stiffness: 120 } });
  const title = spring({ frame: frame - 12, fps, config: { damping: 12, stiffness: 180 } });
  const brand = spring({ frame, fps, config: { damping: 11, stiffness: 160 } });

  return (
    <AbsoluteFill style={{ alignItems: "center" }}>
      <div style={{ marginTop: 150, transform: `scale(${brand})` }}>
        <Wordmark size={170} />
      </div>
      <div
        style={{
          marginTop: 10,
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 44,
          color: "white",
          opacity: brand,
        }}
      >
        Koreys tilini o‘yin kabi o‘rganing
      </div>
      <Img
        src={staticFile("brand/hangulmon_level_up.png")}
        style={{
          width: 600,
          marginTop: 10,
          transform: `translateY(${(1 - mascot) * 500 + Math.sin(frame / 7) * 10}px)`,
        }}
      />
      <div
        style={{
          marginTop: -20,
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 88,
          color: "white",
          textAlign: "center",
          textShadow: "0 8px 0 rgba(20,8,60,0.3)",
          transform: `scale(${title})`,
        }}
      >
        <Rich text="Hoziroq *yuklab oling!*" />
      </div>
      <div style={{ marginTop: 44, display: "flex", flexDirection: "column", gap: 26, alignItems: "center" }}>
        {STORES.map((store, i) => {
          const pop = spring({ frame: frame - 26 - i * 7, fps, config: { damping: 12, stiffness: 200 } });
          return (
            <div
              key={store.big}
              style={{
                width: 760,
                height: 132,
                borderRadius: 36,
                background: store.bg,
                color: store.fg,
                display: "flex",
                alignItems: "center",
                gap: 30,
                padding: "0 46px",
                boxShadow: "0 12px 0 rgba(20,8,60,0.35)",
                border: "3px solid rgba(255,255,255,0.25)",
                transform: `translateX(${(1 - pop) * (i % 2 ? 900 : -900)}px)`,
              }}
            >
              <Icon name={store.icon} size={74} />
              <div style={{ fontFamily: FONT, lineHeight: 1.05 }}>
                <div style={{ fontWeight: 700, fontSize: 30, opacity: 0.85 }}>{store.small}</div>
                <div style={{ fontWeight: 900, fontSize: 54 }}>{store.big}</div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}
