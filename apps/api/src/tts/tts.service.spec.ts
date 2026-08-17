import { ConfigService } from '@nestjs/config';
import { TtsService } from './tts.service';

describe('TtsService', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('synthesizes escaped Korean SSML and reuses the cached audio', async () => {
    const values: Record<string, string> = {
      AZURE_SPEECH_KEY: 'test-key',
      AZURE_SPEECH_REGION: 'koreacentral',
      AZURE_SPEECH_ENDPOINT:
        'https://koreacentral.api.cognitive.microsoft.com/',
    };
    const configService = {
      get: jest.fn((key: string) => values[key]),
    } as unknown as ConfigService;
    const fetchMock = jest
      .spyOn(global, 'fetch')
      .mockResolvedValue(new Response(Uint8Array.from([1, 2, 3])));
    const service = new TtsService(configService);
    const request = {
      text: '안녕 <친구> & 반가워',
      language: 'ko-KR' as const,
      rate: 0.9,
      gender: 'male' as const,
    };

    const first = await service.prepare(request);
    const second = await service.prepare(request);

    expect(second.audioId).toBe(first.audioId);
    expect(service.getAudio(first.audioId)).toEqual(Buffer.from([1, 2, 3]));
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(
      'https://koreacentral.tts.speech.microsoft.com/cognitiveservices/v1',
    );
    expect(init?.headers).toMatchObject({
      'Ocp-Apim-Subscription-Key': 'test-key',
      'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3',
    });
    expect(String(init?.body)).toContain('ko-KR-InJoonNeural');
    expect(String(init?.body)).toContain('안녕 &lt;친구&gt; &amp; 반가워');
  });
});
