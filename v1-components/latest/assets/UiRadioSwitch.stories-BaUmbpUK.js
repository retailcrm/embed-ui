import{h as te}from"./host-C99Wiwa6.js";import{A as b,S as w,_ as oe,a as re}from"./UiRadioSwitchRoot-Cu91Grzt.js";import{i as g,j as y,h as T,$ as ce,a4 as le,r as $,a5 as de,P as ue,o as p,y as z,z as C,q as S,a as pe,D as d,c as U,G as E,K as M,t as P,F as K,m as he,A as L,p as j,w as me,k as fe,C as be}from"./iframe-7PfFZbMo.js";import{d as B,a as N,w as m,b as f,c as xe}from"./createRemoteStoryRender-Bj7plM2v.js";import{I as ve}from"./checkmark-circle-DQ-1wKgQ.js";import{d as Z}from"./docsOnlyStory-D04fiwRX.js";import{j as n}from"./jsx-runtime-oUFsCJCe.js";import{useMDXComponents as H}from"./index-nKJCzsSA.js";import{b as V,A as je}from"./blocks-DxbhbOcf.js";import"./preload-helper-PPVm8Dsz.js";import"./index-a22oIHiu.js";const W=Symbol("UiRadioSwitchAppearance"),X=Symbol("UiRadioSwitchSize"),G=Symbol("UiRadioSwitchRegistry"),Q=Symbol("UiRadioSwitchUpdate"),Y=Symbol("UiRadioSwitchFocusableId"),J=Symbol("UiRadioSwitchSetFocusableId"),ee=Symbol("UiRadioSwitchMoveFocus"),Se=()=>g(W,y(()=>b.DEFAULT)),ye=()=>g(X,y(()=>w.MD)),we=()=>g(G,{register:()=>{},unregister:()=>{}}),ge=()=>g(Q,()=>{}),Re=()=>g(Y,y(()=>null)),Ue=()=>g(J,()=>{}),ke=()=>g(ee,()=>{}),Ae="UiRadioSwitchRoot",Ee=B(Ae),Fe="UiRadioSwitchOptionShell",Ie=B(Fe,{emits:["click","focus","blur","keydown"],methods:{focus:N(),blur:N()}}),De={class:"ui-v1-radio-switch-option__head"},Oe={key:0,class:"ui-v1-radio-switch-option__icon"},_e={key:1,class:"ui-v1-radio-switch-option__label"},ze={key:0,class:"ui-v1-radio-switch-option__description"},Ce={key:1,class:"ui-v1-radio-switch-option__done"};let Me=0;const Pe={},ne=T({...Pe,inheritAttrs:!1,__name:"UiRadioSwitchOption",props:{id:{type:String,default:()=>"ui-v1-radio-switch-option-"+ ++Me},label:{type:String,default:""},value:{type:null,required:!0},description:{type:String,default:""},disabled:{type:Boolean,default:!1}},setup(a){const e=a,c=ce(),x=Se(),h=Re(),o=ke(),k=le("shell"),R=ye(),i=we(),t=Ue(),s=ge(),r=$(!1),v=y(()=>!e.disabled&&h.value===e.id?0:-1),A=()=>{e.disabled||(t(e.id),s(e.value))},D=()=>{e.disabled||t(e.id)},l=u=>{if(!e.disabled)switch(u.key){case" ":case"Enter":t(e.id),s(e.value);return;case"ArrowDown":case"ArrowRight":o(e.id,"next");return;case"ArrowUp":case"ArrowLeft":o(e.id,"prev");return;case"Home":o(e.id,"first");return;case"End":o(e.id,"last");return}};return de(()=>{i.register(e.id,{getValue:()=>e.value,checked:r,disabled:()=>e.disabled,focus:()=>k.value?.focus()})}),ue(()=>{i.unregister(e.id)}),(u,se)=>(p(),z(d(Ie),L({id:a.id,ref_key:"shell",ref:k,appearance:d(x),size:d(R),checked:r.value,disabled:a.disabled,tabindex:v.value},u.$attrs,{onClick:A,onFocus:D,onKeydown:[m(f(l,["prevent"]),["space"]),m(f(l,["prevent"]),["enter"]),m(f(l,["prevent"]),["left"]),m(f(l,["prevent"]),["right"]),m(f(l,["prevent"]),["up"]),m(f(l,["prevent"]),["down"]),m(f(l,["prevent"]),["home"]),m(f(l,["prevent"]),["end"])]}),{default:C(()=>[S(u.$slots,"default",{},()=>[pe("div",De,["icon"in d(c)?(p(),U("span",Oe,[S(u.$slots,"icon")])):E("",!0),"label"in d(c)||a.label?(p(),U("div",_e,[S(u.$slots,"label",{},()=>[M(P(a.label),1)])])):E("",!0)]),d(x)===d(b).SECTION?(p(),U(K,{key:0},["description"in d(c)||a.description?(p(),U("div",ze,[S(u.$slots,"description",{},()=>[M(P(a.description),1)])])):E("",!0),r.value?(p(),U("div",Ce,[S(u.$slots,"checkmark",{},()=>[he(d(ve))])])):E("",!0)],64)):E("",!0)])]),_:3},16,["id","appearance","size","checked","disabled","tabindex","onKeydown"]))}});ne.__docgenInfo={exportName:"default",displayName:"UiRadioSwitchOption",description:"",tags:{},props:[{name:"id",description:"Идентификатор",type:{name:"string"},defaultValue:{func:!0,value:"() => 'ui-v1-radio-switch-option-' + ++counter"}},{name:"label",description:"Заголовок",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"value",description:"Значение опции",type:{name:"UiRadioSwitchOptionProperties['value']"},required:!0},{name:"description",description:"Используется только c appearance=section",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"disabled",description:"Индикатор, заблокирована опция или нет",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default",description:"Полный пользовательский шаблон опции"},{name:"icon",description:"Иконка опции"},{name:"label",description:"Заголовок опции"},{name:"description",description:"Дополнительное описание опции"},{name:"checkmark",description:"Иконка выбранного состояния"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/radio-switch/UiRadioSwitchOption.vue"]};const ie=T({inheritAttrs:!1,__name:"UiRadioSwitch",props:{value:{type:null,default:null},options:{type:Array,default:()=>[]},equalFn:{type:Function,default:(a,e)=>a===e},appearance:{type:String,default:b.DEFAULT,validator:a=>Object.values(b).includes(a)},size:{type:String,default:w.MD,validator:a=>Object.values(w).includes(a)},rubber:{type:Boolean,default:!1}},emits:["change","update:value"],setup(a,{emit:e}){const c=a,x=e,h=new Map,o=$(null),k=()=>Array.from(h.entries()).filter(([,i])=>!i.disabled()),R=i=>{const t=k(),s=new Set(t.map(([v])=>v)),r=t.find(([,v])=>v.checked.value);if(i&&s.has(i)){o.value=i;return}o.value&&s.has(o.value)||(o.value=r?.[0]??t[0]?.[0]??null)};return j(W,y(()=>c.appearance)),j(Y,y(()=>o.value)),j(X,y(()=>c.size)),j(J,i=>{R(i)}),j(G,{register:(i,t)=>{h.has(i)||(t.checked.value=c.equalFn(t.getValue(),c.value),h.set(i,t),R(t.checked.value?i:o.value))},unregister:i=>{h.delete(i),o.value===i&&R()}}),j(Q,i=>{x("change",i),x("update:value",i)}),j(ee,async(i,t)=>{const s=k();if(!s.length){o.value=null;return}let r=s[0];if(t==="first")r=s[0];else if(t==="last")r=s.at(-1)??s[0];else{const D=s.findIndex(([_])=>_===i),l=o.value?s.findIndex(([_])=>_===o.value):-1,ae=((D===-1?Math.max(l,0):D)+(t==="next"?1:-1)+s.length)%s.length;r=s[ae]??s[0]}if(!r)return;const[v,A]=r;o.value=v,x("change",A.getValue()),x("update:value",A.getValue()),await A.focus()}),me([()=>c.value,()=>c.equalFn],([i])=>{let t=null;Array.from(h.values()).forEach(s=>{s.checked.value=c.equalFn(s.getValue(),i)}),t=Array.from(h.entries()).find(([,s])=>s.checked.value&&!s.disabled())?.[0]??null,R(t)}),(i,t)=>(p(),z(d(Ee),L({appearance:a.appearance,size:a.size,rubber:a.rubber},i.$attrs),{default:C(()=>[S(i.$slots,"default",{},()=>[(p(!0),U(K,null,fe(a.options,(s,r)=>(p(),z(ne,{key:`${s.label}-${r}`,label:s.label,value:s.value,disabled:s.disabled},be({_:2},[i.$slots.icon?{name:"icon",fn:C(()=>[S(i.$slots,"icon",{option:s})]),key:"0"}:void 0]),1032,["label","value","disabled"]))),128))])]),_:3},16,["appearance","size","rubber"]))}});ie.__docgenInfo={exportName:"default",displayName:"UiRadioSwitch",description:"",tags:{},props:[{name:"value",description:"Выбранное значение",type:{name:"UiRadioSwitchProperties['value']"},defaultValue:{func:!1,value:"null"}},{name:"options",description:"Список опций",type:{name:"Option[]"},defaultValue:{func:!0,value:"() => []"}},{name:"equalFn",description:"Предикат равенства",type:{name:"EqualPredicate"},defaultValue:{func:!0,value:"(a: unknown, b: unknown): boolean => a === b"}},{name:"appearance",description:"Внешний вид",type:{name:"UiRadioSwitchProperties['appearance']"},defaultValue:{func:!1,value:"APPEARANCE.DEFAULT"}},{name:"size",description:"Размер",type:{name:"UiRadioSwitchProperties['size']"},defaultValue:{func:!1,value:"SIZE.MD"}},{name:"rubber",description:"Растягивание контейнера в зависимости от контента",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"change",type:{names:["unknown"]},description:"Срабатывает при изменении значения"},{name:"update:value",type:{names:["unknown"]},description:"Срабатывает при изменении значения"}],slots:[{name:"default",description:"Набор опций переключателя"},{name:"icon",scoped:!0,bindings:[{name:"option",title:"binding"}],description:"Иконка опции переключателя"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/radio-switch/UiRadioSwitch.vue"]};function Ne(a){return new Worker(""+new URL("UiRadioSwitch.remote-DY9OHQBD.js",import.meta.url).href,{name:a?.name})}function q(a){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...H(),...a.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{id:"uiradioswitch",children:"UiRadioSwitch"}),`
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
`,n.jsx(V,{of:F}),`
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
`,n.jsx(V,{of:I}),`
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
`,n.jsx(je,{})]})}function Ve(a={}){const{wrapper:e}={...H(),...a.components};return e?n.jsx(e,{...a,children:n.jsx(q,{...a})}):q(a)}const qe=te({UiRadioSwitchOptionShell:re,UiRadioSwitchRoot:oe}),Ye={title:"Components/UiRadioSwitch",component:ie,argTypes:{value:{control:!1},options:{control:!1},equalFn:{control:!1},appearance:{control:"select",options:Object.values(b)},size:{control:"select",options:Object.values(w)},rubber:{control:"boolean"},withSlots:{control:"boolean"}},render:xe({provider:qe,worker:Ne}),parameters:{docs:{page:Ve},layout:"centered"}},O={args:{appearance:b.DEFAULT,size:w.MD,rubber:!1,withSlots:!1}},F=Z({args:{appearance:b.DEFAULT,size:w.MD,rubber:!1,withSlots:!1}}),I=Z({args:{appearance:b.SECTION,size:w.MD,rubber:!0,withSlots:!0}});O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    appearance: APPEARANCE.DEFAULT,
    size: SIZE.MD,
    rubber: false,
    withSlots: false
  }
}`,...O.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    appearance: APPEARANCE.DEFAULT,
    size: SIZE.MD,
    rubber: false,
    withSlots: false
  }
})`,...F.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    appearance: APPEARANCE.SECTION,
    size: SIZE.MD,
    rubber: true,
    withSlots: true
  }
})`,...I.parameters?.docs?.source}}};const Je=["Sandbox","Default","StandaloneCards"];export{F as Default,O as Sandbox,I as StandaloneCards,Je as __namedExportsOrder,Ye as default};
