<template>
    <UiPageHeader
        v-model:value="value"
        v-bind="omit(props, ['value'])"
    >
        <template #actions>
            <UiButton appearance="tertiary">
                Действия
                <IconCaretDown aria-hidden="true" />
            </UiButton>
        </template>
    </UiPageHeader>
</template>

<script lang="ts" setup>
import type { UiPageHeaderProperties } from '@/common/components/page-header'

import { ref } from 'vue'
import { watch } from 'vue'

import IconCaretDown from '~assets/sprites/arrows/caret-down.svg'
import UiButton from '@/host/components/button/UiButton.vue'
import UiPageHeader from '@/host/components/page-header/UiPageHeader.vue'

import { omit } from '@/common/utils'

const props = withDefaults(defineProps<UiPageHeaderProperties>(), {
  value: 'Новая рассылка',
  placeholder: '',
  size: 'xl',
  editable: true,
  autofocus: false,
  autoselect: true,
  readonly: false,
  disabled: false,
  invalid: false,
})

const value = ref(props.value === null ? '' : String(props.value))

watch(() => props.value, (nextValue) => {
  value.value = nextValue === null ? '' : String(nextValue)
})
</script>
