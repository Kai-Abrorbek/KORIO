import { PlayReportSyncService } from './play-report.sync.service';
import { zipSync, strToU8 } from 'fflate';

describe('PlayReportSyncService', () => {
  const previous = {
    bucket: process.env.GOOGLE_PLAY_REPORT_BUCKET,
    packageName: process.env.GOOGLE_PLAY_PACKAGE_NAME,
    credentials: process.env.GOOGLE_SERVICE_ACCOUNT_JSON,
  };

  afterEach(() => {
    if (previous.bucket === undefined)
      delete process.env.GOOGLE_PLAY_REPORT_BUCKET;
    else process.env.GOOGLE_PLAY_REPORT_BUCKET = previous.bucket;
    if (previous.packageName === undefined)
      delete process.env.GOOGLE_PLAY_PACKAGE_NAME;
    else process.env.GOOGLE_PLAY_PACKAGE_NAME = previous.packageName;
    if (previous.credentials === undefined)
      delete process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    else process.env.GOOGLE_SERVICE_ACCOUNT_JSON = previous.credentials;
    jest.restoreAllMocks();
  });

  it('returns unconfigured without writing or fetching when bucket is absent', async () => {
    delete process.env.GOOGLE_PLAY_REPORT_BUCKET;
    const files = { init: jest.fn(), findOne: jest.fn(), updateOne: jest.fn() };
    const rows = { init: jest.fn(), bulkWrite: jest.fn() };
    const state = { init: jest.fn(), updateOne: jest.fn() };
    const service = new PlayReportSyncService(
      files as never,
      rows as never,
      state as never,
    );
    await expect(service.sync()).resolves.toEqual({
      status: 'unconfigured',
      files: 0,
      changed: 0,
    });
    expect(state.updateOne).not.toHaveBeenCalled();
  });

  it('records a verified empty listing without inventing revenue rows', async () => {
    process.env.GOOGLE_PLAY_REPORT_BUCKET = 'gs://pubsite_prod_rev_test';
    process.env.GOOGLE_PLAY_PACKAGE_NAME = 'com.korio';
    process.env.GOOGLE_SERVICE_ACCOUNT_JSON = '{}';
    const files = { init: jest.fn(), findOne: jest.fn(), updateOne: jest.fn() };
    const rows = { init: jest.fn(), bulkWrite: jest.fn() };
    const state = {
      init: jest.fn(),
      updateOne: jest.fn(),
      findOneAndUpdate: jest.fn().mockResolvedValue({ key: 'google_play' }),
      exists: jest.fn().mockResolvedValue(true),
    };
    const service = new PlayReportSyncService(
      files as never,
      rows as never,
      state as never,
    );
    jest.spyOn(service as never, 'list').mockResolvedValue([] as never);
    await expect(service.sync()).resolves.toEqual({
      status: 'complete',
      files: 0,
      changed: 0,
    });
    expect(rows.bulkWrite).not.toHaveBeenCalled();
    // Initial state creation, successful check, and lease release.
    expect(state.updateOne).toHaveBeenCalledTimes(3);
  });

  it('skips an unchanged generation and replaces a revised monthly snapshot without double counting', async () => {
    process.env.GOOGLE_PLAY_REPORT_BUCKET = 'gs://pubsite_prod_rev_test';
    process.env.GOOGLE_PLAY_PACKAGE_NAME = 'com.korio';
    process.env.GOOGLE_SERVICE_ACCOUNT_JSON = '{}';
    let generation = '1';
    let current: { generation: string; sha256: string } | null = null;
    let amount = '1000';
    const files = {
      init: jest.fn(),
      findOne: jest.fn(() => ({
        lean: jest.fn(() => Promise.resolve(current)),
      })),
      updateOne: jest.fn(
        (
          _filter: unknown,
          update: { $set: { generation: string; sha256: string } },
        ) => {
          current = {
            generation: update.$set.generation,
            sha256: update.$set.sha256,
          };
          return Promise.resolve();
        },
      ),
    };
    const rows = {
      init: jest.fn(),
      bulkWrite: jest.fn(
        (
          operations: Array<{
            updateOne: { filter: { path: string; sha256: string } };
          }>,
        ) => {
          void operations;
          return Promise.resolve();
        },
      ),
    };
    const state = {
      init: jest.fn(),
      updateOne: jest.fn(),
      findOneAndUpdate: jest.fn().mockResolvedValue({ key: 'google_play' }),
      exists: jest.fn().mockResolvedValue(true),
    };
    const service = new PlayReportSyncService(
      files as never,
      rows as never,
      state as never,
    );
    Object.defineProperty(service, 'list', {
      value: jest.fn((prefix: string) =>
        Promise.resolve(
          prefix.startsWith('sales/')
            ? [
                {
                  name: 'sales/salesreport_202610.zip',
                  generation,
                  size: '500',
                },
              ]
            : [],
        ),
      ),
    });
    Object.defineProperty(service, 'download', {
      value: jest.fn(() =>
        Promise.resolve(
          Buffer.from(
            zipSync({
              'report.csv': strToU8(
                [
                  'Order Number,Order Charged Date,Financial Status,Package ID,Currency of Sale,Charged Amount,SKU ID',
                  `GPA.1,2026-10-01,charged,com.korio,KRW,${amount},monthly`,
                ].join('\n'),
              ),
            }),
          ),
        ),
      ),
    });

    await expect(service.sync()).resolves.toEqual({
      status: 'complete',
      files: 1,
      changed: 1,
    });
    await expect(service.sync()).resolves.toEqual({
      status: 'complete',
      files: 1,
      changed: 0,
    });
    expect(rows.bulkWrite).toHaveBeenCalledTimes(1);
    generation = '2';
    amount = '1200';
    await expect(service.sync()).resolves.toEqual({
      status: 'complete',
      files: 1,
      changed: 1,
    });
    expect(rows.bulkWrite).toHaveBeenCalledTimes(2);
    expect(files.updateOne).toHaveBeenCalledTimes(2);
    const firstFilter = rows.bulkWrite.mock.calls[0][0][0].updateOne.filter;
    const revisedFilter = rows.bulkWrite.mock.calls[1][0][0].updateOne.filter;
    expect(firstFilter.path).toBe(revisedFilter.path);
    expect(firstFilter.sha256).not.toBe(revisedFilter.sha256);
  });
});
