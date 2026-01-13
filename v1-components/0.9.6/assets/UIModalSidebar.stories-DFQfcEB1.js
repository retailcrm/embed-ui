import{g as X,H as q,r as y,h as V,J as F,K as ee,L as ne,M as ie,N as oe,j as G,s as U,z as c,w as r,u as v,O as se,i as le,o as j,P as te,a as u,m as Y,c as k,A as de,k as N,t as h,Q as ae,x as re,v as ce}from"./iframe-D39tYAK0.js";import{_ as $}from"./UiButton-DA_3skNz.js";import{_ as ue}from"./UiScrollBox-DIhgFHrz.js";import{_ as H}from"./UiTransition-CjGPWdxw.js";import{_ as pe}from"./UiTooltip-CTn_ZbiQ.js";import{I as me}from"./clear-BR2afO7D.js";import{u as fe,l as C,n as _,M as ve}from"./transition-BQSkoN76.js";import{j as e}from"./index-Djyvt97q.js";import{useMDXComponents as J}from"./index-Cdf3Trmt.js";import{T as b}from"./ToReact-CufppUms.js";import"./preload-helper-PPVm8Dsz.js";import"./predicate-ClulhfEu.js";import"./composables-B4JUJzYp.js";import"./UiPopper-BXPSOLxj.js";import"./index-B44Kv34C.js";var B=(i=>(i.CLICK_CROSS="Cross",i.CLICK_OUTSIDE="Outside",i.KEY_ESC="Esc",i))(B||{}),w=(i=>(i.LEFT="left",i.RIGHT="right",i))(w||{}),g=(i=>(i.NORMAL="normal",i.NATIVE="native",i.NONE="none",i))(g||{}),S=(i=>(i.LG="lg",i.SM="sm",i))(S||{});const he=["id","aria-hidden"],xe=["id"],je={class:"ui-v1-modal-sidebar__header"},ge={class:"ui-v1-modal-sidebar__header-inner"},be={"aria-level":"1",class:"ui-v1-modal-sidebar__title",role:"heading"},ye={key:0,class:"ui-v1-modal-sidebar__body-fixed"},we={key:2,class:"ui-v1-modal-sidebar__footer"},M=X({inheritAttrs:!1,__name:"UiModalSidebar",props:{id:{type:String,default:()=>fe("embed-modal-sidebar")},opened:{type:Boolean,default:!1},closable:{type:Boolean,default:!0},direction:{type:String,validator:i=>Object.values(w).includes(i),default:w.RIGHT},disposeTimeout:{type:null,default:5e3},fixed:{type:Boolean,default:!1},scrolling:{type:String,validator:i=>Object.values(g).includes(i),default:g.NORMAL},size:{type:String,default:S.SM}},emits:["open","close","close-cancel","toggle","shown","showing","hidden","hiding","update:opened","update:overlapped","scroll:y:end"],setup(i,{emit:n}){const a=i,d=n,s=le(ve,null),o=q({attached:!1,shown:!1,hiding:!1,detachTimer:null,overlapped:!1}),A=y(null),Q=V(()=>A),E=V(()=>({id:a.id,isBlocker:()=>!a.fixed,isOverlapped:()=>o.overlapped,setIsOverlapped:l=>{o.overlapped!==l&&(o.overlapped=l,d("update:overlapped",l))},emitEscape:()=>{o.overlapped||L(B.KEY_ESC)}})),m=y("hidden"),f=y("hidden"),R=V(()=>{switch(!0){case(m.value==="shown"&&f.value==="shown"):return"shown";case(m.value==="showing"||f.value==="showing"):return"showing";case(m.value==="hiding"||f.value==="hiding"):return"hiding"}return"hidden"}),z=()=>{C.remove(E.value),o.attached=!1},D=()=>{o.detachTimer===null&&(o.detachTimer=setTimeout(()=>z(),a.disposeTimeout?Number(a.disposeTimeout):0))},K=()=>{o.detachTimer!==null&&(clearTimeout(o.detachTimer),o.detachTimer=null)},I=async()=>{o.hiding=!1,K(),!o.shown&&(C.remove(E.value),C.add(E.value),C.start(),o.attached=!0,await _(),await _(),o.hiding||(o.shown=!0,d("update:opened",!0),d("toggle",!0),d("open")))},T=(l=void 0)=>{if(o.hiding=!0,!o.shown){o.attached&&D();return}o.shown=!1,d("update:opened",!1),d("toggle",!1),d("close",l),C.remove(E.value),K(),D()},L=(l=void 0)=>{a.closable?T(l):d("close-cancel",l)};F(()=>a.opened,l=>l?I():T()),F(()=>R.value,(l,t)=>{l!==t&&(l==="shown"?d("shown"):l==="showing"?d("showing"):l==="hidden"?d("hidden"):l==="hiding"&&d("hiding"))}),ee(()=>{a.opened&&I(),d("update:overlapped",o.overlapped)}),ne(()=>a.opened?I():T()),ie(T),oe(()=>{T(),z()});const W=l=>{l.target===l.currentTarget&&!o.overlapped&&L(B.CLICK_OUTSIDE)},Z=()=>{o.overlapped||L(B.CLICK_CROSS)};return(l,t)=>o.attached?(j(),G(se,{key:0,to:v(s)?.container||"body"},[c(H,{name:"fade-2",onBeforeEnter:t[5]||(t[5]=p=>m.value="showing"),onAfterEnter:t[6]||(t[6]=p=>m.value="shown"),onBeforeLeave:t[7]||(t[7]=p=>m.value="hiding"),onAfterLeave:t[8]||(t[8]=p=>m.value="hidden")},{default:r(()=>[te(u("div",Y({id:i.id,"aria-hidden":R.value!=="shown"?"true":"false",class:[l.$attrs.class,{"ui-v1-modal":!0,"ui-v1-modal_overlapped":o.overlapped,"ui-v1-modal-sidebar-overlay":!0,"ui-v1-modal-sidebar-overlay_fixed":i.fixed,[`ui-v1-modal-sidebar-overlay_${i.direction}`]:i.fixed}],"aria-modal":"true"},l.$attrs,{onClick:W}),[c(H,{name:`slide-${i.direction}`,onBeforeEnter:t[1]||(t[1]=p=>f.value="showing"),onAfterEnter:t[2]||(t[2]=p=>f.value="shown"),onBeforeLeave:t[3]||(t[3]=p=>f.value="hiding"),onAfterLeave:t[4]||(t[4]=p=>f.value="hidden")},{default:r(()=>[o.shown?(j(),k("aside",{key:0,id:i.id+"-sidebar",class:de({"ui-v1-modal-sidebar":!0,"ui-v1-modal-sidebar_left":i.direction===v(w).LEFT,"ui-v1-modal-sidebar_size_sm":i.size===v(S).SM,"ui-v1-modal-sidebar_size_lg":i.size===v(S).LG})},[u("header",je,[u("div",ge,[u("div",be,[N(l.$slots,"title",{overlapped:o.overlapped})])]),u("div",{ref_key:"closer",ref:A,"aria-label":"Esc",class:"ui-v1-modal-sidebar__close",role:"button",onClick:Z},[c(v(me),{"aria-hidden":"true",width:"32"}),c(pe,{target:Q.value,"offset-main-axis":0},{default:r(()=>[...t[9]||(t[9]=[h(" Esc ",-1)])]),_:1},8,["target"])],512)]),i.scrolling===v(g).NONE?(j(),k("div",ye,[N(l.$slots,"default",{overlapped:o.overlapped})])):(j(),G(ue,{key:1,native:i.scrolling===v(g).NATIVE,class:"ui-v1-modal-sidebar__body","show-on-mac":"",onPsYReachEnd:t[0]||(t[0]=p=>l.$emit("scroll:y:end"))},{default:r(()=>[N(l.$slots,"default",{overlapped:o.overlapped})]),_:3},8,["native"])),"footer"in l.$slots?(j(),k("footer",we,[N(l.$slots,"footer",{overlapped:o.overlapped})])):U("",!0)],10,xe)):U("",!0)]),_:3},8,["name"])],16,he),[[ae,o.shown]])]),_:3})],8,["to"])):U("",!0)}});M.__docgenInfo={exportName:"default",displayName:"UiModalSidebar",description:"",tags:{},props:[{name:"id",description:"Атрибут id корневого элемента. Должен быть уникальным на странице",type:{name:"string"},defaultValue:{func:!0,value:"() => uid('embed-modal-sidebar')"}},{name:"opened",description:"Флаг управления раскрытием панели",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"closable",description:"Флаг, указывающий, можно ли закрыть панель",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"direction",description:"Определяет направление появления панели",type:{name:"DIRECTION"},defaultValue:{func:!1,value:"DIRECTION.RIGHT"}},{name:"disposeTimeout",description:"Время, через которое плавающий элемент удаляется со страницы, если был скрыт",type:{name:"number|string|null"},defaultValue:{func:!1,value:"5000"}},{name:"fixed",description:"Флаг, задающий фиксированную панель без подложки",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"scrolling",description:"Тип прокрутки",type:{name:"SCROLLING"},defaultValue:{func:!1,value:"SCROLLING.NORMAL"}},{name:"size",description:"Размер панели",type:{name:"SIZE"},defaultValue:{func:!1,value:"SIZE.SM"}}],events:[{name:"scroll:y:end",description:"Срабатывает при прокрутке содержимого в самый конец по y-оси"},{name:"open",description:"Срабатывает при открытии панели"},{name:"close",description:"Срабатывает при закрытии панели. Содержит данные о методе закрытия CLOSE_METHOD из @omnica/modal-sidebar"},{name:"close-cancel",description:`Срабатывает при попытке закрыть панели, если флаг closable выставлен в false.
Содержит данные о методе закрытия CLOSE_METHOD из @omnica/modal-sidebar`},{name:"toggle",description:"Срабатывает при раскрытии и закрытии панели, содержит актуальное значение флага opened"},{name:"shown",description:"Срабатывает при завершении раскрытия"},{name:"showing",description:"Срабатывает в начале раскрытия"},{name:"hidden",description:"Срабатывает при завершении сокрытия"},{name:"hiding",description:"Срабатывает в начале сокрытия"},{name:"update:opened",description:"Изменение значения флага opened"},{name:"update:overlapped",description:"Срабатывает при изменении состояния перекрытия"}],slots:[{name:"title",scoped:!0,bindings:[{name:"overlapped",title:"binding"}]},{name:"default",scoped:!0,bindings:[{name:"overlapped",title:"binding"}]},{name:"footer",scoped:!0,bindings:[{name:"overlapped",title:"binding"}]}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/host/components/modal-sidebar/UiModalSidebar.vue"]};const Se={style:{height:"1500px"}},Te={key:0,style:{"margin-top":"16px"}},x=X({__name:"UiModalSidebar.example",props:{buttonTitle:{type:String,default:""},hasNesting:{type:Boolean,default:!1},footer:{type:Boolean,default:!1}},setup(i){const n=y(!1),a=y(!1);return(d,s)=>(j(),k("div",null,[c($,{onClick:s[0]||(s[0]=o=>n.value=!0)},{default:r(()=>[h(ce(i.buttonTitle),1)]),_:1}),c(M,Y({opened:n.value,"onUpdate:opened":s[6]||(s[6]=o=>n.value=o)},d.$attrs),re({title:r(()=>[s[7]||(s[7]=h(" Заголовок ",-1))]),default:r(()=>[u("div",Se,[s[12]||(s[12]=u("div",null,"Контент высотой 1500px",-1)),i.hasNesting?(j(),k("div",Te,[c($,{onClick:s[1]||(s[1]=o=>a.value=!0)},{default:r(()=>[...s[8]||(s[8]=[h(" Вложенная шторка ",-1)])]),_:1}),c(M,{opened:a.value,"onUpdate:opened":s[3]||(s[3]=o=>a.value=o),onCloseSidebar:s[4]||(s[4]=o=>a.value=!1)},{title:r(()=>[...s[9]||(s[9]=[h(" Header ",-1)])]),footer:r(()=>[c($,{onClick:s[2]||(s[2]=o=>a.value=!1)},{default:r(()=>[...s[10]||(s[10]=[h(" Закрыть ",-1)])]),_:1})]),default:r(()=>[s[11]||(s[11]=u("div",{style:{height:"1500px"}},[u("div",null,"Some content"),u("div",null,"Вложенная шторка")],-1))]),_:1},8,["opened"])])):U("",!0)])]),_:2},[i.footer?{name:"footer",fn:r(()=>[c($,{onClick:s[5]||(s[5]=o=>n.value=!1)},{default:r(()=>[...s[13]||(s[13]=[h(" Закрыть ",-1)])]),_:1})]),key:"0"}:void 0]),1040,["opened"])]))}});x.__docgenInfo={exportName:"default",displayName:"UiModalSidebar.example",description:"",tags:{},props:[{name:"buttonTitle",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"hasNesting",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"footer",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiModalSidebar.example.vue"]};function P(i){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...J(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{id:"uimodalsidebar",children:"UiModalSidebar"}),`
`,e.jsx(n.p,{children:"Выдвигаемая боковая панель для размещения дополнительных настроек или информации"}),`
`,e.jsx(n.h2,{id:"api",children:"API"}),`
`,e.jsx(n.h3,{id:"виды-панелей",children:"Виды панелей"}),`
`,e.jsxs(n.p,{children:["Стандартная панель выводится справа и бывает двух размеров: ",e.jsx(n.code,{children:"sm — 416 px"})," и ",e.jsx(n.code,{children:"lg — 720 px"}),`. Выбор размера определяется
типом его контента. Это могут быть дополнительные настройки для параметров на странице, а также информационный материал
по новым сущностям.`]}),`
`,e.jsx(n.p,{children:"Стандартная панель:"}),`
`,e.jsxs("div",{className:"flex-container gap-4",children:[e.jsx(b,{is:x,buttonTitle:"Открыть (sm)"}),e.jsx(b,{is:x,buttonTitle:"Открыть (lg)",size:"lg"})]}),`
`,e.jsx(n.p,{children:`Профиль — выводится слева, по клику на иконку профиля. На панели показаны данные пользователя, тариф системы и
ссылки на настройки.`}),`
`,e.jsx(b,{is:x,buttonTitle:"Левая панель (sm)",direction:"left"}),`
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
`,e.jsx(b,{is:x,buttonTitle:"Фиксированная панель (sm)",fixed:!0}),`
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
`,e.jsx(b,{is:x,buttonTitle:"Панель со вложенной шторкой (sm)",hasNesting:!0,footer:!0}),`
`,e.jsx(n.h2,{id:"слоты",children:"Слоты"}),`
`,e.jsxs(n.p,{children:["Для настройки внешнего вида заголовка в шапке панели содержится слот ",e.jsx(n.code,{children:"title"}),`. Он позволяет добавлять опционально необходимые
компоненты. Например, если в панели находится многоуровневая настройка, то перед заголовком может быть добавлена иконка для
возврата назад.`]}),`
`,e.jsxs(n.p,{children:["Слот ",e.jsx(n.code,{children:"default"})," позволяет передать содержимое тела панели."]}),`
`,e.jsxs(n.p,{children:["Футер в панели отображается, если определён слот ",e.jsx(n.code,{children:"footer"}),`. Чаще всего в нём содержатся кнопки сохранения, отмены и третичные
кнопки копирования и удаления.`]}),`
`,e.jsx(b,{is:x,buttonTitle:"Панель с заданными слотами",footer:!0}),`
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
`]})]})}function Ce(i={}){const{wrapper:n}={...J(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(P,{...i})}):P(i)}const Ke={title:"Components/UiModalSidebar",component:M,args:{direction:w.RIGHT,fixed:!1,scrolling:g.NORMAL,size:S.SM},argTypes:{opened:{control:!1},id:{control:!1},direction:{control:"select",options:Object.values(w)},scrolling:{control:"select",options:Object.values(g)},size:{control:"select",options:Object.values(S)}},render:i=>({components:{UiButton:$,UiModalSidebar:M},setup(){return{args:i,opened:y(!1)}},template:`
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
    `}),parameters:{docs:{page:Ce},layout:"centered"}},O={};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:"{}",...O.parameters?.docs?.source}}};const Fe=["Sandbox"];export{O as Sandbox,Fe as __namedExportsOrder,Ke as default};
