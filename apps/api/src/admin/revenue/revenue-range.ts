import { BadRequestException } from '@nestjs/common';

const DAY_MS = 86_400_000;

export function validRevenueDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const timestamp = Date.parse(`${value}T00:00:00Z`);
  return (
    Number.isFinite(timestamp) &&
    new Date(timestamp).toISOString().slice(0, 10) === value
  );
}

export function revenueRange(from?: string, to?: string) {
  const end = to ?? new Date().toISOString().slice(0, 10);
  if (!validRevenueDate(end))
    throw new BadRequestException('INVALID_DATE_RANGE');
  const start =
    from ??
    new Date(Date.parse(`${end}T00:00:00Z`) - 29 * DAY_MS)
      .toISOString()
      .slice(0, 10);
  if (!validRevenueDate(start))
    throw new BadRequestException('INVALID_DATE_RANGE');
  const days =
    Math.round(
      (Date.parse(`${end}T00:00:00Z`) - Date.parse(`${start}T00:00:00Z`)) /
        DAY_MS,
    ) + 1;
  if (days < 1 || days > 366)
    throw new BadRequestException('INVALID_DATE_RANGE');
  return { start, end };
}
