import type { SVGProps } from "react";

import type { LearningIconName } from "../model/learning-options";

interface LearningIconProps extends SVGProps<SVGSVGElement> {
  name: LearningIconName;
  size?: number;
}

function Glyph({ name }: { name: LearningIconName }) {
  switch (name) {
    case "footsteps":
      return (
        <>
          <path d="M7.3 13.2c-1.8.5-3.7-1-4.2-3.3S3.7 5.4 5.5 5s3.6 1 4.1 3.3-.5 4.4-2.3 4.9Zm9.4 6.1c-1.8-.4-2.8-2.6-2.3-4.9s2.3-3.8 4.2-3.3 2.8 2.6 2.3 4.9-2.4 3.7-4.2 3.3Z" />
          <path d="m8 14.5 1.8 5.8M16 10l-1.8-5.8" />
        </>
      );
    case "compass":
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="m15.5 8.5-2 5-5 2 2-5Z" />
        </>
      );
    case "text":
      return <path d="M4 6V4h16v2M9 20h6M12 4v16" />;
    case "construct":
      return (
        <>
          <path d="m14.7 6.3 3-3a4 4 0 0 1-5 5L5 16l3 3 7.7-7.7a4 4 0 0 1 5-5l-3 3Z" />
          <path d="m4 4 5 5" />
        </>
      );
    case "chatbubble":
      return <path d="M20 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4Zm-12-4h.01M12 11h.01M16 11h.01" />;
    case "chatbubbles":
      return (
        <>
          <path d="M15 15a5 5 0 0 1-5 5H6l-4 2V9a5 5 0 0 1 5-5h3a5 5 0 0 1 5 5Z" />
          <path d="M10 4a5 5 0 0 1 5-2h2a5 5 0 0 1 5 5v9l-4-2h-3" />
        </>
      );
    case "mic":
      return (
        <>
          <rect x="8" y="3" width="8" height="12" rx="4" />
          <path d="M5 11a7 7 0 0 0 14 0M12 18v3m-4 0h8" />
        </>
      );
    case "headset":
      return <path d="M4 14v-3a8 8 0 0 1 16 0v3M4 14h3v6H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 1-2Zm16 0h-3v6h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-1-2Z" />;
    case "barbell":
      return <path d="M4 8v8m4-10v12m8-12v12m4-10v8M8 12h8M2 10v4m20-4v4" />;
    case "game":
      return (
        <>
          <path d="M8 7h8a5 5 0 0 1 4.7 6.7l-1.2 3.5a2.6 2.6 0 0 1-4.4.8L13.5 16h-3L8.9 18a2.6 2.6 0 0 1-4.4-.8l-1.2-3.5A5 5 0 0 1 8 7Z" />
          <path d="M7 10v4m-2-2h4m6-1h.01M18 13h.01" />
        </>
      );
    case "albums":
      return (
        <>
          <rect x="5" y="4" width="14" height="16" rx="2" />
          <path d="M8 1h8M8 23h8M9 8h6m-6 4h6" />
        </>
      );
    case "book":
      return (
        <>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5Z" />
          <path d="M4 6.5v13A2.5 2.5 0 0 0 6.5 22H20v-5" />
        </>
      );
    case "ribbon":
      return (
        <>
          <circle cx="12" cy="8" r="5" />
          <path d="m8.5 12-1 9 4.5-3 4.5 3-1-9" />
        </>
      );
    case "lock":
      return (
        <>
          <rect x="5" y="10" width="14" height="11" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </>
      );
  }
}

export function LearningIcon({
  name,
  size = 24,
  ...props
}: LearningIconProps) {
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
