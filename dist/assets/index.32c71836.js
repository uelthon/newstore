import{b as e,j as r,L as d}from"./index.accce544.js";import{C as i}from"./Cards.59afc533.js";import{C as m}from"./CarouselGallery.c71e8804.js";import"./CartButton.c5d093e6.js";const c=({brand:a})=>{const{data:t,isLoading:o}=e({params:{brands:[a]}});return o?r(d,{height:"30vh"}):r(m,{children:t.products.map(s=>r(i,{item:s},s.id))})};export{c as default};