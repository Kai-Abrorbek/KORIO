import { Injectable, Logger } from '@nestjs/common';
import type { CardReceiptOcr } from './card-payment-order.schema';

const OPENAI_CHAT_URL = 'https://api.openai.com/v1/chat/completions';

/** 영수증 읽기 모델. 비전이 되는 싼 모델이면 된다 */
const OCR_MODEL = () => process.env.CARD_OCR_MODEL?.trim() || 'gpt-4o-mini';

/** 모델이 돌려주는 값 */
export interface ReceiptFields {
  isReceipt: boolean | null;
  success: boolean | null;
  amount: number | null;
  dateTime: string | null;
  receiverCardLast4: string | null;
  senderCardLast4: string | null;
}

const nullable = (type: string) => ({ type: [type, 'null'] });

const RECEIPT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: [
    'isReceipt',
    'success',
    'amount',
    'dateTime',
    'receiverCardLast4',
    'senderCardLast4',
  ],
  properties: {
    isReceipt: nullable('boolean'),
    success: nullable('boolean'),
    amount: nullable('number'),
    dateTime: nullable('string'),
    receiverCardLast4: nullable('string'),
    senderCardLast4: nullable('string'),
  },
};

const SYSTEM = [
  'You read a screenshot of a money-transfer receipt from an Uzbek payment or bank app',
  '(Click, Payme, Uzum, Paynet, bank apps). Text may be Uzbek (Latin or Cyrillic), Russian or English.',
  'Return only what is visible. Use null when a field is not shown. Never guess.',
  '- isReceipt: true if this is a card-to-card transfer receipt or transaction detail screen.',
  '- success: true if it shows the transfer succeeded (e.g. "Muvaffaqiyatli", "Успешно", "Success"),',
  '  false if failed/cancelled/pending, null if not shown.',
  "- amount: the amount the receiver gets, in so'm, as a plain number (no commission/fee, no spaces).",
  '- dateTime: date and time exactly as shown, normalized to "YYYY-MM-DD HH:MM" when possible.',
  '- receiverCardLast4 / senderCardLast4: last 4 digits of the receiving / sending card if visible.',
].join('\n');

/**
 * 영수증 스크린샷 → 금액·날짜·카드 끝자리 (OpenAI 비전).
 *
 * ⚠️ **판단은 운영자가 한다.** 스크린샷은 쉽게 조작된다. 여기 결과는 승인
 *    메시지에 붙는 힌트("금액 일치 ✅")일 뿐, 이것만으로 자동 승인하지 않는다.
 *    키가 없거나 실패하면 null — 승인 흐름은 그대로 돈다.
 */
@Injectable()
export class CardReceiptOcrService {
  private readonly logger = new Logger(CardReceiptOcrService.name);

  get enabled() {
    return !!process.env.OPENAI_API_KEY?.trim();
  }

  async read(image: Buffer, mime: string): Promise<ReceiptFields | null> {
    const apiKey = process.env.OPENAI_API_KEY?.trim();
    if (!apiKey) return null;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 30_000);
    try {
      const res = await fetch(OPENAI_CHAT_URL, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: OCR_MODEL(),
          temperature: 0,
          messages: [
            { role: 'system', content: SYSTEM },
            {
              role: 'user',
              content: [
                {
                  type: 'image_url',
                  image_url: {
                    url: `data:${mime};base64,${image.toString('base64')}`,
                    detail: 'high',
                  },
                },
              ],
            },
          ],
          response_format: {
            type: 'json_schema',
            json_schema: {
              name: 'transfer_receipt',
              strict: true,
              schema: RECEIPT_SCHEMA,
            },
          },
        }),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        this.logger.warn(
          `영수증 읽기 실패 ${res.status}: ${text.slice(0, 200)}`,
        );
        return null;
      }
      const data = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const content = data.choices?.[0]?.message?.content;
      return content ? sanitizeReceipt(JSON.parse(content)) : null;
    } catch (error) {
      this.logger.warn(`영수증 읽기 오류: ${String(error)}`);
      return null;
    } finally {
      clearTimeout(timer);
    }
  }
}

const last4 = (v: unknown) => {
  const digits = typeof v === 'string' ? v.replace(/\D/g, '') : '';
  return digits.length >= 4 ? digits.slice(-4) : null;
};

/** 모델 출력은 믿지 않고 모양을 다시 잡는다 */
export function sanitizeReceipt(raw: unknown): ReceiptFields {
  const r = (raw ?? {}) as Record<string, unknown>;
  const bool = (v: unknown) => (typeof v === 'boolean' ? v : null);
  const amount =
    typeof r.amount === 'number' && Number.isFinite(r.amount) && r.amount > 0
      ? Math.round(r.amount)
      : null;
  return {
    isReceipt: bool(r.isReceipt),
    success: bool(r.success),
    amount,
    dateTime: typeof r.dateTime === 'string' ? r.dateTime.slice(0, 40) : null,
    receiverCardLast4: last4(r.receiverCardLast4),
    senderCardLast4: last4(r.senderCardLast4),
  };
}

/** 읽은 값을 주문과 맞춰 본다 */
export function compareReceipt(
  fields: ReceiptFields,
  order: { amount: number; baseAmount: number; payerLast4?: string },
  receivingLast4s: string[],
): CardReceiptOcr {
  const amount: CardReceiptOcr['checks']['amount'] =
    fields.amount == null
      ? 'unknown'
      : fields.amount === order.amount
        ? 'ok'
        : fields.amount === order.baseAmount
          ? 'base'
          : 'mismatch';
  const receiver: CardReceiptOcr['checks']['receiver'] =
    fields.receiverCardLast4 == null
      ? 'unknown'
      : receivingLast4s.includes(fields.receiverCardLast4)
        ? 'ok'
        : 'mismatch';
  const sender: CardReceiptOcr['checks']['sender'] =
    fields.senderCardLast4 == null || !order.payerLast4
      ? 'unknown'
      : fields.senderCardLast4 === order.payerLast4
        ? 'ok'
        : 'mismatch';
  return { ...fields, checks: { amount, receiver, sender } };
}
