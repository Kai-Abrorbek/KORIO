import type { AppRelease, ReleaseItem, StoreChannel } from './app-release.types';

/**
 * 업데이트 히스토리 + 스토어 버전. 앱·텔레그램 미니앱이 GET /app/releases,
 * GET /app/version 으로 읽는다. 여기만 고치고 서버를 배포하면 앱 업데이트
 * 없이 바로 바뀐다.
 *
 * ── 새로 내보낼 때 ──
 *  1) APP_RELEASES 맨 위에 그날 항목 추가 (4개 언어, 유저가 느끼는 변화만)
 *  2) 스토어에 새 빌드를 올렸으면 그 항목에 storeVersion 을 적는다.
 *     스토어 최신 버전은 서버가 플레이 API 로 알아서 읽는다 (play-version.service.ts,
 *     "완전 공개" 된 릴리스만). STORE.android.latestVersion 은 플레이를 못 읽을 때의
 *     예비값이라 가끔 맞춰 두기만 하면 된다
 *  3) 옛 버전이 서버와 안 맞게 됐을 때만 minSupportedVersion 을 올린다 (강제 업데이트)
 *
 * 우즈벡어 따옴표는 ‘ (o‘, g‘) 와 ’ (ma’no) — ASCII ' 금지.
 */

const t = (
  tag: ReleaseItem['tag'],
  ko: string,
  uz: string,
  en: string,
  ru: string,
  only?: ReleaseItem['only'],
): ReleaseItem => ({ tag, text: { ko, uz, en, ru }, ...(only ? { only } : {}) });

export const STORE: { android: StoreChannel } = {
  android: {
    latestVersion: '1.2.400',
    minSupportedVersion: '1.2.400',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.kai_dev.mobile',
  },
};

export const APP_RELEASES: AppRelease[] = [
  {
    id: '2026-10-24',
    date: '2026-10-24',
    storeVersion: '1.2.400',
    items: [
      t(
        'new',
        '영어도 배울 수 있어요. 학습 로드·단어·문법·발음·게임에 AI 튜터까지 한국어와 똑같이 준비돼 있어요.',
        'Endi ingliz tilini ham o‘rganish mumkin: o‘quv yo‘li, so‘zlar, grammatika, talaffuz, o‘yinlar va AI ustoz — xuddi koreys tilidagidek.',
        'You can now learn English too: learning path, vocabulary, grammar, pronunciation, games and the AI tutor — just like Korean.',
        'Теперь можно учить и английский: учебный путь, слова, грамматика, произношение, игры и AI-репетитор — всё как в корейском.',
      ),
      t(
        'new',
        '오늘의 퀘스트와 월간 챌린지가 홈의 “퀘스트” 바로가기로 모였어요. 퀘스트 세 개를 끝내면 미스터리 상자가 열리고, 한 달 동안 모으면 그 달 배지를 받아요.',
        'Bugungi vazifalar va oylik challenj endi bosh sahifadagi «Vazifalar» tugmasida. Uchta vazifani bajarsangiz sirli sandiq ochiladi, oy davomida to‘plasangiz — o‘sha oy nishonini olasiz.',
        'Today’s quests and the monthly challenge now live under the “Quests” shortcut on Home. Finish three quests to open a mystery chest, and keep going all month to earn that month’s badge.',
        'Задания на день и челлендж месяца теперь в разделе «Задания» на главной. Выполните три задания — откроется сундук-сюрприз, а за месяц соберёте значок этого месяца.',
      ),
      t(
        'new',
        '캐릭터 꾸미기가 커졌어요. 연속 학습일로 자라는 펫, 서울 여행 배경, K팝·한국 전통 의상, 오라와 칭호, 내 캐릭터 텔레그램 스티커팩까지.',
        'Personajni bezash kengaydi: ketma-ket o‘qish kunlari bilan o‘sadigan uy hayvonlari, Seul sayohati fonlari, K-pop va koreys milliy liboslari, aura va unvonlar, hatto o‘z personajingizning Telegram stikerlar to‘plami.',
        'Much more to dress up your character: pets that grow with your streak, Seoul trip backgrounds, K-pop and traditional Korean outfits, auras and titles — even a Telegram sticker pack of your character.',
        'Больше способов украсить персонажа: питомцы, которые растут вместе с серией дней, фоны путешествия по Сеулу, K-pop и традиционные корейские наряды, ауры и титулы — и даже стикерпак вашего персонажа в Telegram.',
      ),
      t(
        'improve',
        '리그가 새로 바뀌었어요. 티어 무대와 시상대, 주간 결과 연출이 생겼고, 순위에서 이름을 누르면 프로필이 열려요.',
        'Liga yangilandi: daraja sahnasi, shohsupa va haftalik natijalar ko‘rinishi qo‘shildi, reytingda ismni bossangiz profil ochiladi.',
        'The league got a makeover: a tier stage, a podium and weekly result scenes, and tapping a name in the ranking opens that profile.',
        'Лига обновилась: сцена лиги, пьедестал и итоги недели, а нажатие на имя в рейтинге открывает профиль.',
      ),
      t(
        'improve',
        '연속 학습 3일마다 보상 상자를 받고, 새 단계가 열리면 로켓이 날아올라요.',
        'Ketma-ket o‘qishning har 3 kunida sovg‘a sandig‘i beriladi, yangi bosqich ochilganda esa raketa uchadi.',
        'Get a reward chest every 3 days of your streak, and watch a rocket launch when a new level unlocks.',
        'Каждые 3 дня серии — сундук с наградой, а при открытии нового уровня взлетает ракета.',
      ),
      t(
        'new',
        '앱 안에서 문의를 보내고 답장을 받을 수 있어요. 보석이 어디서 들어오고 나갔는지도 내역으로 볼 수 있어요.',
        'Ilova ichida murojaat yuborib, javobni shu yerda olasiz. Olmoslar qayerdan kelib, qayerga ketganini tarixda ko‘rish mumkin.',
        'Contact support right in the app and get the reply there. You can also see where your gems came from and where they went.',
        'Пишите в поддержку прямо в приложении и получайте ответ там же. А в истории видно, откуда пришли и куда ушли кристаллы.',
      ),
      t(
        'improve',
        '앱을 켤 때 새 업데이트를 먼저 받아서 최신 화면으로 시작해요.',
        'Ilova ochilganda avval yangilanish yuklab olinadi va eng so‘nggi ko‘rinishda boshlanadi.',
        'The app now fetches new updates when it opens, so you start on the latest version.',
        'При запуске приложение сначала загружает обновления, поэтому вы сразу видите последнюю версию.',
        'mobile',
      ),
      t(
        'fix',
        '안드로이드에서 말하기 연습 마이크가 켜지지 않던 문제를 고쳤어요.',
        'Androidda gapirish mashqida mikrofon yoqilmayotgan xato tuzatildi.',
        'Fixed the microphone not starting in speaking practice on Android.',
        'Исправлено: на Android в разговорной практике не включался микрофон.',
        'mobile',
      ),
    ],
  },
  {
    id: '2026-09-30',
    date: '2026-09-30',
    items: [
      t(
        'new',
        '소셜 계정도 이메일 인증으로 비밀번호를 만들 수 있어요. 비밀번호를 잊었을 때도 계정 화면에서 바로 새로 정해요.',
        'Ijtimoiy tarmoq hisobi uchun ham email orqali parol yaratish mumkin. Parolni unutsangiz, hisob sahifasida darhol yangisini o‘rnatasiz.',
        'Social accounts can now create a password after email verification. Forgot it? Set a new one right from the account screen.',
        'Теперь и для аккаунта через соцсеть можно создать пароль по коду из почты. Забыли пароль — задайте новый прямо в аккаунте.',
      ),
      t(
        'improve',
        '단어 조립 문제가 한 단어씩 나오고 문장이 짧아졌어요. 확인 버튼은 항상 화면 아래에 있어요.',
        'So‘z yig‘ish savollarida har bir kartochkada bitta so‘z, gaplar esa qisqaroq. Tekshirish tugmasi doim ekran pastida.',
        'Word-building questions now use one word per chip and shorter sentences. The check button always stays at the bottom.',
        'В заданиях на сборку фраз — одно слово на карточке и короче предложения. Кнопка проверки всегда внизу экрана.',
      ),
      t(
        'improve',
        '쓰기 문제에서 무엇을 써야 하는지 안내하고, 입력칸이 커졌어요.',
        'Yozish savollarida nima yozish kerakligi ko‘rsatiladi, kiritish maydoni kattalashdi.',
        'Typing questions now tell you exactly what to write, with a bigger input box.',
        'В письменных заданиях теперь подсказано, что писать, а поле ввода стало больше.',
      ),
      t(
        'improve',
        '텔레그램 상단 바가 사라지고 앱이 화면 전체를 써요.',
        'Telegram yuqori paneli olib tashlandi — ilova butun ekranni egallaydi.',
        'The Telegram top bar is gone — the app now uses the full screen.',
        'Верхняя панель Telegram убрана — приложение занимает весь экран.',
        'telegram',
      ),
    ],
  },
  {
    id: '2026-09-29',
    date: '2026-09-29',
    items: [
      t(
        'new',
        '새 AI 음성 튜터: 선생님과 실시간으로 대화하고, 끝나면 오늘 잘한 점과 고칠 점을 정리해 줘요.',
        'Yangi AI ovozli ustoz: ustoz bilan jonli suhbatlashing, oxirida yutuqlar va xatolar xulosasini olasiz.',
        'New AI voice tutor: talk live with your teacher and get a summary of what went well and what to fix.',
        'Новый голосовой AI-репетитор: живой разговор с учителем, а в конце — разбор успехов и ошибок.',
      ),
      t(
        'new',
        '이메일로 받은 코드로 인증해야 가입이 끝나요. 전화번호는 선택이에요.',
        'Ro‘yxatdan o‘tish emailga kelgan kod bilan tasdiqlanadi. Telefon raqami ixtiyoriy.',
        'Sign-up is now confirmed with a code sent to your email. Phone number is optional.',
        'Регистрация подтверждается кодом из письма. Номер телефона — по желанию.',
      ),
      t(
        'improve',
        'MAX 구독자는 프로필과 헤더에 MAX로 표시돼요.',
        'MAX obunachilari profil va sarlavhada MAX bilan ko‘rsatiladi.',
        'MAX subscribers now see MAX on their profile and header.',
        'У подписчиков MAX в профиле и шапке теперь отображается MAX.',
      ),
      t(
        'fix',
        '요금제를 바꿀 때 결제가 두 번 될 수 있던 문제를 고쳤어요.',
        'Tarifni almashtirganda to‘lov ikki marta yechilishi mumkin bo‘lgan xato tuzatildi.',
        'Fixed a case where changing plans could charge you twice.',
        'Исправлено: при смене тарифа оплата могла списаться дважды.',
      ),
    ],
  },
  {
    id: '2026-09-26',
    date: '2026-09-26',
    items: [
      t(
        'new',
        '한국어 화면으로 쓸 때 뜻·설명을 어떤 언어로 볼지 따로 고를 수 있어요.',
        'Ilova koreys tilida bo‘lsa, ma’no va izohlar tilini alohida tanlash mumkin.',
        'When the app is in Korean, you can pick a separate language for meanings and explanations.',
        'Если интерфейс на корейском, язык значений и объяснений можно выбрать отдельно.',
      ),
      t(
        'improve',
        '단어 카드 소리가 넘기자마자 바로 나와요.',
        'So‘z kartochkalari ovozi varaqlashingiz bilan darhol eshitiladi.',
        'Word card audio now plays the moment you swipe.',
        'Озвучка карточек слов звучит сразу при перелистывании.',
      ),
      t(
        'improve',
        '리그에 들어가면 내 순위로 바로 이동하고, 순위 카드가 새로 바뀌었어요.',
        'Ligaga kirganingizda o‘z o‘rningizga o‘tasiz, reyting kartochkasi yangilandi.',
        'Opening the league jumps straight to your row, and the rank card has a new look.',
        'В лиге экран сразу прокручивается к вашей строке, а карточка рейтинга обновлена.',
      ),
      t(
        'fix',
        '보상을 받은 뒤 보석 수가 바로 바뀌지 않던 문제를 고쳤어요.',
        'Mukofotdan keyin olmoslar soni darhol yangilanmayotgan xato tuzatildi.',
        'Fixed gems not updating right after a reward.',
        'Исправлено: после награды число кристаллов не обновлялось сразу.',
      ),
    ],
  },
  {
    id: '2026-09-20',
    date: '2026-09-20',
    items: [
      t(
        'improve',
        '처음 앱을 열면 기기 언어로 시작해요.',
        'Ilova birinchi marta ochilganda qurilma tilida boshlanadi.',
        'On first launch, the app starts in your device language.',
        'При первом запуске приложение открывается на языке устройства.',
      ),
      t(
        'new',
        'AI 튜터와 통화하기 전에 선생님 목소리를 미리 들어 보고 고를 수 있어요.',
        'AI ustoz bilan qo‘ng‘iroqdan oldin ustoz ovozini eshitib, tanlashingiz mumkin.',
        'Preview and choose your teacher’s voice before an AI tutor call.',
        'Перед звонком AI-репетитору можно прослушать и выбрать голос учителя.',
      ),
    ],
  },
  {
    id: '2026-09-14',
    date: '2026-09-14',
    items: [
      t(
        'new',
        '상점이 열렸어요. 모은 보석으로 프리미엄 기간을 살 수 있어요.',
        'Do‘kon ochildi: yig‘ilgan olmoslarga premium muddatini sotib olishingiz mumkin.',
        'The shop is open: spend your gems on premium time.',
        'Открылся магазин: кристаллы можно обменять на время премиума.',
      ),
      t(
        'new',
        '리그마다 챌린지 종목이 달라요.',
        'Har bir ligada musobaqa turi har xil.',
        'Each league now has its own challenge game.',
        'В каждой лиге теперь своё соревнование.',
      ),
      t(
        'new',
        '5섹션 단어가 추가됐어요.',
        '5-bo‘lim so‘zlari qo‘shildi.',
        'Section 5 vocabulary has been added.',
        'Добавлены слова 5-го раздела.',
      ),
      t(
        'improve',
        '말하기 연습도 XP·리그·연속 학습일에 반영돼요.',
        'Gapirish mashqlari ham XP, liga va ketma-ket kunlarga hisoblanadi.',
        'Speaking practice now counts toward XP, league and your streak.',
        'Разговорная практика теперь идёт в XP, лигу и серию дней.',
      ),
    ],
  },
  {
    id: '2026-09-11',
    date: '2026-09-11',
    items: [
      t(
        'new',
        '말하기 학습: 주제를 고르고, 듣고, 내 목소리로 따라 말해요. 말하는 만큼 글자가 채워져요.',
        'Gapirish mashqi: mavzuni tanlang, tinglang va takrorlang. Gapirganingiz sari harflar to‘ladi.',
        'Speaking practice: pick a topic, listen and repeat. The text fills in as you speak.',
        'Разговорная практика: выберите тему, слушайте и повторяйте — текст заполняется по мере речи.',
      ),
      t(
        'new',
        '노드를 끝내면 그 자리에서 보물 상자를 열어요.',
        'Bo‘limni tugatganingizda sovg‘a qutisi shu yerning o‘zida ochiladi.',
        'Finish a node and open the treasure chest right there.',
        'Завершили узел — открывайте сундук прямо на месте.',
      ),
      t(
        'fix',
        '단어 칩을 끌면 앱이 멈추던 문제를 고쳤어요.',
        'So‘z kartochkasini sudraganda ilova to‘xtab qolishi tuzatildi.',
        'Fixed the app freezing when dragging word chips.',
        'Исправлено зависание при перетаскивании карточек слов.',
      ),
    ],
  },
  {
    id: '2026-09-08',
    date: '2026-09-08',
    items: [
      t(
        'new',
        '처음 온 분께 홈 화면 기능을 하나씩 안내해 줘요.',
        'Yangi foydalanuvchilarga bosh sahifa imkoniyatlari birma-bir ko‘rsatiladi.',
        'New users get a quick tour of the home screen.',
        'Новичкам показываем возможности главного экрана по шагам.',
      ),
      t(
        'new',
        '통계에 스킬 레이더가 생겨 강점과 약점을 한눈에 봐요.',
        'Statistikada ko‘nikmalar radari paydo bo‘ldi — kuchli va zaif tomonlar bir qarashda.',
        'A skill radar in Stats shows your strengths and weak spots at a glance.',
        'В статистике появился радар навыков — сильные и слабые стороны сразу видны.',
      ),
      t(
        'improve',
        '친구가 지금 접속 중인지 보여요.',
        'Do‘stingiz hozir onlayn ekanini ko‘rasiz.',
        'See when your friends are online.',
        'Видно, кто из друзей сейчас онлайн.',
      ),
    ],
  },
  {
    id: '2026-09-04',
    date: '2026-09-04',
    items: [
      t(
        'new',
        '푸시 알림: 연속 학습이 끊기기 전이나 정해 둔 학습 시간에 알려 줘요.',
        'Bildirishnomalar: ketma-ket kunlar uzilishidan oldin yoki belgilangan o‘qish vaqtida eslatamiz.',
        'Push notifications remind you before a streak breaks or at your study time.',
        'Уведомления напомнят до того, как прервётся серия, или в выбранное время учёбы.',
        'mobile',
      ),
      t(
        'new',
        '친구를 초대하면 둘 다 보상을 받아요. 연락처로 친구도 찾을 수 있어요.',
        'Do‘stni taklif qilsangiz, ikkalangiz ham mukofot olasiz. Kontaktlar orqali do‘st topish ham mumkin.',
        'Invite a friend and you both get a reward. You can also find friends from your contacts.',
        'Пригласите друга — награду получите оба. Друзей можно найти и по контактам.',
      ),
    ],
  },
  {
    id: '2026-09-01',
    date: '2026-09-01',
    storeVersion: '1.2.400',
    items: [
      t(
        'new',
        'KORIO 출시! 로드맵 레슨, 한글, 게임, 리그, 읽기·듣기, AI 튜터를 한 앱에서 만나요.',
        'KORIO ishga tushdi! Yo‘l xaritasi darslari, hangul, o‘yinlar, liga, o‘qish-tinglash va AI ustoz — bitta ilovada.',
        'KORIO is live! Roadmap lessons, Hangul, games, leagues, reading & listening and an AI tutor — all in one app.',
        'KORIO запущен! Уроки по карте, хангыль, игры, лиги, чтение и аудирование и AI-репетитор — в одном приложении.',
      ),
      t(
        'new',
        'SUPER · MAX 두 가지 구독으로 에너지 걱정 없이 배우고 AI 튜터를 더 오래 써요.',
        'SUPER va MAX obunalari bilan energiya cheklovisiz o‘rganing va AI ustozdan ko‘proq foydalaning.',
        'SUPER and MAX plans: learn without energy limits and get more AI tutor time.',
        'Подписки SUPER и MAX: учитесь без ограничений энергии и дольше занимайтесь с AI-репетитором.',
      ),
    ],
  },
];
