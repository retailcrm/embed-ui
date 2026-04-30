import{_ as l,V as t}from"./UiAlert-CBSkFbOL.js";import{u as k,j as s}from"./index-DFg_Ho_i.js";import{A as w}from"./blocks-DBDDY4vL.js";import{T as c}from"./ToReact-DbRAeBf3.js";import{h as A,y as S,o as i,c as g,F as $,j as C,n as y,k as o,H as R,z as f,r as I,N as v,a as M}from"./iframe-DnG3g5pW.js";import{_ as b}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{_ as V}from"./UiButton-BCon8_Cd.js";import"./UiTransition-BqKpixzE.js";import"./checkmark-circle-outlined-DWYjxeqP.js";import"./clear-jf7bAM_2.js";import"./info-outlined-CPTd3wZn.js";import"./preload-helper-PPVm8Dsz.js";import"./index-nl1gzEpR.js";import"./predicate-ClulhfEu.js";import"./render-vaNyDQt4.js";import"./composables-CfEvSTVp.js";const u=A({__name:"UiAlert.basic.example",setup(n){return(e,r)=>(i(),S(l,{text:"Basic alert message"}))}});u.__docgenInfo=Object.assign({displayName:u.name??u.__name},{exportName:"default",displayName:"UiAlert.basic.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiAlert.basic.example.vue"]});const h=A({__name:"UiAlert.variants.example",setup(n){const e=[t.PRIMARY,t.WARNING,t.SUCCESS,t.DANGER];return(r,N)=>(i(),g("div",{class:y(r.$style.container)},[(i(),g($,null,C(e,a=>o(l,{key:a,variant:a,text:`Variant: ${a}`},null,8,["variant","text"])),64))],2))}}),D="_container_akqoe_1",E={container:D},T={$style:E},B=b(h,[["__cssModules",T]]);h.__docgenInfo=Object.assign({displayName:h.name??h.__name},{exportName:"default",displayName:"UiAlert.variants.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiAlert.variants.example.vue"]});const j=A({__name:"UiAlert.closable.example",setup(n){const e=I(!0),r=()=>{e.value=!1};return(N,a)=>(i(),g("div",{class:y(N.$style.container)},[e.value?(i(),S(l,{key:0,closable:"",text:"You can close this alert manually",onHidden:r})):R("",!0),o(V,{appearance:"secondary",onClick:a[0]||(a[0]=L=>e.value=!0)},{default:f(()=>[...a[1]||(a[1]=[v(" Show alert ",-1)])]),_:1})],2))}}),F="_container_zag6v_1",W={container:F},G={$style:W},O=b(j,[["__cssModules",G]]);j.__docgenInfo=Object.assign({displayName:j.name??j.__name},{exportName:"default",displayName:"UiAlert.closable.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiAlert.closable.example.vue"]});const _=A({__name:"UiAlert.content.example",setup(n){return(e,r)=>(i(),g("div",{class:y(e.$style.container)},[o(l,{ellipsis:"",text:"Very long alert message that should be truncated with ellipsis in one line mode."}),o(l,{small:""},{default:f(()=>[...r[0]||(r[0]=[v(" Small alert with custom slot content ",-1)])]),_:1}),o(l,{fluid:""},{default:f(()=>[...r[1]||(r[1]=[M("strong",null,"Full width content",-1),v(" can hold more complex markup and longer text blocks. ",-1)])]),_:1})],2))}}),Y="_container_1xwe3_1",z={container:Y},P={$style:z},X=b(_,[["__cssModules",P]]);_.__docgenInfo=Object.assign({displayName:_.name??_.__name},{exportName:"default",displayName:"UiAlert.content.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiAlert.content.example.vue"]});function U(n){const e={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...k(),...n.components};return s.jsxs(s.Fragment,{children:[s.jsx(e.h1,{id:"uialert",children:"UiAlert"}),`
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
`,s.jsx(c,{is:u}),`
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
`,s.jsx(c,{is:O}),`
`,s.jsx(e.h2,{id:"контент-и-размер",children:"Контент и размер"}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"ellipsis"})," - обрезка заголовка в одну строку;"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"small"})," - уменьшенный размер текста;"]}),`
`,s.jsxs(e.li,{children:[s.jsx(e.code,{children:"fluid"})," - снять ограничение ширины контента."]}),`
`]}),`
`,s.jsx(c,{is:X}),`
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
`,s.jsx(w,{})]})}function H(n={}){const{wrapper:e}={...k(),...n.components};return e?s.jsx(e,{...n,children:s.jsx(U,{...n})}):U(n)}const me={title:"Components/UiAlert",component:l,args:{variant:t.PRIMARY,text:"Basic alert",shown:!0,closable:!1,ellipsis:!1,small:!1,scrollToAlert:!1,scrollBehavior:"smooth",fluid:!1},argTypes:{variant:{control:"select",options:Object.values(t)}},render:n=>({components:{UiAlert:l},setup(){return{args:n}},template:`
      <div style="width: 520px">
          <UiAlert v-bind="args" />
      </div>
    `}),parameters:{docs:{page:H},layout:"centered"}},d={},m={args:{variant:t.WARNING,text:"Warning alert"}},x={args:{variant:t.SUCCESS,text:"Success alert"}},p={args:{variant:t.DANGER,text:"Danger alert"}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:"{}",...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};const xe=["Sandbox","Warning","Success","Danger"];export{p as Danger,d as Sandbox,x as Success,m as Warning,xe as __namedExportsOrder,me as default};
