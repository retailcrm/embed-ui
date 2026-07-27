<template>
    <section
        :class="$style['widget-run-summary']"
        :aria-labelledby="uid + '-widget-run-summary-title'"
        role="region"
    >
        <h2
            :id="uid + '-widget-run-summary-title'"
            :class="$style['widget-run-summary__title']"
        >
            {{ t('app.widgetRunSummary.title') }}
        </h2>

        <div :class="$style['widget-run-summary__row']">
            <span>{{ t('app.widgetRunSummary.component') }}:</span>
            <strong>{{ componentLabel }}</strong>
        </div>

        <ul
            :class="$style['widget-run-summary__targets']"
            :aria-label="t('app.widgetRunSummary.targets')"
        >
            <li
                v-for="target in props.targets"
                :key="target"
            >
                <code :class="$style['widget-run-summary__target']">
                    {{ target }}
                </code>
            </li>
        </ul>

        <div :class="$style['widget-run-summary__row']">
            <span>{{ t('app.widgetRunSummary.testData') }}:</span>
            <strong :class="$style['widget-run-summary__fixture-name']">
                {{ fixturePresentation?.name }}
            </strong>
        </div>

        <p :class="$style['widget-run-summary__description']">
            {{ fixturePresentation?.description }}
        </p>
    </section>
</template>

<script setup lang="ts">
import type { SandboxOrderTarget } from '@/scenario/types'

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useId } from 'vue'

import { getOrderSandboxFixturePresentation } from '@/app/fixturePresentation'

const props = defineProps<{
  fixture: string;
  targets: SandboxOrderTarget[];
}>()

const { t } = useI18n()
const uid = useId()
const fixturePresentation = computed(() =>
  getOrderSandboxFixturePresentation(props.fixture, t)
)
const componentLabel = computed(() => props.targets.length === 1
  ? t('app.widgetRunSummary.widget')
  : t('app.widgetRunSummary.widgets', { count: props.targets.length })
)
</script>

<style lang="less" module>
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/geometry.less";
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/layout.less";
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/palette.less";
@import (reference) "@retailcrm/embed-ui-v1-components/assets/stylesheets/variables.less";

.widget-run-summary {
    background: #fff;
    border: 1px solid @grey-500;
    border-radius: @border-radius-lg;
    box-shadow: @drop-shadow-s;
    box-sizing: border-box;
    color: @black-500;
    display: grid;
    gap: @spacing-xs;
    margin-bottom: @spacing-l;
    padding: @spacing-l;
    width: 100%;

    &__title {
        font-size: 20px;
        line-height: 1.25;
        margin: 0 0 @spacing-xs;
    }

    &__row {
        align-items: baseline;
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        line-height: 1.4;
    }

    &__targets {
        display: flex;
        flex-wrap: wrap;
        gap: @spacing-xs;
        list-style: none;
        margin: 0;
        padding: 0;
    }

    &__target {
        background: @grey-200;
        border: 1px solid @grey-500;
        border-radius: @border-radius-sm;
        color: @grey-900;
        display: inline-block;
        font-size: 13px;
        line-height: 1.4;
        padding: 3px @spacing-xs;
    }

    &__fixture-name {
        color: @blue-500;
    }

    &__description {
        color: @grey-900;
        line-height: 1.4;
        margin: 0;
    }
}
</style>
