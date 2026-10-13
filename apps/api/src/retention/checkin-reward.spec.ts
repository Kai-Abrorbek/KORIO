import { checkinRewardFor } from './checkin-reward';

describe('checkinRewardFor', () => {
  const inDays = (n: number) => new Date(Date.now() + n * 86_400_000);

  it('gives the SUPER day to people without premium', () => {
    expect(
      checkinRewardFor({ isSuper: false }, { gems: 0, superDays: 1 }, 1667),
    ).toEqual({
      gems: 0,
      superDays: 1,
      swapped: false,
    });
  });

  it('swaps the SUPER day for gems during the 30-day trial', () => {
    expect(
      checkinRewardFor(
        { isSuper: true, superExpiresAt: inDays(20) },
        { gems: 0, superDays: 1 },
        1667,
      ),
    ).toEqual({ gems: 1667, superDays: 0, swapped: true });
  });

  it('pays every SUPER day and keeps the base gems', () => {
    expect(
      checkinRewardFor(
        { isSuper: true, superExpiresAt: null },
        { gems: 50, superDays: 2 },
        1000,
      ),
    ).toEqual({ gems: 2050, superDays: 0, swapped: true });
  });

  it('treats an expired SUPER as no premium', () => {
    expect(
      checkinRewardFor(
        { isSuper: true, superExpiresAt: inDays(-1) },
        { gems: 0, superDays: 1 },
        1667,
      ),
    ).toEqual({ gems: 0, superDays: 1, swapped: false });
  });

  it('leaves plain gem days alone', () => {
    expect(
      checkinRewardFor(
        { isSuper: true, superExpiresAt: inDays(5) },
        { gems: 70 },
        1667,
      ),
    ).toEqual({ gems: 70, superDays: 0, swapped: false });
  });
});
