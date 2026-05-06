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
                <div class="footer">
                    <div class="footer__main">
                        <UiButton>
                            Открыть
                        </UiButton>

                        <UiButton appearance="secondary" @click="open = false">
                            Закрыть
                        </UiButton>
                    </div>

                    <div class="footer__second">
                        <UiButton class="button-delete" variant="danger" appearance="tertiary">
                            <IconDelete class="icon-delete" aria-hidden="true" />
                        </UiButton>
                    </div>
                </div>

            </template>
        </UiModalSidebar>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import IconDelete from '~assets/sprites/ui/delete.svg'

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

<style lang="less" scoped>
@import (reference) '~assets/stylesheets/palette';
@import (reference) '~assets/stylesheets/typography';
@import (reference) '~assets/stylesheets/variables';

.button-delete {
  color: @grey-800;
}

.button-delete:hover {
  color: @red-600;
}

.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;

    &__main {
      display: flex;
      align-items: center;
      gap: 16px;
    }
}
</style>
