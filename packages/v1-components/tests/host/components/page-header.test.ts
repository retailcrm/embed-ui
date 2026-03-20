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

    expect(wrapper?.find('input').element.value).toBe('Новая рассылка')
    expect(wrapper?.find('.action').exists()).toBe(true)
  })

  test('forwards title updates from textbox', async () => {
    createComponent({
      size: SIZE.MD,
    })

    const input = wrapper?.find('input')
    ;(input?.element as HTMLInputElement).value = 'Новое название'

    await input?.trigger('input')

    expect(wrapper?.emitted('update:value')?.at(-1)).toEqual(['Новое название'])
    expect(wrapper?.find('.ui-v1-textbox_md').exists()).toBe(true)
  })

  test('forwards blur event from textbox', async () => {
    createComponent()

    await wrapper?.find('input').trigger('blur')

    expect(wrapper?.emitted('blur')).toBeTruthy()
  })

  test('marks textbox as disabled', () => {
    createComponent({
      disabled: true,
    })

    expect(wrapper?.find('.ui-v1-page-header_disabled').exists()).toBe(true)
    expect(wrapper?.find('input').attributes('disabled')).toBeDefined()
  })
})
