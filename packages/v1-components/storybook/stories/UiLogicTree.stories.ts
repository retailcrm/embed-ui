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

import {
  UI_LOGIC_TREE_ACTION_KIND,
  UI_LOGIC_TREE_CONTROL_KIND,
  UI_LOGIC_TREE_ICON,
  UI_LOGIC_TREE_NODE_KIND,
  UI_LOGIC_TREE_RELATION,
  UI_LOGIC_TREE_ROW_KIND,
  UI_LOGIC_TREE_TONE,
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
  kind: UI_LOGIC_TREE_CONTROL_KIND.SELECT,
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
  kind: UI_LOGIC_TREE_CONTROL_KIND.INPUT,
  label,
  value,
  width,
})

const rowsTree: UiLogicTreeNode[] = [
  {
    id: 'rows-root',
    inline: [
      inlineText('rows-root-mode', 'Последовательное применение', { tone: UI_LOGIC_TREE_TONE.GREEN }),
      inlineText('rows-root-meta', 'До 5 000 ₽ скидки', { separated: true, tone: 'muted' }),
    ],
    kind: UI_LOGIC_TREE_NODE_KIND.GROUP,
    surface: true,
    title: 'Корневая группа',
    tone: UI_LOGIC_TREE_TONE.GREEN,
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
                kind: UI_LOGIC_TREE_ACTION_KIND.CONDITION,
                label: 'Условие',
              },
              {
                id: 'rows-action-group',
                kind: UI_LOGIC_TREE_ACTION_KIND.GROUP,
                label: 'Группа',
              },
            ],
            id: 'rows-actions',
            rowKind: UI_LOGIC_TREE_ROW_KIND.ACTIONS,
            surface: true,
            title: 'Добавить в ветку',
            tone: UI_LOGIC_TREE_TONE.BLUE,
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
            relation: UI_LOGIC_TREE_RELATION.AND,
            removable: true,
            rowKind: UI_LOGIC_TREE_ROW_KIND.EDITOR,
            surface: true,
            title: 'Тип доставки',
            tone: UI_LOGIC_TREE_TONE.BLUE,
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
                icon: UI_LOGIC_TREE_ICON.ADD,
                id: 'rows-order-extra',
                kind: UI_LOGIC_TREE_CONTROL_KIND.ICON,
                label: 'Дополнительное действие',
              },
            ],
            id: 'rows-order-condition',
            removable: true,
            rowKind: UI_LOGIC_TREE_ROW_KIND.EDITOR,
            surface: true,
            title: 'Заказ клиента',
            tone: UI_LOGIC_TREE_TONE.BLUE,
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
      inlineText('connectors-root-mode', 'Последовательное применение', { tone: UI_LOGIC_TREE_TONE.GREEN }),
      inlineText('connectors-root-meta', 'До 5 000 ₽ скидки', { separated: true, tone: 'muted' }),
    ],
    kind: UI_LOGIC_TREE_NODE_KIND.GROUP,
    surface: false,
    title: 'Корневая группа',
    tone: UI_LOGIC_TREE_TONE.GREEN,
    children: [
      {
        children: [
          {
            children: [
              {
                id: 'connectors-group-2',
                inline: [
                  inlineText('connectors-group-2-mode', 'Последовательное применение', { tone: UI_LOGIC_TREE_TONE.GREEN }),
                  inlineText('connectors-group-2-meta', 'До 5 000 оплата бонусами', {
                    separated: true,
                    tone: 'muted',
                  }),
                ],
                kind: UI_LOGIC_TREE_NODE_KIND.GROUP,
                surface: false,
                title: 'Название группы #2',
                tone: UI_LOGIC_TREE_TONE.GREEN,
              },
            ],
            id: 'connectors-group-1',
            inline: [
              inlineText('connectors-group-1-mode', 'Максимальная выгода', { tone: UI_LOGIC_TREE_TONE.BLUE }),
            ],
            kind: UI_LOGIC_TREE_NODE_KIND.GROUP,
            surface: false,
            title: 'Название группы #1',
            tone: UI_LOGIC_TREE_TONE.BLUE,
          },
          {
            children: [
              {
                children: [
                  {
                    actions: [
                      {
                        id: 'connectors-group-action',
                        kind: UI_LOGIC_TREE_ACTION_KIND.GROUP,
                        label: 'Группа',
                      },
                    ],
                    id: 'connectors-group-action-row',
                    rowKind: UI_LOGIC_TREE_ROW_KIND.ACTIONS,
                    surface: false,
                    title: 'Добавить группу',
                    tone: UI_LOGIC_TREE_TONE.GREEN,
                  },
                ],
                id: 'connectors-group-2-count',
                surface: false,
                title: '12 акций',
                tone: UI_LOGIC_TREE_TONE.GREEN,
              },
              {
                children: [
                  {
                    id: 'connectors-conflict-count',
                    surface: false,
                    title: '5 акций',
                    tone: UI_LOGIC_TREE_TONE.RED,
                  },
                ],
                id: 'connectors-group-3',
                inline: [
                  inlineText('connectors-group-3-mode', 'Несовместимость', { tone: UI_LOGIC_TREE_TONE.RED }),
                ],
                kind: UI_LOGIC_TREE_NODE_KIND.GROUP,
                relation: UI_LOGIC_TREE_RELATION.OR,
                surface: false,
                title: 'Название группы #3',
                tone: UI_LOGIC_TREE_TONE.RED,
              },
            ],
            id: 'connectors-inner-count',
            surface: false,
            title: '10 акций',
            tone: UI_LOGIC_TREE_TONE.BLUE,
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
    kind: UI_LOGIC_TREE_NODE_KIND.GROUP,
    surface: true,
    title: 'Взаимодействие',
    tone: UI_LOGIC_TREE_TONE.BLUE,
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
            rowKind: UI_LOGIC_TREE_ROW_KIND.EDITOR,
            surface: true,
            title: 'Тип доставки',
          },
        ],
        id: 'interaction-drag-list',
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
        tone: UI_LOGIC_TREE_TONE.BLUE,
      },
      {
        id: 'relations-debug-rule-2',
        inline: [
          inlineText('relations-debug-rule-2-meta', 'Есть'),
        ],
        relation: UI_LOGIC_TREE_RELATION.OR,
        surface: false,
        title: 'Телефон',
        tone: UI_LOGIC_TREE_TONE.BLUE,
      },
      {
        id: 'relations-debug-rule-3',
        inline: [
          inlineText('relations-debug-rule-3-meta', 'Равно retailcrm'),
        ],
        relation: UI_LOGIC_TREE_RELATION.AND,
        surface: false,
        title: 'Источник',
        tone: UI_LOGIC_TREE_TONE.BLUE,
      },
    ],
    id: 'relations-debug-root',
    kind: UI_LOGIC_TREE_NODE_KIND.GROUP,
    surface: false,
    title: 'Отладка связей',
    tone: UI_LOGIC_TREE_TONE.BLUE,
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
        tone: UI_LOGIC_TREE_TONE.GREY,
        children: [
          {
            children: [
              {
                id: 'segments-format-summary',
                inline: [
                  inlineText('segments-format-summary-meta', 'Равно Мессенджер'),
                ],
                relation: UI_LOGIC_TREE_RELATION.AND,
                surface: false,
                title: 'Способ оформления',
                tone: UI_LOGIC_TREE_TONE.BLUE,
              },
              {
                actions: [
                  {
                    id: 'segments-phone-condition',
                    kind: UI_LOGIC_TREE_ACTION_KIND.CONDITION,
                    label: 'Условие',
                  },
                  {
                    id: 'segments-phone-group',
                    kind: UI_LOGIC_TREE_ACTION_KIND.GROUP,
                    label: 'Группа',
                  },
                ],
                id: 'segments-phone-actions',
                rowKind: UI_LOGIC_TREE_ROW_KIND.ACTIONS,
                surface: false,
                title: 'Добавить в группу',
                tone: UI_LOGIC_TREE_TONE.BLUE,
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
                relation: UI_LOGIC_TREE_RELATION.OR,
                removable: true,
                rowKind: UI_LOGIC_TREE_ROW_KIND.EDITOR,
                surface: true,
                title: 'Способ оформления',
                tone: UI_LOGIC_TREE_TONE.BLUE,
              },
              {
                actions: [
                  {
                    id: 'segments-root-condition',
                    kind: UI_LOGIC_TREE_ACTION_KIND.CONDITION,
                    label: 'Условие',
                  },
                  {
                    id: 'segments-root-group',
                    kind: UI_LOGIC_TREE_ACTION_KIND.GROUP,
                    label: 'Группа',
                  },
                ],
                id: 'segments-root-actions',
                rowKind: UI_LOGIC_TREE_ROW_KIND.ACTIONS,
                surface: false,
                title: 'Добавить в сегмент',
                tone: UI_LOGIC_TREE_TONE.BLUE,
              },
            ],
            id: 'segments-order',
            inline: [
              inlineText('segments-order-meta', 'Есть такие'),
            ],
            surface: false,
            title: 'Заказ клиента',
            tone: UI_LOGIC_TREE_TONE.GREY,
          },
        ],
      },
    ],
    id: 'segments-root',
    kind: UI_LOGIC_TREE_NODE_KIND.GROUP,
    rowKind: UI_LOGIC_TREE_ROW_KIND.SUMMARY,
    surface: false,
    title: 'Сегменты и редактирование',
    tone: UI_LOGIC_TREE_TONE.GREY,
  },
]

const campaignTree: UiLogicTreeNode[] = [
  {
    id: 'campaign-root',
    inline: [
      inlineText('campaign-root-mode', 'Последовательное применение', { tone: UI_LOGIC_TREE_TONE.GREEN }),
      inlineText('campaign-root-meta', 'До 5 000 ₽ скидки', { separated: true, tone: 'muted' }),
    ],
    kind: UI_LOGIC_TREE_NODE_KIND.GROUP,
    surface: false,
    title: 'Корневая группа',
    tone: UI_LOGIC_TREE_TONE.GREEN,
    children: [
      {
        children: [
          {
            id: 'campaign-group-1',
            inline: [
              inlineText('campaign-group-1-mode', 'Максимальная выгода', { tone: UI_LOGIC_TREE_TONE.BLUE }),
            ],
            kind: UI_LOGIC_TREE_NODE_KIND.GROUP,
            surface: false,
            title: 'Название группы #1',
            tone: UI_LOGIC_TREE_TONE.BLUE,
          },
          {
            children: [
              {
                children: [
                  {
                    id: 'campaign-group-2-count',
                    surface: false,
                    title: '12 акций',
                    tone: UI_LOGIC_TREE_TONE.GREEN,
                  },
                  {
                    actions: [
                      {
                        id: 'campaign-group-2-add',
                        kind: UI_LOGIC_TREE_ACTION_KIND.GROUP,
                        label: 'Группа',
                      },
                    ],
                    id: 'campaign-group-2-action',
                    rowKind: UI_LOGIC_TREE_ROW_KIND.ACTIONS,
                    surface: false,
                    title: 'Добавить группу',
                    tone: UI_LOGIC_TREE_TONE.GREEN,
                  },
                ],
                id: 'campaign-group-2',
                inline: [
                  inlineText('campaign-group-2-mode', 'Последовательное применение', { tone: UI_LOGIC_TREE_TONE.GREEN }),
                  inlineText('campaign-group-2-meta', 'До 5 000 оплата бонусами', {
                    separated: true,
                    tone: 'muted',
                  }),
                ],
                kind: UI_LOGIC_TREE_NODE_KIND.GROUP,
                surface: false,
                title: 'Название группы #2',
                tone: UI_LOGIC_TREE_TONE.GREEN,
              },
              {
                children: [
                  {
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
                            kind: UI_LOGIC_TREE_ACTION_KIND.CONDITION,
                            label: 'Добавить акцию в группу',
                          },
                        ],
                        id: 'campaign-actions',
                        rowKind: UI_LOGIC_TREE_ROW_KIND.ACTIONS,
                        surface: false,
                        title: 'Добавить акцию',
                        tone: UI_LOGIC_TREE_TONE.BLUE,
                      },
                    ],
                    id: 'campaign-incompatible-count',
                    surface: false,
                    title: '5 акций',
                    tone: UI_LOGIC_TREE_TONE.RED,
                  },
                  {
                    actions: [
                      {
                        id: 'campaign-conflict-group',
                        kind: UI_LOGIC_TREE_ACTION_KIND.GROUP,
                        label: 'Группа',
                      },
                    ],
                    id: 'campaign-conflict-actions',
                    rowKind: UI_LOGIC_TREE_ROW_KIND.ACTIONS,
                    surface: false,
                    title: 'Добавить группу',
                    tone: UI_LOGIC_TREE_TONE.RED,
                  },
                ],
                id: 'campaign-group-3',
                inline: [
                  inlineText('campaign-group-3-mode', 'Несовместимость', { tone: UI_LOGIC_TREE_TONE.RED }),
                ],
                kind: UI_LOGIC_TREE_NODE_KIND.GROUP,
                relation: UI_LOGIC_TREE_RELATION.OR,
                surface: false,
                title: 'Название группы #3',
                tone: UI_LOGIC_TREE_TONE.RED,
              },
            ],
            id: 'campaign-inner-count',
            surface: false,
            title: '10 акций',
            tone: UI_LOGIC_TREE_TONE.BLUE,
          },
          {
            actions: [
              {
                id: 'campaign-root-group',
                kind: UI_LOGIC_TREE_ACTION_KIND.GROUP,
                label: 'Группа',
              },
            ],
            id: 'campaign-root-action',
            rowKind: UI_LOGIC_TREE_ROW_KIND.ACTIONS,
            surface: false,
            title: 'Добавить группу',
            tone: UI_LOGIC_TREE_TONE.GREEN,
          },
        ],
        id: 'campaign-count',
        surface: false,
        title: '8 акций',
        tone: UI_LOGIC_TREE_TONE.GREEN,
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
  relation?: 'И' | 'ИЛИ' | string
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
