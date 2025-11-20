<template>
    <UiTextbox
        v-model:value="text"
        v-bind="omit(props, [
            'value',
            'withLeadingIcon',
            'withTrailingIcon',
        ])"
    >
        <template v-if="withLeadingIcon" #leading-icon>
            <IconSearch aria-hidden="true" />
        </template>

        <template v-if="withTrailingIcon" #trailing-icon>
            <IconCaret aria-hidden="true" />
        </template>
    </UiTextbox>
</template>

<script lang="ts" setup>
import type { UiTextboxProperties } from '@/common/components/textbox'

import IconCaret from '~assets/sprites/arrows/caret-down.svg'
import IconSearch from '~assets/sprites/actions/search.svg'
import UiTextbox from '@/host/components/textbox/UiTextbox.vue'

import { omit } from '@/common/utils'
import { ref } from 'vue'

const props = withDefaults(defineProps<UiTextboxProperties & {
  withLeadingIcon?: boolean;
  withTrailingIcon?: boolean;
}>(), {
  value: '',
  outlined: true,
  withLeadingIcon: false,
  withTrailingIcon: false,
})

const text = ref(props.value)
</script>
