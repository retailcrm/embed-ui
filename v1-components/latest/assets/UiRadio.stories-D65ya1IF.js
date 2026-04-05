import{h as b,r as j,c as p,a as r,F as g,k as _,n as t,t as u,o as h,m as R,j as U}from"./iframe-DCDVANl5.js";import{_ as c}from"./UiRadio-UG55GqFe.js";import{w as k}from"./utils-BqzVSXwn.js";import{j as n}from"./jsx-runtime-CUtLY3pZ.js";import{useMDXComponents as v}from"./index-DwIA-ESQ.js";import{A as N}from"./blocks-Cr0w7RcH.js";import{T as C}from"./ToReact-CfRlBj5r.js";import{_ as M}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./preload-helper-PPVm8Dsz.js";import"./composables-ACcgJ6G0.js";import"./index-EpkwYzaG.js";const T=["for"],D="delivery-type",f=b({__name:"UiRadio.example",setup(o){const e=[{label:"Option 1",value:"1",disabled:!1},{label:"Option 2",value:"2",disabled:!1},{label:"Option 3",value:"3",disabled:!0}],d=j(e[0].value);return(a,s)=>(h(),p("div",{class:t(a.$style.container)},[r("fieldset",{class:t(a.$style.group)},[s[1]||(s[1]=r("legend",null,"Delivery type",-1)),(h(),p(g,null,_(e,(l,m)=>r("div",{key:l.value,class:t(a.$style.option)},[R(c,{id:"radio-"+m,model:d.value,"onUpdate:model":s[0]||(s[0]=y=>d.value=y),value:l.value,name:D,disabled:l.disabled},null,8,["id","model","value","disabled"]),r("label",{for:"radio-"+m},u(l.label),9,T)],2)),64))],2),r("div",null," Value: "+u(d.value),1)],2))}}),$="_container_1uv3s_1",w="_group_1uv3s_6",A="_option_1uv3s_11",F={container:$,group:w,option:A},O={$style:F},S=M(f,[["__cssModules",O]]);f.__docgenInfo={exportName:"default",displayName:"UiRadio.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiRadio.example.vue"]};function x(o){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...v(),...o.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{id:"uiradio",children:"UiRadio"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"UiRadio"})," - компонент для выбора одного значения из набора взаимоисключающих вариантов."]}),`
`,n.jsx(e.h2,{id:"когда-использовать",children:"Когда использовать"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"выбор одного варианта доставки, статуса, тарифа;"}),`
`,n.jsx(e.li,{children:"переключение между взаимоисключающими режимами;"}),`
`,n.jsx(e.li,{children:"формы, где важно явно показать все доступные варианты."}),`
`]}),`
`,n.jsx(e.h2,{id:"импорт",children:"Импорт"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-ts",children:`import { UiRadio } from '@retailcrm/embed-ui-v1-components/remote'
`})}),`
`,n.jsx(e.h2,{id:"базовое-использование",children:"Базовое использование"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
  <UiRadio id="delivery-courier" v-model:model="deliveryType" value="courier" name="delivery-type" />
  <label for="delivery-courier">Курьер</label>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UiRadio } from '@retailcrm/embed-ui-v1-components/remote'

const deliveryType = ref('courier')
<\/script>
`})}),`
`,n.jsx(e.h2,{id:"сценарии",children:"Сценарии"}),`
`,n.jsxs(e.h3,{id:"группа-с-общим-name",children:["Группа с общим ",n.jsx(e.code,{children:"name"})]}),`
`,n.jsxs(e.p,{children:["Чтобы радио-кнопки работали как единая группа, у них должен быть одинаковый ",n.jsx(e.code,{children:"name"}),"."]}),`
`,n.jsx(e.h3,{id:"логика-выбора",children:"Логика выбора"}),`
`,n.jsxs(e.p,{children:["Компонент считается выбранным, когда ",n.jsx(e.code,{children:"model === value"}),`.
При выборе `,n.jsx(e.code,{children:"UiRadio"})," эмитит:"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"change"})," - выбранное значение;"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"update:model"})," - выбранное значение для ",n.jsx(e.code,{children:"v-model:model"}),"."]}),`
`]}),`
`,n.jsx(C,{is:S}),`
`,n.jsx(e.h2,{id:"a11y",children:"A11y"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Для группы радио-кнопок используйте общий ",n.jsx(e.code,{children:"name"}),"."]}),`
`,n.jsxs(e.li,{children:["Для подписи группы предпочтительно использовать ",n.jsx(e.code,{children:"fieldset"})," + ",n.jsx(e.code,{children:"legend"}),"."]}),`
`,n.jsxs(e.li,{children:["Для каждой кнопки задавайте текстовую метку через ",n.jsx(e.code,{children:'<label for="...">'})," (или ",n.jsx(e.code,{children:"aria-label"}),"/",n.jsx(e.code,{children:"aria-labelledby"}),")."]}),`
`]}),`
`,n.jsx(e.h2,{id:"полный-api",children:"Полный API"}),`
`,n.jsx(N,{})]})}function B(o={}){const{wrapper:e}={...v(),...o.components};return e?n.jsx(e,{...o,children:n.jsx(x,{...o})}):x(o)}const K={title:"Components/UiRadio",component:c,argTypes:{id:{control:!1},model:{control:!1}},render:o=>({components:{UiRadio:c},setup(){return{model:j(o.model),props:U(()=>k(o,["id","model"]))}},template:`
      <UiRadio
          id="radio"
          v-model:model="model"
          v-bind="props"
          style="margin-right: 8px"
      />

      <label for="radio">
          Radio
      </label>
    `}),parameters:{docs:{page:B},layout:"centered"}},i={args:{value:"radio"}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    value: 'radio'
  }
}`,...i.parameters?.docs?.source}}};const Q=["Sandbox"];export{i as Sandbox,Q as __namedExportsOrder,K as default};
