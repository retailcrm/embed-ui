import{d as D,B as ee,r as N,e as J,w as I,D as re,E as ce,G as pe,H as ue,I as me,J as fe,f as C,b as he,o as u,v as U,K as ve,L as xe,M as je,c as y,a as M,g as c,m as W,u as L,h as $,q as b,j as O,s as ye,k as g,t as we,N as ge}from"./vue.esm-bundler-CQrfiSSv.js";import{_ as k}from"./UiButton-BJXjJHpx.js";import{_ as ne}from"./UiScrollBox-BKMGK419.js";import{_ as K}from"./UiTransition-CpMEyXWm.js";import{e as oe}from"./utils-CFz3IpAA.js";import{u as le,l as S,n as Y,M as be}from"./transition-CMogtaMj.js";import{I as Te}from"./clear-CbwQ9CLB.js";import{j as e}from"./jsx-runtime-DQFc-wkB.js";import{useMDXComponents as se}from"./index-BjypYOp6.js";import{T as x}from"./ToReact-CLtYD5oI.js";import"./predicate-ClulhfEu.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-C_1tOEKP.js";import"./preview-BpQv_JBL.js";var p=(l=>(l.ALERT="alert",l.DIALOG="dialog",l.POPUP="popup",l.HINT="hint",l))(p||{}),T=(l=>(l.NORMAL="normal",l.NATIVE="native",l))(T||{});const ie=D({__name:"UiModalWindowSurface",props:{id:{type:String,default:()=>le("embed-modal-window")},opened:{type:Boolean,default:!0},closable:{type:Boolean,default:!0},appearance:{type:String,validator:l=>oe(l).toBeOneOf(p),default:p.POPUP},fullscreen:{type:Boolean,default:!1},responsive:{type:Boolean,default:!1},disposeTimeout:{type:null,default:5e3},scrolling:{type:String,validator:l=>Object.values(T).includes(l),default:T.NORMAL}},emits:["open","close","close-cancel","shown","showing","hidden","hiding","scroll:y","scroll:y:end","update:opened","update:overlapped"],setup(l,{expose:n,emit:m}){const t=l,o=m,d=he(be,null),i=ee({attached:!1,shown:!1,hiding:!1,detachTimer:null,overlapped:!1}),A=N(null),w=J(()=>({id:t.id,isBlocker:()=>!0,isOverlapped:()=>i.overlapped,setIsOverlapped:a=>{i.overlapped!==a&&(i.overlapped=a,o("update:overlapped",a))},emitEscape:()=>{i.overlapped||R()}})),j=N("hidden"),s=N("hidden"),r=J(()=>{switch(!0){case(j.value==="shown"&&s.value==="shown"):return"shown";case(j.value==="showing"||s.value==="showing"):return"showing";case(j.value==="hiding"||s.value==="hiding"):return"hiding"}return"hidden"}),f=()=>{S.remove(w.value),i.attached=!1},G=()=>{i.detachTimer===null&&(i.detachTimer=setTimeout(()=>f(),t.disposeTimeout?Number(t.disposeTimeout):0))},H=()=>{i.detachTimer!==null&&(clearTimeout(i.detachTimer),i.detachTimer=null)},V=async()=>{i.hiding=!1,H(),!i.shown&&(S.remove(w.value),S.add(w.value),S.start(),i.attached=!0,await Y(),await Y(),i.hiding||(i.shown=!0,o("update:opened",!0),o("open")))},B=()=>{if(i.hiding=!0,!i.shown){i.attached&&G();return}i.shown=!1,o("update:opened",!1),o("close"),S.remove(w.value),H(),G()},R=(a=void 0)=>{const h=a==null?void 0:a.target;h!=null&&h.closest(".ps__thumb-y")||(t.closable?B():o("close-cancel"))};n({open:V,close:R}),I(()=>t.id,(a,h)=>S.replace(h,w.value)),I(()=>t.opened,a=>a?V():B()),I(()=>r.value,(a,h)=>{a!==h&&(a==="shown"?o("shown"):a==="showing"?o("showing"):a==="hidden"?o("hidden"):a==="hiding"&&o("hiding"))}),re(()=>{t.opened&&V(),o("update:overlapped",i.overlapped)}),ce(()=>t.opened?V():B()),pe(B),ue(()=>{B(),f()});const z=me(),ae=fe(),de=()=>{const a=t.appearance;return U(K,{name:"zoom",onBeforeEnter:()=>s.value="showing",onAfterEnter:()=>s.value="shown",onBeforeLeave:()=>s.value="hiding",onAfterLeave:()=>s.value="hidden"},()=>i.shown?U("div",{ref:A,class:{"ui-v1-modal-window":!0,"ui-v1-modal-window_alert":a===p.ALERT,"ui-v1-modal-window_dialog":a===p.DIALOG,"ui-v1-modal-window_popup":a===p.POPUP,"ui-v1-modal-window_hint":a===p.HINT,"ui-v1-popper-container":!0}},ae):[])},F=a=>{a.target===a.currentTarget&&!i.overlapped&&R(a)},te=()=>i.attached?U(je,{to:(d==null?void 0:d.container)??document.body},U(K,{name:"fade-2",onBeforeEnter:()=>j.value="showing",onAfterEnter:()=>j.value="shown",onBeforeLeave:()=>j.value="hiding",onAfterLeave:()=>j.value="hidden"},{default:()=>ve(U("div",{id:t.id,"aria-hidden":r.value!=="shown"?"true":"false","aria-modal":"true",...z,class:[z.class,{"ui-v1-modal":!0,"ui-v1-modal_overlapped":i.overlapped}],onClick:F},U(ne,{class:{"ui-v1-modal-window-container":!0,"ui-v1-modal-window-container_fullscreen":t.fullscreen,"ui-v1-modal-window-container_responsive":t.responsive&&t.appearance===p.POPUP},showOnMac:!0,native:t.scrolling===T.NATIVE,onClick:F,onPsYReachEnd:a=>o("scroll:y:end",a),onScroll:a=>{var h,X;i.overlapped||o("scroll:y",a,((X=(h=A.value)==null?void 0:h.getBoundingClientRect())==null?void 0:X.toJSON())??null)}},{default:de})),[[xe,i.shown]])})):void 0;return(a,h)=>(u(),C(te))}});ie.__docgenInfo={exportName:"default",displayName:"UiModalWindowSurface",description:"",tags:{},expose:[{name:"open"},{name:"close"}],props:[{name:"id",description:"Атрибут id корневого элемента модального окна. Должен быть уникальным на странице",type:{name:"string"},defaultValue:{func:!0,value:"() => uid('embed-modal-window')"}},{name:"opened",description:"Открыто/закрыто",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"closable",description:"Закрываемое. Возможность закрыть модальное окно",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"appearance",description:"Внешний вид",type:{name:"APPEARANCE"},defaultValue:{func:!1,value:"APPEARANCE.POPUP"}},{name:"fullscreen",description:"Вывод на весь экран",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"responsive",description:`Резиновое. Размещено в центре страницы. Отступы от любой границы составляет 32 px.
Резиновое окно не может выходить за пределы области просмотра, так как контент прокручивается внутри него.
Шапка и футер у данного типа окна закреплены и не прокручиваются.
При достижении ширины 1 680 px окно перестает увеличиваться и фиксируется по центру браузера.`,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disposeTimeout",description:"Время, через которое плавающий элемент удаляется со страницы, если был скрыт",type:{name:"number|string|null"},defaultValue:{func:!1,value:"5000"}},{name:"scrolling",description:"Тип прокрутки",type:{name:"SCROLLING"},defaultValue:{func:!1,value:"SCROLLING.NORMAL"}}],events:[{name:"open",description:"Срабатывает при открытии"},{name:"close",description:"Срабатывает при закрытии"},{name:"close-cancel",description:"Срабатывает при отмене закрытия"},{name:"shown",description:"Срабатывает при завершении раскрытия"},{name:"showing",description:"Срабатывает в начале раскрытия"},{name:"hidden",description:"Срабатывает при завершении сокрытия"},{name:"hiding",description:"Срабатывает в начале сокрытия"},{name:"scroll:y",description:"Срабатывает при прокрутке контейнера по оси y *"},{name:"scroll:y:end",description:"Срабатывает при прокрутке контейнера в самый конец по оси y *"},{name:"update:opened",description:"Обновление флага видимости"},{name:"update:overlapped",description:"Срабатывает при изменении состояния перекрытия"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/host/components/modal-window/UiModalWindowSurface.vue"]};const Oe={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"};function Ue(l,n){return u(),y("svg",Oe,n[0]||(n[0]=[M("path",{fill:"currentColor","fill-rule":"evenodd",d:"M22.905 19.63 12.813 2.37a.76.76 0 0 0-.65-.37h-.3a.76.76 0 0 0-.65.37L1.1 19.63a.79.79 0 0 0 0 .76l.14.23a.73.73 0 0 0 .65.38h20.225a.73.73 0 0 0 .65-.38l.14-.23a.79.79 0 0 0 0-.76m-9.902-3.13a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5zm-.47-3.5a.25.25 0 0 0 .25-.22l.4-3.22a.5.5 0 0 0-.5-.56h-1.36a.5.5 0 0 0-.5.56l.4 3.22a.25.25 0 0 0 .25.22z","clip-rule":"evenodd"},null,-1)]))}const Le={render:Ue},$e={key:0,class:"ui-v1-modal-window__icon"},Se=["id"],ke={key:1,class:"ui-v1-modal-window__content"},Me={key:2,class:"ui-v1-modal-window__footer"},Ne={key:0,class:"ui-v1-modal-window__footer-text"},P=D({__name:"UiModalWindow",props:{id:{type:String,default:()=>le("embed-modal-window")},opened:{type:Boolean,default:!0},closable:{type:Boolean,default:!0},appearance:{type:String,validator:l=>oe(l).toBeOneOf(p),default:p.POPUP},disposeTimeout:{type:null,default:5e3},fullscreen:{type:Boolean,default:!1},responsive:{type:Boolean,default:!1},scrolling:{type:String,validator:l=>Object.values(T).includes(l),default:T.NORMAL}},emits:["update:opened","toggle","open","opened","close","closed","close-cancel","container:scroll:y","container:scroll:y:end","content:scroll:y:end"],setup(l,{expose:n,emit:m}){const t=l,o=m,d=ee({opened:t.opened,scrolled:!1,overlapped:!1}),i=s=>{d.opened!==s&&(d.opened=s,o("update:opened",s),o("toggle",s),o(s?"open":"close"))},A=()=>i(!0),w=()=>{t.closable?i(!1):o("close-cancel")},j=(s,r)=>{o("container:scroll:y",s,r),r&&(d.scrolled=r.top<=0)};return n({open:A,close:w}),I(()=>t.opened,i),(s,r)=>(u(),C(ie,W({id:l.id,opened:d.opened,closable:l.closable,appearance:l.appearance,fullscreen:l.fullscreen,responsive:l.responsive,"dispose-timeout":l.disposeTimeout,scrolling:l.scrolling},{...s.$attrs,...s.$slots.title?{"aria-labelledby":l.id+"-title"}:{}},{"onUpdate:opened":i,"onUpdate:overlapped":r[2]||(r[2]=f=>d.overlapped=f),onCloseCancel:r[3]||(r[3]=f=>s.$emit("close-cancel")),onShown:r[4]||(r[4]=f=>s.$emit("opened")),onHidden:r[5]||(r[5]=f=>s.$emit("closed")),"onScroll:y":j,"onScroll:y:end":r[6]||(r[6]=f=>s.$emit("container:scroll:y:end",f))}),{default:c(()=>[M("div",{class:ye({"ui-v1-modal-window__header":!0,"ui-v1-modal-window__header_pinned":s.$slots.title&&d.scrolled&&l.appearance===L(p).POPUP&&!l.responsive})},[l.appearance===L(p).ALERT?(u(),y("div",$e,[$(s.$slots,"icon",{overlapped:d.overlapped},()=>[b(L(Le))])])):O("",!0),s.$slots.title?(u(),y("div",{key:1,id:l.id+"-title",class:"ui-v1-modal-window__title"},[$(s.$slots,"title",{overlapped:d.overlapped})],8,Se)):O("",!0),l.appearance!==L(p).ALERT?(u(),y("div",{key:2,"aria-label":"Esc",class:"ui-v1-modal-window__close",role:"button",onClick:r[0]||(r[0]=f=>d.overlapped?null:w())},[b(L(Te),{title:"Esc",style:{width:"100%"}})])):O("",!0)],2),l.responsive?(u(),C(ne,{key:0,class:"ui-v1-modal-window__content","show-on-mac":"",onPsYReachEnd:r[1]||(r[1]=f=>s.$emit("content:scroll:y:end"))},{default:c(()=>[$(s.$slots,"default",{overlapped:d.overlapped})]),_:3})):(u(),y("div",ke,[$(s.$slots,"default",{overlapped:d.overlapped})])),s.$slots.footer?(u(),y("div",Me,[l.appearance===L(p).HINT?(u(),y("div",Ne,[$(s.$slots,"footer",{overlapped:d.overlapped})])):$(s.$slots,"footer",{key:1,overlapped:d.overlapped})])):O("",!0)]),_:3},16,["id","opened","closable","appearance","fullscreen","responsive","dispose-timeout","scrolling"]))}});P.__docgenInfo={exportName:"default",displayName:"UiModalWindow",description:"",tags:{},expose:[{name:"open"},{name:"close"}],props:[{name:"id",description:"Атрибут id корневого элемента модального окна. Должен быть уникальным на странице",type:{name:"string"},defaultValue:{func:!0,value:"() => uid('embed-modal-window')"}},{name:"opened",description:"Открыто/закрыто",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"closable",description:"Закрываемое. Возможность закрыть модальное окно",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"appearance",description:"Внешний вид: алерт, диалог, popup, hint",type:{name:"APPEARANCE"},defaultValue:{func:!1,value:"APPEARANCE.POPUP"}},{name:"disposeTimeout",description:"Время, через которое плавающий элемент удаляется со страницы, если был скрыт",type:{name:"number|string|null"},defaultValue:{func:!1,value:"5000"}},{name:"fullscreen",description:"Вывод на весь экран",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"responsive",description:`Резиновое. Размещено в центре страницы. Отступы от любой границы составляет 32 px.
Резиновое не может выходить за пределы браузера, так как контент прокручивается внутри него.
Шапка и футер у данного типа окна закреплены и не прокручиваются.
При достижении ширины 1 680 px окно перестает увеличиваться и фиксируется по центру браузера.`,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"scrolling",description:"Тип прокрутки",type:{name:"SCROLLING"},defaultValue:{func:!1,value:"SCROLLING.NORMAL"}}],events:[{name:"close-cancel",description:"Срабатывает при отмене закрытия"},{name:"opened",description:"Срабатывает при завершении открытия"},{name:"closed",description:"Срабатывает при завершении закрытия"},{name:"container:scroll:y:end",description:"Срабатывает при прокрутке контейнера в самый конец по y-оси"},{name:"content:scroll:y:end",description:"Срабатывает при прокрутке контента в самый конец по y-оси"},{name:"update:opened",description:"Срабатывает при открытии/закрытии"},{name:"toggle",description:"Срабатывает при открытии/закрытии"},{name:"open",description:"Срабатывает при открытии"},{name:"close",description:"Срабатывает при закрытии"},{name:"container:scroll:y",description:"Срабатывает при прокрутке контейнера"}],slots:[{name:"icon",scoped:!0,description:"Иконка слева от заголовка",bindings:[{name:"overlapped",title:"binding"}]},{name:"title",scoped:!0,description:"Заголовок",bindings:[{name:"overlapped",title:"binding"}]},{name:"default",scoped:!0,description:"Основная разметка",bindings:[{name:"overlapped",title:"binding"}]},{name:"footer",scoped:!0,description:"Разметка подвала",bindings:[{name:"overlapped",title:"binding"}]}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/host/components/modal-window/UiModalWindow.vue"]};const Pe={key:0,style:{"margin-top":"16px"}},v=D({__name:"UiModalWindow.example",props:{buttonTitle:{type:String,default:""},hasNesting:{type:Boolean,default:!1},nestedOnSameLevel:{type:Boolean,default:!1}},setup(l){const n=N(!1),m=N(!1);return(t,o)=>(u(),y("div",null,[b(k,{appearance:"secondary",onClick:o[0]||(o[0]=d=>n.value=!0)},{default:c(()=>[g(we(l.buttonTitle),1)]),_:1}),b(P,W({opened:n.value,"onUpdate:opened":o[5]||(o[5]=d=>n.value=d)},t.$attrs),{title:c(()=>o[8]||(o[8]=[g(" Заголовок ")])),footer:c(()=>[b(k,{appearance:"secondary",onClick:o[4]||(o[4]=d=>n.value=!1)},{default:c(()=>o[14]||(o[14]=[g(" Закрыть ")])),_:1})]),default:c(()=>[M("div",{style:ge(t.$attrs.appearance=="popup"?{height:"1500px"}:{})},[o[13]||(o[13]=M("div",null,"Некоторый контент",-1)),l.hasNesting?(u(),y("div",Pe,[b(k,{appearance:"secondary",onClick:o[1]||(o[1]=d=>m.value=!0)},{default:c(()=>o[9]||(o[9]=[g(" Открыть вложенное окно ")])),_:1}),l.nestedOnSameLevel?O("",!0):(u(),C(P,{key:0,opened:m.value,"onUpdate:opened":o[3]||(o[3]=d=>m.value=d),responsive:""},{title:c(()=>o[10]||(o[10]=[g(" Вложенное окно ")])),footer:c(()=>[b(k,{appearance:"secondary",onClick:o[2]||(o[2]=d=>m.value=!1)},{default:c(()=>o[11]||(o[11]=[g(" Закрыть ")])),_:1})]),default:c(()=>[o[12]||(o[12]=M("p",null,"Некоторый контент",-1))]),_:1},8,["opened"]))])):O("",!0)],4)]),_:1},16,["opened"]),l.nestedOnSameLevel?(u(),C(P,W({key:0,opened:m.value,"onUpdate:opened":o[7]||(o[7]=d=>m.value=d)},t.$attrs,{responsive:""}),{title:c(()=>o[15]||(o[15]=[g(" Вложенное на одном уровне окно ")])),footer:c(()=>[b(k,{appearance:"secondary",onClick:o[6]||(o[6]=d=>m.value=!1)},{default:c(()=>o[16]||(o[16]=[g(" Закрыть ")])),_:1})]),default:c(()=>[o[17]||(o[17]=M("p",null,"Некоторый контент",-1))]),_:1},16,["opened"])):O("",!0)]))}});v.__docgenInfo={exportName:"default",displayName:"UiModalWindow.example",description:"",tags:{},props:[{name:"buttonTitle",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"hasNesting",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"nestedOnSameLevel",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiModalWindow.example.vue"]};function q(l){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...se(),...l.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{id:"uimodalwindow",children:"UiModalWindow"}),`
`,e.jsx(n.p,{children:"Модальное окно, используемое для создания диалоговых окон и отдельных слоев интерфейса."}),`
`,e.jsx(n.h2,{id:"общие-правила",children:"Общие правила"}),`
`,e.jsxs(n.p,{children:["Модальное окно всегда появляется на полупрозрачной подложке ",e.jsx(n.code,{children:"#2D336C (40%)"}),`. Клик по ней приводит к закрытию окна.
Страница под окном не должна прокручиваться.`]}),`
`,e.jsx(n.p,{children:"В системе используется следующие типы модальных окон:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Фиксированное окно с шириной ",e.jsx(n.code,{children:"880px"}),`. Если модальное окно умещается в размеры области просмотра, оно всегда отображается по центру.
Размер окна по ширине никогда не меняется и не адаптируется при изменении разрешения, и всегда составляет `,e.jsx(n.code,{children:"880px"}),`.
Высота окна может меняться в зависимости от содержания.`]}),`
`,e.jsxs(n.p,{children:["Если высота окна больше высоты области просмотра, то от верхней границы браузера оставляется отступ ",e.jsx(n.code,{children:"56px"}),`, а нижняя
граница уходит за пределы нижней границы браузера. Во время прокрутки, за `,e.jsx(n.code,{children:"24px"}),` до достижения верхней границы браузера,
шапка модального окна закрепляется.`]}),`
`,e.jsxs(n.p,{children:[`Футер при прокрутке закреплен в нижней части экрана. Когда контент окна полностью прокручен, футер приподнимается на
`,e.jsx(n.code,{children:"56px"}),";"]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Фиксированное окно с шириной ",e.jsx(n.code,{children:"720px"})," и высотой ",e.jsx(n.code,{children:"466px"}),`. Отображается при клике на объект-триггер и закрываются кликом
на крестик в углу или за пределами всплывающей подсказки. Крестик в углу по умолчанию должен быть белого цвета с
прозрачностью `,e.jsx(n.code,{children:"60%"}),", а при наведении без прозрачности."]}),`
`,e.jsxs(n.p,{children:["Компонент всегда появляется на полупрозрачной подложке ",e.jsx(n.code,{children:"#2D336C (40%)"}),`. Клик по ней приводит к закрытию окна.
Страница под окном не должна прокручиваться.`]}),`
`,e.jsxs(n.p,{children:["Текст внизу может быть не более ",e.jsx(n.code,{children:"2"})," строчек;"]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Фиксированное с шириной ",e.jsx(n.code,{children:"464px"}),", для диалоговых окон;"]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Резиновое с шириной ",e.jsx(n.code,{children:"100%"}),`, для полноценных слоев сложного интерфейса. Размещается в центре страницы. Отступы от любой
границы составляет `,e.jsx(n.code,{children:"32px"}),`. Не может выходить за пределы браузера, так как контент прокручивается внутри него.
Шапка и футер у данного типа окна закреплены и не прокручиваются. При достижении ширины `,e.jsx(n.code,{children:"1680px"}),` окно перестает
увеличиваться и фиксируется по центру браузера.`]}),`
`]}),`
`]}),`
`,e.jsxs(n.p,{children:["Если нужно модальное окно меньшего размера, то лучше использовать компонент ",e.jsx(n.code,{children:"UiModalSidebar"}),"."]}),`
`,e.jsx(n.h2,{id:"api",children:"API"}),`
`,e.jsx(n.h3,{id:"виды-модальных-окон",children:"Виды модальных окон"}),`
`,e.jsx(n.p,{children:"Предусмотрены следующие виды модальных окон:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"alert"}),` — отображает простое сообщение пользователю. Часто используется для уведомлений, предупреждений или запроса подтверждения,
вывода информации. Окно с фиксированной шириной — `,e.jsx(n.code,{children:"464px"}),";"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"dialog"})," — отображает диалоговое окно на веб-странице. В отличие ",e.jsx(n.code,{children:"alert"}),` предоставляет более гибкие функциональные возможности
для взаимодействия с пользователем, включая поддержку кнопок и формы для ввода данных. Окно с фиксированной шириной — `,e.jsx(n.code,{children:"464px"}),";"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"popup"}),` — базовый вид модального окна, используемый для уведомления, предоставления формы ввода данных и других важных взаимодействий.
Окно с фиксированной шириной — `,e.jsx(n.code,{children:"880px"}),";"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"hint"}),` — отображает подсказочное окно, используемое когда одного текстового описания во всплывающей подсказке не достаточно
и нужно наглядно показать, где находится объект. Не является фокусируемым и не может содержать интерактивные элементы для взаимодействия.
Окно с фиксированными шириной — `,e.jsx(n.code,{children:"720px"})," и высотой — ",e.jsx(n.code,{children:"466px"}),"."]}),`
`]}),`
`,e.jsxs(n.p,{children:[`Каждый вид модальных окон блокирует дальнейшее взаимодействие со страницей, пока пользователь не закроет его.
Чтобы использовать одну из визуализаций, необходимо передать в свойство `,e.jsx(n.code,{children:"appearance"})," одно из вышеперечисленных значений."]}),`
`,e.jsxs("div",{style:{display:"flex",columnGap:"16px",paddingLeft:"16px"},children:[e.jsx(x,{is:v,buttonTitle:"Alert",appearance:"alert"}),e.jsx(x,{is:v,buttonTitle:"Dialog",appearance:"dialog"}),e.jsx(x,{is:v,buttonTitle:"Popup",appearance:"popup"}),e.jsx(x,{is:v,buttonTitle:"Hint",appearance:"hint"})]}),`
`,e.jsx(n.h3,{id:"управление-состоянием",children:"Управление состоянием"}),`
`,e.jsx(n.p,{children:"Модальное окно может быть закрыто:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["нажатием на иконку закрытия, либо клавишей ",e.jsx(n.code,{children:"Esc"}),";"]}),`
`,e.jsxs(n.li,{children:["смена состояния флага ",e.jsx(n.code,{children:"opened"}),";"]}),`
`,e.jsx(n.li,{children:"кликом вне области панели."}),`
`]}),`
`,e.jsxs(n.p,{children:["При необходимости можно запретить закрывать модальное окно вышеперечисленными способами, если выключить флаг ",e.jsx(n.code,{children:"closable"}),`. Тогда
окно будет оставаться в открытом состоянии до тех пор, пока не станет вновь закрываемой.`]}),`
`,e.jsxs(n.p,{children:["Для настройки времени удаления плавающего элемента со страницы, если он был скрыт, используется свойство ",e.jsx(n.code,{children:"disposeTimeout"}),`.
Значение задаётся в миллисекундах, поддерживаются как числа, так и строковые форматы.`]}),`
`,e.jsxs(n.p,{children:["Для модальных окон вида ",e.jsx(n.code,{children:"popup"}),` предусмотрено поведения перехода из модального окна в полноэкранный режим посредством включения
флага `,e.jsx(n.code,{children:"fullscreen"}),"."]}),`
`,e.jsx(x,{is:v,buttonTitle:"Модальное окно в полноэкранном режиме",appearance:"popup",style:{paddingLeft:"16px"},fullscreen:!0}),`
`,e.jsx(n.h3,{id:"прокрутка",children:"Прокрутка"}),`
`,e.jsxs(n.p,{children:[`В базовом поведении при прокрутке шапка фиксируется сверху и не прокручивается. Но если для модального окна включён флаг
`,e.jsx(n.code,{children:"responsive"}),', то окно становится "резиновым", то есть:']}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["размещается в центре страницы и отступы от любой границы составляет ",e.jsx(n.code,{children:"32px"}),";"]}),`
`,e.jsx(n.li,{children:"не может выходить за пределы браузера, так как контент прокручивается внутри него;"}),`
`,e.jsx(n.li,{children:"шапка и футер закреплены и не прокручиваются;"}),`
`,e.jsxs(n.li,{children:["при достижении ширины ",e.jsx(n.code,{children:"1680px"})," окно перестает увеличиваться и фиксируется по центру браузера."]}),`
`]}),`
`,e.jsxs("div",{style:{display:"flex",columnGap:"16px",paddingLeft:"16px"},children:[e.jsx(x,{is:v,buttonTitle:"Стандартное модальное окно",appearance:"popup"}),e.jsx(x,{is:v,buttonTitle:"Резиновое модальное окно",appearance:"popup",responsive:!0})]}),`
`,e.jsxs(n.p,{children:[`По-умолчанию, содержимое тела модального окна помещается в контейнер, содержащий полосу прокрутки. Данное состояние определяется
свойством `,e.jsx(n.code,{children:"scrolling"})," со значением ",e.jsx(n.code,{children:"normal"}),`. Вид полосы прокрутки можно поменять на стандартный, предоставляемый браузерами.
Для этого необходимо установить значение `,e.jsx(n.code,{children:"native"}),"."]}),`
`,e.jsxs(n.p,{children:["Чтобы отключить прокрутку в модальных окнах, необходимо отключить флаг ",e.jsx(n.code,{children:"responsive"}),"."]}),`
`,e.jsx(n.h3,{id:"вложенность",children:"Вложенность"}),`
`,e.jsxs(n.p,{children:[`Допускается вкладывать компоненты модальных окон друг в друга, при этом вложенные будут "телепортироваться" в конец
контейнера для модальных элементов (по-умолчанию это `,e.jsx(n.code,{children:"document.body"}),")."]}),`
`,e.jsx(x,{is:v,buttonTitle:"Одно окно вложено в другое",style:{paddingLeft:"16px"},hasNesting:!0}),`
`,e.jsx(n.p,{children:"Допустимо расположение окон на одном уровне, но кнопка открытия второго окна находится внутри первого."}),`
`,e.jsx(x,{is:v,buttonTitle:"Вложенное на одном уровне окно",style:{paddingLeft:"16px"},hasNesting:!0,nestedOnSameLevel:!0}),`
`,e.jsxs(n.p,{children:["В качестве дочерних модальных окон можно использовать и другие модальные элементы на основе ",e.jsx(n.code,{children:"UiModal"}),`, например,
`,e.jsx(n.code,{children:"UiModalWindow"}),"."]}),`
`,e.jsx(n.h2,{id:"слоты",children:"Слоты"}),`
`,e.jsxs(n.p,{children:["Для настройки заголовка в шапке модального окна имеется слот ",e.jsx(n.code,{children:"title"}),". Для модального окна вида ",e.jsx(n.code,{children:"alert"}),` предусмотрен
дополнительный слот `,e.jsx(n.code,{children:"icon"}),", позволяющий передать иное изображение слева от заголовка."]}),`
`,e.jsxs(n.p,{children:["Слот ",e.jsx(n.code,{children:"default"})," позволяет передать содержимое тела модального окна."]}),`
`,e.jsxs(n.p,{children:["Футер модального окна отображается, если определён слот ",e.jsx(n.code,{children:"footer"}),`. Чаще всего в нём содержатся кнопки сохранения, отмены и третичные
кнопки копирования и удаления.`]}),`
`,e.jsx(x,{is:v,buttonTitle:"Модальное окно с заданными слотами",appearance:"alert",style:{paddingLeft:"16px"}}),`
`,e.jsx(n.h2,{id:"события",children:"События"}),`
`,e.jsx(n.p,{children:"Компонент генерирует события:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"update:opened"})," — при открытии/закрытии модального окна; содержит актуальное значение флага ",e.jsx(n.code,{children:"opened"}),";"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"toggle"})," — при открытии/закрытии модального окна; содержит актуальное значение флага ",e.jsx(n.code,{children:"opened"}),";"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"open"})," — при открытии модального окна;"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"opened"})," — при завершении открытия модального окна;"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"close"})," — при закрытии модального окна;"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"closed"})," — при завершении закрытия модального окна;"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"close-cancel"})," — при попытке закрыть модальное окно, если флаг ",e.jsx(n.code,{children:"closable"})," выключен;"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"container:scroll:y"})," — при прокрутке контейнера модального окна;"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"container:scroll:y:end"})," — при прокрутке контейнера в самый конец по y-оси;"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"content:scroll:y:end"})," — при прокрутке контента в самый конец по y-оси."]}),`
`]})]})}function Be(l={}){const{wrapper:n}={...se(),...l.components};return n?e.jsx(n,{...l,children:e.jsx(q,{...l})}):q(l)}const Ke={title:"Components/UiModalWindow",component:P,args:{appearance:p.POPUP,scrolling:T.NORMAL},argTypes:{id:{control:!1},opened:{control:!1},appearance:{control:"select",options:Object.values(p)},scrolling:{control:"select",options:Object.values(T)},title:{control:!1},default:{control:!1},footer:{control:!1}},render:l=>({components:{UiButton:k,UiModalWindow:P},setup(){return{args:l,open:N(!1)}},template:`
      <UiButton appearance="secondary" @click="open = true">
        Открыть
      </UiButton>

      <UiModalWindow v-bind="args" v-model:opened="open">
        <template #title>
          Заголовок окна
        </template>

        <div style="height: 1500px;">
          Контент высотой 1500px
        </div>

        <template #footer>
          <UiButton appearance="secondary" @click="open = false">
            Закрыть
          </UiButton>
        </template>
      </UiModalWindow>
    `}),decorators:[()=>({template:'<div style="height: 500px"><story /></div>'})],parameters:{docs:{page:Be},layout:"centered"}},E={};var Q,Z,_;E.parameters={...E.parameters,docs:{...(Q=E.parameters)==null?void 0:Q.docs,source:{originalSource:"{}",...(_=(Z=E.parameters)==null?void 0:Z.docs)==null?void 0:_.source}}};const Ye=["Sandbox"];export{E as Sandbox,Ye as __namedExportsOrder,Ke as default};
