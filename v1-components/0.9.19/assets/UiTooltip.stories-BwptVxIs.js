import{_ as s}from"./UiButton-BW-9Kv_t.js";import{_ as a}from"./UiLink-_Zk6dUaG.js";import{_ as c}from"./UiPopperConnector-awwMp4eP.js";import{_ as d}from"./UiPopperTarget-DnWr3KtB.js";import{_ as i}from"./UiTooltip-CrJRb4qB.js";import{j as t}from"./jsx-runtime-ClSgB0tP.js";import{useMDXComponents as p}from"./index-BcU0IgrJ.js";import{A as l}from"./blocks-D9_kj3CA.js";import"./iframe-D1v8aj2J.js";import"./preload-helper-PPVm8Dsz.js";import"./predicate-ClulhfEu.js";import"./render-C5QpuNHX.js";import"./composables-CsRkzQ-G.js";import"./UiPopper-R2Okej2s.js";import"./index-B4jHIdoR.js";function r(e){const o={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...p(),...e.components};return t.jsxs(t.Fragment,{children:[t.jsx(o.h1,{id:"uitooltip",children:"UiTooltip"}),`
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
`,t.jsx(l,{})]})}function m(e={}){const{wrapper:o}={...p(),...e.components};return o?t.jsx(o,{...e,children:t.jsx(r,{...e})}):r(e)}const k={title:"Components/UiTooltip",component:i,argTypes:{target:{table:{disable:!0}},placement:{control:"select",options:["top","right","bottom","left"].reduce((e,o)=>e.concat([o,`${o}-start`,`${o}-end`]),[])}},render:e=>({components:{UiButton:s,UiLink:a,UiPopperConnector:c,UiPopperTarget:d,UiTooltip:i},setup(){return{args:e}},template:`
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
    `}),parameters:{docs:{page:m},layout:"centered"}},n={};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:"{}",...n.parameters?.docs?.source}}};const B=["Sandbox"];export{n as Sandbox,B as __namedExportsOrder,k as default};
