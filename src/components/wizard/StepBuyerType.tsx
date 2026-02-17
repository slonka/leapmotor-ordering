'use client';

import { useOrderStore } from '@/store/useOrderStore';
import { useTranslation } from '@/lib/i18n';
import Card from '@/components/ui/Card';

export default function StepBuyerType() {
  const { buyerType, setBuyerType, nextStep, language } = useOrderStore();
  const { t } = useTranslation(language);

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('buyer.title')}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <Card
          selected={buyerType === 'individual'}
          onClick={() => {
            setBuyerType('individual');
            setTimeout(() => nextStep(), 300);
          }}
          className="p-8 text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-50 flex items-center justify-center">
            <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{t('buyer.individual')}</h3>
          <p className="text-sm text-gray-500">{t('buyer.individual.desc')}</p>
        </Card>

        <Card
          selected={buyerType === 'company'}
          onClick={() => {
            setBuyerType('company');
            setTimeout(() => nextStep(), 300);
          }}
          className="p-8 text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-50 flex items-center justify-center">
            <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{t('buyer.company')}</h3>
          <p className="text-sm text-gray-500">{t('buyer.company.desc')}</p>
        </Card>
      </div>
    </div>
  );
}
