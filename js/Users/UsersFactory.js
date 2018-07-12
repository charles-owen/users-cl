/**
 * @file
 * Factory that creates the Users object
 */

import {User} from './User.js';
import {StoreModuleUser} from './StoreModuleUser.js';
import {StoreModuleUsers} from './StoreModuleUsers.js';

let UsersFactory = function() {}

/**
 * Factory method to create a Users object.
 *
 * This allows for injection of the store for testing purposes.
 * @param store Vuex store object
 * @returns {Users} object.
 */
UsersFactory.create = function(store) {

    let Users = function() {
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
    // Install the users store modules
    //
    if(store !== undefined) {
        store.registerModule('user', StoreModuleUser);
        store.registerModule('users', StoreModuleUsers.create(
            '/api/users',
            (user)=>{ return user.id; }
        ));
    }

    //
    // Register a property 'user' that can be used
    // to set the user.
    //
    Object.defineProperty(Users, 'user', {
        set(value) {
            store.commit('user/set', value);
        }
    });

    return Users;
}

export {UsersFactory};

