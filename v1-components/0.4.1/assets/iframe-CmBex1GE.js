const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./Intro-CJpnbiRT.js","./jsx-runtime-DQFc-wkB.js","./_commonjsHelpers-Cpj98o6Y.js","./index-BjypYOp6.js","./UIModalSidebar.stories-8C2Mdi83.js","./vue.esm-bundler-w_vZCKaC.js","./UiButton-CcA6q6us.js","./predicate-D9CE3zPC.js","./UiButton-Be6FUwfv.css","./UiScrollBox-PP4Ya9_U.js","./UiScrollBox-BXTs2m-y.css","./UiTransition-Bl8x2ZmA.js","./UiTransition-ZYlDD31c.css","./clear-DYqGpIoM.js","./transition-CgzY_zdt.js","./transition-AHeICqHx.css","./ToReact-CFiFURyO.js","./index-C_1tOEKP.js","./UIModalSidebar-CCuky2D8.css","./UiButton.stories-ZYd3oZ6a.js","./add-vNL2Dk1J.js","./UiError.stories-DWBnVpUO.js","./_plugin-vue_export-helper-DlAUqK2U.js","./UiError-6JhNNKxN.css","./UiLink.stories-BjL6jRWk.js","./UiLink-BlQNkdjy.js","./UiLink-D-rD8IZP.css","./UiModalWindow.stories-B4x3ww9w.js","./utils-8AQkmo-1.js","./UiModalWindow-C9BiZ9EK.css","./UiScrollBox.stories-C-OQmQgV.js","./UiScrollBox-CbaZEYZ5.css","./UiTag.stories-Br5glEI_.js","./plugin-DDkhKaQt.js","./UiTag-BECeg9u7.css","./UiToolbarButton.stories-DQXwGPiD.js","./UiToolbarLink.stories-5Wj1aQYi.js","./UiYandexMap.stories-r0-2fa0i.js","./UiYandexMap-5WM1m1OW.css","./entry-preview-spYlsI_4.js","./entry-preview-docs-DHhwk_ki.js","./index-pVbLjA8_.js","./preview-D77C14du.js","./index-DrFu-skq.js","./preview-BWzBA1C2.js","./preview-BhhEZcNS.js","./index-D-8MO0q_.js","./preview-ClMdAfga.js","./preview-DyQmNCnS.css"])))=>i.map(i=>d[i]);
import"../sb-preview/runtime.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))u(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const _ of o.addedNodes)_.tagName==="LINK"&&_.rel==="modulepreload"&&u(_)}).observe(document,{childList:!0,subtree:!0});function l(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function u(e){if(e.ep)return;e.ep=!0;const o=l(e);fetch(e.href,o)}})();const R="modulepreload",y=function(r,s){return new URL(r,s).href},d={},t=function(s,l,u){let e=Promise.resolve();if(l&&l.length>0){const _=document.getElementsByTagName("link"),i=document.querySelector("meta[property=csp-nonce]"),O=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));e=Promise.allSettled(l.map(n=>{if(n=y(n,u),n in d)return;d[n]=!0;const a=n.endsWith(".css"),f=a?'[rel="stylesheet"]':"";if(!!u)for(let m=_.length-1;m>=0;m--){const E=_[m];if(E.href===n&&(!a||E.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${n}"]${f}`))return;const c=document.createElement("link");if(c.rel=a?"stylesheet":R,a||(c.as="script"),c.crossOrigin="",c.href=n,O&&c.setAttribute("nonce",O),document.head.appendChild(c),a)return new Promise((m,E)=>{c.addEventListener("load",m),c.addEventListener("error",()=>E(new Error(`Unable to preload CSS for ${n}`)))})}))}function o(_){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=_,window.dispatchEvent(i),!i.defaultPrevented)throw _}return e.then(_=>{for(const i of _||[])i.status==="rejected"&&o(i.reason);return s().catch(o)})},{createBrowserChannel:T}=__STORYBOOK_MODULE_CHANNELS__,{addons:L}=__STORYBOOK_MODULE_PREVIEW_API__,p=T({page:"preview"});L.setChannel(p);window.__STORYBOOK_ADDONS_CHANNEL__=p;window.CONFIG_TYPE==="DEVELOPMENT"&&(window.__STORYBOOK_SERVER_CHANNEL__=p);const I={"./storybook/Intro.mdx":async()=>t(()=>import("./Intro-CJpnbiRT.js"),__vite__mapDeps([0,1,2,3]),import.meta.url),"./storybook/stories/UIModalSidebar.stories.ts":async()=>t(()=>import("./UIModalSidebar.stories-8C2Mdi83.js"),__vite__mapDeps([4,5,6,7,8,9,10,11,12,13,14,15,1,2,3,16,17,18]),import.meta.url),"./storybook/stories/UiButton.stories.ts":async()=>t(()=>import("./UiButton.stories-ZYd3oZ6a.js"),__vite__mapDeps([19,20,5,6,7,8,1,2,3,16,17]),import.meta.url),"./storybook/stories/UiError.stories.ts":async()=>t(()=>import("./UiError.stories-DWBnVpUO.js"),__vite__mapDeps([21,5,1,2,3,16,17,22,23]),import.meta.url),"./storybook/stories/UiLink.stories.ts":async()=>t(()=>import("./UiLink.stories-BjL6jRWk.js"),__vite__mapDeps([24,25,5,7,26,1,2,3,16,17]),import.meta.url),"./storybook/stories/UiModalWindow.stories.ts":async()=>t(()=>import("./UiModalWindow.stories-B4x3ww9w.js"),__vite__mapDeps([27,5,6,7,8,9,10,11,12,28,14,15,13,1,2,3,16,17,29]),import.meta.url),"./storybook/stories/UiScrollBox.stories.ts":async()=>t(()=>import("./UiScrollBox.stories-C-OQmQgV.js"),__vite__mapDeps([30,9,5,10,1,2,3,16,17,22,31]),import.meta.url),"./storybook/stories/UiTag.stories.ts":async()=>t(()=>import("./UiTag.stories-Br5glEI_.js"),__vite__mapDeps([32,5,13,33,1,2,3,16,17,34]),import.meta.url),"./storybook/stories/UiToolbarButton.stories.ts":async()=>t(()=>import("./UiToolbarButton.stories-DQXwGPiD.js"),__vite__mapDeps([35,20,5,6,7,8,28,1,2,3]),import.meta.url),"./storybook/stories/UiToolbarLink.stories.ts":async()=>t(()=>import("./UiToolbarLink.stories-5Wj1aQYi.js"),__vite__mapDeps([36,5,25,7,26,28,1,2,3]),import.meta.url),"./storybook/stories/UiYandexMap.stories.ts":async()=>t(()=>import("./UiYandexMap.stories-r0-2fa0i.js"),__vite__mapDeps([37,5,11,12,33,1,2,3,38]),import.meta.url)};async function P(r){return I[r]()}const{composeConfigs:V,PreviewWeb:D,ClientApi:b}=__STORYBOOK_MODULE_PREVIEW_API__,S=async(r=[])=>{const s=await Promise.all([r[0]??t(()=>import("./entry-preview-spYlsI_4.js"),__vite__mapDeps([39,5]),import.meta.url),r[1]??t(()=>import("./entry-preview-docs-DHhwk_ki.js"),__vite__mapDeps([40,41,2,5]),import.meta.url),r[2]??t(()=>import("./preview-BujxoqU7.js"),[],import.meta.url),r[3]??t(()=>import("./preview-aVwhiz9X.js"),[],import.meta.url),r[4]??t(()=>import("./preview-D77C14du.js"),__vite__mapDeps([42,43]),import.meta.url),r[5]??t(()=>import("./preview-DFmD0pui.js"),[],import.meta.url),r[6]??t(()=>import("./preview-CFgKly6U.js"),[],import.meta.url),r[7]??t(()=>import("./preview-BWzBA1C2.js"),__vite__mapDeps([44,43]),import.meta.url),r[8]??t(()=>import("./preview-DGUiP6tS.js"),[],import.meta.url),r[9]??t(()=>import("./preview-BhhEZcNS.js"),__vite__mapDeps([45,46]),import.meta.url),r[10]??t(()=>import("./preview-CVgpLj3b.js"),[],import.meta.url),r[11]??t(()=>import("./preview-ClMdAfga.js"),__vite__mapDeps([47,48]),import.meta.url)]);return V(s)};window.__STORYBOOK_PREVIEW__=window.__STORYBOOK_PREVIEW__||new D(P,S);window.__STORYBOOK_STORY_STORE__=window.__STORYBOOK_STORY_STORE__||window.__STORYBOOK_PREVIEW__.storyStore;export{t as _};
