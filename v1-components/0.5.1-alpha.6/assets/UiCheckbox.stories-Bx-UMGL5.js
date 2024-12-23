import{e as D,x as v,A as U,o as _,c as $,a as s,q as O,u as F,f as W,k as w,v as m,s as g,F as E,D as X,t as z}from"./vue.esm-bundler-BP2e016x.js";import{I as L}from"./done-B7R4DwXh.js";import{j as u}from"./jsx-runtime-DQFc-wkB.js";import{useMDXComponents as M}from"./index-BjypYOp6.js";import{T as R}from"./ToReact-D2xygIhY.js";import{_ as q}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-C_1tOEKP.js";const Z=["id","value","name","disabled","checked"],G={class:"ui-v1-checkbox__checkmark"};let H=0;const J={},p=D({...J,__name:"UiCheckbox",props:{id:{type:null,validator:e=>e===void 0||typeof e=="string"&&e.length>0&&/^[A-Za-z]/.test(e),default:void 0},name:{type:String,default:()=>"ui-checkbox-"+ ++H},model:{type:null,default:void 0},value:{type:null,default:void 0},valueOfTruthy:{type:null,default:!0},valueOfFalsy:{type:null,default:!1},indeterminate:{type:Boolean,default:!1},small:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1}},emits:["change","update:model"],setup(e,{expose:o,emit:b}){const r=Array.isArray,l=e,k=v(null),h=v(null),x=(a,d)=>Object.keys(a).filter(d).reduce((i,V)=>({...i,[V]:a[V]}),{});o({click:()=>{var a;return(a=h.value)==null?void 0:a.click()},focus:()=>{var a;return(a=h.value)==null?void 0:a.focus()},blur:()=>{var a;return(a=h.value)==null?void 0:a.blur()}});const n=b,f=(a,d)=>a.some(i=>i===d),y=U(()=>r(l.model)?f(l.model,l.value):l.model===l.valueOfTruthy),A=a=>r(l.model)?a?f(l.model,l.value)?l.model:[...l.model,l.value]:[...l.model].filter(d=>d!==l.value):a?l.valueOfTruthy:l.valueOfFalsy,I=a=>{const d=a.target,i=A(d.checked);n("change",i),n("update:model",i)};return(a,d)=>(_(),$("span",O({ref_key:"root",ref:k,class:{"ui-v1-checkbox":!0,"ui-v1-checkbox_small":e.small,"ui-v1-checkbox_checked":y.value,"ui-v1-checkbox_indeterminate":e.indeterminate,"ui-v1-checkbox_disabled":e.disabled}},x(a.$attrs,i=>!i.startsWith("aria-")&&!i.startsWith("on"))),[s("input",O({id:e.id,ref_key:"checkbox",ref:h,value:F(r)(e.model)?e.value:void 0,name:e.name,disabled:e.disabled,checked:y.value},x(a.$attrs,i=>i.startsWith("aria-")||i.startsWith("on")),{type:"checkbox",class:"ui-v1-checkbox__input",onChange:I}),null,16,Z),s("span",G,[y.value&&!e.indeterminate?(_(),W(F(L),{key:0,class:"ui-v1-checkbox__checkmark-icon"})):w("",!0)])],16))}});p.__docgenInfo={exportName:"default",displayName:"UiCheckbox",description:"",tags:{},props:[{name:"id",type:{name:"string | undefined"},defaultValue:{func:!1,value:"undefined"}},{name:"name",description:"Атрибут name нативного поля ввода",type:{name:"string"},defaultValue:{func:!0,value:"() => 'ui-checkbox-' + ++counter"}},{name:"model",description:"Значение модели используемое с директивой v-model",type:{name:"Primitive | Primitive[]"},defaultValue:{func:!1,value:"undefined"}},{name:"value",description:"Значение, добавляемое или удаляемое из модели в зависимости от флага checked, если модель является массивом",type:{name:"Primitive"},defaultValue:{func:!1,value:"undefined"}},{name:"valueOfTruthy",description:"Задает значение, если флаг checked равен true, а модель не является массивом",type:{name:"Primitive"},defaultValue:{func:!1,value:"true"}},{name:"valueOfFalsy",description:"Задает значение, если флаг checked равен false, а модель не является массивом",type:{name:"Primitive"},defaultValue:{func:!1,value:"false"}},{name:"indeterminate",description:'Задает "состояние" неопределенности для бокса, чье состояние "включенности" зависит от множества других боксов',type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"small",description:"Задает стили для бокса уменьшенного размера",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",description:"Заблокированный",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"change",description:"Переключение чекбокса"},{name:"update:model",description:"Изменение значения модели"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/host/components/checkbox/UiCheckbox.vue"]};const K=["for"],P=D({__name:"UiCheckbox.example",setup(e){const o=v(!0),b=v(!0),r=v(!0),l=v([]),k=[{label:"ВКонтакте",value:"vk"},{label:"Инстаграм",value:"instagram"}],h=U(()=>l.value.length>0),x=U(()=>h.value&&l.value.length<k.length),j=c=>{const t=k.map(f=>f.value),n=x.value;l.value=c||n?t:[]};return(c,t)=>(_(),$("div",{class:m(c.$style.container)},[s("ul",{class:m(c.$style.list)},[s("li",{class:m(c.$style.item)},[g(p,{id:"checkbox-phone",model:b.value,"onUpdate:model":t[0]||(t[0]=n=>b.value=n)},null,8,["model"]),t[4]||(t[4]=s("label",{for:"checkbox-phone"}," Телефон ",-1))],2),s("li",{class:m(c.$style.item)},[g(p,{id:"checkbox-socials",model:l.value.length>0,indeterminate:x.value,onChange:j},null,8,["model","indeterminate"]),t[5]||(t[5]=s("label",{for:"checkbox-socials"}," Социальные сети ",-1)),s("ul",{class:m(c.$style.list)},[(_(),$(E,null,X(k,(n,f)=>s("li",{key:n.value,class:m(c.$style.item)},[g(p,{id:"checkbox-socials-"+f,model:l.value,"onUpdate:model":t[1]||(t[1]=y=>l.value=y),value:n.value},null,8,["id","model","value"]),s("label",{for:"checkbox-socials-"+f},z(n.label),9,K)],2)),64))],2)],2),s("li",{class:m(c.$style.item)},[g(p,{id:"checkbox-mail",model:o.value,"onUpdate:model":t[2]||(t[2]=n=>o.value=n),disabled:""},null,8,["model"]),t[6]||(t[6]=s("label",{for:"checkbox-mail"}," Почта ",-1))],2),s("li",{class:m(c.$style.item)},[g(p,{id:"checkbox-pigeons",model:r.value,"onUpdate:model":t[3]||(t[3]=n=>r.value=n),disabled:""},null,8,["model"]),t[7]||(t[7]=s("label",{for:"checkbox-pigeons"}," Голуби ",-1))],2)],2)],2))}}),Q="_container_1v5cg_1",Y="_list_1v5cg_6",ee="_item_1v5cg_14",le={container:Q,list:Y,item:ee},ae={$style:le},te=q(P,[["__cssModules",ae]]);P.__docgenInfo={exportName:"default",displayName:"UiCheckbox.example",description:"",tags:{},sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiCheckbox.example.vue"]};function B(e){const o={h1:"h1",h2:"h2",h3:"h3",p:"p",...M(),...e.components};return u.jsxs(u.Fragment,{children:[u.jsx(o.h1,{id:"uicheckbox",children:"UiCheckbox"}),`
`,u.jsx(o.h2,{id:"множественный-выбор-из-представленных-вариантов",children:"Множественный выбор из представленных вариантов"}),`
`,u.jsx(o.h3,{id:"описание",children:"Описание"}),`
`,u.jsx(o.p,{children:"Используется для выбора или выделения нескольких опций из представленных вариантов"}),`
`,u.jsx(o.h3,{id:"отображение",children:"Отображение"}),`
`,u.jsx(R,{is:te})]})}function oe(e={}){const{wrapper:o}={...M(),...e.components};return o?u.jsx(o,{...e,children:u.jsx(B,{...e})}):B(e)}const pe={title:"Components/UiCheckbox",component:p,argTypes:{id:{control:!1}},render:e=>({components:{UiCheckbox:p},setup(){return{props:U(()=>{const{model:b,...r}=e;return{...r}}),model:v(e.model)}},template:`
      <UiCheckbox v-model:model="model" v-bind="props" aria-label="checkbox" />
    `}),parameters:{docs:{page:oe},layout:"centered"}},C={};var N,S,T;C.parameters={...C.parameters,docs:{...(N=C.parameters)==null?void 0:N.docs,source:{originalSource:"{}",...(T=(S=C.parameters)==null?void 0:S.docs)==null?void 0:T.source}}};const fe=["Sandbox"];export{C as Sandbox,fe as __namedExportsOrder,pe as default};