<template>
    <div>
        <UiButton @click="open = true">
            {{ buttonTitle }}
        </UiButton>

        <UiModalSidebar v-model:opened="open" v-bind="$attrs">
            <template #title>
                Заголовок
            </template>

            <div style="height: 1500px;">
                <div>Контент высотой 1500px</div>

                <div v-if="hasNesting" style="margin-top: 16px">
                    <UiButton @click="modalSidebarInner = true">
                        Вложенная шторка
                    </UiButton>

                    <UiModalSidebar
                        v-model:opened="modalSidebarInner"
                        @close-sidebar="modalSidebarInner = false"
                    >
                        <template #title>
                            Header
                        </template>

                        <div style="height: 1500px;">
                            <div>Some content</div>
                            <div>Вложенная шторка</div>
                        </div>

                        <template #footer>
                            <UiButton @click="modalSidebarInner = false">
                                Закрыть
                            </UiButton>
                        </template>
                    </UiModalSidebar>
                </div>
            </div>

            <template v-if="footer" #footer>
                <UiButton @click="open = false">
                    Закрыть
                </UiButton>
            </template>
        </UiModalSidebar>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import UiButton from '@/host/components/button/UiButton.vue'
import UiModalSidebar from '@/host/components/modal-sidebar/UiModalSidebar.vue'

defineProps({
  buttonTitle: {
    type: String,
    default: '',
  },

  hasNesting: {
    type: Boolean,
    default: false,
  },

  footer: {
    type: Boolean,
    default: false,
  },
})

const open = ref(false)
const modalSidebarInner = ref(false)
</script>
