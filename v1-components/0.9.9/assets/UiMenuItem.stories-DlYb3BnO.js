import{S as p,_ as c,I as y}from"./checkmark-circle-DghoGCKu.js";import{j as e}from"./index-Djyvt97q.js";import{useMDXComponents as x}from"./index-Cdf3Trmt.js";import{T as a}from"./ToReact-rGZD6-Z2.js";import{c as j,o as h,a as v,g as I,q as M,s as b,w as i,n as r,m as l,z as u,A as d,u as m}from"./iframe-CzwIxcDt.js";import{_ as S}from"./UiAvatar-D8pViE9E.js";import{_ as z}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./index-B44Kv34C.js";import"./preload-helper-PPVm8Dsz.js";import"./UiImage-1XONiwuo.js";import"./predicate-ClulhfEu.js";const k={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"};function U(t,n){return h(),j("svg",k,[...n[0]||(n[0]=[v("path",{fill:"currentColor","fill-rule":"evenodd",d:"M16.004 8A4 4 0 1 1 8 7.998 4 4 0 0 1 16.004 8m-2 0a2 2 0 1 0-4.001 0 2 2 0 0 0 4 0m5.892 10.55-1.89-3.89A3 3 0 0 0 15.263 13H8.742a3 3 0 0 0-2.691 1.66L4.11 18.55A1 1 0 0 0 5 20h14.006a1 1 0 0 0 .89-1.45m-12.055-3L6.621 18h10.764l-1.22-2.45a1 1 0 0 0-.9-.55H8.741a1 1 0 0 0-.9.55","clip-rule":"evenodd"},null,-1)])])}const V={render:U},g=I({__name:"UiMenuItem.example",props:{avatar:{type:Boolean,default:!1},text:{type:String,default:"Audrey Robertson"},description:{type:String,default:""},counter:{type:[String,Number],default:null},size:{type:String,default:p.MD},accent:{type:Boolean,default:!1},leadingIcon:{type:Boolean,default:!1},trailingIcon:{type:Boolean,default:!1}},setup(t){return(n,E)=>(h(),M(c,{class:r(n.$style.item),size:t.size,counter:t.counter,accent:t.accent},b({default:i(()=>[u(d(t.text)+" ",1)]),_:2},[t.avatar?{name:"avatar",fn:i(()=>[l(S,{name:t.text},null,8,["name"])]),key:"0"}:void 0,t.description?{name:"description",fn:i(()=>[u(d(t.description),1)]),key:"1"}:void 0,t.leadingIcon?{name:"leading-icon",fn:i(()=>[l(m(V),{class:r(n.$style.icon)},null,8,["class"])]),key:"2"}:void 0,t.trailingIcon?{name:"trailing-icon",fn:i(()=>[l(m(y),{class:r(n.$style.icon)},null,8,["class"])]),key:"3"}:void 0]),1032,["class","size","counter","accent"]))}}),_="_item_1ijfa_1",C="_icon_1ijfa_4",w={item:_,icon:C},B={$style:w},s=z(g,[["__cssModules",B]]);g.__docgenInfo={exportName:"default",displayName:"UiMenuItem.example",description:"",tags:{},props:[{name:"avatar",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"text",type:{name:"string"},defaultValue:{func:!1,value:"'Audrey Robertson'"}},{name:"description",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"counter",type:{name:"string|number"},defaultValue:{func:!1,value:"null"}},{name:"size",type:{name:"SIZE | `${SIZE}`"},defaultValue:{func:!1,value:"SIZE.MD"}},{name:"accent",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"leadingIcon",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"trailingIcon",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiMenuItem.example.vue"]};function f(t){const n={h1:"h1",h2:"h2",p:"p",...x(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{id:"uimenuitem",children:"UiMenuItem"}),`
`,e.jsx(n.p,{children:"Используется для отображения элемента выпадающего списка (меню)"}),`
`,e.jsx(n.h2,{id:"механика-работы",children:"Механика работы"}),`
`,e.jsx(n.p,{children:"Содержит основной текст, может содержать иконку слева, справа или дополнительный текст"}),`
`,e.jsx(n.h2,{id:"только-основной-текст-дефолтный-слот",children:"Только основной текст (Дефолтный слот)"}),`
`,e.jsx(a,{is:s}),`
`,e.jsx(n.h2,{id:"жирный-текст-со-счетчиком-справа",children:"Жирный текст со счетчиком справа"}),`
`,e.jsx(a,{is:s,counter:"15",accent:!0}),`
`,e.jsx(n.h2,{id:"основной-текст-и-описание",children:"Основной текст и описание"}),`
`,e.jsx(a,{is:s,description:"Менеджер"}),`
`,e.jsx(n.h2,{id:"слот-для-аватара",children:"Слот для аватара"}),`
`,e.jsx(a,{is:s,avatar:!0}),`
`,e.jsx(n.h2,{id:"слот-для-аватара-и-слот-для-description",children:"Слот для аватара и слот для description"}),`
`,e.jsx(a,{is:s,avatar:!0,description:"Менеджер"}),`
`,e.jsx(n.h2,{id:"иконка-слева",children:"Иконка слева"}),`
`,e.jsx(a,{is:s,"leading-icon":!0}),`
`,e.jsx(n.h2,{id:"иконка-справа",children:"Иконка справа"}),`
`,e.jsx(a,{is:s,"trailing-icon":!0}),`
`,e.jsx(n.h2,{id:"иконки-слева-и-справа",children:"Иконки слева и справа"}),`
`,e.jsx(a,{is:s,"leading-icon":!0,"trailing-icon":!0}),`
`,e.jsx(n.h2,{id:"уменьшенный-размер-sizesm",children:'Уменьшенный размер (size="sm")'}),`
`,e.jsx(a,{is:s,size:"sm"})]})}function A(t={}){const{wrapper:n}={...x(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(f,{...t})}):f(t)}const q={id:"UiMenuItem",title:"Components/UiMenuItem",component:c,argTypes:{size:{options:Object.values(p)},counter:{control:{type:"number"}}},render:t=>({components:{UiMenuItem:c},setup:()=>({args:t}),template:`
      <UiMenuItem v-bind="args">
          Audrey Robertson
      </UiMenuItem>
    `}),parameters:{docs:{page:A},layout:"centered"}},o={args:{size:"md",description:"",counter:0,accent:!0,active:!1,danger:!1}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'md',
    description: '',
    counter: 0,
    accent: true,
    active: false,
    danger: false
  }
}`,...o.parameters?.docs?.source}}};const G=["Sandbox"];export{o as Sandbox,G as __namedExportsOrder,q as default};
