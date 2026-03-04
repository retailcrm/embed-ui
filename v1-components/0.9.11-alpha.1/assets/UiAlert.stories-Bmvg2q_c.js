import{_ as l,V as t}from"./UiAlert-DgACQwgh.js";import{j as s}from"./index-Djyvt97q.js";import{useMDXComponents as b}from"./index-Cdf3Trmt.js";import{A as $}from"./blocks-uJ8zYmjq.js";import{T as o}from"./ToReact-Duu_YiOS.js";import{g as u,q as y,o as a,c as p,F as C,j as R,n as j,k as h,r as I,x as M,a as N,w as A,B as f}from"./iframe-w9uXPWTm.js";import{_ as g}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./UiTransition-BDVy963L.js";import"./checkmark-circle-outlined-C6wf49N3.js";import"./clear-BmDxPEAu.js";import"./info-outlined-B6hZM2gD.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B44Kv34C.js";const U=u({__name:"UiAlert.basic.example",setup(n){return(e,r)=>(a(),y(l,{text:"Basic alert message"}))}});U.__docgenInfo={exportName:"default",displayName:"UiAlert.basic.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiAlert.basic.example.vue"]};const k=u({__name:"UiAlert.variants.example",setup(n){const e=[t.PRIMARY,t.WARNING,t.SUCCESS,t.DANGER];return(r,_)=>(a(),p("div",{class:j(r.$style.container)},[(a(),p(C,null,R(e,i=>h(l,{key:i,variant:i,text:`Variant: ${i}`},null,8,["variant","text"])),64))],2))}}),V="_container_akqoe_1",D={container:V},E={$style:D},T=g(k,[["__cssModules",E]]);k.__docgenInfo={exportName:"default",displayName:"UiAlert.variants.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiAlert.variants.example.vue"]};const S=u({__name:"UiAlert.closable.example",setup(n){const e=I(!0),r=()=>{e.value=!1};return(_,i)=>(a(),p("div",{class:j(_.$style.container)},[e.value?(a(),y(l,{key:0,closable:"",text:"You can close this alert manually",onHidden:r})):M("",!0),N("button",{type:"button",onClick:i[0]||(i[0]=L=>e.value=!0)}," Show alert ")],2))}}),B="_container_hcy3f_1",F={container:B},W={$style:F},G=g(S,[["__cssModules",W]]);S.__docgenInfo={exportName:"default",displayName:"UiAlert.closable.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiAlert.closable.example.vue"]};const w=u({__name:"UiAlert.content.example",setup(n){return(e,r)=>(a(),p("div",{class:j(e.$style.container)},[h(l,{ellipsis:"",text:"Very long alert message that should be truncated with ellipsis in one line mode."}),h(l,{small:""},{default:A(()=>[...r[0]||(r[0]=[f(" Small alert with custom slot content ",-1)])]),_:1}),h(l,{fluid:""},{default:A(()=>[...r[1]||(r[1]=[N("strong",null,"Full width content",-1),f(" can hold more complex markup and longer text blocks. ",-1)])]),_:1})],2))}}),Y="_container_1xwe3_1",P={container:Y},X={$style:P},q=g(w,[["__cssModules",X]]);w.__docgenInfo={exportName:"default",displayName:"UiAlert.content.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiAlert.content.example.vue"]};function v(n){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...b(),...n.components};return s.jsxs(s.Fragment,{children:[s.jsx(e.h1,{id:"uialert",children:"UiAlert"}),`
`,s.jsxs(e.p,{children:[s.jsx(e.code,{children:"UiAlert"})," - компонент статусных уведомлений для сценариев, когда нужно показать контекстное сообщение на странице без модального окна."]}),`
`,s.jsx(e.h2,{id:"когда-использовать",children:"Когда использовать"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsx(e.li,{children:"информирование о результате действия;"}),`
`,s.jsx(e.li,{children:"предупреждение о важных изменениях;"}),`
`,s.jsx(e.li,{children:"отображение ошибок в потоке интерфейса;"}),`
`,s.jsx(e.li,{children:"показ успешного завершения операции."}),`
`]}),`
`,s.jsxs(e.p,{children:["Для короткого текста ошибки без иконки и контейнера используйте ",s.jsx(e.code,{children:"UiError"}),"."]}),`
`,s.jsx(e.h2,{id:"импорт",children:"Импорт"}),`
`,s.jsx(e.h3,{id:"remote",children:"Remote"}),`
`,s.jsx(e.pre,{children:s.jsx(e.code,{className:"language-ts",children:`import { UiAlert } from '@retailcrm/embed-ui-v1-components/remote'
`})}),`
`,s.jsx(e.h3,{id:"host",children:"Host"}),`
`,s.jsx(e.pre,{children:s.jsx(e.code,{className:"language-ts",children:`import { UiAlert } from '@retailcrm/embed-ui-v1-components/host'
`})}),`
`,s.jsx(e.h2,{id:"базовое-использование",children:"Базовое использование"}),`
`,s.jsx(e.pre,{children:s.jsx(e.code,{className:"language-vue",children:`<UiAlert text="Basic alert" />
`})}),`
`,s.jsx(o,{is:U}),`
`,s.jsxs(e.h2,{id:"варианты-variant",children:["Варианты (",s.jsx(e.code,{children:"variant"}),")"]}),`
`,s.jsx(e.p,{children:"Поддерживаются варианты:"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsx(e.li,{children:s.jsx(e.code,{children:"primary"})}),`
`,s.jsx(e.li,{children:s.jsx(e.code,{children:"warning"})}),`
`,s.jsx(e.li,{children:s.jsx(e.code,{children:"success"})}),`
`,s.jsx(e.li,{children:s.jsx(e.code,{children:"danger"})}),`
`]}),`
`,s.jsx(e.pre,{children:s.jsx(e.code,{className:"language-vue",children:`<UiAlert variant="warning" text="Warning alert" />
`})}),`
`,s.jsx(o,{is:T}),`
`,s.jsx(e.h2,{id:"закрываемый-alert",children:"Закрываемый alert"}),`
`,s.jsxs(e.p,{children:["Если ",s.jsx(e.code,{children:"closable=true"}),", справа появляется кнопка закрытия."]}),`
`,s.jsx(e.pre,{children:s.jsx(e.code,{className:"language-vue",children:`<UiAlert
  closable
  text="You can close this alert manually"
/>
`})}),`
`,s.jsx(o,{is:G}),`
`,s.jsx(e.h2,{id:"контент-и-размер",children:"Контент и размер"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"ellipsis"})," - обрезка заголовка в одну строку;"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"small"})," - уменьшенный размер текста;"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"fluid"})," - снять ограничение ширины контента."]}),`
`]}),`
`,s.jsx(o,{is:q}),`
`,s.jsx(e.h2,{id:"a11y",children:"A11y"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsxs(e.li,{children:["Корневой элемент использует ",s.jsx(e.code,{children:'role="alert"'}),"."]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"aria-live"})," настраивается автоматически по ",s.jsx(e.code,{children:"variant"}),":"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"danger"})," -> ",s.jsx(e.code,{children:"assertive"}),";"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"warning"})," -> ",s.jsx(e.code,{children:"polite"}),";"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"primary"})," / ",s.jsx(e.code,{children:"success"})," -> ",s.jsx(e.code,{children:"off"}),"."]}),`
`,s.jsxs(e.li,{children:["Для close-кнопки используется нативный ",s.jsx(e.code,{children:"button"})," с клавиатурной доступностью."]}),`
`]}),`
`,s.jsx(e.h2,{id:"события",children:"События"}),`
`,s.jsx(e.p,{children:"Переходы видимости:"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsx(e.li,{children:s.jsx(e.code,{children:"showing"})}),`
`,s.jsx(e.li,{children:s.jsx(e.code,{children:"shown"})}),`
`,s.jsx(e.li,{children:s.jsx(e.code,{children:"hiding"})}),`
`,s.jsx(e.li,{children:s.jsx(e.code,{children:"hidden"})}),`
`]}),`
`,s.jsx(e.h2,{id:"полный-api",children:"Полный API"}),`
`,s.jsx($,{})]})}function H(n={}){const{wrapper:e}={...b(),...n.components};return e?s.jsx(e,{...n,children:s.jsx(v,{...n})}):v(n)}const ae={title:"Components/UiAlert",component:l,args:{variant:t.PRIMARY,text:"Basic alert",shown:!0,closable:!1,ellipsis:!1,small:!1,scrollToAlert:!1,scrollBehavior:"smooth",fluid:!1},argTypes:{variant:{control:"select",options:Object.values(t)}},render:n=>({components:{UiAlert:l},setup(){return{args:n}},template:`
      <div style="width: 520px">
          <UiAlert v-bind="args" />
      </div>
    `}),parameters:{docs:{page:H},layout:"centered"}},c={},d={args:{variant:t.WARNING,text:"Warning alert"}},m={args:{variant:t.SUCCESS,text:"Success alert"}},x={args:{variant:t.DANGER,text:"Danger alert"}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:"{}",...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    variant: VARIANT.WARNING,
    text: 'Warning alert'
  }
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    variant: VARIANT.SUCCESS,
    text: 'Success alert'
  }
}`,...m.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    variant: VARIANT.DANGER,
    text: 'Danger alert'
  }
}`,...x.parameters?.docs?.source}}};const oe=["Sandbox","Warning","Success","Danger"];export{x as Danger,c as Sandbox,m as Success,d as Warning,oe as __namedExportsOrder,ae as default};
