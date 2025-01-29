<template>
    <time ref="root" v-bind="{ datetime: formatISO(date), ...$attrs }">
        {{ withTime ? formatDateTime(date, locale) : formatDate(date, locale) }}
    </time>
</template>

<script lang="ts" setup>
import type { Locale } from '@/common/components/date'
import type { PropType } from 'vue'

import { formatISO } from 'date-fns'
import { useElementRef } from '@/host/composables'

import {
  formatDate,
  formatDateTime,
} from '@/common/formatters/date'

defineProps({
  date: {
    type: [Date, String] as PropType<Date | string>,
    required: true,
  },

  locale: {
    type: null as unknown as PropType<Locale | undefined>,
    validator: (value) => typeof value === 'undefined' || ['en-GB', 'es-ES', 'ru-RU'].includes(value as Locale),
    default: undefined,
  },

  withTime: {
    type: Boolean,
    default: false,
  },
})

const root = useElementRef<HTMLTimeElement>()
</script>