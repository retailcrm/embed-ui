<template>
    <UiPopperConnector>
        <UiPopconfirmTrigger v-slot="{ open }" :visible="visible" @click="visible = !visible">
            <UiButton :active="open">
                Архивировать
            </UiButton>
        </UiPopconfirmTrigger>

        <UiPopconfirmPopper
            :visible="visible"
            title="Подтвердить действие?"
            @update:visible="visible = $event"
            @ok="onOk"
            @cancel="onCancel"
        >
            Клиент будет перенесен в архив. Его можно будет восстановить позже.
        </UiPopconfirmPopper>
    </UiPopperConnector>

    <div class="mt-3">
        {{ confirmed ? 'Действие подтверждено' : 'Ожидает подтверждения' }}
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import UiButton from '@/host/components/button/UiButton.vue'
import UiPopconfirmPopper from '@/host/components/popconfirm/UiPopconfirmPopper.vue'
import UiPopconfirmTrigger from '@/host/components/popconfirm/UiPopconfirmTrigger.vue'
import UiPopperConnector from '@/host/components/popper/UiPopperConnector.vue'

const confirmed = ref(false)
const visible = ref(false)

const onOk = () => {
  confirmed.value = true
  visible.value = false
}

const onCancel = () => {
  confirmed.value = false
  visible.value = false
}
</script>
