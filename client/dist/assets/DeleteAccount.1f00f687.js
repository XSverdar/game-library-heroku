import{_ as u,N as p,T as s,r as _,o as m,c as h,a as v,d as e,t as g,F as k,p as b,e as f}from"./index.d90de39f.js";var A="/assets/WarningSign.95b06635.png";const $={name:"DeleteAccount",components:{Navbar:p},data(){return{username:""}},mounted(){const o=s.getLocalAccessToken(),c=`http://verdant-games.herokuapp.com/api/users/${s.getDecoded()._id}`,a=this;fetch(c,{headers:{Authorization:`token ${o}`},mode:"cors"}).then(t=>t.json()).then(t=>{console.log(t),a.username=t.username}).catch(t=>console.log(t))},methods:{async deleteAccount(){const o=s.getLocalAccessToken(),c=`http://verdant-games.herokuapp.com/api/users/${s.getDecoded()._id}`;(await fetch(c,{method:"DELETE",headers:{Authorization:`token ${o}`,"Content-Type":"application/json"},mode:"cors"})).ok?(s.removeToken(),this.$router.push({name:"Login"})):console.log("Account deletion unsuccessful.")}}},r=o=>(b("data-v-38bc1692"),o=o(),f(),o),y={class:"parent-container"},D={class:"container"},N=r(()=>e("div",{class:"bar"},null,-1)),S={class:"content-box"},T=r(()=>e("div",{class:"image-box"},[e("img",{src:A,alt:"Warning Sign Image"})],-1)),x=r(()=>e("h1",null,"Are you sure?",-1)),C={class:"flex-1"};function E(o,n,c,a,t,i){const l=_("Navbar");return m(),h(k,null,[v(l),e("div",y,[e("div",D,[N,e("div",S,[T,x,e("h2",null,g(t.username)+", this will permanently delete your account.",1),e("div",C,[e("button",{class:"cancel-button",onClick:n[0]||(n[0]=d=>o.$router.push({name:"EditAccount"}))},"Cancel"),e("button",{class:"confirm-button",onClick:n[1]||(n[1]=d=>i.deleteAccount())},"Confirm")])])])])],64)}var L=u($,[["render",E],["__scopeId","data-v-38bc1692"]]);export{L as default};
