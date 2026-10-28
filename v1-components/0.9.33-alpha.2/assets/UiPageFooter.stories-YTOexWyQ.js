import{d,c as l}from"./createRemoteStoryRender-DjRahFGy.js";import{u as c,j as e}from"./index-rN8r3ga4.js";import{A as p}from"./blocks-DLN41SMe.js";import"./iframe-fI9CR6ES.js";import"./preload-helper-PPVm8Dsz.js";import"./index-5_fmqlHb.js";import"./UiAlert-DUwhUupU.js";import"./UiTransition-Cdc59YlU.js";import"./checkmark-circle-outlined-CXsSXQHX.js";import"./clear-mtyWYUfM.js";import"./info-outlined-D8i7ulRK.js";import"./UiAddButton-CW4VHa6j.js";import"./UiAvatar-yYc5eV49.js";import"./UiImage-DOCK8enO.js";import"./predicate-ClulhfEu.js";import"./UiAvatarList-BkaHToRf.js";import"./UiButton-BkZ2SFxI.js";import"./render-WRyvH_6x.js";import"./composables-BFZcOyxw.js";import"./UiCalendar-CPKhkoYV.js";import"./chevron-right-EP5rfQ7R.js";import"./plugin-Dr8JHMsO.js";import"./index-BAxMPZdI.js";import"./UiCheckbox-DCO89OwK.js";import"./done-Cdqr1Y1v.js";import"./utils-BqzVSXwn.js";import"./UiCollapse-B_LD-nQN.js";import"./UiCollapseGroup-DtyTJvYt.js";import"./UiCopyButton-B7m8oXfR.js";import"./UiTooltip-Lfr_K7CO.js";import"./UiPopper-B5XrmDDO.js";import"./UiDate-K_TGFuao.js";import"./ru-Chw6HHdR.js";import"./UiDatePicker-SNlOPR-x.js";import"./UiTextbox-CLtKvIjo.js";import"./UiMenuItem-c4fOhnU2.js";import"./UiScrollBox-CLznJj1h.js";import"./UiError-BNwJgG2k.js";import"./UiInfobox-DlfJ-gFO.js";import"./UiLink-BxzRxQqq.js";import"./UiYandexMap-BWxhDDdl.js";import"./add-mXn_QeoK.js";import"./caret-down-DHwL7kKP.js";import"./UiPopperTarget-DmHJWOfD.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./delete-outlined-CTgau4Ak.js";import"./uid-C_OIlNlR.js";import"./UiModalWindow-Cb87blmx.js";import"./UiRadio-B6lYj291.js";import"./UiSkeleton-DZGQc56b.js";import"./UiSlider-B80SqvUl.js";import"./UiSwitch-CSY7pRHw.js";import"./UiTag-XzeOlAsL.js";import"./UiTimePicker-CAvi7hkq.js";import"./UiToggleButton-DtyN7VML.js";import"./UiToolbarButton-DrRxTKuU.js";import"./UiToolbarLink-CIpM31U4.js";import"./index-CXSHABaW.js";const m="UiPageFooter",h=d(m,[],["actions","aside"]),u="_container_eckxg_1",s={container:u,delete:"_delete_eckxg_8"};function x(r){return new Worker(""+new URL("UiPageFooter.remote-Bz0el629.js",import.meta.url).href,{name:r?.name})}function a(r){const o={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...c(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(o.h1,{id:"uipagefooter",children:"UiPageFooter"}),`
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
`,e.jsx(p,{})]})}function j(r={}){const{wrapper:o}={...c(),...r.components};return o?e.jsx(o,{...r,children:e.jsx(a,{...r})}):a(r)}const be={title:"Components/UiPageFooter",component:h,argTypes:{disabled:{control:"boolean"},locked:{control:"boolean"},showAside:{control:"boolean"},showSecondary:{control:"boolean"},styles:{control:!1}},render:l({worker:x}),parameters:{docs:{page:j},layout:"padded"}},n={args:{disabled:!1,locked:!1,showAside:!0,showSecondary:!0,styles:s}},t={args:{showAside:!1,showSecondary:!1,styles:s}},i={args:{disabled:!0,showAside:!0,showSecondary:!0,styles:s}},we=["Sandbox","PrimaryOnly","Disabled"];n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}};export{i as Disabled,t as PrimaryOnly,n as Sandbox,we as __namedExportsOrder,be as default};
