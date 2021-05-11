/**
 * The main users.js entry point.
 *
 * Does not include console components.
 */

import {UsersFactory} from './js/Users/UsersFactory.js';

import FetcherVue from './js/Lib/FetcherVue.vue';
import UserSelectorVue from './js/Lib/UserSelectorVue.vue';
import {User} from './js/Users/User.js';
import UserVueBase from './js/Vue/UserVueBase.vue';

export {FetcherVue};
export {UserSelectorVue};
export {User};

let Users = UsersFactory.create(Site.site);
//export {Users};

global.Users = Users;

Site.FetcherVue = FetcherVue;
Site.Users = Users;
Site.User = User;
Site.UserVueBase = UserVueBase;
Site.UserSelectorVue = UserSelectorVue;
