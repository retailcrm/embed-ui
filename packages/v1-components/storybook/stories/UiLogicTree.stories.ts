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
  config: Omit<UiLogicTreeRowData, 'title' | 'view'> = {}
): UiLogicTreeRowData => ({
  title,
  view: LogicTreeRowView.SUMMARY,
  ...config,
})

const editorRow = (
  title: string,
  controls: NonNullable<UiLogicTreeRowData['controls']>,
  config: Omit<UiLogicTreeRowData, 'controls' | 'title' | 'view'> = {}
): UiLogicTreeRowData => ({
  controls,
  title,
  view: LogicTreeRowView.EDITOR,
  ...config,
})

const actionsRow = (
  title: string,
  actions: NonNullable<UiLogicTreeRowData['actions']>,
  config: Omit<UiLogicTreeRowData, 'actions' | 'title' | 'view'> = {}
): UiLogicTreeRowData => ({
  actions,
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

const rowsTree: UiLogicTreeNode[] = [
  groupNode('rows-root', summaryRow('Корневая группа', {
    icon: LogicTreeIcon.FOLDER,
    inline: [
      inlineText('rows-root-mode', 'Последовательное применение', { tone: LogicTreeTone.GREEN }),
      inlineText('rows-root-meta', 'До 5 000 ₽ скидки', { separated: true, tone: 'muted' }),
    ],
    surface: true,
  }), {
    tone: LogicTreeTone.GREEN,
    children: [
      branchNode('rows-count', summaryRow('5 акций', { surface: true }), {
        collapsible: true,
        expanded: true,
        children: [
          conditionNode('rows-campaign-1', summaryRow('1. Название акции #1', {
            draggable: true,
            inline: [
              inlineText('rows-campaign-1-meta', 'Бонусы', { tone: 'muted' }),
            ],
            removable: true,
            surface: true,
          })),
          conditionNode('rows-actions', actionsRow('Добавить в ветку', [
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
          ], { surface: true }), {
            tone: LogicTreeTone.BLUE,
          }),
          conditionNode('rows-delivery-condition', editorRow('Тип доставки', [
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
          ], {
            removable: true,
            surface: true,
          }), {
            conjunction: LogicTreeConjunction.AND,
            tone: LogicTreeTone.BLUE,
          }),
          conditionNode('rows-order-condition', editorRow('Заказ клиента', [
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
          ], {
            removable: true,
            surface: true,
          }), {
            tone: LogicTreeTone.BLUE,
          }),
        ],
      }),
    ],
  }),
]

const connectorsTree: UiLogicTreeNode[] = [
  groupNode('connectors-root', summaryRow('Корневая группа', {
    icon: LogicTreeIcon.FOLDER,
    inline: [
      inlineText('connectors-root-mode', 'Последовательное применение', { tone: LogicTreeTone.GREEN }),
      inlineText('connectors-root-meta', 'До 5 000 ₽ скидки', { separated: true, tone: 'muted' }),
    ],
    surface: false,
  }), {
    tone: LogicTreeTone.GREEN,
    children: [
      branchNode('connectors-count', summaryRow('8 акций', { surface: false }), {
        children: [
          groupNode('connectors-group-1', summaryRow('Название группы #1', {
            icon: LogicTreeIcon.FOLDER,
            inline: [
              inlineText('connectors-group-1-mode', 'Максимальная выгода', { tone: LogicTreeTone.BLUE }),
            ],
            surface: false,
          }), {
            tone: LogicTreeTone.BLUE,
            children: [
              branchNode('connectors-inner-count', summaryRow('10 акций', { surface: false }), {
                tone: LogicTreeTone.BLUE,
                children: [
                  groupNode('connectors-group-2', summaryRow('Название группы #2', {
                    icon: LogicTreeIcon.FOLDER,
                    inline: [
                      inlineText('connectors-group-2-mode', 'Последовательное применение', { tone: LogicTreeTone.GREEN }),
                      inlineText('connectors-group-2-meta', 'До 5 000 оплата бонусами', {
                        separated: true,
                        tone: 'muted',
                      }),
                    ],
                    surface: false,
                  }), {
                    tone: LogicTreeTone.GREEN,
                    children: [
                      branchNode('connectors-group-2-count', summaryRow('12 акций', { surface: false }), {
                        tone: LogicTreeTone.GREEN,
                        children: [
                          conditionNode('connectors-group-action-row', actionsRow('Добавить группу', [
                            {
                              id: 'connectors-group-action',
                              kind: LogicTreeActionKind.GROUP,
                              label: 'Группа',
                            },
                          ], { surface: false }), {
                            tone: LogicTreeTone.GREEN,
                          }),
                        ],
                      }),
                    ],
                  }),
                  groupNode('connectors-group-3', summaryRow('Название группы #3', {
                    icon: LogicTreeIcon.FOLDER,
                    inline: [
                      inlineText('connectors-group-3-mode', 'Несовместимость', { tone: LogicTreeTone.RED }),
                    ],
                    surface: false,
                  }), {
                    tone: LogicTreeTone.RED,
                    children: [
                      branchNode('connectors-conflict-count', summaryRow('5 акций', { surface: false }), {
                        tone: LogicTreeTone.RED,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  }),
]

const interactionTree: UiLogicTreeNode[] = [
  groupNode('interaction-root', summaryRow('Взаимодействие', {
    icon: LogicTreeIcon.FOLDER,
    surface: true,
  }), {
    tone: LogicTreeTone.BLUE,
    children: [
      conditionNode('interaction-hover', summaryRow('Способ оформления', {
        highlighted: true,
        inline: [
          inlineText('interaction-hover-meta', 'Равно Мессенджер'),
        ],
        removable: true,
        surface: true,
      })),
      conditionNode('interaction-selected', summaryRow('Способ оформления', {
        inline: [
          inlineText('interaction-selected-meta', 'Равно Мессенджер'),
        ],
        removable: true,
        selected: true,
        surface: true,
      })),
      conditionNode('interaction-edit-on-click', summaryRow('Тип доставки', {
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
        inline: [
          inlineText('interaction-edit-on-click-meta', 'Равно SDEK'),
        ],
        removable: true,
        surface: true,
      })),
      groupNode('interaction-drag-list', summaryRow('Список действий', {
        icon: LogicTreeIcon.FOLDER,
        draggable: true,
        surface: true,
      }), {
        children: [
          branchNode('interaction-drag-group', summaryRow('Группа акций', {
            inline: [
              inlineText('interaction-drag-group-meta', '3 строки', { tone: 'muted' }),
            ],
            surface: true,
          }), {
            childrenView: LogicTreeChildrenView.GROUPED,
            collapsible: true,
            expanded: true,
            children: [
              conditionNode('interaction-drag-1', summaryRow('1. Название акции #1', {
                draggable: true,
                inline: [
                  inlineText('interaction-drag-1-meta', 'Бонусы', { tone: 'muted' }),
                ],
                removable: true,
                surface: true,
              })),
              conditionNode('interaction-drag-2', summaryRow('2. Название акции #2', {
                draggable: true,
                highlighted: true,
                inline: [
                  inlineText('interaction-drag-2-meta', 'Бонусы', { tone: 'muted' }),
                ],
                removable: true,
                surface: true,
              })),
              conditionNode('interaction-drag-3', summaryRow('3. Название акции #3', {
                draggable: true,
                inline: [
                  inlineText('interaction-drag-3-meta', 'Бонусы', { tone: 'muted' }),
                ],
                removable: true,
                surface: true,
              })),
            ],
          }),
          conditionNode('interaction-editor', editorRow('Тип доставки', [
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
          ], {
            removable: true,
            surface: true,
          })),
        ],
      }),
    ],
  }),
]

const relationsDebugTree: UiLogicTreeNode[] = [
  groupNode('relations-debug-root', summaryRow('Отладка связей', {
    icon: LogicTreeIcon.FOLDER,
    surface: false,
  }), {
    tone: LogicTreeTone.BLUE,
    children: [
      conditionNode('relations-debug-rule-1', summaryRow('Способ оформления', {
        inline: [
          inlineText('relations-debug-rule-1-meta', 'Равно Сайт'),
        ],
        surface: false,
      }), {
        tone: LogicTreeTone.BLUE,
      }),
      conditionNode('relations-debug-rule-2', summaryRow('Телефон', {
        inline: [
          inlineText('relations-debug-rule-2-meta', 'Есть'),
        ],
        surface: false,
      }), {
        conjunction: LogicTreeConjunction.OR,
        tone: LogicTreeTone.BLUE,
      }),
      conditionNode('relations-debug-rule-3', summaryRow('Источник', {
        inline: [
          inlineText('relations-debug-rule-3-meta', 'Равно retailcrm'),
        ],
        surface: false,
      }), {
        conjunction: LogicTreeConjunction.AND,
        tone: LogicTreeTone.BLUE,
      }),
    ],
  }),
]

const segmentsTree: UiLogicTreeNode[] = [
  groupNode('segments-root', summaryRow('Сегменты и редактирование', {
    icon: LogicTreeIcon.FOLDER,
    surface: false,
  }), {
    tone: LogicTreeTone.GREY,
    children: [
      groupNode('segments-clients', summaryRow('Клиенты', {
        icon: LogicTreeIcon.FOLDER,
        inline: [
          inlineText('segments-clients-meta', 'Есть такие'),
        ],
        surface: false,
      }), {
        tone: LogicTreeTone.GREY,
        children: [
          groupNode('segments-order', summaryRow('Заказ клиента', {
            icon: LogicTreeIcon.FOLDER,
            inline: [
              inlineText('segments-order-meta', 'Есть такие'),
            ],
            surface: false,
          }), {
            tone: LogicTreeTone.GREY,
            children: [
              conditionNode('segments-format-summary', summaryRow('Способ оформления', {
                inline: [
                  inlineText('segments-format-summary-meta', 'Равно Мессенджер'),
                ],
                surface: false,
              }), {
                conjunction: LogicTreeConjunction.AND,
                tone: LogicTreeTone.BLUE,
              }),
              conditionNode('segments-phone-actions', actionsRow('Добавить в группу', [
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
              ], {
                surface: false,
              }), {
                tone: LogicTreeTone.BLUE,
              }),
              conditionNode('segments-format-editor', editorRow('Способ оформления', [
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
              ], {
                removable: true,
                surface: true,
              }), {
                conjunction: LogicTreeConjunction.OR,
                tone: LogicTreeTone.BLUE,
              }),
              conditionNode('segments-root-actions', actionsRow('Добавить в сегмент', [
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
              ], {
                surface: false,
              }), {
                tone: LogicTreeTone.BLUE,
              }),
            ],
          }),
        ],
      }),
    ],
  }),
]

const campaignTree: UiLogicTreeNode[] = [
  groupNode('campaign-root', summaryRow('Корневая группа', {
    icon: LogicTreeIcon.FOLDER,
    inline: [
      inlineText('campaign-root-mode', 'Последовательное применение', { tone: LogicTreeTone.GREEN }),
      inlineText('campaign-root-meta', 'До 5 000 ₽ скидки', { separated: true, tone: 'muted' }),
    ],
    surface: false,
  }), {
    tone: LogicTreeTone.GREEN,
    children: [
      groupNode('campaign-count', summaryRow('8 акций', { surface: false, removable: true }), {
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
            surface: true,
          })),
          conditionNode('campaign-count-item-2', summaryRow('2. Название акции #2', {
            draggable: true,
            inline: [
              inlineText('campaign-count-item-2-meta', 'Бонусы', { tone: 'muted' }),
            ],
            removable: true,
            surface: true,
          })),
          conditionNode('campaign-count-item-3', summaryRow('3. Название акции #3', {
            draggable: true,
            inline: [
              inlineText('campaign-count-item-3-meta', 'Бонусы', { tone: 'muted' }),
            ],
            removable: true,
            surface: true,
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
          ], {
            surface: false,
          }), {
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
        surface: false,
      }), {
        tone: LogicTreeTone.BLUE,
        children: [
          branchNode('campaign-group-1-count', summaryRow('10 акций', { surface: false }), {
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
              ], {
                surface: false,
              })),
            ],
          }),

          groupNode('campaign-group-2', summaryRow('Название группы #2', {
            icon: LogicTreeIcon.FOLDER,
            inline: [
              inlineText('campaign-group-2-mode', 'Последовательное применение', { tone: LogicTreeTone.GREEN }),
              inlineText('campaign-group-2-meta', 'До 5 000 ₽ оплата бонусами', { separated: true, tone: 'muted' }),
            ],
            removable: true,
            surface: false,
          }), {
            tone: LogicTreeTone.GREEN,
            children: [
              branchNode('campaign-group-2-count', summaryRow('12 акций', { surface: false }), {
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
                  ], {
                    surface: false,
                  })),
                ],
              }),

              conditionNode('campaign-group-2-footer-action', actionsRow('Добавить группу', [
                {
                  id: 'campaign-group-2-add-group',
                  kind: LogicTreeActionKind.GROUP,
                  label: 'Группа',
                },
              ], {
                surface: false,
              }), {
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
            surface: false,
          }), {
            tone: LogicTreeTone.RED,
            children: [
              branchNode('campaign-group-3-count', summaryRow('5 акций', { surface: false }), {
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
                    surface: true,
                  })),

                  conditionNode('campaign-group-3-item-2', summaryRow('2. Название акции #2', {
                    draggable: true,
                    inline: [
                      inlineText('campaign-group-3-item-2-meta', 'Бонусы', { tone: 'muted' }),
                    ],
                    removable: true,
                    surface: true,
                  })),

                  conditionNode('campaign-group-3-item-3', summaryRow('3. Название акции #3', {
                    draggable: true,
                    inline: [
                      inlineText('campaign-group-3-item-3-meta', 'Бонусы', { tone: 'muted' }),
                    ],
                    removable: true,
                    surface: true,
                  })),

                  conditionNode('campaign-group-3-actions', actionsRow('Добавить акцию', [
                    {
                      id: 'campaign-group-3-add-action',
                      kind: LogicTreeActionKind.CONDITION,
                      label: 'Добавить акцию в группу',
                    },
                  ], {
                    surface: false,
                  })),
                ],
              }),

              conditionNode('campaign-group-3-footer-action', actionsRow('Добавить группу', [
                {
                  id: 'campaign-group-3-add-group',
                  kind: LogicTreeActionKind.GROUP,
                  label: 'Группа',
                },
              ], {
                surface: false,
              }), {
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
          ], {
            surface: false,
          }), {
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
      ], {
        surface: false,
      }), {
        tone: LogicTreeTone.GREEN,
      }),
    ],
  }),
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
      description: 'Набор корневых узлов дерева. Структура дерева живёт на уровне узла, а данные и режим отображения строки находятся в объекте row.',
      table: {
        type: {
          summary: 'UiLogicTreeNode[]',
          detail: `type UiLogicTreeNode = {
  id: string
  kind: 'group' | 'branch' | 'condition'
  tone?: 'blue' | 'green' | 'grey' | 'red' | 'yellow'
  conjunction?: 'and' | 'or' | string
  collapsible?: boolean
  expanded?: boolean
  childrenView?: 'plain' | 'grouped'
  children?: UiLogicTreeNode[]
  row: {
    view: 'summary' | 'editor' | 'actions'
    title: string
    inline?: UiLogicTreeInlineText[]
    controls?: UiLogicTreeControl[]
    actions?: UiLogicTreeAction[]
    draggable?: boolean
    removable?: boolean
    highlighted?: boolean
    selected?: boolean
    surface?: boolean
  }
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
