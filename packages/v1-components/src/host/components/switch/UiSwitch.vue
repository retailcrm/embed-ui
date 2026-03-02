<template>
    <span
        :class="{
            'ui-v1-switch': true,
            'ui-v1-switch_square': square,
            'ui-v1-switch_checked': value,
            'ui-v1-switch_disabled': disabled,
        }"
        v-bind="pick($attrs, (key: string) => !key.startsWith('aria-') && !key.startsWith('on'))"
    >
        <input
            :id="id"
            ref="switcher"
            :checked="value"
            :disabled="disabled"
            :aria-checked="value ? 'true' : 'false'"
            :aria-disabled="disabled ? 'true' : undefined"
            v-bind="pick($attrs, (key: string) => key.startsWith('aria-') || key.startsWith('on'))"
            type="checkbox"
            role="switch"
            class="ui-v1-switch__input"
            @change="onChange"
        />

        <span class="ui-v1-switch__track">
            <span class="ui-v1-switch__handle">
                <IconDone
                    v-if="!square"
                    class="ui-v1-switch__icon"
                />
            </span>
        </span>
    </span>
</template>

<script lang="ts">
let counter = 0

export default {}
</script>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { UiSwitchMethods } from '@/common/components/switch'

import IconDone from '~assets/sprites/actions/done.svg'

import { pick } from '@/common/utils'
import { useElementRef } from '@/host/composables'

const props = defineProps({
  id: {
    type: null as unknown as PropType<string | undefined>,
    validator: (id: unknown) => id === undefined || typeof id === 'string' && id.length > 0 && /^[A-Za-z]/.test(id),
    default: () => 'ui-v1-switch-' + ++counter,
  },

  /** Включен/выключен */
  value: {
    type: Boolean,
    default: false,
  },

  /** Квадратная форма переключателя и прямоугольная у ползунка */
  square: {
    type: Boolean,
    default: false,
  },

  /** Заблокированный */
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([
  /** Смена состояния переключателя */
  'change',
  /** Смена состояния переключателя */
  'update:value',
])

const switcher = useElementRef<HTMLInputElement>()

const click = () => switcher.value?.click()
const focus = () => switcher.value?.focus()
const blur = () => switcher.value?.blur()

defineExpose({
  click,
  focus,
  blur,
} satisfies UiSwitchMethods)

const onChange = (event: Event): void => {
  if (props.disabled) {
    return
  }

  const input = event.target as HTMLInputElement

  emit('update:value', input.checked)
  emit('change', input.checked)
}
</script>

<style lang="less" src="./switch.less" />
