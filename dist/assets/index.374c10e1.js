import{Z as u,j as h,a5 as ze,r as He,a6 as Qe,a7 as Ze,q as Je,h as me,t as et,K as tt,B as rt,L as nt,y as se,f as D,a8 as at,a9 as ot}from"./index.bbd83498.js";var c={exports:{}},st="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",it=st,ct=it;function ye(){}function he(){}he.resetWarningCache=ye;var ut=function(){function r(n,a,s,f,d,o){if(o!==ct){var v=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw v.name="Invariant Violation",v}}r.isRequired=r;function e(){return r}var t={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:e,element:r,elementType:r,instanceOf:e,node:r,objectOf:e,oneOf:e,oneOfType:e,shape:e,exact:e,checkPropTypes:he,resetWarningCache:ye};return t.PropTypes=t,t};c.exports=ut();var Ce="https://js.stripe.com/v3",lt=/^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/,ie="loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used",pt=function(){for(var e=document.querySelectorAll('script[src^="'.concat(Ce,'"]')),t=0;t<e.length;t++){var n=e[t];if(!!lt.test(n.src))return n}return null},ft=function(e){var t=e&&!e.advancedFraudSignals?"?advancedFraudSignals=false":"",n=document.createElement("script");n.src="".concat(Ce).concat(t);var a=document.head||document.body;if(!a)throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");return a.appendChild(n),n},dt=function(e,t){!e||!e._registerWrapper||e._registerWrapper({name:"stripe-js",version:"1.46.0",startTime:t})},B=null,vt=function(e){return B!==null||(B=new Promise(function(t,n){if(typeof window>"u"){t(null);return}if(window.Stripe&&e&&console.warn(ie),window.Stripe){t(window.Stripe);return}try{var a=pt();a&&e?console.warn(ie):a||(a=ft(e)),a.addEventListener("load",function(){window.Stripe?t(window.Stripe):n(new Error("Stripe.js not available"))}),a.addEventListener("error",function(){n(new Error("Failed to load Stripe.js"))})}catch(s){n(s);return}})),B},mt=function(e,t,n){if(e===null)return null;var a=e.apply(void 0,t);return dt(a,n),a},Se=Promise.resolve().then(function(){return vt(null)}),ge=!1;Se.catch(function(r){ge||console.warn(r)});var yt=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];ge=!0;var a=Date.now();return Se.then(function(s){return mt(s,t,a)})};function ce(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);e&&(n=n.filter(function(a){return Object.getOwnPropertyDescriptor(r,a).enumerable})),t.push.apply(t,n)}return t}function ue(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?ce(Object(t),!0).forEach(function(n){Ee(r,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):ce(Object(t)).forEach(function(n){Object.defineProperty(r,n,Object.getOwnPropertyDescriptor(t,n))})}return r}function W(r){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?W=function(e){return typeof e}:W=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},W(r)}function Ee(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function M(r,e){return ht(r)||Ct(r,e)||St(r,e)||gt()}function ht(r){if(Array.isArray(r))return r}function Ct(r,e){var t=r&&(typeof Symbol<"u"&&r[Symbol.iterator]||r["@@iterator"]);if(t!=null){var n=[],a=!0,s=!1,f,d;try{for(t=t.call(r);!(a=(f=t.next()).done)&&(n.push(f.value),!(e&&n.length===e));a=!0);}catch(o){s=!0,d=o}finally{try{!a&&t.return!=null&&t.return()}finally{if(s)throw d}}return n}}function St(r,e){if(!!r){if(typeof r=="string")return le(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);if(t==="Object"&&r.constructor&&(t=r.constructor.name),t==="Map"||t==="Set")return Array.from(r);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return le(r,e)}}function le(r,e){(e==null||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}function gt(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var G=function(e){var t=u.useRef(e);return u.useEffect(function(){t.current=e},[e]),t.current},j=function(e){return e!==null&&W(e)==="object"},Et=function(e){return j(e)&&typeof e.then=="function"},bt=function(e){return j(e)&&typeof e.elements=="function"&&typeof e.createToken=="function"&&typeof e.createPaymentMethod=="function"&&typeof e.confirmCardPayment=="function"},pe="[object Object]",xt=function r(e,t){if(!j(e)||!j(t))return e===t;var n=Array.isArray(e),a=Array.isArray(t);if(n!==a)return!1;var s=Object.prototype.toString.call(e)===pe,f=Object.prototype.toString.call(t)===pe;if(s!==f)return!1;if(!s&&!n)return e===t;var d=Object.keys(e),o=Object.keys(t);if(d.length!==o.length)return!1;for(var v={},E=0;E<d.length;E+=1)v[d[E]]=!0;for(var S=0;S<o.length;S+=1)v[o[S]]=!0;var b=Object.keys(v);if(b.length!==d.length)return!1;var _=e,x=t,O=function(P){return r(_[P],x[P])};return b.every(O)},be=function(e,t,n){return j(e)?Object.keys(e).reduce(function(a,s){var f=!j(t)||!xt(e[s],t[s]);return n.includes(s)?(f&&console.warn("Unsupported prop change: options.".concat(s," is not a mutable property.")),a):f?ue(ue({},a||{}),{},Ee({},s,e[s])):a},null):null},Ot="Invalid prop `stripe` supplied to `Elements`. We recommend using the `loadStripe` utility from `@stripe/stripe-js`. See https://stripe.com/docs/stripe-js/react#elements-props-stripe for details.",fe=function(e){if(e===null||bt(e))return e;throw new Error(Ot)},wt=function(e){if(Et(e))return{tag:"async",stripePromise:Promise.resolve(e).then(fe)};var t=fe(e);return t===null?{tag:"empty"}:{tag:"sync",stripe:t}},K=u.createContext(null);K.displayName="ElementsContext";var _t=function(e,t){if(!e)throw new Error("Could not find Elements context; You need to wrap the part of your app that ".concat(t," in an <Elements> provider."));return e},X=u.createContext(null);X.displayName="CartElementContext";var Pt=function(e,t){if(!e)throw new Error("Could not find Elements context; You need to wrap the part of your app that ".concat(t," in an <Elements> provider."));return e},xe=function(e){var t=e.stripe,n=e.options,a=e.children,s=u.useMemo(function(){return wt(t)},[t]),f=u.useState(null),d=M(f,2),o=d[0],v=d[1],E=u.useState(null),S=M(E,2),b=S[0],_=S[1],x=u.useState(function(){return{stripe:s.tag==="sync"?s.stripe:null,elements:s.tag==="sync"?s.stripe.elements(n):null}}),O=M(x,2),g=O[0],P=O[1];u.useEffect(function(){var C=!0,L=function($){P(function(I){return I.stripe?I:{stripe:$,elements:$.elements(n)}})};return s.tag==="async"&&!g.stripe?s.stripePromise.then(function(N){N&&C&&L(N)}):s.tag==="sync"&&!g.stripe&&L(s.stripe),function(){C=!1}},[s,g,n]);var A=G(t);u.useEffect(function(){A!==null&&A!==t&&console.warn("Unsupported prop change on Elements: You cannot change the `stripe` prop after setting it.")},[A,t]);var T=G(n);return u.useEffect(function(){if(!!g.elements){var C=be(n,T,["clientSecret","fonts"]);C&&g.elements.update(C)}},[n,T,g.elements]),u.useEffect(function(){var C=g.stripe;!C||!C._registerWrapper||!C.registerAppInfo||(C._registerWrapper({name:"react-stripe-js",version:"1.16.0"}),C.registerAppInfo({name:"react-stripe-js",version:"1.16.0",url:"https://stripe.com/docs/stripe-js/react"}))},[g.stripe]),h(K.Provider,{value:g,children:h(X.Provider,{value:{cart:o,setCart:v,cartState:b,setCartState:_},children:a})})};xe.propTypes={stripe:c.exports.any,options:c.exports.object};var U=function(e){var t=u.useContext(K);return _t(t,e)},de=function(e){var t=u.useContext(X);return Pt(t,e)},Rt=function(){var e=U("calls useElements()"),t=e.elements;return t},kt=function(){var e=U("calls useStripe()"),t=e.stripe;return t};c.exports.func.isRequired;var m=function(e){var t=u.useRef(e);return u.useEffect(function(){t.current=e},[e]),function(){t.current&&t.current.apply(t,arguments)}},y=function(){},jt=function(e){return e.charAt(0).toUpperCase()+e.slice(1)},l=function(e,t){var n="".concat(jt(e),"Element"),a=function(o){var v=o.id,E=o.className,S=o.options,b=S===void 0?{}:S,_=o.onBlur,x=_===void 0?y:_,O=o.onFocus,g=O===void 0?y:O,P=o.onReady,A=P===void 0?y:P,T=o.onChange,C=T===void 0?y:T,L=o.onEscape,N=L===void 0?y:L,$=o.onClick,I=$===void 0?y:$,Y=o.onLoadError,we=Y===void 0?y:Y,V=o.onLoaderStart,_e=V===void 0?y:V,z=o.onNetworksChange,Pe=z===void 0?y:z,H=o.onCheckout,Re=H===void 0?y:H,Q=o.onLineItemClick,ke=Q===void 0?y:Q,Z=o.onConfirm,je=Z===void 0?y:Z,J=o.onCancel,Ae=J===void 0?y:J,ee=o.onShippingAddressChange,Te=ee===void 0?y:ee,te=o.onShippingRateChange,Le=te===void 0?y:te,Ne=U("mounts <".concat(n,">")),re=Ne.elements,R=u.useRef(null),q=u.useRef(null),ne=de("mounts <".concat(n,">")),ae=ne.setCart,k=ne.setCartState,F=m(A),$e=m(x),Ie=m(g),Be=m(I),We=m(C),Ue=m(N),qe=m(we),Fe=m(_e),Me=m(Pe),De=m(Re),Ge=m(ke),Ke=m(je),Xe=m(Ae),Ye=m(Te),Ve=m(Le);u.useLayoutEffect(function(){if(R.current==null&&re&&q.current!=null){var i=re.create(e,b);e==="cart"&&ae&&ae(i),R.current=i,i.mount(q.current),i.on("ready",function(w){e==="cart"?(k&&k(w),F(w)):F(e==="payButton"?w:i)}),i.on("change",function(w){e==="cart"&&k&&k(w),We(w)}),i.on("blur",$e),i.on("focus",Ie),i.on("escape",Ue),i.on("loaderror",qe),i.on("loaderstart",Fe),i.on("networkschange",Me),i.on("click",Be),i.on("checkout",function(w){e==="cart"&&k&&k(w),De(w)}),i.on("lineitemclick",Ge),i.on("confirm",Ke),i.on("cancel",Xe),i.on("shippingaddresschange",Ye),i.on("shippingratechange",Ve)}});var oe=G(b);return u.useEffect(function(){if(!!R.current){var i=be(b,oe,["paymentRequest"]);i&&R.current.update(i)}},[b,oe]),u.useLayoutEffect(function(){return function(){R.current&&(R.current.destroy(),R.current=null)}},[]),h("div",{id:v,className:E,ref:q})},s=function(o){U("mounts <".concat(n,">")),de("mounts <".concat(n,">"));var v=o.id,E=o.className;return h("div",{id:v,className:E})},f=t?s:a;return f.propTypes={id:c.exports.string,className:c.exports.string,onChange:c.exports.func,onBlur:c.exports.func,onFocus:c.exports.func,onReady:c.exports.func,onEscape:c.exports.func,onClick:c.exports.func,onLoadError:c.exports.func,onLoaderStart:c.exports.func,onNetworksChange:c.exports.func,onCheckout:c.exports.func,onLineItemClick:c.exports.func,onConfirm:c.exports.func,onCancel:c.exports.func,onShippingAddressChange:c.exports.func,onShippingRateChange:c.exports.func,options:c.exports.object},f.displayName=n,f.__elementType=e,f},p=typeof window>"u";l("auBankAccount",p);var Oe=l("card",p);l("cardNumber",p);l("cardExpiry",p);l("cardCvc",p);l("fpxBank",p);l("iban",p);l("idealBank",p);l("p24Bank",p);l("epsBank",p);l("payment",p);l("payButton",p);l("paymentRequestButton",p);l("linkAuthentication",p);l("address",p);l("shippingAddress",p);l("cart",p);l("paymentMethodMessaging",p);l("affirmMessage",p);l("afterpayClearpayMessage",p);const At={style:{base:{color:"#32325d",fontFamily:"Arial, sans-serif",fontSmoothing:"antialiased",fontSize:"16px","::placeholder":{color:"#32325d"}},invalid:{fontFamily:"Arial, sans-serif",color:"#fa755a",iconColor:"#fa755a"}}};function Tt(){return h(Oe,{options:At})}const Lt="/api/payments",Nt=async r=>{const{data:e}=await ze.post(Lt,r);return e},$t={payOut:Nt},It="_container_1ontc_1",Bt={container:It},Wt=({user:r,products:e,amount:t})=>{const n=kt(),a=Rt(),[s,f]=He.exports.useState(!1),[d]=Qe(),o=Ze(),v=Je();if(!e)return null;const E=async S=>{if(S.preventDefault(),a==null)return;f(!0);const b={user:r.id,products:e,amount:t,address:S.target.address.value,status:"success"},_=await $t.payOut({amount:t*100}),x=await n.confirmCardPayment(_.clientSecret,{payment_method:{card:a.getElement(Oe),billing_details:{name:r.username}}});if(x.error&&(console.log(x.error.message),v(se({desc:x.error.message,type:"error"})),f(!1)),x.paymentIntent.status==="succeeded"){const O=await d({body:b}).unwrap();f(!1),o(`/order/${O.id}`),v(se({desc:"Payment successful, Thank you for your purchase :)",type:"success"}))}};return me(et,{className:Bt.container,component:"form",onSubmit:E,children:[h(tt,{required:!0,fullWidth:!0,id:"outlined-required",label:"Address",name:"address",defaultValue:r.address}),h(Tt,{}),h(rt,{variant:"contained",type:"submit",size:"large",disabled:!n||!a||e.length===0||s,sx:{width:"100%",color:"#f2f2f2",backgroundColor:"#198754"},children:s?h(nt,{}):"Submit"})]})},Ut=yt("pk_test_51LesuYHNbYEEZKbu8GG5id1Pqlsu0uEKQREX84BqliGMoM4lmBL3SV10AQBXX3RPZ9MXjqxceOvqANtpKY3g7GLw00I8ItX7pl"),qt=()=>{const r=D(n=>n.cart.value),e=D(n=>n.user.value),{data:t}=at({id:e.id},{skip:r===null||e===null});return!r||!e?null:h(xe,{stripe:Ut,children:h(Wt,{products:r.products,user:e,amount:t.length>0?t[0].total:0})})},Ft="_container_1nyk1_1",Mt="_wrapper_1nyk1_17",ve={container:Ft,wrapper:Mt},Dt=()=>{const r=D(e=>e.cart.value);return r?h("div",{className:ve.container,children:me("div",{className:ve.wrapper,children:[h(ot,{cart:r}),h(qt,{})]})}):null},Kt=Dt;export{Kt as default};
