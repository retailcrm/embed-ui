<template>
    <div :class="$style['v-copy-button']">
        <UiPopperConnector>
            <UiCopyButton
                :text="text"
                :size="size as CopyButtonSize"
                :tooltip-options="{ placement: 'bottom' }"
                @error="emit('error', $event)"
            >
                <template #trigger>
                    <slot name="trigger">
                        <UiButton :aria-label="label" :size="size" appearance="tertiary">
                            <IconCopy aria-hidden="true" />
                        </UiButton>
                    </slot>
                </template>

                <template #hint>
                    <slot name="hint" />
                </template>

                <template #hint-copied>
                    <slot name="hint-copied" />
                </template>
            </UiCopyButton>
        </UiPopperConnector>
    </div>
</template>

<script setup lang="ts">
import {
  UiButton,
  UiCopyButton,
  UiPopperConnector,
} from '@retailcrm/embed-ui-v1-components/host'

import IconCopy from '@retailcrm/embed-ui-v1-components/assets/sprites/media-and-editing/copy.svg'

type CopyButtonSize = InstanceType<typeof UiCopyButton>['$props']['size']

withDefaults(defineProps<{
  label: string;
  size?: `${CopyButtonSize}`;
  text: string;
}>(), {
  size: 'xs',
})

const emit = defineEmits<{
  error: [error: unknown];
}>()
</script>

<style lang="less" module>
.v-copy-button {
    display: inline-flex;
    width: max-content;
}
</style>
