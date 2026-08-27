import { TopikQuestionType } from '../../../topik/schemas/topik-content.schema';
import { RecipeSeedQuestion, t4 } from './recipe-seed.types';

/**
 * 읽기 1~2번 예상문제 20문제 (연결어미 10 + 종결어미 10).
 *
 * 각 문항은 Ranking 표의 문법을 순서대로 확인하도록 구성돼 있다.
 * 해설의 ko 는 학습 대상이라 한국어 원문 기준으로 적는다.
 */

const GRAMMAR = TopikQuestionType.GRAMMAR_FILL_BLANK;

/** 해설 한 벌을 짧게 만들기 위한 헬퍼 */
function sol(
  flow: [string, string, string, string],
  explain: [string, string, string, string],
) {
  return {
    strategy: t4(...flow),
    explanation: t4(...explain),
  };
}

function withChoiceNotes(question: RecipeSeedQuestion): RecipeSeedQuestion {
  if (
    !question.solution ||
    question.solution.choiceNotes ||
    question.choices.length === 0
  ) {
    return question;
  }

  return {
    ...question,
    solution: {
      ...question.solution,
      choiceNotes: question.choices.map((choice) =>
        choice.correct
          ? t4(
              `‘${choice.text}’은 문장 흐름과 해설에서 확인한 문법 기능을 모두 만족하므로 정답이다.`,
              `“${choice.text}” gap oqimi va izohdagi grammatik vazifaga to'liq mos, shuning uchun to'g'ri javob.`,
              `“${choice.text}” matches both the sentence flow and the grammar function explained, so it is correct.`,
              `«${choice.text}» соответствует ходу предложения и описанной грамматической функции, поэтому это правильный ответ.`,
            )
          : t4(
              `‘${choice.text}’은 문장 흐름이나 해설에서 확인한 문법 기능과 맞지 않으므로 오답이다.`,
              `“${choice.text}” gap oqimi yoki izohdagi grammatik vazifaga mos emas, shuning uchun noto'g'ri javob.`,
              `“${choice.text}” does not match the sentence flow or the grammar function explained, so it is incorrect.`,
              `«${choice.text}» не соответствует ходу предложения или описанной грамматической функции, поэтому это неверный ответ.`,
            ),
      ),
    },
  };
}

export const PRACTICE_READING_01_02: RecipeSeedQuestion[] = [
  // ───────────────── 연결어미 1~10
  {
    code: 'recipe-r0102-pr-01',
    number: 1,
    type: GRAMMAR,
    prompt: '운동장에서 ___ 친구와 부딪혀서 넘어졌다.',
    choices: [
      { text: '축구할수록' },
      { text: '축구하던데' },
      { text: '축구하다가', correct: true },
      { text: '축구하려고' },
    ],
    source: '연결어미',
    solution: sol(
      [
        '운동장에서 축구를 하다\n→ 친구와 부딪혀서 넘어졌다.',
        "Stadionda futbol o'ynash\n→ do'stga urilib yiqilish.",
        'Playing football on the field\n→ bumped into a friend and fell.',
        'Играть в футбол на поле\n→ столкнуться с другом и упасть.',
      ],
      [
        "축구를 하는 중에 뜻밖의 일이 생겼으므로 〈행동 전환: 의외〉의 '-다가'가 알맞다.",
        "Futbol o'ynash davomida kutilmagan hodisa yuz bergani uchun 〈harakat o'zgarishi: kutilmagan〉 '-다가' mos keladi.",
        "An unexpected event happens while playing, so '-다가' 〈shift of action: unexpected〉 fits.",
        "Неожиданное событие происходит во время игры, поэтому подходит '-다가' 〈смена действия: неожиданная〉.",
      ],
    ),
  },
  {
    code: 'recipe-r0102-pr-02',
    number: 2,
    type: GRAMMAR,
    prompt: '나는 저녁을 ___ 집 앞 공원에서 산책을 한다.',
    choices: [
      { text: '먹고 나서', correct: true },
      { text: '먹다 보면' },
      { text: '먹을 만큼' },
      { text: '먹는 길에' },
    ],
    source: '연결어미',
    solution: sol(
      [
        '저녁을 먹다\n→ 그다음에 산책을 한다.',
        'Kechki ovqat yeyish\n→ keyin sayr qilish.',
        'Eating dinner\n→ then taking a walk.',
        'Поужинать\n→ затем прогуляться.',
      ],
      [
        "앞의 일을 끝낸 뒤에 뒤의 일을 하므로 〈순서: 완료〉의 '-고 나서'가 알맞다.",
        "Oldingi ish tugagach keyingisi bajarilgani uchun 〈tartib: tugallanish〉 '-고 나서' mos keladi.",
        "The second action follows after finishing the first, so '-고 나서' 〈sequence: completion〉 fits.",
        "Второе действие следует после завершения первого, поэтому подходит '-고 나서' 〈порядок: завершение〉.",
      ],
    ),
  },
  {
    code: 'recipe-r0102-pr-03',
    number: 3,
    type: GRAMMAR,
    prompt: '내일 전시회가 ___ 사람들이 많이 올 것 같다.',
    choices: [
      { text: '열리듯이' },
      { text: '열리는데', correct: true },
      { text: '열리든지' },
      { text: '열리도록' },
    ],
    source: '연결어미',
    solution: sol(
      [
        '내일 전시회가 열린다\n→ 사람들이 많이 올 것 같다.',
        "Ertaga ko'rgazma ochiladi\n→ ko'p odam keladiganga o'xshaydi.",
        'An exhibition opens tomorrow\n→ many people will probably come.',
        'Завтра открывается выставка\n→ вероятно, придёт много людей.',
      ],
      [
        "앞 문장이 뒤 내용을 꺼내기 위한 배경이므로 〈설명: 도입〉의 '-(으)ㄴ/는데'가 알맞다.",
        "Oldingi gap keyingi mazmunni kiritish uchun fon bo'lgani uchun 〈tushuntirish: kirish〉 '-(으)ㄴ/는데' mos keladi.",
        "The first clause sets up the second, so '-(으)ㄴ/는데' 〈explanation: lead-in〉 fits.",
        "Первая часть вводит вторую, поэтому подходит '-(으)ㄴ/는데' 〈пояснение: введение〉.",
      ],
    ),
  },
  {
    code: 'recipe-r0102-pr-04',
    number: 4,
    type: GRAMMAR,
    prompt: '이번 생일에 딸에게 ___ 인형을 만들었다.',
    choices: [
      { text: '선물하도록' },
      { text: '선물하든지' },
      { text: '선물하려고', correct: true },
      { text: '선물하기에' },
    ],
    source: '연결어미',
    solution: sol(
      [
        '딸에게 선물하다 (목적)\n→ 인형을 만들었다.',
        "Qiziga sovg'a qilish (maqsad)\n→ qo'g'irchoq yasadi.",
        'To give it to my daughter (purpose)\n→ made a doll.',
        'Чтобы подарить дочери (цель)\n→ сделал куклу.',
      ],
      [
        "인형을 만든 목적이 선물이므로 〈목적〉의 '-(으)려고'가 알맞다.",
        "Qo'g'irchoq yasashdan maqsad sovg'a bo'lgani uchun 〈maqsad〉 '-(으)려고' mos keladi.",
        "The purpose of making the doll is to give it as a gift, so '-(으)려고' 〈purpose〉 fits.",
        "Цель изготовления куклы — подарок, поэтому подходит '-(으)려고' 〈цель〉.",
      ],
    ),
  },
  {
    code: 'recipe-r0102-pr-05',
    number: 5,
    type: GRAMMAR,
    prompt: '일할 때 실수를 하지 ___ 미리 준비를 해야 한다.',
    choices: [
      { text: '않기에는' },
      { text: '않을수록' },
      { text: '않으려면', correct: true },
      { text: '않으니까' },
    ],
    source: '연결어미',
    solution: sol(
      [
        '실수를 하지 않다 (의도)\n→ 미리 준비를 해야 한다.',
        'Xato qilmaslik (niyat)\n→ oldindan tayyorgarlik ko\'rish kerak.',
        'Not making mistakes (intention)\n→ you must prepare in advance.',
        'Не допускать ошибок (намерение)\n→ нужно подготовиться заранее.',
      ],
      [
        "뒤에 필요한 조건이 오므로 〈가정: 의도〉의 '-(으)려면'이 알맞다.",
        "Keyin zarur shart kelgani uchun 〈faraz: niyat〉 '-(으)려면' mos keladi.",
        "A requirement follows, so '-(으)려면' 〈condition: intention〉 fits.",
        "Далее следует необходимое условие, поэтому подходит '-(으)려면' 〈условие: намерение〉.",
      ],
    ),
  },
  {
    code: 'recipe-r0102-pr-06',
    number: 6,
    type: GRAMMAR,
    prompt: '급하게 ___ 우산을 챙겨 나오는 걸 깜빡했다.',
    choices: [
      { text: '나오는데도' },
      { text: '나오자마자' },
      { text: '나오더라도' },
      { text: '나오느라고', correct: true },
    ],
    source: '연결어미',
    solution: sol(
      [
        '급하게 나오다 (이유)\n→ 우산 챙기는 걸 깜빡했다.',
        'Shoshib chiqish (sabab)\n→ soyabonni olishni unutdi.',
        'Leaving in a hurry (reason)\n→ forgot to take the umbrella.',
        'Спешно выходить (причина)\n→ забыл взять зонт.',
      ],
      [
        "앞의 일 때문에 뒤의 일을 못 했으므로 〈이유: 동시〉의 '-느라고'가 알맞다.",
        "Oldingi ish sababli keyingisi bajarilmagani uchun 〈sabab: bir vaqtda〉 '-느라고' mos keladi.",
        "The first action prevented the second, so '-느라고' 〈reason: concurrent〉 fits.",
        "Первое действие помешало второму, поэтому подходит '-느라고' 〈причина: одновременность〉.",
      ],
    ),
  },
  {
    code: 'recipe-r0102-pr-07',
    number: 7,
    type: GRAMMAR,
    prompt: '뭐든지 최선을 ___ 회사 생활을 잘 할 수 있다.',
    choices: [
      { text: '다해야', correct: true },
      { text: '다해도' },
      { text: '다하도록' },
      { text: '다하려면' },
    ],
    source: '연결어미',
    solution: sol(
      [
        '최선을 다하다 (필수 조건)\n→ 회사 생활을 잘 할 수 있다.',
        "Bor kuchini sarflash (majburiy shart)\n→ ish hayotini yaxshi olib borish mumkin.",
        'Doing your best (requirement)\n→ you can do well at work.',
        'Стараться изо всех сил (обязательное условие)\n→ можно хорошо работать.',
      ],
      [
        "앞의 일이 반드시 있어야 뒤가 가능하므로 〈조건: 필수〉의 '-아/어야'가 알맞다.",
        "Oldingi shart bo'lmasa keyingisi bo'lmagani uchun 〈shart: majburiy〉 '-아/어야' mos keladi.",
        "The first is required for the second, so '-아/어야' 〈condition: requirement〉 fits.",
        "Первое необходимо для второго, поэтому подходит '-아/어야' 〈условие: обязательность〉.",
      ],
    ),
  },
  {
    code: 'recipe-r0102-pr-08',
    number: 8,
    type: GRAMMAR,
    prompt: '전화번호를 ___ 휴대 전화에 얼른 저장했다.',
    choices: [
      { text: '잊어버릴까 봐서', correct: true },
      { text: '잊어버릴 정도로' },
      { text: '잊어버릴 테니까' },
      { text: '잊어버릴 겸해서' },
    ],
    source: '연결어미',
    solution: sol(
      [
        '잊어버릴까 걱정되다 (우려)\n→ 얼른 저장했다.',
        'Unutib qo\'yishdan xavotir (xavotir)\n→ tezda saqlab qo\'ydi.',
        'Worried about forgetting (concern)\n→ saved it right away.',
        'Опасение забыть (опасение)\n→ сразу сохранил.',
      ],
      [
        "걱정 때문에 뒤의 행동을 했으므로 〈우려〉의 '-(으)ㄹ까 봐(서)'가 알맞다.",
        "Xavotir sababli keyingi harakat bajarilgani uchun 〈xavotir〉 '-(으)ㄹ까 봐(서)' mos keladi.",
        "The action was taken out of worry, so '-(으)ㄹ까 봐(서)' 〈concern〉 fits.",
        "Действие вызвано опасением, поэтому подходит '-(으)ㄹ까 봐(서)' 〈опасение〉.",
      ],
    ),
  },
  {
    code: 'recipe-r0102-pr-09',
    number: 9,
    type: GRAMMAR,
    prompt: '몸이 ___ 힘들면 고향 생각이 많이 난다.',
    choices: [
      { text: '아프다면' },
      { text: '아프지만' },
      { text: '아프듯이' },
      { text: '아프거나', correct: true },
    ],
    source: '연결어미',
    solution: sol(
      [
        '몸이 아프다 / 힘들다 (둘 중 하나)\n→ 고향 생각이 난다.',
        "Kasal bo'lish / qiynalish (biri)\n→ vatan esga tushadi.",
        'Being sick / being tired (either)\n→ you miss your hometown.',
        'Болеть / уставать (одно из)\n→ вспоминается родина.',
      ],
      [
        "두 상황 중 하나를 고르는 자리이므로 〈선택: 택일〉의 '-거나'가 알맞다.",
        "Ikki holatdan birini tanlash o'rni bo'lgani uchun 〈tanlov: bittasi〉 '-거나' mos keladi.",
        "It lists two alternatives, so '-거나' 〈choice: alternative〉 fits.",
        "Перечисляются две альтернативы, поэтому подходит '-거나' 〈выбор: один из〉.",
      ],
    ),
  },
  {
    code: 'recipe-r0102-pr-10',
    number: 10,
    type: GRAMMAR,
    prompt: '나는 학교를 ___ 운전 면허증을 땄다.',
    choices: [
      { text: '졸업하도록' },
      { text: '졸업하든지' },
      { text: '졸업하더라도' },
      { text: '졸업하자마자', correct: true },
    ],
    source: '연결어미',
    solution: sol(
      [
        '학교를 졸업하다\n→ 곧바로 면허증을 땄다.',
        'Maktabni tugatish\n→ darhol guvohnoma oldi.',
        'Graduating from school\n→ got the licence right away.',
        'Окончить школу\n→ сразу получил права.',
      ],
      [
        "앞의 일이 끝나고 바로 뒤의 일이 일어났으므로 〈순서: 즉시〉의 '-자마자'가 알맞다.",
        "Oldingi ish tugashi bilan keyingisi yuz bergani uchun 〈tartib: darhol〉 '-자마자' mos keladi.",
        "The second follows immediately after the first, so '-자마자' 〈sequence: immediate〉 fits.",
        "Второе происходит сразу после первого, поэтому подходит '-자마자' 〈порядок: сразу〉.",
      ],
    ),
  },

  // ───────────────── 종결어미 11~20
  {
    code: 'recipe-r0102-pr-11',
    number: 11,
    type: GRAMMAR,
    prompt: '사무실을 청소하면서 중요한 서류인 것 같아서 서랍에 ___.',
    choices: [
      { text: '넣어 놓았다', correct: true },
      { text: '넣을 뻔했다' },
      { text: '넣고 있었다' },
      { text: '넣기만 했다' },
    ],
    source: '종결어미',
    solution: sol(
      [
        '중요한 서류라서\n→ 서랍에 넣어 그 상태로 두었다.',
        "Muhim hujjat bo'lgani uchun\n→ tortmaga solib qo'ydi.",
        'Since it seemed important\n→ put it in the drawer and left it there.',
        'Так как документ важный\n→ положил в ящик и оставил.',
      ],
      [
        "나중을 위해 그 상태로 두는 것이므로 〈유지: 대비〉의 '-아/어 놓다'가 알맞다.",
        "Keyinchalik uchun shu holatda qoldirilgani uchun 〈saqlash: tayyorgarlik〉 '-아/어 놓다' mos keladi.",
        "It is kept in that state for later, so '-아/어 놓다' 〈maintenance: preparation〉 fits.",
        "Предмет оставлен в этом состоянии на будущее, поэтому подходит '-아/어 놓다' 〈сохранение: подготовка〉.",
      ],
    ),
  },
  {
    code: 'recipe-r0102-pr-12',
    number: 12,
    type: GRAMMAR,
    prompt: '나는 새해에 열심히 운동해서 살을 ___.',
    choices: [
      { text: '뺄 뻔했다' },
      { text: '빼기로 했다', correct: true },
      { text: '뺄 리가 없다' },
      { text: '빼려던 참이다' },
    ],
    source: '종결어미',
    solution: sol(
      [
        '새해에 열심히 운동하다\n→ 살을 빼겠다고 마음먹었다.',
        "Yangi yilda ko'p sport qilish\n→ ozishga qaror qildi.",
        'Exercising hard in the new year\n→ decided to lose weight.',
        'Активно заниматься спортом в новом году\n→ решил похудеть.',
      ],
      [
        "새해에 세운 다짐이므로 〈계획: 결심〉의 '-기로 했다'가 알맞다.",
        "Yangi yildagi qaror bo'lgani uchun 〈reja: qaror〉 '-기로 했다' mos keladi.",
        "It is a new year's resolution, so '-기로 했다' 〈plan: resolve〉 fits.",
        "Это новогоднее решение, поэтому подходит '-기로 했다' 〈план: решение〉.",
      ],
    ),
  },
  {
    code: 'recipe-r0102-pr-13',
    number: 13,
    type: GRAMMAR,
    prompt: '시험 시작 40분 전까지 강의실에 ___.',
    choices: [
      { text: '들어가면 된다', correct: true },
      { text: '들어가곤 한다' },
      { text: '들어가게 된다' },
      { text: '들어가기 쉽다' },
    ],
    source: '종결어미',
    solution: sol(
      [
        '40분 전까지 들어가다\n→ 그것으로 충분하다.',
        '40 daqiqa oldin kirish\n→ shuning o\'zi yetarli.',
        'Entering 40 minutes before\n→ that is enough.',
        'Войти за 40 минут\n→ этого достаточно.',
      ],
      [
        "그 조건만 채우면 된다는 뜻이므로 〈조건: 충족〉의 '-(으)면 되다'가 알맞다.",
        "Shu shartni bajarish kifoya degani uchun 〈shart: qanoatlanish〉 '-(으)면 되다' mos keladi.",
        "Meeting that condition is sufficient, so '-(으)면 되다' 〈condition: sufficiency〉 fits.",
        "Достаточно выполнить это условие, поэтому подходит '-(으)면 되다' 〈условие: достаточность〉.",
      ],
    ),
  },
  {
    code: 'recipe-r0102-pr-14',
    number: 14,
    type: GRAMMAR,
    prompt: '엄마는 아이에게 밤 9시 이후에는 게임을 못 ___.',
    choices: [
      { text: '하곤 했다' },
      { text: '하게 했다', correct: true },
      { text: '해야 했다' },
      { text: '할까 했다' },
    ],
    source: '종결어미',
    solution: sol(
      [
        '엄마가 아이에게\n→ 게임을 못 하도록 시켰다.',
        'Ona bolaga\n→ o\'yin o\'ynatmaslikni buyurdi.',
        'The mother made the child\n→ not play games.',
        'Мама заставила ребёнка\n→ не играть в игры.',
      ],
      [
        "주어가 남에게 시키는 내용이므로 〈명령: 사동〉의 '-게 하다'가 알맞다.",
        "Ega boshqaga buyurayotgani uchun 〈buyruq: orttirma〉 '-게 하다' mos keladi.",
        "The subject makes someone else act, so '-게 하다' 〈command: causative〉 fits.",
        "Подлежащее побуждает другого, поэтому подходит '-게 하다' 〈побуждение: каузатив〉.",
      ],
    ),
  },
  {
    code: 'recipe-r0102-pr-15',
    number: 15,
    type: GRAMMAR,
    prompt: '나는 부모님의 뒤를 이어 식당을 ___.',
    choices: [
      { text: '맡게 됐다', correct: true },
      { text: '맡아 놓았다' },
      { text: '맡을 뿐이었다' },
      { text: '맡을 모양이었다' },
    ],
    source: '종결어미',
    solution: sol(
      [
        '부모님의 뒤를 잇다\n→ 식당을 맡는 상황으로 바뀌었다.',
        "Ota-ona ishini davom ettirish\n→ oshxonani boshqarish holatiga o'tdi.",
        'Taking over from my parents\n→ ended up running the restaurant.',
        'Продолжить дело родителей\n→ стал управлять рестораном.',
      ],
      [
        "본인의 의지보다 상황이 그렇게 바뀐 것이므로 〈설명: 변화〉의 '-게 되다'가 알맞다.",
        "O'z xohishidan ko'ra vaziyat o'zgargani uchun 〈tushuntirish: o'zgarish〉 '-게 되다' mos keladi.",
        "The situation changed rather than being chosen, so '-게 되다' 〈explanation: change〉 fits.",
        "Ситуация изменилась не по собственной воле, поэтому подходит '-게 되다' 〈пояснение: изменение〉.",
      ],
    ),
  },
  {
    code: 'recipe-r0102-pr-16',
    number: 16,
    type: GRAMMAR,
    prompt: '나는 어렸을 때 피아노를 ___.',
    choices: [
      { text: '배우는 중이다' },
      { text: '배운 적이 있다', correct: true },
      { text: '배우려던 참이다' },
      { text: '배울지도 모른다' },
    ],
    source: '종결어미',
    solution: sol(
      [
        '어렸을 때 (과거의 한때)\n→ 피아노를 배운 경험이 있다.',
        'Bolalikda (o\'tmishdagi payt)\n→ pianino o\'rgangan tajribasi bor.',
        'When I was young (a past time)\n→ I have the experience of learning piano.',
        'В детстве (момент в прошлом)\n→ есть опыт занятий на пианино.',
      ],
      [
        "'어렸을 때'라는 과거의 경험을 말하므로 〈경험: 시간〉의 '-(으)ㄴ 적이 있다'가 알맞다.",
        "'어렸을 때' o'tmish tajribasini bildirgani uchun 〈tajriba: vaqt〉 '-(으)ㄴ 적이 있다' mos keladi.",
        "'어렸을 때' points to a past experience, so '-(으)ㄴ 적이 있다' 〈experience: past〉 fits.",
        "«어렸을 때» указывает на прошлый опыт, поэтому подходит '-(으)ㄴ 적이 있다' 〈опыт: время〉.",
      ],
    ),
  },
  {
    code: 'recipe-r0102-pr-17',
    number: 17,
    type: GRAMMAR,
    prompt: '조금 전에 은행에 갔다 왔는데 문이 ___.',
    choices: [
      { text: '닫힌 셈이다' },
      { text: '닫혀 있었다', correct: true },
      { text: '닫힐 뻔했다' },
      { text: '닫혔을 뿐이다' },
    ],
    source: '종결어미',
    solution: sol(
      [
        '은행에 가 보다\n→ 문이 닫힌 상태였다.',
        'Bankka borish\n→ eshik yopiq holatda edi.',
        'Went to the bank\n→ the door was in a closed state.',
        'Сходил в банк\n→ дверь была закрыта.',
      ],
      [
        "닫힌 상태가 그대로 이어지고 있었으므로 〈지속: 유지〉의 '-아/어 있다'가 알맞다.",
        "Yopiq holat davom etayotgani uchun 〈davomiylik: saqlanish〉 '-아/어 있다' mos keladi.",
        "The closed state was continuing, so '-아/어 있다' 〈continuation: state〉 fits.",
        "Закрытое состояние сохранялось, поэтому подходит '-아/어 있다' 〈продолжение: сохранение〉.",
      ],
    ),
  },
  {
    code: 'recipe-r0102-pr-18',
    number: 18,
    type: GRAMMAR,
    prompt: '한국어를 배운 지 거의 2년이 다 ___.',
    choices: [
      { text: '되어 간다', correct: true },
      { text: '되면 좋겠다' },
      { text: '되어야 한다' },
      { text: '되기로 했다' },
    ],
    source: '종결어미',
    solution: sol(
      [
        '한국어를 배우다\n→ 2년이 되는 시점에 가까워지고 있다.',
        "Koreys tilini o'rganish\n→ 2 yil to'lishiga yaqinlashmoqda.",
        'Learning Korean\n→ approaching the two-year mark.',
        'Изучать корейский\n→ приближается срок в два года.',
      ],
      [
        "'거의 다'와 어울려 완료에 가까워지는 뜻이므로 〈진행: 완료〉의 '-아/어 가다'가 알맞다.",
        "'거의 다' bilan birga yakunlanishga yaqinlashish ma'nosi bo'lgani uchun 〈davom etish: yakunlanish〉 '-아/어 가다' mos keladi.",
        "With '거의 다' it means nearing completion, so '-아/어 가다' 〈progress: nearing completion〉 fits.",
        "Вместе с «거의 다» означает приближение к завершению, поэтому подходит '-아/어 가다' 〈продолжение: завершение〉.",
      ],
    ),
  },
  {
    code: 'recipe-r0102-pr-19',
    number: 19,
    type: GRAMMAR,
    prompt: '고객들에게 안내장을 보냈으니까 모든 준비를 ___.',
    choices: [
      { text: '마친 셈이다', correct: true },
      { text: '마치려던 참이다' },
      { text: '마치기 마련이다' },
      { text: '마치기 십상이다' },
    ],
    source: '종결어미',
    solution: sol(
      [
        '안내장까지 보냈다\n→ 준비를 다 한 것과 마찬가지다.',
        "Taklifnoma ham yuborildi\n→ tayyorgarlik tugagan bilan barobar.",
        'Even the invitations were sent\n→ that amounts to finishing the preparations.',
        'Приглашения уже отправлены\n→ это равносильно завершению подготовки.',
      ],
      [
        "실제로 끝난 것과 다름없다는 판단이므로 〈판단: 유사 결과〉의 '-(으)ㄴ/는 셈이다'가 알맞다.",
        "Amalda tugagan bilan barobar degan baho bo'lgani uchun 〈baho: taxminan〉 '-(으)ㄴ/는 셈이다' mos keladi.",
        "It judges the state as virtually finished, so '-(으)ㄴ/는 셈이다' 〈judgement: virtually〉 fits.",
        "Оценивается как практически завершённое, поэтому подходит '-(으)ㄴ/는 셈이다' 〈оценка: почти〉.",
      ],
    ),
  },
  {
    code: 'recipe-r0102-pr-20',
    number: 20,
    type: GRAMMAR,
    prompt: '그 의사는 20년간 환자들을 무료로 ___.',
    choices: [
      { text: '치료해 왔다', correct: true },
      { text: '치료하게 했다' },
      { text: '치료하는 법이다' },
      { text: '치료하려던 참이다' },
    ],
    source: '종결어미',
    solution: sol(
      [
        '20년간 (과거부터 지금까지)\n→ 무료로 치료하는 일을 계속해 왔다.',
        "20 yil davomida (o'tmishdan hozirgacha)\n→ bepul davolashni davom ettirib keldi.",
        'For 20 years (from the past until now)\n→ has continued treating patients for free.',
        'В течение 20 лет (с прошлого до настоящего)\n→ продолжал бесплатно лечить.',
      ],
      [
        "'20년간'처럼 과거부터 현재까지 이어지는 기간이므로 〈진행: 완료〉의 '-아/어 오다'가 알맞다.",
        "'20년간' kabi o'tmishdan hozirgacha davom etgan muddat bo'lgani uchun 〈davom etish: hozirgacha〉 '-아/어 오다' mos keladi.",
        "'20년간' spans from the past to now, so '-아/어 오다' 〈progress: up to now〉 fits.",
        "«20년간» охватывает период с прошлого по настоящее, поэтому подходит '-아/어 오다' 〈продолжение: до настоящего〉.",
      ],
    ),
  },
].map(withChoiceNotes);
