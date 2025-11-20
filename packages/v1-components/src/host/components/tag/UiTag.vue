<template>
    <div
        class="ui-v1-tag-wrapper"
        v-on="$attrs"
    >
        <div
            :class="{
                ['ui-v1-tag']: true,
                [`ui-v1-tag_size_${size}`]: true,
                ['ui-v1-tag_saturated']: saturated,
                ['ui-v1-tag_interactive']: interactive,
            }"
            :style="background ? { background } : {}"
            @mouseover.once="onHover"
        >
            <div
                v-if="$slots['icon'] || pinned"
                class="ui-v1-tag__icon"
            >
                <!-- @slot Иконка перед названием -->
                <slot name="icon">
                    <IconPinned />
                </slot>
            </div>

            <div
                ref="textRef"
                :style="textStyle"
                class="ui-v1-tag__content"
            >
                <div class="ui-v1-tag__content-inner">
                    <!-- @slot Название метки -->
                    <slot />
                </div>
            </div>

            <!--
                Срабатывает при клике на кнопку удаления
                @event remove
            -->
            <div
                v-if="removable || $slots['remove-icon']"
                class="ui-v1-tag__remove-icon"
                :aria-label="i18n.t('delete')"
                @click.stop="$emit('remove')"
            >
                <!-- @slot Иконка удаления -->
                <slot name="remove-icon">
                    <IconClear />
                </slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { I18nLocalized } from '@/host/i18n'
import type { PropType } from 'vue'

import {
  computed,
  inject,
  ref,
} from 'vue'

import IconClear from '~assets/sprites/actions/clear.svg'
import IconPinned from '~assets/sprites/map-and-places/pinned.svg'

import { I18nInjectKey } from '@/host/i18n/plugin'

import { deltaTransition, SIZE } from '@/common/components/tag'

import _i18n from './i18n'

const props = defineProps({
  /** Рамер */
  size: {
    type: String as unknown as PropType<SIZE>,
    default: SIZE.LG,
  },

  /** Слева выводим иконку закреплённого тега */
  pinned: {
    type: Boolean,
    default: false,
  },

  /** Доступна иконка удаления */
  removable: {
    type: Boolean,
    default: false,
  },

  /** Добавляет курсор и анимацию наведения */
  interactive: {
    type: Boolean,
    default: false,
  },

  /** Делает текст и иконки белыми, а также добавляет @blue-500 фон по-умолчанию */
  saturated: {
    type: Boolean,
    default: false,
  },

  /** Произвольный фоновый цвет */
  background: {
    type: String,
    default: null,
  },

  /** Анимация бегущей строки при наведении */
  ticker: {
    type: Boolean,
    default: true,
  },
})

defineEmits(['remove'])

const i18n = computed((): I18nLocalized => _i18n.init(inject(I18nInjectKey, null)?.locale ?? _i18n.fallback))

const textRef = ref<HTMLDivElement | null>(null)
const textStyle = ref({})

const onHover = (): void => {
  if (props.ticker && textRef.value) {
    textStyle.value = deltaTransition(textRef.value)
  }
}
</script>

<style lang="less" src="./tag.less" />
