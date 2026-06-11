<template>
    <article
        :style="widgetStyle"
        data-testid="demo-delivery-widget"
    >
        <strong>Delivery widget</strong>

        <div>Target: {{ target }}</div>
        <div>Order: {{ order.number || 'unknown' }}</div>

        <UiAlert
            text="Delivery fixture data is available in sandbox context."
            variant="primary"
        />
    </article>
</template>

<script lang="ts" remote setup>
import { onMounted } from 'vue'
import { UiAlert } from '@retailcrm/embed-ui-v1-components/remote'
import {
  useContext as useOrderContext,
} from '@retailcrm/embed-ui-v1-contexts/remote/order/card'

defineProps<{
  target: string;
}>()

const order = useOrderContext()
const widgetStyle = {
  background: '#f9fafb',
  border: '1px solid #dee2e6',
  borderRadius: '8px',
  color: '#1e2248',
  display: 'grid',
  gap: '8px',
  padding: '16px',
}

onMounted(() => {
  void order.initialize()
})
</script>
