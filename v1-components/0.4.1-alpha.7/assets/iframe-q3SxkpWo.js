const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./UIModalSidebar.stories-CfAFQrrN.js","./vue.esm-bundler-cEDHhJc8.js","./UiButton-BAN1ATF_.js","./UiButton-Be6FUwfv.css","./UiScrollBox-CZg8WEIg.js","./UiScrollBox-BXTs2m-y.css","./transition-gJJuALl8.js","./transition-AHeICqHx.css","./clear-CEEToDQW.js","./index-BFZQNVMc.js","./_commonjsHelpers-Cpj98o6Y.js","./index-uLjDVhSk.js","./ToReact-n2TWxbDT.js","./UIModalSidebar-CCuky2D8.css","./UiButton.stories-3X8uZuwv.js","./UiError.stories-C804aBpH.js","./_plugin-vue_export-helper-DlAUqK2U.js","./UiError-BDQZ1ghl.css","./UiLink.stories-BYlay3zx.js","./UiLink-SY1xPIxl.css","./UiModalWindow.stories-DXMr5vJ0.js","./UiModalWindow-C9BiZ9EK.css","./UiScrollBox.stories-BXbv9-fh.js","./UiScrollBox-CZuwrPQP.css","./UiTag.stories-B8a6ZMaP.js","./UiTag-BECeg9u7.css","./entry-preview-sg6fcoIL.js","./entry-preview-docs-s5rQSHv5.js","./index-pVbLjA8_.js","./preview-D77C14du.js","./index-DrFu-skq.js","./preview-BWzBA1C2.js","./preview-BhhEZcNS.js","./index-D-8MO0q_.js"])))=>i.map(i=>d[i]);
import"../sb-preview/runtime.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))u(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&u(i)}).observe(document,{childList:!0,subtree:!0});function l(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function u(r){if(r.ep)return;r.ep=!0;const o=l(r);fetch(r.href,o)}})();const R="modulepreload",T=function(e,s){return new URL(e,s).href},d={},t=function(s,l,u){let r=Promise.resolve();if(l&&l.length>0){const i=document.getElementsByTagName("link"),_=document.querySelector("meta[property=csp-nonce]"),p=(_==null?void 0:_.nonce)||(_==null?void 0:_.getAttribute("nonce"));r=Promise.allSettled(l.map(n=>{if(n=T(n,u),n in d)return;d[n]=!0;const m=n.endsWith(".css"),f=m?'[rel="stylesheet"]':"";if(!!u)for(let a=i.length-1;a>=0;a--){const E=i[a];if(E.href===n&&(!m||E.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${n}"]${f}`))return;const c=document.createElement("link");if(c.rel=m?"stylesheet":R,m||(c.as="script"),c.crossOrigin="",c.href=n,p&&c.setAttribute("nonce",p),document.head.appendChild(c),m)return new Promise((a,E)=>{c.addEventListener("load",a),c.addEventListener("error",()=>E(new Error(`Unable to preload CSS for ${n}`)))})}))}function o(i){const _=new Event("vite:preloadError",{cancelable:!0});if(_.payload=i,window.dispatchEvent(_),!_.defaultPrevented)throw i}return r.then(i=>{for(const _ of i||[])_.status==="rejected"&&o(_.reason);return s().catch(o)})},{createBrowserChannel:L}=__STORYBOOK_MODULE_CHANNELS__,{addons:y}=__STORYBOOK_MODULE_PREVIEW_API__,O=L({page:"preview"});y.setChannel(O);window.__STORYBOOK_ADDONS_CHANNEL__=O;window.CONFIG_TYPE==="DEVELOPMENT"&&(window.__STORYBOOK_SERVER_CHANNEL__=O);const I={"./storybook/stories/UIModalSidebar.stories.ts":async()=>t(()=>import("./UIModalSidebar.stories-CfAFQrrN.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13]),import.meta.url),"./storybook/stories/UiButton.stories.ts":async()=>t(()=>import("./UiButton.stories-3X8uZuwv.js"),__vite__mapDeps([14,1,2,3,9,10,11,12]),import.meta.url),"./storybook/stories/UiError.stories.ts":async()=>t(()=>import("./UiError.stories-C804aBpH.js"),__vite__mapDeps([15,1,9,10,11,12,16,17]),import.meta.url),"./storybook/stories/UiLink.stories.ts":async()=>t(()=>import("./UiLink.stories-BYlay3zx.js"),__vite__mapDeps([18,1,9,10,11,12,19]),import.meta.url),"./storybook/stories/UiModalWindow.stories.ts":async()=>t(()=>import("./UiModalWindow.stories-DXMr5vJ0.js"),__vite__mapDeps([20,1,2,3,4,5,6,7,8,9,10,11,12,21]),import.meta.url),"./storybook/stories/UiScrollBox.stories.ts":async()=>t(()=>import("./UiScrollBox.stories-BXbv9-fh.js"),__vite__mapDeps([22,4,1,5,9,10,11,12,16,23]),import.meta.url),"./storybook/stories/UiTag.stories.ts":async()=>t(()=>import("./UiTag.stories-B8a6ZMaP.js"),__vite__mapDeps([24,1,8,9,10,11,12,25]),import.meta.url)};async function P(e){return I[e]()}const{composeConfigs:V,PreviewWeb:D,ClientApi:A}=__STORYBOOK_MODULE_PREVIEW_API__,S=async(e=[])=>{const s=await Promise.all([e[0]??t(()=>import("./entry-preview-sg6fcoIL.js"),__vite__mapDeps([26,1]),import.meta.url),e[1]??t(()=>import("./entry-preview-docs-s5rQSHv5.js"),__vite__mapDeps([27,28,10,1]),import.meta.url),e[2]??t(()=>import("./preview-CSQUaXoY.js"),[],import.meta.url),e[3]??t(()=>import("./preview-CydETqh1.js"),[],import.meta.url),e[4]??t(()=>import("./preview-aVwhiz9X.js"),[],import.meta.url),e[5]??t(()=>import("./preview-D77C14du.js"),__vite__mapDeps([29,30]),import.meta.url),e[6]??t(()=>import("./preview-DFmD0pui.js"),[],import.meta.url),e[7]??t(()=>import("./preview-CFgKly6U.js"),[],import.meta.url),e[8]??t(()=>import("./preview-BWzBA1C2.js"),__vite__mapDeps([31,30]),import.meta.url),e[9]??t(()=>import("./preview-DGUiP6tS.js"),[],import.meta.url),e[10]??t(()=>import("./preview-BJ6EHSBF.js"),[],import.meta.url),e[11]??t(()=>import("./preview-BhhEZcNS.js"),__vite__mapDeps([32,33]),import.meta.url),e[12]??t(()=>import("./preview-CVgpLj3b.js"),[],import.meta.url),e[13]??t(()=>import("./preview-CUOGbPEh.js"),[],import.meta.url)]);return V(s)};window.__STORYBOOK_PREVIEW__=window.__STORYBOOK_PREVIEW__||new D(P,S);window.__STORYBOOK_STORY_STORE__=window.__STORYBOOK_STORY_STORE__||window.__STORYBOOK_PREVIEW__.storyStore;export{t as _};
