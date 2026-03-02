import type { VueWrapper } from '@vue/test-utils'

import {
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
} from 'vitest'

import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import UiCalendar from '@/host/components/calendar/UiCalendar.vue'
import UiCalendarDirectionButton from '@/host/components/calendar/UiCalendarDirectionButton.vue'
import UiCalendarSwitchButton from '@/host/components/calendar/UiCalendarSwitchButton.vue'

import I18nPlugin, { VueI18n } from '@/host/i18n/plugin'

const pad = (value: number): string => (value < 10 ? `0${value}` : String(value))

const findDay = (date: Date): HTMLElement | null => {
  const datetime = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

  return [
    ...document.querySelectorAll<HTMLElement>('.ui-v1-calendar__cell-day'),
  ].find((element) => {
    return element.querySelector('time')?.getAttribute('datetime') === datetime
  }) ?? null
}

const findButton = (text: string): HTMLButtonElement | null => {
  return [
    ...document.querySelectorAll<HTMLButtonElement>('button'),
  ].find((button) => button.textContent?.trim() === text) ?? null
}

const firstDayInMonthName = (): string => {
  const firstDayInMonth = document.querySelector<HTMLElement>('.ui-v1-calendar__cell-day time')
  return firstDayInMonth?.innerHTML?.trim() ?? ''
}

const daysAfter = (date: Date): HTMLElement[] => {
  const days = [...document.querySelectorAll<HTMLElement>('.ui-v1-calendar__cell-day')]
  return days.slice(days.indexOf(findDay(date) as HTMLElement) + 1)
}

const daysBefore = (date: Date): HTMLElement[] => {
  const days = [...document.querySelectorAll<HTMLElement>('.ui-v1-calendar__cell-day')]
  return days.slice(0, days.indexOf(findDay(date) as HTMLElement))
}

const daysBetween = (minDate: Date, maxDate: Date): HTMLElement[] => {
  const days = [...document.querySelectorAll<HTMLElement>('.ui-v1-calendar__cell-day')]

  return days.slice(
    days.indexOf(findDay(minDate) as HTMLElement),
    days.indexOf(findDay(maxDate) as HTMLElement) + 1
  )
}

const countCellsInRange = (): number => {
  return [...document.querySelectorAll<HTMLElement>('.ui-v1-calendar__cell-day')]
    .filter(day => day.classList.contains('ui-v1-calendar-cell_in-range'))
    .length
}

const isCellDisabled = (cell: HTMLElement | null): boolean => {
  return cell?.className.includes('ui-v1-calendar-cell_disabled') ?? false
}

const isCellSelected = (cell: HTMLElement | null): boolean => {
  return cell?.className.includes('ui-v1-calendar-cell_selected') ?? false
}

const reactionFor = async (action: () => void) => {
  action()
  await nextTick()
  await nextTick()
}

const keydown = (element: HTMLElement | null, key: string, options: KeyboardEventInit = {}) => {
  element?.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, ...options }))
}

describe('host/components/calendar', () => {
  let el: HTMLElement | null = null
  let i18n: VueI18n | null = null
  let wrapper: VueWrapper | null = null

  const createComponent = (options = {}) => {
    wrapper = mount(UiCalendar, {
      attachTo: el as HTMLElement,
      global: {
        plugins: [
          [I18nPlugin, i18n as VueI18n],
        ],
      },
      ...options,
    })
  }

  beforeEach(() => {
    el = document.createElement('div')
    el.id = 'ui-v1-calendar'

    document.body.appendChild(el)

    i18n = new VueI18n('en-GB')
  })

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null

    el?.remove()
    el = null

    i18n = null
  })

  test('current day', () => {
    createComponent({ props: { value: new Date() } })

    const day = findDay(new Date())

    expect(day?.querySelector('time')?.innerHTML?.trim())
      .toEqual(String((new Date()).getDate()))
  })

  test('emit event change when selected new date', async () => {
    createComponent({
      props: { value: new Date(2023, 10, 21) },
    })

    await reactionFor(() => findDay(new Date(2023, 10, 20))?.click())

    expect(wrapper?.emitted('change')).toEqual([[new Date(2023, 10, 20)]])
  })

  test('uses grid semantics for interactive calendar', () => {
    createComponent({
      props: { value: new Date(2023, 10, 21) },
    })

    const grid = document.querySelector('.ui-v1-calendar__table[role="grid"]')
    const headers = document.querySelectorAll('.ui-v1-calendar__cell-weekday[role="columnheader"]')
    const activeCell = findDay(new Date(2023, 10, 21))

    expect(grid).not.toBeNull()
    expect(headers).toHaveLength(7)
    expect(activeCell?.getAttribute('role')).toBe('gridcell')
    expect(activeCell?.getAttribute('aria-selected')).toBe('true')
  })

  test('supports keyboard activation with Enter for days', async () => {
    createComponent({
      props: { value: new Date(2023, 10, 21) },
    })

    const day = findDay(new Date(2023, 10, 20))
    await reactionFor(() => day?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })))

    expect(wrapper?.emitted('change')).toEqual([[new Date(2023, 10, 20)]])
  })

  test('supports keyboard focus navigation inside grid', async () => {
    createComponent({
      props: { value: new Date(2023, 10, 21) },
    })

    const day = findDay(new Date(2023, 10, 21))
    day?.focus()

    await reactionFor(() => keydown(day, 'End'))
    const row = day?.closest('[role="row"]')
    const rowCells = [...(row?.querySelectorAll<HTMLElement>('[role="gridcell"]') ?? [])]

    expect(document.activeElement).toBe(rowCells[rowCells.length - 1] ?? null)

    await reactionFor(() => keydown(document.activeElement as HTMLElement | null, 'Home'))
    expect(document.activeElement).toBe(rowCells[0] ?? null)

    await reactionFor(() => keydown(document.activeElement as HTMLElement | null, 'ArrowDown'))
    const gridCells = [...document.querySelectorAll<HTMLElement>('.ui-v1-calendar__cell-day[role="gridcell"]')]
    const firstRowFirstCellIndex = gridCells.indexOf(rowCells[0] as HTMLElement)
    const expected = gridCells[firstRowFirstCellIndex + 7]

    expect(document.activeElement).toBe(expected ?? null)
  })

  test('keeps a single tab stop in day grid (roving tabindex)', () => {
    createComponent({
      props: { value: new Date(2023, 10, 21) },
    })

    const dayCells = [...document.querySelectorAll<HTMLElement>('.ui-v1-calendar__cell-day[role="gridcell"]')]
    const tabbable = dayCells.filter((cell) => cell.getAttribute('tabindex') === '0')

    expect(tabbable).toHaveLength(1)
    expect(tabbable[0]?.querySelector('time')?.getAttribute('datetime')).toBe('2023-11-21')
  })

  test('supports PageUp/PageDown and Shift+PageDown shortcuts in day grid', async () => {
    createComponent({
      props: { value: new Date(2023, 10, 21) },
    })

    const day = findDay(new Date(2023, 10, 21))
    day?.focus()

    await reactionFor(() => keydown(day, 'PageUp'))
    expect(findButton('October 2023')).not.toBeNull()
    expect((document.activeElement as HTMLElement | null)?.querySelector('time')?.getAttribute('datetime'))
      .toBe('2023-10-21')

    await reactionFor(() => keydown(document.activeElement as HTMLElement | null, 'PageDown', { shiftKey: true }))
    expect(findButton('October 2024')).not.toBeNull()
    expect((document.activeElement as HTMLElement | null)?.querySelector('time')?.getAttribute('datetime'))
      .toBe('2024-10-21')
  })

  test('links day grid to heading and provides full weekday labels', () => {
    createComponent({
      props: { value: new Date(2023, 10, 21) },
    })

    const grid = document.querySelector<HTMLElement>('.ui-v1-calendar__table[role="grid"]')
    const labelledBy = grid?.getAttribute('aria-labelledby')
    const describedBy = grid?.getAttribute('aria-describedby')
    const heading = labelledBy ? document.getElementById(labelledBy) : null
    const hint = describedBy ? document.getElementById(describedBy) : null
    const headers = [...document.querySelectorAll<HTMLElement>('.ui-v1-calendar__cell-weekday[role="columnheader"]')]

    expect(labelledBy).toBeTruthy()
    expect(describedBy).toBeTruthy()
    expect(heading).not.toBeNull()
    expect(hint?.textContent?.trim()).toBeTruthy()
    expect(headers).toHaveLength(7)
    expect(headers.every((header) => Boolean(header.getAttribute('aria-label')))).toBe(true)
  })

  test('announces selected date in live region', async () => {
    createComponent({
      props: { value: new Date(2023, 10, 21), locale: 'en-GB' },
    })

    const liveRegion = [...document.querySelectorAll<HTMLElement>('.ui-v1-calendar__sr-only')]
      .find((element) => element.getAttribute('aria-live') === 'polite')

    expect(liveRegion?.textContent?.trim()).toBe('')

    await reactionFor(() => findDay(new Date(2023, 10, 20))?.click())

    expect(liveRegion?.textContent).toContain('Selected date:')
    expect(liveRegion?.textContent).toContain('20 November 2023')
  })

  test('announces range start and end in live region', async () => {
    wrapper = mount({
      components: { UiCalendar },
      data: () => ({
        value: [] as Date[],
      }),
      template: '<UiCalendar v-model:value="value" type="range" locale="en-GB" />',
    }, {
      attachTo: el as HTMLElement,
      global: {
        plugins: [
          [I18nPlugin, i18n as VueI18n],
        ],
      },
    })

    const liveRegion = [...document.querySelectorAll<HTMLElement>('.ui-v1-calendar__sr-only')]
      .find((element) => element.getAttribute('aria-live') === 'polite')
    const dayCells = [...document.querySelectorAll<HTMLElement>('.ui-v1-calendar__cell-day')]
      .filter((cell) => !cell.className.includes('ui-v1-calendar-cell_disabled'))
    const firstDay = dayCells[3]
    const firstDate = firstDay?.querySelector('time')?.getAttribute('datetime')

    await reactionFor(() => firstDay?.click())
    expect(liveRegion?.textContent).toContain('Range start:')

    const secondDay = [...document.querySelectorAll<HTMLElement>('.ui-v1-calendar__cell-day')]
      .filter((cell) => !cell.className.includes('ui-v1-calendar-cell_disabled'))
      .find((cell) => cell.querySelector('time')?.getAttribute('datetime') !== firstDate)

    await reactionFor(() => secondDay?.click())
    expect(liveRegion?.textContent).toContain('Selected range from')
    expect(liveRegion?.textContent).toContain('to')
  })

  test('direction button renders placeholder when absent', () => {
    const wrapper = mount(UiCalendarDirectionButton, {
      props: {
        label: 'Previous month',
        absent: true,
      },
    })

    expect(wrapper.find('.ui-v1-calendar-navigation__placeholder').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(false)
  })

  test('direction button emits click when available', async () => {
    const wrapper = mount(UiCalendarDirectionButton, {
      props: {
        label: 'Next month',
        direction: 'next',
        absent: false,
      },
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('click')).toEqual([[]])
  })

  test('switch button renders text container when locked', () => {
    const wrapper = mount(UiCalendarSwitchButton, {
      props: { locked: true },
      slots: {
        default: 'November 2023',
      },
    })

    expect(wrapper.find('.ui-v1-calendar-navigation__text').exists()).toBe(true)
    expect(wrapper.find('.ui-v1-calendar-navigation__text').text()).toContain('November 2023')
    expect(wrapper.find('button').exists()).toBe(false)
  })

  test('switch button emits click when unlocked', async () => {
    const wrapper = mount(UiCalendarSwitchButton, {
      props: { locked: false },
      slots: {
        default: 'November 2023',
      },
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('click')).toEqual([[]])
  })

  test('selects a day from a specified month', async () => {
    wrapper = mount({
      components: { UiCalendar },
      data: () => ({
        value: new Date(2023, 10, 21),
      }),
      template: '<UiCalendar v-model:value="value" />',
    }, {
      attachTo: el as HTMLElement,
      global: {
        plugins: [
          [I18nPlugin, i18n as VueI18n],
        ],
      },
    })

    const day = findDay(new Date(2023, 10, 20))
    await reactionFor(() => day?.click())

    expect(isCellSelected(day)).toBe(true)
  })

  test('selects a day from a previous month', async () => {
    wrapper = mount({
      components: { UiCalendar },
      data: () => ({
        value: new Date(2023, 10, 21),
      }),
      template: '<UiCalendar v-model:value="value" />',
    }, {
      attachTo: el as HTMLElement,
      global: {
        plugins: [
          [I18nPlugin, i18n as VueI18n],
        ],
      },
    })

    expect(findButton('November 2023')).not.toBeNull()

    const currentMonthDay = findDay(new Date(2023, 9, 30))
    await reactionFor(() => currentMonthDay?.click())

    expect(isCellSelected(currentMonthDay)).toBe(false)
    expect(findButton('October 2023')).not.toBeNull()
    expect(isCellSelected(findDay(new Date(2023, 9, 30)))).toBe(true)
  })

  test('selects a day from a next month', async () => {
    wrapper = mount({
      components: { UiCalendar },
      data: () => ({
        value: new Date(2023, 10, 21),
      }),
      template: '<UiCalendar v-model:value="value" />',
    }, {
      attachTo: el as HTMLElement,
      global: {
        plugins: [
          [I18nPlugin, i18n as VueI18n],
        ],
      },
    })

    expect(findButton('November 2023')).not.toBeNull()

    const currentMonthDay = findDay(new Date(2023, 11, 1))
    await reactionFor(() => currentMonthDay?.click())

    expect(isCellSelected(currentMonthDay)).toBe(false)
    expect(findButton('December 2023')).not.toBeNull()
    expect(isCellSelected(findDay(new Date(2023, 11, 1)))).toBe(true)
  })

  test('clears selected day when nullable and selected day is clicked again', async () => {
    wrapper = mount({
      components: { UiCalendar },
      data: () => ({
        value: new Date(2023, 10, 21),
      }),
      template: '<UiCalendar v-model:value="value" nullable />',
    }, {
      attachTo: el as HTMLElement,
      global: {
        plugins: [
          [I18nPlugin, i18n as VueI18n],
        ],
      },
    })

    const day = findDay(new Date(2023, 10, 21))

    expect(isCellSelected(day)).toBe(true)

    await reactionFor(() => day?.click())

    expect(isCellSelected(day)).toBe(false)
  })

  test('emits change on day click when nullable', async () => {
    createComponent({
      props: {
        value: new Date(2023, 10, 21),
        nullable: true,
      },
    })

    const day = findDay(new Date(2023, 10, 20))
    await reactionFor(() => day?.click())

    expect(wrapper?.emitted('change')).toEqual([[new Date(2023, 10, 20)]])

    await reactionFor(() => day?.click())

    expect(wrapper?.emitted('change')).toEqual([
      [new Date(2023, 10, 20)],
      [new Date(2023, 10, 20)],
    ])
  })

  test('bounds in specified month', () => {
    createComponent({
      props: {
        value: new Date(2023, 10, 14),
        minDate: new Date(2023, 10, 8),
        maxDate: new Date(2023, 10, 15),
        locale: 'ru-RU',
      },
    })

    expect(daysBefore(new Date(2023, 10, 8)).every(isCellDisabled)).toBe(true)
    expect(daysAfter(new Date(2023, 10, 15)).every(isCellDisabled)).toBe(true)
    expect(
      daysBetween(
        new Date(2023, 10, 8),
        new Date(2023, 10, 15)
      ).some(isCellDisabled)
    ).toBe(false)
  })

  test('bounds from previous month to current', () => {
    createComponent({
      props: {
        value: new Date(2023, 10, 14),
        minDate: new Date(2023, 9, 21),
        maxDate: new Date(2023, 10, 15),
        locale: 'ru-RU',
      },
    })

    expect(daysBefore(new Date(2023, 10, 15)).some(isCellDisabled)).toBe(false)
    expect(daysAfter(new Date(2023, 10, 15)).every(isCellDisabled)).toBe(true)
  })

  test('bounds from the current month to the next', () => {
    createComponent({
      props: {
        value: new Date(2023, 10, 14),
        minDate: new Date(2023, 10, 15),
        maxDate: new Date(2023, 11, 11),
        locale: 'ru-RU',
      },
    })

    expect(daysBefore(new Date(2023, 10, 15)).every(isCellDisabled)).toBe(true)
    expect(daysAfter(new Date(2023, 10, 15)).some(isCellDisabled)).toBe(false)
  })

  test('selects range between clicked day and current value', async () => {
    wrapper = mount({
      components: { UiCalendar },
      data: () => ({
        value: new Date(2023, 10, 21),
      }),
      template: '<UiCalendar v-model:value="value" type="range" />',
    }, {
      attachTo: el as HTMLElement,
      global: {
        plugins: [
          [I18nPlugin, i18n as VueI18n],
        ],
      },
    })

    const dayWeekBack = findDay(new Date(2023, 10, 14))
    await reactionFor(() => dayWeekBack?.click())

    expect(isCellSelected(dayWeekBack)).toBe(true)
    expect(isCellSelected(findDay(new Date(2023, 10, 21)))).toBe(true)
    expect(countCellsInRange()).toEqual(6)
  })

  test('updates month title when locale changes', async () => {
    createComponent({
      props: { value: new Date(2023, 10, 21) },
    })

    expect(findButton('November 2023')).not.toBeNull()

    await reactionFor(() => (i18n as VueI18n).locale = 'ru-RU')

    expect(findButton('Ноябрь 2023')).not.toBeNull()
  })

  test('locale with wrong language', async () => {
    createComponent({
      props: { value: new Date(2023, 10, 21) },
    })

    expect(findButton('November 2023')).not.toBeNull()

    await reactionFor(() => (i18n as VueI18n).locale = 'ge-GE' as unknown as 'en-GB')

    expect(findButton('November 2023')).not.toBeNull()
  })

  test.each`
      locale     | firstDayOfMonth
      ${'en-GB'} | ${'29'}
      ${'es-ES'} | ${'29'}
      ${'ru-RU'} | ${'30'}
    `('$locale locale changes first day of week', async ({ locale, firstDayOfMonth }) => {
    createComponent({
      props: { value: new Date(2023, 10, 21) },
    })

    await reactionFor(() => (i18n as VueI18n).locale = locale)

    expect(firstDayInMonthName()).toEqual(firstDayOfMonth)
  })
})
