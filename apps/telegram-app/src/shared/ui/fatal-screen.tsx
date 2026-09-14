"use client";

/**
 * 연결 실패 화면.
 *
 * ⚠️ **에러 코드를 반드시 화면에 보여준다.** 예전에는 매핑된 두 코드 말고는
 *    전부 "Hisobni ulab bo'lmadi" 한 줄로 뭉개졌다. 그래서 설정 사고(봇 토큰
 *    없음)와 데이터 문제(해시 불일치)와 네트워크 문제가 화면에서 전혀 구분되지
 *    않았고, 유저가 스크린샷을 보내와도 원인을 알 수 없었다.
 *
 * 유저에게는 무엇을 하라는 안내를, 아래 작은 글씨로는 코드를 보여준다.
 * 코드는 유저가 이해할 필요가 없다 — 그대로 옮겨 적어 보내주기만 하면 된다.
 *
 * 이 앱에는 아직 i18n 이 없어서 문구가 우즈벡어로 박혀 있다 (기존 방식 그대로).
 * 다국어가 필요해지면 그때 이 파일이 아니라 앱 전체에 붙여야 한다.
 */
const messages: Record<string, string> = {
  // ── 유저가 고칠 수 있는 것 ──
  TELEGRAM_INIT_DATA_MISSING:
    "Ilovani Telegram ichidagi App tugmasidan qayta oching.",
  TELEGRAM_RUNTIME_UNAVAILABLE: "Bu sahifa faqat Telegram ichida ishlaydi.",
  TELEGRAM_INIT_DATA_INVALID:
    "Telegram tekshiruvi o'tmadi. Ilovani yopib, App tugmasidan qayta oching.",

  // ── 서버 문제. 유저는 기다리는 것 말고 할 게 없다 ──
  TELEGRAM_NOT_CONFIGURED:
    "Xizmat sozlanmagan. Biz xabardormiz — birozdan keyin urinib ko'ring.",
  HTTP_404: "Server topilmadi. Birozdan keyin urinib ko'ring.",
  HTTP_502: "Server javob bermayapti. Birozdan keyin urinib ko'ring.",
  HTTP_503: "Server javob bermayapti. Birozdan keyin urinib ko'ring.",
  HTTP_429: "Juda ko'p urinish bo'ldi. Bir daqiqadan keyin qayta urining.",
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
        {code && (
          // 지원 요청할 때 이걸 그대로 보내면 원인이 바로 잡힌다
          <p className="error-code">{code}</p>
        )}
      </section>
    </main>
  );
}
