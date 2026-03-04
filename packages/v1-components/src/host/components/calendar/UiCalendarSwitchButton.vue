<template>
    <UiButton
        v-if="!locked"
        appearance="tertiary"
        class="ui-v1-calendar-navigation__switch-button"
        @click="$emit('click')"
    >
        <slot />
    </UiButton>

    <div
        v-else
        class="ui-v1-calendar-navigation__text"
    >
        <slot />
    </div>
</template>

<script lang="ts" setup>
import UiButton from '@/host/components/button/UiButton.vue'

defineProps({
  locked: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['click'])
</script>
