<template>
    <div
        ref="root"
        :class="{
            'ui-v1-slider': true,
            [`ui-v1-slider_${props.type}`]: true,
            'ui-v1-slider_dotted': !props.labelled,
            'ui-v1-slider_labelled': props.labelled,
            'ui-v1-slider_active': activeHandle !== null,
        }"
        v-bind="props.type === TYPE.SINGLE ? {
            ...$attrs,
            role: 'slider',
            tabindex: 0,
            'aria-orientation': 'horizontal',
            'aria-valuemax': props.max,
            'aria-valuemin': props.min,
            'aria-valuenow': sanitized[0],
        } : {
            ...$attrs,
            role: 'group',
        }"
        @click="onClick($event)"
        @keydown="onRootKeydown($event)"
    >
        <div
            v-if="props.labelled"
            class="ui-v1-slider__label"
        >
            <!-- @slot Метка минимальной/максимальной границы -->
            <slot
                name="label"
                :boundary="props.min"
            />
        </div>

        <div
            ref="track"
            class="ui-v1-slider__track"
        >
            <div
                class="ui-v1-slider__filler"
                :style="trackStyle"
            />

            <div
                v-for="handle in handles"
                :key="handle.index"
                :class="{
                    'ui-v1-slider__handle': true,
                    'ui-v1-slider__handle_active': handle.index === activeHandle,
                }"
                :style="{ left: `${handle.position}%` }"
                v-bind="props.type === TYPE.RANGE ? {
                    role: 'slider',
                    tabindex: 0,
                    'aria-orientation': 'horizontal',
                    'aria-valuemax': props.max,
                    'aria-valuemin': props.min,
                    'aria-valuenow': handle.value,
                } : {}"
                @mousedown="onDragStart(handle.index, $event)"
                @keydown="onHandleKeydown(handle.index, $event)"
                @focus="activeHandle = handle.index"
                @blur="activeHandle = null"
                @click.stop
            >
                <!-- @slot Контент ползунка -->
                <slot
                    v-if="props.labelled"
                    name="handle"
                    :boundary="handle.value"
                />
            </div>
        </div>

        <div
            v-if="props.labelled"
            class="ui-v1-slider__label"
        >
            <slot
                name="label"
                :boundary="props.max"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Handle } from '@/common/components/slider'
import type { PropType } from 'vue'

import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue'

import {
  clamp,
  createManipulator,
  getValue,
  MAX,
  MIN,
  normalize,
  TYPE,
} from '@/common/components/slider'

const props = defineProps({
  type: {
    type: String as unknown as PropType<TYPE | `${TYPE}`>,
    validator: (variant: string) => Object.values(TYPE).includes(variant as TYPE),
    default: TYPE.SINGLE,
  },

  value: {
    type: [Number, Array] as unknown as PropType<number | number[]>,
    default: () => [MIN, MAX],
  },

  min: {
    type: Number,
    default: MIN,
  },

  max: {
    type: Number,
    default: MAX,
  },

  labelled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  /** Срабатывает при изменении значения */
  'update:value': [value: number | number[]];
}>()

const root = ref<HTMLElement | null>(null)

const sanitized = computed(() => {
  let [first = props.min, last = props.max] = Array.isArray(props.value) ? props.value : [props.value]

  first = clamp(first, props.min, props.max)
  last = clamp(last, props.min, props.max)

  return props.type === TYPE.RANGE
    ? [first, last] as [number, number]
    : [first] as [number]
})

const reversed = ref(false)
const handles = computed(() => getValue(sanitized.value, reversed.value).map((value, index) => ({
  index,
  value,
  position: normalize(value, props.min, props.max),
} as Handle)))

const activeHandle = ref<number | null>(null)

const track = ref<HTMLElement | null>(null)
const trackStyle = computed(() => {
  const positions = handles.value.map((handle) => handle.position)

  const min = props.type === TYPE.RANGE ? Math.min(...positions) : 0
  const max = Math.max(...positions)

  return {
    left: `${min}%`,
    width: `${max - min}%`,
  }
})

const emitUpdatedValue = (value: number | number[]) => {
  if (props.type === TYPE.SINGLE) {
    emit('update:value', Array.isArray(value) ? value[0] : value)
    return
  }

  if (Array.isArray(value)) {
    emit('update:value', value.slice(0, 2))
    return
  }

  emit('update:value', [value, value])
}

const {
  onClick,
  onDragStart,
  connect,
  disconnect,
} = createManipulator({
  value: () => sanitized.value,
  max: () => props.max,
  min: () => props.min,
  handles: () => handles.value,
  getTrack: () => track.value,
  getActiveHandle: () => activeHandle.value,
  setActiveHandle: (index: number | null) => {
    activeHandle.value = index
  },
  onChange: emitUpdatedValue,
  onReverse: (value) => {
    reversed.value = value
  },
})

const pageStep = computed(() => {
  return Math.max(1, Math.ceil((props.max - props.min) / 10))
})

const getUpdatedBoundaryByKey = (boundary: number, key: string): number | null => {
  switch (key) {
    case 'ArrowRight':
    case 'ArrowUp':
      return clamp(boundary + 1, props.min, props.max)
    case 'ArrowLeft':
    case 'ArrowDown':
      return clamp(boundary - 1, props.min, props.max)
    case 'PageUp':
      return clamp(boundary + pageStep.value, props.min, props.max)
    case 'PageDown':
      return clamp(boundary - pageStep.value, props.min, props.max)
    case 'Home':
      return props.min
    case 'End':
      return props.max
    default:
      return null
  }
}

const onRootKeydown = (event: KeyboardEvent) => {
  if (props.type !== TYPE.SINGLE) {
    return
  }

  const nextBoundary = getUpdatedBoundaryByKey(sanitized.value[0], event.key)
  if (nextBoundary === null) {
    return
  }

  event.preventDefault()
  emitUpdatedValue(nextBoundary)
}

const onHandleKeydown = (index: number, event: KeyboardEvent) => {
  if (props.type !== TYPE.RANGE) {
    return
  }

  const values = [...sanitized.value] as [number, number]
  const nextBoundary = getUpdatedBoundaryByKey(values[index], event.key)

  if (nextBoundary === null) {
    return
  }

  event.preventDefault()
  values[index] = nextBoundary
  emitUpdatedValue(values)
}

onMounted(() => {
  if (root.value) {
    connect(root.value)
  }
})

onBeforeUnmount(disconnect)
</script>

<style lang="less" src="./slider.less" />
