export const YANDEX_MAP_PLUGIN = {
  LOCATOR: 'locator',
} as const

export type YandexMapPluginType = typeof YANDEX_MAP_PLUGIN[keyof typeof YANDEX_MAP_PLUGIN]

export type YandexMapLocatorPlugin = {
  type: typeof YANDEX_MAP_PLUGIN.LOCATOR;
  url: string;
}

export type YandexMapPlugin = YandexMapLocatorPlugin

export type UiYandexMapProperties = {
  apiKey: string;
  address?: string;
  plugins?: YandexMapPlugin[];
}
