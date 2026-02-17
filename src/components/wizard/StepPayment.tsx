'use client';

import { useOrderStore } from '@/store/useOrderStore';
import { useTranslation } from '@/lib/i18n';
import {
  detectCardBrand,
  luhnCheck,
  validateExpiry,
  validateCVV,
  formatCardNumber,
  DEMO_CARD,
  type CardBrand,
} from '@/lib/cardValidation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

function CardBrandIcon({ brand }: { brand: CardBrand }) {
  const colors: Record<CardBrand, string> = {
    visa: '#1A1F71',
    mastercard: '#EB001B',
    amex: '#006FCF',
    unknown: '#9CA3AF',
  };

  const labels: Record<CardBrand, string> = {
    visa: 'VISA',
    mastercard: 'MC',
    amex: 'AMEX',
    unknown: '',
  };

  if (brand === 'unknown') return null;

  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold text-white"
      style={{ backgroundColor: colors[brand] }}
    >
      {labels[brand]}
    </span>
  );
}

export default function StepPayment() {
  const { paymentMethod, setPaymentMethod, cardPayment, setCardPayment, language } =
    useOrderStore();
  const { t } = useTranslation(language);

  const brand = detectCardBrand(cardPayment.cardNumber);
  const rawDigits = cardPayment.cardNumber.replace(/\s/g, '');
  const isCardComplete = rawDigits.length >= 13;

  const cardError =
    isCardComplete && !luhnCheck(cardPayment.cardNumber)
      ? t('payment.card.invalid')
      : undefined;

  const expiryError =
    cardPayment.expiryDate.length === 5 && !validateExpiry(cardPayment.expiryDate)
      ? t('payment.expiry.invalid')
      : undefined;

  const cvvError =
    cardPayment.cvv.length >= 3 && !validateCVV(cardPayment.cvv, brand)
      ? t('payment.cvv.invalid')
      : undefined;

  const fillDemoCard = () => {
    setCardPayment(DEMO_CARD);
  };

  const handleCardNumberChange = (value: string) => {
    setCardPayment({ cardNumber: formatCardNumber(value) });
  };

  const handleExpiryChange = (value: string) => {
    let cleaned = value.replace(/\D/g, '').slice(0, 4);
    if (cleaned.length >= 2) {
      cleaned = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    }
    setCardPayment({ expiryDate: cleaned });
  };

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('payment.title')}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card
          selected={paymentMethod === 'request-contact'}
          onClick={() => setPaymentMethod('request-contact')}
          className="p-6 text-center"
        >
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-50 flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">{t('payment.requestContact')}</h3>
          <p className="text-sm text-gray-500">{t('payment.requestContact.desc')}</p>
        </Card>

        <Card
          selected={paymentMethod === 'card-payment'}
          onClick={() => setPaymentMethod('card-payment')}
          className="p-6 text-center"
        >
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-50 flex items-center justify-center">
            <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">{t('payment.placeOrder')}</h3>
          <p className="text-sm text-gray-500">{t('payment.placeOrder.desc')}</p>
        </Card>
      </div>

      {paymentMethod === 'card-payment' && (
        <div className="animate-slide-up bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-gray-900">{t('payment.advance')}: {t('payment.advanceAmount')}</h3>
              <CardBrandIcon brand={brand} />
            </div>
            <Button variant="ghost" size="sm" onClick={fillDemoCard}>
              {t('payment.exampleCard')}
            </Button>
          </div>

          <div className="space-y-4">
            <Input
              label={t('payment.cardNumber')}
              value={cardPayment.cardNumber}
              onChange={(e) => handleCardNumberChange(e.target.value)}
              error={cardError}
              placeholder="0000 0000 0000 0000"
              maxLength={19}
              inputMode="numeric"
            />

            <Input
              label={t('payment.cardholderName')}
              value={cardPayment.cardholderName}
              onChange={(e) => setCardPayment({ cardholderName: e.target.value })}
              placeholder="Jan Kowalski"
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label={t('payment.expiryDate')}
                value={cardPayment.expiryDate}
                onChange={(e) => handleExpiryChange(e.target.value)}
                error={expiryError}
                placeholder="MM/RR"
                maxLength={5}
                inputMode="numeric"
              />
              <Input
                label={t('payment.cvv')}
                value={cardPayment.cvv}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, brand === 'amex' ? 4 : 3);
                  setCardPayment({ cvv: val });
                }}
                error={cvvError}
                placeholder={brand === 'amex' ? '0000' : '000'}
                maxLength={brand === 'amex' ? 4 : 3}
                inputMode="numeric"
                type="password"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
