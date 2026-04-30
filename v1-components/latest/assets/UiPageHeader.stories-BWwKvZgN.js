import{c as B}from"./host-CMQl2KSi.js";import{_ as H}from"./UiButton-BCon8_Cd.js";import{_ as $}from"./UiLink-CJ6v87MN.js";import{_ as C}from"./UiPageHeaderTitle-Bbw7-Hgz.js";import{_ as V}from"./UiPopperConnector-BFMd-LIm.js";import{_}from"./UiPopperTarget-D4XG6Wm_.js";import{_ as S}from"./UiTooltip-CRMFVV-V.js";import{h as E,r as N,w as L,c as h,m as g,H as f,a as b,k as x,z as v,E as d,A as I,a4 as R,q as D,o as s,y as M,N as A,t as F}from"./iframe-DnG3g5pW.js";import{U as W,a as X}from"./popper-DtrCiXe3.js";import{U as K}from"./tooltip-BlkFvbwI.js";import{d as O,a as y,c as q}from"./createRemoteStoryRender-CQKxbukF.js";import{u as P,j as n}from"./index-DFg_Ho_i.js";import{A as z}from"./blocks-DBDDY4vL.js";import"./predicate-ClulhfEu.js";import"./render-vaNyDQt4.js";import"./composables-CfEvSTVp.js";import"./UiTextbox-8JxeifZm.js";import"./plugin-DbbfKnFn.js";import"./index-BAxMPZdI.js";import"./UiPopper-C8UHJnqx.js";import"./preload-helper-PPVm8Dsz.js";import"./index-nl1gzEpR.js";const Q=["blur","change","focus","keydown","update:value"],G="UiPageHeaderTitle",J=O(G,{emits:Q,methods:{focus:y(),blur:y()}}),Y={key:0,class:"ui-v1-page-header__actions"},Z={class:"ui-v1-page-header__main"},ee={class:"ui-v1-page-header__body"},ne={key:0,class:"ui-v1-page-header__addon"},m=E({inheritAttrs:!1,__name:"UiPageHeader",props:{id:{type:null,default:void 0},value:{type:null,default:""},placeholder:{type:String,default:""},error:{type:String,default:""},editable:{type:Boolean,default:!1},autofocus:{type:Boolean,default:!1},autoselect:{type:Boolean,default:!0},readonly:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},invalid:{type:Boolean,default:!1}},emits:["blur","change","focus","keydown","update:value"],setup(a,{expose:e,emit:k}){const t=a,T=k,p=R("header"),i=N(t.value===null?"":String(t.value)),j=D(()=>t.invalid&&i.value==="");L(()=>t.value,l=>{i.value=l===null?"":String(l)});const w=l=>{i.value=String(l),T("update:value",l)};return e({focus:()=>p.value?.focus(),blur:()=>p.value?.blur()}),(l,o)=>(s(),h("div",I({class:{"ui-v1-page-header":!0,"ui-v1-page-header_disabled":a.disabled,"ui-v1-page-header_invalid":j.value,"ui-v1-page-header_readonly":a.readonly}},l.$attrs),[l.$slots.actions?(s(),h("div",Y,[g(l.$slots,"actions")])):f("",!0),b("div",Z,[b("div",ee,[x(d(X),null,{default:v(()=>[x(d(W),{tag:"div",class:"ui-v1-page-header__title"},{default:v(()=>[x(d(J),{id:a.id,ref_key:"header",ref:p,value:i.value,placeholder:a.placeholder,error:a.error,invalid:a.invalid,editable:a.editable,autofocus:a.autofocus,autoselect:a.autoselect,readonly:a.readonly,disabled:a.disabled,onBlur:o[0]||(o[0]=r=>l.$emit("blur",r)),onChange:o[1]||(o[1]=r=>l.$emit("change",r)),onFocus:o[2]||(o[2]=r=>l.$emit("focus",r)),onKeydown:o[3]||(o[3]=r=>l.$emit("keydown",r)),"onUpdate:value":w},null,8,["id","value","placeholder","error","invalid","editable","autofocus","autoselect","readonly","disabled"])]),_:1}),j.value&&a.error?(s(),M(d(K),{key:0,"target-triggers":{hide:[""]},"offset-main-axis":8,visible:"",placement:"right"},{default:v(()=>[A(F(a.error),1)]),_:1})):f("",!0)]),_:1}),l.$slots.addon?(s(),h("div",ne,[g(l.$slots,"addon")])):f("",!0)])])],16))}});m.__docgenInfo=Object.assign({displayName:m.name??m.__name},{exportName:"default",displayName:"UiPageHeader",description:"",tags:{},expose:[{name:"focus"},{name:"blur"}],props:[{name:"id",description:"Уникальный идентификатор корневого элемента",type:{name:"UiPageHeaderProperties['id']"},defaultValue:{func:!1,value:"undefined"}},{name:"value",description:"Текст заголовка",type:{name:"UiPageHeaderProperties['value']"},defaultValue:{func:!1,value:"''"}},{name:"placeholder",description:"Плейсхолдер, отображаемый при отсутствии текста",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"error",description:"Текст ошибки для tooltip при пустом невалидном заголовке",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"editable",description:"Разрешает перейти в режим редактирования по клику",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"autofocus",description:"Автоматически переводит фокус во встроенный UiTextbox при входе в режим редактирования",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"autoselect",description:"Автоматически выделяет текст заголовка при фокусе на встроенном поле",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"readonly",description:"Делает встроенное поле только для чтения",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",description:"Полностью отключает заголовок",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"invalid",description:"Помечает встроенное поле как невалидное",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"blur",type:{names:["Event"]}},{name:"change",type:{names:["Event"]}},{name:"focus",type:{names:["FocusEvent"]}},{name:"keydown",type:{names:["KeyboardEvent"]}},{name:"update:value",type:{names:["union"],elements:[{name:"string"},{name:"number"}]}}],slots:[{name:"actions"},{name:"addon"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/page-header/UiPageHeader.vue"]});function ae(a){return new Worker(""+new URL("UiPageHeader.remote-CoMvQih2.js",import.meta.url).href,{name:a?.name})}function U(a){const e={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...P(),...a.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{id:"uipageheader",children:"UiPageHeader"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"UiPageHeader"}),` - заголовок страницы с опциональной inline-зоной рядом с title и зоной действий справа.
В обычном состоянии заголовок рендерится как `,n.jsx(e.code,{children:"h1"}),", а в режиме редактирования переключается на ",n.jsx(e.code,{children:"UiTextbox"}),`.
В remote-режиме компонент может показывать tooltip ошибки для пустого невалидного значения.`]}),`
`,n.jsx(e.h2,{id:"когда-использовать",children:"Когда использовать"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Нужен основной заголовок страницы расширения."}),`
`,n.jsx(e.li,{children:"Нужно дать пользователю возможность редактировать заголовок по клику."}),`
`,n.jsxs(e.li,{children:["Нужно показать рядом с заголовком дополнительный inline-элемент, например ссылку ",n.jsx(e.code,{children:"Свернуть фильтр"}),"."]}),`
`,n.jsx(e.li,{children:"Нужна компактная зона действий справа от заголовка."}),`
`,n.jsx(e.li,{children:"Нужно показать ошибку в tooltip, если заголовок обязателен и остаётся пустым."}),`
`]}),`
`,n.jsx(e.h2,{id:"поведение",children:"Поведение"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Если включён ",n.jsx(e.code,{children:"editable"}),", заголовок в display-state рендерится как ",n.jsx(e.code,{children:"h1"})," и переходит в режим редактирования по клику."]}),`
`,n.jsxs(e.li,{children:["В режиме редактирования используется ",n.jsx(e.code,{children:"UiTextbox"}),"."]}),`
`,n.jsxs(e.li,{children:["Нажатие ",n.jsx(e.code,{children:"Enter"})," завершает редактирование и сохраняет введённое значение."]}),`
`,n.jsxs(e.li,{children:["Если ",n.jsx(e.code,{children:"invalid=true"}),", заголовок пустой и передан ",n.jsx(e.code,{children:"error"}),", в remote-режиме показывается tooltip ошибки и компонент остаётся в режиме редактирования."]}),`
`,n.jsxs(e.li,{children:["В editable display-state заголовок рисует underline, визуально согласованный с underline-режимом ",n.jsx(e.code,{children:"UiTextbox"}),"."]}),`
`,n.jsxs(e.li,{children:["Слот ",n.jsx(e.code,{children:"addon"})," рендерится рядом с заголовком, но вне tooltip-target, поэтому tooltip продолжает якориться именно к title."]}),`
`]}),`
`,n.jsx(e.h2,{id:"пример",children:"Пример"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-html",children:`<template>
    <UiPageHeader
        v-model:value="title"
        :error="title ? '' : 'Заголовок обязателен'"
        :invalid="!title"
        editable
        placeholder="Введите заголовок"
    >
        <template #addon>
            <UiLink>
                Свернуть фильтр
            </UiLink>
        </template>

        <template #actions>
            <UiButton appearance="tertiary">
                Действия
                <IconCaretDown aria-hidden="true" />
            </UiButton>
        </template>
    </UiPageHeader>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import IconCaretDown from '@retailcrm/embed-ui-v1-components/assets/sprites/arrows/caret-down.svg'
import {
  UiButton,
  UiLink,
  UiPageHeader,
} from '@retailcrm/embed-ui-v1-components/remote'

const title = ref('Возвраты')
<\/script>
`})}),`
`,n.jsx(e.h2,{id:"важные-свойства",children:"Важные свойства"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"id"})," - идентификатор корневого элемента."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"value"})," - текст заголовка."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"placeholder"})," - плейсхолдер для пустого заголовка."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"error"})," - текст ошибки для tooltip в remote-режиме."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"editable"})," - разрешает перейти в режим редактирования по клику."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"autofocus"})," - переводит фокус во встроенный ",n.jsx(e.code,{children:"UiTextbox"})," при входе в режим редактирования."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"autoselect"})," - выделяет текст заголовка при фокусе на встроенном поле."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"readonly"})," - делает заголовок только для чтения."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"disabled"})," - полностью отключает компонент."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"invalid"})," - включает невалидное состояние встроенного ",n.jsx(e.code,{children:"UiTextbox"}),"."]}),`
`]}),`
`,n.jsx(e.h2,{id:"события",children:"События"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"update:value"})," - изменение текста заголовка."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"focus"}),", ",n.jsx(e.code,{children:"blur"}),", ",n.jsx(e.code,{children:"change"}),", ",n.jsx(e.code,{children:"keydown"})," - проксируются из встроенного ",n.jsx(e.code,{children:"UiTextbox"}),"."]}),`
`]}),`
`,n.jsx(e.h2,{id:"слоты",children:"Слоты"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"addon"})," - дополнительный inline-контент рядом с заголовком, например ",n.jsx(e.code,{children:"UiLink"})," со ссылкой ",n.jsx(e.code,{children:"Свернуть фильтр"}),"."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"actions"})," - действия справа от заголовка, например ",n.jsx(e.code,{children:"UiButton"}),", ",n.jsx(e.code,{children:"UiToolbarButton"})," или ",n.jsx(e.code,{children:"UiToolbarLink"}),"."]}),`
`]}),`
`,n.jsx(e.h2,{id:"api",children:"API"}),`
`,n.jsx(z,{})]})}function le(a={}){const{wrapper:e}={...P(),...a.components};return e?n.jsx(e,{...a,children:n.jsx(U,{...a})}):U(a)}const oe=B({UiButton:H,UiLink:$,UiPageHeaderTitle:C,UiPopperConnector:V,UiPopperTarget:_,UiTooltip:S}),Be={title:"Components/UiPageHeader",component:m,argTypes:{id:{control:"text"},value:{control:"text"},placeholder:{control:"text"},error:{control:"text"},editable:{control:"boolean"},autofocus:{control:"boolean"},autoselect:{control:"boolean"},readonly:{control:"boolean"},disabled:{control:"boolean"},invalid:{control:"boolean"}},render:q({provider:oe,worker:ae}),parameters:{docs:{page:le},layout:"padded"}},c={args:{value:"Новая рассылка",placeholder:"Введите заголовок",error:"",editable:!0,autofocus:!1,autoselect:!0,readonly:!1,disabled:!1,invalid:!1}},u={args:{value:"",placeholder:"Введите заголовок",error:"Заголовок обязателен",editable:!0,invalid:!0}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    value: 'Новая рассылка',
    placeholder: 'Введите заголовок',
    error: '',
    editable: true,
    autofocus: false,
    autoselect: true,
    readonly: false,
    disabled: false,
    invalid: false
  }
}`,...c.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    value: '',
    placeholder: 'Введите заголовок',
    error: 'Заголовок обязателен',
    editable: true,
    invalid: true
  }
}`,...u.parameters?.docs?.source}}};const He=["Sandbox","Invalid"];export{u as Invalid,c as Sandbox,He as __namedExportsOrder,Be as default};
