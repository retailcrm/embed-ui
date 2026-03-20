<template>
    <h1
        v-if="!isEditing && !displayError"
        :id="textboxId"
        :aria-label="placeholder || currentValue || 'Page title'"
        :class="{
            'ui-v1-page-header__trigger': true,
            'ui-v1-page-header__trigger_editable': canEdit,
            'ui-v1-page-header__trigger_empty': !!displayPlaceholder,
        }"
        :role="canEdit ? 'button' : undefined"
        :tabindex="canEdit ? 0 : undefined"
        @mousedown="onMouseDown"
        @click="startEditing"
        @keydown.enter.prevent="startEditing"
        @keydown.space.prevent="startEditing"
    >
        {{ currentValue || displayPlaceholder }}
    </h1>

    <UiTextbox
        v-else
        :id="textboxId"
        ref="textbox"
        :value="currentValue"
        :autofocus="autofocus"
        :autoselect="autoselect"
        :disabled="disabled"
        :input-attributes="{ 'aria-label': placeholder || 'Page title' }"
        :invalid="displayInvalid"
        :outlined="false"
        :placeholder="displayPlaceholder"
        :readonly="readonly"
        size="xl"
        autofit
        class="ui-v1-page-header__textbox"
        @blur="onBlur"
        @change="emit('change', $event)"
        @focus="emit('focus', $event)"
        @keydown="onKeyDown"
        @update:value="onUpdateValue"
    />
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

import type {
  UiPageHeaderMethods,
  UiPageHeaderProperties,
} from '@/common/components/page-header'

import {
  computed,
  nextTick,
  ref,
  useId,
  watch,
} from 'vue'

import UiTextbox from '@/host/components/textbox/UiTextbox.vue'

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

  /** Текст ошибки для tooltip при пустом невалидном заголовке */
  error: {
    type: String,
    default: '',
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
const displayPlaceholder = computed(() => currentValue.value ? '' : props.placeholder)
const displayInvalid = computed(() => props.invalid && currentValue.value === '')
const displayError = computed(() => displayInvalid.value && props.error !== '')

watch(() => props.value, (nextValue) => {
  currentValue.value = nextValue === null ? '' : String(nextValue)
})

watch(canEdit, (nextCanEdit) => {
  if (!nextCanEdit) {
    isEditing.value = false
  }
})

watch(displayError, async (nextDisplayError) => {
  if (!nextDisplayError || !canEdit.value) {
    return
  }

  isEditing.value = true

  await nextTick()
  textbox.value?.focus()
}, {
  immediate: true,
})

const startEditing = async () => {
  if (!canEdit.value || isEditing.value) {
    return
  }

  isEditing.value = true

  await nextTick()
  textbox.value?.focus()
}

const onMouseDown = (event: MouseEvent) => {
  if (!canEdit.value || isEditing.value) {
    return
  }

  event.preventDefault()
  void startEditing()
}

const onBlur = (event: Event) => {
  if (displayError.value && canEdit.value) {
    isEditing.value = true
    emit('blur', event)

    void nextTick().then(() => {
      textbox.value?.focus()
    })

    return
  }

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

    if (!displayError.value) {
      textbox.value?.blur()
      isEditing.value = false
    }
  }

  emit('keydown', event)
}

defineExpose<UiPageHeaderMethods>({
  focus: () => {
    void startEditing()
  },
  blur: () => {
    if (displayError.value && canEdit.value) {
      void nextTick().then(() => {
        textbox.value?.focus()
      })

      return
    }

    textbox.value?.blur()
    isEditing.value = false
  },
})
</script>
