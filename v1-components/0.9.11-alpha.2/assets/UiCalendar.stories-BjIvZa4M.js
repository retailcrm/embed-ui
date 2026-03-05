import{h as v,r as i,s as P,o as d,c as m,m as k,a as r,D as h,j as S,x as j,C as x,N as R,a5 as T,a6 as M,G as V}from"./iframe-BVH_DCqJ.js";import{_ as c,A as _,T as N}from"./UiCalendar-C_XcbOW6.js";import{o as W}from"./utils-BqzVSXwn.js";import{j as n}from"./jsx-runtime-D6KpT4Dz.js";import{useMDXComponents as $}from"./index-j4WyJKbG.js";import{A as X}from"./blocks-DsYk5n78.js";import{T as p}from"./ToReact-CJJdVyT1.js";import"./preload-helper-PPVm8Dsz.js";import"./chevron-right-CexaAYzp.js";import"./UiButton-C6ocnXa9.js";import"./predicate-ClulhfEu.js";import"./composables-CHaFQhe2.js";import"./plugin-A_Oax3Sh.js";import"./index-BAxMPZdI.js";import"./index-Be_FDnBe.js";const B=v({__name:"UiCalendar.single.example",setup(s){const e=i(new Date);return(t,a)=>(d(),P(c,{value:e.value,"onUpdate:value":a[0]||(a[0]=o=>e.value=o)},null,8,["value"]))}});B.__docgenInfo={exportName:"default",displayName:"UiCalendar.single.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiCalendar.single.example.vue"]};const O=v({__name:"UiCalendar.range.example",setup(s){const e=i([new Date("2024-11-10"),new Date("2024-11-19")]);return(t,a)=>(d(),P(c,{value:e.value,"onUpdate:value":a[0]||(a[0]=o=>e.value=o),type:"range"},null,8,["value"]))}});O.__docgenInfo={exportName:"default",displayName:"UiCalendar.range.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiCalendar.range.example.vue"]};const Y={style:{display:"grid",gap:"12px",width:"320px"}},H={key:0},q={key:1},G=v({__name:"UiCalendar.nullable.example",setup(s){const e=i(new Date("2024-11-21"));return(t,a)=>(d(),m("div",Y,[k(c,{value:e.value,"onUpdate:value":a[0]||(a[0]=o=>e.value=o),nullable:""},null,8,["value"]),r("div",null,[a[1]||(a[1]=r("strong",null,"Value:",-1)),e.value?(d(),m("span",H,h(e.value.toDateString()),1)):(d(),m("span",q," null "))])]))}});G.__docgenInfo={exportName:"default",displayName:"UiCalendar.nullable.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiCalendar.nullable.example.vue"]};const z={style:{display:"grid",gap:"12px",width:"320px"}},L=v({__name:"UiCalendar.bounds.example",setup(s){const e=new Date("2024-11-05"),t=new Date("2024-11-25"),a=i([new Date("2024-11-10"),new Date("2024-11-19")]),o=S(()=>a.value.length===0?"[]":a.value.length===1?`[${a.value[0].toDateString()}]`:`[${a.value[0].toDateString()} - ${a.value[1].toDateString()}]`);return(E,l)=>(d(),m("div",z,[k(c,{value:a.value,"onUpdate:value":l[0]||(l[0]=u=>a.value=u),type:"range","min-date":j(e),"max-date":j(t)},null,8,["value","min-date","max-date"]),r("div",null,[l[1]||(l[1]=r("strong",null,"Min:",-1)),x(" "+h(j(e).toDateString()),1)]),r("div",null,[l[2]||(l[2]=r("strong",null,"Max:",-1)),x(" "+h(j(t).toDateString()),1)]),r("div",null,[l[3]||(l[3]=r("strong",null,"Value:",-1)),x(" "+h(o.value),1)])]))}});L.__docgenInfo={exportName:"default",displayName:"UiCalendar.bounds.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiCalendar.bounds.example.vue"]};const J={style:{display:"grid",gap:"12px"}},I=v({__name:"UiCalendar.double-range.example",setup(s){const e=i([new Date("2024-11-10"),new Date("2024-12-08")]),t=S(()=>e.value.length===0?"[]":e.value.length===1?`[${e.value[0].toDateString()}]`:`[${e.value[0].toDateString()} - ${e.value[1].toDateString()}]`);return(a,o)=>(d(),m("div",J,[k(c,{value:e.value,"onUpdate:value":o[0]||(o[0]=E=>e.value=E),appearance:"double",type:"range"},null,8,["value"]),r("div",null,[o[1]||(o[1]=r("strong",null,"Value:",-1)),x(" "+h(t.value),1)])]))}});I.__docgenInfo={exportName:"default",displayName:"UiCalendar.double-range.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiCalendar.double-range.example.vue"]};const K={style:{display:"grid",gap:"12px"}},Q={style:{display:"flex",gap:"8px","align-items":"center","flex-wrap":"wrap"}},F=v({__name:"UiCalendar.locale.example",setup(s){const e=i(new Date("2024-11-21")),t=i("en-GB"),a=i("auto"),o=S(()=>a.value==="auto"?void 0:Number(a.value));return(E,l)=>(d(),m("div",K,[r("div",Q,[r("label",null,[l[4]||(l[4]=x(" Locale ",-1)),R(r("select",{"onUpdate:modelValue":l[0]||(l[0]=u=>t.value=u)},[...l[3]||(l[3]=[r("option",{value:"en-GB"},"en-GB",-1),r("option",{value:"es-ES"},"es-ES",-1),r("option",{value:"ru-RU"},"ru-RU",-1)])],512),[[T,t.value]])]),r("label",null,[l[6]||(l[6]=x(" First day ",-1)),R(r("select",{"onUpdate:modelValue":l[1]||(l[1]=u=>a.value=u)},[...l[5]||(l[5]=[M('<option value="auto">auto</option><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option>',8)])],512),[[T,a.value]])])]),k(c,{value:e.value,"onUpdate:value":l[2]||(l[2]=u=>e.value=u),locale:t.value,"first-day-of-week":o.value},null,8,["value","locale","first-day-of-week"])]))}});F.__docgenInfo={exportName:"default",displayName:"UiCalendar.locale.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiCalendar.locale.example.vue"]};function A(s){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...$(),...s.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{id:"uicalendar",children:"UiCalendar"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"UiCalendar"})," - компонент выбора даты и диапазона дат для встраиваемых интерфейсов."]}),`
`,n.jsx(e.h2,{id:"для-чего-подходит",children:"Для чего подходит"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"выбор одной даты (дедлайн, дата события, день отгрузки);"}),`
`,n.jsx(e.li,{children:"выбор диапазона (период отчета, фильтр по датам);"}),`
`,n.jsxs(e.li,{children:["сценарии с ограничением доступных дат (",n.jsx(e.code,{children:"minDate"}),"/",n.jsx(e.code,{children:"maxDate"}),");"]}),`
`,n.jsxs(e.li,{children:["локализованные интерфейсы (",n.jsx(e.code,{children:"en-GB"}),", ",n.jsx(e.code,{children:"es-ES"}),", ",n.jsx(e.code,{children:"ru-RU"}),")."]}),`
`]}),`
`,n.jsx(e.h2,{id:"быстрый-старт",children:"Быстрый старт"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
  <UiCalendar v-model:value="value" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UiCalendar } from '@retailcrm/embed-ui-v1-components/remote'

const value = ref<Date | null>(new Date())
<\/script>
`})}),`
`,n.jsx(p,{is:B}),`
`,n.jsx(e.h2,{id:"импорт",children:"Импорт"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-ts",children:`import { UiCalendar } from '@retailcrm/embed-ui-v1-components/remote'
`})}),`
`,n.jsxs(e.h2,{id:"модель-данных-value",children:["Модель данных (",n.jsx(e.code,{children:"value"}),")"]}),`
`,n.jsxs(e.p,{children:["Значение зависит от ",n.jsx(e.code,{children:"type"}),":"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:'type="single"'}),": ",n.jsx(e.code,{children:"Date | null"}),";"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:'type="range"'}),": ",n.jsx(e.code,{children:"Date[]"}),"."]}),`
`]}),`
`,n.jsx(e.p,{children:"Рекомендация:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["для ",n.jsx(e.code,{children:"single"})," храните ",n.jsx(e.code,{children:"ref<Date | null>"}),";"]}),`
`,n.jsxs(e.li,{children:["для ",n.jsx(e.code,{children:"range"})," храните ",n.jsx(e.code,{children:"ref<Date[]>"}),"."]}),`
`]}),`
`,n.jsx(e.h2,{id:"сценарии-использования",children:"Сценарии использования"}),`
`,n.jsx(e.h3,{id:"1-диапазон-дат",children:"1) Диапазон дат"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
  <UiCalendar v-model:value="value" type="range" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UiCalendar } from '@retailcrm/embed-ui-v1-components/remote'

const value = ref<Date[]>([
  new Date('2024-11-10'),
  new Date('2024-11-19'),
])
<\/script>
`})}),`
`,n.jsx(p,{is:O}),`
`,n.jsxs(e.h3,{id:"2-сброс-значения-nullable",children:["2) Сброс значения (",n.jsx(e.code,{children:"nullable"}),")"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<UiCalendar v-model:value="value" nullable />
`})}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"nullable"})," полезен, когда пользователь должен иметь возможность снять выбор даты в ",n.jsx(e.code,{children:"single"}),"-режиме."]}),`
`,n.jsx(p,{is:G}),`
`,n.jsxs(e.h3,{id:"3-два-месяца-одновременно-appearancedouble",children:["3) Два месяца одновременно (",n.jsx(e.code,{children:'appearance="double"'}),")"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<UiCalendar
  v-model:value="value"
  type="range"
  appearance="double"
/>
`})}),`
`,n.jsx(e.p,{children:"Подходит для выбора диапазонов, которые часто пересекают границы месяцев."}),`
`,n.jsx(p,{is:I}),`
`,n.jsx(e.h3,{id:"4-ограничение-доступных-дат",children:"4) Ограничение доступных дат"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<UiCalendar
  v-model:value="value"
  type="range"
  :min-date="new Date('2024-11-05')"
  :max-date="new Date('2024-11-25')"
/>
`})}),`
`,n.jsx(p,{is:L}),`
`,n.jsx(e.h3,{id:"5-локаль-и-первый-день-недели",children:"5) Локаль и первый день недели"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<UiCalendar
  v-model:value="value"
  locale="ru-RU"
  :first-day-of-week="1"
/>
`})}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"firstDayOfWeek"})," принимает значения от ",n.jsx(e.code,{children:"0"})," до ",n.jsx(e.code,{children:"6"}),":"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"0"})," - неделя начинается с воскресенья;"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"1"})," - неделя начинается с понедельника;"]}),`
`,n.jsx(e.li,{children:"и так далее."}),`
`]}),`
`,n.jsx(p,{is:F}),`
`,n.jsx(e.h2,{id:"события",children:"События"}),`
`,n.jsx(e.p,{children:"Компонент эмитит:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"update:value"})," - основное событие обновления значения;"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"change"})," - событие пользовательского выбора."]}),`
`]}),`
`,n.jsx(e.p,{children:"Пример явной подписки:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<UiCalendar
  :value="value"
  @update:value="value = $event"
  @change="onCalendarChange"
/>
`})}),`
`,n.jsx(e.h2,{id:"управление-с-клавиатуры",children:"Управление с клавиатуры"}),`
`,n.jsx(e.p,{children:"В режиме дней:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"ArrowLeft"})," / ",n.jsx(e.code,{children:"ArrowRight"})," - перейти на день назад/вперед;"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"ArrowUp"})," / ",n.jsx(e.code,{children:"ArrowDown"})," - перейти на неделю назад/вперед;"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"Home"})," / ",n.jsx(e.code,{children:"End"})," - перейти к началу/концу недели;"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"PageUp"})," / ",n.jsx(e.code,{children:"PageDown"})," - предыдущий/следующий месяц;"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"Shift + PageUp"})," / ",n.jsx(e.code,{children:"Shift + PageDown"})," - предыдущий/следующий год;"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"Enter"})," / ",n.jsx(e.code,{children:"Space"})," - выбрать дату или границу диапазона."]}),`
`]}),`
`,n.jsx(e.h2,{id:"доступность-a11y",children:"Доступность (A11y)"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"UiCalendar"})," реализует ",n.jsx(e.code,{children:"grid"}),"-паттерн для интерактивного выбора:"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["корректные роли ",n.jsx(e.code,{children:"grid"})," / ",n.jsx(e.code,{children:"row"})," / ",n.jsx(e.code,{children:"gridcell"}),";"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"aria-selected"})," для выбранных дат;"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"aria-disabled"})," для заблокированных дат;"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:'aria-current="date"'})," для сегодняшней даты;"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"aria-describedby"})," с подсказкой горячих клавиш;"]}),`
`,n.jsxs(e.li,{children:["live-анонсы (",n.jsx(e.code,{children:"aria-live"}),") при изменении выбора."]}),`
`]}),`
`,n.jsxs(e.h2,{id:"важное-про-rpc-и-date",children:["Важное про RPC и ",n.jsx(e.code,{children:"Date"})]}),`
`,n.jsxs(e.p,{children:["В текущем стеке библиотеки значения ",n.jsx(e.code,{children:"Date"})," в ",n.jsx(e.code,{children:"props"}),"/событиях ",n.jsx(e.code,{children:"UiCalendar"}),` корректно проходят через RPC.
Если строите внешние долгоживущие контракты поверх вашего API, можно дополнительно нормализовать даты до ISO-строк или timestamp.`]}),`
`,n.jsx(e.h2,{id:"полный-api",children:"Полный API"}),`
`,n.jsx(X,{})]})}function Z(s={}){const{wrapper:e}={...$(),...s.components};return e?n.jsx(e,{...s,children:n.jsx(A,{...s})}):A(s)}const ve={title:"Components/UiCalendar",component:c,args:{value:new Date("2024-11-21T15:30:00"),type:N.SINGLE,appearance:_.SINGLE,nullable:!1,locale:"en-GB",minDate:null,maxDate:null,firstDayOfWeek:void 0},argTypes:{value:{control:!1},type:{control:"select",options:Object.values(N)},appearance:{control:"select",options:Object.values(_)},nullable:{control:"boolean"},locale:{control:"select",options:["en-GB","es-ES","ru-RU"]},minDate:{control:"date"},maxDate:{control:"date"},firstDayOfWeek:{control:"select",options:[void 0,0,1,2,3,4,5,6]}},render:s=>({components:{UiCalendar:c},setup(){const e=i(s.value??null);return V(()=>s.value,t=>{e.value=t??null}),{value:e,props:S(()=>W(s,["value"]))}},template:`
      <UiCalendar
          v-model:value="value"
          v-bind="props"
      />
    `}),parameters:{docs:{page:Z},layout:"centered"}},g={},D={args:{type:N.RANGE,value:[new Date("2024-11-10T00:00:00"),new Date("2024-11-19T00:00:00")]}},f={args:{appearance:_.DOUBLE}},b={args:{value:new Date("2024-11-21T00:00:00"),nullable:!0}},y={args:{value:new Date("2024-11-14T00:00:00"),minDate:new Date("2024-11-05T00:00:00"),maxDate:new Date("2024-11-25T00:00:00")}},w={args:{type:N.RANGE,appearance:_.DOUBLE,value:[new Date("2024-11-10T00:00:00"),new Date("2024-12-08T00:00:00")]}},U={args:{firstDayOfWeek:1}},C={args:{locale:"ru-RU"}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:"{}",...g.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    type: TYPE.RANGE,
    value: [new Date('2024-11-10T00:00:00'), new Date('2024-11-19T00:00:00')]
  }
}`,...D.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    appearance: APPEARANCE.DOUBLE
  }
}`,...f.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    value: new Date('2024-11-21T00:00:00'),
    nullable: true
  }
}`,...b.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    value: new Date('2024-11-14T00:00:00'),
    minDate: new Date('2024-11-05T00:00:00'),
    maxDate: new Date('2024-11-25T00:00:00')
  }
}`,...y.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    type: TYPE.RANGE,
    appearance: APPEARANCE.DOUBLE,
    value: [new Date('2024-11-10T00:00:00'), new Date('2024-12-08T00:00:00')]
  }
}`,...w.parameters?.docs?.source}}};U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  args: {
    firstDayOfWeek: 1
  }
}`,...U.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    locale: 'ru-RU'
  }
}`,...C.parameters?.docs?.source}}};const he=["Sandbox","Range","Double","Nullable","Bounded","RangeDouble","FirstDayMonday","RussianLocale"];export{y as Bounded,f as Double,U as FirstDayMonday,b as Nullable,D as Range,w as RangeDouble,C as RussianLocale,g as Sandbox,he as __namedExportsOrder,ve as default};
