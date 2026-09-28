import { OpenAiSttProvider, supportedAudioMime } from './openai-stt.provider';

describe('Voice Tutor STT adapter', () => {
  const originalKey = process.env.OPENAI_API_KEY;
  afterEach(() => {
    process.env.OPENAI_API_KEY = originalKey;
    jest.restoreAllMocks();
  });

  it('accepts a browser WebM MIME with codec parameters', () => {
    expect(supportedAudioMime('audio/webm;codecs=opus')).toBe(true);
    expect(supportedAudioMime('application/octet-stream')).toBe(false);
  });

  it('sends multipart audio and the configured model', async () => {
    process.env.OPENAI_API_KEY = 'test-key';
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ text: '안녕하세요' }),
    } as Response);
    const text = await new OpenAiSttProvider().transcribe(
      Buffer.from([1, 2, 3]),
      'audio/webm;codecs=opus',
    );
    expect(text).toBe('안녕하세요');
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.openai.com/v1/audio/transcriptions');
    expect(options?.method).toBe('POST');
    const form = options?.body as FormData;
    expect(form.get('model')).toBe('gpt-4o-mini-transcribe');
    expect(form.get('file')).toBeInstanceOf(Blob);
    expect(form.has('response_format')).toBe(false);
  });
});
