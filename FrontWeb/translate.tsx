import { useContext, createContext } from 'react';
import { initReactI18next } from 'react-i18next';
import i18n, { Resource } from 'i18next';
import translationEN from './locales/en.json';
import translationFR from './locales/fr.json';

const resources: Record<string, Resource> = {
  fr: {
    translation: translationFR,
  },
  en: {
    translation: translationEN,
  },
};

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources,
    lng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

export const I18nContext = createContext<typeof i18n | undefined>(undefined);

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
