<template>
    <div style="display: grid; gap: 12px;">
        <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
            <label>
                Locale
                <select v-model="locale">
                    <option value="en-GB">en-GB</option>
                    <option value="es-ES">es-ES</option>
                    <option value="ru-RU">ru-RU</option>
                </select>
            </label>

            <label>
                First day
                <select v-model="firstDayOfWeekRaw">
                    <option value="auto">auto</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
            </label>
        </div>

        <UiCalendar
            v-model:value="value"
            :locale="locale"
            :first-day-of-week="firstDayOfWeek"
        />
    </div>
</template>

<script setup lang="ts">
import type { Locale } from '@/common/components/date'

import { computed, ref } from 'vue'

import UiCalendar from '@/host/components/calendar/UiCalendar.vue'

const value = ref<Date | null>(new Date('2024-11-21'))
const locale = ref<Locale>('en-GB')
const firstDayOfWeekRaw = ref('auto')
const firstDayOfWeek = computed(() => firstDayOfWeekRaw.value === 'auto'
  ? undefined
  : Number(firstDayOfWeekRaw.value))
</script>
