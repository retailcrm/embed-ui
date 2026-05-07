<template>
    <UiPopperConnector>
        <UiPopconfirmTrigger v-slot="{ open }" :visible="visible" @click="visible = !visible">
            <UiButton :active="open" variant="danger">
                Удалить
            </UiButton>
        </UiPopconfirmTrigger>

        <UiPopconfirmPopper
            :visible="visible"
            ok-variant="danger"
            title="Удалить правило?"
            @update:visible="visible = $event"
            @ok="onOk"
            @cancel="onCancel"
        >
            Действие нельзя отменить. Правило перестанет применяться сразу после удаления.
        </UiPopconfirmPopper>
    </UiPopperConnector>

    <div class="mt-3">
        {{ removed ? 'Правило удалено' : 'Правило активно' }}
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import UiButton from '@/host/components/button/UiButton.vue'
import UiPopconfirmPopper from '@/host/components/popconfirm/UiPopconfirmPopper.vue'
import UiPopconfirmTrigger from '@/host/components/popconfirm/UiPopconfirmTrigger.vue'
import UiPopperConnector from '@/host/components/popper/UiPopperConnector.vue'

const removed = ref(false)
const visible = ref(false)

const onOk = () => {
  removed.value = true
  visible.value = false
}

const onCancel = () => {
  removed.value = false
  visible.value = false
}
</script>
