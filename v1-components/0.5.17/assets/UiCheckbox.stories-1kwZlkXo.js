import{d as M,r as b,e as C,o as U,c as j,a as n,m as O,u as y,f as A,j as D,s as r,q as k,F as I,A as W,t as E}from"./vue.esm-bundler-CQrfiSSv.js";import{I as X}from"./done-BpFwxr41.js";import{p as F,w as z}from"./utils-CFz3IpAA.js";import{j as u}from"./jsx-runtime-DQFc-wkB.js";import{useMDXComponents as P}from"./index-BjypYOp6.js";import{T as L}from"./ToReact-CLtYD5oI.js";import{_ as R}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-C_1tOEKP.js";import"./preview-BpQv_JBL.js";const q=["id","value","name","disabled","checked"],Z={class:"ui-v1-checkbox__checkmark"};let G=0;const H={},d=M({...H,__name:"UiCheckbox",props:{id:{type:null,validator:e=>e===void 0||typeof e=="string"&&e.length>0&&/^[A-Za-z]/.test(e),default:void 0},name:{type:String,default:()=>"ui-v1-checkbox-"+ ++G},model:{type:null,default:void 0},value:{type:null,default:void 0},valueOfTruthy:{type:null,default:!0},valueOfFalsy:{type:null,default:!1},indeterminate:{type:Boolean,default:!1},small:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1}},emits:["change","update:model"],setup(e,{expose:s,emit:x}){const m=Array.isArray,l=e,p=x,f=b(null);s({click:()=>{var t;return(t=f.value)==null?void 0:t.click()},focus:()=>{var t;return(t=f.value)==null?void 0:t.focus()},blur:()=>{var t;return(t=f.value)==null?void 0:t.blur()}});const a=(t,h)=>t.some(c=>c===h),o=C(()=>m(l.model)?a(l.model,l.value):l.model===l.valueOfTruthy),v=t=>m(l.model)?t?a(l.model,l.value)?l.model:[...l.model,l.value]:[...l.model].filter(h=>h!==l.value):t?l.valueOfTruthy:l.valueOfFalsy,$=t=>{const h=t.target,c=v(h.checked);p("change",c),p("update:model",c)};return(t,h)=>(U(),j("span",O({class:{"ui-v1-checkbox":!0,"ui-v1-checkbox_small":e.small,"ui-v1-checkbox_checked":o.value,"ui-v1-checkbox_indeterminate":e.indeterminate,"ui-v1-checkbox_disabled":e.disabled}},y(F)(t.$attrs,c=>!c.startsWith("aria-")&&!c.startsWith("on"))),[n("input",O({id:e.id,ref_key:"checkbox",ref:f,value:y(m)(e.model)?e.value:void 0,name:e.name,disabled:e.disabled,checked:o.value},y(F)(t.$attrs,c=>c.startsWith("aria-")||c.startsWith("on")),{type:"checkbox",class:"ui-v1-checkbox__input",onChange:$}),null,16,q),n("span",Z,[o.value&&!e.indeterminate?(U(),A(y(X),{key:0,class:"ui-v1-checkbox__checkmark-icon"})):D("",!0)])],16))}});d.__docgenInfo={exportName:"default",displayName:"UiCheckbox",description:"",tags:{},props:[{name:"id",type:{name:"string | undefined"},defaultValue:{func:!1,value:"undefined"}},{name:"name",description:"Атрибут name нативного поля ввода",type:{name:"string"},defaultValue:{func:!0,value:"() => 'ui-v1-checkbox-' + ++counter"}},{name:"model",description:"Значение модели используемое с директивой v-model",type:{name:"Primitive | Primitive[]"},defaultValue:{func:!1,value:"undefined"}},{name:"value",description:"Значение, добавляемое или удаляемое из модели в зависимости от флага checked, если модель является массивом",type:{name:"Primitive"},defaultValue:{func:!1,value:"undefined"}},{name:"valueOfTruthy",description:"Задает значение, если флаг checked равен true, а модель не является массивом",type:{name:"Primitive"},defaultValue:{func:!1,value:"true"}},{name:"valueOfFalsy",description:"Задает значение, если флаг checked равен false, а модель не является массивом",type:{name:"Primitive"},defaultValue:{func:!1,value:"false"}},{name:"indeterminate",description:'Задает "состояние" неопределенности для бокса, чье состояние "включенности" зависит от множества других боксов',type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"small",description:"Задает стили для бокса уменьшенного размера",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",description:"Заблокированный",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"change",description:"Изменение значения модели"},{name:"update:model",description:"Изменение значения модели. Для v-model"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/host/components/checkbox/UiCheckbox.vue"]};const J=["for"],w=M({__name:"UiCheckbox.example",setup(e){const s=b(!0),x=b(!0),m=b(!0),l=b([]),p=[{label:"ВКонтакте",value:"vk"},{label:"Инстаграм",value:"instagram"}],f=C(()=>l.value.length>0),_=C(()=>f.value&&l.value.length<p.length),V=i=>{const a=p.map(v=>v.value),o=_.value;l.value=i||o?a:[]};return(i,a)=>(U(),j("div",{class:r(i.$style.container)},[n("ul",{class:r(i.$style.list)},[n("li",{class:r(i.$style.item)},[k(d,{id:"checkbox-phone",model:x.value,"onUpdate:model":a[0]||(a[0]=o=>x.value=o)},null,8,["model"]),a[4]||(a[4]=n("label",{for:"checkbox-phone"}," Телефон ",-1))],2),n("li",{class:r(i.$style.item)},[k(d,{id:"checkbox-socials",model:l.value.length>0,indeterminate:_.value,onChange:V},null,8,["model","indeterminate"]),a[5]||(a[5]=n("label",{for:"checkbox-socials"}," Социальные сети ",-1)),n("ul",{class:r(i.$style.list)},[(U(),j(I,null,W(p,(o,v)=>n("li",{key:o.value,class:r(i.$style.item)},[k(d,{id:"checkbox-socials-"+v,model:l.value,"onUpdate:model":a[1]||(a[1]=$=>l.value=$),value:o.value},null,8,["id","model","value"]),n("label",{for:"checkbox-socials-"+v},E(o.label),9,J)],2)),64))],2)],2),n("li",{class:r(i.$style.item)},[k(d,{id:"checkbox-mail",model:s.value,"onUpdate:model":a[2]||(a[2]=o=>s.value=o),disabled:""},null,8,["model"]),a[6]||(a[6]=n("label",{for:"checkbox-mail"}," Почта ",-1))],2),n("li",{class:r(i.$style.item)},[k(d,{id:"checkbox-pigeons",model:m.value,"onUpdate:model":a[3]||(a[3]=o=>m.value=o),disabled:""},null,8,["model"]),a[7]||(a[7]=n("label",{for:"checkbox-pigeons"}," Голуби ",-1))],2)],2)],2))}}),K="_container_1v5cg_1",Q="_list_1v5cg_6",Y="_item_1v5cg_14",ee={container:K,list:Q,item:Y},le={$style:ee},ae=R(w,[["__cssModules",le]]);w.__docgenInfo={exportName:"default",displayName:"UiCheckbox.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiCheckbox.example.vue"]};function B(e){const s={h1:"h1",h2:"h2",h3:"h3",p:"p",...P(),...e.components};return u.jsxs(u.Fragment,{children:[u.jsx(s.h1,{id:"uicheckbox",children:"UiCheckbox"}),`
`,u.jsx(s.h2,{id:"множественный-выбор-из-представленных-вариантов",children:"Множественный выбор из представленных вариантов"}),`
`,u.jsx(s.h3,{id:"описание",children:"Описание"}),`
`,u.jsx(s.p,{children:"Используется для выбора или выделения нескольких опций из представленных вариантов"}),`
`,u.jsx(s.h3,{id:"отображение",children:"Отображение"}),`
`,u.jsx(L,{is:ae})]})}function te(e={}){const{wrapper:s}={...P(),...e.components};return s?u.jsx(s,{...e,children:u.jsx(B,{...e})}):B(e)}const fe={title:"Components/UiCheckbox",component:d,argTypes:{id:{control:!1}},render:e=>({components:{UiCheckbox:d},setup(){return{model:b(e.model),props:C(()=>z(e,["id","model"]))}},template:`
      <UiCheckbox
          id="checkbox"
          v-model:model="model"
          v-bind="props"
          style="margin-right: 8px"
      />

      <label for="checkbox">
          Checkbox
      </label>
    `}),parameters:{docs:{page:te},layout:"centered"}},g={};var N,S,T;g.parameters={...g.parameters,docs:{...(N=g.parameters)==null?void 0:N.docs,source:{originalSource:"{}",...(T=(S=g.parameters)==null?void 0:S.docs)==null?void 0:T.source}}};const ve=["Sandbox"];export{g as Sandbox,ve as __namedExportsOrder,fe as default};
