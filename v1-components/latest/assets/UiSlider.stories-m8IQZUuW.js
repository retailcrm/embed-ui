import{h as y,r as x,c as t,m as f,a as i,C as u,D as s,o as c,w as S,G as U,j as R}from"./iframe-Cr8HRLwB.js";import{_ as p,T as o}from"./UiSlider-DKUlQOvy.js";import{o as G}from"./utils-BqzVSXwn.js";import{j as n}from"./jsx-runtime-iObdlBz6.js";import{useMDXComponents as A}from"./index-CneOKGju.js";import{A as T}from"./blocks-C-WhsfxA.js";import{T as m}from"./ToReact-DAvbhMbc.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BXwK_YS1.js";const L={style:{display:"grid",gap:"12px",width:"320px"}},w=y({__name:"UiSlider.single.example",setup(r){const e=x(20);return(d,l)=>(c(),t("div",L,[f(p,{value:e.value,"onUpdate:value":l[0]||(l[0]=a=>e.value=a)},null,8,["value"]),i("div",null,[l[1]||(l[1]=i("strong",null,"Value:",-1)),u(" "+s(e.value),1)])]))}});w.__docgenInfo={exportName:"default",displayName:"UiSlider.single.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiSlider.single.example.vue"]};const V={style:{display:"grid",gap:"12px",width:"320px"}},k=y({__name:"UiSlider.range.example",setup(r){const e=x([20,80]);return(d,l)=>(c(),t("div",V,[f(p,{value:e.value,"onUpdate:value":l[0]||(l[0]=a=>e.value=a),type:"range"},null,8,["value"]),i("div",null,[l[1]||(l[1]=i("strong",null,"Value:",-1)),u(" ["+s(e.value[0])+", "+s(e.value[1])+"]",1)])]))}});k.__docgenInfo={exportName:"default",displayName:"UiSlider.range.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiSlider.range.example.vue"]};const $={style:{display:"grid",gap:"12px",width:"320px"}},C={key:0},D={key:1},_=y({__name:"UiSlider.labelled.example",props:{range:{type:Boolean,default:!1}},setup(r){const e=x([20,80]);return(d,l)=>(c(),t("div",$,[f(p,{value:e.value,"onUpdate:value":l[0]||(l[0]=a=>e.value=a),type:r.range?"range":"single",min:0,max:100,labelled:""},{label:S(({boundary:a})=>[u(s(a)+"% ",1)]),handle:S(({boundary:a})=>[u(s(a)+"% ",1)]),_:1},8,["value","type"]),i("div",null,[l[1]||(l[1]=i("strong",null,"Value:",-1)),Array.isArray(e.value)?(c(),t("span",C,"["+s(e.value[0])+", "+s(e.value[1])+"]",1)):(c(),t("span",D,s(e.value),1))])]))}});_.__docgenInfo={exportName:"default",displayName:"UiSlider.labelled.example",description:"",tags:{},props:[{name:"range",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiSlider.labelled.example.vue"]};const I={style:{display:"grid",gap:"12px",width:"320px"}},E=y({__name:"UiSlider.bounds.example",setup(r){const e=x([0,80]);return(d,l)=>(c(),t("div",I,[f(p,{value:e.value,"onUpdate:value":l[0]||(l[0]=a=>e.value=a),type:"range",min:10,max:60},null,8,["value"]),l[2]||(l[2]=i("div",null,[i("strong",null,"Min/Max:"),u(" 10 / 60")],-1)),i("div",null,[l[1]||(l[1]=i("strong",null,"Value:",-1)),u(" ["+s(e.value[0])+", "+s(e.value[1])+"]",1)])]))}});E.__docgenInfo={exportName:"default",displayName:"UiSlider.bounds.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiSlider.bounds.example.vue"]};function N(r){const e={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...A(),...r.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{id:"uislider",children:"UiSlider"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"UiSlider"})," - компонент для выбора числового значения в заданном диапазоне."]}),`
`,n.jsx(e.h2,{id:"для-чего-подходит",children:"Для чего подходит"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["настройка одного значения (",n.jsx(e.code,{children:"single"}),");"]}),`
`,n.jsxs(e.li,{children:["выбор диапазона (",n.jsx(e.code,{children:"range"}),");"]}),`
`,n.jsxs(e.li,{children:["управление слайдером с подписями на границах и ручках (",n.jsx(e.code,{children:"labelled"}),")."]}),`
`]}),`
`,n.jsx(e.h2,{id:"импорт",children:"Импорт"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-ts",children:`import { UiSlider } from '@retailcrm/embed-ui-v1-components/remote'
`})}),`
`,n.jsx(e.h2,{id:"базовое-использование",children:"Базовое использование"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
  <UiSlider v-model:value="value" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UiSlider } from '@retailcrm/embed-ui-v1-components/remote'

const value = ref(20)
<\/script>
`})}),`
`,n.jsx(m,{is:w}),`
`,n.jsx(e.h2,{id:"режим-диапазона",children:"Режим диапазона"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
  <UiSlider
    v-model:value="value"
    type="range"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UiSlider } from '@retailcrm/embed-ui-v1-components/remote'

const value = ref<number[]>([20, 80])
<\/script>
`})}),`
`,n.jsx(m,{is:k}),`
`,n.jsxs(e.h2,{id:"ограничение-диапазона-min--max",children:["Ограничение диапазона (",n.jsx(e.code,{children:"min"})," / ",n.jsx(e.code,{children:"max"}),")"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<UiSlider
  v-model:value="value"
  type="range"
  :min="10"
  :max="60"
/>
`})}),`
`,n.jsxs(e.p,{children:["Если в ",n.jsx(e.code,{children:"value"})," переданы числа вне границ, компонент ограничит их в пределах ",n.jsx(e.code,{children:"min..max"}),"."]}),`
`,n.jsx(m,{is:E}),`
`,n.jsxs(e.h2,{id:"вариант-с-метками-labelled",children:["Вариант с метками (",n.jsx(e.code,{children:"labelled"}),")"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<UiSlider
  v-model:value="value"
  type="range"
  labelled
>
  <template #label="{ boundary }">
    {{ boundary }}%
  </template>

  <template #handle="{ boundary }">
    {{ boundary }}%
  </template>
</UiSlider>
`})}),`
`,n.jsx(m,{is:_}),`
`,n.jsx(m,{is:_,range:!0}),`
`,n.jsx(e.h2,{id:"модель-данных",children:"Модель данных"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"value"})," зависит от ",n.jsx(e.code,{children:"type"}),":"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:'type="single"'})," -> ",n.jsx(e.code,{children:"number"})]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:'type="range"'})," -> ",n.jsx(e.code,{children:"number[]"})]}),`
`]}),`
`,n.jsxs(e.p,{children:["Для ",n.jsx(e.code,{children:"range"})," рекомендуется хранить ",n.jsx(e.code,{children:"value"})," как массив из двух чисел."]}),`
`,n.jsx(e.h2,{id:"события",children:"События"}),`
`,n.jsx(e.p,{children:"Компонент эмитит:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"update:value"})," - новое значение слайдера (",n.jsx(e.code,{children:"number"})," или ",n.jsx(e.code,{children:"number[]"}),")."]}),`
`]}),`
`,n.jsx(e.p,{children:"Пример:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<UiSlider
  :value="value"
  @update:value="value = $event"
/>
`})}),`
`,n.jsx(e.h2,{id:"keyboard-и-a11y",children:"Keyboard и A11y"}),`
`,n.jsx(e.p,{children:"Поддержка клавиатуры:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"ArrowLeft"})," / ",n.jsx(e.code,{children:"ArrowDown"})," - уменьшить значение;"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"ArrowRight"})," / ",n.jsx(e.code,{children:"ArrowUp"})," - увеличить значение;"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"Home"})," - установить минимальное значение;"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"End"})," - установить максимальное значение;"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"PageUp"})," / ",n.jsx(e.code,{children:"PageDown"})," - увеличить/уменьшить крупным шагом."]}),`
`]}),`
`,n.jsx(e.p,{children:"Доступность:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["в ",n.jsx(e.code,{children:"single"})," корневой элемент имеет ",n.jsx(e.code,{children:'role="slider"'}),";"]}),`
`,n.jsxs(e.li,{children:["в ",n.jsx(e.code,{children:"range"})," ручки имеют ",n.jsx(e.code,{children:'role="slider"'}),", а корень ",n.jsx(e.code,{children:'role="group"'}),";"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"aria-valuemin"}),", ",n.jsx(e.code,{children:"aria-valuemax"}),", ",n.jsx(e.code,{children:"aria-valuenow"})," выставляются автоматически."]}),`
`]}),`
`,n.jsx(e.h2,{id:"полный-api",children:"Полный API"}),`
`,n.jsx(T,{})]})}function P(r={}){const{wrapper:e}={...A(),...r.components};return e?n.jsx(e,{...r,children:n.jsx(N,{...r})}):N(r)}const z={title:"Components/UiSlider",component:p,args:{value:20,type:o.SINGLE,min:0,max:100,labelled:!1},argTypes:{value:{control:!1},type:{control:"select",options:Object.values(o)},min:{control:"number"},max:{control:"number"},labelled:{control:"boolean"},label:{control:!1},handle:{control:!1}},render:r=>({components:{UiSlider:p},setup(){const e=x(r.value??20);return U(()=>r.type,d=>{d===o.RANGE&&!Array.isArray(e.value)&&(e.value=[r.min??0,r.max??100]),d===o.SINGLE&&Array.isArray(e.value)&&(e.value=e.value[0]??r.min??0)},{immediate:!0}),U(()=>r.value,d=>{typeof d<"u"&&(e.value=d)}),{value:e,props:R(()=>G(r,["value"]))}},template:`
      <div style="width: 360px">
          <UiSlider v-model:value="value" v-bind="props">
              <template v-if="props.labelled" #label="{ boundary }">
                  {{ boundary }}%
              </template>

              <template v-if="props.labelled" #handle="{ boundary }">
                  {{ boundary }}%
              </template>
          </UiSlider>
      </div>
    `}),parameters:{docs:{page:P},layout:"centered"}},v={},h={args:{type:o.RANGE,value:[20,80]}},j={args:{labelled:!0}},g={args:{labelled:!0,type:o.RANGE,value:[25,65]}},b={args:{type:o.RANGE,min:10,max:60,value:[0,80]}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:"{}",...v.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    type: TYPE.RANGE,
    value: [20, 80]
  }
}`,...h.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    labelled: true
  }
}`,...j.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    labelled: true,
    type: TYPE.RANGE,
    value: [25, 65]
  }
}`,...g.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    type: TYPE.RANGE,
    min: 10,
    max: 60,
    value: [0, 80]
  }
}`,...b.parameters?.docs?.source}}};const J=["Sandbox","Range","Labelled","LabelledRange","BoundedRange"];export{b as BoundedRange,j as Labelled,g as LabelledRange,h as Range,v as Sandbox,J as __namedExportsOrder,z as default};
