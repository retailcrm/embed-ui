import{_ as l,S as c,A as a}from"./UiLink-DjpTRh8B.js";import{j as e}from"./index-Djyvt97q.js";import{useMDXComponents as x}from"./index-Cdf3Trmt.js";import{T as t}from"./ToReact-DnbUFdcl.js";import{g as p,j as h,w as j,n as m,q as u,o as d,c as g,s as f,t as k,v as y,F as b}from"./iframe-8yHAjMl9.js";import"./predicate-ClulhfEu.js";import"./composables-DLLcKDKM.js";import"./index-B44Kv34C.js";import"./preload-helper-PPVm8Dsz.js";const n=p({__name:"UiLink.example",props:{text:{type:String,default:""}},setup(i){return(s,_)=>(d(),h(l,m(u(s.$attrs)),{default:j(()=>[i.text.length?(d(),g(b,{key:0},[k(y(i.text),1)],64)):f("",!0)]),_:1},16))}});n.__docgenInfo={exportName:"default",displayName:"UiLink.example",description:"",tags:{},props:[{name:"text",type:{name:"string"},defaultValue:{func:!1,value:"''"}}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiLink.example.vue"]};function o(i){const s={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...x(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(s.h1,{id:"uilink",children:"UiLink"}),`
`,e.jsx(s.p,{children:"Якорь"}),`
`,e.jsx(s.h2,{id:"api",children:"API"}),`
`,e.jsx(s.h3,{id:"размеры",children:"Размеры"}),`
`,e.jsx(s.p,{children:"Для ссылок предусмотрены следующие размеры текста:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"article"})," — ",e.jsx(s.code,{children:"20px"}),";"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"body"})," — ",e.jsx(s.code,{children:"16px"}),";"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"paragraph"})," — ",e.jsx(s.code,{children:"18px"}),";"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"small"})," — ",e.jsx(s.code,{children:"14px"}),";"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"tiny"})," — ",e.jsx(s.code,{children:"12px"}),";"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"title-01"})," — ",e.jsx(s.code,{children:"40px"}),";"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"title-02"})," — ",e.jsx(s.code,{children:"24px"}),"."]}),`
`]}),`
`,e.jsxs(s.p,{children:["Помимо размера шрифта изменяется размер иконок. По-умолчанию установлен размер ",e.jsx(s.code,{children:"body"}),"."]}),`
`,e.jsxs("div",{className:"flex-column gap-4",children:[e.jsx(t,{is:n,text:"title-01",size:"title-01",external:!0}),e.jsx(t,{is:n,text:"title-02",size:"title-02",external:!0}),e.jsx(t,{is:n,text:"article",size:"article",external:!0}),e.jsx(t,{is:n,text:"body",size:"body",external:!0}),e.jsx(t,{is:n,text:"paragraph",size:"paragraph",external:!0}),e.jsx(t,{is:n,text:"small",size:"small",external:!0}),e.jsx(t,{is:n,text:"tiny",size:"tiny",external:!0})]}),`
`,e.jsx(s.h3,{id:"типы-ссылок",children:"Типы ссылок"}),`
`,e.jsxs(s.p,{children:["В зависимости от применения ссылок на форме выделены следующие типы: ",e.jsx(s.code,{children:"breadcrumbs"}),", ",e.jsx(s.code,{children:"default"}),", ",e.jsx(s.code,{children:"navigation"}),", ",e.jsx(s.code,{children:"navigation-anchor"}),` и
`,e.jsx(s.code,{children:"title"}),". Предустановленный тип для ссылок — ",e.jsx(s.code,{children:"default"}),"."]}),`
`,e.jsxs("div",{className:"flex-column gap-4",children:[e.jsx(t,{is:n,text:"breadcrumbs",appearance:"breadcrumbs"}),e.jsx(t,{is:n,text:"default"}),e.jsx(t,{is:n,text:"navigation",appearance:"navigation"}),e.jsx(t,{is:n,text:"navigation-anchor",appearance:"navigation-anchor"}),e.jsx(t,{is:n,text:"title",appearance:"title"})]}),`
`,e.jsx(s.h3,{id:"переполненный-контент",children:"Переполненный контент"}),`
`,e.jsxs(s.p,{children:["Если включено свойство ",e.jsx(s.code,{children:"ellipsis"}),`, то при переполнении текстового содержимого, оно будет обрезаться через многоточие. Иначе текст
переносится на следующую строку.`]}),`
`,e.jsxs("div",{className:"flex-column pl-4 gap-2",style:{maxWidth:"130px"},children:[e.jsx(t,{is:n,text:"Long error message",external:!0}),e.jsx(t,{is:n,text:"Long error message",ellipsis:!0,external:!0})]}),`
`,e.jsx(s.h3,{id:"переход-на-новую-вкладку",children:"Переход на новую вкладку"}),`
`,e.jsxs(s.p,{children:["При необходимости по клику открывать ссылку в новой вкладке необходимо включить свойство ",e.jsx(s.code,{children:"external"}),`. Если установлен
компонент UiIcon или задан слот `,e.jsx(s.code,{children:"icon"}),", то справа от текста ссылки также появится иконка."]}),`
`,e.jsx(s.h3,{id:"дополнительная-настройка-внешнего-вида",children:"Дополнительная настройка внешнего вида"}),`
`,e.jsx(s.p,{children:"Для дополнительной настройки визуализации ссылки предоставлены свойства:"}),`
`,e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsxs("span",{className:"mr-1",children:[e.jsx(s.code,{children:"accent"})," — добавляет тексту ссылки жирное начертание. Например,"]}),e.jsx(t,{is:n,tag:"span",text:"Accent link",accent:!0,external:!0})]}),e.jsxs("li",{children:[e.jsxs("span",{className:"mr-1",children:[e.jsx(s.code,{children:"dotted"})," — добавляет подчёркивание тексту ссылки. Например,"]}),e.jsx(t,{is:n,tag:"span",text:"Dotted link",dotted:!0,external:!0})]}),e.jsxs("li",{children:[e.jsxs("span",{className:"mr-1",children:[e.jsx(s.code,{children:"light"})," — инвертирует цвет ссылки и иконки в белый. Например,"]}),e.jsx(t,{is:n,tag:"span",text:"Accent link",style:{display:"inline-flex",background:"#4880e8"},light:!0,external:!0,ellipsis:!0}),e.jsx("span",{className:"ml-1",children:"Фон добавлен для демонстрации примера."})]})]}),`
`,e.jsx(s.h3,{id:"слоты",children:"Слоты"}),`
`,e.jsx(s.p,{children:"В рамках компонента предоставлено два слота:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"default"})," — текст ссылки;"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"icon"})," — иконка справа от текста ссылки."]}),`
`]})]})}function v(i={}){const{wrapper:s}={...x(),...i.components};return s?e.jsx(s,{...i,children:e.jsx(o,{...i})}):o(i)}const F={title:"Components/UiLink",component:l,args:{appearance:a.DEFAULT,size:c.BODY},argTypes:{appearance:{control:"select",options:Object.values(a)},size:{control:"select",options:Object.values(c)},default:{control:!1},icon:{control:!1}},render:i=>({components:{UiLink:l},setup(){return{args:i}},template:`
      <UiLink v-bind="args">
          Hyperlink
      </UiLink>
    `}),parameters:{docs:{page:v},layout:"centered"}},r={};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source}}};const P=["Sandbox"];export{r as Sandbox,P as __namedExportsOrder,F as default};
