<template>
    <div class="ui-v1-calendar-wrapper">
        <div
            v-for="(view, index) in viewsComputed"
            :key="'view-' + index + '-' + view.date"
            class="ui-v1-calendar"
        >
            <template v-if="view.mode === VIEW_MODE.DAYS">
                <nav class="ui-v1-calendar-navigation" :aria-label="i18n.t('monthNavigation')">
                    <UiCalendarDirectionButton
                        :absent="index === 1 && viewsIsSynchronized && views[0].mode === VIEW_MODE.DAYS"
                        :label="i18n.t('prevMonth')"
                        @click="showPrevMonth(index)"
                    />

                    <UiCalendarSwitchButton @click="views[index].mode = VIEW_MODE.MONTHS">
                        <span
                            :id="getGridLabelId(index, VIEW_MODE.DAYS)"
                            aria-atomic="true"
                            aria-live="polite"
                        >
                            {{ i18n.t(`months.${view.date.month - 1}`) }} {{ view.date.year }}
                        </span>
                    </UiCalendarSwitchButton>

                    <UiCalendarDirectionButton
                        :absent="index === 0 && viewsIsSynchronized && views[1].mode === VIEW_MODE.DAYS"
                        :label="i18n.t('nextMonth')"
                        direction="next"
                        @click="showNextMonth(index)"
                    />
                </nav>

                <div
                    class="ui-v1-calendar__table"
                    role="grid"
                    :aria-labelledby="getGridLabelId(index, VIEW_MODE.DAYS)"
                    :aria-describedby="dayGridHintId"
                    :aria-multiselectable="props.type === TYPE.RANGE ? 'true' : undefined"
                >
                    <div class="ui-v1-calendar__row" role="row">
                        <div
                            v-for="(name, i) in weekdaysNames"
                            :key="'weekday-' + i"
                            class="ui-v1-calendar__cell-weekday"
                            role="columnheader"
                            :aria-label="weekdaysLongNames[i]"
                        >
                            {{ name }}
                        </div>
                    </div>

                    <div
                        v-for="(week, i) in view.days"
                        :key="'week-' + (i + 1)"
                        :class="{
                            'ui-v1-calendar__row': true,
                            'ui-v1-calendar__row_justify-end': i === 0,
                        }"
                        role="row"
                    >
                        <UiCalendarCell
                            v-for="day in week"
                            :key="'day-' + index + '-' + day"
                            :class="{
                                'ui-v1-calendar__cell-day': true,
                                'ui-v1-calendar__cell-day_muted':
                                    isDisabledDay(day) ||
                                    !inSelectedMonth(day, index) &&
                                    !isSelectedDay(day),
                            }"
                            :current="isCurrentDay(day)"
                            :selected="isSelectedDay(day)"
                            :disabled="isDisabledDay(day)"
                            :in-range="inRangeDate(day)"
                            :is-range-first="firstInRange(day)"
                            :is-range-last="lastInRange(day)"
                            :data-day-key="toDayKey(day)"
                            :data-view-index="String(index)"
                            role="gridcell"
                            :tabindex="getDayTabIndex(day, index)"
                            :aria-selected="isSelectedDay(day) ? 'true' : undefined"
                            :aria-disabled="isDisabledDay(day) ? 'true' : 'false'"
                            :aria-current="isCurrentDay(day) ? 'date' : undefined"
                            :aria-label="formatDayAriaLabel(day)"
                            @click="onDayClick(day, index)"
                            @touchend="onDayClick(day, index)"
                            @keydown="onDayKeydown($event, day, index)"
                            @focus="onDayFocus(day, index)"
                            @mouseover="hoverDate = day"
                            @mouseleave="hoverDate = null"
                        >
                            <time :datetime="`${day.year}-${pad(day.month)}-${pad(day.dayInMonth)}`">
                                {{ day.dayInMonth }}
                            </time>
                        </UiCalendarCell>
                    </div>
                </div>
            </template>

            <template v-if="view.mode === VIEW_MODE.MONTHS">
                <nav class="ui-v1-calendar-navigation" :aria-label="i18n.t('yearNavigation')">
                    <UiCalendarDirectionButton
                        :label="i18n.t('prevYear')"
                        @click="showYear(view.date.year - 1, index)"
                    />

                    <UiCalendarSwitchButton @click="views[index].mode = VIEW_MODE.YEARS">
                        <span
                            :id="getGridLabelId(index, VIEW_MODE.MONTHS)"
                            aria-atomic="true"
                            aria-live="polite"
                        >
                            {{ view.date.year }}
                        </span>
                    </UiCalendarSwitchButton>

                    <UiCalendarDirectionButton
                        :label="i18n.t('nextYear')"
                        direction="next"
                        @click="showYear(view.date.year + 1, index)"
                    />
                </nav>

                <div
                    class="ui-v1-calendar__table"
                    role="grid"
                    :aria-labelledby="getGridLabelId(index, VIEW_MODE.MONTHS)"
                >
                    <div
                        v-for="(months, rowIndex) in monthRows"
                        :key="'month-row-' + rowIndex"
                        class="ui-v1-calendar__row"
                        role="row"
                    >
                        <UiCalendarCell
                            v-for="month in months"
                            :key="'month-' + month.month"
                            :class="{ 'ui-v1-calendar__cell-month': true }"
                            :current="isCurrentMonth(month.month, index)"
                            role="gridcell"
                            :tabindex="getMonthTabIndex(month.month, index)"
                            :aria-selected="view.date.month === month.month ? 'true' : undefined"
                            :aria-label="`${i18n.t(`months.${month.month - 1}`)} ${view.date.year}`"
                            @click="showMonth(month.month, index)"
                            @keydown="onMonthKeydown($event, month.month, index)"
                            @focus="onMonthFocus(month.month, index)"
                        >
                            <time :datetime="`${view.date.year}-${pad(month.month)}`">
                                <span>{{ month.name }}</span>
                            </time>
                        </UiCalendarCell>
                    </div>
                </div>
            </template>

            <template v-if="view.mode === VIEW_MODE.YEARS">
                <nav class="ui-v1-calendar-navigation" :aria-label="i18n.t('decadeNavigation')">
                    <UiCalendarDirectionButton
                        :label="i18n.t('prevDecade')"
                        @click="showPrevDecade(index)"
                    />

                    <UiCalendarSwitchButton
                        locked
                        @click="views[index].mode = VIEW_MODE.MONTHS"
                    >
                        <span
                            :id="getGridLabelId(index, VIEW_MODE.YEARS)"
                            aria-atomic="true"
                            aria-live="polite"
                        >
                            {{ view.decade[0] }}&ndash;{{ view.decade[view.decade.length - 1] }}
                        </span>
                    </UiCalendarSwitchButton>

                    <UiCalendarDirectionButton
                        :label="i18n.t('nextDecade')"
                        direction="next"
                        @click="showNextDecade(index)"
                    />
                </nav>

                <div
                    class="ui-v1-calendar__table"
                    role="grid"
                    :aria-labelledby="getGridLabelId(index, VIEW_MODE.YEARS)"
                >
                    <div
                        v-for="(years, rowIndex) in getYearRows(view.decade)"
                        :key="'year-row-' + rowIndex"
                        class="ui-v1-calendar__row"
                        role="row"
                    >
                        <UiCalendarCell
                            v-for="year in years"
                            :key="'year-' + year"
                            :class="{ 'ui-v1-calendar__cell-year': true }"
                            :current="isCurrentYear(year)"
                            role="gridcell"
                            :tabindex="getYearTabIndex(year, index)"
                            :aria-selected="view.date.year === year ? 'true' : undefined"
                            :aria-label="String(year)"
                            @click="showYear(year, index)"
                            @keydown="onYearKeydown($event, year, index)"
                            @focus="onYearFocus(year, index)"
                        >
                            <time :datetime="String(year)">{{ year }}</time>
                        </UiCalendarCell>
                    </div>
                </div>
            </template>
        </div>

        <p
            :id="dayGridHintId"
            class="ui-v1-calendar__sr-only"
        >
            {{ dayGridHelpText }}
        </p>
        <p
            class="ui-v1-calendar__sr-only"
            aria-atomic="true"
            aria-live="polite"
        >
            {{ liveAnnouncement }}
        </p>
    </div>
</template>

<script lang="ts" setup>
import type { Locale } from '@/common/components/date'
import type { PropType } from 'vue'
import type { UiCalendarMethods } from '@/common/components/calendar'

import {
  computed,
  getCurrentInstance,
  inject,
  nextTick,
  reactive,
  ref,
} from 'vue'

import UiCalendarCell from './UiCalendarCell.vue'
import UiCalendarDirectionButton from './UiCalendarDirectionButton.vue'
import UiCalendarSwitchButton from './UiCalendarSwitchButton.vue'

import { CalendarDay } from '@/common/components/calendar'

import {
  getDaysOfMonthGrid,
  getDecade,
  inRange,
  isDate,
  isDateArray,
  isInteger,
  isNull,
} from '@/common/components/calendar'

import { APPEARANCE, TYPE, VIEW_MODE } from '@/common/components/calendar'

import { I18nInjectKey } from '@/host/i18n/plugin'

import _i18n from './i18n'

type Maybe<T> = T | undefined | null
type View = {
  date: CalendarDay;
  decade: number[];
  mode: VIEW_MODE;
}

type ViewWithDays = View & {
  days: CalendarDay[][];
}

type MonthCell = {
  month: number;
  name: string;
}

const props = defineProps({
  /** Текущая дата */
  value: {
    type: null as unknown as PropType<null | Date | Date[]>,
    validator: (value: unknown) => isNull(value) || isDate(value) || isDateArray(value),
    default: null,
  },

  /** Тип календаря: обычный или range */
  type: {
    type: String as unknown as PropType<TYPE>,
    validator: (type: string) => Object.values(TYPE).includes(type as TYPE),
    default: TYPE.SINGLE,
  },

  /** Одиночный или двойной вид */
  appearance: {
    type: String as unknown as PropType<APPEARANCE>,
    validator: (appearance: string) => Object.values(APPEARANCE).includes(appearance as APPEARANCE),
    default: APPEARANCE.SINGLE,
  },

  /** Первый день недели */
  firstDayOfWeek: {
    type: null as unknown as PropType<undefined | number>,
    validator: (value: unknown) => value === undefined || (isInteger(value) && inRange(value, [0, 7])),
    default: undefined,
  },

  /** Минимальное значение даты */
  minDate: {
    type: null as unknown as PropType<Date | null>,
    validator: (value: unknown) => isNull(value) || isDate(value),
    default: null,
  },

  /** Максимальное значение даты */
  maxDate: {
    type: null as unknown as PropType<Date | null>,
    validator: (value: unknown) => isNull(value) || isDate(value),
    default: null,
  },

  /** Возможность сбросить дату при клике на неё после выбора */
  nullable: {
    type: Boolean,
    default: false,
  },

  /** Локаль */
  locale: {
    type: null as unknown as PropType<Locale | undefined>,
    validator: (value) => typeof value === 'undefined' || ['en-GB', 'es-ES', 'ru-RU'].includes(value as Locale),
    default: undefined,
  },
})

const emit = defineEmits([
  /** Срабатывает при изменении даты */
  'update:value',
  /** Срабатывает при выборе даты */
  'change',
])

const emitChange = (value: Date | Date[] | null) => {
  emit('update:value', value)
  emit('change', value)
}

const hoverDate = ref(null as Maybe<CalendarDay>)
const today = new CalendarDay()
const initial = props.value
  ? Array.isArray(props.value)
    ? new CalendarDay(props.value[0] ?? today)
    : new CalendarDay(props.value)
  : today
const initialPrimaryViewDate = new CalendarDay(initial.year, initial.month)
const initialSecondaryViewDate = new CalendarDay(initial.year, initial.month + 1)

const views = reactive([{
  date: initialPrimaryViewDate,
  decade: getDecade(initialPrimaryViewDate.year),
  mode: VIEW_MODE.DAYS,
}, {
  date: initialSecondaryViewDate,
  decade: getDecade(initialSecondaryViewDate.year),
  mode: VIEW_MODE.DAYS,
}] as [View, View])

const focusedDays = reactive([null, null] as [Maybe<CalendarDay>, Maybe<CalendarDay>])
const focusedMonths = reactive([initialPrimaryViewDate.month, initialSecondaryViewDate.month] as [number, number])
const focusedYears = reactive([initialPrimaryViewDate.year, initialSecondaryViewDate.year] as [number, number])

const calendarId = `ui-v1-calendar-${getCurrentInstance()?.uid ?? 'instance'}`
const dayGridHintId = `${calendarId}-day-grid-help`
const liveAnnouncement = ref('')

const i18nBus = inject(I18nInjectKey, null)
const resolvedLocale = computed(() => props.locale ?? i18nBus?.locale ?? _i18n.fallback)
const i18n = computed(() => _i18n.init(resolvedLocale.value))
const dayGridHelpText = computed(() => props.type === TYPE.RANGE
  ? i18n.value.t('dayGridHelpRange')
  : i18n.value.t('dayGridHelpSingle'))

const monthsNames = computed((): string[] => {
  return [
    i18n.value.t('monthsShort.0'),
    i18n.value.t('monthsShort.1'),
    i18n.value.t('monthsShort.2'),
    i18n.value.t('monthsShort.3'),
    i18n.value.t('monthsShort.4'),
    i18n.value.t('monthsShort.5'),
    i18n.value.t('monthsShort.6'),
    i18n.value.t('monthsShort.7'),
    i18n.value.t('monthsShort.8'),
    i18n.value.t('monthsShort.9'),
    i18n.value.t('monthsShort.10'),
    i18n.value.t('monthsShort.11'),
  ]
})

const chunk = <T>(items: T[], size: number): T[][] => {
  const result: T[][] = []

  for (let i = 0; i < items.length; i += size) {
    result.push(items.slice(i, i + size))
  }

  return result
}

const monthRows = computed((): MonthCell[][] => {
  return chunk(monthsNames.value.map((name, index) => ({
    month: index + 1,
    name,
  })), 4)
})

const getYearRows = (years: number[]): number[][] => {
  return chunk(years, 4)
}

const weekdaysNames = computed((): string[] => {
  const names = [
    i18n.value.t('weekdays.0'),
    i18n.value.t('weekdays.1'),
    i18n.value.t('weekdays.2'),
    i18n.value.t('weekdays.3'),
    i18n.value.t('weekdays.4'),
    i18n.value.t('weekdays.5'),
    i18n.value.t('weekdays.6'),
  ]

  return [
    ...names.slice(firstDayOfWeekComputed.value),
    ...names.slice(0, firstDayOfWeekComputed.value),
  ]
})

const weekdaysLongNames = computed((): string[] => {
  const format = (locale: string): string[] => {
    const formatter = new Intl.DateTimeFormat(locale, { weekday: 'long' })
    const sunday = new Date(Date.UTC(2024, 0, 7))

    return Array.from({ length: 7 }, (_, index) => {
      return formatter.format(new Date(sunday.getTime() + index * 24 * 60 * 60 * 1000))
    })
  }

  try {
    const names = format(resolvedLocale.value)

    return [
      ...names.slice(firstDayOfWeekComputed.value),
      ...names.slice(0, firstDayOfWeekComputed.value),
    ]
  } catch {
    const names = format(_i18n.fallback)

    return [
      ...names.slice(firstDayOfWeekComputed.value),
      ...names.slice(0, firstDayOfWeekComputed.value),
    ]
  }
})

const viewsComputed = computed((): ViewWithDays[] => {
  const view = [views[0]]

  if (props.appearance === APPEARANCE.DOUBLE) {
    view.push(views[1])
  }

  return view.map(({ date, decade, mode }) => ({
    date,
    decade,
    mode,
    days: getDaysOfMonthGrid(date, firstDayOfWeekComputed.value),
  }))
})

const viewsIsSynchronized = computed((): boolean => {
  const [first, last] = views

  return props.appearance === APPEARANCE.DOUBLE &&
    first.mode === last.mode &&
    first.date.inSameMonth(new CalendarDay(last.date.year, last.date.month - 1))
})

const range = computed((): CalendarDay[] => {
  const [first, last] = valueComputed.value

  const max = props.maxDate ? new CalendarDay(
    props.maxDate.getFullYear(),
    props.maxDate.getMonth() + 1,
    props.maxDate.getDate() + 1
  ) : null

  const min = props.minDate ? new CalendarDay(
    props.minDate.getFullYear(),
    props.minDate.getMonth() + 1,
    props.minDate.getDate() - 1
  ) : null

  const restrict = (date: Maybe<CalendarDay>) => date ? CalendarDay.max(CalendarDay.min(date, max), min) : null

  return props.type === TYPE.SINGLE ? [] : [restrict(first), restrict(last ?? hoverDate.value)]
    .filter((date): date is CalendarDay => !!date)
    .sort((a, b) => a.isBefore(b) ? -1 : 1)
})

const valueComputed = computed((): CalendarDay[] => {
  const dates: (Date | null)[] = isDateArray(props.value) ? props.value : [props.value]

  return dates
    .filter((date): date is Date => !!date)
    .map((date: Date) => new CalendarDay(date))
})

const firstDayOfWeekComputed = computed((): number => {
  return props.firstDayOfWeek ?? Number(i18n.value.t('firstDayOfWeek'))
})

const viewTo = (...dates: Date[]) => {
  let [first, last]: (Date | CalendarDay)[] = dates

  if (dates.length === 1) {
    first = new CalendarDay(dates[0])
    last = new CalendarDay(first.year, first.month + 1)

    if (inSelectedView(first)) return

    views[0] = {
      date: first,
      decade: getDecade(first.year),
      mode: VIEW_MODE.DAYS,
    }
    views[1] = {
      date: last,
      decade: getDecade(last.year),
      mode: VIEW_MODE.DAYS,
    }
    focusedDays[0] = first
    focusedDays[1] = last
    focusedMonths[0] = first.month
    focusedMonths[1] = last.month
    focusedYears[0] = first.year
    focusedYears[1] = last.year

    return
  }

  if (typeof first === 'undefined' && typeof last === 'undefined') {
    return
  }

  first = new CalendarDay(first)
  last = typeof last === 'undefined' || first.inSameMonth(new CalendarDay(last))
    ? new CalendarDay(first.year, first.month + 1)
    : new CalendarDay(last)

  views[0] = {
    date: first,
    decade: getDecade(first.year),
    mode: VIEW_MODE.DAYS,
  }
  views[1] = {
    date: last,
    decade: getDecade(last.year),
    mode: VIEW_MODE.DAYS,
  }
  focusedDays[0] = first
  focusedDays[1] = last
  focusedMonths[0] = first.month
  focusedMonths[1] = last.month
  focusedYears[0] = first.year
  focusedYears[1] = last.year
}

defineExpose({
  viewTo,
} satisfies UiCalendarMethods)

const pad = (value: number): string => {
  return value < 10 ? `0${value}` : `${value}`
}

const toDayKey = (day: CalendarDay): string => {
  return `${day.year}-${pad(day.month)}-${pad(day.dayInMonth)}`
}

const getGridLabelId = (viewIndex: number, mode: VIEW_MODE): string => {
  return `${calendarId}-${viewIndex}-${mode}-label`
}

const clampDayInMonth = (year: number, month: number, dayInMonth: number): CalendarDay => {
  const daysInTargetMonth = new Date(year, month, 0).getDate()
  return new CalendarDay(year, month, Math.min(dayInMonth, daysInTargetMonth))
}

const shiftDayByDays = (day: CalendarDay, days: number): CalendarDay => {
  return new CalendarDay(day.year, day.month, day.dayInMonth + days)
}

const shiftDayByMonths = (day: CalendarDay, monthsOffset: number): CalendarDay => {
  const absoluteMonth = day.month - 1 + monthsOffset
  const year = day.year + Math.floor(absoluteMonth / 12)
  const month = ((absoluteMonth % 12) + 12) % 12 + 1

  return clampDayInMonth(year, month, day.dayInMonth)
}

const shiftDayByYears = (day: CalendarDay, yearsOffset: number): CalendarDay => {
  return clampDayInMonth(day.year + yearsOffset, day.month, day.dayInMonth)
}

const dayGrid = (viewIndex: number): CalendarDay[] => {
  return viewsComputed.value[viewIndex]?.days.flat() ?? []
}

const getDefaultFocusedDay = (viewIndex: number): Maybe<CalendarDay> => {
  const grid = dayGrid(viewIndex)
  if (grid.length === 0) return null

  const selectedInView = valueComputed.value.find((date) => inSelectedMonth(date, viewIndex))
  if (selectedInView) return selectedInView

  if (inSelectedMonth(today, viewIndex)) return today

  return grid.find((date) => !isDisabledDay(date)) ?? grid[0]
}

const getFocusedDay = (viewIndex: number): Maybe<CalendarDay> => {
  const focused = focusedDays[viewIndex]
  if (!focused) return getDefaultFocusedDay(viewIndex)

  return dayGrid(viewIndex).find((day) => day.inSameDay(focused)) ?? getDefaultFocusedDay(viewIndex)
}

const getDayTabIndex = (day: CalendarDay, viewIndex: number): number => {
  const focused = getFocusedDay(viewIndex)
  return focused && day.inSameDay(focused) ? 0 : -1
}

const onDayFocus = (day: CalendarDay, viewIndex: number) => {
  focusedDays[viewIndex] = day
}

const getMonthTabIndex = (month: number, viewIndex: number): number => {
  const focused = focusedMonths[viewIndex] ?? views[viewIndex].date.month
  return focused === month ? 0 : -1
}

const onMonthFocus = (month: number, viewIndex: number) => {
  focusedMonths[viewIndex] = month
}

const getYearTabIndex = (year: number, viewIndex: number): number => {
  const focused = focusedYears[viewIndex] ?? views[viewIndex].date.year
  return focused === year ? 0 : -1
}

const onYearFocus = (year: number, viewIndex: number) => {
  focusedYears[viewIndex] = year
}

const focusDayCell = async (day: CalendarDay, viewIndex: number): Promise<void> => {
  await nextTick()

  const selector = `.ui-v1-calendar__cell-day[data-view-index="${viewIndex}"][data-day-key="${toDayKey(day)}"]`
  const cell = document.querySelector<HTMLElement>(selector)

  if (cell) {
    cell.focus()
    return
  }

  const fallbackSelector = `.ui-v1-calendar__cell-day[data-view-index="${viewIndex}"]`
  document.querySelector<HTMLElement>(fallbackSelector)?.focus()
}

const moveDayFocus = async (day: CalendarDay, viewIndex: number): Promise<void> => {
  focusedDays[viewIndex] = day

  if (!inSelectedMonth(day, viewIndex)) {
    views[viewIndex].date = new CalendarDay(day.year, day.month)
    views[viewIndex].mode = VIEW_MODE.DAYS
  }

  await focusDayCell(day, viewIndex)
}

const formatDayAriaLabel = (day: CalendarDay): string => {
  try {
    return new Intl.DateTimeFormat(resolvedLocale.value, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(day.date)
  } catch {
    return new Intl.DateTimeFormat(_i18n.fallback, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(day.date)
  }
}

const formatAnnouncementDate = (date: Date): string => {
  try {
    return new Intl.DateTimeFormat(resolvedLocale.value, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date)
  } catch {
    return new Intl.DateTimeFormat(_i18n.fallback, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date)
  }
}

const announceSelection = (value: Date | Date[] | null) => {
  if (isNull(value)) {
    liveAnnouncement.value = i18n.value.t('selectionCleared')
    return
  }

  if (isDate(value)) {
    liveAnnouncement.value = i18n.value.t('selectionSingle', {
      date: formatAnnouncementDate(value),
    })
    return
  }

  if (isDateArray(value)) {
    if (value.length === 0) {
      liveAnnouncement.value = i18n.value.t('selectionCleared')
      return
    }

    if (value.length === 1) {
      liveAnnouncement.value = i18n.value.t('selectionRangeStart', {
        date: formatAnnouncementDate(value[0]),
      })
      return
    }

    liveAnnouncement.value = i18n.value.t('selectionRangeEnd', {
      start: formatAnnouncementDate(value[0]),
      end: formatAnnouncementDate(value[1]),
    })
  }
}

const onGridCellKeydown = (event: KeyboardEvent, callback: () => void) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    callback()
  }
}

const getGridCells = (currentTarget: EventTarget | null): HTMLElement[] => {
  const cell = currentTarget instanceof HTMLElement ? currentTarget : null
  const grid = cell?.closest<HTMLElement>('[role="grid"]')
  if (!grid) return []

  return [...grid.querySelectorAll<HTMLElement>('[role="gridcell"]')]
}

const onGridNavigationKeydown = (event: KeyboardEvent, columns: number): boolean => {
  const current = event.currentTarget instanceof HTMLElement ? event.currentTarget : null
  if (!current) return false

  const cells = getGridCells(current)
  const index = cells.indexOf(current)
  if (index === -1) return false

  const rowStart = Math.floor(index / columns) * columns
  const rowEnd = Math.min(rowStart + columns - 1, cells.length - 1)

  let next = index

  switch (event.key) {
    case 'ArrowRight':
      next = Math.min(index + 1, cells.length - 1)
      break
    case 'ArrowLeft':
      next = Math.max(index - 1, 0)
      break
    case 'ArrowDown':
      next = Math.min(index + columns, cells.length - 1)
      break
    case 'ArrowUp':
      next = Math.max(index - columns, 0)
      break
    case 'Home':
      next = rowStart
      break
    case 'End':
      next = rowEnd
      break
    default:
      return false
  }

  event.preventDefault()
  cells[next]?.focus()

  return true
}

const onDayKeydown = async (event: KeyboardEvent, day: CalendarDay, viewIndex: number) => {
  const dayInWeekOffset = ((day.dayInWeek - firstDayOfWeekComputed.value) % 7 + 7) % 7

  if (event.key === 'PageUp') {
    event.preventDefault()
    await moveDayFocus(event.shiftKey ? shiftDayByYears(day, -1) : shiftDayByMonths(day, -1), viewIndex)
    return
  }

  if (event.key === 'PageDown') {
    event.preventDefault()
    await moveDayFocus(event.shiftKey ? shiftDayByYears(day, 1) : shiftDayByMonths(day, 1), viewIndex)
    return
  }

  if (event.key === 'Home') {
    event.preventDefault()
    await moveDayFocus(shiftDayByDays(day, -dayInWeekOffset), viewIndex)
    return
  }

  if (event.key === 'End') {
    event.preventDefault()
    await moveDayFocus(shiftDayByDays(day, 6 - dayInWeekOffset), viewIndex)
    return
  }

  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    await moveDayFocus(shiftDayByDays(day, -1), viewIndex)
    return
  }

  if (event.key === 'ArrowRight') {
    event.preventDefault()
    await moveDayFocus(shiftDayByDays(day, 1), viewIndex)
    return
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault()
    await moveDayFocus(shiftDayByDays(day, -7), viewIndex)
    return
  }

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    await moveDayFocus(shiftDayByDays(day, 7), viewIndex)
    return
  }

  if (onGridNavigationKeydown(event, 7)) {
    return
  }

  onGridCellKeydown(event, () => onDayClick(day, viewIndex))
}

const onMonthKeydown = (event: KeyboardEvent, month: number, viewIndex: number) => {
  if (onGridNavigationKeydown(event, 4)) {
    return
  }

  onGridCellKeydown(event, () => showMonth(month, viewIndex))
}

const onYearKeydown = (event: KeyboardEvent, year: number, viewIndex: number) => {
  if (onGridNavigationKeydown(event, 4)) {
    return
  }

  onGridCellKeydown(event, () => showYear(year, viewIndex))
}

const onDayClick = (day: CalendarDay, viewIndex: number): void => {
  focusedDays[viewIndex] = day

  if (isSelectedDay(day) && !props.nullable || isDisabledDay(day)) {
    return
  }

  if (!inSelectedView(day)) {
    views[viewIndex].date = new CalendarDay(day.year, day.month)
  }

  if (props.type === TYPE.SINGLE) {
    const [first] = valueComputed.value
    const nextValue = first && day.inSameDay(first) ? null : day.date

    emitChange(nextValue)
    announceSelection(nextValue)
  } else {
    const nextValue = calculateValue(day)

    emitChange(nextValue)
    announceSelection(nextValue)
  }
}

const calculateValue = (day: CalendarDay): Date[] => {
  const [first, last] = valueComputed.value

  if (!first) {
    return [day.date]
  }

  if (day.inSameDay(first)) {
    return []
  }

  if (!last) {
    const value = [first.date, day.date]
    return first.isBefore(day) ? value : value.reverse()
  }

  if (day.inSameDay(last)) {
    return [first.date]
  }

  return [day.date]
}

const showNextMonth = (viewIndex: number): void => {
  if (viewsIsSynchronized.value) {
    showMonth(views[0].date.month + 1, 0)
    showMonth(views[1].date.month + 1, 1)
  } else {
    showMonth(views[viewIndex].date.month + 1, viewIndex)
  }
}

const showPrevMonth = (viewIndex: number): void => {
  if (viewsIsSynchronized.value) {
    showMonth(views[0].date.month - 1, 0)
    showMonth(views[1].date.month - 1, 1)
  } else {
    showMonth(views[viewIndex].date.month - 1, viewIndex)
  }
}

const showMonth = (month: number, viewIndex: number): void => {
  const year = views[viewIndex].date.year
  const focusedDay = focusedDays[viewIndex]?.dayInMonth ?? valueComputed.value[0]?.dayInMonth ?? 1

  views[viewIndex].date = new CalendarDay(year, month)
  views[viewIndex].mode = VIEW_MODE.DAYS
  focusedDays[viewIndex] = clampDayInMonth(year, month, focusedDay)
  focusedMonths[viewIndex] = month
  focusedYears[viewIndex] = year
}

const showYear = (year: number, viewIndex: number): void => {
  const month = views[viewIndex].date.month

  views[viewIndex].date = new CalendarDay(year, month)
  views[viewIndex].mode = VIEW_MODE.MONTHS
  focusedMonths[viewIndex] = month
  focusedYears[viewIndex] = year
}

const showPrevDecade = (viewIndex: number): void => {
  views[viewIndex].decade = getDecade(views[viewIndex].decade[1] - 10)
}

const showNextDecade = (viewIndex: number): void => {
  views[viewIndex].decade = getDecade(views[viewIndex].decade[1] + 10)
}

const isCurrentDay = (date: CalendarDay): boolean => {
  return date.inSameDay(new CalendarDay())
}

const isCurrentMonth = (month: number, viewIndex: number): boolean => {
  const date = new CalendarDay()

  return date.month === month && date.year === views[viewIndex].date.year
}

const isCurrentYear = (year: number): boolean => {
  return year === new CalendarDay().year
}

const isSelectedDay = (date: CalendarDay): boolean => {
  return valueComputed.value.some(d => date.inSameDay(d))
}

const isDisabledDay = (date: CalendarDay): boolean => {
  const max = props.maxDate ? new CalendarDay(
    props.maxDate.getFullYear(),
    props.maxDate.getMonth() + 1,
    props.maxDate.getDate()
  ) : null
  const min = props.minDate ? new CalendarDay(
    props.minDate.getFullYear(),
    props.minDate.getMonth() + 1,
    props.minDate.getDate()
  ) : null

  return date.isBefore(min) || date.isAfter(max)
}

const inSelectedMonth = (date: CalendarDay, viewIndex: number): boolean => {
  return date.inSameMonth(views[viewIndex].date)
}

const inSelectedView = (date: CalendarDay): boolean => {
  return inSelectedMonth(date, 0) || inSelectedMonth(date, 1) && props.appearance === APPEARANCE.DOUBLE
}

const inRangeDate = (date: CalendarDay): boolean => {
  const [min, max] = range.value

  return date.isAfter(min) && date.isBefore(max)
}

const firstInRange = (date: CalendarDay): boolean => {
  const [min] = range.value

  return (min && date.inSameDay(new CalendarDay(
    min.year,
    min.month,
    min.dayInMonth + 1
  )))
}

const lastInRange = (date: CalendarDay): boolean => {
  const [, max] = range.value

  return (max && date.inSameDay(new CalendarDay(
    max.year,
    max.month,
    max.dayInMonth - 1
  )))
}
</script>

<style lang="less" src="./calendar.less" />
