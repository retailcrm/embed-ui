import{d as q,B as te,e as $,r as S,w as z,D as de,E as le,G as ae,H as re,I as ce,J as ue,f as pe,b as me,o as I,v as r,K as fe,L as he,M as ve,c as K,q as m,g as c,k as f,t as xe,p as je,a as b,j as be,m as ge}from"./vue.esm-bundler-CynvcUwn.js";import{_ as y}from"./UiButton-DLGdrRDS.js";import{_ as ye}from"./UiScrollBox-BZoOgAD_.js";import{_ as F}from"./UiTransition-Dl3cFLPX.js";import{I as Se}from"./clear-BntOwuO1.js";import{u as we,l as g,n as G,M as Te}from"./transition-C-2ziutJ.js";import{j as e}from"./jsx-runtime-DQFc-wkB.js";import{useMDXComponents as J}from"./index-BjypYOp6.js";import{T as h}from"./ToReact-DREJFgbz.js";import"./predicate-DSECJ5zf.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-C_1tOEKP.js";import"./preview-j2QA7UBs.js";var N=(i=>(i.CLICK_CROSS="Cross",i.CLICK_OUTSIDE="Outside",i.KEY_ESC="Esc",i))(N||{}),v=(i=>(i.LEFT="left",i.RIGHT="right",i))(v||{}),p=(i=>(i.NORMAL="normal",i.NATIVE="native",i.NONE="none",i))(p||{}),x=(i=>(i.LG="lg",i.SM="sm",i))(x||{});const w=q({__name:"UiModalSidebar",props:{id:{type:String,default:()=>we("embed-modal-sidebar")},opened:{type:Boolean,default:!1},closable:{type:Boolean,default:!0},direction:{type:String,validator:i=>Object.values(v).includes(i),default:v.RIGHT},disposeTimeout:{type:null,default:5e3},fixed:{type:Boolean,default:!1},scrolling:{type:String,validator:i=>Object.values(p).includes(i),default:p.NORMAL},size:{type:String,default:x.SM}},emits:["open","close","close-cancel","toggle","shown","showing","hidden","hiding","update:opened","update:overlapped","scroll:y:end"],setup(i,{emit:n}){const d=i,l=n,o=me(Te,null),s=te({attached:!1,shown:!1,hiding:!1,detachTimer:null,overlapped:!1}),T=$(()=>({id:d.id,isBlocker:()=>!d.fixed,isOverlapped:()=>s.overlapped,setIsOverlapped:t=>{s.overlapped!==t&&(s.overlapped=t,l("update:overlapped",t))},emitEscape:()=>{s.overlapped||B(N.KEY_ESC)}})),_=S("hidden"),C=S("hidden"),k=$(()=>{switch(!0){case(_.value==="shown"&&C.value==="shown"):return"shown";case(_.value==="showing"||C.value==="showing"):return"showing";case(_.value==="hiding"||C.value==="hiding"):return"hiding"}return"hidden"}),V=()=>{g.remove(T.value),s.attached=!1},L=()=>{s.detachTimer===null&&(s.detachTimer=setTimeout(()=>V(),d.disposeTimeout?Number(d.disposeTimeout):0))},A=()=>{s.detachTimer!==null&&(clearTimeout(s.detachTimer),s.detachTimer=null)},U=async()=>{s.hiding=!1,A(),!s.shown&&(g.remove(T.value),g.add(T.value),g.start(),s.attached=!0,await G(),await G(),s.hiding||(s.shown=!0,l("update:opened",!0),l("toggle",!0),l("open")))},j=(t=void 0)=>{if(s.hiding=!0,!s.shown){s.attached&&L();return}s.shown=!1,l("update:opened",!1),l("toggle",!1),l("close",t),g.remove(T.value),A(),L()},B=(t=void 0)=>{d.closable?j(t):l("close-cancel",t)};z(()=>d.opened,t=>t?U():j()),z(()=>k.value,(t,a)=>{t!==a&&(t==="shown"?l("shown"):t==="showing"?l("showing"):t==="hidden"?l("hidden"):t==="hiding"&&l("hiding"))}),de(()=>{d.opened&&U(),l("update:overlapped",s.overlapped)}),le(()=>d.opened?U():j()),ae(j),re(()=>{j(),V()});const R=ce(),D=ue(),W=t=>t in D,M=t=>{const a=D[t];return a?a({overlapped:s.overlapped}):[]},Z=t=>()=>M(t),Q=()=>r("header",{class:"ui-v1-modal-sidebar__header"},[r("div",{class:"ui-v1-modal-sidebar__header-inner"},r("div",{role:"heading","aria-level":"1",class:"ui-v1-modal-sidebar__title"},M("title"))),r("div",{role:"button","aria-label":"Esc",class:"ui-v1-modal-sidebar__close",onClick:()=>{s.overlapped||B(N.CLICK_CROSS)}},r(Se,{width:32,title:"Esc"}))]),ee=()=>d.scrolling===p.NONE?r("div",{class:"ui-v1-modal-sidebar__body-fixed"},M("default")):r(ye,{class:"ui-v1-modal-sidebar__body",native:d.scrolling===p.NATIVE,showOnMac:!0,onPsYReachEnd:()=>l("scroll:y:end")},{default:Z("default")}),ne=()=>W("footer")?[r("footer",{class:"ui-v1-modal-sidebar__footer"},M("footer"))]:[],ie=()=>{const t=d.direction,a=d.size,E=oe=>()=>C.value=oe;return r(F,{name:`slide-${t}`,onBeforeEnter:E("showing"),onAfterEnter:E("shown"),onBeforeLeave:E("hiding"),onAfterLeave:E("hidden")},{default:()=>s.shown?[r("aside",{id:d.id+"-sidebar",class:{"ui-v1-modal-sidebar":!0,"ui-v1-modal-sidebar_left":t===v.LEFT,"ui-v1-modal-sidebar_size_sm":a===x.SM,"ui-v1-modal-sidebar_size_lg":a===x.LG}},[Q(),ee(),...ne()])]:[]})},se=()=>{const t=a=>()=>_.value=a;return s.attached?r(ve,{to:(o==null?void 0:o.container)??document.body},r(F,{name:"fade-2",onBeforeEnter:t("showing"),onAfterEnter:t("shown"),onBeforeLeave:t("hiding"),onAfterLeave:t("hidden")},{default:()=>fe(r("div",{id:d.id,"aria-hidden":k.value!=="shown"?"true":"false","aria-modal":"true",...R,class:[R.class,{"ui-v1-modal":!0,"ui-v1-modal_overlapped":s.overlapped,"ui-v1-modal-sidebar-overlay":!0,"ui-v1-modal-sidebar-overlay_fixed":d.fixed,[`ui-v1-modal-sidebar-overlay_${d.direction}`]:d.fixed}],onClick:a=>{a.target===a.currentTarget&&!s.overlapped&&B(N.CLICK_OUTSIDE)}},ie()),[[he,s.shown]])})):void 0};return(t,a)=>(I(),pe(se))}});w.__docgenInfo={exportName:"default",displayName:"UiModalSidebar",description:"",tags:{},props:[{name:"id",description:"Атрибут id корневого элемента. Должен быть уникальным на странице",type:{name:"string"},defaultValue:{func:!0,value:"() => uid('embed-modal-sidebar')"}},{name:"opened",description:"Флаг управления раскрытием панели",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"closable",description:"Флаг, указывающий, можно ли закрыть панель",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"direction",description:"Определяет направление появления панели",type:{name:"DIRECTION"},defaultValue:{func:!1,value:"DIRECTION.RIGHT"}},{name:"disposeTimeout",description:"Время, через которое плавающий элемент удаляется со страницы, если был скрыт",type:{name:"number|string|null"},defaultValue:{func:!1,value:"5000"}},{name:"fixed",description:"Флаг, задающий фиксированную панель без подложки",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"scrolling",description:"Тип прокрутки",type:{name:"SCROLLING"},defaultValue:{func:!1,value:"SCROLLING.NORMAL"}},{name:"size",description:"Размер панели",type:{name:"SIZE"},defaultValue:{func:!1,value:"SIZE.SM"}}],events:[{name:"open",description:"Срабатывает при открытии панели"},{name:"close",description:"Срабатывает при закрытии панели. Содержит данные о методе закрытия CLOSE_METHOD из @omnica/modal-sidebar"},{name:"close-cancel",description:`Срабатывает при попытке закрыть панели, если флаг closable выставлен в false.
Содержит данные о методе закрытия CLOSE_METHOD из @omnica/modal-sidebar`},{name:"toggle",description:"Срабатывает при раскрытии и закрытии панели, содержит актуальное значение флага opened"},{name:"shown",description:"Срабатывает при завершении раскрытия"},{name:"showing",description:"Срабатывает в начале раскрытия"},{name:"hidden",description:"Срабатывает при завершении сокрытия"},{name:"hiding",description:"Срабатывает в начале сокрытия"},{name:"update:opened",description:"Изменение значения флага opened"},{name:"update:overlapped",description:"Срабатывает при изменении состояния перекрытия"},{name:"scroll:y:end",description:"Срабатывает при прокрутке содержимого в самый конец по y-оси"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/host/components/modal-sidebar/UiModalSidebar.vue"]};const _e={style:{height:"1500px"}},Ce={key:0,style:{"margin-top":"16px"}},u=q({__name:"UiModalSidebar.example",props:{buttonTitle:{type:String,default:""},hasNesting:{type:Boolean,default:!1},footer:{type:Boolean,default:!1}},setup(i){const n=S(!1),d=S(!1);return(l,o)=>(I(),K("div",null,[m(y,{onClick:o[0]||(o[0]=s=>n.value=!0)},{default:c(()=>[f(xe(i.buttonTitle),1)]),_:1}),m(w,ge({opened:n.value,"onUpdate:opened":o[6]||(o[6]=s=>n.value=s)},l.$attrs),je({title:c(()=>[o[7]||(o[7]=f(" Заголовок "))]),default:c(()=>[b("div",_e,[o[12]||(o[12]=b("div",null,"Контент высотой 1500px",-1)),i.hasNesting?(I(),K("div",Ce,[m(y,{onClick:o[1]||(o[1]=s=>d.value=!0)},{default:c(()=>o[8]||(o[8]=[f(" Вложенная шторка ")])),_:1}),m(w,{opened:d.value,"onUpdate:opened":o[3]||(o[3]=s=>d.value=s),onCloseSidebar:o[4]||(o[4]=s=>d.value=!1)},{title:c(()=>o[9]||(o[9]=[f(" Header ")])),footer:c(()=>[m(y,{onClick:o[2]||(o[2]=s=>d.value=!1)},{default:c(()=>o[10]||(o[10]=[f(" Закрыть ")])),_:1})]),default:c(()=>[o[11]||(o[11]=b("div",{style:{height:"1500px"}},[b("div",null,"Some content"),b("div",null,"Вложенная шторка")],-1))]),_:1},8,["opened"])])):be("",!0)])]),_:2},[i.footer?{name:"footer",fn:c(()=>[m(y,{onClick:o[5]||(o[5]=s=>n.value=!1)},{default:c(()=>o[13]||(o[13]=[f(" Закрыть ")])),_:1})]),key:"0"}:void 0]),1040,["opened"])]))}});u.__docgenInfo={exportName:"default",displayName:"UiModalSidebar.example",description:"",tags:{},props:[{name:"buttonTitle",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"hasNesting",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"footer",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiModalSidebar.example.vue"]};function H(i){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...J(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{id:"uimodalsidebar",children:"UiModalSidebar"}),`
`,e.jsx(n.p,{children:"Выдвигаемая боковая панель для размещения дополнительных настроек или информации"}),`
`,e.jsx(n.h2,{id:"api",children:"API"}),`
`,e.jsx(n.h3,{id:"виды-панелей",children:"Виды панелей"}),`
`,e.jsxs(n.p,{children:["Стандартная панель выводится справа и бывает двух размеров: ",e.jsx(n.code,{children:"sm — 416 px"})," и ",e.jsx(n.code,{children:"lg — 720 px"}),`. Выбор размера определяется
типом его контента. Это могут быть дополнительные настройки для параметров на странице, а также информационный материал
по новым сущностям.`]}),`
`,e.jsx(n.p,{children:"Стандартная панель:"}),`
`,e.jsxs("div",{className:"flex-container gap-4",children:[e.jsx(h,{is:u,buttonTitle:"Открыть (sm)"}),e.jsx(h,{is:u,buttonTitle:"Открыть (lg)",size:"lg"})]}),`
`,e.jsx(n.p,{children:`Профиль — выводится слева, по клику на иконку профиля. На панели показаны данные пользователя, тариф системы и
ссылки на настройки.`}),`
`,e.jsx(h,{is:u,buttonTitle:"Левая панель (sm)",direction:"left"}),`
`,e.jsx(n.h3,{id:"управление-состоянием",children:"Управление состоянием"}),`
`,e.jsx(n.p,{children:"Панель можно закрыть:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["нажатием на иконку закрытия панели, либо клавишей ",e.jsx(n.code,{children:"Esc"}),";"]}),`
`,e.jsxs(n.li,{children:["смена состояния флага ",e.jsx(n.code,{children:"opened"}),";"]}),`
`,e.jsx(n.li,{children:"кликом вне области панели, если панель является блокирующей. Такая панель имеет затемнённую подложку."}),`
`]}),`
`,e.jsxs(n.p,{children:["При необходимости можно запретить закрывать панель вышеперечисленными способами, если выключить флаг ",e.jsx(n.code,{children:"closable"}),`. Тогда
панель будет оставаться в открытом состоянии до тех пор, пока не станет вновь закрываемой.`]}),`
`,e.jsxs(n.p,{children:["Для настройки времени удаления плавающего элемента со страницы, если он был скрыт, используется свойство ",e.jsx(n.code,{children:"disposeTimeout"}),`.
Значение задаётся в миллисекундах, поддерживаются как числа, так и строковые форматы.`]}),`
`,e.jsx(n.h3,{id:"прокрутка",children:"Прокрутка"}),`
`,e.jsxs(n.p,{children:[`При прокрутке шапка и футер закреплены и прокручивается только контент в теле панели. Если панель не блокирующая, то есть
для неё не установлен флаг `,e.jsx(n.code,{children:"fixed"}),`, то можно прокручивать и панель, и страницу по отдельности в зависимости от положения
курсора.`]}),`
`,e.jsx(h,{is:u,buttonTitle:"Фиксированная панель (sm)",fixed:!0}),`
`,e.jsxs(n.p,{children:[`По-умолчанию, содержимое тела панели помещается в контейнер со скроллом. Данное состояние определяется свойством
`,e.jsx(n.code,{children:"scrolling"})," со значением ",e.jsx(n.code,{children:"normal"}),`. Вид полосы прокрутки можно поменять на стандартный, предоставляемый браузерами.
Для этого необходимо установить значение `,e.jsx(n.code,{children:"native"}),"."]}),`
`,e.jsxs(n.p,{children:["Чтобы отключить прокрутку для контента в теле панели не обходимо установить значение ",e.jsx(n.code,{children:"none"}),"."]}),`
`,e.jsx(n.h3,{id:"информационная-панель",children:"Информационная панель"}),`
`,e.jsx(n.p,{children:`Панель с пояснениями для настроек. Не блокируют контент, чтобы пользователь одновременно изучал материал и применял
полученные знания на странице. В таких панелях могут быть тексты, элементы интерфейса и скриншоты.`}),`
`,e.jsx(n.h3,{id:"вложенность",children:"Вложенность"}),`
`,e.jsxs(n.p,{children:["В качестве дочерних модальных окон можно использовать и другие модальные элементы на основе ",e.jsx(n.code,{children:"UiModal"}),`, например,
`,e.jsx(n.code,{children:"UiModalWindow"})]}),`
`,e.jsx(h,{is:u,buttonTitle:"Панель со вложенной шторкой (sm)",hasNesting:!0,footer:!0}),`
`,e.jsx(n.h2,{id:"слоты",children:"Слоты"}),`
`,e.jsxs(n.p,{children:["Для настройки внешнего вида заголовка в шапке панели содержится слот ",e.jsx(n.code,{children:"title"}),`. Он позволяет добавлять опционально необходимые
компоненты. Например, если в панели находится многоуровневая настройка, то перед заголовком может быть добавлена иконка для
возврата назад.`]}),`
`,e.jsxs(n.p,{children:["Слот ",e.jsx(n.code,{children:"default"})," позволяет передать содержимое тела панели."]}),`
`,e.jsxs(n.p,{children:["Футер в панели отображается, если определён слот ",e.jsx(n.code,{children:"footer"}),`. Чаще всего в нём содержатся кнопки сохранения, отмены и третичные
кнопки копирования и удаления.`]}),`
`,e.jsx(h,{is:u,buttonTitle:"Панель с заданными слотами",footer:!0}),`
`,e.jsx(n.h2,{id:"события",children:"События"}),`
`,e.jsx(n.p,{children:"Компонент генерирует события:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"open"})," — при открытии панели;"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"close"})," — при закрытии панели. Содержит данные о методе закрытия, а именно при клике по кнопке закрытия (",e.jsx(n.code,{children:"Cross"}),`),
при клике на область вне панели (`,e.jsx(n.code,{children:"Outside"}),") или по событию esc (",e.jsx(n.code,{children:"Esc"}),");"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"close-cancel"}),"— при попытке закрыть панель, если флаг ",e.jsx(n.code,{children:"closable"})," выключен. Содержит данные о методе закрытия;"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"toggle"})," — при раскрытии и закрытии панели. Содержит актуальное значение флага ",e.jsx(n.code,{children:"opened"}),";"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"shown"})," — при завершении раскрытия;"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"showing"})," — в начале раскрытия;"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"hidden"})," — при завершении сокрытия;"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"hiding"})," — в начале сокрытия;"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"update:opened"})," — при изменении значения флага ",e.jsx(n.code,{children:"opened"}),";"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"update:overlapped"})," — при изменении состояния перекрытия;"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"scroll:y:end"})," — при прокрутке содержимого в самый конец по y-оси."]}),`
`]})]})}function Me(i={}){const{wrapper:n}={...J(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(H,{...i})}):H(i)}const ze={title:"Components/UiModalSidebar",component:w,args:{direction:v.RIGHT,fixed:!1,scrolling:p.NORMAL,size:x.SM},argTypes:{opened:{control:!1},id:{control:!1},direction:{control:"select",options:Object.values(v)},scrolling:{control:"select",options:Object.values(p)},size:{control:"select",options:Object.values(x)}},render:i=>({components:{UiButton:y,UiModalSidebar:w},setup(){return{args:i,opened:S(!1)}},template:`
      <div>
        <UiButton @click="opened = true">
          Open
        </UiButton>

        <UiModalSidebar
            v-model:opened="opened"
            v-bind="args"
        >
          <template #title>
            Title
          </template>

          Content

          <template #footer>
            <UiButton style="margin-right: 10px" @click="opened = false">
              Save
            </UiButton>

            <UiButton appearance="secondary" @click="opened = false">
              Close
            </UiButton>
          </template>
        </UiModalSidebar>
      </div>
    `}),parameters:{docs:{page:Me},layout:"centered"}},O={};var P,X,Y;O.parameters={...O.parameters,docs:{...(P=O.parameters)==null?void 0:P.docs,source:{originalSource:"{}",...(Y=(X=O.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};const Ke=["Sandbox"];export{O as Sandbox,Ke as __namedExportsOrder,ze as default};
