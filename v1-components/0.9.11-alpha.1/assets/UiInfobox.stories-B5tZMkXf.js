import{g as h,c,k as u,w as t,o as m,B as r,a as x,r as d,x as F,C as w,v as T,E as I,h as A}from"./iframe-w9uXPWTm.js";import{_ as p}from"./UiInfobox-CcUs3R3K.js";import{o as W}from"./utils-BqzVSXwn.js";import{j as n}from"./index-Djyvt97q.js";import{useMDXComponents as y}from"./index-Cdf3Trmt.js";import{A as M}from"./blocks-uJ8zYmjq.js";import{T as b}from"./ToReact-Duu_YiOS.js";import{I as B}from"./settings-outlined-mvFjb_Ux.js";import"./preload-helper-PPVm8Dsz.js";import"./UiCollapse-DwYdZ5n3.js";import"./UiTransition-BDVy963L.js";import"./clear-BmDxPEAu.js";import"./info-outlined-B6hZM2gD.js";import"./index-B44Kv34C.js";const D={style:{width:"680px"}},k=h({__name:"UiInfobox.basic.example",setup(s){return(e,l)=>(m(),c("div",D,[u(p,{title:"Important information"},{default:t(()=>[...l[0]||(l[0]=[r(" Some list: ",-1),x("ul",null,[x("li",null,"First line"),x("li",null,"Second line"),x("li",null,"Third line")],-1)])]),_:1})]))}});k.__docgenInfo={exportName:"default",displayName:"UiInfobox.basic.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiInfobox.basic.example.vue"]};const V={style:{display:"grid",gap:"8px",width:"680px"}},C=h({__name:"UiInfobox.closable.example",setup(s){const e=d(!0);return(l,o)=>(m(),c("div",V,[u(p,{shown:e.value,"onUpdate:shown":o[0]||(o[0]=i=>e.value=i),closable:"",title:"You can close this infobox"},{default:t(()=>[...o[2]||(o[2]=[r(" Use closable mode when info can be dismissed by the user. ",-1)])]),_:1},8,["shown"]),e.value?F("",!0):(m(),c("button",{key:0,type:"button",onClick:o[1]||(o[1]=i=>e.value=!0)}," Show again "))]))}});C.__docgenInfo={exportName:"default",displayName:"UiInfobox.closable.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiInfobox.closable.example.vue"]};const P={style:{display:"grid",gap:"8px",width:"680px"}},X={style:{display:"flex",gap:"8px"}},q=["disabled"],N=h({__name:"UiInfobox.controlled.example",setup(s){const e=d(!0),l=d(!1),o=d(!0);return(i,a)=>(m(),c("div",P,[x("div",X,[x("button",{type:"button",onClick:a[0]||(a[0]=f=>e.value=!e.value)},w(e.value?"Hide":"Show"),1),x("button",{type:"button",disabled:!o.value,onClick:a[1]||(a[1]=f=>l.value=!l.value)},w(l.value?"Collapse":"Expand"),9,q)]),u(p,{shown:e.value,"onUpdate:shown":a[2]||(a[2]=f=>e.value=f),expanded:l.value,"onUpdate:expanded":a[3]||(a[3]=f=>l.value=f),expandable:o.value,title:"Controlled infobox"},{default:t(()=>[...a[4]||(a[4]=[r(" State is controlled from external buttons. ",-1)])]),_:1},8,["shown","expanded","expandable"])]))}});N.__docgenInfo={exportName:"default",displayName:"UiInfobox.controlled.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiInfobox.controlled.example.vue"]};const H={style:{width:"680px"}},S=h({__name:"UiInfobox.expandable.example",setup(s){const e=d(!1);return(l,o)=>(m(),c("div",H,[u(p,{expanded:e.value,"onUpdate:expanded":o[0]||(o[0]=i=>e.value=i),title:"Connection details",expandable:""},{toggle:t(({expanded:i})=>[r(w(i?"Hide details":"Show details"),1)]),default:t(()=>[o[1]||(o[1]=r(" Keep credentials secure and rotate them regularly. ",-1))]),_:1},8,["expanded"])]))}});S.__docgenInfo={exportName:"default",displayName:"UiInfobox.expandable.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiInfobox.expandable.example.vue"]};const L={style:{width:"680px"}},$=h({__name:"UiInfobox.slots.example",setup(s){const e=d(!1);return(l,o)=>(m(),c("div",L,[u(p,{expanded:e.value,"onUpdate:expanded":o[0]||(o[0]=i=>e.value=i),expandable:""},{icon:t(()=>[u(T(B))]),title:t(()=>[...o[1]||(o[1]=[r(" Custom slots ",-1)])]),toggle:t(({expanded:i})=>[r(w(i?"Less":"More"),1)]),default:t(()=>[o[2]||(o[2]=r(" Slot API allows replacing icon, title and toggle label. ",-1))]),_:1},8,["expanded"])]))}});$.__docgenInfo={exportName:"default",displayName:"UiInfobox.slots.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiInfobox.slots.example.vue"]};const O={style:{width:"680px"}},E=h({__name:"UiInfobox.warning.example",setup(s){return(e,l)=>(m(),c("div",O,[u(p,{title:"Attention required",warning:""},{default:t(()=>[...l[0]||(l[0]=[r(" Please check required fields before saving changes. ",-1)])]),_:1})]))}});E.__docgenInfo={exportName:"default",displayName:"UiInfobox.warning.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiInfobox.warning.example.vue"]};function U(s){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...y(),...s.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{id:"uiinfobox",children:"UiInfobox"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"UiInfobox"})," - блок для заметок, подсказок и предупреждений с поддержкой скрытия и раскрываемого контента."]}),`
`,n.jsx(e.h2,{id:"когда-использовать",children:"Когда использовать"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"показать важный контекст рядом с формой;"}),`
`,n.jsx(e.li,{children:"добавить предупреждение с отличающимся визуальным акцентом;"}),`
`,n.jsx(e.li,{children:"дать пользователю возможность скрыть сообщение;"}),`
`,n.jsxs(e.li,{children:["раскрывать дополнительные детали по запросу (",n.jsx(e.code,{children:"expandable"}),")."]}),`
`]}),`
`,n.jsx(e.h2,{id:"импорт",children:"Импорт"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-ts",children:`import { UiInfobox } from '@retailcrm/embed-ui-v1-components/remote'
`})}),`
`,n.jsx(e.h2,{id:"базовый-пример",children:"Базовый пример"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<UiInfobox title="Important information">
  Content
</UiInfobox>
`})}),`
`,n.jsx(b,{is:k}),`
`,n.jsx(e.h2,{id:"состояния-и-режимы",children:"Состояния и режимы"}),`
`,n.jsx(e.h3,{id:"warning",children:"Warning"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<UiInfobox warning title="Warning">
  Content
</UiInfobox>
`})}),`
`,n.jsx(b,{is:E}),`
`,n.jsx(e.h3,{id:"expandable",children:"Expandable"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<UiInfobox
  v-model:expanded="expanded"
  expandable
/>
`})}),`
`,n.jsx(b,{is:S}),`
`,n.jsx(e.h3,{id:"closable",children:"Closable"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<UiInfobox
  v-model:shown="shown"
  closable
/>
`})}),`
`,n.jsx(b,{is:C}),`
`,n.jsx(e.h2,{id:"контролируемый-режим",children:"Контролируемый режим"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"UiInfobox"})," поддерживает внешнее управление через:"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"v-model:shown"})}),`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"v-model:expanded"})}),`
`]}),`
`,n.jsx(b,{is:N}),`
`,n.jsx(e.h2,{id:"слоты",children:"Слоты"}),`
`,n.jsx(e.p,{children:"Доступны слоты:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"icon"})}),`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"title"})}),`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"toggle"})}),`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"default"})}),`
`]}),`
`,n.jsx(b,{is:$}),`
`,n.jsx(e.h2,{id:"a11y",children:"A11y"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["корневой элемент использует ",n.jsx(e.code,{children:'role="alert"'})," и ",n.jsx(e.code,{children:'aria-live="polite"'}),";"]}),`
`,n.jsxs(e.li,{children:["для toggle/close используются нативные ",n.jsx(e.code,{children:"button"}),";"]}),`
`,n.jsxs(e.li,{children:["при наличии заголовка инфобокс связывается через ",n.jsx(e.code,{children:"aria-labelledby"}),"."]}),`
`]}),`
`,n.jsx(e.h2,{id:"события",children:"События"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"show"})}),`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"hide"})}),`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"update:shown"})}),`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"update:expanded"})}),`
`]}),`
`,n.jsx(e.h2,{id:"полный-api",children:"Полный API"}),`
`,n.jsx(M,{})]})}function R(s={}){const{wrapper:e}={...y(),...s.components};return e?n.jsx(e,{...s,children:n.jsx(U,{...s})}):U(s)}const te={title:"Components/UiInfobox",component:p,args:{id:"infobox-sandbox",title:"Important information",shown:!0,expanded:!1,expandable:!1,closable:!1,warning:!1},argTypes:{shown:{control:!1},expanded:{control:!1},expandable:{control:"boolean"},closable:{control:"boolean"},warning:{control:"boolean"}},render:s=>({components:{UiInfobox:p},setup(){const e=d(s.shown??!0),l=d(s.expanded??!1);return I(()=>s.shown,o=>{e.value=o??!0}),I(()=>s.expanded,o=>{l.value=o??!1}),{expanded:l,props:A(()=>W(s,["shown","expanded"])),shown:e}},template:`
      <div style="width: 680px;">
          <UiInfobox
              v-model:shown="shown"
              v-model:expanded="expanded"
              v-bind="props"
          >
              <template #title>
                  {{ props.title }}
              </template>

              Some list:

              <ul>
                  <li>First line</li>
                  <li>Second line</li>
                  <li>Third line</li>
              </ul>
          </UiInfobox>
      </div>
    `}),parameters:{docs:{page:R},layout:"centered"}},g={},j={args:{warning:!0,title:"Warning"}},v={args:{expandable:!0,expanded:!1,title:"Expandable details"}},_={args:{closable:!0,title:"Closable infobox"}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:"{}",...g.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    warning: true,
    title: 'Warning'
  }
}`,...j.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    expandable: true,
    expanded: false,
    title: 'Expandable details'
  }
}`,...v.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    closable: true,
    title: 'Closable infobox'
  }
}`,..._.parameters?.docs?.source}}};const re=["Sandbox","Warning","Expandable","Closable"];export{_ as Closable,v as Expandable,g as Sandbox,j as Warning,re as __namedExportsOrder,te as default};
