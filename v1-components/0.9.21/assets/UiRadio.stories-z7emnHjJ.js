import{h as b,c as u,a as s,F as _,j as g,n as c,t as h,r as v,o as x,k as R,q as U}from"./iframe-DnG3g5pW.js";import{_ as m}from"./UiRadio-Db2pv2dg.js";import{w as N}from"./utils-BqzVSXwn.js";import{u as f,j as n}from"./index-DFg_Ho_i.js";import{A as k}from"./blocks-DBDDY4vL.js";import{T as C}from"./ToReact-DbRAeBf3.js";import{_ as M}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./preload-helper-PPVm8Dsz.js";import"./composables-CfEvSTVp.js";import"./index-nl1gzEpR.js";const T=["for"],D="delivery-type",d=b({__name:"UiRadio.example",setup(o){const e=[{label:"Option 1",value:"1",disabled:!1},{label:"Option 2",value:"2",disabled:!1},{label:"Option 3",value:"3",disabled:!0}],a=v(e[0].value);return(t,l)=>(x(),u("div",{class:c(t.$style.container)},[s("fieldset",{class:c(t.$style.group)},[l[1]||(l[1]=s("legend",null,"Delivery type",-1)),(x(),u(_,null,g(e,(i,p)=>s("div",{key:i.value,class:c(t.$style.option)},[R(m,{id:"radio-"+p,model:a.value,"onUpdate:model":l[0]||(l[0]=y=>a.value=y),value:i.value,name:D,disabled:i.disabled},null,8,["id","model","value","disabled"]),s("label",{for:"radio-"+p},h(i.label),9,T)],2)),64))],2),s("div",null," Value: "+h(a.value),1)],2))}}),O="_container_1uv3s_1",$="_group_1uv3s_6",w="_option_1uv3s_11",A={container:O,group:$,option:w},F={$style:A},S=M(d,[["__cssModules",F]]);d.__docgenInfo=Object.assign({displayName:d.name??d.__name},{exportName:"default",displayName:"UiRadio.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiRadio.example.vue"]});function j(o){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...f(),...o.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{id:"uiradio",children:"UiRadio"}),`
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
`,n.jsx(k,{})]})}function B(o={}){const{wrapper:e}={...f(),...o.components};return e?n.jsx(e,{...o,children:n.jsx(j,{...o})}):j(o)}const J={title:"Components/UiRadio",component:m,argTypes:{id:{control:!1},model:{control:!1}},render:o=>({components:{UiRadio:m},setup(){return{model:v(o.model),props:U(()=>N(o,["id","model"]))}},template:`
      <UiRadio
          id="radio"
          v-model:model="model"
          v-bind="props"
          style="margin-right: 8px"
      />

      <label for="radio">
          Radio
      </label>
    `}),parameters:{docs:{page:B},layout:"centered"}},r={args:{value:"radio"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    value: 'radio'
  }
}`,...r.parameters?.docs?.source}}};const K=["Sandbox"];export{r as Sandbox,K as __namedExportsOrder,J as default};
