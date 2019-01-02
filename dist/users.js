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

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/site/js/Vue/PageVueBase.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./vendor/cl/site/js/Vue/PageVueBase.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
  * Base component for pages.
  * @constructor PageVueBase
  */
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      /**
        * Site object
        * @memberof PageVueBase
        * @instance
        * @member {Site} site
        */
      site: Site,

      /**
        * Site root path (Site.root)
        * @memberof PageVueBase
        * @instance
        * @member {string} root
        */
      root: Site.root
    };
  },
  methods: {
    /**
      * Set the page title
      * @memberof PageVueBase
      * @instance
     * @param {string} title
     */
    setTitle: function setTitle(title) {
      this.$parent.setTitle(title);
    },
    setMenu: function setMenu(menu) {
      this.$parent.setMenu(menu);
    },
    getMenu: function getMenu() {
      return this.$parent.getMenu();
    },
    clearMenu: function clearMenu() {
      this.setMenu([]);
    },

    /**
     * Add an option to the nav2 menu.
     * @param title Title of the option to add.
     * @param closure Function to call when selected.
     */
    addMenu: function addMenu(title, closure) {
      var menu = this.getMenu();
      menu.push({
        name: title,
        click: closure
      });
      this.setMenu(menu);
    }
  }
});

/***/ }),

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
var LIMIT = 20;
/**
 * Simple component for selecting a user in the system.
 * @constructor UserSelectorVue
 */

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

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Vue/UserVueBase.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./vendor/cl/users/js/Vue/UserVueBase.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var site_cl_js_Vue_PageVueBase_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! site-cl/js/Vue/PageVueBase.vue */ "./vendor/cl/site/js/Vue/PageVueBase.vue");
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  'extends': site_cl_js_Vue_PageVueBase_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
  computed: {
    user: function user() {
      return this.$store.state.user.user;
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

/***/ "./vendor/cl/site/js/Vue/PageVueBase.vue":
/*!***********************************************!*\
  !*** ./vendor/cl/site/js/Vue/PageVueBase.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PageVueBase_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PageVueBase.vue?vue&type=script&lang=js& */ "./vendor/cl/site/js/Vue/PageVueBase.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  _PageVueBase_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
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
      api.createRecord('12bbaef8', component.options)
    } else {
      api.reload('12bbaef8', component.options)
    }
    
  }
}
component.options.__file = "vendor/cl/site/js/Vue/PageVueBase.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./vendor/cl/site/js/Vue/PageVueBase.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./vendor/cl/site/js/Vue/PageVueBase.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PageVueBase_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./PageVueBase.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/site/js/Vue/PageVueBase.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PageVueBase_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

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

/* harmony import */ var _js_Vue_UserVueBase_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/Vue/UserVueBase.vue */ "./vendor/cl/users/js/Vue/UserVueBase.vue");
/**
 * The main users.js entry point.
 *
 * Does not include console components.
 */








var Users = _js_Users_UsersFactory_js__WEBPACK_IMPORTED_MODULE_0__["UsersFactory"].create(Site.site);

Site.FetcherVue = _js_Lib_FetcherVue_vue__WEBPACK_IMPORTED_MODULE_1__["default"];
Site.User = _js_Users_User_js__WEBPACK_IMPORTED_MODULE_3__["User"];
Site.UserVueBase = _js_Vue_UserVueBase_vue__WEBPACK_IMPORTED_MODULE_4__["default"];
Site.UserSelectorVue = _js_Lib_UserSelectorVue_vue__WEBPACK_IMPORTED_MODULE_2__["default"];

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

User.prototype.userRoleName = function (short) {
  var roles = this.getUserRoles();
  var role = this.userRole();
  var r = roles[role];

  if (r === undefined) {
    return 'Invalid';
  }

  if (short === true && r.short !== undefined) {
    return r.short;
  }

  return r.name;
};
/**
 * Return the role name for this user.
 * @param short If set to true, a short version is supplied if available.
 * @returns string
 */


User.prototype.roleName = function (short) {
  var roles = this.getRoles();
  var role = this.role();
  var r = roles[role];

  if (r === undefined) {
    return 'Invalid';
  }

  if (short === true && r.short !== undefined) {
    return r.short;
  }

  return r.name;
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
  site.User = _User__WEBPACK_IMPORTED_MODULE_0__["User"];
  site.StoreModuleUsers = _StoreModuleUsers__WEBPACK_IMPORTED_MODULE_2__["StoreModuleUsers"];
  return Users;
};

/***/ }),

/***/ "./vendor/cl/users/js/Vue/UserVueBase.vue":
/*!************************************************!*\
  !*** ./vendor/cl/users/js/Vue/UserVueBase.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserVueBase_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserVueBase.vue?vue&type=script&lang=js& */ "./vendor/cl/users/js/Vue/UserVueBase.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  _UserVueBase_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
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
      api.createRecord('c7e4e49e', component.options)
    } else {
      api.reload('c7e4e49e', component.options)
    }
    
  }
}
component.options.__file = "vendor/cl/users/js/Vue/UserVueBase.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./vendor/cl/users/js/Vue/UserVueBase.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./vendor/cl/users/js/Vue/UserVueBase.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UserVueBase_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserVueBase.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./vendor/cl/users/js/Vue/UserVueBase.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_UserVueBase_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ })

},[["./vendor/cl/users/index.js","runtime","vendor"]]]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9bbmFtZV0vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL1tuYW1lXS92ZW5kb3IvY2wvc2l0ZS9qcy9WdWUvUGFnZVZ1ZUJhc2UudnVlIiwid2VicGFjazovL1tuYW1lXS92ZW5kb3IvY2wvdXNlcnMvanMvTGliL0ZldGNoZXJWdWUudnVlIiwid2VicGFjazovL1tuYW1lXS92ZW5kb3IvY2wvdXNlcnMvanMvTGliL1VzZXJTZWxlY3RvclZ1ZS52dWUiLCJ3ZWJwYWNrOi8vW25hbWVdL3ZlbmRvci9jbC91c2Vycy9qcy9WdWUvVXNlclZ1ZUJhc2UudnVlIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC91c2Vycy9qcy9MaWIvRmV0Y2hlclZ1ZS52dWU/OGU4MCIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvdXNlcnMvanMvTGliL1VzZXJTZWxlY3RvclZ1ZS52dWU/ZWUzYSIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvdXNlcnMvanMvTGliL0ZldGNoZXJWdWUudnVlP2U3MjUiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3VzZXJzL2pzL0xpYi9Vc2VyU2VsZWN0b3JWdWUudnVlP2Q1MzMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3VzZXJzL2pzL0xpYi9GZXRjaGVyVnVlLnZ1ZT83YTAwIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC91c2Vycy9qcy9MaWIvVXNlclNlbGVjdG9yVnVlLnZ1ZT81OGRhIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC9zaXRlL2pzL1Z1ZS9QYWdlVnVlQmFzZS52dWUiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3NpdGUvanMvVnVlL1BhZ2VWdWVCYXNlLnZ1ZT8xMThhIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC91c2Vycy9pbmRleC5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvdXNlcnMvanMvTGliL0ZldGNoZXJWdWUudnVlIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC91c2Vycy9qcy9MaWIvRmV0Y2hlclZ1ZS52dWU/NzI2OCIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvdXNlcnMvanMvTGliL0ZldGNoZXJWdWUudnVlPzQ5N2IiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3VzZXJzL2pzL0xpYi9GZXRjaGVyVnVlLnZ1ZT8yZjEyIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC91c2Vycy9qcy9MaWIvVXNlclNlbGVjdG9yVnVlLnZ1ZSIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvdXNlcnMvanMvTGliL1VzZXJTZWxlY3RvclZ1ZS52dWU/OTJmZCIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvdXNlcnMvanMvTGliL1VzZXJTZWxlY3RvclZ1ZS52dWU/ZjgwYyIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvdXNlcnMvanMvTGliL1VzZXJTZWxlY3RvclZ1ZS52dWU/MDk5NyIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvdXNlcnMvanMvU3RvcmVNb2R1bGVVc2Vycy5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvdXNlcnMvanMvVXNlcnMvUGVybWlzc2lvbnMuanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vdmVuZG9yL2NsL3VzZXJzL2pzL1VzZXJzL1N0b3JlTW9kdWxlVXNlci5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvdXNlcnMvanMvVXNlcnMvVXNlci5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi92ZW5kb3IvY2wvdXNlcnMvanMvVXNlcnMvVXNlcnNGYWN0b3J5LmpzIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC91c2Vycy9qcy9WdWUvVXNlclZ1ZUJhc2UudnVlIiwid2VicGFjazovL1tuYW1lXS8uL3ZlbmRvci9jbC91c2Vycy9qcy9WdWUvVXNlclZ1ZUJhc2UudnVlP2I2ZTEiXSwibmFtZXMiOlsiVXNlcnMiLCJVc2Vyc0ZhY3RvcnkiLCJjcmVhdGUiLCJTaXRlIiwic2l0ZSIsIkZldGNoZXJWdWUiLCJVc2VyIiwiVXNlclZ1ZUJhc2UiLCJVc2VyU2VsZWN0b3JWdWUiLCJMSU1JVCIsIlN0b3JlTW9kdWxlVXNlcnMiLCJhcGkiLCJ0b0lkIiwibmFtZXNwYWNlZCIsInN0YXRlIiwidXNlcnMiLCJmZXRjaGVyIiwiRmV0Y2hlciIsInF1ZXJ5IiwibXV0YXRpb25zIiwiYWRkIiwidXNlciIsInB1c2giLCJtb3JlIiwidmFsdWUiLCJmZXRjaFN0YXJ0Iiwic3RhcnQiLCJmZXRjaERvbmUiLCJkb25lIiwicmVzZXQiLCJ1cGRhdGUiLCJmZXRjaGVkIiwibGVuZ3RoIiwiaSIsImNvbXBhcmUiLCJzb3J0IiwibmV3IiwiZGVsZXRlIiwiaWQiLCJzcGxpY2UiLCJhY3Rpb25zIiwiZmV0Y2giLCJkaXNwYXRjaCIsImNvbW1pdCIsInEiLCJsaW1pdCIsIm9mZnNldCIsIk9iamVjdCIsImFzc2lnbiIsImdldCIsInRoZW4iLCJyZXNwb25zZSIsImhhc0Vycm9yIiwiZGF0YSIsImdldERhdGEiLCJhdHRyaWJ1dGVzIiwiZm9yRWFjaCIsInVzZXJPYmoiLCJjb25zb2xlIiwibG9nIiwidG9hc3QiLCJjYXRjaCIsImVycm9yIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJwcmV2bmV4dCIsInByZXYiLCJuZXh0IiwicGF5bG9hZCIsInBvc3QiLCJQZXJtaXNzaW9ucyIsInBlcm1pc3Npb25zIiwiYXRMZWFzdCIsInRhZyIsImRlZiIsInVuZGVmaW5lZCIsIlN0b3JlTW9kdWxlVXNlciIsInNldCIsImpzb24iLCJyb2xlIiwibWVtYmVyIiwiSlNPTiIsInBhcnNlIiwibmFtZSIsImVtYWlsIiwidXNlcklkIiwiaW5zdGFudGlhdGVNZW1iZXIiLCJkZWZpbmVQcm9wZXJ0eSIsInNldFVzZXJSb2xlIiwiX3JvbGUiLCJ1c2VyUm9sZSIsInNldE1lbWJlciIsIl9tZW1iZXIiLCJHVUVTVCIsIlVTRVIiLCJTVEFGRiIsIkFETUlOIiwiZ2V0VXNlclJvbGVzIiwicm9sZXMiLCJwcmlvcml0eSIsInByb3RvdHlwZSIsImdldFJvbGVzIiwiaGFzT3duUHJvcGVydHkiLCJnZXRSb2xlUHJpb3JpdHkiLCJkaXNwbGF5TmFtZSIsImNvbW1hIiwiaW5kZXhPZiIsImxhc3QiLCJzdWJzdHIiLCJmaXJzdCIsInRyaW0iLCJ1c2VyUm9sZU5hbWUiLCJzaG9ydCIsInIiLCJyb2xlTmFtZSIsImEiLCJiIiwiYW4iLCJ0b0xvd2VyQ2FzZSIsImJuIiwiTVVTVF9QUk9WSURFX1VTRVJJRF9PUl9FTUFJTCIsIlBBU1NXT1JEU19NVVNUX01BVENIIiwiRFVQTElDQVRFX1VTRVIiLCJEVVBMSUNBVEVfRU1BSUwiLCJzdG9yZSIsInJlZ2lzdGVyTW9kdWxlIiwicmVhZHkiLCJlbiIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJ0ZXh0Q29udGVudCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87Ozs7Ozs7Ozs7QUNUQTtBQUFBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQU1BLGdCQVBBOztBQVFBOzs7Ozs7QUFNQTtBQWRBO0FBZ0JBLEdBbEJBO0FBbUJBO0FBQ0E7Ozs7OztBQU1BLFlBUEEsb0JBT0EsS0FQQSxFQU9BO0FBQ0E7QUFDQSxLQVRBO0FBVUE7QUFDQTtBQUNBLEtBWkE7QUFhQTtBQUNBO0FBQ0EsS0FmQTtBQWdCQSxhQWhCQSx1QkFnQkE7QUFDQTtBQUNBLEtBbEJBOztBQW1CQTs7Ozs7QUFLQSxXQXhCQSxtQkF3QkEsS0F4QkEsRUF3QkEsT0F4QkEsRUF3QkE7QUFDQTtBQUNBO0FBQ0EsbUJBREE7QUFFQTtBQUZBO0FBSUE7QUFDQTtBQS9CQTtBQW5CQSxHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTUE7Ozs7O0FBS0E7Ozs7QUFJQTtBQUNB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aEIsQ0FBbkI7QUFDQTtBQUNELEdBZEQ7QUFnQkEvSCxNQUFJLENBQUNFLElBQUwsR0FBWUEsMENBQVo7QUFDQUYsTUFBSSxDQUFDTSxnQkFBTCxHQUF3QkEsa0VBQXhCO0FBRUEsU0FBT1YsS0FBUDtBQUNILENBL0NELEM7Ozs7Ozs7Ozs7OztBQ25CQTtBQUFBO0FBQUE7QUFBQTtBQUMrRDtBQUNMOzs7QUFHMUQ7QUFDbUc7QUFDbkcsZ0JBQWdCLDJHQUFVO0FBQzFCLEVBQUUsaUZBQU07QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxJQUFJLElBQVU7QUFDZCxZQUFZLG1CQUFPLENBQUMsd0dBQXFHO0FBQ3pILGNBQWMsbUJBQU8sQ0FBQywrQ0FBSztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNlLGdGOzs7Ozs7Ozs7Ozs7QUNqQ2Y7QUFBQTtBQUFBLHdDQUFxTSxDQUFnQixxUEFBRyxFQUFDLEMiLCJmaWxlIjoidXNlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJVc2Vyc1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJVc2Vyc1wiXSA9IGZhY3RvcnkoKTtcbn0pKHdpbmRvdywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiPHNjcmlwdD5cclxuXHQvKipcclxuICAgKiBCYXNlIGNvbXBvbmVudCBmb3IgcGFnZXMuXHJcbiAgICogQGNvbnN0cnVjdG9yIFBhZ2VWdWVCYXNlXHJcbiAgICovXHJcbiAgZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgICAgIGRhdGE6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG5cdCAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAqIFNpdGUgb2JqZWN0XHJcbiAgICAgICAgICAgICAgICogQG1lbWJlcm9mIFBhZ2VWdWVCYXNlXHJcbiAgICAgICAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICAgICAgICogQG1lbWJlciB7U2l0ZX0gc2l0ZVxyXG4gICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgIHNpdGU6IFNpdGUsXHJcblx0ICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICogU2l0ZSByb290IHBhdGggKFNpdGUucm9vdClcclxuICAgICAgICAgICAgICAgKiBAbWVtYmVyb2YgUGFnZVZ1ZUJhc2VcclxuICAgICAgICAgICAgICAgKiBAaW5zdGFuY2VcclxuICAgICAgICAgICAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IHJvb3RcclxuICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICByb290OiBTaXRlLnJvb3RcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWV0aG9kczoge1xyXG5cdCAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBTZXQgdGhlIHBhZ2UgdGl0bGVcclxuICAgICAgICAgICAqIEBtZW1iZXJvZiBQYWdlVnVlQmFzZVxyXG4gICAgICAgICAgICogQGluc3RhbmNlXHJcblx0ICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcclxuXHQgICAgICAgICAqL1xyXG4gICAgICAgICAgIHNldFRpdGxlKHRpdGxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuc2V0VGl0bGUodGl0bGUpO1xyXG4gICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgc2V0TWVudTogZnVuY3Rpb24obWVudSkge1xyXG5cdCAgICAgICAgICAgdGhpcy4kcGFyZW50LnNldE1lbnUobWVudSk7XHJcbiAgICAgICAgICAgfSxcclxuICAgICAgICAgICBnZXRNZW51OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICBcdCByZXR1cm4gdGhpcy4kcGFyZW50LmdldE1lbnUoKTtcclxuICAgICAgICAgICB9LFxyXG4gICAgICAgICAgIGNsZWFyTWVudSgpIHtcclxuICAgICAgICAgICBcdCAgdGhpcy5zZXRNZW51KFtdKTtcclxuICAgICAgICAgICB9LFxyXG5cdCAgICAgICAgIC8qKlxyXG5cdCAgICAgICAgICAqIEFkZCBhbiBvcHRpb24gdG8gdGhlIG5hdjIgbWVudS5cclxuXHQgICAgICAgICAgKiBAcGFyYW0gdGl0bGUgVGl0bGUgb2YgdGhlIG9wdGlvbiB0byBhZGQuXHJcblx0ICAgICAgICAgICogQHBhcmFtIGNsb3N1cmUgRnVuY3Rpb24gdG8gY2FsbCB3aGVuIHNlbGVjdGVkLlxyXG5cdCAgICAgICAgICAqL1xyXG5cdCAgICAgICAgIGFkZE1lbnUodGl0bGUsIGNsb3N1cmUpIHtcclxuXHRcdCAgICAgICAgIGxldCBtZW51ID0gdGhpcy5nZXRNZW51KCk7XHJcblx0XHQgICAgICAgICBtZW51LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogdGl0bGUsXHJcbiAgICAgICAgICAgICAgICBjbGljazogY2xvc3VyZVxyXG4gICAgICAgICAgICAgfSk7XHJcblx0XHQgICAgICAgICB0aGlzLnNldE1lbnUobWVudSk7XHJcblx0ICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuPC9zY3JpcHQ+XHJcbiIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cImZldGNoaW5nXCIgdi1pZj1cImRlbGF5ZWRGZXRjaGluZ1wiPlxyXG4gICAgICA8cD5GZXRjaGluZyBmcm9tIHNlcnZlci4uLjwvcD5cclxuICAgIDwvZGl2PlxyXG4gICAgPHNsb3Qgdi1pZj1cIihmZXRjaGVyID09PSBudWxsIHx8ICFmZXRjaGVyLmZldGNoaW5nKSAmJiAhZmV0Y2hpbmdcIj48L3Nsb3Q+XHJcbiAgICA8cCBjbGFzcz1cIm1vcmVcIiB2LWlmPVwiZmV0Y2hlciAhPT0gbnVsbCAmJiBmZXRjaGVyLm1vcmVcIj48YnV0dG9uIEBjbGljay5wcmV2ZW50PVwiZmV0Y2hNb3JlXCI+TU9SRTwvYnV0dG9uPjwvcD5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbiAgLyoqXHJcbiAgICogQGZpbGVcclxuICAgKiBGZXRjaGVyIGNvbXBvbmVudCBkaXNwbGF5cyBcIkZldGNoaW5nXCIgYW5kIGEgXCJtb3JlXCIgYnV0dG9uLlxyXG4gICAqL1xyXG5cclxuICAvKipcclxuICAgKiBGZXRjaGVyIGZ1bmN0aW9uIHVzZWQgdG8gdXBkYXRlIHRoaXMgb2JqZWN0LlxyXG4gICAqIEBjb25zdHJ1Y3RvclxyXG4gICAqL1xyXG4gIGV4cG9ydCBsZXQgRmV0Y2hlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB0aGlzLm1vcmUgPSBmYWxzZTsgICAgICAgLy8gSW5kaWNhdGVzIHRoZXJlIGlzIG1vcmUgdG8gZmV0Y2hcclxuICAgICAgdGhpcy5mZXRjaGluZyA9IGZhbHNlOyAgLy8gU2V0IHRydWUgd2hpbGUgd2UgYXJlIGZldGNoaW5nXHJcbiAgICAgIHRoaXMuZmV0Y2hlZCA9IGZhbHNlOyAgIC8vIFNldCB0cnVlIHdoZW4gd2UgaGF2ZSBmZXRjaGVkIHNvbWV0aGluZy4uLlxyXG5cclxuICAgICAgdGhpcy5zdGFydCA9IGZ1bmN0aW9uKHNpbmdsZSkge1xyXG4gICAgICAgICAgdGhpcy5mZXRjaGluZyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgaWYoc2luZ2xlICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5tb3JlID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuZG9uZSA9IGZ1bmN0aW9uKHNpbmdsZSkge1xyXG4gICAgICAgICAgdGhpcy5mZXRjaGluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgIGlmKHNpbmdsZSAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuZmV0Y2hlZCA9IHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMucmVzZXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHRoaXMubW9yZSA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5mZXRjaGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5mZXRjaGVkID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICB9O1xyXG5cclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgICBwcm9wczoge1xyXG4gICAgICAgIGZldGNoZXI6IHtcclxuICAgICAgICAgICAgdHlwZTogT2JqZWN0LFxyXG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZldGNoaW5nOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICB3YXRjaDoge1xyXG4gICAgICAgICAgJ2ZldGNoZXIuZmV0Y2hpbmcnOiBmdW5jdGlvbih0bywgZnJvbSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuc2V0RmV0Y2hpbmcoKVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGZldGNoaW5nOiBmdW5jdGlvbih0bywgZnJvbSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuc2V0RmV0Y2hpbmcoKVxyXG4gICAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBkYXRhOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgc2hvd0ZldGNoaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgICBkZWxheWVkRmV0Y2hpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgIHRpbWVyOiBudWxsXHJcbiAgICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIG1vdW50ZWQoKSB7XHJcbiAgICAgICAgICB0aGlzLnNldEZldGNoaW5nKCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICAgIGZldGNoTW9yZSgpIHtcclxuICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuZmV0Y2hNb3JlKCk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgc2V0RmV0Y2hpbmcoKSB7XHJcbiAgICAgICAgICAgICAgLy8gQXJlIHdlIGN1cnJlbnRseSBmZXRjaGluZz9cclxuICAgICAgICAgICAgICBsZXQgc2hvd0ZldGNoaW5nID0gKHRoaXMuZmV0Y2hlciAhPT0gbnVsbCAmJiB0aGlzLmZldGNoZXIuZmV0Y2hpbmcpIHx8IHRoaXMuZmV0Y2hpbmc7XHJcbiAgICAgICAgICAgICAgaWYoc2hvd0ZldGNoaW5nICYmICF0aGlzLnNob3dGZXRjaGluZykge1xyXG4gICAgICAgICAgICAgICAgICAvLyBGZXRjaGluZyBpcyBiZWNvbWluZyBhY3RpdmVcclxuICAgICAgICAgICAgICAgICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxheWVkRmV0Y2hpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICB9LCAxMDAwKVxyXG4gICAgICAgICAgICAgIH0gZWxzZSBpZighc2hvd0ZldGNoaW5nICYmIHRoaXMuc2hvd0ZldGNoaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcclxuICAgICAgICAgICAgICAgICAgdGhpcy50aW1lID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5kZWxheWVkRmV0Y2hpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgdGhpcy5zaG93RmV0Y2hpbmcgPSBzaG93RmV0Y2hpbmc7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuICB9O1xyXG5cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgbGFuZz1cInNjc3NcIiBzY29wZWQ+XHJcblxyXG5AaW1wb3J0ICcuLi8uLi8uLi9zaXRlL3Nhc3MvbW9kdWxlcy9fY29sb3JzJztcclxuXHJcbmRpdi5mZXRjaGluZyB7XHJcbiAgaGVpZ2h0OiAyOHB4O1xyXG4gIG1hcmdpbjogMWVtIDA7XHJcblxyXG4gIHAge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xyXG4gICAgY29sb3I6ICRjb21wO1xyXG4gICAgcGFkZGluZy10b3A6IDJweDtcclxuICB9XHJcbn1cclxuXHJcbi5tb3JlIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblxyXG4gIGJ1dHRvbiB7XHJcbiAgICBmb250LXNpemU6IDAuOGVtO1xyXG4gICAgaGVpZ2h0OiAyOHB4O1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gIH1cclxufVxyXG5cclxuPC9zdHlsZT4iLCI8dGVtcGxhdGU+XHJcbiAgPHNwYW4+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY2wtaW5wdXRcIj48aW5wdXQgdi1tb2RlbD1cInF1ZXJ5XCIgdHlwZT1cInRleHRcIiBtYXhsZW5ndGg9XCIxNTBcIj5cclxuICAgICAgPGEgQGNsaWNrLnByZXZlbnQ9XCJmZXRjaChxdWVyeSlcIiBjbGFzcz1cInNlYXJjaGVyXCI+PGltZyA6c3JjPVwic2VhcmNoZXJcIj48L2E+XHJcbiAgICAgIDxkaXYgdi1pZj1cInJlc3VsdC5sZW5ndGggPiAwIHx8IG5vcmVzdWx0XCIgY2xhc3M9XCJjbC1yZXN1bHRzXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNsLXJlc3VsdC1saXN0XCI+XHJcbiAgICAgICAgICA8ZGl2IHYtZm9yPVwidXNlciBpbiByZXN1bHRcIiBAY2xpY2sucHJldmVudD1cInNlbGVjdFVzZXIodXNlcilcIj48c3Bhbj48YVxyXG4gICAgICAgICAgICBAY2xpY2sucHJldmVudD1cInNlbGVjdFVzZXIodXNlcilcIj57e3VzZXIudXNlcklkfX08L2E+PC9zcGFuPlxyXG4gICAgICAgICAgICA8c3Bhbj48YSBAY2xpY2sucHJldmVudD1cInNlbGVjdFVzZXIodXNlcilcIj57e3VzZXIubmFtZX19PC9hPjwvc3Bhbj48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiB2LWlmPVwibm9yZXN1bHRcIiBjbGFzcz1cInN0YXRlbWVudFwiPk5vIHJlc3VsdHMuLi48L2Rpdj5cclxuICAgICAgICA8ZGl2IHYtaWY9XCJtb3JlXCIgY2xhc3M9XCJzdGF0ZW1lbnRcIj4uLi5tb3JlLi4uPC9kaXY+XHJcblxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PiA8YSBAY2xpY2sucHJldmVudD1cImNsZWFyXCI+PGltZyA6c3JjPVwiZGVsZXRlclwiPjwvYT5cclxuICA8L3NwYW4+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5cclxuICBjb25zdCBMSU1JVCA9IDIwO1xyXG5cclxuICAvKipcclxuICAgKiBTaW1wbGUgY29tcG9uZW50IGZvciBzZWxlY3RpbmcgYSB1c2VyIGluIHRoZSBzeXN0ZW0uXHJcbiAgICogQGNvbnN0cnVjdG9yIFVzZXJTZWxlY3RvclZ1ZVxyXG4gICAqL1xyXG4gICAgZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgICAgIHByb3BzOiBbXHJcbiAgICAgICAgICAgICdzZWxlY3RlZCdcclxuICAgICAgICBdLFxyXG4gICAgICAgIGRhdGE6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcXVlcnk6ICcnLFxyXG4gICAgICAgICAgICAgICAgcmVzdWx0OiBbXSxcclxuICAgICAgICAgICAgICAgIG5vcmVzdWx0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHNlcTogMSxcclxuICAgICAgICAgICAgICAgIGZldGNoZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdGltZXI6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbW9yZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzZWFyY2hlcjogU2l0ZS5yb290ICsgJy92ZW5kb3IvY2wvc2l0ZS9pbWcvc2VhcmNoLnBuZycsXHJcbiAgICAgICAgICAgICAgICBkZWxldGVyOiBTaXRlLnJvb3QgKyAnL3ZlbmRvci9jbC9zaXRlL2ltZy94LnBuZycsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHdhdGNoOiB7XHJcbiAgICAgICAgICAgIHF1ZXJ5KGFmdGVyLCBiZWZvcmUpIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy50aW1lciAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmV0Y2goYWZ0ZXIpO1xyXG4gICAgICAgICAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgICAgICBmZXRjaChxdWVyeSkge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy50aW1lciAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZChudWxsKTtcclxuXHJcbiAgICAgICAgICAgICAgICBxdWVyeSA9IHF1ZXJ5LnRyaW0oKTtcclxuICAgICAgICAgICAgICAgIGlmKHF1ZXJ5Lmxlbmd0aCA8IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZldGNoZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlcSsrO1xyXG4gICAgICAgICAgICAgICAgU2l0ZS5hcGkuZ2V0KCcvYXBpL3VzZXJzJywge3NlYXJjaDogcXVlcnksIHNlcTogdGhpcy5zZXEsIGxpbWl0OiBMSU1JVH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFyZXNwb25zZS5oYXNFcnJvcigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIHByb3RlY3RzIGZyb20gb3V0LW9mLW9yZGVyIHByb2Nlc3NpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9mIHJlc3VsdHMgZnJvbSB0aGUgc2VydmVyLi4uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZXEgPSByZXNwb25zZS5nZXREYXRhKCdzZXEnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCtzZXEuaWQgIT09IHRoaXMuc2VxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5nZXREYXRhKCd1c2VycycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0YSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0ID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3JlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5hdHRyaWJ1dGVzLmZvckVhY2goKHVzZXJEYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHVzZXJEYXRhLm1vcmUgIT09ICd5ZXMnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdXNlciA9IG5ldyBVc2Vycy5Vc2VyKHVzZXJEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0LnB1c2godXNlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vcmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3Jlc3VsdCA9ICh0aGlzLnJlc3VsdC5sZW5ndGggPT09IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNpdGUudG9hc3QodGhpcywgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFNpdGUudG9hc3QodGhpcywgZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZWxlY3RVc2VyKHVzZXIpIHs7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnF1ZXJ5ID0gdXNlci5uYW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQgPSBbXTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9yZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubW9yZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCh1c2VyKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2xlYXIoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlcSsrOyAvLyBKdXN0IGluIGNhc2VcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0ID0gW107XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vcmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vcmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucXVlcnkgPSAnJztcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQobnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD5cclxuXHJcbiAgYS5zZWFyY2hlciB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDA7XHJcbiAgICByaWdodDogMDtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIG1pbi1oZWlnaHQ6IDEwMCU7XHJcbiAgICB3aWR0aDogMjFweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGJhY2tncm91bmQ6ICNhYWFhYWE7XHJcblxyXG4gICAgaW1nIHtcclxuICAgICAgaGVpZ2h0OiAxNnB4O1xyXG4gICAgICB3aWR0aDogMTZweDtcclxuICAgICAgdmVydGljYWwtYWxpZ246IC00cHg7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkaXYuY2wtaW5wdXQge1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgd2lkdGg6IDMwMHB4O1xyXG5cclxuXHJcbiAgICBpbnB1dCB7XHJcbiAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjY2NjO1xyXG4gICAgfVxyXG5cclxuICAgIGRpdi5jbC1yZXN1bHRzIHtcclxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICBsZWZ0OiAwO1xyXG4gICAgICByaWdodDogMDtcclxuICAgICAgdG9wOiAxMDAlO1xyXG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICBmb250LXNpemU6IDAuODVlbTtcclxuXHJcbiAgICAgIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gICAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkIGJsYWNrO1xyXG4gICAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCBibGFjaztcclxuICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGJsYWNrO1xyXG5cclxuICAgICAgZGl2LmNsLXJlc3VsdC1saXN0IHtcclxuICAgICAgICBkaXNwbGF5OiB0YWJsZTtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuXHJcblxyXG4gICAgICAgIGRpdiB7XHJcbiAgICAgICAgICBkaXNwbGF5OiB0YWJsZS1yb3c7XHJcbiAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzg4ODg4ODtcclxuICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuXHJcbiAgICAgICAgICBzcGFuIHtcclxuICAgICAgICAgICAgZGlzcGxheTogdGFibGUtY2VsbDtcclxuICAgICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAgICAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcclxuICAgICAgICAgICAgcGFkZGluZzogMC41ZW0gMC4yNWVtO1xyXG5cclxuICAgICAgICAgICAgYSB7XHJcbiAgICAgICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gICAgICAgICAgICAgIGNvbG9yOiBibGFjaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYTpob3ZlciB7XHJcbiAgICAgICAgICAgICAgY29sb3I6ICM4ODg4ODg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBzcGFuOmZpcnN0LWNoaWxkIHtcclxuICAgICAgICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHNwYW46bGFzdC1jaGlsZCB7XHJcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgICAgIHdpZHRoOiA5OSU7XHJcblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICBkaXY6Zmlyc3QtY2hpbGQsIGRpdjpsYXN0LWNoaWxkIHtcclxuICAgICAgICAgIHNwYW4ge1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAwLjI1ZW0gMC4yNWVtO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgIGRpdi5zdGF0ZW1lbnQge1xyXG4gICAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuPC9zdHlsZT4iLCI8IS0tXHJcbkBmaWxlXHJcbkJhc2UgY29tcG9uZW50IGZvciBwYWdlcyB0aGF0IGluY2x1ZGVzIHN1cHBvcnQgZm9yIHRoaXMudXNlclxyXG5cclxuUHJvdmlkZXM6XHJcbnNldFRpdGxlXHJcbnRoaXMucm9vdFxyXG4tLT5cclxuXHJcbjxzY3JpcHQ+XHJcbiAgICBpbXBvcnQgUGFnZVZ1ZUJhc2UgZnJvbSAnc2l0ZS1jbC9qcy9WdWUvUGFnZVZ1ZUJhc2UudnVlJztcclxuXHJcbiAgICBleHBvcnQgZGVmYXVsdCB7XHJcbiAgICAgICAgJ2V4dGVuZHMnOiBQYWdlVnVlQmFzZSxcclxuICAgICAgICBjb21wdXRlZDoge1xyXG4gICAgICAgIFx0dXNlcigpIHtcclxuICAgICAgICBcdFx0cmV0dXJuICB0aGlzLiRzdG9yZS5zdGF0ZS51c2VyLnVzZXJcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbjwvc2NyaXB0PiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiZGl2LmZldGNoaW5nW2RhdGEtdi00M2IyNmJjYl0ge1xcbiAgaGVpZ2h0OiAyOHB4O1xcbiAgbWFyZ2luOiAxZW0gMDtcXG59XFxuZGl2LmZldGNoaW5nIHBbZGF0YS12LTQzYjI2YmNiXSB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICBjb2xvcjogI2M0MTQyNTtcXG4gIHBhZGRpbmctdG9wOiAycHg7XFxufVxcbi5tb3JlW2RhdGEtdi00M2IyNmJjYl0ge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG4ubW9yZSBidXR0b25bZGF0YS12LTQzYjI2YmNiXSB7XFxuICBmb250LXNpemU6IDAuOGVtO1xcbiAgaGVpZ2h0OiAyOHB4O1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcImEuc2VhcmNoZXJbZGF0YS12LWU4ZTdmODQwXSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICByaWdodDogMDtcXG4gIGhlaWdodDogMTAwJTtcXG4gIG1pbi1oZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMjFweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGJhY2tncm91bmQ6ICNhYWFhYWE7XFxufVxcbmEuc2VhcmNoZXIgaW1nW2RhdGEtdi1lOGU3Zjg0MF0ge1xcbiAgaGVpZ2h0OiAxNnB4O1xcbiAgd2lkdGg6IDE2cHg7XFxuICB2ZXJ0aWNhbC1hbGlnbjogLTRweDtcXG59XFxuZGl2LmNsLWlucHV0W2RhdGEtdi1lOGU3Zjg0MF0ge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgd2lkdGg6IDMwMHB4O1xcbn1cXG5kaXYuY2wtaW5wdXQgaW5wdXRbZGF0YS12LWU4ZTdmODQwXSB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2NjY2M7XFxufVxcbmRpdi5jbC1pbnB1dCBkaXYuY2wtcmVzdWx0c1tkYXRhLXYtZThlN2Y4NDBdIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG4gIHRvcDogMTAwJTtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBmb250LXNpemU6IDAuODVlbTtcXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCBibGFjaztcXG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIGJsYWNrO1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGJsYWNrO1xcbn1cXG5kaXYuY2wtaW5wdXQgZGl2LmNsLXJlc3VsdHMgZGl2LmNsLXJlc3VsdC1saXN0W2RhdGEtdi1lOGU3Zjg0MF0ge1xcbiAgZGlzcGxheTogdGFibGU7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuZGl2LmNsLWlucHV0IGRpdi5jbC1yZXN1bHRzIGRpdi5jbC1yZXN1bHQtbGlzdCBkaXZbZGF0YS12LWU4ZTdmODQwXSB7XFxuICBkaXNwbGF5OiB0YWJsZS1yb3c7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzg4ODg4ODtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuZGl2LmNsLWlucHV0IGRpdi5jbC1yZXN1bHRzIGRpdi5jbC1yZXN1bHQtbGlzdCBkaXYgc3BhbltkYXRhLXYtZThlN2Y4NDBdIHtcXG4gIGRpc3BsYXk6IHRhYmxlLWNlbGw7XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG4gIHBhZGRpbmc6IDAuNWVtIDAuMjVlbTtcXG59XFxuZGl2LmNsLWlucHV0IGRpdi5jbC1yZXN1bHRzIGRpdi5jbC1yZXN1bHQtbGlzdCBkaXYgc3BhbiBhW2RhdGEtdi1lOGU3Zjg0MF0ge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgY29sb3I6IGJsYWNrO1xcbn1cXG5kaXYuY2wtaW5wdXQgZGl2LmNsLXJlc3VsdHMgZGl2LmNsLXJlc3VsdC1saXN0IGRpdiBzcGFuIGFbZGF0YS12LWU4ZTdmODQwXTpob3ZlciB7XFxuICBjb2xvcjogIzg4ODg4ODtcXG59XFxuZGl2LmNsLWlucHV0IGRpdi5jbC1yZXN1bHRzIGRpdi5jbC1yZXN1bHQtbGlzdCBkaXYgc3BhbltkYXRhLXYtZThlN2Y4NDBdOmZpcnN0LWNoaWxkIHtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG59XFxuZGl2LmNsLWlucHV0IGRpdi5jbC1yZXN1bHRzIGRpdi5jbC1yZXN1bHQtbGlzdCBkaXYgc3BhbltkYXRhLXYtZThlN2Y4NDBdOmxhc3QtY2hpbGQge1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHdpZHRoOiA5OSU7XFxufVxcbmRpdi5jbC1pbnB1dCBkaXYuY2wtcmVzdWx0cyBkaXYuY2wtcmVzdWx0LWxpc3QgZGl2OmZpcnN0LWNoaWxkIHNwYW5bZGF0YS12LWU4ZTdmODQwXSxcXG5kaXYuY2wtaW5wdXQgZGl2LmNsLXJlc3VsdHMgZGl2LmNsLXJlc3VsdC1saXN0IGRpdjpsYXN0LWNoaWxkIHNwYW5bZGF0YS12LWU4ZTdmODQwXSB7XFxuICBwYWRkaW5nOiAwLjI1ZW0gMC4yNWVtO1xcbn1cXG5kaXYuY2wtaW5wdXQgZGl2LmNsLXJlc3VsdHMgZGl2LnN0YXRlbWVudFtkYXRhLXYtZThlN2Y4NDBdIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbn1cXG5cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiZGl2XCIsXG4gICAgW1xuICAgICAgX3ZtLmRlbGF5ZWRGZXRjaGluZ1xuICAgICAgICA/IF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZmV0Y2hpbmdcIiB9LCBbXG4gICAgICAgICAgICBfYyhcInBcIiwgW192bS5fdihcIkZldGNoaW5nIGZyb20gc2VydmVyLi4uXCIpXSlcbiAgICAgICAgICBdKVxuICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIChfdm0uZmV0Y2hlciA9PT0gbnVsbCB8fCAhX3ZtLmZldGNoZXIuZmV0Y2hpbmcpICYmICFfdm0uZmV0Y2hpbmdcbiAgICAgICAgPyBfdm0uX3QoXCJkZWZhdWx0XCIpXG4gICAgICAgIDogX3ZtLl9lKCksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLmZldGNoZXIgIT09IG51bGwgJiYgX3ZtLmZldGNoZXIubW9yZVxuICAgICAgICA/IF9jKFwicFwiLCB7IHN0YXRpY0NsYXNzOiBcIm1vcmVcIiB9LCBbXG4gICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uZmV0Y2hNb3JlKCRldmVudClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFtfdm0uX3YoXCJNT1JFXCIpXVxuICAgICAgICAgICAgKVxuICAgICAgICAgIF0pXG4gICAgICAgIDogX3ZtLl9lKClcbiAgICBdLFxuICAgIDJcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJzcGFuXCIsIFtcbiAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNsLWlucHV0XCIgfSwgW1xuICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICAgICAgICByYXdOYW1lOiBcInYtbW9kZWxcIixcbiAgICAgICAgICAgIHZhbHVlOiBfdm0ucXVlcnksXG4gICAgICAgICAgICBleHByZXNzaW9uOiBcInF1ZXJ5XCJcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGF0dHJzOiB7IHR5cGU6IFwidGV4dFwiLCBtYXhsZW5ndGg6IFwiMTUwXCIgfSxcbiAgICAgICAgZG9tUHJvcHM6IHsgdmFsdWU6IF92bS5xdWVyeSB9LFxuICAgICAgICBvbjoge1xuICAgICAgICAgIGlucHV0OiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgIGlmICgkZXZlbnQudGFyZ2V0LmNvbXBvc2luZykge1xuICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF92bS5xdWVyeSA9ICRldmVudC50YXJnZXQudmFsdWVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcImFcIixcbiAgICAgICAge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInNlYXJjaGVyXCIsXG4gICAgICAgICAgb246IHtcbiAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgX3ZtLmZldGNoKF92bS5xdWVyeSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFtfYyhcImltZ1wiLCB7IGF0dHJzOiB7IHNyYzogX3ZtLnNlYXJjaGVyIH0gfSldXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF92bS5yZXN1bHQubGVuZ3RoID4gMCB8fCBfdm0ubm9yZXN1bHRcbiAgICAgICAgPyBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNsLXJlc3VsdHNcIiB9LCBbXG4gICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJjbC1yZXN1bHQtbGlzdFwiIH0sXG4gICAgICAgICAgICAgIF92bS5fbChfdm0ucmVzdWx0LCBmdW5jdGlvbih1c2VyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnNlbGVjdFVzZXIodXNlcilcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIF9jKFwic3BhblwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnNlbGVjdFVzZXIodXNlcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KF92bS5fcyh1c2VyLnVzZXJJZCkpXVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgIF9jKFwic3BhblwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnNlbGVjdFVzZXIodXNlcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KF92bS5fcyh1c2VyLm5hbWUpKV1cbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfdm0ubm9yZXN1bHRcbiAgICAgICAgICAgICAgPyBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInN0YXRlbWVudFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIk5vIHJlc3VsdHMuLi5cIilcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIF92bS5tb3JlXG4gICAgICAgICAgICAgID8gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJzdGF0ZW1lbnRcIiB9LCBbX3ZtLl92KFwiLi4ubW9yZS4uLlwiKV0pXG4gICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICBdKVxuICAgICAgICA6IF92bS5fZSgpXG4gICAgXSksXG4gICAgX3ZtLl92KFwiIFwiKSxcbiAgICBfYyhcbiAgICAgIFwiYVwiLFxuICAgICAge1xuICAgICAgICBvbjoge1xuICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICByZXR1cm4gX3ZtLmNsZWFyKCRldmVudClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBbX2MoXCJpbWdcIiwgeyBhdHRyczogeyBzcmM6IF92bS5kZWxldGVyIH0gfSldXG4gICAgKVxuICBdKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Jlc29sdmUtdXJsLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9GZXRjaGVyVnVlLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTQzYjI2YmNiJmxhbmc9c2NzcyZzY29wZWQ9dHJ1ZSZcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIGFkZCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKS5kZWZhdWx0XG52YXIgdXBkYXRlID0gYWRkKFwiNDUxZWMxYTRcIiwgY29udGVudCwgZmFsc2UsIHt9KTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVzb2x2ZS11cmwtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0ZldGNoZXJWdWUudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NDNiMjZiY2ImbGFuZz1zY3NzJnNjb3BlZD10cnVlJlwiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Jlc29sdmUtdXJsLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9GZXRjaGVyVnVlLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTQzYjI2YmNiJmxhbmc9c2NzcyZzY29wZWQ9dHJ1ZSZcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Jlc29sdmUtdXJsLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Vc2VyU2VsZWN0b3JWdWUudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9ZThlN2Y4NDAmbGFuZz1zY3NzJnNjb3BlZD10cnVlJlwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgYWRkID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpLmRlZmF1bHRcbnZhciB1cGRhdGUgPSBhZGQoXCJmZGVmZThkYVwiLCBjb250ZW50LCBmYWxzZSwge30pO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuIC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG4gaWYoIWNvbnRlbnQubG9jYWxzKSB7XG4gICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZXNvbHZlLXVybC1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vVXNlclNlbGVjdG9yVnVlLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPWU4ZTdmODQwJmxhbmc9c2NzcyZzY29wZWQ9dHJ1ZSZcIiwgZnVuY3Rpb24oKSB7XG4gICAgIHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZXNvbHZlLXVybC1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vVXNlclNlbGVjdG9yVnVlLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPWU4ZTdmODQwJmxhbmc9c2NzcyZzY29wZWQ9dHJ1ZSZcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsInZhciByZW5kZXIsIHN0YXRpY1JlbmRlckZuc1xuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9QYWdlVnVlQmFzZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL1BhZ2VWdWVCYXNlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiQzpcXFxcVXNlcnNcXFxcY2hhcmxcXFxcRG9jdW1lbnRzXFxcXENsYXNzZXNcXFxcQ1NFMzIwXFxcXHdlYlxcXFxub2RlX21vZHVsZXNcXFxcdnVlLWhvdC1yZWxvYWQtYXBpXFxcXGRpc3RcXFxcaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnMTJiYmFlZjgnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnMTJiYmFlZjgnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwidmVuZG9yL2NsL3NpdGUvanMvVnVlL1BhZ2VWdWVCYXNlLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1BhZ2VWdWVCYXNlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0yIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUGFnZVZ1ZUJhc2UudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiLyoqXHJcbiAqIFRoZSBtYWluIHVzZXJzLmpzIGVudHJ5IHBvaW50LlxyXG4gKlxyXG4gKiBEb2VzIG5vdCBpbmNsdWRlIGNvbnNvbGUgY29tcG9uZW50cy5cclxuICovXHJcblxyXG5pbXBvcnQge1VzZXJzRmFjdG9yeX0gZnJvbSAnLi9qcy9Vc2Vycy9Vc2Vyc0ZhY3RvcnkuanMnO1xyXG5cclxuaW1wb3J0IEZldGNoZXJWdWUgZnJvbSAnLi9qcy9MaWIvRmV0Y2hlclZ1ZS52dWUnO1xyXG5pbXBvcnQgVXNlclNlbGVjdG9yVnVlIGZyb20gJy4vanMvTGliL1VzZXJTZWxlY3RvclZ1ZS52dWUnO1xyXG5pbXBvcnQge1VzZXJ9IGZyb20gJy4vanMvVXNlcnMvVXNlci5qcyc7XHJcbmltcG9ydCBVc2VyVnVlQmFzZSBmcm9tICcuL2pzL1Z1ZS9Vc2VyVnVlQmFzZS52dWUnO1xyXG5cclxuZXhwb3J0IHtGZXRjaGVyVnVlfTtcclxuZXhwb3J0IHtVc2VyU2VsZWN0b3JWdWV9O1xyXG5leHBvcnQge1VzZXJ9O1xyXG5cclxubGV0IFVzZXJzID0gVXNlcnNGYWN0b3J5LmNyZWF0ZShTaXRlLnNpdGUpO1xyXG5leHBvcnQge1VzZXJzfTtcclxuXHJcblNpdGUuRmV0Y2hlclZ1ZSA9IEZldGNoZXJWdWU7XHJcblNpdGUuVXNlciA9IFVzZXI7XHJcblNpdGUuVXNlclZ1ZUJhc2UgPSBVc2VyVnVlQmFzZTtcclxuU2l0ZS5Vc2VyU2VsZWN0b3JWdWUgPSBVc2VyU2VsZWN0b3JWdWU7XHJcbiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vRmV0Y2hlclZ1ZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NDNiMjZiY2Imc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vRmV0Y2hlclZ1ZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0ZldGNoZXJWdWUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5pbXBvcnQgc3R5bGUwIGZyb20gXCIuL0ZldGNoZXJWdWUudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NDNiMjZiY2ImbGFuZz1zY3NzJnNjb3BlZD10cnVlJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCI0M2IyNmJjYlwiLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXGNoYXJsXFxcXERvY3VtZW50c1xcXFxDbGFzc2VzXFxcXENTRTMyMFxcXFx3ZWJcXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzQzYjI2YmNiJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzQzYjI2YmNiJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9GZXRjaGVyVnVlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD00M2IyNmJjYiZzY29wZWQ9dHJ1ZSZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCc0M2IyNmJjYicsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwidmVuZG9yL2NsL3VzZXJzL2pzL0xpYi9GZXRjaGVyVnVlLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0ZldGNoZXJWdWUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9GZXRjaGVyVnVlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZXNvbHZlLXVybC1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRmV0Y2hlclZ1ZS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD00M2IyNmJjYiZsYW5nPXNjc3Mmc2NvcGVkPXRydWUmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZXNvbHZlLXVybC1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRmV0Y2hlclZ1ZS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD00M2IyNmJjYiZsYW5nPXNjc3Mmc2NvcGVkPXRydWUmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRmV0Y2hlclZ1ZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NDNiMjZiY2Imc2NvcGVkPXRydWUmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL1VzZXJTZWxlY3RvclZ1ZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9ZThlN2Y4NDAmc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vVXNlclNlbGVjdG9yVnVlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vVXNlclNlbGVjdG9yVnVlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuaW1wb3J0IHN0eWxlMCBmcm9tIFwiLi9Vc2VyU2VsZWN0b3JWdWUudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9ZThlN2Y4NDAmbGFuZz1zY3NzJnNjb3BlZD10cnVlJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCJlOGU3Zjg0MFwiLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXGNoYXJsXFxcXERvY3VtZW50c1xcXFxDbGFzc2VzXFxcXENTRTMyMFxcXFx3ZWJcXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJ2U4ZTdmODQwJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJ2U4ZTdmODQwJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9Vc2VyU2VsZWN0b3JWdWUudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWU4ZTdmODQwJnNjb3BlZD10cnVlJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJ2U4ZTdmODQwJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJ2ZW5kb3IvY2wvdXNlcnMvanMvTGliL1VzZXJTZWxlY3RvclZ1ZS52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Vc2VyU2VsZWN0b3JWdWUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Vc2VyU2VsZWN0b3JWdWUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Jlc29sdmUtdXJsLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Vc2VyU2VsZWN0b3JWdWUudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9ZThlN2Y4NDAmbGFuZz1zY3NzJnNjb3BlZD10cnVlJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVzb2x2ZS11cmwtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1VzZXJTZWxlY3RvclZ1ZS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD1lOGU3Zjg0MCZsYW5nPXNjc3Mmc2NvcGVkPXRydWUmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vVXNlclNlbGVjdG9yVnVlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1lOGU3Zjg0MCZzY29wZWQ9dHJ1ZSZcIiIsIi8qKlxyXG4gKiBAZmlsZVxyXG4gKiBWdWV4IHN0b3JlIG1vZHVsZSB0aGF0IG1haW50YWlucyBhIGNvbGxlY3Rpb24gb2Ygc3lzdGVtIHVzZXJzLlxyXG4gKi9cclxuXHJcbmltcG9ydCB7RmV0Y2hlcn0gZnJvbSAnLi9MaWIvRmV0Y2hlclZ1ZS52dWUnO1xyXG5pbXBvcnQge1VzZXJ9IGZyb20gJy4vVXNlcnMvVXNlci5qcyc7XHJcblxyXG5jb25zdCBMSU1JVCA9IDUwMDtcclxuXHJcbmV4cG9ydCBsZXQgU3RvcmVNb2R1bGVVc2VycyA9IGZ1bmN0aW9uKCkge1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGEgVnVleCBzdG9yZSBtb2R1bGUgdG8gc3RvcmUgdXNlcnMuXHJcbiAqXHJcbiAqIFRoaXMgd2lsbCB3b3JrIGZvciBib3RoIFVzZXJzIGFuZCBjb3Vyc2UgTWVtYmVycywgc2luY2UgdGhleVxyXG4gKiB1c2UgdGhlIHNhbWUgQVBJLlxyXG4gKiBAcGFyYW0gYXBpICcvYXBpL3VzZXJzJyBmb3IgJy9hcGkvY291cnNlL21lbWJlcnMnXHJcbiAqIEBwYXJhbSBxdWVyeSBJdGVtcyB0byBhZGQgdG8gdGhlIHF1ZXJ5IChzZW1lc3RlciBhbmQgc2VjdGlvbiBmb3IgbWVtYmVycykuXHJcbiAqIEBwYXJhbSB0b0lkIE1hcHBpbmcgZnJvbSBhIHVzZXIgdG8gdGhlIElEIHRvIHVzZSBmb3IgdGhlIGNvbGxlY3Rpb24uXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuU3RvcmVNb2R1bGVVc2Vycy5jcmVhdGUgPSBmdW5jdGlvbihhcGksIHRvSWQpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmFtZXNwYWNlZDogdHJ1ZSxcclxuICAgICAgICBzdGF0ZToge1xyXG4gICAgICAgICAgICB1c2VyczogW10sXHJcbiAgICAgICAgICAgIGZldGNoZXI6IG5ldyBGZXRjaGVyKCksICAgICAvLyBJbmRpY2F0ZXMgdGhlIGZldGNoaW5nIHN0YXR1c1xyXG4gICAgICAgICAgICBxdWVyeToge31cclxuICAgICAgICB9LFxyXG4gICAgICAgIG11dGF0aW9uczoge1xyXG4gICAgICAgICAgICBhZGQoc3RhdGUsIHVzZXIpIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlLnVzZXJzLnB1c2godXNlcik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG1vcmUoc3RhdGUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZS5mZXRjaGVyLm1vcmUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmV0Y2hTdGFydChzdGF0ZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlLmZldGNoZXIuc3RhcnQodmFsdWUpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmZXRjaERvbmUoc3RhdGUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZS5mZXRjaGVyLmRvbmUodmFsdWUpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXNldChzdGF0ZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlLmZldGNoZXIucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgIHN0YXRlLnVzZXJzID0gW107XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHF1ZXJ5KHN0YXRlLCB2YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZS5xdWVyeSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB1cGRhdGUoc3RhdGUsIHVzZXIpIHtcclxuICAgICAgICAgICAgICAgIC8vIElmIG5vdGhpbmcgaXMgZmV0Y2hlZCwgbm90aGluZyBuZWVkIGJlIHVwZGF0ZWRcclxuICAgICAgICAgICAgICAgIGlmKCFzdGF0ZS5mZXRjaGVyLmZldGNoZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIGxpc3QgaXMgZW1wdHksIHdlIGZvcmNlIGEgcmVsb2FkIGZyb20gdGhlIHNlcnZlclxyXG4gICAgICAgICAgICAgICAgaWYoc3RhdGUudXNlcnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuZmV0Y2hlci5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLnVzZXJzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIERvZXMgdGhlIHVzZXIgZXhpc3QgcmlnaHQgbm93P1xyXG4gICAgICAgICAgICAgICAgbGV0IGk9MDtcclxuICAgICAgICAgICAgICAgIGZvciggOyBpPHN0YXRlLnVzZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodG9JZCh1c2VyKSA9PT0gdG9JZChzdGF0ZS51c2Vyc1tpXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgaGF2ZSBmb3VuZCBpdCwgc3dhcCBpdCBpblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZS51c2Vyc1tpXSA9IHVzZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzdGF0ZS5mZXRjaGVyLm1vcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNpbmNlIHRoZSBuYW1lIG1heSBoYXZlIGNoYW5nZWQsIHRoZSBwb3NpdGlvbiBpbiB0aGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxpc3QgY291bGQgYWxzbyBjaGFuZ2UuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihVc2VyLmNvbXBhcmUodXNlciwgc3RhdGUudXNlcnNbc3RhdGUudXNlcnMubGVuZ3RoLTFdKSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUHJvYmFibHkgb2ZmIHRoZSBlbmQsIGZvcmNlIGEgcmVsb2FkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUuZmV0Y2hlci5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLnVzZXJzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUudXNlcnMuc29ydChVc2VyLmNvbXBhcmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIElmIHdlIGRpZCBub3QgZmluZCB0aGUgdXNlciwgaXQgbXVzdCBzdGlsbFxyXG4gICAgICAgICAgICAgICAgLy8gYmUgd2FpdGluZyB0byBiZSBmZXRjaGVkIGZyb20gdGhlIHNlcnZlci5cclxuICAgICAgICAgICAgICAgIHN0YXRlLmZldGNoZXIubW9yZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5ldyhzdGF0ZSwgdXNlcikge1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgbm90aGluZyBpcyBmZXRjaGVkLCBub3RoaW5nIG5lZWQgYmUgdXBkYXRlZFxyXG4gICAgICAgICAgICAgICAgaWYoIXN0YXRlLmZldGNoZXIuZmV0Y2hlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgbGlzdCBpcyBlbXB0eSwgd2UgYXJlIHRoZSBvbmUhXHJcbiAgICAgICAgICAgICAgICBpZihzdGF0ZS51c2Vycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZS51c2Vycy5wdXNoKHVzZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZighc3RhdGUuZmV0Y2hlci5tb3JlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gV2UgaGF2ZSBpdCBhbGwsIHNvIHdlIGNhbiBhcHBlbmQsIHNvcnQsIGFuZCB3ZSBhcmUgZG9uZVxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLnVzZXJzLnB1c2godXNlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUudXNlcnMuc29ydChVc2VyLmNvbXBhcmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihVc2VyLmNvbXBhcmUodXNlciwgc3RhdGUudXNlcnNbc3RhdGUudXNlcnMubGVuZ3RoLTFdKSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUHJvYmFibHkgb2ZmIHRoZSBlbmQsIGZvcmNlIGEgcmVsb2FkXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuZmV0Y2hlci5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLnVzZXJzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHN0YXRlLnVzZXJzLnB1c2godXNlcik7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZS51c2Vycy5zb3J0KFVzZXIuY29tcGFyZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRlbGV0ZShzdGF0ZSwgaWQpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RhdGUudXNlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodG9JZChzdGF0ZS51c2Vyc1tpXSkgPT09IGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLnVzZXJzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhY3Rpb25zOiB7XHJcbiAgICAgICAgICAgIC8vIEluaXRpYWwgZmV0Y2ggZnJvbSBBUElcclxuICAgICAgICAgICAgZmV0Y2goe2Rpc3BhdGNoLCBzdGF0ZX0pIHtcclxuICAgICAgICAgICAgICAgIGlmKHN0YXRlLmZldGNoZXIuZmV0Y2hlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBkaXNwYXRjaCgnbW9yZScpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyBGZXRjaCBtb3JlXHJcbiAgICAgICAgICAgIG1vcmUoe2NvbW1pdCwgc3RhdGV9KSB7XHJcbiAgICAgICAgICAgICAgICBpZihzdGF0ZS5mZXRjaGVyLmZldGNoZWQgJiYgIXN0YXRlLmZldGNoZXIubW9yZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb21taXQoJ2ZldGNoU3RhcnQnKTtcclxuICAgICAgICAgICAgICAgIGxldCBxID0ge2xpbWl0OiBMSU1JVCwgb2Zmc2V0OiBzdGF0ZS51c2Vycy5sZW5ndGh9O1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihxLCBzdGF0ZS5xdWVyeSk7XHJcblxyXG4gICAgICAgICAgICAgICAgU2l0ZS5hcGkuZ2V0KGFwaSwgcSlcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIXJlc3BvbnNlLmhhc0Vycm9yKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5nZXREYXRhKCd1c2VycycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0YSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3JlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5hdHRyaWJ1dGVzLmZvckVhY2goKHVzZXJPYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodXNlck9iai5tb3JlID09PSAneWVzJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9yZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21taXQoJ2FkZCcsIG5ldyBVc2Vycy5Vc2VyKHVzZXJPYmopKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1pdCgnbW9yZScsIG1vcmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1pdCgnZmV0Y2hEb25lJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNpdGUudG9hc3QodGhpcywgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFNpdGUudG9hc3QodGhpcywgZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXQoe2NvbW1pdCwgc3RhdGV9LCBxdWVyeSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAvLyBXZSBtYXkgaGF2ZSB0aGUgZGVzaXJlZCB1c2VyIGxvYWRlZCBvciB3ZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIC8vIG1heSBoYXZlIHRvIGdvIGdldCB0aGVtLlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCBwcmV2ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAvLyBmb3IobGV0IGk9MDsgaTxzdGF0ZS51c2Vycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBsZXQgdXNlciA9IHN0YXRlLnVzZXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBpZih0b0lkKHVzZXIpID09PSBpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgaWYoKGkrMSkgPCBzdGF0ZS51c2Vycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICB1c2VyLm5leHQgPSBzdGF0ZS51c2Vyc1tpKzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBpZihwcmV2ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgdXNlci5wcmV2ID0gcHJldjtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgcmVzb2x2ZSh1c2VyKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHByZXYgPSB1c2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gR28gZ2V0IHRoZSB1c2VyXHJcbiAgICAgICAgICAgICAgICAgICAgY29tbWl0KCdmZXRjaFN0YXJ0JywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcXVlcnkucHJldm5leHQgPSAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBTaXRlLmFwaS5nZXQoYXBpLCBxdWVyeSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZighcmVzcG9uc2UuaGFzRXJyb3IoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5nZXREYXRhKCd1c2VycycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGEgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0YS5hdHRyaWJ1dGVzLmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCgnVXNlciBkb2VzIG5vdCBleGlzdCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21taXQoJ2ZldGNoRG9uZScsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHVzZXIgPSBuZXcgVXNlcnMuVXNlcihkYXRhLmF0dHJpYnV0ZXNbMF0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByZXYgPSByZXNwb25zZS5nZXREYXRhKCdwcmV2LXVzZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHByZXYgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyLnByZXYgPSBuZXcgVXNlcnMuVXNlcihwcmV2LmF0dHJpYnV0ZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHQgPSByZXNwb25zZS5nZXREYXRhKCduZXh0LXVzZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5leHQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyLm5leHQgPSBuZXcgVXNlcnMuVXNlcihuZXh0LmF0dHJpYnV0ZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodXNlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2l0ZS50b2FzdCh0aGlzLCByZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaXRlLnRvYXN0KHRoaXMsIGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVwZGF0ZSh7Y29tbWl0LCBzdGF0ZX0sIHBheWxvYWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgU2l0ZS5hcGkucG9zdChhcGkgKyAnL3VwZGF0ZScsIHBheWxvYWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIXJlc3BvbnNlLmhhc0Vycm9yKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlLmdldERhdGEoJ3VwZGF0ZWQtdXNlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB1c2VyID0gbmV3IFVzZXJzLlVzZXIoZGF0YS5hdHRyaWJ1dGVzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVXBkYXRlIHVzZXIgaWYgd2UgaGF2ZSBpdCBzdG9yZWQgbG9jYWxseVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFuZCB0aGUgbmFtZSBoYXMgbm90IGNoYW5nZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21taXQoJ3VwZGF0ZScsIHVzZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodXNlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaXRlLnRvYXN0KHRoaXMsIGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5ldyh7Y29tbWl0LCBzdGF0ZX0sIHBheWxvYWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgU2l0ZS5hcGkucG9zdChhcGkgKyAnL25ldycsIHBheWxvYWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIXJlc3BvbnNlLmhhc0Vycm9yKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlLmdldERhdGEoJ25ldy11c2VyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHVzZXIgPSBuZXcgVXNlcnMuVXNlcihkYXRhLmF0dHJpYnV0ZXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21taXQoJ25ldycsIHVzZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodXNlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZWplY3QnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2l0ZS50b2FzdCh0aGlzLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkZWxldGUoe2NvbW1pdCwgc3RhdGV9LCBwYXlsb2FkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIFNpdGUuYXBpLnBvc3QoYXBpICsgJy9kZWxldGUnLCB7aWQ6IHBheWxvYWQuaWR9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2UuaGFzRXJyb3IoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1pdCgnZGVsZXRlJywgcGF5bG9hZC5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2l0ZS50b2FzdCh0aGlzLCByZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaXRlLnRvYXN0KHRoaXMsIGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIiwiLyoqXHJcbiAqIEBmaWxlXHJcbiAqIFBlcm1pc3Npb25zIG1hbmFnZW1lbnQgY29tcG9uZW50XHJcbiAqL1xyXG5cclxuZXhwb3J0IGNvbnN0IFBlcm1pc3Npb25zID0gZnVuY3Rpb24oZGF0YSkge1xyXG5cdHRoaXMucGVybWlzc2lvbnMgPSBkYXRhO1xyXG5cclxuXHQvKipcclxuXHQgKiBEZXRlcm1pbmUgdGhlIGF0TGVhc3QgcGVybWlzc2lvbiBmb3IgYSBnaXZlblxyXG5cdCAqIGNvbmZpZ3VyYWJsZSBwZXJtaXNzaW9uLlxyXG5cdCAqIEBwYXJhbSB0YWcgVGFnIHRoYXQgZGVmaW5lcyB0aGUgcGVybWlzc2lvbiBjb25maWd1cmF0aW9uXHJcblx0ICogQHBhcmFtIGRlZiBEZWZhdWx0IHZhbHVlIGlmIHBlcm1pc3Npb24gbm90IHNldFxyXG5cdCAqIEByZXR1cm5zIHsqfVxyXG5cdCAqL1xyXG5cdHRoaXMuYXRMZWFzdCA9IGZ1bmN0aW9uKHRhZywgZGVmKSB7XHJcblx0XHRpZih0aGlzLnBlcm1pc3Npb25zW3RhZ10gIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5wZXJtaXNzaW9uc1t0YWddO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBkZWY7XHJcblx0fVxyXG59XHJcbiIsIi8qKlxyXG4gKiBAZmlsZVxyXG4gKiBUaGUgVnVleCBzdG9yZSBtb2R1bGUgdGhhdCBtYWludGFpbnMgdGhlIGN1cnJlbnQgc3lzdGVtIHVzZXIuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtVc2VyfSBmcm9tICcuL1VzZXIuanMnO1xyXG5cclxuXHJcblxyXG5leHBvcnQgbGV0IFN0b3JlTW9kdWxlVXNlciA9IHtcclxuICAgIG5hbWVzcGFjZWQ6IHRydWUsXHJcbiAgICBzdGF0ZToge1xyXG4gICAgICAgIHVzZXI6IG51bGxcclxuICAgIH0sXHJcbiAgICBtdXRhdGlvbnM6IHtcclxuICAgICAgICBzZXQoc3RhdGUsIHVzZXIpIHtcclxuICAgICAgICAgICAgaWYodXNlciBpbnN0YW5jZW9mIFVzZXIpIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlLnVzZXIgPSB1c2VyO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cdCAgICAgICAgICAgIHN0YXRlLnVzZXIgPSBuZXcgVXNlcih1c2VyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbiIsIi8qKlxyXG4gKiBAZmlsZVxyXG4gKiBSZXByZXNlbnRzIGEgdXNlciBpbiB0aGUgc3lzdGVtXHJcbiAqL1xyXG5cclxubGV0IFVzZXIgPSBmdW5jdGlvbihqc29uKSB7XHJcblxyXG4gICAgLy8vIFRoZSB1c2VyIHJvbGUgLSBsb2NhbCBzbyB3ZSBjYW4gcHJvdGVjdCBpdCB3aXRoIGdldHRlci9zZXR0ZXJcclxuICAgIGxldCByb2xlID0gJ0cnO1xyXG5cclxuICAgIC8vIEluc3RhbGxlZCBtZW1iZXJzaGlwXHJcbiAgICBsZXQgbWVtYmVyID0gbnVsbDtcclxuXHJcbiAgICBpZihqc29uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBpZih0eXBlb2YoanNvbikgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGpzb24gPSBKU09OLnBhcnNlKGpzb24pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmlkID0ganNvbi5pZDtcclxuICAgICAgICByb2xlID0ganNvbi5yb2xlO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IGpzb24ubmFtZTtcclxuICAgICAgICB0aGlzLmVtYWlsID0ganNvbi5lbWFpbDtcclxuICAgICAgICB0aGlzLnVzZXJJZCA9IGpzb24udXNlcjtcclxuXHJcbiAgICAgICAgLy8gSW5zdGFsbGVkIG1lbWJlcnNoaXBcclxuICAgICAgICBtZW1iZXIgPSBVc2VyLmluc3RhbnRpYXRlTWVtYmVyKGpzb24pO1xyXG4gICAgICAgIGlmKG1lbWJlciAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBtZW1iZXIudXNlciA9IHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IDA7XHJcbiAgICAgICAgcm9sZSA9ICdHJztcclxuICAgICAgICB0aGlzLm5hbWUgPSAnJztcclxuICAgICAgICB0aGlzLmVtYWlsID0gJyc7XHJcbiAgICAgICAgdGhpcy51c2VySWQgPSAnJztcclxuICAgIH1cclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ21lbWJlcicsIHtcclxuICAgICAgICBnZXQoKSB7cmV0dXJuIG1lbWJlcn1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIHRoZSBlZmZlY3RpdmUgcm9sZSBmb3IgdGhlIHVzZXIuXHJcbiAgICAgKiBUaGlzIGlzIHRoZSB1c2VyJ3Mgcm9sZSB1bmxlc3MgdGhlIHVzZXJcclxuICAgICAqIGhhcyBhIG1lbWJlcnNoaXAsIGluIHdoaWNoIGNhc2UgaXQgaXMgdGhlXHJcbiAgICAgKiBtZW1iZXJzaGlwIHJvbGUuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgdGhpcy5yb2xlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYobWVtYmVyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtZW1iZXIucm9sZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJvbGU7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zZXRVc2VyUm9sZSA9IGZ1bmN0aW9uKF9yb2xlKSB7XHJcbiAgICAgICAgcm9sZSA9IF9yb2xlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudXNlclJvbGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gcm9sZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgbWVtYmVyc2hpcCBmb3IgdGhpcyB1c2VyXHJcbiAgICAgKiBAcGFyYW0gTWVtYmVyc2hpcCBtZW1iZXJcclxuICAgICAqL1xyXG4gICAgdGhpcy5zZXRNZW1iZXIgPSBmdW5jdGlvbihfbWVtYmVyKSB7XHJcbiAgICAgICAgbWVtYmVyID0gX21lbWJlcjtcclxuICAgICAgICBpZihtZW1iZXIgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgbWVtYmVyLnVzZXIgPSB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcblVzZXIuR1VFU1QgPSAnRyc7XHJcblVzZXIuVVNFUiA9ICdVJztcclxuVXNlci5TVEFGRiA9ICdTJztcclxuVXNlci5BRE1JTiA9ICdBJztcclxuXHJcblxyXG5Vc2VyLmdldFVzZXJSb2xlcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IHJvbGVzID0ge307XHJcbiAgICByb2xlc1tVc2VyLkdVRVNUXSA9IHtuYW1lOiAnR3Vlc3QnLCBwcmlvcml0eTogMX07XHJcbiAgICByb2xlc1tVc2VyLlVTRVJdID0ge25hbWU6ICdVc2VyJywgcHJpb3JpdHk6IDJ9O1xyXG4gICAgcm9sZXNbVXNlci5TVEFGRl0gPSB7bmFtZTogJ1N0YWZmJywgcHJpb3JpdHk6IDN9O1xyXG4gICAgcm9sZXNbVXNlci5BRE1JTl0gPSB7bmFtZTogJ0FkbWluJywgcHJpb3JpdHk6IDR9O1xyXG5cclxuICAgIHJldHVybiByb2xlcztcclxufVxyXG5cclxuVXNlci5wcm90b3R5cGUuZ2V0VXNlclJvbGVzID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gVXNlci5nZXRVc2VyUm9sZXMoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgcm9sZXMgZm9yIHRoaXMgdXNlci4gTWVtYmVyc2hpcCByb2xlcyB0YWtlIHByaW9yaXR5XHJcbiAqIG92ZXIgcm9sZXMgZm9yIGp1c3QgYSB1c2VyIHdobyBpcyBub3QgYSBtZW1iZXIuXHJcbiAqL1xyXG5Vc2VyLnByb3RvdHlwZS5nZXRSb2xlcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IG1lbWJlciA9IHRoaXMubWVtYmVyO1xyXG4gICAgaWYobWVtYmVyICE9PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIG1lbWJlci5nZXRSb2xlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBVc2VyLmdldFVzZXJSb2xlcygpO1xyXG59XHJcblxyXG5Vc2VyLnByb3RvdHlwZS5hdExlYXN0ID0gZnVuY3Rpb24oYXRMZWFzdCkge1xyXG4gICAgbGV0IHJvbGUgPSB0aGlzLnJvbGUoKTtcclxuICAgIGxldCByb2xlcyA9IHRoaXMuZ2V0Um9sZXMoKTtcclxuICAgIGlmKHJvbGVzLmhhc093blByb3BlcnR5KGF0TGVhc3QpKSB7XHJcbiAgICAgICAgcmV0dXJuIHJvbGVzW3JvbGVdLnByaW9yaXR5ID49IHJvbGVzW2F0TGVhc3RdLnByaW9yaXR5O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5Vc2VyLnByb3RvdHlwZS5nZXRSb2xlUHJpb3JpdHkgPSBmdW5jdGlvbihyb2xlKSB7XHJcbiAgICBsZXQgcm9sZXMgPSB0aGlzLmdldFJvbGVzKCk7XHJcbiAgICBpZihyb2xlcy5oYXNPd25Qcm9wZXJ0eShyb2xlKSkge1xyXG4gICAgICAgIHJldHVybiByb2xlc1tyb2xlXS5wcmlvcml0eTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gMDtcclxufVxyXG5cclxuVXNlci5wcm90b3R5cGUuZGlzcGxheU5hbWUgPSBmdW5jdGlvbigpIHtcclxuICAgIGxldCBjb21tYSA9IHRoaXMubmFtZS5pbmRleE9mKCcsJyk7XHJcbiAgICBpZihjb21tYSA8IDApIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBsYXN0ID0gdGhpcy5uYW1lLnN1YnN0cigwLCBjb21tYSk7XHJcbiAgICBsZXQgZmlyc3QgPSB0aGlzLm5hbWUuc3Vic3RyKGNvbW1hKzEpLnRyaW0oKTtcclxuXHJcbiAgICByZXR1cm4gZmlyc3QgKyAnICcgKyBsYXN0O1xyXG59XHJcblxyXG5cclxuVXNlci5wcm90b3R5cGUudXNlclJvbGVOYW1lID0gZnVuY3Rpb24oc2hvcnQpIHtcclxuICAgIGNvbnN0IHJvbGVzID0gdGhpcy5nZXRVc2VyUm9sZXMoKTtcclxuICAgIGxldCByb2xlID0gdGhpcy51c2VyUm9sZSgpO1xyXG4gICAgbGV0IHIgPSByb2xlc1tyb2xlXTtcclxuXHRpZihyID09PSB1bmRlZmluZWQpIHtcclxuXHRcdHJldHVybiAnSW52YWxpZCc7XHJcblx0fVxyXG5cclxuXHRpZihzaG9ydCA9PT0gdHJ1ZSAmJiByLnNob3J0ICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdHJldHVybiByLnNob3J0O1xyXG5cdH1cclxuXHJcbiAgICByZXR1cm4gci5uYW1lO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIFJldHVybiB0aGUgcm9sZSBuYW1lIGZvciB0aGlzIHVzZXIuXHJcbiAqIEBwYXJhbSBzaG9ydCBJZiBzZXQgdG8gdHJ1ZSwgYSBzaG9ydCB2ZXJzaW9uIGlzIHN1cHBsaWVkIGlmIGF2YWlsYWJsZS5cclxuICogQHJldHVybnMgc3RyaW5nXHJcbiAqL1xyXG5Vc2VyLnByb3RvdHlwZS5yb2xlTmFtZSA9IGZ1bmN0aW9uKHNob3J0KSB7XHJcbiAgICBjb25zdCByb2xlcyA9IHRoaXMuZ2V0Um9sZXMoKTtcclxuICAgIGxldCByb2xlID0gdGhpcy5yb2xlKCk7XHJcblx0bGV0IHIgPSByb2xlc1tyb2xlXTtcclxuXHRpZihyID09PSB1bmRlZmluZWQpIHtcclxuXHQgICAgcmV0dXJuICdJbnZhbGlkJztcclxuICAgIH1cclxuXHJcblx0aWYoc2hvcnQgPT09IHRydWUgJiYgci5zaG9ydCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRyZXR1cm4gci5zaG9ydDtcclxuXHR9XHJcblxyXG5cdHJldHVybiByLm5hbWU7XHJcbn1cclxuXHJcblVzZXIuY29tcGFyZSA9IGZ1bmN0aW9uKGEsIGIpIHtcclxuICAgIGxldCBhbiA9IGEubmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgbGV0IGJuID0gYi5uYW1lLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgaWYoYW4gPCBibikge1xyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuXHJcbiAgICBpZihhbiA+IGJuKSB7XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGEuaWQgLSBiLmlkO1xyXG59XHJcblxyXG4vKipcclxuICogSW5zdGFudGlhdGUgYSBNZW1iZXJzaGlwIG9iamVjdCBmb3IgdGhlIHVzZXIuXHJcbiAqIFRoaXMgd2lsbCBiZSByZXBsYWNlZCBieSBhIHBsdWdpbiB0aGF0IGFkZHNcclxuICogc3VwcG9ydCBmb3IgbWVtYmVyc2hpcHMuXHJcbiAqIEBwYXJhbSBkYXRhIG5vcm1hbGx5IGluIHRoZSBmb3JtYXQgdGhlIFBIUCBKU09OIHJlcHJlc2VudGF0aW9uXHJcbiAqIEByZXR1cm5zIHtudWxsfVxyXG4gKi9cclxuVXNlci5pbnN0YW50aWF0ZU1lbWJlciA9IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBVc2VyO1xyXG5leHBvcnQge1VzZXJ9OyIsIi8qKlxyXG4gKiBAZmlsZVxyXG4gKiBGYWN0b3J5IHRoYXQgY3JlYXRlcyB0aGUgVXNlcnMgb2JqZWN0XHJcbiAqL1xyXG5cclxuaW1wb3J0IHtVc2VyfSBmcm9tICcuL1VzZXInO1xyXG5pbXBvcnQge1N0b3JlTW9kdWxlVXNlcn0gZnJvbSAnLi9TdG9yZU1vZHVsZVVzZXInO1xyXG5pbXBvcnQge1N0b3JlTW9kdWxlVXNlcnN9IGZyb20gJy4uL1N0b3JlTW9kdWxlVXNlcnMnO1xyXG5pbXBvcnQge1Blcm1pc3Npb25zfSBmcm9tICcuL1Blcm1pc3Npb25zJztcclxuXHJcbmV4cG9ydCBjb25zdCBVc2Vyc0ZhY3RvcnkgPSBmdW5jdGlvbigpIHt9XHJcblxyXG4vKipcclxuICogRmFjdG9yeSBtZXRob2QgdG8gY3JlYXRlIGEgVXNlcnMgb2JqZWN0LlxyXG4gKlxyXG4gKiBUaGlzIGFsbG93cyBmb3IgaW5qZWN0aW9uIG9mIHRoZSBzdG9yZSBmb3IgdGVzdGluZyBwdXJwb3Nlcy5cclxuICogQHBhcmFtIHN0b3JlIFZ1ZXggc3RvcmUgb2JqZWN0XHJcbiAqIEByZXR1cm5zIHtVc2Vyc30gb2JqZWN0LlxyXG4gKi9cclxuVXNlcnNGYWN0b3J5LmNyZWF0ZSA9IGZ1bmN0aW9uKHNpdGUpIHtcclxuXHJcbiAgICBsZXQgVXNlcnMgPSBmdW5jdGlvbigpIHtcclxuICAgIH1cclxuXHJcbiAgICAvL1xyXG4gICAgLy8gRXhwb3J0ZWQgY29tcG9uZW50cyBhbmQgY29uc3RhbnRzXHJcbiAgICAvL1xyXG4gICAgVXNlcnMuTVVTVF9QUk9WSURFX1VTRVJJRF9PUl9FTUFJTCA9IDEwMTtcclxuICAgIFVzZXJzLlBBU1NXT1JEU19NVVNUX01BVENIID0gMTAyO1xyXG4gICAgVXNlcnMuRFVQTElDQVRFX1VTRVIgPSAxMDM7XHJcbiAgICBVc2Vycy5EVVBMSUNBVEVfRU1BSUwgPSAxMDQ7XHJcblxyXG5cclxuICAgIC8vXHJcbiAgICAvLyBJbnN0YWxsIHRoZSB1c2VycyBzdG9yZSBtb2R1bGVzXHJcbiAgICAvL1xyXG4gICAgbGV0IHN0b3JlID0gc2l0ZS5zdG9yZTtcclxuXHJcbiAgICBpZihzdG9yZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgc3RvcmUucmVnaXN0ZXJNb2R1bGUoJ3VzZXInLCBTdG9yZU1vZHVsZVVzZXIpO1xyXG4gICAgICAgIHN0b3JlLnJlZ2lzdGVyTW9kdWxlKCd1c2VycycsIFN0b3JlTW9kdWxlVXNlcnMuY3JlYXRlKFxyXG4gICAgICAgICAgICAnL2FwaS91c2VycycsXHJcbiAgICAgICAgICAgICh1c2VyKT0+eyByZXR1cm4gdXNlci5pZDsgfVxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNpdGUucmVhZHkoKCkgPT4ge1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gRGV0ZWN0IHRoZSBwYXNzZWQgaW4gdXNlciBpbmZvcm1hdGlvblxyXG4gICAgICAgIC8vIGFuZCBhZGQgaXQgdG8gdGhlIHN0b3JlLlxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgbGV0IGVuO1xyXG4gICAgICAgIGlmKCAoZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2wtdXNlcicpKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBzdG9yZS5jb21taXQoJ3VzZXIvc2V0JywgSlNPTi5wYXJzZShlbi50ZXh0Q29udGVudCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQWRkIHBlcm1pc3Npb25zIGFycmF5IGlmIGF2YWlsYWJsZVxyXG5cdCAgICBpZiggKGVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsLXBlcm1pc3Npb25zJykpICE9PSBudWxsKSB7XHJcblx0XHQgICAgc2l0ZS5wZXJtaXNzaW9ucyA9IG5ldyBQZXJtaXNzaW9ucyhKU09OLnBhcnNlKGVuLnRleHRDb250ZW50KSk7XHJcblx0ICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHNpdGUuVXNlciA9IFVzZXI7XHJcbiAgICBzaXRlLlN0b3JlTW9kdWxlVXNlcnMgPSBTdG9yZU1vZHVsZVVzZXJzO1xyXG5cclxuICAgIHJldHVybiBVc2VycztcclxufVxyXG4iLCJ2YXIgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnNcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vVXNlclZ1ZUJhc2UudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9Vc2VyVnVlQmFzZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIkM6XFxcXFVzZXJzXFxcXGNoYXJsXFxcXERvY3VtZW50c1xcXFxDbGFzc2VzXFxcXENTRTMyMFxcXFx3ZWJcXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJ2M3ZTRlNDllJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJ2M3ZTRlNDllJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIFxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInZlbmRvci9jbC91c2Vycy9qcy9WdWUvVXNlclZ1ZUJhc2UudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0yIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vVXNlclZ1ZUJhc2UudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Vc2VyVnVlQmFzZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiXSwic291cmNlUm9vdCI6IiJ9