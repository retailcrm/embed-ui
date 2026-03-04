import{g as x,r as j,c as v,k as c,a as l,C as _,n as r,o as b,E as k,h as q}from"./iframe-w9uXPWTm.js";import{_ as a}from"./UiSwitch-BCDjt_yO.js";import{o as N}from"./utils-BqzVSXwn.js";import{j as s}from"./index-Djyvt97q.js";import{useMDXComponents as S}from"./index-Cdf3Trmt.js";import{A as C}from"./blocks-uJ8zYmjq.js";import{T as d}from"./ToReact-Duu_YiOS.js";import{_ as f}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./preload-helper-PPVm8Dsz.js";import"./done-CLp43sCd.js";import"./composables-BijlSCcO.js";import"./index-B44Kv34C.js";const g=x({__name:"UiSwitch.basic.example",setup(o){const e=j(!1);return(i,n)=>(b(),v("div",{class:r(i.$style.container)},[c(a,{id:"ui-switch-basic",value:e.value,"onUpdate:value":n[0]||(n[0]=t=>e.value=t)},null,8,["value"]),n[1]||(n[1]=l("label",{for:"ui-switch-basic"}," Receive notifications ",-1)),l("div",{class:r(i.$style.state)}," Value: "+_(e.value),3)],2))}}),M="_container_145io_1",D="_state_145io_14",I={container:M,state:D},T={$style:I},A=f(g,[["__cssModules",T]]);g.__docgenInfo={exportName:"default",displayName:"UiSwitch.basic.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiSwitch.basic.example.vue"]};const y=x({__name:"UiSwitch.disabled.example",setup(o){return(e,i)=>(b(),v("div",{class:r(e.$style.container)},[l("div",{class:r(e.$style.option)},[c(a,{id:"ui-switch-disabled-off",value:!1,disabled:""}),i[0]||(i[0]=l("label",{for:"ui-switch-disabled-off"}," Disabled off ",-1))],2),l("div",{class:r(e.$style.option)},[c(a,{id:"ui-switch-disabled-on",value:!0,disabled:""}),i[1]||(i[1]=l("label",{for:"ui-switch-disabled-on"}," Disabled on ",-1))],2)],2))}}),E="_container_so7e7_1",F="_option_so7e7_8",V={container:E,option:F},z={$style:V},B=f(y,[["__cssModules",z]]);y.__docgenInfo={exportName:"default",displayName:"UiSwitch.disabled.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiSwitch.disabled.example.vue"]};const U=x({__name:"UiSwitch.square.example",setup(o){const e=j(!0);return(i,n)=>(b(),v("div",{class:r(i.$style.container)},[c(a,{id:"ui-switch-square",value:e.value,"onUpdate:value":n[0]||(n[0]=t=>e.value=t),square:""},null,8,["value"]),n[1]||(n[1]=l("label",{for:"ui-switch-square"}," Square style ",-1)),l("div",{class:r(i.$style.state)}," Value: "+_(e.value),3)],2))}}),R="_container_145io_1",P="_state_145io_14",X={container:R,state:P},H={$style:X},L=f(U,[["__cssModules",H]]);U.__docgenInfo={exportName:"default",displayName:"UiSwitch.square.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiSwitch.square.example.vue"]};const $=x({__name:"UiSwitch.controlled.example",setup(o){const e=j(!1);return(i,n)=>(b(),v("div",{class:r(i.$style.container)},[l("div",{class:r(i.$style.switch)},[c(a,{id:"ui-switch-controlled",value:e.value,"onUpdate:value":n[0]||(n[0]=t=>e.value=t)},null,8,["value"]),n[3]||(n[3]=l("label",{for:"ui-switch-controlled"}," Controlled switch ",-1))],2),l("div",{class:r(i.$style.controls)},[l("button",{type:"button",onClick:n[1]||(n[1]=t=>e.value=!0)}," Set on "),l("button",{type:"button",onClick:n[2]||(n[2]=t=>e.value=!1)}," Set off ")],2),l("div",null," Value: "+_(e.value),1)],2))}}),O="_container_5z033_1",G="_controls_5z033_16",J={container:O,switch:"_switch_5z033_8",controls:G},K={$style:J},Q=f($,[["__cssModules",K]]);$.__docgenInfo={exportName:"default",displayName:"UiSwitch.controlled.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiSwitch.controlled.example.vue"]};function w(o){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...S(),...o.components};return s.jsxs(s.Fragment,{children:[s.jsx(e.h1,{id:"uiswitch",children:"UiSwitch"}),`
`,s.jsxs(e.p,{children:[s.jsx(e.code,{children:"UiSwitch"})," - переключатель для булевых значений (",s.jsx(e.code,{children:"true/false"}),")."]}),`
`,s.jsx(e.h2,{id:"когда-использовать",children:"Когда использовать"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsx(e.li,{children:"мгновенное включение/выключение настройки;"}),`
`,s.jsx(e.li,{children:"управление двоичными параметрами (on/off);"}),`
`,s.jsx(e.li,{children:"сценарии, где важна компактная форма переключения."}),`
`]}),`
`,s.jsx(e.h2,{id:"импорт",children:"Импорт"}),`
`,s.jsx(e.h3,{id:"remote",children:"Remote"}),`
`,s.jsx(e.pre,{children:s.jsx(e.code,{className:"language-ts",children:`import { UiSwitch } from '@retailcrm/embed-ui-v1-components/remote'
`})}),`
`,s.jsx(e.h3,{id:"host",children:"Host"}),`
`,s.jsx(e.pre,{children:s.jsx(e.code,{className:"language-ts",children:`import { UiSwitch } from '@retailcrm/embed-ui-v1-components/host'
`})}),`
`,s.jsx(e.h2,{id:"базовое-использование",children:"Базовое использование"}),`
`,s.jsx(e.pre,{children:s.jsx(e.code,{className:"language-vue",children:`<template>
  <UiSwitch v-model:value="enabled" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UiSwitch } from '@retailcrm/embed-ui-v1-components/remote'

const enabled = ref(false)
<\/script>
`})}),`
`,s.jsx(d,{is:A}),`
`,s.jsx(e.h2,{id:"пример-с-внешним-управлением",children:"Пример с внешним управлением"}),`
`,s.jsxs(e.p,{children:["Компонент можно использовать как controlled-элемент: передавать ",s.jsx(e.code,{children:"value"})," и обновлять значение через ",s.jsx(e.code,{children:"update:value"}),"."]}),`
`,s.jsx(e.pre,{children:s.jsx(e.code,{className:"language-vue",children:`<UiSwitch
  :value="enabled"
  @update:value="enabled = $event"
/>
`})}),`
`,s.jsx(d,{is:Q}),`
`,s.jsx(e.h2,{id:"состояния",children:"Состояния"}),`
`,s.jsx(e.h3,{id:"disabled",children:"Disabled"}),`
`,s.jsx(e.pre,{children:s.jsx(e.code,{className:"language-vue",children:`<UiSwitch :value="true" disabled />
`})}),`
`,s.jsx(d,{is:B}),`
`,s.jsx(e.h3,{id:"square",children:"Square"}),`
`,s.jsx(e.pre,{children:s.jsx(e.code,{className:"language-vue",children:`<UiSwitch v-model:value="enabled" square />
`})}),`
`,s.jsx(d,{is:L}),`
`,s.jsx(e.h2,{id:"api",children:"API"}),`
`,s.jsx(e.h3,{id:"props",children:"Props"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"id?: string"})," - id нативного ",s.jsx(e.code,{children:"input"})," (нужен для связки с внешним ",s.jsx(e.code,{children:'<label for="...">'}),")."]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"value?: boolean"})," - текущее состояние переключателя."]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"disabled?: boolean"})," - блокировка взаимодействия."]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"square?: boolean"})," - квадратный визуальный вариант."]}),`
`]}),`
`,s.jsx(e.h3,{id:"events",children:"Events"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"update:value"})," - новое boolean-значение для ",s.jsx(e.code,{children:"v-model:value"}),"."]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"change"})," - дополнительное событие изменения со значением ",s.jsx(e.code,{children:"boolean"}),"."]}),`
`]}),`
`,s.jsx(e.h3,{id:"methods",children:"Methods"}),`
`,s.jsxs(e.p,{children:["Через ",s.jsx(e.code,{children:"ref"})," доступны:"]}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsx(e.li,{children:s.jsx(e.code,{children:"click()"})}),`
`,s.jsx(e.li,{children:s.jsx(e.code,{children:"focus()"})}),`
`,s.jsx(e.li,{children:s.jsx(e.code,{children:"blur()"})}),`
`]}),`
`,s.jsx(e.h2,{id:"a11y-и-клавиатура",children:"A11y и клавиатура"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsxs(e.li,{children:["Компонент использует ",s.jsx(e.code,{children:'input[type="checkbox"]'})," с ",s.jsx(e.code,{children:'role="switch"'}),"."]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"aria-checked"})," и ",s.jsx(e.code,{children:"aria-disabled"})," выставляются автоматически."]}),`
`,s.jsx(e.li,{children:"Поддерживаются стандартные клавиши нативного переключателя:"}),`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"Space"})," - переключить состояние;"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"Tab"})," / ",s.jsx(e.code,{children:"Shift+Tab"})," - перемещение фокуса."]}),`
`,s.jsxs(e.li,{children:["Любые внешние ",s.jsx(e.code,{children:"aria-*"})," атрибуты можно передавать напрямую в компонент."]}),`
`]}),`
`,s.jsx(e.h2,{id:"полный-api",children:"Полный API"}),`
`,s.jsx(C,{})]})}function W(o={}){const{wrapper:e}={...S(),...o.components};return e?s.jsx(e,{...o,children:s.jsx(w,{...o})}):w(o)}const de={title:"Components/UiSwitch",component:a,args:{id:"switch-sandbox",value:!1,disabled:!1,square:!1},argTypes:{value:{control:!1}},render:o=>({components:{UiSwitch:a},setup(){const e=j(o.value??!1);return k(()=>o.value,i=>{typeof i<"u"&&(e.value=i)}),{value:e,props:q(()=>N(o,["value"]))}},template:`
      <div style="display: inline-flex; align-items: center; gap: 8px">
          <UiSwitch
              v-model:value="value"
              v-bind="props"
          />

          <label :for="props.id">
              Switch
          </label>
      </div>
    `}),parameters:{docs:{page:W},layout:"centered"}},u={},h={args:{value:!0}},p={args:{disabled:!0}},m={args:{square:!0}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:"{}",...u.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    value: true
  }
}`,...h.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    square: true
  }
}`,...m.parameters?.docs?.source}}};const ue=["Sandbox","Checked","Disabled","Square"];export{h as Checked,p as Disabled,u as Sandbox,m as Square,ue as __namedExportsOrder,de as default};
