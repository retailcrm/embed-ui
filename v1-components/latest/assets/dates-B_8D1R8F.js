import{j as e}from"./jsx-runtime-N83kn9-W.js";import{useMDXComponents as c}from"./index-g1djAheZ.js";import"./_commonjsHelpers-Cpj98o6Y.js";function r(d){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...c(),...d.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{id:"функции-форматирования-даты-и-времени",children:"Функции форматирования даты и времени"}),`
`,e.jsxs(n.p,{children:["В этой документации описывается работа функций ",e.jsx(n.code,{children:"formatDate()"}),", ",e.jsx(n.code,{children:"formatDateTime()"})," и ",e.jsx(n.code,{children:"formatTime()"}),"."]}),`
`,e.jsx(n.h2,{id:"formatdatevalue-locale",children:"formatDate(value, locale?)"}),`
`,e.jsxs(n.p,{children:["Функция ",e.jsx(n.code,{children:"formatDate()"})," форматирует даты в соответствии с текущими настройками локализации. Принимает два параметра:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"date"})," – объект ",e.jsx(n.code,{children:"Date"})," или строка в формате, распознаваемым методом ",e.jsx(n.code,{children:"Date.parse"}),";"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"locale"})," – локаль, используемая для форматирования; поддерживаются ",e.jsx(n.code,{children:"'en-GB'"}),", ",e.jsx(n.code,{children:"'es-ES'"}),", и ",e.jsx(n.code,{children:"'ru-RU'"}),`,
по-умолчанию `,e.jsx(n.code,{children:"'en-GB'"}),"; Также можно указать ",e.jsx(n.code,{children:"undefined"})," чтобы использовалась локаль по-умолчанию;"]}),`
`]}),`
`,e.jsx(n.h3,{id:"примеры",children:"Примеры"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`formatDate(new Date('2024-01-22'), 'en-GB') // "22/01/24"
formatDate(new Date('2024-01-22'), 'es-ES') // "22/01/24"
formatDate(new Date('2024-01-22'), 'ru-RU') // "22.01.24"
`})}),`
`,e.jsx(n.h3,{id:"шаблоны-форматирования-по-локалям",children:"Шаблоны форматирования по локалям"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Локаль"}),e.jsx(n.th,{children:"Стандартный формат"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"en-GB"})}),e.jsx(n.td,{children:"dd/mm/yy"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"es-ES"})}),e.jsx(n.td,{children:"dd/mm/yy"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"ru-RU"})}),e.jsx(n.td,{children:"dd.mm.yy"})]})]})]}),`
`,e.jsx(n.h2,{id:"formatdatetimevalue-locale",children:"formatDateTime(value, locale?)"}),`
`,e.jsxs(n.p,{children:["Функция ",e.jsx(n.code,{children:"formatDateTime()"})," объединяет форматирование даты и времени. Аргументы функции такие же, как и у ",e.jsx(n.code,{children:"formatDate"}),`.
Использует формат даты в соответствии с локалью и добавляет время в 24-часовом формате.`]}),`
`,e.jsx(n.h3,{id:"примеры-1",children:"Примеры"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`formatDateTime(new Date('2024-01-22'), 'en-GB') // Вернёт "22/01/24 15:30"
formatDateTime(new Date('2024-01-22'), 'es-ES') // Вернёт "22/01/24 15:30"
formatDateTime(new Date('2024-01-22'), 'ru-RU') // "22.01.24 15:30"
`})}),`
`,e.jsx(n.h2,{id:"formattimevalue",children:"formatTime(value)"}),`
`,e.jsxs(n.p,{children:["Функция ",e.jsx(n.code,{children:"formatTime()"})," форматирует время в 24-часовом формате (HH:mm)."]}),`
`,e.jsx(n.h3,{id:"параметры",children:"Параметры"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"date"})," – объект ",e.jsx(n.code,{children:"Date"})," или строка в формате, распознаваемым методом ",e.jsx(n.code,{children:"Date.parse"}),";"]}),`
`]}),`
`,e.jsx(n.h3,{id:"примеры-2",children:"Примеры"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`formatTime(new Date('2024-01-22 15:30:00')) // "15:30"
formatTime('2024-01-22 15:30:00') // "15:30"

// С невалидными значениями
formatTime(null) // Вернёт ""
formatTime(undefined) // Вернёт ""
`})})]})}function l(d={}){const{wrapper:n}={...c(),...d.components};return n?e.jsx(n,{...d,children:e.jsx(r,{...d})}):r(d)}export{l as default};
