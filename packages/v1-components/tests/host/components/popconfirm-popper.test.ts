import type { VueWrapper } from '@vue/test-utils'

import {
  afterEach,
  describe,
  expect,
  test,
} from 'vitest'

import { computed } from 'vue'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import UiPopconfirmPopper from '@/host/components/popconfirm/UiPopconfirmPopper.vue'

import { PopperTargetKey } from '@/host/components/popper/composables'

describe('host/components/popconfirm-popper', () => {
  let wrapper: VueWrapper | null = null

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
    document.body.innerHTML = ''
  })

  test('renders title, content and actions', async () => {
    const target = document.createElement('button')
    document.body.appendChild(target)

    wrapper = mount(UiPopconfirmPopper, {
      attachTo: document.body,
      global: {
        provide: {
          [PopperTargetKey as symbol]: computed(() => target),
        },
      },
      props: {
        visible: true,
      },
      slots: {
        default: 'Описание действия',
      },
    })
    await nextTick()

    await new Promise(resolve => requestAnimationFrame(resolve))

    const popconfirm = document.body.querySelector('.ui-v1-popconfirm')

    expect(popconfirm).not.toBeNull()

    expect(popconfirm.textContent).toContain('Описание действия')
    expect(popconfirm.textContent).toContain('Cancel')
    expect(popconfirm.textContent).toContain('Confirm')
  })
})
