import type { SandboxLaunchConfig } from '@/dev/launch'

import { h } from 'vue'

export const renderHostControls = (
  config: SandboxLaunchConfig,
  orderStatus: string,
  toggleOrderStatus: () => void
) => h('section', {
  class: 'host-controls',
  'data-testid': 'host-controls',
}, [
  h('div', { class: 'host-controls__title' }, 'Host environment'),
  h('div', {
    class: 'host-controls__status',
    'data-testid': 'host-run-mode',
  }, config.mode === 'page'
    ? `Page: ${config.pageCode}`
    : `Widgets: ${config.targets.length}`),
  h('div', {
    class: 'host-controls__status',
    'data-testid': 'host-order-status',
  }, `CRM status: ${orderStatus}`),
  h('button', {
    class: 'host-controls__button',
    'data-testid': 'host-toggle-status',
    onClick: toggleOrderStatus,
    type: 'button',
  }, 'Сменить статус заказа'),
])
