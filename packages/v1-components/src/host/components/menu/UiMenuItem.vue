<template>
    <div
        :class="{
            'ui-v1-menu-item': true,
            [`ui-v1-menu-item_${size}`]: true,
            'ui-v1-menu-item_accent': accent,
            'ui-v1-menu-item_active': active,
            'ui-v1-menu-item_danger': danger,
            'ui-v1-menu-item_simple': simple,
            'ui-v1-menu-item_disabled': disabled,
        }"
        v-bind="$attrs"
    >
        <div
            :class="{
                'ui-v1-menu-item__inner': true,
                'ui-v1-menu-item__inner_centered': $slots['avatar'] && !$slots['description'],
                'ui-v1-menu-item__inner_disabled': disabled,
            }"
            @mouseover.once="onHover"
        >
            <div
                v-if="$slots['avatar']"
                class="ui-v1-menu-item__avatar"
            >
                <!-- @slot Слот для аватара. Располагается слева -->
                <slot name="avatar" />
            </div>

            <div
                v-else-if="$slots['leading-icon']"
                class="ui-v1-menu-item__icon ui-v1-menu-item__icon_leading"
            >
                <!-- @slot Иконка слева -->
                <slot name="leading-icon" />
            </div>

            <div class="ui-v1-menu-item__content">
                <div class="ui-v1-menu-item__text">
                    <div
                        v-if="ticker"
                        ref="textRef"
                        :style="textStyle"
                        class="ui-v1-menu-item__ticker"
                    >
                        <!-- @slot Основной текст -->
                        <slot />
                    </div>
                    <template v-else>
                        <!-- @slot Основной текст -->
                        <slot />
                    </template>
                </div>

                <div
                    v-if="$slots['description'] || description"
                    class="ui-v1-menu-item__description"
                >
                    <!-- @slot Дополнительный текст -->
                    <slot name="description">
                        {{ description }}
                    </slot>
                </div>
            </div>

            <div
                v-if="counter !== null"
                class="ui-v1-menu-item__counter"
            >
                {{ counter }}
            </div>

            <div
                v-if="$slots['trailing-icon']"
                class="ui-v1-menu-item__icon ui-v1-menu-item__icon_trailing"
            >
                <!-- @slot Иконка справа -->
                <slot name="trailing-icon" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

import { ref } from 'vue'

import {
  deltaTransition,
  SIZE,
} from '@/common/components/menu'

const props = defineProps({
  /** Размер */
  size: {
    type: String as unknown as PropType<SIZE>,
    default: SIZE.MD,
  },

  /** Описание */
  description: {
    type: String,
    default: null,
  },

  /** Счетчик количества */
  counter: {
    type: null as unknown as PropType<string|number|null>,
    validator: (counter: unknown) => counter === null || ['string', 'number'].includes(typeof counter),
    default: null,
  },

  /** Жирное начертание */
  accent: {
    type: Boolean,
    default: false,
  },

  /** Состояние нажатия */
  active: {
    type: Boolean,
    default: false,
  },

  /** Индикация опасного действия */
  danger: {
    type: Boolean,
    default: false,
  },

  /** Анимация бегущей строки при наведении */
  ticker: {
    type: Boolean,
    default: false,
  },

  /** Делает заголовок синим и убирает внутренние отступы на корневом элементе */
  simple: {
    type: Boolean,
    default: false,
  },

  /** Заблокированный */
  disabled: {
    type: Boolean,
    default: false,
  },
})

const textRef = ref<HTMLDivElement | null>(null)
const textStyle = ref({})

const onHover = (): void => {
  if (props.ticker && textRef.value) {
    textStyle.value = deltaTransition(textRef.value)
  }
}
</script>

<style lang="less" src="./menu.less" />