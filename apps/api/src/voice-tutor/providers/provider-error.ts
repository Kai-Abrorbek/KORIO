export class VoiceTutorProviderError extends Error {
  constructor(
    public readonly code: 'NOT_CONFIGURED' | 'UNAVAILABLE' | 'INVALID_RESPONSE',
    provider: string,
  ) {
    super(`${provider}_${code}`);
  }
}
