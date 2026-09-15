import type { SVGProps } from "react";

export type HomeIconName =
  | "arrow"
  | "bell"
  | "book"
  | "chart"
  | "check"
  | "chevron"
  | "flame"
  | "heart"
  | "home"
  | "menu"
  | "person"
  | "refresh"
  | "ribbon"
  | "search"
  | "settings"
  | "shop"
  | "sparkles"
  | "swap"
  | "target"
  | "trophy";

interface HomeIconProps extends SVGProps<SVGSVGElement> {
  name: HomeIconName;
  size?: number;
}

function Glyph({ name }: { name: HomeIconName }) {
  switch (name) {
    case "menu":
      return <path d="M4 7h16M4 12h16M4 17h16" />;
    case "bell":
      return (
        <>
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z" />
          <path d="M10 21h4" />
        </>
      );
    case "flame":
      return <path d="M12 22c4.4 0 7-3 7-7 0-3.4-2-6.8-5.2-10.6.1 3-1.7 4.7-3 5.8.2-2.8-1.4-5.2-2.8-6.7C7.5 7.4 5 9.8 5 14.2 5 18.6 7.7 22 12 22Z" />;
    case "check":
      return <path d="m5 12 4 4L19 6" />;
    case "chevron":
      return <path d="m9 18 6-6-6-6" />;
    case "person":
      return (
        <>
          <circle cx="12" cy="8" r="4" />
          <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
        </>
      );
    case "book":
      return (
        <>
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v17H6.5A2.5 2.5 0 0 0 4 22Z" />
          <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v17h4.5A2.5 2.5 0 0 1 20 22Z" />
        </>
      );
    case "swap":
      return (
        <>
          <path d="M4 7h13m0 0-3-3m3 3-3 3" />
          <path d="M20 17H7m0 0 3-3m-3 3 3 3" />
        </>
      );
    case "settings":
      return (
        <>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" />
        </>
      );
    case "sparkles":
      return (
        <>
          <path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2Z" />
          <path d="m18.5 14 .8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8Z" />
          <path d="m5 13 .8 2.2L8 16l-2.2.8L5 19l-.8-2.2L2 16l2.2-.8Z" />
        </>
      );
    case "arrow":
      return <path d="M5 12h14m-5-5 5 5-5 5" />;
    case "refresh":
      return (
        <>
          <path d="M20 7v5h-5" />
          <path d="M18.5 16A8 8 0 1 1 19 8l1 4" />
        </>
      );
    case "shop":
      return (
        <>
          <path d="M5 9h14l-1 12H6Z" />
          <path d="M9 10V7a3 3 0 0 1 6 0v3" />
        </>
      );
    case "target":
      return (
        <>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3" />
          <path d="m14 10 6-6m-3 0h3v3" />
        </>
      );
    case "search":
      return (
        <>
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="m16 16 4 4" />
        </>
      );
    case "heart":
      return <path d="M20.8 5.8a5.5 5.5 0 0 0-7.8 0L12 6.9l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.4a5.5 5.5 0 0 0 0-7.8Z" />;
    case "home":
      return (
        <>
          <path d="m3 11 9-8 9 8" />
          <path d="M5 10v11h14V10M9 21v-7h6v7" />
        </>
      );
    case "chart":
      return (
        <>
          <path d="M4 20V10m6 10V4m6 16v-7m4 7H2" />
        </>
      );
    case "trophy":
      return (
        <>
          <path d="M8 4h8v5a4 4 0 0 1-8 0Z" />
          <path d="M8 6H4v2a4 4 0 0 0 4 4m8-6h4v2a4 4 0 0 1-4 4M12 13v5m-4 3h8m-6-3h4" />
        </>
      );
    case "ribbon":
      return (
        <>
          <circle cx="12" cy="8" r="5" />
          <path d="m8.5 12-1 10 4.5-3 4.5 3-1-10" />
        </>
      );
  }
}

export function HomeIcon({
  name,
  size = 24,
  ...props
}: HomeIconProps) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      {...props}
    >
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <Glyph name={name} />
      </g>
    </svg>
  );
}
