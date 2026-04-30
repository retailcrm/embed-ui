import{_ as t,C as f}from"./UiAddButton-Bjrlwgl_.js";import{u as U,j as e}from"./index-DFg_Ho_i.js";import{A as v}from"./blocks-DBDDY4vL.js";import{T as l}from"./ToReact-DbRAeBf3.js";import{h as a,c,k as i,z as d,o as u,N as o}from"./iframe-DnG3g5pW.js";import"./preload-helper-PPVm8Dsz.js";import"./index-nl1gzEpR.js";const N={style:{width:"420px"}},g=a({__name:"UiAddButton.basic.example",setup(r){return(n,s)=>(u(),c("div",N,[i(t,null,{default:d(()=>[...s[0]||(s[0]=[o(" Add Button ",-1)])]),_:1})]))}});g.__docgenInfo=Object.assign({displayName:g.name??g.__name},{exportName:"default",displayName:"UiAddButton.basic.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiAddButton.basic.example.vue"]});const k={style:{display:"grid",gap:"12px",width:"520px"}},_=a({__name:"UiAddButton.colors.example",setup(r){return(n,s)=>(u(),c("div",k,[i(t,{color:"green"},{default:d(()=>[...s[0]||(s[0]=[o(" Add Button ",-1)])]),_:1}),i(t,{color:"blue"},{default:d(()=>[...s[1]||(s[1]=[o(" Add Button ",-1)])]),_:1}),i(t,{color:"red"},{default:d(()=>[...s[2]||(s[2]=[o(" Add Button ",-1)])]),_:1}),i(t,{color:"yellow"},{default:d(()=>[...s[3]||(s[3]=[o(" Add Button ",-1)])]),_:1}),i(t,{color:"purple"},{default:d(()=>[...s[4]||(s[4]=[o(" Add Button ",-1)])]),_:1})]))}});_.__docgenInfo=Object.assign({displayName:_.name??_.__name},{exportName:"default",displayName:"UiAddButton.colors.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiAddButton.colors.example.vue"]});const w={style:{display:"grid",gap:"12px",width:"420px"}},A=a({__name:"UiAddButton.description.example",setup(r){return(n,s)=>(u(),c("div",w,[i(t,{color:"blue"},{description:d(()=>[...s[0]||(s[0]=[o(" Description ",-1)])]),default:d(()=>[s[1]||(s[1]=o(" Add Button ",-1))]),_:1}),i(t,{color:"blue",disabled:""},{description:d(()=>[...s[2]||(s[2]=[o(" Description ",-1)])]),default:d(()=>[s[3]||(s[3]=o(" Add Button ",-1))]),_:1})]))}});A.__docgenInfo=Object.assign({displayName:A.name??A.__name},{exportName:"default",displayName:"UiAddButton.description.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiAddButton.description.example.vue"]});const C={style:{display:"grid",gap:"12px",width:"420px"}},B=a({__name:"UiAddButton.height.example",setup(r){return(n,s)=>(u(),c("div",C,[i(t,{height:120},{default:d(()=>[...s[0]||(s[0]=[o(" Add Button ",-1)])]),_:1}),i(t,{height:"50%"},{default:d(()=>[...s[1]||(s[1]=[o(" Add Button ",-1)])]),_:1})]))}});B.__docgenInfo=Object.assign({displayName:B.name??B.__name},{exportName:"default",displayName:"UiAddButton.height.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiAddButton.height.example.vue"]});const O={style:{display:"flex","align-items":"center",gap:"16px"}},b=a({__name:"UiAddButton.small.example",setup(r){return(n,s)=>(u(),c("div",O,[i(t,{small:""},{default:d(()=>[...s[0]||(s[0]=[o(" Add Button ",-1)])]),_:1}),i(t,{small:"",disabled:""},{default:d(()=>[...s[1]||(s[1]=[o(" Add Button ",-1)])]),_:1})]))}});b.__docgenInfo=Object.assign({displayName:b.name??b.__name},{exportName:"default",displayName:"UiAddButton.small.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiAddButton.small.example.vue"]});function y(r){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...U(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{id:"uiaddbutton",children:"UiAddButton"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"UiAddButton"})," - кнопка для добавления нового элемента с поддержкой двух размеров и цветовых пресетов."]}),`
`,e.jsx(n.h2,{id:"когда-использовать",children:"Когда использовать"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"добавить сущность в список или таблицу;"}),`
`,e.jsx(n.li,{children:'показать явное CTA-действие "добавить";'}),`
`,e.jsxs(n.li,{children:["вывести компактный action в строке списка (",e.jsx(n.code,{children:"small"}),")."]}),`
`]}),`
`,e.jsx(n.h2,{id:"импорт",children:"Импорт"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`import { UiAddButton } from '@retailcrm/embed-ui-v1-components/remote'
`})}),`
`,e.jsx(n.h2,{id:"базовый-пример",children:"Базовый пример"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<UiAddButton>
  Add Button
</UiAddButton>
`})}),`
`,e.jsx(l,{is:g}),`
`,e.jsx(n.h2,{id:"размеры",children:"Размеры"}),`
`,e.jsx(n.h3,{id:"большой-по-умолчанию",children:"Большой (по умолчанию)"}),`
`,e.jsx(n.p,{children:"Используется в карточках, футерах и блоках с заметным CTA."}),`
`,e.jsxs(n.h3,{id:"маленький-small",children:["Маленький (",e.jsx(n.code,{children:"small"}),")"]}),`
`,e.jsx(n.p,{children:"Используется в строках списков и компактных местах интерфейса."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<UiAddButton small>
  Add Button
</UiAddButton>
`})}),`
`,e.jsx(l,{is:b}),`
`,e.jsxs(n.h2,{id:"описание-description-slot",children:["Описание (",e.jsx(n.code,{children:"description"})," slot)"]}),`
`,e.jsxs(n.p,{children:["Дополнительный текст показывается только в обычном режиме (не ",e.jsx(n.code,{children:"small"}),")."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<UiAddButton color="blue">
  Add Button

  <template #description>
    Description
  </template>
</UiAddButton>
`})}),`
`,e.jsx(l,{is:A}),`
`,e.jsx(n.h2,{id:"цветовые-варианты",children:"Цветовые варианты"}),`
`,e.jsx(n.p,{children:"Поддерживаются:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"green"})," (по умолчанию)"]}),`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"blue"})}),`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"red"})}),`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"yellow"})}),`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"purple"})}),`
`]}),`
`,e.jsx(l,{is:_}),`
`,e.jsx(n.h2,{id:"кастомная-высота",children:"Кастомная высота"}),`
`,e.jsx(n.p,{children:"Высота применяется только для обычного режима."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["число/числовая строка трактуется как ",e.jsx(n.code,{children:"px"}),";"]}),`
`,e.jsxs(n.li,{children:["строка с единицами (",e.jsx(n.code,{children:"%"}),", ",e.jsx(n.code,{children:"rem"}),", ",e.jsx(n.code,{children:"vh"}),") применяется как есть."]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<UiAddButton :height="120">Add Button</UiAddButton>
<UiAddButton height="50%">Add Button</UiAddButton>
`})}),`
`,e.jsx(l,{is:B}),`
`,e.jsx(n.h2,{id:"a11y",children:"A11y"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["компонент использует нативный ",e.jsx(n.code,{children:"<button>"}),";"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"disabled"})," прокидывается в нативный атрибут;"]}),`
`,e.jsxs(n.li,{children:["внешние ",e.jsx(n.code,{children:"aria-*"})," атрибуты можно передавать напрямую."]}),`
`]}),`
`,e.jsx(n.h2,{id:"полный-api",children:"Полный API"}),`
`,e.jsx(v,{})]})}function D(r={}){const{wrapper:n}={...U(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(y,{...r})}):y(r)}const R={title:"Components/UiAddButton",component:t,args:{type:"button",small:!1,color:f.GREEN,disabled:!1,height:80},argTypes:{color:{control:"select",options:Object.values(f)},height:{control:{type:"text"}}},render:r=>({components:{UiAddButton:t},setup:()=>({args:r}),template:`
      <div style="width: 420px;">
          <UiAddButton v-bind="args">
              Add Button

              <template #description>
                  Description
              </template>
          </UiAddButton>
      </div>
    `}),parameters:{docs:{page:D},layout:"centered"}},p={},m={args:{small:!0}},x={args:{disabled:!0}},h={args:{color:f.BLUE}},j={args:{height:120}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:"{}",...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    small: true
  }
}`,...m.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...x.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    color: COLOR.BLUE
  }
}`,...h.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    height: 120
  }
}`,...j.parameters?.docs?.source}}};const M=["Sandbox","Small","Disabled","Blue","CustomHeight"];export{h as Blue,j as CustomHeight,x as Disabled,p as Sandbox,m as Small,M as __namedExportsOrder,R as default};
