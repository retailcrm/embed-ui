import{S as r,A as o}from"./index-BN_6-Ncz.js";import{d as m,c as j}from"./createRemoteStoryRender-DbfDIKnd.js";import{d as p}from"./docsOnlyStory-D04fiwRX.js";import{u as x,j as e}from"./index-DC6AVhol.js";import{S as d,A as u}from"./blocks-irvO_Kf_.js";import"./iframe-DDyl2AmK.js";import"./preload-helper-PPVm8Dsz.js";import"./UiAlert-DL1WXFlL.js";import"./UiTransition-C_SZL8sB.js";import"./checkmark-circle-outlined-D7JQQjfO.js";import"./clear-DNT8teyS.js";import"./info-outlined-mI6ap4ux.js";import"./UiAddButton-DPDk1X46.js";import"./UiAvatar-B81jJYDc.js";import"./UiImage-BusBqEVS.js";import"./predicate-ClulhfEu.js";import"./UiAvatarList-Blc2DaUu.js";import"./UiButton-DVSNWWSO.js";import"./render-CFCB9hDK.js";import"./composables-DVi6oeou.js";import"./UiCalendar-qP4zSNGb.js";import"./chevron-right-DhgHXoQF.js";import"./plugin-DBXjfIqs.js";import"./index-BAxMPZdI.js";import"./UiCheckbox-DJtpsEk8.js";import"./done-CPYICBU4.js";import"./utils-BqzVSXwn.js";import"./UiCollapse-BYVlo_1R.js";import"./UiCollapseGroup-DDi5yXSZ.js";import"./UiCopyButton-BpSLbXh0.js";import"./UiTooltip-CgKFebDj.js";import"./UiPopper-CtyW38v3.js";import"./UiDate-S8crmajf.js";import"./ru-Chw6HHdR.js";import"./UiDatePicker-6yuPb3vb.js";import"./UiTextbox-Cp3VoCvx.js";import"./UiMenuItem-BCh28-bQ.js";import"./UiScrollBox-pROz8lVa.js";import"./UiError-DeL8Md7R.js";import"./UiInfobox-Wo7jvY2w.js";import"./UiLink-Ci033uQc.js";import"./UiYandexMap-nHh77mw2.js";import"./add-igqe0Lf_.js";import"./caret-down-S39XXVlx.js";import"./UiPopperTarget-wB-kx3Lr.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./UiModalSidebar-CMdnDQBK.js";import"./uid-BWdYvJYd.js";import"./UiModalWindow-BeFROK4B.js";import"./UiRadio-B7t7SNhJ.js";import"./UiSkeleton-CLxphY9X.js";import"./UiSlider-BrjJ0zPm.js";import"./UiSwitch-CQ1DsvmW.js";import"./UiTag-C_AWhmbM.js";import"./UiTimePicker-Di5bRYuC.js";import"./UiToggleButton-CD1AtQpV.js";import"./UiToolbarButton-Bj-VZc36.js";import"./UiToolbarLink-BwCG9I2I.js";import"./index-CDnKqZOh.js";const b="UiTabGroup",f="UiTab";m(f,[],["default","icon","label","counter","content"]);const v=m(b,["layout","change","update:activeId","update:focusableId","update:menuExpanded"],["default"]);function w(i){return new Worker(""+new URL("UiTab.remote-njjNkNcf.js",import.meta.url).href,{name:i?.name})}function h(i){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...x(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{id:"uitab",children:"UiTab"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"UiTab"})," - набор навигационных вкладок, собранный поверх remote/host-схемы ",e.jsx(n.code,{children:"embed-ui"}),`.
Активная вкладка определяется строковым `,e.jsx(n.code,{children:"id"}),", а если ширины не хватает, лишние элементы убираются в inline dropdown. Для slot-based сценариев ",e.jsx(n.code,{children:"UiTab"})," также может содержать ",e.jsx(n.code,{children:"content"}),", который будет отрисован как активная ",e.jsx(n.code,{children:"tabpanel"}),"."]}),`
`,e.jsx(n.h2,{id:"когда-использовать",children:"Когда использовать"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Нужен компактный row из вкладок для переключения раздела или представления."}),`
`,e.jsxs(n.li,{children:["Для активного состояния достаточно строкового ",e.jsx(n.code,{children:"id"}),", без object-value и кастомного сравнения."]}),`
`,e.jsxs(n.li,{children:["Нужно выбрать внешний вид вкладок: классический ",e.jsx(n.code,{children:"text"})," или более собранный ",e.jsx(n.code,{children:"filled"}),"."]}),`
`,e.jsx(n.li,{children:"Нужно сохранить вкладки в одну строку и переносить лишние элементы в выпадающее меню."}),`
`,e.jsxs(n.li,{children:["Нужна ручная композиция вкладок с иконками и кастомным ",e.jsx(n.code,{children:"label"})," или ",e.jsx(n.code,{children:"counter"}),"."]}),`
`]}),`
`,e.jsx(n.h2,{id:"что-входит-в-текущий-scope",children:"Что входит в текущий scope"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"UiTabGroup"})," управляет header-частью вкладок и активной панелью контента."]}),`
`,e.jsxs(n.li,{children:["Для простых сценариев используйте ",e.jsx(n.code,{children:"items"}),"."]}),`
`,e.jsxs(n.li,{children:["Для иконок, кастомного содержимого и panel-content используйте ",e.jsx(n.code,{children:"UiTab"})," во ",e.jsx(n.code,{children:"default"})," slot."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:'appearance="filled"'})," уже поддержан, включая inline overflow-trigger без порталов."]}),`
`]}),`
`,e.jsx(n.h2,{id:"примеры",children:"Примеры"}),`
`,e.jsxs(n.h3,{id:"1-вкладки-через-items",children:["1. Вкладки через ",e.jsx(n.code,{children:"items"})]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
  <UiTabGroup
    v-model:active-id="activeId"
    :items="items"
    overflowing
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { UiTabGroup } from '@retailcrm/embed-ui-v1-components/remote'

const activeId = ref('overview')

const items = [
  { id: 'overview', label: 'Обзор', counter: '8' },
  { id: 'orders', label: 'Заказы', counter: '12' },
  { id: 'files', label: 'Файлы', counter: '3' },
]
<\/script>
`})}),`
`,e.jsx(d,{of:t}),`
`,e.jsxs(n.h3,{id:"2-вкладки-через-uitab-slot-иконки-и-panel-content",children:["2. Вкладки через ",e.jsx(n.code,{children:"UiTab"}),", slot-иконки и panel content"]}),`
`,e.jsxs(n.p,{children:["Если нужен richer UI, собирайте вкладки вручную через ",e.jsx(n.code,{children:"UiTab"}),"."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
  <UiTabGroup
    v-model:active-id="activeId"
    overflowing
  >
    <UiTab
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :label="item.label"
      :counter="item.counter"
      :disabled="item.disabled"
    >
      <template #icon>
        <IconStar />
      </template>

      <template #content>
        <section>
          <h4>{{ item.label }}</h4>
          <p>Контент активной панели для вкладки {{ item.label }}</p>
        </section>
      </template>
    </UiTab>
  </UiTabGroup>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import IconStar from '~assets/sprites/actions/star.svg'
import {
  UiTab,
  UiTabGroup,
} from '@retailcrm/embed-ui-v1-components/remote'

const activeId = ref('overview')

const items = [
  { id: 'overview', label: 'Обзор', counter: '8' },
  { id: 'orders', label: 'Заказы', counter: '12' },
  { id: 'files', label: 'Файлы', counter: '3' },
]
<\/script>
`})}),`
`,e.jsx(d,{of:s}),`
`,e.jsx(n.h3,{id:"3-filled-вкладки",children:"3. Filled-вкладки"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:'appearance="filled"'})," подходит для более собранного, сегментированного вида."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
  <UiTabGroup
    v-model:active-id="activeId"
    appearance="filled"
  >
    <UiTab
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :label="item.label"
      :counter="item.counter"
    >
      <template #icon>
        <IconStar />
      </template>
    </UiTab>
  </UiTabGroup>
</template>
`})}),`
`,e.jsx(d,{of:l}),`
`,e.jsx(n.h3,{id:"4-overflow-меню",children:"4. Overflow-меню"}),`
`,e.jsx(n.p,{children:"Если места недостаточно, лишние элементы попадают в inline dropdown."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
  <div style="width: 320px;">
    <UiTabGroup
      v-model:active-id="activeId"
      :items="items"
      overflowing
    />
  </div>
</template>
`})}),`
`,e.jsx(d,{of:c}),`
`,e.jsx(n.h2,{id:"поведение",children:"Поведение"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"UiTabGroup"})," эмитит ",e.jsx(n.code,{children:"change"})," и ",e.jsx(n.code,{children:"update:activeId"}),"."]}),`
`,e.jsxs(n.li,{children:["Если ",e.jsx(n.code,{children:"overflowing"})," выключен, все вкладки остаются в одной строке без меню."]}),`
`,e.jsxs(n.li,{children:["Если ",e.jsx(n.code,{children:"overflowing"})," включен, а ширины не хватает, неактивные вкладки переносятся в меню."]}),`
`,e.jsx(n.li,{children:"Активная вкладка старается оставаться в head-части, а не прятаться в меню."}),`
`,e.jsx(n.li,{children:"Disabled-вкладки остаются неинтерактивными и не участвуют в клавиатурной навигации."}),`
`]}),`
`,e.jsx(n.h2,{id:"важные-свойства",children:"Важные свойства"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"activeId"})," - ",e.jsx(n.code,{children:"id"})," активной вкладки."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"items"})," - быстрый способ передать вкладки как массив ",e.jsx(n.code,{children:"{ id, label, counter?, disabled? }"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"size"})," - размер вкладок (",e.jsx(n.code,{children:"sm"}),", ",e.jsx(n.code,{children:"md"}),", ",e.jsx(n.code,{children:"lg"}),")."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"appearance"})," - внешний вид вкладок (",e.jsx(n.code,{children:"text"}),", ",e.jsx(n.code,{children:"filled"}),")."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"overflowing"})," - включает перенос лишних вкладок в выпадающее меню."]}),`
`]}),`
`,e.jsx(n.h2,{id:"слоты",children:"Слоты"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"default"})," у ",e.jsx(n.code,{children:"UiTabGroup"})," - ручная композиция вкладок через ",e.jsx(n.code,{children:"UiTab"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"icon"}),", ",e.jsx(n.code,{children:"label"}),", ",e.jsx(n.code,{children:"counter"}),", ",e.jsx(n.code,{children:"content"})," у ",e.jsx(n.code,{children:"UiTab"})," - кастомизация заголовка вкладки и активной панели."]}),`
`]}),`
`,e.jsx(n.h2,{id:"a11y",children:"A11y"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Head-часть рендерится как ",e.jsx(n.code,{children:"tablist"}),", а сами вкладки - как ",e.jsx(n.code,{children:"tab"}),"."]}),`
`,e.jsxs(n.li,{children:["Если у активной вкладки есть ",e.jsx(n.code,{children:"content"}),", он рендерится как ",e.jsx(n.code,{children:"tabpanel"})," и связывается с кнопкой через ",e.jsx(n.code,{children:"aria-controls"})," и ",e.jsx(n.code,{children:"aria-labelledby"}),"."]}),`
`,e.jsx(n.li,{children:"В группе используется один tab-stop: фокус ставится на активную вкладку, либо на первую доступную."}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"ArrowLeft"}),", ",e.jsx(n.code,{children:"ArrowRight"}),", ",e.jsx(n.code,{children:"ArrowUp"}),", ",e.jsx(n.code,{children:"ArrowDown"})," перемещают фокус и активную вкладку между доступными элементами."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"Home"})," и ",e.jsx(n.code,{children:"End"})," переводят к первой и последней доступной вкладке."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"Enter"})," и ",e.jsx(n.code,{children:"Space"})," выбирают текущую вкладку."]}),`
`,e.jsxs(n.li,{children:["Пункты overflow-меню рендерятся как ",e.jsx(n.code,{children:"menuitemradio"}),"."]}),`
`]}),`
`,e.jsx(n.h2,{id:"api",children:"API"}),`
`,e.jsx(u,{})]})}function T(i={}){const{wrapper:n}={...x(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(h,{...i})}):h(i)}const ye={title:"Components/UiTab",component:v,argTypes:{activeId:{control:!1},items:{control:!1},size:{control:"select",options:Object.values(r)},appearance:{control:"select",options:Object.values(o)},overflowing:{control:"boolean"},withSlots:{control:"boolean"},withContent:{control:"boolean"},containerWidth:{control:{type:"number",min:240,max:960,step:20}}},render:j({worker:w}),parameters:{docs:{page:T},layout:"padded"}},a={args:{appearance:o.TEXT,size:r.MD,overflowing:!0,withSlots:!0,withContent:!0,containerWidth:560}},t=p({args:{appearance:o.TEXT,size:r.MD,overflowing:!0,withSlots:!1,withContent:!1,containerWidth:560}}),s=p({args:{appearance:o.TEXT,size:r.MD,overflowing:!0,withSlots:!0,withContent:!0,containerWidth:560}}),c=p({args:{appearance:o.TEXT,size:r.MD,overflowing:!0,withSlots:!0,withContent:!0,containerWidth:320}}),l=p({args:{appearance:o.FILLED,size:r.MD,overflowing:!1,withSlots:!0,withContent:!0,containerWidth:560}});a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    appearance: APPEARANCE.TEXT,
    size: SIZE.MD,
    overflowing: true,
    withSlots: true,
    withContent: true,
    containerWidth: 560
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    appearance: APPEARANCE.TEXT,
    size: SIZE.MD,
    overflowing: true,
    withSlots: false,
    withContent: false,
    containerWidth: 560
  }
})`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    appearance: APPEARANCE.TEXT,
    size: SIZE.MD,
    overflowing: true,
    withSlots: true,
    withContent: true,
    containerWidth: 560
  }
})`,...s.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    appearance: APPEARANCE.TEXT,
    size: SIZE.MD,
    overflowing: true,
    withSlots: true,
    withContent: true,
    containerWidth: 320
  }
})`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    appearance: APPEARANCE.FILLED,
    size: SIZE.MD,
    overflowing: false,
    withSlots: true,
    withContent: true,
    containerWidth: 560
  }
})`,...l.parameters?.docs?.source}}};const Ie=["Sandbox","BasicTabs","IconTabs","OverflowMenu","FilledTabs"];export{t as BasicTabs,l as FilledTabs,s as IconTabs,c as OverflowMenu,a as Sandbox,Ie as __namedExportsOrder,ye as default};
