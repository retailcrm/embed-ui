<template>
  <UiPopperConnector>
    <UiSelectTrigger />

    <UiSelectPopper />
  </UiPopperConnector>
</template>

<script lang="ts" setup>
import { UiSelectTrigger } from './parts'
import { UiSelectPopper } from './parts'

import { UiPopperConnector } from '@/remote/components/popper'

</script>