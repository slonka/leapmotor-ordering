'use client';

import { useOrderStore } from '@/store/useOrderStore';
import { useTranslation } from '@/lib/i18n';
import { validatePesel } from '@/lib/nipLookup';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function StepPersonalInfo() {
  const { personalInfo, setPersonalInfo, language } = useOrderStore();
  const { t } = useTranslation(language);

  const addCoOwner = () => {
    setPersonalInfo({
      coOwners: [...personalInfo.coOwners, { firstName: '', lastName: '', pesel: '' }],
    });
  };

  const removeCoOwner = (index: number) => {
    setPersonalInfo({
      coOwners: personalInfo.coOwners.filter((_, i) => i !== index),
    });
  };

  const updateCoOwner = (index: number, field: string, value: string) => {
    const updated = [...personalInfo.coOwners];
    updated[index] = { ...updated[index], [field]: value };
    setPersonalInfo({ coOwners: updated });
  };

  const peselError =
    personalInfo.pesel.length === 11 && !validatePesel(personalInfo.pesel)
      ? t('personal.pesel.invalid')
      : undefined;

  const emailError =
    personalInfo.email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)
      ? t('personal.email.invalid')
      : undefined;

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('personal.title')}</h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={t('personal.firstName')}
            value={personalInfo.firstName}
            onChange={(e) => setPersonalInfo({ firstName: e.target.value })}
            required
          />
          <Input
            label={t('personal.lastName')}
            value={personalInfo.lastName}
            onChange={(e) => setPersonalInfo({ lastName: e.target.value })}
            required
          />
        </div>

        <Input
          label={t('personal.pesel')}
          value={personalInfo.pesel}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '').slice(0, 11);
            setPersonalInfo({ pesel: val });
          }}
          error={peselError}
          maxLength={11}
          inputMode="numeric"
        />

        <Input
          label={t('personal.street')}
          value={personalInfo.street}
          onChange={(e) => setPersonalInfo({ street: e.target.value })}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={t('personal.city')}
            value={personalInfo.city}
            onChange={(e) => setPersonalInfo({ city: e.target.value })}
            required
          />
          <Input
            label={t('personal.postalCode')}
            value={personalInfo.postalCode}
            onChange={(e) => setPersonalInfo({ postalCode: e.target.value })}
            placeholder="00-000"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={t('personal.phone')}
            value={personalInfo.phone}
            onChange={(e) => setPersonalInfo({ phone: e.target.value })}
            type="tel"
            required
          />
          <Input
            label={t('personal.email')}
            value={personalInfo.email}
            onChange={(e) => setPersonalInfo({ email: e.target.value })}
            type="email"
            error={emailError}
            required
          />
        </div>

        {/* Co-owners */}
        {personalInfo.coOwners.map((coOwner, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-700">
                {t('personal.coOwner')} {index + 1}
              </h4>
              <Button variant="ghost" size="sm" onClick={() => removeCoOwner(index)}>
                {t('personal.removeCoOwner')}
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input
                label={t('personal.firstName')}
                value={coOwner.firstName}
                onChange={(e) => updateCoOwner(index, 'firstName', e.target.value)}
              />
              <Input
                label={t('personal.lastName')}
                value={coOwner.lastName}
                onChange={(e) => updateCoOwner(index, 'lastName', e.target.value)}
              />
            </div>
            <Input
              label={t('personal.pesel')}
              value={coOwner.pesel}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 11);
                updateCoOwner(index, 'pesel', val);
              }}
              error={
                coOwner.pesel.length === 11 && !validatePesel(coOwner.pesel)
                  ? t('personal.pesel.invalid')
                  : undefined
              }
              maxLength={11}
              inputMode="numeric"
            />
          </div>
        ))}

        <Button variant="outline" onClick={addCoOwner}>
          {t('personal.addCoOwner')}
        </Button>
      </div>
    </div>
  );
}
