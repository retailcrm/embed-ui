import { h, ref, watch } from 'vue'

import IconStar from '../../assets/sprites/actions/star.svg'

import { UiTab, UiTabGroup } from '@/remote/components/tab'

import { APPEARANCE, SIZE } from '@/common/components/tab'

import { createComponentEndpoint } from '../endpoint'

type UiTabGroupProps = InstanceType<typeof UiTabGroup>['$props']
type UiTabStoryExtras = {
  containerWidth?: number;
  withSlots?: boolean;
  withContent?: boolean;
}
type UiTabWorkerProps = UiTabGroupProps & UiTabStoryExtras

const items = [
  { id: 'overview', label: 'Обзор', counter: '8' },
  { id: 'orders', label: 'Заказы', counter: '12' },
  { id: 'files', label: 'Файлы', counter: '3' },
  { id: 'tasks', label: 'Задачи', counter: '99+' },
  { id: 'archive', label: 'Архив', disabled: true },
] as const

const panels = {
  overview: {
    title: 'Обзор клиента',
    text: 'Краткая сводка по клиенту, последние изменения и важные сигналы.',
  },
  orders: {
    title: 'Заказы',
    text: 'Список последних заказов, статусы оплаты и отгрузки.',
  },
  files: {
    title: 'Файлы',
    text: 'Документы, вложения и заметки, привязанные к клиенту.',
  },
  tasks: {
    title: 'Задачи',
    text: 'Открытые задачи команды и ближайшие контрольные точки.',
  },
  archive: {
    title: 'Архив',
    text: 'Исторические данные и устаревшие материалы без активных действий.',
  },
} as const

createComponentEndpoint<UiTabWorkerProps>({
  async run (createApp, root, props) {
    const app = createApp({
      setup () {
        const activeId = ref<string | null>(props.activeId ?? items[0]?.id ?? null)

        watch(() => props.activeId, (nextActiveId) => {
          activeId.value = nextActiveId ?? null
        })

        return () => h('div', {
          style: {
            width: `${props.containerWidth ?? 560}px`,
            maxWidth: '100%',
          },
        }, [
          h(UiTabGroup, {
            activeId: activeId.value,
            appearance: props.appearance ?? APPEARANCE.TEXT,
            size: props.size ?? SIZE.MD,
            overflowing: props.overflowing ?? true,
            items: props.withSlots
              ? undefined
              : items.map((item) => ({
                id: item.id,
                label: item.label,
                counter: item.counter,
                disabled: item.disabled,
              })),
            'onUpdate:activeId': (nextActiveId: string) => {
              activeId.value = nextActiveId
            },
          }, props.withSlots
            ? {
              default: () => items.map((item) => h(UiTab, {
                id: item.id,
                label: item.label,
                counter: item.counter,
                disabled: item.disabled,
              }, {
                icon: () => h(IconStar),
                ...(props.withContent
                  ? {
                    content: () => h('section', {
                      style: {
                        display: 'grid',
                        gap: '8px',
                        padding: '4px 0 0',
                      },
                    }, [
                      h('h4', {
                        style: {
                          margin: '0',
                          fontSize: '16px',
                          lineHeight: '24px',
                        },
                      }, panels[item.id].title),
                      h('p', {
                        style: {
                          margin: '0',
                          color: '#637381',
                          fontSize: '14px',
                          lineHeight: '20px',
                        },
                      }, panels[item.id].text),
                    ]),
                  }
                  : {}),
              })),
            }
            : undefined),
        ])
      },
    })

    app.mount(root)

    return () => app.unmount()
  },
}, self as unknown as Worker)
