<template>
    <div :class="$style['container']">
        <ul :class="$style['list']">
            <li :class="$style['item']">
                <UiCheckbox id="checkbox-phone" v-model:model="phone" />

                <label for="checkbox-phone">
                    Телефон
                </label>
            </li>

            <li :class="$style['item']">
                <UiCheckbox
                    id="checkbox-socials"
                    :model="socials.length > 0"
                    :indeterminate="socialsIndeterminate"
                    @change="toggleSocials"
                />

                <label for="checkbox-socials">
                    Социальные сети
                </label>

                <ul :class="$style['list']">
                    <li
                        v-for="(option, index) in socialsOptions"
                        :key="option.value"
                        :class="$style['item']"
                    >
                        <UiCheckbox
                            :id="'checkbox-socials-' + index"
                            v-model:model="socials"
                            :value="option.value"
                        />

                        <label :for="'checkbox-socials-' + index">
                            {{ option.label }}
                        </label>
                    </li>
                </ul>
            </li>

            <li :class="$style['item']">
                <UiCheckbox id="checkbox-mail" v-model:model="email" disabled />

                <label for="checkbox-mail">
                    Почта
                </label>
            </li>

            <li :class="$style['item']">
                <UiCheckbox id="checkbox-pigeons" v-model:model="pigeons" disabled />

                <label for="checkbox-pigeons">
                    Голуби
                </label>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import UiCheckbox from '@/host/components/checkbox/UiCheckbox.vue'

import { computed, ref } from 'vue'

const email = ref(true)
const phone = ref(true)
const pigeons = ref(true)

const socials = ref([] as string[])
const socialsOptions = [{
  label: 'ВКонтакте',
  value: 'vk',
}, {
  label: 'Инстаграм',
  value: 'instagram',
}]
const socialsSelected = computed(() => socials.value.length > 0)
const socialsIndeterminate = computed(() => {
  return socialsSelected.value && socials.value.length < socialsOptions.length
})

const toggleSocials = (force: boolean) => {
  const all = socialsOptions.map(o => o.value)
  const indeterminate = socialsIndeterminate.value

  socials.value = force
    ? all
    : indeterminate
      ? all
      : []
}
</script>

<style lang="less" module>
@import (reference) '~assets/stylesheets/geometry.less';
@import (reference) '~assets/stylesheets/variables.less';

.container {
  padding: 16px;
  border: 1px solid @grey-500;
  border-radius: @border-radius-lg;
}

.list {
  padding: 0;
  list-style: none;

  .list {
    margin-top: 24px;
    padding-left: 32px;
  }
}

.item {
  :global(label) {
    cursor: pointer;
  }

  :global(.ui-v1-checkbox + label) {
    margin-left: @spacing-xs;
  }

  :global(.ui-v1-checkbox_disabled + label) {
    cursor: default;
  }

  & + & {
    margin-top: 20px;
  }
}
</style>
