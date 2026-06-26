import type { Component } from 'vue'
import type { ComponentMountingOptions } from '@vue/test-utils'
import type { SandboxLaunchConfig } from '@/dev/types'
import type { SandboxMount } from '@/app/types'

import { createI18n } from 'vue-i18n'
import { expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { test, vi } from 'vitest'

import DevPanel from '@/app/components/DevPanel.vue'
import ExtensionOnboarding from '@/app/components/ExtensionOnboarding.vue'
import HostControls from '@/app/components/HostControls.vue'
import PageMount from '@/app/components/PageMount.vue'
import SandboxRail from '@/app/components/SandboxRail.vue'
import SandboxSelect from '@/app/components/SandboxSelect.vue'
import SandboxSidebar from '@/app/components/SandboxSidebar.vue'
import WidgetMount from '@/app/components/WidgetMount.vue'
import WidgetMounts from '@/app/components/WidgetMounts.vue'

import messagesEnGb from '@/app/i18n/en-GB.json'
import messagesEsEs from '@/app/i18n/es-ES.json'
import messagesRuRu from '@/app/i18n/ru-RU.json'
import { ORDER_SANDBOX_SLOTS } from '@/dev/targets'

type MountOptions<T extends Component> = ComponentMountingOptions<T>

const createTestI18n = () => createI18n({
  fallbackLocale: 'en-GB',
  legacy: false,
  locale: 'ru-RU',
  messages: {
    'en-GB': messagesEnGb,
    'es-ES': messagesEsEs,
    'ru-RU': messagesRuRu,
  },
})

const hostComponentStubs = {
  HostedTree: {
    template: '<div class="hosted-tree-stub" />',
  },
  UiButton: {
    emits: ['click'],
    props: ['appearance', 'ariaControls', 'ariaExpanded', 'ariaPressed', 'disabled', 'size'],
    template: `
      <button
        :aria-controls="ariaControls"
        :aria-expanded="ariaExpanded"
        :aria-pressed="ariaPressed"
        :disabled="disabled"
        type="button"
        v-bind="$attrs"
        @click="$emit('click', $event)"
      >
        <slot />
      </button>
    `,
  },
  UiCheckbox: {
    emits: ['update:model'],
    props: ['disabled', 'id', 'model'],
    template: `
      <input
        :id="id"
        :checked="model"
        :disabled="disabled"
        type="checkbox"
        @change="$emit('update:model', $event.target.checked)"
      />
    `,
  },
  UiMenuItem: {
    props: ['active', 'disabled'],
    template: '<span><slot /></span>',
  },
  UiPopperConnector: {
    template: '<div><slot /></div>',
  },
  UiPopperTarget: {
    props: ['tag'],
    template: '<div><slot /></div>',
  },
  UiSelectPopper: {
    emits: ['hide'],
    props: ['id', 'opened', 'placement', 'popperClass', 'popperFitTrigger'],
    template: '<div v-if="opened" :id="id" role="listbox"><slot /></div>',
  },
  UiSelectTrigger: {
    emits: ['keydown', 'update:expanded'],
    props: [
      'activeDescendant',
      'expanded',
      'id',
      'placeholder',
      'selection',
      'textboxSize',
      'value',
    ],
    template: `
      <button
        :id="id"
        :aria-activedescendant="activeDescendant"
        :aria-expanded="expanded"
        type="button"
        @click="$emit('update:expanded', true)"
        @keydown="$emit('keydown', $event)"
      >
        {{ selection[0]?.label || placeholder }}
      </button>
    `,
  },
  UiSkeleton: {
    props: ['height', 'width'],
    template: '<span :style="{ height: height + \'px\', width: width + \'px\' }" />',
  },
  UiTextbox: {
    emits: ['update:value'],
    props: ['disabled', 'id', 'invalid', 'multiline', 'rows', 'type', 'value'],
    template: `
      <textarea
        v-if="multiline"
        :id="id"
        :aria-invalid="invalid"
        :disabled="disabled"
        :rows="rows"
        :value="value"
        @input="$emit('update:value', $event.target.value)"
      />
      <input
        v-else
        :id="id"
        :disabled="disabled"
        :type="type || 'text'"
        :value="value"
        @input="$emit('update:value', $event.target.value)"
      />
    `,
  },
}

const mountWithApp = <T extends Component>(
  component: T,
  options: MountOptions<T> = {}
) => mount(component, {
    ...options,
    global: {
      ...(options.global ?? {}),
      plugins: [
        createTestI18n(),
        ...(options.global?.plugins ?? []),
      ],
      stubs: {
        ...hostComponentStubs,
        ...(options.global?.stubs ?? {}),
      },
    },
  })

const sandboxSelectStub = {
  emits: ['update:value'],
  props: ['id', 'labelledBy', 'options', 'value'],
  template: `
    <select :id="id" :aria-labelledby="labelledBy" :value="value" @change="$emit('update:value', $event.target.value)">
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  `,
}

const createWidgetMount = (id: string, label: string): SandboxMount => ({
  id,
  label,
  receiver: {} as SandboxMount['receiver'],
  releaseConfig: { id },
  runConfig: {
    id,
    target: label,
  },
  tree: null,
  type: 'widget',
})

const createPageMount = (label: string): SandboxMount => ({
  id: `page:${label}`,
  label,
  receiver: {} as SandboxMount['receiver'],
  releaseConfig: { code: label },
  runConfig: { code: label },
  tree: null,
  type: 'page',
})

test('extension onboarding opens sandbox controls', async () => {
  const openDevPanel = vi.fn()
  const wrapper = mountWithApp(ExtensionOnboarding, {
    props: {
      openDevPanel,
    },
  })

  expect(wrapper.text()).toContain('Подключите внешнее расширение')
  expect(wrapper.text()).toContain('%sandbox-url%/?manifestUrl=%extension-url%/extension/%extension-id%')

  await wrapper.get('button').trigger('click')

  expect(openDevPanel).toHaveBeenCalledOnce()
})

test('sandbox rail emits dev panel open action', async () => {
  const wrapper = mountWithApp(SandboxRail, {
    props: {
      devPanelControlsId: 'sandbox-controls',
      devPanelOpen: false,
    },
  })

  await wrapper.get('a[aria-label="Раздел заказов"]').trigger('click')
  await wrapper.get('button[aria-label="Открыть управление песочницей"]').trigger('click')

  expect(wrapper.get('a[aria-label="Раздел заказов"]').attributes('aria-current')).toBe('page')
  expect(wrapper.emitted('openDevPanel')).toHaveLength(1)
})

test('sandbox sidebar renders fixed skeleton navigation', async () => {
  const wrapper = mountWithApp(SandboxSidebar, {
    props: {
      id: 'sidebar',
      open: true,
    },
  })

  expect(wrapper.attributes('id')).toBe('sidebar')
  expect(wrapper.findAll('span')).toHaveLength(10)

  await wrapper.setProps({ open: false })

  expect(wrapper.classes().join(' ')).toContain('sandbox-sidebar_closed')
})

test('sandbox select emits selected value', async () => {
  const wrapper = mountWithApp(SandboxSelect, {
    props: {
      id: 'mode',
      options: [
        {
          label: 'Виджеты',
          value: 'widget',
        },
        {
          label: 'Страница',
          value: 'page',
        },
      ],
      value: 'widget',
    },
  })

  await wrapper.get('button').trigger('click')
  await wrapper.findAll('[role="option"]')[1].trigger('click')

  expect(wrapper.emitted('update:value')).toEqual([['page']])
})

test('sandbox select supports keyboard confirmation and empty selection', async () => {
  const wrapper = mountWithApp(SandboxSelect, {
    props: {
      id: 'fixture',
      options: [
        {
          disabled: true,
          label: 'Базовый заказ',
          value: 'order-basic',
        },
      ],
      value: 'order-basic',
    },
  })

  await wrapper.get('button').trigger('keydown', {
    key: 'Escape',
  })
  await wrapper.get('button').trigger('keydown', {
    key: 'Enter',
  })
  await wrapper.get('button').trigger('click')
  await wrapper.get('button').trigger('keydown', {
    key: 'Enter',
  })

  expect(wrapper.emitted('update:value')).toEqual([['order-basic']])

  await wrapper.setProps({
    value: 'missing',
  })
  await wrapper.get('button').trigger('keydown', {
    key: 'Enter',
  })

  expect(wrapper.emitted('update:value')).toEqual([['order-basic']])
})

test('sandbox select handles popper hide and collapsed trigger updates', async () => {
  const wrapper = mountWithApp(SandboxSelect, {
    global: {
      stubs: {
        UiSelectPopper: {
          emits: ['hide'],
          props: ['id', 'opened'],
          template: `
            <div v-if="opened" :id="id" role="listbox">
              <button aria-label="hide popper" type="button" @click="$emit('hide')">hide</button>
              <slot />
            </div>
          `,
        },
        UiSelectTrigger: {
          emits: ['update:expanded'],
          props: ['expanded', 'id', 'selection'],
          template: `
            <button
              :id="id"
              :aria-expanded="expanded"
              type="button"
              @click="$emit('update:expanded', true)"
              @dblclick="$emit('update:expanded', false)"
            >
              {{ selection[0]?.label }}
              {{ selection[0]?.isMatched?.('page') }}
            </button>
          `,
        },
      },
    },
    props: {
      id: 'mode',
      options: [
        {
          label: 'Страница',
          value: 'page',
        },
      ],
      value: 'page',
    },
  })

  await wrapper.get('button').trigger('click')

  expect(wrapper.get('[role="listbox"]').exists()).toBe(true)

  await wrapper.get('button[aria-label="hide popper"]').trigger('click')

  expect(wrapper.find('[role="listbox"]').exists()).toBe(false)

  await wrapper.get('button').trigger('click')
  await wrapper.get('button').trigger('dblclick')

  expect(wrapper.find('[role="listbox"]').exists()).toBe(false)
})

test('dev panel updates launch fields and context', async () => {
  const props = {
    applyContextJson: vi.fn(async () => undefined),
    applyLaunchConfig: vi.fn(),
    contextJson: '{"order/card":{"number":"215C"}}',
    contextJsonChanged: false,
    fixture: 'order-basic',
    manifestUrl: '',
    mode: 'widget' as const,
    pageCode: 'returns',
    selectedTargets: [ORDER_SANDBOX_SLOTS[0].target],
    setContextJson: vi.fn(),
    setFixture: vi.fn(),
    setManifestUrl: vi.fn(),
    setMode: vi.fn(),
    setPageCode: vi.fn(),
    setTargetSelected: vi.fn(),
    validationErrors: {},
  }
  const wrapper = mountWithApp(DevPanel, {
    global: {
      stubs: {
        SandboxSelect: sandboxSelectStub,
      },
    },
    props,
  })

  expect(wrapper.text()).toContain('Управление песочницей')
  expect(wrapper.text()).toContain('Доставка JS-модуля')

  await wrapper.get('input[type="text"]').setValue('http://extension.test/extension/id')
  await wrapper.findAll('select')[0].setValue('page')
  await wrapper.findAll('select')[1].setValue('order-with-delivery')
  await wrapper.get('input[id$="dev-panel-context-json"]').setValue('{"order/card":{"number":"999C"}}')
  await wrapper.findAll('input[type="checkbox"]')[0].setValue(false)
  await wrapper.findAll('button')[0].trigger('click')

  expect(props.setManifestUrl).toHaveBeenCalledWith('http://extension.test/extension/id')
  expect(props.setMode).toHaveBeenCalledWith('page')
  expect(props.setFixture).toHaveBeenCalledWith('order-with-delivery')
  expect(props.setContextJson).toHaveBeenCalledWith('{"order/card":{"number":"999C"}}')
  expect(props.setTargetSelected).toHaveBeenCalledWith(ORDER_SANDBOX_SLOTS[0].target, false)
  expect(props.applyLaunchConfig).toHaveBeenCalledOnce()

  await wrapper.setProps({
    contextJsonChanged: true,
    mode: 'page',
  })
  await wrapper.findAll('input[type="text"]')[1].setValue('orders-dashboard')
  await wrapper.findAll('button')[1].trigger('click')

  expect(props.setPageCode).toHaveBeenCalledWith('orders-dashboard')
  expect(props.applyContextJson).toHaveBeenCalledOnce()
})

test('dev panel shows context json errors and disables page code in widget mode', () => {
  const wrapper = mountWithApp(DevPanel, {
    global: {
      stubs: {
        SandboxSelect: sandboxSelectStub,
      },
    },
    props: {
      applyContextJson: vi.fn(async () => undefined),
      applyLaunchConfig: vi.fn(),
      contextJson: '{',
      contextJsonChanged: false,
      fixture: 'order-basic',
      manifestUrl: '',
      mode: 'widget',
      pageCode: 'returns',
      selectedTargets: [],
      setContextJson: vi.fn(),
      setFixture: vi.fn(),
      setManifestUrl: vi.fn(),
      setMode: vi.fn(),
      setPageCode: vi.fn(),
      setTargetSelected: vi.fn(),
      validationErrors: {
        contextJson: 'Invalid JSON',
      },
    },
  })

  expect(wrapper.get('[role="alert"]').text()).toBe('Invalid JSON')
  expect(wrapper.findAll('input[type="text"]')[1].attributes('disabled')).toBeDefined()
  expect(wrapper.findAll('button')[1].attributes('disabled')).toBeDefined()
})

test('host controls render widget and page run modes', async () => {
  const config: SandboxLaunchConfig = {
    extensionUrl: '',
    fixture: 'order-basic',
    manifestUrl: '',
    mode: 'widget',
    pageCode: 'returns',
    target: 'order/card:common.after',
    targets: ['order/card:common.after', 'order/card:payment.before'],
    widgetId: 'sandbox-widget',
  }
  const wrapper = mountWithApp(HostControls, {
    props: {
      config,
    },
  })

  expect(wrapper.text()).toContain('Виджеты: 2')

  await wrapper.setProps({
    config: {
      ...config,
      mode: 'page',
      pageCode: 'returns',
    },
  })

  expect(wrapper.text()).toContain('Страница: returns')
})

test('page and widget mounts expose accessible regions', () => {
  const setTree = vi.fn()
  const page = mountWithApp(PageMount, {
    props: {
      mount: createPageMount('returns'),
      setTree,
    },
  })
  const widget = mountWithApp(WidgetMount, {
    props: {
      mount: createWidgetMount('widget-1', 'order/card:common.after'),
      setTree,
    },
  })

  expect(page.get('[role="region"]').attributes('aria-label')).toBe('Страница расширения: returns')
  expect(widget.get('[role="region"]').attributes('aria-label')).toBe('Цель виджета: order/card:common.after')
  expect(widget.text()).toContain('order/card:common.after')
  expect(setTree).toHaveBeenCalled()
})

test('widget mounts render every provided mount', () => {
  const wrapper = mountWithApp(WidgetMounts, {
    global: {
      stubs: {
        WidgetMount: {
          props: ['mount'],
          template: '<div role="article">{{ mount.label }}</div>',
        },
      },
    },
    props: {
      mounts: [
        createWidgetMount('widget-1', 'order/card:common.before'),
        createWidgetMount('widget-2', 'order/card:common.after'),
      ],
      setTree: vi.fn(),
    },
  })

  expect(wrapper.get('[role="region"]').attributes('aria-label')).toBe('Места встраивания виджетов')
  expect(wrapper.findAll('[role="article"]')).toHaveLength(2)
})
