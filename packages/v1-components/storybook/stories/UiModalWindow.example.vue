<template>
    <div>
        <UiButton appearance="secondary" @click="open = true">
            {{ buttonTitle }}
        </UiButton>

        <UiModalWindow v-model:opened="open" v-bind="$attrs">
            <template #title>
                Заголовок
            </template>

            <div :style="$attrs.appearance == 'popup' ? { height: '1500px' } : {}">
                <p>Некоторый контент</p>

                <div v-if="hasNesting" style="margin-top: 16px">
                    <UiButton appearance="secondary" @click="openNesting = true">
                        Открыть вложенное окно
                    </UiButton>

                    <UiModalWindow
                        v-if="!nestedOnSameLevel"
                        v-model:opened="openNesting"
                        responsive
                    >
                        <template #title>
                            Вложенное окно
                        </template>

                        <p>Некоторый контент</p>

                        <template #footer>
                            <UiButton appearance="secondary" @click="openNesting = false">
                                Закрыть
                            </UiButton>
                        </template>
                    </UiModalWindow>
                </div>
            </div>

            <template #footer>
                <UiButton appearance="secondary" @click="open = false">
                    Закрыть
                </UiButton>
            </template>
        </UiModalWindow>

        <UiModalWindow
            v-if="nestedOnSameLevel"
            v-model:opened="openNesting"
            v-bind="$attrs"
            responsive
        >
            <template #title>
                Вложенное на одном уровне окно
            </template>

            <p>Некоторый контент</p>

            <template #footer>
                <UiButton appearance="secondary" @click="openNesting = false">
                    Закрыть
                </UiButton>
            </template>
        </UiModalWindow>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import UiButton from '@/host/components/button/UiButton.vue'
import UiModalWindow from '@/host/components/modal-window/UiModalWindow.vue'

defineProps({
  buttonTitle: {
    type: String,
    default: '',
  },

  hasNesting: {
    type: Boolean,
    default: false,
  },

  nestedOnSameLevel: {
    type: Boolean,
    default: false,
  },
})

const open = ref(false)
const openNesting = ref(false)
</script>