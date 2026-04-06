import{r as d}from"./iframe-D1v8aj2J.js";import{_ as t}from"./UiYandexMap-B7x1jo2h.js";import{j as s}from"./jsx-runtime-ClSgB0tP.js";import{useMDXComponents as n}from"./index-BcU0IgrJ.js";import"./preload-helper-PPVm8Dsz.js";import"./add-CnnnD_g7.js";import"./UiButton-BW-9Kv_t.js";import"./predicate-ClulhfEu.js";import"./render-C5QpuNHX.js";import"./composables-CsRkzQ-G.js";import"./UiTransition-M5JnkmCw.js";import"./plugin-1GBkN3fH.js";function o(e){const r={a:"a",h1:"h1",p:"p",...n(),...e.components};return s.jsxs(s.Fragment,{children:[s.jsx(r.h1,{id:"uiyandexmap",children:"UiYandexMap"}),`
`,s.jsxs(r.p,{children:[`Экспериментальный компонент. На данный момент используется только в составе примеров
в репозитории `,s.jsx(r.a,{href:"https://github.com/retailcrm/core-ui-extensions-examples",rel:"nofollow",children:"@retailcrm/core-ui-extensions-examples"})]})]})}function m(e={}){const{wrapper:r}={...n(),...e.components};return r?s.jsx(r,{...e,children:s.jsx(o,{...e})}):o(e)}const w={title:"Experimental/UiYandexMap",component:t,args:{apiKey:"dd51f938-0693-457d-ae62-6d50fa668d0a",address:"",plugins:[]},argTypes:{apiKey:{control:!1},address:{control:!1},plugins:{control:!1}},render:e=>({components:{UiYandexMap:t},setup(){const{apiKey:r,address:i,plugins:p}=e;return{apiKey:r,address:d(i),plugins:p}},template:`
        <div class="mb-4" style="width: 640px; max-width: 100%;">
            <UiYandexMap
                v-model:address="address"
                :api-key="apiKey"
                :plugins="plugins"
            />
        </div>

        <p>Выбранный адрес:</p>

        {{ address }}
    `}),parameters:{docs:{page:m},layout:"centered"}},a={};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};const K=["Sandbox"];export{a as Sandbox,K as __namedExportsOrder,w as default};
