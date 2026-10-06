import { zipSync, strToU8 } from 'fflate';
import { parsePlayZip, toMinor } from './play-report.parser';

function archive(csv: string): Buffer {
  return Buffer.from(zipSync({ 'report.csv': strToU8(csv) }));
}

describe('Google Play report parser', () => {
  it('uses ISO minor units without floating point rounding', () => {
    expect(toMinor('12,345.67', 'USD')).toBe(1234567);
    expect(toMinor('12,345', 'KRW')).toBe(12345);
    expect(() => toMinor('1.01', 'KRW')).toThrow();
  });

  it('filters account-wide sales by package and keeps partial refunds separate', () => {
    const csv = [
      'Order Number,Order Charged Date,Financial Status,Package ID,Currency of Sale,Charged Amount,SKU ID',
      'GPA.1,2026-10-01,charged,com.korio,KRW,"1,000",monthly',
      'GPA.1,2026-10-02,partial refund,com.korio,KRW,200,monthly',
      'GPA.2,2026-10-01,charged,other.app,USD,999,monthly',
    ].join('\n');
    expect(parsePlayZip(archive(csv), 'estimated_sales', 'com.korio')).toEqual([
      expect.objectContaining({
        rowIndex: 0,
        category: 'charge',
        amountMinor: 1000,
        currency: 'KRW',
      }),
      expect.objectContaining({
        rowIndex: 1,
        category: 'refund',
        amountMinor: 200,
        currency: 'KRW',
      }),
    ]);
  });

  it('keeps earnings merchant currency and handles fee refunds and adjustments', () => {
    const csv = [
      'Description,Transaction Date,Transaction Type,Package ID,Merchant Currency,Amount (Merchant Currency),SKU ID',
      'GPA.1,"Oct 1, 2026",Charge,com.korio,USD,10.00,monthly',
      'GPA.1,"Oct 1, 2026",Google fee,com.korio,USD,-1.50,monthly',
      'GPA.1,"Oct 2, 2026",Google fee refund,com.korio,USD,0.25,monthly',
      'GPA.1,"Oct 2, 2026",Adjustment,com.korio,USD,0.10,monthly',
    ].join('\n');
    expect(
      parsePlayZip(archive(csv), 'earnings', 'com.korio').map(
        ({ category, amountMinor }) => ({ category, amountMinor }),
      ),
    ).toEqual([
      { category: 'charge', amountMinor: 1000 },
      { category: 'fee', amountMinor: -150 },
      { category: 'fee', amountMinor: 25 },
      { category: 'other', amountMinor: 10 },
    ]);
  });

  it('rejects unknown transaction types instead of silently dropping money', () => {
    const csv = [
      'Order Number,Order Charged Date,Financial Status,Package ID,Currency of Sale,Charged Amount,SKU ID',
      'GPA.1,2026-10-01,mystery,com.korio,KRW,100,monthly',
    ].join('\n');
    expect(() =>
      parsePlayZip(archive(csv), 'estimated_sales', 'com.korio'),
    ).toThrow('PLAY_REPORT_UNKNOWN_TRANSACTION_TYPE');
  });
});
