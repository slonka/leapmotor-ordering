'use client';

import { useOrderStore } from '@/store/useOrderStore';
import { useTranslation, type TranslationKey } from '@/lib/i18n';
import { ACCESSORIES, formatPrice } from '@/lib/data';
import Card from '@/components/ui/Card';

export default function StepAccessories() {
  const { accessories, toggleAccessory, language } = useOrderStore();
  const { t } = useTranslation(language);

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('accessories.title')}</h2>
      <p className="text-gray-500 text-sm mb-6">{t('accessories.optional')}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ACCESSORIES.map((acc) => {
          const isSelected = accessories.includes(acc.id);
          return (
            <Card
              key={acc.id}
              selected={isSelected}
              onClick={() => toggleAccessory(acc.id)}
              className="p-5"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900">
                  {t(acc.nameKey as TranslationKey)}
                </h3>
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-emerald-500 border-emerald-500'
                      : 'border-gray-300'
                  }`}
                >
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>

              <p className="text-sm text-gray-500 mb-3">
                {t(acc.descriptionKey as TranslationKey)}
              </p>

              <p className="text-emerald-600 font-semibold">
                {formatPrice(acc.price)} {t('price.currency')}
              </p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
