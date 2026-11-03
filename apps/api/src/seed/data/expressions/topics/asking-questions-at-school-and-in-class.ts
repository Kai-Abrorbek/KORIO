import { ExpressionProficiency } from '../../../../expressions/schemas/expression-node.schema';
import { ExpressionSpeechLevel } from '../../../../expressions/schemas/expression.schema';
import {
  defineExpressionTopic,
  expressionDrafts,
  localized,
  type ExpressionDraftRow,
} from '../expression-topic.helpers';

const STUDENT = localized(
  '수업에 참여하거나 과제를 수행하는 학생',
  'Darsda qatnashayotgan yoki topshiriq bajarayotgan talaba',
  'A student participating in class or completing coursework',
  'Ученик или студент, участвующий в занятии или выполняющий задание',
);

const TEACHER_OR_CLASSMATE = localized(
  '교사·학교 담당자 또는 함께 공부하는 학생',
  'O‘qituvchi, maktab mas’uli yoki birga o‘qiydigan talaba',
  'A teacher, school staff member, or classmate',
  'Учитель, сотрудник учебного заведения или одногруппник',
);

const CLOSE_CLASSMATE = localized(
  '서로 반말을 쓰기로 한 친한 학생',
  'O‘zaro norasmiy gaplashadigan yaqin kursdosh',
  'A close classmate who mutually uses casual speech',
  'Близкий одногруппник, с которым взаимно принято говорить неформально',
);

const CLASSROOM_CONTEXT = localized(
  '학교에서 교실·좌석·교재를 확인하고 수업 중 질문·이동·촬영에 대한 기본 허락을 구할 때 사용해요.',
  'Maktabda xona, o‘rin va darslikni aniqlash, savol, chiqish yoki suratga olish uchun ruxsat so‘rashda ishlatiladi.',
  'Use this at school to confirm the classroom, seat, and textbook and to ask permission for questions, leaving, or photos.',
  'Используйте в учебном заведении, чтобы уточнить аудиторию, место и учебник и попросить разрешение на вопрос, выход или фото.',
);
const CLASSROOM_USAGE = localized(
  '교실과 촬영 규칙을 먼저 확인하고, 반말은 서로 동의한 친한 학생끼리만 쓰며 교사에게는 존댓말을 사용해요.',
  'Xona va suratga olish qoidasini tekshiring; norasmiy nutqni faqat kelishilgan yaqin talabalar ishlatsin, o‘qituvchi bilan hurmatli uslubda gapiring.',
  'Check classroom and photo rules first; use casual speech only with a close classmate who agrees and use polite speech with teachers.',
  'Сначала уточняйте правила аудитории и съёмки; неформально говорите только с близким одногруппником по взаимному согласию, с учителем — вежливо.',
);

const LESSON_QUESTION_CONTEXT = localized(
  '수업에서 배운 용어·발음·문법·예시와 설명 단계를 구체적으로 질문하고 이해한 내용을 확인할 때 사용해요.',
  'Darsdagi atama, talaffuz, grammatika, misol va tushuntirish bosqichini aniq so‘rab, tushunganini tekshirishda ishlatiladi.',
  'Use this to ask specific questions about terms, pronunciation, grammar, examples, and lesson steps and to check understanding.',
  'Используйте для конкретных вопросов о терминах, произношении, грамматике, примерах и этапах объяснения и для проверки понимания.',
);
const LESSON_QUESTION_USAGE = localized(
  '이해하지 못한 지점을 구체적으로 말하고 수업 자료의 용어와 예시를 기준으로 질문해요. 반말 설명은 친한 학생끼리만 사용해요.',
  'Tushunilmagan joyni aniq ayting va dars atamasi hamda misoliga tayangan holda so‘rang. Norasmiy tushuntirish faqat yaqin talabalar orasida ishlatiladi.',
  'Name the specific point you did not understand and refer to course terms and examples. Casual explanations are only for close classmates.',
  'Называйте конкретное непонятное место и опирайтесь на термины и примеры курса. Неформальные объяснения уместны только между близкими учащимися.',
);

const ASSIGNMENT_CONTEXT = localized(
  '과제 범위·개인 또는 조별 여부·제출 형식·마감·파일 이름·재제출과 완료 확인 방법을 물을 때 사용해요.',
  'Topshiriq doirasi, yakka yoki guruh shakli, topshirish formati, muddati, fayl nomi, qayta topshirish va yakun tasdig‘ini so‘rashda ishlatiladi.',
  'Use this to ask about assignment scope, individual or group work, format, deadline, file naming, resubmission, and completion confirmation.',
  'Используйте для вопросов об объёме задания, индивидуальной или групповой работе, формате, сроке, имени файла, повторной сдаче и подтверждении.',
);
const ASSIGNMENT_USAGE = localized(
  '마감과 재제출 가능 여부는 공식 공지·학습 시스템·교사 안내로 확인하고, 학번 같은 식별정보는 공식 제출 경로에만 사용해요.',
  'Muddat va qayta topshirishni rasmiy e’lon, o‘quv tizimi va o‘qituvchidan tekshiring; talaba raqami kabi ma’lumotni faqat rasmiy topshirish yo‘lida ishlating.',
  'Verify deadlines and resubmission through official notices, the learning system, and teacher guidance; use identifiers such as student numbers only in official submission channels.',
  'Проверяйте сроки и повторную сдачу по официальным объявлениям, системе и указаниям преподавателя; идентификаторы вроде номера студента используйте только в официальной сдаче.',
);

const GROUP_CONTEXT = localized(
  '발표 순서와 조별 역할을 확인하고 결석한 수업을 보충하며, 진행 내용과 자료를 다음 학생에게 인계할 때 사용해요.',
  'Taqdimot tartibi va guruh rolini aniqlash, qoldirilgan darsni to‘ldirish hamda ish va materialni keyingi talabaga topshirishda ishlatiladi.',
  'Use this to confirm presentation order and group roles, catch up after an absence, and hand progress and materials to another student.',
  'Используйте, чтобы уточнить порядок выступлений и роли, наверстать пропущенное и передать ход работы и материалы другому учащемуся.',
);
const GROUP_USAGE = localized(
  '공식 자료와 교사 안내로 결석 내용을 확인하고, 조별 인계에는 필요한 정보만 남기며 다른 학생의 개인정보나 답안을 공유하지 않아요.',
  'Qoldirilgan darsni rasmiy material va o‘qituvchi orqali tekshiring; guruh topshirig‘ida faqat zarur ma’lumotni bering, boshqalarning ma’lumoti yoki javobini ulashmang.',
  'Use official materials and teacher guidance to catch up; include only needed handoff details and do not share another student’s personal data or answers.',
  'Навёрстывайте по официальным материалам и указаниям учителя; передавайте только нужные сведения и не делитесь данными или ответами других учащихся.',
);

const ASSESSMENT_CONTEXT = localized(
  '과제나 시험의 피드백·점수·채점표·평가 기준과 기록 오류를 구체적으로 확인하고 재검토 절차를 물을 때 사용해요.',
  'Topshiriq yoki imtihon fikri, ball, mezon, baholash qoidasi va yozuv xatosini aniqlab, qayta ko‘rish tartibini so‘rashda ishlatiladi.',
  'Use this to ask specifically about feedback, scores, rubrics, evaluation criteria, record errors, and review procedures.',
  'Используйте для конкретных вопросов об обратной связи, баллах, рубрике, критериях, ошибках записи и процедуре пересмотра.',
);
const ASSESSMENT_USAGE = localized(
  '점수 변경을 요구하거나 보장하지 말고 적용된 기준과 공식 재검토 절차를 확인하며, 다른 학생의 점수나 답안을 요청하지 않아요.',
  'Ball o‘zgarishini talab yoki kafolat qilmang; qo‘llangan mezon va rasmiy ko‘rib chiqish tartibini tekshiring, boshqalarning balli yoki javobini so‘ramang.',
  'Do not demand or guarantee a score change; check the applied criteria and official review procedure, and do not request another student’s score or answers.',
  'Не требуйте и не гарантируйте изменение балла; уточняйте критерии и официальную процедуру и не запрашивайте чужие баллы или ответы.',
);

const SUPPORT_ETHICS_CONTEXT = localized(
  '교사 상담·학습 지원·접근성 요청과 출처·인용·학업 윤리, 학교 계정 보안을 공식 절차로 확인할 때 사용해요.',
  'O‘qituvchi maslahati, o‘quv yordami, qulaylik, manba, iqtibos, akademik halollik va maktab hisobi xavfsizligini rasmiy aniqlashda ishlatiladi.',
  'Use this to verify official procedures for teacher consultation, learning or accessibility support, sources, citation, academic integrity, and school-account security.',
  'Используйте для официального уточнения консультаций, учебной и доступной поддержки, источников, цитирования, академической честности и безопасности аккаунта.',
);
const SUPPORT_ETHICS_USAGE = localized(
  '지원 제공을 보장하지 말고 담당 부서 절차를 확인해요. 표절·답안 공유를 피하고 학교 공식 시스템만 쓰며 비밀번호·인증번호를 누구와도 공유하지 않아요.',
  'Yordamni kafolatlamang, mas’ul bo‘lim tartibini tekshiring. Plagiat va javob ulashishdan saqlaning, faqat rasmiy tizimdan foydalanib, parol yoki kodni hech kimga bermang.',
  'Do not guarantee support; verify the responsible office’s procedure. Avoid plagiarism and answer sharing, use only official systems, and never share passwords or verification codes.',
  'Не гарантируйте поддержку; уточняйте процедуру ответственного отдела. Избегайте плагиата и обмена ответами, используйте официальные системы и никому не сообщайте пароли или коды.',
);

function rows(
  data: readonly ExpressionDraftRow[],
  context: ReturnType<typeof localized>,
  speaker: ReturnType<typeof localized>,
  usageNote: ReturnType<typeof localized>,
) {
  return expressionDrafts(data, { context, speaker, usageNote });
}

function buildAskingQuestionsAtSchoolAndInClassTopic() {
  // prettier-ignore
  return defineExpressionTopic({
    code: 'asking-questions-at-school-and-in-class',
    title: localized(
      '학교와 수업에서 질문하기',
      'Maktab va darsda savol berish',
      'Asking questions at school and in class',
      'Вопросы в учебном заведении и на занятиях',
    ),
    description: localized(
      '교실과 수업 내용을 질문하고 과제·발표·평가 기준을 확인하며, 상담·지원·인용·학업 윤리와 계정 보안을 공식 절차로 다뤄요.',
      'Xona va dars mazmunini so‘rang, topshiriq, taqdimot va baholash mezonini aniqlang hamda maslahat, yordam, iqtibos, halollik va hisob xavfsizligini rasmiy tartibda hal qiling.',
      'Ask about the classroom and lesson content, verify assignments, presentations, and evaluation criteria, and use official procedures for consultation, support, citation, integrity, and account security.',
      'Задавайте вопросы об аудитории и материале, уточняйте задания, выступления и критерии и официально решайте вопросы консультаций, поддержки, цитирования, честности и безопасности аккаунта.',
    ),
    order: 22,
    placement: { section: 1, unit: 22 },
    difficulty: 3,
    nodes: [
      {
        code: 'ask-about-classroom-seats-and-permission',
        title: localized(
          '교실·좌석·교재와 기본 허락 질문하기',
          'Xona, o‘rin, darslik va asosiy ruxsatni so‘rash',
          'Asking about the classroom, seats, textbooks, and permission',
          'Вопросы об аудитории, местах, учебниках и разрешении',
        ),
        description: localized(
          '수업 교실과 자신의 자리·교재를 확인하고 질문·이동·칠판 촬영이 가능한지 교사에게 정중히 물어요.',
          'Dars xonasi, o‘rin va darslikni aniqlab, savol, chiqish va doskani suratga olish mumkinligini muloyim so‘rang.',
          'Confirm the classroom, seat, and textbook and politely ask the teacher about questions, leaving, and board photos.',
          'Уточняйте аудиторию, место и учебник и вежливо спрашивайте учителя о вопросах, выходе и фото доски.',
        ),
        icon: 'school-outline',
        proficiency: ExpressionProficiency.BEGINNER,
        expressions: [
          ...rows([
            ['confirm-korean-classroom', '여기가 한국어 수업 교실인가요?', 'yeogiga hangugeo sueop gyosiringayo', '한국어 수업 교실이 맞는지 묻는 말', 'Bu koreys tili darsi xonasi ekanini so‘rash', 'Is this the classroom for Korean class?', 'Это аудитория для урока корейского языка?'],
            ['ask-assigned-seat', '제 자리가 어디인지 알려 주실 수 있나요?', 'je jariga eodiinji allyeo jusil su innayo', '자신의 자리가 어디인지 묻는 말', 'O‘z o‘rni qayerdaligini so‘rash', 'Could you tell me where my seat is?', 'Можете сказать, где моё место?'],
            ['confirm-textbook', '이 교재를 사용하면 되나요?', 'i gyojaereul sayonghamyeon doenayo', '사용할 교재가 맞는지 묻는 말', 'Shu darslikni ishlatishni so‘rash', 'Should I use this textbook?', 'Мне использовать этот учебник?'],
            ['ask-permission-for-questions', '수업 중에 질문해도 될까요?', 'sueop junge jilmunhaedo doelkkayo', '수업 중 질문해도 되는지 묻는 말', 'Dars paytida savol berishga ruxsat so‘rash', 'May I ask questions during class?', 'Можно задавать вопросы во время урока?'],
            ['ask-leave-classroom-briefly', '잠시 교실 밖에 나갔다 와도 될까요?', 'jamsi gyosil bakke nagatda wado doelkkayo', '잠시 교실을 나갔다 와도 되는지 묻는 말', 'Xonadan qisqa chiqib kelishga ruxsat so‘rash', 'May I step out of the classroom for a moment?', 'Можно ненадолго выйти из аудитории?'],
            ['ask-sit-here', '이 자리에 앉아도 되나요?', 'i jarie anjado doenayo', '이 자리에 앉아도 되는지 묻는 말', 'Shu joyga o‘tirishga ruxsat so‘rash', 'May I sit here?', 'Можно сесть на это место?'],
            ['ask-photo-of-board', '칠판 사진을 찍어도 될까요?', 'chilpan sajineul jjigeodo doelkkayo', '칠판을 촬영해도 되는지 묻는 말', 'Doskani suratga olishga ruxsat so‘rash', 'May I take a photo of the board?', 'Можно сфотографировать доску?'],
            ['ask-seat-casual', '여기 앉아도 돼?', 'yeogi anjado dwae', '친한 학생에게 옆자리에 앉아도 되는지 묻는 말', 'Yaqin kursdoshdan shu yerga o‘tirishni so‘rash', 'Can I sit here?', 'Можно я сяду здесь?', ExpressionSpeechLevel.CASUAL, CLOSE_CLASSMATE],
          ], CLASSROOM_CONTEXT, STUDENT, CLASSROOM_USAGE),
          ...rows([
            ['class-held-here', '수업은 이 교실에서 진행합니다.', 'sueobeun i gyosireseo jinhaenghamnida', '수업이 이 교실에서 진행된다고 안내하는 말', 'Dars shu xonada bo‘lishini aytish', 'The class is held in this classroom.', 'Занятие проходит в этой аудитории.'],
            ['sit-in-assigned-seat', '지정된 자리에 앉아 주세요.', 'jijeongdoen jarie anja juseyo', '지정 좌석에 앉으라고 안내하는 말', 'Belgilangan joyga o‘tirishni aytish', 'Please sit in your assigned seat.', 'Сядьте, пожалуйста, на назначенное место.'],
            ['use-first-unit-today', '오늘은 이 교재의 첫 단원을 사용합니다.', 'oneureun i gyojaeui cheot danwoneul sayonghamnida', '오늘 사용할 교재 단원을 안내하는 말', 'Bugun darslikning birinchi bo‘limi ishlatilishini aytish', 'Today we will use the first unit of this textbook.', 'Сегодня мы будем использовать первый раздел этого учебника.'],
            ['raise-hand-for-question', '질문이 있으면 손을 들어 주세요.', 'jilmuni isseumyeon soneul deureo juseyo', '질문이 있으면 손을 들라고 안내하는 말', 'Savol bo‘lsa qo‘l ko‘tarishni aytish', 'Please raise your hand if you have a question.', 'Поднимите руку, если у вас есть вопрос.'],
            ['notify-before-leaving-room', '교실을 나갈 때는 먼저 알려 주세요.', 'gyosireul nagal ttaeneun meonjeo allyeo juseyo', '교실을 나가기 전 알리라고 안내하는 말', 'Xonadan chiqishdan oldin aytishni so‘rash', 'Please let me know before leaving the classroom.', 'Сообщите мне перед выходом из аудитории.'],
            ['check-class-photo-rule', '촬영 가능 여부는 수업 규칙에서 확인해 주세요.', 'chwalyeong ganeung yeobuneun sueop gyuchigeseo hwaginhae juseyo', '촬영 가능 여부를 수업 규칙에서 확인하라는 말', 'Suratga olishni dars qoidasidan tekshirishni aytish', 'Check the class rules to see whether photos are allowed.', 'Проверьте в правилах занятия, разрешена ли съёмка.'],
            ['materials-at-front', '필요한 교재는 앞쪽에 있습니다.', 'piryohan gyojaeneun apjjoge isseumnida', '필요한 교재 위치를 안내하는 말', 'Kerakli darslik old tomonda ekanini aytish', 'The required materials are at the front.', 'Необходимые материалы находятся впереди.'],
          ], CLASSROOM_CONTEXT, TEACHER_OR_CLASSMATE, CLASSROOM_USAGE),
        ],
      },
      {
        code: 'ask-about-lesson-content',
        title: localized(
          '용어·발음·문법·예시를 구체적으로 질문하기',
          'Atama, talaffuz, grammatika va misolni aniq so‘rash',
          'Asking specific questions about terms, pronunciation, grammar, and examples',
          'Конкретные вопросы о терминах, произношении, грамматике и примерах',
        ),
        description: localized(
          '모르는 용어와 발음, 두 표현의 차이, 문법 사용 예와 설명 단계 중 막힌 지점을 구체적으로 질문해요.',
          'Noma’lum atama va talaffuzni, ikki ifoda farqini, grammatika misolini va qiyin bosqichni aniq so‘rang.',
          'Ask specifically about unfamiliar terms and pronunciation, differences between expressions, grammar examples, and the step that was unclear.',
          'Конкретно спрашивайте о незнакомом термине и произношении, различиях выражений, примере грамматики и непонятном этапе.',
        ),
        icon: 'book-outline',
        proficiency: ExpressionProficiency.BEGINNER,
        expressions: [
          ...rows([
            ['ask-term-meaning', '이 용어는 무슨 뜻인가요?', 'i yongeoneun museun tteusingayo', '수업 용어의 뜻을 묻는 말', 'Dars atamasi ma’nosini so‘rash', 'What does this term mean?', 'Что означает этот термин?'],
            ['ask-word-pronunciation', '이 단어의 발음을 확인해 주실 수 있나요?', 'i daneoui bareumeul hwaginhae jusil su innayo', '단어의 발음 확인을 요청하는 말', 'So‘z talaffuzini tekshirishni so‘rash', 'Could you confirm the pronunciation of this word?', 'Можете уточнить произношение этого слова?'],
            ['ask-grammar-example', '이 문법이 문장에서 어떻게 쓰이는지 예를 들어 주세요.', 'i munbeobi munjangeseo eotteoke sseuineunji yereul deureo juseyo', '문법이 문장에서 쓰이는 예를 요청하는 말', 'Grammatika gapda ishlatilishiga misol so‘rash', 'Please give an example of how this grammar is used in a sentence.', 'Приведите пример использования этой грамматики в предложении.'],
            ['ask-expression-difference', '두 표현의 차이를 설명해 주실 수 있나요?', 'du pyohyeonui chaireul seolmyeonghae jusil su innayo', '두 표현의 차이 설명을 요청하는 말', 'Ikki ifoda farqini tushuntirishni so‘rash', 'Could you explain the difference between the two expressions?', 'Можете объяснить разницу между двумя выражениями?'],
            ['ask-show-second-step', '방금 설명한 단계 중 두 번째 단계를 다시 보여 주실 수 있나요?', 'banggeum seolmyeonghan dangye jung du beonjjae dangyereul dasi boyeo jusil su innayo', '설명한 두 번째 단계를 다시 보여 달라는 말', 'Tushuntirilgan ikkinchi bosqichni qayta ko‘rsatishni so‘rash', 'Could you show the second step again?', 'Можете ещё раз показать второй этап?'],
            ['check-understood-content', '제가 이해한 내용이 맞는지 확인해 주세요.', 'jega ihaehan naeyongi manneunji hwaginhae juseyo', '이해한 수업 내용이 맞는지 확인을 요청하는 말', 'Tushunilgan dars mazmunini tekshirishni so‘rash', 'Please check whether I understood the content correctly.', 'Проверьте, правильно ли я понял(а) материал.'],
            ['ask-easier-example', '이 부분을 더 쉬운 예로 설명해 주실 수 있나요?', 'i bubuneul deo swiun yero seolmyeonghae jusil su innayo', '더 쉬운 예로 설명을 요청하는 말', 'Osonroq misol bilan tushuntirishni so‘rash', 'Could you explain this part with an easier example?', 'Можете объяснить эту часть на более простом примере?'],
          ], LESSON_QUESTION_CONTEXT, STUDENT, LESSON_QUESTION_USAGE),
          ...rows([
            ['define-main-idea-term', '이 용어는 글의 중심 생각을 뜻해요.', 'i yongeoneun geurui jungsim saenggageul tteutaeyo', '용어가 글의 중심 생각을 뜻한다고 설명하는 말', 'Atama matnning asosiy fikrini anglatishini aytish', 'This term means the main idea of a text.', 'Этот термин означает основную мысль текста.'],
            ['pronunciation-in-audio', '발음은 교재의 음원에서 다시 확인할 수 있어요.', 'bareumeun gyojaeui eumwoneseo dasi hwaginhal su isseoyo', '교재 음원에서 발음을 확인하도록 안내하는 말', 'Talaffuzni darslik audio yozuvidan tekshirishni aytish', 'You can check the pronunciation again in the textbook audio.', 'Произношение можно ещё раз проверить в аудио к учебнику.'],
            ['write-another-example', '예문을 하나 더 칠판에 적어 드릴게요.', 'yemuneul hana deo chilpane jeogeo deurilgeyo', '예문을 칠판에 하나 더 적겠다는 말', 'Doskaga yana bir misol yozishni aytish', 'I will write one more example on the board.', 'Я напишу на доске ещё один пример.'],
            ['expressions-used-differently', '두 표현은 쓰이는 상황이 달라요.', 'du pyohyeoneun sseuineun sanghwangi dallayo', '두 표현이 다른 상황에서 쓰인다고 설명하는 말', 'Ikki ifoda turli vaziyatda ishlatilishini aytish', 'The two expressions are used in different situations.', 'Эти два выражения используются в разных ситуациях.'],
            ['ask-where-confusion-started', '어느 단계부터 이해가 어려웠나요?', 'eoneu dangyebuteo ihaega eoryeowonnayo', '어느 단계부터 이해하기 어려웠는지 묻는 말', 'Qaysi bosqichdan tushunish qiyin bo‘lganini so‘rash', 'From which step did it become difficult to understand?', 'С какого этапа стало трудно понимать?'],
            ['find-subject-and-verb', '먼저 이 문장의 주어와 동사를 찾아보세요.', 'meonjeo i munjangui jueowa dongsareul chajaboseyo', '문장의 주어와 동사를 먼저 찾으라는 안내', 'Avval gapning ega va fe’lini topishni aytish', 'First, find the subject and verb in this sentence.', 'Сначала найдите подлежащее и глагол в этом предложении.'],
            ['explain-in-own-words', '이해한 내용을 자신의 말로 설명해 볼까요?', 'ihaehan naeyongeul jasinui mallo seolmyeonghae bolkkayo', '이해한 내용을 자신의 말로 설명하게 하는 말', 'Tushunganini o‘z so‘zi bilan aytishni so‘rash', 'Shall we explain what you understood in your own words?', 'Попробуем объяснить понятое своими словами?'],
            ['pronounce-word-this-way-casual', '이 단어는 이렇게 발음해.', 'i daneoneun ireoke bareumhae', '친한 학생에게 단어 발음을 알려 주는 말', 'Yaqin kursdoshga so‘z talaffuzini aytish', 'This is how you pronounce the word.', 'Это слово произносится так.', ExpressionSpeechLevel.CASUAL, CLOSE_CLASSMATE],
          ], LESSON_QUESTION_CONTEXT, TEACHER_OR_CLASSMATE, LESSON_QUESTION_USAGE),
        ],
      },
      {
        code: 'confirm-assignment-and-submission',
        title: localized(
          '과제 범위·형식·마감·제출 방법 확인하기',
          'Topshiriq doirasi, formati, muddati va topshirishni aniqlash',
          'Confirming assignment scope, format, deadline, and submission',
          'Уточнение объёма, формата, срока и способа сдачи задания',
        ),
        description: localized(
          '과제 범위와 개인·조별 여부, 제출 형식, 공식 마감, 파일 이름과 재제출 절차를 정확히 확인해요.',
          'Topshiriq doirasi, yakka yoki guruh shakli, format, rasmiy muddat, fayl nomi va qayta topshirishni aniq tekshiring.',
          'Confirm assignment scope, individual or group work, submission format, official deadline, file naming, and resubmission procedures.',
          'Точно уточняйте объём задания, индивидуальный или групповой формат, способ сдачи, официальный срок, имя файла и повторную сдачу.',
        ),
        icon: 'document-text-outline',
        proficiency: ExpressionProficiency.INTERMEDIATE,
        expressions: [
          ...rows([
            ['ask-assignment-scope', '과제는 어디까지 하면 되나요?', 'gwajeneun eodikkaji hamyeon doenayo', '과제 범위를 묻는 말', 'Topshiriq doirasini so‘rash', 'How much of the assignment should I complete?', 'До какого места нужно выполнить задание?'],
            ['ask-submission-format', '제출 형식은 파일인가요, 종이인가요?', 'jechul hyeongsigeun pailingayo jongiingayo', '과제 제출 형식이 파일인지 종이인지 묻는 말', 'Topshirish fayl yoki qog‘oz ekanini so‘rash', 'Should the assignment be submitted as a file or on paper?', 'Задание сдаётся файлом или на бумаге?'],
            ['check-official-deadline', '마감 날짜와 시간을 공식 공지에서 확인하고 싶어요.', 'magam naljjawa siganeul gongsik gongjieseo hwaginhago sipeoyo', '공식 공지에서 마감 일시를 확인하고 싶다는 말', 'Rasmiy e’londan muddatni tekshirishni aytish', 'I would like to confirm the deadline date and time in the official notice.', 'Я хотел(а) бы уточнить дату и время сдачи в официальном объявлении.'],
            ['ask-file-name-format', '파일 이름 형식이 정해져 있나요?', 'pail ireum hyeongsigi jeonghaejyeo innayo', '과제 파일 이름 형식을 묻는 말', 'Fayl nomi formati belgilanganini so‘rash', 'Is there a required file-naming format?', 'Есть ли установленный формат имени файла?'],
            ['ask-individual-or-group', '과제는 개인으로 하나요, 조별로 하나요?', 'gwajeneun gaeineuro hanayo jobyeollo hanayo', '과제가 개인인지 조별인지 묻는 말', 'Topshiriq yakka yoki guruh ekanini so‘rash', 'Is the assignment individual or group work?', 'Это индивидуальное или групповое задание?'],
            ['ask-resubmission-procedure', '수정한 과제를 다시 제출할 수 있는지와 절차를 알려 주세요.', 'sujeonghan gwajereul dasi jechulhal su inneunjiwa jeolchareul allyeo juseyo', '수정 과제의 재제출 가능 여부와 절차를 묻는 말', 'Tuzatilgan topshiriqni qayta topshirish mumkinligi va tartibini so‘rash', 'Please tell me whether I may resubmit a revised assignment and what procedure to follow.', 'Сообщите, можно ли повторно сдать исправленное задание и какова процедура.'],
            ['check-submission-complete', '제출이 완료됐는지 어디에서 확인하나요?', 'jechuri wallyodwaenneunji eodieseo hwaginhanayo', '제출 완료 여부 확인 위치를 묻는 말', 'Topshirish yakunini qayerdan tekshirishni so‘rash', 'Where can I confirm that my submission is complete?', 'Где проверить, что работа успешно отправлена?'],
            ['ask-scope-casual', '과제 범위 어디까지야?', 'gwaje beomwi eodikkajiya', '친한 학생에게 과제 범위를 묻는 말', 'Yaqin kursdoshdan topshiriq doirasini so‘rash', 'How far does the assignment go?', 'До какого места задание?', ExpressionSpeechLevel.CASUAL, CLOSE_CLASSMATE],
          ], ASSIGNMENT_CONTEXT, STUDENT, ASSIGNMENT_USAGE),
          ...rows([
            ['scope-through-unit', '과제 범위는 교재의 해당 단원까지입니다.', 'gwaje beomwineun gyojaeui haedang danwonkkajimnida', '과제 범위가 해당 단원까지라고 안내하는 말', 'Topshiriq shu bo‘limgacha ekanini aytish', 'The assignment covers through the relevant textbook unit.', 'Задание охватывает материал до соответствующего раздела учебника.'],
            ['format-in-class-notice', '제출 형식은 수업 공지에서 확인해 주세요.', 'jechul hyeongsigeun sueop gongjieseo hwaginhae juseyo', '제출 형식을 수업 공지에서 확인하라는 말', 'Topshirish formatini dars e’lonidan tekshirishni aytish', 'Check the class notice for the submission format.', 'Проверьте формат сдачи в объявлении курса.'],
            ['deadline-in-learning-system', '마감은 공식 학습 시스템에 표시된 시간을 기준으로 합니다.', 'magameun gongsik hakseup siseuteme pyosidoen siganeul gijuneuro hamnida', '공식 시스템의 마감 시간을 기준으로 한다는 안내', 'Rasmiy tizimdagi muddat asos ekanini aytish', 'The deadline is based on the time displayed in the official learning system.', 'Срок определяется временем в официальной учебной системе.'],
            ['file-name-with-id-and-title', '공식 제출 시스템에서 요구하는 경우에만 파일 이름에 학번과 과제명을 넣어 주세요.', 'gongsik jechul siseutemeseo yoguhaneun gyeongueman pail ireumeneun hakbeonggwa gwajemyeongeul neoeo juseyo', '공식 시스템이 요구할 때만 파일 이름에 학번과 과제명을 넣으라는 안내', 'Faqat rasmiy tizim talab qilganda fayl nomiga talaba raqami va topshiriq nomini yozishni aytish', 'Include your student number and assignment title in the file name only when the official submission system requires it.', 'Указывайте номер студента и название задания в имени файла только по требованию официальной системы сдачи.'],
            ['check-completion-screen', '제출 후 완료 화면을 확인해 주세요.', 'jechul hu wallyo hwamyeoneul hwaginhae juseyo', '제출 뒤 완료 화면을 확인하라는 안내', 'Topshirgach yakun ekranini tekshirishni aytish', 'Check the completion screen after submitting.', 'После отправки проверьте экран подтверждения.'],
            ['verify-resubmission-rules', '재제출 가능 여부는 과제 규정을 확인해 주세요.', 'jaejechul ganeung yeobuneun gwaje gyujeongeul hwaginhae juseyo', '재제출 가능 여부를 과제 규정에서 확인하라는 말', 'Qayta topshirishni topshiriq qoidasidan tekshirishni aytish', 'Check the assignment rules to see whether resubmission is allowed.', 'Проверьте правила задания, чтобы узнать, разрешена ли повторная сдача.'],
            ['report-problem-before-deadline', '문제가 있으면 마감 전에 공식 문의 경로로 알려 주세요.', 'munjega isseumyeon magam jeone gongsik munui gyeongnoro allyeo juseyo', '제출 문제를 마감 전 공식 경로로 알리라는 안내', 'Muammoni muddatdan oldin rasmiy yo‘l bilan bildirishni aytish', 'Report any problem through the official inquiry channel before the deadline.', 'Сообщите о проблеме по официальному каналу до срока сдачи.'],
          ], ASSIGNMENT_CONTEXT, TEACHER_OR_CLASSMATE, ASSIGNMENT_USAGE),
        ],
      },
      {
        code: 'coordinate-presentations-groups-and-catchup',
        title: localized(
          '발표·조별활동·결석 보충과 역할 인계하기',
          'Taqdimot, guruh ishi, qoldirilgan dars va rol topshirishni kelishish',
          'Coordinating presentations, group work, absence catch-up, and role handoff',
          'Согласование выступлений, групповой работы, пропусков и передачи роли',
        ),
        description: localized(
          '발표 순서와 조별 역할을 확인하고 결석한 수업의 공식 자료를 찾으며, 진행 상황과 남은 일을 정확히 인계해요.',
          'Taqdimot tartibi va guruh rolini aniqlang, qoldirilgan darsning rasmiy materialini topib, jarayon va qolgan ishni aniq topshiring.',
          'Confirm presentation order and group roles, find official materials after an absence, and accurately hand over progress and remaining work.',
          'Уточняйте порядок выступлений и роли, находите официальные материалы после пропуска и точно передавайте ход и оставшуюся работу.',
        ),
        icon: 'people-outline',
        proficiency: ExpressionProficiency.INTERMEDIATE,
        expressions: [
          ...rows([
            ['ask-presentation-order', '발표 순서는 어디에서 확인하나요?', 'balpyo sunseoneun eodieseo hwaginhanayo', '발표 순서를 확인할 위치를 묻는 말', 'Taqdimot tartibini qayerdan tekshirishni so‘rash', 'Where can I check the presentation order?', 'Где можно посмотреть порядок выступлений?'],
            ['ask-group-role', '조별활동에서 제 역할이 무엇인가요?', 'jobyeol hwaldongeseo je yeokhari mueosingayo', '조별활동에서 자신의 역할을 묻는 말', 'Guruh ishida o‘z rolini so‘rash', 'What is my role in the group activity?', 'Какова моя роль в групповой работе?'],
            ['share-assigned-progress', '제가 맡은 부분의 진행 상황을 공유하겠습니다.', 'jega mateun bubunui jinhaeng sanghwangeul gongyuhagetseumnida', '맡은 부분의 진행 상황을 공유하겠다는 말', 'O‘z qismi jarayonini ulashishini aytish', 'I will share the progress on my assigned part.', 'Я сообщу о ходе своей части работы.'],
            ['ask-absence-materials', '결석한 수업의 자료를 어디에서 확인할 수 있나요?', 'gyeolseokhan sueobui jaryoreul eodieseo hwaginhal su innayo', '결석한 수업 자료 확인 위치를 묻는 말', 'Qoldirilgan dars materialini qayerdan ko‘rishni so‘rash', 'Where can I find the materials for the class I missed?', 'Где найти материалы пропущенного занятия?'],
            ['ask-makeup-activity', '보충해야 할 활동이 있는지 알려 주세요.', 'bochunghaeya hal hwaldongi inneunji allyeo juseyo', '보충해야 할 수업 활동이 있는지 묻는 말', 'To‘ldiriladigan faoliyat borligini so‘rash', 'Please let me know whether there is an activity I need to make up.', 'Сообщите, нужно ли мне выполнить дополнительное задание.'],
            ['handover-presentation-materials', '다음 발표자에게 제 자료를 인계하겠습니다.', 'daeum balpyojaege je jaryoreul ingyehagetseumnida', '자료를 다음 발표자에게 인계하겠다는 말', 'Materialni keyingi taqdimotchiga topshirishini aytish', 'I will hand my materials over to the next presenter.', 'Я передам свои материалы следующему выступающему.'],
            ['share-only-needed-group-details', '조원에게 필요한 내용만 공유하겠습니다.', 'jowonege piryohan naeyongman gongyuhagetseumnida', '조원에게 필요한 내용만 공유하겠다는 말', 'Guruh a’zosiga faqat zarur ma’lumotni ulashishni aytish', 'I will share only the necessary details with my group members.', 'Я передам участникам группы только необходимую информацию.'],
          ], GROUP_CONTEXT, STUDENT, GROUP_USAGE),
          ...rows([
            ['presentation-order-in-notice', '발표 순서는 수업 공지에 올렸습니다.', 'balpyo sunseoneun sueop gongjie ollyeotseumnida', '발표 순서를 수업 공지에 게시했다고 안내하는 말', 'Taqdimot tartibi dars e’lonida joylanganini aytish', 'The presentation order is posted in the class notice.', 'Порядок выступлений опубликован в объявлении курса.'],
            ['record-group-roles', '조별로 역할을 나눈 뒤 기록해 주세요.', 'jobyeollo yeokhareul nanun dwi girokhae juseyo', '조별 역할 분담을 기록하라는 안내', 'Guruh rolini taqsimlab yozishni aytish', 'After dividing the group roles, record them.', 'После распределения ролей запишите их.'],
            ['catch-up-with-official-materials', '결석한 수업은 공식 자료와 담당 교사 안내를 확인해 주세요.', 'gyeolseokhan sueobeun gongsik jaryowa damdang gyosa annaereul hwaginhae juseyo', '결석 수업을 공식 자료와 교사 안내로 확인하라는 말', 'Qoldirilgan darsni rasmiy material va o‘qituvchi orqali tekshirishni aytish', 'For a missed class, check the official materials and the teacher’s guidance.', 'По пропущенному занятию проверьте официальные материалы и указания учителя.'],
            ['do-not-share-student-data-answers', '다른 학생의 개인정보나 답안을 공유하지 마세요.', 'dareun haksaengui gaeinjeongbona dabaneul gongyuhaji maseyo', '다른 학생의 정보나 답안을 공유하지 말라는 안내', 'Boshqa talabaning ma’lumoti yoki javobini ulashmaslikni aytish', 'Do not share another student’s personal information or answers.', 'Не передавайте персональные данные или ответы другого учащегося.'],
            ['handover-complete-and-remaining', '인계할 때 완료한 부분과 남은 부분을 알려 주세요.', 'ingyehal ttae wallyohan bubungwa nameun bubuneul allyeo juseyo', '인계할 때 완료·미완료 부분을 함께 알리라는 말', 'Topshirishda tugagan va qolgan qismni aytishni so‘rash', 'When handing off, state what is complete and what remains.', 'При передаче укажите, что завершено и что осталось.'],
            ['include-sources-in-presentation', '발표 자료의 출처도 함께 표시해 주세요.', 'balpyo jaryoui chulcheodo hamkke pyosihae juseyo', '발표 자료에 출처를 표시하라는 안내', 'Taqdimot materialida manbani ko‘rsatishni aytish', 'Include the sources in the presentation materials.', 'Укажите источники в материалах презентации.'],
            ['confirm-role-change', '역할 변경은 조원 및 교사와 먼저 상의해 주세요.', 'yeokhal byeongyeongeun jowon mit gyosawa meonjeo sang-uihae juseyo', '역할 변경 전 조원 및 교사와 상의하라는 말', 'Rol o‘zgarishini guruh va o‘qituvchi bilan muhokama qilishni aytish', 'Discuss role changes with the group and teacher first.', 'Сначала обсудите изменение роли с группой и учителем.'],
            ['take-over-presentation-casual', '내가 네 발표 부분 이어서 할게.', 'naega ne balpyo bubun ieoseo halge', '친한 학생에게 발표 부분을 이어서 맡겠다는 말', 'Yaqin kursdoshga taqdimot qismini davom ettirishini aytish', 'I will take over your part of the presentation.', 'Я продолжу твою часть презентации.', ExpressionSpeechLevel.CASUAL, CLOSE_CLASSMATE],
          ], GROUP_CONTEXT, TEACHER_OR_CLASSMATE, GROUP_USAGE),
        ],
      },
      {
        code: 'ask-about-feedback-scores-and-review',
        title: localized(
          '피드백·점수·평가 기준과 오류 재확인하기',
          'Fikr, ball, baholash mezoni va xatoni qayta tekshirish',
          'Rechecking feedback, scores, evaluation criteria, and errors',
          'Уточнение обратной связи, баллов, критериев и ошибок',
        ),
        description: localized(
          '구체적인 피드백과 적용된 평가 기준을 묻고 점수·채점표 기록이 다를 때 공식 재검토 절차를 정중히 확인해요.',
          'Aniq fikr va qo‘llangan mezonni so‘rang, ball va baholash yozuvi farq qilsa rasmiy qayta ko‘rish tartibini muloyim aniqlang.',
          'Ask for specific feedback and applied criteria and politely verify the official review process when score records differ.',
          'Просите конкретную обратную связь и применённые критерии и вежливо уточняйте официальную процедуру при расхождении записей.',
        ),
        icon: 'checkmark-done-outline',
        proficiency: ExpressionProficiency.ADVANCED,
        expressions: [
          ...rows([
            ['ask-specific-feedback', '제 과제에 대한 구체적인 피드백을 받을 수 있을까요?', 'je gwajee daehan guchejeogin pideubaegeul badeul su isseulkkayo', '과제에 대한 구체적인 피드백을 요청하는 말', 'Topshiriq bo‘yicha aniq fikr so‘rash', 'Could I receive specific feedback on my assignment?', 'Можно получить конкретную обратную связь по моему заданию?'],
            ['ask-score-calculation-criteria', '이 점수가 어떤 평가 기준으로 계산됐는지 설명해 주실 수 있나요?', 'i jeomsuga eotteon pyeongga gijuneuro gyesandoenneunji seolmyeonghae jusil su innayo', '점수 계산에 적용된 평가 기준을 묻는 말', 'Ball qaysi mezon bilan hisoblanganini so‘rash', 'Could you explain which evaluation criteria were used to calculate this score?', 'Можете объяснить, по каким критериям рассчитан этот балл?'],
            ['ask-rubric-deduction', '채점표의 어느 항목에서 점수가 줄었는지 확인하고 싶습니다.', 'chaejeompyoui eoneu hangmogeseo jeomsuga jureonneunji hwaginhago sipseumnida', '채점표에서 감점된 항목을 확인하고 싶다는 말', 'Mezondagi qaysi bandda ball kamayganini so‘rash', 'I would like to check which rubric item reduced the score.', 'Я хотел(а) бы узнать, по какому пункту рубрики был снижен балл.'],
            ['ask-recheck-answer-section', '제 답안의 이 부분을 다시 확인해 주실 수 있나요?', 'je dapanui i bubuneul dasi hwaginhae jusil su innayo', '답안의 특정 부분 재확인을 요청하는 말', 'Javobning muayyan qismini qayta tekshirishni so‘rash', 'Could you recheck this part of my answer?', 'Можете ещё раз проверить эту часть моего ответа?'],
            ['report-score-record-mismatch', '시스템에 표시된 점수와 채점표가 달라서 확인을 요청드립니다.', 'siseuteme pyosidoen jeomsuwa chaejeompyoga dallaseo hwagineul yocheongdeurimnida', '시스템 점수와 채점표가 달라 확인을 요청하는 말', 'Tizimdagi ball va rubrika farqi sabab tekshiruv so‘rash', 'The score in the system differs from the rubric, so I am requesting a check.', 'Балл в системе отличается от рубрики, поэтому прошу проверить.'],
            ['ask-applied-criteria-not-change', '점수 변경 가능 여부가 아니라 적용된 기준을 알고 싶습니다.', 'jeomsu byeongyeong ganeung yeobuga anira jeogyongdoen gijuneul algo sipseumnida', '점수 변경보다 적용 기준을 알고 싶다고 말하는 표현', 'Ball o‘zgarishidan ko‘ra qo‘llangan mezonni bilishni aytish', 'I want to understand the applied criteria, not ask whether the score can change.', 'Я хочу понять применённые критерии, а не спрашивать об изменении балла.'],
            ['ask-review-procedure-window', '재검토 요청 절차와 기간을 어디에서 확인하나요?', 'jaegeomto yocheong jeolchaewa giganeul eodieseo hwaginhanayo', '재검토 절차와 기간 확인 위치를 묻는 말', 'Qayta ko‘rish tartibi va muddatini qayerdan tekshirishni so‘rash', 'Where can I check the review request procedure and time window?', 'Где проверить процедуру и срок запроса на пересмотр?'],
            ['review-rubric-together-casual', '이 부분 채점 기준 같이 볼래?', 'i bubun chaejeom gijun gachi bollae', '친한 학생에게 채점 기준을 함께 보자고 하는 말', 'Yaqin kursdoshga mezonni birga ko‘rishni taklif qilish', 'Do you want to look at the rubric for this part together?', 'Хочешь вместе посмотреть критерии этой части?', ExpressionSpeechLevel.CASUAL, CLOSE_CLASSMATE],
          ], ASSESSMENT_CONTEXT, STUDENT, ASSESSMENT_USAGE),
          ...rows([
            ['rubric-in-official-course-materials', '평가 기준은 수업의 공식 채점표에서 확인할 수 있습니다.', 'pyeongga gijuneun sueobui gongsik chaejeompyoeseo hwaginhal su isseumnida', '평가 기준을 공식 채점표에서 확인할 수 있다는 안내', 'Baholash mezoni rasmiy rubrikada ekanini aytish', 'The evaluation criteria are available in the official course rubric.', 'Критерии оценки указаны в официальной рубрике курса.'],
            ['explain-applied-criteria-after-check', '확인 후 점수에 적용된 기준을 설명드리겠습니다.', 'hwagin hu jeomsue jeogyongdoen gijuneul seolmyeongdeurigetseumnida', '확인 뒤 점수에 적용된 기준을 설명하겠다는 말', 'Tekshiruvdan keyin qo‘llangan mezonni tushuntirishni aytish', 'After checking, I will explain the criteria applied to the score.', 'После проверки я объясню критерии, применённые к баллу.'],
            ['review-does-not-guarantee-change', '재검토 요청이 점수 변경을 보장하지는 않습니다.', 'jaegeomto yocheongi jeomsu byeongyeongeul bojanghajineun anseumnida', '재검토가 점수 변경을 보장하지 않는다는 안내', 'Qayta ko‘rish ball o‘zgarishini kafolatlamasligini aytish', 'A review request does not guarantee a score change.', 'Запрос на пересмотр не гарантирует изменение балла.'],
            ['compare-answer-and-record', '답안과 채점 기록을 다시 비교해 보겠습니다.', 'dabangwa chaejeom girogeul dasi bigyohae bogetseumnida', '답안과 채점 기록을 다시 비교하겠다는 말', 'Javob va baholash yozuvini qayta solishtirishni aytish', 'I will compare the answer and grading record again.', 'Я ещё раз сравню ответ и запись оценивания.'],
            ['error-follow-school-procedure', '오류가 확인되면 학교 절차에 따라 안내하겠습니다.', 'oryuga hwagindoemyeon hakgyo jeolchare ttara annaehae deurigetseumnida', '오류 확인 시 학교 절차에 따라 안내하겠다는 말', 'Xato aniqlansa maktab tartibi bo‘yicha xabar berishni aytish', 'If an error is confirmed, I will provide guidance according to school procedure.', 'Если ошибка подтвердится, я сообщу дальнейшие шаги по процедуре учебного заведения.'],
            ['cannot-disclose-other-scores', '다른 학생의 점수나 답안은 공개할 수 없습니다.', 'dareun haksaengui jeomsuna dabaneun gonggaehal su eopseumnida', '다른 학생의 점수와 답안을 공개할 수 없다는 안내', 'Boshqa talabaning balli yoki javobini oshkor qilmaslikni aytish', 'I cannot disclose another student’s score or answers.', 'Я не могу раскрывать баллы или ответы другого учащегося.'],
            ['mark-specific-question-items', '질문할 항목을 구체적으로 표시해 주세요.', 'jilmunhal hangmogeul guchejeogeuro pyosihae juseyo', '질문할 평가 항목을 구체적으로 표시하라는 안내', 'Savol qilinadigan bandni aniq belgilashni aytish', 'Please mark the specific items you want to ask about.', 'Отметьте конкретные пункты, о которых хотите спросить.'],
          ], ASSESSMENT_CONTEXT, TEACHER_OR_CLASSMATE, ASSESSMENT_USAGE),
        ],
      },
      {
        code: 'request-support-and-follow-academic-integrity',
        title: localized(
          '상담·학습 지원·인용·학업 윤리와 계정 보안 확인하기',
          'Maslahat, yordam, iqtibos, akademik halollik va hisob xavfsizligini aniqlash',
          'Requesting support and checking citation, integrity, and account security',
          'Запрос поддержки и проверка цитирования, честности и безопасности аккаунта',
        ),
        description: localized(
          '상담과 접근성 지원 절차를 묻고 자료 출처와 인용 방법을 확인하며, 표절·답안 공유와 학교 계정 노출을 막아요.',
          'Maslahat va qulaylik yordami tartibini so‘rang, manba va iqtibosni aniqlang hamda plagiat, javob ulashish va hisob oshkor bo‘lishining oldini oling.',
          'Ask about consultation and accessibility procedures, verify sources and citation methods, and prevent plagiarism, answer sharing, and account exposure.',
          'Уточняйте консультации и доступную поддержку, проверяйте источники и цитирование и предотвращайте плагиат, обмен ответами и раскрытие аккаунта.',
        ),
        icon: 'library-outline',
        proficiency: ExpressionProficiency.ADVANCED,
        expressions: [
          ...rows([
            ['ask-learning-consultation-channel', '학습 상담을 신청하려면 어디로 문의해야 하나요?', 'hakseup sangdameul sincheongharyeomyeon eodiro munuihaeya hanayo', '학습 상담 신청 문의처를 묻는 말', 'O‘quv maslahati uchun qayerga murojaat qilishni so‘rash', 'Where should I ask to request a learning consultation?', 'Куда обратиться, чтобы записаться на учебную консультацию?'],
            ['request-learning-support', '수업 참여에 필요한 학습 지원을 요청하고 싶습니다.', 'sueop chamyeoe piryohan hakseup jiwoneul yocheonghago sipseumnida', '수업 참여에 필요한 지원을 요청하는 말', 'Darsda qatnashish uchun o‘quv yordamini so‘rash', 'I would like to request learning support needed to participate in class.', 'Я хотел(а) бы запросить учебную поддержку для участия в занятии.'],
            ['ask-readable-material-format', '자료를 읽기 쉬운 형식으로 받을 수 있는지 문의드립니다.', 'jaryoreul ilkgi swiun hyeongsigeuro badeul su inneunji munuideurimnida', '읽기 쉬운 자료 형식을 문의하는 말', 'Materialni o‘qish qulay formatda olishni so‘rash', 'I am asking whether the materials are available in an easier-to-read format.', 'Уточняю, можно ли получить материалы в более удобном для чтения формате.'],
            ['ask-how-to-cite-source', '과제에 사용한 출처를 어떻게 인용해야 하나요?', 'gwajee sayonghan chulcheoreul eotteoke inyonghaeya hanayo', '과제 출처 인용 방법을 묻는 말', 'Topshiriq manbasini qanday iqtibos qilishni so‘rash', 'How should I cite the sources used in my assignment?', 'Как цитировать источники, использованные в задании?'],
            ['ask-if-source-allowed', '이 자료를 과제에 사용해도 되는지 확인하고 싶습니다.', 'i jaryoreul gwajee sayonghaedo doeneunji hwaginhago sipseumnida', '자료를 과제에 사용해도 되는지 확인하는 말', 'Materialni topshiriqda ishlatish mumkinligini so‘rash', 'I would like to confirm whether I may use this source in the assignment.', 'Я хотел(а) бы уточнить, можно ли использовать этот материал в задании.'],
            ['ask-school-account-department', '학교 계정 문제는 어느 공식 부서에 문의하나요?', 'hakgyo gyejeong munjeneun eoneu gongsik buseoe munuihanayo', '학교 계정 문제의 공식 문의 부서를 묻는 말', 'Maktab hisobi muammosi uchun rasmiy bo‘limni so‘rash', 'Which official department handles school-account problems?', 'Какой официальный отдел занимается проблемами учебного аккаунта?'],
            ['refuse-share-school-credentials', '비밀번호나 인증번호는 누구에게도 공유하지 않겠습니다.', 'bimilbeonhona injeungbeonhoneun nuguegedo gongyuhaji anketseumnida', '비밀번호와 인증번호를 공유하지 않겠다는 말', 'Parol va tasdiqlash kodini bermasligini aytish', 'I will not share my password or verification code with anyone.', 'Я никому не сообщу пароль или код подтверждения.'],
          ], SUPPORT_ETHICS_CONTEXT, STUDENT, SUPPORT_ETHICS_USAGE),
          ...rows([
            ['verify-official-support-process', '상담과 지원은 학교의 공식 신청 절차를 확인해 주세요.', 'sangdamgwa jiwoneun hakgyoui gongsik sincheong jeolchareul hwaginhae juseyo', '상담과 지원의 공식 신청 절차를 확인하라는 안내', 'Maslahat va yordamning rasmiy tartibini tekshirishni aytish', 'Check the school’s official application procedure for consultation and support.', 'Проверьте официальную процедуру подачи заявки на консультацию и поддержку.'],
            ['share-needed-support-comfortably', '필요한 지원 내용은 편한 범위에서 담당 부서에 알려 주세요.', 'piryohan jiwon naeyongeun pyeonhan beomwieseo damdang buseoe allyeo juseyo', '필요한 지원을 편한 범위에서 담당 부서에 알리라는 말', 'Kerakli yordamni qulay doirada mas’ul bo‘limga aytishni so‘rash', 'Tell the responsible office what support you need, within what you are comfortable sharing.', 'Сообщите ответственному отделу о нужной поддержке в комфортном для вас объёме.'],
            ['accessibility-support-confirmed-by-office', '접근성 지원 가능 여부와 제공 방식은 담당 부서에서 확인합니다.', 'jeopgeunseong jiwon ganeung yeobuwa jegong bangsigeun damdang buseoeseo hwaginhamnida', '접근성 지원 가능 여부와 방식을 담당 부서에서 확인한다는 안내', 'Qulaylik yordami va usulini mas’ul bo‘lim tekshirishini aytish', 'The responsible office confirms whether accessibility support is available and how it can be provided.', 'Ответственный отдел подтверждает доступность поддержки и способ её предоставления.'],
            ['do-not-submit-others-work', '다른 사람의 글이나 답안을 자신의 것처럼 제출하지 마세요.', 'dareun saramui geurina dabaneul jasinui geotcheoreom jechulhaji maseyo', '다른 사람의 글이나 답안을 자신의 것처럼 제출하지 말라는 안내', 'Boshqaning matni yoki javobini o‘ziniki kabi topshirmaslikni aytish', 'Do not submit another person’s writing or answers as your own.', 'Не выдавайте чужой текст или ответы за свои.'],
            ['mark-source-and-use-scope', '인용한 자료의 출처와 사용 범위를 표시해 주세요.', 'inyonghan jaryoui chulcheowa sayong beomwireul pyosihae juseyo', '인용 자료의 출처와 사용 범위를 표시하라는 안내', 'Iqtibos manbasi va foydalanish doirasini ko‘rsatishni aytish', 'Identify the source and scope of use for cited material.', 'Укажите источник и объём использования цитируемого материала.'],
            ['never-share-credentials-with-teacher-friend', '비밀번호와 인증번호는 교사나 친구에게도 알려 주지 마세요.', 'bimilbeonhowa injeungbeonhoneun gyosana chinguegedo allyeo juji maseyo', '교사나 친구에게도 계정 정보를 공유하지 말라는 안내', 'Parol va kodni o‘qituvchi yoki do‘stga ham bermaslikni aytish', 'Do not share passwords or verification codes even with a teacher or friend.', 'Не сообщайте пароль или код подтверждения даже учителю или другу.'],
            ['use-official-school-system', '계정 확인은 공식 학교 시스템에서만 진행하세요.', 'gyejeong hwagineun gongsik hakgyo siseutemeseoman jinhaenghaseyo', '계정 확인을 공식 시스템에서만 하라는 안내', 'Hisobni faqat rasmiy maktab tizimida tekshirishni aytish', 'Verify accounts only through the official school system.', 'Проверяйте аккаунт только через официальную систему учебного заведения.'],
            ['do-not-copy-my-answer-casual', '내 답을 베끼면 안 돼.', 'nae dabeul bekkimyeon an dwae', '친한 학생에게 답안을 베끼면 안 된다고 하는 말', 'Yaqin kursdoshga javobni ko‘chirmaslikni aytish', 'Do not copy my answer.', 'Не списывай мой ответ.', ExpressionSpeechLevel.CASUAL, CLOSE_CLASSMATE],
          ], SUPPORT_ETHICS_CONTEXT, TEACHER_OR_CLASSMATE, SUPPORT_ETHICS_USAGE),
        ],
      },
    ],
  });
}

export const ASKING_QUESTIONS_AT_SCHOOL_AND_IN_CLASS_TOPIC =
  buildAskingQuestionsAtSchoolAndInClassTopic();
