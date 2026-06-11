<template>
    <article
        :style="widgetStyle"
        data-testid="demo-extension"
    >
        <strong data-testid="demo-extension-title">
            {{ title }}
        </strong>

        <div data-testid="demo-extension-target">
            Target: {{ target }}
        </div>

        <div data-testid="demo-extension-order-number">
            Order: {{ order.number || 'unknown' }}
        </div>

        <div data-testid="demo-extension-order-status">
            Status: {{ order.status || 'unknown' }}
        </div>

        <UiButton
            appearance="secondary"
            data-testid="demo-extension-action"
            @click="clicks += 1"
        >
            Проверить UI{{ clicks > 0 ? `: ${clicks}` : '' }}
        </UiButton>
    </article>
</template>

<script lang="ts" remote setup>
import { onMounted, ref } from 'vue'
import { UiButton } from '@retailcrm/embed-ui-v1-components/remote'
import {
  useContext as useOrderContext,
} from '@retailcrm/embed-ui-v1-contexts/remote/order/card'

const props = defineProps<{
  target: string;
  title: string;
}>()

const order = useOrderContext()
const clicks = ref(0)
const title = props.title
const widgetStyle = {
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
