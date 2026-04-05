import '@/host/components/field/field.less'

export * from '@/host/components'
export * from '@/host/provider'
export * from '@/common/components/table'
export {
  ANIMATION as SKELETON_ANIMATION,
  APPEARANCE as SKELETON_APPEARANCE,
  guessDimensionStyleValue as guessSkeletonDimensionStyleValue,
  SIZE as SKELETON_SIZE,
  type UiSkeletonProperties,
} from '@/common/components/skeleton'
export {
  APPEARANCE as RADIO_SWITCH_APPEARANCE,
  SIZE as RADIO_SWITCH_SIZE,
  type EqualPredicate,
  type Option,
  type UiRadioSwitchOptionProperties,
  type UiRadioSwitchOptionShellMethods,
  type UiRadioSwitchOptionShellProperties,
  type UiRadioSwitchProperties,
  type UiRadioSwitchRootProperties,
} from '@/common/components/radio-switch'
export {
  APPEARANCE as TAB_APPEARANCE,
  SIZE as TAB_SIZE,
  type TabFocusDirection,
  type TabItem,
  type TabLayout,
  type TabMoveFocusIntent,
  type UiTabGroupProperties,
  type UiTabProperties,
} from '@/common/components/tab'

export { default as I18nPlugin } from '@/host/i18n/plugin'
export { default as ModalPlugin } from '@/host/components/modal/plugin'

export { ImageWorkersKey } from '@/common/preview'

export { VueI18n } from '@/host/i18n/plugin'
