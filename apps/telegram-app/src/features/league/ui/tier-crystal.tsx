"use client";

import { useId, type CSSProperties } from "react";

import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { LOCKED_TIER, type TierMeta } from "../model/league";
import styles from "./tier-crystal.module.css";

interface TierCrystalProps {
  tier: TierMeta;
  locked?: boolean;
  size?: number;
  active?: boolean;
  shattering?: boolean;
}

export function TierCrystal({
  tier,
  locked = false,
  size = 110,
  shattering = false,
}: TierCrystalProps) {
  const gradientId = `tier-${useId().replaceAll(":", "")}`;
  const color = locked ? LOCKED_TIER : tier;
  const cx = 50;
  const cy = 42;
  const radius = 34;
  const points = Array.from({ length: tier.facets * 2 }, (_, index) => {
    const angle = (Math.PI * 2 * index) / (tier.facets * 2) - Math.PI / 2;
    const distance = index % 2 === 0 ? radius : radius * 0.62;
    return `${cx + Math.cos(angle) * distance},${cy + Math.sin(angle) * distance}`;
  }).join(" ");

  return (
    <span
      aria-label={tier.key}
      className={[
        styles.wrap,
        shattering ? styles.shattering : "",
      ].join(" ")}
      style={{
        "--tier-color": color.color,
        "--tier-light": color.colorLight,
        height: size * 1.15,
        width: size,
      } as CSSProperties}
    >
      {!locked && tier.rays > 0 ? (
        <span className={styles.rays}>
          {Array.from({ length: tier.rays }, (_, index) => (
            <i
              key={index}
              style={{
                height: size * 0.75,
                transform: `rotate(${(360 / tier.rays) * index}deg)`,
              }}
            />
          ))}
        </span>
      ) : null}
      {!locked && tier.glow ? <span className={styles.glow} /> : null}

      <svg
        aria-hidden="true"
        className={styles.crystal}
        height={size * 1.15}
        viewBox="0 0 100 115"
        width={size}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor={color.colorLight} />
            <stop offset="0.5" stopColor={color.color} />
            <stop offset="1" stopColor={color.colorDark} />
          </linearGradient>
        </defs>
        <ellipse
          cx="50"
          cy="103"
          fill={locked ? "#DDE2E7" : "#CFE3F2"}
          rx="30"
          ry="8"
        />
        <path d="M42 78 L58 78 L54 98 L46 98 Z" fill={color.colorDark} />
        <polygon
          fill={`url(#${gradientId})`}
          points={points}
          stroke={color.colorDark}
          strokeWidth="2.5"
        />
        {!locked ? (
          <polygon
            fill="#fff"
            opacity="0.35"
            points={`${cx},${cy - radius * 0.8} ${cx + radius * 0.3},${cy} ${cx},${cy + radius * 0.4} ${cx - radius * 0.3},${cy}`}
          />
        ) : null}
      </svg>

      {locked ? (
        <span className={styles.lock} style={{ top: size * 0.3 }}>
          <MobileIcon name="lock-closed" size={size * 0.22} />
        </span>
      ) : null}
    </span>
  );
}
