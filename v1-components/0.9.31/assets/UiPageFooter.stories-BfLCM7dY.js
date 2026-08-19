import{d,c as l}from"./createRemoteStoryRender-ildfcto2.js";import{u as c,j as e}from"./index-DvfRcjXc.js";import{A as p}from"./blocks-CKKk7TF0.js";import"./iframe-BQMKqlCt.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DFf4ELiw.js";import"./UiAlert-C4GhC2G8.js";import"./UiTransition-Dl2-BWO1.js";import"./checkmark-circle-outlined-BZT-f1Hh.js";import"./clear-DsBw3MS0.js";import"./info-outlined-B9RE9Zu9.js";import"./UiAddButton-Cmn8yFR9.js";import"./UiAvatar-Bx6Y5Qpp.js";import"./UiImage-D7Z_VZ5q.js";import"./predicate-ClulhfEu.js";import"./UiAvatarList-D7T3hZ5Z.js";import"./UiButton-CL6jmqOb.js";import"./render-DhoOLo8E.js";import"./composables-BAZqweTh.js";import"./UiCalendar-DPv1qM1q.js";import"./chevron-right-DhBxHFUC.js";import"./plugin-B9CBVp1Z.js";import"./index-BAxMPZdI.js";import"./UiCheckbox-BvfryNdy.js";import"./done-CGM2Im2W.js";import"./utils-BqzVSXwn.js";import"./UiCollapse-6GF-wk2V.js";import"./UiCollapseGroup-DJqhpntW.js";import"./UiCopyButton-DePyYEzp.js";import"./UiTooltip-BKbZGDV3.js";import"./UiPopper-CGjiW9ck.js";import"./UiDate-DCD00tT7.js";import"./ru-Chw6HHdR.js";import"./UiDatePicker-DQix2ciY.js";import"./UiTextbox-Cda_Pv6p.js";import"./UiMenuItem-Dj3KSDT-.js";import"./UiScrollBox-BPOKJ8CJ.js";import"./UiError-0R4gmGOB.js";import"./UiInfobox-DUa0MvhJ.js";import"./UiLink-DDWfoh2B.js";import"./UiYandexMap-0dZeUEWu.js";import"./add-BQvnCbP2.js";import"./caret-down-C2yWSbVc.js";import"./UiPopperTarget-EMFOWMfb.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./delete-outlined-CcfXNKwa.js";import"./uid-R9TJfUhu.js";import"./UiModalWindow-CgT08yvO.js";import"./UiRadio-BMZNuQhT.js";import"./UiSkeleton-DyjAAh3_.js";import"./UiSlider-DGgkLarH.js";import"./UiSwitch-D0gt0ckX.js";import"./UiTag-EW6tlM59.js";import"./UiTimePicker-CeJAxPju.js";import"./UiToggleButton-B22tdJey.js";import"./UiToolbarButton-D9uek1PL.js";import"./UiToolbarLink-BP22o9N6.js";import"./index-B031y1-F.js";const m="UiPageFooter",h=d(m,[],["actions","aside"]),u="_container_eckxg_1",s={container:u,delete:"_delete_eckxg_8"};function x(r){return new Worker(""+new URL("UiPageFooter.remote-DsMy1WGc.js",import.meta.url).href,{name:r?.name})}function a(r){const o={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...c(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(o.h1,{id:"uipagefooter",children:"UiPageFooter"}),`
`,e.jsxs(o.p,{children:[e.jsx(o.code,{children:"UiPageFooter"}),` - нижняя панель действий для embed-страниц JS API.
Компонент отвечает только за внешний вид и раскладку футера; фиксацию к нижней границе окна или области содержимого должна выполнять страница CRM.`]}),`
`,e.jsx(o.h2,{id:"когда-использовать",children:"Когда использовать"}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsx(o.li,{children:"на отдельной странице JS-модуля есть основное действие сохранения;"}),`
`,e.jsx(o.li,{children:"рядом нужно показать вторичное действие, например «Сохранить и выйти»;"}),`
`,e.jsx(o.li,{children:"справа нужно отделить опасное действие, например удаление."}),`
`]}),`
`,e.jsx(o.h2,{id:"пример",children:"Пример"}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-html",children:`<template>
    <UiPageFooter>
        <template #actions>
            <UiButton variant="success" @click="save">
                Сохранить
            </UiButton>

            <UiButton appearance="secondary" @click="saveAndExit">
                Сохранить и выйти
            </UiButton>
        </template>

        <template #aside>
            <UiButton
                aria-label="Удалить"
                appearance="tertiary"
                variant="danger"
                @click="remove"
            >
                <IconDelete aria-hidden="true" />
            </UiButton>
        </template>
    </UiPageFooter>
</template>

<script lang="ts" setup>
import IconDelete from '@retailcrm/embed-ui-v1-components/assets/sprites/ui/delete-outlined.svg'
import {
  UiButton,
  UiPageFooter,
} from '@retailcrm/embed-ui-v1-components/remote'

const save = () => {}
const saveAndExit = () => {}
const remove = () => {}
<\/script>
`})}),`
`,e.jsx(o.h2,{id:"слоты",children:"Слоты"}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsxs(o.li,{children:[e.jsx(o.code,{children:"actions"})," - основные действия слева."]}),`
`,e.jsxs(o.li,{children:[e.jsx(o.code,{children:"aside"})," - отделенная зона справа, обычно для опасного или второстепенного одиночного действия."]}),`
`]}),`
`,e.jsx(o.h2,{id:"поведение",children:"Поведение"}),`
`,e.jsxs(o.p,{children:[e.jsx(o.code,{children:"UiPageFooter"})," не создает кнопки самостоятельно. Для состояний ",e.jsx(o.code,{children:"disabled"}),", ",e.jsx(o.code,{children:"locked"}),", обработчиков клика и иконок передавайте внутрь слотов обычные ",e.jsx(o.code,{children:"UiButton"}),"."]}),`
`,e.jsx(o.h2,{id:"размещение-на-странице",children:"Размещение на странице"}),`
`,e.jsxs(o.p,{children:[e.jsx(o.code,{children:"UiPageFooter"})," рендерится как обычный ",e.jsx(o.code,{children:"footer"})," в месте вызова и не фиксируется у нижней границы окна самостоятельно."]}),`
`,e.jsxs(o.p,{children:["CRM может переопределять layout-свойства корневого класса ",e.jsx(o.code,{children:".ui-v1-page-footer"}),", чтобы поставить футер в нужное место страницы: например задать ",e.jsx(o.code,{children:"position"}),", отступы от бокового меню, ",e.jsx(o.code,{children:"z-index"})," и transition при изменении CRM layout."]}),`
`,e.jsxs(o.p,{children:["Эти правила должны оставаться на стороне CRM, потому что зависят от shell-структуры страницы. Внутренние элементы ",e.jsx(o.code,{children:".ui-v1-page-footer__actions"})," и ",e.jsx(o.code,{children:".ui-v1-page-footer__aside"})," не следует переопределять для размещения футера: они отвечают только за раскладку содержимого внутри компонента."]}),`
`,e.jsx(o.h2,{id:"api",children:"API"}),`
`,e.jsx(p,{})]})}function j(r={}){const{wrapper:o}={...c(),...r.components};return o?e.jsx(o,{...r,children:e.jsx(a,{...r})}):a(r)}const be={title:"Components/UiPageFooter",component:h,argTypes:{disabled:{control:"boolean"},locked:{control:"boolean"},showAside:{control:"boolean"},showSecondary:{control:"boolean"},styles:{control:!1}},render:l({worker:x}),parameters:{docs:{page:j},layout:"padded"}},n={args:{disabled:!1,locked:!1,showAside:!0,showSecondary:!0,styles:s}},t={args:{showAside:!1,showSecondary:!1,styles:s}},i={args:{disabled:!0,showAside:!0,showSecondary:!0,styles:s}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: false,
    locked: false,
    showAside: true,
    showSecondary: true,
    styles
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    showAside: false,
    showSecondary: false,
    styles
  }
}`,...t.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    showAside: true,
    showSecondary: true,
    styles
  }
}`,...i.parameters?.docs?.source}}};const we=["Sandbox","PrimaryOnly","Disabled"];export{i as Disabled,t as PrimaryOnly,n as Sandbox,we as __namedExportsOrder,be as default};
