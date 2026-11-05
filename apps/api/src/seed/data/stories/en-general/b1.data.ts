import type { StorySeed } from '../../../../stories/story-content.util';

/** 영어 듣기 이야기 B1. 규칙은 a1.data.ts 맨 위 주석 참고 */
export const EN_GENERAL_B1: StorySeed[] = [
  {
    code: 'en-story-b1-01',
    level: 'B1',
    order: 1,
    title: 'My First Job Interview',
    topic: {
      uz: 'Birinchi ish suhbatim',
      ru: 'Моё первое собеседование',
      ko: '나의 첫 면접',
    },
    scene: 'morning',
    narrator: { id: 'aziz', name: 'Aziz' },
    sentences: [
      {
        id: 's1',
        text: 'Last month, I had my first real job interview at a bank in Tashkent.',
        translation: {
          uz: 'O‘tgan oy Toshkentdagi bir bankda ilk haqiqiy ish suhbatimdan o‘tdim.',
          ru: 'В прошлом месяце у меня было первое настоящее собеседование — в банке в Ташкенте.',
          ko: '지난달 저는 타슈켄트의 한 은행에서 처음으로 진짜 면접을 봤어요.',
        },
      },
      {
        id: 's2',
        text: 'I prepared for a whole week and practised my answers in front of the mirror.',
        translation: {
          uz: 'Bir hafta davomida tayyorlandim va javoblarimni oyna oldida mashq qildim.',
          ru: 'Я готовился целую неделю и репетировал ответы перед зеркалом.',
          ko: '일주일 내내 준비했고, 거울 앞에서 답변을 연습했어요.',
        },
      },
      {
        id: 's3',
        text: 'On the morning of the interview, I was so nervous that I couldn’t eat breakfast.',
        translation: {
          uz: 'Suhbat kuni ertalab shunchalik hayajonlandimki, nonushta ham qila olmadim.',
          ru: 'Утром в день собеседования я так волновался, что не смог позавтракать.',
          ko: '면접 날 아침에는 너무 긴장해서 아침도 못 먹었어요.',
        },
      },
      {
        id: 's4',
        text: 'When I arrived, I realised that the whole interview would be in English.',
        translation: {
          uz: 'Yetib kelganimda butun suhbat ingliz tilida bo‘lishini angladim.',
          ru: 'Когда я пришёл, я понял, что всё собеседование будет на английском.',
          ko: '도착해서야 면접 전체가 영어로 진행된다는 걸 알았어요.',
        },
      },
      {
        id: 's5',
        text: 'For a second, I wanted to run away, but I took a deep breath instead.',
        translation: {
          uz: 'Bir lahza qochib ketgim keldi, lekin buning o‘rniga chuqur nafas oldim.',
          ru: 'На секунду мне захотелось убежать, но вместо этого я глубоко вдохнул.',
          ko: '순간 도망치고 싶었지만, 대신 깊게 숨을 들이쉬었어요.',
        },
      },
      {
        id: 's6',
        text: 'The manager asked me why I wanted to work there.',
        translation: {
          uz: 'Menejer nega aynan shu yerda ishlamoqchi ekanimni so‘radi.',
          ru: 'Менеджер спросил, почему я хочу у них работать.',
          ko: '매니저는 제가 왜 그곳에서 일하고 싶은지 물었어요.',
        },
      },
      {
        id: 's7',
        text: 'My grammar wasn’t perfect, but I spoke honestly about my goals.',
        translation: {
          uz: 'Grammatikam mukammal emas edi, lekin maqsadlarim haqida samimiy gapirdim.',
          ru: 'Моя грамматика была не идеальной, но я честно рассказал о своих целях.',
          ko: '문법은 완벽하지 않았지만, 제 목표에 대해 솔직하게 말했어요.',
        },
      },
      {
        id: 's8',
        text: 'Two days later, they called me and offered me the job.',
        translation: {
          uz: 'Ikki kundan keyin menga qo‘ng‘iroq qilib, ishni taklif qilishdi.',
          ru: 'Через два дня мне позвонили и предложили работу.',
          ko: '이틀 뒤 은행에서 전화가 와서 저에게 일자리를 제안했어요.',
        },
      },
      {
        id: 's9',
        text: 'That day, I learned that confidence matters more than perfect English.',
        translation: {
          uz: 'O‘sha kuni o‘ziga ishonch mukammal ingliz tilidan muhimroq ekanini tushundim.',
          ru: 'В тот день я понял, что уверенность важнее идеального английского.',
          ko: '그날 저는 완벽한 영어보다 자신감이 더 중요하다는 걸 배웠어요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'interview',
        meaning: {
          uz: 'suhbat (ishga qabul)',
          ru: 'собеседование',
          ko: '면접',
        },
      },
      {
        word: 'nervous',
        meaning: { uz: 'hayajonlangan', ru: 'взволнованный', ko: '긴장한' },
      },
      {
        word: 'realised',
        meaning: { uz: 'anglamoq', ru: 'понять, осознать', ko: '깨닫다' },
      },
      {
        word: 'honestly',
        meaning: { uz: 'samimiy, rostini', ru: 'честно', ko: '솔직하게' },
      },
      {
        word: 'confidence',
        meaning: { uz: 'o‘ziga ishonch', ru: 'уверенность', ko: '자신감' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'Where was Aziz’s interview?',
        options: ['At a school', 'At a bank', 'At a hospital', 'At a hotel'],
        answerIndex: 1,
      },
      {
        id: 'q2',
        prompt: 'Why couldn’t he eat breakfast?',
        options: [
          'He was late',
          'He was nervous',
          'He was ill',
          'There was no food',
        ],
        answerIndex: 1,
      },
      {
        id: 'q3',
        prompt: 'What did he learn?',
        options: [
          'Grammar is the most important thing',
          'Banks are boring',
          'Confidence matters more than perfect English',
          'Interviews are easy',
        ],
        answerIndex: 2,
      },
    ],
  },
  {
    code: 'en-story-b1-02',
    level: 'B1',
    order: 2,
    title: 'Snow in the Mountains',
    topic: {
      uz: 'Tog‘dagi qor',
      ru: 'Снег в горах',
      ko: '산에 내린 눈',
    },
    scene: 'snow',
    narrator: { id: 'malika', name: 'Malika' },
    sentences: [
      {
        id: 's1',
        text: 'In January, my friends and I decided to spend a weekend in the mountains near Chimgan.',
        translation: {
          uz: 'Yanvarda do‘stlarim bilan dam olish kunlarini Chimyon yaqinidagi tog‘larda o‘tkazishga qaror qildik.',
          ru: 'В январе мы с друзьями решили провести выходные в горах у Чимгана.',
          ko: '1월에 저는 친구들과 침간 근처 산에서 주말을 보내기로 했어요.',
        },
      },
      {
        id: 's2',
        text: 'None of us had ever skied before, so we were excited and a little scared.',
        translation: {
          uz: 'Hech birimiz ilgari chang‘i uchmagan edik, shuning uchun ham hayajonlangan, ham biroz qo‘rqqan edik.',
          ru: 'Никто из нас раньше не катался на лыжах, поэтому нам было и радостно, и немного страшно.',
          ko: '우리 중 아무도 스키를 타 본 적이 없어서 설레면서도 조금 무서웠어요.',
        },
      },
      {
        id: 's3',
        text: 'The instructor, a tall man with a red beard, made everything look easy.',
        translation: {
          uz: 'Qizil soqolli, baland bo‘yli yo‘riqchi hamma narsani oson qilib ko‘rsatdi.',
          ru: 'Инструктор, высокий мужчина с рыжей бородой, делал всё так, будто это легко.',
          ko: '빨간 수염의 키 큰 강사님은 모든 걸 쉬워 보이게 했어요.',
        },
      },
      {
        id: 's4',
        text: 'Of course, I fell down at least twenty times on the first day.',
        translation: {
          uz: 'Albatta, birinchi kuni kamida yigirma marta yiqildim.',
          ru: 'Конечно, в первый день я упала как минимум двадцать раз.',
          ko: '물론 첫날 저는 적어도 스무 번은 넘어졌어요.',
        },
      },
      {
        id: 's5',
        text: 'Every time I fell, my friends laughed, and then they fell too.',
        translation: {
          uz: 'Har safar yiqilganimda do‘stlarim kulishdi, keyin o‘zlari ham yiqilishdi.',
          ru: 'Каждый раз, когда я падала, друзья смеялись, а потом падали сами.',
          ko: '제가 넘어질 때마다 친구들이 웃었고, 그러다 친구들도 넘어졌어요.',
        },
      },
      {
        id: 's6',
        text: 'In the evening, we sat by the fire, drank hot tea and dried our wet socks.',
        translation: {
          uz: 'Kechqurun gulxan yonida o‘tirib, issiq choy ichdik va ho‘l paypoqlarimizni quritdik.',
          ru: 'Вечером мы сидели у огня, пили горячий чай и сушили мокрые носки.',
          ko: '저녁에는 불가에 앉아 뜨거운 차를 마시고 젖은 양말을 말렸어요.',
        },
      },
      {
        id: 's7',
        text: 'On the second day, something changed, and I finally reached the bottom without falling.',
        translation: {
          uz: 'Ikkinchi kuni nimadir o‘zgardi va nihoyat yiqilmasdan pastga yetib bordim.',
          ru: 'На второй день что-то изменилось, и я наконец доехала до низа, ни разу не упав.',
          ko: '둘째 날에는 뭔가 달라졌고, 마침내 한 번도 넘어지지 않고 아래까지 내려갔어요.',
        },
      },
      {
        id: 's8',
        text: 'I realised that learning to ski is a lot like learning a language.',
        translation: {
          uz: 'Chang‘i uchishni o‘rganish til o‘rganishga juda o‘xshashini angladim.',
          ru: 'Я поняла, что учиться кататься на лыжах — почти то же самое, что учить язык.',
          ko: '스키를 배우는 건 언어를 배우는 것과 아주 비슷하다는 걸 깨달았어요.',
        },
      },
      {
        id: 's9',
        text: 'You fall many times, you laugh at yourself, and one day it just works.',
        translation: {
          uz: 'Ko‘p marta yiqilasan, o‘zingdan o‘zing kulasan va bir kuni hammasi o‘z-o‘zidan chiqa boshlaydi.',
          ru: 'Ты много раз падаешь, смеёшься над собой, и однажды всё просто получается.',
          ko: '여러 번 넘어지고, 스스로를 보며 웃다 보면, 어느 날 그냥 되는 거예요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'decided',
        meaning: { uz: 'qaror qilmoq', ru: 'решить', ko: '결정하다' },
      },
      {
        word: 'scared',
        meaning: { uz: 'qo‘rqqan', ru: 'испуганный', ko: '무서워하는' },
      },
      {
        word: 'instructor',
        meaning: { uz: 'yo‘riqchi, murabbiy', ru: 'инструктор', ko: '강사' },
      },
      {
        word: 'finally',
        meaning: { uz: 'nihoyat', ru: 'наконец', ko: '마침내' },
      },
      {
        word: 'bottom',
        meaning: { uz: 'past, tag', ru: 'низ', ko: '아래, 바닥' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'Where did Malika go in January?',
        options: [
          'To the sea',
          'To the mountains near Chimgan',
          'To Samarkand',
          'To another country',
        ],
        answerIndex: 1,
      },
      {
        id: 'q2',
        prompt: 'How many times did she fall on the first day?',
        options: [
          'Once',
          'Five times',
          'At least twenty times',
          'She never fell',
        ],
        answerIndex: 2,
      },
      {
        id: 'q3',
        prompt: 'In her opinion, what is learning to ski like?',
        options: [
          'Cooking plov',
          'Learning a language',
          'Driving a car',
          'Running a marathon',
        ],
        answerIndex: 1,
      },
    ],
  },
  {
    code: 'en-story-b1-03',
    level: 'B1',
    order: 3,
    title: 'A Letter to My Future Self',
    topic: {
      uz: 'Kelajakdagi o‘zimga maktub',
      ru: 'Письмо себе в будущее',
      ko: '미래의 나에게 쓰는 편지',
    },
    scene: 'night',
    narrator: { id: 'dilnoza', name: 'Dilnoza' },
    sentences: [
      {
        id: 's1',
        text: 'Dear future me, I am writing this letter on a quiet night in October.',
        translation: {
          uz: 'Kelajakdagi aziz o‘zim, bu maktubni oktyabrning sokin bir kechasida yozyapman.',
          ru: 'Дорогая я из будущего, я пишу это письмо тихой октябрьской ночью.',
          ko: '미래의 나에게. 나는 10월의 조용한 밤에 이 편지를 쓰고 있어.',
        },
      },
      {
        id: 's2',
        text: 'Right now, I am thirty-two, I work at a pharmacy, and I am learning English every day.',
        translation: {
          uz: 'Hozir men o‘ttiz ikki yoshdaman, dorixonada ishlayman va har kuni ingliz tilini o‘rganyapman.',
          ru: 'Сейчас мне тридцать два, я работаю в аптеке и каждый день учу английский.',
          ko: '지금 나는 서른두 살이고, 약국에서 일하며, 매일 영어를 공부하고 있어.',
        },
      },
      {
        id: 's3',
        text: 'Some days are hard, and I feel that I am not making any progress.',
        translation: {
          uz: 'Ba’zi kunlar og‘ir o‘tadi, go‘yo hech qanday natija yo‘qdek tuyuladi.',
          ru: 'Бывают тяжёлые дни, когда кажется, что я совсем не продвигаюсь.',
          ko: '어떤 날은 힘들고, 하나도 늘지 않는 것 같아.',
        },
      },
      {
        id: 's4',
        text: 'But last week, I understood a whole song on the radio without any help.',
        translation: {
          uz: 'Lekin o‘tgan hafta radiodagi bir qo‘shiqni hech qanday yordamsiz to‘liq tushundim.',
          ru: 'Но на прошлой неделе я поняла целую песню по радио без всякой помощи.',
          ko: '그런데 지난주에 라디오에서 나온 노래 한 곡을 아무 도움 없이 전부 알아들었어.',
        },
      },
      {
        id: 's5',
        text: 'I stopped in the middle of the street and smiled like a child.',
        translation: {
          uz: 'Ko‘chaning o‘rtasida to‘xtab, boladek jilmaydim.',
          ru: 'Я остановилась посреди улицы и улыбнулась, как ребёнок.',
          ko: '길 한가운데 멈춰 서서 아이처럼 웃었어.',
        },
      },
      {
        id: 's6',
        text: 'I hope that when you read this, you are travelling and talking to people from all over the world.',
        translation: {
          uz: 'Umid qilamanki, sen buni o‘qiyotganingda sayohat qilib, butun dunyodan kelgan odamlar bilan gaplashayotgan bo‘lasan.',
          ru: 'Надеюсь, когда ты будешь это читать, ты будешь путешествовать и разговаривать с людьми со всего мира.',
          ko: '네가 이 편지를 읽을 때쯤엔 여행하면서 전 세계 사람들과 이야기하고 있길 바라.',
        },
      },
      {
        id: 's7',
        text: 'If you are tired, please remember this night and how much you wanted it.',
        translation: {
          uz: 'Agar charchagan bo‘lsang, iltimos, shu kechani va buni qanchalik xohlaganingni esla.',
          ru: 'Если ты устала, пожалуйста, вспомни эту ночь и то, как сильно ты этого хотела.',
          ko: '혹시 지쳤다면, 이 밤을 기억해 줘. 네가 이걸 얼마나 원했는지도.',
        },
      },
      {
        id: 's8',
        text: 'Don’t be afraid of mistakes, because every mistake brought you closer.',
        translation: {
          uz: 'Xatolardan qo‘rqma, chunki har bir xato seni maqsadingga yaqinlashtirdi.',
          ru: 'Не бойся ошибок, ведь каждая ошибка приближала тебя к цели.',
          ko: '실수를 두려워하지 마. 실수 하나하나가 너를 더 가까이 데려다줬으니까.',
        },
      },
      {
        id: 's9',
        text: 'With love, from the old you.',
        translation: {
          uz: 'Mehr bilan, avvalgi o‘zingdan.',
          ru: 'С любовью, твоя прежняя я.',
          ko: '사랑을 담아, 예전의 네가.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'future',
        meaning: { uz: 'kelajak', ru: 'будущее', ko: '미래' },
      },
      {
        word: 'progress',
        meaning: { uz: 'rivoj, natija', ru: 'прогресс', ko: '발전, 진전' },
      },
      {
        word: 'whole',
        meaning: { uz: 'butun, to‘liq', ru: 'целый', ko: '전체의' },
      },
      {
        word: 'travelling',
        meaning: { uz: 'sayohat qilmoq', ru: 'путешествовать', ko: '여행하다' },
      },
      {
        word: 'afraid',
        meaning: { uz: 'qo‘rqmoq', ru: 'бояться', ko: '두려워하는' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'Where does Dilnoza work?',
        options: ['At a bank', 'At a school', 'At a pharmacy', 'At a hotel'],
        answerIndex: 2,
      },
      {
        id: 'q2',
        prompt: 'What happened last week?',
        options: [
          'She lost her job',
          'She understood a whole song in English',
          'She travelled to another country',
          'She wrote a book',
        ],
        answerIndex: 1,
      },
      {
        id: 'q3',
        prompt: 'What does she say about mistakes?',
        options: [
          'They are dangerous',
          'Every mistake brought her closer',
          'She never makes them',
          'They are funny',
        ],
        answerIndex: 1,
      },
    ],
  },
  {
    code: 'en-story-b1-04',
    level: 'B1',
    order: 4,
    title: 'Never Too Late',
    topic: {
      uz: 'Hech qachon kech emas',
      ru: 'Никогда не поздно',
      ko: '늦은 때란 없다',
    },
    scene: 'summer',
    narrator: { id: 'rustam', name: 'Rustam' },
    sentences: [
      {
        id: 's1',
        text: 'People are often surprised when they hear that I am learning English at seventy.',
        translation: {
          uz: 'Yetmish yoshimda ingliz tilini o‘rganayotganimni eshitgan odamlar ko‘pincha hayron qolishadi.',
          ru: 'Люди часто удивляются, когда слышат, что я учу английский в семьдесят лет.',
          ko: '제가 일흔에 영어를 배운다고 하면 사람들은 종종 놀라요.',
        },
      },
      {
        id: 's2',
        text: 'My granddaughter lives in Canada now, and her children speak mostly English.',
        translation: {
          uz: 'Nevaram hozir Kanadada yashaydi, uning bolalari asosan inglizcha gapirishadi.',
          ru: 'Моя внучка теперь живёт в Канаде, и её дети говорят в основном по-английски.',
          ko: '손녀가 지금 캐나다에 사는데, 그 아이들은 주로 영어로 말해요.',
        },
      },
      {
        id: 's3',
        text: 'The first time we had a video call, I could only smile and wave.',
        translation: {
          uz: 'Birinchi marta video qo‘ng‘iroq qilganimizda, faqat jilmayib, qo‘l silkitishdan nariga o‘tolmadim.',
          ru: 'Когда мы впервые созвонились по видео, я мог только улыбаться и махать рукой.',
          ko: '처음 영상 통화를 했을 때, 저는 그저 웃으며 손을 흔들 수밖에 없었어요.',
        },
      },
      {
        id: 's4',
        text: 'After the call, I sat in the garden for a long time, feeling a little sad.',
        translation: {
          uz: 'Qo‘ng‘iroqdan keyin bog‘da uzoq o‘tirdim, ko‘nglim biroz g‘ash edi.',
          ru: 'После звонка я долго сидел в саду, и мне было немного грустно.',
          ko: '통화가 끝난 뒤 저는 한참 동안 정원에 앉아 조금 슬퍼했어요.',
        },
      },
      {
        id: 's5',
        text: 'Then I decided that age is not a good reason to stop learning.',
        translation: {
          uz: 'Keyin yosh o‘rganishni to‘xtatish uchun yaxshi sabab emas, degan qarorga keldim.',
          ru: 'А потом я решил, что возраст — не повод перестать учиться.',
          ko: '그리고 나이는 배움을 멈출 좋은 이유가 아니라고 마음먹었어요.',
        },
      },
      {
        id: 's6',
        text: 'Now I study for twenty minutes every morning, before my tea gets cold.',
        translation: {
          uz: 'Endi har kuni ertalab, choyim sovib qolmasidan oldin, yigirma daqiqa shug‘ullanaman.',
          ru: 'Теперь я занимаюсь по двадцать минут каждое утро, пока не остыл мой чай.',
          ko: '이제 매일 아침 차가 식기 전에 20분씩 공부해요.',
        },
      },
      {
        id: 's7',
        text: 'My memory is not as fast as it used to be, so I repeat every word many times.',
        translation: {
          uz: 'Xotiram avvalgidek tez emas, shuning uchun har bir so‘zni ko‘p marta takrorlayman.',
          ru: 'Память у меня уже не такая быстрая, как раньше, поэтому я повторяю каждое слово много раз.',
          ko: '기억력이 예전만큼 빠르지 않아서, 단어 하나하나를 여러 번 반복해요.',
        },
      },
      {
        id: 's8',
        text: 'Last Sunday, my great-grandson asked me, “Grandpa, what is your favourite colour?”',
        translation: {
          uz: 'O‘tgan yakshanba chevaram mendan: «Bobo, sevimli rangingiz qaysi?» — deb so‘radi.',
          ru: 'В прошлое воскресенье правнук спросил меня: «Дедушка, какой твой любимый цвет?»',
          ko: '지난 일요일에 증손자가 “할아버지, 제일 좋아하는 색이 뭐예요?”라고 물었어요.',
        },
      },
      {
        id: 's9',
        text: 'I answered, “Green, like the trees in my garden,” and he clapped his hands.',
        translation: {
          uz: 'Men: «Yashil, bog‘imdagi daraxtlar kabi», — deb javob berdim, u esa qarsak chaldi.',
          ru: 'Я ответил: «Зелёный, как деревья в моём саду», и он захлопал в ладоши.',
          ko: '제가 “초록색, 우리 정원의 나무처럼”이라고 대답하자, 아이는 손뼉을 쳤어요.',
        },
      },
      {
        id: 's10',
        text: 'It was a short conversation, but for me, it was worth every minute.',
        translation: {
          uz: 'Bu qisqa suhbat edi, lekin men uchun u sarflagan har bir daqiqamga arzidi.',
          ru: 'Это был короткий разговор, но для меня он стоил каждой минуты.',
          ko: '짧은 대화였지만, 제게는 공부한 모든 시간이 아깝지 않았어요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'surprised',
        meaning: { uz: 'hayron', ru: 'удивлённый', ko: '놀란' },
      },
      {
        word: 'granddaughter',
        meaning: { uz: 'nevara (qiz)', ru: 'внучка', ko: '손녀' },
      },
      {
        word: 'wave',
        meaning: {
          uz: 'qo‘l silkitmoq',
          ru: 'махать рукой',
          ko: '손을 흔들다',
        },
      },
      {
        word: 'memory',
        meaning: { uz: 'xotira', ru: 'память', ko: '기억력' },
      },
      {
        word: 'worth',
        meaning: {
          uz: 'arzimoq',
          ru: 'стоить (того)',
          ko: '~할 가치가 있는',
        },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'Where does Rustam’s granddaughter live?',
        options: ['In Russia', 'In Korea', 'In Canada', 'In Tashkent'],
        answerIndex: 2,
      },
      {
        id: 'q2',
        prompt: 'How long does he study every morning?',
        options: ['Five minutes', 'Twenty minutes', 'One hour', 'Two hours'],
        answerIndex: 1,
      },
      {
        id: 'q3',
        prompt: 'What is his favourite colour?',
        options: ['Blue', 'Red', 'Yellow', 'Green'],
        answerIndex: 3,
      },
    ],
  },
  {
    code: 'en-story-b1-05',
    level: 'B1',
    order: 5,
    title: 'A Cracked Screen',
    topic: {
      uz: 'Yorilgan ekran',
      ru: 'Разбитый экран',
      ko: '금 간 화면',
    },
    scene: 'bazaar',
    narrator: { id: 'jasur', name: 'Jasur' },
    sentences: [
      {
        id: 's1',
        text: 'Last Tuesday, my phone slipped out of my back pocket on the bus and hit the floor.',
        translation: {
          uz: 'O‘tgan seshanba telefonim avtobusda orqa cho‘ntagimdan sirg‘alib tushib, polga urildi.',
          ru: 'В прошлый вторник телефон выскользнул у меня из заднего кармана в автобусе и ударился об пол.',
          ko: '지난 화요일, 버스에서 휴대폰이 뒷주머니에서 미끄러져 바닥에 떨어졌어요.',
        },
      },
      {
        id: 's2',
        text: 'When I picked it up, a long crack ran across the screen from corner to corner.',
        translation: {
          uz: 'Uni ko‘tarib olsam, ekranning bir burchagidan ikkinchisigacha uzun yoriq tushgan ekan.',
          ru: 'Когда я его поднял, через весь экран, от угла до угла, шла длинная трещина.',
          ko: '주워 보니 화면 한쪽 모서리부터 반대쪽 모서리까지 길게 금이 가 있었어요.',
        },
      },
      {
        id: 's3',
        text: 'I had bought that phone with my own money after working all summer in a café.',
        translation: {
          uz: 'Bu telefonni yoz bo‘yi kafeda ishlab, o‘z pulimga sotib olgan edim.',
          ru: 'Я купил этот телефон на свои деньги, проработав всё лето в кафе.',
          ko: '그 휴대폰은 여름 내내 카페에서 일해서 제 돈으로 산 거였어요.',
        },
      },
      {
        id: 's4',
        text: 'After classes, I took it to the electronics market, where there are dozens of tiny repair stalls.',
        translation: {
          uz: 'Darsdan keyin uni elektronika bozoriga olib bordim, u yerda o‘nlab kichkina ta’mirlash rastalari bor.',
          ru: 'После занятий я отнёс его на рынок электроники, где работают десятки крошечных ремонтных точек.',
          ko: '수업이 끝나고 작은 수리 가판대가 수십 개 모여 있는 전자제품 시장에 가져갔어요.',
        },
      },
      {
        id: 's5',
        text: 'The first man looked at it for two seconds and asked for six hundred thousand som.',
        translation: {
          uz: 'Birinchi usta unga ikki soniya qaradi-yu, olti yuz ming so‘m so‘radi.',
          ru: 'Первый мастер взглянул на него две секунды и попросил шестьсот тысяч сумов.',
          ko: '첫 번째 수리공은 2초쯤 들여다보더니 60만 숨을 달라고 했어요.',
        },
      },
      {
        id: 's6',
        text: 'I walked further and found an old master who was fixing a radio with great care.',
        translation: {
          uz: 'Nariroq yurib, radioni juda ehtiyotkorlik bilan tuzatayotgan keksa ustani topdim.',
          ru: 'Я прошёл дальше и нашёл пожилого мастера, который очень бережно чинил радиоприёмник.',
          ko: '조금 더 걸어가다가 라디오를 아주 정성스럽게 고치고 있는 나이 든 수리공을 만났어요.',
        },
      },
      {
        id: 's7',
        text: 'He checked my phone slowly and said that only the glass was broken, not the display.',
        translation: {
          uz: 'U telefonimni shoshilmay tekshirib, displey emas, faqat oynasi singanini aytdi.',
          ru: 'Он не спеша проверил телефон и сказал, что разбито только стекло, а не дисплей.',
          ko: '그분은 휴대폰을 천천히 살펴보더니 디스플레이가 아니라 유리만 깨졌다고 했어요.',
        },
      },
      {
        id: 's8',
        text: 'Half an hour later, my phone looked almost new, and I paid only a third of the first price.',
        translation: {
          uz: 'Yarim soatdan keyin telefonim deyarli yangidek bo‘ldi, men esa birinchi narxning atigi uchdan birini to‘ladim.',
          ru: 'Через полчаса телефон выглядел почти как новый, а я заплатил всего треть первой цены.',
          ko: '30분 뒤 휴대폰은 거의 새것처럼 보였고, 저는 처음 들은 가격의 3분의 1만 냈어요.',
        },
      },
      {
        id: 's9',
        text: 'He gave me a plastic case for free and told me never to use my back pocket again.',
        translation: {
          uz: 'U menga bepul plastik g‘ilof berdi va boshqa hech qachon orqa cho‘ntakdan foydalanmaslikni aytdi.',
          ru: 'Он бесплатно дал мне пластиковый чехол и сказал больше никогда не носить телефон в заднем кармане.',
          ko: '그분은 플라스틱 케이스를 공짜로 주면서 다시는 뒷주머니에 넣지 말라고 했어요.',
        },
      },
      {
        id: 's10',
        text: 'He was honest with a worried student, and now I send all my friends to his little stall.',
        translation: {
          uz: 'U xavotirdagi talabaga halol munosabatda bo‘ldi, endi esa barcha do‘stlarimni uning kichkina rastasiga yuboraman.',
          ru: 'Он был честен с встревоженным студентом, и теперь я отправляю всех друзей в его маленькую мастерскую.',
          ko: '그분은 걱정 가득한 학생에게 정직했고, 이제 저는 친구들을 전부 그분의 작은 가게로 보내요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'slipped',
        meaning: {
          uz: 'sirg‘alib tushmoq',
          ru: 'выскользнуть',
          ko: '미끄러지다',
        },
      },
      {
        word: 'crack',
        meaning: { uz: 'yoriq', ru: 'трещина', ko: '금, 균열' },
      },
      {
        word: 'dozens',
        meaning: { uz: 'o‘nlab', ru: 'десятки', ko: '수십' },
      },
      {
        word: 'repair',
        meaning: { uz: 'ta’mirlash', ru: 'ремонт', ko: '수리' },
      },
      {
        word: 'honest',
        meaning: { uz: 'halol, rostgo‘y', ru: 'честный', ko: '정직한' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'Where did Jasur drop his phone?',
        options: [
          'At the café',
          'On the bus',
          'At university',
          'At the market',
        ],
        answerIndex: 1,
      },
      {
        id: 'q2',
        prompt: 'What did the old master say about the phone?',
        options: [
          'It was too old to fix',
          'The display was broken',
          'Only the glass was broken',
          'It needed a new battery',
        ],
        answerIndex: 2,
      },
      {
        id: 'q3',
        prompt: 'How much did Jasur pay in the end?',
        options: [
          'Six hundred thousand som',
          'Nothing',
          'Twice the first price',
          'A third of the first price',
        ],
        answerIndex: 3,
      },
    ],
  },
  {
    code: 'en-story-b1-06',
    level: 'B1',
    order: 6,
    title: 'Moving Day',
    topic: {
      uz: 'Ko‘chish kuni',
      ru: 'День переезда',
      ko: '이사하는 날',
    },
    scene: 'spring',
    narrator: { id: 'kamola', name: 'Kamola' },
    sentences: [
      {
        id: 's1',
        text: 'In April, I finally moved out of my parents’ house into a small rented apartment in Yunusabad.',
        translation: {
          uz: 'Aprelda nihoyat ota-onamning uyidan Yunusoboddagi kichkina ijara kvartiraga ko‘chib o‘tdim.',
          ru: 'В апреле я наконец переехала из родительского дома в маленькую съёмную квартиру на Юнусабаде.',
          ko: '4월에 저는 드디어 부모님 집을 나와 유누스아바드에 있는 작은 월세 아파트로 이사했어요.',
        },
      },
      {
        id: 's2',
        text: 'My mother wasn’t happy about it, because in our family, girls usually leave home only after their wedding.',
        translation: {
          uz: 'Onam bundan xursand emas edi, chunki bizning oilada qizlar odatda uydan faqat to‘ydan keyin chiqib ketishadi.',
          ru: 'Мама была не в восторге, ведь в нашей семье девушки обычно уходят из дома только после свадьбы.',
          ko: '엄마는 별로 좋아하지 않으셨어요. 우리 집안에서는 딸들이 보통 결혼한 뒤에야 집을 떠나거든요.',
        },
      },
      {
        id: 's3',
        text: 'But my office was more than an hour away, and I was tired of spending my evenings in traffic.',
        translation: {
          uz: 'Lekin ishxonam bir soatdan ham uzoqroq yo‘lda edi, kechqurunlarimni tirbandlikda o‘tkazishdan charchagan edim.',
          ru: 'Но до офиса было больше часа езды, и я устала проводить вечера в пробках.',
          ko: '하지만 회사까지 한 시간이 넘게 걸렸고, 저녁 시간을 꽉 막힌 도로에서 보내는 데 지쳐 있었어요.',
        },
      },
      {
        id: 's4',
        text: 'My two brothers carried my boxes up to the fifth floor, because the lift was broken that day.',
        translation: {
          uz: 'Ikki akam qutilarimni beshinchi qavatga ko‘tarib chiqishdi, chunki o‘sha kuni lift buzilgan edi.',
          ru: 'Двое братьев затащили мои коробки на пятый этаж, потому что в тот день не работал лифт.',
          ko: '그날 엘리베이터가 고장 나서 오빠 두 명이 제 상자들을 5층까지 날라 줬어요.',
        },
      },
      {
        id: 's5',
        text: 'In the evening, everyone left, and the apartment suddenly felt very big and very quiet.',
        translation: {
          uz: 'Kechqurun hamma ketdi va kvartira birdan juda katta va juda jimjit bo‘lib tuyuldi.',
          ru: 'Вечером все ушли, и квартира вдруг показалась очень большой и очень тихой.',
          ko: '저녁이 되자 모두 돌아갔고, 아파트가 갑자기 아주 넓고 조용하게 느껴졌어요.',
        },
      },
      {
        id: 's6',
        text: 'I sat on a box, ate bread and cheese for dinner, and almost cried without any real reason.',
        translation: {
          uz: 'Bir quti ustida o‘tirib, kechki ovqatga non bilan pishloq yedim va hech qanday sababsiz yig‘lab yuborishimga oz qoldi.',
          ru: 'Я сидела на коробке, ужинала хлебом с сыром и чуть не расплакалась без всякой причины.',
          ko: '저는 상자 위에 앉아 빵과 치즈로 저녁을 때우다가, 딱히 이유도 없이 울 뻔했어요.',
        },
      },
      {
        id: 's7',
        text: 'Then somebody knocked, and an old woman from next door handed me a plate of hot somsa.',
        translation: {
          uz: 'Shu payt kimdir eshikni taqillatdi: qo‘shni xonadondagi keksa ayol menga bir likopcha issiq somsa uzatdi.',
          ru: 'Тут кто-то постучал, и пожилая соседка протянула мне тарелку горячей самсы.',
          ko: '그때 누군가 문을 두드렸어요. 옆집 할머니가 따뜻한 솜사 한 접시를 건네주셨어요.',
        },
      },
      {
        id: 's8',
        text: 'She said that a new home should never start with an empty table.',
        translation: {
          uz: 'U yangi uy hech qachon bo‘sh dasturxon bilan boshlanmasligi kerakligini aytdi.',
          ru: 'Она сказала, что новый дом никогда не должен начинаться с пустого стола.',
          ko: '할머니는 새집은 절대 빈 상으로 시작하면 안 된다고 하셨어요.',
        },
      },
      {
        id: 's9',
        text: 'We drank tea on my boxes, and she told me about her three grandsons, who all work abroad.',
        translation: {
          uz: 'Qutilarim ustida birga choy ichdik, u menga hammasi chet elda ishlaydigan uchta nevarasi haqida gapirib berdi.',
          ru: 'Мы пили чай прямо на коробках, и она рассказывала мне о трёх внуках, которые все работают за границей.',
          ko: '우리는 상자 위에서 같이 차를 마셨고, 할머니는 모두 외국에서 일하는 손자 셋 이야기를 해 주셨어요.',
        },
      },
      {
        id: 's10',
        text: 'That night, I understood that she was lonely too, and the apartment didn’t feel so quiet anymore.',
        translation: {
          uz: 'O‘sha kechasi u ham yolg‘iz ekanini tushundim va kvartira endi unchalik jimjit tuyulmadi.',
          ru: 'В ту ночь я поняла, что ей тоже одиноко, и квартира больше не казалась такой тихой.',
          ko: '그날 밤 저는 할머니도 외로우시다는 걸 알았고, 아파트도 더는 그렇게 조용하게 느껴지지 않았어요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'rented',
        meaning: {
          uz: 'ijaraga olingan',
          ru: 'съёмный, арендованный',
          ko: '세 든, 임대한',
        },
      },
      {
        word: 'traffic',
        meaning: { uz: 'tirbandlik', ru: 'пробки', ko: '교통 체증' },
      },
      {
        word: 'carried',
        meaning: { uz: 'ko‘tarib bormoq', ru: 'нести', ko: '나르다' },
      },
      {
        word: 'suddenly',
        meaning: { uz: 'birdan', ru: 'вдруг', ko: '갑자기' },
      },
      {
        word: 'knocked',
        meaning: { uz: 'taqillatmoq', ru: 'стучать', ko: '두드리다' },
      },
      {
        word: 'lonely',
        meaning: { uz: 'yolg‘iz', ru: 'одинокий', ko: '외로운' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'Why did Kamola move out?',
        options: [
          'Her office was too far away',
          'She got married',
          'Her parents sold the house',
          'She started university',
        ],
        answerIndex: 0,
      },
      {
        id: 'q2',
        prompt: 'Why did her brothers carry the boxes up the stairs?',
        options: [
          'They wanted some exercise',
          'Kamola was ill',
          'The lift was broken',
          'The neighbour asked them to',
        ],
        answerIndex: 2,
      },
      {
        id: 'q3',
        prompt: 'What did the neighbour bring?',
        options: ['A cake', 'Some flowers', 'A kettle', 'A plate of hot somsa'],
        answerIndex: 3,
      },
    ],
  },
  {
    code: 'en-story-b1-07',
    level: 'B1',
    order: 7,
    title: 'The Train to Khiva',
    topic: {
      uz: 'Xivaga poyezd',
      ru: 'Поезд в Хиву',
      ko: '히바로 가는 기차',
    },
    scene: 'sunset',
    narrator: { id: 'timur', name: 'Timur' },
    sentences: [
      {
        id: 's1',
        text: 'In Korea, I took the fast KTX train many times, but I had never travelled across my own country.',
        translation: {
          uz: 'Koreyada tezyurar KTX poyezdida ko‘p marta yurgan edim, lekin o‘z yurtimni hech qachon aylanib chiqmagan edim.',
          ru: 'В Корее я много раз ездил на скоростном KTX, но по своей стране не путешествовал ни разу.',
          ko: '한국에서는 KTX를 수없이 탔지만, 정작 제 나라는 한 번도 여행해 본 적이 없었어요.',
        },
      },
      {
        id: 's2',
        text: 'So last May, I bought four tickets on the Afrosiyob and took my parents and my wife to Khiva.',
        translation: {
          uz: 'Shuning uchun o‘tgan may oyida «Afrosiyob»ga to‘rtta chipta olib, ota-onam va xotinimni Xivaga olib bordim.',
          ru: 'Поэтому в мае я купил четыре билета на «Афросиёб» и повёз родителей и жену в Хиву.',
          ko: '그래서 지난 5월, 아프로시욥 열차표 네 장을 사서 부모님과 아내를 모시고 히바에 갔어요.',
        },
      },
      {
        id: 's3',
        text: 'My father, who is sixty-eight, had never been to Khiva, although he had dreamed about it since school.',
        translation: {
          uz: 'Oltmish sakkiz yoshli otam maktab davridan beri orzu qilgan bo‘lsa ham, Xivada hech qachon bo‘lmagan edi.',
          ru: 'Мой отец, которому шестьдесят восемь, ни разу не был в Хиве, хотя мечтал о ней со школы.',
          ko: '예순여덟이신 아버지는 학창 시절부터 히바를 꿈꾸셨지만 한 번도 가 보신 적이 없었어요.',
        },
      },
      {
        id: 's4',
        text: 'He sat by the window the whole way and watched the cotton fields turn into yellow desert.',
        translation: {
          uz: 'U butun yo‘l deraza yonida o‘tirib, paxta dalalari sariq cho‘lga aylanib borayotganini tomosha qildi.',
          ru: 'Всю дорогу он сидел у окна и смотрел, как хлопковые поля сменяются жёлтой пустыней.',
          ko: '아버지는 가는 내내 창가에 앉아 목화밭이 노란 사막으로 바뀌는 걸 바라보셨어요.',
        },
      },
      {
        id: 's5',
        text: 'My mother, of course, brought a huge bag of bread, fruit and eggs, as if the train had no café.',
        translation: {
          uz: 'Onam, albatta, go‘yo poyezdda kafe yo‘qdek, katta sumkada non, meva va tuxum olib keldi.',
          ru: 'Мама, конечно, взяла огромную сумку с хлебом, фруктами и яйцами, будто в поезде нет кафе.',
          ko: '엄마는 물론 기차에 카페가 없기라도 한 것처럼 빵과 과일, 달걀을 한 보따리 싸 오셨어요.',
        },
      },
      {
        id: 's6',
        text: 'We arrived in the evening, just as the sun was going down behind the old city walls.',
        translation: {
          uz: 'Kechqurun, quyosh qadimiy shahar devorlari ortiga botayotgan paytda yetib keldik.',
          ru: 'Мы приехали вечером, как раз когда солнце садилось за старые городские стены.',
          ko: '우리는 저녁에 도착했는데, 마침 해가 오래된 성벽 너머로 지고 있었어요.',
        },
      },
      {
        id: 's7',
        text: 'The walls turned gold, and my father stopped at the gate and didn’t say a word for a long time.',
        translation: {
          uz: 'Devorlar oltin rangga kirdi, otam esa darvoza oldida to‘xtab, uzoq vaqt bir og‘iz ham gapirmadi.',
          ru: 'Стены стали золотыми, а отец остановился у ворот и долго не говорил ни слова.',
          ko: '성벽이 금빛으로 물들었고, 아버지는 성문 앞에 멈춰 서서 한참 동안 아무 말씀도 없으셨어요.',
        },
      },
      {
        id: 's8',
        text: 'Later, at dinner, he quietly thanked me and said that he had waited fifty years for that moment.',
        translation: {
          uz: 'Keyin kechki ovqat paytida u sekingina menga rahmat aytdi va bu lahzani ellik yil kutganini aytdi.',
          ru: 'Позже, за ужином, он тихо поблагодарил меня и сказал, что ждал этого момента пятьдесят лет.',
          ko: '나중에 저녁을 먹으면서 아버지는 조용히 고맙다고 하시며, 그 순간을 50년 동안 기다리셨다고 했어요.',
        },
      },
      {
        id: 's9',
        text: 'I had sent money home from Korea for seven years, but this gift felt much more important.',
        translation: {
          uz: 'Yetti yil davomida Koreyadan uyga pul jo‘natgan edim, lekin bu sovg‘a ancha muhimroq tuyuldi.',
          ru: 'Семь лет я отправлял домой деньги из Кореи, но этот подарок показался мне гораздо важнее.',
          ko: '7년 동안 한국에서 집으로 돈을 보냈지만, 이 선물이 훨씬 더 소중하게 느껴졌어요.',
        },
      },
      {
        id: 's10',
        text: 'Sometimes the best places are not far away, and the best gift is simply time together.',
        translation: {
          uz: 'Ba’zan eng go‘zal joylar uzoqda emas, eng yaxshi sovg‘a esa shunchaki birga o‘tkazilgan vaqtdir.',
          ru: 'Иногда лучшие места совсем рядом, а лучший подарок — это просто время, проведённое вместе.',
          ko: '가장 좋은 곳은 때로 멀리 있지 않고, 가장 좋은 선물은 그저 함께하는 시간이에요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'dreamed',
        meaning: { uz: 'orzu qilmoq', ru: 'мечтать', ko: '꿈꾸다' },
      },
      {
        word: 'fields',
        meaning: { uz: 'dala', ru: 'поле', ko: '밭, 들판' },
      },
      {
        word: 'desert',
        meaning: { uz: 'cho‘l', ru: 'пустыня', ko: '사막' },
      },
      {
        word: 'huge',
        meaning: { uz: 'juda katta, ulkan', ru: 'огромный', ko: '아주 큰' },
      },
      {
        word: 'gate',
        meaning: { uz: 'darvoza', ru: 'ворота', ko: '대문, 성문' },
      },
      {
        word: 'quietly',
        meaning: { uz: 'sekingina, ohista', ru: 'тихо', ko: '조용히' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'Who went to Khiva with Timur?',
        options: [
          'His friends from Korea',
          'His colleagues',
          'His children',
          'His parents and his wife',
        ],
        answerIndex: 3,
      },
      {
        id: 'q2',
        prompt: 'What did Timur’s mother bring?',
        options: [
          'A camera',
          'Gifts for relatives',
          'A big bag of food',
          'Warm clothes',
        ],
        answerIndex: 2,
      },
      {
        id: 'q3',
        prompt: 'How long had Timur’s father waited for that moment?',
        options: ['Fifty years', 'Seven years', 'Ten years', 'Five years'],
        answerIndex: 0,
      },
    ],
  },
  {
    code: 'en-story-b1-08',
    level: 'B1',
    order: 8,
    title: 'My First Salary',
    topic: {
      uz: 'Ilk maoshim',
      ru: 'Моя первая зарплата',
      ko: '나의 첫 월급',
    },
    scene: 'autumn',
    narrator: { id: 'aziz', name: 'Aziz' },
    sentences: [
      {
        id: 's1',
        text: 'In October, my first salary arrived on my card, and I checked the balance three times.',
        translation: {
          uz: 'Oktyabrda ilk maoshim kartamga tushdi va men balansni uch marta tekshirdim.',
          ru: 'В октябре на карту пришла моя первая зарплата, и я трижды проверил баланс.',
          ko: '10월에 첫 월급이 카드로 들어왔고, 저는 잔액을 세 번이나 확인했어요.',
        },
      },
      {
        id: 's2',
        text: 'For months, I had planned to buy myself new headphones and a good jacket for the winter.',
        translation: {
          uz: 'Bir necha oy davomida o‘zimga yangi quloqchin va qishga yaxshi kurtka olishni rejalashtirgan edim.',
          ru: 'Несколько месяцев я собирался купить себе новые наушники и хорошую куртку на зиму.',
          ko: '몇 달 동안 저는 새 헤드폰과 겨울용 좋은 재킷을 살 계획을 세워 두었어요.',
        },
      },
      {
        id: 's3',
        text: 'But that evening, I noticed my mother washing my father’s shirts by hand in a big basin again.',
        translation: {
          uz: 'Lekin o‘sha kuni kechqurun onamning yana katta tog‘orada otamning ko‘ylaklarini qo‘lda yuvayotganini ko‘rib qoldim.',
          ru: 'Но в тот вечер я увидел, что мама снова стирает папины рубашки руками в большом тазу.',
          ko: '그런데 그날 저녁, 엄마가 또 큰 대야에 아버지 셔츠를 손빨래하시는 모습을 봤어요.',
        },
      },
      {
        id: 's4',
        text: 'Our old washing machine had broken in the summer, and nobody had mentioned it to me.',
        translation: {
          uz: 'Eski kir yuvish mashinamiz yozda buzilgan edi, lekin hech kim menga bu haqda aytmagan edi.',
          ru: 'Наша старая стиральная машина сломалась ещё летом, но мне никто об этом не сказал.',
          ko: '오래된 세탁기가 여름에 고장 났는데, 아무도 저에게 말하지 않았던 거예요.',
        },
      },
      {
        id: 's5',
        text: 'The next Saturday, I took my parents to a big shop in Chilanzar without explaining why.',
        translation: {
          uz: 'Keyingi shanba sababini tushuntirmasdan ota-onamni Chilonzordagi katta do‘konga olib bordim.',
          ru: 'В следующую субботу я, ничего не объясняя, повёз родителей в большой магазин на Чиланзаре.',
          ko: '다음 토요일, 저는 이유도 말하지 않고 부모님을 칠란자르에 있는 큰 가게로 모시고 갔어요.',
        },
      },
      {
        id: 's6',
        text: 'When they realised what I wanted to buy, my mother started arguing that it was too expensive.',
        translation: {
          uz: 'Nima sotib olmoqchi ekanimni tushunishgach, onam bu juda qimmat, deb tortisha boshladi.',
          ru: 'Когда они поняли, что я хочу купить, мама начала спорить, что это слишком дорого.',
          ko: '제가 뭘 사려는지 알아채시자, 엄마는 너무 비싸다며 말리기 시작하셨어요.',
        },
      },
      {
        id: 's7',
        text: 'My father said nothing, but I saw him turn away and wipe his eyes with his hand.',
        translation: {
          uz: 'Otam hech narsa demadi, lekin uning yuzini burib, qo‘li bilan ko‘zlarini artganini ko‘rdim.',
          ru: 'Отец ничего не сказал, но я видел, как он отвернулся и вытер глаза рукой.',
          ko: '아버지는 아무 말씀 없으셨지만, 고개를 돌려 손으로 눈가를 훔치시는 걸 봤어요.',
        },
      },
      {
        id: 's8',
        text: 'The washing machine took almost all of my salary, so I wore my old jacket all winter.',
        translation: {
          uz: 'Kir yuvish mashinasi deyarli butun maoshimni oldi, shuning uchun qish bo‘yi eski kurtkamni kiydim.',
          ru: 'Стиральная машина забрала почти всю зарплату, так что всю зиму я ходил в старой куртке.',
          ko: '세탁기에 월급이 거의 다 들어가서, 저는 겨울 내내 낡은 재킷을 입었어요.',
        },
      },
      {
        id: 's9',
        text: 'Strangely, I didn’t mind at all, because I had never felt so rich before.',
        translation: {
          uz: 'Qizig‘i, bunga sira qayg‘urmadim, chunki ilgari hech qachon o‘zimni bunchalik boy his qilmagan edim.',
          ru: 'Как ни странно, я совсем не жалел, ведь никогда раньше я не чувствовал себя таким богатым.',
          ko: '이상하게도 전혀 아쉽지 않았어요. 그렇게 부자가 된 기분은 처음이었거든요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'salary',
        meaning: { uz: 'maosh', ru: 'зарплата', ko: '월급' },
      },
      {
        word: 'balance',
        meaning: { uz: 'balans, qoldiq', ru: 'баланс, остаток', ko: '잔액' },
      },
      {
        word: 'basin',
        meaning: { uz: 'tog‘ora', ru: 'таз', ko: '대야' },
      },
      {
        word: 'mentioned',
        meaning: { uz: 'aytib o‘tmoq', ru: 'упоминать', ko: '언급하다' },
      },
      {
        word: 'arguing',
        meaning: { uz: 'tortishmoq', ru: 'спорить', ko: '언쟁하다, 우기다' },
      },
      {
        word: 'wipe',
        meaning: { uz: 'artmoq', ru: 'вытирать', ko: '닦다' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'What had Aziz planned to buy for himself?',
        options: ['A new phone', 'A car', 'A watch', 'Headphones and a jacket'],
        answerIndex: 3,
      },
      {
        id: 'q2',
        prompt: 'Why was his mother washing clothes by hand?',
        options: [
          'She liked it',
          'There was no water',
          'The washing machine was broken',
          'The shirts were very old',
        ],
        answerIndex: 2,
      },
      {
        id: 'q3',
        prompt: 'How did Aziz feel after buying the washing machine?',
        options: ['Very rich', 'Angry', 'Sad about the jacket', 'Tired'],
        answerIndex: 0,
      },
    ],
  },
  {
    code: 'en-story-b1-09',
    level: 'B1',
    order: 9,
    title: 'After the Flood',
    topic: {
      uz: 'Suv toshqinidan keyin',
      ru: 'После наводнения',
      ko: '홍수가 지나간 뒤',
    },
    scene: 'rain',
    narrator: { id: 'malika', name: 'Malika' },
    sentences: [
      {
        id: 's1',
        text: 'In March, it rained for four days without stopping, and a small river near Samarkand flooded a village.',
        translation: {
          uz: 'Martda to‘rt kun tinmay yomg‘ir yog‘di, Samarqand yaqinidagi kichik daryo toshib, bir qishloqni suv bosdi.',
          ru: 'В марте четыре дня без остановки шёл дождь, и небольшая река под Самаркандом затопила один кишлак.',
          ko: '3월에 나흘 동안 쉬지 않고 비가 내려서, 사마르칸트 근처의 작은 강이 넘쳐 한 마을이 물에 잠겼어요.',
        },
      },
      {
        id: 's2',
        text: 'Our university asked for volunteers, and the next morning, forty students got on two old buses.',
        translation: {
          uz: 'Universitetimiz ko‘ngillilarni chaqirdi va ertasi kuni ertalab qirq nafar talaba ikkita eski avtobusga o‘tirdi.',
          ru: 'Университет попросил добровольцев, и на следующее утро сорок студентов сели в два старых автобуса.',
          ko: '대학교에서 자원봉사자를 모집했고, 다음 날 아침 학생 40명이 낡은 버스 두 대에 올랐어요.',
        },
      },
      {
        id: 's3',
        text: 'When we arrived, the water had gone, but thick brown mud covered everything inside the houses.',
        translation: {
          uz: 'Yetib borganimizda suv qaytib ketgan edi, lekin uylar ichidagi hamma narsani qalin jigarrang loy qoplagan edi.',
          ru: 'Когда мы приехали, вода уже ушла, но густая бурая грязь покрывала всё в домах.',
          ko: '우리가 도착했을 때 물은 빠져 있었지만, 집 안은 온통 두꺼운 갈색 진흙으로 덮여 있었어요.',
        },
      },
      {
        id: 's4',
        text: 'I worked in the house of an old woman whose carpets, blankets and photos were all ruined.',
        translation: {
          uz: 'Men gilamlari, ko‘rpalari va suratlari butunlay yaroqsiz bo‘lib qolgan bir keksa ayolning uyida ishladim.',
          ru: 'Я работала в доме пожилой женщины, у которой испортились все ковры, одеяла и фотографии.',
          ko: '저는 카펫과 이불, 사진이 모두 망가져 버린 할머니 댁에서 일했어요.',
        },
      },
      {
        id: 's5',
        text: 'We carried out bucket after bucket of mud, and by lunchtime, my arms were shaking.',
        translation: {
          uz: 'Biz chelak-chelak loy tashib chiqdik, tushlikka kelib qo‘llarim qaltiray boshladi.',
          ru: 'Мы выносили ведро за ведром грязи, и к обеду у меня дрожали руки.',
          ko: '우리는 진흙을 한 양동이 한 양동이 퍼 날랐고, 점심때쯤엔 팔이 덜덜 떨렸어요.',
        },
      },
      {
        id: 's6',
        text: 'I expected the old woman to cry, but she kept making tea for us and telling jokes.',
        translation: {
          uz: 'Keksa ayol yig‘laydi deb o‘ylagandim, lekin u bizga choy damlab, hazil qilib turaverdi.',
          ru: 'Я думала, что бабушка будет плакать, но она всё время заваривала нам чай и шутила.',
          ko: '할머니가 우실 줄 알았는데, 할머니는 계속 우리에게 차를 끓여 주시고 농담을 하셨어요.',
        },
      },
      {
        id: 's7',
        text: 'In the afternoon, I found her wedding photo under the bed and carefully dried it by the stove.',
        translation: {
          uz: 'Tushdan keyin karavot tagidan uning to‘y suratini topib oldim va pechka yonida ehtiyotlab quritdim.',
          ru: 'Днём я нашла под кроватью её свадебную фотографию и осторожно высушила её у печки.',
          ko: '오후에 침대 밑에서 할머니의 결혼사진을 찾아서 난로 옆에서 조심스럽게 말렸어요.',
        },
      },
      {
        id: 's8',
        text: 'When I gave it back to her, she held my hands and didn’t let go for a long time.',
        translation: {
          uz: 'Uni qaytarib berganimda, u qo‘llarimni ushlab, uzoq vaqt qo‘yib yubormadi.',
          ru: 'Когда я отдала её, она взяла меня за руки и долго не отпускала.',
          ko: '사진을 돌려드리자, 할머니는 제 손을 꼭 잡고 한참 동안 놓지 않으셨어요.',
        },
      },
      {
        id: 's9',
        text: 'We couldn’t save her carpets, but at least that small piece of her life was safe.',
        translation: {
          uz: 'Gilamlarini qutqara olmadik, lekin hech bo‘lmasa hayotining o‘sha kichik bir bo‘lagi omon qoldi.',
          ru: 'Ковры мы спасти не смогли, но хотя бы этот маленький кусочек её жизни уцелел.',
          ko: '카펫은 구하지 못했지만, 적어도 할머니 인생의 작은 조각 하나는 지켜 냈어요.',
        },
      },
      {
        id: 's10',
        text: 'On the bus home, I was dirty and exhausted, but I felt more useful than ever before.',
        translation: {
          uz: 'Uyga qaytayotgan avtobusda iflos va holdan toygan edim, lekin o‘zimni hech qachon bunchalik foydali his qilmagan edim.',
          ru: 'В автобусе по дороге домой я была грязной и без сил, но чувствовала себя полезной как никогда.',
          ko: '돌아오는 버스 안에서 저는 지저분하고 녹초가 됐지만, 그 어느 때보다 쓸모 있는 사람이 된 기분이었어요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'flooded',
        meaning: { uz: 'suv bosmoq', ru: 'затопить', ko: '물에 잠기게 하다' },
      },
      {
        word: 'volunteers',
        meaning: { uz: 'ko‘ngilli', ru: 'доброволец', ko: '자원봉사자' },
      },
      {
        word: 'mud',
        meaning: { uz: 'loy', ru: 'грязь', ko: '진흙' },
      },
      {
        word: 'ruined',
        meaning: {
          uz: 'yaroqsiz bo‘lmoq, buzilmoq',
          ru: 'испортить',
          ko: '망가지다',
        },
      },
      {
        word: 'carefully',
        meaning: { uz: 'ehtiyotlab', ru: 'осторожно', ko: '조심스럽게' },
      },
      {
        word: 'exhausted',
        meaning: { uz: 'holdan toygan', ru: 'измученный', ko: '녹초가 된' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'Why did the village flood?',
        options: [
          'A dam broke',
          'Snow melted in the mountains',
          'It rained for four days',
          'A water pipe broke',
        ],
        answerIndex: 2,
      },
      {
        id: 'q2',
        prompt: 'What did the old woman do while the students worked?',
        options: [
          'She made tea and told jokes',
          'She cried all day',
          'She went to her son’s house',
          'She slept',
        ],
        answerIndex: 0,
      },
      {
        id: 'q3',
        prompt: 'What did Malika find under the bed?',
        options: ['A box of money', 'A wet carpet', 'A cat', 'A wedding photo'],
        answerIndex: 3,
      },
    ],
  },
  {
    code: 'en-story-b1-10',
    level: 'B1',
    order: 10,
    title: 'When the Lights Went Out',
    topic: {
      uz: 'Chiroq o‘chgan kecha',
      ru: 'Когда погас свет',
      ko: '불이 꺼진 저녁',
    },
    scene: 'night',
    narrator: { id: 'rustam', name: 'Rustam' },
    sentences: [
      {
        id: 's1',
        text: 'Last week, the electricity in our mahalla went out at seven in the evening and didn’t come back for hours.',
        translation: {
          uz: 'O‘tgan hafta mahallamizda kechki soat yettida chiroq o‘chdi va soatlab qaytmadi.',
          ru: 'На прошлой неделе в нашей махалле в семь вечера отключили свет, и его не было несколько часов.',
          ko: '지난주 저녁 7시에 우리 마할라에 전기가 나갔는데, 몇 시간 동안 들어오지 않았어요.',
        },
      },
      {
        id: 's2',
        text: 'My phone was almost dead, so I couldn’t make my usual evening call to my granddaughter in Canada.',
        translation: {
          uz: 'Telefonimning quvvati deyarli tugagan edi, shuning uchun Kanadadagi nevaramga odatdagi kechki qo‘ng‘irog‘imni qila olmadim.',
          ru: 'Телефон почти сел, и я не смог, как обычно вечером, позвонить внучке в Канаду.',
          ko: '휴대폰 배터리가 거의 다 돼서, 캐나다에 있는 손녀에게 늘 하던 저녁 전화를 못 했어요.',
        },
      },
      {
        id: 's3',
        text: 'I found an old candle in the kitchen, and my dog Bobik lay down next to me, a little worried.',
        translation: {
          uz: 'Oshxonadan eski sham topdim, itim Bobik esa biroz xavotirlanib yonimga yotdi.',
          ru: 'Я нашёл на кухне старую свечу, а мой пёс Бобик, немного встревоженный, улёгся рядом.',
          ko: '부엌에서 오래된 초를 찾았고, 우리 개 보빅은 조금 불안한 듯 제 옆에 누웠어요.',
        },
      },
      {
        id: 's4',
        text: 'Then I heard voices outside, so I put on my coat and went out to the street.',
        translation: {
          uz: 'Keyin tashqarida ovozlar eshitdim, paltomni kiyib, ko‘chaga chiqdim.',
          ru: 'Потом я услышал снаружи голоса, надел пальто и вышел на улицу.',
          ko: '그러다 밖에서 사람들 목소리가 들려서, 외투를 입고 길로 나갔어요.',
        },
      },
      {
        id: 's5',
        text: 'My neighbours had made a small fire, and somebody had brought a big teapot and some bread.',
        translation: {
          uz: 'Qo‘shnilarim kichkina gulxan yoqishgan, kimdir esa katta choynak va non olib chiqqan ekan.',
          ru: 'Соседи развели небольшой костёр, а кто-то вынес большой чайник и хлеб.',
          ko: '이웃들이 작은 모닥불을 피워 놓았고, 누군가 큰 찻주전자와 빵을 가지고 나왔더라고요.',
        },
      },
      {
        id: 's6',
        text: 'The children, who usually stare at their phones all evening, were running around and laughing in the dark.',
        translation: {
          uz: 'Odatda kechqurun bo‘yi telefonlariga tikilib o‘tiradigan bolalar qorong‘ida yugurib, kulishardi.',
          ru: 'Дети, которые обычно весь вечер смотрят в телефоны, бегали в темноте и смеялись.',
          ko: '평소에는 저녁 내내 휴대폰만 보던 아이들이 어둠 속에서 뛰어다니며 웃고 있었어요.',
        },
      },
      {
        id: 's7',
        text: 'One boy asked me what we did in the evenings when I was young and there was no internet.',
        translation: {
          uz: 'Bir bola mendan yoshligimda, internet yo‘q paytda kechqurunlari nima qilganimizni so‘radi.',
          ru: 'Один мальчик спросил меня, чем мы занимались по вечерам, когда я был молодым и не было интернета.',
          ko: '한 아이가 제가 젊었을 때 인터넷도 없던 시절에는 저녁마다 뭘 했느냐고 물었어요.',
        },
      },
      {
        id: 's8',
        text: 'So I told them about the summer cinema of my youth, where we watched films on a white wall.',
        translation: {
          uz: 'Shunda ularga yoshligimdagi yozgi kinoteatr haqida gapirib berdim, u yerda filmlarni oq devorda tomosha qilardik.',
          ru: 'И я рассказал им о летнем кинотеатре моей молодости, где мы смотрели фильмы на белой стене.',
          ko: '그래서 아이들에게 젊은 시절 여름 극장 이야기를 해 줬어요. 하얀 벽에 영화를 비춰 보던 곳이었죠.',
        },
      },
      {
        id: 's9',
        text: 'When the lights came back at eleven, nobody was happy, and nobody wanted to go home first.',
        translation: {
          uz: 'Soat o‘n birda chiroq qaytganida hech kim xursand bo‘lmadi va hech kim birinchi bo‘lib uyga ketishni xohlamadi.',
          ru: 'Когда в одиннадцать дали свет, никто не обрадовался, и никто не хотел уходить домой первым.',
          ko: '11시에 전기가 들어왔을 때 아무도 기뻐하지 않았고, 아무도 먼저 집에 가고 싶어 하지 않았어요.',
        },
      },
      {
        id: 's10',
        text: 'I have lived on this street for forty years, but that dark evening, I really met my neighbours.',
        translation: {
          uz: 'Bu ko‘chada qirq yildan beri yashayman, lekin qo‘shnilarim bilan chinakamiga o‘sha qorong‘i kechada tanishdim.',
          ru: 'Я живу на этой улице сорок лет, но по-настоящему познакомился с соседями только в тот тёмный вечер.',
          ko: '저는 이 동네에서 40년을 살았지만, 그 어두운 저녁에야 비로소 이웃들을 제대로 알게 됐어요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'electricity',
        meaning: { uz: 'elektr, tok', ru: 'электричество', ko: '전기' },
      },
      {
        word: 'candle',
        meaning: { uz: 'sham', ru: 'свеча', ko: '초, 양초' },
      },
      {
        word: 'worried',
        meaning: { uz: 'xavotirli', ru: 'встревоженный', ko: '걱정하는' },
      },
      {
        word: 'teapot',
        meaning: { uz: 'choynak', ru: 'заварочный чайник', ko: '찻주전자' },
      },
      {
        word: 'stare',
        meaning: {
          uz: 'tikilmoq',
          ru: 'пристально смотреть',
          ko: '빤히 쳐다보다',
        },
      },
      {
        word: 'youth',
        meaning: { uz: 'yoshlik', ru: 'молодость', ko: '젊은 시절' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'Why couldn’t Rustam call his granddaughter?',
        options: [
          'She was asleep',
          'His phone was almost dead',
          'He forgot her number',
          'The internet was slow',
        ],
        answerIndex: 1,
      },
      {
        id: 'q2',
        prompt: 'What were the children doing outside?',
        options: [
          'Watching films',
          'Doing homework',
          'Running and laughing',
          'Looking at their phones',
        ],
        answerIndex: 2,
      },
      {
        id: 'q3',
        prompt: 'What happened when the lights came back?',
        options: [
          'Everybody cheered and ran home',
          'The children were scared',
          'Rustam called Canada',
          'Nobody wanted to go home first',
        ],
        answerIndex: 3,
      },
    ],
  },
];
