var M=Object.defineProperty;var F=(n,e,s)=>e in n?M(n,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):n[e]=s;var d=(n,e,s)=>F(n,typeof e!="symbol"?e+"":e,s);import{o as u,c as m,a as p,d as B,e as G,r as y,h,j as v,N as _,O as P,s as D,m as L,P as O,b as W,q as z,u as w,f as X,g as A,k as H,t as K,F as q,n as J,l as Q}from"./vue.esm-bundler-CynvcUwn.js";import{I as Y}from"./clear-BntOwuO1.js";import{I as Z}from"./plugin-Dg2E80Uy.js";import{j as t}from"./jsx-runtime-DQFc-wkB.js";import{useMDXComponents as V}from"./index-BjypYOp6.js";import{T as l}from"./ToReact-DREJFgbz.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-C_1tOEKP.js";import"./preview-j2QA7UBs.js";const ee={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"};function te(n,e){return u(),m("svg",ee,e[0]||(e[0]=[p("path",{fill:"currentColor",d:"m14.675 4.6.544-1.257a.99.99 0 0 0-.04-.911.82.82 0 0 0-.739-.421L9.5 2a.81.81 0 0 0-.704.423.99.99 0 0 0-.047.88l.55 1.26c.155.358.201.762.13 1.15l-.623 3.441a2.8 2.8 0 0 1-.685 1.426l-.875.96a.96.96 0 0 0-.246.646l.025.555c.002.502.373.91.83.912l8.312.025c.458 0 .828-.407.828-.909l.005-.536a.96.96 0 0 0-.248-.646l-.878-.964a2.85 2.85 0 0 1-.691-1.43l-.636-3.443a2 2 0 0 1 .128-1.15M10.967 20.047a3 3 0 0 1-.196-1.079l-.007-3.771 2.424.057.007 3.758a3 3 0 0 1-.193 1.079l-.638 1.632a.415.415 0 0 1-.382.277.42.42 0 0 1-.383-.279z"},null,-1)]))}const ne={render:te};var x=(n=>(n.LG="lg",n.MD="md",n.SM="sm",n.XS="xs",n))(x||{});function se(n){const e=n.scrollWidth-n.clientWidth,s=`${(n.scrollWidth/n.clientWidth*2).toFixed(2)}s`;return e!==0?{"--delta-width":`-${e}px`,animationDuration:s}:{}}const re=n=>n===1?0:1,ae=n=>n===1?0:1,ie=(n,e)=>{if(e===2)return n===1?0:1;const s=n%100;return s%10===1&&s!==11?0:s%10>=2&&s%10<=4&&!(s>=10&&s<15)?1:2},le=(n,e)=>{let s=0,r=n[e[0]];for(;s<e.length;){if(typeof r=="string"&&s+1===e.length)return r;if(typeof r!="object")return;r=r[e[++s]]}return r},oe=(n,e)=>Object.keys(e).reduce((s,r)=>{const a=new RegExp(`\\{${r}\\}`,"g"),o=String(e[r]);return s.replace(a,o)},n),ce=(n,e,s=void 0)=>{const r=le(n,e);return typeof r=="string"&&s?oe(r,s):r},b=n=>{throw new Error(n)},de=(n,e,s,r=void 0)=>{const a=s.split(".");if(n){const o=ce(e[n]??{},a,r);return typeof o!="object"?o:b(`Translation for "${n}:${s}" is not translatable`)}},ue=(n,e,s)=>{const r=n.split("|");return r[s(e,r.length)]};class j{constructor(e=void 0,s=void 0){d(this,"parent");d(this,"messages");d(this,"computed");d(this,"pluralization");d(this,"fallback");this.parent=s,this.messages=(e==null?void 0:e.messages)??{},this.computed=(e==null?void 0:e.computed)??{},this.pluralization={"en-GB":re,"es-ES":ae,"ru-RU":ie,...(e==null?void 0:e.pluralization)??{}},this.fallback=e==null?void 0:e.fallback}t(e,s,r=void 0){try{const a=o=>de(o,this.messages,s,r);return a(e)??a(this.fallback)??b(`Translation for "${s}" does not exists`)}catch(a){if(this.parent)return this.parent.t(e,s,r);throw a}}tc(e,s,r,a=void 0){return ue(this.t(e,s,a),r,this.pluralization[e])}compute(e,s,r){const a=this.computed[s];return a?a(C(this,e),r):this.parent?this.parent.compute(e,s,r):b("Key "+s+" is not registered")}extend(e){return new j({pluralization:this.pluralization,fallback:this.fallback,...e},this)}}const C=(n,e)=>({t(s,r=void 0){return n.t(e,s,r)},tc(s,r,a=void 0){return n.tc(e,s,r,a)},compute(s,r){return n.compute(e,s,r)}}),T={delete:"Удалить"},me={delete:"Eliminar"},I="en-GB",ge=new j({messages:{"en-GB":T,"es-ES":me,"ru-RU":T},fallback:I}),pe=(n,e=null)=>e?n.extend(e):n,xe=(n,e=null)=>C(pe(ge,e),n),E={fallback:I,init:xe},fe={key:0,class:"ui-v1-tag__icon"},he={class:"ui-v1-tag__content-inner"},ve=["aria-label"],f=B({__name:"UiTag",props:{size:{type:String,default:x.LG},pinned:{type:Boolean,default:!1},removable:{type:Boolean,default:!1},interactive:{type:Boolean,default:!1},saturated:{type:Boolean,default:!1},background:{type:String,default:null},ticker:{type:Boolean,default:!0}},emits:["remove"],setup(n){const e=n,s=W(Z,null),r=G(()=>E.init((s==null?void 0:s.locale)??E.fallback,null)),a=y(null),o=y({}),R=()=>{e.ticker&&a.value&&(o.value=se(a.value))};return(c,k)=>(u(),m("div",L({class:"ui-v1-tag-wrapper"},O(c.$attrs,!0)),[p("div",{class:D({"ui-v1-tag":!0,[`ui-v1-tag_size_${n.size}`]:!0,"ui-v1-tag_saturated":n.saturated,"ui-v1-tag_interactive":n.interactive}),style:_(n.background?{background:n.background}:{}),onMouseoverOnce:R},[c.$slots.icon||n.pinned?(u(),m("div",fe,[h(c.$slots,"icon",{},()=>[z(w(ne))])])):v("",!0),p("div",{ref_key:"textRef",ref:a,style:_(o.value),class:"ui-v1-tag__content"},[p("div",he,[h(c.$slots,"default")])],4),n.removable||c.$slots["remove-icon"]?(u(),m("div",{key:1,class:"ui-v1-tag__remove-icon","aria-label":r.value.t("delete"),onClick:k[0]||(k[0]=P(je=>c.$emit("remove"),["stop"]))},[h(c.$slots,"remove-icon",{},()=>[z(w(Y))])],8,ve)):v("",!0)],38)],16))}});f.__docgenInfo={exportName:"default",displayName:"UiTag",description:"",tags:{},props:[{name:"size",description:"Рамер",type:{name:"SIZE"},defaultValue:{func:!1,value:"SIZE.LG"}},{name:"pinned",description:"Слева выводим иконку закреплённого тега",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"removable",description:"Доступна иконка удаления",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"interactive",description:"Добавляет курсор и анимацию наведения",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"saturated",description:"Делает текст и иконки белыми, а также добавляет @blue-500 фон по-умолчанию",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"background",description:"Произвольный фоновый цвет",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"ticker",description:"Анимация бегущей строки при наведении",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}}],events:[{name:"remove",description:"Срабатывает при клике на кнопку удаления"}],slots:[{name:"icon",description:"Иконка перед названием"},{name:"default",description:"Название метки"},{name:"remove-icon",description:"Иконка удаления"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/host/components/tag/UiTag.vue"]};const i=B({__name:"UiTag.example",props:{text:{type:String,default:""}},setup(n){return(e,s)=>(u(),X(f,J(Q(e.$attrs)),{default:A(()=>[n.text.length?(u(),m(q,{key:0},[H(K(n.text),1)],64)):v("",!0)]),_:1},16))}});i.__docgenInfo={exportName:"default",displayName:"UiTag.example",description:"",tags:{},props:[{name:"text",type:{name:"string"},defaultValue:{func:!1,value:"''"}}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiTag.example.vue"]};function U(n){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...V(),...n.components};return t.jsxs(t.Fragment,{children:[t.jsx(e.h1,{id:"uitag",children:"UiTag"}),`
`,t.jsx(e.p,{children:"Тег, компонент визуального обозначения состояния"}),`
`,t.jsx(e.h2,{id:"api",children:"API"}),`
`,t.jsx(e.h3,{id:"размеры",children:"Размеры"}),`
`,t.jsxs(e.p,{children:["Для тегов предусмотрены токены размеров: ",t.jsx(e.code,{children:"lg"}),", ",t.jsx(e.code,{children:"md"}),",",t.jsx(e.code,{children:"sm"})," и ",t.jsx(e.code,{children:"xs"}),`. Представленные размеры влияют
на высоту, отступы, размер контента и иконок.`]}),`
`,t.jsxs("p",{className:"d-flex gap-4",style:{alignItems:"center"},children:[t.jsx(l,{tag:"span",is:i,text:"lg",pinned:!0,removable:!0}),t.jsx(l,{tag:"span",is:i,text:"md",size:"md",pinned:!0,removable:!0}),t.jsx(l,{tag:"span",is:i,text:"sm",size:"sm",pinned:!0,removable:!0}),t.jsx(l,{tag:"span",is:i,text:"xs",size:"xs",pinned:!0,removable:!0})]}),`
`,t.jsx(e.h3,{id:"настраиваемый-внешний-вид",children:"Настраиваемый внешний вид"}),`
`,t.jsx(e.p,{children:"Изменение внешнего вида элемента осуществляется настройкой следующих свойств:"}),`
`,t.jsxs(e.ul,{children:[`
`,t.jsxs(e.li,{children:[t.jsx(e.code,{children:"background"})," — фоновый цвет тега. Задавать цвет можно с использованием любой доступной цветовой модели;"]}),`
`,t.jsxs(e.li,{children:[t.jsx(e.code,{children:"saturated"})," — инверсия цвета текста и иконки в белой цвет;"]}),`
`,t.jsxs(e.li,{children:[t.jsx(e.code,{children:"ticker"})," — анимация бегущей строки при наведении;"]}),`
`,t.jsxs(e.li,{children:[t.jsx(e.code,{children:"interactive"})," — курсор и анимация при наведении."]}),`
`]}),`
`,t.jsxs("div",{className:"flex-column gap-3",children:[t.jsx("strong",{children:"Background:"}),t.jsxs("div",{className:"d-flex gap-2",children:[t.jsx(l,{is:i,text:"#19976E",background:"#19976E"}),t.jsx(l,{is:i,text:"rgb(83, 154, 218)",background:"rgb(83, 154, 218)"}),t.jsx(l,{is:i,text:"rgb(83, 154, 218, 0.4)",background:"rgb(83, 154, 218, 0.4)"})]}),t.jsx("strong",{children:"Saturated:"}),t.jsxs("div",{className:"d-flex gap-2",children:[t.jsx(l,{is:i,text:"#19976E",background:"#19976E",saturated:!0}),t.jsx(l,{is:i,text:"rgb(83, 154, 218)",background:"rgb(83, 154, 218)",saturated:!0}),t.jsx(l,{is:i,text:"rgb(83, 154, 218, 0.4)",background:"rgb(83, 154, 218, 0.4)",saturated:!0})]}),t.jsx("strong",{children:"Ticker:"}),t.jsxs("div",{className:"d-flex gap-2",children:[t.jsx(l,{is:i,text:"#19976E",background:"#19976E",style:{width:"80px"}}),t.jsx(l,{is:i,text:"rgb(83, 154, 218)",background:"rgb(83, 154, 218)",style:{width:"80px"}}),t.jsx(l,{is:i,text:"rgb(83, 154, 218, 0.4)",background:"rgb(83, 154, 218, 0.4)",style:{width:"80px"}})]}),t.jsx("strong",{children:"Interactive:"}),t.jsxs("div",{className:"d-flex gap-2",children:[t.jsx(l,{is:i,text:"#19976E",background:"#19976E",interactive:!0}),t.jsx(l,{is:i,text:"rgb(83, 154, 218)",background:"rgb(83, 154, 218)",interactive:!0}),t.jsx(l,{is:i,text:"rgb(83, 154, 218, 0.4)",background:"rgb(83, 154, 218, 0.4)",interactive:!0})]})]}),`
`,t.jsx(e.h3,{id:"события",children:"События"}),`
`,t.jsxs(e.p,{children:["Компонент предоставляет нативные события ",t.jsx(e.code,{children:"click"}),", ",t.jsx(e.code,{children:"focus"})," и ",t.jsx(e.code,{children:"blur"}),". Если для тега установлено свойство ",t.jsx(e.code,{children:"removable"}),`, то
клик по иконке удаления вызывает появление события `,t.jsx(e.code,{children:"remove"}),"."]}),`
`,t.jsx(e.h3,{id:"слоты",children:"Слоты"}),`
`,t.jsx(e.p,{children:"Для адаптации компонента под более широкий спектр применения выделены слоты:"}),`
`,t.jsxs(e.ul,{children:[`
`,t.jsxs(e.li,{children:[t.jsx(e.code,{children:"icon"})," — иконка слева от основного контента тега;"]}),`
`,t.jsxs(e.li,{children:[t.jsx(e.code,{children:"default"})," — основной контент тега;"]}),`
`,t.jsxs(e.li,{children:[t.jsx(e.code,{children:"remove-icon"})," — иконка удаления, расположенная справа от основного контента."]}),`
`]}),`
`,t.jsx(e.h2,{id:"пример",children:"Пример"}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-html",children:`<template>
    <UiTag background="#FEA530" saturated>
        VIP
    </UiTag>
</template>

<script lang="ts" setup>
import { UiTag } from '@retailcrm/embed-ui-v1-components/remote'
<\/script>
`})})]})}function be(n={}){const{wrapper:e}={...V(),...n.components};return e?t.jsx(e,{...n,children:t.jsx(U,{...n})}):U(n)}const Ne={title:"Components/UiTag",component:f,args:{size:x.LG,background:"#66d2b6",saturated:!0},argTypes:{size:{control:"select",options:Object.values(x)},icon:{control:!1},default:{control:!1},"remove-icon":{control:!1}},render:n=>({components:{UiTag:f},setup(){return{args:n}},template:`
      <UiTag v-bind="args">
        Free text
      </UiTag>
    `}),parameters:{docs:{page:be},layout:"centered"}},g={};var $,S,N;g.parameters={...g.parameters,docs:{...($=g.parameters)==null?void 0:$.docs,source:{originalSource:"{}",...(N=(S=g.parameters)==null?void 0:S.docs)==null?void 0:N.source}}};const Be=["Sandbox"];export{g as Sandbox,Be as __namedExportsOrder,Ne as default};
