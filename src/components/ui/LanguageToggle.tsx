'use client';

import { useOrderStore } from '@/store/useOrderStore';

export default function LanguageToggle() {
  const { language, setLanguage } = useOrderStore();

  return (
    <div className="flex items-center gap-1 rounded-full bg-gray-100 p-0.5">
      <button
        onClick={() => setLanguage('pl')}
        className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer ${
          language === 'pl'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        PL
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer ${
          language === 'en'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        EN
      </button>
    </div>
  );
}
