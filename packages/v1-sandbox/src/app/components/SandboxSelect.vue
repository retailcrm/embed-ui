<template>
    <div :class="$style['sandbox-select']">
        <UiPopperConnector>
            <UiPopperTarget
                :class="$style['sandbox-select__target']"
                tag="div"
            >
                <UiSelectTrigger
                    :id="id"
                    :class="$style['sandbox-select__control']"
                    :active-descendant="activeDescendant"
                    :expanded="isOpen"
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
                :opened="isOpen"
                :popper-class="$style['sandbox-select__popper']"
                placement="bottom"
                popper-fit-trigger
                @hide="isOpen = false"
            >
                <button
                    v-for="option in options"
                    :id="optionId(option.value)"
                    :key="option.value"
                    :class="[
                        'ui-v1-select-option',
                        $style['sandbox-select__option'],
                        option.value === value && [
                            'ui-v1-select-option_selected',
                            $style['sandbox-select__option_selected'],
                        ],
                    ]"
                    :aria-selected="option.value === value"
                    :disabled="option.disabled"
                    role="option"
                    type="button"
                    @click="selectOption(option.value)"
                >
                    <UiMenuItem
                        :active="option.value === value"
                        :disabled="option.disabled"
                    >
                        {{ option.label }}
                    </UiMenuItem>
                </button>
            </UiSelectPopper>
        </UiPopperConnector>
    </div>
</template>

<script setup lang="ts">
import type { SandboxSelectOption } from '@/app/types'

import { computed, ref } from 'vue'

import {
  UiMenuItem,
  UiPopperConnector,
  UiPopperTarget,
  UiSelectPopper,
  UiSelectTrigger,
} from '@retailcrm/embed-ui-v1-components/host'

const props = withDefaults(defineProps<{
  id: string;
  labelledBy?: string;
  options: SandboxSelectOption[];
  placeholder?: string;
  size?: 'lg' | 'md' | 'sm' | 'xl' | 'xs';
  value: string;
}>(), {
  labelledBy: undefined,
  placeholder: '',
  size: 'sm',
})

const emit = defineEmits<{
  'update:value': [value: string];
}>()

const isOpen = ref(false)
const selectedOption = computed(() => props.options.find(option => option.value === props.value))
const selection = computed(() => selectedOption.value
  ? [{
    disabled: Boolean(selectedOption.value.disabled),
    id: optionId(selectedOption.value.value),
    isMatched: () => true,
    label: selectedOption.value.label,
    value: selectedOption.value.value,
  }]
  : []
)
const activeDescendant = computed(() => selectedOption.value ? optionId(selectedOption.value.value) : null)

const optionId = (value: string) => `${props.id}-${value.replace(/[^a-zA-Z0-9_-]/g, '-')}`

const selectOption = (value: string) => {
  emit('update:value', value)
  isOpen.value = false
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key !== 'Enter' || isOpen.value || !selectedOption.value) return

  event.preventDefault()
  emit('update:value', selectedOption.value.value)
}
</script>

<style lang="less" module>
.sandbox-select {
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
        padding: 0;
        text-align: left;
        width: 100%;

        &_selected {
            background: transparent;
        }
    }
}
</style>
