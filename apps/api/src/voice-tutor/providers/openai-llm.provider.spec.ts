import { OpenAiTutorLlmProvider } from './openai-llm.provider';

describe('OpenAiTutorLlmProvider', () => {
  const previousKey = process.env.OPENAI_API_KEY;
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
    global.fetch = originalFetch;
  });

  it('uses non-reasoning JSON mode for the configured GPT-5.6 tutor models', async () => {
    const provider = new OpenAiTutorLlmProvider();
    await expect(
      provider.completeJson('gpt-5.6-terra', 'Tutor instructions', '{}', 450),
    ).resolves.toEqual({ ok: true });
    const request = (global.fetch as jest.MockedFunction<typeof fetch>).mock
      .calls[0][1];
    const body = JSON.parse(request.body as string) as {
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
    const body = JSON.parse(request.body as string) as Record<string, unknown>;
    expect(body).not.toHaveProperty('reasoning_effort');
    expect(body.messages).toEqual(
      expect.arrayContaining([expect.objectContaining({ role: 'system' })]),
    );
  });
});
