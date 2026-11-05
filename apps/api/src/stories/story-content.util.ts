import { createHash } from 'crypto';
import {
  STORY_OPTION_COUNT,
  STORY_QUESTION_COUNT,
  STORY_SCENES,
  type StoryContentLanguage,
  type StoryScene,
} from './stories.const';
import {
  storyCodePrefix,
  storyCourseOf,
  type StoryCourseConfig,
} from './story-courses';

/**
 * 시드·오디오 생성기·서비스가 같이 쓰는 순수 함수들.
 * DB 도 Nest 도 모른다 — 그래서 스펙과 CLI(검증기·생성기)에서 그대로 부른다.
 * 언어를 가리지 않는다: 코스마다 다른 것은 전부 story-courses.ts 에서 읽는다.
 */

/** 설명 언어별 글. 코스가 요구하는 언어만 차 있으면 된다 */
export type StoryTranslationSeed = Partial<
  Record<StoryContentLanguage, string>
>;

export interface StorySeed {
  code: string;
  /** 코스의 레벨 key ("A1", "B1+") */
  level: string;
  order: number;
  title: string;
  topic: StoryTranslationSeed;
  scene: StoryScene;
  narrator: { id: string; name: string };
  sentences: { id: string; text: string; translation: StoryTranslationSeed }[];
  vocabulary: { word: string; meaning: StoryTranslationSeed }[];
  questions: {
    id: string;
    prompt: string;
    options: string[];
    answerIndex: number;
  }[];
}

/** 한 코스의 이야기 묶음 (seed/data/stories/index.ts) */
export interface StorySeedSet {
  courseId: string;
  stories: StorySeed[];
}

export interface StoryWordTimingSeed {
  text: string;
  startMs: number;
  endMs: number;
}

/** 오디오 생성기가 쓰는 결과 한 편 (story-audio.generated.ts 의 값) */
export interface GeneratedStoryAudio {
  key: string;
  textHash: string;
  durationMs: number;
  sentences: {
    id: string;
    startMs: number;
    endMs: number;
    words: StoryWordTimingSeed[];
  }[];
}

export type GeneratedStoryAudioMap = Record<string, GeneratedStoryAudio>;

/**
 * 본문을 단어로 쪼갠다. **앱도 똑같이 쪼갠다** (공백 기준, 문장부호는 단어에 붙인 채).
 * 단어 타이밍이 이 순서·개수와 1:1 로 맞아야 앱이 i 번째 단어에 불을 켤 수 있다.
 */
export function tokenizeStoryText(text: string): string[] {
  return text.split(/\s+/).filter(Boolean);
}

/**
 * 단어 비교용: 소문자 + 앞뒤 문장부호 제거 ("Autumn," → "autumn", "«Привет!»" → "привет").
 * 글자 판단은 유니코드 기준이라 한글·키릴 문자도 그대로 남는다.
 */
export function normalizeStoryToken(token: string): string {
  return token
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '');
}

/**
 * 오디오가 지금 본문과 맞는지 가리는 해시. 목소리(narrator)도 넣는다 —
 * 주인공 목소리를 바꾸면 오디오도 다시 만들어야 하니까.
 */
export function storyTextHash(
  seed: Pick<StorySeed, 'narrator' | 'sentences'>,
): string {
  const payload = JSON.stringify({
    narrator: seed.narrator.id,
    sentences: seed.sentences.map((sentence) => [sentence.id, sentence.text]),
  });
  return createHash('sha1').update(payload).digest('hex');
}

export function storyAudioKey(code: string, textHash: string): string {
  return `${code}-${textHash.slice(0, 8)}`;
}

/** 생성된 오디오가 이 시드에 그대로 쓸 수 있는지 */
export function isGeneratedAudioFresh(
  seed: StorySeed,
  generated: GeneratedStoryAudio | undefined,
): generated is GeneratedStoryAudio {
  if (!generated) return false;
  if (generated.textHash !== storyTextHash(seed)) return false;
  if (generated.sentences.length !== seed.sentences.length) return false;
  return seed.sentences.every((sentence, index) => {
    const timing = generated.sentences[index];
    return (
      timing.id === sentence.id &&
      timing.words.length === tokenizeStoryText(sentence.text).length
    );
  });
}

/** 시드 + 생성된 오디오 → DB 에 넣을 문서 모양 */
export function buildStoryDocument(
  course: Pick<StoryCourseConfig, 'courseId' | 'targetLanguage'>,
  seed: StorySeed,
  generated: GeneratedStoryAudio | undefined,
) {
  const fresh = isGeneratedAudioFresh(seed, generated);
  return {
    courseId: course.courseId,
    targetLanguage: course.targetLanguage,
    code: seed.code,
    level: seed.level,
    order: seed.order,
    title: seed.title,
    topic: seed.topic,
    scene: seed.scene,
    narrator: seed.narrator,
    audio: fresh
      ? { key: generated.key, durationMs: generated.durationMs }
      : { key: '', durationMs: 0 },
    sentences: seed.sentences.map((sentence, index) => {
      const timing = fresh ? generated.sentences[index] : undefined;
      return {
        id: sentence.id,
        text: sentence.text,
        translation: sentence.translation,
        startMs: timing?.startMs ?? 0,
        endMs: timing?.endMs ?? 0,
        words: timing?.words ?? [],
      };
    }),
    vocabulary: seed.vocabulary,
    questions: seed.questions,
    isActive: true,
  };
}

/**
 * 설명 언어 하나를 고른다. 그 칸이 비었거나(원문 언어로 물은 경우 등) 코스를
 * 모르면 코스의 첫 번역 언어 → 아무거나 차 있는 칸 순서로 내려간다.
 */
export function pickStoryTranslation(
  translation: StoryTranslationSeed | undefined,
  lang: StoryContentLanguage,
  courseId?: string,
): string {
  if (!translation) return '';
  const fallback = courseId
    ? storyCourseOf(courseId)?.translationLanguages[0]
    : undefined;
  return (
    translation[lang] ||
    (fallback ? translation[fallback] : '') ||
    translation.uz ||
    Object.values(translation).find((value) => !!value) ||
    ''
  );
}

export interface StorySeedReport {
  errors: string[];
  warnings: string[];
}

/**
 * 시드 검증. 사람이 쓴 글이라 틀리기 쉬운 것만 본다:
 * 코스·레벨이 등록돼 있나, 코드·순서 중복, 빈 번역, 본문에 없는 핵심 단어, 문제 모양, 오디오 신선도.
 */
export function validateStorySeeds(
  sets: StorySeedSet[],
  generated: GeneratedStoryAudioMap,
  audioFileExists: (key: string) => boolean,
): StorySeedReport {
  const errors: string[] = [];
  const warnings: string[] = [];
  const codes = new Set<string>();

  for (const set of sets) {
    const course = storyCourseOf(set.courseId);
    if (!course) {
      errors.push(
        `${set.courseId}: story-courses.ts 에 없는 코스 — 레벨·번역 언어를 먼저 등록한다`,
      );
      continue;
    }
    const slots = new Set<string>();

    for (const seed of set.stories) {
      const at = (message: string) => errors.push(`${seed.code}: ${message}`);
      const level = course.levels.find((item) => item.key === seed.level);

      if (!level) {
        at(
          `${course.courseId} 에 없는 레벨 ${seed.level} (있는 것: ${course.levels.map((item) => item.key).join(', ')})`,
        );
      } else {
        const prefix = storyCodePrefix(course, level);
        if (!new RegExp(`^${prefix}\\d{2}$`).test(seed.code)) {
          at(`code 는 ${prefix}<두 자리 번호> 꼴이어야 한다`);
        }
      }
      if (codes.has(seed.code)) at('code 중복');
      codes.add(seed.code);

      const slot = `${seed.level}/${seed.order}`;
      if (slots.has(slot)) at(`같은 레벨에 order ${seed.order} 가 두 번`);
      slots.add(slot);

      if (!STORY_SCENES.includes(seed.scene)) at(`모르는 장면 ${seed.scene}`);
      if (!seed.title.trim()) at('제목이 비었다');
      const missing = (value: StoryTranslationSeed | undefined) =>
        course.translationLanguages.filter((lang) => !value?.[lang]?.trim());
      for (const lang of missing(seed.topic)) at(`topic.${lang} 가 비었다`);

      if (seed.sentences.length < 6 || seed.sentences.length > 12) {
        at(`문장은 6~12개 (지금 ${seed.sentences.length})`);
      }
      const sentenceIds = new Set<string>();
      seed.sentences.forEach((sentence, index) => {
        if (sentence.id !== `s${index + 1}`) {
          at(`문장 id 는 s1 부터 차례로 (${index + 1}번째가 ${sentence.id})`);
        }
        if (sentenceIds.has(sentence.id)) at(`문장 id 중복 ${sentence.id}`);
        sentenceIds.add(sentence.id);
        if (!sentence.text.trim()) at(`${sentence.id} 본문이 비었다`);
        if (/\s{2,}/.test(sentence.text)) at(`${sentence.id} 에 공백이 두 칸`);
        for (const lang of missing(sentence.translation)) {
          at(`${sentence.id} 번역 ${lang} 가 비었다`);
        }
      });

      const tokens = new Set(
        seed.sentences.flatMap((sentence) =>
          tokenizeStoryText(sentence.text).map(normalizeStoryToken),
        ),
      );
      const vocabWords = new Set<string>();
      for (const item of seed.vocabulary) {
        const word = normalizeStoryToken(item.word);
        if (/\s/.test(item.word.trim())) {
          at(`핵심 단어는 한 단어만 (${item.word})`);
        }
        if (!tokens.has(word)) at(`핵심 단어 "${item.word}" 가 본문에 없다`);
        if (vocabWords.has(word)) at(`핵심 단어 중복 ${item.word}`);
        vocabWords.add(word);
        for (const lang of missing(item.meaning)) {
          at(`"${item.word}" 뜻 ${lang} 가 비었다`);
        }
      }
      if (seed.vocabulary.length < 4) at('핵심 단어는 4개 이상');

      if (seed.questions.length !== STORY_QUESTION_COUNT) {
        at(`문제는 ${STORY_QUESTION_COUNT}개 (지금 ${seed.questions.length})`);
      }
      seed.questions.forEach((question, index) => {
        if (question.id !== `q${index + 1}`) at(`문제 id 는 q1 부터 차례로`);
        if (question.options.length !== STORY_OPTION_COUNT) {
          at(`${question.id} 보기는 ${STORY_OPTION_COUNT}개`);
        }
        if (new Set(question.options).size !== question.options.length) {
          at(`${question.id} 보기 중복`);
        }
        if (
          !Number.isInteger(question.answerIndex) ||
          question.answerIndex < 0 ||
          question.answerIndex >= question.options.length
        ) {
          at(`${question.id} answerIndex 가 보기 범위 밖`);
        }
      });

      const audio = generated[seed.code];
      if (!audio) {
        warnings.push(
          `${seed.code}: 오디오가 아직 없다 — 앱은 문장별 TTS 로 읽는다 (pnpm --filter api story:audio)`,
        );
      } else if (!isGeneratedAudioFresh(seed, audio)) {
        at(
          '본문이 바뀌었는데 오디오가 옛날 것 — pnpm --filter api story:audio 로 다시 만든다',
        );
      } else if (!audioFileExists(audio.key)) {
        at(`오디오 파일이 앱에 없다 (${audio.key}.mp3)`);
      }
    }
  }

  return { errors, warnings };
}
