import{_ as r,I as p,S as t,T as a,a as w}from"./caret-down-HoSqc9tg.js";import{c as I,a as T,o as m,g as U,r as f,q as k,s as B,w as h,t as N,u as s,m as j,h as S}from"./iframe-CzwIxcDt.js";import{o as b}from"./utils-BqzVSXwn.js";import{j as e}from"./index-Djyvt97q.js";import{useMDXComponents as g}from"./index-Cdf3Trmt.js";import{T as d}from"./ToReact-rGZD6-Z2.js";import"./composables-B2GYaaEv.js";import"./index-BAxMPZdI.js";import"./plugin-yyqTwYeo.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B44Kv34C.js";const _={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"};function C(i,n){return m(),I("svg",_,[...n[0]||(n[0]=[T("path",{fill:"currentColor","fill-rule":"evenodd",d:"m16.333 15.072 3.556 3.56a.445.445 0 0 1-.018.613l-.622.623a.445.445 0 0 1-.631 0l-3.556-3.56a2.3 2.3 0 0 1-.266-.32l-.667-.89a6.22 6.22 0 0 1-3.885 1.362A6.232 6.232 0 0 1 7.531 4.613a6.22 6.22 0 0 1 7.572 1.753 6.235 6.235 0 0 1-.04 7.78l.888.614q.209.134.382.312M5.8 10.23c0 2.458 1.99 4.45 4.445 4.45 1.178 0 2.309-.469 3.142-1.303a4.453 4.453 0 0 0-3.142-7.597 4.447 4.447 0 0 0-4.445 4.45","clip-rule":"evenodd"},null,-1)])])}const v={render:C},c=U({__name:"UiTextbox.example",props:{id:{},type:{},value:{default:""},max:{},min:{},step:{},required:{type:Boolean},autocomplete:{},inputmode:{},maxlength:{},decimals:{},size:{},placeholder:{},prefix:{},suffix:{},active:{type:Boolean},autofocus:{type:Boolean},autoselect:{type:Boolean},clearable:{type:Boolean},readonly:{type:Boolean},disabled:{type:Boolean},invalid:{type:Boolean},multiline:{type:Boolean},rows:{},cols:{},outlined:{type:Boolean,default:!0},withLeadingIcon:{type:Boolean,default:!1},withTrailingIcon:{type:Boolean,default:!1}},setup(i){const n=i,o=f(n.value);return(L,x)=>(m(),k(r,N({value:o.value,"onUpdate:value":x[0]||(x[0]=y=>o.value=y)},s(b)(n,["value","withLeadingIcon","withTrailingIcon"])),B({_:2},[i.withLeadingIcon?{name:"leading-icon",fn:h(()=>[j(s(v),{"aria-hidden":"true"})]),key:"0"}:void 0,i.withTrailingIcon?{name:"trailing-icon",fn:h(()=>[j(s(p),{"aria-hidden":"true"})]),key:"1"}:void 0]),1040,["value"]))}});c.__docgenInfo={exportName:"default",displayName:"UiTextbox.example",description:"",tags:{},props:[{name:"value",defaultValue:{func:!1,value:"''"}},{name:"outlined",defaultValue:{func:!1,value:"true"}},{name:"withLeadingIcon",defaultValue:{func:!1,value:"false"}},{name:"withTrailingIcon",defaultValue:{func:!1,value:"false"}}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/storybook/stories/UiTextbox.example.vue"]};function u(i){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",ul:"ul",...g(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{id:"uitextbox",children:"UiTextbox"}),`
`,e.jsx(n.p,{children:`Стандартное поле ввода для текстовых и числовых значений в формах.
Подходит для полей поиска, логина, телефона/email, URL, а также для сумм и количественных значений.`}),`
`,e.jsx(n.p,{children:"Пример:"}),`
`,e.jsx("span",{className:"d-inline-block mb-3",children:e.jsx(d,{is:c,placeholder:"Введите текст"})}),`
`,e.jsx(n.h3,{id:"числовой-ввод-inputmode-numericdecimal",children:"Числовой ввод (inputmode: numeric/decimal)"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"inputmode"})," подсказывает браузеру и ОС, какую раскладку клавиатуры показать, и включает в компоненте ряд ограничений для числового ввода."]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Что показывает клавиатура:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"numeric"})," — цифровая клавиатура без десятичного разделителя (на мобильных). Подходит для целых чисел, количеств, кодов."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"decimal"})," — цифровая клавиатура с десятичным разделителем (на мобильных). Подходит для сумм и дробных значений."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Это только подсказка для браузера: сама по себе не валидирует значение. За ограничения отвечают компонент и свойства ",e.jsx(n.code,{children:"min"}),", ",e.jsx(n.code,{children:"max"}),", ",e.jsx(n.code,{children:"step"}),", ",e.jsx(n.code,{children:"decimals"}),"."]}),`
`,e.jsxs(n.li,{children:["Поведение компонента:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"numeric"})," — это режим ограничения символов:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Разрешены только цифры 0–9, клавиши редактирования (Backspace/Delete/стрелки), сочетания с Ctrl/Cmd."}),`
`,e.jsxs(n.li,{children:["Запрещены минус ",e.jsx(n.code,{children:"-"}),", десятичный разделитель и экспонента ",e.jsx(n.code,{children:"e/E"}),"."]}),`
`,e.jsx(n.li,{children:"Вставка: все нецифровые символы отбрасываются (оставляются только 0–9)."}),`
`,e.jsxs(n.li,{children:["Стрелки ",e.jsx(n.code,{children:"ArrowUp/Down"})," не изменяют значение программно; компонент не применяет числовую семантику."]}),`
`,e.jsxs(n.li,{children:["Свойства ",e.jsx(n.code,{children:"min/max/step/decimals"})," игнорируются и НЕ навешиваются на ",e.jsx(n.code,{children:"<input>"}),"."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"decimal"})," — полноценный числовой ввод с дробями:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Разрешены цифры 0–9, один десятичный разделитель ",e.jsx(n.code,{children:"."}),"; экспонента ",e.jsx(n.code,{children:"e/E"})," блокируется."]}),`
`,e.jsxs(n.li,{children:["Минус ",e.jsx(n.code,{children:"-"})," допустим только в начале и только если ",e.jsx(n.code,{children:"min < 0"}),"."]}),`
`,e.jsxs(n.li,{children:["Вставка: запятая ",e.jsx(n.code,{children:","})," конвертируется в точку ",e.jsx(n.code,{children:"."}),"; лишние точки/символы отбрасываются."]}),`
`,e.jsxs(n.li,{children:["Ведущие нули в целой части нормализуются: ",e.jsx(n.code,{children:"0000"})," → ",e.jsx(n.code,{children:"0"}),", ",e.jsx(n.code,{children:"001"})," → ",e.jsx(n.code,{children:"1"}),", ",e.jsx(n.code,{children:"034.132"})," → ",e.jsx(n.code,{children:"34.132"}),", ",e.jsx(n.code,{children:"-01"})," → ",e.jsx(n.code,{children:"-1"}),". Ноль перед точкой сохраняется только для дробей: ",e.jsx(n.code,{children:"0.1"}),", ",e.jsx(n.code,{children:"-0.32"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"decimals"})," ограничивает число знаков после запятой; лишние знаки обрезаются. Значение ",e.jsx(n.code,{children:"'*'"})," означает «без ограничений»."]}),`
`,e.jsxs(n.li,{children:["Стрелки ",e.jsx(n.code,{children:"ArrowUp/Down"})," изменяют значение на ",e.jsx(n.code,{children:"step"})," с учётом ",e.jsx(n.code,{children:"min/max"}),"; число знаков после запятой сохраняется разумно."]}),`
`,e.jsxs(n.li,{children:["Нативные атрибуты ",e.jsx(n.code,{children:"max/min/step"})," навешиваются на ",e.jsx(n.code,{children:"<input>"})," только в этом режиме."]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Особенности и оговорки:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Десятичный разделитель — точка (",e.jsx(n.code,{children:"."}),"). Вставленная запятая ",e.jsx(n.code,{children:","})," автоматически преобразуется в точку в режиме ",e.jsx(n.code,{children:"decimal"}),"."]}),`
`,e.jsxs(n.li,{children:["Отрицательные числа: явный ввод ",e.jsx(n.code,{children:"-"})," доступен только в ",e.jsx(n.code,{children:"decimal"})," и только в начале, если ",e.jsx(n.code,{children:"min < 0"}),". В ",e.jsx(n.code,{children:"numeric"})," минус запрещён."]}),`
`,e.jsx(n.li,{children:"На desktop визуальная раскладка клавиатуры обычно не меняется: работает именно ограничение ввода внутри компонента."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h4,{id:"автоподбор-и-согласование-inputmode-с-type",children:"Автоподбор и согласование inputmode с type"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Если ",e.jsx(n.code,{children:"inputmode"})," не указан, он автоматически подбирается из ",e.jsx(n.code,{children:"type"}),":"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:'type="email"'})," → ",e.jsx(n.code,{children:'inputmode="email"'})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:'type="tel"'})," (phone) → ",e.jsx(n.code,{children:'inputmode="tel"'})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:'type="search"'})," → ",e.jsx(n.code,{children:'inputmode="search"'})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:'type="url"'})," → ",e.jsx(n.code,{children:'inputmode="url"'})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:'type="text"'})," и ",e.jsx(n.code,{children:'type="password"'})," — без автоподстановки; ",e.jsx(n.code,{children:"inputmode"})," остаётся как есть (можно использовать любые значения, включая ",e.jsx(n.code,{children:"numeric"}),"/",e.jsx(n.code,{children:"decimal"}),")."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Разрешённые сочетания и устранение противоречий:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Для ",e.jsx(n.code,{children:'type="email" | "tel" | "search" | "url"'})," допустимы только ",e.jsx(n.code,{children:"inputmode"})," из набора: ",e.jsx(n.code,{children:"undefined"}),", ",e.jsx(n.code,{children:'"text"'}),", профильное значение (",e.jsx(n.code,{children:'"email"/"tel"/"search"/"url"'})," соответственно)."]}),`
`,e.jsxs(n.li,{children:["Если указано противоречивое значение (например, ",e.jsx(n.code,{children:'type="email"'})," и ",e.jsx(n.code,{children:'inputmode="numeric"'}),"), компонент сбрасывает ",e.jsx(n.code,{children:"inputmode"})," в ",e.jsx(n.code,{children:"undefined"})," (атрибут не навешивается)."]}),`
`,e.jsxs(n.li,{children:["Для ",e.jsx(n.code,{children:'type="text"'})," и ",e.jsx(n.code,{children:'type="password"'})," ограничения не применяются — можно явно указывать ",e.jsx(n.code,{children:"numeric"})," или ",e.jsx(n.code,{children:"decimal"})," для активации соответствующей логики ввода."]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h3,{id:"сочетание-с-uipopper",children:"Сочетание с UiPopper"}),`
`,e.jsxs(n.p,{children:["Данный компонент может служить в качестве цели для ",e.jsx(n.code,{children:"UiPopper"})," без использования ",e.jsx(n.code,{children:"UiPopperTarget"}),"."]}),`
`,e.jsx(n.h2,{id:"api",children:"API"}),`
`,e.jsx(n.h3,{id:"свойства",children:"Свойства"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"id"})," – Уникальный идентификатор поля. Тип: ",e.jsx(n.code,{children:"string | undefined"}),". По умолчанию: ",e.jsx(n.code,{children:"undefined"}),". Примечание: должен начинаться с латинской буквы (валидатор)."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"type"})," – Тип поля. Тип: ",e.jsx(n.code,{children:"'email' | 'password' | 'tel' | 'search' | 'text' | 'url'"}),". По умолчанию: ",e.jsx(n.code,{children:"'text'"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"value"})," – Значение поля. Тип: ",e.jsx(n.code,{children:"string | number | null"}),". По умолчанию: ",e.jsx(n.code,{children:"null"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"max"})," – Нативный атрибут input (максимум для числового ввода). Тип: ",e.jsx(n.code,{children:"number | ${'number'}"}),". По умолчанию: ",e.jsx(n.code,{children:"Infinity"}),". Примечание: должен преобразовываться к числу (валидатор)."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"min"})," – Нативный атрибут input (минимум для числового ввода). Тип: ",e.jsx(n.code,{children:"number | ${number}"}),". По умолчанию: ",e.jsx(n.code,{children:"-Infinity"}),". Примечание: должен преобразовываться к числу (валидатор)."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"step"})," – Нативный атрибут input (шаг для числового ввода). Тип: ",e.jsx(n.code,{children:"number | ${number} | 'any'"}),". По умолчанию: ",e.jsx(n.code,{children:"1"}),". Примечание: либо ",e.jsx(n.code,{children:"'any'"}),", либо число (валидатор)."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"autocomplete"})," – Нативный атрибут input|textarea. Тип: ",e.jsx(n.code,{children:"'on' | 'off'"}),". По умолчанию: ",e.jsx(n.code,{children:"'off'"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"inputmode"})," – Нативный атрибут input|textarea. Тип: ",e.jsx(n.code,{children:"'decimal' | 'email' | 'none' | 'numeric' | 'search' | 'tel' | 'text' | 'url' | undefined"}),". По умолчанию: ",e.jsx(n.code,{children:"undefined"}),". См. раздел «Числовой ввод (inputmode: numeric/decimal)» выше."]}),`
`,e.jsxs(n.li,{children:["Примечание к числовым режимам: при ",e.jsx(n.code,{children:'inputmode="numeric"'})," свойства ",e.jsx(n.code,{children:"min"}),", ",e.jsx(n.code,{children:"max"}),", ",e.jsx(n.code,{children:"step"}),", ",e.jsx(n.code,{children:"decimals"})," игнорируются и НЕ применяются к ",e.jsx(n.code,{children:"<input>"}),"; при ",e.jsx(n.code,{children:'inputmode="decimal"'})," — применяются и участвуют в логике ввода."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"maxlength"})," – Нативный атрибут input|textarea (макс. длина). Тип: ",e.jsx(n.code,{children:"number | string | undefined"}),". По умолчанию: ",e.jsx(n.code,{children:"undefined"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"decimals"})," – Максимальное количество знаков после запятой (для числового ввода). Тип: ",e.jsx(n.code,{children:"number | "}),"$","number",e.jsx(n.code,{children:" | '*'"}),". По умолчанию: ",e.jsx(n.code,{children:"'*'"}),". Примечание: ",e.jsx(n.code,{children:"'*'"})," — без ограничений, ",e.jsx(n.code,{children:"0"})," — только целые."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"size"})," – Размер поля ввода. Тип: ",e.jsx(n.code,{children:"'xs' | 'sm' | 'md' | 'lg' | 'xl'"}),". По умолчанию: ",e.jsx(n.code,{children:"'sm'"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"placeholder"})," – Нативный атрибут input|textarea (плейсхолдер). Тип: ",e.jsx(n.code,{children:"string"}),". По умолчанию: ",e.jsx(n.code,{children:"''"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"prefix"})," – Текст в начале поля ввода. Тип: ",e.jsx(n.code,{children:"string"}),". По умолчанию: ",e.jsx(n.code,{children:"''"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"suffix"})," – Текст в конце поля ввода. Тип: ",e.jsx(n.code,{children:"string"}),". По умолчанию: ",e.jsx(n.code,{children:"''"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"active"})," – Флаг активности, для индикации, что поле задействовано. Тип: ",e.jsx(n.code,{children:"boolean"}),". По умолчанию: ",e.jsx(n.code,{children:"false"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"autofocus"})," – Автоматический focus на поле ввода сразу после монтирования. Тип: ",e.jsx(n.code,{children:"boolean"}),". По умолчанию: ",e.jsx(n.code,{children:"false"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"autoselect"})," – Автоматический выбор значения в поле ввода при попадании в фокус. Тип: ",e.jsx(n.code,{children:"boolean"}),". По умолчанию: ",e.jsx(n.code,{children:"false"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"clearable"})," – Включает кнопку очистки значения (видна, если значение непустое). Тип: ",e.jsx(n.code,{children:"boolean"}),". По умолчанию: ",e.jsx(n.code,{children:"false"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"readonly"})," – Является ли поле полем только для чтения. Тип: ",e.jsx(n.code,{children:"boolean"}),". По умолчанию: ",e.jsx(n.code,{children:"false"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"required"})," – Является ли поле обязательным. Тип: ",e.jsx(n.code,{children:"boolean"}),". По умолчанию: ",e.jsx(n.code,{children:"false"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"disabled"})," – Отключено ли поле. Тип: ",e.jsx(n.code,{children:"boolean"}),". По умолчанию: ",e.jsx(n.code,{children:"false"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"invalid"})," – Содержит ли поле некорректное значение. Тип: ",e.jsx(n.code,{children:"boolean"}),". По умолчанию: ",e.jsx(n.code,{children:"false"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"multiline"})," – Превращает поле в многострочное. Тип: ",e.jsx(n.code,{children:"boolean"}),". По умолчанию: ",e.jsx(n.code,{children:"false"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"outlined"})," – Стиль поля – с рамкой или без. Тип: ",e.jsx(n.code,{children:"boolean"}),". По умолчанию: ",e.jsx(n.code,{children:"true"}),"."]}),`
`]}),`
`,e.jsx(n.h3,{id:"события",children:"События"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"input"})," – стандартное для input/textarea элементов"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"change"})," – стандартное для input/textarea элементов"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"keydown"})," – стандартное для input/textarea элементов"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"focus"})," – стандартное для input/textarea элементов"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"blur"})," – стандартное для input/textarea элементов"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"update:focused"})," – изменения флага – в фокусе/не в фокусе, можно использовать с v-model"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"update:value"})," – изменение значения поля, можно использовать с v-model"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"clear"})," - появляется после нажатия на кнопку очистки"]}),`
`]}),`
`,e.jsx(n.h3,{id:"слоты",children:"Слоты"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"prefix"})," – задает текст в начале поля ввода:",e.jsx("br",{}),`
`,e.jsx("span",{className:"d-inline-block my-3",children:e.jsx(d,{is:c,tag:"span",prefix:"https://"})}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"suffix"})," – задает текст в конце поля ввода:",e.jsx("br",{}),`
`,e.jsx("span",{className:"d-inline-block my-3",children:e.jsx(d,{is:c,tag:"span",suffix:"₽"})}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"leading-icon"})," – для иконки в начале поля ввода:",e.jsx("br",{}),`
`,e.jsx("span",{className:"d-inline-block my-3",children:e.jsx(d,{is:c,tag:"span",withLeadingIcon:!0})}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"trailing-icon"})," – для иконки в конце поля ввода:",e.jsx("br",{}),`
`,e.jsx("span",{className:"d-inline-block my-3",children:e.jsx(d,{is:c,tag:"span",withTrailingIcon:!0})}),`
`]}),`
`]}),`
`,e.jsxs(n.p,{children:["Пример задействования всех слотов:",e.jsx("br",{})]}),`
`,e.jsx("span",{className:"d-inline-block mb-3",children:e.jsx(d,{is:c,tag:"span",prefix:"https://",suffix:"₽",withLeadingIcon:!0,withTrailingIcon:!0})}),`
`,e.jsx("br",{}),`
`,e.jsx("span",{className:"d-inline-block my-3",children:e.jsx(d,{is:c,tag:"span",prefix:"https://",suffix:"₽",withLeadingIcon:!0,withTrailingIcon:!0,outlined:!1})}),`
`,e.jsx(n.h2,{id:"пример",children:"Пример"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<template>
    <UiTextbox v-model:value="term">
        <template #leading-icon>
            <IconSearch aria-hidden="true" />
        </template>
    </UiTextbox>
</template>

<script lang="ts" setup>
import IconSearch from '@retailcrm/embed-ui-v1-components/assets/sprites/actions/search.svg'
import { UiTextbox } from '@retailcrm/embed-ui-v1-components/remote'

import { ref } from 'vue'

const term = ref('')
<\/script>
`})})]})}function E(i={}){const{wrapper:n}={...g(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(u,{...i})}):u(i)}const F={title:"Components/UiTextbox",component:r,args:{id:void 0,type:a.TEXT,value:"",placeholder:"Enter text",size:t.SM,prefix:"https://",suffix:"₽",active:!1,invalid:!1,multiline:!1},argTypes:{id:{control:!1},type:{control:"select",options:Object.values(a)},value:{control:"text"},size:{control:"select",options:Object.values(t)},inputmode:{control:"select",options:Object.values(w)}},render:i=>({components:{IconCaret:p,IconSearch:v,UiTextbox:r},setup(){const{value:n}=i;return{value:f(String(n)),props:S(()=>b(i,["value"]))}},template:`
      <UiTextbox
          v-model:value="value"
          v-bind="props"
      >
          <template #leading-icon>
              <IconSearch aria-hidden="true" />
          </template>

          <template #trailing-icon>
              <IconCaret aria-hidden="true" />
          </template>
      </UiTextbox>
    `}),parameters:{docs:{page:E},layout:"centered"}},l={};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:"{}",...l.parameters?.docs?.source}}};const Y=["Sandbox"];export{l as Sandbox,Y as __namedExportsOrder,F as default};
