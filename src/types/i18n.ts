export type LanguageCode = 'es' | 'en' | 'ja' | 'it' | 'fr' | 'zh' | 'de';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  category: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'es', name: 'Español', nativeName: 'Español', flag: '🇪🇸', category: 'Global' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', category: 'Global Design Standard' },
  { code: 'ja', name: 'Japonés', nativeName: '日本語', flag: '🇯🇵', category: 'Streetwear & Anime Hub' },
  { code: 'it', name: 'Italiano', nativeName: 'Italiano', flag: '🇮🇹', category: 'Milán Moda & Interiores' },
  { code: 'fr', name: 'Francés', nativeName: 'Français', flag: '🇫🇷', category: 'París Alta Costura' },
  { code: 'zh', name: 'Chino', nativeName: '中文 (简体)', flag: '🇨🇳', category: 'B2B Sourcing & Fábricas' },
  { code: 'de', name: 'Alemán', nativeName: 'Deutsch', flag: '🇩🇪', category: 'Diseño Industrial & Bauhaus' },
];
