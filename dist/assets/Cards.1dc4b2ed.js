import{u as l,h as d,c as r,j as o,T as n,l as h,m as c,n as m}from"./index.97f4ede1.js";import{C as p}from"./CartButton.4e856f31.js";import{C as u,a as C,b as g}from"./CardMedia.ceb44255.js";const b=({item:e,minWidth:i})=>{const s=l(a=>a.layout.theme),t=d.exports.useRef();return r(u,{ref:t,onClick:()=>{t.current.scrollIntoView({inline:"center",block:"center",behavior:"smooth"})},sx:{minWidth:i,height:"auto"},children:[o(C,{component:"img",height:"140px",sx:{objectFit:s==="light"?"contain":"cover"},image:e.img,alt:e.name,loading:"lazy"}),r(g,{children:[o(n,{color:"primary",fontSize:"1rem",noWrap:!0,gutterBottom:!0,variant:"h5",component:"div",children:o(h,{to:`/product/${e.id}`,children:e.name})}),r(n,{variant:"body2",color:"text.secondary",children:["Price: $",e.price]})]}),o("div",{className:c.containerActions,children:r("div",{className:c.actions,children:[o(p,{id:e.id}),o(m,{id:e.id})]})})]})};export{b as C};
