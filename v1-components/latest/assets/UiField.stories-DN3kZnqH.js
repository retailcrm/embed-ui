/* empty css              */import{o as n,c as l,a as v,h as L,m as t,y as r,k as d,w as x,v as o,u as w,D as g,E as y}from"./iframe-DY4K7XWY.js";import{U as S,a as U}from"./popper-BLtLMJ6M.js";import{U as q}from"./tooltip-BkGDT8SN.js";import{c as F}from"./createRemoteStoryRender-vcz3ZtTa.js";import{u as A,j as i}from"./index-BdfGHWDn.js";import{A as k}from"./blocks-Dc2O4FUd.js";import"./preload-helper-PPVm8Dsz.js";import"./index-R4IaJWqF.js";import"./UiAlert-H8wpnLuv.js";import"./UiTransition-5mWoFKFQ.js";import"./checkmark-circle-outlined-DHKspKTG.js";import"./clear-CrJWe51s.js";import"./info-outlined-BzSWDKub.js";import"./UiAddButton-CrjASCrP.js";import"./UiAvatar-DKuQN-J9.js";import"./UiImage-DUWKamEd.js";import"./predicate-ClulhfEu.js";import"./UiAvatarList-BepDZEKe.js";import"./UiButton-Dvbwg8KO.js";import"./render-BwUR_q3l.js";import"./composables-DGrAg25c.js";import"./UiCalendar-H4c3gJFN.js";import"./chevron-right-5SxNJJe8.js";import"./plugin-C6IskfCz.js";import"./index-BAxMPZdI.js";import"./UiCheckbox-DeM00XIq.js";import"./done-B-JM-y1C.js";import"./utils-BqzVSXwn.js";import"./UiCollapse-COpKkQDX.js";import"./UiCollapseGroup-DXE3bNvn.js";import"./UiCopyButton-C946gWPK.js";import"./UiTooltip-C0rD1Xba.js";import"./UiPopper-M9jY8qgt.js";import"./UiDate-D_J__8KB.js";import"./ru-Chw6HHdR.js";import"./UiDatePicker-Bc9uvpNs.js";import"./UiTextbox-C5yXpQyb.js";import"./UiMenuItem-Dno70m2K.js";import"./UiScrollBox-BAqp6TRw.js";import"./UiError-vu5ZVO6q.js";import"./UiInfobox-Dtkbss3d.js";import"./UiLink-DyZaiVr0.js";import"./UiYandexMap-D0vEUF-p.js";import"./add-BWzgWxYw.js";import"./caret-down-qPhwjeQj.js";import"./UiPopperTarget-CTx9bJ93.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./delete-outlined-DBUmDV-N.js";import"./uid-BpfK_WZO.js";import"./UiModalWindow-D8Tg-AWH.js";import"./UiRadio-CXse51Me.js";import"./UiSkeleton-UPjvTXRy.js";import"./UiSlider-DgmaY1wC.js";import"./UiSwitch-CKS5yG99.js";import"./UiTag-DGYtfD83.js";import"./UiTimePicker-6eWG0U4v.js";import"./UiToggleButton-Cvbfm3Pf.js";import"./UiToolbarButton-rVvkM5aD.js";import"./UiToolbarLink-CD5fHOn4.js";import"./index-hd-7DJaU.js";const T={xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 24 24"};function I(a,e){return n(),l("svg",T,[...e[0]||(e[0]=[v("path",{"fill-rule":"evenodd",d:"M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10A10 10 0 0 0 12 2m1 15.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5zm.88-5.21a2.89 2.89 0 0 0 2-2.73V9A2.88 2.88 0 0 0 13 6.12h-2A2.88 2.88 0 0 0 8.12 9v.5a.5.5 0 0 0 .5.5h.76a.5.5 0 0 0 .5-.5V9c0-.619.501-1.12 1.12-1.12h2A1.12 1.12 0 0 1 14.16 9v.56a1.13 1.13 0 0 1-.76 1.07l-.95.31a1.88 1.88 0 0 0-1.29 1.78v.78a.5.5 0 0 0 .5.5h.76a.5.5 0 0 0 .5-.5v-.78c0-.053.032-.1.08-.12z","clip-rule":"evenodd"},null,-1)])])}const R={render:I},C={class:"ui-v1-field__headline"},N=["id","for"],V={key:0,class:"ui-v1-field__required-mark","aria-hidden":"true"},H={key:1,class:"ui-v1-field__hint"},$={key:2,class:"ui-v1-field__addon"},P={class:"ui-v1-field__control"},f=L({inheritAttrs:!1,__name:"UiField",props:{id:{type:String,required:!0},label:{type:String,default:""},hint:{type:String,default:""},hintAriaLabel:{type:String,default:"Hint"},invalid:{type:Boolean,default:!1},required:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1}},setup(a){return(e,D)=>(n(),l("div",w({class:{"ui-v1-field":!0,"ui-v1-field_invalid":a.invalid,"ui-v1-field_required":a.required,"ui-v1-field_disabled":a.disabled,"ui-v1-field_readonly":a.readonly}},e.$attrs),[v("div",C,[a.label||e.$slots.label?(n(),l("label",{key:0,id:`${a.id}-label`,for:a.id,class:"ui-v1-field__label"},[t(e.$slots,"label",{},()=>[g(y(a.label),1)]),a.required?(n(),l("span",V," * ")):r("",!0)],8,N)):r("",!0),a.hint||e.$slots.hint?(n(),l("span",H,[d(o(U),null,{default:x(()=>[d(o(S),{"aria-label":a.hintAriaLabel,tag:"span",class:"ui-v1-field__hint-trigger",role:"button",tabindex:"0"},{default:x(()=>[d(o(R),{"aria-hidden":"true",class:"ui-v1-field__hint-icon"})]),_:1},8,["aria-label"]),d(o(q),{class:"ui-v1-field__hint-tooltip","target-triggers":{show:["hover","focus"],hide:["hover","focus","click"]},"offset-main-axis":4,placement:"right-end"},{default:x(()=>[t(e.$slots,"hint",{},()=>[g(y(a.hint),1)])]),_:3})]),_:3})])):r("",!0),e.$slots.addon?(n(),l("div",$,[t(e.$slots,"addon")])):r("",!0)]),v("div",P,[t(e.$slots,"default",{id:a.id,required:a.required,disabled:a.disabled,readonly:a.readonly,invalid:a.invalid,ariaLabelledby:a.label||e.$slots.label?`${a.id}-label`:void 0,ariaInvalid:a.invalid?"true":void 0})])],16))}});f.__docgenInfo=Object.assign({displayName:f.name??f.__name},{exportName:"default",displayName:"UiField",description:"",tags:{},props:[{name:"id",description:"Id для связки label/control",type:{name:"string"},required:!0},{name:"label",description:"Текст заголовка поля",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"hint",description:"Контент tooltip-подсказки рядом с label",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"hintAriaLabel",description:"Подпись для иконки подсказки",type:{name:"string"},defaultValue:{func:!1,value:"'Hint'"}},{name:"invalid",description:"Некорректное значение поля",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"required",description:"Обязательность поля",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",description:"Недоступность поля",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"readonly",description:"Режим только чтения",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"label"},{name:"hint"},{name:"addon"},{name:"default",scoped:!0,bindings:[{name:"id",title:"binding"},{name:"required",title:"binding"},{name:"disabled",title:"binding"},{name:"readonly",title:"binding"},{name:"invalid",title:"binding"},{name:"ariaLabelledby",title:"binding"},{name:"ariaInvalid",title:"binding"}]}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/field/UiField.vue"]});function B(a){return new Worker(""+new URL("UiField.remote-CYc6TcoB.js",import.meta.url).href,{name:a?.name})}function j(a){const e={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...A(),...a.components};return i.jsxs(i.Fragment,{children:[i.jsx(e.h1,{id:"uifield",children:"UiField"}),`
`,i.jsxs(e.p,{children:[i.jsx(e.code,{children:"UiField"}),` - remote-only обертка для построения семантики поля формы.
Компонент связывает `,i.jsx(e.code,{children:"label"})," и вложенный контрол через id/ARIA атрибуты, а ",i.jsx(e.code,{children:"hint"})," показывает в tooltip рядом с label."]}),`
`,i.jsx(e.h2,{id:"когда-использовать",children:"Когда использовать"}),`
`,i.jsxs(e.ul,{children:[`
`,i.jsx(e.li,{children:"Нужно единообразно оформлять поля ввода в формах."}),`
`,i.jsxs(e.li,{children:["Нужно передавать в контрол связки ",i.jsx(e.code,{children:"aria-labelledby"}),"/",i.jsx(e.code,{children:"aria-invalid"}),"."]}),`
`,i.jsxs(e.li,{children:["Нужно выводить ",i.jsx(e.code,{children:"hint"})," как tooltip у названия поля."]}),`
`,i.jsxs(e.li,{children:["Нужно вывести справа от заголовка дополнительный контент (",i.jsx(e.code,{children:"addon"}),") без разметки вокруг контрола."]}),`
`,i.jsxs(e.li,{children:["Нужно вынести логику обязательности (",i.jsx(e.code,{children:"required"}),") и состояния ошибки (",i.jsx(e.code,{children:"invalid"}),") в общий контейнер."]}),`
`]}),`
`,i.jsx(e.h2,{id:"базовое-применение",children:"Базовое применение"}),`
`,i.jsx(e.pre,{children:i.jsx(e.code,{className:"language-html",children:`<template>
    <UiField id="name-field" label="Название" hint="Минимум 3 символа">
        <template #default="field">
            <UiTextbox
                :id="field.id"
                :input-attributes="{
                    'aria-labelledby': field.ariaLabelledby,
                    'aria-invalid': field.ariaInvalid,
                }"
            />
        </template>
    </UiField>
</template>

<script lang="ts" setup>
import {
  UiField,
  UiTextbox,
} from '@retailcrm/embed-ui-v1-components/remote'
<\/script>
`})}),`
`,i.jsx(e.h2,{id:"слоты",children:"Слоты"}),`
`,i.jsxs(e.ul,{children:[`
`,i.jsxs(e.li,{children:[i.jsx(e.code,{children:"default"})," - вложенный контрол (через slot-props получает ",i.jsx(e.code,{children:"id"})," и ARIA значения)."]}),`
`,i.jsxs(e.li,{children:[i.jsx(e.code,{children:"label"})," - кастомная разметка label."]}),`
`,i.jsxs(e.li,{children:[i.jsx(e.code,{children:"hint"})," - контент tooltip рядом с label."]}),`
`,i.jsxs(e.li,{children:[i.jsx(e.code,{children:"addon"})," - дополнительный контент справа от label."]}),`
`]}),`
`,i.jsx(e.h2,{id:"addon-рядом-с-label",children:"Addon рядом с label"}),`
`,i.jsx(e.pre,{children:i.jsx(e.code,{className:"language-html",children:`<template>
    <UiField id="name-field" label="Название">
        <template #addon>
            До 32 символов
        </template>

        <template #default="field">
            <UiTextbox
                :id="field.id"
                :input-attributes="{
                    'aria-labelledby': field.ariaLabelledby,
                    'aria-invalid': field.ariaInvalid,
                }"
            />
        </template>
    </UiField>
</template>
`})}),`
`,i.jsxs(e.h2,{id:"подсказка-hint-в-белом-tooltip",children:["Подсказка (",i.jsx(e.code,{children:"hint"}),") в белом tooltip"]}),`
`,i.jsxs(e.p,{children:["Tooltip у ",i.jsx(e.code,{children:"UiField"})," оформляется белым фоном в базовых стилях библиотеки и может быть переопределен через слоты/переменные при необходимости."]}),`
`,i.jsx(e.h2,{id:"api",children:"API"}),`
`,i.jsx(k,{})]})}function W(a={}){const{wrapper:e}={...A(),...a.components};return e?i.jsx(e,{...a,children:i.jsx(j,{...a})}):j(a)}const Ge={title:"Components/UiField",component:f,argTypes:{id:{control:"text"},label:{control:"text"},hint:{control:"text"},hintAriaLabel:{control:"text"},invalid:{control:"boolean"},required:{control:"boolean"},disabled:{control:"boolean"},readonly:{control:"boolean"},withAddon:{control:"boolean"},addonText:{control:"text"},customLabel:{control:"boolean"},customHint:{control:"boolean"},hideLabel:{control:"boolean"},textboxPlaceholder:{control:"text"},containerWidth:{control:"number"}},render:F({worker:B}),parameters:{docs:{page:W},layout:"centered"}},s={args:{id:"field-sandbox",label:"Field label",hint:"Hint tooltip text",hintAriaLabel:"Show hint",invalid:!1,required:!1,disabled:!1,readonly:!1,withAddon:!1,addonText:"Optional",customLabel:!1,customHint:!1,hideLabel:!1,textboxPlaceholder:"Type value",containerWidth:360}},c={args:{id:"field-invalid-required",label:"Email",hint:"Use a work email address",hintAriaLabel:"Show hint",invalid:!0,required:!0}},m={args:{id:"field-disabled",label:"Field label",hint:"Hint tooltip text",disabled:!0}},u={args:{id:"field-readonly",label:"API token",hint:"Readonly field with generated value",readonly:!0,textboxPlaceholder:"Readonly value"}},h={args:{id:"field-custom-slots",customLabel:!0,customHint:!0,required:!0}},p={args:{id:"field-addon",label:"Name",hint:"Your public name",withAddon:!0,addonText:"3-32 chars"}},b={args:{id:"field-no-label",hideLabel:!0,hint:"Label is hidden in this scenario",hintAriaLabel:"Show hint"}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'field-sandbox',
    label: 'Field label',
    hint: 'Hint tooltip text',
    hintAriaLabel: 'Show hint',
    invalid: false,
    required: false,
    disabled: false,
    readonly: false,
    withAddon: false,
    addonText: 'Optional',
    customLabel: false,
    customHint: false,
    hideLabel: false,
    textboxPlaceholder: 'Type value',
    containerWidth: 360
  }
}`,...s.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'field-invalid-required',
    label: 'Email',
    hint: 'Use a work email address',
    hintAriaLabel: 'Show hint',
    invalid: true,
    required: true
  }
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'field-disabled',
    label: 'Field label',
    hint: 'Hint tooltip text',
    disabled: true
  }
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'field-readonly',
    label: 'API token',
    hint: 'Readonly field with generated value',
    readonly: true,
    textboxPlaceholder: 'Readonly value'
  }
}`,...u.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'field-custom-slots',
    customLabel: true,
    customHint: true,
    required: true
  }
}`,...h.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'field-addon',
    label: 'Name',
    hint: 'Your public name',
    withAddon: true,
    addonText: '3-32 chars'
  }
}`,...p.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'field-no-label',
    hideLabel: true,
    hint: 'Label is hidden in this scenario',
    hintAriaLabel: 'Show hint'
  }
}`,...b.parameters?.docs?.source}}};const Je=["Sandbox","InvalidRequired","Disabled","Readonly","CustomSlots","WithAddon","NoLabel"];export{h as CustomSlots,m as Disabled,c as InvalidRequired,b as NoLabel,u as Readonly,s as Sandbox,p as WithAddon,Je as __namedExportsOrder,Ge as default};
