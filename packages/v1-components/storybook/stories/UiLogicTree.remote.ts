import type {
  UiLogicTreeControl,
  UiLogicTreeInlineText,
  UiLogicTreeRowSlotProps,
} from '@/common/components/logic-tree'

import { h } from 'vue'
import { RemoteDragHandle } from '@omnicajs/vue-remote/remote'

import IconAdd from '~assets/sprites/actions/add.svg'
import IconAddSquareOutlined from '~assets/sprites/actions/add-square-outlined.svg'
import IconCaretDown from '~assets/sprites/arrows/caret-down.svg'
import IconDeleteOutlined from '~assets/sprites/ui/delete-outlined.svg'
import IconDrag from '~assets/sprites/actions/drag.svg'
import IconFolderOutlined from '~assets/sprites/files/folder-outlined.svg'
import IconMoreHorizontal from '~assets/sprites/ui/more-horizontal.svg'

import {
  LogicTreeControlKind,
  LogicTreeIcon,
  LogicTreeRowView,
} from '@/common/components/logic-tree'

import { UiButton } from '../../src/remote/components/button'
import { UiLogicTree } from '../../src/remote/components/logic-tree'
import { UiPopperConnector } from '../../src/remote/components/popper'
import { UiSelect, UiSelectOption } from '../../src/remote/components/select'
import { UiTextbox } from '../../src/remote/components/textbox'
import { UiTooltip } from '../../src/remote/components/tooltip'

import { createComponentEndpoint } from '../endpoint'

type UiLogicTreeProps = InstanceType<typeof UiLogicTree>['$props']

const DELETE_TEXT = 'Удалить'

const resolveControlValue = (control: UiLogicTreeControl): string | number | null => (
  control.value ?? null
)

const resolveWidth = (width?: number | string) => {
  if (width === undefined) {
    return undefined
  }

  return {
    width: typeof width === 'number' ? `${width}px` : width,
  }
}

const resolveOptions = (control: UiLogicTreeControl) => {
  if (control.options?.length) {
    return control.options
  }

  const value = resolveControlValue(control)

  if (value === null || value === undefined) {
    return []
  }

  return [{
    id: `${control.id}-option`,
    label: String(value),
    value,
  }]
}

const resolveIcon = (icon?: LogicTreeIcon) => {
  if (icon === LogicTreeIcon.FOLDER) {
    return IconFolderOutlined
  }

  if (icon === LogicTreeIcon.MORE) {
    return IconMoreHorizontal
  }

  return IconAddSquareOutlined
}

const renderInlineItem = (item: UiLogicTreeInlineText) => h('span', {
  class: {
    'ui-v1-logic-tree__inline': true,
    'ui-v1-logic-tree__inline_muted': item.tone === 'muted',
    'ui-v1-logic-tree__inline_separated': item.separated,
    'ui-v1-logic-tree__inline_semibold': item.weight === 'semibold',
    [`ui-v1-logic-tree__inline_${item.tone}`]: Boolean(item.tone) && item.tone !== 'default' && item.tone !== 'muted',
  },
  key: item.id,
}, item.text)

const renderPrefix = (slotProps: UiLogicTreeRowSlotProps) => {
  if (
    slotProps.grouped
    && slotProps.node.row.draggable
    && slotProps.rowView !== LogicTreeRowView.ACTIONS
  ) {
    return h(RemoteDragHandle, {
      as: 'span',
      class: 'ui-v1-logic-tree__handle',
      'data-skip-row-click': 'true',
      for: slotProps.node.id,
    }, () => h(IconDrag, { 'aria-hidden': 'true' }))
  }

  if (slotProps.node.row.icon && !slotProps.editing) {
    return h('span', {
      class: 'ui-v1-logic-tree__folder',
    }, [
      h(resolveIcon(slotProps.node.row.icon), { 'aria-hidden': 'true' }),
    ])
  }

  return null
}

const renderSummary = (slotProps: UiLogicTreeRowSlotProps) => h('div', {
  class: 'ui-v1-logic-tree__content',
}, [
  h('span', {
    class: 'ui-v1-logic-tree__headline',
  }, [
    h('span', {
      class: 'ui-v1-logic-tree__title',
    }, slotProps.node.row.title),
    slotProps.node.collapsible && slotProps.hasChildren
      ? h(UiButton, {
        appearance: 'tertiary',
        size: 'xs',
        onClick: slotProps.onToggle,
      }, () => h(IconCaretDown, {
        'aria-hidden': 'true',
        class: {
          'ui-v1-logic-tree__toggle-icon': true,
          'ui-v1-logic-tree__toggle-icon_collapsed': !slotProps.expanded,
        },
      }))
      : null,
  ]),
  ...(slotProps.node.row.inline ?? []).map(renderInlineItem),
])

const renderEdit = (slotProps: UiLogicTreeRowSlotProps) => h('div', {
  class: 'ui-v1-logic-tree__controls',
}, (slotProps.node.row.controls ?? []).map((control) => {
  if (control.kind === LogicTreeControlKind.SELECT) {
    return h(UiSelect, {
      key: control.id,
      class: [
        'ui-v1-logic-tree__control',
        'ui-v1-logic-tree__control_select',
      ],
      clearable: control.clearable,
      disabled: control.disabled,
      invalid: control.invalid,
      placeholder: control.placeholder ?? control.label,
      popperFitTrigger: true,
      readonly: control.readonly,
      style: resolveWidth(control.width),
      value: resolveControlValue(control),
      'onUpdate:value': (value: string | number | null) => {
        slotProps.onControlUpdate(control.id, value ?? '')
      },
    }, () => resolveOptions(control).map((option) => h(UiSelectOption, {
      key: option.id,
      label: option.label,
      value: option.value,
    })))
  }

  if (control.kind === LogicTreeControlKind.INPUT) {
    return h(UiTextbox, {
      key: control.id,
      class: [
        'ui-v1-logic-tree__control',
        'ui-v1-logic-tree__control_input',
      ],
      disabled: control.disabled,
      invalid: control.invalid,
      placeholder: control.placeholder ?? control.label,
      readonly: control.readonly,
      style: resolveWidth(control.width),
      value: resolveControlValue(control),
      'onUpdate:value': (value: string | number | null) => {
        slotProps.onControlUpdate(control.id, value ?? '')
      },
    })
  }

  return h(UiButton, {
    key: control.id,
    appearance: 'tertiary',
    class: [
      'ui-v1-logic-tree__control',
      'ui-v1-logic-tree__control_icon',
    ],
    size: 'xs',
    onClick: () => {
      slotProps.onControlAction(control.id)
    },
  }, () => h(resolveIcon(control.icon), {
    'aria-hidden': 'true',
    class: 'ui-v1-logic-tree__control-icon',
  }))
}))

const renderActions = (slotProps: UiLogicTreeRowSlotProps) => (
  slotProps.node.row.actions ?? []
).map((action) => h(UiButton, {
  key: action.id,
  appearance: 'tertiary',
  class: 'ui-v1-logic-tree__action-button',
  size: 'sm',
  onClick: () => {
    slotProps.onAction(action)
  },
}, () => [
  h(IconAdd, { 'aria-hidden': 'true' }),
  action.label,
]))

const renderTrailing = (slotProps: UiLogicTreeRowSlotProps) => {
  if (!slotProps.node.row.removable) {
    return null
  }

  return h(UiPopperConnector, () => [
    h(UiButton, {
      'aria-label': DELETE_TEXT,
      appearance: 'tertiary',
      class: 'ui-v1-logic-tree__delete',
      size: slotProps.editing ? 'sm' : 'xs',
      variant: 'danger',
      onClick: slotProps.onRemove,
    }, () => h(IconDeleteOutlined, { 'aria-hidden': 'true' })),
    h(UiTooltip, {
      targetTriggers: {
        show: ['hover', 'focus'],
        hide: ['hover', 'focus', 'click'],
      },
    }, () => DELETE_TEXT),
  ])
}

createComponentEndpoint<UiLogicTreeProps>({
  async run (createApp, root, props) {
    const app = createApp({
      setup () {
        return () => h(UiLogicTree, props, {
          'row-actions': (slotProps: UiLogicTreeRowSlotProps) => renderActions(slotProps),
          'row-edit': (slotProps: UiLogicTreeRowSlotProps) => renderEdit(slotProps),
          'row-prefix': (slotProps: UiLogicTreeRowSlotProps) => renderPrefix(slotProps),
          'row-summary': (slotProps: UiLogicTreeRowSlotProps) => renderSummary(slotProps),
          'row-trailing': (slotProps: UiLogicTreeRowSlotProps) => renderTrailing(slotProps),
        })
      },
    })

    app.mount(root)

    return () => app.unmount()
  },
}, self as unknown as Worker)
