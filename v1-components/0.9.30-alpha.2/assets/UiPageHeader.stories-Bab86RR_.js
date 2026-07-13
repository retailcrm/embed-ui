import{h as B,r as H,S,c as h,m as g,y as f,a as b,k as x,w as v,v as d,u as V,a2 as C,q as E,o as s,s as $,D as N,E as R}from"./iframe-Bvyt7JKv.js";import{U as D,a as I}from"./popper-BkRHUiSR.js";import{U as L}from"./tooltip-X5rSg25a.js";import{d as M,a as y,c as A}from"./createRemoteStoryRender-CBrVRiR3.js";import{u as k,j as n}from"./index-B1k1YGnU.js";import{A as F}from"./blocks-XSPc0yka.js";import"./preload-helper-PPVm8Dsz.js";import"./index-D3T7g4sS.js";import"./UiAlert-DwbsShZ5.js";import"./UiTransition-BSnl1Rcn.js";import"./checkmark-circle-outlined-CP7gQOyR.js";import"./clear-BDoy7W5T.js";import"./info-outlined-BLk2x4Vv.js";import"./UiAddButton-FdCgOSDN.js";import"./UiAvatar-5TflmDka.js";import"./UiImage-Db8d-9mc.js";import"./predicate-ClulhfEu.js";import"./UiAvatarList-CAZq81X0.js";import"./UiButton-CXdqUSTm.js";import"./render-WAisuxbD.js";import"./composables-DX4ltSqz.js";import"./UiCalendar-2KWss_5Q.js";import"./chevron-right-BpgwvJj9.js";import"./plugin-BJBmQX19.js";import"./index-BAxMPZdI.js";import"./UiCheckbox-DZaADlfc.js";import"./done-A4DTjxvU.js";import"./utils-BqzVSXwn.js";import"./UiCollapse-Qf-9jDH8.js";import"./UiCollapseGroup-BJGDAiYi.js";import"./UiCopyButton-CspqRv6d.js";import"./UiTooltip-DRPI-axN.js";import"./UiPopper-CtoUuQOJ.js";import"./UiDate-Bhp9ksFo.js";import"./ru-Chw6HHdR.js";import"./UiDatePicker-CTcSywzY.js";import"./UiTextbox-DEjM9VaK.js";import"./UiMenuItem-Bpn4pMI2.js";import"./UiScrollBox-7PrkfuK1.js";import"./UiError-D1VT81B7.js";import"./UiInfobox-PdeFGXlI.js";import"./UiLink-BfbmcAlj.js";import"./UiYandexMap-C9SBENmB.js";import"./add-Cn4MQ8ys.js";import"./caret-down-Bd8huWW_.js";import"./UiPopperTarget-BzHFoBjK.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./delete-outlined-8OCeG5t2.js";import"./uid-FlqXPSME.js";import"./UiModalWindow-BovrKXR3.js";import"./UiRadio-J_hAB1S5.js";import"./UiSkeleton-frCgFHL7.js";import"./UiSlider-mOK1ehMt.js";import"./UiSwitch-CcRAZThM.js";import"./UiTag-B5_Jd_Ng.js";import"./UiTimePicker-BFg66JeM.js";import"./UiToggleButton-DgRcNfqe.js";import"./UiToolbarButton-C4O-sy_S.js";import"./UiToolbarLink-CXgnFeyd.js";import"./index-CFQ6hCLl.js";const W=["blur","change","focus","keydown","update:value"],X="UiPageHeaderTitle",K=M(X,{emits:W,methods:{focus:y(),blur:y()}}),O={key:0,class:"ui-v1-page-header__actions"},q={class:"ui-v1-page-header__main"},G={class:"ui-v1-page-header__body"},z={key:0,class:"ui-v1-page-header__addon"},m=B({inheritAttrs:!1,__name:"UiPageHeader",props:{id:{type:null,default:void 0},value:{type:null,default:""},placeholder:{type:String,default:""},error:{type:String,default:""},editable:{type:Boolean,default:!1},autofocus:{type:Boolean,default:!1},autoselect:{type:Boolean,default:!0},readonly:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},invalid:{type:Boolean,default:!1}},emits:["blur","change","focus","keydown","update:value"],setup(a,{expose:e,emit:P}){const i=a,T=P,p=C("header"),l=H(i.value===null?"":String(i.value)),j=E(()=>i.invalid&&l.value==="");S(()=>i.value,o=>{l.value=o===null?"":String(o)});const w=o=>{l.value=String(o),T("update:value",o)};return e({focus:()=>p.value?.focus(),blur:()=>p.value?.blur()}),(o,t)=>(s(),h("div",V({class:{"ui-v1-page-header":!0,"ui-v1-page-header_disabled":a.disabled,"ui-v1-page-header_invalid":j.value,"ui-v1-page-header_readonly":a.readonly}},o.$attrs),[o.$slots.actions?(s(),h("div",O,[g(o.$slots,"actions")])):f("",!0),b("div",q,[b("div",G,[x(d(I),null,{default:v(()=>[x(d(D),{tag:"div",class:"ui-v1-page-header__title"},{default:v(()=>[x(d(K),{id:a.id,ref_key:"header",ref:p,value:l.value,placeholder:a.placeholder,error:a.error,invalid:a.invalid,editable:a.editable,autofocus:a.autofocus,autoselect:a.autoselect,readonly:a.readonly,disabled:a.disabled,onBlur:t[0]||(t[0]=r=>o.$emit("blur",r)),onChange:t[1]||(t[1]=r=>o.$emit("change",r)),onFocus:t[2]||(t[2]=r=>o.$emit("focus",r)),onKeydown:t[3]||(t[3]=r=>o.$emit("keydown",r)),"onUpdate:value":w},null,8,["id","value","placeholder","error","invalid","editable","autofocus","autoselect","readonly","disabled"])]),_:1}),j.value&&a.error?(s(),$(d(L),{key:0,"target-triggers":{hide:[""]},"offset-main-axis":8,visible:"",placement:"right"},{default:v(()=>[N(R(a.error),1)]),_:1})):f("",!0)]),_:1}),o.$slots.addon?(s(),h("div",z,[g(o.$slots,"addon")])):f("",!0)])])],16))}});m.__docgenInfo=Object.assign({displayName:m.name??m.__name},{exportName:"default",displayName:"UiPageHeader",description:"",tags:{},expose:[{name:"focus"},{name:"blur"}],props:[{name:"id",description:"Уникальный идентификатор корневого элемента",type:{name:"UiPageHeaderProperties['id']"},defaultValue:{func:!1,value:"undefined"}},{name:"value",description:"Текст заголовка",type:{name:"UiPageHeaderProperties['value']"},defaultValue:{func:!1,value:"''"}},{name:"placeholder",description:"Плейсхолдер, отображаемый при отсутствии текста",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"error",description:"Текст ошибки для tooltip при пустом невалидном заголовке",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"editable",description:"Разрешает перейти в режим редактирования по клику",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"autofocus",description:"Автоматически переводит фокус во встроенный UiTextbox при входе в режим редактирования",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"autoselect",description:"Автоматически выделяет текст заголовка при фокусе на встроенном поле",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"readonly",description:"Делает встроенное поле только для чтения",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",description:"Полностью отключает заголовок",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"invalid",description:"Помечает встроенное поле как невалидное",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"blur",type:{names:["Event"]}},{name:"change",type:{names:["Event"]}},{name:"focus",type:{names:["FocusEvent"]}},{name:"keydown",type:{names:["KeyboardEvent"]}},{name:"update:value",type:{names:["union"],elements:[{name:"string"},{name:"number"}]}}],slots:[{name:"actions"},{name:"addon"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/page-header/UiPageHeader.vue"]});function J(a){return new Worker(""+new URL("UiPageHeader.remote-BauRvyvG.js",import.meta.url).href,{name:a?.name})}function U(a){const e={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...k(),...a.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{id:"uipageheader",children:"UiPageHeader"}),`
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
`,n.jsx(F,{})]})}function Q(a={}){const{wrapper:e}={...k(),...a.components};return e?n.jsx(e,{...a,children:n.jsx(U,{...a})}):U(a)}const on={title:"Components/UiPageHeader",component:m,argTypes:{id:{control:"text"},value:{control:"text"},placeholder:{control:"text"},error:{control:"text"},editable:{control:"boolean"},autofocus:{control:"boolean"},autoselect:{control:"boolean"},readonly:{control:"boolean"},disabled:{control:"boolean"},invalid:{control:"boolean"}},render:A({worker:J}),parameters:{docs:{page:Q},layout:"padded"}},c={args:{value:"Новая рассылка",placeholder:"Введите заголовок",error:"",editable:!0,autofocus:!1,autoselect:!0,readonly:!1,disabled:!1,invalid:!1}},u={args:{value:"",placeholder:"Введите заголовок",error:"Заголовок обязателен",editable:!0,invalid:!0}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
