import type { OrderSandboxSchemas } from '@/dev/fixtures'
import type { SandboxController } from '@/core/controller'
import type { SandboxLaunchMode } from '@/dev/launch'
import type { SandboxOrderTarget } from '@/dev/targets'
import type { SandboxState } from '@/core/state'

import { h } from 'vue'

import { ORDER_SANDBOX_SLOTS } from '@/dev/targets'
import { orderSandboxFixtures } from '@/dev/fixtures'

type OrderSandboxController = SandboxController<OrderSandboxSchemas>

export type DevPanelOptions = {
  applyLaunchConfig(): void;
  extensionUrl: string;
  fixture: string;
  goToOrder(): void;
  mode: SandboxLaunchMode;
  pageCode: string;
  pushQuery(): void;
  reloadExtension(): void;
  replaceQuery(): void;
  resetState(): Promise<void>;
  runHttpPing(): Promise<void>;
  sandbox: OrderSandboxController;
  selectedTargets: SandboxOrderTarget[];
  setExtensionUrl(value: string): void;
  setFixture(value: string): void;
  setMode(value: SandboxLaunchMode): void;
  setPageCode(value: string): void;
  setTargetSelected(target: SandboxOrderTarget, checked: boolean): void;
}

export const renderDevPanel = (options: DevPanelOptions) => h('aside', {
  class: 'dev-panel',
  'data-testid': 'sandbox-dev-panel',
}, [
  h('section', { class: 'dev-card' }, [
    h('h2', { class: 'dev-card__title' }, 'Sandbox controls'),
    renderTextInput({
      label: 'Extension URL',
      testId: 'sandbox-extension-url',
      value: options.extensionUrl,
      onInput: options.setExtensionUrl,
    }),
    renderSelectInput({
      label: 'Mode',
      onChange: value => options.setMode(value as SandboxLaunchMode),
      options: [
        ['widget', 'Widgets'],
        ['page', 'Page'],
      ],
      testId: 'sandbox-mode-select',
      value: options.mode,
    }),
    renderSelectInput({
      label: 'Fixture',
      onChange: options.setFixture,
      options: Object.entries(orderSandboxFixtures).map(([code, current]) => [code, current.name]),
      testId: 'sandbox-fixture-select',
      value: options.fixture,
    }),
    renderTextInput({
      disabled: options.mode !== 'page',
      label: 'Page code',
      testId: 'sandbox-page-code-input',
      value: options.pageCode,
      onInput: options.setPageCode,
    }),
    h('div', { class: 'dev-field' }, [
      h('div', { class: 'dev-field__label' }, 'Targets'),
      h('div', { class: 'target-checklist', 'data-testid': 'sandbox-target-list' },
        ORDER_SANDBOX_SLOTS.map(slot => h('label', { class: 'target-checklist__item' }, [
          h('input', {
            checked: options.selectedTargets.includes(slot.target),
            disabled: options.mode !== 'widget',
            onChange: (event: Event) => {
              options.setTargetSelected(slot.target, (event.target as HTMLInputElement).checked)
            },
            type: 'checkbox',
          }),
          h('span', {}, slot.target),
        ]))
      ),
    ]),
    h('div', { class: 'dev-actions' }, [
      h('button', {
        class: 'dev-button dev-button_primary',
        'data-testid': 'sandbox-apply-config',
        onClick: options.applyLaunchConfig,
        type: 'button',
      }, 'Применить'),
      h('button', {
        class: 'dev-button',
        'data-testid': 'sandbox-reload-extension',
        onClick: options.reloadExtension,
        type: 'button',
      }, 'Reload extension'),
      h('button', {
        class: 'dev-button',
        'data-testid': 'sandbox-reset-state',
        onClick: options.resetState,
        type: 'button',
      }, 'Reset state'),
    ]),
  ]),
  h('section', { class: 'dev-card' }, [
    h('h2', { class: 'dev-card__title' }, 'Host API actions'),
    h('div', { class: 'dev-actions dev-actions_wrap' }, [
      h('button', {
        class: 'dev-button',
        'data-testid': 'sandbox-http-ping',
        onClick: () => {
          void options.runHttpPing()
        },
        type: 'button',
      }, 'httpCall'),
      h('button', {
        class: 'dev-button',
        'data-testid': 'sandbox-go-to',
        onClick: options.goToOrder,
        type: 'button',
      }, 'goTo'),
      h('button', {
        class: 'dev-button',
        'data-testid': 'sandbox-push-query',
        onClick: options.pushQuery,
        type: 'button',
      }, 'pushQuery'),
      h('button', {
        class: 'dev-button',
        'data-testid': 'sandbox-replace-query',
        onClick: options.replaceQuery,
        type: 'button',
      }, 'replaceQuery'),
    ]),
  ]),
  h('section', { class: 'dev-card' }, [
    h('h2', { class: 'dev-card__title' }, 'Host activity'),
    renderHostActivity(options.sandbox.state),
  ]),
  h('section', { class: 'dev-card' }, [
    h('h2', { class: 'dev-card__title' }, 'State snapshot'),
    h('pre', {
      class: 'state-snapshot',
      'data-testid': 'sandbox-state-snapshot',
    }, formatStateSnapshot(options.sandbox.state)),
  ]),
])

type TextInputOptions = {
  disabled?: boolean;
  label: string;
  onInput(value: string): void;
  testId: string;
  value: string;
}

const renderTextInput = (options: TextInputOptions) => h('label', { class: 'dev-field' }, [
  h('span', { class: 'dev-field__label' }, options.label),
  h('input', {
    class: 'dev-input',
    disabled: options.disabled,
    'data-testid': options.testId,
    onInput: (event: Event) => {
      options.onInput((event.target as HTMLInputElement).value)
    },
    type: 'text',
    value: options.value,
  }),
])

type SelectInputOptions = {
  label: string;
  onChange(value: string): void;
  options: Array<[string, string]>;
  testId: string;
  value: string;
}

const renderSelectInput = (options: SelectInputOptions) => h('label', { class: 'dev-field' }, [
  h('span', { class: 'dev-field__label' }, options.label),
  h('select', {
    class: 'dev-input',
    'data-testid': options.testId,
    onChange: (event: Event) => {
      options.onChange((event.target as HTMLSelectElement).value)
    },
    value: options.value,
  }, options.options.map(([value, label]) => h('option', { value }, label))),
])

const renderHostActivity = (state: SandboxState<OrderSandboxSchemas>) => {
  const navigation = state.host.navigation.map((record, index) =>
    h('li', { class: 'activity-item' }, [
      h('span', { class: 'activity-item__kind' }, record.kind),
      h('code', {}, record.kind === 'go-to'
        ? `${record.route} ${JSON.stringify(record.params ?? {})}`
        : `${record.location.pathname}${record.location.search}`),
      h('span', { class: 'activity-item__index' }, `#${index + 1}`),
    ])
  )
  const http = state.host.http.map((record, index) =>
    h('li', { class: 'activity-item' }, [
      h('span', { class: 'activity-item__kind' }, 'httpCall'),
      h('code', {}, `${record.action} -> ${record.response.status}`),
      h('span', { class: 'activity-item__index' }, `#${index + 1}`),
    ])
  )
  const items = [...navigation, ...http]

  return h('ul', {
    class: 'activity-log',
    'data-testid': 'sandbox-host-activity',
  }, items.length > 0
    ? items
    : [h('li', { class: 'activity-item activity-item_empty' }, 'Нет действий')])
}

const formatStateSnapshot = (state: SandboxState<OrderSandboxSchemas>) => JSON.stringify({
  contexts: state.contexts,
  custom: state.custom,
  host: state.host,
  mode: state.mode,
}, null, 2)
