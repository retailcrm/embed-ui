import{h as u,r as t,j as d,c as m,m as x,a as h,t as p,o as v,E as j,w as R}from"./iframe-DCDVANl5.js";import{_ as s,S as _}from"./UiDatePicker-DvwGCZ18.js";import{T,A as U}from"./UiCalendar-Ctz2sC7Z.js";import{o as z}from"./utils-BqzVSXwn.js";import{j as n}from"./jsx-runtime-CUtLY3pZ.js";import{useMDXComponents as O}from"./index-DwIA-ESQ.js";import{A as $}from"./blocks-Cr0w7RcH.js";import{T as c}from"./ToReact-CfRlBj5r.js";import"./preload-helper-PPVm8Dsz.js";import"./UiButton-ChRPCksm.js";import"./predicate-ClulhfEu.js";import"./render-Bpb61ZF3.js";import"./composables-ACcgJ6G0.js";import"./UiPopper-BfZHweql.js";import"./UiTextbox-Dschc3ky.js";import"./plugin-DGcvpriV.js";import"./index-BAxMPZdI.js";import"./UiMenuItem-Coadc8Ox.js";import"./UiScrollBox-r3S53o2O.js";import"./ru-WeKkgns0.js";import"./chevron-right-IKWnDh1P.js";import"./index-EpkwYzaG.js";const q={style:{display:"inline-block"}},F={style:{"margin-top":"8px","font-size":"12px",color:"#666"}},N=u({__name:"UiDatePicker.basic.example",setup(o){const e=t(new Date("2024-11-21T00:00:00")),l=d(()=>e.value?e.value.toISOString():"null");return(a,r)=>(v(),m("div",q,[x(s,{value:e.value,"onUpdate:value":r[0]||(r[0]=i=>e.value=i),placeholder:"Select date"},null,8,["value"]),h("div",F," Selected: "+p(l.value),1)]))}});N.__docgenInfo={exportName:"default",displayName:"UiDatePicker.basic.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiDatePicker.basic.example.vue"]};const M={style:{display:"inline-block"}},Y={style:{"margin-top":"8px","font-size":"12px",color:"#666"}},P=u({__name:"UiDatePicker.bounds.example",setup(o){const e=new Date("2024-11-05T00:00:00"),l=new Date("2024-11-25T00:00:00"),a=t(new Date("2024-11-14T00:00:00"));return(r,i)=>(v(),m("div",M,[x(s,{value:a.value,"onUpdate:value":i[0]||(i[0]=w=>a.value=w),"min-date":j(e),"max-date":j(l),placeholder:"Choose date in available range"},null,8,["value","min-date","max-date"]),h("div",Y," Allowed: "+p(j(e).toISOString())+" - "+p(j(l).toISOString()),1)]))}});P.__docgenInfo={exportName:"default",displayName:"UiDatePicker.bounds.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiDatePicker.bounds.example.vue"]};const B={style:{display:"inline-block"}},G={style:{"margin-top":"8px","font-size":"12px",color:"#666"}},I=u({__name:"UiDatePicker.confirmed.example",setup(o){const e=t(null),l=d(()=>e.value?e.value.toISOString():"null");return(a,r)=>(v(),m("div",B,[x(s,{value:e.value,"onUpdate:value":r[0]||(r[0]=i=>e.value=i),synchronization:"confirmed",placeholder:"Select date and confirm"},null,8,["value"]),h("div",G," Applied: "+p(l.value),1)]))}});I.__docgenInfo={exportName:"default",displayName:"UiDatePicker.confirmed.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiDatePicker.confirmed.example.vue"]};const L={style:{display:"inline-block"}},A=u({__name:"UiDatePicker.locale.example",setup(o){const e=t(new Date("2024-11-21T00:00:00"));return(l,a)=>(v(),m("div",L,[x(s,{value:e.value,"onUpdate:value":a[0]||(a[0]=r=>e.value=r),locale:"ru-RU","first-day-of-week":1,placeholder:"Выберите дату"},null,8,["value"]),a[1]||(a[1]=h("div",{style:{"margin-top":"8px","font-size":"12px",color:"#666"}}," Локаль: ru-RU, firstDayOfWeek: 1 ",-1))]))}});A.__docgenInfo={exportName:"default",displayName:"UiDatePicker.locale.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiDatePicker.locale.example.vue"]};const W={style:{display:"inline-block"}},H={style:{"margin-top":"8px","font-size":"12px",color:"#666"}},C=u({__name:"UiDatePicker.quick-options.example",setup(o){const e=t(new Date("2024-11-21T00:00:00")),l=[{label:"Today",value:new Date("2024-11-21T00:00:00")},{label:"Yesterday",value:new Date("2024-11-20T00:00:00")},{label:"This week",value:[new Date("2024-11-18T00:00:00"),new Date("2024-11-24T00:00:00")]}],a=d(()=>e.value?Array.isArray(e.value)?e.value.map(r=>r.toISOString()).join(" - "):e.value.toISOString():"null");return(r,i)=>(v(),m("div",W,[x(s,{value:e.value,"onUpdate:value":i[0]||(i[0]=w=>e.value=w),synchronization:"confirmed","quick-options":l,placeholder:"Use quick options"},null,8,["value"]),h("div",H," Applied: "+p(a.value),1)]))}});C.__docgenInfo={exportName:"default",displayName:"UiDatePicker.quick-options.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiDatePicker.quick-options.example.vue"]};const V={style:{display:"grid",gap:"8px"}},X={style:{"font-size":"12px",color:"#666"}},E=u({__name:"UiDatePicker.range.example",setup(o){const e=t([new Date("2024-11-10T00:00:00"),new Date("2024-11-19T00:00:00")]),l=d(()=>!e.value||e.value.length===0?"null":e.value.map(a=>a.toISOString()).join(" - "));return(a,r)=>(v(),m("div",V,[x(s,{value:e.value,"onUpdate:value":r[0]||(r[0]=i=>e.value=i),type:"range",placeholder:"Select period"},null,8,["value"]),h("div",X," Selected: "+p(l.value),1)]))}});E.__docgenInfo={exportName:"default",displayName:"UiDatePicker.range.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiDatePicker.range.example.vue"]};function S(o){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...O(),...o.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{id:"uidatepicker",children:"UiDatePicker"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"UiDatePicker"})," - компонент выбора даты и диапазона дат поверх ",n.jsx(e.code,{children:"UiCalendar"})," с полем ввода и popper-контейнером."]}),`
`,n.jsx(e.h2,{id:"когда-использовать",children:"Когда использовать"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"фильтры по дате/периоду в embedded-интерфейсах;"}),`
`,n.jsx(e.li,{children:"формы с выбором одной даты или диапазона;"}),`
`,n.jsxs(e.li,{children:["сценарии с быстрыми пресетами (",n.jsx(e.code,{children:"quickOptions"}),");"]}),`
`,n.jsxs(e.li,{children:["формы, где нужно подтвердить выбор через ",n.jsx(e.code,{children:"Apply"}),"."]}),`
`]}),`
`,n.jsx(e.h2,{id:"импорт",children:"Импорт"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-ts",children:`import { UiDatePicker } from '@retailcrm/embed-ui-v1-components/remote'
`})}),`
`,n.jsx(e.h2,{id:"базовое-использование",children:"Базовое использование"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
  <UiDatePicker v-model:value="value" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UiDatePicker } from '@retailcrm/embed-ui-v1-components/remote'

const value = ref<Date | null>(new Date())
<\/script>
`})}),`
`,n.jsx(c,{is:N}),`
`,n.jsx(e.h2,{id:"модель-данных",children:"Модель данных"}),`
`,n.jsxs(e.p,{children:["Тип значения зависит от ",n.jsx(e.code,{children:"type"}),":"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:'type="single"'})," -> ",n.jsx(e.code,{children:"Date | null"}),";"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:'type="range"'})," -> ",n.jsx(e.code,{children:"Date[] | null"}),"."]}),`
`]}),`
`,n.jsx(e.p,{children:"События:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"update:value"})," - событие для ",n.jsx(e.code,{children:"v-model:value"}),";"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"change"})," - пользовательское изменение значения;"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"open"})," / ",n.jsx(e.code,{children:"close"})," - открытие и закрытие popper."]}),`
`]}),`
`,n.jsx(e.h2,{id:"режимы-синхронизации",children:"Режимы синхронизации"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:'synchronization="instant"'}),":"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["в ",n.jsx(e.code,{children:"single"})," значение эмитится сразу после выбора даты;"]}),`
`,n.jsxs(e.li,{children:["в ",n.jsx(e.code,{children:"range"})," эмит после выбора второй границы."]}),`
`]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:'synchronization="confirmed"'}),":"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"выбор хранится во внутреннем состоянии;"}),`
`,n.jsxs(e.li,{children:["для публикации значения используйте ",n.jsx(e.code,{children:"Apply"}),";"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"Clear"})," очищает выбранное значение."]}),`
`]}),`
`,n.jsx(c,{is:I}),`
`,n.jsx(e.h2,{id:"примеры",children:"Примеры"}),`
`,n.jsx(e.h3,{id:"выбор-диапазона",children:"Выбор диапазона"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<UiDatePicker
  v-model:value="value"
  type="range"
/>
`})}),`
`,n.jsx(c,{is:E}),`
`,n.jsxs(e.h3,{id:"быстрые-пресеты-quickoptions",children:["Быстрые пресеты (",n.jsx(e.code,{children:"quickOptions"}),")"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<UiDatePicker
  v-model:value="value"
  synchronization="confirmed"
  :quick-options="[
    { label: 'Today', value: new Date() },
    { label: 'This week', value: [new Date('2024-11-18'), new Date('2024-11-24')] },
  ]"
/>
`})}),`
`,n.jsx(c,{is:C}),`
`,n.jsxs(e.h3,{id:"ограничение-дат-mindate--maxdate",children:["Ограничение дат (",n.jsx(e.code,{children:"minDate"})," / ",n.jsx(e.code,{children:"maxDate"}),")"]}),`
`,n.jsx(c,{is:P}),`
`,n.jsx(e.h3,{id:"локаль-и-первый-день-недели",children:"Локаль и первый день недели"}),`
`,n.jsx(c,{is:A}),`
`,n.jsx(e.h2,{id:"a11y-и-клавиатура",children:"A11y и клавиатура"}),`
`,n.jsxs(e.p,{children:["Компонент использует паттерн ",n.jsx(e.code,{children:"combobox"})," + ",n.jsx(e.code,{children:"dialog"})," + ",n.jsx(e.code,{children:"grid"}),":"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:'role="combobox"'})," на корневом элементе;"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:'role="dialog"'})," на popup;"]}),`
`,n.jsxs(e.li,{children:["внутри popup используется ",n.jsx(e.code,{children:"UiCalendar"})," с семантикой ",n.jsx(e.code,{children:"grid"}),"."]}),`
`]}),`
`,n.jsx(e.p,{children:"Клавиатура в textbox:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"ArrowDown"})," / ",n.jsx(e.code,{children:"ArrowUp"})," - открыть popup;"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"Enter"})," - открыть popup; в ",n.jsx(e.code,{children:"confirmed"})," при открытом popup эквивалент кнопке ",n.jsx(e.code,{children:"Apply"}),";"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"Escape"})," - закрыть popup."]}),`
`]}),`
`,n.jsxs(e.p,{children:["После открытия календаря доступны клавиши навигации ",n.jsx(e.code,{children:"UiCalendar"})," (",n.jsx(e.code,{children:"Arrow"}),", ",n.jsx(e.code,{children:"Home/End"}),", ",n.jsx(e.code,{children:"PageUp/PageDown"}),", ",n.jsx(e.code,{children:"Enter/Space"}),")."]}),`
`,n.jsx(e.h2,{id:"ограничения-текущей-версии",children:"Ограничения текущей версии"}),`
`,n.jsxs(e.p,{children:["Вложенный выбор времени внутри ",n.jsx(e.code,{children:"UiDatePicker"}),` в текущей версии не поддерживается.
Для выбора времени используйте отдельный `,n.jsx(e.code,{children:"UiTimePicker"}),"."]}),`
`,n.jsx(e.h2,{id:"полный-api",children:"Полный API"}),`
`,n.jsx($,{})]})}function Z(o={}){const{wrapper:e}={...O(),...o.components};return e?n.jsx(e,{...o,children:n.jsx(S,{...o})}):S(o)}const Q=o=>o===null?"null":Array.isArray(o)?`[${o.map(e=>e.toISOString()).join(", ")}]`:o.toISOString(),ke={title:"Components/UiDatePicker",component:s,args:{id:"date-picker-sandbox",value:new Date("2024-11-21T00:00:00"),type:T.SINGLE,appearance:U.SINGLE,synchronization:_.INSTANT,nullable:!1,disabled:!1,readonly:!1,omitYear:!1,placeholder:"Select date",minDate:null,maxDate:null,locale:"en-GB",firstDayOfWeek:null,quickOptions:[],textboxOptions:{},popperOptions:{},popperClass:null,container:null,placement:"bottom"},argTypes:{value:{control:!1},type:{control:"select",options:Object.values(T)},appearance:{control:"select",options:Object.values(U)},synchronization:{control:"select",options:Object.values(_)},nullable:{control:"boolean"},disabled:{control:"boolean"},readonly:{control:"boolean"},omitYear:{control:"boolean"},minDate:{control:"date"},maxDate:{control:"date"},locale:{control:"select",options:["en-GB","es-ES","ru-RU",void 0]},firstDayOfWeek:{control:"select",options:[null,0,1,2,3,4,5,6]},quickOptions:{control:"object"},textboxOptions:{control:"object"},popperOptions:{control:"object"},popperClass:{control:"text"},container:{control:"text"},placement:{control:"text"}},render:o=>({components:{UiDatePicker:s},setup(){const e=t(o.value??null);return R(()=>o.value,l=>{e.value=l??null}),{value:e,props:d(()=>z(o,["value"])),preview:d(()=>Q(e.value))}},template:`
      <div style="display: inline-block; width: 320px;">
          <UiDatePicker
              v-model:value="value"
              v-bind="props"
          />

          <div style="margin-top: 8px; font-size: 12px; color: #666;">
              Value: {{ preview }}
          </div>
      </div>
    `}),parameters:{docs:{page:Z},layout:"centered"}},D={},g={args:{type:T.RANGE,value:[new Date("2024-11-10T00:00:00"),new Date("2024-11-19T00:00:00")]}},k={args:{synchronization:_.CONFIRMED,value:null}},y={args:{synchronization:_.CONFIRMED,quickOptions:[{label:"Today",value:new Date("2024-11-21T00:00:00")},{label:"This week",value:[new Date("2024-11-18T00:00:00"),new Date("2024-11-24T00:00:00")]},{label:"This month",value:[new Date("2024-11-01T00:00:00"),new Date("2024-11-30T00:00:00")]}]}},f={args:{value:new Date("2024-11-14T00:00:00"),minDate:new Date("2024-11-05T00:00:00"),maxDate:new Date("2024-11-25T00:00:00")}},b={args:{locale:"ru-RU",firstDayOfWeek:1,value:new Date("2024-11-21T00:00:00")}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:"{}",...D.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    type: TYPE.RANGE,
    value: [new Date('2024-11-10T00:00:00'), new Date('2024-11-19T00:00:00')]
  }
}`,...g.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    synchronization: SYNCHRONIZATION.CONFIRMED,
    value: null
  }
}`,...k.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    synchronization: SYNCHRONIZATION.CONFIRMED,
    quickOptions: [{
      label: 'Today',
      value: new Date('2024-11-21T00:00:00')
    }, {
      label: 'This week',
      value: [new Date('2024-11-18T00:00:00'), new Date('2024-11-24T00:00:00')]
    }, {
      label: 'This month',
      value: [new Date('2024-11-01T00:00:00'), new Date('2024-11-30T00:00:00')]
    }]
  }
}`,...y.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    value: new Date('2024-11-14T00:00:00'),
    minDate: new Date('2024-11-05T00:00:00'),
    maxDate: new Date('2024-11-25T00:00:00')
  }
}`,...f.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    locale: 'ru-RU',
    firstDayOfWeek: 1,
    value: new Date('2024-11-21T00:00:00')
  }
}`,...b.parameters?.docs?.source}}};const ye=["Sandbox","Range","Confirmed","QuickOptions","Bounds","RussianLocale"];export{f as Bounds,k as Confirmed,y as QuickOptions,g as Range,b as RussianLocale,D as Sandbox,ye as __namedExportsOrder,ke as default};
