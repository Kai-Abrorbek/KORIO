import { TopikSection } from '../../../topik/schemas/topik-content.schema';
import { RecipeSeed, RecipeSeedGrammarSection, t4 } from './recipe-seed.types';
import { RECIPE_READING_03_04 } from './reading-03-04';
import { RECIPE_READING_05_08 } from './reading-05-08';
import { RECIPE_READING_09_12 } from './reading-09-12';
import { RECIPE_READING_13_15 } from './reading-13-15';
import { RECIPE_READING_16_18 } from './reading-16-18';
import { RECIPE_READING_19_20 } from './reading-19-20';
import {
  RECIPE_READING_21_22,
  RECIPE_READING_23_24,
  RECIPE_READING_25_27,
  RECIPE_READING_28_31,
  RECIPE_READING_32_34,
} from './reading-21-34';
import {
  RECIPE_READING_35_38,
  RECIPE_READING_39_41,
  RECIPE_READING_42_43,
  RECIPE_READING_44_45,
  RECIPE_READING_46_47,
  RECIPE_READING_48_50,
} from './reading-35-50';

type StrategyKey =
  | 'grammar'
  | 'topic'
  | 'detail'
  | 'order'
  | 'blank'
  | 'main'
  | 'emotion'
  | 'headline'
  | 'insertion'
  | 'visual'
  | 'response'
  | 'action'
  | 'attitude'
  | 'preceding'
  | 'writing-short'
  | 'writing-data'
  | 'writing-essay';

interface RecipeDefinition {
  code: string;
  section: TopikSection;
  from: number;
  to: number;
  level: number;
  title: ReturnType<typeof t4>;
  strategy: StrategyKey;
  rankings: string[];
  sourceReference: string;
}

const sectionName = {
  [TopikSection.READING]: t4('읽기', "O'qish", 'Reading', 'Чтение'),
  [TopikSection.LISTENING]: t4('듣기', 'Tinglash', 'Listening', 'Аудирование'),
  [TopikSection.WRITING]: t4('쓰기', 'Yozish', 'Writing', 'Письмо'),
};

function labelFor(definition: RecipeDefinition) {
  const section = sectionName[definition.section];
  const range =
    definition.from === definition.to
      ? `${definition.from}`
      : `${definition.from}~${definition.to}`;
  return t4(
    `${section.ko} ${range}번`,
    `${section.uz} ${range}-savol`,
    `${section.en} ${range}`,
    `${section.ru} ${range}`,
  );
}

const STRATEGIES: Record<StrategyKey, ReturnType<typeof t4>[]> = {
  grammar: [
    t4(
      '밑줄이나 빈칸의 앞뒤를 먼저 나누고 문법의 기능을 확인한다.',
      "Avval tagi chizilgan yoki bo'sh joyning oldi-orqasini ajratib, grammatikaning vazifasini aniqlang.",
      'Split the context before and after the underline or blank, then identify the grammar function.',
      'Сначала разделите контекст до и после подчёркнутой части или пропуска и определите функцию грамматики.',
    ),
    t4(
      '기능이 같은 선택지만 남긴 뒤 시제와 결합 형태를 비교한다.',
      'Vazifasi bir xil variantlarni qoldirib, zamon va birikish shaklini solishtiring.',
      'Keep only choices with the same function, then compare tense and attachment form.',
      'Оставьте варианты с той же функцией, затем сравните время и форму присоединения.',
    ),
    t4(
      '문장 전체를 완성해 자연스럽게 읽히는지 마지막으로 확인한다.',
      "Gapni to'liq tuzib, tabiiy eshitilishini oxirida tekshiring.",
      'Complete the whole sentence and make a final naturalness check.',
      'Соберите полное предложение и в конце проверьте естественность.',
    ),
  ],
  topic: [
    t4(
      '반복되는 명사와 행동 동사를 찾아 글의 대상을 한 단어로 정리한다.',
      "Takrorlangan ot va harakat fe'llarini topib, matn mavzusini bitta so'z bilan jamlang.",
      'Find repeated nouns and action verbs, then summarize the subject in one word.',
      'Найдите повторяющиеся существительные и глаголы действия и сведите тему к одному слову.',
    ),
    t4(
      '선택지의 범위가 글보다 너무 넓거나 좁은 것은 지운다.',
      'Matndan juda keng yoki juda tor variantlarni chiqarib tashlang.',
      'Eliminate choices that are broader or narrower than the text.',
      'Исключите варианты, которые шире или уже текста.',
    ),
    t4(
      '제목·첫 문장·마지막 문장을 연결해 같은 방향의 선택지를 고른다.',
      "Sarlavha, birinchi va oxirgi gapni bog'lab, bir yo'nalishdagi javobni tanlang.",
      'Connect the title, first sentence, and last sentence, then choose the option pointing the same way.',
      'Свяжите заголовок, первое и последнее предложения и выберите вариант того же направления.',
    ),
  ],
  detail: [
    t4(
      '선택지를 먼저 읽고 사람·시간·장소·수치·원인을 표시한다.',
      "Avval variantlarni o'qib, shaxs, vaqt, joy, raqam va sababni belgilang.",
      'Read the choices first and mark people, time, place, numbers, and causes.',
      'Сначала прочитайте варианты и отметьте людей, время, место, числа и причины.',
    ),
    t4(
      '지문에서 같은 단어가 아니라 같은 뜻으로 바뀐 표현을 찾는다.',
      "Matndan aynan bir so'zni emas, shu ma'nodagi boshqa ifodani qidiring.",
      'Look for paraphrased meaning rather than the exact same word.',
      'Ищите не то же слово, а перефразированное значение.',
    ),
    t4(
      '한 부분이라도 지문과 다르면 그 선택지는 바로 제외한다.',
      "Variantning bir qismi matnga zid bo'lsa, uni darhol chiqarib tashlang.",
      'Reject a choice as soon as any one detail conflicts with the text.',
      'Сразу исключайте вариант, если хотя бы одна деталь противоречит тексту.',
    ),
  ],
  order: [
    t4(
      '지시어·접속사·포함 조사 때문에 첫 문장이 될 수 없는 문장을 먼저 지운다.',
      "Ko'rsatish so'zi, bog'lovchi yoki qo'shimcha tufayli birinchi bo'la olmaydigan gapni chiqarib tashlang.",
      'First eliminate sentences that cannot open because of demonstratives, connectives, or additive particles.',
      'Сначала исключите предложения, которые не могут быть первыми из-за указателей, союзов или частиц добавления.',
    ),
    t4(
      '새 정보가 다음 문장에서 이미 아는 정보로 이어지는 연결을 찾는다.',
      "Yangi ma'lumot keyingi gapda ma'lum ma'lumotga aylanishini toping.",
      'Find the chain where new information becomes known information in the next sentence.',
      'Найдите цепочку, где новая информация в следующем предложении становится известной.',
    ),
    t4(
      '대명사와 반복 어휘가 가리키는 대상을 확인해 전체 순서를 검증한다.',
      "Olmosh va takrorlangan so'z nimani ko'rsatishini aniqlab, umumiy tartibni tekshiring.",
      'Resolve pronouns and repeated words to verify the full order.',
      'Определите, к чему относятся местоимения и повторы, и проверьте весь порядок.',
    ),
  ],
  blank: [
    t4(
      '빈칸 앞뒤에서 반복되거나 서로 반대되는 표현을 먼저 찾는다.',
      "Bo'sh joy oldi-orqasidagi takror yoki qarama-qarshi ifodani avval toping.",
      'First find repeated or contrasting expressions around the blank.',
      'Сначала найдите повторы или противопоставления вокруг пропуска.',
    ),
    t4(
      '접속사와 조사로 빈칸의 논리 관계를 정한다.',
      "Bog'lovchi va yuklamalar orqali bo'sh joyning mantiqiy aloqasini aniqlang.",
      'Use connectives and particles to determine the blank’s logical relation.',
      'По союзам и частицам определите логическую связь пропуска.',
    ),
    t4(
      '선택지를 넣은 뒤 글 전체의 결론과 어긋나지 않는지 확인한다.',
      "Variantni qo'ygach, matnning umumiy xulosasiga zid emasligini tekshiring.",
      'Insert the choice and verify that it agrees with the passage’s conclusion.',
      'Вставьте вариант и проверьте, согласуется ли он с выводом текста.',
    ),
  ],
  main: [
    t4(
      '반복되거나 강조되는 주장을 찾고 세부 예시는 잠시 지운다.',
      "Takrorlangan yoki ta'kidlangan fikrni topib, misollarni vaqtincha chetga qo'ying.",
      'Find the repeated or emphasized claim and temporarily ignore examples.',
      'Найдите повторяемое или подчёркнутое утверждение и временно отбросьте примеры.',
    ),
    t4(
      '해야 한다·필요하다·좋다처럼 판단을 드러내는 표현을 표시한다.',
      "해야 한다, 필요하다, 좋다 kabi bahoni ko'rsatadigan ifodalarni belgilang.",
      'Mark judgement expressions such as 해야 한다, 필요하다, and 좋다.',
      'Отметьте оценочные выражения вроде 해야 한다, 필요하다 и 좋다.',
    ),
    t4(
      '모든 문장을 가장 넓게 포함하는 선택지를 고른다.',
      'Barcha gaplarni eng keng qamrab oladigan variantni tanlang.',
      'Choose the option that most broadly covers all sentences.',
      'Выберите вариант, который наиболее полно охватывает все предложения.',
    ),
  ],
  emotion: [
    t4(
      '밑줄 앞에서 사건을, 밑줄 뒤에서 인물의 반응을 확인한다.',
      'Tagi chizilgan qism oldidan voqeani, keyin esa qahramon reaksiyasini aniqlang.',
      'Identify the event before the underline and the character’s reaction after it.',
      'Определите событие до подчёркнутого места и реакцию героя после него.',
    ),
    t4(
      '감정이 긍정인지 부정인지 먼저 나눈 뒤 강도를 비교한다.',
      'Avval hissiyot ijobiy yoki salbiyligini ajrating, keyin kuchini solishtiring.',
      'First decide whether the emotion is positive or negative, then compare intensity.',
      'Сначала определите положительность или отрицательность эмоции, затем сравните силу.',
    ),
    t4(
      '행동과 말투가 감정 어휘와 실제로 맞는지 검증한다.',
      "Harakat va ohang hissiyot so'ziga mosligini tekshiring.",
      'Verify that actions and tone genuinely match the emotion word.',
      'Проверьте, действительно ли действия и тон соответствуют слову эмоции.',
    ),
  ],
  headline: [
    t4(
      '제목의 한자어와 비유 표현을 평범한 문장으로 바꾼다.',
      "Sarlavhadagi xitoycha va ko'chma ifodani oddiy gapga aylantiring.",
      'Rewrite Sino-Korean and figurative headline language as an ordinary sentence.',
      'Переформулируйте ханча-лексику и образные выражения заголовка обычным предложением.',
    ),
    t4(
      '상황이 긍정·부정·판단 유보 중 어느 방향인지 결정한다.',
      'Vaziyat ijobiy, salbiy yoki noaniq ekanini aniqlang.',
      'Decide whether the headline is positive, negative, or withholding judgement.',
      'Определите, положителен заголовок, отрицателен или воздерживается от оценки.',
    ),
    t4(
      '원인과 결과의 방향을 바꾸어 놓은 선택지를 조심한다.',
      "Sabab va natija yo'nalishini almashtirgan variantdan ehtiyot bo'ling.",
      'Watch for choices that reverse cause and result.',
      'Остерегайтесь вариантов, меняющих местами причину и следствие.',
    ),
  ],
  insertion: [
    t4(
      '보기 문장의 핵심 명사와 대명사가 처음 등장하는 위치를 찾는다.',
      "Berilgan gapdagi asosiy ot va olmosh birinchi paydo bo'ladigan joyni toping.",
      'Find where the key noun and pronoun in the given sentence first become available.',
      'Найдите место, где впервые появляется опора для ключевого существительного и местоимения.',
    ),
    t4(
      '보기 앞 문장은 원인을, 뒤 문장은 결과나 보충 설명을 제공해야 한다.',
      "Oldingi gap sabab, keyingi gap natija yoki qo'shimcha izoh berishi kerak.",
      'The preceding sentence should supply the cause; the following one should give a result or elaboration.',
      'Предыдущее предложение должно давать причину, следующее — результат или пояснение.',
    ),
    t4(
      '삽입 후 접속사와 시제까지 자연스럽게 이어지는지 다시 읽는다.',
      "Kiritgach, bog'lovchi va zamon tabiiy davom etishini qayta o'qing.",
      'After insertion, reread to check connectives and tense continuity.',
      'После вставки перечитайте и проверьте связки и согласование времени.',
    ),
  ],
  visual: [
    t4(
      '듣기 전에 그림마다 사람·장소·행동의 차이를 빠르게 표시한다.',
      'Tinglashdan oldin har bir rasmdagi shaxs, joy va harakat farqini tez belgilang.',
      'Before listening, quickly mark differences in people, place, and action across the visuals.',
      'До прослушивания быстро отметьте различия в людях, месте и действиях на картинках.',
    ),
    t4(
      '처음 들리는 명사보다 마지막에 확정되는 행동에 집중한다.',
      "Birinchi eshitilgan otdan ko'ra oxirida aniqlanadigan harakatga e'tibor bering.",
      'Focus on the action confirmed at the end, not merely the first noun heard.',
      'Сосредоточьтесь на действии, подтверждённом в конце, а не на первом услышанном существительном.',
    ),
    t4(
      '수치 문제는 기준 연도와 증가·감소 방향을 함께 확인한다.',
      "Raqamli savolda asosiy yil va o'sish-pasayish yo'nalishini birga tekshiring.",
      'For data questions, check both the reference period and increase/decrease direction.',
      'В заданиях с числами проверяйте и базовый период, и направление роста или снижения.',
    ),
  ],
  response: [
    t4(
      '마지막 말의 기능이 질문·제안·요청·감사 중 무엇인지 판단한다.',
      'Oxirgi gap savol, taklif, iltimos yoki minnatdorchilik ekanini aniqlang.',
      'Identify whether the final line is a question, suggestion, request, or thanks.',
      'Определите функцию последней реплики: вопрос, предложение, просьба или благодарность.',
    ),
    t4(
      '장소와 두 사람의 관계를 통해 가능한 대답의 범위를 줄인다.',
      'Joy va suhbatdoshlar munosabati orqali mumkin javoblarni qisqartiring.',
      'Use the place and speaker relationship to narrow possible responses.',
      'По месту и отношениям собеседников сузьте круг возможных ответов.',
    ),
    t4(
      '문법적으로 가능해도 상황에 맞지 않으면 정답이 아니다.',
      "Grammatik jihatdan mumkin bo'lsa ham, vaziyatga mos kelmasa javob emas.",
      'A grammatically possible reply is still wrong if it does not fit the situation.',
      'Грамматически возможный ответ неверен, если не подходит ситуации.',
    ),
  ],
  action: [
    t4(
      '대화에서 아직 해결되지 않은 마지막 일을 찾는다.',
      'Suhbatda hali bajarilmagan oxirgi ishni toping.',
      'Find the final task in the dialogue that has not yet been completed.',
      'Найдите последнее дело в диалоге, которое ещё не выполнено.',
    ),
    t4(
      '누가 행동해야 하는지 문제의 주어를 먼저 확인한다.',
      'Kim harakat qilishi kerakligini savol egasidan aniqlang.',
      'Check the subject in the question to determine who must act.',
      'Сначала по субъекту вопроса определите, кто должен действовать.',
    ),
    t4(
      '이미 끝난 행동과 단순 계획은 이어서 할 행동에서 제외한다.',
      'Tugagan ish va oddiy rejani keyingi harakatdan chiqarib tashlang.',
      'Exclude actions already completed and plans that require no immediate action.',
      'Исключите уже выполненные действия и планы без немедленного шага.',
    ),
  ],
  attitude: [
    t4(
      '문제에서 요구하는 화자가 남자인지 여자인지 먼저 표시한다.',
      "Savolda qaysi so'zlovchi so'ralganini avval belgilang.",
      'First mark whether the question asks about the man or the woman.',
      'Сначала отметьте, о каком говорящем — мужчине или женщине — спрашивается.',
    ),
    t4(
      '찬성·반대·우려·기대의 방향을 말투와 근거에서 판단한다.',
      "Rozilik, qarshilik, xavotir yoki umid yo'nalishini ohang va dalildan aniqlang.",
      'Infer agreement, opposition, concern, or expectation from tone and evidence.',
      'По тону и аргументам определите согласие, возражение, тревогу или ожидание.',
    ),
    t4(
      '마지막 결론이 앞의 사례를 어떻게 평가하는지 듣는다.',
      'Oxirgi xulosa oldingi misolni qanday baholashini tinglang.',
      'Listen for how the final conclusion evaluates the preceding examples.',
      'Услышьте, как итоговая реплика оценивает предыдущие примеры.',
    ),
  ],
  preceding: [
    t4(
      '첫 화자의 첫 문장은 앞에서 나온 내용을 요약한다.',
      "Birinchi so'zlovchining ilk gapi oldingi mazmunni jamlaydi.",
      'The first speaker’s opening line summarizes what came immediately before.',
      'Первая реплика первого говорящего резюмирует предшествующий контекст.',
    ),
    t4(
      '그 문장에 포함된 지시어와 생략된 주제를 복원한다.',
      "O'sha gapdagi ko'rsatish so'zi va tushirilgan mavzuni tiklang.",
      'Recover the referent of demonstratives and the omitted topic in that line.',
      'Восстановите референт указателей и опущенную тему в этой реплике.',
    ),
    t4(
      '선택지는 바로 다음 설명과도 모순되지 않아야 한다.',
      "Variant keyingi izohga ham zid bo'lmasligi kerak.",
      'The choice must also remain consistent with the explanation that follows.',
      'Вариант также не должен противоречить последующему объяснению.',
    ),
  ],
  'writing-short': [
    t4(
      '글을 쓰는 사람·받는 사람·목적을 먼저 표시한다.',
      'Yozuvchi, qabul qiluvchi va maqsadni avval belgilang.',
      'First identify the writer, recipient, and purpose.',
      'Сначала определите автора, адресата и цель текста.',
    ),
    t4(
      '빈칸 앞뒤의 높임 정도와 문장 종결 방식을 그대로 맞춘다.',
      "Bo'sh joy atrofidagi hurmat darajasi va gap tugash shakliga mos yozing.",
      'Match the honorific level and sentence ending used around the blank.',
      'Соблюдайте уровень вежливости и тип окончания вокруг пропуска.',
    ),
    t4(
      '필요한 정보만 한 문장으로 쓰고 새로운 내용을 만들지 않는다.',
      "Faqat kerakli ma'lumotni bir gapda yozing, yangi mazmun qo'shmang.",
      'Write only the needed information in one sentence; do not invent new content.',
      'Напишите только нужную информацию одним предложением, не добавляя нового содержания.',
    ),
  ],
  'writing-data': [
    t4(
      '도입에서 조사 대상과 기간을 한 문장으로 밝힌다.',
      "Kirishda tadqiqot mavzusi va davrini bitta gapda ko'rsating.",
      'State the subject and period of the data in one opening sentence.',
      'Во введении одним предложением укажите объект и период данных.',
    ),
    t4(
      '가장 큰 변화와 가장 작은 변화를 수치와 함께 비교한다.',
      "Eng katta va eng kichik o'zgarishni raqamlar bilan solishtiring.",
      'Compare the largest and smallest changes with figures.',
      'Сопоставьте наибольшее и наименьшее изменения с цифрами.',
    ),
    t4(
      '원인은 자료에 제시된 것만 쓰고 개인 의견을 넣지 않는다.',
      "Faqat berilgan sababni yozing, shaxsiy fikr qo'shmang.",
      'Use only causes supplied by the prompt and do not add personal opinion.',
      'Используйте только причины из задания и не добавляйте личное мнение.',
    ),
  ],
  'writing-essay': [
    t4(
      '세 개의 요구 사항을 각각 한 문단으로 배치해 빠짐없이 답한다.',
      'Uch talabning har biriga alohida paragraf ajratib, barchasiga javob bering.',
      'Give each of the three requirements its own paragraph so none is missed.',
      'Отведите каждому из трёх требований отдельный абзац, чтобы ничего не пропустить.',
    ),
    t4(
      '주장 뒤에는 이유와 구체적인 예를 붙여 논리를 완성한다.',
      'Fikrdan keyin sabab va aniq misol keltirib, mantiqni yakunlang.',
      'Follow each claim with a reason and a concrete example.',
      'После каждого тезиса дайте причину и конкретный пример.',
    ),
    t4(
      '서론·본론·결론의 기능을 분리하고 문어체를 끝까지 유지한다.',
      'Kirish, asosiy qism va xulosani ajratib, yozma uslubni saqlang.',
      'Separate introduction, body, and conclusion and maintain formal written style.',
      'Разделите введение, основную часть и заключение и сохраняйте письменный стиль.',
    ),
  ],
};

function introFor(definition: RecipeDefinition) {
  const label = labelFor(definition);
  return t4(
    `${label.ko}은 '${definition.title.ko}' 유형이다. ${definition.level}급 수준에서 요구되는 핵심 단서와 풀이 순서를 익혀야 한다.`,
    `${label.uz} — '${definition.title.uz}' turi. ${definition.level}-daraja uchun asosiy ishora va yechish tartibini o'rganish kerak.`,
    `${label.en} is the '${definition.title.en}' type. Learn the key clues and solving order required at level ${definition.level}.`,
    `${label.ru} — тип «${definition.title.ru}». Освойте ключевые признаки и порядок решения для ${definition.level}-го уровня.`,
  );
}

function rankingSection(
  definition: RecipeDefinition,
): RecipeSeedGrammarSection {
  return {
    key: `${definition.code}-ranking`,
    title: t4(
      '핵심 Ranking',
      'Asosiy reyting',
      'Key ranking',
      'Ключевой рейтинг',
    ),
    entries: definition.rankings.map((form, index) => ({
      rank: index + 1,
      form,
      meanings: [
        t4(
          '출제 가능성이 높은 핵심 단서',
          "Savolda ko'p uchraydigan asosiy belgi",
          'High-frequency clue for this question type',
          'Частотный ключевой признак этого типа',
        ),
      ],
      examples: [],
      highlights: [],
    })),
    tips: [],
  };
}

function createRecipe(definition: RecipeDefinition, order: number): RecipeSeed {
  const ranking = rankingSection(definition);
  return {
    groupCode: definition.code,
    section: definition.section,
    label: labelFor(definition),
    title: definition.title,
    intro: introFor(definition),
    targetLevel: definition.level,
    order,
    goldenRecipe: STRATEGIES[definition.strategy],
    grammarSections: [ranking],
    examples: [],
    practice: [],
    questionSource: { from: definition.from, to: definition.to },
    sourceReference: definition.sourceReference,
  };
}

const R = TopikSection.READING;
const L = TopikSection.LISTENING;
const W = TopikSection.WRITING;

const definitions: RecipeDefinition[] = [
  {
    code: 'reading-03-04',
    section: R,
    from: 3,
    to: 4,
    level: 3,
    title: t4(
      '유사 문법',
      "O'xshash grammatika",
      'Similar grammar',
      'Сходная грамматика',
    ),
    strategy: 'grammar',
    rankings: ['추측', '정도', '당위', '유일', '포함·추가', '이유', '순서'],
    sourceReference: 'PDF 20~25쪽',
  },
  {
    code: 'reading-05-08',
    section: R,
    from: 5,
    to: 8,
    level: 3,
    title: t4('광고', 'Reklama', 'Advertisements', 'Реклама'),
    strategy: 'topic',
    rankings: ['제품 광고', '업소 광고', '공익 광고', '광고 상세 설명'],
    sourceReference: 'PDF 26~42쪽',
  },
  {
    code: 'reading-09-12',
    section: R,
    from: 9,
    to: 12,
    level: 3,
    title: t4(
      '안내문·그래프·신문 기사',
      "E'lon, grafik va yangilik",
      'Notices, charts and news',
      'Объявления, графики и новости',
    ),
    strategy: 'detail',
    rankings: ['행사 안내', '생활 정보', '그래프 비교', '미담', '최신 화제'],
    sourceReference: 'PDF 84~91쪽, 126~132쪽',
  },
  {
    code: 'reading-13-15',
    section: R,
    from: 13,
    to: 15,
    level: 3,
    title: t4(
      '순서 배열',
      'Gaplar tartibi',
      'Sentence ordering',
      'Порядок предложений',
    ),
    strategy: 'order',
    rankings: ['정책', '인간 심리', '일화', '건강', '생활 정보', '유래'],
    sourceReference: 'PDF 104~108쪽',
  },
  {
    code: 'reading-16-18',
    section: R,
    from: 16,
    to: 18,
    level: 3,
    title: t4(
      '빈칸 채우기',
      "Bo'sh joyni to'ldirish",
      'Passage blanks',
      'Заполнение пропусков',
    ),
    strategy: 'blank',
    rankings: ['대응 유형', '종합 유형', '유의 표현', '반의 표현'],
    sourceReference: 'PDF 109~114쪽',
  },
  {
    code: 'reading-19-20',
    section: R,
    from: 19,
    to: 20,
    level: 3,
    title: t4(
      '설명문 내용 일치',
      'Izohli matn mazmuni',
      'Expository text details',
      'Содержание пояснительного текста',
    ),
    strategy: 'detail',
    rankings: ['접속사', '부사', '최신 화제', '상식', '기술', '교육'],
    sourceReference: 'PDF 92~95쪽',
  },
  {
    code: 'reading-21-22',
    section: R,
    from: 21,
    to: 22,
    level: 4,
    title: t4(
      '중심 생각·관용 표현',
      'Asosiy fikr va ibora',
      'Main idea and idioms',
      'Главная мысль и идиомы',
    ),
    strategy: 'main',
    rankings: ['관용 표현', '속담', '중심 생각', '필자의 주장'],
    sourceReference: 'PDF 170~175쪽',
  },
  {
    code: 'reading-23-24',
    section: R,
    from: 23,
    to: 24,
    level: 4,
    title: t4(
      '개인적인 글',
      'Shaxsiy matn',
      'Personal writing',
      'Личный текст',
    ),
    strategy: 'emotion',
    rankings: ['등장인물의 심정', '태도', '내용 일치', '행동 변화'],
    sourceReference: 'PDF 182~185쪽',
  },
  {
    code: 'reading-25-27',
    section: R,
    from: 25,
    to: 27,
    level: 4,
    title: t4(
      '신문 기사 제목',
      'Gazeta sarlavhasi',
      'News headlines',
      'Газетные заголовки',
    ),
    strategy: 'headline',
    rankings: ['경제', '정책', '날씨', '문화', '사건·사고', '건강'],
    sourceReference: 'PDF 176~181쪽',
  },
  {
    code: 'reading-28-31',
    section: R,
    from: 28,
    to: 31,
    level: 4,
    title: t4(
      '정보 전달 빈칸',
      "Axborot matnidagi bo'sh joy",
      'Information passage blanks',
      'Пропуски в информационном тексте',
    ),
    strategy: 'blank',
    rankings: ['대응 유형', '종합 유형', '원인·결과', '문제·해결'],
    sourceReference: 'PDF 186~192쪽',
  },
  {
    code: 'reading-32-34',
    section: R,
    from: 32,
    to: 34,
    level: 5,
    title: t4(
      '설명문 내용 일치',
      'Izohli matn tafsiloti',
      'Advanced expository details',
      'Детали сложного пояснительного текста',
    ),
    strategy: 'detail',
    rankings: ['최신 화제', '정책', '과학', '사회 현상', '동물'],
    sourceReference: 'PDF 218~221쪽',
  },
  {
    code: 'reading-35-38',
    section: R,
    from: 35,
    to: 38,
    level: 5,
    title: t4(
      '정보의 중심 생각',
      'Axborotning asosiy fikri',
      'Main idea of information texts',
      'Главная мысль информационного текста',
    ),
    strategy: 'main',
    rankings: ['필요성', '문제 제기', '대안', '기대 효과', '우려'],
    sourceReference: 'PDF 222~226쪽',
  },
  {
    code: 'reading-39-41',
    section: R,
    from: 39,
    to: 41,
    level: 5,
    title: t4(
      '문장 삽입',
      'Gapni joylashtirish',
      'Sentence insertion',
      'Вставка предложения',
    ),
    strategy: 'insertion',
    rankings: ['역사', '서평', '정책', '사회 현상', '과학'],
    sourceReference: 'PDF 227~230쪽',
  },
  {
    code: 'reading-42-43',
    section: R,
    from: 42,
    to: 43,
    level: 6,
    title: t4('소설', 'Badiiy asar', 'Fiction', 'Художественный текст'),
    strategy: 'emotion',
    rankings: ['인물 관계', '심정 변화', '행동의 이유', '내용 일치'],
    sourceReference: 'PDF 240~243쪽',
  },
  {
    code: 'reading-44-45',
    section: R,
    from: 44,
    to: 45,
    level: 6,
    title: t4(
      '설명문·논설문',
      'Izoh va munozara matni',
      'Expository and argumentative texts',
      'Пояснительный и аргументативный текст',
    ),
    strategy: 'blank',
    rankings: ['사회 현상', '인간 심리', '과학', '환경', '정책'],
    sourceReference: 'PDF 244~248쪽',
  },
  {
    code: 'reading-46-47',
    section: R,
    from: 46,
    to: 47,
    level: 6,
    title: t4(
      '정보 순서 배열',
      'Axborot tartibi',
      'Information ordering',
      'Порядок информационного текста',
    ),
    strategy: 'insertion',
    rankings: ['과정', '역사', '원인·결과', '비평'],
    sourceReference: 'PDF 249~251쪽',
  },
  {
    code: 'reading-48-50',
    section: R,
    from: 48,
    to: 50,
    level: 6,
    title: t4(
      '종합 논설문',
      'Umumiy munozara matni',
      'Integrated argumentative passage',
      'Комплексный аргументативный текст',
    ),
    strategy: 'attitude',
    rankings: ['글의 목적', '빈칸', '필자의 태도', '내용 일치'],
    sourceReference: 'PDF 252~255쪽',
  },

  {
    code: 'listening-01-02',
    section: L,
    from: 1,
    to: 2,
    level: 3,
    title: t4(
      '알맞은 그림',
      'Mos rasm',
      'Matching picture',
      'Подходящая картинка',
    ),
    strategy: 'visual',
    rankings: ['사람', '장소', '사물', '행동'],
    sourceReference: 'PDF 44~48쪽',
  },
  {
    code: 'listening-03',
    section: L,
    from: 3,
    to: 3,
    level: 3,
    title: t4('그래프', 'Grafik', 'Graph', 'График'),
    strategy: 'visual',
    rankings: ['기준 기간', '증가', '감소', '최댓값', '최솟값'],
    sourceReference: 'PDF 132~138쪽',
  },
  {
    code: 'listening-04-08',
    section: L,
    from: 4,
    to: 8,
    level: 3,
    title: t4(
      '이어질 수 있는 말',
      'Keyingi javob',
      'Appropriate response',
      'Подходящая ответная реплика',
    ),
    strategy: 'response',
    rankings: ['장소', '상황', '질문', '제안', '요청'],
    sourceReference: 'PDF 49~62쪽',
  },
  {
    code: 'listening-09-12',
    section: L,
    from: 9,
    to: 12,
    level: 3,
    title: t4(
      '이어서 할 행동',
      'Keyingi harakat',
      'Next action',
      'Следующее действие',
    ),
    strategy: 'action',
    rankings: ['예약', '문의', '구매', '이동', '전달'],
    sourceReference: 'PDF 63~72쪽',
  },
  {
    code: 'listening-13',
    section: L,
    from: 13,
    to: 13,
    level: 3,
    title: t4(
      '지인과의 대화',
      'Tanishlar suhbati',
      'Conversation with an acquaintance',
      'Разговор знакомых',
    ),
    strategy: 'detail',
    rankings: ['약속', '일상', '학교', '회사'],
    sourceReference: 'PDF 73~75쪽',
  },
  {
    code: 'listening-14',
    section: L,
    from: 14,
    to: 14,
    level: 3,
    title: t4('안내 방송', "E'lon", 'Announcement', 'Объявление'),
    strategy: 'detail',
    rankings: ['아파트', '백화점', '공원', '학교', '공항', '공연장'],
    sourceReference: 'PDF 76~78쪽',
  },
  {
    code: 'listening-15',
    section: L,
    from: 15,
    to: 15,
    level: 3,
    title: t4('뉴스', 'Yangilik', 'News', 'Новости'),
    strategy: 'detail',
    rankings: ['사건·사고', '날씨', '생활 정보', '경제', '교통'],
    sourceReference: 'PDF 79~81쪽',
  },
  {
    code: 'listening-16',
    section: L,
    from: 16,
    to: 16,
    level: 3,
    title: t4('인터뷰', 'Intervyu', 'Interview', 'Интервью'),
    strategy: 'detail',
    rankings: ['인물', '직업', '장소', '최신 화제'],
    sourceReference: 'PDF 82~83쪽',
  },
  {
    code: 'listening-17-19',
    section: L,
    from: 17,
    to: 19,
    level: 3,
    title: t4(
      '대화의 중심 생각',
      'Suhbatning asosiy fikri',
      'Main idea in dialogue',
      'Главная мысль диалога',
    ),
    strategy: 'main',
    rankings: ['제안', '필요성', '희망', '판단', '강조'],
    sourceReference: 'PDF 96~101쪽',
  },
  {
    code: 'listening-20',
    section: L,
    from: 20,
    to: 20,
    level: 3,
    title: t4(
      '인터뷰의 중심 생각',
      'Intervyuning asosiy fikri',
      'Main idea in an interview',
      'Главная мысль интервью',
    ),
    strategy: 'main',
    rankings: ['질문의 초점', '전문가 주장', '핵심 근거'],
    sourceReference: 'PDF 102~103쪽',
  },
  {
    code: 'listening-21-22',
    section: L,
    from: 21,
    to: 22,
    level: 4,
    title: t4(
      '공적 대화',
      'Rasmiy suhbat',
      'Public conversation',
      'Официальный разговор',
    ),
    strategy: 'main',
    rankings: ['중심 생각', '내용 일치', '공적 상황'],
    sourceReference: 'PDF 154~157쪽',
  },
  {
    code: 'listening-23-24',
    section: L,
    from: 23,
    to: 24,
    level: 4,
    title: t4(
      '공공 시설 용무',
      'Jamoat muassasasidagi ish',
      'Task at a public facility',
      'Обращение в общественное учреждение',
    ),
    strategy: 'detail',
    rankings: ['문의', '신청', '변경', '문제 해결'],
    sourceReference: 'PDF 158~160쪽',
  },
  {
    code: 'listening-25-26',
    section: L,
    from: 25,
    to: 26,
    level: 4,
    title: t4(
      '최신 인터뷰',
      'Dolzarb intervyu',
      'Current-affairs interview',
      'Актуальное интервью',
    ),
    strategy: 'main',
    rankings: ['최신 화제', '사회 현상', '인물의 견해'],
    sourceReference: 'PDF 161~163쪽',
  },
  {
    code: 'listening-27-28',
    section: L,
    from: 27,
    to: 28,
    level: 4,
    title: t4(
      '의견·의논',
      'Fikr va muhokama',
      'Opinion and discussion',
      'Мнение и обсуждение',
    ),
    strategy: 'attitude',
    rankings: ['찬성', '반대', '대안', '절충'],
    sourceReference: 'PDF 164~166쪽',
  },
  {
    code: 'listening-29-30',
    section: L,
    from: 29,
    to: 30,
    level: 4,
    title: t4(
      '직업 인터뷰',
      'Kasb intervyusi',
      'Occupation interview',
      'Интервью о профессии',
    ),
    strategy: 'detail',
    rankings: ['직업 파악', '업무 내용', '어려움', '보람'],
    sourceReference: 'PDF 167~169쪽',
  },
  {
    code: 'listening-31-32',
    section: L,
    from: 31,
    to: 32,
    level: 5,
    title: t4('토론', 'Munozara', 'Debate', 'Дискуссия'),
    strategy: 'attitude',
    rankings: ['찬성', '반대', '절충안', '새로운 대안'],
    sourceReference: 'PDF 202~205쪽',
  },
  {
    code: 'listening-33-34',
    section: L,
    from: 33,
    to: 34,
    level: 5,
    title: t4('강연', "Ma'ruza", 'Lecture', 'Лекция'),
    strategy: 'main',
    rankings: ['전문 주제', '중심 내용', '세부 정보'],
    sourceReference: 'PDF 206~208쪽',
  },
  {
    code: 'listening-35-36',
    section: L,
    from: 35,
    to: 36,
    level: 5,
    title: t4(
      '현장 연설',
      'Joydagi nutq',
      'On-site speech',
      'Публичное выступление',
    ),
    strategy: 'detail',
    rankings: ['행사장', '회사 기념식', '시상식', '발표 목적'],
    sourceReference: 'PDF 209~211쪽',
  },
  {
    code: 'listening-37-38',
    section: L,
    from: 37,
    to: 38,
    level: 5,
    title: t4(
      '교양 프로그램',
      "Ma'rifiy dastur",
      'Educational program',
      'Познавательная программа',
    ),
    strategy: 'main',
    rankings: ['문화', '건강', '교육', '예술', '여가'],
    sourceReference: 'PDF 212~214쪽',
  },
  {
    code: 'listening-39-40',
    section: L,
    from: 39,
    to: 40,
    level: 5,
    title: t4('대담', 'Suhbat', 'Talk', 'Беседа'),
    strategy: 'preceding',
    rankings: ['정책', '신기술', '환경', '앞선 내용'],
    sourceReference: 'PDF 215~217쪽',
  },
  {
    code: 'listening-41-42',
    section: L,
    from: 41,
    to: 42,
    level: 6,
    title: t4(
      '강연 중심 내용',
      "Ma'ruzaning asosiy mazmuni",
      'Lecture main point',
      'Главное содержание лекции',
    ),
    strategy: 'main',
    rankings: ['주제 설명', '핵심 주장', '세부 내용'],
    sourceReference: 'PDF 256~259쪽',
  },
  {
    code: 'listening-43-44',
    section: L,
    from: 43,
    to: 44,
    level: 6,
    title: t4(
      '다큐멘터리',
      'Hujjatli dastur',
      'Documentary',
      'Документальная программа',
    ),
    strategy: 'main',
    rankings: ['동물', '자연 현상', '전통문화', '역사'],
    sourceReference: 'PDF 269~272쪽',
  },
  {
    code: 'listening-45-46',
    section: L,
    from: 45,
    to: 46,
    level: 6,
    title: t4(
      '강연 세부 내용',
      "Ma'ruza tafsilotlari",
      'Lecture details',
      'Детали лекции',
    ),
    strategy: 'attitude',
    rankings: ['내용 일치', '말하는 방식', '예시', '조사 결과'],
    sourceReference: 'PDF 260~262쪽',
  },
  {
    code: 'listening-47-48',
    section: L,
    from: 47,
    to: 48,
    level: 6,
    title: t4('대담', 'Suhbat', 'Talk', 'Беседа'),
    strategy: 'attitude',
    rankings: ['질문의 초점', '전문가 견해', '정책 평가', '우려'],
    sourceReference: 'PDF 266~268쪽',
  },
  {
    code: 'listening-49-50',
    section: L,
    from: 49,
    to: 50,
    level: 6,
    title: t4(
      '강연 화자의 태도',
      "Ma'ruzachi munosabati",
      'Lecturer attitude',
      'Отношение лектора',
    ),
    strategy: 'attitude',
    rankings: ['설명', '비판', '강조', '우려', '기대'],
    sourceReference: 'PDF 263~265쪽',
  },

  {
    code: 'writing-51',
    section: W,
    from: 51,
    to: 51,
    level: 3,
    title: t4(
      '공개적·개인적 글 완성',
      'Ommaviy va shaxsiy matn',
      'Public and personal text completion',
      'Завершение публичного и личного текста',
    ),
    strategy: 'writing-short',
    rankings: ['요청·부탁', '계획', '문의', '감사', '초대'],
    sourceReference: 'PDF 115~121쪽',
  },
  {
    code: 'writing-52',
    section: W,
    from: 52,
    to: 52,
    level: 3,
    title: t4(
      '설명문 완성',
      'Izohli matnni tugatish',
      'Expository text completion',
      'Завершение пояснительного текста',
    ),
    strategy: 'writing-short',
    rankings: ['대응 관계', '원인·결과', '반대 관계', '종합'],
    sourceReference: 'PDF 122~125쪽',
  },
  {
    code: 'writing-53',
    section: W,
    from: 53,
    to: 53,
    level: 3,
    title: t4(
      '그래프 설명',
      'Grafikni tasvirlash',
      'Data description',
      'Описание графика',
    ),
    strategy: 'writing-data',
    rankings: ['조사 개요', '수치 비교', '증가·감소', '원인', '전망'],
    sourceReference: 'PDF 126~138쪽',
  },
  {
    code: 'writing-54',
    section: W,
    from: 54,
    to: 54,
    level: 6,
    title: t4(
      '논설문',
      'Munozarali insho',
      'Argumentative essay',
      'Аргументативное эссе',
    ),
    strategy: 'writing-essay',
    rankings: ['삶의 자세', '사회 문제', '교육', '환경', '정보', '행복'],
    sourceReference: 'PDF 273~278쪽',
  },
];

const orderBySection = new Map<TopikSection, number>();
orderBySection.set(TopikSection.READING, 6);

export const RECIPE_CATALOG: RecipeSeed[] = [
  RECIPE_READING_03_04,
  RECIPE_READING_05_08,
  RECIPE_READING_09_12,
  RECIPE_READING_13_15,
  RECIPE_READING_16_18,
  RECIPE_READING_19_20,
  RECIPE_READING_21_22,
  RECIPE_READING_23_24,
  RECIPE_READING_25_27,
  RECIPE_READING_28_31,
  RECIPE_READING_32_34,
  RECIPE_READING_35_38,
  RECIPE_READING_39_41,
  RECIPE_READING_42_43,
  RECIPE_READING_44_45,
  RECIPE_READING_46_47,
  RECIPE_READING_48_50,
  ...definitions
    .filter(
      (definition) =>
        definition.code !== 'reading-03-04' &&
        definition.code !== 'reading-05-08' &&
        definition.code !== 'reading-09-12' &&
        definition.code !== 'reading-13-15' &&
        definition.code !== 'reading-16-18' &&
        definition.code !== 'reading-19-20' &&
        !definition.code.startsWith('reading-2') &&
        !definition.code.startsWith('reading-3') &&
        !definition.code.startsWith('reading-4'),
    )
    .map((definition) => {
      const order = (orderBySection.get(definition.section) ?? 0) + 1;
      orderBySection.set(definition.section, order);
      // 읽기 1~2번이 이미 1번 순서를 사용하므로 나머지 읽기는 한 칸 뒤에서 시작한다.
      return createRecipe(
        definition,
        definition.section === TopikSection.READING ? order + 1 : order,
      );
    }),
];
