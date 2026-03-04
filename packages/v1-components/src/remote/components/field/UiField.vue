<template>
    <div
        :class="{
            'ui-v1-field': true,
            'ui-v1-field_invalid': invalid,
            'ui-v1-field_required': required,
            'ui-v1-field_disabled': disabled,
            'ui-v1-field_readonly': readonly,
        }"
        v-bind="$attrs"
    >
        <div class="ui-v1-field__headline">
            <label
                v-if="label || $slots.label"
                :id="`${id}-label`"
                :for="id"
                class="ui-v1-field__label"
            >
                <slot name="label">
                    {{ label }}
                </slot>

                <span
                    v-if="required"
                    class="ui-v1-field__required-mark"
                    aria-hidden="true"
                >
                    *
                </span>
            </label>

            <span
                v-if="hint || $slots.hint"
                class="ui-v1-field__hint"
            >
                <UiPopperConnector>
                    <UiPopperTarget
                        :aria-label="hintAriaLabel"
                        tag="span"
                        class="ui-v1-field__hint-trigger"
                        role="button"
                        tabindex="0"
                    >
                        <IconHelp
                            aria-hidden="true"
                            class="ui-v1-field__hint-icon"
                        />
                    </UiPopperTarget>

                    <UiTooltip
                        class="ui-v1-field__hint-tooltip"
                        :target-triggers="{
                            show: ['hover', 'focus'],
                            hide: ['hover', 'focus', 'click'],
                        }"
                        :offset-main-axis="4"
                        placement="right-end"
                    >
                        <slot name="hint">
                            {{ hint }}
                        </slot>
                    </UiTooltip>
                </UiPopperConnector>
            </span>

            <div v-if="$slots.addon" class="ui-v1-field__addon">
                <slot name="addon" />
            </div>
        </div>

        <div class="ui-v1-field__control">
            <slot
                :id="id"
                :required="required"
                :disabled="disabled"
                :readonly="readonly"
                :invalid="invalid"
                :ariaLabelledby="label || $slots.label ? `${id}-label` : undefined"
                :ariaInvalid="invalid ? 'true' as const : undefined"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import IconHelp from '~assets/sprites/actions/help.svg'

import { UiPopperConnector, UiPopperTarget } from '@/remote/components/popper'
import { UiTooltip } from '@/remote/components/tooltip'

defineOptions({
  inheritAttrs: false,
})

defineProps({
  /** Id для связки label/control */
  id: {
    type: String,
    required: true,
  },

  /** Текст заголовка поля */
  label: {
    type: String,
    default: '',
  },

  /** Контент tooltip-подсказки рядом с label */
  hint: {
    type: String,
    default: '',
  },

  /** Подпись для иконки подсказки */
  hintAriaLabel: {
    type: String,
    default: 'Hint',
  },

  /** Некорректное значение поля */
  invalid: {
    type: Boolean,
    default: false,
  },

  /** Обязательность поля */
  required: {
    type: Boolean,
    default: false,
  },

  /** Недоступность поля */
  disabled: {
    type: Boolean,
    default: false,
  },

  /** Режим только чтения */
  readonly: {
    type: Boolean,
    default: false,
  },
})
</script>
