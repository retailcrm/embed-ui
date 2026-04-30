import{h as b,c as _,k as t,a,t as S,n as o,r as w,o as g,z as $,N as U,w as C,q as M}from"./iframe-DnG3g5pW.js";import{_ as c}from"./UiSwitch-BYHwo-yu.js";import{o as D}from"./utils-BqzVSXwn.js";import{u as q,j as s}from"./index-DFg_Ho_i.js";import{A as T}from"./blocks-DBDDY4vL.js";import{T as d}from"./ToReact-DbRAeBf3.js";import{_ as y}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{_ as k}from"./UiButton-BCon8_Cd.js";import"./preload-helper-PPVm8Dsz.js";import"./done-B176HZ5x.js";import"./composables-CfEvSTVp.js";import"./index-nl1gzEpR.js";import"./predicate-ClulhfEu.js";import"./render-vaNyDQt4.js";const x=b({__name:"UiSwitch.basic.example",setup(l){const e=w(!1);return(i,n)=>(g(),_("div",{class:o(i.$style.container)},[t(c,{id:"ui-switch-basic",value:e.value,"onUpdate:value":n[0]||(n[0]=r=>e.value=r)},null,8,["value"]),n[1]||(n[1]=a("label",{for:"ui-switch-basic"}," Receive notifications ",-1)),a("div",{class:o(i.$style.state)}," Value: "+S(e.value),3)],2))}}),I="_container_145io_1",V="_state_145io_14",A={container:I,state:V},F={$style:A},O=y(x,[["__cssModules",F]]);x.__docgenInfo=Object.assign({displayName:x.name??x.__name},{exportName:"default",displayName:"UiSwitch.basic.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiSwitch.basic.example.vue"]});const j=b({__name:"UiSwitch.disabled.example",setup(l){return(e,i)=>(g(),_("div",{class:o(e.$style.container)},[a("div",{class:o(e.$style.option)},[t(c,{id:"ui-switch-disabled-off",value:!1,disabled:""}),i[0]||(i[0]=a("label",{for:"ui-switch-disabled-off"}," Disabled off ",-1))],2),a("div",{class:o(e.$style.option)},[t(c,{id:"ui-switch-disabled-on",value:!0,disabled:""}),i[1]||(i[1]=a("label",{for:"ui-switch-disabled-on"}," Disabled on ",-1))],2)],2))}}),B="_container_so7e7_1",E="_option_so7e7_8",P={container:B,option:E},R={$style:P},X=y(j,[["__cssModules",R]]);j.__docgenInfo=Object.assign({displayName:j.name??j.__name},{exportName:"default",displayName:"UiSwitch.disabled.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiSwitch.disabled.example.vue"]});const v=b({__name:"UiSwitch.square.example",setup(l){const e=w(!0);return(i,n)=>(g(),_("div",{class:o(i.$style.container)},[t(c,{id:"ui-switch-square",value:e.value,"onUpdate:value":n[0]||(n[0]=r=>e.value=r),square:""},null,8,["value"]),n[1]||(n[1]=a("label",{for:"ui-switch-square"}," Square style ",-1)),a("div",{class:o(i.$style.state)}," Value: "+S(e.value),3)],2))}}),z="_container_145io_1",L="_state_145io_14",G={container:z,state:L},H={$style:G},J=y(v,[["__cssModules",H]]);v.__docgenInfo=Object.assign({displayName:v.name??v.__name},{exportName:"default",displayName:"UiSwitch.square.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiSwitch.square.example.vue"]});const f=b({__name:"UiSwitch.controlled.example",setup(l){const e=w(!1);return(i,n)=>(g(),_("div",{class:o(i.$style.container)},[a("div",{class:o(i.$style.switch)},[t(c,{id:"ui-switch-controlled",value:e.value,"onUpdate:value":n[0]||(n[0]=r=>e.value=r)},null,8,["value"]),n[3]||(n[3]=a("label",{for:"ui-switch-controlled"}," Controlled switch ",-1))],2),a("div",{class:o(i.$style.controls)},[t(k,{appearance:"secondary",style:{flex:"none","align-self":"flex-start"},onClick:n[1]||(n[1]=r=>e.value=!0)},{default:$(()=>[...n[4]||(n[4]=[U(" Set on ",-1)])]),_:1}),t(k,{appearance:"secondary",style:{flex:"none","align-self":"flex-start"},onClick:n[2]||(n[2]=r=>e.value=!1)},{default:$(()=>[...n[5]||(n[5]=[U(" Set off ",-1)])]),_:1})],2),a("div",null," Value: "+S(e.value),1)],2))}}),K="_container_58m7u_1",Q="_controls_58m7u_16",W={container:K,switch:"_switch_58m7u_8",controls:Q},Y={$style:W},Z=y(f,[["__cssModules",Y]]);f.__docgenInfo=Object.assign({displayName:f.name??f.__name},{exportName:"default",displayName:"UiSwitch.controlled.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiSwitch.controlled.example.vue"]});function N(l){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...q(),...l.components};return s.jsxs(s.Fragment,{children:[s.jsx(e.h1,{id:"uiswitch",children:"UiSwitch"}),`
`,s.jsxs(e.p,{children:[s.jsx(e.code,{children:"UiSwitch"})," - переключатель для булевых значений (",s.jsx(e.code,{children:"true/false"}),")."]}),`
`,s.jsx(e.h2,{id:"когда-использовать",children:"Когда использовать"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsx(e.li,{children:"мгновенное включение/выключение настройки;"}),`
`,s.jsx(e.li,{children:"управление двоичными параметрами (on/off);"}),`
`,s.jsx(e.li,{children:"сценарии, где важна компактная форма переключения."}),`
`]}),`
`,s.jsx(e.h2,{id:"импорт",children:"Импорт"}),`
`,s.jsx(e.pre,{children:s.jsx(e.code,{className:"language-ts",children:`import { UiSwitch } from '@retailcrm/embed-ui-v1-components/remote'
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
`,s.jsx(d,{is:O}),`
`,s.jsx(e.h2,{id:"пример-с-внешним-управлением",children:"Пример с внешним управлением"}),`
`,s.jsxs(e.p,{children:["Компонент можно использовать как controlled-элемент: передавать ",s.jsx(e.code,{children:"value"})," и обновлять значение через ",s.jsx(e.code,{children:"update:value"}),"."]}),`
`,s.jsx(e.pre,{children:s.jsx(e.code,{className:"language-vue",children:`<UiSwitch
  :value="enabled"
  @update:value="enabled = $event"
/>
`})}),`
`,s.jsx(d,{is:Z}),`
`,s.jsx(e.h2,{id:"состояния",children:"Состояния"}),`
`,s.jsx(e.h3,{id:"disabled",children:"Disabled"}),`
`,s.jsx(e.pre,{children:s.jsx(e.code,{className:"language-vue",children:`<UiSwitch :value="true" disabled />
`})}),`
`,s.jsx(d,{is:X}),`
`,s.jsx(e.h3,{id:"square",children:"Square"}),`
`,s.jsx(e.pre,{children:s.jsx(e.code,{className:"language-vue",children:`<UiSwitch v-model:value="enabled" square />
`})}),`
`,s.jsx(d,{is:J}),`
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
`,s.jsx(T,{})]})}function ee(l={}){const{wrapper:e}={...q(),...l.components};return e?s.jsx(e,{...l,children:s.jsx(N,{...l})}):N(l)}const xe={title:"Components/UiSwitch",component:c,args:{id:"switch-sandbox",value:!1,disabled:!1,square:!1},argTypes:{value:{control:!1}},render:l=>({components:{UiSwitch:c},setup(){const e=w(l.value??!1);return C(()=>l.value,i=>{typeof i<"u"&&(e.value=i)}),{value:e,props:M(()=>D(l,["value"]))}},template:`
      <div style="display: inline-flex; align-items: center; gap: 8px">
          <UiSwitch
              v-model:value="value"
              v-bind="props"
          />

          <label :for="props.id">
              Switch
          </label>
      </div>
    `}),parameters:{docs:{page:ee},layout:"centered"}},u={},p={args:{value:!0}},m={args:{disabled:!0}},h={args:{square:!0}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:"{}",...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    value: true
  }
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...m.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    square: true
  }
}`,...h.parameters?.docs?.source}}};const je=["Sandbox","Checked","Disabled","Square"];export{p as Checked,m as Disabled,u as Sandbox,h as Square,je as __namedExportsOrder,xe as default};
