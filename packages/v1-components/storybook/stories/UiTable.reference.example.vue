<template>
    <div class="reference-table">
        <UiTable
            class="reference-table__table"
            bordered
            :rows="sortedRows"
            row-key="id"
        >
            <UiTableColumn
                :width="42"
                label=""
                trim
            >
                <template #label>
                    <div class="reference-table__centered">
                        <UiCheckbox
                            :model="visibleRowIds.length > 0 && selectedVisibleIds.length === visibleRowIds.length"
                            :indeterminate="selectedVisibleIds.length > 0 && selectedVisibleIds.length !== visibleRowIds.length"
                            @update:model="toggleAllVisible"
                        />
                    </div>
                </template>

                <template #cell="{ row }">
                    <div class="reference-table__centered">
                        <UiCheckbox
                            :model="selectedIds"
                            :value="row.id"
                            @update:model="updateSelectedIds"
                        />
                    </div>
                </template>
            </UiTableColumn>

            <UiTableColumn
                label="Название"
                width="28.5%"
                :min-width="220"
            >
                <template #label>
                    <UiTableSorter
                        aria-label="Сортировка по названию"
                        :direction="sortDirection"
                        @click="toggleSortDirection"
                    >
                        Название
                    </UiTableSorter>
                </template>

                <template #cell="{ row }">
                    <UiLink
                        accent
                        class="reference-table__title-link"
                        href="javascript:void(0);"
                    >
                        {{ row.title }}
                    </UiLink>
                </template>
            </UiTableColumn>

            <UiTableColumn
                v-slot="{ row }"
                label="Статус"
                width="20%"
                :min-width="168"
            >
                <div
                    :class="[
                        'reference-table__status-tag-box',
                        `reference-table__status-tag-box_${row.status.tone}`,
                    ]"
                >
                    <UiTag
                        class="reference-table__status-tag"
                        size="md"
                        :ticker="false"
                        :background="statusPalette[row.status.tone].background"
                    >
                        <template #icon>
                            <component
                                :is="statusIconMap[row.status.tone]"
                                aria-hidden="true"
                                class="reference-table__status-icon"
                                :style="statusIconStyle(row.status.tone)"
                            />
                        </template>

                        <span>
                            {{ row.status.label }}
                        </span>
                    </UiTag>
                </div>
            </UiTableColumn>

            <UiTableColumn
                v-slot="{ row }"
                label="Дата отправки"
                width="11.8%"
                :min-width="112"
            >
                <div class="reference-table__date">
                    <span>{{ row.sentAtDate }}</span>
                    <span>{{ row.sentAtTime }}</span>
                </div>
            </UiTableColumn>

            <UiTableColumn
                v-slot="{ row }"
                label="Телефон"
                width="15.1%"
                :min-width="132"
            >
                <span class="reference-table__body-text">
                    {{ row.phone }}
                </span>
            </UiTableColumn>

            <UiTableColumn
                v-slot
                label=""
                :width="46"
                trim
                align="center"
            >
                <div class="reference-table__centered">
                    <IconCallTalking
                        aria-hidden="true"
                        class="reference-table__phone-action"
                    />
                </div>
            </UiTableColumn>

            <UiTableColumn
                v-slot="{ row }"
                label="Клиент"
                width="16.6%"
                :min-width="148"
            >
                <div class="reference-table__customer">
                    <UiAvatar
                        :src="row.avatarSrc"
                        size="xs"
                        :name="row.customer"
                    />

                    <UiLink
                        accent
                        class="reference-table__customer-link"
                        href="javascript:void(0);"
                    >
                        {{ row.customer }}
                    </UiLink>
                </div>
            </UiTableColumn>

            <UiTableColumn
                v-slot="{ row }"
                label="Активность"
                width="8%"
                :min-width="76"
                align="center"
            >
                <div class="reference-table__centered">
                    <component
                        :is="row.active ? IconCheckmarkCircle : IconClearCircle"
                        :style="{ color: row.active ? '#20BF84' : '#B7C0CB' }"
                        aria-hidden="true"
                        class="reference-table__activity-icon"
                    />
                </div>
            </UiTableColumn>

            <template #empty>
                <div class="reference-table__empty">
                    Нет данных для отображения
                </div>
            </template>

            <template #footer-summary="{ rowsCount }">
                <span>{{ rowsCount }} элементов</span>
            </template>

            <template #footer-page-size>
                <UiTableFooterSection class="reference-table__footer-control">
                    <span class="reference-table__footer-caption">Показывать:</span>
                    <UiTableFooterButton
                        class="reference-table__footer-button reference-table__footer-button_passive"
                    >
                        по 20
                    </UiTableFooterButton>
                    <span class="reference-table__footer-delimiter">/</span>
                    <UiTableFooterButton
                        class="reference-table__footer-button"
                    >
                        по 50
                    </UiTableFooterButton>
                    <span class="reference-table__footer-delimiter">/</span>
                    <UiTableFooterButton
                        class="reference-table__footer-button"
                    >
                        по 100
                    </UiTableFooterButton>
                </UiTableFooterSection>
            </template>

            <template #footer-export>
                <UiTableFooterSection>
                    <UiTableFooterButton class="reference-table__footer-export">
                        <IconDownloadTo
                            aria-hidden="true"
                            class="reference-table__footer-export-icon"
                        />
                        <span>Выгрузить таблицу</span>
                    </UiTableFooterButton>
                </UiTableFooterSection>
            </template>
        </UiTable>
    </div>
</template>

<script lang="ts" remote setup>
import { computed, ref } from 'vue'

import { DIRECTION } from '@/common/components/table'
import IconCalendar from '../../assets/sprites/actions/calendar.svg'
import IconCallTalking from '../../assets/sprites/communication/call-talking.svg'
import IconCheckmarkCircle from '../../assets/sprites/actions/checkmark-circle.svg'
import IconCheckmarkCircleOutlined from '../../assets/sprites/actions/checkmark-circle-outlined.svg'
import IconClearCircle from '../../assets/sprites/actions/clear-circle.svg'
import IconClearCircleOutlined from '../../assets/sprites/actions/clear-circle-outlined.svg'
import IconDownloadTo from '../../assets/sprites/ui/download-to.svg'
import IconEdit from '../../assets/sprites/ui/edit.svg'
import IconErrorOutlined from '../../assets/sprites/alerts/error-outlined.svg'

import { UiAvatar } from '@/remote/components/avatar'
import { UiCheckbox } from '@/remote/components/checkbox'
import { UiLink } from '@/remote/components/link'
import {
  UiTable,
  UiTableColumn,
  UiTableFooterButton,
  UiTableFooterSection,
  UiTableSorter,
} from '@/remote/components/table'
import { UiTag } from '@/remote/components/tag'

type ReferenceStatusTone = 'draft' | 'canceled' | 'failed' | 'planned' | 'sent'
type ReferenceTableRow = {
  id: number;
  title: string;
  status: {
    label: string;
    tone: ReferenceStatusTone;
  };
  sentAtDate: string;
  sentAtTime: string;
  phone: string;
  customer: string;
  avatarSrc: string;
  active: boolean;
}

const props = defineProps<{
  empty?: boolean;
}>()

const avatarImage = 'https://on-desktop.com/wps/Animals___Cats_Red_Cat_with_open_mouth_044663_.jpg'
const titleCollator = new Intl.Collator('ru', {
  numeric: true,
  sensitivity: 'base',
})

const rows: ReferenceTableRow[] = [
  {
    id: 1,
    title: 'Реактивация спящих клиентов в приложении',
    status: {
      label: 'Черновик',
      tone: 'draft',
    },
    sentAtDate: '18.03.2026',
    sentAtTime: '09:30:00',
    phone: '+7 903 120 44 18',
    customer: 'Анна Белова',
    avatarSrc: avatarImage,
    active: true,
  },
  {
    id: 2,
    title: 'Подборка весенних образов для VIP-сегмента',
    status: {
      label: 'Отменена',
      tone: 'canceled',
    },
    sentAtDate: '17.03.2026',
    sentAtTime: '13:45:00',
    phone: '+7 926 412 08 77',
    customer: 'Илья Новиков',
    avatarSrc: avatarImage,
    active: false,
  },
  {
    id: 3,
    title: 'Напоминание о брошенной корзине за 24 часа',
    status: {
      label: 'Прервана',
      tone: 'failed',
    },
    sentAtDate: '16.03.2026',
    sentAtTime: '19:10:00',
    phone: '+7 916 555 31 20',
    customer: 'Мария Котова',
    avatarSrc: avatarImage,
    active: false,
  },
  {
    id: 4,
    title: 'Приглашение на закрытую распродажу выходного дня',
    status: {
      label: 'Запланирована',
      tone: 'planned',
    },
    sentAtDate: '20.03.2026',
    sentAtTime: '11:00:00',
    phone: '+7 901 700 12 44',
    customer: 'Дмитрий Орлов',
    avatarSrc: avatarImage,
    active: true,
  },
  {
    id: 5,
    title: 'Сервисное уведомление о готовности заказа к выдаче',
    status: {
      label: 'Отправлена',
      tone: 'sent',
    },
    sentAtDate: '15.03.2026',
    sentAtTime: '16:25:00',
    phone: '+7 905 880 64 09',
    customer: 'Елена Ларина',
    avatarSrc: avatarImage,
    active: true,
  },
]

const statusPalette: Record<ReferenceStatusTone, {
  background: string;
  color: string;
}> = {
  draft: {
    background: '#DDE6F6',
    color: '#005EEB',
  },
  canceled: {
    background: '#DDE1E7',
    color: '#7A8797',
  },
  failed: {
    background: '#F7E3E4',
    color: '#E5484D',
  },
  planned: {
    background: '#F8EBD9',
    color: '#EC8B00',
  },
  sent: {
    background: '#DDEFE8',
    color: '#1FA971',
  },
}

const statusIconMap = {
  draft: IconEdit,
  canceled: IconClearCircleOutlined,
  failed: IconErrorOutlined,
  planned: IconCalendar,
  sent: IconCheckmarkCircleOutlined,
} satisfies Record<ReferenceStatusTone, unknown>

const selectedIds = ref<number[]>([])
const sortDirection = ref<DIRECTION | null>(null)

const resolvedRows = computed(() => props.empty ? [] : rows)
const sortedRows = computed(() => {
  if (sortDirection.value === null) {
    return resolvedRows.value
  }

  const items = [...resolvedRows.value]

  items.sort((left, right) => {
    const result = titleCollator.compare(left.title, right.title)

    return sortDirection.value === DIRECTION.ASC ? result : -result
  })

  return items
})

const visibleRowIds = computed(() => sortedRows.value.map((row) => row.id))

const selectedVisibleIds = computed(() => {
  return selectedIds.value.filter((id) => visibleRowIds.value.includes(id))
})

const statusIconStyle = (tone: ReferenceStatusTone) => ({
  color: statusPalette[tone].color,
})

const toggleSortDirection = () => {
  if (sortDirection.value === null) {
    sortDirection.value = DIRECTION.ASC

    return
  }

  if (sortDirection.value === DIRECTION.ASC) {
    sortDirection.value = DIRECTION.DESC

    return
  }

  sortDirection.value = null
}

const toggleAllVisible = (next: unknown) => {
  selectedIds.value = next === true ? [...visibleRowIds.value] : []
}

const updateSelectedIds = (next: unknown) => {
  selectedIds.value = Array.isArray(next)
    ? next.filter((value): value is number => typeof value === 'number')
    : []
}
</script>
