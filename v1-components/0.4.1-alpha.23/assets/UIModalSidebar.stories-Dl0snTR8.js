import{e as J,r as le,A as $,x as S,w as z,B as te,D as de,E as ae,G as re,H as ce,I as ue,f as pe,z as me,o as N,h as r,J as fe,K as he,L as ve,c as G,s as m,g as c,j as f,t as xe,m as je,a as b,k as be,p as ge}from"./vue.esm-bundler-BmdTWJX9.js";import{_ as y}from"./UiButton-QJF5E-PL.js";import{_ as ye}from"./UiScrollBox-Db1HIXBu.js";import{u as Se,l as g,n as K,M as we,_ as F}from"./transition-kGvgrvew.js";import{I as Te}from"./clear-Dg_qdedE.js";import{j as e}from"./jsx-runtime-DQFc-wkB.js";import{useMDXComponents as W}from"./index-BjypYOp6.js";import{T as h}from"./ToReact-Dm3IsGyL.js";import"./predicate-D9CE3zPC.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-C_1tOEKP.js";var U=(i=>(i.CLICK_CROSS="Cross",i.CLICK_OUTSIDE="Outside",i.KEY_ESC="Esc",i))(U||{}),v=(i=>(i.LEFT="left",i.RIGHT="right",i))(v||{}),p=(i=>(i.NORMAL="normal",i.NATIVE="native",i.NONE="none",i))(p||{}),x=(i=>(i.LG="lg",i.SM="sm",i))(x||{});const w=J({__name:"UiModalSidebar",props:{id:{type:String,default:()=>Se("embed-modal-sidebar")},opened:{type:Boolean,default:!1},closable:{type:Boolean,default:!0},direction:{type:String,validator:i=>Object.values(v).includes(i),default:v.RIGHT},disposeTimeout:{type:null,default:5e3},fixed:{type:Boolean,default:!1},scrolling:{type:String,validator:i=>Object.values(p).includes(i),default:p.NORMAL},size:{type:String,default:x.SM}},emits:["open","close","close-cancel","toggle","shown","showing","hidden","hiding","update:opened","update:overlapped","scroll:y:end"],setup(i,{emit:n}){const t=i,d=n,o=me(we,null),s=le({attached:!1,shown:!1,hiding:!1,detachTimer:null,overlapped:!1}),T=$(()=>({id:t.id,isBlocker:()=>!t.fixed,isOverlapped:()=>s.overlapped,setIsOverlapped:l=>{s.overlapped!==l&&(s.overlapped=l,d("update:overlapped",l))},emitEscape:()=>{s.overlapped||I(U.KEY_ESC)}})),_=S("hidden"),C=S("hidden"),k=$(()=>{switch(!0){case(_.value==="shown"&&C.value==="shown"):return"shown";case(_.value==="showing"||C.value==="showing"):return"showing";case(_.value==="hiding"||C.value==="hiding"):return"hiding"}return"hidden"}),V=()=>{g.remove(T.value),s.attached=!1},L=()=>{s.detachTimer===null&&(s.detachTimer=setTimeout(()=>V(),t.disposeTimeout?Number(t.disposeTimeout):0))},A=()=>{s.detachTimer!==null&&(clearTimeout(s.detachTimer),s.detachTimer=null)},B=async()=>{s.hiding=!1,A(),!s.shown&&(g.remove(T.value),g.add(T.value),g.start(),s.attached=!0,await K(),await K(),s.hiding||(s.shown=!0,d("update:opened",!0),d("toggle",!0),d("open")))},j=(l=void 0)=>{if(s.hiding=!0,!s.shown){s.attached&&L();return}s.shown=!1,d("update:opened",!1),d("toggle",!1),d("close",l),g.remove(T.value),A(),L()},I=(l=void 0)=>{t.closable?j(l):d("close-cancel",l)};z(()=>t.opened,l=>l?B():j()),z(()=>k.value,(l,a)=>{l!==a&&(l==="shown"?d("shown"):l==="showing"?d("showing"):l==="hidden"?d("hidden"):l==="hiding"&&d("hiding"))}),te(()=>{t.opened&&B(),d("update:overlapped",s.overlapped)}),de(()=>t.opened?B():j()),ae(j),re(()=>{j(),V()});const R=ce(),D=ue(),Z=l=>l in D,M=l=>{const a=D[l];return a?a({overlapped:s.overlapped}):[]},q=l=>()=>M(l),Q=()=>r("header",{class:"ui-v1-modal-sidebar__header"},[r("div",{class:"ui-v1-modal-sidebar__header-inner"},r("div",{role:"heading","aria-level":"1",class:"ui-v1-modal-sidebar__title"},M("title"))),r("div",{role:"button","aria-label":"Esc",class:"ui-v1-modal-sidebar__close",onClick:()=>{s.overlapped||I(U.CLICK_CROSS)}},r(Te,{width:32,title:"Esc"}))]),ee=()=>t.scrolling===p.NONE?r("div",{class:"ui-v1-modal-sidebar__body-fixed"},M("default")):r(ye,{class:"ui-v1-modal-sidebar__body",native:t.scrolling===p.NATIVE,showOnMac:!0,onPsYReachEnd:()=>d("scroll:y:end")},{default:q("default")}),ne=()=>Z("footer")?[r("footer",{class:"ui-v1-modal-sidebar__footer"},M("footer"))]:[],ie=()=>{const l=t.direction,a=t.size,E=oe=>()=>C.value=oe;return r(F,{name:`slide-${l}`,onBeforeEnter:E("showing"),onAfterEnter:E("shown"),onBeforeLeave:E("hiding"),onAfterLeave:E("hidden")},{default:()=>s.shown?[r("aside",{id:t.id+"-sidebar",class:{"ui-v1-modal-sidebar":!0,"ui-v1-modal-sidebar_left":l===v.LEFT,"ui-v1-modal-sidebar_size_sm":a===x.SM,"ui-v1-modal-sidebar_size_lg":a===x.LG}},[Q(),ee(),...ne()])]:[]})},se=()=>{const l=a=>()=>_.value=a;return s.attached?r(ve,{to:(o==null?void 0:o.container)??document.body},r(F,{name:"fade-2",onBeforeEnter:l("showing"),onAfterEnter:l("shown"),onBeforeLeave:l("hiding"),onAfterLeave:l("hidden")},{default:()=>fe(r("div",{id:t.id,"aria-hidden":k.value!=="shown"?"true":"false","aria-modal":"true",...R,class:[R.class,{"ui-v1-modal":!0,"ui-v1-modal_overlapped":s.overlapped,"ui-v1-modal-sidebar-overlay":!0,"ui-v1-modal-sidebar-overlay_fixed":t.fixed,[`ui-v1-modal-sidebar-overlay_${t.direction}`]:t.fixed}],onClick:a=>{a.target===a.currentTarget&&!s.overlapped&&I(U.CLICK_OUTSIDE)}},ie()),[[he,s.shown]])})):void 0};return(l,a)=>(N(),pe(se))}});w.__docgenInfo={exportName:"default",displayName:"UiModalSidebar",description:"",tags:{},props:[{name:"id",description:"Атрибут id корневого элемента. Должен быть уникальным на странице",type:{name:"string"},defaultValue:{func:!0,value:"() => uid('embed-modal-sidebar')"}},{name:"opened",description:"Флаг управления раскрытием панели",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"closable",description:"Флаг, указывающий, можно ли закрыть панель",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"direction",description:"Определяет направление появления панели",type:{name:"DIRECTION"},defaultValue:{func:!1,value:"DIRECTION.RIGHT"}},{name:"disposeTimeout",description:"Время, через которое плавающий элемент удаляется со страницы, если был скрыт",type:{name:"number|string|null"},defaultValue:{func:!1,value:"5000"}},{name:"fixed",description:"Флаг, задающий фиксированную панель без подложки",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"scrolling",description:"Тип прокрутки",type:{name:"SCROLLING"},defaultValue:{func:!1,value:"SCROLLING.NORMAL"}},{name:"size",description:"Размер панели",type:{name:"SIZE"},defaultValue:{func:!1,value:"SIZE.SM"}}],events:[{name:"open",description:"Срабатывает при открытии панели"},{name:"close",description:"Срабатывает при закрытии панели. Содержит данные о методе закрытия CLOSE_METHOD из @omnica/modal-sidebar"},{name:"close-cancel",description:`Срабатывает при попытке закрыть панели, если флаг closable выставлен в false.
Содержит данные о методе закрытия CLOSE_METHOD из @omnica/modal-sidebar`},{name:"toggle",description:"Срабатывает при раскрытии и закрытии панели, содержит актуальное значение флага opened"},{name:"shown",description:"Срабатывает при завершении раскрытия"},{name:"showing",description:"Срабатывает в начале раскрытия"},{name:"hidden",description:"Срабатывает при завершении сокрытия"},{name:"hiding",description:"Срабатывает в начале сокрытия"},{name:"update:opened",description:"Изменение значения флага opened"},{name:"update:overlapped",description:"Срабатывает при изменении состояния перекрытия"},{name:"scroll:y:end",description:"Срабатывает при прокрутке содержимого в самый конец по y-оси"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/host/components/modal-sidebar/UiModalSidebar.vue"]};const _e={style:{height:"1500px"}},Ce={key:0,style:{"margin-top":"16px"}},u=J({__name:"UiModalSidebar.example",props:{buttonTitle:{type:String,default:""},hasNesting:{type:Boolean,default:!1},footer:{type:Boolean,default:!1}},setup(i){const n=S(!1),t=S(!1);return(d,o)=>(N(),G("div",null,[m(y,{onClick:o[0]||(o[0]=s=>n.value=!0)},{default:c(()=>[f(xe(i.buttonTitle),1)]),_:1}),m(w,ge({opened:n.value,"onUpdate:opened":o[6]||(o[6]=s=>n.value=s)},d.$attrs),je({title:c(()=>[o[7]||(o[7]=f(" Заголовок "))]),default:c(()=>[b("div",_e,[o[12]||(o[12]=b("div",null,"Контент высотой 1500px",-1)),i.hasNesting?(N(),G("div",Ce,[m(y,{onClick:o[1]||(o[1]=s=>t.value=!0)},{default:c(()=>o[8]||(o[8]=[f(" Вложенная шторка ")])),_:1}),m(w,{opened:t.value,"onUpdate:opened":o[3]||(o[3]=s=>t.value=s),onCloseSidebar:o[4]||(o[4]=s=>t.value=!1)},{title:c(()=>o[9]||(o[9]=[f(" Header ")])),footer:c(()=>[m(y,{onClick:o[2]||(o[2]=s=>t.value=!1)},{default:c(()=>o[10]||(o[10]=[f(" Закрыть ")])),_:1})]),default:c(()=>[o[11]||(o[11]=b("div",{style:{height:"1500px"}},[b("div",null,"Some content"),b("div",null,"Вложенная шторка")],-1))]),_:1},8,["opened"])])):be("",!0)])]),_:2},[i.footer?{name:"footer",fn:c(()=>[m(y,{onClick:o[5]||(o[5]=s=>n.value=!1)},{default:c(()=>o[13]||(o[13]=[f(" Закрыть ")])),_:1})]),key:"0"}:void 0]),1040,["opened"])]))}});u.__docgenInfo={exportName:"default",displayName:"UiModalSidebar.example",description:"",tags:{},props:[{name:"buttonTitle",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"hasNesting",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"footer",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiModalSidebar.example.vue"]};function H(i){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...W(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{id:"uimodalsidebar",children:"UiModalSidebar"}),`
`,e.jsx(n.p,{children:"Выдвигаемая боковая панель для размещения дополнительных настроек или информации"}),`
`,e.jsx(n.h2,{id:"api",children:"API"}),`
`,e.jsx(n.h3,{id:"виды-панелей",children:"Виды панелей"}),`
`,e.jsxs(n.p,{children:["Стандартная панель выводится справа и бывает двух размеров: ",e.jsx(n.code,{children:"sm — 416 px"})," и ",e.jsx(n.code,{children:"lg — 720 px"}),`. Выбор размера определяется
типом его контента. Это могут быть дополнительные настройки для параметров на странице, а также информационный материал
по новым сущностям.`]}),`
`,e.jsxs("div",{style:{display:"flex",columnGap:"16px"},children:[e.jsx(h,{is:u,buttonTitle:"Стандартная панель (sm)"}),e.jsx(h,{is:u,buttonTitle:"Стандартная панель (lg)",size:"lg"})]}),`
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
`]})]})}function Me(i={}){const{wrapper:n}={...W(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(H,{...i})}):H(i)}const De={title:"Components/UiModalSidebar",component:w,args:{direction:v.RIGHT,fixed:!1,scrolling:p.NORMAL,size:x.SM},argTypes:{opened:{control:!1},id:{control:!1},direction:{control:"select",options:Object.values(v)},scrolling:{control:"select",options:Object.values(p)},size:{control:"select",options:Object.values(x)}},render:i=>({components:{UiButton:y,UiModalSidebar:w},setup(){return{args:i,opened:S(!1)}},template:`
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
    `}),parameters:{docs:{page:Me},layout:"centered"}},O={};var P,X,Y;O.parameters={...O.parameters,docs:{...(P=O.parameters)==null?void 0:P.docs,source:{originalSource:"{}",...(Y=(X=O.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};const $e=["Sandbox"];export{O as Sandbox,$e as __namedExportsOrder,De as default};
