# 어휘 트랙 시드 작성 가이드 (섹션 6부터 이 문서가 기준)

> **이 문서 하나만 보고 시드를 만든다.** `seed/data/README.md` 의 어휘 부분과 다르면 **이 문서가 우선**이다.
> 2026-09-30, Kai 가 섹션 1~5 문제를 직접 풀어보며 고친 것(칩 쪼개기, 긴 문제, 메타 번역, 화면 깨짐)을 전부 규칙으로 옮겼다.
> 여기 적힌 "금지" 는 전부 **실제로 유저 화면에서 터졌던 것**이다.

---

## 0. 한 줄 요약

- **실제로 쓰는 짧은 한국어 문장**으로, **그 유닛의 어휘·문법을 매번 판단하게** 만든다.
- **난이도는 문장 길이가 아니라 문법·어휘로 올린다.** 섹션이 올라가도 문장은 짧게 유지한다.
- **조립형(칩) 문제를 가장 많이** 쓰고, **보고 번역해서 타이핑하는 문제는 아주 짧게**, 말하기도 짧게.
- 학습자에게 보이는 모든 문장(정답·말풍선·번역)은 **해설이 아니라 문장**이다. `교재`, `Node`, `Unit`, `이 과에서 배운…`, 백틱(`` ` ``) 금지.
- 4개 언어(ko/uz/en/ru) 전부. 우즈벡어 아포스트로피는 `‘`(o‘ g‘) 와 `’`(ma’no) — ASCII `'` 금지.

---

## 1. 섹션 6 이후의 수준

앱의 급수(placement level) 1개 = 섹션 2개다 (`placement.const.ts`).

| 급수 | 섹션 | 수준 | 대략 |
|---|---|---|---|
| 1 | 1~2 | 초급 1 | 인사·숫자·자기소개 |
| 2 | 3~4 | 초급 2 | 일상생활, 기본 연결어미 |
| **3** | **5~6** | **중급 1** | TOPIK 3급 |
| 4 | 7~8 | 중급 2 | TOPIK 4급 |
| 5 | 9~10 | 고급 1 | TOPIK 5급 |
| 6 | 11~12 | 고급 2 | TOPIK 6급 |

**섹션 6 (중급 1 후반) 에서 기대하는 것**

- 어휘: 직장·학교 행정·건강·환경·뉴스·감정 표현·관용 표현 입문. 한자어 비중이 늘어난다 (`출장`, `보고서`, `환불`, `예약 변경`).
- 문법 (예시): `-느라고`, `-는 바람에`, `-(으)ㄹ 텐데`, `-더라고요`, `-는 대신에`, `-(으)ㄴ/는 편이다`, `-다고 하다`(간접화법), `-게 되다`, `-아/어 놓다`, 피동(`열리다`, `닫히다`), `-(으)ㄹ 뻔하다`, `-고 말다`.
- 문체: 기본은 **해요체**. 유닛 주제가 요구할 때만 합니다체(공지·발표)·반말(친구)·한다체(글).
- 한 문장에 **절 2개까지** (`A-느라고 B`). 절 3개 이상이면 문제 두 개로 나눈다.

**난이도 올리는 법 (길이 말고)**

- 오답 보기를 "모양은 비슷한데 뜻·문법이 다른 것" 으로 (`-느라고` vs `-는 바람에` vs `-아/어서`).
- 같은 문법을 **다른 각도로 세 번** 묻는다 (고르기 → 조립 → 직접 쓰기). 서로 다른 문법 세 개를 한 번씩 묻는 것보다 낫다.
- 비슷한 어휘 구별 (`참가`/`참석`, `고치다`/`수리하다`, `맡기다`/`맡다`).
- `difficulty` 는 1~5 중 섹션 6 은 **4~5**. 유닛 도입 매칭·그림 문제만 3.

---

## 2. 구조와 키

```
섹션 → 유닛(9개 안팎) → 노드 4~7개 → 노드당 레슨 5개 → 레슨당 문제 20개
```

- **노드 수는 유닛 내용에 맞춰** 4~7개. 노드 하나 = 유닛 안의 작은 주제 하나 (예: "보고서와 회의").
- **노드당 레슨 5개**: 1~4 는 새 내용, **5번째는 그 노드 종합 복습**(앞 4개 레슨의 표현을 섞어서, 새 단어 없이).
- **레슨당 문제 20개.** 19~21 은 허용, 그 밖은 안 된다.
- 문제 키: **`s{섹션}u{유닛}_{세 자리 번호}_{type}`** (예: `s6u1_001_word_matching`). 번호는 유닛 안에서 001부터 연속.
  **한 번 정한 키는 절대 바꾸지 않는다** — 키가 DB `code` 라서 바꾸면 그 문항의 진행도·오답 기록이 끊긴다.
- 레슨의 `questions` 배열 순서가 곧 출제 순서다.
- 레슨이 참조하는 키는 **반드시** 같은 유닛의 `*_QUESTIONS` 에 있어야 한다. 없으면 시더가 `❌ 없는 키` 를 찍고 조용히 건너뛴다 (레슨이 짧아진다).
- 문항을 레슨에서 빼면 다음 `seed` 때 DB 에서 지워진다 (고아 정리). 되살릴 수도 있게 정의는 남겨 두고 싶으면 `export const …_DISABLED` 로 따로 빼둔다.

### 파일 위치와 등록 (새 섹션을 만들 때 전부 해야 로드맵에 뜬다)

1. `apps/api/src/seed/data/vocabulary/section6/unit{N}.ts` — `S6_UNIT{N}_WORDS`, `S6_UNIT{N}_QUESTIONS`, `S6_UNIT{N}_NODES` 를 export
2. `section6/index.ts` — `export * from './unit{N}';`
3. `vocabulary/index.ts` — `export * from './section6';`
4. `seed/seed.ts` — `S6_UNIT{N}_QUESTIONS` · `S6_UNIT{N}_NODES` 를 import 해서 `allQuestions` · `allNodes` 에 펼친다
5. `seed/word-seed.data.ts` — `S6_UNIT{N}_WORDS` import, 목록에 `{ section: 6, unit: N, words: S6_UNIT{N}_WORDS }`
6. `lessons/section.const.ts` — `SECTIONS` 에 섹션 6 제목·설명 4개 언어 (없으면 "6-bo‘lim" 같은 기본 제목이 뜬다)
7. `QuestionLevel` 은 `LEVEL_6` 까지만 있다. **섹션 7 부터는 enum 추가가 필요하다** — 스키마 변경이라 Kai 에게 먼저 묻는다.

### 파일 형식 — 헬퍼 함수 쓰지 말고 객체 리터럴

섹션 5 는 유닛마다 `translateBuilder(a, b, c, d)` 같은 **위치 인자 헬퍼**가 달라서(네 번째 인자가 어떤 파일은 번역, 어떤 파일은 힌트) 고칠 때마다 사고가 났다.
**새 시드는 문제 하나 = 객체 리터럴 하나.** 반복되는 건 4개 언어 묶음 `L()` 과 공용 지시문 상수 정도만 쓴다.

```ts
import { QuestionLevel } from '../../../../lessons/schemas/question.schema';
import { LessonCategory } from '../../../../lessons/schemas/lesson.schema';
import { WordPartOfSpeech } from '../../../../words/schemas/word.schema';
import type { WordSeedEntry } from '../../../word-seed.types';

const L = (ko: string, uz: string, en: string, ru: string) => ({ ko, uz, en, ru });
const LV = QuestionLevel.LEVEL_6;
```

(상대 경로는 섹션 5 파일과 같은 깊이다 — 섹션 5 `unit1.ts` 의 import 를 그대로 따라 쓴다.)

### 노드·레슨 형식

```ts
export const S6_UNIT1_NODES = [
  {
    title: L('보고서와 회의', 'Hisobot va majlis', 'Reports and Meetings', 'Отчёты и совещания'),
    section: 6,
    unit: 1,
    order: 1,
    isActive: true,
    lessons: [
      {
        title: L('바빠서 못 했어요', 'Band bo‘lib ulgurmadim', 'Too Busy to Do It', 'Не успел — был занят'),
        description: L(
          '-느라고로 바빠서 못 한 이유를 말해요.',
          '-느라고 bilan band bo‘lgani uchun qila olmagan sababni aytamiz.',
          'Say why you couldn’t do something using -느라고.',
          'Объясняем, почему не успели, с помощью -느라고.',
        ),
        category: LessonCategory.VOCABULARY,
        level: LV,
        order: 1,
        questions: ['s6u1_001_word_matching', 's6u1_002_fill_in_blank', /* … 20개 */],
      },
      // … 레슨 5개 (5번째 = 종합 복습)
    ],
  },
];
```

- 레슨 `description` 은 **유저에게 보이는 한 줄 소개**다. 여기엔 문법 이름을 써도 된다(문제 안에는 안 됨).
- 노드 `order` 는 유닛 안에서 1부터, 레슨 `order` 도 노드 안에서 1부터.

---

## 3. 레슨 구성 — 조립형을 가장 많이

**레슨 20문제 기본 배분** (이 비율에서 ±1 정도만 움직인다)

| 묶음 | 타입 | 개수 |
|---|---|---|
| **조립형 (칩)** | `translate_builder` 3 · `word_arrange` 2 · `reply_builder` 1 · `sentence_builder` 1 | **7** |
| 고르기 | `fill_in_blank` 2 · `listening` 1 · `dialog_complete` 또는 `dialog_order` 1 · `reading_quiz` 1 | 5 |
| 타이핑 | `type_answer` 1 · `listen_type` 또는 `listen_fill` 1 · `translate_type` 1 | 3 |
| 말하기 | `speaking` | 2 |
| 기타 | `error_hunt` 1 · `cloze_passage` 1 · (`word_matching` / `audio_match` / `verb_transform` / `image_choice` 중) 1 | 3 |

- **각 노드의 첫 레슨은 새 단어 소개로 시작**: 1번 문제 `word_matching`, 몇 문제 뒤 `audio_match` (같은 5단어를 귀로). `image_choice` 는 그림이 뜻을 분명히 보여줄 때만, 유닛 전체에서 2~3개.
- **같은 타입을 연달아 두지 않는다.** (조립형끼리도 `translate_builder` 다음에 `word_arrange` 는 괜찮다 — 타입 이름이 같지만 않으면 된다)
- 레슨 앞쪽 = 고르기·듣기(쉬움), 가운데 = 조립형, 뒤쪽 = 타이핑·말하기(어려움). 마지막 문제는 조립형이나 말하기로 끝내면 기분 좋게 끝난다.
- **종합 복습 레슨(5번째)** 은 새 단어 없이 앞 레슨 표현만. 타이핑·조립형 비중을 1~2개 더 올려도 된다.
- 한 레슨에서 **정답 문장이 겹치지 않게** 한다 (같은 문장을 조립 → 타이핑으로 연달아 묻지 않는다. 한 레슨 건너서는 괜찮다).

---

## 4. 길이 한도 — 제일 많이 어긴 규칙

"음절" = 한글 글자 수(공백·문장부호 제외). "어절" = 띄어쓰기로 나눈 덩어리.

| 타입 | 무엇이 짧아야 하나 | 한도 |
|---|---|---|
| `translate_type` **(보고 번역해서 타이핑)** | 정답 | **한 문장, 16음절 이하** (섹션 4·5에서 최대 210음절짜리 작문이 있었다 — Kai 도 못 풀었다) |
| `type_answer` | 빈칸 정답 | **한 단어 또는 활용형 하나** (6음절 이하). 빈칸이 든 문장은 25음절 이하 |
| `listen_type` (듣고 받아쓰기) | 정답 | 조금 길어도 된다: **1~2문장, 30음절 이하** |
| `listen_fill` | 빈칸 | 빈칸 1~2개, 각 6음절 이하. 문장 전체 35음절 이하 |
| `speaking` | 따라 말할 문장 | **한 문장, 14음절 이하.** 대화문·줄바꿈 금지 |
| `translate_builder` | 정답 / 말풍선 | **9어절 이하** / 말풍선(번역) **70자 이하** |
| `word_arrange` | 정답 | 3~9어절 |
| `reply_builder` | 정답 / 상대 말 | 3~8어절 / `npcText` 45자 이하, 2문장까지 |
| `sentence_builder` | 들려줄 한국어 / 학습자 언어 칩 | 9어절 이하 / 칩 10개 이하 |
| `dialog_complete` | 대사 | 2~4턴, 한 줄 30자 이하 |
| `dialog_order` | 대사 | 3~5줄, 한 줄 30자 이하 |
| `error_hunt` | 문장 | 한 문장 30자 이하 |
| `reading_quiz` | 지문 | 2~5문장, 250자 이하 |
| `cloze_passage` | 지문 | 250자 이하, 빈칸 2~3개 |
| `listening` | 들려줄 말 | 1~2문장 또는 2~4턴 짧은 대화, 80자 이하 |
| `word_matching` · `audio_match` | 한국어 칸 | **단어만, 5자 이하, 띄어쓰기 없이.** 학습자 언어 칸 20자 이하 |

한도를 넘길 것 같으면 **문제를 두 개로 나눈다.** 길게 만들어서 난이도를 올리지 않는다.

---

## 5. 칩(조립형) 규칙 — `translate_builder` · `word_arrange` · `reply_builder` · `sentence_builder`

칩은 `options` 항목 하나당 하나 생기고, 학습자가 누른 칩을 **공백으로 이어 붙인 것**을 정답과 비교한다 (공백·문장부호는 무시).

### 5-1. 칩 쪼개기

1. **칩 하나 = 어절 하나.** 정답을 띄어쓰기로 자른 조각이 곧 칩이다.
   - ❌ `'여기 규칙을'`, `'하나 물어봐도 돼요?'` (덩어리 칩 — 폭이 제각각이라 화면이 깨지고, 덩어리째 맞추면 너무 쉽다)
   - ✅ `'여기'`, `'규칙을'`
2. **조사·어미는 앞말에 붙인 채로 둔다.** `'보고서를'` 이지 `'보고서'` + `'를'` 이 아니다. 조사만 떨어진 칩은 한국어 어절이 아니다.
3. **보조용언은 띄어쓰기대로 나눈다.** `'써'` `'놓았어요'`, `'먹어'` `'봤어요'`, `'쓰고'` `'싶어요'`. (정답 문장을 쓸 때 맞춤법대로 띄어 쓰면 저절로 된다)
4. **의존명사·단위도 띄어쓰기대로.** `'갈'` `'수'` `'있어요'`, `'두'` `'개'`, `'한'` `'시간'`.
5. **정답과 칩에 문장부호를 넣지 않는다.** 정답 `answer` 는 마침표·물음표 없이 쓰고, 칩도 문장부호 없이. (채점이 문장부호를 무시하지만, 칩에 `?` 가 붙어 있으면 그게 마지막 칩이라는 걸 알려준다)
6. **같은 어절이 정답에 두 번 나오면 칩도 두 번.** `저는 … 저는 …` 이면 `'저는'` 두 개.
7. **정답이 한 어절이면 조립형으로 만들 수 없다.** 최소 **3어절**.
8. `options` 에 정답 어절을 **정답 순서대로 적지 않는다.** (API 가 섞어서 내려주지만 파일에도 섞어 둔다)

### 5-2. 오답 칩

1. **2~3개, 각각 한 어절.** ❌ `'규칙을 만들어요'` → ✅ `'만들어요'`
2. **같은 자리에 들어갈 법한 것**으로: 서술어 자리면 다른 서술어(어미는 같게 — `먹었어요` 의 오답은 `읽었어요`), 조사 자리면 같은 명사의 다른 조사(`보고서를` ↔ `보고서가`), 연결어미면 다른 연결어미.
3. **오답을 넣었을 때 다른 정답 문장이 만들어지면 안 된다.** 섹션 4에서 `확인해 볼게요` 문제에 `드릴게요` 를 넣었다가 `확인해 드릴게요`(맞는 한국어)가 오답 처리됐다.
   특히 **비슷한 연결어미를 오답으로 넣을 때 조심**: `늦잠을 자는 바람에 지각했어요` 에 `자느라고` 를 넣으면 `늦잠을 자느라고 지각했어요` 도 말이 된다 → 그런 오답은 `fill_in_blank` 로 보내고, 조립형 오답은 뜻이 확실히 틀어지는 단어로.
4. **오답도 실제 한국어 어절**이어야 한다 (`했어요가` 같은 건 모양만 보고 피한다).

### 5-3. 타입별

**`translate_builder` — 학습자 언어 문장을 보고 한국어 칩 조립**
- 말풍선 = **`answerTranslation[학습자 언어]`**. 서버(`translateSourceText`)가 이걸 띄운다. 그래서:
  - `answerTranslation` 은 **정답 문장의 번역 그 자체**. 해설·요약·상황 설명 금지. ❌ `'Node grammatikasi va qo‘llanish konteksti yakunlanadi.'`
  - uz/en/ru 에 **한글이 한 글자라도 섞이면** 말풍선이 `instruction` 으로 떨어진다 → 한글 금지.
  - `ko` 칸에는 정답 한국어 문장 + 마침표. (한국어 UI 는 영어 말풍선을 쓴다)
- `instruction` 은 공용 지시문 ("다음 문장을 한국어로 만들어 보세요").
- `npcText` 쓰지 않는다.

**`word_arrange` — 한국어 문장을 듣고 한국어 칩 조립**
- 화면이 `npcText || answer` 를 읽어준다 → **`npcText` 를 넣지 않는다** (넣으면 정답 대신 그게 음성으로 나간다).
- `answerTranslation` 은 피드백용 번역.

**`reply_builder` — 상대 말을 듣고 대답 조립**
- `npcText` = 상대가 하는 **한국어** 말(스피커가 읽어준다). 정답은 그 말에 대한 **자연스러운 대답**.
- 정답을 아무도 알려주지 않는 유일한 조립형이라 제일 어렵다. 대답에 그 레슨 문법을 넣는다.

**`sentence_builder` — 한국어를 듣고 학습자 언어 칩 조립**
- `answer` · `audioText` = 들려줄 한국어 문장.
- `answerI18n` = 언어별 정답 (`L(en문장, uz문장, en문장, ru문장)` — **ko 칸은 영어**로. 한국어 UI 에서 한국어 칩을 주면 정답이 보인다).
- `optionsI18n` = 언어별 칩: 그 언어 정답을 **공백으로 자른 단어 전부 + 오답 2~3개**. 영어 관사(`the`, `a`)·전치사도 한 칩. 우즈벡어·러시아어도 단어 단위.
- `options` 는 한국어 어절 칩 (예전 호환용 — 정답 어절 + 오답 2~3개).

---

## 6. 타입별 형식과 예시 (섹션 6 수준)

모든 문제에 공통으로 들어가는 필드:

```ts
type: '…',
level: LV,                                   // QuestionLevel.LEVEL_6
lessonCategory: LessonCategory.VOCABULARY,   // 대화·듣기·말하기 문제는 CONVERSATION
instruction: L(…),                           // 4개 언어. 대부분 공용 지시문 상수로 충분
difficulty: 4,                               // 섹션 6 = 4~5 (도입 매칭·그림만 3)
tags: ['work', '-느라고'],                    // 주제 + 문법. 검색·복습 묶음용
isActive: true,
```

- `xpReward` 는 **넣지 않는다.** 타입별 기본값(`economy.const.ts` `QUESTION_XP_BY_TYPE`)을 쓴다. 문제마다 손으로 넣은 값이 섹션마다 제각각이었다.
- `hint` 는 선택. 넣으면 4개 언어, **정답을 그대로 알려주지 않게** (두 언어를 잇는 한 줄: `"band bo‘lib" = -느라고`).
- `answerTranslation` 은 정답 문장의 4개 언어 번역. 매칭 계열만 비워도 된다.

아래 예시는 유닛 "직장 생활" (문법 `-느라고`, `-는 바람에`) 기준이다.

### 6-1. 조립형

```ts
s6u1_010_translate_builder: {
  type: 'translate_builder',
  level: LV, lessonCategory: LessonCategory.VOCABULARY, difficulty: 4,
  instruction: L('다음 문장을 한국어로 만들어 보세요.', 'Gapni koreyscha tuzing.', 'Build this sentence in Korean.', 'Составьте это предложение по-корейски.'),
  options: ['점심을', '쓰느라고', '못', '보고서를', '먹었어요', '회의를', '팔았어요'],
  answer: '보고서를 쓰느라고 점심을 못 먹었어요',
  answerTranslation: L(
    '보고서를 쓰느라고 점심을 못 먹었어요.',
    'Hisobot yozish bilan band bo‘lib, tushlik qila olmadim.',   // ← 이게 말풍선
    'I was busy writing a report, so I couldn’t eat lunch.',
    'Я писал отчёт и не успел пообедать.',
  ),
  tags: ['work', '-느라고'], isActive: true,
},

s6u1_014_word_arrange: {
  type: 'word_arrange',
  level: LV, lessonCategory: LessonCategory.VOCABULARY, difficulty: 4,
  instruction: L('듣고 문장을 순서대로 만들어 보세요.', 'Tinglang va gapni tartib bilan tuzing.', 'Listen and put the sentence in order.', 'Послушайте и составьте предложение.'),
  // npcText 없음 — 화면이 answer 를 읽어준다
  options: ['지각했어요', '막히는', '길이', '바람에', '일찍', '퇴근했어요'],
  answer: '길이 막히는 바람에 지각했어요',
  answerTranslation: L('길이 막히는 바람에 지각했어요.', 'Yo‘l tirband bo‘lgani uchun kechikdim.', 'I was late because of the traffic.', 'Я опоздал из-за пробок.'),
  tags: ['work', '-는 바람에'], isActive: true,
},

s6u1_017_reply_builder: {
  type: 'reply_builder',
  level: LV, lessonCategory: LessonCategory.CONVERSATION, difficulty: 5,
  instruction: L('상대의 말을 듣고 대답을 만들어 보세요.', 'Suhbatdoshning gapini tinglab, javob tuzing.', 'Listen and build a reply.', 'Послушайте и составьте ответ.'),
  npcText: '어제 회의에 왜 안 왔어요?',
  options: ['못', '출장을', '가는', '갔어요', '바람에', '갑자기', '보고서를', '왔어요'],
  answer: '갑자기 출장을 가는 바람에 못 갔어요',
  answerTranslation: L('갑자기 출장을 가는 바람에 못 갔어요.', 'To‘satdan xizmat safariga ketib qolganim uchun bora olmadim.', 'I suddenly had to go on a business trip, so I couldn’t go.', 'Меня внезапно отправили в командировку, поэтому не смог прийти.'),
  tags: ['work', '-는 바람에'], isActive: true,
},

s6u1_021_sentence_builder: {
  type: 'sentence_builder',
  level: LV, lessonCategory: LessonCategory.VOCABULARY, difficulty: 4,
  instruction: L('한국어를 듣고 뜻을 순서대로 만들어 보세요.', 'Koreyscha gapni tinglab, ma’nosini tartib bilan tuzing.', 'Listen to the Korean and build its meaning.', 'Послушайте и составьте перевод.'),
  answer: '다음 주에 부산으로 출장을 가요',
  audioText: '다음 주에 부산으로 출장을 가요',
  options: ['출장을', '다음', '가요', '주에', '부산으로', '서울에서', '왔어요'],
  answerI18n: L(
    'I am going on a business trip to Busan next week',          // ko = 영어
    'Keyingi hafta Pusanga xizmat safariga boraman',
    'I am going on a business trip to Busan next week',
    'На следующей неделе я еду в командировку в Пусан',
  ),
  optionsI18n: {
    ko: ['to', 'trip', 'I', 'next', 'am', 'on', 'week', 'going', 'a', 'business', 'Busan', 'Seoul', 'came'],
    uz: ['safariga', 'Keyingi', 'boraman', 'Pusanga', 'hafta', 'xizmat', 'Seuldan', 'keldim'],
    en: ['to', 'trip', 'I', 'next', 'am', 'on', 'week', 'going', 'a', 'business', 'Busan', 'Seoul', 'came'],
    ru: ['в', 'командировку', 'На', 'еду', 'следующей', 'я', 'неделе', 'Пусан', 'в', 'Сеула', 'приехал'],
  },
  answerTranslation: L('다음 주에 부산으로 출장을 가요.', 'Keyingi hafta Pusanga xizmat safariga boraman.', 'I’m going on a business trip to Busan next week.', 'На следующей неделе я еду в командировку в Пусан.'),
  tags: ['work'], isActive: true,
},
```

(러시아어 정답에 `в` 가 두 번 나오면 칩도 두 개다 — 5-1 의 6번 규칙은 모든 언어에 똑같이 적용된다.)

### 6-2. 타이핑 4종 — 반드시 `grading` 을 넣는다

| 타입 | 화면 | `grading.mode` |
|---|---|---|
| `type_answer` | 뜻(말풍선)을 보고 빈칸에 한국어 **한 단어** | `exact` (단어 자체가 목표) 또는 `targetExpression` |
| `translate_type` | 학습자 언어 **한 문장**을 보고 한국어로 타이핑 | `targetExpression` (목표 표현 1~2개) 또는 `semantic` |
| `listen_type` | 듣고 문장 전체를 받아쓰기 | `exact` |
| `listen_fill` | 듣고 문장의 빈칸만 받아쓰기 | `exact` |

**`type_answer` — 두 가지 모양만 쓴다**

```ts
// 모양 A: 단어 하나를 쓴다 → 큰 입력 상자. 말풍선 = answerTranslation[학습자 언어] (뜻)
s6u1_006_type_answer: {
  type: 'type_answer',
  level: LV, lessonCategory: LessonCategory.VOCABULARY, difficulty: 4,
  instruction: L('뜻을 보고 한국어로 쓰세요.', 'Ma’nosiga qarab koreyscha yozing.', 'Write the Korean word for this meaning.', 'Напишите слово по-корейски.'),
  answer: '출장',
  answerTranslation: L('출장', 'xizmat safari', 'business trip', 'командировка'),   // ← 말풍선
  grading: { mode: 'exact', expectedMeaning: 'business trip', tolerance: { punctuation: true, spacing: true, minorTypos: false } },
  tags: ['work'], isActive: true,
},

// 모양 B: 문장 속 빈칸 하나 → 문장 카드. 말풍선 = 문장 전체의 번역
s6u1_012_type_answer: {
  type: 'type_answer',
  level: LV, lessonCategory: LessonCategory.VOCABULARY, difficulty: 5,
  instruction: L('문장에 맞는 말을 쓰세요.', 'Gapga mos so‘zni yozing.', 'Write the word that fits the sentence.', 'Напишите подходящее слово.'),
  sentenceTemplate: '내일까지 ___를 내야 해요.',
  blankAnswers: ['보고서'],
  answerTranslation: L('내일까지 보고서를 내야 해요.', 'Ertagacha hisobotni topshirishim kerak.', 'I have to hand in the report by tomorrow.', 'Мне нужно сдать отчёт до завтра.'),
  grading: { mode: 'exact', expectedMeaning: 'report', tolerance: { punctuation: true, spacing: true, minorTypos: false } },
  tags: ['work'], isActive: true,
},
```

- 동사·형용사를 사전형으로 쓰게 할 땐 정답이 `…다` 로 끝나면 화면이 "기본형(…다)으로 쓰세요" 안내를 자동으로 붙인다. 문장 속 빈칸이면 활용형을 정답으로.
- **말풍선(뜻)에 정답 한국어를 쓰지 않는다.** uz/en/ru 에 한글이 섞이면 서버가 말풍선을 아예 지운다.
- 빈칸 지시문을 한국어로 길게 쓰지 않는다 (예전: `'크기가 너무 크지도 작지도 않고 정확히 맞는다는 표현은 ___예요.'` — 문제가 아니라 정의 퀴즈였다).

**`translate_type` — 가장 조심할 타입 (보고 번역해서 직접 타이핑)**

```ts
s6u1_018_translate_type: {
  type: 'translate_type',
  level: LV, lessonCategory: LessonCategory.VOCABULARY, difficulty: 5,
  instruction: L(
    '`-느라고` 표현을 써서 다음 뜻을 한국어로 쓰세요.',
    '`-느라고` ifodasi bilan quyidagi ma’noni koreyscha yozing.',
    'Use `-느라고` to write the meaning below in Korean.',
    'Используя `-느라고`, напишите по-корейски значение ниже.',
  ),
  answer: '회의하느라고 늦었어요',
  acceptedAnswers: [],
  answerTranslation: L(
    '회의하느라고 늦었어요.',
    'Majlis bilan band bo‘lib kechikdim.',     // ← 화면의 "번역할 문장"
    'I was late because I was in a meeting.',
    'Я опоздал, потому что был на совещании.',
  ),
  grading: {
    mode: 'targetExpression',
    expectedMeaning: 'I was late because I was in a meeting.',
    targetExpressions: ['느라고'],
    requiredRegister: '해요체',
    acceptedAnswers: [],
    notes: [],
    tolerance: { punctuation: true, spacing: true, minorTypos: true },
  },
  tags: ['work', '-느라고'], isActive: true,
},
```

- **정답 한 문장, 16음절 이하.** 여러 문장 작문 과제 금지.
- `answerTranslation` 필수 — 없으면 화면이 지시문을 "번역할 문장" 칸에 띄운다.
- `targetExpressions` 는 1~2개, **정답 안에 글자 그대로 들어 있어야** 한다 (AI 채점이 확인한다). 활용 때문에 모양이 바뀌면 바뀌지 않는 부분만 (`'느라고'`, `'바람에'`).
- `requiredRegister` 는 정답이 해요체일 때만 `'해요체'`. **반말 정답에 해요체를 걸면 맞는 답을 틀린다.**
- `hint`·`notes` 는 넣지 않는다 (정답을 고칠 때 같이 안 바뀌어서 옛 내용을 가리키게 된다).
- 지시문(instruction)에는 문법 이름을 백틱으로 써도 된다 — 여기가 유일한 예외다. 말풍선·정답엔 안 된다.

**`listen_type` · `listen_fill`**

```ts
s6u1_015_listen_type: {
  type: 'listen_type',
  level: LV, lessonCategory: LessonCategory.CONVERSATION, difficulty: 5,
  instruction: L('듣고 그대로 쓰세요.', 'Tinglang va aynan yozing.', 'Listen and write what you hear.', 'Послушайте и запишите.'),
  audioText: '오늘은 야근을 해야 해서 늦게 들어갈게요.',
  answer: '오늘은 야근을 해야 해서 늦게 들어갈게요.',
  acceptedAnswers: [],
  answerTranslation: L('오늘은 야근을 해야 해서 늦게 들어갈게요.', 'Bugun ishda qolishim kerak, uyga kech qaytaman.', 'I have to work late today, so I’ll be home late.', 'Сегодня мне надо задержаться на работе, приду поздно.'),
  grading: { mode: 'exact', expectedMeaning: 'Dictation of the sentence.', tolerance: { punctuation: true, spacing: true, minorTypos: false } },
  tags: ['work'], isActive: true,
},

s6u1_019_listen_fill: {
  type: 'listen_fill',
  level: LV, lessonCategory: LessonCategory.CONVERSATION, difficulty: 4,
  instruction: L('듣고 빈칸에 들어갈 말을 쓰세요.', 'Tinglang va tushib qolgan so‘zni yozing.', 'Listen and fill in the blank.', 'Послушайте и заполните пропуск.'),
  audioText: '회의 자료는 제가 미리 준비해 놓을게요.',
  sentenceTemplate: '회의 ___는 제가 미리 준비해 놓을게요.',
  blankAnswers: ['자료'],
  answer: '회의 자료는 제가 미리 준비해 놓을게요.',
  answerTranslation: L('회의 자료는 제가 미리 준비해 놓을게요.', 'Majlis materiallarini oldindan men tayyorlab qo‘yaman.', 'I’ll prepare the meeting materials in advance.', 'Материалы к совещанию я подготовлю заранее.'),
  grading: { mode: 'exact', expectedMeaning: 'materials', tolerance: { punctuation: true, spacing: true, minorTypos: false } },
  tags: ['work', '-아/어 놓다'], isActive: true,
},
```

- `listen_type` 은 조금 길어도 된다(30음절 이하, 1~2문장). 대신 **한국어 원문 받아쓰기라 발음이 헷갈리는 받침·연음**이 들어가면 좋은 문제가 된다.
- 빈칸은 언더바 **3개 이상**(`___`). 빈칸 앞뒤 조사·띄어쓰기는 템플릿 쪽에 둔다.

### 6-3. 나머지 타입

#### `fill_in_blank` — 빈칸 1~2개, 보기 4개

- 빈칸 1개: `answer` = `blankAnswers[0]`. 빈칸 2개: `answer` = `'정답1|정답2'` (파이프, 순서대로).
- `options` 4개. 정답이 전부 들어 있어야 하고, 오답은 **같은 품사·같은 활용형**이라 문맥으로만 걸러지게.
- 빈칸 3개 이상은 `cloze_passage` 로 낸다.
- `answerTranslation` 은 **완성된 문장의 번역**. "~를 구별하는 문제예요" 같은 설명 금지(섹션 5에 이런 게 남아 있다 — 따라하지 마).

```ts
s6u1_002_fill_in_blank: {
  type: 'fill_in_blank',
  level: LV, lessonCategory: LessonCategory.VOCABULARY, difficulty: 4,
  instruction: L('빈칸에 알맞은 말을 고르세요.', 'Bo‘sh joyga mos so‘zni tanlang.', 'Choose the word that fits the blank.', 'Выберите слово, подходящее к пропуску.'),
  sentenceTemplate: '내일 아침에 팀장님께 보고서를 ___ 해요.',
  blankAnswers: ['제출해야'],
  options: ['제출해야', '출근해야', '퇴근해야', '회의해야'],
  answer: '제출해야',
  answerTranslation: L('내일 아침에 팀장님께 보고서를 제출해야 해요.', 'Ertaga ertalab jamoa rahbariga hisobotni topshirishim kerak.', 'I have to submit the report to my team leader tomorrow morning.', 'Завтра утром мне нужно сдать отчёт руководителю команды.'),
  tags: ['work'], isActive: true,
},
```

#### `listening` — 듣고 고르기

- `audioText` = 들려줄 한국어(짧은 대화 2~4턴 가능, 40음절 이하). 화자 표시는 `여자:` `남자:` 만.
- **질문은 `instruction` 에 넣는다** (화면에 따로 질문 칸이 없다). "대화를 듣고 ~을/를 고르세요."
- `options` 4개, `answer` 는 그중 하나와 **글자까지 똑같이**. 보기는 모두 들은 내용에 나올 법한 것들로 — 소리만 듣고 풀 수 있어야지 상식으로 풀리면 안 된다.

```ts
s6u1_004_listening: {
  type: 'listening',
  level: LV, lessonCategory: LessonCategory.LISTENING, difficulty: 4,
  instruction: L('대화를 듣고 남자가 늦은 이유를 고르세요.', 'Dialogni tinglab, erkak nega kechikkanini tanlang.', 'Listen and choose why the man was late.', 'Прослушайте и выберите, почему мужчина опоздал.'),
  audioText: '여자: 왜 이렇게 늦었어요? 남자: 지하철이 고장 나는 바람에 늦었어요.',
  options: ['지하철이 고장 나서', '늦잠을 자서', '길이 막혀서', '회의가 길어져서'],
  answer: '지하철이 고장 나서',
  answerTranslation: L('남자는 지하철이 고장 나서 늦었어요.', 'Metro buzilib qolgani uchun erkak kechikdi.', 'The man was late because the subway broke down.', 'Мужчина опоздал, потому что сломалось метро.'),
  tags: ['work', '-는 바람에'], isActive: true,
},
```

#### `dialog_complete` — 대화 마지막 말 고르기

- `dialogLines` 1~3줄, **마지막 줄은 `npc`**. 유저가 그 말에 대답하는 구조.
- `text` 안에 "가:" "민수:" 같은 화자 이름 쓰지 마(말풍선이 이미 나눠 준다).
- `options` 4개. 오답은 **문법은 멀쩡한데 대화 흐름에 안 맞는 대답**으로(엉뚱한 주제·시제 불일치·예/아니요 반대).
- `acceptedAnswers` 쓰지 마.

```ts
s6u1_007_dialog_complete: {
  type: 'dialog_complete',
  level: LV, lessonCategory: LessonCategory.CONVERSATION, difficulty: 4,
  instruction: L('대화에 알맞은 대답을 고르세요.', 'Dialogga mos javobni tanlang.', 'Choose the reply that fits the conversation.', 'Выберите подходящий ответ.'),
  dialogLines: [
    { speaker: 'npc', text: '어제 회식에 왜 안 왔어요?' },
  ],
  options: ['야근하느라고 못 갔어요.', '회식이 정말 재미있었어요.', '내일 같이 가면 좋겠어요.', '네, 어제 일찍 왔어요.'],
  answer: '야근하느라고 못 갔어요.',
  answerTranslation: L('야근하느라고 못 갔어요.', 'Kechgacha ishlaganim uchun bora olmadim.', 'I couldn’t go because I was working late.', 'Не смог пойти, потому что задержался на работе.'),
  tags: ['work', '-느라고'], isActive: true,
},
```

#### `dialog_order` — 대화 순서 맞추기

- `dialogLines` **3~5줄**, 올바른 순서대로 적는다(앱이 섞는다). `answer: 'all_correct'` 고정.
- **순서가 딱 하나로만 정해지게.** 질문→대답→되묻기처럼 앞 줄 없이는 말이 안 되는 줄로 이어라. "네." "그래요." 같은 어디든 들어가는 줄 금지.
- 한 줄 25음절 이하.
- `answerTranslation` 은 대화 전체 요약 한 문장(여기만 예외적으로 요약 허용).

```ts
s6u1_011_dialog_order: {
  type: 'dialog_order',
  level: LV, lessonCategory: LessonCategory.CONVERSATION, difficulty: 4,
  instruction: L('대화를 순서대로 놓으세요.', 'Dialogni to‘g‘ri tartibda joylashtiring.', 'Put the conversation in order.', 'Расставьте реплики по порядку.'),
  dialogLines: [
    { speaker: 'npc', text: '보고서 다 끝났어요?' },
    { speaker: 'user', text: '아직요. 회의하느라고 시간이 없었어요.' },
    { speaker: 'npc', text: '그럼 언제까지 할 수 있어요?' },
    { speaker: 'user', text: '오늘 퇴근 전까지 드릴게요.' },
  ],
  answer: 'all_correct',
  answerTranslation: L('회의 때문에 늦어진 보고서를 오늘 안에 내겠다는 대화예요.', 'Majlis sababli kechikkan hisobotni bugun topshirish haqidagi suhbat.', 'A conversation about finishing a report delayed by meetings today.', 'Разговор о том, что отчёт, задержанный из-за совещаний, сдадут сегодня.'),
  tags: ['work', '-느라고'], isActive: true,
},
```

#### `reading_quiz` — 짧은 글 읽고 고르기

- `passageTitle` 한 줄, `passage` **3~5문장, 150자 이하**. 섹션 6부터 공지·메시지·일기 같은 실생활 글 형식 좋다.
- 질문은 `instruction`. `options` 4개, `answer` 는 보기와 **글자까지 똑같이**.
- 정답이 본문 문장을 그대로 복사한 게 아니라 **바꿔 말한 것**이어야 읽기 문제가 된다.

```ts
s6u1_016_reading_quiz: {
  type: 'reading_quiz',
  level: LV, lessonCategory: LessonCategory.VOCABULARY, difficulty: 5,
  instruction: L('글의 내용과 같은 것을 고르세요.', 'Matn mazmuniga mos keladiganini tanlang.', 'Choose the statement that matches the text.', 'Выберите утверждение, соответствующее тексту.'),
  passageTitle: '팀장님의 메시지',
  passage: '내일 회의가 오후 3시로 바뀌었습니다. 회의실 예약은 제가 해 놓았습니다. 각자 발표 자료를 준비해 오세요. 늦는 사람은 미리 연락해 주세요.',
  options: ['회의 시간이 바뀌었다', '회의실을 예약해야 한다', '팀장님이 발표를 한다', '회의가 취소되었다'],
  answer: '회의 시간이 바뀌었다',
  answerTranslation: L('내일 회의 시간이 오후 3시로 바뀌었어요.', 'Ertangi majlis vaqti soat 15:00 ga o‘zgardi.', 'Tomorrow’s meeting was moved to 3 p.m.', 'Завтрашнее совещание перенесли на 15:00.'),
  tags: ['work', 'reading'], isActive: true,
},
```

#### `cloze_passage` — 글 속 빈칸 3개

- `passage` 2~4문장, 빈칸은 **정확히 언더바 3개 `___`** 로 **3곳**.
- `blankAnswers` 3개(순서대로), `answer` = `'a|b|c'`.
- `options` = 정답 3 + 오답 2~3, 섞어서. 오답도 같은 품사·활용형.

```ts
s6u1_020_cloze_passage: {
  type: 'cloze_passage',
  level: LV, lessonCategory: LessonCategory.VOCABULARY, difficulty: 5,
  instruction: L('빈칸에 알맞은 말을 넣으세요.', 'Bo‘sh joylarga mos so‘zlarni qo‘ying.', 'Fill in the blanks.', 'Заполните пропуски.'),
  passage: '오늘은 일이 많아서 ___을 했어요. 저녁도 못 먹고 ___ 준비를 했어요. 그래도 내일은 일찍 ___ 수 있어요.',
  blankAnswers: ['야근', '회의', '퇴근할'],
  options: ['출근할', '야근', '휴가', '퇴근할', '회의'],
  answer: '야근|회의|퇴근할',
  answerTranslation: L('오늘은 일이 많아서 야근을 했어요. 저녁도 못 먹고 회의 준비를 했어요. 그래도 내일은 일찍 퇴근할 수 있어요.', 'Bugun ish ko‘p bo‘lgani uchun kechgacha ishladim. Kechki ovqatni ham yemay majlisga tayyorlandim. Ammo ertaga erta ketishim mumkin.', 'I had a lot of work today, so I worked late. I prepared for the meeting without even eating dinner. Still, I can leave early tomorrow.', 'Сегодня было много работы, и я задержался. Даже не поужинав, готовился к совещанию. Зато завтра смогу уйти пораньше.'),
  tags: ['work', 'cloze-passage'], isActive: true,
},
```

#### `error_hunt` — 틀린 단어 찾아 고치기

- `npcText` = 틀린 단어가 **딱 하나** 들어 있는 문장.
- `wrongWord` 는 **`npcText.split(' ')` 로 나온 어절 하나와 글자까지 똑같아야** 한다(앱이 공백으로 잘라서 비교). 마지막 어절이면 마침표까지 포함해야 하니 **틀린 단어는 문장 끝에 두지 마.**
- `options` 4개(정답 + 오답 3, `wrongWord` 도 오답으로 하나 넣는다). `answer` = 고친 어절.
- `answerTranslation` = 고친 문장의 번역.
- 틀린 이유는 **어휘 혼동이나 활용 실수**로. 맞춤법 장난(받침 하나 바꾸기) 금지.

```ts
s6u1_009_error_hunt: {
  type: 'error_hunt',
  level: LV, lessonCategory: LessonCategory.VOCABULARY, difficulty: 5,
  instruction: L('틀린 단어를 찾아 고치세요.', 'Noto‘g‘ri so‘zni topib, tuzating.', 'Find and fix the wrong word.', 'Найдите и исправьте неверное слово.'),
  npcText: '버스를 놓치느라고 회사에 늦었어요.',
  wrongWord: '놓치느라고',
  options: ['놓치는 바람에', '놓치느라고', '놓치려고', '놓치면서'],
  answer: '놓치는 바람에',
  answerTranslation: L('버스를 놓치는 바람에 회사에 늦었어요.', 'Avtobusdan qolib ketganim uchun ishga kechikdim.', 'I was late for work because I missed the bus.', 'Я опоздал на работу, потому что упустил автобус.'),
  hint: L('-느라고는 자기가 일부러 한 일에만 써요.', '-느라고 faqat o‘zingiz qilgan ishga ishlatiladi. Tasodifiy sabab uchun -는 바람에.', '-느라고 is only for something you were busy doing. For an accident, use -는 바람에.', '-느라고 — только для того, чем вы были заняты. Для случайной причины — -는 바람에.'),
  tags: ['work', '-느라고', '-는 바람에'], isActive: true,
},
```

> `answer` 에 공백이 있어도 된다(교정 후보를 통째로 고르는 방식). 단 `wrongWord` 는 공백 없는 어절 하나.

#### `verb_transform` — 음절 칩으로 활용형 만들기

- `baseWord` 기본형, `targetForm` 은 짧은 라벨(예: `'과거 · 해요체'`, `'-느라고'`).
- `-는 바람에` 처럼 **결과에 공백이 생기는 형태는 이 타입으로 내지 마** → `fill_in_blank` 나 `error_hunt` 로.
- `answer` 는 **공백 없는 한 덩어리**. 칩이 음절 단위라 공백을 못 만든다.
- `options` = 정답 음절 전부 + 오답 음절 2~3.
- `instruction` 에 바꿀 형태를 적는다.

```ts
s6u1_013_verb_transform: {
  type: 'verb_transform',
  level: LV, lessonCategory: LessonCategory.VOCABULARY, difficulty: 4,
  instruction: L('`준비하다`를 `-느라고` 형태로 바꾸세요.', '`준비하다` ni `-느라고` shakliga o‘zgartiring.', 'Change `준비하다` into the `-느라고` form.', 'Преобразуйте `준비하다` в форму `-느라고`.'),
  baseWord: '준비하다',
  targetForm: '-느라고',
  options: ['준', '비', '하', '느', '라', '고', '서', '면'],
  answer: '준비하느라고',
  answerTranslation: L('준비하느라고', 'tayyorlanayotganim uchun', 'because (I was) preparing', 'из-за того, что готовился'),
  tags: ['work', '-느라고'], isActive: true,
},
```

#### `word_matching` · `audio_match` — 5쌍

- `pairs` **정확히 5쌍**. `korean` 은 **띄어쓰기 없는 단어 하나, 5자 이하**. `native` 는 **우즈벡어**(이 필드는 4개 언어가 아니다).
- 그 노드에서 새로 나오는 단어 위주. 같은 레슨에서 두 번 내지 마.
- `audio_match` 는 소리로 구별하는 거라 **발음이 비슷한 단어끼리** 묶으면 좋다(출근/퇴근, 회의/회식).
- `answer` 는 안 쓴다. `answerTranslation` 도 필요 없다.

```ts
s6u1_001_word_matching: {
  type: 'word_matching',
  level: LV, lessonCategory: LessonCategory.VOCABULARY, difficulty: 3,
  instruction: L('한국어 단어와 뜻을 연결하세요.', 'Koreyscha so‘zlarni maʼnolari bilan bog‘lang.', 'Match each Korean word with its meaning.', 'Соедините корейские слова с их значениями.'),
  pairs: [
    { korean: '출근', native: 'ishga borish' },
    { korean: '퇴근', native: 'ishdan qaytish' },
    { korean: '야근', native: 'kechgacha ishlash' },
    { korean: '회식', native: 'jamoa kechki ovqati' },
    { korean: '보고서', native: 'hisobot' },
  ],
  tags: ['work'], isActive: true,
},
```

#### `image_choice` — 그림(이모지) 보고 고르기

- `choices` 4개 `{ text, label, emoji }`. `text` 한국어, `label` 우즈벡어, `emoji` 하나.
- `answer` = 정답 `choices[].text`. **정답을 첫 번째에 두지 마.**
- 이모지로 **구분이 확실한 구체 명사**만(추상어·동사 금지). 섹션 6에서는 노드당 1개 이하로.

```ts
s6u1_003_image_choice: {
  type: 'image_choice',
  level: LV, lessonCategory: LessonCategory.VOCABULARY, difficulty: 3,
  instruction: L('알맞은 그림을 고르세요.', 'To‘g‘ri rasmni tanlang.', 'Choose the right picture.', 'Выберите правильную картинку.'),
  choices: [
    { text: '명함', label: 'Vizitka', emoji: '📇' },
    { text: '서류', label: 'Hujjat', emoji: '📄' },
    { text: '달력', label: 'Kalendar', emoji: '📅' },
    { text: '노트북', label: 'Noutbuk', emoji: '💻' },
  ],
  answer: '서류',
  answerTranslation: L('서류', 'hujjat', 'document', 'документ'),
  tags: ['work'], isActive: true,
},
```

#### `speaking` — 따라 말하기 (짧게!)

- 앱은 **`answer` 문장만 말풍선에 띄우고, 그걸 기준으로 채점**한다. `npcText` 는 화면에 안 나온다 → 쓰지 마.
- `answer` **한 문장, 14음절 이하**. 대화문·질문+대답 두 문장·줄바꿈 금지. 발음 연습할 가치 있는 문장(연음·경음화가 하나쯤)이면 더 좋다.
- `audioText` = `answer` 와 똑같이.
- `answerTranslation` = `answer` 번역.

```ts
s6u1_008_speaking: {
  type: 'speaking',
  level: LV, lessonCategory: LessonCategory.CONVERSATION, difficulty: 4,
  instruction: L('문장을 따라 말해 보세요.', 'Gapni takrorlab ayting.', 'Say the sentence out loud.', 'Произнесите предложение.'),
  answer: '오늘은 일찍 퇴근할게요.',
  audioText: '오늘은 일찍 퇴근할게요.',
  answerTranslation: L('오늘은 일찍 퇴근할게요.', 'Bugun ishdan erta ketaman.', 'I’ll leave work early today.', 'Сегодня я уйду с работы пораньше.'),
  tags: ['work', 'speaking'], isActive: true,
},
```

> 섹션 5 이전 `speaking` 에는 `npcText` 질문 + 긴 대답 형태가 있다. **따라 하지 마.** 화면엔 대답만 보이고, 긴 문장은 발음 채점이 거의 안 통과한다.

## 7. 4개 언어 · 번역 규칙

- `instruction`, `answerTranslation`, `hint`, `answerI18n`, `optionsI18n` 은 **ko/uz/en/ru 넷 다**. 하나라도 비면 그 언어 유저는 빈 화면을 본다.
- **uz/en/ru 칸에 한글 금지.** 예외는 백틱으로 감싼 문법·단어 이름(`` `-느라고` ``, `` `깨물다` ``)뿐. `translate_type`·`translate_builder` 말풍선에 한글이 섞이면 서버가 번역 대신 `instruction` 을 띄워서 문제가 깨진다.
- **메타 문장 금지.** `answerTranslation` 은 "정답 문장의 번역"이다. "~를 묻는 문제예요", "~에 대한 글이에요" 같은 설명 금지. 예외: `dialog_order` 요약 한 문장.
- **번역은 정답과 뜻이 1:1.** 주어·시제·부정·높임·수량을 맞춘다. `-느라고`(바빠서 못 함)와 `-는 바람에`(뜻밖의 일 때문에)처럼 **이 레슨이 가르치는 뉘앙스가 번역에도 드러나게.**
- 우즈벡어:
  - 아포스트로피는 **‘ (U+2018)** 로. `o‘`, `g‘` 는 `o‘`, `g‘`, 성문음은 `ʼ` (`maʼno`, `taʼlim`). ASCII `'` 는 쓰지 마(따옴표 문자열이 깨지고 검색도 안 된다).
  - 영어 단어 섞지 마(`meeting` ✕ → `majlis`, `report` ✕ → `hisobot`). 러시아어 차용도 우즈벡어에 정착한 말만.
  - 존댓말 명령문은 `-ing` (`tanlang`, `yozing`).
- 영어·러시아어의 아포스트로피·따옴표도 `’` `«»` 로(ASCII `'` 금지 — `L('I'm ...')` 는 문법 오류).
- `ko` 칸:
  - `instruction.ko` 는 한국어 지시문.
  - 번역·조립 문제의 `answerTranslation.ko` 는 **정답 한국어 문장 그대로**(서버가 ko 유저에게는 en 으로 폴백한다).
- `npcText` 를 빈 문자열 `''` 로 두면 "안 씀"과 같다. 안 쓰는 타입이면 필드를 아예 빼라.
- 한국어 문장 자체:
  - 끝에 마침표·물음표. 두 문장이면 둘 다. **단 조립형 4종의 `answer`·칩은 문장부호 없이**(5-1 규칙 5).
  - 띄어쓰기는 표준 맞춤법대로(`할 수 있어요`, `준비해 놓을게요`, `-는 바람에`). 칩이 띄어쓰기 기준으로 쪼개지니까 틀리면 조립이 안 된다.
  - 섹션 6 기본은 **해요체**. 반말·합쇼체는 그 유닛 주제가 그걸 가르칠 때만.

## 8. 단어 (`S6_UNIT{N}_WORDS`)

유닛마다 단어 배열도 같이 만든다. `seed:words` 가 이걸로 `Word` 컬렉션을 채우고, 단어장·복습이 여기서 나온다.

- 파일: 유닛 파일 안에 `export const S6_UNIT1_WORDS = [...] satisfies readonly WordSeedEntry[];`
- 유닛당 **15~25개**. `word_matching`·`audio_match` 에 나온 단어는 전부 여기 있어야 한다.
- 필수: `code`(영구 고유, kebab-case, 예 `work-overtime`), `korean`(동사·형용사는 사전형), `partOfSpeech`(`WordPartOfSpeech` enum), `meaning` 4개 언어, `examples` 1개 이상(4개 언어 번역), `pronunciation.ttsText`, `difficulty`, `tags`, `isCore`.
- 권장: `media.emoji`, `usageNote`(헷갈리는 짝이 있을 때 — 예 `야근` vs `잔업`).
- 같은 표기에 뜻이 다르면 `senseKey` 로 나누고 `code` 도 따로. 이미 앞 섹션에 있는 단어를 다시 가르치면 **같은 `code`** 를 쓴다(새로 만들지 마).
- 예문은 그 유닛 레벨 문장으로, 표제어나 활용형이 실제로 들어가게.
- 자세한 필드 설명은 `../README.md` "단어 데이터" 절.

```ts
{
  code: 'work-overtime',
  korean: '야근',
  senseKey: 'overtime-night',
  partOfSpeech: WordPartOfSpeech.NOUN,
  meaning: { ko: '밤늦게까지 회사에서 일하는 것', uz: 'kechgacha ishlash', en: 'working late, overtime', ru: 'работа допоздна, сверхурочная' },
  examples: [{
    korean: '오늘도 야근을 해서 너무 피곤해요.',
    translations: { ko: '오늘도 늦게까지 일해서 너무 피곤해요.', uz: 'Bugun ham kechgacha ishladim, juda charchadim.', en: 'I worked late again today, so I’m exhausted.', ru: 'Сегодня опять работал допоздна и очень устал.' },
  }],
  pronunciation: { hangul: '야근', romanization: 'yageun', ttsText: '야근' },
  media: { emoji: '🌙' },
  tags: ['work'],
  difficulty: 3,
  isCore: true,
},
```

## 9. 다 쓰고 나서 — 체크리스트

### 구조
- [ ] 노드 4~7개, 노드당 레슨 5개(5번째는 복습), 레슨당 문제 20개
- [ ] 레슨이 참조하는 키가 전부 `*_QUESTIONS` 에 있다(없으면 조용히 빠진다)
- [ ] 키 형식 `s6u{U}_{NNN}_{type}`, 번호 중복 없음, 기존 키 이름 안 바꿈
- [ ] 2장 등록 단계 전부 (`section6/index.ts`, `vocabulary/index.ts`, `seed.ts`, `word-seed.data.ts`, `lessons/section.const.ts`)
- [ ] `xpReward` 안 씀, `level: QuestionLevel.LEVEL_6`(LEVEL_7 이상은 enum 추가 전에 Kai 확인)

### 레슨 구성
- [ ] 조립형 7개 이상(`translate_builder` 3 · `word_arrange` 2 · `reply_builder` 1 · `sentence_builder` 1)
- [ ] 노드 첫 레슨은 `word_matching` 으로 시작
- [ ] 같은 타입 연속 없음

### 길이 (제일 많이 틀림)
- [ ] `translate_type` 한 문장 **16음절 이하**
- [ ] `speaking` 한 문장 **14음절 이하**, `npcText` 없음
- [ ] `type_answer` 단어 하나 6음절 이하
- [ ] `translate_builder` 9어절 이하, 말풍선 70자 이하
- [ ] `listen_type` 은 30음절까지 OK

### 칩
- [ ] 칩을 띄어쓰기 순서대로 이어 붙이면 `answer` 와 정확히 같다
- [ ] 오답 칩이 정답 칩과 똑같은 글자가 아니다, 정답을 하나 더 만들어 내지 않는다
- [ ] 5장 칩 규칙: 칩 = 어절 하나, 조사는 앞말에 붙임, 보조용언·의존명사는 띄어쓰기대로, 조립형 `answer`·칩에 문장부호 없음, 최소 3어절

### 필드
- [ ] 타이핑 4종에 `grading` 있음, `targetExpressions` 는 `answer` 안에 실제로 있는 문자열
- [ ] `requiredRegister` 는 해요체 정답에만
- [ ] `error_hunt` `wrongWord` 가 `npcText` 어절과 글자까지 일치(마침표 포함), 문장 끝 어절 아님
- [ ] `cloze_passage` 빈칸 = 언더바 정확히 3개 × 3곳, `blankAnswers` 3개
- [ ] `verb_transform` `answer` 공백 없음, 음절이 `options` 에 다 있음
- [ ] `dialog_order` 순서가 하나로만 정해짐, 같은 대사 두 번 없음
- [ ] 보기형 `answer` 가 `options` 에 글자까지 똑같이 있음
- [ ] 4개 언어 다 있음, uz/en/ru 에 한글 없음(백틱 예외), 메타 문장 없음, 우즈벡어 `‘`

### 검증 명령 (`C:\korio` 에서)

```bash
pnpm --filter api exec tsc --noEmit -p tsconfig.json     # 타입
pnpm --filter api seed:validate-questions                # 문제 형태(wrongWord·빈칸·음절·칩)
pnpm --filter api seed:validate-words                    # 단어 code·4개 언어·placement
```

- 기존 섹션에서 나오는 에러는 무시하고 **`s6` 로 시작하는 줄만** 0개가 될 때까지 고친다.
- `seed:validate-questions` 가 칩 조립 불가·말풍선 초과(`long`)를 경고로 띄우면 그것도 고친다.

### 시딩 순서

```bash
pnpm --filter api seed          # 노드·레슨·문제 (안 쓰는 옛 노드는 지워진다)
pnpm --filter api seed:words    # 단어
```

운영 DB에 넣을 때는 `.env` 의 `MONGODB_URI` 를 운영 값으로 바꿔서 돌리고 **끝나면 원래대로 돌려놔.** `seed:topik` 은 돌리지 마.

---

## 부록 A. 다른 AI 에게 넘길 때 붙일 요청문

> `apps/api/src/seed/data/vocabulary/VOCAB_SEED_GUIDE.md` 를 끝까지 읽고 그대로 따라서
> 섹션 {S} 유닛 {U}("{주제}", 문법: {문법 1}, {문법 2}) 시드를 만들어.
> - 1장 수준표의 섹션 {S} 난이도에 맞출 것 (길이가 아니라 문법·어휘로 어렵게)
> - 조립형(`translate_builder`·`word_arrange`·`reply_builder`·`sentence_builder`)을 레슨마다 7개 이상
> - `translate_type` 16음절, `speaking` 14음절 넘기지 말 것. `listen_type` 만 30음절까지
> - 칩은 5장 규칙대로 쪼갤 것
> - 단어 배열 `S{S}_UNIT{U}_WORDS` 도 같이
> - 다 쓰면 9장 체크리스트 돌리고 `seed:validate-questions`·`seed:validate-words` 에서 `s{S}u{U}` 에러 0개 확인

## 부록 B. 섹션 1~5 에 남아 있는, 따라 하면 안 되는 것

| 옛 시드에 있는 것 | 이제는 |
|---|---|
| `xpReward: 15` | 빼라(타입별 기본값) |
| `speaking` 에 `npcText` 질문 + 긴 대답 | 대답 한 문장 14음절만 |
| `translate_type` 두 문장·30음절 넘는 문장 | 한 문장 16음절 |
| `answerTranslation` 에 "~를 구별하는 문제예요" | 정답 문장의 번역 |
| `acceptedAnswers` 로 답 여러 개 허용 | `grading` 으로 |
| 노드당 레슨 4개 | 5개(5번째 복습) |
| 우즈벡어 ASCII `'` (`Ko'pincha`) | `‘` (`Ko‘pincha`) |
| 헬퍼 함수로 문제 자동 생성(`withS5U2SentenceBuilders` 류) | 객체 리터럴로 직접 |
