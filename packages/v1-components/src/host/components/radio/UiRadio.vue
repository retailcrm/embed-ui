<template>
    <span
        :class="{
            'ui-v1-radio': true,
            'ui-v1-radio_checked': checked,
            'ui-v1-radio_disabled': disabled,
        }"
        v-bind="pick($attrs, (key: string) => !key.startsWith('aria-') && !key.startsWith('on'))"
    >
        <input
            :id="id"
            ref="radio"
            :name="name"
            :value="value"
            :checked="checked"
            :disabled="disabled"
            v-bind="pick($attrs, (key: string) => key.startsWith('aria-') || key.startsWith('on'))"
            type="radio"
            class="ui-v1-radio__input"
            @change="onChange"
        >

        <span class="ui-v1-radio__checkmark" />
    </span>
</template>

<script lang="ts">
let counter = 0

export default {}
</script>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { Primitive } from '@/common/types'
import type { UiRadioMethods } from '@/common/components/radio'

import { computed, ref } from 'vue'
import { pick } from '@/common/utils'

const props = defineProps({
  id: {
    type: null as unknown as PropType<string | undefined>,
    validator: (id: unknown) => id === undefined || typeof id === 'string' && id.length > 0 && /^[A-Za-z]/.test(id),
    default: undefined,
  },

  /** Атрибут name нативного поля ввода */
  name: {
    type: String,
    default: () => 'ui-v1-radio-' + ++counter,
  },

  /** Значение модели используемое с директивой v-model */
  model: {
    type: null as unknown as PropType<Primitive>,
    default: undefined,
  },

  /** Атрибут value нативного поля ввода */
  value: {
    type: null as unknown as PropType<Primitive>,
    required: true,
  },

  /** Заблокированный */
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([
  /** Изменение значения модели */
  'change',
  /** Изменение значения модели. Для v-model */
  'update:model',
])

const radio = ref<HTMLInputElement | null>(null)

const click = () => radio.value?.click()
const focus = () => radio.value?.focus()
const blur = () => radio.value?.blur()

defineExpose({
  click,
  focus,
  blur,
} satisfies UiRadioMethods)

const checked = computed(() => props.value === props.model)

const onChange = () => {
  emit('change', props.value)
  emit('update:model', props.value)
}
</script>

<style lang="less" src="./radio.less" />
