<template>
    <UiTransition
        name="fade"
        @before-enter="onBeforeEnter"
        @before-leave="onBeforeLeave"
        @after-enter="onAfterEnter"
        @after-leave="onAfterLeave"
    >
        <div
            v-show="state.shown"
            ref="root"
            :aria-hidden="visibility !== 'shown' ? 'true' : 'false'"
            :aria-live="ariaLive"
            :class="{
                'ui-v1-alert': true,
                'ui-v1-alert_warning': variant === VARIANT.WARNING,
                'ui-v1-alert_success': variant === VARIANT.SUCCESS,
                'ui-v1-alert_danger': variant === VARIANT.DANGER,
                'ui-v1-alert_small': small,
            }"
            role="alert"
            v-bind="$attrs"
        >
            <slot name="icon">
                <div
                    v-if="variant"
                    class="ui-v1-alert__icon-outline"
                >
                    <div class="ui-v1-alert__icon">
                        <IconInfoOutlined v-if="variant === VARIANT.PRIMARY" />
                        <IconErrorOutlined v-else-if="variant === VARIANT.WARNING" />
                        <IconClearCircleOutlined v-else-if="variant === VARIANT.DANGER" />
                        <IconCheckmarkCircleOutlined v-else-if="variant === VARIANT.SUCCESS" />
                    </div>
                </div>
            </slot>

            <div
                :class="{
                    'ui-v1-alert__title': true,
                    'ui-v1-alert__title_ellipsis': ellipsis,
                    'ui-v1-alert__title_fluid': fluid,
                }"
            >
                <slot>{{ text }}</slot>
            </div>

            <button
                v-if="closable"
                aria-label="Close alert"
                class="ui-v1-alert__close"
                type="button"
                @click="state.shown = false"
            >
                <IconClear class="ui-v1-alert__close-icon" />
            </button>
        </div>
    </UiTransition>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

import {
  computed,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue'

import UiTransition from '@/host/components/transition/UiTransition.vue'

import IconCheckmarkCircleOutlined from '~assets/sprites/actions/checkmark-circle-outlined.svg'
import IconClear from '~assets/sprites/actions/clear.svg'
import IconClearCircleOutlined from '~assets/sprites/actions/clear-circle-outlined.svg'
import IconErrorOutlined from '~assets/sprites/alerts/error-outlined.svg'
import IconInfoOutlined from '~assets/sprites/actions/info-outlined.svg'

import { VARIANT } from '@/common/components/alert'

defineOptions({
  inheritAttrs: false,
})

type Visibility = 'showing' | 'shown' | 'hiding' | 'hidden'

const props = defineProps({
  /** Вариант оповещения */
  variant: {
    type: String as unknown as PropType<VARIANT>,
    default: VARIANT.PRIMARY,
    validator: (variant: string) => Object.values(VARIANT).includes(variant as VARIANT),
  },

  /** Текст оповещения */
  text: {
    type: String,
    default: '',
  },

  /** Показывать/скрывать alert */
  shown: {
    type: Boolean,
    default: true,
  },

  /** Показывать кнопку закрытия */
  closable: {
    type: Boolean,
    default: false,
  },

  /** Обрезка заголовка через многоточие */
  ellipsis: {
    type: Boolean,
    default: false,
  },

  /** Уменьшенный размер заголовка */
  small: {
    type: Boolean,
    default: false,
  },

  /** Скроллить alert в видимую область при появлении */
  scrollToAlert: {
    type: Boolean,
    default: false,
  },

  /** Поведение скролла для scrollIntoView */
  scrollBehavior: {
    type: String,
    default: 'smooth',
  },

  /** Убрать ограничение ширины контента */
  fluid: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([
  'showing',
  'shown',
  'hiding',
  'hidden',
])

const visibility = ref<Visibility>(props.shown ? 'shown' : 'hidden')
const state = reactive({
  shown: props.shown,
})

const root = ref<HTMLElement | null>(null)

const ariaLive = computed(() => ({
  [VARIANT.DANGER]: 'assertive',
  [VARIANT.PRIMARY]: 'off',
  [VARIANT.SUCCESS]: 'off',
  [VARIANT.WARNING]: 'polite',
}[props.variant] as 'off' | 'assertive' | 'polite'))

const scrollIntoView = (): void => {
  root.value?.scrollIntoView({
    behavior: props.scrollBehavior as 'auto' | 'instant' | 'smooth' | undefined,
  })
}

defineExpose({
  scrollIntoView,
})

const onBeforeEnter = () => {
  visibility.value = 'showing'
  emit('showing')
}

const onAfterEnter = () => {
  visibility.value = 'shown'
  emit('shown')
}

const onBeforeLeave = () => {
  visibility.value = 'hiding'
  emit('hiding')
}

const onAfterLeave = () => {
  visibility.value = 'hidden'
  emit('hidden')
}

watch(() => props.shown, (value: boolean) => {
  state.shown = value

  if (state.shown && props.scrollToAlert) {
    scrollIntoView()
  }
})

onMounted(() => {
  if (props.shown && props.scrollToAlert) {
    scrollIntoView()
  }
})
</script>

<style lang="less" src="./alert.less" />
