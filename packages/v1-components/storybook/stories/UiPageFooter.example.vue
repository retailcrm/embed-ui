<template>
    <div :class="styles.container">
        <UiPageFooter>
            <template #actions>
                <UiButton
                    :disabled="disabled"
                    :locked="locked"
                    variant="success"
                    @click="onAction"
                >
                    Сохранить
                </UiButton>

                <UiButton
                    v-if="showSecondary"
                    appearance="secondary"
                    :disabled="disabled"
                    :locked="locked"
                    @click="onAction"
                >
                    Сохранить и выйти
                </UiButton>
            </template>

            <template
                v-if="showAside"
                #aside
            >
                <div>
                    <UiButton
                        aria-label="Удалить"
                        appearance="tertiary"
                        :class="styles.delete"
                        :disabled="disabled"
                        :locked="locked"
                        variant="danger"
                        @click="onAction"
                    >
                        <IconDelete aria-hidden="true" />
                    </UiButton>
                </div>
            </template>
        </UiPageFooter>
    </div>
</template>

<script lang="ts" remote setup>
import IconDelete from '~assets/sprites/ui/delete-outlined.svg'

import { UiButton } from '@/remote/components/button'
import { UiPageFooter } from '@/remote/components/page-footer'

withDefaults(defineProps<{
  disabled?: boolean;
  locked?: boolean;
  showAside?: boolean;
  showSecondary?: boolean;
  styles: Record<string, string>;
}>(), {
  disabled: false,
  locked: false,
  showAside: true,
  showSecondary: true,
})

const onAction = () => {}
</script>
