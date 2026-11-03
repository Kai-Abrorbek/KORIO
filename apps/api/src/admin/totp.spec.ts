import {
  base32Decode,
  base32Encode,
  generateTotpSecret,
  openTotpSecret,
  otpauthUrl,
  sealTotpSecret,
  totpAt,
  totpStep,
  verifyTotp,
} from './totp';

// RFC 6238 Appendix B (SHA-1): secret is ASCII "12345678901234567890".
const RFC_SECRET = base32Encode(Buffer.from('12345678901234567890'));

describe('admin TOTP', () => {
  it('matches the RFC 6238 test vectors', () => {
    for (const [seconds, code] of [
      [59, '94287082'],
      [1111111109, '07081804'],
      [1111111111, '14050471'],
      [1234567890, '89005924'],
      [2000000000, '69279037'],
      [20000000000, '65353130'],
    ] as const) {
      expect(totpAt(RFC_SECRET, totpStep(seconds * 1000), 8)).toBe(code);
    }
  });

  it('round-trips base32 the way authenticator apps read it', () => {
    const secret = generateTotpSecret();
    expect(secret).toMatch(/^[A-Z2-7]{32}$/);
    expect(base32Encode(base32Decode(secret))).toBe(secret);
    // People type keys in lower case, with spaces.
    expect(base32Decode('gezd gnbv')).toEqual(base32Decode('GEZDGNBV'));
  });

  it('accepts the current code and its neighbours, nothing else', () => {
    const secret = generateTotpSecret();
    const now = Date.UTC(2026, 10, 3, 12, 0, 15);
    const step = totpStep(now);
    expect(verifyTotp(secret, totpAt(secret, step), { nowMs: now })).toBe(step);
    expect(verifyTotp(secret, totpAt(secret, step - 1), { nowMs: now })).toBe(
      step - 1,
    );
    expect(
      verifyTotp(secret, totpAt(secret, step + 2), { nowMs: now }),
    ).toBeNull();
    expect(verifyTotp(secret, '12345', { nowMs: now })).toBeNull();
    expect(verifyTotp(secret, 123456, { nowMs: now })).toBeNull();
  });

  it('refuses a code that was already used', () => {
    const secret = generateTotpSecret();
    const now = Date.UTC(2026, 10, 3, 12, 0, 15);
    const code = totpAt(secret, totpStep(now));
    const used = verifyTotp(secret, code, { nowMs: now })!;
    expect(
      verifyTotp(secret, code, { nowMs: now, notAfterStep: used }),
    ).toBeNull();
  });

  it('keeps the stored secret unreadable without the server key', () => {
    const secret = generateTotpSecret();
    const sealed = sealTotpSecret(secret, 'server-key-a'.repeat(4));
    expect(sealed).not.toContain(secret);
    expect(openTotpSecret(sealed, 'server-key-a'.repeat(4))).toBe(secret);
    expect(openTotpSecret(sealed, 'server-key-b'.repeat(4))).toBeNull();
    expect(openTotpSecret(`${sealed}x`, 'server-key-a'.repeat(4))).toBeNull();
  });

  it('builds an otpauth address authenticator apps understand', () => {
    expect(otpauthUrl('ABC', 'kai@korio.app')).toBe(
      'otpauth://totp/KORIO%20Admin%3Akai%40korio.app?secret=ABC&issuer=KORIO%20Admin&algorithm=SHA1&digits=6&period=30',
    );
  });
});
