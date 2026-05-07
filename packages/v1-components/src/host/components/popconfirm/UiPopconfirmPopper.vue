<template>
    <UiPopper
        :id="popconfirmId + '-popper'"
        ref="popper"
        :visible="visible"
        :target-triggers="[]"
        :popper-triggers="[]"
        :global-triggers="['miss-click', 'reference-hidden']"
        :placement="placement"
        :offset-main-axis="16"
        :with-arrow="true"
        :class="['ui-v1-popconfirm', popperClass]"
        v-bind="{
            ...popperOptions,
            ...($slots['title'] || title ? { 'aria-labelledby': popconfirmId + '-title' } : {}),
        }"
        role="dialog"
        aria-modal="false"
        @update:visible="onUpdateVisible"
        @hide="onHide"
    >
        <div
            v-if="$slots['title'] || title"
            :id="popconfirmId + '-title'"
            class="ui-v1-popconfirm__title"
        >
            <!-- @slot Заголовок окна подтверждения -->
            <slot name="title">
                {{ title }}
            </slot>
        </div>

        <div class="ui-v1-popconfirm__content">
            <!-- @slot Описание подтверждаемого действия -->
            <slot />
        </div>

        <div class="ui-v1-popconfirm__footer">
            <UiButton
                :appearance="cancelAppearance"
                :variant="cancelVariant"
                :size="buttonSize"
                @click="onCancel"
            >
                <!-- @slot Текст кнопки отмены -->
                <slot name="cancel-text">
                    {{ cancelTitle ?? i18n.t('cancel') }}
                </slot>
            </UiButton>

            <UiButton
                :size="buttonSize"
                :variant="okVariant"
                @click="onOk"
            >
                <!-- @slot Текст кнопки подтверждения -->
                <slot name="ok-text">
                    <IconDeleteOutlined v-if="okVariant === VARIANT.DANGER" />

                    {{ okTitle ?? (okVariant === VARIANT.DANGER ? i18n.t('remove') : i18n.t('ok')) }}
                </slot>
            </UiButton>
        </div>
    </UiPopper>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

import type { I18nLocalized } from '@/host/i18n'
import type {
  UiPopconfirmPopperMethods,
  UiPopconfirmPopperOptions,
  UiPopconfirmPopperProperties,
} from '@/common/components/popconfirm'

import {
  computed,
  inject,
  ref,
  useId,
} from 'vue'

import IconDeleteOutlined from '~assets/sprites/ui/delete-outlined.svg'

import UiButton from '@/host/components/button/UiButton.vue'
import UiPopper from '@/host/components/popper/UiPopper.vue'

import { APPEARANCE } from '@/common/components/button'
import { I18nInjectKey } from '@/host/i18n/plugin'
import { isPlacementLiteral, isPlacementOptions } from '@/common/components/popper'
import { SIZE, VARIANT } from '@/common/components/button'

import _i18n from './i18n'

const props = defineProps({
  /** Атрибут id корневого элемента окна подтверждения. Должен быть уникальным на странице */
  id: {
    type: String as PropType<UiPopconfirmPopperProperties['id']>,
    default: undefined,
  },

  /** Флаг для ручного переключения видимости */
  visible: {
    type: Boolean,
    default: false,
  },

  /** Заголовок окна подтверждения */
  title: {
    type: String,
    default: '',
  },

  /** Регулирует цветовую схему кнопки подтверждения */
  okVariant: {
    type: String as PropType<UiPopconfirmPopperProperties['okVariant']>,
    validator: (variant: string) => Object.values(VARIANT).includes(variant as VARIANT),
    default: VARIANT.DEFAULT,
  },

  /** Текст кнопки подтверждения действия */
  okTitle: {
    type: null as unknown as PropType<UiPopconfirmPopperProperties['okTitle']>,
    default: null,
  },

  /** Текст кнопки отмены действия */
  cancelTitle: {
    type: null as unknown as PropType<UiPopconfirmPopperProperties['cancelTitle']>,
    default: null,
  },

  /** Внешний вид кнопки отмены */
  cancelAppearance: {
    type: String as PropType<UiPopconfirmPopperProperties['cancelAppearance']>,
    validator: (value: string) => Object.values(APPEARANCE).includes(value as APPEARANCE),
    default: APPEARANCE.SECONDARY,
  },

  /** Цветовая схема кнопки отмены */
  cancelVariant: {
    type: String as PropType<UiPopconfirmPopperProperties['cancelVariant']>,
    validator: (value: string) => Object.values(VARIANT).includes(value as VARIANT),
    default: VARIANT.DEFAULT,
  },

  /** Размер кнопок */
  buttonSize: {
    type: String as PropType<UiPopconfirmPopperProperties['buttonSize']>,
    validator: (value: string) => Object.values(SIZE).includes(value as SIZE),
    default: SIZE.XS,
  },

  /**
   * Сторона цели, у которой появится окно подтверждения,
   * или подробный объект настройки положения и адаптации положения при нехватке места
   */
  placement: {
    type: [String, Object] as PropType<UiPopconfirmPopperProperties['placement']>,
    validator: (value: unknown) => isPlacementLiteral(value) || isPlacementOptions(value),
    default: 'bottom-start',
  },

  /** Классы для контейнера окна подтверждения */
  popperClass: {
    type: null as unknown as PropType<UiPopconfirmPopperProperties['popperClass']>,
    default: null,
  },

  /** Набор свойств плавающего элемента. See @/common/components/popper */
  popperOptions: {
    type: Object as PropType<UiPopconfirmPopperOptions>,
    default: () => ({}),
  },

  /** Локаль переводимых текстов */
  locale: {
    type: String as PropType<UiPopconfirmPopperProperties['locale']>,
    default: undefined,
  },
})

const emit = defineEmits<{
  'update:visible': [visible: boolean];
  'toggle': [visible: boolean];
  'cancel': [];
  'ok': [];
}>()

const uid = 'embed-ui-' + useId()
const popconfirmId = computed(() => props.id ?? uid)
const popper = ref<InstanceType<typeof UiPopper> | null>(null)

const i18nBus = inject(I18nInjectKey, null)
const i18n = computed((): I18nLocalized => _i18n.init(
  props.locale ?? i18nBus?.locale ?? _i18n.fallback
))

const onUpdateVisible = (visible: boolean) => {
  emit('update:visible', visible)
  emit('toggle', visible)
}

const onCancel = () => {
  emit('cancel')
  emit('update:visible', false)
}

const onOk = () => {
  emit('ok')
  emit('update:visible', false)
}

const onHide = (reason: 'generic' | 'by-miss-click') => {
  if (reason === 'by-miss-click') {
    emit('cancel')
  }
}

defineExpose({
  adjust: async () => {
    await popper.value?.adjust()
  },
  close: () => popper.value?.hide(),
  dispose: () => popper.value?.dispose(),
  open: () => popper.value?.show(),
} satisfies UiPopconfirmPopperMethods)
</script>

<style lang="less" src="./popconfirm.less" />
