import type { BotLang } from '../payments/providers/telegram-stars/telegram-stars.texts';

/**
 * 스티커팩 봇 메시지 (텔레그램 안에서 보이는 글). 앱 i18n 밖이라 4개 언어를 여기 둔다.
 */
type Key =
  | 'making'
  | 'ready'
  | 'updated'
  | 'add'
  | 'open'
  | 'expired'
  | 'notEnough'
  | 'upToDate'
  | 'failed'
  | 'busy'
  | 'wrongAccount'
  | 'title';

const TEXT: Record<BotLang, Record<Key, string>> = {
  uz: {
    making: '🎨 Stikerlaringizni chizyapmiz… bir necha soniya kuting.',
    ready:
      "🎉 Tayyor! Personajingizdan 8 ta stiker — koreyscha so'zlar bilan.\nPastdagi tugmani bosib to'plamni qo'shing.",
    updated:
      "✨ To'plam yangilandi! Uni qo'shgan hamma yangi personajingizni ko'radi.",
    add: "➕ Stikerlarni qo'shish",
    open: 'KORIO ni ochish',
    expired:
      '⏳ Bu havola eskirgan. KORIO ilovasida stikerlar sahifasidan qaytadan bosing.',
    notEnough:
      "💎 Olmos yetmayapti: {need} kerak, sizda {have}. Darslarda olmos to'plang!",
    upToDate: "✅ To'plamingiz allaqachon yangi.",
    failed:
      "😢 Stikerlarni yarata olmadik. Olmoslaringiz qaytarildi — birozdan keyin yana urinib ko'ring.",
    busy: '⏳ Stikerlaringiz hozir tayyorlanyapti — biroz kuting.',
    wrongAccount:
      "Bu havola boshqa Telegram hisobi uchun. KORIO ni o'z hisobingizdan oching.",
    title: 'KORIO stikerlari',
  },
  ko: {
    making: '🎨 스티커를 그리고 있어요… 몇 초만 기다려 주세요.',
    ready:
      '🎉 완성! 내 캐릭터 스티커 8장 — 한국어 한마디와 함께.\n아래 버튼을 눌러 스티커팩을 추가하세요.',
    updated:
      '✨ 스티커팩을 새 캐릭터로 바꿨어요! 추가해 둔 사람 모두에게 새 그림이 보여요.',
    add: '➕ 스티커 추가하기',
    open: 'KORIO 열기',
    expired: '⏳ 만료된 링크예요. KORIO 앱의 스티커 화면에서 다시 눌러 주세요.',
    notEnough:
      '💎 보석이 모자라요: {need}개 필요, 지금 {have}개. 레슨으로 보석을 모아 보세요!',
    upToDate: '✅ 스티커팩이 이미 최신이에요.',
    failed:
      '😢 스티커를 만들지 못했어요. 보석은 돌려드렸어요 — 잠시 뒤에 다시 해 주세요.',
    busy: '⏳ 지금 스티커를 만들고 있어요 — 잠시만요.',
    wrongAccount:
      '다른 텔레그램 계정용 링크예요. 내 계정에서 KORIO 를 열어 주세요.',
    title: 'KORIO 스티커',
  },
  en: {
    making: '🎨 Drawing your stickers… give us a few seconds.',
    ready:
      '🎉 Done! 8 stickers of your character — with Korean phrases.\nTap the button below to add the pack.',
    updated:
      '✨ Pack updated! Everyone who added it now sees your new character.',
    add: '➕ Add stickers',
    open: 'Open KORIO',
    expired:
      '⏳ This link has expired. Tap again on the stickers page in KORIO.',
    notEnough:
      '💎 Not enough gems: you need {need}, you have {have}. Earn gems in lessons!',
    upToDate: '✅ Your pack is already up to date.',
    failed:
      "😢 We couldn't make your stickers. Your gems were returned — please try again in a bit.",
    busy: '⏳ Your stickers are being made right now — hang on.',
    wrongAccount:
      'This link is for another Telegram account. Open KORIO from your own account.',
    title: 'KORIO stickers',
  },
  ru: {
    making: '🎨 Рисуем ваши стикеры… подождите пару секунд.',
    ready:
      '🎉 Готово! 8 стикеров с вашим персонажем — с корейскими фразами.\nНажмите кнопку ниже, чтобы добавить набор.',
    updated: '✨ Набор обновлён! Все, кто его добавил, видят нового персонажа.',
    add: '➕ Добавить стикеры',
    open: 'Открыть KORIO',
    expired:
      '⏳ Ссылка устарела. Нажмите ещё раз на странице стикеров в KORIO.',
    notEnough:
      '💎 Не хватает кристаллов: нужно {need}, у вас {have}. Зарабатывайте их на уроках!',
    upToDate: '✅ Ваш набор уже обновлён.',
    failed:
      '😢 Не удалось создать стикеры. Кристаллы вернули — попробуйте чуть позже.',
    busy: '⏳ Стикеры уже создаются — подождите немного.',
    wrongAccount:
      'Эта ссылка для другого аккаунта Telegram. Откройте KORIO со своего аккаунта.',
    title: 'Стикеры KORIO',
  },
};

export function stickerText(
  lang: BotLang,
  key: Key,
  vars: Record<string, string | number> = {},
): string {
  return TEXT[lang][key].replace(/\{(\w+)\}/g, (_, name: string) =>
    String(vars[name] ?? ''),
  );
}
