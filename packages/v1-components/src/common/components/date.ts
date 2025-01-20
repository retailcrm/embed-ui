export type Locale = 'en-GB' | 'es-ES' | 'ru-RU'

export type UiDateProperties = {
  date: Date | string;
  withTime: boolean;
  locale?: Locale;
}
