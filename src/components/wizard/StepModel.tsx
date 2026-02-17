'use client';

import Image from 'next/image';
import { useOrderStore } from '@/store/useOrderStore';
import { useTranslation } from '@/lib/i18n';
import { MODELS, formatPrice } from '@/lib/data';
import Card from '@/components/ui/Card';

export default function StepModel() {
  const { model, setModel, language } = useOrderStore();
  const { t } = useTranslation(language);

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('model.title')}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {MODELS.map((m) => (
          <Card
            key={m.id}
            selected={model === m.id}
            disabled={!m.available}
            onClick={() => m.available && setModel(m.id)}
            className="relative overflow-hidden p-4 lg:p-6"
          >
            {!m.available && (
              <div className="absolute inset-0 bg-gray-100/80 backdrop-blur-[1px] z-10 flex items-center justify-center">
                <span className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {t('model.comingSoon')}
                </span>
              </div>
            )}

            <div className="relative aspect-[4/3] mb-4">
              <Image
                src={m.image}
                alt={m.nameKey}
                fill
                className={`object-contain ${!m.available ? 'grayscale' : ''}`}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">{m.nameKey}</h3>

            {m.available && (
              <>
                <div className="mb-3">
                  {m.salePrice && (
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-emerald-600">
                        {t('model.from')} {formatPrice(m.salePrice)} zł
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        {formatPrice(m.basePrice)} zł
                      </span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-xs text-gray-500">{t('model.specs.power')}</p>
                    <p className="text-sm font-semibold">{m.specs.power}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-xs text-gray-500">{t('model.specs.range')}</p>
                    <p className="text-sm font-semibold">{m.specs.range}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-xs text-gray-500">{t('model.specs.battery')}</p>
                    <p className="text-sm font-semibold">{m.specs.battery}</p>
                  </div>
                </div>
              </>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
