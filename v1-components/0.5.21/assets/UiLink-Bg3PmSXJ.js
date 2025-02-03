import{o as n,c as l,a as r,d as u,h as i,j as c,m as d,v as f,u as p}from"./vue.esm-bundler-DRrU9--T.js";import{i as m}from"./predicate-ClulhfEu.js";import{u as v}from"./composables-CTw0CB0X.js";const k={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"};function y(e,t){return n(),l("svg",k,t[0]||(t[0]=[r("path",{fill:"currentColor",d:"m6.844 17.854-.7-.703a.5.5 0 0 1 0-.704l8.48-8.456-6.212.007a.49.49 0 0 1-.496-.5l.007-.991a.5.5 0 0 1 .496-.5L16.994 6c.196 0 .385.078.524.218l.265.267c.137.142.215.33.217.528l-.007 8.633a.5.5 0 0 1-.496.5h-.992a.48.48 0 0 1-.49-.493l.007-6.255-8.48 8.456a.49.49 0 0 1-.698 0"},null,-1)]))}const g={render:y};var s=(e=>(e.BREADCRUMBS="breadcrumbs",e.DEFAULT="default",e.NAVIGATION="navigation",e.NAVIGATION_ANCHOR="navigation-anchor",e.TITLE="title",e))(s||{}),o=(e=>(e.ARTICLE="article",e.BODY="body",e.PARAGRAPH="paragraph",e.SMALL="small",e.TINY="tiny",e.TITLE01="title-01",e.TITLE02="title-02",e))(o||{});const h=["href","target"],B={key:0,class:"ui-v1-link__inner"},L={key:2,class:"ui-v1-link__icon"},b=u({__name:"UiLink",props:{href:{type:String,validator:e=>typeof e=="string"&&(m(e)||e==="javascript:void(0);"),default:"javascript:void(0);"},external:{type:Boolean,default:!1},appearance:{type:String,validator:e=>Object.values(s).includes(e),default:s.DEFAULT},size:{type:String,validator:e=>Object.values(o).includes(e),default:o.BODY},light:{type:Boolean,default:!1},accent:{type:Boolean,default:!1},dotted:{type:Boolean,default:!1},ellipsis:{type:Boolean,default:!1}},setup(e){const t=v();return(a,T)=>(n(),l("a",d({ref_key:"root",ref:t,href:e.href,class:{"ui-v1-link":!0,[`ui-v1-link_${e.appearance}`]:!0,[`ui-v1-link_${e.size}`]:!0,"ui-v1-link_dark":!e.light,"ui-v1-link_light":e.light,"ui-v1-link_accent":e.accent,"ui-v1-link_dotted":e.dotted,"ui-v1-link_ellipsis":e.ellipsis},target:e.external?"_blank":"_self"},a.$attrs),[e.dotted?(n(),l("span",B,[i(a.$slots,"default")])):i(a.$slots,"default",{key:1}),a.$slots.icon||e.external?(n(),l("span",L,[i(a.$slots,"icon",{},()=>[f(p(g),{class:"ui-v1-link__icon-sprite"})])])):c("",!0)],16,h))}});b.__docgenInfo={exportName:"default",displayName:"UiLink",description:"",tags:{},props:[{name:"href",description:"Атрибут ссылки",type:{name:"string"},defaultValue:{func:!1,value:"'javascript:void(0);'"}},{name:"external",description:`Определяет, нужно ли открывать ссылку в новой вкладке.
Также добавляется иконка внешней ссылки (если компонент UiIcon установлен)`,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"appearance",description:"Тип ссылок",type:{name:"APPEARANCE | `${APPEARANCE}`"},defaultValue:{func:!1,value:"APPEARANCE.DEFAULT"}},{name:"size",description:"Размер текста",type:{name:"SIZE | `${SIZE}`"},defaultValue:{func:!1,value:"SIZE.BODY"}},{name:"light",description:"Инвертированный цвет ссылок для тёмного фона",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"accent",description:"Жирное начертание",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"dotted",description:"Подчеркивание dotted вместо стандартного поведения",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"ellipsis",description:"Определяет, будет ли текст ошибок обрезаться через многоточие или переноситься на следующую строку",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default",description:"Текст ссылки"},{name:"icon",description:"Слот для иконки"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/host/components/link/UiLink.vue"]};export{s as A,o as S,b as _};
