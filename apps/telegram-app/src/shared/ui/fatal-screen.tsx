"use client";

const messages: Record<string, string> = {
  TELEGRAM_INIT_DATA_MISSING:
    "Ilovani Telegram ichidagi App tugmasidan qayta oching.",
  TELEGRAM_RUNTIME_UNAVAILABLE: "Bu sahifa faqat Telegram ichida ishlaydi.",
};

export function FatalScreen({ code }: { code: string | null }) {
  const message =
    (code && messages[code]) ||
    "Hisobni ulab bo'lmadi. Ilovani yopib, qayta oching.";

  return (
    <main className="app-viewport boot-screen">
      <section className="error-card" role="alert">
        <p className="eyebrow">ULANISH XATOSI</p>
        <h1>Qayta urinib ko&apos;ring</h1>
        <p className="muted-copy">{message}</p>
        <button
          className="primary-button"
          type="button"
          onClick={() => window.location.reload()}
        >
          Qayta yuklash
        </button>
      </section>
    </main>
  );
}
