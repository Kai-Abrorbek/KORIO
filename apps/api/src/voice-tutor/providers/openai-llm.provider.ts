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

  /**
   * Plain-text streaming for the live lesson turn.
   *
   * The JSON path above waits for the whole reply (emotion, gesture, correction
   * and all) before a single sound can be made. Live turns instead stream text
   * deltas so the worker can hand the first sentence to TTS while the rest is
   * still being written — the reference tutor starts talking ~1.5s after the
   * learner stops, which is impossible without this.
   */
  async *streamText(
    model: string,
    system: string,
    input: string,
    maxTokens: number,
    signal?: AbortSignal,
  ): AsyncGenerator<string> {
    const apiKey = process.env.OPENAI_API_KEY?.trim();
    if (!apiKey) throw new VoiceTutorProviderError('NOT_CONFIGURED', 'LLM');
    const isGpt56 = /^gpt-5\.6(?:-|$)/.test(model);
    const timeouts = [AbortSignal.timeout(45_000)];
    if (signal) timeouts.push(signal);
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
          stream: true,
          max_completion_tokens: maxTokens,
          ...(isGpt56 ? { reasoning_effort: 'none' } : {}),
        }),
        signal: AbortSignal.any(timeouts),
      });
    } catch {
      throw new VoiceTutorProviderError('UNAVAILABLE', 'LLM');
    }
    if (!response.ok || !response.body)
      throw new VoiceTutorProviderError('UNAVAILABLE', 'LLM');

    const decoder = new TextDecoder();
    let buffered = '';
    try {
      for await (const chunk of response.body as AsyncIterable<Uint8Array>) {
        buffered += decoder.decode(chunk, { stream: true });
        let newline: number;
        while ((newline = buffered.indexOf('\n')) >= 0) {
          const line = buffered.slice(0, newline).trim();
          buffered = buffered.slice(newline + 1);
          if (!line.startsWith('data:')) continue;
          const data = line.slice(5).trim();
          if (data === '[DONE]') return;
          let delta: unknown;
          try {
            delta = (
              JSON.parse(data) as {
                choices?: { delta?: { content?: unknown } }[];
              }
            ).choices?.[0]?.delta?.content;
          } catch {
            continue;
          }
          if (typeof delta === 'string' && delta) yield delta;
        }
      }
    } catch (error) {
      if (error instanceof VoiceTutorProviderError) throw error;
      throw new VoiceTutorProviderError('UNAVAILABLE', 'LLM');
    }
  }
}
