import{h as m,c as h,m as d,w as a,o as c,C as i,a as b,r as p,s as T,y as A,D as w,x as W,G as y,j as D}from"./iframe-BVH_DCqJ.js";import{_ as x}from"./UiInfobox-Tb-vBvLF.js";import{o as M}from"./utils-BqzVSXwn.js";import{j as n}from"./jsx-runtime-D6KpT4Dz.js";import{useMDXComponents as k}from"./index-j4WyJKbG.js";import{A as B}from"./blocks-DsYk5n78.js";import{T as u}from"./ToReact-CJJdVyT1.js";import{_ as I}from"./UiButton-C6ocnXa9.js";import{I as V}from"./settings-outlined-BWyJstlj.js";import"./preload-helper-PPVm8Dsz.js";import"./UiCollapse-FDSgXtAw.js";import"./UiTransition-BrTGuTHf.js";import"./clear-BkS5_0ru.js";import"./info-outlined-B4xoAwDT.js";import"./index-Be_FDnBe.js";import"./predicate-ClulhfEu.js";import"./composables-CHaFQhe2.js";const P={style:{width:"680px"}},C=m({__name:"UiInfobox.basic.example",setup(s){return(e,l)=>(c(),h("div",P,[d(x,{title:"Important information"},{default:a(()=>[...l[0]||(l[0]=[i(" Some list: ",-1),b("ul",null,[b("li",null,"First line"),b("li",null,"Second line"),b("li",null,"Third line")],-1)])]),_:1})]))}});C.__docgenInfo={exportName:"default",displayName:"UiInfobox.basic.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiInfobox.basic.example.vue"]};const X={style:{display:"grid",gap:"8px",width:"680px"}},N=m({__name:"UiInfobox.closable.example",setup(s){const e=p(!0);return(l,o)=>(c(),h("div",X,[d(x,{shown:e.value,"onUpdate:shown":o[0]||(o[0]=t=>e.value=t),closable:"",title:"You can close this infobox"},{default:a(()=>[...o[2]||(o[2]=[i(" Use closable mode when info can be dismissed by the user. ",-1)])]),_:1},8,["shown"]),e.value?A("",!0):(c(),T(I,{key:0,appearance:"secondary",style:{"justify-self":"start",width:"fit-content"},onClick:o[1]||(o[1]=t=>e.value=!0)},{default:a(()=>[...o[3]||(o[3]=[i(" Show again ",-1)])]),_:1}))]))}});N.__docgenInfo={exportName:"default",displayName:"UiInfobox.closable.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiInfobox.closable.example.vue"]};const q={style:{display:"grid",gap:"8px",width:"680px"}},H={style:{display:"flex",gap:"8px"}},S=m({__name:"UiInfobox.controlled.example",setup(s){const e=p(!0),l=p(!1),o=p(!0);return(t,r)=>(c(),h("div",q,[b("div",H,[d(I,{appearance:"secondary",style:{flex:"none","align-self":"flex-start"},onClick:r[0]||(r[0]=f=>e.value=!e.value)},{default:a(()=>[i(w(e.value?"Hide":"Show"),1)]),_:1}),d(I,{appearance:"secondary",style:{flex:"none","align-self":"flex-start"},disabled:!o.value,onClick:r[1]||(r[1]=f=>l.value=!l.value)},{default:a(()=>[i(w(l.value?"Collapse":"Expand"),1)]),_:1},8,["disabled"])]),d(x,{shown:e.value,"onUpdate:shown":r[2]||(r[2]=f=>e.value=f),expanded:l.value,"onUpdate:expanded":r[3]||(r[3]=f=>l.value=f),expandable:o.value,title:"Controlled infobox"},{default:a(()=>[...r[4]||(r[4]=[i(" State is controlled from external buttons. ",-1)])]),_:1},8,["shown","expanded","expandable"])]))}});S.__docgenInfo={exportName:"default",displayName:"UiInfobox.controlled.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiInfobox.controlled.example.vue"]};const L={style:{width:"680px"}},$=m({__name:"UiInfobox.expandable.example",setup(s){const e=p(!1);return(l,o)=>(c(),h("div",L,[d(x,{expanded:e.value,"onUpdate:expanded":o[0]||(o[0]=t=>e.value=t),title:"Connection details",expandable:""},{toggle:a(({expanded:t})=>[i(w(t?"Hide details":"Show details"),1)]),default:a(()=>[o[1]||(o[1]=i(" Keep credentials secure and rotate them regularly. ",-1))]),_:1},8,["expanded"])]))}});$.__docgenInfo={exportName:"default",displayName:"UiInfobox.expandable.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiInfobox.expandable.example.vue"]};const O={style:{width:"680px"}},E=m({__name:"UiInfobox.slots.example",setup(s){const e=p(!1);return(l,o)=>(c(),h("div",O,[d(x,{expanded:e.value,"onUpdate:expanded":o[0]||(o[0]=t=>e.value=t),expandable:""},{icon:a(()=>[d(W(V))]),title:a(()=>[...o[1]||(o[1]=[i(" Custom slots ",-1)])]),toggle:a(({expanded:t})=>[i(w(t?"Less":"More"),1)]),default:a(()=>[o[2]||(o[2]=i(" Slot API allows replacing icon, title and toggle label. ",-1))]),_:1},8,["expanded"])]))}});E.__docgenInfo={exportName:"default",displayName:"UiInfobox.slots.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiInfobox.slots.example.vue"]};const R={style:{width:"680px"}},F=m({__name:"UiInfobox.warning.example",setup(s){return(e,l)=>(c(),h("div",R,[d(x,{title:"Attention required",warning:""},{default:a(()=>[...l[0]||(l[0]=[i(" Please check required fields before saving changes. ",-1)])]),_:1})]))}});F.__docgenInfo={exportName:"default",displayName:"UiInfobox.warning.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiInfobox.warning.example.vue"]};function U(s){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...k(),...s.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{id:"uiinfobox",children:"UiInfobox"}),`
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
`,n.jsx(u,{is:C}),`
`,n.jsx(e.h2,{id:"состояния-и-режимы",children:"Состояния и режимы"}),`
`,n.jsx(e.h3,{id:"warning",children:"Warning"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<UiInfobox warning title="Warning">
  Content
</UiInfobox>
`})}),`
`,n.jsx(u,{is:F}),`
`,n.jsx(e.h3,{id:"expandable",children:"Expandable"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<UiInfobox
  v-model:expanded="expanded"
  expandable
/>
`})}),`
`,n.jsx(u,{is:$}),`
`,n.jsx(e.h3,{id:"closable",children:"Closable"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<UiInfobox
  v-model:shown="shown"
  closable
/>
`})}),`
`,n.jsx(u,{is:N}),`
`,n.jsx(e.h2,{id:"контролируемый-режим",children:"Контролируемый режим"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"UiInfobox"})," поддерживает внешнее управление через:"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"v-model:shown"})}),`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"v-model:expanded"})}),`
`]}),`
`,n.jsx(u,{is:S}),`
`,n.jsx(e.h2,{id:"слоты",children:"Слоты"}),`
`,n.jsx(e.p,{children:"Доступны слоты:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"icon"})}),`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"title"})}),`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"toggle"})}),`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"default"})}),`
`]}),`
`,n.jsx(u,{is:E}),`
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
`,n.jsx(B,{})]})}function G(s={}){const{wrapper:e}={...k(),...s.components};return e?n.jsx(e,{...s,children:n.jsx(U,{...s})}):U(s)}const xe={title:"Components/UiInfobox",component:x,args:{id:"infobox-sandbox",title:"Important information",shown:!0,expanded:!1,expandable:!1,closable:!1,warning:!1},argTypes:{shown:{control:!1},expanded:{control:!1},expandable:{control:"boolean"},closable:{control:"boolean"},warning:{control:"boolean"}},render:s=>({components:{UiInfobox:x},setup(){const e=p(s.shown??!0),l=p(s.expanded??!1);return y(()=>s.shown,o=>{e.value=o??!0}),y(()=>s.expanded,o=>{l.value=o??!1}),{expanded:l,props:D(()=>M(s,["shown","expanded"])),shown:e}},template:`
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
    `}),parameters:{docs:{page:G},layout:"centered"}},g={},j={args:{warning:!0,title:"Warning"}},_={args:{expandable:!0,expanded:!1,title:"Expandable details"}},v={args:{closable:!0,title:"Closable infobox"}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:"{}",...g.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    warning: true,
    title: 'Warning'
  }
}`,...j.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    expandable: true,
    expanded: false,
    title: 'Expandable details'
  }
}`,..._.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    closable: true,
    title: 'Closable infobox'
  }
}`,...v.parameters?.docs?.source}}};const ce=["Sandbox","Warning","Expandable","Closable"];export{v as Closable,_ as Expandable,g as Sandbox,j as Warning,ce as __namedExportsOrder,xe as default};
