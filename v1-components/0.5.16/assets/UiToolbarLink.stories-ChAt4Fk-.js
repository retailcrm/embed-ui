import{d as f,f as m,p as h,g as s,m as b,u as x,o as y,h as i}from"./vue.esm-bundler-CQrfiSSv.js";import{A as o,_ as v}from"./UiLink-eOiFakSI.js";import{i as g}from"./predicate-ClulhfEu.js";import{w as j}from"./utils-CFz3IpAA.js";import{j as n}from"./jsx-runtime-DQFc-wkB.js";import{useMDXComponents as u}from"./index-BjypYOp6.js";import"./_commonjsHelpers-Cpj98o6Y.js";const l=f({inheritAttrs:!1,__name:"UiToolbarLink",props:{href:{type:String,validator:e=>typeof e=="string"&&(g(e)||e==="javascript:void(0);"),default:"javascript:void(0);"},external:{type:Boolean,default:!1},appearance:{type:String,validator:e=>Object.values(o).includes(e),default:o.DEFAULT},light:{type:Boolean,default:!1},accent:{type:Boolean,default:!1},dotted:{type:Boolean,default:!1},ellipsis:{type:Boolean,default:!1}},setup(e){return(a,k)=>(y(),m(v,b({href:e.href,external:e.external,appearance:e.appearance,light:e.light,accent:e.accent,dotted:e.dotted,ellipsis:e.ellipsis,size:"small"},x(j)(a.$attrs,["class","style"])),h({default:s(()=>[i(a.$slots,"default")]),_:2},[a.$slots.icon?{name:"icon",fn:s(()=>[i(a.$slots,"icon")]),key:"0"}:void 0]),1040,["href","external","appearance","light","accent","dotted","ellipsis"]))}});l.__docgenInfo={exportName:"default",displayName:"UiToolbarLink",description:"",tags:{},props:[{name:"href",description:"Атрибут ссылки",type:{name:"string"},defaultValue:{func:!1,value:"'javascript:void(0);'"}},{name:"external",description:`Определяет, нужно ли открывать ссылку в новой вкладке.
Также добавляется иконка внешней ссылки (если компонент UiIcon установлен)`,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"appearance",description:"Тип ссылок",type:{name:"APPEARANCE | `${APPEARANCE}`"},defaultValue:{func:!1,value:"APPEARANCE.DEFAULT"}},{name:"light",description:"Инвертированный цвет ссылок для тёмного фона",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"accent",description:"Жирное начертание",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"dotted",description:"Подчеркивание dotted вместо стандартного поведения",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"ellipsis",description:"Определяет, будет ли текст ошибок обрезаться через многоточие или переноситься на следующую строку",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default"},{name:"icon"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/host/components/toolbar/UiToolbarLink.vue"]};function r(e){const a={code:"code",h1:"h1",li:"li",p:"p",ul:"ul",...u(),...e.components};return n.jsxs(n.Fragment,{children:[n.jsx(a.h1,{id:"uitoolbarlink",children:"UiToolbarLink"}),`
`,n.jsxs(a.p,{children:["Повторяет функционал стандартной ссылки ",n.jsx(a.code,{children:"UiLink"})," с некоторыми ограничениями:"]}),`
`,n.jsxs(a.ul,{children:[`
`,n.jsxs(a.li,{children:[n.jsx(a.code,{children:"size"})," – значение принудительно устанавливается на стороне CRM в зависимости от того, где расширение запускается;"]}),`
`]}),`
`,n.jsxs(a.p,{children:[`Данный тип ссылки нужен для корректной стилизации элементов, используемых на основном слое интерфейса, элементов,
размещенных не внутри некоторого модального элемента, вроде `,n.jsx(a.code,{children:"UiModalSidebar"})," или ",n.jsx(a.code,{children:"UiModalWindow"})]})]})}function A(e={}){const{wrapper:a}={...u(),...e.components};return a?n.jsx(a,{...e,children:n.jsx(r,{...e})}):r(e)}const B={title:"Components/UiToolbarLink",component:l,args:{appearance:o.DEFAULT},argTypes:{appearance:{control:"select",options:Object.values(o)},default:{control:!1},icon:{control:!1}},render:e=>({components:{UiToolbarLink:l},setup(){return{args:e}},template:`
      <UiToolbarLink v-bind="args">
          Hyperlink
      </UiToolbarLink>
    `}),parameters:{docs:{page:A},layout:"centered"}},t={};var c,d,p;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:"{}",...(p=(d=t.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};const M=["Sandbox"];export{t as Sandbox,M as __namedExportsOrder,B as default};
