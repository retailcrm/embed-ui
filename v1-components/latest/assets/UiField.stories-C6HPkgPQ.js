/* empty css              */import{f as y}from"./host-C85PVOqc.js";import{_ as Z}from"./UiPopperConnector-DeZmM5pn.js";import{_ as H}from"./UiPopperTarget-BS8utpOz.js";import{_ as B}from"./UiTextbox-CrS2ZayV.js";import{_ as W}from"./UiTooltip-Ba1emCEX.js";import{o as a,c as n,a as u,h as w,q as d,y as t,m as o,w as m,x as r,t as V,C as h,D as p}from"./iframe-B-kTCndX.js";import{d as G,U as R,a as J,c as U}from"./createRemoteStoryRender-bwmCI0m5.js";import{j as l}from"./jsx-runtime-4ZJMz8rO.js";import{useMDXComponents as x}from"./index-B4BHLWPH.js";import{A as L}from"./blocks-BFXVrAzm.js";import"./composables-mLYPVKrD.js";import"./UiPopper-B2Jzcw5B.js";import"./plugin-BX-gG-s-.js";import"./index-BAxMPZdI.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BU-GYzGj.js";const j={xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 24 24"};function Y(i,e){return a(),n("svg",j,[...e[0]||(e[0]=[u("path",{"fill-rule":"evenodd",d:"M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10A10 10 0 0 0 12 2m1 15.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5zm.88-5.21a2.89 2.89 0 0 0 2-2.73V9A2.88 2.88 0 0 0 13 6.12h-2A2.88 2.88 0 0 0 8.12 9v.5a.5.5 0 0 0 .5.5h.76a.5.5 0 0 0 .5-.5V9c0-.619.501-1.12 1.12-1.12h2A1.12 1.12 0 0 1 14.16 9v.56a1.13 1.13 0 0 1-.76 1.07l-.95.31a1.88 1.88 0 0 0-1.29 1.78v.78a.5.5 0 0 0 .5.5h.76a.5.5 0 0 0 .5-.5v-.78c0-.053.032-.1.08-.12z","clip-rule":"evenodd"},null,-1)])])}const k={render:Y},F="UiTooltip",S=G(F),X={class:"ui-v1-field__headline"},K=["id","for"],N={key:0,class:"ui-v1-field__required-mark","aria-hidden":"true"},z={key:1,class:"ui-v1-field__hint"},D={key:2,class:"ui-v1-field__addon"},Q={class:"ui-v1-field__control"},v=w({inheritAttrs:!1,__name:"UiField",props:{id:{type:String,required:!0},label:{type:String,default:""},hint:{type:String,default:""},hintAriaLabel:{type:String,default:"Hint"},invalid:{type:Boolean,default:!1},required:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1}},setup(i){return(e,q)=>(a(),n("div",V({class:{"ui-v1-field":!0,"ui-v1-field_invalid":i.invalid,"ui-v1-field_required":i.required,"ui-v1-field_disabled":i.disabled,"ui-v1-field_readonly":i.readonly}},e.$attrs),[u("div",X,[i.label||e.$slots.label?(a(),n("label",{key:0,id:`${i.id}-label`,for:i.id,class:"ui-v1-field__label"},[d(e.$slots,"label",{},()=>[h(p(i.label),1)]),i.required?(a(),n("span",N," * ")):t("",!0)],8,K)):t("",!0),i.hint||e.$slots.hint?(a(),n("span",z,[o(r(J),null,{default:m(()=>[o(r(R),{"aria-label":i.hintAriaLabel,tag:"span",class:"ui-v1-field__hint-trigger",role:"button",tabindex:"0"},{default:m(()=>[o(r(k),{"aria-hidden":"true",class:"ui-v1-field__hint-icon"})]),_:1},8,["aria-label"]),o(r(S),{class:"ui-v1-field__hint-tooltip","target-triggers":{show:["hover","focus"],hide:["hover","focus","click"]},"offset-main-axis":4,placement:"right-end"},{default:m(()=>[d(e.$slots,"hint",{},()=>[h(p(i.hint),1)])]),_:3})]),_:3})])):t("",!0),e.$slots.addon?(a(),n("div",D,[d(e.$slots,"addon")])):t("",!0)]),u("div",Q,[d(e.$slots,"default",{id:i.id,required:i.required,disabled:i.disabled,readonly:i.readonly,invalid:i.invalid,ariaLabelledby:i.label||e.$slots.label?`${i.id}-label`:void 0,ariaInvalid:i.invalid?"true":void 0})])],16))}});v.__docgenInfo={exportName:"default",displayName:"UiField",description:"",tags:{},props:[{name:"id",description:"Id для связки label/control",type:{name:"string"},required:!0},{name:"label",description:"Текст заголовка поля",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"hint",description:"Контент tooltip-подсказки рядом с label",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"hintAriaLabel",description:"Подпись для иконки подсказки",type:{name:"string"},defaultValue:{func:!1,value:"'Hint'"}},{name:"invalid",description:"Некорректное значение поля",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"required",description:"Обязательность поля",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",description:"Недоступность поля",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"readonly",description:"Режим только чтения",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"label"},{name:"hint"},{name:"addon"},{name:"default",scoped:!0,bindings:[{name:"id",title:"binding"},{name:"required",title:"binding"},{name:"disabled",title:"binding"},{name:"readonly",title:"binding"},{name:"invalid",title:"binding"},{name:"ariaLabelledby",title:"binding"},{name:"ariaInvalid",title:"binding"}]}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/field/UiField.vue"]};function f(i){const e={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...x(),...i.components};return l.jsxs(l.Fragment,{children:[l.jsx(e.h1,{id:"uifield",children:"UiField"}),`
`,l.jsxs(e.p,{children:[l.jsx(e.code,{children:"UiField"}),` - remote-only обертка для построения семантики поля формы.
Компонент связывает `,l.jsx(e.code,{children:"label"})," и вложенный контрол через id/ARIA атрибуты, а ",l.jsx(e.code,{children:"hint"})," показывает в tooltip рядом с label."]}),`
`,l.jsx(e.h2,{id:"когда-использовать",children:"Когда использовать"}),`
`,l.jsxs(e.ul,{children:[`
`,l.jsx(e.li,{children:"Нужно единообразно оформлять поля ввода в формах."}),`
`,l.jsxs(e.li,{children:["Нужно передавать в контрол связки ",l.jsx(e.code,{children:"aria-labelledby"}),"/",l.jsx(e.code,{children:"aria-invalid"}),"."]}),`
`,l.jsxs(e.li,{children:["Нужно выводить ",l.jsx(e.code,{children:"hint"})," как tooltip у названия поля."]}),`
`,l.jsxs(e.li,{children:["Нужно вывести справа от заголовка дополнительный контент (",l.jsx(e.code,{children:"addon"}),") без разметки вокруг контрола."]}),`
`,l.jsxs(e.li,{children:["Нужно вынести логику обязательности (",l.jsx(e.code,{children:"required"}),") и состояния ошибки (",l.jsx(e.code,{children:"invalid"}),") в общий контейнер."]}),`
`]}),`
`,l.jsx(e.h2,{id:"базовое-применение",children:"Базовое применение"}),`
`,l.jsx(e.pre,{children:l.jsx(e.code,{className:"language-html",children:`<template>
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
`,l.jsx(e.h2,{id:"слоты",children:"Слоты"}),`
`,l.jsxs(e.ul,{children:[`
`,l.jsxs(e.li,{children:[l.jsx(e.code,{children:"default"})," - вложенный контрол (через slot-props получает ",l.jsx(e.code,{children:"id"})," и ARIA значения)."]}),`
`,l.jsxs(e.li,{children:[l.jsx(e.code,{children:"label"})," - кастомная разметка label."]}),`
`,l.jsxs(e.li,{children:[l.jsx(e.code,{children:"hint"})," - контент tooltip рядом с label."]}),`
`,l.jsxs(e.li,{children:[l.jsx(e.code,{children:"addon"})," - дополнительный контент справа от label."]}),`
`]}),`
`,l.jsx(e.h2,{id:"addon-рядом-с-label",children:"Addon рядом с label"}),`
`,l.jsx(e.pre,{children:l.jsx(e.code,{className:"language-html",children:`<template>
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
`,l.jsxs(e.h2,{id:"подсказка-hint-в-белом-tooltip",children:["Подсказка (",l.jsx(e.code,{children:"hint"}),") в белом tooltip"]}),`
`,l.jsxs(e.p,{children:["Tooltip у ",l.jsx(e.code,{children:"UiField"})," оформляется белым фоном в базовых стилях библиотеки и может быть переопределен через слоты/переменные при необходимости."]}),`
`,l.jsx(e.h2,{id:"api",children:"API"}),`
`,l.jsx(L,{})]})}function T(i={}){const{wrapper:e}={...x(),...i.components};return e?l.jsx(e,{...i,children:l.jsx(f,{...i})}):f(i)}const P=y({UiPopperConnector:Z,UiPopperTarget:H,UiTextbox:B,UiTooltip:W}),Ie={title:"Components/UiField",component:v,argTypes:{id:{control:"text"},label:{control:"text"},hint:{control:"text"},hintAriaLabel:{control:"text"},invalid:{control:"boolean"},required:{control:"boolean"},disabled:{control:"boolean"},readonly:{control:"boolean"},withAddon:{control:"boolean"},addonText:{control:"text"},customLabel:{control:"boolean"},customHint:{control:"boolean"},hideLabel:{control:"boolean"},textboxPlaceholder:{control:"text"},containerWidth:{control:"number"}},render:U({provider:P,workerUrl:new URL("data:video/mp2t;base64,aW1wb3J0IHR5cGUgeyBVaUZpZWxkU2xvdFByb3BzIH0gZnJvbSAnLi4vLi4vc3JjL2NvbW1vbi9jb21wb25lbnRzL2ZpZWxkJwoKaW1wb3J0IHsgaCwgcmVmIH0gZnJvbSAndnVlJwoKaW1wb3J0IHsgVWlGaWVsZCB9IGZyb20gJy4uLy4uL3NyYy9yZW1vdGUvY29tcG9uZW50cy9maWVsZCcKaW1wb3J0IHsgVWlUZXh0Ym94IH0gZnJvbSAnLi4vLi4vc3JjL3JlbW90ZS9jb21wb25lbnRzL3RleHRib3gnCgppbXBvcnQgeyBjcmVhdGVDb21wb25lbnRFbmRwb2ludCB9IGZyb20gJy4uL2VuZHBvaW50JwoKdHlwZSBVaUZpZWxkUHJvcHMgPSBJbnN0YW5jZVR5cGU8dHlwZW9mIFVpRmllbGQ+WyckcHJvcHMnXQp0eXBlIFVpRmllbGRTdG9yeUV4dHJhcyA9IHsKICB3aXRoQWRkb24/OiBib29sZWFuOwogIGFkZG9uVGV4dD86IHN0cmluZzsKICBjdXN0b21MYWJlbD86IGJvb2xlYW47CiAgY3VzdG9tSGludD86IGJvb2xlYW47CiAgaGlkZUxhYmVsPzogYm9vbGVhbjsKICB0ZXh0Ym94UGxhY2Vob2xkZXI/OiBzdHJpbmc7CiAgY29udGFpbmVyV2lkdGg/OiBudW1iZXI7Cn0KdHlwZSBVaUZpZWxkV29ya2VyUHJvcHMgPSBVaUZpZWxkUHJvcHMgJiBVaUZpZWxkU3RvcnlFeHRyYXMKCmNyZWF0ZUNvbXBvbmVudEVuZHBvaW50PFVpRmllbGRXb3JrZXJQcm9wcz4oewogIGFzeW5jIHJ1biAoY3JlYXRlQXBwLCByb290LCBwcm9wcykgewogICAgY29uc3QgYXBwID0gY3JlYXRlQXBwKHsKICAgICAgc2V0dXAgKCkgewogICAgICAgIGNvbnN0IHZhbHVlID0gcmVmKCcnKQoKICAgICAgICByZXR1cm4gKCkgPT4gewogICAgICAgICAgY29uc3QgewogICAgICAgICAgICB3aXRoQWRkb24gPSBmYWxzZSwKICAgICAgICAgICAgYWRkb25UZXh0ID0gJycsCiAgICAgICAgICAgIGN1c3RvbUxhYmVsID0gZmFsc2UsCiAgICAgICAgICAgIGN1c3RvbUhpbnQgPSBmYWxzZSwKICAgICAgICAgICAgaGlkZUxhYmVsID0gZmFsc2UsCiAgICAgICAgICAgIHRleHRib3hQbGFjZWhvbGRlciA9ICdUeXBlIHZhbHVlJywKICAgICAgICAgICAgY29udGFpbmVyV2lkdGggPSAzNjAsCiAgICAgICAgICAgIC4uLmZpZWxkUHJvcHMKICAgICAgICAgIH0gPSBwcm9wcwoKICAgICAgICAgIGNvbnN0IHJlc29sdmVkRmllbGRQcm9wcyA9IGhpZGVMYWJlbAogICAgICAgICAgICA/IHsgLi4uZmllbGRQcm9wcywgbGFiZWw6ICcnIH0KICAgICAgICAgICAgOiBmaWVsZFByb3BzCgogICAgICAgICAgY29uc3Qgc2xvdHM6IFJlY29yZDxzdHJpbmcsIHVua25vd24+ID0gewogICAgICAgICAgICBkZWZhdWx0OiAoc2xvdFByb3BzOiBVaUZpZWxkU2xvdFByb3BzKSA9PiBoKFVpVGV4dGJveCwgewogICAgICAgICAgICAgIGlkOiBzbG90UHJvcHMuaWQsCiAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLnZhbHVlLAogICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiB0ZXh0Ym94UGxhY2Vob2xkZXIsCiAgICAgICAgICAgICAgaW52YWxpZDogcmVzb2x2ZWRGaWVsZFByb3BzLmludmFsaWQsCiAgICAgICAgICAgICAgcmVxdWlyZWQ6IHJlc29sdmVkRmllbGRQcm9wcy5yZXF1aXJlZCwKICAgICAgICAgICAgICBkaXNhYmxlZDogcmVzb2x2ZWRGaWVsZFByb3BzLmRpc2FibGVkLAogICAgICAgICAgICAgIHJlYWRvbmx5OiByZXNvbHZlZEZpZWxkUHJvcHMucmVhZG9ubHksCiAgICAgICAgICAgICAgaW5wdXRBdHRyaWJ1dGVzOiB7CiAgICAgICAgICAgICAgICAnYXJpYS1sYWJlbGxlZGJ5Jzogc2xvdFByb3BzLmFyaWFMYWJlbGxlZGJ5LAogICAgICAgICAgICAgICAgJ2FyaWEtaW52YWxpZCc6IHNsb3RQcm9wcy5hcmlhSW52YWxpZCwKICAgICAgICAgICAgICB9LAogICAgICAgICAgICAgICdvblVwZGF0ZTp2YWx1ZSc6IChuZXh0OiBzdHJpbmcgfCBudW1iZXIpID0+IHsKICAgICAgICAgICAgICAgIHZhbHVlLnZhbHVlID0gU3RyaW5nKG5leHQgPz8gJycpCiAgICAgICAgICAgICAgfSwKICAgICAgICAgICAgfSksCiAgICAgICAgICB9CgogICAgICAgICAgaWYgKGN1c3RvbUxhYmVsKSB7CiAgICAgICAgICAgIHNsb3RzLmxhYmVsID0gKCkgPT4gaCgnc3BhbicsIHsgc3R5bGU6ICdkaXNwbGF5OmlubGluZS1mbGV4O2dhcDo0cHg7YWxpZ24taXRlbXM6Y2VudGVyOycgfSwgWwogICAgICAgICAgICAgIGgoJ3N0cm9uZycsICdDdXN0b20gbGFiZWwnKSwKICAgICAgICAgICAgICBoKCdzcGFuJywgeyBzdHlsZTogJ29wYWNpdHk6LjY1OycgfSwgJyhzbG90KScpLAogICAgICAgICAgICBdKQogICAgICAgICAgfQoKICAgICAgICAgIGlmIChjdXN0b21IaW50KSB7CiAgICAgICAgICAgIHNsb3RzLmhpbnQgPSAoKSA9PiBoKCdkaXYnLCB7IHN0eWxlOiAnZGlzcGxheTpncmlkO2dhcDoycHg7JyB9LCBbCiAgICAgICAgICAgICAgaCgnZGl2JywgeyBzdHlsZTogJ2ZvbnQtd2VpZ2h0OjYwMDsnIH0sICdDdXN0b20gaGludCcpLAogICAgICAgICAgICAgIGgoJ2RpdicsICdVc2UgMy0zMiBjaGFyYWN0ZXJzJyksCiAgICAgICAgICAgIF0pCiAgICAgICAgICB9CgogICAgICAgICAgaWYgKHdpdGhBZGRvbikgewogICAgICAgICAgICBzbG90cy5hZGRvbiA9ICgpID0+IGgoJ3NwYW4nLCBhZGRvblRleHQpCiAgICAgICAgICB9CgogICAgICAgICAgcmV0dXJuIGgoJ2RpdicsIHsgc3R5bGU6IGB3aWR0aDogJHtjb250YWluZXJXaWR0aH1weDtgIH0sIFsKICAgICAgICAgICAgaChVaUZpZWxkLCByZXNvbHZlZEZpZWxkUHJvcHMsIHNsb3RzKSwKICAgICAgICAgIF0pCiAgICAgICAgfQogICAgICB9LAogICAgfSkKCiAgICBhcHAubW91bnQocm9vdCkKCiAgICByZXR1cm4gKCkgPT4gYXBwLnVubW91bnQoKQogIH0sCn0sIHNlbGYgYXMgdW5rbm93biBhcyBXb3JrZXIpCg==",import.meta.url)}),parameters:{docs:{page:T},layout:"centered"}},s={args:{id:"field-sandbox",label:"Field label",hint:"Hint tooltip text",hintAriaLabel:"Show hint",invalid:!1,required:!1,disabled:!1,readonly:!1,withAddon:!1,addonText:"Optional",customLabel:!1,customHint:!1,hideLabel:!1,textboxPlaceholder:"Type value",containerWidth:360}},g={args:{id:"field-invalid-required",label:"Email",hint:"Use a work email address",hintAriaLabel:"Show hint",invalid:!0,required:!0}},c={args:{id:"field-disabled",label:"Field label",hint:"Hint tooltip text",disabled:!0}},I={args:{id:"field-readonly",label:"API token",hint:"Readonly field with generated value",readonly:!0,textboxPlaceholder:"Readonly value"}},C={args:{id:"field-custom-slots",customLabel:!0,customHint:!0,required:!0}},b={args:{id:"field-addon",label:"Name",hint:"Your public name",withAddon:!0,addonText:"3-32 chars"}},A={args:{id:"field-no-label",hideLabel:!0,hint:"Label is hidden in this scenario",hintAriaLabel:"Show hint"}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'field-invalid-required',
    label: 'Email',
    hint: 'Use a work email address',
    hintAriaLabel: 'Show hint',
    invalid: true,
    required: true
  }
}`,...g.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'field-disabled',
    label: 'Field label',
    hint: 'Hint tooltip text',
    disabled: true
  }
}`,...c.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'field-readonly',
    label: 'API token',
    hint: 'Readonly field with generated value',
    readonly: true,
    textboxPlaceholder: 'Readonly value'
  }
}`,...I.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'field-custom-slots',
    customLabel: true,
    customHint: true,
    required: true
  }
}`,...C.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'field-addon',
    label: 'Name',
    hint: 'Your public name',
    withAddon: true,
    addonText: '3-32 chars'
  }
}`,...b.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'field-no-label',
    hideLabel: true,
    hint: 'Label is hidden in this scenario',
    hintAriaLabel: 'Show hint'
  }
}`,...A.parameters?.docs?.source}}};const Ce=["Sandbox","InvalidRequired","Disabled","Readonly","CustomSlots","WithAddon","NoLabel"];export{C as CustomSlots,c as Disabled,g as InvalidRequired,A as NoLabel,I as Readonly,s as Sandbox,b as WithAddon,Ce as __namedExportsOrder,Ie as default};
