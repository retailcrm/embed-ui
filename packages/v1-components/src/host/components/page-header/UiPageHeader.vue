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
                :value="normalizedValue"
                @blur="onBlur"
                @change="emit('change', $event)"
                @focus="emit('focus', $event)"
                @keydown="onKeyDown"
                @update:value="emit('update:value', $event)"
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
import { ref } from 'vue'
import { useId } from 'vue'

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

const normalizedValue = computed(() => props.value === null ? '' : String(props.value))
const textboxId = computed(() => `${props.id ?? uid}-input`)

const onBlur = (event: Event) => {
  emit('blur', event)
}

const onKeyDown = (event: KeyboardEvent) => {
  emit('keydown', event)
}

defineExpose<UiPageHeaderMethods>({
  focus: () => textbox.value?.focus(),
  blur: () => textbox.value?.blur(),
})
</script>

<style lang="less" src="./page-header.less" />
