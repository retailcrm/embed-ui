<template>
    <aside
        :class="[
            $style['sandbox-sidebar'],
            !open && $style['sandbox-sidebar_closed'],
        ]"
        :data-open="String(open)"
        data-testid="sandbox-sidebar"
    >
        <div
            :class="$style['sandbox-sidebar__section-title']"
            data-testid="sandbox-sidebar-skeleton"
        />

        <nav :class="$style['sandbox-sidebar__menu']">
            <div
                v-for="item in menuItems"
                :key="item.width"
                :class="[
                    $style['sandbox-sidebar__menu-item'],
                    item.active && $style['sandbox-sidebar__menu-item_active'],
                ]"
                data-testid="sandbox-sidebar-skeleton"
            >
                <span
                    :class="$style['sandbox-sidebar__menu-item-skeleton']"
                    :style="{ width: `${item.width}px` }"
                />
            </div>
        </nav>

        <div
            :class="$style['sandbox-sidebar__add-link']"
            data-testid="sandbox-sidebar-skeleton"
        />
    </aside>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean;
}>()

const menuItems = [
  {
    active: false,
    width: 112,
  },
  {
    active: true,
    width: 144,
  },
  {
    active: false,
    width: 92,
  },
  {
    active: false,
    width: 156,
  },
  {
    active: false,
    width: 176,
  },
  {
    active: false,
    width: 128,
  },
  {
    active: false,
    width: 104,
  },
  {
    active: false,
    width: 136,
  },
]
</script>

<style scoped lang="less" module>
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/palette.less";
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/layout.less";
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/geometry.less";
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/variables.less";

.sandbox-sidebar {
    background: @grey-200;
    grid-column: 2;
    height: 100vh;
    min-height: 0;
    overflow: hidden;
    padding: 28px @spacing-s @spacing-m;
    transition: opacity @transition, padding @transition;
    width: 256px;

    &_closed {
        opacity: 0;
        padding-left: 0;
        padding-right: 0;
        pointer-events: none;
    }

    &__section-title {
        background: @grey-500;
        border-radius: @border-radius-md;
        height: 20px;
        margin-bottom: 46px;
        margin-left: 4px;
        width: 132px;
    }

    &__menu {
        border-bottom: 1px solid @grey-500;
        display: flex;
        flex-direction: column;
        gap: 2px;
        padding-bottom: 28px;
    }

    &__menu-item {
        align-items: center;
        border-radius: @border-radius-md;
        display: flex;
        height: 48px;
        padding: 0 @spacing-s;

        &_active {
            background: @blue-500;
            box-shadow: 0 2px 7px rgba(2, 63, 156, 0.25);
        }
    }

    &__menu-item-skeleton {
        background: @grey-500;
        border-radius: @border-radius-sm;
        display: block;
        height: 14px;
    }

    &__menu-item_active &__menu-item-skeleton {
        background: rgba(255, 255, 255, 0.72);
    }

    &__add-link {
        background: @grey-500;
        border-radius: @border-radius-sm;
        height: 14px;
        margin: 34px 0 0 4px;
        width: 164px;
    }
}
</style>
