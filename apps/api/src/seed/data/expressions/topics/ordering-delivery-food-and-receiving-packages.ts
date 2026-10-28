import { ExpressionProficiency } from '../../../../expressions/schemas/expression-node.schema';
import { ExpressionSpeechLevel } from '../../../../expressions/schemas/expression.schema';
import {
  defineExpressionTopic,
  expressionDrafts,
  localized,
  type ExpressionDraftRow,
} from '../expression-topic.helpers';

const FOOD_CUSTOMER = localized(
  '배달 음식을 주문하거나 받는 고객',
  'Yetkazma ovqat buyurtma qilayotgan yoki olayotgan mijoz',
  'The customer ordering or receiving food delivery',
  'Клиент, заказывающий или получающий доставку еды',
);

const RESTAURANT_OR_RIDER = localized(
  '음식점 직원 또는 배달원',
  'Restoran xodimi yoki kuryer',
  'Restaurant employee or delivery rider',
  'Сотрудник ресторана или курьер',
);

const PACKAGE_RECIPIENT = localized(
  '택배를 받는 사람',
  'Posilkani qabul qiluvchi',
  'The package recipient',
  'Получатель посылки',
);

const COURIER_OR_SUPPORT = localized(
  '택배 기사 또는 배송 지원 직원',
  'Kuryer yoki yetkazib berish xizmati xodimi',
  'Courier or delivery support employee',
  'Курьер или сотрудник службы доставки',
);

const FOOD_ORDER_CONTEXT = localized(
  '배달 앱이나 전화로 기본 메뉴·수량·주소를 확인하며 주문할 때 사용해요.',
  'Ilova yoki telefon orqali taom, miqdor va manzilni aniqlab buyurtma berishda ishlatiladi.',
  'Use this when confirming menu items, quantity, and address in an app or by phone.',
  'Используйте при подтверждении блюд, количества и адреса в приложении или по телефону.',
);
const FOOD_ORDER_USAGE = localized(
  '주문 전 메뉴·수량·주소를 다시 확인하고 공개된 곳에 상세 주소나 출입정보를 남기지 않아요.',
  'Buyurtmadan oldin taom, miqdor va manzilni tekshiring, ochiq joyda to‘liq manzil yoki kirish ma’lumotini qoldirmang.',
  'Recheck the menu, quantity, and address, and do not post detailed address or entry information publicly.',
  'Перепроверьте блюда, количество и адрес и не публикуйте полный адрес или данные входа.',
);

const OPTION_CONTEXT = localized(
  '음식 옵션·요청사항·결제와 비대면 수령 방식을 주문에 반영할 때 사용해요.',
  'Taom opsiyasi, so‘rov, to‘lov va kontaktsiz yetkazishni buyurtmaga qo‘shishda ishlatiladi.',
  'Use this when adding food options, requests, payment, or contactless delivery preferences.',
  'Используйте при выборе опций, просьб, оплаты и бесконтактной доставки.',
);
const OPTION_USAGE = localized(
  '요청사항은 매장 확인이 필요할 수 있고, 알레르기처럼 중요한 내용은 가능 여부를 다시 확인해요.',
  'So‘rovni restoran tasdiqlashi kerak bo‘lishi mumkin; allergiya kabi muhim masalani qayta aniqlang.',
  'Requests may require restaurant confirmation; reconfirm important needs such as allergy-related requests.',
  'Просьбы могут требовать подтверждения ресторана; важные условия, включая аллергию, уточняйте повторно.',
);

const STATUS_CONTEXT = localized(
  '주문 접수 뒤 예상 시간·현재 상태·배달원 연락과 위치 안내를 확인할 때 사용해요.',
  'Buyurtmadan keyin taxminiy vaqt, holat, kuryer aloqasi va joyni aniqlashda ishlatiladi.',
  'Use this after ordering to check estimated timing, status, rider contact, and location guidance.',
  'Используйте после заказа для уточнения времени, статуса, связи с курьером и места.',
);
const STATUS_USAGE = localized(
  '도착 시간은 교통·날씨·조리 상황에 따른 예상치이므로 확정 시간처럼 말하지 않아요.',
  'Kelish vaqti yo‘l, ob-havo va tayyorlashga bog‘liq taxmin, shuning uchun uni kafolatlangan deb aytmang.',
  'Arrival time is an estimate affected by traffic, weather, and preparation, so do not present it as guaranteed.',
  'Время прибытия — оценка, зависящая от дороги, погоды и готовки; не выдавайте его за гарантию.',
);

const FOOD_ISSUE_CONTEXT = localized(
  '배달 음식의 누락·오배송·파손·섭취 안전이 의심되는 상태를 앱이나 매장에 알릴 때 사용해요.',
  'Taom yetishmasligi, noto‘g‘ri kelishi, shikastlanishi yoki yeyishga yaroqsiz holatini bildirishda ishlatiladi.',
  'Use this to report missing, wrong, damaged, or unsafe-to-eat food delivery.',
  'Используйте, чтобы сообщить о недостающей, неверной, повреждённой или непригодной еде.',
);
const FOOD_ISSUE_USAGE = localized(
  '문제가 있는 음식은 억지로 먹지 말고 주문 내역과 사진 등 확인 가능한 사실을 전달해요.',
  'Muammoli taomni yemang; buyurtma yozuvi, surat va tasdiqlanadigan faktni yuboring.',
  'Do not consume questionable food; provide verifiable facts such as the order record and photos.',
  'Не ешьте сомнительную еду; передайте проверяемые факты, заказ и фотографии.',
);

const PACKAGE_RECEIPT_CONTEXT = localized(
  '택배 도착, 공동현관, 비대면·직접 수령, 부재 시 보관 방법을 조율할 때 사용해요.',
  'Posilka kelishi, umumiy kirish, kontaktsiz yoki shaxsan olish va yo‘qlikda saqlashni kelishishda ishlatiladi.',
  'Use this to coordinate arrival, building access, contactless or direct handoff, and absence.',
  'Используйте для согласования прибытия, входа, бесконтактной или личной передачи и отсутствия.',
);
const PACKAGE_RECEIPT_USAGE = localized(
  '공동현관 비밀번호나 인증번호를 공개 메시지에 남기지 말고 공식 연락 경로에서 필요한 정보만 확인해요.',
  'Umumiy kirish paroli yoki tasdiqlash kodini ochiq xabarda qoldirmang; rasmiy aloqa orqali faqat keraklisini tekshiring.',
  'Do not post building passcodes or verification codes publicly; use an official contact channel and share only what is needed.',
  'Не публикуйте код подъезда или подтверждения; используйте официальный канал и сообщайте только необходимое.',
);

const PACKAGE_SAFETY_CONTEXT = localized(
  '송장·보관함·수령 증빙·오배송을 확인하고 사칭 링크나 개인정보 요구에 안전하게 대응할 때 사용해요.',
  'Trek raqami, shkaf, qabul tasdig‘i va noto‘g‘ri yetkazishni tekshirib, soxta havola yoki ma’lumot so‘roviga xavfsiz javob berishda ishlatiladi.',
  'Use this to check tracking, lockers, delivery proof, wrong deliveries, and suspicious links or data requests.',
  'Используйте для проверки трекинга, ячейки, доказательства доставки, ошибок и подозрительных ссылок.',
);
const PACKAGE_SAFETY_USAGE = localized(
  '낯선 링크에 비밀번호·인증번호·결제정보를 입력하지 말고 택배사의 공식 앱이나 대표 번호로 직접 확인해요.',
  'Notanish havolaga parol, kod yoki to‘lov ma’lumotini kiritmang; tashuvchining rasmiy ilovasi yoki raqamidan tekshiring.',
  'Do not enter passwords, codes, or payment details in unknown links; verify through the carrier’s official app or number.',
  'Не вводите пароли, коды или платёжные данные по незнакомым ссылкам; проверяйте через официальное приложение или номер.',
);

function rows(
  data: readonly ExpressionDraftRow[],
  context: ReturnType<typeof localized>,
  speaker: ReturnType<typeof localized>,
  usageNote: ReturnType<typeof localized>,
) {
  return expressionDrafts(data, { context, speaker, usageNote });
}

function buildOrderingDeliveryFoodAndReceivingPackagesTopic() {
  // prettier-ignore
  return defineExpressionTopic({
    code: 'ordering-delivery-food-and-receiving-packages',
    title: localized(
      '배달 음식 주문하고 택배 받기',
      'Yetkazma ovqat buyurtma qilish va posilka olish',
      'Ordering delivery food and receiving packages',
      'Заказ еды с доставкой и получение посылок',
    ),
    description: localized(
      '배달 음식의 메뉴·옵션·상태와 문제를 정확히 전달하고, 택배를 안전하게 수령하며 송장·보관함·사칭 연락에 대응해요.',
      'Yetkazma taom menyusi, opsiyasi, holati va muammosini aniq ayting, posilkani xavfsiz oling hamda trek, shkaf va soxta aloqaga javob bering.',
      'Learn to communicate food-delivery orders, options, status, and problems, receive packages safely, and handle tracking, lockers, and impersonation attempts.',
      'Научитесь точно оформлять доставку еды, сообщать о статусе и проблемах, безопасно получать посылки и проверять трекинг, ячейки и подозрительные сообщения.',
    ),
    order: 18,
    placement: { section: 1, unit: 18 },
    difficulty: 3,
    nodes: [
      {
        code: 'place-basic-food-delivery-order',
        title: localized(
          '메뉴·수량·주소로 기본 주문하기',
          'Taom, miqdor va manzil bilan asosiy buyurtma berish',
          'Placing a basic food delivery order',
          'Оформление основного заказа еды',
        ),
        description: localized(
          '배달 여부, 메뉴와 수량, 주문자 이름과 주소를 정확히 주고받아요.',
          'Yetkazish, taom, miqdor, buyurtmachi ismi va manzilni aniq ayting.',
          'Clearly communicate delivery, menu items, quantity, customer name, and address.',
          'Точно сообщайте доставку, блюда, количество, имя заказчика и адрес.',
        ),
        icon: 'restaurant-outline',
        proficiency: ExpressionProficiency.BEGINNER,
        expressions: [
          ...rows([
            ['order-for-delivery', '배달로 주문하고 싶어요.', 'baedallo jumunhago sipeoyo', '음식을 배달로 주문하고 싶다고 말하는 표현', 'Ovqatni yetkazib berishga buyurtma qilmoqchi ekanini aytish', 'I would like to order for delivery.', 'Я хочу заказать еду с доставкой.'],
            ['order-two-stews', '김치찌개 두 개 주세요.', 'gimchijjigae du gae juseyo', '김치찌개 두 개를 주문하는 말', 'Ikki porsiya kimchi-chchige buyurtma qilish', 'Two kimchi stews, please.', 'Два кимчхи-ччиге, пожалуйста.'],
            ['delivery-address-apartment', '배달 주소는 한빛아파트 백일동이에요.', 'baedal jusoneun hanbitapateu baegildongieyo', '배달 주소의 아파트 동을 알려 주는 말', 'Yetkazish manzilidagi bino raqamini aytish', 'The delivery address is Building 101 of Hanbit Apartments.', 'Адрес доставки — комплекс «Ханбит», корпус 101.'],
            ['two-spoon-sets', '수저 두 세트 부탁드려요.', 'sujeo du seteu butakdeuryeoyo', '수저 두 세트를 요청하는 말', 'Ikki to‘plam qoshiq-tayoq so‘rash', 'Please include two sets of utensils.', 'Положите, пожалуйста, два набора приборов.'],
            ['add-one-cola', '콜라 한 병도 추가해 주세요.', 'kolla han byeongdo chugahae juseyo', '콜라 한 병을 주문에 추가하는 말', 'Buyurtmaga bir shisha kola qo‘shishni so‘rash', 'Please add one bottle of cola.', 'Добавьте, пожалуйста, одну бутылку колы.'],
            ['order-under-minsu', '주문자 이름은 김민수예요.', 'jumunja ireumeun gimminsuyeyo', '주문자 이름을 알려 주는 말', 'Buyurtmachi ismini aytish', 'The order name is Kim Minsu.', 'Имя в заказе — Ким Минсу.'],
            ['confirm-delivery-area', '이 주소도 배달 가능한가요?', 'i jusodo baedal ganeunghangayo', '해당 주소가 배달 지역인지 묻는 말', 'Bu manzilga ham yetkazish mumkinligini so‘rash', 'Do you deliver to this address?', 'Вы доставляете по этому адресу?'],
            ['order-one-chicken-casual', '치킨 한 마리 시켜 줘.', 'chikin han mari sikyeo jwo', '친한 사람에게 치킨 한 마리를 주문해 달라는 말', 'Yaqin kishidan bitta tovuq buyurtma qilishni so‘rash', 'Order one chicken for me.', 'Закажи одну порцию курицы.', ExpressionSpeechLevel.CASUAL],
          ], FOOD_ORDER_CONTEXT, FOOD_CUSTOMER, FOOD_ORDER_USAGE),
          ...rows([
            ['confirm-delivery-order', '배달 주문 맞으시죠?', 'baedal jumun majeusijyo', '배달 주문이 맞는지 확인하는 말', 'Buyurtma yetkazib berish uchun ekanini tasdiqlash', 'This is a delivery order, correct?', 'Это заказ с доставкой, верно?'],
            ['ask-menu-and-quantity', '메뉴와 수량을 말씀해 주세요.', 'menyuwa suryangeul malsseumhae juseyo', '메뉴와 수량을 요청하는 말', 'Taom va miqdorni aytishni so‘rash', 'Please tell me the menu items and quantities.', 'Назовите, пожалуйста, блюда и количество.'],
            ['repeat-address', '배달 주소를 다시 확인해 드릴게요.', 'baedal jusoreul dasi hwaginhae deurilgeyo', '배달 주소를 다시 확인하겠다는 말', 'Yetkazish manzilini qayta tekshirishni aytish', 'I will confirm the delivery address again.', 'Я ещё раз подтвержу адрес доставки.'],
            ['menu-sold-out', '그 메뉴는 지금 품절이에요.', 'geu menyuneun jigeum pumjeorieyo', '메뉴가 품절이라고 안내하는 말', 'Taom hozir qolmaganini aytish', 'That menu item is currently sold out.', 'Этого блюда сейчас нет.'],
            ['address-outside-area', '이 주소는 배달 가능 지역 밖이에요.', 'i jusoneun baedal ganeung jiyeok bakkieyo', '주소가 배달 지역 밖이라고 안내하는 말', 'Manzil yetkazish hududidan tashqarida ekanini aytish', 'This address is outside our delivery area.', 'Этот адрес находится вне зоны доставки.'],
            ['confirm-order-name', '주문자 성함을 확인해 주세요.', 'jumunja seonghameul hwaginhae juseyo', '주문자 이름을 확인해 달라는 말', 'Buyurtmachi ismini tasdiqlashni so‘rash', 'Please confirm the name on the order.', 'Подтвердите, пожалуйста, имя в заказе.'],
            ['basic-order-accepted', '주문이 정상적으로 접수됐어요.', 'jumuni jeongsangjeogeuro jeopsudwaesseoyo', '기본 주문이 접수됐다고 알리는 말', 'Buyurtma muvaffaqiyatli qabul qilinganini aytish', 'Your order has been accepted.', 'Ваш заказ принят.'],
          ], FOOD_ORDER_CONTEXT, RESTAURANT_OR_RIDER, FOOD_ORDER_USAGE),
        ],
      },
      {
        code: 'confirm-options-requests-and-handoff',
        title: localized(
          '옵션·요청사항·결제와 수령 방식 확인하기',
          'Opsiya, so‘rov, to‘lov va olish usulini aniqlash',
          'Confirming options, requests, payment, and handoff',
          'Уточнение опций, просьб, оплаты и передачи',
        ),
        description: localized(
          '맵기·소스·일회용품·알레르기 관련 요청과 결제, 비대면 배달 방식을 확인해요.',
          'Achchiqlik, sous, bir martalik buyum, allergiya, to‘lov va kontaktsiz yetkazishni aniqlang.',
          'Confirm spice, sauce, disposable items, allergy-related requests, payment, and contactless delivery.',
          'Уточняйте остроту, соус, одноразовые приборы, аллергию, оплату и бесконтактную доставку.',
        ),
        icon: 'options-outline',
        proficiency: ExpressionProficiency.BEGINNER,
        expressions: [
          ...rows([
            ['make-less-spicy', '맵기 옵션은 순한 맛으로 해 주세요.', 'maepgi opsyeoneun sunhan maseuro hae juseyo', '배달 주문의 맵기 옵션을 순한 맛으로 요청하는 말', 'Achchiqlik opsiyasini yumshoq ta’mga o‘zgartirishni so‘rash', 'Please set the spice option to mild.', 'Выберите, пожалуйста, мягкий уровень остроты.'],
            ['sauce-separately', '소스는 따로 담아 주세요.', 'soseuneun ttaro dama juseyo', '소스를 별도로 포장해 달라는 말', 'Sousni alohida solishni so‘rash', 'Please pack the sauce separately.', 'Упакуйте соус отдельно, пожалуйста.'],
            ['no-disposable-items', '일회용품은 빼 주세요.', 'ilhoeyongpumeun ppae juseyo', '일회용품을 제외해 달라는 말', 'Bir martalik buyumlarni qo‘shmaslikni so‘rash', 'Please leave out disposable items.', 'Не кладите одноразовые приборы.'],
            ['leave-at-door', '문 앞에 놓아 주세요.', 'mun ape noa juseyo', '음식을 문 앞에 놓아 달라는 말', 'Ovqatni eshik oldida qoldirishni so‘rash', 'Please leave it at the door.', 'Оставьте, пожалуйста, у двери.'],
            ['pay-by-card-in-app', '앱에서 카드로 결제할게요.', 'aebeseo kadeuro gyeoljehalgeyo', '앱에서 카드 결제를 선택하는 말', 'Ilovada karta bilan to‘lashini aytish', 'I will pay by card in the app.', 'Я оплачу картой в приложении.'],
            ['ask-on-site-payment', '현장 결제도 가능한가요?', 'hyeonjang gyeoljedo ganeunghangayo', '배달 시 현장 결제가 가능한지 묻는 말', 'Yetkazishda joyida to‘lash mumkinligini so‘rash', 'Is payment on delivery available?', 'Можно оплатить при получении?'],
            ['mention-allergy-request', '알레르기 관련 요청을 확인해 주세요.', 'allereugi gwallyeon yocheongeul hwaginhae juseyo', '알레르기 관련 요청 확인을 부탁하는 말', 'Allergiyaga oid so‘rovni tekshirishni so‘rash', 'Please check my allergy-related request.', 'Проверьте, пожалуйста, просьбу, связанную с аллергией.'],
          ], OPTION_CONTEXT, FOOD_CUSTOMER, OPTION_USAGE),
          ...rows([
            ['less-spicy-request-noted', '덜 맵게 해 달라는 요청을 적어 둘게요.', 'deol maepge hae dallaneun yocheongeul jeogeo dulgeyo', '덜 맵게 해 달라는 요청을 기록하는 말', 'Kamroq achchiq qilish so‘rovi yozilganini aytish', 'I will note your request for less spice.', 'Я отмечу просьбу сделать менее остро.'],
            ['option-has-extra-charge', '이 옵션은 추가 금액이 있어요.', 'i opsyeoneun chuga geumaegi isseoyo', '옵션에 추가 금액이 있다고 안내하는 말', 'Opsiyada qo‘shimcha haq borligini aytish', 'This option has an additional charge.', 'За эту опцию взимается доплата.'],
            ['payment-completed-in-app', '앱에서 결제가 완료됐어요.', 'aebeseo gyeoljega wallyodwaesseoyo', '앱 결제가 완료됐다고 확인하는 말', 'Ilovadagi to‘lov tugaganini aytish', 'The payment was completed in the app.', 'Оплата в приложении завершена.'],
            ['contactless-delivery-confirmed', '비대면 배달로 접수됐어요.', 'bidaemyeon baedallo jeopsudwaesseoyo', '비대면 배달 요청이 접수됐다고 알리는 말', 'Kontaktsiz yetkazish qabul qilinganini aytish', 'Contactless delivery has been requested.', 'Бесконтактная доставка оформлена.'],
            ['allergy-request-needs-confirmation', '알레르기 관련 요청은 매장에 다시 확인하겠습니다.', 'allereugi gwallyeon yocheongeun maejange dasi hwaginhagetseumnida', '알레르기 관련 요청을 매장에 재확인하겠다는 말', 'Allergiya so‘rovini restorandan qayta tekshirishini aytish', 'I will reconfirm the allergy-related request with the restaurant.', 'Я ещё раз уточню в ресторане просьбу, связанную с аллергией.'],
            ['request-not-guaranteed-yet', '요청사항은 매장 확인 후 확정돼요.', 'yocheongsahangeun maejang hwagin hu hwakjeongdwaeyo', '요청사항이 매장 확인 뒤 확정된다고 안내하는 말', 'So‘rov restoran tekshiruvidan keyin tasdiqlanishini aytish', 'The request is confirmed only after the restaurant checks it.', 'Просьба подтверждается после проверки рестораном.'],
            ['delivery-fee-shown-before-order', '배달비는 주문 전에 화면에 표시돼요.', 'baedalbineun jumun jeone hwamyeone pyosidwaeyo', '배달비가 주문 전 화면에 표시된다고 안내하는 말', 'Yetkazish haqi buyurtmadan oldin ekranda ko‘rinishini aytish', 'The delivery fee is shown before you place the order.', 'Стоимость доставки показывается до оформления заказа.'],
            ['rider-will-see-handoff-note', '배달원에게 수령 요청사항이 전달돼요.', 'baedarwonege suryeong yocheongsahangi jeondaldwaeyo', '수령 요청사항이 배달원에게 전달된다고 안내하는 말', 'Olish bo‘yicha so‘rov kuryerga yetishini aytish', 'The handoff note will be sent to the rider.', 'Курьер получит инструкцию по передаче заказа.'],
          ], OPTION_CONTEXT, RESTAURANT_OR_RIDER, OPTION_USAGE),
        ],
      },
      {
        code: 'check-estimate-status-and-rider-contact',
        title: localized(
          '예상 시간·주문 상태·배달원 연락 확인하기',
          'Taxminiy vaqt, buyurtma holati va kuryer aloqasini tekshirish',
          'Checking estimates, order status, and rider contact',
          'Проверка времени, статуса и связи с курьером',
        ),
        description: localized(
          '조리·픽업·이동 상태와 예상 도착 시간을 확인하고 배달원이 위치를 찾도록 안내해요.',
          'Tayyorlash, olib ketish, yo‘ldagi holat va taxminiy vaqtni tekshirib, kuryerga joyni topishda yordam bering.',
          'Check preparation, pickup, travel status, and estimated arrival, and help the rider find the location.',
          'Уточняйте готовку, получение, путь и примерное прибытие и помогайте курьеру найти место.',
        ),
        icon: 'time-outline',
        proficiency: ExpressionProficiency.INTERMEDIATE,
        expressions: [
          ...rows([
            ['ask-estimated-arrival', '예상 도착 시간이 언제예요?', 'yesang dochak sigani eonjeyeyo', '예상 도착 시간을 묻는 말', 'Taxminiy kelish vaqtini so‘rash', 'What is the estimated arrival time?', 'Какое примерное время прибытия?'],
            ['ask-if-restaurant-received', '매장에서 주문을 확인했나요?', 'maejangeseo jumuneul hwaginhaennayo', '매장이 주문을 확인했는지 묻는 말', 'Restoran buyurtmani ko‘rganini so‘rash', 'Has the restaurant confirmed the order?', 'Ресторан подтвердил заказ?'],
            ['ask-current-order-status', '지금 주문 상태가 어떻게 돼요?', 'jigeum jumun sangtaega eotteoke dwaeyo', '현재 주문 상태를 묻는 말', 'Hozirgi buyurtma holatini so‘rash', 'What is the current order status?', 'Каков текущий статус заказа?'],
            ['rider-location-not-updating', '배달원 위치가 화면에서 갱신되지 않아요.', 'baedarwon wichiga hwamyeoneseo gaengsindoeji anayo', '배달원 위치가 앱에서 갱신되지 않는다고 말하는 표현', 'Kuryer joyi ilovada yangilanmayotganini aytish', 'The rider location is not updating on the screen.', 'Местоположение курьера не обновляется.'],
            ['message-instead-of-call', '전화를 못 받을 수 있으니 문자로 남겨 주세요.', 'jeonhwareul mot badeul su isseuni munjaro namgyeo juseyo', '전화를 못 받을 때 문자를 요청하는 말', 'Qo‘ng‘iroqqa javob bera olmasa, xabar qoldirishni so‘rash', 'I may not be able to answer, so please leave a text.', 'Я могу не ответить, поэтому оставьте сообщение.'],
            ['call-from-lobby', '건물 로비에 도착하면 연락해 주세요.', 'geonmul robie dochakamyeon yeollakhae juseyo', '건물 로비 도착 시 연락을 요청하는 말', 'Bino foyesiga kelganda bog‘lanishni so‘rash', 'Please contact me when you reach the lobby.', 'Свяжитесь со мной, когда будете в холле.'],
            ['correct-location-landmark', '입구 옆 파란 간판이 있는 곳이에요.', 'ipgu yeop paran ganpani inneun gosieyo', '배달 위치를 찾기 위한 표지를 알려 주는 말', 'Yetkazish joyi uchun ko‘k belgi yonini aytish', 'It is by the blue sign next to the entrance.', 'Это у синей вывески рядом со входом.'],
            ['food-not-here-yet-casual', '아직 음식 안 왔어?', 'ajik eumsik an wasseo', '친한 사람에게 음식 도착 여부를 묻는 말', 'Yaqin kishidan taom hali kelmaganini so‘rash', 'Has the food still not arrived?', 'Еда ещё не приехала?', ExpressionSpeechLevel.CASUAL],
          ], STATUS_CONTEXT, FOOD_CUSTOMER, STATUS_USAGE),
          ...rows([
            ['preparing-order-now', '현재 음식을 준비하고 있어요.', 'hyeonjae eumsigeul junbihago isseoyo', '음식을 준비 중이라고 안내하는 말', 'Taom tayyorlanayotganini aytish', 'The food is currently being prepared.', 'Сейчас еду готовят.'],
            ['rider-picked-up-order', '배달원이 주문을 픽업했어요.', 'baedarwoni jumuneul pigeophaesseoyo', '배달원이 주문을 수령했다고 안내하는 말', 'Kuryer buyurtmani olib ketganini aytish', 'The rider has picked up the order.', 'Курьер забрал заказ.'],
            ['estimated-arrival-not-guaranteed', '표시된 시간은 예상 도착 시간이에요.', 'pyosidoen siganeun yesang dochak siganieyo', '표시 시간이 예상치라고 설명하는 말', 'Ko‘rsatilgan vaqt taxmin ekanini aytish', 'The displayed time is an estimated arrival time.', 'Указанное время — примерное время прибытия.'],
            ['delay-due-to-traffic', '교통 상황 때문에 도착이 늦어질 수 있어요.', 'gyotong sanghwang ttaemune dochagi neujeojil su isseoyo', '교통 상황으로 지연될 수 있다고 안내하는 말', 'Yo‘l holati sabab kechikish mumkinligini aytish', 'Arrival may be delayed because of traffic.', 'Прибытие может задержаться из-за дорожной ситуации.'],
            ['rider-nearby', '배달원이 근처에 도착했어요.', 'baedarwoni geuncheoe dochakaesseoyo', '배달원이 근처에 왔다고 안내하는 말', 'Kuryer yaqin kelganini aytish', 'The rider has arrived nearby.', 'Курьер уже рядом.'],
            ['cannot-find-entrance', '건물 입구를 찾기 어려워요.', 'geonmul ipgureul chatgi eoryeowoyo', '배달원이 건물 입구를 찾기 어렵다고 말하는 표현', 'Kuryer bino kirishini topa olmayotganini aytish', 'I am having trouble finding the building entrance.', 'Мне трудно найти вход в здание.'],
            ['contact-through-app', '앱의 안심번호로 연락드릴게요.', 'aebui ansimbeonhoro yeollakdeurilgeyo', '앱의 보호된 번호로 연락하겠다는 말', 'Ilovadagi himoyalangan raqam orqali bog‘lanishini aytish', 'I will contact you through the app’s protected number.', 'Я свяжусь через защищённый номер приложения.'],
          ], STATUS_CONTEXT, RESTAURANT_OR_RIDER, STATUS_USAGE),
        ],
      },
      {
        code: 'report-food-delivery-problems',
        title: localized(
          '누락·오배송·파손 문제 알리기',
          'Yetishmaslik, noto‘g‘ri va shikastlangan yetkazmani bildirish',
          'Reporting missing, wrong, or damaged food',
          'Сообщение о недостающей, неверной или повреждённой еде',
        ),
        description: localized(
          '누락된 메뉴와 잘못 온 주문, 새거나 쏟아진 음식, 이물질을 사실 중심으로 알리고 재배송을 확인해요.',
          'Yetishmagan taom, noto‘g‘ri buyurtma, to‘kilgan ovqat yoki begona jismni fakt bilan aytib, qayta yetkazishni aniqlang.',
          'Report missing items, wrong orders, leaks, spills, or foreign matter using facts and confirm redelivery.',
          'Сообщайте о недостающих блюдах, неверном заказе, протечке, пролитой еде или постороннем предмете и уточняйте повторную доставку.',
        ),
        icon: 'warning-outline',
        proficiency: ExpressionProficiency.INTERMEDIATE,
        expressions: [
          ...rows([
            ['one-menu-item-missing', '주문한 메뉴 하나가 빠졌어요.', 'jumunhan menyu hanaga ppajyeosseoyo', '주문 메뉴 하나가 누락됐다고 말하는 표현', 'Buyurtmadagi bitta taom yetishmasligini aytish', 'One item from my order is missing.', 'Одного блюда из заказа не хватает.'],
            ['received-different-order', '제가 주문한 것과 다른 음식이 왔어요.', 'jega jumunhan geotgwa dareun eumsigi wasseoyo', '주문과 다른 음식이 왔다고 말하는 표현', 'Buyurtmadagidan boshqa ovqat kelganini aytish', 'I received food different from what I ordered.', 'Мне привезли не ту еду, которую я заказывал(а).'],
            ['container-is-leaking', '용기에서 국물이 새고 있어요.', 'yongieseo gungmuri saego isseoyo', '용기에서 국물이 샌다고 말하는 표현', 'Idishdan suyuqlik oqayotganini aytish', 'Liquid is leaking from the container.', 'Из контейнера вытекает жидкость.'],
            ['food-was-spilled', '음식이 포장 안에서 쏟아졌어요.', 'eumsigi pojang aneseo ssodajyeosseoyo', '음식이 포장 안에서 쏟아졌다고 말하는 표현', 'Taom qadoq ichida to‘kilganini aytish', 'The food spilled inside the packaging.', 'Еда пролилась внутри упаковки.'],
            ['foreign-object-not-eaten', '이물질이 보여서 먹지 않았어요.', 'imuljiri boyeoseo meokji anasseoyo', '이물질을 발견해 음식을 먹지 않았다고 말하는 표현', 'Begona jism ko‘rinib, taom yeyilmaganini aytish', 'I saw a foreign object, so I did not eat the food.', 'Я увидел(а) посторонний предмет и не стал(а) есть.'],
            ['send-problem-photo', '문제 부분을 사진으로 보내 드릴게요.', 'munje bubuneul sajineuro bonae deurilgeyo', '문제 부분 사진을 보내겠다는 말', 'Muammoli joy suratini yuborishini aytish', 'I will send a photo of the problem.', 'Я отправлю фотографию проблемы.'],
            ['request-missing-item-redelivery', '빠진 메뉴를 다시 보내 주실 수 있나요?', 'ppajin menyureul dasi bonae jusil su innayo', '누락 메뉴 재배송을 요청하는 말', 'Yetishmagan taomni qayta yuborishni so‘rash', 'Could you redeliver the missing item?', 'Можете повторно доставить недостающее блюдо?'],
            ['my-drink-is-missing-casual', '내 음료가 빠졌어.', 'nae eumnyoga ppajyeosseo', '친한 사람에게 음료 누락을 알리는 말', 'Yaqin kishiga ichimlik yetishmasligini aytish', 'My drink is missing.', 'Мой напиток не положили.', ExpressionSpeechLevel.CASUAL],
          ], FOOD_ISSUE_CONTEXT, FOOD_CUSTOMER, FOOD_ISSUE_USAGE),
          ...rows([
            ['apologize-food-problem', '배달에 문제가 있어 죄송합니다.', 'baedare munjega isseo joesonghamnida', '배달 문제에 사과하는 말', 'Yetkazish muammosi uchun uzr so‘rash', 'We are sorry there was a problem with the delivery.', 'Извините за проблему с доставкой.'],
            ['verify-order-items', '주문 내역과 받은 메뉴를 확인해 주세요.', 'jumun naeyeokgwa badeun menyureul hwaginhae juseyo', '주문과 받은 메뉴를 확인해 달라는 말', 'Buyurtma va olingan taomni tekshirishni so‘rash', 'Please check the order record and the items received.', 'Проверьте, пожалуйста, заказ и полученные блюда.'],
            ['do-not-eat-questionable-food', '먹어도 안전한지 의심되면 드시지 마세요.', 'meogeodo anjeonhanji uisimdoemyeon deusiji maseyo', '안전이 의심되는 음식을 먹지 말라고 안내하는 말', 'Shubhali taomni yemaslikni aytish', 'If the food appears unsafe to eat, do not consume it.', 'Если еда выглядит непригодной, не ешьте её.'],
            ['redeliver-missing-item', '빠진 메뉴는 다시 보내 드리겠습니다.', 'ppajin menyuneun dasi bonae deurigetseumnida', '누락 메뉴를 재배송하겠다고 안내하는 말', 'Yetishmagan taom qayta yuborilishini aytish', 'We will redeliver the missing item.', 'Мы повторно доставим недостающее блюдо.'],
            ['redelivery-time-is-estimate', '재배송 시간은 확인 후 예상 시간을 알려 드릴게요.', 'jaebaesong siganeun hwagin hu yesang siganeul allyeo deurilgeyo', '확인 뒤 재배송 예상 시간을 안내하겠다는 말', 'Tekshiruvdan keyin qayta yetkazish vaqtini aytish', 'After checking, we will give you an estimated redelivery time.', 'После проверки мы сообщим примерное время повторной доставки.'],
            ['keep-packaging-for-check', '확인할 때까지 포장과 사진을 보관해 주세요.', 'hwaginhal ttaekkaji pojanggwa sajineul bogwanhae juseyo', '확인 전까지 포장과 사진 보관을 요청하는 말', 'Tekshiruvgacha qadoq va suratni saqlashni so‘rash', 'Please keep the packaging and photos until the issue is reviewed.', 'Сохраните упаковку и фотографии до проверки.'],
            ['report-through-official-support', '앱의 공식 고객센터로 문제를 접수해 주세요.', 'aebui gongsik gogaeksenteoro munjereul jeopsuhae juseyo', '공식 앱 고객센터에 문제 접수를 안내하는 말', 'Muammoni ilovaning rasmiy yordam xizmatiga yuborishni aytish', 'Please report the issue through the app’s official support channel.', 'Сообщите о проблеме через официальную поддержку приложения.'],
          ], FOOD_ISSUE_CONTEXT, RESTAURANT_OR_RIDER, FOOD_ISSUE_USAGE),
        ],
      },
      {
        code: 'coordinate-package-receipt',
        title: localized(
          '택배 도착과 수령 방식 조율하기',
          'Posilka kelishi va qabul usulini kelishish',
          'Coordinating package arrival and receipt',
          'Согласование прибытия и получения посылки',
        ),
        description: localized(
          '택배 도착 여부를 확인하고 비대면·직접 수령, 공동현관, 부재 시 보관 방법을 안전하게 조율해요.',
          'Posilka kelishini aniqlang va kontaktsiz yoki shaxsan olish, umumiy kirish hamda yo‘qlikdagi saqlashni xavfsiz kelishing.',
          'Check package arrival and safely coordinate contactless or direct handoff, building access, and storage while absent.',
          'Уточняйте прибытие и безопасно согласовывайте бесконтактную или личную передачу, вход и хранение при отсутствии.',
        ),
        icon: 'cube-outline',
        proficiency: ExpressionProficiency.ADVANCED,
        expressions: [
          ...rows([
            ['ask-package-arrival-estimate', '택배가 오늘 도착할 예정인가요?', 'taekbaega oneul dochakal yejeongingayo', '오늘 택배가 도착할 예정인지 묻는 말', 'Posilka bugun kelishi kutilayotganini so‘rash', 'Is the package expected to arrive today?', 'Ожидается ли посылка сегодня?'],
            ['request-front-door-dropoff', '택배는 문 앞 안전한 곳에 놓아 주세요.', 'taekbaeneun mun ap anjeonhan gose noa juseyo', '택배를 문 앞의 안전한 곳에 놓아 달라는 말', 'Posilkani eshik oldidagi xavfsiz joyga qo‘yishni so‘rash', 'Please leave the package in a safe place by the front door.', 'Оставьте, пожалуйста, посылку в безопасном месте у двери.'],
            ['contact-at-building-entrance', '공동현관 앞에 도착하면 연락해 주세요.', 'gongdonghyeongwan ape dochakamyeon yeollakhae juseyo', '공동현관 도착 시 연락을 요청하는 말', 'Umumiy kirishga kelganda bog‘lanishni so‘rash', 'Please contact me when you arrive at the building entrance.', 'Свяжитесь со мной, когда будете у входа в подъезд.'],
            ['receive-package-in-person', '이 택배는 직접 받을게요.', 'i taekbaeneun jikjeop badeulgeyo', '택배를 직접 받겠다고 말하는 표현', 'Posilkani shaxsan olishini aytish', 'I will receive this package in person.', 'Эту посылку я получу лично.'],
            ['recipient-not-home-now', '지금 집에 없어서 바로 받을 수 없어요.', 'jigeum jibe eopseoseo baro badeul su eopseoyo', '현재 부재중이라 바로 받을 수 없다고 말하는 표현', 'Hozir uyda yo‘qligi sabab darhol ololmasligini aytish', 'I am not home, so I cannot receive it right away.', 'Меня сейчас нет дома, поэтому я не могу сразу получить посылку.'],
            ['request-parcel-locker', '무인 택배함에 넣어 주세요.', 'muin taekbaehame neoeo juseyo', '무인 택배함 보관을 요청하는 말', 'Posilkani avtomatik shkafga qo‘yishni so‘rash', 'Please place it in the parcel locker.', 'Положите, пожалуйста, в постамат.'],
            ['avoid-shared-area-dropoff', '공용 공간에는 두지 말아 주세요.', 'gongyong gongganeneun duji mara juseyo', '공용 공간에 택배를 두지 말라고 요청하는 말', 'Posilkani umumiy joyda qoldirmaslikni so‘rash', 'Please do not leave it in a shared area.', 'Пожалуйста, не оставляйте её в общем помещении.'],
            ['leave-package-at-door-casual', '문 앞에 두고 가 줘.', 'mun ape dugo ga jwo', '친한 사람에게 택배를 문 앞에 두어 달라고 하는 말', 'Yaqin kishidan posilkani eshik oldida qoldirishni so‘rash', 'Leave the package at the door for me.', 'Оставь посылку у двери.', ExpressionSpeechLevel.CASUAL],
          ], PACKAGE_RECEIPT_CONTEXT, PACKAGE_RECIPIENT, PACKAGE_RECEIPT_USAGE),
          ...rows([
            ['courier-package-arrived', '택배 왔습니다.', 'taekbae wasseumnida', '택배 기사가 도착했음을 알리는 말', 'Kuryer posilka bilan kelganini aytish', 'I have arrived with your package.', 'Я прибыл с вашей посылкой.'],
            ['building-entrance-is-locked', '공동현관이 잠겨 있어 들어가기 어렵습니다.', 'gongdonghyeongwani jamgyeo isseo deureogagi eoryeopseumnida', '공동현관이 잠겨 있음을 알리는 말', 'Umumiy kirish qulfligini aytish', 'The building entrance is locked, so I cannot get in.', 'Вход в подъезд закрыт, поэтому я не могу войти.'],
            ['confirm-handoff-method', '어떤 방식으로 받으실지 공식 연락 경로로 확인할게요.', 'eotteon bangsigeuro badeusilji gongsik yeollak gyeongnoro hwaginhalgeyo', '공식 연락 경로로 수령 방식을 확인하는 말', 'Qabul usulini rasmiy aloqa orqali aniqlash', 'I will confirm the handoff method through the official contact channel.', 'Я уточню способ передачи через официальный канал связи.'],
            ['direct-handoff-required', '이 택배는 확인 후 직접 전달해야 합니다.', 'i taekbaeneun hwagin hu jikjeop jeondalhaeya hamnida', '확인 뒤 직접 전달이 필요한 택배라고 안내하는 말', 'Posilka tekshiruvdan so‘ng shaxsan topshirilishini aytish', 'This package must be handed over directly after verification.', 'Эту посылку нужно передать лично после проверки.'],
            ['package-placed-in-locker', '택배를 무인 택배함에 보관했습니다.', 'taekbaereul muin taekbaehame bogwanhaetseumnida', '택배함에 보관했음을 알리는 말', 'Posilka avtomatik shkafga qo‘yilganini aytish', 'I placed the package in the parcel locker.', 'Я поместил посылку в постамат.'],
            ['official-pickup-notice', '수령 안내는 공식 메시지로 보내 드릴게요.', 'suryeong annaeneun gongsik mesijiro bonae deurilgeyo', '수령 안내를 공식 메시지로 보내겠다는 말', 'Qabul ma’lumotini rasmiy xabarda yuborishni aytish', 'I will send the pickup instructions in an official message.', 'Я отправлю инструкции по получению официальным сообщением.'],
            ['arrange-next-delivery-attempt', '부재중이면 공식 고객센터를 통해 재배송 일정을 조율해 주세요.', 'bujaejungimyeon gongsik gogaeksenteoreul tonghae jaebaesong iljeongeul joyulhae juseyo', '부재 시 공식 경로로 재배송 일정 조율을 안내하는 말', 'Uyda bo‘lmaganda qayta yetkazish vaqtini rasmiy xizmat orqali kelishishni aytish', 'If you are absent, please arrange a redelivery schedule through official support.', 'Если вас нет, согласуйте повторную доставку через официальную поддержку.'],
          ], PACKAGE_RECEIPT_CONTEXT, COURIER_OR_SUPPORT, PACKAGE_RECEIPT_USAGE),
        ],
      },
      {
        code: 'verify-package-and-avoid-scams',
        title: localized(
          '배송 증빙 확인하고 사칭 연락 피하기',
          'Yetkazma tasdig‘ini tekshirish va firibgarlikdan saqlanish',
          'Verifying delivery proof and avoiding scams',
          'Проверка доставки и защита от мошенничества',
        ),
        description: localized(
          '송장과 보관함, 수령 사진, 잘못 온 택배를 확인하고 사칭 링크와 개인정보 요구에 안전하게 대응해요.',
          'Trek, shkaf, qabul surati va noto‘g‘ri posilkani tekshirib, soxta havola va shaxsiy ma’lumot so‘roviga xavfsiz javob bering.',
          'Verify tracking, lockers, delivery photos, and wrong packages while responding safely to fake links and data requests.',
          'Проверяйте трекинг, ячейку, фото доставки и чужие посылки и безопасно реагируйте на фальшивые ссылки и запросы данных.',
        ),
        icon: 'shield-checkmark-outline',
        proficiency: ExpressionProficiency.ADVANCED,
        expressions: [
          ...rows([
            ['ask-for-tracking-number', '택배사 운송장 번호를 확인할 수 있을까요?', 'taekbaesa unsongjang beonhoreul hwaginhal su isseulkkayo', '택배사 운송장 번호 확인을 요청하는 말', 'Tashuvchining rasmiy trek raqamini tekshirishni so‘rash', 'Could I check the carrier’s tracking number?', 'Можно проверить номер отслеживания службы доставки?'],
            ['marked-delivered-not-found', '배송 완료로 표시되지만 택배를 찾지 못했어요.', 'baesong wallyoro pyosidoejiman taekbaereul chatji motaesseoyo', '완료 표시에도 택배를 찾지 못했다고 말하는 표현', 'Yetkazildi deb ko‘rsatilsa ham posilka topilmaganini aytish', 'It is marked as delivered, but I cannot find the package.', 'Указано, что доставлено, но я не могу найти посылку.'],
            ['ask-parcel-locker-number', '택배함 번호는 어디에서 확인하나요?', 'taekbaeham beonhoneun eodieseo hwaginhanayo', '택배함 번호 확인 경로를 묻는 말', 'Shkaf raqamini qayerdan tekshirishni so‘rash', 'Where can I check the parcel locker number?', 'Где можно проверить номер ячейки?'],
            ['wrong-package-received', '제 이름이 아닌 택배가 도착했어요.', 'je ireumi anin taekbaega dochakaesseoyo', '다른 사람의 택배가 왔다고 알리는 말', 'Boshqa kishining posilkasi kelganini aytish', 'A package with someone else’s name arrived.', 'Пришла посылка не на моё имя.'],
            ['package-box-damaged', '택배 상자가 심하게 훼손되어 있어요.', 'taekbae sangjaga simhage hwesondoeeo isseoyo', '택배 상자가 심하게 손상됐다고 말하는 표현', 'Posilka qutisi qattiq shikastlanganini aytish', 'The package box is badly damaged.', 'Коробка посылки сильно повреждена.'],
            ['locker-code-not-received', '택배함 수령 인증번호를 아직 받지 못했어요.', 'taekbaeham suryeong injeungbeonhoreul ajik batji motaesseoyo', '택배함 수령 인증번호가 오지 않았다고 말하는 표현', 'Posilka shkafining rasmiy olish kodi hali kelmaganini aytish', 'I have not received the official parcel-locker pickup code yet.', 'Я ещё не получил(а) официальный код получения из постамата.'],
            ['suspicious-delivery-link', '택배사처럼 보이는 낯선 링크가 왔어요.', 'taekbaesacheoreom boineun natseon ringkeuga wasseoyo', '택배사를 사칭한 듯한 링크를 알리는 말', 'Tashuvchiga o‘xshagan shubhali havola kelganini aytish', 'I received an unfamiliar link that looks like it came from a carrier.', 'Мне пришла незнакомая ссылка, похожая на сообщение от службы доставки.'],
            ['refuse-share-verification-code', '인증번호나 결제정보는 알려 드릴 수 없어요.', 'injeungbeonhona gyeolje jeongboneun allyeo deuril su eopseoyo', '인증번호와 결제정보 제공을 거절하는 말', 'Tasdiqlash kodi va to‘lov ma’lumotini berishni rad etish', 'I cannot share verification codes or payment information.', 'Я не могу сообщить код подтверждения или платёжные данные.'],
          ], PACKAGE_SAFETY_CONTEXT, PACKAGE_RECIPIENT, PACKAGE_SAFETY_USAGE),
          ...rows([
            ['check-official-delivery-photo', '공식 앱에서 배송 사진을 확인해 주세요.', 'gongsik aebeseo baesong sajineul hwaginhae juseyo', '공식 앱에서 배송 사진 확인을 안내하는 말', 'Rasmiy ilovada yetkazma suratini tekshirishni aytish', 'Please check the delivery photo in the official app.', 'Проверьте фотографию доставки в официальном приложении.'],
            ['verify-masked-recipient-name', '가려진 수령인 이름과 주소 일부만 확인할게요.', 'garyeojin suryeongin ireumgwa juso ilbuman hwaginhalgeyo', '가려진 이름과 주소 일부만 확인하는 말', 'Yashirilgan ism va manzilning faqat bir qismini tekshirish', 'I will verify only the masked recipient name and part of the address.', 'Я проверю только скрытое имя получателя и часть адреса.'],
            ['report-wrong-package-officially', '잘못 온 택배는 개봉하지 말고 공식 고객센터에 알려 주세요.', 'jalmot on taekbaeneun gaebonghaji malgo gongsik gogaeksenteoe allyeo juseyo', '오배송 택배를 개봉하지 않고 공식 신고하도록 안내하는 말', 'Noto‘g‘ri posilkani ochmay, rasmiy yordamga bildirishni aytish', 'Do not open a wrongly delivered package; report it to official support.', 'Не открывайте ошибочно доставленную посылку и сообщите в официальную поддержку.'],
            ['send-locker-code-officially', '택배함 수령 인증번호는 공식 알림으로만 보내 드립니다.', 'taekbaeham suryeong injeungbeonhoneun gongsik allimeuroman bonae deurimnida', '택배함 수령 인증번호를 공식 알림으로만 보낸다고 안내하는 말', 'Posilka shkafining olish kodi faqat rasmiy bildirishnomada yuborilishini aytish', 'We send parcel-locker pickup codes only through official notifications.', 'Код получения из постамата отправляется только официальным уведомлением.'],
            ['never-share-building-passcode', '공동현관 비밀번호는 공개 메시지에 남기지 마세요.', 'gongdonghyeongwan bimilbeonhoneun gonggae mesijie namgiji maseyo', '공동현관 비밀번호 공개를 막는 안내', 'Umumiy kirish parolini ochiq xabarda qoldirmaslikni aytish', 'Do not leave the building passcode in a public message.', 'Не оставляйте код подъезда в открытом сообщении.'],
            ['verify-through-official-carrier', '링크를 누르지 말고 택배사 공식 앱이나 대표 번호로 확인해 주세요.', 'ringkeureul nureuji malgo taekbaesa gongsik aebina daepyo beonhoro hwaginhae juseyo', '낯선 링크 대신 공식 경로 확인을 안내하는 말', 'Havolani bosmay, tashuvchining rasmiy ilovasi yoki raqamidan tekshirishni aytish', 'Do not open the link; verify through the carrier’s official app or main number.', 'Не переходите по ссылке; проверьте через официальное приложение или основной номер службы.'],
            ['record-incident-next-step', '접수 내용을 기록하고 다음 확인 절차를 안내해 드릴게요.', 'jeopsu naeyongeul girokhago daeum hwagin jeolchareul annaehae deurilgeyo', '문제 접수 기록과 다음 확인 절차를 안내하는 말', 'Murojaatni yozib, keyingi tekshiruv tartibini aytish', 'I will record the report and explain the next verification step.', 'Я зафиксирую обращение и объясню следующий этап проверки.'],
          ], PACKAGE_SAFETY_CONTEXT, COURIER_OR_SUPPORT, PACKAGE_SAFETY_USAGE),
        ],
      },
    ],
  });
}

export const ORDERING_DELIVERY_FOOD_AND_RECEIVING_PACKAGES_TOPIC =
  buildOrderingDeliveryFoodAndReceivingPackagesTopic();
