import{h as ye}from"./host-DJiie6wH.js";import{_ as we}from"./UiAvatar-CILlCHrz.js";import{_ as ve}from"./UiCheckbox-BfjHn95z.js";import{_ as je}from"./UiLink-_Zk6dUaG.js";import{V as W,A as O,_ as Te,a as Ue,b as Ce,c as ke,d as Se,e as _e,f as Re,g as Be,h as Ae}from"./UiTableSorter-Djb2JzUd.js";import{_ as Ne}from"./UiTag-C1xuAvxc.js";import{h as te,a7 as oe,C as Ee,T as Fe,F as Ge,r as Ve,j as Me,w as Ie,K as s,Y as $e}from"./iframe-D1v8aj2J.js";import{d as f,c as ae}from"./createRemoteStoryRender-D0g6XXeI.js";import{d as y}from"./docsOnlyStory-D04fiwRX.js";import{j as n}from"./jsx-runtime-ClSgB0tP.js";import{useMDXComponents as le}from"./index-BcU0IgrJ.js";import{S as _,A as Le}from"./blocks-D9_kj3CA.js";import"./UiImage-DoYPQZcm.js";import"./predicate-ClulhfEu.js";import"./done-Cr2iq8Z9.js";import"./utils-BqzVSXwn.js";import"./composables-CsRkzQ-G.js";import"./clear-CNxyRXCj.js";import"./plugin-1GBkN3fH.js";import"./index-BAxMPZdI.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B4jHIdoR.js";const re=te({name:"UiTableColumn",props:{label:{type:String,default:""},width:{type:[String,Number],default:void 0},minWidth:{type:[String,Number],default:void 0},maxWidth:{type:[String,Number],default:void 0},align:{type:String,default:O.LEFT,validator:t=>Object.values(O).includes(t)},valign:{type:String,default:W.MIDDLE,validator:t=>Object.values(W).includes(t)},trim:{type:Boolean,default:!1},colspan:{type:Function,default:void 0},rowspan:{type:Function,default:void 0}},setup(){return()=>null}});re.__docgenInfo={displayName:"UiTableColumn",exportName:"default",description:"",tags:{},props:[{name:"label",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"width",type:{name:"string|number"},defaultValue:{func:!1,value:"undefined"}},{name:"minWidth",type:{name:"string|number"},defaultValue:{func:!1,value:"undefined"}},{name:"maxWidth",type:{name:"string|number"},defaultValue:{func:!1,value:"undefined"}},{name:"align",type:{name:"ALIGN | `${ALIGN}`"},defaultValue:{func:!1,value:"ALIGN.LEFT"}},{name:"valign",type:{name:"VALIGN | `${VALIGN}`"},defaultValue:{func:!1,value:"VALIGN.MIDDLE"}},{name:"trim",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"colspan",type:{name:"(row: unknown, index: number) => number | undefined"},defaultValue:{func:!1,value:"undefined"}},{name:"rowspan",type:{name:"(row: unknown, index: number) => number | undefined"},defaultValue:{func:!1,value:"undefined"}}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/table/UiTableColumn.vue"]};const We="UiTableRoot",Oe=f(We),De="UiTableSection",V=f(De),ze="UiTableRow",x=f(ze,["click"]),Ke="UiTableCol",He=f(Ke),Pe="UiTableFooterSection";f(Pe);const Xe="UiTableFooterButton";f(Xe,["click"]);const Ye="UiTableHeadCell",se=f(Ye),qe="UiTableBodyCell",g=f(qe),Je="UiTableSorter";f(Je,["click"]);const H=(t,e)=>typeof t.type!="object"||t.type===null?!1:"name"in t.type&&t.type.name===e,Qe=t=>t.type===re||H(t,"UiTableColumn"),X=t=>t.trim().length===0,D=t=>{const e=[];return t.forEach(a=>{if(Array.isArray(a)){e.push(...D(a));return}if(typeof a=="string"){X(a)||e.push(a);return}if(typeof a=="number"){e.push(a);return}if(oe(a)&&a.type!==Ee){if(a.type===Fe){const r=typeof a.children=="string"?a.children:"";X(r)||e.push(r);return}if(a.type===Ge&&Array.isArray(a.children)){e.push(...D(a.children));return}e.push(a)}}),e},Ze=t=>t===""||t===!0,en=t=>typeof t=="string"?t:"",nn=t=>Object.values(O).includes(t)?t:O.LEFT,tn=t=>Object.values(W).includes(t)?t:W.MIDDLE,on=t=>{const e=t.children;if(!e||Array.isArray(e)||typeof e=="string")return{};const a=e;return{defaultSlot:a.default,cellSlot:a.cell,labelSlot:a.label}},Y=t=>typeof t=="function"?t:()=>{},an=t=>D(t).filter(e=>oe(e)).filter(Qe).map((e,a)=>{const r=e.props??{},c=on(e);return{id:String(e.key??`ui-v1-table-column-${a}`),label:en(r.label),width:r.width,minWidth:r.minWidth??r["min-width"],maxWidth:r.maxWidth??r["max-width"],align:nn(r.align),valign:tn(r.valign),trim:Ze(r.trim),getColspan:Y(r.colspan),getRowspan:Y(r.rowspan),cellSlot:c.cellSlot,defaultSlot:c.defaultSlot,labelSlot:c.labelSlot}}),q=t=>{if(typeof t>"u")return;const e=Math.trunc(Number(t));if(!(!Number.isFinite(e)||e<1))return e},ln=t=>t.labelSlot?.({column:t})??[t.label],rn=(t,e)=>t.cellSlot?.(e)??t.defaultSlot?.(e)??[],J=t=>{const e=Array.from({length:t.columns.length},()=>0);return t.rows.map((a,r)=>{const c=t.resolveKey(a,r),j=t.expandedKeys.has(c),p=()=>t.toggle(c),F=t.resolveRowAttrs(a,r),w=[];let G=0;return t.columns.forEach((T,U)=>{if(G>0){G-=1;return}if(e[U]>0){e[U]-=1;return}const z={row:a,index:r,key:c,expanded:j,toggle:p,column:T},C=q(T.getColspan(a,r)),k=q(T.getRowspan(a,r)),b=C&&C>1?C:void 0,S=k&&k>1?k:void 0;if(b&&(G=b-1),S)for(let v=0;v<(b??1);v++)e[U+v]=Math.max(e[U+v]??0,S-1);w.push({column:T,colspan:b,rowspan:S,slotProps:z})}),{row:a,index:r,key:c,attrs:F,expanded:j,toggle:p,cells:w,className:[t.resolveRowClass(a,r),F.class,t.extraClass]}})},sn=t=>typeof t=="string"||typeof t=="number"?!1:t.type===g||t.type===se||H(t,"UiTableBodyCell")||H(t,"UiTableHeadCell")||t.type==="td"||t.type==="th",Q=t=>{const e=D(t);return e.length===0?!0:!e.every(sn)},dn=(t,e)=>t?.(e)??[String(e.group.key)],cn=(t,e)=>t?.(e)??[],Z=(t,e,a)=>typeof t=="function"?t(e,a):t,ee=(t,e,a)=>t?.(e,a)??{},K=(t,e,a)=>{if(typeof t=="function")return t(e,a);if(typeof t<"u"&&typeof e=="object"&&e!==null&&t in e){const r=e[t];if(typeof r=="string"||typeof r=="number")return r}return a},un=t=>{const e={...t};return delete e.class,e},ie=te({name:"UiTable",inheritAttrs:!1,props:{rows:{type:Array,default:()=>[]},rowKey:{type:[String,Number,Function],default:void 0},headless:{type:Boolean,default:!1},bordered:{type:Boolean,default:!1},fixed:{type:Boolean,default:!1},rowClass:{type:[String,Array,Object,Function],default:void 0},rowAttrs:{type:Function,default:void 0},groupBy:{type:Function,default:void 0},groupHeadClass:{type:[String,Array,Object],default:void 0},groupBodyClass:{type:[String,Array,Object],default:void 0}},emits:{"row:click":(t,e)=>!0},setup(t,{attrs:e,emit:a,expose:r,slots:c}){const j=$e(),p=Ve([]),F=Me(()=>!!(j?.vnode.props?.onRowClick||j?.vnode.props?.["onRow:click"])),w=o=>{p.value=p.value.includes(o)?p.value.filter(l=>l!==o):[...p.value,o]};r({resetExpanded:()=>{p.value=[]},expand:o=>{p.value.includes(o)||(p.value=[...p.value,o])},collapse:o=>{p.value=p.value.filter(l=>l!==o)},toggle:w}),Ie([()=>t.rows,()=>t.rowKey],()=>{const o=new Set(t.rows.map((i,u)=>K(t.rowKey,i,u))),l=p.value.filter(i=>o.has(i));l.length!==p.value.length&&(p.value=l)},{deep:!1});const z=()=>an(c.default?.()??[]),C=()=>t.groupBy?t.groupBy(t.rows):[],k=(o,l)=>({columnsCount:o.length,rowsCount:t.rows.length,groupsCount:l.length,groups:l}),b=()=>["footer-summary","footer-page-size","footer-export","footer-pagination"].some(o=>!!c[o]),S=()=>!!c.footer||b(),v=o=>Math.max(o.length,1),ce=o=>J({columns:o,rows:t.rows,expandedKeys:new Set(p.value),resolveKey:(l,i)=>K(t.rowKey,l,i),resolveRowAttrs:(l,i)=>ee(t.rowAttrs,l,i),resolveRowClass:(l,i)=>Z(t.rowClass,l,i),toggle:w}),ue=(o,l)=>l.map(i=>({group:i,rows:J({columns:o,rows:i.rows,expandedKeys:new Set(p.value),extraClass:t.groupBodyClass,resolveKey:(u,d)=>K(t.rowKey,u,d),resolveRowAttrs:(u,d)=>ee(t.rowAttrs,u,d),resolveRowClass:(u,d)=>Z(t.rowClass,u,d),toggle:w})})),pe=(o,l)=>{a("row:click",o,l)},P=(o,l,i="row")=>{const u=`${String(o.key)}:${i}`;return[s(x,{key:u,interactive:F.value,expanded:o.expanded,...un(o.attrs),class:o.className,onClick:d=>pe({row:o.row,index:o.index,key:o.key,expanded:o.expanded,toggle:o.toggle},d)},()=>o.cells.map((d,h)=>s(g,{key:`${u}:cell:${d.column.id}:${h}`,align:d.column.align,valign:d.column.valign,colspan:d.colspan,rowspan:d.rowspan,trim:d.column.trim},()=>rn(d.column,d.slotProps)))),c.expand&&o.expanded?s(x,{key:`${u}:expand`,expanded:!0},()=>s(g,{colspan:l},()=>cn(c.expand,{row:o.row,index:o.index,key:o.key}))):null]},me=(o,l,i)=>{const u=dn(c["group-head"],{group:o,index:l});return s(x,{key:`${String(o.key)}:group-head`,class:t.groupHeadClass},()=>Q(u)?s(g,{colspan:i,theme:"group"},()=>s("div",{class:"ui-v1-table__group-head"},u)):u)},fe=o=>s(x,{key:"empty"},()=>s(g,{colspan:o},()=>s("div",{class:"ui-v1-table__empty"},c.empty?.()??[]))),be=(o,l)=>{if(!S())return null;if(b()){const u=c["footer-summary"]?.(o),d=c["footer-page-size"]?.(o),h=c["footer-export"]?.(o),m=c["footer-pagination"]?.(o);return s(V,{kind:"foot",key:"footer"},()=>s(x,()=>s(g,{colspan:l,class:"ui-v1-table__footer-cell"},()=>s("div",{class:"ui-v1-table__footer"},[u?s("div",{class:"ui-v1-table__footer-meta"},[u]):null,d||h||m?s("div",{class:"ui-v1-table__footer-controls"},[d||h?s("div",{class:"ui-v1-table__footer-main"},[d,h]):null,m?s("div",{class:"ui-v1-table__footer-side"},[m]):null]):null]))))}const i=c.footer?.(o)??[];return s(V,{kind:"foot",key:"footer"},()=>s(x,()=>Q(i)?s(g,{colspan:l},()=>i):i))};return()=>s(Oe,{...e,bordered:t.bordered,fixed:t.fixed},()=>[(()=>{const o=z(),l=v(o),i=C(),u=k(o,i),d=ce(o),h=ue(o,i);return[o.length>0?s("colgroup",{key:"colgroup"},o.map(m=>s(He,{key:`col:${m.id}`,width:m.width,minWidth:m.minWidth,maxWidth:m.maxWidth}))):null,!t.headless&&o.length>0?s(V,{key:"head",kind:"head"},()=>s(x,()=>o.map(m=>s(se,{key:`head:${m.id}`,align:m.align,trim:m.trim},()=>ln(m))))):null,s(V,{key:"body",kind:"body"},()=>t.rows.length===0?fe(l):t.groupBy?h.flatMap(({group:m,rows:he},xe)=>[me(m,xe,l),...he.flatMap(ge=>P(ge,l,`${String(m.key)}:row`))]):d.flatMap(m=>P(m,l))),be(u,l)]})()])}});ie.__docgenInfo={displayName:"UiTable",exportName:"default",description:"",tags:{},props:[{name:"rows",type:{name:"readonly unknown[]"},defaultValue:{func:!0,value:"() => []"}},{name:"rowKey",type:{name:"string | number | RowKeyGetter<unknown>"},defaultValue:{func:!1,value:"undefined"}},{name:"headless",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"bordered",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"fixed",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"rowClass",type:{name:"CssClass | RowClassGetter<unknown>"},defaultValue:{func:!1,value:"undefined"}},{name:"rowAttrs",type:{name:"RowAttrsGetter<unknown>"},defaultValue:{func:!1,value:"undefined"}},{name:"groupBy",type:{name:"GroupBy<unknown, unknown>"},defaultValue:{func:!1,value:"undefined"}},{name:"groupHeadClass",type:{name:"CssClass"},defaultValue:{func:!1,value:"undefined"}},{name:"groupBodyClass",type:{name:"CssClass"},defaultValue:{func:!1,value:"undefined"}}],events:[{name:"row:click"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/table/UiTable.vue"]};function pn(t){return new Worker(""+new URL("UiTable.reference.remote-DBoN7THD.js",import.meta.url).href,{name:t?.name})}function mn(t){return new Worker(""+new URL("UiTable.remote-EP74OpC3.js",import.meta.url).href,{name:t?.name})}function ne(t){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...le(),...t.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{id:"uitable",children:"UiTable"}),`
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
`,n.jsx(_,{of:R}),`
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
`,n.jsx(_,{of:B}),`
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
`,n.jsx(_,{of:A}),`
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
`,n.jsx(_,{of:E}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
  <div class="reference-table">
    <UiTable class="reference-table__table" bordered :rows="sortedRows" row-key="id">
      <UiTableColumn :width="42" label="" trim>
        <template #label>
          <UiCheckbox :model="allVisibleSelected" :indeterminate="partiallySelected" @update:model="toggleAllVisible" />
        </template>

        <template #cell="{ row }">
          <UiCheckbox :model="selectedIds" :value="row.id" @update:model="updateSelectedIds" />
        </template>
      </UiTableColumn>

      <UiTableColumn label="Название" width="28.5%" :min-width="220">
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
          <UiLink accent class="reference-table__title-link" href="javascript:void(0);">
            {{ row.title }}
          </UiLink>
        </template>
      </UiTableColumn>

      <UiTableColumn v-slot="{ row }" label="Статус" width="20%" :min-width="168">
        <UiTag size="md" :ticker="false" :background="statusPalette[row.status.tone].background">
          {{ row.status.label }}
        </UiTag>
      </UiTableColumn>

      <template #footer-summary="{ rowsCount }">
        <span>{{ rowsCount }} элементов</span>
      </template>

      <template #footer-page-size>
          <UiTableFooterSection class="reference-table__footer-control">
            <span>Показывать:</span>
            <UiTableFooterButton>по 20</UiTableFooterButton>
            <span>/</span>
            <UiTableFooterButton>по 50</UiTableFooterButton>
        </UiTableFooterSection>
      </template>
    </UiTable>
  </div>
</template>

<script lang="ts" remote setup>
import { computed, ref } from 'vue'

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
`,n.jsx(_,{of:N}),`
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
`,n.jsx(Le,{})]})}function fn(t={}){const{wrapper:e}={...le(),...t.components};return e?n.jsx(e,{...t,children:n.jsx(ne,{...t})}):ne(t)}const de=ye({UiAvatar:we,UiCheckbox:ve,UiLink:je,UiTableBodyCell:Ae,UiTableCol:Be,UiTableFooterButton:Re,UiTableFooterSection:_e,UiTableHeadCell:Se,UiTableRoot:ke,UiTableRow:Ce,UiTableSection:Ue,UiTableSorter:Te,UiTag:Ne}),Mn={title:"Components/UiTable",component:ie,argTypes:{rows:{control:!1},rowKey:{control:!1},rowClass:{control:!1},rowAttrs:{control:!1},groupBy:{control:!1},groupHeadClass:{control:!1},groupBodyClass:{control:!1},headless:{control:"boolean"},bordered:{control:"boolean"},fixed:{control:"boolean"},withGrouping:{control:"boolean"},withExpand:{control:"boolean"},showServiceColumn:{control:"boolean"},empty:{control:"boolean"},dense:{control:"boolean"},footerMode:{control:"select",options:["none","simple","structured"]}},render:ae({provider:de,worker:mn}),parameters:{docs:{page:fn},layout:"padded"}},M={args:{headless:!1,bordered:!1,fixed:!1,withGrouping:!1,withExpand:!1,showServiceColumn:!0,footerMode:"none",empty:!1}},R=y({args:{bordered:!1,fixed:!1,withExpand:!1,withGrouping:!1,footerMode:"none"}}),I=y({args:{bordered:!0,fixed:!0,withExpand:!1,withGrouping:!1,footerMode:"none"}}),B=y({args:{bordered:!0,fixed:!1,withExpand:!0,withGrouping:!1,footerMode:"none"}}),A=y({args:{bordered:!0,fixed:!1,withGrouping:!0,withExpand:!1,footerMode:"none"}}),$=y({args:{headless:!0,bordered:!0,fixed:!1,withGrouping:!1,withExpand:!1,footerMode:"simple"}}),N=y({args:{bordered:!0,fixed:!1,withGrouping:!1,withExpand:!1,footerMode:"none",dense:!0}}),L=y({args:{bordered:!0,fixed:!1,withGrouping:!1,withExpand:!1,footerMode:"structured",empty:!0}}),E={args:{empty:!1},render:ae({provider:de,worker:pn}),name:"Кампании и отправки",parameters:{layout:"fullscreen"}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
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
}`,...M.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    bordered: false,
    fixed: false,
    withExpand: false,
    withGrouping: false,
    footerMode: 'none'
  }
})`,...R.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    bordered: true,
    fixed: true,
    withExpand: false,
    withGrouping: false,
    footerMode: 'none'
  }
})`,...I.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    bordered: true,
    fixed: false,
    withExpand: true,
    withGrouping: false,
    footerMode: 'none'
  }
})`,...B.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    bordered: true,
    fixed: false,
    withGrouping: true,
    withExpand: false,
    footerMode: 'none'
  }
})`,...A.parameters?.docs?.source}}};$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    headless: true,
    bordered: true,
    fixed: false,
    withGrouping: false,
    withExpand: false,
    footerMode: 'simple'
  }
})`,...$.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    bordered: true,
    fixed: false,
    withGrouping: false,
    withExpand: false,
    footerMode: 'none',
    dense: true
  }
})`,...N.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    bordered: true,
    fixed: false,
    withGrouping: false,
    withExpand: false,
    footerMode: 'structured',
    empty: true
  }
})`,...L.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    empty: false
  },
  render: createRemoteStoryRender({
    provider,
    worker: UiTableReferenceWorker
  }),
  name: 'Кампании и отправки',
  parameters: {
    layout: 'fullscreen'
  }
}`,...E.parameters?.docs?.source}}};const In=["Sandbox","Basic","BorderedFixed","ExpandableRows","GroupedRows","Headless","Dense","EmptyState","CampaignsOverview"];export{R as Basic,I as BorderedFixed,E as CampaignsOverview,N as Dense,L as EmptyState,B as ExpandableRows,A as GroupedRows,$ as Headless,M as Sandbox,In as __namedExportsOrder,Mn as default};
