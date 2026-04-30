import{h as u,c as b,k as d,z as l,o as x,N as i,a as f,y as O,H as T,r as p,t as C,E as A,w as $,q as W}from"./iframe-DnG3g5pW.js";import{_ as c}from"./UiInfobox-BPFY-MYA.js";import{o as M}from"./utils-BqzVSXwn.js";import{u as F,j as n}from"./index-DFg_Ho_i.js";import{A as B}from"./blocks-DBDDY4vL.js";import{T as m}from"./ToReact-DbRAeBf3.js";import{_ as S}from"./UiButton-BCon8_Cd.js";import{I as D}from"./settings-outlined-Ds2_qSaX.js";import"./preload-helper-PPVm8Dsz.js";import"./UiCollapse-DFBZbTRg.js";import"./UiTransition-BqKpixzE.js";import"./clear-jf7bAM_2.js";import"./info-outlined-CPTd3wZn.js";import"./index-nl1gzEpR.js";import"./predicate-ClulhfEu.js";import"./render-vaNyDQt4.js";import"./composables-CfEvSTVp.js";const V={style:{width:"680px"}},w=u({__name:"UiInfobox.basic.example",setup(s){return(e,a)=>(x(),b("div",V,[d(c,{title:"Important information"},{default:l(()=>[...a[0]||(a[0]=[i(" Some list: ",-1),f("ul",null,[f("li",null,"First line"),f("li",null,"Second line"),f("li",null,"Third line")],-1)])]),_:1})]))}});w.__docgenInfo=Object.assign({displayName:w.name??w.__name},{exportName:"default",displayName:"UiInfobox.basic.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiInfobox.basic.example.vue"]});const q={style:{display:"grid",gap:"8px",width:"680px"}},y=u({__name:"UiInfobox.closable.example",setup(s){const e=p(!0);return(a,o)=>(x(),b("div",q,[d(c,{shown:e.value,"onUpdate:shown":o[0]||(o[0]=t=>e.value=t),closable:"",title:"You can close this infobox"},{default:l(()=>[...o[2]||(o[2]=[i(" Use closable mode when info can be dismissed by the user. ",-1)])]),_:1},8,["shown"]),e.value?T("",!0):(x(),O(S,{key:0,appearance:"secondary",style:{"justify-self":"start",width:"fit-content"},onClick:o[1]||(o[1]=t=>e.value=!0)},{default:l(()=>[...o[3]||(o[3]=[i(" Show again ",-1)])]),_:1}))]))}});y.__docgenInfo=Object.assign({displayName:y.name??y.__name},{exportName:"default",displayName:"UiInfobox.closable.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiInfobox.closable.example.vue"]});const H={style:{display:"grid",gap:"8px",width:"680px"}},P={style:{display:"flex",gap:"8px"}},I=u({__name:"UiInfobox.controlled.example",setup(s){const e=p(!0),a=p(!1),o=p(!0);return(t,r)=>(x(),b("div",H,[f("div",P,[d(S,{appearance:"secondary",style:{flex:"none","align-self":"flex-start"},onClick:r[0]||(r[0]=h=>e.value=!e.value)},{default:l(()=>[i(C(e.value?"Hide":"Show"),1)]),_:1}),d(S,{appearance:"secondary",style:{flex:"none","align-self":"flex-start"},disabled:!o.value,onClick:r[1]||(r[1]=h=>a.value=!a.value)},{default:l(()=>[i(C(a.value?"Collapse":"Expand"),1)]),_:1},8,["disabled"])]),d(c,{shown:e.value,"onUpdate:shown":r[2]||(r[2]=h=>e.value=h),expanded:a.value,"onUpdate:expanded":r[3]||(r[3]=h=>a.value=h),expandable:o.value,title:"Controlled infobox"},{default:l(()=>[...r[4]||(r[4]=[i(" State is controlled from external buttons. ",-1)])]),_:1},8,["shown","expanded","expandable"])]))}});I.__docgenInfo=Object.assign({displayName:I.name??I.__name},{exportName:"default",displayName:"UiInfobox.controlled.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiInfobox.controlled.example.vue"]});const X={style:{width:"680px"}},U=u({__name:"UiInfobox.expandable.example",setup(s){const e=p(!1);return(a,o)=>(x(),b("div",X,[d(c,{expanded:e.value,"onUpdate:expanded":o[0]||(o[0]=t=>e.value=t),title:"Connection details",expandable:""},{toggle:l(({expanded:t})=>[i(C(t?"Hide details":"Show details"),1)]),default:l(()=>[o[1]||(o[1]=i(" Keep credentials secure and rotate them regularly. ",-1))]),_:1},8,["expanded"])]))}});U.__docgenInfo=Object.assign({displayName:U.name??U.__name},{exportName:"default",displayName:"UiInfobox.expandable.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiInfobox.expandable.example.vue"]});const L={style:{width:"680px"}},N=u({__name:"UiInfobox.slots.example",setup(s){const e=p(!1);return(a,o)=>(x(),b("div",L,[d(c,{expanded:e.value,"onUpdate:expanded":o[0]||(o[0]=t=>e.value=t),expandable:""},{icon:l(()=>[d(A(D))]),title:l(()=>[...o[1]||(o[1]=[i(" Custom slots ",-1)])]),toggle:l(({expanded:t})=>[i(C(t?"Less":"More"),1)]),default:l(()=>[o[2]||(o[2]=i(" Slot API allows replacing icon, title and toggle label. ",-1))]),_:1},8,["expanded"])]))}});N.__docgenInfo=Object.assign({displayName:N.name??N.__name},{exportName:"default",displayName:"UiInfobox.slots.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiInfobox.slots.example.vue"]});const R={style:{width:"680px"}},k=u({__name:"UiInfobox.warning.example",setup(s){return(e,a)=>(x(),b("div",R,[d(c,{title:"Attention required",warning:""},{default:l(()=>[...a[0]||(a[0]=[i(" Please check required fields before saving changes. ",-1)])]),_:1})]))}});k.__docgenInfo=Object.assign({displayName:k.name??k.__name},{exportName:"default",displayName:"UiInfobox.warning.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiInfobox.warning.example.vue"]});function E(s){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...F(),...s.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{id:"uiinfobox",children:"UiInfobox"}),`
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
`,n.jsx(m,{is:w}),`
`,n.jsx(e.h2,{id:"состояния-и-режимы",children:"Состояния и режимы"}),`
`,n.jsx(e.h3,{id:"warning",children:"Warning"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<UiInfobox warning title="Warning">
  Content
</UiInfobox>
`})}),`
`,n.jsx(m,{is:k}),`
`,n.jsx(e.h3,{id:"expandable",children:"Expandable"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<UiInfobox
  v-model:expanded="expanded"
  expandable
/>
`})}),`
`,n.jsx(m,{is:U}),`
`,n.jsx(e.h3,{id:"closable",children:"Closable"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<UiInfobox
  v-model:shown="shown"
  closable
/>
`})}),`
`,n.jsx(m,{is:y}),`
`,n.jsx(e.h2,{id:"контролируемый-режим",children:"Контролируемый режим"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"UiInfobox"})," поддерживает внешнее управление через:"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"v-model:shown"})}),`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"v-model:expanded"})}),`
`]}),`
`,n.jsx(m,{is:I}),`
`,n.jsx(e.h2,{id:"слоты",children:"Слоты"}),`
`,n.jsx(e.p,{children:"Доступны слоты:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"icon"})}),`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"title"})}),`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"toggle"})}),`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"default"})}),`
`]}),`
`,n.jsx(m,{is:N}),`
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
`,n.jsx(B,{})]})}function z(s={}){const{wrapper:e}={...F(),...s.components};return e?n.jsx(e,{...s,children:n.jsx(E,{...s})}):E(s)}const ce={title:"Components/UiInfobox",component:c,args:{id:"infobox-sandbox",title:"Important information",shown:!0,expanded:!1,expandable:!1,closable:!1,warning:!1},argTypes:{shown:{control:!1},expanded:{control:!1},expandable:{control:"boolean"},closable:{control:"boolean"},warning:{control:"boolean"}},render:s=>({components:{UiInfobox:c},setup(){const e=p(s.shown??!0),a=p(s.expanded??!1);return $(()=>s.shown,o=>{e.value=o??!0}),$(()=>s.expanded,o=>{a.value=o??!1}),{expanded:a,props:W(()=>M(s,["shown","expanded"])),shown:e}},template:`
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
    `}),parameters:{docs:{page:z},layout:"centered"}},g={},j={args:{warning:!0,title:"Warning"}},_={args:{expandable:!0,expanded:!1,title:"Expandable details"}},v={args:{closable:!0,title:"Closable infobox"}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:"{}",...g.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}};const xe=["Sandbox","Warning","Expandable","Closable"];export{v as Closable,_ as Expandable,g as Sandbox,j as Warning,xe as __namedExportsOrder,ce as default};
