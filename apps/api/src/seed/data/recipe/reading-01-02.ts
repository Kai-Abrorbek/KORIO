import {
  TopikQuestionType,
  TopikSection,
} from '../../../topik/schemas/topik-content.schema';
import { CONNECTIVE_30 } from './grammar-connective-30';
import { FINAL_20 } from './grammar-final-20';
import { PRACTICE_READING_01_02 } from './practice-reading-01-02';
import { RecipeSeed, t4 } from './recipe-seed.types';

/**
 * 읽기 1번~2번 — 알맞은 문법 (3급)
 *
 * 문법 표제어와 예문은 한국어 원문 그대로 둔다. 번역하면 학습 대상이 사라진다.
 * 의미·기능과 해설만 4개 언어로 옮긴다.
 *
 * grammarSections / practice 는 다음 단계에서 채운다.
 */
export const RECIPE_READING_01_02: RecipeSeed = {
  groupCode: 'reading-01-02',
  section: TopikSection.READING,
  order: 1,
  targetLevel: 3,
  sourceReference: 'PDF 14~19쪽',

  label: t4('읽기 1번~2번', "O'qish 1~2-savol", 'Reading 1–2', 'Чтение 1–2'),
  title: t4(
    '알맞은 문법',
    'Mos grammatika',
    'Correct grammar',
    'Верная грамматика',
  ),

  intro: t4(
    '읽기 [1~2]번 유형은 문맥에 알맞은 문법을 고르는 문항이다. 기본 문법 사용 능력을 측정하는 문항으로 3급 수준의 문법이 출제된다.',
    "O'qish [1~2] savollari kontekstga mos grammatikani tanlash turidir. Asosiy grammatikadan foydalanish qobiliyatini o'lchaydi va 3-daraja darajasidagi grammatika chiqadi.",
    'Reading questions 1–2 ask you to choose the grammar that fits the context. They measure basic grammar usage at level 3.',
    'Задания 1–2 раздела «Чтение» требуют выбрать грамматику, подходящую по контексту. Проверяется базовое владение грамматикой уровня 3.',
  ),

  goldenRecipe: [
    t4(
      '중급 수준의 문법 기능과 의미에 대해 알고 있어야 한다.',
      "O'rta daraja grammatikasining vazifasi va ma'nosini bilish kerak.",
      'You need to know the function and meaning of intermediate-level grammar.',
      'Нужно знать функции и значения грамматики среднего уровня.',
    ),
    t4(
      '〈연결어미〉는 앞의 내용과 뒤의 내용을 (A → B)로 나눈 다음에 어울리는 문법을 선택해야 한다.',
      "〈Bog'lovchi qo'shimcha〉da oldingi va keyingi mazmunni (A → B) ga ajratib, mos grammatikani tanlash kerak.",
      'For 〈connective endings〉, split the sentence into what comes before and after (A → B), then pick the grammar that fits.',
      'Для 〈соединительных окончаний〉 разделите предложение на первую и вторую части (A → B), затем выберите подходящую грамматику.',
    ),
    t4(
      '〈종결어미〉는 뒤의 내용의 시제가 과거, 현재, 미래인지를 판단한 다음에 어울리는 문법을 선택해야 한다.',
      "〈Tugallovchi qo'shimcha〉da keyingi mazmun o'tgan, hozirgi yoki kelasi zamonda ekanini aniqlab, mos grammatikani tanlash kerak.",
      'For 〈final endings〉, decide whether the second part is past, present or future, then pick the grammar that fits.',
      'Для 〈финальных окончаний〉 определите время второй части — прошедшее, настоящее или будущее, затем выберите подходящую грамматику.',
    ),
  ],

  grammarSections: [CONNECTIVE_30, FINAL_20],

  examples: [
    {
      code: 'recipe-r0102-ex-01',
      number: 1,
      type: TopikQuestionType.GRAMMAR_FILL_BLANK,
      prompt: '휴대 전화를 ___ 내려야 할 역을 지나쳤다.',
      choices: [
        { text: '보든지' },
        { text: '보다가', correct: true },
        { text: '보려면' },
        { text: '보고서' },
      ],
      source: 'TOPIK II 60회 읽기 1번',
      difficulty: 3,
      solution: {
        strategy: t4(
          '휴대 전화를 보다\n→ 내려야 할 역을 지나쳤다.',
          "Telefonga qarash\n→ tushish kerak bo'lgan bekatdan o'tib ketish.",
          'Looking at the phone\n→ missed the stop where you had to get off.',
          'Смотреть в телефон\n→ пропустить нужную остановку.',
        ),
        explanation: t4(
          "'내려야 할 역을 지나쳤다'는 의외의 내용이다. 이때 호응하는 문법은 〈행동 전환: 의외〉를 나타내는 '-다가'를 찾아야 한다. '-다가'는 앞의 내용을 하는 중에 뒤의 행동으로 바뀔 때 사용한다.",
          "'Tushish kerak bo'lgan bekatdan o'tib ketdim' — kutilmagan mazmun. Bunday holatda 〈harakat o'zgarishi: kutilmagan〉 ma'nosini bildiruvchi '-다가' ni topish kerak. '-다가' oldingi ish davom etayotganda keyingi harakatga o'tganda ishlatiladi.",
          "'Missed the stop where I had to get off' is an unexpected outcome. The matching grammar is '-다가', which marks 〈shift of action: unexpected〉. It is used when one action is interrupted and switches to another.",
          "«Пропустил нужную остановку» — неожиданный результат. Здесь подходит '-다가', выражающее 〈смену действия: неожиданность〉. Оно используется, когда одно действие прерывается и сменяется другим.",
        ),
        choiceNotes: [
          t4(
            "'-든지'는 〈선택: 무관〉이라 앞뒤가 이어지지 않는다.",
            "'-든지' 〈tanlov: farqsiz〉 ma'nosini bildiradi, mazmun bog'lanmaydi.",
            "'-든지' marks 〈choice: regardless〉, so the two parts do not connect.",
            "'-든지' выражает 〈выбор: безразлично〉, части не связываются.",
          ),
          t4(
            '앞의 행동을 하는 중에 뜻밖의 결과가 이어지므로 정답이다.',
            "Oldingi ish davomida kutilmagan natija kelgani uchun to'g'ri javob.",
            'Correct: an unexpected result follows while the first action is ongoing.',
            'Верно: неожиданный результат наступает во время первого действия.',
          ),
          t4(
            "'-(으)려면'은 〈가정: 의도〉라 뒤에 조건이나 필요가 와야 한다.",
            "'-(으)려면' 〈faraz: niyat〉 bo'lgani uchun keyin shart yoki zarurat kelishi kerak.",
            "'-(으)려면' marks 〈supposition: intention〉 and needs a condition or requirement after it.",
            "'-(으)려면' выражает 〈предположение: намерение〉 и требует условия после себя.",
          ),
          t4(
            "'-고서'는 앞 행동을 끝낸 뒤를 뜻해서 '지나쳤다'와 어울리지 않는다.",
            "'-고서' oldingi ishni tugatgandan keyingi holatni bildiradi, 'o'tib ketdi' bilan mos kelmaydi.",
            "'-고서' means after finishing the first action, which does not fit 'missed the stop'.",
            "'-고서' означает завершение первого действия и не подходит к «пропустил остановку».",
          ),
        ],
      },
    },
    {
      code: 'recipe-r0102-ex-02',
      number: 2,
      type: TopikQuestionType.GRAMMAR_FILL_BLANK,
      prompt: '한국 친구 덕분에 한국 문화를 많이 ___.',
      choices: [
        { text: '알게 되었다', correct: true },
        { text: '알도록 했다' },
        { text: '알아도 된다' },
        { text: '알아야 한다' },
      ],
      source: 'TOPIK II 60회 읽기 2번',
      difficulty: 3,
      solution: {
        strategy: t4(
          '한국 친구 덕분에\n→ 한국 문화를 많이 알다.',
          "Koreys do'st tufayli\n→ koreys madaniyatini ko'p bilish.",
          'Thanks to a Korean friend\n→ came to know Korean culture well.',
          'Благодаря корейскому другу\n→ узнать корейскую культуру.',
        ),
        explanation: t4(
          "앞의 내용인 '한국 친구 덕분에'는 〈이유: 긍정〉으로 긍정적인 이유와 결과를 나타낸다. 뒤의 내용은 결과이기 때문에 과거시제를 찾으면 되는데 과거시제는 ①번과 ②번이다. 이 중에서 '그 전에는 한국 문화를 잘 몰랐는데 한국 친구 덕분에 알았다'라는 의미를 완성하려면 〈설명: 변화〉의 '-게 되다'를 찾아야 한다.",
          "Oldingi qism '한국 친구 덕분에' 〈sabab: ijobiy〉 ma'nosida ijobiy sabab va natijani bildiradi. Keyingi qism natija bo'lgani uchun o'tgan zamonni topish kerak — bu ①va ②. Ular ichidan 'ilgari koreys madaniyatini bilmasdim, do'stim tufayli bilib oldim' ma'nosini to'ldirish uchun 〈tushuntirish: o'zgarish〉ni bildiruvchi '-게 되다' kerak.",
          "'한국 친구 덕분에' expresses a 〈positive reason〉 with its result. Since the second part is the result, look for past tense — options ① and ②. Between them, to complete the meaning 'I did not know Korean culture before, but thanks to a Korean friend I came to know it', you need '-게 되다', which marks 〈explanation: change〉.",
          "«한국 친구 덕분에» выражает 〈положительную причину〉 и результат. Вторая часть — результат, поэтому нужно прошедшее время: варианты ① и ②. Из них для смысла «раньше я не знал корейскую культуру, но благодаря другу узнал» подходит '-게 되다', выражающее 〈объяснение: изменение〉.",
        ),
        choiceNotes: [
          t4(
            '몰랐던 상태에서 알게 된 〈변화〉를 나타내므로 정답이다.',
            "Bilmaslikdan bilishga o'tgan 〈o'zgarish〉ni bildirgani uchun to'g'ri javob.",
            'Correct: it marks the 〈change〉 from not knowing to knowing.',
            'Верно: выражает 〈изменение〉 от незнания к знанию.',
          ),
          t4(
            "'-도록 하다'는 〈명령: 사동〉이라 남에게 시키는 뜻이 된다.",
            "'-도록 하다' 〈buyruq: orttirma〉 bo'lgani uchun boshqaga buyurish ma'nosi chiqadi.",
            "'-도록 하다' marks 〈command: causative〉, meaning you make someone else do it.",
            "'-도록 하다' выражает 〈побуждение: каузатив〉 — заставить кого-то сделать.",
          ),
          t4(
            "'-아/어도 되다'는 〈허락〉이라 결과를 설명하지 못한다.",
            "'-아/어도 되다' 〈ruxsat〉 bo'lgani uchun natijani tushuntirmaydi.",
            "'-아/어도 되다' marks 〈permission〉 and cannot express a result.",
            "'-아/어도 되다' выражает 〈разрешение〉 и не передаёт результат.",
          ),
          t4(
            "'-아/어야 하다'는 〈의무〉라 이유에 따른 결과와 맞지 않는다.",
            "'-아/어야 하다' 〈majburiyat〉 bo'lgani uchun sabab natijasiga mos kelmaydi.",
            "'-아/어야 하다' marks 〈obligation〉 and does not match a result following a reason.",
            "'-아/어야 하다' выражает 〈обязанность〉 и не подходит как результат причины.",
          ),
        ],
      },
    },
  ],

  practice: PRACTICE_READING_01_02,
};
