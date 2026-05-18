import{U as y}from"./UiToggleButton-CD1AtQpV.js";import{i as x,q as m,h as C,a2 as re,a3 as te,H as se,o as F,s as B,w as R,m as U,y as $,D as le,E as ae,u as N,v as D,r as E,O as q,c as ie,F as de,j as ue,t as ce,p as h}from"./iframe-DDyl2AmK.js";import{d as P,a as V,w as c,b as p,c as pe}from"./createRemoteStoryRender-DbfDIKnd.js";import{d as _}from"./docsOnlyStory-D04fiwRX.js";import{u as W,j as o}from"./index-DC6AVhol.js";import{S as K,A as me}from"./blocks-irvO_Kf_.js";import"./render-CFCB9hDK.js";import"./composables-DVi6oeou.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BN_6-Ncz.js";import"./UiAlert-DL1WXFlL.js";import"./UiTransition-C_SZL8sB.js";import"./checkmark-circle-outlined-D7JQQjfO.js";import"./clear-DNT8teyS.js";import"./info-outlined-mI6ap4ux.js";import"./UiAddButton-DPDk1X46.js";import"./UiAvatar-B81jJYDc.js";import"./UiImage-BusBqEVS.js";import"./predicate-ClulhfEu.js";import"./UiAvatarList-Blc2DaUu.js";import"./UiButton-DVSNWWSO.js";import"./UiCalendar-qP4zSNGb.js";import"./chevron-right-DhgHXoQF.js";import"./plugin-DBXjfIqs.js";import"./index-BAxMPZdI.js";import"./UiCheckbox-DJtpsEk8.js";import"./done-CPYICBU4.js";import"./utils-BqzVSXwn.js";import"./UiCollapse-BYVlo_1R.js";import"./UiCollapseGroup-DDi5yXSZ.js";import"./UiCopyButton-BpSLbXh0.js";import"./UiTooltip-CgKFebDj.js";import"./UiPopper-CtyW38v3.js";import"./UiDate-S8crmajf.js";import"./ru-Chw6HHdR.js";import"./UiDatePicker-6yuPb3vb.js";import"./UiTextbox-Cp3VoCvx.js";import"./UiMenuItem-BCh28-bQ.js";import"./UiScrollBox-pROz8lVa.js";import"./UiError-DeL8Md7R.js";import"./UiInfobox-Wo7jvY2w.js";import"./UiLink-Ci033uQc.js";import"./UiYandexMap-nHh77mw2.js";import"./add-igqe0Lf_.js";import"./caret-down-S39XXVlx.js";import"./UiPopperTarget-wB-kx3Lr.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./UiModalSidebar-CMdnDQBK.js";import"./uid-BWdYvJYd.js";import"./UiModalWindow-BeFROK4B.js";import"./UiRadio-B7t7SNhJ.js";import"./UiSkeleton-CLxphY9X.js";import"./UiSlider-BrjJ0zPm.js";import"./UiSwitch-CQ1DsvmW.js";import"./UiTag-C_AWhmbM.js";import"./UiTimePicker-Di5bRYuC.js";import"./UiToolbarButton-Bj-VZc36.js";import"./UiToolbarLink-BwCG9I2I.js";import"./index-CDnKqZOh.js";const ge="UiToggleButton",be=P(ge,{emits:["click","focus","blur","keydown"],methods:{focus:V(),blur:V(),click:V()}}),H=Symbol("UiToggleGroupFocusableId"),X=Symbol("UiToggleGroupMoveFocus"),Z=Symbol("UiToggleGroupRegistry"),J=Symbol("UiToggleGroupSetFocusableId"),Q=Symbol("UiToggleGroupSize"),Y=Symbol("UiToggleGroupDisabled"),ee=Symbol("UiToggleGroupToggle"),fe=()=>x(H,m(()=>null)),he=()=>x(X,()=>{}),ye=()=>x(Z,{register:()=>{},unregister:()=>{}}),xe=()=>x(J,()=>{}),ve=()=>x(Q,m(()=>y.SM)),je=()=>x(Y,m(()=>!1)),Se=()=>x(ee,()=>{});let Te=0;const Ue={},O=C({...Ue,inheritAttrs:!1,__name:"UiToggleGroupOption",props:{id:{type:String,default:()=>"ui-v1-toggle-group-option-"+ ++Te},label:{type:String,default:""},value:{type:null,required:!0},disabled:{type:Boolean,default:!1}},setup(s){const e=s,l=re("button"),w=je(),g=fe(),a=he(),v=ye(),j=xe(),b=ve(),G=Se(),n=E(!1),r=m(()=>w.value||e.disabled),t=E(!1),i=m(()=>!r.value&&g.value===e.id?0:-1),f=()=>{r.value||(j(e.id),G(e.value))},M=()=>{r.value||(n.value=!0,j(e.id))},k=()=>{n.value=!1},d=u=>{if(!r.value)switch(u.key){case" ":case"Enter":j(e.id),G(e.value);return;case"ArrowDown":case"ArrowRight":a(e.id,"next");return;case"ArrowUp":case"ArrowLeft":a(e.id,"prev");return;case"Home":a(e.id,"first");return;case"End":a(e.id,"last");return}};return te(()=>{v.register(e.id,{getValue:()=>e.value,pressed:t,disabled:()=>r.value,focus:()=>l.value?.focus()})}),se(()=>{v.unregister(e.id)}),(u,oe)=>(F(),B(D(be),N({id:s.id,ref_key:"button",ref:l,size:D(b),pressed:t.value,disabled:r.value,focused:n.value,grouped:!0,tabindex:i.value,role:"checkbox","aria-checked":`${t.value}`,"aria-disabled":`${r.value}`},u.$attrs,{onClick:f,onFocus:M,onBlur:k,onKeydown:[c(p(d,["prevent"]),["space"]),c(p(d,["prevent"]),["enter"]),c(p(d,["prevent"]),["left"]),c(p(d,["prevent"]),["right"]),c(p(d,["prevent"]),["up"]),c(p(d,["prevent"]),["down"]),c(p(d,["prevent"]),["home"]),c(p(d,["prevent"]),["end"])]}),{default:R(()=>[U(u.$slots,"default",{},()=>[u.$slots.icon?U(u.$slots,"icon",{key:0}):$("",!0),u.$slots.label||s.label?U(u.$slots,"label",{key:1},()=>[le(ae(s.label),1)]):$("",!0)])]),_:3},16,["id","size","pressed","disabled","focused","tabindex","aria-checked","aria-disabled","onKeydown"]))}});O.__docgenInfo=Object.assign({displayName:O.name??O.__name},{exportName:"default",displayName:"UiToggleGroupOption",description:"",tags:{},props:[{name:"id",type:{name:"string"},defaultValue:{func:!0,value:"() => 'ui-v1-toggle-group-option-' + ++counter"}},{name:"label",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"value",type:{name:"UiToggleGroupOptionProperties['value']"},required:!0},{name:"disabled",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default"},{name:"icon"},{name:"label"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/toggle-group/UiToggleGroupOption.vue"]});const we="UiToggleGroupRoot",Ge=P(we),I=C({inheritAttrs:!1,__name:"UiToggleGroup",props:{model:{type:Array,default:()=>[]},options:{type:Array,default:()=>[]},equalFn:{type:Function,default:(s,e)=>s===e},size:{type:String,default:y.SM,validator:s=>Object.values(y).includes(s)},rubber:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},ariaLabel:{type:String,default:void 0},ariaLabelledby:{type:String,default:void 0},ariaDescribedby:{type:String,default:void 0},ariaOrientation:{type:String,default:"horizontal"}},emits:["change","update:model"],setup(s,{emit:e}){const l=s,w=e,g=new Map,a=E(null),v=n=>l.model.some(r=>l.equalFn(r,n)),j=()=>Array.from(g.entries()).filter(([,n])=>!n.disabled()),b=n=>{const r=j(),t=new Set(r.map(([f])=>f)),i=r.find(([,f])=>f.pressed.value);if(n&&t.has(n)){a.value=n;return}a.value&&t.has(a.value)||(a.value=i?.[0]??r[0]?.[0]??null)},G=()=>{Array.from(g.values()).forEach(n=>{n.pressed.value=v(n.getValue())})};return h(H,m(()=>a.value)),h(Y,m(()=>l.disabled)),h(Q,m(()=>l.size)),h(J,n=>{b(n)}),h(Z,{register:(n,r)=>{g.has(n)||(r.pressed.value=v(r.getValue()),g.set(n,r),b(r.pressed.value?n:a.value))},unregister:n=>{g.delete(n),a.value===n&&b()}}),h(ee,n=>{if(l.disabled)return;const r=v(n)?l.model.filter(t=>!l.equalFn(t,n)):[...l.model,n];w("change",r),w("update:model",r)}),h(X,async(n,r)=>{const t=j();if(!t.length){a.value=null;return}let i=t[0];if(r==="first")i=t[0];else if(r==="last")i=t.at(-1)??t[0];else{const k=t.findIndex(([A])=>A===n),d=a.value?t.findIndex(([A])=>A===a.value):-1,ne=((k===-1?Math.max(d,0):k)+(r==="next"?1:-1)+t.length)%t.length;i=t[ne]??t[0]}if(!i)return;const[f,M]=i;a.value=f,await M.focus()}),q([()=>l.model,()=>l.equalFn],()=>{G(),b()},{deep:!0}),q(()=>l.disabled,()=>{b()}),(n,r)=>(F(),B(D(Ge),N({size:s.size,rubber:s.rubber,disabled:s.disabled,"aria-label":l.ariaLabel,"aria-labelledby":l.ariaLabelledby,"aria-describedby":l.ariaDescribedby,"aria-orientation":l.ariaOrientation},n.$attrs),{default:R(()=>[U(n.$slots,"default",{},()=>[(F(!0),ie(de,null,ue(s.options,(t,i)=>(F(),B(O,{key:`${t.label}-${i}`,label:t.label,value:t.value,disabled:t.disabled},ce({_:2},[n.$slots.icon?{name:"icon",fn:R(()=>[U(n.$slots,"icon",{option:t})]),key:"0"}:void 0]),1032,["label","value","disabled"]))),128))])]),_:3},16,["size","rubber","disabled","aria-label","aria-labelledby","aria-describedby","aria-orientation"]))}});I.__docgenInfo=Object.assign({displayName:I.name??I.__name},{exportName:"default",displayName:"UiToggleGroup",description:"",tags:{},props:[{name:"model",type:{name:"UiToggleGroupProperties['model']"},defaultValue:{func:!0,value:"() => []"}},{name:"options",type:{name:"UiToggleGroupItem[]"},defaultValue:{func:!0,value:"() => []"}},{name:"equalFn",type:{name:"UiToggleGroupEqualPredicate"},defaultValue:{func:!0,value:"(a: unknown, b: unknown): boolean => a === b"}},{name:"size",type:{name:"UiToggleGroupProperties['size']"},defaultValue:{func:!1,value:"UiToggleButtonSize.SM"}},{name:"rubber",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"ariaLabel",type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"ariaLabelledby",type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"ariaDescribedby",type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"ariaOrientation",type:{name:"UiToggleGroupProperties['ariaOrientation']"},defaultValue:{func:!1,value:"'horizontal'"}}],events:[{name:"change",type:{names:["Array"],elements:[{name:"unknown"}]}},{name:"update:model",type:{names:["Array"],elements:[{name:"unknown"}]}}],slots:[{name:"default"},{name:"icon",scoped:!0,bindings:[{name:"option",title:"binding"}]}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/toggle-group/UiToggleGroup.vue"]});function ke(s){return new Worker(""+new URL("UiToggleGroup.remote-OnZVtqBO.js",import.meta.url).href,{name:s?.name})}function L(s){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...W(),...s.components};return o.jsxs(o.Fragment,{children:[o.jsx(e.h1,{id:"uitogglegroup",children:"UiToggleGroup"}),`
`,o.jsxs(e.p,{children:[o.jsx(e.code,{children:"UiToggleGroup"})," - группа переключаемых сегментов для множественного выбора. По смыслу это multi-select control, визуально оформленный как segmented group."]}),`
`,o.jsx(e.h2,{id:"когда-использовать",children:"Когда использовать"}),`
`,o.jsxs(e.ul,{children:[`
`,o.jsx(e.li,{children:"для выбора нескольких значений из короткого фиксированного набора;"}),`
`,o.jsx(e.li,{children:"когда обычные чекбоксы визуально слишком шумные для компактной панели;"}),`
`,o.jsx(e.li,{children:"для сценариев вроде выбора дней недели, каналов, типов контента или быстрых фильтров."}),`
`]}),`
`,o.jsx(e.h2,{id:"когда-не-использовать",children:"Когда не использовать"}),`
`,o.jsxs(e.ul,{children:[`
`,o.jsxs(e.li,{children:["если нужен выбор ровно одного значения - тогда лучше ",o.jsx(e.code,{children:"UiRadioSwitch"})," или ",o.jsx(e.code,{children:"UiRadio"}),";"]}),`
`,o.jsx(e.li,{children:"если набор значений длинный и требует переноса строк, описаний или сложной иерархии;"}),`
`,o.jsx(e.li,{children:"если пользователь должен видеть нативные checkbox-индикаторы как часть интерфейса."}),`
`]}),`
`,o.jsx(e.h2,{id:"примеры",children:"Примеры"}),`
`,o.jsx(e.h3,{id:"1-выбор-дней-недели",children:"1. Выбор дней недели"}),`
`,o.jsx(e.pre,{children:o.jsx(e.code,{className:"language-vue",children:`<template>
  <UiToggleGroup v-model:model="days" rubber>
    <UiToggleGroupOption label="Пн" value="monday" />
    <UiToggleGroupOption label="Вт" value="tuesday" />
    <UiToggleGroupOption label="Ср" value="wednesday" />
    <UiToggleGroupOption label="Чт" value="thursday" />
    <UiToggleGroupOption label="Пт" value="friday" />
    <UiToggleGroupOption label="Сб" value="saturday" />
    <UiToggleGroupOption label="Вс" value="sunday" />
  </UiToggleGroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  UiToggleGroup,
  UiToggleGroupOption,
} from '@retailcrm/embed-ui-v1-components/remote'

const days = ref(['monday', 'wednesday', 'friday'])
<\/script>
`})}),`
`,o.jsx(K,{of:S}),`
`,o.jsxs(e.h3,{id:"2-через-options",children:["2. Через ",o.jsx(e.code,{children:"options"})]}),`
`,o.jsxs(e.p,{children:["Для простого набора значений можно передать массив ",o.jsx(e.code,{children:"options"}),", не раскладывая опции вручную."]}),`
`,o.jsxs(e.h3,{id:"3-через-uitogglegroupoption",children:["3. Через ",o.jsx(e.code,{children:"UiToggleGroupOption"})]}),`
`,o.jsxs(e.p,{children:["Ручная композиция удобна, когда нужны слоты, иконки или не-примитивные значения вместе с ",o.jsx(e.code,{children:"equalFn"}),"."]}),`
`,o.jsx(K,{of:T}),`
`,o.jsx(e.h2,{id:"поведение",children:"Поведение"}),`
`,o.jsxs(e.ul,{children:[`
`,o.jsxs(e.li,{children:[o.jsx(e.code,{children:"UiToggleGroup"})," работает как multi-select и эмитит ",o.jsx(e.code,{children:"change"})," и ",o.jsx(e.code,{children:"update:model"}),"."]}),`
`,o.jsx(e.li,{children:"В модели хранится массив выбранных значений."}),`
`,o.jsx(e.li,{children:"Если значение уже выбрано, повторное нажатие удаляет его из массива."}),`
`,o.jsxs(e.li,{children:["Для объектных значений можно передать ",o.jsx(e.code,{children:"equalFn"}),"."]}),`
`,o.jsxs(e.li,{children:[o.jsx(e.code,{children:"rubber"})," позволяет группе занимать ширину по содержимому, что полезно для компактных segmented controls."]}),`
`]}),`
`,o.jsx(e.h2,{id:"клавиатура-и-a11y",children:"Клавиатура и A11y"}),`
`,o.jsxs(e.ul,{children:[`
`,o.jsxs(e.li,{children:["Группа рендерится как ",o.jsx(e.code,{children:"toolbar"}),", а каждый сегмент - как ",o.jsx(e.code,{children:"button"})," с состоянием ",o.jsx(e.code,{children:"aria-pressed"}),"."]}),`
`,o.jsx(e.li,{children:"Внутри группы используется roving tabindex: в tab-order присутствует только один сегмент."}),`
`,o.jsxs(e.li,{children:[o.jsx(e.code,{children:"ArrowLeft"}),", ",o.jsx(e.code,{children:"ArrowRight"}),", ",o.jsx(e.code,{children:"ArrowUp"}),", ",o.jsx(e.code,{children:"ArrowDown"})," перемещают фокус между доступными сегментами."]}),`
`,o.jsxs(e.li,{children:[o.jsx(e.code,{children:"Home"})," и ",o.jsx(e.code,{children:"End"})," переводят фокус к первому и последнему доступному сегменту."]}),`
`,o.jsxs(e.li,{children:[o.jsx(e.code,{children:"Space"})," и ",o.jsx(e.code,{children:"Enter"})," переключают текущее значение."]}),`
`,o.jsx(e.li,{children:"Disabled-элементы исключаются из клавиатурной навигации."}),`
`]}),`
`,o.jsx(e.h2,{id:"важные-свойства",children:"Важные свойства"}),`
`,o.jsxs(e.ul,{children:[`
`,o.jsxs(e.li,{children:[o.jsx(e.code,{children:"model"})," - массив выбранных значений."]}),`
`,o.jsxs(e.li,{children:[o.jsx(e.code,{children:"options"})," - быстрый способ передать набор сегментов."]}),`
`,o.jsxs(e.li,{children:[o.jsx(e.code,{children:"equalFn"})," - функция сравнения для не-примитивных значений."]}),`
`,o.jsxs(e.li,{children:[o.jsx(e.code,{children:"size"})," - размер сегментов (",o.jsx(e.code,{children:"lg"}),", ",o.jsx(e.code,{children:"md"}),", ",o.jsx(e.code,{children:"sm"}),", ",o.jsx(e.code,{children:"xs"}),")."]}),`
`,o.jsxs(e.li,{children:[o.jsx(e.code,{children:"rubber"})," - разрешает группе не растягиваться на всю ширину контейнера."]}),`
`]}),`
`,o.jsx(e.h2,{id:"api",children:"API"}),`
`,o.jsx(me,{})]})}function ze(s={}){const{wrapper:e}={...W(),...s.components};return e?o.jsx(e,{...s,children:o.jsx(L,{...s})}):L(s)}const Bo={title:"Components/UiToggleGroup",component:I,argTypes:{model:{control:!1},options:{control:!1},equalFn:{control:!1},size:{control:"select",options:Object.values(y)},disabled:{control:"boolean"},rubber:{control:"boolean"},withSlots:{control:"boolean"}},render:pe({worker:ke}),parameters:{docs:{page:ze},layout:"centered"}},z={args:{disabled:!1,rubber:!0,size:y.SM,withSlots:!1}},S=_({args:{disabled:!1,rubber:!0,size:y.SM,withSlots:!1}}),T=_({args:{disabled:!1,rubber:!0,size:y.SM,withSlots:!0}});z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: false,
    rubber: true,
    size: UiToggleButtonSize.SM,
    withSlots: false
  }
}`,...z.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    disabled: false,
    rubber: true,
    size: UiToggleButtonSize.SM,
    withSlots: false
  }
})`,...S.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    disabled: false,
    rubber: true,
    size: UiToggleButtonSize.SM,
    withSlots: true
  }
})`,...T.parameters?.docs?.source}}};const Ro=["Sandbox","Weekdays","WithIcons"];export{z as Sandbox,S as Weekdays,T as WithIcons,Ro as __namedExportsOrder,Bo as default};
