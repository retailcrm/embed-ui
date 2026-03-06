import{h as x,r as j,c as v,m as t,a as o,D as _,n as r,o as f,w,C as S,G as C,j as M}from"./iframe-B-kTCndX.js";import{_ as c}from"./UiSwitch-9dpPhr2U.js";import{o as D}from"./utils-BqzVSXwn.js";import{j as s}from"./jsx-runtime-4ZJMz8rO.js";import{useMDXComponents as $}from"./index-B4BHLWPH.js";import{A as T}from"./blocks-BFXVrAzm.js";import{T as d}from"./ToReact-oPhsQyRN.js";import{_ as b}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{_ as g}from"./UiButton-DlpnVjfS.js";import"./preload-helper-PPVm8Dsz.js";import"./done-BiWdxDzx.js";import"./composables-mLYPVKrD.js";import"./index-BU-GYzGj.js";import"./predicate-ClulhfEu.js";const U=x({__name:"UiSwitch.basic.example",setup(l){const e=j(!1);return(i,n)=>(f(),v("div",{class:r(i.$style.container)},[t(c,{id:"ui-switch-basic",value:e.value,"onUpdate:value":n[0]||(n[0]=a=>e.value=a)},null,8,["value"]),n[1]||(n[1]=o("label",{for:"ui-switch-basic"}," Receive notifications ",-1)),o("div",{class:r(i.$style.state)}," Value: "+_(e.value),3)],2))}}),I="_container_145io_1",V="_state_145io_14",A={container:I,state:V},F={$style:A},B=b(U,[["__cssModules",F]]);U.__docgenInfo={exportName:"default",displayName:"UiSwitch.basic.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiSwitch.basic.example.vue"]};const k=x({__name:"UiSwitch.disabled.example",setup(l){return(e,i)=>(f(),v("div",{class:r(e.$style.container)},[o("div",{class:r(e.$style.option)},[t(c,{id:"ui-switch-disabled-off",value:!1,disabled:""}),i[0]||(i[0]=o("label",{for:"ui-switch-disabled-off"}," Disabled off ",-1))],2),o("div",{class:r(e.$style.option)},[t(c,{id:"ui-switch-disabled-on",value:!0,disabled:""}),i[1]||(i[1]=o("label",{for:"ui-switch-disabled-on"}," Disabled on ",-1))],2)],2))}}),E="_container_so7e7_1",P="_option_so7e7_8",R={container:E,option:P},X={$style:R},z=b(k,[["__cssModules",X]]);k.__docgenInfo={exportName:"default",displayName:"UiSwitch.disabled.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiSwitch.disabled.example.vue"]};const q=x({__name:"UiSwitch.square.example",setup(l){const e=j(!0);return(i,n)=>(f(),v("div",{class:r(i.$style.container)},[t(c,{id:"ui-switch-square",value:e.value,"onUpdate:value":n[0]||(n[0]=a=>e.value=a),square:""},null,8,["value"]),n[1]||(n[1]=o("label",{for:"ui-switch-square"}," Square style ",-1)),o("div",{class:r(i.$style.state)}," Value: "+_(e.value),3)],2))}}),G="_container_145io_1",L="_state_145io_14",O={container:G,state:L},H={$style:O},J=b(q,[["__cssModules",H]]);q.__docgenInfo={exportName:"default",displayName:"UiSwitch.square.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiSwitch.square.example.vue"]};const N=x({__name:"UiSwitch.controlled.example",setup(l){const e=j(!1);return(i,n)=>(f(),v("div",{class:r(i.$style.container)},[o("div",{class:r(i.$style.switch)},[t(c,{id:"ui-switch-controlled",value:e.value,"onUpdate:value":n[0]||(n[0]=a=>e.value=a)},null,8,["value"]),n[3]||(n[3]=o("label",{for:"ui-switch-controlled"}," Controlled switch ",-1))],2),o("div",{class:r(i.$style.controls)},[t(g,{appearance:"secondary",style:{flex:"none","align-self":"flex-start"},onClick:n[1]||(n[1]=a=>e.value=!0)},{default:w(()=>[...n[4]||(n[4]=[S(" Set on ",-1)])]),_:1}),t(g,{appearance:"secondary",style:{flex:"none","align-self":"flex-start"},onClick:n[2]||(n[2]=a=>e.value=!1)},{default:w(()=>[...n[5]||(n[5]=[S(" Set off ",-1)])]),_:1})],2),o("div",null," Value: "+_(e.value),1)],2))}}),K="_container_58m7u_1",Q="_controls_58m7u_16",W={container:K,switch:"_switch_58m7u_8",controls:Q},Y={$style:W},Z=b(N,[["__cssModules",Y]]);N.__docgenInfo={exportName:"default",displayName:"UiSwitch.controlled.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiSwitch.controlled.example.vue"]};function y(l){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...$(),...l.components};return s.jsxs(s.Fragment,{children:[s.jsx(e.h1,{id:"uiswitch",children:"UiSwitch"}),`
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
`,s.jsx(d,{is:B}),`
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
`,s.jsx(d,{is:z}),`
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
`,s.jsx(T,{})]})}function ee(l={}){const{wrapper:e}={...$(),...l.components};return e?s.jsx(e,{...l,children:s.jsx(y,{...l})}):y(l)}const xe={title:"Components/UiSwitch",component:c,args:{id:"switch-sandbox",value:!1,disabled:!1,square:!1},argTypes:{value:{control:!1}},render:l=>({components:{UiSwitch:c},setup(){const e=j(l.value??!1);return C(()=>l.value,i=>{typeof i<"u"&&(e.value=i)}),{value:e,props:M(()=>D(l,["value"]))}},template:`
      <div style="display: inline-flex; align-items: center; gap: 8px">
          <UiSwitch
              v-model:value="value"
              v-bind="props"
          />

          <label :for="props.id">
              Switch
          </label>
      </div>
    `}),parameters:{docs:{page:ee},layout:"centered"}},u={},p={args:{value:!0}},h={args:{disabled:!0}},m={args:{square:!0}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:"{}",...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    value: true
  }
}`,...p.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...h.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    square: true
  }
}`,...m.parameters?.docs?.source}}};const je=["Sandbox","Checked","Disabled","Square"];export{p as Checked,h as Disabled,u as Sandbox,m as Square,je as __namedExportsOrder,xe as default};
