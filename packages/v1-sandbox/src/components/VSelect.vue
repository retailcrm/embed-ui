<template>
    <div :class="$style['v-select']">
        <UiPopperConnector>
            <UiPopperTarget
                :class="$style['v-select__target']"
                tag="div"
            >
                <UiSelectTrigger
                    :id="id"
                    :class="$style['v-select__control']"
                    :active-descendant="activeDescendant"
                    :disabled="disabled"
                    :expanded="isOpen"
                    :multiple="multiple"
                    :placeholder="placeholder"
                    :selection="selection"
                    :textbox-size="size"
                    :value="value"
                    @keydown="handleKeydown"
                    @update:expanded="isOpen = Boolean($event)"
                />
            </UiPopperTarget>

            <UiSelectPopper
                :id="id"
                :aria-labelledby="labelledBy"
                :disabled="disabled"
                :multiple="multiple"
                :opened="isOpen"
                :popper-class="$style['v-select__popper']"
                :target-triggers="[]"
                placement="bottom"
                popper-fit-trigger
                @hide="isOpen = false"
            >
                <button
                    v-for="option in options"
                    :id="optionId(option.value)"
                    :key="option.value"
                    :class="{
                        [$style['v-select__option']]: true,
                        [$style['v-select__option_selected']]: isOptionSelected(option.value),
                        'ui-v1-select-option': true,
                        'ui-v1-select-option_selected': isOptionSelected(option.value),
                    }"
                    :aria-selected="isOptionSelected(option.value)"
                    :disabled="disabled || option.disabled"
                    role="option"
                    type="button"
                    @click="selectOption(option.value)"
                >
                    <UiMenuItem
                        :active="isOptionSelected(option.value)"
                        :disabled="disabled || option.disabled"
                    >
                        {{ option.label }}

                        <template v-if="multiple" #trailing-icon>
                            <IconCheckmarkCircle
                                v-if="isOptionSelected(option.value)"
                                :class="$style['v-select__option-icon']"
                                aria-hidden="true"
                            />

                            <IconAddCircleOutlined
                                v-else
                                :class="$style['v-select__option-icon']"
                                aria-hidden="true"
                            />
                        </template>
                    </UiMenuItem>
                </button>
            </UiSelectPopper>
        </UiPopperConnector>
    </div>
</template>

<script setup lang="ts">
import type { VSelectOption } from '@/app/types'

import { computed, ref } from 'vue'

import {
  UiMenuItem,
  UiPopperConnector,
  UiPopperTarget,
  UiSelectPopper,
  UiSelectTrigger,
} from '@retailcrm/embed-ui-v1-components/host'

import IconAddCircleOutlined from '@retailcrm/embed-ui-v1-components/assets/sprites/actions/add-circle-outlined.svg'
import IconCheckmarkCircle from '@retailcrm/embed-ui-v1-components/assets/sprites/actions/checkmark-circle.svg'

const props = withDefaults(defineProps<{
  disabled?: boolean;
  id: string;
  labelledBy?: string;
  multiple?: boolean;
  options: VSelectOption[];
  placeholder?: string;
  size?: 'sm' | 'xl' | 'xs';
  value: string | string[];
}>(), {
  disabled: false,
  labelledBy: undefined,
  multiple: false,
  placeholder: '',
  size: 'sm',
})

const emit = defineEmits<{
  'update:value': [value: string | string[]];
}>()

const isOpen = ref(false)
const selectedValues = computed(() => Array.isArray(props.value) ? props.value : [props.value])
const selectedOptions = computed(() => props.options.filter(option => selectedValues.value.includes(option.value)))
const selection = computed(() => selectedOptions.value.map(option => ({
  disabled: Boolean(option.disabled),
  id: optionId(option.value),
  isMatched: () => true,
  label: option.label,
  value: option.value,
})))
const activeDescendant = computed(() => selectedOptions.value[0]
  ? optionId(selectedOptions.value[0].value)
  : null
)

const optionId = (value: string) => `${props.id}-${value.replace(/[^a-zA-Z0-9_-]/g, '-')}`
const isOptionSelected = (value: string) => selectedValues.value.includes(value)

const selectOption = (value: string) => {
  if (props.multiple) {
    const values = [...selectedValues.value]
    const index = values.indexOf(value)

    if (index === -1) {
      values.push(value)
    } else {
      values.splice(index, 1)
    }

    emit('update:value', values)
    return
  }

  emit('update:value', value)
  isOpen.value = false
}

const handleKeydown = (event: KeyboardEvent) => {
  if (props.multiple || event.key !== 'Enter' || isOpen.value || !selectedOptions.value[0]) return

  event.preventDefault()
  emit('update:value', selectedOptions.value[0].value)
}
</script>

<style lang="less" module>
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/palette.less";

.v-select {
    width: 100%;

    &__target {
        width: 100%;
    }

    &__control {
        width: 100%;
    }

    &__popper {
        z-index: 1000;
    }

    &__option {
        background: transparent;
        border: 0;
        cursor: pointer;
        display: block;
        text-align: left;
        width: 100%;

        &_selected {
            background: transparent;
        }
    }

    &__option-icon {
        color: @blue-500;
    }
}
</style>
