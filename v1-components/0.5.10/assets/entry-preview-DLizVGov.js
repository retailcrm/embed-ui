import{v as p,y as v,i as w,R as N,B as d}from"./vue.esm-bundler-CynvcUwn.js";var I=Object.defineProperty,j=(e,t)=>{for(var r in t)I(e,r,{get:t[r],enumerable:!0})};const{sanitizeStoryContextUpdate:E}=__STORYBOOK_MODULE_PREVIEW_API__;var F={};j(F,{applyDecorators:()=>U,mount:()=>b,parameters:()=>h,render:()=>y,renderToCanvas:()=>P});var y=(e,t)=>{let{id:r,component:i}=t;if(!i)throw new Error(`Unable to render story ${r} as the component annotation is missing from the default export`);return()=>p(i,e,C(e,t))},A=e=>{globalThis.PLUGINS_SETUP_FUNCTIONS??(globalThis.PLUGINS_SETUP_FUNCTIONS=new Set),globalThis.PLUGINS_SETUP_FUNCTIONS.add(e)},R=async(e,t)=>{globalThis&&globalThis.PLUGINS_SETUP_FUNCTIONS&&await Promise.all([...globalThis.PLUGINS_SETUP_FUNCTIONS].map(r=>r(e,t)))},g=new Map;async function P({storyFn:e,forceRemount:t,showMain:r,showException:i,storyContext:n,id:a},s){let o=g.get(s);if(o&&!t){let l=e(),c=O(l,n);return L(o.reactiveArgs,c),()=>{_(o.vueApp,s)}}o&&t&&_(o.vueApp,s);let u=v({setup(){n.args=d(n.args);let l=e(),c=O(l,n),f={vueApp:u,reactiveArgs:d(c)};return g.set(s,f),()=>p(l)}});return u.config.errorHandler=(l,c,f)=>{var S;(S=window.__STORYBOOK_PREVIEW__)!=null&&S.storyRenders.some(T=>T.id===a&&T.phase==="playing")?setTimeout(()=>{throw l},0):i(l)},await R(u,n),u.mount(s),r(),()=>{_(u,s)}}function C(e,t){let{argTypes:r}=t,i=Object.entries(e).filter(([n])=>{var a,s;return((s=(a=r[n])==null?void 0:a.table)==null?void 0:s.category)==="slots"}).map(([n,a])=>[n,typeof a=="function"?a:()=>a]);return Object.fromEntries(i)}function O(e,t){return e.props&&w(e)?e.props:t.args}function L(e,t){if(Object.keys(t).length===0)return;let r=N(e)?e:d(e);Object.keys(r).forEach(i=>{i in t||delete r[i]}),Object.assign(r,t)}function _(e,t){e==null||e.unmount(),g.has(t)&&g.delete(t)}function z(e){return typeof e=="function"?{render:e,name:e.name}:e}function m(e,t){let r=e;return r===null?null:typeof r=="function"?r:t?{...z(r),components:{...r.components||{},story:t}}:{render(){return p(r)}}}function U(e,t){return t.reduce((r,i)=>n=>{let a,s=i(o=>{let u=E(o);return o&&(u.args=Object.assign(n.args,u.args)),a=r({...n,...u}),a},n);return a||(a=r(n)),s===a?a:m(s,()=>p(a))},r=>m(e(r)))}var b=e=>async(t,r)=>(t&&(e.originalStoryFn=()=>()=>p(t,r==null?void 0:r.props,r==null?void 0:r.slots)),await e.renderToCanvas(),e.canvas),h={renderer:"vue3"};const B=Object.freeze(Object.defineProperty({__proto__:null,applyDecorators:U,mount:b,parameters:h,render:y,renderToCanvas:P},Symbol.toStringTag,{value:"Module"}));export{B as a,F as e,P as r,A as s};
