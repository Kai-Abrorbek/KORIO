import { BadRequestException } from '@nestjs/common';
import { unzipSync } from 'fflate';
import { parse } from 'csv-parse/sync';
import type { PlayReportKind } from './play-report.schema';

export interface ParsedPlayRow {
  rowIndex: number;
  kind: PlayReportKind;
  date: string;
  currency: string;
  amountMinor: number;
  category: 'charge' | 'refund' | 'fee' | 'tax' | 'other';
  orderNumber: string;
  skuId: string;
}

const MAX_ARCHIVE_BYTES = 32 * 1024 * 1024;
const MAX_CSV_BYTES = 128 * 1024 * 1024;
const MAX_ROWS = 500_000;

function decodeCsv(bytes: Uint8Array): string {
  if (bytes.length > MAX_CSV_BYTES)
    throw new BadRequestException('PLAY_REPORT_TOO_LARGE');
  const data = Buffer.from(bytes);
  if (data[0] === 0xff && data[1] === 0xfe)
    return data.subarray(2).toString('utf16le');
  if (data[0] === 0xfe && data[1] === 0xff) {
    const swapped = Buffer.from(data.subarray(2));
    for (let i = 0; i + 1 < swapped.length; i += 2) {
      const a = swapped[i];
      swapped[i] = swapped[i + 1];
      swapped[i + 1] = a;
    }
    return swapped.toString('utf16le');
  }
  return data.toString('utf8').replace(/^\uFEFF/, '');
}

function exponent(currency: string): number {
  try {
    return (
      new Intl.NumberFormat('en', {
        style: 'currency',
        currency,
      }).resolvedOptions().maximumFractionDigits ?? 2
    );
  } catch {
    throw new BadRequestException('PLAY_REPORT_UNSUPPORTED_CURRENCY');
  }
}

/** Exact decimal conversion; never aggregate floating point money. */
export function toMinor(value: string, currency: string): number {
  const normalized = value.trim().replace(/,/g, '');
  if (!/^-?\d+(?:\.\d+)?$/.test(normalized))
    throw new BadRequestException('PLAY_REPORT_INVALID_AMOUNT');
  const negative = normalized.startsWith('-');
  const [whole, fraction = ''] = (
    negative ? normalized.slice(1) : normalized
  ).split('.');
  const scale = exponent(currency);
  if (fraction.length > scale && /[1-9]/.test(fraction.slice(scale))) {
    throw new BadRequestException('PLAY_REPORT_INVALID_PRECISION');
  }
  const amount =
    Number(whole) * 10 ** scale +
    Number(fraction.slice(0, scale).padEnd(scale, '0') || 0);
  if (!Number.isSafeInteger(amount))
    throw new BadRequestException('PLAY_REPORT_AMOUNT_OVERFLOW');
  return negative ? -amount : amount;
}

function dateFromPlay(value: string, kind: PlayReportKind): string {
  if (kind === 'estimated_sales') {
    const timestamp = Date.parse(`${value}T00:00:00Z`);
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(value) ||
      !Number.isFinite(timestamp) ||
      new Date(timestamp).toISOString().slice(0, 10) !== value
    ) {
      throw new BadRequestException('PLAY_REPORT_INVALID_DATE');
    }
    return value;
  }
  const date = new Date(`${value.trim()} 12:00:00 GMT-0800`);
  if (Number.isNaN(date.getTime()))
    throw new BadRequestException('PLAY_REPORT_INVALID_DATE');
  return date.toISOString().slice(0, 10);
}

function required(row: Record<string, string>, header: string): string {
  if (!(header in row))
    throw new BadRequestException(`PLAY_REPORT_MISSING_COLUMN:${header}`);
  return String(row[header] ?? '').trim();
}

export function parsePlayZip(
  archive: Buffer,
  kind: PlayReportKind,
  packageName: string,
): ParsedPlayRow[] {
  if (archive.length > MAX_ARCHIVE_BYTES)
    throw new BadRequestException('PLAY_REPORT_TOO_LARGE');
  let files: Record<string, Uint8Array>;
  try {
    files = unzipSync(new Uint8Array(archive), {
      filter: (file) =>
        file.name.toLowerCase().endsWith('.csv') &&
        file.originalSize <= MAX_CSV_BYTES,
    });
  } catch {
    throw new BadRequestException('PLAY_REPORT_INVALID_ZIP');
  }
  const entries = Object.entries(files).filter(([name]) =>
    name.toLowerCase().endsWith('.csv'),
  );
  if (entries.length !== 1)
    throw new BadRequestException('PLAY_REPORT_INVALID_ZIP_CONTENTS');
  let records: Record<string, string>[];
  try {
    records = parse(decodeCsv(entries[0][1]), {
      columns: true,
      bom: true,
      skip_empty_lines: true,
      relax_quotes: false,
    });
  } catch {
    throw new BadRequestException('PLAY_REPORT_INVALID_CSV');
  }
  if (records.length > MAX_ROWS)
    throw new BadRequestException('PLAY_REPORT_TOO_MANY_ROWS');
  const result: ParsedPlayRow[] = [];
  for (const [index, row] of records.entries()) {
    if (required(row, 'Package ID') !== packageName) continue;
    const currency = required(
      row,
      kind === 'estimated_sales' ? 'Currency of Sale' : 'Merchant Currency',
    ).toUpperCase();
    if (!/^[A-Z]{3}$/.test(currency))
      throw new BadRequestException('PLAY_REPORT_INVALID_CURRENCY');
    const date = dateFromPlay(
      required(
        row,
        kind === 'estimated_sales' ? 'Order Charged Date' : 'Transaction Date',
      ),
      kind,
    );
    const rawType = required(
      row,
      kind === 'estimated_sales' ? 'Financial Status' : 'Transaction Type',
    ).toLowerCase();
    const category =
      kind === 'estimated_sales'
        ? rawType === 'charged'
          ? 'charge'
          : rawType === 'refund' || rawType === 'partial refund'
            ? 'refund'
            : 'other'
        : rawType === 'charge' || rawType === 'charge rebill'
          ? 'charge'
          : rawType === 'charge refund'
            ? 'refund'
            : rawType === 'google fee' ||
                rawType === 'google fee refund' ||
                rawType === 'google fee rebill'
              ? 'fee'
              : rawType === 'tax' || rawType === 'tax rebill'
                ? 'tax'
                : rawType === 'adjustment'
                  ? 'other'
                  : 'unknown';
    if (
      (category === 'other' && kind === 'estimated_sales') ||
      category === 'unknown'
    ) {
      throw new BadRequestException('PLAY_REPORT_UNKNOWN_TRANSACTION_TYPE');
    }
    const rawAmount = required(
      row,
      kind === 'estimated_sales'
        ? 'Charged Amount'
        : 'Amount (Merchant Currency)',
    );
    const amountMinor = toMinor(rawAmount, currency);
    result.push({
      rowIndex: index,
      kind,
      date,
      currency,
      amountMinor:
        kind === 'estimated_sales' ? Math.abs(amountMinor) : amountMinor,
      category,
      orderNumber: required(
        row,
        kind === 'estimated_sales' ? 'Order Number' : 'Description',
      ).slice(0, 128),
      skuId: required(row, 'SKU ID').slice(0, 128),
    });
  }
  return result;
}
