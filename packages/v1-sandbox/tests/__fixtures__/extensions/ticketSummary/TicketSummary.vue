<template>
    <section aria-label="Ticket summary">
        <h2>Ticket {{ ticket.number }}</h2>
        <p>{{ ticket['customer.name'] }}</p>
        <ul>
            <li v-for="issue in ticket.issues" :key="issue.id">
                Question {{ issue.id }}: {{ issue.status?.name }} — {{ issue.responsible?.name }}
            </li>
        </ul>
        <template v-if="target === 'ticket/view:header.after'">
            <UiButton :disabled="!settings.editable || busy" @click="perform(actions.openTicketEditor)">Edit ticket</UiButton>
            <UiButton :disabled="busy" @click="perform(actions.openTicketHistory)">Open history</UiButton>
            <UiButton :disabled="!ticket.canCreateEmail || busy" @click="perform(actions.openEmailEditor)">New email</UiButton>
            <UiButton :disabled="!ticket.canCreateOrder || busy" @click="perform(actions.openOrderForm)">New order</UiButton>
            <label :for="commentId">Comment</label>
            <UiTextbox :id="commentId" v-model:value="comment" />
            <UiButton :disabled="!settings.commentable || busy" @click="addComment">Add comment</UiButton>
            <UiButton :disabled="!settings.editable || busy" @click="resolveQuestion">Resolve first question</UiButton>
            <UiButton :disabled="!settings.editable || busy" @click="assignQuestion">Assign first question</UiButton>
            <UiButton :disabled="busy" @click="perform(actions.refresh)">Refresh ticket</UiButton>
            <p role="status">{{ message }}</p>
        </template>
    </section>
</template>

<script lang="ts" remote setup>
import { computed, ref, useId } from 'vue'

import { UiButton, UiTextbox } from '@retailcrm/embed-ui-v1-components/remote'
import {
  useActions,
  useContext,
} from '@retailcrm/embed-ui-v1-contexts/remote/ticket/view'
import {
  useContext as useSettings,
} from '@retailcrm/embed-ui-v1-contexts/remote/ticket/view-settings'

defineProps<{ target: string }>()

const ticket = useContext()
const settings = useSettings()
const actions = useActions()
const commentId = useId()
const comment = ref('')
const message = ref('')
const busy = computed(() => ticket.loading || ticket.loadFailed || ticket.pending)

void ticket.initialize()
void settings.initialize()

const perform = async (operation: () => Promise<unknown>) => {
  try {
    await operation()
    message.value = 'Action completed'
  } catch (error) {
    message.value = error instanceof Error ? error.message : String(error)
  }
}

const addComment = () => perform(async () => {
  const id = await actions.createComment(comment.value)
  comment.value = ''
  return id
})
const resolveQuestion = () => perform(() => actions.changeIssueStatus(ticket.issues[0].id, 2))
const assignQuestion = () => perform(() => actions.changeIssueResponsible(ticket.issues[0].id, { kind: 'group', id: 8 }))
</script>
