import{c as se}from"./host-CMQl2KSi.js";import{U as y,_ as le}from"./UiToggleButton-CbM4Ye4K.js";import{_ as ae}from"./UiToggleGroupRoot-RVTuXllt.js";import{i as x,q as g,h as L,a4 as re,a5 as te,Q as ie,o as F,y as R,z as V,m as U,H as E,N as de,t as ue,A as N,E as D,r as $,w as _,c as ce,F as pe,j as ge,D as me,p as h}from"./iframe-DnG3g5pW.js";import{d as P,a as B,w as c,b as p,c as be}from"./createRemoteStoryRender-CQKxbukF.js";import{d as C}from"./docsOnlyStory-D04fiwRX.js";import{u as W,j as n}from"./index-DFg_Ho_i.js";import{S as q,A as fe}from"./blocks-DBDDY4vL.js";import"./render-vaNyDQt4.js";import"./composables-CfEvSTVp.js";import"./preload-helper-PPVm8Dsz.js";import"./index-nl1gzEpR.js";const he="UiToggleButton",ye=P(he,{emits:["click","focus","blur","keydown"],methods:{focus:B(),blur:B(),click:B()}}),H=Symbol("UiToggleGroupFocusableId"),X=Symbol("UiToggleGroupMoveFocus"),Q=Symbol("UiToggleGroupRegistry"),J=Symbol("UiToggleGroupSetFocusableId"),Y=Symbol("UiToggleGroupSize"),Z=Symbol("UiToggleGroupDisabled"),ee=Symbol("UiToggleGroupToggle"),xe=()=>x(H,g(()=>null)),ve=()=>x(X,()=>{}),je=()=>x(Q,{register:()=>{},unregister:()=>{}}),Se=()=>x(J,()=>{}),Te=()=>x(Y,g(()=>y.SM)),Ue=()=>x(Z,g(()=>!1)),we=()=>x(ee,()=>{});let Ge=0;const ke={},I=L({...ke,inheritAttrs:!1,__name:"UiToggleGroupOption",props:{id:{type:String,default:()=>"ui-v1-toggle-group-option-"+ ++Ge},label:{type:String,default:""},value:{type:null,required:!0},disabled:{type:Boolean,default:!1}},setup(a){const e=a,r=re("button"),w=Ue(),m=xe(),t=ve(),v=je(),j=Se(),b=Te(),G=we(),o=$(!1),s=g(()=>w.value||e.disabled),l=$(!1),i=g(()=>!s.value&&m.value===e.id?0:-1),f=()=>{s.value||(j(e.id),G(e.value))},M=()=>{s.value||(o.value=!0,j(e.id))},k=()=>{o.value=!1},d=u=>{if(!s.value)switch(u.key){case" ":case"Enter":j(e.id),G(e.value);return;case"ArrowDown":case"ArrowRight":t(e.id,"next");return;case"ArrowUp":case"ArrowLeft":t(e.id,"prev");return;case"Home":t(e.id,"first");return;case"End":t(e.id,"last");return}};return te(()=>{v.register(e.id,{getValue:()=>e.value,pressed:l,disabled:()=>s.value,focus:()=>r.value?.focus()})}),ie(()=>{v.unregister(e.id)}),(u,ne)=>(F(),R(D(ye),N({id:a.id,ref_key:"button",ref:r,size:D(b),pressed:l.value,disabled:s.value,focused:o.value,grouped:!0,tabindex:i.value,role:"checkbox","aria-checked":`${l.value}`,"aria-disabled":`${s.value}`},u.$attrs,{onClick:f,onFocus:M,onBlur:k,onKeydown:[c(p(d,["prevent"]),["space"]),c(p(d,["prevent"]),["enter"]),c(p(d,["prevent"]),["left"]),c(p(d,["prevent"]),["right"]),c(p(d,["prevent"]),["up"]),c(p(d,["prevent"]),["down"]),c(p(d,["prevent"]),["home"]),c(p(d,["prevent"]),["end"])]}),{default:V(()=>[U(u.$slots,"default",{},()=>[u.$slots.icon?U(u.$slots,"icon",{key:0}):E("",!0),u.$slots.label||a.label?U(u.$slots,"label",{key:1},()=>[de(ue(a.label),1)]):E("",!0)])]),_:3},16,["id","size","pressed","disabled","focused","tabindex","aria-checked","aria-disabled","onKeydown"]))}});I.__docgenInfo=Object.assign({displayName:I.name??I.__name},{exportName:"default",displayName:"UiToggleGroupOption",description:"",tags:{},props:[{name:"id",type:{name:"string"},defaultValue:{func:!0,value:"() => 'ui-v1-toggle-group-option-' + ++counter"}},{name:"label",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"value",type:{name:"UiToggleGroupOptionProperties['value']"},required:!0},{name:"disabled",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default"},{name:"icon"},{name:"label"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/toggle-group/UiToggleGroupOption.vue"]});const ze="UiToggleGroupRoot",Fe=P(ze),O=L({inheritAttrs:!1,__name:"UiToggleGroup",props:{model:{type:Array,default:()=>[]},options:{type:Array,default:()=>[]},equalFn:{type:Function,default:(a,e)=>a===e},size:{type:String,default:y.SM,validator:a=>Object.values(y).includes(a)},rubber:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},ariaLabel:{type:String,default:void 0},ariaLabelledby:{type:String,default:void 0},ariaDescribedby:{type:String,default:void 0},ariaOrientation:{type:String,default:"horizontal"}},emits:["change","update:model"],setup(a,{emit:e}){const r=a,w=e,m=new Map,t=$(null),v=o=>r.model.some(s=>r.equalFn(s,o)),j=()=>Array.from(m.entries()).filter(([,o])=>!o.disabled()),b=o=>{const s=j(),l=new Set(s.map(([f])=>f)),i=s.find(([,f])=>f.pressed.value);if(o&&l.has(o)){t.value=o;return}t.value&&l.has(t.value)||(t.value=i?.[0]??s[0]?.[0]??null)},G=()=>{Array.from(m.values()).forEach(o=>{o.pressed.value=v(o.getValue())})};return h(H,g(()=>t.value)),h(Z,g(()=>r.disabled)),h(Y,g(()=>r.size)),h(J,o=>{b(o)}),h(Q,{register:(o,s)=>{m.has(o)||(s.pressed.value=v(s.getValue()),m.set(o,s),b(s.pressed.value?o:t.value))},unregister:o=>{m.delete(o),t.value===o&&b()}}),h(ee,o=>{if(r.disabled)return;const s=v(o)?r.model.filter(l=>!r.equalFn(l,o)):[...r.model,o];w("change",s),w("update:model",s)}),h(X,async(o,s)=>{const l=j();if(!l.length){t.value=null;return}let i=l[0];if(s==="first")i=l[0];else if(s==="last")i=l.at(-1)??l[0];else{const k=l.findIndex(([A])=>A===o),d=t.value?l.findIndex(([A])=>A===t.value):-1,oe=((k===-1?Math.max(d,0):k)+(s==="next"?1:-1)+l.length)%l.length;i=l[oe]??l[0]}if(!i)return;const[f,M]=i;t.value=f,await M.focus()}),_([()=>r.model,()=>r.equalFn],()=>{G(),b()},{deep:!0}),_(()=>r.disabled,()=>{b()}),(o,s)=>(F(),R(D(Fe),N({size:a.size,rubber:a.rubber,disabled:a.disabled,"aria-label":r.ariaLabel,"aria-labelledby":r.ariaLabelledby,"aria-describedby":r.ariaDescribedby,"aria-orientation":r.ariaOrientation},o.$attrs),{default:V(()=>[U(o.$slots,"default",{},()=>[(F(!0),ce(pe,null,ge(a.options,(l,i)=>(F(),R(I,{key:`${l.label}-${i}`,label:l.label,value:l.value,disabled:l.disabled},me({_:2},[o.$slots.icon?{name:"icon",fn:V(()=>[U(o.$slots,"icon",{option:l})]),key:"0"}:void 0]),1032,["label","value","disabled"]))),128))])]),_:3},16,["size","rubber","disabled","aria-label","aria-labelledby","aria-describedby","aria-orientation"]))}});O.__docgenInfo=Object.assign({displayName:O.name??O.__name},{exportName:"default",displayName:"UiToggleGroup",description:"",tags:{},props:[{name:"model",type:{name:"UiToggleGroupProperties['model']"},defaultValue:{func:!0,value:"() => []"}},{name:"options",type:{name:"UiToggleGroupItem[]"},defaultValue:{func:!0,value:"() => []"}},{name:"equalFn",type:{name:"UiToggleGroupEqualPredicate"},defaultValue:{func:!0,value:"(a: unknown, b: unknown): boolean => a === b"}},{name:"size",type:{name:"UiToggleGroupProperties['size']"},defaultValue:{func:!1,value:"UiToggleButtonSize.SM"}},{name:"rubber",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"ariaLabel",type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"ariaLabelledby",type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"ariaDescribedby",type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"ariaOrientation",type:{name:"UiToggleGroupProperties['ariaOrientation']"},defaultValue:{func:!1,value:"'horizontal'"}}],events:[{name:"change",type:{names:["Array"],elements:[{name:"unknown"}]}},{name:"update:model",type:{names:["Array"],elements:[{name:"unknown"}]}}],slots:[{name:"default"},{name:"icon",scoped:!0,bindings:[{name:"option",title:"binding"}]}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/toggle-group/UiToggleGroup.vue"]});function Ie(a){return new Worker(""+new URL("UiToggleGroup.remote-DhrdrI09.js",import.meta.url).href,{name:a?.name})}function K(a){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...W(),...a.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{id:"uitogglegroup",children:"UiToggleGroup"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"UiToggleGroup"})," - группа переключаемых сегментов для множественного выбора. По смыслу это multi-select control, визуально оформленный как segmented group."]}),`
`,n.jsx(e.h2,{id:"когда-использовать",children:"Когда использовать"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"для выбора нескольких значений из короткого фиксированного набора;"}),`
`,n.jsx(e.li,{children:"когда обычные чекбоксы визуально слишком шумные для компактной панели;"}),`
`,n.jsx(e.li,{children:"для сценариев вроде выбора дней недели, каналов, типов контента или быстрых фильтров."}),`
`]}),`
`,n.jsx(e.h2,{id:"когда-не-использовать",children:"Когда не использовать"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["если нужен выбор ровно одного значения - тогда лучше ",n.jsx(e.code,{children:"UiRadioSwitch"})," или ",n.jsx(e.code,{children:"UiRadio"}),";"]}),`
`,n.jsx(e.li,{children:"если набор значений длинный и требует переноса строк, описаний или сложной иерархии;"}),`
`,n.jsx(e.li,{children:"если пользователь должен видеть нативные checkbox-индикаторы как часть интерфейса."}),`
`]}),`
`,n.jsx(e.h2,{id:"примеры",children:"Примеры"}),`
`,n.jsx(e.h3,{id:"1-выбор-дней-недели",children:"1. Выбор дней недели"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
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
`,n.jsx(q,{of:S}),`
`,n.jsxs(e.h3,{id:"2-через-options",children:["2. Через ",n.jsx(e.code,{children:"options"})]}),`
`,n.jsxs(e.p,{children:["Для простого набора значений можно передать массив ",n.jsx(e.code,{children:"options"}),", не раскладывая опции вручную."]}),`
`,n.jsxs(e.h3,{id:"3-через-uitogglegroupoption",children:["3. Через ",n.jsx(e.code,{children:"UiToggleGroupOption"})]}),`
`,n.jsxs(e.p,{children:["Ручная композиция удобна, когда нужны слоты, иконки или не-примитивные значения вместе с ",n.jsx(e.code,{children:"equalFn"}),"."]}),`
`,n.jsx(q,{of:T}),`
`,n.jsx(e.h2,{id:"поведение",children:"Поведение"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"UiToggleGroup"})," работает как multi-select и эмитит ",n.jsx(e.code,{children:"change"})," и ",n.jsx(e.code,{children:"update:model"}),"."]}),`
`,n.jsx(e.li,{children:"В модели хранится массив выбранных значений."}),`
`,n.jsx(e.li,{children:"Если значение уже выбрано, повторное нажатие удаляет его из массива."}),`
`,n.jsxs(e.li,{children:["Для объектных значений можно передать ",n.jsx(e.code,{children:"equalFn"}),"."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"rubber"})," позволяет группе занимать ширину по содержимому, что полезно для компактных segmented controls."]}),`
`]}),`
`,n.jsx(e.h2,{id:"клавиатура-и-a11y",children:"Клавиатура и A11y"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Группа рендерится как ",n.jsx(e.code,{children:"toolbar"}),", а каждый сегмент - как ",n.jsx(e.code,{children:"button"})," с состоянием ",n.jsx(e.code,{children:"aria-pressed"}),"."]}),`
`,n.jsx(e.li,{children:"Внутри группы используется roving tabindex: в tab-order присутствует только один сегмент."}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"ArrowLeft"}),", ",n.jsx(e.code,{children:"ArrowRight"}),", ",n.jsx(e.code,{children:"ArrowUp"}),", ",n.jsx(e.code,{children:"ArrowDown"})," перемещают фокус между доступными сегментами."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"Home"})," и ",n.jsx(e.code,{children:"End"})," переводят фокус к первому и последнему доступному сегменту."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"Space"})," и ",n.jsx(e.code,{children:"Enter"})," переключают текущее значение."]}),`
`,n.jsx(e.li,{children:"Disabled-элементы исключаются из клавиатурной навигации."}),`
`]}),`
`,n.jsx(e.h2,{id:"важные-свойства",children:"Важные свойства"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"model"})," - массив выбранных значений."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"options"})," - быстрый способ передать набор сегментов."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"equalFn"})," - функция сравнения для не-примитивных значений."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"size"})," - размер сегментов (",n.jsx(e.code,{children:"lg"}),", ",n.jsx(e.code,{children:"md"}),", ",n.jsx(e.code,{children:"sm"}),", ",n.jsx(e.code,{children:"xs"}),")."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"rubber"})," - разрешает группе не растягиваться на всю ширину контейнера."]}),`
`]}),`
`,n.jsx(e.h2,{id:"api",children:"API"}),`
`,n.jsx(fe,{})]})}function Oe(a={}){const{wrapper:e}={...W(),...a.components};return e?n.jsx(e,{...a,children:n.jsx(K,{...a})}):K(a)}const Me=se({UiToggleButton:le,UiToggleGroupRoot:ae}),Pe={title:"Components/UiToggleGroup",component:O,argTypes:{model:{control:!1},options:{control:!1},equalFn:{control:!1},size:{control:"select",options:Object.values(y)},disabled:{control:"boolean"},rubber:{control:"boolean"},withSlots:{control:"boolean"}},render:be({provider:Me,worker:Ie}),parameters:{docs:{page:Oe},layout:"centered"}},z={args:{disabled:!1,rubber:!0,size:y.SM,withSlots:!1}},S=C({args:{disabled:!1,rubber:!0,size:y.SM,withSlots:!1}}),T=C({args:{disabled:!1,rubber:!0,size:y.SM,withSlots:!0}});z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
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
})`,...T.parameters?.docs?.source}}};const Ce=["Sandbox","Weekdays","WithIcons"];export{z as Sandbox,S as Weekdays,T as WithIcons,Ce as __namedExportsOrder,Pe as default};
