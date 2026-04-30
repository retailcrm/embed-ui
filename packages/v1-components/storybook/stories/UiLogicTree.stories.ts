import type { Meta, StoryObj } from '@storybook/vue3'
import type { UiLogicTreeNode, UiLogicTreeNodeData } from '@/common/components/logic-tree'

import {
  LogicTreeChildrenView,
  LogicTreeConjunction,
  LogicTreeNodeKind,
  LogicTreeNodeView,
  LogicTreeTone,
} from '@/common/components/logic-tree'

import styles from './UiLogicTree.remote.example.module.less'
import UiLogicTreeWorker from './UiLogicTree.remote.ts?worker'

import { createRemoteStoryRender } from '../createRemoteStoryRender'
import { UiLogicTree } from '../../src/remote/components/logic-tree'

import page from './UiLogicTree.mdx'

const demoControlKind = {
  INPUT: 'input',
  SELECT: 'select',
} as const

const demoIcon = {
  FOLDER: 'folder',
} as const

type DemoControlKind = typeof demoControlKind[keyof typeof demoControlKind]
type DemoIcon = typeof demoIcon[keyof typeof demoIcon]

type DemoLogicTreeOption = {
  id: string;
  label: string;
  value: string;
}

type DemoLogicTreeControl = {
  id: string;
  kind: DemoControlKind;
  label: string;
  options?: DemoLogicTreeOption[];
  value: string;
  width: number;
}

type DemoLogicTreeAction = {
  id: string;
  kind: Exclude<UiLogicTreeNode['kind'], LogicTreeNodeKind.BRANCH>;
  label: string;
}

type DemoLogicTreeInlineText = {
  id: string;
  text: string;
  tone?: LogicTreeTone | 'default' | 'muted';
  separated?: boolean;
}

type DemoLogicTreeNodeData = {
  title: string;
  icon?: DemoIcon;
  inline?: DemoLogicTreeInlineText[];
  controls?: DemoLogicTreeControl[];
  actions?: DemoLogicTreeAction[];
  removable?: boolean;
}

type DemoLogicTreeData = UiLogicTreeNodeData<DemoLogicTreeNodeData>
type DemoLogicTreeNode = UiLogicTreeNode<DemoLogicTreeNodeData>

const inlineText = (
  id: string,
  text: string,
  config: Omit<DemoLogicTreeInlineText, 'id' | 'text'> = {}
): DemoLogicTreeInlineText => ({
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
  kind: demoControlKind.SELECT,
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
  kind: demoControlKind.INPUT,
  label,
  value,
  width,
})

const groupedItemControls = (id: string) => ([
  selectControl(
    `${id}-type`,
    'Тип доставки',
    'Тип доставки',
    260,
    ['Тип доставки', 'Самовывоз', 'Курьер']
  ),
  selectControl(
    `${id}-operator`,
    'Равно',
    'Равно',
    140,
    ['Равно', 'Не равно']
  ),
  inputControl(
    `${id}-value`,
    'Значение',
    '',
    260
  ),
])

const summaryData = (
  title: string,
  config: Omit<DemoLogicTreeData, 'editable' | 'title' | 'view'> = {}
): DemoLogicTreeData => ({
  editable: false,
  title,
  view: LogicTreeNodeView.SUMMARY,
  ...config,
})

const actionsData = (
  title: string,
  actions: NonNullable<DemoLogicTreeData['actions']>,
  config: Omit<DemoLogicTreeData, 'actions' | 'editable' | 'title' | 'view'> = {}
): DemoLogicTreeData => ({
  actions,
  editable: false,
  title,
  view: LogicTreeNodeView.ACTIONS,
  ...config,
})

const conditionNode = (
  id: string,
  data: DemoLogicTreeData,
  config: Omit<DemoLogicTreeNode, 'id' | 'kind' | 'data'> = {}
): DemoLogicTreeNode => ({
  id,
  kind: LogicTreeNodeKind.CONDITION,
  data,
  ...config,
})

const groupNode = (
  id: string,
  data: DemoLogicTreeData,
  config: Omit<DemoLogicTreeNode, 'id' | 'kind' | 'data'> = {}
): DemoLogicTreeNode => ({
  id,
  kind: LogicTreeNodeKind.GROUP,
  data,
  ...config,
})

const branchNode = (
  id: string,
  data: DemoLogicTreeData,
  config: Omit<DemoLogicTreeNode, 'id' | 'kind' | 'data'> = {}
): DemoLogicTreeNode => ({
  id,
  kind: LogicTreeNodeKind.BRANCH,
  data,
  ...config,
})

const campaignTree: DemoLogicTreeNode[] = [
  groupNode('campaign-root', summaryData('Корневая группа', {
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
    removable: true,
    disabled: true,
    inline: [
      inlineText('campaign-root-mode', 'Последовательное применение', { tone: LogicTreeTone.GREEN }),
      inlineText('campaign-root-meta', 'До 5 000 ₽ скидки', { separated: true, tone: 'muted' }),
    ],
  }), {
    tone: LogicTreeTone.GREEN,
    children: [
      groupNode('campaign-count', summaryData('8 акций', { disabled: true }), {
        childrenView: LogicTreeChildrenView.GROUPED,
        collapsible: true,
        expanded: true,
        children: [
          conditionNode('campaign-count-item-1', summaryData('1. Название акции #1', {
            controls: groupedItemControls('campaign-count-item-1'),
            draggable: true,
            inline: [
              inlineText('campaign-count-item-1-meta', 'Бонусы', { tone: 'muted' }),
            ],
            removable: true,
          })),
          conditionNode('campaign-count-item-2', summaryData('2. Название акции #2', {
            controls: groupedItemControls('campaign-count-item-2'),
            draggable: true,
            inline: [
              inlineText('campaign-count-item-2-meta', 'Бонусы', { tone: 'muted' }),
            ],
            removable: true,
          })),
          conditionNode('campaign-count-item-3', summaryData('3. Название акции #3', {
            controls: groupedItemControls('campaign-count-item-3'),
            draggable: true,
            inline: [
              inlineText('campaign-count-item-3-meta', 'Бонусы', { tone: 'muted' }),
            ],
            removable: true,
          }), {
            conjunction: LogicTreeConjunction.AND,
            tone: LogicTreeTone.BLUE,
          }),
          conditionNode('campaign-count-actions', actionsData('Добавить акцию', [
            {
              id: 'campaign-count-add-action',
              kind: LogicTreeNodeKind.CONDITION,
              label: 'Добавить акцию в группу',
            },
          ]), {
            tone: LogicTreeTone.BLUE,
          }),
        ],
      }),
      groupNode('campaign-group-1', summaryData('Название группы #1', {
        icon: demoIcon.FOLDER,
        controls: [
          selectControl('group-1-mode', 'Режим', 'Максимальная выгода', 220, ['Максимальная выгода', 'Последовательное применение']),
          inputControl('group-1-meta', 'Описание', 'До 5 000 ₽ скидки', 260),
        ],
        inline: [
          inlineText('campaign-group-1-mode', 'Максимальная выгода', { tone: LogicTreeTone.BLUE }),
        ],
        removable: true,
      }), {
        tone: LogicTreeTone.BLUE,
        children: [
          branchNode('campaign-group-1-count', summaryData('10 акций'), {
            childrenView: LogicTreeChildrenView.GROUPED,
            collapsible: true,
            expanded: true,
            children: [
              conditionNode('campaign-group-1-actions', actionsData('Добавить акцию', [
                {
                  id: 'campaign-group-1-add-action',
                  kind: LogicTreeNodeKind.CONDITION,
                  label: 'Добавить акцию в группу',
                },
              ])),
            ],
          }),

          groupNode('campaign-group-2', summaryData('Название группы #2', {
            icon: demoIcon.FOLDER,
            inline: [
              inlineText('campaign-group-2-mode', 'Последовательное применение', { tone: LogicTreeTone.GREEN }),
              inlineText('campaign-group-2-meta', 'До 5 000 ₽ оплата бонусами', { separated: true, tone: 'muted' }),
            ],
            removable: true,
          }), {
            tone: LogicTreeTone.GREEN,
            children: [
              branchNode('campaign-group-2-count', summaryData('12 акций'), {
                childrenView: LogicTreeChildrenView.GROUPED,
                collapsible: true,
                expanded: true,
                children: [
                  conditionNode('campaign-group-2-actions', actionsData('Добавить акцию', [
                    {
                      id: 'campaign-group-2-add-action',
                      kind: LogicTreeNodeKind.CONDITION,
                      label: 'Добавить акцию в группу',
                    },
                  ])),
                ],
              }),

              conditionNode('campaign-group-2-footer-action', actionsData('Добавить группу', [
                {
                  id: 'campaign-group-2-add-group',
                  kind: LogicTreeNodeKind.GROUP,
                  label: 'Группа',
                },
              ]), {
                tone: LogicTreeTone.GREEN,
              }),
            ],
          }),

          groupNode('campaign-group-3', summaryData('Название группы #3', {
            icon: demoIcon.FOLDER,
            inline: [
              inlineText('campaign-group-3-mode', 'Несовместимость', { tone: LogicTreeTone.RED }),
            ],
            removable: true,
          }), {
            tone: LogicTreeTone.RED,
            children: [
              branchNode('campaign-group-3-count', summaryData('5 акций'), {
                childrenView: LogicTreeChildrenView.GROUPED,
                collapsible: true,
                expanded: true,
                children: [
                  conditionNode('campaign-group-3-item-1', summaryData('1. Название акции #1', {
                    controls: groupedItemControls('campaign-group-3-item-1'),
                    draggable: true,
                    disabled: true,
                    inline: [
                      inlineText('campaign-group-3-item-1-meta', 'Бонусы', { tone: 'muted' }),
                    ],
                    removable: true,
                  })),

                  conditionNode('campaign-group-3-item-2', summaryData('2. Название акции #2', {
                    controls: groupedItemControls('campaign-group-3-item-2'),
                    draggable: true,
                    inline: [
                      inlineText('campaign-group-3-item-2-meta', 'Бонусы', { tone: 'muted' }),
                    ],
                    removable: true,
                  })),

                  conditionNode('campaign-group-3-item-3', summaryData('3. Название акции #3', {
                    controls: groupedItemControls('campaign-group-3-item-3'),
                    draggable: true,
                    inline: [
                      inlineText('campaign-group-3-item-3-meta', 'Бонусы', { tone: 'muted' }),
                    ],
                    removable: true,
                  })),

                  conditionNode('campaign-group-3-actions', actionsData('Добавить акцию', [
                    {
                      id: 'campaign-group-3-add-action',
                      kind: LogicTreeNodeKind.CONDITION,
                      label: 'Добавить акцию в группу',
                    },
                  ])),
                ],
              }),

              conditionNode('campaign-group-3-footer-action', actionsData('Добавить группу', [
                {
                  id: 'campaign-group-3-add-group',
                  kind: LogicTreeNodeKind.GROUP,
                  label: 'Группа',
                },
              ]), {
                tone: LogicTreeTone.GREEN,
              }),
            ],
          }),

          conditionNode('campaign-group-1-footer-action', actionsData('Добавить группу', [
            {
              id: 'campaign-group-1-add-group',
              kind: LogicTreeNodeKind.GROUP,
              label: 'Группа',
            },
          ]), {
            tone: LogicTreeTone.GREEN,
          }),
        ],
      }),
      conditionNode('campaign-root-footer-action', actionsData('Добавить группу', [
        {
          id: 'campaign-root-add-group',
          kind: LogicTreeNodeKind.GROUP,
          label: 'Группа',
        },
        {
          id: 'campaign-root-add-condition',
          kind: LogicTreeNodeKind.CONDITION,
          label: 'Условие',
        },
      ]), {
        tone: LogicTreeTone.GREEN,
      }),
    ],
  }),
]

const segmentsEditingTree: DemoLogicTreeNode[] = [
  groupNode('segments-root', summaryData('Клиенты', {
    inline: [
      inlineText('segments-root-operator', 'Есть такие'),
    ],
  }), {
    tone: LogicTreeTone.GREY,
    children: [
      groupNode('segments-order', summaryData('Заказ клиента', {
        inline: [
          inlineText('segments-order-operator', 'Есть такие'),
        ],
      }), {
        tone: LogicTreeTone.YELLOW,
        children: [
          groupNode('segments-messenger', summaryData('Способ оформления', {
            inline: [
              inlineText('segments-messenger-operator', 'Равно Мессенджер'),
            ],
          }), {
            tone: LogicTreeTone.BLUE,
            conjunction: LogicTreeConjunction.OR,
            children: [
              conditionNode('segments-messenger-phone', summaryData('Телефон', {
                inline: [
                  inlineText('segments-messenger-phone-operator', 'Есть'),
                ],
              }), {
                conjunction: LogicTreeConjunction.AND,
              }),
              conditionNode('segments-messenger-actions', actionsData('Добавить в сегмент', [
                {
                  id: 'segments-messenger-add-condition',
                  kind: LogicTreeNodeKind.CONDITION,
                  label: 'Условие',
                },
                {
                  id: 'segments-messenger-add-group',
                  kind: LogicTreeNodeKind.GROUP,
                  label: 'Группа',
                },
              ])),
            ],
          }),
          groupNode('segments-site', {
            ...summaryData('Способ оформления', {
              controls: [
                selectControl(
                  'segments-site-type',
                  'Способ оформления',
                  'Способ оформления',
                  252,
                  ['Способ оформления', 'Телефон', 'Канал']
                ),
                selectControl(
                  'segments-site-operator',
                  'Равно',
                  'Равно',
                  160,
                  ['Равно', 'Не равно', 'Есть такие']
                ),
                selectControl(
                  'segments-site-value',
                  'Сайт',
                  'Сайт',
                  252,
                  ['Сайт', 'Мессенджер']
                ),
              ],
              removable: true,
            }),
            editable: true,
          }, {
            tone: LogicTreeTone.BLUE,
            children: [
              conditionNode('segments-site-phone', summaryData('Телефон', {
                inline: [
                  inlineText('segments-site-phone-operator', 'Есть'),
                ],
              }), {
                conjunction: LogicTreeConjunction.AND,
              }),
              conditionNode('segments-site-actions', actionsData('Добавить в сегмент', [
                {
                  id: 'segments-site-add-condition',
                  kind: LogicTreeNodeKind.CONDITION,
                  label: 'Условие',
                },
                {
                  id: 'segments-site-add-group',
                  kind: LogicTreeNodeKind.GROUP,
                  label: 'Группа',
                },
              ])),
            ],
          }),
          conditionNode('segments-order-actions', actionsData('Добавить в заказ', [
            {
              id: 'segments-order-add-condition',
              kind: LogicTreeNodeKind.CONDITION,
              label: 'Условие',
            },
            {
              id: 'segments-order-add-group',
              kind: LogicTreeNodeKind.GROUP,
              label: 'Группа',
            },
          ]), {
            tone: LogicTreeTone.YELLOW,
          }),
        ],
      }),
      conditionNode('segments-root-actions', actionsData('Добавить в корень', [
        {
          id: 'segments-root-add-condition',
          kind: LogicTreeNodeKind.CONDITION,
          label: 'Условие',
        },
        {
          id: 'segments-root-add-group',
          kind: LogicTreeNodeKind.GROUP,
          label: 'Группа',
        },
      ]), {
        tone: LogicTreeTone.GREY,
      }),
    ],
  }),
]

const meta = {
  title: 'Components/UiLogicTree',
  component: UiLogicTree,
  args: {
    items: campaignTree,
    styles,
  },
  argTypes: {
    items: {
      control: false,
      table: {
        category: 'props',
        type: {
          summary: 'UiLogicTreeNode[]',
        },
      },
    },
    styles: {
      control: false,
      table: {
        disable: true,
      },
    },
    'node:add': {
      control: false,
      table: { category: 'events' },
    },
    'node:edit': {
      control: false,
      table: { category: 'events' },
    },
    'node:remove': {
      control: false,
      table: { category: 'events' },
    },
  },
  render: createRemoteStoryRender({
    worker: UiLogicTreeWorker,
  }),
  parameters: {
    docs: { page },
    layout: 'padded',
  },
} satisfies Meta<typeof UiLogicTree>

export default meta

type Story = StoryObj<typeof meta>

export const CampaignArbitrage: Story = {
  args: {
    items: campaignTree,
  },
}

export const SegmentsEditing: Story = {
  args: {
    items: segmentsEditingTree,
  },
}
