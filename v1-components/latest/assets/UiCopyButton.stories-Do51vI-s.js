import{_ as s}from"./UiCopyButton-BbIKXoP_.js";import{S as h}from"./UiButton-k9GK71xk.js";import{j as e}from"./jsx-runtime-EB8vuoXy.js";import{useMDXComponents as l}from"./index-B4h7UWpK.js";import{A as a}from"./blocks-D_HfumAb.js";import{T as m}from"./ToReact-1jCUpHJh.js";import{h as x,s as j,w as r,o as u,C as c}from"./iframe-D_giepNj.js";import"./checkmark-circle-outlined-BNaIRBuJ.js";import"./UiTooltip-DGR-ozGF.js";import"./UiPopper-CLRmciwN.js";import"./predicate-ClulhfEu.js";import"./composables-pR5k2Fon.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CjlJ4NSM.js";const p=x({__name:"ExampleBasic",setup(i){return(n,t)=>(u(),j(s,{text:"Текст для копирования",size:"sm"},{hint:r(()=>[...t[0]||(t[0]=[c(" Скопировать ",-1)])]),"hint-copied":r(()=>[...t[1]||(t[1]=[c(" Скопировано ",-1)])]),_:1}))}});p.__docgenInfo={exportName:"default",displayName:"ExampleBasic",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/examples/copy-button/ExampleBasic.vue"]};function d(i){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...l(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{id:"uicopybutton",children:"UiCopyButton"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"UiCopyButton"})," - кнопка для копирования значения в буфер обмена с подсказкой об успешном копировании."]}),`
`,e.jsx(n.h2,{id:"когда-использовать",children:"Когда использовать"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"копирование ссылки, id, токена, API-ключа;"}),`
`,e.jsx(n.li,{children:"быстрое копирование значений из карточек и таблиц;"}),`
`,e.jsx(n.li,{children:"интерфейсы, где нужна явная индикация «Скопировано»."}),`
`]}),`
`,e.jsx(n.h2,{id:"импорт",children:"Импорт"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`import { UiCopyButton } from '@retailcrm/embed-ui-v1-components/remote'
`})}),`
`,e.jsx(n.h2,{id:"базовое-использование",children:"Базовое использование"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
  <UiCopyButton text="Текст для копирования" size="sm">
    <template #hint>
      Скопировать
    </template>

    <template #hint-copied>
      Скопировано
    </template>
  </UiCopyButton>
</template>

<script setup lang="ts">
import { UiCopyButton } from '@retailcrm/embed-ui-v1-components/remote'
<\/script>
`})}),`
`,e.jsx(m,{is:p}),`
`,e.jsx(n.h2,{id:"сценарии",children:"Сценарии"}),`
`,e.jsx(n.h3,{id:"кастомный-триггер",children:"Кастомный триггер"}),`
`,e.jsxs(n.p,{children:["Слот ",e.jsx(n.code,{children:"trigger"})," позволяет подставить любую кнопку или элемент, который будет вызывать копирование."]}),`
`,e.jsx(n.h3,{id:"настройка-всплывающей-подсказки",children:"Настройка всплывающей подсказки"}),`
`,e.jsxs(n.p,{children:["Через ",e.jsx(n.code,{children:"tooltipOptions"})," можно передать параметры ",e.jsx(n.code,{children:"UiTooltip"})," (например, ",e.jsx(n.code,{children:"placement"}),", ",e.jsx(n.code,{children:"offset"}),", ",e.jsx(n.code,{children:"container"}),")."]}),`
`,e.jsx(n.h3,{id:"размер-кнопки",children:"Размер кнопки"}),`
`,e.jsxs(n.p,{children:["Параметр ",e.jsx(n.code,{children:"size"})," принимает размеры из ",e.jsx(n.code,{children:"UiButton"})," (",e.jsx(n.code,{children:"xs"}),", ",e.jsx(n.code,{children:"sm"}),", ",e.jsx(n.code,{children:"md"}),", ",e.jsx(n.code,{children:"lg"}),")."]}),`
`,e.jsx(n.h2,{id:"слоты",children:"Слоты"}),`
`,e.jsx(n.p,{children:"Компонент поддерживает:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"trigger"})," - кастомный элемент-триггер;"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"hint"})," - текст подсказки до копирования;"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"hint-copied"})," - текст после успешного копирования."]}),`
`]}),`
`,e.jsx(n.h2,{id:"события",children:"События"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"error"})," - эмитится, если не удалось записать текст в буфер обмена."]}),`
`]}),`
`,e.jsx(n.h2,{id:"a11y",children:"A11y"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["По умолчанию используется нативная кнопка ",e.jsx(n.code,{children:"UiButton"}),", доступная с клавиатуры."]}),`
`,e.jsxs(n.li,{children:["Статус копирования сообщается через содержимое ",e.jsx(n.code,{children:"UiTooltip"}),"."]}),`
`,e.jsx(n.li,{children:"При недоступном Clipboard API используется fallback через скрытое поле ввода."}),`
`]}),`
`,e.jsx(n.h2,{id:"полный-api",children:"Полный API"}),`
`,e.jsx(a,{})]})}function g(i={}){const{wrapper:n}={...l(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(d,{...i})}):d(i)}const N={title:"Components/UiCopyButton",component:s,args:{text:"Long enough text worth to be copied"},argTypes:{size:{options:Object.values(h)}},render:i=>({components:{UiCopyButton:s},setup:()=>({args:i}),template:`
      <UiCopyButton v-bind="args">
          <template #hint>
              Скопировать
          </template>

          <template #hint-copied>
              Скопировано
          </template>
      </UiCopyButton>
    `}),parameters:{docs:{page:g},layout:"centered"}},o={};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};const S=["Sandbox"];export{o as Sandbox,S as __namedExportsOrder,N as default};
