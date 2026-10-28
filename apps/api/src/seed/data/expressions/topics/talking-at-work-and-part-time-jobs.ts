import { ExpressionProficiency } from '../../../../expressions/schemas/expression-node.schema';
import { ExpressionSpeechLevel } from '../../../../expressions/schemas/expression.schema';
import {
  defineExpressionTopic,
  expressionDrafts,
  localized,
  type ExpressionDraftRow,
} from '../expression-topic.helpers';

const WORKER = localized(
  '직원 또는 아르바이트 근로자',
  'Xodim yoki yarim stavkali ishchi',
  'An employee or part-time worker',
  'Сотрудник или работник на подработке',
);

const MANAGER_OR_COWORKER = localized(
  '관리자·담당자 또는 함께 일하는 동료',
  'Rahbar, mas’ul xodim yoki hamkasb',
  'A manager, supervisor, or coworker',
  'Руководитель, ответственный сотрудник или коллега',
);

const CLOSE_COWORKER = localized(
  '서로 반말을 쓰기로 한 친한 동료',
  'O‘zaro norasmiy gaplashadigan yaqin hamkasb',
  'A close coworker who mutually uses casual speech',
  'Близкий коллега, с которым взаимно принято говорить неформально',
);

const START_CONTEXT = localized(
  '직장이나 아르바이트 근무지에서 출근·업무 시작·담당 업무·마감과 퇴근을 확인할 때 사용해요.',
  'Ish yoki yarim stavkali ish joyida kelish, ish boshlash, vazifa, yopilish va ketishni aniqlashda ishlatiladi.',
  'Use this at work or a part-time job to confirm arrival, starting, assigned duties, closing tasks, and departure.',
  'Используйте на работе или подработке, чтобы уточнить приход, начало, обязанности, закрытие и уход.',
);
const START_USAGE = localized(
  '근무지의 출퇴근 기록과 마감 절차를 확인하고, 반말은 서로 동의한 친한 동료에게만 쓰며 상사나 고객에게 쓰지 않아요.',
  'Ish joyining kelish-ketish va yopilish tartibini tekshiring; norasmiy nutqni faqat kelishilgan yaqin hamkasb bilan ishlating, rahbar yoki mijoz bilan emas.',
  'Confirm workplace check-in and closing procedures; use casual speech only with a close coworker who agrees, never with a supervisor or customer.',
  'Уточняйте порядок отметки прихода и закрытия; неформальную речь используйте только с близким коллегой по взаимному согласию, не с руководителем или клиентом.',
);

const INSTRUCTION_CONTEXT = localized(
  '업무 지시를 듣고 순서·우선순위·물품 위치와 다음 단계를 정확히 재확인할 때 사용해요.',
  'Ish topshirig‘ini tinglab, tartib, ustuvorlik, buyum joyi va keyingi qadamni aniq qayta tekshirishda ishlatiladi.',
  'Use this to receive work instructions and reconfirm sequence, priority, item locations, and next steps.',
  'Используйте, чтобы получить рабочее поручение и уточнить порядок, приоритет, место вещей и следующий шаг.',
);
const INSTRUCTION_USAGE = localized(
  '모르는 지시를 추측해 시작하지 말고 다시 묻거나 메모해 확인해요. 반말 지시는 친한 동료 사이에서만 사용해요.',
  'Tushunarsiz topshiriqni taxmin bilan boshlamang; qayta so‘rang yoki yozib tekshiring. Norasmiy topshiriq faqat yaqin hamkasblar orasida ishlatiladi.',
  'Do not guess and start an unclear task; ask again or write it down to confirm. Casual instructions are only for close coworkers.',
  'Не начинайте непонятное задание наугад: переспросите или запишите. Неформальные указания уместны только между близкими коллегами.',
);

const HANDOFF_CONTEXT = localized(
  '동료나 고객을 응대하고 처리 내용을 기록하며, 다음 근무자나 담당자에게 업무를 정확히 인계할 때 사용해요.',
  'Hamkasb yoki mijoz bilan ishlash, natijani yozish va vazifani keyingi xodim yoki mas’ulga aniq topshirishda ishlatiladi.',
  'Use this to assist coworkers or customers, record what was handled, and hand work over accurately to the next worker or person in charge.',
  'Используйте для общения с коллегами или клиентами, записи результата и точной передачи дела следующему сотруднику или ответственному.',
);
const HANDOFF_USAGE = localized(
  '고객에게는 존댓말을 쓰고 인계에는 필요한 정보만 남겨요. 개인정보나 민감한 내용은 승인된 경로 밖으로 공유하지 않아요.',
  'Mijoz bilan hurmatli uslubda gapiring va topshirishda faqat kerakli ma’lumotni qoldiring; shaxsiy yoki maxfiy ma’lumotni tasdiqlanmagan yo‘l bilan ulashmang.',
  'Use polite speech with customers and leave only necessary handoff details; do not share personal or sensitive information outside approved channels.',
  'С клиентами говорите вежливо и передавайте только необходимые сведения; не сообщайте личные или конфиденциальные данные вне разрешённых каналов.',
);

const SCHEDULE_CONTEXT = localized(
  '근무표·교대·지각이나 결근 가능성·휴식과 근무 변경을 관리자와 확인할 때 사용해요.',
  'Jadval, smena almashuvi, kechikish yoki kelolmaslik, tanaffus va ish o‘zgarishini rahbar bilan aniqlashda ishlatiladi.',
  'Use this to confirm schedules, shift swaps, possible lateness or absence, breaks, and work changes with a manager.',
  'Используйте для уточнения графика, обмена сменами, возможного опоздания или отсутствия, перерывов и изменений с руководителем.',
);
const SCHEDULE_USAGE = localized(
  '근무·교대·휴식 기준은 회사와 계약, 지역 규정에 따라 다를 수 있으므로 고정 수치를 단정하지 말고 공식 절차로 확인해요.',
  'Ish, smena va tanaffus qoidalari kompaniya, shartnoma va hududga qarab farq qiladi; aniq sonni taxmin qilmay, rasmiy tartibdan tekshiring.',
  'Work, shift, and break rules vary by company, contract, and local rules; do not state fixed numbers and verify through official procedures.',
  'Правила работы, смен и перерывов зависят от компании, договора и региона; не утверждайте фиксированные нормы и проверяйте официально.',
);

const ISSUE_CONTEXT = localized(
  '업무 진행 상황과 실수·장비 이상·안전 위험을 사실대로 즉시 보고하고 다음 조치를 확인할 때 사용해요.',
  'Ish jarayoni, xato, uskuna nosozligi yoki xavfni fakt bilan darhol bildirish va keyingi chorani aniqlashda ishlatiladi.',
  'Use this to promptly report progress, mistakes, equipment problems, or safety hazards and confirm the next action.',
  'Используйте для немедленного сообщения о ходе работы, ошибке, неисправности или опасности и уточнения следующих действий.',
);
const ISSUE_USAGE = localized(
  '위험하거나 장비가 이상하면 작업을 멈추고 다시 작동시키지 말며 관리자나 안전 담당자의 확인을 받아요.',
  'Xavf yoki uskuna nosozligi bo‘lsa ishni to‘xtating, uni qayta yoqmang va rahbar yoki xavfsizlik mas’ulidan tekshiruv oling.',
  'If work is unsafe or equipment is abnormal, stop the task, do not restart it, and check with a manager or safety officer.',
  'При опасности или неисправности остановите работу, не запускайте оборудование снова и обратитесь к руководителю или специалисту по безопасности.',
);

const FEEDBACK_SECURITY_CONTEXT = localized(
  '피드백·업무량·역할 범위와 급여·계약 서류를 확인하고 개인정보와 업무 계정을 안전하게 다룰 때 사용해요.',
  'Fikr-mulohaza, ish hajmi, vazifa chegarasi, ish haqi va shartnoma hujjatini tekshirib, shaxsiy ma’lumot va hisobni xavfsiz boshqarishda ishlatiladi.',
  'Use this to discuss feedback, workload, role boundaries, pay and contract documents, and to protect personal data and work accounts.',
  'Используйте для обсуждения обратной связи, нагрузки, границ роли, документов об оплате и договоре и защиты данных и рабочих аккаунтов.',
);
const FEEDBACK_SECURITY_USAGE = localized(
  '급여·계약·근무 조건은 회사 문서와 계약, 지역 규정을 확인하고 비밀번호·인증번호는 누구와도 공유하지 않아요.',
  'Ish haqi, shartnoma va sharoitni kompaniya hujjati, shartnoma va hududiy qoidalar bilan tekshiring; parol va tasdiqlash kodini hech kimga bermang.',
  'Verify pay, contracts, and work conditions against company documents, the contract, and local rules; never share passwords or verification codes.',
  'Проверяйте оплату, договор и условия по документам компании, договору и местным правилам; никому не сообщайте пароли и коды подтверждения.',
);

function rows(
  data: readonly ExpressionDraftRow[],
  context: ReturnType<typeof localized>,
  speaker: ReturnType<typeof localized>,
  usageNote: ReturnType<typeof localized>,
) {
  return expressionDrafts(data, { context, speaker, usageNote });
}

function buildTalkingAtWorkAndPartTimeJobsTopic() {
  // prettier-ignore
  return defineExpressionTopic({
    code: 'talking-at-work-and-part-time-jobs',
    title: localized(
      '직장과 아르바이트에서 대화하기',
      'Ish va yarim stavkali ishda suhbatlashish',
      'Talking at work and part-time jobs',
      'Общение на работе и подработке',
    ),
    description: localized(
      '업무 시작과 지시·인계·근무표를 확인하고, 진행·실수·안전 문제를 보고하며, 피드백과 계약·계정 보안을 다뤄요.',
      'Ish boshlash, topshiriq, topshirish va jadvalni aniqlang, jarayon, xato va xavfni bildiring hamda fikr, shartnoma va hisob xavfsizligini muhokama qiling.',
      'Confirm work starts, instructions, handoffs, and schedules; report progress, mistakes, and hazards; and discuss feedback, contracts, and account security.',
      'Уточняйте начало работы, поручения, передачу дел и график; сообщайте о ходе, ошибках и рисках; обсуждайте обратную связь, договоры и безопасность аккаунтов.',
    ),
    order: 21,
    placement: { section: 1, unit: 21 },
    difficulty: 3,
    nodes: [
      {
        code: 'start-and-finish-work',
        title: localized(
          '출근하고 기본 담당 확인하기',
          'Ishga kelib, asosiy vazifani aniqlash',
          'Arriving and confirming basic duties',
          'Приход на работу и уточнение основных обязанностей',
        ),
        description: localized(
          '출근과 업무 시작을 알리고 오늘 담당할 구역과 업무, 마감·퇴근 전 확인 사항을 주고받아요.',
          'Ishga kelish va boshlashni ayting, bugungi hudud va vazifa hamda yopilishdan oldingi tekshiruvni aniqlang.',
          'Announce arrival and starting work, then confirm today’s area, duties, closing tasks, and checks before leaving.',
          'Сообщайте о приходе и начале работы, уточняйте участок, обязанности, закрытие и проверки перед уходом.',
        ),
        icon: 'briefcase-outline',
        proficiency: ExpressionProficiency.BEGINNER,
        expressions: [
          ...rows([
            ['arrived-at-work', '출근했습니다.', 'chulgeunhaetseumnida', '직장에 출근했음을 알리는 말', 'Ishga kelganini aytish', 'I have arrived for work.', 'Я пришёл (пришла) на работу.'],
            ['ask-todays-assignment', '오늘 맡은 업무가 무엇인지 확인하고 싶습니다.', 'oneul mateun eommuga mueosinji hwaginhago sipseumnida', '오늘 맡은 업무를 확인하고 싶다고 말하는 표현', 'Bugungi vazifani aniqlashni aytish', 'I would like to confirm my assignment for today.', 'Я хотел(а) бы уточнить своё задание на сегодня.'],
            ['ask-start-with-area', '이 구역부터 정리하면 될까요?', 'i guyeokbuteo jeongrihamyeon doelkkayo', '어느 구역부터 정리할지 확인하는 말', 'Shu hududdan tartibga keltirishni boshlashni so‘rash', 'Should I start by organizing this area?', 'Мне начать с уборки этой зоны?'],
            ['announce-starting-work', '지금 업무를 시작하겠습니다.', 'jigeum eommureul sijakhagetseumnida', '지금 업무를 시작하겠다고 알리는 말', 'Hozir ishni boshlashini aytish', 'I will start work now.', 'Я приступаю к работе.'],
            ['confirm-register-assignment', '제 담당은 계산대가 맞나요?', 'je damdangeun gyesandaega mannayo', '계산대가 자신의 담당인지 확인하는 말', 'Kassa o‘z vazifasi ekanini so‘rash', 'Am I assigned to the register?', 'Я сегодня отвечаю за кассу?'],
            ['assigned-work-finished', '맡은 일은 모두 끝냈습니다.', 'mateun ireun modu kkeutnaetseumnida', '맡은 업무를 모두 끝냈다고 보고하는 말', 'Berilgan ish tugaganini aytish', 'I have finished all my assigned work.', 'Я закончил(а) все порученные задания.'],
            ['ask-before-leaving', '퇴근 전에 확인할 일이 있나요?', 'toegeun jeone hwaginhal iri innayo', '퇴근 전에 더 확인할 일이 있는지 묻는 말', 'Ketishdan oldin tekshiriladigan ishni so‘rash', 'Is there anything I should check before leaving?', 'Нужно ли что-то проверить перед уходом?'],
            ['starting-work-casual', '나 먼저 업무 시작할게.', 'na meonjeo eommu sijakhalge', '친한 동료에게 먼저 업무를 시작한다고 말하는 표현', 'Yaqin hamkasbga ishni avval boshlashini aytish', 'I will start working first.', 'Я начну работу первым (первой).', ExpressionSpeechLevel.CASUAL, CLOSE_COWORKER],
          ], START_CONTEXT, WORKER, START_USAGE),
          ...rows([
            ['assign-display-work', '오늘은 진열 업무를 맡아 주세요.', 'oneureun jinyeol eommureul mata juseyo', '오늘 진열 업무를 맡으라고 안내하는 말', 'Bugun tovar joylashtirish vazifasini berish', 'Please handle product display today.', 'Сегодня займитесь выкладкой товара.'],
            ['check-attendance-record', '먼저 출근 기록을 확인해 주세요.', 'meonjeo chulgeun girogeul hwaginhae juseyo', '출근 기록을 먼저 확인하라고 안내하는 말', 'Avval kelish qaydini tekshirishni aytish', 'Please check your attendance record first.', 'Сначала проверьте отметку о приходе.'],
            ['check-ready-before-start', '업무 시작 전에 준비 상태를 확인해요.', 'eommu sijak jeone junbi sangtaereul hwaginhaeyo', '업무 전에 준비 상태를 확인하라는 말', 'Ishdan oldin tayyorgarlikni tekshirishni aytish', 'Check that everything is ready before starting work.', 'Перед началом работы проверьте готовность.'],
            ['shared-area-assignment', '이 구역은 두 사람이 함께 담당합니다.', 'i guyeogeun du sarami hamkke damdanghamnida', '구역을 두 사람이 함께 담당한다고 안내하는 말', 'Hududga ikki kishi birga mas’ul ekanini aytish', 'Two people are assigned to this area together.', 'За эту зону отвечают два человека вместе.'],
            ['report-before-closing', '마감 전에 작업 내역을 알려 주세요.', 'magam jeone jageop naeyeogeul allyeo juseyo', '마감 전에 작업 내역 보고를 요청하는 말', 'Yopilishdan oldin bajarilgan ishni aytishni so‘rash', 'Please report what was done before closing.', 'Перед закрытием сообщите, что было сделано.'],
            ['work-finished-for-today', '오늘 업무는 여기까지입니다.', 'oneul eommuneun yeogikkajimnida', '오늘 업무가 끝났다고 안내하는 말', 'Bugungi ish tugaganini aytish', 'That is all for today’s work.', 'На сегодня работа закончена.'],
            ['return-items-before-leaving', '퇴근 전에 사용한 물품을 제자리에 놓아 주세요.', 'toegeun jeone sayonghan mulpumeul jejarie noa juseyo', '퇴근 전에 물품을 제자리에 두라고 안내하는 말', 'Ketishdan oldin buyumni joyiga qo‘yishni aytish', 'Please return the items you used before leaving.', 'Перед уходом верните использованные вещи на место.'],
          ], START_CONTEXT, MANAGER_OR_COWORKER, START_USAGE),
        ],
      },
      {
        code: 'reconfirm-instructions-and-priorities',
        title: localized(
          '업무 지시와 순서·우선순위 재확인하기',
          'Topshiriq, tartib va ustuvorlikni qayta aniqlash',
          'Reconfirming instructions, sequence, and priority',
          'Уточнение поручений, порядка и приоритетов',
        ),
        description: localized(
          '무엇을 먼저 할지, 지시한 순서와 물품 위치가 맞는지 다시 묻고 다음 업무로 넘어가는 시점을 확인해요.',
          'Nimani avval qilish, tartib va buyum joyi to‘g‘riligini qayta so‘rang va keyingi ishga o‘tish vaqtini aniqlang.',
          'Ask what comes first, reconfirm the sequence and item locations, and check when to move to the next task.',
          'Уточняйте, что делать сначала, порядок и место вещей и когда переходить к следующей задаче.',
        ),
        icon: 'list-outline',
        proficiency: ExpressionProficiency.BEGINNER,
        expressions: [
          ...rows([
            ['ask-what-first', '어떤 일을 먼저 하면 될까요?', 'eotteon ireul meonjeo hamyeon doelkkayo', '먼저 해야 할 업무를 묻는 말', 'Qaysi ishni avval qilishni so‘rash', 'Which task should I do first?', 'Какую задачу мне выполнить сначала?'],
            ['ask-repeat-sequence', '이 업무 순서를 다시 설명해 주실 수 있나요?', 'i eommu sunseoreul dasi seolmyeonghae jusil su innayo', '업무 순서를 다시 설명해 달라고 요청하는 말', 'Ish tartibini qayta tushuntirishni so‘rash', 'Could you explain the task sequence again?', 'Можете ещё раз объяснить порядок работы?'],
            ['ask-highest-priority', '오늘 가장 급한 업무가 무엇인가요?', 'oneul gajang geupan eommuga mueosingayo', '오늘 가장 우선인 업무를 묻는 말', 'Bugungi eng shoshilinch vazifani so‘rash', 'What is the most urgent task today?', 'Какая задача сегодня самая срочная?'],
            ['ask-item-location', '이 물품은 어디에 보관하나요?', 'i mulpumeun eodie bogwanhanayo', '물품 보관 위치를 묻는 말', 'Buyum qayerda saqlanishini so‘rash', 'Where is this item stored?', 'Где хранится этот предмет?'],
            ['confirm-understood-order', '제가 이해한 순서가 맞는지 확인해 주세요.', 'jega ihaehan sunseoga manneunji hwaginhae juseyo', '이해한 업무 순서가 맞는지 확인을 요청하는 말', 'Tushunilgan tartib to‘g‘riligini tekshirishni so‘rash', 'Please check whether I understood the order correctly.', 'Проверьте, правильно ли я понял(а) порядок.'],
            ['ask-when-start-next-task', '이 일을 끝낸 뒤 다음 업무를 시작하면 될까요?', 'i ireul kkeutnaen dwi daeum eommureul sijakhamyeon doelkkayo', '현재 업무 뒤 다음 일을 시작할지 묻는 말', 'Bu ish tugagach keyingisini boshlashni so‘rash', 'Should I start the next task after finishing this one?', 'После этой задачи мне начать следующую?'],
            ['check-tools-ready', '필요한 도구가 모두 준비됐나요?', 'piryohan doguga modu junbidwaennayo', '필요한 도구가 모두 준비됐는지 확인하는 말', 'Kerakli asboblar tayyorligini so‘rash', 'Are all the necessary tools ready?', 'Все необходимые инструменты готовы?'],
          ], INSTRUCTION_CONTEXT, WORKER, INSTRUCTION_USAGE),
          ...rows([
            ['check-order-list-first', '먼저 주문 목록을 확인해 주세요.', 'meonjeo jumun mongnogeul hwaginhae juseyo', '주문 목록을 먼저 확인하라는 지시', 'Avval buyurtma ro‘yxatini tekshirishni aytish', 'Please check the order list first.', 'Сначала проверьте список заказов.'],
            ['organize-storage-next', '이 일을 끝낸 다음에 창고를 정리해 주세요.', 'i ireul kkeutnaen daeume changgoreul jeongrihae juseyo', '현재 업무 뒤 창고 정리를 지시하는 말', 'Bu ish tugagach omborni tartibga keltirishni aytish', 'After this task, please organize the storage area.', 'После этой задачи приведите в порядок склад.'],
            ['prioritize-customer-request', '지금은 고객 요청을 우선해 주세요.', 'jigeumeun gogaek yocheongeul useonhae juseyo', '고객 요청을 먼저 처리하라는 지시', 'Hozir mijoz so‘rovini ustun qo‘yishni aytish', 'Please prioritize the customer’s request now.', 'Сейчас сначала займитесь запросом клиента.'],
            ['cleaning-tools-location', '청소 도구는 창고 오른쪽에 있어요.', 'cheongso doguneun changgo oreunjjoge isseoyo', '청소 도구의 위치를 안내하는 말', 'Tozalash asbobi omborning o‘ng tomonida ekanini aytish', 'The cleaning tools are on the right side of the storage area.', 'Инвентарь для уборки находится справа на складе.'],
            ['ask-before-unclear-task', '모르는 부분은 시작 전에 다시 물어보세요.', 'moreuneun bubuneun sijak jeone dasi mureoboseyo', '모르는 부분을 시작 전에 다시 묻도록 안내하는 말', 'Tushunarsiz joyni boshlashdan oldin so‘rashni aytish', 'Ask again before starting if anything is unclear.', 'Переспросите до начала, если что-то непонятно.'],
            ['note-task-sequence', '작업 순서를 메모해도 좋아요.', 'jageop sunseoreul memohaedo joayo', '업무 순서를 메모해도 된다고 안내하는 말', 'Ish tartibini yozib olish mumkinligini aytish', 'You may write down the task sequence.', 'Можно записать порядок работы.'],
            ['return-item-after-use', '이 물품은 사용 후 원래 자리에 놓아 주세요.', 'i mulpumeun sayong hu wonrae jarie noa juseyo', '사용 후 물품을 원래 자리에 두라는 지시', 'Buyumni ishlatgach joyiga qo‘yishni aytish', 'Please return this item to its original place after use.', 'После использования верните этот предмет на место.'],
            ['check-this-first-casual', '이거 먼저 확인해 줘.', 'igeo meonjeo hwaginhae jwo', '친한 동료에게 먼저 확인해 달라고 하는 말', 'Yaqin hamkasbdan avval shuni tekshirishni so‘rash', 'Check this first, please.', 'Сначала проверь это.', ExpressionSpeechLevel.CASUAL, CLOSE_COWORKER],
          ], INSTRUCTION_CONTEXT, MANAGER_OR_COWORKER, INSTRUCTION_USAGE),
        ],
      },
      {
        code: 'assist-and-hand-over-work',
        title: localized(
          '동료·고객 응대하고 업무 인계하기',
          'Hamkasb yoki mijozga yordam berib, ishni topshirish',
          'Assisting coworkers or customers and handing work over',
          'Обслуживание коллег или клиентов и передача дел',
        ),
        description: localized(
          '고객 요청을 확인하고 담당자를 연결하며, 처리 내용과 남은 일을 기록해 다음 근무자에게 정확히 인계해요.',
          'Mijoz so‘rovini aniqlab, mas’ulga ulang va bajarilgan hamda qolgan ishni yozib keyingi xodimga aniq topshiring.',
          'Confirm customer requests, connect the person in charge, record completed and remaining work, and hand it over accurately.',
          'Уточняйте запрос клиента, связывайте с ответственным, записывайте выполненное и оставшееся и точно передавайте смене.',
        ),
        icon: 'people-circle-outline',
        proficiency: ExpressionProficiency.INTERMEDIATE,
        expressions: [
          ...rows([
            ['offer-customer-help', '어서 오세요. 무엇을 도와드릴까요?', 'eoseo oseyo mueoseul dowadeurilkkayo', '고객에게 필요한 도움을 묻는 말', 'Mijozdan qanday yordam kerakligini so‘rash', 'Welcome. How may I help you?', 'Добро пожаловать. Чем я могу вам помочь?'],
            ['pass-request-to-person-in-charge', '요청하신 내용을 담당자에게 전달하겠습니다.', 'yocheonghasin naeyongeul damdangjaege jeondalhagetseumnida', '고객 요청을 담당자에게 전달하겠다는 말', 'So‘rovni mas’ul xodimga yetkazishini aytish', 'I will pass your request to the person in charge.', 'Я передам ваш запрос ответственному сотруднику.'],
            ['connect-person-in-charge', '잠시만 기다리시면 담당자를 연결해 드릴게요.', 'jamsiman gidarisimyeon damdangjareul yeongyeolhae deurilgeyo', '잠시 뒤 담당자를 연결하겠다는 말', 'Biroz kutsa mas’ul xodimga ulashini aytish', 'If you wait a moment, I will connect you with the person in charge.', 'Подождите немного, и я соединю вас с ответственным сотрудником.'],
            ['handover-to-next-worker', '이 업무는 다음 근무자에게 인계하겠습니다.', 'i eommuneun daeum geunmujagege ingyehagetseumnida', '업무를 다음 근무자에게 인계하겠다는 말', 'Ishni keyingi xodimga topshirishini aytish', 'I will hand this task over to the next worker.', 'Я передам эту задачу следующему сотруднику.'],
            ['recorded-customer-inquiry', '고객 문의 내용은 여기에 기록했습니다.', 'gogaek munui naeyongeun yeogie girokhaetseumnida', '고객 문의를 기록했다고 알리는 말', 'Mijoz murojaati yozilganini aytish', 'I recorded the customer’s inquiry here.', 'Я записал(а) обращение клиента здесь.'],
            ['check-scope-before-handling', '제가 처리할 수 있는 범위를 확인해 보겠습니다.', 'jega cheorihal su inneun beomwireul hwaginhae bogetseumnida', '자신이 처리 가능한 범위를 확인하겠다는 말', 'O‘zi hal qila oladigan doirani tekshirishni aytish', 'I will check what I am authorized to handle.', 'Я проверю, что входит в мои полномочия.'],
            ['brief-coworker-before-leaving', '동료에게 진행 상황을 설명하고 갈게요.', 'dongnyoege jinhaeng sanghwangeul seolmyeonghago galgeyo', '떠나기 전 동료에게 진행 상황을 설명하겠다는 말', 'Ketishdan oldin hamkasbga jarayonni tushuntirishni aytish', 'I will brief my coworker on the progress before I leave.', 'Перед уходом я объясню коллеге текущую ситуацию.'],
            ['take-over-customer-case-casual', '이 고객 건은 내가 이어서 맡을게.', 'i gogaek geoneun naega ieoseo mateulge', '친한 동료에게 고객 건을 이어서 맡겠다고 하는 말', 'Yaqin hamkasbga mijoz ishini davom ettirishini aytish', 'I will take over this customer case.', 'Я продолжу работу с этим клиентом.', ExpressionSpeechLevel.CASUAL, CLOSE_COWORKER],
          ], HANDOFF_CONTEXT, WORKER, HANDOFF_USAGE),
          ...rows([
            ['take-over-customer-inquiry', '이 고객 문의를 이어서 맡아 주세요.', 'i gogaek munuireul ieoseo mata juseyo', '고객 문의를 이어서 맡아 달라는 말', 'Mijoz murojaatini davom ettirishni so‘rash', 'Please take over this customer inquiry.', 'Пожалуйста, продолжите работу с обращением клиента.'],
            ['include-remaining-work-in-handoff', '인계할 때 남은 일을 함께 알려 주세요.', 'ingyehal ttae nameun ireul hamkke allyeo juseyo', '인계할 때 남은 업무도 알려 달라는 말', 'Topshirishda qolgan ishni ham aytishni so‘rash', 'Please include the remaining work in the handoff.', 'При передаче сообщите также об оставшейся работе.'],
            ['check-basics-until-owner-arrives', '담당자가 올 때까지 기본 내용을 확인해 주세요.', 'damdangjaga ol ttaekkaji gibon naeyongeul hwaginhae juseyo', '담당자가 올 때까지 기본 내용을 확인하라는 말', 'Mas’ul kelguncha asosiy ma’lumotni tekshirishni aytish', 'Please confirm the basic details until the person in charge arrives.', 'До прихода ответственного уточните основные сведения.'],
            ['share-only-needed-customer-data', '고객 정보는 필요한 범위만 공유해 주세요.', 'gogaek jeongboneun piryohan beomwiman gongyuhae juseyo', '고객 정보를 필요한 범위에서만 공유하라는 말', 'Mijoz ma’lumotini faqat kerakli doirada ulashishni aytish', 'Share customer information only as needed.', 'Передавайте данные клиента только в необходимом объёме.'],
            ['record-unresolved-request', '처리하지 못한 요청은 기록으로 남겨 주세요.', 'cheorihaji motan yocheongeun girogeuro namgyeo juseyo', '처리하지 못한 요청을 기록하라는 말', 'Hal qilinmagan so‘rovni yozib qoldirishni aytish', 'Please leave a record of any unresolved request.', 'Зафиксируйте запрос, который не удалось обработать.'],
            ['identify-person-in-charge', '이 업무의 담당자는 김 대리님입니다.', 'i eommuui damdangjaneun gim daerinimnida', '업무 담당자가 누구인지 알려 주는 말', 'Vazifa mas’ulini aytish', 'Assistant Manager Kim is in charge of this task.', 'За эту задачу отвечает заместитель Ким.'],
            ['tell-customer-will-confirm', '고객에게 확인 후 다시 안내해 드리겠다고 말해 주세요.', 'gogaegege hwagin hu dasi annaehae deurigetseumnidago malhae juseyo', '고객에게 확인 뒤 다시 안내한다고 전달하게 하는 말', 'Mijozga tekshiruvdan keyin yana ma’lumot berilishini aytish', 'Please tell the customer we will confirm and update them.', 'Скажите клиенту, что мы проверим и снова сообщим результат.'],
          ], HANDOFF_CONTEXT, MANAGER_OR_COWORKER, HANDOFF_USAGE),
        ],
      },
      {
        code: 'confirm-schedules-shifts-and-absence',
        title: localized(
          '근무표·교대·지각·결근과 휴식 확인하기',
          'Jadval, smena, kechikish, kelolmaslik va tanaffusni aniqlash',
          'Confirming schedules, shifts, lateness, absence, and breaks',
          'Уточнение графика, смен, опоздания, отсутствия и перерывов',
        ),
        description: localized(
          '근무표 변경과 교대 가능성을 확인하고, 지각이나 출근 곤란을 미리 알리며 휴식 기준을 공식 절차로 물어요.',
          'Jadval va smena almashuvini aniqlang, kechikish yoki kelolmaslikni oldindan bildiring va tanaffus qoidalarini rasmiy so‘rang.',
          'Confirm schedule changes and shift swaps, report possible lateness or absence early, and ask about break rules through official procedures.',
          'Уточняйте изменения и обмен сменами, заранее сообщайте об опоздании или отсутствии и официально спрашивайте о перерывах.',
        ),
        icon: 'calendar-outline',
        proficiency: ExpressionProficiency.INTERMEDIATE,
        expressions: [
          ...rows([
            ['ask-next-week-schedule', '다음 주 근무표를 확인하고 싶어요.', 'daeum ju geunmupyoreul hwaginhago sipeoyo', '다음 주 근무표를 확인하고 싶다고 말하는 표현', 'Keyingi hafta jadvalini tekshirishni aytish', 'I would like to check next week’s schedule.', 'Я хотел(а) бы проверить график на следующую неделю.'],
            ['confirm-changed-hours', '제 근무 시간이 바뀌었는지 확인해 주세요.', 'je geunmu sigani bakkwieonneunji hwaginhae juseyo', '근무 시간이 변경됐는지 확인을 요청하는 말', 'Ish vaqti o‘zgarganini tekshirishni so‘rash', 'Please check whether my work hours changed.', 'Проверьте, изменилось ли моё рабочее время.'],
            ['check-swap-with-manager', '교대가 가능한지 먼저 관리자에게 확인할게요.', 'gyodaega ganeunghanji meonjeo gwanrijaege hwaginhalgeyo', '교대 가능 여부를 관리자에게 확인하겠다는 말', 'Smena almashuvini avval rahbar bilan tekshirishni aytish', 'I will first check with the manager whether a shift swap is possible.', 'Сначала я уточню у руководителя, возможен ли обмен сменами.'],
            ['notify-possible-lateness', '출근이 늦어질 것 같아 미리 연락드립니다.', 'chulgeuni neujeojil geot gata miri yeollakdeurimnida', '지각 가능성을 미리 알리는 말', 'Kechikish ehtimolini oldindan bildirish', 'I am contacting you in advance because I may be late.', 'Предупреждаю заранее, что могу опоздать.'],
            ['ask-adjustment-for-absence', '오늘 출근하기 어려워서 근무 조정이 가능한지 문의드립니다.', 'oneul chulgeunhagi eoryeowoseo geunmu jojeongi ganeunghanji munuideurimnida', '오늘 출근이 어려워 근무 조정을 문의하는 말', 'Bugun kelish qiyinligi sabab ishni o‘zgartirishni so‘rash', 'I may be unable to come in today, so I am asking whether my shift can be adjusted.', 'Сегодня мне трудно выйти на работу, поэтому уточняю, можно ли изменить смену.'],
            ['ask-break-time-and-place', '휴식 시간과 장소를 확인하고 싶어요.', 'hyusik sigangwa jangsoreul hwaginhago sipeoyo', '휴식 시간과 장소를 확인하고 싶다고 말하는 표현', 'Tanaffus vaqti va joyini tekshirishni aytish', 'I would like to confirm the break time and location.', 'Я хотел(а) бы уточнить время и место перерыва.'],
            ['request-written-schedule-change', '근무표 변경 내용을 서면으로 받을 수 있을까요?', 'geunmupyo byeongyeong naeyongeul seomyeoneuro badeul su isseulkkayo', '근무표 변경을 서면으로 요청하는 말', 'Jadval o‘zgarishini yozma olishni so‘rash', 'Could I receive the schedule change in writing?', 'Можно получить изменение графика в письменном виде?'],
          ], SCHEDULE_CONTEXT, WORKER, SCHEDULE_USAGE),
          ...rows([
            ['schedule-change-after-check', '근무표 변경은 확인 후 알려 드릴게요.', 'geunmupyo byeongyeongeun hwagin hu allyeo deurilgeyo', '확인 뒤 근무표 변경을 알려 주겠다는 말', 'Tekshiruvdan keyin jadval o‘zgarishini aytish', 'I will let you know about the schedule change after checking.', 'После проверки я сообщу об изменении графика.'],
            ['confirm-approval-before-swap', '교대 전에는 담당자의 승인을 확인해 주세요.', 'gyodae jeoneneun damdangjaui seungineul hwaginhae juseyo', '교대 전 담당자 승인을 확인하라는 말', 'Smena almashishdan oldin mas’ul tasdig‘ini tekshirishni aytish', 'Please confirm approval from the person in charge before swapping shifts.', 'Перед обменом сменами подтвердите согласование ответственного.'],
            ['report-lateness-officially', '지각이나 결근은 정해진 연락 방법으로 알려 주세요.', 'jigagina gyeolgeuneun jeonghaejin yeollak bangbeobeuro allyeo juseyo', '지각이나 결근을 공식 연락 방법으로 알리라는 말', 'Kechikish yoki kelolmaslikni belgilangan usulda aytish', 'Report lateness or absence through the designated contact method.', 'Сообщайте об опоздании или отсутствии установленным способом.'],
            ['verify-break-rules', '휴식 기준은 회사 규정과 근무 조건을 확인해 주세요.', 'hyusik gijuneun hoesa gyujeonggwa geunmu jogeoneul hwaginhae juseyo', '휴식 기준을 회사 규정과 조건에서 확인하라는 말', 'Tanaffus qoidasini kompaniya va ish shartidan tekshirishni aytish', 'Check the company rules and work conditions for break requirements.', 'Проверьте правила компании и условия работы по поводу перерывов.'],
            ['check-official-schedule', '변경된 근무 시간은 공식 일정표에서 확인해 주세요.', 'byeongyeongdoen geunmu siganeun gongsik iljeongpyoeseo hwaginhae juseyo', '변경된 시간을 공식 일정표에서 확인하라는 말', 'O‘zgargan vaqtni rasmiy jadvaldan tekshirishni aytish', 'Check the changed work hours in the official schedule.', 'Проверьте изменённое рабочее время в официальном графике.'],
            ['share-handoff-after-replacement', '대체 근무자가 정해지면 인계 내용을 공유해 주세요.', 'daeche geunmujaga jeonghaejimyeon ingye naeyongeul gongyuhae juseyo', '대체 근무자가 정해지면 인계 내용을 공유하라는 말', 'O‘rinbosar belgilangach topshirish ma’lumotini ulashishni aytish', 'Share the handoff details once a replacement worker is confirmed.', 'Когда определят замену, передайте информацию по смене.'],
            ['share-only-needed-personal-details', '개인 사정은 필요한 범위에서만 알려 주셔도 돼요.', 'gaein sajeongeun piryohan beomwieseoman allyeo jusyeodo dwaeyo', '개인 사정을 필요한 범위에서만 말해도 된다는 안내', 'Shaxsiy sababni faqat kerakli doirada aytish mumkinligini bildirish', 'You only need to share personal circumstances as necessary.', 'Личные обстоятельства можно сообщить только в необходимом объёме.'],
            ['ask-shift-swap-casual', '내일 교대 가능해?', 'naeil gyodae ganeunghae', '친한 동료에게 내일 교대 가능한지 묻는 말', 'Yaqin hamkasbdan ertaga smena almashishni so‘rash', 'Can you swap shifts tomorrow?', 'Можешь поменяться сменами завтра?', ExpressionSpeechLevel.CASUAL, CLOSE_COWORKER],
          ], SCHEDULE_CONTEXT, MANAGER_OR_COWORKER, SCHEDULE_USAGE),
        ],
      },
      {
        code: 'report-progress-errors-and-hazards',
        title: localized(
          '진행·실수·장비 문제·안전 위험 보고하기',
          'Jarayon, xato, uskuna muammosi va xavfni bildirish',
          'Reporting progress, mistakes, equipment issues, and hazards',
          'Сообщение о ходе, ошибках, неисправностях и рисках',
        ),
        description: localized(
          '업무 진행과 지연을 알리고 실수와 장비 이상을 숨기지 않으며, 위험한 작업을 멈춘 뒤 관리자에게 보고해요.',
          'Ish jarayoni va kechikishni ayting, xato va nosozlikni yashirmang, xavfli ishni to‘xtatib rahbarga bildiring.',
          'Report progress and delays, disclose mistakes and equipment problems, and stop unsafe work before notifying a manager.',
          'Сообщайте о ходе и задержках, не скрывайте ошибки и неисправности и останавливайте опасную работу до обращения к руководителю.',
        ),
        icon: 'warning-outline',
        proficiency: ExpressionProficiency.ADVANCED,
        expressions: [
          ...rows([
            ['report-half-complete', '현재 작업은 절반 정도 진행됐습니다.', 'hyeonjae jageobeun jeolban jeongdo jinhaengdwaetseumnida', '현재 작업이 절반 정도 진행됐다고 보고하는 말', 'Ish taxminan yarmi bajarilganini aytish', 'The task is about halfway complete.', 'Работа выполнена примерно наполовину.'],
            ['need-more-time', '예상보다 시간이 더 필요합니다.', 'yesangboda sigani deo piryohamnida', '업무에 예상보다 시간이 더 필요하다고 보고하는 말', 'Ish uchun kutilganidan ko‘proq vaqt kerakligini aytish', 'I need more time than expected.', 'Мне нужно больше времени, чем ожидалось.'],
            ['report-quantity-entry-error', '제가 수량을 잘못 입력해서 바로 수정 요청을 드립니다.', 'jega suryangeul jalmot ibryeokhaeseo baro sujeong yocheongeul deurimnida', '수량 입력 실수를 즉시 보고하고 수정 요청하는 말', 'Miqdor noto‘g‘ri kiritilganini darhol bildirib, tuzatishni so‘rash', 'I entered the quantity incorrectly and am requesting a correction immediately.', 'Я неверно ввёл (ввела) количество и сразу прошу исправить.'],
            ['stopped-abnormal-equipment', '장비에서 이상한 소리가 나서 사용을 멈췄습니다.', 'jangbieseo isanghan soriga naseo sayongeul meomchwotseumnida', '장비 이상 소리로 사용을 멈췄다고 보고하는 말', 'Uskunada g‘alati ovoz bo‘lgani uchun to‘xtatilganini aytish', 'I stopped using the equipment because it made an unusual sound.', 'Я прекратил(а) пользоваться оборудованием из-за необычного звука.'],
            ['report-slippery-floor', '바닥이 미끄러워서 안전 조치가 필요합니다.', 'badagi mikkeureowoseo anjeon jochiga piryohamnida', '미끄러운 바닥에 안전 조치가 필요하다고 보고하는 말', 'Sirpanchiq pol uchun xavfsizlik chorasi kerakligini aytish', 'Safety measures are needed because the floor is slippery.', 'Пол скользкий, необходимы меры безопасности.'],
            ['did-not-start-without-protection', '보호 장비가 없어서 작업을 시작하지 않았습니다.', 'boho jangbiga eopseoseo jageobeul sijakhaji anasseumnida', '보호 장비가 없어 작업을 시작하지 않았다고 보고하는 말', 'Himoya vositasi yo‘qligi sabab ish boshlanmaganini aytish', 'I did not start the task because protective equipment was unavailable.', 'Я не начал(а) работу, потому что не было защитного оборудования.'],
            ['report-unverified-condition', '확인되지 않은 상태라 관리자에게 보고하겠습니다.', 'hwagindoeji aneun sangtaera gwanrijaege bogohagetseumnida', '상태가 확인되지 않아 관리자에게 보고하겠다는 말', 'Holat tekshirilmagani sabab rahbarga xabar berishni aytish', 'The condition is unverified, so I will report it to the manager.', 'Состояние не проверено, поэтому я сообщу руководителю.'],
            ['equipment-strange-stop-casual', '이 장비 이상해. 일단 작업 멈출게.', 'i jangbi isanghae ildan jageop meomchulge', '친한 동료에게 장비 이상으로 작업을 멈추겠다고 말하는 표현', 'Yaqin hamkasbga uskuna nosozligi sabab ishni to‘xtatishini aytish', 'This equipment seems wrong. I will stop the task for now.', 'С этим оборудованием что-то не так. Я пока остановлю работу.', ExpressionSpeechLevel.CASUAL, CLOSE_COWORKER],
          ], ISSUE_CONTEXT, WORKER, ISSUE_USAGE),
          ...rows([
            ['stop-unsafe-work', '위험하다고 느끼면 작업을 즉시 멈추세요.', 'wiheomhadago neukkimyeon jageobeul jeuksi meomchuseyo', '위험하면 작업을 즉시 멈추라고 안내하는 말', 'Xavf sezilsa ishni darhol to‘xtatishni aytish', 'Stop the task immediately if it feels unsafe.', 'Немедленно остановите работу, если она кажется опасной.'],
            ['do-not-restart-equipment', '장비를 다시 켜지 말고 담당자에게 알려 주세요.', 'jangbireul dasi kyeoji malgo damdangjaege allyeo juseyo', '장비를 다시 켜지 말고 보고하라는 말', 'Uskunani qayta yoqmay, mas’ulga aytishni so‘rash', 'Do not turn the equipment back on; notify the person in charge.', 'Не включайте оборудование снова, сообщите ответственному.'],
            ['check-for-injury-first', '안전한 위치에서 다친 사람이 있는지 확인하고 담당자에게 알려 주세요.', 'anjeonhan wichieseo dachin sarami inneunji hwaginhago damdangjaege allyeo juseyo', '안전한 위치에서 부상 여부를 확인하고 보고하라는 말', 'Xavfsiz joydan jarohatlangan kishi borligini tekshirib, mas’ulga aytish', 'From a safe location, check whether anyone is injured and notify the person in charge.', 'Из безопасного места проверьте, есть ли пострадавшие, и сообщите ответственному.'],
            ['report-error-and-current-state', '실수한 내용과 현재 상태를 사실대로 알려 주세요.', 'silsuhan naeyonggwa hyeonjae sangtaereul sasildaero allyeo juseyo', '실수와 현재 상태를 사실대로 보고하게 하는 말', 'Xato va hozirgi holatni fakt bilan aytishni so‘rash', 'Report the mistake and current state accurately.', 'Сообщите об ошибке и текущем состоянии по фактам.'],
            ['avoid-hazard-area', '안전 담당자가 확인할 때까지 위험 구역에 들어가지 마세요.', 'anjeon damdangjaga hwaginhal ttaekkaji wiheom guyeoge deureogaji maseyo', '안전 확인 전 위험 구역에 들어가지 말라는 말', 'Tekshiruvgacha xavfli hududga kirmaslikni aytish', 'Do not enter the hazardous area until the safety officer checks it.', 'Не входите в опасную зону до проверки специалистом по безопасности.'],
            ['review-records-before-correction', '수정 전에 기록과 영향을 확인하겠습니다.', 'sujeong jeone girokkwa yeonghyangeul hwaginhagetseumnida', '수정 전에 기록과 영향을 확인하겠다는 말', 'Tuzatishdan oldin yozuv va ta’sirni tekshirishni aytish', 'I will check the records and impact before making a correction.', 'Перед исправлением я проверю записи и последствия.'],
            ['thank-for-reporting', '보고해 주셔서 감사합니다.', 'bogohae jusyeoseo gamsahamnida', '문제를 보고해 준 것에 감사하는 말', 'Muammoni bildirganiga minnatdorlik aytish', 'Thank you for reporting it.', 'Спасибо, что сообщили.'],
          ], ISSUE_CONTEXT, MANAGER_OR_COWORKER, ISSUE_USAGE),
        ],
      },
      {
        code: 'discuss-feedback-boundaries-and-security',
        title: localized(
          '피드백·업무량·계약과 계정 보안 확인하기',
          'Fikr, ish hajmi, shartnoma va hisob xavfsizligini aniqlash',
          'Discussing feedback, workload, contracts, and account security',
          'Обсуждение обратной связи, нагрузки, договора и безопасности аккаунта',
        ),
        description: localized(
          '업무량과 역할 범위, 피드백 우선순위를 조율하고 급여·계약 서류를 확인하며 개인정보와 계정 정보를 보호해요.',
          'Ish hajmi, vazifa chegarasi va fikr ustuvorligini kelishing, ish haqi va shartnoma hujjatini tekshirib, ma’lumot va hisobni himoya qiling.',
          'Coordinate workload, role boundaries, and feedback priorities; verify pay and contract documents; and protect personal and account information.',
          'Согласовывайте нагрузку, границы роли и приоритеты обратной связи, проверяйте документы об оплате и договоре и защищайте данные и аккаунт.',
        ),
        icon: 'shield-checkmark-outline',
        proficiency: ExpressionProficiency.ADVANCED,
        expressions: [
          ...rows([
            ['adjust-workload-and-deadline', '제 업무량과 마감 일정을 함께 조정하고 싶습니다.', 'je eommuryanggwa magam iljeongeul hamkke jojeonghago sipseumnida', '업무량과 마감 일정을 조정하고 싶다고 말하는 표현', 'Ish hajmi va muddatni birga moslashtirishni aytish', 'I would like to adjust my workload and deadline together.', 'Я хотел(а) бы вместе скорректировать нагрузку и срок.'],
            ['confirm-role-in-writing', '현재 역할 범위를 문서로 확인하고 싶습니다.', 'hyeonjae yeokhal beomwireul munseoro hwaginhago sipseumnida', '현재 역할 범위를 문서로 확인하고 싶다고 말하는 표현', 'Vazifa chegarasini hujjatda tekshirishni aytish', 'I would like to confirm my current role scope in writing.', 'Я хотел(а) бы письменно уточнить границы своей роли.'],
            ['ask-feedback-priority', '받은 피드백 중 우선 적용할 부분이 무엇인가요?', 'badeun pideubaek jung useon jeogyonghal bubuni mueosingayo', '받은 피드백 중 우선순위를 묻는 말', 'Fikr-mulohazadagi ustuvor qismni so‘rash', 'Which part of the feedback should I apply first?', 'Какую часть обратной связи применить в первую очередь?'],
            ['ask-pay-statement-items', '급여 명세서의 항목을 설명해 주실 수 있나요?', 'geubyeo myeongseseoui hangmogeul seolmyeonghae jusil su innayo', '급여 명세서 항목 설명을 요청하는 말', 'Ish haqi hisoboti bandlarini tushuntirishni so‘rash', 'Could you explain the items on my pay statement?', 'Можете объяснить пункты в расчётном листке?'],
            ['ask-contract-copy-location', '계약서 사본을 어디에서 확인할 수 있나요?', 'gyeyakseo saboneul eodieseo hwaginhal su innayo', '계약서 사본 확인 위치를 묻는 말', 'Shartnoma nusxasini qayerdan ko‘rishni so‘rash', 'Where can I access a copy of the contract?', 'Где можно посмотреть копию договора?'],
            ['confirm-needed-personal-data', '이 서류에 필요한 개인정보 범위를 확인하고 싶습니다.', 'i seoryue piryohan gaeinjeongbo beomwireul hwaginhago sipseumnida', '서류에 필요한 개인정보 범위를 확인하고 싶다고 말하는 표현', 'Hujjat uchun zarur shaxsiy ma’lumot doirasini so‘rash', 'I would like to confirm what personal information this document requires.', 'Я хотел(а) бы уточнить, какие персональные данные нужны для этого документа.'],
            ['refuse-share-credentials', '계정 비밀번호나 인증번호는 공유하지 않겠습니다.', 'gyejeong bimilbeonhona injeungbeonhoneun gongyuhaji anketseumnida', '비밀번호와 인증번호를 공유하지 않겠다는 말', 'Parol yoki tasdiqlash kodini bermasligini aytish', 'I will not share my account password or verification code.', 'Я не буду сообщать пароль аккаунта или код подтверждения.'],
          ], FEEDBACK_SECURITY_CONTEXT, WORKER, FEEDBACK_SECURITY_USAGE),
          ...rows([
            ['give-specific-feedback', '피드백은 업무 기준과 구체적인 사례를 중심으로 드릴게요.', 'pideubaegeun eommu gijungwa guchejeogin saryereul jungsimeuro deurilgeyo', '업무 기준과 사례 중심으로 피드백하겠다는 말', 'Fikrni ish mezoni va aniq misol bilan berishni aytish', 'I will base the feedback on work standards and specific examples.', 'Я дам обратную связь на основе рабочих критериев и конкретных примеров.'],
            ['adjust-priority-if-overloaded', '업무량이 너무 많으면 우선순위를 함께 조정하겠습니다.', 'eommuryangi neomu maneumyeon useonsunwireul hamkke jojeonghagetseumnida', '업무량이 많을 때 우선순위를 조정하겠다는 말', 'Ish hajmi juda ko‘p bo‘lsa ustuvorlikni birga moslashtirishni aytish', 'If the workload is too much, we will adjust priorities together.', 'Если нагрузка чрезмерна, мы вместе скорректируем приоритеты.'],
            ['verify-role-change-process', '역할 변경은 합의된 문서와 절차를 확인해 주세요.', 'yeokhal byeongyeongeun habuidoen munseowa jeolchareul hwaginhae juseyo', '역할 변경 시 문서와 절차를 확인하라는 말', 'Vazifa o‘zgarishida hujjat va tartibni tekshirishni aytish', 'For a role change, check the agreed documents and procedure.', 'При изменении роли проверьте согласованные документы и процедуру.'],
            ['verify-pay-and-conditions', '급여와 근무 조건은 계약서·회사 규정·지역 기준을 함께 확인해 주세요.', 'geubyeowa geunmu jogeoneun gyeyakseo hoesa gyujeong jiyeok gijuneul hamkke hwaginhae juseyo', '급여와 근무 조건을 계약과 규정에서 확인하라는 말', 'Ish haqi va sharoitni shartnoma va qoidalardan tekshirishni aytish', 'Verify pay and work conditions against the contract, company rules, and local standards.', 'Проверяйте оплату и условия по договору, правилам компании и местным нормам.'],
            ['enter-sensitive-data-approved-system', '민감한 개인정보는 승인된 시스템에만 입력해 주세요.', 'mingamhan gaeinjeongboneun seungindoen siseutememan ibryeokhae juseyo', '민감정보를 승인된 시스템에만 입력하라는 말', 'Maxfiy ma’lumotni faqat tasdiqlangan tizimga kiritishni aytish', 'Enter sensitive personal information only in an approved system.', 'Вводите конфиденциальные данные только в одобренную систему.'],
            ['never-share-password-code', '비밀번호와 인증번호는 누구에게도 알려 주지 마세요.', 'bimilbeonhowa injeungbeonhoneun nuguegedo allyeo juji maseyo', '비밀번호와 인증번호를 공유하지 말라는 말', 'Parol va tasdiqlash kodini hech kimga bermaslikni aytish', 'Do not share passwords or verification codes with anyone.', 'Никому не сообщайте пароли или коды подтверждения.'],
            ['verify-account-access-request', '계정 접근 요청은 공식 담당 부서에 확인해 주세요.', 'gyejeong jeopgeun yocheongeun gongsik damdang buseoe hwaginhae juseyo', '계정 접근 요청을 공식 부서에 확인하라는 말', 'Hisobga kirish so‘rovini rasmiy bo‘limdan tekshirishni aytish', 'Verify account-access requests with the official department.', 'Проверяйте запросы доступа к аккаунту в официальном отделе.'],
            ['speak-up-if-overloaded-casual', '업무가 너무 많으면 바로 말해 줘.', 'eommuga neomu maneumyeon baro malhae jwo', '친한 동료에게 업무가 많으면 알려 달라고 하는 말', 'Yaqin hamkasbdan ish ko‘p bo‘lsa aytishni so‘rash', 'Tell me right away if the workload is too much.', 'Сразу скажи, если работы слишком много.', ExpressionSpeechLevel.CASUAL, CLOSE_COWORKER],
          ], FEEDBACK_SECURITY_CONTEXT, MANAGER_OR_COWORKER, FEEDBACK_SECURITY_USAGE),
        ],
      },
    ],
  });
}

export const TALKING_AT_WORK_AND_PART_TIME_JOBS_TOPIC =
  buildTalkingAtWorkAndPartTimeJobsTopic();
