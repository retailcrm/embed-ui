import pluralization_en_GB from './pluralization/en-GB'
import pluralization_es_ES from './pluralization/es-ES'
import pluralization_ru_RU from './pluralization/ru-RU'

type Maybe<T> = T | undefined
type Recursive<T> = T | {
  [key: string]: T | Recursive<T>
}

export type Locale = 'en-GB' | 'es-ES' | 'ru-RU'
export type Message = string
export type MessageRecord = Record<string, Recursive<Message>>
export type Computed<T> = (i18n: I18nLocalized, values: T) => string

export interface PluralizationRule {
  (choice: number, choicesLength: number): number
}

export type Options<L extends Locale = Locale, F extends L = L> = {
  messages?: Record<L, MessageRecord>;
  computed?: Record<string, Computed<unknown>>;
  pluralization?: Record<L, PluralizationRule>;
  fallback?: F;
}

const get = (messages: MessageRecord, path: string[]): Maybe<string|MessageRecord> => {
  let i = 0
  let slice = messages[path[0]]

  while (i < path.length) {
    if (typeof slice === 'string' && i + 1 === path.length) {
      return slice
    }

    if (typeof slice !== 'object') {
      return undefined
    }

    slice = slice[path[++i]]
  }

  return slice
}

const replace = (message: string, values: Record<string, unknown>) => {
  return Object.keys(values).reduce((message, key) => {
    const pattern = new RegExp(`\\{${key}\\}`, 'g')
    const replacement = String(values[key])

    return message.replace(pattern, replacement)
  }, message)
}

const compile = (
  messages: MessageRecord,
  path: string[],
  values: Maybe<Record<string, unknown>> = undefined
): Maybe<string|MessageRecord> => {
  const message = get(messages, path)
  if (typeof message === 'string' && values) {
    return replace(message, values)
  }

  return message
}

const fail = (message: string): never => {
  throw new Error(message)
}

const t = <L extends Locale>(
  locale: Maybe<L>,
  messages: Record<L, MessageRecord>,
  path: string,
  values: Maybe<Record<string, unknown>> = undefined
) => {
  const keys = path.split('.')
  if (locale) {
    const message = compile(messages[locale] ?? {}, keys, values)
    return typeof message !== 'object'
      ? message
      : fail(`Translation for "${locale}:${path}" is not translatable`)
  }

  return undefined
}

/**
 * @param {string} template Варианты множественных форм, разделенные знаком "|"
 * @param {number} choice Количество, по которому выбираем форму
 * @param {PluralizationRule} rule
 * @return {string} Выбранная форма
 */
const plural = (template: string, choice: number, rule: PluralizationRule) => {
  const forms = template.split('|')
  return forms[rule(choice, forms.length)]
}

class I18n<
  L extends Locale = Locale,
  F extends L = L,
  LP extends Locale = Locale,
  FP extends LP = LP,
> {
  private readonly parent: Maybe<I18n<LP, FP>>
  private readonly messages: Record<L, MessageRecord>
  private readonly computed: Record<string, Computed<unknown>>
  private readonly pluralization: Record<L, PluralizationRule>
  private readonly fallback: Maybe<F>

  constructor (
    options: Options<L, F> | undefined = undefined,
    parent: Maybe<I18n<LP, FP>> = undefined
  ) {
    this.parent = parent
    this.messages = options?.messages ?? {} as Record<L, MessageRecord>
    this.computed = options?.computed ?? {}
    this.pluralization = {
      'en-GB': pluralization_en_GB,
      'es-ES': pluralization_es_ES,
      'ru-RU': pluralization_ru_RU,
      ...(options?.pluralization ?? {} as Record<L, PluralizationRule>),
    }
    this.fallback = options?.fallback
  }

  t (
    locale: L,
    path: string,
    values: Maybe<Record<string, unknown>> = undefined
  ): string {
    try {
      const _t = (locale: Maybe<L>) => t(locale, this.messages, path, values)

      return _t(locale) ?? _t(this.fallback) ?? fail(`Translation for "${path}" does not exists`)
    } catch (e) {
      if (this.parent) {
        return this.parent.t(locale as unknown as LP, path, values)
      }

      throw e
    }
  }

  tc (
    locale: L,
    path: string,
    choice: number,
    values: Maybe<Record<string, unknown>> = undefined
  ): string {
    return plural(
      this.t(
        locale,
        path,
        values
      ),
      choice,
      this.pluralization[locale]
    )
  }

  compute (locale: L, key: string, values: unknown): string {
    const computed = this.computed[key]
    if (computed) {
      return computed(localize(this, locale), values)
    }

    if (this.parent) {
      return this.parent.compute(locale as unknown as LP, key, values)
    }

    return fail('Key ' + key + ' is not registered')
  }

  extend <
    LE extends L = L,
    FE extends LE = LE
  > (options: Options<LE, FE>): I18n<LE, FE, L, F> {
    return new I18n<LE, FE, L, F>({
      pluralization: this.pluralization,
      fallback: this.fallback as Maybe<FE>,
      ...options,
    }, this)
  }
}

export interface I18nLocalized {
  t (
    path: string,
    values?: Record<string, unknown>
  ): string;

  tc (
    path: string,
    choice: number,
    values?: Record<string, unknown>
  ): string;

  compute <T>(key: string, values: T): string;
}

export const localize = <
  L extends Locale = Locale,
  F extends L = L
>(i18n: I18n<L, F>, locale: L): I18nLocalized => ({
    t (path: string, values: Record<string, unknown> | undefined = undefined) {
      return i18n.t(locale, path, values)
    },

    tc (
      path: string,
      choice: number,
      values: Record<string, unknown> | undefined = undefined
    ) {
      return i18n.tc(locale, path, choice, values)
    },

    compute (key: string, values: unknown): string {
      return i18n.compute(locale, key, values)
    },
  })

export const fallback = 'en-GB' as const

export const define = (
  options: Options | undefined = undefined,
  parent: Maybe<I18n> = undefined
) => {
  const i18n = new I18n({
    ...options,
    fallback,
  }, parent)

  const extend = (i18n: I18n, options: Options | undefined = undefined) => options
    ? i18n.extend(options)
    : i18n

  return {
    i18n,
    init: (
      locale: Locale,
      options: Options | undefined = undefined
    ) => localize(
      extend(i18n, options),
      locale
    ),
    fallback,
  }
}

export default I18n
