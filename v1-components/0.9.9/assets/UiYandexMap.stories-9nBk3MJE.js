import{_ as t}from"./UiYandexMap-CA2YuGPM.js";import{r as i}from"./iframe-CzwIxcDt.js";import{j as r}from"./index-Djyvt97q.js";import{useMDXComponents as o}from"./index-Cdf3Trmt.js";import"./UiTransition-Kg8ZojDG.js";import"./plugin-yyqTwYeo.js";import"./preload-helper-PPVm8Dsz.js";function n(e){const a={a:"a",h1:"h1",p:"p",...o(),...e.components};return r.jsxs(r.Fragment,{children:[r.jsx(a.h1,{id:"uiyandexmap",children:"UiYandexMap"}),`
`,r.jsxs(a.p,{children:[`Экспериментальный компонент. На данный момент используется только в составе примеров
в репозитории `,r.jsx(a.a,{href:"https://github.com/retailcrm/core-ui-extensions-examples",rel:"nofollow",children:"@retailcrm/core-ui-extensions-examples"})]})]})}function p(e={}){const{wrapper:a}={...o(),...e.components};return a?r.jsx(a,{...e,children:r.jsx(n,{...e})}):n(e)}const y={title:"Experimental/UiYandexMap",component:t,args:{apiKey:"dd51f938-0693-457d-ae62-6d50fa668d0a",address:""},argTypes:{apiKey:{control:!1},address:{control:!1}},render:e=>({components:{UiYandexMap:t},setup(){const{apiKey:a,address:d}=e;return{apiKey:a,address:i(d)}},template:`
        <div class="mb-4" style="width: 640px; max-width: 100%;">
            <UiYandexMap
                v-model:address="address"
                :api-key="apiKey"
            />
        </div>

        <p>Выбранный адрес:</p>

        {{ address }}
    `}),parameters:{docs:{page:p},layout:"centered"}},s={};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"{}",...s.parameters?.docs?.source}}};const j=["Sandbox"];export{s as Sandbox,j as __namedExportsOrder,y as default};
