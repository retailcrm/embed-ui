<template>
    <aside
        :class="$style['sandbox-rail']"
        data-testid="sandbox-rail"
    >
        <div
            :class="$style['sandbox-rail__logo']"
            data-testid="sandbox-rail-logo"
        />

        <button
            v-for="item in topItems"
            :key="item.label"
            :class="[
                $style['sandbox-rail__button'],
                item.active && $style['sandbox-rail__button_active'],
            ]"
            :aria-label="item.label"
            type="button"
        >
            <component
                :is="item.icon"
                :class="$style['sandbox-rail__icon']"
                aria-hidden="true"
            />
        </button>

        <div :class="$style['sandbox-rail__spacer']" />

        <button
            v-for="item in bottomItems"
            :key="item.label"
            :aria-label="item.label"
            :class="$style['sandbox-rail__button']"
            type="button"
        >
            <component
                :is="item.icon"
                :class="$style['sandbox-rail__icon']"
                aria-hidden="true"
            />
        </button>

        <div :class="$style['sandbox-rail__user']">
            <span :class="$style['sandbox-rail__user-skeleton']" />
        </div>
    </aside>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

import IconChart from '~assets/sprites/technology-and-data/chart_bar_2.svg'
import IconLocation from '~assets/sprites/map-and-places/my_location.svg'
import IconNotifications from '~assets/sprites/alerts/notifications_outlined.svg'
import IconRobot from '~assets/sprites/premium/robot_upper.svg'
import IconSettings from '~assets/sprites/ui/settings_outlined.svg'
import IconShoppingBasket from '~assets/sprites/actions/shopping_cart_outlined.svg'

type RailItem = {
  active?: boolean;
  icon: Component;
  label: string;
}

const topItems: RailItem[] = [
  {
    active: true,
    icon: IconShoppingBasket,
    label: 'Orders section',
  },
  {
    active: false,
    icon: IconRobot,
    label: 'Main section',
  },
  {
    active: false,
    icon: IconLocation,
    label: 'Location section',
  },
  {
    active: false,
    icon: IconChart,
    label: 'Analytics section',
  },
]

const bottomItems: RailItem[] = [
  {
    icon: IconNotifications,
    label: 'Notifications',
  },
  {
    icon: IconSettings,
    label: 'Settings',
  },
]
</script>

<style scoped lang="less" module>
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/palette.less";
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/layout.less";
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/geometry.less";
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/variables.less";

.sandbox-rail {
    align-items: center;
    background: @black-700;
    color: #fff;
    display: flex;
    flex-direction: column;
    gap: @spacing-xs;
    min-height: 100vh;
    padding: @spacing-s 0;

    &__logo {
        background: @grey-300;
        border-radius: 50%;
        height: 40px;
        margin-bottom: @spacing-s;
        opacity: 0.72;
        width: 40px;
    }

    &__button {
        align-items: center;
        background: transparent;
        border: 0;
        border-radius: 0;
        color: #fff;
        cursor: pointer;
        display: flex;
        height: 48px;
        justify-content: center;
        padding: 0;
        width: 100%;

        &_active {
            background: @black-500;
            border-left: 3px solid @blue-500;
        }
    }

    &__icon {
        fill: currentColor;
        height: 28px;
        opacity: 0.92;
        width: 28px;
    }

    &__spacer {
        flex: 1;
    }

    &__user {
        align-items: center;
        background: @grey-300;
        border-radius: 50%;
        display: flex;
        height: 40px;
        justify-content: center;
        margin-top: @spacing-xs;
        opacity: 0.82;
        position: relative;
        width: 40px;

        &::after {
            background: @green-500;
            border: 3px solid @black-700;
            border-radius: 50%;
            bottom: 2px;
            content: "";
            height: 12px;
            position: absolute;
            right: 0;
            width: 12px;
        }
    }

    &__user-skeleton {
        background: @grey-500;
        border-radius: 50%;
        height: 18px;
        width: 18px;
    }
}
</style>
