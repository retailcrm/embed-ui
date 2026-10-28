import{j as T,r as w,U as H,c as h,q as g,z as f,a as b,m as x,w as v,x as d,v as V,a3 as C,s as S,o as s,t as I,E as $,G as A}from"./iframe-fI9CR6ES.js";import{U as D,a as N}from"./popper-3wtiRaka.js";import{U as L}from"./tooltip-CeMVecAr.js";import{d as R,a as y,c as F}from"./createRemoteStoryRender-DjRahFGy.js";import{u as k,j as n}from"./index-rN8r3ga4.js";import{A as M}from"./blocks-DLN41SMe.js";import"./preload-helper-PPVm8Dsz.js";import"./index-5_fmqlHb.js";import"./UiAlert-DUwhUupU.js";import"./UiTransition-Cdc59YlU.js";import"./checkmark-circle-outlined-CXsSXQHX.js";import"./clear-mtyWYUfM.js";import"./info-outlined-D8i7ulRK.js";import"./UiAddButton-CW4VHa6j.js";import"./UiAvatar-yYc5eV49.js";import"./UiImage-DOCK8enO.js";import"./predicate-ClulhfEu.js";import"./UiAvatarList-BkaHToRf.js";import"./UiButton-BkZ2SFxI.js";import"./render-WRyvH_6x.js";import"./composables-BFZcOyxw.js";import"./UiCalendar-CPKhkoYV.js";import"./chevron-right-EP5rfQ7R.js";import"./plugin-Dr8JHMsO.js";import"./index-BAxMPZdI.js";import"./UiCheckbox-DCO89OwK.js";import"./done-Cdqr1Y1v.js";import"./utils-BqzVSXwn.js";import"./UiCollapse-B_LD-nQN.js";import"./UiCollapseGroup-DtyTJvYt.js";import"./UiCopyButton-B7m8oXfR.js";import"./UiTooltip-Lfr_K7CO.js";import"./UiPopper-B5XrmDDO.js";import"./UiDate-K_TGFuao.js";import"./ru-Chw6HHdR.js";import"./UiDatePicker-SNlOPR-x.js";import"./UiTextbox-CLtKvIjo.js";import"./UiMenuItem-c4fOhnU2.js";import"./UiScrollBox-CLznJj1h.js";import"./UiError-BNwJgG2k.js";import"./UiInfobox-DlfJ-gFO.js";import"./UiLink-BxzRxQqq.js";import"./UiYandexMap-BWxhDDdl.js";import"./add-mXn_QeoK.js";import"./caret-down-DHwL7kKP.js";import"./UiPopperTarget-DmHJWOfD.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./delete-outlined-CTgau4Ak.js";import"./uid-C_OIlNlR.js";import"./UiModalWindow-Cb87blmx.js";import"./UiRadio-B6lYj291.js";import"./UiSkeleton-DZGQc56b.js";import"./UiSlider-B80SqvUl.js";import"./UiSwitch-CSY7pRHw.js";import"./UiTag-XzeOlAsL.js";import"./UiTimePicker-CAvi7hkq.js";import"./UiToggleButton-DtyN7VML.js";import"./UiToolbarButton-DrRxTKuU.js";import"./UiToolbarLink-CIpM31U4.js";import"./index-CXSHABaW.js";const X=["blur","change","focus","keydown","update:value"],K="UiPageHeaderTitle",W=R(K,{emits:X,methods:{focus:y(),blur:y()}}),O={key:0,class:"ui-v1-page-header__actions"},q={class:"ui-v1-page-header__main"},z={class:"ui-v1-page-header__body"},G={key:0,class:"ui-v1-page-header__addon"},m=T({inheritAttrs:!1,__name:"UiPageHeader",props:{id:{type:null,default:void 0},value:{type:null,default:""},placeholder:{type:String,default:""},error:{type:String,default:""},editable:{type:Boolean,default:!1},autofocus:{type:Boolean,default:!1},autoselect:{type:Boolean,default:!0},readonly:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},invalid:{type:Boolean,default:!1}},emits:["blur","change","focus","keydown","update:value"],setup(a,{expose:e,emit:B}){const i=a,P=B,p=C("header"),l=w(i.value===null?"":String(i.value)),j=S(()=>i.invalid&&l.value==="");H(()=>i.value,t=>{l.value=t===null?"":String(t)});const E=t=>{l.value=String(t),P("update:value",t)};return e({focus:()=>p.value?.focus(),blur:()=>p.value?.blur()}),(t,o)=>(s(),h("div",V({class:{"ui-v1-page-header":!0,"ui-v1-page-header_disabled":a.disabled,"ui-v1-page-header_invalid":j.value,"ui-v1-page-header_readonly":a.readonly}},t.$attrs),[t.$slots.actions?(s(),h("div",O,[g(t.$slots,"actions")])):f("",!0),b("div",q,[b("div",z,[x(d(N),null,{default:v(()=>[x(d(D),{tag:"div",class:"ui-v1-page-header__title"},{default:v(()=>[x(d(W),{id:a.id,ref_key:"header",ref:p,value:l.value,placeholder:a.placeholder,error:a.error,invalid:a.invalid,editable:a.editable,autofocus:a.autofocus,autoselect:a.autoselect,readonly:a.readonly,disabled:a.disabled,onBlur:o[0]||(o[0]=r=>t.$emit("blur",r)),onChange:o[1]||(o[1]=r=>t.$emit("change",r)),onFocus:o[2]||(o[2]=r=>t.$emit("focus",r)),onKeydown:o[3]||(o[3]=r=>t.$emit("keydown",r)),"onUpdate:value":E},null,8,["id","value","placeholder","error","invalid","editable","autofocus","autoselect","readonly","disabled"])]),_:1}),j.value&&a.error?(s(),I(d(L),{key:0,"target-triggers":{hide:[""]},"offset-main-axis":8,visible:"",placement:"right"},{default:v(()=>[$(A(a.error),1)]),_:1})):f("",!0)]),_:1}),t.$slots.addon?(s(),h("div",G,[g(t.$slots,"addon")])):f("",!0)])])],16))}});m.__docgenInfo=Object.assign({displayName:m.name??m.__name},{exportName:"default",displayName:"UiPageHeader",description:"",tags:{},expose:[{name:"focus"},{name:"blur"}],props:[{name:"id",description:"Уникальный идентификатор корневого элемента",type:{name:"UiPageHeaderProperties['id']"},defaultValue:{func:!1,value:"undefined"}},{name:"value",description:"Текст заголовка",type:{name:"UiPageHeaderProperties['value']"},defaultValue:{func:!1,value:"''"}},{name:"placeholder",description:"Плейсхолдер, отображаемый при отсутствии текста",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"error",description:"Текст ошибки для tooltip при пустом невалидном заголовке",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"editable",description:"Разрешает перейти в режим редактирования по клику",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"autofocus",description:"Автоматически переводит фокус во встроенный UiTextbox при входе в режим редактирования",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"autoselect",description:"Автоматически выделяет текст заголовка при фокусе на встроенном поле",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"readonly",description:"Делает встроенное поле только для чтения",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",description:"Полностью отключает заголовок",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"invalid",description:"Помечает встроенное поле как невалидное",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"blur",type:{names:["Event"]}},{name:"change",type:{names:["Event"]}},{name:"focus",type:{names:["FocusEvent"]}},{name:"keydown",type:{names:["KeyboardEvent"]}},{name:"update:value",type:{names:["union"],elements:[{name:"string"},{name:"number"}]}}],slots:[{name:"actions"},{name:"addon"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/page-header/UiPageHeader.vue"]});function J(a){return new Worker(""+new URL("UiPageHeader.remote-C3KII9Xv.js",import.meta.url).href,{name:a?.name})}function U(a){const e={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...k(),...a.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{id:"uipageheader",children:"UiPageHeader"}),`
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
`,n.jsx(M,{})]})}function Q(a={}){const{wrapper:e}={...k(),...a.components};return e?n.jsx(e,{...a,children:n.jsx(U,{...a})}):U(a)}const tn={title:"Components/UiPageHeader",component:m,argTypes:{id:{control:"text"},value:{control:"text"},placeholder:{control:"text"},error:{control:"text"},editable:{control:"boolean"},autofocus:{control:"boolean"},autoselect:{control:"boolean"},readonly:{control:"boolean"},disabled:{control:"boolean"},invalid:{control:"boolean"}},render:F({worker:J}),parameters:{docs:{page:Q},layout:"padded"}},u={args:{value:"Новая рассылка",placeholder:"Введите заголовок",error:"",editable:!0,autofocus:!1,autoselect:!0,readonly:!1,disabled:!1,invalid:!1}},c={args:{value:"",placeholder:"Введите заголовок",error:"Заголовок обязателен",editable:!0,invalid:!0}},on=["Sandbox","Invalid"];u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
}`,...u.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    value: '',
    placeholder: 'Введите заголовок',
    error: 'Заголовок обязателен',
    editable: true,
    invalid: true
  }
}`,...c.parameters?.docs?.source}}};export{c as Invalid,u as Sandbox,on as __namedExportsOrder,tn as default};
