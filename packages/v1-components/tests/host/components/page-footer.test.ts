import type { VueWrapper } from '@vue/test-utils'

import {
  afterEach,
  describe,
  expect,
  test,
  vi,
} from 'vitest'

import { h } from 'vue'
import { mount } from '@vue/test-utils'

import UiPageFooter from '@/host/components/page-footer/UiPageFooter.vue'

describe('host/components/page-footer', () => {
  let wrapper: VueWrapper | null = null

  const createComponent = (options = {}) => {
    wrapper = mount(UiPageFooter, options)
  }

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
  })

  test('renders actions and aside slots', () => {
    createComponent({
      slots: {
        actions: () => h('button', { class: 'save' }, 'Сохранить'),
        aside: () => h('button', { class: 'remove' }, 'Удалить'),
      },
    })

    expect(wrapper?.find('footer.ui-v1-page-footer').exists()).toBe(true)
    expect(wrapper?.find('.ui-v1-page-footer__actions .save').text()).toBe('Сохранить')
    expect(wrapper?.find('.ui-v1-page-footer__aside .remove').text()).toBe('Удалить')
  })

  test('does not render empty slot containers', () => {
    createComponent({
      slots: {
        actions: () => h('button', 'Сохранить'),
      },
    })

    expect(wrapper?.find('.ui-v1-page-footer__actions').exists()).toBe(true)
    expect(wrapper?.find('.ui-v1-page-footer__aside').exists()).toBe(false)
  })

  test('forwards attributes and native events', async () => {
    const clickListener = vi.fn()

    createComponent({
      attrs: {
        'aria-label': 'Действия страницы',
        'data-qa': 'page-footer',
        onClick: clickListener,
      },
    })

    const footer = wrapper?.find('footer')

    expect(footer?.attributes('aria-label')).toBe('Действия страницы')
    expect(footer?.attributes('data-qa')).toBe('page-footer')

    await footer?.trigger('click')

    expect(clickListener).toHaveBeenCalledTimes(1)
  })
})
