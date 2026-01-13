import{_ as i}from"./UiScrollBox-DIhgFHrz.js";import{j as s}from"./index-Djyvt97q.js";import{useMDXComponents as m}from"./index-Cdf3Trmt.js";import{T as t}from"./ToReact-CufppUms.js";import{g as h,c as _,z as l,w as a,m as d,A as c,o as j,a as p}from"./iframe-D39tYAK0.js";import{_ as f}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./index-B44Kv34C.js";import"./preload-helper-PPVm8Dsz.js";const x=h({__name:"UiScrollBox.example",setup(o){return(e,q)=>(j(),_("div",{class:c(e.$style.wrapper)},[l(i,d(e.$attrs,{class:e.$style.block}),{default:a(()=>[p("div",{class:c([e.$style.content,e.$style.content_tall])},null,2)]),_:1},16,["class"]),l(i,d(e.$attrs,{class:e.$style.block}),{default:a(()=>[p("div",{class:c([e.$style.content,e.$style.content_wide])},null,2)]),_:1},16,["class"])],2))}}),y="_wrapper_6iu54_1",b="_block_6iu54_4",g="_content_6iu54_13",w="_content_wide_6iu54_17",B="_content_tall_6iu54_20",S={wrapper:y,block:b,content:g,content_wide:w,content_tall:B},$={$style:S},n=f(x,[["__cssModules",$]]);x.__docgenInfo={exportName:"default",displayName:"UiScrollBox.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiScrollBox.example.vue"]};function u(o){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",...m(),...o.components};return s.jsxs(s.Fragment,{children:[s.jsx(e.h1,{id:"uiscrollbox",children:"UiScrollBox"}),`
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
`,s.jsxs(e.p,{children:["Для размещения контента используется слот по-умолчанию ",s.jsx(e.code,{children:"default"}),"."]})]})}function k(o={}){const{wrapper:e}={...m(),...o.components};return e?s.jsx(e,{...o,children:s.jsx(u,{...o})}):u(o)}const D={title:"Components/UiScrollBox",component:i,argTypes:{default:{control:!1}},render:o=>({components:{UiScrollBox:i},setup(){return{args:o}},data:()=>({styles:{height:"250px",width:"300px",padding:"0px 16px 16px",border:"1px solid rgba(30, 34, 72, 0.16)",borderRadius:"4px"}}),template:`
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
    `}),parameters:{docs:{page:k},layout:"centered"}},r={};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source}}};const E=["Sandbox"];export{r as Sandbox,E as __namedExportsOrder,D as default};
