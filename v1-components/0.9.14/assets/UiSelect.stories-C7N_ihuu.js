import{h as Ke}from"./host-D2YvtsC6.js";import{S as re,_ as $e}from"./UiMenuItem-QstNIx_H.js";import{P as X,_ as se,u as le,h as Ve,S as Ne,a as Be,b as Ae,U as Fe}from"./UiSelectTrigger-Ej6kyexd.js";import{_ as Pe}from"./UiPopperConnector-EJU8rjKl.js";import{h as _,E as Re,j as d,r as b,a7 as qe,p as c,G as K,s as Y,w as y,x as j,i as m,o as T,m as z,t as ne,c as D,D as J,z as fe,q as k,a as ee,a8 as ze,L as ve,v as he,H as De,C as de}from"./iframe-CzYs1BjE.js";import{d as L,a as O,n as Le,c as We}from"./createRemoteStoryRender-romReRJZ.js";import{a as Ze}from"./popper-DpO_Y52G.js";import{S as ce}from"./UiTextbox-BGqfWgVD.js";import{I as _e}from"./plugin-4DvlS7Sf.js";import{b as Qe}from"./UiPopper-FDzTy8d3.js";import{I as Xe}from"./checkmark-circle-CqRijsdg.js";import{d as $}from"./docsOnlyStory-D04fiwRX.js";import{j as l}from"./jsx-runtime-CLYr9vDv.js";import{useMDXComponents as ge}from"./index-DXIs0Z_P.js";import{e as H,A as Ye}from"./blocks-BSwO8k7m.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./composables-DIK_niTW.js";import"./caret-down-BmpKNKVU.js";import"./index-BAxMPZdI.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BTaHYB_U.js";const be=Symbol("UiSelectedIsSelected"),ye=Symbol("UiSelectRegister"),Se=Symbol("UiSelectSync"),xe=Symbol("UiSelectUnregister"),Ue=Symbol("UiSelectToggle"),Oe=Symbol("UiSelectFilter"),te=Symbol("UiSelectFiltered"),je=Symbol("UiSelectTicker"),ke=Symbol("UiSelectMultiple"),Ie=Symbol("UiSelectActiveOptionId"),ae=Symbol("UiSelectFastened"),ie=Symbol("UiSelectUnregisterOption"),oe=Symbol("UiSelectRegisterOption"),ue=Symbol("UiSelectOptionGroupRegister"),pe=Symbol("UiSelectOptionGroupUnregister"),Te=Symbol("UiSelectOptionGroupRegisterHeaderOption"),we=Symbol("UiSelectOptionGroupUnregisterHeaderOption"),Je="UiSelectTrigger",el=L(Je,{emits:["input","focus","blur","keydown","clear","update:value","update:expanded"],methods:{open:O(),close:O(),onClick:O(),onKeyDown:O(),onInput:O(),onFocus:O(),onBlur:O(),onClear:O()}}),ll="UiSelectPopper",nl=L(ll,{emits:["update:visible","show","hide","shown","hidden","dispose"],methods:{autoScroll:O(),updateWidth:O()}}),tl="UiSelectOption";L(tl);const al={key:0,class:"ui-v1-select__no-results-text"},Ee=_({inheritAttrs:!1,__name:"UiSelect",props:{id:{type:String,default:void 0},value:{type:null},placeholder:{type:String,default:"test"},clearable:{type:Boolean,default:!1},filterable:{type:Boolean,default:!1},invalid:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},equalsFn:{type:Function,default:(a,e)=>a===e},placement:{type:String,validator:a=>Object.values(X).includes(a),default:X.BOTTOM},targetTriggers:{type:[Array,Object],default:()=>({show:["click"]})},popperTriggers:{type:[Array,Object],default:()=>[]},popperFitTrigger:{type:Boolean,default:!1},popperClass:{type:String,default:null},popperOptions:{type:Object,default:()=>({})},textboxSize:{type:String,validator:a=>Object.values(ce).includes(a),default:ce.SM},multiple:{type:Boolean,default:!1},expanded:{type:Boolean,default:!1},placeholderOnly:{type:Boolean,default:!1},ticker:{type:Boolean,default:!1}},setup(a){const e=a,t=Re({expanded:e.expanded,filter:"",value:e.value}),S=le("ui-v1-select"),x=d(()=>e.id??S),w=d(()=>se.init(m(_e,null)?.locale??se.fallback)),M=d(()=>w.value.t("search.noResult",{filter:t.filter})),v=b([]),u=b(null),U=qe("popper"),C=d(()=>{const n=E(t.value),i=[];return n.forEach(r=>{const p=v.value.find(G=>o(G.value,r));p&&i.push(p)}),i}),E=n=>Array.isArray(n)?[...n]:typeof n=="number"||typeof n=="boolean"||n?[n]:[],o=(n,i)=>e.equalsFn(n,i),s=(n,i)=>n.some(r=>o(r,i)),h=d(()=>v.value.filter(n=>n.isMatched()&&!n.disabled));c(ye,n=>{if(v.value.some(i=>i.id===n.id))throw new Error(`[UiSelect] Component with id ${n.id} already registered. Unregister it before using again.`);v.value.push(n)}),c(Se,(n,i)=>{const r=v.value.find(p=>p.id===n);r&&(r.label=i.label,r.value=i.value,r.disabled=i.disabled)}),c(xe,n=>{const i=v.value.findIndex(r=>r.id===n);i!==-1&&v.value.splice(i,1)}),c(be,d(()=>n=>Array.isArray(t.value)?s(t.value,n):o(t.value,n))),c(Ue,n=>{if(e.multiple){const i=E(t.value),r=i.findIndex(p=>o(p,n));r!==-1?i.splice(r,1):i.push(n),t.value=i,e.multiple||f()}else t.value=n,f()}),c(Oe,d(()=>t.filter)),c(te,d(()=>e.filterable&&t.filter.length>0)),c(je,d(()=>e.ticker)),c(ke,d(()=>e.multiple)),c(Ie,d(()=>u.value));const Q=n=>{t.filter=n},g=(n="selected-first")=>{const i=h.value;if(i.length===0){u.value=null;return}if(n==="first"){u.value=i[0].id;return}if(n==="last"){u.value=i[i.length-1].id;return}const r=i.find(p=>Array.isArray(t.value)?s(t.value,p.value):o(t.value,p.value));u.value=r?.id??i[0].id},I=n=>{const i=h.value;if(i.length===0){u.value=null;return}const r=i.findIndex(G=>G.id===u.value),p=r===-1?n>0?0:i.length-1:(r+n+i.length)%i.length;u.value=i[p].id},W=()=>{const n=h.value.find(i=>i.id===u.value);if(n)if(e.multiple){const i=E(t.value),r=i.findIndex(p=>o(p,n.value));r!==-1?i.splice(r,1):i.push(n.value),t.value=i}else t.value=n.value,f()},V=n=>{if(!(e.disabled||e.readonly)){if(n.key==="Escape"){f();return}if(n.key==="Tab"){f();return}if(n.key==="Home"){t.expanded||(t.expanded=!0),g("first");return}if(n.key==="End"){t.expanded||(t.expanded=!0),g("last");return}if(n.key==="ArrowDown"){if(!t.expanded){t.expanded=!0,g("first");return}I(1);return}if(n.key==="ArrowUp"){if(!t.expanded){t.expanded=!0,g("last");return}I(-1);return}if(n.key==="Enter"){if(!t.expanded){t.expanded=!0,g("selected-first");return}W()}}},f=()=>{t.expanded&&(t.expanded=!1,t.filter="",u.value=null)},N=async()=>{t.expanded&&(await Le(),await U.value?.updateWidth(),await U.value?.autoScroll())};return K(()=>e.expanded,n=>{t.expanded=n,n||(t.filter="",u.value=null)}),K(()=>e.value,n=>{t.value=n}),K(()=>t.expanded,n=>{n?(g("selected-first"),N()):u.value=null}),K(h,()=>{if(!t.expanded)return;h.value.some(i=>i.id===u.value)||(g("selected-first"),N())}),K(u,(n,i)=>{!t.expanded||n===i||N()}),(n,i)=>(T(),Y(j(Ze),null,{default:y(()=>[z(j(el),ne({id:x.value,value:t.value,multiple:a.multiple,selection:C.value,filter:t.filter,filterable:a.filterable,clearable:a.clearable,expanded:t.expanded,invalid:a.invalid,disabled:a.disabled,readonly:a.readonly,"placeholder-only":a.placeholderOnly,placeholder:a.placeholder,"textbox-size":a.textboxSize,"active-descendant":u.value},n.$attrs,{onInput:Q,onKeydown:V,"onUpdate:value":i[0]||(i[0]=r=>t.value=r),"onUpdate:expanded":i[1]||(i[1]=r=>t.expanded=r)}),null,16,["id","value","multiple","selection","filter","filterable","clearable","expanded","invalid","disabled","readonly","placeholder-only","placeholder","textbox-size","active-descendant"]),z(j(nl),{id:x.value,ref_key:"popper",ref:U,disabled:a.disabled||a.readonly,multiple:a.multiple,opened:t.expanded,placement:a.placement,"popper-class":a.popperClass,"popper-fit-trigger":a.popperFitTrigger,"popper-options":a.popperOptions,"popper-triggers":a.popperTriggers,readonly:a.readonly,"target-triggers":a.targetTriggers,ticker:a.ticker,filterable:a.filterable,"options-registry":v.value,onHide:f},{default:y(()=>[a.filterable&&v.value.every(r=>!r.isMatched())&&M.value?(T(),D("div",al,J(M.value),1)):fe("",!0),k(n.$slots,"default")]),_:3},8,["id","disabled","multiple","opened","placement","popper-class","popper-fit-trigger","popper-options","popper-triggers","readonly","target-triggers","ticker","filterable","options-registry"])]),_:3}))}});Ee.__docgenInfo={exportName:"default",displayName:"UiSelect",description:"",tags:{},props:[{name:"id",description:"Атрибут id корневого элемента выпадающего списка. Должен быть уникальным на странице",type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"value",description:"Атрибут value, содержащий выбранный элемент из выпадающего списка",type:{name:"unknown|unknown[]"}},{name:"placeholder",description:"Атрибут placeholder нативного поля ввода input",type:{name:"string"},defaultValue:{func:!1,value:"'test'"}},{name:"clearable",description:"Отображает иконку сброса введённого или выбранного значения в виде крестика",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"filterable",description:"Фильтрация строк выпадающего списка на соответствие введённого выражения в input",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"invalid",description:"Подсвечивает поле как содержащее некорректное значение",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"readonly",description:"Устанавливает поле ввода в состояние доступное только для чтения",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",description:"Блокировка поля ввода",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"equalsFn",description:"Функция для проверки равенства элементов",type:{name:"(a: unknown, b: unknown) => boolean"},defaultValue:{func:!0,value:"(a: unknown, b: unknown): boolean => a === b"}},{name:"placement",description:`Сторона цели, у которой появится плавающий элемент,
или подробный объект настройки положения и адаптации положения при нехватке места`,type:{name:"PLACEMENT | `${PLACEMENT}`"},defaultValue:{func:!1,value:"PLACEMENT.BOTTOM"}},{name:"targetTriggers",description:"События целевого элемента, по которым производится переключение видимости",type:{name:"Trigger[] | TriggerSchema"},defaultValue:{func:!0,value:`() => ({
  show: ['click'],
})`}},{name:"popperTriggers",description:"События плавающего элемента, по которым производится переключение видимости",type:{name:"Trigger[] | TriggerSchema"},defaultValue:{func:!0,value:"() => []"}},{name:"popperFitTrigger",description:`Флаг, устанавливающий ширину выпадающего списка по ширине целевого элемента.
По-умолчанию отключает такое поведение`,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"popperClass",description:"Стиль для плавающего элемента",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"popperOptions",description:"Набор свойств плавающего элемента. See @/common/components/popper",type:{name:"UiSelectPopperProperties['popperOptions']"},defaultValue:{func:!0,value:"() => ({})"}},{name:"textboxSize",description:"Размер поля ввода",type:{name:"SIZE | `${SIZE}`"},defaultValue:{func:!1,value:"SIZE.SM"}},{name:"multiple",description:"Наличие множественного выбора среди элементов выпадающего списка",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"expanded",description:"Состояние открытия выпадающего списка",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"placeholderOnly",description:"Устанавливает в качестве выводимого в input значения только содержимое placeholder",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"ticker",description:"Добавляет анимацию показала полной строки при переполнении",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/select/UiSelect.vue"]};const il={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"};function ol(a,e){return T(),D("svg",il,[...e[0]||(e[0]=[ee("path",{fill:"currentColor","fill-rule":"evenodd",d:"M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10A10 10 0 0 0 12 2m0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16m1-9h2.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H13v2.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V13H8.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5H11V8.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z","clip-rule":"evenodd"},null,-1)])])}const rl={render:ol},sl="UiMenuItem",dl=L(sl,[],["default","avatar","leading-icon","description","trailing-icon"]),cl="UiMenuItemGroup",ul=L(cl,[],["default","option","label","quantity"]),pl=["id","aria-selected","aria-current"],ml=["innerHTML"],fl=["innerHTML"],vl=_({__name:"UiSelectOption",props:{value:{type:null,required:!0},label:{type:String,required:!0},description:{type:String,default:""},active:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},size:{type:String,validator:a=>Object.values(re).includes(a),default:re.MD},counter:{type:null,validator:a=>a===null||["string","number"].includes(typeof a),default:null},accent:{type:Boolean,default:!1}},setup(a){const e=a,t=le("u1-v1-select-option"),S=m(be,d(()=>()=>!1)),x=m(Se,(()=>{})),w=m(oe,()=>{}),M=m(ye,()=>{}),v=m(ie,()=>{}),u=m(xe,()=>{}),U=m(Ue,()=>{}),C=m(ae,!1),E=m(Ie,b(null)),o=m(Oe,b("")),s=m(te,b(!1)),h=m(je,b(!1)),Q=m(ke,b(!1)),g=(r,p="font-weight: 500;")=>Ve(r,o.value,p),I=d(()=>({label:s.value?g(e.label):e.label,description:s.value?g(e.description,"font-weight: 600;"):e.description})),W=d(()=>I.value.label!==e.label||I.value.description!==e.description),V=d(()=>e.active||E.value===t),f=d(()=>e.active||S.value(e.value)),N=d(()=>!(C||!s.value||W.value)),n=()=>{e.disabled||U(e.value)},i=K([()=>e.label,()=>e.value,()=>e.disabled],([r,p,G],[Ce,Ge,He])=>{(r!==Ce||!Qe(p,Ge)||G!==He)&&x(t,{label:r,value:p,disabled:G})});return ze(()=>{const r={id:t,value:e.value,label:e.label,disabled:e.disabled,isMatched:()=>!s.value||W.value};M(r),w(r)}),ve(()=>{i(),u(t),v(t)}),(r,p)=>(T(),D("div",ne({id:j(t)},r.$attrs,{"aria-selected":f.value?"true":"false","aria-current":V.value?"true":void 0,class:{"ui-v1-select-option":!0,"ui-v1-select-option_active":V.value,"ui-v1-select-option_selected":f.value,"ui-v1-select-option_disabled":a.disabled,"ui-v1-select-option_hidden":N.value},role:"option",onClick:n}),[k(r.$slots,"default",{highlight:g,selected:f.value},()=>[z(j(dl),{accent:a.accent,active:V.value,counter:a.counter,disabled:a.disabled,size:a.size,ticker:j(h)},he({"trailing-icon":y(()=>[k(r.$slots,"trailing-icon",{selected:f.value},()=>[f.value?(T(),Y(j(Xe),{key:0,class:"ui-v1-select-option__checkmark-icon","aria-hidden":"true"})):j(Q)?(T(),Y(j(rl),{key:1,class:"ui-v1-select-option__add-icon","aria-hidden":"true"})):fe("",!0)])]),default:y(()=>[k(r.$slots,"value",{selected:f.value},()=>[ee("span",{innerHTML:I.value.label},null,8,ml)])]),_:2},[r.$slots["leading-icon"]?{name:"leading-icon",fn:y(()=>[k(r.$slots,"leading-icon",{selected:f.value})]),key:"0"}:void 0,I.value.description?{name:"description",fn:y(()=>[ee("span",{innerHTML:I.value.description},null,8,fl)]),key:"1"}:void 0]),1032,["accent","active","counter","disabled","size","ticker"])])],16,pl))}});vl.__docgenInfo={exportName:"default",displayName:"UiSelectOption",description:"",tags:{},props:[{name:"value",description:"Значение опции",type:{name:"unknown"},required:!0},{name:"label",description:"Заголовок",type:{name:"string"},required:!0},{name:"description",description:"Описание",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"active",description:"Опция выбрана/не выбрана в списке",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",description:"Заблокированный",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"size",description:"Размер шрифта, иконок и внутренних отступов компонента",type:{name:"SIZE"},defaultValue:{func:!1,value:"SIZE.MD"}},{name:"counter",description:"Счетчик количества",type:{name:"string|number|null"},defaultValue:{func:!1,value:"null"}},{name:"accent",description:"Жирное начертание текста",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default",scoped:!0,description:"Слот для переопределения всего контента опции",bindings:[{name:"highlight",title:"binding"},{name:"selected",title:"binding"}]},{name:"leading-icon",scoped:!0,description:"Иконка слева от заголовка и описания",bindings:[{name:"selected",title:"binding"}]},{name:"value",scoped:!0,description:"Текстовая метка опции",bindings:[{name:"selected",title:"binding"}]},{name:"trailing-icon",scoped:!0,description:"Иконка справа от заголовка и описания",bindings:[{name:"selected",title:"binding"}]}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/select/UiSelectOption.vue"]};const Me=_({__name:"UiSelectOptionGroupHeader",setup(a){return c(oe,m(Te,()=>{})),c(ie,m(we,()=>{})),c(ae,d(()=>!0)),(e,t)=>(T(),D("div",null,[k(e.$slots,"default")]))}});Me.__docgenInfo={exportName:"default",displayName:"UiSelectOptionGroupHeader",description:"",tags:{},slots:[{name:"default"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/select/UiSelectOptionGroupHeader.vue"]};const hl=_({__name:"UiSelectOptionGroup",props:{label:{type:String,default:""}},setup(a){const e=le("u1-v1-select-option-group"),t=b([]),S=b([]),x=b([]),w=(o,s)=>`[${o}] Component with id ${s} already registered. Unregister it before using again.`;c(oe,o=>{if(t.value.some(s=>s.id===o.id))throw new Error(w("UiSelect",o.id));t.value.push(o)}),c(ie,o=>{const s=t.value.findIndex(h=>h.id===o);s!==-1&&t.value.splice(s,1)}),c(ue,o=>{if(S.value.some(s=>s.id===o.id))throw new Error(w("UiSelectOptionGroup",o.id));S.value.push(o)}),c(pe,o=>{const s=S.value.findIndex(h=>h.id===o);s!==-1&&S.value.splice(s,1)}),c(Te,o=>{if(x.value.some(s=>s.id===o.id))throw new Error(w("UiSelectOptionGroupHeader",o.id));x.value.push(o)}),c(we,o=>{const s=x.value.findIndex(h=>h.id===o);s!==-1&&x.value.splice(s,1)}),c(ae,d(()=>!1));const M=m(ue,()=>{}),v=m(pe,()=>{}),u=m(te,b(!1)),U=d(()=>t.value.filter(o=>o.isMatched()).length+S.value.reduce((o,s)=>o+s.matchedQuantity(),0)),C=d(()=>!!U.value||x.value.some(o=>o.isMatched())||S.value.some(o=>o.isMatched())),E=d(()=>!u.value||C.value);return De(()=>M({id:e,matchedQuantity:()=>U.value,isMatched:()=>C.value})),ve(()=>v(e)),(o,s)=>(T(),D("div",ne(o.$attrs,{class:{"ui-v1-select-option-group":!0,"ui-v1-select-option-group_hidden":E.value}}),[z(j(ul),null,he({label:y(()=>[k(o.$slots,"label",{},()=>[de(J(a.label),1)])]),quantity:y(()=>[k(o.$slots,"quantity",{quantity:U.value},()=>[de(J(U.value),1)])]),default:y(()=>[k(o.$slots,"default")]),_:2},[o.$slots.option?{name:"option",fn:y(()=>[z(Me,null,{default:y(()=>[k(o.$slots,"option")]),_:3})]),key:"0"}:void 0]),1024)],16))}});hl.__docgenInfo={exportName:"default",displayName:"UiSelectOptionGroup",description:"",tags:{},props:[{name:"label",description:"Заголовок группы опций",type:{name:"string"},defaultValue:{func:!1,value:"''"}}],slots:[{name:"option",description:"Разметка блока группировки опций"},{name:"label",description:"Заголовок"},{name:"quantity",scoped:!0,description:"Счетчик количества элементов внутри группы",bindings:[{name:"quantity",title:"binding"}]},{name:"default",description:"Иное содержимое компонента"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/select/UiSelectOptionGroup.vue"]};function gl(a){return new Worker(""+new URL("UiSelect.remote-CwjKQj_3.js",import.meta.url).href,{name:a?.name})}function me(a){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...ge(),...a.components};return l.jsxs(l.Fragment,{children:[l.jsx(e.h1,{id:"uiselect",children:"UiSelect"}),`
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
`,l.jsx(H,{of:B}),`
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
`,l.jsx(H,{of:A}),`
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
`,l.jsx(H,{of:F}),`
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
`,l.jsx(H,{of:P}),`
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
`,l.jsx(H,{of:q}),`
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
`,l.jsx(Ye,{})]})}function bl(a={}){const{wrapper:e}={...ge(),...a.components};return e?l.jsx(e,{...a,children:l.jsx(me,{...a})}):me(a)}const yl=Ke({UiMenuItem:$e,UiMenuItemGroup:Fe,UiPopperConnector:Pe,UiSelectPopper:Ae,UiSelectTrigger:Be}),Pl={title:"Components/UiSelect",component:Ee,argTypes:{id:{control:!1},value:{control:!1},expanded:{control:"boolean"},clearable:{control:"boolean"},placeholder:{control:"text"},filterable:{control:"boolean"},invalid:{control:"boolean"},placeholderOnly:{control:"boolean"},readonly:{control:"boolean"},disabled:{control:"boolean"},multiple:{control:"boolean"},ticker:{control:"boolean"},textboxSize:{options:Object.values(Ne)},placement:{options:Object.values(X)},popperFitTrigger:{control:"boolean"},popperClass:{control:"text"},popperOptions:{control:!1},targetTriggers:{control:!1},popperTriggers:{control:!1}},render:We({provider:yl,worker:gl}),parameters:{docs:{page:bl},layout:"centered"}},Z={args:{placeholder:"test123",ticker:!1,disabled:!1,multiple:!1,filterable:!1}},B=$({args:{placeholder:"Исполнитель",ticker:!1,disabled:!1,multiple:!1,filterable:!1}}),A=$({args:{placeholder:"Исполнители",ticker:!1,disabled:!1,multiple:!0,clearable:!0,filterable:!1}}),F=$({args:{placeholder:"Найти пользователя",ticker:!1,disabled:!1,multiple:!1,filterable:!0,clearable:!0}}),P=$({args:{placeholder:"Пользователь",value:"Eduardo Henry",ticker:!1,disabled:!1,multiple:!1,filterable:!1,invalid:!0}}),R=$({args:{placeholder:"Пользователь",value:"Kyle Simmmons",ticker:!1,disabled:!1,readonly:!0,multiple:!1,filterable:!1}}),q=$({args:{placeholder:"Пользователь",value:"Philip Williamson",ticker:!1,disabled:!0,multiple:!1,filterable:!1}});Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'test123',
    ticker: false,
    disabled: false,
    multiple: false,
    filterable: false
  }
}`,...Z.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    placeholder: 'Исполнитель',
    ticker: false,
    disabled: false,
    multiple: false,
    filterable: false
  }
})`,...B.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    placeholder: 'Исполнители',
    ticker: false,
    disabled: false,
    multiple: true,
    clearable: true,
    filterable: false
  }
})`,...A.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    placeholder: 'Найти пользователя',
    ticker: false,
    disabled: false,
    multiple: false,
    filterable: true,
    clearable: true
  }
})`,...F.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    placeholder: 'Пользователь',
    value: 'Eduardo Henry',
    ticker: false,
    disabled: false,
    multiple: false,
    filterable: false,
    invalid: true
  }
})`,...P.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    placeholder: 'Пользователь',
    value: 'Kyle Simmmons',
    ticker: false,
    disabled: false,
    readonly: true,
    multiple: false,
    filterable: false
  }
})`,...R.parameters?.docs?.source}}};q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    placeholder: 'Пользователь',
    value: 'Philip Williamson',
    ticker: false,
    disabled: true,
    multiple: false,
    filterable: false
  }
})`,...q.parameters?.docs?.source}}};const Rl=["Sandbox","BasicSingle","MultipleClearable","FilterableSearch","InvalidState","ReadonlyState","DisabledState"];export{B as BasicSingle,q as DisabledState,F as FilterableSearch,P as InvalidState,A as MultipleClearable,R as ReadonlyState,Z as Sandbox,Rl as __namedExportsOrder,Pl as default};
