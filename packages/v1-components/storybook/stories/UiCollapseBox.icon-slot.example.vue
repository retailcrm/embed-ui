<template>
    <div style="width: 640px;">
        <UiCollapseBox color="purple">
            <template #icon>
                <span
                    style="
                      display: inline-flex;
                      align-items: center;
                      justify-content: center;
                      width: 20px;
                      height: 20px;
                      border-radius: 4px;
                      background: #8a63d2;
                      color: #fff;
                      font-size: 12px;
                      font-weight: 700;
                    "
                >
                    C
                </span>
            </template>

            <template #title>
                Custom icon slot
            </template>

            <template #description>
                Icon is provided only via slot.
            </template>

            <template #body-content>
                You can pass your own SVG/Vue component to the `icon` slot.
            </template>
        </UiCollapseBox>
    </div>
</template>

<script setup lang="ts">
import UiCollapseBox from '@/host/components/collapse-box/UiCollapseBox.vue'
</script>
