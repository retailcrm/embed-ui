import{o as r,c as p,a as c,d as T,r as l,e as V,E as F,h as _,v as d,g as f,m as X,j as Z,u as C,F as D,f as H,k as B}from"./vue.esm-bundler-BDTEftJR.js";import{S as E,_ as L}from"./UiButton-dkoPPCpU.js";import{_ as q}from"./UiTooltip-DHdPQWoJ.js";import{j as o}from"./jsx-runtime-N83kn9-W.js";import{useMDXComponents as M}from"./index-g1djAheZ.js";import{T as A}from"./ToReact-BEI8S_zj.js";import"./predicate-ClulhfEu.js";import"./composables-BdO0bl9Q.js";import"./UiPopper-DkkEzjC5.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-Dj9yGJcI.js";import"./preview-DbwDgyJs.js";const R={xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24"};function P(t,e){return r(),p("svg",R,e[0]||(e[0]=[c("path",{fill:"currentColor","fill-rule":"evenodd",d:"M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10A10 10 0 0 0 12 2m0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16m3.12-11.51a.5.5 0 0 1 .7 0l.5.53a.5.5 0 0 1 0 .71l-5.62 5.62a.48.48 0 0 1-.7 0l-2.35-2.37a.5.5 0 0 1 0-.71l.53-.53a.48.48 0 0 1 .7 0l1.5 1.49z","clip-rule":"evenodd"},null,-1)]))}const G={render:P},J={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"};function K(t,e){return r(),p("svg",J,e[0]||(e[0]=[c("path",{fill:"currentColor",d:"M18 16V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M4 4h12v12H4zm16 14V6a2 2 0 0 1 2 2v10a4 4 0 0 1-4 4H8a2 2 0 0 1-2-2h12a2 2 0 0 0 2-2"},null,-1)]))}const Q={render:K},W={class:"ui-v1-copy-button__tooltip"},Y={class:"ui-v1-copy-button__icon"},ee={class:"ui-v1-copy-button__text"},te=["value"],h=T({__name:"UiCopyButton",props:{text:{type:String,required:!0},size:{type:String,default:E.XS},tooltipOptions:{type:Object,default:()=>({})}},emits:["error"],setup(t,{emit:e}){const s=t,b=l(null),z=V(()=>b),x=l(null),u=l(!1),m=l(!1),y=l(!1);let n=null;const $=e;F(()=>{y.value=navigator.clipboard&&"writeText"in navigator.clipboard});const N=async()=>{var a,i;try{y.value?(await navigator.clipboard.writeText(s.text),m.value=!0):((a=x.value)==null||a.focus(),(i=x.value)==null||i.select(),m.value=document.execCommand("copy"))}catch(g){$("error",g)}},I=()=>{u.value=!0,n&&(clearTimeout(n),n=null)},O=()=>{u.value=!1,n&&(clearTimeout(n),n=null),n=setTimeout(()=>m.value=!1,200)};return(a,i)=>(r(),p("div",{ref_key:"root",ref:b,class:"ui-v1-copy-button",onMouseenter:I,onMouseleave:O,onClick:N},[_(a.$slots,"trigger",{},()=>[d(L,{size:t.size,appearance:"tertiary"},{default:f(()=>[d(C(Q))]),_:1},8,["size"])]),d(q,X({visible:u.value,"onUpdate:visible":i[0]||(i[0]=g=>u.value=g),target:z.value,"target-triggers":[]},{delay:{hide:500},...t.tooltipOptions}),{default:f(()=>[c("div",W,[m.value?(r(),p(D,{key:0},[c("div",Y,[d(C(G))]),c("div",ee,[_(a.$slots,"hint-copied")])],64)):_(a.$slots,"hint",{key:1})])]),_:3},16,["visible","target"]),y.value?Z("",!0):(r(),p("input",{key:0,ref_key:"input",ref:x,value:t.text,class:"ui-v1-copy-button__area",type:"text"},null,8,te))],544))}});h.__docgenInfo={exportName:"default",displayName:"UiCopyButton",description:"",tags:{},props:[{name:"text",description:"Текст для копирования в буфер обмена",type:{name:"string"},required:!0},{name:"size",description:"Размер кнопки",type:{name:"SIZE | `${SIZE}`"},defaultValue:{func:!1,value:"SIZE.XS"}},{name:"tooltipOptions",description:"Объект, содержащий параметры настройки Tooltip",type:{name:"TooltipOptions"},defaultValue:{func:!0,value:"() => ({})"}}],events:[{name:"error"}],slots:[{name:"trigger"},{name:"hint-copied"},{name:"hint"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/host/components/copy-button/UiCopyButton.vue"]};const U=T({__name:"ExampleBasic",setup(t){return(e,s)=>(r(),H(h,{text:"Текст для копирования",size:"sm"},{hint:f(()=>s[0]||(s[0]=[B(" Скопировать ")])),"hint-copied":f(()=>s[1]||(s[1]=[B(" Скопировано ")])),_:1}))}});U.__docgenInfo={exportName:"default",displayName:"ExampleBasic",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/examples/copy-button/ExampleBasic.vue"]};function j(t){const e={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...M(),...t.components};return o.jsxs(o.Fragment,{children:[o.jsx(e.h1,{id:"uicopybutton",children:"UiCopyButton"}),`
`,o.jsx(e.p,{children:"Кнопки для копирования текста"}),`
`,o.jsx(e.h2,{id:"механика",children:"Механика"}),`
`,o.jsx(e.p,{children:`При клике на кнопку (по-умолчанию третичная) копируется заранее заготовленный текст. Кнопка при этом имеет всплывающую
подсказку, контент которой на некоторое время меняется после копирования текста в буфер обмена (индикация, что текст
скопирован).`}),`
`,o.jsx(e.h2,{id:"применение",children:"Применение"}),`
`,o.jsx(e.p,{children:"Код:"}),`
`,o.jsx(e.pre,{children:o.jsx(e.code,{className:"language-html",children:`<template>
    <UiCopyButton text="Текст для копирования" size="sm">
        <template #hint>
            Скопировать
        </template>

        <template #hint-copied>
            Скопировано
        </template>
    </UiCopyButton>
</template>

<script lang="ts" setup>
import { UiCopyButton } from '@retailcrm/embed-ui-v1-components/remote'
<\/script>
`})}),`
`,o.jsx(e.p,{children:"Результат:"}),`
`,o.jsx(A,{is:U})]})}function oe(t={}){const{wrapper:e}={...M(),...t.components};return e?o.jsx(e,{...t,children:o.jsx(j,{...t})}):j(t)}const fe={title:"Components/UiCopyButton",component:h,args:{text:"Long enough text worth to be copied"},argTypes:{size:{options:Object.values(E)}},render:t=>({components:{UiCopyButton:h},setup:()=>({args:t}),template:`
      <UiCopyButton v-bind="args">
          <template #hint>
              Скопировать
          </template>

          <template #hint-copied>
              Скопировано
          </template>
      </UiCopyButton>
    `}),parameters:{docs:{page:oe},layout:"centered"}},v={};var w,k,S;v.parameters={...v.parameters,docs:{...(w=v.parameters)==null?void 0:w.docs,source:{originalSource:"{}",...(S=(k=v.parameters)==null?void 0:k.docs)==null?void 0:S.source}}};const he=["Sandbox"];export{v as Sandbox,he as __namedExportsOrder,fe as default};
