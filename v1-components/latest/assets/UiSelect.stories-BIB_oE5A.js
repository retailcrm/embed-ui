import{h as Ke}from"./host-snUZa_69.js";import{S as re,_ as Ve}from"./UiMenuItem-CyZwu6lI.js";import{P as Q,_ as se,u as le,h as Ce,S as Ne,a as Be,b as Fe,U as Ae}from"./UiSelectTrigger-DTm0fiok.js";import{_ as Pe}from"./UiPopperConnector-Cpnndhi4.js";import{h as X,O as Re,j as d,r as y,a4 as qe,p as c,w as K,y as J,z as b,E as j,i as m,o as T,m as D,A as te,c as W,t as Y,J as fe,q as k,a as ee,a5 as De,U as ve,D as he,P as We,N as de}from"./iframe-BzpaBgH4.js";import{d as z,a as O,n as ze,c as Le}from"./createRemoteStoryRender-541bjmDf.js";import{a as Ze}from"./popper-CCIRAluS.js";import{W as Xe,i as _e,S as ce}from"./UiTextbox-CzJ1LZqo.js";import{I as Qe}from"./plugin-B_50sdWD.js";import{b as Je}from"./UiPopper-C2QacKCe.js";import{I as Ye}from"./checkmark-circle-Ct9wTGmj.js";import{d as V}from"./docsOnlyStory-D04fiwRX.js";import{j as l}from"./jsx-runtime-D34IIhkc.js";import{useMDXComponents as ge}from"./index-C-cn5rLx.js";import{S as G,A as el}from"./blocks-CRv7d3wl.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./composables-BsWAZrdj.js";import"./caret-down-CDR-lWVb.js";import"./index-BAxMPZdI.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Bs7sCYJD.js";const ye=Symbol("UiSelectedIsSelected"),be=Symbol("UiSelectRegister"),Se=Symbol("UiSelectSync"),xe=Symbol("UiSelectUnregister"),Ue=Symbol("UiSelectToggle"),Oe=Symbol("UiSelectFilter"),ne=Symbol("UiSelectFiltered"),je=Symbol("UiSelectTicker"),ke=Symbol("UiSelectMultiple"),Ie=Symbol("UiSelectActiveOptionId"),ae=Symbol("UiSelectFastened"),ie=Symbol("UiSelectUnregisterOption"),oe=Symbol("UiSelectRegisterOption"),ue=Symbol("UiSelectOptionGroupRegister"),pe=Symbol("UiSelectOptionGroupUnregister"),Te=Symbol("UiSelectOptionGroupRegisterHeaderOption"),we=Symbol("UiSelectOptionGroupUnregisterHeaderOption"),ll="UiSelectTrigger",tl=z(ll,{emits:["input","focus","blur","keydown","clear","update:value","update:expanded"],methods:{open:O(),close:O(),onClick:O(),onKeyDown:O(),onInput:O(),onFocus:O(),onBlur:O(),onClear:O()}}),nl="UiSelectPopper",al=z(nl,{emits:["update:visible","show","hide","shown","hidden","dispose"],methods:{autoScroll:O(),updateWidth:O()}}),il="UiSelectOption";z(il);const ol={key:0,class:"ui-v1-select__no-results-text"},Ee=X({inheritAttrs:!1,__name:"UiSelect",props:{id:{type:String,default:void 0},value:{type:null},placeholder:{type:String,default:"test"},clearable:{type:Boolean,default:!1},filterable:{type:Boolean,default:!1},invalid:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},equalsFn:{type:Function,default:(a,e)=>a===e},placement:{type:String,validator:a=>Object.values(Q).includes(a),default:Q.BOTTOM},targetTriggers:{type:[Array,Object],default:()=>({show:["click"]})},popperTriggers:{type:[Array,Object],default:()=>[]},popperFitTrigger:{type:Boolean,default:!1},popperClass:{type:String,default:null},popperOptions:{type:Object,default:()=>({})},textboxSize:{type:String,validator:a=>Object.values(ce).includes(a),default:ce.SM},width:{type:[Number,String],validator:_e,default:Xe.FIT},multiple:{type:Boolean,default:!1},expanded:{type:Boolean,default:!1},placeholderOnly:{type:Boolean,default:!1},ticker:{type:Boolean,default:!1}},setup(a){const e=a,n=Re({expanded:e.expanded,filter:"",value:e.value}),S=le("ui-v1-select"),x=d(()=>e.id??S),w=d(()=>se.init(m(Qe,null)?.locale??se.fallback)),M=d(()=>w.value.t("search.noResult",{filter:n.filter})),v=y([]),u=y(null),U=qe("popper"),H=d(()=>{const t=E(n.value),i=[];return t.forEach(r=>{const p=v.value.find($=>o($.value,r));p&&i.push(p)}),i}),E=t=>Array.isArray(t)?[...t]:typeof t=="number"||typeof t=="boolean"||t?[t]:[],o=(t,i)=>e.equalsFn(t,i),s=(t,i)=>t.some(r=>o(r,i)),h=d(()=>v.value.filter(t=>t.isMatched()&&!t.disabled));c(be,t=>{if(v.value.some(i=>i.id===t.id))throw new Error(`[UiSelect] Component with id ${t.id} already registered. Unregister it before using again.`);v.value.push(t)}),c(Se,(t,i)=>{const r=v.value.find(p=>p.id===t);r&&(r.label=i.label,r.value=i.value,r.disabled=i.disabled)}),c(xe,t=>{const i=v.value.findIndex(r=>r.id===t);i!==-1&&v.value.splice(i,1)}),c(ye,d(()=>t=>Array.isArray(n.value)?s(n.value,t):o(n.value,t))),c(Ue,t=>{if(e.multiple){const i=E(n.value),r=i.findIndex(p=>o(p,t));r!==-1?i.splice(r,1):i.push(t),n.value=i,e.multiple||f()}else n.value=t,f()}),c(Oe,d(()=>n.filter)),c(ne,d(()=>e.filterable&&n.filter.length>0)),c(je,d(()=>e.ticker)),c(ke,d(()=>e.multiple)),c(Ie,d(()=>u.value));const _=t=>{n.filter=t},g=(t="selected-first")=>{const i=h.value;if(i.length===0){u.value=null;return}if(t==="first"){u.value=i[0].id;return}if(t==="last"){u.value=i[i.length-1].id;return}const r=i.find(p=>Array.isArray(n.value)?s(n.value,p.value):o(n.value,p.value));u.value=r?.id??i[0].id},I=t=>{const i=h.value;if(i.length===0){u.value=null;return}const r=i.findIndex($=>$.id===u.value),p=r===-1?t>0?0:i.length-1:(r+t+i.length)%i.length;u.value=i[p].id},L=()=>{const t=h.value.find(i=>i.id===u.value);if(t)if(e.multiple){const i=E(n.value),r=i.findIndex(p=>o(p,t.value));r!==-1?i.splice(r,1):i.push(t.value),n.value=i}else n.value=t.value,f()},C=t=>{if(!(e.disabled||e.readonly)){if(t.key==="Escape"){f();return}if(t.key==="Tab"){f();return}if(t.key==="Home"){n.expanded||(n.expanded=!0),g("first");return}if(t.key==="End"){n.expanded||(n.expanded=!0),g("last");return}if(t.key==="ArrowDown"){if(!n.expanded){n.expanded=!0,g("first");return}I(1);return}if(t.key==="ArrowUp"){if(!n.expanded){n.expanded=!0,g("last");return}I(-1);return}if(t.key==="Enter"){if(!n.expanded){n.expanded=!0,g("selected-first");return}L()}}},f=()=>{n.expanded&&(n.expanded=!1,n.filter="",u.value=null)},N=async()=>{n.expanded&&(await ze(),await U.value?.updateWidth(),await U.value?.autoScroll())};return K(()=>e.expanded,t=>{n.expanded=t,t||(n.filter="",u.value=null)}),K(()=>e.value,t=>{n.value=t}),K(()=>n.expanded,t=>{t?(g("selected-first"),N()):u.value=null}),K(h,()=>{if(!n.expanded)return;h.value.some(i=>i.id===u.value)||(g("selected-first"),N())}),K(u,(t,i)=>{!n.expanded||t===i||N()}),(t,i)=>(T(),J(j(Ze),null,{default:b(()=>[D(j(tl),te({id:x.value,value:n.value,multiple:a.multiple,selection:H.value,filter:n.filter,filterable:a.filterable,clearable:a.clearable,expanded:n.expanded,invalid:a.invalid,disabled:a.disabled,readonly:a.readonly,"placeholder-only":a.placeholderOnly,placeholder:a.placeholder,"textbox-size":a.textboxSize,width:a.width,"active-descendant":u.value},t.$attrs,{onInput:_,onKeydown:C,"onUpdate:value":i[0]||(i[0]=r=>n.value=r),"onUpdate:expanded":i[1]||(i[1]=r=>n.expanded=r)}),null,16,["id","value","multiple","selection","filter","filterable","clearable","expanded","invalid","disabled","readonly","placeholder-only","placeholder","textbox-size","width","active-descendant"]),D(j(al),{id:x.value,ref_key:"popper",ref:U,disabled:a.disabled||a.readonly,multiple:a.multiple,opened:n.expanded,placement:a.placement,"popper-class":a.popperClass,"popper-fit-trigger":a.popperFitTrigger,"popper-options":a.popperOptions,"popper-triggers":a.popperTriggers,readonly:a.readonly,"target-triggers":a.targetTriggers,ticker:a.ticker,filterable:a.filterable,"options-registry":v.value,onHide:f},{default:b(()=>[a.filterable&&v.value.every(r=>!r.isMatched())&&M.value?(T(),W("div",ol,Y(M.value),1)):fe("",!0),k(t.$slots,"default")]),_:3},8,["id","disabled","multiple","opened","placement","popper-class","popper-fit-trigger","popper-options","popper-triggers","readonly","target-triggers","ticker","filterable","options-registry"])]),_:3}))}});Ee.__docgenInfo={exportName:"default",displayName:"UiSelect",description:"",tags:{},props:[{name:"id",description:"Атрибут id корневого элемента выпадающего списка. Должен быть уникальным на странице",type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"value",description:"Атрибут value, содержащий выбранный элемент из выпадающего списка",type:{name:"unknown|unknown[]"}},{name:"placeholder",description:"Атрибут placeholder нативного поля ввода input",type:{name:"string"},defaultValue:{func:!1,value:"'test'"}},{name:"clearable",description:"Отображает иконку сброса введённого или выбранного значения в виде крестика",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"filterable",description:"Фильтрация строк выпадающего списка на соответствие введённого выражения в input",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"invalid",description:"Подсвечивает поле как содержащее некорректное значение",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"readonly",description:"Устанавливает поле ввода в состояние доступное только для чтения",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",description:"Блокировка поля ввода",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"equalsFn",description:"Функция для проверки равенства элементов",type:{name:"(a: unknown, b: unknown) => boolean"},defaultValue:{func:!0,value:"(a: unknown, b: unknown): boolean => a === b"}},{name:"placement",description:`Сторона цели, у которой появится плавающий элемент,
или подробный объект настройки положения и адаптации положения при нехватке места`,type:{name:"PLACEMENT | `${PLACEMENT}`"},defaultValue:{func:!1,value:"PLACEMENT.BOTTOM"}},{name:"targetTriggers",description:"События целевого элемента, по которым производится переключение видимости",type:{name:"Trigger[] | TriggerSchema"},defaultValue:{func:!0,value:`() => ({
  show: ['click'],
})`}},{name:"popperTriggers",description:"События плавающего элемента, по которым производится переключение видимости",type:{name:"Trigger[] | TriggerSchema"},defaultValue:{func:!0,value:"() => []"}},{name:"popperFitTrigger",description:`Флаг, устанавливающий ширину выпадающего списка по ширине целевого элемента.
По-умолчанию отключает такое поведение`,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"popperClass",description:"Стиль для плавающего элемента",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"popperOptions",description:"Набор свойств плавающего элемента. See @/common/components/popper",type:{name:"UiSelectPopperProperties['popperOptions']"},defaultValue:{func:!0,value:"() => ({})"}},{name:"textboxSize",description:"Размер поля ввода",type:{name:"SIZE | `${SIZE}`"},defaultValue:{func:!1,value:"SIZE.SM"}},{name:"width",description:"Ширина селекта. fit — по содержимому, fluid — на всю ширину контейнера",type:{name:"WidthValue"},defaultValue:{func:!1,value:"WIDTH.FIT"}},{name:"multiple",description:"Наличие множественного выбора среди элементов выпадающего списка",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"expanded",description:"Состояние открытия выпадающего списка",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"placeholderOnly",description:"Устанавливает в качестве выводимого в input значения только содержимое placeholder",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"ticker",description:"Добавляет анимацию показала полной строки при переполнении",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/select/UiSelect.vue"]};const rl={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"};function sl(a,e){return T(),W("svg",rl,[...e[0]||(e[0]=[ee("path",{fill:"currentColor","fill-rule":"evenodd",d:"M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10A10 10 0 0 0 12 2m0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16m1-9h2.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H13v2.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V13H8.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5H11V8.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z","clip-rule":"evenodd"},null,-1)])])}const dl={render:sl},cl="UiMenuItem",ul=z(cl,[],["default","avatar","leading-icon","description","trailing-icon"]),pl="UiMenuItemGroup",ml=z(pl,[],["default","option","label","quantity"]),fl=["id","aria-selected","aria-current"],vl=["innerHTML"],hl=["innerHTML"],gl=X({__name:"UiSelectOption",props:{value:{type:null,required:!0},label:{type:String,required:!0},description:{type:String,default:""},active:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},size:{type:String,validator:a=>Object.values(re).includes(a),default:re.MD},counter:{type:null,validator:a=>a===null||["string","number"].includes(typeof a),default:null},accent:{type:Boolean,default:!1}},setup(a){const e=a,n=le("u1-v1-select-option"),S=m(ye,d(()=>()=>!1)),x=m(Se,(()=>{})),w=m(oe,()=>{}),M=m(be,()=>{}),v=m(ie,()=>{}),u=m(xe,()=>{}),U=m(Ue,()=>{}),H=m(ae,!1),E=m(Ie,y(null)),o=m(Oe,y("")),s=m(ne,y(!1)),h=m(je,y(!1)),_=m(ke,y(!1)),g=(r,p="font-weight: 500;")=>Ce(r,o.value,p),I=d(()=>({label:s.value?g(e.label):e.label,description:s.value?g(e.description,"font-weight: 600;"):e.description})),L=d(()=>I.value.label!==e.label||I.value.description!==e.description),C=d(()=>e.active||E.value===n),f=d(()=>e.active||S.value(e.value)),N=d(()=>!(H||!s.value||L.value)),t=()=>{e.disabled||U(e.value)},i=K([()=>e.label,()=>e.value,()=>e.disabled],([r,p,$],[He,$e,Ge])=>{(r!==He||!Je(p,$e)||$!==Ge)&&x(n,{label:r,value:p,disabled:$})});return De(()=>{const r={id:n,value:e.value,label:e.label,disabled:e.disabled,isMatched:()=>!s.value||L.value};M(r),w(r)}),ve(()=>{i(),u(n),v(n)}),(r,p)=>(T(),W("div",te({id:j(n)},r.$attrs,{"aria-selected":f.value?"true":"false","aria-current":C.value?"true":void 0,class:{"ui-v1-select-option":!0,"ui-v1-select-option_active":C.value,"ui-v1-select-option_selected":f.value,"ui-v1-select-option_disabled":a.disabled,"ui-v1-select-option_hidden":N.value},role:"option",onClick:t}),[k(r.$slots,"default",{highlight:g,selected:f.value},()=>[D(j(ul),{accent:a.accent,active:C.value,counter:a.counter,disabled:a.disabled,size:a.size,ticker:j(h)},he({"trailing-icon":b(()=>[k(r.$slots,"trailing-icon",{selected:f.value},()=>[f.value?(T(),J(j(Ye),{key:0,class:"ui-v1-select-option__checkmark-icon","aria-hidden":"true"})):j(_)?(T(),J(j(dl),{key:1,class:"ui-v1-select-option__add-icon","aria-hidden":"true"})):fe("",!0)])]),default:b(()=>[k(r.$slots,"value",{selected:f.value},()=>[ee("span",{innerHTML:I.value.label},null,8,vl)])]),_:2},[r.$slots["leading-icon"]?{name:"leading-icon",fn:b(()=>[k(r.$slots,"leading-icon",{selected:f.value})]),key:"0"}:void 0,I.value.description?{name:"description",fn:b(()=>[ee("span",{innerHTML:I.value.description},null,8,hl)]),key:"1"}:void 0]),1032,["accent","active","counter","disabled","size","ticker"])])],16,fl))}});gl.__docgenInfo={exportName:"default",displayName:"UiSelectOption",description:"",tags:{},props:[{name:"value",description:"Значение опции",type:{name:"unknown"},required:!0},{name:"label",description:"Заголовок",type:{name:"string"},required:!0},{name:"description",description:"Описание",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"active",description:"Опция выбрана/не выбрана в списке",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",description:"Заблокированный",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"size",description:"Размер шрифта, иконок и внутренних отступов компонента",type:{name:"SIZE"},defaultValue:{func:!1,value:"SIZE.MD"}},{name:"counter",description:"Счетчик количества",type:{name:"string|number|null"},defaultValue:{func:!1,value:"null"}},{name:"accent",description:"Жирное начертание текста",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default",scoped:!0,description:"Слот для переопределения всего контента опции",bindings:[{name:"highlight",title:"binding"},{name:"selected",title:"binding"}]},{name:"leading-icon",scoped:!0,description:"Иконка слева от заголовка и описания",bindings:[{name:"selected",title:"binding"}]},{name:"value",scoped:!0,description:"Текстовая метка опции",bindings:[{name:"selected",title:"binding"}]},{name:"trailing-icon",scoped:!0,description:"Иконка справа от заголовка и описания",bindings:[{name:"selected",title:"binding"}]}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/select/UiSelectOption.vue"]};const Me=X({__name:"UiSelectOptionGroupHeader",setup(a){return c(oe,m(Te,()=>{})),c(ie,m(we,()=>{})),c(ae,d(()=>!0)),(e,n)=>(T(),W("div",null,[k(e.$slots,"default")]))}});Me.__docgenInfo={exportName:"default",displayName:"UiSelectOptionGroupHeader",description:"",tags:{},slots:[{name:"default"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/select/UiSelectOptionGroupHeader.vue"]};const yl=X({__name:"UiSelectOptionGroup",props:{label:{type:String,default:""}},setup(a){const e=le("u1-v1-select-option-group"),n=y([]),S=y([]),x=y([]),w=(o,s)=>`[${o}] Component with id ${s} already registered. Unregister it before using again.`;c(oe,o=>{if(n.value.some(s=>s.id===o.id))throw new Error(w("UiSelect",o.id));n.value.push(o)}),c(ie,o=>{const s=n.value.findIndex(h=>h.id===o);s!==-1&&n.value.splice(s,1)}),c(ue,o=>{if(S.value.some(s=>s.id===o.id))throw new Error(w("UiSelectOptionGroup",o.id));S.value.push(o)}),c(pe,o=>{const s=S.value.findIndex(h=>h.id===o);s!==-1&&S.value.splice(s,1)}),c(Te,o=>{if(x.value.some(s=>s.id===o.id))throw new Error(w("UiSelectOptionGroupHeader",o.id));x.value.push(o)}),c(we,o=>{const s=x.value.findIndex(h=>h.id===o);s!==-1&&x.value.splice(s,1)}),c(ae,d(()=>!1));const M=m(ue,()=>{}),v=m(pe,()=>{}),u=m(ne,y(!1)),U=d(()=>n.value.filter(o=>o.isMatched()).length+S.value.reduce((o,s)=>o+s.matchedQuantity(),0)),H=d(()=>!!U.value||x.value.some(o=>o.isMatched())||S.value.some(o=>o.isMatched())),E=d(()=>!u.value||H.value);return We(()=>M({id:e,matchedQuantity:()=>U.value,isMatched:()=>H.value})),ve(()=>v(e)),(o,s)=>(T(),W("div",te(o.$attrs,{class:{"ui-v1-select-option-group":!0,"ui-v1-select-option-group_hidden":E.value}}),[D(j(ml),null,he({label:b(()=>[k(o.$slots,"label",{},()=>[de(Y(a.label),1)])]),quantity:b(()=>[k(o.$slots,"quantity",{quantity:U.value},()=>[de(Y(U.value),1)])]),default:b(()=>[k(o.$slots,"default")]),_:2},[o.$slots.option?{name:"option",fn:b(()=>[D(Me,null,{default:b(()=>[k(o.$slots,"option")]),_:3})]),key:"0"}:void 0]),1024)],16))}});yl.__docgenInfo={exportName:"default",displayName:"UiSelectOptionGroup",description:"",tags:{},props:[{name:"label",description:"Заголовок группы опций",type:{name:"string"},defaultValue:{func:!1,value:"''"}}],slots:[{name:"option",description:"Разметка блока группировки опций"},{name:"label",description:"Заголовок"},{name:"quantity",scoped:!0,description:"Счетчик количества элементов внутри группы",bindings:[{name:"quantity",title:"binding"}]},{name:"default",description:"Иное содержимое компонента"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/select/UiSelectOptionGroup.vue"]};function bl(a){return new Worker(""+new URL("UiSelect.remote-BjOsMXmD.js",import.meta.url).href,{name:a?.name})}function me(a){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...ge(),...a.components};return l.jsxs(l.Fragment,{children:[l.jsx(e.h1,{id:"uiselect",children:"UiSelect"}),`
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
`,l.jsx(G,{of:B}),`
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
`,l.jsx(G,{of:F}),`
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
`,l.jsx(G,{of:A}),`
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
`,l.jsx(G,{of:P}),`
`,l.jsxs(e.h3,{id:"5-readonly-режим",children:["5. ",l.jsx(e.code,{children:"readonly"})," режим"]}),`
`,l.jsx(e.pre,{children:l.jsx(e.code,{className:"language-html",children:`<template>
    <UiSelect readonly placeholder="Пользователь">
        <UiSelectOption value="kyle" label="Kyle Simmons" />
        <UiSelectOption value="eduardo" label="Eduardo Henry" />
    </UiSelect>
</template>
`})}),`
`,l.jsx(G,{of:R}),`
`,l.jsxs(e.h3,{id:"6-disabled-режим",children:["6. ",l.jsx(e.code,{children:"disabled"})," режим"]}),`
`,l.jsx(e.pre,{children:l.jsx(e.code,{className:"language-html",children:`<template>
    <UiSelect disabled placeholder="Пользователь">
        <UiSelectOption value="kyle" label="Kyle Simmons" />
        <UiSelectOption value="eduardo" label="Eduardo Henry" />
    </UiSelect>
</template>
`})}),`
`,l.jsx(G,{of:q}),`
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
`,l.jsx(el,{})]})}function Sl(a={}){const{wrapper:e}={...ge(),...a.components};return e?l.jsx(e,{...a,children:l.jsx(me,{...a})}):me(a)}const xl=Ke({UiMenuItem:Ve,UiMenuItemGroup:Ae,UiPopperConnector:Pe,UiSelectPopper:Fe,UiSelectTrigger:Be}),ql={title:"Components/UiSelect",component:Ee,argTypes:{id:{control:!1},value:{control:!1},expanded:{control:"boolean"},clearable:{control:"boolean"},placeholder:{control:"text"},filterable:{control:"boolean"},invalid:{control:"boolean"},placeholderOnly:{control:"boolean"},readonly:{control:"boolean"},disabled:{control:"boolean"},multiple:{control:"boolean"},ticker:{control:"boolean"},width:{control:"text"},textboxSize:{options:Object.values(Ne)},placement:{options:Object.values(Q)},popperFitTrigger:{control:"boolean"},popperClass:{control:"text"},popperOptions:{control:!1},targetTriggers:{control:!1},popperTriggers:{control:!1}},render:Le({provider:xl,worker:bl}),parameters:{docs:{page:Sl},layout:"centered"}},Z={args:{placeholder:"test123",ticker:!1,disabled:!1,multiple:!1,filterable:!1,width:"fit"}},B=V({args:{placeholder:"Исполнитель",ticker:!1,disabled:!1,multiple:!1,filterable:!1}}),F=V({args:{placeholder:"Исполнители",ticker:!1,disabled:!1,multiple:!0,clearable:!0,filterable:!1}}),A=V({args:{placeholder:"Найти пользователя",ticker:!1,disabled:!1,multiple:!1,filterable:!0,clearable:!0}}),P=V({args:{placeholder:"Пользователь",value:"Eduardo Henry",ticker:!1,disabled:!1,multiple:!1,filterable:!1,invalid:!0}}),R=V({args:{placeholder:"Пользователь",value:"Kyle Simmmons",ticker:!1,disabled:!1,readonly:!0,multiple:!1,filterable:!1}}),q=V({args:{placeholder:"Пользователь",value:"Philip Williamson",ticker:!1,disabled:!0,multiple:!1,filterable:!1}});Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'test123',
    ticker: false,
    disabled: false,
    multiple: false,
    filterable: false,
    width: 'fit'
  }
}`,...Z.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    placeholder: 'Исполнитель',
    ticker: false,
    disabled: false,
    multiple: false,
    filterable: false
  }
})`,...B.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    placeholder: 'Исполнители',
    ticker: false,
    disabled: false,
    multiple: true,
    clearable: true,
    filterable: false
  }
})`,...F.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    placeholder: 'Найти пользователя',
    ticker: false,
    disabled: false,
    multiple: false,
    filterable: true,
    clearable: true
  }
})`,...A.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`docsOnlyStory({
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
})`,...q.parameters?.docs?.source}}};const Dl=["Sandbox","BasicSingle","MultipleClearable","FilterableSearch","InvalidState","ReadonlyState","DisabledState"];export{B as BasicSingle,q as DisabledState,A as FilterableSearch,P as InvalidState,F as MultipleClearable,R as ReadonlyState,Z as Sandbox,Dl as __namedExportsOrder,ql as default};
