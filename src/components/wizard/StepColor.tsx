'use client';

import { useOrderStore } from '@/store/useOrderStore';
import { useTranslation, type TranslationKey } from '@/lib/i18n';
import { COLORS, formatPrice } from '@/lib/data';
import Card from '@/components/ui/Card';

export default function StepColor() {
  const { color, setColor, nextStep, language } = useOrderStore();
  const { t } = useTranslation(language);

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('color.title')}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {COLORS.map((c) => (
          <Card
            key={c.id}
            selected={color === c.id}
            onClick={() => {
              setColor(c.id);
              setTimeout(() => nextStep(), 300);
            }}
            className="p-4 text-center"
          >
            <div
              className="w-full aspect-square rounded-lg mb-3 border border-gray-200"
              style={{ backgroundColor: c.hex }}
            />

            <h3 className="font-semibold text-gray-900 mb-1">
              {t(c.nameKey as TranslationKey)}
            </h3>

            <p className="text-sm">
              {c.surcharge > 0 ? (
                <span className="text-gray-600">
                  +{formatPrice(c.surcharge)} {t('price.currency')}
                </span>
              ) : (
                <span className="text-emerald-600 font-medium">{t('color.included')}</span>
              )}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
