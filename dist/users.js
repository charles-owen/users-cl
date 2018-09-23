(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Users"] = factory();
	else
		root["Users"] = factory();
})(window, function() {
return (window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([["Users"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************/
/*! exports provided: Fetcher, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Fetcher", function() { return Fetcher; });
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

/**
 * @file
 * Fetcher component displays "Fetching" and a "more" button.
 */

/**
 * Fetcher function used to update this object.
 * @constructor
 */
var Fetcher = function Fetcher() {
  this.more = false; // Indicates there is more to fetch

  this.fetching = false; // Set true while we are fetching

  this.fetched = false; // Set true when we have fetched something...

  this.start = function (single) {
    this.fetching = true;

    if (single !== true) {
      this.more = false;
    }
  };

  this.done = function (single) {
    this.fetching = false;

    if (single !== true) {
      this.fetched = true;
    }
  };

  this.reset = function () {
    this.more = false;
    this.fetching = false;
    this.fetched = false;
  };
};
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    fetcher: {
      type: Object,
      'default': null
    },
    fetching: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    'fetcher.fetching': function fetcherFetching(to, from) {
      this.setFetching();
    },
    fetching: function fetching(to, from) {
      this.setFetching();
    }
  },
  data: function data() {
    return {
      showFetching: false,
      delayedFetching: false,
      timer: null
    };
  },
  mounted: function mounted() {
    this.setFetching();
  },
  methods: {
    fetchMore: function fetchMore() {
      this.$parent.fetchMore();
    },
    setFetching: function setFetching() {
      var _this = this;

      // Are we currently fetching?
      var showFetching = this.fetcher !== null && this.fetcher.fetching || this.fetching;

      if (showFetching && !this.showFetching) {
        // Fetching is becoming active
        this.timer = setTimeout(function () {
          _this.delayedFetching = true;
        }, 1000);
      } else if (!showFetching && this.showFetching) {
        clearTimeout(this.timer);
        this.time = null;
        this.delayedFetching = false;
      }

      this.showFetching = showFetching;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Lib/UserSelectorVue.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./vendor/cl/users/js/Lib/UserSelectorVue.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
//
//
//
//
//
//
var LIMIT = 20;
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['selected'],
  data: function data() {
    return {
      query: '',
      result: [],
      noresult: false,
      seq: 1,
      fetched: false,
      timer: null,
      set: false,
      more: false,
      searcher: Site.root + '/vendor/cl/site/img/search.png',
      deleter: Site.root + '/vendor/cl/site/img/x.png'
    };
  },
  watch: {
    query: function query(after, before) {
      var _this = this;

      if (this.set) {
        this.set = false;
        return;
      }

      if (this.timer !== null) {
        clearTimeout(this.timer);
        this.timer = null;
      }

      ;
      this.timer = setTimeout(function () {
        _this.fetch(after);
      }, 300);
    }
  },
  methods: {
    fetch: function fetch(query) {
      var _this2 = this;

      console.log('fetch');
      console.log(query);

      if (this.timer !== null) {
        clearTimeout(this.timer);
        this.timer = null;
      }

      ;
      this.selected(null);
      query = query.trim();

      if (query.length < 2) {
        this.fetched = false;
        this.result = [];
        return;
      }

      this.seq++;
      Site.api.get('/api/users', {
        search: query,
        seq: this.seq,
        limit: LIMIT
      }).then(function (response) {
        if (!response.hasError()) {
          // This protects from out-of-order processing
          // of results from the server...
          var seq = response.getData('seq');

          if (+seq.id !== _this2.seq) {
            return;
          }

          var data = response.getData('users');

          if (data !== null) {
            _this2.result = [];
            _this2.more = false;
            data.attributes.forEach(function (userData) {
              if (userData.more !== 'yes') {
                var user = new Users.User(userData);

                _this2.result.push(user);
              } else {
                _this2.more = true;
              }
            });
            _this2.noresult = _this2.result.length === 0;
          }
        } else {
          Site.toast(_this2, response);
        }
      }).catch(function (error) {
        console.log(error);
        Site.toast(_this2, error);
      });
    },
    selectUser: function selectUser(user) {
      ;
      this.query = user.name;
      this.set = true;
      this.result = [];
      this.noresult = false;
      this.more = false;
      this.selected(user);
    },
    clear: function clear() {
      this.seq++; // Just in case

      this.result = [];
      this.noresult = false;
      this.more = false;
      this.query = '';
      this.selected(null);
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js?sourceMap!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader!./node_modules/sass-loader/lib/loader.js?sourceMap!./node_modules/vue-loader/lib??vue-loader-options!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\ndiv.fetching[data-v-43b26bcb] {\n  height: 28px;\n  margin: 1em 0;\n}\ndiv.fetching p[data-v-43b26bcb] {\n  text-align: center;\n  font-style: italic;\n  color: #c41425;\n  padding-top: 2px;\n}\n.more[data-v-43b26bcb] {\n  text-align: center;\n}\n.more button[data-v-43b26bcb] {\n  font-size: 0.8em;\n  height: 28px;\n  margin: 0;\n}\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js?sourceMap!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Lib/UserSelectorVue.vue?vue&type=style&index=0&id=e8e7f840&lang=scss&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader!./node_modules/sass-loader/lib/loader.js?sourceMap!./node_modules/vue-loader/lib??vue-loader-options!./vendor/cl/users/js/Lib/UserSelectorVue.vue?vue&type=style&index=0&id=e8e7f840&lang=scss&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\na.searcher[data-v-e8e7f840] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  height: 100%;\n  min-height: 100%;\n  width: 21px;\n  text-align: center;\n  background: #aaaaaa;\n}\na.searcher img[data-v-e8e7f840] {\n  height: 16px;\n  width: 16px;\n  vertical-align: -4px;\n}\ndiv.cl-input[data-v-e8e7f840] {\n  display: inline-block;\n  position: relative;\n  width: 300px;\n}\ndiv.cl-input input[data-v-e8e7f840] {\n  width: 100%;\n  border: 1px solid #cccccc;\n}\ndiv.cl-input div.cl-results[data-v-e8e7f840] {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 100%;\n  overflow: hidden;\n  font-size: 0.85em;\n  background: white;\n  border-left: 1px solid black;\n  border-right: 1px solid black;\n  border-bottom: 1px solid black;\n}\ndiv.cl-input div.cl-results div.cl-result-list[data-v-e8e7f840] {\n  display: table;\n  width: 100%;\n}\ndiv.cl-input div.cl-results div.cl-result-list div[data-v-e8e7f840] {\n  display: table-row;\n  border-bottom: 1px solid #888888;\n  cursor: pointer;\n}\ndiv.cl-input div.cl-results div.cl-result-list div span[data-v-e8e7f840] {\n  display: table-cell;\n  white-space: nowrap;\n  text-align: left;\n  padding: 0.5em 0.25em;\n}\ndiv.cl-input div.cl-results div.cl-result-list div span a[data-v-e8e7f840] {\n  text-decoration: none;\n  color: black;\n}\ndiv.cl-input div.cl-results div.cl-result-list div span a[data-v-e8e7f840]:hover {\n  color: #888888;\n}\ndiv.cl-input div.cl-results div.cl-result-list div span[data-v-e8e7f840]:first-child {\n  font-style: italic;\n}\ndiv.cl-input div.cl-results div.cl-result-list div span[data-v-e8e7f840]:last-child {\n  overflow: hidden;\n  width: 99%;\n}\ndiv.cl-input div.cl-results div.cl-result-list div:first-child span[data-v-e8e7f840],\ndiv.cl-input div.cl-results div.cl-result-list div:last-child span[data-v-e8e7f840] {\n  padding: 0.25em 0.25em;\n}\ndiv.cl-input div.cl-results div.statement[data-v-e8e7f840] {\n  width: 100%;\n  text-align: center;\n  font-style: italic;\n}\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=template&id=43b26bcb&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=template&id=43b26bcb&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************/
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
  return _c(
    "div",
    [
      _vm.delayedFetching
        ? _c("div", { staticClass: "fetching" }, [
            _c("p", [_vm._v("Fetching from server...")])
          ])
        : _vm._e(),
      _vm._v(" "),
      (_vm.fetcher === null || !_vm.fetcher.fetching) && !_vm.fetching
        ? _vm._t("default")
        : _vm._e(),
      _vm._v(" "),
      _vm.fetcher !== null && _vm.fetcher.more
        ? _c("p", { staticClass: "more" }, [
            _c(
              "button",
              {
                on: {
                  click: function($event) {
                    $event.preventDefault()
                    return _vm.fetchMore($event)
                  }
                }
              },
              [_vm._v("MORE")]
            )
          ])
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Lib/UserSelectorVue.vue?vue&type=template&id=e8e7f840&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./vendor/cl/users/js/Lib/UserSelectorVue.vue?vue&type=template&id=e8e7f840&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************/
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
  return _c("span", [
    _c("div", { staticClass: "cl-input" }, [
      _c("input", {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.query,
            expression: "query"
          }
        ],
        attrs: { type: "text", maxlength: "150" },
        domProps: { value: _vm.query },
        on: {
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.query = $event.target.value
          }
        }
      }),
      _vm._v(" "),
      _c(
        "a",
        {
          staticClass: "searcher",
          on: {
            click: function($event) {
              $event.preventDefault()
              _vm.fetch(_vm.query)
            }
          }
        },
        [_c("img", { attrs: { src: _vm.searcher } })]
      ),
      _vm._v(" "),
      _vm.result.length > 0 || _vm.noresult
        ? _c("div", { staticClass: "cl-results" }, [
            _c(
              "div",
              { staticClass: "cl-result-list" },
              _vm._l(_vm.result, function(user) {
                return _c(
                  "div",
                  {
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        _vm.selectUser(user)
                      }
                    }
                  },
                  [
                    _c("span", [
                      _c(
                        "a",
                        {
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              _vm.selectUser(user)
                            }
                          }
                        },
                        [_vm._v(_vm._s(user.userId))]
                      )
                    ]),
                    _vm._v(" "),
                    _c("span", [
                      _c(
                        "a",
                        {
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              _vm.selectUser(user)
                            }
                          }
                        },
                        [_vm._v(_vm._s(user.name))]
                      )
                    ])
                  ]
                )
              })
            ),
            _vm._v(" "),
            _vm.noresult
              ? _c("div", { staticClass: "statement" }, [
                  _vm._v("No results...")
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.more
              ? _c("div", { staticClass: "statement" }, [_vm._v("...more...")])
              : _vm._e()
          ])
        : _vm._e()
    ]),
    _vm._v(" "),
    _c(
      "a",
      {
        on: {
          click: function($event) {
            $event.preventDefault()
            return _vm.clear($event)
          }
        }
      },
      [_c("img", { attrs: { src: _vm.deleter } })]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js?sourceMap!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader!./node_modules/sass-loader/lib/loader.js?sourceMap!./node_modules/vue-loader/lib??vue-loader-options!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/resolve-url-loader!../../../../../node_modules/sass-loader/lib/loader.js?sourceMap!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js?sourceMap!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("451ec1a4", content, false, {});
// Hot Module Replacement
if(true) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/resolve-url-loader!../../../../../node_modules/sass-loader/lib/loader.js?sourceMap!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js?sourceMap!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true&", function() {
     var newContent = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/resolve-url-loader!../../../../../node_modules/sass-loader/lib/loader.js?sourceMap!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js?sourceMap!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true&");
     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js?sourceMap!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Lib/UserSelectorVue.vue?vue&type=style&index=0&id=e8e7f840&lang=scss&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader!./node_modules/sass-loader/lib/loader.js?sourceMap!./node_modules/vue-loader/lib??vue-loader-options!./vendor/cl/users/js/Lib/UserSelectorVue.vue?vue&type=style&index=0&id=e8e7f840&lang=scss&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/resolve-url-loader!../../../../../node_modules/sass-loader/lib/loader.js?sourceMap!../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserSelectorVue.vue?vue&type=style&index=0&id=e8e7f840&lang=scss&scoped=true& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js?sourceMap!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Lib/UserSelectorVue.vue?vue&type=style&index=0&id=e8e7f840&lang=scss&scoped=true&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("fdefe8da", content, false, {});
// Hot Module Replacement
if(true) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/resolve-url-loader!../../../../../node_modules/sass-loader/lib/loader.js?sourceMap!../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserSelectorVue.vue?vue&type=style&index=0&id=e8e7f840&lang=scss&scoped=true& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js?sourceMap!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Lib/UserSelectorVue.vue?vue&type=style&index=0&id=e8e7f840&lang=scss&scoped=true&", function() {
     var newContent = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/resolve-url-loader!../../../../../node_modules/sass-loader/lib/loader.js?sourceMap!../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserSelectorVue.vue?vue&type=style&index=0&id=e8e7f840&lang=scss&scoped=true& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js?sourceMap!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Lib/UserSelectorVue.vue?vue&type=style&index=0&id=e8e7f840&lang=scss&scoped=true&");
     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./vendor/cl/users/index.js":
/*!**********************************!*\
  !*** ./vendor/cl/users/index.js ***!
  \**********************************/
/*! exports provided: FetcherVue, UserSelectorVue, User, Users */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Users", function() { return Users; });
/* harmony import */ var _js_Users_UsersFactory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/Users/UsersFactory.js */ "./vendor/cl/users/js/Users/UsersFactory.js");
/* harmony import */ var _js_Lib_FetcherVue_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/Lib/FetcherVue.vue */ "./vendor/cl/users/js/Lib/FetcherVue.vue");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FetcherVue", function() { return _js_Lib_FetcherVue_vue__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _js_Lib_UserSelectorVue_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/Lib/UserSelectorVue.vue */ "./vendor/cl/users/js/Lib/UserSelectorVue.vue");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UserSelectorVue", function() { return _js_Lib_UserSelectorVue_vue__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _js_Users_User_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/Users/User.js */ "./vendor/cl/users/js/Users/User.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "User", function() { return _js_Users_User_js__WEBPACK_IMPORTED_MODULE_3__["User"]; });

/**
 * @file
 * The main users.js entry point.
 *
 * Does not include console components.
 */







var Users = _js_Users_UsersFactory_js__WEBPACK_IMPORTED_MODULE_0__["UsersFactory"].create(Site.Site);


/***/ }),

/***/ "./vendor/cl/users/js/Lib/FetcherVue.vue":
/*!***********************************************!*\
  !*** ./vendor/cl/users/js/Lib/FetcherVue.vue ***!
  \***********************************************/
/*! exports provided: default, Fetcher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FetcherVue_vue_vue_type_template_id_43b26bcb_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FetcherVue.vue?vue&type=template&id=43b26bcb&scoped=true& */ "./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=template&id=43b26bcb&scoped=true&");
/* harmony import */ var _FetcherVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FetcherVue.vue?vue&type=script&lang=js& */ "./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=script&lang=js&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Fetcher", function() { return _FetcherVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["Fetcher"]; });

/* harmony import */ var _FetcherVue_vue_vue_type_style_index_0_id_43b26bcb_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true& */ "./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _FetcherVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FetcherVue_vue_vue_type_template_id_43b26bcb_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FetcherVue_vue_vue_type_template_id_43b26bcb_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "43b26bcb",
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__(/*! ./node_modules/vue-hot-reload-api/dist/index.js */ "./node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('43b26bcb', component.options)
    } else {
      api.reload('43b26bcb', component.options)
    }
    module.hot.accept(/*! ./FetcherVue.vue?vue&type=template&id=43b26bcb&scoped=true& */ "./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=template&id=43b26bcb&scoped=true&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _FetcherVue_vue_vue_type_template_id_43b26bcb_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FetcherVue.vue?vue&type=template&id=43b26bcb&scoped=true& */ "./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=template&id=43b26bcb&scoped=true&");
(function () {
      api.rerender('43b26bcb', {
        render: _FetcherVue_vue_vue_type_template_id_43b26bcb_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _FetcherVue_vue_vue_type_template_id_43b26bcb_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); })
  }
}
component.options.__file = "vendor/cl/users/js/Lib/FetcherVue.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default, Fetcher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FetcherVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FetcherVue.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=script&lang=js&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Fetcher", function() { return _node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FetcherVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["Fetcher"]; });

 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FetcherVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true&":
/*!*********************************************************************************************************!*\
  !*** ./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true& ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_lib_loader_js_sourceMap_node_modules_vue_loader_lib_index_js_vue_loader_options_FetcherVue_vue_vue_type_style_index_0_id_43b26bcb_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/resolve-url-loader!../../../../../node_modules/sass-loader/lib/loader.js?sourceMap!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js?sourceMap!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_lib_loader_js_sourceMap_node_modules_vue_loader_lib_index_js_vue_loader_options_FetcherVue_vue_vue_type_style_index_0_id_43b26bcb_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_lib_loader_js_sourceMap_node_modules_vue_loader_lib_index_js_vue_loader_options_FetcherVue_vue_vue_type_style_index_0_id_43b26bcb_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_lib_loader_js_sourceMap_node_modules_vue_loader_lib_index_js_vue_loader_options_FetcherVue_vue_vue_type_style_index_0_id_43b26bcb_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_lib_loader_js_sourceMap_node_modules_vue_loader_lib_index_js_vue_loader_options_FetcherVue_vue_vue_type_style_index_0_id_43b26bcb_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_lib_loader_js_sourceMap_node_modules_vue_loader_lib_index_js_vue_loader_options_FetcherVue_vue_vue_type_style_index_0_id_43b26bcb_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=template&id=43b26bcb&scoped=true&":
/*!******************************************************************************************!*\
  !*** ./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=template&id=43b26bcb&scoped=true& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FetcherVue_vue_vue_type_template_id_43b26bcb_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FetcherVue.vue?vue&type=template&id=43b26bcb&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=template&id=43b26bcb&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FetcherVue_vue_vue_type_template_id_43b26bcb_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FetcherVue_vue_vue_type_template_id_43b26bcb_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./vendor/cl/users/js/Lib/UserSelectorVue.vue":
/*!****************************************************!*\
  !*** ./vendor/cl/users/js/Lib/UserSelectorVue.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserSelectorVue_vue_vue_type_template_id_e8e7f840_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserSelectorVue.vue?vue&type=template&id=e8e7f840&scoped=true& */ "./vendor/cl/users/js/Lib/UserSelectorVue.vue?vue&type=template&id=e8e7f840&scoped=true&");
/* harmony import */ var _UserSelectorVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserSelectorVue.vue?vue&type=script&lang=js& */ "./vendor/cl/users/js/Lib/UserSelectorVue.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _UserSelectorVue_vue_vue_type_style_index_0_id_e8e7f840_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserSelectorVue.vue?vue&type=style&index=0&id=e8e7f840&lang=scss&scoped=true& */ "./vendor/cl/users/js/Lib/UserSelectorVue.vue?vue&type=style&index=0&id=e8e7f840&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _UserSelectorVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserSelectorVue_vue_vue_type_template_id_e8e7f840_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UserSelectorVue_vue_vue_type_template_id_e8e7f840_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "e8e7f840",
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__(/*! ./node_modules/vue-hot-reload-api/dist/index.js */ "./node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('e8e7f840', component.options)
    } else {
      api.reload('e8e7f840', component.options)
    }
    module.hot.accept(/*! ./UserSelectorVue.vue?vue&type=template&id=e8e7f840&scoped=true& */ "./vendor/cl/users/js/Lib/UserSelectorVue.vue?vue&type=template&id=e8e7f840&scoped=true&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _UserSelectorVue_vue_vue_type_template_id_e8e7f840_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserSelectorVue.vue?vue&type=template&id=e8e7f840&scoped=true& */ "./vendor/cl/users/js/Lib/UserSelectorVue.vue?vue&type=template&id=e8e7f840&scoped=true&");
(function () {
      api.rerender('e8e7f840', {
        render: _UserSelectorVue_vue_vue_type_template_id_e8e7f840_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _UserSelectorVue_vue_vue_type_template_id_e8e7f840_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); })
  }
}
component.options.__file = "vendor/cl/users/js/Lib/UserSelectorVue.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./vendor/cl/users/js/Lib/UserSelectorVue.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./vendor/cl/users/js/Lib/UserSelectorVue.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSelectorVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserSelectorVue.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Lib/UserSelectorVue.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSelectorVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./vendor/cl/users/js/Lib/UserSelectorVue.vue?vue&type=style&index=0&id=e8e7f840&lang=scss&scoped=true&":
/*!**************************************************************************************************************!*\
  !*** ./vendor/cl/users/js/Lib/UserSelectorVue.vue?vue&type=style&index=0&id=e8e7f840&lang=scss&scoped=true& ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_lib_loader_js_sourceMap_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSelectorVue_vue_vue_type_style_index_0_id_e8e7f840_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/resolve-url-loader!../../../../../node_modules/sass-loader/lib/loader.js?sourceMap!../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserSelectorVue.vue?vue&type=style&index=0&id=e8e7f840&lang=scss&scoped=true& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js?sourceMap!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Lib/UserSelectorVue.vue?vue&type=style&index=0&id=e8e7f840&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_lib_loader_js_sourceMap_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSelectorVue_vue_vue_type_style_index_0_id_e8e7f840_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_lib_loader_js_sourceMap_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSelectorVue_vue_vue_type_style_index_0_id_e8e7f840_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_lib_loader_js_sourceMap_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSelectorVue_vue_vue_type_style_index_0_id_e8e7f840_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_lib_loader_js_sourceMap_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSelectorVue_vue_vue_type_style_index_0_id_e8e7f840_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_lib_loader_js_sourceMap_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSelectorVue_vue_vue_type_style_index_0_id_e8e7f840_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./vendor/cl/users/js/Lib/UserSelectorVue.vue?vue&type=template&id=e8e7f840&scoped=true&":
/*!***********************************************************************************************!*\
  !*** ./vendor/cl/users/js/Lib/UserSelectorVue.vue?vue&type=template&id=e8e7f840&scoped=true& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSelectorVue_vue_vue_type_template_id_e8e7f840_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserSelectorVue.vue?vue&type=template&id=e8e7f840&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Lib/UserSelectorVue.vue?vue&type=template&id=e8e7f840&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSelectorVue_vue_vue_type_template_id_e8e7f840_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserSelectorVue_vue_vue_type_template_id_e8e7f840_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./vendor/cl/users/js/StoreModuleUsers.js":
/*!************************************************!*\
  !*** ./vendor/cl/users/js/StoreModuleUsers.js ***!
  \************************************************/
/*! exports provided: StoreModuleUsers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StoreModuleUsers", function() { return StoreModuleUsers; });
/* harmony import */ var _Lib_FetcherVue_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Lib/FetcherVue.vue */ "./vendor/cl/users/js/Lib/FetcherVue.vue");
/* harmony import */ var _Users_User_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Users/User.js */ "./vendor/cl/users/js/Users/User.js");
/**
 * @file
 * Vuex store module that maintains a collection of system users.
 */


var LIMIT = 500;
var StoreModuleUsers = function StoreModuleUsers() {};
/**
 * Create a Vuex store module to store users.
 *
 * This will work for both Users and course Members, since they
 * use the same API.
 * @param api '/api/users' for '/api/course/members'
 * @param query Items to add to the query (semester and section for members).
 * @param toId Mapping from a user to the ID to use for the collection.
 * @returns {*}
 */

StoreModuleUsers.create = function (api, toId) {
  return {
    namespaced: true,
    state: {
      users: [],
      fetcher: new _Lib_FetcherVue_vue__WEBPACK_IMPORTED_MODULE_0__["Fetcher"](),
      // Indicates the fetching status
      query: {}
    },
    mutations: {
      add: function add(state, user) {
        state.users.push(user);
      },
      more: function more(state, value) {
        state.fetcher.more = value;
      },
      fetchStart: function fetchStart(state, value) {
        state.fetcher.start(value);
      },
      fetchDone: function fetchDone(state, value) {
        state.fetcher.done(value);
      },
      reset: function reset(state, value) {
        state.fetcher.reset();
        state.users = [];
      },
      query: function query(state, value) {
        state.query = value;
      },
      update: function update(state, user) {
        // If nothing is fetched, nothing need be updated
        if (!state.fetcher.fetched) {
          return;
        } // If the list is empty, we force a reload from the server


        if (state.users.length === 0) {
          state.fetcher.reset();
          state.users = [];
          return;
        } // Does the user exist right now?


        var i = 0;

        for (; i < state.users.length; i++) {
          if (toId(user) === toId(state.users[i])) {
            // We have found it, swap it in
            state.users[i] = user;

            if (state.fetcher.more) {
              // Since the name may have changed, the position in the
              // list could also change.
              if (_Users_User_js__WEBPACK_IMPORTED_MODULE_1__["User"].compare(user, state.users[state.users.length - 1]) >= 0) {
                // Probably off the end, force a reload
                state.fetcher.reset();
                state.users = [];
                return;
              }
            }

            state.users.sort(_Users_User_js__WEBPACK_IMPORTED_MODULE_1__["User"].compare);
            return;
          }
        } // If we did not find the user, it must still
        // be waiting to be fetched from the server.


        state.fetcher.more = true;
      },
      new: function _new(state, user) {
        // If nothing is fetched, nothing need be updated
        if (!state.fetcher.fetched) {
          return;
        } // If the list is empty, we are the one!


        if (state.users.length === 0) {
          state.users.push(user);
          return;
        }

        if (!state.fetcher.more) {
          // We have it all, so we can append, sort, and we are done
          state.users.push(user);
          state.users.sort(_Users_User_js__WEBPACK_IMPORTED_MODULE_1__["User"].compare);
          return;
        }

        if (_Users_User_js__WEBPACK_IMPORTED_MODULE_1__["User"].compare(user, state.users[state.users.length - 1]) >= 0) {
          // Probably off the end, force a reload
          state.fetcher.reset();
          state.users = [];
          return;
        }

        state.users.push(user);
        state.users.sort(_Users_User_js__WEBPACK_IMPORTED_MODULE_1__["User"].compare);
      },
      delete: function _delete(state, id) {
        for (var i = 0; i < state.users.length; i++) {
          if (toId(state.users[i]) === id) {
            state.users.splice(i, 1);
            break;
          }
        }
      }
    },
    actions: {
      // Initial fetch from API
      fetch: function fetch(_ref) {
        var dispatch = _ref.dispatch,
            state = _ref.state;

        if (state.fetcher.fetched) {
          return;
        }

        dispatch('more');
      },
      // Fetch more
      more: function more(_ref2) {
        var _this = this;

        var commit = _ref2.commit,
            state = _ref2.state;

        if (state.fetcher.fetched && !state.fetcher.more) {
          return;
        }

        commit('fetchStart');
        var q = {
          limit: LIMIT,
          offset: state.users.length
        };
        Object.assign(q, state.query);
        Site.api.get(api, q).then(function (response) {
          if (!response.hasError()) {
            var data = response.getData('users');

            if (data !== null) {
              var more = false;
              data.attributes.forEach(function (userObj) {
                if (userObj.more === 'yes') {
                  more = true;
                } else {
                  commit('add', new Users.User(userObj));
                }
              });
              commit('more', more);
              commit('fetchDone');
            }
          } else {
            console.log(response);
            Site.toast(_this, response);
          }
        }).catch(function (error) {
          console.log(error);
          Site.toast(_this, error);
        });
      },
      get: function get(_ref3, query) {
        var _this2 = this;

        var commit = _ref3.commit,
            state = _ref3.state;
        return new Promise(function (resolve, reject) {
          // // We may have the desired user loaded or we
          // // may have to go get them.
          // let prev = null;
          // for(let i=0; i<state.users.length; i++) {
          //     let user = state.users[i];
          //     if(toId(user) === id) {
          //         if((i+1) < state.users.length) {
          //             user.next = state.users[i+1];
          //         }
          //
          //         if(prev !== null) {
          //             user.prev = prev;
          //         }
          //
          //         resolve(user);
          //         return;
          //     }
          //
          //     prev = user;
          // }
          // Go get the user
          commit('fetchStart', true);
          query.prevnext = 1;
          Site.api.get(api, query).then(function (response) {
            if (!response.hasError()) {
              var data = response.getData('users');

              if (data !== null) {
                if (data.attributes.length < 1) {
                  reject('User does not exist');
                } else {
                  commit('fetchDone', true);
                  var user = new Users.User(data.attributes[0]);
                  var prev = response.getData('prev-user');

                  if (prev !== null) {
                    user.prev = new Users.User(prev.attributes);
                  }

                  var next = response.getData('next-user');

                  if (next !== null) {
                    user.next = new Users.User(next.attributes);
                  }

                  resolve(user);
                }
              }
            } else {
              console.log(response);
              Site.toast(_this2, response);
            }
          }).catch(function (error) {
            console.log(error);
            Site.toast(_this2, error);
          });
        });
      },
      update: function update(_ref4, payload) {
        var _this3 = this;

        var commit = _ref4.commit,
            state = _ref4.state;
        return new Promise(function (resolve, reject) {
          Site.api.post(api + '/update', payload).then(function (response) {
            if (!response.hasError()) {
              var data = response.getData('updated-user');
              var user = new Users.User(data.attributes); // Update user if we have it stored locally
              // and the name has not changed

              commit('update', user);
              resolve(user);
            } else {
              reject(response);
            }
          }).catch(function (error) {
            Site.toast(_this3, error);
          });
        });
      },
      new: function _new(_ref5, payload) {
        var _this4 = this;

        var commit = _ref5.commit,
            state = _ref5.state;
        return new Promise(function (resolve, reject) {
          Site.api.post(api + '/new', payload).then(function (response) {
            if (!response.hasError()) {
              var data = response.getData('new-user');
              var user = new Users.User(data.attributes);
              commit('new', user);
              resolve(user);
            } else {
              console.log('reject');
              reject(response);
            }
          }).catch(function (error) {
            Site.toast(_this4, error);
          });
        });
      },
      delete: function _delete(_ref6, payload) {
        var _this5 = this;

        var commit = _ref6.commit,
            state = _ref6.state;
        return new Promise(function (resolve, reject) {
          Site.api.post(api + '/delete', {
            id: payload.id
          }).then(function (response) {
            if (!response.hasError()) {
              commit('delete', payload.id);
              resolve();
            } else {
              console.log(response);
              Site.toast(_this5, response);
            }
          }).catch(function (error) {
            console.log(error);
            Site.toast(_this5, error);
          });
        });
      }
    }
  };
};

/***/ }),

/***/ "./vendor/cl/users/js/Users/Permissions.js":
/*!*************************************************!*\
  !*** ./vendor/cl/users/js/Users/Permissions.js ***!
  \*************************************************/
/*! exports provided: Permissions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Permissions", function() { return Permissions; });
/**
 * @file
 * Permissions management component
 */
var Permissions = function Permissions(data) {
  this.permissions = data;
  /**
   * Determine the atLeast permission for a given
   * configurable permission.
   * @param tag Tag that defines the permission configuration
   * @param def Default value if permission not set
   * @returns {*}
   */

  this.atLeast = function (tag, def) {
    if (this.permissions[tag] !== undefined) {
      return this.permissions[tag];
    }

    return def;
  };
};

/***/ }),

/***/ "./vendor/cl/users/js/Users/StoreModuleUser.js":
/*!*****************************************************!*\
  !*** ./vendor/cl/users/js/Users/StoreModuleUser.js ***!
  \*****************************************************/
/*! exports provided: StoreModuleUser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StoreModuleUser", function() { return StoreModuleUser; });
/* harmony import */ var _User_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./User.js */ "./vendor/cl/users/js/Users/User.js");
/**
 * @file
 * The Vuex store module that maintains the current system user.
 */

var StoreModuleUser = {
  namespaced: true,
  state: {
    user: null
  },
  mutations: {
    set: function set(state, user) {
      if (user instanceof _User_js__WEBPACK_IMPORTED_MODULE_0__["User"]) {
        state.user = user;
      } else {
        state.user = new _User_js__WEBPACK_IMPORTED_MODULE_0__["User"](user);
      }
    }
  }
};

/***/ }),

/***/ "./vendor/cl/users/js/Users/User.js":
/*!******************************************!*\
  !*** ./vendor/cl/users/js/Users/User.js ***!
  \******************************************/
/*! exports provided: default, User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
/**
 * @file
 * Represents a user in the system
 */
var User = function User(json) {
  /// The user role - local so we can protect it with getter/setter
  var role = 'G'; // Installed membership

  var member = null;

  if (json !== undefined) {
    if (typeof json === 'string') {
      json = JSON.parse(json);
    }

    this.id = json.id;
    role = json.role;
    this.name = json.name;
    this.email = json.email;
    this.userId = json.user; // Installed membership

    member = User.instantiateMember(json);

    if (member !== null) {
      member.user = this;
    }
  } else {
    this.id = 0;
    role = 'G';
    this.name = '';
    this.email = '';
    this.userId = '';
  }

  Object.defineProperty(this, 'member', {
    get: function get() {
      return member;
    }
  });
  /**
   * Return the effective role for the user.
   * This is the user's role unless the user
   * has a membership, in which case it is the
   * membership role.
   *
   * @returns {string}
   */

  this.role = function () {
    if (member !== null) {
      return member.role();
    }

    return role;
  };

  this.setUserRole = function (_role) {
    role = _role;
  };

  this.userRole = function () {
    return role;
  };
  /**
   * Set the membership for this user
   * @param Membership member
   */


  this.setMember = function (_member) {
    member = _member;

    if (member !== null) {
      member.user = this;
    }
  };
};

User.GUEST = 'G';
User.USER = 'U';
User.STAFF = 'S';
User.ADMIN = 'A';

User.getUserRoles = function () {
  var roles = {};
  roles[User.GUEST] = {
    name: 'Guest',
    priority: 1
  };
  roles[User.USER] = {
    name: 'User',
    priority: 2
  };
  roles[User.STAFF] = {
    name: 'Staff',
    priority: 3
  };
  roles[User.ADMIN] = {
    name: 'Admin',
    priority: 4
  };
  return roles;
};

User.prototype.getUserRoles = function () {
  return User.getUserRoles();
};
/**
 * Get the roles for this user. Membership roles take priority
 * over roles for just a user who is not a member.
 */


User.prototype.getRoles = function () {
  var member = this.member;

  if (member !== null) {
    return member.getRoles();
  }

  return User.getUserRoles();
};

User.prototype.atLeast = function (atLeast) {
  var role = this.role();
  var roles = this.getRoles();

  if (roles.hasOwnProperty(atLeast)) {
    return roles[role].priority >= roles[atLeast].priority;
  } else {
    return false;
  }
};

User.prototype.getRolePriority = function (role) {
  var roles = this.getRoles();

  if (roles.hasOwnProperty(role)) {
    return roles[role].priority;
  }

  return 0;
};

User.prototype.displayName = function () {
  var comma = this.name.indexOf(',');

  if (comma < 0) {
    return this.name;
  }

  var last = this.name.substr(0, comma);
  var first = this.name.substr(comma + 1).trim();
  return first + ' ' + last;
};

User.prototype.userRoleName = function () {
  var roles = this.getUserRoles();
  var role = this.userRole();
  return roles[role].name;
};

User.prototype.roleName = function () {
  var roles = this.getRoles();
  var role = this.role();
  return roles[role].name;
};

User.compare = function (a, b) {
  var an = a.name.toLowerCase();
  var bn = b.name.toLowerCase();

  if (an < bn) {
    return -1;
  }

  if (an > bn) {
    return 1;
  }

  return a.id - b.id;
};
/**
 * Instantiate a Membership object for the user.
 * This will be replaced by a plugin that adds
 * support for memberships.
 * @param data normally in the format the PHP JSON representation
 * @returns {null}
 */


User.instantiateMember = function (data) {
  return null;
};

/* harmony default export */ __webpack_exports__["default"] = (User);


/***/ }),

/***/ "./vendor/cl/users/js/Users/UsersFactory.js":
/*!**************************************************!*\
  !*** ./vendor/cl/users/js/Users/UsersFactory.js ***!
  \**************************************************/
/*! exports provided: UsersFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersFactory", function() { return UsersFactory; });
/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./User */ "./vendor/cl/users/js/Users/User.js");
/* harmony import */ var _StoreModuleUser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StoreModuleUser */ "./vendor/cl/users/js/Users/StoreModuleUser.js");
/* harmony import */ var _StoreModuleUsers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../StoreModuleUsers */ "./vendor/cl/users/js/StoreModuleUsers.js");
/* harmony import */ var _Permissions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Permissions */ "./vendor/cl/users/js/Users/Permissions.js");
/**
 * @file
 * Factory that creates the Users object
 */





var UsersFactory = function UsersFactory() {};

console.log("UsersFactory loaded");
/**
 * Factory method to create a Users object.
 *
 * This allows for injection of the store for testing purposes.
 * @param store Vuex store object
 * @returns {Users} object.
 */

UsersFactory.create = function (site) {
  var Users = function Users() {}; //
  // Exported components and constants
  //


  Users.MUST_PROVIDE_USERID_OR_EMAIL = 101;
  Users.PASSWORDS_MUST_MATCH = 102;
  Users.DUPLICATE_USER = 103;
  Users.DUPLICATE_EMAIL = 104; //
  // Install the users store modules
  //

  var store = site.store;

  if (store !== undefined) {
    store.registerModule('user', _StoreModuleUser__WEBPACK_IMPORTED_MODULE_1__["StoreModuleUser"]);
    store.registerModule('users', _StoreModuleUsers__WEBPACK_IMPORTED_MODULE_2__["StoreModuleUsers"].create('/api/users', function (user) {
      return user.id;
    }));
  }

  site.ready(function () {
    //
    // Detect the passed in user information
    // and add it to the store.
    //
    var en;

    if ((en = document.getElementById('cl-user')) !== null) {
      store.commit('user/set', JSON.parse(en.textContent));
    } // Add permissions array if available


    if ((en = document.getElementById('cl-permissions')) !== null) {
      site.permissions = new _Permissions__WEBPACK_IMPORTED_MODULE_3__["Permissions"](JSON.parse(en.textContent));
    }
  });
  return Users;
};



/***/ })

},[["./vendor/cl/users/index.js","runtime","vendor"]]]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9bbmFtZV0vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL1tuYW1lXS92ZW5kb3IvY2wvdXNlcnMvanMvTGliL0ZldGNoZXJWdWUudnVlIiwid2VicGFjazovL1tuYW1lXS92ZW5kb3IvY2wvdXNlcnMvanMvTGliL1VzZXJTZWxlY3RvclZ1ZS52dWUiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3VzZXJzL2pzL0xpYi9GZXRjaGVyVnVlLnZ1ZT84ZTgwIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC91c2Vycy9qcy9MaWIvVXNlclNlbGVjdG9yVnVlLnZ1ZT9lZTNhIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC91c2Vycy9qcy9MaWIvRmV0Y2hlclZ1ZS52dWU/ZTcyNSIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvdXNlcnMvanMvTGliL1VzZXJTZWxlY3RvclZ1ZS52dWU/ZDUzMyIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvdXNlcnMvanMvTGliL0ZldGNoZXJWdWUudnVlPzdhMDAiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3VzZXJzL2pzL0xpYi9Vc2VyU2VsZWN0b3JWdWUudnVlPzU4ZGEiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3VzZXJzL2luZGV4LmpzIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC91c2Vycy9qcy9MaWIvRmV0Y2hlclZ1ZS52dWUiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3VzZXJzL2pzL0xpYi9GZXRjaGVyVnVlLnZ1ZT83MjY4Iiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC91c2Vycy9qcy9MaWIvRmV0Y2hlclZ1ZS52dWU/NDk3YiIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvdXNlcnMvanMvTGliL0ZldGNoZXJWdWUudnVlPzJmMTIiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3VzZXJzL2pzL0xpYi9Vc2VyU2VsZWN0b3JWdWUudnVlIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC91c2Vycy9qcy9MaWIvVXNlclNlbGVjdG9yVnVlLnZ1ZT85MmZkIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC91c2Vycy9qcy9MaWIvVXNlclNlbGVjdG9yVnVlLnZ1ZT9mODBjIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC91c2Vycy9qcy9MaWIvVXNlclNlbGVjdG9yVnVlLnZ1ZT8wOTk3Iiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC91c2Vycy9qcy9TdG9yZU1vZHVsZVVzZXJzLmpzIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC91c2Vycy9qcy9Vc2Vycy9QZXJtaXNzaW9ucy5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvdXNlcnMvanMvVXNlcnMvU3RvcmVNb2R1bGVVc2VyLmpzIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC91c2Vycy9qcy9Vc2Vycy9Vc2VyLmpzIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC91c2Vycy9qcy9Vc2Vycy9Vc2Vyc0ZhY3RvcnkuanMiXSwibmFtZXMiOlsiVXNlcnMiLCJjcmVhdGUiLCJTaXRlIiwiTElNSVQiLCJTdG9yZU1vZHVsZVVzZXJzIiwiYXBpIiwidG9JZCIsIm5hbWVzcGFjZWQiLCJzdGF0ZSIsInVzZXJzIiwiZmV0Y2hlciIsInF1ZXJ5IiwibXV0YXRpb25zIiwiYWRkIiwidXNlciIsInB1c2giLCJtb3JlIiwidmFsdWUiLCJmZXRjaFN0YXJ0Iiwic3RhcnQiLCJmZXRjaERvbmUiLCJkb25lIiwicmVzZXQiLCJ1cGRhdGUiLCJmZXRjaGVkIiwibGVuZ3RoIiwiaSIsImNvbXBhcmUiLCJzb3J0IiwibmV3IiwiZGVsZXRlIiwiaWQiLCJzcGxpY2UiLCJhY3Rpb25zIiwiZmV0Y2giLCJkaXNwYXRjaCIsImNvbW1pdCIsInEiLCJsaW1pdCIsIm9mZnNldCIsIk9iamVjdCIsImFzc2lnbiIsImdldCIsInRoZW4iLCJyZXNwb25zZSIsImhhc0Vycm9yIiwiZGF0YSIsImdldERhdGEiLCJhdHRyaWJ1dGVzIiwiZm9yRWFjaCIsInVzZXJPYmoiLCJVc2VyIiwiY29uc29sZSIsImxvZyIsInRvYXN0IiwiY2F0Y2giLCJlcnJvciIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicHJldm5leHQiLCJwcmV2IiwibmV4dCIsInBheWxvYWQiLCJwb3N0IiwiUGVybWlzc2lvbnMiLCJwZXJtaXNzaW9ucyIsImF0TGVhc3QiLCJ0YWciLCJkZWYiLCJ1bmRlZmluZWQiLCJTdG9yZU1vZHVsZVVzZXIiLCJzZXQiLCJqc29uIiwicm9sZSIsIm1lbWJlciIsIkpTT04iLCJwYXJzZSIsIm5hbWUiLCJlbWFpbCIsInVzZXJJZCIsImluc3RhbnRpYXRlTWVtYmVyIiwiZGVmaW5lUHJvcGVydHkiLCJzZXRVc2VyUm9sZSIsIl9yb2xlIiwidXNlclJvbGUiLCJzZXRNZW1iZXIiLCJfbWVtYmVyIiwiR1VFU1QiLCJVU0VSIiwiU1RBRkYiLCJBRE1JTiIsImdldFVzZXJSb2xlcyIsInJvbGVzIiwicHJpb3JpdHkiLCJwcm90b3R5cGUiLCJnZXRSb2xlcyIsImhhc093blByb3BlcnR5IiwiZ2V0Um9sZVByaW9yaXR5IiwiZGlzcGxheU5hbWUiLCJjb21tYSIsImluZGV4T2YiLCJsYXN0Iiwic3Vic3RyIiwiZmlyc3QiLCJ0cmltIiwidXNlclJvbGVOYW1lIiwicm9sZU5hbWUiLCJhIiwiYiIsImFuIiwidG9Mb3dlckNhc2UiLCJibiIsIlVzZXJzRmFjdG9yeSIsInNpdGUiLCJNVVNUX1BST1ZJREVfVVNFUklEX09SX0VNQUlMIiwiUEFTU1dPUkRTX01VU1RfTUFUQ0giLCJEVVBMSUNBVEVfVVNFUiIsIkRVUExJQ0FURV9FTUFJTCIsInN0b3JlIiwicmVnaXN0ZXJNb2R1bGUiLCJyZWFkeSIsImVuIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIs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aEQsV0FBTCxHQUFtQixJQUFJLHdEQUFKLENBQWdCVSxJQUFJLENBQUNDLEtBQUwsQ0FBVzZDLEVBQUUsQ0FBQ0csV0FBZCxDQUFoQixDQUFuQjtBQUNBO0FBQ0QsR0FkRDtBQWdCQSxTQUFPN0gsS0FBUDtBQUNILENBNUNEIiwiZmlsZSI6InVzZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiVXNlcnNcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiVXNlcnNcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cImZldGNoaW5nXCIgdi1pZj1cImRlbGF5ZWRGZXRjaGluZ1wiPlxyXG4gICAgICA8cD5GZXRjaGluZyBmcm9tIHNlcnZlci4uLjwvcD5cclxuICAgIDwvZGl2PlxyXG4gICAgPHNsb3Qgdi1pZj1cIihmZXRjaGVyID09PSBudWxsIHx8ICFmZXRjaGVyLmZldGNoaW5nKSAmJiAhZmV0Y2hpbmdcIj48L3Nsb3Q+XHJcbiAgICA8cCBjbGFzcz1cIm1vcmVcIiB2LWlmPVwiZmV0Y2hlciAhPT0gbnVsbCAmJiBmZXRjaGVyLm1vcmVcIj48YnV0dG9uIEBjbGljay5wcmV2ZW50PVwiZmV0Y2hNb3JlXCI+TU9SRTwvYnV0dG9uPjwvcD5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbiAgLyoqXHJcbiAgICogQGZpbGVcclxuICAgKiBGZXRjaGVyIGNvbXBvbmVudCBkaXNwbGF5cyBcIkZldGNoaW5nXCIgYW5kIGEgXCJtb3JlXCIgYnV0dG9uLlxyXG4gICAqL1xyXG5cclxuICAvKipcclxuICAgKiBGZXRjaGVyIGZ1bmN0aW9uIHVzZWQgdG8gdXBkYXRlIHRoaXMgb2JqZWN0LlxyXG4gICAqIEBjb25zdHJ1Y3RvclxyXG4gICAqL1xyXG4gIGV4cG9ydCBsZXQgRmV0Y2hlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB0aGlzLm1vcmUgPSBmYWxzZTsgICAgICAgLy8gSW5kaWNhdGVzIHRoZXJlIGlzIG1vcmUgdG8gZmV0Y2hcclxuICAgICAgdGhpcy5mZXRjaGluZyA9IGZhbHNlOyAgLy8gU2V0IHRydWUgd2hpbGUgd2UgYXJlIGZldGNoaW5nXHJcbiAgICAgIHRoaXMuZmV0Y2hlZCA9IGZhbHNlOyAgIC8vIFNldCB0cnVlIHdoZW4gd2UgaGF2ZSBmZXRjaGVkIHNvbWV0aGluZy4uLlxyXG5cclxuICAgICAgdGhpcy5zdGFydCA9IGZ1bmN0aW9uKHNpbmdsZSkge1xyXG4gICAgICAgICAgdGhpcy5mZXRjaGluZyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgaWYoc2luZ2xlICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5tb3JlID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuZG9uZSA9IGZ1bmN0aW9uKHNpbmdsZSkge1xyXG4gICAgICAgICAgdGhpcy5mZXRjaGluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgIGlmKHNpbmdsZSAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuZmV0Y2hlZCA9IHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMucmVzZXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHRoaXMubW9yZSA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5mZXRjaGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5mZXRjaGVkID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICB9O1xyXG5cclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgICBwcm9wczoge1xyXG4gICAgICAgIGZldGNoZXI6IHtcclxuICAgICAgICAgICAgdHlwZTogT2JqZWN0LFxyXG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZldGNoaW5nOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICB3YXRjaDoge1xyXG4gICAgICAgICAgJ2ZldGNoZXIuZmV0Y2hpbmcnOiBmdW5jdGlvbih0bywgZnJvbSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuc2V0RmV0Y2hpbmcoKVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGZldGNoaW5nOiBmdW5jdGlvbih0bywgZnJvbSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuc2V0RmV0Y2hpbmcoKVxyXG4gICAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBkYXRhOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgc2hvd0ZldGNoaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgICBkZWxheWVkRmV0Y2hpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgIHRpbWVyOiBudWxsXHJcbiAgICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIG1vdW50ZWQoKSB7XHJcbiAgICAgICAgICB0aGlzLnNldEZldGNoaW5nKCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICAgIGZldGNoTW9yZSgpIHtcclxuICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuZmV0Y2hNb3JlKCk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgc2V0RmV0Y2hpbmcoKSB7XHJcbiAgICAgICAgICAgICAgLy8gQXJlIHdlIGN1cnJlbnRseSBmZXRjaGluZz9cclxuICAgICAgICAgICAgICBsZXQgc2hvd0ZldGNoaW5nID0gKHRoaXMuZmV0Y2hlciAhPT0gbnVsbCAmJiB0aGlzLmZldGNoZXIuZmV0Y2hpbmcpIHx8IHRoaXMuZmV0Y2hpbmc7XHJcbiAgICAgICAgICAgICAgaWYoc2hvd0ZldGNoaW5nICYmICF0aGlzLnNob3dGZXRjaGluZykge1xyXG4gICAgICAgICAgICAgICAgICAvLyBGZXRjaGluZyBpcyBiZWNvbWluZyBhY3RpdmVcclxuICAgICAgICAgICAgICAgICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxheWVkRmV0Y2hpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICB9LCAxMDAwKVxyXG4gICAgICAgICAgICAgIH0gZWxzZSBpZighc2hvd0ZldGNoaW5nICYmIHRoaXMuc2hvd0ZldGNoaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcclxuICAgICAgICAgICAgICAgICAgdGhpcy50aW1lID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5kZWxheWVkRmV0Y2hpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgdGhpcy5zaG93RmV0Y2hpbmcgPSBzaG93RmV0Y2hpbmc7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuICB9O1xyXG5cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgbGFuZz1cInNjc3NcIiBzY29wZWQ+XHJcblxyXG5AaW1wb3J0ICcuLi8uLi8uLi9zaXRlL3Nhc3MvbW9kdWxlcy9fY29sb3JzJztcclxuXHJcbmRpdi5mZXRjaGluZyB7XHJcbiAgaGVpZ2h0OiAyOHB4O1xyXG4gIG1hcmdpbjogMWVtIDA7XHJcblxyXG4gIHAge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xyXG4gICAgY29sb3I6ICRjb21wO1xyXG4gICAgcGFkZGluZy10b3A6IDJweDtcclxuICB9XHJcbn1cclxuXHJcbi5tb3JlIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblxyXG4gIGJ1dHRvbiB7XHJcbiAgICBmb250LXNpemU6IDAuOGVtO1xyXG4gICAgaGVpZ2h0OiAyOHB4O1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gIH1cclxufVxyXG5cclxuPC9zdHlsZT4iLCI8IS0tXHJcbi8qKlxyXG4gKiBAZmlsZVxyXG4gKiBTaW1wbGUgY29tcG9uZW50IGZvciBzZWxlY3RpbmcgYSB1c2VyIGluIHRoZSBzeXN0ZW0uXHJcbiAqL1xyXG4tLT5cclxuPHRlbXBsYXRlPlxyXG4gIDxzcGFuPlxyXG4gICAgPGRpdiBjbGFzcz1cImNsLWlucHV0XCI+PGlucHV0IHYtbW9kZWw9XCJxdWVyeVwiIHR5cGU9XCJ0ZXh0XCIgbWF4bGVuZ3RoPVwiMTUwXCI+XHJcbiAgICAgIDxhIEBjbGljay5wcmV2ZW50PVwiZmV0Y2gocXVlcnkpXCIgY2xhc3M9XCJzZWFyY2hlclwiPjxpbWcgOnNyYz1cInNlYXJjaGVyXCI+PC9hPlxyXG4gICAgICA8ZGl2IHYtaWY9XCJyZXN1bHQubGVuZ3RoID4gMCB8fCBub3Jlc3VsdFwiIGNsYXNzPVwiY2wtcmVzdWx0c1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjbC1yZXN1bHQtbGlzdFwiPlxyXG4gICAgICAgICAgPGRpdiB2LWZvcj1cInVzZXIgaW4gcmVzdWx0XCIgQGNsaWNrLnByZXZlbnQ9XCJzZWxlY3RVc2VyKHVzZXIpXCI+PHNwYW4+PGFcclxuICAgICAgICAgICAgQGNsaWNrLnByZXZlbnQ9XCJzZWxlY3RVc2VyKHVzZXIpXCI+e3t1c2VyLnVzZXJJZH19PC9hPjwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4+PGEgQGNsaWNrLnByZXZlbnQ9XCJzZWxlY3RVc2VyKHVzZXIpXCI+e3t1c2VyLm5hbWV9fTwvYT48L3NwYW4+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgdi1pZj1cIm5vcmVzdWx0XCIgY2xhc3M9XCJzdGF0ZW1lbnRcIj5ObyByZXN1bHRzLi4uPC9kaXY+XHJcbiAgICAgICAgPGRpdiB2LWlmPVwibW9yZVwiIGNsYXNzPVwic3RhdGVtZW50XCI+Li4ubW9yZS4uLjwvZGl2PlxyXG5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj4gPGEgQGNsaWNrLnByZXZlbnQ9XCJjbGVhclwiPjxpbWcgOnNyYz1cImRlbGV0ZXJcIj48L2E+XHJcbiAgPC9zcGFuPlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuXHJcbiAgY29uc3QgTElNSVQgPSAyMDtcclxuXHJcbiAgICBleHBvcnQgZGVmYXVsdCB7XHJcbiAgICAgICAgcHJvcHM6IFtcclxuICAgICAgICAgICAgJ3NlbGVjdGVkJ1xyXG4gICAgICAgIF0sXHJcbiAgICAgICAgZGF0YTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBxdWVyeTogJycsXHJcbiAgICAgICAgICAgICAgICByZXN1bHQ6IFtdLFxyXG4gICAgICAgICAgICAgICAgbm9yZXN1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2VxOiAxLFxyXG4gICAgICAgICAgICAgICAgZmV0Y2hlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB0aW1lcjogbnVsbCxcclxuICAgICAgICAgICAgICAgIHNldDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBtb3JlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHNlYXJjaGVyOiBTaXRlLnJvb3QgKyAnL3ZlbmRvci9jbC9zaXRlL2ltZy9zZWFyY2gucG5nJyxcclxuICAgICAgICAgICAgICAgIGRlbGV0ZXI6IFNpdGUucm9vdCArICcvdmVuZG9yL2NsL3NpdGUvaW1nL3gucG5nJyxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgd2F0Y2g6IHtcclxuICAgICAgICAgICAgcXVlcnkoYWZ0ZXIsIGJlZm9yZSkge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5zZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnRpbWVyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZXIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mZXRjaChhZnRlcik7XHJcbiAgICAgICAgICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgICAgIGZldGNoKHF1ZXJ5KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZmV0Y2gnKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHF1ZXJ5KTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMudGltZXIgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQobnVsbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgcXVlcnkgPSBxdWVyeS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICBpZihxdWVyeS5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mZXRjaGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXErKztcclxuICAgICAgICAgICAgICAgIFNpdGUuYXBpLmdldCgnL2FwaS91c2VycycsIHtzZWFyY2g6IHF1ZXJ5LCBzZXE6IHRoaXMuc2VxLCBsaW1pdDogTElNSVR9KVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZighcmVzcG9uc2UuaGFzRXJyb3IoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBwcm90ZWN0cyBmcm9tIG91dC1vZi1vcmRlciBwcm9jZXNzaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvZiByZXN1bHRzIGZyb20gdGhlIHNlcnZlci4uLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VxID0gcmVzcG9uc2UuZ2V0RGF0YSgnc2VxJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZigrc2VxLmlkICE9PSB0aGlzLnNlcSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gcmVzcG9uc2UuZ2V0RGF0YSgndXNlcnMnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGEgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9yZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuYXR0cmlidXRlcy5mb3JFYWNoKCh1c2VyRGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih1c2VyRGF0YS5tb3JlICE9PSAneWVzJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHVzZXIgPSBuZXcgVXNlcnMuVXNlcih1c2VyRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdC5wdXNoKHVzZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3JlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9yZXN1bHQgPSAodGhpcy5yZXN1bHQubGVuZ3RoID09PSAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaXRlLnRvYXN0KHRoaXMsIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBTaXRlLnRvYXN0KHRoaXMsIGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2VsZWN0VXNlcih1c2VyKSB7O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5xdWVyeSA9IHVzZXIubmFtZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0ID0gW107XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vcmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vcmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQodXNlcik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNsZWFyKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXErKzsgLy8gSnVzdCBpbiBjYXNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3Jlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3JlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnF1ZXJ5ID0gJyc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkKG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgbGFuZz1cInNjc3NcIiBzY29wZWQ+XHJcblxyXG4gIGEuc2VhcmNoZXIge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiAwO1xyXG4gICAgcmlnaHQ6IDA7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICBtaW4taGVpZ2h0OiAxMDAlO1xyXG4gICAgd2lkdGg6IDIxcHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBiYWNrZ3JvdW5kOiAjYWFhYWFhO1xyXG5cclxuICAgIGltZyB7XHJcbiAgICAgIGhlaWdodDogMTZweDtcclxuICAgICAgd2lkdGg6IDE2cHg7XHJcbiAgICAgIHZlcnRpY2FsLWFsaWduOiAtNHB4O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGl2LmNsLWlucHV0IHtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIHdpZHRoOiAzMDBweDtcclxuXHJcblxyXG4gICAgaW5wdXQge1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgYm9yZGVyOiAxcHggc29saWQgI2NjY2NjYztcclxuICAgIH1cclxuXHJcbiAgICBkaXYuY2wtcmVzdWx0cyB7XHJcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgbGVmdDogMDtcclxuICAgICAgcmlnaHQ6IDA7XHJcbiAgICAgIHRvcDogMTAwJTtcclxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgZm9udC1zaXplOiAwLjg1ZW07XHJcblxyXG4gICAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICAgICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCBibGFjaztcclxuICAgICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgYmxhY2s7XHJcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCBibGFjaztcclxuXHJcbiAgICAgIGRpdi5jbC1yZXN1bHQtbGlzdCB7XHJcbiAgICAgICAgZGlzcGxheTogdGFibGU7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcblxyXG5cclxuICAgICAgICBkaXYge1xyXG4gICAgICAgICAgZGlzcGxheTogdGFibGUtcm93O1xyXG4gICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICM4ODg4ODg7XHJcbiAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcblxyXG4gICAgICAgICAgc3BhbiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IHRhYmxlLWNlbGw7XHJcbiAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDAuNWVtIDAuMjVlbTtcclxuXHJcbiAgICAgICAgICAgIGEge1xyXG4gICAgICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgICAgICAgICAgICBjb2xvcjogYmxhY2s7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGE6aG92ZXIge1xyXG4gICAgICAgICAgICAgIGNvbG9yOiAjODg4ODg4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgc3BhbjpmaXJzdC1jaGlsZCB7XHJcbiAgICAgICAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBzcGFuOmxhc3QtY2hpbGQge1xyXG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICAgICAgICB3aWR0aDogOTklO1xyXG5cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgZGl2OmZpcnN0LWNoaWxkLCBkaXY6bGFzdC1jaGlsZCB7XHJcbiAgICAgICAgICBzcGFuIHtcclxuICAgICAgICAgICAgcGFkZGluZzogMC4yNWVtIDAuMjVlbTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgICBkaXYuc3RhdGVtZW50IHtcclxuICAgICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbjwvc3R5bGU+IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG5kaXYuZmV0Y2hpbmdbZGF0YS12LTQzYjI2YmNiXSB7XFxuICBoZWlnaHQ6IDI4cHg7XFxuICBtYXJnaW46IDFlbSAwO1xcbn1cXG5kaXYuZmV0Y2hpbmcgcFtkYXRhLXYtNDNiMjZiY2JdIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gIGNvbG9yOiAjYzQxNDI1O1xcbiAgcGFkZGluZy10b3A6IDJweDtcXG59XFxuLm1vcmVbZGF0YS12LTQzYjI2YmNiXSB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcbi5tb3JlIGJ1dHRvbltkYXRhLXYtNDNiMjZiY2JdIHtcXG4gIGZvbnQtc2l6ZTogMC44ZW07XFxuICBoZWlnaHQ6IDI4cHg7XFxuICBtYXJnaW46IDA7XFxufVxcblxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuYS5zZWFyY2hlcltkYXRhLXYtZThlN2Y4NDBdIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIHJpZ2h0OiAwO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgbWluLWhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAyMXB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgYmFja2dyb3VuZDogI2FhYWFhYTtcXG59XFxuYS5zZWFyY2hlciBpbWdbZGF0YS12LWU4ZTdmODQwXSB7XFxuICBoZWlnaHQ6IDE2cHg7XFxuICB3aWR0aDogMTZweDtcXG4gIHZlcnRpY2FsLWFsaWduOiAtNHB4O1xcbn1cXG5kaXYuY2wtaW5wdXRbZGF0YS12LWU4ZTdmODQwXSB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB3aWR0aDogMzAwcHg7XFxufVxcbmRpdi5jbC1pbnB1dCBpbnB1dFtkYXRhLXYtZThlN2Y4NDBdIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjY2NjYztcXG59XFxuZGl2LmNsLWlucHV0IGRpdi5jbC1yZXN1bHRzW2RhdGEtdi1lOGU3Zjg0MF0ge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogMDtcXG4gIHJpZ2h0OiAwO1xcbiAgdG9wOiAxMDAlO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGZvbnQtc2l6ZTogMC44NWVtO1xcbiAgYmFja2dyb3VuZDogd2hpdGU7XFxuICBib3JkZXItbGVmdDogMXB4IHNvbGlkIGJsYWNrO1xcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgYmxhY2s7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgYmxhY2s7XFxufVxcbmRpdi5jbC1pbnB1dCBkaXYuY2wtcmVzdWx0cyBkaXYuY2wtcmVzdWx0LWxpc3RbZGF0YS12LWU4ZTdmODQwXSB7XFxuICBkaXNwbGF5OiB0YWJsZTtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG5kaXYuY2wtaW5wdXQgZGl2LmNsLXJlc3VsdHMgZGl2LmNsLXJlc3VsdC1saXN0IGRpdltkYXRhLXYtZThlN2Y4NDBdIHtcXG4gIGRpc3BsYXk6IHRhYmxlLXJvdztcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjODg4ODg4O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5kaXYuY2wtaW5wdXQgZGl2LmNsLXJlc3VsdHMgZGl2LmNsLXJlc3VsdC1saXN0IGRpdiBzcGFuW2RhdGEtdi1lOGU3Zjg0MF0ge1xcbiAgZGlzcGxheTogdGFibGUtY2VsbDtcXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgcGFkZGluZzogMC41ZW0gMC4yNWVtO1xcbn1cXG5kaXYuY2wtaW5wdXQgZGl2LmNsLXJlc3VsdHMgZGl2LmNsLXJlc3VsdC1saXN0IGRpdiBzcGFuIGFbZGF0YS12LWU4ZTdmODQwXSB7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBjb2xvcjogYmxhY2s7XFxufVxcbmRpdi5jbC1pbnB1dCBkaXYuY2wtcmVzdWx0cyBkaXYuY2wtcmVzdWx0LWxpc3QgZGl2IHNwYW4gYVtkYXRhLXYtZThlN2Y4NDBdOmhvdmVyIHtcXG4gIGNvbG9yOiAjODg4ODg4O1xcbn1cXG5kaXYuY2wtaW5wdXQgZGl2LmNsLXJlc3VsdHMgZGl2LmNsLXJlc3VsdC1saXN0IGRpdiBzcGFuW2RhdGEtdi1lOGU3Zjg0MF06Zmlyc3QtY2hpbGQge1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbn1cXG5kaXYuY2wtaW5wdXQgZGl2LmNsLXJlc3VsdHMgZGl2LmNsLXJlc3VsdC1saXN0IGRpdiBzcGFuW2RhdGEtdi1lOGU3Zjg0MF06bGFzdC1jaGlsZCB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgd2lkdGg6IDk5JTtcXG59XFxuZGl2LmNsLWlucHV0IGRpdi5jbC1yZXN1bHRzIGRpdi5jbC1yZXN1bHQtbGlzdCBkaXY6Zmlyc3QtY2hpbGQgc3BhbltkYXRhLXYtZThlN2Y4NDBdLFxcbmRpdi5jbC1pbnB1dCBkaXYuY2wtcmVzdWx0cyBkaXYuY2wtcmVzdWx0LWxpc3QgZGl2Omxhc3QtY2hpbGQgc3BhbltkYXRhLXYtZThlN2Y4NDBdIHtcXG4gIHBhZGRpbmc6IDAuMjVlbSAwLjI1ZW07XFxufVxcbmRpdi5jbC1pbnB1dCBkaXYuY2wtcmVzdWx0cyBkaXYuc3RhdGVtZW50W2RhdGEtdi1lOGU3Zjg0MF0ge1xcbiAgd2lkdGg6IDEwMCU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxufVxcblxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICBbXG4gICAgICBfdm0uZGVsYXllZEZldGNoaW5nXG4gICAgICAgID8gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJmZXRjaGluZ1wiIH0sIFtcbiAgICAgICAgICAgIF9jKFwicFwiLCBbX3ZtLl92KFwiRmV0Y2hpbmcgZnJvbSBzZXJ2ZXIuLi5cIildKVxuICAgICAgICAgIF0pXG4gICAgICAgIDogX3ZtLl9lKCksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgKF92bS5mZXRjaGVyID09PSBudWxsIHx8ICFfdm0uZmV0Y2hlci5mZXRjaGluZykgJiYgIV92bS5mZXRjaGluZ1xuICAgICAgICA/IF92bS5fdChcImRlZmF1bHRcIilcbiAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfdm0uZmV0Y2hlciAhPT0gbnVsbCAmJiBfdm0uZmV0Y2hlci5tb3JlXG4gICAgICAgID8gX2MoXCJwXCIsIHsgc3RhdGljQ2xhc3M6IFwibW9yZVwiIH0sIFtcbiAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5mZXRjaE1vcmUoJGV2ZW50KVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgW192bS5fdihcIk1PUkVcIildXG4gICAgICAgICAgICApXG4gICAgICAgICAgXSlcbiAgICAgICAgOiBfdm0uX2UoKVxuICAgIF0sXG4gICAgMlxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcInNwYW5cIiwgW1xuICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2wtaW5wdXRcIiB9LCBbXG4gICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwibW9kZWxcIixcbiAgICAgICAgICAgIHJhd05hbWU6IFwidi1tb2RlbFwiLFxuICAgICAgICAgICAgdmFsdWU6IF92bS5xdWVyeSxcbiAgICAgICAgICAgIGV4cHJlc3Npb246IFwicXVlcnlcIlxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJ0ZXh0XCIsIG1heGxlbmd0aDogXCIxNTBcIiB9LFxuICAgICAgICBkb21Qcm9wczogeyB2YWx1ZTogX3ZtLnF1ZXJ5IH0sXG4gICAgICAgIG9uOiB7XG4gICAgICAgICAgaW5wdXQ6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgaWYgKCRldmVudC50YXJnZXQuY29tcG9zaW5nKSB7XG4gICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3ZtLnF1ZXJ5ID0gJGV2ZW50LnRhcmdldC52YWx1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwiYVwiLFxuICAgICAgICB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6IFwic2VhcmNoZXJcIixcbiAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICBfdm0uZmV0Y2goX3ZtLnF1ZXJ5KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW19jKFwiaW1nXCIsIHsgYXR0cnM6IHsgc3JjOiBfdm0uc2VhcmNoZXIgfSB9KV1cbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLnJlc3VsdC5sZW5ndGggPiAwIHx8IF92bS5ub3Jlc3VsdFxuICAgICAgICA/IF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2wtcmVzdWx0c1wiIH0sIFtcbiAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNsLXJlc3VsdC1saXN0XCIgfSxcbiAgICAgICAgICAgICAgX3ZtLl9sKF92bS5yZXN1bHQsIGZ1bmN0aW9uKHVzZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uc2VsZWN0VXNlcih1c2VyKVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uc2VsZWN0VXNlcih1c2VyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKHVzZXIudXNlcklkKSldXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uc2VsZWN0VXNlcih1c2VyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKHVzZXIubmFtZSkpXVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIF92bS5ub3Jlc3VsdFxuICAgICAgICAgICAgICA/IF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwic3RhdGVtZW50XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiTm8gcmVzdWx0cy4uLlwiKVxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgX3ZtLm1vcmVcbiAgICAgICAgICAgICAgPyBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInN0YXRlbWVudFwiIH0sIFtfdm0uX3YoXCIuLi5tb3JlLi4uXCIpXSlcbiAgICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICAgIF0pXG4gICAgICAgIDogX3ZtLl9lKClcbiAgICBdKSxcbiAgICBfdm0uX3YoXCIgXCIpLFxuICAgIF9jKFxuICAgICAgXCJhXCIsXG4gICAgICB7XG4gICAgICAgIG9uOiB7XG4gICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgIHJldHVybiBfdm0uY2xlYXIoJGV2ZW50KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFtfYyhcImltZ1wiLCB7IGF0dHJzOiB7IHNyYzogX3ZtLmRlbGV0ZXIgfSB9KV1cbiAgICApXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVzb2x2ZS11cmwtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0ZldGNoZXJWdWUudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NDNiMjZiY2ImbGFuZz1zY3NzJnNjb3BlZD10cnVlJlwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgYWRkID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpLmRlZmF1bHRcbnZhciB1cGRhdGUgPSBhZGQoXCI0NTFlYzFhNFwiLCBjb250ZW50LCBmYWxzZSwge30pO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuIC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG4gaWYoIWNvbnRlbnQubG9jYWxzKSB7XG4gICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZXNvbHZlLXVybC1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRmV0Y2hlclZ1ZS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD00M2IyNmJjYiZsYW5nPXNjc3Mmc2NvcGVkPXRydWUmXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVzb2x2ZS11cmwtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0ZldGNoZXJWdWUudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NDNiMjZiY2ImbGFuZz1zY3NzJnNjb3BlZD10cnVlJlwiKTtcbiAgICAgaWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgIH0pO1xuIH1cbiAvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG4gbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVzb2x2ZS11cmwtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1VzZXJTZWxlY3RvclZ1ZS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD1lOGU3Zjg0MCZsYW5nPXNjc3Mmc2NvcGVkPXRydWUmXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciBhZGQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikuZGVmYXVsdFxudmFyIHVwZGF0ZSA9IGFkZChcImZkZWZlOGRhXCIsIGNvbnRlbnQsIGZhbHNlLCB7fSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Jlc29sdmUtdXJsLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Vc2VyU2VsZWN0b3JWdWUudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9ZThlN2Y4NDAmbGFuZz1zY3NzJnNjb3BlZD10cnVlJlwiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Jlc29sdmUtdXJsLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Vc2VyU2VsZWN0b3JWdWUudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9ZThlN2Y4NDAmbGFuZz1zY3NzJnNjb3BlZD10cnVlJlwiKTtcbiAgICAgaWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgIH0pO1xuIH1cbiAvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG4gbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiLyoqXHJcbiAqIEBmaWxlXHJcbiAqIFRoZSBtYWluIHVzZXJzLmpzIGVudHJ5IHBvaW50LlxyXG4gKlxyXG4gKiBEb2VzIG5vdCBpbmNsdWRlIGNvbnNvbGUgY29tcG9uZW50cy5cclxuICovXHJcblxyXG5pbXBvcnQge1VzZXJzRmFjdG9yeX0gZnJvbSAnLi9qcy9Vc2Vycy9Vc2Vyc0ZhY3RvcnkuanMnO1xyXG5cclxuaW1wb3J0IEZldGNoZXJWdWUgZnJvbSAnLi9qcy9MaWIvRmV0Y2hlclZ1ZS52dWUnO1xyXG5pbXBvcnQgVXNlclNlbGVjdG9yVnVlIGZyb20gJy4vanMvTGliL1VzZXJTZWxlY3RvclZ1ZS52dWUnO1xyXG5pbXBvcnQge1VzZXJ9IGZyb20gJy4vanMvVXNlcnMvVXNlci5qcyc7XHJcblxyXG5leHBvcnQge0ZldGNoZXJWdWV9O1xyXG5leHBvcnQge1VzZXJTZWxlY3RvclZ1ZX07XHJcbmV4cG9ydCB7VXNlcn07XHJcblxyXG5sZXQgVXNlcnMgPSBVc2Vyc0ZhY3RvcnkuY3JlYXRlKFNpdGUuU2l0ZSk7XHJcbmV4cG9ydCB7VXNlcnN9O1xyXG4iLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL0ZldGNoZXJWdWUudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTQzYjI2YmNiJnNjb3BlZD10cnVlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0ZldGNoZXJWdWUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9GZXRjaGVyVnVlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuaW1wb3J0IHN0eWxlMCBmcm9tIFwiLi9GZXRjaGVyVnVlLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTQzYjI2YmNiJmxhbmc9c2NzcyZzY29wZWQ9dHJ1ZSZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiNDNiMjZiY2JcIixcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCJDOlxcXFxVc2Vyc1xcXFxjaGFybFxcXFxEb2N1bWVudHNcXFxcQ2xhc3Nlc1xcXFxDU0UzMzVcXFxcd2ViLW5ld1xcXFxub2RlX21vZHVsZXNcXFxcdnVlLWhvdC1yZWxvYWQtYXBpXFxcXGRpc3RcXFxcaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnNDNiMjZiY2InLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnNDNiMjZiY2InLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL0ZldGNoZXJWdWUudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTQzYjI2YmNiJnNjb3BlZD10cnVlJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzQzYjI2YmNiJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJ2ZW5kb3IvY2wvdXNlcnMvanMvTGliL0ZldGNoZXJWdWUudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0yIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRmV0Y2hlclZ1ZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0ZldGNoZXJWdWUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Jlc29sdmUtdXJsLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9GZXRjaGVyVnVlLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTQzYjI2YmNiJmxhbmc9c2NzcyZzY29wZWQ9dHJ1ZSZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Jlc29sdmUtdXJsLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9GZXRjaGVyVnVlLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTQzYjI2YmNiJmxhbmc9c2NzcyZzY29wZWQ9dHJ1ZSZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9GZXRjaGVyVnVlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD00M2IyNmJjYiZzY29wZWQ9dHJ1ZSZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vVXNlclNlbGVjdG9yVnVlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1lOGU3Zjg0MCZzY29wZWQ9dHJ1ZSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9Vc2VyU2VsZWN0b3JWdWUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9Vc2VyU2VsZWN0b3JWdWUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5pbXBvcnQgc3R5bGUwIGZyb20gXCIuL1VzZXJTZWxlY3RvclZ1ZS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD1lOGU3Zjg0MCZsYW5nPXNjc3Mmc2NvcGVkPXRydWUmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcImU4ZTdmODQwXCIsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcY2hhcmxcXFxcRG9jdW1lbnRzXFxcXENsYXNzZXNcXFxcQ1NFMzM1XFxcXHdlYi1uZXdcXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJ2U4ZTdmODQwJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJ2U4ZTdmODQwJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9Vc2VyU2VsZWN0b3JWdWUudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWU4ZTdmODQwJnNjb3BlZD10cnVlJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJ2U4ZTdmODQwJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJ2ZW5kb3IvY2wvdXNlcnMvanMvTGliL1VzZXJTZWxlY3RvclZ1ZS52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Vc2VyU2VsZWN0b3JWdWUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Vc2VyU2VsZWN0b3JWdWUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Jlc29sdmUtdXJsLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Vc2VyU2VsZWN0b3JWdWUudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9ZThlN2Y4NDAmbGFuZz1zY3NzJnNjb3BlZD10cnVlJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVzb2x2ZS11cmwtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1VzZXJTZWxlY3RvclZ1ZS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD1lOGU3Zjg0MCZsYW5nPXNjc3Mmc2NvcGVkPXRydWUmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vVXNlclNlbGVjdG9yVnVlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1lOGU3Zjg0MCZzY29wZWQ9dHJ1ZSZcIiIsIi8qKlxyXG4gKiBAZmlsZVxyXG4gKiBWdWV4IHN0b3JlIG1vZHVsZSB0aGF0IG1haW50YWlucyBhIGNvbGxlY3Rpb24gb2Ygc3lzdGVtIHVzZXJzLlxyXG4gKi9cclxuXHJcbmltcG9ydCB7RmV0Y2hlcn0gZnJvbSAnLi9MaWIvRmV0Y2hlclZ1ZS52dWUnO1xyXG5pbXBvcnQge1VzZXJ9IGZyb20gJy4vVXNlcnMvVXNlci5qcyc7XHJcblxyXG5jb25zdCBMSU1JVCA9IDUwMDtcclxuXHJcbmV4cG9ydCBsZXQgU3RvcmVNb2R1bGVVc2VycyA9IGZ1bmN0aW9uKCkge1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGEgVnVleCBzdG9yZSBtb2R1bGUgdG8gc3RvcmUgdXNlcnMuXHJcbiAqXHJcbiAqIFRoaXMgd2lsbCB3b3JrIGZvciBib3RoIFVzZXJzIGFuZCBjb3Vyc2UgTWVtYmVycywgc2luY2UgdGhleVxyXG4gKiB1c2UgdGhlIHNhbWUgQVBJLlxyXG4gKiBAcGFyYW0gYXBpICcvYXBpL3VzZXJzJyBmb3IgJy9hcGkvY291cnNlL21lbWJlcnMnXHJcbiAqIEBwYXJhbSBxdWVyeSBJdGVtcyB0byBhZGQgdG8gdGhlIHF1ZXJ5IChzZW1lc3RlciBhbmQgc2VjdGlvbiBmb3IgbWVtYmVycykuXHJcbiAqIEBwYXJhbSB0b0lkIE1hcHBpbmcgZnJvbSBhIHVzZXIgdG8gdGhlIElEIHRvIHVzZSBmb3IgdGhlIGNvbGxlY3Rpb24uXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuU3RvcmVNb2R1bGVVc2Vycy5jcmVhdGUgPSBmdW5jdGlvbihhcGksIHRvSWQpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmFtZXNwYWNlZDogdHJ1ZSxcclxuICAgICAgICBzdGF0ZToge1xyXG4gICAgICAgICAgICB1c2VyczogW10sXHJcbiAgICAgICAgICAgIGZldGNoZXI6IG5ldyBGZXRjaGVyKCksICAgICAvLyBJbmRpY2F0ZXMgdGhlIGZldGNoaW5nIHN0YXR1c1xyXG4gICAgICAgICAgICBxdWVyeToge31cclxuICAgICAgICB9LFxyXG4gICAgICAgIG11dGF0aW9uczoge1xyXG4gICAgICAgICAgICBhZGQoc3RhdGUsIHVzZXIpIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlLnVzZXJzLnB1c2godXNlcik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG1vcmUoc3RhdGUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZS5mZXRjaGVyLm1vcmUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmV0Y2hTdGFydChzdGF0ZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlLmZldGNoZXIuc3RhcnQodmFsdWUpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmZXRjaERvbmUoc3RhdGUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZS5mZXRjaGVyLmRvbmUodmFsdWUpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXNldChzdGF0ZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlLmZldGNoZXIucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgIHN0YXRlLnVzZXJzID0gW107XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHF1ZXJ5KHN0YXRlLCB2YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZS5xdWVyeSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB1cGRhdGUoc3RhdGUsIHVzZXIpIHtcclxuICAgICAgICAgICAgICAgIC8vIElmIG5vdGhpbmcgaXMgZmV0Y2hlZCwgbm90aGluZyBuZWVkIGJlIHVwZGF0ZWRcclxuICAgICAgICAgICAgICAgIGlmKCFzdGF0ZS5mZXRjaGVyLmZldGNoZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIGxpc3QgaXMgZW1wdHksIHdlIGZvcmNlIGEgcmVsb2FkIGZyb20gdGhlIHNlcnZlclxyXG4gICAgICAgICAgICAgICAgaWYoc3RhdGUudXNlcnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuZmV0Y2hlci5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLnVzZXJzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIERvZXMgdGhlIHVzZXIgZXhpc3QgcmlnaHQgbm93P1xyXG4gICAgICAgICAgICAgICAgbGV0IGk9MDtcclxuICAgICAgICAgICAgICAgIGZvciggOyBpPHN0YXRlLnVzZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodG9JZCh1c2VyKSA9PT0gdG9JZChzdGF0ZS51c2Vyc1tpXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgaGF2ZSBmb3VuZCBpdCwgc3dhcCBpdCBpblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZS51c2Vyc1tpXSA9IHVzZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzdGF0ZS5mZXRjaGVyLm1vcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNpbmNlIHRoZSBuYW1lIG1heSBoYXZlIGNoYW5nZWQsIHRoZSBwb3NpdGlvbiBpbiB0aGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxpc3QgY291bGQgYWxzbyBjaGFuZ2UuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihVc2VyLmNvbXBhcmUodXNlciwgc3RhdGUudXNlcnNbc3RhdGUudXNlcnMubGVuZ3RoLTFdKSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUHJvYmFibHkgb2ZmIHRoZSBlbmQsIGZvcmNlIGEgcmVsb2FkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUuZmV0Y2hlci5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLnVzZXJzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUudXNlcnMuc29ydChVc2VyLmNvbXBhcmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIElmIHdlIGRpZCBub3QgZmluZCB0aGUgdXNlciwgaXQgbXVzdCBzdGlsbFxyXG4gICAgICAgICAgICAgICAgLy8gYmUgd2FpdGluZyB0byBiZSBmZXRjaGVkIGZyb20gdGhlIHNlcnZlci5cclxuICAgICAgICAgICAgICAgIHN0YXRlLmZldGNoZXIubW9yZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5ldyhzdGF0ZSwgdXNlcikge1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgbm90aGluZyBpcyBmZXRjaGVkLCBub3RoaW5nIG5lZWQgYmUgdXBkYXRlZFxyXG4gICAgICAgICAgICAgICAgaWYoIXN0YXRlLmZldGNoZXIuZmV0Y2hlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgbGlzdCBpcyBlbXB0eSwgd2UgYXJlIHRoZSBvbmUhXHJcbiAgICAgICAgICAgICAgICBpZihzdGF0ZS51c2Vycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZS51c2Vycy5wdXNoKHVzZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZighc3RhdGUuZmV0Y2hlci5tb3JlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gV2UgaGF2ZSBpdCBhbGwsIHNvIHdlIGNhbiBhcHBlbmQsIHNvcnQsIGFuZCB3ZSBhcmUgZG9uZVxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLnVzZXJzLnB1c2godXNlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUudXNlcnMuc29ydChVc2VyLmNvbXBhcmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihVc2VyLmNvbXBhcmUodXNlciwgc3RhdGUudXNlcnNbc3RhdGUudXNlcnMubGVuZ3RoLTFdKSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUHJvYmFibHkgb2ZmIHRoZSBlbmQsIGZvcmNlIGEgcmVsb2FkXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuZmV0Y2hlci5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLnVzZXJzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHN0YXRlLnVzZXJzLnB1c2godXNlcik7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZS51c2Vycy5zb3J0KFVzZXIuY29tcGFyZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRlbGV0ZShzdGF0ZSwgaWQpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RhdGUudXNlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodG9JZChzdGF0ZS51c2Vyc1tpXSkgPT09IGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLnVzZXJzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhY3Rpb25zOiB7XHJcbiAgICAgICAgICAgIC8vIEluaXRpYWwgZmV0Y2ggZnJvbSBBUElcclxuICAgICAgICAgICAgZmV0Y2goe2Rpc3BhdGNoLCBzdGF0ZX0pIHtcclxuICAgICAgICAgICAgICAgIGlmKHN0YXRlLmZldGNoZXIuZmV0Y2hlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBkaXNwYXRjaCgnbW9yZScpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyBGZXRjaCBtb3JlXHJcbiAgICAgICAgICAgIG1vcmUoe2NvbW1pdCwgc3RhdGV9KSB7XHJcbiAgICAgICAgICAgICAgICBpZihzdGF0ZS5mZXRjaGVyLmZldGNoZWQgJiYgIXN0YXRlLmZldGNoZXIubW9yZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb21taXQoJ2ZldGNoU3RhcnQnKTtcclxuICAgICAgICAgICAgICAgIGxldCBxID0ge2xpbWl0OiBMSU1JVCwgb2Zmc2V0OiBzdGF0ZS51c2Vycy5sZW5ndGh9O1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihxLCBzdGF0ZS5xdWVyeSk7XHJcblxyXG4gICAgICAgICAgICAgICAgU2l0ZS5hcGkuZ2V0KGFwaSwgcSlcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIXJlc3BvbnNlLmhhc0Vycm9yKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5nZXREYXRhKCd1c2VycycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0YSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3JlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5hdHRyaWJ1dGVzLmZvckVhY2goKHVzZXJPYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodXNlck9iai5tb3JlID09PSAneWVzJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9yZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21taXQoJ2FkZCcsIG5ldyBVc2Vycy5Vc2VyKHVzZXJPYmopKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1pdCgnbW9yZScsIG1vcmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1pdCgnZmV0Y2hEb25lJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNpdGUudG9hc3QodGhpcywgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFNpdGUudG9hc3QodGhpcywgZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXQoe2NvbW1pdCwgc3RhdGV9LCBxdWVyeSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAvLyBXZSBtYXkgaGF2ZSB0aGUgZGVzaXJlZCB1c2VyIGxvYWRlZCBvciB3ZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIC8vIG1heSBoYXZlIHRvIGdvIGdldCB0aGVtLlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCBwcmV2ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAvLyBmb3IobGV0IGk9MDsgaTxzdGF0ZS51c2Vycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBsZXQgdXNlciA9IHN0YXRlLnVzZXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBpZih0b0lkKHVzZXIpID09PSBpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgaWYoKGkrMSkgPCBzdGF0ZS51c2Vycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICB1c2VyLm5leHQgPSBzdGF0ZS51c2Vyc1tpKzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBpZihwcmV2ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgdXNlci5wcmV2ID0gcHJldjtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgcmVzb2x2ZSh1c2VyKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHByZXYgPSB1c2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gR28gZ2V0IHRoZSB1c2VyXHJcbiAgICAgICAgICAgICAgICAgICAgY29tbWl0KCdmZXRjaFN0YXJ0JywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcXVlcnkucHJldm5leHQgPSAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBTaXRlLmFwaS5nZXQoYXBpLCBxdWVyeSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZighcmVzcG9uc2UuaGFzRXJyb3IoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5nZXREYXRhKCd1c2VycycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGEgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0YS5hdHRyaWJ1dGVzLmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCgnVXNlciBkb2VzIG5vdCBleGlzdCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21taXQoJ2ZldGNoRG9uZScsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHVzZXIgPSBuZXcgVXNlcnMuVXNlcihkYXRhLmF0dHJpYnV0ZXNbMF0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByZXYgPSByZXNwb25zZS5nZXREYXRhKCdwcmV2LXVzZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHByZXYgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyLnByZXYgPSBuZXcgVXNlcnMuVXNlcihwcmV2LmF0dHJpYnV0ZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHQgPSByZXNwb25zZS5nZXREYXRhKCduZXh0LXVzZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5leHQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyLm5leHQgPSBuZXcgVXNlcnMuVXNlcihuZXh0LmF0dHJpYnV0ZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodXNlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2l0ZS50b2FzdCh0aGlzLCByZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaXRlLnRvYXN0KHRoaXMsIGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVwZGF0ZSh7Y29tbWl0LCBzdGF0ZX0sIHBheWxvYWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgU2l0ZS5hcGkucG9zdChhcGkgKyAnL3VwZGF0ZScsIHBheWxvYWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIXJlc3BvbnNlLmhhc0Vycm9yKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlLmdldERhdGEoJ3VwZGF0ZWQtdXNlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB1c2VyID0gbmV3IFVzZXJzLlVzZXIoZGF0YS5hdHRyaWJ1dGVzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVXBkYXRlIHVzZXIgaWYgd2UgaGF2ZSBpdCBzdG9yZWQgbG9jYWxseVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFuZCB0aGUgbmFtZSBoYXMgbm90IGNoYW5nZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21taXQoJ3VwZGF0ZScsIHVzZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodXNlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaXRlLnRvYXN0KHRoaXMsIGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5ldyh7Y29tbWl0LCBzdGF0ZX0sIHBheWxvYWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgU2l0ZS5hcGkucG9zdChhcGkgKyAnL25ldycsIHBheWxvYWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIXJlc3BvbnNlLmhhc0Vycm9yKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlLmdldERhdGEoJ25ldy11c2VyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHVzZXIgPSBuZXcgVXNlcnMuVXNlcihkYXRhLmF0dHJpYnV0ZXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21taXQoJ25ldycsIHVzZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodXNlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZWplY3QnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2l0ZS50b2FzdCh0aGlzLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkZWxldGUoe2NvbW1pdCwgc3RhdGV9LCBwYXlsb2FkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIFNpdGUuYXBpLnBvc3QoYXBpICsgJy9kZWxldGUnLCB7aWQ6IHBheWxvYWQuaWR9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2UuaGFzRXJyb3IoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1pdCgnZGVsZXRlJywgcGF5bG9hZC5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2l0ZS50b2FzdCh0aGlzLCByZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaXRlLnRvYXN0KHRoaXMsIGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIiwiLyoqXHJcbiAqIEBmaWxlXHJcbiAqIFBlcm1pc3Npb25zIG1hbmFnZW1lbnQgY29tcG9uZW50XHJcbiAqL1xyXG5cclxuZXhwb3J0IGNvbnN0IFBlcm1pc3Npb25zID0gZnVuY3Rpb24oZGF0YSkge1xyXG5cdHRoaXMucGVybWlzc2lvbnMgPSBkYXRhO1xyXG5cclxuXHQvKipcclxuXHQgKiBEZXRlcm1pbmUgdGhlIGF0TGVhc3QgcGVybWlzc2lvbiBmb3IgYSBnaXZlblxyXG5cdCAqIGNvbmZpZ3VyYWJsZSBwZXJtaXNzaW9uLlxyXG5cdCAqIEBwYXJhbSB0YWcgVGFnIHRoYXQgZGVmaW5lcyB0aGUgcGVybWlzc2lvbiBjb25maWd1cmF0aW9uXHJcblx0ICogQHBhcmFtIGRlZiBEZWZhdWx0IHZhbHVlIGlmIHBlcm1pc3Npb24gbm90IHNldFxyXG5cdCAqIEByZXR1cm5zIHsqfVxyXG5cdCAqL1xyXG5cdHRoaXMuYXRMZWFzdCA9IGZ1bmN0aW9uKHRhZywgZGVmKSB7XHJcblx0XHRpZih0aGlzLnBlcm1pc3Npb25zW3RhZ10gIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5wZXJtaXNzaW9uc1t0YWddO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBkZWY7XHJcblx0fVxyXG59XHJcbiIsIi8qKlxyXG4gKiBAZmlsZVxyXG4gKiBUaGUgVnVleCBzdG9yZSBtb2R1bGUgdGhhdCBtYWludGFpbnMgdGhlIGN1cnJlbnQgc3lzdGVtIHVzZXIuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtVc2VyfSBmcm9tICcuL1VzZXIuanMnO1xyXG5cclxuXHJcblxyXG5leHBvcnQgbGV0IFN0b3JlTW9kdWxlVXNlciA9IHtcclxuICAgIG5hbWVzcGFjZWQ6IHRydWUsXHJcbiAgICBzdGF0ZToge1xyXG4gICAgICAgIHVzZXI6IG51bGxcclxuICAgIH0sXHJcbiAgICBtdXRhdGlvbnM6IHtcclxuICAgICAgICBzZXQoc3RhdGUsIHVzZXIpIHtcclxuICAgICAgICAgICAgaWYodXNlciBpbnN0YW5jZW9mIFVzZXIpIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlLnVzZXIgPSB1c2VyO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cdCAgICAgICAgICAgIHN0YXRlLnVzZXIgPSBuZXcgVXNlcih1c2VyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbiIsIi8qKlxyXG4gKiBAZmlsZVxyXG4gKiBSZXByZXNlbnRzIGEgdXNlciBpbiB0aGUgc3lzdGVtXHJcbiAqL1xyXG5cclxubGV0IFVzZXIgPSBmdW5jdGlvbihqc29uKSB7XHJcblxyXG4gICAgLy8vIFRoZSB1c2VyIHJvbGUgLSBsb2NhbCBzbyB3ZSBjYW4gcHJvdGVjdCBpdCB3aXRoIGdldHRlci9zZXR0ZXJcclxuICAgIGxldCByb2xlID0gJ0cnO1xyXG5cclxuICAgIC8vIEluc3RhbGxlZCBtZW1iZXJzaGlwXHJcbiAgICBsZXQgbWVtYmVyID0gbnVsbDtcclxuXHJcbiAgICBpZihqc29uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBpZih0eXBlb2YoanNvbikgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGpzb24gPSBKU09OLnBhcnNlKGpzb24pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmlkID0ganNvbi5pZDtcclxuICAgICAgICByb2xlID0ganNvbi5yb2xlO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IGpzb24ubmFtZTtcclxuICAgICAgICB0aGlzLmVtYWlsID0ganNvbi5lbWFpbDtcclxuICAgICAgICB0aGlzLnVzZXJJZCA9IGpzb24udXNlcjtcclxuXHJcbiAgICAgICAgLy8gSW5zdGFsbGVkIG1lbWJlcnNoaXBcclxuICAgICAgICBtZW1iZXIgPSBVc2VyLmluc3RhbnRpYXRlTWVtYmVyKGpzb24pO1xyXG4gICAgICAgIGlmKG1lbWJlciAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBtZW1iZXIudXNlciA9IHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IDA7XHJcbiAgICAgICAgcm9sZSA9ICdHJztcclxuICAgICAgICB0aGlzLm5hbWUgPSAnJztcclxuICAgICAgICB0aGlzLmVtYWlsID0gJyc7XHJcbiAgICAgICAgdGhpcy51c2VySWQgPSAnJztcclxuICAgIH1cclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ21lbWJlcicsIHtcclxuICAgICAgICBnZXQoKSB7cmV0dXJuIG1lbWJlcn1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIHRoZSBlZmZlY3RpdmUgcm9sZSBmb3IgdGhlIHVzZXIuXHJcbiAgICAgKiBUaGlzIGlzIHRoZSB1c2VyJ3Mgcm9sZSB1bmxlc3MgdGhlIHVzZXJcclxuICAgICAqIGhhcyBhIG1lbWJlcnNoaXAsIGluIHdoaWNoIGNhc2UgaXQgaXMgdGhlXHJcbiAgICAgKiBtZW1iZXJzaGlwIHJvbGUuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgdGhpcy5yb2xlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYobWVtYmVyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtZW1iZXIucm9sZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJvbGU7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zZXRVc2VyUm9sZSA9IGZ1bmN0aW9uKF9yb2xlKSB7XHJcbiAgICAgICAgcm9sZSA9IF9yb2xlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudXNlclJvbGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gcm9sZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgbWVtYmVyc2hpcCBmb3IgdGhpcyB1c2VyXHJcbiAgICAgKiBAcGFyYW0gTWVtYmVyc2hpcCBtZW1iZXJcclxuICAgICAqL1xyXG4gICAgdGhpcy5zZXRNZW1iZXIgPSBmdW5jdGlvbihfbWVtYmVyKSB7XHJcbiAgICAgICAgbWVtYmVyID0gX21lbWJlcjtcclxuICAgICAgICBpZihtZW1iZXIgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgbWVtYmVyLnVzZXIgPSB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcblVzZXIuR1VFU1QgPSAnRyc7XHJcblVzZXIuVVNFUiA9ICdVJztcclxuVXNlci5TVEFGRiA9ICdTJztcclxuVXNlci5BRE1JTiA9ICdBJztcclxuXHJcblxyXG5Vc2VyLmdldFVzZXJSb2xlcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IHJvbGVzID0ge307XHJcbiAgICByb2xlc1tVc2VyLkdVRVNUXSA9IHtuYW1lOiAnR3Vlc3QnLCBwcmlvcml0eTogMX07XHJcbiAgICByb2xlc1tVc2VyLlVTRVJdID0ge25hbWU6ICdVc2VyJywgcHJpb3JpdHk6IDJ9O1xyXG4gICAgcm9sZXNbVXNlci5TVEFGRl0gPSB7bmFtZTogJ1N0YWZmJywgcHJpb3JpdHk6IDN9O1xyXG4gICAgcm9sZXNbVXNlci5BRE1JTl0gPSB7bmFtZTogJ0FkbWluJywgcHJpb3JpdHk6IDR9O1xyXG5cclxuICAgIHJldHVybiByb2xlcztcclxufVxyXG5cclxuVXNlci5wcm90b3R5cGUuZ2V0VXNlclJvbGVzID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gVXNlci5nZXRVc2VyUm9sZXMoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgcm9sZXMgZm9yIHRoaXMgdXNlci4gTWVtYmVyc2hpcCByb2xlcyB0YWtlIHByaW9yaXR5XHJcbiAqIG92ZXIgcm9sZXMgZm9yIGp1c3QgYSB1c2VyIHdobyBpcyBub3QgYSBtZW1iZXIuXHJcbiAqL1xyXG5Vc2VyLnByb3RvdHlwZS5nZXRSb2xlcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IG1lbWJlciA9IHRoaXMubWVtYmVyO1xyXG4gICAgaWYobWVtYmVyICE9PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIG1lbWJlci5nZXRSb2xlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBVc2VyLmdldFVzZXJSb2xlcygpO1xyXG59XHJcblxyXG5Vc2VyLnByb3RvdHlwZS5hdExlYXN0ID0gZnVuY3Rpb24oYXRMZWFzdCkge1xyXG4gICAgbGV0IHJvbGUgPSB0aGlzLnJvbGUoKTtcclxuICAgIGxldCByb2xlcyA9IHRoaXMuZ2V0Um9sZXMoKTtcclxuICAgIGlmKHJvbGVzLmhhc093blByb3BlcnR5KGF0TGVhc3QpKSB7XHJcbiAgICAgICAgcmV0dXJuIHJvbGVzW3JvbGVdLnByaW9yaXR5ID49IHJvbGVzW2F0TGVhc3RdLnByaW9yaXR5O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5Vc2VyLnByb3RvdHlwZS5nZXRSb2xlUHJpb3JpdHkgPSBmdW5jdGlvbihyb2xlKSB7XHJcbiAgICBsZXQgcm9sZXMgPSB0aGlzLmdldFJvbGVzKCk7XHJcbiAgICBpZihyb2xlcy5oYXNPd25Qcm9wZXJ0eShyb2xlKSkge1xyXG4gICAgICAgIHJldHVybiByb2xlc1tyb2xlXS5wcmlvcml0eTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gMDtcclxufVxyXG5cclxuVXNlci5wcm90b3R5cGUuZGlzcGxheU5hbWUgPSBmdW5jdGlvbigpIHtcclxuICAgIGxldCBjb21tYSA9IHRoaXMubmFtZS5pbmRleE9mKCcsJyk7XHJcbiAgICBpZihjb21tYSA8IDApIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBsYXN0ID0gdGhpcy5uYW1lLnN1YnN0cigwLCBjb21tYSk7XHJcbiAgICBsZXQgZmlyc3QgPSB0aGlzLm5hbWUuc3Vic3RyKGNvbW1hKzEpLnRyaW0oKTtcclxuXHJcbiAgICByZXR1cm4gZmlyc3QgKyAnICcgKyBsYXN0O1xyXG59XHJcblxyXG5Vc2VyLnByb3RvdHlwZS51c2VyUm9sZU5hbWUgPSBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IHJvbGVzID0gdGhpcy5nZXRVc2VyUm9sZXMoKTtcclxuICAgIGxldCByb2xlID0gdGhpcy51c2VyUm9sZSgpO1xyXG4gICAgcmV0dXJuIHJvbGVzW3JvbGVdLm5hbWU7XHJcbn1cclxuXHJcblVzZXIucHJvdG90eXBlLnJvbGVOYW1lID0gZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCByb2xlcyA9IHRoaXMuZ2V0Um9sZXMoKTtcclxuICAgIGxldCByb2xlID0gdGhpcy5yb2xlKCk7XHJcbiAgICByZXR1cm4gcm9sZXNbcm9sZV0ubmFtZTtcclxufVxyXG5cclxuVXNlci5jb21wYXJlID0gZnVuY3Rpb24oYSwgYikge1xyXG4gICAgbGV0IGFuID0gYS5uYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBsZXQgYm4gPSBiLm5hbWUudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICBpZihhbiA8IGJuKSB7XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKGFuID4gYm4pIHtcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYS5pZCAtIGIuaWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbnN0YW50aWF0ZSBhIE1lbWJlcnNoaXAgb2JqZWN0IGZvciB0aGUgdXNlci5cclxuICogVGhpcyB3aWxsIGJlIHJlcGxhY2VkIGJ5IGEgcGx1Z2luIHRoYXQgYWRkc1xyXG4gKiBzdXBwb3J0IGZvciBtZW1iZXJzaGlwcy5cclxuICogQHBhcmFtIGRhdGEgbm9ybWFsbHkgaW4gdGhlIGZvcm1hdCB0aGUgUEhQIEpTT04gcmVwcmVzZW50YXRpb25cclxuICogQHJldHVybnMge251bGx9XHJcbiAqL1xyXG5Vc2VyLmluc3RhbnRpYXRlTWVtYmVyID0gZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFVzZXI7XHJcbmV4cG9ydCB7VXNlcn07IiwiLyoqXHJcbiAqIEBmaWxlXHJcbiAqIEZhY3RvcnkgdGhhdCBjcmVhdGVzIHRoZSBVc2VycyBvYmplY3RcclxuICovXHJcblxyXG5pbXBvcnQge1VzZXJ9IGZyb20gJy4vVXNlcic7XHJcbmltcG9ydCB7U3RvcmVNb2R1bGVVc2VyfSBmcm9tICcuL1N0b3JlTW9kdWxlVXNlcic7XHJcbmltcG9ydCB7U3RvcmVNb2R1bGVVc2Vyc30gZnJvbSAnLi4vU3RvcmVNb2R1bGVVc2Vycyc7XHJcbmltcG9ydCB7UGVybWlzc2lvbnN9IGZyb20gJy4vUGVybWlzc2lvbnMnO1xyXG5cclxubGV0IFVzZXJzRmFjdG9yeSA9IGZ1bmN0aW9uKCkge31cclxuY29uc29sZS5sb2coXCJVc2Vyc0ZhY3RvcnkgbG9hZGVkXCIpO1xyXG4vKipcclxuICogRmFjdG9yeSBtZXRob2QgdG8gY3JlYXRlIGEgVXNlcnMgb2JqZWN0LlxyXG4gKlxyXG4gKiBUaGlzIGFsbG93cyBmb3IgaW5qZWN0aW9uIG9mIHRoZSBzdG9yZSBmb3IgdGVzdGluZyBwdXJwb3Nlcy5cclxuICogQHBhcmFtIHN0b3JlIFZ1ZXggc3RvcmUgb2JqZWN0XHJcbiAqIEByZXR1cm5zIHtVc2Vyc30gb2JqZWN0LlxyXG4gKi9cclxuVXNlcnNGYWN0b3J5LmNyZWF0ZSA9IGZ1bmN0aW9uKHNpdGUpIHtcclxuXHJcbiAgICBsZXQgVXNlcnMgPSBmdW5jdGlvbigpIHtcclxuICAgIH1cclxuXHJcbiAgICAvL1xyXG4gICAgLy8gRXhwb3J0ZWQgY29tcG9uZW50cyBhbmQgY29uc3RhbnRzXHJcbiAgICAvL1xyXG4gICAgVXNlcnMuTVVTVF9QUk9WSURFX1VTRVJJRF9PUl9FTUFJTCA9IDEwMTtcclxuICAgIFVzZXJzLlBBU1NXT1JEU19NVVNUX01BVENIID0gMTAyO1xyXG4gICAgVXNlcnMuRFVQTElDQVRFX1VTRVIgPSAxMDM7XHJcbiAgICBVc2Vycy5EVVBMSUNBVEVfRU1BSUwgPSAxMDQ7XHJcblxyXG5cclxuICAgIC8vXHJcbiAgICAvLyBJbnN0YWxsIHRoZSB1c2VycyBzdG9yZSBtb2R1bGVzXHJcbiAgICAvL1xyXG4gICAgbGV0IHN0b3JlID0gc2l0ZS5zdG9yZTtcclxuXHJcbiAgICBpZihzdG9yZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgc3RvcmUucmVnaXN0ZXJNb2R1bGUoJ3VzZXInLCBTdG9yZU1vZHVsZVVzZXIpO1xyXG4gICAgICAgIHN0b3JlLnJlZ2lzdGVyTW9kdWxlKCd1c2VycycsIFN0b3JlTW9kdWxlVXNlcnMuY3JlYXRlKFxyXG4gICAgICAgICAgICAnL2FwaS91c2VycycsXHJcbiAgICAgICAgICAgICh1c2VyKT0+eyByZXR1cm4gdXNlci5pZDsgfVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNpdGUucmVhZHkoKCkgPT4ge1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gRGV0ZWN0IHRoZSBwYXNzZWQgaW4gdXNlciBpbmZvcm1hdGlvblxyXG4gICAgICAgIC8vIGFuZCBhZGQgaXQgdG8gdGhlIHN0b3JlLlxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgbGV0IGVuO1xyXG4gICAgICAgIGlmKCAoZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2wtdXNlcicpKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBzdG9yZS5jb21taXQoJ3VzZXIvc2V0JywgSlNPTi5wYXJzZShlbi50ZXh0Q29udGVudCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQWRkIHBlcm1pc3Npb25zIGFycmF5IGlmIGF2YWlsYWJsZVxyXG5cdCAgICBpZiggKGVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsLXBlcm1pc3Npb25zJykpICE9PSBudWxsKSB7XHJcblx0XHQgICAgc2l0ZS5wZXJtaXNzaW9ucyA9IG5ldyBQZXJtaXNzaW9ucyhKU09OLnBhcnNlKGVuLnRleHRDb250ZW50KSk7XHJcblx0ICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBVc2VycztcclxufVxyXG5cclxuZXhwb3J0IHtVc2Vyc0ZhY3Rvcnl9O1xyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==