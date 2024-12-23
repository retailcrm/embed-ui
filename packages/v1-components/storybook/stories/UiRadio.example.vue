<template>
    <div :class="$style['container']">
        <div
            v-for="(option, index) in options"
            :key="option.value"
            :class="$style['option']"
        >
            <UiRadio
                :id="'radio-' + index"
                v-model:model="model"
                :value="option.value"
                :disabled="option.disabled"
            />

            <label :for="'radio-' + index">
                {{ option.label }}
            </label>
        </div>

        <div>
            Value: {{ model }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import UiRadio from '@/host/components/radio/UiRadio.vue'

import { ref } from 'vue'

type Option = {
  label: string;
  value: string;
  disabled: boolean;
}

const options: Option[] = [{
  label: 'Option 1',
  value: '1',
  disabled: false,
}, {
  label: 'Option 2',
  value: '2',
  disabled: false,
}, {
  label: 'Option 3',
  value: '3',
  disabled: true,
}]

const model = ref(options[0].value)
</script>

<style lang="less" module>
@import (reference) '../../assets/stylesheets/geometry.less';
@import (reference) '../../assets/stylesheets/variables.less';

.container {
  padding: @spacing-s;
  border: 1px solid @grey-500;
  border-radius: @border-radius-lg;
}

.option {
  margin-bottom: @spacing-xs;

  :global(label) {
    cursor: pointer;
    margin-left: @spacing-xs;
  }
  :global(.ui-v1-radio_disabled ~ label) {
    cursor: default;
  }
}
</style>
