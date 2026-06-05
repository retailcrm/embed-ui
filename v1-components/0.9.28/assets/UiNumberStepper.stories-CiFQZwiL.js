import{h as c,s as d,v as t,r as l,o as p,c as T,k as w,S as C,q as E}from"./iframe-DX-y0Vc4.js";import{k as F,l as R,v as i,D as I}from"./index-DVqNURtm.js";import{o as V}from"./utils-BqzVSXwn.js";import{S as z}from"./UiTextbox--7i-ebpm.js";import{u as D,j as r}from"./index-BfkEq5Oq.js";import{A}from"./blocks-Y9P97Z3B.js";import{T as m}from"./ToReact-BWOBHg2P.js";/* empty css              */import"./UiAlert-DW2j_Eqa.js";import"./UiAddButton-CgfMjTcF.js";import"./UiAvatar-C8SX6HtE.js";import"./UiAvatarList-1CcNvxTq.js";import"./UiButton-CWoy0lV6.js";import"./UiCalendar-DeEdQ8B3.js";import"./UiCheckbox-CNRbCuqx.js";import"./UiCollapse-B9Z94B9i.js";import"./UiCollapseGroup-Clo5xYr4.js";import"./UiCopyButton-Dz5H6-5j.js";import"./UiDate-DOZqm0oj.js";import"./UiDatePicker-DICxdwyp.js";import"./UiError-CgtYEdkp.js";import"./UiImage-C9TX9Jb_.js";import"./UiInfobox-BB2PQfi9.js";import"./UiLink-Chr48SVv.js";import"./UiYandexMap-CJw27-m7.js";import"./UiMenuItem-BnnTBsGj.js";import"./delete-outlined-DNG4dOJ9.js";import"./UiModalWindow-B4jgYPCQ.js";import"./UiPopper-CfbbUJa-.js";import"./UiPopperTarget-CpydGCyI.js";import"./UiRadio-Db9x3K3c.js";import"./UiScrollBox-Bb5mxW7L.js";import"./UiSkeleton-Cav3jWre.js";import"./UiSlider-CfNPfQEn.js";import"./UiSwitch-Bo8a194K.js";import"./UiTag-Smz_W29H.js";import"./UiTimePicker-BPeMocRg.js";import"./UiToggleButton-1xZiiHyw.js";import"./UiToolbarButton-Dd2SRV8w.js";import"./UiToolbarLink-Cca9VRbO.js";import"./UiTooltip-DiMRfBp5.js";import"./UiTransition-CocJ_aiN.js";import"./preload-helper-PPVm8Dsz.js";import"./caret-down-CNb73_g2.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./add-BE-N8Ppz.js";import"./plugin-C77-c4UV.js";import"./index-BAxMPZdI.js";import"./composables-g6Lsp4T6.js";import"./index-DOEnI1F6.js";import"./checkmark-circle-outlined-D0gQzdT0.js";import"./clear-C07B9uw3.js";import"./info-outlined-BBoSOzE7.js";import"./predicate-ClulhfEu.js";import"./render-FS21dnL0.js";import"./chevron-right-DfjJAWWu.js";import"./done-DHRK8rB3.js";import"./ru-Chw6HHdR.js";import"./uid-D7dXnRUx.js";const $=()=>F(R);$();const g=c({__name:"UiNumberStepper.basic.example",setup(o){const e=l(10);return(a,n)=>(p(),d(t(i),{value:e.value,"onUpdate:value":n[0]||(n[0]=s=>e.value=s),min:0,max:100,step:1},null,8,["value"]))}});g.__docgenInfo=Object.assign({displayName:g.name??g.__name},{exportName:"default",displayName:"UiNumberStepper.basic.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiNumberStepper.basic.example.vue"]});const f=c({__name:"UiNumberStepper.nullable.example",setup(o){const e=l(null);return(a,n)=>(p(),d(t(i),{value:e.value,"onUpdate:value":n[0]||(n[0]=s=>e.value=s),nullable:"",min:-100,max:100},null,8,["value"]))}});f.__docgenInfo=Object.assign({displayName:f.name??f.__name},{exportName:"default",displayName:"UiNumberStepper.nullable.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiNumberStepper.nullable.example.vue"]});const N=c({__name:"UiNumberStepper.clamp.example",setup(o){const e=l(12);return(a,n)=>(p(),d(t(i),{value:e.value,"onUpdate:value":n[0]||(n[0]=s=>e.value=s),min:0,max:10,step:2,clamp:!1},null,8,["value"]))}});N.__docgenInfo=Object.assign({displayName:N.name??N.__name},{exportName:"default",displayName:"UiNumberStepper.clamp.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiNumberStepper.clamp.example.vue"]});const S=c({__name:"UiNumberStepper.decimal.example",setup(o){const e=l(1.5);return(a,n)=>(p(),d(t(i),{value:e.value,"onUpdate:value":n[0]||(n[0]=s=>e.value=s),min:-5,max:5,step:.25,decimals:2},null,8,["value"]))}});S.__docgenInfo=Object.assign({displayName:S.name??S.__name},{exportName:"default",displayName:"UiNumberStepper.decimal.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiNumberStepper.decimal.example.vue"]});const P={style:{display:"grid",gap:"12px"}},U=c({__name:"UiNumberStepper.inline.example",setup(o){const e=l(5),a=l(10);return(n,s)=>(p(),T("div",P,[w(t(i),{value:e.value,"onUpdate:value":s[0]||(s[0]=k=>e.value=k),outlined:!1,size:"sm",min:0,max:20},null,8,["value"]),w(t(i),{value:a.value,"onUpdate:value":s[1]||(s[1]=k=>a.value=k),outlined:!1,size:"md",min:0,max:20},null,8,["value"])]))}});U.__docgenInfo=Object.assign({displayName:U.name??U.__name},{exportName:"default",displayName:"UiNumberStepper.inline.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiNumberStepper.inline.example.vue"]});const y=c({__name:"UiNumberStepper.vertical.example",setup(o){const e=l(5);return(a,n)=>(p(),d(t(i),{value:e.value,"onUpdate:value":n[0]||(n[0]=s=>e.value=s),direction:"vertical",min:0,max:10},null,8,["value"]))}});y.__docgenInfo=Object.assign({displayName:y.name??y.__name},{exportName:"default",displayName:"UiNumberStepper.vertical.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiNumberStepper.vertical.example.vue"]});function O(o){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...D(),...o.components};return r.jsxs(r.Fragment,{children:[r.jsx(e.h1,{id:"uinumberstepper",children:"UiNumberStepper"}),`
`,r.jsxs(e.p,{children:[r.jsx(e.code,{children:"UiNumberStepper"})," - числовое поле с кнопками увеличения/уменьшения значения."]}),`
`,r.jsx(e.h2,{id:"импорт",children:"Импорт"}),`
`,r.jsx(e.pre,{children:r.jsx(e.code,{className:"language-ts",children:`import { UiNumberStepper } from '@retailcrm/embed-ui-v1-components/remote'
`})}),`
`,r.jsx(e.h2,{id:"базовое-использование",children:"Базовое использование"}),`
`,r.jsx(e.pre,{children:r.jsx(e.code,{className:"language-vue",children:`<template>
  <UiNumberStepper v-model:value="value" :min="0" :max="100" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UiNumberStepper } from '@retailcrm/embed-ui-v1-components/remote'

const value = ref<number | null>(10)
<\/script>
`})}),`
`,r.jsx(m,{is:g}),`
`,r.jsx(e.h2,{id:"режимы",children:"Режимы"}),`
`,r.jsx(e.h3,{id:"nullable",children:r.jsx(e.code,{children:"nullable"})}),`
`,r.jsxs(e.p,{children:["Если ",r.jsx(e.code,{children:"nullable=true"}),", пустое поле эмитит ",r.jsx(e.code,{children:"null"}),"."]}),`
`,r.jsx(m,{is:f}),`
`,r.jsx(e.h3,{id:"clamp",children:r.jsx(e.code,{children:"clamp"})}),`
`,r.jsxs(e.p,{children:["Если ",r.jsx(e.code,{children:"clamp=true"}),", значение ограничивается диапазоном ",r.jsx(e.code,{children:"[min, max]"}),`.
Если `,r.jsx(e.code,{children:"clamp=false"}),", значение не ограничивается, а выход за диапазон приходит через ",r.jsx(e.code,{children:"violation"}),"."]}),`
`,r.jsx(m,{is:N}),`
`,r.jsxs(e.h3,{id:"дробные-шаги-decimals-step",children:["Дробные шаги (",r.jsx(e.code,{children:"decimals"}),", ",r.jsx(e.code,{children:"step"}),")"]}),`
`,r.jsx(m,{is:S}),`
`,r.jsxs(e.h3,{id:"inline-режим-outlinedfalse",children:["Inline режим (",r.jsx(e.code,{children:"outlined=false"}),")"]}),`
`,r.jsxs(e.p,{children:["Режим без рамки наследует правила ",r.jsx(e.code,{children:"UiTextbox"})," для inline и поддерживает размеры."]}),`
`,r.jsx(m,{is:U}),`
`,r.jsxs(e.h3,{id:"вертикальные-кнопки-directionvertical",children:["Вертикальные кнопки (",r.jsx(e.code,{children:'direction="vertical"'}),")"]}),`
`,r.jsx(m,{is:y}),`
`,r.jsx(e.h2,{id:"события",children:"События"}),`
`,r.jsxs(e.ul,{children:[`
`,r.jsxs(e.li,{children:[r.jsx(e.code,{children:"update:value"})," - новое значение для ",r.jsx(e.code,{children:"v-model:value"})," (",r.jsx(e.code,{children:"number | null"}),");"]}),`
`,r.jsxs(e.li,{children:[r.jsx(e.code,{children:"change"})," - изменение значения пользователем;"]}),`
`,r.jsxs(e.li,{children:[r.jsx(e.code,{children:"increase"})," / ",r.jsx(e.code,{children:"decrease"})," - шаговые операции;"]}),`
`,r.jsxs(e.li,{children:[r.jsx(e.code,{children:"focus"})," / ",r.jsx(e.code,{children:"blur"})," - события фокуса поля;"]}),`
`,r.jsxs(e.li,{children:[r.jsx(e.code,{children:"violation"})," - объект ",r.jsx(e.code,{children:"{ value, codes }"})," с кодами нарушений (",r.jsx(e.code,{children:"too-large"}),", ",r.jsx(e.code,{children:"too-small"}),", ",r.jsx(e.code,{children:"nan"}),")."]}),`
`]}),`
`,r.jsx(e.h2,{id:"доступность-и-клавиатура",children:"Доступность и клавиатура"}),`
`,r.jsxs(e.p,{children:["Компонент использует паттерн ",r.jsx(e.code,{children:"spinbutton"}),":"]}),`
`,r.jsxs(e.ul,{children:[`
`,r.jsxs(e.li,{children:[r.jsx(e.code,{children:'role="spinbutton"'})," и ",r.jsx(e.code,{children:"aria-valuenow/min/max"})," на поле ввода;"]}),`
`,r.jsxs(e.li,{children:[r.jsx(e.code,{children:"aria-controls"})," и доступные ",r.jsx(e.code,{children:"aria-label"})," на кнопках."]}),`
`]}),`
`,r.jsx(e.p,{children:"Клавиатура:"}),`
`,r.jsxs(e.ul,{children:[`
`,r.jsxs(e.li,{children:[r.jsx(e.code,{children:"ArrowUp"})," / ",r.jsx(e.code,{children:"ArrowDown"})," - увеличить / уменьшить на ",r.jsx(e.code,{children:"step"}),";"]}),`
`,r.jsxs(e.li,{children:[r.jsx(e.code,{children:"PageUp"})," / ",r.jsx(e.code,{children:"PageDown"})," - увеличить / уменьшить на ",r.jsx(e.code,{children:"step * 10"}),";"]}),`
`,r.jsxs(e.li,{children:[r.jsx(e.code,{children:"Home"})," / ",r.jsx(e.code,{children:"End"})," - перейти к ",r.jsx(e.code,{children:"min"})," / ",r.jsx(e.code,{children:"max"})," (если заданы)."]}),`
`]}),`
`,r.jsx(e.h2,{id:"полный-api",children:"Полный API"}),`
`,r.jsx(A,{})]})}function L(o={}){const{wrapper:e}={...D(),...o.components};return e?r.jsx(e,{...o,children:r.jsx(O,{...o})}):O(o)}const Ze={title:"Components/UiNumberStepper",component:i,args:{id:"number-stepper-sandbox",value:10,min:0,max:100,step:1,decimals:"*",clamp:!0,nullable:!1,disabled:!1,readonly:!1,required:!1,direction:I.HORIZONTAL,size:"sm",outlined:!0,textboxOptions:{}},argTypes:{value:{control:!1},min:{control:"number"},max:{control:"number"},step:{control:{type:"number",min:1e-4}},decimals:{control:"text"},clamp:{control:"boolean"},nullable:{control:"boolean"},disabled:{control:"boolean"},readonly:{control:"boolean"},required:{control:"boolean"},size:{control:"select",options:Object.values(z)},outlined:{control:"boolean"},direction:{control:"inline-radio",options:Object.values(I)},textboxOptions:{control:"object"}},render:o=>({components:{UiNumberStepper:i},setup(){const e=l(typeof o.value=="number"?o.value:null),a=l("[]");return C(()=>o.value,n=>{e.value=typeof n=="number"?n:null}),{value:e,violation:a,props:E(()=>V(o,["value"])),onViolation:n=>{a.value=JSON.stringify(n,null,2)}}},template:`
      <div style="display: grid; gap: 8px; min-width: 220px;">
          <UiNumberStepper
              v-model:value="value"
              v-bind="props"
              @violation="onViolation"
          />

          <div style="font-size: 12px; color: #666;">
              Value: {{ value === null ? 'null' : value }}
          </div>

          <pre style="margin: 0; font-size: 12px; color: #666; white-space: pre-wrap;">Violation: {{ violation }}</pre>
      </div>
    `}),parameters:{docs:{page:L},layout:"centered"}},u={},x={args:{nullable:!0,value:null}},v={args:{clamp:!1,value:120,min:0,max:100}},b={args:{value:2.5,step:.25,decimals:2,min:-10,max:10}},h={args:{direction:I.VERTICAL,value:5,min:0,max:10}},j={args:{outlined:!1,size:"sm",value:5,min:0,max:20}},_={args:{disabled:!0,value:10}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:"{}",...u.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    nullable: true,
    value: null
  }
}`,...x.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    clamp: false,
    value: 120,
    min: 0,
    max: 100
  }
}`,...v.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    value: 2.5,
    step: 0.25,
    decimals: 2,
    min: -10,
    max: 10
  }
}`,...b.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    direction: DIRECTION.VERTICAL,
    value: 5,
    min: 0,
    max: 10
  }
}`,...h.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    outlined: false,
    size: 'sm',
    value: 5,
    min: 0,
    max: 20
  }
}`,...j.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    value: 10
  }
}`,..._.parameters?.docs?.source}}};const Je=["Sandbox","Nullable","FreeRange","Decimal","Vertical","Inline","Disabled"];export{b as Decimal,_ as Disabled,v as FreeRange,j as Inline,x as Nullable,u as Sandbox,h as Vertical,Je as __namedExportsOrder,Ze as default};
