<template>
    <div
        :class="{
            'ui-v1-page-header': true,
            'ui-v1-page-header_disabled': disabled,
            'ui-v1-page-header_invalid': displayInvalid,
            'ui-v1-page-header_readonly': readonly,
        }"
        v-bind="$attrs"
    >
        <div
            v-if="$slots.actions"
            class="ui-v1-page-header__actions"
        >
            <slot name="actions" />
        </div>

        <div class="ui-v1-page-header__main">
            <div class="ui-v1-page-header__body">
                <UiPopperConnector>
                    <UiPopperTarget
                        tag="div"
                        class="ui-v1-page-header__title"
                    >
                        <UiPageHeaderTitle
                            :id="id"
                            ref="header"
                            :value="valueState"
                            :placeholder="placeholder"
                            :error="error"
                            :invalid="invalid"
                            :editable="editable"
                            :autofocus="autofocus"
                            :autoselect="autoselect"
                            :readonly="readonly"
                            :disabled="disabled"
                            @blur="$emit('blur', $event)"
                            @change="$emit('change', $event)"
                            @focus="$emit('focus', $event)"
                            @keydown="$emit('keydown', $event)"
                            @update:value="onUpdateValue"
                        />
                    </UiPopperTarget>

                    <UiTooltip
                        v-if="displayInvalid && error"
                        :target-triggers="{
                            hide: [''],
                        }"
                        :offset-main-axis="8"
                        visible
                        placement="right"
                    >
                        {{ error }}
                    </UiTooltip>
                </UiPopperConnector>

                <div
                    v-if="$slots.addon"
                    class="ui-v1-page-header__addon"
                >
                    <slot name="addon" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" remote setup>
import type { PropType } from 'vue'

import type {
  UiPageHeaderMethods,
  UiPageHeaderProperties,
} from '@/common/components/page-header'

import {
  computed,
  ref,
  useTemplateRef,
  watch,
} from 'vue'

import { UiPopperConnector, UiPopperTarget } from '@/remote/components/popper'
import { UiTooltip } from '@/remote/components/tooltip'

import { UiPageHeaderTitle } from './parts'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  /** Уникальный идентификатор корневого элемента */
  id: {
    type: null as unknown as PropType<UiPageHeaderProperties['id']>,
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

  /** Автоматически переводит фокус во встроенный UiTextbox при входе в режим редактирования */
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
  'blur': [event: Event];
  'change': [event: Event];
  'focus': [event: FocusEvent];
  'keydown': [event: KeyboardEvent];
  'update:value': [value: string | number];
}>()

const header = useTemplateRef<InstanceType<typeof UiPageHeaderTitle>>('header')
const valueState = ref(props.value === null ? '' : String(props.value))
const displayInvalid = computed(() => props.invalid && valueState.value === '')

watch(() => props.value, (nextValue) => {
  valueState.value = nextValue === null ? '' : String(nextValue)
})

const onUpdateValue = (value: string | number) => {
  valueState.value = String(value)
  emit('update:value', value)
}

defineExpose<UiPageHeaderMethods>({
  focus: () => header.value?.focus(),
  blur: () => header.value?.blur(),
})
</script>
