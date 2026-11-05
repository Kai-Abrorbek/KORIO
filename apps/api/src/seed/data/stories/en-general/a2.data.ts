import type { StorySeed } from '../../../../stories/story-content.util';

/** 영어 듣기 이야기 A2. 규칙은 a1.data.ts 맨 위 주석 참고 */
export const EN_GENERAL_A2: StorySeed[] = [
  {
    code: 'en-story-a2-01',
    level: 'A2',
    order: 1,
    title: 'Friday Plov',
    topic: { uz: 'Juma oshi', ru: 'Пятничный плов', ko: '금요일의 플롭' },
    scene: 'sunset',
    narrator: { id: 'aziz', name: 'Aziz' },
    sentences: [
      {
        id: 's1',
        text: 'In our neighbourhood, Friday is a special day.',
        translation: {
          uz: 'Bizning mahallamizda juma — alohida kun.',
          ru: 'В нашей махалле пятница — особенный день.',
          ko: '우리 동네에서 금요일은 특별한 날이에요.',
        },
      },
      {
        id: 's2',
        text: 'Early in the morning, the men start cooking plov in a huge kazan.',
        translation: {
          uz: 'Erta tongda erkaklar ulkan qozonda osh damlashni boshlaydi.',
          ru: 'Рано утром мужчины начинают готовить плов в огромном казане.',
          ko: '이른 아침부터 남자들이 커다란 카잔에 플롭을 짓기 시작해요.',
        },
      },
      {
        id: 's3',
        text: 'This week, my uncle asked me to help him for the first time.',
        translation: {
          uz: 'Bu hafta amakim birinchi marta mendan yordam so‘radi.',
          ru: 'На этой неделе дядя впервые попросил меня помочь ему.',
          ko: '이번 주에 삼촌이 처음으로 저에게 도와 달라고 하셨어요.',
        },
      },
      {
        id: 's4',
        text: 'I cut ten kilos of carrots, and my hands were orange for hours.',
        translation: {
          uz: 'Men o‘n kilo sabzi to‘g‘radim, qo‘llarim soatlab sap-sariq bo‘lib yurdi.',
          ru: 'Я нарезал десять килограммов моркови, и руки потом несколько часов были оранжевыми.',
          ko: '저는 당근 10킬로를 썰었고, 몇 시간 동안 손이 주황색이었어요.',
        },
      },
      {
        id: 's5',
        text: 'My uncle laughed and said, “Now you are a real cook!”',
        translation: {
          uz: 'Amakim kulib: «Mana endi haqiqiy oshpaz bo‘libsan!» — dedi.',
          ru: 'Дядя рассмеялся и сказал: «Теперь ты настоящий повар!»',
          ko: '삼촌은 웃으면서 “이제 진짜 요리사가 됐구나!”라고 하셨어요.',
        },
      },
      {
        id: 's6',
        text: 'He showed me how to add the rice slowly and carefully.',
        translation: {
          uz: 'U menga guruchni qanday qilib sekin va ehtiyotkorlik bilan solishni ko‘rsatdi.',
          ru: 'Он показал мне, как медленно и аккуратно добавлять рис.',
          ko: '삼촌은 쌀을 천천히, 조심스럽게 넣는 법을 보여 주셨어요.',
        },
      },
      {
        id: 's7',
        text: 'At lunchtime, our neighbours came with big plates.',
        translation: {
          uz: 'Tushlik paytida qo‘shnilarimiz katta laganlar bilan kelishdi.',
          ru: 'В обед пришли соседи с большими блюдами.',
          ko: '점심때 이웃들이 큰 접시를 들고 왔어요.',
        },
      },
      {
        id: 's8',
        text: 'Everyone ate together in the yard, and nobody was in a hurry.',
        translation: {
          uz: 'Hamma hovlida birga ovqatlandi, hech kim shoshmadi.',
          ru: 'Все ели вместе во дворе, и никто никуда не спешил.',
          ko: '모두 마당에서 함께 먹었고, 아무도 서두르지 않았어요.',
        },
      },
      {
        id: 's9',
        text: 'I think plov tastes better when you cook it for other people.',
        translation: {
          uz: 'Menimcha, osh boshqalar uchun pishirilganda mazaliroq bo‘ladi.',
          ru: 'Мне кажется, плов вкуснее, когда готовишь его для других.',
          ko: '다른 사람을 위해 만들면 플롭이 더 맛있는 것 같아요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'neighbourhood',
        meaning: { uz: 'mahalla', ru: 'махалля, район', ko: '동네' },
      },
      {
        word: 'huge',
        meaning: { uz: 'ulkan', ru: 'огромный', ko: '거대한' },
      },
      {
        word: 'carefully',
        meaning: {
          uz: 'ehtiyotkorlik bilan',
          ru: 'аккуратно',
          ko: '조심스럽게',
        },
      },
      {
        word: 'neighbours',
        meaning: { uz: 'qo‘shnilar', ru: 'соседи', ko: '이웃들' },
      },
      {
        word: 'hurry',
        meaning: { uz: 'shoshilish', ru: 'спешка', ko: '서두름' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'Who asked Aziz to help?',
        options: ['His father', 'His uncle', 'His neighbour', 'His brother'],
        answerIndex: 1,
      },
      {
        id: 'q2',
        prompt: 'Why were his hands orange?',
        options: [
          'He cut a lot of carrots',
          'He painted the yard',
          'He ate oranges',
          'He cooked the rice',
        ],
        answerIndex: 0,
      },
      {
        id: 'q3',
        prompt: 'Where did everyone eat?',
        options: [
          'In a restaurant',
          'In the kitchen',
          'In the yard',
          'In the park',
        ],
        answerIndex: 2,
      },
    ],
  },
  {
    code: 'en-story-a2-02',
    level: 'A2',
    order: 2,
    title: 'A Rainy Day',
    topic: { uz: 'Yomg‘irli kun', ru: 'Дождливый день', ko: '비 오는 날' },
    scene: 'rain',
    narrator: { id: 'malika', name: 'Malika' },
    sentences: [
      {
        id: 's1',
        text: 'Yesterday, I forgot my umbrella at home.',
        translation: {
          uz: 'Kecha soyabonimni uyda unutib qoldirdim.',
          ru: 'Вчера я забыла зонт дома.',
          ko: '어제 저는 우산을 집에 두고 나왔어요.',
        },
      },
      {
        id: 's2',
        text: 'Of course, it started to rain as soon as I left the shop.',
        translation: {
          uz: 'Albatta, do‘kondan chiqishim bilan yomg‘ir yog‘a boshladi.',
          ru: 'Конечно же, дождь начался, как только я вышла из магазина.',
          ko: '물론 가게에서 나오자마자 비가 오기 시작했어요.',
        },
      },
      {
        id: 's3',
        text: 'At first, it was just a few drops.',
        translation: {
          uz: 'Avvaliga bir-ikki tomchi edi, xolos.',
          ru: 'Сначала было всего несколько капель.',
          ko: '처음에는 빗방울 몇 개뿐이었어요.',
        },
      },
      {
        id: 's4',
        text: 'Then the sky became dark, and the rain got heavier and heavier.',
        translation: {
          uz: 'Keyin osmon qorong‘ilashdi, yomg‘ir esa tobora kuchaydi.',
          ru: 'Потом небо потемнело, и дождь становился всё сильнее.',
          ko: '그러다 하늘이 어두워지고 비가 점점 더 세졌어요.',
        },
      },
      {
        id: 's5',
        text: 'I stood under a tree, but the water still found me.',
        translation: {
          uz: 'Daraxt tagida turdim, lekin baribir ivib ketdim.',
          ru: 'Я встала под дерево, но вода всё равно меня нашла.',
          ko: '나무 아래에 서 있었지만, 비는 결국 저를 찾아냈어요.',
        },
      },
      {
        id: 's6',
        text: 'Then an old woman opened her gate and called me inside.',
        translation: {
          uz: 'Shunda bir kampir darvozasini ochib, meni ichkariga chaqirdi.',
          ru: 'Тогда пожилая женщина открыла калитку и позвала меня внутрь.',
          ko: '그때 한 할머니가 대문을 열고 저를 안으로 부르셨어요.',
        },
      },
      {
        id: 's7',
        text: 'She gave me a towel and a cup of hot tea with lemon.',
        translation: {
          uz: 'U menga sochiq va bir piyola limonli issiq choy berdi.',
          ru: 'Она дала мне полотенце и чашку горячего чая с лимоном.',
          ko: '할머니는 수건과 레몬을 넣은 뜨거운 차 한 잔을 주셨어요.',
        },
      },
      {
        id: 's8',
        text: 'We talked for an hour while the rain was falling outside.',
        translation: {
          uz: 'Tashqarida yomg‘ir yog‘ayotgan paytda biz bir soat suhbatlashdik.',
          ru: 'Мы проговорили целый час, пока за окном шёл дождь.',
          ko: '밖에 비가 내리는 동안 우리는 한 시간 동안 이야기를 나눴어요.',
        },
      },
      {
        id: 's9',
        text: 'Now I always carry an umbrella, but I am glad I forgot it that day.',
        translation: {
          uz: 'Endi doim soyabon olib yuraman, lekin o‘sha kuni uni unutganimdan xursandman.',
          ru: 'Теперь я всегда ношу зонт, но я рада, что в тот день его забыла.',
          ko: '이제는 항상 우산을 들고 다니지만, 그날 우산을 잊어버린 게 기뻐요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'umbrella',
        meaning: { uz: 'soyabon', ru: 'зонт', ko: '우산' },
      },
      {
        word: 'drops',
        meaning: { uz: 'tomchilar', ru: 'капли', ko: '빗방울' },
      },
      {
        word: 'heavier',
        meaning: { uz: 'kuchliroq', ru: 'сильнее', ko: '더 센' },
      },
      {
        word: 'towel',
        meaning: { uz: 'sochiq', ru: 'полотенце', ko: '수건' },
      },
      {
        word: 'glad',
        meaning: { uz: 'xursand', ru: 'рад', ko: '기쁜' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'What did Malika forget?',
        options: ['Her phone', 'Her umbrella', 'Her bag', 'Her keys'],
        answerIndex: 1,
      },
      {
        id: 'q2',
        prompt: 'Who helped her?',
        options: [
          'A shop seller',
          'Her friend',
          'An old woman',
          'A taxi driver',
        ],
        answerIndex: 2,
      },
      {
        id: 'q3',
        prompt: 'What did she drink?',
        options: ['Coffee', 'Hot tea with lemon', 'Cold water', 'Hot milk'],
        answerIndex: 1,
      },
    ],
  },
  {
    code: 'en-story-a2-03',
    level: 'A2',
    order: 3,
    title: 'Navruz at Grandma’s',
    topic: {
      uz: 'Buvimnikida Navro‘z',
      ru: 'Навруз у бабушки',
      ko: '할머니 댁의 나브루즈',
    },
    scene: 'spring',
    narrator: { id: 'dilnoza', name: 'Dilnoza' },
    sentences: [
      {
        id: 's1',
        text: 'Every year on the twenty-first of March, we celebrate Navruz.',
        translation: {
          uz: 'Har yili yigirma birinchi martda Navro‘zni nishonlaymiz.',
          ru: 'Каждый год двадцать первого марта мы празднуем Навруз.',
          ko: '매년 3월 21일에 우리는 나브루즈를 기념해요.',
        },
      },
      {
        id: 's2',
        text: 'It is the first day of spring and the start of a new year.',
        translation: {
          uz: 'Bu bahorning birinchi kuni va yangi yilning boshlanishi.',
          ru: 'Это первый день весны и начало нового года.',
          ko: '봄의 첫날이자 새해의 시작이에요.',
        },
      },
      {
        id: 's3',
        text: 'This year, the whole family went to my grandmother’s village.',
        translation: {
          uz: 'Bu yil butun oila buvimning qishlog‘iga bordi.',
          ru: 'В этом году вся семья поехала в деревню к бабушке.',
          ko: '올해는 온 가족이 할머니가 사시는 마을에 갔어요.',
        },
      },
      {
        id: 's4',
        text: 'The apricot trees in her garden were covered in white flowers.',
        translation: {
          uz: 'Bog‘idagi o‘rik daraxtlari oppoq gulga burkangan edi.',
          ru: 'Абрикосовые деревья в её саду были покрыты белыми цветами.',
          ko: '할머니 정원의 살구나무는 하얀 꽃으로 뒤덮여 있었어요.',
        },
      },
      {
        id: 's5',
        text: 'The women cooked sumalak all night and sang old songs.',
        translation: {
          uz: 'Ayollar tun bo‘yi sumalak pishirib, eski qo‘shiqlar kuylashdi.',
          ru: 'Женщины всю ночь варили сумаляк и пели старые песни.',
          ko: '여자들은 밤새 수말락을 끓이며 옛 노래를 불렀어요.',
        },
      },
      {
        id: 's6',
        text: 'My job was to stir the pot, and my arms got very tired.',
        translation: {
          uz: 'Mening vazifam qozonni kovlash edi, qo‘llarim juda charchadi.',
          ru: 'Моей задачей было помешивать в котле, и руки очень устали.',
          ko: '제 일은 솥을 젓는 거였는데, 팔이 무척 아팠어요.',
        },
      },
      {
        id: 's7',
        text: 'In the morning, my grandmother gave everyone a bowl.',
        translation: {
          uz: 'Ertalab buvim hammaga bir kosadan sumalak berdi.',
          ru: 'Утром бабушка дала каждому по пиале.',
          ko: '아침에 할머니가 모두에게 한 그릇씩 나눠 주셨어요.',
        },
      },
      {
        id: 's8',
        text: 'She said, “Make a wish when you eat the first spoon.”',
        translation: {
          uz: 'U: «Birinchi qoshiqni yeyayotganda niyat qil», — dedi.',
          ru: 'Она сказала: «Загадай желание, когда съешь первую ложку».',
          ko: '할머니는 “첫 숟가락을 먹을 때 소원을 빌어라”라고 하셨어요.',
        },
      },
      {
        id: 's9',
        text: 'I closed my eyes and made a wish, but it is still a secret.',
        translation: {
          uz: 'Ko‘zlarimni yumib niyat qildim, lekin u hali ham sir.',
          ru: 'Я закрыла глаза и загадала желание, но это пока секрет.',
          ko: '저는 눈을 감고 소원을 빌었지만, 그건 아직 비밀이에요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'celebrate',
        meaning: { uz: 'nishonlamoq', ru: 'праздновать', ko: '기념하다' },
      },
      {
        word: 'village',
        meaning: { uz: 'qishloq', ru: 'деревня', ko: '마을' },
      },
      {
        word: 'covered',
        meaning: { uz: 'qoplangan', ru: 'покрытый', ko: '뒤덮인' },
      },
      {
        word: 'stir',
        meaning: {
          uz: 'kovlamoq, aralashtirmoq',
          ru: 'помешивать',
          ko: '젓다',
        },
      },
      {
        word: 'wish',
        meaning: { uz: 'niyat, tilak', ru: 'желание', ko: '소원' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'When do they celebrate Navruz?',
        options: [
          'On the first of January',
          'On the twenty-first of March',
          'On the first of September',
          'On the eighth of March',
        ],
        answerIndex: 1,
      },
      {
        id: 'q2',
        prompt: 'What was Dilnoza’s job?',
        options: [
          'To wash the bowls',
          'To stir the pot',
          'To sing songs',
          'To buy flowers',
        ],
        answerIndex: 1,
      },
      {
        id: 'q3',
        prompt: 'What did she do with the first spoon?',
        options: [
          'She gave it to her grandmother',
          'She made a wish',
          'She took a photo',
          'She put it in the garden',
        ],
        answerIndex: 1,
      },
    ],
  },
  {
    code: 'en-story-a2-04',
    level: 'A2',
    order: 4,
    title: 'Evening on the Metro',
    topic: {
      uz: 'Metroda bir oqshom',
      ru: 'Вечер в метро',
      ko: '지하철에서의 저녁',
    },
    scene: 'night',
    narrator: { id: 'jasur', name: 'Jasur' },
    sentences: [
      {
        id: 's1',
        text: 'I take the Tashkent metro home every evening.',
        translation: {
          uz: 'Har kuni kechqurun uyga Toshkent metrosida qaytaman.',
          ru: 'Каждый вечер я еду домой на ташкентском метро.',
          ko: '저는 매일 저녁 타슈켄트 지하철을 타고 집에 가요.',
        },
      },
      {
        id: 's2',
        text: 'Each station looks different, like a small museum.',
        translation: {
          uz: 'Har bir bekat o‘zgacha ko‘rinadi, xuddi kichik muzeyday.',
          ru: 'Каждая станция выглядит по-своему, как маленький музей.',
          ko: '역마다 모습이 달라서 마치 작은 박물관 같아요.',
        },
      },
      {
        id: 's3',
        text: 'Some have beautiful lamps, and some have pictures of space.',
        translation: {
          uz: 'Ba’zilarida chiroyli chiroqlar, ba’zilarida koinot suratlari bor.',
          ru: 'На одних — красивые светильники, на других — картины космоса.',
          ko: '어떤 역에는 아름다운 등이, 어떤 역에는 우주 그림이 있어요.',
        },
      },
      {
        id: 's4',
        text: 'Tonight the train was full, so I stood near the door.',
        translation: {
          uz: 'Bugun kechqurun poyezd odamga to‘la edi, shuning uchun eshik yonida turdim.',
          ru: 'Сегодня вечером поезд был полный, поэтому я стоял у двери.',
          ko: '오늘 밤은 열차가 꽉 차서 문 옆에 서 있었어요.',
        },
      },
      {
        id: 's5',
        text: 'A little boy next to me was reading an English book.',
        translation: {
          uz: 'Yonimdagi kichkina bola inglizcha kitob o‘qiyotgan edi.',
          ru: 'Маленький мальчик рядом со мной читал книгу на английском.',
          ko: '제 옆에 있던 꼬마가 영어책을 읽고 있었어요.',
        },
      },
      {
        id: 's6',
        text: 'He didn’t know one word, so he looked at me and pointed at it.',
        translation: {
          uz: 'U bir so‘zni bilmas ekan, menga qarab, barmog‘i bilan o‘sha so‘zni ko‘rsatdi.',
          ru: 'Он не знал одно слово, поэтому посмотрел на меня и показал на него пальцем.',
          ko: '아이는 모르는 단어가 하나 있어서, 저를 보며 그 단어를 가리켰어요.',
        },
      },
      {
        id: 's7',
        text: 'The word was “brave”, and I told him, “It means jasur, just like my name!”',
        translation: {
          uz: 'U so‘z «brave» edi. Men unga: «Bu „jasur“ degani, xuddi mening ismimday!» — dedim.',
          ru: 'Это было слово «brave», и я сказал ему: «Это значит „жасур“ — прямо как моё имя!»',
          ko: '그 단어는 “brave”였고, 저는 “우즈베크어로 ‘자수르’라는 뜻이야, 내 이름처럼!”이라고 말해 줬어요.',
        },
      },
      {
        id: 's8',
        text: 'The boy laughed and said, “Then I want to be Jasur too!”',
        translation: {
          uz: 'Bola kulib: «Unda men ham Jasur bo‘lmoqchiman!» — dedi.',
          ru: 'Мальчик засмеялся и сказал: «Тогда я тоже хочу быть Жасуром!»',
          ko: '아이는 웃으며 “그럼 저도 자수르가 될래요!”라고 했어요.',
        },
      },
      {
        id: 's9',
        text: 'When I got off the train, I was smiling all the way home.',
        translation: {
          uz: 'Poyezddan tushganimdan keyin uyimgacha jilmayib bordim.',
          ru: 'Когда я вышел из поезда, я улыбался всю дорогу домой.',
          ko: '열차에서 내린 뒤 저는 집에 가는 내내 웃고 있었어요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'station',
        meaning: { uz: 'bekat', ru: 'станция', ko: '역' },
      },
      {
        word: 'museum',
        meaning: { uz: 'muzey', ru: 'музей', ko: '박물관' },
      },
      {
        word: 'full',
        meaning: { uz: 'to‘la', ru: 'полный', ko: '꽉 찬' },
      },
      {
        word: 'pointed',
        meaning: {
          uz: 'ko‘rsatmoq (barmoq bilan)',
          ru: 'показывать пальцем',
          ko: '가리키다',
        },
      },
      {
        word: 'brave',
        meaning: { uz: 'jasur', ru: 'смелый', ko: '용감한' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'What does each metro station look like?',
        options: ['A small museum', 'A shopping centre', 'A school', 'A park'],
        answerIndex: 0,
      },
      {
        id: 'q2',
        prompt: 'What was the boy reading?',
        options: ['A newspaper', 'An English book', 'A map', 'His phone'],
        answerIndex: 1,
      },
      {
        id: 'q3',
        prompt: 'What does “jasur” mean?',
        options: ['Happy', 'Tired', 'Brave', 'Kind'],
        answerIndex: 2,
      },
    ],
  },
  {
    code: 'en-story-a2-05',
    level: 'A2',
    order: 5,
    title: 'Samsa with Grandma',
    topic: {
      uz: 'Buvim bilan somsa',
      ru: 'Самса с бабушкой',
      ko: '할머니와 만든 삼사',
    },
    scene: 'autumn',
    narrator: { id: 'malika', name: 'Malika' },
    sentences: [
      {
        id: 's1',
        text: 'Last Saturday, my grandmother decided to teach me how to make samsa.',
        translation: {
          uz: 'O‘tgan shanba kuni buvim menga somsa qilishni o‘rgatishga qaror qildi.',
          ru: 'В прошлую субботу бабушка решила научить меня делать самсу.',
          ko: '지난 토요일에 할머니가 저에게 삼사 만드는 법을 가르쳐 주기로 하셨어요.',
        },
      },
      {
        id: 's2',
        text: 'She said, “You are twenty now, and you still can’t make dough!”',
        translation: {
          uz: 'U: «Yigirmaga kirding-u, hali ham xamir qorishni bilmaysan!» — dedi.',
          ru: 'Она сказала: «Тебе уже двадцать, а ты до сих пор не умеешь замешивать тесто!»',
          ko: '할머니는 “벌써 스무 살인데 아직 반죽도 못 하는구나!”라고 하셨어요.',
        },
      },
      {
        id: 's3',
        text: 'We started early in the morning, before the rest of the family woke up.',
        translation: {
          uz: 'Biz erta tongda, oilaning qolgan a’zolari uyg‘onmasidan oldin boshladik.',
          ru: 'Мы начали рано утром, пока остальные ещё спали.',
          ko: '우리는 이른 아침, 다른 가족들이 일어나기 전에 시작했어요.',
        },
      },
      {
        id: 's4',
        text: 'Grandma cut the meat and onions into very small pieces with a big knife.',
        translation: {
          uz: 'Buvim katta pichoq bilan go‘sht va piyozni mayda-mayda qilib to‘g‘radi.',
          ru: 'Бабушка большим ножом мелко-мелко нарезала мясо и лук.',
          ko: '할머니는 큰 칼로 고기와 양파를 아주 잘게 써셨어요.',
        },
      },
      {
        id: 's5',
        text: 'I rolled the dough, but my circles looked more like maps of Uzbekistan.',
        translation: {
          uz: 'Men xamir yoydim, lekin doiralarim ko‘proq O‘zbekiston xaritasiga o‘xshardi.',
          ru: 'Я раскатывала тесто, но мои кружки больше походили на карту Узбекистана.',
          ko: '저는 반죽을 밀었는데, 제 동그라미는 우즈베키스탄 지도에 더 가까웠어요.',
        },
      },
      {
        id: 's6',
        text: 'Grandma laughed so much that she had to sit down.',
        translation: {
          uz: 'Buvim shunchalik kuldiki, o‘tirib olishga majbur bo‘ldi.',
          ru: 'Бабушка так смеялась, что ей пришлось сесть.',
          ko: '할머니는 너무 웃으셔서 앉으셔야 했어요.',
        },
      },
      {
        id: 's7',
        text: 'Then she held my hands and showed me how to fold the corners.',
        translation: {
          uz: 'Keyin u qo‘llarimdan ushlab, burchaklarini qanday bukishni ko‘rsatdi.',
          ru: 'Потом она взяла мои руки в свои и показала, как загибать уголки.',
          ko: '그러고는 제 손을 잡고 모서리를 접는 법을 보여 주셨어요.',
        },
      },
      {
        id: 's8',
        text: 'We baked the samsa in the tandir in our yard.',
        translation: {
          uz: 'Somsalarni hovlimizdagi tandirda yopdik.',
          ru: 'Мы испекли самсу в тандыре у нас во дворе.',
          ko: '우리는 마당에 있는 탄디르에서 삼사를 구웠어요.',
        },
      },
      {
        id: 's9',
        text: 'At lunch, my father ate four and asked, “Who made these?”',
        translation: {
          uz: 'Tushlikda otam to‘rttasini yeb: «Buni kim qildi?» — deb so‘radi.',
          ru: 'За обедом папа съел четыре штуки и спросил: «Кто это приготовил?»',
          ko: '점심때 아버지는 네 개를 드시고 “이거 누가 만들었니?”라고 물으셨어요.',
        },
      },
      {
        id: 's10',
        text: 'Grandma winked at me and said, “Our new cook, of course.”',
        translation: {
          uz: 'Buvim menga ko‘z qisib: «Yangi oshpazimiz-da, albatta», — dedi.',
          ru: 'Бабушка подмигнула мне и сказала: «Наш новый повар, конечно».',
          ko: '할머니는 저에게 윙크하며 “당연히 우리 집 새 요리사지”라고 하셨어요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'dough',
        meaning: { uz: 'xamir', ru: 'тесто', ko: '반죽' },
      },
      {
        word: 'rolled',
        meaning: {
          uz: 'yoymoq (xamirni)',
          ru: 'раскатывать',
          ko: '(반죽을) 밀다',
        },
      },
      {
        word: 'corners',
        meaning: { uz: 'burchak', ru: 'уголок', ko: '모서리' },
      },
      {
        word: 'baked',
        meaning: { uz: 'yopmoq, pishirmoq', ru: 'печь', ko: '굽다' },
      },
      {
        word: 'winked',
        meaning: { uz: 'ko‘z qismoq', ru: 'подмигнуть', ko: '윙크하다' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'When did they start cooking?',
        options: [
          'Late at night',
          'At lunchtime',
          'In the evening',
          'Early in the morning',
        ],
        answerIndex: 3,
      },
      {
        id: 'q2',
        prompt: 'What did Malika’s dough circles look like?',
        options: [
          'Maps of Uzbekistan',
          'Small moons',
          'Perfect circles',
          'Little hearts',
        ],
        answerIndex: 0,
      },
      {
        id: 'q3',
        prompt: 'How many samsa did her father eat?',
        options: ['Two', 'Three', 'Four', 'Six'],
        answerIndex: 2,
      },
    ],
  },
  {
    code: 'en-story-a2-06',
    level: 'A2',
    order: 6,
    title: 'The Phone in the Taxi',
    topic: {
      uz: 'Taksida qolgan telefon',
      ru: 'Телефон в такси',
      ko: '택시에 두고 온 휴대폰',
    },
    scene: 'night',
    narrator: { id: 'jasur', name: 'Jasur' },
    sentences: [
      {
        id: 's1',
        text: 'Last Friday, I took a taxi home after a late class.',
        translation: {
          uz: 'O‘tgan juma kuni kechki darsdan keyin uyga taksida qaytdim.',
          ru: 'В прошлую пятницу после позднего занятия я поехал домой на такси.',
          ko: '지난 금요일, 늦은 수업이 끝나고 택시를 타고 집에 갔어요.',
        },
      },
      {
        id: 's2',
        text: 'I was so tired that I fell asleep in the back seat.',
        translation: {
          uz: 'Shunchalik charchagan edimki, orqa o‘rindiqda uxlab qolibman.',
          ru: 'Я так устал, что уснул на заднем сиденье.',
          ko: '너무 피곤해서 뒷좌석에서 잠이 들었어요.',
        },
      },
      {
        id: 's3',
        text: 'At home, I put my hand in my pocket, and my phone wasn’t there.',
        translation: {
          uz: 'Uyda qo‘limni cho‘ntagimga solsam, telefonim yo‘q.',
          ru: 'Дома я сунул руку в карман, а телефона там не было.',
          ko: '집에 와서 주머니에 손을 넣어 보니 휴대폰이 없었어요.',
        },
      },
      {
        id: 's4',
        text: 'All my notes, photos and contacts were on that phone.',
        translation: {
          uz: 'Barcha yozuvlarim, rasmlarim va kontaktlarim o‘sha telefonda edi.',
          ru: 'Все мои заметки, фотографии и контакты были в этом телефоне.',
          ko: '제 메모랑 사진, 연락처가 전부 그 휴대폰에 있었어요.',
        },
      },
      {
        id: 's5',
        text: 'I called my number many times, but nobody answered.',
        translation: {
          uz: 'Raqamimga ko‘p marta qo‘ng‘iroq qildim, lekin hech kim javob bermadi.',
          ru: 'Я много раз звонил на свой номер, но никто не ответил.',
          ko: '제 번호로 여러 번 전화했지만 아무도 받지 않았어요.',
        },
      },
      {
        id: 's6',
        text: 'In the morning, an old man with a grey moustache knocked on our door.',
        translation: {
          uz: 'Ertalab eshigimizni chal mo‘ylovli bir keksa kishi taqillatdi.',
          ru: 'Утром в нашу дверь постучал пожилой мужчина с седыми усами.',
          ko: '아침에 회색 콧수염을 기른 할아버지가 우리 집 문을 두드렸어요.',
        },
      },
      {
        id: 's7',
        text: 'It was the taxi driver, and my phone was in his hand.',
        translation: {
          uz: 'Bu o‘sha taksi haydovchisi edi, telefonim esa uning qo‘lida edi.',
          ru: 'Это был тот самый таксист, и в руке у него был мой телефон.',
          ko: '그분은 그 택시 기사님이었고, 손에 제 휴대폰을 들고 계셨어요.',
        },
      },
      {
        id: 's8',
        text: 'He found it under the seat and remembered my address.',
        translation: {
          uz: 'U telefonni o‘rindiq tagidan topgan va manzilimni eslab qolgan ekan.',
          ru: 'Он нашёл телефон под сиденьем и запомнил мой адрес.',
          ko: '기사님은 좌석 밑에서 휴대폰을 찾았고, 제 주소를 기억하고 계셨어요.',
        },
      },
      {
        id: 's9',
        text: 'I offered him money, but he only asked for a cup of tea.',
        translation: {
          uz: 'Men unga pul taklif qildim, lekin u faqat bir piyola choy so‘radi.',
          ru: 'Я предложил ему деньги, но он попросил только чашку чая.',
          ko: '제가 돈을 드리려고 했지만, 기사님은 차 한 잔만 달라고 하셨어요.',
        },
      },
      {
        id: 's10',
        text: 'Now, when I see a grey moustache in a taxi, I always smile.',
        translation: {
          uz: 'Endi taksida chal mo‘ylovli odamni ko‘rsam, doim jilmayaman.',
          ru: 'Теперь, когда я вижу в такси седые усы, я всегда улыбаюсь.',
          ko: '이제 택시에서 회색 콧수염을 보면 저는 늘 미소를 지어요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'asleep',
        meaning: { uz: 'uxlab qolgan', ru: 'спящий', ko: '잠든' },
      },
      {
        word: 'pocket',
        meaning: { uz: 'cho‘ntak', ru: 'карман', ko: '주머니' },
      },
      {
        word: 'moustache',
        meaning: { uz: 'mo‘ylov', ru: 'усы', ko: '콧수염' },
      },
      {
        word: 'address',
        meaning: { uz: 'manzil', ru: 'адрес', ko: '주소' },
      },
      {
        word: 'offered',
        meaning: {
          uz: 'taklif qilmoq',
          ru: 'предлагать',
          ko: '권하다, 내밀다',
        },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'Where did Jasur lose his phone?',
        options: [
          'On the bus',
          'At the university',
          'In a taxi',
          'In the metro',
        ],
        answerIndex: 2,
      },
      {
        id: 'q2',
        prompt: 'Where did the driver find the phone?',
        options: [
          'Under the seat',
          'Near the car door',
          'On the street',
          'In his pocket',
        ],
        answerIndex: 0,
      },
      {
        id: 'q3',
        prompt: 'What did the driver ask for?',
        options: ['Money', 'A new phone', 'A free ride', 'A cup of tea'],
        answerIndex: 3,
      },
    ],
  },
  {
    code: 'en-story-a2-07',
    level: 'A2',
    order: 7,
    title: 'A Wedding Invitation',
    topic: {
      uz: 'To‘yga taklif',
      ru: 'Приглашение на свадьбу',
      ko: '결혼식 초대',
    },
    scene: 'sunset',
    narrator: { id: 'rustam', name: 'Rustam' },
    sentences: [
      {
        id: 's1',
        text: 'Last week, a young man brought a wedding invitation to my gate.',
        translation: {
          uz: 'O‘tgan hafta bir yigit darvozamga to‘y taklifnomasini olib keldi.',
          ru: 'На прошлой неделе молодой человек принёс к моей калитке приглашение на свадьбу.',
          ko: '지난주에 한 젊은이가 저희 집 대문으로 결혼식 초대장을 가져왔어요.',
        },
      },
      {
        id: 's2',
        text: 'It was Sardor, the boy who once stole apricots from my garden.',
        translation: {
          uz: 'Bu Sardor edi — bir paytlar bog‘imdan o‘rik o‘g‘irlagan bola.',
          ru: 'Это был Сардор — тот самый мальчишка, который когда-то таскал абрикосы из моего сада.',
          ko: '사르도르였어요. 예전에 우리 정원에서 살구를 몰래 따 가던 그 꼬마요.',
        },
      },
      {
        id: 's3',
        text: 'He was tall now, with a short beard, and he was getting married.',
        translation: {
          uz: 'Endi u kalta soqolli, bo‘ychan yigit bo‘lib, uylanayotgan ekan.',
          ru: 'Теперь он был высоким, с короткой бородой — и он женился.',
          ko: '이제는 키가 크고 짧은 수염도 기른 청년이 되어 장가를 간다고 했어요.',
        },
      },
      {
        id: 's4',
        text: 'He said, “Rustam ota, it won’t be a real wedding without you.”',
        translation: {
          uz: 'U: «Rustam ota, sizsiz to‘y to‘y bo‘lmaydi», — dedi.',
          ru: 'Он сказал: «Рустам-ота, без вас это будет не свадьба».',
          ko: '그는 “루스탐 할아버지, 할아버지가 안 오시면 진짜 결혼식이 아니에요”라고 했어요.',
        },
      },
      {
        id: 's5',
        text: 'On Saturday, I ironed my old suit and polished my shoes.',
        translation: {
          uz: 'Shanba kuni eski kostyumimni dazmollab, tuflimni yaltiratib artdim.',
          ru: 'В субботу я погладил свой старый костюм и начистил туфли.',
          ko: '토요일에 저는 낡은 양복을 다리고 구두를 닦았어요.',
        },
      },
      {
        id: 's6',
        text: 'The wedding hall was full of music, lights and about five hundred guests.',
        translation: {
          uz: 'To‘yxona musiqa, chiroqlar va besh yuzga yaqin mehmonga to‘la edi.',
          ru: 'Свадебный зал был полон музыки, огней и примерно пятисот гостей.',
          ko: '예식장은 음악과 불빛, 그리고 오백 명쯤 되는 손님으로 가득했어요.',
        },
      },
      {
        id: 's7',
        text: 'When the band played an old song, Sardor pulled me onto the dance floor.',
        translation: {
          uz: 'Sozandalar eski qo‘shiqni chalganda, Sardor meni davraga tortib chiqdi.',
          ru: 'Когда музыканты заиграли старую песню, Сардор вытащил меня танцевать.',
          ko: '악단이 옛 노래를 연주하자, 사르도르가 저를 춤추는 무대로 끌고 나갔어요.',
        },
      },
      {
        id: 's8',
        text: 'I danced like a young man, and everyone clapped.',
        translation: {
          uz: 'Men yoshlardek o‘ynadim, hamma qarsak chaldi.',
          ru: 'Я танцевал, как молодой, и все хлопали.',
          ko: '저는 젊은이처럼 춤을 췄고, 모두가 박수를 쳤어요.',
        },
      },
      {
        id: 's9',
        text: 'My knees hurt the next morning, but I didn’t mind at all.',
        translation: {
          uz: 'Ertasi kuni ertalab tizzalarim og‘ridi, lekin bunga sira parvo qilmadim.',
          ru: 'На следующее утро у меня болели колени, но меня это ничуть не огорчило.',
          ko: '다음 날 아침 무릎이 아팠지만, 전혀 상관없었어요.',
        },
      },
      {
        id: 's10',
        text: 'Someone filmed it, and my granddaughter in Canada watched it ten times.',
        translation: {
          uz: 'Kimdir buni videoga olgan ekan, Kanadadagi nevaram uni o‘n marta ko‘ribdi.',
          ru: 'Кто-то снял это на видео, и моя внучка в Канаде посмотрела его десять раз.',
          ko: '누군가 그걸 영상으로 찍었는데, 캐나다에 있는 손녀가 열 번이나 봤대요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'invitation',
        meaning: { uz: 'taklifnoma', ru: 'приглашение', ko: '초대장' },
      },
      {
        word: 'married',
        meaning: {
          uz: 'uylanmoq, turmush qurmoq',
          ru: 'жениться, выходить замуж',
          ko: '결혼하다',
        },
      },
      {
        word: 'ironed',
        meaning: {
          uz: 'dazmollamoq',
          ru: 'гладить (утюгом)',
          ko: '다림질하다',
        },
      },
      {
        word: 'guests',
        meaning: { uz: 'mehmon', ru: 'гость', ko: '손님' },
      },
      {
        word: 'clapped',
        meaning: {
          uz: 'qarsak chalmoq',
          ru: 'хлопать (в ладоши)',
          ko: '박수를 치다',
        },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'What did Sardor bring to Rustam’s gate?',
        options: [
          'A wedding invitation',
          'A bag of apricots',
          'A new suit',
          'A football',
        ],
        answerIndex: 0,
      },
      {
        id: 'q2',
        prompt: 'What did Sardor do when he was a boy?',
        options: [
          'He broke Rustam’s window',
          'He walked Rustam’s dog',
          'He stole Rustam’s apricots',
          'He sang at weddings',
        ],
        answerIndex: 2,
      },
      {
        id: 'q3',
        prompt: 'Who watched the video ten times?',
        options: [
          'Sardor’s bride',
          'Rustam’s neighbour',
          'Sardor',
          'Rustam’s granddaughter',
        ],
        answerIndex: 3,
      },
    ],
  },
  {
    code: 'en-story-a2-08',
    level: 'A2',
    order: 8,
    title: 'Football in the Yard',
    topic: {
      uz: 'Hovlidagi futbol',
      ru: 'Футбол во дворе',
      ko: '마당에서 한 축구',
    },
    scene: 'spring',
    narrator: { id: 'aziz', name: 'Aziz' },
    sentences: [
      {
        id: 's1',
        text: 'One warm spring evening, I came home from the bank in a white shirt.',
        translation: {
          uz: 'Bahorning iliq oqshomlaridan birida bankdan oq ko‘ylakda uyga qaytdim.',
          ru: 'Однажды тёплым весенним вечером я пришёл домой из банка в белой рубашке.',
          ko: '어느 따뜻한 봄날 저녁, 저는 흰 셔츠를 입고 은행에서 퇴근했어요.',
        },
      },
      {
        id: 's2',
        text: 'In the yard, the boys from our building were playing football.',
        translation: {
          uz: 'Hovlida uyimizning bolalari futbol o‘ynayotgan edi.',
          ru: 'Во дворе мальчишки из нашего дома играли в футбол.',
          ko: '마당에서는 우리 아파트 남자아이들이 축구를 하고 있었어요.',
        },
      },
      {
        id: 's3',
        text: 'One team had only four players, so they shouted, “Aziz aka, help us!”',
        translation: {
          uz: 'Bir jamoada bor-yo‘g‘i to‘rtta o‘yinchi bor edi, shuning uchun ular: «Aziz aka, yordam bering!» — deb baqirishdi.',
          ru: 'В одной команде было всего четыре игрока, и они закричали: «Азиз-ака, помогите!»',
          ko: '한 팀에 선수가 네 명뿐이라서 아이들이 “아지즈 형, 도와주세요!”라고 외쳤어요.',
        },
      },
      {
        id: 's4',
        text: 'I wanted to say no, but the ball rolled right to my feet.',
        translation: {
          uz: 'Yo‘q demoqchi edim, lekin to‘p to‘ppa-to‘g‘ri oyog‘im ostiga dumalab keldi.',
          ru: 'Я хотел отказаться, но мяч подкатился прямо к моим ногам.',
          ko: '거절하려고 했는데, 공이 바로 제 발 앞으로 굴러왔어요.',
        },
      },
      {
        id: 's5',
        text: 'Ten minutes later, my shirt was not white anymore.',
        translation: {
          uz: 'O‘n daqiqadan keyin ko‘ylagim endi oq emas edi.',
          ru: 'Через десять минут моя рубашка была уже не белой.',
          ko: '10분 뒤, 제 셔츠는 더 이상 하얗지 않았어요.',
        },
      },
      {
        id: 's6',
        text: 'Our goals were made of bricks, and the neighbours watched from their balconies.',
        translation: {
          uz: 'Darvozalarimiz g‘ishtdan edi, qo‘shnilar esa balkonlaridan tomosha qilishardi.',
          ru: 'Ворота у нас были из кирпичей, а соседи смотрели с балконов.',
          ko: '골대는 벽돌로 만들었고, 이웃들은 발코니에서 구경했어요.',
        },
      },
      {
        id: 's7',
        text: 'In the last minute, I kicked the ball as hard as I could.',
        translation: {
          uz: 'So‘nggi daqiqada to‘pni bor kuchim bilan tepdim.',
          ru: 'На последней минуте я ударил по мячу изо всех сил.',
          ko: '마지막 1분에 저는 온 힘을 다해 공을 찼어요.',
        },
      },
      {
        id: 's8',
        text: 'It was a goal, and the boys jumped on me, shouting my name.',
        translation: {
          uz: 'Gol bo‘ldi, bolalar ismimni baqirib, ustimga yopirilishdi.',
          ru: 'Мяч влетел в ворота, и мальчишки бросились на меня, выкрикивая моё имя.',
          ko: '골이 들어갔고, 아이들은 제 이름을 외치며 저에게 달려들었어요.',
        },
      },
      {
        id: 's9',
        text: 'An old woman called from her balcony, “Who will wash that shirt, Aziz?”',
        translation: {
          uz: 'Bir kampir balkonidan: «Bu ko‘ylakni kim yuvadi, Aziz?» — deb chaqirdi.',
          ru: 'Пожилая женщина крикнула с балкона: «А кто будет стирать эту рубашку, Азиз?»',
          ko: '한 할머니가 발코니에서 “그 셔츠는 누가 빨 거니, 아지즈?”라고 외치셨어요.',
        },
      },
      {
        id: 's10',
        text: 'The shirt needed two washes, but I felt twelve years old again.',
        translation: {
          uz: 'Ko‘ylakni ikki marta yuvishga to‘g‘ri keldi, lekin o‘zimni yana o‘n ikki yoshdagidek his qildim.',
          ru: 'Рубашку пришлось стирать дважды, но я снова почувствовал себя двенадцатилетним.',
          ko: '셔츠는 두 번이나 빨아야 했지만, 다시 열두 살이 된 기분이었어요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'players',
        meaning: { uz: 'o‘yinchi', ru: 'игрок', ko: '선수' },
      },
      {
        word: 'anymore',
        meaning: { uz: 'endi (…emas)', ru: 'больше не', ko: '더 이상' },
      },
      {
        word: 'bricks',
        meaning: { uz: 'g‘isht', ru: 'кирпич', ko: '벽돌' },
      },
      {
        word: 'kicked',
        meaning: { uz: 'tepmoq', ru: 'ударить ногой', ko: '차다' },
      },
      { word: 'goal', meaning: { uz: 'gol', ru: 'гол', ko: '골' } },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'What colour was Aziz’s shirt?',
        options: ['White', 'Blue', 'Black', 'Green'],
        answerIndex: 0,
      },
      {
        id: 'q2',
        prompt: 'What were the goals made of?',
        options: ['Old chairs', 'School bags', 'Bricks', 'Small trees'],
        answerIndex: 2,
      },
      {
        id: 'q3',
        prompt: 'How did Aziz feel at the end?',
        options: [
          'Angry and tired',
          'Bored',
          'Sad about his shirt',
          'Young again',
        ],
        answerIndex: 3,
      },
    ],
  },
  {
    code: 'en-story-a2-09',
    level: 'A2',
    order: 9,
    title: 'A Visit to the Doctor',
    topic: {
      uz: 'Shifokor qabulida',
      ru: 'На приёме у врача',
      ko: '병원에 간 날',
    },
    scene: 'rain',
    narrator: { id: 'dilnoza', name: 'Dilnoza' },
    sentences: [
      {
        id: 's1',
        text: 'Last Tuesday, my son woke up with a high temperature and a sore throat.',
        translation: {
          uz: 'O‘tgan seshanba o‘g‘lim isitmasi baland va tomog‘i og‘rib uyg‘ondi.',
          ru: 'В прошлый вторник мой сын проснулся с высокой температурой и больным горлом.',
          ko: '지난 화요일, 아들이 열이 높고 목이 아픈 채로 일어났어요.',
        },
      },
      {
        id: 's2',
        text: 'I work at a pharmacy, but when my own child is ill, I panic.',
        translation: {
          uz: 'Men dorixonada ishlayman, lekin o‘z bolam kasal bo‘lsa, sarosimaga tushib qolaman.',
          ru: 'Я работаю в аптеке, но когда болеет мой собственный ребёнок, я паникую.',
          ko: '저는 약국에서 일하지만, 제 아이가 아프면 당황해요.',
        },
      },
      {
        id: 's3',
        text: 'It was raining hard, so I carried him to the clinic under my coat.',
        translation: {
          uz: 'Yomg‘ir sharillab yog‘ayotgan edi, shuning uchun uni paltomga o‘rab, poliklinikaga ko‘tarib bordim.',
          ru: 'Шёл сильный дождь, поэтому я несла его в поликлинику, укрыв своим пальто.',
          ko: '비가 세차게 와서, 저는 아들을 외투로 감싸 안고 병원까지 갔어요.',
        },
      },
      {
        id: 's4',
        text: 'We waited for an hour in a long, noisy corridor.',
        translation: {
          uz: 'Uzun va shovqinli yo‘lakda bir soat kutdik.',
          ru: 'Мы целый час прождали в длинном шумном коридоре.',
          ko: '우리는 길고 시끄러운 복도에서 한 시간을 기다렸어요.',
        },
      },
      {
        id: 's5',
        text: 'The doctor was a young woman with very warm hands.',
        translation: {
          uz: 'Shifokor qo‘llari juda iliq yosh ayol edi.',
          ru: 'Врачом оказалась молодая женщина с очень тёплыми руками.',
          ko: '의사 선생님은 손이 아주 따뜻한 젊은 여자분이었어요.',
        },
      },
      {
        id: 's6',
        text: 'She looked at his throat and listened to his chest.',
        translation: {
          uz: 'U o‘g‘limning tomog‘ini ko‘rib, ko‘kragini eshitdi.',
          ru: 'Она посмотрела ему горло и послушала грудь.',
          ko: '선생님은 아이의 목을 보고 가슴 소리를 들으셨어요.',
        },
      },
      {
        id: 's7',
        text: 'Then she said, “It’s only a cold. Give him warm tea and rest.”',
        translation: {
          uz: 'Keyin: «Bu shunchaki shamollash. Unga iliq choy bering, dam olsin», — dedi.',
          ru: 'Потом она сказала: «Это просто простуда. Давайте ему тёплый чай, и пусть отдыхает».',
          ko: '그러고는 “그냥 감기예요. 따뜻한 차를 주고 푹 쉬게 하세요”라고 하셨어요.',
        },
      },
      {
        id: 's8',
        text: 'She also gave him a sticker with a brave little lion on it.',
        translation: {
          uz: 'U o‘g‘limga jasur kichkina sher tasviri tushirilgan stiker ham berdi.',
          ru: 'А ещё она подарила ему наклейку с храбрым маленьким львом.',
          ko: '그리고 용감한 아기 사자가 그려진 스티커도 주셨어요.',
        },
      },
      {
        id: 's9',
        text: 'On the way home, he said, “Mum, you were more scared than me.”',
        translation: {
          uz: 'Uyga qaytayotganimizda u: «Oyi, siz mendan ham ko‘proq qo‘rqdingiz», — dedi.',
          ru: 'По дороге домой он сказал: «Мама, ты испугалась больше, чем я».',
          ko: '집에 오는 길에 아들이 “엄마가 저보다 더 무서워했어요”라고 했어요.',
        },
      },
      {
        id: 's10',
        text: 'He was right, and I laughed for the first time that day.',
        translation: {
          uz: 'U haq edi. O‘sha kuni birinchi marta kulib yubordim.',
          ru: 'Он был прав, и я впервые за тот день рассмеялась.',
          ko: '맞는 말이었어요. 저는 그날 처음으로 웃었어요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'temperature',
        meaning: { uz: 'harorat, isitma', ru: 'температура', ko: '열, 체온' },
      },
      {
        word: 'throat',
        meaning: { uz: 'tomoq', ru: 'горло', ko: '목' },
      },
      {
        word: 'corridor',
        meaning: { uz: 'yo‘lak', ru: 'коридор', ko: '복도' },
      },
      {
        word: 'chest',
        meaning: { uz: 'ko‘krak', ru: 'грудь', ko: '가슴' },
      },
      {
        word: 'scared',
        meaning: { uz: 'qo‘rqib ketgan', ru: 'испуганный', ko: '겁먹은' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'What was wrong with Dilnoza’s son?',
        options: [
          'He broke his arm',
          'He had a temperature and a sore throat',
          'He had a toothache',
          'He hurt his knee',
        ],
        answerIndex: 1,
      },
      {
        id: 'q2',
        prompt: 'What did the doctor give the boy?',
        options: [
          'Some sweets',
          'A toy car',
          'An injection',
          'A sticker with a lion',
        ],
        answerIndex: 3,
      },
      {
        id: 'q3',
        prompt: 'According to her son, who was more scared?',
        options: ['Dilnoza', 'The boy himself', 'The doctor', 'A nurse'],
        answerIndex: 0,
      },
    ],
  },
  {
    code: 'en-story-a2-10',
    level: 'A2',
    order: 10,
    title: 'A Day at Charvak',
    topic: {
      uz: 'Chorvoqda bir kun',
      ru: 'День на Чарваке',
      ko: '차르박 호수에서 보낸 하루',
    },
    scene: 'summer',
    narrator: { id: 'rustam', name: 'Rustam' },
    sentences: [
      {
        id: 's1',
        text: 'In July, my old friend Erkin drove me and Bobik to Charvak Lake.',
        translation: {
          uz: 'Iyulda eski do‘stim Erkin meni va Bobikni mashinasida Chorvoq ko‘liga olib bordi.',
          ru: 'В июле мой старый друг Эркин отвёз меня и Бобика на Чарвакское озеро.',
          ko: '7월에 오랜 친구 에르킨이 저와 보빅을 차에 태우고 차르박 호수에 데려갔어요.',
        },
      },
      {
        id: 's2',
        text: 'The road climbed into the mountains, and the air smelled of grass.',
        translation: {
          uz: 'Yo‘l tog‘larga ko‘tarilib bordi, havodan esa o‘t hidi kelardi.',
          ru: 'Дорога поднималась в горы, и воздух пах травой.',
          ko: '길은 산으로 올라갔고, 공기에서는 풀 냄새가 났어요.',
        },
      },
      {
        id: 's3',
        text: 'The lake was bright blue, like a picture on a postcard.',
        translation: {
          uz: 'Ko‘l xuddi otkritkadagi suratdek moviy edi.',
          ru: 'Озеро было ярко-голубым, как картинка на открытке.',
          ko: '호수는 엽서 속 그림처럼 새파랬어요.',
        },
      },
      {
        id: 's4',
        text: 'Fifty years ago, Erkin and I swam here as young students.',
        translation: {
          uz: 'Ellik yil oldin Erkin ikkalamiz yosh talabalik paytimizda shu yerda suzgan edik.',
          ru: 'Пятьдесят лет назад мы с Эркином, молодые студенты, плавали здесь.',
          ko: '50년 전, 에르킨과 저는 젊은 대학생 시절에 여기서 수영을 했어요.',
        },
      },
      {
        id: 's5',
        text: 'This time, we just put our feet in the water.',
        translation: {
          uz: 'Bu safar faqat oyoqlarimizni suvga tiqdik.',
          ru: 'На этот раз мы просто опустили ноги в воду.',
          ko: '이번에는 그냥 발만 물에 담갔어요.',
        },
      },
      {
        id: 's6',
        text: 'It was so cold that we both shouted like boys.',
        translation: {
          uz: 'Suv shunchalik sovuq ediki, ikkalamiz ham boladek qichqirib yubordik.',
          ru: 'Вода была такой холодной, что мы оба закричали, как мальчишки.',
          ko: '물이 너무 차가워서 우리 둘 다 소년처럼 소리를 질렀어요.',
        },
      },
      {
        id: 's7',
        text: 'Bobik barked at the waves but didn’t want to touch them.',
        translation: {
          uz: 'Bobik to‘lqinlarga qarab vovulladi, lekin ularga tegishni xohlamadi.',
          ru: 'Бобик лаял на волны, но трогать их не хотел.',
          ko: '보빅은 물결을 보고 짖었지만, 건드리고 싶어 하지는 않았어요.',
        },
      },
      {
        id: 's8',
        text: 'In the evening, we sat quietly and watched the sun go down.',
        translation: {
          uz: 'Kechqurun jimgina o‘tirib, quyosh botishini tomosha qildik.',
          ru: 'Вечером мы тихо сидели и смотрели, как садится солнце.',
          ko: '저녁에는 조용히 앉아 해가 지는 것을 바라봤어요.',
        },
      },
      {
        id: 's9',
        text: 'Erkin said, “The lake is still young, my friend. Only we got old.”',
        translation: {
          uz: 'Erkin: «Ko‘l hali ham yosh, do‘stim. Faqat biz qaridik», — dedi.',
          ru: 'Эркин сказал: «Озеро всё ещё молодое, друг мой. Это мы постарели».',
          ko: '에르킨이 “이보게, 호수는 아직 젊은데 우리만 늙었구먼”이라고 했어요.',
        },
      },
      {
        id: 's10',
        text: 'We laughed and promised to come back next summer.',
        translation: {
          uz: 'Ikkalamiz kulib, kelasi yozda yana kelishga va’da berdik.',
          ru: 'Мы рассмеялись и пообещали приехать снова следующим летом.',
          ko: '우리는 웃으며 내년 여름에 다시 오자고 약속했어요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'climbed',
        meaning: { uz: 'ko‘tarilmoq', ru: 'подниматься', ko: '오르다' },
      },
      {
        word: 'postcard',
        meaning: { uz: 'otkritka', ru: 'открытка', ko: '엽서' },
      },
      {
        word: 'swam',
        meaning: { uz: 'suzmoq', ru: 'плавать', ko: '수영하다' },
      },
      {
        word: 'barked',
        meaning: { uz: 'vovullamoq', ru: 'лаять', ko: '짖다' },
      },
      {
        word: 'promised',
        meaning: { uz: 'va’da bermoq', ru: 'обещать', ko: '약속하다' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'Who drove Rustam to Charvak?',
        options: [
          'His son',
          'A taxi driver',
          'His neighbour',
          'His old friend Erkin',
        ],
        answerIndex: 3,
      },
      {
        id: 'q2',
        prompt: 'What did Rustam and Erkin do there fifty years ago?',
        options: [
          'They swam in the lake',
          'They built a house',
          'They caught fish',
          'They climbed a mountain',
        ],
        answerIndex: 0,
      },
      {
        id: 'q3',
        prompt: 'What did Bobik do?',
        options: [
          'He swam in the lake',
          'He barked at the waves',
          'He slept in the car',
          'He ran into the mountains',
        ],
        answerIndex: 1,
      },
    ],
  },
];
