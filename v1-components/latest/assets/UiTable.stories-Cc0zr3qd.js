import{h as de,a6 as ce,C as ye,T as ve,F as je,S as Te,G as s,r as Ue,q as Ce,M as _e}from"./iframe-Bvyt7JKv.js";import{V as X,q}from"./index-D3T7g4sS.js";import{d as b,c as ue}from"./createRemoteStoryRender-CBrVRiR3.js";import{d as x}from"./docsOnlyStory-D04fiwRX.js";import{u as pe,j as n}from"./index-B1k1YGnU.js";import{S as F,A as ke}from"./blocks-XSPc0yka.js";import"./preload-helper-PPVm8Dsz.js";import"./UiAlert-DwbsShZ5.js";import"./UiTransition-BSnl1Rcn.js";import"./checkmark-circle-outlined-CP7gQOyR.js";import"./clear-BDoy7W5T.js";import"./info-outlined-BLk2x4Vv.js";import"./UiAddButton-FdCgOSDN.js";import"./UiAvatar-5TflmDka.js";import"./UiImage-Db8d-9mc.js";import"./predicate-ClulhfEu.js";import"./UiAvatarList-CAZq81X0.js";import"./UiButton-CXdqUSTm.js";import"./render-WAisuxbD.js";import"./composables-DX4ltSqz.js";import"./UiCalendar-2KWss_5Q.js";import"./chevron-right-BpgwvJj9.js";import"./plugin-BJBmQX19.js";import"./index-BAxMPZdI.js";import"./UiCheckbox-DZaADlfc.js";import"./done-A4DTjxvU.js";import"./utils-BqzVSXwn.js";import"./UiCollapse-Qf-9jDH8.js";import"./UiCollapseGroup-BJGDAiYi.js";import"./UiCopyButton-CspqRv6d.js";import"./UiTooltip-DRPI-axN.js";import"./UiPopper-CtoUuQOJ.js";import"./UiDate-Bhp9ksFo.js";import"./ru-Chw6HHdR.js";import"./UiDatePicker-CTcSywzY.js";import"./UiTextbox-DEjM9VaK.js";import"./UiMenuItem-Bpn4pMI2.js";import"./UiScrollBox-7PrkfuK1.js";import"./UiError-D1VT81B7.js";import"./UiInfobox-PdeFGXlI.js";import"./UiLink-BfbmcAlj.js";import"./UiYandexMap-C9SBENmB.js";import"./add-Cn4MQ8ys.js";import"./caret-down-Bd8huWW_.js";import"./UiPopperTarget-BzHFoBjK.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./delete-outlined-8OCeG5t2.js";import"./uid-FlqXPSME.js";import"./UiModalWindow-BovrKXR3.js";import"./UiRadio-J_hAB1S5.js";import"./UiSkeleton-frCgFHL7.js";import"./UiSlider-mOK1ehMt.js";import"./UiSwitch-CcRAZThM.js";import"./UiTag-B5_Jd_Ng.js";import"./UiTimePicker-BFg66JeM.js";import"./UiToggleButton-DgRcNfqe.js";import"./UiToolbarButton-C4O-sy_S.js";import"./UiToolbarLink-CXgnFeyd.js";import"./index-CFQ6hCLl.js";const K=de({name:"UiTableColumn",props:{label:{type:String,default:""},width:{type:[String,Number],default:void 0},minWidth:{type:[String,Number],default:void 0},maxWidth:{type:[String,Number],default:void 0},align:{type:String,default:q.LEFT,validator:t=>Object.values(q).includes(t)},valign:{type:String,default:X.MIDDLE,validator:t=>Object.values(X).includes(t)},trim:{type:Boolean,default:!1},colspan:{type:Function,default:void 0},rowspan:{type:Function,default:void 0}},setup(){return()=>null}});K.__docgenInfo=Object.assign({displayName:K.name??K.__name},{displayName:"UiTableColumn",exportName:"default",description:"",tags:{},props:[{name:"label",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"width",type:{name:"string|number"},defaultValue:{func:!1,value:"undefined"}},{name:"minWidth",type:{name:"string|number"},defaultValue:{func:!1,value:"undefined"}},{name:"maxWidth",type:{name:"string|number"},defaultValue:{func:!1,value:"undefined"}},{name:"align",type:{name:"ALIGN | `${ALIGN}`"},defaultValue:{func:!1,value:"ALIGN.LEFT"}},{name:"valign",type:{name:"VALIGN | `${VALIGN}`"},defaultValue:{func:!1,value:"VALIGN.MIDDLE"}},{name:"trim",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"colspan",type:{name:"(row: unknown, index: number) => number | undefined"},defaultValue:{func:!1,value:"undefined"}},{name:"rowspan",type:{name:"(row: unknown, index: number) => number | undefined"},defaultValue:{func:!1,value:"undefined"}}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/table/UiTableColumn.vue"]});const Se="UiTableRoot",Be=b(Se),Fe="UiTableSection",O=b(Fe),Re="UiTableRow",h=b(Re,["click"]),Ne="UiTableCol",Ae=b(Ne),Ie="UiTableFooterSection";b(Ie);const Ee="UiTableFooterButton";b(Ee,["click"]);const Ge="UiTableHeadCell",me=b(Ge),Ve="UiTableBodyCell",g=b(Ve),Me="UiTableSorter";b(Me,["click"]);const Z=(t,e)=>typeof t.type!="object"||t.type===null?!1:"name"in t.type&&t.type.name===e,Le=t=>t.type===K||Z(t,"UiTableColumn"),ne=t=>t.trim().length===0,G=t=>{const e=[];return t.forEach(r=>{if(Array.isArray(r)){e.push(...G(r));return}if(typeof r=="string"){ne(r)||e.push(r);return}if(typeof r=="number"){e.push(r);return}if(ce(r)&&r.type!==ye){if(r.type===ve){const l=typeof r.children=="string"?r.children:"";ne(l)||e.push(l);return}if(r.type===je&&Array.isArray(r.children)){e.push(...G(r.children));return}e.push(r)}}),e},Oe=t=>t===""||t===!0,We=t=>typeof t=="string"?t:"",ze=t=>Object.values(q).includes(t)?t:q.LEFT,De=t=>Object.values(X).includes(t)?t:X.MIDDLE,Pe=t=>{const e=t.children;if(!e||Array.isArray(e)||typeof e=="string")return{};const r=e;return{defaultSlot:r.default,cellSlot:r.cell,labelSlot:r.label}},te=t=>typeof t=="function"?t:()=>{},$e=t=>G(t).filter(e=>ce(e)).filter(Le).map((e,r)=>{const l=e.props??{},d=Pe(e);return{id:String(e.key??`ui-v1-table-column-${r}`),label:We(l.label),width:l.width,minWidth:l.minWidth??l["min-width"],maxWidth:l.maxWidth??l["max-width"],align:ze(l.align),valign:De(l.valign),trim:Oe(l.trim),getColspan:te(l.colspan),getRowspan:te(l.rowspan),cellSlot:d.cellSlot,defaultSlot:d.defaultSlot,labelSlot:d.labelSlot}}),oe=t=>{if(typeof t>"u")return;const e=Math.trunc(Number(t));if(!(!Number.isFinite(e)||e<1))return e},Ke=t=>t.labelSlot?.({column:t})??[t.label],He=(t,e)=>t.cellSlot?.(e)??t.defaultSlot?.(e)??[],re=t=>{const e=Array.from({length:t.columns.length},()=>0);return t.rows.map((r,l)=>{const d=t.resolveKey(r,l),j=t.expandedKeys.has(d),p=()=>t.toggle(d),V=t.resolveRowAttrs(r,l),w=[];let M=0;return t.columns.forEach((T,U)=>{if(M>0){M-=1;return}if(e[U]>0){e[U]-=1;return}const J={row:r,index:l,key:d,expanded:j,toggle:p,column:T},C=oe(T.getColspan(r,l)),_=oe(T.getRowspan(r,l)),f=C&&C>1?C:void 0,k=_&&_>1?_:void 0;if(f&&(M=f-1),k)for(let y=0;y<(f??1);y++)e[U+y]=Math.max(e[U+y]??0,k-1);w.push({column:T,colspan:f,rowspan:k,slotProps:J})}),{row:r,index:l,key:d,attrs:V,expanded:j,toggle:p,cells:w,className:[t.resolveRowClass(r,l),V.class,t.extraClass]}})},Xe=t=>typeof t=="string"||typeof t=="number"?!1:t.type===g||t.type===me||Z(t,"UiTableBodyCell")||Z(t,"UiTableHeadCell")||t.type==="td"||t.type==="th",ae=t=>{const e=G(t);return e.length===0?!0:!e.every(Xe)},W=t=>t?G(t).length>0:!1,qe=(t,e)=>t?.(e)??[String(e.group.key)],Je=(t,e)=>t?.(e)??[],le=(t,e,r)=>typeof t=="function"?t(e,r):t,se=(t,e,r)=>t?.(e,r)??{},Y=(t,e,r)=>{if(typeof t=="function")return t(e,r);if(typeof t<"u"&&typeof e=="object"&&e!==null&&t in e){const l=e[t];if(typeof l=="string"||typeof l=="number")return l}return r},Qe=t=>{const e={...t};return delete e.class,e},H=de({name:"UiTable",inheritAttrs:!1,props:{rows:{type:Array,default:()=>[]},rowKey:{type:[String,Number,Function],default:void 0},headless:{type:Boolean,default:!1},bordered:{type:Boolean,default:!1},fixed:{type:Boolean,default:!1},rowClass:{type:[String,Array,Object,Function],default:void 0},rowAttrs:{type:Function,default:void 0},groupBy:{type:Function,default:void 0},groupHeadClass:{type:[String,Array,Object],default:void 0},groupBodyClass:{type:[String,Array,Object],default:void 0}},emits:{"row:click":(t,e)=>!0},setup(t,{attrs:e,emit:r,expose:l,slots:d}){const j=_e(),p=Ue([]),V=Ce(()=>!!(j?.vnode.props?.onRowClick||j?.vnode.props?.["onRow:click"])),w=o=>{p.value=p.value.includes(o)?p.value.filter(a=>a!==o):[...p.value,o]};l({resetExpanded:()=>{p.value=[]},expand:o=>{p.value.includes(o)||(p.value=[...p.value,o])},collapse:o=>{p.value=p.value.filter(a=>a!==o)},toggle:w}),Te([()=>t.rows,()=>t.rowKey],()=>{const o=new Set(t.rows.map((i,u)=>Y(t.rowKey,i,u))),a=p.value.filter(i=>o.has(i));a.length!==p.value.length&&(p.value=a)},{deep:!1});const J=()=>$e(d.default?.()??[]),C=()=>t.groupBy?t.groupBy(t.rows):[],_=(o,a)=>({columnsCount:o.length,rowsCount:t.rows.length,groupsCount:a.length,groups:a}),f=()=>["footer-summary","footer-page-size","footer-export","footer-pagination"].some(o=>!!d[o]),k=()=>!!d.footer||f(),y=o=>Math.max(o.length,1),be=o=>re({columns:o,rows:t.rows,expandedKeys:new Set(p.value),resolveKey:(a,i)=>Y(t.rowKey,a,i),resolveRowAttrs:(a,i)=>se(t.rowAttrs,a,i),resolveRowClass:(a,i)=>le(t.rowClass,a,i),toggle:w}),fe=(o,a)=>a.map(i=>({group:i,rows:re({columns:o,rows:i.rows,expandedKeys:new Set(p.value),extraClass:t.groupBodyClass,resolveKey:(u,c)=>Y(t.rowKey,u,c),resolveRowAttrs:(u,c)=>se(t.rowAttrs,u,c),resolveRowClass:(u,c)=>le(t.rowClass,u,c),toggle:w})})),he=(o,a)=>{r("row:click",o,a)},ee=(o,a,i="row")=>{const u=`${String(o.key)}:${i}`;return[s(h,{key:u,interactive:V.value,expanded:o.expanded,...Qe(o.attrs),class:o.className,onClick:c=>he({row:o.row,index:o.index,key:o.key,expanded:o.expanded,toggle:o.toggle},c)},()=>o.cells.map((c,v)=>s(g,{key:`${u}:cell:${c.column.id}:${v}`,align:c.column.align,valign:c.column.valign,colspan:c.colspan,rowspan:c.rowspan,trim:c.column.trim},()=>He(c.column,c.slotProps)))),d.expand&&o.expanded?s(h,{key:`${u}:expand`,expanded:!0},()=>s(g,{colspan:a},()=>Je(d.expand,{row:o.row,index:o.index,key:o.key}))):null]},ge=(o,a,i)=>{const u=qe(d["group-head"],{group:o,index:a});return s(h,{key:`${String(o.key)}:group-head`,class:t.groupHeadClass},()=>ae(u)?s(g,{colspan:i,theme:"group"},()=>s("div",{class:"ui-v1-table__group-head"},u)):u)},xe=o=>s(h,{key:"empty"},()=>s(g,{colspan:o},()=>s("div",{class:"ui-v1-table__empty"},d.empty?.()??[]))),we=(o,a)=>{if(!k())return null;if(f()){const u=d["footer-summary"]?.(o),c=d["footer-page-size"]?.(o),v=d["footer-export"]?.(o),m=d["footer-pagination"]?.(o),L=W(u),S=W(c),B=W(v),Q=W(m);return L||S||B||Q?s(O,{kind:"foot",key:"footer"},()=>s(h,()=>s(g,{colspan:a,class:"ui-v1-table__footer-cell"},()=>s("div",{class:"ui-v1-table__footer"},[L?s("div",{class:"ui-v1-table__footer-meta"},[u]):null,S||B||Q?s("div",{class:"ui-v1-table__footer-controls"},[S||B?s("div",{class:"ui-v1-table__footer-main"},[c,v]):null,Q?s("div",{class:"ui-v1-table__footer-side"},[m]):null]):null])))):null}const i=d.footer?.(o)??[];return s(O,{kind:"foot",key:"footer"},()=>s(h,()=>ae(i)?s(g,{colspan:a},()=>i):i))};return()=>s(Be,{...e,bordered:t.bordered,fixed:t.fixed},()=>[(()=>{const o=J(),a=y(o),i=C(),u=_(o,i),c=be(o),v=fe(o,i);return[o.length>0?s("colgroup",{key:"colgroup"},o.map(m=>s(Ae,{key:`col:${m.id}`,width:m.width,minWidth:m.minWidth,maxWidth:m.maxWidth}))):null,!t.headless&&o.length>0?s(O,{key:"head",kind:"head"},()=>s(h,()=>o.map(m=>s(me,{key:`head:${m.id}`,align:m.align,trim:m.trim},()=>Ke(m))))):null,s(O,{key:"body",kind:"body"},()=>t.rows.length===0?xe(a):t.groupBy?v.flatMap(({group:m,rows:L},S)=>[ge(m,S,a),...L.flatMap(B=>ee(B,a,`${String(m.key)}:row`))]):c.flatMap(m=>ee(m,a))),we(u,a)]})()])}});H.__docgenInfo=Object.assign({displayName:H.name??H.__name},{displayName:"UiTable",exportName:"default",description:"",tags:{},props:[{name:"rows",type:{name:"readonly unknown[]"},defaultValue:{func:!0,value:"() => []"}},{name:"rowKey",type:{name:"string | number | RowKeyGetter<unknown>"},defaultValue:{func:!1,value:"undefined"}},{name:"headless",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"bordered",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"fixed",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"rowClass",type:{name:"CssClass | RowClassGetter<unknown>"},defaultValue:{func:!1,value:"undefined"}},{name:"rowAttrs",type:{name:"RowAttrsGetter<unknown>"},defaultValue:{func:!1,value:"undefined"}},{name:"groupBy",type:{name:"GroupBy<unknown, unknown>"},defaultValue:{func:!1,value:"undefined"}},{name:"groupHeadClass",type:{name:"CssClass"},defaultValue:{func:!1,value:"undefined"}},{name:"groupBodyClass",type:{name:"CssClass"},defaultValue:{func:!1,value:"undefined"}}],events:[{name:"row:click"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/table/UiTable.vue"]});function Ye(t){return new Worker(""+new URL("UiTable.reference.remote-RpX2qLFm.js",import.meta.url).href,{name:t?.name})}function Ze(t){return new Worker(""+new URL("UiTable.remote-BTbtRV9x.js",import.meta.url).href,{name:t?.name})}function ie(t){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...pe(),...t.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{id:"uitable",children:"UiTable"}),`
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
`,n.jsx(F,{of:R}),`
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
`,n.jsx(F,{of:N}),`
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
`,n.jsx(F,{of:A}),`
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
`,n.jsx(F,{of:E}),`
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
`,n.jsx(F,{of:I}),`
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
`,n.jsx(ke,{})]})}function en(t={}){const{wrapper:e}={...pe(),...t.components};return e?n.jsx(e,{...t,children:n.jsx(ie,{...t})}):ie(t)}const it={title:"Components/UiTable",component:H,argTypes:{rows:{control:!1},rowKey:{control:!1},rowClass:{control:!1},rowAttrs:{control:!1},groupBy:{control:!1},groupHeadClass:{control:!1},groupBodyClass:{control:!1},headless:{control:"boolean"},bordered:{control:"boolean"},fixed:{control:"boolean"},withGrouping:{control:"boolean"},withExpand:{control:"boolean"},showServiceColumn:{control:"boolean"},currentPage:{control:{type:"number",min:1,step:1}},hasNextPage:{control:"boolean"},empty:{control:"boolean"},dense:{control:"boolean"},footerMode:{control:"select",options:["none","simple","structured"]}},render:ue({worker:Ze}),parameters:{docs:{page:en},layout:"padded"}},z={args:{headless:!1,bordered:!1,fixed:!1,withGrouping:!1,withExpand:!1,showServiceColumn:!0,footerMode:"structured",currentPage:1,hasNextPage:!1,empty:!1}},R=x({args:{bordered:!1,fixed:!1,withExpand:!1,withGrouping:!1,footerMode:"none"}}),D=x({args:{bordered:!0,fixed:!0,withExpand:!1,withGrouping:!1,footerMode:"none"}}),N=x({args:{bordered:!0,fixed:!1,withExpand:!0,withGrouping:!1,footerMode:"none"}}),A=x({args:{bordered:!0,fixed:!1,withGrouping:!0,withExpand:!1,footerMode:"none"}}),P=x({args:{headless:!0,bordered:!0,fixed:!1,withGrouping:!1,withExpand:!1,footerMode:"simple"}}),I=x({args:{bordered:!0,fixed:!1,withGrouping:!1,withExpand:!1,footerMode:"none",dense:!0}}),$=x({args:{bordered:!0,fixed:!1,withGrouping:!1,withExpand:!1,footerMode:"structured",empty:!0}}),E={args:{empty:!1},render:ue({worker:Ye}),name:"Кампании и отправки",parameters:{layout:"fullscreen"}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    headless: false,
    bordered: false,
    fixed: false,
    withGrouping: false,
    withExpand: false,
    showServiceColumn: true,
    footerMode: 'structured',
    currentPage: 1,
    hasNextPage: false,
    empty: false
  }
}`,...z.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    bordered: false,
    fixed: false,
    withExpand: false,
    withGrouping: false,
    footerMode: 'none'
  }
})`,...R.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    bordered: true,
    fixed: true,
    withExpand: false,
    withGrouping: false,
    footerMode: 'none'
  }
})`,...D.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    bordered: true,
    fixed: false,
    withExpand: true,
    withGrouping: false,
    footerMode: 'none'
  }
})`,...N.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    bordered: true,
    fixed: false,
    withGrouping: true,
    withExpand: false,
    footerMode: 'none'
  }
})`,...A.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    headless: true,
    bordered: true,
    fixed: false,
    withGrouping: false,
    withExpand: false,
    footerMode: 'simple'
  }
})`,...P.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    bordered: true,
    fixed: false,
    withGrouping: false,
    withExpand: false,
    footerMode: 'none',
    dense: true
  }
})`,...I.parameters?.docs?.source}}};$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    bordered: true,
    fixed: false,
    withGrouping: false,
    withExpand: false,
    footerMode: 'structured',
    empty: true
  }
})`,...$.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
}`,...E.parameters?.docs?.source}}};const dt=["Sandbox","Basic","BorderedFixed","ExpandableRows","GroupedRows","Headless","Dense","EmptyState","CampaignsOverview"];export{R as Basic,D as BorderedFixed,E as CampaignsOverview,I as Dense,$ as EmptyState,N as ExpandableRows,A as GroupedRows,P as Headless,z as Sandbox,dt as __namedExportsOrder,it as default};
