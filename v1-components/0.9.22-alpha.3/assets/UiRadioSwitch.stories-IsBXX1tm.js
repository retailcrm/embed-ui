import{n as f,o as w}from"./index-BN_6-Ncz.js";import{i as g,q as S,h as $,a2 as se,a3 as oe,H as ae,o as p,s as M,w as N,m as y,a as re,c as U,y as A,D as _,E as V,v,F as L,k as ce,u as K,r as B,O as le,j as de,t as ue,p as j}from"./iframe-DDyl2AmK.js";import{d as Z,a as q,w as m,b as h,c as pe}from"./createRemoteStoryRender-DbfDIKnd.js";import{I as me}from"./checkmark-circle-CiR3CKRX.js";import{d as H}from"./docsOnlyStory-D04fiwRX.js";import{u as W,j as n}from"./index-DC6AVhol.js";import{S as P,A as he}from"./blocks-irvO_Kf_.js";import"./UiAlert-DL1WXFlL.js";import"./UiTransition-C_SZL8sB.js";import"./checkmark-circle-outlined-D7JQQjfO.js";import"./clear-DNT8teyS.js";import"./info-outlined-mI6ap4ux.js";import"./UiAddButton-DPDk1X46.js";import"./UiAvatar-B81jJYDc.js";import"./UiImage-BusBqEVS.js";import"./predicate-ClulhfEu.js";import"./UiAvatarList-Blc2DaUu.js";import"./UiButton-DVSNWWSO.js";import"./render-CFCB9hDK.js";import"./composables-DVi6oeou.js";import"./UiCalendar-qP4zSNGb.js";import"./chevron-right-DhgHXoQF.js";import"./plugin-DBXjfIqs.js";import"./index-BAxMPZdI.js";import"./UiCheckbox-DJtpsEk8.js";import"./done-CPYICBU4.js";import"./utils-BqzVSXwn.js";import"./UiCollapse-BYVlo_1R.js";import"./UiCollapseGroup-DDi5yXSZ.js";import"./UiCopyButton-BpSLbXh0.js";import"./UiTooltip-CgKFebDj.js";import"./UiPopper-CtyW38v3.js";import"./UiDate-S8crmajf.js";import"./ru-Chw6HHdR.js";import"./UiDatePicker-6yuPb3vb.js";import"./UiTextbox-Cp3VoCvx.js";import"./UiMenuItem-BCh28-bQ.js";import"./UiScrollBox-pROz8lVa.js";import"./UiError-DeL8Md7R.js";import"./UiInfobox-Wo7jvY2w.js";import"./UiLink-Ci033uQc.js";import"./UiYandexMap-nHh77mw2.js";import"./add-igqe0Lf_.js";import"./caret-down-S39XXVlx.js";import"./UiPopperTarget-wB-kx3Lr.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./UiModalSidebar-CMdnDQBK.js";import"./uid-BWdYvJYd.js";import"./UiModalWindow-BeFROK4B.js";import"./UiRadio-B7t7SNhJ.js";import"./UiSkeleton-CLxphY9X.js";import"./UiSlider-BrjJ0zPm.js";import"./UiSwitch-CQ1DsvmW.js";import"./UiTag-C_AWhmbM.js";import"./UiTimePicker-Di5bRYuC.js";import"./UiToggleButton-CD1AtQpV.js";import"./UiToolbarButton-Bj-VZc36.js";import"./UiToolbarLink-BwCG9I2I.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CDnKqZOh.js";const X=Symbol("UiRadioSwitchAppearance"),J=Symbol("UiRadioSwitchSize"),G=Symbol("UiRadioSwitchRegistry"),Q=Symbol("UiRadioSwitchUpdate"),Y=Symbol("UiRadioSwitchFocusableId"),ee=Symbol("UiRadioSwitchSetFocusableId"),ne=Symbol("UiRadioSwitchMoveFocus"),fe=()=>g(X,S(()=>f.DEFAULT)),be=()=>g(J,S(()=>w.MD)),xe=()=>g(G,{register:()=>{},unregister:()=>{}}),je=()=>g(Q,()=>{}),ve=()=>g(Y,S(()=>null)),ye=()=>g(ee,()=>{}),Se=()=>g(ne,()=>{}),we="UiRadioSwitchRoot",ge=Z(we),Re="UiRadioSwitchOptionShell",Ue=Z(Re,{emits:["click","focus","blur","keydown"],methods:{focus:q(),blur:q()}}),ke={class:"ui-v1-radio-switch-option__head"},Ae={key:0,class:"ui-v1-radio-switch-option__icon"},Ee={key:1,class:"ui-v1-radio-switch-option__label"},Fe={key:0,class:"ui-v1-radio-switch-option__description"},Ie={key:1,class:"ui-v1-radio-switch-option__done"};let Oe=0;const De={},D=$({...De,inheritAttrs:!1,__name:"UiRadioSwitchOption",props:{id:{type:String,default:()=>"ui-v1-radio-switch-option-"+ ++Oe},label:{type:String,default:""},value:{type:null,required:!0},description:{type:String,default:""},disabled:{type:Boolean,default:!1}},setup(s){const e=s,u=fe(),R=ve(),c=Se(),a=se("shell"),I=be(),b=xe(),i=ye(),o=je(),t=B(!1),l=S(()=>!e.disabled&&R.value===e.id?0:-1),x=()=>{e.disabled||(i(e.id),o(e.value))},k=()=>{e.disabled||i(e.id)},d=r=>{if(!e.disabled)switch(r.key){case" ":case"Enter":i(e.id),o(e.value);return;case"ArrowDown":case"ArrowRight":c(e.id,"next");return;case"ArrowUp":case"ArrowLeft":c(e.id,"prev");return;case"Home":c(e.id,"first");return;case"End":c(e.id,"last");return}};return oe(()=>{b.register(e.id,{getValue:()=>e.value,checked:t,disabled:()=>e.disabled,focus:()=>a.value?.focus()})}),ae(()=>{b.unregister(e.id)}),(r,ie)=>(p(),M(v(Ue),K({id:s.id,ref_key:"shell",ref:a,appearance:v(u),size:v(I),checked:t.value,disabled:s.disabled,tabindex:l.value},r.$attrs,{onClick:x,onFocus:k,onKeydown:[m(h(d,["prevent"]),["space"]),m(h(d,["prevent"]),["enter"]),m(h(d,["prevent"]),["left"]),m(h(d,["prevent"]),["right"]),m(h(d,["prevent"]),["up"]),m(h(d,["prevent"]),["down"]),m(h(d,["prevent"]),["home"]),m(h(d,["prevent"]),["end"])]}),{default:N(()=>[y(r.$slots,"default",{},()=>[re("div",ke,[r.$slots.icon?(p(),U("span",Ae,[y(r.$slots,"icon")])):A("",!0),r.$slots.label||s.label?(p(),U("div",Ee,[y(r.$slots,"label",{},()=>[_(V(s.label),1)])])):A("",!0)]),v(u)===v(f).SECTION?(p(),U(L,{key:0},[r.$slots.description||s.description?(p(),U("div",Fe,[y(r.$slots,"description",{},()=>[_(V(s.description),1)])])):A("",!0),t.value?(p(),U("div",Ie,[y(r.$slots,"checkmark",{},()=>[ce(v(me))])])):A("",!0)],64)):A("",!0)])]),_:3},16,["id","appearance","size","checked","disabled","tabindex","onKeydown"]))}});D.__docgenInfo=Object.assign({displayName:D.name??D.__name},{exportName:"default",displayName:"UiRadioSwitchOption",description:"",tags:{},props:[{name:"id",description:"Идентификатор",type:{name:"string"},defaultValue:{func:!0,value:"() => 'ui-v1-radio-switch-option-' + ++counter"}},{name:"label",description:"Заголовок",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"value",description:"Значение опции",type:{name:"UiRadioSwitchOptionProperties['value']"},required:!0},{name:"description",description:"Используется только c appearance=section",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"disabled",description:"Индикатор, заблокирована опция или нет",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default",description:"Полный пользовательский шаблон опции"},{name:"icon",description:"Иконка опции"},{name:"label",description:"Заголовок опции"},{name:"description",description:"Дополнительное описание опции"},{name:"checkmark",description:"Иконка выбранного состояния"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/radio-switch/UiRadioSwitchOption.vue"]});const z=$({inheritAttrs:!1,__name:"UiRadioSwitch",props:{value:{type:null,default:null},options:{type:Array,default:()=>[]},equalFn:{type:Function,default:(s,e)=>s===e},appearance:{type:String,default:f.DEFAULT,validator:s=>Object.values(f).includes(s)},size:{type:String,default:w.MD,validator:s=>Object.values(w).includes(s)},rubber:{type:Boolean,default:!1}},emits:["change","update:value"],setup(s,{emit:e}){const u=s,R=e,c=new Map,a=B(null),I=()=>Array.from(c.entries()).filter(([,i])=>!i.disabled()),b=i=>{const o=I(),t=new Set(o.map(([x])=>x)),l=o.find(([,x])=>x.checked.value);if(i&&t.has(i)){a.value=i;return}a.value&&t.has(a.value)||(a.value=l?.[0]??o[0]?.[0]??null)};return j(X,S(()=>u.appearance)),j(Y,S(()=>a.value)),j(J,S(()=>u.size)),j(ee,i=>{b(i)}),j(G,{register:(i,o)=>{c.has(i)||(o.checked.value=u.equalFn(o.getValue(),u.value),c.set(i,o),b(o.checked.value?i:a.value))},unregister:i=>{c.delete(i),a.value===i&&b()}}),j(Q,i=>{R("change",i),R("update:value",i)}),j(ne,async(i,o)=>{const t=I();if(!t.length){a.value=null;return}let l=t[0];if(o==="first")l=t[0];else if(o==="last")l=t.at(-1)??t[0];else{const d=t.findIndex(([C])=>C===i),r=a.value?t.findIndex(([C])=>C===a.value):-1,te=((d===-1?Math.max(r,0):d)+(o==="next"?1:-1)+t.length)%t.length;l=t[te]??t[0]}if(!l)return;const[x,k]=l;a.value=x,R("change",k.getValue()),R("update:value",k.getValue()),await k.focus()}),le([()=>u.value,()=>u.equalFn],([i])=>{let o=null;Array.from(c.values()).forEach(t=>{t.checked.value=u.equalFn(t.getValue(),i)}),o=Array.from(c.entries()).find(([,t])=>t.checked.value&&!t.disabled())?.[0]??null,b(o)}),(i,o)=>(p(),M(v(ge),K({appearance:s.appearance,size:s.size,rubber:s.rubber},i.$attrs),{default:N(()=>[y(i.$slots,"default",{},()=>[(p(!0),U(L,null,de(s.options,(t,l)=>(p(),M(D,{key:`${t.label}-${l}`,label:t.label,value:t.value,disabled:t.disabled},ue({_:2},[i.$slots.icon?{name:"icon",fn:N(()=>[y(i.$slots,"icon",{option:t})]),key:"0"}:void 0]),1032,["label","value","disabled"]))),128))])]),_:3},16,["appearance","size","rubber"]))}});z.__docgenInfo=Object.assign({displayName:z.name??z.__name},{exportName:"default",displayName:"UiRadioSwitch",description:"",tags:{},props:[{name:"value",description:"Выбранное значение",type:{name:"UiRadioSwitchProperties['value']"},defaultValue:{func:!1,value:"null"}},{name:"options",description:"Список опций",type:{name:"Option[]"},defaultValue:{func:!0,value:"() => []"}},{name:"equalFn",description:"Предикат равенства",type:{name:"EqualPredicate"},defaultValue:{func:!0,value:"(a: unknown, b: unknown): boolean => a === b"}},{name:"appearance",description:"Внешний вид",type:{name:"UiRadioSwitchProperties['appearance']"},defaultValue:{func:!1,value:"APPEARANCE.DEFAULT"}},{name:"size",description:"Размер",type:{name:"UiRadioSwitchProperties['size']"},defaultValue:{func:!1,value:"SIZE.MD"}},{name:"rubber",description:"Растягивание контейнера в зависимости от контента",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"change",type:{names:["unknown"]},description:"Срабатывает при изменении значения"},{name:"update:value",type:{names:["unknown"]},description:"Срабатывает при изменении значения"}],slots:[{name:"default",description:"Набор опций переключателя"},{name:"icon",scoped:!0,bindings:[{name:"option",title:"binding"}],description:"Иконка опции переключателя"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/radio-switch/UiRadioSwitch.vue"]});function ze(s){return new Worker(""+new URL("UiRadioSwitch.remote-Bq5yDJIk.js",import.meta.url).href,{name:s?.name})}function T(s){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...W(),...s.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{id:"uiradioswitch",children:"UiRadioSwitch"}),`
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
`,n.jsx(he,{})]})}function Ce(s={}){const{wrapper:e}={...W(),...s.components};return e?n.jsx(e,{...s,children:n.jsx(T,{...s})}):T(s)}const Ln={title:"Components/UiRadioSwitch",component:z,argTypes:{value:{control:!1},options:{control:!1},equalFn:{control:!1},appearance:{control:"select",options:Object.values(f)},size:{control:"select",options:Object.values(w)},rubber:{control:"boolean"},withSlots:{control:"boolean"}},render:pe({worker:ze}),parameters:{docs:{page:Ce},layout:"centered"}},O={args:{appearance:f.DEFAULT,size:w.MD,rubber:!1,withSlots:!1}},E=H({args:{appearance:f.DEFAULT,size:w.MD,rubber:!1,withSlots:!1}}),F=H({args:{appearance:f.SECTION,size:w.MD,rubber:!0,withSlots:!0}});O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    appearance: APPEARANCE.DEFAULT,
    size: SIZE.MD,
    rubber: false,
    withSlots: false
  }
}`,...O.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`docsOnlyStory({
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
})`,...F.parameters?.docs?.source}}};const Kn=["Sandbox","Default","StandaloneCards"];export{E as Default,O as Sandbox,F as StandaloneCards,Kn as __namedExportsOrder,Ln as default};
