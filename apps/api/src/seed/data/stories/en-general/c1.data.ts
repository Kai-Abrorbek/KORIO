import type { StorySeed } from '../../../../stories/story-content.util';

/** 영어 듣기 이야기 C1. 규칙은 a1.data.ts 맨 위 주석 참고 */
export const EN_GENERAL_C1: StorySeed[] = [
  {
    code: 'en-story-c1-01',
    level: 'C1',
    order: 1,
    title: 'The Language My Grandmother Is Losing',
    topic: {
      uz: 'Buvim unutayotgan til',
      ru: 'Язык, который забывает бабушка',
      ko: '할머니가 잊어 가는 언어',
    },
    scene: 'autumn',
    narrator: { id: 'dilnoza', name: 'Dilnoza' },
    sentences: [
      {
        id: 's1',
        text: 'For forty years my grandmother worked as a nurse in a district hospital, where every chart, prescription and report had to be written in Russian.',
        translation: {
          uz: 'Buvim qirq yil tuman kasalxonasida hamshira bo‘lib ishlagan, u yerda har bir kasallik varaqasi, retsept va hisobot rus tilida yozilishi kerak edi.',
          ru: 'Сорок лет моя бабушка проработала медсестрой в районной больнице, где каждую историю болезни, каждый рецепт и отчёт нужно было писать по-русски.',
          ko: '할머니는 40년 동안 지역 병원에서 간호사로 일하셨는데, 그곳에서는 모든 차트와 처방전, 보고서를 러시아어로 써야 했어요.',
        },
      },
      {
        id: 's2',
        text: 'She spoke it so fluently that, as a child, I assumed it was simply the language adults used whenever something serious needed to be said.',
        translation: {
          uz: 'U bu tilda shunchalik ravon gapirardiki, bolaligimda men uni kattalar jiddiy gap aytmoqchi bo‘lganda ishlatadigan til deb o‘ylardim.',
          ru: 'Она говорила на нём так свободно, что в детстве я считала его просто языком, на котором взрослые говорят о чём-то серьёзном.',
          ko: '할머니가 러시아어를 워낙 유창하게 하셔서, 어릴 적 저는 그게 어른들이 중요한 말을 할 때 쓰는 언어인 줄로만 알았어요.',
        },
      },
      {
        id: 's3',
        text: 'This autumn, while we were sorting apples on her veranda, she reached for a Russian word she had used every day of her working life and found nothing there.',
        translation: {
          uz: 'Bu kuz ayvonda olma saralayotganimizda, u butun ish hayoti davomida har kuni ishlatgan bir ruscha so‘zni eslamoqchi bo‘ldi-yu, hech narsa topolmadi.',
          ru: 'Этой осенью, когда мы перебирали яблоки у неё на веранде, она потянулась за русским словом, которым пользовалась каждый день всю свою трудовую жизнь, — и ничего не нашла.',
          ko: '올가을 할머니 댁 마루에서 사과를 고르던 중, 할머니는 평생 일하며 매일 쓰시던 러시아어 단어 하나를 떠올리려 했지만 아무것도 떠오르지 않았어요.',
        },
      },
      {
        id: 's4',
        text: 'Not until I saw her face did I understand how much it frightened her, as though a door in her own house had been locked without her permission.',
        translation: {
          uz: 'Uning yuzini ko‘rgachgina bu uni qanchalik qo‘rqitganini tushundim — go‘yo o‘z uyidagi bir eshik uning ruxsatisiz qulflab qo‘yilgandek.',
          ru: 'Только увидев её лицо, я поняла, как сильно это её напугало, — будто дверь в её собственном доме заперли без её разрешения.',
          ko: '할머니의 얼굴을 보고 나서야 그게 얼마나 할머니를 두렵게 했는지 알았어요. 마치 자기 집의 문 하나가 허락도 없이 잠겨 버린 것처럼요.',
        },
      },
      {
        id: 's5',
        text: 'As a pharmacist, I know the textbook explanation, that the languages we learn last are often the first to fade when memory begins to weaken.',
        translation: {
          uz: 'Farmatsevt sifatida men darslikdagi izohni bilaman: eng oxirida o‘rganilgan tillar ko‘pincha xotira zaiflasha boshlaganda birinchi bo‘lib so‘nadi.',
          ru: 'Как фармацевт, я знаю объяснение из учебника: языки, выученные последними, часто первыми угасают, когда начинает слабеть память.',
          ko: '약사로서 저는 교과서적인 설명을 알아요. 가장 나중에 배운 언어가 기억력이 약해지기 시작할 때 가장 먼저 희미해지는 경우가 많다는 거죠.',
        },
      },
      {
        id: 's6',
        text: 'Knowing the science, however, made it no easier to watch her stare at the Russian label on her own tablets as if it belonged to a stranger.',
        translation: {
          uz: 'Biroq sababini bilsam ham, uning o‘z dorilaridagi ruscha yozuvga xuddi begona narsaga qaragandek tikilib turishini ko‘rish oson bo‘lmadi.',
          ru: 'Но знание науки ничуть не облегчало того, каково было смотреть, как она разглядывает русскую надпись на собственных таблетках, будто они чужие.',
          ko: '하지만 이유를 안다고 해서, 할머니가 자기 약에 붙은 러시아어 라벨을 남의 물건처럼 바라보는 모습을 지켜보는 게 덜 힘들지는 않았어요.',
        },
      },
      {
        id: 's7',
        text: 'What struck me, though, was that her Uzbek seemed to grow richer as the other language receded, full of village proverbs I had never heard her use.',
        translation: {
          uz: 'Lekin meni hayratga solgani shu bo‘ldiki, ikkinchi til chekingan sari uning o‘zbekchasi boyib borayotgandek edi — men undan hech eshitmagan qishloq maqollariga to‘la.',
          ru: 'Но меня поразило другое: по мере того как второй язык отступал, её узбекский будто становился богаче — полным деревенских пословиц, которых я от неё никогда не слышала.',
          ko: '그런데 놀라웠던 건, 다른 언어가 물러날수록 할머니의 우즈베크어는 오히려 더 풍성해지는 것 같았다는 거예요. 제가 한 번도 들어 본 적 없는 시골 속담들로 가득했죠.',
        },
      },
      {
        id: 's8',
        text: 'She began telling me stories about her own mother, about lullabies and apricot harvests, in a softer voice that seemed to belong to a much younger woman.',
        translation: {
          uz: 'U menga o‘z onasi, allalar va o‘rik terimi haqida hikoya qila boshladi — go‘yo ancha yosh ayolga tegishli bo‘lgan mayinroq ovozda.',
          ru: 'Она начала рассказывать мне о своей матери, о колыбельных и сборе абрикосов — мягким голосом, который словно принадлежал гораздо более молодой женщине.',
          ko: '할머니는 자기 어머니 이야기, 자장가와 살구 수확 이야기를 들려주기 시작했어요. 훨씬 젊은 여인의 것 같은 부드러운 목소리로요.',
        },
      },
      {
        id: 's9',
        text: 'It occurred to me that she might not be losing a language so much as going back to the one she had always dreamed in.',
        translation: {
          uz: 'Shunda xayolimga keldi: balki u tilni yo‘qotayotgani emas, balki umr bo‘yi tush ko‘rib kelgan tiliga qaytayotgandir.',
          ru: 'Мне пришло в голову, что она, возможно, не столько теряет язык, сколько возвращается к тому, на котором всегда видела сны.',
          ko: '어쩌면 할머니는 언어를 잃어 가는 게 아니라, 평생 꿈을 꾸던 그 언어로 돌아가고 있는 건지도 모른다는 생각이 들었어요.',
        },
      },
      {
        id: 's10',
        text: 'So I have stopped correcting her, and I have started learning the old words she uses, writing them in a notebook I keep beside the medicine box.',
        translation: {
          uz: 'Shuning uchun uni tuzatishni bas qildim va u ishlatadigan eski so‘zlarni o‘rganib, dori qutisi yonida turadigan daftarga yozib boryapman.',
          ru: 'Поэтому я перестала её поправлять и начала учить старые слова, которые она использует, записывая их в тетрадь, что лежит рядом с коробкой лекарств.',
          ko: '그래서 저는 할머니의 말을 고쳐 드리는 걸 그만두고, 할머니가 쓰시는 옛말들을 배우기 시작했어요. 약 상자 옆에 둔 공책에 적어 가면서요.',
        },
      },
      {
        id: 's11',
        text: 'Perhaps that is what love asks of us: to follow people into whatever language they have left rather than insisting on the one we are used to.',
        translation: {
          uz: 'Balki mehr bizdan aynan shuni talab qilar: o‘zimiz ko‘nikkan tilda turib olish o‘rniga, odamlarning ortidan ularda qolgan tilga ergashish.',
          ru: 'Возможно, именно этого и требует от нас любовь: идти за человеком в тот язык, что у него остался, а не настаивать на том, к которому привыкли мы.',
          ko: '어쩌면 사랑이 우리에게 바라는 건 바로 이런 걸지도 몰라요. 우리에게 익숙한 언어를 고집하는 대신, 상대에게 남아 있는 언어로 따라 들어가는 것 말이에요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'fluently',
        meaning: { uz: 'ravon, erkin', ru: 'свободно, бегло', ko: '유창하게' },
      },
      {
        word: 'frightened',
        meaning: {
          uz: 'qo‘rqitmoq',
          ru: 'пугать',
          ko: '겁을 주다, 두렵게 하다',
        },
      },
      {
        word: 'fade',
        meaning: {
          uz: 'so‘nmoq, xiralashmoq',
          ru: 'угасать, тускнеть',
          ko: '희미해지다',
        },
      },
      {
        word: 'receded',
        meaning: { uz: 'chekinmoq', ru: 'отступать', ko: '물러나다' },
      },
      {
        word: 'proverbs',
        meaning: { uz: 'maqol', ru: 'пословица', ko: '속담' },
      },
      {
        word: 'insisting',
        meaning: {
          uz: 'turib olmoq, qat’iy talab qilmoq',
          ru: 'настаивать',
          ko: '고집하다',
        },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt:
          'Why did Dilnoza’s grandmother use Russian every day for so long?',
        options: [
          'She grew up in Russia',
          'Her hospital work was done in Russian',
          'Her husband spoke only Russian',
          'She taught Russian at school',
        ],
        answerIndex: 1,
      },
      {
        id: 'q2',
        prompt: 'What surprised Dilnoza as her grandmother’s Russian faded?',
        options: [
          'Her grandmother stopped talking completely',
          'Her grandmother started learning English',
          'Her grandmother’s Uzbek became richer',
          'Her grandmother forgot her family’s names',
        ],
        answerIndex: 2,
      },
      {
        id: 'q3',
        prompt: 'What does Dilnoza finally believe she should do?',
        options: [
          'Correct her grandmother’s mistakes patiently',
          'Find a doctor who speaks Russian',
          'Teach her grandmother new Russian words',
          'Meet her grandmother in the language she still has',
        ],
        answerIndex: 3,
      },
    ],
  },
  {
    code: 'en-story-c1-02',
    level: 'C1',
    order: 2,
    title: 'The Words That Don’t Travel',
    topic: {
      uz: 'Boshqa tilga ko‘chmaydigan so‘zlar',
      ru: 'Слова, которые не переводятся',
      ko: '다른 언어로 건너가지 못하는 말들',
    },
    scene: 'night',
    narrator: { id: 'kamola', name: 'Kamola' },
    sentences: [
      {
        id: 's1',
        text: 'Last winter I accepted a freelance job translating a wellbeing app from English into Uzbek, a task I confidently assumed would take two weeks at most.',
        translation: {
          uz: 'O‘tgan qish bir sog‘lomlik ilovasini ingliz tilidan o‘zbek tiliga tarjima qilish bo‘yicha frilans ishni oldim va bu ko‘pi bilan ikki hafta oladi, deb ishonch bilan o‘yladim.',
          ru: 'Прошлой зимой я взяла фриланс-заказ — перевести приложение о благополучии с английского на узбекский — и была уверена, что управлюсь максимум за две недели.',
          ko: '지난겨울 저는 웰빙 앱을 영어에서 우즈베크어로 번역하는 프리랜서 일을 맡았는데, 길어야 2주면 끝날 거라고 자신 있게 생각했어요.',
        },
      },
      {
        id: 's2',
        text: 'It took two months, and most of that time was spent not on difficult grammar but on ordinary words that simply refused to cross the border.',
        translation: {
          uz: 'Ish ikki oy davom etdi va vaqtimning ko‘p qismi qiyin grammatikaga emas, chegaradan o‘tishni shunchaki rad etgan oddiy so‘zlarga ketdi.',
          ru: 'Ушло два месяца, и большая часть времени ушла не на сложную грамматику, а на обычные слова, которые просто отказывались пересекать границу.',
          ko: '결국 두 달이 걸렸고, 그 시간 대부분은 어려운 문법이 아니라 도무지 국경을 넘으려 하지 않는 평범한 단어들에 쓰였어요.',
        },
      },
      {
        id: 's3',
        text: 'Take “privacy”, for instance, a word the app used on almost every screen, as if everyone naturally understood why a person might want to be left alone.',
        translation: {
          uz: 'Masalan, «privacy» so‘zini olaylik: ilova uni deyarli har bir ekranda ishlatardi, go‘yo inson nega yolg‘iz qolishni xohlashi mumkinligini hamma o‘z-o‘zidan tushunadigandek.',
          ru: 'Возьмём, например, слово «privacy»: приложение использовало его почти на каждом экране, будто всем и так понятно, почему человеку может хотеться, чтобы его оставили в покое.',
          ko: '예를 들어 “프라이버시”라는 단어를 보세요. 앱은 거의 모든 화면에서 이 말을 썼어요. 사람이 왜 혼자 있고 싶어 하는지 누구나 당연히 안다는 듯이요.',
        },
      },
      {
        id: 's4',
        text: 'Uzbek has a formal legal term for it, yet in everyday speech the idea tends to come out sounding like either secrecy or loneliness.',
        translation: {
          uz: 'O‘zbek tilida buning rasmiy huquqiy atamasi bor, ammo kundalik nutqda bu tushuncha ko‘pincha yo sir tutish, yo yolg‘izlikdek eshitiladi.',
          ru: 'В узбекском для этого есть официальный юридический термин, но в повседневной речи это понятие обычно звучит либо как скрытность, либо как одиночество.',
          ko: '우즈베크어에도 이를 가리키는 공식 법률 용어는 있지만, 일상 대화에서는 이 개념이 비밀스러움이나 외로움처럼 들리기 쉬워요.',
        },
      },
      {
        id: 's5',
        text: 'Going the other way was no easier, as I discovered when I tried to explain to the product manager why the Uzbek version needed the word “charchamang”.',
        translation: {
          uz: 'Teskari yo‘nalish ham oson emas ekan — buni mahsulot menejeriga o‘zbekcha versiyaga nega «charchamang» so‘zi kerakligini tushuntirmoqchi bo‘lganimda bildim.',
          ru: 'В обратную сторону оказалось не легче — я поняла это, когда пыталась объяснить продакт-менеджеру, зачем узбекской версии слово «charchamang».',
          ko: '반대 방향도 쉽지 않았어요. 프로덕트 매니저에게 우즈베크어 버전에 왜 “차르차망”이라는 말이 필요한지 설명하려다 그걸 깨달았죠.',
        },
      },
      {
        id: 's6',
        text: 'Literally it means “don’t get tired”, but what it really says is “I see how hard you are working, and your effort matters to me”.',
        translation: {
          uz: 'So‘zma-so‘z olsak, u «don’t get tired» bo‘ladi, ammo aslida u «Qanchalik qattiq mehnat qilayotganingizni ko‘ryapman, harakatingiz men uchun qadrli» degani.',
          ru: 'Дословно это «не уставайте», но на самом деле оно говорит: «Я вижу, как усердно вы работаете, и ваш труд для меня важен».',
          ko: '직역하면 “지치지 마세요”지만, 실제로는 “당신이 얼마나 애쓰고 있는지 알아요, 당신의 수고가 제게 소중해요”라는 뜻이에요.',
        },
      },
      {
        id: 's7',
        text: 'She suggested “good job”, which was kind of her, though it misses the point entirely, since you say “charchamang” before the work is finished, not after.',
        translation: {
          uz: 'U «good job» variantini taklif qildi — bu uning yaxshi niyati edi, ammo mohiyatni butunlay chetlab o‘tadi, chunki «charchamang» ish tugagandan keyin emas, ish ustida aytiladi.',
          ru: 'Она предложила «good job» — очень мило с её стороны, но это совершенно мимо, ведь «charchamang» говорят, пока работа ещё идёт, а не после.',
          ko: '매니저는 “잘했어요(good job)”를 제안했어요. 친절한 제안이었지만 핵심을 완전히 놓친 거였죠. “차르차망”은 일이 끝난 뒤가 아니라 일하는 도중에 하는 말이니까요.',
        },
      },
      {
        id: 's8',
        text: 'Even something as simple as “brother” caused trouble, because English refuses to tell you whether he is older or younger, and in Uzbek that difference shapes everything.',
        translation: {
          uz: 'Hatto «brother» kabi oddiy so‘z ham muammo tug‘dirdi, chunki ingliz tili uning katta yoki kichikligini aytmaydi, o‘zbek tilida esa bu farq hamma narsani belgilaydi.',
          ru: 'Даже такое простое слово, как «brother», доставило хлопот: английский отказывается сообщать, старший он или младший, а в узбекском от этого зависит всё.',
          ko: '“브라더(brother)”처럼 간단한 단어조차 골칫거리였어요. 영어는 형인지 동생인지 알려 주지 않는데, 우즈베크어에서는 그 차이가 모든 걸 좌우하거든요.',
        },
      },
      {
        id: 's9',
        text: 'Somewhere around the sixth week, I stopped seeing these gaps as failures of translation and began to read them as a kind of map.',
        translation: {
          uz: 'Taxminan oltinchi haftada men bu bo‘shliqlarni tarjimaning muvaffaqiyatsizligi deb bilishni bas qildim va ularni o‘ziga xos xarita sifatida o‘qiy boshladim.',
          ru: 'Где-то на шестой неделе я перестала считать эти пробелы провалами перевода и начала читать их как своего рода карту.',
          ko: '여섯째 주쯤 되자, 저는 이런 빈틈을 번역의 실패로 보지 않고 일종의 지도로 읽기 시작했어요.',
        },
      },
      {
        id: 's10',
        text: 'Every language, it seems to me, has words for whatever its speakers have agreed is worth noticing, and the silences tell you just as much.',
        translation: {
          uz: 'Menimcha, har bir tilda o‘sha til egalari e’tiborga loyiq deb kelishgan narsalar uchun so‘zlar bor, sukutlar esa bundan kam narsa aytmaydi.',
          ru: 'Мне кажется, в каждом языке есть слова для того, что его носители договорились считать достойным внимания, а умолчания говорят не меньше.',
          ko: '제 생각에 모든 언어에는 그 언어를 쓰는 사람들이 주목할 가치가 있다고 합의한 것들을 가리키는 말이 있고, 말이 없는 자리도 그만큼 많은 걸 알려 줘요.',
        },
      },
      {
        id: 's11',
        text: 'The app launched in spring with a few compromises I am still not entirely happy with, which is probably the most honest result a translator can hope for.',
        translation: {
          uz: 'Ilova bahorda ishga tushdi, unda hali ham to‘liq rozi bo‘lmagan bir nechta murosalarim bor — tarjimon umid qilishi mumkin bo‘lgan eng halol natija ham shu bo‘lsa kerak.',
          ru: 'Весной приложение вышло с несколькими компромиссами, которыми я до сих пор не вполне довольна, — и это, пожалуй, самый честный результат, на который может рассчитывать переводчик.',
          ko: '앱은 봄에 출시됐어요. 아직도 완전히 만족스럽지 않은 타협 몇 가지를 안은 채로요. 아마 그게 번역가가 바랄 수 있는 가장 정직한 결과일 거예요.',
        },
      },
      {
        id: 's12',
        text: 'But I now catch myself at night, long after the laptop is closed, wondering which of my own feelings have never had a name in either language.',
        translation: {
          uz: 'Lekin endi kechalari, noutbukni yopganimdan ancha keyin ham, o‘zimdagi qaysi tuyg‘ularning har ikki tilda ham hech qachon nomi bo‘lmaganini o‘ylab qolaman.',
          ru: 'Но теперь я ловлю себя на том, что по ночам, давно закрыв ноутбук, думаю: какие из моих собственных чувств так и не получили имени ни в одном из двух языков?',
          ko: '하지만 요즘 저는 밤에 노트북을 덮은 지 한참 지나서도, 제 감정 중 어떤 것들이 두 언어 어디에서도 이름을 가져 본 적이 없는지 곰곰이 생각하곤 해요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'confidently',
        meaning: { uz: 'ishonch bilan', ru: 'уверенно', ko: '자신 있게' },
      },
      {
        word: 'border',
        meaning: { uz: 'chegara', ru: 'граница', ko: '국경, 경계' },
      },
      {
        word: 'secrecy',
        meaning: {
          uz: 'sir tutish, maxfiylik',
          ru: 'скрытность, секретность',
          ko: '비밀스러움',
        },
      },
      {
        word: 'entirely',
        meaning: {
          uz: 'butunlay, to‘liq',
          ru: 'совершенно, полностью',
          ko: '완전히',
        },
      },
      {
        word: 'compromises',
        meaning: { uz: 'murosa', ru: 'компромисс', ko: '타협' },
      },
      {
        word: 'silences',
        meaning: { uz: 'sukut', ru: 'молчание, умолчание', ko: '침묵' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'What kind of project did Kamola take on?',
        options: [
          'Translating a wellbeing app into Uzbek',
          'Writing a novel in English',
          'Designing a hospital website',
          'Teaching English online',
        ],
        answerIndex: 0,
      },
      {
        id: 'q2',
        prompt: 'Why was “good job” a poor translation of “charchamang”?',
        options: [
          'It sounds too formal',
          'It is too long for the screen',
          'It is said after the work, not during it',
          'It is only used with children',
        ],
        answerIndex: 2,
      },
      {
        id: 'q3',
        prompt: 'How does Kamola come to see the gaps between languages?',
        options: [
          'As proof that translation is impossible',
          'As mistakes she should hide',
          'As a reason to stop freelancing',
          'As a map of what each culture notices',
        ],
        answerIndex: 3,
      },
    ],
  },
  {
    code: 'en-story-c1-03',
    level: 'C1',
    order: 3,
    title: 'The Craft of Waiting',
    topic: {
      uz: 'Kutish san’ati',
      ru: 'Искусство ждать',
      ko: '기다림의 기술',
    },
    scene: 'spring',
    narrator: { id: 'rustam', name: 'Rustam' },
    sentences: [
      {
        id: 's1',
        text: 'When I was a boy, my father grafted an apricot branch onto an old tree in our yard and told me not to touch it until summer.',
        translation: {
          uz: 'Bolaligimda otam hovlimizdagi keksa daraxtga o‘rik novdasini payvand qilib, yozgacha unga tegmasligimni tayinlagan edi.',
          ru: 'Когда я был мальчишкой, отец привил абрикосовую ветку к старому дереву у нас во дворе и велел мне не трогать её до лета.',
          ko: '제가 어렸을 때, 아버지는 마당의 늙은 나무에 살구나무 가지를 접붙이시고 여름까지 건드리지 말라고 하셨어요.',
        },
      },
      {
        id: 's2',
        text: 'Naturally, I checked it every single morning, and by the end of the first week I had nearly pulled the binding off out of sheer curiosity.',
        translation: {
          uz: 'Tabiiyki, men uni har kuni ertalab tekshirardim va birinchi hafta oxiriga kelib, shunchaki qiziqqanimdan bog‘ichni yechib tashlashimga sal qoldi.',
          ru: 'Разумеется, я проверял её каждое утро, а к концу первой недели чуть не сорвал обвязку из чистого любопытства.',
          ko: '당연히 저는 매일 아침 그걸 확인했고, 첫 주가 끝날 무렵엔 순전히 호기심 때문에 묶어 둔 끈을 거의 풀어 버릴 뻔했어요.',
        },
      },
      {
        id: 's3',
        text: 'My father did not scold me, but he said something I have been turning over in my mind for more than sixty years.',
        translation: {
          uz: 'Otam meni koyimadi, lekin men oltmish yildan ortiq vaqtdan beri xayolimda aylantirib yurgan bir gapni aytdi.',
          ru: 'Отец не стал меня ругать, но сказал то, что я обдумываю уже больше шестидесяти лет.',
          ko: '아버지는 저를 꾸짖지 않으셨지만, 제가 60년 넘게 곱씹어 온 말씀을 하셨어요.',
        },
      },
      {
        id: 's4',
        text: '“Sabr is not sitting still,” he told me, “it is knowing exactly what to do while you wait, and having the discipline to do only that.”',
        translation: {
          uz: 'U menga: «Sabr — qimirlamay o‘tirish emas, kutayotganingda aynan nima qilish kerakligini bilish va faqat shuni qilishga intizoming yetishidir», — dedi.',
          ru: '«Терпение — это не сидеть сложа руки, — сказал он. — Это точно знать, что делать, пока ждёшь, и иметь выдержку делать только это».',
          ko: '“사브르(인내)는 가만히 앉아 있는 게 아니란다. 기다리는 동안 정확히 무엇을 해야 하는지 알고, 딱 그것만 할 줄 아는 절제력이지.”라고 하셨어요.',
        },
      },
      {
        id: 's5',
        text: 'At the time it sounded like one of those wise sayings old men repeat over tea, and I am afraid I paid it very little attention.',
        translation: {
          uz: 'O‘shanda bu choy ustida keksalar takrorlaydigan donishmandona gaplardan biridek tuyulgan va, afsuski, men unga deyarli e’tibor bermagan edim.',
          ru: 'Тогда это показалось мне одной из тех мудрых фраз, что старики повторяют за чаем, и, боюсь, я не придал ей особого значения.',
          ko: '그때는 그 말이 노인들이 차를 마시며 되풀이하는 지혜로운 말 중 하나처럼 들렸고, 부끄럽지만 저는 별로 귀담아듣지 않았어요.',
        },
      },
      {
        id: 's6',
        text: 'In our culture we tend to praise patience as a virtue, something you either possess or lack, like a calm temperament or a good singing voice.',
        translation: {
          uz: 'Bizning madaniyatimizda sabrni odatda fazilat sifatida maqtaymiz — go‘yo u xotirjam fe’l yoki yoqimli ovoz kabi odamda yo bor, yo yo‘q narsadek.',
          ru: 'В нашей культуре терпение обычно восхваляют как добродетель — как нечто, что у человека либо есть, либо нет, вроде спокойного нрава или хорошего голоса.',
          ko: '우리 문화에서는 인내를 흔히 미덕으로 칭송해요. 차분한 성격이나 좋은 노래 목소리처럼, 타고나거나 아니면 없는 것으로 여기죠.',
        },
      },
      {
        id: 's7',
        text: 'Only much later, after raising three children through some very lean years, did I come to see it as something built through practice, like a muscle.',
        translation: {
          uz: 'Faqat ancha keyin, uch farzandni juda og‘ir yillarda katta qilganimdan so‘nggina, uni mushak kabi mashq bilan quriladigan narsa sifatida ko‘ra boshladim.',
          ru: 'Лишь гораздо позже, вырастив троих детей в очень скудные годы, я стал видеть в нём то, что строится тренировкой, как мышца.',
          ko: '훨씬 나중에, 아주 궁핍했던 시절에 세 아이를 키워 내고 나서야, 저는 인내가 근육처럼 연습으로 길러지는 것임을 알게 됐어요.',
        },
      },
      {
        id: 's8',
        text: 'You train it in small ways: letting the dough rise without lifting the cloth, listening to a grandchild’s long story without reaching for your phone.',
        translation: {
          uz: 'Uni kichik narsalarda mashq qilasiz: ustidagi matoni ko‘tarmay xamir oshishini kutasiz, telefonga qo‘l cho‘zmay nevarangizning uzun hikoyasini tinglaysiz.',
          ru: 'Его тренируют в мелочах: даёшь тесту подняться, не приподнимая полотенца, слушаешь длинный рассказ внука, не хватаясь за телефон.',
          ko: '인내는 작은 일로 단련해요. 덮어 둔 천을 들춰 보지 않고 반죽이 부풀기를 기다리는 것, 휴대폰에 손대지 않고 손주의 긴 이야기를 들어 주는 것처럼요.',
        },
      },
      {
        id: 's9',
        text: 'Last month my granddaughter called from Canada, exhausted, because her son had given up on the piano after only three weeks of lessons.',
        translation: {
          uz: 'O‘tgan oy nevaram Kanadadan holdan toygan holda qo‘ng‘iroq qildi, chunki o‘g‘li pianino darslarini atigi uch haftadan keyin tashlab qo‘ygan edi.',
          ru: 'В прошлом месяце внучка позвонила из Канады совершенно измотанная: её сын бросил уроки фортепиано всего через три недели.',
          ko: '지난달 캐나다에 사는 손녀가 지친 목소리로 전화를 했어요. 아들이 피아노 레슨을 겨우 3주 만에 그만뒀다는 거예요.',
        },
      },
      {
        id: 's10',
        text: 'I did not lecture her, which would have been its own kind of impatience, but I did tell her about the apricot branch and my father’s words.',
        translation: {
          uz: 'Men unga nasihat qilmadim — bu ham o‘ziga xos sabrsizlik bo‘lardi, — lekin o‘sha o‘rik novdasi va otamning so‘zlarini aytib berdim.',
          ru: 'Я не стал читать ей нотаций — это было бы своего рода нетерпением, — но рассказал про абрикосовую ветку и слова отца.',
          ko: '저는 손녀에게 훈계하지 않았어요. 그것도 일종의 조급함일 테니까요. 대신 그 살구나무 가지와 아버지의 말씀을 들려줬어요.',
        },
      },
      {
        id: 's11',
        text: 'This spring I grafted a new branch in my own garden while my neighbour’s grandson watched, and on the second morning I caught him peeking under the binding.',
        translation: {
          uz: 'Bu bahor qo‘shnimning nevarasi qarab turganida o‘z bog‘imda yangi novda payvand qildim va ikkinchi kuni ertalab uni bog‘ich ostiga mo‘ralayotgan holda ushlab oldim.',
          ru: 'Этой весной я прививал новую ветку у себя в саду, а внук соседа смотрел, и на второе утро я застал его, когда он заглядывал под обвязку.',
          ko: '올봄 저는 이웃집 손자가 지켜보는 가운데 제 정원에서 새 가지를 접붙였는데, 이틀째 아침에 그 아이가 끈 아래를 몰래 들여다보는 걸 봤어요.',
        },
      },
      {
        id: 's12',
        text: 'I did not scold him either, but handed him a watering can and showed him what there was to do while he waited.',
        translation: {
          uz: 'Men ham uni koyimadim, balki qo‘liga suv sepgich tutqazib, kutayotganida nima qilish mumkinligini ko‘rsatdim.',
          ru: 'Я тоже не стал его ругать, а дал ему лейку и показал, чем можно заняться, пока ждёшь.',
          ko: '저도 그 아이를 꾸짖지 않았어요. 대신 물뿌리개를 건네주고, 기다리는 동안 할 수 있는 일을 보여 줬어요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'grafted',
        meaning: {
          uz: 'payvand qilmoq',
          ru: 'прививать (растение)',
          ko: '접붙이다',
        },
      },
      {
        word: 'curiosity',
        meaning: { uz: 'qiziqish', ru: 'любопытство', ko: '호기심' },
      },
      {
        word: 'scold',
        meaning: { uz: 'koyimoq, urishmoq', ru: 'ругать', ko: '꾸짖다' },
      },
      {
        word: 'discipline',
        meaning: {
          uz: 'intizom',
          ru: 'дисциплина, выдержка',
          ko: '절제력, 규율',
        },
      },
      {
        word: 'virtue',
        meaning: { uz: 'fazilat', ru: 'добродетель', ko: '미덕' },
      },
      {
        word: 'lecture',
        meaning: {
          uz: 'nasihat qilmoq, va’z o‘qimoq',
          ru: 'читать нотации',
          ko: '훈계하다',
        },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt:
          'What did Rustam’s father tell him to do with the grafted branch?',
        options: [
          'Water it every morning',
          'Leave it alone until summer',
          'Cut it off after a week',
          'Show it to the neighbours',
        ],
        answerIndex: 1,
      },
      {
        id: 'q2',
        prompt: 'According to Rustam’s father, what is patience?',
        options: [
          'Sitting still and saying nothing',
          'A gift some people are born with',
          'Knowing what to do while you wait',
          'Forgiving people who are late',
        ],
        answerIndex: 2,
      },
      {
        id: 'q3',
        prompt: 'Why does Rustam mention the neighbour’s grandson at the end?',
        options: [
          'To show that he now passes on his father’s lesson',
          'To complain about modern children',
          'To explain why the tree died',
          'To prove that patience cannot be taught',
        ],
        answerIndex: 0,
      },
    ],
  },
  {
    code: 'en-story-c1-04',
    level: 'C1',
    order: 4,
    title: 'The Essay That Was Too Good',
    topic: {
      uz: 'Haddan tashqari mukammal insho',
      ru: 'Слишком хорошее эссе',
      ko: '너무 완벽한 에세이',
    },
    scene: 'rain',
    narrator: { id: 'kamola', name: 'Kamola' },
    sentences: [
      {
        id: 's1',
        text: 'Twice a week, mostly for the pleasure of explaining things, I teach IELTS writing to a group of teenagers at a learning centre in Chilanzar.',
        translation: {
          uz: 'Haftada ikki marta, asosan narsalarni tushuntirishdan zavq olganim uchun, Chilonzordagi o‘quv markazida o‘smirlar guruhiga IELTS yozuvidan dars beraman.',
          ru: 'Дважды в неделю — в основном ради удовольствия что-то объяснять — я преподаю письменную часть IELTS группе подростков в учебном центре на Чиланзаре.',
          ko: '저는 일주일에 두 번, 주로 무언가를 설명하는 즐거움 때문에, 칠란자르의 한 학원에서 10대 학생들에게 IELTS 쓰기를 가르쳐요.',
        },
      },
      {
        id: 's2',
        text: 'One rainy evening in October, I sat down to mark their essays and found that half of them were suddenly, almost suspiciously, flawless.',
        translation: {
          uz: 'Oktyabrning yomg‘irli bir oqshomida insholarini tekshirish uchun o‘tirdim va ularning yarmi birdaniga, deyarli shubhali darajada benuqson ekanini ko‘rdim.',
          ru: 'Одним дождливым октябрьским вечером я села проверять их эссе и обнаружила, что половина из них вдруг стала безупречной — почти подозрительно.',
          ko: '10월의 어느 비 오는 저녁, 에세이를 채점하려고 앉았는데 절반이 갑자기, 거의 의심스러울 만큼 흠잡을 데가 없었어요.',
        },
      },
      {
        id: 's3',
        text: 'The grammar was perfect and the arguments were neatly balanced, yet every essay sounded as if it had been written by the same polite stranger.',
        translation: {
          uz: 'Grammatika mukammal, dalillar puxta muvozanatlangan edi, ammo har bir insho go‘yo bitta xushmuomala begona odam tomonidan yozilgandek eshitilardi.',
          ru: 'Грамматика была идеальной, аргументы — аккуратно выверенными, но каждое эссе звучало так, будто его написал один и тот же вежливый незнакомец.',
          ko: '문법은 완벽했고 논거도 깔끔하게 균형이 잡혀 있었지만, 모든 에세이가 마치 똑같은 예의 바른 낯선 사람이 쓴 것처럼 들렸어요.',
        },
      },
      {
        id: 's4',
        text: 'Having spent years building software, I knew exactly what had happened, and I also knew that the tools claiming to detect it are notoriously unreliable.',
        translation: {
          uz: 'Yillar davomida dasturiy ta’minot yaratganim uchun nima bo‘lganini aniq bilardim, buni aniqlaymiz deydigan vositalar esa ishonchsizligi bilan mashhur ekanini ham bilardim.',
          ru: 'Проработав годы в разработке, я точно знала, что произошло, и так же точно знала, что инструменты, якобы распознающие такое, печально известны своей ненадёжностью.',
          ko: '수년간 소프트웨어를 만들어 온 저는 무슨 일이 있었는지 정확히 알았어요. 그리고 그걸 잡아낸다는 도구들이 믿을 수 없기로 악명 높다는 것도 알았죠.',
        },
      },
      {
        id: 's5',
        text: 'My first instinct was to give them all a zero and deliver a stern speech about honesty, the kind my own teachers used to give.',
        translation: {
          uz: 'Dastlabki istagim hammasiga nol qo‘yib, o‘z o‘qituvchilarim aytadigan halollik haqidagi qattiq nutqni aytish edi.',
          ru: 'Первым порывом было поставить всем ноль и произнести суровую речь о честности — такую, какие когда-то произносили мои учителя.',
          ko: '처음엔 모두에게 0점을 주고, 제 선생님들이 하시던 것처럼 정직에 대해 엄하게 훈계하고 싶었어요.',
        },
      },
      {
        id: 's6',
        text: 'But I could not prove anything, and accusing a sixteen-year-old without evidence felt more unjust than anything they might have done.',
        translation: {
          uz: 'Lekin men hech narsani isbotlay olmasdim, o‘n olti yoshli bolani dalilsiz ayblash esa ular qilgan bo‘lishi mumkin bo‘lgan har qanday ishdan ham adolatsizroq tuyuldi.',
          ru: 'Но доказать я ничего не могла, а обвинить шестнадцатилетнего без доказательств казалось несправедливее всего, что они могли сделать.',
          ko: '하지만 저는 아무것도 증명할 수 없었고, 증거도 없이 열여섯 살 아이를 비난하는 건 그 아이들이 했을지 모를 어떤 일보다도 부당하게 느껴졌어요.',
        },
      },
      {
        id: 's7',
        text: 'What troubled me most, I realised, was not the cheating itself but the possibility that they no longer saw the point of struggling with a blank page.',
        translation: {
          uz: 'Anglashimcha, meni eng ko‘p bezovta qilgani ko‘chirmachilikning o‘zi emas, balki ular endi bo‘sh sahifa bilan kurashishdan ma’no ko‘rmayotgan bo‘lishi ehtimoli edi.',
          ru: 'Больше всего меня тревожил, как я поняла, не сам обман, а то, что они, возможно, больше не видят смысла бороться с чистым листом.',
          ko: '제가 가장 마음이 쓰였던 건 부정행위 자체가 아니라, 아이들이 더는 빈 종이와 씨름하는 데서 의미를 찾지 못할지도 모른다는 점이었어요.',
        },
      },
      {
        id: 's8',
        text: 'So the following week I changed the rules: first drafts would be written by hand in class, and only afterwards could they ask the machine to attack their arguments.',
        translation: {
          uz: 'Shuning uchun keyingi hafta qoidalarni o‘zgartirdim: birinchi qoralama darsda qo‘lda yoziladi va faqat shundan keyingina mashinadan dalillariga hujum qilishni so‘rash mumkin.',
          ru: 'Поэтому на следующей неделе я поменяла правила: первые черновики пишутся от руки на занятии, и только потом можно просить машину разнести их аргументы.',
          ko: '그래서 다음 주에 저는 규칙을 바꿨어요. 초안은 수업 시간에 손으로 쓰고, 그다음에야 기계에게 자기 논거를 반박해 달라고 할 수 있게요.',
        },
      },
      {
        id: 's9',
        text: 'The handwritten essays were clumsy, full of crossed-out lines and half-finished thoughts, and there were a few complaints that I was living in the past.',
        translation: {
          uz: 'Qo‘lda yozilgan insholar g‘aliz, o‘chirilgan satrlar va chala fikrlarga to‘la edi, bir nechta o‘quvchi esa meni o‘tmishda yashayotganlikda ayblab norozi bo‘ldi.',
          ru: 'Рукописные эссе были корявыми, полными зачёркнутых строк и недодуманных мыслей, а кое-кто жаловался, что я живу прошлым.',
          ko: '손으로 쓴 에세이는 서툴렀고, 줄 그어 지운 문장과 미완성 생각들로 가득했어요. 제가 옛날 방식에 갇혀 있다는 불평도 몇 번 들었죠.',
        },
      },
      {
        id: 's10',
        text: 'Yet one boy, Sardor, wrote a paragraph about his father’s taxi that was grammatically messy and more alive than anything the machine had produced.',
        translation: {
          uz: 'Biroq Sardor ismli bir bola otasining taksisi haqida grammatik jihatdan chalkash, ammo mashina yaratgan har qanday matndan jonliroq bir xatboshi yozdi.',
          ru: 'Но один мальчик, Сардор, написал абзац о папином такси — грамматически неряшливый и живее всего, что выдала машина.',
          ko: '그런데 사르도르라는 한 남학생이 아버지의 택시에 대한 문단을 썼는데, 문법은 엉망이었지만 기계가 만든 어떤 글보다도 살아 있었어요.',
        },
      },
      {
        id: 's11',
        text: 'I do not pretend to have solved the problem, and I suspect that next year the students will find a clever way around my rules.',
        translation: {
          uz: 'Muammoni hal qildim, deb da’vo qilmayman va kelasi yil o‘quvchilar qoidalarimni chetlab o‘tishning ustamon yo‘lini topishadi, deb gumon qilaman.',
          ru: 'Я не делаю вид, что решила проблему, и подозреваю, что в следующем году ученики найдут хитрый способ обойти мои правила.',
          ko: '문제를 해결했다고 말하진 않을게요. 아마 내년쯤이면 학생들이 제 규칙을 피해 갈 기발한 방법을 찾아낼 거예요.',
        },
      },
      {
        id: 's12',
        text: 'But I have stopped thinking of my job as catching them, because the essay was never really the point, and the thinking behind it always was.',
        translation: {
          uz: 'Lekin endi o‘z vazifamni ularni fosh qilish deb bilmayman, chunki gap hech qachon inshoning o‘zida bo‘lmagan — gap doim uning ortidagi fikrda bo‘lgan.',
          ru: 'Но я перестала считать своей задачей их ловить, потому что дело никогда не было в самом эссе — дело всегда было в мысли, которая за ним стоит.',
          ko: '하지만 이제 저는 제 일이 학생들을 잡아내는 거라고 생각하지 않아요. 중요한 건 처음부터 에세이가 아니라, 그 뒤에 있는 생각이었으니까요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'suspiciously',
        meaning: {
          uz: 'shubhali tarzda',
          ru: 'подозрительно',
          ko: '의심스럽게',
        },
      },
      {
        word: 'flawless',
        meaning: { uz: 'benuqson', ru: 'безупречный', ko: '흠 없는, 완벽한' },
      },
      {
        word: 'notoriously',
        meaning: {
          uz: 'yomon tomoni bilan mashhur',
          ru: 'печально известно',
          ko: '악명 높게',
        },
      },
      {
        word: 'instinct',
        meaning: {
          uz: 'ichki turtki, instinkt',
          ru: 'инстинкт, порыв',
          ko: '본능, 직감',
        },
      },
      {
        word: 'evidence',
        meaning: { uz: 'dalil', ru: 'доказательство', ko: '증거' },
      },
      {
        word: 'clumsy',
        meaning: {
          uz: 'g‘aliz, qo‘pol',
          ru: 'неуклюжий, корявый',
          ko: '서툰, 어설픈',
        },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'What made Kamola suspicious about half of the essays?',
        options: [
          'They were all handed in late',
          'They were written in Russian',
          'They were copied from one another',
          'They were perfect but sounded alike',
        ],
        answerIndex: 3,
      },
      {
        id: 'q2',
        prompt: 'Why did Kamola decide not to give the students a zero?',
        options: [
          'She could not prove they had cheated',
          'The centre’s director stopped her',
          'She thought the essays were genuinely good',
          'The students apologised first',
        ],
        answerIndex: 0,
      },
      {
        id: 'q3',
        prompt: 'What does Sardor’s paragraph suggest to Kamola?',
        options: [
          'Handwriting should be graded more strictly',
          'Real thinking matters more than polished grammar',
          'Machines will soon write better than people',
          'Taxi drivers are good storytellers',
        ],
        answerIndex: 1,
      },
    ],
  },
  {
    code: 'en-story-c1-05',
    level: 'C1',
    order: 5,
    title: 'A Crossroads Called Home',
    topic: {
      uz: 'Uy degan chorraha',
      ru: 'Перекрёсток, который я зову домом',
      ko: '집이라 부르는 교차로',
    },
    scene: 'sunset',
    narrator: { id: 'malika', name: 'Malika' },
    sentences: [
      {
        id: 's1',
        text: 'On weekends I help tourists find their way around the Registan, mostly to practise my English, partly because the extra money pays for my books.',
        translation: {
          uz: 'Dam olish kunlari sayyohlarga Registon atrofida yo‘l topishga yordam beraman — asosan ingliz tilimni mashq qilish uchun, qisman esa qo‘shimcha pul kitoblarimga yetgani uchun.',
          ru: 'По выходным я помогаю туристам ориентироваться на Регистане — в основном чтобы попрактиковать английский, отчасти потому, что на эти деньги я покупаю книги.',
          ko: '저는 주말마다 레기스탄 광장 주변에서 관광객들에게 길을 안내해요. 주로 영어를 연습하려는 거지만, 그 돈으로 책을 사는 이유도 조금 있어요.',
        },
      },
      {
        id: 's2',
        text: 'Last Saturday, as the sun was setting behind the madrasas, an elderly woman from Portugal asked me whether I felt like a child of the Silk Road.',
        translation: {
          uz: 'O‘tgan shanba, quyosh madrasalar ortiga botayotganida, Portugaliyadan kelgan keksa bir ayol mendan o‘zingni Ipak yo‘lining farzandi deb his qilasanmi, deb so‘radi.',
          ru: 'В прошлую субботу, когда солнце садилось за медресе, пожилая женщина из Португалии спросила меня, чувствую ли я себя дочерью Шёлкового пути.',
          ko: '지난 토요일, 해가 마드라사 뒤로 지고 있을 때, 포르투갈에서 온 할머니 한 분이 제게 스스로를 실크로드의 자손이라고 느끼냐고 물었어요.',
        },
      },
      {
        id: 's3',
        text: 'I gave her the polite answer we all learn at school, something about caravans, scholars and the great crossroads of civilisations, and she nodded kindly.',
        translation: {
          uz: 'Men unga hammamiz maktabda o‘rganadigan odobli javobni berdim — karvonlar, olimlar va sivilizatsiyalarning buyuk chorrahasi haqida, — u esa mehr bilan bosh irg‘adi.',
          ru: 'Я дала ей вежливый ответ, который все мы заучиваем в школе, — что-то про караваны, учёных и великий перекрёсток цивилизаций, — и она благосклонно кивнула.',
          ko: '저는 학교에서 다들 배우는 모범 답안을 말했어요. 대상과 학자들, 문명의 위대한 교차로 같은 이야기요. 할머니는 다정하게 고개를 끄덕였어요.',
        },
      },
      {
        id: 's4',
        text: 'Yet the question stayed with me all evening, because to be honest, the Silk Road had always felt more like a museum exhibit than a part of me.',
        translation: {
          uz: 'Ammo bu savol butun oqshom xayolimdan ketmadi, chunki rostini aytsam, Ipak yo‘li men uchun doim o‘zimning bir qismimdan ko‘ra ko‘proq muzey eksponatidek tuyulgan.',
          ru: 'Но этот вопрос не отпускал меня весь вечер, потому что, честно говоря, Шёлковый путь всегда казался мне скорее музейным экспонатом, чем частью меня самой.',
          ko: '그런데 그 질문이 저녁 내내 머리를 떠나지 않았어요. 솔직히 말하면 실크로드는 늘 제 일부라기보다 박물관 전시품처럼 느껴졌거든요.',
        },
      },
      {
        id: 's5',
        text: 'It belonged to postcards and souvenir plates, to the blue domes that visitors photograph, not to the small house where I study late into the night.',
        translation: {
          uz: 'U otkritkalar va esdalik likopchalariga, sayyohlar suratga oladigan moviy gumbazlarga tegishli edi, men tun yarmigacha dars qiladigan kichkina uyimizga emas.',
          ru: 'Он принадлежал открыткам и сувенирным тарелкам, голубым куполам, которые фотографируют туристы, а не маленькому дому, где я занимаюсь до поздней ночи.',
          ko: '실크로드는 엽서와 기념품 접시, 관광객들이 사진 찍는 푸른 돔에 속한 것이었지, 제가 밤늦게까지 공부하는 작은 집에 속한 건 아니었어요.',
        },
      },
      {
        id: 's6',
        text: 'At home that night, though, I began to notice things I had always taken for granted, as if someone had suddenly turned on a brighter lamp.',
        translation: {
          uz: 'Biroq o‘sha kechasi uyda men doim oddiy hol deb bilgan narsalarni payqay boshladim — go‘yo kimdir birdan yorqinroq chiroq yoqib qo‘ygandek.',
          ru: 'Но в тот вечер дома я начала замечать то, что всегда принимала как должное, — словно кто-то вдруг включил лампу поярче.',
          ko: '그런데 그날 밤 집에서, 저는 늘 당연하게 여겼던 것들을 알아차리기 시작했어요. 마치 누군가 갑자기 더 밝은 불을 켠 것처럼요.',
        },
      },
      {
        id: 's7',
        text: 'My grandmother was taking bread out of a clay oven that has hardly changed in a thousand years, while my brother played chess online with someone in Seoul.',
        translation: {
          uz: 'Buvim ming yildan beri deyarli o‘zgarmagan loy tandirdan non uzayotgan edi, akam esa Seuldagi kimdir bilan onlayn shaxmat o‘ynayotgan edi.',
          ru: 'Бабушка вынимала хлеб из глиняной печи, которая почти не изменилась за тысячу лет, а брат играл в шахматы онлайн с кем-то из Сеула.',
          ko: '할머니는 천 년 동안 거의 변하지 않은 진흙 화덕에서 빵을 꺼내고 계셨고, 오빠는 서울에 있는 누군가와 온라인으로 체스를 두고 있었어요.',
        },
      },
      {
        id: 's8',
        text: 'Out in the street, our neighbours were switching between two or three languages within a single sentence without even noticing they were doing it.',
        translation: {
          uz: 'Ko‘chada qo‘shnilarimiz bitta gapning o‘zida ikki-uch til o‘rtasida almashib gapirishar, buni o‘zlari sezmas ham edi.',
          ru: 'На улице соседи переходили с одного языка на другой, а то и на третий, в пределах одной фразы, даже не замечая этого.',
          ko: '골목에서는 이웃들이 한 문장 안에서도 두세 개 언어를 오가며 말했는데, 정작 본인들은 그걸 알아채지도 못했어요.',
        },
      },
      {
        id: 's9',
        text: 'It struck me then that the Silk Road was never really a road at all, but a habit of exchange, of borrowing and adapting without fuss.',
        translation: {
          uz: 'Shunda angladim: Ipak yo‘li aslida hech qachon yo‘l bo‘lmagan, balki almashish, ortiqcha shov-shuvsiz o‘zlashtirish va moslashtirish odati bo‘lgan.',
          ru: 'И тут меня осенило: Шёлковый путь вовсе не был дорогой — это была привычка к обмену, к тому, чтобы заимствовать и приспосабливать без лишнего шума.',
          ko: '그때 깨달았어요. 실크로드는 애초에 길이 아니라, 주고받고, 빌려 오고, 요란 떨지 않고 내 것으로 바꾸는 습관이었다는 걸요.',
        },
      },
      {
        id: 's10',
        text: 'Seen that way, it is not a glorious past that we have to live up to, but something quite ordinary that we are still doing every day.',
        translation: {
          uz: 'Shu nuqtai nazardan qaralsa, u biz munosib bo‘lishimiz kerak bo‘lgan shonli o‘tmish emas, balki hali ham har kuni qilayotgan juda oddiy ishimizdir.',
          ru: 'Если смотреть так, это не славное прошлое, которому мы обязаны соответствовать, а нечто вполне обыденное, чем мы до сих пор занимаемся каждый день.',
          ko: '그렇게 보면 실크로드는 우리가 부응해야 할 영광스러운 과거가 아니라, 지금도 매일 하고 있는 아주 평범한 일이에요.',
        },
      },
      {
        id: 's11',
        text: 'If I ever see the Portuguese woman again, I would like to give her a less polished answer, and perhaps a piece of my grandmother’s bread.',
        translation: {
          uz: 'Agar o‘sha portugaliyalik ayolni yana uchratsam, unga kamroq silliqlangan javob, balki buvimning nonidan bir bo‘lak ham bergim keladi.',
          ru: 'Если я ещё когда-нибудь встречу ту женщину из Португалии, мне хотелось бы дать ей не такой гладкий ответ — и, может быть, кусочек бабушкиного хлеба.',
          ko: '그 포르투갈 할머니를 다시 만난다면, 덜 다듬어진 대답과 함께 어쩌면 할머니가 구운 빵 한 조각도 드리고 싶어요.',
        },
      },
      {
        id: 's12',
        text: 'I would tell her that I do not live in the shadow of history so much as in its noisy, unfinished middle.',
        translation: {
          uz: 'Men unga tarixning soyasida emas, balki uning shovqinli, hali tugallanmagan o‘rtasida yashashimni aytgan bo‘lardim.',
          ru: 'Я бы сказала ей, что живу не столько в тени истории, сколько в её шумной, ещё не законченной середине.',
          ko: '저는 역사의 그늘 아래 사는 게 아니라, 시끌벅적하고 아직 끝나지 않은 역사의 한가운데에 살고 있다고 말해 드릴 거예요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'caravans',
        meaning: { uz: 'karvon', ru: 'караван', ko: '대상(캐러밴)' },
      },
      {
        word: 'civilisations',
        meaning: { uz: 'sivilizatsiya', ru: 'цивилизация', ko: '문명' },
      },
      {
        word: 'exhibit',
        meaning: { uz: 'eksponat', ru: 'экспонат', ko: '전시품' },
      },
      {
        word: 'exchange',
        meaning: { uz: 'almashish', ru: 'обмен', ko: '교환, 주고받음' },
      },
      {
        word: 'glorious',
        meaning: { uz: 'shonli', ru: 'славный', ko: '영광스러운' },
      },
      {
        word: 'polished',
        meaning: {
          uz: 'silliqlangan, sayqallangan',
          ru: 'отточенный, гладкий',
          ko: '다듬어진',
        },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'Why does Malika help tourists on weekends?',
        options: [
          'Her university requires it',
          'To practise English and earn money for books',
          'Her father asked her to',
          'She wants to move to Portugal',
        ],
        answerIndex: 1,
      },
      {
        id: 'q2',
        prompt: 'What did Malika notice at home that evening?',
        options: [
          'Old and new things mixing in ordinary life',
          'Her family had stopped baking bread',
          'Her neighbours spoke only one language',
          'The house was full of tourists',
        ],
        answerIndex: 0,
      },
      {
        id: 'q3',
        prompt: 'How has Malika’s view of the Silk Road changed?',
        options: [
          'She now finds it boring and outdated',
          'She thinks it only matters to tourists',
          'She sees it as a living habit, not just history',
          'She believes it should be taught less at school',
        ],
        answerIndex: 2,
      },
    ],
  },
  {
    code: 'en-story-c1-06',
    level: 'C1',
    order: 6,
    title: 'The Arithmetic of a Bazaar Stall',
    topic: {
      uz: 'Bozor rastasining hisob-kitobi',
      ru: 'Арифметика базарного прилавка',
      ko: '시장 좌판의 셈법',
    },
    scene: 'bazaar',
    narrator: { id: 'aziz', name: 'Aziz' },
    sentences: [
      {
        id: 's1',
        text: 'In my first year at the bank, I was put in charge of small business loans, which mostly meant reading spreadsheets until my eyes ached.',
        translation: {
          uz: 'Bankdagi birinchi yilimda menga kichik biznes kreditlari topshirildi, bu esa asosan ko‘zlarim og‘rigunicha jadvallarni o‘qish degani edi.',
          ru: 'В первый год работы в банке мне поручили кредиты малому бизнесу, а это в основном означало читать таблицы, пока не заболят глаза.',
          ko: '은행에서 일한 첫해에 저는 소상공인 대출을 맡았는데, 그건 주로 눈이 아플 때까지 스프레드시트를 들여다보는 일이었어요.',
        },
      },
      {
        id: 's2',
        text: 'One application came from Nodira opa, who had been selling dried apricots and nuts at the Chorsu bazaar for twenty-two years and wanted to expand her stall.',
        translation: {
          uz: 'Arizalardan biri Chorsu bozorida yigirma ikki yildan beri quruq o‘rik va yong‘oq sotib kelayotgan va rastasini kengaytirmoqchi bo‘lgan Nodira opadan keldi.',
          ru: 'Одна из заявок пришла от Нодиры-опы, которая двадцать два года продавала курагу и орехи на базаре Чорсу и хотела расширить свой прилавок.',
          ko: '신청서 중 하나는 초르수 시장에서 22년째 말린 살구와 견과류를 팔아 온 노디라 아주머니가 낸 것이었는데, 좌판을 넓히고 싶다고 했어요.',
        },
      },
      {
        id: 's3',
        text: 'On paper her figures made no sense at all, with margins so thin that I could not see how the business had survived a single winter.',
        translation: {
          uz: 'Qog‘ozda uning raqamlari umuman mantiqsiz edi: foydasi shunchalik kam ediki, bu biznes bitta qishdan qanday omon chiqqanini tushuna olmadim.',
          ru: 'На бумаге её цифры не имели никакого смысла: маржа была такой мизерной, что я не понимал, как бизнес пережил хотя бы одну зиму.',
          ko: '서류상 그분의 숫자는 전혀 말이 안 됐어요. 이윤이 너무 적어서 그 장사가 어떻게 겨울 한 번이라도 버텼는지 이해할 수 없었죠.',
        },
      },
      {
        id: 's4',
        text: 'Rather than reject it outright, I decided to spend a Saturday morning at her stall, partly out of curiosity and partly because something did not add up.',
        translation: {
          uz: 'Arizani darhol rad etish o‘rniga, bir shanba kuni ertalabni uning rastasida o‘tkazishga qaror qildim — qisman qiziqqanimdan, qisman esa nimadir to‘g‘ri kelmayotgani uchun.',
          ru: 'Вместо того чтобы сразу отказать, я решил провести субботнее утро у её прилавка — отчасти из любопытства, отчасти потому, что что-то не сходилось.',
          ko: '바로 거절하는 대신, 저는 토요일 아침을 그분의 좌판에서 보내기로 했어요. 호기심도 있었고, 뭔가 앞뒤가 맞지 않는 것 같았거든요.',
        },
      },
      {
        id: 's5',
        text: 'Within an hour I had watched her give a widow extra raisins for free, let a schoolteacher pay next week, and lower her price for a student.',
        translation: {
          uz: 'Bir soat ichida u bir beva ayolga tekinga qo‘shimcha mayiz berganini, bir o‘qituvchiga keyingi hafta to‘lashga ruxsat berganini va bir talabaga narxni tushirganini ko‘rdim.',
          ru: 'За какой-то час я увидел, как она дала вдове лишний изюм бесплатно, разрешила учительнице заплатить на следующей неделе и сбавила цену студенту.',
          ko: '한 시간 만에 저는 그분이 과부에게 건포도를 공짜로 더 얹어 주고, 학교 선생님에게는 다음 주에 갚으라 하고, 학생에게는 값을 깎아 주는 걸 봤어요.',
        },
      },
      {
        id: 's6',
        text: 'Every one of these decisions would have been a mistake according to my spreadsheet, and yet her customers kept returning, often bringing their relatives with them.',
        translation: {
          uz: 'Jadvalimga ko‘ra bu qarorlarning har biri xato bo‘lardi, shunga qaramay mijozlari qaytib kelaverar, ko‘pincha qarindoshlarini ham boshlab kelardi.',
          ru: 'Согласно моей таблице, каждое из этих решений было бы ошибкой, и всё же покупатели возвращались к ней снова и снова, часто приводя с собой родственников.',
          ko: '제 스프레드시트대로라면 그 결정 하나하나가 실수였을 텐데, 손님들은 계속 다시 찾아왔고 친척들까지 데려오는 일이 많았어요.',
        },
      },
      {
        id: 's7',
        text: 'She showed me a worn school notebook in which she recorded every debt by hand, and almost every line had eventually been crossed out as paid.',
        translation: {
          uz: 'U menga har bir qarzni qo‘lda yozib boradigan eskirgan maktab daftarini ko‘rsatdi va undagi deyarli har bir satr oxir-oqibat «to‘landi» deb o‘chirilgan edi.',
          ru: 'Она показала мне потрёпанную школьную тетрадь, куда от руки записывала каждый долг, и почти каждая строчка в итоге была вычеркнута как оплаченная.',
          ko: '그분은 모든 외상을 손으로 적어 둔 낡은 학교 공책을 보여 줬는데, 거의 모든 줄이 결국 “갚음”으로 지워져 있었어요.',
        },
      },
      {
        id: 's8',
        text: '“A bazaar runs on memory,” she said, cracking a walnut, “and people remember who was kind to them in a bad month.”',
        translation: {
          uz: '«Bozor xotira bilan yashaydi, — dedi u yong‘oq chaqa turib, — odamlar yomon oyda kim ularga mehribon bo‘lganini eslab qolishadi».',
          ru: '«Базар держится на памяти, — сказала она, раскалывая грецкий орех, — люди помнят, кто был к ним добр в плохой месяц».',
          ko: '“시장은 기억으로 돌아가요. 사람들은 힘든 달에 누가 자기한테 잘해 줬는지 기억하거든요.” 그분이 호두를 깨며 말했어요.',
        },
      },
      {
        id: 's9',
        text: 'It dawned on me that what she had built was not really a profitable stall but a network of trust, an asset our forms have no column for.',
        translation: {
          uz: 'Shunda uning qurgani aslida daromadli rasta emas, balki ishonch tarmog‘i ekanini angladim — bizning anketalarimizda buning uchun grafa yo‘q.',
          ru: 'И тут до меня дошло: она построила не столько прибыльный прилавок, сколько сеть доверия — актив, для которого в наших анкетах нет графы.',
          ko: '그제야 깨달았어요. 그분이 일군 건 수익성 좋은 좌판이 아니라 신뢰의 그물망이었고, 그건 우리 서류에 적을 칸조차 없는 자산이라는 걸요.',
        },
      },
      {
        id: 's10',
        text: 'That trust had quietly paid for three children’s university fees, which is more than many businesses with far better spreadsheets can say.',
        translation: {
          uz: 'O‘sha ishonch uch farzandning universitet kontraktini jimgina to‘lab bergan edi — hisob-kitobi ancha chiroyli bo‘lgan ko‘plab bizneslar ham bunday deya olmaydi.',
          ru: 'Это доверие тихо оплатило учёбу троих детей в университете — чем могут похвастаться далеко не все компании с куда более красивыми таблицами.',
          ko: '그 신뢰가 세 자녀의 대학 등록금을 조용히 내 줬어요. 훨씬 그럴듯한 스프레드시트를 가진 많은 사업체도 그렇게 말하지는 못하죠.',
        },
      },
      {
        id: 's11',
        text: 'I approved a smaller loan than she had asked for, with a repayment plan built around the seasons rather than the calendar months.',
        translation: {
          uz: 'Men u so‘raganidan kichikroq kreditni ma’qulladim va to‘lov jadvalini kalendar oylariga emas, mavsumlarga moslab tuzdim.',
          ru: 'Я одобрил кредит меньше, чем она просила, с графиком погашения, привязанным не к календарным месяцам, а к сезонам.',
          ko: '저는 그분이 요청한 것보다 적은 금액의 대출을 승인했고, 상환 계획은 달력의 달이 아니라 계절에 맞춰 짰어요.',
        },
      },
      {
        id: 's12',
        text: 'I still trust numbers, of course, but I have learned that some of the most important ones are written in pencil, in notebooks banks never see.',
        translation: {
          uz: 'Albatta, men hali ham raqamlarga ishonaman, lekin eng muhim raqamlarning ba’zilari banklar hech qachon ko‘rmaydigan daftarlarga qalamda yozilishini o‘rgandim.',
          ru: 'Цифрам я, конечно, по-прежнему доверяю, но понял, что некоторые из самых важных записаны карандашом в тетрадях, которых банки никогда не видят.',
          ko: '물론 저는 여전히 숫자를 믿어요. 하지만 가장 중요한 숫자 중 일부는 은행이 결코 보지 못하는 공책에 연필로 적혀 있다는 걸 배웠어요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'spreadsheets',
        meaning: {
          uz: 'elektron jadval',
          ru: 'электронная таблица',
          ko: '스프레드시트',
        },
      },
      {
        word: 'margins',
        meaning: {
          uz: 'foyda ulushi, marja',
          ru: 'маржа, наценка',
          ko: '이윤(폭)',
        },
      },
      {
        word: 'outright',
        meaning: {
          uz: 'darhol, to‘g‘ridan-to‘g‘ri',
          ru: 'сразу, наотрез',
          ko: '즉석에서, 단번에',
        },
      },
      {
        word: 'widow',
        meaning: { uz: 'beva ayol', ru: 'вдова', ko: '과부' },
      },
      {
        word: 'asset',
        meaning: { uz: 'aktiv, boylik', ru: 'актив', ko: '자산' },
      },
      {
        word: 'repayment',
        meaning: { uz: 'qarzni qaytarish', ru: 'погашение', ko: '상환' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'Why did Aziz spend a morning at Nodira opa’s stall?',
        options: [
          'To buy nuts for his family',
          'His manager ordered him to close it',
          'He wanted to start his own stall',
          'Her figures did not make sense to him',
        ],
        answerIndex: 3,
      },
      {
        id: 'q2',
        prompt: 'What did Nodira opa keep in her school notebook?',
        options: [
          'Recipes for dried fruit',
          'A record of customers’ debts',
          'Her children’s exam results',
          'The bank’s phone numbers',
        ],
        answerIndex: 1,
      },
      {
        id: 'q3',
        prompt: 'What does Aziz conclude about Nodira opa’s business?',
        options: [
          'Its real value lies in trust that forms cannot measure',
          'It should have been closed years ago',
          'It succeeds because of its low prices alone',
          'It would be better run by a bank',
        ],
        answerIndex: 0,
      },
    ],
  },
  {
    code: 'en-story-c1-07',
    level: 'C1',
    order: 7,
    title: 'The Hidden Price of Hospitality',
    topic: {
      uz: 'Mehmondo‘stlikning ko‘rinmas narxi',
      ru: 'Скрытая цена гостеприимства',
      ko: '환대의 숨은 대가',
    },
    scene: 'morning',
    narrator: { id: 'dilnoza', name: 'Dilnoza' },
    sentences: [
      {
        id: 's1',
        text: 'At six in the morning, while our guests were still asleep, I stood in the kitchen beside a mountain of plates and quietly did the sums.',
        translation: {
          uz: 'Ertalab soat oltida, mehmonlarimiz hali uxlab yotganida, men oshxonada bir tog‘ likopchalar yonida turib, jimgina hisob-kitob qildim.',
          ru: 'В шесть утра, пока гости ещё спали, я стояла на кухне рядом с горой тарелок и тихо подсчитывала расходы.',
          ko: '아침 여섯 시, 손님들이 아직 자고 있을 때 저는 부엌에서 산더미 같은 접시 옆에 서서 조용히 계산을 해 봤어요.',
        },
      },
      {
        id: 's2',
        text: 'My husband’s cousins had arrived from Namangan for a week, without much warning, as relatives often do, and of course we had welcomed them with open arms.',
        translation: {
          uz: 'Erimning amakivachchalari Namangandan bir haftaga, qarindoshlar odatda qilganidek, deyarli oldindan aytmay kelishgan edi va biz, albatta, ularni quchoq ochib kutib oldik.',
          ru: 'Двоюродные братья и сёстры мужа приехали из Намангана на неделю, почти без предупреждения, как это часто бывает у родственников, и мы, конечно, встретили их с распростёртыми объятиями.',
          ko: '남편의 사촌들이 나망간에서 일주일 일정으로, 친척들이 흔히 그러듯 거의 예고도 없이 찾아왔고, 우리는 물론 두 팔 벌려 맞이했어요.',
        },
      },
      {
        id: 's3',
        text: 'In five days we had spent more than half my monthly salary on meat, fruit and sweets, and I had taken two days of unpaid leave from the pharmacy.',
        translation: {
          uz: 'Besh kunda go‘sht, meva va shirinliklarga oylik maoshimning yarmidan ko‘pini sarfladik, men esa dorixonadan ikki kunlik haq to‘lanmaydigan ta’til oldim.',
          ru: 'За пять дней мы потратили на мясо, фрукты и сладости больше половины моей месячной зарплаты, а я взяла в аптеке два дня за свой счёт.',
          ko: '닷새 동안 고기와 과일, 단것에 제 한 달 월급의 절반 넘게 썼고, 저는 약국에 이틀 무급 휴가까지 냈어요.',
        },
      },
      {
        id: 's4',
        text: 'Let me be clear: I love our tradition of hospitality, and I would not want to live in a country where a guest is treated as an inconvenience.',
        translation: {
          uz: 'Bir narsani aniq aytay: men mehmondo‘stlik an’anamizni yaxshi ko‘raman va mehmonga noqulaylik deb qaraladigan yurtda yashashni istamagan bo‘lardim.',
          ru: 'Скажу прямо: я люблю нашу традицию гостеприимства и не хотела бы жить в стране, где гость считается обузой.',
          ko: '분명히 말해 둘게요. 저는 우리의 환대 전통을 사랑하고, 손님을 귀찮은 존재로 여기는 나라에서는 살고 싶지 않아요.',
        },
      },
      {
        id: 's5',
        text: 'Some of my happiest childhood memories are of strangers being fed at our table simply because they happened to be passing through our street.',
        translation: {
          uz: 'Bolaligimning eng baxtli xotiralaridan ba’zilari — ko‘chamizdan shunchaki o‘tib ketayotgan notanish odamlarning dasturxonimizda mehmon qilingani.',
          ru: 'Одни из самых счастливых воспоминаний моего детства — как за нашим столом кормили незнакомцев просто потому, что они проходили по нашей улице.',
          ko: '제 어린 시절의 가장 행복한 기억 중 일부는, 그저 우리 골목을 지나가던 낯선 사람들이 우리 상에서 밥을 먹던 장면이에요.',
        },
      },
      {
        id: 's6',
        text: 'Still, it is hard to ignore that the costs rarely fall evenly, and that the person washing the dishes at dawn is seldom the one being praised.',
        translation: {
          uz: 'Shunday bo‘lsa-da, xarajatlar kamdan-kam hollarda teng taqsimlanishini, tong saharda idish yuvayotgan odam esa kamdan-kam maqtalishini e’tiborsiz qoldirish qiyin.',
          ru: 'И всё же трудно не замечать, что бремя редко распределяется поровну и что того, кто моет посуду на рассвете, хвалят реже всех.',
          ko: '그래도 그 부담이 공평하게 나뉘는 일은 드물고, 새벽에 설거지하는 사람이 칭찬받는 일은 거의 없다는 걸 외면하기는 어려워요.',
        },
      },
      {
        id: 's7',
        text: 'I also know families in our mahalla who borrow money every autumn so that their tables will not look poorer than their neighbours’.',
        translation: {
          uz: 'Mahallamizda dasturxoni qo‘shnilarnikidan kambag‘alroq ko‘rinmasligi uchun har kuzda qarz oladigan oilalarni ham bilaman.',
          ru: 'Ещё я знаю семьи в нашей махалле, которые каждую осень берут в долг, чтобы их стол не выглядел беднее соседского.',
          ko: '우리 마할라에는 이웃집보다 상차림이 초라해 보이지 않으려고 가을마다 빚을 내는 집들도 있어요.',
        },
      },
      {
        id: 's8',
        text: 'Somewhere along the way, generosity seems to have become tangled up with appearances, and the real question has shifted from “Are they comfortable?” to “What will people say?”',
        translation: {
          uz: 'Qaysidir payt saxiylik ko‘z-ko‘z qilish bilan chigallashib qolganga o‘xshaydi va asosiy savol «Ularga qulaymi?» degan savoldan «Odamlar nima deydi?» degan savolga aylanib ketgan.',
          ru: 'Где-то по дороге щедрость, похоже, переплелась с показухой, и главный вопрос сместился с «Удобно ли им?» на «Что скажут люди?».',
          ko: '어느새 너그러움은 체면과 뒤엉켜 버렸고, 진짜 질문은 “손님들이 편안할까?”에서 “남들이 뭐라고 할까?”로 바뀐 것 같아요.',
        },
      },
      {
        id: 's9',
        text: 'So that evening, I did something that felt almost rebellious and served a simple meal of soup, bread and salad instead of a lavish feast.',
        translation: {
          uz: 'Shuning uchun o‘sha oqshom deyarli isyonkorlikdek tuyulgan ish qildim: dabdabali ziyofat o‘rniga sho‘rva, non va salatdan iborat oddiy taom tortdim.',
          ru: 'Поэтому в тот вечер я сделала то, что казалось почти бунтом: вместо пышного застолья подала простой ужин — суп, хлеб и салат.',
          ko: '그래서 그날 저녁 저는 거의 반항처럼 느껴지는 일을 했어요. 성대한 잔칫상 대신 수프와 빵, 샐러드로 소박한 식사를 차린 거예요.',
        },
      },
      {
        id: 's10',
        text: 'To my surprise, nobody complained, and because I was not running back and forth to the kitchen, I actually sat down and talked with our guests.',
        translation: {
          uz: 'Ajablanarlisi, hech kim norozi bo‘lmadi va oshxonaga u yoqdan-bu yoqqa yugurmaganim uchun haqiqatan o‘tirib, mehmonlarimiz bilan suhbatlashdim.',
          ru: 'К моему удивлению, никто не возмутился, и, раз мне не нужно было бегать туда-сюда на кухню, я наконец села и поговорила с гостями.',
          ko: '놀랍게도 아무도 불평하지 않았고, 부엌을 들락날락하지 않아도 되니 저도 마침내 앉아서 손님들과 이야기를 나눴어요.',
        },
      },
      {
        id: 's11',
        text: 'The eldest cousin told stories about my husband as a naughty boy until well past midnight, and my son laughed so hard that he got hiccups.',
        translation: {
          uz: 'Eng katta amakivachcha yarim tundan ancha o‘tguncha erimning sho‘x bolaligi haqida hikoyalar aytib berdi, o‘g‘lim esa shunchalik kuldiki, hiqichoq tutib qoldi.',
          ru: 'Старший из двоюродных братьев до глубокой ночи рассказывал, каким озорным мальчишкой был мой муж, а сын так хохотал, что начал икать.',
          ko: '사촌 중 맏이가 자정이 훌쩍 넘도록 남편의 개구쟁이 시절 이야기를 들려줬고, 아들은 너무 웃다가 딸꾹질까지 했어요.',
        },
      },
      {
        id: 's12',
        text: 'Perhaps hospitality is measured less by the number of dishes on the table than by whether the host has any strength left to enjoy the guests.',
        translation: {
          uz: 'Balki mehmondo‘stlik dasturxondagi taomlar soni bilan emas, balki mezbonda mehmonlardan zavq olishga kuch qolgan-qolmagani bilan o‘lchanar.',
          ru: 'Возможно, гостеприимство измеряется не столько количеством блюд на столе, сколько тем, остались ли у хозяйки силы радоваться гостям.',
          ko: '어쩌면 환대는 상 위의 음식 가짓수보다, 주인이 손님과 함께하는 시간을 즐길 힘이 남아 있느냐로 재는 건지도 몰라요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'warning',
        meaning: {
          uz: 'ogohlantirish',
          ru: 'предупреждение',
          ko: '예고, 경고',
        },
      },
      {
        word: 'unpaid',
        meaning: {
          uz: 'haq to‘lanmaydigan',
          ru: 'неоплачиваемый',
          ko: '무급의',
        },
      },
      {
        word: 'inconvenience',
        meaning: {
          uz: 'noqulaylik, tashvish',
          ru: 'неудобство, обуза',
          ko: '불편, 성가신 일',
        },
      },
      {
        word: 'evenly',
        meaning: {
          uz: 'teng, baravar',
          ru: 'поровну, равномерно',
          ko: '고르게, 공평하게',
        },
      },
      {
        word: 'tangled',
        meaning: {
          uz: 'chigallashmoq',
          ru: 'запутываться, переплетаться',
          ko: '얽히다',
        },
      },
      {
        word: 'lavish',
        meaning: { uz: 'dabdabali', ru: 'пышный, роскошный', ko: '호화로운' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'Why did Dilnoza take unpaid leave from the pharmacy?',
        options: [
          'She was ill',
          'Her son was on holiday',
          'Relatives were staying with her family',
          'The pharmacy was being repaired',
        ],
        answerIndex: 2,
      },
      {
        id: 'q2',
        prompt: 'How does Dilnoza feel about the tradition of hospitality?',
        options: [
          'She loves it despite its costs',
          'She thinks it should disappear',
          'She believes only rich families should practise it',
          'She finds it embarrassing',
        ],
        answerIndex: 0,
      },
      {
        id: 'q3',
        prompt: 'What happened when she served a simple meal?',
        options: [
          'The guests left early',
          'Her husband was upset',
          'The neighbours criticised her',
          'She was finally able to enjoy her guests',
        ],
        answerIndex: 3,
      },
    ],
  },
  {
    code: 'en-story-c1-08',
    level: 'C1',
    order: 8,
    title: 'To My Sister, on Failing',
    topic: {
      uz: 'Singlimga: muvaffaqiyatsizlik haqida',
      ru: 'Сестре — о неудаче',
      ko: '동생에게, 실패에 대하여',
    },
    scene: 'snow',
    narrator: { id: 'aziz', name: 'Aziz' },
    sentences: [
      {
        id: 's1',
        text: 'Dear Shahzoda, it is snowing outside as I write this, and I cannot stop thinking about your face yesterday when you read the scholarship results.',
        translation: {
          uz: 'Qadrli Shahzoda, buni yozayotganimda tashqarida qor yog‘yapti, kecha grant natijalarini o‘qiganingdagi yuzing esa ko‘z oldimdan ketmayapti.',
          ru: 'Дорогая Шахзода, за окном идёт снег, пока я пишу это, а у меня из головы не выходит твоё лицо вчера, когда ты прочитала результаты конкурса на стипендию.',
          ko: '사랑하는 샤흐조다에게. 이 편지를 쓰는 지금 밖에는 눈이 내리고 있어. 그런데 어제 장학금 결과를 읽던 네 얼굴이 자꾸 떠올라.',
        },
      },
      {
        id: 's2',
        text: 'You had worked harder than anyone I know, and you told me, in a very small voice, that you felt you had let the whole family down.',
        translation: {
          uz: 'Sen men bilgan har qanday odamdan ko‘proq mehnat qilgan eding, lekin menga juda past ovozda butun oilani uyaltirib qo‘ygandek his qilayotganingni aytding.',
          ru: 'Ты работала усерднее всех, кого я знаю, а мне совсем тихо сказала, что чувствуешь, будто подвела всю семью.',
          ko: '넌 내가 아는 누구보다 열심히 했는데, 아주 작은 목소리로 온 가족을 실망시킨 것 같다고 말했지.',
        },
      },
      {
        id: 's3',
        text: 'I did not say much at the time, partly because nothing I said would have helped, and partly because I remembered that feeling far too well.',
        translation: {
          uz: 'O‘shanda ko‘p gapirmadim — qisman hech bir gapim yordam bermasligi uchun, qisman esa o‘sha tuyg‘uni juda yaxshi eslaganim uchun.',
          ru: 'Тогда я почти ничего не сказал — отчасти потому, что слова всё равно бы не помогли, а отчасти потому, что слишком хорошо помнил это чувство.',
          ko: '그때 난 별말을 하지 않았어. 무슨 말을 해도 도움이 안 됐을 것 같기도 했고, 그 기분을 너무 잘 기억하고 있었거든.',
        },
      },
      {
        id: 's4',
        text: 'You were only twelve when I failed my university entrance exam, so you probably do not know how close I came to giving up altogether.',
        translation: {
          uz: 'Men universitetga kirish imtihonidan yiqilganimda sen endigina o‘n ikki yoshda eding, shuning uchun butunlay taslim bo‘lishimga qanchalik oz qolganini bilmasang kerak.',
          ru: 'Тебе было всего двенадцать, когда я провалил вступительный экзамен в университет, так что ты, наверное, не знаешь, как близко я был к тому, чтобы совсем сдаться.',
          ko: '내가 대학 입학시험에 떨어졌을 때 넌 겨우 열두 살이었으니, 내가 얼마나 완전히 포기할 뻔했는지 아마 모를 거야.',
        },
      },
      {
        id: 's5',
        text: 'I spent that year working in our uncle’s shop, convinced that everyone in the mahalla was whispering about me behind my back.',
        translation: {
          uz: 'O‘sha yilni tog‘amizning do‘konida ishlab o‘tkazdim va mahalladagi hamma ortimdan pichirlashayotganiga amin edim.',
          ru: 'Тот год я проработал в магазине нашего дяди, уверенный, что вся махалля шепчется обо мне за спиной.',
          ko: '그해 나는 삼촌 가게에서 일하면서, 마할라 사람들이 다 내 뒤에서 수군거린다고 확신했어.',
        },
      },
      {
        id: 's6',
        text: 'Most of them, I later discovered, were far too busy with their own worries to give my failure more than a passing thought.',
        translation: {
          uz: 'Keyinroq bilsam, ularning aksariyati o‘z tashvishlari bilan shunchalik band ekanki, mening muvaffaqiyatsizligim haqida bir zum ham o‘ylashmagan.',
          ru: 'Позже я понял, что большинство из них были слишком заняты своими заботами, чтобы думать о моём провале дольше минуты.',
          ko: '나중에 알고 보니 대부분은 자기 걱정거리로 바빠서 내 실패는 잠깐 스치듯 생각했을 뿐이더라.',
        },
      },
      {
        id: 's7',
        text: 'I will not pretend that the year was secretly wonderful, because it was not, and anyone who calls failure a gift has probably forgotten how it feels.',
        translation: {
          uz: 'O‘sha yil aslida ajoyib bo‘lgan, deb ko‘rsatmoqchi emasman, chunki unday emasdi, muvaffaqiyatsizlikni sovg‘a deb ataydigan har qanday odam esa uning qanday ekanini unutib qo‘ygan bo‘lsa kerak.',
          ru: 'Не стану делать вид, что тот год втайне был прекрасным, — он таким не был, и тот, кто называет неудачу подарком, наверное, просто забыл, каково это.',
          ko: '그해가 사실은 멋진 해였다고 꾸며 말하진 않을게. 전혀 그렇지 않았으니까. 실패를 선물이라고 부르는 사람은 아마 그 기분을 잊어버린 걸 거야.',
        },
      },
      {
        id: 's8',
        text: 'But it did teach me to tell the difference between what I had lost, which was one chance, and what I still had, which was nearly everything.',
        translation: {
          uz: 'Lekin u menga nimani yo‘qotganim — bitta imkoniyat — bilan hali nimaga ega ekanim — deyarli hamma narsa — o‘rtasidagi farqni ajratishni o‘rgatdi.',
          ru: 'Но он научил меня отличать то, что я потерял, — один шанс, — от того, что у меня осталось, — почти всё.',
          ko: '하지만 그해는 내가 잃은 것, 즉 기회 하나와 아직 가진 것, 즉 거의 모든 것을 구별하는 법을 가르쳐 줬어.',
        },
      },
      {
        id: 's9',
        text: 'It also taught me that the people who love you are not keeping score, however much it may feel that way on a day like yesterday.',
        translation: {
          uz: 'Yana u seni sevadigan odamlar hisob yuritmasligini o‘rgatdi — kechagidek kunda boshqacha tuyulsa ham.',
          ru: 'А ещё он научил меня, что те, кто тебя любит, не ведут счёт, как бы ни казалось обратное в такой день, как вчера.',
          ko: '그리고 널 사랑하는 사람들은 점수를 매기지 않는다는 것도 알게 됐어. 어제 같은 날엔 아무리 그렇게 느껴지더라도 말이야.',
        },
      },
      {
        id: 's10',
        text: 'Mum, by the way, has already told three neighbours how proud she is that you even applied, which tells you everything about her disappointment.',
        translation: {
          uz: 'Aytgancha, oyim allaqachon uchta qo‘shniga sening hujjat topshirganingning o‘zidan qanchalik faxrlanishini aytib bo‘ldi — bu uning «hafsalasi pir bo‘lgani» haqida hamma narsani aytadi.',
          ru: 'Кстати, мама уже рассказала трём соседкам, как она гордится, что ты вообще подала заявку, — вот тебе и всё о её «разочаровании».',
          ko: '그건 그렇고, 엄마는 벌써 이웃 세 명한테 네가 지원한 것만으로도 얼마나 자랑스러운지 말씀하셨어. 엄마의 “실망”이 어떤지 이걸로 다 알 수 있지.',
        },
      },
      {
        id: 's11',
        text: 'So cry today if you need to, and tomorrow, when the snow has stopped, let us sit down over tea and look at the next application together.',
        translation: {
          uz: 'Shuning uchun bugun yig‘lagging kelsa, yig‘la, ertaga esa, qor to‘xtagach, choy ustida birga o‘tirib, keyingi arizani ko‘rib chiqamiz.',
          ru: 'Так что сегодня плачь, если нужно, а завтра, когда снег перестанет, давай сядем за чай и вместе посмотрим следующую заявку.',
          ko: '그러니 오늘은 울고 싶으면 실컷 울어. 그리고 내일 눈이 그치면, 차 한잔하면서 다음 지원서를 같이 보자.',
        },
      },
      {
        id: 's12',
        text: 'With all my love, your older brother Aziz, who failed first, survived, and is still learning to stop counting his mistakes.',
        translation: {
          uz: 'Butun mehrim bilan, birinchi bo‘lib yiqilgan, omon qolgan va hali ham xatolarini sanashni bas qilishni o‘rganayotgan akang Aziz.',
          ru: 'С любовью, твой старший брат Азиз, который провалился первым, выжил и до сих пор учится не считать свои ошибки.',
          ko: '사랑을 담아, 먼저 실패하고 살아남아서, 아직도 자기 실수를 세지 않는 법을 배우는 중인 오빠 아지즈가.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'scholarship',
        meaning: { uz: 'grant, stipendiya', ru: 'стипендия', ko: '장학금' },
      },
      {
        word: 'altogether',
        meaning: { uz: 'butunlay', ru: 'совсем, полностью', ko: '완전히' },
      },
      {
        word: 'whispering',
        meaning: {
          uz: 'pichirlamoq',
          ru: 'шептаться',
          ko: '수군거리다, 속삭이다',
        },
      },
      {
        word: 'pretend',
        meaning: {
          uz: 'o‘zini …dek ko‘rsatmoq',
          ru: 'притворяться, делать вид',
          ko: '~인 척하다',
        },
      },
      {
        word: 'disappointment',
        meaning: {
          uz: 'hafsala pir bo‘lishi, umidsizlik',
          ru: 'разочарование',
          ko: '실망',
        },
      },
      {
        word: 'survived',
        meaning: { uz: 'omon qolmoq', ru: 'выжить', ko: '살아남다' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'Why is Shahzoda upset?',
        options: [
          'She lost her job',
          'She did not get the scholarship',
          'She failed her driving test',
          'She argued with her mother',
        ],
        answerIndex: 1,
      },
      {
        id: 'q2',
        prompt: 'What does Aziz say about people who call failure a gift?',
        options: [
          'They are usually right',
          'They have never failed at all',
          'They have probably forgotten how it feels',
          'They are trying to sell something',
        ],
        answerIndex: 2,
      },
      {
        id: 'q3',
        prompt: 'What does Aziz suggest about their mother’s reaction?',
        options: [
          'She is deeply disappointed in Shahzoda',
          'She has not heard the news yet',
          'She wants Shahzoda to stop studying',
          'She is proud rather than disappointed',
        ],
        answerIndex: 3,
      },
    ],
  },
  {
    code: 'en-story-c1-09',
    level: 'C1',
    order: 9,
    title: 'When the Canal Runs Low',
    topic: {
      uz: 'Ariq sayozlashganda',
      ru: 'Когда мелеет канал',
      ko: '수로의 물이 줄어들 때',
    },
    scene: 'summer',
    narrator: { id: 'timur', name: 'Timur' },
    sentences: [
      {
        id: 's1',
        text: 'This July the temperature in my father’s village reached forty-five degrees, and for the first time in his life, the canal behind his orchard ran almost dry.',
        translation: {
          uz: 'Bu yil iyulda otamning qishlog‘ida harorat qirq besh darajaga yetdi va uning umrida birinchi marta bog‘i ortidagi ariq deyarli qurib qoldi.',
          ru: 'В июле в отцовской деревне жара дошла до сорока пяти градусов, и впервые на его веку канал за садом почти пересох.',
          ko: '올해 7월 아버지가 사시는 마을의 기온이 45도까지 올랐고, 아버지 평생 처음으로 과수원 뒤 수로가 거의 말라 버렸어요.',
        },
      },
      {
        id: 's2',
        text: 'He has grown apricots and grapes on that land for forty years, watering them the way his own father did, by flooding the rows from the canal.',
        translation: {
          uz: 'U bu yerda qirq yildan beri o‘rik va uzum yetishtiradi va ularni o‘z otasi kabi — ariqdan egatlarga suv bostirib sug‘oradi.',
          ru: 'Он сорок лет выращивает на этой земле абрикосы и виноград и поливает их так же, как его отец, — пуская воду из канала по бороздам.',
          ko: '아버지는 그 땅에서 40년 동안 살구와 포도를 키우셨고, 할아버지가 하시던 대로 수로의 물을 이랑에 흘려 넣어 물을 대셨어요.',
        },
      },
      {
        id: 's3',
        text: 'When I suggested drip irrigation, which I had seen in Korean greenhouses, he listened politely and then said that trees, like people, need a proper drink.',
        translation: {
          uz: 'Koreyadagi issiqxonalarda ko‘rgan tomchilatib sug‘orishni taklif qilganimda, u odob bilan tinglab, so‘ng daraxtlar ham odamlar kabi to‘yib suv ichishi kerak, dedi.',
          ru: 'Когда я предложил капельный полив, который видел в корейских теплицах, он вежливо выслушал и сказал, что деревьям, как и людям, нужно как следует напиться.',
          ko: '제가 한국 비닐하우스에서 본 점적 관수를 제안하자, 아버지는 정중하게 들으시더니 나무도 사람처럼 물을 흠뻑 마셔야 한다고 하셨어요.',
        },
      },
      {
        id: 's4',
        text: 'I understood his resistance better than he realised, because it was not really about pipes, but about admitting that the land he knew was changing.',
        translation: {
          uz: 'Men uning qarshiligini u o‘ylaganidan ham yaxshiroq tushunardim, chunki gap aslida quvurlarda emas, balki u bilgan yerning o‘zgarayotganini tan olishda edi.',
          ru: 'Я понимал его сопротивление лучше, чем он думал: дело было не в трубах, а в том, чтобы признать, что знакомая ему земля меняется.',
          ko: '저는 아버지의 반대를 아버지가 생각하시는 것보다 더 잘 이해했어요. 그건 사실 파이프 문제가 아니라, 자신이 알던 땅이 변하고 있다는 걸 인정하는 문제였으니까요.',
        },
      },
      {
        id: 's5',
        text: 'Across Central Asia, summers are growing hotter, the glaciers that feed our rivers are shrinking, and farmers everywhere are quietly asking the same uncomfortable questions.',
        translation: {
          uz: 'Butun Markaziy Osiyoda yozlar tobora isib bormoqda, daryolarimizni to‘ydiradigan muzliklar kichraymoqda va hamma joyda dehqonlar jimgina bir xil noqulay savollarni berishmoqda.',
          ru: 'По всей Центральной Азии лето становится жарче, ледники, питающие наши реки, сокращаются, и фермеры повсюду молча задают себе одни и те же неудобные вопросы.',
          ko: '중앙아시아 전역에서 여름은 점점 더 뜨거워지고, 우리 강에 물을 대 주는 빙하는 줄어들고 있어요. 그리고 곳곳의 농부들이 조용히 같은 불편한 질문을 던지고 있죠.',
        },
      },
      {
        id: 's6',
        text: 'Yet I have learned that statistics rarely change anyone’s mind, least of all a man who has trusted his own hands for longer than I have been alive.',
        translation: {
          uz: 'Biroq statistika kamdan-kam hollarda kimningdir fikrini o‘zgartirishini angladim, ayniqsa men tug‘ilmasimdan oldin ham o‘z qo‘llariga ishonib kelgan odamning fikrini.',
          ru: 'Но я усвоил, что статистика редко кого-то переубеждает, а уж тем более человека, который доверял собственным рукам дольше, чем я живу на свете.',
          ko: '하지만 통계는 좀처럼 사람의 마음을 바꾸지 못한다는 걸 저는 배웠어요. 제가 태어나기 전부터 자기 손을 믿어 온 사람이라면 더더욱 그렇죠.',
        },
      },
      {
        id: 's7',
        text: 'So instead of arguing, I asked whether I could try the system on just three rows of apricots at the far end of the orchard.',
        translation: {
          uz: 'Shuning uchun bahslashish o‘rniga, tizimni bog‘ning narigi chetidagi atigi uch qator o‘rik daraxtida sinab ko‘rsam bo‘ladimi, deb so‘radim.',
          ru: 'Поэтому вместо того чтобы спорить, я спросил, можно ли опробовать систему всего на трёх рядах абрикосов в дальнем конце сада.',
          ko: '그래서 저는 말다툼하는 대신, 과수원 맨 끝에 있는 살구나무 세 줄에만 그 방식을 시험해 봐도 되느냐고 여쭤봤어요.',
        },
      },
      {
        id: 's8',
        text: 'By August those three rows were visibly greener than the rest, and they had used less than half the water the other trees received.',
        translation: {
          uz: 'Avgustga kelib o‘sha uch qator qolganlaridan sezilarli darajada yashilroq edi va boshqa daraxtlar olgan suvning yarmidan ham kamrog‘ini sarflagan edi.',
          ru: 'К августу эти три ряда были заметно зеленее остальных, а воды израсходовали меньше половины того, что получали другие деревья.',
          ko: '8월이 되자 그 세 줄은 나머지보다 눈에 띄게 푸르렀고, 다른 나무들이 받은 물의 절반도 안 썼어요.',
        },
      },
      {
        id: 's9',
        text: 'My father walked along them every evening without saying a word, which, for him, is roughly the equivalent of a public apology.',
        translation: {
          uz: 'Otam har oqshom ularning yonidan indamay o‘tib yurdi — uning uchun bu taxminan omma oldida kechirim so‘rash bilan barobar.',
          ru: 'Отец каждый вечер молча проходил вдоль них, что для него примерно равносильно публичному извинению.',
          ko: '아버지는 매일 저녁 아무 말 없이 그 줄을 따라 걸으셨는데, 아버지로서는 그게 공개 사과나 다름없어요.',
        },
      },
      {
        id: 's10',
        text: 'Next spring we will lay pipes through half the orchard, though he insists on keeping a few rows the old way, and frankly I do not blame him.',
        translation: {
          uz: 'Kelasi bahorda bog‘ning yarmiga quvur yotqizamiz, garchi u bir necha qatorni eski usulda qoldirishni talab qilsa ham — rostini aytsam, men uni ayblamayman.',
          ru: 'Следующей весной мы проложим трубы через половину сада, хотя он настаивает, чтобы несколько рядов остались по-старому, — и, честно говоря, я его не виню.',
          ko: '내년 봄에는 과수원 절반에 파이프를 깔 거예요. 아버지는 몇 줄은 옛날 방식대로 두겠다고 고집하시는데, 솔직히 저는 그런 아버지를 탓하지 않아요.',
        },
      },
      {
        id: 's11',
        text: 'I suspect the future of farming here will depend less on any single technology than on whether stubborn fathers and impatient sons can learn from each other.',
        translation: {
          uz: 'Menimcha, bu yerda dehqonchilikning kelajagi biror texnologiyadan ko‘ra ko‘proq qaysar otalar va sabrsiz o‘g‘illar bir-biridan o‘rgana olishiga bog‘liq bo‘ladi.',
          ru: 'Подозреваю, что будущее земледелия здесь будет зависеть не столько от какой-то одной технологии, сколько от того, смогут ли упрямые отцы и нетерпеливые сыновья учиться друг у друга.',
          ko: '제 생각에 이곳 농업의 미래는 어떤 한 가지 기술보다, 고집 센 아버지와 성급한 아들이 서로에게서 배울 수 있느냐에 더 달려 있을 것 같아요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'orchard',
        meaning: { uz: 'mevali bog‘', ru: 'фруктовый сад', ko: '과수원' },
      },
      {
        word: 'irrigation',
        meaning: {
          uz: 'sug‘orish',
          ru: 'орошение, полив',
          ko: '관개, 물 대기',
        },
      },
      {
        word: 'resistance',
        meaning: { uz: 'qarshilik', ru: 'сопротивление', ko: '저항, 반대' },
      },
      {
        word: 'glaciers',
        meaning: { uz: 'muzlik', ru: 'ледник', ko: '빙하' },
      },
      {
        word: 'visibly',
        meaning: {
          uz: 'ko‘zga ko‘rinarli darajada',
          ru: 'заметно',
          ko: '눈에 띄게',
        },
      },
      {
        word: 'stubborn',
        meaning: { uz: 'qaysar', ru: 'упрямый', ko: '고집 센' },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'Where had Timur seen drip irrigation before?',
        options: [
          'On television',
          'At a farm in Russia',
          'In his uncle’s garden',
          'In Korean greenhouses',
        ],
        answerIndex: 3,
      },
      {
        id: 'q2',
        prompt: 'Why did Timur try the system on only three rows?',
        options: [
          'He did not have enough money for more',
          'The other trees were already dead',
          'He wanted to convince his father with results, not arguments',
          'His neighbours asked him to',
        ],
        answerIndex: 2,
      },
      {
        id: 'q3',
        prompt: 'What does the father’s silent evening walk most likely show?',
        options: [
          'He quietly accepts that his son was right',
          'He is angry about the new pipes',
          'He is checking for thieves',
          'He has stopped caring about the orchard',
        ],
        answerIndex: 0,
      },
    ],
  },
  {
    code: 'en-story-c1-10',
    level: 'C1',
    order: 10,
    title: 'A Guest in My Own Home',
    topic: {
      uz: 'O‘z uyimda mehmon',
      ru: 'Гость в собственном доме',
      ko: '내 집에서 손님이 되다',
    },
    scene: 'night',
    narrator: { id: 'timur', name: 'Timur' },
    sentences: [
      {
        id: 's1',
        text: 'After seven years of working in South Korea, I came home to Uzbekistan expecting to slip back into my old life like a hand into a familiar glove.',
        translation: {
          uz: 'Janubiy Koreyada yetti yil ishlaganimdan so‘ng, eski hayotimga tanish qo‘lqopga qo‘l kirgandek osongina qaytaman, deb O‘zbekistonga qaytdim.',
          ru: 'После семи лет работы в Южной Корее я вернулся в Узбекистан, рассчитывая скользнуть обратно в прежнюю жизнь, как рука в привычную перчатку.',
          ko: '한국에서 7년을 일하고 우즈베키스탄으로 돌아올 때, 저는 익숙한 장갑에 손을 넣듯 예전 삶으로 자연스럽게 돌아갈 줄 알았어요.',
        },
      },
      {
        id: 's2',
        text: 'On my first night back, the whole mahalla came to greet me, and my mother seated me in the place of honour, furthest from the door.',
        translation: {
          uz: 'Qaytgan birinchi kechamda butun mahalla meni ko‘rgani keldi, onam esa meni eshikdan eng uzoqdagi to‘rga o‘tqazdi.',
          ru: 'В первый вечер после возвращения вся махалля пришла меня поприветствовать, а мама усадила меня на почётное место — дальше всех от двери.',
          ko: '돌아온 첫날 밤 마할라 사람들이 모두 저를 맞으러 왔고, 어머니는 저를 문에서 가장 먼 상석에 앉히셨어요.',
        },
      },
      {
        id: 's3',
        text: 'It was meant as a kindness, of course, but it was the seat we always gave to guests, and I could not quite shake that feeling all evening.',
        translation: {
          uz: 'Albatta, bu mehr belgisi edi, lekin bu biz doim mehmonlarga beradigan joy edi va butun oqshom bu tuyg‘udan qutula olmadim.',
          ru: 'Конечно, это было из лучших побуждений, но это было место, которое мы всегда отдавали гостям, и весь вечер я не мог отделаться от этого чувства.',
          ko: '물론 다정한 마음에서였지만, 그 자리는 우리가 늘 손님에게 내주던 자리였고, 저는 저녁 내내 그 느낌을 떨쳐 낼 수가 없었어요.',
        },
      },
      {
        id: 's4',
        text: 'In the weeks that followed, the signs piled up: I got lost in streets that had been rebuilt, and I laughed at jokes a second too late.',
        translation: {
          uz: 'Keyingi haftalarda belgilar ko‘payib bordi: qayta qurilgan ko‘chalarda adashib qoldim, hazillarga esa bir soniya kechikib kulardim.',
          ru: 'В следующие недели знаки накапливались: я терялся на перестроенных улицах и смеялся над шутками на секунду позже остальных.',
          ko: '그 후 몇 주 동안 그런 신호들이 쌓여 갔어요. 새로 지어진 거리에서 길을 잃었고, 농담에는 한 박자 늦게 웃었죠.',
        },
      },
      {
        id: 's5',
        text: 'My nephews addressed me with the careful politeness reserved for visitors, and my friends had built entire lives around routines that no longer included me.',
        translation: {
          uz: 'Jiyanlarim menga mehmonlarga xos ehtiyotkor xushmuomalalik bilan murojaat qilishardi, do‘stlarim esa butun hayotlarini endi meni o‘z ichiga olmaydigan odatlar atrofida qurib bo‘lishgan edi.',
          ru: 'Племянники обращались ко мне с осторожной вежливостью, какую приберегают для гостей, а друзья выстроили целую жизнь вокруг распорядка, в котором меня больше не было.',
          ko: '조카들은 손님에게나 쓰는 조심스러운 예의로 저를 대했고, 친구들은 더 이상 제가 끼어 있지 않은 일상을 중심으로 삶을 꾸려 놓았더라고요.',
        },
      },
      {
        id: 's6',
        text: 'Even my manners had changed, apparently, because people kept teasing me about the Korean habit of bowing slightly whenever I said thank you.',
        translation: {
          uz: 'Aftidan, hatto odoblarim ham o‘zgargan ekan, chunki odamlar «rahmat» deganimda bir oz egilib ta’zim qiladigan koreyscha odatim ustidan hazillashishardi.',
          ru: 'Похоже, даже мои манеры изменились: все подшучивали над моей корейской привычкой слегка кланяться, когда я говорю «спасибо».',
          ko: '심지어 제 몸가짐까지 달라졌는지, 사람들은 제가 고맙다고 할 때마다 살짝 고개를 숙이는 한국식 습관을 가지고 놀려 댔어요.',
        },
      },
      {
        id: 's7',
        text: 'Abroad, I had been the foreigner, and I had quietly assumed that this feeling would simply disappear the moment my plane landed in Tashkent.',
        translation: {
          uz: 'Chet elda men begona edim va bu tuyg‘u samolyotim Toshkentga qo‘ngan zahoti shunchaki yo‘qoladi, deb ichimda o‘ylagan edim.',
          ru: 'За границей я был иностранцем и втайне полагал, что это чувство просто исчезнет, как только мой самолёт приземлится в Ташкенте.',
          ko: '외국에서 저는 이방인이었고, 비행기가 타슈켄트에 내리는 순간 그 느낌은 그냥 사라질 거라고 은근히 믿고 있었어요.',
        },
      },
      {
        id: 's8',
        text: 'Instead, I discovered that it is possible to be a stranger in two places at once, which is a loneliness I would not wish on anyone.',
        translation: {
          uz: 'Buning o‘rniga, bir vaqtning o‘zida ikki joyda begona bo‘lish mumkinligini angladim — bu men hech kimga ravo ko‘rmaydigan yolg‘izlik.',
          ru: 'Вместо этого я обнаружил, что можно быть чужим в двух местах одновременно, — и такого одиночества я не пожелал бы никому.',
          ko: '그런데 오히려, 두 곳에서 동시에 이방인이 될 수도 있다는 걸 알게 됐어요. 누구에게도 바라지 않을 외로움이었죠.',
        },
      },
      {
        id: 's9',
        text: 'Things began to shift one Saturday, when the neighbours gathered for a hashar to fix an elderly neighbour’s roof and nobody thought to invite me.',
        translation: {
          uz: 'Bir shanba kuni hammasi o‘zgara boshladi: qo‘shnilar keksa bir qo‘shnining tomini tuzatish uchun hasharga yig‘ilishdi va hech kim meni chaqirishni xayoliga ham keltirmadi.',
          ru: 'Всё начало меняться в одну субботу, когда соседи собрались на хашар, чтобы починить крышу пожилому соседу, и никому даже в голову не пришло позвать меня.',
          ko: '변화는 어느 토요일에 시작됐어요. 이웃들이 연로한 이웃의 지붕을 고치려고 하샤르(마을 공동 작업)에 모였는데, 아무도 저를 부를 생각을 하지 않았던 거예요.',
        },
      },
      {
        id: 's10',
        text: 'I went anyway, hauled sheets of roofing until my hands were raw, and by lunchtime someone was shouting at me to hurry up, which felt wonderful.',
        translation: {
          uz: 'Baribir bordim, qo‘llarim shilinib ketguncha tom listlarini tashidim, tushlikka borib esa kimdir menga «Tezroq bo‘l!» deb baqirardi — bu juda yoqimli edi.',
          ru: 'Я всё равно пошёл, таскал кровельные листы, пока не стёр руки, и к обеду кто-то уже кричал мне, чтобы я поторапливался, — и это было чудесно.',
          ko: '저는 그래도 갔고, 손이 다 까질 때까지 지붕 자재를 날랐어요. 점심때쯤엔 누군가 저한테 빨리빨리 하라고 소리치고 있었는데, 그게 정말 좋았어요.',
        },
      },
      {
        id: 's11',
        text: 'Nobody shouts at a guest, after all, and that evening my mother let me sit wherever I liked, which happened to be beside the door.',
        translation: {
          uz: 'Axir mehmonga hech kim baqirmaydi, o‘sha oqshom esa onam xohlagan joyimga o‘tirishimga ruxsat berdi — u eshik yonidagi joy bo‘lib chiqdi.',
          ru: 'В конце концов, на гостя никто не кричит, и в тот вечер мама разрешила мне сесть где захочу, — и это оказалось место у двери.',
          ko: '손님한테 소리치는 사람은 없잖아요. 그날 저녁 어머니는 제가 원하는 자리에 앉게 해 주셨는데, 그게 마침 문 옆자리였어요.',
        },
      },
      {
        id: 's12',
        text: 'I have come to believe that home is not a place you simply return to, but one you have to earn back, one shared chore at a time.',
        translation: {
          uz: 'Endi ishonamanki, uy shunchaki qaytib keladigan joy emas, balki birga qilingan har bir yumush bilan qaytadan qozonish kerak bo‘lgan joydir.',
          ru: 'Теперь я верю, что дом — это не место, куда просто возвращаются, а место, которое приходится заново заслуживать, одно общее дело за другим.',
          ko: '이제 저는 집이란 그냥 돌아가는 곳이 아니라, 함께하는 일 하나하나로 다시 얻어 내야 하는 곳이라고 믿어요.',
        },
      },
    ],
    vocabulary: [
      {
        word: 'familiar',
        meaning: {
          uz: 'tanish, odatiy',
          ru: 'знакомый, привычный',
          ko: '익숙한',
        },
      },
      {
        word: 'honour',
        meaning: { uz: 'hurmat, sharaf', ru: 'честь, почёт', ko: '명예, 존경' },
      },
      {
        word: 'politeness',
        meaning: { uz: 'xushmuomalalik', ru: 'вежливость', ko: '예의, 공손함' },
      },
      {
        word: 'teasing',
        meaning: {
          uz: 'hazillashmoq, masxara qilmoq',
          ru: 'подшучивать, дразнить',
          ko: '놀리다',
        },
      },
      {
        word: 'stranger',
        meaning: {
          uz: 'begona, notanish odam',
          ru: 'чужой, незнакомец',
          ko: '낯선 사람, 이방인',
        },
      },
      {
        word: 'chore',
        meaning: {
          uz: 'yumush, ish',
          ru: 'хлопоты, (домашняя) работа',
          ko: '허드렛일, 잡일',
        },
      },
    ],
    questions: [
      {
        id: 'q1',
        prompt: 'How long did Timur work in South Korea?',
        options: ['Two years', 'Five years', 'Seven years', 'Twenty years'],
        answerIndex: 2,
      },
      {
        id: 'q2',
        prompt: 'Why did the seat of honour make Timur uncomfortable?',
        options: [
          'It was too close to the door',
          'It was the seat usually given to guests',
          'It was where his father used to sit',
          'It was broken',
        ],
        answerIndex: 1,
      },
      {
        id: 'q3',
        prompt: 'Why did being shouted at feel wonderful to Timur?',
        options: [
          'He enjoys arguments',
          'He had not heard Uzbek for years',
          'He was finally treated as one of them, not as a guest',
          'He was paid well for the work',
        ],
        answerIndex: 2,
      },
    ],
  },
];
