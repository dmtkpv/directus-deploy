!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.__DirectusExtension__=t():e.__DirectusExtension__=t()}(window,(function(){return function(e){var t={};function i(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,i),r.l=!0,r.exports}return i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=2)}([function(e,t,i){},function(e,t,i){"use strict";var n=i(0);i.n(n).a},function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"deploy"},[i("v-header",{attrs:{breadcrumb:[],icon:"build",title:"Deploy"}},[i("template",{slot:"buttons"},[i("v-header-button",{attrs:{disabled:!e.editing||e.pending||e.triggering,loading:e.saving,label:"Save",icon:"check","background-color":"button-primary-background-color","icon-color":"button-primary-text-color"},on:{click:e.save}})],1)],2),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:e.loading,expression:"loading"}],staticClass:"loader"},[i("v-spinner")],1),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!e.loading,expression:"!loading"}]},[i("v-form",{attrs:{fields:e.fields,values:e.values,collection:e.collection},on:{"stage-value":e.stageValue}}),e._v(" "),i("v-button",{staticClass:"trigger",attrs:{disabled:!e.data.command||e.saving||e.editing,loading:e.pending||e.triggering},on:{click:function(t){return e.trigger()}}},[e._v("\n            Trigger deploy\n        ")])],1)],1)};n._withStripped=!0;var r={collection:"module_deploy",single:!0,hidden:!0,fields:{id:{field:"id",interface:"primary-key",type:"integer",datatype:"INT",length:15,primary_key:!0,hidden_browse:!0,hidden_detail:!0,auto_increment:!0},pid:{field:"pid",interface:"numeric",type:"integer",datatype:"INT",hidden_browse:!0,hidden_detail:!0},cmd:{field:"cmd",interface:"text-input",type:"string",datatype:"varchar",length:200,hidden_browse:!0,hidden_detail:!0},command:{field:"command",interface:"text-input",type:"string",datatype:"varchar",length:200},divider:{field:"divider",interface:"divider",type:"alias",options:{title:"Last deploy"}},status:{field:"status",interface:"text-input",type:"string",datatype:"varchar",length:200,width:"half",readonly:!0,options:{placeholder:"Fresh"}},time:{field:"time",interface:"datetime",type:"datetime",datatype:"datetime",width:"half",readonly:!0},log:{field:"log",interface:"code",type:"string",datatype:"text",readonly:!0}}};var a={data:()=>({fields:r.fields,collection:r.collection,data:{},edits:{},loading:!0,saving:!1,triggering:!1}),computed:{values(){return{...this.data,...this.edits}},editing(){return Object.keys(this.edits).length>0},pending(){return"Pending"===this.data.status}},methods:{success(e){this.$notify({title:e,color:"green",iconMain:"check"})},error(e){this.$events.emit("error",{notify:e.message||this.$t("something_went_wrong_body"),error:e})},request(e=""){return this.$api.api.request("get","/custom/deploy"+e)},update(){this._isDestroyed||this.request("/status").then(e=>{Object.assign(this.data,e.data),this.pending&&setTimeout(()=>this.update(),1e3)}).catch(e=>{this.error(e)})},trigger(){this.request().then(()=>{this.data.status="Pending",this.data.log="",this.update()}).catch(e=>{this.error(e)}).finally(()=>{this.triggering=!1})},save(){this.saving=!0,this.$api.updateItem(r.collection,1,this.edits).then(e=>{this.edits={},this.data=e.data,this.success("Settings saved")}).catch(e=>{this.error(e)}).finally(()=>{this.saving=!1})},stageValue({field:e,value:t}){return this.data[e]||t?this.data[e]===t?this.$delete(this.edits,e):this.$set(this.edits,e,t):this.$delete(this.edits,e)}},watch:{"data.status"(e){this.$set(this.fields.status.options,"iconLeft",{Pending:"cached",Success:"done",Error:"error"}[e])}},created(){this.$api.getItem(r.collection,1).then(e=>e).catch(e=>{if(function(e){return 404===e.info.error.response.status}(e))return this.$api.createCollection(r).then(e=>this.$api.createItem(r.collection));throw e}).then(e=>{this.data=e.data,this.pending&&this.update()}).catch(e=>{this.error(e)}).finally(()=>{this.loading=!1})}};i(1);var s=function(e,t,i,n,r,a,s,o){var d,l="function"==typeof e?e.options:e;if(t&&(l.render=t,l.staticRenderFns=i,l._compiled=!0),n&&(l.functional=!0),a&&(l._scopeId="data-v-"+a),s?(d=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(s)},l._ssrRegister=d):r&&(d=o?function(){r.call(this,(l.functional?this.parent:this).$root.$options.shadowRoot)}:r),d)if(l.functional){l._injectStyles=d;var c=l.render;l.render=function(e,t){return d.call(t),c(e,t)}}else{var u=l.beforeCreate;l.beforeCreate=u?[].concat(u,d):[d]}return{exports:e,options:l}}(a,n,[],!1,null,"8717a634",null);s.options.__file="src/module/module.vue";t.default=s.exports}])}));
//# sourceMappingURL=module.js.map