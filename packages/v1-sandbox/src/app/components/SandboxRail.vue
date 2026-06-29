<template>
    <aside
        :id="uid + '-sandbox-rail'"
        :class="$style['sandbox-rail']"
    >
        <div
            :class="$style['sandbox-rail__logo']"
        />

        <ul :class="$style['sandbox-rail__list']">
            <li
                v-for="item in topItems"
                :key="item.label"
                :class="[
                    $style['sandbox-rail__item'],
                    item.current && $style['sandbox-rail__item_current'],
                ]"
            >
                <a
                    :class="$style['sandbox-rail__link']"
                    :aria-label="item.label"
                    :aria-current="item.current ? 'page' : undefined"
                    href="#"
                    @click.prevent="item.action?.()"
                >
                    <component
                        :is="item.icon"
                        :class="$style['sandbox-rail__icon']"
                        aria-hidden="true"
                    />
                </a>
            </li>
        </ul>

        <div :class="$style['sandbox-rail__spacer']" />

        <ul :class="$style['sandbox-rail__list']">
            <li
                v-for="item in bottomItems"
                :key="item.label"
                :class="[
                    $style['sandbox-rail__item'],
                    item.open && $style['sandbox-rail__item_open'],
                ]"
            >
                <UiButton
                    v-if="item.action"
                    :class="$style['sandbox-rail__link']"
                    :aria-label="item.label"
                    :aria-controls="item.controls"
                    :aria-expanded="item.expanded"
                    :aria-pressed="item.open"
                    appearance="tertiary"
                    size="sm"
                    @click="item.action"
                >
                    <component
                        :is="item.icon"
                        :class="$style['sandbox-rail__icon']"
                        aria-hidden="true"
                    />
                </UiButton>

                <a
                    v-else
                    :class="$style['sandbox-rail__link']"
                    :aria-label="item.label"
                    href="#"
                    @click.prevent
                >
                    <component
                        :is="item.icon"
                        :class="$style['sandbox-rail__icon']"
                        aria-hidden="true"
                    />
                </a>
            </li>
        </ul>

        <div
            :class="$style['sandbox-rail__user']"
        >
            <span :class="$style['sandbox-rail__user-skeleton']" />
        </div>
    </aside>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useId } from 'vue'

import IconChart from '@retailcrm/embed-ui-v1-components/assets/sprites/technology-and-data/chart-bar-2.svg'
import IconCode from '@retailcrm/embed-ui-v1-components/assets/sprites/technology-and-data/code.svg'
import IconLocation from '@retailcrm/embed-ui-v1-components/assets/sprites/map-and-places/my-location.svg'
import IconNotifications from '@retailcrm/embed-ui-v1-components/assets/sprites/alerts/notifications.svg'
import IconRobot from '@retailcrm/embed-ui-v1-components/assets/sprites/premium/robot-upper.svg'
import IconSettings from '@retailcrm/embed-ui-v1-components/assets/sprites/ui/settings-outlined.svg'
import IconShoppingBasket from '@retailcrm/embed-ui-v1-components/assets/sprites/actions/shopping-cart-outlined.svg'

import { UiButton } from '@/app/host-components'

type RailItem = {
  action?: () => void;
  controls?: string;
  current?: boolean;
  expanded?: boolean;
  icon: Component;
  label: string;
  open?: boolean;
}

const props = defineProps<{
  devPanelControlsId: string;
  devPanelOpen: boolean;
}>()
const emit = defineEmits<{
  openDevPanel: [];
}>()
const { t } = useI18n()
const uid = useId()

const topItems = computed<RailItem[]>(() => [
  {
    current: true,
    icon: IconShoppingBasket,
    label: t('rail.ordersSection'),
  },
  {
    icon: IconRobot,
    label: t('rail.mainSection'),
  },
  {
    icon: IconLocation,
    label: t('rail.locationSection'),
  },
  {
    icon: IconChart,
    label: t('rail.analyticsSection'),
  },
])

const bottomItems = computed<RailItem[]>(() => [
  {
    icon: IconNotifications,
    label: t('rail.notifications'),
  },
  {
    icon: IconSettings,
    label: t('rail.settings'),
  },
  {
    action: () => emit('openDevPanel'),
    controls: props.devPanelControlsId,
    expanded: props.devPanelOpen,
    icon: IconCode,
    label: t('rail.sandboxControls'),
    open: props.devPanelOpen,
  },
])
</script>

<i18n locale="en-GB">
{
    "rail": {
        "analyticsSection": "Analytics section",
        "locationSection": "Location section",
        "mainSection": "Main section",
        "navigation": "CRM navigation rail",
        "notifications": "Notifications",
        "ordersSection": "Orders section",
        "sandboxControls": "Open sandbox controls",
        "settings": "Settings"
    }
}
</i18n>

<i18n locale="es-ES">
{
    "rail": {
        "analyticsSection": "Sección de analítica",
        "locationSection": "Sección de ubicación",
        "mainSection": "Sección principal",
        "navigation": "Rail de navegación CRM",
        "notifications": "Notificaciones",
        "ordersSection": "Sección de pedidos",
        "sandboxControls": "Abrir controles de sandbox",
        "settings": "Ajustes"
    }
}
</i18n>

<i18n locale="ru-RU">
{
    "rail": {
        "analyticsSection": "Раздел аналитики",
        "locationSection": "Раздел геолокации",
        "mainSection": "Основной раздел",
        "navigation": "Основная CRM-навигация",
        "notifications": "Уведомления",
        "ordersSection": "Раздел заказов",
        "sandboxControls": "Открыть управление песочницей",
        "settings": "Настройки"
    }
}
</i18n>

<style lang="less" module>
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
    height: 100vh;
    min-height: 0;
    overflow: hidden;
    padding: @spacing-s 0;

    &__logo {
        background: @grey-300;
        border-radius: 50%;
        height: 40px;
        margin-bottom: @spacing-s;
        opacity: 0.72;
        width: 40px;
    }

    &__list {
        display: grid;
        gap: @spacing-xs;
        list-style: none;
        margin: 0;
        padding: 0;
        width: 100%;
    }

    &__item {
        border-left: 3px solid transparent;
        box-sizing: border-box;
        width: 100%;

        &_current {
            background: #fff;
            border-left-color: @red-500;
        }

        &_open {
            background: rgba(255, 255, 255, 0.14);
            border-left-color: @red-500;
        }
    }

    &__link {
        align-items: center;
        background: transparent;
        border: 0;
        border-radius: 0;
        color: #fff;
        cursor: pointer;
        display: flex;
        height: 48px;
        justify-content: center;
        min-height: 48px;
        min-width: 0;
        padding: 0;
        text-decoration: none;
        width: 100%;

        &:global(.ui-v1-button) {
            background: transparent;
            border: 0;
            border-radius: 0;
            color: #fff;
            min-height: 48px;
            min-width: 0;
            padding: 0;
            width: 100%;
        }

        :global(.ui-v1-button__content) {
            justify-content: center;
            width: 100%;
        }
    }

    &__icon {
        fill: currentColor;
        height: 28px;
        opacity: 0.92;
        width: 28px;

        [fill]:not([fill="none"]) {
            fill: currentColor;
        }

        [stroke]:not([stroke="none"]) {
            stroke: currentColor;
        }
    }

    &__item_current &__link {
        color: @black-500;

        &:global(.ui-v1-button) {
            color: @black-500;
        }
    }

    &__item_open &__link {
        color: #fff;

        &:global(.ui-v1-button) {
            color: #fff;
        }
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
