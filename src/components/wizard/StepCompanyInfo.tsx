'use client';

import { useState } from 'react';
import { useOrderStore } from '@/store/useOrderStore';
import { useTranslation } from '@/lib/i18n';
import { validateNip, lookupNip } from '@/lib/nipLookup';
import Input from '@/components/ui/Input';

export default function StepCompanyInfo() {
  const { companyInfo, setCompanyInfo, language } = useOrderStore();
  const { t } = useTranslation(language);
  const [lookupStatus, setLookupStatus] = useState<'idle' | 'loading' | 'found' | 'error'>('idle');

  const handleNipChange = async (value: string) => {
    const cleanValue = value.replace(/[-\s]/g, '').replace(/\D/g, '').slice(0, 10);
    setCompanyInfo({ nip: cleanValue });
    setLookupStatus('idle');

    if (cleanValue.length === 10 && validateNip(cleanValue)) {
      setLookupStatus('loading');
      const result = await lookupNip(cleanValue);
      if (result) {
        setCompanyInfo({
          companyName: result.companyName,
          street: result.street,
          city: result.city,
          postalCode: result.postalCode,
        });
        setLookupStatus('found');
      } else {
        setLookupStatus('error');
      }
    }
  };

  const nipError =
    companyInfo.nip.length === 10 && !validateNip(companyInfo.nip)
      ? t('company.nip.invalid')
      : undefined;

  const emailError =
    companyInfo.email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(companyInfo.email)
      ? t('personal.email.invalid')
      : undefined;

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('company.title')}</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
            {t('company.representative')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label={t('company.firstName')}
              value={companyInfo.representativeFirstName}
              onChange={(e) => setCompanyInfo({ representativeFirstName: e.target.value })}
              required
            />
            <Input
              label={t('company.lastName')}
              value={companyInfo.representativeLastName}
              onChange={(e) => setCompanyInfo({ representativeLastName: e.target.value })}
              required
            />
          </div>
        </div>

        <div>
          <Input
            label={t('company.nip')}
            value={companyInfo.nip}
            onChange={(e) => handleNipChange(e.target.value)}
            error={nipError}
            maxLength={10}
            inputMode="numeric"
          />
          {lookupStatus === 'loading' && (
            <p className="mt-1 text-sm text-blue-500 flex items-center gap-1">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {t('company.nip.lookup')}
            </p>
          )}
          {lookupStatus === 'found' && (
            <p className="mt-1 text-sm text-emerald-600">{t('company.nip.found')}</p>
          )}
          {lookupStatus === 'error' && (
            <p className="mt-1 text-sm text-red-500">{t('company.nip.notFound')}</p>
          )}
        </div>

        <Input
          label={t('company.companyName')}
          value={companyInfo.companyName}
          onChange={(e) => setCompanyInfo({ companyName: e.target.value })}
          required
        />

        <Input
          label={t('company.street')}
          value={companyInfo.street}
          onChange={(e) => setCompanyInfo({ street: e.target.value })}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={t('company.city')}
            value={companyInfo.city}
            onChange={(e) => setCompanyInfo({ city: e.target.value })}
            required
          />
          <Input
            label={t('company.postalCode')}
            value={companyInfo.postalCode}
            onChange={(e) => setCompanyInfo({ postalCode: e.target.value })}
            placeholder="00-000"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={t('company.phone')}
            value={companyInfo.phone}
            onChange={(e) => setCompanyInfo({ phone: e.target.value })}
            type="tel"
            required
          />
          <Input
            label={t('company.email')}
            value={companyInfo.email}
            onChange={(e) => setCompanyInfo({ email: e.target.value })}
            type="email"
            error={emailError}
            required
          />
        </div>
      </div>
    </div>
  );
}
