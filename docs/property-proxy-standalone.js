!function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return t[n].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var r={};return e.m=t,e.c=r,e.p="",e(0)}([function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}var o=r(1),i=n(o);window.propertyProxy=i.default},function(t,e){"use strict";function r(t,e,r){i(t,e,{set:function(t,e){r.call(this,t,e)}})}function n(t,e,r){i(t,e,{invoke:function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];r.call.apply(r,[this].concat(e))}})}function o(t,e,r){return"object"!==("undefined"==typeof e?"undefined":c(e))||Array.isArray(e)?i(t,e,r):l(t,e)}function i(t,e,r){if("number"==typeof e&&(e=[e]),null!=t&&e&&0!==e.length&&r){"string"==typeof e&&(e=e.split(".")),f(t,e,null,!0);var n=u(t,e.slice(0,-1)),o=e[e.length-1],i="__property-proxy-map__";!n.hasOwnProperty(i)&&Object.defineProperty(n,i,{value:{}});var l=r.get,c=r.set,a=r.invoke,p=r.value,s=r.writable||!Object.hasOwnProperty(n,o)||Object.getOwnPropertyDescriptor(n,o).writable,y={rootObject:t,parentObject:n,propertyName:o,path:e,descriptor:r};void 0===n[i][o]?(n[i][o]=p||n[o],n[o]=null):p&&(n[i][o]=p),r.get=function(){var t=n[i][o];if(l){var e=l.call(this,t,y);void 0!==e&&(t=e)}return a&&"function"==typeof t&&!function(){var e=t;t=function(){for(var t=arguments.length,r=Array(t),n=0;n<t;n++)r[n]=arguments[n];var o=a.call.apply(a,[this].concat(r,[y]));return o===!1?null:e.apply(this,r)}}(),t},r.set=function(t){var e=n[i][o],r=t;if(c){var l=c.call(this,r,e,y);void 0!==l&&(r=l)}else if(!s)return;n[i][o]=r},delete r.value,delete r.writable,Object.defineProperty(n,o,r)}}function l(t,e){Object.keys(e).forEach(function(r){i(t,r,e[r])})}function u(t,e,r){if("number"==typeof e&&(e=[e]),!e||0===e.length)return t;if(null==t)return r;if("string"==typeof e)return u(t,e.split("."),r);var n=t[e[0]];return void 0===n?r:1===e.length?n:u(n,e.slice(1),r)}function f(t,e,r,n){if("number"==typeof e&&(e=[e]),null==t||!e||0===e.length)return t;if("string"==typeof e)return f(t,e.split("."),r,n);var o=e[0];1===e.length?o in t&&n||(t[o]=r):(o in t||(t[o]="number"==typeof e[1]?[]:{}),f(t[o],e.slice(1),r,n))}Object.defineProperty(e,"__esModule",{value:!0});var c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.watchSet=r,e.watchInvoke=n,e.d=o,e.defineProperty=i,e.defineProperties=l,e.get=u,e.set=f,e.default={watchSet:r,watchInvoke:n,d:o,defineProperty:i,defineProperties:l,get:u,set:f}}]);