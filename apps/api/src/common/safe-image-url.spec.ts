import { isSafeImageUrl, safeImageUrl } from './safe-image-url';

describe('safeImageUrl', () => {
  it('accepts HTTPS images from social login providers', () => {
    for (const url of [
      'https://lh3.googleusercontent.com/a/abc=s96-c',
      'https://k.kakaocdn.net/dn/abc/img_640x640.jpg',
      'https://phinf.pstatic.net/contact/profile.png',
      'https://t.me/i/userpic/320/abc.jpg',
    ])
      expect(safeImageUrl(url)).toBe(url);
  });

  it('refuses addresses that would let someone watch who views a profile', () => {
    for (const url of [
      'https://tracker.example/pixel.png',
      'http://lh3.googleusercontent.com/a/abc',
      'https://googleusercontent.com.evil.example/a.png',
      'https://evil.example/?googleusercontent.com',
      'https://user:pass@lh3.googleusercontent.com/a',
      'javascript:alert(1)',
      'not a url',
      `https://lh3.googleusercontent.com/${'a'.repeat(500)}`,
    ])
      expect(isSafeImageUrl(url)).toBe(false);
    expect(safeImageUrl(42)).toBeUndefined();
    expect(safeImageUrl(undefined)).toBeUndefined();
  });
});
