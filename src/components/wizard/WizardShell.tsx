'use client';

import { useOrderStore, WIZARD_STEPS } from '@/store/useOrderStore';
import { useTranslation, type TranslationKey } from '@/lib/i18n';
import LanguageToggle from '@/components/ui/LanguageToggle';
import PriceSummary from '@/components/PriceSummary';
import Button from '@/components/ui/Button';
import StepModel from './StepModel';
import StepColor from './StepColor';
import StepAccessories from './StepAccessories';
import StepBuyerType from './StepBuyerType';
import StepPersonalInfo from './StepPersonalInfo';
import StepCompanyInfo from './StepCompanyInfo';
import StepFinancing from './StepFinancing';
import StepPayment from './StepPayment';
import StepSummary from './StepSummary';

function canAdvance(step: number, store: ReturnType<typeof useOrderStore.getState>): boolean {
  switch (WIZARD_STEPS[step]) {
    case 'model':
      return store.model !== null;
    case 'color':
      return store.color !== null;
    case 'accessories':
      return true;
    case 'buyer-type':
      return store.buyerType !== null;
    case 'details':
      if (store.buyerType === 'individual') {
        const p = store.personalInfo;
        return !!(p.firstName && p.lastName && p.pesel && p.street && p.city && p.postalCode && p.phone && p.email);
      }
      if (store.buyerType === 'company') {
        const c = store.companyInfo;
        return !!(c.representativeFirstName && c.representativeLastName && c.nip && c.companyName && c.phone && c.email);
      }
      return false;
    case 'financing':
      return store.financing !== null;
    case 'payment':
      return store.paymentMethod !== null;
    case 'summary':
      return true;
    default:
      return false;
  }
}

export default function WizardShell() {
  const store = useOrderStore();
  const { t } = useTranslation(store.language);
  const currentStepId = WIZARD_STEPS[store.currentStep];
  const isSummary = currentStepId === 'summary';

  const renderStep = () => {
    switch (currentStepId) {
      case 'model':
        return <StepModel />;
      case 'color':
        return <StepColor />;
      case 'accessories':
        return <StepAccessories />;
      case 'buyer-type':
        return <StepBuyerType />;
      case 'details':
        return store.buyerType === 'company' ? <StepCompanyInfo /> : <StepPersonalInfo />;
      case 'financing':
        return <StepFinancing />;
      case 'payment':
        return <StepPayment />;
      case 'summary':
        return <StepSummary />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                {t('header.title')}
              </h1>
              <span className="hidden sm:inline text-sm text-gray-400">|</span>
              <span className="hidden sm:inline text-sm text-gray-500">
                {t('header.subtitle')}
              </span>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Step indicator */}
      {!isSummary && (
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
              {WIZARD_STEPS.map((step, index) => {
                const isActive = index === store.currentStep;
                const isCompleted = index < store.currentStep;
                const isClickable = index < store.currentStep;

                return (
                  <button
                    key={step}
                    onClick={() => isClickable && store.goToStep(index)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-emerald-100 text-emerald-700'
                        : isCompleted
                          ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          : 'text-gray-400'
                    }`}
                    disabled={!isClickable && !isActive}
                  >
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isActive
                          ? 'bg-emerald-600 text-white'
                          : isCompleted
                            ? 'bg-gray-400 text-white'
                            : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {isCompleted ? (
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </span>
                    <span className="hidden sm:inline">
                      {t(`step.${step}` as TranslationKey)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div className="lg:flex lg:gap-8">
            {/* Step content */}
            <div className="flex-1 min-w-0">{renderStep()}</div>

            {/* Price sidebar (desktop) */}
            {!isSummary && store.model && (
              <div className="hidden lg:block w-72 shrink-0">
                <div className="sticky top-28">
                  <PriceSummary />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      {!isSummary && (
        <div className="sticky bottom-0 bg-white border-t border-gray-200 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between gap-4">
              {/* Mobile price summary */}
              {store.model && (
                <div className="lg:hidden">
                  <PriceSummary />
                </div>
              )}

              <div className="flex items-center gap-3 ml-auto">
                {store.currentStep > 0 && (
                  <Button variant="secondary" onClick={store.prevStep}>
                    {t('nav.back')}
                  </Button>
                )}
                <Button
                  onClick={store.nextStep}
                  disabled={!canAdvance(store.currentStep, store)}
                >
                  {store.currentStep === WIZARD_STEPS.length - 2
                    ? t('nav.finish')
                    : t('nav.next')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
