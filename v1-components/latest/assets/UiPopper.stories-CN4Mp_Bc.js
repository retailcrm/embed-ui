import{_ as d}from"./UiButton--lhd3Gxd.js";import{_ as t}from"./UiPopper-DlEldBnU.js";import{_ as l,a as m}from"./UiPopperTarget-7CO9sfno.js";import{j as e}from"./jsx-runtime-N83kn9-W.js";import{useMDXComponents as s}from"./index-g1djAheZ.js";import{ak as U}from"./index-DvFXt-Km.js";import"./vue.esm-bundler-BIIqx1uz.js";import"./predicate-ClulhfEu.js";import"./composables-D1G2sIbg.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./iframe-ye1xC3UP.js";import"../sb-preview/runtime.js";import"./index-Dj9yGJcI.js";import"./index-D-8MO0q_.js";import"./index-pVbLjA8_.js";import"./index-DrFu-skq.js";function p(o){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...s(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{id:"uipopper",children:"UiPopper"}),`
`,e.jsx(n.p,{children:"Базовый компонент для создания плавающих элементов"}),`
`,e.jsx(n.h2,{id:"назначение",children:"Назначение"}),`
`,e.jsx(n.p,{children:`Компонент используется как базовый для плавающих элементов любых типов, будь то всплывающие подсказки, отображаемые
по наведению на элемент или выпадающие меню.`}),`
`,e.jsx(n.h2,{id:"применение",children:"Применение"}),`
`,e.jsx(n.p,{children:"Базовый пример:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<template>
    <UiPopperConnector>
        <UiButton variant="danger">
            Удалить
        </UiButton>

        <UiPopper role="dialog" class="popconfirm">
            <div class="popconfirm__content">
                Действие не может быть отменено, продолжить?
            </div>

            <div class="popconfirm__footer">
                <UiButton variant="danger">
                    Да
                </UiButton>

                <UiButton appearance="secondary">
                    Нет
                </UiButton>
            </div>
        </UiPopper>
    </UiPopperConnector>
</template>
`})}),`
`,e.jsxs(n.p,{children:["В этом примере мы использовали компонент ",e.jsx(n.code,{children:"UiPopperConnector"}),`, он нужен для передачи информации о цели (кнопке)
плавающему элементу. Работает это так: кнопка передает коннектору ссылку на свой элемент, коннектор передает её
`,e.jsx(n.code,{children:"UiPopper"}),". Внутри ",e.jsx(n.code,{children:"UiPopperConnector"}),` может быть только один целевой элемент, в то время как число плавающих
не ограничено. Это позволит вам добавить к элементу, например, одновременно и подсказку, и, например, немодальное
диалоговое окно подтверждения.`]}),`
`,e.jsx(n.p,{children:"Коннектор не имеет корневого элемента и создает VNode фрагменты."}),`
`,e.jsx(n.h3,{id:"пользовательские-компоненты-цели",children:"Пользовательские компоненты-цели"}),`
`,e.jsxs(n.p,{children:[`Коннектор может связать любой компонент, который мы снабдили логикой регистрации ссылок с плавающими элементами,
в то же самое время, обычные элементы не могут сами по себе быть целью для плавающего элемента.
Мы добавили специальный компонент `,e.jsx(n.code,{children:"UiPopperTarget"}),`, который позволит вам создавать собственные компоненты-цели для
плавающих элементов:`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<template>
    <UiPopperConnector>
        <UiPopperTarget tag="span" role="button" class="icon-button">
            <IconTrash aria-label="Удалить" />
        </UiPopperTarget>

        <UiPopper role="tooltip" class="tooltip">
            Удалить
        </UiPopper>

        <UiPopper role="dialog" class="popconfirm">
            <div class="popconfirm__content">
                Действие не может быть отменено, продолжить?
            </div>

            <div class="popconfirm__footer">
                <UiButton variant="danger">
                    Да
                </UiButton>

                <UiButton appearance="secondary">
                    Нет
                </UiButton>
            </div>
        </UiPopper>
    </UiPopperConnector>
</template>
`})}),`
`,e.jsx(n.h2,{id:"api",children:"API"}),`
`,e.jsx(U,{})]})}function h(o={}){const{wrapper:n}={...s(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(p,{...o})}):p(o)}const k={title:"Components/UiPopper",component:t,args:{visible:!1,targetTriggers:["click"],popperTriggers:[],globalTriggers:["miss-click"],placement:"bottom"},argTypes:{target:{table:{disable:!0}},placement:{control:"select",options:["top","right","bottom","left"].reduce((o,n)=>o.concat([n,`${n}-start`,`${n}-end`]),[])}},render:o=>({components:{UiButton:d,UiPopper:t,UiPopperConnector:l,UiPopperTarget:m},setup(){return{args:o}},template:`
      <div class="mb-4">
          <UiPopperConnector>
              <UiButton>
                  I have a popper
              </UiButton>

              <UiPopper v-bind="args">
                  Popper content
              </UiPopper>
          </UiPopperConnector>
      </div>

      <div>
          <UiPopperConnector>
              <UiPopperTarget tag="a" href="javascript:void(0);">
                  I also have a popper
              </UiPopperTarget>

              <UiPopper v-bind="args">
                  Popper content
              </UiPopper>
          </UiPopperConnector>
      </div>
    `}),parameters:{docs:{page:h},layout:"centered"}},r={};var i,a,c;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:"{}",...(c=(a=r.parameters)==null?void 0:a.docs)==null?void 0:c.source}}};const D=["Sandbox"];export{r as Sandbox,D as __namedExportsOrder,k as default};
