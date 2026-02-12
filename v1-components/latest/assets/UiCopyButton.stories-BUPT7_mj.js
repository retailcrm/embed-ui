import{_ as s}from"./UiCopyButton-Dl7SKkaV.js";import{S as d}from"./UiButton-Ba4gqCS2.js";import{j as e}from"./index-Djyvt97q.js";import{useMDXComponents as m}from"./index-Cdf3Trmt.js";import{T as l}from"./ToReact-rGZD6-Z2.js";import{g as u,q as x,w as p,o as h,z as i}from"./iframe-CzwIxcDt.js";import"./UiTooltip-C6tf22td.js";import"./UiPopper-CtcSfCYW.js";import"./predicate-ClulhfEu.js";import"./composables-B2GYaaEv.js";import"./index-B44Kv34C.js";import"./preload-helper-PPVm8Dsz.js";const c=u({__name:"ExampleBasic",setup(n){return(t,o)=>(h(),x(s,{text:"Текст для копирования",size:"sm"},{hint:p(()=>[...o[0]||(o[0]=[i(" Скопировать ",-1)])]),"hint-copied":p(()=>[...o[1]||(o[1]=[i(" Скопировано ",-1)])]),_:1}))}});c.__docgenInfo={exportName:"default",displayName:"ExampleBasic",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/examples/copy-button/ExampleBasic.vue"]};function a(n){const t={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...m(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(t.h1,{id:"uicopybutton",children:"UiCopyButton"}),`
`,e.jsx(t.p,{children:"Кнопки для копирования текста"}),`
`,e.jsx(t.h2,{id:"механика",children:"Механика"}),`
`,e.jsx(t.p,{children:`При клике на кнопку (по-умолчанию третичная) копируется заранее заготовленный текст. Кнопка при этом имеет всплывающую
подсказку, контент которой на некоторое время меняется после копирования текста в буфер обмена (индикация, что текст
скопирован).`}),`
`,e.jsx(t.h2,{id:"применение",children:"Применение"}),`
`,e.jsx(t.p,{children:"Код:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<template>
    <UiCopyButton text="Текст для копирования" size="sm">
        <template #hint>
            Скопировать
        </template>

        <template #hint-copied>
            Скопировано
        </template>
    </UiCopyButton>
</template>

<script lang="ts" setup>
import { UiCopyButton } from '@retailcrm/embed-ui-v1-components/remote'
<\/script>
`})}),`
`,e.jsx(t.p,{children:"Результат:"}),`
`,e.jsx(l,{is:c})]})}function j(n={}){const{wrapper:t}={...m(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(a,{...n})}):a(n)}const S={title:"Components/UiCopyButton",component:s,args:{text:"Long enough text worth to be copied"},argTypes:{size:{options:Object.values(d)}},render:n=>({components:{UiCopyButton:s},setup:()=>({args:n}),template:`
      <UiCopyButton v-bind="args">
          <template #hint>
              Скопировать
          </template>

          <template #hint-copied>
              Скопировано
          </template>
      </UiCopyButton>
    `}),parameters:{docs:{page:j},layout:"centered"}},r={};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source}}};const z=["Sandbox"];export{r as Sandbox,z as __namedExportsOrder,S as default};
