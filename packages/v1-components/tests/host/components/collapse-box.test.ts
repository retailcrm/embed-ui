import type { UiCollapseBoxMethods } from '@/common/components/collapse-box'
import type { VueWrapper } from '@vue/test-utils'

import {
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
} from 'vitest'

import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'

import UiCollapseBox from '@/host/components/collapse-box/UiCollapseBox.vue'
import UiCollapseGroup from '@/host/components/collapse-box/UiCollapseGroup.vue'

const UiCollapseStub = defineComponent({
  name: 'UiCollapse',
  props: {
    expanded: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['expanded', 'collapsed', 'expanding', 'collapsing'],
  template: `
    <div v-show="expanded" class="ui-v1-collapse-box__collapse">
        <slot />
    </div>
  `,
})

describe('host/components/collapse-box', () => {
  let el: HTMLElement | null = null
  let wrapper: VueWrapper | null = null

  const createComponent = (options = {}) => {
    wrapper = mount(UiCollapseBox, {
      attachTo: el as HTMLElement,
      global: {
        stubs: {
          UiCollapse: UiCollapseStub,
        },
      },
      slots: {
        title: 'Title',
      },
      ...options,
    })
  }

  beforeEach(() => {
    el = document.createElement('div')
    document.body.appendChild(el)
  })

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null

    el?.remove()
    el = null
  })

  test('expands by props', async () => {
    createComponent()

    await wrapper?.setProps({ expanded: true })

    expect(wrapper?.classes()).toContain('ui-v1-collapse-box_active')
    expect(wrapper?.emitted('toggle')).toEqual([[true]])
    expect(wrapper?.emitted('update:expanded')).toEqual([[true]])
  })

  test('uses disclosure aria attributes for header and region', async () => {
    createComponent({
      props: {
        id: 'box-a11y',
      },
    })

    const button = wrapper?.find('.ui-v1-collapse-box__header-button')
    const region = wrapper?.find('.ui-v1-collapse-box__collapse')

    expect(button?.attributes('aria-controls')).toBe('box-a11y-collapse')
    expect(button?.attributes('aria-expanded')).toBe('false')
    expect(region?.attributes('id')).toBe('box-a11y-collapse')
    expect(region?.attributes('role')).toBe('region')
    expect(region?.attributes('aria-labelledby')).toBe('box-a11y-button')
    expect(region?.attributes('aria-hidden')).toBe('true')

    await button?.trigger('click')
    await nextTick()

    expect(button?.attributes('aria-expanded')).toBe('true')
    expect(region?.attributes('aria-hidden')).toBe('false')
  })

  test('generates local box id when id prop is not provided', () => {
    createComponent()

    const rootId = wrapper?.attributes('id')
    const button = wrapper?.find('.ui-v1-collapse-box__header-button')
    const region = wrapper?.find('.ui-v1-collapse-box__collapse')

    expect(rootId).toBeTruthy()
    expect(rootId).not.toContain('undefined')
    expect(button?.attributes('id')).toBe(`${rootId}-button`)
    expect(button?.attributes('aria-controls')).toBe(`${rootId}-collapse`)
    expect(region?.attributes('id')).toBe(`${rootId}-collapse`)
    expect(region?.attributes('aria-labelledby')).toBe(`${rootId}-button`)
  })

  test('expands and collapses by header click', async () => {
    createComponent()

    const head = wrapper?.find('.ui-v1-collapse-box__header-button')
    await head?.trigger('click')
    await nextTick()

    expect(wrapper?.classes()).toContain('ui-v1-collapse-box_active')
    expect(wrapper?.emitted('update:expanded')?.at(0)).toEqual([true])

    await head?.trigger('click')
    await nextTick()

    expect(wrapper?.classes()).not.toContain('ui-v1-collapse-box_active')
    expect(wrapper?.emitted('update:expanded')?.at(1)).toEqual([false])
  })

  test('does not expand by click if expandable is false', async () => {
    createComponent({
      props: {
        expandable: false,
      },
    })

    await wrapper?.find('.ui-v1-collapse-box__header-button').trigger('click')
    await nextTick()

    expect(wrapper?.classes()).not.toContain('ui-v1-collapse-box_active')
    expect(wrapper?.emitted('update:expanded')).toBeUndefined()
    expect(wrapper?.emitted('expand-cancel')).toBeUndefined()
  })

  test('emits collapse-cancel when collapsible is false', async () => {
    createComponent({
      props: {
        expanded: true,
        collapsible: false,
      },
    })

    await wrapper?.find('.ui-v1-collapse-box__header-button').trigger('click')
    await nextTick()

    expect(wrapper?.classes()).toContain('ui-v1-collapse-box_active')
    expect((wrapper?.emitted('collapse-cancel')?.length ?? 0) > 0).toBe(true)
  })

  test('does not toggle when disabled', async () => {
    createComponent({
      props: {
        disabled: true,
      },
    })

    await wrapper?.find('.ui-v1-collapse-box__header-button').trigger('click')
    await nextTick()

    expect(wrapper?.classes()).not.toContain('ui-v1-collapse-box_active')
    expect(wrapper?.emitted('update:expanded')).toBeUndefined()
  })

  test('exposes box methods', async () => {
    createComponent()

    const methods = wrapper?.vm as unknown as UiCollapseBoxMethods

    expect(methods.isExpanded()).toBe(false)
    expect(methods.canNotBeExpanded()).toBe(false)

    methods.expand()
    await nextTick()
    expect(methods.isExpanded()).toBe(true)

    methods.collapse()
    await nextTick()
    expect(methods.isExpanded()).toBe(false)

    methods.toggle(true)
    await nextTick()
    expect(methods.isExpanded()).toBe(true)
  })
})

describe('host/components/collapse-group', () => {
  let el: HTMLElement | null = null
  let wrapper: VueWrapper | null = null

  beforeEach(() => {
    el = document.createElement('div')
    document.body.appendChild(el)
  })

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null

    el?.remove()
    el = null
  })

  test('keeps only one active box at a time', async () => {
    wrapper = mount(defineComponent({
      components: {
        UiCollapseBox,
        UiCollapseGroup,
      },
      setup () {
        return {
          activeBoxId: ref<string | null>(null),
        }
      },
      template: `
        <UiCollapseGroup v-model:activeBoxId="activeBoxId">
            <UiCollapseBox id="box-1">
                <template #title>Box 1</template>
            </UiCollapseBox>

            <UiCollapseBox id="box-2">
                <template #title>Box 2</template>
            </UiCollapseBox>
        </UiCollapseGroup>
      `,
    }), {
      attachTo: el as HTMLElement,
      global: {
        stubs: {
          UiCollapse: UiCollapseStub,
        },
      },
    })

    const group = wrapper.findComponent(UiCollapseGroup)
    const boxes = wrapper.findAllComponents(UiCollapseBox)

    await boxes[0]?.find('.ui-v1-collapse-box__header-button').trigger('click')
    await nextTick()

    expect(boxes[0]?.classes()).toContain('ui-v1-collapse-box_active')
    expect(boxes[1]?.classes()).not.toContain('ui-v1-collapse-box_active')
    expect(group.emitted('update:activeBoxId')?.at(-1)).toEqual(['box-1'])

    await boxes[1]?.find('.ui-v1-collapse-box__header-button').trigger('click')
    await nextTick()

    expect(boxes[0]?.classes()).not.toContain('ui-v1-collapse-box_active')
    expect(boxes[1]?.classes()).toContain('ui-v1-collapse-box_active')
    expect(group.emitted('update:activeBoxId')?.at(-1)).toEqual(['box-2'])
  })

  test('emits expand-cancelled when current active box cannot be collapsed', async () => {
    wrapper = mount(defineComponent({
      components: {
        UiCollapseBox,
        UiCollapseGroup,
      },
      setup () {
        return {
          activeBoxId: ref<string | null>('box-1'),
        }
      },
      template: `
        <UiCollapseGroup v-model:activeBoxId="activeBoxId">
            <UiCollapseBox id="box-1" :expanded="true" :collapsible="false">
                <template #title>Box 1</template>
            </UiCollapseBox>

            <UiCollapseBox id="box-2">
                <template #title>Box 2</template>
            </UiCollapseBox>
        </UiCollapseGroup>
      `,
    }), {
      attachTo: el as HTMLElement,
      global: {
        stubs: {
          UiCollapse: UiCollapseStub,
        },
      },
    })

    const group = wrapper.findComponent(UiCollapseGroup)
    const boxes = wrapper.findAllComponents(UiCollapseBox)

    await boxes[1]?.find('.ui-v1-collapse-box__header-button').trigger('click')
    await nextTick()

    expect((group.emitted('expand-cancelled')?.length ?? 0) > 0).toBe(true)
    expect(boxes[0]?.classes()).toContain('ui-v1-collapse-box_active')
    expect(boxes[1]?.classes()).not.toContain('ui-v1-collapse-box_active')
  })
})
