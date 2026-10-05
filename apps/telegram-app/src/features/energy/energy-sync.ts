/**
 * 서버 에너지 동기화 (앱 store/energy.store.ts 와 같은 장치).
 *
 * 레슨에서 문제마다 /energy/spend 가 날아간다. 그게 서버에 닿기 **전에** 다른
 * 화면이 에너지를 물어보면 한 칸 덜 깎인 값이 와서 숫자가 되감긴다. 그래서
 * 진행 중인 차감을 여기 모아 두고, 조회·정산은 그게 끝난 뒤에 한다.
 */
const inflight = new Set<Promise<unknown>>();

export function trackEnergySpend<T>(promise: Promise<T>): Promise<T> {
  inflight.add(promise);
  const done = () => {
    inflight.delete(promise);
  };
  promise.then(done, done);
  return promise;
}

/** 진행 중인 차감이 서버에 닿을 때까지 (네트워크가 죽어도 timeoutMs 뒤엔 놓아준다) */
export async function energySpendsSettled(timeoutMs = 3000): Promise<void> {
  if (inflight.size === 0) return;
  await Promise.race([
    Promise.allSettled([...inflight]),
    new Promise((resolve) => window.setTimeout(resolve, timeoutMs)),
  ]);
}
