import{h as d,r as m,c as p,m as t,a,t as x,o as u,w as S,j as V}from"./iframe-7PfFZbMo.js";import{_ as l}from"./UiTimePicker-ASS-0iEz.js";import{o as D}from"./utils-BqzVSXwn.js";import{j as i}from"./jsx-runtime-oUFsCJCe.js";import{useMDXComponents as k}from"./index-nKJCzsSA.js";import{A as z}from"./blocks-DxbhbOcf.js";import{T as c}from"./ToReact-zb7Edybv.js";import"./preload-helper-PPVm8Dsz.js";import"./UiMenuItem-DXTUAhdO.js";import"./UiPopper-zlrO7XO_.js";import"./UiScrollBox-CK9r-dGa.js";import"./UiTextbox-BM0nELoK.js";import"./composables-DmHLbFXN.js";import"./plugin-mT4wte91.js";import"./index-BAxMPZdI.js";import"./index-a22oIHiu.js";const A={style:{display:"grid",gap:"8px"}},C={style:{"font-size":"12px",color:"#666"}},f=d({__name:"UiTimePicker.basic.example",setup(s){const e=m("10:30");return(r,n)=>(u(),p("div",A,[t(l,{value:e.value,"onUpdate:value":n[0]||(n[0]=o=>e.value=o),placeholder:"Select time"},null,8,["value"]),a("div",C," Selected: "+x(e.value||"—"),1)]))}});f.__docgenInfo={exportName:"default",displayName:"UiTimePicker.basic.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiTimePicker.basic.example.vue"]};const E={style:{display:"grid",gap:"8px"}},F={style:{"font-size":"12px",color:"#666"}},T=d({__name:"UiTimePicker.interval.example",setup(s){const e=m("09:45");return(r,n)=>(u(),p("div",E,[t(l,{value:e.value,"onUpdate:value":n[0]||(n[0]=o=>e.value=o),interval:15,placeholder:"15 min interval"},null,8,["value"]),a("div",F," Step: 15 min, value: "+x(e.value||"—"),1)]))}});T.__docgenInfo={exportName:"default",displayName:"UiTimePicker.interval.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiTimePicker.interval.example.vue"]};const I={style:{display:"grid",gap:"8px"}},R={style:{"font-size":"12px",color:"#666"}},U=d({__name:"UiTimePicker.bounds.example",setup(s){const e=m("11:00");return(r,n)=>(u(),p("div",I,[t(l,{value:e.value,"onUpdate:value":n[0]||(n[0]=o=>e.value=o),"min-time":[9,30],"max-time":[18,0],placeholder:"Working hours"},null,8,["value"]),a("div",R," Range: 09:30 - 18:00, value: "+x(e.value||"—"),1)]))}});U.__docgenInfo={exportName:"default",displayName:"UiTimePicker.bounds.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiTimePicker.bounds.example.vue"]};const B={style:{display:"grid",gap:"8px"}},M={style:{"font-size":"12px",color:"#666"}},P=d({__name:"UiTimePicker.custom-variants.example",setup(s){const e=m("12:25"),r=["09:00","09:30","10:00","12:25","16:00"];return(n,o)=>(u(),p("div",B,[t(l,{value:e.value,"onUpdate:value":o[0]||(o[0]=$=>e.value=$),"time-variants":r,placeholder:"Custom variants"},null,8,["value"]),a("div",M," Value: "+x(e.value||"—"),1)]))}});P.__docgenInfo={exportName:"default",displayName:"UiTimePicker.custom-variants.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiTimePicker.custom-variants.example.vue"]};const O={style:{display:"grid",gap:"16px","max-width":"220px"}},X={style:{display:"grid",gap:"8px"}},H={style:{display:"grid",gap:"8px"}},N=d({__name:"UiTimePicker.disabled-readonly.example",setup(s){return(e,r)=>(u(),p("div",O,[a("div",X,[r[0]||(r[0]=a("div",{style:{"font-size":"12px",color:"#666"}}," Disabled ",-1)),t(l,{value:"10:30",disabled:""})]),a("div",H,[r[1]||(r[1]=a("div",{style:{"font-size":"12px",color:"#666"}}," Readonly ",-1)),t(l,{value:"14:00",readonly:""})])]))}});N.__docgenInfo={exportName:"default",displayName:"UiTimePicker.disabled-readonly.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiTimePicker.disabled-readonly.example.vue"]};const Q={style:{display:"grid",gap:"8px"}},L={style:{"font-size":"12px",color:"#666"}},w=d({__name:"UiTimePicker.keyboard.example",setup(s){const e=m("08:00");return(r,n)=>(u(),p("div",Q,[t(l,{value:e.value,"onUpdate:value":n[0]||(n[0]=o=>e.value=o),placeholder:"Use keyboard"},null,8,["value"]),n[1]||(n[1]=a("div",{style:{"font-size":"12px",color:"#666"}}," Try: ArrowDown/ArrowUp, Enter, Escape, Tab ",-1)),a("div",L," Value: "+x(e.value||"—"),1)]))}});w.__docgenInfo={exportName:"default",displayName:"UiTimePicker.keyboard.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiTimePicker.keyboard.example.vue"]};function y(s){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...k(),...s.components};return i.jsxs(i.Fragment,{children:[i.jsx(e.h1,{id:"uitimepicker",children:"UiTimePicker"}),`
`,i.jsxs(e.p,{children:[i.jsx(e.code,{children:"UiTimePicker"})," - компонент выбора времени в формате ",i.jsx(e.code,{children:"hh:mm"})," с ручным вводом и выпадающим списком вариантов."]}),`
`,i.jsx(e.h2,{id:"когда-использовать",children:"Когда использовать"}),`
`,i.jsxs(e.ul,{children:[`
`,i.jsx(e.li,{children:"выбор времени события, звонка, напоминания;"}),`
`,i.jsxs(e.li,{children:["фильтры с ограничением доступного диапазона (",i.jsx(e.code,{children:"minTime"})," / ",i.jsx(e.code,{children:"maxTime"}),");"]}),`
`,i.jsx(e.li,{children:"формы, где нужно быстро выбрать ближайшее время из списка с шагом."}),`
`]}),`
`,i.jsx(e.h2,{id:"импорт",children:"Импорт"}),`
`,i.jsx(e.pre,{children:i.jsx(e.code,{className:"language-ts",children:`import { UiTimePicker } from '@retailcrm/embed-ui-v1-components/remote'
`})}),`
`,i.jsx(e.h2,{id:"базовое-использование",children:"Базовое использование"}),`
`,i.jsx(e.pre,{children:i.jsx(e.code,{className:"language-vue",children:`<template>
  <UiTimePicker v-model:value="value" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UiTimePicker } from '@retailcrm/embed-ui-v1-components/remote'

const value = ref('10:30')
<\/script>
`})}),`
`,i.jsx(c,{is:f}),`
`,i.jsx(e.h2,{id:"сценарии",children:"Сценарии"}),`
`,i.jsxs(e.h3,{id:"шаг-вариантов-interval",children:["Шаг вариантов (",i.jsx(e.code,{children:"interval"}),")"]}),`
`,i.jsx(e.pre,{children:i.jsx(e.code,{className:"language-vue",children:`<UiTimePicker
  v-model:value="value"
  :interval="15"
/>
`})}),`
`,i.jsx(c,{is:T}),`
`,i.jsxs(e.h3,{id:"ограничение-диапазона-mintime--maxtime",children:["Ограничение диапазона (",i.jsx(e.code,{children:"minTime"})," / ",i.jsx(e.code,{children:"maxTime"}),")"]}),`
`,i.jsx(e.pre,{children:i.jsx(e.code,{className:"language-vue",children:`<UiTimePicker
  v-model:value="value"
  :min-time="[9, 30]"
  :max-time="[18, 0]"
/>
`})}),`
`,i.jsx(c,{is:U}),`
`,i.jsxs(e.h3,{id:"собственные-варианты-timevariants",children:["Собственные варианты (",i.jsx(e.code,{children:"timeVariants"}),")"]}),`
`,i.jsx(e.pre,{children:i.jsx(e.code,{className:"language-vue",children:`<UiTimePicker
  v-model:value="value"
  :time-variants="['09:00', '09:30', '12:25', '16:00']"
/>
`})}),`
`,i.jsx(c,{is:P}),`
`,i.jsx(e.h3,{id:"disabled-и-readonly",children:"Disabled и Readonly"}),`
`,i.jsx(c,{is:N}),`
`,i.jsx(e.h3,{id:"управление-с-клавиатуры",children:"Управление с клавиатуры"}),`
`,i.jsx(c,{is:w}),`
`,i.jsx(e.h2,{id:"модель-данных-и-события",children:"Модель данных и события"}),`
`,i.jsx(e.p,{children:"Значение компонента:"}),`
`,i.jsxs(e.ul,{children:[`
`,i.jsxs(e.li,{children:[i.jsx(e.code,{children:"value: string"})," в формате ",i.jsx(e.code,{children:"hh:mm"}),";"]}),`
`,i.jsxs(e.li,{children:["при вводе компонент санитизирует строку (оставляет цифры и ",i.jsx(e.code,{children:":"}),");"]}),`
`,i.jsx(e.li,{children:"на blur значение нормализуется."}),`
`]}),`
`,i.jsx(e.p,{children:"События:"}),`
`,i.jsxs(e.ul,{children:[`
`,i.jsxs(e.li,{children:[i.jsx(e.code,{children:"update:value"})," - новое значение времени для ",i.jsx(e.code,{children:"v-model:value"}),";"]}),`
`,i.jsxs(e.li,{children:[i.jsx(e.code,{children:"change"})," - пользовательское изменение значения;"]}),`
`,i.jsxs(e.li,{children:[i.jsx(e.code,{children:"focus"})," - фокус на поле;"]}),`
`,i.jsxs(e.li,{children:[i.jsx(e.code,{children:"blur"})," - потеря фокуса полем."]}),`
`]}),`
`,i.jsx(e.h2,{id:"a11y-и-клавиатура",children:"A11y и клавиатура"}),`
`,i.jsxs(e.p,{children:[i.jsx(e.code,{children:"UiTimePicker"})," реализует паттерн ",i.jsx(e.code,{children:"combobox"})," + ",i.jsx(e.code,{children:"listbox"}),":"]}),`
`,i.jsxs(e.ul,{children:[`
`,i.jsxs(e.li,{children:[i.jsx(e.code,{children:'role="combobox"'})," на корневом элементе;"]}),`
`,i.jsxs(e.li,{children:[i.jsx(e.code,{children:'role="listbox"'})," у выпадающего списка;"]}),`
`,i.jsxs(e.li,{children:[i.jsx(e.code,{children:'role="option"'})," и ",i.jsx(e.code,{children:"aria-selected"})," у вариантов времени."]}),`
`]}),`
`,i.jsx(e.p,{children:"Горячие клавиши:"}),`
`,i.jsxs(e.ul,{children:[`
`,i.jsxs(e.li,{children:[i.jsx(e.code,{children:"ArrowDown"})," / ",i.jsx(e.code,{children:"ArrowUp"})," - перемещение по вариантам;"]}),`
`,i.jsxs(e.li,{children:[i.jsx(e.code,{children:"Enter"})," - выбрать активный вариант;"]}),`
`,i.jsxs(e.li,{children:[i.jsx(e.code,{children:"Escape"})," - закрыть список;"]}),`
`,i.jsxs(e.li,{children:[i.jsx(e.code,{children:"Tab"})," - перейти к следующему элементу формы."]}),`
`]}),`
`,i.jsx(e.h2,{id:"полный-api",children:"Полный API"}),`
`,i.jsx(z,{})]})}function W(s={}){const{wrapper:e}={...k(),...s.components};return e?i.jsx(e,{...s,children:i.jsx(y,{...s})}):y(s)}const de={title:"Components/UiTimePicker",component:l,args:{id:"time-picker-sandbox",value:"10:30",placeholder:"Select time",interval:30,disabled:!1,readonly:!1,container:null,timeVariants:[],minTime:null,maxTime:null,textboxOptions:{}},argTypes:{value:{control:!1},interval:{control:{type:"number",min:1,step:1}},disabled:{control:"boolean"},readonly:{control:"boolean"},timeVariants:{control:"object"},minTime:{control:"object"},maxTime:{control:"object"},textboxOptions:{control:"object"}},render:s=>({components:{UiTimePicker:l},setup(){const e=m(s.value??"");return S(()=>s.value,r=>{e.value=r??""}),{value:e,props:V(()=>D(s,["value"]))}},template:`
      <div style="display: grid; gap: 8px;">
          <UiTimePicker
              v-model:value="value"
              v-bind="props"
          />

          <div style="font-size: 12px; color: #666;">
              Value: {{ value || '—' }}
          </div>
      </div>
    `}),parameters:{docs:{page:W},layout:"centered"}},v={},h={args:{interval:15,value:"09:45"}},j={args:{minTime:[9,30],maxTime:[18,0],value:"11:00"}},_={args:{timeVariants:["09:00","09:30","10:00","12:25","16:00"],value:"12:25"}},g={args:{value:"10:30",disabled:!0}},b={args:{value:"14:00",readonly:!0}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:"{}",...v.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    interval: 15,
    value: '09:45'
  }
}`,...h.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    minTime: [9, 30],
    maxTime: [18, 0],
    value: '11:00'
  }
}`,...j.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    timeVariants: ['09:00', '09:30', '10:00', '12:25', '16:00'],
    value: '12:25'
  }
}`,..._.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    value: '10:30',
    disabled: true
  }
}`,...g.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    value: '14:00',
    readonly: true
  }
}`,...b.parameters?.docs?.source}}};const me=["Sandbox","QuarterHour","Bounds","CustomVariants","Disabled","Readonly"];export{j as Bounds,_ as CustomVariants,g as Disabled,h as QuarterHour,b as Readonly,v as Sandbox,me as __namedExportsOrder,de as default};
