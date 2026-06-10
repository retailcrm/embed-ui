import{d,c as l}from"./createRemoteStoryRender-vcz3ZtTa.js";import{u as c,j as e}from"./index-BdfGHWDn.js";import{A as p}from"./blocks-Dc2O4FUd.js";import"./iframe-DY4K7XWY.js";import"./preload-helper-PPVm8Dsz.js";import"./index-R4IaJWqF.js";import"./UiAlert-H8wpnLuv.js";import"./UiTransition-5mWoFKFQ.js";import"./checkmark-circle-outlined-DHKspKTG.js";import"./clear-CrJWe51s.js";import"./info-outlined-BzSWDKub.js";import"./UiAddButton-CrjASCrP.js";import"./UiAvatar-DKuQN-J9.js";import"./UiImage-DUWKamEd.js";import"./predicate-ClulhfEu.js";import"./UiAvatarList-BepDZEKe.js";import"./UiButton-Dvbwg8KO.js";import"./render-BwUR_q3l.js";import"./composables-DGrAg25c.js";import"./UiCalendar-H4c3gJFN.js";import"./chevron-right-5SxNJJe8.js";import"./plugin-C6IskfCz.js";import"./index-BAxMPZdI.js";import"./UiCheckbox-DeM00XIq.js";import"./done-B-JM-y1C.js";import"./utils-BqzVSXwn.js";import"./UiCollapse-COpKkQDX.js";import"./UiCollapseGroup-DXE3bNvn.js";import"./UiCopyButton-C946gWPK.js";import"./UiTooltip-C0rD1Xba.js";import"./UiPopper-M9jY8qgt.js";import"./UiDate-D_J__8KB.js";import"./ru-Chw6HHdR.js";import"./UiDatePicker-Bc9uvpNs.js";import"./UiTextbox-C5yXpQyb.js";import"./UiMenuItem-Dno70m2K.js";import"./UiScrollBox-BAqp6TRw.js";import"./UiError-vu5ZVO6q.js";import"./UiInfobox-Dtkbss3d.js";import"./UiLink-DyZaiVr0.js";import"./UiYandexMap-D0vEUF-p.js";import"./add-BWzgWxYw.js";import"./caret-down-qPhwjeQj.js";import"./UiPopperTarget-CTx9bJ93.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./delete-outlined-DBUmDV-N.js";import"./uid-BpfK_WZO.js";import"./UiModalWindow-D8Tg-AWH.js";import"./UiRadio-CXse51Me.js";import"./UiSkeleton-UPjvTXRy.js";import"./UiSlider-DgmaY1wC.js";import"./UiSwitch-CKS5yG99.js";import"./UiTag-DGYtfD83.js";import"./UiTimePicker-6eWG0U4v.js";import"./UiToggleButton-Cvbfm3Pf.js";import"./UiToolbarButton-rVvkM5aD.js";import"./UiToolbarLink-CD5fHOn4.js";import"./index-hd-7DJaU.js";const m="UiPageFooter",h=d(m,[],["actions","aside"]),u="_container_eckxg_1",s={container:u,delete:"_delete_eckxg_8"};function x(r){return new Worker(""+new URL("UiPageFooter.remote-DsMy1WGc.js",import.meta.url).href,{name:r?.name})}function a(r){const o={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...c(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(o.h1,{id:"uipagefooter",children:"UiPageFooter"}),`
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
