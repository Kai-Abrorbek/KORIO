interface ClosableConnection {
  close(): Promise<void>;
}

/** Own a pending connection as well as an established one until audio is drained. */
export function createPromoConnectionOwner<T extends ClosableConnection>(
  reserveAudioTeardown: (teardown: Promise<void>) => void,
) {
  let generation = 0;
  let attempt: { pending: Promise<T> } | null = null;
  let closing: Promise<void> = Promise.resolve();

  return {
    async connect(open: () => Promise<T>): Promise<T | null> {
      if (attempt) throw new Error("PROMO_CONNECTION_ALREADY_OPEN");
      const run = ++generation;
      await closing;
      if (run !== generation) return null;
      // Invoke before close() can reserve the queue. connectLiveKitTutor takes
      // its audio-session snapshot synchronously, before its first await.
      const current = { pending: open() };
      attempt = current;
      try {
        const connection = await current.pending;
        return attempt === current && run === generation ? connection : null;
      } catch (error) {
        if (attempt === current) attempt = null;
        throw error;
      }
    },
    close(): Promise<void> {
      generation += 1;
      const current = attempt;
      attempt = null;
      if (!current) return closing;
      closing = current.pending.then((connection) => connection.close()).catch(() => undefined);
      // Synchronous registration also protects hardware-back/unmount cleanup,
      // whose React effect cannot itself be awaited by the next screen.
      reserveAudioTeardown(closing);
      return closing;
    },
  };
}
