import{_ as i}from"./UiRadio-DuRcA5sX.js";import{g,r as v,c,a as r,F as y,k as R,A as p,n as u,o as _,m as j,h as U}from"./iframe-CzwIxcDt.js";import{w as k}from"./utils-BqzVSXwn.js";import{j as a}from"./index-Djyvt97q.js";import{useMDXComponents as b}from"./index-Cdf3Trmt.js";import{T as C}from"./ToReact-rGZD6-Z2.js";import{_ as M}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./composables-B2GYaaEv.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B44Kv34C.js";const w=["for"],x=g({__name:"UiRadio.example",setup(e){const o=[{label:"Option 1",value:"1",disabled:!1},{label:"Option 2",value:"2",disabled:!1},{label:"Option 3",value:"3",disabled:!0}],t=v(o[0].value);return(l,d)=>(_(),c("div",{class:u(l.$style.container)},[(_(),c(y,null,R(o,(s,m)=>r("div",{key:s.value,class:u(l.$style.option)},[j(i,{id:"radio-"+m,model:t.value,"onUpdate:model":d[0]||(d[0]=h=>t.value=h),value:s.value,disabled:s.disabled},null,8,["id","model","value","disabled"]),r("label",{for:"radio-"+m},p(s.label),9,w)],2)),64)),r("div",null," Value: "+p(t.value),1)],2))}}),D="_container_1990g_1",F="_option_1990g_6",N={container:D,option:F},O={$style:N},S=M(x,[["__cssModules",O]]);x.__docgenInfo={exportName:"default",displayName:"UiRadio.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiRadio.example.vue"]};function f(e){const o={h1:"h1",h2:"h2",p:"p",...b(),...e.components};return a.jsxs(a.Fragment,{children:[a.jsx(o.h1,{id:"uiradio",children:"UiRadio"}),`
`,a.jsx(o.p,{children:"Одиночный выбор из представленных вариантов"}),`
`,a.jsx(o.h2,{id:"описание",children:"Описание"}),`
`,a.jsx(o.p,{children:`Используется для выбора одного варианта из набора. Состояние с галочкой — функция включена/выделена.
Без — выключена/не выделена.`}),`
`,a.jsx(C,{is:S})]})}function $(e={}){const{wrapper:o}={...b(),...e.components};return o?a.jsx(o,{...e,children:a.jsx(f,{...e})}):f(e)}const G={title:"Components/UiRadio",component:i,argTypes:{id:{control:!1},model:{control:!1}},render:e=>({components:{UiRadio:i},setup(){return{model:v(e.model),props:U(()=>k(e,["id","model"]))}},template:`
      <UiRadio
          id="radio"
          v-model:model="model"
          v-bind="props"
          style="margin-right: 8px"
      />

      <label for="radio">
          Radio
      </label>
    `}),parameters:{docs:{page:$},layout:"centered"}},n={args:{value:"radio"}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    value: 'radio'
  }
}`,...n.parameters?.docs?.source}}};const H=["Sandbox"];export{n as Sandbox,H as __namedExportsOrder,G as default};
