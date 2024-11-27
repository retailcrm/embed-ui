import{e as f,f as h,y,g as o,q as b,u as v,o as c,v as d,c as k,k as A,t as L,F as T,j as U,n as E,l as P}from"./vue.esm-bundler-mKb0gIWi.js";import{A as i,_ as C}from"./UiLink-B9fFs4Ub.js";import{i as R}from"./predicate-D9CE3zPC.js";import{w as N}from"./utils-8AQkmo-1.js";import{j as e}from"./index-BFZQNVMc.js";import{useMDXComponents as j}from"./index-uLjDVhSk.js";import{T as s}from"./ToReact-Dcega5WJ.js";import"./_commonjsHelpers-Cpj98o6Y.js";const r=f({inheritAttrs:!1,__name:"UiToolbarLink",props:{href:{type:String,validator:a=>typeof a=="string"&&R(a),default:"javascript:void(0);"},external:{type:Boolean,default:!1},appearance:{type:String,validator:a=>Object.values(i).includes(a),default:i.DEFAULT},light:{type:Boolean,default:!1},accent:{type:Boolean,default:!1},dotted:{type:Boolean,default:!1},ellipsis:{type:Boolean,default:!1}},setup(a){return(n,g)=>(c(),h(C,b({href:a.href,external:a.external,appearance:a.appearance,light:a.light,accent:a.accent,dotted:a.dotted,ellipsis:a.ellipsis,size:"small"},v(N)(n.$attrs,["class","style"])),y({default:o(()=>[d(n.$slots,"default")]),_:2},[n.$slots.icon||a.external?{name:"icon",fn:o(()=>[d(n.$slots,"icon")]),key:"0"}:void 0]),1040,["href","external","appearance","light","accent","dotted","ellipsis"]))}});r.__docgenInfo={exportName:"default",displayName:"UiToolbarLink",description:"",tags:{},props:[{name:"href",description:"Атрибут ссылки",type:{name:"string"},defaultValue:{func:!1,value:"'javascript:void(0);'"}},{name:"external",description:`Определяет, нужно ли открывать ссылку в новой вкладке.
Также добавляется иконка внешней ссылки (если компонент UiIcon установлен)`,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"appearance",description:"Тип ссылок",type:{name:"APPEARANCE | `${APPEARANCE}`"},defaultValue:{func:!1,value:"APPEARANCE.DEFAULT"}},{name:"light",description:"Инвертированный цвет ссылок для тёмного фона",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"accent",description:"Жирное начертание",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"dotted",description:"Подчеркивание dotted вместо стандартного поведения",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"ellipsis",description:"Определяет, будет ли текст ошибок обрезаться через многоточие или переноситься на следующую строку",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default"},{name:"icon"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/host/components/toolbar/UiToolbarLink.vue"]};const t=f({__name:"UiToolbarLink.example",props:{text:{type:String,default:""}},setup(a){return(n,g)=>(c(),h(r,E(P(n.$attrs)),{default:o(()=>[a.text.length?(c(),k(T,{key:0},[A(L(a.text),1)],64)):U("",!0)]),_:1},16))}});t.__docgenInfo={exportName:"default",displayName:"UiToolbarLink.example",description:"",tags:{},props:[{name:"text",type:{name:"string"},defaultValue:{func:!1,value:"''"}}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiToolbarLink.example.vue"]};function p(a){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...j(),...a.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{id:"uitoolbarlink",children:"UiToolbarLink"}),`
`,e.jsxs(n.p,{children:[`Является аналогом стандартной ссылки с узконаправленным применением. Исключением является предустановленный
размерный токен — `,e.jsx(n.code,{children:"small"}),". В связи чем отсутствует свойство для настройки размера шрифта ссылки и иконок."]}),`
`,e.jsx(n.h2,{id:"api",children:"API"}),`
`,e.jsx(n.h3,{id:"типы-ссылок",children:"Типы ссылок"}),`
`,e.jsxs(n.p,{children:["В зависимости от применения ссылок на форме выделены следующие типы: ",e.jsx(n.code,{children:"breadcrumbs"}),", ",e.jsx(n.code,{children:"default"}),", ",e.jsx(n.code,{children:"navigation"}),`,
`,e.jsx(n.code,{children:"navigation-anchor"})," и ",e.jsx(n.code,{children:"title"}),". Предустановленный тип для ссылок — ",e.jsx(n.code,{children:"default"}),"."]}),`
`,e.jsxs("p",{style:{display:"flex",columnGap:"16px"},children:[e.jsx(s,{is:t,text:"breadcrumbs",appearance:"breadcrumbs"}),e.jsx(s,{is:t,text:"default"}),e.jsx(s,{is:t,text:"navigation",appearance:"navigation"}),e.jsx(s,{is:t,text:"navigation-anchor",appearance:"navigation-anchor"}),e.jsx(s,{is:t,text:"title",appearance:"title"})]}),`
`,e.jsx(n.h3,{id:"переполненный-контент",children:"Переполненный контент"}),`
`,e.jsxs(n.p,{children:["Если включено свойство ",e.jsx(n.code,{children:"ellipsis"}),`, то при переполнении текстового содержимого, оно будет обрезаться через многоточие. Иначе текст
переносится на следующую строку.`]}),`
`,e.jsxs("p",{style:{display:"flex",flexDirection:"column",gap:"8px",paddingLeft:"16px",maxWidth:"130px"},children:[e.jsx(s,{is:t,text:"Long error message",external:!0}),e.jsx(s,{is:t,text:"Long error message",ellipsis:!0,external:!0})]}),`
`,e.jsx(n.h3,{id:"переход-на-новую-вкладку",children:"Переход на новую вкладку"}),`
`,e.jsxs(n.p,{children:["При необходимости по клику открывать ссылку в новой вкладке необходимо включить свойство ",e.jsx(n.code,{children:"external"}),`. Если установлен
компонент UiIcon или задан слот `,e.jsx(n.code,{children:"icon"}),", то справа от текста ссылки также появится иконка."]}),`
`,e.jsx(n.h3,{id:"дополнительная-настройка-внешнего-вида",children:"Дополнительная настройка внешнего вида"}),`
`,e.jsx(n.p,{children:"Для дополнительной настройки визуализации ссылки предоставлены свойства:"}),`
`,e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsxs("p",{style:{display:"inline",marginRight:"4px"},children:[e.jsx(n.code,{children:"accent"})," — добавляет тексту ссылки жирное начертание. Например,"]}),e.jsx(s,{is:t,tag:"span",text:"Accent link",accent:!0,external:!0})]}),e.jsxs("li",{children:[e.jsxs("p",{style:{display:"inline",marginRight:"4px"},children:[e.jsx(n.code,{children:"dotted"})," — добавляет подчёркивание тексту ссылки. Например,"]}),e.jsx(s,{is:t,tag:"span",text:"Dotted link",dotted:!0,external:!0})]}),e.jsxs("li",{style:{background:"rgb(105, 145, 209)",width:"fit-content"},children:[e.jsxs("p",{style:{display:"inline",marginRight:"4px"},children:[e.jsx(n.code,{children:"light"})," — инвертирует цвет ссылки и иконки в белый. Например,"]}),e.jsx(s,{is:t,tag:"span",text:"Accent link",light:!0,external:!0,ellipsis:!0}),e.jsx("p",{style:{display:"inline",marginLeft:"4px"},children:"Фон добавлен для демонстрации примера."})]})]}),`
`,e.jsx(n.h3,{id:"слоты",children:"Слоты"}),`
`,e.jsx(n.p,{children:"В рамках компонента предоставлено два слота:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"default"})," — текст ссылки;"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"icon"})," — иконка справа от текста ссылки."]}),`
`]})]})}function V(a={}){const{wrapper:n}={...j(),...a.components};return n?e.jsx(n,{...a,children:e.jsx(p,{...a})}):p(a)}const _={title:"Components/UiToolbarLink",component:r,args:{appearance:i.DEFAULT},argTypes:{appearance:{control:"select",options:Object.values(i)},default:{control:!1},icon:{control:!1}},render:a=>({components:{UiToolbarLink:r},setup(){return{args:a}},template:`
      <UiToolbarLink v-bind="args">
          Hyperlink
      </UiToolbarLink>
    `}),parameters:{docs:{page:V},layout:"centered"}},l={};var u,x,m;l.parameters={...l.parameters,docs:{...(u=l.parameters)==null?void 0:u.docs,source:{originalSource:"{}",...(m=(x=l.parameters)==null?void 0:x.docs)==null?void 0:m.source}}};const O=["Sandbox"];export{l as Sandbox,O as __namedExportsOrder,_ as default};