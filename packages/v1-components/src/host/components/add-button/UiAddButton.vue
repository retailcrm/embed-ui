<template>
    <button
        :type="type"
        :class="{
            'ui-v1-add-button': true,
            ['ui-v1-add-button_' + color]: true,
            'ui-v1-add-button_small': small,
            'ui-v1-add-button_disabled': disabled,
        }"
        :disabled="disabled"
        :style="small ? {} : {
            height: normalizeHeight(height),
        }"
        v-bind="$attrs"
    >
        <span class="ui-v1-add-button__content">
            <span class="ui-v1-add-button__title">
                <slot name="icon">
                    <IconAddCircle
                        aria-hidden="true"
                        class="ui-v1-add-button__icon"
                    />
                </slot>

                <slot />
            </span>

            <span
                v-if="!small && $slots.description"
                class="ui-v1-add-button__description"
            >
                <slot name="description" />
            </span>
        </span>
    </button>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

import IconAddCircle from '~assets/sprites/actions/add-circle.svg'

import { COLOR, normalizeHeight } from '@/common/components/add-button'

defineOptions({
  inheritAttrs: false,
})

defineProps({
  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button',
  },

  small: {
    type: Boolean,
    default: false,
  },

  color: {
    type: String as unknown as PropType<COLOR | `${COLOR}`>,
    validator: (color) => Object.values(COLOR).includes(color as COLOR),
    default: COLOR.GREEN,
  },

  disabled: {
    type: Boolean,
    default: false,
  },

  height: {
    type: [String, Number],
    default: 80,
  },
})
</script>

<style lang="less" src="./add-button.less" />
