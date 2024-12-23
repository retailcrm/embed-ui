import{e as x,c as m,j as E,v as d,u as h,o as l,l as j,t as y,a as b,f as N,g as U,s as w,k as S,q as T}from"./vue.esm-bundler-BP2e016x.js";import{j as s}from"./jsx-runtime-DQFc-wkB.js";import{useMDXComponents as _}from"./index-BjypYOp6.js";import{T as n}from"./ToReact-D2xygIhY.js";import{_ as k}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-C_1tOEKP.js";var t=(r=>(r.LEFT="left",r.RIGHT="right",r))(t||{});const i=x({__name:"UiError",props:{message:{type:String,default:""},align:{type:String,validator:r=>Object.values(t).includes(r),default:t.LEFT},ellipsis:{type:Boolean,default:!1}},setup(r){return(e,c)=>(l(),m("div",{class:d({"ui-v1-error":!0,"ui-v1-error_ellipsis":r.ellipsis,"ui-v1-error_right":r.align===h(t).RIGHT})},[E(e.$slots,"default",{},()=>[j(y(r.message),1)])],2))}});i.__docgenInfo={exportName:"default",displayName:"UiError",description:"",tags:{},props:[{name:"message",description:"Тест, разметка ошибки",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"align",description:"Определяет, по какому краю будет выровнен текст ошибки",type:{name:"ALIGN"},defaultValue:{func:!1,value:"ALIGN.LEFT"}},{name:"ellipsis",description:`Определяет, будет ли текст ошибок обрезаться через многоточие или
 переноситься на следующую строку`,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/host/components/error/UiError.vue"]};const C={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"};function L(r,e){return l(),m("svg",C,e[0]||(e[0]=[b("path",{fill:"currentColor","fill-rule":"evenodd",d:"M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10A10 10 0 0 0 12 2m1 13.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5zm-.47-3.5a.25.25 0 0 0 .25-.22l.4-3.22a.5.5 0 0 0-.5-.56h-1.36a.5.5 0 0 0-.5.56l.4 3.22a.25.25 0 0 0 .25.22z","clip-rule":"evenodd"},null,-1)]))}const M={render:L},v=x({__name:"UiError.example",props:{useSlot:{type:Boolean,default:!1}},setup(r){return(e,c)=>(l(),N(i,T(e.$attrs,{class:e.$style.container}),{default:U(()=>[r.useSlot?(l(),m("div",{key:0,class:d(e.$style.content)},[w(h(M),{class:d(e.$style.icon)},null,8,["class"]),c[0]||(c[0]=j(" Error message with icon "))],2)):S("",!0)]),_:1},16,["class"]))}}),V="_container_qxfzn_1",B="_content_qxfzn_7",F="_icon_qxfzn_12",I={container:V,content:B,icon:F},$={$style:I},o=k(v,[["__cssModules",$]]);v.__docgenInfo={exportName:"default",displayName:"UiError.example",description:"",tags:{},props:[{name:"useSlot",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiError.example.vue"]};function p(r){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",..._(),...r.components};return s.jsxs(s.Fragment,{children:[s.jsx(e.h1,{id:"uierror",children:"UiError"}),`
`,s.jsx(e.p,{children:"Компонент визуализации некоторой ошибки"}),`
`,s.jsx(e.h2,{id:"api",children:"API"}),`
`,s.jsx(e.h3,{id:"контент",children:"Контент"}),`
`,s.jsxs(e.p,{children:["Передачу текстового сообщения ошибки можно осуществлять через свойство ",s.jsx(e.code,{children:"message"}),`
или слот по-умолчанию (для передачи HTML разметки)`]}),`
`,s.jsxs("p",{className:"flex-column pl-4 gap-2",children:[s.jsx(n,{is:o,message:"Error message"}),s.jsx(n,{is:o,useSlot:!0})]}),`
`,s.jsx(e.h3,{id:"выравнивание-содержимого",children:"Выравнивание содержимого"}),`
`,s.jsx(e.p,{children:"В рамках компонента допускается выравнивание текста по левому или правому краю."}),`
`,s.jsxs("p",{className:"flex-column pl-4 gap-2",children:[s.jsx(n,{is:o,message:"Error text on the left"}),s.jsx(n,{is:o,message:"Error text on the right",align:"right"})]}),`
`,s.jsx(e.h3,{id:"переполнение",children:"Переполнение"}),`
`,s.jsxs(e.p,{children:["Если включено свойство ",s.jsx(e.code,{children:"ellipsis"}),`, то при переполнении текстового содержимого, оно будет обрезаться через многоточие.
Без флага `,s.jsx(e.code,{children:"ellipsis"})," контент переносится на следующую строку"]}),`
`,s.jsxs("p",{className:"flex-column pl-4 gap-2",style:{width:"100px"},children:[s.jsx(n,{is:o,message:"Long error message"}),s.jsx(n,{is:o,message:"Long error message",ellipsis:!0})]})]})}function z(r={}){const{wrapper:e}={..._(),...r.components};return e?s.jsx(e,{...r,children:s.jsx(p,{...r})}):p(r)}const X={title:"Components/UiError",component:i,args:{align:t.LEFT},argTypes:{align:{control:"select",options:Object.values(t)},default:{control:!1}},render:r=>({components:{UiError:i},setup(){return{args:r}},template:`
        <UiError v-bind="args">
            Error message
        </UiError>
    `}),parameters:{docs:{page:z},layout:"centered"}},a={};var u,f,g;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:"{}",...(g=(f=a.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};const P=["Sandbox"];export{a as Sandbox,P as __namedExportsOrder,X as default};
