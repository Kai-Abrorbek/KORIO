export class VoiceTutorProviderError extends Error {
  constructor(
    /**
     * BLOCKED = the provider account itself refuses us (credits exhausted, key
     * invalid or revoked). Retrying does not help — the live lesson says
     * goodbye and ends instead of saying "connection glitched" every turn.
     */
    public readonly code:
      | 'NOT_CONFIGURED'
      | 'UNAVAILABLE'
      | 'INVALID_RESPONSE'
      | 'BLOCKED',
    provider: string,
  ) {
    super(`${provider}_${code}`);
  }
}

/** OpenAI's account-level refusals (as opposed to a passing rate limit or outage). */
const BLOCKED_BODY =
  /insufficient_quota|credit_balance|billing_hard_limit|exceeded your current quota|no credits remaining|invalid_api_key|incorrect api key|account_deactivated/i;

/**
 * Error for a non-OK OpenAI response: BLOCKED when the account cannot be used
 * at all (401/403, or a 429 that is about quota/credits), otherwise UNAVAILABLE.
 * Reads a little of the body — it carries the error code, never the key.
 */
export async function openAiResponseError(
  response: Response,
  provider: string,
): Promise<VoiceTutorProviderError> {
  if (response.status === 401 || response.status === 403) {
    await response.body?.cancel().catch(() => undefined);
    return new VoiceTutorProviderError('BLOCKED', provider);
  }
  const body = await response.text().catch(() => '');
  return new VoiceTutorProviderError(
    BLOCKED_BODY.test(body.slice(0, 2000)) ? 'BLOCKED' : 'UNAVAILABLE',
    provider,
  );
}
