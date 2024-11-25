import{o as a,c as l,a as v,e as m,p as x,t as f,m as k,g as b,u as L,k as T,j as U,q as D,s as _,v as B,x as A,F as V}from"./vue.esm-bundler-cEDHhJc8.js";import{j as e}from"./index-BFZQNVMc.js";import{useMDXComponents as g}from"./index-uLjDVhSk.js";import{T as s}from"./ToReact-n2TWxbDT.js";import"./_commonjsHelpers-Cpj98o6Y.js";const N={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"};function z(t,n){return a(),l("svg",N,n[0]||(n[0]=[v("path",{fill:"currentColor",d:"m6.844 17.854-.7-.703a.5.5 0 0 1 0-.704l8.48-8.456-6.212.007a.49.49 0 0 1-.496-.5l.007-.991a.5.5 0 0 1 .496-.5L16.994 6c.196 0 .385.078.524.218l.265.267c.137.142.215.33.217.528l-.007 8.633a.5.5 0 0 1-.496.5h-.992a.48.48 0 0 1-.49-.493l.007-6.255-8.48 8.456a.49.49 0 0 1-.698 0"},null,-1)]))}const I={render:z};var r=(t=>(t.BREADCRUMBS="breadcrumbs",t.DEFAULT="default",t.NAVIGATION="navigation",t.NAVIGATION_ANCHOR="navigation-anchor",t.TITLE="title",t))(r||{}),c=(t=>(t.ARTICLE="article",t.BODY="body",t.PARAGRAPH="paragraph",t.SMALL="small",t.TINY="tiny",t.TITLE01="title-01",t.TITLE02="title-02",t))(c||{});const O=["href","target"],$={key:0,class:"ui-v1-link__inner"},R={key:2,class:"ui-v1-link__icon"},o=m({__name:"UiLink",props:{href:{type:String,default:"javascript:void(0);"},external:{type:Boolean,default:!1},appearance:{type:String,validator:t=>Object.values(r).includes(t),default:r.DEFAULT},size:{type:String,validator:t=>Object.values(c).includes(t),default:c.BODY},light:{type:Boolean,default:!1},accent:{type:Boolean,default:!1},dotted:{type:Boolean,default:!1},ellipsis:{type:Boolean,default:!1}},setup(t){return(n,y)=>(a(),l("a",k({href:t.href,class:{"ui-v1-link":!0,[`ui-v1-link_${t.appearance}`]:!0,[`ui-v1-link_${t.size}`]:!0,"ui-v1-link_dark":!t.light,"ui-v1-link_light":t.light,"ui-v1-link_accent":t.accent,"ui-v1-link_dotted":t.dotted,"ui-v1-link_ellipsis":t.ellipsis},target:t.external?"_blank":"_self"},n.$attrs),[t.dotted?(a(),l("span",$,[x(n.$slots,"default")])):x(n.$slots,"default",{key:1}),n.$slots.icon||t.external?(a(),l("span",R,[x(n.$slots,"icon",{},()=>[b(L(I),{class:"ui-v1-link__icon-sprite"})])])):f("",!0)],16,O))}});o.__docgenInfo={exportName:"default",displayName:"UiLink",description:"",tags:{},props:[{name:"href",description:"Атрибут ссылки",type:{name:"string"},defaultValue:{func:!1,value:"'javascript:void(0);'"}},{name:"external",description:`Определяет, нужно ли открывать ссылку в новой вкладке.
Также добавляется иконка внешней ссылки (если компонент UiIcon установлен)`,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"appearance",description:"Тип ссылок",type:{name:"APPEARANCE | `${APPEARANCE}`"},defaultValue:{func:!1,value:"APPEARANCE.DEFAULT"}},{name:"size",description:"Размер текста",type:{name:"SIZE | `${SIZE}`"},defaultValue:{func:!1,value:"SIZE.BODY"}},{name:"light",description:"Инвертированный цвет ссылок для тёмного фона",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"accent",description:"Жирное начертание",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"dotted",description:"Подчеркивание dotted вместо стандартного поведения",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"ellipsis",description:"Определяет, будет ли текст ошибок обрезаться через многоточие или переноситься на следующую строку",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default",description:"Текст ссылки"},{name:"icon",description:"Слот для иконки"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/host/components/link/UiLink.vue"]};const i=m({__name:"UiLink.example",props:{text:{type:String,default:""}},setup(t){return(n,y)=>(a(),T(o,D(_(n.$attrs)),{default:U(()=>[t.text.length?(a(),l(V,{key:0},[B(A(t.text),1)],64)):f("",!0)]),_:1},16))}});i.__docgenInfo={exportName:"default",displayName:"UiLink.example",description:"",tags:{},props:[{name:"text",type:{name:"string"},defaultValue:{func:!1,value:"''"}}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiLink.example.vue"]};function p(t){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...g(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{id:"uilink",children:"UiLink"}),`
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
`,e.jsxs("p",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx(s,{is:i,text:"title-01",size:"title-01",external:!0}),e.jsx(s,{is:i,text:"title-02",size:"title-02",external:!0}),e.jsx(s,{is:i,text:"article",size:"article",external:!0}),e.jsx(s,{is:i,text:"body",size:"body",external:!0}),e.jsx(s,{is:i,text:"paragraph",size:"paragraph",external:!0}),e.jsx(s,{is:i,text:"small",size:"small",external:!0}),e.jsx(s,{is:i,text:"tiny",size:"tiny",external:!0})]}),`
`,e.jsx(n.h3,{id:"типы-ссылок",children:"Типы ссылок"}),`
`,e.jsxs(n.p,{children:["В зависимости от применения ссылок на форме выделены следующие типы: ",e.jsx(n.code,{children:"breadcrumbs"}),", ",e.jsx(n.code,{children:"default"}),", ",e.jsx(n.code,{children:"navigation"}),", ",e.jsx(n.code,{children:"navigation-anchor"}),` и
`,e.jsx(n.code,{children:"title"}),". Предустановленный тип для ссылок — ",e.jsx(n.code,{children:"default"}),"."]}),`
`,e.jsxs("p",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx(s,{is:i,text:"breadcrumbs",appearance:"breadcrumbs"}),e.jsx(s,{is:i,text:"default"}),e.jsx(s,{is:i,text:"navigation",appearance:"navigation"}),e.jsx(s,{is:i,text:"navigation-anchor",appearance:"navigation-anchor"}),e.jsx(s,{is:i,text:"title",appearance:"title"})]}),`
`,e.jsx(n.h3,{id:"переполненный-контент",children:"Переполненный контент"}),`
`,e.jsxs(n.p,{children:["Если включено свойство ",e.jsx(n.code,{children:"ellipsis"}),`, то при переполнении текстового содержимого, оно будет обрезаться через многоточие. Иначе текст
переносится на следующую строку.`]}),`
`,e.jsxs("p",{style:{display:"flex",flexDirection:"column",gap:"8px",paddingLeft:"16px",maxWidth:"130px"},children:[e.jsx(s,{is:i,text:"Long error message",external:!0}),e.jsx(s,{is:i,text:"Long error message",ellipsis:!0,external:!0})]}),`
`,e.jsx(n.h3,{id:"переход-на-новую-вкладку",children:"Переход на новую вкладку"}),`
`,e.jsxs(n.p,{children:["При необходимости по клику открывать ссылку в новой вкладке необходимо включить свойство ",e.jsx(n.code,{children:"external"}),`. Если установлен
компонент UiIcon или задан слот `,e.jsx(n.code,{children:"icon"}),", то справа от текста ссылки также появится иконка."]}),`
`,e.jsx(n.h3,{id:"дополнительная-настройка-внешнего-вида",children:"Дополнительная настройка внешнего вида"}),`
`,e.jsx(n.p,{children:"Для дополнительной настройки визуализации ссылки предоставлены свойства:"}),`
`,e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsxs("p",{style:{display:"inline",marginRight:"4px"},children:[e.jsx(n.code,{children:"accent"})," — добавляет тексту ссылки жирное начертание. Например,"]}),e.jsx(s,{is:i,tag:"span",text:"Accent link",accent:!0,external:!0})]}),e.jsxs("li",{children:[e.jsxs("p",{style:{display:"inline",marginRight:"4px"},children:[e.jsx(n.code,{children:"dotted"})," — добавляет подчёркивание тексту ссылки. Например,"]}),e.jsx(s,{is:i,tag:"span",text:"Dotted link",dotted:!0,external:!0})]}),e.jsxs("li",{children:[e.jsxs("p",{style:{display:"inline",marginRight:"4px"},children:[e.jsx(n.code,{children:"light"})," — инвертирует цвет ссылки и иконки в белый. Например,"]}),e.jsx(s,{is:i,tag:"span",text:"Accent link",style:{paddingLeft:"4px",background:"#4880e8"},light:!0,external:!0,ellipsis:!0}),e.jsx("p",{style:{display:"inline",marginLeft:"4px"},children:"Фон добавлен для демонстрации примера."})]})]}),`
`,e.jsx(n.h3,{id:"слоты",children:"Слоты"}),`
`,e.jsx(n.p,{children:"В рамках компонента предоставлено два слота:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"default"})," — текст ссылки;"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"icon"})," — иконка справа от текста ссылки."]}),`
`]})]})}function w(t={}){const{wrapper:n}={...g(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(p,{...t})}):p(t)}const Y={title:"Components/UiLink",component:o,args:{appearance:r.DEFAULT,size:c.BODY},argTypes:{appearance:{control:"select",options:Object.values(r)},size:{control:"select",options:Object.values(c)},default:{control:!1},icon:{control:!1}},render:t=>({components:{UiLink:o},setup(){return{args:t}},template:`
      <UiLink v-bind="args">
          Hyperlink
      </UiLink>
    `}),parameters:{docs:{page:w},layout:"centered"}},d={};var u,h,j;d.parameters={...d.parameters,docs:{...(u=d.parameters)==null?void 0:u.docs,source:{originalSource:"{}",...(j=(h=d.parameters)==null?void 0:h.docs)==null?void 0:j.source}}};const P=["Sandbox"];export{d as Sandbox,P as __namedExportsOrder,Y as default};
