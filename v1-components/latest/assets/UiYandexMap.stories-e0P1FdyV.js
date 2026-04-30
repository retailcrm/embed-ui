import{r as d}from"./iframe-DnG3g5pW.js";import{_ as t}from"./UiYandexMap-D73XHTbW.js";import{u as o,j as r}from"./index-DFg_Ho_i.js";import"./preload-helper-PPVm8Dsz.js";import"./add-7oY7PnN7.js";import"./UiButton-BCon8_Cd.js";import"./predicate-ClulhfEu.js";import"./render-vaNyDQt4.js";import"./composables-CfEvSTVp.js";import"./UiTransition-BqKpixzE.js";import"./plugin-DbbfKnFn.js";function n(e){const s={a:"a",h1:"h1",p:"p",...o(),...e.components};return r.jsxs(r.Fragment,{children:[r.jsx(s.h1,{id:"uiyandexmap",children:"UiYandexMap"}),`
`,r.jsxs(s.p,{children:[`Экспериментальный компонент. На данный момент используется только в составе примеров
в репозитории `,r.jsx(s.a,{href:"https://github.com/retailcrm/core-ui-extensions-examples",rel:"nofollow",children:"@retailcrm/core-ui-extensions-examples"})]})]})}function m(e={}){const{wrapper:s}={...o(),...e.components};return s?r.jsx(s,{...e,children:r.jsx(n,{...e})}):n(e)}const b={title:"Experimental/UiYandexMap",component:t,args:{apiKey:"dd51f938-0693-457d-ae62-6d50fa668d0a",address:"",plugins:[]},argTypes:{apiKey:{control:!1},address:{control:!1},plugins:{control:!1}},render:e=>({components:{UiYandexMap:t},setup(){const{apiKey:s,address:i,plugins:p}=e;return{apiKey:s,address:d(i),plugins:p}},template:`
        <div class="mb-4" style="width: 640px; max-width: 100%;">
            <UiYandexMap
                v-model:address="address"
                :api-key="apiKey"
                :plugins="plugins"
            />
        </div>

        <p>Выбранный адрес:</p>

        {{ address }}
    `}),parameters:{docs:{page:m},layout:"centered"}},a={};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};const w=["Sandbox"];export{a as Sandbox,w as __namedExportsOrder,b as default};
