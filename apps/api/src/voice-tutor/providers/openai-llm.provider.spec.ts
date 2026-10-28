import { OpenAiTutorLlmProvider } from './openai-llm.provider';

describe('OpenAiTutorLlmProvider', () => {
  const previousKey = process.env.OPENAI_API_KEY;
  const previousEffort = process.env.VOICE_TUTOR_REASONING_EFFORT;
  const originalFetch = global.fetch;

  beforeEach(() => {
    process.env.OPENAI_API_KEY = 'test-key';
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          choices: [{ message: { content: '{"ok":true}' } }],
        }),
    });
  });

  afterEach(() => {
    if (previousKey === undefined) delete process.env.OPENAI_API_KEY;
    else process.env.OPENAI_API_KEY = previousKey;
    if (previousEffort === undefined)
      delete process.env.VOICE_TUTOR_REASONING_EFFORT;
    else process.env.VOICE_TUTOR_REASONING_EFFORT = previousEffort;
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it('bounds opening latency without changing the ordinary turn deadline', async () => {
    const timeout = jest.spyOn(AbortSignal, 'timeout');
    const provider = new OpenAiTutorLlmProvider();
    await provider.completeJson('test', 'instructions', '{}', 450, 8_000);
    expect(timeout).toHaveBeenLastCalledWith(8_000);
    await provider.completeJson('test', 'instructions', '{}', 450);
    expect(timeout).toHaveBeenLastCalledWith(30_000);
  });

  it('uses non-reasoning JSON mode for the configured GPT-5.6 tutor models', async () => {
    const provider = new OpenAiTutorLlmProvider();
    await expect(
      provider.completeJson('gpt-5.6-terra', 'Tutor instructions', '{}', 450),
    ).resolves.toEqual({ ok: true });
    const request = (global.fetch as jest.MockedFunction<typeof fetch>).mock
      .calls[0][1];
    const body = JSON.parse(request?.body as string) as {
      reasoning_effort: string;
      response_format: { type: string };
      max_completion_tokens: number;
      messages: { role: string }[];
    };
    expect(body).toMatchObject({
      model: 'gpt-5.6-terra',
      reasoning_effort: 'none',
      response_format: { type: 'json_object' },
      max_completion_tokens: 450,
    });
    expect(body.messages[0].role).toBe('developer');
  });

  it('does not send unsupported reasoning settings to the older fallback', async () => {
    await new OpenAiTutorLlmProvider().completeJson(
      'gpt-4o-mini',
      'Tutor instructions',
      '{}',
      450,
    );
    const request = (global.fetch as jest.MockedFunction<typeof fetch>).mock
      .calls[0][1];
    const body = JSON.parse(request?.body as string) as Record<string, unknown>;
    expect(body).not.toHaveProperty('reasoning_effort');
    expect(body.messages).toEqual(
      expect.arrayContaining([expect.objectContaining({ role: 'system' })]),
    );
  });
  // 2026-10-28: 크레딧이 떨어지자 튜터가 인사만 하고 멈췄다. 막힘은 따로 가려서
  // 라이브 수업이 "연결이 불안정해요" 를 되풀이하지 않고 안내 후 끝나게 한다
  it('reports an exhausted or revoked OpenAI account as BLOCKED', async () => {
    const provider = new OpenAiTutorLlmProvider();
    const refuse = (status: number, body: string) =>
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status,
        body: { cancel: () => Promise.resolve() },
        text: () => Promise.resolve(body),
      });
    refuse(
      429,
      '{"error":{"message":"You have no credits remaining.","type":"insufficient_quota","code":"credit_balance_exhausted"}}',
    );
    await expect(
      provider.completeJson('gpt-4o-mini', 'x', '{}', 10),
    ).rejects.toMatchObject({ code: 'BLOCKED' });
    refuse(401, '{"error":{"code":"invalid_api_key"}}');
    await expect(
      provider.completeJson('gpt-4o-mini', 'x', '{}', 10),
    ).rejects.toMatchObject({ code: 'BLOCKED' });
  });

  it('keeps a passing rate limit as UNAVAILABLE', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 429,
      text: () =>
        Promise.resolve(
          '{"error":{"type":"requests","code":"rate_limit_exceeded"}}',
        ),
    });
    await expect(
      new OpenAiTutorLlmProvider().completeJson('gpt-4o-mini', 'x', '{}', 10),
    ).rejects.toMatchObject({ code: 'UNAVAILABLE' });
  });

  const sentBody = () =>
    JSON.parse(
      (global.fetch as jest.MockedFunction<typeof fetch>).mock.calls[0][1]
        ?.body as string,
    ) as Record<string, unknown>;

  it('treats the GPT-6 family as a reasoning model, so an upgrade keeps reasoning off', async () => {
    delete process.env.VOICE_TUTOR_REASONING_EFFORT;
    await new OpenAiTutorLlmProvider().completeJson(
      'gpt-6.1-terra',
      'Tutor instructions',
      '{}',
      450,
    );
    expect(sentBody()).toMatchObject({
      reasoning_effort: 'none',
      max_completion_tokens: 450,
      messages: [
        expect.objectContaining({ role: 'developer' }),
        expect.objectContaining({ role: 'user' }),
      ],
    });
  });

  it('gives a reasoning turn token headroom instead of an empty reply', async () => {
    process.env.VOICE_TUTOR_REASONING_EFFORT = 'low';
    await new OpenAiTutorLlmProvider().completeJson(
      'gpt-5.6-terra',
      'Tutor instructions',
      '{}',
      450,
    );
    expect(sentBody()).toMatchObject({
      reasoning_effort: 'low',
      max_completion_tokens: 1950,
    });
  });

  it('ignores an unknown reasoning effort', async () => {
    process.env.VOICE_TUTOR_REASONING_EFFORT = 'extreme';
    await new OpenAiTutorLlmProvider().completeJson(
      'gpt-6-luna',
      'Tutor instructions',
      '{}',
      450,
    );
    expect(sentBody()).toMatchObject({ reasoning_effort: 'none' });
  });
});
