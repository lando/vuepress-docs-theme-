import{_ as d,o as s,c as t,a as r,F as u,f as p,b as n,t as a,A as i,B as c,g as m}from"./app.b1792a2b.js";const g={id:"versions-list",class:"versions-list"},v={key:0},V={__name:"VersionsList",props:{edgeVersion:{type:Object,default:null},versions:{type:Array,required:!0}},setup(l){const e=l;return(f,y)=>(s(),t("div",g,[r("ul",null,[(s(!0),t(u,null,p(e.versions,(o,_)=>(s(),t("li",{key:_},[r("a",i(c(o)),a(o.name),17)]))),128))]),e.edgeVersion?(s(),t("div",v,[n(" Or check out bleeding edge documentation over on the "),r("a",i(c(e.edgeVersion)),a(e.edgeVersion.name),17),n(" branch! ")])):m("v-if",!0)]))}},k=d(V,[["__file","VersionsList.vue"]]);export{k as default};