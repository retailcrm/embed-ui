import"./uid-D9qqAqa4.js";/* empty css                   */import{h as C,r as m,c as h,m as d,w as i,v as T,t as M,o as f,C as r,D as k,a as p,y as N}from"./iframe-BYjEGogb.js";import{_ as x}from"./UiButton-C6yEIar9.js";import{_ as j,S as v,a as b,D as g}from"./UiModalSidebar-DraiWNA7.js";import{j as e}from"./jsx-runtime-Dfy-MtVE.js";import{useMDXComponents as S}from"./index-C5taubBi.js";import{T as a}from"./ToReact-C7DAV50X.js";import"./preload-helper-PPVm8Dsz.js";import"./predicate-ClulhfEu.js";import"./composables-uVjbEnId.js";import"./UiScrollBox-DsWR5PhB.js";import"./UiTooltip-CXK5isiW.js";import"./UiPopper-DoFEM--W.js";import"./UiTransition-qP0fXMDk.js";import"./clear-BwvWaMri.js";import"./index-DQhJD0RN.js";const B={style:{height:"1500px"}},O={key:0,style:{"margin-top":"16px"}},t=C({__name:"UiModalSidebar.example",props:{buttonTitle:{type:String,default:""},hasNesting:{type:Boolean,default:!1},footer:{type:Boolean,default:!1}},setup(o){const n=m(!1),c=m(!1);return(U,s)=>(f(),h("div",null,[d(x,{onClick:s[0]||(s[0]=l=>n.value=!0)},{default:i(()=>[r(k(o.buttonTitle),1)]),_:1}),d(j,M({opened:n.value,"onUpdate:opened":s[6]||(s[6]=l=>n.value=l)},U.$attrs),T({title:i(()=>[s[7]||(s[7]=r(" Заголовок ",-1))]),default:i(()=>[p("div",B,[s[12]||(s[12]=p("div",null,"Контент высотой 1500px",-1)),o.hasNesting?(f(),h("div",O,[d(x,{onClick:s[1]||(s[1]=l=>c.value=!0)},{default:i(()=>[...s[8]||(s[8]=[r(" Вложенная шторка ",-1)])]),_:1}),d(j,{opened:c.value,"onUpdate:opened":s[3]||(s[3]=l=>c.value=l),onCloseSidebar:s[4]||(s[4]=l=>c.value=!1)},{title:i(()=>[...s[9]||(s[9]=[r(" Header ",-1)])]),footer:i(()=>[d(x,{onClick:s[2]||(s[2]=l=>c.value=!1)},{default:i(()=>[...s[10]||(s[10]=[r(" Закрыть ",-1)])]),_:1})]),default:i(()=>[s[11]||(s[11]=p("div",{style:{height:"1500px"}},[p("div",null,"Some content"),p("div",null,"Вложенная шторка")],-1))]),_:1},8,["opened"])])):N("",!0)])]),_:2},[o.footer?{name:"footer",fn:i(()=>[d(x,{onClick:s[5]||(s[5]=l=>n.value=!1)},{default:i(()=>[...s[13]||(s[13]=[r(" Закрыть ",-1)])]),_:1})]),key:"0"}:void 0]),1040,["opened"])]))}});t.__docgenInfo={exportName:"default",displayName:"UiModalSidebar.example",description:"",tags:{},props:[{name:"buttonTitle",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"hasNesting",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"footer",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiModalSidebar.example.vue"]};function y(o){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...S(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{id:"uimodalsidebar",children:"UiModalSidebar"}),`
`,e.jsx(n.p,{children:"Выдвигаемая боковая панель для размещения дополнительных настроек или информации"}),`
`,e.jsx(n.h2,{id:"api",children:"API"}),`
`,e.jsx(n.h3,{id:"виды-панелей",children:"Виды панелей"}),`
`,e.jsxs(n.p,{children:["Стандартная панель выводится справа и бывает двух размеров: ",e.jsx(n.code,{children:"sm — 416 px"})," и ",e.jsx(n.code,{children:"lg — 720 px"}),`. Выбор размера определяется
типом его контента. Это могут быть дополнительные настройки для параметров на странице, а также информационный материал
по новым сущностям.`]}),`
`,e.jsx(n.p,{children:"Стандартная панель:"}),`
`,e.jsxs("div",{className:"flex-container gap-4",children:[e.jsx(a,{is:t,buttonTitle:"Открыть (sm)"}),e.jsx(a,{is:t,buttonTitle:"Открыть (lg)",size:"lg"})]}),`
`,e.jsx(n.p,{children:`Профиль — выводится слева, по клику на иконку профиля. На панели показаны данные пользователя, тариф системы и
ссылки на настройки.`}),`
`,e.jsx(a,{is:t,buttonTitle:"Левая панель (sm)",direction:"left"}),`
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
`,e.jsx(a,{is:t,buttonTitle:"Фиксированная панель (sm)",fixed:!0}),`
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
`,e.jsx(a,{is:t,buttonTitle:"Панель со вложенной шторкой (sm)",hasNesting:!0,footer:!0}),`
`,e.jsx(n.h2,{id:"слоты",children:"Слоты"}),`
`,e.jsxs(n.p,{children:["Для настройки внешнего вида заголовка в шапке панели содержится слот ",e.jsx(n.code,{children:"title"}),`. Он позволяет добавлять опционально необходимые
компоненты. Например, если в панели находится многоуровневая настройка, то перед заголовком может быть добавлена иконка для
возврата назад.`]}),`
`,e.jsxs(n.p,{children:["Слот ",e.jsx(n.code,{children:"default"})," позволяет передать содержимое тела панели."]}),`
`,e.jsxs(n.p,{children:["Футер в панели отображается, если определён слот ",e.jsx(n.code,{children:"footer"}),`. Чаще всего в нём содержатся кнопки сохранения, отмены и третичные
кнопки копирования и удаления.`]}),`
`,e.jsx(a,{is:t,buttonTitle:"Панель с заданными слотами",footer:!0}),`
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
`]})]})}function I(o={}){const{wrapper:n}={...S(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(y,{...o})}):y(o)}const J={title:"Components/UiModalSidebar",component:j,args:{direction:g.RIGHT,fixed:!1,scrolling:b.NORMAL,size:v.SM},argTypes:{opened:{control:!1},id:{control:!1},direction:{control:"select",options:Object.values(g)},scrolling:{control:"select",options:Object.values(b)},size:{control:"select",options:Object.values(v)}},render:o=>({components:{UiButton:x,UiModalSidebar:j},setup(){return{args:o,opened:m(!1)}},template:`
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
    `}),parameters:{docs:{page:I},layout:"centered"}},u={};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:"{}",...u.parameters?.docs?.source}}};const K=["Sandbox"];export{u as Sandbox,K as __namedExportsOrder,J as default};
