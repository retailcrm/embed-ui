import{r as i}from"./iframe-DnG3g5pW.js";import{_ as r,U as t}from"./UiToggleButton-CbM4Ye4K.js";import{u as o,j as e}from"./index-DFg_Ho_i.js";import{S as g,A as a}from"./blocks-DBDDY4vL.js";import"./preload-helper-PPVm8Dsz.js";import"./render-vaNyDQt4.js";import"./composables-CfEvSTVp.js";import"./index-nl1gzEpR.js";function l(n){const s={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...o(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(s.h1,{id:"uitogglebutton",children:"UiToggleButton"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.code,{children:"UiToggleButton"})," - базовая переключаемая кнопка для сценариев, где элемент визуально выглядит как button, но хранит состояние ",e.jsx(s.code,{children:"pressed"}),"."]}),`
`,e.jsx(s.h2,{id:"когда-использовать",children:"Когда использовать"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"для одиночных toggle-действий вроде “показывать фильтры” или “включить режим”;"}),`
`,e.jsx(s.li,{children:"как примитив для составных segmented controls;"}),`
`,e.jsxs(s.li,{children:["когда нужно состояние ",e.jsx(s.code,{children:"pressed"}),", но не нужен отдельный checkbox/radio-инпут."]}),`
`]}),`
`,e.jsx(s.h2,{id:"поведение",children:"Поведение"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Компонент рендерится как ",e.jsx(s.code,{children:"button"}),"."]}),`
`,e.jsxs(s.li,{children:["По умолчанию пробрасывает ",e.jsx(s.code,{children:"aria-pressed"}),"."]}),`
`,e.jsxs(s.li,{children:["Если внешний код уже задаёт ",e.jsx(s.code,{children:"aria-pressed"})," или ",e.jsx(s.code,{children:"aria-checked"}),", компонент не перетирает этот атрибут."]}),`
`,e.jsxs(s.li,{children:["Режим ",e.jsx(s.code,{children:"grouped"})," нужен для склейки соседних кнопок в сегментированную группу."]}),`
`]}),`
`,e.jsx(s.h2,{id:"примеры",children:"Примеры"}),`
`,e.jsx(s.h3,{id:"1-одиночный-toggle",children:"1. Одиночный toggle"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-vue",children:`<template>
  <UiToggleButton :pressed="opened" @click="opened = !opened">
    Фильтры
  </UiToggleButton>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UiToggleButton } from '@retailcrm/embed-ui-v1-components/remote'

const opened = ref(false)
<\/script>
`})}),`
`,e.jsx(s.h3,{id:"2-сегментированная-группа-на-примитиве",children:"2. Сегментированная группа на примитиве"}),`
`,e.jsxs(s.p,{children:["Если нужно вручную собрать несколько сегментов без ",e.jsx(s.code,{children:"UiToggleGroup"}),", используйте ",e.jsx(s.code,{children:"grouped"}),"."]}),`
`,e.jsx(g,{of:d}),`
`,e.jsx(s.h2,{id:"размеры",children:"Размеры"}),`
`,e.jsxs(s.p,{children:["Поддерживаются размеры ",e.jsx(s.code,{children:"lg"}),", ",e.jsx(s.code,{children:"md"}),", ",e.jsx(s.code,{children:"sm"})," и ",e.jsx(s.code,{children:"xs"}),`.
Размер влияет на высоту, горизонтальные отступы, размер контента и радиусы, но хранится локально в toggle-слое и не импортируется из `,e.jsx(s.code,{children:"UiButton"}),"."]}),`
`,e.jsx(s.h2,{id:"a11y",children:"A11y"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Для одиночного toggle используйте состояние ",e.jsx(s.code,{children:"pressed"}),"."]}),`
`,e.jsxs(s.li,{children:["Если кнопка участвует в кастомной группе с multi-select семантикой, допускается явное ",e.jsx(s.code,{children:"aria-checked"}),"."]}),`
`,e.jsxs(s.li,{children:["Не используйте ",e.jsx(s.code,{children:"UiToggleButton"})," как radio-подобный single-select без дополнительной групповой логики."]}),`
`]}),`
`,e.jsx(s.h2,{id:"api",children:"API"}),`
`,e.jsx(a,{})]})}function u(n={}){const{wrapper:s}={...o(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(l,{...n})}):l(n)}const U={title:"Components/UiToggleButton",component:r,args:{pressed:!1,disabled:!1,grouped:!1,size:t.SM},argTypes:{size:{control:"select",options:Object.values(t)}},render:n=>({components:{UiToggleButton:r},setup(){const s=i(n.pressed??!1),c=i(["tags"]);return{args:n,segmentedPressed:c,singlePressed:s}},template:`
      <div style="display: inline-grid; gap: 16px;">
        <UiToggleButton
            v-bind="args"
            :pressed="singlePressed"
            @click="singlePressed = !singlePressed"
        >
            Фильтр
        </UiToggleButton>

        <div style="display: flex; max-width: 360px;">
          <UiToggleButton
              :size="args.size"
              :disabled="args.disabled"
              :grouped="true"
              :pressed="segmentedPressed.includes('tags')"
              @click="segmentedPressed = segmentedPressed.includes('tags') ? segmentedPressed.filter((value) => value !== 'tags') : [...segmentedPressed, 'tags']"
          >
              Теги
          </UiToggleButton>

          <UiToggleButton
              :size="args.size"
              :disabled="args.disabled"
              :grouped="true"
              :pressed="segmentedPressed.includes('notes')"
              @click="segmentedPressed = segmentedPressed.includes('notes') ? segmentedPressed.filter((value) => value !== 'notes') : [...segmentedPressed, 'notes']"
          >
              Заметки
          </UiToggleButton>

          <UiToggleButton
              :size="args.size"
              :disabled="args.disabled"
              :grouped="true"
              :pressed="segmentedPressed.includes('files')"
              @click="segmentedPressed = segmentedPressed.includes('files') ? segmentedPressed.filter((value) => value !== 'files') : [...segmentedPressed, 'files']"
          >
              Файлы
          </UiToggleButton>
        </div>
      </div>
    `}),parameters:{docs:{page:u},layout:"centered"}},d={};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:"{}",...d.parameters?.docs?.source}}};const B=["Sandbox"];export{d as Sandbox,B as __namedExportsOrder,U as default};
