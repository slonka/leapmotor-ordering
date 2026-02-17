'use client';

import { useOrderStore } from '@/store/useOrderStore';
import { useTranslation, type TranslationKey } from '@/lib/i18n';
import { MODELS, COLORS, ACCESSORIES, formatPrice } from '@/lib/data';
import type { FinancingOption, InsuranceChoice } from '@/lib/types';
import Card from '@/components/ui/Card';

interface FinancingCard {
  id: FinancingOption;
  forBuyer: ('individual' | 'company')[];
}

const FINANCING_OPTIONS: FinancingCard[] = [
  { id: 'cash', forBuyer: ['individual', 'company'] },
  { id: 'loan-50-50', forBuyer: ['individual', 'company'] },
  { id: 'loan-0-percent', forBuyer: ['individual', 'company'] },
  { id: 'loan-3x33', forBuyer: ['individual', 'company'] },
  { id: 'leasing-classic', forBuyer: ['company'] },
];

const INSURANCE_OPTIONS: { id: InsuranceChoice; nameKey: TranslationKey; descKey: TranslationKey }[] = [
  { id: 'dealer-1-percent', nameKey: 'financing.insurance.dealer', descKey: 'financing.insurance.dealer.desc' },
  { id: 'own', nameKey: 'financing.insurance.own', descKey: 'financing.insurance.own.desc' },
];

export default function StepFinancing() {
  const { financing, setFinancing, buyerType, model, color, accessories, language } =
    useOrderStore();
  const { t } = useTranslation(language);

  const modelData = MODELS.find((m) => m.id === model);
  const colorData = COLORS.find((c) => c.id === color);
  const basePrice = modelData?.salePrice || modelData?.basePrice || 0;
  const colorSurcharge = colorData?.surcharge || 0;
  const accessoriesTotal = accessories.reduce((sum, accId) => {
    const acc = ACCESSORIES.find((a) => a.id === accId);
    return sum + (acc?.price || 0);
  }, 0);
  const totalPrice = basePrice + colorSurcharge + accessoriesTotal;

  const availableOptions = FINANCING_OPTIONS.filter((opt) =>
    buyerType ? opt.forBuyer.includes(buyerType) : true
  );

  const getBreakdown = (optionId: FinancingOption) => {
    switch (optionId) {
      case 'cash':
        return {
          downPayment: totalPrice,
          details: `${formatPrice(totalPrice)} zł`,
        };
      case 'loan-50-50':
        return {
          downPayment: Math.round(totalPrice * 0.5),
          details: `${formatPrice(Math.round(totalPrice * 0.5))} zł ${t('financing.downPayment').toLowerCase()}, ${formatPrice(Math.round(totalPrice * 0.5))} zł po 12 mies.`,
        };
      case 'loan-0-percent':
        return {
          downPayment: Math.round(totalPrice * 0.6),
          details: `${formatPrice(Math.round(totalPrice * 0.6))} zł ${t('financing.downPayment').toLowerCase()}, ${formatPrice(Math.round((totalPrice * 0.4) / 24))} zł/mies. (24 mies.)`,
        };
      case 'loan-3x33':
        return {
          downPayment: Math.round(totalPrice * 0.33),
          details: `3 × ${formatPrice(Math.round(totalPrice * 0.33))} zł`,
        };
      case 'leasing-classic':
        return {
          downPayment: Math.round(totalPrice * 0.1),
          details: `${t('financing.downPayment')}: 10-45%, 24-60 ${t('financing.months')}`,
        };
      default:
        return { downPayment: 0, details: '' };
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('financing.title')}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableOptions.map((opt) => {
          const breakdown = getBreakdown(opt.id);
          const isSelected = financing?.option === opt.id;

          return (
            <Card
              key={opt.id}
              selected={isSelected}
              onClick={() => {
                setFinancing({ ...financing, option: opt.id });
              }}
              className="p-5"
            >
              <h3 className="font-semibold text-gray-900 mb-1">
                {t(`financing.${opt.id}` as TranslationKey)}
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                {t(`financing.${opt.id}.desc` as TranslationKey)}
              </p>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-700">{breakdown.details}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Insurance section */}
      <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">{t('financing.insurance.title')}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {INSURANCE_OPTIONS.map((ins) => {
          const isSelected = financing?.insurance === ins.id;

          return (
            <Card
              key={ins.id}
              selected={isSelected}
              onClick={() => {
                setFinancing({ ...financing, option: financing?.option ?? 'cash', insurance: ins.id });
              }}
              className="p-5"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                <div>
                  <h4 className="font-semibold text-gray-900">{t(ins.nameKey)}</h4>
                  <p className="text-sm text-gray-500">{t(ins.descKey)}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-400">{t('financing.stellantis')}</p>
      </div>
    </div>
  );
}
