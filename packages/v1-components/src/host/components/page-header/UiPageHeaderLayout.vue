<template>
    <div
        :id="id ?? uid"
        :class="{
            'ui-v1-page-header': true,
            'ui-v1-page-header_disabled': disabled,
            'ui-v1-page-header_invalid': displayInvalid,
            'ui-v1-page-header_readonly': readonly,
        }"
        v-bind="$attrs"
    >
        <div class="ui-v1-page-header__main">
            <div class="ui-v1-page-header__title">
                <UiPageHeaderTitle
                    :id="id"
                    ref="main"
                    :value="value"
                    :placeholder="placeholder"
                    :error="error"
                    :editable="editable"
                    :autofocus="autofocus"
                    :autoselect="autoselect"
                    :readonly="readonly"
                    :disabled="disabled"
                    :invalid="invalid"
                    @blur="emit('blur', $event)"
                    @change="emit('change', $event)"
                    @focus="emit('focus', $event)"
                    @keydown="emit('keydown', $event)"
                    @update:value="emit('update:value', $event)"
                />
            </div>

            <div
                v-if="'addon' in $slots"
                class="ui-v1-page-header__addon"
            >
                <slot name="addon" />
            </div>
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
} from '../../../common/components/page-header'

import { computed, ref, useId } from 'vue'

import UiPageHeaderTitle from '@/host/components/page-header/UiPageHeaderTitle.vue'

defineOptions({
  inheritAttrs: false,
})

const {
  id,
  value,
  placeholder,
  error,
  editable,
  autofocus,
  autoselect,
  readonly,
  disabled,
  invalid,
} = defineProps({
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
const main = ref<InstanceType<typeof UiPageHeaderTitle> | null>(null)
const displayInvalid = computed(() => {
  const currentValue = value === null ? '' : String(value)

  return invalid && currentValue === ''
})

defineExpose<UiPageHeaderMethods>({
  focus: () => main.value?.focus(),
  blur: () => main.value?.blur(),
})
</script>

<style lang="less" src="./page-header.less" />
