import{h as g,c as v,k as c,z as t,r as u,o as C,N as _,t as b,a as U,w,q as B}from"./iframe-DnG3g5pW.js";import{_ as h}from"./UiButton-BCon8_Cd.js";import{_ as x,C as m}from"./UiCollapse-DFBZbTRg.js";import{o as D}from"./utils-BqzVSXwn.js";import{u as y,j as n}from"./index-DFg_Ho_i.js";import{A as N}from"./blocks-DBDDY4vL.js";import{T as j}from"./ToReact-DbRAeBf3.js";import"./preload-helper-PPVm8Dsz.js";import"./predicate-ClulhfEu.js";import"./render-vaNyDQt4.js";import"./composables-CfEvSTVp.js";import"./index-nl1gzEpR.js";const O={style:{display:"grid",gap:"12px",width:"420px"}},l=g({__name:"UiCollapse.basic.example",setup(s){const e=u(!1);return(d,o)=>(C(),v("div",O,[c(h,{appearance:"secondary",onClick:o[0]||(o[0]=k=>e.value=!e.value)},{default:t(()=>[_(b(e.value?"Hide details":"Show details"),1)]),_:1}),c(x,{expanded:e.value},{default:t(()=>[...o[1]||(o[1]=[U("div",{style:{border:"1px solid #d5dbe3","border-radius":"8px",background:"#f7f9fc",padding:"12px"}}," This block is shown or hidden with the `expanded` prop. ",-1)])]),_:1},8,["expanded"])]))}});l.__docgenInfo=Object.assign({displayName:l.name??l.__name},{exportName:"default",displayName:"UiCollapse.basic.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiCollapse.basic.example.vue"]});const S={style:{display:"grid",gap:"12px",width:"420px"}},p=g({__name:"UiCollapse.dispose.example",setup(s){const e=u(!0);return(d,o)=>(C(),v("div",S,[c(h,{appearance:"secondary",onClick:o[0]||(o[0]=k=>e.value=!e.value)},{default:t(()=>[_(b(e.value?"Unmount content":"Mount content"),1)]),_:1}),c(x,{expanded:e.value,"collapse-behaviour":"dispose"},{default:t(()=>[...o[1]||(o[1]=[U("div",{style:{border:"1px solid #d5dbe3","border-radius":"8px",background:"#f7f9fc",padding:"12px"}}," In `dispose` mode this node is removed from DOM when collapsed. ",-1)])]),_:1},8,["expanded"])]))}});p.__docgenInfo=Object.assign({displayName:p.name??p.__name},{exportName:"default",displayName:"UiCollapse.dispose.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiCollapse.dispose.example.vue"]});function f(s){const e={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...y(),...s.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{id:"uicollapse",children:"UiCollapse"}),`
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
`,n.jsx(j,{is:l}),`
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
`,n.jsx(j,{is:p}),`
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
`,n.jsx(N,{})]})}function E(s={}){const{wrapper:e}={...y(),...s.components};return e?n.jsx(e,{...s,children:n.jsx(f,{...s})}):f(s)}const q={title:"Components/UiCollapse",component:x,args:{expanded:!1,collapseBehaviour:m.HIDE,duration:.25},argTypes:{expanded:{control:!1},collapseBehaviour:{control:"select",options:Object.values(m)},duration:{control:"text"}},render:s=>({components:{UiButton:h,UiCollapse:x},setup(){const e=u(s.expanded??!1);return w(()=>s.expanded,d=>{typeof d<"u"&&(e.value=d)}),{expanded:e,props:B(()=>D(s,["expanded"]))}},template:`
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
    `}),parameters:{docs:{page:E},layout:"centered"}},a={},i={args:{expanded:!0}},r={args:{collapseBehaviour:m.DISPOSE}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    expanded: true
  }
}`,...i.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    collapseBehaviour: COLLAPSE_BEHAVIOUR.DISPOSE
  }
}`,...r.parameters?.docs?.source}}};const z=["Sandbox","Expanded","Dispose"];export{r as Dispose,i as Expanded,a as Sandbox,z as __namedExportsOrder,q as default};
