/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{h:()=>W});var t=document.querySelector(".profile__edit-button"),n=document.querySelector(".profile__add-button"),r=document.querySelector(".popup_profile"),o=document.querySelector(".popup_new-place"),i=document.querySelector(".popup_big-image"),a=(document.querySelector("#card-template").content,document.querySelector(".cards-container")),c=o.querySelector(".popup__form"),u=r.querySelector(".popup__form"),s=u.querySelector('input[name="user-name"]'),l=u.querySelector('input[name="user-bio"]'),f=(c.querySelector('input[name="place-name"]'),c.querySelector('input[name="place-link"]'),document.querySelector(".popup__big-img"),document.querySelector(".popup__img-description"),document.querySelector(".profile__title")),h=document.querySelector(".profile__description"),p=(document.querySelectorAll(".popup"),document.querySelector(".profile__avatar")),d=document.querySelector(".popup_confirm"),_=(d.querySelector(".popup__submit-button"),document.querySelector(".profile__btn-edit")),y=document.querySelector(".popup_new-avatar"),v=(y.querySelector(".popup__submit-button"),y.querySelector("form")),m=(v.querySelector(".popup__input-field"),document.querySelector(".popup"),{formSelector:".popup__form",inputSelector:".popup__input-field",submitButtonSelector:".popup__submit-button",inactiveButtonClass:"popup__submit-button_inactive",inputErrorClass:"popup__input-field_type_error",errorClass:"popup__input-error_active"});function b(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранить";t.textContent=e?"Сохранение...":n}function g(e){e.classList.add("popup__submit-button_inactive"),e.setAttribute("disabled","")}function k(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var w="",S=function(){function e(t,n,r,o){var i=t.link,a=t.name,c=t._id,u=t.likes,s=t.owner;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._link=i,this._name=a,this._id=c,this._likes=u,this._owner=s,this._userInfo=n,this._templateSelector=r,this._handler=o}var t,n;return t=e,(n=[{key:"_getTemplate",value:function(){return document.querySelector(this._templateSelector).content.querySelector(".card").cloneNode(!0)}},{key:"generate",value:function(){return this._element=this._getTemplate(),this._cardImage=this._element.querySelector(".card__image"),this._cardImage.src=this._link,this._cardImage.alt=this._name,this._element.id=this._id,this._element.querySelector(".card__description").textContent=this._name,this._setEventListeners(),this._element}},{key:"_setEventListeners",value:function(){var e,t,n,r=this;this._btnLike=this._element.querySelector(".card__like-button"),this._likeCount=this._element.querySelector(".card__likes-count"),this._btnDel=this._element.querySelector(".card__remove-button"),this._owner._id===this._userInfo._id?this._btnDel.addEventListener("click",(function(e){r._handler.confirmDelCard(),w=r._element})):this._btnDel.remove(),this._likeCount.textContent=this._likes.length,e=this._likes,t=this._userInfo._id,n=this._btnLike,e.forEach((function(e){e._id!==t||n.classList.add("card__like-button_active")})),this._btnLike.addEventListener("click",(function(){r._btnLike.classList.contains("card__like-button_active")?r._handler.delLikeHandler(r._id,r._likeCount,r._btnLike):r._handler.setLikeHandler(r._id,r._likeCount,r._btnLike)})),this._cardImage.addEventListener("click",(function(){r._handler.handleCardClick()}))}}])&&k(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function E(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var L=function(){function e(t){var n=t.baseUrl,r=t.headers;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._baseUrl=n,this._headers=r}var t,n;return t=e,(n=[{key:"_checkResponse",value:function(e){return e.ok?e.json():Promise.reject("Ошибка ".concat(e.status," ").concat(e.statusText))}},{key:"getInitialCards",value:function(){var e=this;return fetch("".concat(this._baseUrl,"/cards"),{headers:this._headers}).then((function(t){return e._checkResponse(t)}))}},{key:"getUserInfo",value:function(){var e=this;return fetch("".concat(this._baseUrl,"/users/me"),{headers:this._headers}).then((function(t){return e._checkResponse(t)}))}},{key:"setUserInfo",value:function(e,t){var n=this;return fetch("".concat(this._baseUrl,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e,about:t})}).then((function(e){return n._checkResponse(e)}))}},{key:"addNewCard",value:function(e){var t=this;return fetch("".concat(this._baseUrl,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:e["place-name"],link:e["place-link"]})}).then((function(e){return t._checkResponse(e)}))}},{key:"deleteCard",value:function(e){var t=this;return fetch("".concat(this._baseUrl,"/cards/").concat(e),{method:"DELETE",headers:this._headers}).then((function(e){return t._checkResponse(e)}))}},{key:"setLike",value:function(e){var t=this;return fetch("".concat(this._baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:this._headers}).then((function(e){return t._checkResponse(e)}))}},{key:"delLike",value:function(e){var t=this;return fetch("".concat(this._baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:this._headers}).then((function(e){return t._checkResponse(e)}))}},{key:"setUserAvatar",value:function(e){var t=this;return fetch("".concat(this._baseUrl,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})}).then((function(e){return t._checkResponse(e)}))}}])&&E(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function C(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var x=function(){function e(t,n){var r=t.cardsData,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._data=r,this._renderer=o,this._container=n}var t,n;return t=e,(n=[{key:"setItem",value:function(e){this._container.append(e)}},{key:"_clear",value:function(){this._container.innerHTML=""}},{key:"addItem",value:function(e){this._renderer(e)}},{key:"addItems",value:function(){var e=this;this._clear(),this._data.forEach((function(t){e._renderer(t)}))}}])&&C(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function O(e){return O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},O(e)}function q(){return q="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=I(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},q.apply(this,arguments)}function I(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=R(e)););return e}function j(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&P(e,t)}function P(e,t){return P=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},P(e,t)}function T(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=R(e);if(t){var o=R(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return U(this,n)}}function U(e,t){if(t&&("object"===O(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function R(e){return R=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},R(e)}function B(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function A(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function D(e,t,n){return t&&A(e.prototype,t),n&&A(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}var N=function(){function e(t){B(this,e),this._popupSelector=t,this.setEventListeners(),this._handleEsc=this._handleEscClose.bind(this)}return D(e,[{key:"open",value:function(){this._popupSelector.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEsc)}},{key:"close",value:function(){this._popupSelector.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEsc)}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"setEventListeners",value:function(){var e=this;this._popupSelector.addEventListener("mousedown",(function(t){t.target.classList.contains("popup_opened")&&e.close(e._popupSelector),t.target.classList.contains("popup__close-button")&&e.close(e._popupSelector)}))}}]),e}(),H=function(e){j(n,e);var t=T(n);function n(e){var r;return B(this,n),(r=t.call(this,e))._bigImage=r._popupSelector.querySelector(".popup__big-img"),r._popupImgDesc=r._popupSelector.querySelector(".popup__img-description"),r}return D(n,[{key:"open",value:function(e){q(R(n.prototype),"open",this).call(this),this._bigImage.src=e.link,this._bigImage.alt=e.name,this._popupImgDesc.textContent=e.name}}]),n}(N),V=function(e){j(n,e);var t=T(n);function n(e,r){var o;return B(this,n),(o=t.call(this,e))._handler=r,o}return D(n,[{key:"_getInputValues",value:function(){var e=this;return this._inputList=Array.from(this._formElement.querySelectorAll(".popup__input-field")),this._formValues={},this._inputList.forEach((function(t){e._formValues[t.name]=t.value})),this._formValues}},{key:"close",value:function(){q(R(n.prototype),"close",this).call(this),this._formElement.reset()}},{key:"setEventListeners",value:function(){var e=this;this._formElement=this._popupSelector.querySelector(".popup__form");var t=this._popupSelector.querySelector(".popup__submit-button");q(R(n.prototype),"setEventListeners",this).call(this),this._formElement.addEventListener("submit",(function(n){n.preventDefault();var r=e._getInputValues();e._handler.formSubmitHandler(r,t)}))}}]),n}(N);function G(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var F=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._formSelector=t.formSelector,this._inputSelector=t.inputSelector,this._submitButtonSelector=t.submitButtonSelector,this._inactiveButtonClass=t.inactiveButtonClass,this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass,this._formElement=n}var t,n;return t=e,(n=[{key:"_showInputError",value:function(e,t){var n=this._formElement.querySelector("#".concat(e.id,"-error"));e.classList.add(this._inputErrorClass),n.textContent=t,n.classList.add(this._errorClass)}},{key:"_hideInputError",value:function(e){var t=this._formElement.querySelector("#".concat(e.id,"-error"));e.classList.remove(this._inputErrorClass),t.classList.remove(this._errorClass),t.textContent=""}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"_hasInvalidInput",value:function(e){return e.some((function(e){return!e.validity.valid}))}},{key:"_toggleButtonState",value:function(e,t){this._hasInvalidInput(e)?(t.classList.add(this._inactiveButtonClass),t.setAttribute("disabled","")):(t.classList.remove(this._inactiveButtonClass),t.removeAttribute("disabled"))}},{key:"_setEventListeners",value:function(){var e=this,t=Array.from(this._formElement.querySelectorAll(this._inputSelector)),n=this._formElement.querySelector(this._submitButtonSelector);this._toggleButtonState(t,n,this._inactiveButtonClass),t.forEach((function(r){r.addEventListener("input",(function(){e._checkInputValidity(r),e._toggleButtonState(t,n,e._inactiveButtonClass)}))}))}},{key:"enableValidation",value:function(){this._setEventListeners()}}])&&G(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function J(e){return J="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},J(e)}function M(){M=function(){return e};var e={},t=Object.prototype,n=t.hasOwnProperty,r="function"==typeof Symbol?Symbol:{},o=r.iterator||"@@iterator",i=r.asyncIterator||"@@asyncIterator",a=r.toStringTag||"@@toStringTag";function c(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{c({},"")}catch(e){c=function(e,t,n){return e[t]=n}}function u(e,t,n,r){var o=t&&t.prototype instanceof f?t:f,i=Object.create(o.prototype),a=new S(r||[]);return i._invoke=function(e,t,n){var r="suspendedStart";return function(o,i){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw i;return{value:void 0,done:!0}}for(n.method=o,n.arg=i;;){var a=n.delegate;if(a){var c=g(a,n);if(c){if(c===l)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var u=s(e,t,n);if("normal"===u.type){if(r=n.done?"completed":"suspendedYield",u.arg===l)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(r="completed",n.method="throw",n.arg=u.arg)}}}(e,n,a),i}function s(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(e){return{type:"throw",arg:e}}}e.wrap=u;var l={};function f(){}function h(){}function p(){}var d={};c(d,o,(function(){return this}));var _=Object.getPrototypeOf,y=_&&_(_(E([])));y&&y!==t&&n.call(y,o)&&(d=y);var v=p.prototype=f.prototype=Object.create(d);function m(e){["next","throw","return"].forEach((function(t){c(e,t,(function(e){return this._invoke(t,e)}))}))}function b(e,t){function r(o,i,a,c){var u=s(e[o],e,i);if("throw"!==u.type){var l=u.arg,f=l.value;return f&&"object"==J(f)&&n.call(f,"__await")?t.resolve(f.__await).then((function(e){r("next",e,a,c)}),(function(e){r("throw",e,a,c)})):t.resolve(f).then((function(e){l.value=e,a(l)}),(function(e){return r("throw",e,a,c)}))}c(u.arg)}var o;this._invoke=function(e,n){function i(){return new t((function(t,o){r(e,n,t,o)}))}return o=o?o.then(i,i):i()}}function g(e,t){var n=e.iterator[t.method];if(void 0===n){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=void 0,g(e,t),"throw"===t.method))return l;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return l}var r=s(n,e.iterator,t.arg);if("throw"===r.type)return t.method="throw",t.arg=r.arg,t.delegate=null,l;var o=r.arg;return o?o.done?(t[e.resultName]=o.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,l):o:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,l)}function k(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function w(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function S(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(k,this),this.reset(!0)}function E(e){if(e){var t=e[o];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var r=-1,i=function t(){for(;++r<e.length;)if(n.call(e,r))return t.value=e[r],t.done=!1,t;return t.value=void 0,t.done=!0,t};return i.next=i}}return{next:L}}function L(){return{value:void 0,done:!0}}return h.prototype=p,c(v,"constructor",p),c(p,"constructor",h),h.displayName=c(p,a,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===h||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,p):(e.__proto__=p,c(e,a,"GeneratorFunction")),e.prototype=Object.create(v),e},e.awrap=function(e){return{__await:e}},m(b.prototype),c(b.prototype,i,(function(){return this})),e.AsyncIterator=b,e.async=function(t,n,r,o,i){void 0===i&&(i=Promise);var a=new b(u(t,n,r,o),i);return e.isGeneratorFunction(n)?a:a.next().then((function(e){return e.done?e.value:a.next()}))},m(v),c(v,a,"Generator"),c(v,o,(function(){return this})),c(v,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=[];for(var n in e)t.push(n);return t.reverse(),function n(){for(;t.length;){var r=t.pop();if(r in e)return n.value=r,n.done=!1,n}return n.done=!0,n}},e.values=E,S.prototype={constructor:S,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(w),!e)for(var t in this)"t"===t.charAt(0)&&n.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function r(n,r){return a.type="throw",a.arg=e,t.next=n,r&&(t.method="next",t.arg=void 0),!!r}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return r("end");if(i.tryLoc<=this.prev){var c=n.call(i,"catchLoc"),u=n.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return r(i.catchLoc,!0);if(this.prev<i.finallyLoc)return r(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return r(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return r(i.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=e,a.arg=t,i?(this.method="next",this.next=i.finallyLoc,l):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),l},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),w(n),l}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var o=r.arg;w(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:E(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=void 0),l}},e}function Y(e,t,n,r,o,i,a){try{var c=e[i](a),u=c.value}catch(e){return void n(e)}c.done?t(u):Promise.resolve(u).then(r,o)}function z(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var K,Q=function(){function e(t){var n=t.nameSelector,r=t.bioSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._nameSelector=n,this._bioSelector=r}var t,n,r,o;return t=e,n=[{key:"getUserInfo",value:(r=M().mark((function e(){var t=this;return M().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,W.getUserInfo().then((function(e){return t.user=e,t.user})).catch((function(e){console.log(e)}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})),o=function(){var e=this,t=arguments;return new Promise((function(n,o){var i=r.apply(e,t);function a(e){Y(i,n,o,a,c,"next",e)}function c(e){Y(i,n,o,a,c,"throw",e)}a(void 0)}))},function(){return o.apply(this,arguments)})},{key:"setUserInfo",value:function(e){var t=this;W.setUserInfo(e.name,e.about).then((function(e){t._nameSelector.textContent=e.name,t._bioSelector.textContent=e.about})).catch((function(e){console.log(e)}))}}],n&&z(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),W=new L({baseUrl:"https://nomoreparties.co/v1/plus-cohort-11",headers:{authorization:"ae0b9021-b91d-4516-99a3-d1f2660c87bd","Content-Type":"application/json"}}),X=new H(i),Z=new N(y),$=[u,c,v];Promise.all([W.getUserInfo(),W.getInitialCards()]).then((function(e){return f.textContent=e[0].name,h.textContent=e[0].about,p.src=e[0].avatar,new Q(e[0].name,e[0].about),K=new x({cardsData:e[1],renderer:function(t){var n=new S(t,e[0],"#card-template",{handleCardClick:function(){X.open(t)},setLikeHandler:function(e,t,n){W.setLike(e).then((function(e){t.textContent=e.likes.length,n.classList.add("card__like-button_active")})).catch((function(e){console.log(e)}))},delLikeHandler:function(e,t,n){W.delLike(e).then((function(e){t.textContent=e.likes.length,n.classList.remove("card__like-button_active")})).catch((function(e){console.log(e)}))},delCardHandler:function(e){W.deleteCard(e).then((function(e){evt.target.closest(".card").remove()})).catch((function(e){console.log(e)}))},confirmDelCard:function(){re.open()}}),r=n.generate();K.setItem(r)}},a),K.addItems(),e[0]})).catch((function(e){console.log(e)}));var ee=new V(r,{formSubmitHandler:function(e,t){b(!0,t),W.setUserInfo(e["user-name"],e["user-bio"]).then((function(e){f.textContent=e.name,h.textContent=e.about,ee.close(),g(t)})).finally((function(){b(!1,t)}))}}),te=new V(o,{formSubmitHandler:function(e,t){b(!0,t),W.addNewCard(e).then((function(e){K.addItem(e),g(t),c.reset(),te.close()})).catch((function(e){console.log(e)})).finally((function(){b(!1,t,"Создать")}))}}),ne=new V(y,{formSubmitHandler:function(e,t){b(!0,t),W.setUserAvatar(e["avatar-link"]).then((function(e){p.src=e.avatar,ne.close(),g(t),v.reset()})).catch((function(e){console.log(e)})).finally((function(){b(!1,t)}))}}),re=new V(d,{formSubmitHandler:function(e,t){W.deleteCard(w.id).then((function(e){w.remove(),re.close()})).catch((function(e){console.log(e)}))}});t.addEventListener("click",(function(){s.value=f.textContent,l.value=h.textContent,ee.open()})),n.addEventListener("click",(function(){te.open()})),_.addEventListener("click",(function(){Z.open()})),$.forEach((function(e){new F(m,e).enableValidation()}))})();