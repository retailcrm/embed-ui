import{e as A,o as C,f as B,g as ee,a as Y,j as ae,v as te,O as ne,n as oe,m as se,y as re,z as ie,x as k,A as E,w as de,c as N,k as le,L as ce,M as ue}from"./vue.esm-bundler-BP2e016x.js";import{_ as pe}from"./UiTransition-BYap84FT.js";import{I as me}from"./plugin-Ch80D8Ue.js";import{j as l}from"./jsx-runtime-DQFc-wkB.js";import{useMDXComponents as O}from"./index-BjypYOp6.js";import"./_commonjsHelpers-Cpj98o6Y.js";const P=A({__name:"UiLoader",props:{diameter:{type:[Number,String],default:40},thickness:{type:[Number,String],default:2},transition:{type:null,validator:a=>typeof a=="string"||a===null,default:"fade-2"},fixed:{type:Boolean,default:!1},overlay:{type:Boolean,default:!0}},setup(a){return(t,o)=>(C(),B(re(a.transition?pe:"div"),oe(se(a.transition?{appear:!0,class:"ui-v1-loader-wrapper",name:a.transition}:{})),{default:ee(()=>[Y("div",{class:te({"ui-v1-loader":!0,"ui-v1-loader_fixed":a.fixed,"ui-v1-loader_overlay":a.overlay}),style:ne({"--diameter":`${a.diameter}px`,"--thickness":`${a.thickness}px`})},[ae(t.$slots,"default",{},()=>[o[0]||(o[0]=Y("div",{class:"ui-v1-loader__icon"},null,-1))])],6)]),_:3},16))}});P.__docgenInfo={exportName:"default",displayName:"UiLoader",description:"",tags:{},props:[{name:"diameter",description:"Диаметр (размер) окружности индикатора",type:{name:"number|string"},defaultValue:{func:!1,value:"40"}},{name:"thickness",description:"Толщина окружности индикатора",type:{name:"number|string"},defaultValue:{func:!1,value:"2"}},{name:"transition",description:"Тип анимации перехода",type:{name:"string | null"},defaultValue:{func:!1,value:"'fade-2'"}},{name:"fixed",description:"Фиксированное позиционирование индикатора",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"overlay",description:"Показ полупрозрачной подложки",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}}],slots:[{name:"default",description:"Слот для иконки индикатора"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/host/components/loader/UiLoader.vue"]};const fe=(a,t)=>new Promise((o,g)=>{const s=a.createElement("script");s.async=!0,s.src=t,s.onload=m=>o(m),s.onerror=(m,_,v,d,f)=>{console.error(`Failed to load script from ${t}`,{event:m,source:_,lineno:v,colno:d,error:f}),g(f)},(a.head||a.getElementsByTagName("head")[0]).appendChild(s)}),ye={class:"ui-v1-yandex-map"},j=A({__name:"UiYandexMap",props:{apiKey:{type:String,required:!0},address:{type:String,default:""}},emits:["change","update:address"],setup(a,{emit:t}){const o=a,g=t,s=ie(me,null),c=k(null),m=()=>{var e;return((e=c.value)==null?void 0:e.contentDocument)??null},_=()=>{var e;return((e=c.value)==null?void 0:e.contentWindow)??null},v=()=>{const e=_();return e&&"ymaps3"in e?e.ymaps3:null},d={center:[37.64,55.76],zoom:10},f=(e=5)=>{var n;if((n=c.value)!=null&&n.contentDocument)return Promise.resolve();if(e<=1)throw new Error("iframe contentDocument wasn't loaded");return new Promise(u=>setTimeout(async()=>{await f(e--),u(0)},100))},x=k(!1),U=E(()=>({"en-GB":"en_US","es-ES":"en_US","ru-RU":"ru_RU"})[(s==null?void 0:s.locale)??"en-GB"]),$=E(()=>`https://api-maps.yandex.ru/v3/?apikey=${o.apiKey}&lang=${U.value}`),L=k(0),F=e=>`https://geocode-maps.yandex.ru/1.x/?apikey=${o.apiKey}&geocode=${e}&lang=${U.value}&format=json`;function z(e){T(e).then(n=>{g("change",n),g("update:address",n)})}const T=async e=>{var r,i,w,y,b;return((b=(y=(w=(i=(r=(await(await fetch(F(e.toString()))).json()).response.GeoObjectCollection.featureMember[0])==null?void 0:r.GeoObject)==null?void 0:i.metaDataProperty)==null?void 0:w.GeocoderMetaData)==null?void 0:y.Address)==null?void 0:b.formatted)??""},R=async e=>{var r,i;return((i=(r=(await(await fetch(F(e))).json()).response.GeoObjectCollection.featureMember[0])==null?void 0:r.GeoObject)==null?void 0:i.Point.pos)??""},H=async()=>{var n;await f();const e=m();if(e){const u=e.createElement("style");u.innerHTML="body { margin: 0; }",e.head.appendChild(u),await fe(e,$.value),await((n=v())==null?void 0:n.ready);const r=e.createElement("div");r.setAttribute("id","map"),e.body.appendChild(r),x.value=!0;const i=v(),{YMap:w,YMapControls:y,YMapDefaultFeaturesLayer:b,YMapDefaultSchemeLayer:W}=i,{YMapZoomControl:X,YMapGeolocationControl:q}=await i.import("@yandex/ymaps3-controls@0.0.1"),{YMapDefaultMarker:Z}=await i.import("@yandex/ymaps3-markers@0.0.1");if(o.address){const p=await R(o.address);p&&(d.center=p.split(" ").map(D=>Number(D)))}const h=new w(r,{location:d});h.addChild(new W({})),h.addChild(new y({position:"right"}).addChild(new X({}))),h.addChild(new b({id:"features"})),h.addChild(new y({position:"left"}).addChild(new q({})));const J=p=>{const D=`Longitude: ${p[0].toFixed(2)}`,Q=`Latitude: ${p[1].toFixed(2)}`;S.update({coordinates:p,title:`${D} <br> ${Q}`})},S=new Z({coordinates:d.center,draggable:!0,title:`Longitude: ${d.center[0].toFixed(2)} <br>
              Latitude ${d.center[1].toFixed(2)}`,onDragMove:J,onDragEnd:z});h.addChild(S)}};return de($,async(e,n)=>{c.value&&e!==n&&(x.value=!1,L.value++)}),(e,n)=>(C(),N("div",ye,[x.value?le("",!0):(C(),B(P,{key:0})),ce((C(),N("iframe",{ref_key:"iframe",ref:c,key:L.value,onLoad:H},null,32)),[[ue,x.value]])]))}});j.__docgenInfo={exportName:"default",displayName:"UiYandexMap",description:"",tags:{},props:[{name:"apiKey",type:{name:"string"},required:!0},{name:"address",type:{name:"string"},defaultValue:{func:!1,value:"''"}}],events:[{name:"change"},{name:"update:address"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/host/components/yandex-map/UiYandexMap.vue"]};function I(a){const t={a:"a",h1:"h1",p:"p",...O(),...a.components};return l.jsxs(l.Fragment,{children:[l.jsx(t.h1,{id:"uiyandexmap",children:"UiYandexMap"}),`
`,l.jsxs(t.p,{children:[`Экспериментальный компонент. На данный момент используется только в составе примеров
в репозитории `,l.jsx(t.a,{href:"https://github.com/retailcrm/core-ui-extensions-examples",rel:"nofollow",children:"@retailcrm/core-ui-extensions-examples"})]})]})}function he(a={}){const{wrapper:t}={...O(),...a.components};return t?l.jsx(t,{...a,children:l.jsx(I,{...a})}):I(a)}const Ce={title:"Experimental/UiYandexMap",component:j,args:{apiKey:"dd51f938-0693-457d-ae62-6d50fa668d0a",address:""},argTypes:{apiKey:{control:!1},address:{control:!1}},render:a=>({components:{UiYandexMap:j},setup(){const{apiKey:t,address:o}=a;return{apiKey:t,address:k(o)}},template:`
        <div class="mb-4" style="width: 640px; max-width: 100%;">
            <UiYandexMap
                v-model:address="address"
                :api-key="apiKey"
            />
        </div>

        <p>Выбранный адрес:</p>

        {{ address }}
    `}),parameters:{docs:{page:he},layout:"centered"}},M={};var G,K,V;M.parameters={...M.parameters,docs:{...(G=M.parameters)==null?void 0:G.docs,source:{originalSource:"{}",...(V=(K=M.parameters)==null?void 0:K.docs)==null?void 0:V.source}}};const ke=["Sandbox"];export{M as Sandbox,ke as __namedExportsOrder,Ce as default};
