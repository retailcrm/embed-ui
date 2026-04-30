import{c as we}from"./host-CMQl2KSi.js";import{_ as ye}from"./UiAvatar-XE5j8BpN.js";import{_ as ve}from"./UiCheckbox-CXJMPWNZ.js";import{_ as je}from"./UiLink-CJ6v87MN.js";import{V as z,A as D,_ as Te,a as Ue,b as _e,c as Ce,d as ke,e as Se,f as Be,g as Fe,h as Re}from"./UiTableSorter-D3_xrfOM.js";import{_ as Ae}from"./UiTag-B2lKjcR6.js";import{h as ae,a7 as re,C as Ie,T as Ne,F as Ee,w as Ge,K as s,r as Ve,q as Me,P as $e}from"./iframe-DnG3g5pW.js";import{d as b,c as le}from"./createRemoteStoryRender-CQKxbukF.js";import{d as w}from"./docsOnlyStory-D04fiwRX.js";import{u as se,j as n}from"./index-DFg_Ho_i.js";import{S,A as Le}from"./blocks-DBDDY4vL.js";import"./UiImage-DAV3UgrU.js";import"./predicate-ClulhfEu.js";import"./done-B176HZ5x.js";import"./utils-BqzVSXwn.js";import"./composables-CfEvSTVp.js";import"./clear-jf7bAM_2.js";import"./plugin-DbbfKnFn.js";import"./index-BAxMPZdI.js";import"./preload-helper-PPVm8Dsz.js";import"./index-nl1gzEpR.js";const O=ae({name:"UiTableColumn",props:{label:{type:String,default:""},width:{type:[String,Number],default:void 0},minWidth:{type:[String,Number],default:void 0},maxWidth:{type:[String,Number],default:void 0},align:{type:String,default:D.LEFT,validator:t=>Object.values(D).includes(t)},valign:{type:String,default:z.MIDDLE,validator:t=>Object.values(z).includes(t)},trim:{type:Boolean,default:!1},colspan:{type:Function,default:void 0},rowspan:{type:Function,default:void 0}},setup(){return()=>null}});O.__docgenInfo=Object.assign({displayName:O.name??O.__name},{displayName:"UiTableColumn",exportName:"default",description:"",tags:{},props:[{name:"label",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"width",type:{name:"string|number"},defaultValue:{func:!1,value:"undefined"}},{name:"minWidth",type:{name:"string|number"},defaultValue:{func:!1,value:"undefined"}},{name:"maxWidth",type:{name:"string|number"},defaultValue:{func:!1,value:"undefined"}},{name:"align",type:{name:"ALIGN | `${ALIGN}`"},defaultValue:{func:!1,value:"ALIGN.LEFT"}},{name:"valign",type:{name:"VALIGN | `${VALIGN}`"},defaultValue:{func:!1,value:"VALIGN.MIDDLE"}},{name:"trim",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"colspan",type:{name:"(row: unknown, index: number) => number | undefined"},defaultValue:{func:!1,value:"undefined"}},{name:"rowspan",type:{name:"(row: unknown, index: number) => number | undefined"},defaultValue:{func:!1,value:"undefined"}}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/table/UiTableColumn.vue"]});const Oe="UiTableRoot",We=b(Oe),ze="UiTableSection",G=b(ze),De="UiTableRow",g=b(De,["click"]),Ke="UiTableCol",He=b(Ke),Pe="UiTableFooterSection";b(Pe);const Xe="UiTableFooterButton";b(Xe,["click"]);const qe="UiTableHeadCell",ie=b(qe),Ye="UiTableBodyCell",x=b(Ye),Ze="UiTableSorter";b(Ze,["click"]);const X=(t,e)=>typeof t.type!="object"||t.type===null?!1:"name"in t.type&&t.type.name===e,Je=t=>t.type===O||X(t,"UiTableColumn"),Y=t=>t.trim().length===0,K=t=>{const e=[];return t.forEach(a=>{if(Array.isArray(a)){e.push(...K(a));return}if(typeof a=="string"){Y(a)||e.push(a);return}if(typeof a=="number"){e.push(a);return}if(re(a)&&a.type!==Ie){if(a.type===Ne){const l=typeof a.children=="string"?a.children:"";Y(l)||e.push(l);return}if(a.type===Ee&&Array.isArray(a.children)){e.push(...K(a.children));return}e.push(a)}}),e},Qe=t=>t===""||t===!0,en=t=>typeof t=="string"?t:"",nn=t=>Object.values(D).includes(t)?t:D.LEFT,tn=t=>Object.values(z).includes(t)?t:z.MIDDLE,on=t=>{const e=t.children;if(!e||Array.isArray(e)||typeof e=="string")return{};const a=e;return{defaultSlot:a.default,cellSlot:a.cell,labelSlot:a.label}},Z=t=>typeof t=="function"?t:()=>{},an=t=>K(t).filter(e=>re(e)).filter(Je).map((e,a)=>{const l=e.props??{},c=on(e);return{id:String(e.key??`ui-v1-table-column-${a}`),label:en(l.label),width:l.width,minWidth:l.minWidth??l["min-width"],maxWidth:l.maxWidth??l["max-width"],align:nn(l.align),valign:tn(l.valign),trim:Qe(l.trim),getColspan:Z(l.colspan),getRowspan:Z(l.rowspan),cellSlot:c.cellSlot,defaultSlot:c.defaultSlot,labelSlot:c.labelSlot}}),J=t=>{if(typeof t>"u")return;const e=Math.trunc(Number(t));if(!(!Number.isFinite(e)||e<1))return e},rn=t=>t.labelSlot?.({column:t})??[t.label],ln=(t,e)=>t.cellSlot?.(e)??t.defaultSlot?.(e)??[],Q=t=>{const e=Array.from({length:t.columns.length},()=>0);return t.rows.map((a,l)=>{const c=t.resolveKey(a,l),j=t.expandedKeys.has(c),p=()=>t.toggle(c),N=t.resolveRowAttrs(a,l),y=[];let E=0;return t.columns.forEach((T,U)=>{if(E>0){E-=1;return}if(e[U]>0){e[U]-=1;return}const H={row:a,index:l,key:c,expanded:j,toggle:p,column:T},_=J(T.getColspan(a,l)),C=J(T.getRowspan(a,l)),f=_&&_>1?_:void 0,k=C&&C>1?C:void 0;if(f&&(E=f-1),k)for(let v=0;v<(f??1);v++)e[U+v]=Math.max(e[U+v]??0,k-1);y.push({column:T,colspan:f,rowspan:k,slotProps:H})}),{row:a,index:l,key:c,attrs:N,expanded:j,toggle:p,cells:y,className:[t.resolveRowClass(a,l),N.class,t.extraClass]}})},sn=t=>typeof t=="string"||typeof t=="number"?!1:t.type===x||t.type===ie||X(t,"UiTableBodyCell")||X(t,"UiTableHeadCell")||t.type==="td"||t.type==="th",ee=t=>{const e=K(t);return e.length===0?!0:!e.every(sn)},dn=(t,e)=>t?.(e)??[String(e.group.key)],cn=(t,e)=>t?.(e)??[],ne=(t,e,a)=>typeof t=="function"?t(e,a):t,te=(t,e,a)=>t?.(e,a)??{},P=(t,e,a)=>{if(typeof t=="function")return t(e,a);if(typeof t<"u"&&typeof e=="object"&&e!==null&&t in e){const l=e[t];if(typeof l=="string"||typeof l=="number")return l}return a},un=t=>{const e={...t};return delete e.class,e},W=ae({name:"UiTable",inheritAttrs:!1,props:{rows:{type:Array,default:()=>[]},rowKey:{type:[String,Number,Function],default:void 0},headless:{type:Boolean,default:!1},bordered:{type:Boolean,default:!1},fixed:{type:Boolean,default:!1},rowClass:{type:[String,Array,Object,Function],default:void 0},rowAttrs:{type:Function,default:void 0},groupBy:{type:Function,default:void 0},groupHeadClass:{type:[String,Array,Object],default:void 0},groupBodyClass:{type:[String,Array,Object],default:void 0}},emits:{"row:click":(t,e)=>!0},setup(t,{attrs:e,emit:a,expose:l,slots:c}){const j=$e(),p=Ve([]),N=Me(()=>!!(j?.vnode.props?.onRowClick||j?.vnode.props?.["onRow:click"])),y=o=>{p.value=p.value.includes(o)?p.value.filter(r=>r!==o):[...p.value,o]};l({resetExpanded:()=>{p.value=[]},expand:o=>{p.value.includes(o)||(p.value=[...p.value,o])},collapse:o=>{p.value=p.value.filter(r=>r!==o)},toggle:y}),Ge([()=>t.rows,()=>t.rowKey],()=>{const o=new Set(t.rows.map((i,u)=>P(t.rowKey,i,u))),r=p.value.filter(i=>o.has(i));r.length!==p.value.length&&(p.value=r)},{deep:!1});const H=()=>an(c.default?.()??[]),_=()=>t.groupBy?t.groupBy(t.rows):[],C=(o,r)=>({columnsCount:o.length,rowsCount:t.rows.length,groupsCount:r.length,groups:r}),f=()=>["footer-summary","footer-page-size","footer-export","footer-pagination"].some(o=>!!c[o]),k=()=>!!c.footer||f(),v=o=>Math.max(o.length,1),ce=o=>Q({columns:o,rows:t.rows,expandedKeys:new Set(p.value),resolveKey:(r,i)=>P(t.rowKey,r,i),resolveRowAttrs:(r,i)=>te(t.rowAttrs,r,i),resolveRowClass:(r,i)=>ne(t.rowClass,r,i),toggle:y}),ue=(o,r)=>r.map(i=>({group:i,rows:Q({columns:o,rows:i.rows,expandedKeys:new Set(p.value),extraClass:t.groupBodyClass,resolveKey:(u,d)=>P(t.rowKey,u,d),resolveRowAttrs:(u,d)=>te(t.rowAttrs,u,d),resolveRowClass:(u,d)=>ne(t.rowClass,u,d),toggle:y})})),pe=(o,r)=>{a("row:click",o,r)},q=(o,r,i="row")=>{const u=`${String(o.key)}:${i}`;return[s(g,{key:u,interactive:N.value,expanded:o.expanded,...un(o.attrs),class:o.className,onClick:d=>pe({row:o.row,index:o.index,key:o.key,expanded:o.expanded,toggle:o.toggle},d)},()=>o.cells.map((d,h)=>s(x,{key:`${u}:cell:${d.column.id}:${h}`,align:d.column.align,valign:d.column.valign,colspan:d.colspan,rowspan:d.rowspan,trim:d.column.trim},()=>ln(d.column,d.slotProps)))),c.expand&&o.expanded?s(g,{key:`${u}:expand`,expanded:!0},()=>s(x,{colspan:r},()=>cn(c.expand,{row:o.row,index:o.index,key:o.key}))):null]},me=(o,r,i)=>{const u=dn(c["group-head"],{group:o,index:r});return s(g,{key:`${String(o.key)}:group-head`,class:t.groupHeadClass},()=>ee(u)?s(x,{colspan:i,theme:"group"},()=>s("div",{class:"ui-v1-table__group-head"},u)):u)},be=o=>s(g,{key:"empty"},()=>s(x,{colspan:o},()=>s("div",{class:"ui-v1-table__empty"},c.empty?.()??[]))),fe=(o,r)=>{if(!k())return null;if(f()){const u=c["footer-summary"]?.(o),d=c["footer-page-size"]?.(o),h=c["footer-export"]?.(o),m=c["footer-pagination"]?.(o);return s(G,{kind:"foot",key:"footer"},()=>s(g,()=>s(x,{colspan:r,class:"ui-v1-table__footer-cell"},()=>s("div",{class:"ui-v1-table__footer"},[u?s("div",{class:"ui-v1-table__footer-meta"},[u]):null,d||h||m?s("div",{class:"ui-v1-table__footer-controls"},[d||h?s("div",{class:"ui-v1-table__footer-main"},[d,h]):null,m?s("div",{class:"ui-v1-table__footer-side"},[m]):null]):null]))))}const i=c.footer?.(o)??[];return s(G,{kind:"foot",key:"footer"},()=>s(g,()=>ee(i)?s(x,{colspan:r},()=>i):i))};return()=>s(We,{...e,bordered:t.bordered,fixed:t.fixed},()=>[(()=>{const o=H(),r=v(o),i=_(),u=C(o,i),d=ce(o),h=ue(o,i);return[o.length>0?s("colgroup",{key:"colgroup"},o.map(m=>s(He,{key:`col:${m.id}`,width:m.width,minWidth:m.minWidth,maxWidth:m.maxWidth}))):null,!t.headless&&o.length>0?s(G,{key:"head",kind:"head"},()=>s(g,()=>o.map(m=>s(ie,{key:`head:${m.id}`,align:m.align,trim:m.trim},()=>rn(m))))):null,s(G,{key:"body",kind:"body"},()=>t.rows.length===0?be(r):t.groupBy?h.flatMap(({group:m,rows:he},ge)=>[me(m,ge,r),...he.flatMap(xe=>q(xe,r,`${String(m.key)}:row`))]):d.flatMap(m=>q(m,r))),fe(u,r)]})()])}});W.__docgenInfo=Object.assign({displayName:W.name??W.__name},{displayName:"UiTable",exportName:"default",description:"",tags:{},props:[{name:"rows",type:{name:"readonly unknown[]"},defaultValue:{func:!0,value:"() => []"}},{name:"rowKey",type:{name:"string | number | RowKeyGetter<unknown>"},defaultValue:{func:!1,value:"undefined"}},{name:"headless",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"bordered",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"fixed",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"rowClass",type:{name:"CssClass | RowClassGetter<unknown>"},defaultValue:{func:!1,value:"undefined"}},{name:"rowAttrs",type:{name:"RowAttrsGetter<unknown>"},defaultValue:{func:!1,value:"undefined"}},{name:"groupBy",type:{name:"GroupBy<unknown, unknown>"},defaultValue:{func:!1,value:"undefined"}},{name:"groupHeadClass",type:{name:"CssClass"},defaultValue:{func:!1,value:"undefined"}},{name:"groupBodyClass",type:{name:"CssClass"},defaultValue:{func:!1,value:"undefined"}}],events:[{name:"row:click"}],sourceFiles:["/home/runner/work/embed-ui/embed-ui/packages/v1-components/src/remote/components/table/UiTable.vue"]});function pn(t){return new Worker(""+new URL("UiTable.reference.remote-BzHducwt.js",import.meta.url).href,{name:t?.name})}function mn(t){return new Worker(""+new URL("UiTable.remote-FaZYu6_u.js",import.meta.url).href,{name:t?.name})}function oe(t){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...se(),...t.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{id:"uitable",children:"UiTable"}),`
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
`,n.jsx(S,{of:F}),`
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
`,n.jsx(S,{of:R}),`
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
`,n.jsx(S,{of:A}),`
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
`,n.jsx(Le,{})]})}function bn(t={}){const{wrapper:e}={...se(),...t.components};return e?n.jsx(e,{...t,children:n.jsx(oe,{...t})}):oe(t)}const de=we({UiAvatar:ye,UiCheckbox:ve,UiLink:je,UiTableBodyCell:Re,UiTableCol:Fe,UiTableFooterButton:Be,UiTableFooterSection:Se,UiTableHeadCell:ke,UiTableRoot:Ce,UiTableRow:_e,UiTableSection:Ue,UiTableSorter:Te,UiTag:Ae}),Gn={title:"Components/UiTable",component:W,argTypes:{rows:{control:!1},rowKey:{control:!1},rowClass:{control:!1},rowAttrs:{control:!1},groupBy:{control:!1},groupHeadClass:{control:!1},groupBodyClass:{control:!1},headless:{control:"boolean"},bordered:{control:"boolean"},fixed:{control:"boolean"},withGrouping:{control:"boolean"},withExpand:{control:"boolean"},showServiceColumn:{control:"boolean"},empty:{control:"boolean"},dense:{control:"boolean"},footerMode:{control:"select",options:["none","simple","structured"]}},render:le({provider:de,worker:mn}),parameters:{docs:{page:bn},layout:"padded"}},V={args:{headless:!1,bordered:!1,fixed:!1,withGrouping:!1,withExpand:!1,showServiceColumn:!0,footerMode:"none",empty:!1}},B=w({args:{bordered:!1,fixed:!1,withExpand:!1,withGrouping:!1,footerMode:"none"}}),M=w({args:{bordered:!0,fixed:!0,withExpand:!1,withGrouping:!1,footerMode:"none"}}),F=w({args:{bordered:!0,fixed:!1,withExpand:!0,withGrouping:!1,footerMode:"none"}}),R=w({args:{bordered:!0,fixed:!1,withGrouping:!0,withExpand:!1,footerMode:"none"}}),$=w({args:{headless:!0,bordered:!0,fixed:!1,withGrouping:!1,withExpand:!1,footerMode:"simple"}}),A=w({args:{bordered:!0,fixed:!1,withGrouping:!1,withExpand:!1,footerMode:"none",dense:!0}}),L=w({args:{bordered:!0,fixed:!1,withGrouping:!1,withExpand:!1,footerMode:"structured",empty:!0}}),I={args:{empty:!1},render:le({provider:de,worker:pn}),name:"Кампании и отправки",parameters:{layout:"fullscreen"}};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
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
})`,...M.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    bordered: true,
    fixed: false,
    withExpand: true,
    withGrouping: false,
    footerMode: 'none'
  }
})`,...F.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    bordered: true,
    fixed: false,
    withGrouping: true,
    withExpand: false,
    footerMode: 'none'
  }
})`,...R.parameters?.docs?.source}}};$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    headless: true,
    bordered: true,
    fixed: false,
    withGrouping: false,
    withExpand: false,
    footerMode: 'simple'
  }
})`,...$.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    bordered: true,
    fixed: false,
    withGrouping: false,
    withExpand: false,
    footerMode: 'none',
    dense: true
  }
})`,...A.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`docsOnlyStory({
  args: {
    bordered: true,
    fixed: false,
    withGrouping: false,
    withExpand: false,
    footerMode: 'structured',
    empty: true
  }
})`,...L.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
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
}`,...I.parameters?.docs?.source}}};const Vn=["Sandbox","Basic","BorderedFixed","ExpandableRows","GroupedRows","Headless","Dense","EmptyState","CampaignsOverview"];export{B as Basic,M as BorderedFixed,I as CampaignsOverview,A as Dense,L as EmptyState,F as ExpandableRows,R as GroupedRows,$ as Headless,V as Sandbox,Vn as __namedExportsOrder,Gn as default};
