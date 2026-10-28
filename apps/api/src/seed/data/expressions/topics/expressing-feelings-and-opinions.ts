import { ExpressionProficiency } from '../../../../expressions/schemas/expression-node.schema';
import { ExpressionSpeechLevel } from '../../../../expressions/schemas/expression.schema';
import {
  defineExpressionTopic,
  expressionDrafts,
  localized,
  type ExpressionDraftRow,
} from '../expression-topic.helpers';

const FEELING_SHARER = localized(
  '자신의 감정이나 의견을 나누는 사람',
  'O‘z hissi yoki fikrini aytayotgan kishi',
  'The person sharing a feeling or opinion',
  'Человек, который делится чувством или мнением',
);

const CONVERSATION_PARTNER = localized(
  '감정이나 의견을 듣고 묻는 대화 상대',
  'Hissiyot yoki fikrni tinglayotgan suhbatdosh',
  'The conversation partner listening and asking',
  'Собеседник, который слушает и задаёт вопросы',
);

const BASIC_FEELING_CONTEXT = localized(
  '일상 대화에서 현재 감정과 몸·마음의 상태를 간단히 말하거나 물을 때 사용해요.',
  'Kundalik suhbatda hozirgi his va holatni sodda aytish yoki so‘rashda ishlatiladi.',
  'Use this in everyday conversation to state or ask about a current feeling or condition.',
  'Используйте в повседневной беседе, чтобы назвать или спросить о текущем чувстве и состоянии.',
);
const BASIC_FEELING_USAGE = localized(
  '상대의 감정을 미리 단정하지 말고, 짧거나 모호한 대답도 그대로 받아들여요.',
  'Suhbatdoshning hissini oldindan belgilamang va qisqa yoki noaniq javobni ham qabul qiling.',
  'Do not assume another person’s feelings; accept brief or uncertain answers as they are.',
  'Не приписывайте человеку чувства заранее и принимайте даже краткий или неопределённый ответ.',
);

const FEELING_REASON_CONTEXT = localized(
  '감정이 생긴 이유와 강도, 시간이 지나며 달라진 점을 설명하고 확인할 때 사용해요.',
  'Hissiyot sababi, kuchi va vaqt o‘tishi bilan o‘zgarishini tushuntirish yoki aniqlashda ishlatiladi.',
  'Use this to explain or check a feeling’s reason, intensity, and change over time.',
  'Используйте, чтобы объяснить или уточнить причину, силу и изменение чувства со временем.',
);
const FEELING_REASON_USAGE = localized(
  '이유를 모를 수도 있으므로 추측하거나 진단하지 말고, 상대가 말하고 싶은 범위만 물어요.',
  'Sabab noma’lum bo‘lishi mumkin; taxmin yoki tashxis qilmang, faqat kishi aytmoqchi bo‘lgan doirada so‘rang.',
  'A reason may be unclear, so do not guess or diagnose; ask only within what the person wants to share.',
  'Причина может быть неясна: не делайте предположений и не ставьте диагнозов, спрашивайте только в комфортных границах.',
);

const PREFERENCE_CONTEXT = localized(
  '선택이나 경험에 대한 기본 선호와 개인 의견을 묻고 답할 때 사용해요.',
  'Tanlov yoki tajriba haqidagi oddiy afzallik va shaxsiy fikrni so‘rash yoki aytishda ishlatiladi.',
  'Use this to ask for or state a basic preference or personal opinion about a choice or experience.',
  'Используйте, чтобы спросить или высказать предпочтение либо личное мнение о выборе или опыте.',
);
const PREFERENCE_USAGE = localized(
  '개인 취향을 옳고 그름으로 평가하지 말고, 다른 선택을 존중하며 의견으로 표현해요.',
  'Shaxsiy didni to‘g‘ri yoki noto‘g‘ri deb baholamang; boshqa tanlovni hurmat qilib, fikr sifatida ayting.',
  'Do not treat personal taste as right or wrong; frame it as an opinion and respect other choices.',
  'Не оценивайте личный вкус как правильный или неправильный; выражайте его как мнение и уважайте иной выбор.',
);

const AGREEMENT_CONTEXT = localized(
  '대화나 회의에서 동의·부분 동의·정중한 반대와 그 이유를 주고받을 때 사용해요.',
  'Suhbat yoki yig‘ilishda rozilik, qisman rozilik yoki muloyim norozilik va sabablarni aytishda ishlatiladi.',
  'Use this to exchange agreement, partial agreement, respectful disagreement, and reasons.',
  'Используйте для согласия, частичного согласия, вежливого несогласия и объяснения причин.',
);
const AGREEMENT_USAGE = localized(
  '사람이 아니라 의견과 이유를 다루고, 반대할 때도 상대의 말을 왜곡하지 않아요.',
  'Odamni emas, fikr va sababni muhokama qiling; qarshi bo‘lganda ham suhbatdosh fikrini buzib ko‘rsatmang.',
  'Address the idea and reasons, not the person, and do not distort the other view when disagreeing.',
  'Обсуждайте идею и доводы, а не человека, и не искажайте чужую позицию при несогласии.',
);

const BOUNDARY_CONTEXT = localized(
  '확신이 없거나 생각할 시간이 필요하거나 어떤 이야기를 하지 않겠다는 경계를 표현할 때 사용해요.',
  'Ishonch bo‘lmaganda, o‘ylash uchun vaqt kerak bo‘lganda yoki mavzuni muhokama qilmaslik chegarasini aytishda ishlatiladi.',
  'Use this to express uncertainty, a need for time, or a boundary against discussing something.',
  'Используйте, чтобы выразить неуверенность, попросить время или обозначить нежелание обсуждать тему.',
);
const BOUNDARY_USAGE = localized(
  '답변이나 감정 공개를 강요하지 말고, 말하지 않겠다는 경계를 들으면 질문을 멈추거나 주제를 바꿔요.',
  'Javob yoki hissiyotni oshkor qilishga majburlamang; chegara aytilsa, savolni to‘xtating yoki mavzuni almashtiring.',
  'Do not pressure anyone to answer or disclose feelings; when a boundary is stated, stop asking or change the topic.',
  'Не принуждайте к ответу или раскрытию чувств; услышав границу, прекратите вопросы или смените тему.',
);

const PERSPECTIVE_CONTEXT = localized(
  '사실과 개인 의견을 구분하고 여러 관점을 비교하며 의견 변화와 합의점을 정리할 때 사용해요.',
  'Fakt va shaxsiy fikrni ajratish, qarashlarni solishtirish hamda fikr o‘zgarishi va kelishuvni jamlashda ishlatiladi.',
  'Use this to separate fact from opinion, compare perspectives, and summarize revisions and agreement.',
  'Используйте, чтобы отделять факты от мнений, сравнивать точки зрения и подводить итог изменениям и согласию.',
);
const PERSPECTIVE_USAGE = localized(
  '확인되지 않은 내용을 사실처럼 말하지 말고, 새 정보가 있으면 의견을 수정할 수 있음을 열어 둬요.',
  'Tekshirilmagan ma’lumotni fakt deb aytmang va yangi ma’lumot chiqsa fikrni o‘zgartirishga ochiq bo‘ling.',
  'Do not present unverified claims as facts, and stay open to revising an opinion when new information appears.',
  'Не выдавайте непроверенное за факт и оставляйте возможность изменить мнение при появлении новой информации.',
);

function rows(
  data: readonly ExpressionDraftRow[],
  context: ReturnType<typeof localized>,
  speaker: ReturnType<typeof localized>,
  usageNote: ReturnType<typeof localized>,
) {
  return expressionDrafts(data, { context, speaker, usageNote });
}

function buildExpressingFeelingsAndOpinionsTopic() {
  // prettier-ignore
  return defineExpressionTopic({
    code: 'expressing-feelings-and-opinions',
    title: localized(
      '감정과 의견 표현하기',
      'Hissiyot va fikrlarni ifodalash',
      'Expressing feelings and opinions',
      'Выражение чувств и мнений',
    ),
    description: localized(
      '현재 감정과 이유를 말하고, 선호·동의·반대를 주고받으며, 경계를 존중하고 사실과 의견을 구분해요.',
      'Hozirgi his va sababni ayting, afzallik, rozilik va norozilikni muhokama qiling, chegarani hurmat qilib faktni fikrdan ajrating.',
      'Describe current feelings and reasons, exchange preferences and agreement or disagreement, respect boundaries, and separate fact from opinion.',
      'Говорите о чувствах и причинах, обсуждайте предпочтения и согласие или несогласие, уважайте границы и отделяйте факты от мнений.',
    ),
    order: 19,
    placement: { section: 1, unit: 19 },
    difficulty: 3,
    nodes: [
      {
        code: 'name-current-feelings',
        title: localized(
          '기본 감정과 현재 상태 말하기',
          'Asosiy his va hozirgi holatni aytish',
          'Naming basic feelings and current state',
          'Описание основных чувств и текущего состояния',
        ),
        description: localized(
          '기쁨·슬픔·화·걱정·긴장·편안함·피곤함을 간단히 말하고 상대의 현재 기분을 물어요.',
          'Quvonch, qayg‘u, jahldorlik, xavotir, hayajon, xotirjamlik va charchoqni sodda ayting va suhbatdosh holatini so‘rang.',
          'State happiness, sadness, anger, worry, nervousness, calm, or tiredness simply and ask about the other person’s mood.',
          'Просто называйте радость, грусть, злость, тревогу, волнение, спокойствие или усталость и спрашивайте о настроении собеседника.',
        ),
        icon: 'happy-outline',
        proficiency: ExpressionProficiency.BEGINNER,
        expressions: [
          ...rows([
            ['feeling-good-now', '저는 지금 기분이 좋아요.', 'jeoneun jigeum gibuni joayo', '현재 기분이 좋다고 말하는 표현', 'Hozir kayfiyat yaxshi ekanini aytish', 'I feel good right now.', 'Сейчас у меня хорошее настроение.'],
            ['feeling-a-little-sad', '오늘은 조금 슬퍼요.', 'oneureun jogeum seulpeoyo', '오늘 조금 슬프다고 말하는 표현', 'Bugun biroz xafa ekanini aytish', 'I feel a little sad today.', 'Сегодня мне немного грустно.'],
            ['feeling-angry-about-event', '그 일 때문에 화가 나요.', 'geu il ttaemune hwaga nayo', '어떤 일 때문에 화가 난다고 말하는 표현', 'Bir voqea sabab jahli chiqqanini aytish', 'I am angry because of that.', 'Я злюсь из-за этого.'],
            ['worried-about-tomorrow', '내일 일이 걱정돼요.', 'naeil iri geokjeongdwaeyo', '내일 일을 걱정한다고 말하는 표현', 'Ertangi ish haqida xavotirni aytish', 'I am worried about tomorrow.', 'Я переживаю из-за завтрашнего дня.'],
            ['nervous-because-first-time', '처음이라 긴장돼요.', 'cheoeumira ginjangdwaeyo', '처음이라 긴장된다고 말하는 표현', 'Birinchi marta bo‘lgani uchun hayajonni aytish', 'I am nervous because it is my first time.', 'Я волнуюсь, потому что это впервые.'],
            ['feeling-calm-now', '지금은 마음이 편안해요.', 'jigeumeun maeumi pyeonanhaeyo', '지금 마음이 편안하다고 말하는 표현', 'Hozir ko‘ngli xotirjam ekanini aytish', 'I feel calm now.', 'Сейчас мне спокойно.'],
            ['feeling-very-tired', '오늘은 많이 피곤해요.', 'oneureun mani pigonhaeyo', '오늘 많이 피곤하다고 말하는 표현', 'Bugun juda charchaganini aytish', 'I am very tired today.', 'Сегодня я очень устал(а).'],
            ['feeling-good-casual', '오늘 기분이 좋아.', 'oneul gibuni joa', '친한 사람에게 오늘 기분이 좋다고 말하는 표현', 'Yaqin kishiga bugun kayfiyati yaxshi ekanini aytish', 'I feel good today.', 'Сегодня у меня хорошее настроение.', ExpressionSpeechLevel.CASUAL],
          ], BASIC_FEELING_CONTEXT, FEELING_SHARER, BASIC_FEELING_USAGE),
          ...rows([
            ['ask-current-mood', '지금 기분이 어때요?', 'jigeum gibuni eottaeyo', '상대의 현재 기분을 묻는 말', 'Suhbatdoshning hozirgi kayfiyatini so‘rash', 'How do you feel right now?', 'Как вы сейчас себя чувствуете?'],
            ['ask-current-feeling', '지금 어떤 느낌이 들어요?', 'jigeum eotteon neukkimi deureoyo', '지금 드는 느낌을 묻는 말', 'Hozir qanday tuyg‘u borligini so‘rash', 'What are you feeling right now?', 'Что вы сейчас чувствуете?'],
            ['ask-happy-or-nervous', '기쁜가요, 긴장되나요?', 'gippeungayo ginjangdoenayo', '기쁨과 긴장 중 가까운 감정을 묻는 말', 'Quvonch yoki hayajonga yaqin hisni so‘rash', 'Are you happy or nervous?', 'Вы рады или волнуетесь?'],
            ['ask-todays-condition', '오늘 상태는 어때요?', 'oneul sangtaeneun eottaeyo', '오늘 전반적인 상태를 묻는 말', 'Bugungi umumiy holatni so‘rash', 'How are you feeling today?', 'Как вы себя сегодня чувствуете?'],
            ['ask-one-word-feeling', '지금 감정을 한마디로 표현하면 어떤 말일까요?', 'jigeum gamjeongeul hanmadiro pyohyeonhamyeon eotteon marilkkayo', '현재 감정을 한마디로 표현해 달라고 묻는 말', 'Hozirgi hissiyotni bir so‘z bilan ifodalashni so‘rash', 'How would you describe your current feeling in one word?', 'Каким словом вы бы описали своё текущее чувство?'],
            ['ask-if-mood-same', '기분이 아까와 같은가요?', 'gibuni akkawa gateungayo', '기분이 이전과 같은지 묻는 말', 'Kayfiyat avvalgidek ekanini so‘rash', 'Do you feel the same as before?', 'Ваше настроение такое же, как раньше?'],
            ['allow-simple-state-answer', '좋은지 힘든지 정도만 말해도 돼요.', 'joeunji himdeunji jeongdoman malhaedo dwaeyo', '간단한 상태만 말해도 된다고 알려 주는 표현', 'Faqat yaxshi yoki qiyinligini aytish kifoya ekanini bildirish', 'You can simply say whether you feel good or are having a hard time.', 'Можно просто сказать, хорошо вам или тяжело.'],
          ], BASIC_FEELING_CONTEXT, CONVERSATION_PARTNER, BASIC_FEELING_USAGE),
        ],
      },
      {
        code: 'explain-feeling-reasons-and-changes',
        title: localized(
          '감정의 이유·강도·변화 설명하기',
          'Hissiyot sababi, kuchi va o‘zgarishini tushuntirish',
          'Explaining reasons, intensity, and changes in feelings',
          'Объяснение причин, силы и изменения чувств',
        ),
        description: localized(
          '감정이 생긴 계기와 정도, 이전보다 나아지거나 강해진 변화를 말하고 조심스럽게 확인해요.',
          'Hissiyot sababi va darajasini, avvalgidan yengillashgani yoki kuchayganini ayting va ehtiyotkorlik bilan aniqlang.',
          'Describe what prompted a feeling, how strong it is, and how it has eased or intensified, then check gently.',
          'Описывайте причину и силу чувства, его ослабление или усиление и осторожно уточняйте изменения.',
        ),
        icon: 'pulse-outline',
        proficiency: ExpressionProficiency.BEGINNER,
        expressions: [
          ...rows([
            ['mood-improved-after-news', '그 소식을 듣고 기분이 좋아졌어요.', 'geu sosigeul deutgo gibuni joajyeosseoyo', '소식을 들은 뒤 기분이 좋아졌다고 말하는 표현', 'Xabarni eshitib kayfiyati yaxshilanganini aytish', 'My mood improved after hearing the news.', 'После этой новости моё настроение улучшилось.'],
            ['more-nervous-than-expected', '생각보다 많이 긴장돼요.', 'saenggakboda mani ginjangdwaeyo', '예상보다 긴장이 크다고 말하는 표현', 'Kutilganidan ko‘proq hayajon borligini aytish', 'I am much more nervous than I expected.', 'Я волнуюсь сильнее, чем ожидал(а).'],
            ['calmer-than-before', '아까보다 마음이 편해졌어요.', 'akkaboda maeumi pyeonhaejyeosseoyo', '이전보다 마음이 편해졌다고 말하는 표현', 'Avvalgidan ko‘ngli tinchiganini aytish', 'I feel calmer than before.', 'Мне спокойнее, чем раньше.'],
            ['unsure-of-reason', '이유를 정확히 모르겠어요.', 'iyureul jeonghwakhi moreugesseoyo', '감정의 정확한 이유를 모르겠다고 말하는 표현', 'Hissiyotning aniq sababini bilmasligini aytish', 'I am not sure of the exact reason.', 'Я не знаю точной причины.'],
            ['frustrated-things-not-working', '일이 잘 안 풀려서 답답해요.', 'iri jal an pullyeoseo dapdaphaeyo', '일이 풀리지 않아 답답하다고 말하는 표현', 'Ish yurishmagani uchun siqilganini aytish', 'I feel frustrated because things are not working out.', 'Мне тяжело, потому что дела не складываются.'],
            ['sensitive-from-lack-of-sleep', '잠을 못 자서 예민해졌어요.', 'jameul mot jaseo yeminhaejyeosseoyo', '잠을 못 자서 예민해졌다고 말하는 표현', 'Uxlamagani sabab ta’sirchan bo‘lib qolganini aytish', 'I have become more sensitive because I did not sleep.', 'Я стал(а) более раздражительным(-ой), потому что не выспался(-ась).'],
            ['anger-subsided-over-time', '시간이 지나면서 화가 가라앉았어요.', 'sigani jinamyeonseo hwaga garaanjasseoyo', '시간이 지나 화가 줄었다고 말하는 표현', 'Vaqt o‘tib jahli bosilganini aytish', 'My anger subsided over time.', 'Со временем мой гнев утих.'],
          ], FEELING_REASON_CONTEXT, FEELING_SHARER, FEELING_REASON_USAGE),
          ...rows([
            ['ask-what-caused-feeling', '어떤 점 때문에 그렇게 느꼈어요?', 'eotteon jeom ttaemune geureoke neukkyeosseoyo', '어떤 점이 감정의 계기였는지 묻는 말', 'Qaysi jihat bu hissiyotga sabab bo‘lganini so‘rash', 'What made you feel that way?', 'Из-за чего вы так себя почувствовали?'],
            ['ask-level-of-worry', '얼마나 걱정되는지 말해 줄 수 있나요?', 'eolmana geokjeongdoeneunji malhae jul su innayo', '걱정의 정도를 말해 줄 수 있는지 묻는 말', 'Xavotir darajasini ayta olishini so‘rash', 'Could you tell me how worried you are?', 'Можете сказать, насколько вы обеспокоены?'],
            ['ask-if-feeling-improved', '아까보다 기분이 나아졌나요?', 'akkaboda gibuni naajyeonnayo', '기분이 이전보다 나아졌는지 묻는 말', 'Kayfiyat avvalgidan yaxshilanganini so‘rash', 'Do you feel better than before?', 'Вам лучше, чем раньше?'],
            ['ask-if-feeling-stronger', '지금 감정이 더 강해졌나요?', 'jigeum gamjeongi deo ganghaejyeonnayo', '감정이 더 강해졌는지 묻는 말', 'Hissiyot kuchayganini so‘rash', 'Has the feeling become stronger?', 'Это чувство стало сильнее?'],
            ['ask-about-mixed-feelings', '여러 감정이 같이 드나요?', 'yeoreo gamjeongi gachi deunayo', '여러 감정이 함께 드는지 묻는 말', 'Bir nechta hissiyot birga kelayotganini so‘rash', 'Are you feeling several emotions at once?', 'Вы испытываете несколько чувств одновременно?'],
            ['reason-not-required', '그 이유를 꼭 말하지 않아도 돼요.', 'geu iyureul kkok malhaji anado dwaeyo', '이유를 반드시 말할 필요는 없다고 알려 주는 표현', 'Sababni aytish shart emasligini bildirish', 'You do not have to tell me the reason.', 'Вы не обязаны говорить причину.'],
            ['check-understanding-feeling', '제가 이해한 게 맞는지 확인해도 될까요?', 'jega ihaehan ge manneunji hwaginhaedo doelkkayo', '감정을 제대로 이해했는지 확인을 구하는 말', 'Hissiyotni to‘g‘ri tushunganini tekshirishga ruxsat so‘rash', 'May I check whether I understood correctly?', 'Можно уточнить, правильно ли я понял(а)?'],
            ['share-reason-if-wanted-casual', '말하고 싶으면 이유를 알려 줘.', 'malhago sipeumyeon iyureul allyeo jwo', '친한 사람에게 원할 때만 이유를 알려 달라고 하는 말', 'Yaqin kishidan istasa sababni aytishini so‘rash', 'Tell me the reason if you want to.', 'Если хочешь, расскажи причину.', ExpressionSpeechLevel.CASUAL],
          ], FEELING_REASON_CONTEXT, CONVERSATION_PARTNER, FEELING_REASON_USAGE),
        ],
      },
      {
        code: 'share-preferences-and-basic-opinions',
        title: localized(
          '선호와 기본 의견 주고받기',
          'Afzallik va oddiy fikrni almashish',
          'Sharing preferences and basic opinions',
          'Обмен предпочтениями и простыми мнениями',
        ),
        description: localized(
          '두 선택을 비교하고 무엇을 더 좋아하는지, 어떤 방법이나 경험을 어떻게 생각하는지 말하고 물어요.',
          'Ikki tanlovni solishtirib, nimani ko‘proq yoqtirish va usul yoki tajriba haqida nima deb o‘ylashni ayting va so‘rang.',
          'Compare choices and ask or state what someone prefers and thinks about a method or experience.',
          'Сравнивайте варианты и спрашивайте или говорите, что нравится больше и что вы думаете о способе или опыте.',
        ),
        icon: 'thumbs-up-outline',
        proficiency: ExpressionProficiency.INTERMEDIATE,
        expressions: [
          ...rows([
            ['prefer-quiet-place', '저는 조용한 곳이 더 좋아요.', 'jeoneun joyonghan gosi deo joayo', '조용한 곳을 더 좋아한다고 말하는 표현', 'Tinch joyni ko‘proq yoqtirishini aytish', 'I prefer a quiet place.', 'Я предпочитаю тихое место.'],
            ['find-this-method-easier', '저는 이 방법이 더 편해요.', 'jeoneun i bangbeobi deo pyeonhaeyo', '이 방법이 더 편하다고 말하는 표현', 'Bu usul qulayroq ekanini aytish', 'This method is more convenient for me.', 'Мне этот способ удобнее.'],
            ['prefer-first-option', '제 생각에는 첫 번째 안이 좋아요.', 'je saenggageneun cheot beonjjae ani joayo', '첫 번째 안을 선호한다고 말하는 표현', 'Birinchi variantni afzal ko‘rishini aytish', 'I think the first option is better.', 'На мой взгляд, первый вариант лучше.'],
            ['movie-was-interesting', '저는 그 영화가 재미있었어요.', 'jeoneun geu yeonghwaga jaemiisseosseoyo', '영화에 대한 긍정적인 의견을 말하는 표현', 'Film qiziqarli bo‘lganini aytish', 'I thought that movie was interesting.', 'Мне этот фильм показался интересным.'],
            ['dislike-spicy-food', '저는 매운 음식은 별로 안 좋아해요.', 'jeoneun maeun eumsigeun byeollo an joahaeyo', '매운 음식을 선호하지 않는다고 말하는 표현', 'Achchiq taomni uncha yoqtirmasligini aytish', 'I do not really like spicy food.', 'Я не очень люблю острую еду.'],
            ['prefer-morning-personally', '개인적으로 아침에 하는 게 좋아요.', 'gaeinjeogeuro achime haneun ge joayo', '개인적으로 아침을 선호한다고 말하는 표현', 'Shaxsan ertalab qilishni afzal ko‘rishini aytish', 'Personally, I prefer doing it in the morning.', 'Лично я предпочитаю делать это утром.'],
            ['both-fine-second-better', '저는 둘 다 괜찮지만 두 번째가 더 좋아요.', 'jeoneun dul da gwaenchanjiman du beonjjaega deo joayo', '둘 다 가능하지만 두 번째를 더 선호한다고 말하는 표현', 'Ikkalasi ham ma’qul, ammo ikkinchisini ko‘proq yoqtirishini aytish', 'Both are fine, but I prefer the second one.', 'Мне подходят оба варианта, но второй нравится больше.'],
            ['prefer-this-color-casual', '난 이 색이 더 좋아.', 'nan i saegi deo joa', '친한 사람에게 이 색을 더 좋아한다고 말하는 표현', 'Yaqin kishiga shu rangni ko‘proq yoqtirishini aytish', 'I like this color better.', 'Мне этот цвет нравится больше.', ExpressionSpeechLevel.CASUAL],
          ], PREFERENCE_CONTEXT, FEELING_SHARER, PREFERENCE_USAGE),
          ...rows([
            ['ask-which-preferred', '어느 쪽이 더 좋아요?', 'eoneu jjogi deo joayo', '두 선택 중 선호하는 쪽을 묻는 말', 'Ikki tanlovdan qaysi biri ma’qul ekanini so‘rash', 'Which one do you prefer?', 'Какой вариант вам нравится больше?'],
            ['ask-opinion-on-method', '이 방법에 대해 어떻게 생각해요?', 'i bangbeobe daehae eotteoke saenggakhaeyo', '방법에 대한 의견을 묻는 말', 'Usul haqidagi fikrni so‘rash', 'What do you think about this method?', 'Что вы думаете об этом способе?'],
            ['ask-most-important-point', '가장 중요하게 보는 점이 뭐예요?', 'gajang jungyohage boneun jeomi mwoyeyo', '선택에서 가장 중요하게 보는 점을 묻는 말', 'Tanlovdagi eng muhim jihatni so‘rash', 'What matters most to you?', 'Что для вас важнее всего?'],
            ['ask-reason-for-preference', '좋아하는 이유가 있나요?', 'joahaneun iyuga innayo', '선호하는 이유가 있는지 묻는 말', 'Afzallik sababini so‘rash', 'Is there a reason you prefer it?', 'Есть причина, почему вам это нравится?'],
            ['ask-if-other-choice-works', '다른 선택지도 괜찮나요?', 'dareun seontaekjido gwaenchanayo', '다른 선택지도 가능한지 묻는 말', 'Boshqa variant ham ma’qul ekanini so‘rash', 'Would another option also work for you?', 'Вам подойдёт и другой вариант?'],
            ['ask-liked-proposal', '제안 중에 마음에 드는 게 있나요?', 'jean junge maeume deuneun ge innayo', '제안 중 마음에 드는 것이 있는지 묻는 말', 'Takliflar orasida yoqqani borligini so‘rash', 'Is there a proposal you like?', 'Есть ли среди предложений то, что вам нравится?'],
            ['invite-opinion-comfortably', '편하게 의견을 말해 주세요.', 'pyeonhage uigyeoneul malhae juseyo', '부담 없이 의견을 말해 달라고 하는 표현', 'Fikrni bemalol aytishni so‘rash', 'Please feel free to share your opinion.', 'Пожалуйста, свободно выскажите своё мнение.'],
          ], PREFERENCE_CONTEXT, CONVERSATION_PARTNER, PREFERENCE_USAGE),
        ],
      },
      {
        code: 'agree-and-disagree-respectfully',
        title: localized(
          '동의하고 정중하게 반대하기',
          'Rozilik bildirish va muloyim qarshi chiqish',
          'Agreeing and disagreeing respectfully',
          'Согласие и уважительное несогласие',
        ),
        description: localized(
          '완전한 동의와 부분 동의를 구분하고, 생각이 다를 때 이유와 다른 가능성을 정중하게 말해요.',
          'To‘liq va qisman rozilikni ajrating, fikr boshqacha bo‘lsa sabab va boshqa imkoniyatni muloyim ayting.',
          'Distinguish full from partial agreement and state reasons and alternatives respectfully when views differ.',
          'Различайте полное и частичное согласие и уважительно называйте причины и альтернативы при расхождении мнений.',
        ),
        icon: 'swap-horizontal-outline',
        proficiency: ExpressionProficiency.INTERMEDIATE,
        expressions: [
          ...rows([
            ['same-opinion', '저도 같은 생각이에요.', 'jeodo gateun saenggagieyo', '상대와 생각이 같다고 말하는 표현', 'Suhbatdosh bilan bir fikrda ekanini aytish', 'I think the same way.', 'Я думаю так же.'],
            ['agree-on-that-point', '그 점에는 동의해요.', 'geu jeomeneun donguihaeyo', '특정한 점에 동의한다고 말하는 표현', 'Muayyan jihatga rozi ekanini aytish', 'I agree on that point.', 'С этим пунктом я согласен(-на).'],
            ['mostly-agree-one-difference', '전체적으로 동의하지만 한 부분은 달리 생각해요.', 'jeonchejeogeuro donguihajiman han bubuneun dalli saenggakhaeyo', '대체로 동의하지만 한 부분은 다르다고 말하는 표현', 'Umuman rozi, ammo bir jihat boshqacha ekanini aytish', 'I agree overall, but I see one part differently.', 'В целом я согласен(-на), но один момент вижу иначе.'],
            ['opinion-slightly-different', '제 생각은 조금 달라요.', 'je saenggageun jogeum dallayo', '자신의 생각이 조금 다르다고 말하는 표현', 'Fikri biroz boshqacha ekanini aytish', 'My opinion is a little different.', 'Моё мнение немного отличается.'],
            ['method-not-essential', '저는 그 방법이 꼭 필요하다고 생각하지 않아요.', 'jeoneun geu bangbeobi kkok piryohadago saenggakhaji anayo', '그 방법이 반드시 필요하지는 않다고 말하는 표현', 'Bu usul mutlaqo zarur emas deb o‘ylashini aytish', 'I do not think that method is essential.', 'Я не думаю, что этот способ обязательно нужен.'],
            ['agree-result-different-reason', '결론에는 동의하지만 이유는 다르게 봐요.', 'gyeolloneneun donguihajiman iyuneun dareuge bwayo', '결론에는 동의하지만 이유를 다르게 본다고 말하는 표현', 'Xulosaga rozi, ammo sababni boshqacha ko‘rishini aytish', 'I agree with the conclusion, but I see the reason differently.', 'Я согласен(-на) с выводом, но иначе вижу причину.'],
            ['acknowledge-other-possibility', '그렇게 볼 수도 있지만 다른 가능성도 있어요.', 'geureoke bol sudo itjiman dareun ganeungseongdo isseoyo', '상대 관점을 인정하며 다른 가능성을 제시하는 표현', 'Suhbatdosh qarashini tan olib, boshqa imkoniyatni aytish', 'That is one way to see it, but there is another possibility.', 'Так можно посмотреть, но есть и другая возможность.'],
          ], AGREEMENT_CONTEXT, FEELING_SHARER, AGREEMENT_USAGE),
          ...rows([
            ['ask-agreed-parts', '어떤 부분에 동의해요?', 'eotteon bubune donguihaeyo', '동의하는 부분을 묻는 말', 'Qaysi qismga rozi ekanini so‘rash', 'Which part do you agree with?', 'С какой частью вы согласны?'],
            ['ask-different-parts', '어느 부분이 다르게 느껴져요?', 'eoneu bubuni dareuge neukkyeojyeoyo', '다르게 느끼는 부분을 묻는 말', 'Qaysi qism boshqacha tuyulishini so‘rash', 'Which part feels different to you?', 'Какая часть кажется вам иной?'],
            ['ask-reason-for-disagreement', '반대하는 이유를 설명해 줄 수 있나요?', 'bandaehaneun iyureul seolmyeonghae jul su innayo', '반대하는 이유를 설명해 줄 수 있는지 묻는 말', 'Norozilik sababini tushuntira olishini so‘rash', 'Could you explain why you disagree?', 'Можете объяснить, почему вы не согласны?'],
            ['different-view-is-acceptable', '제 의견과 달라도 괜찮아요.', 'je uigyeongwa dallado gwaenchanayo', '의견이 달라도 괜찮다고 알려 주는 표현', 'Fikr boshqacha bo‘lishi mumkinligini aytish', 'It is okay if your opinion differs from mine.', 'Ничего страшного, если ваше мнение отличается от моего.'],
            ['find-common-ground-first', '서로 동의하는 점부터 찾아볼까요?', 'seoro donguihaneun jeombuteo chajabolkkayo', '먼저 서로 동의하는 점을 찾자고 제안하는 말', 'Avval ikki tomon rozi bo‘lgan jihatni topishni taklif qilish', 'Shall we first find what we agree on?', 'Давайте сначала найдём то, с чем мы оба согласны?'],
            ['understand-but-differ', '그 의견도 이해하지만 저는 다르게 생각해요.', 'geu uigyeondo ihaehajiman jeoneun dareuge saenggakhaeyo', '상대 의견을 이해하지만 생각은 다르다고 말하는 표현', 'Fikrni tushunsa ham boshqacha o‘ylashini aytish', 'I understand that view, but I think differently.', 'Я понимаю эту точку зрения, но думаю иначе.'],
            ['compare-reasons-first', '의견보다 근거를 먼저 비교해 볼까요?', 'uigyeonboda geungeoreul meonjeo bigyohae bolkkayo', '의견의 근거를 먼저 비교하자고 제안하는 말', 'Avval fikrlar asosini solishtirishni taklif qilish', 'Shall we compare the reasons behind the opinions first?', 'Сначала сравним основания наших мнений?'],
            ['disagree-on-part-casual', '난 그 부분은 다르게 생각해.', 'nan geu bubuneun dareuge saenggakhae', '친한 사람에게 한 부분을 다르게 생각한다고 말하는 표현', 'Yaqin kishiga bir jihat bo‘yicha boshqacha o‘ylashini aytish', 'I see that part differently.', 'Я думаю об этой части иначе.', ExpressionSpeechLevel.CASUAL],
          ], AGREEMENT_CONTEXT, CONVERSATION_PARTNER, AGREEMENT_USAGE),
        ],
      },
      {
        code: 'express-uncertainty-and-boundaries',
        title: localized(
          '확신 없음과 대화 경계 표현하기',
          'Noaniqlik va suhbat chegarasini ifodalash',
          'Expressing uncertainty and conversational boundaries',
          'Выражение неуверенности и границ разговора',
        ),
        description: localized(
          '아직 확신이 없거나 생각할 시간이 필요하다고 말하고, 답하거나 공개하고 싶지 않은 내용을 분명히 경계 지어요.',
          'Hali ishonch yo‘qligini yoki o‘ylash uchun vaqt kerakligini ayting va javob berish yoki oshkor qilish istalmagan mavzuga aniq chegara qo‘ying.',
          'State uncertainty or a need for time and set clear boundaries around what you do not want to answer or disclose.',
          'Говорите о неуверенности или необходимости подумать и ясно обозначайте, на что не хотите отвечать или что раскрывать.',
        ),
        icon: 'hand-left-outline',
        proficiency: ExpressionProficiency.ADVANCED,
        expressions: [
          ...rows([
            ['not-sure-yet', '아직 확신이 없어요.', 'ajik hwaksini eopseoyo', '아직 확신이 없다고 말하는 표현', 'Hali ishonchi yo‘qligini aytish', 'I am not sure yet.', 'Я пока не уверен(а).'],
            ['need-more-time-to-think', '조금 더 생각해 보고 싶어요.', 'jogeum deo saenggakhae bogo sipeoyo', '조금 더 생각할 시간이 필요하다고 말하는 표현', 'Yana biroz o‘ylashni istashini aytish', 'I would like more time to think.', 'Я хочу ещё немного подумать.'],
            ['hard-to-decide-now', '지금 바로 결정하기 어려워요.', 'jigeum baro gyeoljeonghagi eoryeowoyo', '지금 바로 결정하기 어렵다고 말하는 표현', 'Hozir darhol qaror qilish qiyinligini aytish', 'It is difficult to decide right now.', 'Сейчас трудно принять решение.'],
            ['thoughts-not-organized', '제 생각이 아직 정리되지 않았어요.', 'je saenggagi ajik jeongnidoeji anasseoyo', '생각이 아직 정리되지 않았다고 말하는 표현', 'Fikri hali tartibga tushmaganini aytish', 'I have not organized my thoughts yet.', 'Я ещё не собрал(а) свои мысли.'],
            ['do-not-want-topic-now', '이 이야기는 지금 하고 싶지 않아요.', 'i iyagineun jigeum hago sipji anayo', '지금은 이 이야기를 하고 싶지 않다고 말하는 표현', 'Bu mavzuni hozir gapirishni istamasligini aytish', 'I do not want to talk about this right now.', 'Я не хочу сейчас об этом говорить.'],
            ['will-not-answer-question', '그 질문에는 답하지 않을게요.', 'geu jilmuneneun daphaji aneulgeyo', '그 질문에는 답하지 않겠다고 말하는 표현', 'Bu savolga javob bermasligini aytish', 'I am not going to answer that question.', 'Я не буду отвечать на этот вопрос.'],
            ['do-not-want-detailed-reason', '자세한 이유는 말하고 싶지 않아요.', 'jasehan iyuneun malhago sipji anayo', '자세한 이유는 말하고 싶지 않다고 밝히는 표현', 'Batafsil sababni aytishni istamasligini bildirish', 'I do not want to give a detailed reason.', 'Я не хочу подробно объяснять причину.'],
            ['do-not-want-talk-casual', '지금은 말하고 싶지 않아.', 'jigeumeun malhago sipji ana', '친한 사람에게 지금은 말하고 싶지 않다고 하는 표현', 'Yaqin kishiga hozir gapirishni istamasligini aytish', 'I do not want to talk right now.', 'Я сейчас не хочу говорить.', ExpressionSpeechLevel.CASUAL],
          ], BOUNDARY_CONTEXT, FEELING_SHARER, BOUNDARY_USAGE),
          ...rows([
            ['take-time-to-think', '천천히 생각해도 돼요.', 'cheoncheonhi saenggakhaedo dwaeyo', '천천히 생각해도 된다고 알려 주는 표현', 'Shoshilmay o‘ylash mumkinligini aytish', 'You can take your time to think.', 'Можно не спеша подумать.'],
            ['no-need-answer-now', '지금 답하지 않아도 돼요.', 'jigeum daphaji anado dwaeyo', '지금 답하지 않아도 된다고 알려 주는 표현', 'Hozir javob berish shart emasligini aytish', 'You do not have to answer now.', 'Необязательно отвечать сейчас.'],
            ['skip-if-not-wanted', '말하고 싶지 않다면 넘어갈게요.', 'malhago sipji antamyeon neomeogalgeyo', '말하고 싶지 않다면 주제를 넘기겠다는 표현', 'Gapirish istagi bo‘lmasa mavzuni o‘tkazib yuborishni aytish', 'If you do not want to talk about it, we will move on.', 'Если вы не хотите говорить, мы перейдём к другой теме.'],
            ['ask-comfortable-detail-level', '어느 정도까지 이야기하면 편한가요?', 'eoneu jeongdokkaji iyagihamyeon pyeonhangayo', '어느 정도까지 말하는 것이 편한지 묻는 말', 'Qancha darajada gapirish qulayligini so‘rash', 'How much are you comfortable discussing?', 'До какой степени вам комфортно это обсуждать?'],
            ['offer-change-topic', '다른 주제로 바꿀까요?', 'dareun jujero bakkulkkayo', '다른 주제로 바꿀지 묻는 말', 'Boshqa mavzuga o‘tishni taklif qilish', 'Shall we change the subject?', 'Сменим тему?'],
            ['stop-if-asked-too-much', '제가 너무 많이 물었다면 멈출게요.', 'jega neomu mani mureotdamyeon meomchulgeyo', '질문이 지나쳤다면 멈추겠다는 표현', 'Juda ko‘p so‘ralgan bo‘lsa to‘xtashini aytish', 'If I asked too much, I will stop.', 'Если я спросил(а) слишком много, я остановлюсь.'],
            ['listen-when-ready', '준비되면 그때 의견을 들을게요.', 'junbidoemyeon geuttae uigyeoneul deureulgeyo', '상대가 준비되었을 때 의견을 듣겠다는 표현', 'Suhbatdosh tayyor bo‘lganda fikrini tinglashni aytish', 'I will listen to your opinion when you are ready.', 'Я выслушаю ваше мнение, когда вы будете готовы.'],
          ], BOUNDARY_CONTEXT, CONVERSATION_PARTNER, BOUNDARY_USAGE),
        ],
      },
      {
        code: 'separate-facts-and-compare-perspectives',
        title: localized(
          '사실과 의견을 나누고 관점 정리하기',
          'Fakt va fikrni ajratib, qarashlarni jamlash',
          'Separating facts and summarizing perspectives',
          'Разделение фактов и мнений и итог точек зрения',
        ),
        description: localized(
          '확인된 사실과 개인 해석을 구분하고, 근거와 우선순위를 비교해 의견 변화·합의·차이를 정확히 정리해요.',
          'Tekshirilgan fakt va shaxsiy talqinni ajrating, asos va ustuvorlikni solishtirib fikr o‘zgarishi, kelishuv va farqni aniq jamlang.',
          'Separate verified facts from personal interpretations, compare evidence and priorities, and summarize revisions, agreement, and differences.',
          'Отделяйте проверенные факты от личной интерпретации, сравнивайте основания и приоритеты и точно подводите итог изменениям, согласию и различиям.',
        ),
        icon: 'git-compare-outline',
        proficiency: ExpressionProficiency.ADVANCED,
        expressions: [
          ...rows([
            ['verified-fact-schedule-changed', '확인된 사실은 일정이 바뀌었다는 거예요.', 'hwagindoen sasireun iljeongi bakkwieotdaneun geoyeyo', '확인된 사실이 일정 변경이라고 말하는 표현', 'Tekshirilgan fakt jadval o‘zgargani ekanini aytish', 'The verified fact is that the schedule changed.', 'Подтверждённый факт состоит в том, что расписание изменилось.'],
            ['personal-interpretation-harder', '제 해석은 상황이 더 어려워졌다는 거예요.', 'je haeseogeun sanghwangi deo eoryeowojyeotdaneun geoyeyo', '상황이 어려워졌다는 것은 개인 해석이라고 밝히는 표현', 'Vaziyat qiyinlashgani shaxsiy talqin ekanini aytish', 'My interpretation is that the situation has become more difficult.', 'Моя интерпретация такова: ситуация стала сложнее.'],
            ['separate-known-fact-and-opinion', '제가 아는 사실과 제 의견을 나눠서 말할게요.', 'jega aneun sasilgwa je uigyeoneul nanwoseo malhalgeyo', '사실과 의견을 구분해서 말하겠다는 표현', 'Ma’lum fakt va shaxsiy fikrni alohida aytishini bildirish', 'I will separate what I know as fact from my opinion.', 'Я отдельно изложу известные мне факты и своё мнение.'],
            ['changed-mind-after-data', '다른 자료를 보고 생각이 바뀌었어요.', 'dareun jaryoreul bogo saenggagi bakkwieosseoyo', '새로운 자료를 보고 의견이 바뀌었다고 말하는 표현', 'Boshqa ma’lumotni ko‘rib fikri o‘zgarganini aytish', 'I changed my mind after reviewing other information.', 'Я изменил(а) мнение после изучения других материалов.'],
            ['cost-most-important-perspective', '제 관점에서는 비용이 가장 중요해요.', 'je gwanjeomeseoneun biyongi gajang jungyohaeyo', '자신의 관점에서 비용이 가장 중요하다고 말하는 표현', 'O‘z qarashida xarajat eng muhim ekanini aytish', 'From my perspective, cost is the most important factor.', 'С моей точки зрения, важнее всего стоимость.'],
            ['difference-is-priority', '두 의견의 차이는 우선순위에 있어요.', 'du uigyeonui chaineun useonsunwie isseoyo', '두 의견의 차이가 우선순위라고 정리하는 표현', 'Ikki fikr farqi ustuvorlikda ekanini jamlash', 'The difference between the two opinions is their priority.', 'Различие между двумя мнениями заключается в приоритетах.'],
            ['common-ground-change-method', '공통점은 방법을 바꿔야 한다는 거예요.', 'gongtongjeomeun bangbeobeul bakkwoya handaneun geoyeyo', '방법 변경이 공통된 의견이라고 정리하는 표현', 'Usulni o‘zgartirish umumiy fikr ekanini jamlash', 'Our common ground is that the method needs to change.', 'Мы согласны в том, что способ нужно изменить.'],
          ], PERSPECTIVE_CONTEXT, FEELING_SHARER, PERSPECTIVE_USAGE),
          ...rows([
            ['ask-fact-or-opinion', '그건 확인된 사실인가요, 개인 의견인가요?', 'geugeon hwagindoen sasiringayo gaein uigyeoningayo', '내용이 사실인지 의견인지 묻는 말', 'Mazmun fakt yoki shaxsiy fikr ekanini so‘rash', 'Is that a verified fact or a personal opinion?', 'Это подтверждённый факт или личное мнение?'],
            ['ask-basis-for-view', '어떤 근거로 그렇게 생각했어요?', 'eotteon geungeoro geureoke saenggakhaesseoyo', '생각의 근거를 묻는 말', 'Fikrning asosini so‘rash', 'What led you to that conclusion?', 'На чём основан такой вывод?'],
            ['ask-other-perspective', '다른 관점에서는 어떻게 보일까요?', 'dareun gwanjeomeseoneun eotteoke boilkkayo', '다른 관점에서 어떻게 보이는지 묻는 말', 'Boshqa nuqtayi nazardan qanday ko‘rinishini so‘rash', 'How might it look from another perspective?', 'Как это может выглядеть с другой точки зрения?'],
            ['ask-different-interpretation', '서로 다르게 해석한 부분이 무엇인가요?', 'seoro dareuge haeseokhan bubuni mueosingayo', '서로 다르게 해석한 부분을 묻는 말', 'Qaysi qism turlicha talqin qilinganini so‘rash', 'Which part did we interpret differently?', 'Какую часть мы истолковали по-разному?'],
            ['ask-revise-with-new-info', '새 정보를 반영하면 의견이 달라질 수 있을까요?', 'sae jeongboreul banyeonghamyeon uigyeoni dallajil su isseulkkayo', '새 정보에 따라 의견이 달라질 수 있는지 묻는 말', 'Yangi ma’lumot bilan fikr o‘zgarishi mumkinligini so‘rash', 'Could the opinion change in light of new information?', 'Может ли мнение измениться с учётом новой информации?'],
            ['summarize-agreement', '지금까지 합의한 내용을 정리해 볼까요?', 'jigeumkkaji habuihan naeyongeul jeongrihae bolkkayo', '지금까지 합의한 내용을 정리하자고 제안하는 말', 'Hozirgacha kelishilganlarni jamlashni taklif qilish', 'Shall we summarize what we have agreed on so far?', 'Подведём итог тому, о чём мы уже договорились?'],
            ['confirm-remaining-differences', '아직 의견이 다른 부분도 함께 확인할까요?', 'ajik uigyeoni dareun bubundo hamkke hwaginhalkkayo', '남은 의견 차이도 함께 확인할지 묻는 말', 'Qolgan fikr farqlarini ham tekshirishni so‘rash', 'Shall we also review where our opinions still differ?', 'Уточним также, в чём наши мнения всё ещё расходятся?'],
            ['check-understood-difference-casual', '내가 차이를 이렇게 이해한 게 맞아?', 'naega chaireul ireoke ihaehan ge maja', '친한 사람에게 이해한 의견 차이가 맞는지 묻는 말', 'Yaqin kishidan farqni to‘g‘ri tushunganini so‘rash', 'Did I understand the difference correctly?', 'Я правильно понял(а) разницу?', ExpressionSpeechLevel.CASUAL],
          ], PERSPECTIVE_CONTEXT, CONVERSATION_PARTNER, PERSPECTIVE_USAGE),
        ],
      },
    ],
  });
}

export const EXPRESSING_FEELINGS_AND_OPINIONS_TOPIC =
  buildExpressingFeelingsAndOpinionsTopic();
