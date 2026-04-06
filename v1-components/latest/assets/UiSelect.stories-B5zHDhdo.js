import{h as Ge}from"./host-DJiie6wH.js";import{S as ce,_ as Ke}from"./UiMenuItem-CHGdgk2W.js";import{P as ee,_ as ue,u as ae,h as Ce,S as Ne,a as Ae,b as Fe,U as Be}from"./UiSelectTrigger-CctTbmuU.js";import{_ as Pe}from"./UiPopperConnector-awwMp4eP.js";import{h as X,O as Re,j as c,r as x,a4 as qe,p,w as K,y as le,z as U,E as k,i as m,o as E,m as D,A as ie,c as z,t as ne,J as ge,q as I,a as te,a5 as We,U as ye,D as be,P as De,N as pe}from"./iframe-D1v8aj2J.js";import{d as L,a as j,n as ze,c as Le}from"./createRemoteStoryRender-D0g6XXeI.js";import{a as Ze}from"./popper-Bx4hZkij.js";import{W as _e,i as Qe,S as me}from"./UiTextbox-iKaU8dyK.js";import{I as Xe}from"./plugin-1GBkN3fH.js";import{b as Je}from"./UiPopper-R2Okej2s.js";import{I as Ye}from"./checkmark-circle-DvpB4vKS.js";import{d as C}from"./docsOnlyStory-D04fiwRX.js";import{j as l}from"./jsx-runtime-ClSgB0tP.js";import{useMDXComponents as Se}from"./index-BcU0IgrJ.js";import{S as G,A as el}from"./blocks-D9_kj3CA.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./composables-CsRkzQ-G.js";import"./caret-down-CBt_rfGf.js";import"./index-BAxMPZdI.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B4jHIdoR.js";const xe=Symbol("UiSelectedIsSelected"),Ue=Symbol("UiSelectRegister"),Oe=Symbol("UiSelectSync"),je=Symbol("UiSelectUnregister"),ke=Symbol("UiSelectToggle"),Ie=Symbol("UiSelectFilter"),oe=Symbol("UiSelectFiltered"),we=Symbol("UiSelectTicker"),Te=Symbol("UiSelectMultiple"),Ee=Symbol("UiSelectActiveOptionId"),re=Symbol("UiSelectFastened"),se=Symbol("UiSelectUnregisterOption"),de=Symbol("UiSelectRegisterOption"),fe=Symbol("UiSelectOptionGroupRegister"),ve=Symbol("UiSelectOptionGroupUnregister"),Me=Symbol("UiSelectOptionGroupRegisterHeaderOption"),He=Symbol("UiSelectOptionGroupUnregisterHeaderOption"),ll="UiSelectTrigger",nl=L(ll,{emits:["input","focus","blur","keydown","clear","update:value","update:expanded"],methods:{open:j(),close:j(),onClick:j(),onKeyDown:j(),onInput:j(),onFocus:j(),onBlur:j(),onClear:j()}}),tl="UiSelectPopper",al=L(tl,{emits:["update:visible","show","hide","shown","hidden","dispose"],methods:{autoScroll:j(),updateWidth:j()}}),il="UiSelectOption";L(il);const ol={key:0,class:"ui-v1-select__no-results-text"},Ve=X({inheritAttrs:!1,__name:"UiSelect",props:{id:{type:String,default:void 0},value:{type:null},placeholder:{type:String,default:"test"},clearable:{type:Boolean,default:!1},filterable:{type:Boolean,default:!1},invalid:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},equalsFn:{type:Function,default:(t,e)=>t===e},placement:{type:String,validator:t=>Object.values(ee).includes(t),default:ee.BOTTOM},targetTriggers:{type:[Array,Object],default:()=>({show:["click"]})},popperTriggers:{type:[Array,Object],default:()=>[]},popperFitTrigger:{type:Boolean,default:!1},popperClass:{type:String,default:null},popperOptions:{type:Object,default:()=>({})},textboxSize:{type:String,validator:t=>Object.values(me).includes(t),default:me.SM},width:{type:[Number,String],validator:Qe,default:_e.FIT},multiple:{type:Boolean,default:!1},expanded:{type:Boolean,default:!1},placeholderOnly:{type:Boolean,default:!1},ticker:{type:Boolean,default:!1}},emits:["change","update:value"],setup(t,{emit:e}){const v=e,d=t,i=Re({expanded:d.expanded,filter:"",value:d.value}),M=ae("ui-v1-select"),V=c(()=>d.id??M),N=c(()=>ue.init(m(Xe,null)?.locale??ue.fallback)),$=c(()=>N.value.t("search.noResult",{filter:i.filter})),h=x([]),u=x(null),H=qe("popper"),o=c(()=>{const n=s(i.value),a=[];return n.forEach(r=>{const g=h.value.find(A=>y(A.value,r));g&&a.push(g)}),a}),s=n=>Array.isArray(n)?[...n]:typeof n=="number"||typeof n=="boolean"||n?[n]:[],y=(n,a)=>d.equalsFn(n,a),Z=(n,a)=>n.some(r=>y(r,a)),w=c(()=>h.value.filter(n=>n.isMatched()&&!n.disabled)),b=n=>{i.value=n,v("change",n),v("update:value",n)};p(Ue,n=>{if(h.value.some(a=>a.id===n.id))throw new Error(`[UiSelect] Component with id ${n.id} already registered. Unregister it before using again.`);h.value.push(n)}),p(Oe,(n,a)=>{const r=h.value.find(g=>g.id===n);r&&(r.label=a.label,r.value=a.value,r.disabled=a.disabled)}),p(je,n=>{const a=h.value.findIndex(r=>r.id===n);a!==-1&&h.value.splice(a,1)}),p(xe,c(()=>n=>Array.isArray(i.value)?Z(i.value,n):y(i.value,n))),p(ke,n=>{if(d.multiple){const a=s(i.value),r=a.findIndex(g=>y(g,n));r!==-1?a.splice(r,1):a.push(n),b(a),d.multiple||T()}else b(n),T()}),p(Ie,c(()=>i.filter)),p(oe,c(()=>d.filterable&&i.filter.length>0)),p(we,c(()=>d.ticker)),p(Te,c(()=>d.multiple)),p(Ee,c(()=>u.value));const _=n=>{i.filter=n},S=(n="selected-first")=>{const a=w.value;if(a.length===0){u.value=null;return}if(n==="first"){u.value=a[0].id;return}if(n==="last"){u.value=a[a.length-1].id;return}const r=a.find(g=>Array.isArray(i.value)?Z(i.value,g.value):y(i.value,g.value));u.value=r?.id??a[0].id},O=n=>{const a=w.value;if(a.length===0){u.value=null;return}const r=a.findIndex(A=>A.id===u.value),g=r===-1?n>0?0:a.length-1:(r+n+a.length)%a.length;u.value=a[g].id},J=()=>{const n=w.value.find(a=>a.id===u.value);if(n)if(d.multiple){const a=s(i.value),r=a.findIndex(g=>y(g,n.value));r!==-1?a.splice(r,1):a.push(n.value),b(a)}else b(n.value),T()},Y=n=>{if(!(d.disabled||d.readonly)){if(n.key==="Escape"){T();return}if(n.key==="Tab"){T();return}if(n.key==="Home"){i.expanded||(i.expanded=!0),S("first");return}if(n.key==="End"){i.expanded||(i.expanded=!0),S("last");return}if(n.key==="ArrowDown"){if(!i.expanded){i.expanded=!0,S("first");return}O(1);return}if(n.key==="ArrowUp"){if(!i.expanded){i.expanded=!0,S("last");return}O(-1);return}if(n.key==="Enter"){if(!i.expanded){i.expanded=!0,S("selected-first");return}J()}}},T=()=>{i.expanded&&(i.expanded=!1,i.filter="",u.value=null)},f=async()=>{i.expanded&&(await ze(),await H.value?.updateWidth(),await H.value?.autoScroll())};return K(()=>d.expanded,n=>{i.expanded=n,n||(i.filter="",u.value=null)}),K(()=>d.value,n=>{i.value=n}),K(()=>i.expanded,n=>{n?(S("selected-first"),f()):u.value=null}),K(w,()=>{if(!i.expanded)return;w.value.some(a=>a.id===u.value)||(S("selected-first"),f())}),K(u,(n,a)=>{!i.expanded||n===a||f()}),(n,a)=>(E(),le(k(Ze),null,{default:U(()=>[D(k(nl),ie({id:V.value,value:i.value,multiple:t.multiple,selection:o.value,filter:i.filter,filterable:t.filterable,clearable:t.clearable,expanded:i.expanded,invalid:t.invalid,disabled:t.disabled,readonly:t.readonly,"placeholder-only":t.placeholderOnly,placeholder:t.placeholder,"textbox-size":t.textboxSize,width:t.width,"active-descendant":u.value},n.$attrs,{onInput:_,onKeydown:Y,"onUpdate:value":a[0]||(a[0]=r=>b(r)),"onUpdate:expanded":a[1]||(a[1]=r=>i.expanded=r)}),null,16,["id","value","multiple","selection","filter","filterable","clearable","expanded","invalid","disabled","readonly","placeholder-only","placeholder","textbox-size","width","active-descendant"]),D(k(al),{id:V.value,ref_key:"popper",ref:H,disabled:t.disabled||t.readonly,multiple:t.multiple,opened:i.expanded,placement:t.placement,"popper-class":t.popperClass,"popper-fit-trigger":t.popperFitTrigger,"popper-options":t.popperOptions,"popper-triggers":t.popperTriggers,readonly:t.readonly,"target-triggers":t.targetTriggers,ticker:t.ticker,filterable:t.filterable,"options-registry":h.value,onHide:T},{default:U(()=>[t.filterable&&h.value.every(r=>!r.isMatched())&&$.value?(E(),z("div",ol,ne($.value),1)):ge("",!0),I(n.$slots,"default")]),_:3},8,["id","disabled","multiple","opened","placement","popper-class","popper-fit-trigger","popper-options","popper-triggers","readonly","target-triggers","ticker","filterable","options-registry"])]),_:3}))}});Ve.__docgenInfo={exportName:"default",displayName:"UiSelect",description:"",tags:{},props:[{name:"id",description:"Атрибут id корневого элемента выпадающего списка. Должен быть уникальным на странице",type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"value",description:"Атрибут value, содержащий выбранный элемент из выпадающего списка",type:{name:"unknown|unknown[]"}},{name:"placeholder",description:"Атрибут placeholder нативного поля ввода input",type:{name:"string"},defaultValue:{func:!1,value:"'test'"}},{name:"clearable",description:"Отображает иконку сброса введённого или выбранного значения в виде крестика",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"filterable",description:"Фильтрация строк выпадающего списка на соответствие введённого выражения в input",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"invalid",description:"Подсвечивает поле как содержащее некорректное значение",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"readonly",description:"Устанавливает поле ввода в состояние доступное только для чтения",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",description:"Блокировка поля ввода",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"equalsFn",description:"Функция для проверки равенства элементов",type:{name:"(a: unknown, b: unknown) => boolean"},defaultValue:{func:!0,value:"(a: unknown, b: unknown): boolean => a === b"}},{name:"placement",description:`Сторона цели, у которой появится плавающий элемент,
или подробный объект настройки положения и адаптации положения при нехватке места`,type:{name:"PLACEMENT | `${PLACEMENT}`"},defaultValue:{func:!1,value:"PLACEMENT.BOTTOM"}},{name:"targetTriggers",description:"События целевого элемента, по которым производится переключение видимости",type:{name:"Trigger[] | TriggerSchema"},defaultValue:{func:!0,value:`() => ({
  show: ['click'],
})`}},{name:"popperTriggers",description:"События плавающего элемента, по которым производится переключение видимости",type:{name:"Trigger[] | TriggerSchema"},defaultValue:{func:!0,value:"() => []"}},{name:"popperFitTrigger",description:`Флаг, устанавливающий ширину выпадающего списка по ширине целевого элемента.
По-умолчанию отключает такое поведение`,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"popperClass",description:"Стиль для плавающего элемента",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"popperOptions",description:"Набор свойств плавающего элемента. See @/common/components/popper",type:{name:"UiSelectPopperProperties['popperOptions']"},defaultValue:{func:!0,value:"() => ({})"}},{name:"textboxSize",description:"Размер поля ввода",type:{name:"SIZE | `${SIZE}`"},defaultValue:{func:!1,value:"SIZE.SM"}},{name:"width",description:"Ширина селекта. fit — по содержимому, fluid — на всю ширину контейнера",type:{name:"WidthValue"},defaultValue:{func:!1,value:"WIDTH.FIT"}},{name:"multiple",description:"Наличие множественного выбора среди элементов выпадающего списка",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"expanded",description:"Состояние открытия выпадающего списка",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"placeholderOnly",description:"Устанавливает в качестве выводимого в input значения только содержимое placeholder",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"ticker",description:"Добавляет анимацию показала полной строки при переполнении",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"change",type:{names:["union"],elements:[{name:"unknown"},{name:"Array",elements:[{name:"unknown"}]}]}},{name:"update:value",type:{names:["union"],elements:[{name:"unknown"},{name:"Array",elements:[{name:"unknown"}]}]}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/select/UiSelect.vue"]};const rl={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"};function sl(t,e){return E(),z("svg",rl,[...e[0]||(e[0]=[te("path",{fill:"currentColor","fill-rule":"evenodd",d:"M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10A10 10 0 0 0 12 2m0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16m1-9h2.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H13v2.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V13H8.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5H11V8.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z","clip-rule":"evenodd"},null,-1)])])}const dl={render:sl},cl="UiMenuItem",ul=L(cl,[],["default","avatar","leading-icon","description","trailing-icon"]),pl="UiMenuItemGroup",ml=L(pl,[],["default","option","label","quantity"]),fl=["id","aria-selected","aria-current"],vl=["innerHTML"],hl=["innerHTML"],gl=X({__name:"UiSelectOption",props:{value:{type:null,required:!0},label:{type:String,required:!0},description:{type:String,default:""},active:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},size:{type:String,validator:t=>Object.values(ce).includes(t),default:ce.MD},counter:{type:null,validator:t=>t===null||["string","number"].includes(typeof t),default:null},accent:{type:Boolean,default:!1}},setup(t){const e=t,v=ae("u1-v1-select-option"),d=m(xe,c(()=>()=>!1)),i=m(Oe,(()=>{})),M=m(de,()=>{}),V=m(Ue,()=>{}),N=m(se,()=>{}),$=m(je,()=>{}),h=m(ke,()=>{}),u=m(re,!1),H=m(Ee,x(null)),o=m(Ie,x("")),s=m(oe,x(!1)),y=m(we,x(!1)),Z=m(Te,x(!1)),w=(f,n="font-weight: 500;")=>Ce(f,o.value,n),b=c(()=>({label:s.value?w(e.label):e.label,description:s.value?w(e.description,"font-weight: 600;"):e.description})),_=c(()=>b.value.label!==e.label||b.value.description!==e.description),S=c(()=>e.active||H.value===v),O=c(()=>e.active||d.value(e.value)),J=c(()=>!(u||!s.value||_.value)),Y=()=>{e.disabled||h(e.value)},T=K([()=>e.label,()=>e.value,()=>e.disabled],([f,n,a],[r,g,A])=>{(f!==r||!Je(n,g)||a!==A)&&i(v,{label:f,value:n,disabled:a})});return We(()=>{const f={id:v,value:e.value,label:e.label,disabled:e.disabled,isMatched:()=>!s.value||_.value};V(f),M(f)}),ye(()=>{T(),$(v),N(v)}),(f,n)=>(E(),z("div",ie({id:k(v)},f.$attrs,{"aria-selected":O.value?"true":"false","aria-current":S.value?"true":void 0,class:{"ui-v1-select-option":!0,"ui-v1-select-option_active":S.value,"ui-v1-select-option_selected":O.value,"ui-v1-select-option_disabled":t.disabled,"ui-v1-select-option_hidden":J.value},role:"option",onClick:Y}),[I(f.$slots,"default",{highlight:w,selected:O.value},()=>[D(k(ul),{accent:t.accent,active:S.value,counter:t.counter,disabled:t.disabled,size:t.size,ticker:k(y)},be({"trailing-icon":U(()=>[I(f.$slots,"trailing-icon",{selected:O.value},()=>[O.value?(E(),le(k(Ye),{key:0,class:"ui-v1-select-option__checkmark-icon","aria-hidden":"true"})):k(Z)?(E(),le(k(dl),{key:1,class:"ui-v1-select-option__add-icon","aria-hidden":"true"})):ge("",!0)])]),default:U(()=>[I(f.$slots,"value",{selected:O.value},()=>[te("span",{innerHTML:b.value.label},null,8,vl)])]),_:2},[f.$slots["leading-icon"]?{name:"leading-icon",fn:U(()=>[I(f.$slots,"leading-icon",{selected:O.value})]),key:"0"}:void 0,b.value.description?{name:"description",fn:U(()=>[te("span",{innerHTML:b.value.description},null,8,hl)]),key:"1"}:void 0]),1032,["accent","active","counter","disabled","size","ticker"])])],16,fl))}});gl.__docgenInfo={exportName:"default",displayName:"UiSelectOption",description:"",tags:{},props:[{name:"value",description:"Значение опции",type:{name:"unknown"},required:!0},{name:"label",description:"Заголовок",type:{name:"string"},required:!0},{name:"description",description:"Описание",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"active",description:"Опция выбрана/не выбрана в списке",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",description:"Заблокированный",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"size",description:"Размер шрифта, иконок и внутренних отступов компонента",type:{name:"SIZE"},defaultValue:{func:!1,value:"SIZE.MD"}},{name:"counter",description:"Счетчик количества",type:{name:"string|number|null"},defaultValue:{func:!1,value:"null"}},{name:"accent",description:"Жирное начертание текста",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default",scoped:!0,description:"Слот для переопределения всего контента опции",bindings:[{name:"highlight",title:"binding"},{name:"selected",title:"binding"}]},{name:"leading-icon",scoped:!0,description:"Иконка слева от заголовка и описания",bindings:[{name:"selected",title:"binding"}]},{name:"value",scoped:!0,description:"Текстовая метка опции",bindings:[{name:"selected",title:"binding"}]},{name:"trailing-icon",scoped:!0,description:"Иконка справа от заголовка и описания",bindings:[{name:"selected",title:"binding"}]}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/select/UiSelectOption.vue"]};const $e=X({__name:"UiSelectOptionGroupHeader",setup(t){return p(de,m(Me,()=>{})),p(se,m(He,()=>{})),p(re,c(()=>!0)),(e,v)=>(E(),z("div",null,[I(e.$slots,"default")]))}});$e.__docgenInfo={exportName:"default",displayName:"UiSelectOptionGroupHeader",description:"",tags:{},slots:[{name:"default"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/select/UiSelectOptionGroupHeader.vue"]};const yl=X({__name:"UiSelectOptionGroup",props:{label:{type:String,default:""}},setup(t){const e=ae("u1-v1-select-option-group"),v=x([]),d=x([]),i=x([]),M=(o,s)=>`[${o}] Component with id ${s} already registered. Unregister it before using again.`;p(de,o=>{if(v.value.some(s=>s.id===o.id))throw new Error(M("UiSelect",o.id));v.value.push(o)}),p(se,o=>{const s=v.value.findIndex(y=>y.id===o);s!==-1&&v.value.splice(s,1)}),p(fe,o=>{if(d.value.some(s=>s.id===o.id))throw new Error(M("UiSelectOptionGroup",o.id));d.value.push(o)}),p(ve,o=>{const s=d.value.findIndex(y=>y.id===o);s!==-1&&d.value.splice(s,1)}),p(Me,o=>{if(i.value.some(s=>s.id===o.id))throw new Error(M("UiSelectOptionGroupHeader",o.id));i.value.push(o)}),p(He,o=>{const s=i.value.findIndex(y=>y.id===o);s!==-1&&i.value.splice(s,1)}),p(re,c(()=>!1));const V=m(fe,()=>{}),N=m(ve,()=>{}),$=m(oe,x(!1)),h=c(()=>v.value.filter(o=>o.isMatched()).length+d.value.reduce((o,s)=>o+s.matchedQuantity(),0)),u=c(()=>!!h.value||i.value.some(o=>o.isMatched())||d.value.some(o=>o.isMatched())),H=c(()=>!$.value||u.value);return De(()=>V({id:e,matchedQuantity:()=>h.value,isMatched:()=>u.value})),ye(()=>N(e)),(o,s)=>(E(),z("div",ie(o.$attrs,{class:{"ui-v1-select-option-group":!0,"ui-v1-select-option-group_hidden":H.value}}),[D(k(ml),null,be({label:U(()=>[I(o.$slots,"label",{},()=>[pe(ne(t.label),1)])]),quantity:U(()=>[I(o.$slots,"quantity",{quantity:h.value},()=>[pe(ne(h.value),1)])]),default:U(()=>[I(o.$slots,"default")]),_:2},[o.$slots.option?{name:"option",fn:U(()=>[D($e,null,{default:U(()=>[I(o.$slots,"option")]),_:3})]),key:"0"}:void 0]),1024)],16))}});yl.__docgenInfo={exportName:"default",displayName:"UiSelectOptionGroup",description:"",tags:{},props:[{name:"label",description:"Заголовок группы опций",type:{name:"string"},defaultValue:{func:!1,value:"''"}}],slots:[{name:"option",description:"Разметка блока группировки опций"},{name:"label",description:"Заголовок"},{name:"quantity",scoped:!0,description:"Счетчик количества элементов внутри группы",bindings:[{name:"quantity",title:"binding"}]},{name:"default",description:"Иное содержимое компонента"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/select/UiSelectOptionGroup.vue"]};function bl(t){return new Worker(""+new URL("UiSelect.remote-1EJ8ZxNI.js",import.meta.url).href,{name:t?.name})}function he(t){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...Se(),...t.components};return l.jsxs(l.Fragment,{children:[l.jsx(e.h1,{id:"uiselect",children:"UiSelect"}),`
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
`,l.jsx(G,{of:F}),`
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
`,l.jsx(G,{of:B}),`
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
`,l.jsx(G,{of:P}),`
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
`,l.jsx(G,{of:R}),`
`,l.jsxs(e.h3,{id:"5-readonly-режим",children:["5. ",l.jsx(e.code,{children:"readonly"})," режим"]}),`
`,l.jsx(e.pre,{children:l.jsx(e.code,{className:"language-html",children:`<template>
    <UiSelect readonly placeholder="Пользователь">
        <UiSelectOption value="kyle" label="Kyle Simmons" />
        <UiSelectOption value="eduardo" label="Eduardo Henry" />
    </UiSelect>
</template>
`})}),`
`,l.jsx(G,{of:q}),`
`,l.jsxs(e.h3,{id:"6-disabled-режим",children:["6. ",l.jsx(e.code,{children:"disabled"})," режим"]}),`
`,l.jsx(e.pre,{children:l.jsx(e.code,{className:"language-html",children:`<template>
    <UiSelect disabled placeholder="Пользователь">
        <UiSelectOption value="kyle" label="Kyle Simmons" />
        <UiSelectOption value="eduardo" label="Eduardo Henry" />
    </UiSelect>
</template>
`})}),`
`,l.jsx(G,{of:W}),`
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
`,l.jsx(el,{})]})}function Sl(t={}){const{wrapper:e}={...Se(),...t.components};return e?l.jsx(e,{...t,children:l.jsx(he,{...t})}):he(t)}const xl=Ge({UiMenuItem:Ke,UiMenuItemGroup:Be,UiPopperConnector:Pe,UiSelectPopper:Fe,UiSelectTrigger:Ae}),ql={title:"Components/UiSelect",component:Ve,argTypes:{id:{control:!1},value:{control:!1},expanded:{control:"boolean"},clearable:{control:"boolean"},placeholder:{control:"text"},filterable:{control:"boolean"},invalid:{control:"boolean"},placeholderOnly:{control:"boolean"},readonly:{control:"boolean"},disabled:{control:"boolean"},multiple:{control:"boolean"},ticker:{control:"boolean"},width:{control:"text"},textboxSize:{options:Object.values(Ne)},placement:{options:Object.values(ee)},popperFitTrigger:{control:"boolean"},popperClass:{control:"text"},popperOptions:{control:!1},targetTriggers:{control:!1},popperTriggers:{control:!1}},render:Le({provider:xl,worker:bl}),parameters:{docs:{page:Sl},layout:"centered"}},Q={args:{placeholder:"test123",ticker:!1,disabled:!1,multiple:!1,filterable:!1,width:"fit"}},F=C({args:{placeholder:"Исполнитель",ticker:!1,disabled:!1,multiple:!1,filterable:!1}}),B=C({args:{placeholder:"Исполнители",ticker:!1,disabled:!1,multiple:!0,clearable:!0,filterable:!1}}),P=C({args:{placeholder:"Найти пользователя",ticker:!1,disabled:!1,multiple:!1,filterable:!0,clearable:!0}}),R=C({args:{placeholder:"Пользователь",value:"Eduardo Henry",ticker:!1,disabled:!1,multiple:!1,filterable:!1,invalid:!0}}),q=C({args:{placeholder:"Пользователь",value:"Kyle Simmmons",ticker:!1,disabled:!1,readonly:!0,multiple:!1,filterable:!1}}),W=C({args:{placeholder:"Пользователь",value:"Philip Williamson",ticker:!1,disabled:!0,multiple:!1,filterable:!1}});Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'test123',
    ticker: false,
    disabled: false,
    multiple: false,
    filterable: false,
    width: 'fit'
  }
}`,...Q.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    placeholder: 'Исполнитель',
    ticker: false,
    disabled: false,
    multiple: false,
    filterable: false
  }
})`,...F.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    placeholder: 'Исполнители',
    ticker: false,
    disabled: false,
    multiple: true,
    clearable: true,
    filterable: false
  }
})`,...B.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    placeholder: 'Найти пользователя',
    ticker: false,
    disabled: false,
    multiple: false,
    filterable: true,
    clearable: true
  }
})`,...P.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    placeholder: 'Пользователь',
    value: 'Eduardo Henry',
    ticker: false,
    disabled: false,
    multiple: false,
    filterable: false,
    invalid: true
  }
})`,...R.parameters?.docs?.source}}};q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    placeholder: 'Пользователь',
    value: 'Kyle Simmmons',
    ticker: false,
    disabled: false,
    readonly: true,
    multiple: false,
    filterable: false
  }
})`,...q.parameters?.docs?.source}}};W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    placeholder: 'Пользователь',
    value: 'Philip Williamson',
    ticker: false,
    disabled: true,
    multiple: false,
    filterable: false
  }
})`,...W.parameters?.docs?.source}}};const Wl=["Sandbox","BasicSingle","MultipleClearable","FilterableSearch","InvalidState","ReadonlyState","DisabledState"];export{F as BasicSingle,W as DisabledState,P as FilterableSearch,R as InvalidState,B as MultipleClearable,q as ReadonlyState,Q as Sandbox,Wl as __namedExportsOrder,ql as default};
