/* 촬영 브라우저에 앱보다 먼저 심는 코드 (Playwright addInitScript).
 * window.__PROMO_CONFIG = { mocks: [{ pattern, method, body }], user } 를 앞에서 넣어 준다.
 *
 * 1) 가짜 텔레그램 — 미니앱이 텔레그램 안에 있는 줄 안다 (로그인도 그대로 탄다)
 * 2) API 응답 — 장면 데이터로 답한다. 모르는 요청은 __promo.unmocked 에 남긴다
 * 3) 소리 — WebAudio 예약을 가로채 (시각, 파일) 로 남긴다 → 편집에서 같은 시각에 붙인다
 */
(() => {
  const config = window.__PROMO_CONFIG ?? { mocks: [], user: null };
  if (config.seed !== null && config.seed !== undefined) {
    // 같은 씨앗이면 같은 난수 (mulberry32)
    let s = config.seed >>> 0;
    Math.random = () => {
      s = (s + 0x6d2b79f5) >>> 0;
      let t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  localStorage.setItem("korio-language", "uz");
  // 처음 온 사람용 홈 안내 말풍선은 이미 본 것으로
  localStorage.setItem("korio-tour-seen", JSON.stringify({ "home.v1": true }));
  localStorage.setItem(
    "korio-sound-settings",
    JSON.stringify({ sfxVolume: 1, keyVolume: 1, uiSoundsEnabled: true, startMuted: false }),
  );

  // ── 1) 가짜 텔레그램 ──
  const deep = () =>
    new Proxy(function () {}, {
      get: (_target, prop) => (prop === "then" ? undefined : deep()),
      apply: () => undefined,
    });
  const insets = { top: 0, bottom: 0, left: 0, right: 0 };
  const base = {
    initData: "promo",
    initDataUnsafe: { user: { id: 1, first_name: "Aziz", language_code: "uz" } },
    version: "8.0",
    platform: "ios",
    colorScheme: "light",
    themeParams: {},
    isExpanded: true,
    isFullscreen: true,
    viewportHeight: window.innerHeight,
    viewportStableHeight: window.innerHeight,
    safeAreaInset: insets,
    contentSafeAreaInset: insets,
    isVersionAtLeast: () => true,
  };
  const webApp = new Proxy(base, { get: (target, prop) => (prop in target ? target[prop] : deep()) });
  Object.defineProperty(window, "Telegram", { value: { WebApp: webApp }, writable: false });

  // ── 2) API ──
  const state = { unmocked: [], sounds: [], t0: performance.now() };
  window.__promo = state;
  const realFetch = window.fetch.bind(window);
  const audioUrls = new WeakMap();
  const bufferUrls = new WeakMap();
  const mocks = config.mocks.map((m) => ({ ...m, regex: new RegExp(m.pattern) }));
  const json = (body) =>
    new Response(JSON.stringify(body ?? null), { headers: { "content-type": "application/json" }, status: 200 });

  window.fetch = async (input, init) => {
    const href = String(input instanceof Request ? input.url : input);
    const url = new URL(href, window.location.href);
    const method = (init?.method ?? (input instanceof Request ? input.method : "GET")).toUpperCase();
    const isApi = url.pathname.startsWith("/api/") || url.origin !== window.location.origin;
    if (!isApi) {
      const response = await realFetch(input, init);
      if (/\.(mp3|wav)$/.test(url.pathname)) {
        const read = response.arrayBuffer.bind(response);
        response.arrayBuffer = async () => {
          const data = await read();
          audioUrls.set(data, url.pathname);
          return data;
        };
      }
      return response;
    }
    const path = url.pathname.replace(/^\/api/, "") + url.search;
    if (path.startsWith("/auth/telegram")) return json({ accessToken: "promo", user: config.user });
    const hit = mocks.find((m) => (!m.method || m.method === method) && m.regex.test(path));
    if (!hit) state.unmocked.push(`${method} ${path}`);
    return json(hit ? hit.body : {});
  };

  // ── 3) 소리 ──
  const proto = BaseAudioContext.prototype;
  const decode = proto.decodeAudioData;
  proto.decodeAudioData = function (data, ...rest) {
    const src = audioUrls.get(data);
    return decode.call(this, data, ...rest).then((buffer) => {
      if (src) bufferUrls.set(buffer, src);
      return buffer;
    });
  };
  const start = AudioBufferSourceNode.prototype.start;
  AudioBufferSourceNode.prototype.start = function (when = 0, ...rest) {
    const delay = Math.max(0, when - this.context.currentTime) * 1000;
    const src = this.buffer ? bufferUrls.get(this.buffer) : undefined;
    if (src) state.sounds.push({ t: performance.now() - state.t0 + delay, src, rate: this.playbackRate.value });
    return start.call(this, when, ...rest);
  };

  // 헤드리스 크롬의 ICU 에는 우즈벡어 요일이 없어 "Thu" 로 나온다 — 우즈벡어 폰(CLDR uz)처럼 바꿔 준다
  const UZ_WEEKDAYS = ["Yak", "Dush", "Sesh", "Chor", "Pay", "Jum", "Shan"];
  const NativeDateTimeFormat = Intl.DateTimeFormat;
  function PromoDateTimeFormat(locales, options) {
    const native = new NativeDateTimeFormat(locales, options);
    const uzbek = !locales || String(locales).startsWith("uz");
    if (!uzbek || options?.weekday !== "short" || Object.keys(options).length !== 1) return native;
    // 진짜 인스턴스를 그대로 주고 글자 만드는 두 개만 덮는다 (다른 메서드를 찾는 코드가 깨지지 않게)
    const day = (date) => UZ_WEEKDAYS[new Date(date ?? Date.now()).getDay()];
    Object.defineProperty(native, "format", { value: day });
    Object.defineProperty(native, "formatToParts", { value: (date) => [{ type: "weekday", value: day(date) }] });
    return native;
  }
  PromoDateTimeFormat.prototype = NativeDateTimeFormat.prototype;
  PromoDateTimeFormat.supportedLocalesOf = NativeDateTimeFormat.supportedLocalesOf;
  Intl.DateTimeFormat = PromoDateTimeFormat;
})();
