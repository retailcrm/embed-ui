import{_ as l,A as c,S as a}from"./UiLink-B9fFs4Ub.js";import{j as e}from"./index-BFZQNVMc.js";import{useMDXComponents as j}from"./index-uLjDVhSk.js";import{T as i}from"./ToReact-Dcega5WJ.js";import{e as u,o as d,f as m,g,c as f,k as y,t as k,F as b,j as L,n as v,l as _}from"./vue.esm-bundler-mKb0gIWi.js";import"./predicate-D9CE3zPC.js";import"./_commonjsHelpers-Cpj98o6Y.js";const s=u({__name:"UiLink.example",props:{text:{type:String,default:""}},setup(t){return(n,D)=>(d(),m(l,v(_(n.$attrs)),{default:g(()=>[t.text.length?(d(),f(b,{key:0},[y(k(t.text),1)],64)):L("",!0)]),_:1},16))}});s.__docgenInfo={exportName:"default",displayName:"UiLink.example",description:"",tags:{},props:[{name:"text",type:{name:"string"},defaultValue:{func:!1,value:"''"}}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiLink.example.vue"]};function x(t){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...j(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{id:"uilink",children:"UiLink"}),`
`,e.jsx(n.p,{children:"Якорь"}),`
`,e.jsx(n.h2,{id:"api",children:"API"}),`
`,e.jsx(n.h3,{id:"размеры",children:"Размеры"}),`
`,e.jsx(n.p,{children:"Для ссылок предусмотрены следующие размеры текста:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"article"})," — ",e.jsx(n.code,{children:"20px"}),";"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"body"})," — ",e.jsx(n.code,{children:"16px"}),";"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"paragraph"})," — ",e.jsx(n.code,{children:"18px"}),";"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"small"})," — ",e.jsx(n.code,{children:"14px"}),";"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"tiny"})," — ",e.jsx(n.code,{children:"12px"}),";"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"title-01"})," — ",e.jsx(n.code,{children:"40px"}),";"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"title-02"})," — ",e.jsx(n.code,{children:"24px"}),"."]}),`
`]}),`
`,e.jsxs(n.p,{children:["Помимо размера шрифта изменяется размер иконок. По-умолчанию установлен размер ",e.jsx(n.code,{children:"body"}),"."]}),`
`,e.jsxs("p",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx(i,{is:s,text:"title-01",size:"title-01",external:!0}),e.jsx(i,{is:s,text:"title-02",size:"title-02",external:!0}),e.jsx(i,{is:s,text:"article",size:"article",external:!0}),e.jsx(i,{is:s,text:"body",size:"body",external:!0}),e.jsx(i,{is:s,text:"paragraph",size:"paragraph",external:!0}),e.jsx(i,{is:s,text:"small",size:"small",external:!0}),e.jsx(i,{is:s,text:"tiny",size:"tiny",external:!0})]}),`
`,e.jsx(n.h3,{id:"типы-ссылок",children:"Типы ссылок"}),`
`,e.jsxs(n.p,{children:["В зависимости от применения ссылок на форме выделены следующие типы: ",e.jsx(n.code,{children:"breadcrumbs"}),", ",e.jsx(n.code,{children:"default"}),", ",e.jsx(n.code,{children:"navigation"}),", ",e.jsx(n.code,{children:"navigation-anchor"}),` и
`,e.jsx(n.code,{children:"title"}),". Предустановленный тип для ссылок — ",e.jsx(n.code,{children:"default"}),"."]}),`
`,e.jsxs("p",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx(i,{is:s,text:"breadcrumbs",appearance:"breadcrumbs"}),e.jsx(i,{is:s,text:"default"}),e.jsx(i,{is:s,text:"navigation",appearance:"navigation"}),e.jsx(i,{is:s,text:"navigation-anchor",appearance:"navigation-anchor"}),e.jsx(i,{is:s,text:"title",appearance:"title"})]}),`
`,e.jsx(n.h3,{id:"переполненный-контент",children:"Переполненный контент"}),`
`,e.jsxs(n.p,{children:["Если включено свойство ",e.jsx(n.code,{children:"ellipsis"}),`, то при переполнении текстового содержимого, оно будет обрезаться через многоточие. Иначе текст
переносится на следующую строку.`]}),`
`,e.jsxs("p",{style:{display:"flex",flexDirection:"column",gap:"8px",paddingLeft:"16px",maxWidth:"130px"},children:[e.jsx(i,{is:s,text:"Long error message",external:!0}),e.jsx(i,{is:s,text:"Long error message",ellipsis:!0,external:!0})]}),`
`,e.jsx(n.h3,{id:"переход-на-новую-вкладку",children:"Переход на новую вкладку"}),`
`,e.jsxs(n.p,{children:["При необходимости по клику открывать ссылку в новой вкладке необходимо включить свойство ",e.jsx(n.code,{children:"external"}),`. Если установлен
компонент UiIcon или задан слот `,e.jsx(n.code,{children:"icon"}),", то справа от текста ссылки также появится иконка."]}),`
`,e.jsx(n.h3,{id:"дополнительная-настройка-внешнего-вида",children:"Дополнительная настройка внешнего вида"}),`
`,e.jsx(n.p,{children:"Для дополнительной настройки визуализации ссылки предоставлены свойства:"}),`
`,e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsxs("p",{style:{display:"inline",marginRight:"4px"},children:[e.jsx(n.code,{children:"accent"})," — добавляет тексту ссылки жирное начертание. Например,"]}),e.jsx(i,{is:s,tag:"span",text:"Accent link",accent:!0,external:!0})]}),e.jsxs("li",{children:[e.jsxs("p",{style:{display:"inline",marginRight:"4px"},children:[e.jsx(n.code,{children:"dotted"})," — добавляет подчёркивание тексту ссылки. Например,"]}),e.jsx(i,{is:s,tag:"span",text:"Dotted link",dotted:!0,external:!0})]}),e.jsxs("li",{children:[e.jsxs("p",{style:{display:"inline",marginRight:"4px"},children:[e.jsx(n.code,{children:"light"})," — инвертирует цвет ссылки и иконки в белый. Например,"]}),e.jsx(i,{is:s,tag:"span",text:"Accent link",style:{paddingLeft:"4px",background:"#4880e8"},light:!0,external:!0,ellipsis:!0}),e.jsx("p",{style:{display:"inline",marginLeft:"4px"},children:"Фон добавлен для демонстрации примера."})]})]}),`
`,e.jsx(n.h3,{id:"слоты",children:"Слоты"}),`
`,e.jsx(n.p,{children:"В рамках компонента предоставлено два слота:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"default"})," — текст ссылки;"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"icon"})," — иконка справа от текста ссылки."]}),`
`]})]})}function z(t={}){const{wrapper:n}={...j(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(x,{...t})}):x(t)}const N={title:"Components/UiLink",component:l,args:{appearance:c.DEFAULT,size:a.BODY},argTypes:{appearance:{control:"select",options:Object.values(c)},size:{control:"select",options:Object.values(a)},default:{control:!1},icon:{control:!1}},render:t=>({components:{UiLink:l},setup(){return{args:t}},template:`
      <UiLink v-bind="args">
          Hyperlink
      </UiLink>
    `}),parameters:{docs:{page:z},layout:"centered"}},r={};var o,p,h;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:"{}",...(h=(p=r.parameters)==null?void 0:p.docs)==null?void 0:h.source}}};const P=["Sandbox"];export{r as Sandbox,P as __namedExportsOrder,N as default};
