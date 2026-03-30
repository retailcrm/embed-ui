import type { Slot } from 'vue'
import type { TabItem } from '@/common/components/tab'
import type { VNode, VNodeArrayChildren } from 'vue'

import {
  Comment,
  Fragment,
  isVNode,
  Text,
} from 'vue'

export type TabDefinition = TabItem & {
  iconSlot?: Slot;
  labelSlot?: Slot;
  counterSlot?: Slot;
  contentSlot?: Slot;
}

const isNamedComponent = (node: VNode, name: string): boolean => {
  if (typeof node.type !== 'object' || node.type === null) {
    return false
  }

  return 'name' in node.type && node.type.name === name
}

const hasTabLikeProps = (node: VNode): boolean => {
  const props = (node.props ?? {}) as Record<string, unknown>
  const childrenRecord = node.children && !Array.isArray(node.children) && typeof node.children !== 'string'
    ? node.children as Record<string, Slot | undefined>
    : {}

  if (typeof props.id !== 'string' || !props.id.length) {
    return false
  }

  return [
    'label',
    'counter',
    'disabled',
  ].some((key) => key in props) || [
    'default',
    'icon',
    'label',
    'counter',
    'content',
  ].some((key) => key in childrenRecord)
}

const isTabVNode = (node: VNode): boolean => {
  return isNamedComponent(node, 'UiTab') || hasTabLikeProps(node)
}

const isWhitespaceText = (value: string): boolean => value.trim().length === 0

const normalizeNodes = (children: VNodeArrayChildren): VNode[] => {
  const normalized: VNode[] = []

  children.forEach((child) => {
    if (Array.isArray(child)) {
      normalized.push(...normalizeNodes(child))
      return
    }

    if (!isVNode(child)) {
      return
    }

    if (child.type === Comment) {
      return
    }

    if (child.type === Text) {
      const text = typeof child.children === 'string' ? child.children : ''

      if (!isWhitespaceText(text)) {
        normalized.push(child)
      }

      return
    }

    if (child.type === Fragment && Array.isArray(child.children)) {
      normalized.push(...normalizeNodes(child.children))
      return
    }

    normalized.push(child)
  })

  return normalized
}

const normalizeString = (value: unknown): string => {
  return typeof value === 'string' ? value : ''
}

const normalizeCounter = (value: unknown): string | number | null => {
  return typeof value === 'string' || typeof value === 'number'
    ? value
    : null
}

const normalizeBoolean = (value: unknown): boolean => value === '' || value === true

export const createTabDefinitions = (items: readonly TabItem[]): TabDefinition[] => {
  return items.map((item) => ({
    id: item.id,
    label: item.label ?? '',
    counter: item.counter ?? null,
    disabled: Boolean(item.disabled),
    iconOnly: Boolean(item.iconOnly),
  }))
}

export const collectTabs = (children: VNodeArrayChildren): TabDefinition[] => {
  return normalizeNodes(children)
    .filter(isTabVNode)
    .map((node, index) => {
      const props = (node.props ?? {}) as Record<string, unknown>
      const childrenRecord = node.children && !Array.isArray(node.children) && typeof node.children !== 'string'
        ? node.children as Record<string, Slot | undefined>
        : {}
      const label = normalizeString(props.label)
      const counter = normalizeCounter(props.counter)
      const hasIcon = Boolean(childrenRecord.icon)
      const hasLabel = Boolean(childrenRecord.label) || Boolean(label)
      const hasCounter = typeof childrenRecord.counter !== 'undefined' || counter !== null

      return {
        id: normalizeString(props.id) || String(node.key ?? `ui-v1-tab-${index}`),
        label,
        counter,
        disabled: normalizeBoolean(props.disabled),
        iconOnly: hasIcon && !hasLabel && !hasCounter,
        iconSlot: childrenRecord.icon,
        labelSlot: childrenRecord.label,
        counterSlot: childrenRecord.counter,
        contentSlot: childrenRecord.content,
      }
    })
}

export const resolveActiveId = (
  tabs: readonly TabDefinition[],
  activeId: string | null | undefined
): string | null => {
  if (!activeId) {
    return null
  }

  return tabs.some((tab) => tab.id === activeId) ? activeId : null
}
