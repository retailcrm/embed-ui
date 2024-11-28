import{_ as c}from"./UiScrollBox-Db1HIXBu.js";import{j as s}from"./jsx-runtime-DQFc-wkB.js";import{useMDXComponents as _}from"./index-BjypYOp6.js";import{T as t}from"./ToReact-Dm3IsGyL.js";import{e as f,o as y,c as b,s as i,g as l,a as p,v as a,p as d}from"./vue.esm-bundler-BmdTWJX9.js";import{_ as g}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-C_1tOEKP.js";const j=f({__name:"UiScrollBox.example",setup(o){return(e,C)=>(y(),b("div",{class:a(e.$style.wrapper)},[i(c,d(e.$attrs,{class:e.$style.block}),{default:l(()=>[p("div",{class:a([e.$style.content,e.$style.content_tall])},null,2)]),_:1},16,["class"]),i(c,d(e.$attrs,{class:e.$style.block}),{default:l(()=>[p("div",{class:a([e.$style.content,e.$style.content_wide])},null,2)]),_:1},16,["class"])],2))}}),k="_wrapper_kopd2_1",w="_block_kopd2_4",S="_content_kopd2_13",B="_content_wide_kopd2_17",$="_content_tall_kopd2_20",q={wrapper:k,block:w,content:S,content_wide:B,content_tall:$},v={$style:q},n=g(j,[["__cssModules",v]]);j.__docgenInfo={exportName:"default",displayName:"UiScrollBox.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiScrollBox.example.vue"]};function m(o){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",..._(),...o.components};return s.jsxs(s.Fragment,{children:[s.jsx(e.h1,{id:"uiscrollbox",children:"UiScrollBox"}),`
`,s.jsx(e.p,{children:"Контейнер с вертикальной или горизонтальной полосой прокрутки."}),`
`,s.jsx(e.h2,{id:"поведение",children:"Поведение"}),`
`,s.jsx(e.h3,{id:"курсор-вне-области-контейнера",children:"Курсор вне области контейнера"}),`
`,s.jsxs(e.p,{children:[`При открытии списка или страницы, где присутствует полоса прокрутки, но мышь находится вне её области,
то полоса будет иметь ширину `,s.jsx(e.code,{children:"2px"}),"."]}),`
`,s.jsx(t,{is:n}),`
`,s.jsx(e.h3,{id:"курсор-над-областью-контейнера",children:"Курсор над областью контейнера"}),`
`,s.jsxs(e.p,{children:["При наведении на область, содержащую полосу прокрутки, ширина полосы увеличивается до ",s.jsx(e.code,{children:"6px"}),"."]}),`
`,s.jsx(t,{is:n,showOnHover:!0}),`
`,s.jsx(e.h3,{id:"курсор-над-полосой-прокрутки",children:"Курсор над полосой прокрутки"}),`
`,s.jsxs(e.p,{children:["При наведении на полосу прокрутки, её ширина увеличивается до ",s.jsx(e.code,{children:"12px"}),` перекрывая любой контент.
Так же можно переместить ползунок перетаскиванием.`]}),`
`,s.jsx(t,{is:n}),`
`,s.jsx(e.h2,{id:"внешний-вид",children:"Внешний вид"}),`
`,s.jsx(e.p,{children:`Помимо представленного вида полос прокрутки можно переключиться на использование нативных полос,
предоставляемых браузером:`}),`
`,s.jsx(t,{is:n,native:!0}),`
`,s.jsx(e.h2,{id:"отступ",children:"Отступ"}),`
`,s.jsxs(e.p,{children:["Отступ по бокам области прокрутки — ",s.jsx(e.code,{children:"4px"}),"."]}),`
`,s.jsx(e.h2,{id:"события",children:"События"}),`
`,s.jsxs(e.p,{children:["В момент прокрутки до верхнего края появляется событие ",s.jsx(e.code,{children:"ps-y-reach-start"}),". При прокрутке до нижнего края — ",s.jsx(e.code,{children:"ps-y-reach-end"}),"."]}),`
`,s.jsx(e.h2,{id:"слоты",children:"Слоты"}),`
`,s.jsxs(e.p,{children:["Для размещения контента используется слот по-умолчанию ",s.jsx(e.code,{children:"default"}),"."]})]})}function U(o={}){const{wrapper:e}={..._(),...o.components};return e?s.jsx(e,{...o,children:s.jsx(m,{...o})}):m(o)}const T={title:"Components/UiScrollBox",component:c,argTypes:{default:{control:!1}},render:o=>({components:{UiScrollBox:c},setup(){return{args:o}},data:()=>({styles:{height:"250px",width:"300px",padding:"0px 16px 16px",borderRadius:"4px",boxShadow:"rgba(30, 34, 72, 0.16) 0px 8px 16px"}}),template:`
      <UiScrollBox v-bind="args" :style="styles">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur porro
          neque libero saepe cupiditate cum nostrum accusamus eum, perferendis omnis
          itaque. Voluptate ullam amet, quis dolorem dolor placeat iusto at!
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur porro
          neque libero saepe cupiditate cum nostrum accusamus eum, perferendis omnis
          itaque. Voluptate ullam amet, quis dolorem dolor placeat iusto at!
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur porro
          neque libero saepe cupiditate cum nostrum accusamus eum, perferendis omnis
          itaque. Voluptate ullam amet, quis dolorem dolor placeat iusto at!
        </p>
      </UiScrollBox>
    `}),parameters:{docs:{page:U},layout:"centered"}},r={};var u,x,h;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:"{}",...(h=(x=r.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};const X=["Sandbox"];export{r as Sandbox,X as __namedExportsOrder,T as default};
