import type { VueWrapper } from '@vue/test-utils'

import {
  afterEach,
  describe,
  expect,
  test,
} from 'vitest'

import { h } from 'vue'
import { mount } from '@vue/test-utils'

import UiPageHeader from '@/host/components/page-header/UiPageHeader.vue'

describe('host/components/page-header', () => {
  let wrapper: VueWrapper | null = null

  const createComponent = (props = {}, slots = {}) => {
    wrapper = mount(UiPageHeader, {
      props: {
        value: 'Новая рассылка',
        ...props,
      },
      slots,
    })
  }

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
  })

  test('renders h1 title, addon and actions slots', () => {
    createComponent({}, {
      'addon': () => h('span', { class: 'addon' }, 'Свернуть фильтр'),
      'actions': () => h('button', { class: 'action' }, 'Действия'),
    })

    expect(wrapper?.find('.ui-v1-page-header__trigger').exists()).toBe(true)
    expect(wrapper?.find('h1.ui-v1-page-header__trigger').text()).toBe('Новая рассылка')
    expect(wrapper?.find('input').exists()).toBe(false)
    expect(wrapper?.find('.addon').exists()).toBe(true)
    expect(wrapper?.find('.action').exists()).toBe(true)
  })

  test('forwards title updates from textbox after click in editable mode', async () => {
    createComponent({
      editable: true,
    })

    await wrapper?.find('.ui-v1-page-header__trigger').trigger('click')

    const input = wrapper?.find('input')
    ;(input?.element as HTMLInputElement).value = 'Новое название'

    await input?.trigger('input')

    expect(wrapper?.emitted('update:value')?.at(-1)).toEqual(['Новое название'])
  })

  test('forwards blur event from textbox', async () => {
    createComponent({
      editable: true,
    })

    await wrapper?.find('.ui-v1-page-header__trigger').trigger('click')

    await wrapper?.find('input').trigger('blur')

    expect(wrapper?.emitted('blur')).toBeTruthy()
    expect(wrapper?.find('.ui-v1-page-header__trigger').exists()).toBe(true)
    expect(wrapper?.find('input').exists()).toBe(false)
  })

  test('saves and exits edit mode on Enter', async () => {
    createComponent({
      editable: true,
    })

    await wrapper?.find('.ui-v1-page-header__trigger').trigger('click')

    const input = wrapper?.find('input')
    ;(input?.element as HTMLInputElement).value = 'Сохраненный заголовок'

    await input?.trigger('input')
    await input?.trigger('keydown', { key: 'Enter' })

    expect(wrapper?.emitted('update:value')?.at(-1)).toEqual(['Сохраненный заголовок'])
    expect(wrapper?.find('.ui-v1-page-header__trigger').exists()).toBe(true)
    expect(wrapper?.find('h1.ui-v1-page-header__trigger').text()).toBe('Сохраненный заголовок')
    expect(wrapper?.find('input').exists()).toBe(false)
  })

  test('renders disabled title without textbox', () => {
    createComponent({
      editable: true,
      disabled: true,
    })

    expect(wrapper?.find('.ui-v1-page-header_disabled').exists()).toBe(true)
    expect(wrapper?.find('.ui-v1-page-header__trigger').exists()).toBe(true)
    expect(wrapper?.find('h1.ui-v1-page-header__trigger').exists()).toBe(true)
    expect(wrapper?.find('input').exists()).toBe(false)
  })

  test('does not enter edit mode without editable flag', async () => {
    createComponent()

    expect(wrapper?.find('.ui-v1-page-header__trigger').exists()).toBe(true)
    expect(wrapper?.find('h1.ui-v1-page-header__trigger').exists()).toBe(true)
    expect(wrapper?.find('input').exists()).toBe(false)
  })

  test('does not prevent mousedown on title without editable flag', () => {
    createComponent()

    const title = wrapper?.find('h1.ui-v1-page-header__trigger')
    const isDefaultNotPrevented = title?.element.dispatchEvent(new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
    }))

    expect(isDefaultNotPrevented).toBe(true)
  })

  test('keeps textbox mode enabled while empty invalid title has error', async () => {
    createComponent({
      value: '',
      editable: true,
      invalid: true,
      error: 'Заголовок обязателен',
    })

    expect(wrapper?.find('input').exists()).toBe(true)
    expect(wrapper?.find('h1.ui-v1-page-header__trigger').exists()).toBe(false)

    await wrapper?.find('input').trigger('blur')

    expect(wrapper?.find('input').exists()).toBe(true)
    expect(wrapper?.find('h1.ui-v1-page-header__trigger').exists()).toBe(false)

    await wrapper?.find('input').trigger('keydown', { key: 'Enter' })

    expect(wrapper?.find('input').exists()).toBe(true)
    expect(wrapper?.find('h1.ui-v1-page-header__trigger').exists()).toBe(false)
  })
})
