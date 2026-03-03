<template>
    <div>
        <!-- @slot Разметка сворачиваемых боксов -->
        <slot />
    </div>
</template>

<script lang="ts" setup>
import type { CollapseBoxRegistryItem } from '@/common/components/collapse-box'
import type { PropType } from 'vue'
import type { UiCollapseGroupMethods } from '@/common/components/collapse-box'

import {
  nextTick,
  onMounted,
  provide,
  reactive,
  watch,
} from 'vue'

import {
  CollapseGroupCollapseKey,
  CollapseGroupExpandKey,
  CollapseGroupRegisterKey,
  CollapseGroupUnregisterKey,
} from './inject'

const props = defineProps({
  /**
   * Переключает группу на бокс с указанным id
   * (или закрывает все если null или такого id нет).
   */
  activeBoxId: {
    type: null as unknown as PropType<string | null>,
    validator: (activeBoxId: unknown) => activeBoxId === null || typeof activeBoxId === 'string',
    default: null,
  },
})

const emit = defineEmits([
  'expand-cancelled',
  'expanded',
  'update:activeBoxId',
])

const registry = new Map<string, CollapseBoxRegistryItem>()
const state = reactive({
  activeBoxId: props.activeBoxId,
})

const canNotToggle = (idToTry: string | null): boolean => {
  return Array.from(registry.entries()).some(([id, box]) => {
    return box.canNotBeCollapsed() || (id === idToTry && box.canNotBeExpanded())
  })
}

const toggleAllBoxesAndEmitForEachOne = (id: string | null) => {
  registry.forEach((box, _id) => {
    const expanded = _id === id

    if (expanded !== box.isExpanded()) {
      box.toggleInternalAndEmit(expanded)
    }
  })
}

const updateActiveBoxId = (id: string | null) => {
  state.activeBoxId = id
  emit('expanded', id)
  emit('update:activeBoxId', id)
}

const expand = (id: string | null, force: boolean | undefined) => {
  if (!force && canNotToggle(id)) {
    emit('expand-cancelled', {
      tried: id,
      actual: state.activeBoxId,
    })
    return
  }

  toggleAllBoxesAndEmitForEachOne(id)
  updateActiveBoxId(registry.has(id as string) ? id : null)
}

const register = (id: string, box: CollapseBoxRegistryItem) => {
  if (registry.has(id)) {
    throw new Error(`[UiCollapseGroup] Component with id ${id} already registered.`)
  }

  registry.set(id, box)

  if (box.isExpanded()) {
    expand(id, true)
  }
}

const unregister = (id: string) => {
  registry.delete(id)
}

const collapse = (id: string | null) => {
  if (id && registry.has(id)) {
    const box = registry.get(id)

    if (box && !box.canNotBeCollapsed()) {
      box.toggleInternalAndEmit(false)

      if (state.activeBoxId === id) {
        updateActiveBoxId(null)
      }

      return
    }

    emit('expand-cancelled', {
      tried: null,
      actual: id,
    })
  }
}

const collapseActiveBox = () => {
  collapse(state.activeBoxId)
}

provide(CollapseGroupRegisterKey, register)
provide(CollapseGroupUnregisterKey, unregister)
provide(CollapseGroupExpandKey, expand)
provide(CollapseGroupCollapseKey, collapse)

watch(() => props.activeBoxId, () => {
  if (props.activeBoxId !== state.activeBoxId) {
    expand(props.activeBoxId, undefined)
  }
}, { immediate: true })

const toggle = (id: string | null) => {
  registry.forEach((box, _id) => {
    box.toggleInternal(_id === id)
  })
}

onMounted(() => {
  // Компенсация асинхронной отрисовки слотов
  nextTick(() => {
    toggle(state.activeBoxId)
  })
})

defineExpose({
  expand,
  collapse,
  collapseActiveBox,
  canNotToggle,
  toggle,
} satisfies UiCollapseGroupMethods)
</script>
