import{c as Ke}from"./host-CMQl2KSi.js";import{S as fe,_ as Ne}from"./UiMenuItem-CATQK8cQ.js";import{P as ae,u as se,_ as ve,h as Ae,S as Fe,a as Be,b as Pe,U as Re}from"./UiSelectTrigger-_0O3o4f9.js";import{_ as qe}from"./UiPopperConnector-BFMd-LIm.js";import{h as J,Y as We,w as G,y as ie,z as x,E as k,a4 as De,o as E,k as D,A as de,c as z,t as oe,H as xe,m as I,q as c,r as U,i as m,p,a as re,a5 as ze,Q as Ue,D as Oe,O as _e,N as he}from"./iframe-DnG3g5pW.js";import{d as _,a as j,n as Le,c as Ze}from"./createRemoteStoryRender-CQKxbukF.js";import{a as Qe}from"./popper-DtrCiXe3.js";import{W as Xe,i as Ye,S as ge}from"./UiTextbox-8JxeifZm.js";import{I as Je}from"./plugin-DbbfKnFn.js";import{b as el}from"./UiPopper-C8UHJnqx.js";import{I as ll}from"./checkmark-circle-ByI07X83.js";import{d as K}from"./docsOnlyStory-D04fiwRX.js";import{u as je,j as l}from"./index-DFg_Ho_i.js";import{S as C,A as nl}from"./blocks-DBDDY4vL.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./composables-CfEvSTVp.js";import"./caret-down-CL4iTfI3.js";import"./index-BAxMPZdI.js";import"./preload-helper-PPVm8Dsz.js";import"./index-nl1gzEpR.js";const ke=Symbol("UiSelectedIsSelected"),Ie=Symbol("UiSelectRegister"),we=Symbol("UiSelectSync"),Te=Symbol("UiSelectUnregister"),Ee=Symbol("UiSelectToggle"),Me=Symbol("UiSelectFilter"),ce=Symbol("UiSelectFiltered"),He=Symbol("UiSelectTicker"),Ve=Symbol("UiSelectMultiple"),$e=Symbol("UiSelectActiveOptionId"),ue=Symbol("UiSelectFastened"),pe=Symbol("UiSelectUnregisterOption"),me=Symbol("UiSelectRegisterOption"),ye=Symbol("UiSelectOptionGroupRegister"),be=Symbol("UiSelectOptionGroupUnregister"),Ce=Symbol("UiSelectOptionGroupRegisterHeaderOption"),Ge=Symbol("UiSelectOptionGroupUnregisterHeaderOption"),tl="UiSelectTrigger",al=_(tl,{emits:["input","focus","blur","keydown","clear","update:value","update:expanded"],methods:{open:j(),close:j(),onClick:j(),onKeyDown:j(),onInput:j(),onFocus:j(),onBlur:j(),onClear:j()}}),il="UiSelectPopper",ol=_(il,{emits:["update:visible","show","hide","shown","hidden","dispose"],methods:{autoScroll:j(),updateWidth:j()}}),rl="UiSelectOption";_(rl);const sl={key:0,class:"ui-v1-select__no-results-text"},X=J({inheritAttrs:!1,__name:"UiSelect",props:{id:{type:String,default:void 0},value:{type:null},placeholder:{type:String,default:""},clearable:{type:Boolean,default:!1},filterable:{type:Boolean,default:!1},invalid:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},equalsFn:{type:Function,default:(t,e)=>t===e},placement:{type:String,validator:t=>Object.values(ae).includes(t),default:ae.BOTTOM},targetTriggers:{type:[Array,Object],default:()=>({show:["click"]})},popperTriggers:{type:[Array,Object],default:()=>[]},popperFitTrigger:{type:Boolean,default:!1},popperClass:{type:String,default:null},popperOptions:{type:Object,default:()=>({})},textboxSize:{type:String,validator:t=>Object.values(ge).includes(t),default:ge.SM},width:{type:[Number,String],validator:Ye,default:Xe.FIT},multiple:{type:Boolean,default:!1},expanded:{type:Boolean,default:!1},placeholderOnly:{type:Boolean,default:!1},ticker:{type:Boolean,default:!1}},emits:["change","update:value"],setup(t,{emit:e}){const v=e,d=t,i=We({expanded:d.expanded,filter:"",value:d.value}),M=se("ui-v1-select"),V=c(()=>d.id??M),N=c(()=>ve.init(m(Je,null)?.locale??ve.fallback)),$=c(()=>N.value.t("search.noResult",{filter:i.filter})),h=U([]),u=U(null),H=De("popper"),o=c(()=>{const n=s(i.value),a=[];return n.forEach(r=>{const g=h.value.find(A=>y(A.value,r));g&&a.push(g)}),a}),s=n=>Array.isArray(n)?[...n]:typeof n=="number"||typeof n=="boolean"||n?[n]:[],y=(n,a)=>d.equalsFn(n,a),L=(n,a)=>n.some(r=>y(r,a)),w=c(()=>h.value.filter(n=>n.isMatched()&&!n.disabled)),b=n=>{i.value=n,v("change",n),v("update:value",n)};p(Ie,n=>{if(h.value.some(a=>a.id===n.id))throw new Error(`[UiSelect] Component with id ${n.id} already registered. Unregister it before using again.`);h.value.push(n)}),p(we,(n,a)=>{const r=h.value.find(g=>g.id===n);r&&(r.label=a.label,r.value=a.value,r.disabled=a.disabled)}),p(Te,n=>{const a=h.value.findIndex(r=>r.id===n);a!==-1&&h.value.splice(a,1)}),p(ke,c(()=>n=>Array.isArray(i.value)?L(i.value,n):y(i.value,n))),p(Ee,n=>{if(d.multiple){const a=s(i.value),r=a.findIndex(g=>y(g,n));r!==-1?a.splice(r,1):a.push(n),b(a),d.multiple||T()}else b(n),T()}),p(Me,c(()=>i.filter)),p(ce,c(()=>d.filterable&&i.filter.length>0)),p(He,c(()=>d.ticker)),p(Ve,c(()=>d.multiple)),p($e,c(()=>u.value));const Z=n=>{i.filter=n},S=(n="selected-first")=>{const a=w.value;if(a.length===0){u.value=null;return}if(n==="first"){u.value=a[0].id;return}if(n==="last"){u.value=a[a.length-1].id;return}const r=a.find(g=>Array.isArray(i.value)?L(i.value,g.value):y(i.value,g.value));u.value=r?.id??a[0].id},O=n=>{const a=w.value;if(a.length===0){u.value=null;return}const r=a.findIndex(A=>A.id===u.value),g=r===-1?n>0?0:a.length-1:(r+n+a.length)%a.length;u.value=a[g].id},ee=()=>{const n=w.value.find(a=>a.id===u.value);if(n)if(d.multiple){const a=s(i.value),r=a.findIndex(g=>y(g,n.value));r!==-1?a.splice(r,1):a.push(n.value),b(a)}else b(n.value),T()},le=n=>{if(!(d.disabled||d.readonly)){if(n.key==="Escape"){T();return}if(n.key==="Tab"){T();return}if(n.key==="Home"){i.expanded||(i.expanded=!0),S("first");return}if(n.key==="End"){i.expanded||(i.expanded=!0),S("last");return}if(n.key==="ArrowDown"){if(!i.expanded){i.expanded=!0,S("first");return}O(1);return}if(n.key==="ArrowUp"){if(!i.expanded){i.expanded=!0,S("last");return}O(-1);return}if(n.key==="Enter"){if(!i.expanded){i.expanded=!0,S("selected-first");return}ee()}}},T=()=>{i.expanded&&(i.expanded=!1,i.filter="",u.value=null)},f=async()=>{i.expanded&&(await Le(),await H.value?.updateWidth(),await H.value?.autoScroll())};return G(()=>d.expanded,n=>{i.expanded=n,n||(i.filter="",u.value=null)}),G(()=>d.value,n=>{i.value=n}),G(()=>i.expanded,n=>{n?(S("selected-first"),f()):u.value=null}),G(w,()=>{if(!i.expanded)return;w.value.some(a=>a.id===u.value)||(S("selected-first"),f())}),G(u,(n,a)=>{!i.expanded||n===a||f()}),(n,a)=>(E(),ie(k(Qe),null,{default:x(()=>[D(k(al),de({id:V.value,value:i.value,multiple:t.multiple,selection:o.value,filter:i.filter,filterable:t.filterable,clearable:t.clearable,expanded:i.expanded,invalid:t.invalid,disabled:t.disabled,readonly:t.readonly,"placeholder-only":t.placeholderOnly,placeholder:t.placeholder,"textbox-size":t.textboxSize,width:t.width,"active-descendant":u.value},n.$attrs,{onInput:Z,onKeydown:le,"onUpdate:value":a[0]||(a[0]=r=>b(r)),"onUpdate:expanded":a[1]||(a[1]=r=>i.expanded=r)}),null,16,["id","value","multiple","selection","filter","filterable","clearable","expanded","invalid","disabled","readonly","placeholder-only","placeholder","textbox-size","width","active-descendant"]),D(k(ol),{id:V.value,ref_key:"popper",ref:H,disabled:t.disabled||t.readonly,multiple:t.multiple,opened:i.expanded,placement:t.placement,"popper-class":t.popperClass,"popper-fit-trigger":t.popperFitTrigger,"popper-options":t.popperOptions,"popper-triggers":t.popperTriggers,readonly:t.readonly,"target-triggers":t.targetTriggers,ticker:t.ticker,filterable:t.filterable,"options-registry":h.value,onHide:T},{default:x(()=>[t.filterable&&h.value.every(r=>!r.isMatched())&&$.value?(E(),z("div",sl,oe($.value),1)):xe("",!0),I(n.$slots,"default")]),_:3},8,["id","disabled","multiple","opened","placement","popper-class","popper-fit-trigger","popper-options","popper-triggers","readonly","target-triggers","ticker","filterable","options-registry"])]),_:3}))}});X.__docgenInfo=Object.assign({displayName:X.name??X.__name},{exportName:"default",displayName:"UiSelect",description:"",tags:{},props:[{name:"id",description:"Атрибут id корневого элемента выпадающего списка. Должен быть уникальным на странице",type:{name:"string"},defaultValue:{func:!1,value:"undefined"}},{name:"value",description:"Атрибут value, содержащий выбранный элемент из выпадающего списка",type:{name:"unknown|unknown[]"}},{name:"placeholder",description:"Атрибут placeholder нативного поля ввода input",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"clearable",description:"Отображает иконку сброса введённого или выбранного значения в виде крестика",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"filterable",description:"Фильтрация строк выпадающего списка на соответствие введённого выражения в input",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"invalid",description:"Подсвечивает поле как содержащее некорректное значение",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"readonly",description:"Устанавливает поле ввода в состояние доступное только для чтения",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",description:"Блокировка поля ввода",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"equalsFn",description:"Функция для проверки равенства элементов",type:{name:"(a: unknown, b: unknown) => boolean"},defaultValue:{func:!0,value:"(a: unknown, b: unknown): boolean => a === b"}},{name:"placement",description:`Сторона цели, у которой появится плавающий элемент,
или подробный объект настройки положения и адаптации положения при нехватке места`,type:{name:"PLACEMENT | `${PLACEMENT}`"},defaultValue:{func:!1,value:"PLACEMENT.BOTTOM"}},{name:"targetTriggers",description:"События целевого элемента, по которым производится переключение видимости",type:{name:"Trigger[] | TriggerSchema"},defaultValue:{func:!0,value:`() => ({
  show: ['click'],
})`}},{name:"popperTriggers",description:"События плавающего элемента, по которым производится переключение видимости",type:{name:"Trigger[] | TriggerSchema"},defaultValue:{func:!0,value:"() => []"}},{name:"popperFitTrigger",description:`Флаг, устанавливающий ширину выпадающего списка по ширине целевого элемента.
По-умолчанию отключает такое поведение`,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"popperClass",description:"Стиль для плавающего элемента",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"popperOptions",description:"Набор свойств плавающего элемента. See @/common/components/popper",type:{name:"UiSelectPopperProperties['popperOptions']"},defaultValue:{func:!0,value:"() => ({})"}},{name:"textboxSize",description:"Размер поля ввода",type:{name:"SIZE | `${SIZE}`"},defaultValue:{func:!1,value:"SIZE.SM"}},{name:"width",description:"Ширина селекта. fit — по содержимому, fluid — на всю ширину контейнера",type:{name:"WidthValue"},defaultValue:{func:!1,value:"WIDTH.FIT"}},{name:"multiple",description:"Наличие множественного выбора среди элементов выпадающего списка",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"expanded",description:"Состояние открытия выпадающего списка",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"placeholderOnly",description:"Устанавливает в качестве выводимого в input значения только содержимое placeholder",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"ticker",description:"Добавляет анимацию показала полной строки при переполнении",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"change",type:{names:["union"],elements:[{name:"unknown"},{name:"Array",elements:[{name:"unknown"}]}]}},{name:"update:value",type:{names:["union"],elements:[{name:"unknown"},{name:"Array",elements:[{name:"unknown"}]}]}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/select/UiSelect.vue"]});const dl={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"};function cl(t,e){return E(),z("svg",dl,[...e[0]||(e[0]=[re("path",{fill:"currentColor","fill-rule":"evenodd",d:"M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10A10 10 0 0 0 12 2m0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16m1-9h2.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H13v2.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V13H8.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5H11V8.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z","clip-rule":"evenodd"},null,-1)])])}const ul={render:cl},pl="UiMenuItem",ml=_(pl,[],["default","avatar","leading-icon","description","trailing-icon"]),fl="UiMenuItemGroup",vl=_(fl,[],["default","option","label","quantity"]),hl=["id","aria-selected","aria-current"],gl=["innerHTML"],yl=["innerHTML"],ne=J({__name:"UiSelectOption",props:{value:{type:null,required:!0},label:{type:String,required:!0},description:{type:String,default:""},active:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},size:{type:String,validator:t=>Object.values(fe).includes(t),default:fe.MD},counter:{type:null,validator:t=>t===null||["string","number"].includes(typeof t),default:null},accent:{type:Boolean,default:!1}},setup(t){const e=t,v=se("u1-v1-select-option"),d=m(ke,c(()=>()=>!1)),i=m(we,(()=>{})),M=m(me,()=>{}),V=m(Ie,()=>{}),N=m(pe,()=>{}),$=m(Te,()=>{}),h=m(Ee,()=>{}),u=m(ue,!1),H=m($e,U(null)),o=m(Me,U("")),s=m(ce,U(!1)),y=m(He,U(!1)),L=m(Ve,U(!1)),w=(f,n="font-weight: 500;")=>Ae(f,o.value,n),b=c(()=>({label:s.value?w(e.label):e.label,description:s.value?w(e.description,"font-weight: 600;"):e.description})),Z=c(()=>b.value.label!==e.label||b.value.description!==e.description),S=c(()=>e.active||H.value===v),O=c(()=>e.active||d.value(e.value)),ee=c(()=>!(u||!s.value||Z.value)),le=()=>{e.disabled||h(e.value)},T=G([()=>e.label,()=>e.value,()=>e.disabled],([f,n,a],[r,g,A])=>{(f!==r||!el(n,g)||a!==A)&&i(v,{label:f,value:n,disabled:a})});return ze(()=>{const f={id:v,value:e.value,label:e.label,disabled:e.disabled,isMatched:()=>!s.value||Z.value};V(f),M(f)}),Ue(()=>{T(),$(v),N(v)}),(f,n)=>(E(),z("div",de({id:k(v)},f.$attrs,{"aria-selected":O.value?"true":"false","aria-current":S.value?"true":void 0,class:{"ui-v1-select-option":!0,"ui-v1-select-option_active":S.value,"ui-v1-select-option_selected":O.value,"ui-v1-select-option_disabled":t.disabled,"ui-v1-select-option_hidden":ee.value},role:"option",onClick:le}),[I(f.$slots,"default",{highlight:w,selected:O.value},()=>[D(k(ml),{accent:t.accent,active:S.value,counter:t.counter,disabled:t.disabled,size:t.size,ticker:k(y)},Oe({"trailing-icon":x(()=>[I(f.$slots,"trailing-icon",{selected:O.value},()=>[O.value?(E(),ie(k(ll),{key:0,class:"ui-v1-select-option__checkmark-icon","aria-hidden":"true"})):k(L)?(E(),ie(k(ul),{key:1,class:"ui-v1-select-option__add-icon","aria-hidden":"true"})):xe("",!0)])]),default:x(()=>[I(f.$slots,"value",{selected:O.value},()=>[re("span",{innerHTML:b.value.label},null,8,gl)])]),_:2},[f.$slots["leading-icon"]?{name:"leading-icon",fn:x(()=>[I(f.$slots,"leading-icon",{selected:O.value})]),key:"0"}:void 0,b.value.description?{name:"description",fn:x(()=>[re("span",{innerHTML:b.value.description},null,8,yl)]),key:"1"}:void 0]),1032,["accent","active","counter","disabled","size","ticker"])])],16,hl))}});ne.__docgenInfo=Object.assign({displayName:ne.name??ne.__name},{exportName:"default",displayName:"UiSelectOption",description:"",tags:{},props:[{name:"value",description:"Значение опции",type:{name:"unknown"},required:!0},{name:"label",description:"Заголовок",type:{name:"string"},required:!0},{name:"description",description:"Описание",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"active",description:"Опция выбрана/не выбрана в списке",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",description:"Заблокированный",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"size",description:"Размер шрифта, иконок и внутренних отступов компонента",type:{name:"SIZE"},defaultValue:{func:!1,value:"SIZE.MD"}},{name:"counter",description:"Счетчик количества",type:{name:"string|number|null"},defaultValue:{func:!1,value:"null"}},{name:"accent",description:"Жирное начертание текста",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default",scoped:!0,description:"Слот для переопределения всего контента опции",bindings:[{name:"highlight",title:"binding"},{name:"selected",title:"binding"}]},{name:"leading-icon",scoped:!0,description:"Иконка слева от заголовка и описания",bindings:[{name:"selected",title:"binding"}]},{name:"value",scoped:!0,description:"Текстовая метка опции",bindings:[{name:"selected",title:"binding"}]},{name:"trailing-icon",scoped:!0,description:"Иконка справа от заголовка и описания",bindings:[{name:"selected",title:"binding"}]}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/select/UiSelectOption.vue"]});const Y=J({__name:"UiSelectOptionGroupHeader",setup(t){return p(me,m(Ce,()=>{})),p(pe,m(Ge,()=>{})),p(ue,c(()=>!0)),(e,v)=>(E(),z("div",null,[I(e.$slots,"default")]))}});Y.__docgenInfo=Object.assign({displayName:Y.name??Y.__name},{exportName:"default",displayName:"UiSelectOptionGroupHeader",description:"",tags:{},slots:[{name:"default"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/select/UiSelectOptionGroupHeader.vue"]});const te=J({__name:"UiSelectOptionGroup",props:{label:{type:String,default:""}},setup(t){const e=se("u1-v1-select-option-group"),v=U([]),d=U([]),i=U([]),M=(o,s)=>`[${o}] Component with id ${s} already registered. Unregister it before using again.`;p(me,o=>{if(v.value.some(s=>s.id===o.id))throw new Error(M("UiSelect",o.id));v.value.push(o)}),p(pe,o=>{const s=v.value.findIndex(y=>y.id===o);s!==-1&&v.value.splice(s,1)}),p(ye,o=>{if(d.value.some(s=>s.id===o.id))throw new Error(M("UiSelectOptionGroup",o.id));d.value.push(o)}),p(be,o=>{const s=d.value.findIndex(y=>y.id===o);s!==-1&&d.value.splice(s,1)}),p(Ce,o=>{if(i.value.some(s=>s.id===o.id))throw new Error(M("UiSelectOptionGroupHeader",o.id));i.value.push(o)}),p(Ge,o=>{const s=i.value.findIndex(y=>y.id===o);s!==-1&&i.value.splice(s,1)}),p(ue,c(()=>!1));const V=m(ye,()=>{}),N=m(be,()=>{}),$=m(ce,U(!1)),h=c(()=>v.value.filter(o=>o.isMatched()).length+d.value.reduce((o,s)=>o+s.matchedQuantity(),0)),u=c(()=>!!h.value||i.value.some(o=>o.isMatched())||d.value.some(o=>o.isMatched())),H=c(()=>!$.value||u.value);return _e(()=>V({id:e,matchedQuantity:()=>h.value,isMatched:()=>u.value})),Ue(()=>N(e)),(o,s)=>(E(),z("div",de(o.$attrs,{class:{"ui-v1-select-option-group":!0,"ui-v1-select-option-group_hidden":H.value}}),[D(k(vl),null,Oe({label:x(()=>[I(o.$slots,"label",{},()=>[he(oe(t.label),1)])]),quantity:x(()=>[I(o.$slots,"quantity",{quantity:h.value},()=>[he(oe(h.value),1)])]),default:x(()=>[I(o.$slots,"default")]),_:2},[o.$slots.option?{name:"option",fn:x(()=>[D(Y,null,{default:x(()=>[I(o.$slots,"option")]),_:3})]),key:"0"}:void 0]),1024)],16))}});te.__docgenInfo=Object.assign({displayName:te.name??te.__name},{exportName:"default",displayName:"UiSelectOptionGroup",description:"",tags:{},props:[{name:"label",description:"Заголовок группы опций",type:{name:"string"},defaultValue:{func:!1,value:"''"}}],slots:[{name:"option",description:"Разметка блока группировки опций"},{name:"label",description:"Заголовок"},{name:"quantity",scoped:!0,description:"Счетчик количества элементов внутри группы",bindings:[{name:"quantity",title:"binding"}]},{name:"default",description:"Иное содержимое компонента"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/select/UiSelectOptionGroup.vue"]});function bl(t){return new Worker(""+new URL("UiSelect.remote-CwTA04j9.js",import.meta.url).href,{name:t?.name})}function Se(t){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...je(),...t.components};return l.jsxs(l.Fragment,{children:[l.jsx(e.h1,{id:"uiselect",children:"UiSelect"}),`
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
`,l.jsx(C,{of:F}),`
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
`,l.jsx(C,{of:B}),`
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
`,l.jsx(C,{of:R}),`
`,l.jsxs(e.h3,{id:"5-readonly-режим",children:["5. ",l.jsx(e.code,{children:"readonly"})," режим"]}),`
`,l.jsx(e.pre,{children:l.jsx(e.code,{className:"language-html",children:`<template>
    <UiSelect readonly placeholder="Пользователь">
        <UiSelectOption value="kyle" label="Kyle Simmons" />
        <UiSelectOption value="eduardo" label="Eduardo Henry" />
    </UiSelect>
</template>
`})}),`
`,l.jsx(C,{of:q}),`
`,l.jsxs(e.h3,{id:"6-disabled-режим",children:["6. ",l.jsx(e.code,{children:"disabled"})," режим"]}),`
`,l.jsx(e.pre,{children:l.jsx(e.code,{className:"language-html",children:`<template>
    <UiSelect disabled placeholder="Пользователь">
        <UiSelectOption value="kyle" label="Kyle Simmons" />
        <UiSelectOption value="eduardo" label="Eduardo Henry" />
    </UiSelect>
</template>
`})}),`
`,l.jsx(C,{of:W}),`
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
`,l.jsx(nl,{})]})}function Sl(t={}){const{wrapper:e}={...je(),...t.components};return e?l.jsx(e,{...t,children:l.jsx(Se,{...t})}):Se(t)}const xl=Ke({UiMenuItem:Ne,UiMenuItemGroup:Re,UiPopperConnector:qe,UiSelectPopper:Pe,UiSelectTrigger:Be}),Rl={title:"Components/UiSelect",component:X,argTypes:{id:{control:!1},value:{control:!1},expanded:{control:"boolean"},clearable:{control:"boolean"},placeholder:{control:"text"},filterable:{control:"boolean"},invalid:{control:"boolean"},placeholderOnly:{control:"boolean"},readonly:{control:"boolean"},disabled:{control:"boolean"},multiple:{control:"boolean"},ticker:{control:"boolean"},width:{control:"text"},textboxSize:{options:Object.values(Fe)},placement:{options:Object.values(ae)},popperFitTrigger:{control:"boolean"},popperClass:{control:"text"},popperOptions:{control:!1},targetTriggers:{control:!1},popperTriggers:{control:!1}},render:Ze({provider:xl,worker:bl}),parameters:{docs:{page:Sl},layout:"centered"}},Q={args:{placeholder:"test123",ticker:!1,disabled:!1,multiple:!1,filterable:!1,width:"fit"}},F=K({args:{placeholder:"Исполнитель",ticker:!1,disabled:!1,multiple:!1,filterable:!1}}),B=K({args:{placeholder:"Исполнители",ticker:!1,disabled:!1,multiple:!0,clearable:!0,filterable:!1}}),P=K({args:{placeholder:"Найти пользователя",ticker:!1,disabled:!1,multiple:!1,filterable:!0,clearable:!0}}),R=K({args:{placeholder:"Пользователь",value:"Eduardo Henry",ticker:!1,disabled:!1,multiple:!1,filterable:!1,invalid:!0}}),q=K({args:{placeholder:"Пользователь",value:"Kyle Simmmons",ticker:!1,disabled:!1,readonly:!0,multiple:!1,filterable:!1}}),W=K({args:{placeholder:"Пользователь",value:"Philip Williamson",ticker:!1,disabled:!0,multiple:!1,filterable:!1}});Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
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
})`,...W.parameters?.docs?.source}}};const ql=["Sandbox","BasicSingle","MultipleClearable","FilterableSearch","InvalidState","ReadonlyState","DisabledState"];export{F as BasicSingle,W as DisabledState,P as FilterableSearch,R as InvalidState,B as MultipleClearable,q as ReadonlyState,Q as Sandbox,ql as __namedExportsOrder,Rl as default};
