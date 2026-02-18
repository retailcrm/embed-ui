import{_ as t,S as z,a as f}from"./UiAvatar-D8pViE9E.js";import{j as s}from"./index-Djyvt97q.js";import{useMDXComponents as w}from"./index-Cdf3Trmt.js";import{T as o}from"./ToReact-rGZD6-Z2.js";import{c as a,o as r,F as p,k as y,q as V,w as u,m as i,z as b,A as F,u as A,n as l,v as R,a as j}from"./iframe-CzwIxcDt.js";import{_ as B}from"./UiAvatarList-526c0aLn.js";import{_ as x}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./UiImage-1XONiwuo.js";import"./predicate-ClulhfEu.js";import"./index-B44Kv34C.js";import"./preload-helper-PPVm8Dsz.js";const I="_container_10iml_1",T={container:I},v="https://on-desktop.com/wps/Animals___Cats_Red_Cat_with_open_mouth_044663_.jpg",C={__name:"ExampleList",props:{countAvatars:{type:Number,default:0}},setup(n){return(e,c)=>(r(),a("div",{class:l(e.$style.container)},[(r(!0),a(p,null,y(A(z),(_,h)=>(r(),V(B,{key:h,size:_},{default:u(()=>[(r(!0),a(p,null,y([{src:"",name:"ЧC"},{src:v,name:"ЧС"},{src:"",name:"XC"},{src:v,name:"ЧС"},{src:v,name:"ЧС"},{src:"",name:"+8"}].slice(0,n.countAvatars),(k,D)=>(r(),a("div",{key:D,class:"ui-v1-avatar-list__item"},[i(t,{src:k.src},{default:u(()=>[b(F(k.name),1)]),_:2},1032,["src"])]))),128))]),_:1},8,["size"]))),128))],2))}},U={$style:T},E=x(C,[["__cssModules",U]]);C.__docgenInfo={exportName:"default",displayName:"ExampleList",description:"",tags:{},props:[{name:"countAvatars",type:{name:"number"},defaultValue:{func:!1,value:"0"}}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/examples/avatar/ExampleList.vue"]};const X="_container_qk2ce_1",O={container:X},d="https://on-desktop.com/wps/Animals___Cats_Red_Cat_with_open_mouth_044663_.jpg",N={__name:"ExampleSize",props:{size:{type:String,default:"sm"}},setup(n){return(e,c)=>(r(),a("div",{class:l(e.$style.container)},[i(t,{src:d,size:n.size},null,8,["size"]),i(t,{size:n.size},{default:u(()=>[...c[0]||(c[0]=[b(" ЧС ",-1)])]),_:1},8,["size"]),n.size!=="xs"?(r(),a(p,{key:0},[i(t,{src:d,size:n.size,vip:"",bad:""},null,8,["size"]),i(t,{src:d,size:n.size,vip:""},null,8,["size"]),i(t,{src:d,size:n.size,bad:""},null,8,["size"]),i(t,{size:n.size,bad:""},{default:u(()=>[...c[1]||(c[1]=[b(" ЧС ",-1)])]),_:1},8,["size"])],64)):R("",!0)],2))}},q={$style:O},g=x(N,[["__cssModules",q]]);N.__docgenInfo={exportName:"default",displayName:"ExampleSize",description:"",tags:{},props:[{name:"size",type:{name:"string"},defaultValue:{func:!1,value:"'sm'"}}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/examples/avatar/ExampleSize.vue"]};const G="_container_qk2ce_1",P={container:G},M={__name:"ExampleStatus",props:{size:{type:String,default:"sm"}},setup(n){return(e,c)=>(r(),a("div",{class:l(e.$style.container)},[(r(!0),a(p,null,y(A(f),(_,h)=>(r(),a("div",{key:h},[i(t,{src:"https://on-desktop.com/wps/Animals___Cats_Red_Cat_with_open_mouth_044663_.jpg",size:n.size,status:_},null,8,["size","status"])]))),128))],2))}},Z={$style:P},$=x(M,[["__cssModules",Z]]);M.__docgenInfo={exportName:"default",displayName:"ExampleStatus",description:"",tags:{},props:[{name:"size",type:{name:"string"},defaultValue:{func:!1,value:"'sm'"}}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/examples/avatar/ExampleStatus.vue"]};const H="_container_14nj0_1",J={container:H,"content-row":"_content-row_14nj0_10"},L={__name:"ExampleEmptyAvatar",setup(n){return(e,c)=>(r(),a("div",{class:l(e.$style.container)},[j("div",{class:l(e.$style["content-row"])},[i(t,{size:"xs"}),i(t),i(t,{size:"lg"})],2),j("div",{class:l(e.$style["content-row"])},[i(t,{size:"xs",vip:""}),i(t,{bad:""}),i(t,{size:"lg",bad:"",vip:""})],2),j("div",{class:l(e.$style["content-row"])},[i(t,{size:"xs",status:"free"}),i(t,{status:"break"}),i(t,{size:"lg",status:"dinner"})],2)],2))}},K={$style:J},Q=x(L,[["__cssModules",K]]);L.__docgenInfo={exportName:"default",displayName:"ExampleEmptyAvatar",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/examples/avatar/ExampleEmptyAvatar.vue"]};function S(n){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...w(),...n.components};return s.jsxs(s.Fragment,{children:[s.jsx(e.h1,{id:"uiavatar",children:"UiAvatar"}),`
`,s.jsx(e.p,{children:"Аватар пользователя, используемый для визуальной идентификации"}),`
`,s.jsx(e.h2,{id:"описание",children:"Описание"}),`
`,s.jsx(e.p,{children:`В системе используются несколько размеров аватарок в зависимости от их места расположения. Также, аватарки могут быть с пометками VIP/BAD
в карточке клиента или списках.`}),`
`,s.jsx(e.h3,{id:"big--52px",children:"Big — 52px"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsx(e.li,{children:"карточка клиента"}),`
`,s.jsx(e.li,{children:"профиль клиента в чате"}),`
`,s.jsx(e.li,{children:"карточка менеджера (в будущем)"}),`
`]}),`
`,s.jsx(o,{is:g,size:"lg"}),`
`,s.jsx(e.h3,{id:"small--36px",children:"Small — 36px"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsx(e.li,{children:"список клиентов"}),`
`,s.jsx(e.li,{children:"список диалогов в чате"}),`
`,s.jsx(e.li,{children:"переписка в чате"}),`
`,s.jsx(e.li,{children:"карточка участия в программе лояльности (ПЛ)"}),`
`,s.jsx(e.li,{children:"таймлайн в участии ПЛ"}),`
`]}),`
`,s.jsx(o,{is:g}),`
`,s.jsx(e.h3,{id:"small--24px",children:"Small — 24px"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsx(e.li,{children:"история в карточке задачи"}),`
`]}),`
`,s.jsx(e.p,{children:s.jsx(e.strong,{children:"Данный размер используется в системе без иконок vip/bad и без статуса"})}),`
`,s.jsx(o,{is:g,size:"xs"}),`
`,s.jsx(e.h3,{id:"статусы",children:"Статусы"}),`
`,s.jsxs(e.p,{children:["В зависимости от размера аватарки устанавливаются соответствующие отступы. Диаметр статусных иконок - ",s.jsx(e.strong,{children:"8px"}),`.
Для аватарок большого размера (`,s.jsx(e.code,{children:"LG"}),") отступ от краёв составляет ",s.jsx(e.strong,{children:"4px"}),"."]}),`
`,s.jsx(o,{is:$,size:"lg"}),`
`,s.jsxs(e.p,{children:["Для маленьких иконок - ",s.jsx(e.strong,{children:"2px"}),"."]}),`
`,s.jsx(o,{is:$}),`
`,s.jsx(e.h3,{id:"состояние-с-пустой-аватаркой",children:"Состояние с пустой аватаркой"}),`
`,s.jsx(e.p,{children:"При отсутствии в компоненте ссылки на изображение и инициалов используется иконка с вопросительным знаком."}),`
`,s.jsx(o,{is:Q}),`
`,s.jsx(e.h3,{id:"комбинации",children:"Комбинации"}),`
`,s.jsxs(e.p,{children:["Использование нескольких аватарок рядом приводит к добавлению белой обводки ",s.jsx(e.strong,{children:"2px"}),". «Нахлест» составляет ",s.jsx(e.strong,{children:"4px"})," у medium (",s.jsx(e.code,{children:"SM"}),`),
`,s.jsx(e.strong,{children:"8px"})," у big (",s.jsx(e.code,{children:"LG"}),") и ",s.jsx(e.strong,{children:"2px"})," у small (",s.jsx(e.code,{children:"XS"}),")."]}),`
`,s.jsx(o,{is:E,"count-avatars":3}),`
`,s.jsx(e.p,{children:`Если пользователей больше 5, то остальные аватарки схлопываются и показываются числом. В некоторых местах системы это правило используется
ситуативно. В случае необходимости можно схлопывать аватарки после 3-х.`}),`
`,s.jsx(o,{is:E,"count-avatars":6}),`
`,s.jsx(e.h2,{id:"оптимизация",children:"Оптимизация"}),`
`,s.jsxs(e.p,{children:[`Компонент аватара может автоматически уменьшить размер загружаемого изображения за счет формирования URL специального
вида, который строится с помощью утилиты `,s.jsx(e.code,{children:"@retailcrm/image-preview"}),"."]}),`
`,s.jsxs(e.p,{children:["Оптимизация включена по-умолчанию, свойство ",s.jsx(e.code,{children:"optimize"})," компонента может принимать значения:"]}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"true"})," — использовать оптимизацию по-умолчанию"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"false"})," — отключить оптимизацию"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"{ resize?: Dimensions, crop?: Dimensions }"})," — параметры изменения размера и обрезки; ",s.jsx(e.code,{children:"Dimensions"}),` — строки вида
`,s.jsx(e.code,{children:"36x36"}),", ",s.jsx(e.code,{children:"72x-"}),", т.е. ",s.jsx(e.code,{children:"NxM"}),", где N — некоторое число (x-ось), M — некоторое число (y-ось) или прочерк (дефис)."]}),`
`]})]})}function W(n={}){const{wrapper:e}={...w(),...n.components};return e?s.jsx(e,{...n,children:s.jsx(S,{...n})}):S(n)}const de={title:"Components/UiAvatar",component:t,args:{src:"https://on-desktop.com/wps/Animals___Cats_Red_Cat_with_open_mouth_044663_.jpg",size:z.SM,status:f.NONE},argTypes:{status:{control:"select",options:Object.values(f)},size:{control:"select",options:Object.values(z)}},render:n=>({components:{UiAvatar:t},setup(){return{props:n}},template:`
     <UiAvatar v-bind="props" />
    `}),parameters:{docs:{page:W},layout:"centered"}},m={};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:"{}",...m.parameters?.docs?.source}}};const me=["Sandbox"];export{m as Sandbox,me as __namedExportsOrder,de as default};
