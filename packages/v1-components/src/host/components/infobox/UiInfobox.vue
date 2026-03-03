<template>
    <UiTransition
        name="fade"
        @after-enter="onAfterEnter"
        @after-leave="onAfterLeave"
        @before-enter="onBeforeEnter"
        @before-leave="onBeforeLeave"
    >
        <div
            v-show="state.shouldBeShown"
            :id="boxId"
            :aria-expanded="state.expanded ? 'true' : 'false'"
            :aria-hidden="state.shown ? 'false' : 'true'"
            :aria-live="'polite'"
            :class="{
                'ui-v1-infobox': true,
                'ui-v1-infobox_closable': closable,
                'ui-v1-infobox_warning': warning,
            }"
            role="alert"
            v-bind="rootAttrs"
        >
            <div
                aria-hidden="true"
                class="ui-v1-infobox__media"
            >
                <div class="ui-v1-infobox__icon">
                    <slot
                        name="icon"
                        :expanded="state.shouldBeExpanded"
                    >
                        <IconInfoOutlined />
                    </slot>
                </div>
            </div>

            <div class="ui-v1-infobox__content">
                <div
                    v-if="hasHeader"
                    class="ui-v1-infobox__header"
                >
                    <div
                        v-if="hasTitle"
                        :id="titleId"
                        class="ui-v1-infobox__title"
                    >
                        <slot
                            name="title"
                            :expanded="state.shouldBeExpanded"
                        >
                            {{ title }}
                        </slot>
                    </div>

                    <button
                        v-if="expandable"
                        :aria-controls="bodyId"
                        :aria-expanded="state.shouldBeExpanded ? 'true' : 'false'"
                        class="ui-v1-infobox__toggle"
                        type="button"
                        @click="toggle"
                    >
                        <slot
                            name="toggle"
                            :expanded="state.shouldBeExpanded"
                        >
                            {{ toggleLabel }}
                        </slot>

                        <IconChevronUp
                            v-if="state.shouldBeExpanded"
                            aria-hidden="true"
                            class="ui-v1-infobox__caret"
                        />

                        <IconChevronDown
                            v-else
                            aria-hidden="true"
                            class="ui-v1-infobox__caret"
                        />
                    </button>
                </div>

                <UiCollapse
                    :id="bodyId"
                    :aria-labelledby="hasTitle ? titleId : undefined"
                    :expanded="bodyExpanded"
                    class="ui-v1-infobox__body"
                    role="region"
                    @collapsed="onCollapsed"
                    @collapsing="onCollapsing"
                    @expanded="onExpanded"
                    @expanding="onExpanding"
                >
                    <slot :expanded="state.shouldBeExpanded" />
                </UiCollapse>
            </div>

            <button
                v-if="closable"
                aria-label="Close infobox"
                class="ui-v1-infobox__closer"
                type="button"
                @click="hide"
            >
                <IconClear class="ui-v1-infobox__closer-icon" />
            </button>
        </div>
    </UiTransition>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { UiInfoboxMethods } from '@/common/components/infobox'

import {
  computed,
  reactive,
  useAttrs,
  useId,
  useSlots,
  watch,
} from 'vue'

import UiCollapse from '@/host/components/collapse/UiCollapse.vue'
import UiTransition from '@/host/components/transition/UiTransition.vue'

import IconChevronDown from '~assets/sprites/arrows/chevron-down.svg'
import IconChevronUp from '~assets/sprites/arrows/chevron-up.svg'
import IconClear from '~assets/sprites/actions/clear.svg'
import IconInfoOutlined from '~assets/sprites/actions/info-outlined.svg'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  id: {
    type: null as unknown as PropType<string | undefined>,
    validator: (id: unknown) => id === undefined || typeof id === 'string' && id.length > 0 && /^[A-Za-z]/.test(id),
    default: undefined,
  },

  title: {
    type: String,
    default: '',
  },

  shown: {
    type: Boolean,
    default: true,
  },

  expanded: {
    type: Boolean,
    default: false,
  },

  expandable: {
    type: Boolean,
    default: false,
  },

  closable: {
    type: Boolean,
    default: false,
  },

  warning: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([
  'show',
  'hide',
  'update:shown',
  'update:expanded',
])

const uid = useId()
const attrs = useAttrs()
const slots = useSlots()

const boxId = computed(() => props.id ?? uid)
const titleId = computed(() => `${boxId.value}-title`)
const bodyId = computed(() => `${boxId.value}-body`)

const state = reactive({
  expanded: !props.expandable || props.expanded,
  shown: props.shown,
  shouldBeExpanded: !props.expandable || props.expanded,
  shouldBeShown: props.shown,
})

const hasTitle = computed(() => props.title.length > 0 || 'title' in slots)
const hasHeader = computed(() => hasTitle.value || props.expandable)
const bodyExpanded = computed(() => !props.expandable || state.shouldBeExpanded)
const toggleLabel = computed(() => state.shouldBeExpanded ? 'Collapse' : 'Expand')

const rootAttrs = computed(() => {
  if (
    'aria-label' in attrs
    || 'aria-labelledby' in attrs
    || !hasTitle.value
  ) {
    return attrs
  }

  return {
    ...attrs,
    'aria-labelledby': titleId.value,
  }
})

const syncExpandedFromProps = () => {
  const next = !props.expandable || props.expanded
  state.shouldBeExpanded = next
  state.expanded = next
}

const show = () => {
  if (state.shouldBeShown) {
    return
  }

  state.shouldBeShown = true
  emit('update:shown', true)
  emit('show')
}

const hide = () => {
  if (!state.shouldBeShown) {
    return
  }

  state.shouldBeShown = false
  emit('update:shown', false)
  emit('hide')
}

const toggle = () => {
  if (!props.expandable) {
    return
  }

  state.shouldBeExpanded = !state.shouldBeExpanded
  emit('update:expanded', state.shouldBeExpanded)
}

defineExpose({
  show,
  hide,
  toggle,
} satisfies UiInfoboxMethods)

const onBeforeEnter = () => {
  state.shown = false
}

const onAfterEnter = () => {
  state.shown = true
}

const onBeforeLeave = () => {
  state.shown = false
}

const onAfterLeave = () => {
  state.shown = false
}

const onExpanding = () => {
  state.expanded = false
}

const onExpanded = () => {
  state.expanded = true
}

const onCollapsing = () => {
  state.expanded = false
}

const onCollapsed = () => {
  state.expanded = false
}

watch(() => props.shown, (shown) => {
  state.shouldBeShown = shown
})

watch(() => props.expanded, () => {
  syncExpandedFromProps()
})

watch(() => props.expandable, () => {
  syncExpandedFromProps()
})
</script>

<style lang="less" src="./infobox.less" />
