import{h as j,r as x,c as f,m as l,w as p,o as v,C as g,D as C,a as _,G as D,j as w}from"./iframe-B1j5So8G.js";import{_ as m}from"./UiButton-BCcDiwZB.js";import{_ as c,C as t}from"./UiCollapse-C_hFOcep.js";import{o as B}from"./utils-BqzVSXwn.js";import{j as n}from"./jsx-runtime-Bne_YqLH.js";import{useMDXComponents as b}from"./index-Ve4Y5j99.js";import{A as S}from"./blocks-BRfjt16q.js";import{T as u}from"./ToReact-BxUHveNL.js";import"./preload-helper-PPVm8Dsz.js";import"./predicate-ClulhfEu.js";import"./composables-DJ2iJmvN.js";import"./index-CPs05SzV.js";const E={style:{display:"grid",gap:"12px",width:"420px"}},U=j({__name:"UiCollapse.basic.example",setup(s){const e=x(!1);return(d,o)=>(v(),f("div",E,[l(m,{appearance:"secondary",onClick:o[0]||(o[0]=k=>e.value=!e.value)},{default:p(()=>[g(C(e.value?"Hide details":"Show details"),1)]),_:1}),l(c,{expanded:e.value},{default:p(()=>[...o[1]||(o[1]=[_("div",{style:{border:"1px solid #d5dbe3","border-radius":"8px",background:"#f7f9fc",padding:"12px"}}," This block is shown or hidden with the `expanded` prop. ",-1)])]),_:1},8,["expanded"])]))}});U.__docgenInfo={exportName:"default",displayName:"UiCollapse.basic.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiCollapse.basic.example.vue"]};const O={style:{display:"grid",gap:"12px",width:"420px"}},y=j({__name:"UiCollapse.dispose.example",setup(s){const e=x(!0);return(d,o)=>(v(),f("div",O,[l(m,{appearance:"secondary",onClick:o[0]||(o[0]=k=>e.value=!e.value)},{default:p(()=>[g(C(e.value?"Unmount content":"Mount content"),1)]),_:1}),l(c,{expanded:e.value,"collapse-behaviour":"dispose"},{default:p(()=>[...o[1]||(o[1]=[_("div",{style:{border:"1px solid #d5dbe3","border-radius":"8px",background:"#f7f9fc",padding:"12px"}}," In `dispose` mode this node is removed from DOM when collapsed. ",-1)])]),_:1},8,["expanded"])]))}});y.__docgenInfo={exportName:"default",displayName:"UiCollapse.dispose.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiCollapse.dispose.example.vue"]};function h(s){const e={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...b(),...s.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{id:"uicollapse",children:"UiCollapse"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"UiCollapse"})," - базовый контейнер для анимированного скрытия/раскрытия содержимого."]}),`
`,n.jsx(e.h2,{id:"когда-использовать",children:"Когда использовать"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"нужно показать/скрыть блок без собственной шапки;"}),`
`,n.jsx(e.li,{children:"у вас уже есть собственный триггер (кнопка, чекбокс, таб и т.д.);"}),`
`,n.jsxs(e.li,{children:["требуется выбрать поведение скрытия: ",n.jsx(e.code,{children:"hide"})," или ",n.jsx(e.code,{children:"dispose"}),"."]}),`
`]}),`
`,n.jsxs(e.p,{children:['Если нужен готовый паттерн "заголовок + тело", используйте ',n.jsx(e.code,{children:"UiCollapseBox"})," и ",n.jsx(e.code,{children:"UiCollapseGroup"}),"."]}),`
`,n.jsx(e.h2,{id:"импорт",children:"Импорт"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-ts",children:`import { UiCollapse } from '@retailcrm/embed-ui-v1-components/remote'
`})}),`
`,n.jsx(e.h2,{id:"быстрый-старт",children:"Быстрый старт"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
  <UiCollapse :expanded="opened">
    <div>Collapsible content</div>
  </UiCollapse>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UiCollapse } from '@retailcrm/embed-ui-v1-components/remote'

const opened = ref(false)
<\/script>
`})}),`
`,n.jsx(u,{is:U}),`
`,n.jsx(e.h2,{id:"поведение-при-сворачивании",children:"Поведение при сворачивании"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"collapseBehaviour"})," определяет, что происходит с DOM в свернутом состоянии:"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"hide"})," - контент остаётся в DOM и скрывается;"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"dispose"})," - контент удаляется из DOM."]}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<UiCollapse
  :expanded="opened"
  collapse-behaviour="dispose"
>
  <div>Disposed content</div>
</UiCollapse>
`})}),`
`,n.jsx(u,{is:y}),`
`,n.jsx(e.h2,{id:"события",children:"События"}),`
`,n.jsx(e.p,{children:"Компонент эмитит жизненный цикл анимации:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"expanding"})}),`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"expanded"})}),`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"collapsing"})}),`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"collapsed"})}),`
`]}),`
`,n.jsx(e.p,{children:"Пример:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<UiCollapse
  :expanded="opened"
  @expanded="onExpanded"
  @collapsed="onCollapsed"
/>
`})}),`
`,n.jsx(e.h2,{id:"a11y",children:"A11y"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"UiCollapse"})," используется как анимируемый контейнер и не навязывает конкретную роль."]}),`
`,n.jsxs(e.li,{children:["Для доступности управляйте связью триггера и контента снаружи (",n.jsx(e.code,{children:"aria-controls"}),", ",n.jsx(e.code,{children:"aria-expanded"}),", ",n.jsx(e.code,{children:'role="region"'}),") там, где это нужно по вашему UX."]}),`
`]}),`
`,n.jsx(e.h2,{id:"полный-api",children:"Полный API"}),`
`,n.jsx(S,{})]})}function N(s={}){const{wrapper:e}={...b(),...s.components};return e?n.jsx(e,{...s,children:n.jsx(h,{...s})}):h(s)}const G={title:"Components/UiCollapse",component:c,args:{expanded:!1,collapseBehaviour:t.HIDE,duration:.25},argTypes:{expanded:{control:!1},collapseBehaviour:{control:"select",options:Object.values(t)},duration:{control:"text"}},render:s=>({components:{UiButton:m,UiCollapse:c},setup(){const e=x(s.expanded??!1);return D(()=>s.expanded,d=>{typeof d<"u"&&(e.value=d)}),{expanded:e,props:w(()=>B(s,["expanded"]))}},template:`
      <div style="width: 520px; display: grid; gap: 12px;">
          <UiButton appearance="secondary" @click="expanded = !expanded">
              {{ expanded ? 'Hide content' : 'Show content' }}
          </UiButton>

          <UiCollapse
              :expanded="expanded"
              v-bind="props"
          >
              <div style="padding: 12px; border: 1px solid #d5dbe3; border-radius: 8px; background: #f7f9fc;">
                  Content inside UiCollapse. You can place any custom layout here.
              </div>
          </UiCollapse>
      </div>
    `}),parameters:{docs:{page:N},layout:"centered"}},a={},r={args:{expanded:!0}},i={args:{collapseBehaviour:t.DISPOSE}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    expanded: true
  }
}`,...r.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    collapseBehaviour: COLLAPSE_BEHAVIOUR.DISPOSE
  }
}`,...i.parameters?.docs?.source}}};const Y=["Sandbox","Expanded","Dispose"];export{i as Dispose,r as Expanded,a as Sandbox,Y as __namedExportsOrder,G as default};
