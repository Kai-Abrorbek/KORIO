import { apiBaseUrl } from "../config/env";

/**
 * 서버가 주는 에러는 대문자 코드다 (NOT_AN_ADMIN, MISSING_PERMISSION:users:write …).
 * 화면이 그걸 보고 사람이 읽을 안내를 고른다.
 */
export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
  ) {
    super(code);
    this.name = "ApiError";
  }
}

const TOKEN_KEY = "korio_admin_token";

/**
 * 토큰 보관.
 *
 * localStorage 를 쓴다. 어드민 토큰은 8시간짜리라 탭을 닫아도 살아 있는 편이
 * 낫고(하루 일과 중 새로고침이 잦다), XSS 가 나면 어차피 httpOnly 쿠키여도
 * 그 세션 안에서 뭐든 할 수 있다. 대신 만료를 짧게 가져간다.
 *
 * ⚠️ 정적 export 라 SSR 이 없다. 그래도 접근 시점에 window 를 확인한다 —
 *    Next 가 빌드할 때 이 모듈을 한 번 평가한다.
 */
export const AdminToken = {
  get(): string | null {
    if (typeof window === "undefined") return null;
    try {
      return window.localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  set(token: string) {
    try {
      window.localStorage.setItem(TOKEN_KEY, token);
    } catch {
      /* 사생활 보호 모드 등. 이 탭에서만 살아도 동작은 한다 */
    }
  },
  clear() {
    try {
      window.localStorage.removeItem(TOKEN_KEY);
    } catch {
      /* 무시 */
    }
  },
};

/** 401 이 오면 화면이 로그인으로 보내야 한다. 여기서 알린다 */
type UnauthorizedHandler = () => void;
let onUnauthorized: UnauthorizedHandler | null = null;
export function setUnauthorizedHandler(fn: UnauthorizedHandler | null) {
  onUnauthorized = fn;
}

async function errorCode(res: Response): Promise<string> {
  try {
    const body: unknown = await res.json();
    if (
      body &&
      typeof body === "object" &&
      "message" in body &&
      typeof body.message === "string"
    ) {
      return body.message;
    }
  } catch {
    /* JSON 이 아닌 응답 */
  }
  return `HTTP_${res.status}`;
}

export async function apiRequest<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }
  const token = AdminToken.get();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${apiBaseUrl()}${path}`, {
    ...init,
    cache: "no-store",
    headers,
  });

  if (!res.ok) {
    const code = await errorCode(res);
    // 토큰이 죽었으면(만료·권한 회수) 더 들고 있을 이유가 없다.
    // 서버는 매 요청 DB 에서 권한을 다시 읽으므로 권한을 뺏기면 즉시 여기로 온다
    if (res.status === 401) {
      AdminToken.clear();
      onUnauthorized?.();
    }
    throw new ApiError(res.status, code);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export const api = {
  get: <T>(path: string) => apiRequest<T>(path),
  post: <T>(path: string, body?: unknown) =>
    apiRequest<T>(path, {
      method: "POST",
      body: body === undefined ? undefined : JSON.stringify(body),
    }),
  patch: <T>(path: string, body?: unknown) =>
    apiRequest<T>(path, {
      method: "PATCH",
      body: body === undefined ? undefined : JSON.stringify(body),
    }),
};

/** 쿼리스트링. 값이 없는 키는 아예 안 붙인다 */
export function qs(params: Record<string, string | number | undefined | null>) {
  const out = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === "") continue;
    out.set(k, String(v));
  }
  const s = out.toString();
  return s ? `?${s}` : "";
}
