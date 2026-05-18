import"./uid-BWdYvJYd.js";/* empty css                   */import{o as m,c as f,a as i,h as C,k as t,w as l,t as T,u as k,r as v,D as r,E as N,v as _,y as B}from"./iframe-DDyl2AmK.js";import{_ as a}from"./UiButton-DVSNWWSO.js";import{_ as j,S as g,a as b,D as y}from"./UiModalSidebar-CMdnDQBK.js";import{u as U,j as n}from"./index-DC6AVhol.js";import{T as c}from"./ToReact-C7vZiqYZ.js";import{_ as w}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./preload-helper-PPVm8Dsz.js";import"./predicate-ClulhfEu.js";import"./render-CFCB9hDK.js";import"./composables-DVi6oeou.js";import"./UiScrollBox-pROz8lVa.js";import"./UiTooltip-CgKFebDj.js";import"./UiPopper-CtyW38v3.js";import"./UiTransition-C_SZL8sB.js";import"./clear-DNT8teyS.js";import"./index-CDnKqZOh.js";const I={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"};function O(o,e){return m(),f("svg",I,[...e[0]||(e[0]=[i("path",{fill:"currentColor","fill-rule":"evenodd",d:"M20 5.5v-1a.5.5 0 0 0-.5-.5H15V3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1H4.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5M7.87 22a2 2 0 0 1-2-1.86L5 8h14l-.85 12.14a2 2 0 0 1-2 1.86z","clip-rule":"evenodd"},null,-1)])])}const $={render:O},D={style:{height:"1500px"}},E={key:0,style:{"margin-top":"16px"}},V={class:"footer"},R={class:"footer__main"},L={class:"footer__second"},h=C({__name:"UiModalSidebar.example",props:{buttonTitle:{type:String,default:""},hasNesting:{type:Boolean,default:!1},footer:{type:Boolean,default:!1}},setup(o){const e=v(!1),x=v(!1);return(M,s)=>(m(),f("div",null,[t(a,{onClick:s[0]||(s[0]=d=>e.value=!0)},{default:l(()=>[r(N(o.buttonTitle),1)]),_:1}),t(j,k({opened:e.value,"onUpdate:opened":s[6]||(s[6]=d=>e.value=d)},M.$attrs),T({title:l(()=>[s[7]||(s[7]=r(" Заголовок ",-1))]),default:l(()=>[i("div",D,[s[12]||(s[12]=i("div",null,"Контент высотой 1500px",-1)),o.hasNesting?(m(),f("div",E,[t(a,{onClick:s[1]||(s[1]=d=>x.value=!0)},{default:l(()=>[...s[8]||(s[8]=[r(" Вложенная шторка ",-1)])]),_:1}),t(j,{opened:x.value,"onUpdate:opened":s[3]||(s[3]=d=>x.value=d),onCloseSidebar:s[4]||(s[4]=d=>x.value=!1)},{title:l(()=>[...s[9]||(s[9]=[r(" Header ",-1)])]),footer:l(()=>[t(a,{onClick:s[2]||(s[2]=d=>x.value=!1)},{default:l(()=>[...s[10]||(s[10]=[r(" Закрыть ",-1)])]),_:1})]),default:l(()=>[s[11]||(s[11]=i("div",{style:{height:"1500px"}},[i("div",null,"Some content"),i("div",null,"Вложенная шторка")],-1))]),_:1},8,["opened"])])):B("",!0)])]),_:2},[o.footer?{name:"footer",fn:l(()=>[i("div",V,[i("div",R,[t(a,null,{default:l(()=>[...s[13]||(s[13]=[r(" Открыть ",-1)])]),_:1}),t(a,{appearance:"secondary",onClick:s[5]||(s[5]=d=>e.value=!1)},{default:l(()=>[...s[14]||(s[14]=[r(" Закрыть ",-1)])]),_:1})]),i("div",L,[t(a,{class:"button-delete",variant:"danger",appearance:"tertiary"},{default:l(()=>[t(_($),{class:"icon-delete","aria-hidden":"true"})]),_:1})])])]),key:"0"}:void 0]),1040,["opened"])]))}}),p=w(h,[["__scopeId","data-v-fd97e69d"]]);h.__docgenInfo=Object.assign({displayName:h.name??h.__name},{exportName:"default",displayName:"UiModalSidebar.example",description:"",tags:{},props:[{name:"buttonTitle",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"hasNesting",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"footer",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiModalSidebar.example.vue"]});function S(o){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...U(),...o.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{id:"uimodalsidebar",children:"UiModalSidebar"}),`
`,n.jsx(e.p,{children:"Выдвигаемая боковая панель для размещения дополнительных настроек или информации"}),`
`,n.jsx(e.h2,{id:"api",children:"API"}),`
`,n.jsx(e.h3,{id:"виды-панелей",children:"Виды панелей"}),`
`,n.jsxs(e.p,{children:["Стандартная панель выводится справа и бывает двух размеров: ",n.jsx(e.code,{children:"sm — 416 px"})," и ",n.jsx(e.code,{children:"lg — 720 px"}),`. Выбор размера определяется
типом его контента. Это могут быть дополнительные настройки для параметров на странице, а также информационный материал
по новым сущностям.`]}),`
`,n.jsx(e.p,{children:"Стандартная панель:"}),`
`,n.jsxs("div",{className:"flex-container gap-4",children:[n.jsx(c,{is:p,buttonTitle:"Открыть (sm)"}),n.jsx(c,{is:p,buttonTitle:"Открыть (lg)",size:"lg"})]}),`
`,n.jsx(e.p,{children:`Профиль — выводится слева, по клику на иконку профиля. На панели показаны данные пользователя, тариф системы и
ссылки на настройки.`}),`
`,n.jsx(c,{is:p,buttonTitle:"Левая панель (sm)",direction:"left"}),`
`,n.jsx(e.h3,{id:"управление-состоянием",children:"Управление состоянием"}),`
`,n.jsx(e.p,{children:"Панель можно закрыть:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["нажатием на иконку закрытия панели, либо клавишей ",n.jsx(e.code,{children:"Esc"}),";"]}),`
`,n.jsxs(e.li,{children:["смена состояния флага ",n.jsx(e.code,{children:"opened"}),";"]}),`
`,n.jsx(e.li,{children:"кликом вне области панели, если панель является блокирующей. Такая панель имеет затемнённую подложку."}),`
`]}),`
`,n.jsxs(e.p,{children:["При необходимости можно запретить закрывать панель вышеперечисленными способами, если выключить флаг ",n.jsx(e.code,{children:"closable"}),`. Тогда
панель будет оставаться в открытом состоянии до тех пор, пока не станет вновь закрываемой.`]}),`
`,n.jsxs(e.p,{children:["Для настройки времени удаления плавающего элемента со страницы, если он был скрыт, используется свойство ",n.jsx(e.code,{children:"disposeTimeout"}),`.
Значение задаётся в миллисекундах, поддерживаются как числа, так и строковые форматы.`]}),`
`,n.jsx(e.h3,{id:"прокрутка",children:"Прокрутка"}),`
`,n.jsxs(e.p,{children:[`При прокрутке шапка и футер закреплены и прокручивается только контент в теле панели. Если панель не блокирующая, то есть
для неё не установлен флаг `,n.jsx(e.code,{children:"fixed"}),`, то можно прокручивать и панель, и страницу по отдельности в зависимости от положения
курсора.`]}),`
`,n.jsx(c,{is:p,buttonTitle:"Фиксированная панель (sm)",direction:"left",fixed:!0}),`
`,n.jsxs(e.p,{children:[`По-умолчанию, содержимое тела панели помещается в контейнер со скроллом. Данное состояние определяется свойством
`,n.jsx(e.code,{children:"scrolling"})," со значением ",n.jsx(e.code,{children:"normal"}),`. Вид полосы прокрутки можно поменять на стандартный, предоставляемый браузерами.
Для этого необходимо установить значение `,n.jsx(e.code,{children:"native"}),"."]}),`
`,n.jsxs(e.p,{children:["Чтобы отключить прокрутку для контента в теле панели не обходимо установить значение ",n.jsx(e.code,{children:"none"}),"."]}),`
`,n.jsx(e.h3,{id:"информационная-панель",children:"Информационная панель"}),`
`,n.jsx(e.p,{children:`Панель с пояснениями для настроек. Не блокируют контент, чтобы пользователь одновременно изучал материал и применял
полученные знания на странице. В таких панелях могут быть тексты, элементы интерфейса и скриншоты.`}),`
`,n.jsx(e.h3,{id:"вложенность",children:"Вложенность"}),`
`,n.jsxs(e.p,{children:["В качестве дочерних модальных окон можно использовать и другие модальные элементы на основе ",n.jsx(e.code,{children:"UiModal"}),`, например,
`,n.jsx(e.code,{children:"UiModalWindow"})]}),`
`,n.jsx(c,{is:p,buttonTitle:"Панель со вложенной шторкой (sm)",hasNesting:!0,footer:!0}),`
`,n.jsx(e.h2,{id:"слоты",children:"Слоты"}),`
`,n.jsxs(e.p,{children:["Для настройки внешнего вида заголовка в шапке панели содержится слот ",n.jsx(e.code,{children:"title"}),`. Он позволяет добавлять опционально необходимые
компоненты. Например, если в панели находится многоуровневая настройка, то перед заголовком может быть добавлена иконка для
возврата назад.`]}),`
`,n.jsxs(e.p,{children:["Слот ",n.jsx(e.code,{children:"default"})," позволяет передать содержимое тела панели."]}),`
`,n.jsxs(e.p,{children:["Футер в панели отображается, если определён слот ",n.jsx(e.code,{children:"footer"}),`. Чаще всего в нём содержатся кнопки сохранения, отмены и третичные
кнопки копирования и удаления.`]}),`
`,n.jsx(c,{is:p,buttonTitle:"Панель с заданными слотами",footer:!0}),`
`,n.jsx(e.h2,{id:"события",children:"События"}),`
`,n.jsx(e.p,{children:"Компонент генерирует события:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"open"})," — при открытии панели;"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"close"})," — при закрытии панели. Содержит данные о методе закрытия, а именно при клике по кнопке закрытия (",n.jsx(e.code,{children:"Cross"}),`),
при клике на область вне панели (`,n.jsx(e.code,{children:"Outside"}),") или по событию esc (",n.jsx(e.code,{children:"Esc"}),");"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"close-cancel"}),"— при попытке закрыть панель, если флаг ",n.jsx(e.code,{children:"closable"})," выключен. Содержит данные о методе закрытия;"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"toggle"})," — при раскрытии и закрытии панели. Содержит актуальное значение флага ",n.jsx(e.code,{children:"opened"}),";"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"shown"})," — при завершении раскрытия;"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"showing"})," — в начале раскрытия;"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"hidden"})," — при завершении сокрытия;"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"hiding"})," — в начале сокрытия;"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"update:opened"})," — при изменении значения флага ",n.jsx(e.code,{children:"opened"}),";"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"update:overlapped"})," — при изменении состояния перекрытия;"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"scroll:y:end"})," — при прокрутке содержимого в самый конец по y-оси."]}),`
`]})]})}function z(o={}){const{wrapper:e}={...U(),...o.components};return e?n.jsx(e,{...o,children:n.jsx(S,{...o})}):S(o)}const te={title:"Components/UiModalSidebar",component:j,args:{direction:y.RIGHT,fixed:!1,scrolling:b.NORMAL,size:g.SM},argTypes:{opened:{control:!1},id:{control:!1},direction:{control:"select",options:Object.values(y)},scrolling:{control:"select",options:Object.values(b)},size:{control:"select",options:Object.values(g)}},render:o=>({components:{UiButton:a,UiModalSidebar:j},setup(){return{args:o,opened:v(!1)}},template:`
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
    `}),parameters:{docs:{page:z},layout:"centered"}},u={};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:"{}",...u.parameters?.docs?.source}}};const ie=["Sandbox"];export{u as Sandbox,ie as __namedExportsOrder,te as default};
