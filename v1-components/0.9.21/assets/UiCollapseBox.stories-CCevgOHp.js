import{c as p,a as d,o as c,h as y,k as i,z as t,r as I,N as a,E as U,t as A,w as M,q as L}from"./iframe-DnG3g5pW.js";import{_ as R}from"./UiButton-BCon8_Cd.js";import{_ as r,a as O,C as k,S as w}from"./UiCollapseGroup-DXm7JzSi.js";import{I as m}from"./settings-outlined-Ds2_qSaX.js";import{C as S}from"./UiCollapse-DFBZbTRg.js";import{o as D}from"./utils-BqzVSXwn.js";import{u as G,j as n}from"./index-DFg_Ho_i.js";import{A as $}from"./blocks-DBDDY4vL.js";import{T as x}from"./ToReact-DbRAeBf3.js";import"./preload-helper-PPVm8Dsz.js";import"./predicate-ClulhfEu.js";import"./render-vaNyDQt4.js";import"./composables-CfEvSTVp.js";import"./chevron-right-xEdkHvRN.js";import"./index-nl1gzEpR.js";const z={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"};function T(s,e){return c(),p("svg",z,[...e[0]||(e[0]=[d("path",{fill:"currentColor","fill-rule":"evenodd",d:"m14.36 4.028.97.369h-.04a.5.5 0 0 1 .3.628l-5.31 14.648a.51.51 0 0 1-.64.3l-.94-.34a.5.5 0 0 1-.3-.638l5.31-14.668a.52.52 0 0 1 .65-.3M4.33 12.01l3.44-3.432a.49.49 0 0 0 0-.699l-.71-.708a.5.5 0 0 0-.71 0l-4.13 4.12a.77.77 0 0 0-.22.53v.379c0 .198.08.388.22.529l4.14 4.12a.5.5 0 0 0 .71 0l.71-.698a.5.5 0 0 0 0-.708zM22 12.2a.77.77 0 0 1-.22.529l-4.14 4.12a.5.5 0 0 1-.71 0l-.71-.708a.49.49 0 0 1 0-.698l3.45-3.433-3.45-3.432a.5.5 0 0 1 0-.709l.71-.698a.5.5 0 0 1 .71 0l4.14 4.12c.14.141.22.331.22.53z","clip-rule":"evenodd"},null,-1)])])}const E={render:T},P={style:{width:"640px"}},C=y({__name:"UiCollapseBox.basic.example",setup(s){const e=I(!0);return(l,o)=>(c(),p("div",P,[i(r,{expanded:e.value,"onUpdate:expanded":o[0]||(o[0]=_=>e.value=_)},{icon:t(()=>[i(U(m))]),title:t(()=>[...o[1]||(o[1]=[a(" Account settings ",-1)])]),description:t(()=>[...o[2]||(o[2]=[a(" Main configuration for your account. ",-1)])]),"body-content":t(()=>[...o[3]||(o[3]=[d("p",null,"Here you can configure profile, credentials and notification rules.",-1)])]),_:1},8,["expanded"])]))}});C.__docgenInfo=Object.assign({displayName:C.name??C.__name},{exportName:"default",displayName:"UiCollapseBox.basic.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiCollapseBox.basic.example.vue"]});const V={style:{width:"640px"}},f=y({__name:"UiCollapseBox.disabled.example",setup(s){return(e,l)=>(c(),p("div",V,[i(r,{disabled:""},{icon:t(()=>[i(U(m))]),title:t(()=>[...l[0]||(l[0]=[a(" Locked settings ",-1)])]),description:t(()=>[...l[1]||(l[1]=[a(" This block is disabled and cannot be expanded. ",-1)])]),"body-content":t(()=>[...l[2]||(l[2]=[d("p",null,"Hidden content.",-1)])]),_:1})]))}});f.__docgenInfo=Object.assign({displayName:f.name??f.__name},{exportName:"default",displayName:"UiCollapseBox.disabled.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiCollapseBox.disabled.example.vue"]});const F={style:{display:"grid",gap:"12px",width:"640px"}},B=y({__name:"UiCollapseBox.group.example",setup(s){const e=I("general");return(l,o)=>(c(),p("div",F,[d("div",null,[o[1]||(o[1]=d("strong",null,"Active id:",-1)),a(" "+A(e.value??"none"),1)]),i(O,{activeBoxId:e.value,"onUpdate:activeBoxId":o[0]||(o[0]=_=>e.value=_)},{default:t(()=>[i(r,{id:"general",color:"blue"},{icon:t(()=>[i(U(m))]),title:t(()=>[...o[2]||(o[2]=[a(" General settings ",-1)])]),description:t(()=>[...o[3]||(o[3]=[a(" Common parameters for the integration. ",-1)])]),"body-content":t(()=>[...o[4]||(o[4]=[a(" Base URL, retries, timezone and default language. ",-1)])]),_:1}),i(r,{id:"api",color:"green"},{icon:t(()=>[i(U(E))]),title:t(()=>[...o[5]||(o[5]=[a(" API settings ",-1)])]),description:t(()=>[...o[6]||(o[6]=[a(" Manage tokens and webhook endpoints. ",-1)])]),"body-content":t(()=>[...o[7]||(o[7]=[a(" Token, signature key and callback URL. ",-1)])]),_:1})]),_:1},8,["activeBoxId"])]))}});B.__docgenInfo=Object.assign({displayName:B.name??B.__name},{exportName:"default",displayName:"UiCollapseBox.group.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiCollapseBox.group.example.vue"]});const H={style:{width:"640px"}},v=y({__name:"UiCollapseBox.icon-slot.example",setup(s){return(e,l)=>(c(),p("div",H,[i(r,{color:"purple"},{icon:t(()=>[...l[0]||(l[0]=[d("span",{style:{display:"inline-flex","align-items":"center","justify-content":"center",width:"20px",height:"20px","border-radius":"4px",background:"#8a63d2",color:"#fff","font-size":"12px","font-weight":"700"}}," C ",-1)])]),title:t(()=>[...l[1]||(l[1]=[a(" Custom icon slot ",-1)])]),description:t(()=>[...l[2]||(l[2]=[a(" Icon is provided only via slot. ",-1)])]),"body-content":t(()=>[...l[3]||(l[3]=[a(" You can pass your own SVG/Vue component to the `icon` slot. ",-1)])]),_:1})]))}});v.__docgenInfo=Object.assign({displayName:v.name??v.__name},{exportName:"default",displayName:"UiCollapseBox.icon-slot.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiCollapseBox.icon-slot.example.vue"]});function N(s){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...G(),...s.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{id:"uicollapsebox--uicollapsegroup",children:"UiCollapseBox / UiCollapseGroup"}),`
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
`,n.jsx(x,{is:C}),`
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
`,n.jsx(x,{is:B}),`
`,n.jsx(e.h2,{id:"состояния",children:"Состояния"}),`
`,n.jsx(e.h3,{id:"disabled",children:"Disabled"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<UiCollapseBox disabled>
  <template #title>Disabled section</template>
</UiCollapseBox>
`})}),`
`,n.jsx(x,{is:f}),`
`,n.jsx(e.h3,{id:"кастомная-иконка-через-слот",children:"Кастомная иконка через слот"}),`
`,n.jsxs(e.p,{children:["Иконка задаётся через ",n.jsx(e.code,{children:"icon"})," slot."]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<UiCollapseBox>
  <template #icon>
    <MyCustomIcon />
  </template>
</UiCollapseBox>
`})}),`
`,n.jsx(x,{is:v}),`
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
`,n.jsx($,{})]})}function q(s={}){const{wrapper:e}={...G(),...s.components};return e?n.jsx(e,{...s,children:n.jsx(N,{...s})}):N(s)}const re={title:"Components/UiCollapseBox",component:r,args:{id:"collapse-box-sandbox",expanded:!1,expandable:!0,collapsible:!0,toggleable:!0,collapseBehaviour:S.HIDE,collapseDuration:.75,disabled:!1,color:k.BLUE,iconSize:w.SM,bordered:!1},argTypes:{id:{control:"text"},expanded:{control:!1},collapseBehaviour:{control:"select",options:Object.values(S)},color:{control:"select",options:Object.values(k)},iconSize:{control:"select",options:Object.values(w)}},render:s=>({components:{UiButton:R,UiCollapseBox:r,IconSettingsOutlined:m},setup(){const e=I(s.expanded??!1);return M(()=>s.expanded,l=>{typeof l<"u"&&(e.value=l)}),{expanded:e,props:L(()=>D(s,["expanded"]))}},template:`
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
    `}),parameters:{docs:{page:q},layout:"centered"}},u={},g={args:{expanded:!0}},h={args:{disabled:!0,expanded:!1}},j={args:{bordered:!0,color:k.GREEN}},b={render:()=>({components:{UiCollapseBox:r,UiCollapseGroup:O,IconCode:E,IconSettingsOutlined:m},setup(){return{activeBoxId:I("security")}},template:`
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
