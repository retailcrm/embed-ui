import{_ as a,V as t}from"./UiAlert-Bs-kx7xZ.js";import{j as s}from"./jsx-runtime-CUtLY3pZ.js";import{useMDXComponents as y}from"./index-DwIA-ESQ.js";import{A as w}from"./blocks-Cr0w7RcH.js";import{T as c}from"./ToReact-CfRlBj5r.js";import{h,y as b,o as i,c as u,F as $,k as C,n as g,m as o,r as R,H as I,z as j,N as _,a as M}from"./iframe-DCDVANl5.js";import{_ as A}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{_ as V}from"./UiButton-ChRPCksm.js";import"./UiTransition-DbhvyPuS.js";import"./checkmark-circle-outlined-C3Tc8lmX.js";import"./clear-ByWhi14M.js";import"./info-outlined-uWU2f-rq.js";import"./preload-helper-PPVm8Dsz.js";import"./index-EpkwYzaG.js";import"./predicate-ClulhfEu.js";import"./render-Bpb61ZF3.js";import"./composables-ACcgJ6G0.js";const N=h({__name:"UiAlert.basic.example",setup(n){return(e,r)=>(i(),b(a,{text:"Basic alert message"}))}});N.__docgenInfo={exportName:"default",displayName:"UiAlert.basic.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiAlert.basic.example.vue"]};const U=h({__name:"UiAlert.variants.example",setup(n){const e=[t.PRIMARY,t.WARNING,t.SUCCESS,t.DANGER];return(r,f)=>(i(),u("div",{class:g(r.$style.container)},[(i(),u($,null,C(e,l=>o(a,{key:l,variant:l,text:`Variant: ${l}`},null,8,["variant","text"])),64))],2))}}),D="_container_akqoe_1",E={container:D},T={$style:E},B=A(U,[["__cssModules",T]]);U.__docgenInfo={exportName:"default",displayName:"UiAlert.variants.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiAlert.variants.example.vue"]};const k=h({__name:"UiAlert.closable.example",setup(n){const e=R(!0),r=()=>{e.value=!1};return(f,l)=>(i(),u("div",{class:g(f.$style.container)},[e.value?(i(),b(a,{key:0,closable:"",text:"You can close this alert manually",onHidden:r})):I("",!0),o(V,{appearance:"secondary",onClick:l[0]||(l[0]=O=>e.value=!0)},{default:j(()=>[...l[1]||(l[1]=[_(" Show alert ",-1)])]),_:1})],2))}}),F="_container_zag6v_1",W={container:F},G={$style:W},Y=A(k,[["__cssModules",G]]);k.__docgenInfo={exportName:"default",displayName:"UiAlert.closable.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiAlert.closable.example.vue"]};const S=h({__name:"UiAlert.content.example",setup(n){return(e,r)=>(i(),u("div",{class:g(e.$style.container)},[o(a,{ellipsis:"",text:"Very long alert message that should be truncated with ellipsis in one line mode."}),o(a,{small:""},{default:j(()=>[...r[0]||(r[0]=[_(" Small alert with custom slot content ",-1)])]),_:1}),o(a,{fluid:""},{default:j(()=>[...r[1]||(r[1]=[M("strong",null,"Full width content",-1),_(" can hold more complex markup and longer text blocks. ",-1)])]),_:1})],2))}}),z="_container_1xwe3_1",P={container:z},X={$style:P},H=A(S,[["__cssModules",X]]);S.__docgenInfo={exportName:"default",displayName:"UiAlert.content.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiAlert.content.example.vue"]};function v(n){const e={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...y(),...n.components};return s.jsxs(s.Fragment,{children:[s.jsx(e.h1,{id:"uialert",children:"UiAlert"}),`
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
`,s.jsx(e.pre,{children:s.jsx(e.code,{className:"language-ts",children:`import { UiAlert } from '@retailcrm/embed-ui-v1-components/remote'
`})}),`
`,s.jsx(e.h2,{id:"базовое-использование",children:"Базовое использование"}),`
`,s.jsx(e.pre,{children:s.jsx(e.code,{className:"language-vue",children:`<UiAlert text="Basic alert" />
`})}),`
`,s.jsx(c,{is:N}),`
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
`,s.jsx(c,{is:B}),`
`,s.jsx(e.h2,{id:"закрываемый-alert",children:"Закрываемый alert"}),`
`,s.jsxs(e.p,{children:["Если ",s.jsx(e.code,{children:"closable=true"}),", справа появляется кнопка закрытия."]}),`
`,s.jsx(e.pre,{children:s.jsx(e.code,{className:"language-vue",children:`<UiAlert
  closable
  text="You can close this alert manually"
/>
`})}),`
`,s.jsx(c,{is:Y}),`
`,s.jsx(e.h2,{id:"контент-и-размер",children:"Контент и размер"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"ellipsis"})," - обрезка заголовка в одну строку;"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"small"})," - уменьшенный размер текста;"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"fluid"})," - снять ограничение ширины контента."]}),`
`]}),`
`,s.jsx(c,{is:H}),`
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
`,s.jsx(w,{})]})}function L(n={}){const{wrapper:e}={...y(),...n.components};return e?s.jsx(e,{...n,children:s.jsx(v,{...n})}):v(n)}const xe={title:"Components/UiAlert",component:a,args:{variant:t.PRIMARY,text:"Basic alert",shown:!0,closable:!1,ellipsis:!1,small:!1,scrollToAlert:!1,scrollBehavior:"smooth",fluid:!1},argTypes:{variant:{control:"select",options:Object.values(t)}},render:n=>({components:{UiAlert:a},setup(){return{args:n}},template:`
      <div style="width: 520px">
          <UiAlert v-bind="args" />
      </div>
    `}),parameters:{docs:{page:L},layout:"centered"}},d={},m={args:{variant:t.WARNING,text:"Warning alert"}},x={args:{variant:t.SUCCESS,text:"Success alert"}},p={args:{variant:t.DANGER,text:"Danger alert"}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:"{}",...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    variant: VARIANT.WARNING,
    text: 'Warning alert'
  }
}`,...m.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    variant: VARIANT.SUCCESS,
    text: 'Success alert'
  }
}`,...x.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    variant: VARIANT.DANGER,
    text: 'Danger alert'
  }
}`,...p.parameters?.docs?.source}}};const pe=["Sandbox","Warning","Success","Danger"];export{p as Danger,d as Sandbox,x as Success,m as Warning,pe as __namedExportsOrder,xe as default};
