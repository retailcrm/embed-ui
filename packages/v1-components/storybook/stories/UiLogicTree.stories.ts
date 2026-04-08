import type { Meta, StoryObj } from '@storybook/vue3'
import type {
  UiLogicTreeInlineText,
  UiLogicTreeNode,
  UiLogicTreeRow as UiLogicTreeRowData,
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
  LogicTreeChildrenView,
  LogicTreeConjunction,
  LogicTreeControlKind,
  LogicTreeIcon,
  LogicTreeNodeKind,
  LogicTreeRowView,
  LogicTreeTone,
} from '@/common/components/logic-tree'

import { UiLogicTree } from '../../src/remote/components/logic-tree'
import UiLogicTreeWorker from './UiLogicTree.remote.ts?worker'

import { createRemoteStoryRender } from '../createRemoteStoryRender'

import page from './UiLogicTree.mdx'

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

const summaryRow = (
  title: string,
  config: Omit<UiLogicTreeRowData, 'editable' | 'title' | 'view'> = {}
): UiLogicTreeRowData => ({
  editable: false,
  title,
  view: LogicTreeRowView.SUMMARY,
  ...config,
})

const actionsRow = (
  title: string,
  actions: NonNullable<UiLogicTreeRowData['actions']>,
  config: Omit<UiLogicTreeRowData, 'actions' | 'editable' | 'title' | 'view'> = {}
): UiLogicTreeRowData => ({
  actions,
  editable: false,
  title,
  view: LogicTreeRowView.ACTIONS,
  ...config,
})

const conditionNode = (
  id: string,
  row: UiLogicTreeRowData,
  config: Omit<UiLogicTreeNode, 'id' | 'kind' | 'row'> = {}
): UiLogicTreeNode => ({
  id,
  kind: LogicTreeNodeKind.CONDITION,
  row,
  ...config,
})

const groupNode = (
  id: string,
  row: UiLogicTreeRowData,
  config: Omit<UiLogicTreeNode, 'id' | 'kind' | 'row'> = {}
): UiLogicTreeNode => ({
  id,
  kind: LogicTreeNodeKind.GROUP,
  row,
  ...config,
})

const branchNode = (
  id: string,
  row: UiLogicTreeRowData,
  config: Omit<UiLogicTreeNode, 'id' | 'kind' | 'row'> = {}
): UiLogicTreeNode => ({
  id,
  kind: LogicTreeNodeKind.BRANCH,
  row,
  ...config,
})

const campaignTree: UiLogicTreeNode[] = [
  groupNode('campaign-root', summaryRow('Корневая группа', {
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
    inline: [
      inlineText('campaign-root-mode', 'Последовательное применение', { tone: LogicTreeTone.GREEN }),
      inlineText('campaign-root-meta', 'До 5 000 ₽ скидки', { separated: true, tone: 'muted' }),
    ],
  }), {
    tone: LogicTreeTone.GREEN,
    children: [
      groupNode('campaign-count', summaryRow('8 акций', { removable: true }), {
        childrenView: LogicTreeChildrenView.GROUPED,
        collapsible: true,
        expanded: true,
        children: [
          conditionNode('campaign-count-item-1', summaryRow('1. Название акции #1', {
            draggable: true,
            inline: [
              inlineText('campaign-count-item-1-meta', 'Бонусы', { tone: 'muted' }),
            ],
            removable: true,
          })),
          conditionNode('campaign-count-item-2', summaryRow('2. Название акции #2', {
            draggable: true,
            inline: [
              inlineText('campaign-count-item-2-meta', 'Бонусы', { tone: 'muted' }),
            ],
            removable: true,
          })),
          conditionNode('campaign-count-item-3', summaryRow('3. Название акции #3', {
            draggable: true,
            inline: [
              inlineText('campaign-count-item-3-meta', 'Бонусы', { tone: 'muted' }),
            ],
            removable: true,
          }), {
            conjunction: LogicTreeConjunction.AND,
            tone: LogicTreeTone.BLUE,
          }),
          conditionNode('campaign-count-actions', actionsRow('Добавить акцию', [
            {
              id: 'campaign-count-add-action',
              kind: LogicTreeActionKind.CONDITION,
              label: 'Добавить акцию в группу',
            },
          ]), {
            tone: LogicTreeTone.BLUE,
          }),
        ],
      }),
      groupNode('campaign-group-1', summaryRow('Название группы #1', {
        icon: LogicTreeIcon.FOLDER,
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
          branchNode('campaign-group-1-count', summaryRow('10 акций'), {
            childrenView: LogicTreeChildrenView.GROUPED,
            collapsible: true,
            expanded: true,
            children: [
              conditionNode('campaign-group-1-actions', actionsRow('Добавить акцию', [
                {
                  id: 'campaign-group-1-add-action',
                  kind: LogicTreeActionKind.CONDITION,
                  label: 'Добавить акцию в группу',
                },
              ])),
            ],
          }),

          groupNode('campaign-group-2', summaryRow('Название группы #2', {
            icon: LogicTreeIcon.FOLDER,
            inline: [
              inlineText('campaign-group-2-mode', 'Последовательное применение', { tone: LogicTreeTone.GREEN }),
              inlineText('campaign-group-2-meta', 'До 5 000 ₽ оплата бонусами', { separated: true, tone: 'muted' }),
            ],
            removable: true,
          }), {
            tone: LogicTreeTone.GREEN,
            children: [
              branchNode('campaign-group-2-count', summaryRow('12 акций'), {
                childrenView: LogicTreeChildrenView.GROUPED,
                collapsible: true,
                expanded: true,
                children: [
                  conditionNode('campaign-group-2-actions', actionsRow('Добавить акцию', [
                    {
                      id: 'campaign-group-2-add-action',
                      kind: LogicTreeActionKind.CONDITION,
                      label: 'Добавить акцию в группу',
                    },
                  ])),
                ],
              }),

              conditionNode('campaign-group-2-footer-action', actionsRow('Добавить группу', [
                {
                  id: 'campaign-group-2-add-group',
                  kind: LogicTreeActionKind.GROUP,
                  label: 'Группа',
                },
              ]), {
                tone: LogicTreeTone.GREEN,
              }),
            ],
          }),

          groupNode('campaign-group-3', summaryRow('Название группы #3', {
            icon: LogicTreeIcon.FOLDER,
            inline: [
              inlineText('campaign-group-3-mode', 'Несовместимость', { tone: LogicTreeTone.RED }),
            ],
            removable: true,
          }), {
            tone: LogicTreeTone.RED,
            children: [
              branchNode('campaign-group-3-count', summaryRow('5 акций'), {
                childrenView: LogicTreeChildrenView.GROUPED,
                collapsible: true,
                expanded: true,
                children: [
                  conditionNode('campaign-group-3-item-1', summaryRow('1. Название акции #1', {
                    draggable: true,
                    inline: [
                      inlineText('campaign-group-3-item-1-meta', 'Бонусы', { tone: 'muted' }),
                    ],
                    removable: true,
                  })),

                  conditionNode('campaign-group-3-item-2', summaryRow('2. Название акции #2', {
                    draggable: true,
                    inline: [
                      inlineText('campaign-group-3-item-2-meta', 'Бонусы', { tone: 'muted' }),
                    ],
                    removable: true,
                  })),

                  conditionNode('campaign-group-3-item-3', summaryRow('3. Название акции #3', {
                    draggable: true,
                    inline: [
                      inlineText('campaign-group-3-item-3-meta', 'Бонусы', { tone: 'muted' }),
                    ],
                    removable: true,
                  })),

                  conditionNode('campaign-group-3-actions', actionsRow('Добавить акцию', [
                    {
                      id: 'campaign-group-3-add-action',
                      kind: LogicTreeActionKind.CONDITION,
                      label: 'Добавить акцию в группу',
                    },
                  ])),
                ],
              }),

              conditionNode('campaign-group-3-footer-action', actionsRow('Добавить группу', [
                {
                  id: 'campaign-group-3-add-group',
                  kind: LogicTreeActionKind.GROUP,
                  label: 'Группа',
                },
              ]), {
                tone: LogicTreeTone.GREEN,
              }),
            ],
          }),

          conditionNode('campaign-group-1-footer-action', actionsRow('Добавить группу', [
            {
              id: 'campaign-group-1-add-group',
              kind: LogicTreeActionKind.GROUP,
              label: 'Группа',
            },
          ]), {
            tone: LogicTreeTone.GREEN,
          }),
        ],
      }),
      conditionNode('campaign-root-footer-action', actionsRow('Добавить группу', [
        {
          id: 'campaign-root-add-group',
          kind: LogicTreeActionKind.GROUP,
          label: 'Группа',
        },
        {
          id: 'campaign-root-add-condition',
          kind: LogicTreeActionKind.CONDITION,
          label: 'Условие',
        },
      ]), {
        tone: LogicTreeTone.GREEN,
      }),
    ],
  }),
]

const meta = {
  title: 'Components/UiLogicTree',
  component: UiLogicTree,
  args: {
    items: campaignTree,
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
    'row:add': {
      control: false,
      table: { category: 'events' },
    },
    'row:edit': {
      control: false,
      table: { category: 'events' },
    },
    'row:remove': {
      control: false,
      table: { category: 'events' },
    },
  },
  render: createRemoteStoryRender({
    provider,
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
