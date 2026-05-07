import type { VueWrapper } from '@vue/test-utils'

import {
  afterEach,
  describe,
  expect,
  test,
} from 'vitest'

import { h } from 'vue'
import { mount } from '@vue/test-utils'

import UiPopconfirmTrigger from '@/host/components/popconfirm/UiPopconfirmTrigger.vue'

describe('host/components/popconfirm-trigger', () => {
  let wrapper: VueWrapper | null = null

  const mountTrigger = (props: { visible?: boolean } = {}) => {
    wrapper = mount(UiPopconfirmTrigger, {
      attachTo: document.body,
      props,
      slots: {
        default: ({ open }: { open: boolean }) => h('button', {
          class: { active: open },
        }, 'Открыть'),
      },
    })
  }

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
    document.body.innerHTML = ''
  })

  test('renders anchor and passes visible state into default slot', async () => {
    mountTrigger()

    const anchor = wrapper?.find('.ui-v1-popconfirm-anchor')
    const button = wrapper?.find('button')

    expect(anchor?.exists()).toBe(true)
    expect(button?.classes()).not.toContain('active')

    await wrapper?.setProps({ visible: true })

    expect(button?.classes()).toContain('active')
  })

  test('emits click from anchor', async () => {
    mountTrigger()

    await wrapper?.find('button').trigger('click')

    expect(wrapper?.emitted('click')).toHaveLength(1)
    expect(wrapper?.emitted('click')?.[0]?.[0]).toBeInstanceOf(MouseEvent)
  })
})
