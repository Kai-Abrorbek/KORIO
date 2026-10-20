import { courseOf, type LearnCourse } from '../users/learn-mode.constants';
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

/**
 * 복귀 알림 — 오늘 아직 공부 안 한 사람을 부르는 문구 전부
 * (학습 시간 알림 · 재미 유도 · 학습 로드 재촉이 같은 문구를 쓴다).
 *
 * 쉰 날짜에 따라 단계가 바뀐다. 어제 하고 오늘 안 한 사람에게 "아직 계신가요? 💀"
 * 를 보내면 오버고, 2주째 안 온 사람에게 "3분이면 충분해요" 는 안 먹힌다.
 *
 *   1일      가볍게      (하루 2번)
 *   2~3일    조르기      (하루 2번)
 *   4~6일    서운함      (하루 2번)
 *   7일      🔇 "효과가 없는 것 같군요" → 이날부터 정말로 하루 1번
 *   8~13일   드라마      (하루 1번)
 *   14일     "그만 할게요!!!"        → 이날부터 정말로 주 1번
 *   21일~    주 1번
 *
 * 문구가 한 말(하루 한 번만 / 일주일에 한 번만)은 스케줄러가 그대로 지킨다
 * — COMEBACK_CADENCE 를 같이 본다. 말만 하고 계속 보내면 그건 스팸이다.
 *
 * 같은 단계 안에서는 정해둔 순서대로 한 줄씩 넘어간다 (같은 날 두 슬롯이
 * 같은 문장이 되거나, 어제 저녁 문장이 오늘 낮에 또 오는 일이 없게).
 */
export const COMEBACK_CADENCE = {
  /** 이만큼 쉬면 하루 1번 (본인이 정한 시각에만) */
  ONCE_A_DAY_FROM: 7,
  /** 이만큼 쉬면 주 1번 (14, 21, 28… 일째) */
  WEEKLY_FROM: 14,
} as const;

type LineId =
  | 'restart'
  | 'charming'
  | 'hello'
  | 'beg'
  | 'pleaseName'
  | 'allergy'
  | 'tooFar'
  | 'stillThere'
  | 'hiKorio'
  | 'muted'
  | 'aging'
  | 'stop'
  | 'goodbye';

interface ComebackLine {
  copy: Record<PushLang, PushCopy>;
  /** 이 값이 없으면 이 줄은 건너뛴다 ("제발 부탁이에요, 님 🙏" 이 되면 안 된다) */
  needs?: string[];
  /** 한 번이라도 공부한 사람에게만 ("다시 시작하세요") */
  returning?: boolean;
}

/**
 * {{subject}} = 배우는 말 (한국어 / 영어). 코스가 늘면 여기에 한 줄 추가.
 * 러시아어는 격이 달라서 여격({{subjectDat}})을 따로 둔다.
 */
const SUBJECT: Record<
  PushLang,
  Record<LearnCourse, { subject: string; subjectDat: string }>
> = {
  ko: {
    ko: { subject: '한국어', subjectDat: '한국어' },
    en: { subject: '영어', subjectDat: '영어' },
  },
  uz: {
    ko: { subject: 'koreys tili', subjectDat: 'koreys tiliga' },
    en: { subject: 'ingliz tili', subjectDat: 'ingliz tiliga' },
  },
  en: {
    ko: { subject: 'Korean', subjectDat: 'Korean' },
    en: { subject: 'English', subjectDat: 'English' },
  },
  ru: {
    ko: { subject: 'корейский', subjectDat: 'корейскому' },
    en: { subject: 'английский', subjectDat: 'английскому' },
  },
};

const LINES: Record<LineId, ComebackLine> = {
  restart: {
    returning: true,
    copy: {
      ko: {
        title: '짧은 레슨으로 오늘 {{subject}} 학습을 다시 시작하세요!',
        body: '3분이면 충분해요 ⏱',
      },
      uz: {
        title: 'Bugun {{subject}}ni qisqa darsdan qayta boshlang!',
        body: '3 daqiqa kifoya ⏱',
      },
      en: {
        title: 'Restart your {{subject}} today with one quick lesson!',
        body: 'Three minutes is all it takes ⏱',
      },
      ru: {
        title: 'Вернитесь к {{subjectDat}} сегодня — с короткого урока!',
        body: 'Хватит трёх минут ⏱',
      },
    },
  },
  charming: {
    copy: {
      ko: {
        title: 'KORIO는 매력적인 학습자를 기다리고 있어요... 🌹',
        body: '혹시 그게 당신인가요? 👀',
      },
      uz: {
        title: "KORIO jozibali o'quvchini kutyapti... 🌹",
        body: 'Balki u — sizdirsiz? 👀',
      },
      en: {
        title: 'KORIO is waiting for a charming learner... 🌹',
        body: 'Could it be you? 👀',
      },
      ru: {
        title: 'KORIO ждёт обаятельного ученика... 🌹',
        body: 'Может, это вы? 👀',
      },
    },
  },
  hello: {
    copy: {
      ko: {
        title: '여보세요? 지금 켜져 있는 거죠?',
        body: '들리시면 레슨 하나로 대답해 주세요 📞',
      },
      uz: {
        title: 'Allo? Eshitilyaptimi?',
        body: 'Eshitsangiz, bitta dars bilan javob bering 📞',
      },
      en: {
        title: 'Hello? Is this thing on?',
        body: 'If you can hear me, answer with one lesson 📞',
      },
      ru: {
        title: 'Алло? Меня слышно?',
        body: 'Если слышно — ответьте одним уроком 📞',
      },
    },
  },
  beg: {
    copy: {
      ko: {
        title: '간절히 부탁할게요 🙏',
        body: '레슨 딱 하나만요. 3분이면 끝나요.',
      },
      uz: {
        title: 'Yolvoraman 🙏',
        body: 'Bitta dars, xolos. 3 daqiqada tugaydi.',
      },
      en: {
        title: "I'm begging you 🙏",
        body: 'Just one lesson. Three minutes, tops.',
      },
      ru: {
        title: 'Умоляю 🙏',
        body: 'Всего один урок. Три минуты — и готово.',
      },
    },
  },
  pleaseName: {
    needs: ['nickname'],
    copy: {
      ko: {
        title: '제발 부탁이에요, {{nickname}}님 🙏',
        body: '안 계시니까 KORIO가 너무 조용해요.',
      },
      uz: {
        title: '{{nickname}} jon, iltimos 🙏',
        body: "Sizsiz KORIO'da juda jimjit.",
      },
      en: {
        title: 'Pretty please, {{nickname}} 🙏',
        body: "It's way too quiet here without you.",
      },
      ru: {
        title: 'Ну пожалуйста, {{nickname}} 🙏',
        body: 'Без вас в KORIO слишком тихо.',
      },
    },
  },
  allergy: {
    copy: {
      ko: {
        title: '🥹 속상해서 그런 건 아니에요! 그냥 알레르기 때문이에요...',
        body: '레슨 하나 하시면 금방 나을 것 같은데요… 🤧',
      },
      uz: {
        title: "🥹 Yig'layotganim yo'q! Shunchaki allergiya...",
        body: 'Bitta dars qilsangiz, tezda tuzalib qolardim shekilli… 🤧',
      },
      en: {
        title: "🥹 I'm not upset! It's just allergies...",
        body: "One lesson from you and I'd feel better… 🤧",
      },
      ru: {
        title: '🥹 Это не слёзы! Просто аллергия...',
        body: 'Один ваш урок — и сразу полегчает… 🤧',
      },
    },
  },
  tooFar: {
    copy: {
      ko: {
        title: '제가 너무 심하게 했나요? 🫠',
        body: '알림이 좀 많았죠… 짧은 레슨 하나로 화해해요.',
      },
      uz: {
        title: 'Haddan oshirib yubordimmi? 🫠',
        body: "Eslatmalar ko'payib ketdi-a… Bitta qisqa dars bilan yarashaylik.",
      },
      en: {
        title: 'Did I go too far? 🫠',
        body: "Too many reminders, I know… Let's make up with one short lesson.",
      },
      ru: {
        title: 'Это было слишком? 🫠',
        body: 'Многовато напоминаний, понимаю… Помиримся коротким уроком?',
      },
    },
  },
  stillThere: {
    copy: {
      ko: {
        title: '아직 계신가요? 💀',
        body: '레슨 하나로 생존 신고 부탁해요 🙋',
      },
      uz: {
        title: 'Hali shu yerdamisiz? 💀',
        body: 'Tirikligingizni bildiring — bitta dars yetadi 🙋',
      },
      en: {
        title: 'Are you still there? 💀',
        body: 'Send a sign of life — one lesson will do 🙋',
      },
      ru: {
        title: 'Вы ещё здесь? 💀',
        body: 'Подайте признаки жизни — хватит одного урока 🙋',
      },
    },
  },
  hiKorio: {
    copy: {
      ko: {
        title: '안녕, KORIO예요.',
        body: '아직도 {{subject}}를 배우고 싶으신가요? 🥺',
      },
      uz: {
        title: 'Salom, bu KORIO.',
        body: "Hali ham {{subject}}ni o'rganmoqchimisiz? 🥺",
      },
      en: {
        title: "Hi, it's KORIO.",
        body: 'Do you still want to learn {{subject}}? 🥺',
      },
      ru: {
        title: 'Привет, это KORIO.',
        body: 'Вы всё ещё хотите выучить {{subject}}? 🥺',
      },
    },
  },
  muted: {
    copy: {
      ko: {
        title: '🔇 학습 알림이 효과가 없는 것 같군요',
        body: '당분간은 하루에 한 번만 보낼게요.',
      },
      uz: {
        title: '🔇 Eslatmalar ish bermayapti shekilli',
        body: 'Hozircha kuniga faqat bir marta yozaman.',
      },
      en: {
        title: "🔇 These reminders don't seem to be working",
        body: "I'll only send one a day for now.",
      },
      ru: {
        title: '🔇 Кажется, напоминания не работают',
        body: 'Пока буду писать только раз в день.',
      },
    },
  },
  aging: {
    copy: {
      ko: {
        title: 'KORIO가 늙어가고 있어요... 🫠',
        body: '기다리다 흰머리가 났어요 👵 더 늙기 전에 와 주세요.',
      },
      uz: {
        title: 'KORIO qarib qolyapti... 🫠',
        body: "Kutaverib sochimga oq tushdi 👵 Kech bo'lmasdan qayting.",
      },
      en: {
        title: 'KORIO is getting old... 🫠',
        body: 'Waiting gave me grey hair 👵 Come back before it gets worse.',
      },
      ru: {
        title: 'KORIO стареет... 🫠',
        body: 'От ожидания уже седина 👵 Возвращайтесь, пока не поздно.',
      },
    },
  },
  stop: {
    copy: {
      ko: {
        title: '그만 할게요!!!',
        body: '이제 일주일에 한 번만 올게요. 진짜예요. 😤',
      },
      uz: {
        title: "Bo'ldi, bas qilaman!!!",
        body: 'Endi haftada bir martagina yozaman. Rostdan. 😤',
      },
      en: {
        title: "Fine, I'll stop!!!",
        body: 'Only once a week from now on. I mean it. 😤',
      },
      ru: {
        title: 'Всё, больше не буду!!!',
        body: 'Теперь только раз в неделю. Честно. 😤',
      },
    },
  },
  goodbye: {
    copy: {
      ko: {
        title: '이대로 안녕은 아니지만… 😔',
        body: '언제 돌아와도 여기 그대로 있을게요.',
      },
      uz: {
        title: 'Bu xayrlashuv emas, lekin… 😔',
        body: 'Qachon qaytsangiz ham, shu yerda kutaman.',
      },
      en: {
        title: "This isn't goodbye, but… 😔",
        body: "Whenever you come back, I'll be right here.",
      },
      ru: {
        title: 'Это не прощание, но… 😔',
        body: 'Когда бы вы ни вернулись — я буду здесь.',
      },
    },
  },
};

/**
 * 단계표. from = 이 단계가 시작되는 쉰 날수. lines 순서대로 한 줄씩 넘어간다.
 * 하루 2번인 단계는 (낮, 저녁) 한 쌍씩, 하루 1번은 하루 한 줄, 주 1번은 주마다 한 줄.
 */
const STAGES: { from: number; lines: LineId[] }[] = [
  { from: 1, lines: ['restart', 'charming', 'hello'] },
  { from: 2, lines: ['beg', 'hello', 'pleaseName', 'allergy'] },
  {
    from: 4,
    lines: ['tooFar', 'stillThere', 'hiKorio', 'aging', 'charming', 'hello'],
  },
  { from: COMEBACK_CADENCE.ONCE_A_DAY_FROM, lines: ['muted'] },
  {
    from: COMEBACK_CADENCE.ONCE_A_DAY_FROM + 1,
    lines: [
      'allergy',
      'pleaseName',
      'beg',
      'stillThere',
      'tooFar',
      'hiKorio',
      'aging',
    ],
  },
  { from: COMEBACK_CADENCE.WEEKLY_FROM, lines: ['stop'] },
  {
    from: COMEBACK_CADENCE.WEEKLY_FROM + 7,
    lines: ['goodbye', 'aging', 'hiKorio', 'charming', 'stillThere'],
  },
];

/**
 * 몇 번째 줄인지. 같은 단계 안에서만 센다.
 * slot = 그날 첫 슬롯 0 / 두 번째 1 (하루 1번 이하인 단계는 항상 0).
 */
export function comebackStep(idleDays: number, slot: 0 | 1 = 0): number {
  const stage = stageOf(idleDays);
  const into = Math.max(0, idleDays - stage.from);
  if (stage.from >= COMEBACK_CADENCE.WEEKLY_FROM) return Math.floor(into / 7);
  if (stage.from >= COMEBACK_CADENCE.ONCE_A_DAY_FROM) return into;
  return into * 2 + slot;
}

function stageOf(idleDays: number) {
  let found = STAGES[0];
  for (const s of STAGES) if (idleDays >= s.from) found = s;
  return found;
}

function hasValue(v: unknown) {
  if (typeof v === 'string') return v.trim() !== '';
  return typeof v === 'number' && Number.isFinite(v);
}

/**
 * 이 사람에게 맞는 줄을 고른다.
 * params.idleDays 가 없으면(테스트 발송) 단계 없이 전체에서 rotation 으로 돌린다.
 */
function pickComeback(
  params: Record<string, any>,
  rotation: number,
): ComebackLine {
  const usable = (id: LineId) => {
    const line = LINES[id];
    if (line.needs?.some((k) => !hasValue(params[k]))) return false;
    if (line.returning && params.studiedBefore === false) return false;
    return true;
  };
  const idle = Number(params.idleDays);
  const ids = Number.isFinite(idle)
    ? stageOf(idle).lines
    : (Object.keys(LINES) as LineId[]);
  const pool = ids.filter(usable);
  const list = pool.length ? pool : (['charming'] as LineId[]);
  return LINES[list[Math.abs(rotation) % list.length]];
}

/** 연속학습이 오늘 끊긴다 (복구펜까지 쳐서 오늘이 마지막 기회) */
const STREAK_RISK: Table = {
  ko: [
    {
      title: '🔥 {{streak}}일 연속 학습 기록을 잃지 마세요!',
      body: '오늘 레슨 하나면 지켜져요.',
    },
  ],
  uz: [
    {
      title: "🔥 {{streak}} kunlik seriyangizni yo'qotmang!",
      body: 'Bugun bitta dars — va seriya saqlanadi.',
    },
  ],
  en: [
    {
      title: "🔥 Don't lose your {{streak}}-day streak!",
      body: 'One lesson today keeps it alive.',
    },
  ],
  ru: [
    {
      title: '🔥 Не потеряйте серию в {{streak|день|дня|дней}}!',
      body: 'Один урок сегодня — и серия жива.',
    },
  ],
};

/** 어제가 마지막 기회였다 — 끊긴 다음 날 한 번 */
const STREAK_LOST: Table = {
  ko: [
    {
      title: '어제 {{streak}}일 연속 학습이 잠시 멈췄습니다',
      body: '오늘은 잊지 말고 연습을 이어가세요! 🔥',
    },
  ],
  uz: [
    {
      title: "Kecha {{streak}} kunlik seriyangiz to'xtab qoldi",
      body: 'Bugun unutmang — mashqni davom ettiring! 🔥',
    },
  ],
  en: [
    {
      title: 'Your {{streak}}-day streak paused yesterday',
      body: "Don't forget today — keep your practice going! 🔥",
    },
  ],
  ru: [
    {
      title: 'Вчера ваша серия в {{streak|день|дня|дней}} приостановилась',
      body: 'Сегодня не забудьте — продолжим практику! 🔥',
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

const REFERRAL_JOINED: Table = {
  ko: [
    {
      title: '{{nickname}}님이 초대를 수락했어요 🎉',
      body: '보석 {{gems}}개가 들어왔어요. 지금 확인해 보세요.',
    },
  ],
  uz: [
    {
      title: '{{nickname}} taklifingizni qabul qildi 🎉',
      body: "{{gems}} ta gavhar hisobingizga tushdi. Hozir ko'ring.",
    },
  ],
  en: [
    {
      title: '{{nickname}} joined with your code 🎉',
      body: 'You earned {{gems}} gems. Take a look.',
    },
  ],
  ru: [
    {
      title: '{{nickname}} присоединился по вашему коду 🎉',
      body: 'Вы получили {{gems}} самоцветов. Загляните.',
    },
  ],
};

const GEM_PAYOUT_DONE: Table = {
  ko: [
    {
      title: '보석 출금 완료 💸',
      body: "{{amount}} so'm 을 •••• {{last4}} 카드로 보냈어요.",
    },
  ],
  uz: [
    {
      title: 'Gavhar yechish bajarildi 💸',
      body: "{{amount}} so'm •••• {{last4}} kartaga yuborildi.",
    },
  ],
  en: [
    {
      title: 'Gem withdrawal sent 💸',
      body: "We sent {{amount}} so'm to the card •••• {{last4}}.",
    },
  ],
  ru: [
    {
      title: 'Вывод самоцветов выполнен 💸',
      body: 'Мы отправили {{amount}} сум на карту •••• {{last4}}.',
    },
  ],
};

const GEM_PAYOUT_REJECTED: Table = {
  ko: [
    {
      title: '보석 출금 신청이 반려됐어요',
      body: '보석 {{gems}}개는 돌려드렸어요. 상점에서 사유를 확인해 주세요.',
    },
  ],
  uz: [
    {
      title: "Gavhar yechish so'rovi rad etildi",
      body: "{{gems}} ta gavhar qaytarildi. Sababini do'konda ko'ring.",
    },
  ],
  en: [
    {
      title: 'Gem withdrawal declined',
      body: 'Your {{gems}} gems were returned. See the reason in the shop.',
    },
  ],
  ru: [
    {
      title: 'Вывод самоцветов отклонён',
      body: '{{gems}} самоцветов вернули. Причину смотрите в магазине.',
    },
  ],
};

const SUPPORT_REPLY: Table = {
  ko: [
    {
      title: '문의에 답변이 왔어요 💬',
      body: '「{{subject}}」 — 눌러서 답변을 확인해 보세요.',
    },
  ],
  uz: [
    {
      title: 'Murojaatingizga javob keldi 💬',
      body: "«{{subject}}» — javobni ko'rish uchun bosing.",
    },
  ],
  en: [
    {
      title: 'Support replied to you 💬',
      body: '"{{subject}}" — tap to read the reply.',
    },
  ],
  ru: [
    {
      title: 'Поддержка ответила 💬',
      body: '«{{subject}}» — нажмите, чтобы прочитать ответ.',
    },
  ],
};

/** 복귀 알림 — 표 대신 쉰 날짜로 단계를 골라 LINES 에서 꺼낸다 */
const COMEBACK_TYPES: ReadonlySet<PushType> = new Set([
  PushType.DAILY_REMINDER,
  PushType.ENGAGE,
  PushType.GUIDED_IDLE,
]);

/** ANNOUNCEMENT 는 어드민이 문구를 직접 넘긴다 — 여기 표에 없다 */
const TABLES: Partial<Record<PushType, Table>> = {
  [PushType.FOLLOW]: FOLLOW,
  [PushType.STREAK_RISK]: STREAK_RISK,
  [PushType.STREAK_LOST]: STREAK_LOST,
  [PushType.TRIAL_ENDING]: TRIAL_ENDING,
  [PushType.LEAGUE_PROMOTED]: LEAGUE_PROMOTED,
  [PushType.LEAGUE_DEMOTED]: LEAGUE_DEMOTED,
  [PushType.LEAGUE_RESULT]: LEAGUE_RESULT,
  [PushType.ENERGY_FULL]: ENERGY_FULL,
  [PushType.REFERRAL_JOINED]: REFERRAL_JOINED,
  [PushType.GEM_PAYOUT_DONE]: GEM_PAYOUT_DONE,
  [PushType.GEM_PAYOUT_REJECTED]: GEM_PAYOUT_REJECTED,
  [PushType.SUPPORT_REPLY]: SUPPORT_REPLY,
};

/** 러시아어 수 일치: 1 день · 2 дня · 5 дней · 21 день · 11 дней */
function ruPlural(n: number, one: string, few: string, many: string) {
  const a = Math.abs(n) % 100;
  const b = a % 10;
  if (a > 10 && a < 20) return many;
  if (b === 1) return one;
  if (b >= 2 && b <= 4) return few;
  return many;
}

/**
 * {{key}} 를 params 값으로 바꾼다. 값이 없으면 자리표시자를 지운다.
 * {{key|день|дня|дней}} 는 "값 + 수에 맞는 꼴" (러시아어 문구용).
 */
function interpolate(text: string, params: Record<string, any>): string {
  return text
    .replace(
      /\{\{(\w+)((?:\|[^|}]*){3})?\}\}/g,
      (_: string, key: string, forms: string | undefined) => {
        const value: unknown = params[key];
        if (!forms) {
          return typeof value === 'string' || typeof value === 'number'
            ? String(value)
            : '';
        }
        const n = Number(value);
        if (!Number.isFinite(n)) return '';
        const [one, few, many] = forms.slice(1).split('|');
        return `${n} ${ruPlural(n, one, few, many)}`;
      },
    )
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/**
 * 문구 한 건을 고른다.
 *
 * @param rotation 변형을 고르는 값. 복귀 알림은 쉰 날짜 단계 안에서 몇 번째 줄인지
 *                 (comebackStep), 나머지는 변형 번호. 랜덤이면 두 번 연속 같은 게 나온다.
 *                 복귀 알림에 params.idleDays 가 없으면(테스트 발송) 전체에서 돌린다.
 */
export function buildCopy(
  type: PushType,
  lang: PushLang,
  params: Record<string, any> = {},
  rotation = 0,
): PushCopy | null {
  if (COMEBACK_TYPES.has(type)) {
    const line = pickComeback(params, rotation);
    const picked = line.copy[lang] ?? line.copy[DEFAULT_PUSH_LANG];
    const filled = {
      ...SUBJECT[lang][courseOf(String(params.targetLanguage ?? ''))],
      ...params,
    };
    return {
      title: interpolate(picked.title, filled),
      body: interpolate(picked.body, filled),
    };
  }

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
