import{I as A,a as V}from"./done-CVboahc5.js";import{I as _,z as h,e as m,s as w,f as u,g as x,q as N,u as U,o as i,v as S,N as M,m as D,c as E,j,k as $,t as F,F as C,n as R,l as L}from"./vue.esm-bundler-mKb0gIWi.js";import{V as p,_ as Z,S as b}from"./UiButton-Ci5hFJiS.js";import{i as P}from"./predicate-D9CE3zPC.js";import{w as X}from"./utils-8AQkmo-1.js";import{j as e}from"./index-BFZQNVMc.js";import{useMDXComponents as I}from"./index-uLjDVhSk.js";import{T as a}from"./ToReact-Dcega5WJ.js";import"./_commonjsHelpers-Cpj98o6Y.js";var d=(n=>(n.SM="sm",n.MD="md",n))(d||{});const k={size:Symbol("UiToolbarSize")},O=()=>_(k.size,h(()=>"sm")),c=m({inheritAttrs:!1,__name:"UiToolbarButton",props:{href:{type:null,validator:n=>typeof n=="string"&&P(n)||n===null,default:null},variant:{type:String,default:p.DEFAULT},active:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},locked:{type:Boolean,default:!1}},setup(n,{expose:s}){const l=w(null);s({click:()=>{var o;return(o=l.value)==null?void 0:o.click()},focus:()=>{var o;return(o=l.value)==null?void 0:o.focus()},blur:()=>{var o;return(o=l.value)==null?void 0:o.blur()}});const f=O(),z=h(()=>f.value===d.SM?b.XS:b.SM);return(o,G)=>(i(),u(Z,N({ref_key:"root",ref:l,href:n.href,variant:n.variant,size:z.value,active:n.active,disabled:n.disabled,locked:n.locked,appearance:"secondary"},U(X)(o.$attrs,["appearance","class","style","type"])),{default:x(()=>[S(o.$slots,"default")]),_:3},16,["href","variant","size","active","disabled","locked"]))}});c.__docgenInfo={exportName:"default",displayName:"UiToolbarButton",description:"",tags:{},props:[{name:"href",description:"Устанавливает атрибут href якоря",type:{name:"string | null"},defaultValue:{func:!1,value:"null"}},{name:"variant",description:"Регулирует цветовую схему кнопки: default, success or danger",type:{name:"VARIANT | `${VARIANT}`"},defaultValue:{func:!1,value:"VARIANT.DEFAULT"}},{name:"active",description:"Если кнопка активна",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",description:"Если кнопка отключена",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"locked",description:"Если кнопка заблокирована",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/host/components/toolbar/UiToolbarButton.vue"]};const B=m({inheritAttrs:!1,__name:"UiToolbar",props:{size:{type:String,default:d.SM}},setup(n){const s=n;return M(k.size,h(()=>s.size)),(l,f)=>S(l.$slots,"default")}});B.__docgenInfo={exportName:"default",displayName:"UiToolbar",description:"",tags:{},props:[{name:"size",type:{name:"SIZE | `${SIZE}`"},defaultValue:{func:!1,value:"SIZE.SM"}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/host/components/toolbar/UiToolbar.vue"]};const t=m({__name:"UiToolbarButton.example",props:{text:{type:String,default:""},showIcon:{type:Boolean,default:!1},size:{type:String,default:d.SM}},setup(n){return(s,l)=>(i(),u(B,{size:n.size},{default:x(()=>[D(c,R(L(s.$attrs)),{default:x(()=>[n.text.length?(i(),E(C,{key:0},[n.showIcon?(i(),u(U(A),{key:0})):j("",!0),$(" "+F(n.text),1)],64)):j("",!0)]),_:1},16)]),_:1},8,["size"]))}});t.__docgenInfo={exportName:"default",displayName:"UiToolbarButton.example",description:"",tags:{},props:[{name:"text",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"showIcon",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"size",type:{name:"SIZE | `${SIZE}`"},defaultValue:{func:!1,value:"SIZE.SM"}}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiToolbarButton.example.vue"]};function v(n){const s={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...I(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(s.h1,{id:"uitoolbarbutton",children:"UiToolbarButton"}),`
`,e.jsx(s.p,{children:"Является аналогом стандартной кнопки с узконаправленным применением за исключением следующих ограничений:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["предусмотрен только один внешний вид — ",e.jsx(s.code,{children:"secondary"}),". В связи с этим данное свойство отсутствует для компонента;"]}),`
`,e.jsxs(s.li,{children:["в качестве обёртки для кнопки допускается только тэг — ",e.jsx(s.code,{children:"button"}),`. Поэтому свойство является предустановленным и недопустимым
для изменения;`]}),`
`,e.jsxs(s.li,{children:["токены размеров ограничены до ",e.jsx(s.code,{children:"sm"})," и ",e.jsx(s.code,{children:"lg"})," и могут задаваться только через компонент-обёртку ",e.jsx(s.code,{children:"UiToolbar"}),"."]}),`
`]}),`
`,e.jsx(s.h3,{id:"настройка-размеров",children:"Настройка размеров"}),`
`,e.jsxs(s.p,{children:["Компонент ",e.jsx(s.code,{children:"UiToolbar"}),` является связующим звеном для настройки ограниченных параметров, посредством провайда необходимых
свойств для узкоспециализированных компонентов. На данный момент в `,e.jsx(s.code,{children:"UiToolbar"})," доступно только свойство ",e.jsx(s.code,{children:"size"}),`,
определяющее размеры дочерних компонентов с префиксом `,e.jsx(s.code,{children:"UiToolbar"}),"."]}),`
`,e.jsxs(s.p,{children:["Пример проброса размера кнопки через ",e.jsx(s.code,{children:"UiToolbar"})," компонент:"]}),`
`,e.jsx(a,{is:t,text:"Button",size:"sm"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-vue",children:`<UiToolbar size="sm">
    <UiToolbarButton>
        Button
    </UiToolbarButton>
</UiToolbar>
`})}),`
`,e.jsxs(s.p,{children:["В рамках компонента ",e.jsx(s.code,{children:"UiToolbar"})," представлено два размера ",e.jsx(s.code,{children:"sm"})," и ",e.jsx(s.code,{children:"lg"}),`. Схема соответствия токенов размера компонентов
следующая:`]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"sm"})," (",e.jsx(s.code,{children:"UiToolbar"}),") — ",e.jsx(s.code,{children:"xs"})," (",e.jsx(s.code,{children:"UiButton"}),");"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"lg"})," (",e.jsx(s.code,{children:"UiToolbar"}),") — ",e.jsx(s.code,{children:"SM"})," (",e.jsx(s.code,{children:"UiButton"}),")."]}),`
`]}),`
`,e.jsxs(s.p,{children:[`Доступные размеры идентичны соответствующим размерам стандартной кнопки. Каждый токен влияет на высоту,
отступы, размер контента и иконок, а также на скругление рамки кнопки. По-умолчанию принят размер `,e.jsx(s.code,{children:"sm"}),"."]}),`
`,e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"16px",marginBottom:"32px"},children:[e.jsx(a,{is:t,text:"LG",size:"lg",showIcon:!0}),e.jsx(a,{is:t,text:"SM",showIcon:!0})]}),`
`,e.jsx(s.h2,{id:"api",children:"API"}),`
`,e.jsx(s.h3,{id:"цветовая-схема",children:"Цветовая схема"}),`
`,e.jsxs(s.p,{children:["Цветовая схема кнопки позволяет показать её роль на форме. В компоненте представлены три разновидности схем: ",e.jsx(s.code,{children:"default"}),`,
`,e.jsx(s.code,{children:"success"})," и ",e.jsx(s.code,{children:"danger"}),". Базовой схемой является ",e.jsx(s.code,{children:"default"}),"."]}),`
`,e.jsxs("div",{style:{display:"flex",gap:"16px"},children:[e.jsx(a,{is:t,text:"Default"}),e.jsx(a,{is:t,text:"Success",variant:"success"}),e.jsx(a,{is:t,text:"Danger",variant:"danger"})]}),`
`,e.jsx(s.h3,{id:"ссылка",children:"Ссылка"}),`
`,e.jsxs(s.p,{children:["Если для кнопки задано свойство ",e.jsx(s.code,{children:"href"}),", то её можно использовать как ссылку с переходом на указанный ресурс."]}),`
`,e.jsx(s.h3,{id:"состояния",children:"Состояния"}),`
`,e.jsx(s.p,{children:"Для кнопки доступно три состояния:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"active"})," — кнопка активна;"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"disabled"})," — кнопка отключена;"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"locked"})," — кнопка заблокирована."]}),`
`]}),`
`,e.jsxs("div",{style:{display:"flex",gap:"16px",margin:"8px auto"},children:[e.jsx(a,{is:t,text:"Active",active:!0,showIcon:!0}),e.jsx(a,{is:t,text:"Disabled",disabled:!0,showIcon:!0}),e.jsx(a,{is:t,text:"Locked",locked:!0,showIcon:!0})]}),`
`,e.jsx(s.h2,{id:"события",children:"События"}),`
`,e.jsxs(s.p,{children:["Компонент предоставляет нативные события ",e.jsx(s.code,{children:"click"}),", ",e.jsx(s.code,{children:"focus"})," и ",e.jsx(s.code,{children:"blur"}),"."]}),`
`,e.jsx(s.h2,{id:"слоты",children:"Слоты"}),`
`,e.jsxs(s.p,{children:["Для кастомизации контента кнопки выделен слот ",e.jsx(s.code,{children:"default"}),"."]})]})}function q(n={}){const{wrapper:s}={...I(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(v,{...n})}):v(n)}const oe={title:"Components/UiToolbarButton",component:c,args:{variant:p.DEFAULT},argTypes:{href:{control:"text"},variant:{control:"select",options:Object.values(p)},default:{control:!1}},render:n=>({components:{IconAdd:V,UiToolbarButton:c},setup(){return{args:n}},template:`
      <UiToolbarButton v-bind="args">
          <IconAdd aria-hidden="true" /> Create
      </UiToolbarButton>
    `}),parameters:{docs:{page:q},layout:"centered"}},r={};var g,y,T;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:"{}",...(T=(y=r.parameters)==null?void 0:y.docs)==null?void 0:T.source}}};const te=["Sandbox"];export{r as Sandbox,te as __namedExportsOrder,oe as default};
