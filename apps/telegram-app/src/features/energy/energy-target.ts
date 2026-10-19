"use client";

/**
 * 콤보 에너지 연출이 마지막에 빨려 드는 곳 — 레슨 헤더의 에너지 배지 가운데 (화면 px).
 * 배지가 없으면(하트·슈퍼 모드) 앱과 같은 어림: 오른쪽 위 (앱 EnergyBonusPopup targetX·targetY).
 */
export function energyBadgePoint() {
  const badge = document.querySelector<HTMLElement>('[data-cinema-target="energy"]');
  const box = badge?.getBoundingClientRect();
  if (box && box.width > 0) return { x: box.left + box.width / 2, y: box.top + box.height / 2 };
  const top = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--tg-safe-area-inset-top")) || 0;
  return { x: window.innerWidth - 52, y: top + 34 };
}
