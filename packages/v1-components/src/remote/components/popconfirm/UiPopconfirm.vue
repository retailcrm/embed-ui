<template>
    <UiPopperConnector>
        <UiPopconfirmTrigger
            :visible="visibleState"
            @click="toggle"
        >
            <!-- @slot Целевой элемент, открывающий окно подтверждения -->
            <slot name="trigger" :open="visibleState" />

            <UiPopconfirmPopper
                :id="id"
                ref="popper"
                :visible="visibleState"
                :title="title"
                :ok-variant="okVariant"
                :ok-title="okTitle"
                :cancel-title="cancelTitle"
                :cancel-appearance="cancelAppearance"
                :cancel-variant="cancelVariant"
                :button-size="buttonSize"
                :placement="placement"
                :popper-class="popperClass"
                :popper-options="popperOptions"
                :locale="locale"
                @cancel="onCancel"
                @ok="onOk"
                @update:visible="onUpdateVisible"
            >
                <template v-if="$slots['title']" #title>
                    <slot name="title" />
                </template>

                <slot />

                <template v-if="$slots['cancel-text']" #cancel-text>
                    <slot name="cancel-text" />
                </template>

                <template v-if="$slots['ok-text']" #ok-text>
                    <slot name="ok-text" />
                </template>
            </UiPopconfirmPopper>
        </UiPopconfirmTrigger>
    </UiPopperConnector>
</template>
<script lang="ts" remote setup>
import type { PropType } from 'vue'

import type {
  UiPopconfirmMethods,
  UiPopconfirmPopperOptions,
  UiPopconfirmProperties,
} from '@/common/components/popconfirm'

import { ref, useTemplateRef, watch } from 'vue'

import { UiPopperConnector } from '@/remote/components/popper'

import { APPEARANCE, SIZE, VARIANT } from '@/common/components/button'

import { UiPopconfirmPopper, UiPopconfirmTrigger } from './parts'

const props = defineProps({
  id: {
    type: String as PropType<UiPopconfirmProperties['id']>,
    default: undefined,
  },

  visible: {
    type: Boolean,
    default: false,
  },

  title: {
    type: String,
    default: '',
  },

  okVariant: {
    type: String as PropType<UiPopconfirmProperties['okVariant']>,
    default: VARIANT.DEFAULT,
  },

  okTitle: {
    type: null as unknown as PropType<UiPopconfirmProperties['okTitle']>,
    default: null,
  },

  cancelTitle: {
    type: null as unknown as PropType<UiPopconfirmProperties['cancelTitle']>,
    default: null,
  },

  cancelAppearance: {
    type: String as PropType<UiPopconfirmProperties['cancelAppearance']>,
    default: APPEARANCE.SECONDARY,
  },

  cancelVariant: {
    type: String as PropType<UiPopconfirmProperties['cancelVariant']>,
    default: VARIANT.DEFAULT,
  },

  buttonSize: {
    type: String as PropType<UiPopconfirmProperties['buttonSize']>,
    default: SIZE.XS,
  },

  placement: {
    type: [String, Object] as PropType<UiPopconfirmProperties['placement']>,
    default: 'bottom-start',
  },

  popperClass: {
    type: null as unknown as PropType<UiPopconfirmProperties['popperClass']>,
    default: null,
  },

  popperOptions: {
    type: Object as PropType<UiPopconfirmPopperOptions>,
    default: () => ({}),
  },

  locale: {
    type: String as PropType<UiPopconfirmProperties['locale']>,
    default: undefined,
  },
})

const emit = defineEmits<{
  'update:visible': [visible: boolean];
  'toggle': [visible: boolean];
  'cancel': [];
  'ok': [];
}>()

const popper = useTemplateRef<InstanceType<typeof UiPopconfirmPopper>>('popper')
const visibleState = ref(props.visible)

const setVisible = (visible: boolean) => {
  if (visibleState.value === visible) {
    return
  }

  visibleState.value = visible
  emit('update:visible', visible)
  emit('toggle', visible)
}

const open = async () => {
  setVisible(true)
}

const close = async () => {
  setVisible(false)
}

const toggle = async () => {
  if (visibleState.value) {
    await close()
  } else {
    await open()
  }
}

const onUpdateVisible = (visible: boolean) => {
  setVisible(visible)
}

const onCancel = () => {
  emit('cancel')
  void close()
}

const onOk = () => {
  emit('ok')
  void close()
}

watch(() => props.visible, visible => {
  setVisible(visible)
})

defineExpose({
  adjust: async () => {
    await popper.value?.adjust()
  },
  close,
  dispose: async () => {
    await popper.value?.dispose()
  },
  open,
  toggle,
} satisfies UiPopconfirmMethods)
</script>
