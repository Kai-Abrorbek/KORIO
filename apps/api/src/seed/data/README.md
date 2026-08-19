# 시드 데이터 작성 규칙

어휘 트랙(`data/section1`, `data/section2`)과 문법 페이지(`data/grammar`)를 쓸 때 지키는 것.
TOPIK·합격 레시피는 데이터 구조가 달라서 여기 해당 없다.

## 단어 데이터 (`*_WORDS`) 작성 규칙

각 유닛의 `*_WORDS`는 레슨 문제용 임시 목록이 아니라 `Word` 컬렉션의 원본이다.
`pnpm --filter api seed:words`가 배열을 정규화해서 DB에 upsert하고, 배열이 위치한
파일의 섹션·유닛과 배열 순서가 각각 `placements.section`, `placements.unit`,
`placements.order`가 된다. 같은 단어가 여러 유닛에 나오면 하나의 Word에 placement가
여러 개 붙으므로 유닛마다 중복 문서를 만들지 않는다.

새 단어는 아래의 확장 구조로 작성한다. 타입을 붙이면 AI가 필수 필드를 빠뜨렸을 때
바로 발견할 수 있다.

```ts
import { WordPartOfSpeech } from '../../../words/schemas/word.schema';
import type { WordSeedEntry } from '../../word-seed.types';

export const S3_UNIT1_WORDS = [
  {
    code: 'personal-info-full-name',
    korean: '성명',
    senseKey: 'full-name',
    partOfSpeech: WordPartOfSpeech.NOUN,
    meaning: {
      ko: '성과 이름을 함께 이르는 말',
      uz: 'ism-familiya',
      en: 'full name',
      ru: 'ФИО',
    },
    examples: [
      {
        korean: '신청서에 성명을 써 주세요.',
        translations: {
          ko: '신청서에 성과 이름을 써 주세요.',
          uz: 'Arizaga ism-familiyangizni yozing.',
          en: 'Please write your full name on the application.',
          ru: 'Пожалуйста, напишите ФИО в заявлении.',
        },
      },
    ],
    pronunciation: {
      hangul: '성명',
      romanization: 'seongmyeong',
      ttsText: '성명',
    },
    media: {
      emoji: '🪪',
      imageUrl: '',
      imageAlt: {
        ko: '이름표',
        uz: 'ism kartasi',
        en: 'name card',
        ru: 'карточка с именем',
      },
    },
    tags: ['personal-info'],
    difficulty: 3,
    usageNote: {
      ko: '서류나 공식적인 상황에서 자주 써요.',
      uz: "Ko'pincha hujjatlarda va rasmiy vaziyatlarda ishlatiladi.",
      en: 'Often used on forms and in formal situations.',
      ru: 'Часто используется в анкетах и официальных ситуациях.',
    },
    isCore: true,
  },
] satisfies readonly WordSeedEntry[];
```

필드 규칙:

- `code`는 뜻 하나를 영구 식별하는 안정적인 값이다. 배포 후에는 번역을 고쳐도
  바꾸지 말고, 다른 뜻에 재사용하지 않는다.
- `korean`은 표제어다. 동사·형용사는 사전형(`먹다`, `예쁘다`)을 기본으로 한다.
- `senseKey`는 같은 표기의 다른 뜻을 구분한다. 예: `배`의 `stomach`, `pear`,
  `boat`. 동의어를 나누는 용도로 남용하지 않는다.
- `meaning`과 `examples[].translations`는 `ko`, `uz`, `en`, `ru` 네 언어를 모두
  작성한다. 기계 번역을 확인 없이 넣거나 한 언어 문장을 다른 언어 칸에 복사하지 않는다.
- `examples`는 최소 1개를 권장한다. 해당 유닛 수준의 자연스러운 한국어 문장으로
  만들고 표제어 또는 실제 활용형이 문장에 들어가야 한다. 네 언어 번역은 같은 주어,
  시제, 부정, 수량을 유지한다.
- `partOfSpeech`는 `WordPartOfSpeech` enum을 쓴다. 여러 단어로 굳어진 표현은
  `PHRASE`, 아직 분류하기 어려울 때만 `OTHER`를 쓴다.
- `pronunciation.ttsText`는 Azure Speech가 읽을 한국어다. 괄호 설명이나 번역을
  넣지 않는다. 발음대로 별도 표기가 필요 없으면 `korean`과 같게 쓴다.
- `media.emoji` 또는 `media.imageUrl` 중 하나는 권장한다. 이미지가 있으면
  `imageAlt`도 네 언어로 작성한다. 비슷하지만 뜻이 다른 그림은 쓰지 않는다.
- `difficulty`는 1~5, `tags`는 검색·복습 묶음용 소문자 kebab-case,
  `isCore`는 그 유닛에서 반드시 외울 핵심 단어인지 나타낸다.
- 동일 단어를 다른 유닛에서 다시 가르칠 때는 같은 `code`, `korean`, `senseKey`,
  `partOfSpeech`를 사용한다. `meaning`의 설명 문장은 같은 사전적 뜻 안에서 자연스럽게
  달라질 수 있으며, 먼저 등록된 항목이 대표 뜻으로 저장된다. 실제 사전적 뜻이 다르면
  반드시 별도의 `code`와 `senseKey`를 사용한다. 시더는 placement와 예문을 합친다.
- 예전 `{ korean, uz, en, ru, emoji }` 형식도 마이그레이션을 위해 읽히지만,
  새로 만들거나 수정하는 단어는 위 확장 구조로 작성한다.

저장 전 `pnpm --filter api seed:validate-words`로 고유 code, 네 언어 뜻, 예문 번역,
placement를 검사한다. 실제 DB 반영은 `pnpm --filter api seed:words`이며 기존 단어와
사용자의 `UserWordProgress`를 자동 삭제하지 않는다. 현재 작성 중인 Section 2는 단어
시딩 대상에서 제외되어 있으므로 완성 후 `word-seed.data.ts`의 source 목록에 연결한다.

## 표현 데이터 (`data/expressions`) 작성 규칙

표현 기능은 `ExpressionPack` → `Expression` → 기존 `Question` 순서로 연결된다.
현재 기준 예시는 `data/expressions/expression.data.ts`에 상황 팩 1개, 표현 1개,
연습문제 2개만 들어 있다. 다른 AI에게 표현 시딩을 맡길 때 이 파일의 구조를 그대로
복사하고 배열 항목을 늘리게 한다.

- 상황 팩·표현·문제의 `code`는 각각 영구 식별자다. 배포 후 다른 내용에 재사용하거나
  번역을 고친다는 이유로 바꾸지 않는다.
- `title`, `description`, `meaning`, `context`, `usageNote`, `imageAlt`, 문제의
  `instruction`, `hint`, `answerTranslation`은 ko/uz/en/ru를 모두 작성한다.
- 표현 하나는 하나의 `packCode`에 속하고, `placements`로 여러 섹션·유닛에서
  재사용할 수 있다. 같은 표현을 다른 유닛에서 가르치려고 중복 문서를 만들지 않는다.
- `pronunciation.ttsText`에는 Azure Speech가 읽을 자연스러운 한국어 전체 표현만 넣는다.
- 연습은 새 문제 타입을 만들지 않는다. 표현마다 기존 `fill_in_blank` 1개 이상과
  `translate_type` 1개 이상을 `practiceQuestions`에 넣는다.
- `fill_in_blank`는 `sentenceTemplate`의 `___` 개수와 `blankAnswers` 개수가 같아야
  하고, 모든 정답이 `options`에 실제로 있어야 한다.
- `translate_type`에는 아래 채점 규칙에 맞는 `grading`을 반드시 넣는다. 특정 표현을
  연습하는 문제는 `targetExpression`, 자연스러운 동의 표현을 모두 허용하는 문제는
  `semantic`을 쓴다.
- 실제 반영 전 `pnpm --filter api seed:validate-expressions`, 반영할 때
  `pnpm --filter api seed:expressions`를 사용한다. 시더는 code 기준 upsert만 하며 기존
  표현과 `UserExpressionProgress`를 삭제하지 않는다.
- 일반 `seed`의 고아 문항 정리는 `Expression.practiceQuestionIds`도 참조 목록으로
  인정하므로 표현 연습문제가 삭제되지 않는다.

## Seed authoring rules for answer grading

These rules apply whenever an AI or developer creates or updates lesson seed data. The goal is to support useful feedback such as "the meaning is correct," "almost correct," and "use this expression here" for answers the learner types.

### Core principles

- Keep the existing canonical answer. It is the best model answer, not an exhaustive list of every valid answer.
- Do not enumerate every possible paraphrase in `acceptedAnswers`. Add only common, unambiguous exceptions that are valid for the lesson objective.
- Grade meaning and the lesson target separately. A semantically equivalent answer can still miss the grammar pattern, vocabulary, tense, or speech level being taught.
- Never treat text similarity alone as proof of correctness. A small change such as adding or removing Korean negation can reverse the meaning.
- Only the four typing types use grading metadata: `type_answer`, `translate_type`, `listen_type`, and `listen_fill`.
- Do not add `grading` to `speaking`, multiple choice, matching, chip selection, `sentence_builder`, `word_arrange`, or `translate_builder`. Those types already have deterministic grading; speaking keeps its Azure pronunciation assessment.
- Put shared grading behavior in the grader or at lesson level. Add question-level overrides only when the question has a specific learning requirement.
- Existing typing questions without `grading` use a conservative `exact` fallback. It may accept configured surface-level differences, but it never uses AI to infer semantic equivalence or a missing target expression.

### Grading metadata contract

Add a `grading` object to every newly authored typing question. Preserve all existing required fields and use this object in addition to the canonical answer.

```ts
grading: {
  mode: "exact" | "semantic" | "targetExpression";
  expectedMeaning: string;
  targetExpressions?: string[];
  requiredRegister?: string;
  acceptedAnswers?: string[];
  notes?: string[];
  tolerance?: {
    punctuation?: boolean;
    spacing?: boolean;
    minorTypos?: boolean;
  };
}
```

Field requirements:

- `mode: "exact"`: normally use for `listen_type`, `listen_fill`, and vocabulary-focused `type_answer`, where the written form itself is the objective.
- `mode: "semantic"`: normally use for `translate_type` when any natural expression with the same meaning may be accepted.
- `mode: "targetExpression"`: use for `type_answer` or `translate_type` when the answer must express the correct meaning and use a particular grammar pattern or expression.
- `expectedMeaning`: describe the intended meaning unambiguously, including important details such as subject, object, tense, negation, quantity, and intent.
- `targetExpressions`: list only the grammar or vocabulary forms the learner is expected to practise. This is required for `targetExpression` mode.
- `requiredRegister`: specify a required speech level or style, such as `해요체` or `합니다체`, only when it is part of the lesson objective.
- `acceptedAnswers`: include only explicitly approved equivalent answers. Do not use this as a substitute for semantic grading.
- `notes`: record exceptional grading guidance that cannot be inferred reliably from the other fields.
- `tolerance`: override the grader defaults only when the exercise needs different handling of punctuation, spacing, or minor typos.

### Authoring examples

Target-expression exercise:

```ts
{
  // Keep the seed's existing prompt and canonical-answer fields.
  grading: {
    mode: "targetExpression",
    expectedMeaning: "The speaker wants to eat.",
    targetExpressions: ["-고 싶어요"],
    requiredRegister: "해요체",
    acceptedAnswers: [],
    tolerance: {
      punctuation: true,
      spacing: true,
      minorTypos: true,
    },
  },
}
```

For a canonical answer of `먹고 싶어요`, the intended classifications are:

- `먹고 싶어요` -> correct.
- `먹고 십어요` -> almost correct; provide a spelling correction.
- `먹을래요` -> meaning is similar, but the target expression is missing; ask the learner to retry with `-고 싶어요`.
- `먹기 싫어요` -> incorrect because the meaning is reversed.

Semantic exercise:

```ts
{
  grading: {
    mode: "semantic",
    expectedMeaning: "The speaker goes to school.",
    acceptedAnswers: [],
    tolerance: {
      punctuation: true,
      spacing: true,
      minorTypos: true,
    },
  },
}
```

Exact-form exercise:

```ts
{
  grading: {
    mode: "exact",
    expectedMeaning: "The learner must write the dictated sentence accurately.",
    tolerance: {
      punctuation: true,
      spacing: false,
      minorTypos: false,
    },
  },
}
```

### Required authoring checks

Before completing new seed data, confirm that:

1. The canonical answer is natural and matches the grammar and speech level taught by the lesson.
2. `expectedMeaning` preserves negation, tense, participants, quantities, and intent.
3. `targetExpressions` contains only forms that are required for this particular learning objective.
4. A same-meaning answer that misses the target form will receive guidance instead of being silently accepted or marked simply wrong.
5. A minor spelling or spacing error can be distinguished from a meaning-changing error.
6. `acceptedAnswers` contains only deliberate exceptions and is not a generated paraphrase dump.
7. Feedback text is not duplicated in every seed item; seeds describe the rubric, while the grading service and localization layer generate user-facing feedback.

Existing seed files do not need to be rewritten all at once. Add this metadata to new typing content immediately, then backfill older typing content incrementally. Do not reseed or overwrite production data solely to introduce these fields; use a safe schema default or migration when runtime support is implemented.

## 무엇을 만드는가

**문제를 푸는 동안 한국어를 실제로 배우게 하는 것.** 이게 다른 모든 규칙보다 앞선다.

교재를 옮겨 적는 게 아니라 교재에서 *공부가 되는 것*을 뽑아낸다. 단어를 외우게 하는
문제와 판단을 시키는 문제는 다르다. `안녕히 가세요` / `안녕히 계세요` 는 뜻을 외우는
게 아니라 **누가 떠나고 누가 남는지**를 매번 판단하게 만들어야 붙는다. 같은 문법을
각도를 바꿔 세 번 물어보는 게, 서로 다른 문법 세 개를 한 번씩 물어보는 것보다 낫다.

받침처럼 규칙이 갈리는 문법은 **오답 보기에 틀린 형태를 일부러 넣는다.**
`나나은`, `하산예요`, `사람가` 를 보기에 두면 학습자가 매번 받침을 확인하게 된다.

---

## 구조

```
유닛  →  노드 6~8개  →  노드당 레슨 4개(고정)  →  레슨당 문제 20~24개
```

- **노드 수는 유닛 내용에 따라** 4~6개. 교재 한 과가 다루는 주제 수에 맞춘다.
- **레슨은 노드당 4개 고정.**
- 문제는 레슨당 20~24개.

노드는 `UNIT{n}_NODES`, 문제는 `UNIT{n}_QUESTIONS` 로 내보낸다. 레슨의 `questions`
배열에 문제 키를 나열하면 그 순서대로 출제된다. 문제 키가 곧 DB 의 `code` 라서
**한 번 정한 키는 바꾸지 않는다** — 바꾸면 그 문항의 진행도·오답 기록이 끊긴다.

---

## 문제 타입 — 언제 무엇을 쓰나

**모든 레슨에 모든 타입을 넣지 않는다.** 타입 채우기가 목적이 되면 그 레슨에서
가르칠 게 없는 문제가 들어간다. 레슨마다 5~7종이면 충분하다.

### 섹션 1 (한국어를 처음 배우는 구간)

| 타입                | 쓰는 법                                                 |
| ------------------- | ------------------------------------------------------- |
| `speaking`          | **핵심.** 가장 많이 넣는다. 나중에 실제 STT 로 연결된다 |
| `fill_in_blank`     | 단일 빈칸만. 보기를 탭한다                              |
| `word_matching`     | 단어 5쌍                                                |
| `audio_match`       | 단어 5쌍 — **항상 5쌍**                                 |
| `sentence_builder`  | 한국어 문장을 듣고 학습자 언어의 뜻을 칩으로 배열       |
| `word_arrange`      | 한국어 문장을 듣고 한국어 어절을 칩으로 배열            |
| `translate_builder` | 뜻을 보고 한국어로 옮기기                               |
| `dialog_complete`   | 짧은 대화의 마지막 대답 고르기                          |
| `image_choice`      | **유닛 도입부에 2문제 정도.** 그 이상은 단조로워진다    |

**넣지 않는 것**

- 타이핑 4종(`type_answer` · `translate_type` · `listen_type` · `listen_fill`)
  — 자판을 못 친다. **섹션 중반부터** 한 단어부터 단계적으로.
- `reply_builder` — 상대 발화를 알아들어야 해서 유닛 1엔 이르다. **유닛 2부터.**

섹션 중반 이후로는 수준에 맞춰 나머지 타입을 넣는다.

---

## 절대 규칙

`pnpm --filter api seed:validate-section1` 이 전부 검사한다. 어기면 실패한다.

**배치**

- **같은 타입을 연달아 두지 않는다.** 같은 문제를 두 번 푸는 느낌이 든다.
- 레슨당 20~24문제, 노드당 레슨 4개, 유닛당 노드 5~8개.

**보기(`options`)**

- 정답 길이만큼만 넣지 않는다. **오답을 3~4개 더** 넣는다.
- **순서를 섞어서 적는다.** 정답이 앞에 몰려 있으면 답이 보인다.
- 정답이 보기 안에 없으면 풀 수 없다.

**매칭 계열 (`word_matching` · `audio_match`)**

- `pairs[].korean` 에 **단어만.** 문장을 넣으면 버튼에 글자가 안 들어가 UI 가 깨진다.
- 5자 이하, 띄어쓰기 없이. `audio_match` 는 항상 5쌍.

**`speaking`**

- 한 사람이 말하는 단어·짧은 문장만. **두 사람 대화문 금지, 줄바꿈 금지.**
- 섹션 1은 16자 이내.

**빈칸**

- **섹션 1은 단일 빈칸만.** 다중 빈칸은 섹션 2부터.
- 어미 조각이 아니라 학습자가 기억해야 할 **완전한 단어·활용형**을 정답으로 둔다.

**4개 언어**

- `instruction` · `hint` · `answerTranslation` 은 ko/uz/en/ru 전부 채운다.
  (`explanation` 은 필요한 문항만, 넣을 땐 4개 언어 전부)
- 매칭 계열은 정답 문장이 없으므로 `answerTranslation` 을 비워도 된다.

---

## 화면은 멀쩡한데 못 푸는 것들

여기 적힌 건 전부 **실제로 밟았던 것들**이다. 화면에 에러가 안 나서 플레이해보기
전까지 모른다.

**조립형(`sentence_builder` · `word_arrange` · `translate_builder`)**

- 칩은 `options` 항목 하나당 하나 생긴다. 정답에 같은 어절이 **두 번** 나오면
  `options` 에도 **두 번** 적어야 한다. (`저는 하산이에요 저는 학생이에요` ← 조립 불가)
- **정답이 한 단어면 조립할 수 없다.** 칩을 공백으로 이어 붙이기 때문에
  `안녕하세요` 같은 한 어절 정답은 만들 수 없다.
- `options` 를 정답 순서 그대로 적지 않는다.

**`sentence_builder` — 한국어 듣기 → 학습자 언어 조립**

- 현재는 Section 1 Unit 1부터 이 구조를 적용한다. 아직 전환하지 않은 유닛은 기존
  `answer`/`options` 구조로 동작하며, 유닛별로 순차 전환한다.
- `answer` 와 `audioText` 에는 TTS로 읽을 한국어 원문을 보존한다.
- `answerI18n` 에는 ko/uz/en/ru별 조립 정답을 넣는다.
- `optionsI18n` 에는 각 언어 정답의 모든 단어와 오답 2~3개를 넣는다.
- API가 요청 언어에 맞는 `answerI18n`/`optionsI18n`을 일반 `answer`/`options`로 내려준다.
- 한국어 UI는 정답 노출을 피하기 위해 영어 칩으로 대체한다.
- 현지어 정답도 최소 두 단어여야 하며, 같은 단어가 반복되면 칩도 같은 수만큼 넣는다.

**`word_arrange`**

- **`npcText` 를 넣지 않는다.** 화면이 `npcText ?? answer` 를 읽어주기 때문에,
  넣으면 정답 대신 그게 음성으로 나간다. 비워두면 정답 문장을 읽어준다.

**`image_choice`**

- 화면은 `answer`(한국어 단어)를 크게 띄우고 `choices` 의 그림을 고르게 한다.
  **"단어 → 그림"** 이지 그 반대가 아니다. 지시문을 반대로 쓰지 않는다.
- 정답을 `choices` 첫 번째에 두지 않는다.

**`dialog_complete`**

- `text` 에 화자 이름을 적지 않는다. 화면이 A/B 배지를 따로 그린다.
  (`'하윤: 안녕하세요!'` ← 이름이 두 번 나온다)
- **마지막 줄은 `npc`.** 비어 있는 다음 차례가 `user` 몫이고 그게 정답이다.
- 섹션 1은 2~3턴. 5턴은 화면에 안 들어갈 수 있다.

**상황 설명**

- 문제를 푸는 데 필요한 정보를 **한국어로 적지 않는다.** 섹션 1 학습자는
  `새 친구에게 처음 인사해요` 를 읽어도 들어도 알아듣지 못한다.
  필요하면 `instruction`(4개 언어)에 담고, 아니면 그런 문제를 안 만든다.

**서버가 빈 문자열을 내려준다**

- `npcText` 등 문자열 필드는 비어 있으면 `undefined` 가 아니라 `''` 로 온다.
  화면 코드에서 `??` 는 이걸 못 거른다. `||` 를 쓴다.

---

## 타입별 데이터 형식

### 빈칸 — 단일 (섹션 1)

```ts
sentencePrefix: '친구가 집에 가요. 안녕히 ',
sentenceSuffix: '.',
options: ['하세요', '계세요', '가세요', '오세요', '주세요'],
answer: '가세요',
```

`sentenceTemplate` 이 없으면 `sentencePrefix + ___ + sentenceSuffix` 로 조립되어
다중 빈칸과 같은 렌더링·채점 경로를 탄다.

### 빈칸 — 다중 (섹션 2부터)

문장을 통째로 `sentenceTemplate` 에 넣고 빈칸 자리에 `___`(언더바 3개 이상)를 적는다.

```ts
sentenceTemplate: '저는 ___ 에서 ___ 을 배웁니다.',
blankAnswers: ['학교', '한국어'],              // 빈칸 순서대로
options: ['학교', '한국어', '회사', '영어'],    // 정답 전부 + 오답
```

- **`answer` 는 안 써도 된다.** `blankAnswers` 를 템플릿에 채운 문장이 정답이 된다.
- 모든 빈칸이 맞아야 정답. `grading`이 없는 기존 문제는 띄어쓰기·문장부호 차이를 자동으로 무시하고, `grading`이 있는 타이핑 문제는 `tolerance` 설정을 따른다.
- 타이핑 타입(`listen_fill`, `type_answer`)은 `options` 없이 `blankAnswers` 만 있으면 된다.
- 언더바 2개(`__`)는 빈칸으로 인식되지 않는다. **3개 이상.**
- 빈칸 사이 조사·띄어쓰기는 템플릿 텍스트 쪽에 넣는다. (`'저는 ___ 를 먹어요.'`)

| 타입            | 입력 방식 | 비고                      |
| --------------- | --------- | ------------------------- |
| `fill_in_blank` | 보기 탭   | `options` 필수            |
| `listen_fill`   | 타이핑    | 정답 문장을 TTS 로 읽어줌 |
| `type_answer`   | 타이핑    |                           |

`grammar_blank` · `grammar_build` 는 문법 드릴이라 구조가 다르다. 위 규칙 밖이다.

### `translate_builder` — 뜻을 보고 한국어로 옮기기

```ts
type: 'translate_builder',
instruction: {                       // ← 말풍선에 뜨는, 옮겨야 할 문장
  ko: '나는 한국 사람이라고 말하기',  // ko 에 정답을 그대로 쓰면 베끼게 된다
  uz: 'Men koreysman',
  en: 'I am Korean',
  ru: 'Я кореец',
},
options: ['사람이에요', '한국', '저는', '어느', '나라'],
answer: '저는 한국 사람이에요',
```

- **`instruction` 이 공용 지시문이면 안 된다.** 제목은 "한국어로 만들어 보세요"로
  고정이고 말풍선이 `instruction` 이라, 여기에 옮길 내용이 없으면 뭘 만들지 알 수 없다.
- `npcText` 를 쓰지 않는다. 렌더되지 않는다.
- 스피커가 없다. 학습자 언어라 한국어 TTS 로 읽을 수 없고, 읽어준들 답을 알려주는 셈이다.
- 힌트는 두 언어를 이어주는 데 쓴다. (`oshpaz = 요리사`, `"-dan" = "에서"`)

### `reply_builder` — 상대 말을 듣고 대답 만들기 (유닛 2부터)

```ts
type: 'reply_builder',
npcText: '안녕하세요? 저는 이수진이에요.',   // ← 말풍선. 한국어라 스피커가 읽어준다
instruction: I.reply,                       // 공용 지시문으로 충분하다
options: ['수진', '안녕하세요', '씨', '이', '저는'],
answer: '안녕하세요 수진 씨',
```

정답을 아무도 알려주지 않는 유일한 타입이다. `sentence_builder` 는 정답을 들려주고
배열만 시키고 `dialog_complete` 는 보기에서 고르게 하지만, 이건 상대 말을 알아듣고
스스로 만들어야 한다. 그래서 XP 25.

### 중급 5종

문장 하나가 아니라 지문·활용을 다룬다. 저장 전에
`pnpm --filter api seed:validate-questions` 를 돌린다.

**`reading_quiz` — 지문 읽고 답하기**

```ts
passageTitle: '주말 계획',              // 선택
passage: '이번 주말에 부산에 가려고 했습니다. 그런데 기차표 예매를 잊어버려서 못 갔습니다.',
question: '왜 부산에 못 갔습니까?',      // instruction 이 아니라 질문
options: ['기차표 예매를 잊어버려서', '친구가 아파서', '날씨가 나빠서', '돈이 없어서'],
answer: '기차표 예매를 잊어버려서',      // options 안에 글자까지 똑같이
```

**`error_hunt` — 틀린 곳 찾아 고치기**

```ts
npcText: '어제 친구하고 영화가 봤어요.',  // 오류가 들어 있는 문장
wrongWord: '영화가',                     // ← 공백으로 자른 어절과 완전히 일치
options: ['영화를', '영화에', '영화도'],
answer: '영화를',
```

`wrongWord` 는 `npcText.split(' ')` 결과 중 하나와 **글자까지 똑같아야** 한다.
문장 끝 단어면 마침표까지 포함한다 (`'봤어요.'`, `'봤어요'` 아님).
안 맞으면 어디를 눌러도 오답이라 문제를 끝낼 수 없다.

**`cloze_passage` — 지문 빈칸 채우기**

```ts
passage: '한국에 온 ___ 3년이 됐습니다. 처음에는 어려웠지만 ___ 익숙해졌습니다.',
blankAnswers: ['지', '점점'],
options: ['지', '점점', '까지', '아주'],
```

빈칸은 **언더바 정확히 3개.** 이 타입만 `split('___')` 이라 4개 이상은 어긋난다.
`answer` 는 안 써도 된다 — `blankAnswers` 를 `|` 로 이은 값이 정답이다.

**`dialog_order` — 대화 순서 맞추기**

```ts
dialogLines: [                            // 배열 순서가 곧 정답 순서
  { speaker: 'npc',  text: '안녕하세요, 무엇을 도와드릴까요?' },
  { speaker: 'user', text: '이 옷 좀 입어봐도 될까요?' },
  { speaker: 'npc',  text: '네, 탈의실은 저쪽입니다.' },
],
answer: 'all_correct',                    // 고정값
```

화면이 직접 채점한다. 3~5줄. 순서를 뒤집어도 말이 되는 대화는 넣지 않는다
(정답이 둘이 된다).

**`verb_transform` — 활용형 만들기**

```ts
baseWord: '듣다',
targetForm: '과거 · 존댓말',
answer: '들었어요',
options: ['들', '었', '어', '요', '습', '니'],  // 음절 단위
```

`options` 는 음절 하나씩. 정답의 모든 음절이 있어야 조립된다. 같은 음절이 두 번
쓰이면 두 번 넣는다. 완료 판정이 `answer.length` 라 `answer` 에 공백을 넣지 않는다.

**5종 공통**

- `passage` · `wrongWord` · `baseWord` · `targetForm` 은 i18n 대상이 아니다.
  **한국어 원문 그대로.**
- 레벨 테스트 화면엔 아직 렌더러가 없다. 레벨 테스트 문항으로 쓰지 않는다.

---

## 문법 페이지 (`data/grammar/grammar.data.ts`)

`grammar-list` → `grammar-study` 화면이 읽는다. `section` 으로 묶이고 그 안에서
`order` 로 정렬되므로 쉬운 문법이 먼저 오도록 번호를 잡는다.
(섹션 1 = 유닛 1 기본 문형, 섹션 2 = 시제)

- **퀴즈는 문법당 5문항.** 2~3개면 한 번 풀고 끝나서 규칙이 손에 안 붙는다.
  보기는 3개 이상, 정답은 정확히 하나.
- 받침으로 갈리는 문법(`은/는`, `이에요/예요`, `이/가 아닙니다`)은 `conjugations`
  표에 **받침 있는 예 2개 + 없는 예 2개**를 넣어 대비가 보이게 한다.
  `seed:validate-grammar` 가 base 에서 규칙을 다시 계산해 표와 대조한다.
- `examples[].highlight` 와 `dialogue[].highlight` 는 그 문장 안에 실제로 있는
  문자열이어야 화면에서 강조된다.
- `cautions` 에는 규칙이 아니라 **실제로 틀리는 것**을 적는다.
  (`학생이입니다`, `씨` 뒤에는 항상 `는`, `저는 중국이에요`)
- `similar` 로 짝이 되는 문법을 이어준다. (`이에요 ↔ 입니다`, `아니에요 ↔ 아닙니다`)

---

## 검증 스크립트

시드를 고쳤으면 돌린다. 전부 `pnpm --filter api` 로 실행한다.

| 스크립트                    | 검사하는 것                                          |
| --------------------------- | ---------------------------------------------------- |
| `seed:validate-section1`    | 유닛 1 배치·조립 가능 여부·매칭 단어 길이·4개 언어   |
| `seed:validate-questions`   | 중급 5종의 형태 (`wrongWord` 일치, 빈칸 수, 음절)    |
| `seed:validate-grammar`     | 문법 페이지 받침 규칙·퀴즈 정답 수·하이라이트        |
| `seed:validate-recipe`      | 합격 레시피                                          |
| `seed:validate-words`       | 단어 code·4개 언어 뜻·예문 번역·섹션/유닛 placement  |
| `seed:validate-expressions` | 표현 팩·표현·연습문제 code, 4개 언어, 빈칸·채점 구조 |

시딩은 `seed` → `seed:words` → `seed:expressions` → `seed:grammar` →
`seed:grammar-track` → `seed:recipe`.
`seed` 는 끝에 **이번 실행이 쓰지 않은 옛 노드·레슨·문항을 지운다** — 구성을 바꿔서
사라진 노드가 로드맵에 유령으로 남지 않게. 문법 트랙(`gt_` 접두사)은 건드리지 않는다.

## 관련 코드

- 파서·채점: `apps/mobile/src/utils/blank-sentence.ts`
- 타입별 채점 규칙: `apps/mobile/src/utils/answer-check.ts` (`gradeAnswer`)
- 렌더링: `apps/mobile/src/components/lesson/BlankSentence.tsx`
- 스키마: `apps/api/src/lessons/schemas/question.schema.ts`
- 검증: `apps/api/src/seed/validate-section1-rules.ts` · `validate-question-shapes.ts` · `validate-grammar-seed.ts`
