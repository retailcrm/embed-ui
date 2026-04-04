<template>
    <UiToggleButton
        :id="id"
        ref="button"
        :size="size"
        :pressed="pressed"
        :disabled="disabled"
        :focused="focused"
        :grouped="true"
        :tabindex="tabIndex"
        role="checkbox"
        :aria-checked="`${pressed}`"
        :aria-disabled="`${disabled}`"
        v-bind="$attrs"
        @click="onClick"
        @focus="onFocus"
        @blur="onBlur"
        @keydown.space.prevent="onKeyDown"
        @keydown.enter.prevent="onKeyDown"
        @keydown.left.prevent="onKeyDown"
        @keydown.right.prevent="onKeyDown"
        @keydown.up.prevent="onKeyDown"
        @keydown.down.prevent="onKeyDown"
        @keydown.home.prevent="onKeyDown"
        @keydown.end.prevent="onKeyDown"
    >
        <slot>
            <slot v-if="$slots.icon" name="icon" />

            <template v-if="$slots.label || label">
                <slot name="label">
                    {{ label }}
                </slot>
            </template>
        </slot>
    </UiToggleButton>
</template>

<script lang="ts">
let counter = 0

export default {}
</script>

<script lang="ts" remote setup>
import type { PropType } from 'vue'
import type { SerializedKeyboardEvent } from '@omnicajs/vue-remote/types/events'
import type { VNodeChild } from 'vue'

import type { UiToggleButtonMethods } from '@/common/components/toggle-button'
import type { UiToggleGroupOptionProperties } from '@/common/components/toggle-group'

import {
  computed,
  onBeforeMount,
  onBeforeUnmount,
  ref,
  useTemplateRef,
} from 'vue'

import { UiToggleButton } from '@/remote/components/toggle-button'

import {
  useDisabled,
  useFocusableId,
  useMoveFocus,
  useRegistry,
  useSetFocusableId,
  useSize,
  useToggle,
} from './injection'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  id: {
    type: String,
    default: () => 'ui-v1-toggle-group-option-' + ++counter,
  },

  label: {
    type: String,
    default: '',
  },

  value: {
    type: null as unknown as PropType<UiToggleGroupOptionProperties['value']>,
    required: true,
  },

  disabled: {
    type: Boolean,
    default: false,
  },
})

const button = useTemplateRef<UiToggleButtonMethods>('button')
const groupDisabled = useDisabled()
const focusableId = useFocusableId()
const moveFocus = useMoveFocus()
const registry = useRegistry()
const setFocusableId = useSetFocusableId()
const size = useSize()
const toggle = useToggle()

const focused = ref(false)
const disabled = computed(() => groupDisabled.value || props.disabled)
const pressed = ref(false)
const tabIndex = computed(() => {
  return !disabled.value && focusableId.value === props.id
    ? 0
    : -1
})

defineSlots<{
  default?: () => VNodeChild;
  icon?: () => VNodeChild;
  label?: () => VNodeChild;
}>()

const onClick = () => {
  if (disabled.value) {
    return
  }

  setFocusableId(props.id)
  toggle(props.value)
}

const onFocus = () => {
  if (!disabled.value) {
    focused.value = true
    setFocusableId(props.id)
  }
}

const onBlur = () => {
  focused.value = false
}

const onKeyDown = (event: SerializedKeyboardEvent) => {
  if (disabled.value) {
    return
  }

  switch (event.key) {
    case ' ':
    case 'Enter':
      setFocusableId(props.id)
      toggle(props.value)
      return

    case 'ArrowDown':
    case 'ArrowRight':
      void moveFocus(props.id, 'next')
      return

    case 'ArrowUp':
    case 'ArrowLeft':
      void moveFocus(props.id, 'prev')
      return

    case 'Home':
      void moveFocus(props.id, 'first')
      return

    case 'End':
      void moveFocus(props.id, 'last')
      return
  }
}

onBeforeMount(() => {
  registry.register(props.id, {
    getValue: () => props.value,
    pressed,
    disabled: () => disabled.value,
    focus: () => button.value?.focus(),
  })
})

onBeforeUnmount(() => {
  registry.unregister(props.id)
})
</script>
