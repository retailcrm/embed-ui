import{h as re,a6 as ae,C as xe,T as we,F as ye,O as ve,G as s,r as je,q as Te,M as Ue}from"./iframe-DDyl2AmK.js";import{V as z,q as $}from"./index-BN_6-Ncz.js";import{d as b,c as le}from"./createRemoteStoryRender-DbfDIKnd.js";import{d as w}from"./docsOnlyStory-D04fiwRX.js";import{u as se,j as n}from"./index-DC6AVhol.js";import{S,A as Ce}from"./blocks-irvO_Kf_.js";import"./preload-helper-PPVm8Dsz.js";import"./UiAlert-DL1WXFlL.js";import"./UiTransition-C_SZL8sB.js";import"./checkmark-circle-outlined-D7JQQjfO.js";import"./clear-DNT8teyS.js";import"./info-outlined-mI6ap4ux.js";import"./UiAddButton-DPDk1X46.js";import"./UiAvatar-B81jJYDc.js";import"./UiImage-BusBqEVS.js";import"./predicate-ClulhfEu.js";import"./UiAvatarList-Blc2DaUu.js";import"./UiButton-DVSNWWSO.js";import"./render-CFCB9hDK.js";import"./composables-DVi6oeou.js";import"./UiCalendar-qP4zSNGb.js";import"./chevron-right-DhgHXoQF.js";import"./plugin-DBXjfIqs.js";import"./index-BAxMPZdI.js";import"./UiCheckbox-DJtpsEk8.js";import"./done-CPYICBU4.js";import"./utils-BqzVSXwn.js";import"./UiCollapse-BYVlo_1R.js";import"./UiCollapseGroup-DDi5yXSZ.js";import"./UiCopyButton-BpSLbXh0.js";import"./UiTooltip-CgKFebDj.js";import"./UiPopper-CtyW38v3.js";import"./UiDate-S8crmajf.js";import"./ru-Chw6HHdR.js";import"./UiDatePicker-6yuPb3vb.js";import"./UiTextbox-Cp3VoCvx.js";import"./UiMenuItem-BCh28-bQ.js";import"./UiScrollBox-pROz8lVa.js";import"./UiError-DeL8Md7R.js";import"./UiInfobox-Wo7jvY2w.js";import"./UiLink-Ci033uQc.js";import"./UiYandexMap-nHh77mw2.js";import"./add-igqe0Lf_.js";import"./caret-down-S39XXVlx.js";import"./UiPopperTarget-wB-kx3Lr.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./UiModalSidebar-CMdnDQBK.js";import"./uid-BWdYvJYd.js";import"./UiModalWindow-BeFROK4B.js";import"./UiRadio-B7t7SNhJ.js";import"./UiSkeleton-CLxphY9X.js";import"./UiSlider-BrjJ0zPm.js";import"./UiSwitch-CQ1DsvmW.js";import"./UiTag-C_AWhmbM.js";import"./UiTimePicker-Di5bRYuC.js";import"./UiToggleButton-CD1AtQpV.js";import"./UiToolbarButton-Bj-VZc36.js";import"./UiToolbarLink-BwCG9I2I.js";import"./index-CDnKqZOh.js";const W=re({name:"UiTableColumn",props:{label:{type:String,default:""},width:{type:[String,Number],default:void 0},minWidth:{type:[String,Number],default:void 0},maxWidth:{type:[String,Number],default:void 0},align:{type:String,default:$.LEFT,validator:t=>Object.values($).includes(t)},valign:{type:String,default:z.MIDDLE,validator:t=>Object.values(z).includes(t)},trim:{type:Boolean,default:!1},colspan:{type:Function,default:void 0},rowspan:{type:Function,default:void 0}},setup(){return()=>null}});W.__docgenInfo=Object.assign({displayName:W.name??W.__name},{displayName:"UiTableColumn",exportName:"default",description:"",tags:{},props:[{name:"label",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"width",type:{name:"string|number"},defaultValue:{func:!1,value:"undefined"}},{name:"minWidth",type:{name:"string|number"},defaultValue:{func:!1,value:"undefined"}},{name:"maxWidth",type:{name:"string|number"},defaultValue:{func:!1,value:"undefined"}},{name:"align",type:{name:"ALIGN | `${ALIGN}`"},defaultValue:{func:!1,value:"ALIGN.LEFT"}},{name:"valign",type:{name:"VALIGN | `${VALIGN}`"},defaultValue:{func:!1,value:"VALIGN.MIDDLE"}},{name:"trim",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"colspan",type:{name:"(row: unknown, index: number) => number | undefined"},defaultValue:{func:!1,value:"undefined"}},{name:"rowspan",type:{name:"(row: unknown, index: number) => number | undefined"},defaultValue:{func:!1,value:"undefined"}}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/table/UiTableColumn.vue"]});const _e="UiTableRoot",ke=b(_e),Se="UiTableSection",G=b(Se),Be="UiTableRow",g=b(Be,["click"]),Re="UiTableCol",Fe=b(Re),Ne="UiTableFooterSection";b(Ne);const Ie="UiTableFooterButton";b(Ie,["click"]);const Ae="UiTableHeadCell",ie=b(Ae),Ee="UiTableBodyCell",x=b(Ee),Ge="UiTableSorter";b(Ge,["click"]);const q=(t,e)=>typeof t.type!="object"||t.type===null?!1:"name"in t.type&&t.type.name===e,Ve=t=>t.type===W||q(t,"UiTableColumn"),J=t=>t.trim().length===0,K=t=>{const e=[];return t.forEach(r=>{if(Array.isArray(r)){e.push(...K(r));return}if(typeof r=="string"){J(r)||e.push(r);return}if(typeof r=="number"){e.push(r);return}if(ae(r)&&r.type!==xe){if(r.type===we){const l=typeof r.children=="string"?r.children:"";J(l)||e.push(l);return}if(r.type===ye&&Array.isArray(r.children)){e.push(...K(r.children));return}e.push(r)}}),e},Me=t=>t===""||t===!0,Le=t=>typeof t=="string"?t:"",Oe=t=>Object.values($).includes(t)?t:$.LEFT,We=t=>Object.values(z).includes(t)?t:z.MIDDLE,De=t=>{const e=t.children;if(!e||Array.isArray(e)||typeof e=="string")return{};const r=e;return{defaultSlot:r.default,cellSlot:r.cell,labelSlot:r.label}},Q=t=>typeof t=="function"?t:()=>{},ze=t=>K(t).filter(e=>ae(e)).filter(Ve).map((e,r)=>{const l=e.props??{},c=De(e);return{id:String(e.key??`ui-v1-table-column-${r}`),label:Le(l.label),width:l.width,minWidth:l.minWidth??l["min-width"],maxWidth:l.maxWidth??l["max-width"],align:Oe(l.align),valign:We(l.valign),trim:Me(l.trim),getColspan:Q(l.colspan),getRowspan:Q(l.rowspan),cellSlot:c.cellSlot,defaultSlot:c.defaultSlot,labelSlot:c.labelSlot}}),Y=t=>{if(typeof t>"u")return;const e=Math.trunc(Number(t));if(!(!Number.isFinite(e)||e<1))return e},$e=t=>t.labelSlot?.({column:t})??[t.label],Ke=(t,e)=>t.cellSlot?.(e)??t.defaultSlot?.(e)??[],Z=t=>{const e=Array.from({length:t.columns.length},()=>0);return t.rows.map((r,l)=>{const c=t.resolveKey(r,l),j=t.expandedKeys.has(c),p=()=>t.toggle(c),A=t.resolveRowAttrs(r,l),y=[];let E=0;return t.columns.forEach((T,U)=>{if(E>0){E-=1;return}if(e[U]>0){e[U]-=1;return}const H={row:r,index:l,key:c,expanded:j,toggle:p,column:T},C=Y(T.getColspan(r,l)),_=Y(T.getRowspan(r,l)),f=C&&C>1?C:void 0,k=_&&_>1?_:void 0;if(f&&(E=f-1),k)for(let v=0;v<(f??1);v++)e[U+v]=Math.max(e[U+v]??0,k-1);y.push({column:T,colspan:f,rowspan:k,slotProps:H})}),{row:r,index:l,key:c,attrs:A,expanded:j,toggle:p,cells:y,className:[t.resolveRowClass(r,l),A.class,t.extraClass]}})},He=t=>typeof t=="string"||typeof t=="number"?!1:t.type===x||t.type===ie||q(t,"UiTableBodyCell")||q(t,"UiTableHeadCell")||t.type==="td"||t.type==="th",ee=t=>{const e=K(t);return e.length===0?!0:!e.every(He)},Pe=(t,e)=>t?.(e)??[String(e.group.key)],qe=(t,e)=>t?.(e)??[],ne=(t,e,r)=>typeof t=="function"?t(e,r):t,te=(t,e,r)=>t?.(e,r)??{},P=(t,e,r)=>{if(typeof t=="function")return t(e,r);if(typeof t<"u"&&typeof e=="object"&&e!==null&&t in e){const l=e[t];if(typeof l=="string"||typeof l=="number")return l}return r},Xe=t=>{const e={...t};return delete e.class,e},D=re({name:"UiTable",inheritAttrs:!1,props:{rows:{type:Array,default:()=>[]},rowKey:{type:[String,Number,Function],default:void 0},headless:{type:Boolean,default:!1},bordered:{type:Boolean,default:!1},fixed:{type:Boolean,default:!1},rowClass:{type:[String,Array,Object,Function],default:void 0},rowAttrs:{type:Function,default:void 0},groupBy:{type:Function,default:void 0},groupHeadClass:{type:[String,Array,Object],default:void 0},groupBodyClass:{type:[String,Array,Object],default:void 0}},emits:{"row:click":(t,e)=>!0},setup(t,{attrs:e,emit:r,expose:l,slots:c}){const j=Ue(),p=je([]),A=Te(()=>!!(j?.vnode.props?.onRowClick||j?.vnode.props?.["onRow:click"])),y=o=>{p.value=p.value.includes(o)?p.value.filter(a=>a!==o):[...p.value,o]};l({resetExpanded:()=>{p.value=[]},expand:o=>{p.value.includes(o)||(p.value=[...p.value,o])},collapse:o=>{p.value=p.value.filter(a=>a!==o)},toggle:y}),ve([()=>t.rows,()=>t.rowKey],()=>{const o=new Set(t.rows.map((i,u)=>P(t.rowKey,i,u))),a=p.value.filter(i=>o.has(i));a.length!==p.value.length&&(p.value=a)},{deep:!1});const H=()=>ze(c.default?.()??[]),C=()=>t.groupBy?t.groupBy(t.rows):[],_=(o,a)=>({columnsCount:o.length,rowsCount:t.rows.length,groupsCount:a.length,groups:a}),f=()=>["footer-summary","footer-page-size","footer-export","footer-pagination"].some(o=>!!c[o]),k=()=>!!c.footer||f(),v=o=>Math.max(o.length,1),de=o=>Z({columns:o,rows:t.rows,expandedKeys:new Set(p.value),resolveKey:(a,i)=>P(t.rowKey,a,i),resolveRowAttrs:(a,i)=>te(t.rowAttrs,a,i),resolveRowClass:(a,i)=>ne(t.rowClass,a,i),toggle:y}),ce=(o,a)=>a.map(i=>({group:i,rows:Z({columns:o,rows:i.rows,expandedKeys:new Set(p.value),extraClass:t.groupBodyClass,resolveKey:(u,d)=>P(t.rowKey,u,d),resolveRowAttrs:(u,d)=>te(t.rowAttrs,u,d),resolveRowClass:(u,d)=>ne(t.rowClass,u,d),toggle:y})})),ue=(o,a)=>{r("row:click",o,a)},X=(o,a,i="row")=>{const u=`${String(o.key)}:${i}`;return[s(g,{key:u,interactive:A.value,expanded:o.expanded,...Xe(o.attrs),class:o.className,onClick:d=>ue({row:o.row,index:o.index,key:o.key,expanded:o.expanded,toggle:o.toggle},d)},()=>o.cells.map((d,h)=>s(x,{key:`${u}:cell:${d.column.id}:${h}`,align:d.column.align,valign:d.column.valign,colspan:d.colspan,rowspan:d.rowspan,trim:d.column.trim},()=>Ke(d.column,d.slotProps)))),c.expand&&o.expanded?s(g,{key:`${u}:expand`,expanded:!0},()=>s(x,{colspan:a},()=>qe(c.expand,{row:o.row,index:o.index,key:o.key}))):null]},pe=(o,a,i)=>{const u=Pe(c["group-head"],{group:o,index:a});return s(g,{key:`${String(o.key)}:group-head`,class:t.groupHeadClass},()=>ee(u)?s(x,{colspan:i,theme:"group"},()=>s("div",{class:"ui-v1-table__group-head"},u)):u)},me=o=>s(g,{key:"empty"},()=>s(x,{colspan:o},()=>s("div",{class:"ui-v1-table__empty"},c.empty?.()??[]))),be=(o,a)=>{if(!k())return null;if(f()){const u=c["footer-summary"]?.(o),d=c["footer-page-size"]?.(o),h=c["footer-export"]?.(o),m=c["footer-pagination"]?.(o);return s(G,{kind:"foot",key:"footer"},()=>s(g,()=>s(x,{colspan:a,class:"ui-v1-table__footer-cell"},()=>s("div",{class:"ui-v1-table__footer"},[u?s("div",{class:"ui-v1-table__footer-meta"},[u]):null,d||h||m?s("div",{class:"ui-v1-table__footer-controls"},[d||h?s("div",{class:"ui-v1-table__footer-main"},[d,h]):null,m?s("div",{class:"ui-v1-table__footer-side"},[m]):null]):null]))))}const i=c.footer?.(o)??[];return s(G,{kind:"foot",key:"footer"},()=>s(g,()=>ee(i)?s(x,{colspan:a},()=>i):i))};return()=>s(ke,{...e,bordered:t.bordered,fixed:t.fixed},()=>[(()=>{const o=H(),a=v(o),i=C(),u=_(o,i),d=de(o),h=ce(o,i);return[o.length>0?s("colgroup",{key:"colgroup"},o.map(m=>s(Fe,{key:`col:${m.id}`,width:m.width,minWidth:m.minWidth,maxWidth:m.maxWidth}))):null,!t.headless&&o.length>0?s(G,{key:"head",kind:"head"},()=>s(g,()=>o.map(m=>s(ie,{key:`head:${m.id}`,align:m.align,trim:m.trim},()=>$e(m))))):null,s(G,{key:"body",kind:"body"},()=>t.rows.length===0?me(a):t.groupBy?h.flatMap(({group:m,rows:fe},he)=>[pe(m,he,a),...fe.flatMap(ge=>X(ge,a,`${String(m.key)}:row`))]):d.flatMap(m=>X(m,a))),be(u,a)]})()])}});D.__docgenInfo=Object.assign({displayName:D.name??D.__name},{displayName:"UiTable",exportName:"default",description:"",tags:{},props:[{name:"rows",type:{name:"readonly unknown[]"},defaultValue:{func:!0,value:"() => []"}},{name:"rowKey",type:{name:"string | number | RowKeyGetter<unknown>"},defaultValue:{func:!1,value:"undefined"}},{name:"headless",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"bordered",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"fixed",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"rowClass",type:{name:"CssClass | RowClassGetter<unknown>"},defaultValue:{func:!1,value:"undefined"}},{name:"rowAttrs",type:{name:"RowAttrsGetter<unknown>"},defaultValue:{func:!1,value:"undefined"}},{name:"groupBy",type:{name:"GroupBy<unknown, unknown>"},defaultValue:{func:!1,value:"undefined"}},{name:"groupHeadClass",type:{name:"CssClass"},defaultValue:{func:!1,value:"undefined"}},{name:"groupBodyClass",type:{name:"CssClass"},defaultValue:{func:!1,value:"undefined"}}],events:[{name:"row:click"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/table/UiTable.vue"]});function Je(t){return new Worker(""+new URL("UiTable.reference.remote-CViVb_uN.js",import.meta.url).href,{name:t?.name})}function Qe(t){return new Worker(""+new URL("UiTable.remote-jmerqsfN.js",import.meta.url).href,{name:t?.name})}function oe(t){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...se(),...t.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{id:"uitable",children:"UiTable"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"UiTable"})," - декларативная slot-based таблица для remote-части ",n.jsx(e.code,{children:"embed-ui"}),`.
Компонент собирается из `,n.jsx(e.code,{children:"UiTable"})," и дочерних ",n.jsx(e.code,{children:"UiTableColumn"}),", а сложные сценарии добираются через слоты ",n.jsx(e.code,{children:"expand"}),", ",n.jsx(e.code,{children:"group-head"})," и footer-slots."]}),`
`,n.jsx(e.h2,{id:"когда-использовать",children:"Когда использовать"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Нужна таблица с ручной композицией колонок и ячеек."}),`
`,n.jsx(e.li,{children:"Нужны grouping, expandable rows или кастомный footer без жёсткого data-driven API."}),`
`,n.jsxs(e.li,{children:["Нужно сохранить разделение ",n.jsx(e.code,{children:"host"}),"-примитивов и ",n.jsx(e.code,{children:"remote"}),"-orchestration, как у ",n.jsx(e.code,{children:"UiSelect"}),"."]}),`
`]}),`
`,n.jsx(e.h2,{id:"контент-ячеек",children:"Контент ячеек"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"UiTable"})," рассчитана на типовые сценарии контента в ",n.jsx(e.code,{children:"header"})," и ",n.jsx(e.code,{children:"body"}),", а в историях и прикладном коде можно сразу опираться на готовые ",n.jsx(e.code,{children:"v1-components"}),"."]}),`
`,n.jsx(e.p,{children:"Для body-ячеек подходят такие комбинации:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"Text"})," или ",n.jsx(e.code,{children:"Text + description"})," - обычный текст, ссылка через ",n.jsx("a",{className:"ui-table-docs__component-link",href:"?path=/docs/components-uilink--docs",children:n.jsx("code",{children:"UiLink"})}),", а вторую строку удобно собирать простым ",n.jsx(e.code,{children:"div/span"}),"."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"Status"})," - статусные плашки через ",n.jsx("a",{className:"ui-table-docs__component-link",href:"?path=/docs/components-uitag--docs",children:n.jsx("code",{children:"UiTag"})}),"."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"Avatar + Text"})," - типовой сценарий клиента, менеджера или пользователя через ",n.jsx("a",{className:"ui-table-docs__component-link",href:"?path=/docs/components-uiavatar--docs",children:n.jsx("code",{children:"UiAvatar"})})," и ",n.jsx("a",{className:"ui-table-docs__component-link",href:"?path=/docs/components-uilink--docs",children:n.jsx("code",{children:"UiLink"})})," или обычный текст."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"Icon 20x20"})," - декоративные и action-иконки, если нужен только маркер состояния или компактное действие."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"Button"})," - обычные кнопки дизайн-системы, когда внутри ячейки нужно явное действие, например через ",n.jsx("a",{className:"ui-table-docs__component-link",href:"?path=/docs/components-uibutton--docs",children:n.jsx("code",{children:"UiButton"})}),"."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"Checkbox"})," - выделение строки или массовые действия через ",n.jsx("a",{className:"ui-table-docs__component-link",href:"?path=/docs/components-uicheckbox--docs",children:n.jsx("code",{children:"UiCheckbox"})}),"."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"Image"})," - превью товара или сущности, если в колонке нужен визуальный контент."]}),`
`]}),`
`,n.jsx(e.p,{children:"Для header обычно хватает таких паттернов:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"Text"})," - обычный заголовок колонки."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"Text + Icon"})," - сортировка или вспомогательное действие; для сортировки лучше использовать ",n.jsx("a",{className:"ui-table-docs__component-link",href:"?path=/docs/components-uitable--docs",children:n.jsx("code",{children:"UiTableSorter"})}),"."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"Checkbox + Icon"})," - service column с массовым выделением и дополнительным действием через ",n.jsx("a",{className:"ui-table-docs__component-link",href:"?path=/docs/components-uicheckbox--docs",children:n.jsx("code",{children:"UiCheckbox"})}),"."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"Icon"})," или ",n.jsx(e.code,{children:"Icon + Text + Icon"})," - узкие служебные колонки и более сложные action-header сценарии."]}),`
`]}),`
`,n.jsx(e.h2,{id:"примеры",children:"Примеры"}),`
`,n.jsx(e.h3,{id:"базовая-таблица",children:"Базовая таблица"}),`
`,n.jsx(S,{of:B}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
  <UiTable
    bordered
    :rows="rows"
    row-key="id"
  >
    <UiTableColumn label="Название">
      <template #cell="{ row }">
        <strong>{{ row.title }}</strong>
      </template>
    </UiTableColumn>

    <UiTableColumn label="Клиент" width="180">
      <template #cell="{ row }">
        {{ row.customer }}
      </template>
    </UiTableColumn>

    <UiTableColumn label="Статус" width="160">
      <template #cell="{ row }">
        <UiTag :background="statusBackgroundByName[row.status]" size="md" saturated :ticker="false">
          {{ row.status }}
        </UiTag>
      </template>
    </UiTableColumn>
  </UiTable>
</template>

<script lang="ts" remote setup>
import { UiTable, UiTableColumn } from '@/remote/components/table'
import { UiTag } from '@/remote/components/tag'

const rows = [
  { id: 101, title: 'Весенняя рассылка', customer: 'Анна Смирнова', status: 'Запланирована' },
  { id: 102, title: 'Скидка на аксессуары', customer: 'Илья Кузнецов', status: 'Отправлена' },
]

const statusBackgroundByName = {
  Запланирована: '#005EEB',
  Отправлена: '#1FA971',
}
<\/script>
`})}),`
`,n.jsx(e.h3,{id:"таблица-с-раскрытием-строки",children:"Таблица с раскрытием строки"}),`
`,n.jsx(S,{of:R}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
  <UiTable
    bordered
    :rows="rows"
    row-key="id"
  >
    <UiTableColumn :width="44" label="" trim>
      <template #cell="{ expanded, toggle }">
        <button class="table-expand" type="button" @click="toggle">
          {{ expanded ? '−' : '+' }}
        </button>
      </template>
    </UiTableColumn>

    <UiTableColumn label="Название">
      <template #cell="{ row }">
        {{ row.title }}
      </template>
    </UiTableColumn>

    <template #expand="{ row }">
      <div class="table-expand-content">
        <strong>Подробности</strong>
        <div>{{ row.description }}</div>
        <div>Контакт: {{ row.phone }}</div>
      </div>
    </template>
  </UiTable>
</template>

<script lang="ts" remote setup>
import { UiTable, UiTableColumn } from '@/remote/components/table'

const rows = [
  {
    id: 101,
    title: 'Весенняя рассылка',
    description: 'Сегмент: постоянные клиенты. Канал: SMS + email.',
    phone: '+7 (999) 123-45-67',
  },
]
<\/script>
`})}),`
`,n.jsx(e.h3,{id:"таблица-с-группировкой",children:"Таблица с группировкой"}),`
`,n.jsx(S,{of:F}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
  <UiTable
    bordered
    :rows="rows"
    row-key="id"
    :group-by="groupByStatus"
  >
    <UiTableColumn label="Название">
      <template #cell="{ row }">
        {{ row.title }}
      </template>
    </UiTableColumn>

    <UiTableColumn label="Статус" width="160">
      <template #cell="{ row }">
        {{ row.status }}
      </template>
    </UiTableColumn>

    <template #group-head="{ group }">
      <span>{{ group.data.title }}</span>
    </template>
  </UiTable>
</template>

<script lang="ts" remote setup>
import type { Group } from '@/common/components/table'
import { UiTable, UiTableColumn } from '@/remote/components/table'

const rows = [
  { id: 101, title: 'Весенняя рассылка', status: 'Запланирована' },
  { id: 102, title: 'Скидка на аксессуары', status: 'Отправлена' },
]

const groupByStatus = (items: readonly typeof rows): Group<(typeof rows)[number], { title: string }>[] => {
  return ['Запланирована', 'Отправлена']
    .map((status) => ({
      key: status,
      data: { title: status },
      rows: items.filter((row) => row.status === status),
    }))
    .filter((group) => group.rows.length > 0)
}
<\/script>
`})}),`
`,n.jsx(e.h3,{id:"таблица-кампаний-и-отправок",children:"Таблица кампаний и отправок"}),`
`,n.jsx(S,{of:I}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
  <div class="reference-table">
    <UiTable
      class="reference-table__table"
      bordered
      :rows="sortedRows"
      row-key="id"
    >
      <UiTableColumn
        :width="42"
        label=""
        trim
      >
        <template #label>
          <div class="reference-table__centered">
            <UiCheckbox
              :model="visibleRowIds.length > 0 && selectedVisibleIds.length === visibleRowIds.length"
              :indeterminate="selectedVisibleIds.length > 0 && selectedVisibleIds.length !== visibleRowIds.length"
              @update:model="toggleAllVisible"
            />
          </div>
        </template>

        <template #cell="{ row }">
          <div class="reference-table__centered">
            <UiCheckbox
              :model="selectedIds"
              :value="row.id"
              @update:model="updateSelectedIds"
            />
          </div>
        </template>
      </UiTableColumn>

      <UiTableColumn
        label="Название"
        width="28.5%"
        :min-width="220"
      >
        <template #label>
          <UiTableSorter
            aria-label="Сортировка по названию"
            :direction="sortDirection"
            @click="toggleSortDirection"
          >
            Название
          </UiTableSorter>
        </template>

        <template #cell="{ row }">
          <UiLink
            accent
            class="reference-table__title-link"
            href="javascript:void(0);"
          >
            {{ row.title }}
          </UiLink>
        </template>
      </UiTableColumn>

      <UiTableColumn
        v-slot="{ row }"
        label="Статус"
        width="20%"
        :min-width="168"
      >
        <div
          :class="[
            'reference-table__status-tag-box',
            \`reference-table__status-tag-box_\${row.status.tone}\`,
          ]"
        >
          <UiTag
            class="reference-table__status-tag"
            size="md"
            :ticker="false"
            :background="statusPalette[row.status.tone].background"
          >
            <template #icon>
              <component
                :is="statusIconMap[row.status.tone]"
                aria-hidden="true"
                class="reference-table__status-icon"
                :style="statusIconStyle(row.status.tone)"
              />
            </template>

            <span>
              {{ row.status.label }}
            </span>
          </UiTag>
        </div>
      </UiTableColumn>

      <UiTableColumn
        v-slot="{ row }"
        label="Дата отправки"
        width="11.8%"
        :min-width="112"
      >
        <div class="reference-table__date">
          <span>{{ row.sentAtDate }}</span>
          <span>{{ row.sentAtTime }}</span>
        </div>
      </UiTableColumn>

      <UiTableColumn
        v-slot="{ row }"
        label="Телефон"
        width="15.1%"
        :min-width="132"
      >
        <span class="reference-table__body-text">
          {{ row.phone }}
        </span>
      </UiTableColumn>

      <UiTableColumn
        label=""
        :width="46"
        trim
        align="center"
      >
        <div class="reference-table__centered">
          <IconCallTalking
            aria-hidden="true"
            class="reference-table__phone-action"
          />
        </div>
      </UiTableColumn>

      <UiTableColumn
        v-slot="{ row }"
        label="Клиент"
        width="16.6%"
        :min-width="148"
      >
        <div class="reference-table__customer">
          <UiAvatar
            :src="row.avatarSrc"
            size="xs"
            :name="row.customer"
          />

          <UiLink
            accent
            class="reference-table__customer-link"
            href="javascript:void(0);"
          >
            {{ row.customer }}
          </UiLink>
        </div>
      </UiTableColumn>

      <UiTableColumn
        v-slot="{ row }"
        label="Активность"
        width="8%"
        :min-width="76"
        align="center"
      >
        <div class="reference-table__centered">
          <component
            :is="row.active ? IconCheckmarkCircle : IconClearCircle"
            :style="{ color: row.active ? '#20BF84' : '#B7C0CB' }"
            aria-hidden="true"
            class="reference-table__activity-icon"
          />
        </div>
      </UiTableColumn>

      <template #empty>
        <div class="reference-table__empty">
          Нет данных для отображения
        </div>
      </template>

      <template #footer-summary="{ rowsCount }">
        <span>{{ rowsCount }} элементов</span>
      </template>

      <template #footer-page-size>
        <UiTableFooterSection class="reference-table__footer-control">
          <span class="reference-table__footer-caption">Показывать:</span>
          <UiTableFooterButton
            class="reference-table__footer-button reference-table__footer-button_passive"
          >
            по 20
          </UiTableFooterButton>
          <span class="reference-table__footer-delimiter">/</span>
          <UiTableFooterButton
            class="reference-table__footer-button"
          >
            по 50
          </UiTableFooterButton>
          <span class="reference-table__footer-delimiter">/</span>
          <UiTableFooterButton
            class="reference-table__footer-button"
          >
            по 100
          </UiTableFooterButton>
        </UiTableFooterSection>
      </template>

      <template #footer-export>
        <UiTableFooterSection>
          <UiTableFooterButton class="reference-table__footer-export">
            <IconDownloadTo
              aria-hidden="true"
              class="reference-table__footer-export-icon"
            />
            <span>Выгрузить таблицу</span>
          </UiTableFooterButton>
        </UiTableFooterSection>
      </template>

      <template #footer-pagination>
        <UiTableFooterSection class="reference-table__pagination-section">
          <div class="reference-table__pagination">
            <UiTableFooterButton class="reference-table__pagination-button">
              1
            </UiTableFooterButton>
            <UiTableFooterButton class="reference-table__pagination-button">
              2
            </UiTableFooterButton>
            <UiTableFooterButton class="reference-table__pagination-button reference-table__pagination-button_current">
              3
            </UiTableFooterButton>
            <span class="reference-table__pagination-divider" />
            <UiTableFooterButton
              aria-label="Предыдущая страница"
              class="reference-table__pagination-arrow"
            >
              <IconChevronLeft
                aria-hidden="true"
                class="reference-table__pagination-arrow-icon"
              />
            </UiTableFooterButton>
            <span class="reference-table__pagination-divider" />
            <UiTableFooterButton
              aria-label="Следующая страница"
              class="reference-table__pagination-arrow"
            >
              <IconChevronRight
                aria-hidden="true"
                class="reference-table__pagination-arrow-icon"
              />
            </UiTableFooterButton>
          </div>
        </UiTableFooterSection>
      </template>
    </UiTable>
  </div>
</template>

<script lang="ts" remote setup>
import { computed, ref } from 'vue'

import IconChevronLeft from '@retailcrm/embed-ui-v1-components/assets/sprites/arrows/chevron-left.svg'
import IconChevronRight from '@retailcrm/embed-ui-v1-components/assets/sprites/arrows/chevron-right.svg'

import { UiCheckbox } from '@/remote/components/checkbox'
import { UiLink } from '@/remote/components/link'
import {
  UiTable,
  UiTableColumn,
  UiTableFooterButton,
  UiTableFooterSection,
  UiTableSorter,
} from '@/remote/components/table'
import { UiTag } from '@/remote/components/tag'

const selectedIds = ref<number[]>([])
const rows = [
  // Данные кампаний, palette и вспомогательные computed усечены для читаемости.
]

const sortDirection = ref<DIRECTION | null>(null)
const sortedRows = computed(() => sortDirection.value === null
  ? rows
  : [...rows].sort(/* сортировка по title */))
const allVisibleSelected = computed(() => false)
const partiallySelected = computed(() => false)
const toggleSortDirection = () => {}
const toggleAllVisible = () => {}
const updateSelectedIds = () => {}
<\/script>
`})}),`
`,n.jsx(e.h2,{id:"важные-свойства",children:"Важные свойства"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"headless"})," - скрывает стандартный header."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"bordered"})," - включает внешний контур таблицы."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"fixed"})," - переводит таблицу в ",n.jsx(e.code,{children:"table-layout: fixed"}),"."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"rows"})," и ",n.jsx(e.code,{children:"rowKey"})," - основной источник данных и стабильных ключей строк."]}),`
`]}),`
`,n.jsx(e.h2,{id:"важные-слоты",children:"Важные слоты"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"default"})," - список колонок ",n.jsx(e.code,{children:"UiTableColumn"}),"."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"expand"})," - раскрытое содержимое строки."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"group-head"})," - заголовок группы."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"footer"}),", ",n.jsx(e.code,{children:"footer-summary"}),", ",n.jsx(e.code,{children:"footer-page-size"}),", ",n.jsx(e.code,{children:"footer-export"}),", ",n.jsx(e.code,{children:"footer-pagination"})," - footer API."]}),`
`]}),`
`,n.jsx(e.h2,{id:"css-tokens",children:"CSS tokens"}),`
`,n.jsxs(e.p,{children:["Стили ",n.jsx(e.code,{children:"UiTable"})," можно настраивать через CSS custom properties на корневом элементе таблицы."]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"--ui-v1-table-border-width"})," - толщина внешней рамки и базовая величина для border-aware расчётов внутренних отступов."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"--ui-v1-table-rounding"}),", ",n.jsx(e.code,{children:"--ui-v1-table-rounding-start-start"}),", ",n.jsx(e.code,{children:"--ui-v1-table-rounding-start-end"}),", ",n.jsx(e.code,{children:"--ui-v1-table-rounding-end-start"}),", ",n.jsx(e.code,{children:"--ui-v1-table-rounding-end-end"})," - общее и покомпонентное скругление таблицы."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"--ui-v1-table-cell-padding-x"}),", ",n.jsx(e.code,{children:"--ui-v1-table-cell-padding-y"})," - базовые горизонтальные и вертикальные padding всех ячеек."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"--ui-v1-table-cell-padding-block-start"}),", ",n.jsx(e.code,{children:"--ui-v1-table-cell-padding-inline-end"}),", ",n.jsx(e.code,{children:"--ui-v1-table-cell-padding-block-end"}),", ",n.jsx(e.code,{children:"--ui-v1-table-cell-padding-inline-start"})," - точечные переопределения padding ячейки по logical-сторонам."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"--ui-v1-table-padding-start"}),", ",n.jsx(e.code,{children:"--ui-v1-table-padding-end"})," - внешние отступы первой и последней ячейки в строке; в ",n.jsx(e.code,{children:"bordered"}),"-варианте таблица сама вычитает из них ширину рамки."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"--ui-v1-table-head-cell-padding-block-start"}),", ",n.jsx(e.code,{children:"--ui-v1-table-head-cell-padding-block-end"})," - отступы header-ячейки по block-оси."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"--ui-v1-table-body-cell-padding-block-start"}),", ",n.jsx(e.code,{children:"--ui-v1-table-body-cell-padding-block-end"})," - отступы body-ячейки по block-оси."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"--ui-v1-table-group-head-padding-block-start"}),", ",n.jsx(e.code,{children:"--ui-v1-table-group-head-padding-block-end"})," - отступы строк-заголовков групп по block-оси."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"--ui-v1-table-head-background"})," - фон шапки таблицы."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"--ui-v1-table-group-head-background"})," - фон заголовков групп."]}),`
`]}),`
`,n.jsx(e.h3,{id:"dense-table",children:"Dense table"}),`
`,n.jsx(S,{of:N}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
  <UiTable
    class="campaign-table campaign-table_dense"
    bordered
    :rows="rows"
    row-key="id"
  >
    <UiTableColumn label="Название">
      <template #cell="{ row }">
        {{ row.title }}
      </template>
    </UiTableColumn>

    <UiTableColumn label="Статус" width="160">
      <template #cell="{ row }">
        {{ row.status }}
      </template>
    </UiTableColumn>
  </UiTable>
</template>

<script lang="ts" remote setup>
import { UiTable, UiTableColumn } from '@/remote/components/table'

const rows = [
  { id: 101, title: 'Весенняя рассылка', status: 'Запланирована' },
  { id: 102, title: 'Скидка на аксессуары', status: 'Отправлена' },
]
<\/script>

<style lang="less">
.campaign-table_dense {
  --ui-v1-table-cell-padding-x: 8px;
  --ui-v1-table-cell-padding-y: 8px;
  --ui-v1-table-padding-start: 8px;
  --ui-v1-table-padding-end: 8px;
  --ui-v1-table-head-cell-padding-block-start: 8px;
  --ui-v1-table-head-cell-padding-block-end: 8px;
  --ui-v1-table-body-cell-padding-block-start: 8px;
  --ui-v1-table-body-cell-padding-block-end: 8px;
  --ui-v1-table-group-head-padding-block-start: 4px;
  --ui-v1-table-group-head-padding-block-end: 4px;
  --ui-v1-table-head-background: #f4f6f8;
  --ui-v1-table-group-head-background: #f7f9fb;
}
</style>
`})}),`
`,n.jsx(e.h2,{id:"api",children:"API"}),`
`,n.jsx(Ce,{})]})}function Ye(t={}){const{wrapper:e}={...se(),...t.components};return e?n.jsx(e,{...t,children:n.jsx(oe,{...t})}):oe(t)}const at={title:"Components/UiTable",component:D,argTypes:{rows:{control:!1},rowKey:{control:!1},rowClass:{control:!1},rowAttrs:{control:!1},groupBy:{control:!1},groupHeadClass:{control:!1},groupBodyClass:{control:!1},headless:{control:"boolean"},bordered:{control:"boolean"},fixed:{control:"boolean"},withGrouping:{control:"boolean"},withExpand:{control:"boolean"},showServiceColumn:{control:"boolean"},empty:{control:"boolean"},dense:{control:"boolean"},footerMode:{control:"select",options:["none","simple","structured"]}},render:le({worker:Qe}),parameters:{docs:{page:Ye},layout:"padded"}},V={args:{headless:!1,bordered:!1,fixed:!1,withGrouping:!1,withExpand:!1,showServiceColumn:!0,footerMode:"none",empty:!1}},B=w({args:{bordered:!1,fixed:!1,withExpand:!1,withGrouping:!1,footerMode:"none"}}),M=w({args:{bordered:!0,fixed:!0,withExpand:!1,withGrouping:!1,footerMode:"none"}}),R=w({args:{bordered:!0,fixed:!1,withExpand:!0,withGrouping:!1,footerMode:"none"}}),F=w({args:{bordered:!0,fixed:!1,withGrouping:!0,withExpand:!1,footerMode:"none"}}),L=w({args:{headless:!0,bordered:!0,fixed:!1,withGrouping:!1,withExpand:!1,footerMode:"simple"}}),N=w({args:{bordered:!0,fixed:!1,withGrouping:!1,withExpand:!1,footerMode:"none",dense:!0}}),O=w({args:{bordered:!0,fixed:!1,withGrouping:!1,withExpand:!1,footerMode:"structured",empty:!0}}),I={args:{empty:!1},render:le({worker:Je}),name:"Кампании и отправки",parameters:{layout:"fullscreen"}};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    headless: false,
    bordered: false,
    fixed: false,
    withGrouping: false,
    withExpand: false,
    showServiceColumn: true,
    footerMode: 'none',
    empty: false
  }
}`,...V.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    bordered: false,
    fixed: false,
    withExpand: false,
    withGrouping: false,
    footerMode: 'none'
  }
})`,...B.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    bordered: true,
    fixed: true,
    withExpand: false,
    withGrouping: false,
    footerMode: 'none'
  }
})`,...M.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    bordered: true,
    fixed: false,
    withExpand: true,
    withGrouping: false,
    footerMode: 'none'
  }
})`,...R.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    bordered: true,
    fixed: false,
    withGrouping: true,
    withExpand: false,
    footerMode: 'none'
  }
})`,...F.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    headless: true,
    bordered: true,
    fixed: false,
    withGrouping: false,
    withExpand: false,
    footerMode: 'simple'
  }
})`,...L.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    bordered: true,
    fixed: false,
    withGrouping: false,
    withExpand: false,
    footerMode: 'none',
    dense: true
  }
})`,...N.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    bordered: true,
    fixed: false,
    withGrouping: false,
    withExpand: false,
    footerMode: 'structured',
    empty: true
  }
})`,...O.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    empty: false
  },
  render: createRemoteStoryRender({
    worker: UiTableReferenceWorker
  }),
  name: 'Кампании и отправки',
  parameters: {
    layout: 'fullscreen'
  }
}`,...I.parameters?.docs?.source}}};const lt=["Sandbox","Basic","BorderedFixed","ExpandableRows","GroupedRows","Headless","Dense","EmptyState","CampaignsOverview"];export{B as Basic,M as BorderedFixed,I as CampaignsOverview,N as Dense,O as EmptyState,R as ExpandableRows,F as GroupedRows,L as Headless,V as Sandbox,lt as __namedExportsOrder,at as default};
