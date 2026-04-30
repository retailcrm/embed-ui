<template>
    <div
        ref="root"
        class="ui-v1-logic-tree"
        v-bind="$attrs"
        @click="onRootClick"
    >
        <slot />
    </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const emit = defineEmits<{
  'outside-click': [];
}>()

const root = ref<HTMLElement | null>(null)

const resolveEventElement = (target: EventTarget | null): Element | null => {
  if (target instanceof Element) {
    return target
  }

  if (target instanceof Node) {
    return target.parentElement
  }

  return null
}

const isIgnoredTarget = (target: EventTarget | null): boolean => {
  const element = resolveEventElement(target)

  if (!element) {
    return false
  }

  return Boolean(element.closest([
    '.ui-v1-logic-tree__surface-node-content',
    '.ui-v1-logic-tree__actions-node',
    '.ui-v1-popper',
    '[role="listbox"]',
    '[role="option"]',
  ].join(', ')))
}

const onRootClick = (event: MouseEvent) => {
  if (isIgnoredTarget(event.target)) {
    return
  }

  emit('outside-click')
}

const onDocumentPointerDown = (event: PointerEvent) => {
  const element = resolveEventElement(event.target)

  if (!root.value || !element) {
    return
  }

  if (root.value.contains(element) || isIgnoredTarget(element)) {
    return
  }

  emit('outside-click')
}

onMounted(() => {
  document.addEventListener('pointerdown', onDocumentPointerDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocumentPointerDown)
})
</script>

<style lang="less" src="./logic-tree.less" />
