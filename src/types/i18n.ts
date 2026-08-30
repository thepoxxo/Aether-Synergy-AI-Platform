export type LanguageCode =
  | 'es'
  | 'en'
  | 'ja'
  | 'it'
  | 'fr'
  | 'zh'
  | 'de'
  | 'pt'
  | 'ko'
  | 'ru'
  | 'ar'
  | 'hi'
  | 'nl'
  | 'tr'
  | 'pl'
  | 'sv'
  | string;

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  isPopular?: boolean;
}

export type TranslationKey = string;
