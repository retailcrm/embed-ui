import{_ as r}from"./UiCopyButton-B73t6twj.js";import{S as a}from"./UiButton-Zb47_In4.js";import{u as p,j as e}from"./index-CfKMJr0v.js";import{A as h}from"./blocks-DVaKcPBX.js";import{T as m}from"./ToReact-DgK8bF_g.js";import{h as x,s as j,w as c,o as u,D as d}from"./iframe-RgRs0x2k.js";import"./checkmark-circle-outlined-DecXdccj.js";import"./UiTooltip-Bkwl6OdS.js";import"./UiPopper-BlHerxAZ.js";import"./predicate-ClulhfEu.js";import"./render-DL1-L7mu.js";import"./composables-Ddz9kiXo.js";import"./preload-helper-PPVm8Dsz.js";import"./index-f1RKRhP_.js";const o=x({__name:"ExampleBasic",setup(i){return(n,t)=>(u(),j(r,{text:"Текст для копирования",size:"sm"},{hint:c(()=>[...t[0]||(t[0]=[d(" Скопировать ",-1)])]),"hint-copied":c(()=>[...t[1]||(t[1]=[d(" Скопировано ",-1)])]),_:1}))}});o.__docgenInfo=Object.assign({displayName:o.name??o.__name},{exportName:"default",displayName:"ExampleBasic",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/examples/copy-button/ExampleBasic.vue"]});function l(i){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...p(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{id:"uicopybutton",children:"UiCopyButton"}),`
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
`,e.jsx(m,{is:o}),`
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
`,e.jsx(h,{})]})}function g(i={}){const{wrapper:n}={...p(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(l,{...i})}):l(i)}const I={title:"Components/UiCopyButton",component:r,args:{text:"Long enough text worth to be copied"},argTypes:{size:{options:Object.values(a)}},render:i=>({components:{UiCopyButton:r},setup:()=>({args:i}),template:`
      <UiCopyButton v-bind="args">
          <template #hint>
              Скопировать
          </template>

          <template #hint-copied>
              Скопировано
          </template>
      </UiCopyButton>
    `}),parameters:{docs:{page:g},layout:"centered"}},s={};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"{}",...s.parameters?.docs?.source}}};const S=["Sandbox"];export{s as Sandbox,S as __namedExportsOrder,I as default};
