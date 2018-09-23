(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Login"] = factory();
	else
		root["Login"] = factory();
})(window, function() {
return (window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([["Login"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Login/Login.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./vendor/cl/users/js/Login/Login.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var Vue = Site.Vue;
var router = new Site.VueRouter({
  mode: 'history',
  routes: []
});
module.exports = {
  router: router,
  data: function data() {
    return {
      credentials: {
        id: '',
        password: '',
        keep: false
      },
      msg: ''
    };
  },
  props: ['json'],
  created: function created() {
    Site.api.post('/api/users/logout', {}).then(function (response) {}).catch(function (error) {});
  },
  mounted: function mounted() {
    this.redirect = this.$route.query.u;

    if (this.redirect === undefined || this.redirect === null) {
      this.redirect = Site.root + '/';
    }
  },
  methods: {
    submit: function submit() {
      var _this = this;

      Site.api.post('/api/users/login', this.credentials).then(function (response) {
        if (response.hasError()) {
          Site.toast(_this, response);
        } else {
          window.location = _this.redirect;
        }
      }).catch(function (error) {
        Site.toast(_this, error);
      });
    }
  }
};

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js?sourceMap!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Login/Login.vue?vue&type=style&index=0&lang=scss&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader!./node_modules/sass-loader/lib/loader.js?sourceMap!./node_modules/vue-loader/lib??vue-loader-options!./vendor/cl/users/js/Login/Login.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n#login fieldset {\n  -moz-box-shadow: 3px 3px 8px #ccc;\n  -webkit-box-shadow: 3px 3px 8px #ccc;\n  box-shadow: 3px 3px 8px #ccc;\n}\n#login fieldset {\n  width: 18em;\n  margin: 1em auto;\n  color: white;\n  background-color: #00723f;\n  border: thin solid black;\n}\n#login #userid,\n#login #password {\n  width: 16em;\n}\n#login input {\n  color: black;\n}\n#login .msg {\n  text-align: center;\n  color: #ccc;\n  font-style: italic;\n  font-size: 0.9em;\n  display: none;\n}\n#login p {\n  margin: 1em 0;\n}\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Login/Login.vue?vue&type=template&id=2091d1d1&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./vendor/cl/users/js/Login/Login.vue?vue&type=template&id=2091d1d1& ***!
  \*********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "content" }, [
    _vm.json.before !== undefined
      ? _c("div", { domProps: { innerHTML: _vm._s(_vm.json.before) } })
      : _vm._e(),
    _vm._v(" "),
    _c(
      "form",
      {
        staticClass: "left",
        attrs: { id: "login", method: "post" },
        on: {
          submit: function($event) {
            $event.preventDefault()
            return _vm.submit($event)
          }
        }
      },
      [
        _c("fieldset", [
          _c("p", [
            _c("label", { attrs: { for: "userid" } }, [_vm._v("User ID")]),
            _c("br"),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.credentials.id,
                  expression: "credentials.id"
                }
              ],
              attrs: { type: "text", id: "userid" },
              domProps: { value: _vm.credentials.id },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.credentials, "id", $event.target.value)
                }
              }
            })
          ]),
          _vm._v(" "),
          _c("p", [
            _c("label", { attrs: { for: "password" } }, [_vm._v("Password")]),
            _c("br"),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.credentials.password,
                  expression: "credentials.password"
                }
              ],
              attrs: { type: "password", id: "password" },
              domProps: { value: _vm.credentials.password },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.credentials, "password", $event.target.value)
                }
              }
            })
          ]),
          _vm._v(" "),
          _c("p", [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.credentials.keep,
                  expression: "credentials.keep"
                }
              ],
              attrs: { id: "keep", type: "checkbox" },
              domProps: {
                checked: Array.isArray(_vm.credentials.keep)
                  ? _vm._i(_vm.credentials.keep, null) > -1
                  : _vm.credentials.keep
              },
              on: {
                change: function($event) {
                  var $$a = _vm.credentials.keep,
                    $$el = $event.target,
                    $$c = $$el.checked ? true : false
                  if (Array.isArray($$a)) {
                    var $$v = null,
                      $$i = _vm._i($$a, $$v)
                    if ($$el.checked) {
                      $$i < 0 &&
                        _vm.$set(_vm.credentials, "keep", $$a.concat([$$v]))
                    } else {
                      $$i > -1 &&
                        _vm.$set(
                          _vm.credentials,
                          "keep",
                          $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                        )
                    }
                  } else {
                    _vm.$set(_vm.credentials, "keep", $$c)
                  }
                }
              }
            }),
            _vm._v(" "),
            _c("label", { attrs: { for: "keep" } }, [
              _vm._v("Keep me logged in")
            ])
          ]),
          _vm._v(" "),
          _vm._m(0),
          _vm._v(" "),
          _c("p", { staticClass: "msg" }, [_vm._v(_vm._s(_vm.msg))])
        ])
      ]
    ),
    _vm._v(" "),
    _vm.json.after !== undefined
      ? _c("div", {
          staticClass: "left",
          domProps: { innerHTML: _vm._s(_vm.json.after) }
        })
      : _vm._e()
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", [_c("input", { attrs: { type: "submit", value: "Login" } })])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js?sourceMap!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Login/Login.vue?vue&type=style&index=0&lang=scss&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader!./node_modules/sass-loader/lib/loader.js?sourceMap!./node_modules/vue-loader/lib??vue-loader-options!./vendor/cl/users/js/Login/Login.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/resolve-url-loader!../../../../../node_modules/sass-loader/lib/loader.js?sourceMap!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js?sourceMap!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Login/Login.vue?vue&type=style&index=0&lang=scss&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("2063f41a", content, false, {});
// Hot Module Replacement
if(true) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/resolve-url-loader!../../../../../node_modules/sass-loader/lib/loader.js?sourceMap!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js?sourceMap!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Login/Login.vue?vue&type=style&index=0&lang=scss&", function() {
     var newContent = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/resolve-url-loader!../../../../../node_modules/sass-loader/lib/loader.js?sourceMap!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js?sourceMap!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Login/Login.vue?vue&type=style&index=0&lang=scss&");
     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./vendor/cl/site/js/Vue/PageVue.js":
/*!******************************************!*\
  !*** ./vendor/cl/site/js/Vue/PageVue.js ***!
  \******************************************/
/*! exports provided: PageVue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageVue", function() { return PageVue; });
/**
 * Basic Vue-based site page starter
 *
 * How to use:
 * @code
 * site.ready(() => {
 *    PageVue.create('div.cl-grade-assignment', 'Assignment Grade', GradeAssignmentVue);
 *    PageVue.create('div.cl-grades', 'Grades', GradesVue);
 * });
 * @endcode
 *
 * @constructor PageVue
 */
var PageVue = function PageVue() {};
/**
 * Create a page in a given component, replacing the provided
 * selector. The selector is assumed to contain JSON data that is
 * then provided to the component in the json property.
 *
 * @param sel Selector for a div to replace with the view.
 * @param title Initial title to apply to the page
 * @param component Component to display (Vue)
 * @param nav Optional navigation component, like PageNav
 */

PageVue.create = function (sel, title, component, nav) {
  var element = document.querySelector(sel);

  if (element === null) {
    return;
  }

  var navtag = nav !== undefined ? '<page-nav :menu="menu"></page-nav>' : '';
  var template = "<div><site-header :title=\"title\">".concat(navtag, "</site-header>\n<page-vue :json=\"json\"></page-vue><site-footer></site-footer>\n</div>");
  var Header = Site.info.header.component();
  var Footer = Site.info.footer.component();
  var json = JSON.parse(element.textContent);
  var store = Site.store;
  var components = {
    'site-header': Header,
    'site-footer': Footer,
    'page-vue': component
  };

  if (nav !== undefined) {
    components['page-nav'] = nav;
  }

  new Site.Vue({
    el: element,
    store: store,
    data: {
      title: title,
      json: json,
      menu: []
    },
    template: template,
    components: components,
    methods: {
      /**
       * Set the site title. This can be used from
       * the child Vue's using this.$parent.setTitle('')
       * @memberof PageVue
       * @instance
       * @param {string} title Title to set
       */
      setTitle: function setTitle(title) {
        this.title = title;
        document.title = Site.info.siteName + ' ' + title;
      },
      setMenu: function setMenu(menu) {
        this.menu = menu;
      }
    }
  });
};

/***/ }),

/***/ "./vendor/cl/users/js/Login/Login.js":
/*!*******************************************!*\
  !*** ./vendor/cl/users/js/Login/Login.js ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var site_cl_js_Vue_PageVue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! site-cl/js/Vue/PageVue */ "./vendor/cl/site/js/Vue/PageVue.js");
/* harmony import */ var _Login_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Login.vue */ "./vendor/cl/users/js/Login/Login.vue");



var Login = function Login() {};

Login.start = function (site) {
  site.ready(function () {
    site_cl_js_Vue_PageVue__WEBPACK_IMPORTED_MODULE_0__["PageVue"].create('div.cl-login', 'Login', _Login_vue__WEBPACK_IMPORTED_MODULE_1__["default"]);
  });
};

Login.start(Site.Site);

/***/ }),

/***/ "./vendor/cl/users/js/Login/Login.vue":
/*!********************************************!*\
  !*** ./vendor/cl/users/js/Login/Login.vue ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Login_vue_vue_type_template_id_2091d1d1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Login.vue?vue&type=template&id=2091d1d1& */ "./vendor/cl/users/js/Login/Login.vue?vue&type=template&id=2091d1d1&");
/* harmony import */ var _Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Login.vue?vue&type=script&lang=js& */ "./vendor/cl/users/js/Login/Login.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _Login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Login.vue?vue&type=style&index=0&lang=scss& */ "./vendor/cl/users/js/Login/Login.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Login_vue_vue_type_template_id_2091d1d1___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Login_vue_vue_type_template_id_2091d1d1___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__(/*! ./node_modules/vue-hot-reload-api/dist/index.js */ "./node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('2091d1d1', component.options)
    } else {
      api.reload('2091d1d1', component.options)
    }
    module.hot.accept(/*! ./Login.vue?vue&type=template&id=2091d1d1& */ "./vendor/cl/users/js/Login/Login.vue?vue&type=template&id=2091d1d1&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _Login_vue_vue_type_template_id_2091d1d1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Login.vue?vue&type=template&id=2091d1d1& */ "./vendor/cl/users/js/Login/Login.vue?vue&type=template&id=2091d1d1&");
(function () {
      api.rerender('2091d1d1', {
        render: _Login_vue_vue_type_template_id_2091d1d1___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _Login_vue_vue_type_template_id_2091d1d1___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); })
  }
}
component.options.__file = "vendor/cl/users/js/Login/Login.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./vendor/cl/users/js/Login/Login.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./vendor/cl/users/js/Login/Login.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Login/Login.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./vendor/cl/users/js/Login/Login.vue?vue&type=style&index=0&lang=scss&":
/*!******************************************************************************!*\
  !*** ./vendor/cl/users/js/Login/Login.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_lib_loader_js_sourceMap_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/resolve-url-loader!../../../../../node_modules/sass-loader/lib/loader.js?sourceMap!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js?sourceMap!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Login/Login.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_lib_loader_js_sourceMap_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_lib_loader_js_sourceMap_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_lib_loader_js_sourceMap_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_lib_loader_js_sourceMap_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_lib_loader_js_sourceMap_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./vendor/cl/users/js/Login/Login.vue?vue&type=template&id=2091d1d1&":
/*!***************************************************************************!*\
  !*** ./vendor/cl/users/js/Login/Login.vue?vue&type=template&id=2091d1d1& ***!
  \***************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_2091d1d1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=template&id=2091d1d1& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Login/Login.vue?vue&type=template&id=2091d1d1&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_2091d1d1___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_2091d1d1___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

},[["./vendor/cl/users/js/Login/Login.js","runtime","vendor"]]]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9bbmFtZV0vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL1tuYW1lXS92ZW5kb3IvY2wvdXNlcnMvanMvTG9naW4vTG9naW4udnVlIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC91c2Vycy9qcy9Mb2dpbi9Mb2dpbi52dWU/OTVlYiIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvdXNlcnMvanMvTG9naW4vTG9naW4udnVlP2RhYjMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3VzZXJzL2pzL0xvZ2luL0xvZ2luLnZ1ZT8zOWU3Iiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9zaXRlL2pzL1Z1ZS9QYWdlVnVlLmpzIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC91c2Vycy9qcy9Mb2dpbi9Mb2dpbi5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvdXNlcnMvanMvTG9naW4vTG9naW4udnVlIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC91c2Vycy9qcy9Mb2dpbi9Mb2dpbi52dWU/Y2NmMSIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvdXNlcnMvanMvTG9naW4vTG9naW4udnVlPzNjZmEiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3VzZXJzL2pzL0xvZ2luL0xvZ2luLnZ1ZT81NDQ4Il0sIm5hbWVzIjpbIlBhZ2VWdWUiLCJjcmVhdGUiLCJzZWwiLCJ0aXRsZSIsImNvbXBvbmVudCIsIm5hdiIsImVsZW1lbnQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJuYXZ0YWciLCJ1bmRlZmluZWQiLCJ0ZW1wbGF0ZSIsIkhlYWRlciIsIlNpdGUiLCJpbmZvIiwiaGVhZGVyIiwiRm9vdGVyIiwiZm9vdGVyIiwianNvbiIsIkpTT04iLCJwYXJzZSIsInRleHRDb250ZW50Iiwic3RvcmUiLCJjb21wb25lbnRzIiwiVnVlIiwiZWwiLCJkYXRhIiwibWVudSIsIm1ldGhvZHMiLCJzZXRUaXRsZSIsInNpdGVOYW1lIiwic2V0TWVudSIsIkxvZ2luIiwic3RhcnQiLCJzaXRlIiwicmVhZHkiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVUE7QUFFQTtBQUNBLGlCQURBO0FBRUE7QUFGQTtBQUtBO0FBQ0EsZ0JBREE7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQURBO0FBRUEsb0JBRkE7QUFHQTtBQUhBLE9BREE7QUFNQTtBQU5BO0FBUUEsR0FYQTtBQVlBLGlCQVpBO0FBYUE7QUFDQSwyQ0FDQSxJQURBLENBQ0EscUJBQ0EsQ0FGQSxFQUdBLEtBSEEsQ0FHQSxrQkFDQSxDQUpBO0FBS0EsR0FuQkE7QUFvQkE7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQXpCQTtBQTBCQTtBQUNBLFVBREEsb0JBQ0E7QUFBQTs7QUFDQSwwREFDQSxJQURBLENBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FGQSxNQUVBO0FBQ0E7QUFDQTtBQUVBLE9BUkEsRUFTQSxLQVRBLENBU0E7QUFDQTtBQUNBLE9BWEE7QUFZQTtBQWRBO0FBMUJBLEU7Ozs7Ozs7Ozs7O0FDM0JBLDJCQUEyQixtQkFBTyxDQUFDLHlHQUF3RDtBQUMzRjs7O0FBR0E7QUFDQSxjQUFjLFFBQVMsc0JBQXNCLHNDQUFzQyx5Q0FBeUMsaUNBQWlDLEdBQUcsbUJBQW1CLGdCQUFnQixxQkFBcUIsaUJBQWlCLDhCQUE4Qiw2QkFBNkIsR0FBRyxxQ0FBcUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLGlCQUFpQixHQUFHLGVBQWUsdUJBQXVCLGdCQUFnQix1QkFBdUIscUJBQXFCLGtCQUFrQixHQUFHLFlBQVksa0JBQWtCLEdBQUc7O0FBRTNoQjs7Ozs7Ozs7Ozs7OztBQ1BBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHlC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Q0FBVyxZQUFNO0FBQ2JuQyxJQUFBLDhEQUFPLENBQUNDLE1BQVIsQ0FBZSxjQUFmLEVBQStCLE9BQS9CLEVBQXdDLGtEQUF4QztBQUNILEdBRkQ7QUFJSCxDQU5EOztBQVFBK0IsS0FBSyxDQUFDQyxLQUFOLENBQVlwQixJQUFJLENBQUNBLElBQWpCLEU7Ozs7Ozs7Ozs7OztBQ2ZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFvRjtBQUMzQjtBQUNMO0FBQ2M7OztBQUdsRTtBQUNtRztBQUNuRyxnQkFBZ0IsMkdBQVU7QUFDMUIsRUFBRSwyRUFBTTtBQUNSLEVBQUUsZ0ZBQU07QUFDUixFQUFFLHlGQUFlO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsSUFBSSxJQUFVO0FBQ2QsWUFBWSxtQkFBTyxDQUFDLHdHQUF5RztBQUM3SCxjQUFjLG1CQUFPLENBQUMsK0NBQUs7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLHNCQUFzQix1SEFBNEMsRUFBRTtBQUFBO0FBQ3BFO0FBQ0EsZ0JBQWdCLGdGQUFNO0FBQ3RCLHlCQUF5Qix5RkFBZTtBQUN4QyxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNlLGdGOzs7Ozs7Ozs7Ozs7QUN2Q2Y7QUFBQTtBQUFBO0FBQUE7QUFBK0wsQ0FBZ0IsOE9BQUcsRUFBQyxDOzs7Ozs7Ozs7Ozs7QUNBbk47QUFBQTtBQUFBO0FBQUE7QUFBOGEsQ0FBZ0IsbWFBQUcsRUFBQyxDOzs7Ozs7Ozs7Ozs7QUNBbGM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6ImxvZ2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiTG9naW5cIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiTG9naW5cIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2IGNsYXNzPVwiY29udGVudFwiPlxyXG4gICAgPGRpdiB2LWlmPVwianNvbi5iZWZvcmUgIT09IHVuZGVmaW5lZFwiIHYtaHRtbD1cImpzb24uYmVmb3JlXCI+PC9kaXY+XHJcbiAgICA8Zm9ybSBjbGFzcz1cImxlZnRcIiBpZD1cImxvZ2luXCIgQHN1Ym1pdC5wcmV2ZW50PVwic3VibWl0XCIgbWV0aG9kPVwicG9zdFwiPlxyXG4gICAgICA8ZmllbGRzZXQ+XHJcbiAgICAgICAgPHA+PGxhYmVsIGZvcj1cInVzZXJpZFwiPlVzZXIgSUQ8L2xhYmVsPjxicj5cclxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHYtbW9kZWw9XCJjcmVkZW50aWFscy5pZFwiIGlkPVwidXNlcmlkXCI+PC9wPlxyXG4gICAgICAgIDxwPjxsYWJlbCBmb3I9XCJwYXNzd29yZFwiPlBhc3N3b3JkPC9sYWJlbD48YnI+XHJcbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgdi1tb2RlbD1cImNyZWRlbnRpYWxzLnBhc3N3b3JkXCIgaWQ9XCJwYXNzd29yZFwiPjwvcD5cclxuICAgICAgICA8cD48aW5wdXQgaWQ9XCJrZWVwXCIgdHlwZT1cImNoZWNrYm94XCIgdi1tb2RlbD1cImNyZWRlbnRpYWxzLmtlZXBcIj4gPGxhYmVsIGZvcj1cImtlZXBcIj5LZWVwIG1lIGxvZ2dlZCBpbjwvbGFiZWw+PC9wPlxyXG4gICAgICAgIDxwPjxpbnB1dCB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJMb2dpblwiPjwvcD5cclxuICAgICAgICA8cCBjbGFzcz1cIm1zZ1wiPnt7bXNnfX08L3A+XHJcbiAgICAgIDwvZmllbGRzZXQ+XHJcbiAgICA8L2Zvcm0+XHJcbiAgICA8ZGl2IGNsYXNzPVwibGVmdFwiIHYtaWY9XCJqc29uLmFmdGVyICE9PSB1bmRlZmluZWRcIiB2LWh0bWw9XCJqc29uLmFmdGVyXCI+PC9kaXY+XHJcbiAgPC9kaXY+XHJcblxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuICAgIGxldCBWdWUgPSBTaXRlLlZ1ZTtcclxuXHJcbiAgICBsZXQgcm91dGVyID0gbmV3IFNpdGUuVnVlUm91dGVyKHtcclxuICAgICAgICBtb2RlOiAnaGlzdG9yeScsXHJcbiAgICAgICAgcm91dGVzOiBbXVxyXG4gICAgfSk7XHJcblxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICAgICAgcm91dGVyLFxyXG4gICAgICAgIGRhdGE6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgY3JlZGVudGlhbHM6IHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgIGtlZXA6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbXNnOiAnJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwcm9wczogWydqc29uJ10sXHJcbiAgICAgICAgY3JlYXRlZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIFNpdGUuYXBpLnBvc3QoJy9hcGkvdXNlcnMvbG9nb3V0Jywge30pXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1vdW50ZWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZGlyZWN0ID0gdGhpcy4kcm91dGUucXVlcnkudTtcclxuICAgICAgICAgICAgaWYodGhpcy5yZWRpcmVjdCA9PT0gdW5kZWZpbmVkIHx8IHRoaXMucmVkaXJlY3QgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVkaXJlY3QgPSBTaXRlLnJvb3QgKyAnLyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICAgICAgc3VibWl0KCkge1xyXG4gICAgICAgICAgICAgICAgU2l0ZS5hcGkucG9zdCgnL2FwaS91c2Vycy9sb2dpbicsIHRoaXMuY3JlZGVudGlhbHMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZihyZXNwb25zZS5oYXNFcnJvcigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgU2l0ZS50b2FzdCh0aGlzLCByZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IHRoaXMucmVkaXJlY3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBTaXRlLnRvYXN0KHRoaXMsIGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgbGFuZz1cInNjc3NcIj5cclxuQGltcG9ydCAnLi4vLi4vLi4vc2l0ZS9zYXNzL21vZHVsZXMvX2NvbG9ycyc7XHJcblxyXG4jbG9naW4ge1xyXG5cclxuICBmaWVsZHNldCB7XHJcbiAgICB3aWR0aDogMThlbTtcclxuICAgIG1hcmdpbjogMWVtIGF1dG87XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkcHJpbWFyeTtcclxuICAgIGJvcmRlcjogdGhpbiBzb2xpZCBibGFjaztcclxuICAgIEBleHRlbmQgJXNoYWRvdztcclxuICB9XHJcblxyXG4gICN1c2VyaWQsICNwYXNzd29yZCB7XHJcbiAgICB3aWR0aDogMTZlbTtcclxuICB9XHJcblxyXG4gIGlucHV0IHtcclxuICAgIGNvbG9yOiBibGFjaztcclxuICB9XHJcblxyXG4gIC5tc2cge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgY29sb3I6ICNjY2M7XHJcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XHJcbiAgICBmb250LXNpemU6IDAuOWVtO1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxuICB9XHJcblxyXG4gIHAge1xyXG4gICAgbWFyZ2luOiAxZW0gMDtcclxuICB9XHJcbn1cclxuPC9zdHlsZT5cclxuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4jbG9naW4gZmllbGRzZXQge1xcbiAgLW1vei1ib3gtc2hhZG93OiAzcHggM3B4IDhweCAjY2NjO1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAzcHggM3B4IDhweCAjY2NjO1xcbiAgYm94LXNoYWRvdzogM3B4IDNweCA4cHggI2NjYztcXG59XFxuI2xvZ2luIGZpZWxkc2V0IHtcXG4gIHdpZHRoOiAxOGVtO1xcbiAgbWFyZ2luOiAxZW0gYXV0bztcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDcyM2Y7XFxuICBib3JkZXI6IHRoaW4gc29saWQgYmxhY2s7XFxufVxcbiNsb2dpbiAjdXNlcmlkLFxcbiNsb2dpbiAjcGFzc3dvcmQge1xcbiAgd2lkdGg6IDE2ZW07XFxufVxcbiNsb2dpbiBpbnB1dCB7XFxuICBjb2xvcjogYmxhY2s7XFxufVxcbiNsb2dpbiAubXNnIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGNvbG9yOiAjY2NjO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgZm9udC1zaXplOiAwLjllbTtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcbiNsb2dpbiBwIHtcXG4gIG1hcmdpbjogMWVtIDA7XFxufVxcblxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjb250ZW50XCIgfSwgW1xuICAgIF92bS5qc29uLmJlZm9yZSAhPT0gdW5kZWZpbmVkXG4gICAgICA/IF9jKFwiZGl2XCIsIHsgZG9tUHJvcHM6IHsgaW5uZXJIVE1MOiBfdm0uX3MoX3ZtLmpzb24uYmVmb3JlKSB9IH0pXG4gICAgICA6IF92bS5fZSgpLFxuICAgIF92bS5fdihcIiBcIiksXG4gICAgX2MoXG4gICAgICBcImZvcm1cIixcbiAgICAgIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6IFwibGVmdFwiLFxuICAgICAgICBhdHRyczogeyBpZDogXCJsb2dpblwiLCBtZXRob2Q6IFwicG9zdFwiIH0sXG4gICAgICAgIG9uOiB7XG4gICAgICAgICAgc3VibWl0OiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICByZXR1cm4gX3ZtLnN1Ym1pdCgkZXZlbnQpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgW1xuICAgICAgICBfYyhcImZpZWxkc2V0XCIsIFtcbiAgICAgICAgICBfYyhcInBcIiwgW1xuICAgICAgICAgICAgX2MoXCJsYWJlbFwiLCB7IGF0dHJzOiB7IGZvcjogXCJ1c2VyaWRcIiB9IH0sIFtfdm0uX3YoXCJVc2VyIElEXCIpXSksXG4gICAgICAgICAgICBfYyhcImJyXCIpLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmNyZWRlbnRpYWxzLmlkLFxuICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJjcmVkZW50aWFscy5pZFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcInRleHRcIiwgaWQ6IFwidXNlcmlkXCIgfSxcbiAgICAgICAgICAgICAgZG9tUHJvcHM6IHsgdmFsdWU6IF92bS5jcmVkZW50aWFscy5pZCB9LFxuICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgIGlucHV0OiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgIGlmICgkZXZlbnQudGFyZ2V0LmNvbXBvc2luZykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF92bS4kc2V0KF92bS5jcmVkZW50aWFscywgXCJpZFwiLCAkZXZlbnQudGFyZ2V0LnZhbHVlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwicFwiLCBbXG4gICAgICAgICAgICBfYyhcImxhYmVsXCIsIHsgYXR0cnM6IHsgZm9yOiBcInBhc3N3b3JkXCIgfSB9LCBbX3ZtLl92KFwiUGFzc3dvcmRcIildKSxcbiAgICAgICAgICAgIF9jKFwiYnJcIiksXG4gICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbW9kZWxcIixcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uY3JlZGVudGlhbHMucGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImNyZWRlbnRpYWxzLnBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwicGFzc3dvcmRcIiwgaWQ6IFwicGFzc3dvcmRcIiB9LFxuICAgICAgICAgICAgICBkb21Qcm9wczogeyB2YWx1ZTogX3ZtLmNyZWRlbnRpYWxzLnBhc3N3b3JkIH0sXG4gICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgaW5wdXQ6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgaWYgKCRldmVudC50YXJnZXQuY29tcG9zaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgX3ZtLiRzZXQoX3ZtLmNyZWRlbnRpYWxzLCBcInBhc3N3b3JkXCIsICRldmVudC50YXJnZXQudmFsdWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJwXCIsIFtcbiAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmNyZWRlbnRpYWxzLmtlZXAsXG4gICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImNyZWRlbnRpYWxzLmtlZXBcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgYXR0cnM6IHsgaWQ6IFwia2VlcFwiLCB0eXBlOiBcImNoZWNrYm94XCIgfSxcbiAgICAgICAgICAgICAgZG9tUHJvcHM6IHtcbiAgICAgICAgICAgICAgICBjaGVja2VkOiBBcnJheS5pc0FycmF5KF92bS5jcmVkZW50aWFscy5rZWVwKVxuICAgICAgICAgICAgICAgICAgPyBfdm0uX2koX3ZtLmNyZWRlbnRpYWxzLmtlZXAsIG51bGwpID4gLTFcbiAgICAgICAgICAgICAgICAgIDogX3ZtLmNyZWRlbnRpYWxzLmtlZXBcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgdmFyICQkYSA9IF92bS5jcmVkZW50aWFscy5rZWVwLFxuICAgICAgICAgICAgICAgICAgICAkJGVsID0gJGV2ZW50LnRhcmdldCxcbiAgICAgICAgICAgICAgICAgICAgJCRjID0gJCRlbC5jaGVja2VkID8gdHJ1ZSA6IGZhbHNlXG4gICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSgkJGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkJHYgPSBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICQkaSA9IF92bS5faSgkJGEsICQkdilcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQkZWwuY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICQkaSA8IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS4kc2V0KF92bS5jcmVkZW50aWFscywgXCJrZWVwXCIsICQkYS5jb25jYXQoWyQkdl0pKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICQkaSA+IC0xICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uJHNldChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmNyZWRlbnRpYWxzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImtlZXBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJCRhLnNsaWNlKDAsICQkaSkuY29uY2F0KCQkYS5zbGljZSgkJGkgKyAxKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLiRzZXQoX3ZtLmNyZWRlbnRpYWxzLCBcImtlZXBcIiwgJCRjKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgX2MoXCJsYWJlbFwiLCB7IGF0dHJzOiB7IGZvcjogXCJrZWVwXCIgfSB9LCBbXG4gICAgICAgICAgICAgIF92bS5fdihcIktlZXAgbWUgbG9nZ2VkIGluXCIpXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIF0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX3ZtLl9tKDApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJwXCIsIHsgc3RhdGljQ2xhc3M6IFwibXNnXCIgfSwgW192bS5fdihfdm0uX3MoX3ZtLm1zZykpXSlcbiAgICAgICAgXSlcbiAgICAgIF1cbiAgICApLFxuICAgIF92bS5fdihcIiBcIiksXG4gICAgX3ZtLmpzb24uYWZ0ZXIgIT09IHVuZGVmaW5lZFxuICAgICAgPyBfYyhcImRpdlwiLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6IFwibGVmdFwiLFxuICAgICAgICAgIGRvbVByb3BzOiB7IGlubmVySFRNTDogX3ZtLl9zKF92bS5qc29uLmFmdGVyKSB9XG4gICAgICAgIH0pXG4gICAgICA6IF92bS5fZSgpXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW1xuICBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3ZtID0gdGhpc1xuICAgIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICAgIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICAgIHJldHVybiBfYyhcInBcIiwgW19jKFwiaW5wdXRcIiwgeyBhdHRyczogeyB0eXBlOiBcInN1Ym1pdFwiLCB2YWx1ZTogXCJMb2dpblwiIH0gfSldKVxuICB9XG5dXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Jlc29sdmUtdXJsLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Mb2dpbi52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZsYW5nPXNjc3MmXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciBhZGQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikuZGVmYXVsdFxudmFyIHVwZGF0ZSA9IGFkZChcIjIwNjNmNDFhXCIsIGNvbnRlbnQsIGZhbHNlLCB7fSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Jlc29sdmUtdXJsLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Mb2dpbi52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZsYW5nPXNjc3MmXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVzb2x2ZS11cmwtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0xvZ2luLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmxhbmc9c2NzcyZcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsIi8qKlxyXG4gKiBCYXNpYyBWdWUtYmFzZWQgc2l0ZSBwYWdlIHN0YXJ0ZXJcclxuICpcclxuICogSG93IHRvIHVzZTpcclxuICogQGNvZGVcclxuICogc2l0ZS5yZWFkeSgoKSA9PiB7XHJcbiAqICAgIFBhZ2VWdWUuY3JlYXRlKCdkaXYuY2wtZ3JhZGUtYXNzaWdubWVudCcsICdBc3NpZ25tZW50IEdyYWRlJywgR3JhZGVBc3NpZ25tZW50VnVlKTtcclxuICogICAgUGFnZVZ1ZS5jcmVhdGUoJ2Rpdi5jbC1ncmFkZXMnLCAnR3JhZGVzJywgR3JhZGVzVnVlKTtcclxuICogfSk7XHJcbiAqIEBlbmRjb2RlXHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvciBQYWdlVnVlXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgUGFnZVZ1ZSA9IGZ1bmN0aW9uKCkge1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGEgcGFnZSBpbiBhIGdpdmVuIGNvbXBvbmVudCwgcmVwbGFjaW5nIHRoZSBwcm92aWRlZFxyXG4gKiBzZWxlY3Rvci4gVGhlIHNlbGVjdG9yIGlzIGFzc3VtZWQgdG8gY29udGFpbiBKU09OIGRhdGEgdGhhdCBpc1xyXG4gKiB0aGVuIHByb3ZpZGVkIHRvIHRoZSBjb21wb25lbnQgaW4gdGhlIGpzb24gcHJvcGVydHkuXHJcbiAqXHJcbiAqIEBwYXJhbSBzZWwgU2VsZWN0b3IgZm9yIGEgZGl2IHRvIHJlcGxhY2Ugd2l0aCB0aGUgdmlldy5cclxuICogQHBhcmFtIHRpdGxlIEluaXRpYWwgdGl0bGUgdG8gYXBwbHkgdG8gdGhlIHBhZ2VcclxuICogQHBhcmFtIGNvbXBvbmVudCBDb21wb25lbnQgdG8gZGlzcGxheSAoVnVlKVxyXG4gKiBAcGFyYW0gbmF2IE9wdGlvbmFsIG5hdmlnYXRpb24gY29tcG9uZW50LCBsaWtlIFBhZ2VOYXZcclxuICovXHJcblBhZ2VWdWUuY3JlYXRlID0gZnVuY3Rpb24oc2VsLCB0aXRsZSwgY29tcG9uZW50LCBuYXYpIHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbCk7XHJcbiAgICBpZihlbGVtZW50ID09PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBuYXZ0YWcgPSBuYXYgIT09IHVuZGVmaW5lZCA/ICc8cGFnZS1uYXYgOm1lbnU9XCJtZW51XCI+PC9wYWdlLW5hdj4nIDogJyc7XHJcbiAgICBsZXQgdGVtcGxhdGUgPSBgPGRpdj48c2l0ZS1oZWFkZXIgOnRpdGxlPVwidGl0bGVcIj4ke25hdnRhZ308L3NpdGUtaGVhZGVyPlxyXG48cGFnZS12dWUgOmpzb249XCJqc29uXCI+PC9wYWdlLXZ1ZT48c2l0ZS1mb290ZXI+PC9zaXRlLWZvb3Rlcj5cclxuPC9kaXY+YDtcclxuXHJcbiAgICBjb25zdCBIZWFkZXIgPSBTaXRlLmluZm8uaGVhZGVyLmNvbXBvbmVudCgpO1xyXG4gICAgY29uc3QgRm9vdGVyID0gU2l0ZS5pbmZvLmZvb3Rlci5jb21wb25lbnQoKTtcclxuXHJcbiAgICBjb25zdCBqc29uID0gSlNPTi5wYXJzZShlbGVtZW50LnRleHRDb250ZW50KTtcclxuXHJcbiAgICBjb25zdCBzdG9yZSA9IFNpdGUuc3RvcmU7XHJcblxyXG4gICAgY29uc3QgY29tcG9uZW50cyA9IHtcclxuICAgICAgICAgICAgJ3NpdGUtaGVhZGVyJzogSGVhZGVyLFxyXG4gICAgICAgICAgICAnc2l0ZS1mb290ZXInOiBGb290ZXIsXHJcbiAgICAgICAgICAgICdwYWdlLXZ1ZSc6IGNvbXBvbmVudFxyXG4gICAgICAgIH07XHJcbiAgICBpZihuYXYgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGNvbXBvbmVudHNbJ3BhZ2UtbmF2J10gPSBuYXY7XHJcbiAgICB9XHJcblxyXG4gICAgbmV3IFNpdGUuVnVlKHtcclxuICAgICAgICBlbDogZWxlbWVudCxcclxuICAgICAgICBzdG9yZSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgICAgICAganNvbjoganNvbixcclxuICAgICAgICAgICAgbWVudTogW11cclxuICAgICAgICB9LFxyXG4gICAgICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcclxuICAgICAgICBjb21wb25lbnRzOiBjb21wb25lbnRzLFxyXG4gICAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFNldCB0aGUgc2l0ZSB0aXRsZS4gVGhpcyBjYW4gYmUgdXNlZCBmcm9tXHJcbiAgICAgICAgICAgICAqIHRoZSBjaGlsZCBWdWUncyB1c2luZyB0aGlzLiRwYXJlbnQuc2V0VGl0bGUoJycpXHJcbiAgICAgICAgICAgICAqIEBtZW1iZXJvZiBQYWdlVnVlXHJcbiAgICAgICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGUgVGl0bGUgdG8gc2V0XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzZXRUaXRsZTogZnVuY3Rpb24odGl0bGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnRpdGxlID0gU2l0ZS5pbmZvLnNpdGVOYW1lICsgJyAnICsgdGl0bGU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldE1lbnU6IGZ1bmN0aW9uKG1lbnUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWVudSA9IG1lbnU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59IiwiaW1wb3J0IHtQYWdlVnVlfSBmcm9tICdzaXRlLWNsL2pzL1Z1ZS9QYWdlVnVlJztcclxuaW1wb3J0IExvZ2luVnVlIGZyb20gJy4vTG9naW4udnVlJztcclxuXHJcbmxldCBMb2dpbiA9IGZ1bmN0aW9uKCkge1xyXG5cclxufVxyXG5cclxuTG9naW4uc3RhcnQgPSBmdW5jdGlvbihzaXRlKSB7XHJcblxyXG4gICAgc2l0ZS5yZWFkeSgoKSA9PiB7XHJcbiAgICAgICAgUGFnZVZ1ZS5jcmVhdGUoJ2Rpdi5jbC1sb2dpbicsICdMb2dpbicsIExvZ2luVnVlKTtcclxuICAgIH0pXHJcblxyXG59XHJcblxyXG5Mb2dpbi5zdGFydChTaXRlLlNpdGUpO1xyXG4iLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL0xvZ2luLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0yMDkxZDFkMSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9Mb2dpbi52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0xvZ2luLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuaW1wb3J0IHN0eWxlMCBmcm9tIFwiLi9Mb2dpbi52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZsYW5nPXNjc3MmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXGNoYXJsXFxcXERvY3VtZW50c1xcXFxDbGFzc2VzXFxcXENTRTMzNVxcXFx3ZWItbmV3XFxcXG5vZGVfbW9kdWxlc1xcXFx2dWUtaG90LXJlbG9hZC1hcGlcXFxcZGlzdFxcXFxpbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCcyMDkxZDFkMScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCcyMDkxZDFkMScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vTG9naW4udnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTIwOTFkMWQxJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzIwOTFkMWQxJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJ2ZW5kb3IvY2wvdXNlcnMvanMvTG9naW4vTG9naW4udnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0yIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vTG9naW4udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Mb2dpbi52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVzb2x2ZS11cmwtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0xvZ2luLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmxhbmc9c2NzcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Jlc29sdmUtdXJsLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Mb2dpbi52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZsYW5nPXNjc3MmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vTG9naW4udnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTIwOTFkMWQxJlwiIl0sInNvdXJjZVJvb3QiOiIifQ==