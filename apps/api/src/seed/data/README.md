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

| 타입 | 입력 방식 | 비고 |
|---|---|---|
| `fill_in_blank` | 선택지 탭 | `options` 필수 |
| `listen_fill` | 타이핑 | 정답 문장을 TTS 로 읽어줌 |
| `type_answer` | 타이핑 | |

`grammar_blank`, `grammar_build` 는 문법 드릴이라 데이터 구조가 다르다. 위 규칙을 따르지 않는다.

### 자주 하는 실수

- 언더바를 2개(`__`)만 쓰면 빈칸으로 인식되지 않는다. **3개 이상**.
- `blankAnswers` 개수와 템플릿의 `___` 개수가 다르면 채점이 어긋난다.
- `options` 에 정답을 빠뜨리면 선택형에서 문제를 풀 수 없다.
- 빈칸 사이 조사·띄어쓰기는 템플릿 텍스트 쪽에 넣는다. (`'저는 ___ 를 먹어요.'`)

## 관련 코드

- 파서·채점: `apps/mobile/src/utils/blank-sentence.ts`
- 렌더링: `apps/mobile/src/components/lesson/BlankSentence.tsx`
- 스키마: `apps/api/src/lessons/schemas/question.schema.ts`
