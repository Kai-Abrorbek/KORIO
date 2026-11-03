export interface AppDialogRequest {
  id: number;
  kind: "confirm" | "alert";
  message: string;
}

let nextId = 0;
const queue: (AppDialogRequest & { resolve: (confirmed: boolean) => void })[] =
  [];
const listeners = new Set<() => void>();

export function subscribeAppDialogs(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function currentAppDialog(): AppDialogRequest | null {
  return queue[0] ?? null;
}

export function enqueueAppDialog(
  kind: AppDialogRequest["kind"],
  message: string,
): Promise<boolean> {
  return new Promise((resolve) => {
    queue.push({ id: ++nextId, kind, message, resolve });
    listeners.forEach((listener) => listener());
  });
}

/** Consume one request once; a double click cannot answer the next prompt. */
export function finishAppDialog(id: number, confirmed: boolean) {
  if (queue[0]?.id !== id) return;
  const request = queue.shift()!;
  listeners.forEach((listener) => listener());
  request.resolve(confirmed);
}
