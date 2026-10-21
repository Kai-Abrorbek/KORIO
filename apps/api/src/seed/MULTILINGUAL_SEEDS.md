# 다국어 학습 시드

학습 언어(`targetLanguage`)와 뜻·설명의 표시 언어(`meaning.ko/uz/en/ru`)는 다릅니다.
언어별 원본 파일은 분리하지만 Word·Question·Lesson·LessonNode 컬렉션은 공유합니다.
코스는 `src/common/learning-course.ts`에 등록합니다. 현재 기본 코스는 `ko-general`,
영어 코스는 `en-general`입니다.

## 데이터 규칙

- 새 언어 단어는 `headword`, 예문은 `examples[].text`를 사용합니다.
  기존 한국어 `korean` 및 현재 영어 원본 `english`는 어댑터에서 읽습니다.
- `code`는 전역 고유하고 배포 후 바꾸지 않습니다. 새 언어는 `en-` 같은 접두사를
  붙입니다. `senseKey`는 사전적 뜻을 구분하며 품사·표제어와 일관되어야 합니다.
- 단어의 정체성은 `(targetLanguage, headword, senseKey)`입니다. 언어가 다르면
  표기가 같더라도 별도 문서입니다. 한 언어의 같은 뜻은 코스 간 재사용할 수 있으므로
  단어 최상위가 아니라 `placements[].courseId`로 코스 위치를 구분합니다.
- 발음은 `ttsText`와 선택적인 `ipa`, `romanization`, 한국어용 `hangul`을 저장합니다.
  영어를 `hangul`에 복사하지 않습니다.
- 노드·레슨·문제는 `courseId`와 `targetLanguage`를 가집니다. 한국어의 기존 code와
  ID는 그대로 유지합니다. 영어 노드·레슨 code에는 `en-general:` 접두사가 붙습니다.
- 연결 문제는 `pairs[].text`가 학습 대상이고, 선택적인 `pairs[].nativeI18n`에
  설명 언어별 뜻을 넣습니다. 없으면 기존 `native` 원문을 사용합니다. 원본 시드의
  Uzbek 뜻을 자동 번역하거나 다른 언어 번역인 것처럼 바꾸지 않습니다.
- 원본은 자동 파일 검색으로 활성화하지 않습니다. 영어 유닛을 완성하면
  `english-vocabulary-seed.data.ts`에 명시적으로 import합니다. 등록한 파일의
  `EN_S{section}_UNIT{unit}_NODE{node}` 및 연관 단어·문제 exports를 함께 읽습니다.
- 영어 원본의 `study/learn-subject`와 `conference/large-work-meeting`는 각각 기존
  `learn`, `formal-meeting`와 같은 사전적 뜻입니다. 정확한 code·표제어·품사·이전
  senseKey가 일치하는 경우만 명시적 어댑터에서 정규화하며 원본을 변경하지 않습니다.

## DB에 쓰지 않는 검증

```powershell
pnpm --filter api seed:validate-course
pnpm --filter api seed:validate-words
pnpm --filter api seed:validate-words --courseId=en-general
pnpm --filter api seed:validate-grammar -- --courseId=en-general
pnpm --filter api seed:validate-grammar-track -- --courseId=en-general
```

`seed:validate-course`는 기본적으로 모든 등록 코스의 참조·고유 code·단어 정규화를
검증합니다. `--courseId=en-general`을 붙이면 영어만 검사합니다.
기존 `seed:validate-words`는 호환성을 위해 기본 한국어만 검사합니다.

## 실제 반영: 사용자가 별도로 실행

```powershell
# 기존 명령의 기본값은 한국어만
pnpm --filter api seed
pnpm --filter api seed:words

# 영어는 반드시 명시적으로 선택
pnpm --filter api seed --courseId=en-general
pnpm --filter api seed:words --courseId=en-general
pnpm --filter api seed:grammar -- --courseId=en-general
pnpm --filter api seed:grammar-track -- --courseId=en-general
```

선택한 코스를 code 기준으로 upsert하며 기존 문서·학습 진행도를 삭제하지 않습니다.
한 코스 시딩이 다른 코스의 단어 placement를 지우지 않습니다. 전체 고아 문항 삭제나
노드·레슨 삭제는 이 명령에서 실행하지 않습니다. 퇴역 콘텐츠 정리는 별도 검토된
작업으로 진행해야 합니다. 검증과 구현 과정에서 DB 시딩을 자동 실행하지 마세요.

## 이후 언어·코스를 추가할 때

1. `src/common/learning-course.ts`에 고유 `courseId`, 학습 언어 코드, 발음 locale,
   제목, 실제 준비된 모드를 등록합니다. 계정의 언어 코드·지원 모드는 여기서 파생됩니다.
2. 언어별 원본 폴더와 시드 어댑터를 만들고 `vocabulary-course.data.ts` 및
   `word-seed.data.ts`의 명시적 소스 등록에 연결합니다. 파일 생성만으로 공개되지 않습니다.
3. 앱 `constants/learnCourses.ts`, 텔레그램 `learning-options.ts`에 코스 선택·기본
   코스 매핑·번역을 추가합니다. API와 DB 컬렉션을 언어마다 복제하지 않습니다.
4. 새로운 발음 locale은 TTS의 허용 locale·기본 음성 및 음성 제공 업체 지원을 함께
   확인합니다. 문자·정답 판정처럼 언어 고유 규칙도 검증한 기능만 공개합니다.
5. 코스 간 동일 섹션 번호·단어 표기, 기존 한국어 문서, 요청 중 코스 전환,
   발음·설명 언어 분리 회귀 테스트와 `seed:validate-course`를 통과시킵니다.

현재 영어는 자율 어휘 레슨·단어 카드, 알파벳, 문법 설명·문법 문제 트랙을
지원합니다. 문법은 `Essential Grammar in Use` Unit 1–25를 앱 Section 1–2의
6개 유닛으로 묶은 데이터입니다. TOPIK·영어 전용 말하기 주제 등 준비되지 않은
모드는 연결하지 않습니다.
단어 복습은 고유 wordId로 유지되고, 레슨 진도는 고유 lessonId, 급수·전설 노드 등
코스별 상태는 별도 courseProgress 경로를 사용합니다. XP·스트릭은 기존처럼 계정 공통입니다.
