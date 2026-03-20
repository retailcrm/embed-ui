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

import { SIZE } from '@/common/components/textbox'

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

  test('renders textbox and actions slot', () => {
    createComponent({}, {
      'actions': () => h('button', { class: 'action' }, 'Действия'),
    })

    expect(wrapper?.find('.ui-v1-page-header__trigger').exists()).toBe(true)
    expect(wrapper?.find('input').element.value).toBe('Новая рассылка')
    expect(wrapper?.find('input').attributes('readonly')).toBeDefined()
    expect(wrapper?.find('.action').exists()).toBe(true)
  })

  test('forwards title updates from textbox after click in editable mode', async () => {
    createComponent({
      editable: true,
      size: SIZE.MD,
    })

    await wrapper?.find('.ui-v1-page-header__trigger').trigger('click')

    const input = wrapper?.find('input')
    ;(input?.element as HTMLInputElement).value = 'Новое название'

    await input?.trigger('input')

    expect(wrapper?.emitted('update:value')?.at(-1)).toEqual(['Новое название'])
    expect(wrapper?.find('.ui-v1-textbox_md').exists()).toBe(true)
  })

  test('forwards blur event from textbox', async () => {
    createComponent({
      editable: true,
    })

    await wrapper?.find('.ui-v1-page-header__trigger').trigger('click')

    await wrapper?.find('input').trigger('blur')

    expect(wrapper?.emitted('blur')).toBeTruthy()
    expect(wrapper?.find('.ui-v1-page-header__trigger').exists()).toBe(true)
    expect(wrapper?.find('input').attributes('readonly')).toBeDefined()
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
    expect(wrapper?.find('input').element.value).toBe('Сохраненный заголовок')
  })

  test('marks textbox as disabled', () => {
    createComponent({
      editable: true,
      disabled: true,
    })

    expect(wrapper?.find('.ui-v1-page-header_disabled').exists()).toBe(true)
    expect(wrapper?.find('.ui-v1-page-header__trigger').exists()).toBe(true)
    expect(wrapper?.find('input').attributes('disabled')).toBeDefined()
  })

  test('does not enter edit mode without editable flag', async () => {
    createComponent()

    expect(wrapper?.find('.ui-v1-page-header__trigger').exists()).toBe(true)
    expect(wrapper?.find('input').attributes('readonly')).toBeDefined()
  })
})
