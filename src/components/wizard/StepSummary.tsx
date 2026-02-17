'use client';

import { useOrderStore } from '@/store/useOrderStore';
import { useTranslation, type TranslationKey } from '@/lib/i18n';
import { MODELS, COLORS, ACCESSORIES, formatPrice } from '@/lib/data';
import Button from '@/components/ui/Button';

export default function StepSummary() {
  const store = useOrderStore();
  const { t } = useTranslation(store.language);

  const modelData = MODELS.find((m) => m.id === store.model);
  const colorData = COLORS.find((c) => c.id === store.color);
  const basePrice = modelData?.salePrice || modelData?.basePrice || 0;
  const colorSurcharge = colorData?.surcharge || 0;
  const accessoriesTotal = store.accessories.reduce((sum, accId) => {
    const acc = ACCESSORIES.find((a) => a.id === accId);
    return sum + (acc?.price || 0);
  }, 0);
  const total = basePrice + colorSurcharge + accessoriesTotal;

  const isContactRequest = store.paymentMethod === 'request-contact';

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      {/* Success banner */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center animate-checkmark">
          <svg className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {isContactRequest ? t('summary.contactSuccess') : t('summary.success')}
        </h2>
        <p className="text-gray-500">
          {isContactRequest ? t('summary.contactSuccessMessage') : t('summary.successMessage')}
        </p>
      </div>

      {/* Order details */}
      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
        <div className="p-4 flex justify-between">
          <span className="text-gray-500">{t('summary.model')}</span>
          <span className="font-medium">{modelData?.nameKey}</span>
        </div>

        <div className="p-4 flex justify-between">
          <span className="text-gray-500">{t('summary.color')}</span>
          <div className="flex items-center gap-2">
            {colorData && (
              <span
                className="w-4 h-4 rounded-full border border-gray-300 inline-block"
                style={{ backgroundColor: colorData.hex }}
              />
            )}
            <span className="font-medium">
              {colorData ? t(colorData.nameKey as TranslationKey) : '-'}
            </span>
          </div>
        </div>

        <div className="p-4 flex justify-between">
          <span className="text-gray-500">{t('summary.accessories')}</span>
          <span className="font-medium text-right">
            {store.accessories.length > 0
              ? store.accessories
                  .map((accId) => {
                    const acc = ACCESSORIES.find((a) => a.id === accId);
                    return acc ? t(acc.nameKey as TranslationKey) : '';
                  })
                  .join(', ')
              : t('summary.none')}
          </span>
        </div>

        <div className="p-4 flex justify-between">
          <span className="text-gray-500">{t('summary.buyerType')}</span>
          <span className="font-medium">
            {store.buyerType === 'individual' ? t('buyer.individual') : t('buyer.company')}
          </span>
        </div>

        <div className="p-4">
          <span className="text-gray-500 block mb-2">{t('summary.buyerInfo')}</span>
          {store.buyerType === 'individual' ? (
            <div className="text-sm space-y-1">
              <p className="font-medium">{store.personalInfo.firstName} {store.personalInfo.lastName}</p>
              <p className="text-gray-600">{store.personalInfo.street}</p>
              <p className="text-gray-600">{store.personalInfo.postalCode} {store.personalInfo.city}</p>
              <p className="text-gray-600">{store.personalInfo.phone}</p>
              <p className="text-gray-600">{store.personalInfo.email}</p>
            </div>
          ) : (
            <div className="text-sm space-y-1">
              <p className="font-medium">{store.companyInfo.companyName}</p>
              <p className="text-gray-600">NIP: {store.companyInfo.nip}</p>
              <p className="text-gray-600">{store.companyInfo.representativeFirstName} {store.companyInfo.representativeLastName}</p>
              <p className="text-gray-600">{store.companyInfo.street}</p>
              <p className="text-gray-600">{store.companyInfo.postalCode} {store.companyInfo.city}</p>
              <p className="text-gray-600">{store.companyInfo.phone}</p>
              <p className="text-gray-600">{store.companyInfo.email}</p>
            </div>
          )}
        </div>

        {store.financing && (
          <div className="p-4 flex justify-between">
            <span className="text-gray-500">{t('summary.financing')}</span>
            <span className="font-medium">
              {t(`financing.${store.financing.option}` as TranslationKey)}
            </span>
          </div>
        )}

        <div className="p-4 flex justify-between">
          <span className="text-gray-500">{t('summary.payment')}</span>
          <span className="font-medium">
            {isContactRequest ? t('payment.requestContact') : t('payment.placeOrder')}
          </span>
        </div>

        {/* Price breakdown */}
        <div className="p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">{t('summary.basePrice')}</span>
            <span>{formatPrice(basePrice)} {t('price.currency')}</span>
          </div>
          {colorSurcharge > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{t('summary.colorSurcharge')}</span>
              <span>+{formatPrice(colorSurcharge)} {t('price.currency')}</span>
            </div>
          )}
          {accessoriesTotal > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{t('summary.accessories')}</span>
              <span>+{formatPrice(accessoriesTotal)} {t('price.currency')}</span>
            </div>
          )}
          <div className="border-t border-gray-200 pt-2 flex justify-between text-lg font-bold">
            <span>{t('summary.total')}</span>
            <span className="text-emerald-600">{formatPrice(total)} {t('price.currency')}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Button variant="outline" onClick={() => store.reset()}>
          {t('summary.newOrder')}
        </Button>
      </div>
    </div>
  );
}
