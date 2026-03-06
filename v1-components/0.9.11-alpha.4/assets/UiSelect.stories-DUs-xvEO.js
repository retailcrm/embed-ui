import{f as He}from"./host-C85PVOqc.js";import{S as ie,_ as We}from"./UiMenuItem-C6PXnfQN.js";import{P,_ as oe,u as _,h as Ze,S as Ke,a as Ne,b as Te,U as Ee}from"./UiSelectTrigger-CIx44Hqz.js";import{_ as Le}from"./UiPopperConnector-DeZmM5pn.js";import{h as Y,E as Re,j as c,r as I,p as d,G as K,s as D,w as b,x as y,i as u,o as V,m as F,c as z,D as Q,y as pe,q as S,a as q,a7 as Me,L as ge,v as me,t as fe,H as Fe,C as re}from"./iframe-B-kTCndX.js";import{d as $,a as ze,c as Je}from"./createRemoteStoryRender-bwmCI0m5.js";import{S as se}from"./UiTextbox-CrS2ZayV.js";import{I as Xe}from"./plugin-BX-gG-s-.js";import{b as Ye}from"./UiPopper-B2Jzcw5B.js";import{I as $e}from"./checkmark-circle-BkQhtqmt.js";import{j as l}from"./jsx-runtime-4ZJMz8rO.js";import{useMDXComponents as Ie}from"./index-B4BHLWPH.js";import{e as H,A as Pe}from"./blocks-BFXVrAzm.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./composables-mLYPVKrD.js";import"./caret-down-Dfg1kwPp.js";import"./index-BAxMPZdI.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BU-GYzGj.js";const be=Symbol("UiSelectedIsSelected"),Ce=Symbol("UiSelectRegister"),ve=Symbol("UiSelectSync"),Ae=Symbol("UiSelectUnregister"),he=Symbol("UiSelectToggle"),ye=Symbol("UiSelectFilter"),ee=Symbol("UiSelectFiltered"),Se=Symbol("UiSelectTicker"),xe=Symbol("UiSelectMultiple"),Ue=Symbol("UiSelectActiveOptionId"),le=Symbol("UiSelectFastened"),ne=Symbol("UiSelectUnregisterOption"),te=Symbol("UiSelectRegisterOption"),ce=Symbol("UiSelectOptionGroupRegister"),de=Symbol("UiSelectOptionGroupUnregister"),je=Symbol("UiSelectOptionGroupRegisterHeaderOption"),Oe=Symbol("UiSelectOptionGroupUnregisterHeaderOption"),De="UiSelectTrigger",Qe=$(De,["input","focus","blur","keydown","clear","update:value","update:expanded"]),qe="UiSelectPopper",_e=$(qe,["update:visible","show","hide","shown","hidden","dispose"]),el={key:0,class:"ui-v1-select__no-results-text"},Ve=Y({__name:"UiSelect",props:{id:{type:String,default:void 0},value:{type:null,default:void 0},placeholder:{type:String,default:"test"},clearable:{type:Boolean,default:!1},filterable:{type:Boolean,default:!1},invalid:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},equalsFn:{type:Function,default:(t,e)=>t===e},placement:{type:String,validator:t=>Object.values(P).includes(t),default:P.BOTTOM},targetTriggers:{type:[Array,Object],default:()=>({show:["click"]})},popperTriggers:{type:[Array,Object],default:()=>[]},popperFitTrigger:{type:Boolean,default:!1},popperClass:{type:String,default:null},popperOptions:{type:Object,default:()=>({})},textboxSize:{type:String,validator:t=>Object.values(se).includes(t),default:se.SM},multiple:{type:Boolean,default:!1},expanded:{type:Boolean,default:!1},placeholderOnly:{type:Boolean,default:!1},ticker:{type:Boolean,default:!1}},setup(t){const e=t,a=Re({expanded:e.expanded,filter:"",value:e.value}),C=_("ui-v1-select"),v=c(()=>e.id??C),k=c(()=>oe.init(u(Xe,null)?.locale??oe.fallback)),G=c(()=>k.value.t("search.noResult",{filter:a.filter})),f=I([]),p=I(null),j=c(()=>{const n=O(a.value),i=[];return n.forEach(s=>{const m=f.value.find(g=>A(g.value,s));m&&i.push(m)}),i}),O=n=>Array.isArray(n)?[...n]:typeof n=="number"||typeof n=="boolean"||n?[n]:[],A=(n,i)=>e.equalsFn(n,i),o=(n,i)=>n.some(s=>A(s,i)),r=c(()=>f.value.filter(n=>n.isMatched()&&!n.disabled));d(Ce,n=>{if(f.value.some(i=>i.id===n.id))throw new Error(`[UiSelect] Component with id ${n.id} already registered. Unregister it before using again.`);f.value.push(n)}),d(ve,(n,i)=>{const s=f.value.find(m=>m.id===n);s&&(s.label=i.label,s.value=i.value,s.disabled=i.disabled)}),d(Ae,n=>{const i=f.value.findIndex(s=>s.id===n);i!==-1&&f.value.splice(i,1)}),d(be,c(()=>n=>Array.isArray(a.value)?o(a.value,n):A(a.value,n))),d(he,n=>{if(e.multiple){const i=O(a.value),s=i.findIndex(m=>A(m,n));s!==-1?i.splice(s,1):i.push(n),a.value=i,e.multiple||h()}else a.value=n,h()}),d(ye,c(()=>a.filter)),d(ee,c(()=>e.filterable&&a.filter.length>0)),d(Se,c(()=>e.ticker)),d(xe,c(()=>e.multiple)),d(Ue,c(()=>p.value));const x=n=>{a.filter=n},U=(n="selected-first")=>{const i=r.value;if(i.length===0){p.value=null;return}if(n==="first"){p.value=i[0].id;return}if(n==="last"){p.value=i[i.length-1].id;return}const s=i.find(m=>Array.isArray(a.value)?o(a.value,m.value):A(a.value,m.value));p.value=s?.id??i[0].id},w=n=>{const i=r.value;if(i.length===0){p.value=null;return}const s=i.findIndex(g=>g.id===p.value),m=s===-1?n>0?0:i.length-1:(s+n+i.length)%i.length;p.value=i[m].id},B=()=>{const n=r.value.find(i=>i.id===p.value);if(n)if(e.multiple){const i=O(a.value),s=i.findIndex(m=>A(m,n.value));s!==-1?i.splice(s,1):i.push(n.value),a.value=i}else a.value=n.value,h()},J=n=>{if(!(e.disabled||e.readonly)){if(n.key==="Escape"){h();return}if(n.key==="Tab"){h();return}if(n.key==="Home"){a.expanded||(a.expanded=!0),U("first");return}if(n.key==="End"){a.expanded||(a.expanded=!0),U("last");return}if(n.key==="ArrowDown"){if(!a.expanded){a.expanded=!0,U("first");return}w(1);return}if(n.key==="ArrowUp"){if(!a.expanded){a.expanded=!0,U("last");return}w(-1);return}if(n.key==="Enter"){if(!a.expanded){a.expanded=!0,U("selected-first");return}B()}}},h=()=>{a.expanded&&(a.expanded=!1,a.filter="",p.value=null)};return K(()=>e.expanded,n=>{a.expanded=n,n||(a.filter="",p.value=null)}),K(()=>e.value,n=>{a.value=n}),K(()=>a.expanded,n=>{n?U("selected-first"):p.value=null}),K(r,()=>{if(!a.expanded)return;r.value.some(i=>i.id===p.value)||U("selected-first")}),(n,i)=>(V(),D(y(ze),null,{default:b(()=>[F(y(Qe),{id:v.value,value:a.value,multiple:t.multiple,selection:j.value,filter:a.filter,filterable:t.filterable,clearable:t.clearable,expanded:a.expanded,invalid:t.invalid,disabled:t.disabled,readonly:t.readonly,"placeholder-only":t.placeholderOnly,placeholder:t.placeholder,"textbox-size":t.textboxSize,"active-descendant":p.value,onInput:x,onKeydown:J,"onUpdate:value":i[0]||(i[0]=s=>a.value=s),"onUpdate:expanded":i[1]||(i[1]=s=>a.expanded=s)},null,8,["id","value","multiple","selection","filter","filterable","clearable","expanded","invalid","disabled","readonly","placeholder-only","placeholder","textbox-size","active-descendant"]),F(y(_e),{id:v.value,disabled:t.disabled||t.readonly,multiple:t.multiple,opened:a.expanded,placement:t.placement,"popper-class":t.popperClass,"popper-fit-trigger":t.popperFitTrigger,"popper-options":t.popperOptions,"popper-triggers":t.popperTriggers,readonly:t.readonly,"target-triggers":t.targetTriggers,ticker:t.ticker,filterable:t.filterable,"options-registry":f.value,onHide:h},{default:b(()=>[t.filterable&&f.value.every(s=>!s.isMatched())&&G.value?(V(),z("div",el,Q(G.value),1)):pe("",!0),S(n.$slots,"default")]),_:3},8,["id","disabled","multiple","opened","placement","popper-class","popper-fit-trigger","popper-options","popper-triggers","readonly","target-triggers","ticker","filterable","options-registry"])]),_:3}))}});Ve.__docgenInfo={exportName:"default",displayName:"UiSelect",description:"",tags:{},props:[{name:"id",description:"Атрибут id корневого элемента выпадающего списка. Должен быть уникальным на странице",type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"value",description:"Атрибут value, содержащий выбранный элемент из выпадающего списка",type:{name:"unknown|unknown[]"},defaultValue:{func:!1,value:"undefined"}},{name:"placeholder",description:"Атрибут placeholder нативного поля ввода input",type:{name:"string"},defaultValue:{func:!1,value:"'test'"}},{name:"clearable",description:"Отображает иконку сброса введённого или выбранного значения в виде крестика",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"filterable",description:"Фильтрация строк выпадающего списка на соответствие введённого выражения в input",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"invalid",description:"Подсвечивает поле как содержащее некорректное значение",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"readonly",description:"Устанавливает поле ввода в состояние доступное только для чтения",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",description:"Блокировка поля ввода",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"equalsFn",description:"Функция для проверки равенства элементов",type:{name:"(a: unknown, b: unknown) => boolean"},defaultValue:{func:!0,value:"(a: unknown, b: unknown): boolean => a === b"}},{name:"placement",description:`Сторона цели, у которой появится плавающий элемент,
или подробный объект настройки положения и адаптации положения при нехватке места`,type:{name:"PLACEMENT | `${PLACEMENT}`"},defaultValue:{func:!1,value:"PLACEMENT.BOTTOM"}},{name:"targetTriggers",description:"События целевого элемента, по которым производится переключение видимости",type:{name:"Trigger[] | TriggerSchema"},defaultValue:{func:!0,value:`() => ({
  show: ['click'],
})`}},{name:"popperTriggers",description:"События плавающего элемента, по которым производится переключение видимости",type:{name:"Trigger[] | TriggerSchema"},defaultValue:{func:!0,value:"() => []"}},{name:"popperFitTrigger",description:`Флаг, устанавливающий ширину выпадающего списка по ширине целевого элемента.
По-умолчанию отключает такое поведение`,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"popperClass",description:"Стиль для плавающего элемента",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"popperOptions",description:"Набор свойств плавающего элемента. See @/common/components/popper",type:{name:"UiSelectPopperProperties['popperOptions']"},defaultValue:{func:!0,value:"() => ({})"}},{name:"textboxSize",description:"Размер поля ввода",type:{name:"SIZE | `${SIZE}`"},defaultValue:{func:!1,value:"SIZE.SM"}},{name:"multiple",description:"Наличие множественного выбора среди элементов выпадающего списка",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"expanded",description:"Состояние открытия выпадающего списка",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"placeholderOnly",description:"Устанавливает в качестве выводимого в input значения только содержимое placeholder",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"ticker",description:"Добавляет анимацию показала полной строки при переполнении",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/select/UiSelect.vue"]};const ll={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"};function nl(t,e){return V(),z("svg",ll,[...e[0]||(e[0]=[q("path",{fill:"currentColor","fill-rule":"evenodd",d:"M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10A10 10 0 0 0 12 2m0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16m1-9h2.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H13v2.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V13H8.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5H11V8.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z","clip-rule":"evenodd"},null,-1)])])}const tl={render:nl},al="UiMenuItem",il=$(al,[],["default","avatar","leading-icon","description","trailing-icon"]),ol="UiMenuItemGroup",rl=$(ol,[],["default","option","label","quantity"]),sl=["id","aria-selected","aria-current"],cl=["innerHTML"],dl=["innerHTML"],ul=Y({__name:"UiSelectOption",props:{value:{type:null,required:!0},label:{type:String,required:!0},description:{type:String,default:""},active:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},size:{type:String,validator:t=>Object.values(ie).includes(t),default:ie.MD},counter:{type:null,validator:t=>t===null||["string","number"].includes(typeof t),default:null},accent:{type:Boolean,default:!1}},setup(t){const e=t,a=_("u1-v1-select-option"),C=u(be,c(()=>()=>!1)),v=u(ve,(()=>{})),k=u(te,()=>{}),G=u(Ce,()=>{}),f=u(ne,()=>{}),p=u(Ae,()=>{}),j=u(he,()=>{}),O=u(le,!1),A=u(Ue,I(null)),o=u(ye,I("")),r=u(ee,I(!1)),x=u(Se,I(!1)),U=u(xe,I(!1)),w=(g,Z="font-weight: 500;")=>Ze(g,o.value,Z),B=c(()=>({label:r.value?w(e.label):e.label,description:r.value?w(e.description,"font-weight: 600;"):e.description})),J=c(()=>B.value.label!==e.label||B.value.description!==e.description),h=c(()=>e.active||A.value===a),n=c(()=>e.active||C.value(e.value)),i=c(()=>!(O||!r.value||J.value)),s=()=>{e.disabled||j(e.value)},m=K([()=>e.label,()=>e.value,()=>e.disabled],([g,Z,ae],[Be,Ge,we])=>{(g!==Be||!Ye(Z,Ge)||ae!==we)&&v(a,{label:g,value:Z,disabled:ae})});return Me(()=>{const g={id:a,value:e.value,label:e.label,disabled:e.disabled,isMatched:()=>!r.value||J.value};G(g),k(g)}),ge(()=>{m(),p(a),f(a)}),(g,Z)=>(V(),z("div",fe({id:y(a)},g.$attrs,{"aria-selected":n.value?"true":"false","aria-current":h.value?"true":void 0,class:{"ui-v1-select-option":!0,"ui-v1-select-option_active":h.value,"ui-v1-select-option_selected":n.value,"ui-v1-select-option_disabled":t.disabled,"ui-v1-select-option_hidden":i.value},role:"option",onClick:s}),[S(g.$slots,"default",{highlight:w,selected:n.value},()=>[F(y(il),{accent:t.accent,active:h.value,counter:t.counter,disabled:t.disabled,size:t.size,ticker:y(x)},me({"trailing-icon":b(()=>[S(g.$slots,"trailing-icon",{selected:n.value},()=>[n.value?(V(),D(y($e),{key:0,class:"ui-v1-select-option__checkmark-icon","aria-hidden":"true"})):y(U)?(V(),D(y(tl),{key:1,class:"ui-v1-select-option__add-icon","aria-hidden":"true"})):pe("",!0)])]),default:b(()=>[S(g.$slots,"value",{selected:n.value},()=>[q("span",{innerHTML:B.value.label},null,8,cl)])]),_:2},[g.$slots["leading-icon"]?{name:"leading-icon",fn:b(()=>[S(g.$slots,"leading-icon",{selected:n.value})]),key:"0"}:void 0,B.value.description?{name:"description",fn:b(()=>[q("span",{innerHTML:B.value.description},null,8,dl)]),key:"1"}:void 0]),1032,["accent","active","counter","disabled","size","ticker"])])],16,sl))}});ul.__docgenInfo={exportName:"default",displayName:"UiSelectOption",description:"",tags:{},props:[{name:"value",description:"Значение опции",type:{name:"unknown"},required:!0},{name:"label",description:"Заголовок",type:{name:"string"},required:!0},{name:"description",description:"Описание",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"active",description:"Опция выбрана/не выбрана в списке",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",description:"Заблокированный",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"size",description:"Размер шрифта, иконок и внутренних отступов компонента",type:{name:"SIZE"},defaultValue:{func:!1,value:"SIZE.MD"}},{name:"counter",description:"Счетчик количества",type:{name:"string|number|null"},defaultValue:{func:!1,value:"null"}},{name:"accent",description:"Жирное начертание текста",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default",scoped:!0,description:"Слот для переопределения всего контента опции",bindings:[{name:"highlight",title:"binding"},{name:"selected",title:"binding"}]},{name:"leading-icon",scoped:!0,description:"Иконка слева от заголовка и описания",bindings:[{name:"selected",title:"binding"}]},{name:"value",scoped:!0,description:"Текстовая метка опции",bindings:[{name:"selected",title:"binding"}]},{name:"trailing-icon",scoped:!0,description:"Иконка справа от заголовка и описания",bindings:[{name:"selected",title:"binding"}]}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/select/UiSelectOption.vue"]};const ke=Y({__name:"UiSelectOptionGroupHeader",setup(t){return d(te,u(je,()=>{})),d(ne,u(Oe,()=>{})),d(le,c(()=>!0)),(e,a)=>(V(),z("div",null,[S(e.$slots,"default")]))}});ke.__docgenInfo={exportName:"default",displayName:"UiSelectOptionGroupHeader",description:"",tags:{},slots:[{name:"default"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/select/UiSelectOptionGroupHeader.vue"]};const pl=Y({__name:"UiSelectOptionGroup",props:{label:{type:String,default:""}},setup(t){const e=_("u1-v1-select-option-group"),a=I([]),C=I([]),v=I([]),k=(o,r)=>`[${o}] Component with id ${r} already registered. Unregister it before using again.`;d(te,o=>{if(a.value.some(r=>r.id===o.id))throw new Error(k("UiSelect",o.id));a.value.push(o)}),d(ne,o=>{const r=a.value.findIndex(x=>x.id===o);r!==-1&&a.value.splice(r,1)}),d(ce,o=>{if(C.value.some(r=>r.id===o.id))throw new Error(k("UiSelectOptionGroup",o.id));C.value.push(o)}),d(de,o=>{const r=C.value.findIndex(x=>x.id===o);r!==-1&&C.value.splice(r,1)}),d(je,o=>{if(v.value.some(r=>r.id===o.id))throw new Error(k("UiSelectOptionGroupHeader",o.id));v.value.push(o)}),d(Oe,o=>{const r=v.value.findIndex(x=>x.id===o);r!==-1&&v.value.splice(r,1)}),d(le,c(()=>!1));const G=u(ce,()=>{}),f=u(de,()=>{}),p=u(ee,I(!1)),j=c(()=>a.value.filter(o=>o.isMatched()).length+C.value.reduce((o,r)=>o+r.matchedQuantity(),0)),O=c(()=>!!j.value||v.value.some(o=>o.isMatched())||C.value.some(o=>o.isMatched())),A=c(()=>!p.value||O.value);return Fe(()=>G({id:e,matchedQuantity:()=>j.value,isMatched:()=>O.value})),ge(()=>f(e)),(o,r)=>(V(),z("div",fe(o.$attrs,{class:{"ui-v1-select-option-group":!0,"ui-v1-select-option-group_hidden":A.value}}),[F(y(rl),null,me({label:b(()=>[S(o.$slots,"label",{},()=>[re(Q(t.label),1)])]),quantity:b(()=>[S(o.$slots,"quantity",{quantity:j.value},()=>[re(Q(j.value),1)])]),default:b(()=>[S(o.$slots,"default")]),_:2},[o.$slots.option?{name:"option",fn:b(()=>[F(ke,null,{default:b(()=>[S(o.$slots,"option")]),_:3})]),key:"0"}:void 0]),1024)],16))}});pl.__docgenInfo={exportName:"default",displayName:"UiSelectOptionGroup",description:"",tags:{},props:[{name:"label",description:"Заголовок группы опций",type:{name:"string"},defaultValue:{func:!1,value:"''"}}],slots:[{name:"option",description:"Разметка блока группировки опций"},{name:"label",description:"Заголовок"},{name:"quantity",scoped:!0,description:"Счетчик количества элементов внутри группы",bindings:[{name:"quantity",title:"binding"}]},{name:"default",description:"Иное содержимое компонента"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/select/UiSelectOptionGroup.vue"]};const W=t=>({...t,tags:Array.from(new Set([...t.tags??[],"!dev"]))});function ue(t){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...Ie(),...t.components};return l.jsxs(l.Fragment,{children:[l.jsx(e.h1,{id:"uiselect",children:"UiSelect"}),`
`,l.jsxs(e.p,{children:[l.jsx(e.code,{children:"UiSelect"}),` - выпадающий список для выбора одного или нескольких значений.
Компонент собирается из `,l.jsx(e.code,{children:"UiSelect"})," + ",l.jsx(e.code,{children:"UiSelectOption"})," (и при необходимости ",l.jsx(e.code,{children:"UiSelectOptionGroup"}),")."]}),`
`,l.jsx(e.h2,{id:"когда-использовать",children:"Когда использовать"}),`
`,l.jsxs(e.ul,{children:[`
`,l.jsx(e.li,{children:"Нужно выбрать одно значение из набора (статус, исполнитель, категория)."}),`
`,l.jsxs(e.li,{children:["Нужен множественный выбор (",l.jsx(e.code,{children:"multiple"}),") с отображением количества выбранных элементов."]}),`
`,l.jsxs(e.li,{children:["Нужен поиск по опциям (",l.jsx(e.code,{children:"filterable"}),"), включая подсветку совпадений в ",l.jsx(e.code,{children:"UiSelectOption"}),"."]}),`
`]}),`
`,l.jsx(e.h2,{id:"примеры-код--результат",children:"Примеры (код + результат)"}),`
`,l.jsx(e.h3,{id:"1-базовый-выбор",children:"1. Базовый выбор"}),`
`,l.jsx(e.pre,{children:l.jsx(e.code,{className:"language-html",children:`<template>
    <UiSelect placeholder="Исполнитель">
        <UiSelectOption value="kyle" label="Kyle Simmons" />
        <UiSelectOption value="eduardo" label="Eduardo Henry" />
        <UiSelectOption value="philip" label="Philip Williamson" />
    </UiSelect>
</template>

<script lang="ts" setup>
import {
  UiSelect,
  UiSelectOption,
} from '@retailcrm/embed-ui-v1-components/remote'
<\/script>
`})}),`
`,l.jsx(H,{of:N}),`
`,l.jsx(e.h3,{id:"2-множественный-выбор-с-очисткой",children:"2. Множественный выбор с очисткой"}),`
`,l.jsxs(e.p,{children:["Для множественного режима включите ",l.jsx(e.code,{children:"multiple"}),"."]}),`
`,l.jsx(e.pre,{children:l.jsx(e.code,{className:"language-html",children:`<template>
    <UiSelect
        v-model:value="value"
        multiple
        clearable
        placeholder="Исполнители"
    >
        <UiSelectOption value="kyle" label="Kyle Simmons" />
        <UiSelectOption value="eduardo" label="Eduardo Henry" />
        <UiSelectOption value="philip" label="Philip Williamson" />
    </UiSelect>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { UiSelect, UiSelectOption } from '@retailcrm/embed-ui-v1-components/remote'

const value = ref<string[]>([])
<\/script>
`})}),`
`,l.jsx(H,{of:T}),`
`,l.jsx(e.h3,{id:"3-поиск-по-опциям",children:"3. Поиск по опциям"}),`
`,l.jsxs(e.p,{children:["Чтобы включить поиск, передайте ",l.jsx(e.code,{children:"filterable"}),`.
В этом режиме ввод в триггере используется как строка фильтра, а опции автоматически скрываются/подсвечиваются по совпадению.`]}),`
`,l.jsx(e.pre,{children:l.jsx(e.code,{className:"language-html",children:`<template>
    <UiSelect filterable placeholder="Найти пользователя">
        <UiSelectOption value="kyle" label="Kyle Simmons" />
        <UiSelectOption value="eduardo" label="Eduardo Henry" />
        <UiSelectOption value="philip" label="Philip Williamson" />
    </UiSelect>
</template>
`})}),`
`,l.jsx(H,{of:E}),`
`,l.jsxs(e.h3,{id:"4-состояние-ошибки-invalid",children:["4. Состояние ошибки (",l.jsx(e.code,{children:"invalid"}),")"]}),`
`,l.jsx(e.pre,{children:l.jsx(e.code,{className:"language-html",children:`<template>
    <UiSelect
        v-model:value="value"
        invalid
        placeholder="Пользователь"
    >
        <UiSelectOption value="kyle" label="Kyle Simmons" />
        <UiSelectOption value="eduardo" label="Eduardo Henry" />
    </UiSelect>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { UiSelect, UiSelectOption } from '@retailcrm/embed-ui-v1-components/remote'

const value = ref('eduardo')
<\/script>
`})}),`
`,l.jsx(H,{of:L}),`
`,l.jsxs(e.h3,{id:"5-readonly-режим",children:["5. ",l.jsx(e.code,{children:"readonly"})," режим"]}),`
`,l.jsx(e.pre,{children:l.jsx(e.code,{className:"language-html",children:`<template>
    <UiSelect readonly placeholder="Пользователь">
        <UiSelectOption value="kyle" label="Kyle Simmons" />
        <UiSelectOption value="eduardo" label="Eduardo Henry" />
    </UiSelect>
</template>
`})}),`
`,l.jsx(H,{of:R}),`
`,l.jsxs(e.h3,{id:"6-disabled-режим",children:["6. ",l.jsx(e.code,{children:"disabled"})," режим"]}),`
`,l.jsx(e.pre,{children:l.jsx(e.code,{className:"language-html",children:`<template>
    <UiSelect disabled placeholder="Пользователь">
        <UiSelectOption value="kyle" label="Kyle Simmons" />
        <UiSelectOption value="eduardo" label="Eduardo Henry" />
    </UiSelect>
</template>
`})}),`
`,l.jsx(H,{of:M}),`
`,l.jsx(e.h2,{id:"дополнительные-сценарии",children:"Дополнительные сценарии"}),`
`,l.jsx(e.h3,{id:"опции-как-объекты",children:"Опции как объекты"}),`
`,l.jsxs(e.p,{children:["Если ",l.jsx(e.code,{children:"value"})," у опций - объекты, задайте ",l.jsx(e.code,{children:"equalsFn"}),", чтобы корректно сравнивать значения."]}),`
`,l.jsx(e.pre,{children:l.jsx(e.code,{className:"language-html",children:`<template>
    <UiSelect
        :value="{ id: 2, name: 'Eduardo Henry' }"
        :equals-fn="(a, b) => a?.id === b?.id"
        placeholder="Пользователь"
    >
        <UiSelectOption :value="{ id: 1, name: 'Kyle Simmons' }" label="Kyle Simmons" />
        <UiSelectOption :value="{ id: 2, name: 'Eduardo Henry' }" label="Eduardo Henry" />
    </UiSelect>
</template>
`})}),`
`,l.jsx(e.h3,{id:"группировка-опций",children:"Группировка опций"}),`
`,l.jsxs(e.p,{children:["Для групп используйте ",l.jsx(e.code,{children:"UiSelectOptionGroup"}),"."]}),`
`,l.jsx(e.pre,{children:l.jsx(e.code,{className:"language-html",children:`<template>
    <UiSelect placeholder="Сотрудник">
        <UiSelectOptionGroup label="Отдел продаж">
            <UiSelectOption value="kyle" label="Kyle Simmons" />
            <UiSelectOption value="eduardo" label="Eduardo Henry" />
        </UiSelectOptionGroup>

        <UiSelectOptionGroup label="Поддержка">
            <UiSelectOption value="philip" label="Philip Williamson" />
        </UiSelectOptionGroup>
    </UiSelect>
</template>

<script lang="ts" setup>
import {
  UiSelect,
  UiSelectOption,
  UiSelectOptionGroup,
} from '@retailcrm/embed-ui-v1-components/remote'
<\/script>
`})}),`
`,l.jsx(e.h2,{id:"важные-свойства",children:"Важные свойства"}),`
`,l.jsxs(e.ul,{children:[`
`,l.jsxs(e.li,{children:[l.jsx(e.code,{children:"placeholderOnly"})," - всегда отображает ",l.jsx(e.code,{children:"placeholder"})," в поле, вместо текста выбранных опций."]}),`
`,l.jsxs(e.li,{children:[l.jsx(e.code,{children:"textboxSize"})," - размер текстового поля триггера (",l.jsx(e.code,{children:"xs"}),", ",l.jsx(e.code,{children:"sm"}),", ",l.jsx(e.code,{children:"xl"}),")."]}),`
`,l.jsxs(e.li,{children:[l.jsx(e.code,{children:"expanded"})," - внешний флаг открытия/закрытия списка."]}),`
`,l.jsxs(e.li,{children:[l.jsx(e.code,{children:"placement"}),", ",l.jsx(e.code,{children:"targetTriggers"}),", ",l.jsx(e.code,{children:"popperTriggers"}),", ",l.jsx(e.code,{children:"popperFitTrigger"}),", ",l.jsx(e.code,{children:"popperOptions"})," - настройка поведения и позиционирования выпадающего списка."]}),`
`]}),`
`,l.jsx(e.h2,{id:"слоты",children:"Слоты"}),`
`,l.jsxs(e.ul,{children:[`
`,l.jsxs(e.li,{children:[l.jsx(e.code,{children:"default"})," - содержимое выпадающего списка (обычно ",l.jsx(e.code,{children:"UiSelectOption"})," и ",l.jsx(e.code,{children:"UiSelectOptionGroup"}),")."]}),`
`]}),`
`,l.jsx(e.h2,{id:"api",children:"API"}),`
`,l.jsx(Pe,{})]})}function gl(t={}){const{wrapper:e}={...Ie(),...t.components};return e?l.jsx(e,{...t,children:l.jsx(ue,{...t})}):ue(t)}const ml=He({UiMenuItem:We,UiMenuItemGroup:Ee,UiPopperConnector:Le,UiSelectPopper:Te,UiSelectTrigger:Ne}),Wl={title:"Components/UiSelect",component:Ve,argTypes:{id:{control:!1},value:{control:!1},expanded:{control:"boolean"},clearable:{control:"boolean"},placeholder:{control:"text"},filterable:{control:"boolean"},invalid:{control:"boolean"},placeholderOnly:{control:"boolean"},readonly:{control:"boolean"},disabled:{control:"boolean"},multiple:{control:"boolean"},ticker:{control:"boolean"},textboxSize:{options:Object.values(Ke)},placement:{options:Object.values(P)},popperFitTrigger:{control:"boolean"},popperClass:{control:"text"},popperOptions:{control:!1},targetTriggers:{control:!1},popperTriggers:{control:!1}},render:Je({provider:ml,workerUrl:new URL("data:video/mp2t;base64,aW1wb3J0IHsgaCB9IGZyb20gJ3Z1ZScKCmltcG9ydCBJY29uRXJyb3IgZnJvbSAnLi4vLi4vYXNzZXRzL3Nwcml0ZXMvYWxlcnRzL2Vycm9yLW91dGxpbmVkLnN2ZycKaW1wb3J0IEljb25Ob3RpZmljYXRpb24gZnJvbSAnLi4vLi4vYXNzZXRzL3Nwcml0ZXMvYWxlcnRzL25vdGlmaWNhdGlvbnMuc3ZnJwppbXBvcnQgSWNvbldhcm5pbmcgZnJvbSAnLi4vLi4vYXNzZXRzL3Nwcml0ZXMvYWxlcnRzL3dhcm5pbmcuc3ZnJwoKaW1wb3J0IHsgVWlTZWxlY3QgfSBmcm9tICcuLi8uLi9zcmMvcmVtb3RlL2NvbXBvbmVudHMvc2VsZWN0JwppbXBvcnQgeyBVaVNlbGVjdE9wdGlvbiB9IGZyb20gJy4uLy4uL3NyYy9yZW1vdGUvY29tcG9uZW50cy9zZWxlY3QnCgppbXBvcnQgeyBjcmVhdGVDb21wb25lbnRFbmRwb2ludCB9IGZyb20gJy4uL2VuZHBvaW50JwoKdHlwZSBVaVNlbGVjdFByb3BzID0gSW5zdGFuY2VUeXBlPHR5cGVvZiBVaVNlbGVjdD5bJyRwcm9wcyddCgpjcmVhdGVDb21wb25lbnRFbmRwb2ludDxVaVNlbGVjdFByb3BzPih7CiAgYXN5bmMgcnVuIChjcmVhdGVBcHAsIHJvb3QsIHByb3BzKSB7CiAgICBjb25zdCBhcHAgPSBjcmVhdGVBcHAoewogICAgICBzZXR1cCAoICkgewogICAgICAgIHJldHVybiAoKSA9PiBoKFVpU2VsZWN0LCB7CiAgICAgICAgICAuLi5wcm9wcywKICAgICAgICAgIGVxdWFsc0ZuOiAoYTogdW5rbm93biwgYjogdW5rbm93bikgPT4gYSA9PT0gYiwKICAgICAgICB9LHsKICAgICAgICAgIGRlZmF1bHQ6ICgpID0+CiAgICAgICAgICAgIFsKICAgICAgICAgICAgICAnS3lsZSBTaW1tbW9ucycsCiAgICAgICAgICAgICAgJ0VkdWFyZG8gSGVucnknLAogICAgICAgICAgICAgICdQaGlsaXAgV2lsbGlhbXNvbicsCiAgICAgICAgICAgICAgJ01heCBNaWxlcycsCiAgICAgICAgICAgICAgJ0Nhcm9saW5lIEFsbGVuJywKICAgICAgICAgICAgICAnSm9hbm5lIFRob21wc29uIEpvYW5uZSBUaG9tcHNvbiBKb2FubmUgVGhvbXBzb24gVGhvbXBzb24gVGhvbXBzb24nLAogICAgICAgICAgICAgICdEQUQnLAogICAgICAgICAgICBdLm1hcCh0ID0+CiAgICAgICAgICAgICAgaChVaVNlbGVjdE9wdGlvbiwgewogICAgICAgICAgICAgICAgdmFsdWU6IHQsCiAgICAgICAgICAgICAgICBsYWJlbDogdCwKICAgICAgICAgICAgICB9LCB7CiAgICAgICAgICAgICAgICAnbGVhZGluZy1pY29uJzogKHsgc2VsZWN0ZWQgfTogeyBzZWxlY3RlZDogYm9vbGVhbiB9KSA9PiB7CiAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZCkgewogICAgICAgICAgICAgICAgICAgIHJldHVybiBoKEljb25XYXJuaW5nLCB7CiAgICAgICAgICAgICAgICAgICAgICBjbGFzczogJ3VpLXYxLXNlbGVjdC1vcHRpb25fX2NoZWNrbWFyay1pY29uJywKICAgICAgICAgICAgICAgICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJywKICAgICAgICAgICAgICAgICAgICB9KQogICAgICAgICAgICAgICAgICB9CgogICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbAogICAgICAgICAgICAgICAgfSwKCiAgICAgICAgICAgICAgICAndHJhaWxpbmctaWNvbic6ICh7IHNlbGVjdGVkIH06IHsgc2VsZWN0ZWQ6IGJvb2xlYW4gfSkgPT4gewogICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHsKICAgICAgICAgICAgICAgICAgICByZXR1cm4gaChJY29uTm90aWZpY2F0aW9uLCB7CiAgICAgICAgICAgICAgICAgICAgICBjbGFzczogJ3VpLXYxLXNlbGVjdC1vcHRpb25fX2NoZWNrbWFyay1pY29uJywKICAgICAgICAgICAgICAgICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJywKICAgICAgICAgICAgICAgICAgICB9KQogICAgICAgICAgICAgICAgICB9CgogICAgICAgICAgICAgICAgICBpZiAocHJvcHMubXVsdGlwbGUpIHsKICAgICAgICAgICAgICAgICAgICByZXR1cm4gaChJY29uRXJyb3IsIHsKICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAndWktdjEtc2VsZWN0LW9wdGlvbl9fYWRkLWljb24nLAogICAgICAgICAgICAgICAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnLAogICAgICAgICAgICAgICAgICAgIH0pCiAgICAgICAgICAgICAgICAgIH0KCiAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsCiAgICAgICAgICAgICAgICB9LAogICAgICAgICAgICAgIH0pCiAgICAgICAgICAgICksCiAgICAgICAgfSkKICAgICAgfSwKICAgIH0pCgogICAgYXBwLm1vdW50KHJvb3QpCgogICAgcmV0dXJuICgpID0+IGFwcC51bm1vdW50KCkKICB9LAp9LCBzZWxmIGFzIHVua25vd24gYXMgV29ya2VyKQo=",import.meta.url)}),parameters:{docs:{page:gl},layout:"centered"}},X={args:{placeholder:"test123",ticker:!1,disabled:!1,multiple:!1,filterable:!1}},N=W({args:{placeholder:"Исполнитель",ticker:!1,disabled:!1,multiple:!1,filterable:!1}}),T=W({args:{placeholder:"Исполнители",ticker:!1,disabled:!1,multiple:!0,clearable:!0,filterable:!1}}),E=W({args:{placeholder:"Найти пользователя",ticker:!1,disabled:!1,multiple:!1,filterable:!0,clearable:!0}}),L=W({args:{placeholder:"Пользователь",value:"Eduardo Henry",ticker:!1,disabled:!1,multiple:!1,filterable:!1,invalid:!0}}),R=W({args:{placeholder:"Пользователь",value:"Kyle Simmmons",ticker:!1,disabled:!1,readonly:!0,multiple:!1,filterable:!1}}),M=W({args:{placeholder:"Пользователь",value:"Philip Williamson",ticker:!1,disabled:!0,multiple:!1,filterable:!1}});X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'test123',
    ticker: false,
    disabled: false,
    multiple: false,
    filterable: false
  }
}`,...X.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    placeholder: 'Исполнитель',
    ticker: false,
    disabled: false,
    multiple: false,
    filterable: false
  }
})`,...N.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    placeholder: 'Исполнители',
    ticker: false,
    disabled: false,
    multiple: true,
    clearable: true,
    filterable: false
  }
})`,...T.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    placeholder: 'Найти пользователя',
    ticker: false,
    disabled: false,
    multiple: false,
    filterable: true,
    clearable: true
  }
})`,...E.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    placeholder: 'Пользователь',
    value: 'Eduardo Henry',
    ticker: false,
    disabled: false,
    multiple: false,
    filterable: false,
    invalid: true
  }
})`,...L.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    placeholder: 'Пользователь',
    value: 'Kyle Simmmons',
    ticker: false,
    disabled: false,
    readonly: true,
    multiple: false,
    filterable: false
  }
})`,...R.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    placeholder: 'Пользователь',
    value: 'Philip Williamson',
    ticker: false,
    disabled: true,
    multiple: false,
    filterable: false
  }
})`,...M.parameters?.docs?.source}}};const Zl=["Sandbox","BasicSingle","MultipleClearable","FilterableSearch","InvalidState","ReadonlyState","DisabledState"];export{N as BasicSingle,M as DisabledState,E as FilterableSearch,L as InvalidState,T as MultipleClearable,R as ReadonlyState,X as Sandbox,Zl as __namedExportsOrder,Wl as default};
