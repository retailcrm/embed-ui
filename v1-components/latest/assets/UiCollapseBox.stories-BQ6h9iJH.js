import{c as p,a as d,o as c,h as f,r as B,m as a,w as t,C as i,x as C,D as A,G as M,j as D}from"./iframe-B-kTCndX.js";import{_ as L}from"./UiButton-DlpnVjfS.js";import{_ as r,a as k,C as U,S as y}from"./UiCollapseGroup-BNmwvoAw.js";import{I as x}from"./settings-outlined-0kbijBPl.js";import{C as I}from"./UiCollapse-BN5_qMgg.js";import{o as R}from"./utils-BqzVSXwn.js";import{j as n}from"./jsx-runtime-4ZJMz8rO.js";import{useMDXComponents as w}from"./index-B4BHLWPH.js";import{A as $}from"./blocks-BFXVrAzm.js";import{T as m}from"./ToReact-oPhsQyRN.js";import"./preload-helper-PPVm8Dsz.js";import"./predicate-ClulhfEu.js";import"./composables-mLYPVKrD.js";import"./chevron-right-B40xN_8d.js";import"./index-BU-GYzGj.js";const T={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"};function z(s,e){return c(),p("svg",T,[...e[0]||(e[0]=[d("path",{fill:"currentColor","fill-rule":"evenodd",d:"m14.36 4.028.97.369h-.04a.5.5 0 0 1 .3.628l-5.31 14.648a.51.51 0 0 1-.64.3l-.94-.34a.5.5 0 0 1-.3-.638l5.31-14.668a.52.52 0 0 1 .65-.3M4.33 12.01l3.44-3.432a.49.49 0 0 0 0-.699l-.71-.708a.5.5 0 0 0-.71 0l-4.13 4.12a.77.77 0 0 0-.22.53v.379c0 .198.08.388.22.529l4.14 4.12a.5.5 0 0 0 .71 0l.71-.698a.5.5 0 0 0 0-.708zM22 12.2a.77.77 0 0 1-.22.529l-4.14 4.12a.5.5 0 0 1-.71 0l-.71-.708a.49.49 0 0 1 0-.698l3.45-3.433-3.45-3.432a.5.5 0 0 1 0-.709l.71-.698a.5.5 0 0 1 .71 0l4.14 4.12c.14.141.22.331.22.53z","clip-rule":"evenodd"},null,-1)])])}const S={render:z},P={style:{width:"640px"}},G=f({__name:"UiCollapseBox.basic.example",setup(s){const e=B(!0);return(l,o)=>(c(),p("div",P,[a(r,{expanded:e.value,"onUpdate:expanded":o[0]||(o[0]=v=>e.value=v)},{icon:t(()=>[a(C(x))]),title:t(()=>[...o[1]||(o[1]=[i(" Account settings ",-1)])]),description:t(()=>[...o[2]||(o[2]=[i(" Main configuration for your account. ",-1)])]),"body-content":t(()=>[...o[3]||(o[3]=[d("p",null,"Here you can configure profile, credentials and notification rules.",-1)])]),_:1},8,["expanded"])]))}});G.__docgenInfo={exportName:"default",displayName:"UiCollapseBox.basic.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiCollapseBox.basic.example.vue"]};const V={style:{width:"640px"}},N=f({__name:"UiCollapseBox.disabled.example",setup(s){return(e,l)=>(c(),p("div",V,[a(r,{disabled:""},{icon:t(()=>[a(C(x))]),title:t(()=>[...l[0]||(l[0]=[i(" Locked settings ",-1)])]),description:t(()=>[...l[1]||(l[1]=[i(" This block is disabled and cannot be expanded. ",-1)])]),"body-content":t(()=>[...l[2]||(l[2]=[d("p",null,"Hidden content.",-1)])]),_:1})]))}});N.__docgenInfo={exportName:"default",displayName:"UiCollapseBox.disabled.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiCollapseBox.disabled.example.vue"]};const F={style:{display:"grid",gap:"12px",width:"640px"}},E=f({__name:"UiCollapseBox.group.example",setup(s){const e=B("general");return(l,o)=>(c(),p("div",F,[d("div",null,[o[1]||(o[1]=d("strong",null,"Active id:",-1)),i(" "+A(e.value??"none"),1)]),a(k,{activeBoxId:e.value,"onUpdate:activeBoxId":o[0]||(o[0]=v=>e.value=v)},{default:t(()=>[a(r,{id:"general",color:"blue"},{icon:t(()=>[a(C(x))]),title:t(()=>[...o[2]||(o[2]=[i(" General settings ",-1)])]),description:t(()=>[...o[3]||(o[3]=[i(" Common parameters for the integration. ",-1)])]),"body-content":t(()=>[...o[4]||(o[4]=[i(" Base URL, retries, timezone and default language. ",-1)])]),_:1}),a(r,{id:"api",color:"green"},{icon:t(()=>[a(C(S))]),title:t(()=>[...o[5]||(o[5]=[i(" API settings ",-1)])]),description:t(()=>[...o[6]||(o[6]=[i(" Manage tokens and webhook endpoints. ",-1)])]),"body-content":t(()=>[...o[7]||(o[7]=[i(" Token, signature key and callback URL. ",-1)])]),_:1})]),_:1},8,["activeBoxId"])]))}});E.__docgenInfo={exportName:"default",displayName:"UiCollapseBox.group.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiCollapseBox.group.example.vue"]};const H={style:{width:"640px"}},O=f({__name:"UiCollapseBox.icon-slot.example",setup(s){return(e,l)=>(c(),p("div",H,[a(r,{color:"purple"},{icon:t(()=>[...l[0]||(l[0]=[d("span",{style:{display:"inline-flex","align-items":"center","justify-content":"center",width:"20px",height:"20px","border-radius":"4px",background:"#8a63d2",color:"#fff","font-size":"12px","font-weight":"700"}}," C ",-1)])]),title:t(()=>[...l[1]||(l[1]=[i(" Custom icon slot ",-1)])]),description:t(()=>[...l[2]||(l[2]=[i(" Icon is provided only via slot. ",-1)])]),"body-content":t(()=>[...l[3]||(l[3]=[i(" You can pass your own SVG/Vue component to the `icon` slot. ",-1)])]),_:1})]))}});O.__docgenInfo={exportName:"default",displayName:"UiCollapseBox.icon-slot.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiCollapseBox.icon-slot.example.vue"]};function _(s){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...w(),...s.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{id:"uicollapsebox--uicollapsegroup",children:"UiCollapseBox / UiCollapseGroup"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"UiCollapseBox"}),` - готовый disclosure-блок с заголовком, описанием и коллапсируемым контентом.
`,n.jsx(e.code,{children:"UiCollapseGroup"})," объединяет несколько боксов и синхронизирует активный элемент."]}),`
`,n.jsx(e.h2,{id:"когда-использовать",children:"Когда использовать"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"нужно компактно сгруппировать длинный контент по секциям;"}),`
`,n.jsx(e.li,{children:'важен стандартный UI "заголовок -> раскрываемое содержимое";'}),`
`,n.jsx(e.li,{children:'нужно поведение "в группе открыт только один бокс".'}),`
`]}),`
`,n.jsx(e.h2,{id:"импорт",children:"Импорт"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-ts",children:`import { UiCollapseBox, UiCollapseGroup } from '@retailcrm/embed-ui-v1-components/remote'
`})}),`
`,n.jsx(e.h2,{id:"базовый-пример",children:"Базовый пример"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<UiCollapseBox v-model:expanded="expanded">
  <template #title>Section title</template>
  <template #body-content>Section content</template>
</UiCollapseBox>
`})}),`
`,n.jsx(m,{is:G}),`
`,n.jsx(e.h2,{id:"работа-в-группе",children:"Работа в группе"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"UiCollapseGroup"})," управляется через ",n.jsx(e.code,{children:"v-model:activeBoxId"}),`.
Открытие нового бокса закрывает предыдущий (если его можно свернуть).`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<UiCollapseGroup v-model:activeBoxId="activeBoxId">
  <UiCollapseBox id="one">
    <template #title>One</template>
    <template #body-content>...</template>
  </UiCollapseBox>

  <UiCollapseBox id="two">
    <template #title>Two</template>
    <template #body-content>...</template>
  </UiCollapseBox>
</UiCollapseGroup>
`})}),`
`,n.jsx(m,{is:E}),`
`,n.jsx(e.h2,{id:"состояния",children:"Состояния"}),`
`,n.jsx(e.h3,{id:"disabled",children:"Disabled"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<UiCollapseBox disabled>
  <template #title>Disabled section</template>
</UiCollapseBox>
`})}),`
`,n.jsx(m,{is:N}),`
`,n.jsx(e.h3,{id:"кастомная-иконка-через-слот",children:"Кастомная иконка через слот"}),`
`,n.jsxs(e.p,{children:["Иконка задаётся через ",n.jsx(e.code,{children:"icon"})," slot."]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<UiCollapseBox>
  <template #icon>
    <MyCustomIcon />
  </template>
</UiCollapseBox>
`})}),`
`,n.jsx(m,{is:O}),`
`,n.jsx(e.h2,{id:"a11y",children:"A11y"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Заголовок реализован нативной кнопкой."}),`
`,n.jsxs(e.li,{children:["На кнопке выставляются ",n.jsx(e.code,{children:"aria-expanded"})," и ",n.jsx(e.code,{children:"aria-controls"}),"."]}),`
`,n.jsxs(e.li,{children:["Контентный блок получает ",n.jsx(e.code,{children:'role="region"'})," и ",n.jsx(e.code,{children:"aria-labelledby"}),"."]}),`
`,n.jsxs(e.li,{children:["В отключённом состоянии используется нативный ",n.jsx(e.code,{children:"disabled"})," для корректной клавиатурной семантики."]}),`
`]}),`
`,n.jsx(e.h2,{id:"события",children:"События"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"UiCollapseBox"}),":"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"update:expanded"})}),`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"toggle"})}),`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"expand-cancel"})}),`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"collapse-cancel"})}),`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"expanded"})}),`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"collapsed"})}),`
`]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"UiCollapseGroup"}),":"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"update:activeBoxId"})}),`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"expanded"})}),`
`,n.jsx(e.li,{children:n.jsx(e.code,{children:"expand-cancelled"})}),`
`]}),`
`,n.jsx(e.h2,{id:"полный-api",children:"Полный API"}),`
`,n.jsx($,{})]})}function X(s={}){const{wrapper:e}={...w(),...s.components};return e?n.jsx(e,{...s,children:n.jsx(_,{...s})}):_(s)}const re={title:"Components/UiCollapseBox",component:r,args:{id:"collapse-box-sandbox",expanded:!1,expandable:!0,collapsible:!0,toggleable:!0,collapseBehaviour:I.HIDE,collapseDuration:.75,disabled:!1,color:U.BLUE,iconSize:y.SM,bordered:!1},argTypes:{id:{control:"text"},expanded:{control:!1},collapseBehaviour:{control:"select",options:Object.values(I)},color:{control:"select",options:Object.values(U)},iconSize:{control:"select",options:Object.values(y)}},render:s=>({components:{UiButton:L,UiCollapseBox:r,IconSettingsOutlined:x},setup(){const e=B(s.expanded??!1);return M(()=>s.expanded,l=>{typeof l<"u"&&(e.value=l)}),{expanded:e,props:D(()=>R(s,["expanded"]))}},template:`
      <div style="width: 640px;">
          <UiCollapseBox
              v-model:expanded="expanded"
              v-bind="props"
          >
              <template #title>
                  Connection settings
              </template>

              <template #icon>
                  <IconSettingsOutlined />
              </template>

              <template #description>
                  Configure API credentials and synchronization parameters.
              </template>

              <template #body-content>
                  <p>
                      Keep credentials secure and rotate them regularly.
                  </p>

                  <p>
                      You can keep this section collapsed by default and open it on demand.
                  </p>
              </template>

              <template #footer-content>
                  <UiButton
                      appearance="secondary"
                      style="flex: none; align-self: flex-start;"
                      @click="expanded = false"
                  >
                      Collapse
                  </UiButton>
              </template>
          </UiCollapseBox>
      </div>
    `}),parameters:{docs:{page:X},layout:"centered"}},u={},g={args:{expanded:!0}},h={args:{disabled:!0,expanded:!1}},j={args:{bordered:!0,color:U.GREEN}},b={render:()=>({components:{UiCollapseBox:r,UiCollapseGroup:k,IconCode:S,IconSettingsOutlined:x},setup(){return{activeBoxId:B("security")}},template:`
      <div style="width: 640px;">
          <UiCollapseGroup v-model:activeBoxId="activeBoxId">
              <UiCollapseBox id="security" color="blue">
                  <template #title>
                      Security
                  </template>

                  <template #icon>
                      <IconSettingsOutlined />
                  </template>

                  <template #description>
                      Authentication and access control.
                  </template>

                  <template #body-content>
                      Enable two-factor authentication and configure token lifetime.
                  </template>
              </UiCollapseBox>

              <UiCollapseBox id="integration" color="green">
                  <template #title>
                      Integration
                  </template>

                  <template #icon>
                      <IconCode />
                  </template>

                  <template #description>
                      API endpoints and webhook delivery.
                  </template>

                  <template #body-content>
                      Manage callback URL and request signing settings.
                  </template>
              </UiCollapseBox>
          </UiCollapseGroup>
      </div>
    `})};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:"{}",...u.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    expanded: true
  }
}`,...g.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    expanded: false
  }
}`,...h.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    bordered: true,
    color: COLOR.GREEN
  }
}`,...j.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiCollapseBox,
      UiCollapseGroup,
      IconCode,
      IconSettingsOutlined
    },
    setup() {
      return {
        activeBoxId: ref<string | null>('security')
      };
    },
    template: \`
      <div style="width: 640px;">
          <UiCollapseGroup v-model:activeBoxId="activeBoxId">
              <UiCollapseBox id="security" color="blue">
                  <template #title>
                      Security
                  </template>

                  <template #icon>
                      <IconSettingsOutlined />
                  </template>

                  <template #description>
                      Authentication and access control.
                  </template>

                  <template #body-content>
                      Enable two-factor authentication and configure token lifetime.
                  </template>
              </UiCollapseBox>

              <UiCollapseBox id="integration" color="green">
                  <template #title>
                      Integration
                  </template>

                  <template #icon>
                      <IconCode />
                  </template>

                  <template #description>
                      API endpoints and webhook delivery.
                  </template>

                  <template #body-content>
                      Manage callback URL and request signing settings.
                  </template>
              </UiCollapseBox>
          </UiCollapseGroup>
      </div>
    \`
  })
}`,...b.parameters?.docs?.source}}};const de=["Sandbox","Expanded","Disabled","Bordered","Group"];export{j as Bordered,h as Disabled,g as Expanded,b as Group,u as Sandbox,de as __namedExportsOrder,re as default};
