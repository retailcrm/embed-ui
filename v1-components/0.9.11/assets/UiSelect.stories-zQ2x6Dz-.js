import{f as $e}from"./host-C7LJ3PK0.js";import{S as re,_ as Ke}from"./UiMenuItem-DCVt3eff.js";import{P as _,_ as oe,u as J,h as Ce,S as Ve,a as Ne,b as Ae,U as Be}from"./UiSelectTrigger-B_yHtZM1.js";import{_ as Fe}from"./UiPopperConnector-e6jAY4Wr.js";import{h as W,E as Pe,j as c,r as h,p as d,G as V,s as Q,w as g,x as U,i as u,o as E,m as q,t as ee,c as z,D as X,y as me,q as O,a as Y,a7 as Re,L as fe,v as ve,H as qe,C as se}from"./iframe-B1j5So8G.js";import{d as D,a as ze,c as De}from"./createRemoteStoryRender-5KfgoSIz.js";import{S as ce}from"./UiTextbox-BW8Y7qn4.js";import{I as Le}from"./plugin-DCs2e0yD.js";import{b as Ze}from"./UiPopper-C5v21xUb.js";import{I as We}from"./checkmark-circle-6t9sO6iA.js";import{j as l}from"./jsx-runtime-Bne_YqLH.js";import{useMDXComponents as he}from"./index-Ve4Y5j99.js";import{e as $,A as _e}from"./blocks-BRfjt16q.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./composables-DJ2iJmvN.js";import"./caret-down-BKw7zzn-.js";import"./index-BAxMPZdI.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CPs05SzV.js";const ge=Symbol("UiSelectedIsSelected"),be=Symbol("UiSelectRegister"),ye=Symbol("UiSelectSync"),Se=Symbol("UiSelectUnregister"),xe=Symbol("UiSelectToggle"),Ue=Symbol("UiSelectFilter"),le=Symbol("UiSelectFiltered"),Oe=Symbol("UiSelectTicker"),je=Symbol("UiSelectMultiple"),ke=Symbol("UiSelectActiveOptionId"),ne=Symbol("UiSelectFastened"),te=Symbol("UiSelectUnregisterOption"),ae=Symbol("UiSelectRegisterOption"),de=Symbol("UiSelectOptionGroupRegister"),ue=Symbol("UiSelectOptionGroupUnregister"),Ie=Symbol("UiSelectOptionGroupRegisterHeaderOption"),Te=Symbol("UiSelectOptionGroupUnregisterHeaderOption"),Qe="UiSelectTrigger",Xe=D(Qe,["input","focus","blur","keydown","clear","update:value","update:expanded"]),Ye="UiSelectPopper",Je=D(Ye,["update:visible","show","hide","shown","hidden","dispose"]),el="UiSelectOption";D(el);const ll={key:0,class:"ui-v1-select__no-results-text"},Ee=W({inheritAttrs:!1,__name:"UiSelect",props:{id:{type:String,default:void 0},value:{type:null},placeholder:{type:String,default:"test"},clearable:{type:Boolean,default:!1},filterable:{type:Boolean,default:!1},invalid:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},equalsFn:{type:Function,default:(t,e)=>t===e},placement:{type:String,validator:t=>Object.values(_).includes(t),default:_.BOTTOM},targetTriggers:{type:[Array,Object],default:()=>({show:["click"]})},popperTriggers:{type:[Array,Object],default:()=>[]},popperFitTrigger:{type:Boolean,default:!1},popperClass:{type:String,default:null},popperOptions:{type:Object,default:()=>({})},textboxSize:{type:String,validator:t=>Object.values(ce).includes(t),default:ce.SM},multiple:{type:Boolean,default:!1},expanded:{type:Boolean,default:!1},placeholderOnly:{type:Boolean,default:!1},ticker:{type:Boolean,default:!1}},setup(t){const e=t,a=Pe({expanded:e.expanded,filter:"",value:e.value}),b=J("ui-v1-select"),y=c(()=>e.id??b),w=c(()=>oe.init(u(Le,null)?.locale??oe.fallback)),G=c(()=>w.value.t("search.noResult",{filter:a.filter})),v=h([]),p=h(null),I=c(()=>{const n=T(a.value),i=[];return n.forEach(s=>{const f=v.value.find(m=>S(m.value,s));f&&i.push(f)}),i}),T=n=>Array.isArray(n)?[...n]:typeof n=="number"||typeof n=="boolean"||n?[n]:[],S=(n,i)=>e.equalsFn(n,i),r=(n,i)=>n.some(s=>S(s,i)),o=c(()=>v.value.filter(n=>n.isMatched()&&!n.disabled));d(be,n=>{if(v.value.some(i=>i.id===n.id))throw new Error(`[UiSelect] Component with id ${n.id} already registered. Unregister it before using again.`);v.value.push(n)}),d(ye,(n,i)=>{const s=v.value.find(f=>f.id===n);s&&(s.label=i.label,s.value=i.value,s.disabled=i.disabled)}),d(Se,n=>{const i=v.value.findIndex(s=>s.id===n);i!==-1&&v.value.splice(i,1)}),d(ge,c(()=>n=>Array.isArray(a.value)?r(a.value,n):S(a.value,n))),d(xe,n=>{if(e.multiple){const i=T(a.value),s=i.findIndex(f=>S(f,n));s!==-1?i.splice(s,1):i.push(n),a.value=i,e.multiple||x()}else a.value=n,x()}),d(Ue,c(()=>a.filter)),d(le,c(()=>e.filterable&&a.filter.length>0)),d(Oe,c(()=>e.ticker)),d(je,c(()=>e.multiple)),d(ke,c(()=>p.value));const j=n=>{a.filter=n},k=(n="selected-first")=>{const i=o.value;if(i.length===0){p.value=null;return}if(n==="first"){p.value=i[0].id;return}if(n==="last"){p.value=i[i.length-1].id;return}const s=i.find(f=>Array.isArray(a.value)?r(a.value,f.value):S(a.value,f.value));p.value=s?.id??i[0].id},H=n=>{const i=o.value;if(i.length===0){p.value=null;return}const s=i.findIndex(m=>m.id===p.value),f=s===-1?n>0?0:i.length-1:(s+n+i.length)%i.length;p.value=i[f].id},M=()=>{const n=o.value.find(i=>i.id===p.value);if(n)if(e.multiple){const i=T(a.value),s=i.findIndex(f=>S(f,n.value));s!==-1?i.splice(s,1):i.push(n.value),a.value=i}else a.value=n.value,x()},L=n=>{if(!(e.disabled||e.readonly)){if(n.key==="Escape"){x();return}if(n.key==="Tab"){x();return}if(n.key==="Home"){a.expanded||(a.expanded=!0),k("first");return}if(n.key==="End"){a.expanded||(a.expanded=!0),k("last");return}if(n.key==="ArrowDown"){if(!a.expanded){a.expanded=!0,k("first");return}H(1);return}if(n.key==="ArrowUp"){if(!a.expanded){a.expanded=!0,k("last");return}H(-1);return}if(n.key==="Enter"){if(!a.expanded){a.expanded=!0,k("selected-first");return}M()}}},x=()=>{a.expanded&&(a.expanded=!1,a.filter="",p.value=null)};return V(()=>e.expanded,n=>{a.expanded=n,n||(a.filter="",p.value=null)}),V(()=>e.value,n=>{a.value=n}),V(()=>a.expanded,n=>{n?k("selected-first"):p.value=null}),V(o,()=>{if(!a.expanded)return;o.value.some(i=>i.id===p.value)||k("selected-first")}),(n,i)=>(E(),Q(U(ze),null,{default:g(()=>[q(U(Xe),ee({id:y.value,value:a.value,multiple:t.multiple,selection:I.value,filter:a.filter,filterable:t.filterable,clearable:t.clearable,expanded:a.expanded,invalid:t.invalid,disabled:t.disabled,readonly:t.readonly,"placeholder-only":t.placeholderOnly,placeholder:t.placeholder,"textbox-size":t.textboxSize,"active-descendant":p.value},n.$attrs,{onInput:j,onKeydown:L,"onUpdate:value":i[0]||(i[0]=s=>a.value=s),"onUpdate:expanded":i[1]||(i[1]=s=>a.expanded=s)}),null,16,["id","value","multiple","selection","filter","filterable","clearable","expanded","invalid","disabled","readonly","placeholder-only","placeholder","textbox-size","active-descendant"]),q(U(Je),{id:y.value,disabled:t.disabled||t.readonly,multiple:t.multiple,opened:a.expanded,placement:t.placement,"popper-class":t.popperClass,"popper-fit-trigger":t.popperFitTrigger,"popper-options":t.popperOptions,"popper-triggers":t.popperTriggers,readonly:t.readonly,"target-triggers":t.targetTriggers,ticker:t.ticker,filterable:t.filterable,"options-registry":v.value,onHide:x},{default:g(()=>[t.filterable&&v.value.every(s=>!s.isMatched())&&G.value?(E(),z("div",ll,X(G.value),1)):me("",!0),O(n.$slots,"default")]),_:3},8,["id","disabled","multiple","opened","placement","popper-class","popper-fit-trigger","popper-options","popper-triggers","readonly","target-triggers","ticker","filterable","options-registry"])]),_:3}))}});Ee.__docgenInfo={exportName:"default",displayName:"UiSelect",description:"",tags:{},props:[{name:"id",description:"Атрибут id корневого элемента выпадающего списка. Должен быть уникальным на странице",type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"value",description:"Атрибут value, содержащий выбранный элемент из выпадающего списка",type:{name:"unknown|unknown[]"}},{name:"placeholder",description:"Атрибут placeholder нативного поля ввода input",type:{name:"string"},defaultValue:{func:!1,value:"'test'"}},{name:"clearable",description:"Отображает иконку сброса введённого или выбранного значения в виде крестика",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"filterable",description:"Фильтрация строк выпадающего списка на соответствие введённого выражения в input",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"invalid",description:"Подсвечивает поле как содержащее некорректное значение",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"readonly",description:"Устанавливает поле ввода в состояние доступное только для чтения",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",description:"Блокировка поля ввода",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"equalsFn",description:"Функция для проверки равенства элементов",type:{name:"(a: unknown, b: unknown) => boolean"},defaultValue:{func:!0,value:"(a: unknown, b: unknown): boolean => a === b"}},{name:"placement",description:`Сторона цели, у которой появится плавающий элемент,
или подробный объект настройки положения и адаптации положения при нехватке места`,type:{name:"PLACEMENT | `${PLACEMENT}`"},defaultValue:{func:!1,value:"PLACEMENT.BOTTOM"}},{name:"targetTriggers",description:"События целевого элемента, по которым производится переключение видимости",type:{name:"Trigger[] | TriggerSchema"},defaultValue:{func:!0,value:`() => ({
  show: ['click'],
})`}},{name:"popperTriggers",description:"События плавающего элемента, по которым производится переключение видимости",type:{name:"Trigger[] | TriggerSchema"},defaultValue:{func:!0,value:"() => []"}},{name:"popperFitTrigger",description:`Флаг, устанавливающий ширину выпадающего списка по ширине целевого элемента.
По-умолчанию отключает такое поведение`,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"popperClass",description:"Стиль для плавающего элемента",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"popperOptions",description:"Набор свойств плавающего элемента. See @/common/components/popper",type:{name:"UiSelectPopperProperties['popperOptions']"},defaultValue:{func:!0,value:"() => ({})"}},{name:"textboxSize",description:"Размер поля ввода",type:{name:"SIZE | `${SIZE}`"},defaultValue:{func:!1,value:"SIZE.SM"}},{name:"multiple",description:"Наличие множественного выбора среди элементов выпадающего списка",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"expanded",description:"Состояние открытия выпадающего списка",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"placeholderOnly",description:"Устанавливает в качестве выводимого в input значения только содержимое placeholder",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"ticker",description:"Добавляет анимацию показала полной строки при переполнении",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/select/UiSelect.vue"]};const nl={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"};function tl(t,e){return E(),z("svg",nl,[...e[0]||(e[0]=[Y("path",{fill:"currentColor","fill-rule":"evenodd",d:"M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10A10 10 0 0 0 12 2m0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16m1-9h2.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H13v2.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V13H8.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5H11V8.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z","clip-rule":"evenodd"},null,-1)])])}const al={render:tl},il="UiMenuItem",rl=D(il,[],["default","avatar","leading-icon","description","trailing-icon"]),ol="UiMenuItemGroup",sl=D(ol,[],["default","option","label","quantity"]),cl=["id","aria-selected","aria-current"],dl=["innerHTML"],ul=["innerHTML"],pl=W({__name:"UiSelectOption",props:{value:{type:null,required:!0},label:{type:String,required:!0},description:{type:String,default:""},active:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},size:{type:String,validator:t=>Object.values(re).includes(t),default:re.MD},counter:{type:null,validator:t=>t===null||["string","number"].includes(typeof t),default:null},accent:{type:Boolean,default:!1}},setup(t){const e=t,a=J("u1-v1-select-option"),b=u(ge,c(()=>()=>!1)),y=u(ye,(()=>{})),w=u(ae,()=>{}),G=u(be,()=>{}),v=u(te,()=>{}),p=u(Se,()=>{}),I=u(xe,()=>{}),T=u(ne,!1),S=u(ke,h(null)),r=u(Ue,h("")),o=u(le,h(!1)),j=u(Oe,h(!1)),k=u(je,h(!1)),H=(m,C="font-weight: 500;")=>Ce(m,r.value,C),M=c(()=>({label:o.value?H(e.label):e.label,description:o.value?H(e.description,"font-weight: 600;"):e.description})),L=c(()=>M.value.label!==e.label||M.value.description!==e.description),x=c(()=>e.active||S.value===a),n=c(()=>e.active||b.value(e.value)),i=c(()=>!(T||!o.value||L.value)),s=()=>{e.disabled||I(e.value)},f=V([()=>e.label,()=>e.value,()=>e.disabled],([m,C,ie],[Me,Ge,He])=>{(m!==Me||!Ze(C,Ge)||ie!==He)&&y(a,{label:m,value:C,disabled:ie})});return Re(()=>{const m={id:a,value:e.value,label:e.label,disabled:e.disabled,isMatched:()=>!o.value||L.value};G(m),w(m)}),fe(()=>{f(),p(a),v(a)}),(m,C)=>(E(),z("div",ee({id:U(a)},m.$attrs,{"aria-selected":n.value?"true":"false","aria-current":x.value?"true":void 0,class:{"ui-v1-select-option":!0,"ui-v1-select-option_active":x.value,"ui-v1-select-option_selected":n.value,"ui-v1-select-option_disabled":t.disabled,"ui-v1-select-option_hidden":i.value},role:"option",onClick:s}),[O(m.$slots,"default",{highlight:H,selected:n.value},()=>[q(U(rl),{accent:t.accent,active:x.value,counter:t.counter,disabled:t.disabled,size:t.size,ticker:U(j)},ve({"trailing-icon":g(()=>[O(m.$slots,"trailing-icon",{selected:n.value},()=>[n.value?(E(),Q(U(We),{key:0,class:"ui-v1-select-option__checkmark-icon","aria-hidden":"true"})):U(k)?(E(),Q(U(al),{key:1,class:"ui-v1-select-option__add-icon","aria-hidden":"true"})):me("",!0)])]),default:g(()=>[O(m.$slots,"value",{selected:n.value},()=>[Y("span",{innerHTML:M.value.label},null,8,dl)])]),_:2},[m.$slots["leading-icon"]?{name:"leading-icon",fn:g(()=>[O(m.$slots,"leading-icon",{selected:n.value})]),key:"0"}:void 0,M.value.description?{name:"description",fn:g(()=>[Y("span",{innerHTML:M.value.description},null,8,ul)]),key:"1"}:void 0]),1032,["accent","active","counter","disabled","size","ticker"])])],16,cl))}});pl.__docgenInfo={exportName:"default",displayName:"UiSelectOption",description:"",tags:{},props:[{name:"value",description:"Значение опции",type:{name:"unknown"},required:!0},{name:"label",description:"Заголовок",type:{name:"string"},required:!0},{name:"description",description:"Описание",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"active",description:"Опция выбрана/не выбрана в списке",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",description:"Заблокированный",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"size",description:"Размер шрифта, иконок и внутренних отступов компонента",type:{name:"SIZE"},defaultValue:{func:!1,value:"SIZE.MD"}},{name:"counter",description:"Счетчик количества",type:{name:"string|number|null"},defaultValue:{func:!1,value:"null"}},{name:"accent",description:"Жирное начертание текста",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default",scoped:!0,description:"Слот для переопределения всего контента опции",bindings:[{name:"highlight",title:"binding"},{name:"selected",title:"binding"}]},{name:"leading-icon",scoped:!0,description:"Иконка слева от заголовка и описания",bindings:[{name:"selected",title:"binding"}]},{name:"value",scoped:!0,description:"Текстовая метка опции",bindings:[{name:"selected",title:"binding"}]},{name:"trailing-icon",scoped:!0,description:"Иконка справа от заголовка и описания",bindings:[{name:"selected",title:"binding"}]}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/select/UiSelectOption.vue"]};const we=W({__name:"UiSelectOptionGroupHeader",setup(t){return d(ae,u(Ie,()=>{})),d(te,u(Te,()=>{})),d(ne,c(()=>!0)),(e,a)=>(E(),z("div",null,[O(e.$slots,"default")]))}});we.__docgenInfo={exportName:"default",displayName:"UiSelectOptionGroupHeader",description:"",tags:{},slots:[{name:"default"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/select/UiSelectOptionGroupHeader.vue"]};const ml=W({__name:"UiSelectOptionGroup",props:{label:{type:String,default:""}},setup(t){const e=J("u1-v1-select-option-group"),a=h([]),b=h([]),y=h([]),w=(r,o)=>`[${r}] Component with id ${o} already registered. Unregister it before using again.`;d(ae,r=>{if(a.value.some(o=>o.id===r.id))throw new Error(w("UiSelect",r.id));a.value.push(r)}),d(te,r=>{const o=a.value.findIndex(j=>j.id===r);o!==-1&&a.value.splice(o,1)}),d(de,r=>{if(b.value.some(o=>o.id===r.id))throw new Error(w("UiSelectOptionGroup",r.id));b.value.push(r)}),d(ue,r=>{const o=b.value.findIndex(j=>j.id===r);o!==-1&&b.value.splice(o,1)}),d(Ie,r=>{if(y.value.some(o=>o.id===r.id))throw new Error(w("UiSelectOptionGroupHeader",r.id));y.value.push(r)}),d(Te,r=>{const o=y.value.findIndex(j=>j.id===r);o!==-1&&y.value.splice(o,1)}),d(ne,c(()=>!1));const G=u(de,()=>{}),v=u(ue,()=>{}),p=u(le,h(!1)),I=c(()=>a.value.filter(r=>r.isMatched()).length+b.value.reduce((r,o)=>r+o.matchedQuantity(),0)),T=c(()=>!!I.value||y.value.some(r=>r.isMatched())||b.value.some(r=>r.isMatched())),S=c(()=>!p.value||T.value);return qe(()=>G({id:e,matchedQuantity:()=>I.value,isMatched:()=>T.value})),fe(()=>v(e)),(r,o)=>(E(),z("div",ee(r.$attrs,{class:{"ui-v1-select-option-group":!0,"ui-v1-select-option-group_hidden":S.value}}),[q(U(sl),null,ve({label:g(()=>[O(r.$slots,"label",{},()=>[se(X(t.label),1)])]),quantity:g(()=>[O(r.$slots,"quantity",{quantity:I.value},()=>[se(X(I.value),1)])]),default:g(()=>[O(r.$slots,"default")]),_:2},[r.$slots.option?{name:"option",fn:g(()=>[q(we,null,{default:g(()=>[O(r.$slots,"option")]),_:3})]),key:"0"}:void 0]),1024)],16))}});ml.__docgenInfo={exportName:"default",displayName:"UiSelectOptionGroup",description:"",tags:{},props:[{name:"label",description:"Заголовок группы опций",type:{name:"string"},defaultValue:{func:!1,value:"''"}}],slots:[{name:"option",description:"Разметка блока группировки опций"},{name:"label",description:"Заголовок"},{name:"quantity",scoped:!0,description:"Счетчик количества элементов внутри группы",bindings:[{name:"quantity",title:"binding"}]},{name:"default",description:"Иное содержимое компонента"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/select/UiSelectOptionGroup.vue"]};function fl(t){return new Worker(""+new URL("UiSelect.remote-Zmj5IBZs.js",import.meta.url).href,{name:t?.name})}const K=t=>({...t,tags:Array.from(new Set([...t.tags??[],"!dev"]))});function pe(t){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...he(),...t.components};return l.jsxs(l.Fragment,{children:[l.jsx(e.h1,{id:"uiselect",children:"UiSelect"}),`
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
`,l.jsx($,{of:N}),`
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
`,l.jsx($,{of:A}),`
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
`,l.jsx($,{of:B}),`
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
`,l.jsx($,{of:F}),`
`,l.jsxs(e.h3,{id:"5-readonly-режим",children:["5. ",l.jsx(e.code,{children:"readonly"})," режим"]}),`
`,l.jsx(e.pre,{children:l.jsx(e.code,{className:"language-html",children:`<template>
    <UiSelect readonly placeholder="Пользователь">
        <UiSelectOption value="kyle" label="Kyle Simmons" />
        <UiSelectOption value="eduardo" label="Eduardo Henry" />
    </UiSelect>
</template>
`})}),`
`,l.jsx($,{of:P}),`
`,l.jsxs(e.h3,{id:"6-disabled-режим",children:["6. ",l.jsx(e.code,{children:"disabled"})," режим"]}),`
`,l.jsx(e.pre,{children:l.jsx(e.code,{className:"language-html",children:`<template>
    <UiSelect disabled placeholder="Пользователь">
        <UiSelectOption value="kyle" label="Kyle Simmons" />
        <UiSelectOption value="eduardo" label="Eduardo Henry" />
    </UiSelect>
</template>
`})}),`
`,l.jsx($,{of:R}),`
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
`,l.jsx(_e,{})]})}function vl(t={}){const{wrapper:e}={...he(),...t.components};return e?l.jsx(e,{...t,children:l.jsx(pe,{...t})}):pe(t)}const hl=$e({UiMenuItem:Ke,UiMenuItemGroup:Be,UiPopperConnector:Fe,UiSelectPopper:Ae,UiSelectTrigger:Ne}),Vl={title:"Components/UiSelect",component:Ee,argTypes:{id:{control:!1},value:{control:!1},expanded:{control:"boolean"},clearable:{control:"boolean"},placeholder:{control:"text"},filterable:{control:"boolean"},invalid:{control:"boolean"},placeholderOnly:{control:"boolean"},readonly:{control:"boolean"},disabled:{control:"boolean"},multiple:{control:"boolean"},ticker:{control:"boolean"},textboxSize:{options:Object.values(Ve)},placement:{options:Object.values(_)},popperFitTrigger:{control:"boolean"},popperClass:{control:"text"},popperOptions:{control:!1},targetTriggers:{control:!1},popperTriggers:{control:!1}},render:De({provider:hl,worker:fl}),parameters:{docs:{page:vl},layout:"centered"}},Z={args:{placeholder:"test123",ticker:!1,disabled:!1,multiple:!1,filterable:!1}},N=K({args:{placeholder:"Исполнитель",ticker:!1,disabled:!1,multiple:!1,filterable:!1}}),A=K({args:{placeholder:"Исполнители",ticker:!1,disabled:!1,multiple:!0,clearable:!0,filterable:!1}}),B=K({args:{placeholder:"Найти пользователя",ticker:!1,disabled:!1,multiple:!1,filterable:!0,clearable:!0}}),F=K({args:{placeholder:"Пользователь",value:"Eduardo Henry",ticker:!1,disabled:!1,multiple:!1,filterable:!1,invalid:!0}}),P=K({args:{placeholder:"Пользователь",value:"Kyle Simmmons",ticker:!1,disabled:!1,readonly:!0,multiple:!1,filterable:!1}}),R=K({args:{placeholder:"Пользователь",value:"Philip Williamson",ticker:!1,disabled:!0,multiple:!1,filterable:!1}});Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'test123',
    ticker: false,
    disabled: false,
    multiple: false,
    filterable: false
  }
}`,...Z.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    placeholder: 'Исполнитель',
    ticker: false,
    disabled: false,
    multiple: false,
    filterable: false
  }
})`,...N.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    placeholder: 'Исполнители',
    ticker: false,
    disabled: false,
    multiple: true,
    clearable: true,
    filterable: false
  }
})`,...A.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    placeholder: 'Найти пользователя',
    ticker: false,
    disabled: false,
    multiple: false,
    filterable: true,
    clearable: true
  }
})`,...B.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    placeholder: 'Пользователь',
    value: 'Eduardo Henry',
    ticker: false,
    disabled: false,
    multiple: false,
    filterable: false,
    invalid: true
  }
})`,...F.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    placeholder: 'Пользователь',
    value: 'Kyle Simmmons',
    ticker: false,
    disabled: false,
    readonly: true,
    multiple: false,
    filterable: false
  }
})`,...P.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    placeholder: 'Пользователь',
    value: 'Philip Williamson',
    ticker: false,
    disabled: true,
    multiple: false,
    filterable: false
  }
})`,...R.parameters?.docs?.source}}};const Nl=["Sandbox","BasicSingle","MultipleClearable","FilterableSearch","InvalidState","ReadonlyState","DisabledState"];export{N as BasicSingle,R as DisabledState,B as FilterableSearch,F as InvalidState,A as MultipleClearable,P as ReadonlyState,Z as Sandbox,Nl as __namedExportsOrder,Vl as default};
