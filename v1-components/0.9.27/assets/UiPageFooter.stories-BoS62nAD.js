import{d,c as l}from"./createRemoteStoryRender-ChWXZNKX.js";import{u as c,j as e}from"./index-BfkEq5Oq.js";import{A as p}from"./blocks-Y9P97Z3B.js";import"./iframe-DX-y0Vc4.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DVqNURtm.js";import"./UiAlert-DW2j_Eqa.js";import"./UiTransition-CocJ_aiN.js";import"./checkmark-circle-outlined-D0gQzdT0.js";import"./clear-C07B9uw3.js";import"./info-outlined-BBoSOzE7.js";import"./UiAddButton-CgfMjTcF.js";import"./UiAvatar-C8SX6HtE.js";import"./UiImage-C9TX9Jb_.js";import"./predicate-ClulhfEu.js";import"./UiAvatarList-1CcNvxTq.js";import"./UiButton-CWoy0lV6.js";import"./render-FS21dnL0.js";import"./composables-g6Lsp4T6.js";import"./UiCalendar-DeEdQ8B3.js";import"./chevron-right-DfjJAWWu.js";import"./plugin-C77-c4UV.js";import"./index-BAxMPZdI.js";import"./UiCheckbox-CNRbCuqx.js";import"./done-DHRK8rB3.js";import"./utils-BqzVSXwn.js";import"./UiCollapse-B9Z94B9i.js";import"./UiCollapseGroup-Clo5xYr4.js";import"./UiCopyButton-Dz5H6-5j.js";import"./UiTooltip-DiMRfBp5.js";import"./UiPopper-CfbbUJa-.js";import"./UiDate-DOZqm0oj.js";import"./ru-Chw6HHdR.js";import"./UiDatePicker-DICxdwyp.js";import"./UiTextbox--7i-ebpm.js";import"./UiMenuItem-BnnTBsGj.js";import"./UiScrollBox-Bb5mxW7L.js";import"./UiError-CgtYEdkp.js";import"./UiInfobox-BB2PQfi9.js";import"./UiLink-Chr48SVv.js";import"./UiYandexMap-CJw27-m7.js";import"./add-BE-N8Ppz.js";import"./caret-down-CNb73_g2.js";import"./UiPopperTarget-CpydGCyI.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./delete-outlined-DNG4dOJ9.js";import"./uid-D7dXnRUx.js";import"./UiModalWindow-B4jgYPCQ.js";import"./UiRadio-Db9x3K3c.js";import"./UiSkeleton-Cav3jWre.js";import"./UiSlider-CfNPfQEn.js";import"./UiSwitch-Bo8a194K.js";import"./UiTag-Smz_W29H.js";import"./UiTimePicker-BPeMocRg.js";import"./UiToggleButton-1xZiiHyw.js";import"./UiToolbarButton-Dd2SRV8w.js";import"./UiToolbarLink-Cca9VRbO.js";import"./index-DOEnI1F6.js";const m="UiPageFooter",h=d(m,[],["actions","aside"]),u="_container_eckxg_1",s={container:u,delete:"_delete_eckxg_8"};function x(r){return new Worker(""+new URL("UiPageFooter.remote-DsMy1WGc.js",import.meta.url).href,{name:r?.name})}function a(r){const o={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...c(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(o.h1,{id:"uipagefooter",children:"UiPageFooter"}),`
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
