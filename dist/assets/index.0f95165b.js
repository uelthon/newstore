import{q as u,h as l,j as t,aB as a,i as g,f as d,aC as b}from"./index.bbd83498.js";import{S as h,B as m}from"./Sort.02e8c7f5.js";import{T as f,a as s,b as p,c as v,d as _,e as x}from"./TableRow.103d1759.js";const O=[{label:"Desc",value:-1},{label:"Asc",value:1}],y=[{label:"recents",value:"createdAt"},{label:"amount",value:"amount"}],T=({params:r})=>{const e=u();return l("div",{style:{display:"flex",alignItems:"center",gap:"0.375rem"},children:[t(h,{valueDefault:r.orderby,options:y,handleChange:n=>e(a({...r,orderby:n.target.value}))}),t(h,{valueDefault:r.dir,options:O,handleChange:n=>e(a({...r,dir:n.target.value}))})]})},w=({order:r})=>{const e=new Date(r.createdAt).toDateString();return l(f,{children:[t(s,{align:"center",children:t(g,{to:`/order/${r.id}`,children:r.id})}),t(s,{align:"center",children:e}),t(s,{align:"center",children:r.products.length}),l(s,{align:"center",children:["$",r.amount]})]})},C=({isLoading:r,orders:e})=>t(p,{children:l(v,{children:[t(_,{children:l(f,{children:[t(s,{align:"center",children:"#"}),t(s,{align:"center",children:"Date"}),t(s,{align:"center",children:"Number of Items"}),t(s,{align:"center",children:"Amount"})]})}),t(x,{children:!r&&e.map(n=>t(w,{order:n},n.id))})]})}),D=({total:r=0,params:e})=>{const n=u();return t(m,{handleClick:{init:()=>n(a({...e,offset:0})),prev:()=>n(a({...e,offset:e.offset-e.limit})),next:()=>n(a({...e,offset:e.offset+e.limit})),last:()=>n(a({...e,offset:r-r%e.limit}))},total:r,offset:e.offset,limit:e.limit})},U="_container_amxpe_1",B="_wrapper_amxpe_17",N="_title_amxpe_35",S="_table_amxpe_45",i={container:U,wrapper:B,title:N,table:S},k=()=>{const r=d(c=>c.user.value),e=d(c=>c.pagination.orders),{data:n,isLoading:o}=b({id:r.id,params:e},{skip:!r||!e});return t("div",{className:i.container,children:l("div",{className:i.wrapper,children:[t("h1",{className:i.title,children:"Orders"}),t(T,{params:e}),l("div",{className:i.table,children:[t(D,{total:n&&n.count,params:e}),t(C,{orders:n&&n.orders,isLoading:o})]})]})})},I=k;export{I as default};