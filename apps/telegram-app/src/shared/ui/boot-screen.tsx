import Image from "next/image";

export function BootScreen({ message }: { message: string }) {
  return (
    <main
      aria-label={message}
      aria-live="polite"
      className="app-viewport boot-screen"
    >
      <div className="boot-logo">
        <Image alt="KORIO" height={230} priority src="/korio-logo.jpg" width={230} />
      </div>
    </main>
  );
}
