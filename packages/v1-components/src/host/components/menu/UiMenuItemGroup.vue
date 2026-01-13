<template>
    <div class="ui-v1-menu-item-group">
        <div class="ui-v1-menu-item-group__head">
            <div
                v-if="$slots.option"
                class="ui-v1-menu-item-group__head-option"
            >
                <!-- @slot Слот заголовка группы -->
                <slot name="option" />
            </div>

            <div
                v-else
                class="ui-v1-menu-item-group__head-inner"
            >
                <div
                    :class="{
                        'ui-v1-menu-item-group__title': true,
                        'ui-v1-menu-item-group__title_upper': !$slots.option
                    }"
                >
                    <!-- @slot Заголовок -->
                    <slot name="label" />
                </div>

                <div
                    v-if="$slots.quantity"
                    class="ui-v1-menu-item-group__count"
                >
                    <!-- @slot Счетчик количества -->
                    <slot name="quantity" />
                </div>
            </div>
        </div>

        <!-- @slot Основной контент -->
        <slot />
    </div>
</template>

<script setup lang="ts">
</script>