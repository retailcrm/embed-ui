import{h as u,c as m,k as x,a as h,t as d,r as t,q as p,o as v,E as j,w as R}from"./iframe-DnG3g5pW.js";import{_ as r,S}from"./UiDatePicker-f7wPGNEQ.js";import{T as I,A}from"./UiCalendar-7YiFFTw2.js";import{o as z}from"./utils-BqzVSXwn.js";import{u as E,j as n}from"./index-DFg_Ho_i.js";import{A as $}from"./blocks-DBDDY4vL.js";import{T as c}from"./ToReact-DbRAeBf3.js";import"./preload-helper-PPVm8Dsz.js";import"./UiButton-BCon8_Cd.js";import"./predicate-ClulhfEu.js";import"./render-vaNyDQt4.js";import"./composables-CfEvSTVp.js";import"./UiPopper-C8UHJnqx.js";import"./UiTextbox-8JxeifZm.js";import"./plugin-DbbfKnFn.js";import"./index-BAxMPZdI.js";import"./UiMenuItem-CATQK8cQ.js";import"./UiScrollBox-r2qAVLZM.js";import"./ru-Chw6HHdR.js";import"./chevron-right-xEdkHvRN.js";import"./index-nl1gzEpR.js";const q={style:{display:"inline-block"}},F={style:{"margin-top":"8px","font-size":"12px",color:"#666"}},f=u({__name:"UiDatePicker.basic.example",setup(a){const e=t(new Date("2024-11-21T00:00:00")),i=p(()=>e.value?e.value.toISOString():"null");return(o,s)=>(v(),m("div",q,[x(r,{value:e.value,"onUpdate:value":s[0]||(s[0]=l=>e.value=l),placeholder:"Select date"},null,8,["value"]),h("div",F," Selected: "+d(i.value),1)]))}});f.__docgenInfo=Object.assign({displayName:f.name??f.__name},{exportName:"default",displayName:"UiDatePicker.basic.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiDatePicker.basic.example.vue"]});const M={style:{display:"inline-block"}},Y={style:{"margin-top":"8px","font-size":"12px",color:"#666"}},w=u({__name:"UiDatePicker.bounds.example",setup(a){const e=new Date("2024-11-05T00:00:00"),i=new Date("2024-11-25T00:00:00"),o=t(new Date("2024-11-14T00:00:00"));return(s,l)=>(v(),m("div",M,[x(r,{value:o.value,"onUpdate:value":l[0]||(l[0]=P=>o.value=P),"min-date":j(e),"max-date":j(i),placeholder:"Choose date in available range"},null,8,["value","min-date","max-date"]),h("div",Y," Allowed: "+d(j(e).toISOString())+" - "+d(j(i).toISOString()),1)]))}});w.__docgenInfo=Object.assign({displayName:w.name??w.__name},{exportName:"default",displayName:"UiDatePicker.bounds.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiDatePicker.bounds.example.vue"]});const B={style:{display:"inline-block"}},G={style:{"margin-top":"8px","font-size":"12px",color:"#666"}},T=u({__name:"UiDatePicker.confirmed.example",setup(a){const e=t(null),i=p(()=>e.value?e.value.toISOString():"null");return(o,s)=>(v(),m("div",B,[x(r,{value:e.value,"onUpdate:value":s[0]||(s[0]=l=>e.value=l),synchronization:"confirmed",placeholder:"Select date and confirm"},null,8,["value"]),h("div",G," Applied: "+d(i.value),1)]))}});T.__docgenInfo=Object.assign({displayName:T.name??T.__name},{exportName:"default",displayName:"UiDatePicker.confirmed.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiDatePicker.confirmed.example.vue"]});const L={style:{display:"inline-block"}},O=u({__name:"UiDatePicker.locale.example",setup(a){const e=t(new Date("2024-11-21T00:00:00"));return(i,o)=>(v(),m("div",L,[x(r,{value:e.value,"onUpdate:value":o[0]||(o[0]=s=>e.value=s),locale:"ru-RU","first-day-of-week":1,placeholder:"Выберите дату"},null,8,["value"]),o[1]||(o[1]=h("div",{style:{"margin-top":"8px","font-size":"12px",color:"#666"}}," Локаль: ru-RU, firstDayOfWeek: 1 ",-1))]))}});O.__docgenInfo=Object.assign({displayName:O.name??O.__name},{exportName:"default",displayName:"UiDatePicker.locale.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiDatePicker.locale.example.vue"]});const W={style:{display:"inline-block"}},H={style:{"margin-top":"8px","font-size":"12px",color:"#666"}},U=u({__name:"UiDatePicker.quick-options.example",setup(a){const e=t(new Date("2024-11-21T00:00:00")),i=[{label:"Today",value:new Date("2024-11-21T00:00:00")},{label:"Yesterday",value:new Date("2024-11-20T00:00:00")},{label:"This week",value:[new Date("2024-11-18T00:00:00"),new Date("2024-11-24T00:00:00")]}],o=p(()=>e.value?Array.isArray(e.value)?e.value.map(s=>s.toISOString()).join(" - "):e.value.toISOString():"null");return(s,l)=>(v(),m("div",W,[x(r,{value:e.value,"onUpdate:value":l[0]||(l[0]=P=>e.value=P),synchronization:"confirmed","quick-options":i,placeholder:"Use quick options"},null,8,["value"]),h("div",H," Applied: "+d(o.value),1)]))}});U.__docgenInfo=Object.assign({displayName:U.name??U.__name},{exportName:"default",displayName:"UiDatePicker.quick-options.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiDatePicker.quick-options.example.vue"]});const V={style:{display:"grid",gap:"8px"}},X={style:{"font-size":"12px",color:"#666"}},N=u({__name:"UiDatePicker.range.example",setup(a){const e=t([new Date("2024-11-10T00:00:00"),new Date("2024-11-19T00:00:00")]),i=p(()=>!e.value||e.value.length===0?"null":e.value.map(o=>o.toISOString()).join(" - "));return(o,s)=>(v(),m("div",V,[x(r,{value:e.value,"onUpdate:value":s[0]||(s[0]=l=>e.value=l),type:"range",placeholder:"Select period"},null,8,["value"]),h("div",X," Selected: "+d(i.value),1)]))}});N.__docgenInfo=Object.assign({displayName:N.name??N.__name},{exportName:"default",displayName:"UiDatePicker.range.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiDatePicker.range.example.vue"]});function C(a){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...E(),...a.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{id:"uidatepicker",children:"UiDatePicker"}),`
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
`,n.jsx(c,{is:f}),`
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
`,n.jsx(c,{is:T}),`
`,n.jsx(e.h2,{id:"примеры",children:"Примеры"}),`
`,n.jsx(e.h3,{id:"выбор-диапазона",children:"Выбор диапазона"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<UiDatePicker
  v-model:value="value"
  type="range"
/>
`})}),`
`,n.jsx(c,{is:N}),`
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
`,n.jsx(c,{is:U}),`
`,n.jsxs(e.h3,{id:"ограничение-дат-mindate--maxdate",children:["Ограничение дат (",n.jsx(e.code,{children:"minDate"})," / ",n.jsx(e.code,{children:"maxDate"}),")"]}),`
`,n.jsx(c,{is:w}),`
`,n.jsx(e.h3,{id:"локаль-и-первый-день-недели",children:"Локаль и первый день недели"}),`
`,n.jsx(c,{is:O}),`
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
`,n.jsx($,{})]})}function Z(a={}){const{wrapper:e}={...E(),...a.components};return e?n.jsx(e,{...a,children:n.jsx(C,{...a})}):C(a)}const Q=a=>a===null?"null":Array.isArray(a)?`[${a.map(e=>e.toISOString()).join(", ")}]`:a.toISOString(),ge={title:"Components/UiDatePicker",component:r,args:{id:"date-picker-sandbox",value:new Date("2024-11-21T00:00:00"),type:I.SINGLE,appearance:A.SINGLE,synchronization:S.INSTANT,nullable:!1,disabled:!1,readonly:!1,omitYear:!1,placeholder:"Select date",minDate:null,maxDate:null,locale:"en-GB",firstDayOfWeek:null,quickOptions:[],textboxOptions:{},popperOptions:{},popperClass:null,container:null,placement:"bottom"},argTypes:{value:{control:!1},type:{control:"select",options:Object.values(I)},appearance:{control:"select",options:Object.values(A)},synchronization:{control:"select",options:Object.values(S)},nullable:{control:"boolean"},disabled:{control:"boolean"},readonly:{control:"boolean"},omitYear:{control:"boolean"},minDate:{control:"date"},maxDate:{control:"date"},locale:{control:"select",options:["en-GB","es-ES","ru-RU",void 0]},firstDayOfWeek:{control:"select",options:[null,0,1,2,3,4,5,6]},quickOptions:{control:"object"},textboxOptions:{control:"object"},popperOptions:{control:"object"},popperClass:{control:"text"},container:{control:"text"},placement:{control:"text"}},render:a=>({components:{UiDatePicker:r},setup(){const e=t(a.value??null);return R(()=>a.value,i=>{e.value=i??null}),{value:e,props:p(()=>z(a,["value"])),preview:p(()=>Q(e.value))}},template:`
      <div style="display: inline-block; width: 320px;">
          <UiDatePicker
              v-model:value="value"
              v-bind="props"
          />

          <div style="margin-top: 8px; font-size: 12px; color: #666;">
              Value: {{ preview }}
          </div>
      </div>
    `}),parameters:{docs:{page:Z},layout:"centered"}},D={},g={args:{type:I.RANGE,value:[new Date("2024-11-10T00:00:00"),new Date("2024-11-19T00:00:00")]}},_={args:{synchronization:S.CONFIRMED,value:null}},y={args:{synchronization:S.CONFIRMED,quickOptions:[{label:"Today",value:new Date("2024-11-21T00:00:00")},{label:"This week",value:[new Date("2024-11-18T00:00:00"),new Date("2024-11-24T00:00:00")]},{label:"This month",value:[new Date("2024-11-01T00:00:00"),new Date("2024-11-30T00:00:00")]}]}},k={args:{value:new Date("2024-11-14T00:00:00"),minDate:new Date("2024-11-05T00:00:00"),maxDate:new Date("2024-11-25T00:00:00")}},b={args:{locale:"ru-RU",firstDayOfWeek:1,value:new Date("2024-11-21T00:00:00")}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:"{}",...D.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    type: TYPE.RANGE,
    value: [new Date('2024-11-10T00:00:00'), new Date('2024-11-19T00:00:00')]
  }
}`,...g.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    synchronization: SYNCHRONIZATION.CONFIRMED,
    value: null
  }
}`,..._.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    value: new Date('2024-11-14T00:00:00'),
    minDate: new Date('2024-11-05T00:00:00'),
    maxDate: new Date('2024-11-25T00:00:00')
  }
}`,...k.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    locale: 'ru-RU',
    firstDayOfWeek: 1,
    value: new Date('2024-11-21T00:00:00')
  }
}`,...b.parameters?.docs?.source}}};const _e=["Sandbox","Range","Confirmed","QuickOptions","Bounds","RussianLocale"];export{k as Bounds,_ as Confirmed,y as QuickOptions,g as Range,b as RussianLocale,D as Sandbox,_e as __namedExportsOrder,ge as default};
