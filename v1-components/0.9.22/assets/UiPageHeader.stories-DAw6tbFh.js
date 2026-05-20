import{h as B,r as H,O as V,c as h,m as g,y as f,a as b,k as x,w as v,v as d,u as S,a2 as C,q as E,o as s,s as N,D as $,E as D}from"./iframe-RgRs0x2k.js";import{U as I,a as L}from"./popper-mOtO3wcz.js";import{U as R}from"./tooltip-qkFIjC4q.js";import{d as M,a as y,c as A}from"./createRemoteStoryRender-DL5kI9it.js";import{u as k,j as n}from"./index-CfKMJr0v.js";import{A as F}from"./blocks-DVaKcPBX.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BLDdbA9c.js";import"./UiAlert-DLdlevsq.js";import"./UiTransition-C2LSV-II.js";import"./checkmark-circle-outlined-DecXdccj.js";import"./clear-B3f3FFw-.js";import"./info-outlined-CdMlV-gA.js";import"./UiAddButton-De8Z7Da-.js";import"./UiAvatar-BMyGrwTh.js";import"./UiImage-D3WB7r_U.js";import"./predicate-ClulhfEu.js";import"./UiAvatarList-Ijx49ATV.js";import"./UiButton-Zb47_In4.js";import"./render-DL1-L7mu.js";import"./composables-Ddz9kiXo.js";import"./UiCalendar-B2zGOfhi.js";import"./chevron-right-DrMaPBZ5.js";import"./plugin-MmOktPhr.js";import"./index-BAxMPZdI.js";import"./UiCheckbox-DZnNgeE6.js";import"./done-B6KvcoRb.js";import"./utils-BqzVSXwn.js";import"./UiCollapse-BUZCoWP5.js";import"./UiCollapseGroup-StUvu04D.js";import"./UiCopyButton-B73t6twj.js";import"./UiTooltip-Bkwl6OdS.js";import"./UiPopper-BlHerxAZ.js";import"./UiDate-D3CxLRuA.js";import"./ru-Chw6HHdR.js";import"./UiDatePicker-DUl_W40K.js";import"./UiTextbox-Bpw8pJ4I.js";import"./UiMenuItem-Cwv2CJBr.js";import"./UiScrollBox-CfJEz1M6.js";import"./UiError-Bmz2ynlr.js";import"./UiInfobox-oDs3CIbU.js";import"./UiLink-C9wZYetD.js";import"./UiYandexMap-Crx28Nq-.js";import"./add-22LXk-BI.js";import"./caret-down-D5vuWUQw.js";import"./UiPopperTarget-B8R4-cSs.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./UiModalSidebar-CB9h2ja2.js";import"./uid-DJ7eckeb.js";import"./UiModalWindow-D7nb4-F-.js";import"./UiRadio--n6GzKSj.js";import"./UiSkeleton-BHmnsT1M.js";import"./UiSlider-GuMtUIC7.js";import"./UiSwitch-C8Nim_Jr.js";import"./UiTag-BVfGMDJt.js";import"./UiTimePicker-uiryc16h.js";import"./UiToggleButton-C07nZil7.js";import"./UiToolbarButton-CMVAQ3Ti.js";import"./UiToolbarLink-DRQVmViF.js";import"./index-f1RKRhP_.js";const O=["blur","change","focus","keydown","update:value"],W="UiPageHeaderTitle",X=M(W,{emits:O,methods:{focus:y(),blur:y()}}),K={key:0,class:"ui-v1-page-header__actions"},q={class:"ui-v1-page-header__main"},Y={class:"ui-v1-page-header__body"},z={key:0,class:"ui-v1-page-header__addon"},m=B({inheritAttrs:!1,__name:"UiPageHeader",props:{id:{type:null,default:void 0},value:{type:null,default:""},placeholder:{type:String,default:""},error:{type:String,default:""},editable:{type:Boolean,default:!1},autofocus:{type:Boolean,default:!1},autoselect:{type:Boolean,default:!0},readonly:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},invalid:{type:Boolean,default:!1}},emits:["blur","change","focus","keydown","update:value"],setup(a,{expose:e,emit:P}){const i=a,w=P,p=C("header"),l=H(i.value===null?"":String(i.value)),j=E(()=>i.invalid&&l.value==="");V(()=>i.value,o=>{l.value=o===null?"":String(o)});const T=o=>{l.value=String(o),w("update:value",o)};return e({focus:()=>p.value?.focus(),blur:()=>p.value?.blur()}),(o,t)=>(s(),h("div",S({class:{"ui-v1-page-header":!0,"ui-v1-page-header_disabled":a.disabled,"ui-v1-page-header_invalid":j.value,"ui-v1-page-header_readonly":a.readonly}},o.$attrs),[o.$slots.actions?(s(),h("div",K,[g(o.$slots,"actions")])):f("",!0),b("div",q,[b("div",Y,[x(d(L),null,{default:v(()=>[x(d(I),{tag:"div",class:"ui-v1-page-header__title"},{default:v(()=>[x(d(X),{id:a.id,ref_key:"header",ref:p,value:l.value,placeholder:a.placeholder,error:a.error,invalid:a.invalid,editable:a.editable,autofocus:a.autofocus,autoselect:a.autoselect,readonly:a.readonly,disabled:a.disabled,onBlur:t[0]||(t[0]=r=>o.$emit("blur",r)),onChange:t[1]||(t[1]=r=>o.$emit("change",r)),onFocus:t[2]||(t[2]=r=>o.$emit("focus",r)),onKeydown:t[3]||(t[3]=r=>o.$emit("keydown",r)),"onUpdate:value":T},null,8,["id","value","placeholder","error","invalid","editable","autofocus","autoselect","readonly","disabled"])]),_:1}),j.value&&a.error?(s(),N(d(R),{key:0,"target-triggers":{hide:[""]},"offset-main-axis":8,visible:"",placement:"right"},{default:v(()=>[$(D(a.error),1)]),_:1})):f("",!0)]),_:1}),o.$slots.addon?(s(),h("div",z,[g(o.$slots,"addon")])):f("",!0)])])],16))}});m.__docgenInfo=Object.assign({displayName:m.name??m.__name},{exportName:"default",displayName:"UiPageHeader",description:"",tags:{},expose:[{name:"focus"},{name:"blur"}],props:[{name:"id",description:"Уникальный идентификатор корневого элемента",type:{name:"UiPageHeaderProperties['id']"},defaultValue:{func:!1,value:"undefined"}},{name:"value",description:"Текст заголовка",type:{name:"UiPageHeaderProperties['value']"},defaultValue:{func:!1,value:"''"}},{name:"placeholder",description:"Плейсхолдер, отображаемый при отсутствии текста",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"error",description:"Текст ошибки для tooltip при пустом невалидном заголовке",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"editable",description:"Разрешает перейти в режим редактирования по клику",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"autofocus",description:"Автоматически переводит фокус во встроенный UiTextbox при входе в режим редактирования",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"autoselect",description:"Автоматически выделяет текст заголовка при фокусе на встроенном поле",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"readonly",description:"Делает встроенное поле только для чтения",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",description:"Полностью отключает заголовок",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"invalid",description:"Помечает встроенное поле как невалидное",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"blur",type:{names:["Event"]}},{name:"change",type:{names:["Event"]}},{name:"focus",type:{names:["FocusEvent"]}},{name:"keydown",type:{names:["KeyboardEvent"]}},{name:"update:value",type:{names:["union"],elements:[{name:"string"},{name:"number"}]}}],slots:[{name:"actions"},{name:"addon"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/page-header/UiPageHeader.vue"]});function G(a){return new Worker(""+new URL("UiPageHeader.remote-HNwYP633.js",import.meta.url).href,{name:a?.name})}function U(a){const e={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...k(),...a.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{id:"uipageheader",children:"UiPageHeader"}),`
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
`,n.jsx(F,{})]})}function J(a={}){const{wrapper:e}={...k(),...a.components};return e?n.jsx(e,{...a,children:n.jsx(U,{...a})}):U(a)}const on={title:"Components/UiPageHeader",component:m,argTypes:{id:{control:"text"},value:{control:"text"},placeholder:{control:"text"},error:{control:"text"},editable:{control:"boolean"},autofocus:{control:"boolean"},autoselect:{control:"boolean"},readonly:{control:"boolean"},disabled:{control:"boolean"},invalid:{control:"boolean"}},render:A({worker:G}),parameters:{docs:{page:J},layout:"padded"}},c={args:{value:"Новая рассылка",placeholder:"Введите заголовок",error:"",editable:!0,autofocus:!1,autoselect:!0,readonly:!1,disabled:!1,invalid:!1}},u={args:{value:"",placeholder:"Введите заголовок",error:"Заголовок обязателен",editable:!0,invalid:!0}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...u.parameters?.docs?.source}}};const tn=["Sandbox","Invalid"];export{u as Invalid,c as Sandbox,tn as __namedExportsOrder,on as default};
