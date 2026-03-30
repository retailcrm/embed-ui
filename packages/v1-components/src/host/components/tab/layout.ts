import type { TabItem, TabLayout } from '@/common/components/tab'

import { APPEARANCE, SIZE } from '@/common/components/tab'

const HEAD_GAP = {
  [SIZE.SM]: 20,
  [SIZE.MD]: 24,
  [SIZE.LG]: 24,
} as const

const FILLED_TRIGGER_GAP = {
  [SIZE.SM]: 10,
  [SIZE.MD]: 12,
  [SIZE.LG]: 32,
} as const

const MENU_TRIGGER_WIDTH = 36

const widthOf = (id: string, widths: ReadonlyMap<string, number>): number => {
  return Math.max(0, Math.ceil(widths.get(id) ?? 0))
}

const sumWidths = (
  ids: string[],
  widths: ReadonlyMap<string, number>,
  gap: number
): number => ids.reduce((total, id, index) => {
  return total + widthOf(id, widths) + (index > 0 ? gap : 0)
}, 0)

const moveActiveToHead = (
  ids: string[],
  headIds: string[],
  widths: ReadonlyMap<string, number>,
  limit: number,
  gap: number,
  activeId: string
): string[] => {
  if (headIds.includes(activeId)) {
    return headIds
  }

  const next = [...headIds, activeId].sort((a, b) => ids.indexOf(a) - ids.indexOf(b))

  while (next.length > 1 && sumWidths(next, widths, gap) > limit) {
    const removable = [...next].reverse().find((id) => id !== activeId)

    if (!removable) {
      break
    }

    next.splice(next.indexOf(removable), 1)
  }

  return next
}

export const resolveTabLayout = (options: {
  items: readonly TabItem[];
  widths: ReadonlyMap<string, number>;
  availableWidth: number;
  size: SIZE | `${SIZE}`;
  appearance: APPEARANCE | `${APPEARANCE}`;
  overflowing: boolean;
  activeId: string | null;
}): TabLayout => {
  const ids = options.items.map((item) => item.id)

  if (!ids.length) {
    return {
      headIds: [],
      menuIds: [],
    }
  }

  if (!options.overflowing || options.availableWidth <= 0) {
    return {
      headIds: ids,
      menuIds: [],
    }
  }

  if (ids.some((id) => widthOf(id, options.widths) === 0)) {
    return {
      headIds: ids,
      menuIds: [],
    }
  }

  const size = options.size as SIZE
  const appearance = options.appearance as APPEARANCE
  const gap = appearance === APPEARANCE.FILLED
    ? 0
    : (HEAD_GAP[size] ?? HEAD_GAP[SIZE.MD])
  const totalWidth = sumWidths(ids, options.widths, gap)

  if (totalWidth <= options.availableWidth) {
    return {
      headIds: ids,
      menuIds: [],
    }
  }

  const triggerGap = appearance === APPEARANCE.FILLED
    ? (FILLED_TRIGGER_GAP[size] ?? FILLED_TRIGGER_GAP[SIZE.MD])
    : gap
  const limit = Math.max(options.availableWidth - MENU_TRIGGER_WIDTH - triggerGap, 0)
  const headIds: string[] = []
  let occupied = 0

  options.items.forEach((item) => {
    const nextWidth = occupied + widthOf(item.id, options.widths) + (headIds.length > 0 ? gap : 0)

    if (nextWidth <= limit || headIds.length === 0) {
      headIds.push(item.id)
      occupied = nextWidth
    }
  })

  const resolvedHeadIds = options.activeId
    ? moveActiveToHead(ids, headIds, options.widths, limit, gap, options.activeId)
    : headIds
  const headSet = new Set(resolvedHeadIds)

  return {
    headIds: ids.filter((id) => headSet.has(id)),
    menuIds: ids.filter((id) => !headSet.has(id)),
  }
}
