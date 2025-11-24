import{_ as d}from"./UiButton-dkoPPCpU.js";import{_ as l}from"./UiLink-x_8uY8_J.js";import{_ as m,a as U}from"./UiPopperTarget-Dn-pSnOK.js";import{_ as i}from"./UiTooltip-DHdPQWoJ.js";import{j as t}from"./jsx-runtime-N83kn9-W.js";import{useMDXComponents as c}from"./index-g1djAheZ.js";import{ak as h}from"./index-CHpyIouO.js";import"./vue.esm-bundler-BDTEftJR.js";import"./predicate-ClulhfEu.js";import"./composables-BdO0bl9Q.js";import"./UiPopper-DkkEzjC5.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./iframe-BU-w-7Zw.js";import"../sb-preview/runtime.js";import"./index-Dj9yGJcI.js";import"./index-D-8MO0q_.js";import"./index-pVbLjA8_.js";import"./index-DrFu-skq.js";function r(e){const o={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...c(),...e.components};return t.jsxs(t.Fragment,{children:[t.jsx(o.h1,{id:"uitooltip",children:"UiTooltip"}),`
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
`,t.jsx(h,{})]})}function x(e={}){const{wrapper:o}={...c(),...e.components};return o?t.jsx(o,{...e,children:t.jsx(r,{...e})}):r(e)}const F={title:"Components/UiTooltip",component:i,argTypes:{target:{table:{disable:!0}},placement:{control:"select",options:["top","right","bottom","left"].reduce((e,o)=>e.concat([o,`${o}-start`,`${o}-end`]),[])}},render:e=>({components:{UiButton:d,UiLink:l,UiPopperConnector:m,UiPopperTarget:U,UiTooltip:i},setup(){return{args:e}},template:`
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
    `}),parameters:{docs:{page:x},layout:"centered"}},n={};var p,a,s;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:"{}",...(s=(a=n.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const S=["Sandbox"];export{n as Sandbox,S as __namedExportsOrder,F as default};
