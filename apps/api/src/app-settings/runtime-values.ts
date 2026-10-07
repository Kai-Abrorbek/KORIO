/**
 * 서버 인스턴스별 최신 설정 스냅샷. DB가 기준이고 이 맵은 동기 계산 경로의 읽기 캐시다.
 * 상수처럼 읽는 기존 학습·보상 코드가 요청마다 DB를 조회하지 않게 한다.
 */
let current = new Map<string, number>();
const scalarHooks = new Map<
  string,
  { fallback: number; set: (value: number) => void }
>();
const proxyCache = new WeakMap<object, Map<string, object>>();

/** import된 primitive 값도 live binding으로 갱신한다. */
export function registerRuntimeScalar(
  key: string,
  fallback: number,
  set: (value: number) => void,
) {
  scalarHooks.set(key, { fallback, set });
  set(current.get(key) ?? fallback);
}

export function replaceRuntimeValues(values: ReadonlyMap<string, number>) {
  current = new Map(values);
  for (const [key, hook] of scalarHooks)
    hook.set(current.get(key) ?? hook.fallback);
}

export function putRuntimeValue(key: string, value: number) {
  current.set(key, value);
  scalarHooks.get(key)?.set(value);
}

export function runtimeNumber(key: string, fallback: number): number {
  return current.get(key) ?? fallback;
}

/** 숫자 leaf만 DB 오버라이드로 치환한다. 객체 구조·식별자는 코드가 계속 소유한다. */
export function runtimeConfig<T extends object>(
  namespace: string,
  source: T,
): T {
  const existing = proxyCache.get(source)?.get(namespace);
  if (existing) return existing as T;
  const proxy = new Proxy(source, {
    get(target, property, receiver) {
      const value: unknown = Reflect.get(target, property, receiver);
      if (typeof property === 'symbol') return value;
      const path = `${namespace}.${String(property)}`;
      if (typeof value === 'number') return runtimeNumber(path, value);
      if (value && typeof value === 'object') return runtimeConfig(path, value);
      return value;
    },
  });
  const byPath = proxyCache.get(source) ?? new Map<string, object>();
  byPath.set(namespace, proxy);
  proxyCache.set(source, byPath);
  return proxy;
}
