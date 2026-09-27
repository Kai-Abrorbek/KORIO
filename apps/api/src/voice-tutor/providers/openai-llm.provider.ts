import { Injectable } from '@nestjs/common';
import { VoiceTutorProviderError } from './provider-error';

@Injectable()
export class OpenAiTutorLlmProvider {
  async completeJson(
    model: string,
    system: string,
    input: string,
    maxTokens: number,
  ): Promise<Record<string, unknown>> {
    const apiKey = process.env.OPENAI_API_KEY?.trim();
    if (!apiKey) throw new VoiceTutorProviderError('NOT_CONFIGURED', 'LLM');
    // GPT-5.6 defaults to medium reasoning. For short live JSON turns this can
    // exhaust the small output budget before producing any visible response.
    // Its non-reasoning mode is also the latency baseline recommended for
    // simple, time-sensitive tasks; retain older-model request behavior.
    const isGpt56 = /^gpt-5\.6(?:-|$)/.test(model);
    let response: Response;
    try {
      response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: isGpt56 ? 'developer' : 'system', content: system },
            { role: 'user', content: input },
          ],
          response_format: { type: 'json_object' },
          max_completion_tokens: maxTokens,
          ...(isGpt56 ? { reasoning_effort: 'none' } : {}),
        }),
        signal: AbortSignal.timeout(30_000),
      });
    } catch {
      throw new VoiceTutorProviderError('UNAVAILABLE', 'LLM');
    }
    if (!response.ok) throw new VoiceTutorProviderError('UNAVAILABLE', 'LLM');
    const payload = (await response.json()) as {
      choices?: { message?: { content?: string | null } }[];
    };
    const content = payload.choices?.[0]?.message?.content;
    if (!content) throw new VoiceTutorProviderError('INVALID_RESPONSE', 'LLM');
    try {
      const parsed: unknown = JSON.parse(content);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        return parsed as Record<string, unknown>;
      }
    } catch {
      /* malformed model output */
    }
    throw new VoiceTutorProviderError('INVALID_RESPONSE', 'LLM');
  }
}
