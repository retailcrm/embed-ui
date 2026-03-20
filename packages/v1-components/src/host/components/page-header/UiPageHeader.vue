<template>
    <div
        :id="id ?? uid"
        :class="{
            'ui-v1-page-header': true,
            'ui-v1-page-header_disabled': disabled,
            'ui-v1-page-header_invalid': invalid,
            'ui-v1-page-header_readonly': readonly,
        }"
        v-bind="$attrs"
    >
        <div class="ui-v1-page-header__main">
            <UiTextbox
                v-if="!isEditing"
                :id="textboxId"
                class="ui-v1-page-header__trigger"
                :autofit="true"
                :disabled="disabled"
                :input-attributes="{ 'aria-label': placeholder || currentValue || 'Page title' }"
                :invalid="invalid"
                :outlined="false"
                :placeholder="placeholder"
                :readonly="true"
                :size="size"
                :value="currentValue"
                @click="startEditing"
            />

            <UiTextbox
                v-else
                :id="textboxId"
                ref="textbox"
                class="ui-v1-page-header__textbox"
                :autofit="true"
                :autofocus="autofocus"
                :autoselect="autoselect"
                :disabled="disabled"
                :input-attributes="{ 'aria-label': placeholder || 'Page title' }"
                :invalid="invalid"
                :outlined="false"
                :placeholder="placeholder"
                :readonly="readonly"
                :size="size"
                :value="currentValue"
                @blur="onBlur"
                @change="emit('change', $event)"
                @focus="emit('focus', $event)"
                @keydown="onKeyDown"
                @update:value="onUpdateValue"
            />
        </div>

        <div
            v-if="'actions' in $slots"
            class="ui-v1-page-header__actions"
        >
            <slot name="actions" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

import type {
  UiPageHeaderMethods,
  UiPageHeaderProperties,
} from '@/common/components/page-header'

import { computed } from 'vue'
import { nextTick } from 'vue'
import { ref } from 'vue'
import { useId } from 'vue'
import { watch } from 'vue'

import UiTextbox from '@/host/components/textbox/UiTextbox.vue'

import { SIZE } from '@/common/components/textbox'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  /** Уникальный идентификатор корневого элемента */
  id: {
    type: null as unknown as PropType<UiPageHeaderProperties['id']>,
    validator: (id: unknown) => id === undefined || typeof id === 'string' && id.length > 0 && /^[A-Za-z]/.test(id),
    default: undefined,
  },

  /** Текст заголовка */
  value: {
    type: null as unknown as PropType<UiPageHeaderProperties['value']>,
    default: '',
  },

  /** Плейсхолдер, отображаемый при отсутствии текста */
  placeholder: {
    type: String,
    default: '',
  },

  /** Размер встроенного UiTextbox */
  size: {
    type: String as PropType<UiPageHeaderProperties['size']>,
    validator: (value: string) => Object.values(SIZE).includes(value as SIZE),
    default: SIZE.XL,
  },

  /** Разрешает перейти в режим редактирования по клику */
  editable: {
    type: Boolean,
    default: false,
  },

  /** Автоматически переводит фокус во встроенный UiTextbox при монтировании */
  autofocus: {
    type: Boolean,
    default: false,
  },

  /** Автоматически выделяет текст заголовка при фокусе на встроенном поле */
  autoselect: {
    type: Boolean,
    default: true,
  },

  /** Делает встроенное поле только для чтения */
  readonly: {
    type: Boolean,
    default: false,
  },

  /** Полностью отключает заголовок */
  disabled: {
    type: Boolean,
    default: false,
  },

  /** Помечает встроенное поле как невалидное */
  invalid: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  /** Стандартное событие поля ввода */
  'blur': [event: Event];
  /** Стандартное событие поля ввода */
  'change': [event: Event];
  /** Стандартное событие поля ввода */
  'focus': [event: FocusEvent];
  /** Стандартное событие поля ввода */
  'keydown': [event: KeyboardEvent];
  /** Изменение текста заголовка */
  'update:value': [value: string | number];
}>()

const uid = useId()
const textbox = ref<InstanceType<typeof UiTextbox> | null>(null)
const isEditing = ref(false)
const currentValue = ref(props.value === null ? '' : String(props.value))

const textboxId = computed(() => `${props.id ?? uid}-input`)
const canEdit = computed(() => props.editable && !props.readonly && !props.disabled)

watch(() => props.value, (nextValue) => {
  currentValue.value = nextValue === null ? '' : String(nextValue)
})

watch(canEdit, (nextCanEdit) => {
  if (!nextCanEdit) {
    isEditing.value = false
  }
})

const startEditing = async () => {
  if (!canEdit.value || isEditing.value) {
    return
  }

  isEditing.value = true

  await nextTick()
  textbox.value?.focus()
}

const onBlur = (event: Event) => {
  isEditing.value = false
  emit('blur', event)
}

const onUpdateValue = (value: string | number) => {
  currentValue.value = String(value)
  emit('update:value', value)
}

const onKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
    event.preventDefault()
    textbox.value?.blur()
    isEditing.value = false
  }

  emit('keydown', event)
}

defineExpose<UiPageHeaderMethods>({
  focus: () => {
    void startEditing()
  },
  blur: () => {
    textbox.value?.blur()
    isEditing.value = false
  },
})
</script>

<style lang="less" src="./page-header.less" />
