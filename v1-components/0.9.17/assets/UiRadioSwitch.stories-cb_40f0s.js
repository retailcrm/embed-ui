import{h as ae}from"./host-snUZa_69.js";import{A as f,S as w,_ as te,a as oe}from"./UiRadioSwitchRoot-fYewYbbN.js";import{i as g,j as y,h as $,a4 as re,r as q,a5 as ce,U as le,o as p,y as z,z as C,q as S,a as de,c as U,J as A,N as M,t as _,E as j,F as T,m as ue,A as L,p as v,w as pe,k as he,D as me}from"./iframe-BzpaBgH4.js";import{d as K,a as N,w as h,b as m,c as fe}from"./createRemoteStoryRender-541bjmDf.js";import{I as be}from"./checkmark-circle-Ct9wTGmj.js";import{d as B}from"./docsOnlyStory-D04fiwRX.js";import{j as n}from"./jsx-runtime-D34IIhkc.js";import{useMDXComponents as Z}from"./index-C-cn5rLx.js";import{S as P,A as xe}from"./blocks-CRv7d3wl.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Bs7sCYJD.js";const X=Symbol("UiRadioSwitchAppearance"),W=Symbol("UiRadioSwitchSize"),H=Symbol("UiRadioSwitchRegistry"),J=Symbol("UiRadioSwitchUpdate"),Q=Symbol("UiRadioSwitchFocusableId"),G=Symbol("UiRadioSwitchSetFocusableId"),Y=Symbol("UiRadioSwitchMoveFocus"),ve=()=>g(X,y(()=>f.DEFAULT)),je=()=>g(W,y(()=>w.MD)),Se=()=>g(H,{register:()=>{},unregister:()=>{}}),ye=()=>g(J,()=>{}),we=()=>g(Q,y(()=>null)),ge=()=>g(G,()=>{}),Re=()=>g(Y,()=>{}),Ue="UiRadioSwitchRoot",ke=K(Ue),Ae="UiRadioSwitchOptionShell",Ee=K(Ae,{emits:["click","focus","blur","keydown"],methods:{focus:N(),blur:N()}}),Fe={class:"ui-v1-radio-switch-option__head"},Ie={key:0,class:"ui-v1-radio-switch-option__icon"},De={key:1,class:"ui-v1-radio-switch-option__label"},Oe={key:0,class:"ui-v1-radio-switch-option__description"},ze={key:1,class:"ui-v1-radio-switch-option__done"};let Ce=0;const Me={},ee=$({...Me,inheritAttrs:!1,__name:"UiRadioSwitchOption",props:{id:{type:String,default:()=>"ui-v1-radio-switch-option-"+ ++Ce},label:{type:String,default:""},value:{type:null,required:!0},description:{type:String,default:""},disabled:{type:Boolean,default:!1}},setup(a){const e=a,u=ve(),R=we(),c=Re(),o=re("shell"),I=je(),b=Se(),i=ge(),t=ye(),s=q(!1),l=y(()=>!e.disabled&&R.value===e.id?0:-1),x=()=>{e.disabled||(i(e.id),t(e.value))},k=()=>{e.disabled||i(e.id)},d=r=>{if(!e.disabled)switch(r.key){case" ":case"Enter":i(e.id),t(e.value);return;case"ArrowDown":case"ArrowRight":c(e.id,"next");return;case"ArrowUp":case"ArrowLeft":c(e.id,"prev");return;case"Home":c(e.id,"first");return;case"End":c(e.id,"last");return}};return ce(()=>{b.register(e.id,{getValue:()=>e.value,checked:s,disabled:()=>e.disabled,focus:()=>o.value?.focus()})}),le(()=>{b.unregister(e.id)}),(r,ie)=>(p(),z(j(Ee),L({id:a.id,ref_key:"shell",ref:o,appearance:j(u),size:j(I),checked:s.value,disabled:a.disabled,tabindex:l.value},r.$attrs,{onClick:x,onFocus:k,onKeydown:[h(m(d,["prevent"]),["space"]),h(m(d,["prevent"]),["enter"]),h(m(d,["prevent"]),["left"]),h(m(d,["prevent"]),["right"]),h(m(d,["prevent"]),["up"]),h(m(d,["prevent"]),["down"]),h(m(d,["prevent"]),["home"]),h(m(d,["prevent"]),["end"])]}),{default:C(()=>[S(r.$slots,"default",{},()=>[de("div",Fe,[r.$slots.icon?(p(),U("span",Ie,[S(r.$slots,"icon")])):A("",!0),r.$slots.label||a.label?(p(),U("div",De,[S(r.$slots,"label",{},()=>[M(_(a.label),1)])])):A("",!0)]),j(u)===j(f).SECTION?(p(),U(T,{key:0},[r.$slots.description||a.description?(p(),U("div",Oe,[S(r.$slots,"description",{},()=>[M(_(a.description),1)])])):A("",!0),s.value?(p(),U("div",ze,[S(r.$slots,"checkmark",{},()=>[ue(j(be))])])):A("",!0)],64)):A("",!0)])]),_:3},16,["id","appearance","size","checked","disabled","tabindex","onKeydown"]))}});ee.__docgenInfo={exportName:"default",displayName:"UiRadioSwitchOption",description:"",tags:{},props:[{name:"id",description:"Идентификатор",type:{name:"string"},defaultValue:{func:!0,value:"() => 'ui-v1-radio-switch-option-' + ++counter"}},{name:"label",description:"Заголовок",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"value",description:"Значение опции",type:{name:"UiRadioSwitchOptionProperties['value']"},required:!0},{name:"description",description:"Используется только c appearance=section",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"disabled",description:"Индикатор, заблокирована опция или нет",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default",description:"Полный пользовательский шаблон опции"},{name:"icon",description:"Иконка опции"},{name:"label",description:"Заголовок опции"},{name:"description",description:"Дополнительное описание опции"},{name:"checkmark",description:"Иконка выбранного состояния"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/radio-switch/UiRadioSwitchOption.vue"]};const ne=$({inheritAttrs:!1,__name:"UiRadioSwitch",props:{value:{type:null,default:null},options:{type:Array,default:()=>[]},equalFn:{type:Function,default:(a,e)=>a===e},appearance:{type:String,default:f.DEFAULT,validator:a=>Object.values(f).includes(a)},size:{type:String,default:w.MD,validator:a=>Object.values(w).includes(a)},rubber:{type:Boolean,default:!1}},emits:["change","update:value"],setup(a,{emit:e}){const u=a,R=e,c=new Map,o=q(null),I=()=>Array.from(c.entries()).filter(([,i])=>!i.disabled()),b=i=>{const t=I(),s=new Set(t.map(([x])=>x)),l=t.find(([,x])=>x.checked.value);if(i&&s.has(i)){o.value=i;return}o.value&&s.has(o.value)||(o.value=l?.[0]??t[0]?.[0]??null)};return v(X,y(()=>u.appearance)),v(Q,y(()=>o.value)),v(W,y(()=>u.size)),v(G,i=>{b(i)}),v(H,{register:(i,t)=>{c.has(i)||(t.checked.value=u.equalFn(t.getValue(),u.value),c.set(i,t),b(t.checked.value?i:o.value))},unregister:i=>{c.delete(i),o.value===i&&b()}}),v(J,i=>{R("change",i),R("update:value",i)}),v(Y,async(i,t)=>{const s=I();if(!s.length){o.value=null;return}let l=s[0];if(t==="first")l=s[0];else if(t==="last")l=s.at(-1)??s[0];else{const d=s.findIndex(([O])=>O===i),r=o.value?s.findIndex(([O])=>O===o.value):-1,se=((d===-1?Math.max(r,0):d)+(t==="next"?1:-1)+s.length)%s.length;l=s[se]??s[0]}if(!l)return;const[x,k]=l;o.value=x,R("change",k.getValue()),R("update:value",k.getValue()),await k.focus()}),pe([()=>u.value,()=>u.equalFn],([i])=>{let t=null;Array.from(c.values()).forEach(s=>{s.checked.value=u.equalFn(s.getValue(),i)}),t=Array.from(c.entries()).find(([,s])=>s.checked.value&&!s.disabled())?.[0]??null,b(t)}),(i,t)=>(p(),z(j(ke),L({appearance:a.appearance,size:a.size,rubber:a.rubber},i.$attrs),{default:C(()=>[S(i.$slots,"default",{},()=>[(p(!0),U(T,null,he(a.options,(s,l)=>(p(),z(ee,{key:`${s.label}-${l}`,label:s.label,value:s.value,disabled:s.disabled},me({_:2},[i.$slots.icon?{name:"icon",fn:C(()=>[S(i.$slots,"icon",{option:s})]),key:"0"}:void 0]),1032,["label","value","disabled"]))),128))])]),_:3},16,["appearance","size","rubber"]))}});ne.__docgenInfo={exportName:"default",displayName:"UiRadioSwitch",description:"",tags:{},props:[{name:"value",description:"Выбранное значение",type:{name:"UiRadioSwitchProperties['value']"},defaultValue:{func:!1,value:"null"}},{name:"options",description:"Список опций",type:{name:"Option[]"},defaultValue:{func:!0,value:"() => []"}},{name:"equalFn",description:"Предикат равенства",type:{name:"EqualPredicate"},defaultValue:{func:!0,value:"(a: unknown, b: unknown): boolean => a === b"}},{name:"appearance",description:"Внешний вид",type:{name:"UiRadioSwitchProperties['appearance']"},defaultValue:{func:!1,value:"APPEARANCE.DEFAULT"}},{name:"size",description:"Размер",type:{name:"UiRadioSwitchProperties['size']"},defaultValue:{func:!1,value:"SIZE.MD"}},{name:"rubber",description:"Растягивание контейнера в зависимости от контента",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"change",type:{names:["unknown"]},description:"Срабатывает при изменении значения"},{name:"update:value",type:{names:["unknown"]},description:"Срабатывает при изменении значения"}],slots:[{name:"default",description:"Набор опций переключателя"},{name:"icon",scoped:!0,bindings:[{name:"option",title:"binding"}],description:"Иконка опции переключателя"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/radio-switch/UiRadioSwitch.vue"]};function _e(a){return new Worker(""+new URL("UiRadioSwitch.remote-FQ_XFmmx.js",import.meta.url).href,{name:a?.name})}function V(a){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...Z(),...a.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{id:"uiradioswitch",children:"UiRadioSwitch"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"UiRadioSwitch"})," - переключатель одного значения из набора, собранный поверх remote/host-схемы ",n.jsx(e.code,{children:"embed-ui"}),`.
Компонент можно использовать в двух режимах: через `,n.jsx(e.code,{children:"options"})," для простого набора вкладок и через ",n.jsx(e.code,{children:"UiRadioSwitchOption"})," для карточек с описанием, иконками и несерилизуемыми значениями."]}),`
`,n.jsx(e.h2,{id:"когда-использовать",children:"Когда использовать"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Нужно выбрать один режим, статус или представление из небольшого фиксированного набора."}),`
`,n.jsxs(e.li,{children:["Нужен более выразительный single-choice, чем обычный ",n.jsx(e.code,{children:"UiRadio"}),"."]}),`
`,n.jsxs(e.li,{children:["Значения опций могут быть объектами, и сравнение нужно делать через ",n.jsx(e.code,{children:"equalFn"}),"."]}),`
`,n.jsxs(e.li,{children:["Для ",n.jsx(e.code,{children:"section"}),"-режима нужны карточки, которые переносятся на новую строку, если не хватает ширины."]}),`
`]}),`
`,n.jsx(e.h2,{id:"примеры",children:"Примеры"}),`
`,n.jsx(e.h3,{id:"1-базовый-переключатель",children:"1. Базовый переключатель"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
  <UiRadioSwitch
    v-model:value="mode"
    :options="options"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { UiRadioSwitch } from '@retailcrm/embed-ui-v1-components/remote'

const mode = ref({ key: 'auto' })

const options = [
  { label: 'Авто', value: { key: 'auto' } },
  { label: 'Ручной', value: { key: 'manual' } },
]
<\/script>
`})}),`
`,n.jsx(P,{of:E}),`
`,n.jsx(e.h3,{id:"2-карточки-с-описанием",children:"2. Карточки с описанием"}),`
`,n.jsxs(e.p,{children:["Для расширенного контента используйте ",n.jsx(e.code,{children:"UiRadioSwitchOption"})," вместо ",n.jsx(e.code,{children:"options"}),"."]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
  <UiRadioSwitch
    v-model:value="mode"
    appearance="section"
    rubber
    :equal-fn="equalFn"
  >
    <UiRadioSwitchOption
      label="Авто"
      :value="{ key: 'auto' }"
      description="Автоматический режим"
    />

    <UiRadioSwitchOption
      label="Ручной"
      :value="{ key: 'manual' }"
      description="Ручная настройка"
    />
  </UiRadioSwitch>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  UiRadioSwitch,
  UiRadioSwitchOption,
} from '@retailcrm/embed-ui-v1-components/remote'

const mode = ref({ key: 'auto' })
const equalFn = (a?: { key: string }, b?: { key: string }) => a?.key === b?.key
<\/script>
`})}),`
`,n.jsx(P,{of:F}),`
`,n.jsx(e.h2,{id:"поведение",children:"Поведение"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"UiRadioSwitch"})," всегда работает как single-select и эмитит ",n.jsx(e.code,{children:"change"})," и ",n.jsx(e.code,{children:"update:value"}),"."]}),`
`,n.jsxs(e.li,{children:["В ",n.jsx(e.code,{children:"default"})," режиме компонент выглядит как компактный segmented control."]}),`
`,n.jsxs(e.li,{children:["В ",n.jsx(e.code,{children:"section"})," режиме каждая опция становится самостоятельной карточкой с описанием и иконкой выбранного состояния."]}),`
`,n.jsxs(e.li,{children:["В ",n.jsx(e.code,{children:"section"})," режиме карточки могут переноситься на следующую строку."]}),`
`,n.jsxs(e.li,{children:["Если ",n.jsx(e.code,{children:"value"})," у опций - объекты или другие сложные значения, задайте ",n.jsx(e.code,{children:"equalFn"}),"."]}),`
`]}),`
`,n.jsx(e.h2,{id:"важные-свойства",children:"Важные свойства"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"value"})," - текущее выбранное значение."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"options"})," - простой способ описать набор опций через массив ",n.jsx(e.code,{children:"{ label, value, disabled }"}),"."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"equalFn"})," - функция сравнения для не-примитивных значений."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"appearance"})," - ",n.jsx(e.code,{children:"default"})," или ",n.jsx(e.code,{children:"section"}),"."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"size"})," - размер переключателя (",n.jsx(e.code,{children:"sm"}),", ",n.jsx(e.code,{children:"md"}),", ",n.jsx(e.code,{children:"lg"}),")."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"rubber"})," - разрешает контейнеру ужиматься/растягиваться по контенту."]}),`
`]}),`
`,n.jsx(e.h2,{id:"слоты",children:"Слоты"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"default"})," - ручная композиция опций через ",n.jsx(e.code,{children:"UiRadioSwitchOption"}),"."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"icon"})," у ",n.jsx(e.code,{children:"UiRadioSwitch"})," - общая иконка для опций, когда используется режим ",n.jsx(e.code,{children:"options"}),"."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"default"}),", ",n.jsx(e.code,{children:"icon"}),", ",n.jsx(e.code,{children:"label"}),", ",n.jsx(e.code,{children:"description"}),", ",n.jsx(e.code,{children:"checkmark"})," у ",n.jsx(e.code,{children:"UiRadioSwitchOption"})," - кастомизация отдельной опции."]}),`
`]}),`
`,n.jsx(e.h2,{id:"a11y",children:"A11y"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Компонент рендерится как ",n.jsx(e.code,{children:"radiogroup"}),", а опции - как ",n.jsx(e.code,{children:"radio"}),"."]}),`
`,n.jsx(e.li,{children:"В группе используется один tab-stop: фокус попадает на выбранную опцию, либо на первую доступную."}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"ArrowLeft"}),", ",n.jsx(e.code,{children:"ArrowRight"}),", ",n.jsx(e.code,{children:"ArrowUp"}),", ",n.jsx(e.code,{children:"ArrowDown"})," перемещают фокус и выбор между доступными опциями."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"Home"})," и ",n.jsx(e.code,{children:"End"})," переводят к первой и последней доступной опции."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"Space"})," и ",n.jsx(e.code,{children:"Enter"})," подтверждают выбор текущей опции."]}),`
`,n.jsx(e.li,{children:"Disabled-опции исключаются из клавиатурной навигации."}),`
`]}),`
`,n.jsx(e.h2,{id:"api",children:"API"}),`
`,n.jsx(xe,{})]})}function Ne(a={}){const{wrapper:e}={...Z(),...a.components};return e?n.jsx(e,{...a,children:n.jsx(V,{...a})}):V(a)}const Pe=ae({UiRadioSwitchOptionShell:oe,UiRadioSwitchRoot:te}),Qe={title:"Components/UiRadioSwitch",component:ne,argTypes:{value:{control:!1},options:{control:!1},equalFn:{control:!1},appearance:{control:"select",options:Object.values(f)},size:{control:"select",options:Object.values(w)},rubber:{control:"boolean"},withSlots:{control:"boolean"}},render:fe({provider:Pe,worker:_e}),parameters:{docs:{page:Ne},layout:"centered"}},D={args:{appearance:f.DEFAULT,size:w.MD,rubber:!1,withSlots:!1}},E=B({args:{appearance:f.DEFAULT,size:w.MD,rubber:!1,withSlots:!1}}),F=B({args:{appearance:f.SECTION,size:w.MD,rubber:!0,withSlots:!0}});D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    appearance: APPEARANCE.DEFAULT,
    size: SIZE.MD,
    rubber: false,
    withSlots: false
  }
}`,...D.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    appearance: APPEARANCE.DEFAULT,
    size: SIZE.MD,
    rubber: false,
    withSlots: false
  }
})`,...E.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    appearance: APPEARANCE.SECTION,
    size: SIZE.MD,
    rubber: true,
    withSlots: true
  }
})`,...F.parameters?.docs?.source}}};const Ge=["Sandbox","Default","StandaloneCards"];export{E as Default,D as Sandbox,F as StandaloneCards,Ge as __namedExportsOrder,Qe as default};
