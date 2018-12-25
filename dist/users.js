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
exports.push([module.i, "div.fetching[data-v-43b26bcb] {\n  height: 28px;\n  margin: 1em 0;\n}\ndiv.fetching p[data-v-43b26bcb] {\n  text-align: center;\n  font-style: italic;\n  color: #c41425;\n  padding-top: 2px;\n}\n.more[data-v-43b26bcb] {\n  text-align: center;\n}\n.more button[data-v-43b26bcb] {\n  font-size: 0.8em;\n  height: 28px;\n  margin: 0;\n}\n\n", ""]);

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
exports.push([module.i, "a.searcher[data-v-e8e7f840] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  height: 100%;\n  min-height: 100%;\n  width: 21px;\n  text-align: center;\n  background: #aaaaaa;\n}\na.searcher img[data-v-e8e7f840] {\n  height: 16px;\n  width: 16px;\n  vertical-align: -4px;\n}\ndiv.cl-input[data-v-e8e7f840] {\n  display: inline-block;\n  position: relative;\n  width: 300px;\n}\ndiv.cl-input input[data-v-e8e7f840] {\n  width: 100%;\n  border: 1px solid #cccccc;\n}\ndiv.cl-input div.cl-results[data-v-e8e7f840] {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 100%;\n  overflow: hidden;\n  font-size: 0.85em;\n  background: white;\n  border-left: 1px solid black;\n  border-right: 1px solid black;\n  border-bottom: 1px solid black;\n}\ndiv.cl-input div.cl-results div.cl-result-list[data-v-e8e7f840] {\n  display: table;\n  width: 100%;\n}\ndiv.cl-input div.cl-results div.cl-result-list div[data-v-e8e7f840] {\n  display: table-row;\n  border-bottom: 1px solid #888888;\n  cursor: pointer;\n}\ndiv.cl-input div.cl-results div.cl-result-list div span[data-v-e8e7f840] {\n  display: table-cell;\n  white-space: nowrap;\n  text-align: left;\n  padding: 0.5em 0.25em;\n}\ndiv.cl-input div.cl-results div.cl-result-list div span a[data-v-e8e7f840] {\n  text-decoration: none;\n  color: black;\n}\ndiv.cl-input div.cl-results div.cl-result-list div span a[data-v-e8e7f840]:hover {\n  color: #888888;\n}\ndiv.cl-input div.cl-results div.cl-result-list div span[data-v-e8e7f840]:first-child {\n  font-style: italic;\n}\ndiv.cl-input div.cl-results div.cl-result-list div span[data-v-e8e7f840]:last-child {\n  overflow: hidden;\n  width: 99%;\n}\ndiv.cl-input div.cl-results div.cl-result-list div:first-child span[data-v-e8e7f840],\ndiv.cl-input div.cl-results div.cl-result-list div:last-child span[data-v-e8e7f840] {\n  padding: 0.25em 0.25em;\n}\ndiv.cl-input div.cl-results div.statement[data-v-e8e7f840] {\n  width: 100%;\n  text-align: center;\n  font-style: italic;\n}\n\n", ""]);

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
              }),
              0
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
  var r = roles[role];

  if (r !== undefined) {
    return roles[role].name;
  }

  return 'Invalid';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9bbmFtZV0vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL1tuYW1lXS92ZW5kb3IvY2wvdXNlcnMvanMvTGliL0ZldGNoZXJWdWUudnVlIiwid2VicGFjazovL1tuYW1lXS92ZW5kb3IvY2wvdXNlcnMvanMvTGliL1VzZXJTZWxlY3RvclZ1ZS52dWUiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3VzZXJzL2pzL0xpYi9GZXRjaGVyVnVlLnZ1ZT84ZTgwIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC91c2Vycy9qcy9MaWIvVXNlclNlbGVjdG9yVnVlLnZ1ZT9lZTNhIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC91c2Vycy9qcy9MaWIvRmV0Y2hlclZ1ZS52dWU/ZTcyNSIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvdXNlcnMvanMvTGliL1VzZXJTZWxlY3RvclZ1ZS52dWU/ZDUzMyIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvdXNlcnMvanMvTGliL0ZldGNoZXJWdWUudnVlPzdhMDAiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3VzZXJzL2pzL0xpYi9Vc2VyU2VsZWN0b3JWdWUudnVlPzU4ZGEiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3VzZXJzL2luZGV4LmpzIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC91c2Vycy9qcy9MaWIvRmV0Y2hlclZ1ZS52dWUiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3VzZXJzL2pzL0xpYi9GZXRjaGVyVnVlLnZ1ZT83MjY4Iiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC91c2Vycy9qcy9MaWIvRmV0Y2hlclZ1ZS52dWU/NDk3YiIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvdXNlcnMvanMvTGliL0ZldGNoZXJWdWUudnVlPzJmMTIiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3VzZXJzL2pzL0xpYi9Vc2VyU2VsZWN0b3JWdWUudnVlIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC91c2Vycy9qcy9MaWIvVXNlclNlbGVjdG9yVnVlLnZ1ZT85MmZkIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC91c2Vycy9qcy9MaWIvVXNlclNlbGVjdG9yVnVlLnZ1ZT9mODBjIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC91c2Vycy9qcy9MaWIvVXNlclNlbGVjdG9yVnVlLnZ1ZT8wOTk3Iiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC91c2Vycy9qcy9TdG9yZU1vZHVsZVVzZXJzLmpzIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC91c2Vycy9qcy9Vc2Vycy9QZXJtaXNzaW9ucy5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvdXNlcnMvanMvVXNlcnMvU3RvcmVNb2R1bGVVc2VyLmpzIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC91c2Vycy9qcy9Vc2Vycy9Vc2VyLmpzIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC91c2Vycy9qcy9Vc2Vycy9Vc2Vyc0ZhY3RvcnkuanMiXSwibmFtZXMiOlsiVXNlcnMiLCJVc2Vyc0ZhY3RvcnkiLCJjcmVhdGUiLCJTaXRlIiwiTElNSVQiLCJTdG9yZU1vZHVsZVVzZXJzIiwiYXBpIiwidG9JZCIsIm5hbWVzcGFjZWQiLCJzdGF0ZSIsInVzZXJzIiwiZmV0Y2hlciIsIkZldGNoZXIiLCJxdWVyeSIsIm11dGF0aW9ucyIsImFkZCIsInVzZXIiLCJwdXNoIiwibW9yZSIsInZhbHVlIiwiZmV0Y2hTdGFydCIsInN0YXJ0IiwiZmV0Y2hEb25lIiwiZG9uZSIsInJlc2V0IiwidXBkYXRlIiwiZmV0Y2hlZCIsImxlbmd0aCIsImkiLCJVc2VyIiwiY29tcGFyZSIsInNvcnQiLCJuZXciLCJkZWxldGUiLCJpZCIsInNwbGljZSIsImFjdGlvbnMiLCJmZXRjaCIsImRpc3BhdGNoIiwiY29tbWl0IiwicSIsImxpbWl0Iiwib2Zmc2V0IiwiT2JqZWN0IiwiYXNzaWduIiwiZ2V0IiwidGhlbiIsInJlc3BvbnNlIiwiaGFzRXJyb3IiLCJkYXRhIiwiZ2V0RGF0YSIsImF0dHJpYnV0ZXMiLCJmb3JFYWNoIiwidXNlck9iaiIsImNvbnNvbGUiLCJsb2ciLCJ0b2FzdCIsImNhdGNoIiwiZXJyb3IiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInByZXZuZXh0IiwicHJldiIsIm5leHQiLCJwYXlsb2FkIiwicG9zdCIsIlBlcm1pc3Npb25zIiwicGVybWlzc2lvbnMiLCJhdExlYXN0IiwidGFnIiwiZGVmIiwidW5kZWZpbmVkIiwiU3RvcmVNb2R1bGVVc2VyIiwic2V0IiwianNvbiIsInJvbGUiLCJtZW1iZXIiLCJKU09OIiwicGFyc2UiLCJuYW1lIiwiZW1haWwiLCJ1c2VySWQiLCJpbnN0YW50aWF0ZU1lbWJlciIsImRlZmluZVByb3BlcnR5Iiwic2V0VXNlclJvbGUiLCJfcm9sZSIsInVzZXJSb2xlIiwic2V0TWVtYmVyIiwiX21lbWJlciIsIkdVRVNUIiwiVVNFUiIsIlNUQUZGIiwiQURNSU4iLCJnZXRVc2VyUm9sZXMiLCJyb2xlcyIsInByaW9yaXR5IiwicHJvdG90eXBlIiwiZ2V0Um9sZXMiLCJoYXNPd25Qcm9wZXJ0eSIsImdldFJvbGVQcmlvcml0eSIsImRpc3BsYXlOYW1lIiwiY29tbWEiLCJpbmRleE9mIiwibGFzdCIsInN1YnN0ciIsImZpcnN0IiwidHJpbSIsInVzZXJSb2xlTmFtZSIsInIiLCJyb2xlTmFtZSIsImEiLCJiIiwiYW4iLCJ0b0xvd2VyQ2FzZSIsImJuIiwic2l0ZSIsIk1VU1RfUFJPVklERV9VU0VSSURfT1JfRU1BSUwiLCJQQVNTV09SRFNfTVVTVF9NQVRDSCIsIkRVUExJQ0FURV9VU0VSIiwiRFVQTElDQVRFX0VNQUlMIiwic3RvcmUiLCJyZWdpc3Rlck1vZHVsZSIsInJlYWR5IiwiZW4iLCJkb2N1bWVudCIsImdl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VzZDLEVBQUUsQ0FBQ0csV0FBZCxDQUF6QjtBQUNILEtBUlksQ0FVYjs7O0FBQ0gsUUFBSSxDQUFDSCxFQUFFLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixnQkFBeEIsQ0FBTixNQUFxRCxJQUF6RCxFQUErRDtBQUM5RFYsVUFBSSxDQUFDaEQsV0FBTCxHQUFtQixJQUFJRCx3REFBSixDQUFnQlcsSUFBSSxDQUFDQyxLQUFMLENBQVc2QyxFQUFFLENBQUNHLFdBQWQsQ0FBaEIsQ0FBbkI7QUFDQTtBQUNELEdBZEQ7QUFnQkEsU0FBTy9ILEtBQVA7QUFDSCxDQTVDRCIsImZpbGUiOiJ1c2Vycy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlVzZXJzXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlVzZXJzXCJdID0gZmFjdG9yeSgpO1xufSkod2luZG93LCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCI8dGVtcGxhdGU+XHJcbiAgPGRpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJmZXRjaGluZ1wiIHYtaWY9XCJkZWxheWVkRmV0Y2hpbmdcIj5cclxuICAgICAgPHA+RmV0Y2hpbmcgZnJvbSBzZXJ2ZXIuLi48L3A+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxzbG90IHYtaWY9XCIoZmV0Y2hlciA9PT0gbnVsbCB8fCAhZmV0Y2hlci5mZXRjaGluZykgJiYgIWZldGNoaW5nXCI+PC9zbG90PlxyXG4gICAgPHAgY2xhc3M9XCJtb3JlXCIgdi1pZj1cImZldGNoZXIgIT09IG51bGwgJiYgZmV0Y2hlci5tb3JlXCI+PGJ1dHRvbiBAY2xpY2sucHJldmVudD1cImZldGNoTW9yZVwiPk1PUkU8L2J1dHRvbj48L3A+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG4gIC8qKlxyXG4gICAqIEBmaWxlXHJcbiAgICogRmV0Y2hlciBjb21wb25lbnQgZGlzcGxheXMgXCJGZXRjaGluZ1wiIGFuZCBhIFwibW9yZVwiIGJ1dHRvbi5cclxuICAgKi9cclxuXHJcbiAgLyoqXHJcbiAgICogRmV0Y2hlciBmdW5jdGlvbiB1c2VkIHRvIHVwZGF0ZSB0aGlzIG9iamVjdC5cclxuICAgKiBAY29uc3RydWN0b3JcclxuICAgKi9cclxuICBleHBvcnQgbGV0IEZldGNoZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgdGhpcy5tb3JlID0gZmFsc2U7ICAgICAgIC8vIEluZGljYXRlcyB0aGVyZSBpcyBtb3JlIHRvIGZldGNoXHJcbiAgICAgIHRoaXMuZmV0Y2hpbmcgPSBmYWxzZTsgIC8vIFNldCB0cnVlIHdoaWxlIHdlIGFyZSBmZXRjaGluZ1xyXG4gICAgICB0aGlzLmZldGNoZWQgPSBmYWxzZTsgICAvLyBTZXQgdHJ1ZSB3aGVuIHdlIGhhdmUgZmV0Y2hlZCBzb21ldGhpbmcuLi5cclxuXHJcbiAgICAgIHRoaXMuc3RhcnQgPSBmdW5jdGlvbihzaW5nbGUpIHtcclxuICAgICAgICAgIHRoaXMuZmV0Y2hpbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICAgIGlmKHNpbmdsZSAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgIHRoaXMubW9yZSA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmRvbmUgPSBmdW5jdGlvbihzaW5nbGUpIHtcclxuICAgICAgICAgIHRoaXMuZmV0Y2hpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICBpZihzaW5nbGUgIT09IHRydWUpIHtcclxuICAgICAgICAgICAgICB0aGlzLmZldGNoZWQgPSB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnJlc2V0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB0aGlzLm1vcmUgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuZmV0Y2hpbmcgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuZmV0Y2hlZCA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgfTtcclxuXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IHtcclxuICAgICAgcHJvcHM6IHtcclxuICAgICAgICBmZXRjaGVyOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IE9iamVjdCxcclxuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmZXRjaGluZzoge1xyXG4gICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgd2F0Y2g6IHtcclxuICAgICAgICAgICdmZXRjaGVyLmZldGNoaW5nJzogZnVuY3Rpb24odG8sIGZyb20pIHtcclxuICAgICAgICAgICAgICB0aGlzLnNldEZldGNoaW5nKClcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBmZXRjaGluZzogZnVuY3Rpb24odG8sIGZyb20pIHtcclxuICAgICAgICAgICAgICB0aGlzLnNldEZldGNoaW5nKClcclxuICAgICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgZGF0YTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgIHNob3dGZXRjaGluZzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgZGVsYXllZEZldGNoaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgICB0aW1lcjogbnVsbFxyXG4gICAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBtb3VudGVkKCkge1xyXG4gICAgICAgICAgdGhpcy5zZXRGZXRjaGluZygpO1xyXG4gICAgICB9LFxyXG4gICAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgICBmZXRjaE1vcmUoKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LmZldGNoTW9yZSgpO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHNldEZldGNoaW5nKCkge1xyXG4gICAgICAgICAgICAgIC8vIEFyZSB3ZSBjdXJyZW50bHkgZmV0Y2hpbmc/XHJcbiAgICAgICAgICAgICAgbGV0IHNob3dGZXRjaGluZyA9ICh0aGlzLmZldGNoZXIgIT09IG51bGwgJiYgdGhpcy5mZXRjaGVyLmZldGNoaW5nKSB8fCB0aGlzLmZldGNoaW5nO1xyXG4gICAgICAgICAgICAgIGlmKHNob3dGZXRjaGluZyAmJiAhdGhpcy5zaG93RmV0Y2hpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgLy8gRmV0Y2hpbmcgaXMgYmVjb21pbmcgYWN0aXZlXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsYXllZEZldGNoaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgfSwgMTAwMClcclxuICAgICAgICAgICAgICB9IGVsc2UgaWYoIXNob3dGZXRjaGluZyAmJiB0aGlzLnNob3dGZXRjaGluZykge1xyXG4gICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMudGltZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuZGVsYXllZEZldGNoaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHRoaXMuc2hvd0ZldGNoaW5nID0gc2hvd0ZldGNoaW5nO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgfTtcclxuXHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPlxyXG5cclxuQGltcG9ydCAnLi4vLi4vLi4vc2l0ZS9zYXNzL21vZHVsZXMvX2NvbG9ycyc7XHJcblxyXG5kaXYuZmV0Y2hpbmcge1xyXG4gIGhlaWdodDogMjhweDtcclxuICBtYXJnaW46IDFlbSAwO1xyXG5cclxuICBwIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcclxuICAgIGNvbG9yOiAkY29tcDtcclxuICAgIHBhZGRpbmctdG9wOiAycHg7XHJcbiAgfVxyXG59XHJcblxyXG4ubW9yZSB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG5cclxuICBidXR0b24ge1xyXG4gICAgZm9udC1zaXplOiAwLjhlbTtcclxuICAgIGhlaWdodDogMjhweDtcclxuICAgIG1hcmdpbjogMDtcclxuICB9XHJcbn1cclxuXHJcbjwvc3R5bGU+IiwiPCEtLVxyXG4vKipcclxuICogQGZpbGVcclxuICogU2ltcGxlIGNvbXBvbmVudCBmb3Igc2VsZWN0aW5nIGEgdXNlciBpbiB0aGUgc3lzdGVtLlxyXG4gKi9cclxuLS0+XHJcbjx0ZW1wbGF0ZT5cclxuICA8c3Bhbj5cclxuICAgIDxkaXYgY2xhc3M9XCJjbC1pbnB1dFwiPjxpbnB1dCB2LW1vZGVsPVwicXVlcnlcIiB0eXBlPVwidGV4dFwiIG1heGxlbmd0aD1cIjE1MFwiPlxyXG4gICAgICA8YSBAY2xpY2sucHJldmVudD1cImZldGNoKHF1ZXJ5KVwiIGNsYXNzPVwic2VhcmNoZXJcIj48aW1nIDpzcmM9XCJzZWFyY2hlclwiPjwvYT5cclxuICAgICAgPGRpdiB2LWlmPVwicmVzdWx0Lmxlbmd0aCA+IDAgfHwgbm9yZXN1bHRcIiBjbGFzcz1cImNsLXJlc3VsdHNcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2wtcmVzdWx0LWxpc3RcIj5cclxuICAgICAgICAgIDxkaXYgdi1mb3I9XCJ1c2VyIGluIHJlc3VsdFwiIEBjbGljay5wcmV2ZW50PVwic2VsZWN0VXNlcih1c2VyKVwiPjxzcGFuPjxhXHJcbiAgICAgICAgICAgIEBjbGljay5wcmV2ZW50PVwic2VsZWN0VXNlcih1c2VyKVwiPnt7dXNlci51c2VySWR9fTwvYT48L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuPjxhIEBjbGljay5wcmV2ZW50PVwic2VsZWN0VXNlcih1c2VyKVwiPnt7dXNlci5uYW1lfX08L2E+PC9zcGFuPjwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8ZGl2IHYtaWY9XCJub3Jlc3VsdFwiIGNsYXNzPVwic3RhdGVtZW50XCI+Tm8gcmVzdWx0cy4uLjwvZGl2PlxyXG4gICAgICAgIDxkaXYgdi1pZj1cIm1vcmVcIiBjbGFzcz1cInN0YXRlbWVudFwiPi4uLm1vcmUuLi48L2Rpdj5cclxuXHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+IDxhIEBjbGljay5wcmV2ZW50PVwiY2xlYXJcIj48aW1nIDpzcmM9XCJkZWxldGVyXCI+PC9hPlxyXG4gIDwvc3Bhbj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcblxyXG4gIGNvbnN0IExJTUlUID0gMjA7XHJcblxyXG4gICAgZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgICAgIHByb3BzOiBbXHJcbiAgICAgICAgICAgICdzZWxlY3RlZCdcclxuICAgICAgICBdLFxyXG4gICAgICAgIGRhdGE6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcXVlcnk6ICcnLFxyXG4gICAgICAgICAgICAgICAgcmVzdWx0OiBbXSxcclxuICAgICAgICAgICAgICAgIG5vcmVzdWx0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHNlcTogMSxcclxuICAgICAgICAgICAgICAgIGZldGNoZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdGltZXI6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbW9yZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzZWFyY2hlcjogU2l0ZS5yb290ICsgJy92ZW5kb3IvY2wvc2l0ZS9pbWcvc2VhcmNoLnBuZycsXHJcbiAgICAgICAgICAgICAgICBkZWxldGVyOiBTaXRlLnJvb3QgKyAnL3ZlbmRvci9jbC9zaXRlL2ltZy94LnBuZycsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHdhdGNoOiB7XHJcbiAgICAgICAgICAgIHF1ZXJ5KGFmdGVyLCBiZWZvcmUpIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy50aW1lciAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmV0Y2goYWZ0ZXIpO1xyXG4gICAgICAgICAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgICAgICBmZXRjaChxdWVyeSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZldGNoJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhxdWVyeSk7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnRpbWVyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZXIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkKG51bGwpO1xyXG5cclxuICAgICAgICAgICAgICAgIHF1ZXJ5ID0gcXVlcnkudHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgaWYocXVlcnkubGVuZ3RoIDwgMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmV0Y2hlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0ID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2VxKys7XHJcbiAgICAgICAgICAgICAgICBTaXRlLmFwaS5nZXQoJy9hcGkvdXNlcnMnLCB7c2VhcmNoOiBxdWVyeSwgc2VxOiB0aGlzLnNlcSwgbGltaXQ6IExJTUlUfSlcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIXJlc3BvbnNlLmhhc0Vycm9yKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgcHJvdGVjdHMgZnJvbSBvdXQtb2Ytb3JkZXIgcHJvY2Vzc2luZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb2YgcmVzdWx0cyBmcm9tIHRoZSBzZXJ2ZXIuLi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlcSA9IHJlc3BvbnNlLmdldERhdGEoJ3NlcScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoK3NlcS5pZCAhPT0gdGhpcy5zZXEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHJlc3BvbnNlLmdldERhdGEoJ3VzZXJzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihkYXRhICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vcmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmF0dHJpYnV0ZXMuZm9yRWFjaCgodXNlckRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodXNlckRhdGEubW9yZSAhPT0gJ3llcycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB1c2VyID0gbmV3IFVzZXJzLlVzZXIodXNlckRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQucHVzaCh1c2VyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9yZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vcmVzdWx0ID0gKHRoaXMucmVzdWx0Lmxlbmd0aCA9PT0gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2l0ZS50b2FzdCh0aGlzLCByZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgU2l0ZS50b2FzdCh0aGlzLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNlbGVjdFVzZXIodXNlcikgeztcclxuICAgICAgICAgICAgICAgIHRoaXMucXVlcnkgPSB1c2VyLm5hbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3Jlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3JlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkKHVzZXIpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjbGVhcigpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VxKys7IC8vIEp1c3QgaW4gY2FzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQgPSBbXTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9yZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubW9yZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5xdWVyeSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZChudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPlxyXG5cclxuICBhLnNlYXJjaGVyIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogMDtcclxuICAgIHJpZ2h0OiAwO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgbWluLWhlaWdodDogMTAwJTtcclxuICAgIHdpZHRoOiAyMXB4O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgYmFja2dyb3VuZDogI2FhYWFhYTtcclxuXHJcbiAgICBpbWcge1xyXG4gICAgICBoZWlnaHQ6IDE2cHg7XHJcbiAgICAgIHdpZHRoOiAxNnB4O1xyXG4gICAgICB2ZXJ0aWNhbC1hbGlnbjogLTRweDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRpdi5jbC1pbnB1dCB7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICB3aWR0aDogMzAwcHg7XHJcblxyXG5cclxuICAgIGlucHV0IHtcclxuICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2NjY2M7XHJcbiAgICB9XHJcblxyXG4gICAgZGl2LmNsLXJlc3VsdHMge1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIGxlZnQ6IDA7XHJcbiAgICAgIHJpZ2h0OiAwO1xyXG4gICAgICB0b3A6IDEwMCU7XHJcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgIGZvbnQtc2l6ZTogMC44NWVtO1xyXG5cclxuICAgICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgICAgIGJvcmRlci1sZWZ0OiAxcHggc29saWQgYmxhY2s7XHJcbiAgICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIGJsYWNrO1xyXG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgYmxhY2s7XHJcblxyXG4gICAgICBkaXYuY2wtcmVzdWx0LWxpc3Qge1xyXG4gICAgICAgIGRpc3BsYXk6IHRhYmxlO1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG5cclxuXHJcbiAgICAgICAgZGl2IHtcclxuICAgICAgICAgIGRpc3BsYXk6IHRhYmxlLXJvdztcclxuICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjODg4ODg4O1xyXG4gICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG5cclxuICAgICAgICAgIHNwYW4ge1xyXG4gICAgICAgICAgICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xyXG4gICAgICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAwLjVlbSAwLjI1ZW07XHJcblxyXG4gICAgICAgICAgICBhIHtcclxuICAgICAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgICAgICAgICAgICAgY29sb3I6IGJsYWNrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhOmhvdmVyIHtcclxuICAgICAgICAgICAgICBjb2xvcjogIzg4ODg4ODtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHNwYW46Zmlyc3QtY2hpbGQge1xyXG4gICAgICAgICAgICBmb250LXN0eWxlOiBpdGFsaWM7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgc3BhbjpsYXN0LWNoaWxkIHtcclxuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgICAgICAgd2lkdGg6IDk5JTtcclxuXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIGRpdjpmaXJzdC1jaGlsZCwgZGl2Omxhc3QtY2hpbGQge1xyXG4gICAgICAgICAgc3BhbiB7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDAuMjVlbSAwLjI1ZW07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG5cclxuICAgICAgZGl2LnN0YXRlbWVudCB7XHJcbiAgICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICBmb250LXN0eWxlOiBpdGFsaWM7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG48L3N0eWxlPiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiZGl2LmZldGNoaW5nW2RhdGEtdi00M2IyNmJjYl0ge1xcbiAgaGVpZ2h0OiAyOHB4O1xcbiAgbWFyZ2luOiAxZW0gMDtcXG59XFxuZGl2LmZldGNoaW5nIHBbZGF0YS12LTQzYjI2YmNiXSB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICBjb2xvcjogI2M0MTQyNTtcXG4gIHBhZGRpbmctdG9wOiAycHg7XFxufVxcbi5tb3JlW2RhdGEtdi00M2IyNmJjYl0ge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG4ubW9yZSBidXR0b25bZGF0YS12LTQzYjI2YmNiXSB7XFxuICBmb250LXNpemU6IDAuOGVtO1xcbiAgaGVpZ2h0OiAyOHB4O1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcImEuc2VhcmNoZXJbZGF0YS12LWU4ZTdmODQwXSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICByaWdodDogMDtcXG4gIGhlaWdodDogMTAwJTtcXG4gIG1pbi1oZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMjFweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGJhY2tncm91bmQ6ICNhYWFhYWE7XFxufVxcbmEuc2VhcmNoZXIgaW1nW2RhdGEtdi1lOGU3Zjg0MF0ge1xcbiAgaGVpZ2h0OiAxNnB4O1xcbiAgd2lkdGg6IDE2cHg7XFxuICB2ZXJ0aWNhbC1hbGlnbjogLTRweDtcXG59XFxuZGl2LmNsLWlucHV0W2RhdGEtdi1lOGU3Zjg0MF0ge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgd2lkdGg6IDMwMHB4O1xcbn1cXG5kaXYuY2wtaW5wdXQgaW5wdXRbZGF0YS12LWU4ZTdmODQwXSB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2NjY2M7XFxufVxcbmRpdi5jbC1pbnB1dCBkaXYuY2wtcmVzdWx0c1tkYXRhLXYtZThlN2Y4NDBdIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG4gIHRvcDogMTAwJTtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBmb250LXNpemU6IDAuODVlbTtcXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCBibGFjaztcXG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIGJsYWNrO1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGJsYWNrO1xcbn1cXG5kaXYuY2wtaW5wdXQgZGl2LmNsLXJlc3VsdHMgZGl2LmNsLXJlc3VsdC1saXN0W2RhdGEtdi1lOGU3Zjg0MF0ge1xcbiAgZGlzcGxheTogdGFibGU7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuZGl2LmNsLWlucHV0IGRpdi5jbC1yZXN1bHRzIGRpdi5jbC1yZXN1bHQtbGlzdCBkaXZbZGF0YS12LWU4ZTdmODQwXSB7XFxuICBkaXNwbGF5OiB0YWJsZS1yb3c7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzg4ODg4ODtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuZGl2LmNsLWlucHV0IGRpdi5jbC1yZXN1bHRzIGRpdi5jbC1yZXN1bHQtbGlzdCBkaXYgc3BhbltkYXRhLXYtZThlN2Y4NDBdIHtcXG4gIGRpc3BsYXk6IHRhYmxlLWNlbGw7XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG4gIHBhZGRpbmc6IDAuNWVtIDAuMjVlbTtcXG59XFxuZGl2LmNsLWlucHV0IGRpdi5jbC1yZXN1bHRzIGRpdi5jbC1yZXN1bHQtbGlzdCBkaXYgc3BhbiBhW2RhdGEtdi1lOGU3Zjg0MF0ge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgY29sb3I6IGJsYWNrO1xcbn1cXG5kaXYuY2wtaW5wdXQgZGl2LmNsLXJlc3VsdHMgZGl2LmNsLXJlc3VsdC1saXN0IGRpdiBzcGFuIGFbZGF0YS12LWU4ZTdmODQwXTpob3ZlciB7XFxuICBjb2xvcjogIzg4ODg4ODtcXG59XFxuZGl2LmNsLWlucHV0IGRpdi5jbC1yZXN1bHRzIGRpdi5jbC1yZXN1bHQtbGlzdCBkaXYgc3BhbltkYXRhLXYtZThlN2Y4NDBdOmZpcnN0LWNoaWxkIHtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG59XFxuZGl2LmNsLWlucHV0IGRpdi5jbC1yZXN1bHRzIGRpdi5jbC1yZXN1bHQtbGlzdCBkaXYgc3BhbltkYXRhLXYtZThlN2Y4NDBdOmxhc3QtY2hpbGQge1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHdpZHRoOiA5OSU7XFxufVxcbmRpdi5jbC1pbnB1dCBkaXYuY2wtcmVzdWx0cyBkaXYuY2wtcmVzdWx0LWxpc3QgZGl2OmZpcnN0LWNoaWxkIHNwYW5bZGF0YS12LWU4ZTdmODQwXSxcXG5kaXYuY2wtaW5wdXQgZGl2LmNsLXJlc3VsdHMgZGl2LmNsLXJlc3VsdC1saXN0IGRpdjpsYXN0LWNoaWxkIHNwYW5bZGF0YS12LWU4ZTdmODQwXSB7XFxuICBwYWRkaW5nOiAwLjI1ZW0gMC4yNWVtO1xcbn1cXG5kaXYuY2wtaW5wdXQgZGl2LmNsLXJlc3VsdHMgZGl2LnN0YXRlbWVudFtkYXRhLXYtZThlN2Y4NDBdIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbn1cXG5cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiZGl2XCIsXG4gICAgW1xuICAgICAgX3ZtLmRlbGF5ZWRGZXRjaGluZ1xuICAgICAgICA/IF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZmV0Y2hpbmdcIiB9LCBbXG4gICAgICAgICAgICBfYyhcInBcIiwgW192bS5fdihcIkZldGNoaW5nIGZyb20gc2VydmVyLi4uXCIpXSlcbiAgICAgICAgICBdKVxuICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIChfdm0uZmV0Y2hlciA9PT0gbnVsbCB8fCAhX3ZtLmZldGNoZXIuZmV0Y2hpbmcpICYmICFfdm0uZmV0Y2hpbmdcbiAgICAgICAgPyBfdm0uX3QoXCJkZWZhdWx0XCIpXG4gICAgICAgIDogX3ZtLl9lKCksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLmZldGNoZXIgIT09IG51bGwgJiYgX3ZtLmZldGNoZXIubW9yZVxuICAgICAgICA/IF9jKFwicFwiLCB7IHN0YXRpY0NsYXNzOiBcIm1vcmVcIiB9LCBbXG4gICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uZmV0Y2hNb3JlKCRldmVudClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFtfdm0uX3YoXCJNT1JFXCIpXVxuICAgICAgICAgICAgKVxuICAgICAgICAgIF0pXG4gICAgICAgIDogX3ZtLl9lKClcbiAgICBdLFxuICAgIDJcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJzcGFuXCIsIFtcbiAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNsLWlucHV0XCIgfSwgW1xuICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICAgICAgICByYXdOYW1lOiBcInYtbW9kZWxcIixcbiAgICAgICAgICAgIHZhbHVlOiBfdm0ucXVlcnksXG4gICAgICAgICAgICBleHByZXNzaW9uOiBcInF1ZXJ5XCJcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGF0dHJzOiB7IHR5cGU6IFwidGV4dFwiLCBtYXhsZW5ndGg6IFwiMTUwXCIgfSxcbiAgICAgICAgZG9tUHJvcHM6IHsgdmFsdWU6IF92bS5xdWVyeSB9LFxuICAgICAgICBvbjoge1xuICAgICAgICAgIGlucHV0OiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgIGlmICgkZXZlbnQudGFyZ2V0LmNvbXBvc2luZykge1xuICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF92bS5xdWVyeSA9ICRldmVudC50YXJnZXQudmFsdWVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcImFcIixcbiAgICAgICAge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInNlYXJjaGVyXCIsXG4gICAgICAgICAgb246IHtcbiAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgX3ZtLmZldGNoKF92bS5xdWVyeSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFtfYyhcImltZ1wiLCB7IGF0dHJzOiB7IHNyYzogX3ZtLnNlYXJjaGVyIH0gfSldXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF92bS5yZXN1bHQubGVuZ3RoID4gMCB8fCBfdm0ubm9yZXN1bHRcbiAgICAgICAgPyBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNsLXJlc3VsdHNcIiB9LCBbXG4gICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJjbC1yZXN1bHQtbGlzdFwiIH0sXG4gICAgICAgICAgICAgIF92bS5fbChfdm0ucmVzdWx0LCBmdW5jdGlvbih1c2VyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnNlbGVjdFVzZXIodXNlcilcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIF9jKFwic3BhblwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnNlbGVjdFVzZXIodXNlcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KF92bS5fcyh1c2VyLnVzZXJJZCkpXVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgIF9jKFwic3BhblwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnNlbGVjdFVzZXIodXNlcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KF92bS5fcyh1c2VyLm5hbWUpKV1cbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfdm0ubm9yZXN1bHRcbiAgICAgICAgICAgICAgPyBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInN0YXRlbWVudFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIk5vIHJlc3VsdHMuLi5cIilcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIF92bS5tb3JlXG4gICAgICAgICAgICAgID8gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJzdGF0ZW1lbnRcIiB9LCBbX3ZtLl92KFwiLi4ubW9yZS4uLlwiKV0pXG4gICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICBdKVxuICAgICAgICA6IF92bS5fZSgpXG4gICAgXSksXG4gICAgX3ZtLl92KFwiIFwiKSxcbiAgICBfYyhcbiAgICAgIFwiYVwiLFxuICAgICAge1xuICAgICAgICBvbjoge1xuICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICByZXR1cm4gX3ZtLmNsZWFyKCRldmVudClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBbX2MoXCJpbWdcIiwgeyBhdHRyczogeyBzcmM6IF92bS5kZWxldGVyIH0gfSldXG4gICAgKVxuICBdKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Jlc29sdmUtdXJsLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9GZXRjaGVyVnVlLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTQzYjI2YmNiJmxhbmc9c2NzcyZzY29wZWQ9dHJ1ZSZcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIGFkZCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKS5kZWZhdWx0XG52YXIgdXBkYXRlID0gYWRkKFwiNDUxZWMxYTRcIiwgY29udGVudCwgZmFsc2UsIHt9KTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVzb2x2ZS11cmwtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0ZldGNoZXJWdWUudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NDNiMjZiY2ImbGFuZz1zY3NzJnNjb3BlZD10cnVlJlwiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Jlc29sdmUtdXJsLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9GZXRjaGVyVnVlLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTQzYjI2YmNiJmxhbmc9c2NzcyZzY29wZWQ9dHJ1ZSZcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Jlc29sdmUtdXJsLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Vc2VyU2VsZWN0b3JWdWUudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9ZThlN2Y4NDAmbGFuZz1zY3NzJnNjb3BlZD10cnVlJlwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgYWRkID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpLmRlZmF1bHRcbnZhciB1cGRhdGUgPSBhZGQoXCJmZGVmZThkYVwiLCBjb250ZW50LCBmYWxzZSwge30pO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuIC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG4gaWYoIWNvbnRlbnQubG9jYWxzKSB7XG4gICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZXNvbHZlLXVybC1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vVXNlclNlbGVjdG9yVnVlLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPWU4ZTdmODQwJmxhbmc9c2NzcyZzY29wZWQ9dHJ1ZSZcIiwgZnVuY3Rpb24oKSB7XG4gICAgIHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZXNvbHZlLXVybC1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vVXNlclNlbGVjdG9yVnVlLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPWU4ZTdmODQwJmxhbmc9c2NzcyZzY29wZWQ9dHJ1ZSZcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsIi8qKlxyXG4gKiBAZmlsZVxyXG4gKiBUaGUgbWFpbiB1c2Vycy5qcyBlbnRyeSBwb2ludC5cclxuICpcclxuICogRG9lcyBub3QgaW5jbHVkZSBjb25zb2xlIGNvbXBvbmVudHMuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtVc2Vyc0ZhY3Rvcnl9IGZyb20gJy4vanMvVXNlcnMvVXNlcnNGYWN0b3J5LmpzJztcclxuXHJcbmltcG9ydCBGZXRjaGVyVnVlIGZyb20gJy4vanMvTGliL0ZldGNoZXJWdWUudnVlJztcclxuaW1wb3J0IFVzZXJTZWxlY3RvclZ1ZSBmcm9tICcuL2pzL0xpYi9Vc2VyU2VsZWN0b3JWdWUudnVlJztcclxuaW1wb3J0IHtVc2VyfSBmcm9tICcuL2pzL1VzZXJzL1VzZXIuanMnO1xyXG5cclxuZXhwb3J0IHtGZXRjaGVyVnVlfTtcclxuZXhwb3J0IHtVc2VyU2VsZWN0b3JWdWV9O1xyXG5leHBvcnQge1VzZXJ9O1xyXG5cclxubGV0IFVzZXJzID0gVXNlcnNGYWN0b3J5LmNyZWF0ZShTaXRlLlNpdGUpO1xyXG5leHBvcnQge1VzZXJzfTtcclxuIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9GZXRjaGVyVnVlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD00M2IyNmJjYiZzY29wZWQ9dHJ1ZSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9GZXRjaGVyVnVlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vRmV0Y2hlclZ1ZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmltcG9ydCBzdHlsZTAgZnJvbSBcIi4vRmV0Y2hlclZ1ZS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD00M2IyNmJjYiZsYW5nPXNjc3Mmc2NvcGVkPXRydWUmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcIjQzYjI2YmNiXCIsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcY2hhcmxcXFxcRG9jdW1lbnRzXFxcXENsYXNzZXNcXFxcQ1NFMzIwXFxcXHdlYlxcXFxub2RlX21vZHVsZXNcXFxcdnVlLWhvdC1yZWxvYWQtYXBpXFxcXGRpc3RcXFxcaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnNDNiMjZiY2InLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnNDNiMjZiY2InLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL0ZldGNoZXJWdWUudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTQzYjI2YmNiJnNjb3BlZD10cnVlJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzQzYjI2YmNiJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJ2ZW5kb3IvY2wvdXNlcnMvanMvTGliL0ZldGNoZXJWdWUudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0yIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRmV0Y2hlclZ1ZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0ZldGNoZXJWdWUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Jlc29sdmUtdXJsLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9GZXRjaGVyVnVlLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTQzYjI2YmNiJmxhbmc9c2NzcyZzY29wZWQ9dHJ1ZSZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Jlc29sdmUtdXJsLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9GZXRjaGVyVnVlLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTQzYjI2YmNiJmxhbmc9c2NzcyZzY29wZWQ9dHJ1ZSZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9GZXRjaGVyVnVlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD00M2IyNmJjYiZzY29wZWQ9dHJ1ZSZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vVXNlclNlbGVjdG9yVnVlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1lOGU3Zjg0MCZzY29wZWQ9dHJ1ZSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9Vc2VyU2VsZWN0b3JWdWUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9Vc2VyU2VsZWN0b3JWdWUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5pbXBvcnQgc3R5bGUwIGZyb20gXCIuL1VzZXJTZWxlY3RvclZ1ZS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD1lOGU3Zjg0MCZsYW5nPXNjc3Mmc2NvcGVkPXRydWUmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcImU4ZTdmODQwXCIsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcY2hhcmxcXFxcRG9jdW1lbnRzXFxcXENsYXNzZXNcXFxcQ1NFMzIwXFxcXHdlYlxcXFxub2RlX21vZHVsZXNcXFxcdnVlLWhvdC1yZWxvYWQtYXBpXFxcXGRpc3RcXFxcaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnZThlN2Y4NDAnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnZThlN2Y4NDAnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL1VzZXJTZWxlY3RvclZ1ZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9ZThlN2Y4NDAmc2NvcGVkPXRydWUmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignZThlN2Y4NDAnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInZlbmRvci9jbC91c2Vycy9qcy9MaWIvVXNlclNlbGVjdG9yVnVlLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1VzZXJTZWxlY3RvclZ1ZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1VzZXJTZWxlY3RvclZ1ZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVzb2x2ZS11cmwtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1VzZXJTZWxlY3RvclZ1ZS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD1lOGU3Zjg0MCZsYW5nPXNjc3Mmc2NvcGVkPXRydWUmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZXNvbHZlLXVybC1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vVXNlclNlbGVjdG9yVnVlLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPWU4ZTdmODQwJmxhbmc9c2NzcyZzY29wZWQ9dHJ1ZSZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Vc2VyU2VsZWN0b3JWdWUudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWU4ZTdmODQwJnNjb3BlZD10cnVlJlwiIiwiLyoqXHJcbiAqIEBmaWxlXHJcbiAqIFZ1ZXggc3RvcmUgbW9kdWxlIHRoYXQgbWFpbnRhaW5zIGEgY29sbGVjdGlvbiBvZiBzeXN0ZW0gdXNlcnMuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtGZXRjaGVyfSBmcm9tICcuL0xpYi9GZXRjaGVyVnVlLnZ1ZSc7XHJcbmltcG9ydCB7VXNlcn0gZnJvbSAnLi9Vc2Vycy9Vc2VyLmpzJztcclxuXHJcbmNvbnN0IExJTUlUID0gNTAwO1xyXG5cclxuZXhwb3J0IGxldCBTdG9yZU1vZHVsZVVzZXJzID0gZnVuY3Rpb24oKSB7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYSBWdWV4IHN0b3JlIG1vZHVsZSB0byBzdG9yZSB1c2Vycy5cclxuICpcclxuICogVGhpcyB3aWxsIHdvcmsgZm9yIGJvdGggVXNlcnMgYW5kIGNvdXJzZSBNZW1iZXJzLCBzaW5jZSB0aGV5XHJcbiAqIHVzZSB0aGUgc2FtZSBBUEkuXHJcbiAqIEBwYXJhbSBhcGkgJy9hcGkvdXNlcnMnIGZvciAnL2FwaS9jb3Vyc2UvbWVtYmVycydcclxuICogQHBhcmFtIHF1ZXJ5IEl0ZW1zIHRvIGFkZCB0byB0aGUgcXVlcnkgKHNlbWVzdGVyIGFuZCBzZWN0aW9uIGZvciBtZW1iZXJzKS5cclxuICogQHBhcmFtIHRvSWQgTWFwcGluZyBmcm9tIGEgdXNlciB0byB0aGUgSUQgdG8gdXNlIGZvciB0aGUgY29sbGVjdGlvbi5cclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5TdG9yZU1vZHVsZVVzZXJzLmNyZWF0ZSA9IGZ1bmN0aW9uKGFwaSwgdG9JZCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuYW1lc3BhY2VkOiB0cnVlLFxyXG4gICAgICAgIHN0YXRlOiB7XHJcbiAgICAgICAgICAgIHVzZXJzOiBbXSxcclxuICAgICAgICAgICAgZmV0Y2hlcjogbmV3IEZldGNoZXIoKSwgICAgIC8vIEluZGljYXRlcyB0aGUgZmV0Y2hpbmcgc3RhdHVzXHJcbiAgICAgICAgICAgIHF1ZXJ5OiB7fVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbXV0YXRpb25zOiB7XHJcbiAgICAgICAgICAgIGFkZChzdGF0ZSwgdXNlcikge1xyXG4gICAgICAgICAgICAgICAgc3RhdGUudXNlcnMucHVzaCh1c2VyKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbW9yZShzdGF0ZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlLmZldGNoZXIubW9yZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmZXRjaFN0YXJ0KHN0YXRlLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgc3RhdGUuZmV0Y2hlci5zdGFydCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZldGNoRG9uZShzdGF0ZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlLmZldGNoZXIuZG9uZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlc2V0KHN0YXRlLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgc3RhdGUuZmV0Y2hlci5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgc3RhdGUudXNlcnMgPSBbXTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcXVlcnkoc3RhdGUsIHZhbHVlKXtcclxuICAgICAgICAgICAgICAgIHN0YXRlLnF1ZXJ5ID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVwZGF0ZShzdGF0ZSwgdXNlcikge1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgbm90aGluZyBpcyBmZXRjaGVkLCBub3RoaW5nIG5lZWQgYmUgdXBkYXRlZFxyXG4gICAgICAgICAgICAgICAgaWYoIXN0YXRlLmZldGNoZXIuZmV0Y2hlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgbGlzdCBpcyBlbXB0eSwgd2UgZm9yY2UgYSByZWxvYWQgZnJvbSB0aGUgc2VydmVyXHJcbiAgICAgICAgICAgICAgICBpZihzdGF0ZS51c2Vycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5mZXRjaGVyLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUudXNlcnMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRG9lcyB0aGUgdXNlciBleGlzdCByaWdodCBub3c/XHJcbiAgICAgICAgICAgICAgICBsZXQgaT0wO1xyXG4gICAgICAgICAgICAgICAgZm9yKCA7IGk8c3RhdGUudXNlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih0b0lkKHVzZXIpID09PSB0b0lkKHN0YXRlLnVzZXJzW2ldKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBoYXZlIGZvdW5kIGl0LCBzd2FwIGl0IGluXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLnVzZXJzW2ldID0gdXNlcjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHN0YXRlLmZldGNoZXIubW9yZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2luY2UgdGhlIG5hbWUgbWF5IGhhdmUgY2hhbmdlZCwgdGhlIHBvc2l0aW9uIGluIHRoZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGlzdCBjb3VsZCBhbHNvIGNoYW5nZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKFVzZXIuY29tcGFyZSh1c2VyLCBzdGF0ZS51c2Vyc1tzdGF0ZS51c2Vycy5sZW5ndGgtMV0pID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQcm9iYWJseSBvZmYgdGhlIGVuZCwgZm9yY2UgYSByZWxvYWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZS5mZXRjaGVyLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUudXNlcnMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZS51c2Vycy5zb3J0KFVzZXIuY29tcGFyZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgZGlkIG5vdCBmaW5kIHRoZSB1c2VyLCBpdCBtdXN0IHN0aWxsXHJcbiAgICAgICAgICAgICAgICAvLyBiZSB3YWl0aW5nIHRvIGJlIGZldGNoZWQgZnJvbSB0aGUgc2VydmVyLlxyXG4gICAgICAgICAgICAgICAgc3RhdGUuZmV0Y2hlci5tb3JlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbmV3KHN0YXRlLCB1c2VyKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBJZiBub3RoaW5nIGlzIGZldGNoZWQsIG5vdGhpbmcgbmVlZCBiZSB1cGRhdGVkXHJcbiAgICAgICAgICAgICAgICBpZighc3RhdGUuZmV0Y2hlci5mZXRjaGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBsaXN0IGlzIGVtcHR5LCB3ZSBhcmUgdGhlIG9uZSFcclxuICAgICAgICAgICAgICAgIGlmKHN0YXRlLnVzZXJzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLnVzZXJzLnB1c2godXNlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKCFzdGF0ZS5mZXRjaGVyLm1vcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBXZSBoYXZlIGl0IGFsbCwgc28gd2UgY2FuIGFwcGVuZCwgc29ydCwgYW5kIHdlIGFyZSBkb25lXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUudXNlcnMucHVzaCh1c2VyKTtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZS51c2Vycy5zb3J0KFVzZXIuY29tcGFyZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKFVzZXIuY29tcGFyZSh1c2VyLCBzdGF0ZS51c2Vyc1tzdGF0ZS51c2Vycy5sZW5ndGgtMV0pID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBQcm9iYWJseSBvZmYgdGhlIGVuZCwgZm9yY2UgYSByZWxvYWRcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5mZXRjaGVyLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUudXNlcnMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc3RhdGUudXNlcnMucHVzaCh1c2VyKTtcclxuICAgICAgICAgICAgICAgIHN0YXRlLnVzZXJzLnNvcnQoVXNlci5jb21wYXJlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGVsZXRlKHN0YXRlLCBpZCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGF0ZS51c2Vycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0b0lkKHN0YXRlLnVzZXJzW2ldKSA9PT0gaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUudXNlcnMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGFjdGlvbnM6IHtcclxuICAgICAgICAgICAgLy8gSW5pdGlhbCBmZXRjaCBmcm9tIEFQSVxyXG4gICAgICAgICAgICBmZXRjaCh7ZGlzcGF0Y2gsIHN0YXRlfSkge1xyXG4gICAgICAgICAgICAgICAgaWYoc3RhdGUuZmV0Y2hlci5mZXRjaGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGRpc3BhdGNoKCdtb3JlJyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIEZldGNoIG1vcmVcclxuICAgICAgICAgICAgbW9yZSh7Y29tbWl0LCBzdGF0ZX0pIHtcclxuICAgICAgICAgICAgICAgIGlmKHN0YXRlLmZldGNoZXIuZmV0Y2hlZCAmJiAhc3RhdGUuZmV0Y2hlci5tb3JlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbW1pdCgnZmV0Y2hTdGFydCcpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHEgPSB7bGltaXQ6IExJTUlULCBvZmZzZXQ6IHN0YXRlLnVzZXJzLmxlbmd0aH07XHJcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHEsIHN0YXRlLnF1ZXJ5KTtcclxuXHJcbiAgICAgICAgICAgICAgICBTaXRlLmFwaS5nZXQoYXBpLCBxKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZighcmVzcG9uc2UuaGFzRXJyb3IoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHJlc3BvbnNlLmdldERhdGEoJ3VzZXJzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihkYXRhICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vcmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmF0dHJpYnV0ZXMuZm9yRWFjaCgodXNlck9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih1c2VyT2JqLm1vcmUgPT09ICd5ZXMnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3JlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1pdCgnYWRkJywgbmV3IFVzZXJzLlVzZXIodXNlck9iaikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWl0KCdtb3JlJywgbW9yZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWl0KCdmZXRjaERvbmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2l0ZS50b2FzdCh0aGlzLCByZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgU2l0ZS50b2FzdCh0aGlzLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldCh7Y29tbWl0LCBzdGF0ZX0sIHF1ZXJ5KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIC8vIFdlIG1heSBoYXZlIHRoZSBkZXNpcmVkIHVzZXIgbG9hZGVkIG9yIHdlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gLy8gbWF5IGhhdmUgdG8gZ28gZ2V0IHRoZW0uXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IHByZXYgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGZvcihsZXQgaT0wOyBpPHN0YXRlLnVzZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGxldCB1c2VyID0gc3RhdGUudXNlcnNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGlmKHRvSWQodXNlcikgPT09IGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBpZigoaSsxKSA8IHN0YXRlLnVzZXJzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIHVzZXIubmV4dCA9IHN0YXRlLnVzZXJzW2krMV07XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGlmKHByZXYgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICB1c2VyLnByZXYgPSBwcmV2O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICByZXNvbHZlKHVzZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgcHJldiA9IHVzZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBHbyBnZXQgdGhlIHVzZXJcclxuICAgICAgICAgICAgICAgICAgICBjb21taXQoJ2ZldGNoU3RhcnQnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBxdWVyeS5wcmV2bmV4dCA9IDE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFNpdGUuYXBpLmdldChhcGksIHF1ZXJ5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFyZXNwb25zZS5oYXNFcnJvcigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHJlc3BvbnNlLmdldERhdGEoJ3VzZXJzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0YSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihkYXRhLmF0dHJpYnV0ZXMubGVuZ3RoIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCdVc2VyIGRvZXMgbm90IGV4aXN0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1pdCgnZmV0Y2hEb25lJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdXNlciA9IG5ldyBVc2Vycy5Vc2VyKGRhdGEuYXR0cmlidXRlc1swXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJldiA9IHJlc3BvbnNlLmdldERhdGEoJ3ByZXYtdXNlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocHJldiAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIucHJldiA9IG5ldyBVc2Vycy5Vc2VyKHByZXYuYXR0cmlidXRlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dCA9IHJlc3BvbnNlLmdldERhdGEoJ25leHQtdXNlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV4dCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIubmV4dCA9IG5ldyBVc2Vycy5Vc2VyKG5leHQuYXR0cmlidXRlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh1c2VyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaXRlLnRvYXN0KHRoaXMsIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNpdGUudG9hc3QodGhpcywgZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdXBkYXRlKHtjb21taXQsIHN0YXRlfSwgcGF5bG9hZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBTaXRlLmFwaS5wb3N0KGFwaSArICcvdXBkYXRlJywgcGF5bG9hZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZighcmVzcG9uc2UuaGFzRXJyb3IoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZ2V0RGF0YSgndXBkYXRlZC11c2VyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHVzZXIgPSBuZXcgVXNlcnMuVXNlcihkYXRhLmF0dHJpYnV0ZXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdXNlciBpZiB3ZSBoYXZlIGl0IHN0b3JlZCBsb2NhbGx5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYW5kIHRoZSBuYW1lIGhhcyBub3QgY2hhbmdlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1pdCgndXBkYXRlJywgdXNlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh1c2VyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNpdGUudG9hc3QodGhpcywgZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbmV3KHtjb21taXQsIHN0YXRlfSwgcGF5bG9hZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBTaXRlLmFwaS5wb3N0KGFwaSArICcvbmV3JywgcGF5bG9hZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZighcmVzcG9uc2UuaGFzRXJyb3IoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZ2V0RGF0YSgnbmV3LXVzZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdXNlciA9IG5ldyBVc2Vycy5Vc2VyKGRhdGEuYXR0cmlidXRlcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1pdCgnbmV3JywgdXNlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh1c2VyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlamVjdCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaXRlLnRvYXN0KHRoaXMsIGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRlbGV0ZSh7Y29tbWl0LCBzdGF0ZX0sIHBheWxvYWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgU2l0ZS5hcGkucG9zdChhcGkgKyAnL2RlbGV0ZScsIHtpZDogcGF5bG9hZC5pZH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5oYXNFcnJvcigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWl0KCdkZWxldGUnLCBwYXlsb2FkLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaXRlLnRvYXN0KHRoaXMsIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNpdGUudG9hc3QodGhpcywgZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iLCIvKipcclxuICogQGZpbGVcclxuICogUGVybWlzc2lvbnMgbWFuYWdlbWVudCBjb21wb25lbnRcclxuICovXHJcblxyXG5leHBvcnQgY29uc3QgUGVybWlzc2lvbnMgPSBmdW5jdGlvbihkYXRhKSB7XHJcblx0dGhpcy5wZXJtaXNzaW9ucyA9IGRhdGE7XHJcblxyXG5cdC8qKlxyXG5cdCAqIERldGVybWluZSB0aGUgYXRMZWFzdCBwZXJtaXNzaW9uIGZvciBhIGdpdmVuXHJcblx0ICogY29uZmlndXJhYmxlIHBlcm1pc3Npb24uXHJcblx0ICogQHBhcmFtIHRhZyBUYWcgdGhhdCBkZWZpbmVzIHRoZSBwZXJtaXNzaW9uIGNvbmZpZ3VyYXRpb25cclxuXHQgKiBAcGFyYW0gZGVmIERlZmF1bHQgdmFsdWUgaWYgcGVybWlzc2lvbiBub3Qgc2V0XHJcblx0ICogQHJldHVybnMgeyp9XHJcblx0ICovXHJcblx0dGhpcy5hdExlYXN0ID0gZnVuY3Rpb24odGFnLCBkZWYpIHtcclxuXHRcdGlmKHRoaXMucGVybWlzc2lvbnNbdGFnXSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLnBlcm1pc3Npb25zW3RhZ107XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGRlZjtcclxuXHR9XHJcbn1cclxuIiwiLyoqXHJcbiAqIEBmaWxlXHJcbiAqIFRoZSBWdWV4IHN0b3JlIG1vZHVsZSB0aGF0IG1haW50YWlucyB0aGUgY3VycmVudCBzeXN0ZW0gdXNlci5cclxuICovXHJcblxyXG5pbXBvcnQge1VzZXJ9IGZyb20gJy4vVXNlci5qcyc7XHJcblxyXG5cclxuXHJcbmV4cG9ydCBsZXQgU3RvcmVNb2R1bGVVc2VyID0ge1xyXG4gICAgbmFtZXNwYWNlZDogdHJ1ZSxcclxuICAgIHN0YXRlOiB7XHJcbiAgICAgICAgdXNlcjogbnVsbFxyXG4gICAgfSxcclxuICAgIG11dGF0aW9uczoge1xyXG4gICAgICAgIHNldChzdGF0ZSwgdXNlcikge1xyXG4gICAgICAgICAgICBpZih1c2VyIGluc3RhbmNlb2YgVXNlcikge1xyXG4gICAgICAgICAgICAgICAgc3RhdGUudXNlciA9IHVzZXI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblx0ICAgICAgICAgICAgc3RhdGUudXNlciA9IG5ldyBVc2VyKHVzZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIiwiLyoqXHJcbiAqIEBmaWxlXHJcbiAqIFJlcHJlc2VudHMgYSB1c2VyIGluIHRoZSBzeXN0ZW1cclxuICovXHJcblxyXG5sZXQgVXNlciA9IGZ1bmN0aW9uKGpzb24pIHtcclxuXHJcbiAgICAvLy8gVGhlIHVzZXIgcm9sZSAtIGxvY2FsIHNvIHdlIGNhbiBwcm90ZWN0IGl0IHdpdGggZ2V0dGVyL3NldHRlclxyXG4gICAgbGV0IHJvbGUgPSAnRyc7XHJcblxyXG4gICAgLy8gSW5zdGFsbGVkIG1lbWJlcnNoaXBcclxuICAgIGxldCBtZW1iZXIgPSBudWxsO1xyXG5cclxuICAgIGlmKGpzb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlmKHR5cGVvZihqc29uKSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAganNvbiA9IEpTT04ucGFyc2UoanNvbilcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaWQgPSBqc29uLmlkO1xyXG4gICAgICAgIHJvbGUgPSBqc29uLnJvbGU7XHJcbiAgICAgICAgdGhpcy5uYW1lID0ganNvbi5uYW1lO1xyXG4gICAgICAgIHRoaXMuZW1haWwgPSBqc29uLmVtYWlsO1xyXG4gICAgICAgIHRoaXMudXNlcklkID0ganNvbi51c2VyO1xyXG5cclxuICAgICAgICAvLyBJbnN0YWxsZWQgbWVtYmVyc2hpcFxyXG4gICAgICAgIG1lbWJlciA9IFVzZXIuaW5zdGFudGlhdGVNZW1iZXIoanNvbik7XHJcbiAgICAgICAgaWYobWVtYmVyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIG1lbWJlci51c2VyID0gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmlkID0gMDtcclxuICAgICAgICByb2xlID0gJ0cnO1xyXG4gICAgICAgIHRoaXMubmFtZSA9ICcnO1xyXG4gICAgICAgIHRoaXMuZW1haWwgPSAnJztcclxuICAgICAgICB0aGlzLnVzZXJJZCA9ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnbWVtYmVyJywge1xyXG4gICAgICAgIGdldCgpIHtyZXR1cm4gbWVtYmVyfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gdGhlIGVmZmVjdGl2ZSByb2xlIGZvciB0aGUgdXNlci5cclxuICAgICAqIFRoaXMgaXMgdGhlIHVzZXIncyByb2xlIHVubGVzcyB0aGUgdXNlclxyXG4gICAgICogaGFzIGEgbWVtYmVyc2hpcCwgaW4gd2hpY2ggY2FzZSBpdCBpcyB0aGVcclxuICAgICAqIG1lbWJlcnNoaXAgcm9sZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICB0aGlzLnJvbGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZihtZW1iZXIgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1lbWJlci5yb2xlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcm9sZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNldFVzZXJSb2xlID0gZnVuY3Rpb24oX3JvbGUpIHtcclxuICAgICAgICByb2xlID0gX3JvbGU7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy51c2VyUm9sZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiByb2xlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBtZW1iZXJzaGlwIGZvciB0aGlzIHVzZXJcclxuICAgICAqIEBwYXJhbSBNZW1iZXJzaGlwIG1lbWJlclxyXG4gICAgICovXHJcbiAgICB0aGlzLnNldE1lbWJlciA9IGZ1bmN0aW9uKF9tZW1iZXIpIHtcclxuICAgICAgICBtZW1iZXIgPSBfbWVtYmVyO1xyXG4gICAgICAgIGlmKG1lbWJlciAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBtZW1iZXIudXNlciA9IHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuVXNlci5HVUVTVCA9ICdHJztcclxuVXNlci5VU0VSID0gJ1UnO1xyXG5Vc2VyLlNUQUZGID0gJ1MnO1xyXG5Vc2VyLkFETUlOID0gJ0EnO1xyXG5cclxuXHJcblVzZXIuZ2V0VXNlclJvbGVzID0gZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgcm9sZXMgPSB7fTtcclxuICAgIHJvbGVzW1VzZXIuR1VFU1RdID0ge25hbWU6ICdHdWVzdCcsIHByaW9yaXR5OiAxfTtcclxuICAgIHJvbGVzW1VzZXIuVVNFUl0gPSB7bmFtZTogJ1VzZXInLCBwcmlvcml0eTogMn07XHJcbiAgICByb2xlc1tVc2VyLlNUQUZGXSA9IHtuYW1lOiAnU3RhZmYnLCBwcmlvcml0eTogM307XHJcbiAgICByb2xlc1tVc2VyLkFETUlOXSA9IHtuYW1lOiAnQWRtaW4nLCBwcmlvcml0eTogNH07XHJcblxyXG4gICAgcmV0dXJuIHJvbGVzO1xyXG59XHJcblxyXG5Vc2VyLnByb3RvdHlwZS5nZXRVc2VyUm9sZXMgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiBVc2VyLmdldFVzZXJSb2xlcygpO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0IHRoZSByb2xlcyBmb3IgdGhpcyB1c2VyLiBNZW1iZXJzaGlwIHJvbGVzIHRha2UgcHJpb3JpdHlcclxuICogb3ZlciByb2xlcyBmb3IganVzdCBhIHVzZXIgd2hvIGlzIG5vdCBhIG1lbWJlci5cclxuICovXHJcblVzZXIucHJvdG90eXBlLmdldFJvbGVzID0gZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgbWVtYmVyID0gdGhpcy5tZW1iZXI7XHJcbiAgICBpZihtZW1iZXIgIT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gbWVtYmVyLmdldFJvbGVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFVzZXIuZ2V0VXNlclJvbGVzKCk7XHJcbn1cclxuXHJcblVzZXIucHJvdG90eXBlLmF0TGVhc3QgPSBmdW5jdGlvbihhdExlYXN0KSB7XHJcbiAgICBsZXQgcm9sZSA9IHRoaXMucm9sZSgpO1xyXG4gICAgbGV0IHJvbGVzID0gdGhpcy5nZXRSb2xlcygpO1xyXG4gICAgaWYocm9sZXMuaGFzT3duUHJvcGVydHkoYXRMZWFzdCkpIHtcclxuICAgICAgICByZXR1cm4gcm9sZXNbcm9sZV0ucHJpb3JpdHkgPj0gcm9sZXNbYXRMZWFzdF0ucHJpb3JpdHk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblVzZXIucHJvdG90eXBlLmdldFJvbGVQcmlvcml0eSA9IGZ1bmN0aW9uKHJvbGUpIHtcclxuICAgIGxldCByb2xlcyA9IHRoaXMuZ2V0Um9sZXMoKTtcclxuICAgIGlmKHJvbGVzLmhhc093blByb3BlcnR5KHJvbGUpKSB7XHJcbiAgICAgICAgcmV0dXJuIHJvbGVzW3JvbGVdLnByaW9yaXR5O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAwO1xyXG59XHJcblxyXG5Vc2VyLnByb3RvdHlwZS5kaXNwbGF5TmFtZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IGNvbW1hID0gdGhpcy5uYW1lLmluZGV4T2YoJywnKTtcclxuICAgIGlmKGNvbW1hIDwgMCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGxhc3QgPSB0aGlzLm5hbWUuc3Vic3RyKDAsIGNvbW1hKTtcclxuICAgIGxldCBmaXJzdCA9IHRoaXMubmFtZS5zdWJzdHIoY29tbWErMSkudHJpbSgpO1xyXG5cclxuICAgIHJldHVybiBmaXJzdCArICcgJyArIGxhc3Q7XHJcbn1cclxuXHJcblVzZXIucHJvdG90eXBlLnVzZXJSb2xlTmFtZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3Qgcm9sZXMgPSB0aGlzLmdldFVzZXJSb2xlcygpO1xyXG4gICAgbGV0IHJvbGUgPSB0aGlzLnVzZXJSb2xlKCk7XHJcbiAgICBsZXQgciA9IHJvbGVzW3JvbGVdO1xyXG4gICAgaWYociAhPT0gdW5kZWZpbmVkKSB7XHJcblx0ICAgIHJldHVybiByb2xlc1tyb2xlXS5uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAnSW52YWxpZCc7XHJcbn1cclxuXHJcblVzZXIucHJvdG90eXBlLnJvbGVOYW1lID0gZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCByb2xlcyA9IHRoaXMuZ2V0Um9sZXMoKTtcclxuICAgIGxldCByb2xlID0gdGhpcy5yb2xlKCk7XHJcbiAgICByZXR1cm4gcm9sZXNbcm9sZV0ubmFtZTtcclxufVxyXG5cclxuVXNlci5jb21wYXJlID0gZnVuY3Rpb24oYSwgYikge1xyXG4gICAgbGV0IGFuID0gYS5uYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBsZXQgYm4gPSBiLm5hbWUudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICBpZihhbiA8IGJuKSB7XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKGFuID4gYm4pIHtcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYS5pZCAtIGIuaWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbnN0YW50aWF0ZSBhIE1lbWJlcnNoaXAgb2JqZWN0IGZvciB0aGUgdXNlci5cclxuICogVGhpcyB3aWxsIGJlIHJlcGxhY2VkIGJ5IGEgcGx1Z2luIHRoYXQgYWRkc1xyXG4gKiBzdXBwb3J0IGZvciBtZW1iZXJzaGlwcy5cclxuICogQHBhcmFtIGRhdGEgbm9ybWFsbHkgaW4gdGhlIGZvcm1hdCB0aGUgUEhQIEpTT04gcmVwcmVzZW50YXRpb25cclxuICogQHJldHVybnMge251bGx9XHJcbiAqL1xyXG5Vc2VyLmluc3RhbnRpYXRlTWVtYmVyID0gZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFVzZXI7XHJcbmV4cG9ydCB7VXNlcn07IiwiLyoqXHJcbiAqIEBmaWxlXHJcbiAqIEZhY3RvcnkgdGhhdCBjcmVhdGVzIHRoZSBVc2VycyBvYmplY3RcclxuICovXHJcblxyXG5pbXBvcnQge1VzZXJ9IGZyb20gJy4vVXNlcic7XHJcbmltcG9ydCB7U3RvcmVNb2R1bGVVc2VyfSBmcm9tICcuL1N0b3JlTW9kdWxlVXNlcic7XHJcbmltcG9ydCB7U3RvcmVNb2R1bGVVc2Vyc30gZnJvbSAnLi4vU3RvcmVNb2R1bGVVc2Vycyc7XHJcbmltcG9ydCB7UGVybWlzc2lvbnN9IGZyb20gJy4vUGVybWlzc2lvbnMnO1xyXG5cclxubGV0IFVzZXJzRmFjdG9yeSA9IGZ1bmN0aW9uKCkge31cclxuY29uc29sZS5sb2coXCJVc2Vyc0ZhY3RvcnkgbG9hZGVkXCIpO1xyXG4vKipcclxuICogRmFjdG9yeSBtZXRob2QgdG8gY3JlYXRlIGEgVXNlcnMgb2JqZWN0LlxyXG4gKlxyXG4gKiBUaGlzIGFsbG93cyBmb3IgaW5qZWN0aW9uIG9mIHRoZSBzdG9yZSBmb3IgdGVzdGluZyBwdXJwb3Nlcy5cclxuICogQHBhcmFtIHN0b3JlIFZ1ZXggc3RvcmUgb2JqZWN0XHJcbiAqIEByZXR1cm5zIHtVc2Vyc30gb2JqZWN0LlxyXG4gKi9cclxuVXNlcnNGYWN0b3J5LmNyZWF0ZSA9IGZ1bmN0aW9uKHNpdGUpIHtcclxuXHJcbiAgICBsZXQgVXNlcnMgPSBmdW5jdGlvbigpIHtcclxuICAgIH1cclxuXHJcbiAgICAvL1xyXG4gICAgLy8gRXhwb3J0ZWQgY29tcG9uZW50cyBhbmQgY29uc3RhbnRzXHJcbiAgICAvL1xyXG4gICAgVXNlcnMuTVVTVF9QUk9WSURFX1VTRVJJRF9PUl9FTUFJTCA9IDEwMTtcclxuICAgIFVzZXJzLlBBU1NXT1JEU19NVVNUX01BVENIID0gMTAyO1xyXG4gICAgVXNlcnMuRFVQTElDQVRFX1VTRVIgPSAxMDM7XHJcbiAgICBVc2Vycy5EVVBMSUNBVEVfRU1BSUwgPSAxMDQ7XHJcblxyXG5cclxuICAgIC8vXHJcbiAgICAvLyBJbnN0YWxsIHRoZSB1c2VycyBzdG9yZSBtb2R1bGVzXHJcbiAgICAvL1xyXG4gICAgbGV0IHN0b3JlID0gc2l0ZS5zdG9yZTtcclxuXHJcbiAgICBpZihzdG9yZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgc3RvcmUucmVnaXN0ZXJNb2R1bGUoJ3VzZXInLCBTdG9yZU1vZHVsZVVzZXIpO1xyXG4gICAgICAgIHN0b3JlLnJlZ2lzdGVyTW9kdWxlKCd1c2VycycsIFN0b3JlTW9kdWxlVXNlcnMuY3JlYXRlKFxyXG4gICAgICAgICAgICAnL2FwaS91c2VycycsXHJcbiAgICAgICAgICAgICh1c2VyKT0+eyByZXR1cm4gdXNlci5pZDsgfVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNpdGUucmVhZHkoKCkgPT4ge1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gRGV0ZWN0IHRoZSBwYXNzZWQgaW4gdXNlciBpbmZvcm1hdGlvblxyXG4gICAgICAgIC8vIGFuZCBhZGQgaXQgdG8gdGhlIHN0b3JlLlxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgbGV0IGVuO1xyXG4gICAgICAgIGlmKCAoZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2wtdXNlcicpKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBzdG9yZS5jb21taXQoJ3VzZXIvc2V0JywgSlNPTi5wYXJzZShlbi50ZXh0Q29udGVudCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQWRkIHBlcm1pc3Npb25zIGFycmF5IGlmIGF2YWlsYWJsZVxyXG5cdCAgICBpZiggKGVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsLXBlcm1pc3Npb25zJykpICE9PSBudWxsKSB7XHJcblx0XHQgICAgc2l0ZS5wZXJtaXNzaW9ucyA9IG5ldyBQZXJtaXNzaW9ucyhKU09OLnBhcnNlKGVuLnRleHRDb250ZW50KSk7XHJcblx0ICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBVc2VycztcclxufVxyXG5cclxuZXhwb3J0IHtVc2Vyc0ZhY3Rvcnl9O1xyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==