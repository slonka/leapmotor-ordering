'use client';

import { useOrderStore } from '@/store/useOrderStore';
import { useTranslation, type TranslationKey } from '@/lib/i18n';
import { MODELS, COLORS, ACCESSORIES, formatPrice } from '@/lib/data';

export default function PriceSummary() {
  const { model, color, accessories, language } = useOrderStore();
  const { t } = useTranslation(language);

  const modelData = MODELS.find((m) => m.id === model);
  const colorData = COLORS.find((c) => c.id === color);

  const basePrice = modelData?.salePrice || modelData?.basePrice || 0;
  const colorSurcharge = colorData?.surcharge || 0;
  const accessoriesTotal = accessories.reduce((sum, accId) => {
    const acc = ACCESSORIES.find((a) => a.id === accId);
    return sum + (acc?.price || 0);
  }, 0);

  const total = basePrice + colorSurcharge + accessoriesTotal;

  if (!model) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-5">
      <h3 className="font-semibold text-gray-900 mb-3">{t('price.total')}</h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">{t('price.base')}</span>
          <div className="text-right">
            {modelData?.salePrice && (
              <span className="text-emerald-600 font-medium">
                {formatPrice(modelData.salePrice)} {t('price.currency')}
              </span>
            )}
            {modelData?.salePrice && modelData.basePrice > 0 && (
              <span className="text-gray-400 line-through text-xs ml-2">
                {formatPrice(modelData.basePrice)}
              </span>
            )}
          </div>
        </div>

        {colorSurcharge > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600">{t('summary.colorSurcharge')}</span>
            <span className="text-gray-900">
              +{formatPrice(colorSurcharge)} {t('price.currency')}
            </span>
          </div>
        )}

        {accessories.length > 0 &&
          accessories.map((accId) => {
            const acc = ACCESSORIES.find((a) => a.id === accId);
            if (!acc) return null;
            return (
              <div key={accId} className="flex justify-between">
                <span className="text-gray-600">{t(acc.nameKey as TranslationKey)}</span>
                <span className="text-gray-900">
                  +{formatPrice(acc.price)} {t('price.currency')}
                </span>
              </div>
            );
          })}

        <div className="border-t border-gray-200 pt-2 mt-2">
          <div className="flex justify-between font-semibold text-base">
            <span>{t('price.total')}</span>
            <span className="text-emerald-600">
              {formatPrice(total)} {t('price.currency')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
