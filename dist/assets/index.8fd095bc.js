import{b as o,j as r,L as e}from"./index.accce544.js";import{C as i}from"./Cards.59afc533.js";import{C as d}from"./CarouselGallery.c71e8804.js";import"./CartButton.c5d093e6.js";const c=()=>{const{data:s,isLoading:a}=o({params:{limit:8}});return a?r(e,{height:"30vh"}):r(d,{children:s.products.map(t=>r(i,{item:t},t.id))})};export{c as default};