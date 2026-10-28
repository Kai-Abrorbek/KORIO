import { ExpressionProficiency } from '../../../../expressions/schemas/expression-node.schema';
import { ExpressionSpeechLevel } from '../../../../expressions/schemas/expression.schema';
import {
  defineExpressionTopic,
  expressionDrafts,
  localized,
  type ExpressionDraftRow,
} from '../expression-topic.helpers';

const PRAISER_OR_CELEBRATOR = localized(
  '칭찬하거나 축하하는 사람',
  'Maqtayotgan yoki tabriklayotgan kishi',
  'The person giving a compliment or congratulations',
  'Человек, который хвалит или поздравляет',
);

const COMPLIMENT_OR_CELEBRATION_RECIPIENT = localized(
  '칭찬이나 축하를 받는 사람',
  'Maqtov yoki tabrikni olayotgan kishi',
  'The person receiving a compliment or congratulations',
  'Человек, который принимает похвалу или поздравление',
);

const SUPPORTER = localized(
  '힘든 소식을 듣고 위로와 도움을 건네는 사람',
  'Og‘ir xabarni eshitib, tasalli va yordam taklif qilayotgan kishi',
  'The person offering comfort and support after difficult news',
  'Человек, который предлагает утешение и поддержку после трудной новости',
);

const SUPPORT_RECIPIENT = localized(
  '위로나 도움을 받으며 필요한 방식을 말하는 사람',
  'Tasalli yoki yordam olayotib, nima kerakligini aytayotgan kishi',
  'The person receiving support and stating what they need',
  'Человек, который принимает поддержку и говорит о своих потребностях',
);

const COMPLIMENT_CONTEXT = localized(
  '일상에서 상대의 노력·선택·아이디어·기술을 구체적으로 알아보고 칭찬할 때 사용해요.',
  'Kundalik hayotda birovning mehnati, tanlovi, g‘oyasi yoki mahoratini aniq e’tirof etishda ishlatiladi.',
  'Use this to recognize and compliment someone’s effort, choice, idea, or skill in everyday life.',
  'Используйте, чтобы конкретно отметить усилия, выбор, идею или навык человека в повседневной жизни.',
);
const COMPLIMENT_USAGE = localized(
  '맥락에 맞는 구체적인 칭찬을 진심으로 하고, 외모나 몸을 함부로 평가하거나 칭찬으로 부담을 주지 않아요.',
  'Maqtov aniq, samimiy va vaziyatga mos bo‘lsin; tashqi ko‘rinish yoki tanani baholamang va bosim qilmang.',
  'Keep compliments specific, sincere, and relevant; do not evaluate someone’s appearance or body without invitation or create pressure.',
  'Хвалите конкретно, искренне и по делу; не оценивайте без приглашения внешность или тело и не создавайте давление.',
);

const RECEIVE_COMPLIMENT_CONTEXT = localized(
  '칭찬을 들은 뒤 자연스럽게 감사하고 받아들이거나, 구체적인 부분을 확인하며 대화를 이어 갈 때 사용해요.',
  'Maqtovdan keyin tabiiy minnatdorlik bildirish, uni qabul qilish yoki aniq jihatni so‘rashda ishlatiladi.',
  'Use this to accept a compliment naturally, thank the speaker, or ask what specifically they appreciated.',
  'Используйте, чтобы естественно принять похвалу, поблагодарить или уточнить, что именно понравилось.',
);
const RECEIVE_COMPLIMENT_USAGE = localized(
  '칭찬을 받는 사람이 반드시 부정하거나 겸손하게 낮출 필요는 없고, 불편해하면 더 칭찬하도록 압박하지 않아요.',
  'Maqtovni olgan kishi uni inkor etishi yoki o‘zini kamsitishi shart emas; noqulay bo‘lsa davom ettirishga majburlamang.',
  'The recipient does not have to deny or minimize the compliment; if it feels uncomfortable, do not press for a reaction.',
  'Получатель не обязан отрицать похвалу или принижать себя; если ему неловко, не требуйте реакции.',
);

const CELEBRATION_CONTEXT = localized(
  '합격·졸업·생일·기념일·새로운 시작·프로젝트 완료 같은 좋은 소식을 축하할 때 사용해요.',
  'Qabul, bitiruv, tug‘ilgan kun, yubiley, yangi boshlanish yoki loyiha yakunini tabriklashda ishlatiladi.',
  'Use this to celebrate good news such as acceptance, graduation, birthdays, anniversaries, new beginnings, or completed projects.',
  'Используйте для поздравления с поступлением, выпуском, днём рождения, годовщиной, новым началом или завершением проекта.',
);
const CELEBRATION_USAGE = localized(
  '좋은 소식과 관계를 확인하고 진심을 담아 축하하며, 공개 행사나 큰 반응을 당연하게 요구하지 않아요.',
  'Xushxabar va munosabatga mos samimiy tabrik ayting; ommaviy bayram yoki katta reaksiya talab qilmang.',
  'Match the congratulations to the news and relationship, and do not assume the person wants a public celebration or a big reaction.',
  'Соотносите поздравление с событием и отношениями и не предполагайте, что человек хочет публичного праздника или бурной реакции.',
);

const CELEBRATION_RESPONSE_CONTEXT = localized(
  '축하를 받은 뒤 감사하고 기쁨을 나누며, 함께한 사람들의 공을 자연스럽게 인정할 때 사용해요.',
  'Tabrikdan keyin minnatdorlik bildirish, quvonchni bo‘lishish va yordam berganlarni tabiiy e’tirof etishda ishlatiladi.',
  'Use this to thank others for congratulations, share the joy, and naturally recognize people who contributed.',
  'Используйте, чтобы поблагодарить за поздравление, разделить радость и естественно отметить вклад других.',
);
const CELEBRATION_RESPONSE_USAGE = localized(
  '공을 나누는 것은 선택이며, 축하받는 사람의 성취를 지우거나 반드시 겸손하게 낮추도록 요구하지 않아요.',
  'Natijani boshqalar bilan bo‘lishish ixtiyoriy; insonning yutug‘ini kamaytirmang yoki majburiy kamtarlik talab qilmang.',
  'Sharing credit is optional; do not erase the recipient’s achievement or require self-minimizing modesty.',
  'Делиться заслугой необязательно; не обесценивайте достижение и не требуйте уничижительной скромности.',
);

const COMFORT_CONTEXT = localized(
  '실망·실수·힘든 소식을 들었을 때 상대의 감정을 인정하고 판단 없이 들어 주며 위로할 때 사용해요.',
  'Ko‘ngilsizlik, xato yoki og‘ir xabardan keyin hissiyotni tan olib, hukmsiz tinglash va tasalli berishda ishlatiladi.',
  'Use this after disappointment, mistakes, or difficult news to acknowledge feelings, listen without judgment, and offer comfort.',
  'Используйте после разочарования, ошибки или трудной новости, чтобы признать чувства, выслушать без осуждения и поддержать.',
);
const COMFORT_USAGE = localized(
  '슬픔을 비교하거나 축소하지 말고, “다 잘될 거예요”나 “적어도”처럼 결과를 장담하거나 좋은 면을 서두르는 말을 피해요.',
  'Qayg‘uni solishtirmang yoki kichraytirmang; “hammasi yaxshi bo‘ladi” yoki “hech bo‘lmasa” kabi kafolat va shoshma ijobiylikdan saqlaning.',
  'Do not compare or minimize pain; avoid guarantees or rushed silver linings such as “everything will be fine” or “at least.”',
  'Не сравнивайте и не обесценивайте боль; избегайте гарантий и поспешных утешений вроде «всё будет хорошо» или «зато».',
);

const SUPPORT_CONTEXT = localized(
  '힘든 상황에서 필요한 도움·거리·연락 시점을 묻고 상대가 고른 방식으로 후속 지원을 조율할 때 사용해요.',
  'Qiyin vaziyatda kerakli yordam, masofa va keyingi aloqa vaqtini so‘rab, tanlangan usulda ko‘makni kelishishda ishlatiladi.',
  'Use this to ask about needed help, space, and follow-up timing, then coordinate support in the person’s preferred way.',
  'Используйте, чтобы спросить о помощи, личном пространстве и времени следующего контакта и согласовать поддержку удобным способом.',
);
const SUPPORT_USAGE = localized(
  '감정이나 자세한 사정을 공개하도록 압박하지 말고, 거절과 거리 요청을 존중하며 실제로 가능한 도움만 약속해요.',
  'Hissiyot yoki tafsilotni oshkor qilishga majburlamang; rad javobi va masofa istagini hurmat qilib, faqat bajariladigan yordamni va’da qiling.',
  'Do not pressure anyone to disclose feelings or details; respect refusals and requests for space, and promise only help you can provide.',
  'Не принуждайте раскрывать чувства или подробности; уважайте отказ и просьбу о дистанции и обещайте только посильную помощь.',
);

function rows(
  data: readonly ExpressionDraftRow[],
  context: ReturnType<typeof localized>,
  speaker: ReturnType<typeof localized>,
  usageNote: ReturnType<typeof localized>,
) {
  return expressionDrafts(data, { context, speaker, usageNote });
}

function buildGivingComplimentsCongratulationsAndComfortTopic() {
  // prettier-ignore
  return defineExpressionTopic({
    code: 'giving-compliments-congratulations-and-comfort',
    title: localized(
      '칭찬하고 축하하고 위로하기',
      'Maqtash, tabriklash va tasalli berish',
      'Giving compliments, congratulations, and comfort',
      'Похвала, поздравления и поддержка',
    ),
    description: localized(
      '노력과 성취를 진심으로 인정하고, 칭찬과 축하에 자연스럽게 답하며, 힘든 감정을 축소하지 않고 필요한 도움을 물어요.',
      'Mehnat va yutuqni samimiy e’tirof eting, maqtov va tabrikka tabiiy javob bering, og‘ir hissiyotni kichraytirmay kerakli yordamni so‘rang.',
      'Recognize effort and achievement sincerely, respond naturally to praise and congratulations, and ask what support is needed without minimizing difficult feelings.',
      'Искренне отмечайте усилия и достижения, естественно отвечайте на похвалу и поздравления и спрашивайте о нужной поддержке, не обесценивая тяжёлые чувства.',
    ),
    order: 20,
    placement: { section: 1, unit: 20 },
    difficulty: 3,
    nodes: [
      {
        code: 'give-specific-everyday-compliments',
        title: localized(
          '노력·선택·기술을 구체적으로 칭찬하기',
          'Mehnat, tanlov va mahoratni aniq maqtash',
          'Giving specific compliments on effort, choices, and skills',
          'Конкретная похвала усилий, выбора и навыков',
        ),
        description: localized(
          '준비 과정과 설명·선택·아이디어·문제 해결처럼 실제로 본 부분을 구체적으로 칭찬해요.',
          'Tayyorgarlik, tushuntirish, tanlov, g‘oya va muammoni hal qilish kabi ko‘rilgan jihatni aniq maqtang.',
          'Compliment specific things you observed, such as preparation, explanation, choices, ideas, and problem-solving.',
          'Хвалите конкретно замеченные вещи: подготовку, объяснение, выбор, идеи и решение проблем.',
        ),
        icon: 'sparkles-outline',
        proficiency: ExpressionProficiency.BEGINNER,
        expressions: [
          ...rows([
            ['preparation-shows', '준비를 많이 한 게 보여요.', 'junbireul mani han ge boyeoyo', '많이 준비한 노력이 보인다고 칭찬하는 말', 'Ko‘p tayyorlangan mehnat ko‘rinishini maqtash', 'I can see that you prepared a lot.', 'Видно, что вы много готовились.'],
            ['explanation-easy-to-understand', '설명이 아주 이해하기 쉬웠어요.', 'seolmyeongi aju ihaehagi swiwosseoyo', '설명이 이해하기 쉬웠다고 칭찬하는 말', 'Tushuntirish oson anglashilganini maqtash', 'Your explanation was very easy to understand.', 'Ваше объяснение было очень понятным.'],
            ['choice-fits-situation', '그 선택이 상황에 잘 맞아요.', 'geu seontaegi sanghwange jal majayo', '선택이 상황에 잘 맞는다고 칭찬하는 말', 'Tanlov vaziyatga mos ekanini maqtash', 'That choice fits the situation well.', 'Этот выбор хорошо подходит к ситуации.'],
            ['presentation-calm-and-clear', '발표가 차분하고 명확했어요.', 'balpyoga chabunhago myeonghwakhaesseoyo', '발표가 차분하고 명확했다고 칭찬하는 말', 'Taqdimot xotirjam va aniq bo‘lganini maqtash', 'Your presentation was calm and clear.', 'Ваша презентация была спокойной и ясной.'],
            ['idea-was-good', '오늘 아이디어가 참 좋았어요.', 'oneul aidieoga cham joasseoyo', '오늘 제안한 아이디어를 칭찬하는 말', 'Bugungi g‘oyani maqtash', 'Your idea today was very good.', 'Сегодня у вас была отличная идея.'],
            ['consistent-practice-shows', '꾸준히 연습한 게 보여요.', 'kkujunhi yeonseuphan ge boyeoyo', '꾸준히 연습한 노력이 보인다고 칭찬하는 말', 'Muntazam mashq qilinganini maqtash', 'Your consistent practice shows.', 'Видно, что вы регулярно тренировались.'],
            ['problem-solving-impressive', '문제를 해결한 방법이 인상적이었어요.', 'munjereul haegyeolhan bangbeobi insangjeogieosseoyo', '문제 해결 방법이 인상적이었다고 칭찬하는 말', 'Muammoni hal qilish usulini maqtash', 'The way you solved the problem was impressive.', 'Способ, которым вы решили проблему, произвёл впечатление.'],
            ['made-it-well-casual', '이거 정말 잘 만들었어.', 'igeo jeongmal jal mandeureosseo', '친한 사람에게 만든 것을 칭찬하는 말', 'Yaqin kishining yasagan narsasini maqtash', 'You made this really well.', 'Ты очень хорошо это сделал(а).', ExpressionSpeechLevel.CASUAL],
          ], COMPLIMENT_CONTEXT, PRAISER_OR_CELEBRATOR, COMPLIMENT_USAGE),
          ...rows([
            ['ask-what-was-good', '어떤 점이 좋았는지 말해 줄 수 있나요?', 'eotteon jeomi joanneunji malhae jul su innayo', '칭찬한 구체적인 부분을 물어보는 말', 'Qaysi jihat yoqqanini so‘rash', 'Could you tell me what you liked?', 'Можете сказать, что именно вам понравилось?'],
            ['noticed-my-effort', '제 노력을 알아봐 주셨네요.', 'je noryeogeul arabwa jusyeonneyo', '자신의 노력을 알아봐 준 것을 받아들이는 말', 'Mehnati e’tirof etilganini qabul qilish', 'You noticed my effort.', 'Вы заметили мои усилия.'],
            ['saw-that-part-positively', '그 부분을 좋게 봐 주셨군요.', 'geu bubuneul joke bwa jusyeotgunyo', '상대가 특정 부분을 좋게 봤음을 확인하는 말', 'Muayyan jihat ijobiy baholanganini tasdiqlash', 'I see that you liked that part.', 'Понятно, что вам понравилась именно эта часть.'],
            ['specific-comment-helped', '구체적으로 말해 주셔서 이해가 됐어요.', 'guchejeogeuro malhae jusyeoseo ihaega dwaesseoyo', '구체적인 칭찬 덕분에 장점을 이해했다고 말하는 표현', 'Aniq maqtov tufayli kuchli jihatni tushunganini aytish', 'Your specific comment helped me understand what worked.', 'Благодаря конкретному отзыву я понял(а), что получилось хорошо.'],
            ['noticed-important-point', '제가 중요하게 생각한 점을 봐 주셨어요.', 'jega jungyohage saenggakhan jeomeul bwa jusyeosseoyo', '자신이 중요하게 여긴 점을 알아봐 줬다고 말하는 표현', 'Muhim deb bilgan jihati ko‘rilganini aytish', 'You noticed the part that mattered to me.', 'Вы заметили то, что было важно для меня.'],
            ['compliment-gives-strength', '아직 배우는 중인데 그 말이 힘이 돼요.', 'ajik baeuneun junginde geu mari himi dwaeyo', '배우는 중에 칭찬이 힘이 된다고 말하는 표현', 'O‘rganish paytida maqtov kuch berganini aytish', 'I am still learning, and that comment encourages me.', 'Я ещё учусь, и ваши слова меня поддерживают.'],
            ['remember-compliment', '그 칭찬을 기억할게요.', 'geu chingchaneul gieokhalgeyo', '받은 칭찬을 기억하겠다고 말하는 표현', 'Maqtovni eslab qolishini aytish', 'I will remember that compliment.', 'Я запомню эту похвалу.'],
          ], COMPLIMENT_CONTEXT, COMPLIMENT_OR_CELEBRATION_RECIPIENT, COMPLIMENT_USAGE),
        ],
      },
      {
        code: 'receive-and-respond-to-compliments',
        title: localized(
          '칭찬을 자연스럽게 받고 답하기',
          'Maqtovni tabiiy qabul qilish va javob berish',
          'Receiving and responding to compliments naturally',
          'Естественное принятие похвалы и ответ',
        ),
        description: localized(
          '칭찬을 부정하지 않고 감사와 기쁨을 표현하며, 칭찬하는 사람은 진심과 구체적인 이유를 덧붙여요.',
          'Maqtovni inkor qilmay minnatdorlik va quvonchni bildiring; maqtovchi samimiy sababni aniq aytsin.',
          'Accept praise without dismissing it, express thanks or pleasure, and let the giver add sincere, specific reasons.',
          'Принимайте похвалу без отрицания, выражайте благодарность или радость, а хвалящий пусть добавит искреннюю конкретную причину.',
        ),
        icon: 'chatbubble-ellipses-outline',
        proficiency: ExpressionProficiency.BEGINNER,
        expressions: [
          ...rows([
            ['thank-for-compliment', '칭찬해 주셔서 감사해요.', 'chingchanhae jusyeoseo gamsahaeyo', '칭찬에 감사하는 기본 표현', 'Maqtov uchun minnatdorlik bildirish', 'Thank you for the compliment.', 'Спасибо за комплимент.'],
            ['happy-to-hear-that', '그렇게 말해 주셔서 기뻐요.', 'geureoke malhae jusyeoseo gippeoyo', '칭찬을 들어 기쁘다고 답하는 표현', 'Bunday so‘zdan xursandligini aytish', 'I am happy to hear you say that.', 'Мне приятно это слышать.'],
            ['agree-did-that-well', '저도 그 부분은 잘했다고 생각해요.', 'jeodo geu bubuneun jalhaetdago saenggakhaeyo', '칭찬받은 부분을 스스로도 잘했다고 인정하는 표현', 'Maqtalgan qismni o‘zi ham yaxshi qilganini tan olish', 'I also think I did that part well.', 'Я тоже думаю, что хорошо справился(-ась) с этой частью.'],
            ['surprised-by-compliment', '예상하지 못한 칭찬이라 놀랐어요.', 'yesanghaji motan chingchanira nollasseoyo', '예상하지 못한 칭찬에 놀랐다고 말하는 표현', 'Kutilmagan maqtovdan hayronligini aytish', 'I was surprised by the unexpected compliment.', 'Я удивился(-ась) неожиданной похвале.'],
            ['compliment-built-confidence', '그 말을 들으니 자신감이 생겨요.', 'geu mareul deureuni jasingami saenggyeoyo', '칭찬을 듣고 자신감이 생긴다고 말하는 표현', 'Maqtovdan ishonch paydo bo‘lganini aytish', 'Hearing that gives me confidence.', 'От этих слов у меня появляется уверенность.'],
            ['use-strength-next-time', '다음에도 그 부분을 살려 볼게요.', 'daeumedo geu bubuneul sallyeo bolgeyo', '칭찬받은 장점을 다음에도 살리겠다고 말하는 표현', 'Maqtalgan kuchli jihatni keyingi safar ham ishlatishini aytish', 'I will try to build on that strength next time.', 'В следующий раз я постараюсь использовать эту сильную сторону.'],
            ['compliment-feels-awkward', '칭찬을 받으면 조금 어색해요.', 'chingchaneul badeumyeon jogeum eosaekhaeyo', '칭찬을 받는 것이 조금 어색하다고 솔직히 말하는 표현', 'Maqtovni qabul qilish biroz noqulayligini aytish', 'I feel a little awkward when I receive compliments.', 'Мне немного неловко, когда меня хвалят.'],
            ['thanks-i-like-it-too-casual', '고마워, 나도 마음에 들어.', 'gomawo nado maeume deureo', '친한 사람의 칭찬에 자연스럽게 답하는 말', 'Yaqin kishining maqtoviga tabiiy javob berish', 'Thanks, I like it too.', 'Спасибо, мне тоже нравится.', ExpressionSpeechLevel.CASUAL],
          ], RECEIVE_COMPLIMENT_CONTEXT, COMPLIMENT_OR_CELEBRATION_RECIPIENT, RECEIVE_COMPLIMENT_USAGE),
          ...rows([
            ['compliment-is-sincere', '진심으로 한 말이에요.', 'jinsimeuro han marieyo', '칭찬이 진심이라고 알려 주는 표현', 'Maqtov samimiy ekanini aytish', 'I meant the compliment sincerely.', 'Я сказал(а) это искренне.'],
            ['especially-last-part', '특히 마지막 부분이 좋았어요.', 'teukhi majimak bubuni joasseoyo', '특히 좋았던 부분을 구체적으로 말하는 표현', 'Ayniqsa oxirgi qism yoqqanini aytish', 'I especially liked the last part.', 'Мне особенно понравилась последняя часть.'],
            ['process-also-impressive', '결과뿐 아니라 과정도 인상적이었어요.', 'gyeolgwappun anira gwajeongdo insangjeogieosseoyo', '결과와 함께 과정도 칭찬하는 말', 'Natija bilan birga jarayonni ham maqtash', 'The process was impressive, not just the result.', 'Впечатлил не только результат, но и процесс.'],
            ['not-meant-as-pressure', '부담을 주려는 뜻은 아니에요.', 'budameul juryeoneun tteuseun anieyo', '칭찬으로 부담을 주려는 것이 아니라고 말하는 표현', 'Maqtov bilan bosim qilmoqchi emasligini aytish', 'I did not mean to put pressure on you.', 'Я не хотел(а) создавать давление.'],
            ['stop-if-uncomfortable', '불편했다면 더 말하지 않을게요.', 'bulpyeonhaetdamyeon deo malhaji aneulgeyo', '칭찬이 불편했다면 멈추겠다는 표현', 'Maqtov noqulay bo‘lsa to‘xtashini aytish', 'If that made you uncomfortable, I will not continue.', 'Если вам было неловко, я не буду продолжать.'],
            ['wanted-to-recognize-effort', '노력한 부분이 보여서 그걸 말해 주고 싶었어요.', 'noryeokhan bubuni boyeoseo geugeol malhae jugo sipeosseoyo', '보인 노력을 인정해 주고 싶었다고 말하는 표현', 'Ko‘ringan mehnatni e’tirof etmoqchi bo‘lganini aytish', 'I wanted to acknowledge the effort I saw.', 'Мне хотелось отметить ваши усилия.'],
            ['no-immediate-response-needed', '칭찬에 바로 답하지 않아도 괜찮아요.', 'chingchane baro daphaji anado gwaenchanayo', '칭찬에 즉시 반응하지 않아도 된다고 알려 주는 표현', 'Maqtovga darhol javob shart emasligini aytish', 'You do not have to respond to the compliment right away.', 'Необязательно сразу отвечать на похвалу.'],
          ], RECEIVE_COMPLIMENT_CONTEXT, PRAISER_OR_CELEBRATOR, RECEIVE_COMPLIMENT_USAGE),
        ],
      },
      {
        code: 'celebrate-achievements-and-milestones',
        title: localized(
          '성취·합격·생일·기념일 축하하기',
          'Yutuq, qabul, tug‘ilgan kun va yubileyni tabriklash',
          'Celebrating achievements, acceptance, birthdays, and anniversaries',
          'Поздравление с достижениями, поступлением, днём рождения и годовщиной',
        ),
        description: localized(
          '좋은 소식을 확인하고 합격·졸업·생일·새 출발·프로젝트 완료와 기념일을 상황에 맞게 축하해요.',
          'Xushxabarni aniqlab, qabul, bitiruv, tug‘ilgan kun, yangi boshlanish, loyiha yakuni va yubileyni mos tabriklang.',
          'Confirm the good news and congratulate acceptance, graduation, birthdays, new beginnings, project completion, and anniversaries appropriately.',
          'Уточняйте хорошую новость и уместно поздравляйте с поступлением, выпуском, днём рождения, новым началом, завершением проекта и годовщиной.',
        ),
        icon: 'gift-outline',
        proficiency: ExpressionProficiency.INTERMEDIATE,
        expressions: [
          ...rows([
            ['congratulate-good-news', '좋은 소식 들었어요. 정말 축하해요.', 'joeun sosik deureosseoyo jeongmal chukhahaeyo', '좋은 소식을 듣고 진심으로 축하하는 말', 'Xushxabarni eshitib chin dildan tabriklash', 'I heard the wonderful news. Congratulations.', 'Я слышал(а) прекрасную новость. Поздравляю.'],
            ['congratulate-acceptance', '합격을 진심으로 축하해요.', 'hapgyeogeul jinsimeuro chukhahaeyo', '합격을 진심으로 축하하는 말', 'Qabul qilinganingiz bilan chin dildan tabriklash', 'Congratulations on being accepted.', 'Искренне поздравляю с поступлением.'],
            ['congratulate-graduation', '졸업을 축하합니다.', 'joreobeul chukhahamnida', '졸업을 격식 있게 축하하는 말', 'Bitiruv bilan rasmiy tabriklash', 'Congratulations on your graduation.', 'Поздравляю с выпуском.'],
            ['happy-birthday', '생일 축하해요.', 'saengil chukhahaeyo', '생일을 축하하는 기본 표현', 'Tug‘ilgan kun bilan tabriklash', 'Happy birthday.', 'С днём рождения.'],
            ['congratulate-new-start', '새로운 일을 시작하게 된 걸 축하해요.', 'saeroun ireul sijakhage doen geol chukhahaeyo', '새로운 일을 시작하게 된 것을 축하하는 말', 'Yangi ish boshlanishini tabriklash', 'Congratulations on starting something new.', 'Поздравляю с новым начинанием.'],
            ['congratulate-project-finish', '프로젝트를 잘 마친 걸 축하해요.', 'peurojekteureul jal machin geol chukhahaeyo', '프로젝트 완료를 축하하는 말', 'Loyiha yaxshi yakunlanganini tabriklash', 'Congratulations on completing the project successfully.', 'Поздравляю с успешным завершением проекта.'],
            ['congratulate-anniversary', '뜻깊은 기념일을 축하드려요.', 'tteutgipeun ginyeomireul chukhadeuryeoyo', '뜻깊은 기념일을 정중하게 축하하는 말', 'Muhim yubiley bilan muloyim tabriklash', 'Congratulations on this meaningful anniversary.', 'Поздравляю со знаменательной годовщиной.'],
            ['congratulations-casual', '정말 축하해!', 'jeongmal chukhahae', '친한 사람에게 진심으로 축하하는 말', 'Yaqin kishini chin dildan tabriklash', 'Congratulations!', 'Поздравляю!', ExpressionSpeechLevel.CASUAL],
          ], CELEBRATION_CONTEXT, PRAISER_OR_CELEBRATOR, CELEBRATION_USAGE),
          ...rows([
            ['announce-acceptance', '저 합격했어요.', 'jeo hapgyeokhaesseoyo', '자신의 합격 소식을 전하는 말', 'Qabul qilinganini aytish', 'I was accepted.', 'Я поступил(а).'],
            ['announce-graduation', '드디어 졸업했어요.', 'deudieo joreophaesseoyo', '드디어 졸업했다고 소식을 전하는 말', 'Nihoyat bitirganini aytish', 'I finally graduated.', 'Я наконец выпустился(-ась).'],
            ['announce-birthday', '오늘이 제 생일이에요.', 'oneuri je saengirieyo', '오늘이 자신의 생일이라고 말하는 표현', 'Bugun tug‘ilgan kuni ekanini aytish', 'Today is my birthday.', 'Сегодня мой день рождения.'],
            ['announce-new-job', '새 직장에서 일하게 됐어요.', 'sae jikjangeseo ilhage dwaesseoyo', '새 직장에서 일하게 되었다고 알리는 말', 'Yangi ish joyida ishlashini aytish', 'I am starting a new job.', 'Я начинаю новую работу.'],
            ['announce-project-completion', '프로젝트를 무사히 마쳤어요.', 'peurojekteureul musahi machyeosseoyo', '프로젝트를 잘 마쳤다고 알리는 말', 'Loyihani muvaffaqiyatli yakunlaganini aytish', 'I completed the project successfully.', 'Я успешно завершил(а) проект.'],
            ['announce-anniversary', '오늘이 우리 기념일이에요.', 'oneuri uri ginyeomirieyo', '오늘이 함께하는 기념일이라고 알리는 말', 'Bugun umumiy yubiley ekanini aytish', 'Today is our anniversary.', 'Сегодня наша годовщина.'],
            ['team-reached-goal', '우리 팀이 목표를 달성했어요.', 'uri timi mokpyoreul dalseonghaesseoyo', '팀이 목표를 달성했다고 알리는 말', 'Jamoa maqsadga erishganini aytish', 'Our team reached its goal.', 'Наша команда достигла цели.'],
          ], CELEBRATION_CONTEXT, COMPLIMENT_OR_CELEBRATION_RECIPIENT, CELEBRATION_USAGE),
        ],
      },
      {
        code: 'respond-to-congratulations-and-share-credit',
        title: localized(
          '축하에 답하고 기쁨과 공 나누기',
          'Tabrikka javob berib, quvonch va e’tirofni bo‘lishish',
          'Responding to congratulations and sharing joy and credit',
          'Ответ на поздравления и разделение радости и заслуг',
        ),
        description: localized(
          '축하에 감사하고 기쁨을 표현하며, 성취를 함께 만든 사람을 원할 때 자연스럽게 언급해요.',
          'Tabrik uchun minnatdorlik va quvonchni ayting, yutuqqa hissa qo‘shganlarni istaganda tabiiy eslang.',
          'Thank others for congratulations, express joy, and naturally mention people who contributed when you want to.',
          'Благодарите за поздравления, выражайте радость и по желанию естественно отмечайте тех, кто внёс вклад.',
        ),
        icon: 'people-outline',
        proficiency: ExpressionProficiency.INTERMEDIATE,
        expressions: [
          ...rows([
            ['thank-for-congratulations', '축하해 주셔서 감사해요.', 'chukhahae jusyeoseo gamsahaeyo', '축하에 감사하는 기본 표현', 'Tabrik uchun minnatdorlik bildirish', 'Thank you for the congratulations.', 'Спасибо за поздравление.'],
            ['thank-for-sharing-joy', '함께 기뻐해 주셔서 고마워요.', 'hamkke gippeohae jusyeoseo gomawoyo', '함께 기뻐해 준 것에 감사하는 말', 'Quvonchni birga bo‘lishganiga minnatdorlik bildirish', 'Thank you for sharing my happiness.', 'Спасибо, что радуетесь вместе со мной.'],
            ['support-helped-me-here', '응원해 주신 덕분에 여기까지 왔어요.', 'eungwonhae jusin deokbune yeogikkaji wasseoyo', '응원 덕분에 성취할 수 있었다고 공을 나누는 말', 'Qo‘llab-quvvatlash tufayli shu yerga yetganini aytish', 'Your support helped me get this far.', 'Ваша поддержка помогла мне дойти до этого.'],
            ['team-achievement', '팀원들과 함께 이룬 일이에요.', 'timwondeulgwa hamkke irun irieyo', '팀원들과 함께 이룬 성취라고 말하는 표현', 'Yutuq jamoa bilan birga qo‘lga kiritilganini aytish', 'It is something I achieved together with my teammates.', 'Мы достигли этого вместе с командой.'],
            ['share-joy-with-helpers', '도와주신 분들과 기쁨을 나누고 싶어요.', 'dowajusin bundeulgwa gippeumeul nanugo sipeoyo', '도와준 사람들과 기쁨을 나누고 싶다고 말하는 표현', 'Yordam berganlar bilan quvonchni bo‘lishishni aytish', 'I want to share this joy with the people who helped me.', 'Я хочу разделить эту радость с теми, кто мне помог.'],
            ['achievement-not-real-yet', '아직 실감이 잘 안 나요.', 'ajik silgami jal an nayo', '성취가 아직 실감 나지 않는다고 말하는 표현', 'Yutuq hali to‘liq anglashilmayotganini aytish', 'It still does not feel real yet.', 'Я пока ещё не до конца это осознал(а).'],
            ['prepare-next-step', '다음 단계도 차근차근 준비해 볼게요.', 'daeum dangyedo chageunchageun junbihae bolgeyo', '다음 단계도 차분히 준비하겠다고 말하는 표현', 'Keyingi bosqichga ham asta-sekin tayyorlanishini aytish', 'I will prepare for the next step one step at a time.', 'Я буду постепенно готовиться к следующему этапу.'],
            ['thanks-for-congratulating-casual', '축하해 줘서 고마워!', 'chukhahae jwoseo gomawo', '친한 사람의 축하에 감사하는 말', 'Yaqin kishining tabrigiga minnatdorlik bildirish', 'Thanks for congratulating me!', 'Спасибо за поздравление!', ExpressionSpeechLevel.CASUAL],
          ], CELEBRATION_RESPONSE_CONTEXT, COMPLIMENT_OR_CELEBRATION_RECIPIENT, CELEBRATION_RESPONSE_USAGE),
          ...rows([
            ['effort-made-it-meaningful', '꾸준히 노력한 결과라 더 뜻깊어요.', 'kkujunhi noryeokhan gyeolgwara deo tteutgipeoyo', '꾸준한 노력의 결과라 더 뜻깊다고 축하하는 말', 'Muntazam mehnat natijani yanada qadrli qilganini aytish', 'It is even more meaningful because of your consistent effort.', 'Это особенно значимо благодаря вашим постоянным усилиям.'],
            ['enjoy-this-joy', '이 기쁨을 충분히 누리면 좋겠어요.', 'i gippeumeul chungbunhi nurimyeon jokesseoyo', '성취의 기쁨을 충분히 누리길 바라는 말', 'Yutuq quvonchidan to‘liq bahramand bo‘lishini tilash', 'I hope you take time to enjoy this happiness.', 'Надеюсь, вы в полной мере насладитесь этой радостью.'],
            ['congratulate-contributors-too', '함께한 분들에게도 축하를 전할게요.', 'hamkkehan bundeuregedo chukhareul jeonhalgeyo', '함께한 사람들에게도 축하를 전하겠다는 말', 'Hissa qo‘shganlarni ham tabriklashini aytish', 'I will congratulate the others who were part of it too.', 'Я также поздравлю тех, кто участвовал вместе с вами.'],
            ['celebrate-preferred-way', '원하는 방식으로 기념하면 좋겠어요.', 'wonhaneun bangsigeuro ginyeomhamyeon jokesseoyo', '원하는 방식으로 기념하길 바라는 말', 'O‘zi xohlagan usulda nishonlashni tilash', 'I hope you celebrate in the way you prefer.', 'Надеюсь, вы отметите это так, как вам хочется.'],
            ['support-future-plans', '앞으로의 계획도 응원할게요.', 'apeuroui gyehoekdo eungwonhalgeyo', '앞으로의 계획도 응원하겠다는 말', 'Kelgusi rejalarni ham qo‘llab-quvvatlashini aytish', 'I will support your future plans too.', 'Я также буду поддерживать ваши дальнейшие планы.'],
            ['ask-celebration-preference', '어떤 방식으로 기념하고 싶어요?', 'eotteon bangsigeuro ginyeomhago sipeoyo', '어떤 방식으로 기념하고 싶은지 묻는 말', 'Qanday nishonlashni istashini so‘rash', 'How would you like to celebrate?', 'Как вы хотели бы это отметить?'],
            ['respect-quiet-celebration', '조용한 축하가 더 편하면 그렇게 할게요.', 'joyonghan chukhaga deo pyeonhamyeon geureoke halgeyo', '조용한 축하를 원하면 존중하겠다는 말', 'Tinch tabrik qulayroq bo‘lsa shuni hurmat qilish', 'If a quiet celebration feels better, we will do that.', 'Если вам комфортнее тихое поздравление, так и сделаем.'],
          ], CELEBRATION_RESPONSE_CONTEXT, PRAISER_OR_CELEBRATOR, CELEBRATION_RESPONSE_USAGE),
        ],
      },
      {
        code: 'acknowledge-difficult-feelings-and-comfort',
        title: localized(
          '힘든 감정을 인정하며 위로하기',
          'Og‘ir hissiyotni tan olib, tasalli berish',
          'Acknowledging difficult feelings and offering comfort',
          'Признание тяжёлых чувств и поддержка',
        ),
        description: localized(
          '실망·실수·힘든 소식 뒤의 감정을 단정하지 않고 조심스럽게 인정하며, 해결을 서두르지 않고 들어 줘요.',
          'Ko‘ngilsizlik, xato yoki og‘ir xabardan keyingi hissiyotni aniq belgilamasdan ehtiyotkor tan oling va yechimga shoshilmay tinglang.',
          'Acknowledge feelings after disappointment, mistakes, or difficult news without assuming, and listen without rushing to solve them.',
          'Осторожно признавайте чувства после разочарования, ошибки или трудной новости, не навязывая их и не торопясь всё исправить.',
        ),
        icon: 'heart-outline',
        proficiency: ExpressionProficiency.ADVANCED,
        expressions: [
          ...rows([
            ['heavy-after-hearing-news', '그 소식을 들으니 마음이 무거워요.', 'geu sosigeul deureuni maeumi mugeowoyo', '힘든 소식을 듣고 마음이 무겁다고 전하는 말', 'Og‘ir xabarni eshitib ko‘ngli og‘irligini aytish', 'My heart feels heavy hearing that news.', 'Мне тяжело слышать эту новость.'],
            ['may-feel-disappointed', '많이 실망스러울 수 있겠어요.', 'mani silmangseureoul su itgesseoyo', '상대가 크게 실망했을 가능성을 조심스럽게 인정하는 말', 'Katta ko‘ngilsizlik bo‘lishi mumkinligini ehtiyotkor tan olish', 'That may feel very disappointing.', 'Наверное, это может сильно разочаровывать.'],
            ['mistake-may-feel-complicated', '실수한 일 때문에 마음이 복잡할 수 있겠어요.', 'silsuhan il ttaemune maeumi bokjaphal su itgesseoyo', '실수 뒤 마음이 복잡할 수 있음을 인정하는 말', 'Xatodan keyin hissiyotlar murakkab bo‘lishi mumkinligini tan olish', 'You may have complicated feelings about the mistake.', 'Из-за этой ошибки чувства могут быть сложными.'],
            ['no-rush-to-sort-feelings', '지금 느끼는 감정을 서둘러 정리하지 않아도 돼요.', 'jigeum neukkineun gamjeongeul seodulleo jeongrihaji anado dwaeyo', '감정을 서둘러 정리할 필요가 없다고 알려 주는 말', 'Hissiyotni shoshilmay anglash mumkinligini aytish', 'You do not have to sort out your feelings right away.', 'Необязательно сразу разбираться со своими чувствами.'],
            ['listen-without-judgment', '이야기하고 싶으면 판단하지 않고 들을게요.', 'iyagihago sipeumyeon pandanhaji anko deureulgeyo', '원할 때 판단 없이 듣겠다고 말하는 표현', 'Istasa hukmsiz tinglashini aytish', 'If you want to talk, I will listen without judgment.', 'Если захотите поговорить, я выслушаю без осуждения.'],
            ['unsure-what-to-say-stay', '뭐라고 말해야 할지 모르겠지만 곁에 있을게요.', 'mworago malhaeya halji moreugetjiman gyeote isseulgeyo', '할 말을 모르지만 곁에 있겠다고 전하는 표현', 'Nima deyishni bilmasa ham yonida bo‘lishini aytish', 'I do not know what to say, but I will stay with you.', 'Я не знаю, что сказать, но останусь рядом.'],
            ['no-forced-silver-lining', '좋은 점을 억지로 찾지 않아도 돼요.', 'joeun jeomeul eokjiro chatji anado dwaeyo', '좋은 면을 억지로 찾을 필요가 없다고 말하는 표현', 'Yaxshi tomonni majburan izlash shart emasligini aytish', 'You do not have to force yourself to find a bright side.', 'Не нужно заставлять себя искать положительную сторону.'],
            ['must-have-hurt-casual', '많이 속상했겠다.', 'mani soksanghaetgetda', '친한 사람의 속상함을 조심스럽게 인정하는 말', 'Yaqin kishining qattiq xafa bo‘lganini ehtiyotkor tan olish', 'That sounds like it was very upsetting.', 'Похоже, тебе было очень тяжело.', ExpressionSpeechLevel.CASUAL],
          ], COMFORT_CONTEXT, SUPPORTER, COMFORT_USAGE),
          ...rows([
            ['feelings-complicated-now', '지금은 마음이 많이 복잡해요.', 'jigeumeun maeumi mani bokjaphaeyo', '현재 마음이 복잡하다고 말하는 표현', 'Hozir hissiyotlari murakkabligini aytish', 'My feelings are complicated right now.', 'Сейчас у меня сложные чувства.'],
            ['disappointed-by-result', '결과가 아쉬워서 속상해요.', 'gyeolgwaga aswiwoseo soksanghaeyo', '결과가 아쉬워 속상하다고 말하는 표현', 'Natijadan afsuslanib xafa ekanini aytish', 'I am upset because the result was disappointing.', 'Мне тяжело из-за неудачного результата.'],
            ['keep-thinking-about-mistake', '실수한 부분이 계속 생각나요.', 'silsuhan bubuni gyesok saenggangnayo', '실수한 부분이 계속 떠오른다고 말하는 표현', 'Xato qilgan joyi xayoliga qayta kelishini aytish', 'I keep thinking about the mistake.', 'Я продолжаю думать о своей ошибке.'],
            ['not-ready-to-say-okay', '아직 괜찮다고 말하기는 어려워요.', 'ajik gwaenchantago malhagineun eoryeowoyo', '아직 괜찮다고 말하기 어렵다고 밝히는 표현', 'Hali hammasi joyida deyish qiyinligini aytish', 'I am not ready to say that I am okay yet.', 'Мне пока трудно сказать, что всё в порядке.'],
            ['listen-before-solutions', '해결책보다 제 이야기를 먼저 들어 주세요.', 'haegyeolchaekboda je iyagireul meonjeo deureo juseyo', '해결책보다 먼저 이야기를 들어 달라고 요청하는 말', 'Yechimdan oldin hikoyani tinglashni so‘rash', 'Please listen to me before offering solutions.', 'Сначала выслушайте меня, прежде чем предлагать решения.'],
            ['do-not-minimize-event', '그 일을 가볍게 말하지 않았으면 해요.', 'geu ireul gabyeopge malhaji anasseumyeon haeyo', '힘든 일을 가볍게 말하지 말아 달라는 표현', 'Og‘ir voqeani yengil deb aytmaslikni so‘rash', 'I would rather you did not make light of it.', 'Пожалуйста, не относитесь к этому как к пустяку.'],
            ['acknowledgment-feels-relieving', '그렇게 인정해 주니 조금 편해져요.', 'geureoke injeonghae juni jogeum pyeonhaejyeoyo', '감정을 인정해 줘서 조금 편해진다고 답하는 표현', 'Hissiyot tan olingani uchun biroz yengillashganini aytish', 'I feel a little more at ease because you acknowledged that.', 'Мне немного легче, потому что вы это признали.'],
          ], COMFORT_CONTEXT, SUPPORT_RECIPIENT, COMFORT_USAGE),
        ],
      },
      {
        code: 'ask-and-coordinate-support',
        title: localized(
          '필요한 도움·거리·후속 연락 조율하기',
          'Kerakli yordam, masofa va keyingi aloqani kelishish',
          'Coordinating needed help, space, and follow-up',
          'Согласование помощи, дистанции и дальнейшей связи',
        ),
        description: localized(
          '말하기·조용히 있기·혼자 있기·구체적인 도움 가운데 필요한 것을 묻고, 연락 시점과 비밀 유지를 조율해요.',
          'Gaplashish, jim turish, yolg‘iz qolish yoki aniq yordamdan qaysi biri kerakligini so‘rab, aloqa va maxfiylikni kelishing.',
          'Ask whether talking, quiet company, space, or concrete help is wanted, and coordinate follow-up and privacy.',
          'Спрашивайте, нужен ли разговор, тихое присутствие, пространство или конкретная помощь, и согласовывайте связь и конфиденциальность.',
        ),
        icon: 'hand-left-outline',
        proficiency: ExpressionProficiency.ADVANCED,
        expressions: [
          ...rows([
            ['need-time-alone', '지금은 혼자 있을 시간이 필요해요.', 'jigeumeun honja isseul sigani piryohaeyo', '지금은 혼자 있을 시간이 필요하다고 말하는 표현', 'Hozir yolg‘iz qolish uchun vaqt kerakligini aytish', 'I need some time alone right now.', 'Сейчас мне нужно побыть одному (одной).'],
            ['want-quiet-company', '잠깐 같이 있어 주면 좋겠어요.', 'jamkkan gachi isseo jumyeon jokesseoyo', '잠시 곁에 있어 달라고 요청하는 말', 'Bir oz yonida bo‘lishni so‘rash', 'I would like you to stay with me for a while.', 'Я хочу, чтобы вы немного побыли рядом.'],
            ['want-break-from-contact', '오늘은 연락을 쉬고 싶어요.', 'oneureun yeollageul swigo sipeoyo', '오늘은 연락을 쉬고 싶다고 말하는 표현', 'Bugun aloqadan tanaffus qilishni aytish', 'I would like a break from contact today.', 'Сегодня я хочу отдохнуть от общения.'],
            ['ask-contact-tomorrow', '내일 다시 연락해 줄 수 있나요?', 'naeil dasi yeollakhae jul su innayo', '내일 다시 연락해 달라고 요청하는 말', 'Ertaga yana bog‘lanishni so‘rash', 'Could you contact me again tomorrow?', 'Можете снова связаться со мной завтра?'],
            ['keep-this-private', '이 일은 다른 사람에게 말하지 말아 주세요.', 'i ireun dareun saramege malhaji mara juseyo', '이 일을 다른 사람에게 알리지 말아 달라는 표현', 'Bu voqeani boshqalarga aytmaslikni so‘rash', 'Please do not tell other people about this.', 'Пожалуйста, не рассказывайте об этом другим.'],
            ['find-solution-together', '해결 방법을 함께 찾아보고 싶어요.', 'haegyeol bangbeobeul hamkke chajabogo sipeoyo', '해결 방법을 함께 찾고 싶다고 말하는 표현', 'Yechimni birga izlashni aytish', 'I would like to look for a solution together.', 'Я хочу вместе поискать решение.'],
            ['need-practical-help', '지금은 실질적인 도움이 필요해요.', 'jigeumeun siljiljeogin doumi piryohaeyo', '지금은 실질적인 도움이 필요하다고 말하는 표현', 'Hozir amaliy yordam kerakligini aytish', 'I need practical help right now.', 'Сейчас мне нужна практическая помощь.'],
            ['contact-first-if-needed-casual', '필요하면 내가 먼저 연락할게.', 'piryohamyeon naega meonjeo yeollakhalge', '친한 사람에게 필요할 때 먼저 연락하겠다고 말하는 표현', 'Yaqin kishiga kerak bo‘lsa o‘zi bog‘lanishini aytish', 'I will contact you first if I need to.', 'Если понадобится, я сам(а) свяжусь.', ExpressionSpeechLevel.CASUAL],
          ], SUPPORT_CONTEXT, SUPPORT_RECIPIENT, SUPPORT_USAGE),
          ...rows([
            ['ask-most-helpful-now', '지금 무엇이 가장 도움이 될까요?', 'jigeum mueosi gajang doumi doelkkayo', '지금 가장 필요한 도움을 묻는 말', 'Hozir nima eng foydali bo‘lishini so‘rash', 'What would be most helpful right now?', 'Что сейчас помогло бы больше всего?'],
            ['offer-talk-or-quiet', '이야기할까요, 잠시 조용히 있을까요?', 'iyagihalkkayo jamsi joyonghi isseulkkayo', '말할지 조용히 있을지 선택을 묻는 말', 'Gaplashish yoki jim turishni tanlashni so‘rash', 'Would you like to talk, or shall we sit quietly for a while?', 'Хотите поговорить или немного посидим в тишине?'],
            ['ask-need-time-alone', '혼자 있을 시간이 필요한가요?', 'honja isseul sigani piryohangayo', '혼자 있을 시간이 필요한지 묻는 말', 'Yolg‘iz qolish uchun vaqt kerakligini so‘rash', 'Do you need some time alone?', 'Вам нужно побыть одному (одной)?'],
            ['ask-concrete-help', '제가 할 수 있는 구체적인 일이 있을까요?', 'jega hal su inneun guchejeogin iri isseulkkayo', '구체적으로 도울 일을 묻는 말', 'Aniq qanday yordam bera olishini so‘rash', 'Is there something specific I can do?', 'Есть ли что-то конкретное, что я могу сделать?'],
            ['ask-follow-up-time', '언제 다시 연락하면 좋을까요?', 'eonje dasi yeollakhamyeon joeulkkayo', '다시 연락할 적절한 때를 묻는 말', 'Qachon yana bog‘lanish ma’qul ekanini so‘rash', 'When would be a good time to contact you again?', 'Когда лучше снова с вами связаться?'],
            ['no-answer-required', '원하지 않으면 답하지 않아도 돼요.', 'wonhaji aneumyeon daphaji anado dwaeyo', '원하지 않으면 답할 필요가 없다고 알려 주는 표현', 'Istamasa javob berish shart emasligini aytish', 'You do not have to answer if you do not want to.', 'Если не хотите, можете не отвечать.'],
            ['respect-preferred-support', '원하는 방식을 존중할게요.', 'wonhaneun bangsigeul jonjunghalgeyo', '상대가 원하는 지원 방식을 존중하겠다는 표현', 'Tanlangan yordam usulini hurmat qilishni aytish', 'I will respect the kind of support you prefer.', 'Я буду уважать выбранный вами способ поддержки.'],
          ], SUPPORT_CONTEXT, SUPPORTER, SUPPORT_USAGE),
        ],
      },
    ],
  });
}

export const GIVING_COMPLIMENTS_CONGRATULATIONS_AND_COMFORT_TOPIC =
  buildGivingComplimentsCongratulationsAndComfortTopic();
