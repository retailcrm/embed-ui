import{h as N,c as f,a as s,n as c,k as a,F as M,j as S,r as m,q as b,o as g,t as w}from"./iframe-DnG3g5pW.js";import{_ as d}from"./UiCheckbox-CXJMPWNZ.js";import{w as A}from"./utils-BqzVSXwn.js";import{u as y,j as l}from"./index-DFg_Ho_i.js";import{A as D}from"./blocks-DBDDY4vL.js";import{T as F}from"./ToReact-DbRAeBf3.js";import{_ as T}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./preload-helper-PPVm8Dsz.js";import"./done-B176HZ5x.js";import"./composables-CfEvSTVp.js";import"./index-nl1gzEpR.js";const B=["for"],p=N({__name:"UiCheckbox.example",setup(i){const e=m(!0),j=m(!0),v=m(!0),t=m([]),u=[{label:"ВКонтакте",value:"vk"},{label:"Инстаграм",value:"instagram"}],U=b(()=>t.value.length>0),k=b(()=>U.value&&t.value.length<u.length),_=r=>{const n=u.map(h=>h.value),o=k.value;t.value=r||o?n:[]};return(r,n)=>(g(),f("div",{class:c(r.$style.container)},[s("ul",{class:c(r.$style.list)},[s("li",{class:c(r.$style.item)},[a(d,{id:"checkbox-phone",model:j.value,"onUpdate:model":n[0]||(n[0]=o=>j.value=o)},null,8,["model"]),n[4]||(n[4]=s("label",{for:"checkbox-phone"}," Телефон ",-1))],2),s("li",{class:c(r.$style.item)},[a(d,{id:"checkbox-socials",model:t.value.length>0,indeterminate:k.value,onChange:_},null,8,["model","indeterminate"]),n[5]||(n[5]=s("label",{for:"checkbox-socials"}," Социальные сети ",-1)),s("ul",{class:c(r.$style.list)},[(g(),f(M,null,S(u,(o,h)=>s("li",{key:o.value,class:c(r.$style.item)},[a(d,{id:"checkbox-socials-"+h,model:t.value,"onUpdate:model":n[1]||(n[1]=$=>t.value=$),value:o.value},null,8,["id","model","value"]),s("label",{for:"checkbox-socials-"+h},w(o.label),9,B)],2)),64))],2)],2),s("li",{class:c(r.$style.item)},[a(d,{id:"checkbox-mail",model:e.value,"onUpdate:model":n[2]||(n[2]=o=>e.value=o),disabled:""},null,8,["model"]),n[6]||(n[6]=s("label",{for:"checkbox-mail"}," Почта ",-1))],2),s("li",{class:c(r.$style.item)},[a(d,{id:"checkbox-pigeons",model:v.value,"onUpdate:model":n[3]||(n[3]=o=>v.value=o),disabled:""},null,8,["model"]),n[7]||(n[7]=s("label",{for:"checkbox-pigeons"}," Голуби ",-1))],2)],2)],2))}}),E="_container_1v5cg_1",I="_list_1v5cg_6",O="_item_1v5cg_14",X={container:E,list:I,item:O},L={$style:X},P=T(p,[["__cssModules",L]]);p.__docgenInfo=Object.assign({displayName:p.name??p.__name},{exportName:"default",displayName:"UiCheckbox.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiCheckbox.example.vue"]});function C(i){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...y(),...i.components};return l.jsxs(l.Fragment,{children:[l.jsx(e.h1,{id:"uicheckbox",children:"UiCheckbox"}),`
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
`,l.jsx(D,{})]})}function R(i={}){const{wrapper:e}={...y(),...i.components};return e?l.jsx(e,{...i,children:l.jsx(C,{...i})}):C(i)}const ee={title:"Components/UiCheckbox",component:d,argTypes:{id:{control:!1}},render:i=>({components:{UiCheckbox:d},setup(){return{model:m(i.model),props:b(()=>A(i,["id","model"]))}},template:`
      <UiCheckbox
          id="checkbox"
          v-model:model="model"
          v-bind="props"
          style="margin-right: 8px"
      />

      <label for="checkbox">
          Checkbox
      </label>
    `}),parameters:{docs:{page:R},layout:"centered"}},x={};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:"{}",...x.parameters?.docs?.source}}};const le=["Sandbox"];export{x as Sandbox,le as __namedExportsOrder,ee as default};
