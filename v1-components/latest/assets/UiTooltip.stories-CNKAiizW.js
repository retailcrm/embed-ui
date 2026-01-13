import{_ as a}from"./UiButton-Dxod3Bnp.js";import{_ as s}from"./UiLink-DjpTRh8B.js";import{_ as c,a as d}from"./UiPopperTarget-Gi5jAWtl.js";import{_ as i}from"./UiTooltip-CNoJgJjS.js";import{j as t}from"./index-Djyvt97q.js";import{useMDXComponents as p}from"./index-Cdf3Trmt.js";import{A as l}from"./blocks-CCfO1T30.js";import"./iframe-8yHAjMl9.js";import"./preload-helper-PPVm8Dsz.js";import"./predicate-ClulhfEu.js";import"./composables-DLLcKDKM.js";import"./UiPopper-CKfObKHg.js";import"./index-B44Kv34C.js";function r(e){const o={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...p(),...e.components};return t.jsxs(t.Fragment,{children:[t.jsx(o.h1,{id:"uitooltip",children:"UiTooltip"}),`
`,t.jsx(o.p,{children:"Всплывающая подсказка"}),`
`,t.jsx(o.h2,{id:"поведение",children:"Поведение"}),`
`,t.jsx(o.p,{children:`По-умолчанию подсказка отображается по наведению на целевой элемент и скрывается если увести курсор с элемента
или кликнуть по нему.`}),`
`,t.jsx(o.h2,{id:"применение",children:"Применение"}),`
`,t.jsxs(o.p,{children:["Компоненту ",t.jsx(o.code,{children:"UiPopper"}),", используемому в качестве базы для ",t.jsx(o.code,{children:"UiTooltip"}),`, требуется иметь информацию о цели.
Встроенные компоненты `,t.jsx(o.code,{children:"embed-ui"}),` такую информацию предоставляют, но чтобы связать её с плавающим элементом, нужно
использовать перемычку `,t.jsx(o.code,{children:"UiPopperConnector"}),":"]}),`
`,t.jsx(o.pre,{children:t.jsx(o.code,{className:"language-html",children:`<template>
    <UiPopperConnector>
        <UiButton disabled>
            Сохранить
        </UiButton>

        <UiTooltip>
            Перед сохранением нужно указать все обязательные поля
        </UiTooltip>
    </UiPopperConnector>
</template>
`})}),`
`,t.jsx(o.h2,{id:"api",children:"API"}),`
`,t.jsx(l,{})]})}function m(e={}){const{wrapper:o}={...p(),...e.components};return o?t.jsx(o,{...e,children:t.jsx(r,{...e})}):r(e)}const y={title:"Components/UiTooltip",component:i,argTypes:{target:{table:{disable:!0}},placement:{control:"select",options:["top","right","bottom","left"].reduce((e,o)=>e.concat([o,`${o}-start`,`${o}-end`]),[])}},render:e=>({components:{UiButton:a,UiLink:s,UiPopperConnector:d,UiPopperTarget:c,UiTooltip:i},setup(){return{args:e}},template:`
      <div class="mb-4">
          <UiPopperConnector>
              <UiButton>
                  I have a tooltip
              </UiButton>

              <UiTooltip v-bind="args">
                  Tooltip content
              </UiTooltip>
          </UiPopperConnector>
      </div>

      <div class="mb-4">
          <UiPopperConnector>
              <UiPopperTarget tag="a" href="javascript:void(0);">
                  [UiPopperTarget]
              </UiPopperTarget>

              <UiTooltip v-bind="args">
                  Tooltip content that is very long and has a lot of text.
              </UiTooltip>
          </UiPopperConnector>
      </div>

      <div>
          <UiPopperConnector>
              <UiLink>
                  [UiLink]
              </UiLink>

              <UiTooltip v-bind="args">
                  Tooltip content that contains a long words inside, like
                  <b style="color: #6CADFF">"characterization"</b>
              </UiTooltip>
          </UiPopperConnector>
      </div>
    `}),parameters:{docs:{page:m},layout:"centered"}},n={};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:"{}",...n.parameters?.docs?.source}}};const $=["Sandbox"];export{n as Sandbox,$ as __namedExportsOrder,y as default};
