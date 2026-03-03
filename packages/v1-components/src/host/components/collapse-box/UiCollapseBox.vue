<template>
    <section
        :id="boxId"
        :aria-labelledby="boxId + '-title'"
        :class="{
            'ui-v1-collapse-box': true,
            'ui-v1-collapse-box_active': state.expanded && !disabled,
            'ui-v1-collapse-box_bordered': bordered,
            'ui-v1-collapse-box_shadows': !bordered,
            [`ui-v1-collapse-box_with-icon-${iconSize}`]: $slots.icon,
            [`ui-v1-collapse-box_color_${color}`]: Boolean(color),
            'ui-v1-collapse-box_disabled': disabled,
        }"
        v-bind="{
            ...($slots['description'] ? {
                'aria-describedby': boxId + '-description',
            } : {}),
            ...$attrs,
        }"
    >
        <header
            :class="{
                'ui-v1-collapse-box__header': true,
                'ui-v1-collapse-box__header_interactable': (expandable && (toggleable || !state.expanded)),
            }"
        >
            <button
                :id="boxId + '-button'"
                :disabled="disabled"
                :aria-controls="boxId + '-collapse'"
                :aria-expanded="state.expanded ? 'true' : 'false'"
                :aria-disabled="disabled ? 'true' : 'false'"
                class="ui-v1-collapse-box__header-button"
                type="button"
                @click="onHeadClick"
            >
                <span
                    v-if="$slots.icon"
                    :class="{
                        'ui-v1-collapse-box__icon': true,
                        [`ui-v1-collapse-box__icon_${iconSize}`]: iconSize,
                    }"
                >
                    <span class="ui-v1-collapse-box__icon-sprite">
                        <!-- @slot Иконка слева -->
                        <slot name="icon" />
                    </span>
                </span>

                <span class="ui-v1-collapse-box__header-content">
                    <span :id="boxId + '-title'" class="ui-v1-collapse-box__title">
                        <!-- @slot Заголовок -->
                        <slot name="title" />
                    </span>

                    <span
                        v-if="$slots['description']"
                        :id="boxId + '-description'"
                        class="ui-v1-collapse-box__description"
                    >
                        <!-- @slot Описание -->
                        <slot name="description" />
                    </span>
                </span>

                <span v-if="!disabled" class="ui-v1-collapse-box__action">
                    <IconChevronRight class="ui-v1-collapse-box__arrow" />
                </span>
            </button>
        </header>

        <UiCollapse
            :id="boxId + '-collapse'"
            :aria-hidden="!state.expanded ? 'true' : 'false'"
            :aria-labelledby="boxId + '-button'"
            :duration="typeof collapseDuration === 'number'
                ? collapseDuration
                : Number.parseFloat(String(collapseDuration))"
            :expanded="state.expanded && !disabled"
            :collapse-behaviour="collapseBehaviour"
            class="ui-v1-collapse-box__collapse"
            role="region"
            @expanded="onExpanded"
            @collapsed="onCollapsed"
        >
            <!-- @slot Основная разметка -->
            <slot name="body">
                <div class="ui-v1-collapse-box__body">
                    <div
                        :class="[
                            'ui-v1-collapse-box__body-content',
                            `ui-v1-collapse-box__body-content_${iconSize}`,
                        ]"
                    >
                        <!-- @slot Наличие отступов в основной разметке -->
                        <slot name="body-content" />
                    </div>
                </div>
            </slot>

            <footer v-if="$slots['footer'] || $slots['footer-content']">
                <!-- @slot Разметка подвала -->
                <slot name="footer">
                    <div
                        v-if="$slots['footer-content']"
                        class="ui-v1-collapse-box__footer"
                    >
                        <!-- @slot Наличие отступов в разметке подвала -->
                        <slot name="footer-content" />
                    </div>
                </slot>
            </footer>
        </UiCollapse>
    </section>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

import type { CollapseBoxRegistryItem } from '@/common/components/collapse-box'
import type { UiCollapseBoxMethods } from '@/common/components/collapse-box'

import {
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  reactive,
  useId,
  watch,
} from 'vue'

import UiCollapse from '@/host/components/collapse/UiCollapse.vue'

import IconChevronRight from '~assets/sprites/arrows/chevron-right.svg'

import { COLLAPSE_BEHAVIOUR } from '@/common/components/collapse'
import { COLOR, SIZE } from '@/common/components/collapse-box'

import {
  CollapseGroupCollapseKey,
  CollapseGroupExpandKey,
  CollapseGroupRegisterKey,
  CollapseGroupUnregisterKey,
} from './inject'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  /** Идентификатор бокса. Должен быть уникальным. */
  id: {
    type: String,
    default: undefined,
  },

  /** Развернутый/свернутый */
  expanded: {
    type: Boolean,
    default: false,
  },

  /** Разворачиваемый */
  expandable: {
    type: Boolean,
    default: true,
  },

  /** Сворачиваемый */
  collapsible: {
    type: Boolean,
    default: true,
  },

  /** Переключающийся */
  toggleable: {
    type: Boolean,
    default: true,
  },

  /** Поведение при сворачивании */
  collapseBehaviour: {
    type: String as unknown as PropType<COLLAPSE_BEHAVIOUR>,
    default: COLLAPSE_BEHAVIOUR.HIDE,
    validator: (value: string) => Object.values(COLLAPSE_BEHAVIOUR).includes(value as COLLAPSE_BEHAVIOUR),
  },

  /** Продолжительность анимации сворачивания/разворачивания */
  collapseDuration: {
    type: [Number, String],
    default: 0.75,
  },

  /** Заблокированный */
  disabled: {
    type: Boolean,
    default: false,
  },

  /** Цветовая схема (иконка, рамка, заголовок) */
  color: {
    type: String as unknown as PropType<COLOR>,
    default: COLOR.BLUE,
    validator: (value: string) => Object.values(COLOR).includes(value as COLOR),
  },

  /** Размер иконки */
  iconSize: {
    type: String as unknown as PropType<SIZE>,
    default: SIZE.SM,
    validator: (value: string) => Object.values(SIZE).includes(value as SIZE),
  },

  /** Рамка вместо тени */
  bordered: {
    type: Boolean,
    default: false,
  },
})

const uid = useId()
const boxId = computed((): string => props.id ?? uid)

const register = inject(CollapseGroupRegisterKey, null)
const unregister = inject(CollapseGroupUnregisterKey, null)
const expandInGroup = inject(CollapseGroupExpandKey, null)
const collapseInGroup = inject(CollapseGroupCollapseKey, null)

const state = reactive({
  expanded: props.expanded,
})

const emit = defineEmits([
  'collapsed',
  'collapse-cancel',
  'expanded',
  'expand-cancel',
  'toggle',
  'update:expanded',
])

watch(() => props.expanded, (value) => {
  if (value) {
    expand()
  } else {
    collapse()
  }
})

const isExpanded = (): boolean => state.expanded

const toggleInternal = (expanded: boolean | undefined = undefined): boolean => {
  state.expanded = expanded === undefined ? !isExpanded() : expanded
  return state.expanded
}

const toggleInternalAndEmit = (expanded: boolean | undefined = undefined) => {
  const value = toggleInternal(expanded)
  emit('update:expanded', value)
  emit('toggle', value)
}

const canNotBeExpanded = (): boolean => !isExpanded() && !props.expandable
const canNotBeCollapsed = (): boolean => isExpanded() && !props.collapsible

onMounted(() => {
  if (register) {
    register(boxId.value, {
      isExpanded,
      toggleInternal,
      toggleInternalAndEmit,
      canNotBeExpanded,
      canNotBeCollapsed,
    } satisfies CollapseBoxRegistryItem)
  }
})

onBeforeUnmount(() => {
  unregister?.(boxId.value)
})

const expand = (): void => {
  if (props.disabled) {
    return
  }

  if (!props.expandable) {
    emit('expand-cancel')
    return
  }

  if (expandInGroup) {
    expandInGroup(boxId.value, undefined)
    return
  }

  toggleInternalAndEmit(true)
}

const collapse = (): void => {
  if (props.disabled) {
    return
  }

  if (!props.collapsible) {
    emit('collapse-cancel')
    return
  }

  if (collapseInGroup) {
    collapseInGroup(boxId.value)
    return
  }

  toggleInternalAndEmit(false)
}

const toggle = (expanded: boolean | undefined = undefined) => {
  const value = expanded === undefined ? !isExpanded() : expanded

  if (value) {
    expand()
  } else {
    collapse()
  }
}

const onHeadClick = () => {
  if (props.disabled) return

  if (!isExpanded()) {
    if (!props.expandable) {
      return
    }

    expand()
    return
  }

  if (props.toggleable) {
    collapse()
  }
}

const onExpanded = () => {
  emit('expanded')
}

const onCollapsed = () => {
  emit('collapsed')
}

defineExpose({
  isExpanded,
  expand,
  collapse,
  toggle,
  canNotBeExpanded,
  canNotBeCollapsed,
} satisfies UiCollapseBoxMethods)
</script>

<style lang="less" src="./collapse-box.less" />
