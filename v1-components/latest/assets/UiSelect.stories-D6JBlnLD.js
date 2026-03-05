import{H as Pe,e as Be,f as Ae}from"./host-DXpHIOb_.js";import{h as L,E as Fe,j as c,r as g,p as d,G as V,s as W,w as b,x as U,i as u,o as E,m as R,c as q,D as _,y as pe,q as j,a as Q,a7 as Re,L as me,v as fe,t as ve,H as qe,C as ae}from"./iframe-BdOYAu1_.js";import{S as ie,_ as he}from"./UiMenuItem-DG5KKGde.js";import{P as X,_ as re,u as Y,h as ze,a as ge,b as be,U as ye,S as De}from"./UiSelectTrigger-T2MWJ6yA.js";import{_ as Se}from"./UiPopperConnector-DdUU4IMU.js";import{d as Z,a as Le,c as Ze}from"./popper-CpNHoPO2.js";import{S as oe}from"./UiTextbox-CUbkvLcA.js";import{I as We}from"./plugin-Cqe3I-b7.js";import{b as _e}from"./UiPopper-Dftg2b5C.js";import{I as Qe}from"./checkmark-circle-D3CzXO7g.js";import{j as l}from"./jsx-runtime-CsWq8gGz.js";import{useMDXComponents as xe}from"./index-BVcEI9YY.js";import{e as C,A as Xe}from"./blocks-DeEOk0XO.js";import"./preload-helper-PPVm8Dsz.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./composables-B4n5r0P4.js";import"./caret-down-CXdz305o.js";import"./index-BAxMPZdI.js";import"./index-D4-8MnPz.js";const Ue=Symbol("UiSelectedIsSelected"),je=Symbol("UiSelectRegister"),Oe=Symbol("UiSelectSync"),ke=Symbol("UiSelectUnregister"),Ie=Symbol("UiSelectToggle"),Te=Symbol("UiSelectFilter"),J=Symbol("UiSelectFiltered"),Ee=Symbol("UiSelectTicker"),Me=Symbol("UiSelectMultiple"),we=Symbol("UiSelectActiveOptionId"),ee=Symbol("UiSelectFastened"),le=Symbol("UiSelectUnregisterOption"),ne=Symbol("UiSelectRegisterOption"),se=Symbol("UiSelectOptionGroupRegister"),ce=Symbol("UiSelectOptionGroupUnregister"),He=Symbol("UiSelectOptionGroupRegisterHeaderOption"),Ge=Symbol("UiSelectOptionGroupUnregisterHeaderOption"),Ye="UiSelectTrigger",Je=Z(Ye,["input","focus","blur","keydown","clear","update:value","update:expanded"]),el="UiSelectPopper",ll=Z(el,["update:visible","show","hide","shown","hidden","dispose"]),nl={key:0,class:"ui-v1-select__no-results-text"},Ce=L({__name:"UiSelect",props:{id:{type:String,default:void 0},value:{type:null,default:void 0},placeholder:{type:String,default:"test"},clearable:{type:Boolean,default:!1},filterable:{type:Boolean,default:!1},invalid:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},equalsFn:{type:Function,default:(a,e)=>a===e},placement:{type:String,validator:a=>Object.values(X).includes(a),default:X.BOTTOM},targetTriggers:{type:[Array,Object],default:()=>({show:["click"]})},popperTriggers:{type:[Array,Object],default:()=>[]},popperFitTrigger:{type:Boolean,default:!1},popperClass:{type:String,default:null},popperOptions:{type:Object,default:()=>({})},textboxSize:{type:String,validator:a=>Object.values(oe).includes(a),default:oe.SM},multiple:{type:Boolean,default:!1},expanded:{type:Boolean,default:!1},placeholderOnly:{type:Boolean,default:!1},ticker:{type:Boolean,default:!1}},setup(a){const e=a,t=Fe({expanded:e.expanded,filter:"",value:e.value}),h=Y("ui-v1-select"),y=c(()=>e.id??h),M=c(()=>re.init(u(We,null)?.locale??re.fallback)),H=c(()=>M.value.t("search.noResult",{filter:t.filter})),v=g([]),p=g(null),I=c(()=>{const n=T(t.value),i=[];return n.forEach(s=>{const f=v.value.find(m=>S(m.value,s));f&&i.push(f)}),i}),T=n=>Array.isArray(n)?[...n]:typeof n=="number"||typeof n=="boolean"||n?[n]:[],S=(n,i)=>e.equalsFn(n,i),r=(n,i)=>n.some(s=>S(s,i)),o=c(()=>v.value.filter(n=>n.isMatched()&&!n.disabled));d(je,n=>{if(v.value.some(i=>i.id===n.id))throw new Error(`[UiSelect] Component with id ${n.id} already registered. Unregister it before using again.`);v.value.push(n)}),d(Oe,(n,i)=>{const s=v.value.find(f=>f.id===n);s&&(s.label=i.label,s.value=i.value,s.disabled=i.disabled)}),d(ke,n=>{const i=v.value.findIndex(s=>s.id===n);i!==-1&&v.value.splice(i,1)}),d(Ue,c(()=>n=>Array.isArray(t.value)?r(t.value,n):S(t.value,n))),d(Ie,n=>{if(e.multiple){const i=T(t.value),s=i.findIndex(f=>S(f,n));s!==-1?i.splice(s,1):i.push(n),t.value=i,e.multiple||x()}else t.value=n,x()}),d(Te,c(()=>t.filter)),d(J,c(()=>e.filterable&&t.filter.length>0)),d(Ee,c(()=>e.ticker)),d(Me,c(()=>e.multiple)),d(we,c(()=>p.value));const O=n=>{t.filter=n},k=(n="selected-first")=>{const i=o.value;if(i.length===0){p.value=null;return}if(n==="first"){p.value=i[0].id;return}if(n==="last"){p.value=i[i.length-1].id;return}const s=i.find(f=>Array.isArray(t.value)?r(t.value,f.value):S(t.value,f.value));p.value=s?.id??i[0].id},G=n=>{const i=o.value;if(i.length===0){p.value=null;return}const s=i.findIndex(m=>m.id===p.value),f=s===-1?n>0?0:i.length-1:(s+n+i.length)%i.length;p.value=i[f].id},w=()=>{const n=o.value.find(i=>i.id===p.value);if(n)if(e.multiple){const i=T(t.value),s=i.findIndex(f=>S(f,n.value));s!==-1?i.splice(s,1):i.push(n.value),t.value=i}else t.value=n.value,x()},z=n=>{if(!(e.disabled||e.readonly)){if(n.key==="Escape"){x();return}if(n.key==="Tab"){x();return}if(n.key==="Home"){t.expanded||(t.expanded=!0),k("first");return}if(n.key==="End"){t.expanded||(t.expanded=!0),k("last");return}if(n.key==="ArrowDown"){if(!t.expanded){t.expanded=!0,k("first");return}G(1);return}if(n.key==="ArrowUp"){if(!t.expanded){t.expanded=!0,k("last");return}G(-1);return}if(n.key==="Enter"){if(!t.expanded){t.expanded=!0,k("selected-first");return}w()}}},x=()=>{t.expanded&&(t.expanded=!1,t.filter="",p.value=null)};return V(()=>e.expanded,n=>{t.expanded=n,n||(t.filter="",p.value=null)}),V(()=>e.value,n=>{t.value=n}),V(()=>t.expanded,n=>{n?k("selected-first"):p.value=null}),V(o,()=>{if(!t.expanded)return;o.value.some(i=>i.id===p.value)||k("selected-first")}),(n,i)=>(E(),W(U(Le),null,{default:b(()=>[R(U(Je),{id:y.value,value:t.value,multiple:a.multiple,selection:I.value,filter:t.filter,filterable:a.filterable,clearable:a.clearable,expanded:t.expanded,invalid:a.invalid,disabled:a.disabled,readonly:a.readonly,"placeholder-only":a.placeholderOnly,placeholder:a.placeholder,"textbox-size":a.textboxSize,"active-descendant":p.value,onInput:O,onKeydown:z,"onUpdate:value":i[0]||(i[0]=s=>t.value=s),"onUpdate:expanded":i[1]||(i[1]=s=>t.expanded=s)},null,8,["id","value","multiple","selection","filter","filterable","clearable","expanded","invalid","disabled","readonly","placeholder-only","placeholder","textbox-size","active-descendant"]),R(U(ll),{id:y.value,disabled:a.disabled||a.readonly,multiple:a.multiple,opened:t.expanded,placement:a.placement,"popper-class":a.popperClass,"popper-fit-trigger":a.popperFitTrigger,"popper-options":a.popperOptions,"popper-triggers":a.popperTriggers,readonly:a.readonly,"target-triggers":a.targetTriggers,ticker:a.ticker,filterable:a.filterable,"options-registry":v.value,onHide:x},{default:b(()=>[a.filterable&&v.value.every(s=>!s.isMatched())&&H.value?(E(),q("div",nl,_(H.value),1)):pe("",!0),j(n.$slots,"default")]),_:3},8,["id","disabled","multiple","opened","placement","popper-class","popper-fit-trigger","popper-options","popper-triggers","readonly","target-triggers","ticker","filterable","options-registry"])]),_:3}))}});Ce.__docgenInfo={exportName:"default",displayName:"UiSelect",description:"",tags:{},props:[{name:"id",description:"Атрибут id корневого элемента выпадающего списка. Должен быть уникальным на странице",type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"value",description:"Атрибут value, содержащий выбранный элемент из выпадающего списка",type:{name:"unknown|unknown[]"},defaultValue:{func:!1,value:"undefined"}},{name:"placeholder",description:"Атрибут placeholder нативного поля ввода input",type:{name:"string"},defaultValue:{func:!1,value:"'test'"}},{name:"clearable",description:"Отображает иконку сброса введённого или выбранного значения в виде крестика",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"filterable",description:"Фильтрация строк выпадающего списка на соответствие введённого выражения в input",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"invalid",description:"Подсвечивает поле как содержащее некорректное значение",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"readonly",description:"Устанавливает поле ввода в состояние доступное только для чтения",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",description:"Блокировка поля ввода",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"equalsFn",description:"Функция для проверки равенства элементов",type:{name:"(a: unknown, b: unknown) => boolean"},defaultValue:{func:!0,value:"(a: unknown, b: unknown): boolean => a === b"}},{name:"placement",description:`Сторона цели, у которой появится плавающий элемент,
или подробный объект настройки положения и адаптации положения при нехватке места`,type:{name:"PLACEMENT | `${PLACEMENT}`"},defaultValue:{func:!1,value:"PLACEMENT.BOTTOM"}},{name:"targetTriggers",description:"События целевого элемента, по которым производится переключение видимости",type:{name:"Trigger[] | TriggerSchema"},defaultValue:{func:!0,value:`() => ({
  show: ['click'],
})`}},{name:"popperTriggers",description:"События плавающего элемента, по которым производится переключение видимости",type:{name:"Trigger[] | TriggerSchema"},defaultValue:{func:!0,value:"() => []"}},{name:"popperFitTrigger",description:`Флаг, устанавливающий ширину выпадающего списка по ширине целевого элемента.
По-умолчанию отключает такое поведение`,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"popperClass",description:"Стиль для плавающего элемента",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"popperOptions",description:"Набор свойств плавающего элемента. See @/common/components/popper",type:{name:"UiSelectPopperProperties['popperOptions']"},defaultValue:{func:!0,value:"() => ({})"}},{name:"textboxSize",description:"Размер поля ввода",type:{name:"SIZE | `${SIZE}`"},defaultValue:{func:!1,value:"SIZE.SM"}},{name:"multiple",description:"Наличие множественного выбора среди элементов выпадающего списка",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"expanded",description:"Состояние открытия выпадающего списка",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"placeholderOnly",description:"Устанавливает в качестве выводимого в input значения только содержимое placeholder",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"ticker",description:"Добавляет анимацию показала полной строки при переполнении",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/select/UiSelect.vue"]};const tl={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"};function al(a,e){return E(),q("svg",tl,[...e[0]||(e[0]=[Q("path",{fill:"currentColor","fill-rule":"evenodd",d:"M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10A10 10 0 0 0 12 2m0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16m1-9h2.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H13v2.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V13H8.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5H11V8.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z","clip-rule":"evenodd"},null,-1)])])}const il={render:al},rl="UiMenuItem",ol=Z(rl,[],["default","avatar","leading-icon","description","trailing-icon"]),sl="UiMenuItemGroup",cl=Z(sl,[],["default","option","label","quantity"]),dl=["id","aria-selected","aria-current"],ul=["innerHTML"],pl=["innerHTML"],ml=L({__name:"UiSelectOption",props:{value:{type:null,required:!0},label:{type:String,required:!0},description:{type:String,default:""},active:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},size:{type:String,validator:a=>Object.values(ie).includes(a),default:ie.MD},counter:{type:null,validator:a=>a===null||["string","number"].includes(typeof a),default:null},accent:{type:Boolean,default:!1}},setup(a){const e=a,t=Y("u1-v1-select-option"),h=u(Ue,c(()=>()=>!1)),y=u(Oe,(()=>{})),M=u(ne,()=>{}),H=u(je,()=>{}),v=u(le,()=>{}),p=u(ke,()=>{}),I=u(Ie,()=>{}),T=u(ee,!1),S=u(we,g(null)),r=u(Te,g("")),o=u(J,g(!1)),O=u(Ee,g(!1)),k=u(Me,g(!1)),G=(m,$="font-weight: 500;")=>ze(m,r.value,$),w=c(()=>({label:o.value?G(e.label):e.label,description:o.value?G(e.description,"font-weight: 600;"):e.description})),z=c(()=>w.value.label!==e.label||w.value.description!==e.description),x=c(()=>e.active||S.value===t),n=c(()=>e.active||h.value(e.value)),i=c(()=>!(T||!o.value||z.value)),s=()=>{e.disabled||I(e.value)},f=V([()=>e.label,()=>e.value,()=>e.disabled],([m,$,te],[$e,Ke,Ne])=>{(m!==$e||!_e($,Ke)||te!==Ne)&&y(t,{label:m,value:$,disabled:te})});return Re(()=>{const m={id:t,value:e.value,label:e.label,disabled:e.disabled,isMatched:()=>!o.value||z.value};H(m),M(m)}),me(()=>{f(),p(t),v(t)}),(m,$)=>(E(),q("div",ve({id:U(t)},m.$attrs,{"aria-selected":n.value?"true":"false","aria-current":x.value?"true":void 0,class:{"ui-v1-select-option":!0,"ui-v1-select-option_active":x.value,"ui-v1-select-option_selected":n.value,"ui-v1-select-option_disabled":a.disabled,"ui-v1-select-option_hidden":i.value},role:"option",onClick:s}),[j(m.$slots,"default",{highlight:G,selected:n.value},()=>[R(U(ol),{accent:a.accent,active:x.value,counter:a.counter,disabled:a.disabled,size:a.size,ticker:U(O)},fe({"trailing-icon":b(()=>[j(m.$slots,"trailing-icon",{selected:n.value},()=>[n.value?(E(),W(U(Qe),{key:0,class:"ui-v1-select-option__checkmark-icon","aria-hidden":"true"})):U(k)?(E(),W(U(il),{key:1,class:"ui-v1-select-option__add-icon","aria-hidden":"true"})):pe("",!0)])]),default:b(()=>[j(m.$slots,"value",{selected:n.value},()=>[Q("span",{innerHTML:w.value.label},null,8,ul)])]),_:2},[m.$slots["leading-icon"]?{name:"leading-icon",fn:b(()=>[j(m.$slots,"leading-icon",{selected:n.value})]),key:"0"}:void 0,w.value.description?{name:"description",fn:b(()=>[Q("span",{innerHTML:w.value.description},null,8,pl)]),key:"1"}:void 0]),1032,["accent","active","counter","disabled","size","ticker"])])],16,dl))}});ml.__docgenInfo={exportName:"default",displayName:"UiSelectOption",description:"",tags:{},props:[{name:"value",description:"Значение опции",type:{name:"unknown"},required:!0},{name:"label",description:"Заголовок",type:{name:"string"},required:!0},{name:"description",description:"Описание",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"active",description:"Опция выбрана/не выбрана в списке",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",description:"Заблокированный",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"size",description:"Размер шрифта, иконок и внутренних отступов компонента",type:{name:"SIZE"},defaultValue:{func:!1,value:"SIZE.MD"}},{name:"counter",description:"Счетчик количества",type:{name:"string|number|null"},defaultValue:{func:!1,value:"null"}},{name:"accent",description:"Жирное начертание текста",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default",scoped:!0,description:"Слот для переопределения всего контента опции",bindings:[{name:"highlight",title:"binding"},{name:"selected",title:"binding"}]},{name:"leading-icon",scoped:!0,description:"Иконка слева от заголовка и описания",bindings:[{name:"selected",title:"binding"}]},{name:"value",scoped:!0,description:"Текстовая метка опции",bindings:[{name:"selected",title:"binding"}]},{name:"trailing-icon",scoped:!0,description:"Иконка справа от заголовка и описания",bindings:[{name:"selected",title:"binding"}]}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/select/UiSelectOption.vue"]};const Ve=L({__name:"UiSelectOptionGroupHeader",setup(a){return d(ne,u(He,()=>{})),d(le,u(Ge,()=>{})),d(ee,c(()=>!0)),(e,t)=>(E(),q("div",null,[j(e.$slots,"default")]))}});Ve.__docgenInfo={exportName:"default",displayName:"UiSelectOptionGroupHeader",description:"",tags:{},slots:[{name:"default"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/select/UiSelectOptionGroupHeader.vue"]};const fl=L({__name:"UiSelectOptionGroup",props:{label:{type:String,default:""}},setup(a){const e=Y("u1-v1-select-option-group"),t=g([]),h=g([]),y=g([]),M=(r,o)=>`[${r}] Component with id ${o} already registered. Unregister it before using again.`;d(ne,r=>{if(t.value.some(o=>o.id===r.id))throw new Error(M("UiSelect",r.id));t.value.push(r)}),d(le,r=>{const o=t.value.findIndex(O=>O.id===r);o!==-1&&t.value.splice(o,1)}),d(se,r=>{if(h.value.some(o=>o.id===r.id))throw new Error(M("UiSelectOptionGroup",r.id));h.value.push(r)}),d(ce,r=>{const o=h.value.findIndex(O=>O.id===r);o!==-1&&h.value.splice(o,1)}),d(He,r=>{if(y.value.some(o=>o.id===r.id))throw new Error(M("UiSelectOptionGroupHeader",r.id));y.value.push(r)}),d(Ge,r=>{const o=y.value.findIndex(O=>O.id===r);o!==-1&&y.value.splice(o,1)}),d(ee,c(()=>!1));const H=u(se,()=>{}),v=u(ce,()=>{}),p=u(J,g(!1)),I=c(()=>t.value.filter(r=>r.isMatched()).length+h.value.reduce((r,o)=>r+o.matchedQuantity(),0)),T=c(()=>!!I.value||y.value.some(r=>r.isMatched())||h.value.some(r=>r.isMatched())),S=c(()=>!p.value||T.value);return qe(()=>H({id:e,matchedQuantity:()=>I.value,isMatched:()=>T.value})),me(()=>v(e)),(r,o)=>(E(),q("div",ve(r.$attrs,{class:{"ui-v1-select-option-group":!0,"ui-v1-select-option-group_hidden":S.value}}),[R(U(cl),null,fe({label:b(()=>[j(r.$slots,"label",{},()=>[ae(_(a.label),1)])]),quantity:b(()=>[j(r.$slots,"quantity",{quantity:I.value},()=>[ae(_(I.value),1)])]),default:b(()=>[j(r.$slots,"default")]),_:2},[r.$slots.option?{name:"option",fn:b(()=>[R(Ve,null,{default:b(()=>[j(r.$slots,"option")]),_:3})]),key:"0"}:void 0]),1024)],16))}});fl.__docgenInfo={exportName:"default",displayName:"UiSelectOptionGroup",description:"",tags:{},props:[{name:"label",description:"Заголовок группы опций",type:{name:"string"},defaultValue:{func:!1,value:"''"}}],slots:[{name:"option",description:"Разметка блока группировки опций"},{name:"label",description:"Заголовок"},{name:"quantity",scoped:!0,description:"Счетчик количества элементов внутри группы",bindings:[{name:"quantity",title:"binding"}]},{name:"default",description:"Иное содержимое компонента"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/select/UiSelectOptionGroup.vue"]};function de(a){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...xe(),...a.components};return l.jsxs(l.Fragment,{children:[l.jsx(e.h1,{id:"uiselect",children:"UiSelect"}),`
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
`,l.jsx(C,{of:K}),`
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
`,l.jsx(C,{of:N}),`
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
`,l.jsx(C,{of:P}),`
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
`,l.jsx(C,{of:B}),`
`,l.jsxs(e.h3,{id:"5-readonly-режим",children:["5. ",l.jsx(e.code,{children:"readonly"})," режим"]}),`
`,l.jsx(e.pre,{children:l.jsx(e.code,{className:"language-html",children:`<template>
    <UiSelect readonly placeholder="Пользователь">
        <UiSelectOption value="kyle" label="Kyle Simmons" />
        <UiSelectOption value="eduardo" label="Eduardo Henry" />
    </UiSelect>
</template>
`})}),`
`,l.jsx(C,{of:A}),`
`,l.jsxs(e.h3,{id:"6-disabled-режим",children:["6. ",l.jsx(e.code,{children:"disabled"})," режим"]}),`
`,l.jsx(e.pre,{children:l.jsx(e.code,{className:"language-html",children:`<template>
    <UiSelect disabled placeholder="Пользователь">
        <UiSelectOption value="kyle" label="Kyle Simmons" />
        <UiSelectOption value="eduardo" label="Eduardo Henry" />
    </UiSelect>
</template>
`})}),`
`,l.jsx(C,{of:F}),`
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
`,l.jsx(Xe,{})]})}function vl(a={}){const{wrapper:e}={...xe(),...a.components};return e?l.jsx(e,{...a,children:l.jsx(de,{...a})}):de(a)}const hl=Ae({UiMenuItem:he,UiMenuItemGroup:ye,UiPopperConnector:Se,UiSelectPopper:be,UiSelectTrigger:ge}),ue=Be(),Kl={title:"Components/UiSelect",component:Ce,argTypes:{id:{control:!1},value:{control:!1},expanded:{control:"boolean"},clearable:{control:"boolean"},placeholder:{control:"text"},filterable:{control:"boolean"},invalid:{control:"boolean"},placeholderOnly:{control:"boolean"},readonly:{control:"boolean"},disabled:{control:"boolean"},multiple:{control:"boolean"},ticker:{control:"boolean"},textboxSize:{options:Object.values(De)},placement:{options:Object.values(X)},popperFitTrigger:{control:"boolean"},popperClass:{control:"text"},popperOptions:{control:!1},targetTriggers:{control:!1},popperTriggers:{control:!1}},render:a=>({components:{HostedTree:Pe,UiMenuItem:he,UiMenuItemGroup:ye,UiPopperConnector:Se,UiSelectPopper:be,UiSelectTrigger:ge},setup(){const e=new Worker(new URL(""+new URL("UiSelect.remote-CZbQIEVh.js",import.meta.url).href,import.meta.url),{type:"module"}),t=Ze(e);return t.call.run(ue.receive,a),V(a,h=>{t.call.setProps(h)}),{args:a,provider:hl,receiver:ue}},template:`
      <HostedTree :provider="provider" :receiver="receiver" />
    `}),parameters:{docs:{page:vl},layout:"centered"}},D={args:{placeholder:"test123",ticker:!1,disabled:!1,multiple:!1,filterable:!1}},K={args:{placeholder:"Исполнитель",ticker:!1,disabled:!1,multiple:!1,filterable:!1}},N={args:{placeholder:"Исполнители",ticker:!1,disabled:!1,multiple:!0,clearable:!0,filterable:!1}},P={args:{placeholder:"Найти пользователя",ticker:!1,disabled:!1,multiple:!1,filterable:!0,clearable:!0}},B={args:{placeholder:"Пользователь",value:"Eduardo Henry",ticker:!1,disabled:!1,multiple:!1,filterable:!1,invalid:!0}},A={args:{placeholder:"Пользователь",value:"Kyle Simmmons",ticker:!1,disabled:!1,readonly:!0,multiple:!1,filterable:!1}},F={args:{placeholder:"Пользователь",value:"Philip Williamson",ticker:!1,disabled:!0,multiple:!1,filterable:!1}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'test123',
    ticker: false,
    disabled: false,
    multiple: false,
    filterable: false
  }
}`,...D.parameters?.docs?.source}}};K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'Исполнитель',
    ticker: false,
    disabled: false,
    multiple: false,
    filterable: false
  }
}`,...K.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'Исполнители',
    ticker: false,
    disabled: false,
    multiple: true,
    clearable: true,
    filterable: false
  }
}`,...N.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'Найти пользователя',
    ticker: false,
    disabled: false,
    multiple: false,
    filterable: true,
    clearable: true
  }
}`,...P.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'Пользователь',
    value: 'Eduardo Henry',
    ticker: false,
    disabled: false,
    multiple: false,
    filterable: false,
    invalid: true
  }
}`,...B.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'Пользователь',
    value: 'Kyle Simmmons',
    ticker: false,
    disabled: false,
    readonly: true,
    multiple: false,
    filterable: false
  }
}`,...A.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'Пользователь',
    value: 'Philip Williamson',
    ticker: false,
    disabled: true,
    multiple: false,
    filterable: false
  }
}`,...F.parameters?.docs?.source}}};const Nl=["Sandbox","BasicSingle","MultipleClearable","FilterableSearch","InvalidState","ReadonlyState","DisabledState"];export{K as BasicSingle,F as DisabledState,P as FilterableSearch,B as InvalidState,N as MultipleClearable,A as ReadonlyState,D as Sandbox,Nl as __namedExportsOrder,Kl as default};
