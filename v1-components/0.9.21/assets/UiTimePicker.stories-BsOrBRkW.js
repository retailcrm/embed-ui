import{h as d,c as m,k as t,a as o,t as x,r as p,o as u,w as S,q as V}from"./iframe-DnG3g5pW.js";import{_ as l}from"./UiTimePicker-Dbq2Qvqt.js";import{o as D}from"./utils-BqzVSXwn.js";import{u as w,j as i}from"./index-DFg_Ho_i.js";import{A as z}from"./blocks-DBDDY4vL.js";import{T as c}from"./ToReact-DbRAeBf3.js";import"./preload-helper-PPVm8Dsz.js";import"./UiMenuItem-CATQK8cQ.js";import"./UiPopper-C8UHJnqx.js";import"./UiScrollBox-r2qAVLZM.js";import"./UiTextbox-8JxeifZm.js";import"./composables-CfEvSTVp.js";import"./plugin-DbbfKnFn.js";import"./index-BAxMPZdI.js";import"./index-nl1gzEpR.js";const O={style:{display:"grid",gap:"8px"}},A={style:{"font-size":"12px",color:"#666"}},y=d({__name:"UiTimePicker.basic.example",setup(s){const e=p("10:30");return(r,n)=>(u(),m("div",O,[t(l,{value:e.value,"onUpdate:value":n[0]||(n[0]=a=>e.value=a),placeholder:"Select time"},null,8,["value"]),o("div",A," Selected: "+x(e.value||"—"),1)]))}});y.__docgenInfo=Object.assign({displayName:y.name??y.__name},{exportName:"default",displayName:"UiTimePicker.basic.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiTimePicker.basic.example.vue"]});const C={style:{display:"grid",gap:"8px"}},E={style:{"font-size":"12px",color:"#666"}},k=d({__name:"UiTimePicker.interval.example",setup(s){const e=p("09:45");return(r,n)=>(u(),m("div",C,[t(l,{value:e.value,"onUpdate:value":n[0]||(n[0]=a=>e.value=a),interval:15,placeholder:"15 min interval"},null,8,["value"]),o("div",E," Step: 15 min, value: "+x(e.value||"—"),1)]))}});k.__docgenInfo=Object.assign({displayName:k.name??k.__name},{exportName:"default",displayName:"UiTimePicker.interval.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiTimePicker.interval.example.vue"]});const F={style:{display:"grid",gap:"8px"}},I={style:{"font-size":"12px",color:"#666"}},T=d({__name:"UiTimePicker.bounds.example",setup(s){const e=p("11:00");return(r,n)=>(u(),m("div",F,[t(l,{value:e.value,"onUpdate:value":n[0]||(n[0]=a=>e.value=a),"min-time":[9,30],"max-time":[18,0],placeholder:"Working hours"},null,8,["value"]),o("div",I," Range: 09:30 - 18:00, value: "+x(e.value||"—"),1)]))}});T.__docgenInfo=Object.assign({displayName:T.name??T.__name},{exportName:"default",displayName:"UiTimePicker.bounds.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiTimePicker.bounds.example.vue"]});const R={style:{display:"grid",gap:"8px"}},B={style:{"font-size":"12px",color:"#666"}},f=d({__name:"UiTimePicker.custom-variants.example",setup(s){const e=p("12:25"),r=["09:00","09:30","10:00","12:25","16:00"];return(n,a)=>(u(),m("div",R,[t(l,{value:e.value,"onUpdate:value":a[0]||(a[0]=$=>e.value=$),"time-variants":r,placeholder:"Custom variants"},null,8,["value"]),o("div",B," Value: "+x(e.value||"—"),1)]))}});f.__docgenInfo=Object.assign({displayName:f.name??f.__name},{exportName:"default",displayName:"UiTimePicker.custom-variants.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiTimePicker.custom-variants.example.vue"]});const M={style:{display:"grid",gap:"16px","max-width":"220px"}},X={style:{display:"grid",gap:"8px"}},H={style:{display:"grid",gap:"8px"}},U=d({__name:"UiTimePicker.disabled-readonly.example",setup(s){return(e,r)=>(u(),m("div",M,[o("div",X,[r[0]||(r[0]=o("div",{style:{"font-size":"12px",color:"#666"}}," Disabled ",-1)),t(l,{value:"10:30",disabled:""})]),o("div",H,[r[1]||(r[1]=o("div",{style:{"font-size":"12px",color:"#666"}}," Readonly ",-1)),t(l,{value:"14:00",readonly:""})])]))}});U.__docgenInfo=Object.assign({displayName:U.name??U.__name},{exportName:"default",displayName:"UiTimePicker.disabled-readonly.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiTimePicker.disabled-readonly.example.vue"]});const Q={style:{display:"grid",gap:"8px"}},q={style:{"font-size":"12px",color:"#666"}},P=d({__name:"UiTimePicker.keyboard.example",setup(s){const e=p("08:00");return(r,n)=>(u(),m("div",Q,[t(l,{value:e.value,"onUpdate:value":n[0]||(n[0]=a=>e.value=a),placeholder:"Use keyboard"},null,8,["value"]),n[1]||(n[1]=o("div",{style:{"font-size":"12px",color:"#666"}}," Try: ArrowDown/ArrowUp, Enter, Escape, Tab ",-1)),o("div",q," Value: "+x(e.value||"—"),1)]))}});P.__docgenInfo=Object.assign({displayName:P.name??P.__name},{exportName:"default",displayName:"UiTimePicker.keyboard.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiTimePicker.keyboard.example.vue"]});function N(s){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...w(),...s.components};return i.jsxs(i.Fragment,{children:[i.jsx(e.h1,{id:"uitimepicker",children:"UiTimePicker"}),`
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
`,i.jsx(c,{is:y}),`
`,i.jsx(e.h2,{id:"сценарии",children:"Сценарии"}),`
`,i.jsxs(e.h3,{id:"шаг-вариантов-interval",children:["Шаг вариантов (",i.jsx(e.code,{children:"interval"}),")"]}),`
`,i.jsx(e.pre,{children:i.jsx(e.code,{className:"language-vue",children:`<UiTimePicker
  v-model:value="value"
  :interval="15"
/>
`})}),`
`,i.jsx(c,{is:k}),`
`,i.jsxs(e.h3,{id:"ограничение-диапазона-mintime--maxtime",children:["Ограничение диапазона (",i.jsx(e.code,{children:"minTime"})," / ",i.jsx(e.code,{children:"maxTime"}),")"]}),`
`,i.jsx(e.pre,{children:i.jsx(e.code,{className:"language-vue",children:`<UiTimePicker
  v-model:value="value"
  :min-time="[9, 30]"
  :max-time="[18, 0]"
/>
`})}),`
`,i.jsx(c,{is:T}),`
`,i.jsxs(e.h3,{id:"собственные-варианты-timevariants",children:["Собственные варианты (",i.jsx(e.code,{children:"timeVariants"}),")"]}),`
`,i.jsx(e.pre,{children:i.jsx(e.code,{className:"language-vue",children:`<UiTimePicker
  v-model:value="value"
  :time-variants="['09:00', '09:30', '12:25', '16:00']"
/>
`})}),`
`,i.jsx(c,{is:f}),`
`,i.jsx(e.h3,{id:"disabled-и-readonly",children:"Disabled и Readonly"}),`
`,i.jsx(c,{is:U}),`
`,i.jsx(e.h3,{id:"управление-с-клавиатуры",children:"Управление с клавиатуры"}),`
`,i.jsx(c,{is:P}),`
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
`,i.jsx(z,{})]})}function L(s={}){const{wrapper:e}={...w(),...s.components};return e?i.jsx(e,{...s,children:i.jsx(N,{...s})}):N(s)}const ce={title:"Components/UiTimePicker",component:l,args:{id:"time-picker-sandbox",value:"10:30",placeholder:"Select time",interval:30,disabled:!1,readonly:!1,container:null,timeVariants:[],minTime:null,maxTime:null,textboxOptions:{}},argTypes:{value:{control:!1},interval:{control:{type:"number",min:1,step:1}},disabled:{control:"boolean"},readonly:{control:"boolean"},timeVariants:{control:"object"},minTime:{control:"object"},maxTime:{control:"object"},textboxOptions:{control:"object"}},render:s=>({components:{UiTimePicker:l},setup(){const e=p(s.value??"");return S(()=>s.value,r=>{e.value=r??""}),{value:e,props:V(()=>D(s,["value"]))}},template:`
      <div style="display: grid; gap: 8px;">
          <UiTimePicker
              v-model:value="value"
              v-bind="props"
          />

          <div style="font-size: 12px; color: #666;">
              Value: {{ value || '—' }}
          </div>
      </div>
    `}),parameters:{docs:{page:L},layout:"centered"}},v={},h={args:{interval:15,value:"09:45"}},j={args:{minTime:[9,30],maxTime:[18,0],value:"11:00"}},_={args:{timeVariants:["09:00","09:30","10:00","12:25","16:00"],value:"12:25"}},g={args:{value:"10:30",disabled:!0}},b={args:{value:"14:00",readonly:!0}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:"{}",...v.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}};const de=["Sandbox","QuarterHour","Bounds","CustomVariants","Disabled","Readonly"];export{j as Bounds,_ as CustomVariants,g as Disabled,h as QuarterHour,b as Readonly,v as Sandbox,de as __namedExportsOrder,ce as default};
