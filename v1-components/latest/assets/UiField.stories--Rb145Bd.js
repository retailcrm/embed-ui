/* empty css              */import{f as U}from"./host-D8R1Erud.js";import{_ as L}from"./UiPopperConnector-YHezqtrn.js";import{_ as w}from"./UiPopperTarget-DgR35jXu.js";import{_ as q}from"./UiTextbox-Cxr1_Ae9.js";import{_ as S}from"./UiTooltip-DY0g_PGK.js";import{o as a,c as l,a as x,h as T,q as t,y as d,m as r,w as p,x as o,t as F,C as v,D as g}from"./iframe-BHh6c9lZ.js";import{d as k,U as _,a as $,c as C}from"./createRemoteStoryRender-mUoIEesG.js";import{j as i}from"./jsx-runtime-BGuG-3rP.js";import{useMDXComponents as j}from"./index-Du9med4y.js";import{A as P}from"./blocks-CkPvKPWb.js";import"./composables-k7d08RWy.js";import"./UiPopper-DfGuVeqK.js";import"./plugin-CqJxYN_5.js";import"./index-BAxMPZdI.js";import"./preload-helper-PPVm8Dsz.js";import"./index-LVSkv26z.js";const R={xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 24 24"};function I(n,e){return a(),l("svg",R,[...e[0]||(e[0]=[x("path",{"fill-rule":"evenodd",d:"M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10A10 10 0 0 0 12 2m1 15.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5zm.88-5.21a2.89 2.89 0 0 0 2-2.73V9A2.88 2.88 0 0 0 13 6.12h-2A2.88 2.88 0 0 0 8.12 9v.5a.5.5 0 0 0 .5.5h.76a.5.5 0 0 0 .5-.5V9c0-.619.501-1.12 1.12-1.12h2A1.12 1.12 0 0 1 14.16 9v.56a1.13 1.13 0 0 1-.76 1.07l-.95.31a1.88 1.88 0 0 0-1.29 1.78v.78a.5.5 0 0 0 .5.5h.76a.5.5 0 0 0 .5-.5v-.78c0-.053.032-.1.08-.12z","clip-rule":"evenodd"},null,-1)])])}const V={render:I},H="UiTooltip",N=k(H),W={class:"ui-v1-field__headline"},B=["id","for"],D={key:0,class:"ui-v1-field__required-mark","aria-hidden":"true"},E={key:1,class:"ui-v1-field__hint"},M={key:2,class:"ui-v1-field__addon"},O={class:"ui-v1-field__control"},A=T({inheritAttrs:!1,__name:"UiField",props:{id:{type:String,required:!0},label:{type:String,default:""},hint:{type:String,default:""},hintAriaLabel:{type:String,default:"Hint"},invalid:{type:Boolean,default:!1},required:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1}},setup(n){return(e,G)=>(a(),l("div",F({class:{"ui-v1-field":!0,"ui-v1-field_invalid":n.invalid,"ui-v1-field_required":n.required,"ui-v1-field_disabled":n.disabled,"ui-v1-field_readonly":n.readonly}},e.$attrs),[x("div",W,[n.label||e.$slots.label?(a(),l("label",{key:0,id:`${n.id}-label`,for:n.id,class:"ui-v1-field__label"},[t(e.$slots,"label",{},()=>[v(g(n.label),1)]),n.required?(a(),l("span",D," * ")):d("",!0)],8,B)):d("",!0),n.hint||e.$slots.hint?(a(),l("span",E,[r(o($),null,{default:p(()=>[r(o(_),{"aria-label":n.hintAriaLabel,tag:"span",class:"ui-v1-field__hint-trigger",role:"button",tabindex:"0"},{default:p(()=>[r(o(V),{"aria-hidden":"true",class:"ui-v1-field__hint-icon"})]),_:1},8,["aria-label"]),r(o(N),{class:"ui-v1-field__hint-tooltip","target-triggers":{show:["hover","focus"],hide:["hover","focus","click"]},"offset-main-axis":4,placement:"right-end"},{default:p(()=>[t(e.$slots,"hint",{},()=>[v(g(n.hint),1)])]),_:3})]),_:3})])):d("",!0),e.$slots.addon?(a(),l("div",M,[t(e.$slots,"addon")])):d("",!0)]),x("div",O,[t(e.$slots,"default",{id:n.id,required:n.required,disabled:n.disabled,readonly:n.readonly,invalid:n.invalid,ariaLabelledby:n.label||e.$slots.label?`${n.id}-label`:void 0,ariaInvalid:n.invalid?"true":void 0})])],16))}});A.__docgenInfo={exportName:"default",displayName:"UiField",description:"",tags:{},props:[{name:"id",description:"Id для связки label/control",type:{name:"string"},required:!0},{name:"label",description:"Текст заголовка поля",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"hint",description:"Контент tooltip-подсказки рядом с label",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"hintAriaLabel",description:"Подпись для иконки подсказки",type:{name:"string"},defaultValue:{func:!1,value:"'Hint'"}},{name:"invalid",description:"Некорректное значение поля",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"required",description:"Обязательность поля",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",description:"Недоступность поля",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"readonly",description:"Режим только чтения",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"label"},{name:"hint"},{name:"addon"},{name:"default",scoped:!0,bindings:[{name:"id",title:"binding"},{name:"required",title:"binding"},{name:"disabled",title:"binding"},{name:"readonly",title:"binding"},{name:"invalid",title:"binding"},{name:"ariaLabelledby",title:"binding"},{name:"ariaInvalid",title:"binding"}]}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/field/UiField.vue"]};function X(n){return new Worker(""+new URL("UiField.remote-DWxuYUPU.js",import.meta.url).href,{name:n?.name})}function y(n){const e={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...j(),...n.components};return i.jsxs(i.Fragment,{children:[i.jsx(e.h1,{id:"uifield",children:"UiField"}),`
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
`,i.jsx(P,{})]})}function Y(n={}){const{wrapper:e}={...j(),...n.components};return e?i.jsx(e,{...n,children:i.jsx(y,{...n})}):y(n)}const z=U({UiPopperConnector:L,UiPopperTarget:w,UiTextbox:q,UiTooltip:S}),he={title:"Components/UiField",component:A,argTypes:{id:{control:"text"},label:{control:"text"},hint:{control:"text"},hintAriaLabel:{control:"text"},invalid:{control:"boolean"},required:{control:"boolean"},disabled:{control:"boolean"},readonly:{control:"boolean"},withAddon:{control:"boolean"},addonText:{control:"text"},customLabel:{control:"boolean"},customHint:{control:"boolean"},hideLabel:{control:"boolean"},textboxPlaceholder:{control:"text"},containerWidth:{control:"number"}},render:C({provider:z,worker:X}),parameters:{docs:{page:Y},layout:"centered"}},s={args:{id:"field-sandbox",label:"Field label",hint:"Hint tooltip text",hintAriaLabel:"Show hint",invalid:!1,required:!1,disabled:!1,readonly:!1,withAddon:!1,addonText:"Optional",customLabel:!1,customHint:!1,hideLabel:!1,textboxPlaceholder:"Type value",containerWidth:360}},c={args:{id:"field-invalid-required",label:"Email",hint:"Use a work email address",hintAriaLabel:"Show hint",invalid:!0,required:!0}},u={args:{id:"field-disabled",label:"Field label",hint:"Hint tooltip text",disabled:!0}},m={args:{id:"field-readonly",label:"API token",hint:"Readonly field with generated value",readonly:!0,textboxPlaceholder:"Readonly value"}},h={args:{id:"field-custom-slots",customLabel:!0,customHint:!0,required:!0}},b={args:{id:"field-addon",label:"Name",hint:"Your public name",withAddon:!0,addonText:"3-32 chars"}},f={args:{id:"field-no-label",hideLabel:!0,hint:"Label is hidden in this scenario",hintAriaLabel:"Show hint"}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'field-disabled',
    label: 'Field label',
    hint: 'Hint tooltip text',
    disabled: true
  }
}`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'field-readonly',
    label: 'API token',
    hint: 'Readonly field with generated value',
    readonly: true,
    textboxPlaceholder: 'Readonly value'
  }
}`,...m.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'field-custom-slots',
    customLabel: true,
    customHint: true,
    required: true
  }
}`,...h.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'field-addon',
    label: 'Name',
    hint: 'Your public name',
    withAddon: true,
    addonText: '3-32 chars'
  }
}`,...b.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'field-no-label',
    hideLabel: true,
    hint: 'Label is hidden in this scenario',
    hintAriaLabel: 'Show hint'
  }
}`,...f.parameters?.docs?.source}}};const be=["Sandbox","InvalidRequired","Disabled","Readonly","CustomSlots","WithAddon","NoLabel"];export{h as CustomSlots,u as Disabled,c as InvalidRequired,f as NoLabel,m as Readonly,s as Sandbox,b as WithAddon,be as __namedExportsOrder,he as default};
