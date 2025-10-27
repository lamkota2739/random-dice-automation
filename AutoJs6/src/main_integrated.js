var async = (function(){ (function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):(e="undefined"==typeof globalThis?e||self:globalThis,t(e.async={}))})(this,function(e){"use strict";function t(e,...t){return(...n)=>e(...t,...n)}function n(e){return function(...t){var n=t.pop();return e.call(this,t,n)}}function a(e){setTimeout(e,0)}function i(e){return(t,...n)=>e(()=>t(...n))}function r(e){return d(e)?function(...t){const n=t.pop(),a=e.apply(this,t);return s(a,n)}:n(function(t,n){var a;try{a=e.apply(this,t)}catch(t){return n(t)}return a&&"function"==typeof a.then?s(a,n):void n(null,a)})}function s(e,t){return e.then(e=>{l(t,null,e)},e=>{l(t,e&&(e instanceof Error||e.message)?e:new Error(e))})}function l(e,t,n){try{e(t,n)}catch(e){_e(t=>{throw t},e)}}function d(e){return"AsyncFunction"===e[Symbol.toStringTag]}function u(e){return"AsyncGenerator"===e[Symbol.toStringTag]}function p(e){return"function"==typeof e[Symbol.asyncIterator]}function c(e){if("function"!=typeof e)throw new Error("expected a function");return d(e)?r(e):e}function o(e,t){function n(...n){return"function"==typeof n[t-1]?e.apply(this,n):new Promise((a,i)=>{n[t-1]=(e,...t)=>e?i(e):void a(1<t.length?t:t[0]),e.apply(this,n)})}if(t||(t=e.length),!t)throw new Error("arity is undefined");return n}function h(e){return function a(t,...n){const i=o(function(a){var i=this;return e(t,(e,t)=>{c(e).apply(i,n.concat(t))},a)});return i}}function f(e,t,n,a){t=t||[];var i=[],r=0,s=c(n);return e(t,(e,t,n)=>{var a=r++;s(e,(e,t)=>{i[a]=t,n(e)})},e=>{a(e,i)})}function y(e){return e&&"number"==typeof e.length&&0<=e.length&&0==e.length%1}function m(e){function t(...t){if(null!==e){var n=e;e=null,n.apply(this,t)}}return Object.assign(t,e),t}function g(e){return e[Symbol.iterator]&&e[Symbol.iterator]()}function k(e){var t=-1,n=e.length;return function a(){return++t<n?{value:e[t],key:t}:null}}function v(e){var t=-1;return function n(){var a=e.next();return a.done?null:(t++,{value:a.value,key:t})}}function S(e){var t=e?Object.keys(e):[],n=-1,a=t.length;return function i(){var r=t[++n];return"__proto__"===r?i():n<a?{value:e[r],key:r}:null}}function x(e){if(y(e))return k(e);var t=g(e);return t?v(t):S(e)}function L(e){return function(...t){if(null===e)throw new Error("Callback was already called.");var n=e;e=null,n.apply(this,t)}}function E(e,t,n,a){function i(){p>=t||u||l||(u=!0,e.next().then(({value:e,done:t})=>{if(!(d||l))return u=!1,t?(l=!0,void(0>=p&&a(null))):void(p++,n(e,c,r),c++,i())}).catch(s))}function r(e,t){return p-=1,d?void 0:e?s(e):!1===e?(l=!0,void(d=!0)):t===be||l&&0>=p?(l=!0,a(null)):void i()}function s(e){d||(u=!1,l=!0,a(e))}let l=!1,d=!1,u=!1,p=0,c=0;i()}function O(e,t,n){function a(e,t){!1===e&&(l=!0);!0===l||(e?n(e):(++r===s||t===be)&&n(null))}n=m(n);var i=0,r=0,{length:s}=e,l=!1;for(0===s&&n(null);i<s;i++)t(e[i],i,L(a))}function _(e,t,n){return Ie(e,1/0,t,n)}function b(){function e(e,...a){return e?n(e):void t(1<a.length?a:a[0])}let t,n;return e[Ce]=new Promise((e,a)=>{t=e,n=a}),e}function A(e,t,n){function a(e,t){k.push(()=>l(e,t))}function i(){if(!f){if(0===k.length&&0===h)return n(null,o);for(;k.length&&h<t;){var e=k.shift();e()}}}function r(e,t){var n=g[e];n||(n=g[e]=[]),n.push(t)}function s(e){var t=g[e]||[];t.forEach(e=>e()),i()}function l(e,t){if(!y){var a=L((t,...a)=>{if(h--,!1===t)return void(f=!0);if(2>a.length&&([a]=a),t){var i={};if(Object.keys(o).forEach(e=>{i[e]=o[e]}),i[e]=a,y=!0,g=Object.create(null),f)return;n(t,i)}else o[e]=a,s(e)});h++;var i=c(t[t.length-1]);1<t.length?i(o,a):i(a)}}function d(){for(var e,t=0;v.length;)e=v.pop(),t++,u(e).forEach(e=>{0==--S[e]&&v.push(e)});if(t!==p)throw new Error("async.auto cannot execute tasks due to a recursive dependency")}function u(t){var n=[];return Object.keys(e).forEach(a=>{const i=e[a];Array.isArray(i)&&0<=i.indexOf(t)&&n.push(a)}),n}"number"!=typeof t&&(n=t,t=null),n=m(n||b());var p=Object.keys(e).length;if(!p)return n(null);t||(t=p);var o={},h=0,f=!1,y=!1,g=Object.create(null),k=[],v=[],S={};return Object.keys(e).forEach(t=>{var n=e[t];if(!Array.isArray(n))return a(t,[n]),void v.push(t);var i=n.slice(0,n.length-1),s=i.length;return 0===s?(a(t,n),void v.push(t)):void(S[t]=s,i.forEach(l=>{if(!e[l])throw new Error("async.auto task `"+t+"` has a non-existent dependency `"+l+"` in "+i.join(", "));r(l,()=>{s--,0===s&&a(t,n)})}))}),d(),i(),n[Ce]}function I(e){let t="",n=0,a=e.indexOf("*/");for(;n<e.length;)if("/"===e[n]&&"/"===e[n+1]){let t=e.indexOf("\n",n);n=-1===t?e.length:t}else if(-1!==a&&"/"===e[n]&&"*"===e[n+1]){let i=e.indexOf("*/",n);-1===i?(t+=e[n],n++):(n=i+2,a=e.indexOf("*/",n))}else t+=e[n],n++;return t}function M(e){const t=I(e.toString());let n=t.match(Pe);if(n||(n=t.match(Re)),!n)throw new Error("could not parse args in autoInject\nSource:\n"+t);let[,a]=n;return a.replace(/\s/g,"").split(ze).map(e=>e.replace(Ne,"").trim())}function j(e,t){var n={};return Object.keys(e).forEach(t=>{function a(e,t){var n=i.map(t=>e[t]);n.push(t),c(r)(...n)}var i,r=e[t],s=d(r),l=!s&&1===r.length||s&&0===r.length;if(Array.isArray(r))i=[...r],r=i.pop(),n[t]=i.concat(0<i.length?a:r);else if(l)n[t]=r;else{if(i=M(r),0===r.length&&!s&&0===i.length)throw new Error("autoInject task functions require explicit parameters.");s||i.pop(),n[t]=i.concat(a)}}),A(n,t)}function w(e,t){e.length=1,e.head=e.tail=t}function B(e,t,n){function a(e,t){f[e].push(t)}function i(e,t){const n=(...a)=>{r(e,n),t(...a)};f[e].push(n)}function r(e,t){return e?t?void(f[e]=f[e].filter(e=>e!==t)):f[e]=[]:Object.keys(f).forEach(e=>f[e]=[])}function s(e,...t){f[e].forEach(e=>e(...t))}function l(e,t,n,a){function i(e,...t){return e?n?s(e):r():1>=t.length?r(t[0]):void r(t)}if(null!=a&&"function"!=typeof a)throw new Error("task callback must be a function");k.started=!0;var r,s,l=k._createTaskItem(e,n?i:a||i);if(t?k._tasks.unshift(l):k._tasks.push(l),y||(y=!0,_e(()=>{y=!1,k.process()})),n||!a)return new Promise((e,t)=>{r=e,s=t})}function d(e){return function(t,...n){o-=1;for(var a=0,r=e.length;a<r;a++){var l=e[a],d=h.indexOf(l);0===d?h.shift():0<d&&h.splice(d,1),l.callback(t,...n),null!=t&&s("error",t,l.data)}o<=k.concurrency-k.buffer&&s("unsaturated"),k.idle()&&s("drain"),k.process()}}function u(e){return!!(0===e.length&&k.idle())&&(_e(()=>s("drain")),!0)}if(null==t)t=1;else if(0===t)throw new RangeError("Concurrency must not be zero");var p=c(e),o=0,h=[];const f={error:[],drain:[],saturated:[],unsaturated:[],empty:[]};var y=!1;const m=e=>t=>t?void(r(e),a(e,t)):new Promise((t,n)=>{i(e,(e,a)=>e?n(e):void t(a))});var g=!1,k={_tasks:new Ve,_createTaskItem(e,t){return{data:e,callback:t}},*[Symbol.iterator](){yield*k._tasks[Symbol.iterator]()},concurrency:t,payload:n,buffer:t/4,started:!1,paused:!1,push(e,t){return Array.isArray(e)?u(e)?void 0:e.map(e=>l(e,!1,!1,t)):l(e,!1,!1,t)},pushAsync(e,t){return Array.isArray(e)?u(e)?void 0:e.map(e=>l(e,!1,!0,t)):l(e,!1,!0,t)},kill(){r(),k._tasks.empty()},unshift(e,t){return Array.isArray(e)?u(e)?void 0:e.map(e=>l(e,!0,!1,t)):l(e,!0,!1,t)},unshiftAsync(e,t){return Array.isArray(e)?u(e)?void 0:e.map(e=>l(e,!0,!0,t)):l(e,!0,!0,t)},remove(e){k._tasks.remove(e)},process(){var e=Math.min;if(!g){for(g=!0;!k.paused&&o<k.concurrency&&k._tasks.length;){var t=[],n=[],a=k._tasks.length;k.payload&&(a=e(a,k.payload));for(var r,u=0;u<a;u++)r=k._tasks.shift(),t.push(r),h.push(r),n.push(r.data);o+=1,0===k._tasks.length&&s("empty"),o===k.concurrency&&s("saturated");var c=L(d(t));p(n,c)}g=!1}},length(){return k._tasks.length},running(){return o},workersList(){return h},idle(){return 0===k._tasks.length+o},pause(){k.paused=!0},resume(){!1===k.paused||(k.paused=!1,_e(k.process))}};return Object.defineProperties(k,{saturated:{writable:!1,value:m("saturated")},unsaturated:{writable:!1,value:m("unsaturated")},empty:{writable:!1,value:m("empty")},drain:{writable:!1,value:m("drain")},error:{writable:!1,value:m("error")}}),k}function T(e,t){return B(e,1,t)}function F(e,t,n){return B(e,t,n)}function C(...e){var t=e.map(c);return function(...e){var n=this,a=e[e.length-1];return"function"==typeof a?e.pop():a=b(),qe(t,e,(e,t,a)=>{t.apply(n,e.concat((e,...t)=>{a(e,t)}))},(e,t)=>a(e,...t)),a[Ce]}}function P(...e){return C(...e.reverse())}function R(...e){return function(...t){var n=t.pop();return n(null,...e)}}function z(e,t){return(n,a,i,r)=>{var s,l=!1;const d=c(i);n(a,(n,a,i)=>{d(n,(a,r)=>a||!1===a?i(a):e(r)&&!s?(l=!0,s=t(!0,n),i(null,be)):void i())},e=>e?r(e):void r(null,l?s:t(!1)))}}function N(e){return(t,...n)=>c(t)(...n,(t,...n)=>{"object"==typeof console&&(t?console.error&&console.error(t):console[e]&&n.forEach(t=>console[e](t)))})}function V(e,t,n){const a=c(t);return Xe(e,(...e)=>{const t=e.pop();a(...e,(e,n)=>t(e,!n))},n)}function Y(e){return(t,n,a)=>e(t,a)}function q(e){return d(e)?e:function(...t){var n=t.pop(),a=!0;t.push((...e)=>{a?_e(()=>n(...e)):n(...e)}),e.apply(this,t),a=!1}}function D(e,t,n,a){var r=Array(t.length);e(t,(e,t,a)=>{n(e,(e,n)=>{r[t]=!!n,a(e)})},e=>{if(e)return a(e);for(var n=[],s=0;s<t.length;s++)r[s]&&n.push(t[s]);a(null,n)})}function Q(e,t,n,a){var i=[];e(t,(e,t,a)=>{n(e,(n,r)=>n?a(n):void(r&&i.push({index:t,value:e}),a(n)))},e=>e?a(e):void a(null,i.sort((e,t)=>e.index-t.index).map(e=>e.value)))}function U(e,t,n,a){var i=y(t)?D:Q;return i(e,t,c(n),a)}function G(e,t,n){return dt(e,1/0,t,n)}function W(e,t,n){return dt(e,1,t,n)}function H(e,t,n){return pt(e,1/0,t,n)}function J(e,t,n){return pt(e,1,t,n)}function K(e,t=e=>e){var a=Object.create(null),r=Object.create(null),s=c(e),l=n((e,n)=>{var d=t(...e);d in a?_e(()=>n(null,...a[d])):d in r?r[d].push(n):(r[d]=[n],s(...e,(e,...t)=>{e||(a[d]=t);var n=r[d];delete r[d];for(var s=0,u=n.length;s<u;s++)n[s](e,...t)}))});return l.memo=a,l.unmemoized=e,l}function X(e,t){return ot(Me,e,t)}function Z(e,t,n){return ot(Ae(t),e,n)}function $(e,t){var n=c(e);return B((e,t)=>{n(e[0],t)},t,1)}function ee(e){return(e<<1)+1}function te(e){return(e+1>>1)-1}function ne(e,t){return e.priority===t.priority?e.pushCount<t.pushCount:e.priority<t.priority}function ae(e,t){function n(e,t){return Array.isArray(e)?e.map(e=>({data:e,priority:t})):{data:e,priority:t}}var a=$(e,t),{push:i,pushAsync:r}=a;return a._tasks=new ht,a._createTaskItem=({data:e,priority:t},n)=>({data:e,priority:t,callback:n}),a.push=function(e,t=0,a){return i(n(e,t),a)},a.pushAsync=function(e,t=0,a){return r(n(e,t),a)},delete a.unshift,delete a.unshiftAsync,a}function ie(e,t,n,a){var i=[...e].reverse();return qe(i,t,n,a)}function re(e){var t=c(e);return n(function a(e,n){return e.push((e,...t)=>{let a={};if(e&&(a.error=e),0<t.length){var i=t;1>=t.length&&([i]=t),a.value=i}n(null,a)}),t.apply(this,e)})}function se(e){var t;return Array.isArray(e)?t=e.map(re):(t={},Object.keys(e).forEach(n=>{t[n]=re.call(this,e[n])})),t}function le(e,t,n,a){const i=c(n);return U(e,t,(e,t)=>{i(e,(e,n)=>{t(e,!n)})},a)}function de(e){return function(){return e}}function ue(e,t,n){function a(){r((e,...t)=>{!1===e||(e&&s++<i.times&&("function"!=typeof i.errorFilter||i.errorFilter(e))?setTimeout(a,i.intervalFunc(s-1)):n(e,...t))})}var i={times:kt,intervalFunc:de(vt)};if(3>arguments.length&&"function"==typeof e?(n=t||b(),t=e):(pe(i,e),n=n||b()),"function"!=typeof t)throw new Error("Invalid arguments for async.retry");var r=c(t),s=1;return a(),n[Ce]}function pe(e,n){if("object"==typeof n)e.times=+n.times||kt,e.intervalFunc="function"==typeof n.interval?n.interval:de(+n.interval||vt),e.errorFilter=n.errorFilter;else if("number"==typeof n||"string"==typeof n)e.times=+n||kt;else throw new Error("Invalid arguments for async.retry")}function ce(e,t){t||(t=e,e=null);let a=e&&e.arity||t.length;d(t)&&(a+=1);var i=c(t);return n((t,n)=>{function r(e){i(...t,e)}return(t.length<a-1||null==n)&&(t.push(n),n=b()),e?ue(e,r,n):ue(r,n),n[Ce]})}function oe(e,t){return ot(Be,e,t)}function he(e,t,a){var i=c(e);return n((n,r)=>{function s(){var t=e.name||"anonymous",n=new Error("Callback function \""+t+"\" timed out.");n.code="ETIMEDOUT",a&&(n.info=a),d=!0,r(n)}var l,d=!1;n.push((...e)=>{d||(r(...e),clearTimeout(l))}),l=setTimeout(s,t),i(...n)})}function fe(e){for(var t=Array(e);e--;)t[e]=e;return t}function ye(e,t,n,a){var i=c(n);return De(fe(e),t,i,a)}function me(e,t,n){return ye(e,1/0,t,n)}function ge(e,t,n){return ye(e,1,t,n)}function ke(e,t,n,a){3>=arguments.length&&"function"==typeof t&&(a=n,n=t,t=Array.isArray(e)?[]:{}),a=m(a||b());var i=c(n);return Me(e,(e,n,a)=>{i(t,e,n,a)},e=>a(e,t)),a[Ce]}function ve(e){return(...t)=>(e.unmemoized||e)(...t)}function Se(e,t,n){const a=c(e);return _t(e=>a((t,n)=>e(t,!n)),t,n)}var xe,Le="function"==typeof queueMicrotask&&queueMicrotask,Ee="function"==typeof setImmediate&&setImmediate,Oe="object"==typeof process&&"function"==typeof process.nextTick;xe=Le?queueMicrotask:Ee?setImmediate:Oe?process.nextTick:a;var _e=i(xe);const be={};var Ae=e=>(t,n,a)=>{function i(e,t){if(!d)if(c-=1,e)l=!0,a(e);else if(!1===e)l=!0,d=!0;else{if(t===be||l&&0>=c)return l=!0,a(null);o||r()}}function r(){for(o=!0;c<e&&!l;){var t=s();if(null===t)return l=!0,void(0>=c&&a(null));c+=1,n(t.value,t.key,L(i))}o=!1}if(a=m(a),0>=e)throw new RangeError("concurrency limit cannot be less than 1");if(!t)return a(null);if(u(t))return E(t,e,n,a);if(p(t))return E(t[Symbol.asyncIterator](),e,n,a);var s=x(t),l=!1,d=!1,c=0,o=!1;r()},Ie=o(function i(e,t,n,a){return Ae(t)(e,c(n),a)},4),Me=o(function a(e,t,n){var i=y(e)?O:_;return i(e,c(t),n)},3),je=o(function a(e,t,n){return f(Me,e,t,n)},3),we=h(je),Be=o(function a(e,t,n){return Ie(e,1,t,n)},3),Te=o(function a(e,t,n){return f(Be,e,t,n)},3),Fe=h(Te);const Ce=Symbol("promiseCallback");var Pe=/^(?:async\s)?(?:function)?\s*(?:\w+\s*)?\(([^)]+)\)(?:\s*{)/,Re=/^(?:async\s)?\s*(?:\(\s*)?((?:[^)=\s]\s*)*)(?:\)\s*)?=>/,ze=/,/,Ne=/(=.+)?(\s*)$/;class Ve{constructor(){this.head=this.tail=null,this.length=0}removeLink(e){return e.prev?e.prev.next=e.next:this.head=e.next,e.next?e.next.prev=e.prev:this.tail=e.prev,e.prev=e.next=null,this.length-=1,e}empty(){for(;this.head;)this.shift();return this}insertAfter(e,t){t.prev=e,t.next=e.next,e.next?e.next.prev=t:this.tail=t,e.next=t,this.length+=1}insertBefore(e,t){t.prev=e.prev,t.next=e,e.prev?e.prev.next=t:this.head=t,e.prev=t,this.length+=1}unshift(e){this.head?this.insertBefore(this.head,e):w(this,e)}push(e){this.tail?this.insertAfter(this.tail,e):w(this,e)}shift(){return this.head&&this.removeLink(this.head)}pop(){return this.tail&&this.removeLink(this.tail)}toArray(){return[...this]}*[Symbol.iterator](){for(var e=this.head;e;)yield e.data,e=e.next}remove(e){for(var t=this.head;t;){var{next:n}=t;e(t)&&this.removeLink(t),t=n}return this}}var Ye,qe=o(function i(e,t,n,a){a=m(a);var r=c(n);return Be(e,(e,n,a)=>{r(t,e,(e,n)=>{t=n,a(e)})},e=>a(e,t))},4),De=o(function i(e,t,n,a){return f(Ae(t),e,n,a)},4),Qe=o(function i(e,t,n,a){var r=c(n);return De(e,t,(e,t)=>{r(e,(e,...n)=>e?t(e):t(e,n))},(e,t)=>{for(var n=[],r=0;r<t.length;r++)t[r]&&(n=n.concat(...t[r]));return a(e,n)})},4),Ue=o(function a(e,t,n){return Qe(e,1/0,t,n)},3),Ge=o(function a(e,t,n){return Qe(e,1,t,n)},3),We=o(function a(e,t,n){return z(e=>e,(e,t)=>t)(Me,e,t,n)},3),He=o(function i(e,t,n,a){return z(e=>e,(e,t)=>t)(Ae(t),e,n,a)},4),Je=o(function a(e,t,n){return z(e=>e,(e,t)=>t)(Ae(1),e,t,n)},3),Ke=N("dir"),Xe=o(function a(e,t,n){function i(e,...t){return e?n(e):void(!1===e||(s=t,d(...t,r)))}function r(e,t){return e?n(e):!1===e?void 0:t?void l(i):n(null,...s)}n=L(n);var s,l=c(e),d=c(t);return r(null,!0)},3),Ze=o(function a(e,t,n){return Me(e,Y(c(t)),n)},3),$e=o(function i(e,t,n,a){return Ae(t)(e,Y(c(n)),a)},4),et=o(function a(e,t,n){return $e(e,1,t,n)},3),tt=o(function a(e,t,n){return z(e=>!e,e=>!e)(Me,e,t,n)},3),nt=o(function i(e,t,n,a){return z(e=>!e,e=>!e)(Ae(t),e,n,a)},4),at=o(function a(e,t,n){return z(e=>!e,e=>!e)(Be,e,t,n)},3),it=o(function a(e,t,n){return U(Me,e,t,n)},3),rt=o(function i(e,t,n,a){return U(Ae(t),e,n,a)},4),st=o(function a(e,t,n){return U(Be,e,t,n)},3),lt=o(function n(e,t){function a(e){return e?i(e):void(!1===e||r(a))}var i=L(t),r=c(q(e));return a()},2),dt=o(function i(e,t,n,a){var r=c(n);return De(e,t,(e,t)=>{r(e,(n,a)=>n?t(n):t(n,{key:a,val:e}))},(e,t)=>{for(var n={},{hasOwnProperty:r}=Object.prototype,s=0;s<t.length;s++)if(t[s]){var{key:l}=t[s],{val:d}=t[s];r.call(n,l)?n[l].push(d):n[l]=[d]}return a(e,n)})},4),ut=N("log"),pt=o(function i(e,t,n,a){a=m(a);var r={},s=c(n);return Ae(t)(e,(e,t,n)=>{s(e,t,(e,a)=>e?n(e):void(r[t]=a,n(e)))},e=>a(e,r))},4);Ye=Oe?process.nextTick:Ee?setImmediate:a;var ct=i(Ye),ot=o((e,t,n)=>{var a=y(t)?[]:{};e(t,(e,t,n)=>{c(e)((e,...i)=>{2>i.length&&([i]=i),a[t]=i,n(e)})},e=>n(e,a))},3);class ht{constructor(){this.heap=[],this.pushCount=Number.MIN_SAFE_INTEGER}get length(){return this.heap.length}empty(){return this.heap=[],this}percUp(e){for(let n;0<e&&ne(this.heap[e],this.heap[n=te(e)]);){let a=this.heap[e];this.heap[e]=this.heap[n],this.heap[n]=a,e=n}}percDown(e){for(let n,a;(n=ee(e))<this.heap.length&&(n+1<this.heap.length&&ne(this.heap[n+1],this.heap[n])&&++n,!ne(this.heap[e],this.heap[n]));)a=this.heap[e],this.heap[e]=this.heap[n],this.heap[n]=a,e=n}push(e){e.pushCount=++this.pushCount,this.heap.push(e),this.percUp(this.heap.length-1)}unshift(e){return this.heap.push(e)}shift(){let[e]=this.heap;return this.heap[0]=this.heap[this.heap.length-1],this.heap.pop(),this.percDown(0),e}toArray(){return[...this]}*[Symbol.iterator](){for(let e=0;e<this.heap.length;e++)yield this.heap[e].data}remove(e){let t=0;for(let n=0;n<this.heap.length;n++)e(this.heap[n])||(this.heap[t]=this.heap[n],t++);this.heap.splice(t);for(let t=te(this.heap.length-1);0<=t;t--)this.percDown(t);return this}}var ft=o(function n(e,t){if(t=m(t),!Array.isArray(e))return t(new TypeError("First argument to race must be an array of functions"));if(!e.length)return t();for(var a=0,r=e.length;a<r;a++)c(e[a])(t)},2),yt=o(function a(e,t,n){return le(Me,e,t,n)},3),mt=o(function i(e,t,n,a){return le(Ae(t),e,n,a)},4),gt=o(function a(e,t,n){return le(Be,e,t,n)},3);const kt=5,vt=0;var St=o(function a(e,t,n){return z(Boolean,e=>e)(Me,e,t,n)},3),xt=o(function i(e,t,n,a){return z(Boolean,e=>e)(Ae(t),e,n,a)},4),Lt=o(function a(e,t,n){return z(Boolean,e=>e)(Be,e,t,n)},3),Et=o(function a(e,t,n){function i(e,t){var n=e.criteria,a=t.criteria;return n<a?-1:n>a?1:0}var r=c(t);return je(e,(e,t)=>{r(e,(n,a)=>n?t(n):void t(n,{value:e,criteria:a}))},(e,t)=>e?n(e):void n(null,t.sort(i).map(e=>e.value)))},3),Ot=o(function n(e,t){var a,i=null;return et(e,(e,t)=>{c(e)((e,...n)=>!1===e?t(e):void(2>n.length?[a]=n:a=n,i=e,t(e?null:{})))},()=>t(i,a))}),_t=o(function a(e,t,n){function i(e,...t){if(e)return n(e);d=t;!1===e||l(r)}function r(e,t){return e?n(e):!1===e?void 0:t?void s(i):n(null,...d)}n=L(n);var s=c(t),l=c(e),d=[];return l(r)},3),bt=o(function n(e,t){function a(t){var n=c(e[r++]);n(...t,L(i))}function i(n,...i){return!1===n?void 0:n||r===e.length?t(n,...i):void a(i)}if(t=m(t),!Array.isArray(e))return t(new Error("First argument to waterfall must be an array of functions"));if(!e.length)return t();var r=0;a([])});e.all=tt,e.allLimit=nt,e.allSeries=at,e.any=St,e.anyLimit=xt,e.anySeries=Lt,e.apply=t,e.applyEach=we,e.applyEachSeries=Fe,e.asyncify=r,e.auto=A,e.autoInject=j,e.cargo=T,e.cargoQueue=F,e.compose=P,e.concat=Ue,e.concatLimit=Qe,e.concatSeries=Ge,e.constant=R,e.default={apply:t,applyEach:we,applyEachSeries:Fe,asyncify:r,auto:A,autoInject:j,cargo:T,cargoQueue:F,compose:P,concat:Ue,concatLimit:Qe,concatSeries:Ge,constant:R,detect:We,detectLimit:He,detectSeries:Je,dir:Ke,doUntil:V,doWhilst:Xe,each:Ze,eachLimit:$e,eachOf:Me,eachOfLimit:Ie,eachOfSeries:Be,eachSeries:et,ensureAsync:q,every:tt,everyLimit:nt,everySeries:at,filter:it,filterLimit:rt,filterSeries:st,forever:lt,groupBy:G,groupByLimit:dt,groupBySeries:W,log:ut,map:je,mapLimit:De,mapSeries:Te,mapValues:H,mapValuesLimit:pt,mapValuesSeries:J,memoize:K,nextTick:ct,parallel:X,parallelLimit:Z,priorityQueue:ae,queue:$,race:ft,reduce:qe,reduceRight:ie,reflect:re,reflectAll:se,reject:yt,rejectLimit:mt,rejectSeries:gt,retry:ue,retryable:ce,seq:C,series:oe,setImmediate:_e,some:St,someLimit:xt,someSeries:Lt,sortBy:Et,timeout:he,times:me,timesLimit:ye,timesSeries:ge,transform:ke,tryEach:Ot,unmemoize:ve,until:Se,waterfall:bt,whilst:_t,all:tt,allLimit:nt,allSeries:at,any:St,anyLimit:xt,anySeries:Lt,find:We,findLimit:He,findSeries:Je,flatMap:Ue,flatMapLimit:Qe,flatMapSeries:Ge,forEach:Ze,forEachSeries:et,forEachLimit:$e,forEachOf:Me,forEachOfSeries:Be,forEachOfLimit:Ie,inject:qe,foldl:qe,foldr:ie,select:it,selectLimit:rt,selectSeries:st,wrapSync:r,during:_t,doDuring:Xe},e.detect=We,e.detectLimit=He,e.detectSeries=Je,e.dir=Ke,e.doDuring=Xe,e.doUntil=V,e.doWhilst=Xe,e.during=_t,e.each=Ze,e.eachLimit=$e,e.eachOf=Me,e.eachOfLimit=Ie,e.eachOfSeries=Be,e.eachSeries=et,e.ensureAsync=q,e.every=tt,e.everyLimit=nt,e.everySeries=at,e.filter=it,e.filterLimit=rt,e.filterSeries=st,e.find=We,e.findLimit=He,e.findSeries=Je,e.flatMap=Ue,e.flatMapLimit=Qe,e.flatMapSeries=Ge,e.foldl=qe,e.foldr=ie,e.forEach=Ze,e.forEachLimit=$e,e.forEachOf=Me,e.forEachOfLimit=Ie,e.forEachOfSeries=Be,e.forEachSeries=et,e.forever=lt,e.groupBy=G,e.groupByLimit=dt,e.groupBySeries=W,e.inject=qe,e.log=ut,e.map=je,e.mapLimit=De,e.mapSeries=Te,e.mapValues=H,e.mapValuesLimit=pt,e.mapValuesSeries=J,e.memoize=K,e.nextTick=ct,e.parallel=X,e.parallelLimit=Z,e.priorityQueue=ae,e.queue=$,e.race=ft,e.reduce=qe,e.reduceRight=ie,e.reflect=re,e.reflectAll=se,e.reject=yt,e.rejectLimit=mt,e.rejectSeries=gt,e.retry=ue,e.retryable=ce,e.select=it,e.selectLimit=rt,e.selectSeries=st,e.seq=C,e.series=oe,e.setImmediate=_e,e.some=St,e.someLimit=xt,e.someSeries=Lt,e.sortBy=Et,e.timeout=he,e.times=me,e.timesLimit=ye,e.timesSeries=ge,e.transform=ke,e.tryEach=Ot,e.unmemoize=ve,e.until=Se,e.waterfall=bt,e.whilst=_t,e.wrapSync=r,Object.defineProperty(e,"__esModule",{value:!0})}); })();

// ===== constants.js =====
var GameMode = { FIGHT: "fight", COOP: "coop" };
var DisplayResolution = {
    BLUESTACKS: "540x960", PIXEL_6A: "1080x2400", PIXEL_2XL: "1440x2880",
    SD: "480x720", QUARTER_HD: "540x960", HD: "720x1280",
    FULL_HD: "1080x1920", QUAD_HD: "1440x2560"
};

// ===== PixelProfile.js =====
function PixelProfile(resolution, mode) {
    switch(resolution) {
        case DisplayResolution.BLUESTACKS:
        case DisplayResolution.QUARTER_HD:
            this.SLOT_OFFSET_H = 62.5; this.SLOT_OFFSET_V = 60;
            this.BOARD_CENTER_REFERENCE_POINT = mode === GameMode.FIGHT ? [145, 562.5] : [145, 512.5];
            break;
        case DisplayResolution.FULL_HD:
            this.SLOT_OFFSET_H = 125; this.SLOT_OFFSET_V = 120;
            this.BOARD_CENTER_REFERENCE_POINT = mode === GameMode.FIGHT ? [290, 1125] : [290, 1025];
            break;
        case DisplayResolution.PIXEL_6A:
            this.SCREEN_MARGIN_V = 240;
            this.BOARD_OFFSET_BETWEEN_MODES = [0, 96];
            this.SLOT_SIZE = 109; this.SLOT_SPACING_H = 16; this.SLOT_SPACING_V = 11;
            this.SLOT_OFFSET_H = this.SLOT_SIZE + this.SLOT_SPACING_H;
            this.SLOT_OFFSET_V = this.SLOT_SIZE + this.SLOT_SPACING_V;
            this.REDUCED_SLOT_SIZE = 27; this.REDUCED_SLOT_SPACING_H = 4; this.REDUCED_SLOT_SPACING_V = 3;
            this.REDUCED_SLOT_OFFSET_H = this.REDUCED_SLOT_SIZE + this.REDUCED_SLOT_SPACING_H;
            this.REDUCED_SLOT_OFFSET_V = this.REDUCED_SLOT_SIZE + this.REDUCED_SLOT_SPACING_V;
            this.WAVE_CIRCLE_ROI = [559, 300, 1, 1];
            this.WAVE_PLUS_ROI = [697, 302, 1, 1];
            if(mode === GameMode.FIGHT){
                this.BOARD_CORNER_REFERENCE_POINT = [236, 1309];
                this.BOARD_CENTER_REFERENCE_POINT = [290, 1363];
                this.BOARD_BOUNDARY_RECT = [236, 1309, 611, 349];
            } else {
                this.BOARD_CORNER_REFERENCE_POINT = [236, 1213];
                this.BOARD_CENTER_REFERENCE_POINT = [290, 1267];
                this.BOARD_BOUNDARY_RECT = [236, 1213, 611, 349];
            }
            break;
        case DisplayResolution.PIXEL_2XL:
            this.SCREEN_MARGIN_V = 160;
            this.BOARD_OFFSET_BETWEEN_MODES = [0, 128];
            this.SLOT_SIZE = 145; this.SLOT_SPACING_H = 21; this.SLOT_SPACING_V = 15;
            this.SLOT_OFFSET_H = this.SLOT_SIZE + this.SLOT_SPACING_H;
            this.SLOT_OFFSET_V = this.SLOT_SIZE + this.SLOT_SPACING_V;
            this.WAVE_CIRCLE_ROI = [745, 242, 1, 1];
            this.WAVE_PLUS_ROI = [928, 243, 1, 1];
            if(mode === GameMode.FIGHT){
                this.BOARD_CORNER_REFERENCE_POINT = [315, 1585];
                this.BOARD_CENTER_REFERENCE_POINT = [387, 1657];
                this.BOARD_BOUNDARY_RECT = [314, 1585, 812, 465];
            } else {
                this.BOARD_CORNER_REFERENCE_POINT = [315, 1457];
                this.BOARD_CENTER_REFERENCE_POINT = [387, 1529];
                this.BOARD_BOUNDARY_RECT = [314, 1457, 812, 465];
            }
            break;
        default:
            throw new Error("Unsupported resolution: " + resolution);
    }
}

// ===== Dice.js =====
function Dice(type){ this.type = type; }
function MonolithDice(){ Dice.call(this, "monolith"); }
MonolithDice.prototype = Object.create(Dice.prototype);
MonolithDice.prototype.constructor = MonolithDice;

// ===== DiceSlot.js =====
function DiceSlot(slot){
    if(typeof slot === "string") this.coords = DiceSlot._parseSlotString(slot);
    else if(Array.isArray(slot)) this.coords = slot;
    else throw new TypeError("DiceSlot must be string or array");
    Object.freeze(this.coords);
}
DiceSlot._yMap = { a:0, b:1, c:2 };
DiceSlot._parseSlotString = function(slotStr){
    if(slotStr.length !== 2) throw new Error();
    var yChar = slotStr[0].toLowerCase(), xChar = slotStr[1];
    var x = parseInt(xChar)-1;
    if(isNaN(x)||x<0||x>4||!(yChar in this._yMap)) throw new Error();
    var y = this._yMap[yChar]; return [x, y];
};
DiceSlot.prototype.repr = function(){ return "DiceSlot(" + this.coords + ")"; };

// ===== Board.js =====
function Board(uic, pxProfile){
    this.uic = uic;
    this.pxProfile = pxProfile;
    this.rect = pxProfile.BOARD_BOUNDARY_RECT;
    this.swipeSlotDuration = 0.005;
    this.swipePointOffset = 50;
}
Board.prototype.convertToImageCoords = function(slot){
    var x = slot[0], y = slot[1];
    var refX = this.pxProfile.BOARD_CENTER_REFERENCE_POINT[0];
    var refY = this.pxProfile.BOARD_CENTER_REFERENCE_POINT[1];
    return [refX + this.pxProfile.SLOT_OFFSET_H*x, refY + this.pxProfile.SLOT_OFFSET_V*y];
};
Board.prototype.convertToReducedImageCoords = function(slot){
    return [this.pxProfile.REDUCED_SLOT_OFFSET_H*slot[0], this.pxProfile.REDUCED_SLOT_OFFSET_V*slot[1]];
};
Board.prototype.swipeSlot = function(slot1, slot2){
    var coords1 = this.convertToImageCoords(slot1);
    var coords2 = this.convertToImageCoords(slot2);
    var x1 = slot1[0], y1 = slot1[1], x2 = slot2[0], y2 = slot2[1];
    var offsetX = x1===x2?0:this.swipePointOffset;
    var offsetY = y1===y2?0:this.swipePointOffset;
    var signX = x1<x2?1:-1, signY=y1<y2?1:-1;
    this.uic.swipe(coords1[0]+offsetX*signX, coords1[1]+offsetY*signY,
                   coords2[0]-offsetX*signX, coords2[1]-offsetY*signY, this.swipeSlotDuration);
};

// ===== Field.js =====
function Field(pxProfile){
    this.pxProfile = pxProfile;
    this.imgs = {};
    this.isBossWave = false;
}
Field.prototype.updateScreencaps = function(roiList, imgs){
    for(var i=0;i<roiList.length;i++) this.imgs[JSON.stringify(roiList[i])] = imgs[i];
};
Field.prototype.waveProgressionDetected = function(){
    var roiKey = JSON.stringify(this.pxProfile.WAVE_CIRCLE_ROI);
    var img = this.imgs[roiKey];
    if(!img){ console.warn("ROI not found:", roiKey); return false; }
    var value = img[0][0][0];
    var waveCircleIsLight = value>=255;
    var detected = false;
    if(waveCircleIsLight && !this.isBossWave){ this.isBossWave=true; detected=true; }
    else if(!waveCircleIsLight) this.isBossWave=false;
    return detected;
};

// ===== UiController.js =====
function UiController(){
    if(!device.isScreenOn()) device.wakeUp();
    if(!requestScreenCapture()) throw new Error("Screen capture permission required");
}
UiController.prototype.swipe = function(x1,y1,x2,y2,duration){
    swipe(x1,y1,x2,y2,duration*1000);
};
UiController.prototype.screencap = function(){
    var img = captureScreen();
    if(!img) throw new Error("Screenshot failed");
    return img;
};
UiController.prototype.roiScreencap = function(roiList, extractChannel){
    extractChannel = extractChannel || "rgb";
    var img = this.screencap();
    if(!img) return null;
    var imgWidth = img.getWidth(), imgHeight = img.getHeight();
    var roiDataList = [];
    for(var r=0;r<roiList.length;r++){
        var roi = roiList[r];
        var x = roi[0], y = roi[1], w = roi[2], h = roi[3];
        if(x<0) x=0;
        if(y<0) y=0;
        if(x+w>imgWidth) w=imgWidth-x;
        if(y+h>imgHeight) h=imgHeight-y;
        if(w<=0||h<=0) continue;
        var clip = images.clip(img,x,y,w,h);
        var roiPixels = [];
        for(var j=0;j<h;j++){
            var row=[];
            for(var i=0;i<w;i++){
                var colorVal = clip.pixel(i,j);
                var pixel=[];
                if(extractChannel.includes("r")) pixel.push(colors.red(colorVal));
                if(extractChannel.includes("g")) pixel.push(colors.green(colorVal));
                if(extractChannel.includes("b")) pixel.push(colors.blue(colorVal));
                row.push(pixel);
            }
            roiPixels.push(row);
        }
        roiDataList.push(roiPixels);
        clip.recycle();
    }
    img.recycle();
    return roiDataList;
};

// ===== Task.js =====
function Task(uic){ this.uic = uic; }
Task.prototype.run = function(args){};

// ===== CoopDistortionMonolith.js =====
function CoopDistortionMonolith(uic){
    Task.call(this,uic);
    this.pxProfile = new PixelProfile(DisplayResolution.PIXEL_2XL, GameMode.COOP);
    this.field = new Field(this.pxProfile);
    this.board = new Board(this.uic, this.pxProfile);
    this.boardState = [
        [new DiceSlot("a5"), new DiceSlot("b5")],
        [new DiceSlot("b4"), new DiceSlot("c5")],
        [new DiceSlot("c3"), new DiceSlot("c4")]
    ];
    this.numMonolithGroup = this.boardState.length;
    this.numMonolithsInGroup = this.boardState[0].length;
    this.numBlueMonolithsInGroup = this.numMonolithsInGroup-1;
    this.numBlueMonoliths = this.numMonolithGroup * this.numBlueMonolithsInGroup;
    this.groupIdxs = cycle(Array.from({length:this.numMonolithGroup},(_,i)=>i));
    this.swipeSlotIdcsOnFire = [[0,1],[1,0]];
    this.monolithCooldown = 3.0;
    this.monolithFireInterval = this.monolithCooldown / this.numBlueMonoliths;
    this.monolithFireCount = 0;
    this.monolithLock = {value:false};
    this.barrierSlot = new DiceSlot("b2");
    this.jokerSlots = [new DiceSlot("a2"), new DiceSlot("b1"), new DiceSlot("b3"), new DiceSlot("c2")];
    this.shortBreakTimeAfterBarrierCopy = 1.8;
    this.maxWaveCount = null;
}
CoopDistortionMonolith.prototype = Object.create(Task.prototype);
CoopDistortionMonolith.prototype.constructor = CoopDistortionMonolith;

CoopDistortionMonolith.prototype.run = function(args){
    var self = this;
    this.maxWaveCount = args.max_wave_count;

    async.forever(
        function(next){
            var groupIdx = self.groupIdxs.next().value;
            async.eachSeries(self.swipeSlotIdcsOnFire, function(pair, cb){
                self.acquireLock(self.monolithLock, function(){
                    var slot1 = self.boardState[groupIdx][pair[0]];
                    var slot2 = self.boardState[groupIdx][pair[1]];
                    self.board.swipeSlot(slot1, slot2);
                    self.releaseLock(self.monolithLock);
                    cb();
                });
            }, function(err){
                self.monolithFireCount += 1;
                if(self.monolithFireCount % self.numMonolithGroup === 0){
                    self.monitorWaveProgression(function(){ next(); });
                } else {
                    setTimeout(next, self.monolithFireInterval*1000);
                }
            });
        },
        function(err){
            console.log("All tasks stopped gracefully.");
        }
    );
};

CoopDistortionMonolith.prototype.acquireLock = function(lock, cb){
    async.whilst(
        function(){ return lock.value; },
        function(next){ setTimeout(next, 10); },
        function(){ lock.value = true; cb(); }
    );
};

CoopDistortionMonolith.prototype.releaseLock = function(lock){ lock.value=false; };

CoopDistortionMonolith.prototype.updateScreencap = function(cb){
    var imgs = this.uic.roiScreencap([this.pxProfile.WAVE_CIRCLE_ROI],"r");
    this.field.updateScreencaps([this.pxProfile.WAVE_CIRCLE_ROI], imgs);
    cb();
};

CoopDistortionMonolith.prototype.monitorWaveProgression = function(cb){
    var self = this;
    setTimeout(function(){
        self.updateScreencap(function(){
            if(self.field.waveProgressionDetected()){
                self.acquireLock(self.monolithLock, function(){
                    self.copyBarrier();
                    setTimeout(function(){
                        self.releaseLock(self.monolithLock);
                        cb();
                    }, self.shortBreakTimeAfterBarrierCopy*1000);
                });
            } else cb();
        });
    }, 500);
};

CoopDistortionMonolith.prototype.copyBarrier = function(){
    for(var i=0;i<this.jokerSlots.length;i++){
        this.board.swipeSlot(this.jokerSlots[i], this.barrierSlot);
    }
};

// ===== utils.js =====
function* cycle(arr){ var i=0; while(true) yield arr[i++%arr.length]; }

// ===== Tasks index =====
var Tasks = { CoopDistortionMonolith };

// ===== main.js =====
function parseArgs(){
    var args={task:null,current_wave_count:100,max_wave_count:10000};
    var argv=engines.myEngine().execArgv||[];
    for(var i=0;i<argv.length;i++){
        var arg = argv[i];
        switch(arg){
            case "--task": case "-t": i++; args.task=argv[i]; break;
            case "--current_wave_count": case "-c": i++; args.current_wave_count=parseInt(argv[i]); break;
            case "--max_wave_count": case "-m": i++; args.max_wave_count=parseInt(argv[i]); break;
        }
    }
    return args;
}
function mapToTask(abbr){ var mapping={dm:"CoopDistortionMonolith"}; return mapping[abbr]; }

function main(){
    var args=parseArgs();
    var uic=new UiController();
    var taskName=mapToTask(args.task);
    var TaskClass=Tasks[taskName];
    var taskInstance=new TaskClass(uic);
    taskInstance.run(args);
}

main();
