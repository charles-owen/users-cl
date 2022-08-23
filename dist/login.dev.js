/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./.yarn/__virtual__/babel-loader-virtual-d726bcbadc/0/cache/babel-loader-npm-8.2.5-e749e26bb5-a660555788.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Login/Login.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/babel-loader-virtual-d726bcbadc/0/cache/babel-loader-npm-8.2.5-e749e26bb5-a660555788.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Login/Login.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

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
var router = new Site.Site.VueRouter({
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
    this.$site.api.post('/api/users/logout', {}).then(function (response) {})["catch"](function (error) {});
  },
  mounted: function mounted() {
    this.redirect = this.$route.query.u;

    if (this.redirect === undefined || this.redirect === null) {
      this.redirect = this.$site.root + '/';
    }
  },
  methods: {
    submit: function submit() {
      var _this = this;

      this.$site.api.post('/api/users/login', this.credentials).then(function (response) {
        if (response.hasError()) {
          _this.$site.toast(_this, response);
        } else {
          window.location = _this.redirect;
        }
      })["catch"](function (error) {
        _this.$site.toast(_this, error);
      });
    }
  }
};

/***/ }),

/***/ "./vendor/cl/users/js/Login/Login.js":
/*!*******************************************!*\
  !*** ./vendor/cl/users/js/Login/Login.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Login_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Login.vue */ "./vendor/cl/users/js/Login/Login.vue");


var Login = function Login() {};

Login.start = function (site) {
  site.ready(function () {
    site.PageVue.create('div.cl-login', 'Login', _Login_vue__WEBPACK_IMPORTED_MODULE_0__["default"]);
  });
};

Login.start(Site.Site);

/***/ }),

/***/ "./.yarn/__virtual__/css-loader-virtual-c29e00cf0e/0/cache/css-loader-npm-6.7.1-b93a2de0d4-170fdbc630.zip/node_modules/css-loader/dist/cjs.js!./.yarn/__virtual__/vue-loader-virtual-8066144fa6/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./.yarn/cache/resolve-url-loader-npm-5.0.0-9b441067c9-6d483733a4.zip/node_modules/resolve-url-loader/index.js!./.yarn/__virtual__/sass-loader-virtual-28c0e7b474/0/cache/sass-loader-npm-13.0.2-ca68afd73d-6306712cc7.zip/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-4[0].rules[0].use[3]!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Login/Login.vue?vue&type=style&index=0&lang=scss&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/css-loader-virtual-c29e00cf0e/0/cache/css-loader-npm-6.7.1-b93a2de0d4-170fdbc630.zip/node_modules/css-loader/dist/cjs.js!./.yarn/__virtual__/vue-loader-virtual-8066144fa6/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./.yarn/cache/resolve-url-loader-npm-5.0.0-9b441067c9-6d483733a4.zip/node_modules/resolve-url-loader/index.js!./.yarn/__virtual__/sass-loader-virtual-28c0e7b474/0/cache/sass-loader-npm-13.0.2-ca68afd73d-6306712cc7.zip/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-4[0].rules[0].use[3]!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Login/Login.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _yarn_virtual_css_loader_virtual_c29e00cf0e_0_cache_css_loader_npm_6_7_1_b93a2de0d4_170fdbc630_zip_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../.yarn/__virtual__/css-loader-virtual-c29e00cf0e/0/cache/css-loader-npm-6.7.1-b93a2de0d4-170fdbc630.zip/node_modules/css-loader/dist/runtime/sourceMaps.js */ "./.yarn/__virtual__/css-loader-virtual-c29e00cf0e/0/cache/css-loader-npm-6.7.1-b93a2de0d4-170fdbc630.zip/node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _yarn_virtual_css_loader_virtual_c29e00cf0e_0_cache_css_loader_npm_6_7_1_b93a2de0d4_170fdbc630_zip_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_yarn_virtual_css_loader_virtual_c29e00cf0e_0_cache_css_loader_npm_6_7_1_b93a2de0d4_170fdbc630_zip_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _yarn_virtual_css_loader_virtual_c29e00cf0e_0_cache_css_loader_npm_6_7_1_b93a2de0d4_170fdbc630_zip_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../.yarn/__virtual__/css-loader-virtual-c29e00cf0e/0/cache/css-loader-npm-6.7.1-b93a2de0d4-170fdbc630.zip/node_modules/css-loader/dist/runtime/api.js */ "./.yarn/__virtual__/css-loader-virtual-c29e00cf0e/0/cache/css-loader-npm-6.7.1-b93a2de0d4-170fdbc630.zip/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _yarn_virtual_css_loader_virtual_c29e00cf0e_0_cache_css_loader_npm_6_7_1_b93a2de0d4_170fdbc630_zip_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_yarn_virtual_css_loader_virtual_c29e00cf0e_0_cache_css_loader_npm_6_7_1_b93a2de0d4_170fdbc630_zip_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _yarn_virtual_css_loader_virtual_c29e00cf0e_0_cache_css_loader_npm_6_7_1_b93a2de0d4_170fdbc630_zip_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_yarn_virtual_css_loader_virtual_c29e00cf0e_0_cache_css_loader_npm_6_7_1_b93a2de0d4_170fdbc630_zip_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "#login fieldset {\n  -moz-box-shadow: 3px 3px 8px #ccc;\n  -webkit-box-shadow: 3px 3px 8px #ccc;\n  box-shadow: 3px 3px 8px #ccc;\n}\n#login fieldset {\n  width: 18em;\n  margin: 1em auto;\n  color: white;\n  background-color: #00723f;\n  border: thin solid black;\n}\n#login #userid, #login #password {\n  width: 16em;\n}\n#login input {\n  color: black;\n}\n#login .msg {\n  text-align: center;\n  color: #ccc;\n  font-style: italic;\n  font-size: 0.9em;\n  display: none;\n}\n#login p {\n  margin: 1em 0;\n}", "",{"version":3,"sources":["webpack://./vendor/cl/site/sass/modules/_colors.scss","webpack://./vendor/cl/users/js/Login/Login.vue"],"names":[],"mappings":"AAgFA;EACE,iCAAA;EACA,oCAAA;EACA,4BAAA;AC/EF;AAuEE;EACE,WAAA;EACA,gBAAA;EACA,YAAA;EACA,yBDnEM;ECoEN,wBAAA;AApEJ;AAwEE;EACE,WAAA;AAtEJ;AAyEE;EACE,YAAA;AAvEJ;AA0EE;EACE,kBAAA;EACA,WAAA;EACA,kBAAA;EACA,gBAAA;EACA,aAAA;AAxEJ;AA2EE;EACE,aAAA;AAzEJ","sourcesContent":["// The major colors\r\n// We have a primary color, two secondary colors, and a complementary color.\r\n$accent: #607D8B;\r\n\r\n$toast-background: #151515;\r\n$toast-text: white;\r\n\r\n$header-background: #535054;\r\n$header-text: #eeeeee;\r\n\r\n// The major colors\r\n// We have a primary color, two secondary colors, and a complementary color.\r\n$primary: #00723f;\r\n$light-primary: #44a26b;\r\n$very-light-primary: #e8f7f3;\r\n$dark-primary: #005223;\r\n$primary-text: #212121;\r\n\r\n$seconda: #00909e;\r\n$secondb: #fcaf17;\r\n$secondc: #c89a58; // #e8d9b5;\r\n\r\n$comp: #c41425;\r\n$blind: #efc6ff;\r\n$comp-background: linear-gradient(#570102, #960606, #570102);\r\n$comp-border: #c7bdbb;\r\n\r\n// Menus\r\n$focus: #008183;\r\n$menu-background: #e8e8e8;\r\n$menu-hover: #d0d0d0;\r\n$menu-color: black;\r\n\r\n// Page background\r\n$background: #eeeeee;\r\n\r\n// Nav\r\n$nav-color: white;\r\n$nav-background: url('img/nav_pattern.png');\r\n$nav-2-color: #ffff99;\r\n$nav-2-background: url('img/nav_pattern-2.png');\r\n\r\n// Tables\r\n$table-gradient-from: #204c42;\r\n$table-gradient-to: #389b54;\r\n\r\n// Dialog boxes\r\n$dialog-gradient-from: #204c42;\r\n$dialog-gradient-to: #389b54;\r\n$dialog-bar-color: white;\r\n\r\n// Link colors\r\n$link: #808080;\r\n$visited: #968443;  // #b09d5b;\r\n$hover: #3366cc;\r\n\r\n$very-light-primary-link: #900000;\r\n$very-light-primary-hover: #c00000;\r\n\r\n\r\n$primary-link: white;\r\n$primary-visited: #dddddd;\r\n$secondb-visited: #555555;\r\n$autoback-link: #882222;\r\n$autoback-link-hover: #cc2222;\r\n\r\n$shadow-x: 3px;\r\n$shadow-y: 3px;\r\n$shadow-radius: 8px;\r\n$shadow-color: #ccc;\r\n\r\n$toggle-link-hover-color: #006600;\r\n\r\n// Boxes\r\n$box-border-color: #bdbdbd;\r\n\r\n// Cards\r\n$card-heading-background: #f2f2f2;\r\n$card-border-color: #cccccc;\r\n\r\n%shadow {\r\n  -moz-box-shadow: $shadow-x $shadow-y $shadow-radius $shadow-color;\r\n  -webkit-box-shadow: $shadow-x $shadow-y $shadow-radius $shadow-color;\r\n  box-shadow: $shadow-x $shadow-y $shadow-radius $shadow-color;\r\n}\r\n\r\n%noshadow {\r\n  -moz-box-shadow: none;\r\n  -webkit-box-shadow: none;\r\n  box-shadow: none;\r\n}\r\n","\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n@import '../../../site/sass/modules/_colors';\n\n#login {\n\n  fieldset {\n    width: 18em;\n    margin: 1em auto;\n    color: white;\n    background-color: $primary;\n    border: thin solid black;\n    @extend %shadow;\n  }\n\n  #userid, #password {\n    width: 16em;\n  }\n\n  input {\n    color: black;\n  }\n\n  .msg {\n    text-align: center;\n    color: #ccc;\n    font-style: italic;\n    font-size: 0.9em;\n    display: none;\n  }\n\n  p {\n    margin: 1em 0;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./.yarn/__virtual__/style-loader-virtual-45f75bcb4b/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/cjs.js!./.yarn/__virtual__/css-loader-virtual-c29e00cf0e/0/cache/css-loader-npm-6.7.1-b93a2de0d4-170fdbc630.zip/node_modules/css-loader/dist/cjs.js!./.yarn/__virtual__/vue-loader-virtual-8066144fa6/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./.yarn/cache/resolve-url-loader-npm-5.0.0-9b441067c9-6d483733a4.zip/node_modules/resolve-url-loader/index.js!./.yarn/__virtual__/sass-loader-virtual-28c0e7b474/0/cache/sass-loader-npm-13.0.2-ca68afd73d-6306712cc7.zip/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-4[0].rules[0].use[3]!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Login/Login.vue?vue&type=style&index=0&lang=scss&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/style-loader-virtual-45f75bcb4b/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/cjs.js!./.yarn/__virtual__/css-loader-virtual-c29e00cf0e/0/cache/css-loader-npm-6.7.1-b93a2de0d4-170fdbc630.zip/node_modules/css-loader/dist/cjs.js!./.yarn/__virtual__/vue-loader-virtual-8066144fa6/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./.yarn/cache/resolve-url-loader-npm-5.0.0-9b441067c9-6d483733a4.zip/node_modules/resolve-url-loader/index.js!./.yarn/__virtual__/sass-loader-virtual-28c0e7b474/0/cache/sass-loader-npm-13.0.2-ca68afd73d-6306712cc7.zip/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-4[0].rules[0].use[3]!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Login/Login.vue?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../.yarn/__virtual__/style-loader-virtual-45f75bcb4b/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./.yarn/__virtual__/style-loader-virtual-45f75bcb4b/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../../.yarn/__virtual__/style-loader-virtual-45f75bcb4b/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./.yarn/__virtual__/style-loader-virtual-45f75bcb4b/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../.yarn/__virtual__/style-loader-virtual-45f75bcb4b/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/runtime/insertBySelector.js */ "./.yarn/__virtual__/style-loader-virtual-45f75bcb4b/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../.yarn/__virtual__/style-loader-virtual-45f75bcb4b/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./.yarn/__virtual__/style-loader-virtual-45f75bcb4b/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../../.yarn/__virtual__/style-loader-virtual-45f75bcb4b/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./.yarn/__virtual__/style-loader-virtual-45f75bcb4b/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../../.yarn/__virtual__/style-loader-virtual-45f75bcb4b/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./.yarn/__virtual__/style-loader-virtual-45f75bcb4b/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _yarn_virtual_css_loader_virtual_c29e00cf0e_0_cache_css_loader_npm_6_7_1_b93a2de0d4_170fdbc630_zip_node_modules_css_loader_dist_cjs_js_yarn_virtual_vue_loader_virtual_8066144fa6_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_loaders_stylePostLoader_js_yarn_cache_resolve_url_loader_npm_5_0_0_9b441067c9_6d483733a4_zip_node_modules_resolve_url_loader_index_js_yarn_virtual_sass_loader_virtual_28c0e7b474_0_cache_sass_loader_npm_13_0_2_ca68afd73d_6306712cc7_zip_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_4_0_rules_0_use_3_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../../.yarn/__virtual__/css-loader-virtual-c29e00cf0e/0/cache/css-loader-npm-6.7.1-b93a2de0d4-170fdbc630.zip/node_modules/css-loader/dist/cjs.js!../../../../../.yarn/__virtual__/vue-loader-virtual-8066144fa6/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../.yarn/cache/resolve-url-loader-npm-5.0.0-9b441067c9-6d483733a4.zip/node_modules/resolve-url-loader/index.js!../../../../../.yarn/__virtual__/sass-loader-virtual-28c0e7b474/0/cache/sass-loader-npm-13.0.2-ca68afd73d-6306712cc7.zip/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-4[0].rules[0].use[3]!../../../../../.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./Login.vue?vue&type=style&index=0&lang=scss& */ "./.yarn/__virtual__/css-loader-virtual-c29e00cf0e/0/cache/css-loader-npm-6.7.1-b93a2de0d4-170fdbc630.zip/node_modules/css-loader/dist/cjs.js!./.yarn/__virtual__/vue-loader-virtual-8066144fa6/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./.yarn/cache/resolve-url-loader-npm-5.0.0-9b441067c9-6d483733a4.zip/node_modules/resolve-url-loader/index.js!./.yarn/__virtual__/sass-loader-virtual-28c0e7b474/0/cache/sass-loader-npm-13.0.2-ca68afd73d-6306712cc7.zip/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-4[0].rules[0].use[3]!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Login/Login.vue?vue&type=style&index=0&lang=scss&");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_yarn_virtual_css_loader_virtual_c29e00cf0e_0_cache_css_loader_npm_6_7_1_b93a2de0d4_170fdbc630_zip_node_modules_css_loader_dist_cjs_js_yarn_virtual_vue_loader_virtual_8066144fa6_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_loaders_stylePostLoader_js_yarn_cache_resolve_url_loader_npm_5_0_0_9b441067c9_6d483733a4_zip_node_modules_resolve_url_loader_index_js_yarn_virtual_sass_loader_virtual_28c0e7b474_0_cache_sass_loader_npm_13_0_2_ca68afd73d_6306712cc7_zip_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_4_0_rules_0_use_3_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_yarn_virtual_css_loader_virtual_c29e00cf0e_0_cache_css_loader_npm_6_7_1_b93a2de0d4_170fdbc630_zip_node_modules_css_loader_dist_cjs_js_yarn_virtual_vue_loader_virtual_8066144fa6_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_loaders_stylePostLoader_js_yarn_cache_resolve_url_loader_npm_5_0_0_9b441067c9_6d483733a4_zip_node_modules_resolve_url_loader_index_js_yarn_virtual_sass_loader_virtual_28c0e7b474_0_cache_sass_loader_npm_13_0_2_ca68afd73d_6306712cc7_zip_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_4_0_rules_0_use_3_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_6__["default"] && _yarn_virtual_css_loader_virtual_c29e00cf0e_0_cache_css_loader_npm_6_7_1_b93a2de0d4_170fdbc630_zip_node_modules_css_loader_dist_cjs_js_yarn_virtual_vue_loader_virtual_8066144fa6_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_loaders_stylePostLoader_js_yarn_cache_resolve_url_loader_npm_5_0_0_9b441067c9_6d483733a4_zip_node_modules_resolve_url_loader_index_js_yarn_virtual_sass_loader_virtual_28c0e7b474_0_cache_sass_loader_npm_13_0_2_ca68afd73d_6306712cc7_zip_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_4_0_rules_0_use_3_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _yarn_virtual_css_loader_virtual_c29e00cf0e_0_cache_css_loader_npm_6_7_1_b93a2de0d4_170fdbc630_zip_node_modules_css_loader_dist_cjs_js_yarn_virtual_vue_loader_virtual_8066144fa6_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_loaders_stylePostLoader_js_yarn_cache_resolve_url_loader_npm_5_0_0_9b441067c9_6d483733a4_zip_node_modules_resolve_url_loader_index_js_yarn_virtual_sass_loader_virtual_28c0e7b474_0_cache_sass_loader_npm_13_0_2_ca68afd73d_6306712cc7_zip_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_4_0_rules_0_use_3_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./vendor/cl/users/js/Login/Login.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./vendor/cl/users/js/Login/Login.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _yarn_virtual_babel_loader_virtual_d726bcbadc_0_cache_babel_loader_npm_8_2_5_e749e26bb5_a660555788_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_0_rules_0_use_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../.yarn/__virtual__/babel-loader-virtual-d726bcbadc/0/cache/babel-loader-npm-8.2.5-e749e26bb5-a660555788.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!../../../../../.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./Login.vue?vue&type=script&lang=js& */ "./.yarn/__virtual__/babel-loader-virtual-d726bcbadc/0/cache/babel-loader-npm-8.2.5-e749e26bb5-a660555788.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Login/Login.vue?vue&type=script&lang=js&");
/* harmony import */ var _yarn_virtual_babel_loader_virtual_d726bcbadc_0_cache_babel_loader_npm_8_2_5_e749e26bb5_a660555788_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_0_rules_0_use_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_yarn_virtual_babel_loader_virtual_d726bcbadc_0_cache_babel_loader_npm_8_2_5_e749e26bb5_a660555788_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_0_rules_0_use_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _yarn_virtual_babel_loader_virtual_d726bcbadc_0_cache_babel_loader_npm_8_2_5_e749e26bb5_a660555788_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_0_rules_0_use_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _yarn_virtual_babel_loader_virtual_d726bcbadc_0_cache_babel_loader_npm_8_2_5_e749e26bb5_a660555788_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_0_rules_0_use_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((_yarn_virtual_babel_loader_virtual_d726bcbadc_0_cache_babel_loader_npm_8_2_5_e749e26bb5_a660555788_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_0_rules_0_use_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default())); 

/***/ }),

/***/ "./vendor/cl/users/js/Login/Login.vue?vue&type=style&index=0&lang=scss&":
/*!******************************************************************************!*\
  !*** ./vendor/cl/users/js/Login/Login.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _yarn_virtual_style_loader_virtual_45f75bcb4b_0_cache_style_loader_npm_3_3_1_4bbb6ec77f_470feef680_zip_node_modules_style_loader_dist_cjs_js_yarn_virtual_css_loader_virtual_c29e00cf0e_0_cache_css_loader_npm_6_7_1_b93a2de0d4_170fdbc630_zip_node_modules_css_loader_dist_cjs_js_yarn_virtual_vue_loader_virtual_8066144fa6_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_loaders_stylePostLoader_js_yarn_cache_resolve_url_loader_npm_5_0_0_9b441067c9_6d483733a4_zip_node_modules_resolve_url_loader_index_js_yarn_virtual_sass_loader_virtual_28c0e7b474_0_cache_sass_loader_npm_13_0_2_ca68afd73d_6306712cc7_zip_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_4_0_rules_0_use_3_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../.yarn/__virtual__/style-loader-virtual-45f75bcb4b/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/cjs.js!../../../../../.yarn/__virtual__/css-loader-virtual-c29e00cf0e/0/cache/css-loader-npm-6.7.1-b93a2de0d4-170fdbc630.zip/node_modules/css-loader/dist/cjs.js!../../../../../.yarn/__virtual__/vue-loader-virtual-8066144fa6/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../.yarn/cache/resolve-url-loader-npm-5.0.0-9b441067c9-6d483733a4.zip/node_modules/resolve-url-loader/index.js!../../../../../.yarn/__virtual__/sass-loader-virtual-28c0e7b474/0/cache/sass-loader-npm-13.0.2-ca68afd73d-6306712cc7.zip/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-4[0].rules[0].use[3]!../../../../../.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./Login.vue?vue&type=style&index=0&lang=scss& */ "./.yarn/__virtual__/style-loader-virtual-45f75bcb4b/0/cache/style-loader-npm-3.3.1-4bbb6ec77f-470feef680.zip/node_modules/style-loader/dist/cjs.js!./.yarn/__virtual__/css-loader-virtual-c29e00cf0e/0/cache/css-loader-npm-6.7.1-b93a2de0d4-170fdbc630.zip/node_modules/css-loader/dist/cjs.js!./.yarn/__virtual__/vue-loader-virtual-8066144fa6/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./.yarn/cache/resolve-url-loader-npm-5.0.0-9b441067c9-6d483733a4.zip/node_modules/resolve-url-loader/index.js!./.yarn/__virtual__/sass-loader-virtual-28c0e7b474/0/cache/sass-loader-npm-13.0.2-ca68afd73d-6306712cc7.zip/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-4[0].rules[0].use[3]!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Login/Login.vue?vue&type=style&index=0&lang=scss&");


/***/ }),

/***/ "./vendor/cl/users/js/Login/Login.vue?vue&type=template&id=2091d1d1&":
/*!***************************************************************************!*\
  !*** ./vendor/cl/users/js/Login/Login.vue?vue&type=template&id=2091d1d1& ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _yarn_virtual_vue_loader_virtual_8066144fa6_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_2091d1d1___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _yarn_virtual_vue_loader_virtual_8066144fa6_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_2091d1d1___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _yarn_virtual_vue_loader_virtual_8066144fa6_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_2091d1d1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../.yarn/__virtual__/vue-loader-virtual-8066144fa6/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./Login.vue?vue&type=template&id=2091d1d1& */ "./.yarn/__virtual__/vue-loader-virtual-8066144fa6/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Login/Login.vue?vue&type=template&id=2091d1d1&");


/***/ }),

/***/ "./.yarn/__virtual__/vue-loader-virtual-8066144fa6/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Login/Login.vue?vue&type=template&id=2091d1d1&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/vue-loader-virtual-8066144fa6/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Login/Login.vue?vue&type=template&id=2091d1d1& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
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
            return _vm.submit.apply(null, arguments)
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

/***/ "./vendor/cl/users/js/Login/Login.vue":
/*!********************************************!*\
  !*** ./vendor/cl/users/js/Login/Login.vue ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Login_vue_vue_type_template_id_2091d1d1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Login.vue?vue&type=template&id=2091d1d1& */ "./vendor/cl/users/js/Login/Login.vue?vue&type=template&id=2091d1d1&");
/* harmony import */ var _Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Login.vue?vue&type=script&lang=js& */ "./vendor/cl/users/js/Login/Login.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _Login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Login.vue?vue&type=style&index=0&lang=scss& */ "./vendor/cl/users/js/Login/Login.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./.yarn/__virtual__/vue-loader-virtual-a7d4b4cf76/0/cache/vue-loader-npm-15.9.8-438f4d0ff0-ca4c99b261.zip/node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_yarn_virtual_vue_loader_virtual_a7d4b4cf76_0_cache_vue_loader_npm_15_9_8_438f4d0ff0_ca4c99b261_zip_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Login_vue_vue_type_template_id_2091d1d1___WEBPACK_IMPORTED_MODULE_0__.render,
  _Login_vue_vue_type_template_id_2091d1d1___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "vendor/cl/users/js/Login/Login.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"Login": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcourselib"] = self["webpackChunkcourselib"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./vendor/cl/users/js/Login/Login.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFpQixxQkFBcUI7V0FDdEM7V0FDQTtXQUNBLGtCQUFrQixxQkFBcUI7V0FDdkM7V0FDQTtXQUNBLEtBQUs7V0FDTDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDM0JBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDSkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztXQ2hEQTs7Ozs7VUVBQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY291cnNlbGliL3ZlbmRvci9jbC91c2Vycy9qcy9Mb2dpbi9Mb2dpbi52dWUiLCJ3ZWJwYWNrOi8vY291cnNlbGliLy4vdmVuZG9yL2NsL3VzZXJzL2pzL0xvZ2luL0xvZ2luLmpzIiwid2VicGFjazovL2NvdXJzZWxpYi8uL3ZlbmRvci9jbC91c2Vycy9qcy9Mb2dpbi9Mb2dpbi52dWU/MmE3MyIsIndlYnBhY2s6Ly9jb3Vyc2VsaWIvLi92ZW5kb3IvY2wvdXNlcnMvanMvTG9naW4vTG9naW4udnVlP2RkM2UiLCJ3ZWJwYWNrOi8vY291cnNlbGliLy4vdmVuZG9yL2NsL3VzZXJzL2pzL0xvZ2luL0xvZ2luLnZ1ZT83N2RkIiwid2VicGFjazovL2NvdXJzZWxpYi8uL3ZlbmRvci9jbC91c2Vycy9qcy9Mb2dpbi9Mb2dpbi52dWU/MDQ3ZCIsIndlYnBhY2s6Ly9jb3Vyc2VsaWIvLi92ZW5kb3IvY2wvdXNlcnMvanMvTG9naW4vTG9naW4udnVlP2ZkMzYiLCJ3ZWJwYWNrOi8vY291cnNlbGliLy4vdmVuZG9yL2NsL3VzZXJzL2pzL0xvZ2luL0xvZ2luLnZ1ZT9lYTdiIiwid2VicGFjazovL2NvdXJzZWxpYi8uL3ZlbmRvci9jbC91c2Vycy9qcy9Mb2dpbi9Mb2dpbi52dWUiLCJ3ZWJwYWNrOi8vY291cnNlbGliL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NvdXJzZWxpYi93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2NvdXJzZWxpYi93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9jb3Vyc2VsaWIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NvdXJzZWxpYi93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2NvdXJzZWxpYi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NvdXJzZWxpYi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2NvdXJzZWxpYi93ZWJwYWNrL3J1bnRpbWUvbm9kZSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL2NvdXJzZWxpYi93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9jb3Vyc2VsaWIvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2NvdXJzZWxpYi93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2NvdXJzZWxpYi93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vY291cnNlbGliL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+XG4gICAgPGRpdiB2LWlmPVwianNvbi5iZWZvcmUgIT09IHVuZGVmaW5lZFwiIHYtaHRtbD1cImpzb24uYmVmb3JlXCI+PC9kaXY+XG4gICAgPGZvcm0gY2xhc3M9XCJsZWZ0XCIgaWQ9XCJsb2dpblwiIEBzdWJtaXQucHJldmVudD1cInN1Ym1pdFwiIG1ldGhvZD1cInBvc3RcIj5cbiAgICAgIDxmaWVsZHNldD5cbiAgICAgICAgPHA+PGxhYmVsIGZvcj1cInVzZXJpZFwiPlVzZXIgSUQ8L2xhYmVsPjxicj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiB2LW1vZGVsPVwiY3JlZGVudGlhbHMuaWRcIiBpZD1cInVzZXJpZFwiPjwvcD5cbiAgICAgICAgPHA+PGxhYmVsIGZvcj1cInBhc3N3b3JkXCI+UGFzc3dvcmQ8L2xhYmVsPjxicj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgdi1tb2RlbD1cImNyZWRlbnRpYWxzLnBhc3N3b3JkXCIgaWQ9XCJwYXNzd29yZFwiPjwvcD5cbiAgICAgICAgPHA+PGlucHV0IGlkPVwia2VlcFwiIHR5cGU9XCJjaGVja2JveFwiIHYtbW9kZWw9XCJjcmVkZW50aWFscy5rZWVwXCI+IDxsYWJlbCBmb3I9XCJrZWVwXCI+S2VlcCBtZSBsb2dnZWQgaW48L2xhYmVsPjwvcD5cbiAgICAgICAgPHA+PGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIkxvZ2luXCI+PC9wPlxuICAgICAgICA8cCBjbGFzcz1cIm1zZ1wiPnt7bXNnfX08L3A+XG4gICAgICA8L2ZpZWxkc2V0PlxuICAgIDwvZm9ybT5cbiAgICA8ZGl2IGNsYXNzPVwibGVmdFwiIHYtaWY9XCJqc29uLmFmdGVyICE9PSB1bmRlZmluZWRcIiB2LWh0bWw9XCJqc29uLmFmdGVyXCI+PC9kaXY+XG4gIDwvZGl2PlxuXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGxldCByb3V0ZXIgPSBuZXcgU2l0ZS5TaXRlLlZ1ZVJvdXRlcih7XG4gICAgICAgIG1vZGU6ICdoaXN0b3J5JyxcbiAgICAgICAgcm91dGVzOiBbXVxuICAgIH0pO1xuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgICAgIHJvdXRlcixcbiAgICAgICAgZGF0YTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICcnLFxuICAgICAgICAgICAgICAgICAgICBrZWVwOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbXNnOiAnJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwcm9wczogWydqc29uJ10sXG4gICAgICAgIGNyZWF0ZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy4kc2l0ZS5hcGkucG9zdCgnL2FwaS91c2Vycy9sb2dvdXQnLCB7fSlcbiAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgbW91bnRlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLnJlZGlyZWN0ID0gdGhpcy4kcm91dGUucXVlcnkudTtcbiAgICAgICAgICAgIGlmKHRoaXMucmVkaXJlY3QgPT09IHVuZGVmaW5lZCB8fCB0aGlzLnJlZGlyZWN0ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWRpcmVjdCA9IHRoaXMuJHNpdGUucm9vdCArICcvJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kczoge1xuICAgICAgICAgICAgc3VibWl0KCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJHNpdGUuYXBpLnBvc3QoJy9hcGkvdXNlcnMvbG9naW4nLCB0aGlzLmNyZWRlbnRpYWxzKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBpZihyZXNwb25zZS5oYXNFcnJvcigpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzaXRlLnRvYXN0KHRoaXMsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSB0aGlzLnJlZGlyZWN0O1xuICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2l0ZS50b2FzdCh0aGlzLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxuQGltcG9ydCAnLi4vLi4vLi4vc2l0ZS9zYXNzL21vZHVsZXMvX2NvbG9ycyc7XG5cbiNsb2dpbiB7XG5cbiAgZmllbGRzZXQge1xuICAgIHdpZHRoOiAxOGVtO1xuICAgIG1hcmdpbjogMWVtIGF1dG87XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRwcmltYXJ5O1xuICAgIGJvcmRlcjogdGhpbiBzb2xpZCBibGFjaztcbiAgICBAZXh0ZW5kICVzaGFkb3c7XG4gIH1cblxuICAjdXNlcmlkLCAjcGFzc3dvcmQge1xuICAgIHdpZHRoOiAxNmVtO1xuICB9XG5cbiAgaW5wdXQge1xuICAgIGNvbG9yOiBibGFjaztcbiAgfVxuXG4gIC5tc2cge1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBjb2xvcjogI2NjYztcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgZm9udC1zaXplOiAwLjllbTtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG5cbiAgcCB7XG4gICAgbWFyZ2luOiAxZW0gMDtcbiAgfVxufVxuPC9zdHlsZT5cbiIsImltcG9ydCBMb2dpblZ1ZSBmcm9tICcuL0xvZ2luLnZ1ZSc7XG5sZXQgTG9naW4gPSBmdW5jdGlvbigpIHtcblxufVxuXG5Mb2dpbi5zdGFydCA9IGZ1bmN0aW9uKHNpdGUpIHtcblxuICAgIHNpdGUucmVhZHkoKCkgPT4ge1xuICAgICAgICBzaXRlLlBhZ2VWdWUuY3JlYXRlKCdkaXYuY2wtbG9naW4nLCAnTG9naW4nLCBMb2dpblZ1ZSk7XG4gICAgfSlcblxufVxuXG5Mb2dpbi5zdGFydChTaXRlLlNpdGUpO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL2Nzcy1sb2FkZXItdmlydHVhbC1jMjllMDBjZjBlLzAvY2FjaGUvY3NzLWxvYWRlci1ucG0tNi43LjEtYjkzYTJkZTBkNC0xNzBmZGJjNjMwLnppcC9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vY3NzLWxvYWRlci12aXJ0dWFsLWMyOWUwMGNmMGUvMC9jYWNoZS9jc3MtbG9hZGVyLW5wbS02LjcuMS1iOTNhMmRlMGQ0LTE3MGZkYmM2MzAuemlwL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIiNsb2dpbiBmaWVsZHNldCB7XFxuICAtbW96LWJveC1zaGFkb3c6IDNweCAzcHggOHB4ICNjY2M7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IDNweCAzcHggOHB4ICNjY2M7XFxuICBib3gtc2hhZG93OiAzcHggM3B4IDhweCAjY2NjO1xcbn1cXG4jbG9naW4gZmllbGRzZXQge1xcbiAgd2lkdGg6IDE4ZW07XFxuICBtYXJnaW46IDFlbSBhdXRvO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwNzIzZjtcXG4gIGJvcmRlcjogdGhpbiBzb2xpZCBibGFjaztcXG59XFxuI2xvZ2luICN1c2VyaWQsICNsb2dpbiAjcGFzc3dvcmQge1xcbiAgd2lkdGg6IDE2ZW07XFxufVxcbiNsb2dpbiBpbnB1dCB7XFxuICBjb2xvcjogYmxhY2s7XFxufVxcbiNsb2dpbiAubXNnIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGNvbG9yOiAjY2NjO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgZm9udC1zaXplOiAwLjllbTtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcbiNsb2dpbiBwIHtcXG4gIG1hcmdpbjogMWVtIDA7XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3ZlbmRvci9jbC9zaXRlL3Nhc3MvbW9kdWxlcy9fY29sb3JzLnNjc3NcIixcIndlYnBhY2s6Ly8uL3ZlbmRvci9jbC91c2Vycy9qcy9Mb2dpbi9Mb2dpbi52dWVcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBZ0ZBO0VBQ0UsaUNBQUE7RUFDQSxvQ0FBQTtFQUNBLDRCQUFBO0FDL0VGO0FBdUVFO0VBQ0UsV0FBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLHlCRG5FTTtFQ29FTix3QkFBQTtBQXBFSjtBQXdFRTtFQUNFLFdBQUE7QUF0RUo7QUF5RUU7RUFDRSxZQUFBO0FBdkVKO0FBMEVFO0VBQ0Usa0JBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7QUF4RUo7QUEyRUU7RUFDRSxhQUFBO0FBekVKXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8vIFRoZSBtYWpvciBjb2xvcnNcXHJcXG4vLyBXZSBoYXZlIGEgcHJpbWFyeSBjb2xvciwgdHdvIHNlY29uZGFyeSBjb2xvcnMsIGFuZCBhIGNvbXBsZW1lbnRhcnkgY29sb3IuXFxyXFxuJGFjY2VudDogIzYwN0Q4QjtcXHJcXG5cXHJcXG4kdG9hc3QtYmFja2dyb3VuZDogIzE1MTUxNTtcXHJcXG4kdG9hc3QtdGV4dDogd2hpdGU7XFxyXFxuXFxyXFxuJGhlYWRlci1iYWNrZ3JvdW5kOiAjNTM1MDU0O1xcclxcbiRoZWFkZXItdGV4dDogI2VlZWVlZTtcXHJcXG5cXHJcXG4vLyBUaGUgbWFqb3IgY29sb3JzXFxyXFxuLy8gV2UgaGF2ZSBhIHByaW1hcnkgY29sb3IsIHR3byBzZWNvbmRhcnkgY29sb3JzLCBhbmQgYSBjb21wbGVtZW50YXJ5IGNvbG9yLlxcclxcbiRwcmltYXJ5OiAjMDA3MjNmO1xcclxcbiRsaWdodC1wcmltYXJ5OiAjNDRhMjZiO1xcclxcbiR2ZXJ5LWxpZ2h0LXByaW1hcnk6ICNlOGY3ZjM7XFxyXFxuJGRhcmstcHJpbWFyeTogIzAwNTIyMztcXHJcXG4kcHJpbWFyeS10ZXh0OiAjMjEyMTIxO1xcclxcblxcclxcbiRzZWNvbmRhOiAjMDA5MDllO1xcclxcbiRzZWNvbmRiOiAjZmNhZjE3O1xcclxcbiRzZWNvbmRjOiAjYzg5YTU4OyAvLyAjZThkOWI1O1xcclxcblxcclxcbiRjb21wOiAjYzQxNDI1O1xcclxcbiRibGluZDogI2VmYzZmZjtcXHJcXG4kY29tcC1iYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoIzU3MDEwMiwgIzk2MDYwNiwgIzU3MDEwMik7XFxyXFxuJGNvbXAtYm9yZGVyOiAjYzdiZGJiO1xcclxcblxcclxcbi8vIE1lbnVzXFxyXFxuJGZvY3VzOiAjMDA4MTgzO1xcclxcbiRtZW51LWJhY2tncm91bmQ6ICNlOGU4ZTg7XFxyXFxuJG1lbnUtaG92ZXI6ICNkMGQwZDA7XFxyXFxuJG1lbnUtY29sb3I6IGJsYWNrO1xcclxcblxcclxcbi8vIFBhZ2UgYmFja2dyb3VuZFxcclxcbiRiYWNrZ3JvdW5kOiAjZWVlZWVlO1xcclxcblxcclxcbi8vIE5hdlxcclxcbiRuYXYtY29sb3I6IHdoaXRlO1xcclxcbiRuYXYtYmFja2dyb3VuZDogdXJsKCdpbWcvbmF2X3BhdHRlcm4ucG5nJyk7XFxyXFxuJG5hdi0yLWNvbG9yOiAjZmZmZjk5O1xcclxcbiRuYXYtMi1iYWNrZ3JvdW5kOiB1cmwoJ2ltZy9uYXZfcGF0dGVybi0yLnBuZycpO1xcclxcblxcclxcbi8vIFRhYmxlc1xcclxcbiR0YWJsZS1ncmFkaWVudC1mcm9tOiAjMjA0YzQyO1xcclxcbiR0YWJsZS1ncmFkaWVudC10bzogIzM4OWI1NDtcXHJcXG5cXHJcXG4vLyBEaWFsb2cgYm94ZXNcXHJcXG4kZGlhbG9nLWdyYWRpZW50LWZyb206ICMyMDRjNDI7XFxyXFxuJGRpYWxvZy1ncmFkaWVudC10bzogIzM4OWI1NDtcXHJcXG4kZGlhbG9nLWJhci1jb2xvcjogd2hpdGU7XFxyXFxuXFxyXFxuLy8gTGluayBjb2xvcnNcXHJcXG4kbGluazogIzgwODA4MDtcXHJcXG4kdmlzaXRlZDogIzk2ODQ0MzsgIC8vICNiMDlkNWI7XFxyXFxuJGhvdmVyOiAjMzM2NmNjO1xcclxcblxcclxcbiR2ZXJ5LWxpZ2h0LXByaW1hcnktbGluazogIzkwMDAwMDtcXHJcXG4kdmVyeS1saWdodC1wcmltYXJ5LWhvdmVyOiAjYzAwMDAwO1xcclxcblxcclxcblxcclxcbiRwcmltYXJ5LWxpbms6IHdoaXRlO1xcclxcbiRwcmltYXJ5LXZpc2l0ZWQ6ICNkZGRkZGQ7XFxyXFxuJHNlY29uZGItdmlzaXRlZDogIzU1NTU1NTtcXHJcXG4kYXV0b2JhY2stbGluazogIzg4MjIyMjtcXHJcXG4kYXV0b2JhY2stbGluay1ob3ZlcjogI2NjMjIyMjtcXHJcXG5cXHJcXG4kc2hhZG93LXg6IDNweDtcXHJcXG4kc2hhZG93LXk6IDNweDtcXHJcXG4kc2hhZG93LXJhZGl1czogOHB4O1xcclxcbiRzaGFkb3ctY29sb3I6ICNjY2M7XFxyXFxuXFxyXFxuJHRvZ2dsZS1saW5rLWhvdmVyLWNvbG9yOiAjMDA2NjAwO1xcclxcblxcclxcbi8vIEJveGVzXFxyXFxuJGJveC1ib3JkZXItY29sb3I6ICNiZGJkYmQ7XFxyXFxuXFxyXFxuLy8gQ2FyZHNcXHJcXG4kY2FyZC1oZWFkaW5nLWJhY2tncm91bmQ6ICNmMmYyZjI7XFxyXFxuJGNhcmQtYm9yZGVyLWNvbG9yOiAjY2NjY2NjO1xcclxcblxcclxcbiVzaGFkb3cge1xcclxcbiAgLW1vei1ib3gtc2hhZG93OiAkc2hhZG93LXggJHNoYWRvdy15ICRzaGFkb3ctcmFkaXVzICRzaGFkb3ctY29sb3I7XFxyXFxuICAtd2Via2l0LWJveC1zaGFkb3c6ICRzaGFkb3cteCAkc2hhZG93LXkgJHNoYWRvdy1yYWRpdXMgJHNoYWRvdy1jb2xvcjtcXHJcXG4gIGJveC1zaGFkb3c6ICRzaGFkb3cteCAkc2hhZG93LXkgJHNoYWRvdy1yYWRpdXMgJHNoYWRvdy1jb2xvcjtcXHJcXG59XFxyXFxuXFxyXFxuJW5vc2hhZG93IHtcXHJcXG4gIC1tb3otYm94LXNoYWRvdzogbm9uZTtcXHJcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogbm9uZTtcXHJcXG4gIGJveC1zaGFkb3c6IG5vbmU7XFxyXFxufVxcclxcblwiLFwiXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuQGltcG9ydCAnLi4vLi4vLi4vc2l0ZS9zYXNzL21vZHVsZXMvX2NvbG9ycyc7XFxuXFxuI2xvZ2luIHtcXG5cXG4gIGZpZWxkc2V0IHtcXG4gICAgd2lkdGg6IDE4ZW07XFxuICAgIG1hcmdpbjogMWVtIGF1dG87XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHByaW1hcnk7XFxuICAgIGJvcmRlcjogdGhpbiBzb2xpZCBibGFjaztcXG4gICAgQGV4dGVuZCAlc2hhZG93O1xcbiAgfVxcblxcbiAgI3VzZXJpZCwgI3Bhc3N3b3JkIHtcXG4gICAgd2lkdGg6IDE2ZW07XFxuICB9XFxuXFxuICBpbnB1dCB7XFxuICAgIGNvbG9yOiBibGFjaztcXG4gIH1cXG5cXG4gIC5tc2cge1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGNvbG9yOiAjY2NjO1xcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICAgIGZvbnQtc2l6ZTogMC45ZW07XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICB9XFxuXFxuICBwIHtcXG4gICAgbWFyZ2luOiAxZW0gMDtcXG4gIH1cXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3N0eWxlLWxvYWRlci12aXJ0dWFsLTQ1Zjc1YmNiNGIvMC9jYWNoZS9zdHlsZS1sb2FkZXItbnBtLTMuMy4xLTRiYmI2ZWM3N2YtNDcwZmVlZjY4MC56aXAvbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vc3R5bGUtbG9hZGVyLXZpcnR1YWwtNDVmNzViY2I0Yi8wL2NhY2hlL3N0eWxlLWxvYWRlci1ucG0tMy4zLjEtNGJiYjZlYzc3Zi00NzBmZWVmNjgwLnppcC9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vc3R5bGUtbG9hZGVyLXZpcnR1YWwtNDVmNzViY2I0Yi8wL2NhY2hlL3N0eWxlLWxvYWRlci1ucG0tMy4zLjEtNGJiYjZlYzc3Zi00NzBmZWVmNjgwLnppcC9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3N0eWxlLWxvYWRlci12aXJ0dWFsLTQ1Zjc1YmNiNGIvMC9jYWNoZS9zdHlsZS1sb2FkZXItbnBtLTMuMy4xLTRiYmI2ZWM3N2YtNDcwZmVlZjY4MC56aXAvbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vc3R5bGUtbG9hZGVyLXZpcnR1YWwtNDVmNzViY2I0Yi8wL2NhY2hlL3N0eWxlLWxvYWRlci1ucG0tMy4zLjEtNGJiYjZlYzc3Zi00NzBmZWVmNjgwLnppcC9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vc3R5bGUtbG9hZGVyLXZpcnR1YWwtNDVmNzViY2I0Yi8wL2NhY2hlL3N0eWxlLWxvYWRlci1ucG0tMy4zLjEtNGJiYjZlYzc3Zi00NzBmZWVmNjgwLnppcC9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vY3NzLWxvYWRlci12aXJ0dWFsLWMyOWUwMGNmMGUvMC9jYWNoZS9jc3MtbG9hZGVyLW5wbS02LjcuMS1iOTNhMmRlMGQ0LTE3MGZkYmM2MzAuemlwL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3Z1ZS1sb2FkZXItdmlydHVhbC04MDY2MTQ0ZmE2LzAvY2FjaGUvdnVlLWxvYWRlci1ucG0tMTUuOS44LTQzOGY0ZDBmZjAtY2E0Yzk5YjI2MS56aXAvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uLy55YXJuL2NhY2hlL3Jlc29sdmUtdXJsLWxvYWRlci1ucG0tNS4wLjAtOWI0NDEwNjdjOS02ZDQ4MzczM2E0LnppcC9ub2RlX21vZHVsZXMvcmVzb2x2ZS11cmwtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3Nhc3MtbG9hZGVyLXZpcnR1YWwtMjhjMGU3YjQ3NC8wL2NhY2hlL3Nhc3MtbG9hZGVyLW5wbS0xMy4wLjItY2E2OGFmZDczZC02MzA2NzEyY2M3LnppcC9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanM/P2Nsb25lZFJ1bGVTZXQtNFswXS5ydWxlc1swXS51c2VbM10hLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vdnVlLWxvYWRlci12aXJ0dWFsLWE3ZDRiNGNmNzYvMC9jYWNoZS92dWUtbG9hZGVyLW5wbS0xNS45LjgtNDM4ZjRkMGZmMC1jYTRjOTliMjYxLnppcC9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0xvZ2luLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmxhbmc9c2NzcyZcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy9jc3MtbG9hZGVyLXZpcnR1YWwtYzI5ZTAwY2YwZS8wL2NhY2hlL2Nzcy1sb2FkZXItbnBtLTYuNy4xLWI5M2EyZGUwZDQtMTcwZmRiYzYzMC56aXAvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vdnVlLWxvYWRlci12aXJ0dWFsLTgwNjYxNDRmYTYvMC9jYWNoZS92dWUtbG9hZGVyLW5wbS0xNS45LjgtNDM4ZjRkMGZmMC1jYTRjOTliMjYxLnppcC9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vLnlhcm4vY2FjaGUvcmVzb2x2ZS11cmwtbG9hZGVyLW5wbS01LjAuMC05YjQ0MTA2N2M5LTZkNDgzNzMzYTQuemlwL25vZGVfbW9kdWxlcy9yZXNvbHZlLXVybC1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vc2Fzcy1sb2FkZXItdmlydHVhbC0yOGMwZTdiNDc0LzAvY2FjaGUvc2Fzcy1sb2FkZXItbnBtLTEzLjAuMi1jYTY4YWZkNzNkLTYzMDY3MTJjYzcuemlwL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcz8/Y2xvbmVkUnVsZVNldC00WzBdLnJ1bGVzWzBdLnVzZVszXSEuLi8uLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy92dWUtbG9hZGVyLXZpcnR1YWwtYTdkNGI0Y2Y3Ni8wL2NhY2hlL3Z1ZS1sb2FkZXItbnBtLTE1LjkuOC00MzhmNGQwZmYwLWNhNGM5OWIyNjEuemlwL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vTG9naW4udnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmbGFuZz1zY3NzJlwiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vYmFiZWwtbG9hZGVyLXZpcnR1YWwtZDcyNmJjYmFkYy8wL2NhY2hlL2JhYmVsLWxvYWRlci1ucG0tOC4yLjUtZTc0OWUyNmJiNS1hNjYwNTU1Nzg4LnppcC9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/Y2xvbmVkUnVsZVNldC0yWzBdLnJ1bGVzWzBdLnVzZSEuLi8uLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy92dWUtbG9hZGVyLXZpcnR1YWwtYTdkNGI0Y2Y3Ni8wL2NhY2hlL3Z1ZS1sb2FkZXItbnBtLTE1LjkuOC00MzhmNGQwZmYwLWNhNGM5OWIyNjEuemlwL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vTG9naW4udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL2JhYmVsLWxvYWRlci12aXJ0dWFsLWQ3MjZiY2JhZGMvMC9jYWNoZS9iYWJlbC1sb2FkZXItbnBtLTguMi41LWU3NDllMjZiYjUtYTY2MDU1NTc4OC56aXAvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P2Nsb25lZFJ1bGVTZXQtMlswXS5ydWxlc1swXS51c2UhLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vdnVlLWxvYWRlci12aXJ0dWFsLWE3ZDRiNGNmNzYvMC9jYWNoZS92dWUtbG9hZGVyLW5wbS0xNS45LjgtNDM4ZjRkMGZmMC1jYTRjOTliMjYxLnppcC9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0xvZ2luLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3N0eWxlLWxvYWRlci12aXJ0dWFsLTQ1Zjc1YmNiNGIvMC9jYWNoZS9zdHlsZS1sb2FkZXItbnBtLTMuMy4xLTRiYmI2ZWM3N2YtNDcwZmVlZjY4MC56aXAvbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy9jc3MtbG9hZGVyLXZpcnR1YWwtYzI5ZTAwY2YwZS8wL2NhY2hlL2Nzcy1sb2FkZXItbnBtLTYuNy4xLWI5M2EyZGUwZDQtMTcwZmRiYzYzMC56aXAvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vdnVlLWxvYWRlci12aXJ0dWFsLTgwNjYxNDRmYTYvMC9jYWNoZS92dWUtbG9hZGVyLW5wbS0xNS45LjgtNDM4ZjRkMGZmMC1jYTRjOTliMjYxLnppcC9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vLnlhcm4vY2FjaGUvcmVzb2x2ZS11cmwtbG9hZGVyLW5wbS01LjAuMC05YjQ0MTA2N2M5LTZkNDgzNzMzYTQuemlwL25vZGVfbW9kdWxlcy9yZXNvbHZlLXVybC1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vc2Fzcy1sb2FkZXItdmlydHVhbC0yOGMwZTdiNDc0LzAvY2FjaGUvc2Fzcy1sb2FkZXItbnBtLTEzLjAuMi1jYTY4YWZkNzNkLTYzMDY3MTJjYzcuemlwL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcz8/Y2xvbmVkUnVsZVNldC00WzBdLnJ1bGVzWzBdLnVzZVszXSEuLi8uLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy92dWUtbG9hZGVyLXZpcnR1YWwtYTdkNGI0Y2Y3Ni8wL2NhY2hlL3Z1ZS1sb2FkZXItbnBtLTE1LjkuOC00MzhmNGQwZmYwLWNhNGM5OWIyNjEuemlwL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vTG9naW4udnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmbGFuZz1zY3NzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vdnVlLWxvYWRlci12aXJ0dWFsLTgwNjYxNDRmYTYvMC9jYWNoZS92dWUtbG9hZGVyLW5wbS0xNS45LjgtNDM4ZjRkMGZmMC1jYTRjOTliMjYxLnppcC9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3Z1ZS1sb2FkZXItdmlydHVhbC1hN2Q0YjRjZjc2LzAvY2FjaGUvdnVlLWxvYWRlci1ucG0tMTUuOS44LTQzOGY0ZDBmZjAtY2E0Yzk5YjI2MS56aXAvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Mb2dpbi52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MjA5MWQxZDEmXCIiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY29udGVudFwiIH0sIFtcbiAgICBfdm0uanNvbi5iZWZvcmUgIT09IHVuZGVmaW5lZFxuICAgICAgPyBfYyhcImRpdlwiLCB7IGRvbVByb3BzOiB7IGlubmVySFRNTDogX3ZtLl9zKF92bS5qc29uLmJlZm9yZSkgfSB9KVxuICAgICAgOiBfdm0uX2UoKSxcbiAgICBfdm0uX3YoXCIgXCIpLFxuICAgIF9jKFxuICAgICAgXCJmb3JtXCIsXG4gICAgICB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiBcImxlZnRcIixcbiAgICAgICAgYXR0cnM6IHsgaWQ6IFwibG9naW5cIiwgbWV0aG9kOiBcInBvc3RcIiB9LFxuICAgICAgICBvbjoge1xuICAgICAgICAgIHN1Ym1pdDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgcmV0dXJuIF92bS5zdWJtaXQuYXBwbHkobnVsbCwgYXJndW1lbnRzKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFtcbiAgICAgICAgX2MoXCJmaWVsZHNldFwiLCBbXG4gICAgICAgICAgX2MoXCJwXCIsIFtcbiAgICAgICAgICAgIF9jKFwibGFiZWxcIiwgeyBhdHRyczogeyBmb3I6IFwidXNlcmlkXCIgfSB9LCBbX3ZtLl92KFwiVXNlciBJRFwiKV0pLFxuICAgICAgICAgICAgX2MoXCJiclwiKSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6IFwibW9kZWxcIixcbiAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1tb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5jcmVkZW50aWFscy5pZCxcbiAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiY3JlZGVudGlhbHMuaWRcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJ0ZXh0XCIsIGlkOiBcInVzZXJpZFwiIH0sXG4gICAgICAgICAgICAgIGRvbVByb3BzOiB7IHZhbHVlOiBfdm0uY3JlZGVudGlhbHMuaWQgfSxcbiAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICBpbnB1dDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICBpZiAoJGV2ZW50LnRhcmdldC5jb21wb3NpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBfdm0uJHNldChfdm0uY3JlZGVudGlhbHMsIFwiaWRcIiwgJGV2ZW50LnRhcmdldC52YWx1ZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcInBcIiwgW1xuICAgICAgICAgICAgX2MoXCJsYWJlbFwiLCB7IGF0dHJzOiB7IGZvcjogXCJwYXNzd29yZFwiIH0gfSwgW192bS5fdihcIlBhc3N3b3JkXCIpXSksXG4gICAgICAgICAgICBfYyhcImJyXCIpLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmNyZWRlbnRpYWxzLnBhc3N3b3JkLFxuICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJjcmVkZW50aWFscy5wYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcInBhc3N3b3JkXCIsIGlkOiBcInBhc3N3b3JkXCIgfSxcbiAgICAgICAgICAgICAgZG9tUHJvcHM6IHsgdmFsdWU6IF92bS5jcmVkZW50aWFscy5wYXNzd29yZCB9LFxuICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgIGlucHV0OiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgIGlmICgkZXZlbnQudGFyZ2V0LmNvbXBvc2luZykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF92bS4kc2V0KF92bS5jcmVkZW50aWFscywgXCJwYXNzd29yZFwiLCAkZXZlbnQudGFyZ2V0LnZhbHVlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwicFwiLCBbXG4gICAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6IFwibW9kZWxcIixcbiAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1tb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5jcmVkZW50aWFscy5rZWVwLFxuICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJjcmVkZW50aWFscy5rZWVwXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIGF0dHJzOiB7IGlkOiBcImtlZXBcIiwgdHlwZTogXCJjaGVja2JveFwiIH0sXG4gICAgICAgICAgICAgIGRvbVByb3BzOiB7XG4gICAgICAgICAgICAgICAgY2hlY2tlZDogQXJyYXkuaXNBcnJheShfdm0uY3JlZGVudGlhbHMua2VlcClcbiAgICAgICAgICAgICAgICAgID8gX3ZtLl9pKF92bS5jcmVkZW50aWFscy5rZWVwLCBudWxsKSA+IC0xXG4gICAgICAgICAgICAgICAgICA6IF92bS5jcmVkZW50aWFscy5rZWVwXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgIHZhciAkJGEgPSBfdm0uY3JlZGVudGlhbHMua2VlcCxcbiAgICAgICAgICAgICAgICAgICAgJCRlbCA9ICRldmVudC50YXJnZXQsXG4gICAgICAgICAgICAgICAgICAgICQkYyA9ICQkZWwuY2hlY2tlZCA/IHRydWUgOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoJCRhKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJCR2ID0gbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAkJGkgPSBfdm0uX2koJCRhLCAkJHYpXG4gICAgICAgICAgICAgICAgICAgIGlmICgkJGVsLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAkJGkgPCAwICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uJHNldChfdm0uY3JlZGVudGlhbHMsIFwia2VlcFwiLCAkJGEuY29uY2F0KFskJHZdKSlcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAkJGkgPiAtMSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLiRzZXQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5jcmVkZW50aWFscyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJrZWVwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICQkYS5zbGljZSgwLCAkJGkpLmNvbmNhdCgkJGEuc2xpY2UoJCRpICsgMSkpXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIF92bS4kc2V0KF92bS5jcmVkZW50aWFscywgXCJrZWVwXCIsICQkYylcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIF9jKFwibGFiZWxcIiwgeyBhdHRyczogeyBmb3I6IFwia2VlcFwiIH0gfSwgW1xuICAgICAgICAgICAgICBfdm0uX3YoXCJLZWVwIG1lIGxvZ2dlZCBpblwiKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF92bS5fbSgwKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwicFwiLCB7IHN0YXRpY0NsYXNzOiBcIm1zZ1wiIH0sIFtfdm0uX3YoX3ZtLl9zKF92bS5tc2cpKV0pXG4gICAgICAgIF0pXG4gICAgICBdXG4gICAgKSxcbiAgICBfdm0uX3YoXCIgXCIpLFxuICAgIF92bS5qc29uLmFmdGVyICE9PSB1bmRlZmluZWRcbiAgICAgID8gX2MoXCJkaXZcIiwge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImxlZnRcIixcbiAgICAgICAgICBkb21Qcm9wczogeyBpbm5lckhUTUw6IF92bS5fcyhfdm0uanNvbi5hZnRlcikgfVxuICAgICAgICB9KVxuICAgICAgOiBfdm0uX2UoKVxuICBdKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtcbiAgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF92bSA9IHRoaXNcbiAgICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgICByZXR1cm4gX2MoXCJwXCIsIFtfYyhcImlucHV0XCIsIHsgYXR0cnM6IHsgdHlwZTogXCJzdWJtaXRcIiwgdmFsdWU6IFwiTG9naW5cIiB9IH0pXSlcbiAgfVxuXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL0xvZ2luLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0yMDkxZDFkMSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9Mb2dpbi52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0xvZ2luLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuaW1wb3J0IHN0eWxlMCBmcm9tIFwiLi9Mb2dpbi52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZsYW5nPXNjc3MmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3Z1ZS1sb2FkZXItdmlydHVhbC1hN2Q0YjRjZjc2LzAvY2FjaGUvdnVlLWxvYWRlci1ucG0tMTUuOS44LTQzOGY0ZDBmZjAtY2E0Yzk5YjI2MS56aXAvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiL1VzZXJzL2NoYXJsZXNvd2VuL3dlYi9jb21wbGV0ZS8ueWFybi9jYWNoZS92dWUtaG90LXJlbG9hZC1hcGktbnBtLTIuMy40LTU0OWFlMjYzMzctOWJlZmMwYjNkNi56aXAvbm9kZV9tb2R1bGVzL3Z1ZS1ob3QtcmVsb2FkLWFwaS9kaXN0L2luZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnMjA5MWQxZDEnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnMjA5MWQxZDEnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnMjA5MWQxZDEnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL0xvZ2luLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0yMDkxZDFkMSZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCcyMDkxZDFkMScsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwidmVuZG9yL2NsL3VzZXJzL2pzL0xvZ2luL0xvZ2luLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJMb2dpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjb3Vyc2VsaWJcIl0gPSBzZWxmW1wid2VicGFja0NodW5rY291cnNlbGliXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvclwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3ZlbmRvci9jbC91c2Vycy9qcy9Mb2dpbi9Mb2dpbi5qc1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbIm1vZGUiLCJyb3V0ZXMiLCJtb2R1bGUiLCJyb3V0ZXIiLCJkYXRhIiwiY3JlZGVudGlhbHMiLCJpZCIsInBhc3N3b3JkIiwia2VlcCIsIm1zZyIsInByb3BzIiwiY3JlYXRlZCIsInRoZW4iLCJtb3VudGVkIiwibWV0aG9kcyIsInN1Ym1pdCIsIndpbmRvdyIsIkxvZ2luVnVlIiwiTG9naW4iLCJzdGFydCIsInNpdGUiLCJyZWFkeSIsIlBhZ2VWdWUiLCJjcmVhdGUiLCJTaXRlIl0sInNvdXJjZVJvb3QiOiIifQ==