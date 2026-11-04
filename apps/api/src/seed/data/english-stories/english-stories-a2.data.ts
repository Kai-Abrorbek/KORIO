import type { StorySeed } from '../../../stories/story-content.util';

/** 영어 듣기 이야기 A2. 규칙은 english-stories-a1.data.ts 맨 위 주석 참고 */
export const ENGLISH_STORIES_A2: StorySeed[] = [
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
];
