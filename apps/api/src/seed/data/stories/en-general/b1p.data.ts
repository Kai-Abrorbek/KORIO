import type { StorySeed } from '../../../../stories/story-content.util';

/** 영어 듣기 이야기 B1+. 규칙은 a1.data.ts 맨 위 주석 참고 */
export const EN_GENERAL_B1P: StorySeed[] = [
  {
    code: 'en-story-b1p-01',
    level: 'B1+',
    order: 1,
    title: 'Far From Home',
    topic: {
      uz: 'Uydan uzoqda',
      ru: 'Вдали от дома',
      ko: '집에서 먼 곳',
    },
    scene: 'snow',
    narrator: { id: 'timur', name: 'Timur' },
    sentences: [
      {
        id: 's1',
        text: 'I spent seven years working at a car parts factory in Ansan, a grey industrial city near Seoul.',
        translation: {
          uz: 'Yetti yil Seul yaqinidagi kulrang sanoat shahri Ansandagi avtomobil ehtiyot qismlari zavodida ishladim.',
          ru: 'Семь лет я проработал на заводе автозапчастей в Ансане — сером промышленном городе под Сеулом.',
          ko: '저는 서울 근처의 회색빛 공업 도시 안산에서 자동차 부품 공장에 7년 동안 다녔어요.',
        },
      },
      {
        id: 's2',
        text: 'People at home often think that life in Korea is easy, but they have never worked twelve-hour night shifts.',
        translation: {
          uz: 'Yurtdagilar ko‘pincha Koreyada hayot oson deb o‘ylashadi, lekin ular hech qachon o‘n ikki soatlik tungi smenada ishlab ko‘rmagan.',
          ru: 'Дома часто думают, что в Корее жизнь лёгкая, но они никогда не работали по двенадцать часов в ночную смену.',
          ko: '고향 사람들은 흔히 한국 생활이 편하다고 생각하지만, 12시간 야간 근무를 해 본 적은 없잖아요.',
        },
      },
      {
        id: 's3',
        text: 'My daughter was born during my second year there, and I first saw her face on a tiny phone screen.',
        translation: {
          uz: 'Qizim u yerdagi ikkinchi yilimda tug‘ildi va men uning yuzini ilk bor kichkina telefon ekranida ko‘rdim.',
          ru: 'Дочь родилась на второй год, и её лицо я впервые увидел на крошечном экране телефона.',
          ko: '딸은 제가 거기 간 지 2년째에 태어났고, 저는 딸의 얼굴을 작은 휴대폰 화면으로 처음 봤어요.',
        },
      },
      {
        id: 's4',
        text: 'Every evening after my shift, my wife held the phone up so that I could watch her sleeping.',
        translation: {
          uz: 'Har kuni kechqurun smenamdan keyin xotinim telefonni ko‘tarib turardi, men esa qizimning uxlayotganini tomosha qilardim.',
          ru: 'Каждый вечер после смены жена держала телефон так, чтобы я мог смотреть, как дочка спит.',
          ko: '매일 저녁 근무가 끝나면, 아내가 휴대폰을 들어 잠든 딸을 보여 주곤 했어요.',
        },
      },
      {
        id: 's5',
        text: 'I remember the first snow of my fourth winter, when I was walking back to the dormitory completely alone.',
        translation: {
          uz: 'To‘rtinchi qishimdagi birinchi qorni eslayman, o‘shanda yotoqxonaga butunlay yolg‘iz qaytayotgan edim.',
          ru: 'Я помню первый снег моей четвёртой зимы, когда я возвращался в общежитие совсем один.',
          ko: '네 번째 겨울의 첫눈이 기억나요. 그때 저는 완전히 혼자서 기숙사로 걸어 돌아가고 있었어요.',
        },
      },
      {
        id: 's6',
        text: 'My wife had just told me on the phone that our daughter had said her first full sentence.',
        translation: {
          uz: 'Xotinim hozirgina telefonda qizimiz ilk bor to‘liq gap aytganini aytgan edi.',
          ru: 'Жена только что сказала мне по телефону, что дочь произнесла своё первое целое предложение.',
          ko: '아내가 방금 전화로 딸이 처음으로 온전한 문장을 말했다고 알려 줬거든요.',
        },
      },
      {
        id: 's7',
        text: 'I stood under a streetlight in the snow and realised that I was missing everything that really mattered.',
        translation: {
          uz: 'Qor ostida ko‘cha chirog‘i yonida turib, haqiqatan muhim bo‘lgan hamma narsani o‘tkazib yuborayotganimni angladim.',
          ru: 'Я стоял под фонарём в снегу и понял, что пропускаю всё, что действительно важно.',
          ko: '눈 속에서 가로등 아래 서 있다가, 정말 중요한 걸 전부 놓치고 있다는 걸 깨달았어요.',
        },
      },
      {
        id: 's8',
        text: 'If we hadn’t needed the money for our house, I would have flown home the next morning.',
        translation: {
          uz: 'Agar uyimiz uchun pul kerak bo‘lmaganida, ertasi kuni ertalab uyga uchib ketgan bo‘lardim.',
          ru: 'Если бы нам не нужны были деньги на дом, я бы улетел домой на следующее же утро.',
          ko: '집 지을 돈이 필요하지 않았다면, 저는 다음 날 아침 바로 고향으로 날아갔을 거예요.',
        },
      },
      {
        id: 's9',
        text: 'I stayed three more years, finished the house and saved enough to start my own small business.',
        translation: {
          uz: 'Yana uch yil qoldim, uyni bitkazdim va o‘z kichik biznesimni boshlashga yetarli pul yig‘dim.',
          ru: 'Я остался ещё на три года, достроил дом и накопил достаточно, чтобы открыть своё небольшое дело.',
          ko: '저는 3년을 더 머물면서 집을 다 지었고, 작은 사업을 시작할 만큼 돈을 모았어요.',
        },
      },
      {
        id: 's10',
        text: 'Now my daughter is nine, and she sometimes asks me why I missed so many of her birthdays.',
        translation: {
          uz: 'Hozir qizim to‘qqiz yoshda, ba’zan u mendan nega uning shuncha tug‘ilgan kunini o‘tkazib yuborganimni so‘raydi.',
          ru: 'Сейчас дочери девять, и иногда она спрашивает, почему я пропустил так много её дней рождения.',
          ko: '이제 딸은 아홉 살이 됐고, 가끔 왜 자기 생일을 그렇게 많이 놓쳤냐고 물어요.',
        },
      },
      {
        id: 's11',
        text: 'I’ve never found a perfect answer, but I hug her a little longer every single morning.',
        translation: {
          uz: 'Men hali ham mukammal javob topa olmadim, lekin har kuni ertalab uni biroz uzoqroq quchoqlayman.',
          ru: 'Идеального ответа я так и не нашёл, но каждое утро обнимаю её чуть дольше.',
          ko: '아직 완벽한 대답은 찾지 못했지만, 매일 아침 딸을 조금 더 오래 안아 줘요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'factory',
        meaning: { uz: 'zavod, fabrika', ru: 'завод', ko: '공장' },
      },
      {
        word: 'shifts',
        meaning: { uz: 'smena', ru: 'смена', ko: '교대 근무' },
      },
      {
        word: 'dormitory',
        meaning: { uz: 'yotoqxona', ru: 'общежитие', ko: '기숙사' },
      },
      {
        word: 'streetlight',
        meaning: { uz: 'ko‘cha chirog‘i', ru: 'фонарь', ko: '가로등' },
      },
      {
        word: 'mattered',
        meaning: {
          uz: 'muhim bo‘lmoq',
          ru: 'иметь значение',
          ko: '중요하다',
        },
      },
      {
        word: 'saved',
        meaning: { uz: 'pul yig‘moq', ru: 'копить', ko: '모으다, 저축하다' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'What did Timur do in Korea?',
        options: [
          'He worked at a car parts factory',
          'He studied at a university',
          'He drove a taxi',
          'He worked in a restaurant',
        ],
        answerIndex: 0,
      },
      {
        id: 'q2',
        prompt:
          'What news did his wife give him on the night of the first snow?',
        options: [
          'She had found a new job',
          'Their house was finished',
          'Their daughter had said her first full sentence',
          'Their daughter was ill',
        ],
        answerIndex: 2,
      },
      {
        id: 'q3',
        prompt: 'Why didn’t he fly home the next morning?',
        options: [
          'He was afraid of flying',
          'His boss didn’t allow it',
          'He wanted to see more of Korea',
          'They needed money for their house',
        ],
        answerIndex: 3,
      },
    ],
  },
  {
    code: 'en-story-b1p-02',
    level: 'B1+',
    order: 2,
    title: 'A Shop on Telegram',
    topic: {
      uz: 'Telegramdagi do‘kon',
      ru: 'Магазин в Telegram',
      ko: '텔레그램 속 작은 가게',
    },
    scene: 'night',
    narrator: { id: 'kamola', name: 'Kamola' },
    sentences: [
      {
        id: 's1',
        text: 'Last spring, I opened a small online shop on Telegram to sell the cushion covers my mother embroiders.',
        translation: {
          uz: 'O‘tgan bahorda onam kashta tikadigan yostiq jildlarini sotish uchun Telegramda kichik onlayn do‘kon ochdim.',
          ru: 'Прошлой весной я открыла небольшой онлайн-магазин в Telegram, чтобы продавать наволочки для подушек, которые вышивает мама.',
          ko: '지난봄, 저는 엄마가 수놓은 쿠션 커버를 팔려고 텔레그램에 작은 온라인 가게를 열었어요.',
        },
      },
      {
        id: 's2',
        text: 'I’m an IT specialist, so I thought that building a bot and a channel would be the easy part.',
        translation: {
          uz: 'Men IT mutaxassisiman, shuning uchun bot va kanal yaratish eng oson qismi bo‘ladi, deb o‘ylagandim.',
          ru: 'Я IT-специалист, поэтому думала, что сделать бота и канал — это самое простое.',
          ko: '저는 IT 일을 하니까 봇이랑 채널을 만드는 건 쉬운 부분일 거라고 생각했어요.',
        },
      },
      {
        id: 's3',
        text: 'It was, but for the first three weeks, nobody ordered anything, and my mother stopped asking about it.',
        translation: {
          uz: 'Shunday bo‘ldi ham, lekin dastlabki uch hafta hech kim hech narsa buyurtma qilmadi, onam esa bu haqda so‘ramay qo‘ydi.',
          ru: 'Так и было, но первые три недели никто ничего не заказал, и мама перестала об этом спрашивать.',
          ko: '실제로 그건 쉬웠지만, 처음 3주 동안은 아무도 주문하지 않았고, 엄마도 더는 묻지 않으셨어요.',
        },
      },
      {
        id: 's4',
        text: 'One night, I filmed her hands working with a needle under the lamp and posted the video without any text.',
        translation: {
          uz: 'Bir kechasi chiroq ostida igna bilan ishlayotgan qo‘llarini videoga olib, uni hech qanday matnsiz joyladim.',
          ru: 'Однажды ночью я сняла, как её руки работают иглой под лампой, и выложила видео без всякого текста.',
          ko: '어느 날 밤, 저는 등불 아래에서 바늘을 움직이는 엄마의 손을 찍어서 아무 글 없이 영상으로 올렸어요.',
        },
      },
      {
        id: 's5',
        text: 'By morning, it had been shared hundreds of times, and I had forty-two new orders from all over Uzbekistan.',
        translation: {
          uz: 'Ertalabgacha u yuzlab marta ulashilgan edi va menda butun O‘zbekiston bo‘ylab qirq ikkita yangi buyurtma bor edi.',
          ru: 'К утру им поделились сотни раз, и у меня было сорок два новых заказа со всего Узбекистана.',
          ko: '아침이 되자 영상은 수백 번 공유됐고, 우즈베키스탄 전국에서 새 주문이 마흔두 건이나 들어와 있었어요.',
        },
      },
      {
        id: 's6',
        text: 'Since then, I’ve learned to pack parcels at midnight, answer angry messages politely and count every som.',
        translation: {
          uz: 'O‘shandan beri yarim tunda posilka qadoqlashni, jahldor xabarlarga xushmuomalalik bilan javob berishni va har bir so‘mni hisoblashni o‘rgandim.',
          ru: 'С тех пор я научилась упаковывать посылки в полночь, вежливо отвечать на злые сообщения и считать каждый сум.',
          ko: '그 뒤로 저는 한밤중에 택배를 포장하는 법, 화난 메시지에 정중하게 답하는 법, 한 푼까지 계산하는 법을 배웠어요.',
        },
      },
      {
        id: 's7',
        text: 'Once, a woman from Namangan wrote that the colour of her cover was different from the photo.',
        translation: {
          uz: 'Bir safar namanganlik bir ayol yostiq jildining rangi suratdagidan farq qilishini yozdi.',
          ru: 'Как-то женщина из Намангана написала, что цвет её наволочки отличается от фотографии.',
          ko: '한번은 나망간에 사는 한 여성이 쿠션 커버 색이 사진과 다르다고 메시지를 보냈어요.',
        },
      },
      {
        id: 's8',
        text: 'I told her that if she sent it back, I would return all her money, including the delivery.',
        translation: {
          uz: 'Men unga, agar qaytarib yuborsa, butun pulini yetkazib berish narxi bilan birga qaytarishimni aytdim.',
          ru: 'Я ответила, что если она отправит её обратно, я верну все деньги, включая доставку.',
          ko: '저는 반품해 주시면 배송비까지 전부 환불해 드리겠다고 답했어요.',
        },
      },
      {
        id: 's9',
        text: 'She kept the cover, and since then, she has ordered six more as gifts for her daughters-in-law.',
        translation: {
          uz: 'U jildni qaytarmadi va o‘shandan beri kelinlariga sovg‘a uchun yana oltitasini buyurtma qildi.',
          ru: 'Она оставила наволочку себе и с тех пор заказала ещё шесть — в подарок невесткам.',
          ko: '그분은 커버를 그냥 가지셨고, 그 뒤로 며느리들 선물로 여섯 개를 더 주문하셨어요.',
        },
      },
      {
        id: 's10',
        text: 'The money isn’t big yet, but at every wedding, my mother proudly tells people that she has customers in every region.',
        translation: {
          uz: 'Pul hali katta emas, lekin onam har bir to‘yda har bir viloyatda xaridorlari borligini faxr bilan aytib yuradi.',
          ru: 'Денег пока немного, но на каждой свадьбе мама с гордостью рассказывает, что у неё есть покупатели в каждой области.',
          ko: '아직 큰돈은 아니지만, 엄마는 결혼식에 갈 때마다 전국 모든 지역에 손님이 있다고 자랑스럽게 말씀하세요.',
        },
      },
      {
        id: 's11',
        text: 'I’ve built many apps for other people, but this is the first project that has made someone I love feel proud.',
        translation: {
          uz: 'Men boshqalar uchun ko‘plab ilovalar yaratganman, lekin bu men yaxshi ko‘rgan insonni faxrlantirgan birinchi loyiham.',
          ru: 'Я сделала много приложений для других людей, но это первый проект, которым гордится самый близкий мне человек.',
          ko: '다른 사람들을 위해 앱을 많이 만들어 봤지만, 사랑하는 사람을 자랑스럽게 만든 프로젝트는 이번이 처음이에요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'embroiders',
        meaning: { uz: 'kashta tikmoq', ru: 'вышивать', ko: '수놓다' },
      },
      {
        word: 'needle',
        meaning: { uz: 'igna', ru: 'игла', ko: '바늘' },
      },
      {
        word: 'shared',
        meaning: {
          uz: 'ulashmoq',
          ru: 'делиться, репостить',
          ko: '공유하다',
        },
      },
      {
        word: 'parcels',
        meaning: { uz: 'posilka', ru: 'посылка', ko: '소포, 택배' },
      },
      {
        word: 'politely',
        meaning: {
          uz: 'xushmuomalalik bilan',
          ru: 'вежливо',
          ko: '정중하게',
        },
      },
      {
        word: 'proudly',
        meaning: { uz: 'faxr bilan', ru: 'с гордостью', ko: '자랑스럽게' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'What does Kamola’s shop sell?',
        options: [
          'Phone cases',
          'Cushion covers her mother embroiders',
          'Homemade jam',
          'Children’s clothes',
        ],
        answerIndex: 1,
      },
      {
        id: 'q2',
        prompt: 'What happened after she posted the video?',
        options: [
          'Nobody watched it',
          'Her mother was angry',
          'Telegram blocked her channel',
          'She got forty-two new orders',
        ],
        answerIndex: 3,
      },
      {
        id: 'q3',
        prompt: 'What did the woman from Namangan do in the end?',
        options: [
          'She kept the cover and ordered six more',
          'She sent the cover back',
          'She wrote an angry review',
          'She asked for a discount',
        ],
        answerIndex: 0,
      },
    ],
  },
  {
    code: 'en-story-b1p-03',
    level: 'B1+',
    order: 3,
    title: 'The Neighbour Who Never Said Hello',
    topic: {
      uz: 'Salom bermaydigan qo‘shni',
      ru: 'Соседка, которая не здоровалась',
      ko: '인사하지 않던 이웃',
    },
    scene: 'autumn',
    narrator: { id: 'dilnoza', name: 'Dilnoza' },
    sentences: [
      {
        id: 's1',
        text: 'When a young family moved into the flat across from ours in September, I was glad to have new neighbours.',
        translation: {
          uz: 'Sentyabrda ro‘paramizdagi kvartiraga yosh oila ko‘chib kelganida, yangi qo‘shnilarimiz bo‘lganidan xursand bo‘ldim.',
          ru: 'Когда в сентябре в квартиру напротив въехала молодая семья, я обрадовалась новым соседям.',
          ko: '9월에 맞은편 집에 젊은 가족이 이사 왔을 때, 저는 새 이웃이 생겨서 반가웠어요.',
        },
      },
      {
        id: 's2',
        text: 'I baked a plate of cookies for them, but the woman only nodded, took the plate and closed the door.',
        translation: {
          uz: 'Ular uchun bir likopcha pechenye pishirdim, lekin ayol faqat bosh irg‘ab, likopchani oldi-yu, eshikni yopdi.',
          ru: 'Я испекла для них тарелку печенья, но женщина лишь кивнула, взяла тарелку и закрыла дверь.',
          ko: '쿠키를 한 접시 구워 갔는데, 그 여자분은 고개만 끄덕이고 접시를 받아 문을 닫았어요.',
        },
      },
      {
        id: 's3',
        text: 'After that, whenever I said hello to her in the stairwell, she just walked past without a word.',
        translation: {
          uz: 'Shundan keyin zinapoyada unga salom berganimda, u indamay yonimdan o‘tib ketaverdi.',
          ru: 'После этого, когда я здоровалась с ней на лестнице, она просто молча проходила мимо.',
          ko: '그 뒤로 계단에서 인사를 할 때마다, 그분은 아무 말 없이 그냥 지나쳐 갔어요.',
        },
      },
      {
        id: 's4',
        text: 'I complained to my husband that people in the city have forgotten how to be good neighbours.',
        translation: {
          uz: 'Erimga shahardagi odamlar yaxshi qo‘shni bo‘lishni unutib qo‘yishgan, deb nolidim.',
          ru: 'Я жаловалась мужу, что люди в городе разучились быть хорошими соседями.',
          ko: '저는 남편에게 도시 사람들은 좋은 이웃이 되는 법을 잊어버렸다고 불평했어요.',
        },
      },
      {
        id: 's5',
        text: 'He said that maybe she was just shy, but I was sure that she didn’t like us for some reason.',
        translation: {
          uz: 'U balki u shunchaki uyatchandir, dedi, lekin men u bizni negadir yoqtirmaydi, deb ishonardim.',
          ru: 'Он сказал, что она, может быть, просто стеснительная, но я была уверена, что мы ей почему-то не нравимся.',
          ko: '남편은 그냥 수줍음이 많은 걸 수도 있다고 했지만, 저는 그분이 무슨 이유에선지 우리를 싫어한다고 확신했어요.',
        },
      },
      {
        id: 's6',
        text: 'One afternoon in October, my son fell off his bike in the yard and cut his knee quite badly.',
        translation: {
          uz: 'Oktyabrdagi bir kuni tushdan keyin o‘g‘lim hovlida velosipeddan yiqilib, tizzasini ancha qattiq yorib oldi.',
          ru: 'Однажды октябрьским днём мой сын упал с велосипеда во дворе и довольно сильно разбил колено.',
          ko: '10월의 어느 오후, 아들이 마당에서 자전거를 타다 넘어져 무릎을 꽤 심하게 다쳤어요.',
        },
      },
      {
        id: 's7',
        text: 'Before I could even get downstairs, the neighbour was already there, cleaning the wound and calming him with gentle gestures.',
        translation: {
          uz: 'Men pastga tushib ulgurmasimdan, qo‘shni ayol allaqachon o‘sha yerda bo‘lib, yarani tozalar va mayin imo-ishoralar bilan uni tinchlantirardi.',
          ru: 'Не успела я спуститься, как соседка уже была там: промывала рану и успокаивала его мягкими жестами.',
          ko: '제가 아래층으로 내려가기도 전에, 이웃이 벌써 와서 상처를 닦아 주며 부드러운 손짓으로 아들을 달래고 있었어요.',
        },
      },
      {
        id: 's8',
        text: 'Later, her husband explained that she had been deaf since childhood and couldn’t hear anyone in the stairwell.',
        translation: {
          uz: 'Keyinroq eri u bolaligidan kar ekanini va zinapoyada hech kimni eshitmasligini tushuntirdi.',
          ru: 'Потом её муж объяснил, что она с детства не слышит и просто не слышала никого на лестнице.',
          ko: '나중에 그분 남편이, 아내는 어릴 때부터 귀가 들리지 않아서 계단에서 누가 인사해도 듣지 못했다고 설명해 줬어요.',
        },
      },
      {
        id: 's9',
        text: 'I felt so ashamed that I couldn’t look at her for a moment, although she was smiling at me warmly.',
        translation: {
          uz: 'Shunchalik uyaldimki, u menga iliq jilmayib turgan bo‘lsa ham, bir lahza uning yuziga qaray olmadim.',
          ru: 'Мне стало так стыдно, что я на мгновение не могла на неё смотреть, хотя она тепло мне улыбалась.',
          ko: '너무 부끄러워서, 그분이 저를 보며 따뜻하게 웃고 있는데도 잠깐 얼굴을 볼 수가 없었어요.',
        },
      },
      {
        id: 's10',
        text: 'Since then, we’ve become good friends, and she has taught my son and me some simple signs.',
        translation: {
          uz: 'O‘shandan beri qadrdon bo‘lib qoldik, u menga va o‘g‘limga bir nechta oddiy imo-ishoralarni o‘rgatdi.',
          ru: 'С тех пор мы подружились, и она научила нас с сыном нескольким простым жестам.',
          ko: '그 뒤로 우리는 좋은 친구가 됐고, 그분은 저와 아들에게 간단한 수어 몇 개를 가르쳐 줬어요.',
        },
      },
      {
        id: 's11',
        text: 'If I had knocked on her door again instead of complaining, I would have understood much sooner.',
        translation: {
          uz: 'Agar nolish o‘rniga yana bir bor eshigini taqillatganimda, buni ancha oldinroq tushungan bo‘lardim.',
          ru: 'Если бы я снова постучала к ней в дверь, а не жаловалась, я бы поняла всё гораздо раньше.',
          ko: '불평하는 대신 그 집 문을 한 번 더 두드렸다면, 훨씬 더 일찍 알았을 거예요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'nodded',
        meaning: { uz: 'bosh irg‘amoq', ru: 'кивать', ko: '고개를 끄덕이다' },
      },
      {
        word: 'stairwell',
        meaning: {
          uz: 'zinapoya',
          ru: 'лестничная клетка',
          ko: '계단, 계단통',
        },
      },
      {
        word: 'complained',
        meaning: {
          uz: 'nolimoq, shikoyat qilmoq',
          ru: 'жаловаться',
          ko: '불평하다',
        },
      },
      {
        word: 'shy',
        meaning: { uz: 'uyatchan', ru: 'стеснительный', ko: '수줍은' },
      },
      {
        word: 'deaf',
        meaning: { uz: 'kar', ru: 'глухой', ko: '귀가 들리지 않는' },
      },
      {
        word: 'ashamed',
        meaning: { uz: 'uyalgan', ru: 'пристыженный', ko: '부끄러운' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'What did Dilnoza bring the new neighbours?',
        options: [
          'Some flowers',
          'A cake',
          'A plate of cookies',
          'A bag of fruit',
        ],
        answerIndex: 2,
      },
      {
        id: 'q2',
        prompt: 'Why didn’t the neighbour say hello?',
        options: [
          'She was deaf',
          'She was angry with Dilnoza',
          'She didn’t speak Uzbek',
          'She was always in a hurry',
        ],
        answerIndex: 0,
      },
      {
        id: 'q3',
        prompt: 'What has the neighbour taught Dilnoza and her son?',
        options: [
          'How to bake bread',
          'How to ride a bike',
          'Some English words',
          'Some simple signs',
        ],
        answerIndex: 3,
      },
    ],
  },
  {
    code: 'en-story-b1p-04',
    level: 'B1+',
    order: 4,
    title: 'The Retake',
    topic: {
      uz: 'Qayta topshirish',
      ru: 'Пересдача',
      ko: '재시험',
    },
    scene: 'spring',
    narrator: { id: 'jasur', name: 'Jasur' },
    sentences: [
      {
        id: 's1',
        text: 'In January, I failed my higher mathematics exam, and it was the first time I had ever failed anything.',
        translation: {
          uz: 'Yanvarda oliy matematika imtihonidan yiqildim va bu hayotimda biror narsadan birinchi marta yiqilishim edi.',
          ru: 'В январе я завалил экзамен по высшей математике — впервые в жизни я что-то провалил.',
          ko: '1월에 저는 고등수학 시험에서 떨어졌는데, 무언가에 실패한 건 그게 처음이었어요.',
        },
      },
      {
        id: 's2',
        text: 'At school, I had always been one of the best students, so I honestly believed I could pass without much effort.',
        translation: {
          uz: 'Maktabda doim eng yaxshi o‘quvchilardan biri bo‘lganman, shuning uchun ortiqcha harakatsiz o‘ta olaman, deb chin dildan ishonardim.',
          ru: 'В школе я всегда был одним из лучших, поэтому честно верил, что сдам без особых усилий.',
          ko: '학교 다닐 때는 늘 우등생이었기 때문에, 별로 노력하지 않아도 붙을 거라고 진심으로 믿었어요.',
        },
      },
      {
        id: 's3',
        text: 'Instead of studying, I had spent most evenings delivering food on my bike and playing games until three in the morning.',
        translation: {
          uz: 'O‘qish o‘rniga kechqurunlarimning ko‘pini velosipedda ovqat yetkazib berish va tungi soat uchgacha o‘yin o‘ynash bilan o‘tkazgandim.',
          ru: 'Вместо учёбы я почти все вечера развозил еду на велосипеде и играл в игры до трёх ночи.',
          ko: '공부 대신 저녁 대부분을 자전거로 음식 배달을 하고, 새벽 3시까지 게임을 하며 보냈거든요.',
        },
      },
      {
        id: 's4',
        text: 'When I saw my score on the list, I felt sick and walked around the campus for an hour.',
        translation: {
          uz: 'Ro‘yxatda balimni ko‘rganimda ko‘nglim aynib ketdi va bir soat universitet hovlisida aylanib yurdim.',
          ru: 'Увидев свой балл в списке, я почувствовал себя плохо и целый час бродил по кампусу.',
          ko: '명단에서 제 점수를 봤을 때 속이 울렁거려서, 한 시간 동안 캠퍼스를 걸어 다녔어요.',
        },
      },
      {
        id: 's5',
        text: 'The professor told me that I could retake it in March, but if I failed again, I would lose my grant.',
        translation: {
          uz: 'Professor uni martda qayta topshirishim mumkinligini, lekin yana yiqilsam, grantimdan ayrilishimni aytdi.',
          ru: 'Профессор сказал, что я могу пересдать в марте, но если снова провалю, то потеряю грант.',
          ko: '교수님은 3월에 재시험을 볼 수 있지만, 또 떨어지면 장학금을 잃게 될 거라고 하셨어요.',
        },
      },
      {
        id: 's6',
        text: 'I couldn’t tell my parents, because they had told the whole family how proud they were of me.',
        translation: {
          uz: 'Ota-onamga ayta olmadim, chunki ular butun qarindoshlarga mendan qanchalik faxrlanishlarini aytib bo‘lishgan edi.',
          ru: 'Родителям я сказать не мог: они уже всей родне рассказали, как гордятся мной.',
          ko: '부모님께는 말할 수 없었어요. 온 친척들에게 제가 얼마나 자랑스러운지 이미 다 말씀하셨거든요.',
        },
      },
      {
        id: 's7',
        text: 'So I asked Nilufar, the quietest girl in our group, to help me, and she agreed on one condition.',
        translation: {
          uz: 'Shuning uchun guruhimizdagi eng kamgap qiz Nilufardan yordam so‘radim, u bir shart bilan rozi bo‘ldi.',
          ru: 'Тогда я попросил помочь Нилуфар, самую тихую девушку в нашей группе, и она согласилась с одним условием.',
          ko: '그래서 우리 과에서 제일 조용한 닐루파르에게 도와 달라고 했고, 그녀는 조건 하나를 걸고 승낙했어요.',
        },
      },
      {
        id: 's8',
        text: 'Every evening in the library, I had to give her my phone until we had finished all the problems.',
        translation: {
          uz: 'Har kuni kechqurun kutubxonada barcha masalalarni yechib bo‘lmagunimizcha telefonimni unga berib qo‘yishim kerak edi.',
          ru: 'Каждый вечер в библиотеке я должен был отдавать ей телефон, пока мы не решим все задачи.',
          ko: '매일 저녁 도서관에서 문제를 다 풀 때까지 제 휴대폰을 그녀에게 맡겨야 했어요.',
        },
      },
      {
        id: 's9',
        text: 'For six weeks, I studied harder than I had ever studied before, and slowly the formulas started to make sense.',
        translation: {
          uz: 'Olti hafta davomida hech qachon o‘qimaganchalik qattiq o‘qidim va asta-sekin formulalar tushunarli bo‘la boshladi.',
          ru: 'Шесть недель я занимался усерднее, чем когда-либо, и постепенно формулы начали обретать смысл.',
          ko: '6주 동안 저는 그 어느 때보다 열심히 공부했고, 공식들이 조금씩 이해되기 시작했어요.',
        },
      },
      {
        id: 's10',
        text: 'I passed the retake with seventy-four points, which isn’t brilliant, but I have never been prouder of a number.',
        translation: {
          uz: 'Qayta topshirishdan yetmish to‘rt ball bilan o‘tdim, bu ajoyib natija emas, lekin hech qachon biror raqamdan bunchalik faxrlanmaganman.',
          ru: 'Я сдал пересдачу на семьдесят четыре балла — не блестяще, но никогда я так не гордился цифрой.',
          ko: '재시험은 74점으로 통과했어요. 대단한 점수는 아니지만, 숫자 하나가 이렇게 자랑스러운 건 처음이에요.',
        },
      },
      {
        id: 's11',
        text: 'Failing showed me that talent without hard work only lasts until the first real test.',
        translation: {
          uz: 'Yiqilish menga mehnatsiz iqtidor faqat birinchi jiddiy sinovgacha yetishini ko‘rsatdi.',
          ru: 'Провал показал мне, что талант без труда работает только до первого настоящего испытания.',
          ko: '시험에 떨어져 보니, 노력 없는 재능은 첫 진짜 시험까지만 버틴다는 걸 알게 됐어요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'failed',
        meaning: {
          uz: 'yiqilmoq (imtihondan)',
          ru: 'провалить',
          ko: '떨어지다, 실패하다',
        },
      },
      {
        word: 'effort',
        meaning: { uz: 'harakat, kuch', ru: 'усилие', ko: '노력' },
      },
      {
        word: 'retake',
        meaning: {
          uz: 'qayta topshirmoq',
          ru: 'пересдавать',
          ko: '재시험을 보다',
        },
      },
      {
        word: 'grant',
        meaning: { uz: 'grant', ru: 'грант', ko: '장학금' },
      },
      {
        word: 'condition',
        meaning: { uz: 'shart', ru: 'условие', ko: '조건' },
      },
      {
        word: 'talent',
        meaning: { uz: 'iqtidor', ru: 'талант', ko: '재능' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'How had Jasur spent most evenings before the exam?',
        options: [
          'Studying in the library',
          'Helping his parents',
          'Delivering food and playing games',
          'Working at a bank',
        ],
        answerIndex: 2,
      },
      {
        id: 'q2',
        prompt: 'What was Nilufar’s condition?',
        options: [
          'He had to pay her',
          'He had to give her his phone every evening',
          'He had to help her with English',
          'He had to tell his parents',
        ],
        answerIndex: 1,
      },
      {
        id: 'q3',
        prompt: 'What would happen if he failed again?',
        options: [
          'He would lose his grant',
          'He would have to leave the city',
          'His parents would pay a fine',
          'Nothing would happen',
        ],
        answerIndex: 0,
      },
    ],
  },
  {
    code: 'en-story-b1p-05',
    level: 'B1+',
    order: 5,
    title: 'Lost Near the Registan',
    topic: {
      uz: 'Registon yonida adashgan sayyoh',
      ru: 'Потерялась у Регистана',
      ko: '레기스탄 근처에서 길을 잃은 여행자',
    },
    scene: 'summer',
    narrator: { id: 'malika', name: 'Malika' },
    sentences: [
      {
        id: 's1',
        text: 'One hot afternoon in July, I noticed a foreign woman near the Registan, staring at her dead phone in panic.',
        translation: {
          uz: 'Iyulning issiq kunlaridan birida tushdan keyin Registon yaqinida o‘chib qolgan telefoniga vahima bilan tikilib turgan chet ellik ayolni ko‘rib qoldim.',
          ru: 'Как-то жарким июльским днём я заметила у Регистана иностранку, которая в панике смотрела на свой разряженный телефон.',
          ko: '7월의 어느 더운 오후, 레기스탄 근처에서 꺼진 휴대폰을 당황한 얼굴로 들여다보는 외국인 여성을 봤어요.',
        },
      },
      {
        id: 's2',
        text: 'I’ve been learning English for three years, but I had never spoken to a real foreigner before that day.',
        translation: {
          uz: 'Uch yildan beri ingliz tilini o‘rganaman, lekin o‘sha kungacha hech qachon haqiqiy chet ellik bilan gaplashmagan edim.',
          ru: 'Я учу английский уже три года, но до того дня ни разу не говорила с настоящим иностранцем.',
          ko: '저는 3년째 영어를 배우고 있지만, 그날 전까지 진짜 외국인과 말해 본 적은 한 번도 없었어요.',
        },
      },
      {
        id: 's3',
        text: 'My heart was beating fast, and for a moment, I almost walked away and pretended I hadn’t seen her.',
        translation: {
          uz: 'Yuragim tez urardi, bir lahza uni ko‘rmagandek o‘tib ketishimga sal qoldi.',
          ru: 'Сердце колотилось, и на секунду я чуть не ушла, сделав вид, что её не заметила.',
          ko: '심장이 쿵쿵 뛰었고, 잠깐은 못 본 척 그냥 지나칠 뻔했어요.',
        },
      },
      {
        id: 's4',
        text: 'Finally, I asked if she needed help, and she said that she couldn’t remember the name of her guesthouse.',
        translation: {
          uz: 'Nihoyat undan yordam kerakmi, deb so‘radim, u esa mehmon uyining nomini eslay olmayotganini aytdi.',
          ru: 'Наконец я спросила, не нужна ли ей помощь, и она сказала, что не может вспомнить название своего гостевого дома.',
          ko: '마침내 도움이 필요하냐고 물었더니, 그녀는 묵고 있는 게스트하우스 이름이 기억나지 않는다고 했어요.',
        },
      },
      {
        id: 's5',
        text: 'All she remembered was a blue gate, a big mulberry tree and an old man who sold melons outside.',
        translation: {
          uz: 'U faqat ko‘k darvoza, katta tut daraxti va eshik oldida qovun sotadigan bir cholni eslardi.',
          ru: 'Она помнила только синие ворота, большое тутовое дерево и старика, который продавал у входа дыни.',
          ko: '그녀가 기억하는 건 파란 대문, 큰 뽕나무, 그리고 문 앞에서 멜론을 파는 할아버지뿐이었어요.',
        },
      },
      {
        id: 's6',
        text: 'Her name was Hanna, she was from Germany, and she had been walking in the heat for two hours.',
        translation: {
          uz: 'Uning ismi Hanna edi, u Germaniyadan kelgan va ikki soatdan beri jaziramada yurgan ekan.',
          ru: 'Её звали Ханна, она была из Германии и уже два часа бродила по жаре.',
          ko: '그녀의 이름은 한나였고, 독일에서 왔으며, 두 시간째 더위 속을 걷고 있었다고 했어요.',
        },
      },
      {
        id: 's7',
        text: 'I gave her my water and called my uncle, a taxi driver who knows every street in the old city.',
        translation: {
          uz: 'Men unga suvimni berdim va eski shahardagi har bir ko‘chani biladigan taksichi tog‘amga qo‘ng‘iroq qildim.',
          ru: 'Я отдала ей свою воду и позвонила дяде — таксисту, который знает каждую улицу старого города.',
          ko: '저는 그녀에게 제 물을 주고, 구시가지 골목을 전부 아는 택시 기사 삼촌에게 전화했어요.',
        },
      },
      {
        id: 's8',
        text: 'As soon as I mentioned the melon seller, my uncle laughed and said that he knew exactly where it was.',
        translation: {
          uz: 'Qovunfurushni tilga olishim bilan tog‘am kulib yubordi va u joyni aniq bilishini aytdi.',
          ru: 'Стоило мне упомянуть продавца дынь, дядя рассмеялся и сказал, что точно знает, где это.',
          ko: '멜론 파는 할아버지 얘기를 꺼내자마자, 삼촌은 웃으면서 거기가 어딘지 정확히 안다고 했어요.',
        },
      },
      {
        id: 's9',
        text: 'Twenty minutes later, Hanna was hugging the old melon seller, and he gave each of us a melon for free.',
        translation: {
          uz: 'Yigirma daqiqadan so‘ng Hanna keksa qovunfurushni quchoqlab turardi, u esa ikkimizga ham bittadan qovunni tekinga berdi.',
          ru: 'Через двадцать минут Ханна обнимала старика-продавца, а он подарил нам обеим по дыне.',
          ko: '20분 뒤 한나는 멜론 파는 할아버지를 껴안고 있었고, 할아버지는 우리 둘에게 멜론을 하나씩 공짜로 주셨어요.',
        },
      },
      {
        id: 's10',
        text: 'If I had walked away that day, I would still believe that my English wasn’t good enough for real life.',
        translation: {
          uz: 'Agar o‘sha kuni o‘tib ketganimda, hali ham ingliz tilim haqiqiy hayot uchun yetarli emas, deb o‘ylab yurgan bo‘lardim.',
          ru: 'Если бы я тогда прошла мимо, я бы до сих пор думала, что мой английский недостаточно хорош для настоящей жизни.',
          ko: '그날 그냥 지나쳤다면, 저는 지금도 제 영어가 실생활에는 부족하다고 믿고 있었을 거예요.',
        },
      },
      {
        id: 's11',
        text: 'Hanna still sends me messages from Berlin, and every time, she asks if the melons are sweet this year.',
        translation: {
          uz: 'Hanna hali ham Berlindan menga xabar yozib turadi va har safar bu yil qovunlar shirinmi, deb so‘raydi.',
          ru: 'Ханна до сих пор пишет мне из Берлина и каждый раз спрашивает, сладкие ли в этом году дыни.',
          ko: '한나는 지금도 베를린에서 메시지를 보내는데, 올해 멜론은 달콤하냐고 매번 물어요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'foreign',
        meaning: { uz: 'chet ellik', ru: 'иностранный', ko: '외국의' },
      },
      {
        word: 'pretended',
        meaning: {
          uz: 'o‘zini ...dek ko‘rsatmoq',
          ru: 'притворяться',
          ko: '~인 척하다',
        },
      },
      {
        word: 'guesthouse',
        meaning: { uz: 'mehmon uyi', ru: 'гостевой дом', ko: '게스트하우스' },
      },
      {
        word: 'mulberry',
        meaning: { uz: 'tut', ru: 'шелковица, тутовник', ko: '뽕나무' },
      },
      {
        word: 'mentioned',
        meaning: { uz: 'tilga olmoq', ru: 'упомянуть', ko: '언급하다' },
      },
      {
        word: 'enough',
        meaning: { uz: 'yetarli', ru: 'достаточно', ko: '충분한' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'What was Hanna’s problem?',
        options: [
          'She had lost her bag',
          'She couldn’t remember the name of her guesthouse',
          'She was ill',
          'She had missed her train',
        ],
        answerIndex: 1,
      },
      {
        id: 'q2',
        prompt: 'Who did Malika call for help?',
        options: [
          'The police',
          'Her mother',
          'Her uncle, a taxi driver',
          'A friend from university',
        ],
        answerIndex: 2,
      },
      {
        id: 'q3',
        prompt: 'What does Hanna ask in her messages?',
        options: [
          'If the melons are sweet this year',
          'When Malika will visit Berlin',
          'How Malika’s uncle is',
          'If the guesthouse is still open',
        ],
        answerIndex: 0,
      },
    ],
  },
  {
    code: 'en-story-b1p-06',
    level: 'B1+',
    order: 6,
    title: 'The Missing Passport',
    topic: {
      uz: 'Yo‘qolgan pasport',
      ru: 'Пропавший паспорт',
      ko: '사라진 여권',
    },
    scene: 'morning',
    narrator: { id: 'aziz', name: 'Aziz' },
    sentences: [
      {
        id: 's1',
        text: 'Last spring, my bank sent me to a week-long training course in Istanbul, which was my first trip abroad.',
        translation: {
          uz: 'O‘tgan bahorda bankim meni Istanbuldagi bir haftalik o‘quv kursiga yubordi, bu chet elga ilk safarim edi.',
          ru: 'Прошлой весной банк отправил меня на недельные курсы в Стамбул — это была моя первая поездка за границу.',
          ko: '지난봄, 은행에서 저를 이스탄불에 일주일짜리 연수를 보냈는데, 그게 제 첫 해외여행이었어요.',
        },
      },
      {
        id: 's2',
        text: 'My flight was at six in the morning, so my father drove me to the airport while the city was still asleep.',
        translation: {
          uz: 'Reysim ertalab soat oltida edi, shuning uchun shahar hali uyquda ekanida otam meni aeroportga olib bordi.',
          ru: 'Мой рейс был в шесть утра, поэтому отец отвёз меня в аэропорт, пока город ещё спал.',
          ko: '비행기가 아침 6시라서, 도시가 아직 잠들어 있을 때 아버지가 공항까지 태워다 주셨어요.',
        },
      },
      {
        id: 's3',
        text: 'I checked in my bag, bought a coffee and joined the long queue for passport control, feeling very grown-up.',
        translation: {
          uz: 'Sumkamni topshirdim, qahva sotib oldim va o‘zimni juda katta odamdek his qilib, pasport nazoratidagi uzun navbatga turdim.',
          ru: 'Я сдал багаж, купил кофе и встал в длинную очередь на паспортный контроль, чувствуя себя очень взрослым.',
          ko: '짐을 부치고 커피를 산 다음, 아주 어른이 된 기분으로 출국 심사 긴 줄에 섰어요.',
        },
      },
      {
        id: 's4',
        text: 'When it was my turn, I reached into my jacket for my passport and found nothing but my boarding pass.',
        translation: {
          uz: 'Navbatim kelganda, pasportimni olish uchun kurtkamga qo‘l soldim, lekin u yerda faqat bortga chiqish talonim bor edi.',
          ru: 'Когда подошла моя очередь, я полез в куртку за паспортом и нашёл там только посадочный талон.',
          ko: '제 차례가 되어 재킷 안에서 여권을 꺼내려는데, 탑승권밖에 없었어요.',
        },
      },
      {
        id: 's5',
        text: 'My hands went cold, and I started imagining how I would explain to my boss that I had lost it.',
        translation: {
          uz: 'Qo‘llarim muzlab ketdi va pasportni yo‘qotganimni boshlig‘imga qanday tushuntirishimni tasavvur qila boshladim.',
          ru: 'У меня похолодели руки, и я стал представлять, как буду объяснять начальнику, что потерял его.',
          ko: '손이 차가워졌고, 여권을 잃어버렸다고 상사에게 어떻게 설명할지 벌써 상상하기 시작했어요.',
        },
      },
      {
        id: 's6',
        text: 'An officer told me calmly that people lose things here every day and that I should check the café first.',
        translation: {
          uz: 'Bir xodim menga xotirjam ohangda bu yerda odamlar har kuni narsa yo‘qotishini va avval kafeni tekshirib ko‘rishim kerakligini aytdi.',
          ru: 'Сотрудник спокойно сказал, что люди теряют здесь вещи каждый день и что сначала мне стоит проверить кафе.',
          ko: '한 직원이 차분하게, 여기서는 매일 사람들이 물건을 잃어버린다며 먼저 카페부터 확인해 보라고 했어요.',
        },
      },
      {
        id: 's7',
        text: 'I ran back, but the girl at the coffee stand shook her head and said that nobody had left anything.',
        translation: {
          uz: 'Orqaga yugurdim, lekin qahva peshtaxtasidagi qiz bosh chayqab, hech kim hech narsa qoldirmaganini aytdi.',
          ru: 'Я побежал обратно, но девушка за кофейной стойкой покачала головой и сказала, что никто ничего не оставлял.',
          ko: '다시 뛰어갔지만, 커피 가게 직원은 고개를 저으며 아무도 놓고 간 게 없다고 했어요.',
        },
      },
      {
        id: 's8',
        text: 'Then I heard my name on the speakers, asking me to come to the information desk immediately.',
        translation: {
          uz: 'Shu payt karnaylardan ismimni eshitdim: meni zudlik bilan ma’lumot bo‘limiga chaqirishayotgan edi.',
          ru: 'И тут я услышал по громкой связи своё имя: меня просили срочно подойти к справочной стойке.',
          ko: '그때 안내 방송에서 제 이름이 나오면서, 당장 안내 데스크로 오라고 했어요.',
        },
      },
      {
        id: 's9',
        text: 'A cleaner had found my passport on the floor near the check-in desk, where it must have fallen from my pocket.',
        translation: {
          uz: 'Farrosh ayol pasportimni ro‘yxatdan o‘tish stoykasi yonidagi poldan topib olgan ekan, u cho‘ntagimdan tushib qolgan bo‘lsa kerak.',
          ru: 'Уборщица нашла мой паспорт на полу у стойки регистрации — видимо, он выпал у меня из кармана.',
          ko: '청소하시는 분이 체크인 카운터 근처 바닥에서 제 여권을 주우셨대요. 주머니에서 떨어진 게 분명했어요.',
        },
      },
      {
        id: 's10',
        text: 'I tried to give her some money, but she refused and told me to buy my mother a present instead.',
        translation: {
          uz: 'Unga biroz pul bermoqchi bo‘ldim, lekin u olmadi va buning o‘rniga onamga sovg‘a olishimni aytdi.',
          ru: 'Я хотел дать ей денег, но она отказалась и сказала, чтобы я лучше купил маме подарок.',
          ko: '그분께 돈을 좀 드리려 했지만, 거절하시면서 그 대신 어머니 선물이나 사 가라고 하셨어요.',
        },
      },
      {
        id: 's11',
        text: 'I’ve flown three more times since then, but I still remember that kind woman more clearly than Istanbul itself.',
        translation: {
          uz: 'O‘shandan beri yana uch marta uchdim, lekin o‘sha mehribon ayolni hali ham Istanbulning o‘zidan ko‘ra aniqroq eslayman.',
          ru: 'С тех пор я летал ещё три раза, но ту добрую женщину помню лучше, чем сам Стамбул.',
          ko: '그 뒤로 비행기를 세 번 더 탔지만, 저는 지금도 이스탄불보다 그 친절한 분이 더 또렷하게 기억나요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'abroad',
        meaning: { uz: 'chet elga', ru: 'за границу', ko: '해외로' },
      },
      {
        word: 'queue',
        meaning: { uz: 'navbat', ru: 'очередь', ko: '줄, 대기열' },
      },
      {
        word: 'imagining',
        meaning: {
          uz: 'tasavvur qilmoq',
          ru: 'представлять',
          ko: '상상하다',
        },
      },
      {
        word: 'calmly',
        meaning: { uz: 'xotirjam', ru: 'спокойно', ko: '차분하게' },
      },
      {
        word: 'immediately',
        meaning: { uz: 'zudlik bilan', ru: 'немедленно', ko: '즉시' },
      },
      {
        word: 'refused',
        meaning: { uz: 'rad etmoq', ru: 'отказаться', ko: '거절하다' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'Why was Aziz going to Istanbul?',
        options: [
          'To visit relatives',
          'For a holiday',
          'For a training course',
          'For a job interview',
        ],
        answerIndex: 2,
      },
      {
        id: 'q2',
        prompt: 'Where was the passport found?',
        options: [
          'In the café',
          'On the floor near the check-in desk',
          'In his bag',
          'In his father’s car',
        ],
        answerIndex: 1,
      },
      {
        id: 'q3',
        prompt: 'What did the cleaner tell him to do?',
        options: [
          'Pay her later',
          'Write a letter to the airport',
          'Be more careful next time',
          'Buy his mother a present',
        ],
        answerIndex: 3,
      },
    ],
  },
  {
    code: 'en-story-b1p-07',
    level: 'B1+',
    order: 7,
    title: 'Six Hundred Guests',
    topic: {
      uz: 'Olti yuz mehmon',
      ru: 'Шестьсот гостей',
      ko: '하객 600명',
    },
    scene: 'sunset',
    narrator: { id: 'rustam', name: 'Rustam' },
    sentences: [
      {
        id: 's1',
        text: 'My grandson Sardor is getting married next month, and for weeks, our family has talked about nothing else.',
        translation: {
          uz: 'Nevaram Sardor kelasi oy uylanyapti va bir necha haftadan beri oilamizda boshqa gap yo‘q.',
          ru: 'Мой внук Сардор женится в следующем месяце, и уже несколько недель в семье только об этом и говорят.',
          ko: '손자 사르도르가 다음 달에 장가를 가는데, 몇 주째 우리 집에서는 그 얘기뿐이에요.',
        },
      },
      {
        id: 's2',
        text: 'His parents have booked a restaurant for six hundred guests, a famous singer and three cars decorated with flowers.',
        translation: {
          uz: 'Ota-onasi olti yuz mehmonga mo‘ljallangan restoran, mashhur xonanda va gullar bilan bezatilgan uchta mashinani band qilishdi.',
          ru: 'Его родители заказали ресторан на шестьсот гостей, известного певца и три машины, украшенные цветами.',
          ko: '아이 부모는 하객 600명이 들어가는 식당과 유명 가수, 꽃으로 장식한 차 세 대를 예약했어요.',
        },
      },
      {
        id: 's3',
        text: 'Last night, I found out that my son has taken a bank loan to pay for half of it.',
        translation: {
          uz: 'Kecha kechqurun o‘g‘lim buning yarmini to‘lash uchun bankdan kredit olganini bilib qoldim.',
          ru: 'Вчера вечером я узнал, что сын взял в банке кредит, чтобы оплатить половину.',
          ko: '어젯밤 저는 아들이 그 비용의 절반을 내려고 은행 대출을 받았다는 걸 알게 됐어요.',
        },
      },
      {
        id: 's4',
        text: 'When I married my wife in 1979, we had eighty guests in my father’s courtyard and a neighbour playing the doira.',
        translation: {
          uz: '1979-yilda uylanganimda otamning hovlisida sakson nafar mehmon bor edi, bir qo‘shnimiz esa doira chalib turdi.',
          ru: 'Когда я женился в 1979 году, у нас было восемьдесят гостей во дворе отца и сосед, игравший на дойре.',
          ko: '제가 1979년에 아내와 결혼했을 때는 아버지 댁 마당에 하객 여든 명이 왔고, 이웃 한 분이 도이라를 쳐 주셨어요.',
        },
      },
      {
        id: 's5',
        text: 'The plov was cooked by my uncles, the women baked bread all night, and nobody owed anybody money afterwards.',
        translation: {
          uz: 'Oshni amakilarim damlashdi, ayollar tun bo‘yi non yopishdi va to‘ydan keyin hech kim hech kimdan qarzdor bo‘lmadi.',
          ru: 'Плов готовили мои дяди, женщины всю ночь пекли лепёшки, и после свадьбы никто никому не был должен.',
          ko: '플로프는 삼촌들이 만들었고, 여자들은 밤새 빵을 구웠으며, 결혼식이 끝난 뒤 누구도 빚을 지지 않았어요.',
        },
      },
      {
        id: 's6',
        text: 'This evening, while the sun was going down, I sat with my son on the bench outside our gate.',
        translation: {
          uz: 'Bugun kechqurun, quyosh botayotganida, o‘g‘lim bilan darvozamiz oldidagi o‘rindiqda o‘tirdik.',
          ru: 'Сегодня вечером, на закате, мы с сыном сидели на скамейке у наших ворот.',
          ko: '오늘 저녁 해가 질 무렵, 저는 아들과 대문 앞 벤치에 앉았어요.',
        },
      },
      {
        id: 's7',
        text: 'I asked him why he needed six hundred guests if he only knew about half of their names.',
        translation: {
          uz: 'Undan, agar ularning yarmining ham ismini bilmasa, olti yuz mehmon nega kerakligini so‘radim.',
          ru: 'Я спросил его, зачем ему шестьсот гостей, если он и половину из них не знает по имени.',
          ko: '저는 아들에게 하객 절반은 이름도 모르면서 600명이 왜 필요하냐고 물었어요.',
        },
      },
      {
        id: 's8',
        text: 'He said that if the wedding were small, the whole mahalla would say that our family had become poor.',
        translation: {
          uz: 'U, agar to‘y kichik bo‘lsa, butun mahalla oilamiz kambag‘allashib qolibdi, deb gapirishini aytdi.',
          ru: 'Он ответил, что если свадьба будет скромной, вся махалля скажет, что наша семья обеднела.',
          ko: '아들은 결혼식을 작게 하면 온 마할라 사람들이 우리 집이 가난해졌다고 수군댈 거라고 했어요.',
        },
      },
      {
        id: 's9',
        text: 'I understood him, because I have also cared too much about what the neighbours think all my life.',
        translation: {
          uz: 'Men uni tushundim, chunki o‘zim ham butun umr qo‘shnilar nima deb o‘ylashiga haddan tashqari e’tibor berganman.',
          ru: 'Я его понял, ведь и сам всю жизнь слишком много думал о том, что скажут соседи.',
          ko: '저도 평생 이웃들이 어떻게 생각할지 너무 신경 쓰며 살아왔기에, 아들 마음을 이해했어요.',
        },
      },
      {
        id: 's10',
        text: 'But I told him that a wedding lasts one evening, while a loan can follow a young family for years.',
        translation: {
          uz: 'Lekin men unga to‘y bir kechada o‘tib ketishini, kredit esa yosh oilaning ortidan yillab ergashib yurishini aytdim.',
          ru: 'Но я сказал ему, что свадьба длится один вечер, а кредит может годами тянуться за молодой семьёй.',
          ko: '하지만 저는 결혼식은 하룻저녁이면 끝나지만, 대출은 젊은 부부를 몇 년이고 따라다닐 수 있다고 말했어요.',
        },
      },
      {
        id: 's11',
        text: 'He hasn’t cancelled anything yet, but an hour later, I heard him asking the restaurant about a smaller hall.',
        translation: {
          uz: 'U hali hech narsani bekor qilmadi, lekin bir soatdan keyin restorandan kichikroq zal haqida so‘rayotganini eshitdim.',
          ru: 'Он пока ничего не отменил, но через час я услышал, как он спрашивает в ресторане про зал поменьше.',
          ko: '아직 아무것도 취소하진 않았지만, 한 시간 뒤 아들이 식당에 더 작은 홀이 있는지 묻는 소리가 들렸어요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'booked',
        meaning: {
          uz: 'band qilmoq',
          ru: 'забронировать',
          ko: '예약하다',
        },
      },
      {
        word: 'decorated',
        meaning: { uz: 'bezatmoq', ru: 'украшать', ko: '장식하다' },
      },
      {
        word: 'loan',
        meaning: { uz: 'kredit, qarz', ru: 'кредит, заём', ko: '대출' },
      },
      {
        word: 'courtyard',
        meaning: { uz: 'hovli', ru: 'двор', ko: '마당' },
      },
      {
        word: 'owed',
        meaning: {
          uz: 'qarzdor bo‘lmoq',
          ru: 'быть должным',
          ko: '빚지다',
        },
      },
      {
        word: 'poor',
        meaning: { uz: 'kambag‘al', ru: 'бедный', ko: '가난한' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'How many guests came to Rustam’s own wedding?',
        options: ['Six hundred', 'Eighty', 'Three hundred', 'Fifty'],
        answerIndex: 1,
      },
      {
        id: 'q2',
        prompt: 'Why does Rustam’s son want a big wedding?',
        options: [
          'Sardor asked for it',
          'He won some money',
          'He doesn’t want the mahalla to think the family is poor',
          'The restaurant was cheap',
        ],
        answerIndex: 2,
      },
      {
        id: 'q3',
        prompt: 'What did Rustam hear an hour later?',
        options: [
          'His son asking about a smaller hall',
          'His son cancelling the singer',
          'Sardor saying no to the wedding',
          'The neighbours arguing',
        ],
        answerIndex: 0,
      },
    ],
  },
  {
    code: 'en-story-b1p-08',
    level: 'B1+',
    order: 8,
    title: 'My Brother’s Phone',
    topic: {
      uz: 'Ukamning telefoni',
      ru: 'Телефон моего брата',
      ko: '남동생의 휴대폰',
    },
    scene: 'rain',
    narrator: { id: 'malika', name: 'Malika' },
    sentences: [
      {
        id: 's1',
        text: 'My younger brother Bekzod is fourteen, and for the past year, his phone has been glued to his hand.',
        translation: {
          uz: 'Ukam Bekzod o‘n to‘rt yoshda, so‘nggi bir yil davomida telefoni qo‘liga yopishib qolgandek.',
          ru: 'Моему младшему брату Бекзоду четырнадцать, и последний год телефон будто приклеен к его руке.',
          ko: '제 남동생 베크조드는 열네 살인데, 지난 1년 동안 휴대폰이 손에 붙어 있다시피 했어요.',
        },
      },
      {
        id: 's2',
        text: 'He eats with it, walks with it and even falls asleep with it lying on his face.',
        translation: {
          uz: 'U telefon bilan ovqatlanadi, telefon bilan yuradi, hatto telefonni yuziga qo‘ygancha uxlab qoladi.',
          ru: 'Он ест с ним, ходит с ним и даже засыпает, уронив его себе на лицо.',
          ko: '밥 먹을 때도, 걸을 때도 들고 다니고, 심지어 얼굴 위에 올려놓은 채로 잠들어요.',
        },
      },
      {
        id: 's3',
        text: 'When his school marks dropped, my father shouted at him and locked the phone in a drawer for a week.',
        translation: {
          uz: 'Maktabdagi baholari tushib ketganida otam unga baqirdi va telefonni bir haftaga tortmaga qulflab qo‘ydi.',
          ru: 'Когда у него упали оценки в школе, отец накричал на него и запер телефон в ящике на неделю.',
          ko: '학교 성적이 떨어지자, 아버지는 동생에게 소리치시고 휴대폰을 일주일 동안 서랍에 넣고 잠가 버리셨어요.',
        },
      },
      {
        id: 's4',
        text: 'Bekzod didn’t argue, but he stopped talking to everyone and spent the whole week staring at the wall.',
        translation: {
          uz: 'Bekzod tortishmadi, lekin hamma bilan gaplashmay qo‘ydi va butun haftani devorga tikilib o‘tkazdi.',
          ru: 'Бекзод не спорил, но перестал со всеми разговаривать и всю неделю смотрел в стену.',
          ko: '베크조드는 대들지는 않았지만, 아무와도 말하지 않고 일주일 내내 벽만 쳐다봤어요.',
        },
      },
      {
        id: 's5',
        text: 'Last Saturday, it was raining heavily, so I sat next to him and asked what he actually does on his phone.',
        translation: {
          uz: 'O‘tgan shanba kuni kuchli yomg‘ir yog‘ayotgan edi, shuning uchun yoniga o‘tirib, telefonda aslida nima qilishini so‘radim.',
          ru: 'В прошлую субботу лил сильный дождь, и я села рядом с ним и спросила, чем он на самом деле занимается в телефоне.',
          ko: '지난 토요일에 비가 많이 와서, 저는 동생 옆에 앉아 휴대폰으로 실제로 뭘 하는지 물어봤어요.',
        },
      },
      {
        id: 's6',
        text: 'I expected games, but he showed me short films that he had edited himself, with music, subtitles and slow motion.',
        translation: {
          uz: 'O‘yinlar bo‘lsa kerak deb o‘ylagandim, lekin u menga musiqa, subtitr va sekinlashtirilgan kadrlar bilan o‘zi montaj qilgan qisqa filmlarni ko‘rsatdi.',
          ru: 'Я ожидала увидеть игры, но он показал мне короткие фильмы, которые сам смонтировал, — с музыкой, субтитрами и замедленной съёмкой.',
          ko: '게임일 줄 알았는데, 동생은 음악과 자막, 슬로 모션까지 넣어 직접 편집한 짧은 영상들을 보여 줬어요.',
        },
      },
      {
        id: 's7',
        text: 'One of them was about our grandmother making bread in the tandir, and it was honestly beautiful.',
        translation: {
          uz: 'Ulardan biri buvimizning tandirda non yopayotgani haqida edi va rostini aytsam, juda chiroyli chiqqan edi.',
          ru: 'Один из них был о том, как наша бабушка печёт лепёшки в тандыре, и он, честно, был прекрасен.',
          ko: '그중 하나는 할머니가 탄디르에서 빵을 굽는 영상이었는데, 솔직히 정말 아름다웠어요.',
        },
      },
      {
        id: 's8',
        text: 'He told me quietly that nobody had ever asked him about it, because everyone just shouted.',
        translation: {
          uz: 'U menga sekingina hech kim bu haqda so‘ramaganini, chunki hamma faqat baqirganini aytdi.',
          ru: 'Он тихо сказал, что никто никогда его об этом не спрашивал, потому что все только кричали.',
          ko: '동생은 아무도 그걸 물어본 적이 없었다고, 다들 소리만 질렀다고 조용히 말했어요.',
        },
      },
      {
        id: 's9',
        text: 'That evening, I showed the video to my parents, and my father watched it three times without saying anything.',
        translation: {
          uz: 'O‘sha kuni kechqurun videoni ota-onamga ko‘rsatdim, otam uni indamay uch marta tomosha qildi.',
          ru: 'Тем вечером я показала видео родителям, и отец молча посмотрел его три раза.',
          ko: '그날 저녁 부모님께 그 영상을 보여 드렸더니, 아버지는 아무 말 없이 세 번이나 보셨어요.',
        },
      },
      {
        id: 's10',
        text: 'Now they have made a deal: if Bekzod finishes his homework first, he can edit for two hours every evening.',
        translation: {
          uz: 'Endi ular kelishib olishdi: agar Bekzod avval uy vazifasini bajarsa, har kuni kechqurun ikki soat montaj qilishi mumkin.',
          ru: 'Теперь у них уговор: если Бекзод сначала сделает уроки, он может два часа каждый вечер заниматься монтажом.',
          ko: '이제 두 사람은 약속을 했어요. 베크조드가 숙제를 먼저 끝내면 매일 저녁 두 시간 동안 영상 편집을 할 수 있어요.',
        },
      },
      {
        id: 's11',
        text: 'I’ve learned that before we take something away from a teenager, we should find out what it means to him.',
        translation: {
          uz: 'O‘smirdan biror narsani tortib olishdan oldin, bu narsa u uchun nimani anglatishini bilish kerakligini tushundim.',
          ru: 'Я поняла: прежде чем что-то отнимать у подростка, нужно узнать, что это для него значит.',
          ko: '저는 십 대에게서 뭔가를 빼앗기 전에, 그게 그 아이에게 어떤 의미인지부터 알아봐야 한다는 걸 배웠어요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'glued',
        meaning: { uz: 'yopishtirmoq', ru: 'приклеить', ko: '붙이다' },
      },
      {
        word: 'drawer',
        meaning: { uz: 'tortma', ru: 'ящик (стола)', ko: '서랍' },
      },
      {
        word: 'heavily',
        meaning: { uz: 'kuchli, qattiq', ru: 'сильно', ko: '심하게, 많이' },
      },
      {
        word: 'edited',
        meaning: {
          uz: 'montaj qilmoq',
          ru: 'монтировать',
          ko: '편집하다',
        },
      },
      {
        word: 'subtitles',
        meaning: { uz: 'subtitr', ru: 'субтитры', ko: '자막' },
      },
      {
        word: 'teenager',
        meaning: { uz: 'o‘smir', ru: 'подросток', ko: '십 대' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'What did Malika’s father do when Bekzod’s marks dropped?',
        options: [
          'He bought him a new phone',
          'He called his teacher',
          'He locked the phone in a drawer',
          'He took him to the bazaar',
        ],
        answerIndex: 2,
      },
      {
        id: 'q2',
        prompt: 'What was Bekzod really doing on his phone?',
        options: [
          'Playing games all day',
          'Chatting with friends',
          'Watching football',
          'Editing short films',
        ],
        answerIndex: 3,
      },
      {
        id: 'q3',
        prompt: 'What is the new deal?',
        options: [
          'He can edit for two hours after homework',
          'He can use his phone only at weekends',
          'He must give his phone to Malika',
          'He must stop making videos',
        ],
        answerIndex: 0,
      },
    ],
  },
  {
    code: 'en-story-b1p-09',
    level: 'B1+',
    order: 9,
    title: 'Four Minutes in the Park',
    topic: {
      uz: 'Bog‘dagi to‘rt daqiqa',
      ru: 'Четыре минуты в парке',
      ko: '공원에서의 4분',
    },
    scene: 'morning',
    narrator: { id: 'dilnoza', name: 'Dilnoza' },
    sentences: [
      {
        id: 's1',
        text: 'Working in a pharmacy, I’ve noticed that I sell a lot of pills to people who simply never move.',
        translation: {
          uz: 'Dorixonada ishlab, umuman harakat qilmaydigan odamlarga juda ko‘p dori sotishimni payqaganman.',
          ru: 'Работая в аптеке, я заметила, что продаю много таблеток людям, которые просто совсем не двигаются.',
          ko: '약국에서 일하다 보니, 몸을 전혀 움직이지 않는 사람들에게 약을 정말 많이 판다는 걸 알게 됐어요.',
        },
      },
      {
        id: 's2',
        text: 'One evening in March, I realised I was one of them, because climbing to our fourth floor left me breathless.',
        translation: {
          uz: 'Mart oyidagi bir kechada men ham ulardan biri ekanimni angladim, chunki to‘rtinchi qavatimizga chiqqanimda nafasim qisib qoldi.',
          ru: 'Однажды мартовским вечером я поняла, что я одна из них: после подъёма на наш четвёртый этаж я еле дышала.',
          ko: '3월의 어느 저녁, 저도 그중 한 명이라는 걸 깨달았어요. 4층 우리 집까지 올라가는데 숨이 찼거든요.',
        },
      },
      {
        id: 's3',
        text: 'So the next morning, I set my alarm for half past five and went out to the park near our house.',
        translation: {
          uz: 'Shuning uchun ertasi kuni budilnikni besh yarimga qo‘ydim va uyimiz yaqinidagi bog‘ga chiqdim.',
          ru: 'Поэтому на следующее утро я поставила будильник на половину шестого и вышла в парк возле дома.',
          ko: '그래서 다음 날 아침, 알람을 5시 반에 맞추고 집 근처 공원으로 나갔어요.',
        },
      },
      {
        id: 's4',
        text: 'I lasted exactly four minutes before I had to stop, holding my side and pretending to look at the trees.',
        translation: {
          uz: 'Roppa-rosa to‘rt daqiqa chidadim, keyin to‘xtashga majbur bo‘ldim va biqinimni ushlab, daraxtlarni tomosha qilayotgandek turdim.',
          ru: 'Я продержалась ровно четыре минуты, а потом остановилась, держась за бок и делая вид, что разглядываю деревья.',
          ko: '정확히 4분 만에 멈춰 서야 했고, 옆구리를 붙잡은 채 나무를 구경하는 척했어요.',
        },
      },
      {
        id: 's5',
        text: 'An old man who walks there every day smiled and said that everyone looks like that in the first week.',
        translation: {
          uz: 'U yerda har kuni sayr qiladigan bir qariya jilmayib, birinchi haftada hamma shunday ahvolda bo‘lishini aytdi.',
          ru: 'Пожилой мужчина, который гуляет там каждый день, улыбнулся и сказал, что в первую неделю все так выглядят.',
          ko: '매일 거기서 산책하시는 할아버지가 웃으면서, 첫 주에는 누구나 그런 모습이라고 하셨어요.',
        },
      },
      {
        id: 's6',
        text: 'He advised me to run for one minute and walk for two, and to come back the next day.',
        translation: {
          uz: 'U menga bir daqiqa yugurib, ikki daqiqa yurishni va ertasi kuni yana kelishni maslahat berdi.',
          ru: 'Он посоветовал мне минуту бежать, две минуты идти и прийти снова на следующий день.',
          ko: '할아버지는 1분 뛰고 2분 걷기를 하라고, 그리고 내일 또 오라고 조언해 주셨어요.',
        },
      },
      {
        id: 's7',
        text: 'I have been running almost every morning since then, even on days when it is cold and dark outside.',
        translation: {
          uz: 'O‘shandan beri deyarli har kuni ertalab yuguraman, hatto tashqarida sovuq va qorong‘i bo‘lgan kunlarda ham.',
          ru: 'С тех пор я бегаю почти каждое утро, даже когда на улице холодно и темно.',
          ko: '그 뒤로 저는 밖이 춥고 어두운 날에도 거의 매일 아침 달리고 있어요.',
        },
      },
      {
        id: 's8',
        text: 'Last week, I ran five kilometres without stopping, and the old man clapped for me like a proud coach.',
        translation: {
          uz: 'O‘tgan hafta to‘xtamasdan besh kilometr yugurdim, qariya esa faxrlanayotgan murabbiydek menga qarsak chaldi.',
          ru: 'На прошлой неделе я пробежала пять километров без остановки, а старик хлопал мне, как гордый тренер.',
          ko: '지난주에 저는 쉬지 않고 5킬로미터를 뛰었고, 할아버지는 자랑스러운 코치처럼 박수를 쳐 주셨어요.',
        },
      },
      {
        id: 's9',
        text: 'My six-year-old son has started asking if he can come with me, at least on Sundays.',
        translation: {
          uz: 'Olti yoshli o‘g‘lim hech bo‘lmasa yakshanba kunlari men bilan borsa bo‘ladimi, deb so‘ray boshladi.',
          ru: 'Мой шестилетний сын начал спрашивать, можно ли ему бегать со мной хотя бы по воскресеньям.',
          ko: '여섯 살 아들은 적어도 일요일에는 같이 가도 되냐고 묻기 시작했어요.',
        },
      },
      {
        id: 's10',
        text: 'If someone had told me in March that I would enjoy waking up at half past five, I would have laughed.',
        translation: {
          uz: 'Agar martda kimdir menga besh yarimda uyg‘onish yoqib qolishini aytganida, kulib yuborgan bo‘lardim.',
          ru: 'Если бы в марте мне сказали, что мне понравится вставать в полшестого, я бы рассмеялась.',
          ko: '3월에 누가 제게 새벽 5시 반에 일어나는 게 즐거워질 거라고 했다면, 저는 웃어넘겼을 거예요.',
        },
      },
      {
        id: 's11',
        text: 'Now, when customers ask me for something to help them sleep, I sometimes recommend the park before the pills.',
        translation: {
          uz: 'Endi mijozlar mendan uyquga yordam beradigan biror narsa so‘rashganida, ba’zan dorilardan oldin bog‘ni tavsiya qilaman.',
          ru: 'Теперь, когда покупатели просят у меня что-нибудь для сна, я иногда советую им сначала парк, а уже потом таблетки.',
          ko: '요즘은 손님들이 잠이 잘 오는 약을 찾으면, 가끔 약보다 공원을 먼저 권해요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'pills',
        meaning: { uz: 'dori, tabletka', ru: 'таблетка', ko: '알약' },
      },
      {
        word: 'breathless',
        meaning: {
          uz: 'nafasi qisgan',
          ru: 'запыхавшийся',
          ko: '숨이 찬',
        },
      },
      {
        word: 'alarm',
        meaning: { uz: 'budilnik', ru: 'будильник', ko: '알람' },
      },
      {
        word: 'advised',
        meaning: {
          uz: 'maslahat bermoq',
          ru: 'советовать',
          ko: '조언하다',
        },
      },
      {
        word: 'coach',
        meaning: { uz: 'murabbiy', ru: 'тренер', ko: '코치' },
      },
      {
        word: 'recommend',
        meaning: {
          uz: 'tavsiya qilmoq',
          ru: 'рекомендовать',
          ko: '권하다',
        },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'Why did Dilnoza decide to start running?',
        options: [
          'Her doctor told her to',
          'She got out of breath on the stairs',
          'Her son asked her to',
          'She wanted to win a race',
        ],
        answerIndex: 1,
      },
      {
        id: 'q2',
        prompt: 'What advice did the old man give her?',
        options: [
          'Run as fast as she can',
          'Buy better shoes',
          'Run only in the evening',
          'Run for one minute and walk for two',
        ],
        answerIndex: 3,
      },
      {
        id: 'q3',
        prompt: 'How far did she run last week?',
        options: [
          'One kilometre',
          'Ten kilometres',
          'Five kilometres',
          'Two kilometres',
        ],
        answerIndex: 2,
      },
    ],
  },
  {
    code: 'en-story-b1p-10',
    level: 'B1+',
    order: 10,
    title: 'The Broken Glass Bird',
    topic: {
      uz: 'Singan shisha qushcha',
      ru: 'Разбитая стеклянная птичка',
      ko: '깨진 유리 새',
    },
    scene: 'snow',
    narrator: { id: 'jasur', name: 'Jasur' },
    sentences: [
      {
        id: 's1',
        text: 'In December, I finally invited Sevara, a girl from my English course, to go ice skating with me.',
        translation: {
          uz: 'Dekabrda nihoyat ingliz tili kursimdagi Sevara ismli qizni men bilan konkida uchishga taklif qildim.',
          ru: 'В декабре я наконец пригласил Севару, девушку с моих курсов английского, покататься со мной на коньках.',
          ko: '12월에 저는 드디어 영어 학원에서 만난 세바라에게 같이 스케이트를 타러 가자고 했어요.',
        },
      },
      {
        id: 's2',
        text: 'I had planned everything carefully: the ice rink, a nice café afterwards and a small gift in my pocket.',
        translation: {
          uz: 'Hammasini puxta rejalashtirgan edim: muz maydoni, keyin shinam kafe va cho‘ntagimda kichik sovg‘a.',
          ru: 'Я всё тщательно продумал: каток, потом уютное кафе и маленький подарок в кармане.',
          ko: '모든 걸 꼼꼼하게 계획해 뒀어요. 스케이트장, 그다음엔 분위기 좋은 카페, 그리고 주머니 속 작은 선물까지요.',
        },
      },
      {
        id: 's3',
        text: 'But it snowed heavily that day, and when we arrived, a sign said that the rink was closed because of the weather.',
        translation: {
          uz: 'Lekin o‘sha kuni qalin qor yog‘di va yetib borganimizda, e’londa muz maydoni ob-havo sababli yopiqligi yozilgan edi.',
          ru: 'Но в тот день шёл сильный снег, и когда мы приехали, на табличке было написано, что каток закрыт из-за погоды.',
          ko: '그런데 그날 눈이 펑펑 내렸고, 도착해 보니 날씨 때문에 스케이트장이 문을 닫았다는 안내문이 붙어 있었어요.',
        },
      },
      {
        id: 's4',
        text: 'Then, as we were walking towards the café, I slipped on the ice and fell right in front of her.',
        translation: {
          uz: 'Keyin kafe tomon ketayotganimizda muzda sirpanib, aynan uning ko‘z o‘ngida yiqildim.',
          ru: 'Потом, по дороге в кафе, я поскользнулся на льду и упал прямо у неё на глазах.',
          ko: '그러고 나서 카페 쪽으로 걸어가다가, 빙판에 미끄러져 그녀 바로 앞에서 넘어졌어요.',
        },
      },
      {
        id: 's5',
        text: 'The gift, a little glass bird that I had bought for her, broke into three pieces in my pocket.',
        translation: {
          uz: 'Unga atab olgan sovg‘am — kichkina shisha qushcha — cho‘ntagimda uch bo‘lakka bo‘linib ketdi.',
          ru: 'Подарок — маленькая стеклянная птичка, которую я ей купил, — разбился у меня в кармане на три части.',
          ko: '그녀에게 주려고 산 작은 유리 새 선물은 주머니 속에서 세 조각이 나 버렸어요.',
        },
      },
      {
        id: 's6',
        text: 'To make things worse, the café was full, and the waiter said that we would have to wait at least an hour.',
        translation: {
          uz: 'Bu yetmaganday, kafe to‘la edi va ofitsiant kamida bir soat kutishimiz kerakligini aytdi.',
          ru: 'Вдобавок кафе было переполнено, и официант сказал, что ждать придётся как минимум час.',
          ko: '설상가상으로 카페는 꽉 차 있었고, 종업원은 적어도 한 시간은 기다려야 한다고 했어요.',
        },
      },
      {
        id: 's7',
        text: 'I was ready to apologise and take her home, but Sevara pointed at a small somsa shop across the street.',
        translation: {
          uz: 'Kechirim so‘rab, uni uyiga kuzatib qo‘yishga tayyor edim, lekin Sevara ko‘chaning narigi betidagi kichkina somsaxonani ko‘rsatdi.',
          ru: 'Я уже был готов извиниться и проводить её домой, но Севара показала на маленькую самсахану через дорогу.',
          ko: '저는 사과하고 그녀를 집에 데려다줄 생각이었는데, 세바라가 길 건너 작은 솜사 가게를 가리켰어요.',
        },
      },
      {
        id: 's8',
        text: 'We sat by the hot tandir, ate somsa with our fingers and laughed about my fall until our stomachs hurt.',
        translation: {
          uz: 'Issiq tandir yonida o‘tirib, somsani qo‘lda yedik va yiqilganimdan qornimiz og‘riguncha kuldik.',
          ru: 'Мы сидели у горячего тандыра, ели самсу руками и смеялись над моим падением, пока не заболели животы.',
          ko: '우리는 뜨거운 탄디르 옆에 앉아 손으로 솜사를 먹으며, 제가 넘어진 이야기로 배가 아플 때까지 웃었어요.',
        },
      },
      {
        id: 's9',
        text: 'When I showed her the broken bird, she took the biggest piece and said that she would keep it.',
        translation: {
          uz: 'Singan qushchani ko‘rsatganimda, u eng katta bo‘lagini olib, uni saqlab qo‘yishini aytdi.',
          ru: 'Когда я показал ей разбитую птичку, она взяла самый большой осколок и сказала, что сохранит его.',
          ko: '깨진 새를 보여 주자, 그녀는 제일 큰 조각을 집어 들고 간직하겠다고 했어요.',
        },
      },
      {
        id: 's10',
        text: 'If the evening had gone exactly as I planned, I would have been too nervous to be myself.',
        translation: {
          uz: 'Agar oqshom aynan rejamdagidek o‘tganida, hayajondan o‘zimni erkin tuta olmagan bo‘lardim.',
          ru: 'Если бы вечер прошёл точно по плану, я бы слишком волновался, чтобы быть собой.',
          ko: '그날 저녁이 계획대로만 흘러갔다면, 저는 너무 긴장해서 제 모습 그대로 있지 못했을 거예요.',
        },
      },
      {
        id: 's11',
        text: 'We’ve been together for almost a year now, and that piece of glass is still on her desk.',
        translation: {
          uz: 'Mana, deyarli bir yildirki birgamiz, o‘sha shisha bo‘lagi esa hali ham uning stolida turibdi.',
          ru: 'Мы вместе уже почти год, и тот осколок стекла до сих пор лежит у неё на столе.',
          ko: '우리는 이제 거의 1년째 만나고 있고, 그 유리 조각은 지금도 그녀의 책상 위에 있어요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'skating',
        meaning: {
          uz: 'konkida uchish',
          ru: 'катание на коньках',
          ko: '스케이트 타기',
        },
      },
      {
        word: 'rink',
        meaning: { uz: 'muz maydoni', ru: 'каток', ko: '스케이트장' },
      },
      {
        word: 'worse',
        meaning: { uz: 'battar, yomonroq', ru: 'хуже', ko: '더 나쁜' },
      },
      {
        word: 'apologise',
        meaning: {
          uz: 'kechirim so‘ramoq',
          ru: 'извиняться',
          ko: '사과하다',
        },
      },
      {
        word: 'pointed',
        meaning: { uz: 'ko‘rsatmoq', ru: 'указывать', ko: '가리키다' },
      },
      {
        word: 'stomachs',
        meaning: { uz: 'qorin', ru: 'живот', ko: '배' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'Where did Jasur plan to take Sevara first?',
        options: [
          'To the cinema',
          'To an ice rink',
          'To a somsa shop',
          'To the park',
        ],
        answerIndex: 1,
      },
      {
        id: 'q2',
        prompt: 'What happened to the gift?',
        options: [
          'He forgot it at home',
          'Sevara didn’t like it',
          'It broke in his pocket',
          'He lost it in the snow',
        ],
        answerIndex: 2,
      },
      {
        id: 'q3',
        prompt: 'Where is the biggest piece of the glass bird now?',
        options: [
          'On Sevara’s desk',
          'In Jasur’s pocket',
          'In the somsa shop',
          'In the rubbish bin',
        ],
        answerIndex: 0,
      },
    ],
  },
];
