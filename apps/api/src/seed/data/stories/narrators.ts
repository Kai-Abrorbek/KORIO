/**
 * 주인공 → ElevenLabs 목소리. 오디오 생성기(src/scripts/generate-story-audio.ts)가 읽는다.
 *
 * 목소리는 언어를 가리지 않는다(eleven_multilingual_v2) — 다른 언어 이야기도 같은
 * 주인공을 쓸 수 있다. 목소리를 바꾸면 그 주인공 이야기의 오디오를 다시 만든다
 * (본문 해시에 주인공 id 가 들어가서 검증기가 알려 준다).
 */
export const STORY_NARRATORS: Record<
  string,
  { voiceId: string; label: string }
> = {
  rustam: { voiceId: 'pqHfZKP75CvOlQylNhV4', label: 'Bill — wise, old' },
  malika: {
    voiceId: 'cgSgspJ2msm6clMCkdW9',
    label: 'Jessica — bright, warm',
  },
  jasur: { voiceId: 'bIHbv24MWmeRgasZH58o', label: 'Will — relaxed, young' },
  dilnoza: {
    voiceId: 'EXAVITQu4vr4xnSDxMaL',
    label: 'Sarah — calm, mature',
  },
  aziz: { voiceId: 'iP95p4xoKVk53GoZ742B', label: 'Chris — down-to-earth' },
  kamola: {
    voiceId: 'XrExE9yKIg1WjnnlVkGX',
    label: 'Matilda — knowledgeable, professional',
  },
  timur: {
    voiceId: 'cjVigY5qzO86Huf0OWal',
    label: 'Eric — smooth, trustworthy',
  },
};
