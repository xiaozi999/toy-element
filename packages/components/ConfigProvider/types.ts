import type { Language, TranslatePair } from "@xiaozi-element/locale";

export interface ConfigProviderProps {
  locale?: Language;
  extendsI18nMsg?: TranslatePair;
}
