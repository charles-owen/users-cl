/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./.yarn/__virtual__/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-df5092ef98.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Console/LogViewComponent.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-df5092ef98.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Console/LogViewComponent.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
var ConsoleComponentBase = Site.ConsoleComponentBase;
/**
 * Vue component for viewing the system logs
 *
 * /cl/console/management/logs
 *
 * @constructor
 */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  "extends": ConsoleComponentBase,
  data: function data() {
    return {
      results: [],
      more: false,
      levels: [],
      qLevel: 0,
      // Query level
      qUser: '',
      // Query user
      qMessage: '' // Query message

    };
  },
  mounted: function mounted() {
    this.$parent.setTitle(': Site Logs');

    for (var level in this.$site.LogLevels) {
      this.levels.push({
        value: level,
        name: this.$site.LogLevels[level]
      });
    }

    this.levels.sort(function (a, b) {
      return a.level - b.level;
    });
    this.fetch();
  },
  methods: {
    query: function query() {
      // Clear existing results
      this.results = [];
      this.fetch();
    },
    fetch: function fetch() {
      var _this = this;

      var params = {};

      if (this.results.length > 0) {
        params.before = this.results[this.results.length - 1].time;
      }

      if (+this.qLevel !== 0) {
        params.level = this.qLevel;
      }

      if (this.qUser.trim() !== '') {
        params.name = this.qUser.trim();
      }

      if (this.qMessage.trim() !== '') {
        params.message = this.qMessage.trim();
      }

      this.$site.api.get('/api/site/logs', params).then(function (response) {
        if (!response.hasError()) {
          var data = response.getData('site-log');

          if (data !== null) {
            var results = data.attributes.results;

            var _iterator = _createForOfIteratorHelper(results),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var result = _step.value;

                _this.results.push(result);
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            _this.more = data.attributes.more;
          }
        } else {
          _this.$site.toast(_this, response);
        }
      })["catch"](function (error) {
        console.log(error);

        _this.$site.toast(_this, error);
      });
    },
    getMore: function getMore() {
      this.fetch();
    },
    time: function time(value) {
      return this.$site.TimeFormatter.relativeUNIX(value);
    },
    ids: function ids(result) {
      var str = '';

      if (result.userid !== null) {
        str += result.userid;
      }

      if (result.memberid !== null) {
        str += '/' + result.userid;
      }

      return str;
    },
    levelName: function levelName(level) {
      var levels = this.$site.LogLevels;

      if (levels[level] !== undefined) {
        return levels[level];
      }

      return 'UNDEFINED';
    }
  }
});

/***/ }),

/***/ "./.yarn/__virtual__/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-df5092ef98.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Console/UserEditorComponent.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-df5092ef98.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Console/UserEditorComponent.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Lib_FetcherVue_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Lib/FetcherVue.vue */ "./vendor/cl/users/js/Lib/FetcherVue.vue");
/* harmony import */ var _Lib_PrevNextUser_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Lib/PrevNextUser.vue */ "./vendor/cl/users/js/Lib/PrevNextUser.vue");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuex */ "./.yarn/__virtual__/vuex-virtual-78e0723e30/0/cache/vuex-npm-3.6.2-82badaae22-37915741ba.zip/node_modules/vuex/dist/vuex.esm.js");
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



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ['id'],
  data: function data() {
    return {
      cancel: Site.root + '/cl/console/management/users',
      legend: this.id === 'new' ? 'New User' : 'Edit User',
      roles: Site.User.getUserRoles(),
      user: null,
      userId: '',
      name: '',
      email: '',
      role: '',
      password1: '',
      password2: ''
    };
  },
  computed: (0,vuex__WEBPACK_IMPORTED_MODULE_2__.mapState)({
    fetcher: function fetcher(state) {
      return state.users.fetcher;
    }
  }),
  components: {
    'fetcher': _Lib_FetcherVue_vue__WEBPACK_IMPORTED_MODULE_0__.default,
    'prevNext': _Lib_PrevNextUser_vue__WEBPACK_IMPORTED_MODULE_1__.default
  },
  watch: {
    '$route': function $route(to, from) {
      this.take();
    }
  },
  mounted: function mounted() {
    this.take();
  },
  methods: {
    take: function take() {
      var _this = this;

      if (this.id === 'new') {
        this.$parent.setTitle(': Add User');
        this.role = Site.User.USER;
        this.$nextTick(function () {
          _this.$refs.userid.select();
        });
        this.user = null;
      } else {
        this.$parent.setTitle(': User');
        this.$store.dispatch('users/get', {
          id: this.id
        }).then(function (user) {
          _this.user = user;
          _this.userId = user.userId;
          _this.name = user.name;

          _this.$parent.setTitle(': User ' + user.name);

          _this.email = user.email;
          _this.role = user.userRole();

          _this.$nextTick(function () {
            _this.$refs.userid.select();
          });
        })["catch"](function (msg) {
          Site.toast(_this, msg);
          setTimeout(function () {
            _this.$router.push({
              name: 'users'
            });
          }, 3000);
        });
      }
    },
    submit: function submit() {
      var _this2 = this;

      var data = {
        userId: this.userId,
        name: this.name,
        email: this.email,
        role: this.role,
        password1: this.password1,
        password2: this.password2
      };

      if (this.id !== 'new') {
        data.id = this.id;
      }

      var path = this.id === 'new' ? 'users/new' : 'users/update';
      this.$store.dispatch(path, data).then(function () {
        _this2.$router.push({
          name: 'users'
        });
      })["catch"](function (response) {
        console.log(response);
        Site.toast(_this2, response);

        switch (response.errorCode()) {
          case Users.MUST_PROVIDE_USERID_OR_EMAIL:
            _this2.$refs.userid.focus();

            break;

          case Users.PASSWORDS_MUST_MATCH:
            _this2.$refs.password1.focus();

            break;

          case Users.DUPLICATE_EMAIL:
            _this2.$refs.email.focus();

            break;

          case Users.DUPLICATE_USER:
            _this2.$refs.userid.focus();

            break;
        }
      });
    }
  }
});

/***/ }),

/***/ "./.yarn/__virtual__/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-df5092ef98.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Console/UsersEditorComponent.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-df5092ef98.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Console/UsersEditorComponent.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var dialog_cl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dialog-cl */ "./.yarn/cache/dialog-cl-npm-1.0.6-03d4a3bcc2-f2ed6caec0.zip/node_modules/dialog-cl/index.js");
/* harmony import */ var _Lib_FetcherVue_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Lib/FetcherVue.vue */ "./vendor/cl/users/js/Lib/FetcherVue.vue");
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


var mapState = Site.Vuex.mapState;
var ConsoleComponentBase = Site.ConsoleComponentBase;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  'extends': ConsoleComponentBase,
  props: ['management'],
  data: function data() {
    return {
      root: Site.root,
      pencil: Site.root + '/vendor/cl/site/img/pencil16.png',
      deleter: Site.root + '/vendor/cl/site/img/x.png',
      info: Site.root + '/vendor/cl/site/img/info16.png',
      toUser: function toUser(user) {
        return Site.root + '/cl/console/management/user/' + user.id;
      }
    };
  },
  methods: {
    fetchMore: function fetchMore() {
      this.$store.dispatch('users/more');
    },
    deleteUser: function deleteUser(user) {
      var _this = this;

      new dialog_cl__WEBPACK_IMPORTED_MODULE_0__.default.MessageBox('Are you sure?', 'Are you sure you want to delete ' + user.name, dialog_cl__WEBPACK_IMPORTED_MODULE_0__.default.MessageBox.OKCANCEL, function () {
        _this.$store.dispatch('users/delete', {
          id: user.id
        });
      });
    },
    presentUser: function presentUser(user) {
      var content = "<div class=\"cl-dialog\">\n<div class=\"tabular\">\n<p><span class=\"label\">User ID: </span><span>".concat(user.userId, "</span></p>\n<p><span class=\"label\">Name: </span><span>").concat(user.name, "</span></p>\n<p><span class=\"label\">Email: </span><span>").concat(user.email, "</span></p>\n<p><span class=\"label\">Role: </span><span>").concat(user.userRoleName(), "</span></p>\n</div>\n</div>");
      new dialog_cl__WEBPACK_IMPORTED_MODULE_0__.default({
        content: content
      });
    }
  },
  computed: mapState({
    users: function users(state) {
      return state.users.users;
    },
    // users: state => state.Site.Users,
    fetcher: function fetcher(state) {
      return state.users.fetcher;
    }
  }),
  mounted: function mounted() {
    var _this2 = this;

    this.$parent.setTitle(': Users');
    this.$store.dispatch('users/fetch'); // Add the 'Add User' option to the the nav2 navigation bar

    if (this.management) {
      this.addComponent = this.$site.console.components.addNav2Link(this, 'Add User', 5, function () {
        _this2.$router.push(Site.root + '/cl/console/management/user/new');
      });
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.$site.console.components.removeNav2(this, this.addComponent);
  },
  components: {
    'fetcher': _Lib_FetcherVue_vue__WEBPACK_IMPORTED_MODULE_1__.default
  }
});

/***/ }),

/***/ "./.yarn/__virtual__/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-df5092ef98.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-df5092ef98.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Fetcher": () => (/* binding */ Fetcher),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    fetcher: {
      type: Object,
      'default': null
    },
    fetching: {
      type: Boolean,
      "default": false
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

/***/ "./.yarn/__virtual__/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-df5092ef98.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Lib/PrevNextUser.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-df5092ef98.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Lib/PrevNextUser.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ['user'],
  data: function data() {
    return {
      link: ''
    };
  },
  watch: {
    user: function user() {
      // We have a new user, set the links
      var user = this.user;
      var link = this.link;

      if (user !== null && user.prev !== undefined) {
        this.$set(this.$site.console.components, 'nav2left', {
          template: "<router-link title=\"Previous User\" :to=\"link + user.prev.id\"><img :src=\"icon\" alt=\"Previous User\"></router-link>",
          data: function data() {
            return {
              icon: Site.root + '/vendor/cl/site/img/previcon.png',
              user: user,
              link: link
            };
          }
        });
      } else {
        this.$set(this.$site.console.components, 'nav2left', null);
      }

      if (user !== null && user.next !== undefined) {
        this.$set(this.$site.console.components, 'nav2right', {
          template: "<router-link title=\"Next User\" :to=\"link + user.next.id\"><img :src=\"icon\" alt=\"Next User\"></router-link>",
          data: function data() {
            return {
              icon: Site.root + '/vendor/cl/site/img/nexticon.png',
              user: user,
              link: link
            };
          }
        });
      } else {
        this.$set(this.$site.console.components, 'nav2right', null);
      }
    }
  },
  mounted: function mounted() {
    // Determine the path
    var path = this.$route.path; // Remove the user ID from the end

    var re = /(^.*)\/([0-9]+)$/;
    var match = path.match(re);

    if (match !== null) {
      this.link = match[1] + '/';
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.$set(this.$site.console.components, 'nav2left', null);
    this.$set(this.$site.console.components, 'nav2right', null);
  }
});

/***/ }),

/***/ "./vendor/cl/users/js/Console/UsersConsole.js":
/*!****************************************************!*\
  !*** ./vendor/cl/users/js/Console/UsersConsole.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UsersConsole": () => (/* binding */ UsersConsole)
/* harmony export */ });
/* harmony import */ var _UsersEditorComponent_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UsersEditorComponent.vue */ "./vendor/cl/users/js/Console/UsersEditorComponent.vue");
/* harmony import */ var _UserEditorComponent_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserEditorComponent.vue */ "./vendor/cl/users/js/Console/UserEditorComponent.vue");
/* harmony import */ var _LogViewComponent_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LogViewComponent.vue */ "./vendor/cl/users/js/Console/LogViewComponent.vue");
/* harmony import */ var _Users_User__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Users/User */ "./vendor/cl/users/js/Users/User.js");
/**
 * @file
 * Users console components
 */




var UsersConsole = function UsersConsole(site) {
  var Console = site.console;
  Console.tables.add({
    title: 'Users',
    order: 10,
    api: '/api/users/tables'
  });
  Console.components.addOption({
    atLeast: Site.User.STAFF,
    page: {
      title: 'Main',
      route: '',
      order: 1
    },
    section: {
      title: 'Site',
      order: 1
    },
    title: 'Users',
    order: 1,
    route: '/users',
    routes: [{
      route: '/users',
      component: _UsersEditorComponent_vue__WEBPACK_IMPORTED_MODULE_0__.default,
      props: {
        management: false
      }
    }]
  });
  Console.components.addOption({
    atLeast: Site.User.ADMIN,
    page: {
      title: 'Management',
      route: '/management',
      order: 10
    },
    section: {
      title: 'Site Management',
      order: 1
    },
    title: 'Users',
    order: 1,
    route: '/management/users',
    routes: [{
      route: '/management/users',
      name: 'users',
      component: _UsersEditorComponent_vue__WEBPACK_IMPORTED_MODULE_0__.default,
      props: {
        management: true
      }
    }, {
      route: '/management/user/:id',
      name: 'user',
      component: _UserEditorComponent_vue__WEBPACK_IMPORTED_MODULE_1__.default,
      props: true
    }]
  });
  Console.components.addOption({
    atLeast: {
      tag: 'site-log',
      "default": _Users_User__WEBPACK_IMPORTED_MODULE_3__.User.ADMIN
    },
    page: {
      title: 'Management',
      route: '/management',
      order: 10
    },
    section: {
      title: 'Site Management',
      order: 1
    },
    title: 'Logs',
    order: 2,
    route: '/management/logs',
    routes: [{
      route: '/management/logs',
      name: 'logs',
      component: _LogViewComponent_vue__WEBPACK_IMPORTED_MODULE_2__.default
    }]
  });
};

/***/ }),

/***/ "./vendor/cl/users/js/Console/index.js":
/*!*********************************************!*\
  !*** ./vendor/cl/users/js/Console/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UsersConsole__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UsersConsole */ "./vendor/cl/users/js/Console/UsersConsole.js");
/**
 * @file
 * Course console entry point.
 */

new _UsersConsole__WEBPACK_IMPORTED_MODULE_0__.UsersConsole(Site.Site);

/***/ }),

/***/ "./vendor/cl/users/js/Users/User.js":
/*!******************************************!*\
  !*** ./vendor/cl/users/js/Users/User.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "User": () => (/* binding */ User)
/* harmony export */ });
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

User.prototype.userRoleName = function (_short) {
  var roles = this.getUserRoles();
  var role = this.userRole();
  var r = roles[role];

  if (r === undefined) {
    return 'Invalid';
  }

  if (_short === true && r["short"] !== undefined) {
    return r["short"];
  }

  return r.name;
};
/**
 * Return the role name for this user.
 * @param short If set to true, a short version is supplied if available.
 * @returns string
 */


User.prototype.roleName = function (_short2) {
  var roles = this.getRoles();
  var role = this.role();
  var r = roles[role];

  if (r === undefined) {
    return 'Invalid';
  }

  if (_short2 === true && r["short"] !== undefined) {
    return r["short"];
  }

  return r.name;
};

User.prototype.roleToName = function (role, _short3) {
  var roles = this.getRoles();
  var r = roles[role];

  if (r === undefined) {
    return 'Invalid';
  }

  if (_short3 === true && r["short"] !== undefined) {
    return r["short"];
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (User);


/***/ }),

/***/ "./.yarn/__virtual__/css-loader-virtual-1ddc68b4a1/0/cache/css-loader-npm-5.2.6-118c6d409e-993354a248.zip/node_modules/css-loader/dist/cjs.js!./.yarn/__virtual__/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./.yarn/__virtual__/resolve-url-loader-virtual-ec75d2a09e/0/cache/resolve-url-loader-npm-4.0.0-2a9c18d86b-8e5bcf9786.zip/node_modules/resolve-url-loader/index.js!./.yarn/__virtual__/sass-loader-virtual-3857f5e9f1/0/cache/sass-loader-npm-12.1.0-6188089e12-69c66ea348.zip/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-4[0].rules[0].use[3]!./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/css-loader-virtual-1ddc68b4a1/0/cache/css-loader-npm-5.2.6-118c6d409e-993354a248.zip/node_modules/css-loader/dist/cjs.js!./.yarn/__virtual__/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./.yarn/__virtual__/resolve-url-loader-virtual-ec75d2a09e/0/cache/resolve-url-loader-npm-4.0.0-2a9c18d86b-8e5bcf9786.zip/node_modules/resolve-url-loader/index.js!./.yarn/__virtual__/sass-loader-virtual-3857f5e9f1/0/cache/sass-loader-npm-12.1.0-6188089e12-69c66ea348.zip/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-4[0].rules[0].use[3]!./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _yarn_virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_993354a248_zip_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../.yarn/__virtual__/css-loader-virtual-1ddc68b4a1/0/cache/css-loader-npm-5.2.6-118c6d409e-993354a248.zip/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./.yarn/__virtual__/css-loader-virtual-1ddc68b4a1/0/cache/css-loader-npm-5.2.6-118c6d409e-993354a248.zip/node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _yarn_virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_993354a248_zip_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_yarn_virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_993354a248_zip_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _yarn_virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_993354a248_zip_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../.yarn/__virtual__/css-loader-virtual-1ddc68b4a1/0/cache/css-loader-npm-5.2.6-118c6d409e-993354a248.zip/node_modules/css-loader/dist/runtime/api.js */ "./.yarn/__virtual__/css-loader-virtual-1ddc68b4a1/0/cache/css-loader-npm-5.2.6-118c6d409e-993354a248.zip/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _yarn_virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_993354a248_zip_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_yarn_virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_993354a248_zip_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _yarn_virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_993354a248_zip_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_yarn_virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_993354a248_zip_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "div.fetching[data-v-43b26bcb] {\n  height: 28px;\n  margin: 1em 0;\n}\ndiv.fetching p[data-v-43b26bcb] {\n  text-align: center;\n  font-style: italic;\n  color: #c41425;\n  padding-top: 2px;\n}\n.more[data-v-43b26bcb] {\n  text-align: center;\n}\n.more button[data-v-43b26bcb] {\n  font-size: 0.8em;\n  height: 28px;\n  margin: 0;\n}", "",{"version":3,"sources":["webpack://./vendor/cl/users/js/Lib/FetcherVue.vue","webpack://./vendor/cl/site/sass/modules/_colors.scss"],"names":[],"mappings":"AA0GA;EACE,YAAA;EACA,aAAA;AAzGF;AA2GE;EACE,kBAAA;EACA,kBAAA;EACA,cC3FG;ED4FH,gBAAA;AAzGJ;AA6GA;EACE,kBAAA;AA1GF;AA4GE;EACE,gBAAA;EACA,YAAA;EACA,SAAA;AA1GJ","sourcesContent":["\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\r\n\r\n@import '../../../site/sass/modules/_colors';\r\n\r\ndiv.fetching {\r\n  height: 28px;\r\n  margin: 1em 0;\r\n\r\n  p {\r\n    text-align: center;\r\n    font-style: italic;\r\n    color: $comp;\r\n    padding-top: 2px;\r\n  }\r\n}\r\n\r\n.more {\r\n  text-align: center;\r\n\r\n  button {\r\n    font-size: 0.8em;\r\n    height: 28px;\r\n    margin: 0;\r\n  }\r\n}\r\n\r\n","// The major colors\r\n// We have a primary color, two secondary colors, and a complementary color.\r\n$accent: #607D8B;\r\n\r\n$toast-background: #151515;\r\n$toast-text: white;\r\n\r\n$header-background: #535054;\r\n$header-text: #eeeeee;\r\n\r\n// The major colors\r\n// We have a primary color, two secondary colors, and a complementary color.\r\n$primary: #00723f;\r\n$light-primary: #44a26b;\r\n$very-light-primary: #e8f7f3;\r\n$dark-primary: #005223;\r\n$primary-text: #212121;\r\n\r\n$seconda: #00909e;\r\n$secondb: #fcaf17;\r\n$secondc: #c89a58; // #e8d9b5;\r\n\r\n$comp: #c41425;\r\n$blind: #efc6ff;\r\n$comp-background: linear-gradient(#570102, #960606, #570102);\r\n$comp-border: #c7bdbb;\r\n\r\n// Menus\r\n$focus: #008183;\r\n$menu-background: #e8e8e8;\r\n$menu-hover: #d0d0d0;\r\n$menu-color: black;\r\n\r\n// Page background\r\n$background: #eeeeee;\r\n\r\n// Nav\r\n$nav-color: white;\r\n$nav-background: url('img/nav_pattern.png');\r\n$nav-2-color: #ffff99;\r\n$nav-2-background: url('img/nav_pattern-2.png');\r\n\r\n// Tables\r\n$table-gradient-from: #204c42;\r\n$table-gradient-to: #389b54;\r\n\r\n// Dialog boxes\r\n$dialog-gradient-from: #204c42;\r\n$dialog-gradient-to: #389b54;\r\n$dialog-bar-color: white;\r\n\r\n// Link colors\r\n$link: #808080;\r\n$visited: #968443;  // #b09d5b;\r\n$hover: #3366cc;\r\n\r\n$very-light-primary-link: #900000;\r\n$very-light-primary-hover: #c00000;\r\n\r\n\r\n$primary-link: white;\r\n$primary-visited: #dddddd;\r\n$secondb-visited: #555555;\r\n$autoback-link: #882222;\r\n$autoback-link-hover: #cc2222;\r\n\r\n$shadow-x: 3px;\r\n$shadow-y: 3px;\r\n$shadow-radius: 8px;\r\n$shadow-color: #ccc;\r\n\r\n$toggle-link-hover-color: #006600;\r\n\r\n// Boxes\r\n$box-border-color: #bdbdbd;\r\n\r\n// Cards\r\n$card-heading-background: #f2f2f2;\r\n$card-border-color: #cccccc;\r\n\r\n%shadow {\r\n  -moz-box-shadow: $shadow-x $shadow-y $shadow-radius $shadow-color;\r\n  -webkit-box-shadow: $shadow-x $shadow-y $shadow-radius $shadow-color;\r\n  box-shadow: $shadow-x $shadow-y $shadow-radius $shadow-color;\r\n}\r\n\r\n%noshadow {\r\n  -moz-box-shadow: none;\r\n  -webkit-box-shadow: none;\r\n  box-shadow: none;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./.yarn/__virtual__/style-loader-virtual-862606f393/0/cache/style-loader-npm-2.0.0-b9a5c4a2aa-21425246a5.zip/node_modules/style-loader/dist/cjs.js!./.yarn/__virtual__/css-loader-virtual-1ddc68b4a1/0/cache/css-loader-npm-5.2.6-118c6d409e-993354a248.zip/node_modules/css-loader/dist/cjs.js!./.yarn/__virtual__/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./.yarn/__virtual__/resolve-url-loader-virtual-ec75d2a09e/0/cache/resolve-url-loader-npm-4.0.0-2a9c18d86b-8e5bcf9786.zip/node_modules/resolve-url-loader/index.js!./.yarn/__virtual__/sass-loader-virtual-3857f5e9f1/0/cache/sass-loader-npm-12.1.0-6188089e12-69c66ea348.zip/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-4[0].rules[0].use[3]!./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/style-loader-virtual-862606f393/0/cache/style-loader-npm-2.0.0-b9a5c4a2aa-21425246a5.zip/node_modules/style-loader/dist/cjs.js!./.yarn/__virtual__/css-loader-virtual-1ddc68b4a1/0/cache/css-loader-npm-5.2.6-118c6d409e-993354a248.zip/node_modules/css-loader/dist/cjs.js!./.yarn/__virtual__/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./.yarn/__virtual__/resolve-url-loader-virtual-ec75d2a09e/0/cache/resolve-url-loader-npm-4.0.0-2a9c18d86b-8e5bcf9786.zip/node_modules/resolve-url-loader/index.js!./.yarn/__virtual__/sass-loader-virtual-3857f5e9f1/0/cache/sass-loader-npm-12.1.0-6188089e12-69c66ea348.zip/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-4[0].rules[0].use[3]!./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _yarn_virtual_style_loader_virtual_862606f393_0_cache_style_loader_npm_2_0_0_b9a5c4a2aa_21425246a5_zip_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../.yarn/__virtual__/style-loader-virtual-862606f393/0/cache/style-loader-npm-2.0.0-b9a5c4a2aa-21425246a5.zip/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./.yarn/__virtual__/style-loader-virtual-862606f393/0/cache/style-loader-npm-2.0.0-b9a5c4a2aa-21425246a5.zip/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _yarn_virtual_style_loader_virtual_862606f393_0_cache_style_loader_npm_2_0_0_b9a5c4a2aa_21425246a5_zip_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_yarn_virtual_style_loader_virtual_862606f393_0_cache_style_loader_npm_2_0_0_b9a5c4a2aa_21425246a5_zip_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _yarn_virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_993354a248_zip_node_modules_css_loader_dist_cjs_js_yarn_virtual_vue_loader_virtual_3f0c38bb2c_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_loaders_stylePostLoader_js_yarn_virtual_resolve_url_loader_virtual_ec75d2a09e_0_cache_resolve_url_loader_npm_4_0_0_2a9c18d86b_8e5bcf9786_zip_node_modules_resolve_url_loader_index_js_yarn_virtual_sass_loader_virtual_3857f5e9f1_0_cache_sass_loader_npm_12_1_0_6188089e12_69c66ea348_zip_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_4_0_rules_0_use_3_yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_FetcherVue_vue_vue_type_style_index_0_id_43b26bcb_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../.yarn/__virtual__/css-loader-virtual-1ddc68b4a1/0/cache/css-loader-npm-5.2.6-118c6d409e-993354a248.zip/node_modules/css-loader/dist/cjs.js!../../../../../.yarn/__virtual__/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../.yarn/__virtual__/resolve-url-loader-virtual-ec75d2a09e/0/cache/resolve-url-loader-npm-4.0.0-2a9c18d86b-8e5bcf9786.zip/node_modules/resolve-url-loader/index.js!../../../../../.yarn/__virtual__/sass-loader-virtual-3857f5e9f1/0/cache/sass-loader-npm-12.1.0-6188089e12-69c66ea348.zip/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-4[0].rules[0].use[3]!../../../../../.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true& */ "./.yarn/__virtual__/css-loader-virtual-1ddc68b4a1/0/cache/css-loader-npm-5.2.6-118c6d409e-993354a248.zip/node_modules/css-loader/dist/cjs.js!./.yarn/__virtual__/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./.yarn/__virtual__/resolve-url-loader-virtual-ec75d2a09e/0/cache/resolve-url-loader-npm-4.0.0-2a9c18d86b-8e5bcf9786.zip/node_modules/resolve-url-loader/index.js!./.yarn/__virtual__/sass-loader-virtual-3857f5e9f1/0/cache/sass-loader-npm-12.1.0-6188089e12-69c66ea348.zip/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-4[0].rules[0].use[3]!./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _yarn_virtual_style_loader_virtual_862606f393_0_cache_style_loader_npm_2_0_0_b9a5c4a2aa_21425246a5_zip_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_yarn_virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_993354a248_zip_node_modules_css_loader_dist_cjs_js_yarn_virtual_vue_loader_virtual_3f0c38bb2c_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_loaders_stylePostLoader_js_yarn_virtual_resolve_url_loader_virtual_ec75d2a09e_0_cache_resolve_url_loader_npm_4_0_0_2a9c18d86b_8e5bcf9786_zip_node_modules_resolve_url_loader_index_js_yarn_virtual_sass_loader_virtual_3857f5e9f1_0_cache_sass_loader_npm_12_1_0_6188089e12_69c66ea348_zip_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_4_0_rules_0_use_3_yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_FetcherVue_vue_vue_type_style_index_0_id_43b26bcb_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_yarn_virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_993354a248_zip_node_modules_css_loader_dist_cjs_js_yarn_virtual_vue_loader_virtual_3f0c38bb2c_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_loaders_stylePostLoader_js_yarn_virtual_resolve_url_loader_virtual_ec75d2a09e_0_cache_resolve_url_loader_npm_4_0_0_2a9c18d86b_8e5bcf9786_zip_node_modules_resolve_url_loader_index_js_yarn_virtual_sass_loader_virtual_3857f5e9f1_0_cache_sass_loader_npm_12_1_0_6188089e12_69c66ea348_zip_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_4_0_rules_0_use_3_yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_FetcherVue_vue_vue_type_style_index_0_id_43b26bcb_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./vendor/cl/users/js/Console/LogViewComponent.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./vendor/cl/users/js/Console/LogViewComponent.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _yarn_virtual_babel_loader_virtual_8d78f42d43_0_cache_babel_loader_npm_8_2_2_b4e600c2c5_df5092ef98_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_0_rules_0_use_yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_LogViewComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../.yarn/__virtual__/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-df5092ef98.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!../../../../../.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./LogViewComponent.vue?vue&type=script&lang=js& */ "./.yarn/__virtual__/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-df5092ef98.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Console/LogViewComponent.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_yarn_virtual_babel_loader_virtual_8d78f42d43_0_cache_babel_loader_npm_8_2_2_b4e600c2c5_df5092ef98_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_0_rules_0_use_yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_LogViewComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./vendor/cl/users/js/Console/UserEditorComponent.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./vendor/cl/users/js/Console/UserEditorComponent.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _yarn_virtual_babel_loader_virtual_8d78f42d43_0_cache_babel_loader_npm_8_2_2_b4e600c2c5_df5092ef98_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_0_rules_0_use_yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_UserEditorComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../.yarn/__virtual__/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-df5092ef98.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!../../../../../.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./UserEditorComponent.vue?vue&type=script&lang=js& */ "./.yarn/__virtual__/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-df5092ef98.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Console/UserEditorComponent.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_yarn_virtual_babel_loader_virtual_8d78f42d43_0_cache_babel_loader_npm_8_2_2_b4e600c2c5_df5092ef98_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_0_rules_0_use_yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_UserEditorComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./vendor/cl/users/js/Console/UsersEditorComponent.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./vendor/cl/users/js/Console/UsersEditorComponent.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _yarn_virtual_babel_loader_virtual_8d78f42d43_0_cache_babel_loader_npm_8_2_2_b4e600c2c5_df5092ef98_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_0_rules_0_use_yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersEditorComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../.yarn/__virtual__/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-df5092ef98.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!../../../../../.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./UsersEditorComponent.vue?vue&type=script&lang=js& */ "./.yarn/__virtual__/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-df5092ef98.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Console/UsersEditorComponent.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_yarn_virtual_babel_loader_virtual_8d78f42d43_0_cache_babel_loader_npm_8_2_2_b4e600c2c5_df5092ef98_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_0_rules_0_use_yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersEditorComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "Fetcher": () => (/* reexport safe */ _yarn_virtual_babel_loader_virtual_8d78f42d43_0_cache_babel_loader_npm_8_2_2_b4e600c2c5_df5092ef98_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_0_rules_0_use_yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_FetcherVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.Fetcher)
/* harmony export */ });
/* harmony import */ var _yarn_virtual_babel_loader_virtual_8d78f42d43_0_cache_babel_loader_npm_8_2_2_b4e600c2c5_df5092ef98_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_0_rules_0_use_yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_FetcherVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../.yarn/__virtual__/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-df5092ef98.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!../../../../../.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./FetcherVue.vue?vue&type=script&lang=js& */ "./.yarn/__virtual__/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-df5092ef98.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_yarn_virtual_babel_loader_virtual_8d78f42d43_0_cache_babel_loader_npm_8_2_2_b4e600c2c5_df5092ef98_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_0_rules_0_use_yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_FetcherVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./vendor/cl/users/js/Lib/PrevNextUser.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./vendor/cl/users/js/Lib/PrevNextUser.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _yarn_virtual_babel_loader_virtual_8d78f42d43_0_cache_babel_loader_npm_8_2_2_b4e600c2c5_df5092ef98_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_0_rules_0_use_yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_PrevNextUser_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../.yarn/__virtual__/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-df5092ef98.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!../../../../../.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./PrevNextUser.vue?vue&type=script&lang=js& */ "./.yarn/__virtual__/babel-loader-virtual-8d78f42d43/0/cache/babel-loader-npm-8.2.2-b4e600c2c5-df5092ef98.zip/node_modules/babel-loader/lib/index.js??clonedRuleSet-2[0].rules[0].use!./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Lib/PrevNextUser.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_yarn_virtual_babel_loader_virtual_8d78f42d43_0_cache_babel_loader_npm_8_2_2_b4e600c2c5_df5092ef98_zip_node_modules_babel_loader_lib_index_js_clonedRuleSet_2_0_rules_0_use_yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_PrevNextUser_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true&":
/*!*********************************************************************************************************!*\
  !*** ./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true& ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _yarn_virtual_style_loader_virtual_862606f393_0_cache_style_loader_npm_2_0_0_b9a5c4a2aa_21425246a5_zip_node_modules_style_loader_dist_cjs_js_yarn_virtual_css_loader_virtual_1ddc68b4a1_0_cache_css_loader_npm_5_2_6_118c6d409e_993354a248_zip_node_modules_css_loader_dist_cjs_js_yarn_virtual_vue_loader_virtual_3f0c38bb2c_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_loaders_stylePostLoader_js_yarn_virtual_resolve_url_loader_virtual_ec75d2a09e_0_cache_resolve_url_loader_npm_4_0_0_2a9c18d86b_8e5bcf9786_zip_node_modules_resolve_url_loader_index_js_yarn_virtual_sass_loader_virtual_3857f5e9f1_0_cache_sass_loader_npm_12_1_0_6188089e12_69c66ea348_zip_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_4_0_rules_0_use_3_yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_FetcherVue_vue_vue_type_style_index_0_id_43b26bcb_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../.yarn/__virtual__/style-loader-virtual-862606f393/0/cache/style-loader-npm-2.0.0-b9a5c4a2aa-21425246a5.zip/node_modules/style-loader/dist/cjs.js!../../../../../.yarn/__virtual__/css-loader-virtual-1ddc68b4a1/0/cache/css-loader-npm-5.2.6-118c6d409e-993354a248.zip/node_modules/css-loader/dist/cjs.js!../../../../../.yarn/__virtual__/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../.yarn/__virtual__/resolve-url-loader-virtual-ec75d2a09e/0/cache/resolve-url-loader-npm-4.0.0-2a9c18d86b-8e5bcf9786.zip/node_modules/resolve-url-loader/index.js!../../../../../.yarn/__virtual__/sass-loader-virtual-3857f5e9f1/0/cache/sass-loader-npm-12.1.0-6188089e12-69c66ea348.zip/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-4[0].rules[0].use[3]!../../../../../.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true& */ "./.yarn/__virtual__/style-loader-virtual-862606f393/0/cache/style-loader-npm-2.0.0-b9a5c4a2aa-21425246a5.zip/node_modules/style-loader/dist/cjs.js!./.yarn/__virtual__/css-loader-virtual-1ddc68b4a1/0/cache/css-loader-npm-5.2.6-118c6d409e-993354a248.zip/node_modules/css-loader/dist/cjs.js!./.yarn/__virtual__/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./.yarn/__virtual__/resolve-url-loader-virtual-ec75d2a09e/0/cache/resolve-url-loader-npm-4.0.0-2a9c18d86b-8e5bcf9786.zip/node_modules/resolve-url-loader/index.js!./.yarn/__virtual__/sass-loader-virtual-3857f5e9f1/0/cache/sass-loader-npm-12.1.0-6188089e12-69c66ea348.zip/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-4[0].rules[0].use[3]!./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true&");


/***/ }),

/***/ "./vendor/cl/users/js/Console/LogViewComponent.vue?vue&type=template&id=17d9ece4&":
/*!****************************************************************************************!*\
  !*** ./vendor/cl/users/js/Console/LogViewComponent.vue?vue&type=template&id=17d9ece4& ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _yarn_virtual_vue_loader_virtual_3f0c38bb2c_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_LogViewComponent_vue_vue_type_template_id_17d9ece4___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _yarn_virtual_vue_loader_virtual_3f0c38bb2c_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_LogViewComponent_vue_vue_type_template_id_17d9ece4___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _yarn_virtual_vue_loader_virtual_3f0c38bb2c_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_LogViewComponent_vue_vue_type_template_id_17d9ece4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../.yarn/__virtual__/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./LogViewComponent.vue?vue&type=template&id=17d9ece4& */ "./.yarn/__virtual__/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Console/LogViewComponent.vue?vue&type=template&id=17d9ece4&");


/***/ }),

/***/ "./vendor/cl/users/js/Console/UserEditorComponent.vue?vue&type=template&id=140d699b&":
/*!*******************************************************************************************!*\
  !*** ./vendor/cl/users/js/Console/UserEditorComponent.vue?vue&type=template&id=140d699b& ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _yarn_virtual_vue_loader_virtual_3f0c38bb2c_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_UserEditorComponent_vue_vue_type_template_id_140d699b___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _yarn_virtual_vue_loader_virtual_3f0c38bb2c_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_UserEditorComponent_vue_vue_type_template_id_140d699b___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _yarn_virtual_vue_loader_virtual_3f0c38bb2c_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_UserEditorComponent_vue_vue_type_template_id_140d699b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../.yarn/__virtual__/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./UserEditorComponent.vue?vue&type=template&id=140d699b& */ "./.yarn/__virtual__/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Console/UserEditorComponent.vue?vue&type=template&id=140d699b&");


/***/ }),

/***/ "./vendor/cl/users/js/Console/UsersEditorComponent.vue?vue&type=template&id=47f8b682&":
/*!********************************************************************************************!*\
  !*** ./vendor/cl/users/js/Console/UsersEditorComponent.vue?vue&type=template&id=47f8b682& ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _yarn_virtual_vue_loader_virtual_3f0c38bb2c_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersEditorComponent_vue_vue_type_template_id_47f8b682___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _yarn_virtual_vue_loader_virtual_3f0c38bb2c_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersEditorComponent_vue_vue_type_template_id_47f8b682___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _yarn_virtual_vue_loader_virtual_3f0c38bb2c_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersEditorComponent_vue_vue_type_template_id_47f8b682___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../.yarn/__virtual__/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./UsersEditorComponent.vue?vue&type=template&id=47f8b682& */ "./.yarn/__virtual__/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Console/UsersEditorComponent.vue?vue&type=template&id=47f8b682&");


/***/ }),

/***/ "./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=template&id=43b26bcb&scoped=true&":
/*!******************************************************************************************!*\
  !*** ./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=template&id=43b26bcb&scoped=true& ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _yarn_virtual_vue_loader_virtual_3f0c38bb2c_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_FetcherVue_vue_vue_type_template_id_43b26bcb_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _yarn_virtual_vue_loader_virtual_3f0c38bb2c_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_FetcherVue_vue_vue_type_template_id_43b26bcb_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _yarn_virtual_vue_loader_virtual_3f0c38bb2c_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_FetcherVue_vue_vue_type_template_id_43b26bcb_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../.yarn/__virtual__/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./FetcherVue.vue?vue&type=template&id=43b26bcb&scoped=true& */ "./.yarn/__virtual__/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=template&id=43b26bcb&scoped=true&");


/***/ }),

/***/ "./vendor/cl/users/js/Lib/PrevNextUser.vue?vue&type=template&id=e001d946&":
/*!********************************************************************************!*\
  !*** ./vendor/cl/users/js/Lib/PrevNextUser.vue?vue&type=template&id=e001d946& ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _yarn_virtual_vue_loader_virtual_3f0c38bb2c_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_PrevNextUser_vue_vue_type_template_id_e001d946___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _yarn_virtual_vue_loader_virtual_3f0c38bb2c_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_PrevNextUser_vue_vue_type_template_id_e001d946___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _yarn_virtual_vue_loader_virtual_3f0c38bb2c_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_index_js_vue_loader_options_PrevNextUser_vue_vue_type_template_id_e001d946___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../.yarn/__virtual__/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./PrevNextUser.vue?vue&type=template&id=e001d946& */ "./.yarn/__virtual__/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Lib/PrevNextUser.vue?vue&type=template&id=e001d946&");


/***/ }),

/***/ "./.yarn/__virtual__/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Console/LogViewComponent.vue?vue&type=template&id=17d9ece4&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Console/LogViewComponent.vue?vue&type=template&id=17d9ece4& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
    _c("div", { staticClass: "full" }, [
      _c("form", [
        _c("p", { staticClass: "center" }, [
          _c(
            "select",
            {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.qLevel,
                  expression: "qLevel"
                }
              ],
              on: {
                change: [
                  function($event) {
                    var $$selectedVal = Array.prototype.filter
                      .call($event.target.options, function(o) {
                        return o.selected
                      })
                      .map(function(o) {
                        var val = "_value" in o ? o._value : o.value
                        return val
                      })
                    _vm.qLevel = $event.target.multiple
                      ? $$selectedVal
                      : $$selectedVal[0]
                  },
                  function($event) {
                    $event.preventDefault()
                    return _vm.query.apply(null, arguments)
                  }
                ]
              }
            },
            [
              _c("option", { attrs: { value: "0" } }, [_vm._v(" ")]),
              _vm._v(" "),
              _vm._l(_vm.levels, function(level) {
                return _c("option", { domProps: { value: level.value } }, [
                  _vm._v(_vm._s(level.name))
                ])
              })
            ],
            2
          ),
          _vm._v(" "),
          _c("label", [
            _vm._v("User: "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.qUser,
                  expression: "qUser"
                }
              ],
              attrs: { type: "text", spellcheck: "false" },
              domProps: { value: _vm.qUser },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.qUser = $event.target.value
                }
              }
            })
          ]),
          _vm._v(" "),
          _c("label", [
            _vm._v("Message: "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.qMessage,
                  expression: "qMessage"
                }
              ],
              attrs: { type: "text", spellcheck: "false" },
              domProps: { value: _vm.qMessage },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.qMessage = $event.target.value
                }
              }
            })
          ]),
          _vm._v(" "),
          _c(
            "button",
            {
              on: {
                click: function($event) {
                  $event.preventDefault()
                  return _vm.query.apply(null, arguments)
                }
              }
            },
            [_vm._v("Query")]
          )
        ])
      ]),
      _vm._v(" "),
      _vm.results.length > 0
        ? _c(
            "table",
            { staticClass: "small" },
            [
              _vm._m(0),
              _vm._v(" "),
              _vm._l(_vm.results, function(result) {
                return _c("tr", [
                  _c("td", { staticClass: "small" }, [
                    _vm._v(_vm._s(_vm.time(result.time)))
                  ]),
                  _vm._v(" "),
                  _c("td", [_vm._v(_vm._s(result.channel))]),
                  _vm._v(" "),
                  _c("td", [_vm._v(_vm._s(_vm.levelName(result.level)))]),
                  _vm._v(" "),
                  _c("td", [_vm._v(_vm._s(result.message))]),
                  _vm._v(" "),
                  _c("td", [_vm._v(_vm._s(result.name))]),
                  _vm._v(" "),
                  _c("td", [_vm._v(_vm._s(_vm.ids(result)))]),
                  _vm._v(" "),
                  _c("td", { staticClass: "small" }, [
                    _vm._v(_vm._s(result.context))
                  ])
                ])
              })
            ],
            2
          )
        : _c("p", { staticClass: "center" }, [
            _c("em", [_vm._v("** empty **")])
          ]),
      _vm._v(" "),
      _vm.more
        ? _c("p", { staticClass: "cl-more" }, [
            _c("a", { on: { click: _vm.getMore } }, [_vm._v("more")])
          ])
        : _vm._e()
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("tr", [
      _c("th", [_vm._v("Time")]),
      _vm._v(" "),
      _c("th", [_vm._v("Sys")]),
      _vm._v(" "),
      _c("th", [_vm._v("Level")]),
      _vm._v(" "),
      _c("th", [_vm._v("Message")]),
      _vm._v(" "),
      _c("th", [_vm._v("User")]),
      _vm._v(" "),
      _c("th", [_vm._v("Ids")]),
      _vm._v(" "),
      _c("th", [_vm._v("Context")])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./.yarn/__virtual__/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Console/UserEditorComponent.vue?vue&type=template&id=140d699b&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Console/UserEditorComponent.vue?vue&type=template&id=140d699b& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "cl-user-editor content" }, [
    _c(
      "div",
      { staticClass: "full" },
      [
        _c("prev-next", { attrs: { user: _vm.user } }),
        _vm._v(" "),
        _c("fetcher", { attrs: { fetcher: _vm.fetcher } }),
        _vm._v(" "),
        _c("div", [
          _c(
            "form",
            {
              staticClass: "cl-common",
              on: {
                submit: function($event) {
                  $event.preventDefault()
                  return _vm.submit.apply(null, arguments)
                }
              }
            },
            [
              _c("fieldset", [
                _c("legend", [_vm._v(_vm._s(_vm.legend))]),
                _vm._v(" "),
                _c("p", [
                  _c("label", [
                    _vm._v("User ID"),
                    _c("br"),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.userId,
                          expression: "userId"
                        }
                      ],
                      ref: "userid",
                      staticClass: "short",
                      attrs: {
                        type: "text",
                        size: "20",
                        maxlength: "30",
                        spellcheck: "false"
                      },
                      domProps: { value: _vm.userId },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.userId = $event.target.value
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("p", [
                  _c("label", { staticClass: "form_text" }, [
                    _vm._v("Name "),
                    _c("span", { staticClass: "small" }, [
                      _vm._v("(last, first)")
                    ]),
                    _c("br"),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.name,
                          expression: "name"
                        }
                      ],
                      attrs: { type: "text", maxlength: "150" },
                      domProps: { value: _vm.name },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.name = $event.target.value
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("p", [
                  _c("label", { staticClass: "form_text" }, [
                    _vm._v("Email"),
                    _c("br"),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.email,
                          expression: "email"
                        }
                      ],
                      ref: "email",
                      attrs: { type: "email", maxlength: "254" },
                      domProps: { value: _vm.email },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.email = $event.target.value
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "radio-set" }, [
                  _vm._m(0),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "options" },
                    _vm._l(_vm.roles, function(roleObj, id) {
                      return _c("label", [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.role,
                              expression: "role"
                            }
                          ],
                          attrs: { name: "role", type: "radio" },
                          domProps: {
                            value: id,
                            checked: _vm._q(_vm.role, id)
                          },
                          on: {
                            change: function($event) {
                              _vm.role = id
                            }
                          }
                        }),
                        _vm._v(_vm._s(roleObj.name))
                      ])
                    }),
                    0
                  )
                ]),
                _vm._v(" "),
                _c("p", [
                  _c("label", [
                    _vm._v("Password"),
                    _c("br"),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.password1,
                          expression: "password1"
                        }
                      ],
                      ref: "password1",
                      staticClass: "medium",
                      attrs: { type: "password", value: "" },
                      domProps: { value: _vm.password1 },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.password1 = $event.target.value
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("p", [
                  _c("label", { staticClass: "form_text" }, [
                    _vm._v("Again"),
                    _c("br"),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.password2,
                          expression: "password2"
                        }
                      ],
                      staticClass: "medium",
                      attrs: { type: "password", value: "" },
                      domProps: { value: _vm.password2 },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.password2 = $event.target.value
                        }
                      }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c(
                  "p",
                  { staticClass: "center" },
                  [
                    _c("button", [_vm._v("Submit")]),
                    _vm._v(" "),
                    _c(
                      "router-link",
                      { attrs: { to: _vm.cancel, tag: "button" } },
                      [_vm._v("Cancel")]
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c("p", { staticClass: "error" }, [_vm._v(" ")])
              ])
            ]
          )
        ])
      ],
      1
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "label" }, [_c("em", [_vm._v("Role:")])])
  }
]
render._withStripped = true



/***/ }),

/***/ "./.yarn/__virtual__/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Console/UsersEditorComponent.vue?vue&type=template&id=47f8b682&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Console/UsersEditorComponent.vue?vue&type=template&id=47f8b682& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "content cl-users-editor" }, [
    _c(
      "div",
      { staticClass: "full" },
      [
        _vm.fetcher.fetched
          ? _c("div", [
              _vm.users.length > 0
                ? _c(
                    "table",
                    { staticClass: "small" },
                    [
                      _vm._m(0),
                      _vm._v(" "),
                      _vm._l(_vm.users, function(user) {
                        return _c("tr", [
                          _vm.management
                            ? _c(
                                "td",
                                [
                                  _c(
                                    "router-link",
                                    { attrs: { to: _vm.toUser(user) } },
                                    [
                                      _c("img", {
                                        attrs: {
                                          src: _vm.pencil,
                                          alt: "Edit",
                                          title: "Edit"
                                        }
                                      })
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "a",
                                    {
                                      attrs: { href: "javascript:" },
                                      on: {
                                        click: function($event) {
                                          $event.preventDefault()
                                          return _vm.deleteUser(user)
                                        }
                                      }
                                    },
                                    [
                                      _c("img", {
                                        attrs: {
                                          src: _vm.deleter,
                                          alt: "Delete",
                                          title: "Delete"
                                        }
                                      })
                                    ]
                                  )
                                ],
                                1
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.management
                            ? _c(
                                "td",
                                [
                                  _c(
                                    "router-link",
                                    { attrs: { to: _vm.toUser(user) } },
                                    [_vm._v(_vm._s(user.userId))]
                                  )
                                ],
                                1
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.management
                            ? _c(
                                "td",
                                [
                                  _c(
                                    "router-link",
                                    { attrs: { to: _vm.toUser(user) } },
                                    [_vm._v(_vm._s(user.name))]
                                  )
                                ],
                                1
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          !_vm.management
                            ? _c("td", [
                                _c(
                                  "a",
                                  {
                                    attrs: { href: "javascript:;" },
                                    on: {
                                      click: function($event) {
                                        $event.preventDefault()
                                        return _vm.presentUser(user)
                                      }
                                    }
                                  },
                                  [
                                    _c("img", {
                                      attrs: {
                                        src: _vm.info,
                                        alt: "View",
                                        title: "View"
                                      }
                                    })
                                  ]
                                )
                              ])
                            : _vm._e(),
                          _vm._v(" "),
                          !_vm.management
                            ? _c("td", [
                                _c(
                                  "a",
                                  {
                                    attrs: { href: "javascript:;" },
                                    on: {
                                      click: function($event) {
                                        $event.preventDefault()
                                        return _vm.presentUser(user)
                                      }
                                    }
                                  },
                                  [_vm._v(_vm._s(user.userId))]
                                )
                              ])
                            : _vm._e(),
                          _vm._v(" "),
                          !_vm.management
                            ? _c("td", [
                                _c(
                                  "a",
                                  {
                                    attrs: { href: "javascript:;" },
                                    on: {
                                      click: function($event) {
                                        $event.preventDefault()
                                        return _vm.presentUser(user)
                                      }
                                    }
                                  },
                                  [_vm._v(_vm._s(user.name))]
                                )
                              ])
                            : _vm._e(),
                          _vm._v(" "),
                          _c("td", [_vm._v(_vm._s(user.email))]),
                          _vm._v(" "),
                          _c("td", [_vm._v(_vm._s(user.userRoleName()))])
                        ])
                      })
                    ],
                    2
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.users.length == 0
                ? _c("p", { staticClass: "centerbox comp center" }, [
                    _vm._v(
                      "\n        There are currently no users in the system."
                    )
                  ])
                : _vm._e()
            ])
          : _vm._e(),
        _vm._v(" "),
        _c("fetcher", { attrs: { fetcher: _vm.fetcher } })
      ],
      1
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("tr", [
      _c("th", { attrs: { scope: "col" } }, [_vm._v(" ")]),
      _vm._v(" "),
      _c("th", { attrs: { scope: "col" } }, [_vm._v("User")]),
      _vm._v(" "),
      _c("th", { attrs: { scope: "col" } }, [_vm._v("Name")]),
      _vm._v(" "),
      _c("th", { attrs: { scope: "col" } }, [_vm._v("Email")]),
      _vm._v(" "),
      _c("th", { attrs: { scope: "col" } }, [_vm._v("Role")])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./.yarn/__virtual__/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=template&id=43b26bcb&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=template&id=43b26bcb&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
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
                    return _vm.fetchMore.apply(null, arguments)
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

/***/ "./.yarn/__virtual__/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Lib/PrevNextUser.vue?vue&type=template&id=e001d946&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/vue-loader-virtual-3f0c38bb2c/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/index.js??vue-loader-options!./vendor/cl/users/js/Lib/PrevNextUser.vue?vue&type=template&id=e001d946& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div")
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./vendor/cl/users/js/Console/LogViewComponent.vue":
/*!*********************************************************!*\
  !*** ./vendor/cl/users/js/Console/LogViewComponent.vue ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _LogViewComponent_vue_vue_type_template_id_17d9ece4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LogViewComponent.vue?vue&type=template&id=17d9ece4& */ "./vendor/cl/users/js/Console/LogViewComponent.vue?vue&type=template&id=17d9ece4&");
/* harmony import */ var _LogViewComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LogViewComponent.vue?vue&type=script&lang=js& */ "./vendor/cl/users/js/Console/LogViewComponent.vue?vue&type=script&lang=js&");
/* harmony import */ var _yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _LogViewComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _LogViewComponent_vue_vue_type_template_id_17d9ece4___WEBPACK_IMPORTED_MODULE_0__.render,
  _LogViewComponent_vue_vue_type_template_id_17d9ece4___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "vendor/cl/users/js/Console/LogViewComponent.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./vendor/cl/users/js/Console/UserEditorComponent.vue":
/*!************************************************************!*\
  !*** ./vendor/cl/users/js/Console/UserEditorComponent.vue ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _UserEditorComponent_vue_vue_type_template_id_140d699b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserEditorComponent.vue?vue&type=template&id=140d699b& */ "./vendor/cl/users/js/Console/UserEditorComponent.vue?vue&type=template&id=140d699b&");
/* harmony import */ var _UserEditorComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserEditorComponent.vue?vue&type=script&lang=js& */ "./vendor/cl/users/js/Console/UserEditorComponent.vue?vue&type=script&lang=js&");
/* harmony import */ var _yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _UserEditorComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _UserEditorComponent_vue_vue_type_template_id_140d699b___WEBPACK_IMPORTED_MODULE_0__.render,
  _UserEditorComponent_vue_vue_type_template_id_140d699b___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "vendor/cl/users/js/Console/UserEditorComponent.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./vendor/cl/users/js/Console/UsersEditorComponent.vue":
/*!*************************************************************!*\
  !*** ./vendor/cl/users/js/Console/UsersEditorComponent.vue ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _UsersEditorComponent_vue_vue_type_template_id_47f8b682___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UsersEditorComponent.vue?vue&type=template&id=47f8b682& */ "./vendor/cl/users/js/Console/UsersEditorComponent.vue?vue&type=template&id=47f8b682&");
/* harmony import */ var _UsersEditorComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UsersEditorComponent.vue?vue&type=script&lang=js& */ "./vendor/cl/users/js/Console/UsersEditorComponent.vue?vue&type=script&lang=js&");
/* harmony import */ var _yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _UsersEditorComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _UsersEditorComponent_vue_vue_type_template_id_47f8b682___WEBPACK_IMPORTED_MODULE_0__.render,
  _UsersEditorComponent_vue_vue_type_template_id_47f8b682___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "vendor/cl/users/js/Console/UsersEditorComponent.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./vendor/cl/users/js/Lib/FetcherVue.vue":
/*!***********************************************!*\
  !*** ./vendor/cl/users/js/Lib/FetcherVue.vue ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Fetcher": () => (/* reexport safe */ _FetcherVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.Fetcher),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _FetcherVue_vue_vue_type_template_id_43b26bcb_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FetcherVue.vue?vue&type=template&id=43b26bcb&scoped=true& */ "./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=template&id=43b26bcb&scoped=true&");
/* harmony import */ var _FetcherVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FetcherVue.vue?vue&type=script&lang=js& */ "./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=script&lang=js&");
/* harmony import */ var _FetcherVue_vue_vue_type_style_index_0_id_43b26bcb_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true& */ "./vendor/cl/users/js/Lib/FetcherVue.vue?vue&type=style&index=0&id=43b26bcb&lang=scss&scoped=true&");
/* harmony import */ var _yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__.default)(
  _FetcherVue_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _FetcherVue_vue_vue_type_template_id_43b26bcb_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _FetcherVue_vue_vue_type_template_id_43b26bcb_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "43b26bcb",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "vendor/cl/users/js/Lib/FetcherVue.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./vendor/cl/users/js/Lib/PrevNextUser.vue":
/*!*************************************************!*\
  !*** ./vendor/cl/users/js/Lib/PrevNextUser.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PrevNextUser_vue_vue_type_template_id_e001d946___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PrevNextUser.vue?vue&type=template&id=e001d946& */ "./vendor/cl/users/js/Lib/PrevNextUser.vue?vue&type=template&id=e001d946&");
/* harmony import */ var _PrevNextUser_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PrevNextUser.vue?vue&type=script&lang=js& */ "./vendor/cl/users/js/Lib/PrevNextUser.vue?vue&type=script&lang=js&");
/* harmony import */ var _yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./.yarn/__virtual__/vue-loader-virtual-dd0dc9bf34/0/cache/vue-loader-npm-15.9.7-c92cce348e-9d6b92ea6f.zip/node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_yarn_virtual_vue_loader_virtual_dd0dc9bf34_0_cache_vue_loader_npm_15_9_7_c92cce348e_9d6b92ea6f_zip_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _PrevNextUser_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _PrevNextUser_vue_vue_type_template_id_e001d946___WEBPACK_IMPORTED_MODULE_0__.render,
  _PrevNextUser_vue_vue_type_template_id_e001d946___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "vendor/cl/users/js/Lib/PrevNextUser.vue"
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
/******/ 					result = fn();
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
/******/ 			"UsersConsole": 0
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
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) var result = runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcourselib"] = self["webpackChunkcourselib"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["common","vendor"], () => (__webpack_require__("./vendor/cl/users/js/Console/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb3Vyc2VsaWIvdmVuZG9yL2NsL3VzZXJzL2pzL0NvbnNvbGUvTG9nVmlld0NvbXBvbmVudC52dWUiLCJ3ZWJwYWNrOi8vY291cnNlbGliL3ZlbmRvci9jbC91c2Vycy9qcy9Db25zb2xlL1VzZXJFZGl0b3JDb21wb25lbnQudnVlIiwid2VicGFjazovL2NvdXJzZWxpYi92ZW5kb3IvY2wvdXNlcnMvanMvQ29uc29sZS9Vc2Vyc0VkaXRvckNvbXBvbmVudC52dWUiLCJ3ZWJwYWNrOi8vY291cnNlbGliL3ZlbmRvci9jbC91c2Vycy9qcy9MaWIvRmV0Y2hlclZ1ZS52dWUiLCJ3ZWJwYWNrOi8vY291cnNlbGliL3ZlbmRvci9jbC91c2Vycy9qcy9MaWIvUHJldk5leHRVc2VyLnZ1ZSIsIndlYnBhY2s6Ly9jb3Vyc2VsaWIvLi92ZW5kb3IvY2wvdXNlcnMvanMvQ29uc29sZS9Vc2Vyc0NvbnNvbGUuanMiLCJ3ZWJwYWNrOi8vY291cnNlbGliLy4vdmVuZG9yL2NsL3VzZXJzL2pzL0NvbnNvbGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY291cnNlbGliLy4vdmVuZG9yL2NsL3VzZXJzL2pzL1VzZXJzL1VzZXIuanMiLCJ3ZWJwYWNrOi8vY291cnNlbGliLy4vdmVuZG9yL2NsL3VzZXJzL2pzL0xpYi9GZXRjaGVyVnVlLnZ1ZT83NmRjIiwid2VicGFjazovL2NvdXJzZWxpYi8uL3ZlbmRvci9jbC91c2Vycy9qcy9MaWIvRmV0Y2hlclZ1ZS52dWU/YzI4MyIsIndlYnBhY2s6Ly9jb3Vyc2VsaWIvLi92ZW5kb3IvY2wvdXNlcnMvanMvQ29uc29sZS9Mb2dWaWV3Q29tcG9uZW50LnZ1ZT8yZTNjIiwid2VicGFjazovL2NvdXJzZWxpYi8uL3ZlbmRvci9jbC91c2Vycy9qcy9Db25zb2xlL1VzZXJFZGl0b3JDb21wb25lbnQudnVlPzA3NjQiLCJ3ZWJwYWNrOi8vY291cnNlbGliLy4vdmVuZG9yL2NsL3VzZXJzL2pzL0NvbnNvbGUvVXNlcnNFZGl0b3JDb21wb25lbnQudnVlPzI0MzMiLCJ3ZWJwYWNrOi8vY291cnNlbGliLy4vdmVuZG9yL2NsL3VzZXJzL2pzL0xpYi9GZXRjaGVyVnVlLnZ1ZT9hNzkxIiwid2VicGFjazovL2NvdXJzZWxpYi8uL3ZlbmRvci9jbC91c2Vycy9qcy9MaWIvUHJldk5leHRVc2VyLnZ1ZT9lZmEzIiwid2VicGFjazovL2NvdXJzZWxpYi8uL3ZlbmRvci9jbC91c2Vycy9qcy9Db25zb2xlL0xvZ1ZpZXdDb21wb25lbnQudnVlPzU0YTEiLCJ3ZWJwYWNrOi8vY291cnNlbGliLy4vdmVuZG9yL2NsL3VzZXJzL2pzL0NvbnNvbGUvVXNlckVkaXRvckNvbXBvbmVudC52dWU/ZWE3ZiIsIndlYnBhY2s6Ly9jb3Vyc2VsaWIvLi92ZW5kb3IvY2wvdXNlcnMvanMvQ29uc29sZS9Vc2Vyc0VkaXRvckNvbXBvbmVudC52dWU/ZjU5NiIsIndlYnBhY2s6Ly9jb3Vyc2VsaWIvLi92ZW5kb3IvY2wvdXNlcnMvanMvTGliL0ZldGNoZXJWdWUudnVlP2FiNmUiLCJ3ZWJwYWNrOi8vY291cnNlbGliLy4vdmVuZG9yL2NsL3VzZXJzL2pzL0xpYi9QcmV2TmV4dFVzZXIudnVlPzJlOTAiLCJ3ZWJwYWNrOi8vY291cnNlbGliLy4vdmVuZG9yL2NsL3VzZXJzL2pzL0NvbnNvbGUvTG9nVmlld0NvbXBvbmVudC52dWUiLCJ3ZWJwYWNrOi8vY291cnNlbGliLy4vdmVuZG9yL2NsL3VzZXJzL2pzL0NvbnNvbGUvVXNlckVkaXRvckNvbXBvbmVudC52dWUiLCJ3ZWJwYWNrOi8vY291cnNlbGliLy4vdmVuZG9yL2NsL3VzZXJzL2pzL0NvbnNvbGUvVXNlcnNFZGl0b3JDb21wb25lbnQudnVlIiwid2VicGFjazovL2NvdXJzZWxpYi8uL3ZlbmRvci9jbC91c2Vycy9qcy9MaWIvRmV0Y2hlclZ1ZS52dWUiLCJ3ZWJwYWNrOi8vY291cnNlbGliLy4vdmVuZG9yL2NsL3VzZXJzL2pzL0xpYi9QcmV2TmV4dFVzZXIudnVlIiwid2VicGFjazovL2NvdXJzZWxpYi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jb3Vyc2VsaWIvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9jb3Vyc2VsaWIvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vY291cnNlbGliL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jb3Vyc2VsaWIvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9jb3Vyc2VsaWIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jb3Vyc2VsaWIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jb3Vyc2VsaWIvd2VicGFjay9ydW50aW1lL25vZGUgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9jb3Vyc2VsaWIvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vY291cnNlbGliL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6WyJVc2Vyc0NvbnNvbGUiLCJzaXRlIiwiQ29uc29sZSIsImNvbnNvbGUiLCJ0YWJsZXMiLCJhZGQiLCJ0aXRsZSIsIm9yZGVyIiwiYXBpIiwiY29tcG9uZW50cyIsImFkZE9wdGlvbiIsImF0TGVhc3QiLCJTaXRlIiwiVXNlciIsIlNUQUZGIiwicGFnZSIsInJvdXRlIiwic2VjdGlvbiIsInJvdXRlcyIsImNvbXBvbmVudCIsIlVzZXJzRWRpdG9yQ29tcG9uZW50IiwicHJvcHMiLCJtYW5hZ2VtZW50IiwiQURNSU4iLCJuYW1lIiwiVXNlckVkaXRvckNvbXBvbmVudCIsInRhZyIsIkxvZ1ZpZXdDb21wb25lbnQiLCJqc29uIiwicm9sZSIsIm1lbWJlciIsInVuZGVmaW5lZCIsIkpTT04iLCJwYXJzZSIsImlkIiwiZW1haWwiLCJ1c2VySWQiLCJ1c2VyIiwiaW5zdGFudGlhdGVNZW1iZXIiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsInNldFVzZXJSb2xlIiwiX3JvbGUiLCJ1c2VyUm9sZSIsInNldE1lbWJlciIsIl9tZW1iZXIiLCJHVUVTVCIsIlVTRVIiLCJnZXRVc2VyUm9sZXMiLCJyb2xlcyIsInByaW9yaXR5IiwicHJvdG90eXBlIiwiZ2V0Um9sZXMiLCJoYXNPd25Qcm9wZXJ0eSIsImdldFJvbGVQcmlvcml0eSIsImRpc3BsYXlOYW1lIiwiY29tbWEiLCJpbmRleE9mIiwibGFzdCIsInN1YnN0ciIsImZpcnN0IiwidHJpbSIsInVzZXJSb2xlTmFtZSIsInNob3J0IiwiciIsInJvbGVOYW1lIiwicm9sZVRvTmFtZSIsImNvbXBhcmUiLCJhIiwiYiIsImFuIiwidG9Mb3dlckNhc2UiLCJibiIsImRhdGEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0EsaUNBREE7QUFFQTtBQUNBO0FBQ0EsaUJBREE7QUFFQSxpQkFGQTtBQUdBLGdCQUhBO0FBSUEsZUFKQTtBQUlBO0FBQ0EsZUFMQTtBQUtBO0FBQ0Esa0JBTkEsQ0FNQTs7QUFOQTtBQVFBLEdBWEE7QUFZQSxTQVpBLHFCQVlBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQURBO0FBRUE7QUFGQTtBQUlBOztBQUVBO0FBQ0E7QUFDQSxLQUZBO0FBSUE7QUFHQSxHQTdCQTtBQThCQTtBQUNBLFNBREEsbUJBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUxBO0FBTUEsU0FOQSxtQkFNQTtBQUFBOztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxtREFDQSxJQURBLENBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7O0FBREEsdURBRUEsT0FG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QTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLG9CQUFvQjtXQUMxQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQSw0Rzs7Ozs7VUM5Q0E7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJ1c2Vyc2NvbnNvbGUuZGV2LmpzIiwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiZnVsbFwiPlxyXG4gICAgICA8Zm9ybT5cclxuICAgICAgICA8cCBjbGFzcz1cImNlbnRlclwiPlxyXG4gICAgICAgICAgPHNlbGVjdCB2LW1vZGVsPVwicUxldmVsXCIgQGNoYW5nZS5wcmV2ZW50PVwicXVlcnlcIj5cclxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjBcIj4mbmJzcDs8L29wdGlvbj5cclxuICAgICAgICAgICAgPG9wdGlvbiB2LWZvcj1cImxldmVsIGluIGxldmVsc1wiIDp2YWx1ZT1cImxldmVsLnZhbHVlXCI+e3tsZXZlbC5uYW1lfX08L29wdGlvbj5cclxuICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgPGxhYmVsPlVzZXI6IDxpbnB1dCB0eXBlPVwidGV4dFwiIHNwZWxsY2hlY2s9XCJmYWxzZVwiIHYtbW9kZWw9XCJxVXNlclwiPjwvbGFiZWw+XHJcbiAgICAgICAgICA8bGFiZWw+TWVzc2FnZTogPGlucHV0IHR5cGU9XCJ0ZXh0XCIgc3BlbGxjaGVjaz1cImZhbHNlXCIgdi1tb2RlbD1cInFNZXNzYWdlXCI+PC9sYWJlbD5cclxuICAgICAgICAgIDxidXR0b24gQGNsaWNrLnByZXZlbnQ9XCJxdWVyeVwiPlF1ZXJ5PC9idXR0b24+XHJcbiAgICAgICAgPC9wPlxyXG4gICAgICA8L2Zvcm0+XHJcbiAgICAgIDx0YWJsZSBjbGFzcz1cInNtYWxsXCIgdi1pZj1cInJlc3VsdHMubGVuZ3RoID4gMFwiPlxyXG4gICAgICAgIDx0cj5cclxuICAgICAgICAgIDx0aD5UaW1lPC90aD5cclxuICAgICAgICAgIDx0aD5TeXM8L3RoPlxyXG4gICAgICAgICAgPHRoPkxldmVsPC90aD5cclxuICAgICAgICAgIDx0aD5NZXNzYWdlPC90aD5cclxuICAgICAgICAgIDx0aD5Vc2VyPC90aD5cclxuICAgICAgICAgIDx0aD5JZHM8L3RoPlxyXG4gICAgICAgICAgPHRoPkNvbnRleHQ8L3RoPlxyXG4gICAgICAgIDwvdHI+XHJcbiAgICAgICAgPHRyIHYtZm9yPVwicmVzdWx0IG9mIHJlc3VsdHNcIj5cclxuICAgICAgICAgIDx0ZCBjbGFzcz1cInNtYWxsXCI+e3t0aW1lKHJlc3VsdC50aW1lKX19PC90ZD5cclxuICAgICAgICAgIDx0ZD57e3Jlc3VsdC5jaGFubmVsfX08L3RkPlxyXG4gICAgICAgICAgPHRkPnt7bGV2ZWxOYW1lKHJlc3VsdC5sZXZlbCl9fTwvdGQ+XHJcbiAgICAgICAgICA8dGQ+e3tyZXN1bHQubWVzc2FnZX19PC90ZD5cclxuICAgICAgICAgIDx0ZD57e3Jlc3VsdC5uYW1lfX08L3RkPlxyXG4gICAgICAgICAgPHRkPnt7aWRzKHJlc3VsdCl9fTwvdGQ+XHJcbiAgICAgICAgICA8dGQgY2xhc3M9XCJzbWFsbFwiPnt7cmVzdWx0LmNvbnRleHR9fTwvdGQ+XHJcbiAgICAgICAgPC90cj5cclxuICAgICAgPC90YWJsZT5cclxuICAgICAgPHAgY2xhc3M9XCJjZW50ZXJcIiB2LWVsc2U+PGVtPioqIGVtcHR5ICoqPC9lbT48L3A+XHJcbiAgICAgIDxwIHYtaWY9XCJtb3JlXCIgY2xhc3M9XCJjbC1tb3JlXCI+PGEgdi1vbjpjbGljaz1cImdldE1vcmVcIj5tb3JlPC9hPjwvcD5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuICBjb25zdCBDb25zb2xlQ29tcG9uZW50QmFzZSA9IFNpdGUuQ29uc29sZUNvbXBvbmVudEJhc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFZ1ZSBjb21wb25lbnQgZm9yIHZpZXdpbmcgdGhlIHN5c3RlbSBsb2dzXHJcbiAgICpcclxuICAgKiAvY2wvY29uc29sZS9tYW5hZ2VtZW50L2xvZ3NcclxuICAgKlxyXG4gICAqIEBjb25zdHJ1Y3RvclxyXG4gICAqL1xyXG4gIGV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGV4dGVuZHM6IENvbnNvbGVDb21wb25lbnRCYXNlLFxyXG4gICAgZGF0YTogZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3VsdHM6IFtdLFxyXG4gICAgICAgIG1vcmU6IGZhbHNlLFxyXG4gICAgICAgIGxldmVsczogW10sXHJcbiAgICAgICAgcUxldmVsOiAwLCAgICAvLyBRdWVyeSBsZXZlbFxyXG4gICAgICAgIHFVc2VyOiAnJywgICAgLy8gUXVlcnkgdXNlclxyXG4gICAgICAgIHFNZXNzYWdlOiAnJyAgLy8gUXVlcnkgbWVzc2FnZVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgbW91bnRlZCgpIHtcclxuICAgICAgdGhpcy4kcGFyZW50LnNldFRpdGxlKCc6IFNpdGUgTG9ncycpO1xyXG5cclxuICAgICAgZm9yIChjb25zdCBsZXZlbCBpbiB0aGlzLiRzaXRlLkxvZ0xldmVscykge1xyXG4gICAgICAgIHRoaXMubGV2ZWxzLnB1c2goe1xyXG4gICAgICAgICAgdmFsdWU6IGxldmVsLFxyXG4gICAgICAgICAgbmFtZTogdGhpcy4kc2l0ZS5Mb2dMZXZlbHNbbGV2ZWxdXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMubGV2ZWxzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gYS5sZXZlbCAtIGIubGV2ZWw7XHJcbiAgICAgIH0pXHJcblxyXG4gICAgICB0aGlzLmZldGNoKCk7XHJcblxyXG5cclxuICAgIH0sXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgIHF1ZXJ5KCkge1xyXG4gICAgICAgIC8vIENsZWFyIGV4aXN0aW5nIHJlc3VsdHNcclxuICAgICAgICB0aGlzLnJlc3VsdHMgPSBbXTtcclxuICAgICAgICB0aGlzLmZldGNoKCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGZldGNoKCkge1xyXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHt9O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5yZXN1bHRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIHBhcmFtcy5iZWZvcmUgPSB0aGlzLnJlc3VsdHNbdGhpcy5yZXN1bHRzLmxlbmd0aCAtIDFdLnRpbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoK3RoaXMucUxldmVsICE9PSAwKSB7XHJcbiAgICAgICAgICBwYXJhbXMubGV2ZWwgPSB0aGlzLnFMZXZlbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnFVc2VyLnRyaW0oKSAhPT0gJycpIHtcclxuICAgICAgICAgIHBhcmFtcy5uYW1lID0gdGhpcy5xVXNlci50cmltKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5xTWVzc2FnZS50cmltKCkgIT09ICcnKSB7XHJcbiAgICAgICAgICBwYXJhbXMubWVzc2FnZSA9IHRoaXMucU1lc3NhZ2UudHJpbSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy4kc2l0ZS5hcGkuZ2V0KCcvYXBpL3NpdGUvbG9ncycsIHBhcmFtcylcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLmhhc0Vycm9yKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHJlc3BvbnNlLmdldERhdGEoJ3NpdGUtbG9nJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdHMgPSBkYXRhLmF0dHJpYnV0ZXMucmVzdWx0cztcclxuICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcmVzdWx0IG9mIHJlc3VsdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRzLnB1c2gocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vcmUgPSBkYXRhLmF0dHJpYnV0ZXMubW9yZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHNpdGUudG9hc3QodGhpcywgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLiRzaXRlLnRvYXN0KHRoaXMsIGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICB9LFxyXG4gICAgICBnZXRNb3JlKCkge1xyXG4gICAgICAgIHRoaXMuZmV0Y2goKTtcclxuICAgICAgfSxcclxuICAgICAgdGltZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJHNpdGUuVGltZUZvcm1hdHRlci5yZWxhdGl2ZVVOSVgodmFsdWUpO1xyXG4gICAgICB9LFxyXG4gICAgICBpZHM6IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICBsZXQgc3RyID0gJyc7XHJcbiAgICAgICAgaWYgKHJlc3VsdC51c2VyaWQgIT09IG51bGwpIHtcclxuICAgICAgICAgIHN0ciArPSByZXN1bHQudXNlcmlkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHJlc3VsdC5tZW1iZXJpZCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgc3RyICs9ICcvJyArIHJlc3VsdC51c2VyaWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3RyO1xyXG4gICAgICB9LFxyXG4gICAgICBsZXZlbE5hbWU6IGZ1bmN0aW9uIChsZXZlbCkge1xyXG4gICAgICAgIGNvbnN0IGxldmVscyA9IHRoaXMuJHNpdGUuTG9nTGV2ZWxzO1xyXG4gICAgICAgIGlmIChsZXZlbHNbbGV2ZWxdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHJldHVybiBsZXZlbHNbbGV2ZWxdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuICdVTkRFRklORUQnO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbjwvc2NyaXB0PlxyXG4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cImNsLXVzZXItZWRpdG9yIGNvbnRlbnRcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJmdWxsXCI+XHJcbiAgICAgIDxwcmV2LW5leHQgOnVzZXI9XCJ1c2VyXCI+PC9wcmV2LW5leHQ+XHJcblxyXG4gICAgICA8ZmV0Y2hlciA6ZmV0Y2hlcj1cImZldGNoZXJcIj48L2ZldGNoZXI+XHJcbiAgICAgIDxkaXYgPlxyXG4gICAgICAgIDxmb3JtIGNsYXNzPVwiY2wtY29tbW9uXCIgQHN1Ym1pdC5wcmV2ZW50PVwic3VibWl0XCI+XHJcbiAgICAgICAgICA8ZmllbGRzZXQ+XHJcbiAgICAgICAgICAgIDxsZWdlbmQ+e3tsZWdlbmR9fTwvbGVnZW5kPlxyXG4gICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICA8bGFiZWw+VXNlciBJRDxicj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCByZWY9XCJ1c2VyaWRcIiB0eXBlPVwidGV4dFwiIHYtbW9kZWw9XCJ1c2VySWRcIiBjbGFzcz1cInNob3J0XCIgc2l6ZT1cIjIwXCIgbWF4bGVuZ3RoPVwiMzBcIiBzcGVsbGNoZWNrPVwiZmFsc2VcIj48L2xhYmVsPlxyXG4gICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgIDxwPlxyXG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImZvcm1fdGV4dFwiPk5hbWUgPHNwYW4gY2xhc3M9XCJzbWFsbFwiPihsYXN0LCBmaXJzdCk8L3NwYW4+PGJyPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgdi1tb2RlbD1cIm5hbWVcIiBtYXhsZW5ndGg9XCIxNTBcIj48L2xhYmVsPlxyXG4gICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgIDxwPlxyXG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImZvcm1fdGV4dFwiPkVtYWlsPGJyPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IHJlZj1cImVtYWlsXCIgdHlwZT1cImVtYWlsXCIgdi1tb2RlbD1cImVtYWlsXCIgbWF4bGVuZ3RoPVwiMjU0XCI+PC9sYWJlbD5cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmFkaW8tc2V0XCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsXCI+PGVtPlJvbGU6PC9lbT48L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwib3B0aW9uc1wiPlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsIHYtZm9yPVwiKHJvbGVPYmosIGlkKSBpbiByb2xlc1wiPlxyXG4gICAgICAgICAgICAgICAgICA8aW5wdXQgdi1tb2RlbD1cInJvbGVcIiBuYW1lPVwicm9sZVwiIHR5cGU9XCJyYWRpb1wiIDp2YWx1ZT1cImlkXCI+e3tyb2xlT2JqLm5hbWV9fTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICA8bGFiZWw+UGFzc3dvcmQ8YnI+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgcmVmPVwicGFzc3dvcmQxXCIgdHlwZT1cInBhc3N3b3JkXCIgdi1tb2RlbD1cInBhc3N3b3JkMVwiIGNsYXNzPVwibWVkaXVtXCIgdmFsdWU9XCJcIj48L2xhYmVsPjwvcD5cclxuICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiZm9ybV90ZXh0XCI+QWdhaW48YnI+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgdi1tb2RlbD1cInBhc3N3b3JkMlwiIGNsYXNzPVwibWVkaXVtXCIgdmFsdWU9XCJcIj48L2xhYmVsPjwvcD5cclxuICAgICAgICAgICAgPHAgY2xhc3M9XCJjZW50ZXJcIj5cclxuICAgICAgICAgICAgICA8YnV0dG9uPlN1Ym1pdDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDxyb3V0ZXItbGluayA6dG89XCJjYW5jZWxcIiB0YWc9XCJidXR0b25cIj5DYW5jZWw8L3JvdXRlci1saW5rPlxyXG4gICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzPVwiZXJyb3JcIj4mbmJzcDs8L3A+XHJcbiAgICAgICAgICA8L2ZpZWxkc2V0PlxyXG4gICAgICAgIDwvZm9ybT5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbiAgICBpbXBvcnQgRmV0Y2hlclZ1ZSBmcm9tICcuLi9MaWIvRmV0Y2hlclZ1ZS52dWUnO1xyXG4gICAgaW1wb3J0IFByZXZOZXh0VXNlclZ1ZSBmcm9tICcuLi9MaWIvUHJldk5leHRVc2VyLnZ1ZSc7XHJcbiAgICBpbXBvcnQge21hcFN0YXRlfSBmcm9tICd2dWV4JztcclxuXHJcbiAgICBleHBvcnQgZGVmYXVsdCB7XHJcbiAgICAgICAgcHJvcHM6IFsnaWQnXSxcclxuICAgICAgICBkYXRhOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGNhbmNlbDogU2l0ZS5yb290ICsgJy9jbC9jb25zb2xlL21hbmFnZW1lbnQvdXNlcnMnLFxyXG4gICAgICAgICAgICAgICAgbGVnZW5kOiB0aGlzLmlkID09PSAnbmV3JyA/ICdOZXcgVXNlcicgOiAnRWRpdCBVc2VyJyxcclxuICAgICAgICAgICAgICAgIHJvbGVzOiBTaXRlLlVzZXIuZ2V0VXNlclJvbGVzKCksXHJcblxyXG4gICAgICAgICAgICAgICAgdXNlcjogbnVsbCxcclxuICAgICAgICAgICAgICAgIHVzZXJJZDogJycsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnJyxcclxuICAgICAgICAgICAgICAgIGVtYWlsOiAnJyxcclxuICAgICAgICAgICAgICAgIHJvbGU6ICcnLFxyXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQxOiAnJyxcclxuICAgICAgICAgICAgICAgIHBhc3N3b3JkMjogJydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcHV0ZWQ6IG1hcFN0YXRlKHtcclxuICAgICAgICAgICAgZmV0Y2hlcjogc3RhdGUgPT4gc3RhdGUudXNlcnMuZmV0Y2hlclxyXG5cclxuICAgICAgICB9KSxcclxuICAgICAgICBjb21wb25lbnRzOiB7XHJcbiAgICAgICAgICAgICdmZXRjaGVyJzogRmV0Y2hlclZ1ZSxcclxuICAgICAgICAgICAgJ3ByZXZOZXh0JzogUHJldk5leHRVc2VyVnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB3YXRjaDoge1xyXG4gICAgICAgICAgJyRyb3V0ZScodG8sIGZyb20pIHtcclxuICAgICAgICAgICAgICB0aGlzLnRha2UoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG1vdW50ZWQoKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFrZSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgICAgICB0YWtlKCkge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5pZCA9PT0gJ25ldycpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuc2V0VGl0bGUoJzogQWRkIFVzZXInKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvbGUgPSBTaXRlLlVzZXIuVVNFUjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRuZXh0VGljaygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHJlZnMudXNlcmlkLnNlbGVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXNlciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5zZXRUaXRsZSgnOiBVc2VyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goJ3VzZXJzL2dldCcsIHtpZDogdGhpcy5pZH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCh1c2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXIgPSB1c2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VySWQgPSB1c2VyLnVzZXJJZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmFtZSA9IHVzZXIubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5zZXRUaXRsZSgnOiBVc2VyICcgKyB1c2VyLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWFpbCA9IHVzZXIuZW1haWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvbGUgPSB1c2VyLnVzZXJSb2xlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRuZXh0VGljaygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kcmVmcy51c2VyaWQuc2VsZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKG1zZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2l0ZS50b2FzdCh0aGlzLCBtc2cpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kcm91dGVyLnB1c2goe25hbWU6ICd1c2Vycyd9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDMwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWJtaXQoKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHRoaXMudXNlcklkLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogdGhpcy5lbWFpbCxcclxuICAgICAgICAgICAgICAgICAgICByb2xlOiB0aGlzLnJvbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQxOiB0aGlzLnBhc3N3b3JkMSxcclxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDI6IHRoaXMucGFzc3dvcmQyXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaWQgIT09ICduZXcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5pZCA9IHRoaXMuaWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHBhdGggPSB0aGlzLmlkID09PSAnbmV3JyA/ICd1c2Vycy9uZXcnIDogJ3VzZXJzL3VwZGF0ZSc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaChwYXRoLCBkYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kcm91dGVyLnB1c2goe25hbWU6ICd1c2Vycyd9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFNpdGUudG9hc3QodGhpcywgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2gocmVzcG9uc2UuZXJyb3JDb2RlKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgVXNlcnMuTVVTVF9QUk9WSURFX1VTRVJJRF9PUl9FTUFJTDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLnVzZXJpZC5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgVXNlcnMuUEFTU1dPUkRTX01VU1RfTUFUQ0g6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kcmVmcy5wYXNzd29yZDEuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFVzZXJzLkRVUExJQ0FURV9FTUFJTDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLmVtYWlsLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBVc2Vycy5EVVBMSUNBVEVfVVNFUjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLnVzZXJpZC5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuPC9zY3JpcHQ+XHJcbiIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2IGNsYXNzPVwiY29udGVudCBjbC11c2Vycy1lZGl0b3JcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJmdWxsXCI+XHJcbiAgICAgIDxkaXYgdi1pZj1cImZldGNoZXIuZmV0Y2hlZFwiPlxyXG4gICAgICAgIDx0YWJsZSB2LWlmPVwidXNlcnMubGVuZ3RoID4gMFwiIGNsYXNzPVwic21hbGxcIj5cclxuICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgPHRoIHNjb3BlPVwiY29sXCI+Jm5ic3A7PC90aD5cclxuICAgICAgICAgICAgPHRoIHNjb3BlPVwiY29sXCI+VXNlcjwvdGg+XHJcbiAgICAgICAgICAgIDx0aCBzY29wZT1cImNvbFwiPk5hbWU8L3RoPlxyXG4gICAgICAgICAgICA8dGggc2NvcGU9XCJjb2xcIj5FbWFpbDwvdGg+XHJcbiAgICAgICAgICAgIDx0aCBzY29wZT1cImNvbFwiPlJvbGU8L3RoPlxyXG4gICAgICAgICAgPC90cj5cclxuICAgICAgICAgIDx0ciB2LWZvcj1cInVzZXIgaW4gdXNlcnNcIj5cclxuICAgICAgICAgICAgPHRkIHYtaWY9XCJtYW5hZ2VtZW50XCI+XHJcbiAgICAgICAgICAgICAgPHJvdXRlci1saW5rIDp0bz1cInRvVXNlcih1c2VyKVwiPjxpbWcgOnNyYz1cInBlbmNpbFwiIGFsdD1cIkVkaXRcIiB0aXRsZT1cIkVkaXRcIj48L3JvdXRlci1saW5rPlxyXG4gICAgICAgICAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OlwiIEBjbGljay5wcmV2ZW50PVwiZGVsZXRlVXNlcih1c2VyKVwiPjxpbWcgOnNyYz1cImRlbGV0ZXJcIiBhbHQ9XCJEZWxldGVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIkRlbGV0ZVwiPjwvYT48L3RkPlxyXG4gICAgICAgICAgICA8dGQgdi1pZj1cIm1hbmFnZW1lbnRcIj5cclxuICAgICAgICAgICAgICA8cm91dGVyLWxpbmsgOnRvPVwidG9Vc2VyKHVzZXIpXCI+e3t1c2VyLnVzZXJJZH19PC9yb3V0ZXItbGluaz5cclxuICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgPHRkIHYtaWY9XCJtYW5hZ2VtZW50XCI+XHJcbiAgICAgICAgICAgICAgPHJvdXRlci1saW5rIDp0bz1cInRvVXNlcih1c2VyKVwiPnt7dXNlci5uYW1lfX08L3JvdXRlci1saW5rPlxyXG4gICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICA8dGQgdi1pZj1cIiFtYW5hZ2VtZW50XCI+PGEgQGNsaWNrLnByZXZlbnQ9XCJwcmVzZW50VXNlcih1c2VyKVwiIGhyZWY9XCJqYXZhc2NyaXB0OjtcIj48aW1nIDpzcmM9XCJpbmZvXCIgYWx0PVwiVmlld1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJWaWV3XCI+PC9hPjwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZCB2LWlmPVwiIW1hbmFnZW1lbnRcIj48YSBAY2xpY2sucHJldmVudD1cInByZXNlbnRVc2VyKHVzZXIpXCIgaHJlZj1cImphdmFzY3JpcHQ6O1wiPnt7dXNlci51c2VySWR9fTwvYT48L3RkPlxyXG4gICAgICAgICAgICA8dGQgdi1pZj1cIiFtYW5hZ2VtZW50XCI+PGEgQGNsaWNrLnByZXZlbnQ9XCJwcmVzZW50VXNlcih1c2VyKVwiIGhyZWY9XCJqYXZhc2NyaXB0OjtcIj57e3VzZXIubmFtZX19PC9hPjwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZD57e3VzZXIuZW1haWx9fTwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZD57e3VzZXIudXNlclJvbGVOYW1lKCl9fTwvdGQ+XHJcbiAgICAgICAgICA8L3RyPlxyXG4gICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgPHAgdi1pZj1cInVzZXJzLmxlbmd0aCA9PSAwXCIgY2xhc3M9XCJjZW50ZXJib3ggY29tcCBjZW50ZXJcIj5cclxuICAgICAgICAgIFRoZXJlIGFyZSBjdXJyZW50bHkgbm8gdXNlcnMgaW4gdGhlIHN5c3RlbS48L3A+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGZldGNoZXIgOmZldGNoZXI9XCJmZXRjaGVyXCI+PC9mZXRjaGVyPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG4gICAgaW1wb3J0IERpYWxvZyBmcm9tICdkaWFsb2ctY2wnO1xyXG4gICAgaW1wb3J0IEZldGNoZXJWdWUgZnJvbSAnLi4vTGliL0ZldGNoZXJWdWUudnVlJztcclxuXHJcbiAgICBjb25zdCBtYXBTdGF0ZSA9IFNpdGUuVnVleC5tYXBTdGF0ZTtcclxuICAgIGNvbnN0IENvbnNvbGVDb21wb25lbnRCYXNlID0gU2l0ZS5Db25zb2xlQ29tcG9uZW50QmFzZTtcclxuXHJcbiAgICBleHBvcnQgZGVmYXVsdCB7XHJcbiAgICAgICdleHRlbmRzJzogQ29uc29sZUNvbXBvbmVudEJhc2UsXHJcbiAgICAgIHByb3BzOiBbXHJcbiAgICAgICAgICAgICdtYW5hZ2VtZW50J1xyXG4gICAgICAgIF0sXHJcbiAgICAgICAgZGF0YTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIFx0cm9vdDogU2l0ZS5yb290LFxyXG4gICAgICAgICAgICAgICAgcGVuY2lsOiBTaXRlLnJvb3QgKyAnL3ZlbmRvci9jbC9zaXRlL2ltZy9wZW5jaWwxNi5wbmcnLFxyXG4gICAgICAgICAgICAgICAgZGVsZXRlcjogU2l0ZS5yb290ICsgJy92ZW5kb3IvY2wvc2l0ZS9pbWcveC5wbmcnLFxyXG4gICAgICAgICAgICAgICAgaW5mbzogU2l0ZS5yb290ICsgJy92ZW5kb3IvY2wvc2l0ZS9pbWcvaW5mbzE2LnBuZycsXHJcbiAgICAgICAgICAgICAgICB0b1VzZXI6IGZ1bmN0aW9uKHVzZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBTaXRlLnJvb3QgKyAnL2NsL2NvbnNvbGUvbWFuYWdlbWVudC91c2VyLycgKyB1c2VyLmlkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgICAgIGZldGNoTW9yZSgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKCd1c2Vycy9tb3JlJyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRlbGV0ZVVzZXI6IGZ1bmN0aW9uKHVzZXIpIHtcclxuICAgICAgICAgICAgICAgIG5ldyBEaWFsb2cuTWVzc2FnZUJveCgnQXJlIHlvdSBzdXJlPycsICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlICcgKyB1c2VyLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgRGlhbG9nLk1lc3NhZ2VCb3guT0tDQU5DRUwsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKCd1c2Vycy9kZWxldGUnLCB7aWQ6IHVzZXIuaWR9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcHJlc2VudFVzZXI6IGZ1bmN0aW9uKHVzZXIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb250ZW50ID0gYDxkaXYgY2xhc3M9XCJjbC1kaWFsb2dcIj5cclxuPGRpdiBjbGFzcz1cInRhYnVsYXJcIj5cclxuPHA+PHNwYW4gY2xhc3M9XCJsYWJlbFwiPlVzZXIgSUQ6IDwvc3Bhbj48c3Bhbj4ke3VzZXIudXNlcklkfTwvc3Bhbj48L3A+XHJcbjxwPjxzcGFuIGNsYXNzPVwibGFiZWxcIj5OYW1lOiA8L3NwYW4+PHNwYW4+JHt1c2VyLm5hbWV9PC9zcGFuPjwvcD5cclxuPHA+PHNwYW4gY2xhc3M9XCJsYWJlbFwiPkVtYWlsOiA8L3NwYW4+PHNwYW4+JHt1c2VyLmVtYWlsfTwvc3Bhbj48L3A+XHJcbjxwPjxzcGFuIGNsYXNzPVwibGFiZWxcIj5Sb2xlOiA8L3NwYW4+PHNwYW4+JHt1c2VyLnVzZXJSb2xlTmFtZSgpfTwvc3Bhbj48L3A+XHJcbjwvZGl2PlxyXG48L2Rpdj5gO1xyXG4gICAgICAgICAgICAgICAgbmV3IERpYWxvZyh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogY29udGVudFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXB1dGVkOiBtYXBTdGF0ZSh7XHJcbiAgICAgICAgICB1c2Vyczogc3RhdGUgPT4gc3RhdGUudXNlcnMudXNlcnMsXHJcbiAgICAgICAgIC8vIHVzZXJzOiBzdGF0ZSA9PiBzdGF0ZS5TaXRlLlVzZXJzLFxyXG4gICAgICAgICAgICBmZXRjaGVyOiBzdGF0ZSA9PiBzdGF0ZS51c2Vycy5mZXRjaGVyXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgbW91bnRlZCgpIHtcclxuICAgICAgICAgIHRoaXMuJHBhcmVudC5zZXRUaXRsZSgnOiBVc2VycycpO1xyXG4gICAgICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goJ3VzZXJzL2ZldGNoJyk7XHJcblxyXG5cdCAgICAgICAgLy8gQWRkIHRoZSAnQWRkIFVzZXInIG9wdGlvbiB0byB0aGUgdGhlIG5hdjIgbmF2aWdhdGlvbiBiYXJcclxuXHQgICAgICAgIGlmKHRoaXMubWFuYWdlbWVudCkge1xyXG5cdFx0ICAgICAgICB0aGlzLmFkZENvbXBvbmVudCA9IHRoaXMuJHNpdGUuY29uc29sZS5jb21wb25lbnRzLmFkZE5hdjJMaW5rKHRoaXMsICdBZGQgVXNlcicsIDUsICgpID0+IHtcclxuXHRcdFx0ICAgICAgICB0aGlzLiRyb3V0ZXIucHVzaChTaXRlLnJvb3QgKyAnL2NsL2NvbnNvbGUvbWFuYWdlbWVudC91c2VyL25ldycpO1xyXG5cdFx0ICAgICAgICB9KTtcclxuXHQgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGJlZm9yZURlc3Ryb3koKSB7XHJcbiAgICAgICAgICB0aGlzLiRzaXRlLmNvbnNvbGUuY29tcG9uZW50cy5yZW1vdmVOYXYyKHRoaXMsIHRoaXMuYWRkQ29tcG9uZW50KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBvbmVudHM6IHtcclxuICAgICAgICAgICAgJ2ZldGNoZXInOiBGZXRjaGVyVnVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG48L3NjcmlwdD5cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxkaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwiZmV0Y2hpbmdcIiB2LWlmPVwiZGVsYXllZEZldGNoaW5nXCI+XHJcbiAgICAgIDxwPkZldGNoaW5nIGZyb20gc2VydmVyLi4uPC9wPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8c2xvdCB2LWlmPVwiKGZldGNoZXIgPT09IG51bGwgfHwgIWZldGNoZXIuZmV0Y2hpbmcpICYmICFmZXRjaGluZ1wiPjwvc2xvdD5cclxuICAgIDxwIGNsYXNzPVwibW9yZVwiIHYtaWY9XCJmZXRjaGVyICE9PSBudWxsICYmIGZldGNoZXIubW9yZVwiPjxidXR0b24gQGNsaWNrLnByZXZlbnQ9XCJmZXRjaE1vcmVcIj5NT1JFPC9idXR0b24+PC9wPlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuLyoqXHJcbiAqIEBmaWxlXHJcbiAqIEZldGNoZXIgY29tcG9uZW50IGRpc3BsYXlzIFwiRmV0Y2hpbmdcIiBhbmQgYSBcIm1vcmVcIiBidXR0b24uXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEZldGNoZXIgZnVuY3Rpb24gdXNlZCB0byB1cGRhdGUgdGhpcyBvYmplY3QuXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZXhwb3J0IGxldCBGZXRjaGVyID0gZnVuY3Rpb24gKCkge1xyXG4gIHRoaXMubW9yZSA9IGZhbHNlOyAgICAgICAvLyBJbmRpY2F0ZXMgdGhlcmUgaXMgbW9yZSB0byBmZXRjaFxyXG4gIHRoaXMuZmV0Y2hpbmcgPSBmYWxzZTsgIC8vIFNldCB0cnVlIHdoaWxlIHdlIGFyZSBmZXRjaGluZ1xyXG4gIHRoaXMuZmV0Y2hlZCA9IGZhbHNlOyAgIC8vIFNldCB0cnVlIHdoZW4gd2UgaGF2ZSBmZXRjaGVkIHNvbWV0aGluZy4uLlxyXG5cclxuICB0aGlzLnN0YXJ0ID0gZnVuY3Rpb24gKHNpbmdsZSkge1xyXG4gICAgdGhpcy5mZXRjaGluZyA9IHRydWU7XHJcblxyXG4gICAgaWYgKHNpbmdsZSAhPT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLm1vcmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHRoaXMuZG9uZSA9IGZ1bmN0aW9uIChzaW5nbGUpIHtcclxuICAgIHRoaXMuZmV0Y2hpbmcgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAoc2luZ2xlICE9PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuZmV0Y2hlZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0aGlzLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5tb3JlID0gZmFsc2U7XHJcbiAgICB0aGlzLmZldGNoaW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLmZldGNoZWQgPSBmYWxzZTtcclxuICB9XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHByb3BzOiB7XHJcbiAgICBmZXRjaGVyOiB7XHJcbiAgICAgIHR5cGU6IE9iamVjdCxcclxuICAgICAgJ2RlZmF1bHQnOiBudWxsXHJcbiAgICB9LFxyXG4gICAgZmV0Y2hpbmc6IHtcclxuICAgICAgdHlwZTogQm9vbGVhbixcclxuICAgICAgZGVmYXVsdDogZmFsc2VcclxuICAgIH1cclxuICB9LFxyXG4gIHdhdGNoOiB7XHJcbiAgICAnZmV0Y2hlci5mZXRjaGluZyc6IGZ1bmN0aW9uICh0bywgZnJvbSkge1xyXG4gICAgICB0aGlzLnNldEZldGNoaW5nKClcclxuICAgIH0sXHJcbiAgICBmZXRjaGluZzogZnVuY3Rpb24gKHRvLCBmcm9tKSB7XHJcbiAgICAgIHRoaXMuc2V0RmV0Y2hpbmcoKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZGF0YTogZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc2hvd0ZldGNoaW5nOiBmYWxzZSxcclxuICAgICAgZGVsYXllZEZldGNoaW5nOiBmYWxzZSxcclxuICAgICAgdGltZXI6IG51bGxcclxuICAgIH1cclxuICB9LFxyXG4gIG1vdW50ZWQoKSB7XHJcbiAgICB0aGlzLnNldEZldGNoaW5nKCk7XHJcbiAgfSxcclxuICBtZXRob2RzOiB7XHJcbiAgICBmZXRjaE1vcmUoKSB7XHJcbiAgICAgIHRoaXMuJHBhcmVudC5mZXRjaE1vcmUoKTtcclxuICAgIH0sXHJcbiAgICBzZXRGZXRjaGluZygpIHtcclxuICAgICAgLy8gQXJlIHdlIGN1cnJlbnRseSBmZXRjaGluZz9cclxuICAgICAgbGV0IHNob3dGZXRjaGluZyA9ICh0aGlzLmZldGNoZXIgIT09IG51bGwgJiYgdGhpcy5mZXRjaGVyLmZldGNoaW5nKSB8fCB0aGlzLmZldGNoaW5nO1xyXG4gICAgICBpZiAoc2hvd0ZldGNoaW5nICYmICF0aGlzLnNob3dGZXRjaGluZykge1xyXG4gICAgICAgIC8vIEZldGNoaW5nIGlzIGJlY29taW5nIGFjdGl2ZVxyXG4gICAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuZGVsYXllZEZldGNoaW5nID0gdHJ1ZTtcclxuICAgICAgICB9LCAxMDAwKVxyXG4gICAgICB9IGVsc2UgaWYgKCFzaG93RmV0Y2hpbmcgJiYgdGhpcy5zaG93RmV0Y2hpbmcpIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XHJcbiAgICAgICAgdGhpcy50aW1lID0gbnVsbDtcclxuICAgICAgICB0aGlzLmRlbGF5ZWRGZXRjaGluZyA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc2hvd0ZldGNoaW5nID0gc2hvd0ZldGNoaW5nO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPlxyXG5cclxuQGltcG9ydCAnLi4vLi4vLi4vc2l0ZS9zYXNzL21vZHVsZXMvX2NvbG9ycyc7XHJcblxyXG5kaXYuZmV0Y2hpbmcge1xyXG4gIGhlaWdodDogMjhweDtcclxuICBtYXJnaW46IDFlbSAwO1xyXG5cclxuICBwIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcclxuICAgIGNvbG9yOiAkY29tcDtcclxuICAgIHBhZGRpbmctdG9wOiAycHg7XHJcbiAgfVxyXG59XHJcblxyXG4ubW9yZSB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG5cclxuICBidXR0b24ge1xyXG4gICAgZm9udC1zaXplOiAwLjhlbTtcclxuICAgIGhlaWdodDogMjhweDtcclxuICAgIG1hcmdpbjogMDtcclxuICB9XHJcbn1cclxuXHJcbjwvc3R5bGU+IiwiPHRlbXBsYXRlPlxyXG4gIDxkaXY+PC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG4gIGV4cG9ydCBkZWZhdWx0IHtcclxuICAgICAgcHJvcHM6IFsndXNlciddLFxyXG4gICAgICBkYXRhOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgbGluazogJycsXHJcbiAgICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIHdhdGNoOiB7XHJcbiAgICAgICAgICB1c2VyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAvLyBXZSBoYXZlIGEgbmV3IHVzZXIsIHNldCB0aGUgbGlua3NcclxuICAgICAgICAgICAgICBsZXQgdXNlciA9IHRoaXMudXNlcjtcclxuICAgICAgICAgICAgICBsZXQgbGluayA9IHRoaXMubGluaztcclxuXHJcbiAgICAgICAgICAgICAgaWYodXNlciAhPT0gbnVsbCAmJiB1c2VyLnByZXYgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLiRzZXQodGhpcy4kc2l0ZS5jb25zb2xlLmNvbXBvbmVudHMsICduYXYybGVmdCcsIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBgPHJvdXRlci1saW5rIHRpdGxlPVwiUHJldmlvdXMgVXNlclwiIDp0bz1cImxpbmsgKyB1c2VyLnByZXYuaWRcIj48aW1nIDpzcmM9XCJpY29uXCIgYWx0PVwiUHJldmlvdXMgVXNlclwiPjwvcm91dGVyLWxpbms+YCxcclxuICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFNpdGUucm9vdCArICcvdmVuZG9yL2NsL3NpdGUvaW1nL3ByZXZpY29uLnBuZycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXI6IHVzZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6IGxpbmtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuJHNldCh0aGlzLiRzaXRlLmNvbnNvbGUuY29tcG9uZW50cywgJ25hdjJsZWZ0JywgbnVsbCk7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBpZih1c2VyICE9PSBudWxsICYmIHVzZXIubmV4dCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuJHNldCh0aGlzLiRzaXRlLmNvbnNvbGUuY29tcG9uZW50cywgJ25hdjJyaWdodCcsIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBgPHJvdXRlci1saW5rIHRpdGxlPVwiTmV4dCBVc2VyXCIgOnRvPVwibGluayArIHVzZXIubmV4dC5pZFwiPjxpbWcgOnNyYz1cImljb25cIiBhbHQ9XCJOZXh0IFVzZXJcIj48L3JvdXRlci1saW5rPmAsXHJcbiAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBTaXRlLnJvb3QgKyAnL3ZlbmRvci9jbC9zaXRlL2ltZy9uZXh0aWNvbi5wbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyOiB1c2VyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5rOiBsaW5rXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLiRzZXQodGhpcy4kc2l0ZS5jb25zb2xlLmNvbXBvbmVudHMsICduYXYycmlnaHQnLCBudWxsKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIG1vdW50ZWQoKSB7XHJcbiAgICAgICAgICAvLyBEZXRlcm1pbmUgdGhlIHBhdGhcclxuICAgICAgICAgIGNvbnN0IHBhdGggPSB0aGlzLiRyb3V0ZS5wYXRoO1xyXG5cclxuICAgICAgICAgIC8vIFJlbW92ZSB0aGUgdXNlciBJRCBmcm9tIHRoZSBlbmRcclxuICAgICAgICAgIGNvbnN0IHJlID0gLyheLiopXFwvKFswLTldKykkLztcclxuICAgICAgICAgIGNvbnN0IG1hdGNoID0gcGF0aC5tYXRjaChyZSk7XHJcbiAgICAgICAgICBpZihtYXRjaCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgIHRoaXMubGluayA9IG1hdGNoWzFdICsgJy8nO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBiZWZvcmVEZXN0cm95KCkge1xyXG4gICAgICAgICAgdGhpcy4kc2V0KHRoaXMuJHNpdGUuY29uc29sZS5jb21wb25lbnRzLCAnbmF2MmxlZnQnLCBudWxsKTtcclxuICAgICAgICAgIHRoaXMuJHNldCh0aGlzLiRzaXRlLmNvbnNvbGUuY29tcG9uZW50cywgJ25hdjJyaWdodCcsIG51bGwpO1xyXG4gICAgICB9XHJcbiAgfVxyXG48L3NjcmlwdD5cclxuXHJcbiIsIi8qKlxyXG4gKiBAZmlsZVxyXG4gKiBVc2VycyBjb25zb2xlIGNvbXBvbmVudHNcclxuICovXHJcblxyXG5pbXBvcnQgVXNlcnNFZGl0b3JDb21wb25lbnQgZnJvbSAnLi9Vc2Vyc0VkaXRvckNvbXBvbmVudC52dWUnO1xyXG5pbXBvcnQgVXNlckVkaXRvckNvbXBvbmVudCBmcm9tICcuL1VzZXJFZGl0b3JDb21wb25lbnQudnVlJztcclxuaW1wb3J0IExvZ1ZpZXdDb21wb25lbnQgZnJvbSAnLi9Mb2dWaWV3Q29tcG9uZW50LnZ1ZSc7XHJcbmltcG9ydCB7VXNlcn0gZnJvbSAnLi4vVXNlcnMvVXNlcic7XHJcblxyXG5leHBvcnQgbGV0IFVzZXJzQ29uc29sZSA9IGZ1bmN0aW9uKHNpdGUpIHtcclxuICAgIGNvbnN0IENvbnNvbGUgPSBzaXRlLmNvbnNvbGU7XHJcblxyXG4gICAgQ29uc29sZS50YWJsZXMuYWRkKHtcclxuICAgICAgICB0aXRsZTogJ1VzZXJzJyxcclxuICAgICAgICBvcmRlcjogMTAsXHJcbiAgICAgICAgYXBpOiAnL2FwaS91c2Vycy90YWJsZXMnXHJcbiAgICB9KTtcclxuXHJcbiAgICBDb25zb2xlLmNvbXBvbmVudHMuYWRkT3B0aW9uKHtcclxuICAgICAgICBhdExlYXN0OiBTaXRlLlVzZXIuU1RBRkYsXHJcbiAgICAgICAgcGFnZToge3RpdGxlOiAnTWFpbicsIHJvdXRlOiAnJywgb3JkZXI6IDF9LFxyXG4gICAgICAgIHNlY3Rpb246IHt0aXRsZTogJ1NpdGUnLCBvcmRlcjogMX0sXHJcbiAgICAgICAgdGl0bGU6ICdVc2VycycsXHJcbiAgICAgICAgb3JkZXI6IDEsXHJcbiAgICAgICAgcm91dGU6ICcvdXNlcnMnLFxyXG4gICAgICAgIHJvdXRlczogW1xyXG4gICAgICAgICAgICB7cm91dGU6ICcvdXNlcnMnLCBjb21wb25lbnQ6IFVzZXJzRWRpdG9yQ29tcG9uZW50LCBwcm9wczoge21hbmFnZW1lbnQ6IGZhbHNlfX1cclxuICAgICAgICBdXHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgQ29uc29sZS5jb21wb25lbnRzLmFkZE9wdGlvbih7XHJcbiAgICAgICAgYXRMZWFzdDogU2l0ZS5Vc2VyLkFETUlOLFxyXG4gICAgICAgIHBhZ2U6IHt0aXRsZTogJ01hbmFnZW1lbnQnLCByb3V0ZTogJy9tYW5hZ2VtZW50Jywgb3JkZXI6IDEwfSxcclxuICAgICAgICBzZWN0aW9uOiB7dGl0bGU6ICdTaXRlIE1hbmFnZW1lbnQnLCBvcmRlcjogMX0sXHJcbiAgICAgICAgdGl0bGU6ICdVc2VycycsXHJcbiAgICAgICAgb3JkZXI6IDEsXHJcbiAgICAgICAgcm91dGU6ICcvbWFuYWdlbWVudC91c2VycycsXHJcbiAgICAgICAgcm91dGVzOiBbXHJcbiAgICAgICAgICAgIHtyb3V0ZTogJy9tYW5hZ2VtZW50L3VzZXJzJywgbmFtZTogJ3VzZXJzJywgY29tcG9uZW50OiBVc2Vyc0VkaXRvckNvbXBvbmVudCwgcHJvcHM6IHttYW5hZ2VtZW50OiB0cnVlfX0sXHJcbiAgICAgICAgICAgIHtyb3V0ZTogJy9tYW5hZ2VtZW50L3VzZXIvOmlkJywgbmFtZTogJ3VzZXInLCBjb21wb25lbnQ6IFVzZXJFZGl0b3JDb21wb25lbnQsIHByb3BzOiB0cnVlfVxyXG4gICAgICAgIF1cclxuICAgIH0pO1xyXG5cclxuXHRDb25zb2xlLmNvbXBvbmVudHMuYWRkT3B0aW9uKHtcclxuXHRcdGF0TGVhc3Q6IHt0YWc6ICdzaXRlLWxvZycsIGRlZmF1bHQ6IFVzZXIuQURNSU59LFxyXG5cdFx0cGFnZToge3RpdGxlOiAnTWFuYWdlbWVudCcsIHJvdXRlOiAnL21hbmFnZW1lbnQnLCBvcmRlcjogMTB9LFxyXG5cdFx0c2VjdGlvbjoge3RpdGxlOiAnU2l0ZSBNYW5hZ2VtZW50Jywgb3JkZXI6IDF9LFxyXG5cdFx0dGl0bGU6ICdMb2dzJyxcclxuXHRcdG9yZGVyOiAyLFxyXG5cdFx0cm91dGU6ICcvbWFuYWdlbWVudC9sb2dzJyxcclxuXHRcdHJvdXRlczogW1xyXG5cdFx0XHR7cm91dGU6ICcvbWFuYWdlbWVudC9sb2dzJywgbmFtZTogJ2xvZ3MnLCBjb21wb25lbnQ6IExvZ1ZpZXdDb21wb25lbnR9XHJcblx0XHRdXHJcblx0fSk7XHJcblxyXG59XHJcblxyXG5cclxuIiwiLyoqXHJcbiAqIEBmaWxlXHJcbiAqIENvdXJzZSBjb25zb2xlIGVudHJ5IHBvaW50LlxyXG4gKi9cclxuXHJcbmltcG9ydCB7VXNlcnNDb25zb2xlfSBmcm9tICcuL1VzZXJzQ29uc29sZSc7XHJcblxyXG5uZXcgVXNlcnNDb25zb2xlKFNpdGUuU2l0ZSk7IiwiLyoqXHJcbiAqIEBmaWxlXHJcbiAqIFJlcHJlc2VudHMgYSB1c2VyIGluIHRoZSBzeXN0ZW1cclxuICovXHJcblxyXG5sZXQgVXNlciA9IGZ1bmN0aW9uKGpzb24pIHtcclxuXHJcbiAgICAvLy8gVGhlIHVzZXIgcm9sZSAtIGxvY2FsIHNvIHdlIGNhbiBwcm90ZWN0IGl0IHdpdGggZ2V0dGVyL3NldHRlclxyXG4gICAgbGV0IHJvbGUgPSAnRyc7XHJcblxyXG4gICAgLy8gSW5zdGFsbGVkIG1lbWJlcnNoaXBcclxuICAgIGxldCBtZW1iZXIgPSBudWxsO1xyXG5cclxuICAgIGlmKGpzb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlmKHR5cGVvZihqc29uKSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAganNvbiA9IEpTT04ucGFyc2UoanNvbilcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaWQgPSBqc29uLmlkO1xyXG4gICAgICAgIHJvbGUgPSBqc29uLnJvbGU7XHJcbiAgICAgICAgdGhpcy5uYW1lID0ganNvbi5uYW1lO1xyXG4gICAgICAgIHRoaXMuZW1haWwgPSBqc29uLmVtYWlsO1xyXG4gICAgICAgIHRoaXMudXNlcklkID0ganNvbi51c2VyO1xyXG5cclxuICAgICAgICAvLyBJbnN0YWxsZWQgbWVtYmVyc2hpcFxyXG4gICAgICAgIG1lbWJlciA9IFVzZXIuaW5zdGFudGlhdGVNZW1iZXIoanNvbik7XHJcbiAgICAgICAgaWYobWVtYmVyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIG1lbWJlci51c2VyID0gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmlkID0gMDtcclxuICAgICAgICByb2xlID0gJ0cnO1xyXG4gICAgICAgIHRoaXMubmFtZSA9ICcnO1xyXG4gICAgICAgIHRoaXMuZW1haWwgPSAnJztcclxuICAgICAgICB0aGlzLnVzZXJJZCA9ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnbWVtYmVyJywge1xyXG4gICAgICAgIGdldCgpIHtyZXR1cm4gbWVtYmVyfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gdGhlIGVmZmVjdGl2ZSByb2xlIGZvciB0aGUgdXNlci5cclxuICAgICAqIFRoaXMgaXMgdGhlIHVzZXIncyByb2xlIHVubGVzcyB0aGUgdXNlclxyXG4gICAgICogaGFzIGEgbWVtYmVyc2hpcCwgaW4gd2hpY2ggY2FzZSBpdCBpcyB0aGVcclxuICAgICAqIG1lbWJlcnNoaXAgcm9sZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICB0aGlzLnJvbGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZihtZW1iZXIgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1lbWJlci5yb2xlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcm9sZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNldFVzZXJSb2xlID0gZnVuY3Rpb24oX3JvbGUpIHtcclxuICAgICAgICByb2xlID0gX3JvbGU7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy51c2VyUm9sZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiByb2xlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBtZW1iZXJzaGlwIGZvciB0aGlzIHVzZXJcclxuICAgICAqIEBwYXJhbSBNZW1iZXJzaGlwIG1lbWJlclxyXG4gICAgICovXHJcbiAgICB0aGlzLnNldE1lbWJlciA9IGZ1bmN0aW9uKF9tZW1iZXIpIHtcclxuICAgICAgICBtZW1iZXIgPSBfbWVtYmVyO1xyXG4gICAgICAgIGlmKG1lbWJlciAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBtZW1iZXIudXNlciA9IHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuVXNlci5HVUVTVCA9ICdHJztcclxuVXNlci5VU0VSID0gJ1UnO1xyXG5Vc2VyLlNUQUZGID0gJ1MnO1xyXG5Vc2VyLkFETUlOID0gJ0EnO1xyXG5cclxuXHJcblVzZXIuZ2V0VXNlclJvbGVzID0gZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgcm9sZXMgPSB7fTtcclxuICAgIHJvbGVzW1VzZXIuR1VFU1RdID0ge25hbWU6ICdHdWVzdCcsIHByaW9yaXR5OiAxfTtcclxuICAgIHJvbGVzW1VzZXIuVVNFUl0gPSB7bmFtZTogJ1VzZXInLCBwcmlvcml0eTogMn07XHJcbiAgICByb2xlc1tVc2VyLlNUQUZGXSA9IHtuYW1lOiAnU3RhZmYnLCBwcmlvcml0eTogM307XHJcbiAgICByb2xlc1tVc2VyLkFETUlOXSA9IHtuYW1lOiAnQWRtaW4nLCBwcmlvcml0eTogNH07XHJcblxyXG4gICAgcmV0dXJuIHJvbGVzO1xyXG59XHJcblxyXG5Vc2VyLnByb3RvdHlwZS5nZXRVc2VyUm9sZXMgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiBVc2VyLmdldFVzZXJSb2xlcygpO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0IHRoZSByb2xlcyBmb3IgdGhpcyB1c2VyLiBNZW1iZXJzaGlwIHJvbGVzIHRha2UgcHJpb3JpdHlcclxuICogb3ZlciByb2xlcyBmb3IganVzdCBhIHVzZXIgd2hvIGlzIG5vdCBhIG1lbWJlci5cclxuICovXHJcblVzZXIucHJvdG90eXBlLmdldFJvbGVzID0gZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgbWVtYmVyID0gdGhpcy5tZW1iZXI7XHJcbiAgICBpZihtZW1iZXIgIT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gbWVtYmVyLmdldFJvbGVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFVzZXIuZ2V0VXNlclJvbGVzKCk7XHJcbn1cclxuXHJcblVzZXIucHJvdG90eXBlLmF0TGVhc3QgPSBmdW5jdGlvbihhdExlYXN0KSB7XHJcbiAgICBsZXQgcm9sZSA9IHRoaXMucm9sZSgpO1xyXG4gICAgbGV0IHJvbGVzID0gdGhpcy5nZXRSb2xlcygpO1xyXG4gICAgaWYocm9sZXMuaGFzT3duUHJvcGVydHkoYXRMZWFzdCkpIHtcclxuICAgICAgICByZXR1cm4gcm9sZXNbcm9sZV0ucHJpb3JpdHkgPj0gcm9sZXNbYXRMZWFzdF0ucHJpb3JpdHk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblVzZXIucHJvdG90eXBlLmdldFJvbGVQcmlvcml0eSA9IGZ1bmN0aW9uKHJvbGUpIHtcclxuICAgIGxldCByb2xlcyA9IHRoaXMuZ2V0Um9sZXMoKTtcclxuICAgIGlmKHJvbGVzLmhhc093blByb3BlcnR5KHJvbGUpKSB7XHJcbiAgICAgICAgcmV0dXJuIHJvbGVzW3JvbGVdLnByaW9yaXR5O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAwO1xyXG59XHJcblxyXG5Vc2VyLnByb3RvdHlwZS5kaXNwbGF5TmFtZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IGNvbW1hID0gdGhpcy5uYW1lLmluZGV4T2YoJywnKTtcclxuICAgIGlmKGNvbW1hIDwgMCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGxhc3QgPSB0aGlzLm5hbWUuc3Vic3RyKDAsIGNvbW1hKTtcclxuICAgIGxldCBmaXJzdCA9IHRoaXMubmFtZS5zdWJzdHIoY29tbWErMSkudHJpbSgpO1xyXG5cclxuICAgIHJldHVybiBmaXJzdCArICcgJyArIGxhc3Q7XHJcbn1cclxuXHJcblxyXG5Vc2VyLnByb3RvdHlwZS51c2VyUm9sZU5hbWUgPSBmdW5jdGlvbihzaG9ydCkge1xyXG4gICAgY29uc3Qgcm9sZXMgPSB0aGlzLmdldFVzZXJSb2xlcygpO1xyXG4gICAgbGV0IHJvbGUgPSB0aGlzLnVzZXJSb2xlKCk7XHJcbiAgICBsZXQgciA9IHJvbGVzW3JvbGVdO1xyXG5cdGlmKHIgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0cmV0dXJuICdJbnZhbGlkJztcclxuXHR9XHJcblxyXG5cdGlmKHNob3J0ID09PSB0cnVlICYmIHIuc2hvcnQgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0cmV0dXJuIHIuc2hvcnQ7XHJcblx0fVxyXG5cclxuICAgIHJldHVybiByLm5hbWU7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogUmV0dXJuIHRoZSByb2xlIG5hbWUgZm9yIHRoaXMgdXNlci5cclxuICogQHBhcmFtIHNob3J0IElmIHNldCB0byB0cnVlLCBhIHNob3J0IHZlcnNpb24gaXMgc3VwcGxpZWQgaWYgYXZhaWxhYmxlLlxyXG4gKiBAcmV0dXJucyBzdHJpbmdcclxuICovXHJcblVzZXIucHJvdG90eXBlLnJvbGVOYW1lID0gZnVuY3Rpb24oc2hvcnQpIHtcclxuICAgIGNvbnN0IHJvbGVzID0gdGhpcy5nZXRSb2xlcygpO1xyXG4gICAgbGV0IHJvbGUgPSB0aGlzLnJvbGUoKTtcclxuXHRsZXQgciA9IHJvbGVzW3JvbGVdO1xyXG5cdGlmKHIgPT09IHVuZGVmaW5lZCkge1xyXG5cdCAgICByZXR1cm4gJ0ludmFsaWQnO1xyXG4gICAgfVxyXG5cclxuXHRpZihzaG9ydCA9PT0gdHJ1ZSAmJiByLnNob3J0ICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdHJldHVybiByLnNob3J0O1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHIubmFtZTtcclxufVxyXG5cclxuVXNlci5wcm90b3R5cGUucm9sZVRvTmFtZSA9IGZ1bmN0aW9uKHJvbGUsIHNob3J0KSB7XHJcbiAgICBjb25zdCByb2xlcyA9IHRoaXMuZ2V0Um9sZXMoKTtcclxuICAgIGxldCByID0gcm9sZXNbcm9sZV07XHJcbiAgICBpZihyID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gJ0ludmFsaWQnO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKHNob3J0ID09PSB0cnVlICYmIHIuc2hvcnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybiByLnNob3J0O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByLm5hbWU7XHJcbn1cclxuXHJcblVzZXIuY29tcGFyZSA9IGZ1bmN0aW9uKGEsIGIpIHtcclxuICAgIGxldCBhbiA9IGEubmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgbGV0IGJuID0gYi5uYW1lLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgaWYoYW4gPCBibikge1xyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuXHJcbiAgICBpZihhbiA+IGJuKSB7XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGEuaWQgLSBiLmlkO1xyXG59XHJcblxyXG4vKipcclxuICogSW5zdGFudGlhdGUgYSBNZW1iZXJzaGlwIG9iamVjdCBmb3IgdGhlIHVzZXIuXHJcbiAqIFRoaXMgd2lsbCBiZSByZXBsYWNlZCBieSBhIHBsdWdpbiB0aGF0IGFkZHNcclxuICogc3VwcG9ydCBmb3IgbWVtYmVyc2hpcHMuXHJcbiAqIEBwYXJhbSBkYXRhIG5vcm1hbGx5IGluIHRoZSBmb3JtYXQgdGhlIFBIUCBKU09OIHJlcHJlc2VudGF0aW9uXHJcbiAqIEByZXR1cm5zIHtudWxsfVxyXG4gKi9cclxuVXNlci5pbnN0YW50aWF0ZU1lbWJlciA9IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBVc2VyO1xyXG5leHBvcnQge1VzZXJ9OyIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy9jc3MtbG9hZGVyLXZpcnR1YWwtMWRkYzY4YjRhMS8wL2NhY2hlL2Nzcy1sb2FkZXItbnBtLTUuMi42LTExOGM2ZDQwOWUtOTkzMzU0YTI0OC56aXAvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2Nzc1dpdGhNYXBwaW5nVG9TdHJpbmcuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL2Nzcy1sb2FkZXItdmlydHVhbC0xZGRjNjhiNGExLzAvY2FjaGUvY3NzLWxvYWRlci1ucG0tNS4yLjYtMTE4YzZkNDA5ZS05OTMzNTRhMjQ4LnppcC9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJkaXYuZmV0Y2hpbmdbZGF0YS12LTQzYjI2YmNiXSB7XFxuICBoZWlnaHQ6IDI4cHg7XFxuICBtYXJnaW46IDFlbSAwO1xcbn1cXG5kaXYuZmV0Y2hpbmcgcFtkYXRhLXYtNDNiMjZiY2JdIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gIGNvbG9yOiAjYzQxNDI1O1xcbiAgcGFkZGluZy10b3A6IDJweDtcXG59XFxuLm1vcmVbZGF0YS12LTQzYjI2YmNiXSB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcbi5tb3JlIGJ1dHRvbltkYXRhLXYtNDNiMjZiY2JdIHtcXG4gIGZvbnQtc2l6ZTogMC44ZW07XFxuICBoZWlnaHQ6IDI4cHg7XFxuICBtYXJnaW46IDA7XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3ZlbmRvci9jbC91c2Vycy9qcy9MaWIvRmV0Y2hlclZ1ZS52dWVcIixcIndlYnBhY2s6Ly8uL3ZlbmRvci9jbC9zaXRlL3Nhc3MvbW9kdWxlcy9fY29sb3JzLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBMEdBO0VBQ0UsWUFBQTtFQUNBLGFBQUE7QUF6R0Y7QUEyR0U7RUFDRSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsY0MzRkc7RUQ0RkgsZ0JBQUE7QUF6R0o7QUE2R0E7RUFDRSxrQkFBQTtBQTFHRjtBQTRHRTtFQUNFLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLFNBQUE7QUExR0pcIixcInNvdXJjZXNDb250ZW50XCI6W1wiXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxuXFxyXFxuXFxyXFxuQGltcG9ydCAnLi4vLi4vLi4vc2l0ZS9zYXNzL21vZHVsZXMvX2NvbG9ycyc7XFxyXFxuXFxyXFxuZGl2LmZldGNoaW5nIHtcXHJcXG4gIGhlaWdodDogMjhweDtcXHJcXG4gIG1hcmdpbjogMWVtIDA7XFxyXFxuXFxyXFxuICBwIHtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XFxyXFxuICAgIGNvbG9yOiAkY29tcDtcXHJcXG4gICAgcGFkZGluZy10b3A6IDJweDtcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuLm1vcmUge1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcblxcclxcbiAgYnV0dG9uIHtcXHJcXG4gICAgZm9udC1zaXplOiAwLjhlbTtcXHJcXG4gICAgaGVpZ2h0OiAyOHB4O1xcclxcbiAgICBtYXJnaW46IDA7XFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcblwiLFwiLy8gVGhlIG1ham9yIGNvbG9yc1xcclxcbi8vIFdlIGhhdmUgYSBwcmltYXJ5IGNvbG9yLCB0d28gc2Vjb25kYXJ5IGNvbG9ycywgYW5kIGEgY29tcGxlbWVudGFyeSBjb2xvci5cXHJcXG4kYWNjZW50OiAjNjA3RDhCO1xcclxcblxcclxcbiR0b2FzdC1iYWNrZ3JvdW5kOiAjMTUxNTE1O1xcclxcbiR0b2FzdC10ZXh0OiB3aGl0ZTtcXHJcXG5cXHJcXG4kaGVhZGVyLWJhY2tncm91bmQ6ICM1MzUwNTQ7XFxyXFxuJGhlYWRlci10ZXh0OiAjZWVlZWVlO1xcclxcblxcclxcbi8vIFRoZSBtYWpvciBjb2xvcnNcXHJcXG4vLyBXZSBoYXZlIGEgcHJpbWFyeSBjb2xvciwgdHdvIHNlY29uZGFyeSBjb2xvcnMsIGFuZCBhIGNvbXBsZW1lbnRhcnkgY29sb3IuXFxyXFxuJHByaW1hcnk6ICMwMDcyM2Y7XFxyXFxuJGxpZ2h0LXByaW1hcnk6ICM0NGEyNmI7XFxyXFxuJHZlcnktbGlnaHQtcHJpbWFyeTogI2U4ZjdmMztcXHJcXG4kZGFyay1wcmltYXJ5OiAjMDA1MjIzO1xcclxcbiRwcmltYXJ5LXRleHQ6ICMyMTIxMjE7XFxyXFxuXFxyXFxuJHNlY29uZGE6ICMwMDkwOWU7XFxyXFxuJHNlY29uZGI6ICNmY2FmMTc7XFxyXFxuJHNlY29uZGM6ICNjODlhNTg7IC8vICNlOGQ5YjU7XFxyXFxuXFxyXFxuJGNvbXA6ICNjNDE0MjU7XFxyXFxuJGJsaW5kOiAjZWZjNmZmO1xcclxcbiRjb21wLWJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgjNTcwMTAyLCAjOTYwNjA2LCAjNTcwMTAyKTtcXHJcXG4kY29tcC1ib3JkZXI6ICNjN2JkYmI7XFxyXFxuXFxyXFxuLy8gTWVudXNcXHJcXG4kZm9jdXM6ICMwMDgxODM7XFxyXFxuJG1lbnUtYmFja2dyb3VuZDogI2U4ZThlODtcXHJcXG4kbWVudS1ob3ZlcjogI2QwZDBkMDtcXHJcXG4kbWVudS1jb2xvcjogYmxhY2s7XFxyXFxuXFxyXFxuLy8gUGFnZSBiYWNrZ3JvdW5kXFxyXFxuJGJhY2tncm91bmQ6ICNlZWVlZWU7XFxyXFxuXFxyXFxuLy8gTmF2XFxyXFxuJG5hdi1jb2xvcjogd2hpdGU7XFxyXFxuJG5hdi1iYWNrZ3JvdW5kOiB1cmwoJ2ltZy9uYXZfcGF0dGVybi5wbmcnKTtcXHJcXG4kbmF2LTItY29sb3I6ICNmZmZmOTk7XFxyXFxuJG5hdi0yLWJhY2tncm91bmQ6IHVybCgnaW1nL25hdl9wYXR0ZXJuLTIucG5nJyk7XFxyXFxuXFxyXFxuLy8gVGFibGVzXFxyXFxuJHRhYmxlLWdyYWRpZW50LWZyb206ICMyMDRjNDI7XFxyXFxuJHRhYmxlLWdyYWRpZW50LXRvOiAjMzg5YjU0O1xcclxcblxcclxcbi8vIERpYWxvZyBib3hlc1xcclxcbiRkaWFsb2ctZ3JhZGllbnQtZnJvbTogIzIwNGM0MjtcXHJcXG4kZGlhbG9nLWdyYWRpZW50LXRvOiAjMzg5YjU0O1xcclxcbiRkaWFsb2ctYmFyLWNvbG9yOiB3aGl0ZTtcXHJcXG5cXHJcXG4vLyBMaW5rIGNvbG9yc1xcclxcbiRsaW5rOiAjODA4MDgwO1xcclxcbiR2aXNpdGVkOiAjOTY4NDQzOyAgLy8gI2IwOWQ1YjtcXHJcXG4kaG92ZXI6ICMzMzY2Y2M7XFxyXFxuXFxyXFxuJHZlcnktbGlnaHQtcHJpbWFyeS1saW5rOiAjOTAwMDAwO1xcclxcbiR2ZXJ5LWxpZ2h0LXByaW1hcnktaG92ZXI6ICNjMDAwMDA7XFxyXFxuXFxyXFxuXFxyXFxuJHByaW1hcnktbGluazogd2hpdGU7XFxyXFxuJHByaW1hcnktdmlzaXRlZDogI2RkZGRkZDtcXHJcXG4kc2Vjb25kYi12aXNpdGVkOiAjNTU1NTU1O1xcclxcbiRhdXRvYmFjay1saW5rOiAjODgyMjIyO1xcclxcbiRhdXRvYmFjay1saW5rLWhvdmVyOiAjY2MyMjIyO1xcclxcblxcclxcbiRzaGFkb3cteDogM3B4O1xcclxcbiRzaGFkb3cteTogM3B4O1xcclxcbiRzaGFkb3ctcmFkaXVzOiA4cHg7XFxyXFxuJHNoYWRvdy1jb2xvcjogI2NjYztcXHJcXG5cXHJcXG4kdG9nZ2xlLWxpbmstaG92ZXItY29sb3I6ICMwMDY2MDA7XFxyXFxuXFxyXFxuLy8gQm94ZXNcXHJcXG4kYm94LWJvcmRlci1jb2xvcjogI2JkYmRiZDtcXHJcXG5cXHJcXG4vLyBDYXJkc1xcclxcbiRjYXJkLWhlYWRpbmctYmFja2dyb3VuZDogI2YyZjJmMjtcXHJcXG4kY2FyZC1ib3JkZXItY29sb3I6ICNjY2NjY2M7XFxyXFxuXFxyXFxuJXNoYWRvdyB7XFxyXFxuICAtbW96LWJveC1zaGFkb3c6ICRzaGFkb3cteCAkc2hhZG93LXkgJHNoYWRvdy1yYWRpdXMgJHNoYWRvdy1jb2xvcjtcXHJcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogJHNoYWRvdy14ICRzaGFkb3cteSAkc2hhZG93LXJhZGl1cyAkc2hhZG93LWNvbG9yO1xcclxcbiAgYm94LXNoYWRvdzogJHNoYWRvdy14ICRzaGFkb3cteSAkc2hhZG93LXJhZGl1cyAkc2hhZG93LWNvbG9yO1xcclxcbn1cXHJcXG5cXHJcXG4lbm9zaGFkb3cge1xcclxcbiAgLW1vei1ib3gtc2hhZG93OiBub25lO1xcclxcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiBub25lO1xcclxcbiAgYm94LXNoYWRvdzogbm9uZTtcXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsImltcG9ydCBhcGkgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy9zdHlsZS1sb2FkZXItdmlydHVhbC04NjI2MDZmMzkzLzAvY2FjaGUvc3R5bGUtbG9hZGVyLW5wbS0yLjAuMC1iOWE1YzRhMmFhLTIxNDI1MjQ2YTUuemlwL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgICAgICAgaW1wb3J0IGNvbnRlbnQgZnJvbSBcIiEhLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vY3NzLWxvYWRlci12aXJ0dWFsLTFkZGM2OGI0YTEvMC9jYWNoZS9jc3MtbG9hZGVyLW5wbS01LjIuNi0xMThjNmQ0MDllLTk5MzM1NGEyNDguemlwL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3Z1ZS1sb2FkZXItdmlydHVhbC0zZjBjMzhiYjJjLzAvY2FjaGUvdnVlLWxvYWRlci1ucG0tMTUuOS43LWM5MmNjZTM0OGUtOWQ2YjkyZWE2Zi56aXAvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3Jlc29sdmUtdXJsLWxvYWRlci12aXJ0dWFsLWVjNzVkMmEwOWUvMC9jYWNoZS9yZXNvbHZlLXVybC1sb2FkZXItbnBtLTQuMC4wLTJhOWMxOGQ4NmItOGU1YmNmOTc4Ni56aXAvbm9kZV9tb2R1bGVzL3Jlc29sdmUtdXJsLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy9zYXNzLWxvYWRlci12aXJ0dWFsLTM4NTdmNWU5ZjEvMC9jYWNoZS9zYXNzLWxvYWRlci1ucG0tMTIuMS4wLTYxODgwODllMTItNjljNjZlYTM0OC56aXAvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9jbG9uZWRSdWxlU2V0LTRbMF0ucnVsZXNbMF0udXNlWzNdIS4uLy4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3Z1ZS1sb2FkZXItdmlydHVhbC1kZDBkYzliZjM0LzAvY2FjaGUvdnVlLWxvYWRlci1ucG0tMTUuOS43LWM5MmNjZTM0OGUtOWQ2YjkyZWE2Zi56aXAvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9GZXRjaGVyVnVlLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTQzYjI2YmNiJmxhbmc9c2NzcyZzY29wZWQ9dHJ1ZSZcIjtcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5pbnNlcnQgPSBcImhlYWRcIjtcbm9wdGlvbnMuc2luZ2xldG9uID0gZmFsc2U7XG5cbnZhciB1cGRhdGUgPSBhcGkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgZGVmYXVsdCBjb250ZW50LmxvY2FscyB8fCB7fTsiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL2JhYmVsLWxvYWRlci12aXJ0dWFsLThkNzhmNDJkNDMvMC9jYWNoZS9iYWJlbC1sb2FkZXItbnBtLTguMi4yLWI0ZTYwMGMyYzUtZGY1MDkyZWY5OC56aXAvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P2Nsb25lZFJ1bGVTZXQtMlswXS5ydWxlc1swXS51c2UhLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vdnVlLWxvYWRlci12aXJ0dWFsLWRkMGRjOWJmMzQvMC9jYWNoZS92dWUtbG9hZGVyLW5wbS0xNS45LjctYzkyY2NlMzQ4ZS05ZDZiOTJlYTZmLnppcC9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0xvZ1ZpZXdDb21wb25lbnQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL2JhYmVsLWxvYWRlci12aXJ0dWFsLThkNzhmNDJkNDMvMC9jYWNoZS9iYWJlbC1sb2FkZXItbnBtLTguMi4yLWI0ZTYwMGMyYzUtZGY1MDkyZWY5OC56aXAvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P2Nsb25lZFJ1bGVTZXQtMlswXS5ydWxlc1swXS51c2UhLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vdnVlLWxvYWRlci12aXJ0dWFsLWRkMGRjOWJmMzQvMC9jYWNoZS92dWUtbG9hZGVyLW5wbS0xNS45LjctYzkyY2NlMzQ4ZS05ZDZiOTJlYTZmLnppcC9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0xvZ1ZpZXdDb21wb25lbnQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy9iYWJlbC1sb2FkZXItdmlydHVhbC04ZDc4ZjQyZDQzLzAvY2FjaGUvYmFiZWwtbG9hZGVyLW5wbS04LjIuMi1iNGU2MDBjMmM1LWRmNTA5MmVmOTguemlwL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9jbG9uZWRSdWxlU2V0LTJbMF0ucnVsZXNbMF0udXNlIS4uLy4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3Z1ZS1sb2FkZXItdmlydHVhbC1kZDBkYzliZjM0LzAvY2FjaGUvdnVlLWxvYWRlci1ucG0tMTUuOS43LWM5MmNjZTM0OGUtOWQ2YjkyZWE2Zi56aXAvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Vc2VyRWRpdG9yQ29tcG9uZW50LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy9iYWJlbC1sb2FkZXItdmlydHVhbC04ZDc4ZjQyZDQzLzAvY2FjaGUvYmFiZWwtbG9hZGVyLW5wbS04LjIuMi1iNGU2MDBjMmM1LWRmNTA5MmVmOTguemlwL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9jbG9uZWRSdWxlU2V0LTJbMF0ucnVsZXNbMF0udXNlIS4uLy4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3Z1ZS1sb2FkZXItdmlydHVhbC1kZDBkYzliZjM0LzAvY2FjaGUvdnVlLWxvYWRlci1ucG0tMTUuOS43LWM5MmNjZTM0OGUtOWQ2YjkyZWE2Zi56aXAvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Vc2VyRWRpdG9yQ29tcG9uZW50LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vYmFiZWwtbG9hZGVyLXZpcnR1YWwtOGQ3OGY0MmQ0My8wL2NhY2hlL2JhYmVsLWxvYWRlci1ucG0tOC4yLjItYjRlNjAwYzJjNS1kZjUwOTJlZjk4LnppcC9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/Y2xvbmVkUnVsZVNldC0yWzBdLnJ1bGVzWzBdLnVzZSEuLi8uLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy92dWUtbG9hZGVyLXZpcnR1YWwtZGQwZGM5YmYzNC8wL2NhY2hlL3Z1ZS1sb2FkZXItbnBtLTE1LjkuNy1jOTJjY2UzNDhlLTlkNmI5MmVhNmYuemlwL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vVXNlcnNFZGl0b3JDb21wb25lbnQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL2JhYmVsLWxvYWRlci12aXJ0dWFsLThkNzhmNDJkNDMvMC9jYWNoZS9iYWJlbC1sb2FkZXItbnBtLTguMi4yLWI0ZTYwMGMyYzUtZGY1MDkyZWY5OC56aXAvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P2Nsb25lZFJ1bGVTZXQtMlswXS5ydWxlc1swXS51c2UhLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vdnVlLWxvYWRlci12aXJ0dWFsLWRkMGRjOWJmMzQvMC9jYWNoZS92dWUtbG9hZGVyLW5wbS0xNS45LjctYzkyY2NlMzQ4ZS05ZDZiOTJlYTZmLnppcC9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1VzZXJzRWRpdG9yQ29tcG9uZW50LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vYmFiZWwtbG9hZGVyLXZpcnR1YWwtOGQ3OGY0MmQ0My8wL2NhY2hlL2JhYmVsLWxvYWRlci1ucG0tOC4yLjItYjRlNjAwYzJjNS1kZjUwOTJlZjk4LnppcC9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/Y2xvbmVkUnVsZVNldC0yWzBdLnJ1bGVzWzBdLnVzZSEuLi8uLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy92dWUtbG9hZGVyLXZpcnR1YWwtZGQwZGM5YmYzNC8wL2NhY2hlL3Z1ZS1sb2FkZXItbnBtLTE1LjkuNy1jOTJjY2UzNDhlLTlkNmI5MmVhNmYuemlwL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRmV0Y2hlclZ1ZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vYmFiZWwtbG9hZGVyLXZpcnR1YWwtOGQ3OGY0MmQ0My8wL2NhY2hlL2JhYmVsLWxvYWRlci1ucG0tOC4yLjItYjRlNjAwYzJjNS1kZjUwOTJlZjk4LnppcC9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/Y2xvbmVkUnVsZVNldC0yWzBdLnJ1bGVzWzBdLnVzZSEuLi8uLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy92dWUtbG9hZGVyLXZpcnR1YWwtZGQwZGM5YmYzNC8wL2NhY2hlL3Z1ZS1sb2FkZXItbnBtLTE1LjkuNy1jOTJjY2UzNDhlLTlkNmI5MmVhNmYuemlwL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRmV0Y2hlclZ1ZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL2JhYmVsLWxvYWRlci12aXJ0dWFsLThkNzhmNDJkNDMvMC9jYWNoZS9iYWJlbC1sb2FkZXItbnBtLTguMi4yLWI0ZTYwMGMyYzUtZGY1MDkyZWY5OC56aXAvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P2Nsb25lZFJ1bGVTZXQtMlswXS5ydWxlc1swXS51c2UhLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vdnVlLWxvYWRlci12aXJ0dWFsLWRkMGRjOWJmMzQvMC9jYWNoZS92dWUtbG9hZGVyLW5wbS0xNS45LjctYzkyY2NlMzQ4ZS05ZDZiOTJlYTZmLnppcC9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1ByZXZOZXh0VXNlci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vYmFiZWwtbG9hZGVyLXZpcnR1YWwtOGQ3OGY0MmQ0My8wL2NhY2hlL2JhYmVsLWxvYWRlci1ucG0tOC4yLjItYjRlNjAwYzJjNS1kZjUwOTJlZjk4LnppcC9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/Y2xvbmVkUnVsZVNldC0yWzBdLnJ1bGVzWzBdLnVzZSEuLi8uLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy92dWUtbG9hZGVyLXZpcnR1YWwtZGQwZGM5YmYzNC8wL2NhY2hlL3Z1ZS1sb2FkZXItbnBtLTE1LjkuNy1jOTJjY2UzNDhlLTlkNmI5MmVhNmYuemlwL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUHJldk5leHRVc2VyLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjb250ZW50XCIgfSwgW1xuICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZnVsbFwiIH0sIFtcbiAgICAgIF9jKFwiZm9ybVwiLCBbXG4gICAgICAgIF9jKFwicFwiLCB7IHN0YXRpY0NsYXNzOiBcImNlbnRlclwiIH0sIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwic2VsZWN0XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbW9kZWxcIixcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0ucUxldmVsLFxuICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJxTGV2ZWxcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICBjaGFuZ2U6IFtcbiAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJCRzZWxlY3RlZFZhbCA9IEFycmF5LnByb3RvdHlwZS5maWx0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAuY2FsbCgkZXZlbnQudGFyZ2V0Lm9wdGlvbnMsIGZ1bmN0aW9uKG8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvLnNlbGVjdGVkXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAubWFwKGZ1bmN0aW9uKG8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWwgPSBcIl92YWx1ZVwiIGluIG8gPyBvLl92YWx1ZSA6IG8udmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWxcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBfdm0ucUxldmVsID0gJGV2ZW50LnRhcmdldC5tdWx0aXBsZVxuICAgICAgICAgICAgICAgICAgICAgID8gJCRzZWxlY3RlZFZhbFxuICAgICAgICAgICAgICAgICAgICAgIDogJCRzZWxlY3RlZFZhbFswXVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLnF1ZXJ5LmFwcGx5KG51bGwsIGFyZ3VtZW50cylcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwib3B0aW9uXCIsIHsgYXR0cnM6IHsgdmFsdWU6IFwiMFwiIH0gfSwgW192bS5fdihcIsKgXCIpXSksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF92bS5fbChfdm0ubGV2ZWxzLCBmdW5jdGlvbihsZXZlbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfYyhcIm9wdGlvblwiLCB7IGRvbVByb3BzOiB7IHZhbHVlOiBsZXZlbC52YWx1ZSB9IH0sIFtcbiAgICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MobGV2ZWwubmFtZSkpXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAyXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwibGFiZWxcIiwgW1xuICAgICAgICAgICAgX3ZtLl92KFwiVXNlcjogXCIpLFxuICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbW9kZWxcIixcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0ucVVzZXIsXG4gICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInFVc2VyXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwidGV4dFwiLCBzcGVsbGNoZWNrOiBcImZhbHNlXCIgfSxcbiAgICAgICAgICAgICAgZG9tUHJvcHM6IHsgdmFsdWU6IF92bS5xVXNlciB9LFxuICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgIGlucHV0OiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgIGlmICgkZXZlbnQudGFyZ2V0LmNvbXBvc2luZykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF92bS5xVXNlciA9ICRldmVudC50YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcImxhYmVsXCIsIFtcbiAgICAgICAgICAgIF92bS5fdihcIk1lc3NhZ2U6IFwiKSxcbiAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnFNZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJxTWVzc2FnZVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcInRleHRcIiwgc3BlbGxjaGVjazogXCJmYWxzZVwiIH0sXG4gICAgICAgICAgICAgIGRvbVByb3BzOiB7IHZhbHVlOiBfdm0ucU1lc3NhZ2UgfSxcbiAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICBpbnB1dDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICBpZiAoJGV2ZW50LnRhcmdldC5jb21wb3NpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBfdm0ucU1lc3NhZ2UgPSAkZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLnF1ZXJ5LmFwcGx5KG51bGwsIGFyZ3VtZW50cylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbX3ZtLl92KFwiUXVlcnlcIildXG4gICAgICAgICAgKVxuICAgICAgICBdKVxuICAgICAgXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLnJlc3VsdHMubGVuZ3RoID4gMFxuICAgICAgICA/IF9jKFxuICAgICAgICAgICAgXCJ0YWJsZVwiLFxuICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJzbWFsbFwiIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF92bS5fbSgwKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX3ZtLl9sKF92bS5yZXN1bHRzLCBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2MoXCJ0clwiLCBbXG4gICAgICAgICAgICAgICAgICBfYyhcInRkXCIsIHsgc3RhdGljQ2xhc3M6IFwic21hbGxcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLnRpbWUocmVzdWx0LnRpbWUpKSlcbiAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF9jKFwidGRcIiwgW192bS5fdihfdm0uX3MocmVzdWx0LmNoYW5uZWwpKV0pLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF9jKFwidGRcIiwgW192bS5fdihfdm0uX3MoX3ZtLmxldmVsTmFtZShyZXN1bHQubGV2ZWwpKSldKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcInRkXCIsIFtfdm0uX3YoX3ZtLl9zKHJlc3VsdC5tZXNzYWdlKSldKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcInRkXCIsIFtfdm0uX3YoX3ZtLl9zKHJlc3VsdC5uYW1lKSldKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcInRkXCIsIFtfdm0uX3YoX3ZtLl9zKF92bS5pZHMocmVzdWx0KSkpXSksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXCJ0ZFwiLCB7IHN0YXRpY0NsYXNzOiBcInNtYWxsXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKHJlc3VsdC5jb250ZXh0KSlcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAyXG4gICAgICAgICAgKVxuICAgICAgICA6IF9jKFwicFwiLCB7IHN0YXRpY0NsYXNzOiBcImNlbnRlclwiIH0sIFtcbiAgICAgICAgICAgIF9jKFwiZW1cIiwgW192bS5fdihcIioqIGVtcHR5ICoqXCIpXSlcbiAgICAgICAgICBdKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfdm0ubW9yZVxuICAgICAgICA/IF9jKFwicFwiLCB7IHN0YXRpY0NsYXNzOiBcImNsLW1vcmVcIiB9LCBbXG4gICAgICAgICAgICBfYyhcImFcIiwgeyBvbjogeyBjbGljazogX3ZtLmdldE1vcmUgfSB9LCBbX3ZtLl92KFwibW9yZVwiKV0pXG4gICAgICAgICAgXSlcbiAgICAgICAgOiBfdm0uX2UoKVxuICAgIF0pXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW1xuICBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3ZtID0gdGhpc1xuICAgIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICAgIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICAgIHJldHVybiBfYyhcInRyXCIsIFtcbiAgICAgIF9jKFwidGhcIiwgW192bS5fdihcIlRpbWVcIildKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcInRoXCIsIFtfdm0uX3YoXCJTeXNcIildKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcInRoXCIsIFtfdm0uX3YoXCJMZXZlbFwiKV0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwidGhcIiwgW192bS5fdihcIk1lc3NhZ2VcIildKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcInRoXCIsIFtfdm0uX3YoXCJVc2VyXCIpXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJ0aFwiLCBbX3ZtLl92KFwiSWRzXCIpXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJ0aFwiLCBbX3ZtLl92KFwiQ29udGV4dFwiKV0pXG4gICAgXSlcbiAgfVxuXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2wtdXNlci1lZGl0b3IgY29udGVudFwiIH0sIFtcbiAgICBfYyhcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7IHN0YXRpY0NsYXNzOiBcImZ1bGxcIiB9LFxuICAgICAgW1xuICAgICAgICBfYyhcInByZXYtbmV4dFwiLCB7IGF0dHJzOiB7IHVzZXI6IF92bS51c2VyIH0gfSksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFwiZmV0Y2hlclwiLCB7IGF0dHJzOiB7IGZldGNoZXI6IF92bS5mZXRjaGVyIH0gfSksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFwiZGl2XCIsIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiZm9ybVwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjbC1jb21tb25cIixcbiAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICBzdWJtaXQ6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uc3VibWl0LmFwcGx5KG51bGwsIGFyZ3VtZW50cylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwiZmllbGRzZXRcIiwgW1xuICAgICAgICAgICAgICAgIF9jKFwibGVnZW5kXCIsIFtfdm0uX3YoX3ZtLl9zKF92bS5sZWdlbmQpKV0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXCJwXCIsIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwibGFiZWxcIiwgW1xuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJVc2VyIElEXCIpLFxuICAgICAgICAgICAgICAgICAgICBfYyhcImJyXCIpLFxuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibW9kZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0udXNlcklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInVzZXJJZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICByZWY6IFwidXNlcmlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwic2hvcnRcIixcbiAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplOiBcIjIwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhsZW5ndGg6IFwiMzBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwZWxsY2hlY2s6IFwiZmFsc2VcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgZG9tUHJvcHM6IHsgdmFsdWU6IF92bS51c2VySWQgfSxcbiAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQ6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJGV2ZW50LnRhcmdldC5jb21wb3NpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0udXNlcklkID0gJGV2ZW50LnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICBfYyhcInBcIiwgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJsYWJlbFwiLCB7IHN0YXRpY0NsYXNzOiBcImZvcm1fdGV4dFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiTmFtZSBcIiksXG4gICAgICAgICAgICAgICAgICAgIF9jKFwic3BhblwiLCB7IHN0YXRpY0NsYXNzOiBcInNtYWxsXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIihsYXN0LCBmaXJzdClcIilcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgIF9jKFwiYnJcIiksXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbW9kZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcIm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJ0ZXh0XCIsIG1heGxlbmd0aDogXCIxNTBcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7IHZhbHVlOiBfdm0ubmFtZSB9LFxuICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkZXZlbnQudGFyZ2V0LmNvbXBvc2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5uYW1lID0gJGV2ZW50LnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICBfYyhcInBcIiwgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJsYWJlbFwiLCB7IHN0YXRpY0NsYXNzOiBcImZvcm1fdGV4dFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiRW1haWxcIiksXG4gICAgICAgICAgICAgICAgICAgIF9jKFwiYnJcIiksXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbW9kZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5lbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJlbWFpbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiZW1haWxcIixcbiAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcImVtYWlsXCIsIG1heGxlbmd0aDogXCIyNTRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7IHZhbHVlOiBfdm0uZW1haWwgfSxcbiAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQ6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJGV2ZW50LnRhcmdldC5jb21wb3NpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uZW1haWwgPSAkZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwicmFkaW8tc2V0XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgX3ZtLl9tKDApLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcIm9wdGlvbnNcIiB9LFxuICAgICAgICAgICAgICAgICAgICBfdm0uX2woX3ZtLnJvbGVzLCBmdW5jdGlvbihyb2xlT2JqLCBpZCkge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcImxhYmVsXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnJvbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInJvbGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgbmFtZTogXCJyb2xlXCIsIHR5cGU6IFwicmFkaW9cIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBfdm0uX3EoX3ZtLnJvbGUsIGlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0ucm9sZSA9IGlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3Mocm9sZU9iai5uYW1lKSlcbiAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXCJwXCIsIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwibGFiZWxcIiwgW1xuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJQYXNzd29yZFwiKSxcbiAgICAgICAgICAgICAgICAgICAgX2MoXCJiclwiKSxcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1tb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnBhc3N3b3JkMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJwYXNzd29yZDFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgcmVmOiBcInBhc3N3b3JkMVwiLFxuICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm1lZGl1bVwiLFxuICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwicGFzc3dvcmRcIiwgdmFsdWU6IFwiXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICBkb21Qcm9wczogeyB2YWx1ZTogX3ZtLnBhc3N3b3JkMSB9LFxuICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkZXZlbnQudGFyZ2V0LmNvbXBvc2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5wYXNzd29yZDEgPSAkZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgIF9jKFwicFwiLCBbXG4gICAgICAgICAgICAgICAgICBfYyhcImxhYmVsXCIsIHsgc3RhdGljQ2xhc3M6IFwiZm9ybV90ZXh0XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJBZ2FpblwiKSxcbiAgICAgICAgICAgICAgICAgICAgX2MoXCJiclwiKSxcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1tb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnBhc3N3b3JkMixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJwYXNzd29yZDJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibWVkaXVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJwYXNzd29yZFwiLCB2YWx1ZTogXCJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7IHZhbHVlOiBfdm0ucGFzc3dvcmQyIH0sXG4gICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0OiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRldmVudC50YXJnZXQuY29tcG9zaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnBhc3N3b3JkMiA9ICRldmVudC50YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICBcInBcIixcbiAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY2VudGVyXCIgfSxcbiAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgX2MoXCJidXR0b25cIiwgW192bS5fdihcIlN1Ym1pdFwiKV0pLFxuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICBcInJvdXRlci1saW5rXCIsXG4gICAgICAgICAgICAgICAgICAgICAgeyBhdHRyczogeyB0bzogX3ZtLmNhbmNlbCwgdGFnOiBcImJ1dHRvblwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwiQ2FuY2VsXCIpXVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICBfYyhcInBcIiwgeyBzdGF0aWNDbGFzczogXCJlcnJvclwiIH0sIFtfdm0uX3YoXCLCoFwiKV0pXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdXG4gICAgICAgICAgKVxuICAgICAgICBdKVxuICAgICAgXSxcbiAgICAgIDFcbiAgICApXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW1xuICBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3ZtID0gdGhpc1xuICAgIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICAgIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICAgIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImxhYmVsXCIgfSwgW19jKFwiZW1cIiwgW192bS5fdihcIlJvbGU6XCIpXSldKVxuICB9XG5dXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjb250ZW50IGNsLXVzZXJzLWVkaXRvclwiIH0sIFtcbiAgICBfYyhcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7IHN0YXRpY0NsYXNzOiBcImZ1bGxcIiB9LFxuICAgICAgW1xuICAgICAgICBfdm0uZmV0Y2hlci5mZXRjaGVkXG4gICAgICAgICAgPyBfYyhcImRpdlwiLCBbXG4gICAgICAgICAgICAgIF92bS51c2Vycy5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJ0YWJsZVwiLFxuICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInNtYWxsXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5fbSgwKSxcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIF92bS5fbChfdm0udXNlcnMsIGZ1bmN0aW9uKHVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcInRyXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLm1hbmFnZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicm91dGVyLWxpbmtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgdG86IF92bS50b1VzZXIodXNlcikgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImltZ1wiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogX3ZtLnBlbmNpbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdDogXCJFZGl0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJFZGl0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGhyZWY6IFwiamF2YXNjcmlwdDpcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLmRlbGV0ZVVzZXIodXNlcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaW1nXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBfdm0uZGVsZXRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdDogXCJEZWxldGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkRlbGV0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5tYW5hZ2VtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJvdXRlci1saW5rXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHRvOiBfdm0udG9Vc2VyKHVzZXIpIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKHVzZXIudXNlcklkKSldXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLm1hbmFnZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicm91dGVyLWxpbmtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgdG86IF92bS50b1VzZXIodXNlcikgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihfdm0uX3ModXNlci5uYW1lKSldXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIV92bS5tYW5hZ2VtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcInRkXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgaHJlZjogXCJqYXZhc2NyaXB0OjtcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5wcmVzZW50VXNlcih1c2VyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImltZ1wiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBfdm0uaW5mbyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHQ6IFwiVmlld1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlZpZXdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAhX3ZtLm1hbmFnZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFwidGRcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBocmVmOiBcImphdmFzY3JpcHQ6O1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLnByZXNlbnRVc2VyKHVzZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKHVzZXIudXNlcklkKSldXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIV92bS5tYW5hZ2VtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcInRkXCIsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgaHJlZjogXCJqYXZhc2NyaXB0OjtcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5wcmVzZW50VXNlcih1c2VyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KF92bS5fcyh1c2VyLm5hbWUpKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInRkXCIsIFtfdm0uX3YoX3ZtLl9zKHVzZXIuZW1haWwpKV0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInRkXCIsIFtfdm0uX3YoX3ZtLl9zKHVzZXIudXNlclJvbGVOYW1lKCkpKV0pXG4gICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIDJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfdm0udXNlcnMubGVuZ3RoID09IDBcbiAgICAgICAgICAgICAgICA/IF9jKFwicFwiLCB7IHN0YXRpY0NsYXNzOiBcImNlbnRlcmJveCBjb21wIGNlbnRlclwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICBUaGVyZSBhcmUgY3VycmVudGx5IG5vIHVzZXJzIGluIHRoZSBzeXN0ZW0uXCJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFwiZmV0Y2hlclwiLCB7IGF0dHJzOiB7IGZldGNoZXI6IF92bS5mZXRjaGVyIH0gfSlcbiAgICAgIF0sXG4gICAgICAxXG4gICAgKVxuICBdKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtcbiAgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF92bSA9IHRoaXNcbiAgICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgICByZXR1cm4gX2MoXCJ0clwiLCBbXG4gICAgICBfYyhcInRoXCIsIHsgYXR0cnM6IHsgc2NvcGU6IFwiY29sXCIgfSB9LCBbX3ZtLl92KFwiwqBcIildKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcInRoXCIsIHsgYXR0cnM6IHsgc2NvcGU6IFwiY29sXCIgfSB9LCBbX3ZtLl92KFwiVXNlclwiKV0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwidGhcIiwgeyBhdHRyczogeyBzY29wZTogXCJjb2xcIiB9IH0sIFtfdm0uX3YoXCJOYW1lXCIpXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJ0aFwiLCB7IGF0dHJzOiB7IHNjb3BlOiBcImNvbFwiIH0gfSwgW192bS5fdihcIkVtYWlsXCIpXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJ0aFwiLCB7IGF0dHJzOiB7IHNjb3BlOiBcImNvbFwiIH0gfSwgW192bS5fdihcIlJvbGVcIildKVxuICAgIF0pXG4gIH1cbl1cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcImRpdlwiLFxuICAgIFtcbiAgICAgIF92bS5kZWxheWVkRmV0Y2hpbmdcbiAgICAgICAgPyBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImZldGNoaW5nXCIgfSwgW1xuICAgICAgICAgICAgX2MoXCJwXCIsIFtfdm0uX3YoXCJGZXRjaGluZyBmcm9tIHNlcnZlci4uLlwiKV0pXG4gICAgICAgICAgXSlcbiAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAoX3ZtLmZldGNoZXIgPT09IG51bGwgfHwgIV92bS5mZXRjaGVyLmZldGNoaW5nKSAmJiAhX3ZtLmZldGNoaW5nXG4gICAgICAgID8gX3ZtLl90KFwiZGVmYXVsdFwiKVxuICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF92bS5mZXRjaGVyICE9PSBudWxsICYmIF92bS5mZXRjaGVyLm1vcmVcbiAgICAgICAgPyBfYyhcInBcIiwgeyBzdGF0aWNDbGFzczogXCJtb3JlXCIgfSwgW1xuICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLmZldGNoTW9yZS5hcHBseShudWxsLCBhcmd1bWVudHMpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBbX3ZtLl92KFwiTU9SRVwiKV1cbiAgICAgICAgICAgIClcbiAgICAgICAgICBdKVxuICAgICAgICA6IF92bS5fZSgpXG4gICAgXSxcbiAgICAyXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFwiZGl2XCIpXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9Mb2dWaWV3Q29tcG9uZW50LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0xN2Q5ZWNlNCZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9Mb2dWaWV3Q29tcG9uZW50LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vTG9nVmlld0NvbXBvbmVudC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uLy55YXJuL19fdmlydHVhbF9fL3Z1ZS1sb2FkZXItdmlydHVhbC1kZDBkYzliZjM0LzAvY2FjaGUvdnVlLWxvYWRlci1ucG0tMTUuOS43LWM5MmNjZTM0OGUtOWQ2YjkyZWE2Zi56aXAvbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiL1VzZXJzL2NoYXJsZXNvd2VuL09uZURyaXZlIC0gTWljaGlnYW4gU3RhdGUgVW5pdmVyc2l0eS9Qcm9qZWN0cy9Db3Vyc2VMaWIvY29tcGxldGUvLnlhcm4vY2FjaGUvdnVlLWhvdC1yZWxvYWQtYXBpLW5wbS0yLjMuNC01NDlhZTI2MzM3LTliZWZjMGIzZDYuemlwL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzE3ZDllY2U0JykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzE3ZDllY2U0JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzE3ZDllY2U0JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9Mb2dWaWV3Q29tcG9uZW50LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0xN2Q5ZWNlNCZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCcxN2Q5ZWNlNCcsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwidmVuZG9yL2NsL3VzZXJzL2pzL0NvbnNvbGUvTG9nVmlld0NvbXBvbmVudC52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL1VzZXJFZGl0b3JDb21wb25lbnQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTE0MGQ2OTliJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL1VzZXJFZGl0b3JDb21wb25lbnQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9Vc2VyRWRpdG9yQ29tcG9uZW50LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vdnVlLWxvYWRlci12aXJ0dWFsLWRkMGRjOWJmMzQvMC9jYWNoZS92dWUtbG9hZGVyLW5wbS0xNS45LjctYzkyY2NlMzQ4ZS05ZDZiOTJlYTZmLnppcC9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCIvVXNlcnMvY2hhcmxlc293ZW4vT25lRHJpdmUgLSBNaWNoaWdhbiBTdGF0ZSBVbml2ZXJzaXR5L1Byb2plY3RzL0NvdXJzZUxpYi9jb21wbGV0ZS8ueWFybi9jYWNoZS92dWUtaG90LXJlbG9hZC1hcGktbnBtLTIuMy40LTU0OWFlMjYzMzctOWJlZmMwYjNkNi56aXAvbm9kZV9tb2R1bGVzL3Z1ZS1ob3QtcmVsb2FkLWFwaS9kaXN0L2luZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnMTQwZDY5OWInKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnMTQwZDY5OWInLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnMTQwZDY5OWInLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL1VzZXJFZGl0b3JDb21wb25lbnQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTE0MGQ2OTliJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzE0MGQ2OTliJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJ2ZW5kb3IvY2wvdXNlcnMvanMvQ29uc29sZS9Vc2VyRWRpdG9yQ29tcG9uZW50LnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vVXNlcnNFZGl0b3JDb21wb25lbnQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTQ3ZjhiNjgyJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL1VzZXJzRWRpdG9yQ29tcG9uZW50LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vVXNlcnNFZGl0b3JDb21wb25lbnQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi8ueWFybi9fX3ZpcnR1YWxfXy92dWUtbG9hZGVyLXZpcnR1YWwtZGQwZGM5YmYzNC8wL2NhY2hlL3Z1ZS1sb2FkZXItbnBtLTE1LjkuNy1jOTJjY2UzNDhlLTlkNmI5MmVhNmYuemlwL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9Vc2Vycy9jaGFybGVzb3dlbi9PbmVEcml2ZSAtIE1pY2hpZ2FuIFN0YXRlIFVuaXZlcnNpdHkvUHJvamVjdHMvQ291cnNlTGliL2NvbXBsZXRlLy55YXJuL2NhY2hlL3Z1ZS1ob3QtcmVsb2FkLWFwaS1ucG0tMi4zLjQtNTQ5YWUyNjMzNy05YmVmYzBiM2Q2LnppcC9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCc0N2Y4YjY4MicpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCc0N2Y4YjY4MicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCc0N2Y4YjY4MicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vVXNlcnNFZGl0b3JDb21wb25lbnQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTQ3ZjhiNjgyJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzQ3ZjhiNjgyJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJ2ZW5kb3IvY2wvdXNlcnMvanMvQ29uc29sZS9Vc2Vyc0VkaXRvckNvbXBvbmVudC52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL0ZldGNoZXJWdWUudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTQzYjI2YmNiJnNjb3BlZD10cnVlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0ZldGNoZXJWdWUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9GZXRjaGVyVnVlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuaW1wb3J0IHN0eWxlMCBmcm9tIFwiLi9GZXRjaGVyVnVlLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTQzYjI2YmNiJmxhbmc9c2NzcyZzY29wZWQ9dHJ1ZSZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vdnVlLWxvYWRlci12aXJ0dWFsLWRkMGRjOWJmMzQvMC9jYWNoZS92dWUtbG9hZGVyLW5wbS0xNS45LjctYzkyY2NlMzQ4ZS05ZDZiOTJlYTZmLnppcC9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCI0M2IyNmJjYlwiLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9Vc2Vycy9jaGFybGVzb3dlbi9PbmVEcml2ZSAtIE1pY2hpZ2FuIFN0YXRlIFVuaXZlcnNpdHkvUHJvamVjdHMvQ291cnNlTGliL2NvbXBsZXRlLy55YXJuL2NhY2hlL3Z1ZS1ob3QtcmVsb2FkLWFwaS1ucG0tMi4zLjQtNTQ5YWUyNjMzNy05YmVmYzBiM2Q2LnppcC9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCc0M2IyNmJjYicpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCc0M2IyNmJjYicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCc0M2IyNmJjYicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vRmV0Y2hlclZ1ZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NDNiMjZiY2Imc2NvcGVkPXRydWUmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignNDNiMjZiY2InLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInZlbmRvci9jbC91c2Vycy9qcy9MaWIvRmV0Y2hlclZ1ZS52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL1ByZXZOZXh0VXNlci52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9ZTAwMWQ5NDYmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vUHJldk5leHRVc2VyLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vUHJldk5leHRVc2VyLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vLnlhcm4vX192aXJ0dWFsX18vdnVlLWxvYWRlci12aXJ0dWFsLWRkMGRjOWJmMzQvMC9jYWNoZS92dWUtbG9hZGVyLW5wbS0xNS45LjctYzkyY2NlMzQ4ZS05ZDZiOTJlYTZmLnppcC9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCIvVXNlcnMvY2hhcmxlc293ZW4vT25lRHJpdmUgLSBNaWNoaWdhbiBTdGF0ZSBVbml2ZXJzaXR5L1Byb2plY3RzL0NvdXJzZUxpYi9jb21wbGV0ZS8ueWFybi9jYWNoZS92dWUtaG90LXJlbG9hZC1hcGktbnBtLTIuMy40LTU0OWFlMjYzMzctOWJlZmMwYjNkNi56aXAvbm9kZV9tb2R1bGVzL3Z1ZS1ob3QtcmVsb2FkLWFwaS9kaXN0L2luZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnZTAwMWQ5NDYnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnZTAwMWQ5NDYnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnZTAwMWQ5NDYnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL1ByZXZOZXh0VXNlci52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9ZTAwMWQ5NDYmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignZTAwMWQ5NDYnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInZlbmRvci9jbC91c2Vycy9qcy9MaWIvUHJldk5leHRVc2VyLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHRyZXN1bHQgPSBmbigpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJVc2Vyc0NvbnNvbGVcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0fVxuXHR9XG5cdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkc1tpXV0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjb3Vyc2VsaWJcIl0gPSBzZWxmW1wid2VicGFja0NodW5rY291cnNlbGliXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJjb21tb25cIixcInZlbmRvclwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3ZlbmRvci9jbC91c2Vycy9qcy9Db25zb2xlL2luZGV4LmpzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iXSwic291cmNlUm9vdCI6IiJ9