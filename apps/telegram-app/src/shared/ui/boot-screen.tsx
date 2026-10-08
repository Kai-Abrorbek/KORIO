import Image from "next/image";

const BRAND_NAME = "Korio";

export function BootScreen({ message }: { message: string }) {
  return (
    <main
      aria-label={message}
      aria-live="polite"
      className="app-viewport boot-screen"
    >
      <div className="boot-mascot" aria-hidden="true">
        <Image
          alt=""
          height={270}
          priority
          src="/characters/hangulmon_confident.png"
          width={270}
        />
      </div>

      <div aria-label={BRAND_NAME} className="boot-logo" role="img">
        <svg
          aria-hidden="true"
          className="boot-logo-mark"
          height="86"
          viewBox="0 0 64 64"
          width="86"
        >
          <rect fill="#7F77DD" height="60" rx="18" width="60" x="2" y="2" />
          <rect fill="#FFFFFF" height="4.5" rx="2.25" width="24" x="20" y="14" />
          <rect fill="#FFFFFF" height="8" rx="2.25" width="4.5" x="29.75" y="18" />
          <circle cx="32" cy="40" fill="none" r="12" stroke="#FFFFFF" strokeWidth="4.5" />
          <circle cx="38" cy="36" fill="#FAC775" r="2" />
        </svg>
        <span aria-hidden="true" className="boot-logo-text">
          {BRAND_NAME.split("").map((letter, index) => (
            <i key={`${letter}-${index}`}>{letter}</i>
          ))}
        </span>
      </div>
    </main>
  );
}
