import { safeRedirect } from './oauth-state';

describe('safeRedirect', () => {
  const previous = process.env.NODE_ENV;
  afterEach(() => {
    process.env.NODE_ENV = previous;
  });

  it('sends tokens only back into the app', () => {
    expect(safeRedirect('mobile://social-auth')).toBe('mobile://social-auth');
    expect(safeRedirect('korio://social-auth')).toBe('korio://social-auth');
    expect(safeRedirect('https://evil.example/steal')).toBe(
      'mobile://social-auth',
    );
    expect(safeRedirect(undefined)).toBe('mobile://social-auth');
  });

  it('refuses Expo Go addresses in production', () => {
    process.env.NODE_ENV = 'production';
    // An attacker's Expo dev server would receive the token in the URL.
    expect(safeRedirect('exp://evil.example:8081/--/social-auth')).toBe(
      'mobile://social-auth',
    );
    process.env.NODE_ENV = 'development';
    expect(safeRedirect('exp://192.168.0.5:8081/--/social-auth')).toBe(
      'exp://192.168.0.5:8081/--/social-auth',
    );
  });
});
