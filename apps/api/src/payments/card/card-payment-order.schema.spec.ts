import { CardPaymentOrderSchema } from './card-payment-order.schema';

describe('CardPaymentOrderSchema', () => {
  it('loads union-typed payment fields as strings', () => {
    expect(CardPaymentOrderSchema.path('tier').instance).toBe('String');
    expect(CardPaymentOrderSchema.path('plan').instance).toBe('String');
    expect(CardPaymentOrderSchema.path('status').instance).toBe('String');
  });
});
