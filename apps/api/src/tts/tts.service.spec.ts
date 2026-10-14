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
      voice: 'ko-KR-JiMinNeural',
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
      'X-Microsoft-OutputFormat': 'riff-24khz-16bit-mono-pcm',
    });
    expect(typeof init?.body).toBe('string');
    const body = init?.body as string;
    expect(body).toContain('ko-KR-JiMinNeural');
    expect(body).toContain('안녕 &lt;친구&gt; &amp; 반가워');
  });

  it('returns every Korean voice exposed by the configured Azure region', async () => {
    const configService = {
      get: jest.fn((key: string) => {
        if (key === 'AZURE_SPEECH_KEY') return 'test-key';
        if (key === 'AZURE_SPEECH_REGION') return 'koreacentral';
        return undefined;
      }),
    } as unknown as ConfigService;
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify([
          {
            ShortName: 'en-US-JennyNeural',
            DisplayName: 'Jenny',
            LocalName: 'Jenny',
            Gender: 'Female',
            Locale: 'en-US',
          },
          {
            ShortName: 'ko-KR-InJoonNeural',
            DisplayName: 'InJoon',
            LocalName: '인준',
            Gender: 'Male',
            Locale: 'ko-KR',
            VoiceType: 'Neural',
            Status: 'GA',
            StyleList: ['sad'],
          },
          {
            ShortName: 'ko-KR-SunHiNeural',
            DisplayName: 'SunHi',
            LocalName: '선히',
            Gender: 'Female',
            Locale: 'ko-KR',
          },
        ]),
        { headers: { 'Content-Type': 'application/json' } },
      ),
    );
    const service = new TtsService(configService);

    const first = await service.listKoreanVoices();
    const second = await service.listKoreanVoices();

    expect(first.map((voice) => voice.shortName)).toEqual([
      'ko-KR-SunHiNeural',
      'ko-KR-InJoonNeural',
    ]);
    expect(first[1]).toMatchObject({
      gender: 'male',
      localName: '인준',
      styles: ['sad'],
    });
    expect(second).toBe(first);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toBe(
      'https://koreacentral.tts.speech.microsoft.com/cognitiveservices/voices/list',
    );
  });

  it('lists English voices without mixing Korean cache entries or mismatched locales', async () => {
    const configService = {
      get: jest.fn((key: string) => {
        if (key === 'AZURE_SPEECH_KEY') return 'test-key';
        if (key === 'AZURE_SPEECH_REGION') return 'koreacentral';
        return undefined;
      }),
    } as unknown as ConfigService;
    const payload = [
      {
        ShortName: 'ko-KR-SunHiNeural',
        Gender: 'Female',
        Locale: 'ko-KR',
      },
      {
        ShortName: 'en-US-GuyNeural',
        DisplayName: 'Guy',
        Gender: 'Male',
        Locale: 'en-US',
      },
      {
        ShortName: 'en-US-JennyNeural',
        DisplayName: 'Jenny',
        Gender: 'Female',
        Locale: 'en-US',
      },
      {
        ShortName: 'ko-KR-InJoonNeural',
        Gender: 'Male',
        Locale: 'en-US',
      },
      {
        ShortName: 'en-GB-SoniaNeural',
        Gender: 'Female',
        Locale: 'en-GB',
      },
    ];
    const fetchMock = jest
      .spyOn(global, 'fetch')
      .mockImplementation(() =>
        Promise.resolve(new Response(JSON.stringify(payload))),
      );
    const service = new TtsService(configService);

    const korean = await service.listVoices();
    const english = await service.listVoices('en-US');

    expect(korean.map((voice) => voice.shortName)).toEqual([
      'ko-KR-SunHiNeural',
    ]);
    expect(english.map((voice) => voice.shortName)).toEqual([
      'en-US-JennyNeural',
      'en-US-GuyNeural',
    ]);
    expect(english[0]).toMatchObject({
      gender: 'female',
      displayName: 'Jenny',
      localName: 'Jenny',
    });
    expect(await service.listVoices('en-US')).toBe(english);
    expect(await service.listKoreanVoices()).toBe(korean);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('does not substitute another language when Azure has no matching English voices', async () => {
    const configService = {
      get: jest.fn((key: string) => {
        if (key === 'AZURE_SPEECH_KEY') return 'test-key';
        if (key === 'AZURE_SPEECH_REGION') return 'koreacentral';
        return undefined;
      }),
    } as unknown as ConfigService;
    jest.spyOn(global, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify([
          {
            ShortName: 'ko-KR-SunHiNeural',
            Gender: 'Female',
            Locale: 'ko-KR',
          },
        ]),
      ),
    );
    const service = new TtsService(configService);

    await expect(service.listVoices('en-US')).rejects.toThrow(
      'AZURE_SPEECH_VOICES_EMPTY',
    );
  });

  it.each(['A', 'z'])(
    'speaks the English letter %s as a letter name',
    async (letter) => {
      const configService = {
        get: jest.fn((key: string) => {
          if (key === 'AZURE_SPEECH_KEY') return 'test-key';
          if (key === 'AZURE_SPEECH_REGION') return 'koreacentral';
          return undefined;
        }),
      } as unknown as ConfigService;
      const fetchMock = jest
        .spyOn(global, 'fetch')
        .mockResolvedValue(new Response(Uint8Array.from([1, 2, 3])));
      const service = new TtsService(configService);

      await service.prepare({ text: ` ${letter} `, language: 'en-US' });

      const body = fetchMock.mock.calls[0][1]?.body as string;
      expect(body).toContain('xml:lang="en-US"');
      expect(body).toContain('name="en-US-JennyNeural"');
      expect(body).toContain(
        `<say-as interpret-as="characters">${letter}</say-as>`,
      );
    },
  );

  it.each([
    {
      text: 'apple & ant',
      language: 'en-US' as const,
      spoken: 'apple &amp; ant',
    },
    { text: 'ABC', language: 'en-US' as const, spoken: 'ABC' },
    { text: 'A', language: 'ko-KR' as const, spoken: 'A' },
  ])('preserves normal synthesis for $language text $text', async (request) => {
    const configService = {
      get: jest.fn((key: string) => {
        if (key === 'AZURE_SPEECH_KEY') return 'test-key';
        if (key === 'AZURE_SPEECH_REGION') return 'koreacentral';
        return undefined;
      }),
    } as unknown as ConfigService;
    const fetchMock = jest
      .spyOn(global, 'fetch')
      .mockResolvedValue(new Response(Uint8Array.from([1, 2, 3])));
    const service = new TtsService(configService);

    await service.prepare({ text: request.text, language: request.language });

    const body = fetchMock.mock.calls[0][1]?.body as string;
    expect(body).not.toContain('<say-as');
    expect(body).toContain(`>${request.spoken}</prosody>`);
  });

  it('rejects a Korean voice for English speech before calling Azure', async () => {
    const configService = { get: jest.fn() } as unknown as ConfigService;
    const fetchMock = jest.spyOn(global, 'fetch');
    const service = new TtsService(configService);

    await expect(
      service.prepare({
        text: 'A',
        language: 'en-US',
        voice: 'ko-KR-SunHiNeural',
      }),
    ).rejects.toThrow('SPEECH_VOICE_LANGUAGE_MISMATCH');
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
