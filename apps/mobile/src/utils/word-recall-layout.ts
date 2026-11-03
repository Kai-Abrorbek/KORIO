/** Reveal the answer field within the card's measured, keyboard-reduced viewport. */
export function recallInputScrollOffset({
  inputTop,
  inputHeight,
  viewportHeight,
  contentHeight,
  scrollOffset,
  clearance = 12,
}: {
  inputTop: number;
  inputHeight: number;
  viewportHeight: number;
  contentHeight: number;
  scrollOffset: number;
  clearance?: number;
}) {
  const maximum = Math.max(0, contentHeight - viewportHeight);
  const clamp = (value: number) => Math.max(0, Math.min(maximum, value));
  const current = clamp(scrollOffset);
  if (viewportHeight <= 0 || inputHeight <= 0) return current;
  const top = Math.max(0, inputTop - clearance);
  const bottom = inputTop + inputHeight + clearance;
  if (inputHeight + clearance * 2 > viewportHeight || top < current) {
    return clamp(top);
  }
  if (bottom > current + viewportHeight) return clamp(bottom - viewportHeight);
  return current;
}
