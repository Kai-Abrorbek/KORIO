import { Types } from 'mongoose';
jest.mock('../users/schemas/user.schema', () => ({ User: class User {} }));

import { BadRequestException } from '@nestjs/common';
import type { GemLedgerService } from '../gem-ledger/gem-ledger.service';
import { APP_REVIEW } from './app-review.const';
import { AppReviewService, promptSkipReason } from './app-review.service';

const DAY = 24 * 60 * 60 * 1000;
const now = new Date('2026-10-26T10:00:00Z');
const today = '2026-10-26';
const oldUser = { createdAt: new Date(now.getTime() - 30 * DAY) };

describe('promptSkipReason', () => {
  it('shows to an established user with no state', () => {
    expect(promptSkipReason(now, today, oldUser, null)).toBeNull();
  });

  it('waits until the account is two days old', () => {
    const fresh = { createdAt: new Date(now.getTime() - DAY) };
    expect(promptSkipReason(now, today, fresh, null)).toBe('too_new');
  });

  it('hides for seven days after a review, then shows again', () => {
    const sixDays = { lastReviewAt: new Date(now.getTime() - 6 * DAY) };
    const eightDays = { lastReviewAt: new Date(now.getTime() - 8 * DAY) };
    expect(promptSkipReason(now, today, oldUser, sixDays)).toBe('reviewed');
    expect(promptSkipReason(now, today, oldUser, eightDays)).toBeNull();
  });

  it('respects "hide for a day" until the snooze ends', () => {
    const snoozed = { snoozeUntil: new Date(now.getTime() + 60_000) };
    const ended = { snoozeUntil: new Date(now.getTime() - 60_000) };
    expect(promptSkipReason(now, today, oldUser, snoozed)).toBe('snoozed');
    expect(promptSkipReason(now, today, oldUser, ended)).toBeNull();
  });

  it('stops for the day after too many closes, and resets the next day', () => {
    const max = APP_REVIEW.MAX_CLOSES_PER_DAY;
    expect(
      promptSkipReason(now, today, oldUser, {
        closeDay: today,
        closeCount: max - 1,
      }),
    ).toBeNull();
    expect(
      promptSkipReason(now, today, oldUser, {
        closeDay: today,
        closeCount: max,
      }),
    ).toBe('closed_today');
    expect(
      promptSkipReason(now, today, oldUser, {
        closeDay: '2026-10-25',
        closeCount: max,
      }),
    ).toBeNull();
  });
});

describe('AppReviewService.submit', () => {
  const userId = new Types.ObjectId().toString();
  const lean = (value: unknown) => {
    const node = { select: () => node, lean: () => Promise.resolve(value) };
    return node;
  };

  function build(stateUpdate: jest.Mock) {
    const reviews = { create: jest.fn().mockResolvedValue({}) };
    const states = {
      findOne: jest.fn(() => lean(null)),
      updateOne: stateUpdate,
    };
    const users = {
      updateOne: jest.fn().mockResolvedValue({}),
      findById: jest.fn(() => lean({ gems: 1500 })),
    };
    const ledger = { record: jest.fn().mockResolvedValue(undefined) };
    const service = new AppReviewService(
      reviews as never,
      states as never,
      users as never,
      ledger as unknown as GemLedgerService,
    );
    return { service, reviews, users, ledger };
  }

  it('saves the review and pays 500 gems once', async () => {
    const { service, reviews, users, ledger } = build(
      jest.fn().mockResolvedValue({ matchedCount: 0, upsertedCount: 1 }),
    );
    const res = await service.submit(userId, {
      rating: 5,
      comment: '  좋아요 ',
    });

    expect(res).toEqual({ reward: 500, gems: 1500 });
    expect(reviews.create).toHaveBeenCalledWith(
      expect.objectContaining({
        rating: 5,
        comment: '좋아요',
        rewardGems: 500,
      }),
    );
    expect(users.updateOne).toHaveBeenCalledWith(
      expect.objectContaining({ _id: expect.any(Types.ObjectId) as unknown }),
      { $inc: { gems: 500 } },
    );
    expect(ledger.record).toHaveBeenCalledWith(
      expect.any(Types.ObjectId),
      500,
      'app_review',
      { rating: 5 },
    );
  });

  it('refuses a second review inside the week without paying', async () => {
    const { service, reviews, users } = build(
      jest
        .fn()
        .mockRejectedValue(Object.assign(new Error('dup'), { code: 11000 })),
    );
    await expect(service.submit(userId, { rating: 4 })).rejects.toBeInstanceOf(
      BadRequestException,
    );
    expect(reviews.create).not.toHaveBeenCalled();
    expect(users.updateOne).not.toHaveBeenCalled();
  });
});
