import { PushType, type PushLang, DEFAULT_PUSH_LANG } from './push.types';

/**
 * 푸시 문구.
 *
 * 앱이 꺼져 있을 때 보내는 것이라 앱의 i18n 을 쓸 수 없다. 서버가 유저 언어
 * (user.appLanguage)를 보고 여기서 고른다.
 *
 * 변형이 여러 개인 타입은 **돌려쓴다**. 같은 문장이 매일 오면 그 순간부터
 * 알림은 배경 소음이 되고, 유저는 문장을 읽지 않고 스와이프한다.
 * 고르는 건 랜덤이 아니라 "며칠째인지" 로 정해서, 같은 날 같은 문장이
 * 두 번 뜨는 일이 없게 한다.
 */
export interface PushCopy {
  title: string;
  body: string;
}

type Table = Record<PushLang, PushCopy[]>;

const FOLLOW: Table = {
  ko: [{ title: '새 팔로워', body: '{{nickname}}님이 회원님을 팔로우했어요' }],
  uz: [{ title: 'Yangi obunachi', body: "{{nickname}} sizga obuna bo'ldi" }],
  en: [{ title: 'New follower', body: '{{nickname}} started following you' }],
  ru: [{ title: 'Новый подписчик', body: '{{nickname}} подписался на вас' }],
};

/** 유저가 직접 정해둔 학습 시간 */
const DAILY_REMINDER: Table = {
  ko: [
    { title: '학습 시간이에요 ⏰', body: '5분이면 오늘 목표 끝나요.' },
    {
      title: '한글몬이 기다리고 있어요',
      body: '오늘 한국어 5분, 지금이 딱 좋아요.',
    },
    { title: '잠깐만요', body: '레슨 하나면 오늘 치 끝. 진짜 하나만요.' },
    { title: '오늘도 5분 어때요?', body: '짧게 해도 매일이 이깁니다.' },
  ],
  uz: [
    { title: 'Dars vaqti ⏰', body: '5 daqiqada bugungi maqsad tugaydi.' },
    { title: 'Haneulmon kutyapti', body: 'Bugungi 5 daqiqa uchun ayni payt.' },
    {
      title: 'Bir daqiqa!',
      body: 'Bitta dars — bugungi ish tamom. Rostdan bittasi.',
    },
    {
      title: 'Bugun ham 5 daqiqa?',
      body: "Qisqa bo'lsa ham, har kuni qilgan yutadi.",
    },
  ],
  en: [
    { title: 'Time to study ⏰', body: 'Five minutes and today is done.' },
    {
      title: 'Haneulmon is waiting',
      body: 'Now is a good moment for your 5 minutes.',
    },
    {
      title: 'One second',
      body: 'One lesson finishes today. Really, just one.',
    },
    {
      title: 'Five minutes today?',
      body: 'Short still wins, as long as it is daily.',
    },
  ],
  ru: [
    {
      title: 'Время заниматься ⏰',
      body: 'Пять минут — и цель на сегодня закрыта.',
    },
    { title: 'Ханыльмон ждёт', body: 'Сейчас удачный момент для пяти минут.' },
    {
      title: 'Одну секунду',
      body: 'Один урок закрывает день. Правда, всего один.',
    },
    {
      title: 'Пять минут сегодня?',
      body: 'Коротко — но каждый день. Это и работает.',
    },
  ],
};

/**
 * 하루 두 번째 슬롯의 "재미있게 끌어당기는" 알림.
 * 죄책감 하나, 유머 하나 — 한쪽으로만 몰면 금방 질린다.
 */
const ENGAGE: Table = {
  ko: [
    { title: '한국어가 회원님을 찾고 있어요', body: '5분만 시간 내주실래요?' },
    { title: '한글몬이 삐졌어요 😤', body: '레슨 하나면 풀려요.' },
    { title: '오늘의 한국어 한 조각', body: '새 단어 5개, 3분이면 끝나요.' },
    {
      title: '지금 안 하면 내일의 내가 고생해요',
      body: '미래의 나를 도와줍시다.',
    },
    { title: '자막 없이 보고 싶었잖아요', body: '그럼 오늘 5분.' },
    { title: '우리 아직 친구 맞죠?', body: '며칠 못 봤어요. 5분이면 돼요.' },
    {
      title: '한국어는 안 도망가요',
      body: '근데 배운 건 도망가요. 복습 한 판?',
    },
  ],
  uz: [
    {
      title: 'Koreys tili sizni qidiryapti',
      body: "Bor-yo'g'i 5 daqiqa ajratasizmi?",
    },
    { title: "Haneulmon xafa bo'ldi 😤", body: 'Bitta dars — hammasi joyida.' },
    {
      title: "Bugungi bir bo'lak koreys tili",
      body: "5 ta yangi so'z, 3 daqiqa.",
    },
    {
      title: 'Bugun qilmasangiz, ertaga qiyin',
      body: "Ertangi o'zingizga yordam bering.",
    },
    { title: "Subtitrsiz ko'rmoqchi edingiz-ku", body: 'Unda bugun 5 daqiqa.' },
    {
      title: "Hali ham do'stmizmi?",
      body: "Bir necha kun ko'rinmadingiz. 5 daqiqa yetadi.",
    },
    {
      title: 'Koreys tili qochmaydi',
      body: 'Lekin yodlaganingiz qochadi. Takrorlaymizmi?',
    },
  ],
  en: [
    { title: 'Korean is looking for you', body: 'Can you spare five minutes?' },
    { title: 'Haneulmon is sulking 😤', body: 'One lesson fixes it.' },
    {
      title: 'A small piece of Korean today',
      body: 'Five new words, three minutes.',
    },
    { title: 'Skip today, pay tomorrow', body: 'Do future-you a favour.' },
    {
      title: 'You wanted to watch without subtitles',
      body: 'So: five minutes today.',
    },
    {
      title: 'Still friends, right?',
      body: "Haven't seen you in days. Five minutes is enough.",
    },
    {
      title: 'Korean will not run away',
      body: 'But what you learned will. One review round?',
    },
  ],
  ru: [
    { title: 'Корейский вас потерял', body: 'Найдётся пять минут?' },
    { title: 'Ханыльмон обиделся 😤', body: 'Один урок — и всё в порядке.' },
    {
      title: 'Немного корейского на сегодня',
      body: 'Пять новых слов, три минуты.',
    },
    {
      title: 'Пропустите сегодня — заплатите завтра',
      body: 'Помогите себе будущему.',
    },
    {
      title: 'Вы хотели смотреть без субтитров',
      body: 'Значит, сегодня пять минут.',
    },
    {
      title: 'Мы ещё друзья?',
      body: 'Вас не было пару дней. Хватит пяти минут.',
    },
    {
      title: 'Корейский никуда не денется',
      body: 'А вот выученное — да. Повторим?',
    },
  ],
};

/** 연속학습이 오늘 끊긴다. 가장 센 카드라 아껴 쓴다 */
const STREAK_RISK: Table = {
  ko: [
    {
      title: '🔥 {{streak}}일이 오늘 끊겨요',
      body: '레슨 하나면 지켜져요. 진짜 하나면 돼요.',
    },
    {
      title: '연속 {{streak}}일... 아깝잖아요',
      body: '지금 5분이면 살릴 수 있어요.',
    },
  ],
  uz: [
    {
      title: '🔥 {{streak}} kunlik seriya bugun uziladi',
      body: 'Bitta dars saqlab qoladi. Rostdan bittasi.',
    },
    {
      title: "{{streak}} kun... afsus bo'ladi",
      body: 'Hozir 5 daqiqa — va saqlanadi.',
    },
  ],
  en: [
    {
      title: '🔥 Your {{streak}}-day streak ends today',
      body: 'One lesson saves it. Just one.',
    },
    {
      title: '{{streak}} days... do not waste it',
      body: 'Five minutes right now keeps it alive.',
    },
  ],
  ru: [
    {
      title: '🔥 Серия из {{streak}} дней сегодня прервётся',
      body: 'Один урок спасёт её. Всего один.',
    },
    {
      title: '{{streak}} дней... жалко же',
      body: 'Пять минут сейчас — и серия жива.',
    },
  ],
};

/** 학습 로드(guided)를 타던 사람이 며칠째 안 옴 */
const GUIDED_IDLE: Table = {
  ko: [
    {
      title: '{{days}}일째 안 오셨어요',
      body: '학습 로드가 그 자리에 그대로 있어요. 이어서 갈까요?',
    },
    {
      title: '한글몬이 {{days}}일 기다렸어요',
      body: '다음 유닛이 아직 안 열렸어요. 오늘 열어볼까요?',
    },
    {
      title: '{{days}}일 쉬었으면 충분해요',
      body: '가볍게 한 판만 하고 가요.',
    },
  ],
  uz: [
    {
      title: "{{days}} kundan beri ko'rinmadingiz",
      body: "Ta'lim yo'lingiz joyida turibdi. Davom etamizmi?",
    },
    {
      title: 'Haneulmon {{days}} kun kutdi',
      body: "Keyingi bo'lim hali ochilmadi. Bugun ochamizmi?",
    },
    {
      title: '{{days}} kun dam yetarli',
      body: 'Yengilgina bitta darsdan boshlaymiz.',
    },
  ],
  en: [
    {
      title: 'It has been {{days}} days',
      body: 'Your study path is exactly where you left it. Continue?',
    },
    {
      title: 'Haneulmon waited {{days}} days',
      body: 'The next unit is still locked. Open it today?',
    },
    {
      title: '{{days}} days off is plenty',
      body: 'Come back with one easy round.',
    },
  ],
  ru: [
    {
      title: 'Вас не было {{days}} дня',
      body: 'Ваш маршрут ждёт ровно там, где вы остановились. Продолжим?',
    },
    {
      title: 'Ханыльмон ждал {{days}} дня',
      body: 'Следующий юнит всё ещё закрыт. Откроем сегодня?',
    },
    {
      title: '{{days}} дня перерыва — достаточно',
      body: 'Вернитесь одним лёгким раундом.',
    },
  ],
};

/** 체험·구독 종료 임박. 돈이 걸린 안내라 장난기 없이 담백하게 */
const TRIAL_ENDING: Table = {
  ko: [
    {
      title: 'SUPER 체험이 {{days}}일 남았어요',
      body: '무한 에너지와 무제한 복습을 계속 쓰려면 요금제를 골라주세요.',
    },
  ],
  uz: [
    {
      title: 'SUPER sinovingizga {{days}} kun qoldi',
      body: 'Cheksiz energiya va takrorlashni davom ettirish uchun tarifni tanlang.',
    },
  ],
  en: [
    {
      title: '{{days}} days left of your SUPER trial',
      body: 'Pick a plan to keep unlimited energy and unlimited review.',
    },
  ],
  ru: [
    {
      title: 'До конца пробного SUPER — {{days}} дня',
      body: 'Выберите тариф, чтобы сохранить безлимитную энергию и повторение.',
    },
  ],
};

const LEAGUE_PROMOTED: Table = {
  ko: [
    {
      title: '승급했어요! 🎉',
      body: '보석 {{gems}}개를 받았어요. 다음 리그에서 만나요.',
    },
  ],
  uz: [
    {
      title: 'Yuqori ligaga chiqdingiz! 🎉',
      body: "{{gems}} ta gavhar oldingiz. Yangi ligada ko'rishguncha.",
    },
  ],
  en: [
    {
      title: 'You moved up! 🎉',
      body: 'You earned {{gems}} gems. See you in the next league.',
    },
  ],
  ru: [
    {
      title: 'Вы поднялись! 🎉',
      body: 'Вы получили {{gems}} самоцветов. До встречи в новой лиге.',
    },
  ],
};

const LEAGUE_DEMOTED: Table = {
  ko: [
    {
      title: '리그가 한 단계 내려갔어요',
      body: '이번 주에 다시 올라가요. 지금 시작하면 충분해요.',
    },
  ],
  uz: [
    {
      title: 'Bir liga pastga tushdingiz',
      body: 'Shu hafta qaytib chiqamiz. Hozir boshlasangiz yetadi.',
    },
  ],
  en: [
    {
      title: 'You dropped a league',
      body: 'Climb back this week. Starting now is enough.',
    },
  ],
  ru: [
    {
      title: 'Вы опустились на лигу',
      body: 'На этой неделе вернёмся. Начать сейчас — уже достаточно.',
    },
  ],
};

const LEAGUE_RESULT: Table = {
  ko: [
    {
      title: '이번 주 리그 {{rank}}위',
      body: '보석 {{gems}}개를 받았어요. 새 주가 시작됐어요.',
    },
  ],
  uz: [
    {
      title: "Shu haftalik liga: {{rank}}-o'rin",
      body: '{{gems}} ta gavhar oldingiz. Yangi hafta boshlandi.',
    },
  ],
  en: [
    {
      title: 'Rank {{rank}} this week',
      body: 'You earned {{gems}} gems. A new week has started.',
    },
  ],
  ru: [
    {
      title: '{{rank}}-е место на этой неделе',
      body: 'Вы получили {{gems}} самоцветов. Началась новая неделя.',
    },
  ],
};

const ENERGY_FULL: Table = {
  ko: [{ title: '에너지가 가득 찼어요 ⚡', body: '다시 학습할 수 있어요.' }],
  uz: [
    {
      title: "Energiya to'ldi ⚡",
      body: "Yana o'qishni davom ettirsangiz bo'ladi.",
    },
  ],
  en: [{ title: 'Energy is full ⚡', body: 'You can keep learning now.' }],
  ru: [
    { title: 'Энергия восстановлена ⚡', body: 'Можно продолжать учиться.' },
  ],
};

/** ANNOUNCEMENT 는 어드민이 문구를 직접 넘긴다 — 여기 표에 없다 */
const TABLES: Partial<Record<PushType, Table>> = {
  [PushType.FOLLOW]: FOLLOW,
  [PushType.DAILY_REMINDER]: DAILY_REMINDER,
  [PushType.ENGAGE]: ENGAGE,
  [PushType.STREAK_RISK]: STREAK_RISK,
  [PushType.GUIDED_IDLE]: GUIDED_IDLE,
  [PushType.TRIAL_ENDING]: TRIAL_ENDING,
  [PushType.LEAGUE_PROMOTED]: LEAGUE_PROMOTED,
  [PushType.LEAGUE_DEMOTED]: LEAGUE_DEMOTED,
  [PushType.LEAGUE_RESULT]: LEAGUE_RESULT,
  [PushType.ENERGY_FULL]: ENERGY_FULL,
};

/** {{key}} 를 params 값으로 바꾼다. 값이 없으면 자리표시자를 지운다 */
function interpolate(text: string, params: Record<string, any>): string {
  return text
    .replace(/\{\{(\w+)\}\}/g, (_, key) => String(params[key] ?? ''))
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/**
 * 문구 한 건을 고른다.
 *
 * @param rotation 변형을 고르는 값. 같은 날 같은 문장이 반복되지 않게
 *                 날짜에서 유도한 수를 넘긴다 (랜덤이면 두 번 연속 같은 게 나온다).
 */
export function buildCopy(
  type: PushType,
  lang: PushLang,
  params: Record<string, any> = {},
  rotation = 0,
): PushCopy | null {
  const table = TABLES[type];
  if (!table) return null;

  const variants = table[lang]?.length ? table[lang] : table[DEFAULT_PUSH_LANG];
  if (!variants?.length) return null;

  const picked = variants[Math.abs(rotation) % variants.length];
  return {
    title: interpolate(picked.title, params),
    body: interpolate(picked.body, params),
  };
}
