# 시드 데이터 작성 규칙

## 빈칸 문제

### 다중 빈칸 (섹션 2 이후 권장)

문장을 통째로 `sentenceTemplate` 에 넣고, 빈칸 자리에 `___`(언더바 3개 이상)를 적는다.
빈칸 개수에 제한이 없다.

```ts
s2u1_042_fill_in_blank: {
  type: 'fill_in_blank',
  level: '1',
  instruction: I.fill,
  sentenceTemplate: '저는 ___ 에서 ___ 을 배웁니다.',
  blankAnswers: ['학교', '한국어'],   // 빈칸 순서대로
  options: ['학교', '한국어', '회사', '영어'],  // 선택지 (정답 + 오답)
  lessonCategory: LessonCategory.VOCABULARY,
  difficulty: 2,
  xpReward: 15,
  isActive: true,
},
```

- **`answer` 는 안 써도 된다.** `blankAnswers` 를 템플릿에 채운 문장이 정답이 된다.
- `options` 에는 **정답 전부 + 오답 distractor** 를 넣는다. 빈칸이 2개면 정답도 2개.
- 채점은 **모든 빈칸이 맞아야 정답**. 띄어쓰기·문장부호 차이는 자동으로 무시된다.
- 타이핑 타입(`listen_fill`, `type_answer`)은 `options` 없이 `blankAnswers` 만 있으면 된다.

### 단일 빈칸 (기존 형식 — 그대로 둬도 동작함)

```ts
sentencePrefix: '한국 사람들은 겨울에 김치를 ',
sentenceSuffix: '.',
answer: '담급니다',
options: ['담급니다', '입습니다', '탑니다', '배웁니다'],
```

`sentenceTemplate` 이 없으면 `sentencePrefix + ___ + sentenceSuffix` 로 자동 조립되어
다중 빈칸과 같은 렌더링·채점 경로를 탄다. 기존 825문항은 손댈 필요 없다.

새로 쓸 때는 템플릿 방식을 쓰는 게 낫다. 빈칸을 하나만 둬도 된다:

```ts
sentenceTemplate: '한국 사람들은 겨울에 김치를 ___.',
blankAnswers: ['담급니다'],
```

### 지원 문제 타입

| 타입            | 입력 방식 | 비고                      |
| --------------- | --------- | ------------------------- |
| `fill_in_blank` | 선택지 탭 | `options` 필수            |
| `listen_fill`   | 타이핑    | 정답 문장을 TTS 로 읽어줌 |
| `type_answer`   | 타이핑    |                           |

`grammar_blank`, `grammar_build` 는 문법 드릴이라 데이터 구조가 다르다. 위 규칙을 따르지 않는다.

### 자주 하는 실수

- 언더바를 2개(`__`)만 쓰면 빈칸으로 인식되지 않는다. **3개 이상**.
- `blankAnswers` 개수와 템플릿의 `___` 개수가 다르면 채점이 어긋난다.
- `options` 에 정답을 빠뜨리면 선택형에서 문제를 풀 수 없다.
- 빈칸 사이 조사·띄어쓰기는 템플릿 텍스트 쪽에 넣는다. (`'저는 ___ 를 먹어요.'`)

## `translate_builder` 와 `reply_builder`

화면이 같고 말풍선에 무엇이 들어가느냐만 다르다. 한 컴포넌트가 `mode` 로 갈린다.

### `translate_builder` — 뜻을 보고 한국어로 옮기기

```ts
type: 'translate_builder',
instruction: {                      // ← 말풍선에 뜨는, 옮겨야 할 문장
  ko: '나는 한국 사람이라고 말하기', // ko 에 정답을 그대로 쓰면 베끼게 된다
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

### `reply_builder` — 상대 말을 듣고 대답 만들기 (유닛 2부터)

```ts
type: 'reply_builder',
npcText: '안녕하세요? 저는 이수진이에요.',   // ← 말풍선. 한국어라 스피커가 읽어준다
instruction: I.reply,                      // 공용 지시문으로 충분하다
options: ['수진', '안녕하세요', '씨', '이', '저는'],
answer: '안녕하세요 수진 씨',
```

- 정답을 아무도 알려주지 않는다. `sentence_builder` 는 정답을 들려주고 배열만
  시키지만 이건 상대 말을 알아듣고 스스로 만들어야 한다. 그래서 XP 25.
- **유닛 1에는 넣지 않는다.** 이제 막 시작한 학습자는 상대 발화를 들어도
  알아듣지 못한다. `seed:validate-section1` 이 막는다.

## 중급 5종 (`reading_quiz` · `error_hunt` · `cloze_passage` · `dialog_order` · `verb_transform`)

문장 하나가 아니라 지문·활용을 다루는 타입이다. 위 빈칸 규칙과 데이터 구조가 다르다.
**틀리게 적으면 화면은 멀쩡히 뜨는데 문제를 풀 수 없다.** 저장 전에
`pnpm --filter api seed:validate-questions` 를 돌린다.

### `reading_quiz` — 지문 읽고 답하기

```ts
type: 'reading_quiz',
passageTitle: '주말 계획',              // 선택. 비워도 된다
passage: '이번 주말에 친구와 부산에 가려고 했습니다. 그런데 기차표 예매를 잊어버려서 못 갔습니다.',
question: '왜 부산에 못 갔습니까?',      // instruction 이 아니라 질문
options: ['기차표 예매를 잊어버려서', '친구가 아파서', '날씨가 나빠서', '돈이 없어서'],
answer: '기차표 예매를 잊어버려서',      // options 안에 글자까지 똑같이 있어야 한다
```

### `error_hunt` — 틀린 곳 찾아 고치기

```ts
type: 'error_hunt',
npcText: '어제 친구하고 영화가 봤어요.',  // 오류가 들어 있는 문장
wrongWord: '영화가',                     // ← 공백으로 자른 어절과 완전히 일치해야 한다
options: ['영화를', '영화에', '영화도'],  // 고칠 후보
answer: '영화를',
```

- `wrongWord` 는 `npcText.split(' ')` 결과 중 하나와 **글자까지 똑같아야** 한다.
  문장 끝 단어라면 마침표까지 포함해야 맞는다 (`'봤어요.'`, `'봤어요'` 아님).
  안 맞으면 어디를 눌러도 오답 처리돼서 문제를 끝낼 수 없다.

### `cloze_passage` — 지문 빈칸 채우기

```ts
type: 'cloze_passage',
passage: '한국에 온 ___ 3년이 됐습니다. 처음에는 어려웠지만 ___ 익숙해졌습니다.',
blankAnswers: ['지', '점점'],            // 빈칸 순서대로
options: ['지', '점점', '까지', '아주'],  // 정답 전부 + 오답
```

- 빈칸은 **언더바 정확히 3개(`___`)**. 다른 빈칸 타입과 달리 4개 이상은 인식이 어긋난다.
- `answer` 는 안 써도 된다. `blankAnswers` 를 `|` 로 이은 값이 정답이 된다.
- `passage` 의 `___` 개수와 `blankAnswers` 길이가 반드시 같아야 한다.

### `dialog_order` — 대화 순서 맞추기

```ts
type: 'dialog_order',
dialogLines: [                            // 배열 순서가 곧 정답 순서
  { speaker: 'npc',  text: '안녕하세요, 무엇을 도와드릴까요?' },
  { speaker: 'user', text: '이 옷 좀 입어봐도 될까요?' },
  { speaker: 'npc',  text: '네, 탈의실은 저쪽입니다.' },
],
answer: 'all_correct',                    // 고정값
```

- 화면이 직접 채점한다. 3~5줄 정도가 적당하고, 순서를 뒤집어도 말이 되는
  대화는 넣지 않는다 (정답이 둘이 돼버린다).

### `verb_transform` — 활용형 만들기

```ts
type: 'verb_transform',
baseWord: '듣다',                          // 기본형
targetForm: '과거 · 존댓말',                // 목표 형태 라벨
answer: '들었어요',
options: ['들', '었', '어', '요', '습', '니'],  // 음절 단위. 정답 음절 전부 + 오답
```

- `options` 는 **음절 하나씩** 쪼개서 넣는다. 정답 `answer` 의 모든 음절이
  `options` 안에 있어야 조립이 된다. 같은 음절이 두 번 쓰이면 두 번 넣는다.
- 완료 판정을 `answer.length` 로 하므로 `answer` 에 공백을 넣지 않는다.

### 공통

- 5종 모두 `passage` · `wrongWord` · `baseWord` · `targetForm` 은 서버가 그대로
  내려준다. i18n 대상이 아니라 **한국어 원문 그대로** 적는다.
- 지시문(`instruction`), 힌트, 설명, `answerTranslation` 은 다른 타입과 똑같이
  ko/uz/en/ru 4개 언어를 채운다.
- 레벨 테스트 화면에는 아직 렌더러가 없다. 레벨 테스트 문항으로 쓰지 않는다.

## 관련 코드

- 파서·채점: `apps/mobile/src/utils/blank-sentence.ts`
- 타입별 채점 규칙: `apps/mobile/src/utils/answer-check.ts` (`gradeAnswer`)
- 렌더링: `apps/mobile/src/components/lesson/BlankSentence.tsx`
- 스키마: `apps/api/src/lessons/schemas/question.schema.ts`
- 시드 검증: `apps/api/src/seed/validate-question-shapes.ts`

## Section 1 어휘 시드 규칙

Section 1은 한국어를 처음 배우는 학습자를 위한 과정이다. 문제 타입을 전부 한 번씩
채우는 것보다, 교재의 핵심 어휘와 짧은 표현을 반복해서 실제로 익히는 것을 우선한다.

- Unit 1~4에는 키보드 입력 문제(`type_answer`, `translate_type`, `listen_type`,
  `listen_fill`)를 넣지 않는다.
- Unit 5부터 키보드 입력과 받아쓰기를 한 단어 또는 짧은 문장부터 단계적으로 도입한다.
- 교재 내용에 따라 유닛당 4~7개 노드를 사용하고, 레슨당 문제는 17~20개로 구성한다.
- `image_choice`, `word_matching`, `fill_in_blank`, `word_arrange`, `speaking`을
  핵심 유형으로 자주 사용한다.
- `speaking`은 단어 또는 한 사람이 말하는 짧은 표현만 사용한다. 두 사람 이상의
  대화문, 줄바꿈이 있는 문장, 긴 문장은 금지한다.
- `word_matching`과 `audio_match`의 `pairs[].korean`에는 공백 없는 단어만 넣는다.
  문장이나 긴 구를 넣지 않는다.
- Section 1의 빈칸 문제는 모두 단일 빈칸으로 만든다. 어미 일부가 아니라 학습자가
  기억해야 할 완전한 단어·활용형을 빈칸 정답으로 사용한다.
- `dialog_complete`는 짧은 1~3턴의 상황에서만 사용한다. 한 줄은 짧게 유지하고,
  정답과 오답은 모두 실제 대답처럼 자연스러운 형태로 작성한다.
- 모든 문제에 한국어·우즈베크어·영어·러시아어 지시문, 힌트, 설명,
  `answerTranslation`을 제공한다.
- Section 1을 수정한 뒤에는 반드시 `pnpm --filter api seed:validate-section1`을 실행한다.
