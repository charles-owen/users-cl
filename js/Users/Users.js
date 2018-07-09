import {User} from './User.js';
import {StoreModuleUsers} from './StoreModuleUsers.js';

export let Users = function() {
}

//
// Exported components and constants
//
Users.User = User;
Users.MUST_PROVIDE_USERID_OR_EMAIL = 101;
Users.PASSWORDS_MUST_MATCH = 102;
Users.DUPLICATE_USER = 103;
Users.DUPLICATE_EMAIL = 104;

//
// Install the store module
//
const store = Site.store;
store.registerModule('users', StoreModuleUsers);

//
// Register a property 'user' that can be used
// to set the user.
//
Object.defineProperty(Users, 'user', {
    set(value) {
        store.commit('users/set', value);
    }
});

export default Users;
