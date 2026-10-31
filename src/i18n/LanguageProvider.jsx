import { createContext, useContext, useMemo, useState } from 'react';
import { translations } from './translations';

const LanguageContext = createContext(null);

/**
 * Read { lang, t, toggleLang } from anywhere below <LanguageProvider>.
 * `t` is the translation object for the current language (see translations.js).
 */
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}

export default function LanguageProvider({ children, defaultLang = 'en' }) {
  const [lang, setLang] = useState(defaultLang);

  const value = useMemo(
    () => ({
      lang,
      t: translations[lang],
      toggleLang: () => setLang((prev) => (prev === 'en' ? 'es' : 'en')),
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
