<template>
    <UiPageHeaderLayout
        ref="base"
        v-bind="baseProps"
        @blur="$emit('blur', $event)"
        @change="$emit('change', $event)"
        @focus="$emit('focus', $event)"
        @keydown="$emit('keydown', $event)"
        @update:value="$emit('update:value', $event)"
    >
        <template
            v-if="$slots.addon"
            #addon
        >
            <slot name="addon" />
        </template>

        <template
            v-if="$slots.actions"
            #actions
        >
            <slot name="actions" />
        </template>
    </UiPageHeaderLayout>
</template>

<script lang="ts" setup>
import type {
  UiPageHeaderMethods,
  UiPageHeaderProperties,
} from '@/common/components/page-header'

import { computed, ref, useAttrs } from 'vue'

import UiPageHeaderLayout from '@/host/components/page-header/UiPageHeaderLayout.vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<UiPageHeaderProperties>(), {
  value: '',
  placeholder: '',
  error: '',
  editable: false,
  autofocus: false,
  autoselect: true,
  readonly: false,
  disabled: false,
  invalid: false,
})

const attrs = useAttrs()
const baseProps = computed(() => ({
  ...attrs,
  id: props.id,
  value: props.value,
  placeholder: props.placeholder,
  error: props.error,
  editable: props.editable,
  autofocus: props.autofocus,
  autoselect: props.autoselect,
  readonly: props.readonly,
  disabled: props.disabled,
  invalid: props.invalid,
}))

defineEmits<{
  'blur': [event: Event];
  'change': [event: Event];
  'focus': [event: FocusEvent];
  'keydown': [event: KeyboardEvent];
  'update:value': [value: string | number];
}>()

const base = ref<InstanceType<typeof UiPageHeaderLayout> | null>(null)

defineExpose<UiPageHeaderMethods>({
  focus: () => base.value?.focus(),
  blur: () => base.value?.blur(),
})
</script>
