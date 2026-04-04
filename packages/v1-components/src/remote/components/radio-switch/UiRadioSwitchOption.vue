<template>
    <UiRadioSwitchOptionShell
        :id="id"
        ref="shell"
        :appearance="appearance"
        :size="size"
        :checked="checked"
        :disabled="disabled"
        :tabindex="tabIndex"
        v-bind="$attrs"
        @click="onClick"
        @focus="onFocus"
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
            <div class="ui-v1-radio-switch-option__head">
                <span v-if="$slots.icon" class="ui-v1-radio-switch-option__icon">
                    <!-- @slot Иконка опции -->
                    <slot name="icon" />
                </span>

                <div v-if="$slots.label || label" class="ui-v1-radio-switch-option__label">
                    <!-- @slot Заголовок опции -->
                    <slot name="label">
                        {{ label }}
                    </slot>
                </div>
            </div>

            <template v-if="appearance === APPEARANCE.SECTION">
                <div v-if="$slots.description || description" class="ui-v1-radio-switch-option__description">
                    <!-- @slot Дополнительное описание опции -->
                    <slot name="description">
                        {{ description }}
                    </slot>
                </div>

                <div v-if="checked" class="ui-v1-radio-switch-option__done">
                    <!-- @slot Иконка выбранного состояния -->
                    <slot name="checkmark">
                        <IconCheckmarkCircle />
                    </slot>
                </div>
            </template>
        </slot>
    </UiRadioSwitchOptionShell>
</template>

<script lang="ts">
let counter = 0

export default {}
</script>

<script lang="ts" remote setup>
import type { PropType } from 'vue'
import type { SerializedKeyboardEvent } from '@omnicajs/vue-remote/types/events'
import type { VNodeChild } from 'vue'

import type { UiRadioSwitchOptionProperties } from '@/common/components/radio-switch'

import {
  computed,
  onBeforeMount,
  onBeforeUnmount,
  ref,
  useTemplateRef,
} from 'vue'

import IconCheckmarkCircle from '~assets/sprites/actions/checkmark-circle.svg'

import { APPEARANCE } from '@/common/components/radio-switch'

import {
  useAppearance,
  useFocusableId,
  useMoveFocus,
  useRegistry,
  useSetFocusableId,
  useSize,
  useUpdate,
} from '@/host/components/radio-switch/injection'

import { UiRadioSwitchOptionShell } from './parts'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  /** Идентификатор */
  id: {
    type: String,
    default: () => 'ui-v1-radio-switch-option-' + ++counter,
  },

  /** Заголовок */
  label: {
    type: String,
    default: '',
  },

  /** Значение опции */
  value: {
    type: null as unknown as PropType<UiRadioSwitchOptionProperties['value']>,
    required: true,
  },

  /** Используется только c appearance=section */
  description: {
    type: String,
    default: '',
  },

  /** Индикатор, заблокирована опция или нет */
  disabled: {
    type: Boolean,
    default: false,
  },
})

defineSlots<{
  /** Полный пользовательский шаблон опции */
  default?: () => VNodeChild;
  /** Иконка опции */
  icon?: () => VNodeChild;
  /** Заголовок опции */
  label?: () => VNodeChild;
  /** Дополнительное описание опции */
  description?: () => VNodeChild;
  /** Иконка выбранного состояния */
  checkmark?: () => VNodeChild;
}>()

const appearance = useAppearance()
const focusableId = useFocusableId()
const moveFocus = useMoveFocus()
const shell = useTemplateRef<InstanceType<typeof UiRadioSwitchOptionShell>>('shell')
const size = useSize()
const registry = useRegistry()
const setFocusableId = useSetFocusableId()
const update = useUpdate()

const checked = ref(false)
const tabIndex = computed(() => {
  return !props.disabled && focusableId.value === props.id
    ? 0
    : -1
})

const onClick = () => {
  if (!props.disabled) {
    setFocusableId(props.id)
    update(props.value)
  }
}

const onFocus = () => {
  if (!props.disabled) {
    setFocusableId(props.id)
  }
}

const onKeyDown = (event: SerializedKeyboardEvent) => {
  if (props.disabled) {
    return
  }

  switch (event.key) {
    case ' ':
    case 'Enter':
      setFocusableId(props.id)
      update(props.value)
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
    checked,
    disabled: () => props.disabled,
    focus: () => shell.value?.focus(),
  })
})

onBeforeUnmount(() => {
  registry.unregister(props.id)
})
</script>
