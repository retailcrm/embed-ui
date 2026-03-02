<template>
    <div
        :class="{
            'ui-v1-calendar-cell': true,
            'ui-v1-calendar-cell_current': current,
            'ui-v1-calendar-cell_selected': selected,
            'ui-v1-calendar-cell_disabled': disabled,
            'ui-v1-calendar-cell_in-range': inRange,
            'ui-v1-calendar-cell_is-range-first': isRangeFirst,
            'ui-v1-calendar-cell_is-range-last': isRangeLast,
        }"
        v-bind="{ ...$attrs }"
    >
        <div aria-hidden="true" class="ui-v1-calendar-cell__backdrop" />
        <div class="ui-v1-calendar-cell__content">
            <slot />
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps({
  current: {
    type: Boolean,
    default: false,
  },

  selected: {
    type: Boolean,
    default: false,
  },

  inRange: {
    type: Boolean,
    default: false,
  },

  isRangeFirst: {
    type: Boolean,
    default: false,
  },

  isRangeLast: {
    type: Boolean,
    default: false,
  },

  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>
