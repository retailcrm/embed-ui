import type { Meta, StoryObj } from '@storybook/vue3'
import type {
  UiLogicTreeInlineText,
  UiLogicTreeNode,
} from '@/common/components/logic-tree'

import { createProvider } from '@omnicajs/vue-remote/host'

import UiButton from '@/host/components/button/UiButton.vue'
import UiLogicTreeRoot from '@/host/components/logic-tree/UiLogicTreeRoot.vue'
import UiLogicTreeRow from '@/host/components/logic-tree/UiLogicTreeRow.vue'
import UiMenuItem from '@/host/components/menu/UiMenuItem.vue'
import UiMenuItemGroup from '@/host/components/menu/UiMenuItemGroup.vue'
import UiPopperConnector from '@/host/components/popper/UiPopperConnector.vue'
import UiSelectPopper from '@/host/components/select/UiSelectPopper.vue'
import UiSelectTrigger from '@/host/components/select/UiSelectTrigger.vue'
import UiTextbox from '@/host/components/textbox/UiTextbox.vue'
import UiTooltip from '@/host/components/tooltip/UiTooltip.vue'

import {
  LogicTreeActionKind,
  LogicTreeConjunction,
  LogicTreeControlKind,
  LogicTreeIcon,
  LogicTreeNodeKind,
  LogicTreeRowKind,
  LogicTreeTone,
} from '@/common/components/logic-tree'

import { UiLogicTree } from '../../src/remote/components/logic-tree'
import UiLogicTreeWorker from './UiLogicTree.remote.ts?worker'

import { createRemoteStoryRender } from '../createRemoteStoryRender'

const provider = createProvider({
  UiButton,
  UiLogicTreeRoot,
  UiLogicTreeRow,
  UiMenuItem,
  UiMenuItemGroup,
  UiPopperConnector,
  UiSelectPopper,
  UiSelectTrigger,
  UiTextbox,
  UiTooltip,
})

const inlineText = (
  id: string,
  text: string,
  config: Omit<UiLogicTreeInlineText, 'id' | 'text'> = {}
): UiLogicTreeInlineText => ({
  id,
  text,
  ...config,
})

const selectControl = (
  id: string,
  label: string,
  value: string,
  width: number,
  options: string[]
) => ({
  id,
  kind: LogicTreeControlKind.SELECT,
  label,
  options: options.map((option, index) => ({
    id: `${id}-${index + 1}`,
    label: option,
    value: option,
  })),
  value,
  width,
})

const inputControl = (
  id: string,
  label: string,
  value: string,
  width: number
) => ({
  id,
  kind: LogicTreeControlKind.INPUT,
  label,
  value,
  width,
})

const rowsTree: UiLogicTreeNode[] = [
  {
    id: 'rows-root',
    inline: [
      inlineText('rows-root-mode', 'Последовательное применение', { tone: LogicTreeTone.GREEN }),
      inlineText('rows-root-meta', 'До 5 000 ₽ скидки', { separated: true, tone: 'muted' }),
    ],
    kind: LogicTreeNodeKind.GROUP,
    surface: true,
    title: 'Корневая группа',
    tone: LogicTreeTone.GREEN,
    children: [
      {
        children: [
          {
            draggable: true,
            id: 'rows-campaign-1',
            inline: [
              inlineText('rows-campaign-1-meta', 'Бонусы', { tone: 'muted' }),
            ],
            removable: true,
            surface: true,
            title: '1. Название акции #1',
          },
          {
            actions: [
              {
                id: 'rows-action-condition',
                kind: LogicTreeActionKind.CONDITION,
                label: 'Условие',
              },
              {
                id: 'rows-action-group',
                kind: LogicTreeActionKind.GROUP,
                label: 'Группа',
              },
            ],
            id: 'rows-actions',
            rowKind: LogicTreeRowKind.ACTIONS,
            surface: true,
            title: 'Добавить в ветку',
            tone: LogicTreeTone.BLUE,
          },
          {
            controls: [
              selectControl(
                'rows-delivery-type',
                'Тип доставки',
                'Тип доставки',
                260,
                ['Тип доставки', 'Самовывоз', 'Курьер']
              ),
              selectControl(
                'rows-delivery-operator',
                'Равно',
                'Равно',
                140,
                ['Равно', 'Не равно']
              ),
              selectControl(
                'rows-delivery-value',
                'SDEK',
                'SDEK',
                260,
                ['SDEK', 'Boxberry']
              ),
            ],
            id: 'rows-delivery-condition',
            conjunction: LogicTreeConjunction.AND,
            removable: true,
            rowKind: LogicTreeRowKind.EDITOR,
            surface: true,
            title: 'Тип доставки',
            tone: LogicTreeTone.BLUE,
          },
          {
            controls: [
              inputControl('rows-order-field', 'Заказ клиента', 'Заказ клиента', 330),
              selectControl(
                'rows-order-operator',
                'Есть такие',
                'Есть такие',
                180,
                ['Есть такие', 'Нет таких']
              ),
              {
                icon: LogicTreeIcon.ADD,
                id: 'rows-order-extra',
                kind: LogicTreeControlKind.ICON,
                label: 'Дополнительное действие',
              },
            ],
            id: 'rows-order-condition',
            removable: true,
            rowKind: LogicTreeRowKind.EDITOR,
            surface: true,
            title: 'Заказ клиента',
            tone: LogicTreeTone.BLUE,
          },
        ],
        collapsible: true,
        expanded: true,
        id: 'rows-count',
        surface: true,
        title: '5 акций',
      },
    ],
  },
]

const connectorsTree: UiLogicTreeNode[] = [
  {
    id: 'connectors-root',
    inline: [
      inlineText('connectors-root-mode', 'Последовательное применение', { tone: LogicTreeTone.GREEN }),
      inlineText('connectors-root-meta', 'До 5 000 ₽ скидки', { separated: true, tone: 'muted' }),
    ],
    kind: LogicTreeNodeKind.GROUP,
    surface: false,
    title: 'Корневая группа',
    tone: LogicTreeTone.GREEN,
    children: [
      {
        children: [
          {
            children: [
              {
                id: 'connectors-group-2',
                inline: [
                  inlineText('connectors-group-2-mode', 'Последовательное применение', { tone: LogicTreeTone.GREEN }),
                  inlineText('connectors-group-2-meta', 'До 5 000 оплата бонусами', {
                    separated: true,
                    tone: 'muted',
                  }),
                ],
                kind: LogicTreeNodeKind.GROUP,
                surface: false,
                title: 'Название группы #2',
                tone: LogicTreeTone.GREEN,
              },
            ],
            id: 'connectors-group-1',
            inline: [
              inlineText('connectors-group-1-mode', 'Максимальная выгода', { tone: LogicTreeTone.BLUE }),
            ],
            kind: LogicTreeNodeKind.GROUP,
            surface: false,
            title: 'Название группы #1',
            tone: LogicTreeTone.BLUE,
          },
          {
            children: [
              {
                children: [
                  {
                    actions: [
                      {
                        id: 'connectors-group-action',
                        kind: LogicTreeActionKind.GROUP,
                        label: 'Группа',
                      },
                    ],
                    id: 'connectors-group-action-row',
                    rowKind: LogicTreeRowKind.ACTIONS,
                    surface: false,
                    title: 'Добавить группу',
                    tone: LogicTreeTone.GREEN,
                  },
                ],
                id: 'connectors-group-2-count',
                surface: false,
                title: '12 акций',
                tone: LogicTreeTone.GREEN,
              },
              {
                children: [
                  {
                    id: 'connectors-conflict-count',
                    surface: false,
                    title: '5 акций',
                    tone: LogicTreeTone.RED,
                  },
                ],
                id: 'connectors-group-3',
                inline: [
                  inlineText('connectors-group-3-mode', 'Несовместимость', { tone: LogicTreeTone.RED }),
                ],
                kind: LogicTreeNodeKind.GROUP,

                surface: false,
                title: 'Название группы #3',
                tone: LogicTreeTone.RED,
              },
            ],
            id: 'connectors-inner-count',
            surface: false,
            title: '10 акций',
            tone: LogicTreeTone.BLUE,
          },
        ],
        id: 'connectors-count',
        surface: false,
        title: '8 акций',
      },
    ],
  },
]

const interactionTree: UiLogicTreeNode[] = [
  {
    id: 'interaction-root',
    kind: LogicTreeNodeKind.GROUP,
    surface: true,
    title: 'Взаимодействие',
    tone: LogicTreeTone.BLUE,
    children: [
      {
        highlighted: true,
        id: 'interaction-hover',
        inline: [
          inlineText('interaction-hover-meta', 'Равно Мессенджер'),
        ],
        removable: true,
        surface: true,
        title: 'Способ оформления',
      },
      {
        id: 'interaction-selected',
        inline: [
          inlineText('interaction-selected-meta', 'Равно Мессенджер'),
        ],
        removable: true,
        selected: true,
        surface: true,
        title: 'Способ оформления',
      },
      {
        controls: [
          selectControl(
            'interaction-edit-type',
            'Тип доставки',
            'Тип доставки',
            260,
            ['Тип доставки', 'Самовывоз', 'Курьер']
          ),
          selectControl(
            'interaction-edit-operator',
            'Равно',
            'Равно',
            140,
            ['Равно', 'Не равно']
          ),
          selectControl(
            'interaction-edit-value',
            'SDEK',
            'SDEK',
            260,
            ['SDEK', 'Boxberry']
          ),
        ],
        id: 'interaction-edit-on-click',
        inline: [
          inlineText('interaction-edit-on-click-meta', 'Равно SDEK'),
        ],
        removable: true,
        surface: true,
        title: 'Тип доставки',
      },
      {
        children: [
          {
            children: [
              {
                draggable: true,
                id: 'interaction-drag-1',
                inline: [
                  inlineText('interaction-drag-1-meta', 'Бонусы', { tone: 'muted' }),
                ],
                removable: true,
                surface: true,
                title: '1. Название акции #1',
              },
              {
                draggable: true,
                highlighted: true,
                id: 'interaction-drag-2',
                inline: [
                  inlineText('interaction-drag-2-meta', 'Бонусы', { tone: 'muted' }),
                ],
                removable: true,
                surface: true,
                title: '2. Название акции #2',
              },
              {
                draggable: true,
                id: 'interaction-drag-3',
                inline: [
                  inlineText('interaction-drag-3-meta', 'Бонусы', { tone: 'muted' }),
                ],
                removable: true,
                surface: true,
                title: '3. Название акции #3',
              },
            ],
            collapsible: true,
            childrenGrouped: true,
            expanded: true,
            id: 'interaction-drag-group',
            inline: [
              inlineText('interaction-drag-group-meta', '3 строки', { tone: 'muted' }),
            ],
            kind: LogicTreeNodeKind.GROUP,
            surface: true,
            title: 'Группа акций',
          },
          {
            controls: [
              selectControl(
                'interaction-delivery-type',
                'Тип доставки',
                'Тип доставки',
                260,
                ['Тип доставки', 'Самовывоз', 'Курьер']
              ),
              selectControl(
                'interaction-delivery-operator',
                'Равно',
                'Равно',
                140,
                ['Равно', 'Не равно']
              ),
              selectControl(
                'interaction-delivery-value',
                'SDEK',
                'SDEK',
                260,
                ['SDEK', 'Boxberry']
              ),
            ],
            id: 'interaction-editor',
            removable: true,
            rowKind: LogicTreeRowKind.EDITOR,
            surface: true,
            title: 'Тип доставки',
          },
        ],
        draggable: true,
        id: 'interaction-drag-list',
        kind: LogicTreeNodeKind.GROUP,
        surface: true,
        title: 'Список действий',
      },
    ],
  },
]

const relationsDebugTree: UiLogicTreeNode[] = [
  {
    children: [
      {
        id: 'relations-debug-rule-1',
        inline: [
          inlineText('relations-debug-rule-1-meta', 'Равно Сайт'),
        ],
        surface: false,
        title: 'Способ оформления',
        tone: LogicTreeTone.BLUE,
      },
      {
        id: 'relations-debug-rule-2',
        inline: [
          inlineText('relations-debug-rule-2-meta', 'Есть'),
        ],
        conjunction: LogicTreeConjunction.OR,
        surface: false,
        title: 'Телефон',
        tone: LogicTreeTone.BLUE,
      },
      {
        id: 'relations-debug-rule-3',
        inline: [
          inlineText('relations-debug-rule-3-meta', 'Равно retailcrm'),
        ],
        conjunction: LogicTreeConjunction.AND,
        surface: false,
        title: 'Источник',
        tone: LogicTreeTone.BLUE,
      },
    ],
    id: 'relations-debug-root',
    kind: LogicTreeNodeKind.GROUP,
    surface: false,
    title: 'Отладка связей',
    tone: LogicTreeTone.BLUE,
  },
]

const segmentsTree: UiLogicTreeNode[] = [
  {
    children: [
      {
        id: 'segments-clients',
        inline: [
          inlineText('segments-clients-meta', 'Есть такие'),
        ],
        surface: false,
        title: 'Клиенты',
        tone: LogicTreeTone.GREY,
        children: [
          {
            children: [
              {
                id: 'segments-format-summary',
                inline: [
                  inlineText('segments-format-summary-meta', 'Равно Мессенджер'),
                ],
                conjunction: LogicTreeConjunction.AND,
                surface: false,
                title: 'Способ оформления',
                tone: LogicTreeTone.BLUE,
              },
              {
                actions: [
                  {
                    id: 'segments-phone-condition',
                    kind: LogicTreeActionKind.CONDITION,
                    label: 'Условие',
                  },
                  {
                    id: 'segments-phone-group',
                    kind: LogicTreeActionKind.GROUP,
                    label: 'Группа',
                  },
                ],
                id: 'segments-phone-actions',
                rowKind: LogicTreeRowKind.ACTIONS,
                surface: false,
                title: 'Добавить в группу',
                tone: LogicTreeTone.BLUE,
              },
              {
                controls: [
                  selectControl(
                    'segments-format-field',
                    'Способ оформления',
                    'Способ оформления',
                    300,
                    ['Способ оформления', 'Канал продаж', 'Тип клиента']
                  ),
                  selectControl(
                    'segments-format-operator',
                    'Равно',
                    'Равно',
                    220,
                    ['Равно', 'Не равно']
                  ),
                  selectControl(
                    'segments-format-value',
                    'Сайт',
                    'Сайт',
                    300,
                    ['Сайт', 'Мессенджер', 'Маркетплейс']
                  ),
                ],
                id: 'segments-format-editor',
                conjunction: LogicTreeConjunction.OR,
                removable: true,
                rowKind: LogicTreeRowKind.EDITOR,
                surface: true,
                title: 'Способ оформления',
                tone: LogicTreeTone.BLUE,
              },
              {
                actions: [
                  {
                    id: 'segments-root-condition',
                    kind: LogicTreeActionKind.CONDITION,
                    label: 'Условие',
                  },
                  {
                    id: 'segments-root-group',
                    kind: LogicTreeActionKind.GROUP,
                    label: 'Группа',
                  },
                ],
                id: 'segments-root-actions',
                rowKind: LogicTreeRowKind.ACTIONS,
                surface: false,
                title: 'Добавить в сегмент',
                tone: LogicTreeTone.BLUE,
              },
            ],
            id: 'segments-order',
            inline: [
              inlineText('segments-order-meta', 'Есть такие'),
            ],
            surface: false,
            title: 'Заказ клиента',
            tone: LogicTreeTone.GREY,
          },
        ],
      },
    ],
    id: 'segments-root',
    kind: LogicTreeNodeKind.GROUP,
    rowKind: LogicTreeRowKind.SUMMARY,
    surface: false,
    title: 'Сегменты и редактирование',
    tone: LogicTreeTone.GREY,
  },
]

const campaignTree: UiLogicTreeNode[] = [
  {
    id: 'campaign-root',
    inline: [
      inlineText('campaign-root-mode', 'Последовательное применение', { tone: LogicTreeTone.GREEN }),
      inlineText('campaign-root-meta', 'До 5 000 ₽ скидки', { separated: true, tone: 'muted' }),
    ],
    kind: LogicTreeNodeKind.GROUP,
    surface: false,
    title: 'Корневая группа',
    tone: LogicTreeTone.GREEN,
    conjunction: LogicTreeConjunction.AND,
    children: [
      {
        collapsible: true,
        expanded: true,
        id: 'campaign-count',
        surface: false,
        title: '8 акций',
        tone: LogicTreeTone.GREEN,
        conjunction: LogicTreeConjunction.AND,
        children: [
          {
            id: 'campaign-group-1',
            title: 'Название группы #1',
            inline: [
              inlineText('campaign-group-1-mode', 'Максимальная выгода', { tone: LogicTreeTone.BLUE }),
            ],
            kind: LogicTreeNodeKind.GROUP,
            controls: [
              selectControl('group-1-mode', 'Режим', 'Максимальная выгода', 220, ['Максимальная выгода', 'Последовательное применение']),
              inputControl('group-1-meta', 'Описание', 'До 5 000 ₽ скидки', 260),
            ],
            removable: true,
            surface: false,
            tone: LogicTreeTone.BLUE,
            children: [
              {
                collapsible: true,
                id: 'campaign-inner-count',
                surface: false,
                title: '10 акций',
                tone: LogicTreeTone.BLUE,
                children: [
                  {
                    children: [
                      {
                        id: 'campaign-group-2-count',
                        surface: false,
                        title: '12 акций',
                        tone: LogicTreeTone.GREEN,
                      },
                      {
                        actions: [
                          {
                            id: 'campaign-group-2-add',
                            kind: LogicTreeActionKind.GROUP,
                            label: 'Группа',
                          },
                        ],
                        id: 'campaign-group-2-action',
                        rowKind: LogicTreeRowKind.ACTIONS,
                        surface: false,
                        title: 'Добавить группу',
                        tone: LogicTreeTone.GREEN,
                      },
                    ],
                    id: 'campaign-group-2',
                    inline: [
                      inlineText('campaign-group-2-mode', 'Последовательное применение', { tone: LogicTreeTone.GREEN }),
                      inlineText('campaign-group-2-meta', 'До 5 000 оплата бонусами', {
                        separated: true,
                        tone: 'muted',
                      }),
                    ],
                    kind: LogicTreeNodeKind.GROUP,
                    surface: false,
                    title: 'Название группы #2',
                    tone: LogicTreeTone.GREEN,
                  },
                  {
                    id: 'campaign-group-3',
                    inline: [
                      inlineText('campaign-group-3-mode', 'Несовместимость', { tone: LogicTreeTone.RED }),
                    ],
                    kind: LogicTreeNodeKind.GROUP,
                    surface: false,
                    title: 'Название группы #3',
                    tone: LogicTreeTone.RED,
                    conjunction: LogicTreeConjunction.OR,
                    children: [
                      {
                        id: 'campaign-incompatible-count',
                        title: '5 акций',
                        childrenGrouped: true,
                        collapsible: true,
                        expanded: true,
                        surface: false,
                        conjunction: LogicTreeConjunction.AND,
                        tone: LogicTreeTone.GREY,
                        children: [
                          {
                            draggable: true,
                            id: 'campaign-1',
                            inline: [
                              inlineText('campaign-1-meta', 'Бонусы', { tone: 'muted' }),
                            ],
                            removable: true,
                            surface: true,
                            title: '1. Название акции #1',
                          },
                          {
                            draggable: true,
                            id: 'campaign-2',
                            inline: [
                              inlineText('campaign-2-meta', 'Бонусы', { tone: 'muted' }),
                            ],
                            removable: true,
                            surface: true,
                            title: '2. Название акции #2',
                          },
                          {
                            draggable: true,
                            id: 'campaign-3',
                            inline: [
                              inlineText('campaign-3-meta', 'Бонусы', { tone: 'muted' }),
                            ],
                            removable: true,
                            surface: true,
                            title: '3. Название акции #3',
                          },
                          {
                            draggable: true,
                            id: 'campaign-4',
                            inline: [
                              inlineText('campaign-4-meta', 'Бонусы', { tone: 'muted' }),
                            ],
                            removable: true,
                            surface: true,
                            title: '4. Название акции #4',
                          },
                          {
                            draggable: true,
                            id: 'campaign-5',
                            inline: [
                              inlineText('campaign-5-meta', 'Бонусы', { tone: 'muted' }),
                            ],
                            removable: true,
                            surface: true,
                            title: '5. Название акции #5',
                          },
                          {
                            actions: [
                              {
                                id: 'campaign-add-action',
                                kind: LogicTreeActionKind.CONDITION,
                                label: 'Добавить акцию в группу',
                              },
                            ],
                            id: 'campaign-actions',
                            rowKind: LogicTreeRowKind.ACTIONS,
                            surface: false,
                            title: 'Добавить акцию',
                            tone: LogicTreeTone.BLUE,
                          },
                        ],
                      },
                      {
                        actions: [
                          {
                            id: 'campaign-conflict-group',
                            kind: LogicTreeActionKind.GROUP,
                            label: 'Группа',
                          },
                        ],
                        id: 'campaign-conflict-actions',
                        rowKind: LogicTreeRowKind.ACTIONS,
                        surface: false,
                        title: 'Добавить группу',
                        tone: LogicTreeTone.RED,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            actions: [
              {
                id: 'campaign-root-group',
                kind: LogicTreeActionKind.GROUP,
                label: 'Группа',
              },
            ],
            id: 'campaign-root-action',
            rowKind: LogicTreeRowKind.ACTIONS,
            surface: false,
            title: 'Добавить группу',
            tone: LogicTreeTone.GREEN,
          },
        ],
      },
    ],
  },
]

const meta = {
  title: 'Components/UiLogicTree',

  component: UiLogicTree,

  args: {
    editable: true,
    items: rowsTree,
    surface: true,
  },

  argTypes: {
    editable: {
      control: 'boolean',
      description: 'Включает интерактивное редактирование дерева. В read-only режиме editor-строки отображаются как просмотр, drag/remove/actions скрываются.',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    items: {
      control: false,
      description: 'Набор корневых узлов дерева. Вложенная схема узла включает rowKind, children, controls, actions, draggable, removable и другие поля.',
      table: {
        type: {
          summary: 'UiLogicTreeNode[]',
          detail: `type UiLogicTreeNode = {
  id: string
  title: string
  rowKind?: 'summary' | 'editor' | 'actions'
  kind?: 'condition' | 'group'
  tone?: 'blue' | 'green' | 'grey' | 'red' | 'yellow'
  conjunction?: 'and' | 'or' | string
  inline?: UiLogicTreeInlineText[]
  controls?: UiLogicTreeControl[]
  actions?: UiLogicTreeAction[]
  children?: UiLogicTreeNode[]
  collapsible?: boolean
  expanded?: boolean
  draggable?: boolean
  removable?: boolean
  highlighted?: boolean
  selected?: boolean
  surface?: boolean
  subtitle?: string
  meta?: string
}`,
        },
      },
    },
    surface: {
      control: 'boolean',
      description: 'Оборачивает дерево в общий контейнер-карточку с рамкой и внутренними отступами.',
    },
  },

  render: createRemoteStoryRender({
    provider,
    worker: UiLogicTreeWorker,
  }),

  parameters: {
    docs: {
      description: {
        component: 'UiLogicTree сам управляет деревом, связями, состояниями строк и стандартным рендером summary/editor/actions-кейсов. Storybook worker только прокидывает данные в компонент.',
      },
    },
    layout: 'padded',
  },
} satisfies Meta<typeof UiLogicTree>

export default meta

type Story = StoryObj<typeof meta>

export const Sandbox: Story = {}

export const Rows: Story = {
  args: {
    editable: true,
    items: rowsTree,
    surface: true,
  },
}

export const Connectors: Story = {
  args: {
    editable: true,
    items: connectorsTree,
    surface: false,
  },
}

export const TreeInteractions: Story = {
  args: {
    editable: true,
    items: interactionTree,
    surface: true,
  },
}

export const RelationsDebug: Story = {
  args: {
    editable: true,
    items: relationsDebugTree,
    surface: false,
  },
}

export const SegmentsEditing: Story = {
  args: {
    editable: true,
    items: segmentsTree,
    surface: false,
  },
}

export const CampaignArbitrage: Story = {
  args: {
    editable: true,
    items: campaignTree,
    surface: false,
  },
}

export const ReadOnly: Story = {
  args: {
    editable: false,
    items: rowsTree,
    surface: true,
  },
}
