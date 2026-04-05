import{o as u,c as b,a as A,h as oe,y as ne,z as O,Z as xe,n as be,q as we,L as _e,M as ke,B as Ce,i as ze,r as g,$ as te,j as h,w as Le,U as Ee,H as B,m as x,E as T}from"./iframe-DCDVANl5.js";import{I as Me}from"./add-Dl_yQroG.js";import{_ as R}from"./UiButton-ChRPCksm.js";import{_ as Oe}from"./UiTransition-DbhvyPuS.js";import{I as Ae}from"./plugin-DGcvpriV.js";const Ne={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"};function Pe(t,r){return u(),b("svg",Ne,[...r[0]||(r[0]=[A("path",{fill:"currentColor",d:"M5.5 13.25c-.276 0-.5-.28-.5-.625v-1.25c0-.345.224-.625.5-.625h13c.276 0 .5.28.5.625v1.25c0 .345-.224.625-.5.625z"},null,-1)])])}const $e={render:Pe},re=oe({__name:"UiLoader",props:{diameter:{type:[Number,String],default:40},thickness:{type:[Number,String],default:2},transition:{type:null,validator:t=>typeof t=="string"||t===null,default:"fade-2"},fixed:{type:Boolean,default:!1},overlay:{type:Boolean,default:!0}},setup(t){return(r,f)=>(u(),ne(Ce(t.transition?Oe:"div"),_e(ke(t.transition?{appear:!0,class:"ui-v1-loader-wrapper",name:t.transition}:{})),{default:O(()=>[A("div",{class:be({"ui-v1-loader":!0,"ui-v1-loader_fixed":t.fixed,"ui-v1-loader_overlay":t.overlay}),style:xe({"--diameter":`${t.diameter}px`,"--thickness":`${t.thickness}px`})},[we(r.$slots,"default",{},()=>[f[0]||(f[0]=A("div",{class:"ui-v1-loader__icon"},null,-1))])],6)]),_:3},16))}});re.__docgenInfo={exportName:"default",displayName:"UiLoader",description:"",tags:{},props:[{name:"diameter",description:"Диаметр (размер) окружности индикатора",type:{name:"number|string"},defaultValue:{func:!1,value:"40"}},{name:"thickness",description:"Толщина окружности индикатора",type:{name:"number|string"},defaultValue:{func:!1,value:"2"}},{name:"transition",description:"Тип анимации перехода",type:{name:"string | null"},defaultValue:{func:!1,value:"'fade-2'"}},{name:"fixed",description:"Фиксированное позиционирование индикатора",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"overlay",description:"Показ полупрозрачной подложки",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}}],slots:[{name:"default",description:"Слот для иконки индикатора"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/host/components/loader/UiLoader.vue"]};const Ie={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"};function Fe(t,r){return u(),b("svg",Ie,[...r[0]||(r[0]=[A("path",{fill:"currentColor",d:"M18.968 19.942c.07.188.023.4-.12.54l-.378.38a.487.487 0 0 1-.677 0 8.374 8.374 0 0 0-11.539 0 .487.487 0 0 1-.678 0l-.378-.38a.51.51 0 0 1-.18-.54L11.376 3.32a.51.51 0 0 1 .468-.32h.299a.51.51 0 0 1 .468.32z"},null,-1)])])}const Se={render:Fe},Ue={LOCATOR:"locator"},je=(t,r)=>new Promise((f,d)=>{const s=t.createElement("script");s.async=!0,s.src=r,s.onload=n=>f(n),s.onerror=(n,p,c,w,i)=>{console.error(`Failed to load script from ${r}`,{event:n,source:p,lineno:c,colno:w,error:i}),d(i)},(t.head||t.getElementsByTagName("head")[0]).appendChild(s)}),Be={class:"ui-v1-yandex-map"},Te={key:1,class:"ui-v1-yandex-map__control-group ui-v1-yandex-map__control-group_left"},Re={key:2,class:"ui-v1-yandex-map__control-group ui-v1-yandex-map__control-group_right"},Ge=`
  html, body, #map {
    width: 100%;
    height: 100%;
    margin: 0;
  }

  .ui-v1-yandex-map-marker {
    position: relative;
    transform: translate(-10px, -76px);
    width: 0;
    height: 0;
    cursor: grab;
    user-select: none;
  }

  .ui-v1-yandex-map-marker:active {
    cursor: grabbing;
  }

  .ui-v1-yandex-map-marker__pin {
    position: absolute;
    left: 0;
    top: 0;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: #ff5547;
    box-shadow: 0 12px 24px rgba(255, 85, 71, 0.28);
  }

  .ui-v1-yandex-map-marker__pin::before {
    content: '';
    position: absolute;
    left: 16px;
    bottom: -13px;
    width: 12px;
    height: 16px;
    background: #ff5547;
    clip-path: polygon(50% 100%, 0 0, 100% 0);
  }

  .ui-v1-yandex-map-marker__pin::after {
    content: '';
    position: absolute;
    left: 14px;
    bottom: -26px;
    width: 16px;
    height: 16px;
    border: 2px solid #ffffff;
    border-radius: 50%;
    background: #ff5547;
    box-sizing: border-box;
  }

  .ui-v1-yandex-map-marker__hint {
    position: absolute;
    left: 56px;
    top: 4px;
    min-width: 152px;
    padding: 7px 12px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.96);
    box-shadow: 0 8px 24px rgba(36, 48, 77, 0.16);
    color: #24304d;
    font: 400 14px/20px Arial, sans-serif;
    white-space: nowrap;
  }
`,Ye=oe({__name:"UiYandexMap",props:{apiKey:{type:String,required:!0},address:{type:String,default:""},plugins:{type:Array,default:()=>[]}},emits:["change","update:address"],setup(t,{emit:r}){const f=[Object.prototype,null],d=t,s=r,G=ze(Ae,null),n={center:[37.64,55.76],zoom:10},p=g(null),c=te(null),w=te(null),i=g({center:[...n.center],zoom:n.zoom}),L=g(0),N=g(!1),se=()=>p.value?.contentDocument??null,ie=()=>p.value?.contentWindow??null,Y=()=>{const e=ie();return e&&"ymaps3"in e?e.ymaps3:null},D=(e=5)=>{if(p.value?.contentDocument)return Promise.resolve();if(e<=1)throw new Error("iframe contentDocument wasn't loaded");return new Promise(a=>setTimeout(async()=>{await D(e-1),a(0)},100))},v=g(!1),P=h(()=>({"en-GB":"en_US","es-ES":"en_US","ru-RU":"ru_RU"})[G?.locale??"en-GB"]),V=h(()=>`https://api-maps.yandex.ru/v3/?apikey=${d.apiKey}&lang=${P.value}`),H=g(0),K=e=>`https://geocode-maps.yandex.ru/1.x/?apikey=${d.apiKey}&geocode=${e}&lang=${P.value}&format=json`,le=()=>(L.value++,L.value),_=e=>L.value===e,q=()=>{c.value?.destroy(),c.value=null,w.value=null,i.value={center:[...n.center],zoom:n.zoom}},W=()=>{L.value++,q()},E=e=>{const a={center:e.center?[...e.center]:i.value.center,zoom:typeof e.zoom=="number"?e.zoom:i.value.zoom};i.value=a,c.value?.setLocation({...a,duration:200,easing:"ease-in-out"})},ce=()=>{E({zoom:i.value.zoom+1})},ue=()=>{E({zoom:i.value.zoom-1})},J=e=>({longitude:`Longitude: ${e[0].toFixed(2)}`,latitude:`Latitude: ${e[1].toFixed(2)}`}),$=e=>{const a=J(e);w.value?.update({coordinates:e,title:`${a.longitude}
${a.latitude}`})},de=()=>new Promise((e,a)=>{if(!("geolocation"in navigator)){a(new Error("Geolocation is unavailable"));return}navigator.geolocation.getCurrentPosition(({coords:o})=>e([o.longitude,o.latitude]),a,{enableHighAccuracy:!0,timeout:1e4})}),pe=e=>Object.prototype.toString.call(e)!=="[object Object]"?!1:f.includes(Object.getPrototypeOf(e)),I=h(()=>d.plugins.find(e=>pe(e)&&e.type===Ue.LOCATOR&&typeof e.url=="string"&&e.url.length>0)??null),F=h(()=>"geolocation"in navigator&&isSecureContext),X=h(()=>I.value!==null),me=h(()=>F.value||X.value),Z=async(e,a=null)=>{if(!I.value)throw new Error("Locator plugin is not configured");const o=await fetch(I.value.url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({locale:P.value,reason:e,secureContext:isSecureContext,browserGeolocationAvailable:"geolocation"in navigator,error:a instanceof Error?a.message:null})});if(!o.ok)throw new Error(`Locator adapter request failed with status ${o.status}`);const l=await o.json();if(!Array.isArray(l.coordinates)||l.coordinates.length!==2)throw new Error("Locator adapter returned invalid coordinates payload");return[Number(l.coordinates[0]),Number(l.coordinates[1])]},fe=async()=>{N.value=!0;try{const e=F.value?await de():await Z("browser_geolocation_unavailable");$(e),E({center:e,zoom:Math.max(i.value.zoom,15)});const a=await S(e);s("change",a),s("update:address",a)}catch(e){if(X.value&&F.value)try{const a=await Z("browser_geolocation_failed",e);$(a),E({center:a,zoom:Math.max(i.value.zoom,15)});const o=await S(a);s("change",o),s("update:address",o);return}catch(a){console.error("Failed to get current location via locator fallback",a)}console.error("Failed to get current location",e)}finally{N.value=!1}};function ve(e){S(e).then(a=>{s("change",a),s("update:address",a)})}const S=async e=>(await(await fetch(K(e.toString()))).json()).response.GeoObjectCollection.featureMember[0]?.GeoObject?.metaDataProperty?.GeocoderMetaData?.Address?.formatted??"",ye=async e=>(await(await fetch(K(e))).json()).response.GeoObjectCollection.featureMember[0]?.GeoObject?.Point.pos??"",ge=(e,a,o,l,U)=>{const{YMapMarker:j}=e,k=a.createElement("div");k.className="ui-v1-yandex-map-marker";const y=a.createElement("div");y.className="ui-v1-yandex-map-marker__pin";const C=a.createElement("div");C.className="ui-v1-yandex-map-marker__hint";const z=a.createElement("div"),m=a.createElement("div");C.append(z,m),k.append(y,C);const M=new j({coordinates:o,draggable:!0,mapFollowsOnDrag:!0,zIndex:2500,onDragMove:l,onDragEnd:U},k),Q=({coordinates:ee})=>{const ae=J(ee);z.textContent=ae.longitude,m.textContent=ae.latitude,M.update({coordinates:ee})};return Q({coordinates:o}),{entity:M,update:Q}},he=async()=>{v.value=!1;const e=le();if(q(),await D(),!_(e))return;const a=se();if(a){const o=a.createElement("style");if(o.innerHTML=Ge,a.head.appendChild(o),await je(a,V.value),!_(e)||(await Y()?.ready,!_(e)))return;const l=Y(),{YMap:U,YMapDefaultFeaturesLayer:j,YMapDefaultSchemeLayer:k}=l;if(d.address){const m=await ye(d.address);if(!_(e))return;m&&(n.center=m.split(" ").map(M=>Number(M)))}const y=a.createElement("div");y.setAttribute("id","map"),a.body.appendChild(y);const C=m=>{$(m)},z=ge(l,a,n.center,C,ve);if(w.value=z,i.value={center:[...n.center],zoom:n.zoom},c.value=new U(y,{location:n},[new k({}),new j({id:"features"}),z.entity]),!_(e)){c.value?.destroy(),c.value=null;return}v.value=!0}};return Le(V,async(e,a)=>{p.value&&e!==a&&(W(),v.value=!1,H.value++)}),Ee(()=>{W()}),(e,a)=>(u(),b("div",Be,[v.value?B("",!0):(u(),ne(re,{key:0,transition:null})),(u(),b("iframe",{ref_key:"iframe",ref:p,key:H.value,allow:"geolocation",onLoad:he},null,32)),v.value?(u(),b("div",Te,[x(R,{class:"ui-v1-yandex-map__control-button",appearance:"secondary",size:"sm",type:"button","aria-label":"Определить текущее местоположение",disabled:N.value||!me.value,onClick:fe},{default:O(()=>[x(T(Se))]),_:1},8,["disabled"])])):B("",!0),v.value?(u(),b("div",Re,[x(R,{class:"ui-v1-yandex-map__control-button",appearance:"secondary",size:"sm",type:"button","aria-label":"Уменьшить масштаб",onClick:ue},{default:O(()=>[x(T($e))]),_:1}),x(R,{class:"ui-v1-yandex-map__control-button",appearance:"secondary",size:"sm",type:"button","aria-label":"Увеличить масштаб",onClick:ce},{default:O(()=>[x(T(Me))]),_:1})])):B("",!0)]))}});Ye.__docgenInfo={exportName:"default",displayName:"UiYandexMap",description:"",tags:{},props:[{name:"apiKey",type:{name:"string"},required:!0},{name:"address",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"plugins",type:{name:"Array as () => YandexMapPlugin[]"},defaultValue:{func:!0,value:"() => []"}}],events:[{name:"change"},{name:"update:address"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/host/components/yandex-map/UiYandexMap.vue"]};export{$e as I,Ye as _,re as a};
