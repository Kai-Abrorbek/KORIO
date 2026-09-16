/**
 * 발음 연습 단어 뜻.
 *
 * 최소대립쌍은 뜻이 전혀 다른데 소리만 비슷한 게 핵심이라, 뜻을 보여줘야
 * "아 이래서 구분해야 하는구나" 가 온다.
 *
 * 형식: `단어: "ko|uz|en|ru"` — 한 줄에 네 언어. 파일이 쓸데없이 길어지는 걸
 * 막으려고 파이프로 붙였고, 읽을 때 쪼갠다. 순서를 바꾸면 전부 어긋나니 주의.
 *
 * 뜻이 여러 개인 단어는 가장 흔한 것 하나만 적는다. 이 화면은 사전이 아니라
 * 소리 훈련이라 뜻은 구분용 힌트면 충분하다.
 */

const ORDER = ["ko", "uz", "en", "ru"] as const;

const G: Record<string, string> = {
  // ── Lv.1 평음 vs 격음 ──
  불: "타는 것|olov|fire|огонь",
  풀: "잔디|o't|grass|трава",
  발: "다리 끝|oyoq|foot|нога",
  팔: "몸의 팔|qo'l|arm|рука",
  비: "내리는 비|yomg'ir|rain|дождь",
  피: "몸속의 피|qon|blood|кровь",
  배: "과일 배|nok|pear|груша",
  패: "이름표|yorliq|tag|бирка",
  벌: "꿀벌|ari|bee|пчела",
  펄: "갯벌|loyqa|mudflat|илистая отмель",
  바다: "넓은 물|dengiz|sea|море",
  파다: "땅을 파다|qazimoq|to dig|копать",
  반: "절반|yarim|half|половина",
  판: "나무 판|taxta|board|доска",
  병: "유리병|shisha|bottle|бутылка",
  평: "평평함|tekis|flat|плоский",

  달: "밤의 달|oy|moon|луна",
  탈: "얼굴 가면|niqob|mask|маска",
  돈: "화폐|pul|money|деньги",
  톤: "무게 단위|tonna|ton|тонна",
  동: "동쪽|sharq|east|восток",
  통: "물통|bochka|barrel|бочка",
  덕: "너그러움|fazilat|virtue|добродетель",
  턱: "얼굴 턱|iyak|chin|подбородок",
  도끼: "나무 베는 도구|bolta|axe|топор",
  토끼: "귀 긴 동물|quyon|rabbit|кролик",
  단: "묶음|bog'|bundle|связка",
  탄: "총알|o'q|bullet|пуля",
  둘: "숫자 2|ikki|two|два",
  툴: "도구|asbob|tool|инструмент",

  공: "차는 공|to'p|ball|мяч",
  콩: "콩알|loviya|bean|боб",
  기: "깃발|bayroq|flag|флаг",
  키: "몸의 키|bo'y|height|рост",
  골: "축구 골|gol|goal|гол",
  콜: "부름|chaqiruv|call|вызов",
  그림: "그린 것|rasm|picture|картина",
  크림: "부드러운 크림|krem|cream|крем",
  가드: "지킴이|gard|guard|защита",
  카드: "카드|karta|card|карта",
  간: "몸속 간|jigar|liver|печень",
  칸: "나뉜 자리|bo'lma|compartment|отсек",
  겁: "무서움|qo'rquv|fear|страх",
  컵: "물컵|stakan|cup|стакан",
  궁: "임금의 집|saroy|palace|дворец",
  쿵: "큰 소리|gurs|thud|бух",

  자다: "잠을 자다|uxlamoq|to sleep|спать",
  차다: "온도가 차다|sovuq|to be cold|холодный",
  장: "시장|bozor|market|рынок",
  창: "유리창|deraza|window|окно",
  종: "울리는 종|qo'ng'iroq|bell|колокол",
  총: "쏘는 총|miltiq|gun|ружьё",
  주다: "건네다|bermoq|to give|давать",
  추다: "춤을 추다|raqsga tushmoq|to dance|танцевать",
  잔: "찻잔|piyola|cup|чашка",
  찬: "반찬|garnir|side dish|гарнир",
  지다: "싸움에 지다|yutqazmoq|to lose|проигрывать",
  치다: "때리다|urmoq|to hit|бить",
  조: "곡식 조|tariq|millet|просо",
  초: "1초|soniya|second|секунда",
  절: "스님의 절|ibodatxona|temple|храм",
  철: "쇠|temir|iron|железо",

  // ── Lv.2 평음 vs 경음 ──
  사다: "돈을 주고 사다|sotib olmoq|to buy|покупать",
  싸다: "값이 싸다|arzon|cheap|дешёвый",
  살: "몸의 살|et|flesh|плоть",
  쌀: "밥 짓는 쌀|guruch|uncooked rice|рис",
  상: "받는 상|mukofot|prize|награда",
  쌍: "두 개 한 벌|juft|pair|пара",
  산: "높은 산|tog'|mountain|гора",
  싼: "값이 싼|arzon|cheap|дешёвый",
  시: "시 한 편|she'r|poem|стихотворение",
  씨: "식물 씨|urug'|seed|семя",
  소다: "탄산 소다|soda|soda|сода",
  쏘다: "총을 쏘다|otmoq|to shoot|стрелять",
  수다: "떠드는 말|suhbat|chatter|болтовня",
  쑤다: "죽을 쑤다|bo'tqa pishirmoq|to cook porridge|варить кашу",

  방: "사는 방|xona|room|комната",
  빵: "먹는 빵|non|bread|хлеб",
  뿔: "동물 뿔|shox|horn|рог",
  바르다: "약을 바르다|surtmoq|to apply|наносить",
  빠르다: "속도가 빠르다|tez|fast|быстрый",
  비다: "속이 비다|bo'sh bo'lmoq|to be empty|быть пустым",
  삐다: "발목을 삐다|chiqib ketmoq|to sprain|вывихнуть",
  배다: "스며들다|shimilmoq|to soak in|впитаться",
  빼다: "덜어내다|olib tashlamoq|to remove|убирать",
  부리: "새의 부리|tumshuq|beak|клюв",
  뿌리: "나무 뿌리|ildiz|root|корень",

  개: "짖는 동물|it|dog|собака",
  깨: "참깨|kunjut|sesame|кунжут",
  굴: "바다 굴|ustritsa|oyster|устрица",
  꿀: "벌꿀|asal|honey|мёд",
  가치: "값어치|qiymat|value|ценность",
  까치: "검은 새|zag'izg'on|magpie|сорока",
  기다: "바닥을 기다|emaklamoq|to crawl|ползти",
  끼다: "장갑을 끼다|kiymoq|to put on|надевать",
  곱다: "모습이 곱다|chiroyli|be lovely|быть красивым",
  꼽다: "손가락으로 꼽다|sanamoq|to count off|перечислять",
  갈다: "칼을 갈다|charxlamoq|to sharpen|точить",
  깔다: "이불을 깔다|yoymoq|to lay out|стелить",
  구기다: "종이를 구기다|g'ijimlamoq|to crumple|мять",
  꾸기다: "구기다와 같은 말|g'ijimlamoq|to crumple|мять",
  개다: "빨래를 개다|taxlamoq|to fold|складывать",
  깨다: "잠에서 깨다|uyg'onmoq|to wake up|просыпаться",

  딸: "여자 자식|qiz|daughter|дочь",
  다르다: "같지 않다|boshqacha|different|другой",
  따르다: "뒤를 따르다|ergashmoq|to follow|следовать",
  담: "집의 담|devor|wall|стена",
  땀: "흘리는 땀|ter|sweat|пот",
  대다: "손을 대다|tegizmoq|to touch|прикасаться",
  때다: "불을 때다|yoqmoq|to stoke|топить",
  떡: "쌀로 만든 떡|guruch keksi|rice cake|тток",
  둑: "물 막는 둑|to'g'on|embankment|дамба",
  뚝: "끊어지는 소리|tars|snap|резко",

  // ── Lv.3 모음 ──
  거리: "다니는 길|ko'cha|street|улица",
  고리: "동그란 고리|halqa|ring|кольцо",
  설: "설날|Yangi yil|Lunar New Year|Новый год",
  솔: "소나무|qarag'ay|pine|сосна",
  볼: "얼굴 볼|yuz|cheek|щека",
  검: "칼|qilich|sword|меч",
  곰: "숲의 곰|ayiq|bear|медведь",
  서리: "찬 서리|qirov|frost|иней",
  소리: "들리는 소리|tovush|sound|звук",
  넣다: "안에 넣다|solmoq|to put in|класть",
  놓다: "내려놓다|qo'ymoq|to put down|ставить",
  정: "따뜻한 마음|mehr|affection|привязанность",
  덜: "더 적게|kamroq|less|меньше",
  돌: "단단한 돌|tosh|stone|камень",

  글: "쓴 글|matn|writing|текст",
  들: "넓은 들판|dala|field|поле",
  은: "은반지의 은|kumush|silver|серебро",
  운: "좋은 운|omad|luck|удача",
  그: "그 사람|u|that|тот",
  구: "숫자 9|to'qqiz|nine|девять",
  흐리다: "날이 흐리다|bulutli|cloudy|пасмурный",
  후리다: "휘둘러 치다|supurmoq|to sweep|смахивать",
  쓰다: "글을 쓰다|yozmoq|to write|писать",
  그리다: "그림을 그리다|chizmoq|to draw|рисовать",
  구리다: "냄새가 구리다|sassiq|smelly|вонючий",
  느리다: "속도가 느리다|sekin|slow|медленный",
  누리다: "복을 누리다|huzur qilmoq|to enjoy|наслаждаться",

  게: "옆으로 걷는 게|qisqichbaqa|crab|краб",
  내: "나의|mening|my|мой",
  네: "그렇다|ha|yes|да",
  새: "나는 새|qush|bird|птица",
  세: "셋|uch|three|три",
  데다: "불에 데다|kuymoq|to get burned|обжечься",
  매다: "끈을 매다|bog'lamoq|to tie|завязывать",
  메다: "어깨에 메다|yelkaga olmoq|to shoulder|нести на плече",
  베다: "칼로 베다|kesmoq|to cut|резать",
  재: "타고 남은 재|kul|ash|пепел",
  제: "저의|mening|my|мой",
  채: "말채찍|qamchi|whip|кнут",
  체: "가루 거르는 체|elak|sieve|сито",

  오리: "물에 사는 새|o'rdak|duck|утка",
  우리: "나와 너|biz|we|мы",
  손: "몸의 손|qo'l|hand|рука",
  순: "섞이지 않은|sof|pure|чистый",
  보리: "보리쌀|arpa|barley|ячмень",
  목: "몸의 목|bo'yin|neck|шея",
  묵: "도토리묵|muk|jelly|желе",
  소: "밭 가는 소|sigir|cow|корова",
  수: "숫자|son|number|число",
  중: "가운데|o'rta|middle|середина",
  봄: "따뜻한 계절|bahor|spring|весна",
  붐: "갑작스런 유행|bum|boom|бум",

  // ── Lv.4 받침 ──
  망: "그물|to'r|net|сеть",
  만: "숫자 10000|o'n ming|ten thousand|десять тысяч",
  강: "흐르는 강|daryo|river|река",
  편: "우리 편|tomon|side|сторона",
  전: "그 전에|oldin|before|до",

  밤: "어두운 밤|tun|night|ночь",
  감: "가을 과일|xurmo|persimmon|хурма",
  심: "연필 심|o'zak|core|стержень",
  신: "발에 신는 것|oyoq kiyim|shoes|обувь",
  삼: "숫자 3|uch|three|три",
  참: "정말로|rostdan|truly|правда",
  잠: "자는 것|uyqu|sleep|сон",
  남: "다른 사람|boshqa|another person|другой",
  난: "난초|orkide|orchid|орхидея",

  말: "타는 동물|ot|horse|лошадь",
  물: "마시는 물|suv|water|вода",
  문: "여닫는 문|eshik|door|дверь",
  선: "그은 선|chiziq|line|линия",
  길: "다니는 길|yo'l|road|дорога",
  긴: "길이가 긴|uzun|long|длинный",
  알: "새의 알|tuxum|egg|яйцо",
  안: "속|ich|inside|внутри",

  밥: "지은 밥|ovqat|rice, meal|рис, еда",
  집: "사는 집|uy|house|дом",
  짐: "들고 가는 짐|yuk|luggage|багаж",
  답: "물음의 답|javob|answer|ответ",
  삽: "땅 파는 삽|belkurak|shovel|лопата",
  갑: "담뱃갑|quti|case|коробка",
  십: "숫자 10|o'n|ten|десять",
  입: "얼굴의 입|og'iz|mouth|рот",
  임: "사랑하는 사람|yor|beloved|возлюбленный",
};

/**
 * 단어 뜻을 현재 언어로. 없으면 빈 문자열 —
 * 뜻이 빠졌다고 문제를 못 풀게 만들 이유는 없다.
 */
export function glossOf(word: string, lang: string): string {
  const row = G[word];
  if (!row) return "";
  const i = ORDER.indexOf(lang.slice(0, 2) as (typeof ORDER)[number]);
  const parts = row.split("|");
  return parts[i < 0 ? 2 : i] ?? "";
}

/** 검증 스크립트용 */
export const PRON_GLOSS = G;
