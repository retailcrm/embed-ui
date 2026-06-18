<template>
    <aside
        :id="id"
        :class="[
            $style['sandbox-sidebar'],
            !open && $style['sandbox-sidebar_closed'],
        ]"
    >
        <UiSkeleton
            :class="$style['sandbox-sidebar__section-title']"
            :height="20"
            :width="132"
        />

        <nav :class="$style['sandbox-sidebar__menu']">
            <div
                v-for="item in menuItems"
                :key="item.width"
                :class="[
                    $style['sandbox-sidebar__menu-item'],
                    item.active && $style['sandbox-sidebar__menu-item_active'],
                ]"
            >
                <UiSkeleton
                    :class="$style['sandbox-sidebar__menu-item-skeleton']"
                    :height="14"
                    :width="item.width"
                />
            </div>
        </nav>

        <UiSkeleton
            :class="$style['sandbox-sidebar__add-link']"
            :height="14"
            :width="164"
        />
    </aside>
</template>

<script setup lang="ts">
import { UiSkeleton } from '@/app/host-components'

defineProps<{
  id: string;
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

<style lang="less" module>
@import (reference) "~assets/stylesheets/palette.less";
@import (reference) "~assets/stylesheets/layout.less";
@import (reference) "~assets/stylesheets/geometry.less";
@import (reference) "~assets/stylesheets/variables.less";

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
        margin-bottom: 46px;
        margin-left: 4px;

        &:global(.ui-v1-skeleton_shimmer)::after {
            display: none;
        }
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

        &:global(.ui-v1-skeleton_shimmer)::after {
            display: none;
        }
    }

    &__menu-item_active &__menu-item-skeleton {
        background: rgba(255, 255, 255, 0.72);
    }

    &__add-link {
        background: @grey-500;
        border-radius: @border-radius-sm;
        margin: 34px 0 0 4px;

        &:global(.ui-v1-skeleton_shimmer)::after {
            display: none;
        }
    }
}
</style>
