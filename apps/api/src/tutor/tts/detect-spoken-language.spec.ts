import { detectSpokenLanguage } from './detect-spoken-language';

/**
 * 이 판정이 틀리면 우즈벡어가 한국어 목소리로 읽히거나 그 반대가 된다.
 * 소리가 안 나는 게 아니라 **알아들을 수 없는 소리가 나는** 실패라,
 * 로그에도 안 남고 리뷰에서도 안 보인다. 그래서 테스트로 못 박는다.
 */
describe('detectSpokenLanguage', () => {
  it('한국어 문장은 ko', () => {
    for (const s of [
      '오, 강남이요? 뭐 먹었어요?',
      '커피는 마셨어요가 자연스러워요.',
      '영화 보러 가요.',
      '그럼 한국어로 한번 해봐요.',
      'ㅋㅋ 커피는 마셔요.',
    ]) {
      expect(detectSpokenLanguage(s)).toBe('ko');
    }
  });

  it('우즈벡어 문장은 uz', () => {
    for (const s of [
      'Mayli. Qaysi qismini tushunmayapsiz?',
      'Tushundingizmi?',
      "Men kecha do'stim bilan kinoga bordim.",
    ]) {
      expect(detectSpokenLanguage(s)).toBe('uz');
    }
  });

  it('한국어 문장 안의 외래어 한 단어는 한국어로 읽는다', () => {
    // 이 앱에서 섞인 문장은 대개 한국어 문장 안에 단어 하나가 들어간 모양이다
    expect(detectSpokenLanguage('아메리카노는 kofe 예요.')).toBe('ko');
    expect(detectSpokenLanguage('오늘 KTX 타고 부산 갔어요.')).toBe('ko');
  });

  it('우즈벡어 설명 안의 한국어 예문은 우즈벡어로 읽는다', () => {
    // 프롬프트가 우즈벡어 설명에 한국어 표현을 붙이도록 유도한다.
    // "한글이 있으면 한국어" 규칙이면 설명 전체가 한국어 음성으로 나간다.
    expect(
      detectSpokenLanguage('-러 가다 biror joyga borishni bildiradi.'),
    ).toBe('uz');
    expect(
      detectSpokenLanguage("Bu yerda 은 gapning mavzusini ko'rsatadi."),
    ).toBe('uz');
  });

  it('글자가 없는 조각은 한국어로 떨어진다', () => {
    for (const s of ['', '2024.', '...', '?!']) {
      expect(detectSpokenLanguage(s)).toBe('ko');
    }
  });
});
