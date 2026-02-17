import{g as M,r as v,c as y,m as a,q as g,v as f,w as l,t as b,o as j,z as t,A as N,a as h,N as w}from"./iframe-CzwIxcDt.js";import{_ as p}from"./UiButton-Ba4gqCS2.js";import{_ as x,S as U,A as T}from"./UiModalWindow-79d6q6uo.js";import{j as e}from"./index-Djyvt97q.js";import{useMDXComponents as C}from"./index-Cdf3Trmt.js";import{T as r}from"./ToReact-rGZD6-Z2.js";import"./uid-DZnMQ8Rh.js";/* empty css                   */import"./preload-helper-PPVm8Dsz.js";import"./predicate-ClulhfEu.js";import"./composables-B2GYaaEv.js";import"./UiScrollBox-Z6nXCOaZ.js";import"./UiTransition-Kg8ZojDG.js";import"./utils-BqzVSXwn.js";import"./clear-CbqGf0q6.js";import"./index-B44Kv34C.js";const L={key:0,style:{"margin-top":"16px"}},i=M({__name:"UiModalWindow.example",props:{buttonTitle:{type:String,default:""},hasNesting:{type:Boolean,default:!1},nestedOnSameLevel:{type:Boolean,default:!1}},setup(d){const n=v(!1),c=v(!1);return(m,s)=>(j(),y("div",null,[a(p,{appearance:"secondary",onClick:s[0]||(s[0]=o=>n.value=!0)},{default:l(()=>[t(N(d.buttonTitle),1)]),_:1}),a(x,b({opened:n.value,"onUpdate:opened":s[5]||(s[5]=o=>n.value=o)},m.$attrs),{title:l(()=>[...s[8]||(s[8]=[t(" Заголовок ",-1)])]),footer:l(()=>[a(p,{appearance:"secondary",onClick:s[4]||(s[4]=o=>n.value=!1)},{default:l(()=>[...s[14]||(s[14]=[t(" Закрыть ",-1)])]),_:1})]),default:l(()=>[h("div",{style:w(m.$attrs.appearance=="popup"?{height:"1500px"}:{})},[s[13]||(s[13]=h("div",null,"Некоторый контент",-1)),d.hasNesting?(j(),y("div",L,[a(p,{appearance:"secondary",onClick:s[1]||(s[1]=o=>c.value=!0)},{default:l(()=>[...s[9]||(s[9]=[t(" Открыть вложенное окно ",-1)])]),_:1}),d.nestedOnSameLevel?f("",!0):(j(),g(x,{key:0,opened:c.value,"onUpdate:opened":s[3]||(s[3]=o=>c.value=o),responsive:""},{title:l(()=>[...s[10]||(s[10]=[t(" Вложенное окно ",-1)])]),footer:l(()=>[a(p,{appearance:"secondary",onClick:s[2]||(s[2]=o=>c.value=!1)},{default:l(()=>[...s[11]||(s[11]=[t(" Закрыть ",-1)])]),_:1})]),default:l(()=>[s[12]||(s[12]=h("p",null,"Некоторый контент",-1))]),_:1},8,["opened"]))])):f("",!0)],4)]),_:1},16,["opened"]),d.nestedOnSameLevel?(j(),g(x,b({key:0,opened:c.value,"onUpdate:opened":s[7]||(s[7]=o=>c.value=o)},m.$attrs,{responsive:""}),{title:l(()=>[...s[15]||(s[15]=[t(" Вложенное на одном уровне окно ",-1)])]),footer:l(()=>[a(p,{appearance:"secondary",onClick:s[6]||(s[6]=o=>c.value=!1)},{default:l(()=>[...s[16]||(s[16]=[t(" Закрыть ",-1)])]),_:1})]),default:l(()=>[s[17]||(s[17]=h("p",null,"Некоторый контент",-1))]),_:1},16,["opened"])):f("",!0)]))}});i.__docgenInfo={exportName:"default",displayName:"UiModalWindow.example",description:"",tags:{},props:[{name:"buttonTitle",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"hasNesting",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"nestedOnSameLevel",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiModalWindow.example.vue"]};function k(d){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...C(),...d.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{id:"uimodalwindow",children:"UiModalWindow"}),`
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
`,e.jsxs("div",{style:{display:"flex",columnGap:"16px",paddingLeft:"16px"},children:[e.jsx(r,{is:i,buttonTitle:"Alert",appearance:"alert"}),e.jsx(r,{is:i,buttonTitle:"Dialog",appearance:"dialog"}),e.jsx(r,{is:i,buttonTitle:"Popup",appearance:"popup"}),e.jsx(r,{is:i,buttonTitle:"Hint",appearance:"hint"})]}),`
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
`,e.jsx(r,{is:i,buttonTitle:"Модальное окно в полноэкранном режиме",appearance:"popup",style:{paddingLeft:"16px"},fullscreen:!0}),`
`,e.jsx(n.h3,{id:"прокрутка",children:"Прокрутка"}),`
`,e.jsxs(n.p,{children:[`В базовом поведении при прокрутке шапка фиксируется сверху и не прокручивается. Но если для модального окна включён флаг
`,e.jsx(n.code,{children:"responsive"}),', то окно становится "резиновым", то есть:']}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["размещается в центре страницы и отступы от любой границы составляет ",e.jsx(n.code,{children:"32px"}),";"]}),`
`,e.jsx(n.li,{children:"не может выходить за пределы браузера, так как контент прокручивается внутри него;"}),`
`,e.jsx(n.li,{children:"шапка и футер закреплены и не прокручиваются;"}),`
`,e.jsxs(n.li,{children:["при достижении ширины ",e.jsx(n.code,{children:"1680px"})," окно перестает увеличиваться и фиксируется по центру браузера."]}),`
`]}),`
`,e.jsxs("div",{style:{display:"flex",columnGap:"16px",paddingLeft:"16px"},children:[e.jsx(r,{is:i,buttonTitle:"Стандартное модальное окно",appearance:"popup"}),e.jsx(r,{is:i,buttonTitle:"Резиновое модальное окно",appearance:"popup",responsive:!0})]}),`
`,e.jsxs(n.p,{children:[`По-умолчанию, содержимое тела модального окна помещается в контейнер, содержащий полосу прокрутки. Данное состояние определяется
свойством `,e.jsx(n.code,{children:"scrolling"})," со значением ",e.jsx(n.code,{children:"normal"}),`. Вид полосы прокрутки можно поменять на стандартный, предоставляемый браузерами.
Для этого необходимо установить значение `,e.jsx(n.code,{children:"native"}),"."]}),`
`,e.jsxs(n.p,{children:["Чтобы отключить прокрутку в модальных окнах, необходимо отключить флаг ",e.jsx(n.code,{children:"responsive"}),"."]}),`
`,e.jsx(n.h3,{id:"вложенность",children:"Вложенность"}),`
`,e.jsxs(n.p,{children:[`Допускается вкладывать компоненты модальных окон друг в друга, при этом вложенные будут "телепортироваться" в конец
контейнера для модальных элементов (по-умолчанию это `,e.jsx(n.code,{children:"document.body"}),")."]}),`
`,e.jsx(r,{is:i,buttonTitle:"Одно окно вложено в другое",style:{paddingLeft:"16px"},hasNesting:!0}),`
`,e.jsx(n.p,{children:"Допустимо расположение окон на одном уровне, но кнопка открытия второго окна находится внутри первого."}),`
`,e.jsx(r,{is:i,buttonTitle:"Вложенное на одном уровне окно",style:{paddingLeft:"16px"},hasNesting:!0,nestedOnSameLevel:!0}),`
`,e.jsxs(n.p,{children:["В качестве дочерних модальных окон можно использовать и другие модальные элементы на основе ",e.jsx(n.code,{children:"UiModal"}),`, например,
`,e.jsx(n.code,{children:"UiModalWindow"}),"."]}),`
`,e.jsx(n.h2,{id:"слоты",children:"Слоты"}),`
`,e.jsxs(n.p,{children:["Для настройки заголовка в шапке модального окна имеется слот ",e.jsx(n.code,{children:"title"}),". Для модального окна вида ",e.jsx(n.code,{children:"alert"}),` предусмотрен
дополнительный слот `,e.jsx(n.code,{children:"icon"}),", позволяющий передать иное изображение слева от заголовка."]}),`
`,e.jsxs(n.p,{children:["Слот ",e.jsx(n.code,{children:"default"})," позволяет передать содержимое тела модального окна."]}),`
`,e.jsxs(n.p,{children:["Футер модального окна отображается, если определён слот ",e.jsx(n.code,{children:"footer"}),`. Чаще всего в нём содержатся кнопки сохранения, отмены и третичные
кнопки копирования и удаления.`]}),`
`,e.jsx(r,{is:i,buttonTitle:"Модальное окно с заданными слотами",appearance:"alert",style:{paddingLeft:"16px"}}),`
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
`]})]})}function S(d={}){const{wrapper:n}={...C(),...d.components};return n?e.jsx(n,{...d,children:e.jsx(k,{...d})}):k(d)}const H={title:"Components/UiModalWindow",component:x,args:{appearance:T.POPUP,scrolling:U.NORMAL},argTypes:{id:{control:!1},opened:{control:!1},appearance:{control:"select",options:Object.values(T)},scrolling:{control:"select",options:Object.values(U)},title:{control:!1},default:{control:!1},footer:{control:!1}},render:d=>({components:{UiButton:p,UiModalWindow:x},setup(){return{args:d,open:v(!1)}},template:`
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
    `}),decorators:[()=>({template:'<div style="height: 500px"><story /></div>'})],parameters:{docs:{page:S},layout:"centered"}},u={};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:"{}",...u.parameters?.docs?.source}}};const J=["Sandbox"];export{u as Sandbox,J as __namedExportsOrder,H as default};
