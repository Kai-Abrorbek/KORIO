interface PressSoundOptions {
  event?: object;
  disabled?: boolean;
  silent?: boolean;
  preferDefault?: boolean;
}

interface PressTransaction {
  claimed: boolean;
  fallback: () => void;
}

let currentPress: PressTransaction | undefined;
const handledEvents = new WeakSet<object>();

/** An explicit selection, answer, or reward sound owns the current press. */
export function claimPressSound(): void {
  if (currentPress) currentPress.claimed = true;
}

/** Run the real action first, then supply one default sound if it had none. */
export function runWithDefaultPressSound<T>(
  action: () => T,
  playDefault: () => void,
  options: PressSoundOptions = {},
): T | undefined {
  if (options.disabled) return;

  const previousPress = currentPress;
  const transaction = previousPress ?? {
    claimed: false,
    fallback: playDefault,
  };
  if (options.preferDefault) transaction.fallback = playDefault;
  // React Native pools synthetic event objects. Their native payload belongs to
  // one interaction; the synthetic object itself may represent a later press.
  const nativeEvent = (options.event as { nativeEvent?: unknown } | undefined)
    ?.nativeEvent;
  const event =
    nativeEvent !== null && typeof nativeEvent === "object"
      ? nativeEvent
      : options.event;
  if (options.silent || (event && handledEvents.has(event))) {
    transaction.claimed = true;
  }
  currentPress = transaction;

  try {
    const result = action();
    if (!previousPress && !transaction.claimed) {
      transaction.claimed = true;
      transaction.fallback();
    }
    return result;
  } finally {
    if (event) handledEvents.add(event);
    currentPress = previousPress;
  }
}
