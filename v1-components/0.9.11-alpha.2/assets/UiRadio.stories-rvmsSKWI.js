import{h as j,r as f,c as p,a,F as g,k as y,n as d,D as u,o as x,m as R,j as U}from"./iframe-BVH_DCqJ.js";import{_ as c}from"./UiRadio-fC1UPhqE.js";import{w as k}from"./utils-BqzVSXwn.js";import{j as o}from"./jsx-runtime-D6KpT4Dz.js";import{useMDXComponents as b}from"./index-j4WyJKbG.js";import{T as C}from"./ToReact-CJJdVyT1.js";import{_ as D}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./preload-helper-PPVm8Dsz.js";import"./composables-CHaFQhe2.js";import"./index-Be_FDnBe.js";const M=["for"],N="delivery-type",_=j({__name:"UiRadio.example",setup(s){const e=[{label:"Option 1",value:"1",disabled:!1},{label:"Option 2",value:"2",disabled:!1},{label:"Option 3",value:"3",disabled:!0}],i=f(e[0].value);return(t,l)=>(x(),p("div",{class:d(t.$style.container)},[a("fieldset",{class:d(t.$style.group)},[l[1]||(l[1]=a("legend",null,"Delivery type",-1)),(x(),p(g,null,y(e,(n,m)=>a("div",{key:n.value,class:d(t.$style.option)},[R(c,{id:"radio-"+m,model:i.value,"onUpdate:model":l[0]||(l[0]=v=>i.value=v),value:n.value,name:N,disabled:n.disabled},null,8,["id","model","value","disabled"]),a("label",{for:"radio-"+m},u(n.label),9,M)],2)),64))],2),a("div",null," Value: "+u(i.value),1)],2))}}),$="_container_1uv3s_1",w="_group_1uv3s_6",F="_option_1uv3s_11",O={container:$,group:w,option:F},S={$style:O},B=D(_,[["__cssModules",S]]);_.__docgenInfo={exportName:"default",displayName:"UiRadio.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiRadio.example.vue"]};function h(s){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...b(),...s.components};return o.jsxs(o.Fragment,{children:[o.jsx(e.h1,{id:"uiradio",children:"UiRadio"}),`
`,o.jsx(e.p,{children:"Одиночный выбор из представленных вариантов"}),`
`,o.jsx(e.h2,{id:"описание",children:"Описание"}),`
`,o.jsx(e.p,{children:`Используется для выбора одного варианта из набора. Состояние с галочкой — функция включена/выделена.
Без — выключена/не выделена.`}),`
`,o.jsx(e.h3,{id:"accessibility",children:"Accessibility"}),`
`,o.jsxs(e.ul,{children:[`
`,o.jsxs(e.li,{children:["Для набора радио-кнопок обязательно используйте общий ",o.jsx(e.code,{children:"name"}),"."]}),`
`,o.jsxs(e.li,{children:["Для группировки и названия набора используйте ",o.jsx(e.code,{children:"fieldset"})," + ",o.jsx(e.code,{children:"legend"})," (или ",o.jsx(e.code,{children:'role="radiogroup"'})," с доступным именем)."]}),`
`,o.jsxs(e.li,{children:["Для каждой отдельной кнопки нужен текстовый label через ",o.jsx(e.code,{children:'<label for="...">'})," или ",o.jsx(e.code,{children:"aria-label"}),"/",o.jsx(e.code,{children:"aria-labelledby"}),"."]}),`
`]}),`
`,o.jsx(C,{is:B})]})}function E(s={}){const{wrapper:e}={...b(),...s.components};return e?o.jsx(e,{...s,children:o.jsx(h,{...s})}):h(s)}const J={title:"Components/UiRadio",component:c,argTypes:{id:{control:!1},model:{control:!1}},render:s=>({components:{UiRadio:c},setup(){return{model:f(s.model),props:U(()=>k(s,["id","model"]))}},template:`
      <UiRadio
          id="radio"
          v-model:model="model"
          v-bind="props"
          style="margin-right: 8px"
      />

      <label for="radio">
          Radio
      </label>
    `}),parameters:{docs:{page:E},layout:"centered"}},r={args:{value:"radio"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    value: 'radio'
  }
}`,...r.parameters?.docs?.source}}};const K=["Sandbox"];export{r as Sandbox,K as __namedExportsOrder,J as default};
