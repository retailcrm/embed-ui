import{o as u,c as x,a as A,h as re,y as se,z as O,Z as xe,n as _e,m as we,L as ke,M as Ce,B as ze,w as Le,Q as Ee,H as T,k as g,r as h,q as b,$ as oe,i as Me,E as R}from"./iframe-DnG3g5pW.js";import{I as Oe}from"./add-7oY7PnN7.js";import{_ as G}from"./UiButton-BCon8_Cd.js";import{_ as Ne}from"./UiTransition-BqKpixzE.js";import{I as Ae}from"./plugin-DbbfKnFn.js";const Pe={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"};function $e(t,r){return u(),x("svg",Pe,[...r[0]||(r[0]=[A("path",{fill:"currentColor",d:"M5.5 13.25c-.276 0-.5-.28-.5-.625v-1.25c0-.345.224-.625.5-.625h13c.276 0 .5.28.5.625v1.25c0 .345-.224.625-.5.625z"},null,-1)])])}const Ie={render:$e},N=re({__name:"UiLoader",props:{diameter:{type:[Number,String],default:40},thickness:{type:[Number,String],default:2},transition:{type:null,validator:t=>typeof t=="string"||t===null,default:"fade-2"},fixed:{type:Boolean,default:!1},overlay:{type:Boolean,default:!0}},setup(t){return(r,f)=>(u(),se(ze(t.transition?Ne:"div"),ke(Ce(t.transition?{appear:!0,class:"ui-v1-loader-wrapper",name:t.transition}:{})),{default:O(()=>[A("div",{class:_e({"ui-v1-loader":!0,"ui-v1-loader_fixed":t.fixed,"ui-v1-loader_overlay":t.overlay}),style:xe({"--diameter":`${t.diameter}px`,"--thickness":`${t.thickness}px`})},[we(r.$slots,"default",{},()=>[f[0]||(f[0]=A("div",{class:"ui-v1-loader__icon"},null,-1))])],6)]),_:3},16))}});N.__docgenInfo=Object.assign({displayName:N.name??N.__name},{exportName:"default",displayName:"UiLoader",description:"",tags:{},props:[{name:"diameter",description:"Диаметр (размер) окружности индикатора",type:{name:"number|string"},defaultValue:{func:!1,value:"40"}},{name:"thickness",description:"Толщина окружности индикатора",type:{name:"number|string"},defaultValue:{func:!1,value:"2"}},{name:"transition",description:"Тип анимации перехода",type:{name:"string | null"},defaultValue:{func:!1,value:"'fade-2'"}},{name:"fixed",description:"Фиксированное позиционирование индикатора",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"overlay",description:"Показ полупрозрачной подложки",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}}],slots:[{name:"default",description:"Слот для иконки индикатора"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/host/components/loader/UiLoader.vue"]});const je={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"};function Fe(t,r){return u(),x("svg",je,[...r[0]||(r[0]=[A("path",{fill:"currentColor",d:"M18.968 19.942c.07.188.023.4-.12.54l-.378.38a.487.487 0 0 1-.677 0 8.374 8.374 0 0 0-11.539 0 .487.487 0 0 1-.678 0l-.378-.38a.51.51 0 0 1-.18-.54L11.376 3.32a.51.51 0 0 1 .468-.32h.299a.51.51 0 0 1 .468.32z"},null,-1)])])}const Se={render:Fe},Ue={LOCATOR:"locator"},Be=(t,r)=>new Promise((f,d)=>{const s=t.createElement("script");s.async=!0,s.src=r,s.onload=o=>f(o),s.onerror=(o,p,c,_,i)=>{console.error(`Failed to load script from ${r}`,{event:o,source:p,lineno:c,colno:_,error:i}),d(i)},(t.head||t.getElementsByTagName("head")[0]).appendChild(s)}),Te={class:"ui-v1-yandex-map"},Re={key:1,class:"ui-v1-yandex-map__control-group ui-v1-yandex-map__control-group_left"},Ge={key:2,class:"ui-v1-yandex-map__control-group ui-v1-yandex-map__control-group_right"},Ye=`
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
`,Y=re({__name:"UiYandexMap",props:{apiKey:{type:String,required:!0},address:{type:String,default:""},plugins:{type:Array,default:()=>[]}},emits:["change","update:address"],setup(t,{emit:r}){const f=[Object.prototype,null],d=t,s=r,D=Me(Ae,null),o={center:[37.64,55.76],zoom:10},p=h(null),c=oe(null),_=oe(null),i=h({center:[...o.center],zoom:o.zoom}),L=h(0),P=h(!1),ie=()=>p.value?.contentDocument??null,le=()=>p.value?.contentWindow??null,V=()=>{const e=le();return e&&"ymaps3"in e?e.ymaps3:null},H=(e=5)=>{if(p.value?.contentDocument)return Promise.resolve();if(e<=1)throw new Error("iframe contentDocument wasn't loaded");return new Promise(a=>setTimeout(async()=>{await H(e-1),a(0)},100))},v=h(!1),$=b(()=>({"en-GB":"en_US","es-ES":"en_US","ru-RU":"ru_RU"})[D?.locale??"en-GB"]),K=b(()=>`https://api-maps.yandex.ru/v3/?apikey=${d.apiKey}&lang=${$.value}`),q=h(0),W=e=>`https://geocode-maps.yandex.ru/1.x/?apikey=${d.apiKey}&geocode=${e}&lang=${$.value}&format=json`,ce=()=>(L.value++,L.value),w=e=>L.value===e,J=()=>{c.value?.destroy(),c.value=null,_.value=null,i.value={center:[...o.center],zoom:o.zoom}},Q=()=>{L.value++,J()},E=e=>{const a={center:e.center?[...e.center]:i.value.center,zoom:typeof e.zoom=="number"?e.zoom:i.value.zoom};i.value=a,c.value?.setLocation({...a,duration:200,easing:"ease-in-out"})},ue=()=>{E({zoom:i.value.zoom+1})},de=()=>{E({zoom:i.value.zoom-1})},X=e=>({longitude:`Longitude: ${e[0].toFixed(2)}`,latitude:`Latitude: ${e[1].toFixed(2)}`}),I=e=>{const a=X(e);_.value?.update({coordinates:e,title:`${a.longitude}
${a.latitude}`})},pe=()=>new Promise((e,a)=>{if(!("geolocation"in navigator)){a(new Error("Geolocation is unavailable"));return}navigator.geolocation.getCurrentPosition(({coords:n})=>e([n.longitude,n.latitude]),a,{enableHighAccuracy:!0,timeout:1e4})}),me=e=>Object.prototype.toString.call(e)!=="[object Object]"?!1:f.includes(Object.getPrototypeOf(e)),j=b(()=>d.plugins.find(e=>me(e)&&e.type===Ue.LOCATOR&&typeof e.url=="string"&&e.url.length>0)??null),F=b(()=>"geolocation"in navigator&&isSecureContext),Z=b(()=>j.value!==null),fe=b(()=>F.value||Z.value),ee=async(e,a=null)=>{if(!j.value)throw new Error("Locator plugin is not configured");const n=await fetch(j.value.url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({locale:$.value,reason:e,secureContext:isSecureContext,browserGeolocationAvailable:"geolocation"in navigator,error:a instanceof Error?a.message:null})});if(!n.ok)throw new Error(`Locator adapter request failed with status ${n.status}`);const l=await n.json();if(!Array.isArray(l.coordinates)||l.coordinates.length!==2)throw new Error("Locator adapter returned invalid coordinates payload");return[Number(l.coordinates[0]),Number(l.coordinates[1])]},ve=async()=>{P.value=!0;try{const e=F.value?await pe():await ee("browser_geolocation_unavailable");I(e),E({center:e,zoom:Math.max(i.value.zoom,15)});const a=await S(e);s("change",a),s("update:address",a)}catch(e){if(Z.value&&F.value)try{const a=await ee("browser_geolocation_failed",e);I(a),E({center:a,zoom:Math.max(i.value.zoom,15)});const n=await S(a);s("change",n),s("update:address",n);return}catch(a){console.error("Failed to get current location via locator fallback",a)}console.error("Failed to get current location",e)}finally{P.value=!1}};function ye(e){S(e).then(a=>{s("change",a),s("update:address",a)})}const S=async e=>(await(await fetch(W(e.toString()))).json()).response.GeoObjectCollection.featureMember[0]?.GeoObject?.metaDataProperty?.GeocoderMetaData?.Address?.formatted??"",ge=async e=>(await(await fetch(W(e))).json()).response.GeoObjectCollection.featureMember[0]?.GeoObject?.Point.pos??"",he=(e,a,n,l,U)=>{const{YMapMarker:B}=e,k=a.createElement("div");k.className="ui-v1-yandex-map-marker";const y=a.createElement("div");y.className="ui-v1-yandex-map-marker__pin";const C=a.createElement("div");C.className="ui-v1-yandex-map-marker__hint";const z=a.createElement("div"),m=a.createElement("div");C.append(z,m),k.append(y,C);const M=new B({coordinates:n,draggable:!0,mapFollowsOnDrag:!0,zIndex:2500,onDragMove:l,onDragEnd:U},k),ae=({coordinates:te})=>{const ne=X(te);z.textContent=ne.longitude,m.textContent=ne.latitude,M.update({coordinates:te})};return ae({coordinates:n}),{entity:M,update:ae}},be=async()=>{v.value=!1;const e=ce();if(J(),await H(),!w(e))return;const a=ie();if(a){const n=a.createElement("style");if(n.innerHTML=Ye,a.head.appendChild(n),await Be(a,K.value),!w(e)||(await V()?.ready,!w(e)))return;const l=V(),{YMap:U,YMapDefaultFeaturesLayer:B,YMapDefaultSchemeLayer:k}=l;if(d.address){const m=await ge(d.address);if(!w(e))return;m&&(o.center=m.split(" ").map(M=>Number(M)))}const y=a.createElement("div");y.setAttribute("id","map"),a.body.appendChild(y);const C=m=>{I(m)},z=he(l,a,o.center,C,ye);if(_.value=z,i.value={center:[...o.center],zoom:o.zoom},c.value=new U(y,{location:o},[new k({}),new B({id:"features"}),z.entity]),!w(e)){c.value?.destroy(),c.value=null;return}v.value=!0}};return Le(K,async(e,a)=>{p.value&&e!==a&&(Q(),v.value=!1,q.value++)}),Ee(()=>{Q()}),(e,a)=>(u(),x("div",Te,[v.value?T("",!0):(u(),se(N,{key:0,transition:null})),(u(),x("iframe",{ref_key:"iframe",ref:p,key:q.value,allow:"geolocation",onLoad:be},null,32)),v.value?(u(),x("div",Re,[g(G,{class:"ui-v1-yandex-map__control-button",appearance:"secondary",size:"sm",type:"button","aria-label":"Определить текущее местоположение",disabled:P.value||!fe.value,onClick:ve},{default:O(()=>[g(R(Se))]),_:1},8,["disabled"])])):T("",!0),v.value?(u(),x("div",Ge,[g(G,{class:"ui-v1-yandex-map__control-button",appearance:"secondary",size:"sm",type:"button","aria-label":"Уменьшить масштаб",onClick:de},{default:O(()=>[g(R(Ie))]),_:1}),g(G,{class:"ui-v1-yandex-map__control-button",appearance:"secondary",size:"sm",type:"button","aria-label":"Увеличить масштаб",onClick:ue},{default:O(()=>[g(R(Oe))]),_:1})])):T("",!0)]))}});Y.__docgenInfo=Object.assign({displayName:Y.name??Y.__name},{exportName:"default",displayName:"UiYandexMap",description:"",tags:{},props:[{name:"apiKey",type:{name:"string"},required:!0},{name:"address",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"plugins",type:{name:"Array as () => YandexMapPlugin[]"},defaultValue:{func:!0,value:"() => []"}}],events:[{name:"change"},{name:"update:address"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/host/components/yandex-map/UiYandexMap.vue"]});export{Ie as I,Y as _,N as a};
