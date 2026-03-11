import{h as N,r as m,j as u,c as f,a as o,n as c,m as a,F as M,k as S,o as k,D}from"./iframe-CDUUxCcy.js";import{_ as d}from"./UiCheckbox-D22mAKwS.js";import{w}from"./utils-BqzVSXwn.js";import{j as l}from"./jsx-runtime-WvBD3TGQ.js";import{useMDXComponents as C}from"./index-Bt8QKlhK.js";import{A}from"./blocks-DvosWMRX.js";import{T as F}from"./ToReact-D-CG46FW.js";import{_ as T}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./preload-helper-PPVm8Dsz.js";import"./done-bDVe0E5e.js";import"./composables-CFqOz7Ut.js";import"./index-bY2CHHEP.js";const B=["for"],y=N({__name:"UiCheckbox.example",setup(i){const e=m(!0),b=m(!0),j=m(!0),t=m([]),p=[{label:"ВКонтакте",value:"vk"},{label:"Инстаграм",value:"instagram"}],U=u(()=>t.value.length>0),v=u(()=>U.value&&t.value.length<p.length),$=r=>{const n=p.map(h=>h.value),s=v.value;t.value=r||s?n:[]};return(r,n)=>(k(),f("div",{class:c(r.$style.container)},[o("ul",{class:c(r.$style.list)},[o("li",{class:c(r.$style.item)},[a(d,{id:"checkbox-phone",model:b.value,"onUpdate:model":n[0]||(n[0]=s=>b.value=s)},null,8,["model"]),n[4]||(n[4]=o("label",{for:"checkbox-phone"}," Телефон ",-1))],2),o("li",{class:c(r.$style.item)},[a(d,{id:"checkbox-socials",model:t.value.length>0,indeterminate:v.value,onChange:$},null,8,["model","indeterminate"]),n[5]||(n[5]=o("label",{for:"checkbox-socials"}," Социальные сети ",-1)),o("ul",{class:c(r.$style.list)},[(k(),f(M,null,S(p,(s,h)=>o("li",{key:s.value,class:c(r.$style.item)},[a(d,{id:"checkbox-socials-"+h,model:t.value,"onUpdate:model":n[1]||(n[1]=_=>t.value=_),value:s.value},null,8,["id","model","value"]),o("label",{for:"checkbox-socials-"+h},D(s.label),9,B)],2)),64))],2)],2),o("li",{class:c(r.$style.item)},[a(d,{id:"checkbox-mail",model:e.value,"onUpdate:model":n[2]||(n[2]=s=>e.value=s),disabled:""},null,8,["model"]),n[6]||(n[6]=o("label",{for:"checkbox-mail"}," Почта ",-1))],2),o("li",{class:c(r.$style.item)},[a(d,{id:"checkbox-pigeons",model:j.value,"onUpdate:model":n[3]||(n[3]=s=>j.value=s),disabled:""},null,8,["model"]),n[7]||(n[7]=o("label",{for:"checkbox-pigeons"}," Голуби ",-1))],2)],2)],2))}}),E="_container_1v5cg_1",I="_list_1v5cg_6",X="_item_1v5cg_14",L={container:E,list:I,item:X},O={$style:L},P=T(y,[["__cssModules",O]]);y.__docgenInfo={exportName:"default",displayName:"UiCheckbox.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiCheckbox.example.vue"]};function g(i){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...C(),...i.components};return l.jsxs(l.Fragment,{children:[l.jsx(e.h1,{id:"uicheckbox",children:"UiCheckbox"}),`
`,l.jsxs(e.p,{children:[l.jsx(e.code,{children:"UiCheckbox"})," - компонент для выбора одного или нескольких значений."]}),`
`,l.jsx(e.h2,{id:"когда-использовать",children:"Когда использовать"}),`
`,l.jsxs(e.ul,{children:[`
`,l.jsx(e.li,{children:"для независимых булевых флагов (вкл/выкл);"}),`
`,l.jsx(e.li,{children:"для множественного выбора из списка;"}),`
`,l.jsxs(e.li,{children:["для иерархических сценариев с промежуточным состоянием (",l.jsx(e.code,{children:"indeterminate"}),")."]}),`
`]}),`
`,l.jsx(e.h2,{id:"импорт",children:"Импорт"}),`
`,l.jsx(e.pre,{children:l.jsx(e.code,{className:"language-ts",children:`import { UiCheckbox } from '@retailcrm/embed-ui-v1-components/remote'
`})}),`
`,l.jsx(e.h2,{id:"базовое-использование",children:"Базовое использование"}),`
`,l.jsx(e.pre,{children:l.jsx(e.code,{className:"language-vue",children:`<template>
  <UiCheckbox id="notifications" v-model:model="enabled" />
  <label for="notifications">Уведомления</label>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UiCheckbox } from '@retailcrm/embed-ui-v1-components/remote'

const enabled = ref(false)
<\/script>
`})}),`
`,l.jsx(e.h2,{id:"сценарии",children:"Сценарии"}),`
`,l.jsx(e.h3,{id:"одиночный-флаг",children:"Одиночный флаг"}),`
`,l.jsxs(e.p,{children:["Когда ",l.jsx(e.code,{children:"model"})," — ",l.jsx(e.code,{children:"boolean"}),", компонент работает как обычный переключаемый флаг."]}),`
`,l.jsx(e.h3,{id:"множественный-выбор",children:"Множественный выбор"}),`
`,l.jsxs(e.p,{children:["Когда ",l.jsx(e.code,{children:"model"})," — массив, используйте ",l.jsx(e.code,{children:"value"})," у каждого чекбокса:"]}),`
`,l.jsx(e.pre,{children:l.jsx(e.code,{className:"language-vue",children:`<UiCheckbox v-model:model="channels" value="email" />
<UiCheckbox v-model:model="channels" value="sms" />
`})}),`
`,l.jsxs(e.h3,{id:"промежуточное-состояние-indeterminate",children:["Промежуточное состояние (",l.jsx(e.code,{children:"indeterminate"}),")"]}),`
`,l.jsx(e.p,{children:"Полезно для “родительского” чекбокса, который управляет группой дочерних значений."}),`
`,l.jsx(F,{is:P}),`
`,l.jsx(e.h2,{id:"события-и-модель",children:"События и модель"}),`
`,l.jsxs(e.p,{children:[l.jsx(e.code,{children:"UiCheckbox"})," поддерживает:"]}),`
`,l.jsxs(e.ul,{children:[`
`,l.jsxs(e.li,{children:[l.jsx(e.code,{children:"v-model:model"})," — основное состояние (",l.jsx(e.code,{children:"boolean | Primitive[]"}),");"]}),`
`,l.jsxs(e.li,{children:[l.jsx(e.code,{children:"change"})," — событие изменения, которое удобно использовать для ручной синхронизации сложных групп."]}),`
`]}),`
`,l.jsx(e.h2,{id:"a11y",children:"A11y"}),`
`,l.jsxs(e.ul,{children:[`
`,l.jsxs(e.li,{children:["Используйте явную связку через ",l.jsx(e.code,{children:"id"})," + ",l.jsx(e.code,{children:'<label for="...">'}),"."]}),`
`,l.jsxs(e.li,{children:["Для группы чекбоксов с общим названием предпочтительно использовать ",l.jsx(e.code,{children:"fieldset"})," + ",l.jsx(e.code,{children:"legend"}),"."]}),`
`,l.jsxs(e.li,{children:["Для отключённых значений (",l.jsx(e.code,{children:"disabled"}),") не полагайтесь только на цветовую индикацию: текстовое описание состояния тоже желательно."]}),`
`]}),`
`,l.jsx(e.h2,{id:"полный-api",children:"Полный API"}),`
`,l.jsx(A,{})]})}function R(i={}){const{wrapper:e}={...C(),...i.components};return e?l.jsx(e,{...i,children:l.jsx(g,{...i})}):g(i)}const le={title:"Components/UiCheckbox",component:d,argTypes:{id:{control:!1}},render:i=>({components:{UiCheckbox:d},setup(){return{model:m(i.model),props:u(()=>w(i,["id","model"]))}},template:`
      <UiCheckbox
          id="checkbox"
          v-model:model="model"
          v-bind="props"
          style="margin-right: 8px"
      />

      <label for="checkbox">
          Checkbox
      </label>
    `}),parameters:{docs:{page:R},layout:"centered"}},x={};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:"{}",...x.parameters?.docs?.source}}};const ne=["Sandbox"];export{x as Sandbox,ne as __namedExportsOrder,le as default};
