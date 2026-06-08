import type { SandboxLaunchConfig } from '@/dev/launch'

import { h } from 'vue'

export const renderRail = () => h('aside', { class: 'icon-rail', 'data-testid': 'sandbox-rail' }, [
  h('div', { class: 'rail-logo' }, 'R'),
  ...['🛒', '🤖', '◎', '▥', '◔', '✓', '▤'].map((icon, index) =>
    h('div', {
      class: ['rail-icon', index === 0 ? 'rail-icon_active' : ''],
    }, icon)
  ),
  h('div', { class: 'rail-spacer' }),
  h('div', { class: 'rail-icon' }, '⚙'),
  h('div', { class: 'rail-user' }, 'D'),
])

export const renderSidebar = (config: SandboxLaunchConfig) => h('aside', {
  class: 'crm-sidebar',
  'data-testid': 'sandbox-sidebar',
}, [
  h('div', { class: 'crm-section-title' }, 'Продажи'),
  h('nav', { class: 'crm-menu' }, [
    h('a', {
      class: [
        'crm-menu-item',
        config.mode === 'widget' ? 'crm-menu-item_active' : '',
      ],
    }, 'Заказы'),
    h('a', { class: 'crm-menu-item' }, 'Возвраты'),
    h('a', { class: 'crm-menu-item' }, 'Клиенты'),
    h('a', { class: 'crm-menu-item' }, 'Коммуникации'),
    h('a', { class: 'crm-menu-item' }, 'Товары и склад'),
    h('a', { class: 'crm-menu-item' }, 'Менеджеры'),
    h('a', { class: 'crm-menu-item' }, 'Финансы'),
    h('a', {
      class: [
        'crm-menu-item',
        config.mode === 'page' ? 'crm-menu-item_active' : '',
      ],
    }, 'Sandbox page'),
  ]),
  h('div', { class: 'crm-add-link' }, '+ Добавить ссылку'),
])
