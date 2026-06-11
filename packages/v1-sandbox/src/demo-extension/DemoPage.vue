<template>
    <section
        :style="pageStyle"
        data-testid="demo-page-extension"
    >
        <UiPageHeader
            placeholder="Введите название страницы"
            value="Orders dashboard"
        >
            <template #actions>
                <UiButton
                    data-testid="demo-page-header-action"
                    @click="manualStatus = 'header action clicked'"
                >
                    Обновить
                </UiButton>
            </template>
        </UiPageHeader>

        <UiAlert
            text="Page runner запущен в sandbox через тот же worker endpoint."
            variant="primary"
        />

        <div data-testid="demo-page-code">
            Page code: {{ code }}
        </div>

        <div data-testid="demo-page-order-number">
            Order: {{ order.number || 'unknown' }}
        </div>

        <div data-testid="demo-page-order-status">
            Status: {{ manualStatus || order.status || 'unknown' }}
        </div>
    </section>
</template>

<script lang="ts" remote setup>
import { onMounted, ref } from 'vue'
import { UiAlert, UiButton, UiPageHeader } from '@retailcrm/embed-ui-v1-components/remote'
import {
  useContext as useOrderContext,
} from '@retailcrm/embed-ui-v1-contexts/remote/order/card'

defineProps<{
  code: string;
}>()

const order = useOrderContext()
const manualStatus = ref('')
const pageStyle = {
  color: '#1e2248',
  display: 'grid',
  gap: '18px',
  maxWidth: '720px',
}

onMounted(() => {
  void order.initialize()
})
</script>
