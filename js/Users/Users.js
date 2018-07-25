import {UsersFactory} from './UsersFactory.js';

import FetcherVue from '../Lib/FetcherVue.vue';
import UserSelectorVue from '../Lib/UserSelectorVue.vue';
import {StoreModuleUsers} from './StoreModuleUsers.js';

export {FetcherVue};
export {UserSelectorVue};
export {StoreModuleUsers};

// Use the factory to create the Users object
if(global.Users === undefined) {
    global.Users = UsersFactory.create(global.Site);
}
